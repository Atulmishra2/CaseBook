window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs['calendar'] = `
    <!-- Master Calendar Header Banner (Image 1 Style) -->
    <header class="board-head calendar-master-head">
        <div class="head-left">
            <div class="h1">
                <span class="crest" aria-hidden="true"><i class="fa-solid fa-calendar-days"></i></span>
                <span class="h1-text" id="selectedDateTitle">Master Calendar Scheduler</span>
            </div>
            <div class="sub" id="causeListSubline">
                <b id="selectedDateFormattedText">Today</b> · <span id="selectedDateCountBadge">0 listings</span>
            </div>
        </div>
    </header>

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

    <!-- Full-Width Master Calendar Grid Card -->
    <div class="calendar-fullwidth-wrapper">
        <div class="calendar-grid-container">
            <div class="calendar-top-bar">
                <div class="calendar-header-titles">
                    <h2 id="calendarMonthYear">Court Calendar</h2>
                </div>
                <div class="calendar-controls">
                    <button type="button" id="calPrevMonthBtn" class="cal-nav-btn" title="Previous Month">◀ Prev</button>
                    <button type="button" id="calTodayBtn" class="cal-today-btn">Today</button>
                    <button type="button" id="calNextMonthBtn" class="cal-nav-btn" title="Next Month">Next ▶</button>
                </div>
            </div>

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
    </div>

    <!-- Daily Cause List Table Board for Selected Day -->
    <div class="board causelist-board-shell calendar-cause-board" id="dayScheduleSection">
        <!-- 5-Column Sorting Header Row -->
        <div class="table-sorting-row" role="row">
            <button type="button" class="sort-th col-title" onclick="calSortTable('title')" title="Sort by Title">
                <span>Case Title</span> <i class="fa-solid fa-sort" id="sortIconTitle"></i>
            </button>
            <button type="button" class="sort-th col-court" onclick="calSortTable('court')" title="Sort by Court Forum">
                <span>Court Forum</span> <i class="fa-solid fa-sort" id="sortIconCourt"></i>
            </button>
            <button type="button" class="sort-th col-no" onclick="calSortTable('caseno')" title="Sort by Case Number">
                <span>Case No</span> <i class="fa-solid fa-sort" id="sortIconCaseNo"></i>
            </button>
            <button type="button" class="sort-th col-tag" onclick="calSortTable('tag')" title="Sort by Category">
                <span>Category</span> <i class="fa-solid fa-sort" id="sortIconTag"></i>
            </button>
            <button type="button" class="sort-th col-toggle" onclick="calToggleAllCases()" title="Expand / Collapse All">
                <i class="fa-solid fa-chevron-down" id="toggleAllChevron"></i>
            </button>
        </div>

        <!-- MATTERS LIST -->
        <div class="list" id="dayScheduleList" role="region" aria-label="Daily Matters Schedule">
            <!-- Cause list cards rendered dynamically by renderDaySchedule() -->
        </div>

        <!-- FOOTER -->
        <footer class="foot">
            <span class="live">
                <i aria-hidden="true"></i>
                <span id="calScheduleFooterCount">Showing 0 of 0 cases</span>
            </span>
            <span class="foot-sync">Updated live <span class="sep">·</span> Sync OK</span>
        </footer>
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

function calGoPrevMonth() {
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
}

function calGoNextMonth() {
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
}

function initCalendarSwipeControls() {
  const container = document.querySelector('#calendar .calendar-grid-container') || document.querySelector('.calendar-grid-container');
  if (!container || container.dataset.hasCalSwipe) return;
  container.dataset.hasCalSwipe = 'true';

  let startX = 0;
  let startY = 0;
  let startTime = 0;

  container.addEventListener('touchstart', (e) => {
    if (!e.touches || e.touches.length !== 1) return;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    startTime = Date.now();
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    if (!e.changedTouches || e.changedTouches.length !== 1) return;
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = endX - startX;
    const diffY = endY - startY;
    const deltaTime = Date.now() - startTime;

    // Must be a predominantly horizontal swipe within a reasonable duration
    if (deltaTime > 800) return;
    if (Math.abs(diffX) < 45) return;
    if (Math.abs(diffX) <= Math.abs(diffY) * 1.2) return;

    if (diffX < 0) {
      // Swipe left -> advance to next month
      calGoNextMonth();
    } else {
      // Swipe right -> go to previous month
      calGoPrevMonth();
    }
  }, { passive: true });
}

function initCalendarNavControls() {
  const prevBtn = document.getElementById('calPrevMonthBtn');
  if (prevBtn && !prevBtn.dataset.hasCalNav) {
    prevBtn.dataset.hasCalNav = 'true';
    prevBtn.addEventListener('click', calGoPrevMonth);
  }

  const nextBtn = document.getElementById('calNextMonthBtn');
  if (nextBtn && !nextBtn.dataset.hasCalNav) {
    nextBtn.dataset.hasCalNav = 'true';
    nextBtn.addEventListener('click', calGoNextMonth);
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

  initCalendarSwipeControls();
}

function renderCalendarView(year = currentCalendarYear, month = currentCalendarMonth) {
  initCalendarNavControls();
  initCalendarSwipeControls();
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
// Forward Date Integration (Delegates directly to global Forward Date Modal)
// ==============================================================================

function initCalForwardModalControls() {
  // Retired in favor of unified global openForwardDateModal
}

function openCalForwardModal(caseNo) {
  if (typeof openForwardDateModal === 'function') {
    openForwardDateModal(caseNo);
  } else if (typeof openUpdateHearingForCase === 'function') {
    openUpdateHearingForCase(caseNo);
  }
}

function closeCalForwardModal() {
  if (typeof closeForwardDateModal === 'function') {
    closeForwardDateModal();
  }
}

async function saveCalForwardDate() {
  // Retired in favor of submitForwardDateModal
}

// ==============================================================================
// Daily Cause List Table Integration & Controls for Selected Day
// ==============================================================================

var calSortField = 'court';
var calSortAsc = true;
var calAllExpanded = false;

function calSortTable(field) {
  if (calSortField === field) {
    calSortAsc = !calSortAsc;
  } else {
    calSortField = field;
    calSortAsc = true;
  }
  // Update sort icons
  const mapping = {
    title: 'sortIconTitle',
    court: 'sortIconCourt',
    caseno: 'sortIconCaseNo',
    tag: 'sortIconTag'
  };
  Object.keys(mapping).forEach(f => {
    const icon = document.getElementById(mapping[f]);
    if (icon) {
      if (calSortField === f) {
        icon.className = calSortAsc ? 'fa-solid fa-sort-up' : 'fa-solid fa-sort-down';
      } else {
        icon.className = 'fa-solid fa-sort';
      }
    }
  });
  if (selectedCalendarDate) {
    renderDaySchedule(selectedCalendarDate.day, selectedCalendarDate.month, selectedCalendarDate.year, currentDayRawHearings);
  }
}
if (typeof calSortTable !== 'undefined') window.calSortTable = calSortTable;

function calToggleAllCases() {
  calAllExpanded = !calAllExpanded;
  const chevron = document.getElementById('toggleAllChevron');
  if (chevron) {
    chevron.style.transform = calAllExpanded ? 'rotate(180deg)' : 'rotate(0deg)';
  }
  document.querySelectorAll('#dayScheduleList .case').forEach(art => {
    art.classList.toggle('open', calAllExpanded);
    const head = art.querySelector('.case-head');
    if (head) head.setAttribute('aria-expanded', calAllExpanded ? 'true' : 'false');
  });
}
if (typeof calToggleAllCases !== 'undefined') window.calToggleAllCases = calToggleAllCases;

function toggleCaseAccordion(btn) {
  if (!btn) return;
  const article = btn.closest('.case');
  if (!article) return;
  const isOpen = article.classList.toggle('open');
  btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}
if (typeof window !== 'undefined') window.toggleCaseAccordion = toggleCaseAccordion;
if (typeof globalThis !== 'undefined') globalThis.toggleCaseAccordion = toggleCaseAccordion;
try { if (typeof global !== 'undefined') global.toggleCaseAccordion = toggleCaseAccordion; } catch (e) {}

function calOnDateInputChange(dateVal) {
  if (!dateVal) return;
  const parts = dateVal.split('-');
  if (parts.length === 3) {
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10) - 1;
    const d = parseInt(parts[2], 10);
    selectedCalendarDate = { day: d, month: m, year: y };
    if (y !== currentCalendarYear || m !== currentCalendarMonth) {
      renderCalendarView(y, m);
    } else {
      renderCalendarView(currentCalendarYear, currentCalendarMonth);
    }
  }
}
if (typeof calOnDateInputChange !== 'undefined') window.calOnDateInputChange = calOnDateInputChange;

function calOnCourtFilterChange(courtVal) {
  if (selectedCalendarDate) {
    renderDaySchedule(selectedCalendarDate.day, selectedCalendarDate.month, selectedCalendarDate.year, currentDayRawHearings);
  }
}
if (typeof calOnCourtFilterChange !== 'undefined') window.calOnCourtFilterChange = calOnCourtFilterChange;

function setCalDateOffset(offset) {
  const target = new Date();
  target.setDate(target.getDate() + Number(offset));
  const y = target.getFullYear();
  const m = target.getMonth();
  const d = target.getDate();
  selectedCalendarDate = { day: d, month: m, year: y };

  [0, 1, 2, 7].forEach((off) => {
    const btn = document.getElementById(`calChip${off}`);
    if (btn) btn.classList.toggle('active', off === Number(offset));
  });

  renderCalendarView(y, m);
}
if (typeof setCalDateOffset !== 'undefined') window.setCalDateOffset = setCalDateOffset;

function copyCalPassOverNote(caseNo) {
  if (typeof copyPassOverNote === 'function') {
    copyPassOverNote(caseNo);
  } else if (typeof window !== 'undefined' && typeof window.copyPassOverNote === 'function') {
    window.copyPassOverNote(caseNo);
  } else {
    const slip = `*COURT PASS-OVER / HAZIRI REQUEST*\n⚖️ Case: #${caseNo}\nCounsel: Atul Kumar Mishra, Advocate\nNote: Counsel is attending another listed matter. Kindly pass-over till 12:30 PM / next call.`;
    navigator.clipboard?.writeText?.(slip);
    if (typeof showToast === 'function') {
      showToast('📋 Pass-Over slip copy ho gayi!', 'success');
    }
  }
}
if (typeof copyCalPassOverNote !== 'undefined') window.copyCalPassOverNote = copyCalPassOverNote;

