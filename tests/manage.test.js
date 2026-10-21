/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Manage Hub Module Tests (components/tabs/manage/tab-manage.js)', () => {
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
    const manageJsPath = path.resolve(__dirname, '../components/tabs/manage/tab-manage.js');
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
    expect(container.innerHTML).toContain('Case Number / ST No.');
    expect(container.innerHTML).toContain('Police Station / Thana');
    expect(container.innerHTML).toContain('Sections');
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

  it('renders all 7 statutory categories with specific input fields and presets in Add form', () => {
    const container = document.getElementById('caseHubAddFormContainer');

    // 1. Civil
    window.renderCaseHubAddForm('civil');
    expect(container.innerHTML).toContain('hubAdd_caseNo');
    expect(container.innerHTML).toContain('hubAdd_clientName');
    expect(container.innerHTML).toContain('mini-court-btn');
    expect(container.innerHTML).toContain('court-input-wrapper');
    expect(document.getElementById('hubAdd_nextHearing')).toBeNull();
    expect(container.innerHTML).toContain('Co-Plaintiffs');

    // 2. Criminal
    window.renderCaseHubAddForm('criminal');
    expect(container.innerHTML).toContain('hubAdd_policeStation');
    expect(container.innerHTML).toContain('hubAdd_crimeNo');
    expect(container.innerHTML).toContain('hubAdd_clientName');
    expect(container.innerHTML).toContain('mini-court-btn');
    expect(document.getElementById('hubAdd_nextHearing')).toBeNull();
    expect(container.innerHTML).toContain('Co-Accused');

    // 3. Family
    window.renderCaseHubAddForm('family');
    expect(container.innerHTML).toContain('hubAdd_matterType');
    expect(container.innerHTML).toContain('hubAdd_marriageDate');
    expect(container.innerHTML).toContain('hubAdd_maintenance');
    expect(container.innerHTML).toContain('hubAdd_clientName');
    expect(container.innerHTML).toContain('mini-court-btn');
    expect(document.getElementById('hubAdd_nextHearing')).toBeNull();
    expect(container.innerHTML).toContain('In-Laws Named');

    // 4. Revenue
    window.renderCaseHubAddForm('revenue');
    expect(container.innerHTML).toContain('hubAdd_revenueSection');
    expect(container.innerHTML).toContain('hubAdd_village');
    expect(container.innerHTML).toContain('hubAdd_gataNo');
    expect(container.innerHTML).toContain('hubAdd_clientName');
    expect(container.innerHTML).toContain('mini-court-btn');
    expect(document.getElementById('hubAdd_nextHearing')).toBeNull();
    expect(container.innerHTML).toContain('Co-Sharers');

    // 5. Misc Civil
    window.renderCaseHubAddForm('misc');
    expect(container.innerHTML).toContain('hubAdd_originalCase');
    expect(container.innerHTML).toContain('hubAdd_proceedingType');
    expect(container.innerHTML).toContain('hubAdd_clientName');
    expect(container.innerHTML).toContain('mini-court-btn');
    expect(document.getElementById('hubAdd_nextHearing')).toBeNull();
    expect(container.innerHTML).toContain('Injunction Grounds');

    // 6. Bail
    window.renderCaseHubAddForm('bail');
    expect(container.innerHTML).toContain('hubAdd_proceedingType');
    expect(container.innerHTML).toContain('hubAdd_policeStation');
    expect(container.innerHTML).toContain('hubAdd_clientName');
    expect(container.innerHTML).toContain('mini-court-btn');
    expect(document.getElementById('hubAdd_nextHearing')).toBeNull();
    expect(container.innerHTML).toContain('Bail Grounds');

    // 7. Cheque
    window.renderCaseHubAddForm('cheque');
    expect(container.innerHTML).toContain('hubAdd_complaintType');
    expect(container.innerHTML).toContain('hubAdd_sections');
    expect(container.innerHTML).toContain('hubAdd_clientName');
    expect(container.innerHTML).toContain('mini-court-btn');
    expect(document.getElementById('hubAdd_nextHearing')).toBeNull();
    expect(container.innerHTML).toContain('Cheque Details');
  });

  it('renders category-specific statutory fields when loading an existing case in Update form', () => {
    window.allCaseRecords.push({
      caseNo: 'REV-2026-888',
      caseType: 'revenue',
      applicant: 'Kishan Lal',
      oppositeParty: 'Gaon Sabha',
      revenueActSection: 'Sec 34 (Mutation / दाखिल खारिज)',
      villageMauja: 'Kalyanpur',
      gataKhataNo: '142/1',
      courtName: 'District Court, Room 1',
      caseStatus: 'Pending',
      nextHearing: '2026-08-10'
    });

    window.selectCaseForHub('REV-2026-888', 'update');
    const updateContainer = document.getElementById('caseHubUpdateFormContainer');
    expect(updateContainer.innerHTML).toContain('REV-2026-888');
    expect(updateContainer.innerHTML).toContain('hubUpdate_village');
    expect(updateContainer.innerHTML).toContain('Kalyanpur');
    expect(updateContainer.innerHTML).toContain('142/1');
    expect(updateContainer.innerHTML).toContain('Co-Sharers');
  });

  it('inserts preset remark chips into textarea without overwriting existing content', () => {
    window.renderCaseHubAddForm('criminal');
    const remarks = document.getElementById('hubAdd_remarks');
    expect(remarks).toBeTruthy();

    window.insertCaseHubRemarkChip('hubAdd_remarks', 'Co-Accused: Suresh');
    expect(remarks.value).toBe('Co-Accused: Suresh');

    window.insertCaseHubRemarkChip('hubAdd_remarks', 'Bail Surety: Ram Lal');
    expect(remarks.value).toBe('Co-Accused: Suresh; Bail Surety: Ram Lal');
  });

  it('renders mini-court-btn in court-input-wrapper in both Add and Update forms', () => {
    window.renderCaseHubAddForm('civil');
    const addCourtBtn = document.querySelector('#caseHubAddFormContainer .mini-court-btn');
    expect(addCourtBtn).toBeTruthy();
    expect(addCourtBtn.textContent.trim()).toBe('+');

    window.selectCaseForHub('CV-2026-001', 'update');
    const updateCourtBtn = document.querySelector('#caseHubUpdateFormContainer .mini-court-btn');
    expect(updateCourtBtn).toBeTruthy();
    expect(updateCourtBtn.textContent.trim()).toBe('+');
  });

  it('handleQuickAddCourt adds a court and selects it in the target select element', async () => {
    window.renderCaseHubAddForm('civil');
    const courtSelect = document.getElementById('hubAdd_court');
    expect(courtSelect).toBeTruthy();

    window.prompt = vi.fn().mockReturnValue('Special Commercial Court');
    await window.handleQuickAddCourt('hubAdd_court');

    expect(courtSelect.innerHTML).toContain('Special Commercial Court');
    expect(courtSelect.value).toBe('Special Commercial Court');
  });
});
