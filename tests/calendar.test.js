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

  it('renders category legend bar, aligned day-indicators-row, and high-contrast empty days', () => {
    window.renderCalendarView(2026, 9);

    // Verify Legend Bar
    const legend = document.querySelector('.calendar-legend-bar');
    expect(legend).not.toBeNull();
    expect(legend.textContent).toContain('Civil');
    expect(legend.textContent).toContain('Criminal');
    expect(legend.textContent).toContain('Revenue');

    // Verify removed clutter sections: court filter dropdown, print cause list button, schedule toolbar, and progress badge
    expect(document.getElementById('causeListCourtFilter')).toBeNull();
    expect(document.getElementById('printCauseListBtn')).toBeNull();
    expect(document.querySelector('.schedule-toolbar')).toBeNull();
    expect(document.getElementById('dayScheduleProgress')).toBeNull();

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

describe('components/tabs/calendar/tab-calendar.js - renderDaySchedule Collapsible Table', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = `
      <div id="dayScheduleSection">
        <h3 id="selectedDateTitle"></h3>
        <span id="selectedDateFormattedText"></span>
        <span id="selectedDateCountBadge"></span>
        <span id="dayScheduleProgress" style="display:none;"></span>
        <select id="causeListCourtFilter">
          <option value="">All Courts</option>
          <option value="sessions court">Sessions Court</option>
        </select>
        <div class="schedule-toolbar">
          <input id="dayScheduleSearch" type="search" />
          <button id="calExpandAllBtn">Expand all</button>
          <button id="calCollapseAllBtn">Collapse all</button>
        </div>
        <div id="dayScheduleList" class="day-schedule-court-list"></div>
      </div>
      <div id="calForwardDateModal" style="display:none;">
        <input type="hidden" id="calModalCaseNo" value="" />
        <div id="calModalCaseSub"></div>
        <input type="date" id="calModalNextDate" />
        <span id="calModalDatePreview"></span>
        <input type="text" id="calModalStage" />
        <button id="calModalSaveBtn">Save Date</button>
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

  it('renders court grouping headers with count badges and case details', () => {
    window.renderDaySchedule(14, 9, 2026, sampleHearings);

    const badgeEl = document.getElementById('selectedDateCountBadge');
    expect(badgeEl.textContent).toBe('2 HEARINGS');

    const listEl = document.getElementById('dayScheduleList');
    expect(listEl.innerHTML).toContain('Civil Judge Senior Division');
    expect(listEl.innerHTML).toContain('Sessions Court');
    expect(listEl.innerHTML).toContain('CS/101/2026');
    expect(listEl.innerHTML).toContain('CR/50/2026');
    expect(listEl.innerHTML).toContain('9876543210');

    // Verify Court sections
    const courts = listEl.querySelectorAll('.court');
    expect(courts.length).toBe(2);

    const firstCourtHead = courts[0].querySelector('.court-head');
    expect(firstCourtHead).not.toBeNull();
    expect(firstCourtHead.querySelector('.count').textContent).toBe('1');
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

  it('toggles done checkbox and updates strike-through styling and progress counter', () => {
    window.renderDaySchedule(14, 9, 2026, sampleHearings);

    const listEl = document.getElementById('dayScheduleList');
    const progressEl = document.getElementById('dayScheduleProgress');
    expect(progressEl.style.display).not.toBe('none');
    expect(progressEl.textContent).toBe('0 of 2 done');

    const firstDoneBox = listEl.querySelector('.done-box');
    expect(firstDoneBox).not.toBeNull();

    // Check done box
    firstDoneBox.checked = true;
    firstDoneBox.dispatchEvent(new Event('change'));

    const firstCase = listEl.querySelector('.case');
    expect(firstCase.classList.contains('is-done')).toBe(true);
    expect(progressEl.textContent).toBe('1 of 2 done');
  });

  it('toggles court and case expansion when headers are clicked (accordion: default collapsed, one open at a time)', () => {
    window.renderDaySchedule(14, 9, 2026, sampleHearings);

    const listEl = document.getElementById('dayScheduleList');
    const courts = listEl.querySelectorAll('.court');
    const firstCourt = courts[0];
    const secondCourt = courts[1];
    const firstHead = firstCourt.querySelector('.court-head');
    const secondHead = secondCourt.querySelector('.court-head');

    // Initially all courts are collapsed by default
    expect(firstCourt.classList.contains('open')).toBe(false);
    expect(secondCourt.classList.contains('open')).toBe(false);

    // Click first court -> opens first court
    firstHead.click();
    expect(firstCourt.classList.contains('open')).toBe(true);
    expect(secondCourt.classList.contains('open')).toBe(false);

    // Click second court -> opens second court and closes first court (only one open at a time)
    secondHead.click();
    expect(firstCourt.classList.contains('open')).toBe(false);
    expect(secondCourt.classList.contains('open')).toBe(true);

    // Click second court again -> collapses it
    secondHead.click();
    expect(firstCourt.classList.contains('open')).toBe(false);
    expect(secondCourt.classList.contains('open')).toBe(false);
  });

  it('expand all and collapse all buttons toggle all sections', () => {
    window.renderDaySchedule(14, 9, 2026, sampleHearings);

    const collapseAllBtn = document.getElementById('calCollapseAllBtn');
    collapseAllBtn.click();

    const courts = document.querySelectorAll('#dayScheduleSection .court');
    courts.forEach(c => expect(c.classList.contains('open')).toBe(false));

    const expandAllBtn = document.getElementById('calExpandAllBtn');
    expandAllBtn.click();

    courts.forEach(c => expect(c.classList.contains('open')).toBe(true));
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
    // Ensure plaintiff and defendant do NOT have the same name
    expect(listEl.innerHTML).not.toContain('Defendant: Suresh & others');
    // Ensure Jagrana (Holi) is resolved as defendant and displayed in header
    expect(listEl.textContent).toContain('Suresh & others vs Jagrana (Holi)');
    const caseNameEl = listEl.querySelector('.case-name');
    expect(caseNameEl).not.toBeNull();
    expect(caseNameEl.textContent).toBe('Suresh & others vs Jagrana (Holi)');
    const caseNoEl = listEl.querySelector('.case-no');
    expect(caseNoEl).not.toBeNull();
    expect(caseNoEl.textContent).toBe('CS-604-2014');
    // Ensure detail grid drawer is removed and all 3 buttons are rendered
    expect(listEl.querySelector('.case-detail')).toBeNull();
    const actions = listEl.querySelectorAll('.action-btn-icon');
    expect(actions.length).toBe(3);
    expect(listEl.textContent).toContain('Call');
    expect(listEl.textContent).toContain('WhatsApp');
    expect(listEl.textContent).toContain('Forward');
  });

  it('renders clean empty message when no hearings exist on day', () => {
    window.renderDaySchedule(1, 9, 2026, []);

    const badgeEl = document.getElementById('selectedDateCountBadge');
    expect(badgeEl.textContent).toBe('0 HEARINGS');

    const listEl = document.getElementById('dayScheduleList');
    expect(listEl.innerHTML).toContain('empty-schedule-msg');
  });
});

describe('components/tabs/calendar/tab-calendar.js - Small Forward Date Modal', () => {
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

  it('openCalForwardModal opens modal, sets case details and prefills date and stage', () => {
    window.openCalForwardModal('CS/101/2026');

    const modal = document.getElementById('calForwardDateModal');
    expect(modal.style.display).toBe('flex');
    expect(modal.classList.contains('open')).toBe(true);

    const sub = document.getElementById('calModalCaseSub');
    expect(sub.textContent).toContain('CS/101/2026');
    expect(sub.textContent).toContain('Verma vs Singh');

    const dateInput = document.getElementById('calModalNextDate');
    expect(dateInput.value).toMatch(/^\d{4}-\d{2}-\d{2}$/);

    const stageInput = document.getElementById('calModalStage');
    expect(stageInput.value).toBe('Issues');
  });

  it('quick pills update nextDate and preview in modal', () => {
    window.openCalForwardModal('CS/101/2026');

    const tomorrowBtn = document.querySelector('.cal-modal-quick-pills button[data-shift="1"]');
    expect(tomorrowBtn).not.toBeNull();
    tomorrowBtn.click();

    const dateInput = document.getElementById('calModalNextDate');
    expect(dateInput.value).toMatch(/^\d{4}-\d{2}-\d{2}$/);

    const preview = document.getElementById('calModalDatePreview');
    expect(preview.textContent).toContain('Tomorrow');
  });

  it('saveCalForwardDate updates hearing record and closes modal', async () => {
    window.openCalForwardModal('CS/101/2026');

    const dateInput = document.getElementById('calModalNextDate');
    dateInput.value = '2026-11-20';

    const stageInput = document.getElementById('calModalStage');
    stageInput.value = 'Final Arguments';

    await window.saveCalForwardDate();

    // Verify modal is closed
    const modal = document.getElementById('calForwardDateModal');
    expect(modal.style.display).toBe('none');

    // Verify in-memory record updated
    const target = window.allCaseRecords.find(c => c.caseNo === 'CS/101/2026');
    expect(target.nextHearing).toBe('2026-11-20');
    expect(target.hearingProcess).toBe('Final Arguments');
  });

  it('closeCalForwardModal closes modal cleanly', () => {
    window.openCalForwardModal('CS/101/2026');
    const modal = document.getElementById('calForwardDateModal');
    expect(modal.style.display).toBe('flex');

    window.closeCalForwardModal();
    expect(modal.style.display).toBe('none');
  });
});
