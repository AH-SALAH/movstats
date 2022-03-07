import { PlaywrightTestConfig, devices } from '@playwright/test';
import path from 'path';

const site_url = process?.env?.NEXT_PUBLIC_SITEURL || 'http://localhost:3000';

// Reference: https://playwright.dev/docs/test-configuration
const config: PlaywrightTestConfig = {
    // Timeout per test
    timeout: 30 * 1000,
    // Test directory
    testDir: path.join(__dirname, 'e2e'),
    // If a test fails, retry it additional 2 times
    retries: 2,
    // 'github' for GitHub Actions CI to generate annotations, plus a concise 'dot'
    // default 'list' when running locally
    reporter: process.env.CI ? 'github' : 'list',
    // Artifacts folder where screenshots, videos, and traces are stored.
    outputDir: path.join(__dirname, 'e2e/test-results/'),

    // Run your local dev server before starting the tests:
    // https://playwright.dev/docs/test-advanced#launching-a-development-web-server-during-the-tests
    webServer: {
        command: 'yarn build && yarn start',
        port: 3000,
        timeout: 120 * 1000,
        reuseExistingServer: !process.env.CI,
    },

    use: {
        baseURL: site_url,
        // browserName: "chromium",
        launchOptions: {
            // force GPU hardware acceleration
            // (even in headless mode)
            args: ["--use-gl=egl"]
        },
        // Retry a test if its failing with enabled tracing. This allows you to analyse the DOM, console logs, network traffic etc.
        // More information: https://playwright.dev/docs/trace-viewer
        trace: 'retry-with-trace',

        // All available context options: https://playwright.dev/docs/api/class-browser#browser-new-context
        // contextOptions: {
        //   ignoreHTTPSErrors: true,
        // },
    },

    projects: [
        {
            name: 'Desktop Chrome',
            use: {
                // browserName: 'chromium',
                ...devices['Desktop Chrome'],
            },
        },
        // {
        //   name: 'Desktop Firefox',
        //   use: {
        //     ...devices['Desktop Firefox'],
        //   },
        // },
        // {
        //   name: 'Desktop Safari',
        //   use: {
        //     ...devices['Desktop Safari'],
        //   },
        // },
        // Test against mobile viewports.
        {
            name: 'Mobile Chrome',
            use: {
                // browserName: 'chromium',
                ...devices['Pixel 5'],
            },
        },
        {
            name: 'Mobile Safari',
            use: {
                // browserName: 'webkit',
                ...devices['iPhone 12'],
            }
        },
    ],
}
export default config;