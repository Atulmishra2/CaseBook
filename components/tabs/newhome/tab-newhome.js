/* ============================================================
   CASEBOOK — NewHome Zen Dashboard Engine
   Location: components/tabs/newhome/tab-newhome.js
   
   Refactored modular dashboard with real dynamic data binding,
   color-token synchronization, and interactive widgets.
   ============================================================ */

window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs["newhome"] = /* html */ `
<div class="newhome-container">
  
  <!-- ==================== EXECUTIVE GREETING HEADER ==================== -->
  <header class="newhome-hero">
    <div class="newhome-hero-content">
      <div class="newhome-hero-text">
        <div class="newhome-hero-kicker" id="newhomeHeroDate">
          <i class="fa-solid fa-scale-balanced"></i>
          <span>Hilary Term • Daily Judicial Docket</span>
        </div>
        <h1 class="newhome-hero-title" id="newhomeHeroGreeting">Good Day, Advocate.</h1>
        <p class="newhome-hero-subtitle">Daily court docket, active caseload, and chambers agenda for immediate representation.</p>
      </div>
      <div class="newhome-hero-actions">
        <button type="button" class="newhome-btn newhome-btn-secondary" onclick="showTab('causelist')">
          <i class="fa-solid fa-list-check"></i>
          <span>Daily Cause List</span>
        </button>
        <button type="button" class="newhome-btn newhome-btn-primary" onclick="showTab('manage')">
          <i class="fa-solid fa-plus"></i>
          <span>New Case</span>
        </button>
      </div>
    </div>
  </header>

  <!-- ==================== MAIN GRID ==================== -->
  <div class="newhome-grid">
    
    <!-- LEFT COLUMN: STATS + TIMELINE -->
    <div class="newhome-col-main">
      
      <!-- Executive KPI Cards (3-Column Grid) -->
      <div class="newhome-stats-row">
        <!-- Card 1: Total Matters -->
        <div class="newhome-stat-card newhome-stat-total" onclick="showTab('all', event)" title="View all case records">
          <div class="newhome-stat-indicator indicator-sapphire"></div>
          <div class="newhome-stat-top">
            <span class="newhome-stat-label">Total Matters Docketed</span>
            <div class="newhome-stat-icon-box icon-sapphire">
              <i class="fa-solid fa-folder-closed"></i>
            </div>
          </div>
          <div class="newhome-stat-value" id="newhomeTotalCases">0</div>
          <div class="newhome-stat-meta" id="newhomeBreakdown">0 Civil • 0 Criminal • 0 Revenue</div>
        </div>

        <!-- Card 2: Active Pending -->
        <div class="newhome-stat-card newhome-stat-pending" onclick="showTab('all', event)" title="View active pending cases">
          <div class="newhome-stat-indicator indicator-amber"></div>
          <div class="newhome-stat-top">
            <span class="newhome-stat-label">Active Hearing Matters</span>
            <div class="newhome-stat-icon-box icon-amber">
              <i class="fa-solid fa-hourglass-half"></i>
            </div>
          </div>
          <div class="newhome-stat-value" id="newhomePendingCases">0</div>
          <div class="newhome-stat-meta" id="newhomePendingPercent">0% of total caseload</div>
        </div>

        <!-- Card 3: Disposed / Decreed -->
        <div class="newhome-stat-card newhome-stat-disposed" onclick="showTab('disposed', event)" title="View disposed and closed cases">
          <div class="newhome-stat-indicator indicator-emerald"></div>
          <div class="newhome-stat-top">
            <span class="newhome-stat-label">Disposed / Decreed</span>
            <div class="newhome-stat-icon-box icon-emerald">
              <i class="fa-solid fa-circle-check"></i>
            </div>
          </div>
          <div class="newhome-stat-value" id="newhomeDisposedCases">0</div>
          <div class="newhome-stat-meta" id="newhomeDisposedPercent">0% Resolution Rate</div>
        </div>
      </div>

      <!-- Today's Schedule & Judicial Docket -->
      <div class="newhome-card newhome-timeline-card">
        <div class="newhome-card-header">
          <div class="newhome-card-title-wrap">
            <div class="newhome-header-icon-box">
              <i class="fa-regular fa-calendar-days"></i>
            </div>
            <div>
              <div class="newhome-card-title-row">
                <h2 class="newhome-card-title">Today's Schedule</h2>
                <span class="newhome-live-chip" title="Real-time live docket synchronization active">
                  <span class="newhome-live-dot"></span>
                  <span>LIVE</span>
                </span>
              </div>
              <span class="newhome-card-caption">Chronological Court Listings & Sittings</span>
            </div>
          </div>
          <div class="newhome-card-header-actions">
            <span class="newhome-badge newhome-badge-primary" id="newhomeTimelineBadge">0 Hearings</span>
            <button type="button" class="newhome-icon-action-btn" id="newhomeTimelineSyncBtn" onclick="refreshNewHomeLiveTimeline()" title="Sync live timeline data">
              <i class="fa-solid fa-arrows-rotate" id="newhomeTimelineSyncIcon"></i>
            </button>
          </div>
        </div>

        <!-- Timeline container -->
        <div class="newhome-timeline-wrapper">
          <div class="newhome-timeline-track" id="newhomeTimelineList">
            <!-- Dynamic items rendered by JavaScript -->
          </div>

          <!-- Empty state when no hearings today -->
          <div class="newhome-empty-state" id="newhomeTimelineEmpty" style="display: none;">
            <div class="newhome-empty-icon-wrap">
              <i class="fa-solid fa-scale-balanced"></i>
            </div>
            <h3 class="newhome-empty-title">No Court Appearances Scheduled Today</h3>
            <p class="newhome-empty-desc">Your daily docket has no listed matters for today. You can review upcoming hearings or check forward dates.</p>
            <div class="newhome-empty-actions">
              <button type="button" class="newhome-btn newhome-btn-sm newhome-btn-outline" onclick="showTab('upcoming')">
                <i class="fa-regular fa-calendar"></i>
                <span>View 7-Day Docket</span>
              </button>
              <button type="button" class="newhome-btn newhome-btn-sm newhome-btn-outline" onclick="showTab('causelist')">
                <i class="fa-solid fa-list-check"></i>
                <span>Daily Cause List</span>
              </button>
              <button type="button" class="newhome-btn newhome-btn-sm newhome-btn-secondary" onclick="showTab('hearing')">
                <i class="fa-solid fa-calendar-plus"></i>
                <span>Forward Hearing Date</span>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- RIGHT COLUMN: CHART + PENDING TASKS -->
    <div class="newhome-col-side">
      
      <!-- Case Status Overview (Telemetry Bar Chart) -->
      <div class="newhome-card newhome-chart-card">
        <div class="newhome-card-header">
          <div class="newhome-card-title-wrap">
            <div class="newhome-header-icon-box">
              <i class="fa-solid fa-chart-simple"></i>
            </div>
            <div>
              <h2 class="newhome-card-title">Case Status</h2>
              <span class="newhome-card-caption">Docket Distribution</span>
            </div>
          </div>
        </div>

        <div class="newhome-chart-stage">
          <!-- Horizontal dashed guide lines -->
          <div class="newhome-chart-gridlines" aria-hidden="true">
            <div class="newhome-grid-line"></div>
            <div class="newhome-grid-line"></div>
            <div class="newhome-grid-line"></div>
          </div>

          <!-- Bar 1: Undated -->
          <div class="newhome-bar-col group" onclick="showTab('all', event)" title="Undated active cases">
            <div class="newhome-bar-wrap">
              <span class="newhome-bar-tooltip" id="newhomeBarUndatedVal">0</span>
              <div class="newhome-bar bar-undated" id="newhomeBarUndated" style="height: 10%;"></div>
            </div>
            <span class="newhome-bar-label">Undated</span>
          </div>

          <!-- Bar 2: Pending -->
          <div class="newhome-bar-col group" onclick="showTab('all', event)" title="Pending cases">
            <div class="newhome-bar-wrap">
              <span class="newhome-bar-tooltip" id="newhomeBarPendingVal">0</span>
              <div class="newhome-bar bar-pending" id="newhomeBarPending" style="height: 10%;"></div>
            </div>
            <span class="newhome-bar-label">Pending</span>
          </div>

          <!-- Bar 3: Disposed -->
          <div class="newhome-bar-col group" onclick="showTab('disposed', event)" title="Disposed cases">
            <div class="newhome-bar-wrap">
              <span class="newhome-bar-tooltip" id="newhomeBarDisposedVal">0</span>
              <div class="newhome-bar bar-disposed" id="newhomeBarDisposed" style="height: 10%;"></div>
            </div>
            <span class="newhome-bar-label">Disposed</span>
          </div>

          <!-- Bar 4: Upcoming -->
          <div class="newhome-bar-col group" onclick="showTab('upcoming', event)" title="Upcoming hearings within 7 days">
            <div class="newhome-bar-wrap">
              <span class="newhome-bar-tooltip" id="newhomeBarUpcomingVal">0</span>
              <div class="newhome-bar bar-upcoming" id="newhomeBarUpcoming" style="height: 10%;"></div>
            </div>
            <span class="newhome-bar-label">Upcoming</span>
          </div>
        </div>
      </div>

      <!-- Pending Tasks Widget -->
      <div class="newhome-card newhome-tasks-card">
        <div class="newhome-card-header">
          <div class="newhome-card-title-wrap">
            <div class="newhome-header-icon-box">
              <i class="fa-solid fa-list-check"></i>
            </div>
            <div>
              <h2 class="newhome-card-title">Pending Tasks</h2>
              <span class="newhome-card-caption">Chambers Deliverables</span>
            </div>
          </div>
          <div class="newhome-card-header-actions">
            <span class="newhome-badge newhome-badge-danger" id="newhomeTasksDueBadge" style="display: none;">0 Due</span>
            <button type="button" class="newhome-icon-action-btn" onclick="showTab('todo')" title="Open Full Tasks & Deadlines">
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </button>
          </div>
        </div>

        <div class="newhome-tasks-scroll custom-scrollbar" id="newhomeTasksList">
          <!-- Dynamically populated tasks -->
        </div>

        <!-- Empty state when no tasks -->
        <div class="newhome-tasks-empty" id="newhomeTasksEmpty" style="display: none;">
          <div class="newhome-tasks-empty-icon">
            <i class="fa-solid fa-clipboard-check"></i>
          </div>
          <p class="newhome-tasks-empty-title">All Chambers Tasks Completed</p>
          <span class="newhome-tasks-empty-sub">No pending statutory deadlines or filings</span>
        </div>

        <!-- Add Task Footer Button -->
        <button type="button" class="newhome-btn-add-task" onclick="showTab('todo')">
          <i class="fa-solid fa-plus"></i>
          <span>Add New Chambers Task</span>
        </button>
      </div>

    </div>

  </div>

</div>
`;

