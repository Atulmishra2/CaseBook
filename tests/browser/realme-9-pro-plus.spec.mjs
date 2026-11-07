import { test, expect } from 'playwright/test';

/**
 * Realme 9 Pro+ (Realme 9 Pro Plus 5G - RMX3392)
 * Hardware: 6.4" Super AMOLED, 1080 x 2400 pixels (~411 ppi), 20:9 ratio
 * Chrome Mobile Logical Viewport: 393 x 873 px @ 2.75x DPR
 */
const realme9ProPlusDevice = {
  name: 'Realme 9 Pro+ (393x873 @ 2.75x)',
  width: 393,
  height: 873,
  deviceScaleFactor: 2.75,
  isMobile: true,
  hasTouch: true,
  userAgent:
    'Mozilla/5.0 (Linux; Android 14; RMX3392 Build/UKQ1.230924.001) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6723.107 Mobile Safari/537.36',
};

test.describe('Realme 9 Pro+ Device Emulation - Case Detail Modal Responsive Audit', () => {
  test.use({
    viewport: { width: realme9ProPlusDevice.width, height: realme9ProPlusDevice.height },
    deviceScaleFactor: realme9ProPlusDevice.deviceScaleFactor,
    isMobile: realme9ProPlusDevice.isMobile,
    hasTouch: realme9ProPlusDevice.hasTouch,
    userAgent: realme9ProPlusDevice.userAgent,
  });

  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('/index.html', { waitUntil: 'domcontentloaded' });

    // Establish valid session
    await page.evaluate(() => {
      if (typeof window.createAdminSession === 'function') {
        window.createAdminSession('admin', false);
      }
    });

    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof window.showTab === 'function', null, { timeout: 15000 });

    // Inject mock legal case with multi-column ledger and proceedings
    await page.evaluate(() => {
      window.allCaseRecords = [
        {
          caseNo: 'CS/909/2026',
          caseName: 'Rameshwar Dayal vs Shiv Prasad',
          plaintiff: 'Rameshwar Dayal',
          defendant: 'Shiv Prasad',
          caseType: 'civil',
          courtName: 'Court of Civil Judge (Senior Division), Lucknow',
          nextHearing: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          hearingProcess: 'Cross Examination of Defendant PW-2',
          caseYear: '2026',
          filingDate: '2026-02-10',
          clientName: 'Rameshwar Dayal',
          clientNumber: '+91 98390 12345',
          totalFee: '35000',
          remark: 'Disputed plot measuring 1400 sq ft situated in Gomti Nagar Phase 2 Lucknow. Title suit for declaration and permanent injunction.',
        },
      ];

      window.allPaisaTransactions = [
        { id: 'tx-1', case_no: 'CS/909/2026', amount: 15000, type: 'received', date: '2026-02-15', particulars: 'Initial Retainer & Vakalatnama' },
        { id: 'tx-2', case_no: 'CS/909/2026', amount: 10000, type: 'received', date: '2026-05-10', particulars: 'Evidence stage fee installment' },
        { id: 'tx-3', case_no: 'CS/909/2026', amount: 2500, type: 'spent', date: '2026-05-12', particulars: 'Certified copy inspection fees' },
      ];

      window.allHearingRecords = [
        { id: 'h-1', case_number: 'CS/909/2026', hearing_date: '2026-02-10', stage: 'First Appearance', remarks: 'Summons issued to opposite party' },
        { id: 'h-2', case_number: 'CS/909/2026', hearing_date: '2026-05-10', stage: 'Written Statement', remarks: 'WS taken on record with copy served' },
        { id: 'h-3', case_number: 'CS/909/2026', hearing_date: '2026-08-20', stage: 'Framing of Issues', remarks: 'Preliminary issues framed regarding maintainability' },
      ];
    });
  });

  test('Case Detail Modal opens cleanly on Realme 9 Pro+ without horizontal overflow blowout', async ({ page }) => {
    // Open modal directly using Casebook global helper
    await page.evaluate(() => {
      window.openCaseDetailsFullModal('CS/909/2026');
    });

    const modal = page.locator('#caseDetailsFullModal');
    await expect(modal).toBeVisible({ timeout: 5000 });

    // 1. Verify zero horizontal overflow on the page viewport
    const overflowMetrics = await page.evaluate(() => {
      const root = document.documentElement;
      const body = document.body;
      const dialog = document.querySelector('#caseDetailsFullModal .cdm-dossier-dialog');
      return {
        viewportWidth: window.innerWidth,
        rootScrollWidth: root.scrollWidth,
        bodyScrollWidth: body.scrollWidth,
        dialogWidth: dialog ? dialog.getBoundingClientRect().width : 0,
      };
    });

    expect(overflowMetrics.viewportWidth).toBe(393);
    expect(overflowMetrics.rootScrollWidth).toBeLessThanOrEqual(overflowMetrics.viewportWidth + 1);
    expect(overflowMetrics.bodyScrollWidth).toBeLessThanOrEqual(overflowMetrics.viewportWidth + 1);
    expect(overflowMetrics.dialogWidth).toBeLessThanOrEqual(overflowMetrics.viewportWidth + 1);

    // 2. Panel 0: Overview Snapshot 2-column table check
    const panel0LabelColWidth = await page.evaluate(() => {
      const firstLabel = document.querySelector('.case-panel[data-panel="0"] .tbl td:first-child');
      return firstLabel ? firstLabel.getBoundingClientRect().width : 0;
    });
    expect(panel0LabelColWidth).toBeGreaterThanOrEqual(100);

    // 3. Panel 3: Payment Ledger Horizontal Scroll & min-width check
    await page.locator('.case-tab[data-panel="3"]').click();
    await page.waitForTimeout(200);

    const ledgerMetrics = await page.evaluate(() => {
      const wrap = document.querySelector('.case-panel[data-panel="3"] .tbl-wrap');
      const table = document.querySelector('.tbl.tbl-ledger');
      const wrapStyle = wrap ? window.getComputedStyle(wrap) : null;
      return {
        hasWrap: !!wrap,
        wrapOverflowX: wrapStyle ? wrapStyle.overflowX : '',
        tableScrollWidth: table ? table.scrollWidth : 0,
        wrapClientWidth: wrap ? wrap.clientWidth : 0,
      };
    });

    expect(ledgerMetrics.hasWrap).toBe(true);
    expect(['auto', 'scroll']).toContain(ledgerMetrics.wrapOverflowX);
    expect(ledgerMetrics.tableScrollWidth).toBeGreaterThanOrEqual(440);
    // Table is wider than the container on a 393px screen, confirming swipeable overflow
    expect(ledgerMetrics.tableScrollWidth).toBeGreaterThan(ledgerMetrics.wrapClientWidth);

    // 4. Panel 4: Hearing Proceedings & Order Sheet Table check
    await page.locator('.case-tab[data-panel="4"]').click();
    await page.waitForTimeout(200);

    const proceedingsMetrics = await page.evaluate(() => {
      const wrap = document.querySelector('.case-panel[data-panel="4"] .tbl-wrap');
      const table = document.querySelector('.tbl.tbl-proceedings');
      const wrapStyle = wrap ? window.getComputedStyle(wrap) : null;
      return {
        hasWrap: !!wrap,
        wrapOverflowX: wrapStyle ? wrapStyle.overflowX : '',
        tableScrollWidth: table ? table.scrollWidth : 0,
      };
    });

    expect(proceedingsMetrics.hasWrap).toBe(true);
    expect(['auto', 'scroll']).toContain(proceedingsMetrics.wrapOverflowX);
    expect(proceedingsMetrics.tableScrollWidth).toBeGreaterThanOrEqual(420);

    // 5. Panel 5: Private Notes & Remarks Table check
    await page.locator('.case-tab[data-panel="5"]').click();
    await page.waitForTimeout(200);

    const notesMetrics = await page.evaluate(() => {
      const wrap = document.querySelector('.case-panel[data-panel="5"] .tbl-wrap');
      const table = document.querySelector('.tbl.tbl-notes');
      return {
        hasWrap: !!wrap,
        tableScrollWidth: table ? table.scrollWidth : 0,
      };
    });

    expect(notesMetrics.hasWrap).toBe(true);
    expect(notesMetrics.tableScrollWidth).toBeGreaterThanOrEqual(380);

    // Close the Case Detail modal
    await page.evaluate(() => {
      window.closeCaseDetailsFullModal();
    });
    await expect(modal).not.toBeVisible({ timeout: 5000 });
  });

  test('Hearing History modal transforms cleanly into responsive mobile cards without screen blowout on Realme 9 Pro+', async ({ page }) => {
    // Open Hearing History modal
    await page.evaluate(() => {
      window.openCaseHistoryModalByNo('CS/909/2026');
    });

    const historyModal = page.locator('#caseHistoryModal');
    await expect(historyModal).toBeVisible({ timeout: 5000 });

    const historyAudit = await page.evaluate(() => {
      const root = document.documentElement;
      const container = document.querySelector('.chm-table-container');
      const table = document.querySelector('.chm-history-table');
      const containerStyle = container ? window.getComputedStyle(container) : null;
      const tableStyle = table ? window.getComputedStyle(table) : null;
      return {
        rootScrollWidth: root.scrollWidth,
        viewportWidth: window.innerWidth,
        tableScrollWidth: table ? table.scrollWidth : 0,
        containerClientWidth: container ? container.clientWidth : 0,
        tableDisplay: tableStyle ? tableStyle.display : '',
      };
    });

    // 1. Zero screen blowout on Realme 9 Pro+ 393px screen
    expect(historyAudit.rootScrollWidth).toBeLessThanOrEqual(historyAudit.viewportWidth + 1);

    // 2. Responsive mobile layout: table conforms cleanly to mobile viewport width
    expect(historyAudit.tableScrollWidth).toBeLessThanOrEqual(historyAudit.viewportWidth);
    expect(historyAudit.tableScrollWidth).toBeGreaterThan(0);

    // Close Hearing History modal
    await page.evaluate(() => {
      window.closeCaseHistoryModal();
    });
    await expect(historyModal).not.toBeVisible({ timeout: 5000 });
  });

  test('Cases Register Table (#allCasesTable) renders with touch scroll containment & zero blowout on Realme 9 Pro+', async ({ page }) => {
    // Navigate to 'all' cases tab
    await page.evaluate(async () => {
      await window.showTab('all');
      if (typeof window.setCasesViewMode === 'function') {
        window.setCasesViewMode('table');
      }
      if (typeof window.renderUnifiedCasesView === 'function') {
        window.renderUnifiedCasesView();
      }
    });

    const allTab = page.locator('#all');
    await expect(allTab).toHaveClass(/active/);

    const table = page.locator('#allCasesTable');
    await expect(table).toBeVisible({ timeout: 5000 });

    // 1. Inspect containment geometry on 393px Realme 9 Pro+ screen
    const registerAudit = await page.evaluate(() => {
      const root = document.documentElement;
      const body = document.body;
      const scrollWrap = document.querySelector('.table-card .table-scroll');
      const dataTable = document.querySelector('#allCasesTable');
      const wrapStyle = scrollWrap ? window.getComputedStyle(scrollWrap) : null;
      return {
        viewportWidth: window.innerWidth,
        rootScrollWidth: root.scrollWidth,
        bodyScrollWidth: body.scrollWidth,
        hasScrollWrap: !!scrollWrap,
        overflowX: wrapStyle ? wrapStyle.overflowX : '',
        wrapClientWidth: scrollWrap ? scrollWrap.clientWidth : 0,
        tableScrollWidth: dataTable ? dataTable.scrollWidth : 0,
      };
    });

    // Zero page-level horizontal blowout
    expect(registerAudit.viewportWidth).toBe(393);
    expect(registerAudit.rootScrollWidth).toBeLessThanOrEqual(registerAudit.viewportWidth + 1);
    expect(registerAudit.bodyScrollWidth).toBeLessThanOrEqual(registerAudit.viewportWidth + 1);

    // .table-scroll contains the multi-column data table cleanly with touch horizontal scroll
    expect(registerAudit.hasScrollWrap).toBe(true);
    expect(['auto', 'scroll']).toContain(registerAudit.overflowX);
    expect(registerAudit.tableScrollWidth).toBeGreaterThanOrEqual(750);
    expect(registerAudit.tableScrollWidth).toBeGreaterThan(registerAudit.wrapClientWidth);

    // 2. Perform horizontal touch scroll on the table wrapper
    await page.evaluate(() => {
      const scrollWrap = document.querySelector('.table-card .table-scroll');
      if (scrollWrap) {
        scrollWrap.scrollLeft = 300;
      }
    });
    await page.waitForTimeout(200);

    const scrollLeft = await page.evaluate(() => {
      const scrollWrap = document.querySelector('.table-card .table-scroll');
      return scrollWrap ? scrollWrap.scrollLeft : 0;
    });
    expect(scrollLeft).toBeGreaterThan(0);

    // 3. Document still has zero horizontal blowout after swiping table
    const postSwipeRootScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(postSwipeRootScrollWidth).toBeLessThanOrEqual(394);

    // 4. Switch to Cards View Mode (best mobile experience)
    await page.evaluate(() => {
      if (typeof window.setCasesViewMode === 'function') {
        window.setCasesViewMode('cards');
      }
    });
    await page.waitForTimeout(200);

    const cardsContainer = page.locator('#casesCardsViewContainer');
    await expect(cardsContainer).toBeVisible();

    const cardsAudit = await page.evaluate(() => {
      const cardsGrid = document.querySelector('#unifiedCaseCardsGrid');
      const root = document.documentElement;
      return {
        rootScrollWidth: root.scrollWidth,
        cardsCount: cardsGrid ? cardsGrid.children.length : 0,
      };
    });
    expect(cardsAudit.rootScrollWidth).toBeLessThanOrEqual(394);
    expect(cardsAudit.cardsCount).toBeGreaterThanOrEqual(1);

    // 5. Clicking a case row or action button opens Case Detail Modal on Realme 9 Pro+
    await page.evaluate(() => {
      if (typeof window.setCasesViewMode === 'function') {
        window.setCasesViewMode('table');
      }
    });
    await page.waitForTimeout(300);

    // Click the View button in the first row
    await page.locator('#allCasesTable tbody tr .ra-btn.view').first().click();
    const caseModal = page.locator('#caseDetailsFullModal');
    await expect(caseModal).toBeVisible({ timeout: 5000 });

    // Cleanly close modal
    await page.evaluate(() => {
      window.closeCaseDetailsFullModal();
    });
    await expect(caseModal).not.toBeVisible({ timeout: 5000 });
  });
});
