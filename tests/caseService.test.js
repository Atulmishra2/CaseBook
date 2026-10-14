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
});
