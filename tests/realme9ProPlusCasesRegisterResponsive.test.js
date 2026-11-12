/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Load tab stylesheets
const tabAllCss = readFileSync(
  resolve(process.cwd(), 'components/tabs/all/tab-all.css'),
  'utf8'
).replace(/\r\n/g, '\n');

const tablesCss = readFileSync(
  resolve(process.cwd(), 'styles/components/tables.css'),
  'utf8'
).replace(/\r\n/g, '\n');

/**
 * Realme 9 Pro+ (1080x2400 / 393x873 px CSS logical viewport)
 * Breakpoint target: Mobile viewports <= 640px / 768px
 */
const REALME_9_PRO_PLUS = {
  model: 'Realme 9 Pro+ 5G',
  width: 393,
  height: 873,
};

describe('Realme 9 Pro+ - Cases Register Table CSS Responsive Contracts', () => {
  it('protects document from horizontal overflow by enforcing scroll container on #all .table-scroll', () => {
    // .table-scroll in tab-all.css has auto scrollbars
    expect(tabAllCss).toMatch(
      /\.table-scroll[\s\S]*?overflow-x:\s*auto !important;/
    );
    expect(tabAllCss).toMatch(
      /\.table-scroll[\s\S]*?overflow-y:\s*auto !important;/
    );

    // .table-scroll in tables.css has auto overflow-x and hidden overflow
    expect(tablesCss).toMatch(
      /\.table-scroll[\s\S]*?overflow-x:\s*auto !important;/
    );
  });

  it('guarantees min-width for table.data-table so case columns maintain readability during horizontal swipe', () => {
    expect(tabAllCss).toMatch(
      /table\.data-table\s*\{[^}]*?min-width:\s*1250px;/s
    );
  });

  it('provides high-contrast dark theme scrollbar and header styling for mobile table', () => {
    expect(tabAllCss).toMatch(
      /table#allCasesTable thead th\s*\{[^}]*?background:\s*#0f1729 !important;/s
    );
    expect(tabAllCss).toMatch(
      /\.table-scroll::-webkit-scrollbar\s*\{[^}]*?height:\s*10px !important;/s
    );
  });

  it('adapts stats cards row into a scrollable horizontal carousel on 393px mobile screen', () => {
    // Under max-width: 768px, stats row uses flex-wrap: nowrap to prevent vertical screen hogging
    expect(tabAllCss).toMatch(
      /@media \(max-width:\s*768px\)[\s\S]*?\.stats-row\s*\{[^}]*?display:\s*flex !important;[^}]*?flex-wrap:\s*nowrap !important;/s
    );
  });

  it('enforces single-column cards feed and anti-overflow wrapping for mobile screens (<= 768px and <= 420px)', () => {
    // Under <= 768px, cards-feed-grid uses 1fr single column
    expect(tabAllCss).toMatch(
      /@media \(max-width:\s*768px\)[\s\S]*?\.cards-feed-grid\s*\{[^}]*?grid-template-columns:\s*1fr !important;/s
    );
    // Under <= 420px (Realme 9 Pro+ 393px), card bottom row stacks with full-width 4-column button grid
    expect(tabAllCss).toMatch(
      /@media \(max-width:\s*420px\)[\s\S]*?\.unified-case-card \.card-bottom-row\s*\{[^}]*?flex-direction:\s*column !important;/s
    );
    expect(tabAllCss).toMatch(
      /@media \(max-width:\s*420px\)[\s\S]*?\.unified-case-card \.card-actions\s*\{[^}]*?grid-template-columns:\s*repeat\(4,\s*1fr\) !important;/s
    );
  });

  it('eliminates visible scrollbars on stats-row, filter-tabs, and mobile table-scroll while maintaining swipe contracts', () => {
    // 1. Stats row on mobile has scrollbar-width: none and hidden webkit scrollbar
    expect(tabAllCss).toMatch(
      /@media \(max-width:\s*768px\)[\s\S]*?\.stats-row\s*\{[^}]*?scrollbar-width:\s*none !important;/s
    );
    expect(tabAllCss).toMatch(
      /\.stats-row::-webkit-scrollbar\s*\{[^}]*?display:\s*none !important;/s
    );

    // 2. Category filter tabs has scrollbar-width: none and hidden webkit scrollbar
    expect(tabAllCss).toMatch(
      /\.filter-tabs\s*\{[^}]*?scrollbar-width:\s*none !important;/s
    );
    expect(tabAllCss).toMatch(
      /\.filter-tabs::-webkit-scrollbar\s*\{[^}]*?display:\s*none !important;/s
    );

    // 3. Table scroll on mobile has scrollbar-width: none and hidden webkit scrollbar
    expect(tabAllCss).toMatch(
      /@media \(max-width:\s*768px\)[\s\S]*?\.table-scroll[\s\S]*?scrollbar-width:\s*none !important;/s
    );
    expect(tabAllCss).toMatch(
      /@media \(max-width:\s*768px\)[\s\S]*?\.table-scroll::-webkit-scrollbar\s*\{[^}]*?display:\s*none !important;/s
    );
  });
});