// Helper: safe string escaping
function escapeNewHomeHtml(text) {
  if (text == null) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Classifier for case categories (civil, criminal, revenue)
function getNewHomeCategory(c) {
  if (!c) return "civil";
  const rawType = (c.caseType || "").toLowerCase().trim();
  if (
    ["criminal", "state", "complaint", "misc_criminal", "misccriminal"].includes(rawType) ||
    Boolean(c.criminalCaseNumber) ||
    Boolean(c.accusedName) ||
    Boolean(c.victimName) ||
    (c.criminalCourtName &&
      String(c.criminalCourtName).trim() &&
      String(c.criminalCourtName).toLowerCase() !== "district court")
  ) {
    return "criminal";
  }
  if (
    rawType === "revenue" ||
    (c.courtName && c.courtName.toLowerCase().includes("revenue")) ||
    (c.caseNo &&
      (c.caseNo.toLowerCase().includes("rev") || c.caseNo.toLowerCase().includes("r.c.")))
  ) {
    return "revenue";
  }
  return "civil";
}

// Helper: Check whether a record is disposed/closed
function isCaseDisposedRecord(c) {
  if (!c) return false;
  if (typeof isCaseDisposed === "function") {
    try {
      return isCaseDisposed(c);
    } catch (e) {}
  }
  const status = String(c.caseStatus || c.status || c.case_status || "").toLowerCase().trim();
  return (
    status.includes("dispose") ||
    status.includes("decided") ||
    status.includes("closed") ||
    status.includes("dismissed")
  );
}

// Helper: Get local YYYY-MM-DD date string (avoids UTC offset shifts)
function getLocalTodayISO() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Helper: Compare any date value against today (handles local timezone, UTC ISO split, and DMY formats)
function isDateToday(dateInput) {
  if (!dateInput || dateInput === "—" || dateInput === "null" || dateInput === "undefined") return false;
  const localTodayISO = getLocalTodayISO();
  const utcTodayISO = new Date().toISOString().split("T")[0];
  const str = String(dateInput).trim();

  // Direct string matches
  if (str === localTodayISO || str === utcTodayISO) return true;

  // 1. Try global toISODate if available
  if (typeof toISODate === "function") {
    try {
      const iso = toISODate(dateInput);
      if (iso === localTodayISO || iso === utcTodayISO) return true;
    } catch (e) {}
  }

  // 2. Try global parseDateString if available
  if (typeof parseDateString === "function") {
    try {
      const parsed = parseDateString(dateInput);
      if (parsed) {
        const now = new Date();
        if (
          parsed.getFullYear() === now.getFullYear() &&
          parsed.getMonth() === now.getMonth() &&
          parsed.getDate() === now.getDate()
        ) {
          return true;
        }
      }
    } catch (e) {}
  }

  // 3. Fallback regex match for YYYY-MM-DD or DD/MM/YYYY
  const ymdMatch = str.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/);
  if (ymdMatch) {
    const iso = `${ymdMatch[1]}-${ymdMatch[2].padStart(2, "0")}-${ymdMatch[3].padStart(2, "0")}`;
    if (iso === localTodayISO || iso === utcTodayISO) return true;
  }
  const dmyMatch = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
  if (dmyMatch) {
    const iso = `${dmyMatch[3]}-${dmyMatch[2].padStart(2, "0")}-${dmyMatch[1].padStart(2, "0")}`;
    if (iso === localTodayISO || iso === utcTodayISO) return true;
  }

  // 4. Native Date fallback
  const d = new Date(str);
  if (!isNaN(d.getTime())) {
    const now = new Date();
    if (
      d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate()
    ) {
      return true;
    }
  }
  return false;
}

