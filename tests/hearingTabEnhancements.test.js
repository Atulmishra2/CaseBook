import { describe, it, expect, beforeEach, vi } from 'vitest';
import '../admin.js';
import '../services/caseService.js';
import '../components/tabs/hearing/tab-hearing.js';

describe('Forward Hearing Tab - Enhanced Metadata & Safeguards Suite', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__casebook_tabs['hearing'];
    window.allCaseRecords = [
      {
        caseNo: 'CIV-2026-999',
        caseName: 'Rameshwar Lal vs Municipality Corp',
        caseType: 'civil',
        courtName: 'High Court / Commercial Bench',
        clientName: 'Rameshwar Lal',
        clientNumber: '9876543210',
        weRepresent: 'Plaintiff',
        hearingProcess: 'Framing of Issues',
        nextHearing: '2026-11-20'
      }
    ];
    window.allHearingRecords = [];
    window.supabaseClient = null;
    window.updateHearingInSupabase = vi.fn().mockResolvedValue(true);
    window.performPostCrudRefresh = vi.fn().mockResolvedValue(true);
    window.confirm = vi.fn().mockReturnValue(true);
    if (typeof window.initCustomHearingStageDropdown === 'function') {
      window.initCustomHearingStageDropdown();
    }
    if (typeof window.quickSelectHearingStage === 'function') {
      global.quickSelectHearingStage = window.quickSelectHearingStage;
    }
  });

  it('renders Case Title and Representation role visibly in caseDetailsCard', () => {
    window.renderHearingCaseInfo('CIV-2026-999');

    const card = document.getElementById('caseDetailsCard');
    expect(card).not.toBeNull();
    expect(card.classList.contains('hidden')).toBe(false);

    const titleEl = document.getElementById('caseDetailCardName');
    expect(titleEl).not.toBeNull();
    expect(titleEl.textContent).toBe('Rameshwar Lal vs Municipality Corp');
    expect(titleEl.style.display).not.toBe('none');

    const clientTag = document.getElementById('hearingCaseClientTag');
    expect(clientTag).not.toBeNull();
    expect(clientTag.textContent).toContain('Rameshwar Lal');
    expect(clientTag.textContent).toContain('Plaintiff');
    expect(clientTag.textContent).toContain('9876543210');

    const courtEl = document.getElementById('caseDetailCardCourt');
    expect(courtEl.textContent).toBe('High Court / Commercial Bench');
  });

  it('has quick stage chips for 1-tap selection including WS / Reply and Notice', () => {
    const pills = document.getElementById('hearingQuickStagePills');
    expect(pills).not.toBeNull();

    const chips = Array.from(pills.querySelectorAll('.quick-stage-chip')).map(el => el.textContent.trim());
    expect(chips).toContain('WS / Reply');
    expect(chips).toContain('Evidence');
    expect(chips).toContain('Arguments');
    expect(chips).toContain('Notice');
    expect(chips).toContain('Bail');

    // Click WS / Reply chip or call quickSelectHearingStage
    expect(typeof window.quickSelectHearingStage).toBe('function');
    window.quickSelectHearingStage('Written Statement (WS)');

    expect(document.getElementById('hearingProcess').value).toBe('Written Statement (WS)');
    expect(document.getElementById('hearingStageSelectedLabel').textContent).toContain('Written Statement');
  });

  it('triggers confirmation prompts when scheduling for past date or Sunday', async () => {
    document.getElementById('hearingCaseNo').value = 'CIV-2026-999';
    document.getElementById('hearingProcess').value = 'Arguments';

    // 1. Past date
    document.getElementById('hearingDate').value = '2020-01-01';
    window.confirm = vi.fn().mockReturnValue(false); // User rejects past date

    await window.handleUpdateHearingSubmit(new Event('submit'));
    expect(window.confirm).toHaveBeenCalled();
    expect(window.updateHearingInSupabase).not.toHaveBeenCalled();

    // 2. Sunday date (e.g. 2026-11-08 is a Sunday)
    document.getElementById('hearingDate').value = '2026-11-08';
    window.confirm = vi.fn().mockReturnValue(false); // User rejects Sunday date

    await window.handleUpdateHearingSubmit(new Event('submit'));
    expect(window.confirm).toHaveBeenCalled();
    expect(window.updateHearingInSupabase).not.toHaveBeenCalled();

    // 3. Valid future working day (e.g. 2026-11-10 is a Tuesday) with confirmation allowed
    document.getElementById('hearingDate').value = '2026-11-10';
    window.confirm = vi.fn().mockReturnValue(true);

    await window.handleUpdateHearingSubmit(new Event('submit'));
    expect(window.updateHearingInSupabase).toHaveBeenCalledWith('CIV-2026-999', '2026-11-10', 'Arguments', expect.any(String));
  });
});
