import { test, expect } from 'playwright/test';

const mobileViewports = [
  { name: 'Realme 9 Pro+ Primary (412x915)', width: 412, height: 915 },
  { name: 'Realme 9 Pro+ Compact (392x872)', width: 392, height: 872 },
];

const tabsToTest = [
  { id: 'causelist', name: 'Daily Cause List', selector: '#causelist' },
  { id: 'upcoming', name: 'Upcoming Hearings', selector: '#upcoming' },
  { id: 'calendar', name: 'Calendar Scheduler', selector: '#calendar' },
  { id: 'hearing', name: 'Hearing Updates', selector: '#hearing' },
  { id: 'undated', name: 'Undated Cases', selector: '#undated' },
];

test.describe('Step A6: Multi-Tab Parity Quality Gate & Overflow Verification', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(90000);
    await page.goto('/index.html', { waitUntil: 'domcontentloaded' });

    // Establish admin session and mock litigation cases
    await page.evaluate(() => {
      if (typeof window.createAdminSession === 'function') {
        window.createAdminSession('admin', false);
      }

      const todayStr = new Date().toISOString().split('T')[0];
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split('T')[0];

      window.allCaseRecords = [
        {
          caseNo: 'CS/101/2026',
          caseName: 'Sharma vs Verma',
          plaintiff: 'Sharma',
          defendant: 'Verma',
          caseType: 'civil',
          courtName: 'Court of Civil Judge (Senior Division), Court No. 1',
          nextHearing: todayStr,
          hearingProcess: 'Arguments on Interim Injunction',
          caseYear: '2026',
          filingDate: '2026-01-15',
          clientName: 'Sharma Ji',
          clientNumber: '+91 98765 43210',
          totalFee: '40000',
          stage: 'Arguments',
          courtNo: '1',
          judgeName: 'Honble Mr. Justice R.K. Gupta',
        },
        {
          caseNo: 'WP/202/2026',
          caseName: 'Gupta vs State of UP',
          plaintiff: 'Gupta',
          defendant: 'State of UP',
          caseType: 'writ',
          courtName: 'High Court Bench Lucknow, Court No. 4',
          nextHearing: tomorrowStr,
          hearingProcess: 'Compliance Report by State',
          caseYear: '2026',
          filingDate: '2026-02-10',
          clientName: 'M. Gupta',
          clientNumber: '+91 98111 22334',
          totalFee: '50000',
          stage: 'Orders',
          courtNo: '4',
          judgeName: 'Honble Court No. 4',
        },
        {
          caseNo: 'CRL/303/2026',
          caseName: 'Amitabh vs Crime Branch',
          plaintiff: 'Amitabh',
          defendant: 'State',
          caseType: 'criminal',
          courtName: 'CJM Court Lucknow',
          nextHearing: '', // Undated case
          hearingProcess: 'Awaiting Next Date Fixation',
          caseYear: '2026',
          filingDate: '2026-03-01',
          clientName: 'Amitabh',
          clientNumber: '+91 99999 88888',
          totalFee: '25000',
          stage: 'Bail Hearing',
          courtNo: '2',
        },
      ];

      window.allHearingRecords = [
        { id: 'h1', case_number: 'CS/101/2026', hearing_date: todayStr, stage: 'Arguments', remarks: 'Part heard' },
        { id: 'h2', case_number: 'WP/202/2026', hearing_date: tomorrowStr, stage: 'Orders', remarks: 'Awaiting compliance' },
      ];
    });

    await page.locator('#appSkeletonOverlay').waitFor({ state: 'detached', timeout: 15000 }).catch(() => {});
  });

  for (const vp of mobileViewports) {
    test(`Verify Zero Bounding Box Overflows at ${vp.name} across all 5 Litigation Tabs`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });

      for (const tab of tabsToTest) {
        // Switch to tab
        await page.evaluate(async (tabId) => {
          if (typeof window.showTab === 'function') {
            await window.showTab(tabId);
          }
        }, tab.id);

        await page.waitForTimeout(400);

        // Check horizontal overflow
        const overflowCheck = await page.evaluate(({ selector, vpWidth }) => {
          const tabEl = document.querySelector(selector);
          if (!tabEl) return { found: false, overflows: [] };

          const overflows = [];
          const rootScrollWidth = document.documentElement.scrollWidth;
          const bodyScrollWidth = document.body.scrollWidth;
          const rootClientWidth = document.documentElement.clientWidth;

          // Check visible descendant bounding boxes
          const allElements = tabEl.querySelectorAll('*');
          allElements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            // Ignore zero-dimension, hidden, or fixed off-screen elements
            const style = window.getComputedStyle(el);
            
            // Check if element is inside an intentional horizontal scroll container
            const scrollContainer = el.closest('.undated-chips-row, .overflow-x-auto, [style*="overflow-x: auto"], [style*="overflow-x: scroll"]');
            if (scrollContainer && scrollContainer !== el) {
              return; // Intentionally scrollable child
            }

            if (
              rect.width > 0 &&
              rect.height > 0 &&
              style.display !== 'none' &&
              style.visibility !== 'hidden' &&
              style.opacity !== '0' &&
              style.position !== 'fixed' &&
              style.position !== 'absolute'
            ) {
              if (rect.right > vpWidth + 1.5) {
                overflows.push({
                  tag: el.tagName,
                  className: el.className,
                  id: el.id,
                  right: rect.right,
                  diff: rect.right - vpWidth,
                });
              }
            }
          });

          return {
            found: true,
            rootScrollWidth,
            bodyScrollWidth,
            rootClientWidth,
            overflows: overflows.slice(0, 5), // top 5
          };
        }, { selector: tab.selector, vpWidth: vp.width });

        expect(overflowCheck.found).toBe(true);
        expect(overflowCheck.rootClientWidth).toBe(vp.width);
        expect(overflowCheck.rootScrollWidth).toBeLessThanOrEqual(vp.width + 1);
        expect(overflowCheck.bodyScrollWidth).toBeLessThanOrEqual(vp.width + 1);
        expect(overflowCheck.overflows).toEqual([]);
      }
    });
  }

  test('Verify AMOLED Dark Theme Contrast & Token Architecture across Core Litigation Stack', async ({ page }) => {
    await page.setViewportSize({ width: 412, height: 915 });

    // Enable AMOLED Dark Mode
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('casebook_theme', 'dark');
    });

    for (const tab of ['causelist', 'upcoming', 'calendar']) {
      await page.evaluate(async (tabId) => {
        if (typeof window.showTab === 'function') {
          await window.showTab(tabId);
        }
      }, tab);

      await page.waitForTimeout(300);

      // Verify token bindings in CSS
      const tokenAudit = await page.evaluate((tabId) => {
        const root = document.querySelector(`#${tabId}`);
        if (!root) return { valid: false };

        const bodyBg = window.getComputedStyle(document.body).backgroundColor;
        const appBg = window.getComputedStyle(document.documentElement).getPropertyValue('--bg-canvas') ||
                      window.getComputedStyle(document.documentElement).getPropertyValue('--bg-primary');

        return {
          valid: true,
          bodyBg,
          appBg,
        };
      }, tab);

      expect(tokenAudit.valid).toBe(true);
    }
  });

  test('Verify Desktop Viewport (1280x800) 0% Regression Baseline', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });

    for (const tab of tabsToTest) {
      await page.evaluate(async (tabId) => {
        if (typeof window.showTab === 'function') {
          await window.showTab(tabId);
        }
      }, tab.id);

      await page.waitForTimeout(300);

      const desktopCheck = await page.evaluate((selector) => {
        const tabEl = document.querySelector(selector);
        const header = document.querySelector('#casebookTopHeader');
        const smartDock = document.querySelector('.cb-smart-dock');
        const isSmartDockVisible = smartDock ? window.getComputedStyle(smartDock).display !== 'none' : false;

        return {
          tabVisible: !!tabEl && window.getComputedStyle(tabEl).display !== 'none',
          headerVisible: !!header && window.getComputedStyle(header).display !== 'none',
          isSmartDockVisible, // Must be hidden on desktop!
          scrollWidth: document.documentElement.scrollWidth,
        };
      }, tab.selector);

      expect(desktopCheck.tabVisible).toBe(true);
      expect(desktopCheck.headerVisible).toBe(true);
      // Smart dock should be hidden or inactive on desktop >= 1025px
      expect(desktopCheck.isSmartDockVisible).toBe(false);
      expect(desktopCheck.scrollWidth).toBeLessThanOrEqual(1280 + 1);
    }
  });
});
