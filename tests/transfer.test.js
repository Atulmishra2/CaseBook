/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Transfer Module Tests (components/tabs/transfer/transfer.js)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    window.allCaseRecords = [];
    window.allCaseTransfers = [];
    window.courts = ['District Court, Room 1', 'Commercial Court, Room 4', 'Family Court, Room 2'];
    window.escapeHtml = (str) => String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    window.safeUrl = (url) => url || '';
    window.formatDateDMY = (dateStr) => dateStr || '—';

    // Load transfer.js
    const transferJsPath = path.resolve(__dirname, '../components/tabs/transfer/transfer.js');
    const transferJsCode = fs.readFileSync(transferJsPath, 'utf8');
    eval(transferJsCode);

    // Mount tab HTML into document
    document.body.innerHTML = window.__casebook_tabs['transfer'];
  });

  it('correctly searches and loads single case for transfer', () => {
    window.allCaseRecords = [
      {
        caseNo: 'CV-2026-101',
        caseType: 'civil',
        plaintiff: 'Sunil Kumar',
        defendant: 'State of Delhi',
        courtName: 'District Court, Room 1',
        clientName: 'Sunil Kumar',
        nextHearing: '2026-05-15',
        caseStatus: 'Pending'
      }
    ];

    const searchInput = document.getElementById('transferSearchInput');
    const previewCard = document.getElementById('transferSelectedCaseCard');
    const transferForm = document.getElementById('transferCaseForm');

    searchInput.value = 'CV-2026-101';
    window.loadCaseForTransfer('CV-2026-101');

    expect(previewCard.style.display).toBe('block');
    expect(transferForm.style.display).toBe('block');
    expect(document.getElementById('transferCaseNoDisplay').textContent).toBe('CV-2026-101');
    expect(document.getElementById('transferCurrentCourtDisplay').textContent).toBe('District Court, Room 1');
    expect(document.getElementById('transferClientDisplay').textContent).toBe('Sunil Kumar');
    expect(document.getElementById('transferHiddenFromCourt').value).toBe('District Court, Room 1');
  });

  it('loads civil case titles properly in bulk transfer without displaying "Complainant vs Accused"', () => {
    window.allCaseRecords = [
      {
        caseNo: 'CV-2026-202',
        caseType: 'civil',
        plaintiff: 'Ramesh Sharma',
        defendant: 'Suresh Verma',
        courtName: 'District Court, Room 1',
        caseStage: 'Evidence',
        nextHearing: '2026-06-10',
        caseStatus: 'Pending'
      },
      {
        caseNo: 'CR-2026-303',
        caseType: 'criminal',
        victimName: 'State (Anita)',
        accusedName: 'Vikas',
        criminalCourtName: 'District Court, Room 1',
        caseStage: 'Arguments',
        nextHearing: '2026-06-12',
        caseStatus: 'Pending'
      }
    ];

    const courtSelect = document.getElementById('bulkTransferFromCourt');
    courtSelect.innerHTML = `
      <option value="">Select</option>
      <option value="District Court, Room 1" selected>District Court, Room 1</option>
    `;

    window.onBulkOriginCourtChange();

    const tbody = document.getElementById('bulkCasesTableBody');
    const textContent = tbody.textContent;

    // Must NOT say Complainant vs Accused for civil case!
    expect(textContent).not.toContain('Complainant vs Accused');
    expect(textContent).toContain('Ramesh Sharma vs Suresh Verma');
    expect(textContent).toContain('State (Anita) vs Vikas');
  });

  it('filters bulk cases by plaintiff name correctly', () => {
    window.allCaseRecords = [
      {
        caseNo: 'CV-1',
        caseType: 'civil',
        plaintiff: 'Arun Gupta',
        defendant: 'Kapil Dev',
        courtName: 'District Court, Room 1',
        caseStatus: 'Pending'
      },
      {
        caseNo: 'CV-2',
        caseType: 'civil',
        plaintiff: 'Mahesh Sharma',
        defendant: 'Deepak Rao',
        courtName: 'District Court, Room 1',
        caseStatus: 'Pending'
      }
    ];

    const courtSelect = document.getElementById('bulkTransferFromCourt');
    courtSelect.innerHTML = `<option value="District Court, Room 1" selected>District Court, Room 1</option>`;
    window.onBulkOriginCourtChange();

    const filterInput = document.getElementById('bulkCaseFilterInput');
    filterInput.value = 'Mahesh';
    window.filterBulkCasesTable();

    const tbody = document.getElementById('bulkCasesTableBody');
    expect(tbody.textContent).toContain('Mahesh Sharma vs Deepak Rao');
    expect(tbody.textContent).not.toContain('Arun Gupta');
  });

  it('handles bulk selection toggle and count correctly', () => {
    window.allCaseRecords = [
      { caseNo: 'CV-1', caseType: 'civil', plaintiff: 'P1', defendant: 'D1', courtName: 'Court A', caseStatus: 'Pending' },
      { caseNo: 'CV-2', caseType: 'civil', plaintiff: 'P2', defendant: 'D2', courtName: 'Court A', caseStatus: 'Pending' }
    ];

    const courtSelect = document.getElementById('bulkTransferFromCourt');
    courtSelect.innerHTML = `<option value="Court A" selected>Court A</option>`;
    window.onBulkOriginCourtChange();

    const selectAllCb = document.getElementById('bulkSelectAllCheckbox');
    selectAllCb.checked = true;
    window.toggleBulkSelectAll(selectAllCb);

    expect(document.getElementById('bulkSelectedCount').textContent).toBe('2');

    window.clearBulkCaseSelection();
    expect(document.getElementById('bulkSelectedCount').textContent).toBe('0');
    expect(selectAllCb.checked).toBe(false);
  });

  it('renders recent transfers table and dossier transfer history', () => {
    window.allCaseTransfers = [
      {
        id: 't-1',
        case_number: 'CV-2026-101',
        from_court: 'District Court, Room 1',
        to_court: 'Commercial Court, Room 4',
        transfer_date: '2026-04-01',
        order_number: 'ORD-554',
        transferred_by: 'Principal District Judge',
        transfer_reason: 'Jurisdictional Realignment'
      }
    ];

    window.renderRecentTransfersTable();
    const recentTbody = document.getElementById('transfersRegistryTableBody');
    expect(recentTbody.innerHTML).toContain('CV-2026-101');
    expect(recentTbody.innerHTML).toContain('District Court, Room 1');
    expect(recentTbody.innerHTML).toContain('Commercial Court, Room 4');
    expect(recentTbody.innerHTML).toContain('ORD-554');

    // Test detail inline transfer table
    const detailTbody = document.createElement('tbody');
    detailTbody.id = 'detailInlineTransferTableBody';
    document.body.appendChild(detailTbody);

    const badge = document.createElement('span');
    badge.id = 'detailTransferCountBadge';
    document.body.appendChild(badge);

    window.renderCaseTransferHistory('CV-2026-101', { courtName: 'Commercial Court, Room 4' });
    expect(badge.textContent).toBe('1 Transfer');
    expect(detailTbody.innerHTML).toContain('Jurisdictional Realignment');
  });

  it('safely invokes openCaseHistoryModalByNo via showCaseDetails fallback without ReferenceError', () => {
    let openedCaseNo = null;
    window.openCaseHistoryModalByNo = vi.fn((caseNo) => {
      openedCaseNo = caseNo;
    });

    window.showCaseDetails('CV-2026-999');
    expect(window.openCaseHistoryModalByNo).toHaveBeenCalledWith('CV-2026-999');
    expect(openedCaseNo).toBe('CV-2026-999');
  });
});
