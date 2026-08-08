import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  retries: 0,
  use: {
    headless: true,
    video: 'on',
    screenshot: 'on',
    viewport: { width: 1280, height: 720 },
    launchOptions: { slowMo: 300 },
  },
  outputDir: './test-results',
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
});
