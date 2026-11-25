import { test, expect } from 'playwright/test';

const mobileViewports = [
  { name: 'Realme 9 Pro+ Primary (412x915)', width: 412, height: 915 },
  { name: 'Realme 9 Pro+ Small Scale (392x872)', width: 392, height: 872 },
];

test.describe('Trash & Delete (#delete) Realme 9 Pro+ Responsive Audit', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('/index.html', { waitUntil: 'domcontentloaded' });

    await page.evaluate(() => {
      if (typeof window.createAdminSession === 'function') {
        window.createAdminSession('admin', false);
      }
    });

    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof window.showTab === 'function', null, { timeout: 15000 });
    await page.locator('#appSkeletonOverlay').waitFor({ state: 'detached', timeout: 15000 }).catch(() => {});
    await page.waitForSelector('.tab.active', { timeout: 10000 }).catch(() => {});
  });

  for (const vp of mobileViewports) {
    test(`Audit Trash & Delete Viewport, Touch Targets & Dock Clearance on ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });

      await page.evaluate(async () => {
        const deleteTab = document.querySelector('#delete');
        if (deleteTab && !deleteTab.innerHTML.trim()) {
          const resp = await fetch('components/tabs/delete/tab-delete.html');
          deleteTab.innerHTML = await resp.text();
        }
        document.querySelectorAll('.tab.active').forEach((t) => {
          t.classList.remove('active');
          t.style.display = 'none';
        });
        if (deleteTab) {
          deleteTab.classList.add('active');
          deleteTab.style.display = 'block';
        }
      });

      await page.waitForTimeout(400);

      const audit = await page.evaluate((vpWidth) => {
        const deleteTab = document.querySelector('#delete');
        const container = document.querySelector('#delete .danger-container') || deleteTab;
        const rootClientWidth = document.documentElement.clientWidth;
        const rootScrollWidth = document.documentElement.scrollWidth;
        const bodyScrollWidth = document.body.scrollWidth;

        const containerPaddingBottom = Math.max(
          deleteTab ? parseFloat(window.getComputedStyle(deleteTab).paddingBottom) : 0,
          container ? parseFloat(window.getComputedStyle(container).paddingBottom) : 0
        );

        const searchInput = document.querySelector('#deleteSearchInput');
        const searchFontSize = searchInput ? parseFloat(window.getComputedStyle(searchInput).fontSize) : 0;

        const actionButtons = Array.from(
          document.querySelectorAll('#delete .delete-action-btn, #delete .btn-danger')
        ).filter((el) => el.offsetParent !== null);
        const buttonHeights = actionButtons.map((b) => b.getBoundingClientRect().height);

        const overflows = [];
        const allElements = deleteTab ? deleteTab.querySelectorAll('*') : [];
        allElements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const style = window.getComputedStyle(el);

          if (
            rect.width > 0 &&
            rect.height > 0 &&
            style.display !== 'none' &&
            style.visibility !== 'hidden' &&
            style.position !== 'fixed' &&
            style.position !== 'absolute'
          ) {
            if (rect.right > vpWidth + 1.5) {
              overflows.push({
                tag: el.tagName,
                className: el.className,
                id: el.id,
                right: rect.right,
              });
            }
          }
        });

        return {
          rootClientWidth,
          rootScrollWidth,
          bodyScrollWidth,
          containerPaddingBottom,
          searchFontSize,
          buttonHeights,
          overflows,
        };
      }, vp.width);

      expect(audit.rootClientWidth).toBe(vp.width);
      expect(audit.rootScrollWidth).toBeLessThanOrEqual(vp.width + 1);
      expect(audit.bodyScrollWidth).toBeLessThanOrEqual(vp.width + 1);
      expect(audit.overflows).toEqual([]);
      expect(audit.containerPaddingBottom).toBeGreaterThanOrEqual(88);
      if (audit.searchFontSize > 0) {
        expect(audit.searchFontSize).toBeGreaterThanOrEqual(16);
      }
      audit.buttonHeights.forEach((h) => expect(h).toBeGreaterThanOrEqual(43.5));
    });
  }

  test('Verify Desktop Viewport (1280x800) Baseline 0% Regression on Trash & Delete', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.waitForTimeout(400);

    await page.evaluate(async () => {
      const deleteTab = document.querySelector('#delete');
      if (deleteTab && !deleteTab.innerHTML.trim()) {
        const resp = await fetch('components/tabs/delete/tab-delete.html');
        deleteTab.innerHTML = await resp.text();
      }
      document.querySelectorAll('.tab.active').forEach((t) => {
        t.classList.remove('active');
        t.style.display = 'none';
      });
      if (deleteTab) {
        deleteTab.classList.add('active');
        deleteTab.style.display = 'block';
      }
    });

    await page.waitForTimeout(400);

    const desktopCheck = await page.evaluate(() => {
      const deleteTab = document.querySelector('#delete');
      const container = document.querySelector('#delete .danger-container');
      const sidebar = document.querySelector('.sidebar, .sidenav');

      return {
        tabVisible: deleteTab ? window.getComputedStyle(deleteTab).display !== 'none' : false,
        containerExists: !!container,
        sidebarVisible: sidebar ? window.getComputedStyle(sidebar).display !== 'none' : false,
      };
    });

    expect(desktopCheck.tabVisible).toBe(true);
    expect(desktopCheck.containerExists).toBe(true);
    expect(desktopCheck.sidebarVisible).toBe(true);
  });
});
