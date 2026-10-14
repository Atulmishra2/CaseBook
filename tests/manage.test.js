/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Manage Hub Module Tests (components/tabs/manage/manage.js)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    window.courts = ['District Court, Room 1', 'Family Court, Room 2', 'Old Deleted Court'];
    window.allCaseRecords = [
      {
        caseNo: 'CV-2026-001',
        caseType: 'civil',
        plaintiff: 'Arun Kumar',
        defendant: 'Vijay Singh',
        caseName: 'Arun Kumar vs Vijay Singh',
        courtName: 'District Court, Room 1',
        caseStatus: 'Pending',
        nextHearing: '2026-06-15'
      },
      {
        caseNo: 'CR-2026-002',
        caseType: 'criminal',
        victimName: 'State (Pooja)',
        accusedName: 'Rohan',
        courtName: 'District Court, Room 1',
        caseStatus: 'Pending',
        nextHearing: '2026-07-20'
      }
    ];
    window.getDeletedCourtsSet = () => new Set(['old deleted court']);
    window.escapeHtml = (str) => String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    window.showToastNotification = vi.fn();

    // Load manage.js
    const manageJsPath = path.resolve(__dirname, '../components/tabs/manage/manage.js');
    const manageJsCode = fs.readFileSync(manageJsPath, 'utf8');
    eval(manageJsCode);

    // Mount tab HTML into document
    document.body.innerHTML = window.__casebook_tabs['manage'];
  });

  it('getCourtDropdownOptions correctly reads window.courts and excludes deleted courts', () => {
    const html = window.getCourtDropdownOptions('District Court, Room 1');
    expect(html).toContain('District Court, Room 1');
    expect(html).toContain('Family Court, Room 2');
    expect(html).not.toContain('Old Deleted Court');
    expect(html).toContain('selected');
  });

  it('switches case hub mode cleanly between add, update, and delete', () => {
    window.switchCaseHubMode('add');
    expect(document.getElementById('pane-add').classList.contains('active')).toBe(true);
    expect(document.getElementById('pane-update').classList.contains('active')).toBe(false);

    window.switchCaseHubMode('update');
    expect(document.getElementById('pane-update').classList.contains('active')).toBe(true);
    expect(document.getElementById('pane-add').classList.contains('active')).toBe(false);

    window.switchCaseHubMode('delete');
    expect(document.getElementById('pane-delete').classList.contains('active')).toBe(true);
  });

  it('renders add form fields correctly for civil vs criminal', () => {
    window.renderCaseHubAddForm('civil');
    const container = document.getElementById('caseHubAddFormContainer');
    expect(container.innerHTML).toContain('Plaintiff / Petitioner (वादी)');
    expect(container.innerHTML).toContain('Defendant / Opponent (प्रतिवादी)');

    window.renderCaseHubAddForm('criminal');
    expect(container.innerHTML).toContain('Criminal Case / FIR Number');
    expect(container.innerHTML).toContain('Police Station / Thana');
    expect(container.innerHTML).toContain('Statutory Sections');
  });

  it('searches cases and renders candidate results for update/delete', () => {
    // Default search mode is number
    document.getElementById('hubUpdateSearchInput').value = 'CV-2026';
    window.performCaseHubSearch('update');

    let resultsContainer = document.getElementById('hubUpdateResultsList');
    expect(resultsContainer.innerHTML).toContain('CV-2026-001');

    // Switch to name mode and search by party name
    window.setCaseHubSearchMode('name', 'update');
    document.getElementById('hubUpdateSearchInput').value = 'Arun';
    window.performCaseHubSearch('update');
    expect(resultsContainer.innerHTML).toContain('CV-2026-001');
    expect(resultsContainer.innerHTML).toContain('Arun Kumar vs Vijay Singh');
  });

  it('selects case and renders update form with existing values', () => {
    window.selectCaseForHub('CV-2026-001', 'update');

    const formContainer = document.getElementById('caseHubUpdateFormContainer');
    expect(formContainer.innerHTML).toContain('CV-2026-001');
    expect(formContainer.innerHTML).toContain('Arun Kumar');
    expect(formContainer.innerHTML).toContain('Vijay Singh');
  });

  it('selects case and renders delete inspection card', () => {
    window.selectCaseForHub('CV-2026-001', 'delete');

    const inspContainer = document.getElementById('caseHubDeleteFormContainer');
    expect(inspContainer.innerHTML).toContain('CV-2026-001');
    expect(inspContainer.innerHTML).toContain('Arun Kumar vs Vijay Singh');
  });
});
