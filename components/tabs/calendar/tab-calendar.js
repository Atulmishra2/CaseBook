window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs['calendar'] = `<!-- Master Calendar Header Banner (Image 1 Style) -->
    <header class="board-head calendar-master-head">
        <div class="head-left">
            <h1 class="h1">
                <span class="crest" aria-hidden="true"><svg class="lucide lucide-calendar-days" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg></span>
                <span class="h1-text" id="selectedDateTitle">Master Calendar Scheduler</span>
            </h1>
            <div class="sub" id="calendarHeaderSubline">
                <b id="selectedDateFormattedText">Today</b> · <span id="selectedDateCountBadge" class="calendar-stat-pill upcoming-stat-pill">0 listings</span>
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
                    <button type="button" id="calPrevMonthBtn" class="cal-nav-btn" title="Previous Month" aria-label="Previous Month">
                        <svg class="lucide lucide-chevron-left" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                        <span>Prev</span>
                    </button>
                    <button type="button" id="calTodayBtn" class="cal-today-btn" title="Today" aria-label="Today">
                        <svg class="lucide lucide-calendar" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M8 2v4"/><path d="M16 2v4"/><path d="M3 10h18"/></svg>
                        <span>Today</span>
                    </button>
                    <button type="button" id="calNextMonthBtn" class="cal-nav-btn" title="Next Month" aria-label="Next Month">
                        <span>Next</span>
                        <svg class="lucide lucide-chevron-right" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                    </button>
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
        <!-- Sorting Header Row: Desktop 5-Columns & Mobile Menu -->
        <div class="table-sorting-row" role="row">
            <!-- Desktop 5-Column Sorting Headers (Screen width > 768px) -->
            <div class="table-sorting-desktop" role="row">
                <button type="button" class="sort-th col-title" onclick="calSortTable('title')" title="Sort by Title">
                    <span>Cause Title (Parties)</span> <span class="sort-icon-wrap" id="sortIconTitle"><svg class="lucide lucide-arrow-up-down" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/></svg></span>
                </button>
                <button type="button" class="sort-th col-court" onclick="calSortTable('court')" title="Sort by Court Forum">
                    <span>Court / Forum</span> <span class="sort-icon-wrap" id="sortIconCourt"><svg class="lucide lucide-arrow-up-down" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/></svg></span>
                </button>
                <button type="button" class="sort-th col-no" onclick="calSortTable('caseno')" title="Sort by Case Number">
                    <span>Case Number</span> <span class="sort-icon-wrap" id="sortIconCaseNo"><svg class="lucide lucide-arrow-up-down" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/></svg></span>
                </button>
                <button type="button" class="sort-th col-tag" onclick="calSortTable('tag')" title="Sort by Category">
                    <span>Category</span> <span class="sort-icon-wrap" id="sortIconTag"><svg class="lucide lucide-arrow-up-down" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/></svg></span>
                </button>
                <button type="button" class="sort-th col-toggle" onclick="calToggleAllCases()" title="Expand / Collapse All" aria-label="Expand or collapse all cases">
                    <svg id="toggleAllChevron" class="lucide lucide-chevron-down" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </button>
            </div>

            <!-- Mobile Sorting Menu Bar (Screen width <= 768px) -->
            <div class="table-sorting-mobile">
                <div class="custom-dropdown cal-mobile-sort-dropdown" id="calMobileSortDropdown">
                    <button
                        type="button"
                        class="cal-mobile-sort-trigger"
                        id="calMobileSortTrigger"
                        onclick="toggleCalMobileSortMenu(event)"
                        aria-haspopup="listbox"
                        aria-expanded="false"
                        aria-label="Sort cases menu"
                    >
                        <svg class="lucide lucide-arrow-down-narrow-wide" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="M11 4h4"/><path d="M11 8h7"/><path d="M11 12h10"/></svg>
                        <span class="cal-sort-text">
                            <span class="cal-sort-prefix">Sort:</span>
                            <strong id="calMobileSortCurrentLabel">Court Forum</strong>
                        </span>
                        <span class="cal-sort-direction-badge" id="calMobileSortDirectionBadge" title="Sort Order">
                            <span id="calMobileSortDirectionIcon"><svg class="lucide lucide-arrow-up" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg></span>
                        </span>
                        <svg class="lucide lucide-chevron-down" id="calMobileSortChevron" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </button>

                    <div class="custom-dropdown-menu cal-mobile-sort-menu" id="calMobileSortMenu" role="listbox">
                        <div class="cal-sort-menu-header">
                            <span><svg class="lucide lucide-arrow-down-narrow-wide" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="M11 4h4"/><path d="M11 8h7"/><path d="M11 12h10"/></svg> Sort Matters By</span>
                        </div>
                        <button type="button" class="cal-sort-menu-item active" data-sort-field="court" onclick="calSelectSortFromMenu('court')">
                            <span class="cal-item-left">
                                <svg class="lucide lucide-gavel" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m14 13-7.5 7.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L11 10"/><path d="m16 16 6-6"/><path d="m8 8 6-6"/><path d="m9 7 8 8"/><path d="m21 11-8-8"/></svg>
                                <span>Court Forum</span>
                            </span>
                            <span class="cal-item-right">
                                <svg class="lucide lucide-check" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                                <span class="cal-order-tag" id="calOrderTag_court">ASC</span>
                            </span>
                        </button>
                        <button type="button" class="cal-sort-menu-item" data-sort-field="title" onclick="calSelectSortFromMenu('title')">
                            <span class="cal-item-left">
                                <svg class="lucide lucide-type" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" x2="15" y1="20" y2="20"/><line x1="12" x2="12" y1="4" y2="20"/></svg>
                                <span>Case Title</span>
                            </span>
                            <span class="cal-item-right">
                                <svg class="lucide lucide-check" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                                <span class="cal-order-tag" id="calOrderTag_title">ASC</span>
                            </span>
                        </button>
                        <button type="button" class="cal-sort-menu-item" data-sort-field="caseno" onclick="calSelectSortFromMenu('caseno')" style="display: none;">
                            <span class="cal-item-left">
                                <svg class="lucide lucide-hash" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/></svg>
                                <span>Case No</span>
                            </span>
                            <span class="cal-item-right">
                                <svg class="lucide lucide-check" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                                <span class="cal-order-tag" id="calOrderTag_caseno">ASC</span>
                            </span>
                        </button>
                        <button type="button" class="cal-sort-menu-item" data-sort-field="tag" onclick="calSelectSortFromMenu('tag')">
                            <span class="cal-item-left">
                                <svg class="lucide lucide-tags" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19"/><path d="M9.586 5.586A2 2 0 0 0 8.172 5H3a1 1 0 0 0-1 1v5.172a2 2 0 0 0 .586 1.414L8.2 18.2a2.4 2.4 0 0 0 3.4 0l3.6-3.6a2.4 2.4 0 0 0 0-3.4Z"/><circle cx="6.5" cy="8.5" r=".5" fill="currentColor"/></svg>
                                <span>Category</span>
                            </span>
                            <span class="cal-item-right">
                                <svg class="lucide lucide-check" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                                <span class="cal-order-tag" id="calOrderTag_tag">ASC</span>
                            </span>
                        </button>
                    </div>
                </div>

                <button
                    type="button"
                    class="cal-mobile-toggle-btn"
                    onclick="calToggleAllCases()"
                    title="Expand / Collapse All"
                    aria-label="Expand or collapse all matters"
                >
                    <svg class="lucide lucide-chevron-down" id="toggleAllChevronMobile" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    <span id="calMobileToggleText">Toggle</span>
                </button>
            </div>
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
    </div>`;

