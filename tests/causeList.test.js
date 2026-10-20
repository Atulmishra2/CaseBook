import { describe, it, expect, beforeEach, vi } from 'vitest';
import '../utils/dateUtils.js';
import '../admin.js';
import '../components/tabs/causelist/causelist.js';

describe('components/tabs/causelist/causelist.js - Cause List Tab Initialization & Controls', () => {
  beforeEach(() => {
    // Mount Cause List container
    document.body.innerHTML = `
      <div id="causeListTab">
        ${window.__casebook_tabs["causelist"]}
      </div>
      <div id="causeListCardsContainer"></div>
      <table><tbody id="causeListTableBody"></tbody></table>
      <span id="causeListNavCount">0</span>
    `;

    window.courts = ['District & Sessions Court', 'Civil Judge Senior Division', 'High Court Lucknow'];
    window.allCaseRecords = [
      {
        caseNo: 'CS/10/2026',
        caseName: 'Gupta vs Sharma',
        caseType: 'civil',
        courtName: 'Civil Judge Senior Division',
        nextHearing: '2026-10-20',
        hearingProcess: 'Issues'
      },
      {
        criminalCaseNumber: 'CR/25/2026',
        victimName: 'State',
        accusedName: 'Raju',
        caseType: 'criminal',
        criminalCourtName: 'District & Sessions Court',
        nextHearing: '2026-10-20',
        hearingProcess: 'Evidence'
      },
      {
        caseNo: 'REV/05/2026',
        caseName: 'Mohan vs State',
        caseType: 'revenue',
        courtName: 'Tehsildar Lakhimpur',
        nextHearing: '2026-10-25',
        hearingProcess: 'Summons'
      }
    ];
  });

  it('initCauseListTab populates court dropdown and initializes date', () => {
    expect(window.initCauseListTab).toBeDefined();
    window.initCauseListTab();

    const dateInput = document.getElementById('causeListDateInput');
    expect(dateInput).not.toBeNull();
    expect(dateInput.value).toMatch(/^\d{4}-\d{2}-\d{2}$/);

    const courtSelect = document.getElementById('causeListCourtFilterSelect');
    expect(courtSelect).not.toBeNull();
    expect(courtSelect.options.length).toBeGreaterThan(1);
  });

  it('custom court dropdown stays synced with the hidden native select', () => {
    window.initCauseListTab();

    const options = document.querySelectorAll('#causeListCourtOptionsList .causelist-court-option');
    expect(options.length).toBe(4);

    window.selectCauseListCourt('Civil Judge Senior Division');

    expect(document.getElementById('causeListCourtFilterSelect').value).toBe('Civil Judge Senior Division');
    expect(document.getElementById('causeListCourtFilterLabel').textContent).toBe('Civil Judge Senior Division');
    expect(document.querySelector('#causeListCourtOptionsList .selected')?.dataset.value).toBe('Civil Judge Senior Division');
  });

  it('custom court dropdown filters visible options by search text', () => {
    window.initCauseListTab();
    window.filterCauseListCourtDropdown('high court');

    const options = [...document.querySelectorAll('#causeListCourtOptionsList .causelist-court-option')];
    expect(options).toHaveLength(1);
    expect(options[0].textContent).toContain('High Court Lucknow');
  });

  it('setCauseListDateOffset updates date input accurately with day offsets', () => {
    expect(window.setCauseListDateOffset).toBeDefined();

    // Today (0)
    window.setCauseListDateOffset(0);
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    expect(document.getElementById('causeListDateInput').value).toBe(todayStr);

    // Tomorrow (1)
    window.setCauseListDateOffset(1);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`;
    expect(document.getElementById('causeListDateInput').value).toBe(tomorrowStr);
  });
});

describe('components/tabs/causelist/causelist.js - renderCauseListTable Filtering & Stats', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="causeListCardsContainer"></div>
      <table><tbody id="causeListTableBody"></tbody></table>
      <span id="causeListTotalBadge"></span>
      <span id="causeListCivilBadge"></span>
      <span id="causeListCriminalBadge"></span>
      <span id="causeListRevenueBadge"></span>
      <span id="causeListNavCount"></span>
      <h4 id="causeListBannerDateText"></h4>
      <span id="causeListBannerDayName"></span>
    `;

    window.allCaseRecords = [
      {
        caseNo: 'CS/10/2026',
        caseName: 'Gupta vs Sharma',
        caseType: 'civil',
        courtName: 'Civil Judge Senior Division',
        nextHearing: '2026-10-20',
        hearingProcess: 'Issues'
      },
      {
        criminalCaseNumber: 'CR/25/2026',
        victimName: 'State',
        accusedName: 'Raju',
        caseType: 'criminal',
        criminalCourtName: 'District & Sessions Court',
        nextHearing: '2026-10-20',
        hearingProcess: 'Evidence'
      },
      {
        caseNo: 'REV/05/2026',
        caseName: 'Mohan vs State',
        caseType: 'revenue',
        courtName: 'Tehsildar Lakhimpur',
        nextHearing: '2026-10-25',
        hearingProcess: 'Summons'
      }
    ];
  });

  it('renders listed matters and accurate counters for specified date', () => {
    window.renderCauseListTable('2026-10-20', '');

    const totalBadge = document.getElementById('causeListTotalBadge');
    const civilBadge = document.getElementById('causeListCivilBadge');
    const criminalBadge = document.getElementById('causeListCriminalBadge');

    expect(totalBadge.textContent).toContain('2 Total Matters Listed');
    expect(civilBadge.textContent).toContain('1 Civil');
    expect(criminalBadge.textContent).toContain('1 Criminal');

    const container = document.getElementById('causeListCardsContainer');
    expect(container.innerHTML).toContain('CS/10/2026');
    expect(container.innerHTML).toContain('CR/25/2026');
  });

  it('filters causes by specific court filter', () => {
    window.renderCauseListTable('2026-10-20', 'Civil Judge Senior Division');

    const totalBadge = document.getElementById('causeListTotalBadge');
    expect(totalBadge.textContent).toContain('1 Total Matters Listed');

    const container = document.getElementById('causeListCardsContainer');
    expect(container.innerHTML).toContain('CS/10/2026');
    expect(container.innerHTML).not.toContain('CR/25/2026');
  });

  it('shows clean empty state when no cases are listed on that date', () => {
    window.renderCauseListTable('2029-01-01', '');

    const totalBadge = document.getElementById('causeListTotalBadge');
    expect(totalBadge.textContent).toContain('0 Total Matters Listed');

    const container = document.getElementById('causeListCardsContainer');
    expect(container.innerHTML).toContain('causelist-empty');
  });
});

