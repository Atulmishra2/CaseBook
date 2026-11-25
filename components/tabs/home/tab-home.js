window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs["home"] = /* html */ `
<div class="home-dashboard-shell" data-home-scope>
  <!-- 1. Executive Ultra-Compact 1-Line Hero Bar -->
  <header class="home-hero-strip">
    <div class="hero-left">
      <div class="hero-emblem" aria-hidden="true">
        <svg class="lucide lucide-scale" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>
      </div>
      <div class="hero-meta">
        <h1 class="hero-greeting" id="homeHeroGreeting">Good Day, Advocate Atul Mishra</h1>
        <span class="hero-date" id="homeHeroDate">Chambers Legal Practice • Real-Time Case Tracker</span>
      </div>
    </div>
    <div class="hero-actions">
      <button type="button" class="btn-new-case" onclick="showTab('add')" title="File a new case record">
        <svg class="lucide lucide-plus" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
        <span>New Case</span>
      </button>
      <button type="button" class="btn-hero-secondary" onclick="showTab('causelist')" title="Open today's cause list">
        <svg class="lucide lucide-scroll-text" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M15 8h-5"/><path d="M15 12h-5"/></svg>
        <span>Cause List</span>
      </button>
      <button
        type="button"
        class="btn-hero-secondary"
        onclick="if (typeof openForwardDateModal === 'function') openForwardDateModal(); else showTab('hearing');"
        title="Forward next hearing date"
      >
        <svg class="lucide lucide-calendar-plus" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M10 16h4"/><path d="M12 14v4"/></svg>
        <span>Forward Date</span>
      </button>
    </div>
  </header>

  <!-- 2. Four Core Operational Metric Cards -->
  <section class="home-metrics-grid" aria-label="Practice Metrics">
    <!-- Card 1: Today's Listed Cases -->
    <div class="metric-card metric-today hoverable" onclick="showTab('causelist', event)" title="View today's court appearances">
      <div class="metric-top">
        <span class="metric-label">Today's Court Cases</span>
        <div class="metric-icon-wrap icon-today">
          <iconify-icon icon="lucide:gavel"></iconify-icon>
        </div>
      </div>
      <div class="metric-value-row">
        <span class="metric-val" id="homeTodayCases">0</span>
        <span class="metric-badge badge-today"><span class="pulse-dot"></span>Live Today</span>
      </div>
      <div class="metric-subtext">Matters listed for today's court session</div>
    </div>

    <!-- Card 2: Upcoming Hearings (7 Days) -->
    <div class="metric-card metric-upcoming hoverable" onclick="showTab('upcoming', event)" title="View upcoming 7-day schedule">
      <div class="metric-top">
        <span class="metric-label">Upcoming Hearings</span>
        <div class="metric-icon-wrap icon-upcoming">
          <iconify-icon icon="lucide:calendar-clock"></iconify-icon>
        </div>
      </div>
      <div class="metric-value-row">
        <span class="metric-val" id="homeUpcomingCases">0</span>
        <span class="metric-badge badge-upcoming">Next 7 Days</span>
      </div>
      <div class="metric-subtext">Hearings scheduled in upcoming week</div>
    </div>

    <!-- Card 3: Active Pending Cases -->
    <div class="metric-card metric-pending hoverable" onclick="showTab('all', event)" title="View all active cases">
      <div class="metric-top">
        <span class="metric-label">Active Pending Cases</span>
        <div class="metric-icon-wrap icon-pending">
          <iconify-icon icon="lucide:folder-open"></iconify-icon>
        </div>
      </div>
      <div class="metric-value-row">
        <span class="metric-val" id="homePendingCases">0</span>
        <span class="metric-badge badge-pending" id="homePendingPercent">0% Active</span>
      </div>
      <div class="metric-subtext" id="homePortfolioBreakdown">
        <span>0 Civil • 0 Criminal • 0 Revenue</span>
      </div>
    </div>

    <!-- Card 4: Needs Date (Undated Priority) -->
    <div
      class="metric-card metric-undated hoverable"
      onclick="showTab('all', event); setTimeout(() => { if (typeof setAllCasesStatusFilter === 'function') setAllCasesStatusFilter('undated'); }, 50);"
      title="View cases awaiting next hearing date"
    >
      <div class="metric-top">
        <span class="metric-label">Needs Date (Undated)</span>
        <div class="metric-icon-wrap icon-undated">
          <iconify-icon icon="lucide:alert-circle"></iconify-icon>
        </div>
      </div>
      <div class="metric-value-row">
        <span class="metric-val" id="homeUndatedCases">0</span>
        <span class="metric-badge badge-undated">Priority Action</span>
      </div>
      <div class="metric-subtext">Cases awaiting hearing date fixture</div>
    </div>
  </section>

  <!-- 3. Asymmetric Workstation (65% Today's Court Docket / 35% Priority Tasks) -->
  <main class="home-workspace-grid">
    <!-- Section A: 65% Today's Court Appearance Docket (Table List View) -->
    <div class="home-panel-card docket-panel">
      <div class="panel-header">
        <div class="panel-title-wrap">
          <div class="panel-icon-box icon-docket">
            <iconify-icon icon="lucide:scale"></iconify-icon>
          </div>
          <div>
            <h2 class="panel-title">Today's Court Appearance</h2>
            <span class="panel-caption" id="homeTodayBoardDate">Daily Judicial Listings &amp; Sittings</span>
          </div>
        </div>
        <button type="button" class="panel-btn-action" id="openListBtn" onclick="if (typeof openTodayListModal === 'function') openTodayListModal(); else if (typeof window !== 'undefined' && typeof window.openTodayListModal === 'function') window.openTodayListModal();" title="Open Daily Cause List">
          <iconify-icon icon="lucide:list-checks"></iconify-icon>
          <span>Open List</span>
        </button>
      </div>

      <!-- Docket Table Header -->
      <div id="homeDocketTableHead" class="docket-table-head" aria-hidden="true">
        <span class="col-idx">#</span>
        <span class="col-caseno">Case No &amp; Type</span>
        <span class="col-parties">Cause Title (Parties)</span>
        <span class="col-court">Court / Bench</span>
        <span class="col-stage">Stage</span>
        <span class="col-actions">Actions</span>
      </div>

      <!-- Empty State (Shown when 0 appearances today) -->
      <div id="homeTodayEmptyState" class="docket-empty-state" style="display: none;">
        <div class="empty-icon-wrap">
          <iconify-icon icon="lucide:check-circle-2"></iconify-icon>
        </div>
        <h3 class="empty-title">No court appearances listed for today</h3>
        <p class="empty-caption">Your daily judicial docket is clear. You can review upcoming hearings or prepare files.</p>
        <button type="button" class="btn-empty-action" onclick="showTab('upcoming')">
          <iconify-icon icon="lucide:calendar-clock"></iconify-icon>
          <span>View Upcoming Schedule</span>
        </button>
      </div>

      <!-- Active Judicial Table List Container -->
      <div id="homeTodayListWrapper" class="docket-list-body">
        <div class="docket-loading-state">
          <iconify-icon icon="lucide:loader-2" class="animate-spin"></iconify-icon>
          <span>Loading today's listed court matters...</span>
        </div>
      </div>
    </div>

    <!-- Section B: 35% Today's Priority Deadlines & Action Items -->
    <div class="home-panel-card tasks-panel">
      <div class="panel-header">
        <div class="panel-title-wrap">
          <div class="panel-icon-box icon-tasks">
            <iconify-icon icon="lucide:check-square"></iconify-icon>
          </div>
          <div>
            <h2 class="panel-title">Priority Tasks &amp; Deadlines</h2>
            <span class="panel-caption" id="homeTasksFooterStatus">Chambers Action Items</span>
          </div>
        </div>
        <button type="button" class="panel-btn-action" onclick="showTab('todo')" title="Manage all tasks">
          <span>All Tasks</span>
          <iconify-icon icon="lucide:arrow-right"></iconify-icon>
        </button>
      </div>

      <div id="homeTasksListContainer" class="tasks-list-body">
        <div class="tasks-loading-state">
          <iconify-icon icon="lucide:loader-2" class="animate-spin"></iconify-icon>
          <span>Loading tasks...</span>
        </div>
      </div>

      <div class="tasks-panel-footer">
        <button type="button" class="btn-add-task-quick" onclick="showTab('todo')">
          <iconify-icon icon="lucide:plus"></iconify-icon>
          <span>Add New Chambers Task</span>
        </button>
      </div>
    </div>
  </main>

  <!-- Hidden Compatibility Bridge (Ensures complete JS hooks work with 0 errors) -->
  <div style="display: none !important;" aria-hidden="true">
    <span id="homeTotalCases">0</span>
    <span id="homeDisposedCases">0</span>
    <span id="homeDisposedPercent">0%</span>
    <span id="shortcutCivilCount">0</span>
    <span id="shortcutCriminalCount">0</span>
    <span id="shortcutRevenueCount">0</span>
    <span id="shortcutAccountsToday">0</span>
    <span id="undatedGraphTotal">0</span>
    <span id="undatedCivilCount">0</span>
    <span id="undatedCriminalCount">0</span>
    <span id="undatedRevenueCount">0</span>
    <div id="undatedCivilBar"></div>
    <div id="undatedCriminalBar"></div>
    <div id="undatedRevenueBar"></div>
    <span id="undatedVerticalCivilValue">0</span>
    <span id="undatedVerticalCriminalValue">0</span>
    <span id="undatedVerticalRevenueValue">0</span>
    <div id="undatedVerticalCivilBar"></div>
    <div id="undatedVerticalCriminalBar"></div>
    <div id="undatedVerticalRevenueBar"></div>
    <svg>
      <circle id="donutSegmentCivil"></circle>
      <circle id="donutSegmentCriminal"></circle>
      <circle id="donutSegmentRevenue"></circle>
    </svg>
    <span id="undatedFooterNotice"></span>
    <div id="homeTasksFooter"></div>
    <div id="homeKpiCarouselIndicator"></div>
    <span id="homeKpiCarouselCounter"></span>
  </div>

  <!-- Today's Court Appearance Modal Overlay (Daily Cause List) -->
  <div id="homeTodayListModal" class="home-today-modal-overlay hidden" aria-hidden="true" role="dialog" aria-labelledby="todayModalTitle">
    <div class="home-today-modal-card">
      <!-- Modal Header -->
      <div class="home-today-modal-header">
        <div class="modal-title-box">
          <iconify-icon icon="lucide:list-checks"></iconify-icon>
          <h3 id="todayModalTitle">Daily Cause List</h3>
        </div>
        <button type="button" id="closeModalBtn" class="home-today-modal-close-btn" onclick="if (typeof closeTodayListModal === 'function') closeTodayListModal(); else if (typeof window !== 'undefined' && typeof window.closeTodayListModal === 'function') window.closeTodayListModal();" aria-label="Close modal">
          <iconify-icon icon="lucide:x"></iconify-icon>
        </button>
      </div>

      <!-- Modal Body (Scrollable List) -->
      <div class="home-today-modal-body" id="homeTodayModalListItems">
        <!-- Dynamically populated today's cases -->
      </div>

      <!-- Modal Footer -->
      <div class="home-today-modal-footer">
        <p id="todayListModalCount">Showing 0 cases listed today.</p>
        <button type="button" class="btn-modal-causelist" onclick="closeTodayListModal(); showTab('causelist');">
          <span>Open Full Cause List</span>
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
    todayBoardDate.textContent = `Appearances for ${dayName.split(" ")[0]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

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
  const todayBoundaryISO = typeof getTodayDateString === "function" ? getTodayDateString() : toISODate(new Date());
  const undatedCount = allCaseRecords.filter((c) => {
    if ((c.caseStatus || "").toLowerCase().includes("dispose")) return false; // disposed = closed, not undated
    const nh = c.nextHearing;
    if (!nh || nh === "—" || nh === "null" || !String(nh).trim()) return true;
    const iso = toISODate(nh);
    return !iso || iso < todayBoundaryISO;
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
    return !iso || iso < todayBoundaryISO;
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
  const docketTableHead = document.getElementById("homeDocketTableHead");
  if (todayCases.length === 0) {
    if (docketTableHead) {
      docketTableHead.style.setProperty("display", "none", "important");
    }
    if (todayEmptyState) {
      todayEmptyState.style.setProperty("display", "flex", "important");
      todayEmptyState.classList.remove("is-hidden");
    }
    if (todayListWrapper) {
      todayListWrapper.style.setProperty("display", "none", "important");
      todayListWrapper.classList.add("is-hidden");
    }
  } else {
    if (docketTableHead) {
      docketTableHead.style.removeProperty("display");
    }
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

    window.__todayListedCases = todayCases;

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
        <div class="docket-row" data-case-no="${escapeHtml(caseNumber)}">
          <!-- 1. Desktop Tabular View (Min-width: 681px) -->
          <div class="docket-table-view">
            <span class="row-idx">#${idx + 1}</span>
            <div class="row-case-group">
              <span class="row-caseno" title="${escapeHtml(caseNumber)}">${escapeHtml(caseNumber)}</span>
            </div>
            <div class="row-parties">
              <span class="parties-title" title="${escapeHtml(caseName)}">${escapeHtml(caseName)}</span>
            </div>
            <div class="row-court" title="${escapeHtml(courtName)}">
              <iconify-icon icon="lucide:landmark" style="font-size:12px;"></iconify-icon>
              <span>${escapeHtml(courtName)}</span>
            </div>
            <div class="stage-badge" title="${escapeHtml(stage)}">
              ${escapeHtml(stage)}
            </div>
            <div class="row-actions">
              <button type="button" class="docket-act-btn forward" onclick="openUpdateHearingForCase('${escapeHtml(caseNumber)}')" title="Forward next hearing date">
                <iconify-icon icon="lucide:calendar-plus"></iconify-icon>
              </button>
              ${clientPhone ? `<a href="tel:${escapeHtml(clientPhone)}" class="docket-act-btn" title="Call client: ${escapeHtml(clientPhone)}"><iconify-icon icon="lucide:phone"></iconify-icon></a>` : ""}
              <button type="button" class="docket-act-btn whatsapp" onclick="sendWhatsAppHearingNotice('${escapeHtml(caseNumber)}')" title="WhatsApp notice to client">
                <iconify-icon icon="lucide:message-circle"></iconify-icon>
              </button>
              <button type="button" class="docket-act-btn" onclick="if (typeof openCaseDetailsFullModal === 'function') openCaseDetailsFullModal('${escapeHtml(caseNumber)}'); else if (typeof openCaseHistoryModalByNo === 'function') openCaseHistoryModalByNo('${escapeHtml(caseNumber)}');" title="View proceedings history">
                <iconify-icon icon="lucide:file-text"></iconify-icon>
              </button>
            </div>
          </div>

          <!-- 2. Mobile Modern Card View (Max-width: 680px) -->
          <div class="docket-card-view home-today-card">
            <!-- Top Row -->
            <div class="docket-card-top">
              <div class="docket-meta-left">
                <span class="row-idx">#${idx + 1}</span>
                <span class="row-caseno" title="${escapeHtml(caseNumber)}">${escapeHtml(caseNumber)}</span>
                <span class="case-type-badge ${caseType}">${escapeHtml(caseType)}</span>
              </div>
              <div class="docket-card-menu-wrap">
                <button type="button" class="docket-card-menu-btn" onclick="if (typeof toggleDocketCardMenu === 'function') toggleDocketCardMenu(event, '${escapeHtml(caseNumber)}'); else if (typeof window !== 'undefined' && typeof window.toggleDocketCardMenu === 'function') window.toggleDocketCardMenu(event, '${escapeHtml(caseNumber)}');" title="More actions" aria-label="More actions for case ${escapeHtml(caseNumber)}">
                  <iconify-icon icon="lucide:more-vertical"></iconify-icon>
                </button>
                <div class="docket-card-menu-dropdown">
                  <button type="button" class="docket-menu-item" onclick="sendWhatsAppHearingNotice('${escapeHtml(caseNumber)}')">
                    <iconify-icon icon="lucide:message-circle"></iconify-icon>
                    <span>WhatsApp Notice</span>
                  </button>
                  ${clientPhone ? `
                  <a href="tel:${escapeHtml(clientPhone)}" class="docket-menu-item">
                    <iconify-icon icon="lucide:phone"></iconify-icon>
                    <span>Call Client (${escapeHtml(clientPhone)})</span>
                  </a>` : ""}
                  <button type="button" class="docket-menu-item" onclick="navigator.clipboard?.writeText('${escapeHtml(caseNumber)}'); if (typeof showToast === 'function') showToast('Case number copied!');">
                    <iconify-icon icon="lucide:copy"></iconify-icon>
                    <span>Copy Case Number</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Middle Row (Title & Subtitle) -->
            <div class="docket-card-middle">
              <h3 class="parties-title" title="${escapeHtml(caseName)}">${escapeHtml(caseName)}</h3>
              <div class="docket-subrow">
                <span class="row-court" title="${escapeHtml(courtName)}">
                  <iconify-icon icon="lucide:landmark"></iconify-icon>
                  <span>${escapeHtml(courtName)}</span>
                </span>
                <span class="stage-badge" title="${escapeHtml(stage)}">${escapeHtml(stage)}</span>
              </div>
            </div>

            <!-- Divider -->
            <hr class="docket-card-divider" />

            <!-- Bottom Row (Contact & Actions) -->
            <div class="docket-card-bottom">
              <div class="client-meta" title="Client: ${escapeHtml(clientName)}">
                <iconify-icon icon="lucide:user"></iconify-icon>
                <span class="client-info-text">
                  <span class="client-name">${escapeHtml(clientName)}</span>
                  ${clientPhone ? `<span class="client-sep">•</span><a href="tel:${escapeHtml(clientPhone)}" class="client-phone" onclick="event.stopPropagation()">${escapeHtml(clientPhone)}</a>` : ""}
                </span>
              </div>

              <!-- Action Buttons -->
              <div class="docket-card-actions home-today-card-actions">
                <button type="button" class="act-btn docket-btn-details" onclick="if (typeof openCaseDetailsFullModal === 'function') openCaseDetailsFullModal('${escapeHtml(caseNumber)}'); else if (typeof openCaseHistoryModalByNo === 'function') openCaseHistoryModalByNo('${escapeHtml(caseNumber)}');" title="View Details">
                  Details
                </button>
                <button type="button" class="act-btn docket-btn-forward" onclick="if (typeof openUpdateHearingForCase === 'function') openUpdateHearingForCase('${escapeHtml(caseNumber)}'); else if (typeof window !== 'undefined' && typeof window.openUpdateHearingForCase === 'function') window.openUpdateHearingForCase('${escapeHtml(caseNumber)}');" title="Forward Hearing Date">
                  Forward
                </button>
              </div>
            </div>
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
        footerStatusEl.innerHTML = `<strong>${pendingTasks.length}</strong> Pending Active${urgentCount > 0 ? ` • <span>${urgentCount} Urgent</span>` : ""}`;
      }
    }

    if (pendingTasks.length === 0) {
      tasksContainer.innerHTML = `
        <div class="home-empty-tasks">
          <div class="empty-task-icon-wrap">
            <iconify-icon icon="lucide:check-circle-2"></iconify-icon>
          </div>
          <p class="empty-task-title">All tasks and deadlines are up-to-date.</p>
          <span class="empty-task-sub">No pending tasks or urgent action items for today.</span>
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
          <div class="task-row-card ${priorityClass}">
            <div class="task-info-group">
              <span class="task-title-text" title="${escapeHtml(t.taskTitle || t.task || "Legal Action")}">${escapeHtml(t.taskTitle || t.task || "Legal Action")}</span>
              <span class="task-meta-text">Case: <strong>${escapeHtml(t.caseNo || "General")}</strong> • Due: ${formatDateDMY(t.deadlineDate || t.deadline)}</span>
            </div>
            <button type="button" class="task-manage-btn" onclick="showTab('todo')" title="Manage task">
              <iconify-icon icon="lucide:arrow-right"></iconify-icon>
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

  if (typeof initHomeKpiCarouselController === "function") {
    initHomeKpiCarouselController();
  }
}

// ==============================================================================
// Today's Court Appearance Modal & Card Actions
// ==============================================================================

function openTodayListModal() {
  const modal = document.getElementById("homeTodayListModal");
  if (!modal) return;
  const listContainer = document.getElementById("homeTodayModalListItems");
  const countEl = document.getElementById("todayListModalCount");
  const cases = window.__todayListedCases || [];

  if (countEl) {
    countEl.textContent = `Showing ${cases.length} of ${cases.length} cases listed today.`;
  }

  if (listContainer) {
    if (cases.length === 0) {
      listContainer.innerHTML = `
        <div class="docket-empty-state" style="padding: 24px 12px;">
          <div class="empty-icon-wrap" style="width: 40px; height: 40px; font-size: 18px;">
            <iconify-icon icon="lucide:check-circle-2"></iconify-icon>
          </div>
          <h4 class="empty-title" style="font-size: 13px;">No court appearances listed for today</h4>
          <p class="empty-caption" style="font-size: 11px;">Your daily judicial docket is clear.</p>
        </div>
      `;
    } else {
      let modalHtml = "";
      cases.forEach((c) => {
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
        const hearingTime = c.hearingTime || c.time || "10:30 AM";

        modalHtml += `
          <div class="today-modal-item" onclick="closeTodayListModal(); if (typeof openCaseDetailsFullModal === 'function') openCaseDetailsFullModal('${escapeHtml(caseNumber)}'); else if (typeof openCaseHistoryModalByNo === 'function') openCaseHistoryModalByNo('${escapeHtml(caseNumber)}');" tabindex="0" role="button">
            <div class="today-modal-item-top">
              <span class="today-modal-caseno ${caseType}">${escapeHtml(caseNumber)}</span>
              <span class="today-modal-time">
                <iconify-icon icon="lucide:clock"></iconify-icon>
                <span>${escapeHtml(hearingTime)}</span>
              </span>
            </div>
            <h4 class="today-modal-parties">${escapeHtml(caseName)}</h4>
            <p class="today-modal-court">${escapeHtml(courtName)} • ${escapeHtml(stage)}</p>
          </div>
        `;
      });
      listContainer.innerHTML = modalHtml;
    }
  }

  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
}

function closeTodayListModal() {
  const modal = document.getElementById("homeTodayListModal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
}

function toggleDocketCardMenu(event, caseNo) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }
  const btn = event?.currentTarget;
  const menu = btn?.nextElementSibling;
  document.querySelectorAll(".docket-card-menu-dropdown.active").forEach((el) => {
    if (el !== menu) {
      el.classList.remove("active");
    }
  });
  if (menu && menu.classList.contains("docket-card-menu-dropdown")) {
    menu.classList.toggle("active");
  }
}

if (typeof window !== "undefined") {
  window.openTodayListModal = openTodayListModal;
  window.closeTodayListModal = closeTodayListModal;
  window.toggleDocketCardMenu = toggleDocketCardMenu;

  // Backdrop click & Escape key listeners
  if (!window.__docketModalListenersBound) {
    window.__docketModalListenersBound = true;
    document.addEventListener("click", (e) => {
      const modal = document.getElementById("homeTodayListModal");
      if (modal && !modal.classList.contains("hidden") && e.target === modal) {
        closeTodayListModal();
      }
      if (!e.target.closest(".docket-card-menu-wrap")) {
        document.querySelectorAll(".docket-card-menu-dropdown.active").forEach((el) => {
          el.classList.remove("active");
        });
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".docket-card-menu-dropdown.active").forEach((el) => {
          el.classList.remove("active");
        });
        const modal = document.getElementById("homeTodayListModal");
        if (modal && !modal.classList.contains("hidden")) {
          closeTodayListModal();
        }
      }
    });
  }
}

function initHomeKpiCarouselController() {
  const row = document.querySelector("#home .kpi-materialize-row");
  const indicator = document.getElementById("homeKpiCarouselIndicator");
  if (!row || !indicator) return;

  const dots = indicator.querySelectorAll(".kpi-dot");
  const counter = document.getElementById("homeKpiCarouselCounter");
  const cols = row.querySelectorAll(".col");
  if (!cols.length) return;

  if (row.dataset.carouselBound === "true") return;
  row.dataset.carouselBound = "true";

  let ticking = false;
  row.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollLeft = row.scrollLeft;
          const firstCol = cols[0];
          const colWidth = (firstCol ? firstCol.getBoundingClientRect().width : 260) + 12;
          const activeIdx = Math.min(
            cols.length - 1,
            Math.max(0, Math.round(scrollLeft / colWidth)),
          );

          dots.forEach((dot, idx) => {
            dot.classList.toggle("active", idx === activeIdx);
          });
          if (counter) {
            counter.textContent = `${activeIdx + 1} of ${cols.length}`;
          }
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true },
  );

  dots.forEach((dot, idx) => {
    dot.addEventListener("click", (e) => {
      e.stopPropagation();
      if (cols[idx]) {
        cols[idx].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
      }
    });
  });
}
if (typeof initHomeKpiCarouselController !== "undefined")
  window.initHomeKpiCarouselController = initHomeKpiCarouselController;

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
        ? '<span class="status-badge disposed"><iconify-icon icon="lucide:check-circle-2"></iconify-icon> Disposed</span>'
        : '<span class="status-badge pending"><iconify-icon icon="lucide:clock"></iconify-icon> Pending</span>';

      const partiesRemark = item.remark || item.remarks || "";
      const partiesRemarkHtml = renderCaseTableRemarks(partiesRemark, caseNumber, caseName);

      const disposalComment = item.disposalComment || item.disposal_comment || "";
      const disposalCommentHtml = disposalComment
        ? `<span class="case-disposal-clamp" title="${escapeHtml(disposalComment)}"><iconify-icon icon="lucide:scale"></iconify-icon> ${escapeHtml(disposalComment)}</span>`
        : isDisposed && remarksToPlainText(partiesRemark)
          ? `<span class="case-disposal-clamp" title="${escapeHtml(remarksToPlainText(partiesRemark))}"><iconify-icon icon="lucide:scale"></iconify-icon> ${escapeHtml(remarksToPlainText(partiesRemark))}</span>`
          : '<span>—</span>';

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
        <td class="table-actions-td">
          <button type="button" class="table-view-btn edit-case-btn" onclick="editCaseFromTable('${escapeHtml(caseNumber)}')" title="Edit / Update Case"><iconify-icon icon="lucide:pencil"></iconify-icon><span class="btn-text"> Edit</span></button>
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
        ? '<span class="status-badge disposed"><iconify-icon icon="lucide:check-circle-2"></iconify-icon> Disposed</span>'
        : '<span class="status-badge pending"><iconify-icon icon="lucide:clock"></iconify-icon> Pending</span>';
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
        ? `<span class="case-disposal-clamp" title="${escapeHtml(disposalComment)}"><iconify-icon icon="lucide:scale"></iconify-icon> ${escapeHtml(disposalComment)}</span>`
        : isDisposed && remarksToPlainText(partiesRemark)
          ? `<span class="case-disposal-clamp" title="${escapeHtml(remarksToPlainText(partiesRemark))}"><iconify-icon icon="lucide:scale"></iconify-icon> ${escapeHtml(remarksToPlainText(partiesRemark))}</span>`
          : '<span>—</span>';

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
        <td class="table-actions-td">
          <button type="button" class="table-view-btn edit-case-btn" onclick="editCaseFromTable('${escapeHtml(caseNumber)}')" title="Edit / Update Case"><iconify-icon icon="lucide:pencil"></iconify-icon><span class="btn-text"> Edit</span></button>
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
              ? '<span class="status-badge disposed"><iconify-icon icon="lucide:check-circle-2"></iconify-icon> Disposed</span>'
              : '<span class="status-badge pending"><iconify-icon icon="lucide:clock"></iconify-icon> Pending</span>';
            const partiesRemark = c.remark || c.remarks || "";
            const caseNumber = c.caseNo || "—";
            const caseName = c.caseName || `${c.petitioner} vs ${c.respondent}`;
            const partiesRemarkHtml = renderCaseTableRemarks(partiesRemark, caseNumber, caseName);
            const disposalComment = c.disposalComment || c.disposal_comment || "";
            const disposalCommentHtml = disposalComment
              ? `<span class="case-disposal-clamp" title="${escapeHtml(disposalComment)}"><iconify-icon icon="lucide:scale"></iconify-icon> ${escapeHtml(disposalComment)}</span>`
              : isDisposed && remarksToPlainText(partiesRemark)
                ? `<span class="case-disposal-clamp" title="${escapeHtml(remarksToPlainText(partiesRemark))}"><iconify-icon icon="lucide:scale"></iconify-icon> ${escapeHtml(remarksToPlainText(partiesRemark))}</span>`
                : '<span>—</span>';

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
            <td class="table-actions-td">
              <button type="button" class="table-view-btn edit-case-btn" onclick="editCaseFromTable('${escapeHtml(caseNumber)}')" title="Edit / Update Case"><iconify-icon icon="lucide:pencil"></iconify-icon><span class="btn-text"> Edit</span></button>
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
              ? '<span class="status-badge disposed"><iconify-icon icon="lucide:check-circle-2"></iconify-icon> Disposed</span>'
              : '<span class="status-badge pending"><iconify-icon icon="lucide:clock"></iconify-icon> Pending</span>';
            const partiesRemark = c.remark || c.remarks || "";
            const caseNumber = c.caseNo || "—";
            const caseName = c.caseName || `${c.applicant} vs ${c.oppositeParty}`;
            const partiesRemarkHtml = renderCaseTableRemarks(partiesRemark, caseNumber, caseName);
            const disposalComment = c.disposalComment || c.disposal_comment || "";
            const disposalCommentHtml = disposalComment
              ? `<span class="case-disposal-clamp" title="${escapeHtml(disposalComment)}"><iconify-icon icon="lucide:scale"></iconify-icon> ${escapeHtml(disposalComment)}</span>`
              : isDisposed && remarksToPlainText(partiesRemark)
                ? `<span class="case-disposal-clamp" title="${escapeHtml(remarksToPlainText(partiesRemark))}"><iconify-icon icon="lucide:scale"></iconify-icon> ${escapeHtml(remarksToPlainText(partiesRemark))}</span>`
                : '<span>—</span>';

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
            <td class="table-actions-td">
              <button type="button" class="table-view-btn edit-case-btn" onclick="editCaseFromTable('${escapeHtml(caseNumber)}')" title="Edit / Update Case"><iconify-icon icon="lucide:pencil"></iconify-icon><span class="btn-text"> Edit</span></button>
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
              ? '<span class="status-badge disposed"><iconify-icon icon="lucide:check-circle-2"></iconify-icon> Disposed</span>'
              : '<span class="status-badge pending"><iconify-icon icon="lucide:clock"></iconify-icon> Pending</span>';
            const partiesRemark = c.remark || c.remarks || "";
            const caseNumber = c.caseNo || "—";
            const caseName = c.caseName || `${c.applicant} vs ${c.oppositeParty}`;
            const partiesRemarkHtml = renderCaseTableRemarks(partiesRemark, caseNumber, caseName);
            const disposalComment = c.disposalComment || c.disposal_comment || "";
            const disposalCommentHtml = disposalComment
              ? `<span class="case-disposal-clamp" title="${escapeHtml(disposalComment)}"><iconify-icon icon="lucide:scale"></iconify-icon> ${escapeHtml(disposalComment)}</span>`
              : isDisposed && remarksToPlainText(partiesRemark)
                ? `<span class="case-disposal-clamp" title="${escapeHtml(remarksToPlainText(partiesRemark))}"><iconify-icon icon="lucide:scale"></iconify-icon> ${escapeHtml(remarksToPlainText(partiesRemark))}</span>`
                : '<span>—</span>';

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
            <td class="table-actions-td">
              <button type="button" class="table-view-btn edit-case-btn" onclick="editCaseFromTable('${escapeHtml(caseNumber)}')" title="Edit / Update Case"><iconify-icon icon="lucide:pencil"></iconify-icon><span class="btn-text"> Edit</span></button>
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
              ? '<span class="status-badge disposed"><iconify-icon icon="lucide:check-circle-2"></iconify-icon> Disposed</span>'
              : '<span class="status-badge pending"><iconify-icon icon="lucide:clock"></iconify-icon> Pending</span>';
            const partiesRemark = c.remark || c.remarks || "";
            const caseNumber = c.caseNo || "—";
            const caseName = c.caseName || `${c.applicant} vs ${c.oppositeParty}`;
            const partiesRemarkHtml = renderCaseTableRemarks(partiesRemark, caseNumber, caseName);
            const disposalComment = c.disposalComment || c.disposal_comment || "";
            const disposalCommentHtml = disposalComment
              ? `<span class="case-disposal-clamp" title="${escapeHtml(disposalComment)}"><iconify-icon icon="lucide:scale"></iconify-icon> ${escapeHtml(disposalComment)}</span>`
              : isDisposed && remarksToPlainText(partiesRemark)
                ? `<span class="case-disposal-clamp" title="${escapeHtml(remarksToPlainText(partiesRemark))}"><iconify-icon icon="lucide:scale"></iconify-icon> ${escapeHtml(remarksToPlainText(partiesRemark))}</span>`
                : '<span>—</span>';

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
            <td class="table-actions-td">
              <button type="button" class="table-view-btn edit-case-btn" onclick="editCaseFromTable('${escapeHtml(caseNumber)}')" title="Edit / Update Case"><iconify-icon icon="lucide:pencil"></iconify-icon><span class="btn-text"> Edit</span></button>
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
              ? '<span class="status-badge disposed"><iconify-icon icon="lucide:check-circle-2"></iconify-icon> Disposed</span>'
              : '<span class="status-badge pending"><iconify-icon icon="lucide:clock"></iconify-icon> Pending</span>';
            const partiesRemark = c.remark || c.remarks || "";
            const caseNumber = c.caseNo || "—";
            const caseName = c.caseName || `${c.complainant} vs ${c.accusedName}`;
            const partiesRemarkHtml = renderCaseTableRemarks(partiesRemark, caseNumber, caseName);
            const disposalComment = c.disposalComment || c.disposal_comment || "";
            const disposalCommentHtml = disposalComment
              ? `<span class="case-disposal-clamp" title="${escapeHtml(disposalComment)}"><iconify-icon icon="lucide:scale"></iconify-icon> ${escapeHtml(disposalComment)}</span>`
              : isDisposed && remarksToPlainText(partiesRemark)
                ? `<span class="case-disposal-clamp" title="${escapeHtml(remarksToPlainText(partiesRemark))}"><iconify-icon icon="lucide:scale"></iconify-icon> ${escapeHtml(remarksToPlainText(partiesRemark))}</span>`
                : '<span>—</span>';

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
            <td class="table-actions-td">
              <button type="button" class="table-view-btn edit-case-btn" onclick="editCaseFromTable('${escapeHtml(caseNumber)}')" title="Edit / Update Case"><iconify-icon icon="lucide:pencil"></iconify-icon><span class="btn-text"> Edit</span></button>
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
                ? `<span class="case-disposal-clamp" data-remarks-tooltip="${escapeHtml(disposalComment)}" data-remarks-title="Disposal Note &amp; Judgment" data-case-no="${escapeHtml(caseNumber)}"><iconify-icon icon="lucide:scale"></iconify-icon>${escapeHtml(disposalComment)}</span>`
                : '<span>—</span>';
              const dateHtml = formattedDisposalDate
                ? `<iconify-icon icon="lucide:calendar-check-2"></iconify-icon>${escapeHtml(formattedDisposalDate)}`
                : '<span>—</span>';

              return `
            <tr class="disposed-row-clickable" onclick="openCaseDetailsFullModal('${escapeHtml(caseNumber)}', null, '${escapeHtml(c.caseType || c.case_type || '')}', '${escapeHtml(c.id || '')}')" title="Click to view Case Dossier">
              <td class="case-number-cell">${caseNumberDisplay}</td>
              <td class="case-name-cell">${escapeHtml(caseName)}</td>
              <td class="case-court-cell">${escapeHtml(courtName)}</td>
              <td class="case-date-cell">${dateHtml}</td>
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
                ? `<span class="undated-overdue-chip" title="Hearing date passed — not yet forwarded"><iconify-icon icon="lucide:history"></iconify-icon> ${formatDateDMY(nextISO)}</span>`
                : formatDateDMY(nextISO)
              : '<span class="undated-never-chip"><iconify-icon icon="lucide:help-circle"></iconify-icon> Never dated</span>';
            return `
          <tr>
            <td><strong>${escapeHtml(caseNumber)}</strong></td>
            <td>${escapeHtml(caseName)}</td>
            <td>${escapeHtml(c.clientName || c.criminalClientName || "—")}</td>
            <td><span class="case-badge ${c.caseType || "civil"}">${(c.caseType || "Civil").toUpperCase()}</span></td>
            <td>${escapeHtml(c.courtName || c.criminalCourtName || "District Court")}</td>
            <td>${formatDateDMY(c.filingDate || c.crimeFilingDate)}</td>
            <td>${dateCell}</td>
            <td class="table-actions-td">
              <div>
                <button type="button" class="table-view-btn update-hearing-btn" onclick="openUpdateHearingForCase('${escapeHtml(caseNumber)}')" title="Forward Hearing Date">
                  <iconify-icon icon="lucide:calendar-plus"></iconify-icon><span class="btn-text"> Date</span>
                </button>
                <button type="button" class="table-view-btn edit-case-btn" onclick="editCaseFromTable('${escapeHtml(caseNumber)}')" title="Edit / Update Case Details">
                  <iconify-icon icon="lucide:pencil"></iconify-icon><span class="btn-text"> Edit</span>
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
  if (typeof updateAllCasesActiveFiltersUI === "function") updateAllCasesActiveFiltersUI();
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
    // 13. Synchronize Topnav Undated Cases Count & Undated Tab if active
    if (typeof updateTopnavUndatedCount === "function") {
      updateTopnavUndatedCount();
    }
    const undatedTab = document.getElementById("undated");
    if (
      undatedTab &&
      undatedTab.classList &&
      typeof undatedTab.classList.contains === "function" &&
      undatedTab.classList.contains("active")
    ) {
      if (typeof renderUndatedCasesTab === "function") renderUndatedCasesTab();
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
  const today = typeof getTodayDateString === "function" ? getTodayDateString() : toISODate(new Date());
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

  if (typeof updateAllCasesActiveFiltersUI === "function") updateAllCasesActiveFiltersUI();
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
var currentCasesViewMode = localStorage.getItem("casebook_cases_view_mode") || (typeof window !== "undefined" && window.innerWidth <= 768 ? "cards" : "table");

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
    const todayStr = typeof getTodayDateString === "function" ? getTodayDateString() : toISODate(new Date());
    const todayDMY = formatDateDMY(todayStr);
    if (searchInput) searchInput.value = todayDMY;
  }
  renderUnifiedCasesView();
}
if (typeof window !== "undefined") window.handleAllCasesTypeSelectChange = handleAllCasesTypeSelectChange;
if (typeof global !== "undefined") global.handleAllCasesTypeSelectChange = handleAllCasesTypeSelectChange;
if (typeof setAllCasesDateFilter !== "undefined")
  window.setAllCasesDateFilter = setAllCasesDateFilter;

// --- All Cases Filter Popup & Active Filter Controllers (Paisa Style) ---
function toggleAllCasesFilterPopup(event) {
  if (event) event.stopPropagation();
  const popup = document.getElementById("allCasesFilterPopup");
  if (popup && popup.classList.contains("open")) {
    closeAllCasesFilterPopup();
  } else {
    openAllCasesFilterPopup();
  }
}

function openAllCasesFilterPopup() {
  const popup = document.getElementById("allCasesFilterPopup");
  const btn = document.getElementById("allCasesFilterBtn");
  if (popup) popup.classList.add("open");
  if (btn) {
    btn.classList.add("active");
    btn.setAttribute("aria-expanded", "true");
  }
}

function closeAllCasesFilterPopup() {
  const popup = document.getElementById("allCasesFilterPopup");
  const btn = document.getElementById("allCasesFilterBtn");
  if (popup) popup.classList.remove("open");
  if (btn) {
    btn.setAttribute("aria-expanded", "false");
  }
  if (typeof updateAllCasesActiveFiltersUI === "function") {
    updateAllCasesActiveFiltersUI();
  }
}

function applyAllCasesFilterPopup() {
  closeAllCasesFilterPopup();
  renderUnifiedCasesView();
}

function setAllCasesCourtFilter(court) {
  const courtSelect = document.getElementById("allCasesCourtSelect");
  if (courtSelect) {
    courtSelect.value = court || "";
  }
  if (typeof syncAllCasesCustomDropdowns === "function") syncAllCasesCustomDropdowns();
  renderUnifiedCasesView();
}

function updateAllCasesActiveFiltersUI() {
  const typeSelect = document.getElementById("allCasesTypeSelect");
  const statusSelect = document.getElementById("allCasesStatusSelect");
  const courtSelect = document.getElementById("allCasesCourtSelect");
  const filterBtn = document.getElementById("allCasesFilterBtn");
  const filterBadge = document.getElementById("allCasesFilterBadge");
  const popup = document.getElementById("allCasesFilterPopup");
  const bar = document.getElementById("allCasesActiveFiltersBar");
  const container = document.getElementById("allCasesActiveChipsContainer");

  const selectedType = (typeSelect?.value || "").trim();
  const selectedStatus = (statusSelect?.value || "").trim();
  const selectedCourt = (courtSelect?.value || "").trim();

  let count = 0;
  const chips = [];

  // 1. Case Type chip
  if (selectedType) {
    count++;
    const typeNames = {
      civil: "Civil",
      state: "State (Criminal)",
      family: "Family",
      revenue: "Revenue",
      misc_civil: "Misc Civil",
      misc_criminal: "Misc Criminal",
      complaint: "Complaint"
    };
    const label = typeNames[selectedType] || selectedType;
    chips.push(
      `<span class="all-cases-active-chip chip-type">` +
        `<iconify-icon icon="lucide:landmark"></iconify-icon> ` +
        `<span>${label}</span>` +
        `<button type="button" class="all-cases-active-chip-close" onclick="filterAllCasesByType('')" aria-label="Remove filter">&times;</button>` +
      `</span>`
    );
  }

  // 2. Case Status chip
  if (selectedStatus) {
    count++;
    const statusNames = {
      pending: "Pending",
      pending_forward: "Pending Forward Date",
      disposed: "Disposed",
      undated: "Undated"
    };
    const label = statusNames[selectedStatus] || selectedStatus;
    chips.push(
      `<span class="all-cases-active-chip chip-status">` +
        `<iconify-icon icon="lucide:activity"></iconify-icon> ` +
        `<span>${label}</span>` +
        `<button type="button" class="all-cases-active-chip-close" onclick="setAllCasesStatusFilter('')" aria-label="Remove filter">&times;</button>` +
      `</span>`
    );
  }

  // 3. Court chip
  if (selectedCourt) {
    count++;
    chips.push(
      `<span class="all-cases-active-chip chip-court">` +
        `<iconify-icon icon="lucide:building-2"></iconify-icon> ` +
        `<span>${selectedCourt}</span>` +
        `<button type="button" class="all-cases-active-chip-close" onclick="setAllCasesCourtFilter('')" aria-label="Remove filter">&times;</button>` +
      `</span>`
    );
  }

  // Update Filter Button & Badge
  const isPopupOpen = popup && popup.classList.contains("open");
  if (filterBtn) {
    filterBtn.classList.toggle("active", count > 0 || isPopupOpen);
    filterBtn.classList.toggle("has-active", count > 0);
  }

  if (filterBadge) {
    filterBadge.textContent = String(count);
    filterBadge.classList.toggle("show", count > 0);
  }

  // Update Active Chips Row
  if (bar && container) {
    if (chips.length > 0) {
      container.innerHTML = chips.join("");
      bar.classList.remove("hidden");
    } else {
      container.innerHTML = "";
      bar.classList.add("hidden");
    }
  }
}

if (typeof window !== "undefined") {
  window.toggleAllCasesFilterPopup = toggleAllCasesFilterPopup;
  window.openAllCasesFilterPopup = openAllCasesFilterPopup;
  window.closeAllCasesFilterPopup = closeAllCasesFilterPopup;
  window.applyAllCasesFilterPopup = applyAllCasesFilterPopup;
  window.setAllCasesCourtFilter = setAllCasesCourtFilter;
  window.updateAllCasesActiveFiltersUI = updateAllCasesActiveFiltersUI;
}
if (typeof global !== "undefined") {
  global.toggleAllCasesFilterPopup = toggleAllCasesFilterPopup;
  global.openAllCasesFilterPopup = openAllCasesFilterPopup;
  global.closeAllCasesFilterPopup = closeAllCasesFilterPopup;
  global.applyAllCasesFilterPopup = applyAllCasesFilterPopup;
  global.setAllCasesCourtFilter = setAllCasesCourtFilter;
  global.updateAllCasesActiveFiltersUI = updateAllCasesActiveFiltersUI;
}


// ==============================================================================
// CUSTOM DROPDOWNS (Searchable Command Dropdown Architecture)
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

  // Ensure Search Input Area exists inside menu
  let searchWrap = menu.querySelector(".custom-dropdown-search-wrap");
  let searchInput = menu.querySelector(".custom-dropdown-search-input");
  let emptyState = menu.querySelector(".custom-dropdown-empty");

  if (!searchWrap) {
    searchWrap = document.createElement("div");
    searchWrap.className = "custom-dropdown-search-wrap";
    searchWrap.innerHTML = `
      <div class="custom-dropdown-search-inner">
        <svg class="lucide lucide-search custom-dropdown-search-icon" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input type="text" class="custom-dropdown-search-input" placeholder="Search..." autocomplete="off">
      </div>
    `;
    menu.insertBefore(searchWrap, listEl);
    searchInput = searchWrap.querySelector(".custom-dropdown-search-input");
  }

  if (!emptyState) {
    emptyState = document.createElement("div");
    emptyState.className = "custom-dropdown-empty hidden";
    emptyState.textContent = "No options found.";
    menu.appendChild(emptyState);
  }

  function openDropdown() {
    document.querySelectorAll(".custom-dropdown-menu.open, .custom-dropdown-menu.opacity-100").forEach((m) => {
      if (m !== menu) {
        m.classList.remove("open", "opacity-100", "visible", "scale-100");
        m.classList.add("opacity-0", "invisible", "scale-95");
        const parent = m.closest(".custom-dropdown, .custom-dropdown-wrap");
        const c = parent?.querySelector(".custom-dropdown-chevron");
        if (c) c.classList.remove("rotate-180");
        const t = parent?.querySelector(".custom-dropdown-trigger");
        if (t) t.setAttribute("aria-expanded", "false");
      }
    });

    menu.classList.remove("opacity-0", "invisible", "scale-95");
    menu.classList.add("open", "opacity-100", "visible", "scale-100");
    if (chevron) chevron.classList.add("rotate-180");
    if (trigger) trigger.setAttribute("aria-expanded", "true");

    if (searchInput) {
      searchInput.value = "";
      filterOptions("");
      setTimeout(() => searchInput.focus(), 80);
    }
  }

  function closeDropdown() {
    menu.classList.remove("open", "opacity-100", "visible", "scale-100");
    menu.classList.add("opacity-0", "invisible", "scale-95");
    if (chevron) chevron.classList.remove("rotate-180");
    if (trigger) trigger.setAttribute("aria-expanded", "false");
  }

  function toggleDropdown() {
    if (menu.classList.contains("open") || menu.classList.contains("opacity-100")) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }

  function filterOptions(searchTerm = "") {
    const term = searchTerm.toLowerCase().trim();
    let visibleCount = 0;
    listEl.querySelectorAll(".custom-dropdown-item").forEach((item) => {
      const text = (item.textContent || "").toLowerCase();
      const val = (item.getAttribute("data-value") || "").toLowerCase();
      const match = !term || text.includes(term) || val.includes(term);
      item.style.display = match ? "" : "none";
      if (match) visibleCount++;
    });
    if (emptyState) {
      emptyState.classList.toggle("hidden", visibleCount > 0);
    }
  }

  function renderOptions() {
    if (!listEl) return;
    listEl.innerHTML = "";
    const options = Array.from(select.options);
    const selectedVal = select.value;

    if (options.length === 0) {
      if (emptyState) emptyState.classList.remove("hidden");
      return;
    }
    if (emptyState) emptyState.classList.add("hidden");

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
        ${isSelected ? '<svg class="lucide lucide-check w-4 h-4 checkmark custom-dropdown-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>' : ''}
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

    if (searchInput && searchInput.value) {
      filterOptions(searchInput.value);
    }
  }

  container._syncFromSelect = function () {
    if (select.value) {
      const idx = Array.from(select.options).findIndex((o) => o.value === select.value);
      if (idx !== -1) {
        select.selectedIndex = idx;
      }
    }
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

  if (searchInput && !searchInput._bound) {
    searchInput._bound = true;
    searchInput.addEventListener("input", (e) => {
      filterOptions(e.target.value);
    });
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeDropdown();
        trigger.focus();
      } else if (e.key === "Enter") {
        e.preventDefault();
        const firstVisible = listEl.querySelector(".custom-dropdown-item:not([style*='display: none'])");
        if (firstVisible) firstVisible.click();
      }
    });
    searchInput.addEventListener("click", (e) => e.stopPropagation());
  }

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
      if (!e.target.closest || !e.target.closest(".all-cases-search-container")) {
        if (typeof closeAllCasesFilterPopup === "function") closeAllCasesFilterPopup();
      }
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
        if (typeof closeAllCasesFilterPopup === "function") closeAllCasesFilterPopup();
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
  const todayStr = typeof getTodayDateString === "function" ? getTodayDateString() : toISODate(new Date());

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

  // Sync active visual indicator on stat cards
  const currentStatus = (document.getElementById("allCasesStatusSelect")?.value || "").toLowerCase();
  const currentSearch = (document.getElementById("allCasesSearchInput")?.value || "").trim();
  const todayStrDMY = formatDateDMY(todayStr);
  const isTodayFiltered = currentSearch === todayStrDMY;

  document.querySelectorAll(".all-cases-container .stat-card, #all .stat-card").forEach((card) => {
    const statType = card.getAttribute("data-stat");
    if (isTodayFiltered) {
      card.classList.toggle("active", statType === "today");
    } else if (currentStatus === "pending") {
      card.classList.toggle("active", statType === "pending");
    } else if (currentStatus === "pending_forward" || currentStatus === "undated") {
      card.classList.toggle("active", statType === "undated");
    } else if (currentStatus === "disposed") {
      card.classList.toggle("active", statType === "disposed");
    } else if (!currentStatus && (!window._currentActiveFilterTab || window._currentActiveFilterTab === "")) {
      card.classList.toggle("active", statType === "total");
    } else {
      card.classList.remove("active");
    }
  });

  if (typeof initAllCasesSwipeGestures === "function") {
    initAllCasesSwipeGestures();
  } else if (typeof initAllCasesStatsSwipe === "function") {
    initAllCasesStatsSwipe();
  }
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
        <div class="empty-state-icon">
          <iconify-icon icon="lucide:search"></iconify-icon>
        </div>
        <div class="empty-state-title">No cases match the specified filters</div>
        <div class="empty-state-desc">Try adjusting your search query, status, or category.</div>
        <button type="button" class="table-view-btn empty-state-btn" onclick="resetAllCasesFilters()">
          <iconify-icon icon="lucide:rotate-ccw"></iconify-icon> Reset Filters
        </button>
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
      let hearingChipLucide = "lucide:calendar";
      if (isDisposed) {
        hearingChipClass = "disposed";
        hearingChipLucide = "lucide:check-circle-2";
      } else if (isUndated || isDatePassed) {
        hearingChipClass = "undated pending-forward";
        hearingChipLucide = "lucide:calendar-plus";
        nextDateText = isDatePassed ? `Pending Forward (${formatDateDMY(nextISO)})` : "Pending Forward Date";
      } else if (isUrgent) {
        hearingChipClass = "urgent";
        hearingChipLucide = "lucide:alert-circle";
      }

      const clientName = c.clientName || c.criminalClientName || "";
      const clientPhone = c.clientNumber || c.criminalClientNumber || "";

      return `
      <div class="unified-case-card" onclick="openCaseDetailsFullModal('${escapeHtml(caseNumber)}', ${idx})" title="Click to view complete case details">
        <div>
          <div class="card-top-row">
            <div class="card-caseno">
              <iconify-icon icon="lucide:folder"></iconify-icon>
              <span>${escapeHtml(caseNumber)}</span>
            </div>
            ${statusPillHtml}
          </div>
          <div class="card-title">${escapeHtml(caseName)}</div>
          <div class="card-court">
            <iconify-icon icon="lucide:landmark"></iconify-icon>
            <span>${escapeHtml(courtName)}</span>
          </div>
          ${
            clientName
              ? `
            <div class="card-client">
              <iconify-icon icon="lucide:user"></iconify-icon>
              <span>${escapeHtml(clientName)}</span>
              ${clientPhone ? `<small>(${escapeHtml(clientPhone)})</small>` : ""}
            </div>
          `
              : ""
          }
        </div>
        <div class="card-bottom-row">
          <div class="card-hearing-chip ${hearingChipClass}" onclick="event.stopPropagation(); openUpdateHearingForCase('${escapeHtml(caseNumber)}')" title="${(isUndated || isDatePassed) ? 'Click to assign Forward Date' : 'Hearing Date'}">
            <iconify-icon icon="${hearingChipLucide}"></iconify-icon>
            <span>${escapeHtml(nextDateText)}</span>
          </div>
          <div class="card-actions" onclick="event.stopPropagation()">
            <button type="button" class="act act-dossier card-action-btn" onclick="openCaseDetailsFullModal('${escapeHtml(caseNumber)}', ${idx})" title="View Details" aria-label="View Details">
              <iconify-icon icon="lucide:eye"></iconify-icon>
            </button>
            <button type="button" class="act primary card-action-btn forward" onclick="openUpdateHearingForCase('${escapeHtml(caseNumber)}')" title="Forward Hearing Date" aria-label="Forward Hearing Date">
              <iconify-icon icon="lucide:calendar-plus"></iconify-icon>
            </button>
            <button type="button" class="act card-action-btn" onclick="editCaseFromTable('${escapeHtml(caseNumber)}')" title="Edit Case" aria-label="Edit Case">
              <iconify-icon icon="lucide:pencil"></iconify-icon>
            </button>
            <button type="button" class="act card-action-btn delete" onclick="if (typeof deleteUnifiedCase === 'function') deleteUnifiedCase('${escapeHtml(caseNumber)}'); else deleteCaseCard(${idx});" title="Delete Case" aria-label="Delete Case">
              <iconify-icon icon="lucide:trash-2"></iconify-icon>
            </button>
          </div>
        </div>
      </div>
    `;
    })
    .join("");
}

async function deleteUnifiedCase(caseNumber) {
  if (!caseNumber) return;
  const confirmed = window.confirm(
    `Are you sure you want to permanently delete case "${caseNumber}"? This action cannot be undone.`
  );
  if (!confirmed) return;

  if (typeof deleteCaseFromSupabase === "function") {
    await deleteCaseFromSupabase(caseNumber);
  } else {
    allCaseRecords = (allCaseRecords || []).filter(
      (item) => (item.caseNo || item.criminalCaseNumber) !== caseNumber
    );
    if (typeof saveCasesToLocalStorage === "function") saveCasesToLocalStorage();
  }
  if (typeof showCaseBookToast === "function") {
    showCaseBookToast(`Case "${caseNumber}" deleted successfully`);
  }
  if (typeof renderUnifiedCasesView === "function") {
    renderUnifiedCasesView();
  }
}
if (typeof window !== "undefined") window.deleteUnifiedCase = deleteUnifiedCase;

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
  if (typeof updateAllCasesActiveFiltersUI === "function") updateAllCasesActiveFiltersUI();
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
        <td colspan="7" class="no-results">
          <iconify-icon icon="lucide:search"></iconify-icon> No cases match the selected filters or search query.
          <br><button type="button" class="table-view-btn" onclick="resetAllCasesFilters()">Clear Filters</button>
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
        nextHearingStr = `<span class="table-badge completed"><iconify-icon icon="lucide:check-circle-2"></iconify-icon> Disposed${dispDate ? " · " + formatDateDMY(dispDate) : ""}</span>`;
      } else if (isUndated) {
        nextHearingStr = `
          <div class="pending-forward-cell undated-docket-widget" title="No hearing date set — click to assign Forward Date">
            <div class="undated-meta-row">
              <iconify-icon icon="lucide:calendar-clock"></iconify-icon>
              <span class="undated-status-text">Not Scheduled</span>
            </div>
            <button type="button" class="act btn-forward-docket undated-initial btn-pending-forward-chip undated" onclick="event.stopPropagation(); openUpdateHearingForCase('${escapeHtml(caseNumber)}')" title="Click to assign Initial Hearing Date">
              <iconify-icon icon="lucide:calendar-plus"></iconify-icon>
              <span>Assign Date</span>
            </button>
          </div>
        `;
      } else if (isDatePassed) {
        const nextDt = new Date(nextISO);
        const nowDt = new Date(todayISO);
        const diffMs = nowDt.getTime() - nextDt.getTime();
        const daysOverdue = Math.max(1, Math.round(diffMs / (1000 * 60 * 60 * 24)));
        nextHearingStr = `
          <div class="pending-forward-cell overdue-docket-widget" title="Hearing was scheduled for ${formatDateDMY(nextISO)} (${daysOverdue} days ago) — click to Forward Date">
            <div class="overdue-history-row">
              <iconify-icon icon="lucide:history"></iconify-icon>
              <span class="overdue-date-text overdue-past-date">Last: ${formatDateDMY(nextISO)}</span>
            </div>
            <button type="button" class="act primary btn-forward-docket btn-pending-forward-chip overdue" onclick="event.stopPropagation(); openUpdateHearingForCase('${escapeHtml(caseNumber)}')">
              <iconify-icon icon="lucide:calendar-plus"></iconify-icon>
              <span>Forward Date</span>
            </button>
          </div>
        `;
      } else {
        nextHearingStr = `<div class="dated-hearing-cell"><strong class="dated-hearing-text">${formatDateDMY(c.nextHearing)}</strong></div>`;
      }

      const partiesRemark = c.remark || c.remarks || "";
      const partiesRemarkHtml = renderCaseTableRemarks(partiesRemark, caseNumber, caseName);

      return `
      <tr onclick="openCaseDetailsFullModal('${escapeHtml(caseNumber)}')" title="Click to view full case details">
        <td><span class="case-num">${escapeHtml(caseNumber)}</span></td>
        <td>
          <div class="case-name">${escapeHtml(caseName)}</div>
          ${c.policeStation ? `<small class="ps-crime-info"><iconify-icon icon="lucide:shield"></iconify-icon> PS: ${escapeHtml(c.policeStation)}` + (c.crimeNumber ? ` | ${escapeHtml(c.crimeNumber)}` : "") + `</small>` : ""}
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
        <td>${nextHearingStr}</td>
        <td onclick="event.stopPropagation()">
          <div class="row-actions">
            <button type="button" class="act ra-btn edit" onclick="editCaseFromTable('${escapeHtml(caseNumber)}')" title="Edit / Update Case" aria-label="Edit Case">
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
  let statusColor = "var(--warning)";
  if (isDisposed) {
    statusText = (c.caseStatus && String(c.caseStatus).toLowerCase().includes("decid")) ? "Decided" : "Disposed Off";
    statusColor = "var(--feedback-success)";
  } else if (isUndated) {
    statusText = "Undated";
    statusColor = "var(--accent)";
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
    ? '<span class="badge status-urgent"><iconify-icon icon="lucide:alert-triangle"></iconify-icon> Hearing Soon</span>'
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
    { num: 1, icon: "lucide:landmark", title: "Courts & Case Info", rows: info },
    { num: 2, icon: "lucide:users", title: "Parties & Matter", rows: parties },
    {
      num: 3,
      icon: "lucide:calendar-days",
      title: `Hearings${hearingHistory.length ? ` (${hearingHistory.length} previous)` : ""}`,
      rows: hearings,
      history: hearingHistory,
    },
    { num: 4, icon: "lucide:contact-2", title: "Client & Remarks", rows: client },
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
        <div class="msg">No cases match your criteria</div>
        <div>Try adjusting your status filter or clearing the search query.</div>
        <div>
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
          <iconify-icon icon="lucide:check-circle-2"></iconify-icon>
          <span>${escapeHtml(nextDateText !== "Disposed" ? nextDateText : "Closed")}</span>
        </div>
        ${c.disposalDate ? `<span class="cc-hearing-stage">Date: ${escapeHtml(formatDateDMY(c.disposalDate))}</span>` : ""}
      `;
      } else if (isUndated) {
        hearingChipHtml = `
        <div class="cc-hearing-chip undated">
          <iconify-icon icon="lucide:history"></iconify-icon>
          <span>Not Scheduled</span>
        </div>
        <span class="cc-hearing-stage">Needs Hearing Date</span>
      `;
      } else {
        hearingChipHtml = `
        <div class="cc-hearing-chip ${isUrgent ? "urgent" : ""}">
          <iconify-icon icon="lucide:calendar"></iconify-icon>
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
            <iconify-icon icon="lucide:folder"></iconify-icon>
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
            <iconify-icon icon="lucide:landmark"></iconify-icon>
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
        <td>
          <div class="cc-actions-wrap" onclick="event.stopPropagation()">
            <button type="button" class="cc-action-btn view" onclick="openCaseDetailsFullModal('${escapeHtml(caseNumber)}', ${idx})" title="View Complete Details">
              <iconify-icon icon="lucide:eye"></iconify-icon>
            </button>
            <button type="button" class="cc-action-btn edit" onclick="editCaseFromTable('${escapeHtml(caseNumber)}')" title="Edit Case">
              <iconify-icon icon="lucide:pencil"></iconify-icon>
            </button>
            <button type="button" class="cc-action-btn delete" onclick="deleteCaseCard(${idx})" title="Delete Case Permanently">
              <iconify-icon icon="lucide:trash-2"></iconify-icon>
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
          <iconify-icon icon="lucide:check-circle-2"></iconify-icon>
          <span>${escapeHtml(nextDateText !== "Disposed" ? nextDateText : "Closed")}</span>
        </div>
      `;
      } else if (isUndated) {
        hearingChipHtml = `
        <div class="cc-hearing-chip undated">
          <iconify-icon icon="lucide:history"></iconify-icon>
          <span>Not Scheduled</span>
        </div>
      `;
      } else {
        hearingChipHtml = `
        <div class="cc-hearing-chip ${isUrgent ? "urgent" : ""}">
          <iconify-icon icon="lucide:calendar"></iconify-icon>
          <span>${escapeHtml(nextDateText)}</span>
        </div>
        ${c.hearingProcess ? `<span class="cc-hearing-stage" title="${escapeHtml(c.hearingProcess)}">${escapeHtml(c.hearingProcess)}</span>` : ""}
      `;
      }

      return `
      <div class="cc-mobile-card" onclick="openCaseDetailsFullModal('${escapeHtml(caseNumber)}', ${idx})">
        <div class="cc-mc-header">
          <div class="cc-mc-caseno">
            <iconify-icon icon="lucide:folder"></iconify-icon>
            <span>${escapeHtml(caseNumber || "—")}</span>
            ${newTagHtml}
          </div>
          ${statusPillHtml}
        </div>

        <div class="cc-mc-title" title="${escapeHtml(caseName)}">
          ${escapeHtml(caseName)}
        </div>

        <div class="cc-mc-court" title="${escapeHtml(courtName || "—")}">
          <iconify-icon icon="lucide:landmark"></iconify-icon>
          <span>${escapeHtml(courtName || "—")}</span>
        </div>

        <div class="cc-mc-footer">
          <div class="cc-mc-hearing">
            ${hearingChipHtml}
          </div>
          <div class="cc-actions-wrap" onclick="event.stopPropagation()">
            <button type="button" class="cc-action-btn view" onclick="openCaseDetailsFullModal('${escapeHtml(caseNumber)}', ${idx})" title="View Details">
              <iconify-icon icon="lucide:eye"></iconify-icon>
            </button>
            <button type="button" class="cc-action-btn edit" onclick="editCaseFromTable('${escapeHtml(caseNumber)}')" title="Edit Case">
              <iconify-icon icon="lucide:pencil"></iconify-icon>
            </button>
            <button type="button" class="cc-action-btn delete" onclick="deleteCaseCard(${idx})" title="Delete Case">
              <iconify-icon icon="lucide:trash-2"></iconify-icon>
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
            <iconify-icon icon="lucide:scale"></iconify-icon>
          </div>
          <div>
            <h3>All Case Matters</h3>
            <p>Click any case row or action button to review or edit matter proceedings</p>
          </div>
        </div>
        <div>
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
              <th class="cc-col-actions">Actions</th>
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
  html += `<button type="button" class="page-btn page-btn-first" ${isFirst ? "disabled" : ""} onclick="changeAllCasesPage(1)" title="First Page" aria-label="First Page"><svg class="lucide lucide-chevrons-left" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/></svg></button>`;
  html += `<button type="button" class="page-btn page-btn-prev" ${isFirst ? "disabled" : ""} onclick="changeAllCasesPage(${currentPage - 1})" title="Previous Page" aria-label="Previous Page"><svg class="lucide lucide-chevron-left" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg> <span>Prev</span></button>`;

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
      html += `<span class="page-ellipsis">…</span>`;
    } else {
      const isActive = p === currentPage ? " active" : "";
      html += `<button type="button" class="page-btn page-btn-num${isActive}" onclick="changeAllCasesPage(${p})">${p}</button>`;
    }
  });

  html += `<span class="page-mobile-break" aria-hidden="true"></span>`;

  // Next and Last buttons
  html += `<button type="button" class="page-btn page-btn-next" ${isLast ? "disabled" : ""} onclick="changeAllCasesPage(${currentPage + 1})" title="Next Page" aria-label="Next Page"><span>Next</span> <svg class="lucide lucide-chevron-right" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button>`;
  html += `<button type="button" class="page-btn page-btn-last" ${isLast ? "disabled" : ""} onclick="changeAllCasesPage(${totalPages})" title="Last Page" aria-label="Last Page"><svg class="lucide lucide-chevrons-right" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 17 5-5-5-5"/><path d="m13 17 5-5-5-5"/></svg></button>`;

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
  const today = typeof getTodayDateString === "function" ? getTodayDateString() : toISODate(new Date());
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
  const isExpanded = header.classList.toggle('active');
  header.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
  const body = header.nextElementSibling;
  if (body) {
    body.classList.toggle('show');
  }
}
if (typeof toggleUpcomingCardNote !== "undefined") window.toggleUpcomingCardNote = toggleUpcomingCardNote;

