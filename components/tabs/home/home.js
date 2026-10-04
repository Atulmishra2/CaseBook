window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs['home'] = `                <div class="home-dashboard-container">
                    <!-- Hero Welcome Header Card -->
                    <div class="home-hero-card">
                        <div class="hero-main-content">
                            <div class="hero-left-section">
                                <div class="hero-emblem-badge"><i class="fa-solid fa-scale-balanced"></i></div>
                                <div class="hero-text-block">
                                    <div class="hero-greeting-row">
                                        <h1 class="hero-greeting" id="homeHeroGreeting">Good Evening, Advocate Atul Mishra</h1>
                                        <div class="hero-status-pill connected" id="homeHeroStatus">
                                            <span class="live-dot" id="homeHeroStatusDot"></span>
                                            <span id="homeHeroStatusText">Supabase Cloud Connected</span>
                                        </div>
                                    </div>
                                    <p class="hero-subtext" id="homeHeroDate">Chambers Legal Practice Management & Real-Time Case Tracker</p>
                                </div>
                            </div>
                            <div class="hero-right-section">
                                <div class="hero-actions-bar">
                                    <button type="button" class="hero-btn-primary" onclick="showTab('add')"><i class="fa-solid fa-plus"></i> New Case</button>
                                    <button type="button" class="hero-btn-secondary" onclick="showTab('hearing')"><i class="fa-solid fa-calendar-plus"></i> Forward Hearing</button>
                                    <button type="button" class="hero-btn-secondary" onclick="showTab('causelist')"><i class="fa-solid fa-list-check"></i> Daily Cause List</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Executive 6 KPI Rectangular Cards (Materialize CSS Grid: 3,3 Desktop | 1-by-1 Mobile) -->
                    <div class="row kpi-materialize-row">
                        <!-- 1. Total Cases -->
                        <div class="col s12 m6 l4">
                            <div class="card kpi-rect-card kpi-theme-total hoverable" onclick="showTab('all', event)">
                                <div class="card-content">
                                    <div class="kpi-rect-top">
                                        <div class="kpi-rect-icon-wrap"><i class="fa-solid fa-folder-open"></i></div>
                                        <div class="kpi-rect-meta">
                                            <span class="kpi-rect-badge">All Categories</span>
                                        </div>
                                    </div>
                                    <div class="kpi-rect-content-grid">
                                        <div class="kpi-rect-metric-col">
                                            <div class="kpi-rect-title">Total Case Records</div>
                                            <div class="kpi-rect-val-row">
                                                <div class="kpi-rect-value" id="homeTotalCases">0</div>
                                                <div class="kpi-aesthetic-chip chip-total"><i class="fa-solid fa-database"></i> <span>Repository</span></div>
                                            </div>
                                            <div class="kpi-rect-sub" id="homePortfolioBreakdown">
                                                <div class="breakdown-inline-row">
                                                    <span>0 Civil</span>
                                                    <span class="breakdown-dot">â€¢</span>
                                                    <span>0 Criminal</span>
                                                    <span class="breakdown-dot">â€¢</span>
                                                    <span>0 Revenue</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-action">
                                    <a href="#" onclick="event.stopPropagation(); showTab('all', event)">View All Cases <i class="fa-solid fa-arrow-right"></i></a>
                                </div>
                            </div>
                        </div>

                        <!-- 2. Today's Court Cases -->
                        <div class="col s12 m6 l4">
                            <div class="card kpi-rect-card kpi-theme-today hoverable" onclick="showTab('causelist', event)">
                                <div class="card-content">
                                    <div class="kpi-rect-top">
                                        <div class="kpi-rect-icon-wrap"><i class="fa-solid fa-gavel"></i></div>
                                        <div class="kpi-rect-meta">
                                            <span class="kpi-rect-badge live">Live Today</span>
                                        </div>
                                    </div>
                                    <div class="kpi-rect-content-grid">
                                        <div class="kpi-rect-metric-col">
                                            <div class="kpi-rect-title">Today's Court Cases</div>
                                            <div class="kpi-rect-val-row">
                                                <div class="kpi-rect-value" id="homeTodayCases">0</div>
                                                <div class="kpi-aesthetic-chip chip-today"><span class="aesthetic-pulse-dot"></span> <span>Listing</span></div>
                                            </div>
                                            <div class="kpi-rect-sub">Cases listed for today</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-action">
                                    <a href="#" onclick="event.stopPropagation(); showTab('causelist', event)">Daily Cause List <i class="fa-solid fa-arrow-right"></i></a>
                                </div>
                            </div>
                        </div>

                        <!-- 3. Upcoming (7 Days) -->
                        <div class="col s12 m6 l4">
                            <div class="card kpi-rect-card kpi-theme-upcoming hoverable" onclick="showTab('upcoming', event)">
                                <div class="card-content">
                                    <div class="kpi-rect-top">
                                        <div class="kpi-rect-icon-wrap"><i class="fa-solid fa-calendar-week"></i></div>
                                        <div class="kpi-rect-meta">
                                            <span class="kpi-rect-badge">Next 7 Days</span>
                                        </div>
                                    </div>
                                    <div class="kpi-rect-content-grid">
                                        <div class="kpi-rect-metric-col">
                                            <div class="kpi-rect-title">Upcoming Hearings</div>
                                            <div class="kpi-rect-val-row">
                                                <div class="kpi-rect-value" id="homeUpcomingCases">0</div>
                                                <div class="kpi-aesthetic-chip chip-upcoming"><i class="fa-solid fa-calendar-check"></i> <span>Scheduled</span></div>
                                            </div>
                                            <div class="kpi-rect-sub">Scheduled within upcoming week</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-action">
                                    <a href="#" onclick="event.stopPropagation(); showTab('upcoming', event)">View Schedule <i class="fa-solid fa-arrow-right"></i></a>
                                </div>
                            </div>
                        </div>

                        <!-- 4. Active Pending Cases -->
                        <div class="col s12 m6 l4">
                            <div class="card kpi-rect-card kpi-theme-pending hoverable" onclick="showTab('search', event)">
                                <div class="card-content">
                                    <div class="kpi-rect-top">
                                        <div class="kpi-rect-icon-wrap"><i class="fa-solid fa-hourglass-half"></i></div>
                                        <div class="kpi-rect-meta">
                                            <span class="kpi-rect-badge">In Progress</span>
                                        </div>
                                    </div>
                                    <div class="kpi-rect-content-grid">
                                        <div class="kpi-rect-metric-col">
                                            <div class="kpi-rect-title">Active Pending Cases</div>
                                            <div class="kpi-rect-val-row">
                                                <div class="kpi-rect-value" id="homePendingCases">0</div>
                                                <div class="kpi-aesthetic-chip chip-pending"><i class="fa-solid fa-chart-pie"></i> <span>Active File</span></div>
                                            </div>
                                            <div class="kpi-rect-sub" id="homePendingPercent">0% of total caseload</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-action">
                                    <a href="#" onclick="event.stopPropagation(); showTab('search', event)">Explore Active <i class="fa-solid fa-arrow-right"></i></a>
                                </div>
                            </div>
                        </div>

                        <!-- 5. Undated Cases -->
                        <div class="col s12 m6 l4">
                            <div class="card kpi-rect-card kpi-theme-undated hoverable" onclick="showTab('undated', event)">
                                <div class="card-content">
                                    <div class="kpi-rect-top">
                                        <div class="kpi-rect-icon-wrap"><i class="fa-solid fa-circle-question"></i></div>
                                        <div class="kpi-rect-meta">
                                            <span class="kpi-rect-badge alert">Needs Date</span>
                                        </div>
                                    </div>
                                    <div class="kpi-rect-content-grid">
                                        <div class="kpi-rect-metric-col">
                                            <div class="kpi-rect-title">Undated Cases</div>
                                            <div class="kpi-rect-val-row">
                                                <div class="kpi-rect-value" id="homeUndatedCases">0</div>
                                                <div class="kpi-aesthetic-chip chip-undated"><i class="fa-solid fa-bell"></i> <span>Priority</span></div>
                                            </div>
                                            <div class="kpi-rect-sub">Awaiting hearing fixture</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-action">
                                    <a href="#" onclick="event.stopPropagation(); showTab('undated', event)">Assign Dates <i class="fa-solid fa-arrow-right"></i></a>
                                </div>
                            </div>
                        </div>

                        <!-- 6. Disposed / Resolved -->
                        <div class="col s12 m6 l4">
                            <div class="card kpi-rect-card kpi-theme-disposed hoverable" onclick="showTab('disposed', event)">
                                <div class="card-content">
                                    <div class="kpi-rect-top">
                                        <div class="kpi-rect-icon-wrap"><i class="fa-solid fa-circle-check"></i></div>
                                        <div class="kpi-rect-meta">
                                            <span class="kpi-rect-badge success">Completed</span>
                                        </div>
                                    </div>
                                    <div class="kpi-rect-content-grid">
                                        <div class="kpi-rect-metric-col">
                                            <div class="kpi-rect-title">Disposed / Resolved</div>
                                            <div class="kpi-rect-val-row">
                                                <div class="kpi-rect-value" id="homeDisposedCases">0</div>
                                                <div class="kpi-aesthetic-chip chip-disposed"><i class="fa-solid fa-circle-check"></i> <span>Archived</span></div>
                                            </div>
                                            <div class="kpi-rect-sub" id="homeDisposedPercent">0% Resolution Rate</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-action">
                                    <a href="#" onclick="event.stopPropagation(); showTab('disposed', event)">View Archives <i class="fa-solid fa-arrow-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Today's Listed Court Appearances Board (Full-Width Executive Card) -->
                    <div class="home-panel-card home-today-board-card">
                        <div class="home-panel-header">
                            <div class="panel-title-group">
                                <span class="panel-icon court-icon"><iconify-icon icon="lucide:scale"></iconify-icon></span>
                                <h3 class="panel-main-title">Today's Court Appearance Board</h3>
                            </div>
                            <button type="button" class="panel-action-btn today-cause-list-btn" onclick="showTab('causelist')">
                                <span>Open Daily Cause List</span>
                                <iconify-icon icon="lucide:arrow-right"></iconify-icon>
                            </button>
                        </div>

                        <!-- Dedicated Clean Judicial Empty State (Shown when 0 appearances today) -->
                        <div id="homeTodayEmptyState" class="today-hero-empty-state" style="display: none;">
                            <div class="today-empty-icon"><iconify-icon icon="lucide:scale"></iconify-icon></div>
                            <h4>No appearances scheduled today</h4>
                            <p>You're all clear for today.</p>
                            <button type="button" class="today-empty-btn" onclick="showTab('upcoming')">
                                <span>View Upcoming Appearances</span>
                                <iconify-icon icon="lucide:arrow-right"></iconify-icon>
                            </button>
                        </div>

                        <!-- Active Appearances List (Shown when hearings exist) -->
                        <div id="homeTodayListWrapper" class="home-today-list">
                            <div class="home-today-loading">Loading today's court matters...</div>
                        </div>
                    </div>

                    <!-- Bottom Balanced Grid: Priority Tasks & Chambers Directory -->
                    <div class="home-bottom-grid">
                        <!-- Priority Tasks Board -->
                        <div class="home-panel-card home-tasks-panel-card">
                            <div class="home-panel-header">
                                <div class="panel-title-group">
                                    <span class="panel-icon tasks-icon"><iconify-icon icon="lucide:check-square"></iconify-icon></span>
                                    <h3 class="panel-main-title">Priority Tasks &amp; Deadlines</h3>
                                </div>
                                <button type="button" class="panel-action-btn" onclick="showTab('todo')">
                                    <span>Manage Tasks</span>
                                    <iconify-icon icon="lucide:arrow-right"></iconify-icon>
                                </button>
                            </div>
                            <div id="homeTasksListContainer" class="home-tasks-list">
                                <div class="home-empty-tasks">
                                    <iconify-icon icon="lucide:check-circle-2" style="font-size: 26px; color: #10B981;"></iconify-icon>
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
                                    <span class="panel-icon tools-icon"><iconify-icon icon="lucide:landmark"></iconify-icon></span>
                                    <h3 class="panel-main-title">Quick Registers &amp; Tools</h3>
                                </div>
                                <button type="button" class="panel-action-btn" onclick="showTab('all')">
                                    <span>All Cases</span>
                                    <iconify-icon icon="lucide:arrow-right"></iconify-icon>
                                </button>
                            </div>
                            <div class="shortcuts-grid">
                                <div class="shortcut-box" onclick="showTab('civil')">
                                    <span class="shortcut-icon"><iconify-icon icon="lucide:scale"></iconify-icon></span>
                                    <div class="shortcut-info">
                                        <strong>Civil Register</strong>
                                        <small id="shortcutCivilCount">0 Cases</small>
                                    </div>
                                    <span class="shortcut-arrow"><iconify-icon icon="lucide:arrow-right"></iconify-icon></span>
                                </div>
                                <div class="shortcut-box" onclick="showTab('criminal')">
                                    <span class="shortcut-icon"><iconify-icon icon="lucide:shield-alert"></iconify-icon></span>
                                    <div class="shortcut-info">
                                        <strong>Criminal Register</strong>
                                        <small id="shortcutCriminalCount">0 Cases</small>
                                    </div>
                                    <span class="shortcut-arrow"><iconify-icon icon="lucide:arrow-right"></iconify-icon></span>
                                </div>
                                <div class="shortcut-box" onclick="showTab('revenue')">
                                    <span class="shortcut-icon"><iconify-icon icon="lucide:landmark"></iconify-icon></span>
                                    <div class="shortcut-info">
                                        <strong>Revenue Register</strong>
                                        <small id="shortcutRevenueCount">0 Cases</small>
                                    </div>
                                    <span class="shortcut-arrow"><iconify-icon icon="lucide:arrow-right"></iconify-icon></span>
                                </div>
                                <div class="shortcut-box" onclick="showTab('calendar')">
                                    <span class="shortcut-icon"><iconify-icon icon="lucide:calendar"></iconify-icon></span>
                                    <div class="shortcut-info">
                                        <strong>Court Calendar</strong>
                                        <small>Monthly diary</small>
                                    </div>
                                    <span class="shortcut-arrow"><iconify-icon icon="lucide:arrow-right"></iconify-icon></span>
                                </div>
                                <div class="shortcut-box" onclick="showTab('paisa')">
                                    <span class="shortcut-icon" style="color: #059669; background: rgba(16, 185, 129, 0.15);"><iconify-icon icon="lucide:wallet"></iconify-icon></span>
                                    <div class="shortcut-info">
                                        <strong>Paisa Manager</strong>
                                        <small id="shortcutAccountsToday">Finance &amp; Khata</small>
                                    </div>
                                    <span class="shortcut-arrow"><iconify-icon icon="lucide:arrow-right"></iconify-icon></span>
                                </div>
                            </div>
                        </div>

                        <!-- Undated Cases Analysis & Graph Card -->
                        <div class="home-panel-card undated-analysis-card">
                            <div class="home-panel-header">
                                <div class="panel-title-group">
                                    <span class="panel-icon chart-icon"><iconify-icon icon="lucide:pie-chart"></iconify-icon></span>
                                    <h3 class="panel-main-title">Undated Cases Tracker</h3>
                                </div>
                                <button type="button" class="panel-action-btn" onclick="showTab('undated')">
                                    <span>View Undated</span>
                                    <iconify-icon icon="lucide:arrow-right"></iconify-icon>
                                </button>
                            </div>
                            <div class="undated-chart-content">
                                <div class="undated-donut-wrap">
                                    <svg class="undated-donut-svg" viewBox="0 0 100 100">
                                        <circle class="donut-bg" cx="50" cy="50" r="38" />
                                        <circle id="donutSegmentCivil" class="donut-segment segment-civil" cx="50" cy="50" r="38" />
                                        <circle id="donutSegmentCriminal" class="donut-segment segment-criminal" cx="50" cy="50" r="38" />
                                        <circle id="donutSegmentRevenue" class="donut-segment segment-revenue" cx="50" cy="50" r="38" />
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
                                            <div id="undatedCriminalBar" class="bar-fill fill-criminal" style="width: 0%;"></div>
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
                            </div>
                            <div class="undated-card-footer">
                                <span class="undated-footer-alert" id="undatedFooterNotice"><iconify-icon icon="lucide:alert-triangle"></iconify-icon> 0 matters require hearing dates</span>
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
  const greetingEl = document.getElementById('homeHeroGreeting');
  const dateEl = document.getElementById('homeHeroDate');

  const totalEl = document.getElementById('homeTotalCases');
  const breakdownEl = document.getElementById('homePortfolioBreakdown');
  const todayEl = document.getElementById('homeTodayCases');
  const upcomingEl = document.getElementById('homeUpcomingCases');
  const pendingEl = document.getElementById('homePendingCases');
  const pendingPercentEl = document.getElementById('homePendingPercent');
  const undatedEl = document.getElementById('homeUndatedCases');
  const disposedEl = document.getElementById('homeDisposedCases');
  const disposedPercentEl = document.getElementById('homeDisposedPercent');

  const shortcutCivil = document.getElementById('shortcutCivilCount');
  const shortcutCriminal = document.getElementById('shortcutCriminalCount');
  const shortcutRevenue = document.getElementById('shortcutRevenueCount');

  const todayListWrapper = document.getElementById('homeTodayListWrapper');
  const todayBoardDate = document.getElementById('homeTodayBoardDate');
  const tasksContainer = document.getElementById('homeTasksListContainer');
  const todayEmptyState = document.getElementById('homeTodayEmptyState');

  // 1. Dynamic Greeting
  const now = new Date();
  const hours = now.getHours();
  let timeGreeting = 'Good Day';
  if (hours < 12) timeGreeting = 'Good Morning';
  else if (hours < 17) timeGreeting = 'Good Afternoon';
  else timeGreeting = 'Good Evening';

  const daysOfWeek = ['Sunday (रविवार)', 'Monday (सोमवार)', 'Tuesday (मंगलवार)', 'Wednesday (बुधवार)', 'Thursday (गुरुवार)', 'Friday (शुक्रवार)', 'Saturday (शनिवार)'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayName = daysOfWeek[now.getDay()];
  const formattedDate = `${dayName}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

  if (greetingEl) greetingEl.textContent = `${timeGreeting}, Advocate Atul Mishra`;
  if (dateEl) dateEl.textContent = `${formattedDate} • Chambers Legal Practice Management`;
  if (todayBoardDate) todayBoardDate.textContent = `Appearances for ${dayName.split(' ')[0]}, ${now.getDate()} ${months[now.getMonth()]}`;

  // 2. Calculations & Robust Date Matching
  // Standardized Jurisdiction Classifier for Case Records (Civil, Criminal, Revenue)
  const getJurisdictionCategory = (c) => {
    const rawType = (c.caseType || '').toLowerCase().trim();
    // 1. Criminal Side
    if (
      ['criminal', 'state', 'complaint', 'misc_criminal', 'misccriminal'].includes(rawType) ||
      Boolean(c.criminalCaseNumber) ||
      Boolean(c.accusedName) ||
      Boolean(c.victimName) ||
      (c.criminalCourtName && String(c.criminalCourtName).trim() && String(c.criminalCourtName).toLowerCase() !== 'district court')
    ) {
      return 'criminal';
    }
    // 2. Revenue Side
    if (
      rawType === 'revenue' ||
      (c.courtName && c.courtName.toLowerCase().includes('revenue')) ||
      (c.caseNo && (c.caseNo.toLowerCase().includes('rev') || c.caseNo.toLowerCase().includes('r.c.')))
    ) {
      return 'revenue';
    }
    // 3. Civil Side (Civil, Family, Misc Civil, Default)
    return 'civil';
  };

  const todayZero = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
  const in7Days = new Date(todayZero.getTime() + (7 * 24 * 60 * 60 * 1000) + (23 * 60 * 60 * 1000));

  const totalCount = allCaseRecords.length;
  const civilCount = allCaseRecords.filter(c => getJurisdictionCategory(c) === 'civil').length;
  const criminalCount = allCaseRecords.filter(c => getJurisdictionCategory(c) === 'criminal').length;
  const revenueCount = allCaseRecords.filter(c => getJurisdictionCategory(c) === 'revenue').length;

  const todayCases = allCaseRecords.filter(c => {
    if (!c.nextHearing || c.nextHearing === '—' || c.nextHearing === 'null' || !c.nextHearing.trim()) return false;
    const parsed = parseDateString(c.nextHearing);
    if (!parsed) return false;
    return parsed.getFullYear() === now.getFullYear() &&
           parsed.getMonth() === now.getMonth() &&
           parsed.getDate() === now.getDate();
  });

  const upcomingCases = allCaseRecords.filter(c => {
    if (!c.nextHearing || c.nextHearing === '—' || c.nextHearing === 'null' || !c.nextHearing.trim()) return false;
    if ((c.caseStatus || '').toLowerCase().includes('dispose')) return false;
    const parsed = parseDateString(c.nextHearing);
    if (!parsed) return false;
    const hTime = parsed.getTime();
    return hTime >= todayZero.getTime() && hTime <= in7Days.getTime();
  });

  const disposedCount = allCaseRecords.filter(c => (c.caseStatus || '').toLowerCase().includes('dispose')).length;
  const pendingCount = totalCount - disposedCount;
  const undatedCount = allCaseRecords.filter(c => {
    if ((c.caseStatus || '').toLowerCase().includes('dispose')) return false; // disposed = closed, not undated
    const nh = c.nextHearing;
    if (!nh || nh === '—' || nh === 'null' || !String(nh).trim()) return true;
    const iso = toISODate(nh);
    return !iso || iso < new Date().toISOString().split('T')[0];
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
  const undatedCasesList = allCaseRecords.filter(c => {
    if ((c.caseStatus || '').toLowerCase().includes('dispose')) return false; // disposed = closed, not undated
    const nh = c.nextHearing;
    if (!nh || nh === '—' || nh === 'null' || !String(nh).trim() || String(nh).toLowerCase() === 'undated') return true;
    const iso = toISODate(nh);
    return !iso || iso < new Date().toISOString().split('T')[0];
  });
  const undatedTotal = undatedCasesList.length;
  const undatedCivil = undatedCasesList.filter(c => getJurisdictionCategory(c) === 'civil').length;
  const undatedCriminal = undatedCasesList.filter(c => getJurisdictionCategory(c) === 'criminal').length;
  const undatedRevenue = undatedCasesList.filter(c => getJurisdictionCategory(c) === 'revenue').length;

  const undatedCivilPct = undatedTotal > 0 ? Math.round((undatedCivil / undatedTotal) * 100) : 0;
  const undatedCriminalPct = undatedTotal > 0 ? Math.round((undatedCriminal / undatedTotal) * 100) : 0;
  const undatedRevenuePct = undatedTotal > 0 ? Math.max(0, 100 - undatedCivilPct - undatedCriminalPct) : 0;

  const undatedGraphTotalEl = document.getElementById('undatedGraphTotal');
  const undatedCivilCountEl = document.getElementById('undatedCivilCount');
  const undatedCriminalCountEl = document.getElementById('undatedCriminalCount');
  const undatedRevenueCountEl = document.getElementById('undatedRevenueCount');
  const undatedCivilBarEl = document.getElementById('undatedCivilBar');
  const undatedCriminalBarEl = document.getElementById('undatedCriminalBar');
  const undatedRevenueBarEl = document.getElementById('undatedRevenueBar');
  const undatedFooterNoticeEl = document.getElementById('undatedFooterNotice');

  if (undatedGraphTotalEl) undatedGraphTotalEl.textContent = String(undatedTotal);
  if (undatedCivilCountEl) undatedCivilCountEl.textContent = `${undatedCivil} Cases (${undatedCivilPct}%)`;
  if (undatedCriminalCountEl) undatedCriminalCountEl.textContent = `${undatedCriminal} Cases (${undatedCriminalPct}%)`;
  if (undatedRevenueCountEl) undatedRevenueCountEl.textContent = `${undatedRevenue} Cases (${undatedRevenuePct}%)`;

  if (undatedCivilBarEl) undatedCivilBarEl.style.width = `${undatedCivilPct}%`;
  if (undatedCriminalBarEl) undatedCriminalBarEl.style.width = `${undatedCriminalPct}%`;
  if (undatedRevenueBarEl) undatedRevenueBarEl.style.width = `${undatedRevenuePct}%`;

  if (undatedFooterNoticeEl) {
    undatedFooterNoticeEl.textContent = undatedTotal === 0 
      ? '✅ All active cases have scheduled hearings' 
      : `⚡ ${undatedTotal} ${undatedTotal === 1 ? 'matter requires' : 'matters require'} hearing dates`;
  }

  // SVG Donut segments (circumference = 2 * PI * 38 ≈ 238.76)
  const donutCircumference = 238.76;
  const segCivil = document.getElementById('donutSegmentCivil');
  const segCrim = document.getElementById('donutSegmentCriminal');
  const segRev = document.getElementById('donutSegmentRevenue');

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
      segCivil.style.strokeDashoffset = '0';

      segCrim.style.strokeDasharray = `${lenCrim} ${donutCircumference - lenCrim}`;
      segCrim.style.strokeDashoffset = `-${lenCivil}`;

      segRev.style.strokeDasharray = `${lenRev} ${donutCircumference - lenRev}`;
      segRev.style.strokeDashoffset = `-${lenCivil + lenCrim}`;
    }
  }

  // 5. Populate Today's Court Appearance Board Table
  if (todayCases.length === 0) {
    if (todayEmptyState) todayEmptyState.style.display = 'flex';
    if (todayListWrapper) todayListWrapper.style.display = 'none';
  } else {
    if (todayEmptyState) todayEmptyState.style.display = 'none';
    if (todayListWrapper) todayListWrapper.style.display = 'flex';
    // Sort by court name and then case number
    todayCases.sort((a, b) => {
      const courtA = (a.courtName || a.criminalCourtName || '').toUpperCase();
      const courtB = (b.courtName || b.criminalCourtName || '').toUpperCase();
      if (courtA !== courtB) return courtA.localeCompare(courtB);
      const numA = (a.caseNo || a.criminalCaseNumber || '').toUpperCase();
      const numB = (b.caseNo || b.criminalCaseNumber || '').toUpperCase();
      return numA.localeCompare(numB);
    });

    let html = '';
    todayCases.forEach((c, idx) => {
      const caseNumber = c.caseNo || c.criminalCaseNumber || '—';
      const caseName = c.caseName || (c.plaintiff ? `${c.plaintiff} vs ${c.defendant}` : (c.victimName ? `${c.victimName} vs ${c.accusedName}` : '—'));
      const courtName = c.courtName || c.criminalCourtName || 'District Court';
      const caseType = (c.caseType || 'civil').toLowerCase();
      const stage = c.hearingProcess || c.process || 'Listed Hearing';
      const clientName = c.clientName || c.criminalClientName || '—';
      const clientPhone = c.clientNumber || c.criminalClientNumber || '';

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
                <span><i class="fa-solid fa-user"></i> ${escapeHtml(clientName)}${clientPhone ? ` • <a href="tel:${escapeHtml(clientPhone)}" style="color: #047857; text-decoration: none; font-weight: 600;" title="Call Client">${escapeHtml(clientPhone)}</a>` : ''}</span>
              </div>
            </div>
          </div>
          <div class="home-today-card-actions">
            <button type="button" class="table-view-btn today-details-btn" onclick="openCaseHistoryModalByNo('${escapeHtml(caseNumber)}')" title="View proceedings details"><i class="fa-solid fa-scroll"></i><span class="btn-text"> Details</span></button>
            <button type="button" class="table-view-btn update-hearing-btn today-forward-btn" onclick="openUpdateHearingForCase('${escapeHtml(caseNumber)}')" title="Forward next hearing date"><i class="fa-solid fa-calendar-plus"></i><span class="btn-text"> Forward</span></button>
            ${clientPhone ? `<a href="tel:${escapeHtml(clientPhone)}" class="table-view-btn call-btn today-call-btn" title="Call Client directly: ${escapeHtml(clientPhone)}"><i class="fa-solid fa-phone"></i></a>` : ''}
            <button type="button" class="table-view-btn whatsapp-btn today-whatsapp-btn" onclick="sendWhatsAppHearingNotice('${escapeHtml(caseNumber)}')" title="WhatsApp notice to client"><i class="fa-brands fa-whatsapp"></i></button>
          </div>
        </div>
      `;
    });
    if (todayListWrapper) todayListWrapper.innerHTML = html;
  }

  // 6. Populate Priority Tasks Widget
  if (tasksContainer) {
    const pendingTasks = (caseTasks || []).filter(t => (t.status || '').toLowerCase() !== 'done');
    const urgentCount = pendingTasks.filter(t => (t.priority || '').toLowerCase() === 'high').length;
    
    // Update footer status bar
    const footerStatusEl = document.getElementById('homeTasksFooterStatus');
    if (footerStatusEl) {
      if (pendingTasks.length === 0) {
        footerStatusEl.textContent = 'All tasks completed';
      } else {
        footerStatusEl.innerHTML = `<strong>${pendingTasks.length}</strong> Pending Active${urgentCount > 0 ? ` • <span style="color: #EF4444; font-weight: 700;">${urgentCount} Urgent</span>` : ''}`;
      }
    }

    if (pendingTasks.length === 0) {
      tasksContainer.innerHTML = `
        <div class="home-empty-tasks">
          <iconify-icon icon="lucide:check-circle-2" style="font-size: 28px; color: #10B981; margin-bottom: 6px;"></iconify-icon>
          <p style="margin: 0 0 10px 0; font-size: 13px; font-weight: 600;">All tasks and deadlines are up-to-date.</p>
          <button type="button" class="tasks-footer-add-btn" onclick="showTab('todo')">
            <iconify-icon icon="lucide:plus"></iconify-icon>
            <span>Add New Task</span>
          </button>
        </div>
      `;
    } else {
      let taskHtml = '';
      pendingTasks.forEach(t => {
        const priority = (t.priority || 'normal').toLowerCase();
        const priorityClass = priority === 'high' ? 'priority-high' : (priority === 'medium' ? 'priority-medium' : 'priority-normal');

        taskHtml += `
          <div class="home-task-card ${priorityClass}">
            <div class="home-task-info">
              <span class="home-task-title">${escapeHtml(t.taskTitle || t.task || 'Legal Action')}</span>
              <span class="home-task-meta">Case: <strong>${escapeHtml(t.caseNo || 'General')}</strong> • Due: ${formatDateDMY(t.deadlineDate || t.deadline)}</span>
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

  if (typeof updateAccountsBadgesAndShortcut === 'function') {
    updateAccountsBadgesAndShortcut();
  }
}

if (typeof renderHomeDashboard !== 'undefined') window.renderHomeDashboard = renderHomeDashboard;

// ==============================================================================
// Dashboard Tables Rendering
// ==============================================================================

function renderCivilCasesTable(cases = null) {
  const tbody = document.querySelector('#civilCasesTable tbody');
  const countEl = document.getElementById('civilCount');
  if (!tbody) return;

  const list = cases || allCaseRecords.filter(c => c.caseType === 'civil');

  if (!list || list.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="no-results">No civil cases found.</td></tr>';
    if (countEl) countEl.textContent = '0';
    return;
  }

  tbody.innerHTML = list.map((item) => {
    const caseNumber = getSafeValue(item.caseNo || item.case_number, '—');
    const caseName = getSafeValue(item.caseName || (item.plaintiff ? `${item.plaintiff} vs ${item.defendant}` : '—'), '—');
    const clientName = getSafeValue(item.clientName || item.client, '—');
    const nextHearing = formatDateDMY(item.nextHearing);
    const filingDate = formatDateDMY(item.filingDate);
    const isDisposed = (item.caseStatus || '').toLowerCase().includes('dispose');
    const statusBadge = isDisposed
      ? '<span class="status-badge disposed"><i class="fa-solid fa-circle-check"></i> Disposed</span>'
      : '<span class="status-badge pending"><i class="fa-solid fa-clock"></i> Pending</span>';

    const partiesRemark = item.remark || item.remarks || '';
    const partiesRemarkHtml = renderCaseTableRemarks(partiesRemark, caseNumber, caseName);

    const disposalComment = item.disposalComment || item.disposal_comment || '';
    const disposalCommentHtml = disposalComment
      ? `<span class="case-disposal-clamp" title="${escapeHtml(disposalComment)}"><i class="fa-solid fa-scale-balanced"></i>️ ${escapeHtml(disposalComment)}</span>`
      : (isDisposed && remarksToPlainText(partiesRemark) ? `<span class="case-disposal-clamp" title="${escapeHtml(remarksToPlainText(partiesRemark))}"><i class="fa-solid fa-scale-balanced"></i>️ ${escapeHtml(remarksToPlainText(partiesRemark))}</span>` : '<span style="color: #94a3b8;">—</span>');

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
  }).join('');

  if (countEl) countEl.textContent = String(list.length);
}

function refreshAllCaseTables() {
  try {
  // 1. Civil Cases Table & Count
  const civilCases = allCaseRecords.filter(c => c.caseType === 'civil');
  renderCivilCasesTable(civilCases);

  // 2. State Cases Table & Count (Criminal / State of U.P.)
  const stateCases = allCaseRecords.filter(c => c.caseType === 'state' || c.caseType === 'criminal');
  const stateTable = document.querySelector('#stateCasesTable tbody');
  const legacyCriminalTable = document.querySelector('#criminalCasesTable tbody');
  const stateCountEl = document.getElementById('stateCount');
  const criminalCountEl = document.getElementById('criminalCount');

  if (stateCountEl) stateCountEl.textContent = String(stateCases.length);
  if (criminalCountEl) criminalCountEl.textContent = String(stateCases.length);

  const renderStateRow = c => {
    const isDisposed = (c.caseStatus || '').toLowerCase().includes('dispose');
    const statusBadge = isDisposed
      ? '<span class="status-badge disposed"><i class="fa-solid fa-circle-check"></i> Disposed</span>'
      : '<span class="status-badge pending"><i class="fa-solid fa-clock"></i> Pending</span>';
    const partiesRemark = c.remark || c.remarks || '';
    const caseNumber = c.caseNo || c.criminalCaseNumber || '—';
    const caseName = c.caseName || (c.firstParty ? `${c.firstParty} vs ${c.accusedName}` : (c.victimName ? `${c.victimName} vs ${c.accusedName}` : '—'));
    const partiesRemarkHtml = renderCaseTableRemarks(partiesRemark, caseNumber, caseName);
    const disposalComment = c.disposalComment || c.disposal_comment || '';
    const disposalCommentHtml = disposalComment
      ? `<span class="case-disposal-clamp" title="${escapeHtml(disposalComment)}"><i class="fa-solid fa-scale-balanced"></i>️ ${escapeHtml(disposalComment)}</span>`
      : (isDisposed && remarksToPlainText(partiesRemark) ? `<span class="case-disposal-clamp" title="${escapeHtml(remarksToPlainText(partiesRemark))}"><i class="fa-solid fa-scale-balanced"></i>️ ${escapeHtml(remarksToPlainText(partiesRemark))}</span>` : '<span style="color: #94a3b8;">—</span>');

    return `
      <tr>
        <td><strong>${escapeHtml(caseNumber)}</strong></td>
        <td>${escapeHtml(c.caseName || (c.firstParty ? `${c.firstParty} vs ${c.accusedName}` : (c.victimName ? `${c.victimName} vs ${c.accusedName}` : '—')))}</td>
        <td>${escapeHtml(c.crimeNumber || '—')}</td>
        <td>${escapeHtml(c.policeStation || '—')}</td>
        <td>${escapeHtml(c.crimeSection || '—')}</td>
        <td>${escapeHtml(c.clientName || c.criminalClientName || '—')}</td>
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
      stateTable.innerHTML = '<tr><td colspan="9" class="no-results">No State criminal cases recorded yet.</td></tr>';
    } else {
      stateTable.innerHTML = stateCases.map(renderStateRow).join('');
    }
  }
  if (legacyCriminalTable) {
    if (stateCases.length === 0) {
      legacyCriminalTable.innerHTML = '<tr><td colspan="5" class="no-results">No criminal cases found.</td></tr>';
    } else {
      legacyCriminalTable.innerHTML = stateCases.map(renderStateRow).join('');
    }
  }

  // 3. Family Cases Table & Count (Matrimonial / Maintenance 125)
  const familyCases = allCaseRecords.filter(c => c.caseType === 'family');
  const familyTable = document.querySelector('#familyCasesTable tbody');
  const familyCountEl = document.getElementById('familyCount');
  if (familyCountEl) familyCountEl.textContent = String(familyCases.length);
  if (familyTable) {
    if (familyCases.length === 0) {
      familyTable.innerHTML = '<tr><td colspan="10" class="no-results">No Family or Matrimonial cases recorded yet.</td></tr>';
    } else {
      familyTable.innerHTML = familyCases.map(c => {
        const isDisposed = (c.caseStatus || '').toLowerCase().includes('dispose');
        const statusBadge = isDisposed
          ? '<span class="status-badge disposed"><i class="fa-solid fa-circle-check"></i> Disposed</span>'
          : '<span class="status-badge pending"><i class="fa-solid fa-clock"></i> Pending</span>';
        const partiesRemark = c.remark || c.remarks || '';
        const caseNumber = c.caseNo || '—';
        const caseName = c.caseName || `${c.petitioner} vs ${c.respondent}`;
        const partiesRemarkHtml = renderCaseTableRemarks(partiesRemark, caseNumber, caseName);
        const disposalComment = c.disposalComment || c.disposal_comment || '';
        const disposalCommentHtml = disposalComment
          ? `<span class="case-disposal-clamp" title="${escapeHtml(disposalComment)}"><i class="fa-solid fa-scale-balanced"></i>️ ${escapeHtml(disposalComment)}</span>`
          : (isDisposed && remarksToPlainText(partiesRemark) ? `<span class="case-disposal-clamp" title="${escapeHtml(remarksToPlainText(partiesRemark))}"><i class="fa-solid fa-scale-balanced"></i>️ ${escapeHtml(remarksToPlainText(partiesRemark))}</span>` : '<span style="color: #94a3b8;">—</span>');

        return `
          <tr>
            <td><strong>${escapeHtml(caseNumber)}</strong></td>
            <td>${escapeHtml(c.caseName || `${c.petitioner} vs ${c.respondent}`)}</td>
            <td><span class="case-badge family">${escapeHtml(c.matterType || 'Family Dispute')}</span></td>
            <td>${escapeHtml(c.petitioner || '—')}</td>
            <td>${escapeHtml(c.respondent || '—')}</td>
            <td>${escapeHtml(c.courtName || 'Family Court')}</td>
            <td>${escapeHtml(c.clientName || '—')}</td>
            <td>${statusBadge}</td>
            <td><strong>${formatDateDMY(c.nextHearing)}</strong></td>
            <td class="case-remark-cell">${partiesRemarkHtml}</td>
            <td class="case-disposal-cell">${disposalCommentHtml}</td>
            <td class="table-actions-td" style="white-space: nowrap; text-align: center;">
              <button type="button" class="table-view-btn edit-case-btn" onclick="editCaseFromTable('${escapeHtml(caseNumber)}')" title="Edit / Update Case"><i class="fa-solid fa-pen-to-square"></i><span class="btn-text"> Edit</span></button>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  // 4. Revenue Cases Table & Count (Land & Tehsil)
  const revenueTable = document.querySelector('#revenueCasesTable tbody');
  const revenueCountEl = document.getElementById('revenueCount');
  const revenueCases = allCaseRecords.filter(c => c.caseType === 'revenue');
  if (revenueCountEl) revenueCountEl.textContent = String(revenueCases.length);
  if (revenueTable) {
    if (revenueCases.length === 0) {
      revenueTable.innerHTML = '<tr><td colspan="12" class="no-results">No Revenue cases recorded yet.</td></tr>';
    } else {
      revenueTable.innerHTML = revenueCases.map(c => {
        const isDisposed = (c.caseStatus || '').toLowerCase().includes('dispose');
        const statusBadge = isDisposed
          ? '<span class="status-badge disposed"><i class="fa-solid fa-circle-check"></i> Disposed</span>'
          : '<span class="status-badge pending"><i class="fa-solid fa-clock"></i> Pending</span>';
        const partiesRemark = c.remark || c.remarks || '';
        const caseNumber = c.caseNo || '—';
        const caseName = c.caseName || `${c.applicant} vs ${c.oppositeParty}`;
        const partiesRemarkHtml = renderCaseTableRemarks(partiesRemark, caseNumber, caseName);
        const disposalComment = c.disposalComment || c.disposal_comment || '';
        const disposalCommentHtml = disposalComment
          ? `<span class="case-disposal-clamp" title="${escapeHtml(disposalComment)}"><i class="fa-solid fa-scale-balanced"></i>️ ${escapeHtml(disposalComment)}</span>`
          : (isDisposed && remarksToPlainText(partiesRemark) ? `<span class="case-disposal-clamp" title="${escapeHtml(remarksToPlainText(partiesRemark))}"><i class="fa-solid fa-scale-balanced"></i>️ ${escapeHtml(remarksToPlainText(partiesRemark))}</span>` : '<span style="color: #94a3b8;">—</span>');

        return `
          <tr>
            <td><strong>${escapeHtml(caseNumber)}</strong></td>
            <td>${escapeHtml(c.caseName || `${c.applicant} vs ${c.oppositeParty}`)}</td>
            <td><span class="case-badge revenue">${escapeHtml(c.revenueActSection || 'Revenue Sec')}</span></td>
            <td>${escapeHtml(c.villageMauja || '—')}</td>
            <td>${escapeHtml(c.gataKhataNo || '—')}</td>
            <td>${escapeHtml(c.courtName || 'Tehsildar / SDM')}</td>
            <td>${escapeHtml(c.clientName || '—')}</td>
            <td>${statusBadge}</td>
            <td><strong>${formatDateDMY(c.nextHearing)}</strong></td>
            <td class="case-remark-cell">${partiesRemarkHtml}</td>
            <td class="case-disposal-cell">${disposalCommentHtml}</td>
            <td class="table-actions-td" style="white-space: nowrap; text-align: center;">
              <button type="button" class="table-view-btn edit-case-btn" onclick="editCaseFromTable('${escapeHtml(caseNumber)}')" title="Edit / Update Case"><i class="fa-solid fa-pen-to-square"></i><span class="btn-text"> Edit</span></button>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  // 5. Misc Civil Cases Table & Count
  const miscCivilTable = document.querySelector('#miscCivilCasesTable tbody');
  const miscCivilCountEl = document.getElementById('miscCivilCount');
  const miscCivilCases = allCaseRecords.filter(c => c.caseType === 'misc_civil');
  if (miscCivilCountEl) miscCivilCountEl.textContent = String(miscCivilCases.length);
  if (miscCivilTable) {
    if (miscCivilCases.length === 0) {
      miscCivilTable.innerHTML = '<tr><td colspan="13" class="no-results">No Misc Civil cases recorded yet.</td></tr>';
    } else {
      miscCivilTable.innerHTML = miscCivilCases.map(c => {
        const isDisposed = (c.caseStatus || '').toLowerCase().includes('dispose');
        const statusBadge = isDisposed
          ? '<span class="status-badge disposed"><i class="fa-solid fa-circle-check"></i> Disposed</span>'
          : '<span class="status-badge pending"><i class="fa-solid fa-clock"></i> Pending</span>';
        const partiesRemark = c.remark || c.remarks || '';
        const caseNumber = c.caseNo || '—';
        const caseName = c.caseName || `${c.applicant} vs ${c.oppositeParty}`;
        const partiesRemarkHtml = renderCaseTableRemarks(partiesRemark, caseNumber, caseName);
        const disposalComment = c.disposalComment || c.disposal_comment || '';
        const disposalCommentHtml = disposalComment
          ? `<span class="case-disposal-clamp" title="${escapeHtml(disposalComment)}"><i class="fa-solid fa-scale-balanced"></i>️ ${escapeHtml(disposalComment)}</span>`
          : (isDisposed && remarksToPlainText(partiesRemark) ? `<span class="case-disposal-clamp" title="${escapeHtml(remarksToPlainText(partiesRemark))}"><i class="fa-solid fa-scale-balanced"></i>️ ${escapeHtml(remarksToPlainText(partiesRemark))}</span>` : '<span style="color: #94a3b8;">—</span>');

        return `
          <tr>
            <td><strong>${escapeHtml(caseNumber)}</strong></td>
            <td>${escapeHtml(c.caseName || `${c.applicant} vs ${c.oppositeParty}`)}</td>
            <td><span class="case-badge misc_civil">${escapeHtml(c.proceedingType || 'Misc Application')}</span></td>
            <td>${escapeHtml(c.originalCaseNumber || c.originalCase || '—')}</td>
            <td>${escapeHtml(c.applicant || '—')}</td>
            <td>${escapeHtml(c.oppositeParty || '—')}</td>
            <td>${escapeHtml(c.courtName || 'Court')}</td>
            <td>${escapeHtml(c.clientName || '—')}</td>
            <td>${statusBadge}</td>
            <td><strong>${formatDateDMY(c.nextHearing)}</strong></td>
            <td class="case-remark-cell">${partiesRemarkHtml}</td>
            <td class="case-disposal-cell">${disposalCommentHtml}</td>
            <td class="table-actions-td" style="white-space: nowrap; text-align: center;">
              <button type="button" class="table-view-btn edit-case-btn" onclick="editCaseFromTable('${escapeHtml(caseNumber)}')" title="Edit / Update Case"><i class="fa-solid fa-pen-to-square"></i><span class="btn-text"> Edit</span></button>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  // 6. Misc Criminal Cases Table & Count
  const miscCriminalTable = document.querySelector('#miscCriminalCasesTable tbody');
  const miscCriminalCountEl = document.getElementById('miscCriminalCount');
  const miscCriminalCases = allCaseRecords.filter(c => c.caseType === 'misc_criminal');
  if (miscCriminalCountEl) miscCriminalCountEl.textContent = String(miscCriminalCases.length);
  if (miscCriminalTable) {
    if (miscCriminalCases.length === 0) {
      miscCriminalTable.innerHTML = '<tr><td colspan="13" class="no-results">No Misc Criminal cases recorded yet.</td></tr>';
    } else {
      miscCriminalTable.innerHTML = miscCriminalCases.map(c => {
        const isDisposed = (c.caseStatus || '').toLowerCase().includes('dispose');
        const statusBadge = isDisposed
          ? '<span class="status-badge disposed"><i class="fa-solid fa-circle-check"></i> Disposed</span>'
          : '<span class="status-badge pending"><i class="fa-solid fa-clock"></i> Pending</span>';
        const partiesRemark = c.remark || c.remarks || '';
        const caseNumber = c.caseNo || '—';
        const caseName = c.caseName || `${c.applicant} vs ${c.oppositeParty}`;
        const partiesRemarkHtml = renderCaseTableRemarks(partiesRemark, caseNumber, caseName);
        const disposalComment = c.disposalComment || c.disposal_comment || '';
        const disposalCommentHtml = disposalComment
          ? `<span class="case-disposal-clamp" title="${escapeHtml(disposalComment)}"><i class="fa-solid fa-scale-balanced"></i>️ ${escapeHtml(disposalComment)}</span>`
          : (isDisposed && remarksToPlainText(partiesRemark) ? `<span class="case-disposal-clamp" title="${escapeHtml(remarksToPlainText(partiesRemark))}"><i class="fa-solid fa-scale-balanced"></i>️ ${escapeHtml(remarksToPlainText(partiesRemark))}</span>` : '<span style="color: #94a3b8;">—</span>');

        return `
          <tr>
            <td><strong>${escapeHtml(caseNumber)}</strong></td>
            <td>${escapeHtml(c.caseName || `${c.applicant} vs ${c.oppositeParty}`)}</td>
            <td><span class="case-badge misc_criminal">${escapeHtml(c.proceedingType || 'Bail Application')}</span></td>
            <td>${escapeHtml(c.originalCaseNumber || c.originalCase || '—')}</td>
            <td>${escapeHtml(c.policeStation || '—')}</td>
            <td>${escapeHtml(c.applicant || '—')}</td>
            <td>${escapeHtml(c.courtName || 'Court')}</td>
            <td>${escapeHtml(c.clientName || '—')}</td>
            <td>${statusBadge}</td>
            <td><strong>${formatDateDMY(c.nextHearing)}</strong></td>
            <td class="case-remark-cell">${partiesRemarkHtml}</td>
            <td class="case-disposal-cell">${disposalCommentHtml}</td>
            <td class="table-actions-td" style="white-space: nowrap; text-align: center;">
              <button type="button" class="table-view-btn edit-case-btn" onclick="editCaseFromTable('${escapeHtml(caseNumber)}')" title="Edit / Update Case"><i class="fa-solid fa-pen-to-square"></i><span class="btn-text"> Edit</span></button>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  // 7. Complaint Cases Table & Count (Cheque Bounce Sec 138 NI Act, Sec 200 CrPC, Defamation)
  const complaintTable = document.querySelector('#complaintCasesTable tbody');
  const complaintCountEl = document.getElementById('complaintCount');
  const complaintCases = allCaseRecords.filter(c => c.caseType === 'complaint');
  if (complaintCountEl) complaintCountEl.textContent = String(complaintCases.length);
  if (complaintTable) {
    if (complaintCases.length === 0) {
      complaintTable.innerHTML = '<tr><td colspan="14" class="no-results">No Complaint cases recorded yet.</td></tr>';
    } else {
      complaintTable.innerHTML = complaintCases.map(c => {
        const isDisposed = (c.caseStatus || '').toLowerCase().includes('dispose');
        const statusBadge = isDisposed
          ? '<span class="status-badge disposed"><i class="fa-solid fa-circle-check"></i> Disposed</span>'
          : '<span class="status-badge pending"><i class="fa-solid fa-clock"></i> Pending</span>';
        const partiesRemark = c.remark || c.remarks || '';
        const caseNumber = c.caseNo || '—';
        const caseName = c.caseName || `${c.complainant} vs ${c.accusedName}`;
        const partiesRemarkHtml = renderCaseTableRemarks(partiesRemark, caseNumber, caseName);
        const disposalComment = c.disposalComment || c.disposal_comment || '';
        const disposalCommentHtml = disposalComment
          ? `<span class="case-disposal-clamp" title="${escapeHtml(disposalComment)}"><i class="fa-solid fa-scale-balanced"></i>️ ${escapeHtml(disposalComment)}</span>`
          : (isDisposed && remarksToPlainText(partiesRemark) ? `<span class="case-disposal-clamp" title="${escapeHtml(remarksToPlainText(partiesRemark))}"><i class="fa-solid fa-scale-balanced"></i>️ ${escapeHtml(remarksToPlainText(partiesRemark))}</span>` : '<span style="color: #94a3b8;">—</span>');

        return `
          <tr>
            <td><strong>${escapeHtml(caseNumber)}</strong></td>
            <td>${escapeHtml(c.caseName || `${c.complainant} vs ${c.accusedName}`)}</td>
            <td><span class="case-badge complaint">${escapeHtml(c.complaintType || 'Complaint')}</span></td>
            <td>${escapeHtml(c.sectionAct || '—')}</td>
            <td>${escapeHtml(c.complainant || '—')}</td>
            <td>${escapeHtml(c.accusedName || '—')}</td>
            <td>${escapeHtml(c.policeStation || '—')}</td>
            <td>${escapeHtml(c.courtName || 'Court')}</td>
            <td>${escapeHtml(c.clientName || '—')}</td>
            <td>${statusBadge}</td>
            <td><strong>${formatDateDMY(c.nextHearing)}</strong></td>
            <td class="case-remark-cell">${partiesRemarkHtml}</td>
            <td class="case-disposal-cell">${disposalCommentHtml}</td>
            <td class="table-actions-td" style="white-space: nowrap; text-align: center;">
              <button type="button" class="table-view-btn edit-case-btn" onclick="editCaseFromTable('${escapeHtml(caseNumber)}')" title="Edit / Update Case"><i class="fa-solid fa-pen-to-square"></i><span class="btn-text"> Edit</span></button>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  // 8. Disposed Cases Table & Count
  const disposedCases = allCaseRecords.filter(c => (c.caseStatus || '').toLowerCase().includes('dispose'));
  const disposedCountEl = document.getElementById('disposedCount');
  const disposedTable = document.querySelector('#disposedCasesTable tbody');
  if (disposedCountEl) disposedCountEl.textContent = String(disposedCases.length);
  if (disposedTable) {
    if (disposedCases.length === 0) {
      disposedTable.innerHTML = '<tr><td colspan="9" class="no-results">No disposed cases recorded yet.</td></tr>';
    } else {
      disposedTable.innerHTML = disposedCases.map(c => {
        const caseNumber = c.caseNo || c.criminalCaseNumber || '—';
        const caseName = c.caseName || (c.plaintiff ? `${c.plaintiff} vs ${c.defendant}` : (c.victimName ? `${c.victimName} vs ${c.accusedName}` : '—'));
        const partiesRemark = c.remark || c.remarks || '';
        const partiesRemarkHtml = renderCaseTableRemarks(partiesRemark, caseNumber, caseName);
        const disposalComment = c.disposalComment || c.disposal_comment || '';
        const disposalCommentHtml = disposalComment
          ? `<span class="case-disposal-clamp" title="${escapeHtml(disposalComment)}"><i class="fa-solid fa-scale-balanced"></i>️ ${escapeHtml(disposalComment)}</span>`
          : (remarksToPlainText(partiesRemark) ? `<span class="case-disposal-clamp" title="${escapeHtml(remarksToPlainText(partiesRemark))}"><i class="fa-solid fa-scale-balanced"></i>️ ${escapeHtml(remarksToPlainText(partiesRemark))}</span>` : '<span style="color: #94a3b8;">—</span>');

        return `
          <tr>
            <td><strong>${escapeHtml(caseNumber)}</strong></td>
            <td>${escapeHtml(caseName)}</td>
            <td>${escapeHtml(c.clientName || c.criminalClientName || '—')}</td>
            <td><span class="case-badge ${c.caseType || 'civil'}">${(c.caseType || 'Civil').toUpperCase()}</span></td>
            <td>${escapeHtml(c.courtName || c.criminalCourtName || 'District Court')}</td>
            <td><span class="status-badge disposed"><i class="fa-solid fa-circle-check"></i> Disposed</span></td>
            <td class="case-remark-cell">${partiesRemarkHtml}</td>
            <td class="case-disposal-cell">${disposalCommentHtml}</td>
            <td class="table-actions-td" style="text-align: center; white-space: nowrap;">
              <button type="button" class="table-view-btn edit-case-btn" onclick="editCaseFromTable('${escapeHtml(caseNumber)}')" title="Edit / Reopen Case"><i class="fa-solid fa-pen-to-square"></i><span class="btn-text"> Edit</span></button>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  // 5. Undated Cases Table & Count (With Direct Update Hearing Action)
  // "Undated" = no next hearing at all, OR the scheduled date has already
  // passed without being forwarded (needs a fresh date).
  const todayISO = toISODate(new Date());
  const isUndatedCase = (c) => {
    // Disposed cases never count as undated — they're closed, not awaiting a date
    if ((c.caseStatus || '').toLowerCase().includes('dispose')) return false;
    const nh = c.nextHearing;
    if (!nh || nh === '—' || nh === 'null' || String(nh).trim() === '') return true;
    const iso = toISODate(nh);
    if (!iso) return true;
    return iso < todayISO; // hearing date passed, not forwarded
  };
  const undatedCases = allCaseRecords.filter(isUndatedCase);
  const undatedCountEl = document.getElementById('undatedCount');
  const undatedTable = document.querySelector('#undatedCasesTable tbody');
  if (undatedCountEl) undatedCountEl.textContent = String(undatedCases.length);
  if (undatedTable) {
    if (undatedCases.length === 0) {
      undatedTable.innerHTML = '<tr><td colspan="8" class="no-results">🎉 No undated cases! All cases have hearing dates scheduled.</td></tr>';
    } else {
      undatedTable.innerHTML = undatedCases.map(c => {
        const caseNumber = c.caseNo || c.criminalCaseNumber || '—';
        const caseName = c.caseName || (c.plaintiff ? `${c.plaintiff} vs ${c.defendant}` : (c.victimName ? `${c.victimName} vs ${c.accusedName}` : '—'));
        const nextISO = toISODate(c.nextHearing);
        const dateCell = nextISO
          ? (nextISO < todayISO
              ? `<span class="undated-overdue-chip" title="Hearing date passed — not yet forwarded"><i class="fa-solid fa-clock-rotate-left"></i> ${formatDateDMY(nextISO)}</span>`
              : formatDateDMY(nextISO))
          : '<span class="undated-never-chip"><i class="fa-solid fa-circle-question"></i> Never dated</span>';
        return `
          <tr>
            <td><strong>${escapeHtml(caseNumber)}</strong></td>
            <td>${escapeHtml(caseName)}</td>
            <td>${escapeHtml(c.clientName || c.criminalClientName || '—')}</td>
            <td><span class="case-badge ${c.caseType || 'civil'}">${(c.caseType || 'Civil').toUpperCase()}</span></td>
            <td>${escapeHtml(c.courtName || c.criminalCourtName || 'District Court')}</td>
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
      }).join('');
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
  const todoTab = document.getElementById('todo');
  if (todoTab && todoTab.classList && typeof todoTab.classList.contains === 'function' && todoTab.classList.contains('active')) {
    renderCaseTasks();
  }
  } catch (err) { console.warn("refreshAllCaseTables caught error:", err); }
}function exportAllCasesToCSV() {
  if (!allCaseRecords || allCaseRecords.length === 0) {
    alert('No cases available to export.');
    return;
  }

  const headers = [
    'Sr No',
    'Case Number',
    'Year',
    'Case Type',
    'Case Name',
    'Court Name',
    'Party Name',
    'Client Name',
    'Client Phone',
    'Filing Date',
    'Next Hearing Date',
    'Hearing Process / Stage',
    'Case Status',
    'Remarks',
    'Document Link'
  ];

  const escapeCSV = (val) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = allCaseRecords.map((c, idx) => {
    const caseNum = c.caseNo || c.criminalCaseNumber || '';
    const caseYear = c.caseYear || c.crimeYear || '';
    const caseType = (c.caseType || 'civil').toUpperCase();
    const caseName = c.caseName || (c.plaintiff ? `${c.plaintiff} vs ${c.defendant}` : (c.victimName ? `${c.victimName} vs ${c.accusedName}` : ''));
    const court = c.courtName || c.criminalCourtName || '';
    const party = c.partyName || c.defendant || c.accusedName || c.plaintiff || '';
    const client = c.clientName || c.criminalClientName || '';
    const phone = c.clientNumber || c.criminalClientNumber || '';
    const filing = formatDateDMY(c.filingDate || c.crimeFilingDate);
    const hearing = formatDateDMY(c.nextHearing);
    const stage = c.hearingProcess || c.process || '';
    const status = (c.caseStatus || '').toLowerCase().includes('dispose') ? 'Disposed Off' : 'Pending';
    const remark = remarksToPlainText(c.remark || c.remarks);
    const docLink = c.docLink || c.doc_link || '';

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
      escapeCSV(docLink)
    ].join(',');
  });

  const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const today = new Date().toISOString().split('T')[0];
  a.href = url;
  a.download = `Chambers_Case_Records_${today}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

if (typeof exportAllCasesToCSV !== 'undefined') window.exportAllCasesToCSV = exportAllCasesToCSV;

// ==========================================
// ALL CASES MASTER REGISTER & LIVE FILTER SUITE (WITH PAGINATION)
// ==========================================

currentAllCasesFilteredList = [];
var allCasesPageSize = 25; // options: 10, 25, 50, 100, 'all'
var allCasesCurrentPage = 1;

function handleAllCasesPageSizeChange(val) {
  if (val === 'all') {
    allCasesPageSize = 'all';
  } else {
    allCasesPageSize = parseInt(val, 10) || 25;
  }
  allCasesCurrentPage = 1;
  renderAllCasesTableWithFilters(false);
}

function changeAllCasesPage(targetPage) {
  allCasesCurrentPage = targetPage;
  renderAllCasesTableWithFilters(false);
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
    complaint: 0
  };

  records.forEach(c => {
    const t = (c.caseType || 'civil').toLowerCase().trim();
    if (t === 'civil') counts.civil++;
    else if (t === 'state' || t === 'criminal') counts.state++;
    else if (t === 'family') counts.family++;
    else if (t === 'revenue') counts.revenue++;
    else if (t === 'misc_civil' || t === 'misccivil') counts.misc_civil++;
    else if (t === 'misc_criminal' || t === 'misccriminal') counts.misc_criminal++;
    else if (t === 'complaint') counts.complaint++;
  });

  const setPill = (id, count) => {
    const el = document.getElementById(id);
    if (el) el.textContent = String(count);
  };

  setPill('pillCountAll', counts.all);
  setPill('pillCountCivil', counts.civil);
  setPill('pillCountState', counts.state);
  setPill('pillCountFamily', counts.family);
  setPill('pillCountRevenue', counts.revenue);
  setPill('pillCountMiscCivil', counts.misc_civil);
  setPill('pillCountMiscCriminal', counts.misc_criminal);
  setPill('pillCountComplaint', counts.complaint);

  // Synchronize sidebar nav counter
  const navBadge = document.getElementById('allCasesNavCount');
  if (navBadge) navBadge.textContent = String(counts.all);

  // Synchronize Case Cards sidebar nav counter
  const cardsNavBadge = document.getElementById('caseCardsNavCount');
  if (cardsNavBadge) cardsNavBadge.textContent = String((allCaseRecords || []).length);
}

function filterAllCasesByType(type) {
  const typeSelect = document.getElementById('allCasesTypeSelect');
  if (typeSelect) {
    typeSelect.value = type || '';
  }

  // Update active pill button
  document.querySelectorAll('.all-cases-type-pills-bar .type-pill-btn').forEach(btn => {
    const btnType = btn.getAttribute('data-type') || '';
    if (btnType === (type || '')) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  renderAllCasesTableWithFilters();
}

function handleAllCasesTypeSelectChange() {
  const typeSelect = document.getElementById('allCasesTypeSelect');
  const val = typeSelect ? typeSelect.value : '';

  // Synchronize pill button active state
  document.querySelectorAll('.all-cases-type-pills-bar .type-pill-btn').forEach(btn => {
    const btnType = btn.getAttribute('data-type') || '';
    if (btnType === val) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  renderAllCasesTableWithFilters();
}

function resetAllCasesFilters() {
  const searchInput = document.getElementById('allCasesSearchInput');
  const typeSelect = document.getElementById('allCasesTypeSelect');
  const statusSelect = document.getElementById('allCasesStatusSelect');
  const courtSelect = document.getElementById('allCasesCourtSelect');

  if (searchInput) searchInput.value = '';
  if (typeSelect) typeSelect.value = '';
  if (statusSelect) statusSelect.value = '';
  if (courtSelect) courtSelect.value = '';

  document.querySelectorAll('.all-cases-type-pills-bar .type-pill-btn').forEach(btn => {
    const btnType = btn.getAttribute('data-type') || '';
    if (btnType === '') {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  renderAllCasesTableWithFilters();
}

function renderAllCasesTableWithFilters(resetPage = true) {
  const tbody = document.querySelector('#allCasesTable tbody');
  const countBadge = document.getElementById('allCasesCountBadge');
  if (!tbody) return;

  if (resetPage) {
    allCasesCurrentPage = 1;
  }

  const searchInput = document.getElementById('allCasesSearchInput');
  const typeSelect = document.getElementById('allCasesTypeSelect');
  const statusSelect = document.getElementById('allCasesStatusSelect');
  const courtSelect = document.getElementById('allCasesCourtSelect');

  const query = (searchInput?.value || '').trim().toLowerCase();
  const selectedType = (typeSelect?.value || '').trim().toLowerCase();
  const selectedStatus = (statusSelect?.value || '').trim().toLowerCase();
  const selectedCourt = (courtSelect?.value || '').trim().toLowerCase();

  let filtered = (allCaseRecords || []).slice();

  // 1. Filter by Case Type
  if (selectedType) {
    filtered = filtered.filter(c => {
      const t = (c.caseType || 'civil').toLowerCase().trim();
      if (selectedType === 'state') return t === 'state' || t === 'criminal';
      if (selectedType === 'misc_civil') return t === 'misc_civil' || t === 'misccivil';
      if (selectedType === 'misc_criminal') return t === 'misc_criminal' || t === 'misccriminal';
      return t === selectedType;
    });
  }

  // 2. Filter by Status
  if (selectedStatus) {
    filtered = filtered.filter(c => {
      const isDisposed = (c.caseStatus || '').toLowerCase().includes('dispose');
      const isUndated = !c.nextHearing || c.nextHearing === '—' || c.nextHearing === 'null' || !c.nextHearing.trim() || c.nextHearing.toLowerCase() === 'undated';
      if (selectedStatus === 'disposed') return isDisposed;
      if (selectedStatus === 'undated') return !isDisposed && isUndated;
      if (selectedStatus === 'pending') return !isDisposed && !isUndated;
      return true;
    });
  }

  // 3. Filter by Court
  if (selectedCourt) {
    filtered = filtered.filter(c => {
      const courtName = (c.courtName || c.criminalCourtName || '').trim().toLowerCase();
      return courtName === selectedCourt;
    });
  }

  // 4. Live Search across multiple indices
  if (query) {
    filtered = filtered.filter(c => {
      const caseNo = (c.caseNo || c.criminalCaseNumber || '').toLowerCase();
      const caseName = (c.caseName || '').toLowerCase();
      const plaintiff = (c.plaintiff || '').toLowerCase();
      const defendant = (c.defendant || '').toLowerCase();
      const accused = (c.accusedName || '').toLowerCase();
      const victim = (c.victimName || '').toLowerCase();
      const client = (c.clientName || c.criminalClientName || '').toLowerCase();
      const phone = (c.clientNumber || c.criminalClientNumber || '').toLowerCase();
      const court = (c.courtName || c.criminalCourtName || '').toLowerCase();
      const remark = remarksToSearchString(c.remark || c.remarks);
      const police = (c.policeStation || '').toLowerCase();
      const crimeNo = (c.crimeNumber || c.firNumber || '').toLowerCase();

      return caseNo.includes(query) ||
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
        crimeNo.includes(query);
    });
  }

  currentAllCasesFilteredList = filtered;

  const totalFiltered = filtered.length;
  const isAll = allCasesPageSize === 'all';
  const effectivePageSize = isAll ? totalFiltered : (parseInt(allCasesPageSize, 10) || 25);
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
  renderAllCasesPaginationControls(totalFiltered, effectivePageSize, totalPages, allCasesCurrentPage, isAll);

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

  tbody.innerHTML = pageRecords.map(c => {
    const caseNumber = c.caseNo || c.criminalCaseNumber || '—';

    // Sanitize case name and avoid bare 'vs'
    let caseName = (c.caseName || '').trim();
    if (!caseName || caseName.toLowerCase() === 'vs' || caseName.toLowerCase() === 'vs.') {
      if (c.plaintiff && c.defendant) {
        caseName = `${c.plaintiff} vs ${c.defendant}`;
      } else if (c.plaintiff) {
        caseName = `${c.plaintiff} vs Opposite`;
      } else if (c.accusedName) {
        caseName = `State vs ${c.accusedName}`;
      } else if (c.victimName) {
        caseName = `${c.victimName} vs Accused`;
      } else {
        caseName = 'Untitled Matter';
      }
    }

    const courtName = c.courtName || c.criminalCourtName || 'District Court';
    const clientName = c.clientName || c.criminalClientName || '—';
    const clientPhone = c.clientNumber || c.criminalClientNumber || '';

    const isDisposed = (c.caseStatus || '').toLowerCase().includes('dispose');
    const isUndated = !c.nextHearing || c.nextHearing === '—' || c.nextHearing === 'null' || !c.nextHearing.trim() || c.nextHearing.toLowerCase() === 'undated';

    let statusBadge = '';
    if (isDisposed) {
      statusBadge = '<span class="status-badge disposed"><i class="fa-solid fa-circle-check"></i> Disposed</span>';
    } else if (isUndated) {
      statusBadge = '<span class="status-badge undated" style="background:#fef3c7; color:#92400e; border:1px solid #fde68a;"><i class="fa-solid fa-calendar-xmark"></i> Undated</span>';
    } else {
      statusBadge = '<span class="status-badge pending"><i class="fa-solid fa-clock"></i> Pending</span>';
    }

    const nextHearingStr = isUndated
      ? '<span style="color: #d97706; font-weight: 600;">—</span>'
      : `<strong>${formatDateDMY(c.nextHearing)}</strong>`;

    const partiesRemark = c.remark || c.remarks || '';
    const partiesRemarkHtml = renderCaseTableRemarks(partiesRemark, caseNumber, caseName);

    const disposalComment = c.disposalComment || c.disposal_comment || '';
    const disposalCommentHtml = disposalComment
      ? `<span class="case-disposal-clamp" title="${escapeHtml(disposalComment)}"><i class="fa-solid fa-scale-balanced"></i>️ ${escapeHtml(disposalComment)}</span>`
      : (isDisposed && remarksToPlainText(partiesRemark) ? `<span class="case-disposal-clamp" title="${escapeHtml(remarksToPlainText(partiesRemark))}"><i class="fa-solid fa-scale-balanced"></i>️ ${escapeHtml(remarksToPlainText(partiesRemark))}</span>` : '<span style="color: #94a3b8;">—</span>');

    return `
      <tr>
        <td class="copyable-case-no" title="Double-click to copy Case Number"><strong>${escapeHtml(caseNumber)}</strong></td>
        <td>
          <div style="font-weight: 600; color: #1e293b; word-break: break-word;">${escapeHtml(caseName)}</div>
          ${c.policeStation ? `<small style="color:#64748b;">🚔 PS: ${escapeHtml(c.policeStation)}` + (c.crimeNumber ? ` | ${escapeHtml(c.crimeNumber)}` : '') + `</small>` : ''}
        </td>
        <td>🏛️ ${escapeHtml(courtName)}</td>
        <td>
          <div>${escapeHtml(clientName)}</div>
          ${clientPhone ? `<small style="color:#64748b;">📞 ${escapeHtml(clientPhone)}</small>` : ''}
        </td>
        <td class="all-cases-status-cell">${statusBadge}</td>
        <td class="case-remark-cell">${partiesRemarkHtml}</td>
        <td class="case-disposal-cell">${disposalCommentHtml}</td>
        <td class="all-cases-date-cell">${nextHearingStr}</td>
        <td class="all-cases-actions-cell-td table-actions-td" style="white-space: nowrap; text-align: center;">
          <div class="all-cases-actions-cell" style="display: inline-flex; align-items: center; justify-content: center; gap: 4px;">
            <button type="button" class="all-cases-action-btn details-btn" onclick="openCaseHistoryModalByNo('${escapeHtml(caseNumber)}')" title="View Case Proceedings & Dossier"><i class="fa-solid fa-eye"></i></button>
            <button type="button" class="all-cases-action-btn edit-btn" onclick="editCaseFromTable('${escapeHtml(caseNumber)}')" title="Edit / Update Case Details"><i class="fa-solid fa-pen-to-square"></i></button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

/* ==============================================================
   Case Cards Board — 3-line expandable cards for all cases
   ============================================================== */
function getCaseCardDisplayData(c) {
  const caseType = (c.caseType || 'civil').toLowerCase();
  const caseNumber = c.caseNo || c.criminalCaseNumber || '—';
  const courtName = c.courtName || c.criminalCourtName || 'District Court';

  // Sanitize case name and avoid bare 'vs'
  let caseName = (c.caseName || '').trim();
  if (!caseName || caseName.toLowerCase() === 'vs' || caseName.toLowerCase() === 'vs.') {
    if (c.plaintiff && c.defendant) caseName = `${c.plaintiff} vs ${c.defendant}`;
    else if (c.petitioner && c.respondent) caseName = `${c.petitioner} vs ${c.respondent}`;
    else if (c.applicant && c.respondent) caseName = `${c.applicant} vs ${c.respondent}`;
    else if (c.plaintiff) caseName = `${c.plaintiff} vs Opposite`;
    else if (c.accusedName) caseName = `State vs ${c.accusedName}`;
    else if (c.victimName) caseName = `${c.victimName} vs Accused`;
    else caseName = 'Untitled Matter';
  }

  const isDisposed = (c.caseStatus || '').toLowerCase().includes('dispose') || Boolean(c.disposalComment || c.disposal_comment);
  const isUndated = !c.nextHearing || c.nextHearing === '—' || c.nextHearing === 'null' || !String(c.nextHearing).trim() || String(c.nextHearing).toLowerCase() === 'undated';

  let statusText = 'Pending';
  let statusColor = '#ea580c';
  if (isDisposed) {
    statusText = 'Disposed Off';
    statusColor = '#059669';
  } else if (isUndated) {
    statusText = 'Undated';
    statusColor = '#d97706';
  }

  let nextDateText = '—';
  if (isDisposed) {
    nextDateText = c.disposalDate ? formatDateDMY(c.disposalDate) : 'Disposed';
  } else if (isUndated) {
    nextDateText = 'Undated';
  } else if (c.nextHearing) {
    nextDateText = formatDateDMY(c.nextHearing);
  }

  const isCriminalSide = ['criminal', 'state', 'complaint', 'misc_criminal', 'misccriminal'].includes(caseType);
  const appRole = isCriminalSide ? 'Complainant / State' : (caseType === 'family' ? 'Petitioner' : (caseType === 'revenue' ? 'Applicant' : 'Plaintiff'));
  const resRole = isCriminalSide ? 'Accused' : (caseType === 'family' ? 'Respondent' : (caseType === 'revenue' ? 'Opposite Party' : 'Defendant'));
  const appName = (c.plaintiff || c.petitioner || c.applicant || c.firstParty || c.victimName || '').trim() || 'Not Specified';
  const resName = (c.defendant || c.respondent || c.oppositeParty || c.accusedName || '').trim() || 'Not Specified';

  const daysUntil = typeof getDaysUntilHearing === 'function' ? getDaysUntilHearing(c.nextHearing) : null;
  const isUrgent = !isDisposed && !isUndated && daysUntil !== null && daysUntil >= 0 && daysUntil <= 7;
  const urgentBadgeHtml = isUrgent ? '<span class="badge urgent" style="background:#fee2e2; color:#b91c1c; font-size:0.75rem; font-weight:700; padding:2px 8px; border-radius:9999px;"><i class="fa-solid fa-triangle-exclamation"></i> Hearing Soon</span>' : '';

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
    daysUntil
  };
}

function buildCaseCardSections(c) {
  const { caseType, caseNumber, courtName, isDisposed, isUndated } = getCaseCardDisplayData(c);
  const isCriminalSide = ['criminal', 'state', 'complaint', 'misc_criminal', 'misccriminal'].includes(caseType);

  // ----- 1. Courts & Case Info -----
  const info = [];
  info.push(['Case Number', caseNumber]);
  info.push(['Case Type', caseType.replace('_', ' ').toUpperCase()]);
  if (c.caseYear || c.crimeYear) info.push(['Registration Year', c.caseYear || c.crimeYear]);
  info.push(['Court / Forum', courtName]);
  if (c.filingDate || c.crimeFilingDate) info.push(['Filing Date', formatDateDMY(c.filingDate || c.crimeFilingDate)]);
  if (c.hearingProcess) info.push(['Next Stage', c.hearingProcess]);

  // ----- 2. Parties & Matter -----
  const parties = [];
  if (isCriminalSide) {
    if (c.victimName || c.firstParty) parties.push(['Complainant / Victim', c.victimName || c.firstParty]);
    if (c.accusedName || c.oppositeParty) parties.push(['Accused / Opposite', c.accusedName || c.oppositeParty]);
    if (c.policeStation) parties.push(['Police Station', c.policeStation]);
    if (c.crimeNumber) parties.push(['FIR / Crime No.', `${c.crimeNumber}${c.crimeYear ? ` / ${c.crimeYear}` : ''}`]);
    if (c.crimeSection) parties.push(['Sections (IPC/BNS)', c.crimeSection]);
    if (c.custodyStatus) parties.push(['Custody / Bail Status', c.custodyStatus]);
  } else if (caseType === 'family') {
    if (c.petitioner || c.plaintiff) parties.push(['Petitioner / Applicant', c.petitioner || c.plaintiff]);
    if (c.respondent || c.defendant) parties.push(['Respondent / Opposite', c.respondent || c.defendant]);
    if (c.familyMatterType || c.matterType) parties.push(['Dispute Nature', c.familyMatterType || c.matterType]);
    if (c.marriageDate) parties.push(['Marriage Date', formatDateDMY(c.marriageDate)]);
    if (c.maintenance) parties.push(['Maintenance Details', c.maintenance]);
  } else if (caseType === 'revenue') {
    if (c.applicant || c.plaintiff) parties.push(['Applicant / Petitioner', c.applicant || c.plaintiff]);
    if (c.respondent || c.defendant) parties.push(['Opposite Party', c.respondent || c.defendant]);
    if (c.revenueMatterType) parties.push(['Revenue Matter Nature', c.revenueMatterType]);
    if (c.village) parties.push(['Village / Mauza', c.village]);
    if (c.khataNo || c.gataNo) parties.push(['Khata / Gata No.', [c.khataNo ? `Khata: ${c.khataNo}` : '', c.gataNo ? `Gata: ${c.gataNo}` : ''].filter(Boolean).join(' | ')]);
  } else {
    if (c.plaintiff || c.firstParty) parties.push(['Plaintiff / Petitioner', c.plaintiff || c.firstParty]);
    if (c.defendant || c.oppositeParty) parties.push(['Defendant / Respondent', c.defendant || c.oppositeParty]);
    if (c.matterType) parties.push(['Matter / Suit Nature', c.matterType]);
  }

  // ----- 3. Hearings -----
  let statusText = 'Pending';
  if (isDisposed) statusText = 'Disposed Off';
  else if (isUndated) statusText = 'Undated / Unscheduled';

  const hearings = [['Status', statusText]];
  if (!isUndated) hearings.push(['Next Hearing', formatDateDMY(c.nextHearing)]);
  if (c.previousHearing) hearings.push(['Previous Hearing', formatDateDMY(c.previousHearing)]);
  if (c.previousProcess) hearings.push(['Previous Process', c.previousProcess]);

  // Full previous-hearing history (dated, process, action taken)
  const hearingHistory = getCaseHearingHistory(caseNumber)
    .filter(h => h.hearing_date && h.hearing_date !== c.nextHearing)
    .map(h => ({ date: h.hearing_date, process: h.process || '—', action: h.action_taken || '—' }));

  // ----- 4. Client & Remarks -----
  const client = [];
  const clientName = c.clientName || c.criminalClientName || c.client || '';
  if (clientName) client.push(['Client', clientName]);
  const clientPhone = c.clientNumber || c.criminalClientNumber || '';
  if (clientPhone) client.push(['Client Phone', clientPhone]);
  const remarkText = remarksToPlainText(c.remark || c.remarks);
  if (remarkText) client.push(['Remarks', remarkText]);
  const disposal = String(c.disposalComment || c.disposal_comment || '').trim();
  if (disposal) client.push(['Disposal Order', disposal]);

  return [
    { num: 1, icon: 'fa-landmark',          title: 'Courts & Case Info', rows: info },
    { num: 2, icon: 'fa-user-group',        title: 'Parties & Matter',   rows: parties },
    { num: 3, icon: 'fa-calendar-days',     title: `Hearings${hearingHistory.length ? ` (${hearingHistory.length} previous)` : ''}`, rows: hearings, history: hearingHistory },
    { num: 4, icon: 'fa-address-card',      title: 'Client & Remarks',   rows: client }
  ].filter(s => s.rows.length > 0);
}

function getDaysUntilHearing(dateStr) {
  if (!dateStr || dateStr === '—' || dateStr === 'null' || !String(dateStr).trim() || String(dateStr).toLowerCase() === 'undated') return null;
  const target = new Date(dateStr);
  if (isNaN(target.getTime())) return null;
  const now = new Date();
  const dTarget = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  const dNow = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((dTarget.getTime() - dNow.getTime()) / (1000 * 60 * 60 * 24));
}

function getCasePartyInitials(name) {
  if (!name || name === '—' || name === 'Not Specified') return '—';
  const clean = name.replace(/[^a-zA-Z0-9\s]/g, '').trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (!parts.length) return '—';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function showCaseBookToast(msg) {
  const t = document.getElementById('caseBookToast') || document.getElementById('toast');
  if (!t) return;
  t.textContent = msg || 'Action completed successfully';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
}
if (typeof showCaseBookToast !== 'undefined') window.showCaseBookToast = showCaseBookToast;

function toggleCaseCardSection(headerEl) {
  const t = headerEl.querySelector('.toggle');
  if (!t) return;
  const isCollapsed = t.textContent.trim() === '▶';
  t.textContent = isCollapsed ? '▼' : '▶';
  let el = headerEl.nextElementSibling;
  while (el && !el.classList.contains('section-head') && !el.classList.contains('card-actions')) {
    el.style.display = isCollapsed ? '' : 'none';
    el = el.nextElementSibling;
  }

  // Update card head button state based on open sections
  const card = headerEl.closest('.case-card');
  if (card) {
    const hideBtn = card.querySelector('.hide-btn');
    if (hideBtn) {
      const anyOpen = Array.from(card.querySelectorAll('.section-head .toggle')).some(span => span.textContent.trim() === '▼');
      hideBtn.textContent = anyOpen ? '▲ Hide details' : '▼ Show details';
    }
  }
}

function toggleCaseCard(idx) {
  const card = document.querySelector(`.case-card[data-card-index="${idx}"]`);
  if (!card) return;
  const hideBtn = card.querySelector('.hide-btn');
  if (!hideBtn) return;
  const isCurrentlyExpanded = hideBtn.textContent.includes('Hide');
  const sections = card.querySelectorAll('.section-head');

  if (isCurrentlyExpanded) {
    hideBtn.textContent = '▼ Show details';
    sections.forEach(h => {
      const t = h.querySelector('.toggle');
      if (t) t.textContent = '▶';
      let el = h.nextElementSibling;
      while (el && !el.classList.contains('section-head') && !el.classList.contains('card-actions')) {
        el.style.display = 'none';
        el = el.nextElementSibling;
      }
    });
  } else {
    hideBtn.textContent = '▲ Hide details';
    sections.forEach(h => {
      const t = h.querySelector('.toggle');
      if (t) t.textContent = '▼';
      let el = h.nextElementSibling;
      while (el && !el.classList.contains('section-head') && !el.classList.contains('card-actions')) {
        el.style.display = '';
        el = el.nextElementSibling;
      }
    });
  }
}

function caseCardSortValue(c) {
  const { isDisposed, isUndated } = getCaseCardDisplayData(c);
  if (isDisposed) return 3;   // disposed last
  if (isUndated) return 2;    // undated after dated
  return 1;                   // dated first (chronological, see comparator)
}

/* ── Case Cards quick filter pills ── */
var caseCardsActivePill = 'all';

function setCaseCardsPill(filter, btn) {
  caseCardsActivePill = filter;
  document.querySelectorAll('#caseCardsPillRow .chip').forEach(p => {
    p.classList.toggle('active', p === btn || p.getAttribute('data-filter') === filter);
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

if (typeof isNewCase !== 'undefined') window.isNewCase = isNewCase;

function getCaseStatusCategory(c) {
  if (!c) return 'PENDING';
  const st = (c.caseStatus || '').toLowerCase();
  const isDisp = st.includes('dispose') || Boolean(c.disposalComment || c.disposal_comment || c.disposalDate);
  if (isDisp) return 'DISPOSED';
  if (st.includes('close')) return 'CLOSED';
  if (st.includes('list') || c.courtHall || c.itemNumber) return 'LISTED';
  if (c.nextHearing && c.nextHearing !== '—' && c.nextHearing !== 'null' && String(c.nextHearing).toLowerCase() !== 'undated') {
    const nextDt = new Date(c.nextHearing);
    if (!isNaN(nextDt.getTime()) && nextDt >= new Date(new Date().setHours(0, 0, 0, 0))) {
      return 'LISTED';
    }
  }
  return 'PENDING';
}

if (typeof getCaseStatusCategory !== 'undefined') window.getCaseStatusCategory = getCaseStatusCategory;

function getStatusPillHtml(statusCategory) {
  const cat = (statusCategory || 'PENDING').toUpperCase();
  if (cat === 'DISPOSED') {
    return '<span class="cc-status-pill disposed"><span class="dot"></span> DISPOSED</span>';
  } else if (cat === 'CLOSED') {
    return '<span class="cc-status-pill closed"><span class="dot"></span> CLOSED</span>';
  } else if (cat === 'LISTED') {
    return '<span class="cc-status-pill listed"><span class="dot"></span> LISTED</span>';
  } else {
    return '<span class="cc-status-pill pending"><span class="dot"></span> PENDING</span>';
  }
}

if (typeof getStatusPillHtml !== 'undefined') window.getStatusPillHtml = getStatusPillHtml;

function caseCardMatchesPill(c, pill) {
  if (!c || pill === 'all') return true;
  const statusCat = getCaseStatusCategory(c).toLowerCase();
  if (pill === 'pending') return statusCat === 'pending';
  if (pill === 'listed') return statusCat === 'listed';
  if (pill === 'disposed') return statusCat === 'disposed';
  if (pill === 'closed') return statusCat === 'closed';

  const { caseType, isDisposed, isUndated } = getCaseCardDisplayData(c);
  if (pill === 'urgent') {
    if (isDisposed || isUndated) return false;
    const days = typeof getDaysUntilHearing === 'function' ? getDaysUntilHearing(c.nextHearing) : null;
    return days !== null && days >= 0 && days <= 7;
  }
  if (pill === 'thisweek') {
    if (isDisposed || isUndated) return false;
    const days = typeof getDaysUntilHearing === 'function' ? getDaysUntilHearing(c.nextHearing) : null;
    return days !== null && days >= 0 && days <= 7;
  }
  if (pill === 'revenue') return caseType === 'revenue';
  if (pill === 'civil') return caseType === 'civil';
  if (pill === 'criminal') return ['criminal', 'state', 'complaint', 'misc_criminal', 'misccriminal'].includes(caseType);
  if (pill === 'undated') return isUndated && !isDisposed;
  if (pill === 'dated') return !isUndated && !isDisposed;
  return caseType === pill;
}

function updateCaseCardsPillCounts() {
  const records = allCaseRecords || [];
  const totalCount = records.length;
  let pendingCount = 0;
  let hearingThisWeekCount = 0;
  const clientSet = new Set();

  records.forEach(c => {
    const { isDisposed, isUndated } = getCaseCardDisplayData(c);
    if (!isDisposed) pendingCount++;
    if (!isDisposed && !isUndated) {
      const days = typeof getDaysUntilHearing === 'function' ? getDaysUntilHearing(c.nextHearing) : null;
      if (days !== null && days >= 0 && days <= 7) {
        hearingThisWeekCount++;
      }
    }
    const cName = (c.clientName || c.criminalClientName || c.client || '').trim();
    if (cName) clientSet.add(cName.toLowerCase());
  });

  const totalEl = document.getElementById('cardsStatTotal');
  if (totalEl) totalEl.textContent = String(totalCount);
  const pendingEl = document.getElementById('cardsStatPending');
  if (pendingEl) pendingEl.textContent = String(pendingCount);
  const weekEl = document.getElementById('cardsStatThisWeek');
  if (weekEl) weekEl.textContent = String(hearingThisWeekCount);
  const clientsEl = document.getElementById('cardsStatClients');
  if (clientsEl) clientsEl.textContent = String(clientSet.size);

  const navBadge = document.getElementById('caseCardsNavCount');
  if (navBadge) navBadge.textContent = String(totalCount);
}

function resetCaseCardsFilters() {
  caseCardsActivePill = 'all';
  const searchInput = document.getElementById('caseCardsSearchInput');
  if (searchInput) searchInput.value = '';
  document.querySelectorAll('#caseCardsPillRow .chip').forEach(p => {
    p.classList.toggle('active', p.getAttribute('data-filter') === 'all');
  });
  renderCaseCards();
}

if (typeof resetCaseCardsFilters !== 'undefined') window.resetCaseCardsFilters = resetCaseCardsFilters;

function renderCaseCards() {
  const grid = document.getElementById('caseCardsGrid');
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

  const searchInput = document.getElementById('caseCardsSearchInput');
  const countBadge = document.getElementById('caseCardsCountBadge');
  const query = (searchInput?.value || '').trim().toLowerCase();

  let filtered = (allCaseRecords || []).slice();

  updateCaseCardsPillCounts();

  if (caseCardsActivePill !== 'all') {
    filtered = filtered.filter(c => caseCardMatchesPill(c, caseCardsActivePill));
  }

  if (query) {
    filtered = filtered.filter(c => {
      const caseNo = (c.caseNo || c.criminalCaseNumber || '').toLowerCase();
      const caseName = (c.caseName || '').toLowerCase();
      const plaintiff = (c.plaintiff || c.petitioner || c.applicant || '').toLowerCase();
      const defendant = (c.defendant || c.respondent || c.oppositeParty || '').toLowerCase();
      const accused = (c.accusedName || '').toLowerCase();
      const victim = (c.victimName || '').toLowerCase();
      const client = (c.clientName || c.criminalClientName || '').toLowerCase();
      const phone = (c.clientNumber || c.criminalClientNumber || '').toLowerCase();
      const court = (c.courtName || c.criminalCourtName || '').toLowerCase();
      const remark = remarksToSearchString(c.remark || c.remarks);
      const police = (c.policeStation || '').toLowerCase();
      const crimeNo = (c.crimeNumber || c.firNumber || '').toLowerCase();
      return caseNo.includes(query) || caseName.includes(query) || plaintiff.includes(query) ||
        defendant.includes(query) || accused.includes(query) || victim.includes(query) ||
        client.includes(query) || phone.includes(query) || court.includes(query) ||
        remark.includes(query) || police.includes(query) || crimeNo.includes(query);
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
  const rowsHtml = filtered.map((c, idx) => {
    const { caseNumber, courtName, caseName, nextDateText, isDisposed, isUndated, isUrgent } = getCaseCardDisplayData(c);
    const statusCat = getCaseStatusCategory(c);
    const statusPillHtml = getStatusPillHtml(statusCat);
    const newTagHtml = isNewCase(c) ? '<span class="cc-new-badge">NEW</span>' : '';

    // Next Hearing Chip
    let hearingChipHtml = '';
    if (isDisposed) {
      hearingChipHtml = `
        <div class="cc-hearing-chip disposed">
          <i class="fa-solid fa-circle-check"></i>
          <span>${escapeHtml(nextDateText !== 'Disposed' ? nextDateText : 'Closed')}</span>
        </div>
        ${c.disposalDate ? `<span class="cc-hearing-stage">Date: ${escapeHtml(formatDateDMY(c.disposalDate))}</span>` : ''}
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
        <div class="cc-hearing-chip ${isUrgent ? 'urgent' : ''}">
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
            <span>${escapeHtml(caseNumber || '—')}</span>
            ${newTagHtml}
          </div>
          <div class="cc-case-title" title="${escapeHtml(caseName)}">
            ${escapeHtml(caseName)}
          </div>
        </td>

        <!-- 2. Court / Forum -->
        <td class="cc-col-court">
          <div class="cc-court-chip" title="${escapeHtml(courtName || '—')}">
            <i class="fa-solid fa-building-columns"></i>
            <span>${escapeHtml(courtName || '—')}</span>
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
  }).join('');

  // Mobile Cards HTML (same dataset, optimized card format)
  const mobileCardsHtml = filtered.map((c, idx) => {
    const { caseNumber, courtName, caseName, nextDateText, isDisposed, isUndated, isUrgent } = getCaseCardDisplayData(c);
    const statusCat = getCaseStatusCategory(c);
    const statusPillHtml = getStatusPillHtml(statusCat);
    const newTagHtml = isNewCase(c) ? '<span class="cc-new-badge">NEW</span>' : '';

    let hearingChipHtml = '';
    if (isDisposed) {
      hearingChipHtml = `
        <div class="cc-hearing-chip disposed">
          <i class="fa-solid fa-circle-check"></i>
          <span>${escapeHtml(nextDateText !== 'Disposed' ? nextDateText : 'Closed')}</span>
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
        <div class="cc-hearing-chip ${isUrgent ? 'urgent' : ''}">
          <i class="fa-regular fa-calendar"></i>
          <span>${escapeHtml(nextDateText)}</span>
        </div>
        ${c.hearingProcess ? `<span class="cc-hearing-stage" title="${escapeHtml(c.hearingProcess)}">${escapeHtml(c.hearingProcess)}</span>` : ''}
      `;
    }

    return `
      <div class="cc-mobile-card" onclick="openCaseDetailsFullModal('${escapeHtml(caseNumber)}', ${idx})">
        <div class="cc-mc-header">
          <div class="cc-mc-caseno">
            <i class="fa-regular fa-folder" style="color: #0284c7; font-size: 13px;"></i>
            <span>${escapeHtml(caseNumber || '—')}</span>
            ${newTagHtml}
          </div>
          ${statusPillHtml}
        </div>

        <div class="cc-mc-title" title="${escapeHtml(caseName)}">
          ${escapeHtml(caseName)}
        </div>

        <div class="cc-mc-court" title="${escapeHtml(courtName || '—')}">
          <i class="fa-solid fa-building-columns"></i>
          <span>${escapeHtml(courtName || '—')}</span>
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
  }).join('');

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
          ${filtered.length} ${filtered.length === 1 ? 'Matter' : 'Matters'}
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
  const caseNumber = c.caseNo || c.criminalCaseNumber || '';
  if (!caseNumber) return;

  const { caseName } = getCaseCardDisplayData(c);
  const confirmed = window.confirm(`Are you sure you want to permanently delete case "${caseNumber}" (${caseName})? This action cannot be undone.`);
  if (!confirmed) return;

  if (typeof deleteCaseFromSupabase === 'function') {
    await deleteCaseFromSupabase(caseNumber);
  } else {
    allCaseRecords = (allCaseRecords || []).filter(item => (item.caseNo || item.criminalCaseNumber) !== caseNumber);
    if (typeof saveCasesToLocalStorage === 'function') saveCasesToLocalStorage();
  }
  if (typeof showCaseBookToast === 'function') {
    showCaseBookToast(`Case "${caseNumber}" deleted successfully`);
  }
  renderCaseCards();
  if (typeof refreshAllCaseTables === 'function') refreshAllCaseTables();
}

if (typeof deleteCaseCard !== 'undefined') window.deleteCaseCard = deleteCaseCard;

function renderAllCasesPaginationControls(totalItems, pageSize, totalPages, currentPage, isAll) {
  const infoEl = document.getElementById('allCasesPaginationInfo');
  const controlsEl = document.getElementById('allCasesPaginationControls');

  if (!infoEl || !controlsEl) return;

  if (totalItems === 0) {
    infoEl.textContent = 'Showing 0 to 0 of 0 entries';
    controlsEl.innerHTML = '';
    return;
  }

  const startDisplay = isAll ? 1 : (currentPage - 1) * pageSize + 1;
  const endDisplay = isAll ? totalItems : Math.min(currentPage * pageSize, totalItems);
  const filteredSuffix = totalItems !== (allCaseRecords || []).length
    ? ` (filtered from ${(allCaseRecords || []).length} total cases)`
    : '';

  infoEl.textContent = `Showing ${startDisplay} to ${endDisplay} of ${totalItems} entries${filteredSuffix}`;

  if (isAll || totalPages <= 1) {
    controlsEl.innerHTML = '';
    return;
  }

  let html = '';

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  // First and Previous buttons
  html += `<button type="button" class="pagination-btn" ${isFirst ? 'disabled' : ''} onclick="changeAllCasesPage(1)" title="First Page">«</button>`;
  html += `<button type="button" class="pagination-btn" ${isFirst ? 'disabled' : ''} onclick="changeAllCasesPage(${currentPage - 1})" title="Previous Page">‹ Prev</button>`;

  // Numbered page buttons with smart ellipsis
  const pagesToShow = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pagesToShow.push(i);
  } else {
    pagesToShow.push(1);
    if (currentPage > 4) {
      pagesToShow.push('...');
    }
    const startRange = Math.max(2, currentPage - 1);
    const endRange = Math.min(totalPages - 1, currentPage + 1);
    for (let i = startRange; i <= endRange; i++) {
      if (!pagesToShow.includes(i)) pagesToShow.push(i);
    }
    if (currentPage < totalPages - 3) {
      pagesToShow.push('...');
    }
    if (!pagesToShow.includes(totalPages)) {
      pagesToShow.push(totalPages);
    }
  }

  pagesToShow.forEach(p => {
    if (p === '...') {
      html += `<span class="pagination-ellipsis">…</span>`;
    } else {
      const isActive = p === currentPage ? ' active' : '';
      html += `<button type="button" class="pagination-btn${isActive}" onclick="changeAllCasesPage(${p})">${p}</button>`;
    }
  });

  // Next and Last buttons
  html += `<button type="button" class="pagination-btn" ${isLast ? 'disabled' : ''} onclick="changeAllCasesPage(${currentPage + 1})" title="Next Page">Next ›</button>`;
  html += `<button type="button" class="pagination-btn" ${isLast ? 'disabled' : ''} onclick="changeAllCasesPage(${totalPages})" title="Last Page">»</button>`;

  controlsEl.innerHTML = html;
}

function editCaseFromTable(caseNo) {
  if (!caseNo || caseNo === '—') return;
  showTab('update');
  const searchInput = document.getElementById('updateSearchInput');
  if (searchInput) searchInput.value = caseNo;
  loadCaseForUpdate(caseNo);
}

function exportAllCasesCsv() {
  const casesToExport = currentAllCasesFilteredList && currentAllCasesFilteredList.length > 0
    ? currentAllCasesFilteredList
    : (allCaseRecords || []);

  if (casesToExport.length === 0) {
    if (typeof showToast === 'function') {
      showToast('No cases available to export.', 'error');
    } else {
      alert('No cases available to export.');
    }
    return;
  }

  const headers = [
    'Sr No',
    'Case Number',
    'Case Title / Parties',
    'Case Type',
    'Court / Forum',
    'Client Name',
    'Client Phone',
    'Case Status',
    'Filing Date',
    'Next Hearing Date',
    'Remarks'
  ];

  const escapeCSV = (val) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = casesToExport.map((c, idx) => {
    const caseNo = c.caseNo || c.criminalCaseNumber || '';
    const caseTitle = c.caseName || (c.plaintiff ? `${c.plaintiff} vs ${c.defendant || ''}` : (c.accusedName ? `State vs ${c.accusedName}` : ''));
    const rawType = (c.caseType || 'civil').toLowerCase();
    const caseType = rawType === 'state' || rawType === 'criminal' ? 'STATE (CRIMINAL)' : rawType.replace('_', ' ').toUpperCase();
    const court = c.courtName || c.criminalCourtName || '';
    const client = c.clientName || c.criminalClientName || '';
    const phone = c.clientNumber || c.criminalClientNumber || '';
    const isDisposed = (c.caseStatus || '').toLowerCase().includes('dispose');
    const status = isDisposed ? 'Disposed Off' : 'Pending';
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
      escapeCSV(remark)
    ].join(',');
  });

  const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const today = new Date().toISOString().split('T')[0];
  a.href = url;
  a.download = `All_Cases_Register_${today}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Window exposures
if (typeof updateAllCasesTypePillCounts !== 'undefined') window.updateAllCasesTypePillCounts = updateAllCasesTypePillCounts;
if (typeof filterAllCasesByType !== 'undefined') window.filterAllCasesByType = filterAllCasesByType;
if (typeof handleAllCasesTypeSelectChange !== 'undefined') window.handleAllCasesTypeSelectChange = handleAllCasesTypeSelectChange;
if (typeof resetAllCasesFilters !== 'undefined') window.resetAllCasesFilters = resetAllCasesFilters;
if (typeof renderAllCasesTableWithFilters !== 'undefined') window.renderAllCasesTableWithFilters = renderAllCasesTableWithFilters;
if (typeof handleAllCasesPageSizeChange !== 'undefined') window.handleAllCasesPageSizeChange = handleAllCasesPageSizeChange;
if (typeof changeAllCasesPage !== 'undefined') window.changeAllCasesPage = changeAllCasesPage;
if (typeof renderAllCasesPaginationControls !== 'undefined') window.renderAllCasesPaginationControls = renderAllCasesPaginationControls;
if (typeof renderCaseCards !== 'undefined') window.renderCaseCards = renderCaseCards;
if (typeof setCaseCardsPill !== 'undefined') window.setCaseCardsPill = setCaseCardsPill;
if (typeof toggleCaseCard !== 'undefined') window.toggleCaseCard = toggleCaseCard;
if (typeof deleteCaseCard !== 'undefined') window.deleteCaseCard = deleteCaseCard;
if (typeof toggleCaseCardSection !== 'undefined') window.toggleCaseCardSection = toggleCaseCardSection;
if (typeof editCaseFromTable !== 'undefined') window.editCaseFromTable = editCaseFromTable;
if (typeof exportAllCasesCsv !== 'undefined') window.exportAllCasesCsv = exportAllCasesCsv;

function renderUpcomingWeekHearings() {
  const container = document.getElementById('upcomingWeekContainer');
  const countBadge = document.getElementById('upcomingWeekCount');
  if (!container) return;

  const now = new Date();
  const todayZero = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const in7Days = new Date(todayZero.getTime() + (7 * 24 * 60 * 60 * 1000) + (23 * 60 * 60 * 1000));

  const upcoming = allCaseRecords.filter(c => {
    if (!c.nextHearing || c.nextHearing === '—' || c.nextHearing === 'null' || !c.nextHearing.trim()) return false;
    if ((c.caseStatus || '').toLowerCase().includes('dispose')) return false;

    const parsed = parseDateString(c.nextHearing);
    if (!parsed) return false;
    const hTime = parsed.getTime();
    return hTime >= todayZero.getTime() && hTime <= in7Days.getTime();
  }).sort((a, b) => {
    const da = parseDateString(a.nextHearing) || new Date(9999, 11, 31);
    const db = parseDateString(b.nextHearing) || new Date(9999, 11, 31);
    return da - db;
  });

  const navBadge = document.getElementById('upcomingNavCount');
  if (navBadge) {
    navBadge.textContent = String(upcoming.length);
  }

  const totalBadge = document.getElementById('upcomingTotalBadge');
  if (totalBadge) {
    totalBadge.textContent = `${upcoming.length} Hearing${upcoming.length === 1 ? '' : 's'} Listed`;
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

  container.innerHTML = upcoming.map(c => {
    const caseNum = c.caseNo || c.criminalCaseNumber || '—';
    const caseName = c.caseName || (c.plaintiff ? `${c.plaintiff} vs ${c.defendant || 'Opposite'}` : `${c.victimName || 'State'} vs ${c.accusedName || 'Accused'}`) || '—';
    const court = c.courtName || c.criminalCourtName || 'District Court';
    const dateFormatted = formatDateDMY(c.nextHearing);
    const stage = c.hearingProcess || c.process || 'Scheduled Hearing';
    const clientName = c.clientName || c.criminalClientName || 'Client';
    const clientPhone = c.clientNumber || c.criminalClientNumber || '';
    const rawType = (c.caseType || 'civil').toLowerCase();
    const typeLabel = rawType === 'state' || rawType === 'criminal' ? 'CRIMINAL' : rawType.replace('_', ' ').toUpperCase();
    const remark = c.remark || c.remarks || '';

    const parsedHearing = parseDateString(c.nextHearing);
    let daysBadgeClass = '';
    let daysBadgeIcon = 'fa-regular fa-calendar';
    let daysLeftText = 'Scheduled';
    let isUrgentToday = false;

    if (parsedHearing) {
      const diffTime = parsedHearing.getTime() - todayZero.getTime();
      const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (daysLeft === 0) {
        daysBadgeClass = 'today';
        daysBadgeIcon = 'fa-solid fa-fire';
        daysLeftText = 'Today in Court';
        isUrgentToday = true;
      } else if (daysLeft === 1) {
        daysBadgeClass = 'tomorrow';
        daysBadgeIcon = 'fa-solid fa-bolt';
        daysLeftText = 'Tomorrow';
      } else {
        daysBadgeIcon = 'fa-regular fa-clock';
        daysLeftText = `In ${daysLeft} Days`;
      }
    }

    return `
      <div class="legal-hearing-card ${isUrgentToday ? 'urgent-today' : ''}">
        <!-- Top Status & Category Strip -->
        <div class="hearing-card-header">
          <span class="hearing-countdown-badge ${daysBadgeClass}">
            <i class="${daysBadgeIcon}"></i> ${daysLeftText}
          </span>
          <span class="hearing-type-badge ${rawType}">
            ${typeLabel}
          </span>
        </div>

        <!-- Case Identity Header Block: Case Name Bigger & Prominent -->
        <div class="hearing-card-title-block">
          <div class="hearing-caseno-row">
            <span class="hearing-caseno-tag"><i class="fa-solid fa-hashtag" style="font-size: 11px;"></i> ${escapeHtml(caseNum)}</span>
            <button type="button" class="hearing-dossier-pill-btn" onclick="openCaseHistoryModalByNo('${escapeHtml(caseNum)}')" title="View Complete Case Dossier">
              <i class="fa-solid fa-folder-open"></i> Dossier
            </button>
          </div>
          <h3 class="hearing-casename" title="${escapeHtml(caseName)}">${escapeHtml(caseName)}</h3>
        </div>

        <!-- Hearing Date & Court Location Highlight Strip -->
        <div class="hearing-datetime-strip">
          <div class="hearing-card-date">
            <i class="fa-solid fa-calendar-day"></i>
            <span>${dateFormatted}</span>
          </div>
          <div class="hearing-card-court" title="${escapeHtml(court)}">
            🏛️ ${escapeHtml(court)}
          </div>
        </div>

        <!-- Structured Case Metadata Details -->
        <div class="hearing-meta-table">
          <div class="hearing-meta-row">
            <span class="hearing-meta-lbl"><i class="fa-solid fa-stairs"></i> Stage / Purpose</span>
            <span class="hearing-meta-val highlight-stage" title="${escapeHtml(stage)}">${escapeHtml(stage)}</span>
          </div>
          <div class="hearing-meta-row">
            <span class="hearing-meta-lbl"><i class="fa-solid fa-user-tie"></i> Client</span>
            <span class="hearing-meta-val" title="${escapeHtml(clientName)}">${escapeHtml(clientName)}</span>
          </div>
          ${clientPhone ? `
          <div class="hearing-meta-row">
            <span class="hearing-meta-lbl"><i class="fa-solid fa-phone"></i> Contact</span>
            <span class="hearing-meta-val" style="font-family: monospace; font-size: 12px;">${escapeHtml(clientPhone)}</span>
          </div>
          ` : ''}
        </div>

        ${remark ? `
        <div class="hearing-remark-box" title="${escapeHtml(remark)}">
          <i class="fa-solid fa-note-sticky"></i>
          <div><strong>Note:</strong> ${escapeHtml(remark)}</div>
        </div>
        ` : ''}

        <!-- Footer Actions: Proceedings History + Direct Call + WhatsApp Notice -->
        <div class="hearing-card-footer">
          <button type="button" class="hearing-primary-cta" onclick="openCaseHistoryModalByNo('${escapeHtml(caseNum)}')">
            <i class="fa-solid fa-file-lines"></i> Proceedings
          </button>
          ${clientPhone ? `
          <a href="tel:${escapeHtml(clientPhone)}" class="hearing-call-cta" title="Call Client directly: ${escapeHtml(clientPhone)}">
            <i class="fa-solid fa-phone"></i> Call
          </a>
          ` : `
          <button type="button" class="hearing-call-cta disabled" title="No client phone number registered" disabled>
            <i class="fa-solid fa-phone-slash"></i> Call
          </button>
          `}
          <button type="button" class="hearing-whatsapp-cta" onclick="sendWhatsAppHearingNotice('${escapeHtml(caseNum)}')" title="Dispatch WhatsApp reminder to client">
            <i class="fa-brands fa-whatsapp"></i> Notice
          </button>
        </div>
      </div>
    `;
  }).join('');
}

if (typeof renderUpcomingWeekHearings !== 'undefined') window.renderUpcomingWeekHearings = renderUpcomingWeekHearings;

