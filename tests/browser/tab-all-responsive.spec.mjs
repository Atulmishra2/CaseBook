import { test, expect } from 'playwright/test';

const mobileViewports = [
  { name: 'Realme 9 Pro+ Primary (412x915)', width: 412, height: 915 },
  { name: 'Realme 9 Pro+ Small Scale (392x872)', width: 392, height: 872 },
];

test.describe('All Cases Registry (#all) Realme 9 Pro+ Responsive Audit', () => {
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

    // Seed mock cases
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
        },
        {
          caseNo: 'WP/202/2026',
          caseName: 'Gupta vs State of UP',
          caseType: 'state',
          courtName: 'High Court Bench Lucknow',
          nextHearing: todayStr,
          stage: 'Orders',
          clientName: 'Gupta',
          clientNumber: '+91 98111 22334',
          parties: 'Gupta vs State of UP',
        },
        {
          caseNo: 'FAM/303/2026',
          caseName: 'Kapoor vs Kapoor',
          caseType: 'family',
          courtName: 'Family Court No. 1',
          nextHearing: '',
          stage: 'Counseling',
          clientName: 'Priya Kapoor',
          clientNumber: '+91 99887 76655',
          parties: 'Kapoor vs Kapoor',
        },
      ];
    });

    await page.locator('#appSkeletonOverlay').waitFor({ state: 'detached', timeout: 15000 }).catch(() => {});
  });

  for (const vp of mobileViewports) {
    test(`Audit All Cases Registry Viewport, Touch Targets & Dock Clearance on ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });

      await page.evaluate(async () => {
        if (typeof window.showTab === 'function') {
          await window.showTab('all');
        }
        if (typeof window.renderUnifiedCasesView === 'function') {
          window.renderUnifiedCasesView();
        }
      });

      await page.waitForTimeout(400);

      const audit = await page.evaluate((vpWidth) => {
        const allTab = document.querySelector('#all');
        const container = document.querySelector('.all-cases-container');
        const rootClientWidth = document.documentElement.clientWidth;
        const rootScrollWidth = document.documentElement.scrollWidth;
        const bodyScrollWidth = document.body.scrollWidth;

        // Container dock clearance
        const containerPaddingBottom = container
          ? parseFloat(window.getComputedStyle(container).paddingBottom)
          : 0;

        // Header Add Case Button
        const addBtn = document.querySelector('.all-cases-container .btn-add');
        const addBtnHeight = addBtn ? addBtn.getBoundingClientRect().height : 0;

        // View toggle buttons (Table vs Cards)
        const toggleButtons = Array.from(document.querySelectorAll('.all-cases-container .view-toggle button'));
        const toggleHeights = toggleButtons.map((b) => b.getBoundingClientRect().height);

        // Filter button
        const filterBtn = document.querySelector('#allCasesFilterBtn');
        const filterBtnHeight = filterBtn ? filterBtn.getBoundingClientRect().height : 0;

        // Filter tabs / pills
        const filterTabs = Array.from(document.querySelectorAll('.all-cases-container .ftab'));
        const ftabHeights = filterTabs.map((t) => t.getBoundingClientRect().height);

        // Search input font size
        const searchInput = document.querySelector('#allCasesSearchInput');
        const searchFontSize = searchInput ? parseFloat(window.getComputedStyle(searchInput).fontSize) : 0;

        // Overflows check (excluding horizontal swipe containers like stats-row, filter-tabs, table-scroll)
        const overflows = [];
        const allElements = allTab ? allTab.querySelectorAll('*') : [];
        allElements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const style = window.getComputedStyle(el);

          // Skip elements inside intentional swipe / scroll containers
          const scrollContainer = el.closest('.stats-row, .filter-tabs, .table-scroll, .custom-dropdown-list, [style*="overflow-x: auto"]');
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
          addBtnHeight,
          toggleHeights,
          filterBtnHeight,
          ftabHeights,
          searchFontSize,
          overflows,
        };
      }, vp.width);

      expect(audit.rootClientWidth).toBe(vp.width);
      expect(audit.rootScrollWidth).toBeLessThanOrEqual(vp.width + 1);
      expect(audit.bodyScrollWidth).toBeLessThanOrEqual(vp.width + 1);
      expect(audit.overflows).toEqual([]);

      // Smart dock safe-area clearance (>= 88px)
      expect(audit.containerPaddingBottom).toBeGreaterThanOrEqual(88);

      // Search input font size (>= 16px to prevent Gboard auto-zoom)
      expect(audit.searchFontSize).toBeGreaterThanOrEqual(16);

      // Add Case CTA touch target (>= 44px)
      expect(audit.addBtnHeight).toBeGreaterThanOrEqual(43.5);

      // View toggle touch targets (>= 44px)
      audit.toggleHeights.forEach((h) => expect(h).toBeGreaterThanOrEqual(43.5));

      // Filter button touch target (>= 44px)
      expect(audit.filterBtnHeight).toBeGreaterThanOrEqual(43.5);

      // Filter pills touch rhythm (>= 40px)
      audit.ftabHeights.forEach((h) => expect(h).toBeGreaterThanOrEqual(39.5));
    });
  }

  test('Verify Desktop Viewport (1280x800) Baseline 0% Regression on All Cases Registry', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });

    await page.evaluate(async () => {
      if (typeof window.showTab === 'function') {
        await window.showTab('all');
      }
      if (typeof window.renderUnifiedCasesView === 'function') {
        window.renderUnifiedCasesView();
      }
    });

    await page.waitForTimeout(400);

    const desktopCheck = await page.evaluate(() => {
      const allTab = document.querySelector('#all');
      const container = document.querySelector('.all-cases-container');
      const table = document.querySelector('#allCasesTable');
      const addBtn = document.querySelector('.all-cases-container .btn-add');
      const sidebar = document.querySelector('.sidebar, .sidenav');

      return {
        tabVisible: allTab ? window.getComputedStyle(allTab).display !== 'none' : false,
        containerExists: !!container,
        tableVisible: table ? window.getComputedStyle(table).display !== 'none' : false,
        addBtnVisible: addBtn ? window.getComputedStyle(addBtn).display !== 'none' : false,
        sidebarVisible: sidebar ? window.getComputedStyle(sidebar).display !== 'none' : false,
      };
    });

    expect(desktopCheck.tabVisible).toBe(true);
    expect(desktopCheck.containerExists).toBe(true);
    expect(desktopCheck.tableVisible).toBe(true);
    expect(desktopCheck.addBtnVisible).toBe(true);
    expect(desktopCheck.sidebarVisible).toBe(true);
  });
});
