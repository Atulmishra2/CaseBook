import { test, expect } from 'playwright/test';

const viewports = [
  { name: 'desktop-1440x900', width: 1440, height: 900 },
  { name: 'tablet-768x1024', width: 768, height: 1024 },
  { name: 'mobile-390x844', width: 390, height: 844 },
  { name: 'mobile-360x800', width: 360, height: 800 },
];

test.describe('Settings Tab - Full Responsive Browser Test Suite', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('/index.html', { waitUntil: 'domcontentloaded' });

    // Establish valid session and reload into authenticated state
    await page.evaluate(() => {
      if (typeof window.createAdminSession === 'function') {
        window.createAdminSession('admin', false);
      }
    });

    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof window.showTab === 'function', null, { timeout: 15000 });

    await page.evaluate(async () => {
      await window.showTab('settings');
    });

    await expect(page.locator('#settings .settings-hero')).toBeVisible({ timeout: 15000 });
  });

  for (const viewport of viewports) {
    test(`${viewport.name}: zero horizontal overflow & responsive components adaptation`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForTimeout(300);

      // Ensure settings tab is currently active
      await page.evaluate(async () => {
        if (typeof window.showTab === 'function') {
          await window.showTab('settings');
        }
      });
      await expect(page.locator('#settings')).toHaveClass(/active/);
      await expect(page.locator('#settings .settings-hero')).toBeVisible();
      await page.waitForTimeout(200);

      // 1. Verify No Horizontal Overflow
      const overflowMetrics = await page.evaluate(() => {
        const root = document.documentElement;
        const body = document.body;
        const settings = document.querySelector('#settings');
        const container = document.querySelector('.settings-container');
        const hero = document.querySelector('.settings-hero');
        const statsRow = document.querySelector('.settings-stats-row');
        const supabaseCard = document.querySelector('#supabaseCard');
        const adminCard = document.querySelector('#adminPasswordCard');
        const diagCard = document.querySelector('#diagnosticsCard');

        return {
          viewportWidth: window.innerWidth,
          docScrollWidth: root.scrollWidth,
          bodyScrollWidth: body.scrollWidth,
          settingsWidth: settings?.getBoundingClientRect().width ?? 0,
          containerWidth: container?.getBoundingClientRect().width ?? 0,
          heroWidth: hero?.getBoundingClientRect().width ?? 0,
          statsRowWidth: statsRow?.getBoundingClientRect().width ?? 0,
          supabaseCardWidth: supabaseCard?.getBoundingClientRect().width ?? 0,
          adminCardWidth: adminCard?.getBoundingClientRect().width ?? 0,
          diagCardWidth: diagCard?.getBoundingClientRect().width ?? 0,
        };
      });

      // Assert document and element widths do not exceed viewport width + 2px tolerance
      expect(overflowMetrics.docScrollWidth).toBeLessThanOrEqual(overflowMetrics.viewportWidth + 2);
      expect(overflowMetrics.bodyScrollWidth).toBeLessThanOrEqual(overflowMetrics.viewportWidth + 2);
      expect(overflowMetrics.containerWidth).toBeLessThanOrEqual(overflowMetrics.viewportWidth + 2);
      expect(overflowMetrics.heroWidth).toBeLessThanOrEqual(overflowMetrics.viewportWidth + 2);
      expect(overflowMetrics.statsRowWidth).toBeLessThanOrEqual(overflowMetrics.viewportWidth + 2);
      expect(overflowMetrics.supabaseCardWidth).toBeLessThanOrEqual(overflowMetrics.viewportWidth + 2);
      expect(overflowMetrics.adminCardWidth).toBeLessThanOrEqual(overflowMetrics.viewportWidth + 2);
      expect(overflowMetrics.diagCardWidth).toBeLessThanOrEqual(overflowMetrics.viewportWidth + 2);

      // 2. Component Visibility Checks
      await expect(page.locator('.settings-hero')).toBeVisible();
      await expect(page.locator('.settings-hero-title')).toBeVisible();
      await expect(page.locator('.settings-stats-row')).toBeVisible();
      await expect(page.locator('#supabaseCard')).toBeVisible();
      await expect(page.locator('#adminPasswordCard')).toBeVisible();
      await expect(page.locator('#diagnosticsCard')).toBeVisible();

      // 3. Verify Default Collapsed State & Expand for Form Usability
      const supabaseContent = page.locator('#supabaseContent');
      const passwordContent = page.locator('#passwordContent');

      // Expand both cards to verify form controls and inputs
      const isSupabaseOpen = await supabaseContent.evaluate(el => el.classList.contains('open'));
      if (!isSupabaseOpen) {
        await page.locator('#supabaseCard .settings-collapse-btn').click({ force: true });
      }

      const isPasswordOpen = await passwordContent.evaluate(el => el.classList.contains('open'));
      if (!isPasswordOpen) {
        await page.locator('#adminPasswordCard .settings-collapse-btn').click({ force: true });
      }
      await page.waitForTimeout(300);

      const inputs = page.locator('#settings input.settings-input');
      const inputCount = await inputs.count();
      expect(inputCount).toBeGreaterThanOrEqual(4);

      for (let i = 0; i < inputCount; i++) {
        const input = inputs.nth(i);
        await expect(input).toBeVisible();
        const box = await input.boundingBox();
        expect(box).not.toBeNull();
        if (box) {
          // Touch-friendly height (at least 36px)
          expect(box.height).toBeGreaterThanOrEqual(36);
          // Within screen boundary
          expect(box.x + box.width).toBeLessThanOrEqual(viewport.width + 2);
        }
      }

      // 4. Action Buttons Accessibility
      const primaryBtns = page.locator('#settings .settings-btn-primary');
      const btnCount = await primaryBtns.count();
      expect(btnCount).toBeGreaterThanOrEqual(2);

      for (let i = 0; i < btnCount; i++) {
        const btn = primaryBtns.nth(i);
        await expect(btn).toBeVisible();
        const box = await btn.boundingBox();
        expect(box).not.toBeNull();
        if (box) {
          expect(box.height).toBeGreaterThanOrEqual(32);
          expect(box.x + box.width).toBeLessThanOrEqual(viewport.width + 2);
        }
      }

      // 5. Capture Snapshot for Visual Proof
      await page.locator('#settings').screenshot({
        path: `test-results/settings-responsive-${viewport.name}.png`,
      });

      // 6. Test Database Studio Sub-tab Responsiveness & Search Bar Stability
      await page.locator('#btnSettingsSubtabDb').click({ force: true });
      await page.waitForTimeout(300);

      const dbStudioPane = page.locator('#settingsSubtabDbStudio');
      await expect(dbStudioPane).toBeVisible();

      // Check Zero Overflow on Database Studio
      const dbOverflowMetrics = await page.evaluate(() => {
        const root = document.documentElement;
        const body = document.body;
        const studioPane = document.querySelector('#settingsSubtabDbStudio');
        const studioTableCard = document.querySelector('.db-studio-table-card');
        return {
          viewportWidth: window.innerWidth,
          docScrollWidth: root.scrollWidth,
          bodyScrollWidth: body.scrollWidth,
          studioPaneWidth: studioPane?.getBoundingClientRect().width ?? 0,
          tableCardWidth: studioTableCard?.getBoundingClientRect().width ?? 0,
        };
      });

      expect(dbOverflowMetrics.docScrollWidth).toBeLessThanOrEqual(dbOverflowMetrics.viewportWidth + 2);
      expect(dbOverflowMetrics.bodyScrollWidth).toBeLessThanOrEqual(dbOverflowMetrics.viewportWidth + 2);
      expect(dbOverflowMetrics.studioPaneWidth).toBeLessThanOrEqual(dbOverflowMetrics.viewportWidth + 2);
      expect(dbOverflowMetrics.tableCardWidth).toBeLessThanOrEqual(dbOverflowMetrics.viewportWidth + 2);

      // Verify Search Bar Icon and Text are Not Collapsed or Overlapping
      const searchWrap = page.locator('.db-studio-search-wrap');
      const searchIcon = page.locator('.db-studio-search-icon-box');
      const searchInput = page.locator('#dbStudioSearchInput');

      await expect(searchWrap).toBeVisible();
      await expect(searchIcon).toBeVisible();
      await expect(searchInput).toBeVisible();

      const wrapBox = await searchWrap.boundingBox();
      const iconBox = await searchIcon.boundingBox();
      const inputBox = await searchInput.boundingBox();

      expect(wrapBox).not.toBeNull();
      expect(iconBox).not.toBeNull();
      expect(inputBox).not.toBeNull();

      if (wrapBox && iconBox && inputBox) {
        // Icon must be placed before the input (to the left) without collision
        expect(iconBox.x).toBeLessThan(inputBox.x);
        // Input width must be substantial (not collapsed to 0)
        expect(inputBox.width).toBeGreaterThan(120);
        // Both fit inside the wrapper
        expect(inputBox.x + inputBox.width).toBeLessThanOrEqual(wrapBox.x + wrapBox.width + 2);
      }
    });
  }
});
