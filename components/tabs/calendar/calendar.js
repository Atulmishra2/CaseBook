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

    <!-- Selected Day Detailed Hearing Schedule Panel (Responsive Table / Cards) -->
    <div id="dayScheduleSection" class="widget-container day-schedule-card">
        <!-- Header -->
        <div class="widget-header">
            <div class="header-left">
                <h3 class="header-title" id="selectedDateTitle">Scheduled Hearings</h3>
                <span class="header-divider">|</span>
                <span class="header-date" id="selectedDateFormattedText">📆 Select a Day</span>
                <span class="header-badge" id="selectedDateCountBadge">0 HEARINGS</span>
            </div>
            <div class="header-right">
                <select id="causeListCourtFilter" class="dropdown-filter cause-list-court-select" title="Filter cause list by court">
                    <option value="">🏛️ All Courts</option>
                </select>
                <button type="button" id="printCauseListBtn" class="btn-print" title="Print daily cause list for selected date">
                    🖨️ Print Daily Cause List
                </button>
            </div>
        </div>

        <!-- Table / Mobile Cards -->
        <div class="table-container">
            <table class="schedule-table">
                <thead>
                    <tr>
                        <th>Case Details</th>
                        <th>Court Room / Judge</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="dayScheduleList">
                    <tr class="empty-schedule-row">
                        <td colspan="3" class="empty-schedule-cell">
                            <p class="empty-schedule-msg">Click on any calendar day to inspect its scheduled hearings.</p>
                        </td>
                    </tr>
                </tbody>
            </table>
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
  // Normalize inverted parameters if month is passed before year (e.g., month=9, year=2026)
  if (typeof year === 'number' && typeof month === 'number' && year < 100 && month > 1900) {
    const temp = year;
    year = month;
    month = temp;
  }

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

  const records =
    typeof allCaseRecords !== 'undefined' && Array.isArray(allCaseRecords)
      ? allCaseRecords
      : typeof window !== 'undefined' && Array.isArray(window.allCaseRecords)
        ? window.allCaseRecords
        : [];

  records.forEach(c => {
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

var currentDayRawHearings = [];

function renderDaySchedule(day, month, year, rawHearings = []) {
  currentDayRawHearings = Array.isArray(rawHearings) ? rawHearings : [];

  const titleEl = document.getElementById('selectedDateTitle');
  const dateTextEl = document.getElementById('selectedDateFormattedText');
  const badgeEl = document.getElementById('selectedDateCountBadge');
  const listEl = document.getElementById('dayScheduleList');
  const courtSelect = document.getElementById('causeListCourtFilter');

  const dateFormatted = `${String(day).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/${year}`;

  if (titleEl) {
    titleEl.textContent = 'Scheduled Hearings';
  }

  if (dateTextEl) {
    dateTextEl.textContent = `📆 ${dateFormatted}`;
  }

  // Bind change event on court filter dropdown once
  if (courtSelect && !courtSelect.dataset.hasCalListener) {
    courtSelect.dataset.hasCalListener = 'true';
    courtSelect.addEventListener('change', () => {
      if (selectedCalendarDate) {
        renderDaySchedule(selectedCalendarDate.day, selectedCalendarDate.month, selectedCalendarDate.year, currentDayRawHearings);
      }
    });
  }

  // Filter by selected court if applicable
  const selectedCourt = (courtSelect ? courtSelect.value : '').trim().toLowerCase();
  const hearings = selectedCourt
    ? currentDayRawHearings.filter(h => {
        const cCourt = (h.courtName || h.criminalCourtName || h.court || '').trim().toLowerCase();
        return cCourt === selectedCourt;
      })
    : currentDayRawHearings;

  if (badgeEl) {
    const count = hearings.length;
    badgeEl.textContent = `${count} ${count === 1 ? 'HEARING' : 'HEARINGS'}`;
    badgeEl.className = `header-badge ${count > 0 ? 'active' : ''}`;
  }

  if (!listEl) return;

  if (!hearings || hearings.length === 0) {
    listEl.innerHTML = `
      <tr class="empty-schedule-row">
        <td colspan="3" class="empty-schedule-cell">
          <p class="empty-schedule-msg">No hearings scheduled on <strong>${dateFormatted}</strong>${selectedCourt ? ' for selected court' : ''}.</p>
        </td>
      </tr>
    `;
    return;
  }

  const esc = typeof escapeHtml === 'function'
    ? escapeHtml
    : str => String(str || '').replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));

  listEl.innerHTML = hearings.map(h => {
    const caseNo = h.caseNo || h.criminalCaseNumber || h.case_number || '—';
    const court = h.courtName || h.criminalCourtName || h.court || 'District Court';
    const stage = h.hearingProcess || h.process || h.stage || 'Scheduled Hearing';
    const judge = h.judgeName || h.judge || '';
    const client = h.clientName || h.criminalClientName || h.client || '—';
    const phone = (h.clientNumber || h.criminalClientNumber || h.clientPhone || h.criminalClientPhone || h.phone || h.contact || '').trim();

    let caseTitle = (h.caseName || h.case_title || h.caseTitle || h.title || '').trim();
    if (!caseTitle || caseTitle.toLowerCase() === 'vs' || caseTitle.toLowerCase() === 'vs.') {
      if (h.plaintiff && h.defendant) caseTitle = `${h.plaintiff} vs ${h.defendant}`;
      else if (h.petitioner && h.respondent) caseTitle = `${h.petitioner} vs ${h.respondent}`;
      else if (h.victimName && h.accusedName) caseTitle = `State vs ${h.accusedName}`;
      else caseTitle = 'Untitled Matter';
    }

    let partiesText = '';
    if (h.plaintiff || h.defendant) {
      partiesText = `Plaintiff: ${h.plaintiff || '—'} | Defendant: ${h.defendant || '—'}`;
    } else if (h.petitioner || h.respondent) {
      partiesText = `Petitioner: ${h.petitioner || '—'} | Respondent: ${h.respondent || '—'}`;
    } else if (h.accusedName || h.victimName) {
      partiesText = `Complainant: ${h.victimName || 'State'} | Accused: ${h.accusedName || '—'}`;
    } else {
      partiesText = `Client: ${client} | Stage: ${stage}`;
    }

    const courtDisplay = `🏛️ ${court}`;
    const judgeDisplay = judge ? `👨‍⚖️ ${judge}` : `📋 ${stage}`;

    const callBtn = phone
      ? `<a href="tel:${esc(phone)}" class="action-btn-icon call" title="Call client: ${esc(phone)}" aria-label="Call Client">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
        </a>`
      : `<button type="button" class="action-btn-icon call disabled" title="No client phone number available" disabled aria-label="Call Client">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
        </button>`;

    const waBtn = `<button type="button" class="action-btn-icon whatsapp" onclick="sendWhatsAppHearingNotice('${esc(caseNo)}')" title="Send WhatsApp court notice to client" aria-label="WhatsApp Notice">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
    </button>`;

    const forwardBtn = `<button type="button" class="action-btn-primary" onclick="openUpdateHearingForCase('${esc(caseNo)}')" title="Update or forward next hearing date" aria-label="Forward / Next Date">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
      Forward / Next Date
    </button>`;

    return `
      <tr>
        <td data-label="Case Details">
          <span class="case-number">${esc(caseNo)}</span>
          <span class="case-title">${esc(caseTitle)}</span>
          <span class="case-parties">${esc(partiesText)}</span>
        </td>
        <td data-label="Court Room / Judge">
          <div class="court-room">${esc(courtDisplay)}</div>
          <div class="court-room judge-line">${esc(judgeDisplay)}</div>
        </td>
        <td class="actions-cell" data-label="Actions">
          <div class="action-group">
            ${callBtn}
            ${waBtn}
            ${forwardBtn}
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

if (typeof renderCalendarView !== 'undefined') window.renderCalendarView = renderCalendarView;
if (typeof renderDaySchedule !== 'undefined') window.renderDaySchedule = renderDaySchedule;
if (typeof monthNames !== 'undefined') window.monthNames = monthNames;

