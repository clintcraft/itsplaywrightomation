import { defineConfig, devices } from '@playwright/test';
import { testConfig } from './testconfig';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests/E2E',
  fullyParallel: false,   /* Run tests in files in parallel */
  forbidOnly: !!process.env.CI,  /* Fail the build on CI if you accidentally left test.only in the source code. */
  retries: process.env.CI ? 2 : 0,   /* Retry on CI only */
  workers: process.env.CI ? 1 : undefined,   /* Opt out of parallel tests on CI. */
  reporter: [[`html`], /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    ["allure-playwright",
      {
        outputFolder: 'my-allure-results',
        suiteTitle: false,
        detail: true,
        screenshots: false,
        videos: false,
        // launchCommand: 'npm run allure:open',
      }
    ]],   /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: testConfig.qa,
    storageState: '.auth/user.json',/* Path to the storage state file */

    actionTimeout: 0,
    launchOptions: {
      slowMo: 2000,
      devtools: false,
    },
    trace: 'on-first-retry', /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: `chromium`,  // Configure the browser to use.
        channel: `chrome`,  //Chrome Browser Config
        baseURL: testConfig.qa,  //Picks Base Url based on User input
        storageState: '.auth/user.json',  //Path to the storage state file
        headless: false,  //Browser Mode
        viewport: { width: 1500, height: 730 },   //Browser height and width
        ignoreHTTPSErrors: true,
        acceptDownloads: true,//Enable File Downloads in Chrome
        //Artifacts
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
        //Slows down execution by ms
        launchOptions: {
          slowMo: 1000
        }
      },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
