import { defineConfig } from 'checkly';
import { EmailAlertChannel, Frequency } from 'checkly/constructs';

/**
 * BMT (Big Muddy Media) Synthetic Monitoring — Checkly Check Suite
 *
 * Target:    https://bmt--bigmuddy-ff651.us-east4.hosted.app
 * Scope:     Public Deep South Directory splash + root crash detection
 * Tests:     e2e/smoke.spec.ts
 * Auth:      None — /media and / are public routes
 *
 * To run:    CHECKLY_API_KEY=... CHECKLY_ACCOUNT_ID=... npx checkly test --record
 * To deploy: npx checkly deploy
 */

const chaseEmail = new EmailAlertChannel('bmt-chase-email-alerts', {
    address: 'me@chasepierson.tv',
    sendFailure: true,
    sendRecovery: true,
    sendDegraded: false,
});

export default defineConfig({
    projectName: 'BMT — Big Muddy Media Monitoring',
    logicalId: 'bmt-synthetic-monitoring',
    repoUrl: 'https://github.com/chasepiersontv/bmt',

    checks: {
        playwrightConfigPath: './playwright.config.ts',
        locations: ['us-east-1', 'eu-central-1'],
        alertChannels: [chaseEmail],

        playwrightChecks: [
            {
                name: 'BMT Public Smoke — Directory + Root',
                logicalId: 'bmt-public-smoke',
                pwProjects: ['checkly'],
                frequency: Frequency.EVERY_10M,
                // pnpm monorepo — override default npm install.
                // npm triggers postinstall which calls pnpm (not in Checkly env).
                // --ignore-scripts skips the prisma generate hook — not needed for smoke tests.
                installCommand: 'npm install --ignore-scripts',
            },
        ],
    },

    cli: {
        runLocation: 'us-east-1',
        retries: 0,
    },
});