var currentUpcomingViewMode = typeof currentUpcomingViewMode !== "undefined" ? currentUpcomingViewMode : "table";
if (typeof window !== "undefined") {
  window.currentUpcomingViewMode = currentUpcomingViewMode;
}

function setUpcomingViewMode(mode) {
  if (mode !== "table" && mode !== "cards") mode = "table";
  currentUpcomingViewMode = mode;
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("casebook_upcoming_view_mode", mode);
    }
  } catch (e) {}

  const tblBtn = document.getElementById("upcomingViewToggleTable");
  const crdBtn = document.getElementById("upcomingViewToggleCards");
  if (tblBtn) tblBtn.classList.toggle("active", mode === "table");
  if (crdBtn) crdBtn.classList.toggle("active", mode === "cards");

  const tblContainer = document.getElementById("upcomingTableViewContainer");
  const crdContainer = document.getElementById("upcomingWeekContainer");

  if (tblContainer) tblContainer.classList.toggle("hidden", mode !== "table");
  if (crdContainer) crdContainer.classList.toggle("hidden", mode !== "cards");
}
if (typeof window !== "undefined") window.setUpcomingViewMode = setUpcomingViewMode;

function viewUpcomingCaseDossier(caseNum) {
  if (!caseNum || caseNum === '—') return;
  if (typeof openCaseHistoryModalByNo === 'function') {
    openCaseHistoryModalByNo(caseNum);
  } else if (typeof window !== 'undefined' && typeof window.openCaseHistoryModalByNo === 'function') {
    window.openCaseHistoryModalByNo(caseNum);
  }
}
if (typeof window !== "undefined") window.viewUpcomingCaseDossier = viewUpcomingCaseDossier;
if (typeof globalThis !== "undefined") globalThis.viewUpcomingCaseDossier = viewUpcomingCaseDossier;

