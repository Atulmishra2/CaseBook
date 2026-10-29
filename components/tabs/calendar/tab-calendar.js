window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs['calendar'] = `

    <!-- Section Header Title -->
    <div class="section-header-row">
        <div class="section-title-box">
            <div class="section-icon-badge"><i class="fa-solid fa-calendar-days"></i></div>
            <div>
                <h3>Master Calendar Scheduler</h3>
            </div>
        </div>
    </div>

    <div class="calendar-top-bar">
        <div class="calendar-header-titles">
            <h2 id="calendarMonthYear">Court Calendar</h2>
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
        <div class="cal-stat-chip total-chip">
            <span class="cal-stat-dot total"></span>
            <span class="cal-stat-num" id="calTotalHearings">0</span>
            <span class="cal-stat-label">Total Hearings</span>
        </div>
        <div class="cal-stat-chip civil-chip">
            <span class="cal-stat-dot civil"></span>
            <span class="cal-stat-num" id="calCivilHearings">0</span>
            <span class="cal-stat-label">Civil Hearings</span>
        </div>
        <div class="cal-stat-chip criminal-chip">
            <span class="cal-stat-dot criminal"></span>
            <span class="cal-stat-num" id="calCriminalHearings">0</span>
            <span class="cal-stat-label">Criminal Hearings</span>
        </div>
        <div class="cal-stat-chip revenue-chip">
            <span class="cal-stat-dot revenue"></span>
            <span class="cal-stat-num" id="calRevenueHearings">0</span>
            <span class="cal-stat-label">Revenue Hearings</span>
        </div>
    </div>

    <!-- Calendar Category Color Legend -->
    <div class="calendar-legend-bar" aria-label="Calendar category color key">
        <span class="legend-item"><span class="legend-dot civil"></span> Civil</span>
        <span class="legend-item"><span class="legend-dot criminal"></span> Criminal</span>
        <span class="legend-item"><span class="legend-dot revenue"></span> Revenue</span>
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

    <!-- Selected Day Detailed Hearing Schedule Panel (Responsive Collapsible Court-Grouped Schedule) -->
    <div id="dayScheduleSection" class="widget-container day-schedule-card">
        <!-- Header -->
        <div class="widget-header">
            <div class="header-left">
                <h3 class="header-title" id="selectedDateTitle">Scheduled Hearings</h3>
                <span class="header-divider">|</span>
                <span class="header-date" id="selectedDateFormattedText">📆 Select a Day</span>
                <span class="header-badge" id="selectedDateCountBadge">0 HEARINGS</span>
            </div>
        </div>

        <!-- Collapsible Court Sections Container -->
        <div id="dayScheduleList" class="day-schedule-court-list">
            <div class="empty-schedule-cell">
                <p class="empty-schedule-msg">Click on any calendar day to inspect its scheduled hearings.</p>
            </div>
        </div>
    </div>

    <!-- Small Forward Date Modal (nextDate, stage, save Btn) -->
    <div id="calForwardDateModal" class="cal-modal-overlay" style="display:none;" aria-hidden="true" role="dialog" aria-labelledby="calModalTitle">
        <div class="cal-modal-card">
            <div class="cal-modal-header">
                <div class="cal-modal-header-info">
                    <h3 class="cal-modal-title" id="calModalTitle">Forward Hearing Date</h3>
                    <div class="cal-modal-case-sub" id="calModalCaseSub">Case Number • Parties</div>
                </div>
                <button type="button" class="cal-modal-close" onclick="closeCalForwardModal()" aria-label="Close modal">×</button>
            </div>

            <form id="calForwardDateForm" onsubmit="event.preventDefault(); saveCalForwardDate();">
                <input type="hidden" id="calModalCaseNo" value="" />
                <div class="cal-modal-body">
                    <!-- Field 1: Next Date -->
                    <div class="cal-form-group">
                        <label for="calModalNextDate" class="cal-form-label">Next Hearing Date <span class="req">*</span></label>
                        <div class="cal-date-input-wrap">
                            <input type="date" id="calModalNextDate" class="cal-form-input" required />
                            <span class="cal-modal-date-preview" id="calModalDatePreview">Select a date</span>
                        </div>
                        <!-- Quick Preset Buttons (3x2 grid) -->
                        <div class="cal-modal-quick-pills">
                            <button type="button" data-shift="0">Today</button>
                            <button type="button" data-shift="1">Tomorrow</button>
                            <button type="button" data-shift="7">+1 Week</button>
                            <button type="button" data-shift="14">+2 Weeks</button>
                            <button type="button" data-month="1">+1 Month</button>
                            <button type="button" data-clear="1">Clear</button>
                        </div>
                    </div>

                    <!-- Field 2: Stage -->
                    <div class="cal-form-group">
                        <label for="calModalStage" class="cal-form-label">Hearing Stage <span class="req">*</span></label>
                        <div class="cal-stage-combo-wrap">
                            <input type="text" id="calModalStage" class="cal-form-input" list="calStageList" placeholder="Select or type hearing stage..." required />
                            <datalist id="calStageList">
                                <option value="Arguments">Arguments (बहस)</option>
                                <option value="Evidence">Evidence (साक्ष्य)</option>
                                <option value="Framing of Issues">Framing of Issues (तनकीहात)</option>
                                <option value="Notice">Notice (समन)</option>
                                <option value="Cross Examination">Cross Examination (जिरह)</option>
                                <option value="Bail Hearing">Bail Hearing (ज़मानत)</option>
                                <option value="Final Order">Final Order (फैसला)</option>
                                <option value="Compliance">Compliance (अनुपालन)</option>
                                <option value="Order Reserved">Order Reserved</option>
                            </datalist>
                        </div>
                    </div>
                </div>

                <!-- Modal Footer with Save Btn -->
                <div class="cal-modal-footer">
                    <button type="button" class="btn-cal-cancel" onclick="closeCalForwardModal()">Cancel</button>
                    <button type="submit" id="calModalSaveBtn" class="btn-cal-save">
                        <span class="btn-text">Save Date</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
`;