var _calInitToday = new Date();
var currentCalendarYear = _calInitToday.getFullYear();
var currentCalendarMonth = _calInitToday.getMonth();
var selectedCalendarDate = {
  day: _calInitToday.getDate(),
  month: _calInitToday.getMonth(),
  year: _calInitToday.getFullYear()
};

function getCalendarCaseRecords() {
  if (typeof window !== 'undefined' && Array.isArray(window.allCaseRecords) && window.allCaseRecords.length > 0) {
    return window.allCaseRecords;
  }
  if (typeof allCaseRecords !== 'undefined' && Array.isArray(allCaseRecords) && allCaseRecords.length > 0) {
    return allCaseRecords;
  }
  return (typeof window !== 'undefined' && Array.isArray(window.allCaseRecords))
    ? window.allCaseRecords
    : (typeof allCaseRecords !== 'undefined' && Array.isArray(allCaseRecords) ? allCaseRecords : []);
}

if (typeof window !== 'undefined') {
  window.currentCalendarYear = currentCalendarYear;
  window.currentCalendarMonth = currentCalendarMonth;
  window.selectedCalendarDate = selectedCalendarDate;
  window.getCalendarCaseRecords = getCalendarCaseRecords;
}

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

  const records = getCalendarCaseRecords();

  records.forEach(c => {
    if (!c || !c.nextHearing || c.nextHearing === '—' || c.nextHearing === 'null') return;
    const isDisp = typeof isCaseDisposed === 'function'
      ? isCaseDisposed(c)
      : (typeof window !== 'undefined' && typeof window.isCaseDisposed === 'function'
        ? window.isCaseDisposed(c)
        : Boolean(c.disposalDate || c.disposalComment || (c.caseStatus || '').toLowerCase().includes('dispose')));
    if (isDisp) return;

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
    const counts = { civil: 0, criminal: 0, revenue: 0, family: 0 };
    hearings.forEach(h => {
      const t = (h.caseType || 'civil').toLowerCase().trim();
      if (t === 'civil' || t === 'misc_civil') counts.civil++;
      else if (t === 'criminal' || t === 'state' || t === 'complaint' || t === 'misc_criminal') counts.criminal++;
      else if (t === 'revenue') counts.revenue++;
      else if (t === 'family') counts.family++;
    });

    let hearingsHiddenPayload = '';
    if (hasHearings) {
      hearingsHiddenPayload = `
        <div class="day-hearings-payload" style="display: none;" aria-hidden="true">
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
        ${counts.family > 0 ? `<span class="cal-dot family" title="${counts.family} Family hearing${counts.family > 1 ? 's' : ''}"></span>` : ''}
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

// LocalStorage Legacy Cal Done Cleanup Helper
try {
  if (typeof localStorage !== 'undefined') {
    Object.keys(localStorage).forEach(k => {
      if (k.startsWith('cal_done:')) localStorage.removeItem(k);
    });
  }
} catch (e) {}

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
        icon.className = calSortAsc ? 'fa-solid fa-sort-up lucide-sort-indicator active' : 'fa-solid fa-sort-down lucide-sort-indicator active';
        icon.innerHTML = calSortAsc
          ? '<svg class="lucide lucide-arrow-up" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>'
          : '<svg class="lucide lucide-arrow-down" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>';
      } else {
        icon.className = 'fa-solid fa-sort lucide-sort-indicator';
        icon.innerHTML = '<svg class="lucide lucide-arrow-up-down" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/></svg>';
      }
    }
  });

  // Update mobile sort menu UI
  updateCalMobileSortUI();

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
  const chevronMobile = document.getElementById('toggleAllChevronMobile');
  if (chevronMobile) {
    chevronMobile.style.transform = calAllExpanded ? 'rotate(180deg)' : 'rotate(0deg)';
  }
  const mobileToggleText = document.getElementById('calMobileToggleText');
  if (mobileToggleText) {
    mobileToggleText.textContent = calAllExpanded ? 'Collapse All' : 'Expand All';
  }
  document.querySelectorAll('#dayScheduleList .case').forEach(art => {
    art.classList.toggle('open', calAllExpanded);
    const head = art.querySelector('.case-head');
    if (head) head.setAttribute('aria-expanded', calAllExpanded ? 'true' : 'false');
  });
}
if (typeof calToggleAllCases !== 'undefined') window.calToggleAllCases = calToggleAllCases;

function updateCalMobileSortUI() {
  const labelMap = {
    court: 'Court Forum',
    title: 'Case Title',
    caseno: 'Case No',
    tag: 'Category'
  };

  const currentLabelEl = document.getElementById('calMobileSortCurrentLabel');
  if (currentLabelEl) {
    currentLabelEl.textContent = labelMap[calSortField] || 'Court Forum';
  }

  const directionIcon = document.getElementById('calMobileSortDirectionIcon');
  if (directionIcon) {
    directionIcon.className = calSortAsc ? 'fa-solid fa-arrow-up' : 'fa-solid fa-arrow-down';
    directionIcon.innerHTML = calSortAsc
      ? '<svg class="lucide lucide-arrow-up" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>'
      : '<svg class="lucide lucide-arrow-down" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>';
  }
  const directionBadge = document.getElementById('calMobileSortDirectionBadge');
  if (directionBadge) {
    directionBadge.setAttribute('title', calSortAsc ? 'Ascending (A-Z)' : 'Descending (Z-A)');
  }

  const menuItems = document.querySelectorAll('.cal-mobile-sort-menu .cal-sort-menu-item');
  menuItems.forEach(item => {
    const field = item.getAttribute('data-sort-field');
    const isCurrent = field === calSortField;
    item.classList.toggle('active', isCurrent);

    const orderTag = document.getElementById(`calOrderTag_${field}`);
    if (orderTag) {
      if (isCurrent) {
        orderTag.textContent = calSortAsc ? 'ASC ↑' : 'DESC ↓';
        orderTag.style.display = 'inline-block';
      } else {
        orderTag.textContent = 'ASC';
        orderTag.style.display = 'none';
      }
    }
  });
}
if (typeof updateCalMobileSortUI !== 'undefined') window.updateCalMobileSortUI = updateCalMobileSortUI;

function toggleCalMobileSortMenu(event) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }
  const dropdown = document.getElementById('calMobileSortDropdown');
  const trigger = document.getElementById('calMobileSortTrigger');
  const menu = document.getElementById('calMobileSortMenu');
  const chevron = document.getElementById('calMobileSortChevron');
  if (!menu) return;

  const isOpen = menu.classList.contains('open');
  if (isOpen) {
    closeCalMobileSortMenu();
  } else {
    menu.classList.add('open');
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
    if (chevron) chevron.classList.add('rotate-180');
    if (dropdown) dropdown.classList.add('open');
  }
}
if (typeof toggleCalMobileSortMenu !== 'undefined') window.toggleCalMobileSortMenu = toggleCalMobileSortMenu;

function closeCalMobileSortMenu() {
  const dropdown = document.getElementById('calMobileSortDropdown');
  const trigger = document.getElementById('calMobileSortTrigger');
  const menu = document.getElementById('calMobileSortMenu');
  const chevron = document.getElementById('calMobileSortChevron');
  if (menu) menu.classList.remove('open');
  if (trigger) trigger.setAttribute('aria-expanded', 'false');
  if (chevron) chevron.classList.remove('rotate-180');
  if (dropdown) dropdown.classList.remove('open');
}
if (typeof closeCalMobileSortMenu !== 'undefined') window.closeCalMobileSortMenu = closeCalMobileSortMenu;

function calSelectSortFromMenu(field) {
  calSortTable(field);
  closeCalMobileSortMenu();
}
if (typeof calSelectSortFromMenu !== 'undefined') window.calSelectSortFromMenu = calSelectSortFromMenu;

if (typeof document !== 'undefined') {
  document.addEventListener('click', function (e) {
    const dropdown = document.getElementById('calMobileSortDropdown');
    if (dropdown && !dropdown.contains(e.target)) {
      closeCalMobileSortMenu();
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeCalMobileSortMenu();
    }
  });
}

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
  const formattedPrev = typeof formatDateDMY === 'function' ? formatDateDMY(prevDate) : prevDate;
  return prevProc && prevProc !== '—' ? `${formattedPrev} (${prevProc})` : formattedPrev;
}

function calGetFilingOrForumInfo(c) {
  if (typeof window !== 'undefined' && typeof window.getCaseFilingOrForumInfo === 'function') {
    return window.getCaseFilingOrForumInfo(c);
  }
  if (!c) return { label: 'Filing Date', value: '—', icon: 'fa-regular fa-calendar-days', iconSvg: '<svg class="lucide lucide-calendar" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M8 2v4"/><path d="M16 2v4"/><path d="M3 10h18"/></svg>' };
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
      icon: 'fa-solid fa-shield-halved',
      iconSvg: '<svg class="lucide lucide-shield" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>'
    };
  }
  const filing = c.filingDate || c.caseFilingDate || '';
  const yr = c.caseYear || c.year || '';
  let filingVal = '—';
  if (filing) {
    filingVal = typeof formatDateDMY === 'function' ? formatDateDMY(filing) : filing;
  } else if (yr) {
    filingVal = `Year ${yr}`;
  }
  return {
    label: 'Filing Date',
    value: filingVal,
    icon: 'fa-regular fa-calendar-days',
    iconSvg: '<svg class="lucide lucide-calendar" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M8 2v4"/><path d="M16 2v4"/><path d="M3 10h18"/></svg>'
  };
}

function calGetCriminalOrFilingDetails(c) {
  if (typeof window !== 'undefined' && typeof window.getCaseCriminalOrFilingDetails === 'function') {
    return window.getCaseCriminalOrFilingDetails(c);
  }
  if (!c) {
    return {
      isCriminal: false,
      ps: '—',
      fir: '—',
      sec: '—',
      filingDate: '—',
      caseYear: ''
    };
  }
  const cType = (c.caseType || c.case_type || 'civil').toLowerCase();
  const isCriminal = cType === 'criminal' || cType === 'state';

  const ps = (c.policeStation || c.police_station || c.statePoliceStation || '').trim();
  const rawCrime = (c.crimeNumber || c.crimeNo || c.stateCrimeNumber || c.firNo || c.firNumber || '').trim();
  const rawSec = (c.crimeSection || c.underSection || c.section || '').trim();

  let cleanFir = rawCrime;
  if (cleanFir.toLowerCase().startsWith('fir #')) cleanFir = cleanFir.slice(5).trim();
  else if (cleanFir.toLowerCase().startsWith('fir')) cleanFir = cleanFir.slice(3).trim();
  else if (cleanFir.toLowerCase().startsWith('crime #')) cleanFir = cleanFir.slice(7).trim();
  else if (cleanFir.toLowerCase().startsWith('crime')) cleanFir = cleanFir.slice(5).trim();

  let cleanSec = rawSec;
  if (cleanSec.toLowerCase().startsWith('u/s')) cleanSec = cleanSec.slice(3).trim();

  const filing = c.filingDate || c.caseFilingDate || c.crime_filing_date || '';
  const yr = c.caseYear || c.crime_year || c.year || '';
  let filingVal = '—';
  if (filing) {
    filingVal = typeof formatDateDMY === 'function' ? formatDateDMY(filing) : filing;
  } else if (yr) {
    filingVal = `Year ${yr}`;
  }

  return {
    isCriminal,
    ps: ps && ps.toLowerCase() !== 'police station' ? ps : '—',
    fir: cleanFir || '—',
    sec: cleanSec && cleanSec.toLowerCase() !== 'ipc' ? cleanSec : (rawSec || '—'),
    filingDate: filingVal,
    caseYear: yr ? String(yr) : ''
  };
}
if (typeof calGetCriminalOrFilingDetails !== 'undefined') window.calGetCriminalOrFilingDetails = calGetCriminalOrFilingDetails;

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
      const allRecs = typeof getCalendarCaseRecords === 'function' ? getCalendarCaseRecords() : (typeof allCaseRecords !== 'undefined' && Array.isArray(allCaseRecords) ? allCaseRecords : (typeof window !== 'undefined' && Array.isArray(window.allCaseRecords) ? window.allCaseRecords : []));
      if (Array.isArray(allRecs)) {
        allRecs.forEach(c => {
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
    badgeEl.className = count > 0 ? 'active' : '';
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
        <div class="empty-icon-wrap">
          <svg class="lucide lucide-calendar-x-2 empty-icon" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="m14 14-4 4"/><path d="m10 14 4 4"/></svg>
        </div>
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
    const forumDetails = calGetCriminalOrFilingDetails(c);
    const remark = (c.remark || c.disposal_comment || c.action_taken || '').trim();

    // ALL CARDS ARE BY-DEFAULT COLLAPSED
    const isOpen = calAllExpanded ? true : false;

    const getRep = window.getAdvocateRepresentation || (typeof getAdvocateRepresentation === 'function' ? getAdvocateRepresentation : null);
    const rep = getRep ? getRep(c) : null;
    const repIconSvg = rep && rep.pillClass === 'df'
      ? `<svg class="lucide lucide-shield" xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`
      : `<svg class="lucide lucide-scale" xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>`;

    html += `
      <article class="case${isOpen ? ' open' : ''}" data-court="${esc(courtName.toLowerCase())}" data-id="${esc(caseId)}">
        <button
          type="button"
          class="case-head"
          aria-expanded="${isOpen ? 'true' : 'false'}"
          onclick="(window.toggleCaseAccordion || toggleCaseAccordion)(this)"
        >
          <div class="c-title-col">
            <span class="c-title" title="${esc(displayCaseName)}"><span class="case-name">${esc(displayCaseName)}</span></span>
          </div>
          <span class="c-court" title="${esc(courtName)}"><svg class="lucide lucide-landmark" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg> <span>${esc(courtName)}${judgeDisplay ? ` · ${esc(judgeDisplay)}` : ''}</span></span>
          <span class="c-no"><span class="case-no">#${esc(caseNo)}</span></span>
          <span class="tag ${tagClass}">${esc(tagLabel)}</span>
          <span class="chev" aria-hidden="true"><svg class="lucide lucide-chevron-down" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></span>
        </button>

        <div class="case-body">
          <div class="inner">
            <div class="body-pad">
              <!-- 3-COLUMN STRUCTURED LEDGER TABLE -->
              <div class="meta-ledger-3col">
                <!-- COLUMN 1: CASE & CLIENT -->
                <div class="ledger-col">
                  <div class="ledger-row">
                    <span class="ledger-lbl"><svg class="lucide lucide-user" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> Client:</span>
                    <span class="ledger-val client-name">${esc(client !== '—' ? client : 'Chambers Record')}</span>
                  </div>
                  <div class="ledger-row">
                    <span class="ledger-lbl"><svg class="lucide lucide-phone" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> Contact:</span>
                    <span class="ledger-val client-phone-num">${esc(phone || '—')}</span>
                  </div>
                  ${rep ? `
                  <div class="ledger-row">
                    <span class="ledger-lbl"><svg class="lucide lucide-shield" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Side / Role:</span>
                    <span class="ledger-val"><span class="rep-pill ${rep.pillClass}">${repIconSvg} <span>${esc(rep.label)}</span></span></span>
                  </div>` : ''}
                  <div class="ledger-row">
                    <span class="ledger-lbl"><svg class="lucide lucide-scale" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg> Category:</span>
                    <span class="ledger-val">${esc(tagLabel)} Matter</span>
                  </div>
                  <div class="ledger-row">
                    <span class="ledger-lbl"><svg class="lucide lucide-gavel" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8"/><path d="m16 16 6-6"/><path d="m8 8 6-6"/><path d="m9 7 8 8"/><path d="m21 11-8-8"/></svg> Stage:</span>
                    <span class="ledger-val stage-text">${esc(displayStage || 'Scheduled Hearing')}</span>
                  </div>
                </div>

                <!-- COLUMN 2: HEARING & FORUM / POLICE -->
                <div class="ledger-col">
                  <div class="ledger-row">
                    <span class="ledger-lbl"><svg class="lucide lucide-clock" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> Previous:</span>
                    <span class="ledger-val prev-date-text">${esc(prevHearingDisplay)}</span>
                  </div>
                  ${forumDetails.isCriminal ? `
                  <div class="ledger-row">
                    <span class="ledger-lbl"><svg class="lucide lucide-shield" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg> Police Station:</span>
                    <span class="ledger-val ps-text">${esc(forumDetails.ps)}</span>
                  </div>
                  <div class="ledger-row">
                    <span class="ledger-lbl"><svg class="lucide lucide-file-text" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg> FIR:</span>
                    <span class="ledger-val fir-text">${esc(forumDetails.fir)}</span>
                  </div>
                  <div class="ledger-row">
                    <span class="ledger-lbl"><svg class="lucide lucide-scale" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg> u/s:</span>
                    <span class="ledger-val sec-text">${esc(forumDetails.sec)}</span>
                  </div>
                  ` : `
                  <div class="ledger-row">
                    <span class="ledger-lbl"><svg class="lucide lucide-calendar" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M8 2v4"/><path d="M16 2v4"/><path d="M3 10h18"/></svg> Filing Date:</span>
                    <span class="ledger-val filing-date-text">${esc(forumDetails.filingDate)}</span>
                  </div>
                  ${forumDetails.caseYear ? `
                  <div class="ledger-row">
                    <span class="ledger-lbl"><svg class="lucide lucide-hash" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/></svg> Case Year:</span>
                    <span class="ledger-val year-text">${esc(forumDetails.caseYear)}</span>
                  </div>` : ''}
                  `}
                </div>

                <!-- COLUMN 3: CASE REMARKS / ORDER NOTE -->
                <div class="ledger-col ledger-remarks-col">
                  <div class="remarks-header">
                    <svg class="lucide lucide-file-text memo-ico" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg> Remarks / Order Note
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
                    <svg class="lucide lucide-calendar-plus" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M10 16h4"/><path d="M12 14v4"/></svg> <span class="act-text">Update Next Date</span>
                  </button>

                  <button
                    type="button"
                    class="act act-dossier"
                    onclick="event.stopPropagation(); if (typeof openCaseDetailsFullModal === 'function') openCaseDetailsFullModal('${esc(caseNo)}'); else if (typeof openCaseHistoryModalByNo === 'function') openCaseHistoryModalByNo('${esc(caseNo)}');"
                    title="Full Case Dossier Kholein"
                  >
                    <svg class="lucide lucide-folder-open" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/></svg> <span class="act-text">Open Dossier</span>
                  </button>

                  ${cleanPhone
                    ? `<a
                          class="act act-call"
                          href="tel:${esc(cleanPhone)}"
                          title="Call Client: ${esc(phone)}"
                        >
                          <svg class="lucide lucide-phone" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> <span class="act-text">Call Client</span>
                        </a>`
                    : `<button type="button" class="act act-call disabled" disabled title="No client phone">
                          <svg class="lucide lucide-phone" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> <span class="act-text">Call</span>
                        </button>`
                  }

                  <button
                    type="button"
                    class="act act-whatsapp"
                    onclick="event.stopPropagation(); sendWhatsAppHearingNotice('${esc(caseNo)}')"
                    title="Send WhatsApp Notice"
                  >
                    <svg class="lucide lucide-message-circle" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg> <span class="act-text">WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    class="act act-passover"
                    onclick="event.stopPropagation(); copyCalPassOverNote('${esc(caseNo)}')"
                    title="Pass-Over / Haziri Request Slip Copy Karein"
                  >
                    <svg class="lucide lucide-receipt" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-8"/><path d="M16 12h-8"/><path d="M14 16h-6"/></svg> <span class="act-text">Pass-Over Slip</span>
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
  updateCalMobileSortUI();
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

function initCalendarTab() {
  const now = new Date();
  if (!selectedCalendarDate || typeof selectedCalendarDate.day !== 'number') {
    selectedCalendarDate = { day: now.getDate(), month: now.getMonth(), year: now.getFullYear() };
  }
  if (typeof currentCalendarYear !== 'number') currentCalendarYear = now.getFullYear();
  if (typeof currentCalendarMonth !== 'number') currentCalendarMonth = now.getMonth();
  if (typeof window !== 'undefined') {
    window.selectedCalendarDate = selectedCalendarDate;
    window.currentCalendarYear = currentCalendarYear;
    window.currentCalendarMonth = currentCalendarMonth;
  }
  renderCalendarView(currentCalendarYear, currentCalendarMonth);
}
if (typeof initCalendarTab !== 'undefined') window.initCalendarTab = initCalendarTab;

// Auto-refresh when case data syncs or updates from Supabase or local storage
if (typeof window !== 'undefined') {
  window.addEventListener('casebook:data-synced', () => {
    const yr = (typeof currentCalendarYear === 'number') ? currentCalendarYear : new Date().getFullYear();
    const mo = (typeof currentCalendarMonth === 'number') ? currentCalendarMonth : new Date().getMonth();
    renderCalendarView(yr, mo);
  });
  window.addEventListener('casebook:cases-updated', () => {
    const yr = (typeof currentCalendarYear === 'number') ? currentCalendarYear : new Date().getFullYear();
    const mo = (typeof currentCalendarMonth === 'number') ? currentCalendarMonth : new Date().getMonth();
    renderCalendarView(yr, mo);
  });
}

// Auto-render on initial load if grid container is present in DOM
if (typeof document !== 'undefined') {
  const _autoInitCalendar = () => {
    if (typeof document === 'undefined') return;
    const grid = document.getElementById('calendarGrid');
    if (grid && (!grid.children || grid.children.length === 0)) {
      initCalendarTab();
    }
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _autoInitCalendar);
  } else {
    setTimeout(_autoInitCalendar, 50);
  }
}
