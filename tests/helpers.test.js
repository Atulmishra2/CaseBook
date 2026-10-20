/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Court Helpers Module Tests (components/tabs/helpers/tab-helpers.js)', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = '';
    window.courts = ['District Court, Room 1', 'Family Court, Room 2'];
    window.escapeHtml = (str) => String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    window.showToastNotification = vi.fn();

    // Load helpers.js
    const helpersJsPath = path.resolve(__dirname, '../components/tabs/helpers/tab-helpers.js');
    const helpersJsCode = fs.readFileSync(helpersJsPath, 'utf8');
    eval(helpersJsCode);

    // Mount tab HTML into document
    document.body.innerHTML = window.__casebook_tabs['helpers'];
  });

  it('populates court dropdowns and renders empty state initially', () => {
    window.renderHelpersTable();

    const courtSelect = document.getElementById('helperCourtSelect');
    expect(courtSelect.innerHTML).toContain('District Court, Room 1');
    expect(courtSelect.innerHTML).toContain('Family Court, Room 2');

    const grid = document.getElementById('helpersCardsGrid');
    expect(grid.innerHTML).toContain('No court helpers or workers found');
  });

  it('saves new staff member and updates badges', async () => {
    window.populateHelperCourtDropdowns();
    document.getElementById('helperNameInput').value = 'Ramesh Chand';
    document.getElementById('helperCourtSelect').value = 'District Court, Room 1';
    document.getElementById('helperPositionInput').value = 'Ahlmad';
    document.getElementById('helperMobileInput').value = '9876543210';

    await window.handleSaveHelper();

    const grid = document.getElementById('helpersCardsGrid');
    expect(grid.innerHTML).toContain('Ramesh Chand');
    expect(grid.innerHTML).toContain('Ahlmad');
    expect(grid.innerHTML).toContain('District Court, Room 1');
    expect(grid.innerHTML).toContain('9876543210');

    const totalBadge = document.getElementById('helpersTotalCountBadge');
    expect(totalBadge.textContent).toContain('1 Helper Registered');
  });

  it('filters staff by search query and court filter', async () => {
    const list = [
      { id: 'h1', name: 'Ramesh Chand', court: 'District Court, Room 1', position: 'Ahlmad', mobile: '9876543210' },
      { id: 'h2', name: 'Sunita Devi', court: 'Family Court, Room 2', position: 'Reader', mobile: '9123456780' }
    ];
    localStorage.setItem('casebook_court_helpers', JSON.stringify(list));

    window.filterHelpersTable('Reader');
    const grid = document.getElementById('helpersCardsGrid');
    expect(grid.innerHTML).toContain('Sunita Devi');
    expect(grid.innerHTML).not.toContain('Ramesh Chand');

    // Filter by court
    document.getElementById('helperFilterCourtSelect').value = 'District Court, Room 1';
    window.filterHelpersTable('');
    expect(grid.innerHTML).toContain('Ramesh Chand');
    expect(grid.innerHTML).not.toContain('Sunita Devi');
  });

  it('edits existing staff member via modal', async () => {
    const list = [
      { id: 'h1', name: 'Ramesh Chand', court: 'District Court, Room 1', position: 'Ahlmad', mobile: '9876543210' }
    ];
    localStorage.setItem('casebook_court_helpers', JSON.stringify(list));

    window.openEditHelperModal('h1');
    const modal = document.getElementById('editHelperModal');
    expect(modal.classList.contains('hidden')).toBe(false);
    expect(document.getElementById('editHelperNameInput').value).toBe('Ramesh Chand');

    document.getElementById('editHelperPositionInput').value = 'Head Ahlmad';
    await window.confirmSaveEditedHelper();

    expect(modal.classList.contains('hidden')).toBe(true);
    const grid = document.getElementById('helpersCardsGrid');
    expect(grid.innerHTML).toContain('Head Ahlmad');
  });

  it('deletes staff member via modal', async () => {
    const list = [
      { id: 'h1', name: 'Ramesh Chand', court: 'District Court, Room 1', position: 'Ahlmad', mobile: '9876543210' }
    ];
    localStorage.setItem('casebook_court_helpers', JSON.stringify(list));

    window.openDeleteHelperModal('h1');
    const modal = document.getElementById('deleteHelperModal');
    expect(modal.classList.contains('hidden')).toBe(false);

    await window.executeDeleteHelperConfirm();

    expect(modal.classList.contains('hidden')).toBe(true);
    const grid = document.getElementById('helpersCardsGrid');
    expect(grid.innerHTML).toContain('No court helpers or workers found');
  });
});
