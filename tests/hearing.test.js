import { describe, it, expect, beforeEach, vi } from 'vitest';
import '../admin.js';
import '../services/caseService.js';
import '../components/tabs/hearing/tab-hearing.js';

describe('Forward Hearing Tab - UI Alignment & Direct Case Disposal Suite', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__casebook_tabs['hearing'];
    window.allCaseRecords = [
      {
        caseNo: 'CIV-2026-001',
        caseName: 'State of U.P. vs Rajesh',
        caseType: 'civil',
        courtName: 'Addl. Civil Judge Senior Division/ACJM',
        caseStatus: 'Pending',
        nextHearing: '2026-10-18',
        hearingProcess: 'Evidence'
      }
    ];
    window.allHearingRecords = [];
    window.supabaseClient = null;
    window.fetchAllDataFromSupabase = vi.fn().mockResolvedValue(true);
    window.updateSupabaseStatusIndicator = vi.fn();
    window.performPostCrudRefresh = vi.fn().mockResolvedValue(true);
    window.updateHearingInSupabase = vi.fn().mockResolvedValue(true);
    window.updateCaseInSupabase = vi.fn().mockResolvedValue(true);
    window.alert = vi.fn();
    document.dispatchEvent(new Event('DOMContentLoaded'));
  });

  it('renders Step 2, 3, 4 properly with exactly 6 preset buttons and 11 stage radios', () => {
    const stepNums = Array.from(document.querySelectorAll('.step-num')).map(el => el.textContent.trim());
    expect(stepNums).toContain('2');
    expect(stepNums).toContain('3');
    expect(stepNums).toContain('4');

    const presetBtns = document.querySelectorAll('.presets-grid .preset-btn');
    expect(presetBtns.length).toBe(6);

    const radioItems = document.querySelectorAll('input[name="hearingStageRadio"]');
    expect(radioItems.length).toBe(11);
  });

  it('toggleHearingDisposalMode switches UI between Forward Date and Disposal mode', () => {
    const toggle = document.getElementById('hearingIsDisposedToggle');
    const submitBtn = document.getElementById('hearingSubmitBtn');
    const dateInput = document.getElementById('hearingDate');
    const fields = document.getElementById('hearingDisposalFields');

    expect(toggle).toBeDefined();
    expect(submitBtn.textContent.trim()).toBe('Forward Date');
    expect(dateInput.hasAttribute('required')).toBe(true);

    // Turn disposal ON
    window.toggleHearingDisposalMode(true);
    expect(fields.style.display).toBe('block');
    expect(dateInput.hasAttribute('required')).toBe(false);
    expect(submitBtn.textContent).toContain('Dispose & Close Case');

    // Turn disposal OFF
    window.toggleHearingDisposalMode(false);
    expect(fields.style.display).toBe('none');
    expect(dateInput.hasAttribute('required')).toBe(true);
    expect(submitBtn.textContent.trim()).toBe('Forward Date');
  });

  it('handleUpdateHearingSubmit marks case as Disposed with no next date when disposal toggle is checked', async () => {
    const toggle = document.getElementById('hearingIsDisposedToggle');
    toggle.checked = true;
    window.toggleHearingDisposalMode(true);

    document.getElementById('hearingCaseNo').value = 'CIV-2026-001';
    document.getElementById('hearingDisposalStatusSelect').value = 'Decided';
    document.getElementById('hearingDisposalComment').value = 'Decided on merits by court order';

    const updateCaseSpy = vi.spyOn(window, 'updateCaseInSupabase');

    await window.handleUpdateHearingSubmit(new Event('submit'));

    const updatedCase = window.allCaseRecords.find(c => c.caseNo === 'CIV-2026-001');
    expect(updatedCase).toBeDefined();
    expect(updatedCase.caseStatus).toBe('Decided');
    expect(updatedCase.disposalComment).toBe('Decided on merits by court order');
    expect(updatedCase.nextHearing).toBe(null);

    expect(updateCaseSpy).toHaveBeenCalled();
    expect(window.performPostCrudRefresh).toHaveBeenCalledWith({ caseNumber: 'CIV-2026-001' });
    expect(window.alert).toHaveBeenCalled();
  });
});
