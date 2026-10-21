import { defineConfig } from 'playwright/test';

export default defineConfig({
  testDir: './tests/browser',
  timeout: 30_000,
  expect: {
    timeout: 15_000,
  },
  fullyParallel: false,
  workers: 1,
  reporter: 'line',
  outputDir: 'test-results',
  webServer: {
    command: 'npx serve -l 3000 .',
    url: 'http://127.0.0.1:3000/admin.html',
    reuseExistingServer: true,
    timeout: 120_000,
  },
  use: {
    baseURL: 'http://127.0.0.1:3000',
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure',
  },
});
