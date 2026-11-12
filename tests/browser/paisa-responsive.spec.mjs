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
    await page.goto('/index.html', { waitUntil: 'domcontentloaded' });

    // Create a valid local admin session through the app's own session helper.
    await page.evaluate(async () => {
      if (typeof window.createAdminSession === 'function') {
        window.createAdminSession('admin', false);
      }
      if (typeof window.showTab === 'function') {
        await window.showTab('paisa');
      }
    });

    await expect(page.locator('#paisa .paisa-header-bar')).toBeVisible({ timeout: 15000 });
  });

  for (const viewport of viewports) {
    test(`${viewport.name} has no horizontal overflow and renders key controls`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForTimeout(300);

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

  test('search bar has no inner focus borders or icon overlap, and specific day uses custom datepicker', async ({ page }) => {
    // 1. Verify search input layout and focus styling
    const searchInput = page.locator('#paisaTxnSearchInput');
    const searchIcon = page.locator('#paisaVirtualView .search-input-area .paisa-search-icon');
    await expect(searchInput).toBeVisible();
    await expect(searchIcon).toBeVisible();

    const iconBox = await searchIcon.boundingBox();
    const inputBox = await searchInput.boundingBox();
    expect(iconBox).not.toBeNull();
    expect(inputBox).not.toBeNull();
    // Icon right edge must not exceed the start of the input text field (no overlap)
    expect(iconBox.x + iconBox.width).toBeLessThanOrEqual(inputBox.x + 2);

    // Focus input and verify no inner borders or box-shadow on input element
    await searchInput.focus();
    const inputStyles = await searchInput.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        borderStyle: computed.borderStyle,
        outlineStyle: computed.outlineStyle,
        boxShadow: computed.boxShadow,
      };
    });
    expect(inputStyles.outlineStyle).toBe('none');
    expect(inputStyles.boxShadow).toBe('none');

    // 2. Verify Segmented Group with Equal Width on Filtered Totals Strip
    const totalsStrip = page.locator('#paisaFilteredTotalsStrip');
    await expect(totalsStrip).toBeVisible();
    const pills = totalsStrip.locator('.paisa-summary-pill');
    await expect(pills).toHaveCount(3);

    const pillBoxes = await Promise.all([
      pills.nth(0).boundingBox(),
      pills.nth(1).boundingBox(),
      pills.nth(2).boundingBox(),
    ]);
    expect(pillBoxes[0]).not.toBeNull();
    expect(pillBoxes[1]).not.toBeNull();
    expect(pillBoxes[2]).not.toBeNull();
    // Segmented items must have equal width (within 2px rounding tolerance)
    expect(Math.abs(pillBoxes[0].width - pillBoxes[1].width)).toBeLessThanOrEqual(2);
    expect(Math.abs(pillBoxes[1].width - pillBoxes[2].width)).toBeLessThanOrEqual(2);

    // 3. Verify Custom Date Picker on Virtual Filter Popup
    const filterBtn = page.locator('#filterBtn');
    await filterBtn.click();
    await expect(page.locator('#filterPopup')).toHaveClass(/open/);

    const specificDayBtn = page.locator('#paisaDateFilterBtn');
    await expect(specificDayBtn).toBeVisible();
    await specificDayBtn.click();

    // Custom Date Picker Popup must be mounted and open
    const customDatePicker = page.locator('#globalCustomDatePickerPopup');
    await expect(customDatePicker).toBeVisible();
    await expect(customDatePicker).toHaveClass(/open/);

    // Select today from custom date picker
    const todayBtn = customDatePicker.locator('.cdp-today-btn');
    await expect(todayBtn).toBeVisible();
    await todayBtn.click();

    // Verify popup closes and button text updates to formatted date
    await expect(customDatePicker).not.toHaveClass(/open/);
    await expect(page.locator('#paisaDateFilterBtnText')).not.toHaveText('Specific Day');
    await expect(page.locator('#paisaDateFilterClearBtn')).toBeVisible();

    // Apply filters and check active chip
    await page.locator('#applyBtn').click();
    await expect(page.locator('#paisaActiveFiltersBar')).toBeVisible();
    await expect(page.locator('#paisaActiveChipsContainer .paisa-active-chip.chip-date')).toBeVisible();

    // Clear date filter
    await page.locator('#paisaActiveChipsContainer .paisa-active-chip.chip-date .paisa-active-chip-close').click();
    await expect(page.locator('#paisaDateFilterBtnText')).toHaveText('Specific Day');

    // 3. Verify Custom Date Picker and Filter in Personal Account View
    const personalTabBtn = page.locator('#paisaTabPersonalBtn');
    await personalTabBtn.click();
    await expect(page.locator('#paisaPersonalView')).toBeVisible();

    // Verify personal search input and search icon
    const personalSearchInput = page.locator('#paisaPersonalTxnSearchInput');
    const personalSearchIcon = page.locator('#paisaPersonalView .search-input-area .paisa-search-icon');
    await expect(personalSearchInput).toBeVisible();
    await expect(personalSearchIcon).toBeVisible();

    const personalFilterBtn = page.locator('#paisaPersonalFilterBtn');
    await expect(personalFilterBtn).toBeVisible();
    await personalFilterBtn.click();
    await expect(page.locator('#paisaPersonalFilterPopup')).toHaveClass(/open/);

    const personalDateBtn = page.locator('#paisaPersonalDateFilterBtn');
    await expect(personalDateBtn).toBeVisible();
    await personalDateBtn.click();

    await expect(customDatePicker).toBeVisible();
    await expect(customDatePicker).toHaveClass(/open/);

    await todayBtn.click();
    await expect(customDatePicker).not.toHaveClass(/open/);
    await expect(page.locator('#paisaPersonalDateFilterBtnText')).not.toHaveText('Specific Day');

    // Apply personal filter and verify active chip
    await page.locator('#paisaPersonalApplyBtn').click();
    await expect(page.locator('#paisaPersonalActiveFiltersBar')).toBeVisible();
    await expect(page.locator('#paisaPersonalActiveFiltersBar .paisa-active-chip.chip-date')).toBeVisible();

    // Clear personal date filter via active chip
    await page.locator('#paisaPersonalActiveFiltersBar .paisa-active-chip.chip-date .paisa-active-chip-close').click();
    await expect(page.locator('#paisaPersonalDateFilterBtnText')).toHaveText('Specific Day');
  });
});