// ==============================================================================
// Calendar View Scheduler Logic
// ==============================================================================

var _calInitToday = new Date();
var currentCalendarYear = _calInitToday.getFullYear();
var currentCalendarMonth = _calInitToday.getMonth();
var selectedCalendarDate = {
  day: _calInitToday.getDate(),
  month: _calInitToday.getMonth(),
  year: _calInitToday.getFullYear()
};

var monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function initCalendarNavControls() {
  const prevBtn = document.getElementById('calPrevMonthBtn');
  if (prevBtn && !prevBtn.dataset.hasCalNav) {
    prevBtn.dataset.hasCalNav = 'true';
    prevBtn.addEventListener('click', () => {
      let newMonth = currentCalendarMonth - 1;
      let newYear = currentCalendarYear;
      if (newMonth < 0) {
        newMonth = 11;
        newYear--;
      }
      const now = new Date();
      if (newYear === now.getFullYear() && newMonth === now.getMonth()) {
        selectedCalendarDate = { day: now.getDate(), month: now.getMonth(), year: now.getFullYear() };
      } else {
        selectedCalendarDate = null;
      }
      renderCalendarView(newYear, newMonth);
    });
  }

  const nextBtn = document.getElementById('calNextMonthBtn');
  if (nextBtn && !nextBtn.dataset.hasCalNav) {
    nextBtn.dataset.hasCalNav = 'true';
    nextBtn.addEventListener('click', () => {
      let newMonth = currentCalendarMonth + 1;
      let newYear = currentCalendarYear;
      if (newMonth > 11) {
        newMonth = 0;
        newYear++;
      }
      const now = new Date();
      if (newYear === now.getFullYear() && newMonth === now.getMonth()) {
        selectedCalendarDate = { day: now.getDate(), month: now.getMonth(), year: now.getFullYear() };
      } else {
        selectedCalendarDate = null;
      }
      renderCalendarView(newYear, newMonth);
    });
  }

  const todayBtn = document.getElementById('calTodayBtn');
  if (todayBtn && !todayBtn.dataset.hasCalNav) {
    todayBtn.dataset.hasCalNav = 'true';
    todayBtn.addEventListener('click', () => {
      const now = new Date();
      selectedCalendarDate = { day: now.getDate(), month: now.getMonth(), year: now.getFullYear() };
      renderCalendarView(now.getFullYear(), now.getMonth());
    });
  }
}

function renderCalendarView(year = currentCalendarYear, month = currentCalendarMonth) {
  initCalendarNavControls();
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

  // 1. Trailing days from previous month (High contrast, perfect alignment)
  for (let i = 0; i < firstDayOfWeek; i++) {
    const prevDayNum = totalDaysInPrevMonth - firstDayOfWeek + i + 1;
    const cell = document.createElement('div');
    cell.className = 'cal-day-cell empty-day';
    cell.innerHTML = `
      <div class="cal-day-header">
        <span class="day-number">${prevDayNum}</span>
      </div>
      <div class="day-indicators-row"></div>
    `;
    grid.appendChild(cell);
  }

  // 2. Active month days (Aligned horizontal baselines, clean category dots, no microscopic badges)
  for (let day = 1; day <= totalDaysInMonth; day++) {
    const cell = document.createElement('div');
    const isToday = isCurrentRealMonth && today.getDate() === day;
    const hearings = dayHearingsMap[day] || [];
    const hasHearings = hearings.length > 0;

    cell.className = `cal-day-cell ${isToday ? 'today-cell' : ''}`;
    if (selectedCalendarDate && selectedCalendarDate.day === day && selectedCalendarDate.month === month && selectedCalendarDate.year === year) {
      cell.classList.add('selected-day');
    }

    // Tally case categories for crisp, clean dots
    const counts = { civil: 0, criminal: 0, revenue: 0 };
    hearings.forEach(h => {
      const t = (h.caseType || 'civil').toLowerCase().trim();
      if (t === 'civil' || t === 'misc_civil') counts.civil++;
      else if (t === 'criminal' || t === 'state' || t === 'complaint' || t === 'misc_criminal') counts.criminal++;
      else if (t === 'revenue') counts.revenue++;
    });

    let hearingsHiddenPayload = '';
    if (hasHearings) {
      hearingsHiddenPayload = `
        <div class="day-hearings-payload" style="display:none;" aria-hidden="true">
          ${hearings.map(h => {
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
        </div>
      `;
    }

    cell.innerHTML = `
      <div class="cal-day-header">
        <span class="day-number">${day}</span>
      </div>
      <div class="day-indicators-row">
        ${counts.civil > 0 ? `<span class="cal-dot civil" title="${counts.civil} Civil hearing${counts.civil > 1 ? 's' : ''}"></span>` : ''}
        ${counts.criminal > 0 ? `<span class="cal-dot criminal" title="${counts.criminal} Criminal hearing${counts.criminal > 1 ? 's' : ''}"></span>` : ''}
        ${counts.revenue > 0 ? `<span class="cal-dot revenue" title="${counts.revenue} Revenue hearing${counts.revenue > 1 ? 's' : ''}"></span>` : ''}
      </div>
      ${hearingsHiddenPayload}
    `;

    cell.addEventListener('click', () => {
      grid.querySelectorAll('.cal-day-cell').forEach(c => c.classList.remove('selected-day'));
      cell.classList.add('selected-day');
      selectedCalendarDate = { day, month, year };
      calOpenCourtId = null;
      renderDaySchedule(day, month, year, hearings);
    });

    grid.appendChild(cell);
  }

  // 3. Leading days of next month to complete calendar rectangle
  const totalCellsRendered = firstDayOfWeek + totalDaysInMonth;
  const trailingRemaining = (7 - (totalCellsRendered % 7)) % 7;
  for (let d = 1; d <= trailingRemaining; d++) {
    const cell = document.createElement('div');
    cell.className = 'cal-day-cell empty-day';
    cell.innerHTML = `
      <div class="cal-day-header">
        <span class="day-number">${d}</span>
      </div>
      <div class="day-indicators-row"></div>
    `;
    grid.appendChild(cell);
  }

  // 3. Selection
  let dayToSelect = null;
  if (isCurrentRealMonth) {
    if (selectedCalendarDate && selectedCalendarDate.month === month && selectedCalendarDate.year === year && selectedCalendarDate.day) {
      dayToSelect = selectedCalendarDate.day;
    } else {
      dayToSelect = today.getDate();
      selectedCalendarDate = { day: dayToSelect, month, year };
    }
  } else if (selectedCalendarDate && selectedCalendarDate.month === month && selectedCalendarDate.year === year && selectedCalendarDate.day) {
    dayToSelect = selectedCalendarDate.day;
  } else {
    const firstDayWithHearings = Object.keys(dayHearingsMap)[0];
    if (firstDayWithHearings) {
      dayToSelect = parseInt(firstDayWithHearings, 10);
      selectedCalendarDate = { day: dayToSelect, month, year };
    } else {
      dayToSelect = 1;
      selectedCalendarDate = { day: 1, month, year };
    }
  }

  const activeCells = grid.querySelectorAll('.cal-day-cell:not(.empty-day)');
  if (dayToSelect && activeCells[dayToSelect - 1]) {
    grid.querySelectorAll('.cal-day-cell').forEach(c => c.classList.remove('selected-day'));
    activeCells[dayToSelect - 1].classList.add('selected-day');
  }

  renderDaySchedule(dayToSelect, month, year, dayHearingsMap[dayToSelect] || []);
}

