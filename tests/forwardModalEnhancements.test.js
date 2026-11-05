import { beforeEach, describe, expect, it } from 'vitest';
import '../utils/dateUtils.js';
import '../components/modals/case-modals.js';

describe('Forward Date Modal - Modern Workflow Enhancements Suite', () => {
  const sampleCases = [
    {
      caseNo: 'CIV/2026/001',
      plaintiff: 'Rajesh Sharma',
      defendant: 'Suresh Verma',
      clientName: 'Rajesh Sharma',
      caseType: 'civil',
      courtName: 'Civil Judge Senior Division',
      filingDate: '2026-01-10',
      nextHearing: '2026-11-15',
      hearingProcess: 'Evidence'
    },
    {
      caseNo: 'CR/2026/009',
      criminalCaseNumber: 'CR/2026/009',
      accusedName: 'Ramesh Kumar',
      clientName: 'Ramesh Kumar',
      caseType: 'criminal',
      courtName: 'CJM Court',
      filingDate: '2026-02-14',
      nextHearing: '',
      hearingProcess: 'Framing of Issues'
    }
  ];

  beforeEach(() => {
    window.ensureCaseModalsMounted();
    window.allCaseRecords = sampleCases;
    window.allHearingRecords = [
      { caseNo: 'CIV/2026/001', hearing_date: '2026-12-05', process: 'Evidence' },
      { caseNo: 'CIV/2026/001', hearing_date: '2026-12-05', process: 'Evidence' },
      { caseNo: 'CIV/2026/001', hearing_date: '2026-12-05', process: 'Evidence' },
      { caseNo: 'CIV/2026/001', hearing_date: '2026-12-05', process: 'Evidence' }
    ];
    window.openForwardDateModal();
  });

  it('populates Client Name and We Represent party role in Case Details Card', () => {
    window.selectForwardCase('CIV/2026/001');

    const clientNameEl = document.getElementById('fdCdcClientName');
    const roleEl = document.getElementById('fdCdcClientRole');

    expect(clientNameEl.textContent).toBe('Rajesh Sharma');
    expect(roleEl.textContent).toContain('Plaintiff / Petitioner');
  });

  it('suggests next logical court stage based on previous stage', () => {
    window.selectForwardCase('CIV/2026/001'); // Prev stage: Evidence
    const recText = document.getElementById('fdStageRecText');
    const recWrap = document.getElementById('fdStageRecWrap');

    expect(recWrap.style.display).toBe('inline-flex');
    expect(recText.textContent).toBe('Cross Examination');

    // Click suggested pill
    window.applyForwardModalRecStage();
    const stageSelect = document.getElementById('fdStageSelect');
    expect(stageSelect.value).toBe('Cross Examination');
  });

  it('1-tap quick stage chips update selection immediately', () => {
    window.selectForwardCase('CIV/2026/001');
    window.quickSelectForwardStage('Arguments');

    const stageSelect = document.getElementById('fdStageSelect');
    expect(stageSelect.value).toBe('Arguments');

    const activePill = document.querySelector('#fdQuickStagePills .fd-stage-pill.active');
    expect(activePill).not.toBeNull();
    expect(activePill.textContent).toBe('Arguments');
  });

  it('1-tap order snippets insert and append text cleanly into notes', () => {
    window.selectForwardCase('CIV/2026/001');
    const noteEl = document.getElementById('fdProceedingsNote');

    window.appendForwardSnippet('WS / Counter affidavit filed. Listed for rejoinder.');
    expect(noteEl.value).toBe('WS / Counter affidavit filed. Listed for rejoinder.');

    window.appendForwardSnippet('Adjourned on request of counsel.');
    expect(noteEl.value).toContain('WS / Counter affidavit filed. Listed for rejoinder. Adjourned on request of counsel.');
  });

  it('detects Sunday and renders Sunday warning alert', () => {
    window.selectForwardCase('CIV/2026/001');
    const sundayAlert = document.getElementById('fdSundayAlert');

    // Nov 8, 2026 is a Sunday (2026-11-08)
    window.calSelect(8, 10, 2026);
    expect(sundayAlert.style.display).toBe('flex');

    // Nov 9, 2026 is a Monday
    window.calSelect(9, 10, 2026);
    expect(sundayAlert.style.display).toBe('none');
  });

  it('renders workload dots on dates with scheduled hearings', () => {
    window.calState.m = 11; // December 2026
    window.calState.y = 2026;
    window.renderForwardCalendar();

    // Dec 5 has 4 hearings from mock allHearingRecords -> load-medium
    const dec5Btn = document.querySelector('#fdCalDays button[title*="5 • 4 hearing(s) scheduled"]');
    expect(dec5Btn).not.toBeNull();
    expect(dec5Btn.classList.contains('has-hearings')).toBe(true);

    const loadIndicator = dec5Btn.querySelector('.cal-load-indicator.load-medium');
    expect(loadIndicator).not.toBeNull();
  });

  it('submits hearing and displays interactive Success Card without auto-closing', async () => {
    window.selectForwardCase('CIV/2026/001');
    window.calSelect(25, 10, 2026); // Nov 25, 2026 (Wednesday)
    window.quickSelectForwardStage('Arguments');

    let updatedArgs = null;
    window.updateHearingInSupabase = async (num, date, stage, notes) => {
      updatedArgs = { num, date, stage, notes };
    };

    await window.submitForwardDateModal();

    expect(updatedArgs).not.toBeNull();
    expect(updatedArgs.num).toBe('CIV/2026/001');
    expect(updatedArgs.date).toBe('2026-11-25');
    expect(updatedArgs.stage).toBe('Arguments');

    // Verify Success Card is displayed and modal is NOT closed
    const successCard = document.getElementById('fdSuccessCard');
    const modal = document.getElementById('fdModal');
    expect(successCard.style.display).toBe('block');
    expect(modal.classList.contains('open')).toBe(true);
  });

  it('supports Forward Another Case flow to quickly schedule diary', async () => {
    window.selectForwardCase('CIV/2026/001');
    window.calSelect(25, 10, 2026);
    window.quickSelectForwardStage('Evidence');
    await window.submitForwardDateModal();

    // Click Forward Another Case
    window.forwardAnotherCaseInModal();

    const successCard = document.getElementById('fdSuccessCard');
    expect(successCard.style.display).toBe('none');
    expect(window.fdState.selectedCase).toBeNull();
    expect(window.fdState.nextDate).toBeNull();
    expect(document.getElementById('fdComboLabel').textContent).toBe('Select a case...');
  });

  it('handles case disposal toggle in modal', () => {
    window.selectForwardCase('CIV/2026/001');
    const toggle = document.getElementById('fdDisposedToggle');
    toggle.checked = true;
    window.toggleForwardModalDisposal(true);

    const submitBtnText = document.getElementById('fdSubmitBtnText');
    const stageSelect = document.getElementById('fdStageSelect');
    const noteEl = document.getElementById('fdProceedingsNote');

    expect(submitBtnText.textContent).toBe('Confirm & Dispose Case');
    expect(stageSelect.value).toBe('Final Order');
    expect(noteEl.value).toContain('Case disposed / decided on merits.');
  });
});
