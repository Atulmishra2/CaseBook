import { test, expect } from 'playwright/test';

test.describe('Settings Tab - GOD Mode Zero-Scrollbar & Swipe Navigation Suite', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(45000);
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

  test('eradicates scrollbars on collection pills and data table in GOD Mode', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator('#btnSettingsSubtabDb').click({ force: true });
    await expect(page.locator('#settingsSubtabDbStudio')).toBeVisible();

    // Verify computed scrollbar styling on .db-studio-collections-nav
    const pillsNavScrollbar = await page.locator('.db-studio-collections-nav').evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.scrollbarWidth;
    });
    expect(pillsNavScrollbar).toBe('none');

    // Verify computed scrollbar styling on .db-studio-table-wrap
    const tableWrapScrollbar = await page.locator('.db-studio-table-wrap').evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.scrollbarWidth;
    });
    expect(tableWrapScrollbar).toBe('none');
  });

  test('supports touch swipe left and right to navigate collections smoothly', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator('#btnSettingsSubtabDb').click({ force: true });
    await expect(page.locator('#settingsSubtabDbStudio')).toBeVisible();

    // Verify initial collection is 'cases'
    const initialActive = page.locator('.db-col-pill.active');
    await expect(initialActive).toHaveAttribute('data-col', 'cases');
    await expect(page.locator('#dbStudioActiveTableTitle')).toContainText('Cases Collection');

    // Perform swipe left via window.navigateDbStudioCollectionBySwipe or touch events
    await page.evaluate(() => {
      window.navigateDbStudioCollectionBySwipe('next');
    });

    // Active collection should now be 'hearings'
    await expect(page.locator('.db-col-pill.active')).toHaveAttribute('data-col', 'hearings');
    await expect(page.locator('#dbStudioActiveTableTitle')).toContainText('Hearing');

    // Perform swipe left again -> 'courts'
    await page.evaluate(() => {
      window.navigateDbStudioCollectionBySwipe('next');
    });
    await expect(page.locator('.db-col-pill.active')).toHaveAttribute('data-col', 'courts');
    await expect(page.locator('#dbStudioActiveTableTitle')).toContainText('Court');

    // Perform swipe right -> back to 'hearings'
    await page.evaluate(() => {
      window.navigateDbStudioCollectionBySwipe('prev');
    });
    await expect(page.locator('.db-col-pill.active')).toHaveAttribute('data-col', 'hearings');
  });

  test('supports keyboard ArrowLeft and ArrowRight to navigate collections in GOD Mode', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.locator('#btnSettingsSubtabDb').click({ force: true });
    await expect(page.locator('#settingsSubtabDbStudio')).toBeVisible();

    await expect(page.locator('.db-col-pill.active')).toHaveAttribute('data-col', 'cases');

    // Press ArrowRight to navigate next
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('.db-col-pill.active')).toHaveAttribute('data-col', 'hearings');

    // Press ArrowRight again -> 'courts'
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('.db-col-pill.active')).toHaveAttribute('data-col', 'courts');

    // Press ArrowLeft to navigate prev -> 'hearings'
    await page.keyboard.press('ArrowLeft');
    await expect(page.locator('.db-col-pill.active')).toHaveAttribute('data-col', 'hearings');
  });
});