function toggleUpcomingTableRowNote(index) {
  const row = document.getElementById("upcomingRowNote-" + index);
  if (row) {
    row.classList.toggle("hidden");
  }
}
if (typeof window !== "undefined") window.toggleUpcomingTableRowNote = toggleUpcomingTableRowNote;

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

  const allUpcoming = records
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

  // Populate court dropdown list if available
  if (typeof populateUpcomingCourtDropdown === "function") {
    const courtsList = allUpcoming.map(c => c.courtName || c.criminalCourtName || c.court_name || "").filter(Boolean);
    populateUpcomingCourtDropdown(courtsList);
  }

  // Filter by horizon days & court forum
  const daysFilter = typeof currentUpcomingDaysFilter !== "undefined" ? currentUpcomingDaysFilter : 7;
  const courtFilter = typeof currentUpcomingCourtFilter !== "undefined" ? (currentUpcomingCourtFilter || "").trim().toLowerCase() : "";

  let upcoming = allUpcoming;

  if (daysFilter < 7) {
    const maxHorizonTime = todayZero.getTime() + daysFilter * 24 * 60 * 60 * 1000 - 1;
    upcoming = upcoming.filter(c => {
      const parsed = parseFn(c.nextHearing);
      return parsed && parsed.getTime() <= maxHorizonTime;
    });
  }

  if (courtFilter && courtFilter !== "all") {
    upcoming = upcoming.filter(c => {
      const ct = (c.courtName || c.criminalCourtName || c.court_name || "").trim().toLowerCase();
      return ct === courtFilter || ct.includes(courtFilter);
    });
  }

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
    chipBadge.innerHTML = `<svg class="lucide lucide-list-checks" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/></svg> ${upcoming.length} Hearing${upcoming.length === 1 ? "" : "s"} Listed`;
  }

  if (countBadge) {
    countBadge.textContent = String(upcoming.length);
  }

  const footerCount = document.getElementById("upcomingFooterCount");
  if (footerCount) {
    footerCount.textContent = `SHOWING ${upcoming.length} OF ${allUpcoming.length} CASES`;
  }

  const tableBody = document.getElementById("upcomingTableBody");
  const docketList = document.getElementById("upcomingDocketList");
  const tableHead = document.getElementById("upcomingTableHead");

  if (upcoming.length === 0) {
    if (tableHead) tableHead.style.setProperty("display", "none", "important");
    if (tableBody) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="7">
            <div class="hearing-empty-state-card">
              <div class="hearing-empty-emblem"><svg class="lucide lucide-scale" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg></div>
              <h3>No Upcoming Hearings</h3>
              <p>Your court docket is completely clear for the next 7 days. No appearances, framing of issues, or evidence proceedings are scheduled.</p>
              <div class="hearing-empty-actions">
                <button type="button" class="btn btn-primary primary-btn" onclick="showTab('causelist')">
                  <svg class="lucide lucide-clipboard-list" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg> <span>Daily Cause List</span>
                </button>
                <button type="button" class="btn btn-secondary secondary-btn" onclick="showTab('calendar')">
                  <svg class="lucide lucide-calendar" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg> <span>Interactive Calendar</span>
                </button>
                <button type="button" class="btn btn-secondary secondary-btn" onclick="showTab('all')">
                  <svg class="lucide lucide-folder-tree" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8h8"/><path d="M16 14v6"/><path d="M13 17h6"/></svg> <span>All Cases</span>
                </button>
              </div>
            </div>
          </td>
        </tr>
      `;
    }

    if (docketList) {
      docketList.innerHTML = `
        <div class="hearing-empty-state-card">
          <div class="hearing-empty-emblem"><svg class="lucide lucide-scale" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg></div>
          <h3>No Upcoming Hearings</h3>
          <p>Your court docket is completely clear for the selected period. No appearances, framing of issues, or evidence proceedings are scheduled.</p>
          <div class="hearing-empty-actions">
            <button type="button" class="btn btn-primary primary-btn" onclick="setUpcomingDaysFilter(7)">
              <svg class="lucide lucide-calendar-clock" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h5"/><path d="M17.5 17.5 16 16.25V14"/><circle cx="16" cy="16" r="6"/></svg> <span>Reset to Next 7 Days</span>
            </button>
            <button type="button" class="btn btn-secondary secondary-btn" onclick="showTab('causelist')">
              <svg class="lucide lucide-clipboard-list" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg> <span>Daily Cause List</span>
            </button>
          </div>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="hearing-empty-state-card">
        <div class="hearing-empty-emblem"><svg class="lucide lucide-scale" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg></div>
        <h3>No Upcoming Hearings</h3>
        <p>Your court docket is completely clear for the next 7 days. No appearances, framing of issues, or evidence proceedings are scheduled.</p>
        <div class="hearing-empty-actions">
          <button type="button" class="btn btn-primary primary-btn" onclick="showTab('causelist')">
            <svg class="lucide lucide-clipboard-list" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg> <span>Daily Cause List</span>
          </button>
          <button type="button" class="btn btn-secondary secondary-btn" onclick="showTab('calendar')">
            <svg class="lucide lucide-calendar" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg> <span>Interactive Calendar</span>
          </button>
          <button type="button" class="btn btn-secondary secondary-btn" onclick="showTab('all')">
            <svg class="lucide lucide-folder-tree" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8h8"/><path d="M16 14v6"/><path d="M13 17h6"/></svg> <span>All Cases</span>
          </button>
        </div>
      </div>
    `;
    return;
  }

  // Render View 2: Cards Grid View (Scratch Redesigned Mobile-Friendly Advocate Cards)
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
      const clientName = (c.clientName || c.criminalClientName || "Client").trim();
      const clientPhone = (c.clientNumber || c.criminalClientNumber || "").trim();
      const cleanPhone = clientPhone.replace(/[^0-9]/g, "");
      const formattedPhone = clientPhone && String(clientPhone).trim().length === 10
        ? `${String(clientPhone).trim().slice(0, 5)} ${String(clientPhone).trim().slice(5)}`
        : clientPhone;
      const rawType = (c.caseType || "civil").toLowerCase();
      let typeLabel = "CIVIL";
      if (rawType === "state" || rawType === "criminal") typeLabel = "CRIMINAL";
      else if (rawType === "revenue") typeLabel = "REVENUE";
      else if (rawType === "family") typeLabel = "FAMILY";
      else if (rawType === "corporate") typeLabel = "CORPORATE";
      else typeLabel = rawType.replace("_", " ").toUpperCase();

      const parsedHearing = parseFn(c.nextHearing);
      let daysBadgeClass = "";
      let daysBadgeIconSvg = '<svg class="lucide lucide-clock" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>';
      let daysLeftText = "Scheduled";
      let isUrgentToday = false;

      if (parsedHearing) {
        const diffTime = parsedHearing.getTime() - todayZero.getTime();
        const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (daysLeft === 0) {
          daysBadgeClass = "today";
          daysBadgeIconSvg = '<svg class="lucide lucide-flame" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>';
          daysLeftText = "Today in Court";
          isUrgentToday = true;
        } else if (daysLeft === 1) {
          daysBadgeClass = "tomorrow";
          daysBadgeIconSvg = '<svg class="lucide lucide-zap" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>';
          daysLeftText = "Tomorrow";
        } else {
          daysBadgeIconSvg = '<svg class="lucide lucide-clock" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>';
          daysLeftText = `In ${daysLeft} Days`;
        }
      }

      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const cleanDateStr = parsedHearing
        ? `${parsedHearing.getDate()} ${monthNames[parsedHearing.getMonth()]} ${parsedHearing.getFullYear()}`
        : dateFormatted;

      return `
      <article class="legal-hearing-card case-card ${isUrgentToday ? "urgent-today" : ""}" data-case-id="${escapeHtml(caseNum)}" data-court="${escapeHtml(court.toLowerCase())}">
        <!-- 1. Top Urgency Ribbon / Header Strip -->
        <div class="card-urgency-strip ${daysBadgeClass}">
          <div class="urgency-left">
            <span class="urgency-icon-wrap" aria-hidden="true">${daysBadgeIconSvg}</span>
            <span class="status-text ${daysBadgeClass}">${daysLeftText}</span>
            <span class="urgency-date-sep">·</span>
            <span class="urgency-date-label">${cleanDateStr}</span>
          </div>
          <div class="urgency-right">
            <span class="case-type ${rawType}">${typeLabel}</span>
          </div>
        </div>

        <!-- 2. Card Main Body -->
        <div class="card-body">
          <div class="card-title-row">
            <h3 class="case-title" title="${escapeHtml(caseName)}">${escapeHtml(caseName)}</h3>
            <span class="meta-case-num" title="Case Number">
              <svg class="lucide lucide-hash" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/></svg>${escapeHtml(caseNum)}
            </span>
          </div>

          <!-- Essential Info Rows (Court, Stage, Client) -->
          <div class="card-details-list">
            <div class="detail-row detail-court">
              <span class="detail-icon" aria-hidden="true">
                <svg class="lucide lucide-landmark" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>
              </span>
              <div class="detail-meta">
                <span class="detail-label">Court</span>
                <span class="detail-val" title="${escapeHtml(court)}">${escapeHtml(court)}</span>
              </div>
            </div>

            <div class="detail-row detail-stage">
              <span class="detail-icon" aria-hidden="true">
                <svg class="lucide lucide-gavel" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8"/><path d="m16 16 6-6"/><path d="m8 8 6-6"/><path d="m9 7 8 8"/><path d="m21 11-8-8"/></svg>
              </span>
              <div class="detail-meta">
                <span class="detail-label">Stage</span>
                <span class="detail-val stage-val highlight-stage" title="${escapeHtml(stage)}">${escapeHtml(stage)}</span>
              </div>
            </div>

            <div class="detail-row detail-client">
              <span class="detail-icon" aria-hidden="true">
                <svg class="lucide lucide-user" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </span>
              <div class="detail-meta">
                <span class="detail-label">Client</span>
                <span class="detail-val">
                  ${escapeHtml(clientName)}
                  ${clientPhone ? `<span class="client-tel-text">(${escapeHtml(formattedPhone || clientPhone)})</span>` : ""}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Mobile-First Quick Action Bar (Context-Aware: Update Date only if Today in Court) -->
        <div class="bottom-nav hearing-card-footer card-actions card-mobile-actions">
          ${
            isUrgentToday
              ? `
          <button
            type="button"
            class="nav-btn act-btn-update"
            onclick="if (typeof openUpdateHearingForCase === 'function') openUpdateHearingForCase('${escapeHtml(caseNum)}'); else if (typeof openCaseHistoryModalByNo === 'function') openCaseHistoryModalByNo('${escapeHtml(caseNum)}');"
            title="Update Next Date for Case ${escapeHtml(caseNum)}"
            aria-label="Update Next Date"
          >
            <svg class="lucide lucide-calendar-plus" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M10 16h4"/><path d="M12 14v4"/></svg>
            <span>Update Date</span>
          </button>
          `
              : ""
          }

          <button
            type="button"
            class="nav-btn dossier-link-btn"
            onclick="if (typeof openCaseDetailsFullModal === 'function') openCaseDetailsFullModal('${escapeHtml(caseNum)}'); else if (typeof openCaseHistoryModalByNo === 'function') openCaseHistoryModalByNo('${escapeHtml(caseNum)}');"
            title="View Full Case Dossier"
            aria-label="View Full Case Dossier"
          >
            <svg class="lucide lucide-folder" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
            <span>Dossier</span>
          </button>

          ${
            cleanPhone
              ? `
          <a
            href="tel:${escapeHtml(cleanPhone)}"
            class="nav-btn btn-call"
            title="Call Client: ${escapeHtml(cleanPhone)}"
            aria-label="Call Client"
          >
            <svg class="lucide lucide-phone" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span>Call</span>
          </a>

          <button
            type="button"
            class="nav-btn btn-notice"
            onclick="sendWhatsAppHearingNotice('${escapeHtml(caseNum)}')"
            title="Send WhatsApp Notice"
            aria-label="Send WhatsApp Notice"
          >
            <svg class="lucide lucide-message-circle" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
            <span>Notice</span>
          </button>
          `
              : `
          <button
            type="button"
            class="nav-btn btn-call disabled"
            disabled
            title="No phone registered"
            aria-label="No phone registered"
          >
            <svg class="lucide lucide-phone-off" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"/><line x1="22" x2="2" y1="2" y2="22"/></svg>
            <span>Call</span>
          </button>
          `
          }
        </div>
      </article>
      `;
    })
    .join("");

  // Render View 1 (A): Accordion Docket List (Daily Cause List Pattern)
  if (tableHead) tableHead.style.removeProperty("display");
  if (docketList) {
    docketList.innerHTML = upcoming.map((c) => {
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
      const clientName = (c.clientName || c.criminalClientName || "Chambers Record").trim();
      const clientPhone = (c.clientNumber || c.criminalClientNumber || "").trim();
      const cleanPhone = clientPhone.replace(/[^0-9]/g, "");
      const formattedPhone = clientPhone && String(clientPhone).trim().length === 10
        ? `${String(clientPhone).trim().slice(0, 5)} ${String(clientPhone).trim().slice(5)}`
        : clientPhone;
      const rawType = (c.caseType || "civil").toLowerCase();
      let tagClass = "civil";
      let tagLabel = "Civil";
      if (rawType === "criminal" || rawType === "state") {
        tagClass = "criminal";
        tagLabel = "Criminal";
      } else if (rawType === "revenue") {
        tagClass = "revenue";
        tagLabel = "Revenue";
      } else if (rawType === "family") {
        tagClass = "family";
        tagLabel = "Family";
      } else if (rawType === "corporate") {
        tagClass = "corporate";
        tagLabel = "Corporate";
      }

      const remark = (c.remark || c.remarks || "").trim();
      const prevHearingDisplay = typeof getCasePreviousHearingDisplay === "function" ? getCasePreviousHearingDisplay(c) : "Initial / Chamber Listing";

      const parsedHearing = parseFn(c.nextHearing);
      let daysBadgeClass = "";
      let daysBadgeIconSvg = '<svg class="lucide lucide-calendar" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M8 2v4"/><path d="M16 2v4"/><path d="M3 10h18"/></svg>';
      let daysLeftText = "Scheduled";
      let isUrgentToday = false;

      // Extract Month & Day for Mobile Calendar Dice Display
      const monthNamesShort = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      let diceDay = "—";
      let diceMonth = "DATE";

      if (parsedHearing) {
        diceDay = String(parsedHearing.getDate()).padStart(2, "0");
        diceMonth = monthNamesShort[parsedHearing.getMonth()] || "DATE";
        const diffTime = parsedHearing.getTime() - todayZero.getTime();
        const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (daysLeft === 0) {
          daysBadgeClass = "today";
          daysBadgeIconSvg = '<svg class="lucide lucide-flame" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3.5z"/></svg>';
          daysLeftText = "Today in Court";
          isUrgentToday = true;
        } else if (daysLeft === 1) {
          daysBadgeClass = "tomorrow";
          daysBadgeIconSvg = '<svg class="lucide lucide-zap" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>';
          daysLeftText = "Tomorrow";
        } else {
          daysBadgeIconSvg = '<svg class="lucide lucide-clock" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>';
          daysLeftText = `In ${daysLeft} Days`;
        }
      } else if (dateFormatted && dateFormatted.includes("/")) {
        const dParts = dateFormatted.split("/");
        diceDay = dParts[0] ? String(dParts[0]).padStart(2, "0") : "—";
        const mIdx = parseInt(dParts[1], 10) - 1;
        if (!isNaN(mIdx) && monthNamesShort[mIdx]) {
          diceMonth = monthNamesShort[mIdx];
        }
      }

      return `
        <article class="case upcoming-case ${isUrgentToday ? "urgent-today" : ""}" data-court="${escapeHtml(court.toLowerCase())}">
          <button
            type="button"
            class="case-head"
            aria-expanded="false"
            onclick="toggleUpcomingAccordion(this)"
          >
            <!-- 1. DATE & URGENCY (Mobile Calendar Dice + Desktop Full Date) -->
            <div class="c-date-cell">
              <div class="c-date-dice ${daysBadgeClass}" aria-hidden="true">
                <span class="dice-month">${diceMonth}</span>
                <span class="dice-day">${diceDay}</span>
              </div>
              <span class="c-date-val">${dateFormatted}</span>
              <span class="c-urgency-pill ${daysBadgeClass}">
                ${daysBadgeIconSvg} <span>${daysLeftText}</span>
              </span>
            </div>

            <!-- 2. CASE TITLE -->
            <span class="c-title" title="${escapeHtml(caseName)}">${escapeHtml(caseName)}</span>

            <!-- 3. COURT FORUM -->
            <span class="c-court" title="${escapeHtml(court)}">
              <svg class="lucide lucide-landmark" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>
              <span>${escapeHtml(court)}</span>
            </span>

            <!-- 4. CASE NO & CATEGORY TAG -->
            <div class="c-meta-pill-group">
              <span class="c-no">#${escapeHtml(caseNum)}</span>
              <span class="tag ${tagClass}">${escapeHtml(tagLabel)}</span>
            </div>

            <!-- 5. CHEVRON ACCORDION TOGGLE -->
            <span class="chev" aria-hidden="true">
              <svg class="lucide lucide-chevron-down" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </span>
          </button>

          <!-- COLLAPSIBLE ACCORDION BODY (Daily Cause List Pattern) -->
          <!-- COLLAPSIBLE ACCORDION BODY (Executive Judicial Pattern) -->
          <div class="case-body">
            <div class="inner">
              <div class="body-pad">
                <!-- 3-COLUMN STRUCTURED JUDICIAL LEDGER -->
                <div class="meta-ledger-3col">
                  <!-- COLUMN 1: CLIENT & CONTACT -->
                  <div class="ledger-col ledger-client-col">
                    <div class="ledger-card-label">
                      <svg class="lucide lucide-user" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      <span>Client & Contact</span>
                    </div>
                    <div class="ledger-row main-client-row">
                      <span class="ledger-val client-name">${escapeHtml(clientName)}</span>
                    </div>
                    <div class="ledger-row phone-client-row">
                      ${cleanPhone ? `
                        <a href="tel:${escapeHtml(cleanPhone)}" class="client-phone-pill" title="Call ${escapeHtml(cleanPhone)}">
                          <svg class="lucide lucide-phone" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                          <span>${escapeHtml(formattedPhone || cleanPhone)}</span>
                        </a>
                      ` : `
                        <span class="client-phone-na">
                          <svg class="lucide lucide-phone-off" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"/><line x1="22" x2="2" y1="2" y2="22"/></svg>
                          <span>No Contact Phone</span>
                        </span>
                      `}
                    </div>
                  </div>

                  <!-- COLUMN 2: HEARING & STAGE -->
                  <div class="ledger-col ledger-stage-col">
                    <div class="ledger-card-label">
                      <svg class="lucide lucide-gavel" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8"/><path d="m16 16 6-6"/><path d="m8 8 6-6"/><path d="m9 7 8 8"/><path d="m21 11-8-8"/></svg>
                      <span>Proceeding Stage</span>
                    </div>
                    <div class="ledger-row main-stage-row">
                      <span class="ledger-val stage-text stage-highlight">${escapeHtml(stage)}</span>
                    </div>
                    <div class="ledger-row prev-stage-row">
                      <span class="ledger-lbl prev-lbl"><svg class="lucide lucide-history" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg> Previous:</span>
                      <span class="ledger-val prev-date-text">${escapeHtml(prevHearingDisplay)}</span>
                    </div>
                  </div>

                  <!-- COLUMN 3: CHAMBER REMARKS / ORDER NOTE -->
                  <div class="ledger-col ledger-remarks-col">
                    <div class="remarks-header">
                      <svg class="lucide lucide-file-text memo-ico" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
                      <span>Remarks / Order Note</span>
                    </div>
                    <div class="remarks-body ${remark ? "has-remark" : "empty-remark"}">
                      ${remark ? `"${escapeHtml(remark)}"` : "<em>No chamber remarks or order notes recorded.</em>"}
                    </div>
                  </div>

                  <!-- INTEGRATED ACTION FOOTER ROW (Pass-Over Slip removed; Update Date conditional on Today) -->
                  <div class="ledger-actions-row actions">
                    ${
                      isUrgentToday
                        ? `
                    <button
                      type="button"
                      class="act primary"
                      onclick="if (typeof openUpdateHearingForCase === 'function') openUpdateHearingForCase('${escapeHtml(caseNum)}'); else if (typeof openCaseHistoryModalByNo === 'function') openCaseHistoryModalByNo('${escapeHtml(caseNum)}');"
                      title="Update Next Date for Case ${escapeHtml(caseNum)}"
                      aria-label="Update Next Date for Case ${escapeHtml(caseNum)}"
                    >
                      <svg class="lucide lucide-calendar-plus" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M10 16h4"/><path d="M12 14v4"/></svg> <span class="act-text">Update Next Date</span>
                    </button>
                    `
                        : ""
                    }

                    <button
                      type="button"
                      class="act act-dossier"
                      onclick="if (typeof openCaseDetailsFullModal === 'function') openCaseDetailsFullModal('${escapeHtml(caseNum)}'); else if (typeof openCaseHistoryModalByNo === 'function') openCaseHistoryModalByNo('${escapeHtml(caseNum)}');"
                      title="Open Full Case Dossier"
                      aria-label="Open Full Dossier for Case ${escapeHtml(caseNum)}"
                    >
                      <svg class="lucide lucide-folder-open" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/></svg> <span class="act-text">Open Dossier</span>
                    </button>

                    ${cleanPhone ? `
                      <button
                        type="button"
                        class="act act-whatsapp"
                        onclick="sendWhatsAppHearingNotice('${escapeHtml(caseNum)}')"
                        title="Send WhatsApp Notice"
                        aria-label="Send WhatsApp Notice for ${escapeHtml(caseNum)}"
                      >
                        <svg class="lucide lucide-message-circle" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg> <span class="act-text">WhatsApp Notice</span>
                      </button>

                      <a
                        class="act act-call"
                        href="tel:${escapeHtml(cleanPhone)}"
                        title="Call Client: ${escapeHtml(cleanPhone)}"
                        aria-label="Call Client ${escapeHtml(clientName)}"
                      >
                        <svg class="lucide lucide-phone" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> <span class="act-text">Call Client</span>
                      </a>
                    ` : ""}
                  </div>
                </div>
              </div>
            </div>
          </article>
      `;
    }).join("");
  }

  // Render View 1 (B): Preserved Table Rows (100% Backwards & Headless Test Compatibility)
  if (tableBody) {
    tableBody.innerHTML = upcoming.map((c) => {
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

      const parsedHearing = parseFn(c.nextHearing);
      let daysBadgeClass = "";
      let isUrgentToday = false;

      if (parsedHearing) {
        const diffTime = parsedHearing.getTime() - todayZero.getTime();
        const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (daysLeft === 0) {
          daysBadgeClass = "today";
          isUrgentToday = true;
        } else if (daysLeft === 1) {
          daysBadgeClass = "tomorrow";
        }
      }

      return `
        <tr class="upcoming-row ${isUrgentToday ? "urgent-today" : ""}"
            tabindex="0"
            role="button"
            onclick="openCaseHistoryModalByNo('${escapeHtml(caseNum)}')"
            onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openCaseHistoryModalByNo('${escapeHtml(caseNum)}');}"
            title="Click to view hearing history & case details for ${escapeHtml(caseNum)}"
            aria-label="View hearing history for ${escapeHtml(caseNum)}">
          <!-- 1. DATE -->
          <td class="col-date">
            <div class="table-date-cell">
              <span class="table-date-val">${dateFormatted}</span>
              ${daysBadgeClass ? `
                <span class="table-status-pill ${daysBadgeClass}">
                  ${isUrgentToday ? '<svg class="lucide lucide-flame" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3.5z"/></svg> Today' : 'Tomorrow'}
                </span>
              ` : ''}
            </div>
          </td>

          <!-- 2. CASE NO -->
          <td class="col-caseno">
            <div class="table-caseno-cell">
              <span class="table-caseno-text" title="${escapeHtml(caseNum)}">
                ${escapeHtml(caseNum)}
              </span>
              <span class="table-type-tag ${rawType}">${typeLabel}</span>
            </div>
          </td>

          <!-- 3. CASE TITLE -->
          <td class="col-title">
            <div class="table-title-cell">
              <span class="table-case-title" title="${escapeHtml(caseName)}">
                ${escapeHtml(caseName)}
              </span>
            </div>
          </td>

          <!-- 4. COURT -->
          <td class="col-court">
            <div class="table-court-cell" title="${escapeHtml(court)}">
              <span>${escapeHtml(court)}</span>
            </div>
          </td>

          <!-- 5. STAGE -->
          <td class="col-stage">
            <span class="highlight-stage" title="${escapeHtml(stage)}">
              ${escapeHtml(stage)}
            </span>
          </td>

          <!-- 6. CLIENT -->
          <td class="col-client">
            <div class="table-client-cell">
              <span class="table-client-name" title="${escapeHtml(clientName)}">
                ${escapeHtml(clientName)}
              </span>
              ${clientPhone ? `
                <a href="tel:${escapeHtml(clientPhone)}" class="table-client-phone" onclick="event.stopPropagation();" title="Call ${escapeHtml(clientPhone)}">
                  ${escapeHtml(clientPhone)}
                </a>
              ` : ""}
            </div>
          </td>

          <!-- 7. ACTIONS -->
          <td class="col-actions">
            <div class="table-actions-group">
              <button type="button" class="tbl-action-btn proceedings" onclick="event.stopPropagation(); openCaseHistoryModalByNo('${escapeHtml(caseNum)}')" title="View Case Dossier & Hearing History" aria-label="View case dossier and hearing history for ${escapeHtml(caseNum)}">
                <svg class="lucide lucide-folder-open" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/></svg>
              </button>
              <button type="button" class="tbl-action-btn notice" onclick="event.stopPropagation(); sendWhatsAppHearingNotice('${escapeHtml(caseNum)}')" title="Dispatch WhatsApp Notice" aria-label="Send WhatsApp notice for ${escapeHtml(caseNum)}">
                <svg class="lucide lucide-message-circle" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join("");
  }

  // Auto-apply current view mode if set
  if (typeof setUpcomingViewMode === "function") {
    let modeToApply = currentUpcomingViewMode || "table";
    try {
      if (typeof localStorage !== "undefined") {
        const saved = localStorage.getItem("casebook_upcoming_view_mode");
        if (saved === "table" || saved === "cards") {
          modeToApply = saved;
        } else if (typeof window !== "undefined" && window.innerWidth < 992) {
          modeToApply = "cards";
        }
      }
    } catch (e) {}
    setUpcomingViewMode(modeToApply);
  }
}

if (typeof renderUpcomingWeekHearings !== "undefined")
  window.renderUpcomingWeekHearings = renderUpcomingWeekHearings;