// Helper: Parse time string to minutes from midnight for chronological sorting
function parseTimeToMinutes(timeStr) {
  if (!timeStr) return 10 * 60; // Default 10:00 AM
  const str = String(timeStr).trim().toUpperCase();
  const match = str.match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?/);
  if (!match) return 10 * 60;
  let hours = parseInt(match[1], 10);
  const minutes = match[2] ? parseInt(match[2], 10) : 0;
  const meridiem = match[3];
  if (meridiem === "PM" && hours < 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

// Helper: Sanitize & normalize court process / stage strings (fixes typos, casing, and expands abbreviations)
function formatNewHomeProcess(processStr) {
  if (!processStr) return "Listed Hearing";
  let s = String(processStr).trim();
  if (!s) return "Listed Hearing";

  // Common court spelling typo fixes
  s = s.replace(/\bapperance\b/gi, "Appearance");
  s = s.replace(/\bexpare\b/gi, "Ex-Parte");
  s = s.replace(/\bexparte\b/gi, "Ex-Parte");
  s = s.replace(/\bex\s*parte\b/gi, "Ex-Parte");
  s = s.replace(/framing of cha(\.\.\.|\b)/gi, "Framing of Charges");
  s = s.replace(/recall a(\.\.\.|\b)/gi, "Recall Application");

  // Fix casing if starts with lowercase "hearing on "
  if (/^hearing on /i.test(s)) {
    s = s.replace(/^hearing on /i, "Hearing on ");
  }

  return s;
}

// Helper: Format remarks / co-accused notes (proper spacing after commas)
function formatNewHomeRemarks(remarksStr) {
  if (!remarksStr) return "";
  let s = String(remarksStr).trim();
  if (!s) return "";

  // Add space after comma if followed immediately by alphanumeric (e.g. 1-Rudai,2-Devlal -> 1-Rudai, 2-Devlal)
  s = s.replace(/,([^\s])/g, ", $1");

  return s;
}

// Helper: Unified getter for live case records across memory and storage
function getLiveCaseRecords() {
  if (typeof allCaseRecords !== "undefined" && Array.isArray(allCaseRecords) && allCaseRecords.length > 0) {
    return allCaseRecords;
  }
  if (typeof window !== "undefined" && Array.isArray(window.allCaseRecords) && window.allCaseRecords.length > 0) {
    return window.allCaseRecords;
  }
  if (typeof window !== "undefined" && Array.isArray(window.cases) && window.cases.length > 0) {
    return window.cases;
  }
  try {
    const raw = localStorage.getItem("cmAllCasesBackup") || localStorage.getItem("allCaseRecords");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  return [];
}

// Main Render Function for NewHome Dashboard
function renderNewHomeDashboard() {
  const container = document.querySelector(".newhome-container");
  if (!container) return;

  const records = getLiveCaseRecords();

  const now = new Date();
  const todayISO = getLocalTodayISO();

  // 1. Dynamic Greeting
  const greetingEl = document.getElementById("newhomeHeroGreeting");
  const dateEl = document.getElementById("newhomeHeroDate");
  const hours = now.getHours();
  let timeGreeting = "Good Day";
  if (hours < 12) timeGreeting = "Good Morning";
  else if (hours < 17) timeGreeting = "Good Afternoon";
  else timeGreeting = "Good Evening";

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const formattedDate = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

  if (greetingEl) {
    greetingEl.textContent = `${timeGreeting}, Advocate Atul Mishra.`;
  }
  if (dateEl) {
    dateEl.innerHTML = `<i class="fa-solid fa-scale-balanced"></i> <span>${formattedDate.toUpperCase()} • DAILY DOCKET</span>`;
  }

  // 2. Metrics & Calculations
  const totalCount = records.length;
  const civilCount = records.filter((c) => getNewHomeCategory(c) === "civil").length;
  const criminalCount = records.filter((c) => getNewHomeCategory(c) === "criminal").length;
  const revenueCount = records.filter((c) => getNewHomeCategory(c) === "revenue").length;

  const disposedCount = records.filter(isCaseDisposedRecord).length;
  const pendingCount = Math.max(0, totalCount - disposedCount);

  const pendingPercent = totalCount > 0 ? Math.round((pendingCount / totalCount) * 100) : 0;
  const disposedPercent = totalCount > 0 ? Math.round((disposedCount / totalCount) * 100) : 0;

  // Undated active cases
  const undatedCount = records.filter((c) => {
    if (isCaseDisposedRecord(c)) return false;
    const nh = c.nextHearing;
    if (!nh || nh === "—" || nh === "null" || !String(nh).trim() || String(nh).toLowerCase() === "undated") return true;
    if (isDateToday(nh)) return false;
    const iso = typeof toISODate === "function" ? toISODate(nh) : String(nh).slice(0, 10);
    const utcISO = new Date().toISOString().split("T")[0];
    return !iso || (iso < todayISO && iso < utcISO);
  }).length;

  // Today's cases (synchronized with live database, excluding disposed)
  const todayCases = records.filter((c) => {
    if (isCaseDisposedRecord(c)) return false;
    return isDateToday(c.nextHearing);
  });

  // Upcoming 7 days cases
  const todayZero = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const in7Days = todayZero + 7 * 24 * 60 * 60 * 1000 + (23 * 3600 * 1000);
  const upcomingCases = records.filter((c) => {
    if (isCaseDisposedRecord(c)) return false;
    if (!c.nextHearing || c.nextHearing === "—" || c.nextHearing === "null" || !String(c.nextHearing).trim()) return false;
    const iso = typeof toISODate === "function" ? toISODate(c.nextHearing) : String(c.nextHearing).slice(0, 10);
    if (!iso) return false;
    const t = new Date(iso).getTime();
    return t >= todayZero && t <= in7Days;
  });

  // 3. Update Stats Row
  const totalEl = document.getElementById("newhomeTotalCases");
  const breakdownEl = document.getElementById("newhomeBreakdown");
  const pendingEl = document.getElementById("newhomePendingCases");
  const pendingPercentEl = document.getElementById("newhomePendingPercent");
  const disposedEl = document.getElementById("newhomeDisposedCases");
  const disposedPercentEl = document.getElementById("newhomeDisposedPercent");

  if (totalEl) totalEl.textContent = String(totalCount);
  if (breakdownEl) breakdownEl.textContent = `${civilCount} Civil • ${criminalCount} Criminal • ${revenueCount} Revenue`;
  if (pendingEl) pendingEl.textContent = String(pendingCount);
  if (pendingPercentEl) pendingPercentEl.textContent = `${pendingPercent}% of total caseload`;
  if (disposedEl) disposedEl.textContent = String(disposedCount);
  if (disposedPercentEl) disposedPercentEl.textContent = `${disposedPercent}% Resolution Rate`;

  // 4. Update Case Status Overview Bar Chart
  const barUndated = document.getElementById("newhomeBarUndated");
  const barUndatedVal = document.getElementById("newhomeBarUndatedVal");
  const barPending = document.getElementById("newhomeBarPending");
  const barPendingVal = document.getElementById("newhomeBarPendingVal");
  const barDisposed = document.getElementById("newhomeBarDisposed");
  const barDisposedVal = document.getElementById("newhomeBarDisposedVal");
  const barUpcoming = document.getElementById("newhomeBarUpcoming");
  const barUpcomingVal = document.getElementById("newhomeBarUpcomingVal");

  if (barUndatedVal) barUndatedVal.textContent = String(undatedCount);
  if (barPendingVal) barPendingVal.textContent = String(pendingCount);
  if (barDisposedVal) barDisposedVal.textContent = String(disposedCount);
  if (barUpcomingVal) barUpcomingVal.textContent = String(upcomingCases.length);

  // Compute proportional heights (relative to maximum, normalized with min 12% for visibility)
  const maxVal = Math.max(undatedCount, pendingCount, disposedCount, upcomingCases.length, 1);
  const calcHeight = (val) => {
    if (val === 0) return "8%";
    const pct = Math.round((val / maxVal) * 88) + 12;
    return `${Math.min(100, pct)}%`;
  };

  const setBar = (bar, val) => {
    if (!bar) return;
    const h = calcHeight(val);
    bar.style.height = h;
    bar.style.setProperty("--bar-pct", h);
  };
  setBar(barUndated, undatedCount);
  setBar(barPending, pendingCount);
  setBar(barDisposed, disposedCount);
  setBar(barUpcoming, upcomingCases.length);

  // 5. Populate Today's Timeline with Live Data
  const timelineBadge = document.getElementById("newhomeTimelineBadge");
  const timelineList = document.getElementById("newhomeTimelineList");
  const timelineEmpty = document.getElementById("newhomeTimelineEmpty");

  if (timelineBadge) {
    timelineBadge.textContent = `${todayCases.length} ${todayCases.length === 1 ? "Hearing" : "Hearings"}`;
  }

  if (todayCases.length === 0) {
    if (timelineList) timelineList.style.display = "none";
    if (timelineEmpty) timelineEmpty.style.display = "flex";
  } else {
    if (timelineEmpty) timelineEmpty.style.display = "none";
    if (timelineList) {
      timelineList.style.display = "block";
      
      // Sort chronologically: 1) Hearing Time, 2) Court Name, 3) Room, 4) Case Number
      todayCases.sort((a, b) => {
        const timeA = parseTimeToMinutes(a.hearingTime || a.time);
        const timeB = parseTimeToMinutes(b.hearingTime || b.time);
        if (timeA !== timeB) return timeA - timeB;

        const courtA = (a.courtName || a.criminalCourtName || "").toUpperCase();
        const courtB = (b.courtName || b.criminalCourtName || "").toUpperCase();
        if (courtA !== courtB) return courtA.localeCompare(courtB);

        const roomA = (a.courtRoom || "").toUpperCase();
        const roomB = (b.courtRoom || "").toUpperCase();
        if (roomA !== roomB) return roomA.localeCompare(roomB);

        const numA = (a.caseNo || a.criminalCaseNumber || "").toUpperCase();
        const numB = (b.caseNo || b.criminalCaseNumber || "").toUpperCase();
        return numA.localeCompare(numB);
      });

      let timelineHtml = "";
      todayCases.forEach((c) => {
        const cat = getNewHomeCategory(c);
        const caseNumber = c.caseNo || c.criminalCaseNumber || c.case_number || c.caseNumber || c.caseId || c.case_id || "";
        const court = c.courtName || c.criminalCourtName || c.court || c.court_name || "District Court";
        
        let title = c.caseName || c.title || "";
        if (!title) {
          if (c.plaintiff && c.defendant) {
            title = `${c.plaintiff} vs. ${c.defendant}`;
          } else if (c.accusedName && c.victimName) {
            title = `${c.victimName} vs. ${c.accusedName}`;
          } else if (c.accusedName) {
            title = `State vs. ${c.accusedName}`;
          } else if (c.clientName) {
            title = c.clientName;
          } else {
            title = caseNumber || "Listed Matter";
          }
        }

        const dotClass = cat === "criminal" ? "dot-criminal" : cat === "revenue" ? "dot-revenue" : "dot-civil";

        timelineHtml += `
          <div class="newhome-timeline-item">
            <div class="newhome-timeline-dot ${dotClass}"></div>
            <div class="newhome-timeline-content" onclick="if (typeof openCaseDetailsFullModal === 'function') openCaseDetailsFullModal('${escapeNewHomeHtml(caseNumber)}'); else if (typeof openCaseHistoryModalByNo === 'function') openCaseHistoryModalByNo('${escapeNewHomeHtml(caseNumber)}');" role="button" tabindex="0" title="Open Case Dossier: ${escapeNewHomeHtml(caseNumber || title)}">
              <h3 class="newhome-timeline-title">${escapeNewHomeHtml(title)}</h3>
              <p class="newhome-timeline-court">
                <i class="fa-solid fa-landmark"></i>
                <span>${escapeNewHomeHtml(court)}</span>
              </p>
            </div>
          </div>
        `;
      });

      timelineList.innerHTML = timelineHtml;
    }
  }

  // 6. Populate Pending Tasks
  renderNewHomeTasks();

  // 7. Responsive Layout Sync (Shifts Case Status into KPI row on mobile)
  syncNewHomeMobileLayout();
}

// Responsive Layout Synchronizer: Moves Case Status into the KPI swipe row on mobile (<= 640px)
function syncNewHomeMobileLayout() {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const statsRow = document.querySelector(".newhome-stats-row");
  const chartCard = document.querySelector(".newhome-chart-card");
  const sideCol = document.querySelector(".newhome-col-side");
  const tasksCard = document.querySelector(".newhome-tasks-card");
  if (!statsRow || !chartCard || !sideCol) return;

  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    if (chartCard.parentElement !== statsRow) {
      statsRow.appendChild(chartCard);
    }
  } else {
    if (chartCard.parentElement !== sideCol) {
      if (tasksCard) {
        sideCol.insertBefore(chartCard, tasksCard);
      } else {
        sideCol.appendChild(chartCard);
      }
    }
  }
}

// Function to trigger live refresh of timeline and dashboard from Supabase
async function refreshNewHomeLiveTimeline() {
  const syncBtn = document.getElementById("newhomeTimelineSyncBtn");
  const syncIcon = document.getElementById("newhomeTimelineSyncIcon");
  if (syncIcon) syncIcon.classList.add("fa-spin");
  if (syncBtn) syncBtn.disabled = true;

  try {
    if (typeof fetchAllDataFromSupabase === "function") {
      await fetchAllDataFromSupabase();
    }
  } catch (err) {
    console.warn("Live timeline refresh from Supabase warning:", err);
  } finally {
    renderNewHomeDashboard();
    if (syncIcon) {
      setTimeout(() => {
        syncIcon.classList.remove("fa-spin");
        if (syncBtn) syncBtn.disabled = false;
      }, 500);
    }
  }
}

// Function to render tasks list inside NewHome
function renderNewHomeTasks() {
  const tasksContainer = document.getElementById("newhomeTasksList");
  const tasksBadge = document.getElementById("newhomeTasksDueBadge");
  const tasksEmpty = document.getElementById("newhomeTasksEmpty");
  if (!tasksContainer) return;

  let rawTasks = [];
  if (Array.isArray(window.caseTasks)) {
    rawTasks = window.caseTasks;
  } else {
    try {
      const stored = localStorage.getItem("cmCaseTasks");
      if (stored) rawTasks = JSON.parse(stored);
    } catch (e) {}
  }

  const isCompleted = (t) => {
    const s = String(t.status || "").toLowerCase().trim();
    return s === "completed" || s === "done" || s === "closed" || Boolean(t.completed) || Boolean(t.isDone);
  };

  const pending = rawTasks.filter((t) => !isCompleted(t));

  if (tasksBadge) {
    tasksBadge.textContent = `${pending.length} Due`;
    tasksBadge.style.display = pending.length > 0 ? "inline-flex" : "none";
  }

  if (pending.length === 0) {
    tasksContainer.innerHTML = "";
    tasksContainer.style.display = "none";
    if (tasksEmpty) tasksEmpty.style.display = "flex";
    return;
  }

  tasksContainer.style.display = "flex";
  if (tasksEmpty) tasksEmpty.style.display = "none";

  // Show only pending tasks
  const displayTasks = pending;

  let html = "";
  displayTasks.forEach((t) => {
    const done = isCompleted(t);
    const taskId = t.id || t.taskId;
    const title = t.taskTitle || t.title || "Untitled Task";
    const deadline = t.deadlineDate || t.deadline || "";
    const priority = (t.priority || "").toLowerCase();

    let dueText = deadline ? `Due ${deadline}` : "No deadline";
    const isUrgent = priority === "high" || dueText.toLowerCase().includes("today");

    html += `
      <div class="newhome-task-item ${done ? "completed" : ""}" onclick="handleNewHomeTaskToggle('${escapeNewHomeHtml(taskId)}')">
        <button type="button" class="newhome-task-checkbox" aria-label="Toggle task status">
          <i class="fa-solid fa-check"></i>
        </button>
        <div class="newhome-task-body">
          <p class="newhome-task-title">${escapeNewHomeHtml(title)}</p>
          <div class="newhome-task-meta">
            <span class="newhome-task-due ${isUrgent ? "due-urgent" : ""}">
              <i class="fa-regular fa-clock"></i>
              ${escapeNewHomeHtml(dueText)}
            </span>
            ${t.caseNo ? `<span class="newhome-task-case">• ${escapeNewHomeHtml(t.caseNo)}</span>` : ""}
          </div>
        </div>
      </div>
    `;
  });

  tasksContainer.innerHTML = html;
}

// Handler for toggling task from NewHome tab
async function handleNewHomeTaskToggle(taskId) {
  if (typeof toggleTaskStatus === "function") {
    try {
      await toggleTaskStatus(taskId);
      renderNewHomeTasks();
      return;
    } catch (e) {
      console.warn("toggleTaskStatus error, falling back locally:", e);
    }
  }

  // Local fallback
  if (Array.isArray(window.caseTasks)) {
    const task = window.caseTasks.find((t) => (t.id || t.taskId) === taskId);
    if (task) {
      task.status = task.status === "completed" ? "pending" : "completed";
      try {
        localStorage.setItem("cmCaseTasks", JSON.stringify(window.caseTasks));
      } catch (e) {}
    }
  }
  renderNewHomeTasks();
}

window.renderNewHomeDashboard = renderNewHomeDashboard;
window.handleNewHomeTaskToggle = handleNewHomeTaskToggle;
window.refreshNewHomeLiveTimeline = refreshNewHomeLiveTimeline;
window.syncNewHomeMobileLayout = syncNewHomeMobileLayout;

// Event-driven real-time live synchronization
if (typeof window !== "undefined") {
  window.addEventListener("resize", () => {
    syncNewHomeMobileLayout();
  });
  // Sync when data is fetched from Supabase or updated via CRUD operations
  window.addEventListener("casebook:data-synced", () => {
    if (document.getElementById("newhome")) {
      renderNewHomeDashboard();
    }
  });

  window.addEventListener("casebook:cases-updated", () => {
    if (document.getElementById("newhome")) {
      renderNewHomeDashboard();
    }
  });

  // Re-sync when browser window regains focus or visibility
  if (typeof document !== "undefined" && typeof document.addEventListener === "function") {
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        const nh = document.getElementById("newhome");
        if (nh && nh.classList.contains("active")) {
          renderNewHomeDashboard();
        }
      }
    });
  }

  // Multi-tab synchronization via storage events
  window.addEventListener("storage", (e) => {
    if (e && (e.key === "cmAllCasesBackup" || e.key === "cmCaseTasks" || e.key === "allCaseRecords")) {
      if (document.getElementById("newhome")) {
        renderNewHomeDashboard();
      }
    }
  });
}

// Auto-run if tab is currently active or loaded
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      if (document.getElementById("newhome")) {
        setTimeout(renderNewHomeDashboard, 100);
      }
    });
  } else {
    if (document.getElementById("newhome")) {
      setTimeout(renderNewHomeDashboard, 100);
    }
  }
}
