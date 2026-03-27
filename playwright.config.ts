import { defineConfig, devices } from '@playwright/test';

const isCheckly = !!process.env.CHECKLY;

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
        baseURL: isCheckly
            ? 'https://bigmuddytouring.com'
            : 'http://localhost:3000',
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
            command: 'pnpm --filter @bigmuddy/web dev',
            port: 3000,
            reuseExistingServer: true,
            timeout: 60_000,
        },
    }),
});
