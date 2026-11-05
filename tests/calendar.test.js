import { describe, it, expect, beforeEach } from 'vitest';
import '../utils/dateUtils.js';
import '../admin.js';
import '../components/tabs/calendar/tab-calendar.js';

describe('components/tabs/calendar/tab-calendar.js - renderCalendarView & Month Navigation', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="calendarTab">
        ${window.__casebook_tabs['calendar']}
      </div>
    `;

    window.allCaseRecords = [
      {
        caseNo: 'CS/101/2026',
        caseName: 'Verma vs Singh',
        caseType: 'civil',
        courtName: 'Civil Judge Senior Division',
        nextHearing: '2026-10-14',
        hearingProcess: 'Issues'
      },
      {
        criminalCaseNumber: 'CR/50/2026',
        victimName: 'State',
        accusedName: 'Sanjay',
        caseType: 'criminal',
        criminalCourtName: 'Sessions Court',
        nextHearing: '2026-10-14',
        hearingProcess: 'Evidence'
      },
      {
        caseNo: 'REV/99/2026',
        caseName: 'Kisan vs State',
        caseType: 'revenue',
        courtName: 'Tehsildar',
        nextHearing: '2026-10-28',
        hearingProcess: 'Hearing'
      },
      {
        caseNo: 'CS/200/2026',
        caseName: 'Old Matter',
        caseType: 'civil',
        courtName: 'Civil Judge',
        nextHearing: '2026-11-05',
        hearingProcess: 'Final Hearing'
      }
    ];
  });

  it('renders month and year heading and computes monthly category breakdown', () => {
    // October 2026 (Month index 9)
    window.renderCalendarView(2026, 9);

    const monthYearEl = document.getElementById('calendarMonthYear');
    expect(monthYearEl.textContent).toBe('October 2026');

    const totalEl = document.getElementById('calTotalHearings');
    const civilEl = document.getElementById('calCivilHearings');
    const crimEl = document.getElementById('calCriminalHearings');
    const revEl = document.getElementById('calRevenueHearings');

    expect(totalEl.textContent).toBe('3'); // 3 hearings in Oct 2026
    expect(civilEl.textContent).toBe('1');
    expect(crimEl.textContent).toBe('1');
    expect(revEl.textContent).toBe('1');
  });

  it('normalizes inverted arguments if month is passed before year', () => {
    // Even if passed as (month=9, year=2026) instead of (year=2026, month=9)
    window.renderCalendarView(9, 2026);

    const monthYearEl = document.getElementById('calendarMonthYear');
    expect(monthYearEl.textContent).toBe('October 2026');

    const totalEl = document.getElementById('calTotalHearings');
    expect(totalEl.textContent).toBe('3');
  });

  it('generates day cells in calendar grid with hearing indicators', () => {
    window.renderCalendarView(2026, 9);

    const grid = document.getElementById('calendarGrid');
    expect(grid).not.toBeNull();

    const cells = grid.querySelectorAll('.cal-day-cell');
    expect(cells.length).toBeGreaterThanOrEqual(31);

    // Confirm day 14 contains 2 hearings
    const day14Cell = Array.from(cells).find(c => c.querySelector('.day-number')?.textContent === '14');
    expect(day14Cell).toBeDefined();
    expect(day14Cell.innerHTML).toContain('CS/101/2026');
  });

  it('renders aligned day-indicators-row, and high-contrast empty days', () => {
    window.renderCalendarView(2026, 9);

    // Verify removed Legend Bar (clutter removed as top stats row already shows categories)
    expect(document.querySelector('.calendar-legend-bar')).toBeNull();

    // Verify Day Indicators and Alignment
    const grid = document.getElementById('calendarGrid');
    const cells = grid.querySelectorAll('.cal-day-cell');
    cells.forEach(cell => {
      // Every cell must have the header and indicator row
      expect(cell.querySelector('.cal-day-header')).not.toBeNull();
      expect(cell.querySelector('.day-indicators-row')).not.toBeNull();
      // No microscopic clutter badges in day cells
      expect(cell.querySelector('.cal-day-header .day-count-badge')).toBeNull();
    });

    // Verify day 14 has civil and criminal indicator dots
    const day14 = Array.from(cells).find(c => c.querySelector('.day-number')?.textContent === '14');
    const dots14 = day14.querySelectorAll('.cal-dot');
    expect(dots14.length).toBeGreaterThanOrEqual(1);

    // Verify empty day cells are present and have the same structure
    const emptyCells = grid.querySelectorAll('.cal-day-cell.empty-day');
    expect(emptyCells.length).toBeGreaterThan(0);
    emptyCells.forEach(ec => {
      expect(ec.querySelector('.day-number')).not.toBeNull();
      expect(ec.querySelector('.day-indicators-row')).not.toBeNull();
    });
  });
});

describe('components/tabs/calendar/tab-calendar.js - Daily Cause List Board & 3-Column Ledger Table', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = `
      <header class="board-head calendar-master-head">
        <h3 id="selectedDateTitle"></h3>
        <span id="selectedDateFormattedText"></span>
        <span id="selectedDateCountBadge"></span>
      </header>
      <div id="dayScheduleSection" class="board causelist-board-shell">
        <div class="table-sorting-row">
          <button class="sort-th col-title" onclick="calSortTable('title')">Case Title</button>
          <button class="sort-th col-court" onclick="calSortTable('court')">Court Forum</button>
          <button class="sort-th col-no" onclick="calSortTable('caseno')">Case No</button>
          <button class="sort-th col-tag" onclick="calSortTable('tag')">Category</button>
          <button class="sort-th col-toggle" onclick="calToggleAllCases()"></button>
        </div>
        <select id="causeListCourtFilter" style="display:none;">
          <option value="">All Courts</option>
          <option value="sessions court">Sessions Court</option>
        </select>
        <div id="dayScheduleList" class="list"></div>
        <footer class="foot">
          <span id="calScheduleFooterCount"></span>
        </footer>
      </div>
    `;
  });

  const sampleHearings = [
    {
      caseNo: 'CS/101/2026',
      plaintiff: 'Verma',
      defendant: 'Singh',
      courtName: 'Civil Judge Senior Division',
      judgeName: 'Shri A.K. Sharma',
      hearingProcess: 'Issues',
      clientName: 'Sunil Verma',
      clientNumber: '9876543210'
    },
    {
      criminalCaseNumber: 'CR/50/2026',
      victimName: 'State',
      accusedName: 'Sanjay',
      courtName: 'Sessions Court',
      judgeName: 'Dr. R.S. Rawat',
      hearingProcess: 'Evidence',
      clientName: 'Sanjay Kumar',
      clientNumber: '9811223344'
    }
  ];

  it('renders Daily Cause List cards with 5-column header and 3-column structured ledger table', () => {
    window.renderDaySchedule(14, 9, 2026, sampleHearings);

    const titleEl = document.getElementById('selectedDateTitle');
    expect(titleEl.textContent).toBe('Master Calendar Scheduler');

    const badgeEl = document.getElementById('selectedDateCountBadge');
    expect(badgeEl.textContent).toBe('2 HEARINGS');

    const listEl = document.getElementById('dayScheduleList');
    expect(listEl.innerHTML).toContain('Civil Judge Senior Division');
    expect(listEl.innerHTML).toContain('Sessions Court');
    expect(listEl.innerHTML).toContain('CS/101/2026');
    expect(listEl.innerHTML).toContain('CR/50/2026');
    expect(listEl.innerHTML).toContain('9876543210');

    // Verify Daily Cause List Cards structure
    const cases = listEl.querySelectorAll('.case');
    expect(cases.length).toBe(2);

    // Cards are by-default collapsed!
    expect(cases[0].classList.contains('open')).toBe(false);
    expect(cases[1].classList.contains('open')).toBe(false);

    const firstCaseHead = cases[0].querySelector('.case-head');
    expect(firstCaseHead).not.toBeNull();
    expect(firstCaseHead.querySelector('.c-title')).not.toBeNull();
    expect(firstCaseHead.querySelector('.c-court')).not.toBeNull();
    expect(firstCaseHead.querySelector('.c-no')).not.toBeNull();
    expect(firstCaseHead.querySelector('.tag')).not.toBeNull();
    expect(firstCaseHead.querySelector('.chev')).not.toBeNull();

    // Verify 3-Column Structured Ledger Table
    const ledger = cases[0].querySelector('.meta-ledger-3col');
    expect(ledger).not.toBeNull();
    const cols = ledger.querySelectorAll('.ledger-col');
    expect(cols.length).toBe(3);

    // Verify Actions Row
    const actionsRow = ledger.querySelector('.ledger-actions-row');
    expect(actionsRow).not.toBeNull();
    expect(actionsRow.textContent).toContain('Update Next Date');
    expect(actionsRow.textContent).toContain('Open Dossier');
    expect(actionsRow.textContent).toContain('Call Client');
    expect(actionsRow.textContent).toContain('WhatsApp');
    expect(actionsRow.textContent).toContain('Pass-Over Slip');
  });

  it('filters schedule by court when dropdown filter is selected', () => {
    const filterSelect = document.getElementById('causeListCourtFilter');
    filterSelect.value = 'sessions court';

    window.renderDaySchedule(14, 9, 2026, sampleHearings);

    const badgeEl = document.getElementById('selectedDateCountBadge');
    expect(badgeEl.textContent).toBe('1 HEARING');

    const listEl = document.getElementById('dayScheduleList');
    expect(listEl.innerHTML).toContain('CR/50/2026');
    expect(listEl.innerHTML).not.toContain('CS/101/2026');
  });

  it('toggles case accordion open/closed when case-head is clicked', () => {
    window.renderDaySchedule(14, 9, 2026, sampleHearings);

    const listEl = document.getElementById('dayScheduleList');
    const cases = listEl.querySelectorAll('.case');
    const secondCase = cases[1];
    const secondHead = secondCase.querySelector('.case-head');

    // Initially second case is collapsed
    expect(secondCase.classList.contains('open')).toBe(false);

    // Toggle second case accordion
    window.toggleCaseAccordion(secondHead);
    expect(secondCase.classList.contains('open')).toBe(true);

    // Toggle second case accordion again -> closes it
    window.toggleCaseAccordion(secondHead);
    expect(secondCase.classList.contains('open')).toBe(false);
  });

  it('disambiguates defendant when partyName matches plaintiff and client is defendant', () => {
    const rawHearings = [
      {
        caseNo: 'CS-604-2014',
        plaintiff: 'Suresh & others',
        partyName: 'Suresh & others',
        defendant: 'Defendant',
        clientName: 'Jagrana (Holi)',
        clientNumber: '1234567890',
        courtName: 'Add. Civil Judge Junior Division/FTC',
        nextHearing: '2026-10-29',
        hearingProcess: 'Hearing'
      }
    ];

    window.renderDaySchedule(29, 9, 2026, rawHearings);

    const listEl = document.getElementById('dayScheduleList');
    expect(listEl.innerHTML).toContain('CS-604-2014');
    expect(listEl.innerHTML).not.toContain('Defendant: Suresh & others');
    expect(listEl.textContent).toContain('Suresh & others vs Jagrana (Holi)');

    const caseNameEl = listEl.querySelector('.case-name');
    expect(caseNameEl).not.toBeNull();
    expect(caseNameEl.textContent).toBe('Suresh & others vs Jagrana (Holi)');

    const caseNoEl = listEl.querySelector('.case-no');
    expect(caseNoEl).not.toBeNull();
    expect(caseNoEl.textContent).toBe('#CS-604-2014');

    const actions = listEl.querySelectorAll('.act');
    expect(actions.length).toBeGreaterThanOrEqual(3);
    expect(listEl.textContent).toContain('Call');
    expect(listEl.textContent).toContain('WhatsApp');
    expect(listEl.textContent).toContain('Update Next Date');
  });

  it('renders clean empty message when no hearings exist on day', () => {
    window.renderDaySchedule(1, 9, 2026, []);

    const badgeEl = document.getElementById('selectedDateCountBadge');
    expect(badgeEl.textContent).toBe('0 HEARINGS');

    const listEl = document.getElementById('dayScheduleList');
    expect(listEl.innerHTML).toContain('empty-schedule-msg');
    expect(listEl.innerHTML).toContain('causelist-empty');
  });

  it('calSortTable sorts cases dynamically by column', () => {
    window.renderDaySchedule(14, 9, 2026, sampleHearings);
    const listEl = document.getElementById('dayScheduleList');

    // Sort by Title
    window.calSortTable('title');
    const cases = listEl.querySelectorAll('.case');
    expect(cases.length).toBe(2);
    expect(cases[0].textContent).toContain('State'); // 'State' before 'Verma' alphabetically

    // Toggle Title sorting direction -> descending
    window.calSortTable('title');
    const casesDesc = listEl.querySelectorAll('.case');
    expect(casesDesc[0].textContent).toContain('Verma');
  });

  it('calToggleAllCases expands and collapses all case cards simultaneously', () => {
    window.renderDaySchedule(14, 9, 2026, sampleHearings);
    const listEl = document.getElementById('dayScheduleList');

    // Initially all are collapsed
    expect(listEl.querySelectorAll('.case.open').length).toBe(0);

    // Expand all
    window.calToggleAllCases();
    expect(listEl.querySelectorAll('.case.open').length).toBe(2);

    // Collapse all
    window.calToggleAllCases();
    expect(listEl.querySelectorAll('.case.open').length).toBe(0);
  });
});

describe('components/tabs/calendar/tab-calendar.js - Forward Date Modal Delegation & Cleanup', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = `
      <div id="calendarTab">
        ${window.__casebook_tabs['calendar']}
      </div>
    `;

    window.allCaseRecords = [
      {
        caseNo: 'CS/101/2026',
        caseName: 'Verma vs Singh',
        caseType: 'civil',
        courtName: 'Civil Judge Senior Division',
        nextHearing: '2026-10-14',
        hearingProcess: 'Issues'
      }
    ];
  });

  it('confirms calForwardDateModal is removed from calendar DOM', () => {
    const modal = document.getElementById('calForwardDateModal');
    expect(modal).toBeNull();
  });

  it('openCalForwardModal delegates to openForwardDateModal when available', () => {
    let capturedCase = null;
    window.openForwardDateModal = (caseNo) => {
      capturedCase = caseNo;
    };

    window.openCalForwardModal('CS/101/2026');
    expect(capturedCase).toBe('CS/101/2026');
  });

  it('closeCalForwardModal delegates to closeForwardDateModal when available', () => {
    let closed = false;
    window.closeForwardDateModal = () => {
      closed = true;
    };

    window.closeCalForwardModal();
    expect(closed).toBe(true);
  });
});

describe('components/tabs/calendar/tab-calendar.html - Full-Width Calendar & Daily Cause List Hierarchy', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="calendarTab">
        ${window.__casebook_tabs['calendar']}
      </div>
    `;
  });

  it('renders the full-width calendar grid and Daily Cause List Appearance Board hierarchy', () => {
    // Top Banner (Image 1 Style refactored from Image 2)
    const topHead = document.querySelector('.calendar-master-head');
    expect(topHead).not.toBeNull();
    expect(topHead.querySelector('#selectedDateTitle').textContent).toBe('Master Calendar Scheduler');
    expect(topHead.querySelector('#calWhatsAppActionBtn')).toBeNull();

    // Full-Width Calendar Grid
    const fullWidthWrapper = document.querySelector('.calendar-fullwidth-wrapper');
    expect(fullWidthWrapper).not.toBeNull();
    expect(fullWidthWrapper.querySelector('.calendar-grid-container')).not.toBeNull();
    expect(fullWidthWrapper.querySelector('.calendar-top-bar')).not.toBeNull();
    expect(fullWidthWrapper.querySelector('#calendarGrid')).not.toBeNull();

    // Cause List Board with Sorting Row (Redundant toolbar removed from table)
    const causeBoard = document.querySelector('#dayScheduleSection.causelist-board-shell');
    expect(causeBoard).not.toBeNull();
    expect(causeBoard.querySelector('.table-sorting-row')).not.toBeNull();
    expect(causeBoard.querySelector('#dayScheduleList')).not.toBeNull();
    expect(causeBoard.querySelector('.foot')).not.toBeNull();

    // Verify retired modal overlay is not in the DOM
    expect(document.getElementById('calForwardDateModal')).toBeNull();
  });
});

