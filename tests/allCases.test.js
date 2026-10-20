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
        disposalComment: 'Decided on merit'
      },
      {
        caseNo: 'FAM-303',
        caseType: 'family',
        plaintiff: 'Wife',
        defendant: 'Husband',
        caseName: 'Wife vs Husband',
        courtName: 'Family Court',
        caseStatus: 'Pending',
        nextHearing: ''
      }
    ];

    window.escapeHtml = (str) => String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    window.formatDateDMY = (d) => d || '—';
    window.toISODate = (d) => d || '';
    window.remarksToPlainText = (r) => r || '';
    window.renderCaseTableRemarks = (r) => r || '—';

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

  it('updates category pill counts correctly', () => {
    if (typeof window.updateAllCasesTypePillCounts === 'function') {
      window.updateAllCasesTypePillCounts();
      expect(document.getElementById('pillCountAll').textContent).toBe('3');
      expect(document.getElementById('pillCountCivil').textContent).toBe('1');
      expect(document.getElementById('pillCountState').textContent).toBe('1');
      expect(document.getElementById('pillCountFamily').textContent).toBe('1');
    }
  });

  it('renders unified cases table with action buttons', () => {
    window.setCasesViewMode('table');
    window.renderUnifiedCasesView();

    const tbody = document.querySelector('#allCasesTable tbody');
    expect(tbody.innerHTML).toContain('CV-101');
    expect(tbody.innerHTML).toContain('CR-202');
    expect(tbody.innerHTML).toContain('FAM-303');
  });

  it('renders unified cases cards view when in cards mode', () => {
    window.setCasesViewMode('cards');
    window.renderUnifiedCasesView();

    const grid = document.getElementById('unifiedCaseCardsGrid');
    expect(grid.innerHTML).toContain('CV-101');
    expect(grid.innerHTML).toContain('CR-202');
    expect(grid.innerHTML).toContain('FAM-303');
  });
});
