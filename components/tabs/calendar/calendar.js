window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs['calendar'] = `

    <!-- Section Header Title -->
    <div class="section-header-row">
    <div class="section-title-box">
        <div class="section-icon-badge"><i class="fa-solid fa-calendar-days"></i></div>
        <div>
            <h3>Master Calendar Scheduler</h3>
            <p class="section-subtitle">Visual monthly & weekly timeline for case hearings, procedural tasks, and court dates</p>
            <div class="header-chips-row">
                <button type="button" class="header-chip-btn" onclick="showTab('causelist')"><i class="fa-solid fa-scroll"></i> Cause List</button>
                    <button type="button" class="header-chip-btn" onclick="showTab('upcoming')"><i class="fa-solid fa-gavel"></i> Upcoming Hearings</button>
            </div>
        </div>
    </div>
    </div>

   

    <div class="calendar-top-bar">
        <div class="calendar-header-titles">
            <h2 id="calendarMonthYear">September 2026</h2>
            <p class="section-subtitle">Visual Court Hearing Scheduler &amp; Case Appearances</p>
        </div>
        <div class="calendar-controls">
            <button type="button" id="calPrevMonthBtn" class="cal-nav-btn" title="Previous Month">◀ Prev</button>
            <button type="button" id="calTodayBtn" class="cal-today-btn">Today</button>
            <button type="button" id="calNextMonthBtn" class="cal-nav-btn" title="Next Month">Next ▶</button>
        </div>
    </div>

    <!-- Monthly Hearing Summary Stats -->
    <div class="calendar-stats-row">
        <div class="cal-stat-chip">
            <span class="cal-stat-num" id="calTotalHearings">0</span>
            <span class="cal-stat-label">Total Hearings</span>
        </div>
        <div class="cal-stat-chip civil-chip">
            <span class="cal-stat-num" id="calCivilHearings">0</span>
            <span class="cal-stat-label">Civil Hearings</span>
        </div>
        <div class="cal-stat-chip criminal-chip">
            <span class="cal-stat-num" id="calCriminalHearings">0</span>
            <span class="cal-stat-label">Criminal Hearings</span>
        </div>
        <div class="cal-stat-chip revenue-chip">
            <span class="cal-stat-num" id="calRevenueHearings">0</span>
            <span class="cal-stat-label">Revenue Hearings</span>
        </div>
    </div>

    <!-- 7-Day Weekday Headers & Calendar Days Grid (No Scrollbar, Padded Container) -->
    <div class="calendar-grid-container">
        <div class="calendar-grid-wrapper">
            <div class="calendar-weekdays">
                <div>SUN</div>
                <div>MON</div>
                <div>TUE</div>
                <div>WED</div>
                <div>THU</div>
                <div>FRI</div>
                <div>SAT</div>
            </div>
            <div id="calendarGrid" class="calendar-days-grid"></div>
        </div>
    </div>

    <!-- Selected Day Detailed Hearing Schedule Panel -->
    <div id="dayScheduleSection" class="day-schedule-card">
        <div class="day-schedule-header">
            <div>
                <h3 id="selectedDateTitle">📅 Hearings on Selected Date</h3>
                <p class="section-subtitle">Click on any date to inspect scheduled proceedings</p>
            </div>
            <div class="day-schedule-actions">
                <span id="selectedDateCountBadge" class="case-badge">Select a Day</span>
                <select id="causeListCourtFilter" class="search-filter-select cause-list-court-select" title="Filter cause list by court">
                    <option value="">🏛️ All Courts</option>
                </select>
                <button type="button" id="printCauseListBtn" class="print-cause-btn" title="Print daily cause list for selected date">
                    <span>🖨️ Print Daily Cause List</span>
                </button>
            </div>
        </div>
        <div id="dayScheduleList" class="day-schedule-list">
            <p class="empty-schedule-msg">Click on any calendar day to inspect its scheduled hearings.</p>
        </div>
    </div>
</div>
`;

// ==============================================================================
// Calendar View Scheduler Logic
// ==============================================================================

var currentCalendarYear = 2026;
var currentCalendarMonth = 8; // September (0-indexed: 8)
var selectedCalendarDate = null;

var monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function renderCalendarView(year = currentCalendarYear, month = currentCalendarMonth) {
  currentCalendarYear = year;
  currentCalendarMonth = month;

  const monthYearEl = document.getElementById('calendarMonthYear');
  if (monthYearEl) {
    monthYearEl.textContent = `${monthNames[month]} ${year}`;
  }

  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 = Sun
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
  const totalDaysInPrevMonth = new Date(year, month, 0).getDate();

  // Count and map hearings for this month
  let totalHearingsCount = 0;
  let civilHearingsCount = 0;
  let criminalHearingsCount = 0;
  let revenueHearingsCount = 0;

  const dayHearingsMap = {};

  allCaseRecords.forEach(c => {
    if (!c.nextHearing || c.nextHearing === '—' || c.nextHearing === 'null') return;

    const str = String(c.nextHearing).trim();
    let hYear = null, hMonth = null, hDay = null;

    const ymd = str.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/);
    if (ymd) {
      hYear = parseInt(ymd[1], 10);
      hMonth = parseInt(ymd[2], 10) - 1;
      hDay = parseInt(ymd[3], 10);
    } else {
      const dmy = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
      if (dmy) {
        hDay = parseInt(dmy[1], 10);
        hMonth = parseInt(dmy[2], 10) - 1;
        hYear = parseInt(dmy[3], 10);
      }
    }

    if (hYear === year && hMonth === month) {
      totalHearingsCount++;
      const type = (c.caseType || 'civil').toLowerCase().trim();
      if (type === 'civil' || type === 'misc_civil') civilHearingsCount++;
      else if (type === 'criminal' || type === 'state' || type === 'complaint' || type === 'misc_criminal') criminalHearingsCount++;
      else if (type === 'revenue') revenueHearingsCount++;

      if (!dayHearingsMap[hDay]) dayHearingsMap[hDay] = [];
      dayHearingsMap[hDay].push(c);
    }
  });

  // Update summary stat chips
  const totalEl = document.getElementById('calTotalHearings');
  const civilEl = document.getElementById('calCivilHearings');
  const crimEl = document.getElementById('calCriminalHearings');
  const revEl = document.getElementById('calRevenueHearings');

  if (totalEl) totalEl.textContent = String(totalHearingsCount);
  if (civilEl) civilEl.textContent = String(civilHearingsCount);
  if (crimEl) crimEl.textContent = String(criminalHearingsCount);
  if (revEl) revEl.textContent = String(revenueHearingsCount);

  const grid = document.getElementById('calendarGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const today = new Date();
  const isCurrentRealMonth = today.getFullYear() === year && today.getMonth() === month;

  // 1. Trailing days from previous month
  for (let i = 0; i < firstDayOfWeek; i++) {
    const prevDayNum = totalDaysInPrevMonth - firstDayOfWeek + i + 1;
    const cell = document.createElement('div');
    cell.className = 'cal-day-cell empty-day';
    cell.innerHTML = `<span class="day-number">${prevDayNum}</span>`;
    grid.appendChild(cell);
  }

  // 2. Active month days
  for (let day = 1; day <= totalDaysInMonth; day++) {
    const cell = document.createElement('div');
    const isToday = isCurrentRealMonth && today.getDate() === day;
    const hearings = dayHearingsMap[day] || [];
    const hasHearings = hearings.length > 0;

    cell.className = `cal-day-cell ${isToday ? 'today-cell' : ''}`;
    if (selectedCalendarDate && selectedCalendarDate.day === day && selectedCalendarDate.month === month && selectedCalendarDate.year === year) {
      cell.classList.add('selected-day');
    }

    let hearingsHtml = '';
    if (hasHearings) {
      hearingsHtml = `
        <div class="day-hearings-container">
          ${hearings.slice(0, 2).map(h => {
            const rawType = (h.caseType || 'civil').toLowerCase().trim();
            const caseNo = h.caseNo || h.criminalCaseNumber || '—';
            let extraClass = '';
            if (rawType === 'state' || rawType === 'complaint' || rawType === 'misc_criminal') {
              extraClass = 'criminal';
            } else if (rawType === 'misc_civil') {
              extraClass = 'civil';
            }
            return `<span class="day-hearing-pill ${escapeHtml(rawType)} ${extraClass}" title="${escapeHtml(caseNo)}: ${escapeHtml(h.caseName || 'Case')}">${escapeHtml(caseNo)}</span>`;
          }).join('')}
          ${hearings.length > 2 ? `<span class="day-count-badge">+${hearings.length - 2} more</span>` : ''}
        </div>
      `;
    }

    cell.innerHTML = `
      <div class="cal-day-header">
        <span class="day-number">${day}</span>
        ${hasHearings ? `<span class="day-count-badge">${hearings.length}</span>` : ''}
      </div>
      ${hearingsHtml}
    `;

    cell.addEventListener('click', () => {
      grid.querySelectorAll('.cal-day-cell').forEach(c => c.classList.remove('selected-day'));
      cell.classList.add('selected-day');
      selectedCalendarDate = { day, month, year };
      renderDaySchedule(day, month, year, hearings);
    });

    grid.appendChild(cell);
  }

  // 3. Selection: keep previous selection or select first day with hearings
  if (selectedCalendarDate && selectedCalendarDate.month === month && selectedCalendarDate.year === year) {
    const day = selectedCalendarDate.day;
    renderDaySchedule(day, month, year, dayHearingsMap[day] || []);
  } else {
    const firstDayWithHearings = Object.keys(dayHearingsMap)[0];
    if (firstDayWithHearings) {
      const d = parseInt(firstDayWithHearings, 10);
      selectedCalendarDate = { day: d, month, year };
      const firstCell = grid.querySelectorAll('.cal-day-cell:not(.empty-day)')[d - 1];
      if (firstCell) firstCell.classList.add('selected-day');
      renderDaySchedule(d, month, year, dayHearingsMap[d]);
    } else {
      selectedCalendarDate = { day: 1, month, year };
      renderDaySchedule(1, month, year, []);
    }
  }
}