describe('components/tabs/calendar/tab-calendar.js - Mobile Touch Swipe Month Navigation', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="calendarTab">
        ${window.__casebook_tabs['calendar']}
      </div>
    `;
    window.renderCalendarView(2026, 9); // October 2026
  });

  it('swiping left (drag right-to-left) advances to the next month', () => {
    const monthYearEl = document.getElementById('calendarMonthYear');
    expect(monthYearEl.textContent).toBe('October 2026');

    const container = document.querySelector('.calendar-grid-container');
    expect(container).not.toBeNull();

    // Simulate touchstart at x=200, y=100
    const touchStartEvent = new Event('touchstart', { bubbles: true });
    touchStartEvent.touches = [{ clientX: 200, clientY: 100 }];
    container.dispatchEvent(touchStartEvent);

    // Simulate touchend at x=100, y=100 (diffX = -100, swipe left)
    const touchEndEvent = new Event('touchend', { bubbles: true });
    touchEndEvent.changedTouches = [{ clientX: 100, clientY: 100 }];
    container.dispatchEvent(touchEndEvent);

    expect(monthYearEl.textContent).toBe('November 2026');
  });

  it('swiping right (drag left-to-right) moves back to the previous month', () => {
    const monthYearEl = document.getElementById('calendarMonthYear');
    expect(monthYearEl.textContent).toBe('October 2026');

    const container = document.querySelector('.calendar-grid-container');

    // Simulate touchstart at x=100, y=100
    const touchStartEvent = new Event('touchstart', { bubbles: true });
    touchStartEvent.touches = [{ clientX: 100, clientY: 100 }];
    container.dispatchEvent(touchStartEvent);

    // Simulate touchend at x=220, y=100 (diffX = +120, swipe right)
    const touchEndEvent = new Event('touchend', { bubbles: true });
    touchEndEvent.changedTouches = [{ clientX: 220, clientY: 100 }];
    container.dispatchEvent(touchEndEvent);

    expect(monthYearEl.textContent).toBe('September 2026');
  });

  it('ignores vertical scrolling and does not trigger month navigation', () => {
    const monthYearEl = document.getElementById('calendarMonthYear');
    expect(monthYearEl.textContent).toBe('October 2026');

    const container = document.querySelector('.calendar-grid-container');

    // Simulate vertical scroll touchstart at x=150, y=100
    const touchStartEvent = new Event('touchstart', { bubbles: true });
    touchStartEvent.touches = [{ clientX: 150, clientY: 100 }];
    container.dispatchEvent(touchStartEvent);

    // Simulate vertical scroll touchend at x=160, y=250 (diffX = 10, diffY = 150)
    const touchEndEvent = new Event('touchend', { bubbles: true });
    touchEndEvent.changedTouches = [{ clientX: 160, clientY: 250 }];
    container.dispatchEvent(touchEndEvent);

    // Month should stay October 2026
    expect(monthYearEl.textContent).toBe('October 2026');
  });
});
