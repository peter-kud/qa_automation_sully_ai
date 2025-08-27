require('dotenv').config();
const path = require('path');
const { defineConfig, devices } = require('@playwright/test');

const micFile = path.resolve(process.env.MIC_WAV || './test_data/audio/headache.wav');
const baseURL = process.env.BASE_URL || 'https://app.sully.ai';

module.exports = defineConfig({
  testDir: './tests',
  timeout: 90_000,
  expect: { timeout: 30_000 },
  retries: 1,
  reporter: [
    ['line'],
    ['allure-playwright', {
      detail: true,
      outputFolder: 'reports/allure-results',
      suiteTitle: false,
    }],
  ],
  use: {
    baseURL,
    browserName: 'chromium',
    headless: true,                      // на время отладки можно поставить false
    permissions: ['microphone'],         // базовое
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    launchOptions: {
      args: [
        '--use-fake-device-for-media-stream',        // <— добавили
        `--use-file-for-fake-audio-capture=${micFile}`,
        '--use-fake-ui-for-media-stream',
        '--autoplay-policy=no-user-gesture-required',
      ],
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  outputDir: 'reports/test-output',
});