function sendSelectedDayCauseListWhatsApp() {
  if (!selectedCalendarDate) return;
  const dateFormatted = `${_pad(selectedCalendarDate.day)}/${_pad(selectedCalendarDate.month + 1)}/${selectedCalendarDate.year}`;
  const count = currentDayRawHearings.length;
  if (count === 0) {
    if (typeof showToast === 'function') showToast('Is tareekh par koi hearing listed nahi hai', 'warning');
    return;
  }
  let msg = `*DAILY COURT CAUSE LIST - ${dateFormatted}*\nTotal Listings: ${count}\n\n`;
  currentDayRawHearings.forEach((h, i) => {
    const cNo = h.caseNo || h.criminalCaseNumber || h.case_number || '—';
    const court = h.courtName || h.criminalCourtName || h.court || 'District Court';
    const stage = h.hearingProcess || h.process || h.stage || 'Scheduled Hearing';
    const title = h.caseName || (h.plaintiff ? `${h.plaintiff} vs ${h.defendant || ''}` : cNo);
    msg += `${i + 1}. *${title}* (#${cNo})\n   🏛️ ${court}\n   🎯 ${stage}\n\n`;
  });
  msg += `Advocate Atul Kumar Mishra\nChambers Practice Management`;
  const url = `https://wa.me/?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}
if (typeof sendSelectedDayCauseListWhatsApp !== 'undefined') window.sendSelectedDayCauseListWhatsApp = sendSelectedDayCauseListWhatsApp;

function calGetPreviousHearingDisplay(c) {
  if (typeof window !== 'undefined' && typeof window.getCasePreviousHearingDisplay === 'function') {
    return window.getCasePreviousHearingDisplay(c);
  }
  if (!c) return '—';
  let prevDate = c.previousHearing || c.prevHearing || c.prevDate || c.previousDate || '';
  let prevProc = c.previousProcess || c.prevProcess || '';
  if (!prevDate && Array.isArray(c.hearingHistory) && c.hearingHistory.length > 0) {
    const sorted = [...c.hearingHistory].sort((a, b) => String(b.hearing_date || '').localeCompare(String(a.hearing_date || '')));
    const past = sorted.find(h => h.hearing_date && h.hearing_date < (c.nextHearing || '9999'));
    if (past) {
      prevDate = past.hearing_date;
      prevProc = past.process || past.hearingProcess || '';
    }
  }
  if (!prevDate || prevDate === '—' || prevDate === 'null') return '— (First Listing)';
  return prevProc && prevProc !== '—' ? `${prevDate} (${prevProc})` : prevDate;
}

function calGetFilingOrForumInfo(c) {
  if (typeof window !== 'undefined' && typeof window.getCaseFilingOrForumInfo === 'function') {
    return window.getCaseFilingOrForumInfo(c);
  }
  if (!c) return { label: 'Filing Date', value: '—', icon: 'fa-regular fa-calendar-days' };
  const cType = (c.caseType || c.case_type || 'civil').toLowerCase();
  if (cType === 'criminal' || cType === 'state') {
    const ps = (c.policeStation || c.police_station || '').trim();
    const fir = (c.crimeNumber || c.crimeNo || c.firNo || '').trim();
    const sec = (c.crimeSection || c.underSection || '').trim();
    const parts = [];
    if (ps) parts.push(ps);
    if (fir) parts.push(fir.startsWith('FIR') ? fir : `FIR #${fir}`);
    if (sec) parts.push(`u/s ${sec}`);
    return {
      label: 'Police Station / FIR',
      value: parts.length > 0 ? parts.join(' · ') : '—',
      icon: 'fa-solid fa-shield-halved'
    };
  }
  const filing = c.filingDate || c.caseFilingDate || '';
  const yr = c.caseYear || c.year || '';
  return {
    label: 'Filing Date',
    value: filing || (yr ? `Year ${yr}` : '—'),
    icon: 'fa-regular fa-calendar-days'
  };
}

