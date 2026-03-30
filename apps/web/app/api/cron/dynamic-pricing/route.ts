// app/api/cron/dynamic-pricing/route.ts
// Daily pricing engine — adjusts Big Muddy Inn rates based on occupancy & events
// Runs after cloudbeds-sync so metrics are fresh
//
// Vercel cron config:
//   { "path": "/api/cron/dynamic-pricing", "schedule": "0 7 * * *" }

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import {
  getAvailability,
  getRatePlans,
  updateRates,
  DEFAULT_PRICING_RULES,
  type RateUpdate,
  type PricingRules,
} from '@/lib/cloudbeds';

export async function GET(request: Request) {
  // Cron auth
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  try {
    const rules: PricingRules = DEFAULT_PRICING_RULES;
    const today = new Date();
    const lookAhead = 90; // days
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + lookAhead);

    const startStr = today.toISOString().split('T')[0];
    const endStr = endDate.toISOString().split('T')[0];

    // 1. Get current rates and availability
    const ratePlans = await getRatePlans(startStr, endStr);
    const availability = await getAvailability(startStr, endStr);

    if (!ratePlans.length) {
      return NextResponse.json({
        success: false,
        error: 'No rate plans returned from Cloudbeds',
      });
    }

    const updates: RateUpdate[] = [];
    const changes: Array<{ date: string; reason: string; baseRate: number; newRate: number }> = [];

    // 2. Process each rate plan
    for (const plan of ratePlans) {
      for (const [date, rateInfo] of Object.entries(plan.rates)) {
        const dateObj = new Date(date);
        const dayOfWeek = dateObj.getDay(); // 0=Sun, 5=Fri, 6=Sat
        const baseRate = rateInfo.rate;
        let newRate = baseRate;
        let reason = '';

        // ── Event-based pricing (highest priority) ──
        let isEventDate = false;
        for (const [eventName, eventConfig] of Object.entries(rules.events)) {
          if (eventConfig.dates.includes(date)) {
            newRate = baseRate * eventConfig.multiplier;
            reason = `Event: ${eventName} (${eventConfig.multiplier}x)`;
            isEventDate = true;

            // Also set min stay if configured
            if (eventConfig.minLOS) {
              updates.push({
                roomTypeID: String(plan.roomTypeID),
                ratePlanID: String(plan.ratePlanID),
                startDate: date,
                endDate: date,
                minLOS: eventConfig.minLOS,
              });
            }
            break;
          }
        }

        if (!isEventDate) {
          // ── Weekend pricing + 2-night minimum (Fri-Sat) ──
          if (dayOfWeek === 5 || dayOfWeek === 6) {
            newRate = baseRate * rules.weekendMultiplier;
            reason = `Weekend (${rules.weekendMultiplier}x)`;
            updates.push({
              roomTypeID: String(plan.roomTypeID),
              ratePlanID: String(plan.ratePlanID),
              startDate: date,
              endDate: date,
              minLOS: 2,
            });
          }

          // ── High occupancy surge ──
          const avail = availability[date];
          if (avail) {
            const occupancyRatio = 1 - avail.roomsAvailable / 6;
            if (occupancyRatio >= rules.highOccupancyThreshold) {
              newRate = newRate * rules.highOccupancyMultiplier;
              reason += reason
                ? ` + High occ ${Math.round(occupancyRatio * 100)}%`
                : `High occupancy ${Math.round(occupancyRatio * 100)}% (${rules.highOccupancyMultiplier}x)`;
            }
          }

          // ── Last-minute discount ──
          const hoursUntilCheckin = (dateObj.getTime() - today.getTime()) / (1000 * 60 * 60);
          const avail2 = availability[date];
          if (
            hoursUntilCheckin <= rules.lastMinuteWindow &&
            hoursUntilCheckin > 0 &&
            avail2 &&
            avail2.roomsAvailable > 2 // More than 2 rooms open
          ) {
            newRate = baseRate * rules.lastMinuteDiscount;
            reason = `Last-minute discount (${avail2.roomsAvailable} rooms open)`;
          }
        }

        // ── Apply guardrails ──
        newRate = Math.max(rules.minRate, Math.min(rules.maxRate, Math.round(newRate)));

        // Only push if rate actually changed
        if (newRate !== baseRate) {
          updates.push({
            roomTypeID: String(plan.roomTypeID),
            ratePlanID: String(plan.ratePlanID),
            startDate: date,
            endDate: date,
            rate: newRate,
          });

          changes.push({ date, reason, baseRate, newRate });
        }
      }
    }

    // 3. Push updates in batches of 30 (Cloudbeds API limit)
    const jobs: string[] = [];
    for (let i = 0; i < updates.length; i += 30) {
      const batch = updates.slice(i, i + 30);
      const result = await updateRates(batch);
      jobs.push(result.jobReferenceID);
    }

    // 4. Log to ops
    if (changes.length > 0) {
      try {
        await prisma.opsActivity.create({
          data: {
            type: 'pricing',
            message: `Dynamic pricing: ${changes.length} rate changes. ${changes
              .slice(0, 5)
              .map((c) => `${c.date}: $${c.baseRate}→$${c.newRate}`)
              .join(', ')}`,
          },
        });
      } catch {
        // opsActivity model may not exist yet
      }
    }

    console.log(
      `[cron/dynamic-pricing] ${changes.length} rate changes across ${jobs.length} API batches`
    );

    return NextResponse.json({
      success: true,
      ranAt: new Date().toISOString(),
      rateChanges: changes.length,
      batchJobs: jobs.length,
      changes: changes.slice(0, 20), // Sample for response
    });
  } catch (error) {
    console.error('[cron/dynamic-pricing] Error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Pricing engine failed',
    }, { status: 500 });
  }
}
