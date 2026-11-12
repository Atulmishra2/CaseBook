import { describe, it, expect, beforeEach } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import '../utils/dateUtils.js';
import '../admin.js';
import '../components/modals/case-modals.js';

// Load modal CSS stylesheets and normalize line-endings to verify responsive contracts for Realme 9 Pro+
const modalEditorialCss = readFileSync(
  resolve(process.cwd(), 'styles/components/modal-editorial.css'),
  'utf8'
).replace(/\r\n/g, '\n');

const modalsCss = readFileSync(
  resolve(process.cwd(), 'styles/components/modals.css'),
  'utf8'
).replace(/\r\n/g, '\n');

/**
 * Realme 9 Pro+ (RMX3392 / RMX3393) Hardware & Viewport Profile:
 * - Screen: 6.4 inches Super AMOLED, 20:9 aspect ratio
 * - Hardware Resolution: 1080 x 2400 px (~411 ppi)
 * - Chrome Mobile Default CSS Viewport: 393px width x 873px height (DPR ~2.75x)
 * - Compact Display Scaling Viewport: 360px width x 800px height (DPR 3.0x)
 * - Large Display Scaling Viewport: 412px width x 915px height (DPR ~2.625x)
 * All these viewports fall strictly under @media (max-width: 640px).
 */
const REALME_9_PRO_PLUS = {
  model: 'Realme 9 Pro+ 5G (RMX3392)',
  hardwareResolution: { width: 1080, height: 2400 },
  defaultCssViewport: { width: 393, height: 873, dpr: 2.75 },
  compactCssViewport: { width: 360, height: 800, dpr: 3.0 },
  maxMobileBreakpoint: 640,
};

describe('Realme 9 Pro+ (1080x2400 / 393x873) - CSS Responsive Overflow Contracts', () => {
  it('covers Realme 9 Pro+ viewport within mobile media queries (max-width: 768px / 640px)', () => {
    // 393px logical viewport of Realme 9 Pro+ must be safely bounded by max-width: 768px / 640px
    expect(REALME_9_PRO_PLUS.defaultCssViewport.width).toBeLessThanOrEqual(
      REALME_9_PRO_PLUS.maxMobileBreakpoint
    );
    expect(REALME_9_PRO_PLUS.compactCssViewport.width).toBeLessThanOrEqual(
      REALME_9_PRO_PLUS.maxMobileBreakpoint
    );
    expect(modalEditorialCss).toContain('@media (max-width: 768px)');
    expect(modalsCss).toContain('@media (max-width: 640px)');
  });

  it('guarantees touch-friendly horizontal scroll on .tbl-wrap with zero vertical layout shift', () => {
    // Base table wrapper definition
    expect(modalEditorialCss).toMatch(
      /\.tbl-wrap\s*\{[^}]*?overflow-x:\s*auto;[^}]*?overflow-y:\s*hidden;[^}]*?-webkit-overflow-scrolling:\s*touch;/s
    );

    // Mobile media query override for mobile viewports including Realme 9 Pro+
    expect(modalEditorialCss).toMatch(
      /@media \(max-width:\s*(?:640px|768px)\)[\s\S]*?\.tbl-wrap\s*\{[^}]*?overflow-x:\s*auto !important;[^}]*?-webkit-overflow-scrolling:\s*touch;/s
    );
  });

  it('enforces calibrated minimum widths for multi-column tables on Realme 9 Pro+ screen', () => {
    // Multi-column tables must not crush columns on 393px viewport
    // Panel 3: Payment Ledger (Date, Particulars, Mode, Amount)
    expect(modalEditorialCss).toMatch(
      /@media \(max-width:\s*(?:640px|768px)\)[\s\S]*?\.tbl-ledger\s*\{[^}]*?min-width:\s*440px;/s
    );

    // Panel 4: Hearing Proceedings (Date, Stage, Order/Proceeding)
    expect(modalEditorialCss).toMatch(
      /@media \(max-width:\s*(?:640px|768px)\)[\s\S]*?\.tbl-proceedings\s*\{[^}]*?min-width:\s*420px;/s
    );

    // Panel 5: Private Notes & Remarks (Type, Date, Note)
    expect(modalEditorialCss).toMatch(
      /@media \(max-width:\s*(?:640px|768px)\)[\s\S]*?\.tbl-notes\s*\{[^}]*?min-width:\s*380px;/s
    );

    // Hearing History Modal Table
    expect(modalsCss).toMatch(
      /@media \(max-width:\s*(?:640px|768px)\)[\s\S]*?\.chm-history-table\s*\{[^}]*?min-width:\s*480px !important;/s
    );
  });

  it('balances 2-column key-value tables on 393px screen so field labels do not squash detail values', () => {
    expect(modalEditorialCss).toMatch(
      /@media \(max-width:\s*(?:640px|768px)\)[\s\S]*?\.case-panel\[data-panel="0"\] \.tbl td:first-child[\s\S]*?width:\s*38%;[\s\S]*?min-width:\s*100px;/s
    );
  });

  it('protects long strings, file links, and notes from forcing horizontal overflow on mobile', () => {
    expect(modalEditorialCss).toMatch(
      /\.tbl td\s*\{[^}]*?word-break:\s*break-word;[^}]*?overflow-wrap:\s*anywhere;/s
    );
    expect(modalEditorialCss).toMatch(
      /\.tbl td a\s*\{[^}]*?word-break:\s*break-all;/s
    );
    expect(modalsCss).toMatch(
      /\.chm-history-table td\s*\{[^}]*?word-break:\s*break-word;[^}]*?overflow-wrap:\s*anywhere;/s
    );
  });

  it('provides slim mobile touch scrollbar indicators for both modals', () => {
    expect(modalEditorialCss).toMatch(
      /\.tbl-wrap::-webkit-scrollbar\s*\{[^}]*?height:\s*5px;/s
    );
    expect(modalsCss).toMatch(
      /\.chm-table-container::-webkit-scrollbar\s*\{[^}]*?height:\s*6px;/s
    );
  });

  it('provides touch-action and directional slide keyframes for tab swipe transitions in modal', () => {
    expect(modalEditorialCss).toMatch(
      /\.case-panels\s*\{[^}]*?touch-action:\s*pan-y\s*pinch-zoom;/s
    );
    expect(modalEditorialCss).toMatch(
      /@keyframes\s+cdmPanelSlideNext\s*\{[^}]*?translateX\(24px\)/s
    );
    expect(modalEditorialCss).toMatch(
      /@keyframes\s+cdmPanelSlidePrev\s*\{[^}]*?translateX\(-24px\)/s
    );
  });
});