// ==============================================================================
// renderDaySchedule Implementation (Daily Cause List Board & 3-Column Ledger)
// ==============================================================================

function renderDaySchedule(day, month, year, rawHearings = []) {
  currentDayRawHearings = Array.isArray(rawHearings) ? rawHearings : [];

  const titleEl = document.getElementById('selectedDateTitle');
  const dateTextEl = document.getElementById('selectedDateFormattedText');
  const badgeEl = document.getElementById('selectedDateCountBadge');
  const listEl = document.getElementById('dayScheduleList');
  const courtSelect = document.getElementById('causeListCourtFilter');
  const dateInput = document.getElementById('calDateInput');
  const footerCount = document.getElementById('calScheduleFooterCount');
  const progressEl = document.getElementById('dayScheduleProgress');

  initScheduleToolbarControls();
  initCalForwardModalControls();

  const dateFormatted = `${_pad(day)}/${_pad(month + 1)}/${year}`;
  const dateISOKey = `${year}-${_pad(month + 1)}-${_pad(day)}`;

  if (titleEl) {
    titleEl.textContent = 'Master Calendar Scheduler';
  }

  // Format nice human-readable date
  let niceDate = dateFormatted;
  try {
    const dt = new Date(year, month, day);
    niceDate = dt.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  } catch (e) {}

  if (dateTextEl) {
    dateTextEl.textContent = niceDate;
  }

  if (dateInput) {
    dateInput.value = dateISOKey;
  }

  // Update preset chips
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const sel = new Date(year, month, day);
    sel.setHours(0, 0, 0, 0);
    const diff = Math.round((sel - today) / (1000 * 60 * 60 * 24));
    [0, 1, 2, 7].forEach((off) => {
      const chip = document.getElementById(`calChip${off}`);
      if (chip) chip.classList.toggle('active', diff === off);
    });
  } catch (err) {}

  // Populate court filter dropdown if present
  if (courtSelect) {
    const prevVal = (courtSelect.value || '').trim();
    if (!courtSelect.dataset.populated) {
      const seenCourts = new Set();
      const existingOptions = Array.from(courtSelect.querySelectorAll('option')).map(o => o.value).filter(Boolean);
      const courtOptions = [...existingOptions];

      if (Array.isArray(currentDayRawHearings)) {
        currentDayRawHearings.forEach(h => {
          const ct = (h.courtName || h.criminalCourtName || h.court || '').trim();
          if (ct) courtOptions.push(ct);
        });
      }
      if (typeof courts !== 'undefined' && Array.isArray(courts)) {
        courtOptions.push(...courts);
      } else if (typeof window !== 'undefined' && Array.isArray(window.courts)) {
        courtOptions.push(...window.courts);
      }
      if (typeof allCaseRecords !== 'undefined' && Array.isArray(allCaseRecords)) {
        allCaseRecords.forEach(c => {
          const ct = (c.courtName || c.criminalCourtName || c.court || '').trim();
          if (ct) courtOptions.push(ct);
        });
      }

      courtSelect.innerHTML = '<option value="">All Courts</option>';
      courtOptions.forEach(ct => {
        const t = (ct || '').trim();
        const key = t.toLowerCase();
        if (!t || seenCourts.has(key)) return;
        seenCourts.add(key);
        const opt = document.createElement('option');
        opt.value = t;
        opt.textContent = t;
        courtSelect.appendChild(opt);
      });

      courtSelect.dataset.populated = 'true';
      if (prevVal) {
        Array.from(courtSelect.options).forEach(opt => {
          if (opt.value.toLowerCase() === prevVal.toLowerCase()) {
            opt.selected = true;
          }
        });
      }
    }

    if (!courtSelect.dataset.hasCalListener) {
      courtSelect.dataset.hasCalListener = 'true';
      courtSelect.addEventListener('change', () => {
        if (selectedCalendarDate) {
          renderDaySchedule(selectedCalendarDate.day, selectedCalendarDate.month, selectedCalendarDate.year, currentDayRawHearings);
        }
      });
    }
  }

  const selectedCourt = (courtSelect ? courtSelect.value : '').trim().toLowerCase();
  let filteredHearings = selectedCourt
    ? currentDayRawHearings.filter(h => {
        const cCourt = (h.courtName || h.criminalCourtName || h.court || '').trim().toLowerCase();
        return cCourt === selectedCourt || cCourt.includes(selectedCourt);
      })
    : currentDayRawHearings;

  if (badgeEl) {
    const count = filteredHearings.length;
    badgeEl.textContent = `${count} ${count === 1 ? 'HEARING' : 'HEARINGS'}`;
    badgeEl.className = `header-badge ${count > 0 ? 'active' : ''}`;
  }

  if (footerCount) {
    footerCount.textContent = `Showing ${filteredHearings.length} of ${currentDayRawHearings.length} cases`;
  }

  if (!listEl) return;

  const esc = typeof escapeHtml === 'function'
    ? escapeHtml
    : str => String(str || '').replace(/[&<>"']/g, s => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s]));

  if (!filteredHearings || filteredHearings.length === 0) {
    const emptyMarkup = `
      <div class="causelist-empty empty-schedule-cell">
        <i class="fa-solid fa-calendar-xmark empty-icon" aria-hidden="true"></i>
        <div class="empty-title empty-schedule-msg">No hearings scheduled on <strong>${esc(dateFormatted)}</strong>${selectedCourt ? ' for selected court' : ''}.</div>
        <div class="empty-sub">Select a different day from the calendar above.</div>
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

  // Dynamic Sorting based on calSortField and calSortAsc
  const sortedHearings = [...filteredHearings].sort((a, b) => {
    let valA = '';
    let valB = '';
    if (calSortField === 'title') {
      valA = (a.caseName || a.plaintiff || a.caseNo || '').toUpperCase();
      valB = (b.caseName || b.plaintiff || b.caseNo || '').toUpperCase();
    } else if (calSortField === 'caseno') {
      valA = (a.caseNo || a.criminalCaseNumber || a.case_number || '').toUpperCase();
      valB = (b.caseNo || b.criminalCaseNumber || b.case_number || '').toUpperCase();
    } else if (calSortField === 'tag') {
      valA = (a.caseType || a.case_type || 'civil').toUpperCase();
      valB = (b.caseType || b.case_type || 'civil').toUpperCase();
    } else {
      // Default: court forum
      valA = (a.courtName || a.criminalCourtName || a.court || '').toUpperCase();
      valB = (b.courtName || b.criminalCourtName || b.court || '').toUpperCase();
      if (valA === valB) {
        valA = (a.caseNo || a.criminalCaseNumber || a.case_number || '').toUpperCase();
        valB = (b.caseNo || b.criminalCaseNumber || b.case_number || '').toUpperCase();
      }
    }
    const cmp = valA.localeCompare(valB);
    return calSortAsc ? cmp : -cmp;
  });

  let html = '';
  sortedHearings.forEach((c, idx) => {
    const caseNo = c.caseNo || c.criminalCaseNumber || c.case_number || '—';
    const caseId = caseNo !== '—' ? caseNo : `idx-${idx}`;
    const isDone = !!doneStore[caseId];

    let rawStage = (c.hearingProcess || c.process || c.stage || '').trim();
    const displayStage = (!rawStage || rawStage.toLowerCase() === 'na' || rawStage.toLowerCase() === 'n/a') ? 'Hearing' : rawStage;

    const courtName = (c.courtName || c.criminalCourtName || c.court || 'District Court').trim();
    const judgeName = (c.judgeName || c.judge || '').trim();
    const isJudgeAssigned = judgeName && judgeName.toLowerCase() !== courtName.toLowerCase();
    const judgeDisplay = isJudgeAssigned ? judgeName : '';

    const client = (c.clientName || c.criminalClientName || c.client || '—').trim();
    const phone = (c.clientNumber || c.criminalClientNumber || c.clientPhone || c.criminalClientPhone || c.phone || c.contact || '').trim();
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const rawType = (c.caseType || c.case_type || 'civil').toLowerCase().trim();

    let tagClass = 'civil';
    let tagLabel = 'Civil';
    if (rawType === 'criminal' || rawType === 'state') {
      tagClass = 'criminal';
      tagLabel = 'Criminal';
    } else if (rawType === 'revenue') {
      tagClass = 'revenue';
      tagLabel = 'Revenue';
    } else if (rawType === 'family') {
      tagClass = 'family';
      tagLabel = 'Family';
    } else if (rawType === 'corporate') {
      tagClass = 'corporate';
      tagLabel = 'Corporate';
    }

    // Resolve Clean Parties & Disambiguation
    let plaintiff = (c.plaintiff || '').trim();
    let defendant = (c.defendant || '').trim();
    let partyName = (c.partyName || c.party_name || '').trim();
    let caseTitle = (c.caseName || c.case_title || c.caseTitle || c.title || '').trim();

    const partyMatchesPlaintiff = partyName && plaintiff && (
      partyName.toLowerCase() === plaintiff.toLowerCase() ||
      plaintiff.toLowerCase().includes(partyName.toLowerCase()) ||
      partyName.toLowerCase().includes(plaintiff.toLowerCase())
    );

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

    if (!caseTitle || caseTitle.toLowerCase() === 'vs' || caseTitle.toLowerCase() === 'vs.') {
      if (plaintiff && defendant && defendant.toLowerCase() !== 'defendant' && defendant.toLowerCase() !== plaintiff.toLowerCase()) {
        caseTitle = `${plaintiff} vs ${defendant}`;
      } else if (c.petitioner && c.respondent) {
        caseTitle = `${c.petitioner} vs ${c.respondent}`;
      } else if (c.victimName && c.accusedName) {
        caseTitle = `${c.victimName} vs ${c.accusedName}`;
      } else if (plaintiff && client && client !== '—' && !plaintiff.toLowerCase().includes(client.toLowerCase())) {
        caseTitle = `${plaintiff} vs ${client}`;
      } else {
        caseTitle = plaintiff || 'Matter';
      }
    }

    const displayCaseName = caseTitle;
    const prevHearingDisplay = calGetPreviousHearingDisplay(c);
    const filingInfo = calGetFilingOrForumInfo(c);
    const remark = (c.remark || c.disposal_comment || c.action_taken || '').trim();

    // ALL CARDS ARE BY-DEFAULT COLLAPSED
    const isOpen = calAllExpanded ? true : false;

    html += `
      <article class="case${isOpen ? ' open' : ''}${isDone ? ' is-done' : ''}" data-court="${esc(courtName.toLowerCase())}" data-id="${esc(caseId)}">
        <button
          type="button"
          class="case-head"
          aria-expanded="${isOpen ? 'true' : 'false'}"
          onclick="(window.toggleCaseAccordion || toggleCaseAccordion)(this)"
        >
          <span class="c-title" title="${esc(displayCaseName)}"><span class="case-name">${esc(displayCaseName)}</span></span>
          <span class="c-court" title="${esc(courtName)}"><i class="fa-solid fa-landmark" aria-hidden="true"></i> ${esc(courtName)}${judgeDisplay ? ` · ${esc(judgeDisplay)}` : ''}</span>
          <span class="c-no"><span class="case-no">#${esc(caseNo)}</span></span>
          <span class="tag ${tagClass}">${esc(tagLabel)}</span>
          <span class="chev" aria-hidden="true"><i class="fa-solid fa-chevron-down"></i></span>
        </button>

        <div class="case-body">
          <div class="inner">
            <div class="body-pad">
              <!-- 3-COLUMN STRUCTURED LEDGER TABLE -->
              <div class="meta-ledger-3col">
                <!-- COLUMN 1: CASE & CLIENT -->
                <div class="ledger-col">
                  <div class="ledger-row">
                    <span class="ledger-lbl"><i class="fa-solid fa-user" aria-hidden="true"></i> Client:</span>
                    <span class="ledger-val client-name">${esc(client !== '—' ? client : 'Chambers Record')}</span>
                  </div>
                  <div class="ledger-row">
                    <span class="ledger-lbl"><i class="fa-solid fa-phone" aria-hidden="true"></i> Contact:</span>
                    <span class="ledger-val client-phone-num">${esc(phone || '—')}</span>
                  </div>
                  <div class="ledger-row">
                    <span class="ledger-lbl"><i class="fa-solid fa-hashtag" aria-hidden="true"></i> Case No:</span>
                    <span class="ledger-val">#${esc(caseNo)}</span>
                  </div>
                </div>

                <!-- COLUMN 2: HEARING & FORUM -->
                <div class="ledger-col">
                  <div class="ledger-row">
                    <span class="ledger-lbl"><i class="fa-solid fa-gavel" aria-hidden="true"></i> Stage:</span>
                    <span class="ledger-val stage-text">${esc(displayStage)}</span>
                  </div>
                  <div class="ledger-row">
                    <span class="ledger-lbl"><i class="fa-regular fa-clock" aria-hidden="true"></i> Previous:</span>
                    <span class="ledger-val prev-date-text">${esc(prevHearingDisplay)}</span>
                  </div>
                  <div class="ledger-row">
                    <span class="ledger-lbl"><i class="${filingInfo.icon}" aria-hidden="true"></i> ${esc(filingInfo.label)}:</span>
                    <span class="ledger-val extra-info-text">${esc(filingInfo.value)}</span>
                  </div>
                </div>

                <!-- COLUMN 3: CASE REMARKS / ORDER NOTE -->
                <div class="ledger-col ledger-remarks-col">
                  <div class="remarks-header">
                    <i class="fa-regular fa-note-sticky memo-ico" aria-hidden="true"></i> Remarks / Order Note
                  </div>
                  <div class="remarks-body">
                    ${remark ? `"${esc(remark)}"` : '"Pichhli date par koi vishesh order/note darz nahi hai."'}
                  </div>
                </div>

                <!-- INTEGRATED BOTTOM ROW: ACTIONS -->
                <div class="ledger-actions-row actions">
                  <button
                    type="button"
                    class="act primary act-primary"
                    onclick="event.stopPropagation(); (window.openForwardDateModal || openCalForwardModal)('${esc(caseNo)}')"
                    title="Update next hearing date and stage"
                  >
                    <i class="fa-solid fa-calendar-plus" aria-hidden="true"></i> <span class="act-text">Update Next Date</span>
                  </button>

                  <button
                    type="button"
                    class="act act-dossier"
                    onclick="event.stopPropagation(); if (typeof openCaseDetailsFullModal === 'function') openCaseDetailsFullModal('${esc(caseNo)}'); else if (typeof openCaseHistoryModalByNo === 'function') openCaseHistoryModalByNo('${esc(caseNo)}');"
                    title="Full Case Dossier Kholein"
                  >
                    <i class="fa-solid fa-folder-open" aria-hidden="true"></i> <span class="act-text">Open Dossier</span>
                  </button>

                  ${cleanPhone
                    ? `<a
                          class="act act-call"
                          href="tel:${esc(cleanPhone)}"
                          title="Call Client: ${esc(phone)}"
                        >
                          <i class="fa-solid fa-phone" aria-hidden="true"></i> <span class="act-text">Call Client</span>
                        </a>`
                    : `<button type="button" class="act act-call disabled" disabled title="No client phone">
                          <i class="fa-solid fa-phone" aria-hidden="true"></i> <span class="act-text">Call</span>
                        </button>`
                  }

                  <button
                    type="button"
                    class="act act-whatsapp"
                    onclick="event.stopPropagation(); sendWhatsAppHearingNotice('${esc(caseNo)}')"
                    title="Send WhatsApp Notice"
                  >
                    <i class="fa-brands fa-whatsapp" aria-hidden="true"></i> <span class="act-text">WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    class="act act-passover"
                    onclick="event.stopPropagation(); copyCalPassOverNote('${esc(caseNo)}')"
                    title="Pass-Over / Haziri Request Slip Copy Karein"
                  >
                    <i class="fa-solid fa-receipt" aria-hidden="true"></i> <span class="act-text">Pass-Over Slip</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    `;
  });

  if (listEl.tagName === 'TBODY') {
    listEl.innerHTML = `<tr class="collapsible-schedule-row"><td colspan="3">${html}</td></tr>`;
  } else {
    listEl.innerHTML = html;
  }
}

if (typeof renderCalendarView !== 'undefined') window.renderCalendarView = renderCalendarView;
if (typeof renderDaySchedule !== 'undefined') window.renderDaySchedule = renderDaySchedule;
if (typeof monthNames !== 'undefined') window.monthNames = monthNames;

if (typeof calGoNextMonth !== 'undefined') window.calGoNextMonth = calGoNextMonth;
if (typeof calGoPrevMonth !== 'undefined') window.calGoPrevMonth = calGoPrevMonth;
if (typeof initCalendarSwipeControls !== 'undefined') window.initCalendarSwipeControls = initCalendarSwipeControls;

if (typeof openCalForwardModal !== 'undefined') window.openCalForwardModal = openCalForwardModal;
if (typeof closeCalForwardModal !== 'undefined') window.closeCalForwardModal = closeCalForwardModal;
if (typeof saveCalForwardDate !== 'undefined') window.saveCalForwardDate = saveCalForwardDate;
