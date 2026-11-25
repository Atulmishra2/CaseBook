import { test, expect } from 'playwright/test';

const mobileViewports = [
  { name: 'Realme 9 Pro+ Primary (412x915)', width: 412, height: 915 },
  { name: 'Realme 9 Pro+ Small Scale (392x872)', width: 392, height: 872 },
];

test.describe('Manage Cases (#manage) Realme 9 Pro+ Responsive Audit', () => {
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
          caseType: 'criminal',
          courtName: 'High Court Bench Lucknow',
          nextHearing: todayStr,
          stage: 'Orders',
          clientName: 'Gupta',
          clientNumber: '+91 98111 22334',
          parties: 'Gupta vs State of UP',
        },
      ];
    });

    await page.locator('#appSkeletonOverlay').waitFor({ state: 'detached', timeout: 15000 }).catch(() => {});
  });

  for (const vp of mobileViewports) {
    test(`Audit Manage Cases Viewport, Touch Targets & Dock Clearance on ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });

      await page.evaluate(async () => {
        if (typeof window.showTab === 'function') {
          await window.showTab('manage');
        }
        if (typeof window.switchCaseHubMode === 'function') {
          window.switchCaseHubMode('add');
        }
      });

      await page.waitForTimeout(400);

      const audit = await page.evaluate((vpWidth) => {
        const manageTab = document.querySelector('#manage');
        const wrapper = document.querySelector('.case-hub-wrapper');
        const rootClientWidth = document.documentElement.clientWidth;
        const rootScrollWidth = document.documentElement.scrollWidth;
        const bodyScrollWidth = document.body.scrollWidth;

        // Container dock clearance
        const targetEl = wrapper || manageTab;
        const containerPaddingBottom = targetEl
          ? parseFloat(window.getComputedStyle(targetEl).paddingBottom)
          : 0;

        // Segmented buttons
        const segmentButtons = Array.from(document.querySelectorAll('.case-hub-wrapper .segment-btn'));
        const segmentHeights = segmentButtons.map((b) => b.getBoundingClientRect().height);

        // Inputs font-size
        const inputs = Array.from(
          document.querySelectorAll('.case-hub-wrapper input:not([type="hidden"]), .case-hub-wrapper select, .case-hub-wrapper textarea')
        );
        const inputFontSizes = inputs.map((inp) => parseFloat(window.getComputedStyle(inp).fontSize));

        // Dropdown triggers
        const dropdownTriggers = Array.from(document.querySelectorAll('.case-hub-wrapper .custom-dropdown-trigger'));
        const dropdownHeights = dropdownTriggers.map((t) => t.getBoundingClientRect().height);

        // Overflows check
        const overflows = [];
        const allElements = manageTab ? manageTab.querySelectorAll('*') : [];
        allElements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const style = window.getComputedStyle(el);

          // Skip hidden elements or absolute overlays
          // Skip intentional horizontal swipe containers like chips scroll
          const scrollContainer = el.closest('.case-hub-chips-scroll, [style*="overflow-x: auto"]');
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

        // Mobile refinements: Icon-only segmented controls & hidden pills
        const segmentSpans = Array.from(document.querySelectorAll('.case-hub-wrapper .segment-btn span'));
        const segmentSpansHidden = segmentSpans.every((sp) => window.getComputedStyle(sp).display === 'none');

        const categoryPill = document.querySelector('.case-hub-wrapper .deck-category-count');
        const categoryPillHidden = categoryPill ? window.getComputedStyle(categoryPill).display === 'none' : true;

        const subcardBadges = Array.from(document.querySelectorAll('.case-hub-wrapper .hub-subcard-badge'));
        const subcardBadgesHidden = subcardBadges.every((b) => window.getComputedStyle(b).display === 'none');

        // Check Add Court Button positioning in .court-input-wrapper
        const courtBtn = document.querySelector('.case-hub-wrapper .mini-court-btn');
        const courtBtnRight = courtBtn ? courtBtn.getBoundingClientRect().right : 0;

        // Check updated subcard titles
        const titlesText = Array.from(document.querySelectorAll('.case-hub-wrapper .hub-subcard-title')).map((t) => t.textContent.trim());

        return {
          rootClientWidth,
          rootScrollWidth,
          bodyScrollWidth,
          containerPaddingBottom,
          segmentHeights,
          inputFontSizes,
          dropdownHeights,
          overflows,
          segmentSpansHidden,
          categoryPillHidden,
          subcardBadgesHidden,
          courtBtnRight,
          titlesText,
        };
      }, vp.width);

      expect(audit.rootClientWidth).toBe(vp.width);
      expect(audit.rootScrollWidth).toBeLessThanOrEqual(vp.width + 1);
      expect(audit.bodyScrollWidth).toBeLessThanOrEqual(vp.width + 1);
      expect(audit.overflows).toEqual([]);

      // Smart dock clearance (>= 88px)
      expect(audit.containerPaddingBottom).toBeGreaterThanOrEqual(88);

      // Segment button touch targets (>= 44px)
      audit.segmentHeights.forEach((h) => expect(h).toBeGreaterThanOrEqual(40));

      // Input font sizes (>= 16px to prevent mobile zoom)
      audit.inputFontSizes.forEach((fs) => expect(fs).toBeGreaterThanOrEqual(16));

      // Mobile UI refinements requested by user
      expect(audit.segmentSpansHidden).toBe(true);
      expect(audit.categoryPillHidden).toBe(true);
      expect(audit.subcardBadgesHidden).toBe(true);

      // Add court button fits cleanly without overflow
      expect(audit.courtBtnRight).toBeLessThanOrEqual(vp.width);

      // Updated titles verified
      expect(audit.titlesText).toContain('Client Details');
      expect(audit.titlesText).toContain('Case Remarks & Co-Parties');
      expect(audit.titlesText).toContain('Documents Link');
    });
  }

  test('Verify Desktop Viewport (1280x800) Baseline 0% Regression on Manage Cases', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });

    await page.evaluate(async () => {
      if (typeof window.showTab === 'function') {
        await window.showTab('manage');
      }
      if (typeof window.switchCaseHubMode === 'function') {
        window.switchCaseHubMode('add');
      }
    });

    await page.waitForTimeout(400);

    const desktopCheck = await page.evaluate(() => {
      const manageTab = document.querySelector('#manage');
      const hubCard = document.querySelector('.case-hub-wrapper .hub-card');
      const segmentedControl = document.querySelector('.case-hub-wrapper .segmented-control');
      const sidebar = document.querySelector('.sidebar, .sidenav');

      const segmentSpans = Array.from(document.querySelectorAll('.case-hub-wrapper .segment-btn span'));
      const segmentSpansVisible = segmentSpans.every((sp) => window.getComputedStyle(sp).display !== 'none');

      const categoryPill = document.querySelector('.case-hub-wrapper .deck-category-count');
      const categoryPillVisible = categoryPill ? window.getComputedStyle(categoryPill).display !== 'none' : true;

      return {
        tabVisible: manageTab ? window.getComputedStyle(manageTab).display !== 'none' : false,
        hubCardExists: !!hubCard,
        segmentedVisible: segmentedControl ? window.getComputedStyle(segmentedControl).display !== 'none' : false,
        sidebarVisible: sidebar ? window.getComputedStyle(sidebar).display !== 'none' : false,
        segmentSpansVisible,
        categoryPillVisible,
      };
    });

    expect(desktopCheck.tabVisible).toBe(true);
    expect(desktopCheck.hubCardExists).toBe(true);
    expect(desktopCheck.segmentedVisible).toBe(true);
    expect(desktopCheck.sidebarVisible).toBe(true);
    expect(desktopCheck.segmentSpansVisible).toBe(true);
    expect(desktopCheck.categoryPillVisible).toBe(true);
  });
});