// ==============================================================================
// Collapsible Day Schedule Engine & View State
// ==============================================================================

var currentDayRawHearings = [];
var calExpandedCases = new Set();
var calOpenCourtId = null; // Default collapsed, at most one court open at a time
var calScheduleSearchQuery = '';

var _pad = n => String(n).padStart(2, '0');
var _WD = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var _MO = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function _calTodayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${_pad(d.getMonth() + 1)}-${_pad(d.getDate())}`;
}

function _calIsoToDate(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
  if (!m) return null;
  return new Date(+m[1], +m[2] - 1, +m[3]);
}

function _calToISO(s) {
  if (!s) return '';
  s = String(s).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  const m = /^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{4})$/.exec(s);
  if (!m) return '';
  const d = +m[1], mo = +m[2], y = +m[3];
  if (mo < 1 || mo > 12 || d < 1 || d > 31) return '';
  return `${y}-${_pad(mo)}-${_pad(d)}`;
}

function _calIsoToDisplay(iso) {
  const d = _calIsoToDate(iso);
  return d ? `${_pad(d.getDate())}/${_pad(d.getMonth() + 1)}/${d.getFullYear()}` : '';
}

function _calIsoPretty(iso) {
  const d = _calIsoToDate(iso);
  return d ? `${_WD[d.getDay()]}, ${_pad(d.getDate())} ${_MO[d.getMonth()]} ${d.getFullYear()}` : '';
}

function _calDiffDays(iso) {
  const a = _calIsoToDate(iso), b = _calIsoToDate(_calTodayISO());
  if (!a || !b) return NaN;
  return Math.round((a - b) / 86400000);
}

function _calRelativeLabel(iso) {
  const n = _calDiffDays(iso);
  if (isNaN(n)) return '';
  if (n === 0) return 'Today';
  if (n === 1) return 'Tomorrow';
  if (n === -1) return 'Yesterday';
  if (n > 1) return `in ${n} days`;
  return `overdue by ${-n} days`;
}

function _calDateClass(iso) {
  const n = _calDiffDays(iso);
  if (n < 0) return 'past';
  if (n === 0) return 'today';
  if (n <= 3) return 'soon';
  return '';
}

function _calShiftISO(iso, { days = 0, months = 0 } = {}) {
  const d = _calIsoToDate(iso) || new Date();
  if (months) d.setMonth(d.getMonth() + months);
  if (days) d.setDate(d.getDate() + days);
  return `${d.getFullYear()}-${_pad(d.getMonth() + 1)}-${_pad(d.getDate())}`;
}

function _calDateMeta(iso) {
  if (!iso) return null;
  return {
    disp: _calIsoToDisplay(iso),
    pretty: _calIsoPretty(iso),
    rel: _calRelativeLabel(iso),
    cls: _calDateClass(iso),
    diff: _calDiffDays(iso)
  };
}

// LocalStorage Persistence Helpers for Done & Notes
function _getCalDoneStorage(dateKey) {
  try {
    return JSON.parse(localStorage.getItem(`cal_done:${dateKey}`) || '{}');
  } catch (e) {
    return {};
  }
}

function _saveCalDoneStorage(dateKey, data) {
  try {
    localStorage.setItem(`cal_done:${dateKey}`, JSON.stringify(data));
  } catch (e) {}
}

function _getCalEditsStorage(dateKey) {
  try {
    return JSON.parse(localStorage.getItem(`cal_edits:${dateKey}`) || '{}');
  } catch (e) {
    return {};
  }
}

function _saveCalEditsStorage(dateKey, data) {
  try {
    localStorage.setItem(`cal_edits:${dateKey}`, JSON.stringify(data));
  } catch (e) {}
}

function initScheduleToolbarControls() {
  const searchInput = document.getElementById('dayScheduleSearch');
  if (searchInput && !searchInput.dataset.hasCalToolbar) {
    searchInput.dataset.hasCalToolbar = 'true';
    let debounceTimer;
    searchInput.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        calScheduleSearchQuery = searchInput.value.trim().toLowerCase();
        if (selectedCalendarDate) {
          renderDaySchedule(selectedCalendarDate.day, selectedCalendarDate.month, selectedCalendarDate.year, currentDayRawHearings);
        }
      }, 120);
    });
  }

  const expandBtn = document.getElementById('calExpandAllBtn');
  if (expandBtn && !expandBtn.dataset.hasCalToolbar) {
    expandBtn.dataset.hasCalToolbar = 'true';
    expandBtn.addEventListener('click', () => {
      document.querySelectorAll('#dayScheduleSection .court').forEach(sec => {
        sec.classList.add('open');
        const head = sec.querySelector('.court-head');
        if (head) head.setAttribute('aria-expanded', 'true');
      });
      document.querySelectorAll('#dayScheduleSection .case').forEach(art => {
        art.classList.add('open');
        const row = art.querySelector('.case-row');
        if (row) row.setAttribute('aria-expanded', 'true');
        if (art.dataset.id) calExpandedCases.add(art.dataset.id);
      });
    });
  }

  const collapseBtn = document.getElementById('calCollapseAllBtn');
  if (collapseBtn && !collapseBtn.dataset.hasCalToolbar) {
    collapseBtn.dataset.hasCalToolbar = 'true';
    collapseBtn.addEventListener('click', () => {
      calOpenCourtId = null;
      document.querySelectorAll('#dayScheduleSection .court').forEach(sec => {
        sec.classList.remove('open');
        const head = sec.querySelector('.court-head');
        if (head) head.setAttribute('aria-expanded', 'false');
      });
      document.querySelectorAll('#dayScheduleSection .case').forEach(art => {
        art.classList.remove('open');
        const row = art.querySelector('.case-row');
        if (row) row.setAttribute('aria-expanded', 'false');
        if (art.dataset.id) calExpandedCases.delete(art.dataset.id);
      });
    });
  }
}

// ==============================================================================
// Small Forward Date Modal Logic (nextDate, stage, save Btn)
// ==============================================================================

function initCalForwardModalControls() {
  const modal = document.getElementById('calForwardDateModal');
  if (!modal || modal.dataset.hasCalModalInit) return;
  modal.dataset.hasCalModalInit = 'true';

  const dateInput = document.getElementById('calModalNextDate');
  const previewEl = document.getElementById('calModalDatePreview');

  const updatePreview = () => {
    if (!previewEl || !dateInput) return;
    const iso = _calToISO(dateInput.value);
    const meta = iso ? _calDateMeta(iso) : null;
    previewEl.textContent = meta ? `${meta.pretty} (${meta.rel})` : 'Select a date';
  };

  if (dateInput) {
    dateInput.addEventListener('input', updatePreview);
    dateInput.addEventListener('change', updatePreview);
  }

  modal.querySelectorAll('.cal-modal-quick-pills button').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!dateInput) return;
      let iso;
      if (btn.dataset.clear) iso = '';
      else if (btn.dataset.month) iso = _calShiftISO(_calTodayISO(), { months: +btn.dataset.month });
      else iso = _calShiftISO(_calTodayISO(), { days: +btn.dataset.shift });
      dateInput.value = iso;
      updatePreview();
      dateInput.focus();
    });
  });

  modal.addEventListener('click', e => {
    if (e.target === modal) {
      closeCalForwardModal();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.style.display !== 'none') {
      closeCalForwardModal();
    }
  });
}

function openCalForwardModal(caseNo) {
  initCalForwardModalControls();

  const modal = document.getElementById('calForwardDateModal');
  if (!modal) return;

  const targetCaseNo = String(caseNo || '').trim();
  const caseInput = document.getElementById('calModalCaseNo');
  const subEl = document.getElementById('calModalCaseSub');
  const dateInput = document.getElementById('calModalNextDate');
  const stageInput = document.getElementById('calModalStage');
  const previewEl = document.getElementById('calModalDatePreview');

  if (caseInput) caseInput.value = targetCaseNo;

  const records =
    typeof allCaseRecords !== 'undefined' && Array.isArray(allCaseRecords)
      ? allCaseRecords
      : typeof window !== 'undefined' && Array.isArray(window.allCaseRecords)
        ? window.allCaseRecords
        : currentDayRawHearings;

  const foundCase = records.find(c => {
    const c1 = (c.caseNo || '').toLowerCase();
    const c2 = (c.criminalCaseNumber || '').toLowerCase();
    const c3 = (c.case_number || '').toLowerCase();
    const t = targetCaseNo.toLowerCase();
    return c1 === t || c2 === t || c3 === t;
  }) || {};

  let title = (foundCase.caseName || foundCase.case_title || '').trim();
  if (!title || title.toLowerCase() === 'vs') {
    if (foundCase.plaintiff && foundCase.defendant) title = `${foundCase.plaintiff} vs ${foundCase.defendant}`;
    else if (foundCase.petitioner && foundCase.respondent) title = `${foundCase.petitioner} vs ${foundCase.respondent}`;
    else if (foundCase.accusedName) title = `State vs ${foundCase.accusedName}`;
    else title = 'Court Matter';
  }

  if (subEl) {
    subEl.textContent = `${targetCaseNo || 'Matter'} • ${title}`;
  }

  let nextDateISO = _calToISO(foundCase.nextHearing || '');
  if (!nextDateISO || _calDiffDays(nextDateISO) <= 0) {
    nextDateISO = _calShiftISO(_calTodayISO(), { days: 14 });
  }

  if (dateInput) {
    dateInput.value = nextDateISO;
  }

  if (previewEl) {
    const meta = nextDateISO ? _calDateMeta(nextDateISO) : null;
    previewEl.textContent = meta ? `${meta.pretty} (${meta.rel})` : 'Select a date';
  }

  let stageVal = (foundCase.hearingProcess || foundCase.stage || foundCase.process || '').trim();
  if (!stageVal || stageVal.toLowerCase() === 'na' || stageVal.toLowerCase() === 'n/a') {
    stageVal = 'Arguments';
  }
  if (stageInput) {
    stageInput.value = stageVal;
  }

  modal.style.display = 'flex';
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  if (document.body) document.body.style.overflow = 'hidden';

  setTimeout(() => {
    if (dateInput) dateInput.focus();
  }, 50);
}

function closeCalForwardModal() {
  const modal = document.getElementById('calForwardDateModal');
  if (!modal) return;
  modal.style.display = 'none';
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  if (document.body) document.body.style.overflow = '';
}

async function saveCalForwardDate() {
  const caseNoInput = document.getElementById('calModalCaseNo');
  const dateInput = document.getElementById('calModalNextDate');
  const stageInput = document.getElementById('calModalStage');
  const saveBtn = document.getElementById('calModalSaveBtn');

  const caseNo = caseNoInput ? caseNoInput.value.trim() : '';
  const nextDate = dateInput ? dateInput.value.trim() : '';
  const stage = stageInput ? stageInput.value.trim() : 'Hearing';

  if (!caseNo || !nextDate) {
    alert('Please enter a valid hearing date.');
    return;
  }

  if (saveBtn) {
    saveBtn.disabled = true;
    saveBtn.innerHTML = '<span class="btn-text">Saving...</span>';
  }

  try {
    if (typeof updateHearingInSupabase === 'function') {
      try {
        await updateHearingInSupabase(caseNo, nextDate, stage, `Scheduled stage: ${stage}`);
      } catch (err) {
        console.warn('updateHearingInSupabase error:', err);
      }
    } else if (typeof window !== 'undefined' && typeof window.updateHearingInSupabase === 'function') {
      try {
        await window.updateHearingInSupabase(caseNo, nextDate, stage, `Scheduled stage: ${stage}`);
      } catch (err) {
        console.warn('window.updateHearingInSupabase error:', err);
      }
    }

    const records =
      typeof allCaseRecords !== 'undefined' && Array.isArray(allCaseRecords)
        ? allCaseRecords
        : typeof window !== 'undefined' && Array.isArray(window.allCaseRecords)
          ? window.allCaseRecords
          : [];

    const target = records.find(c => {
      const c1 = (c.caseNo || '').toLowerCase();
      const c2 = (c.criminalCaseNumber || '').toLowerCase();
      const c3 = (c.case_number || '').toLowerCase();
      const t = caseNo.toLowerCase();
      return c1 === t || c2 === t || c3 === t;
    });

    if (target) {
      target.nextHearing = nextDate;
      target.next_hearing = nextDate;
      target.nextHearingDate = nextDate;
      target.hearingProcess = stage;
      target.process = stage;
      target.forwardDate = nextDate;
    }

    const inCurrentDay = currentDayRawHearings.find(c => {
      const c1 = (c.caseNo || '').toLowerCase();
      const c2 = (c.criminalCaseNumber || '').toLowerCase();
      const t = caseNo.toLowerCase();
      return c1 === t || c2 === t;
    });
    if (inCurrentDay) {
      inCurrentDay.forwardDate = nextDate;
      inCurrentDay.hearingProcess = stage;
    }

    const todayFormattedKey = `${currentCalendarYear}-${_pad(currentCalendarMonth + 1)}-${_pad(selectedCalendarDate ? selectedCalendarDate.day : 1)}`;
    const currentEdits = _getCalEditsStorage(todayFormattedKey);
    currentEdits[caseNo] = currentEdits[caseNo] || {};
    currentEdits[caseNo].nextDate = nextDate;
    currentEdits[caseNo].stage = stage;
    _saveCalEditsStorage(todayFormattedKey, currentEdits);

    closeCalForwardModal();

    if (typeof renderCalendarView === 'function') {
      renderCalendarView(currentCalendarYear, currentCalendarMonth);
    }
    if (selectedCalendarDate && typeof renderDaySchedule === 'function') {
      renderDaySchedule(selectedCalendarDate.day, selectedCalendarDate.month, selectedCalendarDate.year, currentDayRawHearings);
    }
  } finally {
    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.innerHTML = '<span class="btn-text">Save Date</span>';
    }
  }
}

// ==============================================================================
// renderDaySchedule Implementation (Cleaned up data mismatches & responsive flow)
// ==============================================================================

function renderDaySchedule(day, month, year, rawHearings = []) {
  currentDayRawHearings = Array.isArray(rawHearings) ? rawHearings : [];

  const titleEl = document.getElementById('selectedDateTitle');
  const dateTextEl = document.getElementById('selectedDateFormattedText');
  const badgeEl = document.getElementById('selectedDateCountBadge');
  const progressEl = document.getElementById('dayScheduleProgress');
  const listEl = document.getElementById('dayScheduleList');
  const courtSelect = document.getElementById('causeListCourtFilter');

  initScheduleToolbarControls();
  initCalForwardModalControls();

  const dateFormatted = `${_pad(day)}/${_pad(month + 1)}/${year}`;
  const dateISOKey = `${year}-${_pad(month + 1)}-${_pad(day)}`;

  if (titleEl) {
    titleEl.textContent = 'Scheduled Hearings';
  }

  if (dateTextEl) {
    dateTextEl.textContent = `📆 ${dateFormatted}`;
  }

  if (courtSelect && !courtSelect.dataset.hasCalListener) {
    courtSelect.dataset.hasCalListener = 'true';
    courtSelect.addEventListener('change', () => {
      if (selectedCalendarDate) {
        renderDaySchedule(selectedCalendarDate.day, selectedCalendarDate.month, selectedCalendarDate.year, currentDayRawHearings);
      }
    });
  }

  const selectedCourt = (courtSelect ? courtSelect.value : '').trim().toLowerCase();
  let filteredHearings = selectedCourt
    ? currentDayRawHearings.filter(h => {
        const cCourt = (h.courtName || h.criminalCourtName || h.court || '').trim().toLowerCase();
        return cCourt === selectedCourt;
      })
    : currentDayRawHearings;

  if (badgeEl) {
    const count = filteredHearings.length;
    badgeEl.textContent = `${count} ${count === 1 ? 'HEARING' : 'HEARINGS'}`;
    badgeEl.className = `header-badge ${count > 0 ? 'active' : ''}`;
  }

  if (!listEl) return;

  const esc = typeof escapeHtml === 'function'
    ? escapeHtml
    : str => String(str || '').replace(/[&<>"']/g, s => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s]));

  if (!filteredHearings || filteredHearings.length === 0) {
    const emptyMarkup = `
      <div class="empty-schedule-cell">
        <p class="empty-schedule-msg">No hearings scheduled on <strong>${dateFormatted}</strong>${selectedCourt ? ' for selected court' : ''}.</p>
      </div>
    `;
    if (listEl.tagName === 'TBODY') {
      listEl.innerHTML = `<tr class="empty-schedule-row"><td colspan="3" class="empty-schedule-cell">${emptyMarkup}</td></tr>`;
    } else {
      listEl.innerHTML = emptyMarkup;
    }
    if (progressEl) progressEl.style.display = 'none';
    return;
  }

  const doneStore = _getCalDoneStorage(dateISOKey);
  const editsStore = _getCalEditsStorage(dateISOKey);

  const q = calScheduleSearchQuery;
  const matchesSearch = (h, courtName) => {
    if (!q) return true;
    const caseNo = h.caseNo || h.criminalCaseNumber || h.case_number || '';
    const parties = h.caseName || `${h.plaintiff || ''} ${h.defendant || ''} ${h.petitioner || ''} ${h.respondent || ''} ${h.accusedName || ''}`;
    const stage = h.hearingProcess || h.process || h.stage || '';
    const client = h.clientName || h.criminalClientName || h.client || '';
    const notes = (editsStore[caseNo] && editsStore[caseNo].notes) || h.remark || '';
    const hay = [caseNo, parties, stage, client, courtName, notes].join(' ').toLowerCase();
    return hay.includes(q);
  };

  const courtGroups = {};
  filteredHearings.forEach((h, index) => {
    const courtName = (h.courtName || h.criminalCourtName || h.court || 'District Court').trim();
    if (!matchesSearch(h, courtName)) return;

    if (!courtGroups[courtName]) {
      courtGroups[courtName] = {
        name: courtName,
        judge: (h.judgeName || h.judge || '').trim(),
        cases: []
      };
    } else if (!courtGroups[courtName].judge && (h.judgeName || h.judge)) {
      courtGroups[courtName].judge = (h.judgeName || h.judge || '').trim();
    }
    courtGroups[courtName].cases.push({ ...h, originalIndex: index });
  });

  const courtKeys = Object.keys(courtGroups);
  const totalMatchingCases = courtKeys.reduce((acc, k) => acc + courtGroups[k].cases.length, 0);

  if (progressEl) {
    if (totalMatchingCases > 0) {
      let doneCount = 0;
      courtKeys.forEach(k => {
        courtGroups[k].cases.forEach(c => {
          const caseNo = c.caseNo || c.criminalCaseNumber || c.case_number || `c-${c.originalIndex}`;
          if (doneStore[caseNo]) doneCount++;
        });
      });
      progressEl.textContent = `${doneCount} of ${totalMatchingCases} done`;
      progressEl.style.display = 'inline-flex';
    } else {
      progressEl.style.display = 'none';
    }
  }

  if (courtKeys.length === 0) {
    const noMatchMarkup = `
      <div class="empty-schedule-cell">
        <p class="empty-schedule-msg">No hearings match <strong>"${esc(q)}"</strong> on ${dateFormatted}.</p>
      </div>
    `;
    if (listEl.tagName === 'TBODY') {
      listEl.innerHTML = `<tr class="empty-schedule-row"><td colspan="3">${noMatchMarkup}</td></tr>`;
    } else {
      listEl.innerHTML = noMatchMarkup;
    }
    return;
  }

  // 5. Build Collapsible Court Blocks HTML with Smart Party & Side Disambiguation
  let html = '';
  courtKeys.forEach((courtKey, cIdx) => {
    const court = courtGroups[courtKey];
    const courtId = `court-${cIdx}`;
    const isCourtOpen = q ? true : (calOpenCourtId === courtId);

    let casesHtml = '';
    court.cases.forEach((c, idx) => {
      const caseNo = c.caseNo || c.criminalCaseNumber || c.case_number || '—';
      const caseId = caseNo !== '—' ? caseNo : `idx-${c.originalIndex}`;
      const isCaseOpen = calExpandedCases.has(caseId);
      const isDone = !!doneStore[caseId];

      let rawStage = (c.hearingProcess || c.process || c.stage || '').trim();
      const displayStage = (!rawStage || rawStage.toLowerCase() === 'na' || rawStage.toLowerCase() === 'n/a') ? 'Hearing' : rawStage;

      const client = (c.clientName || c.criminalClientName || c.client || '—').trim();
      const phone = (c.clientNumber || c.criminalClientNumber || c.clientPhone || c.criminalClientPhone || c.phone || c.contact || '').trim();
      const rawType = (c.caseType || 'civil').toLowerCase().trim();

            // Resolve Real Case Title & Clean Parties (Avoid "Defendant: Defendant" Glitch)
      let plaintiff = (c.plaintiff || '').trim();
      let defendant = (c.defendant || '').trim();
      let partyName = (c.partyName || c.party_name || '').trim();
      let caseTitle = (c.caseName || c.case_title || c.caseTitle || c.title || '').trim();

      const partyMatchesPlaintiff = partyName && plaintiff && (
        partyName.toLowerCase() === plaintiff.toLowerCase() ||
        plaintiff.toLowerCase().includes(partyName.toLowerCase()) ||
        partyName.toLowerCase().includes(plaintiff.toLowerCase())
      );

      // Disambiguate placeholder "Defendant" or "Plaintiff" string
      const isDefPlaceholder = !defendant ||
        defendant.toLowerCase() === 'defendant' ||
        defendant.toLowerCase() === 'defendants' ||
        (plaintiff && defendant.toLowerCase() === plaintiff.toLowerCase());

      if (isDefPlaceholder) {
        if (caseTitle && /\b(?:vs\.?|v\.?|versus)\b/i.test(caseTitle)) {
          const vsParts = caseTitle.split(/\s+(?:vs\.?|v\.?|versus)\s+/i);
          const candidateDef = (vsParts[1] || '').trim();
          if (candidateDef && candidateDef.toLowerCase() !== 'defendant' && candidateDef.toLowerCase() !== plaintiff.toLowerCase()) {
            defendant = candidateDef;
          }
        }
        
        if (!defendant || isDefPlaceholder) {
          if (client && client !== '—' && (!plaintiff || !plaintiff.toLowerCase().includes(client.toLowerCase()))) {
            defendant = client;
          } else if (partyName && partyName.toLowerCase() !== 'defendant' && !partyMatchesPlaintiff) {
            defendant = partyName;
          }
        }
      }

      const isPlainPlaceholder = !plaintiff ||
        plaintiff.toLowerCase() === 'plaintiff' ||
        plaintiff.toLowerCase() === 'plaintiffs' ||
        (defendant && plaintiff.toLowerCase() === defendant.toLowerCase());

      if (isPlainPlaceholder) {
        if (caseTitle && /\b(?:vs\.?|v\.?|versus)\b/i.test(caseTitle)) {
          const vsParts = caseTitle.split(/\s+(?:vs\.?|v\.?|versus)\s+/i);
          const candidatePlain = (vsParts[0] || '').trim();
          if (candidatePlain && candidatePlain.toLowerCase() !== 'plaintiff' && candidatePlain.toLowerCase() !== defendant.toLowerCase()) {
            plaintiff = candidatePlain;
          }
        }
        
        if (!plaintiff || isPlainPlaceholder) {
          if (partyMatchesPlaintiff && partyName) {
            plaintiff = partyName;
          } else if (client && client !== '—' && (!defendant || !defendant.toLowerCase().includes(client.toLowerCase()))) {
            plaintiff = client;
          }
        }
      }

      // If both still match each other, use client disambiguation
      if (plaintiff && defendant && plaintiff.toLowerCase() === defendant.toLowerCase()) {
        if (client && client !== '—' && !plaintiff.toLowerCase().includes(client.toLowerCase())) {
          defendant = client;
        } else {
          defendant = 'Opposing Party';
        }
      }

      if (!caseTitle || caseTitle.toLowerCase() === 'vs' || caseTitle.toLowerCase() === 'vs.') {
        if (plaintiff && defendant && defendant.toLowerCase() !== 'defendant' && defendant.toLowerCase() !== plaintiff.toLowerCase()) {
          caseTitle = `${plaintiff} vs ${defendant}`;
        } else if (c.petitioner && c.respondent) {
          caseTitle = `${c.petitioner} vs ${c.respondent}`;
        } else if (c.victimName && c.accusedName) {
          caseTitle = `State vs ${c.accusedName}`;
        } else if (plaintiff && client && client !== '—' && !plaintiff.toLowerCase().includes(client.toLowerCase())) {
          caseTitle = `${plaintiff} vs ${client}`;
        } else {
          caseTitle = plaintiff || 'Matter';
        }
      }

            // Resolve Clean Case Name (Title) to simply show caseName and number
      let displayCaseName = caseTitle;
      if (!displayCaseName || displayCaseName.toLowerCase() === 'vs' || displayCaseName.toLowerCase() === 'vs.') {
        if (plaintiff && defendant && defendant.toLowerCase() !== 'defendant' && defendant.toLowerCase() !== plaintiff.toLowerCase()) {
          displayCaseName = `${plaintiff} vs ${defendant}`;
        } else if (c.petitioner && c.respondent) {
          displayCaseName = `${c.petitioner} vs ${c.respondent}`;
        } else if (c.victimName && c.accusedName) {
          displayCaseName = `State vs ${c.accusedName}`;
        } else if (plaintiff && client && client !== '—' && !plaintiff.toLowerCase().includes(client.toLowerCase())) {
          displayCaseName = `${plaintiff} vs ${client}`;
        } else if (plaintiff) {
          displayCaseName = plaintiff;
        } else if (client && client !== '—') {
          displayCaseName = client;
        } else {
          displayCaseName = 'Matter';
        }
      }

      // Smart Side / For Resolution (Determines represented client's true side)
      let sideText = 'Client Representation';
      const clientClean = (client !== '—' ? client : '').toLowerCase();
      const plaintiffClean = (plaintiff !== '—' ? plaintiff : '').toLowerCase();
      const defClean = (defendant !== '—' && defendant.toLowerCase() !== 'defendant' ? defendant : '').toLowerCase();
      const accusedClean = (c.accusedName || '').toLowerCase();
      const explicitSide = (c.clientSide || c.side || c.representedSide || '').toLowerCase();

      if (explicitSide.includes('def') || explicitSide.includes('resp')) {
        sideText = 'Defendant / Respondent';
      } else if (explicitSide.includes('plain') || explicitSide.includes('pet')) {
        sideText = 'Plaintiff / Petitioner';
      } else if (explicitSide.includes('accused') || explicitSide.includes('defen')) {
        sideText = 'Defense / Accused';
      } else if (clientClean && defClean && (defClean.includes(clientClean) || clientClean.includes(defClean))) {
        sideText = 'Defendant / Respondent';
      } else if (clientClean && plaintiffClean && (plaintiffClean.includes(clientClean) || clientClean.includes(plaintiffClean))) {
        sideText = 'Plaintiff / Petitioner';
      } else if (accusedClean && (accusedClean.includes(clientClean) || clientClean.includes(accusedClean))) {
        sideText = 'Defense / Accused';
      } else if (clientClean && plaintiffClean && !plaintiffClean.includes(clientClean)) {
        sideText = 'Defendant / Respondent';
      } else if (clientClean && defClean && !defClean.includes(clientClean)) {
        sideText = 'Plaintiff / Petitioner';
      } else if (plaintiff && !defClean) {
        sideText = 'Plaintiff';
      } else if (c.petitioner) {
        sideText = 'Petitioner';
      }

      // Clean Court / Judge Display (Never repeat court name)
      const isJudgeAssigned = court.judge && court.judge.trim() && court.judge.toLowerCase() !== court.name.toLowerCase();
      const judgeDisplay = isJudgeAssigned ? court.judge : 'Presiding Officer';

      // Next hearing / forward date chip
      const caseEdits = editsStore[caseId] || {};
      const forwardISO = _calToISO(caseEdits.nextDate || c.forwardDate || '');
      const meta = forwardISO ? _calDateMeta(forwardISO) : null;
      let nextChipMarkup = '';
      if (meta) {
        let chipLabel = `→ ${meta.disp}`;
        if (meta.diff === 0) chipLabel = '→ Today';
        else if (meta.diff === 1) chipLabel = '→ Tomorrow';
        nextChipMarkup = `<span class="next-chip ${meta.cls}" onclick="event.stopPropagation(); openCalForwardModal('${esc(caseNo)}')" title="${esc(meta.pretty)} · ${esc(meta.rel)} (Click to forward)">${esc(chipLabel)}</span>`;
      }

      // Action buttons: 3 full-width action buttons taking 33% width each (Call, WhatsApp, Forward Date)
      const callBtn = phone
        ? `<a href="tel:${esc(phone)}" class="action-btn-icon call" title="Call client: ${esc(phone)}" aria-label="Call Client">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            <span class="btn-lbl">Call</span>
          </a>`
        : `<button type="button" class="action-btn-icon call disabled" title="No client phone" disabled aria-label="Call Client">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            <span class="btn-lbl">Call</span>
          </button>`;

      const waBtn = `<button type="button" class="action-btn-icon whatsapp" onclick="sendWhatsAppHearingNotice('${esc(caseNo)}')" title="Send WhatsApp court notice" aria-label="WhatsApp Notice">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
        <span class="btn-lbl">WhatsApp</span>
      </button>`;

      const forwardIconBtn = `<button type="button" class="action-btn-icon forward" onclick="openCalForwardModal('${esc(caseNo)}')" title="Forward Hearing Date & Stage" aria-label="Forward Date">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
        <span class="btn-lbl">Forward</span>
      </button>`;

      casesHtml += `
        <article class="case ${isDone ? 'is-done' : ''}" data-id="${esc(caseId)}">
          <div class="case-row">
            <div class="case-header-row">
              <span class="sl">${idx + 1}</span>
              <div class="case-info-col">
                <span class="case-name" title="${esc(displayCaseName)}">${esc(displayCaseName)}</span>
                <div class="case-meta-row">
                  <span class="case-no parties" style="display: none;" title="${esc(caseNo)}">${esc(caseNo)}</span>
                  <div class="case-badges-group">
                    <span class="chip ${esc(rawType)}">${esc(displayStage)}</span>
                    ${nextChipMarkup}
                  </div>
                </div>
              </div>
              <div class="case-controls-group">
                <label class="done-wrap" title="Mark hearing as completed">
                  <input type="checkbox" class="done-box" ${isDone ? 'checked' : ''} aria-label="Mark ${esc(caseNo)} done">
                </label>
              </div>
            </div>
            <div class="case-row-actions">
              ${callBtn}
              ${waBtn}
              ${forwardIconBtn}
            </div>
          </div>
        </article>
      `;
    });

    html += `
      <section class="court ${isCourtOpen ? 'open' : ''}" data-court="${esc(courtId)}">
        <button type="button" class="court-head" aria-expanded="${isCourtOpen}">
          <span class="court-icon" aria-hidden="true">🏛️</span>
          <span class="court-name">${esc(court.name)}</span>
          ${court.judge ? `<span class="court-judge">👨‍⚖️ ${esc(court.judge)}</span>` : ''}
          <span class="count">${court.cases.length}</span>
          <span class="caret" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </span>
        </button>
        <div class="court-body">
          <div>
            ${casesHtml}
          </div>
        </div>
      </section>
    `;
  });

  if (listEl.tagName === 'TBODY') {
    listEl.innerHTML = `<tr class="collapsible-schedule-row"><td colspan="3">${html}</td></tr>`;
  } else {
    listEl.innerHTML = html;
  }

  // 6. Bind interactive event handlers (Accordion: at a time only one will open)
  listEl.querySelectorAll('.court-head').forEach(headBtn => {
    headBtn.addEventListener('click', () => {
      const sec = headBtn.closest('.court');
      if (!sec) return;
      const cid = sec.dataset.court;
      const isAlreadyOpen = sec.classList.contains('open');

      // Close all courts
      listEl.querySelectorAll('.court').forEach(otherSec => {
        otherSec.classList.remove('open');
        const otherBtn = otherSec.querySelector('.court-head');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });

      if (!isAlreadyOpen) {
        sec.classList.add('open');
        headBtn.setAttribute('aria-expanded', 'true');
        calOpenCourtId = cid;
      } else {
        calOpenCourtId = null;
      }
    });
  });

  listEl.querySelectorAll('.case').forEach(article => {
    const caseId = article.dataset.id;
    const doneBox = article.querySelector('.done-box');

    if (doneBox) {
      doneBox.addEventListener('change', () => {
        const isChecked = doneBox.checked;
        const currentDone = _getCalDoneStorage(dateISOKey);
        if (isChecked) {
          currentDone[caseId] = true;
        } else {
          delete currentDone[caseId];
        }
        _saveCalDoneStorage(dateISOKey, currentDone);
        article.classList.toggle('is-done', isChecked);

        if (progressEl) {
          const total = listEl.querySelectorAll('.case').length;
          const doneCount = listEl.querySelectorAll('.case.is-done').length;
          progressEl.textContent = `${doneCount} of ${total} done`;
        }
      });
    }
  });
}

if (typeof renderCalendarView !== 'undefined') window.renderCalendarView = renderCalendarView;
if (typeof renderDaySchedule !== 'undefined') window.renderDaySchedule = renderDaySchedule;
if (typeof monthNames !== 'undefined') window.monthNames = monthNames;

if (typeof openCalForwardModal !== 'undefined') window.openCalForwardModal = openCalForwardModal;
if (typeof closeCalForwardModal !== 'undefined') window.closeCalForwardModal = closeCalForwardModal;
if (typeof saveCalForwardDate !== 'undefined') window.saveCalForwardDate = saveCalForwardDate;
