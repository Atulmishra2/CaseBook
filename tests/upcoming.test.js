import { describe, it, expect, beforeEach } from 'vitest';
import '../utils/dateUtils.js';
import '../admin.js';
import '../components/tabs/upcoming/tab-upcoming.js';
import '../components/tabs/home/tab-home.js';

describe('components/tabs/upcoming/tab-upcoming.js & home.js - renderUpcomingWeekHearings', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="upcomingTab">
        ${window.__casebook_tabs['upcoming']}
      </div>
      <span id="upcomingNavCount">0</span>
    `;

    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`;

    const in3Days = new Date();
    in3Days.setDate(in3Days.getDate() + 3);
    const in3DaysStr = `${in3Days.getFullYear()}-${String(in3Days.getMonth() + 1).padStart(2, '0')}-${String(in3Days.getDate()).padStart(2, '0')}`;

    const in20Days = new Date();
    in20Days.setDate(in20Days.getDate() + 20);
    const in20DaysStr = `${in20Days.getFullYear()}-${String(in20Days.getMonth() + 1).padStart(2, '0')}-${String(in20Days.getDate()).padStart(2, '0')}`;

    window.allCaseRecords = [
      {
        caseNo: 'CS/01/2026',
        plaintiff: 'A',
        defendant: 'B',
        courtName: 'Civil Court',
        nextHearing: todayStr,
        hearingProcess: 'Urgent Hearing',
        caseType: 'civil',
        clientNumber: '9876543210'
      },
      {
        criminalCaseNumber: 'CR/02/2026',
        victimName: 'State',
        accusedName: 'Accused X',
        courtName: 'Sessions Court',
        nextHearing: tomorrowStr,
        hearingProcess: 'Bail Arguments',
        caseType: 'criminal',
        criminalClientNumber: '9123456789'
      },
      {
        caseNo: 'REV/03/2026',
        caseName: 'Revenue Matter',
        courtName: 'SDM Court',
        nextHearing: in3DaysStr,
        hearingProcess: 'Evidence',
        caseType: 'revenue'
      },
      {
        caseNo: 'CS/99/2026',
        caseName: 'Far Future Case',
        nextHearing: in20DaysStr,
        caseType: 'civil'
      },
      {
        caseNo: 'DISP/00/2026',
        caseName: 'Disposed Case',
        nextHearing: todayStr,
        caseStatus: 'Disposed'
      }
    ];
  });

  it('filters hearings scheduled within 7 days excluding disposed and future cases', () => {
    expect(window.renderUpcomingWeekHearings).toBeDefined();
    window.renderUpcomingWeekHearings();

    const container = document.getElementById('upcomingWeekContainer');
    expect(container).not.toBeNull();

    // CS/01 (today), CR/02 (tomorrow), REV/03 (3 days) match = 3
    // CS/99 (20 days) is beyond 7 days; DISP/00 is disposed
    const cards = container.querySelectorAll('.legal-hearing-card');
    expect(cards.length).toBe(3);
  });

  it('populates table rows and replaces loading spinner with case docket entries', () => {
    window.renderUpcomingWeekHearings();

    const tableBody = document.getElementById('upcomingTableBody');
    expect(tableBody).not.toBeNull();

    const rows = tableBody.querySelectorAll('tr.upcoming-row');
    expect(rows.length).toBe(3);
    expect(tableBody.innerHTML).not.toContain('Loading upcoming court hearings docket...');
  });

  it('handles client contact numbers cleanly with formattedPhone without runtime errors', () => {
    expect(() => window.renderUpcomingWeekHearings()).not.toThrow();

    const container = document.getElementById('upcomingWeekContainer');
    expect(container.innerHTML).toContain('98765 43210');
  });

  it('enforces view isolation: Table is visible and Cards hidden by default, and toggling works', () => {
    window.renderUpcomingWeekHearings();

    const tblContainer = document.getElementById('upcomingTableViewContainer');
    const crdContainer = document.getElementById('upcomingWeekContainer');

    // Default mode is table
    expect(tblContainer.classList.contains('hidden')).toBe(false);
    expect(crdContainer.classList.contains('hidden')).toBe(true);

    // Switch to cards
    window.setUpcomingViewMode('cards');
    expect(tblContainer.classList.contains('hidden')).toBe(true);
    expect(crdContainer.classList.contains('hidden')).toBe(false);

    // Switch back to table
    window.setUpcomingViewMode('table');
    expect(tblContainer.classList.contains('hidden')).toBe(false);
    expect(crdContainer.classList.contains('hidden')).toBe(true);
  });

  it('uses Lucide iconography across upcoming tab components', () => {
    window.renderUpcomingWeekHearings();

    const htmlContent = document.getElementById('upcomingTab').innerHTML;
    expect(htmlContent).toContain('lucide lucide-gavel');
    expect(htmlContent).toContain('lucide lucide-table-2');
    expect(htmlContent).toContain('lucide lucide-layout-grid');
    expect(htmlContent).toContain('lucide lucide-hash');
    expect(htmlContent).toContain('lucide lucide-flame');
  });

  it('updates all count badges including chip badge, total badge, and nav count', () => {
    window.renderUpcomingWeekHearings();

    const navBadge = document.getElementById('upcomingNavCount');
    const totalBadge = document.getElementById('upcomingTotalBadge');
    const chipBadge = document.getElementById('upcomingListedCountChip');
    const weekCount = document.getElementById('upcomingWeekCount');

    expect(navBadge.textContent).toBe('3');
    expect(totalBadge.textContent).toBe('3 Hearings Listed');
    expect(chipBadge.textContent).toContain('3 Hearings Listed');
    expect(weekCount.textContent).toBe('3');
  });

  it('labels today hearing as "Today in Court" with urgent styling', () => {
    window.renderUpcomingWeekHearings();

    const container = document.getElementById('upcomingWeekContainer');
    expect(container.innerHTML).toContain('Today in Court');
    expect(container.innerHTML).toContain('urgent-today');
    expect(container.innerHTML).toContain('Tomorrow');
    expect(container.innerHTML).toContain('In 3 Days');
  });

  it('shows clean empty state card when no hearings are in next 7 days', () => {
    window.allCaseRecords = [];
    window.renderUpcomingWeekHearings();

    const container = document.getElementById('upcomingWeekContainer');
    expect(container.innerHTML).toContain('hearing-empty-state-card');
    expect(container.innerHTML).toContain('No Upcoming Hearings');

    const totalBadge = document.getElementById('upcomingTotalBadge');
    expect(totalBadge.textContent).toBe('0 Hearings Listed');
  });

  it('initUpcomingTab runs renderUpcomingWeekHearings successfully', () => {
    expect(window.initUpcomingTab).toBeDefined();
    window.initUpcomingTab();

    const totalBadge = document.getElementById('upcomingTotalBadge');
    expect(totalBadge.textContent).toBe('3 Hearings Listed');
  });

  it('renders Cause List pattern collapsible docket rows with 5-column grid and 3-column ledger', () => {
    window.renderUpcomingWeekHearings();

    const docketList = document.getElementById('upcomingDocketList');
    expect(docketList).not.toBeNull();

    const cases = docketList.querySelectorAll('.case.upcoming-case');
    expect(cases.length).toBe(3);

    // Test first docket row structure
    const firstCase = cases[0];
    const caseHead = firstCase.querySelector('.case-head');
    expect(caseHead).not.toBeNull();
    expect(caseHead.querySelector('.c-date-cell')).not.toBeNull();
    expect(caseHead.querySelector('.c-title')).not.toBeNull();
    expect(caseHead.querySelector('.c-court')).not.toBeNull();
    expect(caseHead.querySelector('.c-meta-pill-group')).not.toBeNull();
    expect(caseHead.querySelector('.chev')).not.toBeNull();

    // 3-Column ledger table in body
    const ledger = firstCase.querySelector('.meta-ledger-3col');
    expect(ledger).not.toBeNull();
    const cols = ledger.querySelectorAll('.ledger-col');
    expect(cols.length).toBe(3);

    // Integrated action row
    const actionsRow = ledger.querySelector('.ledger-actions-row');
    expect(actionsRow).not.toBeNull();
    expect(actionsRow.textContent).toContain('Update Next Date');
    expect(actionsRow.textContent).toContain('Open Dossier');
    expect(actionsRow.textContent).toContain('Call Client');
    expect(actionsRow.textContent).toContain('WhatsApp');
  });

  it('toggles accordion row expansion with toggleUpcomingAccordion', () => {
    window.renderUpcomingWeekHearings();

    const docketList = document.getElementById('upcomingDocketList');
    const firstCase = docketList.querySelector('.case.upcoming-case');
    const headBtn = firstCase.querySelector('.case-head');

    expect(firstCase.classList.contains('open')).toBe(false);
    expect(headBtn.getAttribute('aria-expanded')).toBe('false');

    window.toggleUpcomingAccordion(headBtn);
    expect(firstCase.classList.contains('open')).toBe(true);
    expect(headBtn.getAttribute('aria-expanded')).toBe('true');

    window.toggleUpcomingAccordion(headBtn);
    expect(firstCase.classList.contains('open')).toBe(false);
    expect(headBtn.getAttribute('aria-expanded')).toBe('false');
  });

  it('filters by horizon days preset chips using setUpcomingDaysFilter', () => {
    window.renderUpcomingWeekHearings();

    // Filter to Today only (offset 1 day)
    window.setUpcomingDaysFilter(1);
    let docketList = document.getElementById('upcomingDocketList');
    let cases = docketList.querySelectorAll('.case.upcoming-case');
    // Only CS/01/2026 is today
    expect(cases.length).toBe(1);
    expect(cases[0].textContent).toContain('CS/01/2026');

    // Reset back to Next 7 Days
    window.setUpcomingDaysFilter(7);
    cases = docketList.querySelectorAll('.case.upcoming-case');
    expect(cases.length).toBe(3);
  });

  it('filters by court forum using selectUpcomingCourtFilter', () => {
    window.renderUpcomingWeekHearings();

    window.selectUpcomingCourtFilter('Sessions Court');
    let docketList = document.getElementById('upcomingDocketList');
    let cases = docketList.querySelectorAll('.case.upcoming-case');
    expect(cases.length).toBe(1);
    expect(cases[0].textContent).toContain('CR/02/2026');

    // Reset filter
    window.selectUpcomingCourtFilter('');
    cases = docketList.querySelectorAll('.case.upcoming-case');
    expect(cases.length).toBe(3);
  });

  it('renders mobile calendar date dice with month and day inside c-date-cell', () => {
    window.renderUpcomingWeekHearings();

    const docketList = document.getElementById('upcomingDocketList');
    const firstCase = docketList.querySelector('.case.upcoming-case');
    const dateCell = firstCase.querySelector('.c-date-cell');
    expect(dateCell).not.toBeNull();

    const dice = dateCell.querySelector('.c-date-dice');
    expect(dice).not.toBeNull();
    expect(dice.querySelector('.dice-month')).not.toBeNull();
    expect(dice.querySelector('.dice-day')).not.toBeNull();

    const now = new Date();
    const expectedDay = String(now.getDate()).padStart(2, '0');
    expect(dice.querySelector('.dice-day').textContent).toBe(expectedDay);
    expect(dice.classList.contains('today')).toBe(true);
  });

  it('supports desktop title-right toggle placement and mobile-optimized row placement via syncUpcomingTogglePlacement', () => {
    window.renderUpcomingWeekHearings();

    const headActions = document.getElementById('upcomingHeadActions');
    const controlsRow = document.getElementById('upcomingControlsRow');
    const toggle = document.getElementById('upcomingViewToggle');
    expect(headActions).not.toBeNull();
    expect(controlsRow).not.toBeNull();
    expect(toggle).not.toBeNull();

    // 1. Desktop placement: toggle is in headActions to the right of title
    window.innerWidth = 1024;
    window.syncUpcomingTogglePlacement();
    expect(headActions.contains(toggle)).toBe(true);

    // 2. Mobile placement: toggle moves into controlsRow next to Court Dropdown
    window.innerWidth = 400;
    window.syncUpcomingTogglePlacement();
    expect(controlsRow.contains(toggle)).toBe(true);
    expect(controlsRow.querySelector('#upcomingCourtDropdown')).not.toBeNull();

    // 3. Return to Desktop
    window.innerWidth = 1200;
    window.syncUpcomingTogglePlacement();
    expect(headActions.contains(toggle)).toBe(true);

    // 4. Horizon chips are full width with 4 presets
    const fullChips = document.querySelector('.chips.upcoming-chips-full');
    expect(fullChips).not.toBeNull();
    expect(fullChips.querySelectorAll('.chip').length).toBe(4);
  });

  it('supports fluid dropdown interactions including toggle, escape dismiss, and outside click dismiss', () => {
    window.renderUpcomingWeekHearings();

    const dropdown = document.getElementById('upcomingCourtDropdown');
    const trigger = document.getElementById('upcomingCourtDropdownTrigger');
    expect(dropdown).not.toBeNull();
    expect(trigger).not.toBeNull();

    // Open dropdown
    window.toggleUpcomingCourtDropdown();
    expect(dropdown.classList.contains('open')).toBe(true);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');

    // Dismiss with Escape
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(dropdown.classList.contains('open')).toBe(false);
    expect(trigger.getAttribute('aria-expanded')).toBe('false');

    // Open again and dismiss with outside click
    window.toggleUpcomingCourtDropdown();
    expect(dropdown.classList.contains('open')).toBe(true);
    document.body.click();
    expect(dropdown.classList.contains('open')).toBe(false);
  });
});
