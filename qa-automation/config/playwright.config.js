require('dotenv').config();

module.exports = {
  testDir: './tests',
  timeout: 90000,
  retries: 1,
  reporter: [
    ['line'],
    ['allure-playwright', {
      detail: true,
      outputFolder: './reports/allure-results',
      suiteTitle: false,
    }]
  ],
  use: {
    browserName: 'chromium',
    baseURL: process.env.BASE_URL || 'https://app.sully.ai',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    permissions: ['microphone'],
    launchOptions: {
      args: [
        '--use-fake-ui-for-media-stream',
        '--autoplay-policy=no-user-gesture-required'
      ]
    }
  },
  globalSetup: undefined,
  globalTeardown: undefined,
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
      },
    },
  ],
  expect: {
    timeout: 30000,
  },
  outputDir: './reports/test-output',
  // Artifacts configuration
  artifacts: {
    screenshots: './reports/screenshots',
    videos: './reports/videos',
    traces: './reports/traces',
  },
};
