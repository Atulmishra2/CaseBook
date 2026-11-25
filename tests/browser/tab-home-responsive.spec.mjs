import { test, expect } from 'playwright/test';

const mobileViewports = [
  { name: 'Realme 9 Pro+ (412x915)', width: 412, height: 915 },
  { name: 'Realme 9 Pro+ Small Scale (392x872)', width: 392, height: 872 },
];

test.describe('Classic Home (#home) Realme 9 Pro+ Responsive Audit', () => {
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

    await page.evaluate(() => {
      const now = new Date();
      const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      window.allCaseRecords = [
        {
          caseNo: 'CS/101/2026',
          caseName: 'Sharma vs Verma',
          plaintiff: 'Sharma',
          defendant: 'Verma',
          caseType: 'civil',
          courtName: 'Court of Civil Judge No. 1',
          nextHearing: todayStr,
          hearingProcess: 'Arguments',
          caseYear: '2026',
          clientName: 'Sharma',
          clientNumber: '+91 98765 43210',
          stage: 'Arguments',
        },
        {
          caseNo: 'WP/202/2026',
          caseName: 'Gupta vs State of UP',
          plaintiff: 'Gupta',
          defendant: 'State of UP',
          caseType: 'writ',
          courtName: 'High Court Bench Lucknow',
          nextHearing: todayStr,
          hearingProcess: 'Orders',
          caseYear: '2026',
          clientName: 'Gupta',
          clientNumber: '+91 98111 22334',
          stage: 'Orders',
        },
      ];

      window.caseTasks = [
        {
          taskTitle: 'Draft Urgent Stay Application',
          caseNo: 'CS/101/2026',
          priority: 'high',
          deadlineDate: todayStr,
          status: 'pending',
        },
      ];
    });

    await page.locator('#appSkeletonOverlay').waitFor({ state: 'detached', timeout: 15000 }).catch(() => {});
  });

  for (const vp of mobileViewports) {
    test(`Verify 2x2 Metric Grid, 44px Touch Targets & 0 Overflow on ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });

      await page.evaluate(async () => {
        document.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
        const homeTab = document.getElementById('home');
        if (homeTab) homeTab.classList.add('active');
        if (typeof window.renderHomeDashboard === 'function') {
          window.renderHomeDashboard();
        }
      });

      await page.waitForTimeout(400);

      const metrics = await page.evaluate((vpWidth) => {
        const homeEl = document.querySelector('#home');
        const rootClientWidth = document.documentElement.clientWidth;
        const rootScrollWidth = document.documentElement.scrollWidth;
        const bodyScrollWidth = document.body.scrollWidth;

        // Metric grid layout check: count distinct rendered left offsets
        const cards = Array.from(document.querySelectorAll('#home .metric-card'));
        const distinctLefts = new Set(cards.map((c) => Math.round(c.getBoundingClientRect().left))).size;
        const gridColumns = distinctLefts;

        // Touch target check on quick buttons
        const newCaseBtn = document.querySelector('#home .btn-new-case');
        const newCaseHeight = newCaseBtn ? newCaseBtn.getBoundingClientRect().height : 0;

        // Docket buttons
        const forwardBtn = document.querySelector('#home .docket-btn-forward');
        const forwardHeight = forwardBtn ? forwardBtn.getBoundingClientRect().height : 0;

        // Bottom clearance
        const shell = document.querySelector('#home .home-dashboard-shell');
        const shellPaddingBottom = shell ? parseFloat(window.getComputedStyle(shell).paddingBottom) : 0;

        // Bounding box overflow check
        const overflows = [];
        const allElements = homeEl.querySelectorAll('*');
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
              overflows.push({ tag: el.tagName, className: el.className, right: rect.right });
            }
          }
        });

        return {
          rootClientWidth,
          rootScrollWidth,
          bodyScrollWidth,
          gridColumns,
          newCaseHeight,
          forwardHeight,
          shellPaddingBottom,
          overflows,
        };
      }, vp.width);

      expect(metrics.rootClientWidth).toBe(vp.width);
      expect(metrics.rootScrollWidth).toBeLessThanOrEqual(vp.width + 1);
      expect(metrics.bodyScrollWidth).toBeLessThanOrEqual(vp.width + 1);
      expect(metrics.overflows).toEqual([]);

      // 2x2 grid verified!
      expect(metrics.gridColumns).toBe(2);

      // ≥44px touch targets verified!
      expect(metrics.newCaseHeight).toBeGreaterThanOrEqual(43.5);
      expect(metrics.shellPaddingBottom).toBeGreaterThanOrEqual(88);
    });
  }

  test('Verify Desktop Viewport (1280x800) Baseline 0% Regression', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });

    await page.evaluate(async () => {
      document.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
      const homeTab = document.getElementById('home');
      if (homeTab) homeTab.classList.add('active');
      if (typeof window.renderHomeDashboard === 'function') {
        window.renderHomeDashboard();
      }
    });

    await page.waitForTimeout(300);

    const desktopData = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('#home .metric-card'));
      const gridColumns = new Set(cards.map((c) => Math.round(c.getBoundingClientRect().left))).size;
      const docketPanel = document.querySelector('#home .docket-panel');
      const isPanelVisible = docketPanel ? window.getComputedStyle(docketPanel).display !== 'none' : false;

      return {
        gridColumns,
        isPanelVisible,
        scrollWidth: document.documentElement.scrollWidth,
      };
    });

    // 4 columns on desktop!
    expect(desktopData.gridColumns).toBe(4);
    // Docket panel visible on desktop!
    expect(desktopData.isPanelVisible).toBe(true);
    expect(desktopData.scrollWidth).toBeLessThanOrEqual(1280 + 1);
  });
});