describe('components/tabs/causelist/causelist.js - WhatsApp & Print Actions', () => {
  beforeEach(() => {
    window.allCaseRecords = [
      {
        caseNo: 'CS/10/2026',
        plaintiff: 'Gupta',
        defendant: 'Sharma',
        caseType: 'civil',
        courtName: 'Civil Judge Senior Division',
        nextHearing: '2026-10-20',
        hearingProcess: 'Issues',
        clientName: 'Sanjay Gupta'
      }
    ];
  });

  it('sendDailyCauseListWhatsApp alerts when no hearings scheduled on date', () => {
    const alertMock = vi.fn();
    window.alert = alertMock;

    window.renderCauseListTable('2099-01-01', '');
    window.sendDailyCauseListWhatsApp();

    expect(alertMock).toHaveBeenCalled();
  });

  it('sendDailyCauseListWhatsApp opens WhatsApp URL when matters are listed', () => {
    const openMock = vi.fn();
    window.open = openMock;

    window.renderCauseListTable('2026-10-20', '');
    window.sendDailyCauseListWhatsApp();

    expect(openMock).toHaveBeenCalled();
    const openedUrl = openMock.mock.calls[0][0];
    expect(openedUrl).toContain('https://api.whatsapp.com/send?text=');
    expect(decodeURIComponent(openedUrl)).toContain('CS/10/2026');
  });
});
