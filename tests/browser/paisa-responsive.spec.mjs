import { test, expect } from 'playwright/test';

const viewports = [
  { name: 'desktop-1440x900', width: 1440, height: 900 },
  { name: 'tablet-768x1024', width: 768, height: 1024 },
  { name: 'mobile-390x844', width: 390, height: 844 },
  { name: 'mobile-360x800', width: 360, height: 800 },
];

test.describe('Paisa tab responsive browser smoke test', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('/admin.html', { waitUntil: 'domcontentloaded' });

    // Create a valid local admin session through the app's own session helper.
    // No real credentials or external account are used by this browser test.
    await page.evaluate(() => {
      if (typeof window.createAdminSession !== 'function') {
        throw new Error('createAdminSession is not available');
      }
      window.createAdminSession('admin', false);
    });

    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof window.showTab === 'function', null, { timeout: 15000 });
    await page.evaluate(async () => {
      await window.showTab('paisa');
    });

    await expect(page.locator('#paisa .paisa-header-bar')).toBeVisible({ timeout: 15000 });
  });

  for (const viewport of viewports) {
    test(`${viewport.name} has no horizontal overflow and renders key controls`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => typeof window.showTab === 'function', null, { timeout: 15000 });
      await page.evaluate(() => window.showTab('paisa'));
      await expect(page.locator('#paisa .paisa-header-bar')).toBeVisible({ timeout: 15000 });

      const layout = await page.evaluate(() => {
        const root = document.documentElement;
        const body = document.body;
        const paisa = document.querySelector('#paisa');
        const header = document.querySelector('#paisa .paisa-header-bar');
        const actions = document.querySelector('#paisa .paisa-header-actions');
        const tabs = document.querySelector('#paisa .paisa-account-nav-tabs');
        return {
          viewportWidth: window.innerWidth,
          documentScrollWidth: root.scrollWidth,
          bodyScrollWidth: body.scrollWidth,
          paisaWidth: paisa?.getBoundingClientRect().width ?? 0,
          headerWidth: header?.getBoundingClientRect().width ?? 0,
          actionsWidth: actions?.getBoundingClientRect().width ?? 0,
          tabsWidth: tabs?.getBoundingClientRect().width ?? 0,
        };
      });

      expect(layout.documentScrollWidth).toBeLessThanOrEqual(layout.viewportWidth + 1);
      expect(layout.bodyScrollWidth).toBeLessThanOrEqual(layout.viewportWidth + 1);
      expect(layout.paisaWidth).toBeLessThanOrEqual(layout.viewportWidth + 1);
      expect(layout.headerWidth).toBeLessThanOrEqual(layout.viewportWidth + 1);
      expect(layout.actionsWidth).toBeGreaterThan(0);
      expect(layout.tabsWidth).toBeGreaterThan(0);

      await expect(page.locator('#paisa .paisa-account-nav-tabs')).toBeVisible();
      await expect(page.locator('#paisa .paisa-big-actions')).toBeVisible();
      await page.screenshot({
        path: `artifacts/paisa-responsive/${viewport.name}.png`,
        fullPage: true,
      });
    });
  }
});
