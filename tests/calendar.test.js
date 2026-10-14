import { describe, it, expect, beforeEach } from 'vitest';
import '../utils/dateUtils.js';
import '../admin.js';
import '../components/tabs/calendar/calendar.js';

describe('components/tabs/calendar/calendar.js - renderCalendarView & Month Navigation', () => {
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
});

describe('components/tabs/calendar/calendar.js - renderDaySchedule', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="dayScheduleSection">
        <h3 id="selectedDateTitle"></h3>
        <span id="selectedDateFormattedText"></span>
        <span id="selectedDateCountBadge"></span>
        <select id="causeListCourtFilter">
          <option value="">All Courts</option>
          <option value="sessions court">Sessions Court</option>
        </select>
        <table><tbody id="dayScheduleList"></tbody></table>
      </div>
    `;
  });

  it('renders day schedule table with case cards and action buttons', () => {
    const rawHearings = [
      {
        caseNo: 'CS/101/2026',
        plaintiff: 'Verma',
        defendant: 'Singh',
        courtName: 'Civil Judge Senior Division',
        hearingProcess: 'Issues',
        clientName: 'Sunil Verma',
        clientNumber: '9876543210'
      },
      {
        criminalCaseNumber: 'CR/50/2026',
        victimName: 'State',
        accusedName: 'Sanjay',
        courtName: 'Sessions Court',
        hearingProcess: 'Evidence'
      }
    ];

    window.renderDaySchedule(14, 9, 2026, rawHearings);

    const badgeEl = document.getElementById('selectedDateCountBadge');
    expect(badgeEl.textContent).toBe('2 HEARINGS');

    const listEl = document.getElementById('dayScheduleList');
    expect(listEl.innerHTML).toContain('CS/101/2026');
    expect(listEl.innerHTML).toContain('CR/50/2026');
    expect(listEl.innerHTML).toContain('9876543210');
  });

  it('filters schedule by court when dropdown filter is selected', () => {
    const rawHearings = [
      {
        caseNo: 'CS/101/2026',
        caseName: 'Civil Matter',
        courtName: 'Civil Judge Senior Division'
      },
      {
        caseNo: 'CR/50/2026',
        caseName: 'Criminal Matter',
        courtName: 'Sessions Court'
      }
    ];

    const filterSelect = document.getElementById('causeListCourtFilter');
    filterSelect.value = 'sessions court';

    window.renderDaySchedule(14, 9, 2026, rawHearings);

    const badgeEl = document.getElementById('selectedDateCountBadge');
    expect(badgeEl.textContent).toBe('1 HEARING');

    const listEl = document.getElementById('dayScheduleList');
    expect(listEl.innerHTML).toContain('CR/50/2026');
    expect(listEl.innerHTML).not.toContain('CS/101/2026');
  });

  it('renders clean empty message when no hearings exist on day', () => {
    window.renderDaySchedule(1, 9, 2026, []);

    const badgeEl = document.getElementById('selectedDateCountBadge');
    expect(badgeEl.textContent).toBe('0 HEARINGS');

    const listEl = document.getElementById('dayScheduleList');
    expect(listEl.innerHTML).toContain('empty-schedule-msg');
  });
});
