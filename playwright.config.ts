import { defineConfig, devices } from '@playwright/test';

const isCheckly = !!process.env.CHECKLY;

// Dedicated port so smoke tests never attach to another app on :3000.
const localPort = Number(process.env.PLAYWRIGHT_PORT || 3334);
const localBase = `http://localhost:${localPort}`;

export default defineConfig({
    testDir: './e2e',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    workers: 1,
    reporter: [['list']],
    timeout: 30_000,
    expect: { timeout: 15_000 },

    use: {
        baseURL: isCheckly ? 'https://bigmuddytouring.com' : localBase,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
    },

    projects: [
        {
            name: 'checkly',
            use: { ...devices['Desktop Chrome'] },
            testMatch: ['smoke.spec.ts'],
        },
        {
            name: 'local',
            use: { ...devices['Desktop Chrome'] },
        },
    ],

    ...(!isCheckly && {
        webServer: {
            command: `pnpm --filter @bigmuddy/web exec next dev -p ${localPort}`,
            url: localBase,
            reuseExistingServer: !process.env.CI,
            timeout: 120_000,
        },
    }),
});
