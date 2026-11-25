import { test, expect } from 'playwright/test';

const mobileViewports = [
  { name: 'Realme 9 Pro+ Primary (412x915)', width: 412, height: 915 },
  { name: 'Realme 9 Pro+ Small Scale (392x872)', width: 392, height: 872 },
];

test.describe('Zen Home (#newhome) Realme 9 Pro+ Responsive Audit', () => {
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

    // Seed mock litigation matters and hearings
    await page.evaluate(() => {
      const now = new Date();
      const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      const nextWeek = new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000);
      const nextWeekStr = `${nextWeek.getFullYear()}-${String(nextWeek.getMonth() + 1).padStart(2, '0')}-${String(nextWeek.getDate()).padStart(2, '0')}`;

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
          hearingTime: '10:30 AM',
        },
        {
          caseNo: 'WP/202/2026',
          caseName: 'Gupta vs State of UP',
          plaintiff: 'Gupta',
          defendant: 'State of UP',
          caseType: 'writ',
          courtName: 'High Court Bench Lucknow',
          nextHearing: nextWeekStr,
          hearingProcess: 'Orders',
          caseYear: '2026',
          clientName: 'Gupta',
          clientNumber: '+91 98111 22334',
          stage: 'Orders',
        },
        {
          caseNo: 'CRL/303/2026',
          caseName: 'State vs Anand',
          caseType: 'criminal',
          courtName: 'CJM Court Lucknow',
          nextHearing: '',
          caseStatus: 'Pending',
        },
      ];

      window.caseTasks = [
        {
          taskTitle: 'File Reply to Interim Application',
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
    test(`Verify Zen Home Viewport Fold, 44px Touch Targets & 0 Overflow on ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });

      await page.evaluate(async () => {
        if (typeof window.showTab === 'function') {
          await window.showTab('newhome');
        }
        if (typeof window.renderNewHomeDashboard === 'function') {
          window.renderNewHomeDashboard();
        }
      });

      await page.waitForTimeout(400);

      const audit = await page.evaluate((vpWidth) => {
        const newhomeEl = document.querySelector('#newhome');
        const container = document.querySelector('.newhome-container');
        const rootClientWidth = document.documentElement.clientWidth;
        const rootScrollWidth = document.documentElement.scrollWidth;
        const bodyScrollWidth = document.body.scrollWidth;

        // Bottom clearance for smart dock
        const containerPaddingBottom = container
          ? parseFloat(window.getComputedStyle(container).paddingBottom)
          : 0;

        // Button touch targets in hero
        const heroButtons = Array.from(document.querySelectorAll('.newhome-hero-actions .newhome-btn'));
        const heroBtnHeights = heroButtons.map((b) => b.getBoundingClientRect().height);

        // Sync icon action button
        const syncBtn = document.querySelector('#newhomeTimelineSyncBtn');
        const syncBtnRect = syncBtn
          ? { w: syncBtn.getBoundingClientRect().width, h: syncBtn.getBoundingClientRect().height }
          : { w: 0, h: 0 };

        // Swipeable KPI cards row
        const statsRow = document.querySelector('.newhome-stats-row');
        const statsRowStyle = statsRow ? window.getComputedStyle(statsRow) : null;
        const isSwipeable = statsRowStyle
          ? statsRowStyle.overflowX === 'auto' || statsRowStyle.overflowX === 'scroll'
          : false;

        // Card header layout and no-wrap checks
        const timelineBadge = document.querySelector('#newhomeTimelineBadge');
        const badgeStyle = timelineBadge ? window.getComputedStyle(timelineBadge) : null;
        const badgeNoWrap = badgeStyle ? badgeStyle.whiteSpace === 'nowrap' : false;

        const timelineTitle = document.querySelector('.newhome-timeline-card .newhome-card-title');
        const titleStyle = timelineTitle ? window.getComputedStyle(timelineTitle) : null;
        const titleNoWrap = titleStyle ? titleStyle.whiteSpace === 'nowrap' : false;

        const liveChip = document.querySelector('.newhome-timeline-card .newhome-live-chip');
        const chipStyle = liveChip ? window.getComputedStyle(liveChip) : null;
        const chipNoWrap = chipStyle ? chipStyle.whiteSpace === 'nowrap' : false;

        // Check for unintended horizontal overflows (excluding intentional swipe containers)
        const overflows = [];
        const allElements = newhomeEl.querySelectorAll('*');
        allElements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const style = window.getComputedStyle(el);

          // Skip elements inside the swipeable stats row
          const scrollContainer = el.closest('.newhome-stats-row, [style*="overflow-x: auto"]');
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
          heroBtnHeights,
          syncBtnRect,
          isSwipeable,
          badgeNoWrap,
          titleNoWrap,
          chipNoWrap,
          overflows,
        };
      }, vp.width);

      expect(audit.rootClientWidth).toBe(vp.width);
      expect(audit.rootScrollWidth).toBeLessThanOrEqual(vp.width + 1);
      expect(audit.bodyScrollWidth).toBeLessThanOrEqual(vp.width + 1);
      expect(audit.overflows).toEqual([]);

      // Card header elements no-wrap guards verified (Prevents badge "3 Hearings" or title splitting)
      expect(audit.badgeNoWrap).toBe(true);
      expect(audit.titleNoWrap).toBe(true);
      expect(audit.chipNoWrap).toBe(true);

      // Smart dock safe-area clearance verified (>= 88px)
      expect(audit.containerPaddingBottom).toBeGreaterThanOrEqual(88);

      // Hero action buttons touch rhythm (>= 44px)
      expect(audit.heroBtnHeights.length).toBe(2);
      audit.heroBtnHeights.forEach((h) => expect(h).toBeGreaterThanOrEqual(43.5));

      // Icon action button hit box (>= 44px)
      expect(audit.syncBtnRect.w).toBeGreaterThanOrEqual(43.5);
      expect(audit.syncBtnRect.h).toBeGreaterThanOrEqual(43.5);

      // Swipeable KPI row verified
      expect(audit.isSwipeable).toBe(true);
    });
  }

  test('Verify Desktop Viewport (1280x800) Baseline 0% Regression', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });

    await page.evaluate(async () => {
      if (typeof window.showTab === 'function') {
        await window.showTab('newhome');
      }
      if (typeof window.renderNewHomeDashboard === 'function') {
        window.renderNewHomeDashboard();
      }
    });

    await page.waitForTimeout(300);

    const desktopData = await page.evaluate(() => {
      const grid = document.querySelector('.newhome-grid');
      const gridCols = grid ? window.getComputedStyle(grid).gridTemplateColumns.split(' ').length : 0;
      const statsRow = document.querySelector('.newhome-stats-row');
      const statCards = Array.from(document.querySelectorAll('.newhome-stats-row .newhome-stat-card'));
      const distinctLefts = new Set(statCards.map((c) => Math.round(c.getBoundingClientRect().left))).size;

      return {
        gridCols,
        distinctLefts,
        scrollWidth: document.documentElement.scrollWidth,
      };
    });

    // Desktop 2-column workstation grid (main column + side column)
    expect(desktopData.gridCols).toBe(2);
    // Desktop KPI cards render side-by-side in 3 columns
    expect(desktopData.distinctLefts).toBe(3);
    expect(desktopData.scrollWidth).toBeLessThanOrEqual(1280 + 1);
  });
});
