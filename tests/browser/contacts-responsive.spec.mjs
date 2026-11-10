import { test, expect } from 'playwright/test';

const viewports = [
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'desktop-1024', width: 1024, height: 768 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'mobile-430', width: 430, height: 932 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'mobile-360', width: 360, height: 800 },
  { name: 'mobile-320', width: 320, height: 568 },
];

test.describe('Contacts (Helpers) Tab - Responsiveness & Custom Dropdown Audit', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('/index.html', { waitUntil: 'domcontentloaded' });

    // Establish admin session and set mock data
    await page.evaluate(() => {
      if (typeof window.createAdminSession === 'function') {
        window.createAdminSession('admin', false);
      }
      const mockContacts = [
        { id: 'c1', name: 'Ramesh Chandra Sharma', court: 'Commercial Court / District & Sessions Judge', position: 'Reader (पेशकार)', mobile: '9876543210' },
        { id: 'c2', name: 'Virendra Kumar Singh', court: 'Family Court, Courtroom No. 4', position: 'Ahlmad (अहलमद)', mobile: '9123456789' },
        { id: 'c3', name: 'Sunita Devi', court: 'Chief Metropolitan Magistrate Court', position: 'Stenographer (स्टेनो)', mobile: '9988776655' },
        { id: 'c4', name: 'Rajesh Pal', court: 'Fast Track Special Court (POCSO)', position: 'Peon / Orderly', mobile: '' },
        { id: 'c5', name: 'Advocate Clerk Munshi Ji', court: 'General / All Courts', position: 'Munshi / Advocate Clerk', mobile: '9450001122' },
      ];
      localStorage.setItem('casebook_court_helpers', JSON.stringify(mockContacts));
      localStorage.setItem('casebook_active_tab', 'helpers');
    });

    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof window.showTab === 'function', null, { timeout: 15000 });

    // Switch to helpers tab and re-render
    await page.evaluate(async () => {
      await window.showTab('helpers');
      if (typeof window.renderHelpersTable === 'function') {
        window.renderHelpersTable();
      }
    });

    await expect(page.locator('#helpers')).toHaveClass(/active/, { timeout: 15000 });
    await expect(page.locator('#helpersCardsGrid')).toBeVisible({ timeout: 15000 });
  });

  for (const vp of viewports) {
    test(`Viewport ${vp.name} (${vp.width}x${vp.height}): zero overflow & zero dropdown icon/text overlap`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.waitForTimeout(300);

      // Verify helpers tab is active
      await page.evaluate(async () => {
        if (typeof window.showTab === 'function') {
          await window.showTab('helpers');
        }
      });
      await expect(page.locator('#helpers')).toHaveClass(/active/);
      await expect(page.locator('#helpersCardsGrid')).toBeVisible();

      // 1. Check for horizontal overflow on body, html, #helpers, and tab container
      const overflowData = await page.evaluate(() => {
        const root = document.documentElement;
        const body = document.body;
        const container = document.querySelector('.helpers-tab-container');
        const header = document.querySelector('.contacts-header-section');
        const toolbar = document.querySelector('.contacts-toolbar');
        const grid = document.querySelector('.contacts-cards-grid');

        const checkOverflow = (el) => {
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          return {
            scrollWidth: el.scrollWidth,
            clientWidth: el.clientWidth,
            offsetWidth: el.offsetWidth,
            rectWidth: rect.width,
            overflowing: el.scrollWidth > el.clientWidth + 1,
          };
        };

        return {
          windowInnerWidth: window.innerWidth,
          docScrollWidth: root.scrollWidth,
          bodyScrollWidth: body.scrollWidth,
          container: checkOverflow(container),
          header: checkOverflow(header),
          toolbar: checkOverflow(toolbar),
          grid: checkOverflow(grid),
        };
      });

      expect(overflowData.docScrollWidth).toBeLessThanOrEqual(vp.width + 1);
      expect(overflowData.bodyScrollWidth).toBeLessThanOrEqual(vp.width + 1);
      if (overflowData.container) {
        expect(overflowData.container.scrollWidth).toBeLessThanOrEqual(vp.width + 1);
      }
      if (overflowData.toolbar) {
        expect(overflowData.toolbar.scrollWidth).toBeLessThanOrEqual(vp.width + 1);
      }

      // 2. Mathematically test Custom Dropdown trigger (ZERO OVERLAP CHECK)
      const triggerMetrics = await page.evaluate(() => {
        const trigger = document.querySelector('#contactsCourtDropdownTrigger');
        const prefix = document.querySelector('.contacts-dropdown-prefix-icon');
        const label = document.querySelector('#contactsCourtDropdownLabel');
        const suffix = document.querySelector('.contacts-dropdown-suffix-icon');
        if (!trigger || !prefix || !label || !suffix) return null;

        const tRect = trigger.getBoundingClientRect();
        const pRect = prefix.getBoundingClientRect();
        const lRect = label.getBoundingClientRect();
        const sRect = suffix.getBoundingClientRect();

        return {
          triggerWidth: tRect.width,
          prefixRight: pRect.right,
          labelLeft: lRect.left,
          labelRight: lRect.right,
          suffixLeft: sRect.left,
          // Overlap flags: prefix right must be <= label left, suffix left must be >= label right
          prefixOverlapsLabel: pRect.right > lRect.left + 0.5,
          suffixOverlapsLabel: lRect.right > sRect.left + 0.5,
        };
      });

      expect(triggerMetrics).not.toBeNull();
      expect(triggerMetrics.prefixOverlapsLabel).toBe(false);
      expect(triggerMetrics.suffixOverlapsLabel).toBe(false);

      // 3. Test opening custom dropdown
      await page.click('#contactsCourtDropdownTrigger');
      await page.waitForTimeout(150);

      const isDropdownOpen = await page.evaluate(() => {
        const dd = document.querySelector('#contactsCourtCustomDropdown');
        return dd && dd.classList.contains('open');
      });
      expect(isDropdownOpen).toBe(true);

      // Verify dropdown options exist
      const optionCount = await page.evaluate(() => {
        const items = document.querySelectorAll('#contactsCourtDropdownList .contacts-dropdown-item');
        return items.length;
      });
      expect(optionCount).toBeGreaterThan(1);

      // 4. Select a court option via custom dropdown select function
      await page.evaluate(() => {
        window.selectContactsCourtOption('Family Court, Courtroom No. 4');
      });
      await page.waitForTimeout(200);

      // Verify label updated
      const updatedLabel = await page.evaluate(() => {
        return document.querySelector('#contactsCourtDropdownLabel')?.textContent;
      });
      expect(updatedLabel).toBe('Family Court, Courtroom No. 4');

      // Verify filtered cards
      const visibleCards = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.contact-name')).map(el => el.textContent.trim());
      });
      expect(visibleCards).toContain('Virendra Kumar Singh');
      expect(visibleCards).not.toContain('Ramesh Chandra Sharma');

      // Check overlap again with the selected court name
      const triggerMetricsAfterSelect = await page.evaluate(() => {
        const prefix = document.querySelector('.contacts-dropdown-prefix-icon');
        const label = document.querySelector('#contactsCourtDropdownLabel');
        const suffix = document.querySelector('.contacts-dropdown-suffix-icon');
        const pRect = prefix.getBoundingClientRect();
        const lRect = label.getBoundingClientRect();
        const sRect = suffix.getBoundingClientRect();

        return {
          prefixOverlapsLabel: pRect.right > lRect.left + 0.5,
          suffixOverlapsLabel: lRect.right > sRect.left + 0.5,
        };
      });
      expect(triggerMetricsAfterSelect.prefixOverlapsLabel).toBe(false);
      expect(triggerMetricsAfterSelect.suffixOverlapsLabel).toBe(false);

      // Reset to All Courts
      await page.evaluate(() => {
        window.selectContactsCourtOption('');
      });
      await page.waitForTimeout(200);
    });
  }
});