describe('Realme 9 Pro+ - Cases Register Table Functional & View Mode Test', () => {
  beforeEach(() => {
    document.body.innerHTML = '';

    window.allCaseRecords = [
      {
        caseNo: 'CIVIL/501/2026',
        caseType: 'civil',
        plaintiff: 'Rameshwar Dayal',
        defendant: 'Shiv Prasad',
        caseName: 'Rameshwar Dayal vs Shiv Prasad',
        courtName: 'Civil Judge Senior Division, Lucknow',
        caseStatus: 'Pending',
        filingDate: '2026-01-15',
        nextHearing: '2026-06-20',
        clientName: 'Rameshwar Dayal',
        clientNumber: '9839012345',
        hearingProcess: 'Cross Examination',
        remark: 'Ancestral land partition suit'
      },
      {
        caseNo: 'CR/802/2026',
        caseType: 'state',
        victimName: 'State of UP',
        accusedName: 'Vikramaditya',
        caseName: 'State of UP vs Vikramaditya',
        criminalCourtName: 'Sessions Court Room 2',
        caseStatus: 'Pending',
        filingDate: '2026-02-10',
        nextHearing: '2026-07-15',
        clientName: 'Vikramaditya',
        clientNumber: '9811122334',
        hearingProcess: 'Bail Arguments',
        remark: 'Anticipatory bail application'
      },
      {
        caseNo: 'DISP/303/2025',
        caseType: 'civil',
        plaintiff: 'Mohan Lal',
        defendant: 'Sohan Lal',
        caseName: 'Mohan Lal vs Sohan Lal',
        courtName: 'Small Causes Court',
        caseStatus: 'Disposed',
        disposalComment: 'Decided on merit in favour of plaintiff',
        filingDate: '2025-03-12',
        nextHearing: ''
      }
    ];

    window.escapeHtml = (str) =>
      String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    window.formatDateDMY = (d) => d || '—';
    window.toISODate = (d) => d || '';
    window.remarksToPlainText = (r) => r || '';
    window.remarksToSearchString = (r) => String(r || '').toLowerCase();
    window.renderCaseTableRemarks = (r) => r || '—';
    window._currentActiveFilterTab = '';
    window.isCaseDisposed = (c) =>
      Boolean(
        (c.caseStatus && String(c.caseStatus).toLowerCase().includes('dispose')) ||
        c.disposalComment
      );

    // Evaluate tab scripts
    const allJsCode = readFileSync(resolve(process.cwd(), 'components/tabs/all/tab-all.js'), 'utf8');
    const homeJsCode = readFileSync(resolve(process.cwd(), 'components/tabs/home/tab-home.js'), 'utf8');
    eval(allJsCode);
    eval(homeJsCode);

    // Mount Tab HTML
    document.body.innerHTML = window.__casebook_tabs['all'];
  });

  it('renders #allCasesTable with populated rows and proper container structure', () => {
    window.setCasesViewMode('table');
    window.renderUnifiedCasesView();

    const table = document.getElementById('allCasesTable');
    expect(table).not.toBeNull();

    const scrollContainer = table.closest('.table-scroll');
    expect(scrollContainer).not.toBeNull();
    expect(scrollContainer.closest('.table-card')).not.toBeNull();

    const tbody = table.querySelector('tbody');
    expect(tbody).not.toBeNull();
    expect(tbody.innerHTML).toContain('CIVIL/501/2026');
    expect(tbody.innerHTML).toContain('CR/802/2026');
    expect(tbody.innerHTML).toContain('DISP/303/2025');

    // Action buttons and row clicks must be present
    expect(tbody.innerHTML).toContain("openCaseDetailsFullModal('CIVIL/501/2026')");
    expect(tbody.innerHTML).toContain("openUpdateHearingForCase('CIVIL/501/2026')");
    expect(tbody.innerHTML).toContain("editCaseFromTable('CIVIL/501/2026')");
  });

  it('switches cleanly between Table Mode and mobile Cards Mode for Realme 9 Pro+', () => {
    // 1. Table View mode active
    window.setCasesViewMode('table');
    expect(document.getElementById('casesTableViewContainer').classList.contains('hidden')).toBe(false);
    expect(document.getElementById('casesCardsViewContainer').classList.contains('hidden')).toBe(true);

    // 2. Switch to Cards View (ideal for single-column mobile view on 393px screens)
    window.setCasesViewMode('cards');
    expect(document.getElementById('casesTableViewContainer').classList.contains('hidden')).toBe(true);
    expect(document.getElementById('casesCardsViewContainer').classList.contains('hidden')).toBe(false);

    const cardsGrid = document.getElementById('unifiedCaseCardsGrid');
    expect(cardsGrid).not.toBeNull();
    expect(cardsGrid.innerHTML).toContain('CIVIL/501/2026');
    expect(cardsGrid.innerHTML).toContain('Rameshwar Dayal vs Shiv Prasad');

    // Verify Lucide-only iconography contract (Rule 2)
    expect(cardsGrid.innerHTML).toContain('icon="lucide:folder"');
    expect(cardsGrid.innerHTML).toContain('icon="lucide:landmark"');
    expect(cardsGrid.innerHTML).toContain('icon="lucide:user"');
    expect(cardsGrid.innerHTML).toContain('icon="lucide:eye"');
    expect(cardsGrid.innerHTML).toContain('icon="lucide:calendar-plus"');
    expect(cardsGrid.innerHTML).toContain('icon="lucide:pencil"');
    expect(cardsGrid.innerHTML).toContain('icon="lucide:trash-2"');

    // Ensure zero FontAwesome or emojis in cards view
    expect(cardsGrid.innerHTML).not.toContain('fa-regular');
    expect(cardsGrid.innerHTML).not.toContain('fa-solid');
    expect(cardsGrid.innerHTML).not.toContain('👤');
  });

  it('filters table dynamically when user types in mobile search bar', () => {
    window.setCasesViewMode('table');
    const searchInput = document.getElementById('allCasesSearchInput');
    expect(searchInput).not.toBeNull();

    // Search for "Vikramaditya"
    searchInput.value = 'Vikramaditya';
    window.renderUnifiedCasesView();

    const tbody = document.querySelector('#allCasesTable tbody');
    expect(tbody.innerHTML).toContain('CR/802/2026');
    expect(tbody.innerHTML).not.toContain('CIVIL/501/2026');

    // Clear search
    if (typeof window.clearAllCasesSearch === 'function') {
      window.clearAllCasesSearch();
      expect(searchInput.value).toBe('');
      expect(tbody.innerHTML).toContain('CIVIL/501/2026');
    }
  });

  it('filters table by category chips (e.g. Civil only)', () => {
    window.setCasesViewMode('table');
    if (typeof window.filterAllCasesByType === 'function') {
      window.filterAllCasesByType('civil');

      const tbody = document.querySelector('#allCasesTable tbody');
      expect(tbody.innerHTML).toContain('CIVIL/501/2026');
      expect(tbody.innerHTML).not.toContain('CR/802/2026'); // Criminal case excluded
    }
  });

  it('initializes horizontal swipe gesture listeners without errors', () => {
    expect(typeof window.initAllCasesStatsSwipe).toBe('function');
    expect(typeof window.initAllCasesFilterTabsSwipe).toBe('function');
    expect(typeof window.initAllCasesSwipeGestures).toBe('function');

    expect(() => {
      window.initAllCasesSwipeGestures();
    }).not.toThrow();

    const tabs = document.getElementById('filterTabs');
    if (tabs) {
      expect(tabs.dataset.swipeInit).toBe('true');
    }
  });
});
