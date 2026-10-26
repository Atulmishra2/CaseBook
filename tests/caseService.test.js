import { describe, it, expect, beforeEach } from 'vitest';
import '../services/caseService.js';

describe('services/caseService.js - Case Disposed & Status logic', () => {
  it('should identify disposed status keywords correctly', () => {
    expect(window.isCaseStatusDisposed).toBeDefined();

    // Positive cases
    expect(window.isCaseStatusDisposed('Disposed')).toBe(true);
    expect(window.isCaseStatusDisposed('Case Decided')).toBe(true);
    expect(window.isCaseStatusDisposed('final order / फैसला')).toBe(true);
    expect(window.isCaseStatusDisposed('निस्तारित वाद')).toBe(true);
    expect(window.isCaseStatusDisposed('Acquitted on merit')).toBe(true);
    expect(window.isCaseStatusDisposed('Convicted')).toBe(true);
    expect(window.isCaseStatusDisposed('Dismissed for default')).toBe(true);
    expect(window.isCaseStatusDisposed('Decreed')).toBe(true);
    expect(window.isCaseStatusDisposed('Settled between parties')).toBe(true);
    expect(window.isCaseStatusDisposed('Compromise filed')).toBe(true);

    // Negative cases
    expect(window.isCaseStatusDisposed('Pending')).toBe(false);
    expect(window.isCaseStatusDisposed('Evidence')).toBe(false);
    expect(window.isCaseStatusDisposed('Arguments')).toBe(false);
    expect(window.isCaseStatusDisposed('')).toBe(false);
    expect(window.isCaseStatusDisposed(null)).toBe(false);
    expect(window.isCaseStatusDisposed(undefined)).toBe(false);
  });

  it('should determine isCaseDisposed correctly for case objects', () => {
    expect(window.isCaseDisposed).toBeDefined();

    // Disposed via status string
    expect(window.isCaseDisposed({ caseStatus: 'Disposed' })).toBe(true);
    expect(window.isCaseDisposed({ status: 'Decided' })).toBe(true);
    expect(window.isCaseDisposed({ case_status: 'Dismissed' })).toBe(true);

    // Disposed via disposal comment or date
    expect(window.isCaseDisposed({ status: 'Pending', disposalComment: 'Decided on 2026-05-10' })).toBe(true);
    expect(window.isCaseDisposed({ status: 'Pending', disposalDate: '2026-05-10' })).toBe(true);

    // Active case
    expect(window.isCaseDisposed({ status: 'Evidence', nextHearing: '2026-11-01' })).toBe(false);
    expect(window.isCaseDisposed(null)).toBe(false);
  });

  it('should identify undated cases correctly', () => {
    expect(window.isCaseUndated).toBeDefined();

    // If disposed, it is never undated
    expect(window.isCaseUndated({ caseStatus: 'Disposed', nextHearing: '' })).toBe(false);

    // Active cases with missing/placeholder next hearing
    expect(window.isCaseUndated({ status: 'Pending', nextHearing: '' })).toBe(true);
    expect(window.isCaseUndated({ status: 'Pending', nextHearing: '—' })).toBe(true);
    expect(window.isCaseUndated({ status: 'Pending', nextHearing: '-' })).toBe(true);
    expect(window.isCaseUndated({ status: 'Pending', nextHearing: 'null' })).toBe(true);
    expect(window.isCaseUndated({ status: 'Pending', nextHearing: 'undated' })).toBe(true);
    expect(window.isCaseUndated({ status: 'Pending', nextHearing: null })).toBe(true);

    // Active case with valid hearing date
    expect(window.isCaseUndated({ status: 'Pending', nextHearing: '2026-11-15' })).toBe(false);
  });

  it('should identify cases waiting for initial filing / awaiting first hearing', () => {
    expect(window.isCaseWaitingForInitialFiling).toBeDefined();

    // 1. Freshly filed case awaiting 1st hearing date (has filingDate, no next hearing, no previous hearing)
    expect(window.isCaseWaitingForInitialFiling({
      caseNo: 'CIV-2026-101',
      filingDate: '2026-02-15',
      nextHearing: '',
      caseStatus: 'Pending'
    })).toBe(true);

    expect(window.isCaseWaitingForInitialFiling({
      caseNo: 'REV-2026-202',
      filing_date: '2026-03-01',
      nextHearing: '—',
      caseStatus: 'Active'
    })).toBe(true);

    // 2. Explicit status keyword matches
    expect(window.isCaseWaitingForInitialFiling({
      caseStatus: 'Waiting for Initial Filing'
    })).toBe(true);

    expect(window.isCaseWaitingForInitialFiling({
      status: 'Awaiting First Hearing'
    })).toBe(true);

    // 3. Negative: Disposed cases are never waiting for initial filing
    expect(window.isCaseWaitingForInitialFiling({
      filingDate: '2026-01-10',
      caseStatus: 'Disposed',
      nextHearing: ''
    })).toBe(false);

    expect(window.isCaseWaitingForInitialFiling({
      filingDate: '2026-01-10',
      disposalComment: 'Decided on merit',
      nextHearing: ''
    })).toBe(false);

    // 4. Negative: Already has a scheduled next hearing date
    expect(window.isCaseWaitingForInitialFiling({
      filingDate: '2026-01-10',
      nextHearing: '2026-08-20',
      caseStatus: 'Pending'
    })).toBe(false);

    // 5. Negative: Has had a previous hearing (ongoing case)
    expect(window.isCaseWaitingForInitialFiling({
      filingDate: '2025-05-10',
      previousHearing: '2026-01-15',
      nextHearing: 'undated',
      caseStatus: 'Pending'
    })).toBe(false);

    // 6. Negative: Has hearing records in allHearingRecords
    window.allHearingRecords = [
      { case_number: 'HEAR-999', hearing_date: '2026-02-01' }
    ];
    expect(window.isCaseWaitingForInitialFiling({
      caseNo: 'HEAR-999',
      filingDate: '2026-01-10',
      nextHearing: '',
      caseStatus: 'Pending'
    })).toBe(false);

    // 7. Negative: No filing date and no explicit status
    expect(window.isCaseWaitingForInitialFiling({
      caseNo: 'UNFILED-001',
      nextHearing: '',
      caseStatus: 'Pending'
    })).toBe(false);

    expect(window.isCaseWaitingForInitialFiling(null)).toBe(false);
  });
});
