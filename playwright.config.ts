import { defineConfig, devices } from '@playwright/test';

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
        baseURL: process.env.CHECKLY
            ? 'https://bigmuddytouring.com'
            : 'http://localhost:3000',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
    },

    projects: [
        // ── Checkly Synthetic Monitoring ──
        // Runs smoke.spec.ts against the live Firebase App Hosting URL.
        // Selected by checkly.config.ts via pwProjects: ['checkly'].
        {
            name: 'checkly',
            use: { ...devices['Desktop Chrome'] },
            testMatch: ['smoke.spec.ts'],
        },
    ],

    // No webServer — smoke tests always run against deployed URLs
});
