window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs['upcoming'] = `<div class="upcoming-dashboard-wrapper">
    <!-- Upcoming Court Hearings Header Banner (Master Calendar Style) -->
    <header class="board-head upcoming-master-head">
        <div class="head-left">
            <div class="h1">
                <span class="crest" aria-hidden="true">
                    <svg class="lucide lucide-gavel" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8"/><path d="m16 16 6-6"/><path d="m8 8 6-6"/><path d="m9 7 8 8"/><path d="m21 11-8-8"/></svg>
                </span>
                <span class="h1-text" id="upcomingMainTitle">Upcoming Court Hearings</span>
            </div>
            <div class="sub" id="upcomingHeaderSubline">
                <b id="upcomingFormattedSubline">Next 7 Days</b> · <span id="upcomingTotalBadge" class="upcoming-stat-pill">0 Hearings Listed</span>
            </div>
        </div>
        <div class="head-actions">
            <!-- Dual View Switcher (Table vs Cards) -->
            <div class="upcoming-view-toggle view-toggle" role="group" aria-label="Switch upcoming display mode">
                <button type="button" class="view-btn active" id="upcomingViewToggleTable" onclick="setUpcomingViewMode('table')" title="Switch to Table View" aria-label="Switch to Table View">
                    <svg class="lucide lucide-table-2" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg> <span>Table</span>
                </button>
                <button type="button" class="view-btn" id="upcomingViewToggleCards" onclick="setUpcomingViewMode('cards')" title="Switch to Cards View" aria-label="Switch to Cards View">
                    <svg class="lucide lucide-layout-grid" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg> <span>Cards</span>
                </button>
            </div>
        </div>
    </header>

    <!-- VIEW 1: EXECUTIVE TABLE VIEW (Desktop Optimized) -->
    <div id="upcomingTableViewContainer" class="upcoming-view-section">
        <div class="upcoming-table-card">
            <div class="table-scroll-wrapper">
                <table class="upcoming-docket-table" id="upcomingDocketTable">
                    <thead>
                        <tr>
                            <th style="width: 130px;">DATE</th>
                            <th style="width: 130px;">CASE NO</th>
                            <th style="min-width: 250px;">CASE TITLE</th>
                            <th style="width: 160px;">COURT</th>
                            <th style="width: 140px;">STAGE</th>
                            <th style="width: 150px;">CLIENT</th>
                            <th style="width: 130px; text-align: center;">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody id="upcomingTableBody">
                        <tr class="upcoming-loading-row">
                            <td colspan="7" style="text-align: center; padding: 36px 20px;">
                                <div style="display: inline-flex; align-items: center; gap: 10px; color: var(--cc-text-muted);">
                                    <svg class="lucide lucide-loader-2 upcoming-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Loading upcoming court hearings docket...
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- VIEW 2: CARDS GRID VIEW (Mobile Ergonomic & Alternative View) -->
    <div id="upcomingWeekContainer" class="legal-hearing-grid hidden">
        <div class="legal-hearing-card case-card">
            <div class="card-header">
                <div class="status-text">
                    <svg class="lucide lucide-clock" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    <span>Upcoming</span>
                </div>
                <div class="case-type">CIVIL</div>
            </div>

            <div class="card-body">
                <div class="badge-row">
                    <span class="meta-text"><svg class="lucide lucide-hash" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/></svg> OS/—/2024</span>
                    <button type="button" class="dossier-link-btn meta-text" onclick="showTab('all')" title="View Case Dossier" aria-label="View Case Dossier">
                        <svg class="lucide lucide-folder-archive" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="13" r="2"/><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
                        <span>Dossier</span>
                    </button>
                </div>

                <h3 class="case-title">Loading Upcoming Court Hearings...</h3>

                <div class="date-location-row">
                    <span class="date-text">
                        <svg class="lucide lucide-calendar" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
                        Today
                    </span>
                    <span class="location-text">
                        <svg class="lucide lucide-landmark" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>
                        District Court
                    </span>
                </div>

                <div class="data-row">
                    <span class="data-label">
                        <svg class="lucide lucide-trending-up" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                        Stage / Purpose
                    </span>
                    <span class="data-value highlight-stage">Appearance</span>
                </div>

                <div class="data-row">
                    <span class="data-label">
                        <svg class="lucide lucide-user" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        Client
                    </span>
                    <span class="data-value">—</span>
                </div>
            </div>

            <!-- 🆕 FULL WIDTH 33% BOTTOM NAV -->
            <div class="bottom-nav hearing-card-footer">
                <button type="button" class="nav-btn proceedings hearing-proceedings-btn" onclick="showTab('all')" title="View Case Proceedings History" aria-label="View Case Proceedings History">
                    <svg class="lucide lucide-file-text" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
                    Proceedings
                </button>
                <button type="button" class="nav-btn call hearing-call-cta" title="Call Client" aria-label="Call Client">
                    <svg class="lucide lucide-phone" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    Call
                </button>
                <button type="button" class="nav-btn notice hearing-whatsapp-cta" title="Send WhatsApp alert" aria-label="Send WhatsApp alert">
                    <svg class="lucide lucide-message-circle" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
                    Notice
                </button>
            </div>
        </div>
    </div>
</div>

<!-- Preserved Mounts for existing scripts/services/tests compatibility -->
<div style="display: none !important;" aria-hidden="true">
    <span id="upcomingListedCountChip">0 Hearings Listed</span>
    <span id="upcomingWeekCount">0</span>
</div>`;

function toggleUpcomingCardNote(header) {
  if (!header) return;
  const isExpanded = header.classList.toggle('active');
  header.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
  const body = header.nextElementSibling;
  if (body) {
    body.classList.toggle('show');
  }
}
if (typeof window !== 'undefined') {
  window.toggleUpcomingCardNote = toggleUpcomingCardNote;
}

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
if (typeof window !== "undefined") {
  window.setUpcomingViewMode = setUpcomingViewMode;
}

function initUpcomingTab() {
  if (typeof renderUpcomingWeekHearings === 'function') {
    renderUpcomingWeekHearings();
  } else if (typeof window !== 'undefined' && typeof window.renderUpcomingWeekHearings === 'function') {
    window.renderUpcomingWeekHearings();
  }

  // Restore saved view mode or auto-select based on viewport
  let preferredMode = "table";
  try {
    if (typeof localStorage !== "undefined") {
      const saved = localStorage.getItem("casebook_upcoming_view_mode");
      if (saved === "table" || saved === "cards") {
        preferredMode = saved;
      } else if (typeof window !== "undefined" && window.innerWidth < 992) {
        preferredMode = "cards";
      }
    }
  } catch (e) {}
  setUpcomingViewMode(preferredMode);
}
if (typeof initUpcomingTab !== 'undefined') window.initUpcomingTab = initUpcomingTab;
