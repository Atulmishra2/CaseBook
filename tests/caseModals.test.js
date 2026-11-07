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

  it('routes case-card hearing actions to a locked selector with the current case selected', () => {
    for (const number of ['CS/200/2025', 'CR/80/2026']) {
      window.openUpdateHearingForCase(number);
      expect(window.fdState.selectedCase.caseNo || window.fdState.selectedCase.criminalCaseNumber).toBe(number);
      expect(document.getElementById('fdComboInputWrap').disabled).toBe(true);
      expect(document.getElementById('fdComboLabel').textContent).toContain(number);
      expect(document.getElementById('fdCdcCaseName').textContent).not.toBe('—');
      window.closeForwardDateModal();
    }
  });

  it('openCaseDetailsFullModal renders Shape 3 Dual-Block Split Tile badges with icon and text blocks', () => {
    window.openCaseDetailsFullModal('CS/200/2025');
    const typeBadge = document.getElementById('cdmHeaderTypeBadge');
    const statusBadge = document.getElementById('cdmHeaderStatusBadge');

    expect(typeBadge).not.toBeNull();
    expect(typeBadge.classList.contains('shape-split')).toBe(true);
    expect(typeBadge.querySelector('.shape-split-icon')).not.toBeNull();
    expect(typeBadge.querySelector('.shape-split-text')).not.toBeNull();
    expect(typeBadge.querySelector('.shape-split-text').textContent).toBe('Civil');

    expect(statusBadge).not.toBeNull();
    expect(statusBadge.classList.contains('shape-split')).toBe(true);
    expect(statusBadge.querySelector('.shape-split-icon')).not.toBeNull();
    expect(statusBadge.querySelector('.shape-split-text')).not.toBeNull();
    expect(statusBadge.querySelector('.shape-split-text').textContent).toBe('Pending');
  });

  it('correctly displays parties from case title in masthead face-off without wrongly defaulting to State of U.P.', () => {
    window.allCaseRecords.push({
      caseNo: 'CRI.MISC -02/2026',
      caseName: 'RANJEET KUMAR VS NAVEEN KUMAR & OTHERS',
      caseType: 'misc_criminal',
      clientName: 'Ranjeet Kumar',
      courtName: 'High Court / District Court',
      nextHearing: '2026-11-20'
    });

    window.openCaseDetailsFullModal('CRI.MISC -02/2026');

    const pRole = document.getElementById('cdmPetitionerRole').textContent;
    const pName = document.getElementById('cdmPetitionerName').textContent;
    const rRole = document.getElementById('cdmRespondentRole').textContent;
    const rName = document.getElementById('cdmRespondentName').textContent;
    const badge = document.getElementById('cdmAppearingBadge').textContent;

    expect(pName).toBe('RANJEET KUMAR');
    expect(pRole).toBe('APPLICANT');
    expect(rName).toBe('NAVEEN KUMAR & OTHERS');
    expect(rRole).toBe('OPPOSITE PARTY');
    expect(badge).toContain('Ranjeet Kumar');
    expect(pName).not.toContain('State of U.P.');
  });

  it('renders ONLY authentic case table fields and omits phantom/fake placeholder strings', () => {
    window.allCaseRecords.push({
      caseNo: 'CS/300/2026',
      caseName: 'Anil Gupta vs Sunita Gupta',
      caseType: 'civil',
      clientName: 'Anil Gupta',
      clientNumber: '9876543210',
      courtName: 'Civil Judge Senior Division',
      caseYear: '2026',
      filingDate: '2026-01-15',
      nextHearing: '2026-11-25',
      hearingProcess: 'Written Statement',
      remark: 'Title suit for declaration'
    });

    window.openCaseDetailsFullModal('CS/300/2026');

    const modalHtml = document.getElementById('caseDetailsFullModal').innerHTML;

    // Phantom / fake strings must NOT exist
    expect(modalHtml).not.toContain("Hon'ble Presiding Judge");
    expect(modalHtml).not.toContain('Main Court Complex');
    expect(modalHtml).not.toContain('District Registry');
    expect(modalHtml).not.toContain('Permanent Injunction & Costs');

    // Fake client fields must NOT exist in contact table
    const contactTable = document.getElementById('cdmClientContactBody').innerHTML;
    expect(contactTable).not.toContain('Alternate Phone');
    expect(contactTable).not.toContain('Email Address');
    expect(contactTable).not.toContain('Postal Address');
    expect(contactTable).not.toContain('Client Remarks');
    expect(contactTable).not.toContain('Client Role in Case');
    expect(contactTable).not.toContain('Representation Brief');

    // Real fields MUST exist
    expect(contactTable).toContain('Anil Gupta');
    expect(contactTable).toContain('9876543210');

    // Fee summary must NOT contain unbacked/fake agreed fee or balance due
    const feeSummary = document.getElementById('cdmFeeSummaryBody').innerHTML;
    expect(feeSummary).not.toContain('Agreed Professional Fee');
    expect(feeSummary).not.toContain('Outstanding Balance Due');
    expect(feeSummary).toContain('Total Fee Received');

    // Overview snapshot must contain real stored fields
    const snapshotHtml = document.getElementById('cdmOverviewSnapshotBody').innerHTML;
    expect(snapshotHtml).toContain('CS/300/2026');
    expect(snapshotHtml).toContain('Civil Judge Senior Division');
    expect(snapshotHtml).toContain('Title suit for declaration');
  });

  it('omits unbacked Disposal Date and Disposal Nature for disposed cases', () => {
    window.allCaseRecords.push({
      caseNo: 'CS/301/2026',
      caseName: 'Ramesh vs Suresh',
      caseType: 'civil',
      clientName: 'Ramesh',
      courtName: 'Civil Judge Junior Division',
      caseStatus: 'Disposed',
      disposalComment: 'Dismissed on merits'
    });

    window.openCaseDetailsFullModal('CS/301/2026');

    const courtDetails = document.getElementById('cdmCourtDetailsBody').innerHTML;
    expect(courtDetails).not.toContain('Disposal Date');
    expect(courtDetails).not.toContain('Disposal Nature');
    expect(courtDetails).toContain('Disposal Comment');
    expect(courtDetails).toContain('Dismissed on merits');
  });

  it('renders Court Transfer History and updates badge in Panel 1', () => {
    window.allCaseRecords.push({
      caseNo: 'CS/400/2026',
      caseName: 'Vikram vs Sunita',
      caseType: 'civil',
      courtName: 'Additional District Judge 3',
      nextHearing: '2026-12-01'
    });

    window.allCaseTransfers = [
      {
        case_number: 'CS/400/2026',
        from_court: 'Civil Judge Junior Division',
        to_court: 'Additional District Judge 3',
        transfer_date: '2026-10-15',
        order_number: 'TR-102/2026',
        order_date: '2026-10-10',
        transferred_by: 'District Judge',
        transfer_reason: 'Transferred on administrative grounds for expeditious trial',
        remarks: 'Transferred with case record'
      }
    ];

    window.openCaseDetailsFullModal('CS/400/2026');

    const badge = document.getElementById('cdmTransferCountBadge').textContent;
    expect(badge).toContain('1 Transfer');

    const transferTable = document.getElementById('cdmTransferTableBody').innerHTML;
    expect(transferTable).toContain('Civil Judge Junior Division');
    expect(transferTable).toContain('Additional District Judge 3');
    expect(transferTable).toContain('TR-102/2026');
    expect(transferTable).toContain('administrative grounds');
  });

  it('renders Linked Case Tasks History and tab badge count in Panel 5', () => {
    window.allCaseRecords.push({
      caseNo: 'CS/500/2026',
      caseName: 'Rahul vs Priya',
      caseType: 'family',
      courtName: 'Family Court Judge 1',
      nextHearing: '2026-11-28'
    });

    window.caseTasks = [
      {
        caseNo: 'CS/500/2026',
        taskTitle: 'Draft Written Statement',
        deadlineDate: '2026-11-20',
        priority: 'high',
        status: 'pending',
        copyNumber: 'CC-884/2026',
        steps: [
          { id: 1, name: 'Collect Documents', completed: true },
          { id: 2, name: 'Draft Arguments', completed: false }
        ]
      },
      {
        caseNo: 'CS/500/2026',
        taskTitle: 'Obtain Certified Copy of Order',
        deadlineDate: '2026-11-15',
        priority: 'medium',
        status: 'completed'
      }
    ];

    window.openCaseDetailsFullModal('CS/500/2026');

    const taskBadge = document.getElementById('cdmTasksBadgeCount').textContent;
    expect(taskBadge).toBe('2');

    const tasksHtml = document.getElementById('cdmTasksBody').innerHTML;
    expect(tasksHtml).toContain('Draft Written Statement');
    expect(tasksHtml).toContain('Obtain Certified Copy of Order');
    expect(tasksHtml).toContain('CC-884/2026');
    expect(tasksHtml).toContain('Workflow Steps: 1/2 completed');
    expect(tasksHtml).toContain('Done');
    expect(tasksHtml).toContain('Pending');
  });
});
