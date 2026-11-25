import { test, expect } from 'playwright/test';

const mobileViewports = [
  { name: 'Realme 9 Pro+ Primary (412x915)', width: 412, height: 915 },
  { name: 'Realme 9 Pro+ Small Scale (392x872)', width: 392, height: 872 },
];

test.describe('To-Do & Tasks (#todo) Realme 9 Pro+ Responsive Audit', () => {
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
    test(`Audit To-Do & Tasks Viewport, Touch Targets & Dock Clearance on ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });

      await page.evaluate(async () => {
        if (typeof window.showTab === 'function') {
          await window.showTab('todo');
        }
      });

      await page.waitForTimeout(500);

      const audit = await page.evaluate((vpWidth) => {
        const todoTab = document.querySelector('#todo');
        const rootClientWidth = document.documentElement.clientWidth;
        const rootScrollWidth = document.documentElement.scrollWidth;
        const bodyScrollWidth = document.body.scrollWidth;

        const containerPaddingBottom = todoTab
          ? parseFloat(window.getComputedStyle(todoTab).paddingBottom)
          : 0;

        const inputs = Array.from(
          document.querySelectorAll('#todo input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), #todo select, #todo textarea')
        ).filter((el) => window.getComputedStyle(el).display !== 'none' && el.offsetParent !== null);
        const inputFontSizes = inputs.map((inp) => parseFloat(window.getComputedStyle(inp).fontSize));

        const actionButtons = Array.from(
          document.querySelectorAll('#todo #openTodoTaskModalBtn, #todo .todo-filter-tab, #todo .todo-empty-cta')
        ).filter((el) => el.offsetParent !== null);
        const buttonHeights = actionButtons.map((b) => b.getBoundingClientRect().height);

        const overflows = [];
        const allElements = todoTab ? todoTab.querySelectorAll('*') : [];
        allElements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const style = window.getComputedStyle(el);

          const scrollContainer = el.closest('.todo-filter-strip, .custom-dropdown-list, [style*="overflow-x: auto"]');
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
      expect(audit.containerPaddingBottom).toBeGreaterThanOrEqual(88);
      audit.inputFontSizes.forEach((fs) => expect(fs).toBeGreaterThanOrEqual(16));
      audit.buttonHeights.forEach((h) => expect(h).toBeGreaterThanOrEqual(43.5));
    });
  }

  test('Verify Desktop Viewport (1280x800) Baseline 0% Regression on To-Do & Tasks', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.waitForTimeout(400);

    await page.evaluate(async () => {
      if (typeof window.showTab === 'function') {
        await window.showTab('todo');
      }
    });

    await page.waitForTimeout(500);

    const desktopCheck = await page.evaluate(() => {
      const todoTab = document.querySelector('#todo');
      const head = document.querySelector('#todo .todo-master-head');
      const sidebar = document.querySelector('.sidebar, .sidenav');

      return {
        tabVisible: todoTab ? window.getComputedStyle(todoTab).display !== 'none' : false,
        headExists: !!head,
        sidebarVisible: sidebar ? window.getComputedStyle(sidebar).display !== 'none' : false,
      };
    });

    expect(desktopCheck.tabVisible).toBe(true);
    expect(desktopCheck.headExists).toBe(true);
    expect(desktopCheck.sidebarVisible).toBe(true);
  });
});
