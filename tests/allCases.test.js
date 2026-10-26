/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Unified All Cases Module Tests (components/tabs/all/tab-all.js & home.js)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    window.allCaseRecords = [
      {
        caseNo: 'CV-101',
        caseType: 'civil',
        plaintiff: 'P1',
        defendant: 'D1',
        caseName: 'P1 vs D1',
        courtName: 'Court 1',
        caseStatus: 'Pending',
        filingDate: '2026-01-15',
        nextHearing: '2026-06-20'
      },
      {
        caseNo: 'CR-202',
        caseType: 'state',
        victimName: 'State',
        accusedName: 'Accused 1',
        caseName: 'State vs Accused 1',
        criminalCourtName: 'Court 2',
        caseStatus: 'Disposed',
        disposalComment: 'Decided on merit',
        filingDate: '2025-11-20'
      },
      {
        caseNo: 'FAM-303',
        caseType: 'family',
        plaintiff: 'Wife',
        defendant: 'Husband',
        caseName: 'Wife vs Husband',
        courtName: 'Family Court',
        caseStatus: 'Pending',
        filingDate: '2026-02-10', // Filed, awaiting 1st hearing date
        nextHearing: ''
      },
      {
        caseNo: 'REV-404',
        caseType: 'revenue',
        applicant: 'A1',
        oppositeParty: 'OP1',
        caseName: 'A1 vs OP1',
        courtName: 'Tehsil',
        caseStatus: 'Pending',
        filingDate: '2026-03-01', // Filed, awaiting 1st hearing date
        nextHearing: '—'
      },
      {
        caseNo: 'MISC-505',
        caseType: 'misc_civil',
        applicant: 'App1',
        oppositeParty: 'Resp1',
        caseName: 'App1 vs Resp1',
        courtName: 'High Court',
        caseStatus: 'Pending',
        filingDate: '2025-05-01',
        previousHearing: '2026-01-15', // Ongoing case between dates
        nextHearing: 'undated'
      }
    ];

    window.escapeHtml = (str) => String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    window.formatDateDMY = (d) => d || '—';
    window.toISODate = (d) => d || '';
    window.remarksToPlainText = (r) => r || '';
    window.remarksToSearchString = (r) => String(r || '').toLowerCase();
    window.renderCaseTableRemarks = (r) => r || '—';
    window._currentActiveFilterTab = '';
    window.isCaseDisposed = (c) => Boolean(
      (c.caseStatus && String(c.caseStatus).toLowerCase().includes('dispose')) ||
      c.disposalComment
    );

    // Load all.js template
    const allJsPath = path.resolve(__dirname, '../components/tabs/all/tab-all.js');
    eval(fs.readFileSync(allJsPath, 'utf8'));

    // Load home.js for unified view logic
    const homeJsPath = path.resolve(__dirname, '../components/tabs/home/tab-home.js');
    eval(fs.readFileSync(homeJsPath, 'utf8'));

    // Mount tab HTML
    document.body.innerHTML = window.__casebook_tabs['all'];
  });

  it('switches view mode between table and cards', () => {
    window.setCasesViewMode('table');
    expect(document.getElementById('casesTableViewContainer').classList.contains('hidden')).toBe(false);
    expect(document.getElementById('casesCardsViewContainer').classList.contains('hidden')).toBe(true);

    window.setCasesViewMode('cards');
    expect(document.getElementById('casesTableViewContainer').classList.contains('hidden')).toBe(true);
    expect(document.getElementById('casesCardsViewContainer').classList.contains('hidden')).toBe(false);
  });

  it('updates category pill counts correctly including waiting for filing', () => {
    if (typeof window.updateAllCasesTypePillCounts === 'function') {
      window.updateAllCasesTypePillCounts();
      expect(document.getElementById('pillCountAll').textContent).toBe('5');
      expect(document.getElementById('pillCountCivil').textContent).toBe('1');
      expect(document.getElementById('pillCountState').textContent).toBe('1');
      expect(document.getElementById('pillCountFamily').textContent).toBe('1');
      expect(document.getElementById('pillCountRevenue').textContent).toBe('1');
      expect(document.getElementById('pillCountMiscCivil').textContent).toBe('1');
      expect(document.getElementById('pillCountWaitingFiling').textContent).toBe('2');
    }
  });

  it('renders unified cases table with action buttons', () => {
    window.setCasesViewMode('table');
    window.renderUnifiedCasesView();

    const tbody = document.querySelector('#allCasesTable tbody');
    expect(tbody.innerHTML).toContain('CV-101');
    expect(tbody.innerHTML).toContain('CR-202');
    expect(tbody.innerHTML).toContain('FAM-303');
    expect(tbody.innerHTML).toContain('REV-404');
    expect(tbody.innerHTML).toContain('MISC-505');
  });

  it('filters cases when Waiting for Initial Filing chip is clicked', () => {
    window.setCasesViewMode('table');
    window.filterAllCasesByType('waiting_filing');

    const tbody = document.querySelector('#allCasesTable tbody');
    // Should contain FAM-303 and REV-404 (filed, awaiting 1st hearing date)
    expect(tbody.innerHTML).toContain('FAM-303');
    expect(tbody.innerHTML).toContain('REV-404');
    // Should NOT contain CV-101 (has hearing scheduled), CR-202 (disposed), or MISC-505 (ongoing case that had prior hearing)
    expect(tbody.innerHTML).not.toContain('CV-101');
    expect(tbody.innerHTML).not.toContain('CR-202');
    expect(tbody.innerHTML).not.toContain('MISC-505');

    // Should also reflect on cards mode
    window.setCasesViewMode('cards');
    const grid = document.getElementById('unifiedCaseCardsGrid');
    expect(grid.innerHTML).toContain('FAM-303');
    expect(grid.innerHTML).toContain('REV-404');
    expect(grid.innerHTML).not.toContain('CV-101');
    expect(grid.innerHTML).not.toContain('CR-202');
    expect(grid.innerHTML).not.toContain('MISC-505');

    // Resetting filters should bring back all cases
    window.setCasesViewMode('table');
    window.resetAllCasesFilters();
    expect(document.querySelector('#allCasesTable tbody').innerHTML).toContain('CV-101');
    expect(document.querySelector('#allCasesTable tbody').innerHTML).toContain('MISC-505');
  });

  it('renders unified cases cards view when in cards mode', () => {
    window.setCasesViewMode('cards');
    window.renderUnifiedCasesView();

    const grid = document.getElementById('unifiedCaseCardsGrid');
    expect(grid.innerHTML).toContain('CV-101');
    expect(grid.innerHTML).toContain('CR-202');
    expect(grid.innerHTML).toContain('FAM-303');
    expect(grid.innerHTML).toContain('REV-404');
    expect(grid.innerHTML).toContain('MISC-505');
  });

  it('renders cards empty state with .cards-empty-state when no cases match', () => {
    window.setCasesViewMode('cards');
    document.getElementById('allCasesSearchInput').value = 'NonExistentCaseXYZ123';
    window.renderUnifiedCasesView();

    const grid = document.getElementById('unifiedCaseCardsGrid');
    expect(grid.querySelector('.cards-empty-state')).not.toBeNull();
    expect(grid.innerHTML).toContain('No cases match the specified filters');
    expect(grid.querySelector('.empty-state-btn')).not.toBeNull();
  });

  it('initializes and interacts with the new custom dropdowns', () => {
    window.setCasesViewMode('table');
    window.renderUnifiedCasesView();

    // Check custom dropdown elements exist
    const typeDropdown = document.getElementById('allCasesTypeDropdown');
    const trigger = document.getElementById('allCasesTypeTrigger');
    const menu = document.getElementById('allCasesTypeMenu');
    const list = document.getElementById('allCasesTypeList');
    const label = document.getElementById('allCasesTypeLabel');

    expect(typeDropdown).not.toBeNull();
    expect(trigger).not.toBeNull();
    expect(menu).not.toBeNull();
    expect(list.children.length).toBeGreaterThan(0);
    expect(label.textContent).toBe('All Case Types');

    // Trigger open dropdown
    trigger.click();
    expect(menu.classList.contains('open')).toBe(true);

    // Click on Civil option
    const civilOption = Array.from(list.children).find(li => li.getAttribute('data-value') === 'civil');
    expect(civilOption).not.toBeUndefined();
    civilOption.click();

    // Menu should be closed and label updated
    expect(menu.classList.contains('open')).toBe(false);
    expect(label.textContent).toBe('Civil');
    expect(document.getElementById('allCasesTypeSelect').value).toBe('civil');

    // Table should only show Civil cases (CV-101)
    const tbody = document.querySelector('#allCasesTable tbody');
    expect(tbody.innerHTML).toContain('CV-101');
    expect(tbody.innerHTML).not.toContain('CR-202');
    expect(tbody.innerHTML).not.toContain('FAM-303');

    // Resetting should update the custom dropdown label back to All Case Types
    window.resetAllCasesFilters();
    expect(label.textContent).toBe('All Case Types');
  });

  it('presets row (filterTabs) has scrollable setup and wheel scroll handler', () => {
    const filterTabs = document.getElementById('filterTabs');
    expect(filterTabs).not.toBeNull();
    expect(filterTabs.classList.contains('filter-tabs')).toBe(true);

    if (window.initFilterTabsHorizontalScroll) {
      window.initFilterTabsHorizontalScroll();
      expect(filterTabs._wheelAttached).toBe(true);

      // Simulate mouse wheel event
      const wheelEvt = new window.WheelEvent('wheel', { deltaY: 50, cancelable: true });
      filterTabs.dispatchEvent(wheelEvt);
      expect(filterTabs.scrollLeft).toBe(50);
    }
  });
});
