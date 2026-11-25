import { test, expect } from 'playwright/test';

const mobileViewports = [
  { name: 'Realme 9 Pro+ Primary (412x915)', width: 412, height: 915 },
  { name: 'Realme 9 Pro+ Small Scale (392x872)', width: 392, height: 872 },
];

test.describe('Paisa Manager (#paisa) Realme 9 Pro+ Responsive Audit', () => {
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
    test(`Audit Paisa Viewport, Touch Targets & Dock Clearance on ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });

      await page.evaluate(async () => {
        if (typeof window.showTab === 'function') {
          await window.showTab('paisa');
        }
      });

      await page.waitForTimeout(500);

      const audit = await page.evaluate((vpWidth) => {
        const paisaTab = document.querySelector('#paisa');
        const rootClientWidth = document.documentElement.clientWidth;
        const rootScrollWidth = document.documentElement.scrollWidth;
        const bodyScrollWidth = document.body.scrollWidth;

        const containerPaddingBottom = paisaTab
          ? parseFloat(window.getComputedStyle(paisaTab).paddingBottom)
          : 0;

        const inputs = Array.from(
          document.querySelectorAll('#paisa input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), #paisa select, #paisa textarea')
        ).filter((el) => window.getComputedStyle(el).display !== 'none' && el.offsetParent !== null);
        const inputFontSizes = inputs.map((inp) => ({
          id: inp.id,
          className: inp.className,
          fontSize: parseFloat(window.getComputedStyle(inp).fontSize),
        }));

        const actionButtons = Array.from(
          document.querySelectorAll(
            '#paisa .paisa-nav-tab-btn, #paisa .paisa-icon-btn, #paisa .paisa-action-btn, #paisa .paisa-personal-btn, #paisa .custom-dropdown-trigger'
          )
        ).filter((el) => el.offsetParent !== null);
        const buttonHeights = actionButtons.map((b) => ({
          id: b.id,
          className: b.className,
          height: b.getBoundingClientRect().height,
        }));

        const overflows = [];
        const allElements = paisaTab ? paisaTab.querySelectorAll('*') : [];
        allElements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const style = window.getComputedStyle(el);
          const scrollContainer = el.closest(
            '.custom-dropdown-list, .paisa-filter-bar, .paisa-filtered-totals-strip, [style*="overflow-x: auto"]'
          );
          if (scrollContainer && scrollContainer !== el) return;

          if (
            style.display !== 'none' &&
            style.visibility !== 'hidden' &&
            rect.width > 0 &&
            rect.height > 0 &&
            el.offsetParent !== null &&
            rect.right > vpWidth + 1.5
          ) {
            overflows.push({
              tag: el.tagName,
              className: el.className,
              id: el.id,
              right: rect.right,
            });
          }
        });

        return {
          rootClientWidth,
          rootScrollWidth,
          bodyScrollWidth,
          containerPaddingBottom,
          inputFontSizes,
          buttonHeights,
          overflows,
        };
      }, vp.width);

      expect(audit.rootScrollWidth).toBeLessThanOrEqual(vp.width + 1);
      expect(audit.bodyScrollWidth).toBeLessThanOrEqual(vp.width + 1);
      expect(audit.overflows).toEqual([]);
      expect(audit.containerPaddingBottom).toBeGreaterThanOrEqual(88);
      audit.inputFontSizes.forEach((inp) => expect(inp.fontSize, `${inp.id} ${inp.className}`).toBeGreaterThanOrEqual(16));
      audit.buttonHeights.forEach((b) => expect(b.height, `${b.id} ${b.className}`).toBeGreaterThanOrEqual(43.5));
    });
  }

  test('Verify Desktop Viewport (1280x800) Baseline 0% Regression on Paisa', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });

    await page.evaluate(async () => {
      if (typeof window.showTab === 'function') {
        await window.showTab('paisa');
      }
    });

    await page.waitForTimeout(500);

    const desktopCheck = await page.evaluate(() => {
      const paisaTab = document.querySelector('#paisa');
      const smartDock = document.querySelector('.cb-smart-dock');
      const sidebar = document.querySelector('.sidebar, .sidenav');
      return {
        paisaVisible: !!paisaTab && window.getComputedStyle(paisaTab).display !== 'none',
        smartDockDisplay: smartDock ? window.getComputedStyle(smartDock).display : 'none',
        sidebarVisible: sidebar ? window.getComputedStyle(sidebar).display !== 'none' : false,
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      };
    });

    expect(desktopCheck.paisaVisible).toBe(true);
    expect(desktopCheck.smartDockDisplay).toBe('none');
    expect(desktopCheck.sidebarVisible).toBe(true);
    expect(desktopCheck.scrollWidth).toBeLessThanOrEqual(desktopCheck.clientWidth + 1);
  });
});
