// packages/modules/email/src/templates.ts
// Transactional + lifecycle email templates. Plain-text with optional
// HTML mirror. Substitutes TemplateContext values inline.
//
// Voice per brand follows the brand voice doc in docs/voice/<brand>.md.
// Subject lines match the A variants from docs/marketing-copy/email-subject-lines.md.

import type {
  Email,
  SubscriptionContext,
  OrderContext,
  QuoteContext,
  PreArrivalContext,
} from './types';

function formatMoney(cents: number, currency: string): string {
  const amount = (cents / 100).toFixed(cents % 100 === 0 ? 0 : 2);
  return currency === 'usd' ? `$${amount}` : `${amount} ${currency.toUpperCase()}`;
}
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
function baseUrl(ctx: { baseUrl?: string }): string {
  return (
    ctx.baseUrl ?? process.env.NEXT_PUBLIC_BASE_URL ?? 'https://bigmuddytouring.com'
  );
}
function greeting(name?: string): string {
  return name ? `Hi ${name.split(' ')[0]},` : 'Hi,';
}

// ── Subscription lifecycle ───────────────────────────────────

export function subscriptionWelcome(ctx: SubscriptionContext): Email {
  return {
    subject: `You're in — welcome to ${ctx.planName}`,
    text: `${greeting(ctx.customerName)}

Your subscription to ${ctx.planName} is active. You're paying ${formatMoney(ctx.priceCents, ctx.currency)} / ${ctx.interval}, next billing ${ctx.currentPeriodEnd ? formatDate(ctx.currentPeriodEnd) : 'at the end of your current period'}.

${ctx.trialEndsAt ? `Your free trial ends ${formatDate(ctx.trialEndsAt)}. You can cancel anytime before then without being charged.` : ''}

Manage your subscription (cancel, update card, view invoices) from:
${baseUrl(ctx)}/account/subscriptions?email=${encodeURIComponent(ctx.customerEmail)}

Questions? Reply to this email.

— The ${ctx.brand} team`,
  };
}

export function subscriptionPaymentFailed(ctx: SubscriptionContext): Email {
  return {
    subject: `We couldn't process your payment for ${ctx.planName}`,
    text: `${greeting(ctx.customerName)}

The payment for your ${ctx.planName} subscription didn't go through. This usually means an expired card or a billing-address mismatch — it's rarely the amount.

We'll automatically retry over the next few days. To fix it now and skip the retries, update your card here:
${baseUrl(ctx)}/account/subscriptions?email=${encodeURIComponent(ctx.customerEmail)}

No action on your end = your subscription stays paused until payment clears.

Reply if you need help — we'll get it sorted.

— The ${ctx.brand} team`,
  };
}

export function subscriptionCancelled(ctx: SubscriptionContext): Email {
  return {
    subject: `Subscription cancelled — access until ${ctx.currentPeriodEnd ? formatDate(ctx.currentPeriodEnd) : 'period end'}`,
    text: `${greeting(ctx.customerName)}

Your ${ctx.planName} subscription is cancelled. You'll keep full access until ${ctx.currentPeriodEnd ? formatDate(ctx.currentPeriodEnd) : 'the end of your current period'}, then the sub closes.

No more charges after that.

If you cancelled by accident — or change your mind — resubscribe anytime from the same page:
${baseUrl(ctx)}/pricing

If anything we could have done differently, we'd love to know. Reply to this email — goes directly to the team, not a help desk.

— The ${ctx.brand} team`,
  };
}

export function subscriptionTrialEnding(ctx: SubscriptionContext): Email {
  return {
    subject: `Your ${ctx.planName} trial ends in 3 days`,
    text: `${greeting(ctx.customerName)}

Your free trial for ${ctx.planName} ends on ${ctx.trialEndsAt ? formatDate(ctx.trialEndsAt) : 'soon'}. After that, we'll bill ${formatMoney(ctx.priceCents, ctx.currency)} / ${ctx.interval}.

Nothing to do if you want to continue — the subscription renews automatically.

If the trial wasn't what you were looking for, cancel before ${ctx.trialEndsAt ? formatDate(ctx.trialEndsAt) : 'the trial ends'} and you won't be charged:
${baseUrl(ctx)}/account/subscriptions?email=${encodeURIComponent(ctx.customerEmail)}

— The ${ctx.brand} team`,
  };
}