describe('Realme 9 Pro+ - Case Detail Modal DOM Rendering & Mobile Interaction Test', () => {
  beforeEach(() => {
    window.ensureCaseModalsMounted();
    window.allCaseRecords = [
      {
        caseNo: 'CIVIL/109/2026',
        caseName: 'Rameshwar Dayal vs Shiv Prasad',
        plaintiff: 'Rameshwar Dayal',
        defendant: 'Shiv Prasad',
        caseType: 'civil',
        courtName: 'Court of Civil Judge (Senior Division), Lucknow',
        nextHearing: '2026-11-28',
        hearingProcess: 'Cross Examination of Defendant',
        caseYear: '2026',
        filingDate: '2026-02-10',
        clientName: 'Rameshwar Dayal',
        clientNumber: '+91 98390 12345',
        totalFee: '25000',
        remark: 'Title declaration dispute over ancestral land measuring 1200 sq yards near Gomti Nagar.'
      }
    ];

    window.allPaisaTransactions = [
      { id: 'tx-1', case_no: 'CIVIL/109/2026', amount: 15000, type: 'received', date: '2026-02-15', particulars: 'Initial Vakalatnama Advance' },
      { id: 'tx-2', case_no: 'CIVIL/109/2026', amount: 5000, type: 'received', date: '2026-05-10', particulars: 'Evidence filing fee' },
      { id: 'tx-3', case_no: 'CIVIL/109/2026', amount: 1200, type: 'spent', date: '2026-05-12', particulars: 'Process server & summons charge' },
    ];

    window.allHearingRecords = [
      { id: 'h-1', case_number: 'CIVIL/109/2026', hearing_date: '2026-02-10', stage: 'First Appearance / Institution', remarks: 'Summons issued to opposite party' },
      { id: 'h-2', case_number: 'CIVIL/109/2026', hearing_date: '2026-05-10', stage: 'Written Statement', remarks: 'WS filed with 3-week time requested for replication' },
      { id: 'h-3', case_number: 'CIVIL/109/2026', hearing_date: '2026-08-20', stage: 'Framing of Issues', remarks: 'Issues framed on ownership title and adverse possession' },
    ];
  });

  it('renders Case Detail Modal with all semantic table classes required for Realme 9 Pro+ mobile overflow', () => {
    window.openCaseDetailsFullModal('CIVIL/109/2026');

    const modal = document.getElementById('caseDetailsFullModal');
    expect(modal).not.toBeNull();
    expect(modal.classList.contains('hidden')).toBe(false);

    // 1. Payment Ledger Table must have .tbl-ledger class
    const ledgerTable = modal.querySelector('.tbl.tbl-ledger');
    expect(ledgerTable).not.toBeNull();
    expect(ledgerTable.closest('.tbl-wrap')).not.toBeNull();

    // Verify ledger rows rendered properly in #cdmFeeLedgerBody
    const ledgerBody = document.getElementById('cdmFeeLedgerBody');
    expect(ledgerBody).not.toBeNull();
    expect(ledgerBody.innerHTML).toContain('Initial Vakalatnama Advance');
    expect(ledgerBody.innerHTML).toContain('15,000');

    // 2. Proceedings Table must have .tbl-proceedings class
    const proceedingsTable = modal.querySelector('.tbl.tbl-proceedings');
    expect(proceedingsTable).not.toBeNull();
    expect(proceedingsTable.closest('.tbl-wrap')).not.toBeNull();

    // Verify proceedings rows rendered properly in #cdmProceedingsBody
    const proceedingsBody = document.getElementById('cdmProceedingsBody');
    expect(proceedingsBody).not.toBeNull();
    expect(proceedingsBody.innerHTML).toContain('Framing of Issues');

    // 3. Notes Table must have .tbl-notes class
    const notesTable = modal.querySelector('.tbl.tbl-notes');
    expect(notesTable).not.toBeNull();
    expect(notesTable.closest('.tbl-wrap')).not.toBeNull();

    // Verify notes body contains remark
    const notesBody = document.getElementById('cdmNotesBody');
    expect(notesBody).not.toBeNull();
    expect(notesBody.innerHTML).toContain('Title declaration dispute');
  });

  it('allows mobile tab switching between all 6 panels smoothly without breaking DOM state', () => {
    window.openCaseDetailsFullModal('CIVIL/109/2026');

    const tabs = document.querySelectorAll('.case-tab');
    const panels = document.querySelectorAll('.case-panel');
    expect(tabs.length).toBe(6);
    expect(panels.length).toBe(6);

    // Switch to Panel 3 (Fees & Ledger)
    tabs[3].click();
    expect(panels[3].classList.contains('active')).toBe(true);
    expect(tabs[3].classList.contains('active')).toBe(true);

    // Switch to Panel 4 (Proceedings)
    tabs[4].click();
    expect(panels[4].classList.contains('active')).toBe(true);
    expect(tabs[4].classList.contains('active')).toBe(true);

    // Switch to Panel 5 (Notes)
    tabs[5].click();
    expect(panels[5].classList.contains('active')).toBe(true);
    expect(tabs[5].classList.contains('active')).toBe(true);
  });

  it('renders Case Hearing History modal with .chm-table-container and .chm-history-table intact', () => {
    window.openCaseHistoryModalByNo('CIVIL/109/2026');

    const historyModal = document.getElementById('caseHistoryModal');
    expect(historyModal).not.toBeNull();
    expect(historyModal.classList.contains('hidden')).toBe(false);

    const tableContainer = historyModal.querySelector('.chm-table-container');
    expect(tableContainer).not.toBeNull();

    const historyTable = historyModal.querySelector('.chm-history-table');
    expect(historyTable).not.toBeNull();

    const tbody = document.getElementById('caseHistoryTableBody');
    expect(tbody).not.toBeNull();
    expect(tbody.children.length).toBeGreaterThanOrEqual(1);
  });
});
