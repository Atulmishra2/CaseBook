import { describe, it, expect, beforeEach } from 'vitest';
import '../utils/dateUtils.js';
import '../admin.js';
import '../components/modals/case-modals.js';

describe('components/modals/case-modals.js - DOM Mounting & Modal Structure', () => {
  it('ensureCaseModalsMounted should inject HTML and return modal element', () => {
    expect(window.ensureCaseModalsMounted).toBeDefined();
    const modalEl = window.ensureCaseModalsMounted();
    expect(modalEl).not.toBeNull();
    expect(modalEl.id).toBe('caseDetailsFullModal');

    // Confirm Forward Date modal also exists in container
    const fdModal = document.getElementById('fdModal');
    expect(fdModal).not.toBeNull();
  });
});

describe('components/modals/case-modals.js - getCasePaisaTransactions', () => {
  beforeEach(() => {
    window.allPaisaTransactions = [
      { id: '1', case_no: 'CS/101/2025', amount: 5000, type: 'received', date: '2025-01-10' },
      { id: '2', case_no: 'CS/101/2025', amount: 1500, type: 'spent', date: '2025-02-15' },
      { id: '3', case_no: 'CR/55/2024', amount: 10000, type: 'received', date: '2024-11-20' },
    ];
  });

  it('filters transactions matching case number directly and sorts by date descending', () => {
    const txns = window.getCasePaisaTransactions('CS/101/2025');
    expect(txns).toHaveLength(2);
    expect(txns[0].id).toBe('2'); // 2025-02-15 is later than 2025-01-10
    expect(txns[1].id).toBe('1');
  });

  it('matches case number regardless of special characters or casing', () => {
    const txns = window.getCasePaisaTransactions('cs-101-2025');
    expect(txns).toHaveLength(2);
  });

  it('returns empty array when case number is empty or no match exists', () => {
    expect(window.getCasePaisaTransactions('')).toEqual([]);
    expect(window.getCasePaisaTransactions(null)).toEqual([]);
    expect(window.getCasePaisaTransactions('UNKNOWN/999/2099')).toEqual([]);
  });
});

describe('components/modals/case-modals.js - getCaseHearingHistory', () => {
  beforeEach(() => {
    window.allHearingRecords = [
      { id: 'h1', case_number: 'OS/50/2024', hearing_date: '2024-03-01', stage: 'Issues' },
      { id: 'h2', case_number: 'OS/50/2024', hearing_date: '2024-05-10', stage: 'Evidence' },
      { id: 'h3', case_number: 'OS/50/2024', hearing_date: '2024-01-15', stage: 'Summons' },
      { id: 'h4', case_number: 'OTHER/1/2024', hearing_date: '2024-02-01', stage: 'Hearing' },
    ];
  });

  it('filters hearing records for target case and sorts descending by date', () => {
    const history = window.getCaseHearingHistory('OS/50/2024');
    expect(history).toHaveLength(3);
    expect(history[0].hearing_date).toBe('2024-05-10');
    expect(history[1].hearing_date).toBe('2024-03-01');
    expect(history[2].hearing_date).toBe('2024-01-15');
  });

  it('handles alphanumeric normalized case numbers', () => {
    const history = window.getCaseHearingHistory('os 50 2024');
    expect(history).toHaveLength(3);
  });

  it('returns empty array if case number is falsy or records empty', () => {
    expect(window.getCaseHearingHistory('')).toEqual([]);
    expect(window.getCaseHearingHistory('NONEXISTENT/0/0000')).toEqual([]);
  });
});

describe('components/modals/case-modals.js - Date Picker & Presets Helpers', () => {
  it('fdFormatYMD should format Date instances to YYYY-MM-DD', () => {
    expect(window.fdFormatYMD).toBeDefined();
    const d = new Date(2026, 4, 15); // May 15, 2026
    expect(window.fdFormatYMD(d)).toBe('2026-05-15');
    expect(window.fdFormatYMD(null)).toBe('');
  });

  it('fdFormatDisplay should format date to readable day, DD Mon YYYY string', () => {
    expect(window.fdFormatDisplay).toBeDefined();
    const d = new Date(2026, 9, 14); // Oct 14, 2026 (Wednesday)
    const formatted = window.fdFormatDisplay(d);
    expect(formatted).toContain('Wednesday');
    expect(formatted).toContain('14');
    expect(formatted).toContain('Oct');
    expect(formatted).toContain('2026');
  });

  it('setForwardDatePreset should update fdState.nextDate with relative day offsets', () => {
    expect(window.setForwardDatePreset).toBeDefined();

    // 7 days preset
    window.setForwardDatePreset(7);
    const expected7 = new Date();
    expected7.setDate(expected7.getDate() + 7);
    const expected7Str = window.fdFormatYMD(expected7);
    expect(window.fdState.nextDate).toBe(expected7Str);

    // 14 days preset
    window.setForwardDatePreset(14);
    const expected14 = new Date();
    expected14.setDate(expected14.getDate() + 14);
    const expected14Str = window.fdFormatYMD(expected14);
    expect(window.fdState.nextDate).toBe(expected14Str);
  });
});

describe('components/modals/case-modals.js - renderSelectedCaseDetails & openCaseHistoryModalByNo', () => {
  beforeEach(() => {
    window.ensureCaseModalsMounted();
    window.allCaseRecords = [
      {
        caseNo: 'CS/200/2025',
        plaintiff: 'Ramesh Sharma',
        defendant: 'Suresh Verma',
        caseType: 'civil',
        courtName: 'Civil Judge Senior Division',
        nextHearing: '2026-11-20',
        hearingProcess: 'Evidence'
      },
      {
        criminalCaseNumber: 'CR/80/2026',
        victimName: 'State',
        accusedName: 'Vikas Dubey',
        caseType: 'criminal',
        courtName: 'Sessions Court',
        nextHearing: '2026-12-05',
        hearingProcess: 'Arguments'
      }
    ];
  });

  it('renderSelectedCaseDetails updates window.currentSelectedCase safely', () => {
    const caseObj = window.allCaseRecords[0];
    window.renderSelectedCaseDetails(caseObj);
    expect(window.currentSelectedCase).toBe(caseObj);
  });

  it('openCaseHistoryModalByNo finds case from window.allCaseRecords safely', () => {
    expect(window.openCaseHistoryModalByNo).toBeDefined();

    // Finding civil case
    window.openCaseHistoryModalByNo('CS/200/2025');
    const modal = document.getElementById('caseHistoryModal');
    expect(modal).not.toBeNull();
    expect(modal.classList.contains('hidden')).toBe(false);

    // Finding criminal case by criminalCaseNumber
    window.openCaseHistoryModalByNo('CR/80/2026');
    expect(modal.classList.contains('hidden')).toBe(false);
  });
});
