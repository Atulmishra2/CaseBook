window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs["home"] = /* html */ `
  <div class="home-dashboard-container">
    <!-- Hero Welcome Header Card -->
    <div class="home-hero-card">
      <div class="hero-main-content">
        <div class="hero-left-section">
          <div class="hero-emblem-badge"><i class="fa-solid fa-scale-balanced"></i></div>
          <div class="hero-text-block">
            <div class="hero-greeting-row">
              <h1 class="hero-greeting" id="homeHeroGreeting">
                Good Evening, Advocate Atul Mishra
              </h1>
              <div class="hero-status-pill connected" id="homeHeroStatus">
                <span class="live-dot" id="homeHeroStatusDot"></span>
                <span id="homeHeroStatusText">Supabase Cloud Connected</span>
              </div>
            </div>
            <p class="hero-subtext" id="homeHeroDate">
              Chambers Legal Practice Management & Real-Time Case Tracker
            </p>
          </div>
        </div>
        <div class="hero-right-section">
          <div class="hero-actions-bar">
            <button type="button" class="hero-btn-primary" onclick="showTab('add')">
              <i class="fa-solid fa-plus"></i>
              New Case
            </button>
            <button
              type="button"
              class="hero-btn-secondary"
              onclick="if (typeof openForwardDateModal === 'function') openForwardDateModal(); else showTab('hearing');"
            >
              <i class="fa-solid fa-calendar-plus"></i>
              Forward Hearing
            </button>
            <button type="button" class="hero-btn-secondary" onclick="showTab('causelist')">
              <i class="fa-solid fa-list-check"></i>
              Daily Cause List
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Executive 6 KPI Cards (Materialize CSS Grid: 3,3 Desktop | 1-by-1 Mobile) -->
    <div class="row kpi-materialize-row">
      <!-- 1. Total Case Records -->
      <div class="col s12 m6 l4">
        <div class="kpi-card hoverable" data-type="total" onclick="showTab('all', event)">
          <div class="kpi-top">
            <div class="kpi-icon-wrap">
              <i class="fa-solid fa-folder-open"></i>
            </div>
            <span class="kpi-badge">All Categories</span>
          </div>
          <div class="kpi-label">Total Case Records</div>
          <div class="kpi-value" id="homeTotalCases">0</div>
          <div class="kpi-meta">
            <span class="kpi-pill">
              <i class="fa-solid fa-database"></i>
              Repository
            </span>
            <div class="kpi-sub" id="homePortfolioBreakdown">
              <div class="breakdown-inline-row">
                <span>0 Civil</span>
                <span class="breakdown-dot">•</span>
                <span>0 Criminal</span>
                <span class="breakdown-dot">•</span>
                <span>0 Revenue</span>
              </div>
            </div>
          </div>
          <a href="#" class="kpi-action" onclick="event.stopPropagation(); showTab('all', event);">
            View All Cases
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>

      <!-- 2. Today's Court Cases -->
      <div class="col s12 m6 l4">
        <div class="kpi-card hoverable" data-type="today" onclick="showTab('causelist', event)">
          <div class="kpi-top">
            <div class="kpi-icon-wrap">
              <i class="fa-solid fa-gavel"></i>
            </div>
            <span class="kpi-badge">Live Today</span>
          </div>
          <div class="kpi-label">Today's Court Cases</div>
          <div class="kpi-value" id="homeTodayCases">0</div>
          <div class="kpi-meta">
            <span class="kpi-pill">
              <span class="aesthetic-pulse-dot"></span>
              Listing
            </span>
            <div class="kpi-sub">Cases listed for today</div>
          </div>
          <a
            href="#"
            class="kpi-action"
            onclick="event.stopPropagation(); showTab('causelist', event);"
          >
            Daily Cause List
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>

      <!-- 3. Upcoming Hearings -->
      <div class="col s12 m6 l4">
        <div class="kpi-card hoverable" data-type="upcoming" onclick="showTab('upcoming', event)">
          <div class="kpi-top">
            <div class="kpi-icon-wrap">
              <i class="fa-solid fa-calendar-week"></i>
            </div>
            <span class="kpi-badge">Next 7 Days</span>
          </div>
          <div class="kpi-label">Upcoming Hearings</div>
          <div class="kpi-value" id="homeUpcomingCases">0</div>
          <div class="kpi-meta">
            <span class="kpi-pill">
              <i class="fa-solid fa-calendar-check"></i>
              Scheduled
            </span>
            <div class="kpi-sub">Scheduled within upcoming week</div>
          </div>
          <a
            href="#"
            class="kpi-action"
            onclick="event.stopPropagation(); showTab('upcoming', event);"
          >
            View Schedule
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>

      <!-- 4. Active Pending Cases -->
      <div class="col s12 m6 l4">
        <div class="kpi-card hoverable" data-type="pending" onclick="showTab('search', event)">
          <div class="kpi-top">
            <div class="kpi-icon-wrap">
              <i class="fa-solid fa-hourglass-half"></i>
            </div>
            <span class="kpi-badge">In Progress</span>
          </div>
          <div class="kpi-label">Active Pending Cases</div>
          <div class="kpi-value" id="homePendingCases">0</div>
          <div class="kpi-meta">
            <span class="kpi-pill">
              <i class="fa-solid fa-chart-pie"></i>
              Active File
            </span>
            <div class="kpi-sub" id="homePendingPercent">0% of total caseload</div>
          </div>
          <a
            href="#"
            class="kpi-action"
            onclick="event.stopPropagation(); showTab('search', event);"
          >
            Explore Active
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>

      <!-- 5. Undated Cases -->
      <div class="col s12 m6 l4">
        <div
          class="kpi-card hoverable"
          data-type="undated"
          onclick="showTab('all', event); setTimeout(() => { if (typeof setAllCasesStatusFilter === 'function') setAllCasesStatusFilter('undated'); }, 50);"
        >
          <div class="kpi-top">
            <div class="kpi-icon-wrap">
              <i class="fa-solid fa-circle-question"></i>
            </div>
            <span class="kpi-badge">Needs Date</span>
          </div>
          <div class="kpi-label">Undated Cases</div>
          <div class="kpi-value" id="homeUndatedCases">0</div>
          <div class="kpi-meta">
            <span class="kpi-pill">
              <i class="fa-solid fa-bell"></i>
              Priority
            </span>
            <div class="kpi-sub">Awaiting hearing fixture</div>
          </div>
          <a
            href="#"
            class="kpi-action"
            onclick="event.stopPropagation(); showTab('all', event); setTimeout(() => { if (typeof setAllCasesStatusFilter === 'function') setAllCasesStatusFilter('undated'); }, 50);"
          >
            Assign Dates
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>

      <!-- 6. Disposed / Resolved -->
      <div class="col s12 m6 l4">
        <div class="kpi-card hoverable" data-type="disposed" onclick="showTab('disposed', event)">
          <div class="kpi-top">
            <div class="kpi-icon-wrap">
              <i class="fa-solid fa-circle-check"></i>
            </div>
            <span class="kpi-badge">Completed</span>
          </div>
          <div class="kpi-label">Disposed / Resolved</div>
          <div class="kpi-value" id="homeDisposedCases">0</div>
          <div class="kpi-meta">
            <span class="kpi-pill">
              <i class="fa-solid fa-circle-check"></i>
              Archived
            </span>
            <div class="kpi-sub" id="homeDisposedPercent">0% Resolution Rate</div>
          </div>
          <a
            href="#"
            class="kpi-action"
            onclick="event.stopPropagation(); showTab('disposed', event);"
          >
            View Archives
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>

    <!-- Today's Listed Court Appearances Board (Full-Width Executive Card) -->
    <div class="appearance-board home-today-board-card">
      <!-- Header row (DARK in both themes) -->
      <div class="board-header">
        <div class="board-title-wrap">
          <div class="board-icon">
            <iconify-icon icon="lucide:scale"></iconify-icon>
          </div>
          <h2 class="board-title">Today's Court Appearance Board</h2>
        </div>

        <button
          type="button"
          class="btn-primary today-cause-list-btn"
          onclick="showTab('causelist')"
        >
          <span>Open Daily Cause List</span>
          <iconify-icon icon="lucide:arrow-right"></iconify-icon>
        </button>
      </div>

      <!-- Body Area -->
      <div class="board-body">
        <!-- Dedicated Clean Judicial Empty State (Shown when 0 appearances today) -->
        <div
          id="homeTodayEmptyState"
          class="empty-state today-hero-empty-state is-hidden"
          style="display: none !important;"
        >
          <div class="empty-icon today-empty-icon">
            <iconify-icon icon="lucide:scale"></iconify-icon>
          </div>
          <div class="empty-title">No appearances scheduled today</div>
          <div class="empty-sub">You're all clear for today.</div>
          <button type="button" class="btn-dark today-empty-btn" onclick="showTab('upcoming')">
            <span>View Upcoming Appearances</span>
            <iconify-icon icon="lucide:arrow-right"></iconify-icon>
          </button>
        </div>

        <!-- Active Appearances List (Shown when hearings exist) -->
        <div id="homeTodayListWrapper" class="home-today-list">
          <div class="home-today-loading">Loading today's court matters...</div>
        </div>
      </div>
    </div>

    <!-- Bottom Balanced Grid: Priority Tasks & Chambers Directory -->
    <div class="home-bottom-grid">
      <!-- Priority Tasks Board -->
      <div class="home-panel-card home-tasks-panel-card">
        <div class="home-panel-header">
          <div class="panel-title-group">
            <span class="panel-icon tasks-icon">
              <iconify-icon icon="lucide:check-square"></iconify-icon>
            </span>
            <h3 class="panel-main-title">Priority Tasks &amp; Deadlines</h3>
          </div>
          <button type="button" class="panel-action-btn" onclick="showTab('todo')">
            <span>Manage Tasks</span>
            <iconify-icon icon="lucide:arrow-right"></iconify-icon>
          </button>
        </div>
        <div id="homeTasksListContainer" class="home-tasks-list ios-list scrollable">
          <div class="home-empty-tasks ios-item">
            <iconify-icon
              icon="lucide:check-circle-2"
              style="font-size: 26px; color: #10B981;"
            ></iconify-icon>
            <p>Loading pending tasks...</p>
          </div>
        </div>
        <div class="tasks-card-footer" id="homeTasksFooter">
          <div class="tasks-footer-status">
            <span class="tasks-status-dot"></span>
            <span id="homeTasksFooterStatus">0 Pending Active</span>
          </div>
          <button type="button" class="tasks-footer-add-btn" onclick="showTab('todo')">
            <iconify-icon icon="lucide:plus"></iconify-icon>
            <span>Add Task</span>
          </button>
        </div>
      </div>

      <!-- Chambers Quick Jump Directory -->
      <div class="home-panel-card">
        <div class="home-panel-header">
          <div class="panel-title-group">
            <span class="panel-icon tools-icon">
              <iconify-icon icon="lucide:landmark"></iconify-icon>
            </span>
            <h3 class="panel-main-title">Quick Registers &amp; Tools</h3>
          </div>
          <button type="button" class="panel-action-btn" onclick="showTab('all')">
            <span>All Cases</span>
            <iconify-icon icon="lucide:arrow-right"></iconify-icon>
          </button>
        </div>
        <div class="shortcuts-grid ios-list">
          <div class="shortcut-box ios-item" onclick="showTab('civil')">
            <span class="shortcut-icon"><iconify-icon icon="lucide:scale"></iconify-icon></span>
            <div class="shortcut-info">
              <strong>Civil Register</strong>
              <small id="shortcutCivilCount">0 Cases</small>
            </div>
            <span class="shortcut-arrow">
              <iconify-icon icon="lucide:arrow-right"></iconify-icon>
            </span>
          </div>
          <div class="shortcut-box ios-item" onclick="showTab('criminal')">
            <span class="shortcut-icon">
              <iconify-icon icon="lucide:shield-alert"></iconify-icon>
            </span>
            <div class="shortcut-info">
              <strong>Criminal Register</strong>
              <small id="shortcutCriminalCount">0 Cases</small>
            </div>
            <span class="shortcut-arrow">
              <iconify-icon icon="lucide:arrow-right"></iconify-icon>
            </span>
          </div>
          <div class="shortcut-box ios-item" onclick="showTab('revenue')">
            <span class="shortcut-icon"><iconify-icon icon="lucide:landmark"></iconify-icon></span>
            <div class="shortcut-info">
              <strong>Revenue Register</strong>
              <small id="shortcutRevenueCount">0 Cases</small>
            </div>
            <span class="shortcut-arrow">
              <iconify-icon icon="lucide:arrow-right"></iconify-icon>
            </span>
          </div>
          <div class="shortcut-box ios-item" onclick="showTab('calendar')">
            <span class="shortcut-icon"><iconify-icon icon="lucide:calendar"></iconify-icon></span>
            <div class="shortcut-info">
              <strong>Court Calendar</strong>
              <small>Monthly diary</small>
            </div>
            <span class="shortcut-arrow">
              <iconify-icon icon="lucide:arrow-right"></iconify-icon>
            </span>
          </div>
          <div class="shortcut-box ios-item" onclick="showTab('paisa')">
            <span
              class="shortcut-icon"
              style="color: #059669; background: rgba(16, 185, 129, 0.15);"
            >
              <iconify-icon icon="lucide:wallet"></iconify-icon>
            </span>
            <div class="shortcut-info">
              <strong>Paisa Manager</strong>
              <small id="shortcutAccountsToday">Finance &amp; Khata</small>
            </div>
            <span class="shortcut-arrow">
              <iconify-icon icon="lucide:arrow-right"></iconify-icon>
            </span>
          </div>
        </div>
      </div>

      <!-- Undated Cases Analysis & Graph Card -->
      <div class="home-panel-card undated-analysis-card">
        <div class="home-panel-header">
          <div class="panel-title-group">
            <span class="panel-icon chart-icon">
              <iconify-icon icon="lucide:pie-chart"></iconify-icon>
            </span>
            <h3 class="panel-main-title">Undated Cases Tracker</h3>
          </div>
          <button
            type="button"
            class="panel-action-btn"
            onclick="showTab('all'); setTimeout(() => { if (typeof setAllCasesStatusFilter === 'function') setAllCasesStatusFilter('undated'); }, 50);"
          >
            <span>View Undated</span>
            <iconify-icon icon="lucide:arrow-right"></iconify-icon>
          </button>
        </div>
        <div class="undated-chart-content">
          <div class="undated-donut-wrap">
            <svg class="undated-donut-svg" viewBox="0 0 100 100">
              <circle class="donut-bg" cx="50" cy="50" r="38" />
              <circle
                id="donutSegmentCivil"
                class="donut-segment segment-civil"
                cx="50"
                cy="50"
                r="38"
              />
              <circle
                id="donutSegmentCriminal"
                class="donut-segment segment-criminal"
                cx="50"
                cy="50"
                r="38"
              />
              <circle
                id="donutSegmentRevenue"
                class="donut-segment segment-revenue"
                cx="50"
                cy="50"
                r="38"
              />
            </svg>
            <div class="donut-center-info">
              <span class="donut-center-val" id="undatedGraphTotal">0</span>
              <span class="donut-center-lbl">Undated</span>
            </div>
          </div>
          <div class="undated-bars-wrap">
            <div class="undated-bar-row">
              <div class="bar-label-group">
                <span class="bar-bullet bullet-civil"></span>
                <span class="bar-name">Civil</span>
                <span class="bar-count" id="undatedCivilCount">0 Cases (0%)</span>
              </div>
              <div class="bar-track">
                <div id="undatedCivilBar" class="bar-fill fill-civil" style="width: 0%;"></div>
              </div>
            </div>
            <div class="undated-bar-row">
              <div class="bar-label-group">
                <span class="bar-bullet bullet-criminal"></span>
                <span class="bar-name">Criminal</span>
                <span class="bar-count" id="undatedCriminalCount">0 Cases (0%)</span>
              </div>
              <div class="bar-track">
                <div
                  id="undatedCriminalBar"
                  class="bar-fill fill-criminal"
                  style="width: 0%;"
                ></div>
              </div>
            </div>
            <div class="undated-bar-row">
              <div class="bar-label-group">
                <span class="bar-bullet bullet-revenue"></span>
                <span class="bar-name">Revenue</span>
                <span class="bar-count" id="undatedRevenueCount">0 Cases (0%)</span>
              </div>
              <div class="bar-track">
                <div id="undatedRevenueBar" class="bar-fill fill-revenue" style="width: 0%;"></div>
              </div>
            </div>
          </div>
          <!-- Reference-design vertical distribution chart; existing horizontal
               chart markup is retained for compatibility. -->
          <div class="undated-vertical-chart" aria-label="Undated case distribution">
            <div class="undated-v-bar-group">
              <span class="undated-v-value" id="undatedVerticalCivilValue">0</span>
              <div class="undated-v-track"><div id="undatedVerticalCivilBar" class="undated-v-fill undated-v-civil"></div></div>
              <span class="undated-v-label">Civil</span>
            </div>
            <div class="undated-v-bar-group">
              <span class="undated-v-value" id="undatedVerticalCriminalValue">0</span>
              <div class="undated-v-track"><div id="undatedVerticalCriminalBar" class="undated-v-fill undated-v-criminal"></div></div>
              <span class="undated-v-label">Criminal</span>
            </div>
            <div class="undated-v-bar-group">
              <span class="undated-v-value" id="undatedVerticalRevenueValue">0</span>
              <div class="undated-v-track"><div id="undatedVerticalRevenueBar" class="undated-v-fill undated-v-revenue"></div></div>
              <span class="undated-v-label">Revenue</span>
            </div>
          </div>
        </div>
        <div class="undated-card-footer">
          <span class="undated-footer-alert" id="undatedFooterNotice">
            <iconify-icon icon="lucide:alert-triangle"></iconify-icon>
            0 matters require hearing dates
          </span>
          <button type="button" class="undated-schedule-btn" onclick="showTab('hearing')">
            <span>Schedule</span>
            <iconify-icon icon="lucide:arrow-right"></iconify-icon>
          </button>
        </div>
      </div>
    </div>
  </div>
`;

// ==============================================================================
// Executive Home Dashboard Engine
// ==============================================================================

