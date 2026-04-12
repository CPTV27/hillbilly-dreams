import { chromium } from 'playwright';
import fetch from 'node-fetch';
import crypto from 'crypto';

const TARGET_URL = process.argv[2] || 'http://localhost:3000';
const MAX_CLICKS = parseInt(process.argv[3] || '50', 10);
const GOOGLE_CHAT_WEBHOOK_URL = process.env.GOOGLE_CHAT_WEBHOOK_URL;

interface QAFailure {
    type: 'Fatal Exception' | 'Error Boundary' | 'Dead Link 404';
    message: string;
    url: string;
    screenshotBase64?: string;
}

/**
 * Pipes the fatal crash report directly into the Big Muddy Command Chat Room
 */
async function reportToGoogleChat(failure: QAFailure) {
    if (!GOOGLE_CHAT_WEBHOOK_URL) {
        console.warn('⚠️ No GOOGLE_CHAT_WEBHOOK_URL configured. Skipping Google Chat alert.');
        return;
    }

    const payload = {
        cardsV2: [
            {
                cardId: crypto.randomUUID(),
                card: {
                    header: {
                        title: `🚨 QA Monkey Caught a Crash`,
                        subtitle: failure.type,
                        imageUrl: 'https://cdn-icons-png.flaticon.com/512/564/564276.png',
                        imageType: 'SQUARE',
                    },
                    sections: [
                        {
                            widgets: [
                                {
                                    textParagraph: { text: `<b>Crash URL:</b> ${failure.url}` }
                                },
                                {
                                    textParagraph: { text: `<b>Error Output:</b> <font color="#ea4335">${failure.message}</font>` }
                                }
                            ]
                        }
                    ]
                }
            }
        ]
    };

    try {
        await fetch(GOOGLE_CHAT_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        console.log('✅ Sent disruption alert to Google Chat');
    } catch (err) {
        console.error('Failed to send webhook:', err);
    }
}

async function runQAMonkey() {
    console.log(`\n🦍 Releasing the QA Monkey onto: ${TARGET_URL}`);
    console.log(`🎯 Mission: Annihilate the DOM with ${MAX_CLICKS} random clicks.\n`);

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    const errors: QAFailure[] = [];

    // ── INTERCEPTORS ──
    page.on('pageerror', async (err) => {
        console.log(`💥 CRASH CAUGHT: ${err.message}`);
        errors.push({
            type: 'Fatal Exception',
            message: err.message,
            url: page.url()
        });
    });

    page.on('response', async (res) => {
        if (res.status() === 404 && res.request().resourceType() === 'document') {
            console.log(`💀 404 DEAD LINK CAUGHT: ${res.url()}`);
            errors.push({
                type: 'Dead Link 404',
                message: `Monkey clicked a link pointing to a void: ${res.url()}`,
                url: page.url()
            });
        }
    });

    try {
        await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded' });
    } catch (e: any) {
        console.error('Failed to load initial URL', e);
        await browser.close();
        return;
    }

    let clickCount = 0;
    while (clickCount < MAX_CLICKS && errors.length === 0) {
        await page.waitForTimeout(500); // Let animations settle
        
        // Detect standard React Error Boundary catch statements
        const hasErrorBoundary = await page.evaluate(() => {
            const bodyText = document.body.innerText.toLowerCase();
            return bodyText.includes('something went wrong') || bodyText.includes('application error');
        });

        if (hasErrorBoundary) {
            console.log('🛑 REACT ERROR BOUNDARY CAUGHT!');
            errors.push({
                type: 'Error Boundary',
                message: 'React Tree Crashed. Error Boundary Fallback rendered.',
                url: page.url()
            });
            break; // Stop fuzzing, we killed it
        }

        // Find clickables
        const locators = await page.locator('button:visible, a:visible, [role="button"]:visible').all();
        if (locators.length === 0) {
            console.log('Monkey found an empty room. No buttons to click.');
            break; 
        }

        // The Chaos Algorithm: Pick a random element
        const target = locators[Math.floor(Math.random() * locators.length)];
        
        try {
            const elId = await target.getAttribute('id') || await target.getAttribute('class') || 'unnamed-element';
            console.log(`🔨 [Click ${clickCount + 1}/${MAX_CLICKS}] Smashing <${elId.substring(0, 30)}>...`);
            
            await target.click({ timeout: 1500 });
            clickCount++;
        } catch (e) {
            // Element might be obscured or non-interactable. The monkey ignores it and moves on.
        }
    }

    if (errors.length > 0) {
        console.log('\n❌ QA MONKEY MISSION FAILED: THE APP BROKE.\n');
        // Grab a screenshot of the crime scene
        const screenshotBuffer = await page.screenshot({ type: 'jpeg', quality: 60 });
        const screenshotBase64 = screenshotBuffer.toString('base64');
        
        const fatalError = errors[0];
        fatalError.screenshotBase64 = screenshotBase64;
        
        // Write standard JSON output file for the Dashboard
        const fs = require('fs');
        fs.writeFileSync('qa-report.json', JSON.stringify({
            status: 'FAILED',
            timestamp: new Date().toISOString(),
            target: TARGET_URL,
            clicksSurvived: clickCount,
            error: fatalError
        }, null, 2));

        // Fire the Google Chat Protocol
        await reportToGoogleChat(fatalError);

        await browser.close();
        process.exit(1);
    } else {
        console.log(`\n✅ QA MONKEY MISSION SUCCESS: THE APP SURVIVED ${clickCount} CLICKS.\n`);
        const fs = require('fs');
        fs.writeFileSync('qa-report.json', JSON.stringify({
            status: 'PASSED',
            timestamp: new Date().toISOString(),
            target: TARGET_URL,
            clicksSurvived: clickCount
        }, null, 2));
        await browser.close();
        process.exit(0);
    }
}

runQAMonkey().catch(console.error);