function renderDaySchedule(day, month, year, hearings) {
  const titleEl = document.getElementById('selectedDateTitle');
  const badgeEl = document.getElementById('selectedDateCountBadge');
  const listEl = document.getElementById('dayScheduleList');

  const dateFormatted = `${String(day).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/${year}`;

  if (titleEl) {
    titleEl.textContent = `📅 Scheduled Hearings for ${dateFormatted}`;
  }

  if (badgeEl) {
    badgeEl.textContent = `${hearings.length} Hearing${hearings.length === 1 ? '' : 's'}`;
    badgeEl.className = `case-badge ${hearings.length > 0 ? 'civil' : ''}`;
  }

  if (!listEl) return;

  if (!hearings || hearings.length === 0) {
    listEl.innerHTML = `<p class="empty-schedule-msg">No hearings scheduled on <strong>${dateFormatted}</strong>.</p>`;
    return;
  }

  listEl.innerHTML = hearings.map(h => {
    const caseNo = h.caseNo || h.criminalCaseNumber || '—';
    const type = (h.caseType || 'civil').toUpperCase();
    const typeClass = (h.caseType || 'civil').toLowerCase();
    const court = h.courtName || h.criminalCourtName || 'District Court';
    const stage = h.hearingProcess || h.process || 'Scheduled Hearing';
    const client = h.clientName || h.criminalClientName || '—';
    const caseName = h.caseName || (h.plaintiff ? `${h.plaintiff} vs ${h.defendant}` : `${h.victimName} vs ${h.accusedName}`);

    return `
      <div class="schedule-case-card">
        <div class="schedule-case-info">
          <div class="schedule-case-header">
            <span class="schedule-case-no">${caseNo}</span>
            <span class="case-badge ${typeClass}">${type}</span>
          </div>
          <div class="schedule-case-name">${caseName}</div>
          <div class="schedule-case-meta">
            <span>🏛️ ${court}</span>
            <span>📋 <strong>Stage:</strong> ${stage}</span>
            <span>👤 <strong>Client:</strong> ${client}</span>
          </div>
        </div>
        <div class="schedule-case-actions">
          <button type="button" class="table-view-btn whatsapp-btn" onclick="sendWhatsAppHearingNotice('${caseNo}')" title="Send WhatsApp Hearing Notice to Client">
            💬 WhatsApp
          </button>
          <button type="button" class="table-view-btn update-hearing-btn" onclick="openUpdateHearingForCase('${caseNo}')">
            📅 Update
          </button>
          <button type="button" class="table-view-btn" onclick="showTab('search'); document.getElementById('globalSearch').value='${caseNo}'; filterCaseTables(false);">
            🔎 View
          </button>
        </div>
      </div>
    `;
  }).join('');
}

if (typeof renderCalendarView !== 'undefined') window.renderCalendarView = renderCalendarView;
if (typeof renderDaySchedule !== 'undefined') window.renderDaySchedule = renderDaySchedule;