// ── Order lifecycle ──────────────────────────────────────────

export function orderConfirmed(ctx: OrderContext): Email {
  const itemLines = ctx.items.map((i) => `  - ${i.quantity}× ${i.name}`).join('\n');
  return {
    subject: `Order received — #${ctx.orderId.slice(0, 8)}`,
    text: `${greeting(ctx.customerName)}

Thanks — your order is in. Here's what you ordered:

${itemLines}

Total: ${formatMoney(ctx.totalCents, ctx.currency)}

We'll ship physical items within 2 business days and send you a tracking number as soon as it's on the way. Digital items (if any) are available now at:
${baseUrl(ctx)}/account/orders?email=${encodeURIComponent(ctx.customerEmail)}

Questions? Reply here.

— The ${ctx.brand} team`,
  };
}

export function orderShipped(ctx: OrderContext): Email {
  return {
    subject: `Your order is on the way — #${ctx.orderId.slice(0, 8)}`,
    text: `${greeting(ctx.customerName)}

Your order shipped. Tracking: ${ctx.trackingNumber ?? 'available once the carrier scans it'}.

Reply to this email if anything arrives damaged or if you don't see it within 7 business days — we'll make it right.

— The ${ctx.brand} team`,
  };
}

export function orderRefunded(ctx: OrderContext): Email {
  return {
    subject: `Refund processed — #${ctx.orderId.slice(0, 8)}`,
    text: `${greeting(ctx.customerName)}

We refunded ${formatMoney(ctx.totalCents, ctx.currency)} to the original payment method. It takes 5-10 business days to appear on your statement.

If there's anything we can do better next time, we'd genuinely like to hear it — reply to this email.

— The ${ctx.brand} team`,
  };
}

// ── Booking / quote lifecycle ────────────────────────────────

export function quoteReceived(ctx: QuoteContext): Email {
  return {
    subject: `We got your ${ctx.eventType} inquiry`,
    text: `${greeting(ctx.customerName)}

Thanks for reaching out about your ${ctx.eventType}. Tracy personally reviews every inquiry — you'll hear back within one business day, sooner if the date you proposed is close.

${ctx.proposedDate ? `Date you mentioned: ${formatDate(ctx.proposedDate)}` : ''}

If it's urgent, text us at 601-555-INNKEEPER.

— Tracy @ Big Muddy Inn`,
  };
}

// ── Inn pre-arrival ──────────────────────────────────────────

export function innPreArrival(ctx: PreArrivalContext): Email {
  return {
    subject: `You arrive ${formatDate(ctx.checkInDate)} — here's what to know`,
    text: `${greeting(ctx.customerName)}

Looking forward to having you at Big Muddy Inn on ${formatDate(ctx.checkInDate)}.

A few things to know before you arrive:

Check-in is 3pm, checkout 11am. If you need earlier or later, reply and we'll almost always make it work — just let us know in advance.

${ctx.upcomingShow ? `The Blues Room has ${ctx.upcomingShow.name} playing ${formatDate(ctx.upcomingShow.date)} — if you want to grab tickets, reply and we'll hold two for you.` : 'Check the Blues Room schedule at ' + baseUrl(ctx) + '/shows — if there\'s a show during your stay, we can hold tickets for you.'}

Breakfast on the porch, 7:30-10am. Come when you want. We don't do a buffet — Tracy cooks.

Parking: plenty of it, right at the Inn. No permits.

If you have questions before you arrive, reply to this email. On arrival day, call or text ${process.env.INN_DAY_OF_PHONE ?? '601-555-INNKEEPER'}.

Safe travels.

— Tracy @ Big Muddy Inn`,
  };
}
