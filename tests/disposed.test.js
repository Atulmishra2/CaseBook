/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Disposed Tab Module Tests (components/tabs/disposed/tab-disposed.js)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    window.allCaseRecords = [];
    window.escapeHtml = (str) => String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    window.remarksToPlainText = (r) => String(r || '');
    window.renderCaseTableRemarks = (rem) => rem;

    // Load disposed.js
    const disposedJsPath = path.resolve(__dirname, '../components/tabs/disposed/tab-disposed.js');
    const disposedJsCode = fs.readFileSync(disposedJsPath, 'utf8');
    eval(disposedJsCode);

    // Mount tab HTML into document
    document.body.innerHTML = window.__casebook_tabs['disposed'];
    const badge = document.createElement('span');
    badge.id = 'disposedCount';
    document.body.appendChild(badge);
  });

  it('renders empty state when there are no disposed cases', () => {
    window.allCaseRecords = [
      {
        caseNo: 'CV-101',
        caseStatus: 'Pending',
        plaintiff: 'A',
        defendant: 'B'
      }
    ];

    window.renderDisposedCasesTable();

    const tbody = document.querySelector('#disposedCasesTable tbody');
    expect(tbody.innerHTML).toContain('No disposed cases recorded yet.');
    expect(document.getElementById('disposedCount').textContent).toBe('0');
  });

  it('renders disposed cases correctly with columns, badges and disposal comment', () => {
    window.allCaseRecords = [
      {
        caseNo: 'CV-101',
        caseType: 'civil',
        plaintiff: 'Ajay Sharma',
        defendant: 'Vijay Singh',
        clientName: 'Ajay Sharma',
        courtName: 'High Court',
        caseStatus: 'Disposed',
        remark: 'Decreed in favor of plaintiff',
        disposalComment: 'Full & final decree dated 12/03/2026'
      },
      {
        caseNo: 'CR-202',
        caseType: 'criminal',
        victimName: 'State',
        accusedName: 'Prakash',
        criminalClientName: 'Prakash',
        criminalCourtName: 'Sessions Court',
        caseStatus: 'Decided / Disposed',
        disposalComment: 'Acquitted due to lack of evidence'
      },
      {
        caseNo: 'CV-303',
        caseType: 'civil',
        plaintiff: 'Active Case',
        defendant: 'Party B',
        caseStatus: 'Pending'
      }
    ];

    window.initDisposedTab();

    const tbody = document.querySelector('#disposedCasesTable tbody');
    expect(document.getElementById('disposedCount').textContent).toBe('2');

    const content = tbody.innerHTML;
    expect(content).toContain('CV-101');
    expect(content).toContain('Ajay Sharma vs Vijay Singh');
    expect(content).toContain('High Court');
    expect(content).toContain('Full &amp; final decree dated 12/03/2026');

    expect(content).toContain('CR-202');
    expect(content).toContain('State vs Prakash');
    expect(content).toContain('Sessions Court');
    expect(content).toContain('Acquitted due to lack of evidence');

    // Must NOT contain pending case
    expect(content).not.toContain('CV-303');
  });

  it('supports Hindi disposal status strings like निस्तारित / फैसला', () => {
    window.isCaseDisposed = (c) => {
      const s = (c.caseStatus || '').toLowerCase();
      return s.includes('dispose') || s.includes('decide') || s.includes('निस्तारित') || s.includes('फैसला');
    };

    window.allCaseRecords = [
      {
        caseNo: 'REV-99',
        caseType: 'revenue',
        plaintiff: 'Ramesh',
        defendant: 'Suresh',
        caseStatus: 'निस्तारित'
      }
    ];

    window.renderDisposedCasesTable();
    expect(document.getElementById('disposedCount').textContent).toBe('1');
    expect(document.querySelector('#disposedCasesTable tbody').innerHTML).toContain('REV-99');
  });
});
