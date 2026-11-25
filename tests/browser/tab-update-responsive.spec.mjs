import { test, expect } from 'playwright/test';

const mobileViewports = [
  { name: 'Realme 9 Pro+ Primary (412x915)', width: 412, height: 915 },
  { name: 'Realme 9 Pro+ Small Scale (392x872)', width: 392, height: 872 },
];

test.describe('Edit Case Form (#update) Realme 9 Pro+ Responsive Audit', () => {
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
    test(`Audit Edit Case Form Viewport, Touch Targets & Dock Clearance on ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });

      await page.evaluate(async () => {
        const updateTab = document.querySelector('#update');
        if (updateTab && !updateTab.innerHTML.trim()) {
          const resp = await fetch('components/tabs/update/tab-update.html');
          updateTab.innerHTML = await resp.text();
        }
        document.querySelectorAll('.tab.active').forEach((t) => {
          t.classList.remove('active');
          t.style.display = 'none';
        });
        if (updateTab) {
          updateTab.classList.add('active');
          updateTab.style.display = 'block';
        }
      });

      await page.waitForTimeout(400);

      const audit = await page.evaluate((vpWidth) => {
        const updateTab = document.querySelector('#update');
        const wrapper = document.querySelector('#update .tab-card-wrapper') || updateTab;
        const rootClientWidth = document.documentElement.clientWidth;
        const rootScrollWidth = document.documentElement.scrollWidth;
        const bodyScrollWidth = document.body.scrollWidth;

        // Dock clearance
        const containerPaddingBottom = wrapper
          ? parseFloat(window.getComputedStyle(wrapper).paddingBottom)
          : 0;

        // Inputs font-size
        const inputs = Array.from(
          document.querySelectorAll('#update input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), #update select, #update textarea')
        ).filter((el) => window.getComputedStyle(el).display !== 'none' && el.offsetParent !== null);
        const inputFontSizes = inputs.map((inp) => parseFloat(window.getComputedStyle(inp).fontSize));

        // Action buttons touch targets
        const actionButtons = Array.from(
          document.querySelectorAll('#update .search-action-btn, #update .dispose-action-btn, #update button[type="submit"]')
        ).filter((el) => el.offsetParent !== null);
        const buttonHeights = actionButtons.map((b) => b.getBoundingClientRect().height);

        // Overflows check
        const overflows = [];
        const allElements = updateTab ? updateTab.querySelectorAll('*') : [];
        allElements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const style = window.getComputedStyle(el);

          const scrollContainer = el.closest('.remarks-quick-chips, [style*="overflow-x: auto"]');
          if (scrollContainer && scrollContainer !== el) return;

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
          inputFontSizes,
          buttonHeights,
          overflows,
        };
      }, vp.width);

      expect(audit.rootClientWidth).toBe(vp.width);
      expect(audit.rootScrollWidth).toBeLessThanOrEqual(vp.width + 1);
      expect(audit.bodyScrollWidth).toBeLessThanOrEqual(vp.width + 1);
      expect(audit.overflows).toEqual([]);

      // Smart dock clearance (>= 88px)
      expect(audit.containerPaddingBottom).toBeGreaterThanOrEqual(88);

      // Action button touch targets (>= 44px)
      audit.buttonHeights.forEach((h) => expect(h).toBeGreaterThanOrEqual(43.5));

      // Input font sizes (>= 16px)
      audit.inputFontSizes.forEach((fs) => expect(fs).toBeGreaterThanOrEqual(16));
    });
  }

  test('Verify Desktop Viewport (1280x800) Baseline 0% Regression on Edit Case Form', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.waitForTimeout(500);

    await page.evaluate(async () => {
      const updateTab = document.querySelector('#update');
      if (updateTab && !updateTab.innerHTML.trim()) {
        const resp = await fetch('components/tabs/update/tab-update.html');
        updateTab.innerHTML = await resp.text();
      }
      document.querySelectorAll('.tab.active').forEach((t) => {
        t.classList.remove('active');
        t.style.display = 'none';
      });
      if (updateTab) {
        updateTab.classList.add('active');
        updateTab.style.display = 'block';
      }
    });

    await page.waitForTimeout(400);

    const desktopCheck = await page.evaluate(() => {
      const updateTab = document.querySelector('#update');
      const wrapper = document.querySelector('#update .tab-card-wrapper');
      const sidebar = document.querySelector('.sidebar, .sidenav');

      return {
        tabVisible: updateTab ? window.getComputedStyle(updateTab).display !== 'none' : false,
        wrapperExists: !!wrapper,
        sidebarVisible: sidebar ? window.getComputedStyle(sidebar).display !== 'none' : false,
      };
    });

    expect(desktopCheck.tabVisible).toBe(true);
    expect(desktopCheck.wrapperExists).toBe(true);
    expect(desktopCheck.sidebarVisible).toBe(true);
  });
});