function renderHomeDashboard() {
  const greetingEl = document.getElementById("homeHeroGreeting");
  const dateEl = document.getElementById("homeHeroDate");

  const totalEl = document.getElementById("homeTotalCases");
  const breakdownEl = document.getElementById("homePortfolioBreakdown");
  const todayEl = document.getElementById("homeTodayCases");
  const upcomingEl = document.getElementById("homeUpcomingCases");
  const pendingEl = document.getElementById("homePendingCases");
  const pendingPercentEl = document.getElementById("homePendingPercent");
  const undatedEl = document.getElementById("homeUndatedCases");
  const disposedEl = document.getElementById("homeDisposedCases");
  const disposedPercentEl = document.getElementById("homeDisposedPercent");

  const shortcutCivil = document.getElementById("shortcutCivilCount");
  const shortcutCriminal = document.getElementById("shortcutCriminalCount");
  const shortcutRevenue = document.getElementById("shortcutRevenueCount");

  const todayListWrapper = document.getElementById("homeTodayListWrapper");
  const todayBoardDate = document.getElementById("homeTodayBoardDate");
  const tasksContainer = document.getElementById("homeTasksListContainer");
  const todayEmptyState = document.getElementById("homeTodayEmptyState");

  // 1. Dynamic Greeting
  const now = new Date();
  const hours = now.getHours();
  let timeGreeting = "Good Day";
  if (hours < 12) timeGreeting = "Good Morning";
  else if (hours < 17) timeGreeting = "Good Afternoon";
  else timeGreeting = "Good Evening";

  const daysOfWeek = [
    "Sunday (रविवार)",
    "Monday (सोमवार)",
    "Tuesday (मंगलवार)",
    "Wednesday (बुधवार)",
    "Thursday (गुरुवार)",
    "Friday (शुक्रवार)",
    "Saturday (शनिवार)",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayName = daysOfWeek[now.getDay()];
  const formattedDate = `${dayName}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

  if (greetingEl) greetingEl.textContent = `${timeGreeting}, Advocate Atul Mishra`;
  if (dateEl) dateEl.textContent = `${formattedDate} • Chambers Legal Practice Management`;
  if (todayBoardDate)
    todayBoardDate.textContent = `Appearances for ${dayName.split(" ")[0]}, ${now.getDate()} ${months[now.getMonth()]}`;

  // 2. Calculations & Robust Date Matching
  // Standardized Jurisdiction Classifier for Case Records (Civil, Criminal, Revenue)
  const getJurisdictionCategory = (c) => {
    const rawType = (c.caseType || "").toLowerCase().trim();
    // 1. Criminal Side
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
    // 2. Revenue Side
    if (
      rawType === "revenue" ||
      (c.courtName && c.courtName.toLowerCase().includes("revenue")) ||
      (c.caseNo &&
        (c.caseNo.toLowerCase().includes("rev") || c.caseNo.toLowerCase().includes("r.c.")))
    ) {
      return "revenue";
    }
    // 3. Civil Side (Civil, Family, Misc Civil, Default)
    return "civil";
  };

  const todayZero = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
  const in7Days = new Date(todayZero.getTime() + 7 * 24 * 60 * 60 * 1000 + 23 * 60 * 60 * 1000);

  const totalCount = allCaseRecords.length;
  const civilCount = allCaseRecords.filter((c) => getJurisdictionCategory(c) === "civil").length;
  const criminalCount = allCaseRecords.filter(
    (c) => getJurisdictionCategory(c) === "criminal",
  ).length;
  const revenueCount = allCaseRecords.filter(
    (c) => getJurisdictionCategory(c) === "revenue",
  ).length;

  const todayCases = allCaseRecords.filter((c) => {
    if (
      !c.nextHearing ||
      c.nextHearing === "—" ||
      c.nextHearing === "null" ||
      !c.nextHearing.trim()
    )
      return false;
    const parsed = parseDateString(c.nextHearing);
    if (!parsed) return false;
    return (
      parsed.getFullYear() === now.getFullYear() &&
      parsed.getMonth() === now.getMonth() &&
      parsed.getDate() === now.getDate()
    );
  });

  const upcomingCases = allCaseRecords.filter((c) => {
    if (
      !c.nextHearing ||
      c.nextHearing === "—" ||
      c.nextHearing === "null" ||
      !c.nextHearing.trim()
    )
      return false;
    if ((c.caseStatus || "").toLowerCase().includes("dispose")) return false;
    const parsed = parseDateString(c.nextHearing);
    if (!parsed) return false;
    const hTime = parsed.getTime();
    return hTime >= todayZero.getTime() && hTime <= in7Days.getTime();
  });

  const disposedCount = allCaseRecords.filter((c) =>
    (c.caseStatus || "").toLowerCase().includes("dispose"),
  ).length;
  const pendingCount = totalCount - disposedCount;
  const undatedCount = allCaseRecords.filter((c) => {
    if ((c.caseStatus || "").toLowerCase().includes("dispose")) return false; // disposed = closed, not undated
    const nh = c.nextHearing;
    if (!nh || nh === "—" || nh === "null" || !String(nh).trim()) return true;
    const iso = toISODate(nh);
    return !iso || iso < new Date().toISOString().split("T")[0];
  }).length;

  const pendingPercent = totalCount > 0 ? Math.round((pendingCount / totalCount) * 100) : 0;
  const disposedPercent = totalCount > 0 ? Math.round((disposedCount / totalCount) * 100) : 0;

  // 3. Update KPI Card Values
  if (totalEl) totalEl.textContent = String(totalCount);
  if (breakdownEl) {
    breakdownEl.innerHTML = `
      <div class="breakdown-inline-row">
        <span>${civilCount} Civil</span>
        <span class="breakdown-dot">•</span>
        <span>${criminalCount} Criminal</span>
        <span class="breakdown-dot">•</span>
        <span>${revenueCount} Revenue</span>
      </div>
    `;
  }
  if (todayEl) todayEl.textContent = String(todayCases.length);
  if (upcomingEl) upcomingEl.textContent = String(upcomingCases.length);
  if (pendingEl) pendingEl.textContent = String(pendingCount);
  if (pendingPercentEl) pendingPercentEl.textContent = `${pendingPercent}% of total caseload`;
  if (undatedEl) undatedEl.textContent = String(undatedCount);
  if (disposedEl) disposedEl.textContent = String(disposedCount);
  if (disposedPercentEl) disposedPercentEl.textContent = `${disposedPercent}% Resolution Rate`;

  // 4. Update Shortcuts
  if (shortcutCivil) shortcutCivil.textContent = `${civilCount} Cases`;
  if (shortcutCriminal) shortcutCriminal.textContent = `${criminalCount} Cases`;
  if (shortcutRevenue) shortcutRevenue.textContent = `${revenueCount} Cases`;

  // 4b. Update Undated Cases Graph Card & Analytics
  const undatedCasesList = allCaseRecords.filter((c) => {
    if ((c.caseStatus || "").toLowerCase().includes("dispose")) return false; // disposed = closed, not undated
    const nh = c.nextHearing;
    if (
      !nh ||
      nh === "—" ||
      nh === "null" ||
      !String(nh).trim() ||
      String(nh).toLowerCase() === "undated"
    )
      return true;
    const iso = toISODate(nh);
    return !iso || iso < new Date().toISOString().split("T")[0];
  });
  const undatedTotal = undatedCasesList.length;
  const undatedCivil = undatedCasesList.filter(
    (c) => getJurisdictionCategory(c) === "civil",
  ).length;
  const undatedCriminal = undatedCasesList.filter(
    (c) => getJurisdictionCategory(c) === "criminal",
  ).length;
  const undatedRevenue = undatedCasesList.filter(
    (c) => getJurisdictionCategory(c) === "revenue",
  ).length;

  const undatedCivilPct = undatedTotal > 0 ? Math.round((undatedCivil / undatedTotal) * 100) : 0;
  const undatedCriminalPct =
    undatedTotal > 0 ? Math.round((undatedCriminal / undatedTotal) * 100) : 0;
  const undatedRevenuePct =
    undatedTotal > 0 ? Math.max(0, 100 - undatedCivilPct - undatedCriminalPct) : 0;

  const undatedGraphTotalEl = document.getElementById("undatedGraphTotal");
  const undatedCivilCountEl = document.getElementById("undatedCivilCount");
  const undatedCriminalCountEl = document.getElementById("undatedCriminalCount");
  const undatedRevenueCountEl = document.getElementById("undatedRevenueCount");
  const undatedCivilBarEl = document.getElementById("undatedCivilBar");
  const undatedCriminalBarEl = document.getElementById("undatedCriminalBar");
  const undatedRevenueBarEl = document.getElementById("undatedRevenueBar");
  const undatedVerticalCivilValueEl = document.getElementById("undatedVerticalCivilValue");
  const undatedVerticalCriminalValueEl = document.getElementById("undatedVerticalCriminalValue");
  const undatedVerticalRevenueValueEl = document.getElementById("undatedVerticalRevenueValue");
  const undatedVerticalCivilBarEl = document.getElementById("undatedVerticalCivilBar");
  const undatedVerticalCriminalBarEl = document.getElementById("undatedVerticalCriminalBar");
  const undatedVerticalRevenueBarEl = document.getElementById("undatedVerticalRevenueBar");
  const undatedFooterNoticeEl = document.getElementById("undatedFooterNotice");

  if (undatedGraphTotalEl) undatedGraphTotalEl.textContent = String(undatedTotal);
  if (undatedCivilCountEl)
    undatedCivilCountEl.textContent = `${undatedCivil} Cases (${undatedCivilPct}%)`;
  if (undatedCriminalCountEl)
    undatedCriminalCountEl.textContent = `${undatedCriminal} Cases (${undatedCriminalPct}%)`;
  if (undatedRevenueCountEl)
    undatedRevenueCountEl.textContent = `${undatedRevenue} Cases (${undatedRevenuePct}%)`;

  if (undatedCivilBarEl) undatedCivilBarEl.style.width = `${undatedCivilPct}%`;
  if (undatedCriminalBarEl) undatedCriminalBarEl.style.width = `${undatedCriminalPct}%`;
  if (undatedRevenueBarEl) undatedRevenueBarEl.style.width = `${undatedRevenuePct}%`;
  if (undatedVerticalCivilValueEl) undatedVerticalCivilValueEl.textContent = String(undatedCivil);
  if (undatedVerticalCriminalValueEl) undatedVerticalCriminalValueEl.textContent = String(undatedCriminal);
  if (undatedVerticalRevenueValueEl) undatedVerticalRevenueValueEl.textContent = String(undatedRevenue);
  if (undatedVerticalCivilBarEl) undatedVerticalCivilBarEl.style.setProperty("--bar-height", `${undatedCivilPct}%`);
  if (undatedVerticalCriminalBarEl) undatedVerticalCriminalBarEl.style.setProperty("--bar-height", `${undatedCriminalPct}%`);
  if (undatedVerticalRevenueBarEl) undatedVerticalRevenueBarEl.style.setProperty("--bar-height", `${undatedRevenuePct}%`);

  if (undatedFooterNoticeEl) {
    undatedFooterNoticeEl.textContent =
      undatedTotal === 0
        ? "✅ All active cases have scheduled hearings"
        : `⚡ ${undatedTotal} ${undatedTotal === 1 ? "matter requires" : "matters require"} hearing dates`;
  }

  // SVG Donut segments (circumference = 2 * PI * 38 ≈ 238.76)
  const donutCircumference = 238.76;
  const segCivil = document.getElementById("donutSegmentCivil");
  const segCrim = document.getElementById("donutSegmentCriminal");
  const segRev = document.getElementById("donutSegmentRevenue");

  if (segCivil && segCrim && segRev) {
    if (undatedTotal === 0) {
      segCivil.style.strokeDasharray = `0 ${donutCircumference}`;
      segCrim.style.strokeDasharray = `0 ${donutCircumference}`;
      segRev.style.strokeDasharray = `0 ${donutCircumference}`;
    } else {
      const lenCivil = (undatedCivil / undatedTotal) * donutCircumference;
      const lenCrim = (undatedCriminal / undatedTotal) * donutCircumference;
      const lenRev = (undatedRevenue / undatedTotal) * donutCircumference;

      segCivil.style.strokeDasharray = `${lenCivil} ${donutCircumference - lenCivil}`;
      segCivil.style.strokeDashoffset = "0";

      segCrim.style.strokeDasharray = `${lenCrim} ${donutCircumference - lenCrim}`;
      segCrim.style.strokeDashoffset = `-${lenCivil}`;

      segRev.style.strokeDasharray = `${lenRev} ${donutCircumference - lenRev}`;
      segRev.style.strokeDashoffset = `-${lenCivil + lenCrim}`;
    }
  }

  // 5. Populate Today's Court Appearance Board Table
  if (todayCases.length === 0) {
    if (todayEmptyState) {
      todayEmptyState.style.setProperty("display", "flex", "important");
      todayEmptyState.classList.remove("is-hidden");
    }
    if (todayListWrapper) {
      todayListWrapper.style.setProperty("display", "none", "important");
      todayListWrapper.classList.add("is-hidden");
    }
  } else {
    if (todayEmptyState) {
      todayEmptyState.style.setProperty("display", "none", "important");
      todayEmptyState.classList.add("is-hidden");
    }
    if (todayListWrapper) {
      todayListWrapper.style.setProperty("display", "flex", "important");
      todayListWrapper.classList.remove("is-hidden");
    }
    // Sort by court name and then case number
    todayCases.sort((a, b) => {
      const courtA = (a.courtName || a.criminalCourtName || "").toUpperCase();
      const courtB = (b.courtName || b.criminalCourtName || "").toUpperCase();
      if (courtA !== courtB) return courtA.localeCompare(courtB);
      const numA = (a.caseNo || a.criminalCaseNumber || "").toUpperCase();
      const numB = (b.caseNo || b.criminalCaseNumber || "").toUpperCase();
      return numA.localeCompare(numB);
    });

    let html = "";
    todayCases.forEach((c, idx) => {
      const caseNumber = c.caseNo || c.criminalCaseNumber || "—";
      const caseName =
        c.caseName ||
        (c.plaintiff
          ? `${c.plaintiff} vs ${c.defendant}`
          : c.victimName
            ? `${c.victimName} vs ${c.accusedName}`
            : "—");
      const courtName = c.courtName || c.criminalCourtName || "District Court";
      const caseType = (c.caseType || "civil").toLowerCase();
      const stage = c.hearingProcess || c.process || "Listed Hearing";
      const clientName = c.clientName || c.criminalClientName || "—";
      const clientPhone = c.clientNumber || c.criminalClientNumber || "";

      html += `
        <div class="home-today-card">
          <div class="home-today-card-main">
            <span class="home-today-index">#${idx + 1}</span>
            <div class="home-today-card-info">
              <div class="home-today-card-title-row">
                <span class="home-today-caseno">${escapeHtml(caseNumber)}</span>
                <span class="case-badge ${caseType}" style="font-size: 9.5px; padding: 2px 7px; text-transform: uppercase; border-radius: 4px; font-weight: 700;">${caseType}</span>
                <span class="home-today-case-name" title="${escapeHtml(caseName)}">${escapeHtml(caseName)}</span>
              </div>
              <div class="home-today-card-meta">
                <span><i class="fa-solid fa-landmark"></i> ${escapeHtml(courtName)}</span>
                <span class="home-today-stage-pill">${escapeHtml(stage)}</span>
                <span><i class="fa-solid fa-user"></i> ${escapeHtml(clientName)}${clientPhone ? ` • <a href="tel:${escapeHtml(clientPhone)}" style="color: #047857; text-decoration: none; font-weight: 600;" title="Call Client">${escapeHtml(clientPhone)}</a>` : ""}</span>
              </div>
            </div>
          </div>
          <div class="home-today-card-actions">
            <button type="button" class="table-view-btn today-details-btn" onclick="openCaseHistoryModalByNo('${escapeHtml(caseNumber)}')" title="View proceedings details"><i class="fa-solid fa-scroll"></i><span class="btn-text"> Details</span></button>
            <button type="button" class="table-view-btn update-hearing-btn today-forward-btn" onclick="openUpdateHearingForCase('${escapeHtml(caseNumber)}')" title="Forward next hearing date"><i class="fa-solid fa-calendar-plus"></i><span class="btn-text"> Forward</span></button>
            ${clientPhone ? `<a href="tel:${escapeHtml(clientPhone)}" class="table-view-btn call-btn today-call-btn" title="Call Client directly: ${escapeHtml(clientPhone)}"><i class="fa-solid fa-phone"></i></a>` : ""}
            <button type="button" class="table-view-btn whatsapp-btn today-whatsapp-btn" onclick="sendWhatsAppHearingNotice('${escapeHtml(caseNumber)}')" title="WhatsApp notice to client"><i class="fa-brands fa-whatsapp"></i></button>
          </div>
        </div>
      `;
    });
    if (todayListWrapper) todayListWrapper.innerHTML = html;
  }

  // 6. Populate Priority Tasks Widget
  if (tasksContainer) {
    const pendingTasks = (caseTasks || []).filter((t) => {
      const s = String(t.status || "")
        .toLowerCase()
        .trim();
      return s !== "completed" && s !== "done" && s !== "closed" && !t.completed && !t.isDone;
    });
    const urgentCount = pendingTasks.filter(
      (t) => (t.priority || "").toLowerCase() === "high",
    ).length;

    // Update footer status bar
    const footerStatusEl = document.getElementById("homeTasksFooterStatus");
    if (footerStatusEl) {
      if (pendingTasks.length === 0) {
        footerStatusEl.textContent = "All tasks completed";
      } else {
        footerStatusEl.innerHTML = `<strong>${pendingTasks.length}</strong> Pending Active${urgentCount > 0 ? ` • <span style="color: #EF4444; font-weight: 700;">${urgentCount} Urgent</span>` : ""}`;
      }
    }

    if (pendingTasks.length === 0) {
      tasksContainer.innerHTML = `
        <div class="home-empty-tasks ios-item">
          <iconify-icon icon="lucide:check-circle-2" style="font-size: 28px; color: #10B981; margin-bottom: 6px;"></iconify-icon>
          <p style="margin: 0 0 10px 0; font-size: 13px; font-weight: 600;">All tasks and deadlines are up-to-date.</p>
          <button type="button" class="tasks-footer-add-btn" onclick="showTab('todo')">
            <iconify-icon icon="lucide:plus"></iconify-icon>
            <span>Add New Task</span>
          </button>
        </div>
      `;
    } else {
      pendingTasks.sort((a, b) => {
        const pOrder = { high: 1, medium: 2, normal: 3, low: 4 };
        const pA = pOrder[(a.priority || "normal").toLowerCase()] || 3;
        const pB = pOrder[(b.priority || "normal").toLowerCase()] || 3;
        if (pA !== pB) return pA - pB;
        const dateA =
          a.deadlineDate || a.deadline
            ? new Date(a.deadlineDate || a.deadline).getTime()
            : Infinity;
        const dateB =
          b.deadlineDate || b.deadline
            ? new Date(b.deadlineDate || b.deadline).getTime()
            : Infinity;
        return dateA - dateB;
      });

      let taskHtml = "";
      pendingTasks.forEach((t) => {
        const priority = (t.priority || "normal").toLowerCase();
        const priorityClass =
          priority === "high"
            ? "priority-high"
            : priority === "medium"
              ? "priority-medium"
              : "priority-normal";

        taskHtml += `
          <div class="home-task-card ios-item ${priorityClass}">
            <div class="home-task-info">
              <span class="home-task-title">${escapeHtml(t.taskTitle || t.task || "Legal Action")}</span>
              <span class="home-task-meta">Case: <strong>${escapeHtml(t.caseNo || "General")}</strong> • Due: ${formatDateDMY(t.deadlineDate || t.deadline)}</span>
            </div>
            <button type="button" class="home-task-manage-btn" onclick="showTab('todo')" title="Manage task">
              <span>Manage</span>
              <iconify-icon icon="lucide:arrow-right" style="font-size: 11px;"></iconify-icon>
            </button>
          </div>
        `;
      });
      tasksContainer.innerHTML = taskHtml;
    }
  }

  if (typeof updateAccountsBadgesAndShortcut === "function") {
    updateAccountsBadgesAndShortcut();
  }
}

if (typeof renderHomeDashboard !== "undefined") window.renderHomeDashboard = renderHomeDashboard;

// ==============================================================================
// Dashboard Tables Rendering
// ==============================================================================

function renderCivilCasesTable(cases = null) {
  const tbody = document.querySelector("#civilCasesTable tbody");
  const countEl = document.getElementById("civilCount");
  if (!tbody) return;

  const list = cases || allCaseRecords.filter((c) => c.caseType === "civil");

  if (!list || list.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="no-results">No civil cases found.</td></tr>';
    if (countEl) countEl.textContent = "0";
    return;
  }

  tbody.innerHTML = list
    .map((item) => {
      const caseNumber = getSafeValue(item.caseNo || item.case_number, "—");
      const caseName = getSafeValue(
        item.caseName || (item.plaintiff ? `${item.plaintiff} vs ${item.defendant}` : "—"),
        "—",
      );
      const clientName = getSafeValue(item.clientName || item.client, "—");
      const nextHearing = formatDateDMY(item.nextHearing);
      const filingDate = formatDateDMY(item.filingDate);
      const isDisposed = (item.caseStatus || "").toLowerCase().includes("dispose");
      const statusBadge = isDisposed
        ? '<span class="status-badge disposed"><i class="fa-solid fa-circle-check"></i> Disposed</span>'
        : '<span class="status-badge pending"><i class="fa-solid fa-clock"></i> Pending</span>';

      const partiesRemark = item.remark || item.remarks || "";
      const partiesRemarkHtml = renderCaseTableRemarks(partiesRemark, caseNumber, caseName);

      const disposalComment = item.disposalComment || item.disposal_comment || "";
      const disposalCommentHtml = disposalComment
        ? `<span class="case-disposal-clamp" title="${escapeHtml(disposalComment)}"><i class="fa-solid fa-scale-balanced"></i>️ ${escapeHtml(disposalComment)}</span>`
        : isDisposed && remarksToPlainText(partiesRemark)
          ? `<span class="case-disposal-clamp" title="${escapeHtml(remarksToPlainText(partiesRemark))}"><i class="fa-solid fa-scale-balanced"></i>️ ${escapeHtml(remarksToPlainText(partiesRemark))}</span>`
          : '<span style="color: #94a3b8;">—</span>';

      return `
      <tr>
        <td><strong>${caseNumber}</strong></td>
        <td>${caseName}</td>
        <td>${clientName}</td>
        <td>${statusBadge}</td>
        <td class="case-remark-cell">${partiesRemarkHtml}</td>
        <td class="case-disposal-cell">${disposalCommentHtml}</td>
        <td>${filingDate}</td>
        <td>${nextHearing}</td>
        <td class="table-actions-td" style="white-space: nowrap; text-align: center;">
          <button type="button" class="table-view-btn edit-case-btn" onclick="editCaseFromTable('${escapeHtml(caseNumber)}')" title="Edit / Update Case"><i class="fa-solid fa-pen-to-square"></i><span class="btn-text"> Edit</span></button>
        </td>
      </tr>
    `;
    })
    .join("");

  if (countEl) countEl.textContent = String(list.length);
}

function refreshAllCaseTables() {
  try {
    // 1. Civil Cases Table & Count
    const civilCases = allCaseRecords.filter((c) => c.caseType === "civil");
    renderCivilCasesTable(civilCases);

    // 2. State Cases Table & Count (Criminal / State of U.P.)
    const stateCases = allCaseRecords.filter(
      (c) => c.caseType === "state" || c.caseType === "criminal",
    );
    const stateTable = document.querySelector("#stateCasesTable tbody");
    const legacyCriminalTable = document.querySelector("#criminalCasesTable tbody");
    const stateCountEl = document.getElementById("stateCount");
    const criminalCountEl = document.getElementById("criminalCount");

    if (stateCountEl) stateCountEl.textContent = String(stateCases.length);
    if (criminalCountEl) criminalCountEl.textContent = String(stateCases.length);

    const renderStateRow = (c) => {
      const isDisposed = (c.caseStatus || "").toLowerCase().includes("dispose");
      const statusBadge = isDisposed
        ? '<span class="status-badge disposed"><i class="fa-solid fa-circle-check"></i> Disposed</span>'
        : '<span class="status-badge pending"><i class="fa-solid fa-clock"></i> Pending</span>';
      const partiesRemark = c.remark || c.remarks || "";
      const caseNumber = c.caseNo || c.criminalCaseNumber || "—";
      const caseName =
        c.caseName ||
        (c.firstParty
          ? `${c.firstParty} vs ${c.accusedName}`
          : c.victimName
            ? `${c.victimName} vs ${c.accusedName}`
            : "—");
      const partiesRemarkHtml = renderCaseTableRemarks(partiesRemark, caseNumber, caseName);
      const disposalComment = c.disposalComment || c.disposal_comment || "";
      const disposalCommentHtml = disposalComment
        ? `<span class="case-disposal-clamp" title="${escapeHtml(disposalComment)}"><i class="fa-solid fa-scale-balanced"></i>️ ${escapeHtml(disposalComment)}</span>`
        : isDisposed && remarksToPlainText(partiesRemark)
          ? `<span class="case-disposal-clamp" title="${escapeHtml(remarksToPlainText(partiesRemark))}"><i class="fa-solid fa-scale-balanced"></i>️ ${escapeHtml(remarksToPlainText(partiesRemark))}</span>`
          : '<span style="color: #94a3b8;">—</span>';

      return `
      <tr>
        <td><strong>${escapeHtml(caseNumber)}</strong></td>
        <td>${escapeHtml(c.caseName || (c.firstParty ? `${c.firstParty} vs ${c.accusedName}` : c.victimName ? `${c.victimName} vs ${c.accusedName}` : "—"))}</td>
        <td>${escapeHtml(c.crimeNumber || "—")}</td>
        <td>${escapeHtml(c.policeStation || "—")}</td>
        <td>${escapeHtml(c.crimeSection || "—")}</td>
        <td>${escapeHtml(c.clientName || c.criminalClientName || "—")}</td>
        <td>${statusBadge}</td>
        <td><strong>${formatDateDMY(c.nextHearing)}</strong></td>
        <td class="case-remark-cell">${partiesRemarkHtml}</td>
        <td class="case-disposal-cell">${disposalCommentHtml}</td>
        <td class="table-actions-td" style="white-space: nowrap; text-align: center;">
          <button type="button" class="table-view-btn edit-case-btn" onclick="editCaseFromTable('${escapeHtml(caseNumber)}')" title="Edit / Update Case"><i class="fa-solid fa-pen-to-square"></i><span class="btn-text"> Edit</span></button>
        </td>
      </tr>
    `;
    };

    if (stateTable) {
      if (stateCases.length === 0) {
        stateTable.innerHTML =
          '<tr><td colspan="9" class="no-results">No State criminal cases recorded yet.</td></tr>';
      } else {
        stateTable.innerHTML = stateCases.map(renderStateRow).join("");
      }
    }
    if (legacyCriminalTable) {
      if (stateCases.length === 0) {
        legacyCriminalTable.innerHTML =
          '<tr><td colspan="5" class="no-results">No criminal cases found.</td></tr>';
      } else {
        legacyCriminalTable.innerHTML = stateCases.map(renderStateRow).join("");
      }
    }

    // 3. Family Cases Table & Count (Matrimonial / Maintenance 125)
    const familyCases = allCaseRecords.filter((c) => c.caseType === "family");
    const familyTable = document.querySelector("#familyCasesTable tbody");
    const familyCountEl = document.getElementById("familyCount");
    if (familyCountEl) familyCountEl.textContent = String(familyCases.length);
    if (familyTable) {
      if (familyCases.length === 0) {
        familyTable.innerHTML =
          '<tr><td colspan="10" class="no-results">No Family or Matrimonial cases recorded yet.</td></tr>';
      } else {
        familyTable.innerHTML = familyCases
          .map((c) => {
            const isDisposed = (c.caseStatus || "").toLowerCase().includes("dispose");
            const statusBadge = isDisposed
              ? '<span class="status-badge disposed"><i class="fa-solid fa-circle-check"></i> Disposed</span>'
              : '<span class="status-badge pending"><i class="fa-solid fa-clock"></i> Pending</span>';
            const partiesRemark = c.remark || c.remarks || "";
            const caseNumber = c.caseNo || "—";
            const caseName = c.caseName || `${c.petitioner} vs ${c.respondent}`;
            const partiesRemarkHtml = renderCaseTableRemarks(partiesRemark, caseNumber, caseName);
            const disposalComment = c.disposalComment || c.disposal_comment || "";
            const disposalCommentHtml = disposalComment
              ? `<span class="case-disposal-clamp" title="${escapeHtml(disposalComment)}"><i class="fa-solid fa-scale-balanced"></i>️ ${escapeHtml(disposalComment)}</span>`
              : isDisposed && remarksToPlainText(partiesRemark)
                ? `<span class="case-disposal-clamp" title="${escapeHtml(remarksToPlainText(partiesRemark))}"><i class="fa-solid fa-scale-balanced"></i>️ ${escapeHtml(remarksToPlainText(partiesRemark))}</span>`
                : '<span style="color: #94a3b8;">—</span>';

            return `
          <tr>
            <td><strong>${escapeHtml(caseNumber)}</strong></td>
            <td>${escapeHtml(c.caseName || `${c.petitioner} vs ${c.respondent}`)}</td>
            <td><span class="case-badge family">${escapeHtml(c.matterType || "Family Dispute")}</span></td>
            <td>${escapeHtml(c.petitioner || "—")}</td>
            <td>${escapeHtml(c.respondent || "—")}</td>
            <td>${escapeHtml(c.courtName || "Family Court")}</td>
            <td>${escapeHtml(c.clientName || "—")}</td>
            <td>${statusBadge}</td>
            <td><strong>${formatDateDMY(c.nextHearing)}</strong></td>
            <td class="case-remark-cell">${partiesRemarkHtml}</td>
            <td class="case-disposal-cell">${disposalCommentHtml}</td>
            <td class="table-actions-td" style="white-space: nowrap; text-align: center;">
              <button type="button" class="table-view-btn edit-case-btn" onclick="editCaseFromTable('${escapeHtml(caseNumber)}')" title="Edit / Update Case"><i class="fa-solid fa-pen-to-square"></i><span class="btn-text"> Edit</span></button>
            </td>
          </tr>
        `;
          })
          .join("");
      }
    }

    // 4. Revenue Cases Table & Count (Land & Tehsil)
    const revenueTable = document.querySelector("#revenueCasesTable tbody");
    const revenueCountEl = document.getElementById("revenueCount");
    const revenueCases = allCaseRecords.filter((c) => c.caseType === "revenue");
    if (revenueCountEl) revenueCountEl.textContent = String(revenueCases.length);
    if (revenueTable) {
      if (revenueCases.length === 0) {
        revenueTable.innerHTML =
          '<tr><td colspan="12" class="no-results">No Revenue cases recorded yet.</td></tr>';
      } else {
        revenueTable.innerHTML = revenueCases
          .map((c) => {
            const isDisposed = (c.caseStatus || "").toLowerCase().includes("dispose");
            const statusBadge = isDisposed
              ? '<span class="status-badge disposed"><i class="fa-solid fa-circle-check"></i> Disposed</span>'
              : '<span class="status-badge pending"><i class="fa-solid fa-clock"></i> Pending</span>';
            const partiesRemark = c.remark || c.remarks || "";
            const caseNumber = c.caseNo || "—";
            const caseName = c.caseName || `${c.applicant} vs ${c.oppositeParty}`;
            const partiesRemarkHtml = renderCaseTableRemarks(partiesRemark, caseNumber, caseName);
            const disposalComment = c.disposalComment || c.disposal_comment || "";
            const disposalCommentHtml = disposalComment
              ? `<span class="case-disposal-clamp" title="${escapeHtml(disposalComment)}"><i class="fa-solid fa-scale-balanced"></i>️ ${escapeHtml(disposalComment)}</span>`
              : isDisposed && remarksToPlainText(partiesRemark)
                ? `<span class="case-disposal-clamp" title="${escapeHtml(remarksToPlainText(partiesRemark))}"><i class="fa-solid fa-scale-balanced"></i>️ ${escapeHtml(remarksToPlainText(partiesRemark))}</span>`
                : '<span style="color: #94a3b8;">—</span>';

            return `
          <tr>
            <td><strong>${escapeHtml(caseNumber)}</strong></td>
            <td>${escapeHtml(c.caseName || `${c.applicant} vs ${c.oppositeParty}`)}</td>
            <td><span class="case-badge revenue">${escapeHtml(c.revenueActSection || "Revenue Sec")}</span></td>
            <td>${escapeHtml(c.villageMauja || "—")}</td>
            <td>${escapeHtml(c.gataKhataNo || "—")}</td>
            <td>${escapeHtml(c.courtName || "Tehsildar / SDM")}</td>
            <td>${escapeHtml(c.clientName || "—")}</td>
            <td>${statusBadge}</td>
            <td><strong>${formatDateDMY(c.nextHearing)}</strong></td>
            <td class="case-remark-cell">${partiesRemarkHtml}</td>
            <td class="case-disposal-cell">${disposalCommentHtml}</td>
            <td class="table-actions-td" style="white-space: nowrap; text-align: center;">
              <button type="button" class="table-view-btn edit-case-btn" onclick="editCaseFromTable('${escapeHtml(caseNumber)}')" title="Edit / Update Case"><i class="fa-solid fa-pen-to-square"></i><span class="btn-text"> Edit</span></button>
            </td>
          </tr>
        `;
          })
          .join("");
      }
    }

    // 5. Misc Civil Cases Table & Count
    const miscCivilTable = document.querySelector("#miscCivilCasesTable tbody");
    const miscCivilCountEl = document.getElementById("miscCivilCount");
    const miscCivilCases = allCaseRecords.filter((c) => c.caseType === "misc_civil");
    if (miscCivilCountEl) miscCivilCountEl.textContent = String(miscCivilCases.length);
    if (miscCivilTable) {
      if (miscCivilCases.length === 0) {
        miscCivilTable.innerHTML =
          '<tr><td colspan="13" class="no-results">No Misc Civil cases recorded yet.</td></tr>';
      } else {
        miscCivilTable.innerHTML = miscCivilCases
          .map((c) => {
            const isDisposed = (c.caseStatus || "").toLowerCase().includes("dispose");
            const statusBadge = isDisposed
              ? '<span class="status-badge disposed"><i class="fa-solid fa-circle-check"></i> Disposed</span>'
              : '<span class="status-badge pending"><i class="fa-solid fa-clock"></i> Pending</span>';
            const partiesRemark = c.remark || c.remarks || "";
            const caseNumber = c.caseNo || "—";
            const caseName = c.caseName || `${c.applicant} vs ${c.oppositeParty}`;
            const partiesRemarkHtml = renderCaseTableRemarks(partiesRemark, caseNumber, caseName);
            const disposalComment = c.disposalComment || c.disposal_comment || "";
            const disposalCommentHtml = disposalComment
              ? `<span class="case-disposal-clamp" title="${escapeHtml(disposalComment)}"><i class="fa-solid fa-scale-balanced"></i>️ ${escapeHtml(disposalComment)}</span>`
              : isDisposed && remarksToPlainText(partiesRemark)
                ? `<span class="case-disposal-clamp" title="${escapeHtml(remarksToPlainText(partiesRemark))}"><i class="fa-solid fa-scale-balanced"></i>️ ${escapeHtml(remarksToPlainText(partiesRemark))}</span>`
                : '<span style="color: #94a3b8;">—</span>';

            return `
          <tr>
            <td><strong>${escapeHtml(caseNumber)}</strong></td>
            <td>${escapeHtml(c.caseName || `${c.applicant} vs ${c.oppositeParty}`)}</td>
            <td><span class="case-badge misc_civil">${escapeHtml(c.proceedingType || "Misc Application")}</span></td>
            <td>${escapeHtml(c.originalCaseNumber || c.originalCase || "—")}</td>
            <td>${escapeHtml(c.applicant || "—")}</td>
            <td>${escapeHtml(c.oppositeParty || "—")}</td>
            <td>${escapeHtml(c.courtName || "Court")}</td>
            <td>${escapeHtml(c.clientName || "—")}</td>
            <td>${statusBadge}</td>
            <td><strong>${formatDateDMY(c.nextHearing)}</strong></td>
            <td class="case-remark-cell">${partiesRemarkHtml}</td>
            <td class="case-disposal-cell">${disposalCommentHtml}</td>
            <td class="table-actions-td" style="white-space: nowrap; text-align: center;">
              <button type="button" class="table-view-btn edit-case-btn" onclick="editCaseFromTable('${escapeHtml(caseNumber)}')" title="Edit / Update Case"><i class="fa-solid fa-pen-to-square"></i><span class="btn-text"> Edit</span></button>
            </td>
          </tr>
        `;
          })
          .join("");
      }
    }

    // 6. Misc Criminal Cases Table & Count
    const miscCriminalTable = document.querySelector("#miscCriminalCasesTable tbody");
    const miscCriminalCountEl = document.getElementById("miscCriminalCount");
    const miscCriminalCases = allCaseRecords.filter((c) => c.caseType === "misc_criminal");
    if (miscCriminalCountEl) miscCriminalCountEl.textContent = String(miscCriminalCases.length);
    if (miscCriminalTable) {
      if (miscCriminalCases.length === 0) {
        miscCriminalTable.innerHTML =
          '<tr><td colspan="13" class="no-results">No Misc Criminal cases recorded yet.</td></tr>';
      } else {
        miscCriminalTable.innerHTML = miscCriminalCases
          .map((c) => {
            const isDisposed = (c.caseStatus || "").toLowerCase().includes("dispose");
            const statusBadge = isDisposed
              ? '<span class="status-badge disposed"><i class="fa-solid fa-circle-check"></i> Disposed</span>'
              : '<span class="status-badge pending"><i class="fa-solid fa-clock"></i> Pending</span>';
            const partiesRemark = c.remark || c.remarks || "";
            const caseNumber = c.caseNo || "—";
            const caseName = c.caseName || `${c.applicant} vs ${c.oppositeParty}`;
            const partiesRemarkHtml = renderCaseTableRemarks(partiesRemark, caseNumber, caseName);
            const disposalComment = c.disposalComment || c.disposal_comment || "";
            const disposalCommentHtml = disposalComment
              ? `<span class="case-disposal-clamp" title="${escapeHtml(disposalComment)}"><i class="fa-solid fa-scale-balanced"></i>️ ${escapeHtml(disposalComment)}</span>`
              : isDisposed && remarksToPlainText(partiesRemark)
                ? `<span class="case-disposal-clamp" title="${escapeHtml(remarksToPlainText(partiesRemark))}"><i class="fa-solid fa-scale-balanced"></i>️ ${escapeHtml(remarksToPlainText(partiesRemark))}</span>`
                : '<span style="color: #94a3b8;">—</span>';

            return `
          <tr>
            <td><strong>${escapeHtml(caseNumber)}</strong></td>
            <td>${escapeHtml(c.caseName || `${c.applicant} vs ${c.oppositeParty}`)}</td>
            <td><span class="case-badge misc_criminal">${escapeHtml(c.proceedingType || "Bail Application")}</span></td>
            <td>${escapeHtml(c.originalCaseNumber || c.originalCase || "—")}</td>
            <td>${escapeHtml(c.policeStation || "—")}</td>
            <td>${escapeHtml(c.applicant || "—")}</td>
            <td>${escapeHtml(c.courtName || "Court")}</td>
            <td>${escapeHtml(c.clientName || "—")}</td>
            <td>${statusBadge}</td>
            <td><strong>${formatDateDMY(c.nextHearing)}</strong></td>
            <td class="case-remark-cell">${partiesRemarkHtml}</td>
            <td class="case-disposal-cell">${disposalCommentHtml}</td>
            <td class="table-actions-td" style="white-space: nowrap; text-align: center;">
              <button type="button" class="table-view-btn edit-case-btn" onclick="editCaseFromTable('${escapeHtml(caseNumber)}')" title="Edit / Update Case"><i class="fa-solid fa-pen-to-square"></i><span class="btn-text"> Edit</span></button>
            </td>
          </tr>
        `;
          })
          .join("");
      }
    }

    // 7. Complaint Cases Table & Count (Cheque Bounce Sec 138 NI Act, Sec 200 CrPC, Defamation)
    const complaintTable = document.querySelector("#complaintCasesTable tbody");
    const complaintCountEl = document.getElementById("complaintCount");
    const complaintCases = allCaseRecords.filter((c) => c.caseType === "complaint");
    if (complaintCountEl) complaintCountEl.textContent = String(complaintCases.length);
    if (complaintTable) {
      if (complaintCases.length === 0) {
        complaintTable.innerHTML =
          '<tr><td colspan="14" class="no-results">No Complaint cases recorded yet.</td></tr>';
      } else {
        complaintTable.innerHTML = complaintCases
          .map((c) => {
            const isDisposed = (c.caseStatus || "").toLowerCase().includes("dispose");
            const statusBadge = isDisposed
              ? '<span class="status-badge disposed"><i class="fa-solid fa-circle-check"></i> Disposed</span>'
              : '<span class="status-badge pending"><i class="fa-solid fa-clock"></i> Pending</span>';
            const partiesRemark = c.remark || c.remarks || "";
            const caseNumber = c.caseNo || "—";
            const caseName = c.caseName || `${c.complainant} vs ${c.accusedName}`;
            const partiesRemarkHtml = renderCaseTableRemarks(partiesRemark, caseNumber, caseName);
            const disposalComment = c.disposalComment || c.disposal_comment || "";
            const disposalCommentHtml = disposalComment
              ? `<span class="case-disposal-clamp" title="${escapeHtml(disposalComment)}"><i class="fa-solid fa-scale-balanced"></i>️ ${escapeHtml(disposalComment)}</span>`
              : isDisposed && remarksToPlainText(partiesRemark)
                ? `<span class="case-disposal-clamp" title="${escapeHtml(remarksToPlainText(partiesRemark))}"><i class="fa-solid fa-scale-balanced"></i>️ ${escapeHtml(remarksToPlainText(partiesRemark))}</span>`
                : '<span style="color: #94a3b8;">—</span>';

            return `
          <tr>
            <td><strong>${escapeHtml(caseNumber)}</strong></td>
            <td>${escapeHtml(c.caseName || `${c.complainant} vs ${c.accusedName}`)}</td>
            <td><span class="case-badge complaint">${escapeHtml(c.complaintType || "Complaint")}</span></td>
            <td>${escapeHtml(c.sectionAct || "—")}</td>
            <td>${escapeHtml(c.complainant || "—")}</td>
            <td>${escapeHtml(c.accusedName || "—")}</td>
            <td>${escapeHtml(c.policeStation || "—")}</td>
            <td>${escapeHtml(c.courtName || "Court")}</td>
            <td>${escapeHtml(c.clientName || "—")}</td>
            <td>${statusBadge}</td>
            <td><strong>${formatDateDMY(c.nextHearing)}</strong></td>
            <td class="case-remark-cell">${partiesRemarkHtml}</td>
            <td class="case-disposal-cell">${disposalCommentHtml}</td>
            <td class="table-actions-td" style="white-space: nowrap; text-align: center;">
              <button type="button" class="table-view-btn edit-case-btn" onclick="editCaseFromTable('${escapeHtml(caseNumber)}')" title="Edit / Update Case"><i class="fa-solid fa-pen-to-square"></i><span class="btn-text"> Edit</span></button>
            </td>
          </tr>
        `;
          })
          .join("");
      }
    }

    // 8. Disposed Cases Table & Count
    if (typeof renderDisposedCasesTable === "function") {
      renderDisposedCasesTable(allCaseRecords);
    } else {
      const disposedCases = allCaseRecords.filter((c) =>
        (c.caseStatus || "").toLowerCase().includes("dispose"),
      );
      const disposedCountEl = document.getElementById("disposedCount");
      const disposedTable = document.querySelector("#disposedCasesTable tbody");
      if (disposedCountEl) disposedCountEl.textContent = String(disposedCases.length);
      if (disposedTable) {
        if (disposedCases.length === 0) {
          disposedTable.innerHTML =
            '<tr><td colspan="5" class="no-results">No disposed cases recorded yet.</td></tr>';
        } else {
          disposedTable.innerHTML = disposedCases
            .map((c) => {
              const caseNumber = c.caseNo || c.criminalCaseNumber || c.case_number || "—";
              const caseYear = c.caseYear || c.case_year || "";
              const caseNumberDisplay = caseYear && !caseNumber.includes(String(caseYear))
                ? `<strong>${escapeHtml(caseNumber)}</strong> <span class="case-year-subtext">/${escapeHtml(caseYear)}</span>`
                : `<strong>${escapeHtml(caseNumber)}</strong>`;
              const caseName =
                c.caseName ||
                c.case_name ||
                (c.plaintiff
                  ? `${c.plaintiff} vs ${c.defendant}`
                  : c.victimName
                    ? `${c.victimName} vs ${c.accusedName}`
                    : "—");
              const courtName = c.courtName || c.criminalCourtName || c.court_name || "District Court";
              const rawDisposalDate = c.disposalDate || c.disposal_date || "";
              const formattedDisposalDate = rawDisposalDate
                ? (typeof formatDateDMY === "function" ? formatDateDMY(rawDisposalDate) : rawDisposalDate)
                : "";
              const partiesRemark = c.remark || c.remarks || "";
              const disposalComment = c.disposalComment || c.disposal_comment || (typeof remarksToPlainText === "function" ? remarksToPlainText(partiesRemark) : partiesRemark) || "";
              const disposalCommentHtml = disposalComment
                ? `<span class="case-disposal-clamp" data-remarks-tooltip="${escapeHtml(disposalComment)}" data-remarks-title="Disposal Note &amp; Judgment" data-case-no="${escapeHtml(caseNumber)}"><i class="fa-solid fa-scale-balanced" style="color: #0d9488; margin-right: 4px;"></i>${escapeHtml(disposalComment)}</span>`
                : '<span style="color: #94a3b8;">—</span>';
              const dateHtml = formattedDisposalDate
                ? `<i class="fa-solid fa-calendar-check" style="color: #059669; margin-right: 4px;"></i>${escapeHtml(formattedDisposalDate)}`
                : '<span style="color: #94a3b8;">—</span>';

              return `
            <tr class="disposed-row-clickable" onclick="openCaseDetailsFullModal('${escapeHtml(caseNumber)}', null, '${escapeHtml(c.caseType || c.case_type || '')}', '${escapeHtml(c.id || '')}')" title="Click to view Case Dossier">
              <td class="case-number-cell">${caseNumberDisplay}</td>
              <td class="case-name-cell">${escapeHtml(caseName)}</td>
              <td class="case-court-cell">${escapeHtml(courtName)}</td>
              <td class="case-date-cell" style="white-space: nowrap;">${dateHtml}</td>
              <td class="case-disposal-cell">${disposalCommentHtml}</td>
            </tr>
          `;
            })
            .join("");
        }
      }
    }

    // 5. Undated Cases Table & Count (With Direct Update Hearing Action)
    // "Undated" = no next hearing at all, OR the scheduled date has already
    // passed without being forwarded (needs a fresh date).
    const todayISO = toISODate(new Date());
    const isUndatedCase = (c) => {
      // Disposed cases never count as undated — they're closed, not awaiting a date
      if ((c.caseStatus || "").toLowerCase().includes("dispose")) return false;
      const nh = c.nextHearing;
      if (!nh || nh === "—" || nh === "null" || String(nh).trim() === "") return true;
      const iso = toISODate(nh);
      if (!iso) return true;
      return iso < todayISO; // hearing date passed, not forwarded
    };
    const undatedCases = allCaseRecords.filter(isUndatedCase);
    const undatedCountEl = document.getElementById("undatedCount");
    const undatedTable = document.querySelector("#undatedCasesTable tbody");
    if (undatedCountEl) undatedCountEl.textContent = String(undatedCases.length);
    if (undatedTable) {
      if (undatedCases.length === 0) {
        undatedTable.innerHTML =
          '<tr><td colspan="8" class="no-results">🎉 No undated cases! All cases have hearing dates scheduled.</td></tr>';
      } else {
        undatedTable.innerHTML = undatedCases
          .map((c) => {
            const caseNumber = c.caseNo || c.criminalCaseNumber || "—";
            const caseName =
              c.caseName ||
              (c.plaintiff
                ? `${c.plaintiff} vs ${c.defendant}`
                : c.victimName
                  ? `${c.victimName} vs ${c.accusedName}`
                  : "—");
            const nextISO = toISODate(c.nextHearing);
            const dateCell = nextISO
              ? nextISO < todayISO
                ? `<span class="undated-overdue-chip" title="Hearing date passed — not yet forwarded"><i class="fa-solid fa-clock-rotate-left"></i> ${formatDateDMY(nextISO)}</span>`
                : formatDateDMY(nextISO)
              : '<span class="undated-never-chip"><i class="fa-solid fa-circle-question"></i> Never dated</span>';
            return `
          <tr>
            <td><strong>${escapeHtml(caseNumber)}</strong></td>
            <td>${escapeHtml(caseName)}</td>
            <td>${escapeHtml(c.clientName || c.criminalClientName || "—")}</td>
            <td><span class="case-badge ${c.caseType || "civil"}">${(c.caseType || "Civil").toUpperCase()}</span></td>
            <td>${escapeHtml(c.courtName || c.criminalCourtName || "District Court")}</td>
            <td>${formatDateDMY(c.filingDate || c.crimeFilingDate)}</td>
            <td>${dateCell}</td>
            <td class="table-actions-td" style="width: 84px !important; min-width: 84px !important; max-width: 84px !important; white-space: nowrap; padding: 4px 8px !important;">
              <div style="display: flex; gap: 4px; justify-content: center; align-items: center;">
                <button type="button" class="table-view-btn update-hearing-btn" onclick="openUpdateHearingForCase('${escapeHtml(caseNumber)}')" title="Forward Hearing Date">
                  <i class="fa-solid fa-calendar-plus"></i><span class="btn-text"> Date</span>
                </button>
                <button type="button" class="table-view-btn edit-case-btn" onclick="editCaseFromTable('${escapeHtml(caseNumber)}')" title="Edit / Update Case Details">
                  <i class="fa-solid fa-pen-to-square"></i><span class="btn-text"> Edit</span>
                </button>
              </div>
            </td>
          </tr>
        `;
          })
          .join("");
      }
    }

    // 6. All Cases Combined Table with Live Filters
    updateAllCasesTypePillCounts();
    renderAllCasesTableWithFilters();
    renderCaseCards();

    // 7. Render Upcoming Hearings (Next 7 Days)
    renderUpcomingWeekHearings();

    // 8. Guest Mode Table
    renderGuestTable();

    // 9. Home Executive Dashboard
    renderHomeDashboard();

    // 10. My Cases Filter Table
    filterCaseTables();

    // 11. My Daily Cause List
    renderCauseListTable();

    // 12. Interactive Calendar Scheduler
    renderCalendarView();

    // 10. Populate Hearing Case Dropdown
    populateHearingCaseDropdown();

    // 11. To-Do Tasks & Counters
    populateTodoCaseDropdown();
    updateTodoCounters();
    const todoTab = document.getElementById("todo");
    if (
      todoTab &&
      todoTab.classList &&
      typeof todoTab.classList.contains === "function" &&
      todoTab.classList.contains("active")
    ) {
      renderCaseTasks();
    }
  } catch (err) {
    console.warn("refreshAllCaseTables caught error:", err);
  }
}
function exportAllCasesToCSV() {
  if (!allCaseRecords || allCaseRecords.length === 0) {
    alert("No cases available to export.");
    return;
  }

  const headers = [
    "Sr No",
    "Case Number",
    "Year",
    "Case Type",
    "Case Name",
    "Court Name",
    "Party Name",
    "Client Name",
    "Client Phone",
    "Filing Date",
    "Next Hearing Date",
    "Hearing Process / Stage",
    "Case Status",
    "Remarks",
    "Document Link",
  ];

  const escapeCSV = (val) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = allCaseRecords.map((c, idx) => {
    const caseNum = c.caseNo || c.criminalCaseNumber || "";
    const caseYear = c.caseYear || c.crimeYear || "";
    const caseType = (c.caseType || "civil").toUpperCase();
    const caseName =
      c.caseName ||
      (c.plaintiff
        ? `${c.plaintiff} vs ${c.defendant}`
        : c.victimName
          ? `${c.victimName} vs ${c.accusedName}`
          : "");
    const court = c.courtName || c.criminalCourtName || "";
    const party = c.partyName || c.defendant || c.accusedName || c.plaintiff || "";
    const client = c.clientName || c.criminalClientName || "";
    const phone = c.clientNumber || c.criminalClientNumber || "";
    const filing = formatDateDMY(c.filingDate || c.crimeFilingDate);
    const hearing = formatDateDMY(c.nextHearing);
    const stage = c.hearingProcess || c.process || "";
    const status = (c.caseStatus || "").toLowerCase().includes("dispose")
      ? "Disposed Off"
      : "Pending";
    const remark = remarksToPlainText(c.remark || c.remarks);
    const docLink = c.docLink || c.doc_link || "";

    return [
      idx + 1,
      escapeCSV(caseNum),
      escapeCSV(caseYear),
      escapeCSV(caseType),
      escapeCSV(caseName),
      escapeCSV(court),
      escapeCSV(party),
      escapeCSV(client),
      escapeCSV(phone),
      escapeCSV(filing),
      escapeCSV(hearing),
      escapeCSV(stage),
      escapeCSV(status),
      escapeCSV(remark),
      escapeCSV(docLink),
    ].join(",");
  });

  const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const today = new Date().toISOString().split("T")[0];
  a.href = url;
  a.download = `Chambers_Case_Records_${today}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

if (typeof exportAllCasesToCSV !== "undefined") window.exportAllCasesToCSV = exportAllCasesToCSV;

// ==========================================
// ALL CASES MASTER REGISTER & LIVE FILTER SUITE (WITH PAGINATION)
// ==========================================

var currentAllCasesFilteredList = [];
if (typeof currentAllCasesFilteredList !== 'undefined') window.currentAllCasesFilteredList = currentAllCasesFilteredList;
var allCasesPageSize = 10; // options: 10, 25, 50, 100, 'all'
var allCasesCurrentPage = 1;

function handleAllCasesPageSizeChange(val) {
  if (val === "all") {
    allCasesPageSize = "all";
  } else {
    allCasesPageSize = parseInt(val, 10) || 10;
  }
  allCasesCurrentPage = 1;
  renderAllCasesTableWithFilters(false);
}

function changeAllCasesPage(targetPage) {
  allCasesCurrentPage = targetPage;
  renderAllCasesTableWithFilters(false);
}

if (typeof isCaseWaitingForInitialFiling === "undefined") {
  function isCaseWaitingForInitialFiling(c) {
    if (!c) return false;
    const isDisposed = (typeof isCaseDisposed === 'function')
    ? isCaseDisposed(c)
    : (typeof window !== 'undefined' && typeof window.isCaseDisposed === 'function'
      ? window.isCaseDisposed(c)
      : (String(c.caseStatus || c.status || '').toLowerCase().includes('dispose') ||
         String(c.caseStatus || c.status || '').toLowerCase().includes('decid') ||
         Boolean(c.disposalComment || c.disposal_comment || c.disposalDate || c.disposal_date)));
  if (isDisposed) return false;

    // Explicit status match
    const status = String(c.caseStatus || c.status || '').trim().toLowerCase();
    if (
      status.includes('waiting for initial filing') ||
      status.includes('awaiting first hearing') ||
      status.includes('awaiting 1st hearing') ||
      status.includes('waiting for first hearing')
    ) {
      return true;
    }

    // 1. Must be filed (has a valid filing date)
    const fd = c.filingDate || c.crimeFilingDate || c.filing_date || '';
    const strFd = String(fd).trim().toLowerCase();
    const hasFilingDate = Boolean(
      strFd &&
      strFd !== '—' &&
      strFd !== '-' &&
      strFd !== 'null' &&
      strFd !== 'undefined' &&
      strFd !== 'invalid date'
    );
    if (!hasFilingDate) return false;

    // 2. No next hearing date assigned yet (pahli hearing date nhi mili hai)
    const nh = c.nextHearing || c.next_hearing || '';
    const strNh = String(nh).trim().toLowerCase();
    const hasNoNextHearing = (
      !strNh ||
      strNh === '—' ||
      strNh === '-' ||
      strNh === 'null' ||
      strNh === 'undefined' ||
      strNh === 'undated'
    );
    if (!hasNoNextHearing) return false;

    // 3. No previous hearing (never had any hearing before)
    const ph = c.previousHearing || c.previous_hearing || '';
    const strPh = String(ph).trim().toLowerCase();
    const hasNoPreviousHearing = (
      !strPh ||
      strPh === '—' ||
      strPh === '-' ||
      strPh === 'null' ||
      strPh === 'undefined'
    );
    if (!hasNoPreviousHearing) return false;

    // 4. No hearings recorded in allHearingRecords or attached to case object
    if (Array.isArray(c.hearings) && c.hearings.length > 0) return false;

    const cNo = String(c.caseNo || c.criminalCaseNumber || '').trim().toLowerCase();
    const hearingsList = (typeof window !== 'undefined' && Array.isArray(window.allHearingRecords))
      ? window.allHearingRecords
      : (typeof allHearingRecords !== 'undefined' && Array.isArray(allHearingRecords) ? allHearingRecords : []);

    if (cNo && hearingsList.length > 0) {
      const hasHistory = hearingsList.some(h => {
        const hNo = String(h.case_number || h.caseNo || '').trim().toLowerCase();
        return hNo && hNo === cNo;
      });
      if (hasHistory) return false;
    }

    return true;
  }
  if (typeof window !== "undefined") window.isCaseWaitingForInitialFiling = isCaseWaitingForInitialFiling;
}

function updateAllCasesTypePillCounts() {
  const records = allCaseRecords || [];
  const counts = {
    all: records.length,
    civil: 0,
    state: 0,
    family: 0,
    revenue: 0,
    misc_civil: 0,
    misc_criminal: 0,
    complaint: 0,
    waiting_filing: 0,
  };

  records.forEach((c) => {
    const t = (c.caseType || "civil").toLowerCase().trim();
    if (t === "civil") counts.civil++;
    else if (t === "state" || t === "criminal") counts.state++;
    else if (t === "family") counts.family++;
    else if (t === "revenue") counts.revenue++;
    else if (t === "misc_civil" || t === "misccivil") counts.misc_civil++;
    else if (t === "misc_criminal" || t === "misccriminal") counts.misc_criminal++;
    else if (t === "complaint") counts.complaint++;

    const isWaitingFiling = (typeof isCaseWaitingForInitialFiling === 'function')
      ? isCaseWaitingForInitialFiling(c)
      : (typeof window !== 'undefined' && typeof window.isCaseWaitingForInitialFiling === 'function'
        ? window.isCaseWaitingForInitialFiling(c)
        : false);

    if (isWaitingFiling) counts.waiting_filing++;
  });

  const setPill = (id, count) => {
    const el = document.getElementById(id);
    if (el) el.textContent = String(count);
  };

  setPill("pillCountAll", counts.all);
  setPill("pillCountCivil", counts.civil);
  setPill("pillCountState", counts.state);
  setPill("pillCountFamily", counts.family);
  setPill("pillCountRevenue", counts.revenue);
  setPill("pillCountMiscCivil", counts.misc_civil);
  setPill("pillCountMiscCriminal", counts.misc_criminal);
  setPill("pillCountComplaint", counts.complaint);
  setPill("pillCountWaitingFiling", counts.waiting_filing);

  // Synchronize sidebar nav counter
  const navBadge = document.getElementById("allCasesNavCount");
  if (navBadge) navBadge.textContent = String(counts.all);

  // Synchronize Case Cards sidebar nav counter
  const cardsNavBadge = document.getElementById("caseCardsNavCount");
  if (cardsNavBadge) cardsNavBadge.textContent = String((allCaseRecords || []).length);

  // Ensure horizontal wheel scrolling is active on presets row
  if (typeof initFilterTabsHorizontalScroll === "function") {
    initFilterTabsHorizontalScroll();
  }
}

function filterAllCasesByType(type) {
  window._currentActiveFilterTab = type || "";

  const typeSelect = document.getElementById("allCasesTypeSelect");
  if (typeSelect) {
    if (type === "waiting_filing") {
      typeSelect.value = "";
    } else {
      typeSelect.value = type || "";
    }
  }

  // Update active pill button across both selectors
  document
    .querySelectorAll(".filter-tabs .ftab, .all-cases-type-pills-bar .type-pill-btn")
    .forEach((btn) => {
      const btnType = btn.getAttribute("data-type") || "";
      if (btnType === (type || "")) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

  renderUnifiedCasesView();
}

function handleAllCasesTypeSelectChange() {
  const typeSelect = document.getElementById("allCasesTypeSelect");
  const val = typeSelect ? typeSelect.value : "";
  window._currentActiveFilterTab = val || "";

  // Synchronize pill button active state
  document
    .querySelectorAll(".filter-tabs .ftab, .all-cases-type-pills-bar .type-pill-btn")
    .forEach((btn) => {
      const btnType = btn.getAttribute("data-type") || "";
      if (btnType === val) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

  renderUnifiedCasesView();
}
if (typeof window !== "undefined") window.handleAllCasesTypeSelectChange = handleAllCasesTypeSelectChange;
if (typeof global !== "undefined") global.handleAllCasesTypeSelectChange = handleAllCasesTypeSelectChange;

// Global Cases View Mode State: 'table' or 'cards'
var currentCasesViewMode = localStorage.getItem("casebook_cases_view_mode") || "table";

function setCasesViewMode(mode) {
  if (mode !== "table" && mode !== "cards") mode = "table";
  currentCasesViewMode = mode;
  try {
    localStorage.setItem("casebook_cases_view_mode", mode);
  } catch (e) {}

  // Update toggle button states
  const tblBtn = document.getElementById("casesViewToggleTable");
  const crdBtn = document.getElementById("casesViewToggleCards");
  if (tblBtn) tblBtn.classList.toggle("active", mode === "table");
  if (crdBtn) crdBtn.classList.toggle("active", mode === "cards");

  // Show/Hide relevant view containers
  const tblContainer = document.getElementById("casesTableViewContainer");
  const crdContainer = document.getElementById("casesCardsViewContainer");
  const tblToolbar = document.getElementById("casesTableToolbar");

  if (tblContainer) tblContainer.classList.toggle("hidden", mode !== "table");
  if (tblToolbar) tblToolbar.classList.toggle("hidden", mode !== "table");
  if (crdContainer) crdContainer.classList.toggle("hidden", mode !== "cards");

  renderUnifiedCasesView();
}
if (typeof window !== "undefined") window.handleAllCasesTypeSelectChange = handleAllCasesTypeSelectChange;
if (typeof global !== "undefined") global.handleAllCasesTypeSelectChange = handleAllCasesTypeSelectChange;
if (typeof setCasesViewMode !== "undefined") window.setCasesViewMode = setCasesViewMode;

function clearAllCasesSearch() {
  const searchInput = document.getElementById("allCasesSearchInput");
  const clearBtn = document.getElementById("allCasesSearchClearBtn");
  if (searchInput) {
    searchInput.value = "";
    searchInput.focus();
  }
  if (clearBtn) clearBtn.classList.add("hidden");
  renderUnifiedCasesView();
}
if (typeof window !== "undefined") window.handleAllCasesTypeSelectChange = handleAllCasesTypeSelectChange;
if (typeof global !== "undefined") global.handleAllCasesTypeSelectChange = handleAllCasesTypeSelectChange;
if (typeof clearAllCasesSearch !== "undefined") window.clearAllCasesSearch = clearAllCasesSearch;

function setAllCasesStatusFilter(status) {
  const statusSelect = document.getElementById("allCasesStatusSelect");
  if (statusSelect) {
    statusSelect.value = status || "";
  }
  if (typeof syncAllCasesCustomDropdowns === "function") syncAllCasesCustomDropdowns();
  renderUnifiedCasesView();
}
if (typeof window !== "undefined") window.handleAllCasesTypeSelectChange = handleAllCasesTypeSelectChange;
if (typeof global !== "undefined") global.handleAllCasesTypeSelectChange = handleAllCasesTypeSelectChange;
if (typeof setAllCasesStatusFilter !== "undefined")
  window.setAllCasesStatusFilter = setAllCasesStatusFilter;

function setAllCasesDateFilter(dateFilter) {
  // If 'today', filter directly in search or status
  const searchInput = document.getElementById("allCasesSearchInput");
  if (dateFilter === "today") {
    const todayStr = new Date().toISOString().split("T")[0];
    const todayDMY = formatDateDMY(todayStr);
    if (searchInput) searchInput.value = todayDMY;
  }
  renderUnifiedCasesView();
}
if (typeof window !== "undefined") window.handleAllCasesTypeSelectChange = handleAllCasesTypeSelectChange;
if (typeof global !== "undefined") global.handleAllCasesTypeSelectChange = handleAllCasesTypeSelectChange;
if (typeof setAllCasesDateFilter !== "undefined")
  window.setAllCasesDateFilter = setAllCasesDateFilter;

// ==============================================================================
// CUSTOM DROPDOWNS (Design Preserved from customMadeDropDown1.html)
// ==============================================================================
function initCustomDropdown(containerId, selectId, onSelectCallback) {
  const container = document.getElementById(containerId);
  const select = document.getElementById(selectId);
  if (!container || !select) return;

  const trigger = container.querySelector(".custom-dropdown-trigger");
  const menu = container.querySelector(".custom-dropdown-menu");
  const chevron = container.querySelector(".custom-dropdown-chevron");
  const labelEl = container.querySelector(".custom-dropdown-label");
  const listEl = container.querySelector(".custom-dropdown-list");
  if (!trigger || !menu || !listEl) return;

  function openDropdown() {
    document.querySelectorAll(".custom-dropdown-menu.open").forEach((m) => {
      if (m !== menu) {
        m.classList.remove("open");
        const parent = m.closest(".custom-dropdown");
        const c = parent?.querySelector(".custom-dropdown-chevron");
        if (c) c.classList.remove("rotate-180");
        const t = parent?.querySelector(".custom-dropdown-trigger");
        if (t) t.setAttribute("aria-expanded", "false");
      }
    });

    menu.classList.add("open");
    if (chevron) chevron.classList.add("rotate-180");
    if (trigger) trigger.setAttribute("aria-expanded", "true");
  }

  function closeDropdown() {
    menu.classList.remove("open");
    if (chevron) chevron.classList.remove("rotate-180");
    if (trigger) trigger.setAttribute("aria-expanded", "false");
  }

  function toggleDropdown() {
    if (menu.classList.contains("open")) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }

  function renderOptions() {
    if (!listEl) return;
    listEl.innerHTML = "";
    const options = Array.from(select.options);
    const selectedVal = select.value;

    options.forEach((opt) => {
      const li = document.createElement("li");
      const isSelected = opt.value === selectedVal;
      li.className = `custom-dropdown-item ${isSelected ? "selected" : ""}`;
      li.setAttribute("role", "option");
      li.setAttribute("aria-selected", isSelected ? "true" : "false");
      li.setAttribute("data-value", opt.value);

      const safeText = (typeof escapeHtml === "function") ? escapeHtml(opt.textContent || opt.value) : (opt.textContent || opt.value);

      li.innerHTML = `
        <span class="truncate">${safeText}</span>
        ${isSelected ? '<svg class="w-4 h-4 text-white checkmark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>' : ''}
      `;

      li.addEventListener("click", (e) => {
        e.stopPropagation();
        select.value = opt.value;
        if (labelEl) labelEl.textContent = opt.textContent;
        closeDropdown();
        renderOptions();

        const changeEvent = new Event("change", { bubbles: true });
        select.dispatchEvent(changeEvent);

        if (typeof onSelectCallback === "function") {
          onSelectCallback(opt.value);
        }
      });

      listEl.appendChild(li);
    });

    const curOpt = select.options[select.selectedIndex];
    if (labelEl && curOpt) {
      labelEl.textContent = curOpt.textContent;
    }
  }

  container._syncFromSelect = function () {
    const curOpt = select.options[select.selectedIndex];
    if (labelEl && curOpt) {
      labelEl.textContent = curOpt.textContent;
    }
    renderOptions();
  };

  trigger.onclick = (e) => {
    e.stopPropagation();
    toggleDropdown();
  };

  renderOptions();

  if (typeof MutationObserver !== "undefined") {
    const observer = new MutationObserver(() => {
      renderOptions();
    });
    observer.observe(select, { childList: true, subtree: true });
  }

  container._initialized = true;
}

if (typeof window !== "undefined") {
  window.initCustomDropdown = initCustomDropdown;
}

function initAllCasesCustomDropdowns() {
  initCustomDropdown("allCasesTypeDropdown", "allCasesTypeSelect", () => {
    if (typeof handleAllCasesTypeSelectChange === "function") handleAllCasesTypeSelectChange();
  });
  initCustomDropdown("allCasesStatusDropdown", "allCasesStatusSelect", () => {
    if (typeof renderUnifiedCasesView === "function") renderUnifiedCasesView();
  });
  initCustomDropdown("allCasesCourtDropdown", "allCasesCourtSelect", () => {
    if (typeof renderUnifiedCasesView === "function") renderUnifiedCasesView();
  });

  if (typeof window !== "undefined" && !window._customDropdownGlobalListenerAdded) {
    window._customDropdownGlobalListenerAdded = true;
    document.addEventListener("click", (e) => {
      if (!e.target.closest || !e.target.closest(".custom-dropdown")) {
        document.querySelectorAll(".custom-dropdown-menu.open").forEach((m) => {
          m.classList.remove("open");
          const parent = m.closest(".custom-dropdown");
          const c = parent?.querySelector(".custom-dropdown-chevron");
          if (c) c.classList.remove("rotate-180");
          const t = parent?.querySelector(".custom-dropdown-trigger");
          if (t) t.setAttribute("aria-expanded", "false");
        });
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".custom-dropdown-menu.open").forEach((m) => {
          m.classList.remove("open");
          const parent = m.closest(".custom-dropdown");
          const c = parent?.querySelector(".custom-dropdown-chevron");
          if (c) c.classList.remove("rotate-180");
          const t = parent?.querySelector(".custom-dropdown-trigger");
          if (t) t.setAttribute("aria-expanded", "false");
        });
      }
    });
  }

  // Horizontal wheel-scroll support for presets row on desktop
  initFilterTabsHorizontalScroll();
}

function initFilterTabsHorizontalScroll() {
  const tabs = document.getElementById("filterTabs");
  if (tabs && !tabs._wheelAttached) {
    tabs._wheelAttached = true;
    tabs.addEventListener(
      "wheel",
      (e) => {
        if (e.deltaY !== 0) {
          e.preventDefault();
          tabs.scrollLeft += e.deltaY;
        }
      },
      { passive: false }
    );
  }
}
if (typeof initFilterTabsHorizontalScroll !== "undefined")
  window.initFilterTabsHorizontalScroll = initFilterTabsHorizontalScroll;
if (typeof initAllCasesCustomDropdowns !== "undefined")
  window.initAllCasesCustomDropdowns = initAllCasesCustomDropdowns;

function syncAllCasesCustomDropdowns() {
  ["allCasesTypeDropdown", "allCasesStatusDropdown", "allCasesCourtDropdown"].forEach((id) => {
    const container = document.getElementById(id);
    if (container && typeof container._syncFromSelect === "function") {
      container._syncFromSelect();
    }
  });
}
if (typeof syncAllCasesCustomDropdowns !== "undefined")
  window.syncAllCasesCustomDropdowns = syncAllCasesCustomDropdowns;

function updateCasesHubStatsStrip() {
  const records = allCaseRecords || [];
  const todayStr = new Date().toISOString().split("T")[0];

  const totalCount = records.length;
  let pendingCount = 0;
  let todayCount = 0;
  let undatedCount = 0;
  let disposedCount = 0;
  let pendingForwardCount = 0;

  records.forEach((c) => {
    const isDisposed = (typeof isCaseDisposed === 'function')
      ? isCaseDisposed(c)
      : ((c.caseStatus || "").toLowerCase().includes("dispose") || Boolean(c.disposalComment || c.disposal_comment));
    const isUndated = (typeof isCaseUndated === 'function')
      ? isCaseUndated(c)
      : (!isDisposed && (!c.nextHearing || c.nextHearing === "—" || c.nextHearing === "null" || !String(c.nextHearing).trim() || String(c.nextHearing).toLowerCase() === "undated"));

    if (isDisposed) {
      disposedCount++;
    } else {
      pendingCount++;
      const iso = toISODate(c.nextHearing);
      const isDatePassed = Boolean(iso) && iso < todayStr;
      if (isUndated || isDatePassed) {
        pendingForwardCount++;
      }
      if (isUndated) {
        undatedCount++;
      } else {
        if (iso === todayStr || c.nextHearing === todayStr) {
          todayCount++;
        }
      }
    }
  });

  const setEl = (id, count) => {
    const el = document.getElementById(id);
    if (el) el.textContent = String(count);
  };

  setEl("casesStatTotal", totalCount);
  setEl("casesStatPending", pendingCount);
  setEl("casesStatToday", todayCount);
  setEl("casesStatUndated", pendingForwardCount);
  setEl("casesStatDisposed", disposedCount);
}

function renderUnifiedCasesCards(filteredRecords) {
  const grid = document.getElementById("unifiedCaseCardsGrid");
  const countBadge = document.getElementById("unifiedCardsCountBadge");
  if (!grid) return;

  if (countBadge) {
    countBadge.textContent = `Showing ${filteredRecords.length} of ${(allCaseRecords || []).length} cases`;
  }

  if (filteredRecords.length === 0) {
    grid.innerHTML = `
      <div class="cards-empty-state">
        <div class="empty-state-icon">🔍</div>
        <div class="empty-state-title">No cases match the specified filters</div>
        <div class="empty-state-desc">Try adjusting your search query, status, or category.</div>
        <button type="button" class="table-view-btn empty-state-btn" onclick="resetAllCasesFilters()">Reset Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filteredRecords
    .map((c, idx) => {
      let { caseNumber, courtName, caseName, nextDateText, isDisposed, isUndated, isUrgent } =
        getCaseCardDisplayData(c);
      const statusCat = getCaseStatusCategory(c);
      const statusPillHtml = getStatusPillHtml(statusCat);
      const todayISO = toISODate(new Date());
      const nextISO = toISODate(c.nextHearing);
      const isDatePassed = !isDisposed && !isUndated && Boolean(nextISO) && nextISO < todayISO;

      let hearingChipClass = "";
      let hearingChipIcon = "fa-regular fa-calendar";
      if (isDisposed) {
        hearingChipClass = "disposed";
        hearingChipIcon = "fa-solid fa-circle-check";
      } else if (isUndated || isDatePassed) {
        hearingChipClass = "undated pending-forward";
        hearingChipIcon = "fa-solid fa-calendar-plus";
        nextDateText = isDatePassed ? `Pending Forward (${formatDateDMY(nextISO)})` : "Pending Forward Date";
      } else if (isUrgent) {
        hearingChipClass = "urgent";
      }

      const clientName = c.clientName || c.criminalClientName || "";
      const clientPhone = c.clientNumber || c.criminalClientNumber || "";

      return `
      <div class="unified-case-card" onclick="openCaseDetailsFullModal('${escapeHtml(caseNumber)}', ${idx})" title="Click to view complete case details">
        <div>
          <div class="card-top-row">
            <div class="card-caseno">
              <i class="fa-regular fa-folder" style="color: #0f766e;"></i>
              <span>${escapeHtml(caseNumber)}</span>
            </div>
            ${statusPillHtml}
          </div>
          <div class="card-title">${escapeHtml(caseName)}</div>
          <div class="card-court">
            <i class="fa-solid fa-building-columns" style="color: #0284c7; font-size: 11px;"></i>
            <span>${escapeHtml(courtName)}</span>
          </div>
          ${
            clientName
              ? `
            <div class="card-client">
              👤 ${escapeHtml(clientName)} ${clientPhone ? `<small>(${escapeHtml(clientPhone)})</small>` : ""}
            </div>
          `
              : ""
          }
        </div>
        <div class="card-bottom-row">
          <div class="card-hearing-chip ${hearingChipClass}" onclick="event.stopPropagation(); openUpdateHearingForCase('${escapeHtml(caseNumber)}')" title="${(isUndated || isDatePassed) ? 'Click to assign Forward Date' : 'Hearing Date'}">
            <i class="${hearingChipIcon}"></i>
            <span>${escapeHtml(nextDateText)}</span>
          </div>
          <div class="card-actions" onclick="event.stopPropagation()">
            <button type="button" class="card-action-btn" onclick="openCaseDetailsFullModal('${escapeHtml(caseNumber)}', ${idx})" title="View Details">
              <i class="fa-solid fa-eye"></i>
            </button>
            <button type="button" class="card-action-btn forward" onclick="openUpdateHearingForCase('${escapeHtml(caseNumber)}')" title="Forward Hearing Date">
              <i class="fa-solid fa-calendar-plus"></i>
            </button>
            <button type="button" class="card-action-btn" onclick="editCaseFromTable('${escapeHtml(caseNumber)}')" title="Edit Case">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button type="button" class="card-action-btn delete" onclick="deleteCaseCard(${idx})" title="Delete Case">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
      </div>
    `;
    })
    .join("");
}

function renderUnifiedCasesView(resetPage = true) {
  // Sync search clear button
  const searchInput = document.getElementById("allCasesSearchInput");
  const clearBtn = document.getElementById("allCasesSearchClearBtn");
  if (clearBtn && searchInput) {
    clearBtn.classList.toggle("hidden", !searchInput.value);
  }

  // Initialize or synchronize custom dropdowns
  const typeDropdown = document.getElementById("allCasesTypeDropdown");
  if (typeDropdown && !typeDropdown._initialized) {
    initAllCasesCustomDropdowns();
  } else if (typeDropdown) {
    syncAllCasesCustomDropdowns();
  }

  updateAllCasesTypePillCounts();
  updateCasesHubStatsStrip();

  if (currentCasesViewMode === "cards") {
    // Collect filtered records and render cards
    const filtered = getAllCasesFilteredDataset();
    renderUnifiedCasesCards(filtered);
  } else {
    // Render paginated table
    renderAllCasesTableWithFilters(resetPage);
  }
}
if (typeof renderUnifiedCasesView !== "undefined")
  window.renderUnifiedCasesView = renderUnifiedCasesView;

function getAllCasesFilteredDataset() {
  const searchInput = document.getElementById("allCasesSearchInput");
  const typeSelect = document.getElementById("allCasesTypeSelect");
  const statusSelect = document.getElementById("allCasesStatusSelect");
  const courtSelect = document.getElementById("allCasesCourtSelect");

  const query = (searchInput?.value || "").trim().toLowerCase();
  const selectedType = (typeSelect?.value || "").trim().toLowerCase();
  const selectedStatus = (statusSelect?.value || "").trim().toLowerCase();
  const selectedCourt = (courtSelect?.value || "").trim().toLowerCase();

  let filtered = (allCaseRecords || []).slice();

  // 1. Filter by Active Tab / Case Type
  const activeTab = window._currentActiveFilterTab || "";
  if (activeTab === "waiting_filing") {
    filtered = filtered.filter((c) => {
      return (typeof isCaseWaitingForInitialFiling === 'function')
        ? isCaseWaitingForInitialFiling(c)
        : (typeof window !== 'undefined' && typeof window.isCaseWaitingForInitialFiling === 'function'
          ? window.isCaseWaitingForInitialFiling(c)
          : false);
    });
  } else if (selectedType) {
    filtered = filtered.filter((c) => {
      const t = (c.caseType || "civil").toLowerCase().trim();
      if (selectedType === "state") return t === "state" || t === "criminal";
      if (selectedType === "misc_civil") return t === "misc_civil" || t === "misccivil";
      if (selectedType === "misc_criminal") return t === "misc_criminal" || t === "misccriminal";
      return t === selectedType;
    });
  }

  // 2. Filter by Status
  if (selectedStatus) {
    filtered = filtered.filter((c) => {
      const isDisposed = (typeof isCaseDisposed === 'function') ? isCaseDisposed(c) : (c.caseStatus || "").toLowerCase().includes("dispose");
      const isUndated = (typeof isCaseUndated === 'function') ? isCaseUndated(c) : (!isDisposed && (!c.nextHearing || c.nextHearing === "—" || c.nextHearing === "null" || !c.nextHearing.trim() || c.nextHearing.toLowerCase() === "undated"));
      const todayISO = toISODate(new Date());
      const nextISO = toISODate(c.nextHearing);
      const isPendingForward = !isDisposed && (isUndated || (Boolean(nextISO) && nextISO < todayISO));

      if (selectedStatus === "disposed") return isDisposed;
      if (selectedStatus === "undated") return isUndated;
      if (selectedStatus === "pending") return !isDisposed && !isUndated;
      if (selectedStatus === "pending_forward") return isPendingForward;
      return true;
    });
  }

  // 3. Filter by Court
  if (selectedCourt) {
    filtered = filtered.filter((c) => {
      const courtName = (c.courtName || c.criminalCourtName || "").trim().toLowerCase();
      return courtName === selectedCourt;
    });
  }

  // 4. Live Search
  if (query) {
    filtered = filtered.filter((c) => {
      const caseNo = (c.caseNo || c.criminalCaseNumber || "").toLowerCase();
      const caseName = (c.caseName || "").toLowerCase();
      const plaintiff = (c.plaintiff || "").toLowerCase();
      const defendant = (c.defendant || "").toLowerCase();
      const accused = (c.accusedName || "").toLowerCase();
      const victim = (c.victimName || "").toLowerCase();
      const client = (c.clientName || c.criminalClientName || "").toLowerCase();
      const phone = (c.clientNumber || c.criminalClientNumber || "").toLowerCase();
      const court = (c.courtName || c.criminalCourtName || "").toLowerCase();
      const remark = (typeof remarksToSearchString === "function" ? remarksToSearchString(c.remark || c.remarks) : (c.remark || c.remarks || "")).toLowerCase();
      const police = (c.policeStation || "").toLowerCase();
      const crimeNo = (c.crimeNumber || c.firNumber || "").toLowerCase();

      return (
        caseNo.includes(query) ||
        caseName.includes(query) ||
        plaintiff.includes(query) ||
        defendant.includes(query) ||
        accused.includes(query) ||
        victim.includes(query) ||
        client.includes(query) ||
        phone.includes(query) ||
        court.includes(query) ||
        remark.includes(query) ||
        police.includes(query) ||
        crimeNo.includes(query)
      );
    });
  }

  return filtered;
}

function resetAllCasesFilters() {
  window._currentActiveFilterTab = "";
  const searchInput = document.getElementById("allCasesSearchInput");
  const typeSelect = document.getElementById("allCasesTypeSelect");
  const statusSelect = document.getElementById("allCasesStatusSelect");
  const courtSelect = document.getElementById("allCasesCourtSelect");

  if (searchInput) searchInput.value = "";
  if (typeSelect) typeSelect.value = "";
  if (statusSelect) statusSelect.value = "";
  if (courtSelect) courtSelect.value = "";

  document.querySelectorAll(".filter-tabs .ftab, .all-cases-type-pills-bar .type-pill-btn").forEach((btn) => {
    const btnType = btn.getAttribute("data-type") || "";
    if (btnType === "") {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  renderUnifiedCasesView();
}
if (typeof window !== "undefined") window.handleAllCasesTypeSelectChange = handleAllCasesTypeSelectChange;
if (typeof global !== "undefined") global.handleAllCasesTypeSelectChange = handleAllCasesTypeSelectChange;

function renderAllCasesTableWithFilters(resetPage = true) {
  const tbody = document.querySelector("#allCasesTable tbody");
  const countBadge = document.getElementById("allCasesCountBadge");
  if (!tbody) return;

  if (resetPage) {
    allCasesCurrentPage = 1;
  }

  const searchInput = document.getElementById("allCasesSearchInput");
  const typeSelect = document.getElementById("allCasesTypeSelect");
  const statusSelect = document.getElementById("allCasesStatusSelect");
  const courtSelect = document.getElementById("allCasesCourtSelect");

  const query = (searchInput?.value || "").trim().toLowerCase();
  const selectedType = (typeSelect?.value || "").trim().toLowerCase();
  const selectedStatus = (statusSelect?.value || "").trim().toLowerCase();
  const selectedCourt = (courtSelect?.value || "").trim().toLowerCase();

  let filtered = (allCaseRecords || []).slice();

  // 1. Filter by Active Tab / Case Type
  const activeTab = window._currentActiveFilterTab || "";
  if (activeTab === "waiting_filing") {
    filtered = filtered.filter((c) => {
      return (typeof isCaseWaitingForInitialFiling === 'function')
        ? isCaseWaitingForInitialFiling(c)
        : (typeof window !== 'undefined' && typeof window.isCaseWaitingForInitialFiling === 'function'
          ? window.isCaseWaitingForInitialFiling(c)
          : false);
    });
  } else if (selectedType) {
    filtered = filtered.filter((c) => {
      const t = (c.caseType || "civil").toLowerCase().trim();
      if (selectedType === "state") return t === "state" || t === "criminal";
      if (selectedType === "misc_civil") return t === "misc_civil" || t === "misccivil";
      if (selectedType === "misc_criminal") return t === "misc_criminal" || t === "misccriminal";
      return t === selectedType;
    });
  }

  // 2. Filter by Status
  if (selectedStatus) {
    filtered = filtered.filter((c) => {
      const isDisposed = (typeof isCaseDisposed === 'function') ? isCaseDisposed(c) : (c.caseStatus || "").toLowerCase().includes("dispose");
      const isUndated = (typeof isCaseUndated === 'function') ? isCaseUndated(c) : (!isDisposed && (!c.nextHearing || c.nextHearing === "—" || c.nextHearing === "null" || !c.nextHearing.trim() || c.nextHearing.toLowerCase() === "undated"));
      const todayISO = toISODate(new Date());
      const nextISO = toISODate(c.nextHearing);
      const isPendingForward = !isDisposed && (isUndated || (Boolean(nextISO) && nextISO < todayISO));

      if (selectedStatus === "disposed") return isDisposed;
      if (selectedStatus === "undated") return isUndated;
      if (selectedStatus === "pending") return !isDisposed && !isUndated;
      if (selectedStatus === "pending_forward") return isPendingForward;
      return true;
    });
  }

  // 3. Filter by Court
  if (selectedCourt) {
    filtered = filtered.filter((c) => {
      const courtName = (c.courtName || c.criminalCourtName || "").trim().toLowerCase();
      return courtName === selectedCourt;
    });
  }

  // 4. Live Search across multiple indices
  if (query) {
    filtered = filtered.filter((c) => {
      const caseNo = (c.caseNo || c.criminalCaseNumber || "").toLowerCase();
      const caseName = (c.caseName || "").toLowerCase();
      const plaintiff = (c.plaintiff || "").toLowerCase();
      const defendant = (c.defendant || "").toLowerCase();
      const accused = (c.accusedName || "").toLowerCase();
      const victim = (c.victimName || "").toLowerCase();
      const client = (c.clientName || c.criminalClientName || "").toLowerCase();
      const phone = (c.clientNumber || c.criminalClientNumber || "").toLowerCase();
      const court = (c.courtName || c.criminalCourtName || "").toLowerCase();
      const remark = (typeof remarksToSearchString === "function" ? remarksToSearchString(c.remark || c.remarks) : (c.remark || c.remarks || "")).toLowerCase();
      const police = (c.policeStation || "").toLowerCase();
      const crimeNo = (c.crimeNumber || c.firNumber || "").toLowerCase();

      return (
        caseNo.includes(query) ||
        caseName.includes(query) ||
        plaintiff.includes(query) ||
        defendant.includes(query) ||
        accused.includes(query) ||
        victim.includes(query) ||
        client.includes(query) ||
        phone.includes(query) ||
        court.includes(query) ||
        remark.includes(query) ||
        police.includes(query) ||
        crimeNo.includes(query)
      );
    });
  }

  currentAllCasesFilteredList = filtered;

  const totalFiltered = filtered.length;
  const isAll = allCasesPageSize === "all";
  const effectivePageSize = isAll ? totalFiltered : parseInt(allCasesPageSize, 10) || 25;
  const totalPages = isAll ? 1 : Math.max(1, Math.ceil(totalFiltered / effectivePageSize));

  if (allCasesCurrentPage > totalPages) allCasesCurrentPage = totalPages;
  if (allCasesCurrentPage < 1) allCasesCurrentPage = 1;

  const startIndex = isAll ? 0 : (allCasesCurrentPage - 1) * effectivePageSize;
  const endIndex = isAll ? totalFiltered : Math.min(startIndex + effectivePageSize, totalFiltered);

  // Update count badge
  if (countBadge) {
    countBadge.textContent = `Showing ${totalFiltered} of ${(allCaseRecords || []).length} cases`;
  }

  // Render pagination controls
  renderAllCasesPaginationControls(
    totalFiltered,
    effectivePageSize,
    totalPages,
    allCasesCurrentPage,
    isAll,
  );

  if (totalFiltered === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="no-results" style="text-align: center; padding: 2rem; color: #64748b;">
          🔍 No cases match the selected filters or search query.
          <br><button type="button" class="table-view-btn" onclick="resetAllCasesFilters()" style="margin-top: 8px; font-size: 0.8rem;">Clear Filters</button>
        </td>
      </tr>
    `;
    return;
  }

  const pageRecords = filtered.slice(startIndex, endIndex);

  tbody.innerHTML = pageRecords
    .map((c) => {
      const caseNumber = c.caseNo || c.criminalCaseNumber || "—";

      // Sanitize case name and avoid bare 'vs'
      let caseName = (c.caseName || "").trim();
      if (!caseName || caseName.toLowerCase() === "vs" || caseName.toLowerCase() === "vs.") {
        if (c.plaintiff && c.defendant) {
          caseName = `${c.plaintiff} vs ${c.defendant}`;
        } else if (c.plaintiff) {
          caseName = `${c.plaintiff} vs Opposite`;
        } else if (c.accusedName) {
          caseName = `State vs ${c.accusedName}`;
        } else if (c.victimName) {
          caseName = `${c.victimName} vs Accused`;
        } else {
          caseName = "Untitled Matter";
        }
      }

      const courtName = c.courtName || c.criminalCourtName || "District Court";
      const clientName = c.clientName || c.criminalClientName || "—";
      const clientPhone = c.clientNumber || c.criminalClientNumber || "";

      const isDisposed = (typeof isCaseDisposed === 'function') ? isCaseDisposed(c) : (c.caseStatus || "").toLowerCase().includes("dispose");
      const isUndated = (typeof isCaseUndated === 'function') ? isCaseUndated(c) : (!isDisposed && (!c.nextHearing || c.nextHearing === "—" || c.nextHearing === "null" || !c.nextHearing.trim() || c.nextHearing.toLowerCase() === "undated"));
      const todayISO = toISODate(new Date());
      const nextISO = toISODate(c.nextHearing);
      const isDatePassed = !isDisposed && !isUndated && Boolean(nextISO) && nextISO < todayISO;

      let nextHearingStr = "";
      if (isDisposed) {
        const dispDate = c.disposalDate || c.disposal_date;
        nextHearingStr = `<span class="table-badge completed" style="font-size:0.75rem;">Disposed${dispDate ? " · " + formatDateDMY(dispDate) : ""}</span>`;
      } else if (isUndated) {
        nextHearingStr = `<button type="button" class="btn-pending-forward-chip undated" onclick="event.stopPropagation(); openUpdateHearingForCase('${escapeHtml(caseNumber)}')" title="No hearing date set — click to assign Forward Date"><iconify-icon icon="lucide:calendar-clock"></iconify-icon> Pending Forward Date</button>`;
      } else if (isDatePassed) {
        nextHearingStr = `<div class="pending-forward-cell" title="Hearing date has passed (${formatDateDMY(nextISO)}) — click to Forward Date"><span class="overdue-past-date">${formatDateDMY(nextISO)}</span><button type="button" class="btn-pending-forward-chip overdue" onclick="event.stopPropagation(); openUpdateHearingForCase('${escapeHtml(caseNumber)}')"><iconify-icon icon="lucide:calendar-plus"></iconify-icon> Pending Forward Date</button></div>`;
      } else {
        nextHearingStr = `<strong>${formatDateDMY(c.nextHearing)}</strong>`;
      }

      const partiesRemark = c.remark || c.remarks || "";
      const partiesRemarkHtml = renderCaseTableRemarks(partiesRemark, caseNumber, caseName);

      return `
      <tr onclick="openCaseDetailsFullModal('${escapeHtml(caseNumber)}')" title="Click to view full case details">
        <td><span class="case-num">${escapeHtml(caseNumber)}</span></td>
        <td>
          <div class="case-name">${escapeHtml(caseName)}</div>
          ${c.policeStation ? `<small style="color:#64748b;">🚔 PS: ${escapeHtml(c.policeStation)}` + (c.crimeNumber ? ` | ${escapeHtml(c.crimeNumber)}` : "") + `</small>` : ""}
        </td>
        <td>
          <div class="court-cell">
            <iconify-icon icon="lucide:building-2"></iconify-icon>
            <span>${escapeHtml(courtName)}</span>
          </div>
        </td>
        <td>
          <div class="client-cell">
            <div class="client-name">${escapeHtml(clientName)}</div>
            ${clientPhone ? `<div class="client-phone"><iconify-icon icon="lucide:phone"></iconify-icon> ${escapeHtml(clientPhone)}</div>` : ""}
          </div>
        </td>
        <td class="case-remark-cell">${partiesRemarkHtml}</td>
        <td style="text-align: center;">${nextHearingStr}</td>
        <td style="text-align: center; white-space: nowrap;" onclick="event.stopPropagation()">
          <div class="row-actions">
            <button type="button" class="ra-btn view" onclick="openCaseDetailsFullModal('${escapeHtml(caseNumber)}')" title="View Case Details">
              <iconify-icon icon="lucide:eye"></iconify-icon>
            </button>
            <button type="button" class="ra-btn forward" onclick="openUpdateHearingForCase('${escapeHtml(caseNumber)}')" title="Forward Hearing Date">
              <iconify-icon icon="lucide:calendar-plus"></iconify-icon>
            </button>
            <button type="button" class="ra-btn edit" onclick="editCaseFromTable('${escapeHtml(caseNumber)}')" title="Edit / Update Case">
              <iconify-icon icon="lucide:pencil"></iconify-icon>
            </button>
          </div>
        </td>
      </tr>
    `;
    })
    .join("");
}

/* ==============================================================
   Case Cards Board — 3-line expandable cards for all cases
   ============================================================== */
function getCaseCardDisplayData(c) {
  const caseType = (c.caseType || "civil").toLowerCase();
  const caseNumber = c.caseNo || c.criminalCaseNumber || "—";
  const courtName = c.courtName || c.criminalCourtName || "District Court";

  // Sanitize case name and avoid bare 'vs'
  let caseName = (c.caseName || "").trim();
  if (!caseName || caseName.toLowerCase() === "vs" || caseName.toLowerCase() === "vs.") {
    if (c.plaintiff && c.defendant) caseName = `${c.plaintiff} vs ${c.defendant}`;
    else if (c.petitioner && c.respondent) caseName = `${c.petitioner} vs ${c.respondent}`;
    else if (c.applicant && c.respondent) caseName = `${c.applicant} vs ${c.respondent}`;
    else if (c.plaintiff) caseName = `${c.plaintiff} vs Opposite`;
    else if (c.accusedName) caseName = `State vs ${c.accusedName}`;
    else if (c.victimName) caseName = `${c.victimName} vs Accused`;
    else caseName = "Untitled Matter";
  }

  const isDisposed =
    (typeof isCaseDisposed === 'function')
      ? isCaseDisposed(c)
      : ((c.caseStatus || "").toLowerCase().includes("dispose") || Boolean(c.disposalComment || c.disposal_comment));
  const isUndated =
    (typeof isCaseUndated === 'function')
      ? isCaseUndated(c)
      : (!isDisposed && (!c.nextHearing || c.nextHearing === "—" || c.nextHearing === "null" || !String(c.nextHearing).trim() || String(c.nextHearing).toLowerCase() === "undated"));

  let statusText = "Pending";
  let statusColor = "#ea580c";
  if (isDisposed) {
    statusText = (c.caseStatus && String(c.caseStatus).toLowerCase().includes("decid")) ? "Decided" : "Disposed Off";
    statusColor = "#059669";
  } else if (isUndated) {
    statusText = "Undated";
    statusColor = "#d97706";
  }

  let nextDateText = "—";
  if (isDisposed) {
    const dispDate = c.disposalDate || c.disposal_date;
    nextDateText = dispDate ? formatDateDMY(dispDate) : "Decided / Disposed";
  } else if (isUndated) {
    nextDateText = "Undated";
  } else if (c.nextHearing) {
    nextDateText = formatDateDMY(c.nextHearing);
  }

  const isCriminalSide = [
    "criminal",
    "state",
    "complaint",
    "misc_criminal",
    "misccriminal",
  ].includes(caseType);
  const appRole = isCriminalSide
    ? "Complainant / State"
    : caseType === "family"
      ? "Petitioner"
      : caseType === "revenue"
        ? "Applicant"
        : "Plaintiff";
  const resRole = isCriminalSide
    ? "Accused"
    : caseType === "family"
      ? "Respondent"
      : caseType === "revenue"
        ? "Opposite Party"
        : "Defendant";
  const appName =
    (c.plaintiff || c.petitioner || c.applicant || c.firstParty || c.victimName || "").trim() ||
    "Not Specified";
  const resName =
    (c.defendant || c.respondent || c.oppositeParty || c.accusedName || "").trim() ||
    "Not Specified";

  const daysUntil =
    typeof getDaysUntilHearing === "function" ? getDaysUntilHearing(c.nextHearing) : null;
  const isUrgent =
    !isDisposed && !isUndated && daysUntil !== null && daysUntil >= 0 && daysUntil <= 7;
  const urgentBadgeHtml = isUrgent
    ? '<span class="badge urgent" style="background:#fee2e2; color:#b91c1c; font-size:0.75rem; font-weight:700; padding:2px 8px; border-radius:9999px;"><i class="fa-solid fa-triangle-exclamation"></i> Hearing Soon</span>'
    : "";

  return {
    caseType,
    caseNumber,
    courtName,
    caseName,
    isDisposed,
    isUndated,
    statusText,
    statusColor,
    nextDateText,
    appRole,
    appName,
    resRole,
    resName,
    isUrgent,
    urgentBadgeHtml,
    daysUntil,
  };
}

function buildCaseCardSections(c) {
  const { caseType, caseNumber, courtName, isDisposed, isUndated } = getCaseCardDisplayData(c);
  const isCriminalSide = [
    "criminal",
    "state",
    "complaint",
    "misc_criminal",
    "misccriminal",
  ].includes(caseType);

  // ----- 1. Courts & Case Info -----
  const info = [];
  info.push(["Case Number", caseNumber]);
  info.push(["Case Type", caseType.replace("_", " ").toUpperCase()]);
  if (c.caseYear || c.crimeYear) info.push(["Registration Year", c.caseYear || c.crimeYear]);
  info.push(["Court / Forum", courtName]);
  if (c.filingDate || c.crimeFilingDate)
    info.push(["Filing Date", formatDateDMY(c.filingDate || c.crimeFilingDate)]);
  if (c.hearingProcess) info.push(["Next Stage", c.hearingProcess]);

  // ----- 2. Parties & Matter -----
  const parties = [];
  if (isCriminalSide) {
    if (c.victimName || c.firstParty)
      parties.push(["Complainant / Victim", c.victimName || c.firstParty]);
    if (c.accusedName || c.oppositeParty)
      parties.push(["Accused / Opposite", c.accusedName || c.oppositeParty]);
    if (c.policeStation) parties.push(["Police Station", c.policeStation]);
    if (c.crimeNumber)
      parties.push([
        "FIR / Crime No.",
        `${c.crimeNumber}${c.crimeYear ? ` / ${c.crimeYear}` : ""}`,
      ]);
    if (c.crimeSection) parties.push(["Sections (IPC/BNS)", c.crimeSection]);
    if (c.custodyStatus) parties.push(["Custody / Bail Status", c.custodyStatus]);
  } else if (caseType === "family") {
    if (c.petitioner || c.plaintiff)
      parties.push(["Petitioner / Applicant", c.petitioner || c.plaintiff]);
    if (c.respondent || c.defendant)
      parties.push(["Respondent / Opposite", c.respondent || c.defendant]);
    if (c.familyMatterType || c.matterType)
      parties.push(["Dispute Nature", c.familyMatterType || c.matterType]);
    if (c.marriageDate) parties.push(["Marriage Date", formatDateDMY(c.marriageDate)]);
    if (c.maintenance) parties.push(["Maintenance Details", c.maintenance]);
  } else if (caseType === "revenue") {
    if (c.applicant || c.plaintiff)
      parties.push(["Applicant / Petitioner", c.applicant || c.plaintiff]);
    if (c.respondent || c.defendant) parties.push(["Opposite Party", c.respondent || c.defendant]);
    if (c.revenueMatterType) parties.push(["Revenue Matter Nature", c.revenueMatterType]);
    if (c.village) parties.push(["Village / Mauza", c.village]);
    if (c.khataNo || c.gataNo)
      parties.push([
        "Khata / Gata No.",
        [c.khataNo ? `Khata: ${c.khataNo}` : "", c.gataNo ? `Gata: ${c.gataNo}` : ""]
          .filter(Boolean)
          .join(" | "),
      ]);
  } else {
    if (c.plaintiff || c.firstParty)
      parties.push(["Plaintiff / Petitioner", c.plaintiff || c.firstParty]);
    if (c.defendant || c.oppositeParty)
      parties.push(["Defendant / Respondent", c.defendant || c.oppositeParty]);
    if (c.matterType) parties.push(["Matter / Suit Nature", c.matterType]);
  }

  // ----- 3. Hearings -----
  let statusText = "Pending";
  if (isDisposed) statusText = "Disposed Off";
  else if (isUndated) statusText = "Undated / Unscheduled";

  const hearings = [["Status", statusText]];
  if (!isUndated) hearings.push(["Next Hearing", formatDateDMY(c.nextHearing)]);
  if (c.previousHearing) hearings.push(["Previous Hearing", formatDateDMY(c.previousHearing)]);
  if (c.previousProcess) hearings.push(["Previous Process", c.previousProcess]);

  // Full previous-hearing history (dated, process, action taken)
  const hearingHistory = getCaseHearingHistory(caseNumber)
    .filter((h) => h.hearing_date && h.hearing_date !== c.nextHearing)
    .map((h) => ({
      date: h.hearing_date,
      process: h.process || "—",
      action: h.action_taken || "—",
    }));

  // ----- 4. Client & Remarks -----
  const client = [];
  const clientName = c.clientName || c.criminalClientName || c.client || "";
  if (clientName) client.push(["Client", clientName]);
  const clientPhone = c.clientNumber || c.criminalClientNumber || "";
  if (clientPhone) client.push(["Client Phone", clientPhone]);
  const remarkText = remarksToPlainText(c.remark || c.remarks);
  if (remarkText) client.push(["Remarks", remarkText]);
  const disposal = String(c.disposalComment || c.disposal_comment || "").trim();
  if (disposal) client.push(["Disposal Order", disposal]);

  return [
    { num: 1, icon: "fa-landmark", title: "Courts & Case Info", rows: info },
    { num: 2, icon: "fa-user-group", title: "Parties & Matter", rows: parties },
    {
      num: 3,
      icon: "fa-calendar-days",
      title: `Hearings${hearingHistory.length ? ` (${hearingHistory.length} previous)` : ""}`,
      rows: hearings,
      history: hearingHistory,
    },
    { num: 4, icon: "fa-address-card", title: "Client & Remarks", rows: client },
  ].filter((s) => s.rows.length > 0);
}

function getDaysUntilHearing(dateStr) {
  if (
    !dateStr ||
    dateStr === "—" ||
    dateStr === "null" ||
    !String(dateStr).trim() ||
    String(dateStr).toLowerCase() === "undated"
  )
    return null;
  const target = new Date(dateStr);
  if (isNaN(target.getTime())) return null;
  const now = new Date();
  const dTarget = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  const dNow = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((dTarget.getTime() - dNow.getTime()) / (1000 * 60 * 60 * 24));
}

function getCasePartyInitials(name) {
  if (!name || name === "—" || name === "Not Specified") return "—";
  const clean = name.replace(/[^a-zA-Z0-9\s]/g, "").trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (!parts.length) return "—";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function showCaseBookToast(msg) {
  const t = document.getElementById("caseBookToast") || document.getElementById("toast");
  if (!t) return;
  t.textContent = msg || "Action completed successfully";
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2000);
}
if (typeof showCaseBookToast !== "undefined") window.showCaseBookToast = showCaseBookToast;

function toggleCaseCardSection(headerEl) {
  const t = headerEl.querySelector(".toggle");
  if (!t) return;
  const isCollapsed = t.textContent.trim() === "▶";
  t.textContent = isCollapsed ? "▼" : "▶";
  let el = headerEl.nextElementSibling;
  while (el && !el.classList.contains("section-head") && !el.classList.contains("card-actions")) {
    el.style.display = isCollapsed ? "" : "none";
    el = el.nextElementSibling;
  }

  // Update card head button state based on open sections
  const card = headerEl.closest(".case-card");
  if (card) {
    const hideBtn = card.querySelector(".hide-btn");
    if (hideBtn) {
      const anyOpen = Array.from(card.querySelectorAll(".section-head .toggle")).some(
        (span) => span.textContent.trim() === "▼",
      );
      hideBtn.textContent = anyOpen ? "▲ Hide details" : "▼ Show details";
    }
  }
}

function toggleCaseCard(idx) {
  const card = document.querySelector(`.case-card[data-card-index="${idx}"]`);
  if (!card) return;
  const hideBtn = card.querySelector(".hide-btn");
  if (!hideBtn) return;
  const isCurrentlyExpanded = hideBtn.textContent.includes("Hide");
  const sections = card.querySelectorAll(".section-head");

  if (isCurrentlyExpanded) {
    hideBtn.textContent = "▼ Show details";
    sections.forEach((h) => {
      const t = h.querySelector(".toggle");
      if (t) t.textContent = "▶";
      let el = h.nextElementSibling;
      while (
        el &&
        !el.classList.contains("section-head") &&
        !el.classList.contains("card-actions")
      ) {
        el.style.display = "none";
        el = el.nextElementSibling;
      }
    });
  } else {
    hideBtn.textContent = "▲ Hide details";
    sections.forEach((h) => {
      const t = h.querySelector(".toggle");
      if (t) t.textContent = "▼";
      let el = h.nextElementSibling;
      while (
        el &&
        !el.classList.contains("section-head") &&
        !el.classList.contains("card-actions")
      ) {
        el.style.display = "";
        el = el.nextElementSibling;
      }
    });
  }
}

function caseCardSortValue(c) {
  const { isDisposed, isUndated } = getCaseCardDisplayData(c);
  if (isDisposed) return 3; // disposed last
  if (isUndated) return 2; // undated after dated
  return 1; // dated first (chronological, see comparator)
}

/* ── Case Cards quick filter pills ── */
var caseCardsActivePill = "all";

function setCaseCardsPill(filter, btn) {
  caseCardsActivePill = filter;
  document.querySelectorAll("#caseCardsPillRow .chip").forEach((p) => {
    p.classList.toggle("active", p === btn || p.getAttribute("data-filter") === filter);
  });
  renderCaseCards();
}

function isNewCase(c) {
  if (!c) return false;
  if (c.isNew) return true;
  const dateStr = c.created_at || c.createdAt || c.filingDate || c.crimeFilingDate;
  if (dateStr) {
    const dt = new Date(dateStr);
    if (!isNaN(dt.getTime())) {
      const diffDays = (Date.now() - dt.getTime()) / (1000 * 60 * 60 * 24);
      if (diffDays >= 0 && diffDays <= 7) return true;
    }
  }
  return false;
}

if (typeof isNewCase !== "undefined") window.isNewCase = isNewCase;

function getCaseStatusCategory(c) {
  if (!c) return "PENDING";
  const st = (c.status || c.caseStatus || c.currentStatus || "").toLowerCase();
  const isDisp =
    (typeof isCaseDisposed === 'function')
      ? isCaseDisposed(c)
      : (st.includes("dispose") || st.includes("decid") || Boolean(c.disposalComment || c.disposal_comment || c.disposalDate));
  if (isDisp) return "DISPOSED";
  if (st.includes("close")) return "CLOSED";
  if (st.includes("list") || c.courtHall || c.itemNumber) return "LISTED";
  if (
    c.nextHearing &&
    c.nextHearing !== "—" &&
    c.nextHearing !== "null" &&
    String(c.nextHearing).toLowerCase() !== "undated"
  ) {
    const nextDt = new Date(c.nextHearing);
    if (!isNaN(nextDt.getTime()) && nextDt >= new Date(new Date().setHours(0, 0, 0, 0))) {
      return "LISTED";
    }
  }
  return "PENDING";
}

if (typeof getCaseStatusCategory !== "undefined")
  window.getCaseStatusCategory = getCaseStatusCategory;

function getStatusPillHtml(statusCategory) {
  const cat = (statusCategory || "PENDING").toUpperCase();
  if (cat === "DISPOSED") {
    return '<span class="cc-status-pill disposed"><span class="dot"></span> DISPOSED</span>';
  } else if (cat === "CLOSED") {
    return '<span class="cc-status-pill closed"><span class="dot"></span> CLOSED</span>';
  } else if (cat === "LISTED") {
    return '<span class="cc-status-pill listed"><span class="dot"></span> LISTED</span>';
  } else {
    return '<span class="cc-status-pill pending"><span class="dot"></span> PENDING</span>';
  }
}

if (typeof getStatusPillHtml !== "undefined") window.getStatusPillHtml = getStatusPillHtml;

function caseCardMatchesPill(c, pill) {
  if (!c || pill === "all") return true;
  const statusCat = getCaseStatusCategory(c).toLowerCase();
  if (pill === "pending") return statusCat === "pending";
  if (pill === "listed") return statusCat === "listed";
  if (pill === "disposed") return statusCat === "disposed";
  if (pill === "closed") return statusCat === "closed";

  const { caseType, isDisposed, isUndated } = getCaseCardDisplayData(c);
  if (pill === "urgent") {
    if (isDisposed || isUndated) return false;
    const days =
      typeof getDaysUntilHearing === "function" ? getDaysUntilHearing(c.nextHearing) : null;
    return days !== null && days >= 0 && days <= 7;
  }
  if (pill === "thisweek") {
    if (isDisposed || isUndated) return false;
    const days =
      typeof getDaysUntilHearing === "function" ? getDaysUntilHearing(c.nextHearing) : null;
    return days !== null && days >= 0 && days <= 7;
  }
  if (pill === "revenue") return caseType === "revenue";
  if (pill === "civil") return caseType === "civil";
  if (pill === "criminal")
    return ["criminal", "state", "complaint", "misc_criminal", "misccriminal"].includes(caseType);
  if (pill === "undated") return isUndated && !isDisposed;
  if (pill === "dated") return !isUndated && !isDisposed;
  return caseType === pill;
}

function updateCaseCardsPillCounts() {
  const records = allCaseRecords || [];
  const totalCount = records.length;
  let pendingCount = 0;
  let hearingThisWeekCount = 0;
  const clientSet = new Set();

  records.forEach((c) => {
    const { isDisposed, isUndated } = getCaseCardDisplayData(c);
    if (!isDisposed) pendingCount++;
    if (!isDisposed && !isUndated) {
      const days =
        typeof getDaysUntilHearing === "function" ? getDaysUntilHearing(c.nextHearing) : null;
      if (days !== null && days >= 0 && days <= 7) {
        hearingThisWeekCount++;
      }
    }
    const cName = (c.clientName || c.criminalClientName || c.client || "").trim();
    if (cName) clientSet.add(cName.toLowerCase());
  });

  const totalEl = document.getElementById("cardsStatTotal");
  if (totalEl) totalEl.textContent = String(totalCount);
  const pendingEl = document.getElementById("cardsStatPending");
  if (pendingEl) pendingEl.textContent = String(pendingCount);
  const weekEl = document.getElementById("cardsStatThisWeek");
  if (weekEl) weekEl.textContent = String(hearingThisWeekCount);
  const clientsEl = document.getElementById("cardsStatClients");
  if (clientsEl) clientsEl.textContent = String(clientSet.size);

  const navBadge = document.getElementById("caseCardsNavCount");
  if (navBadge) navBadge.textContent = String(totalCount);
}

function resetCaseCardsFilters() {
  caseCardsActivePill = "all";
  const searchInput = document.getElementById("caseCardsSearchInput");
  if (searchInput) searchInput.value = "";
  document.querySelectorAll("#caseCardsPillRow .chip").forEach((p) => {
    p.classList.toggle("active", p.getAttribute("data-filter") === "all");
  });
  renderCaseCards();
}

if (typeof resetCaseCardsFilters !== "undefined")
  window.resetCaseCardsFilters = resetCaseCardsFilters;

function renderCaseCards() {
  const grid = document.getElementById("caseCardsGrid");
  if (!grid) return;

  // Handle Loading state
  if (allCaseRecords === null || allCaseRecords === undefined) {
    grid.innerHTML = `
      <div class="case-cards-loading">
        <div class="cc-spinner"></div>
        <p>Loading cases from database...</p>
      </div>
    `;
    return;
  }

  const searchInput = document.getElementById("caseCardsSearchInput");
  const countBadge = document.getElementById("caseCardsCountBadge");
  const query = (searchInput?.value || "").trim().toLowerCase();

  let filtered = (allCaseRecords || []).slice();

  updateCaseCardsPillCounts();

  if (caseCardsActivePill !== "all") {
    filtered = filtered.filter((c) => caseCardMatchesPill(c, caseCardsActivePill));
  }

  if (query) {
    filtered = filtered.filter((c) => {
      const caseNo = (c.caseNo || c.criminalCaseNumber || "").toLowerCase();
      const caseName = (c.caseName || "").toLowerCase();
      const plaintiff = (c.plaintiff || c.petitioner || c.applicant || "").toLowerCase();
      const defendant = (c.defendant || c.respondent || c.oppositeParty || "").toLowerCase();
      const accused = (c.accusedName || "").toLowerCase();
      const victim = (c.victimName || "").toLowerCase();
      const client = (c.clientName || c.criminalClientName || "").toLowerCase();
      const phone = (c.clientNumber || c.criminalClientNumber || "").toLowerCase();
      const court = (c.courtName || c.criminalCourtName || "").toLowerCase();
      const remark = (typeof remarksToSearchString === "function" ? remarksToSearchString(c.remark || c.remarks) : (c.remark || c.remarks || "")).toLowerCase();
      const police = (c.policeStation || "").toLowerCase();
      const crimeNo = (c.crimeNumber || c.firNumber || "").toLowerCase();
      return (
        caseNo.includes(query) ||
        caseName.includes(query) ||
        plaintiff.includes(query) ||
        defendant.includes(query) ||
        accused.includes(query) ||
        victim.includes(query) ||
        client.includes(query) ||
        phone.includes(query) ||
        court.includes(query) ||
        remark.includes(query) ||
        police.includes(query) ||
        crimeNo.includes(query)
      );
    });
  }

  // Sort: dated (nearest first) → undated → disposed
  filtered.sort((a, b) => {
    const rankA = caseCardSortValue(a);
    const rankB = caseCardSortValue(b);
    if (rankA !== rankB) return rankA - rankB;
    if (rankA === 1) return new Date(a.nextHearing) - new Date(b.nextHearing);
    return 0;
  });

  caseCardsFilteredList = filtered;

  if (countBadge) {
    countBadge.textContent = `Showing ${filtered.length} of ${(allCaseRecords || []).length} cases`;
  }

  // Handle Empty state
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="icon">🔍</div>
        <div class="msg" style="font-size: 15px; font-weight: 700; color: #1e293b; margin-bottom: 4px;">No cases match your criteria</div>
        <div style="font-size: 13px; color: #64748b; margin-bottom: 16px;">Try adjusting your status filter or clearing the search query.</div>
        <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
          <button type="button" class="btn btn-out" onclick="resetCaseCardsFilters()">🔄 Reset Filters</button>
          <button type="button" class="btn btn-dark" onclick="showTab('add')">➕ Add New Case</button>
        </div>
      </div>
    `;
    return;
  }

  // Desktop Table Rows HTML
  const rowsHtml = filtered
    .map((c, idx) => {
      const { caseNumber, courtName, caseName, nextDateText, isDisposed, isUndated, isUrgent } =
        getCaseCardDisplayData(c);
      const statusCat = getCaseStatusCategory(c);
      const statusPillHtml = getStatusPillHtml(statusCat);
      const newTagHtml = isNewCase(c) ? '<span class="cc-new-badge">NEW</span>' : "";

      // Next Hearing Chip
      let hearingChipHtml = "";
      if (isDisposed) {
        hearingChipHtml = `
        <div class="cc-hearing-chip disposed">
          <i class="fa-solid fa-circle-check"></i>
          <span>${escapeHtml(nextDateText !== "Disposed" ? nextDateText : "Closed")}</span>
        </div>
        ${c.disposalDate ? `<span class="cc-hearing-stage">Date: ${escapeHtml(formatDateDMY(c.disposalDate))}</span>` : ""}
      `;
      } else if (isUndated) {
        hearingChipHtml = `
        <div class="cc-hearing-chip undated">
          <i class="fa-solid fa-clock-rotate-left"></i>
          <span>Not Scheduled</span>
        </div>
        <span class="cc-hearing-stage">Needs Hearing Date</span>
      `;
      } else {
        hearingChipHtml = `
        <div class="cc-hearing-chip ${isUrgent ? "urgent" : ""}">
          <i class="fa-regular fa-calendar"></i>
          <span>${escapeHtml(nextDateText)}</span>
        </div>
        ${c.hearingProcess ? `<span class="cc-hearing-stage" title="${escapeHtml(c.hearingProcess)}">${escapeHtml(c.hearingProcess)}</span>` : '<span class="cc-hearing-stage">Upcoming Hearing</span>'}
      `;
      }

      return `
      <tr onclick="openCaseDetailsFullModal('${escapeHtml(caseNumber)}', ${idx})" title="Click to view full case details">
        <!-- 1. Case Details -->
        <td>
          <div class="cc-case-no">
            <i class="fa-regular fa-folder" style="color: #0284c7; font-size: 12px;"></i>
            <span>${escapeHtml(caseNumber || "—")}</span>
            ${newTagHtml}
          </div>
          <div class="cc-case-title" title="${escapeHtml(caseName)}">
            ${escapeHtml(caseName)}
          </div>
        </td>

        <!-- 2. Court / Forum -->
        <td class="cc-col-court">
          <div class="cc-court-chip" title="${escapeHtml(courtName || "—")}">
            <i class="fa-solid fa-building-columns"></i>
            <span>${escapeHtml(courtName || "—")}</span>
          </div>
        </td>

        <!-- 3. Next Hearing Date -->
        <td>
          ${hearingChipHtml}
        </td>

        <!-- 4. Status -->
        <td class="cc-desktop-status">
          ${statusPillHtml}
        </td>

        <!-- 5. Actions: View, Edit, Delete -->
        <td style="text-align: right; white-space: nowrap;">
          <div class="cc-actions-wrap" onclick="event.stopPropagation()">
            <button type="button" class="cc-action-btn view" onclick="openCaseDetailsFullModal('${escapeHtml(caseNumber)}', ${idx})" title="View Complete Details">
              <i class="fa-solid fa-eye"></i>
            </button>
            <button type="button" class="cc-action-btn edit" onclick="editCaseFromTable('${escapeHtml(caseNumber)}')" title="Edit Case">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button type="button" class="cc-action-btn delete" onclick="deleteCaseCard(${idx})" title="Delete Case Permanently">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
    })
    .join("");

  // Mobile Cards HTML (same dataset, optimized card format)
  const mobileCardsHtml = filtered
    .map((c, idx) => {
      const { caseNumber, courtName, caseName, nextDateText, isDisposed, isUndated, isUrgent } =
        getCaseCardDisplayData(c);
      const statusCat = getCaseStatusCategory(c);
      const statusPillHtml = getStatusPillHtml(statusCat);
      const newTagHtml = isNewCase(c) ? '<span class="cc-new-badge">NEW</span>' : "";

      let hearingChipHtml = "";
      if (isDisposed) {
        hearingChipHtml = `
        <div class="cc-hearing-chip disposed">
          <i class="fa-solid fa-circle-check"></i>
          <span>${escapeHtml(nextDateText !== "Disposed" ? nextDateText : "Closed")}</span>
        </div>
      `;
      } else if (isUndated) {
        hearingChipHtml = `
        <div class="cc-hearing-chip undated">
          <i class="fa-solid fa-clock-rotate-left"></i>
          <span>Not Scheduled</span>
        </div>
      `;
      } else {
        hearingChipHtml = `
        <div class="cc-hearing-chip ${isUrgent ? "urgent" : ""}">
          <i class="fa-regular fa-calendar"></i>
          <span>${escapeHtml(nextDateText)}</span>
        </div>
        ${c.hearingProcess ? `<span class="cc-hearing-stage" title="${escapeHtml(c.hearingProcess)}">${escapeHtml(c.hearingProcess)}</span>` : ""}
      `;
      }

      return `
      <div class="cc-mobile-card" onclick="openCaseDetailsFullModal('${escapeHtml(caseNumber)}', ${idx})">
        <div class="cc-mc-header">
          <div class="cc-mc-caseno">
            <i class="fa-regular fa-folder" style="color: #0284c7; font-size: 13px;"></i>
            <span>${escapeHtml(caseNumber || "—")}</span>
            ${newTagHtml}
          </div>
          ${statusPillHtml}
        </div>

        <div class="cc-mc-title" title="${escapeHtml(caseName)}">
          ${escapeHtml(caseName)}
        </div>

        <div class="cc-mc-court" title="${escapeHtml(courtName || "—")}">
          <i class="fa-solid fa-building-columns"></i>
          <span>${escapeHtml(courtName || "—")}</span>
        </div>

        <div class="cc-mc-footer">
          <div class="cc-mc-hearing">
            ${hearingChipHtml}
          </div>
          <div class="cc-actions-wrap" onclick="event.stopPropagation()">
            <button type="button" class="cc-action-btn view" onclick="openCaseDetailsFullModal('${escapeHtml(caseNumber)}', ${idx})" title="View Details">
              <i class="fa-solid fa-eye"></i>
            </button>
            <button type="button" class="cc-action-btn edit" onclick="editCaseFromTable('${escapeHtml(caseNumber)}')" title="Edit Case">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button type="button" class="cc-action-btn delete" onclick="deleteCaseCard(${idx})" title="Delete Case">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
      </div>
    `;
    })
    .join("");

  grid.innerHTML = `
    <div class="case-cards-table-container">
      <!-- Table Header Bar -->
      <div class="case-cards-table-header-bar">
        <div class="title-group">
          <div class="title-icon">
            <i class="fa-solid fa-scale-balanced"></i>
          </div>
          <div>
            <h3>All Case Matters</h3>
            <p>Click any case row or action button to review or edit matter proceedings</p>
          </div>
        </div>
        <div style="font-size: 0.82rem; font-weight: 700; color: #0f766e; background: #f0fdf4; border: 1px solid #bbf7d0; padding: 5px 14px; border-radius: 9999px;">
          ${filtered.length} ${filtered.length === 1 ? "Matter" : "Matters"}
        </div>
      </div>

      <!-- Desktop Table View -->
      <div class="case-cards-table-wrap">
        <table class="case-cards-table">
          <thead>
            <tr>
              <th class="cc-col-details">Case Details</th>
              <th class="cc-col-court">Court / Forum</th>
              <th class="cc-col-hearing">Next Hearing</th>
              <th class="cc-col-status">Status</th>
              <th class="cc-col-actions" style="text-align: right;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>

      <!-- Mobile Card View -->
      <div class="case-cards-mobile-view">
        ${mobileCardsHtml}
      </div>
    </div>
  `;
}

async function deleteCaseCard(idx) {
  const c = (caseCardsFilteredList || [])[idx];
  if (!c) return;
  const caseNumber = c.caseNo || c.criminalCaseNumber || "";
  if (!caseNumber) return;

  const { caseName } = getCaseCardDisplayData(c);
  const confirmed = window.confirm(
    `Are you sure you want to permanently delete case "${caseNumber}" (${caseName})? This action cannot be undone.`,
  );
  if (!confirmed) return;

  if (typeof deleteCaseFromSupabase === "function") {
    await deleteCaseFromSupabase(caseNumber);
  } else {
    allCaseRecords = (allCaseRecords || []).filter(
      (item) => (item.caseNo || item.criminalCaseNumber) !== caseNumber,
    );
    if (typeof saveCasesToLocalStorage === "function") saveCasesToLocalStorage();
  }
  if (typeof showCaseBookToast === "function") {
    showCaseBookToast(`Case "${caseNumber}" deleted successfully`);
  }
  renderCaseCards();
  if (typeof refreshAllCaseTables === "function") refreshAllCaseTables();
}

if (typeof deleteCaseCard !== "undefined") window.deleteCaseCard = deleteCaseCard;

function renderAllCasesPaginationControls(totalItems, pageSize, totalPages, currentPage, isAll) {
  const infoEl = document.getElementById("allCasesPaginationInfo");
  const controlsEl = document.getElementById("allCasesPaginationControls");

  if (!infoEl || !controlsEl) return;

  if (totalItems === 0) {
    infoEl.textContent = "Showing 0 to 0 of 0 entries";
    controlsEl.innerHTML = "";
    return;
  }

  const startDisplay = isAll ? 1 : (currentPage - 1) * pageSize + 1;
  const endDisplay = isAll ? totalItems : Math.min(currentPage * pageSize, totalItems);
  const filteredSuffix =
    totalItems !== (allCaseRecords || []).length
      ? ` (filtered from ${(allCaseRecords || []).length} total cases)`
      : "";

  infoEl.textContent = `Showing ${startDisplay} to ${endDisplay} of ${totalItems} entries${filteredSuffix}`;

  if (isAll || totalPages <= 1) {
    controlsEl.innerHTML = "";
    return;
  }

  let html = "";

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  // First and Previous buttons
  html += `<button type="button" class="page-btn" ${isFirst ? "disabled" : ""} onclick="changeAllCasesPage(1)" title="First Page"><iconify-icon icon="lucide:chevrons-left"></iconify-icon></button>`;
  html += `<button type="button" class="page-btn" ${isFirst ? "disabled" : ""} onclick="changeAllCasesPage(${currentPage - 1})" title="Previous Page"><iconify-icon icon="lucide:chevron-left"></iconify-icon> Prev</button>`;

  // Numbered page buttons with smart ellipsis
  const pagesToShow = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pagesToShow.push(i);
  } else {
    pagesToShow.push(1);
    if (currentPage > 4) {
      pagesToShow.push("...");
    }
    const startRange = Math.max(2, currentPage - 1);
    const endRange = Math.min(totalPages - 1, currentPage + 1);
    for (let i = startRange; i <= endRange; i++) {
      if (!pagesToShow.includes(i)) pagesToShow.push(i);
    }
    if (currentPage < totalPages - 3) {
      pagesToShow.push("...");
    }
    if (!pagesToShow.includes(totalPages)) {
      pagesToShow.push(totalPages);
    }
  }

  pagesToShow.forEach((p) => {
    if (p === "...") {
      html += `<span class="page-ellipsis" style="padding: 0 4px; color: #9ca3af; font-weight: 700;">…</span>`;
    } else {
      const isActive = p === currentPage ? " active" : "";
      html += `<button type="button" class="page-btn${isActive}" onclick="changeAllCasesPage(${p})">${p}</button>`;
    }
  });

  // Next and Last buttons
  html += `<button type="button" class="page-btn" ${isLast ? "disabled" : ""} onclick="changeAllCasesPage(${currentPage + 1})" title="Next Page">Next <iconify-icon icon="lucide:chevron-right"></iconify-icon></button>`;
  html += `<button type="button" class="page-btn" ${isLast ? "disabled" : ""} onclick="changeAllCasesPage(${totalPages})" title="Last Page"><iconify-icon icon="lucide:chevrons-right"></iconify-icon></button>`;

  controlsEl.innerHTML = html;
}

function editCaseFromTable(caseNo, caseType, caseId) {
  if (!caseNo || caseNo === "—") return;
  showTab("update");
  const searchInput = document.getElementById("updateSearchInput");
  if (searchInput) searchInput.value = caseNo;
  if (typeof loadCaseForUpdate === "function") {
    loadCaseForUpdate(caseNo, caseType, caseId);
  }
}

function exportAllCasesCsv() {
  const casesToExport =
    currentAllCasesFilteredList && currentAllCasesFilteredList.length > 0
      ? currentAllCasesFilteredList
      : allCaseRecords || [];

  if (casesToExport.length === 0) {
    if (typeof showToast === "function") {
      showToast("No cases available to export.", "error");
    } else {
      alert("No cases available to export.");
    }
    return;
  }

  const headers = [
    "Sr No",
    "Case Number",
    "Case Title / Parties",
    "Case Type",
    "Court / Forum",
    "Client Name",
    "Client Phone",
    "Case Status",
    "Filing Date",
    "Next Hearing Date",
    "Remarks",
  ];

  const escapeCSV = (val) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = casesToExport.map((c, idx) => {
    const caseNo = c.caseNo || c.criminalCaseNumber || "";
    const caseTitle =
      c.caseName ||
      (c.plaintiff
        ? `${c.plaintiff} vs ${c.defendant || ""}`
        : c.accusedName
          ? `State vs ${c.accusedName}`
          : "");
    const rawType = (c.caseType || "civil").toLowerCase();
    const caseType =
      rawType === "state" || rawType === "criminal"
        ? "STATE (CRIMINAL)"
        : rawType.replace("_", " ").toUpperCase();
    const court = c.courtName || c.criminalCourtName || "";
    const client = c.clientName || c.criminalClientName || "";
    const phone = c.clientNumber || c.criminalClientNumber || "";
    const isDisposed = (c.caseStatus || "").toLowerCase().includes("dispose");
    const status = isDisposed ? "Disposed Off" : "Pending";
    const filing = formatDateDMY(c.filingDate || c.crimeFilingDate);
    const hearing = formatDateDMY(c.nextHearing);
    const remark = remarksToPlainText(c.remark || c.remarks);

    return [
      idx + 1,
      escapeCSV(caseNo),
      escapeCSV(caseTitle),
      escapeCSV(caseType),
      escapeCSV(court),
      escapeCSV(client),
      escapeCSV(phone),
      escapeCSV(status),
      escapeCSV(filing),
      escapeCSV(hearing),
      escapeCSV(remark),
    ].join(",");
  });

  const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const today = new Date().toISOString().split("T")[0];
  a.href = url;
  a.download = `All_Cases_Register_${today}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Window exposures
if (typeof updateAllCasesTypePillCounts !== "undefined")
  window.updateAllCasesTypePillCounts = updateAllCasesTypePillCounts;
if (typeof filterAllCasesByType !== "undefined") window.filterAllCasesByType = filterAllCasesByType;
if (typeof window !== "undefined") window.handleAllCasesTypeSelectChange = handleAllCasesTypeSelectChange;
if (typeof global !== "undefined") global.handleAllCasesTypeSelectChange = handleAllCasesTypeSelectChange;
if (typeof resetAllCasesFilters !== "undefined") window.resetAllCasesFilters = resetAllCasesFilters;
if (typeof renderAllCasesTableWithFilters !== "undefined")
  window.renderAllCasesTableWithFilters = renderAllCasesTableWithFilters;
if (typeof handleAllCasesPageSizeChange !== "undefined")
  window.handleAllCasesPageSizeChange = handleAllCasesPageSizeChange;
if (typeof changeAllCasesPage !== "undefined") window.changeAllCasesPage = changeAllCasesPage;
if (typeof renderAllCasesPaginationControls !== "undefined")
  window.renderAllCasesPaginationControls = renderAllCasesPaginationControls;
if (typeof renderCaseCards !== "undefined") window.renderCaseCards = renderCaseCards;
if (typeof setCaseCardsPill !== "undefined") window.setCaseCardsPill = setCaseCardsPill;
if (typeof toggleCaseCard !== "undefined") window.toggleCaseCard = toggleCaseCard;
if (typeof deleteCaseCard !== "undefined") window.deleteCaseCard = deleteCaseCard;
if (typeof toggleCaseCardSection !== "undefined")
  window.toggleCaseCardSection = toggleCaseCardSection;
if (typeof editCaseFromTable !== "undefined") window.editCaseFromTable = editCaseFromTable;
if (typeof exportAllCasesCsv !== "undefined") window.exportAllCasesCsv = exportAllCasesCsv;

function toggleUpcomingCardNote(header) {
  if (!header) return;
  header.classList.toggle('active');
  const body = header.nextElementSibling;
  if (body) {
    body.classList.toggle('show');
  }
}
if (typeof toggleUpcomingCardNote !== "undefined") window.toggleUpcomingCardNote = toggleUpcomingCardNote;

function renderUpcomingWeekHearings() {
  const container = document.getElementById("upcomingWeekContainer");
  const countBadge = document.getElementById("upcomingWeekCount");
  if (!container) return;

  const now = new Date();
  const todayZero = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const in7Days = new Date(todayZero.getTime() + 7 * 24 * 60 * 60 * 1000 + 23 * 60 * 60 * 1000);

  const records =
    typeof allCaseRecords !== "undefined" && Array.isArray(allCaseRecords)
      ? allCaseRecords
      : typeof window !== "undefined" && Array.isArray(window.allCaseRecords)
        ? window.allCaseRecords
        : [];

  const parseFn =
    typeof parseDateString === "function"
      ? parseDateString
      : typeof window !== "undefined" && typeof window.parseDateString === "function"
        ? window.parseDateString
        : (d) => {
            if (!d) return null;
            const dt = new Date(d);
            return isNaN(dt.getTime()) ? null : dt;
          };

  const upcoming = records
    .filter((c) => {
      if (
        !c.nextHearing ||
        c.nextHearing === "—" ||
        c.nextHearing === "null" ||
        !c.nextHearing.trim()
      )
        return false;
      if (typeof isCaseDisposed === 'function' ? isCaseDisposed(c) : (c.caseStatus || "").toLowerCase().includes("dispose")) return false;

      const parsed = parseFn(c.nextHearing);
      if (!parsed) return false;
      const hTime = parsed.getTime();
      return hTime >= todayZero.getTime() && hTime <= in7Days.getTime();
    })
    .sort((a, b) => {
      const da = parseFn(a.nextHearing) || new Date(9999, 11, 31);
      const db = parseFn(b.nextHearing) || new Date(9999, 11, 31);
      return da - db;
    });

  const navBadge = document.getElementById("upcomingNavCount");
  if (navBadge) {
    navBadge.textContent = String(upcoming.length);
  }

  const totalBadge = document.getElementById("upcomingTotalBadge");
  if (totalBadge) {
    totalBadge.textContent = `${upcoming.length} Hearing${upcoming.length === 1 ? "" : "s"} Listed`;
  }

  const chipBadge = document.getElementById("upcomingListedCountChip");
  if (chipBadge) {
    chipBadge.innerHTML = `<i class="fa-solid fa-list-check"></i> ${upcoming.length} Hearing${upcoming.length === 1 ? "" : "s"} Listed`;
  }

  if (countBadge) {
    countBadge.textContent = String(upcoming.length);
  }

  if (upcoming.length === 0) {
    container.innerHTML = `
      <div class="hearing-empty-state-card">
        <div class="hearing-empty-emblem"><i class="fa-solid fa-scale-balanced"></i></div>
        <h3>No Upcoming Hearings</h3>
        <p>Your court docket is completely clear for the next 7 days. No appearances, framing of issues, or evidence proceedings are scheduled.</p>
        <div class="hearing-empty-actions">
          <button type="button" class="primary-btn" onclick="showTab('causelist')" style="padding: 10px 20px; border-radius: 10px;">
            <i class="fa-solid fa-clipboard-list"></i> Daily Cause List
          </button>
          <button type="button" class="secondary-btn" onclick="showTab('calendar')" style="padding: 10px 20px; border-radius: 10px;">
            <i class="fa-regular fa-calendar"></i> Interactive Calendar
          </button>
          <button type="button" class="secondary-btn" onclick="showTab('all')" style="padding: 10px 20px; border-radius: 10px;">
            <i class="fa-solid fa-folder-tree"></i> All Cases
          </button>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = upcoming
    .map((c) => {
      const caseNum = c.caseNo || c.criminalCaseNumber || "—";
      const caseName =
        c.caseName ||
        (c.plaintiff
          ? `${c.plaintiff} vs ${c.defendant || "Opposite"}`
          : `${c.victimName || "State"} vs ${c.accusedName || "Accused"}`) ||
        "—";
      const court = c.courtName || c.criminalCourtName || "District Court";
      const dateFormatted = formatDateDMY(c.nextHearing);
      const stage = c.hearingProcess || c.process || "Scheduled Hearing";
      const clientName = c.clientName || c.criminalClientName || "Client";
      const clientPhone = c.clientNumber || c.criminalClientNumber || "";
      const rawType = (c.caseType || "civil").toLowerCase();
      const typeLabel =
        rawType === "state" || rawType === "criminal"
          ? "CRIMINAL"
          : rawType.replace("_", " ").toUpperCase();
      const remark = c.remark || c.remarks || "";

      const parsedHearing = parseFn(c.nextHearing);
      let daysBadgeClass = "";
      let daysBadgeIcon = "fa-regular fa-calendar";
      let daysLeftText = "Scheduled";
      let isUrgentToday = false;

      if (parsedHearing) {
        const diffTime = parsedHearing.getTime() - todayZero.getTime();
        const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (daysLeft === 0) {
          daysBadgeClass = "today";
          daysBadgeIcon = "fa-solid fa-fire";
          daysLeftText = "Today in Court";
          isUrgentToday = true;
        } else if (daysLeft === 1) {
          daysBadgeClass = "tomorrow";
          daysBadgeIcon = "fa-solid fa-bolt";
          daysLeftText = "Tomorrow";
        } else {
          daysBadgeIcon = "fa-regular fa-clock";
          daysLeftText = `In ${daysLeft} Days`;
        }
      }

      return `
      <div class="legal-hearing-card case-card ${isUrgentToday ? "urgent-today" : ""}">
        <div class="card-header">
          <div class="status-text ${daysBadgeClass}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span>${daysLeftText}</span>
          </div>
          <div class="case-type ${rawType}">
            ${typeLabel}
          </div>
        </div>

        <div class="card-body">
          <div class="badge-row">
            <span class="meta-text"><i class="fa-solid fa-hashtag" style="font-size: 11px;"></i> ${escapeHtml(caseNum)}</span>
            <button type="button" class="dossier-link-btn meta-text" onclick="openCaseHistoryModalByNo('${escapeHtml(caseNum)}')" title="View Complete Case Dossier">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
              Dossier
            </button>
          </div>

          <h2 class="case-title" title="${escapeHtml(caseName)}">${escapeHtml(caseName)}</h2>

          <div class="date-location-row">
            <span class="date-text" title="Next Hearing Date">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              ${dateFormatted}
            </span>
            <span class="location-text" title="${escapeHtml(court)}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              ${escapeHtml(court)}
            </span>
          </div>

          <div class="data-row">
            <span class="data-label">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"></path><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path></svg>
              Stage / Purpose
            </span>
            <span class="data-value highlight-stage" title="${escapeHtml(stage)}">${escapeHtml(stage)}</span>
          </div>

          <div class="data-row">
            <span class="data-label">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              Client
            </span>
            <span class="data-value" title="${escapeHtml(clientName)}">${escapeHtml(clientName)}</span>
          </div>

          ${
            clientPhone
              ? `
          <div class="data-row">
            <span class="data-label">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              Contact
            </span>
            <span class="data-value" style="font-family: monospace;">${escapeHtml(clientPhone)}</span>
          </div>
          `
              : ""
          }

          ${
            remark
              ? `
          <div class="note-box">
            <div class="note-header" onclick="toggleUpcomingCardNote(this)">
              <div class="note-header-left">
                <span class="note-label">Chamber Notes / Remarks</span>
              </div>
              <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
            <div class="note-body">
              <div class="note-names">
                ${remark.split("\n").filter(Boolean).map(line => `<span class="note-name">${escapeHtml(line)}</span>`).join("")}
              </div>
            </div>
          </div>
          `
              : ""
          }
        </div>

        <!-- 🆕 FULL WIDTH 33% BOTTOM NAV -->
        <div class="bottom-nav hearing-card-footer">
          <button type="button" class="nav-btn proceedings hearing-proceedings-btn" onclick="openCaseHistoryModalByNo('${escapeHtml(caseNum)}')" title="View Complete Proceedings & Case Dossier">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            Proceedings
          </button>
          ${
            clientPhone
              ? `
          <a href="tel:${escapeHtml(clientPhone)}" class="nav-btn call hearing-call-cta" title="Call Client directly: ${escapeHtml(clientPhone)}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            Call
          </a>
          `
              : `
          <button type="button" class="nav-btn call hearing-call-cta disabled" title="No client phone number registered" disabled>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
            Call
          </button>
          `
          }
          <button type="button" class="nav-btn notice hearing-whatsapp-cta" onclick="sendWhatsAppHearingNotice('${escapeHtml(caseNum)}')" title="Dispatch WhatsApp reminder to client">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            Notice
          </button>
        </div>
      </div>
    `;
    })
    .join("");
}

if (typeof renderUpcomingWeekHearings !== "undefined")
  window.renderUpcomingWeekHearings = renderUpcomingWeekHearings;
