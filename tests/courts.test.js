/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Courts Module Tests (components/tabs/courts/tab-courts.js)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    window.courts = ['High Court of Delhi', 'District Court, Saket', 'Patiala House Court'];
    window.allCaseRecords = [
      { caseNo: 'CV-101', courtName: 'District Court, Saket' },
      { caseNo: 'CR-202', criminalCourtName: 'District Court, Saket' },
      { caseNo: 'CV-303', courtName: 'High Court of Delhi' }
    ];
    window.escapeHtml = (str) => String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    window.getDeletedCourtsSet = () => new Set();

    // Load courts.js
    const courtsJsPath = path.resolve(__dirname, '../components/tabs/courts/tab-courts.js');
    const courtsJsCode = fs.readFileSync(courtsJsPath, 'utf8');
    eval(courtsJsCode);

    // Mount tab HTML into document
    document.body.innerHTML = window.__casebook_tabs['courts'];
  });

  it('renders courts list with assigned cases count', () => {
    window.renderCourtsTable();

    const grid = document.getElementById('courtsCardsGrid');
    expect(grid.innerHTML).toContain('District Court, Saket');
    expect(grid.innerHTML).toContain('2 Cases Assigned');
    expect(grid.innerHTML).toContain('High Court of Delhi');
    expect(grid.innerHTML).toContain('1 Case Assigned');

    const countBadge = document.getElementById('courtsTotalCountBadge');
    expect(countBadge.textContent).toBe('3 Courts Configured');
  });

  it('filters courts correctly based on search query', () => {
    window.filterCourtsTable('Saket');

    const grid = document.getElementById('courtsCardsGrid');
    expect(grid.innerHTML).toContain('District Court, Saket');
    expect(grid.innerHTML).not.toContain('Patiala House Court');

    const countBadge = document.getElementById('courtsTotalCountBadge');
    expect(countBadge.textContent).toBe('1 of 3 Courts');
  });

  it('opens and closes edit court modal', () => {
    window.openEditCourtModal('District Court, Saket', 2);

    const modal = document.getElementById('editCourtModal');
    expect(modal.classList.contains('hidden')).toBe(false);
    expect(document.getElementById('editCourtOriginalName').value).toBe('District Court, Saket');
    expect(document.getElementById('editCourtNameInput').value).toBe('District Court, Saket');

    window.closeEditCourtModal();
    expect(modal.classList.contains('hidden')).toBe(true);
  });

  it('confirms and cascades court rename', async () => {
    window.cascadeUpdateCourtName = vi.fn().mockResolvedValue(2);
    window.showToastNotification = vi.fn();

    window.openEditCourtModal('District Court, Saket', 2);
    document.getElementById('editCourtNameInput').value = 'District Court, South Saket';

    await window.confirmSaveEditedCourt();

    expect(window.cascadeUpdateCourtName).toHaveBeenCalledWith('District Court, Saket', 'District Court, South Saket');
    expect(window.showToastNotification).toHaveBeenCalled();
    expect(document.getElementById('editCourtModal').classList.contains('hidden')).toBe(true);
  });

  it('opens delete court modal and executes delete', async () => {
    window.deleteCourtFromSupabase = vi.fn().mockResolvedValue(true);
    window.showToastNotification = vi.fn();

    window.openDeleteCourtModal('Patiala House Court', 0);
    const modal = document.getElementById('deleteCourtModal');
    expect(modal.classList.contains('hidden')).toBe(false);
    expect(document.getElementById('deleteCourtTargetName').value).toBe('Patiala House Court');

    await window.executeDeleteCourtConfirm();

    expect(window.deleteCourtFromSupabase).toHaveBeenCalledWith('Patiala House Court');
    expect(modal.classList.contains('hidden')).toBe(true);
  });
});
