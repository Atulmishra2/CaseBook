import { test, expect } from 'playwright/test';

const mobileViewports = [
  { name: 'Realme 9 Pro+ Primary (412x915)', width: 412, height: 915 },
  { name: 'Realme 9 Pro+ Small Scale (392x872)', width: 392, height: 872 },
];

test.describe('Case Dossier (#detail) Realme 9 Pro+ Responsive Audit', () => {
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

    // Seed a case record
    await page.evaluate(() => {
      const todayStr = new Date().toISOString().split('T')[0];
      window.allCaseRecords = [
        {
          caseNo: 'CS/101/2026',
          caseName: 'Sharma vs Verma',
          caseType: 'civil',
          courtName: 'Court of Civil Judge Senior Division',
          nextHearing: todayStr,
          stage: 'Arguments',
          clientName: 'Sharma',
          clientNumber: '+91 98765 43210',
          parties: 'Sharma vs Verma',
          plaintiff: 'Sharma',
          defendant: 'Verma',
        },
      ];
    });
  });

  for (const vp of mobileViewports) {
    test(`Audit Case Dossier Viewport, Touch Targets & Dock Clearance on ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });

      await page.evaluate(async () => {
        if (typeof window.openCaseDetail === 'function') {
          await window.openCaseDetail('CS/101/2026');
        } else if (typeof window.showTab === 'function') {
          await window.showTab('detail');
        }
      });

      await page.waitForTimeout(500);

      const audit = await page.evaluate((vpWidth) => {
        const detailTab = document.querySelector('#detail');
        const container = document.querySelector('#detail .case-detail-container') || detailTab;
        const rootClientWidth = document.documentElement.clientWidth;
        const rootScrollWidth = document.documentElement.scrollWidth;
        const bodyScrollWidth = document.body.scrollWidth;

        const containerPaddingBottom = Math.max(
          detailTab ? parseFloat(window.getComputedStyle(detailTab).paddingBottom) : 0,
          container ? parseFloat(window.getComputedStyle(container).paddingBottom) : 0
        );

        const searchInput = document.querySelector('#detailCaseSearchInput');
        const searchFontSize = searchInput ? parseFloat(window.getComputedStyle(searchInput).fontSize) : 0;

        const actionButtons = Array.from(
          document.querySelectorAll('#detail .back-register-btn, #detail .step-btn, #detail .universal-action-deck .act')
        ).filter((el) => el.offsetParent !== null);
        const buttonHeights = actionButtons.map((b) => b.getBoundingClientRect().height);

        // Overflows check
        const overflows = [];
        const allElements = detailTab ? detailTab.querySelectorAll('*') : [];
        allElements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const style = window.getComputedStyle(el);

          const scrollContainer = el.closest('.universal-action-deck, .detail-segment-strip, .detail-tabs-nav, .detail-subtabs, [style*="overflow-x: auto"]');
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

  test('Verify Desktop Viewport (1280x800) Baseline 0% Regression on Case Dossier', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.waitForTimeout(400);

    await page.evaluate(async () => {
      if (typeof window.openCaseDetail === 'function') {
        await window.openCaseDetail('CS/101/2026');
      } else if (typeof window.showTab === 'function') {
        await window.showTab('detail');
      }
    });

    await page.waitForTimeout(500);

    const desktopCheck = await page.evaluate(() => {
      const detailTab = document.querySelector('#detail');
      const container = document.querySelector('#detail .case-detail-container');
      const sidebar = document.querySelector('.sidebar, .sidenav');

      return {
        tabVisible: detailTab ? window.getComputedStyle(detailTab).display !== 'none' : false,
        containerExists: !!container,
        sidebarVisible: sidebar ? window.getComputedStyle(sidebar).display !== 'none' : false,
      };
    });

    expect(desktopCheck.tabVisible).toBe(true);
    expect(desktopCheck.containerExists).toBe(true);
    expect(desktopCheck.sidebarVisible).toBe(true);
  });
});
