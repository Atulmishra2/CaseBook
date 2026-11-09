window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs['upcoming'] = `<div class="upcoming-dashboard-wrapper" data-upcoming-scope id="upcomingDashboardWrapper">
    <div class="board upcoming-board-shell" id="upcomingBoardShell">
        <!-- Upcoming Court Hearings Header Banner (Cause List Judicial Style) -->
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
            <div class="head-actions" id="upcomingHeadActions">
                <!-- Dual View Switcher (Docket Table vs Cards) - To the right of Title on Desktop -->
                <div class="upcoming-view-toggle view-toggle" id="upcomingViewToggle" role="group" aria-label="Switch upcoming display mode">
                    <button type="button" class="view-btn active" id="upcomingViewToggleTable" onclick="setUpcomingViewMode('table')" title="Switch to Docket Table View" aria-label="Switch to Docket Table View">
                        <svg class="lucide lucide-table-2" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg> <span>Docket Table</span>
                    </button>
                    <button type="button" class="view-btn" id="upcomingViewToggleCards" onclick="setUpcomingViewMode('cards')" title="Switch to Cards View" aria-label="Switch to Cards View">
                        <svg class="lucide lucide-layout-grid" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg> <span>Cards</span>
                    </button>
                </div>
            </div>
        </header>

        <!-- TOOLBAR: Quick Horizon Presets + Court Forum Filter + Segmented View Mode Toggle -->
        <div class="toolbar upcoming-toolbar">
            <!-- Controls Deck Row: [Court Dropdown (50% on mobile)] + [Segmented Toggle (moved here on mobile)] -->
            <div class="upcoming-controls-row" id="upcomingControlsRow">
                <!-- Court Forum Filter Custom Dropdown -->
                <div class="custom-dropdown upcoming-court-custom-dropdown" id="upcomingCourtDropdown">
                    <select
                        id="upcomingCourtFilterSelect"
                        class="sr-only"
                        style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); border: 0;"
                        tabindex="-1"
                        aria-hidden="true"
                        onchange="if (typeof renderUpcomingWeekHearings === 'function') renderUpcomingWeekHearings();"
                    >
                        <option value="">All Courts</option>
                    </select>
                    <button
                        type="button"
                        class="custom-dropdown-trigger"
                        id="upcomingCourtDropdownTrigger"
                        aria-haspopup="listbox"
                        aria-expanded="false"
                        onclick="if (typeof toggleUpcomingCourtDropdown === 'function') toggleUpcomingCourtDropdown();"
                        title="Filter by Court Forum"
                    >
                        <svg class="lucide lucide-landmark custom-dropdown-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>
                        <span class="custom-dropdown-label" id="upcomingCourtDropdownLabel">All Courts</span>
                        <svg class="lucide lucide-chevron-down custom-dropdown-chevron" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </button>
                    <div class="custom-dropdown-menu" id="upcomingCourtDropdownMenu">
                        <ul class="custom-dropdown-list custom-scrollbar" id="upcomingCourtDropdownList" role="listbox"></ul>
                    </div>
                </div>
            </div>

            <!-- Horizon Preset Chips (Full Width on Mobile) -->
            <div class="chips upcoming-chips-full" role="group" aria-label="Upcoming Horizon Presets">
                <button type="button" class="chip active" id="upcomingChip7" onclick="setUpcomingDaysFilter(7)">Next 7 Days</button>
                <button type="button" class="chip" id="upcomingChip1" onclick="setUpcomingDaysFilter(1)">Today</button>
                <button type="button" class="chip" id="upcomingChip2" onclick="setUpcomingDaysFilter(2)">Tomorrow</button>
                <button type="button" class="chip" id="upcomingChip3" onclick="setUpcomingDaysFilter(3)">+3 Days</button>
            </div>
        </div>

        <!-- VIEW 1: CAUSE LIST PATTERN DOCKET LIST (Collapsible 5-Col Grid + 3-Col Ledger) -->
        <div id="upcomingTableViewContainer" class="upcoming-view-section">
            <div class="list upcoming-docket-list" id="upcomingDocketList" role="region" aria-label="Upcoming Court Hearings Docket">
                <!-- Dynamically populated with cause list pattern accordion rows -->
            </div>

            <!-- Preserved table for automated test and headless script compatibility -->
            <div class="upcoming-table-card" style="display: none !important;" aria-hidden="true">
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
            <!-- Dynamically populated with cards -->
        </div>

        <!-- FOOTER: Sync Status & Counts -->
        <footer class="foot upcoming-foot">
            <span class="live">
                <i aria-hidden="true"></i>
                <span id="upcomingFooterCount">SHOWING 0 OF 0 CASES</span>
            </span>
            <span class="foot-sync">UPDATED LIVE <span class="sep">·</span> SYNC OK</span>
        </footer>
    </div>
</div>

<!-- Preserved Mounts for existing scripts/services/tests compatibility -->
<div style="display: none !important;" aria-hidden="true">
    <span id="upcomingListedCountChip">0 Hearings Listed</span>
    <span id="upcomingWeekCount">0</span>
</div>`;

var currentUpcomingDaysFilter = typeof currentUpcomingDaysFilter !== "undefined" ? currentUpcomingDaysFilter : 7;
var currentUpcomingCourtFilter = typeof currentUpcomingCourtFilter !== "undefined" ? currentUpcomingCourtFilter : "";
var currentUpcomingViewMode = typeof currentUpcomingViewMode !== "undefined" ? currentUpcomingViewMode : "table";

if (typeof window !== "undefined") {
  window.currentUpcomingDaysFilter = currentUpcomingDaysFilter;
  window.currentUpcomingCourtFilter = currentUpcomingCourtFilter;
  window.currentUpcomingViewMode = currentUpcomingViewMode;
}

function toggleUpcomingAccordion(btn) {
  if (!btn) return;
  const card = btn.closest(".case");
  if (!card) return;
  const isCurrentlyOpen = card.classList.contains("open");
  card.classList.toggle("open", !isCurrentlyOpen);
  btn.setAttribute("aria-expanded", !isCurrentlyOpen ? "true" : "false");
}
if (typeof window !== "undefined") {
  window.toggleUpcomingAccordion = toggleUpcomingAccordion;
}

function setUpcomingDaysFilter(days) {
  currentUpcomingDaysFilter = parseInt(days, 10) || 7;
  if (typeof window !== "undefined") window.currentUpcomingDaysFilter = currentUpcomingDaysFilter;

  // Sync active chip
  [7, 1, 2, 3].forEach((d) => {
    const chip = document.getElementById(`upcomingChip${d}`);
    if (chip) chip.classList.toggle("active", d === currentUpcomingDaysFilter);
  });

  // Sync header subline
  const subline = document.getElementById("upcomingFormattedSubline");
  if (subline) {
    if (currentUpcomingDaysFilter === 1) subline.textContent = "Today";
    else if (currentUpcomingDaysFilter === 2) subline.textContent = "Today & Tomorrow";
    else if (currentUpcomingDaysFilter === 3) subline.textContent = "Next 3 Days";
    else subline.textContent = "Next 7 Days";
  }

  if (typeof renderUpcomingWeekHearings === "function") {
    renderUpcomingWeekHearings();
  } else if (typeof window !== "undefined" && typeof window.renderUpcomingWeekHearings === "function") {
    window.renderUpcomingWeekHearings();
  }
}
if (typeof window !== "undefined") {
  window.setUpcomingDaysFilter = setUpcomingDaysFilter;
}

function toggleUpcomingCourtDropdown() {
  const dropdown = document.getElementById("upcomingCourtDropdown");
  const trigger = document.getElementById("upcomingCourtDropdownTrigger");
  if (!dropdown) return;
  const isOpen = dropdown.classList.toggle("open");
  if (trigger) trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
}
if (typeof window !== "undefined") {
  window.toggleUpcomingCourtDropdown = toggleUpcomingCourtDropdown;
}

// Global dismiss handlers for outside click and escape key
if (typeof document !== "undefined") {
  document.addEventListener("click", function(e) {
    const dropdown = document.getElementById("upcomingCourtDropdown");
    if (!dropdown || !dropdown.classList.contains("open")) return;
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("open");
      const trigger = document.getElementById("upcomingCourtDropdownTrigger");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
      const dropdown = document.getElementById("upcomingCourtDropdown");
      if (dropdown && dropdown.classList.contains("open")) {
        dropdown.classList.remove("open");
        const trigger = document.getElementById("upcomingCourtDropdownTrigger");
        if (trigger) {
          trigger.setAttribute("aria-expanded", "false");
          trigger.focus();
        }
      }
    }
  });
}

function selectUpcomingCourtFilter(courtVal) {
  const select = document.getElementById("upcomingCourtFilterSelect");
  const label = document.getElementById("upcomingCourtDropdownLabel");
  const dropdown = document.getElementById("upcomingCourtDropdown");
  const trigger = document.getElementById("upcomingCourtDropdownTrigger");

  currentUpcomingCourtFilter = (courtVal || "").trim();
  if (typeof window !== "undefined") window.currentUpcomingCourtFilter = currentUpcomingCourtFilter;

  if (select) select.value = currentUpcomingCourtFilter;
  if (label) label.textContent = currentUpcomingCourtFilter || "All Courts";
  if (dropdown) dropdown.classList.remove("open");
  if (trigger) trigger.setAttribute("aria-expanded", "false");

  if (typeof renderUpcomingWeekHearings === "function") {
    renderUpcomingWeekHearings();
  } else if (typeof window !== "undefined" && typeof window.renderUpcomingWeekHearings === "function") {
    window.renderUpcomingWeekHearings();
  }
}
if (typeof window !== "undefined") {
  window.selectUpcomingCourtFilter = selectUpcomingCourtFilter;
}

function populateUpcomingCourtDropdown(courts) {
  const select = document.getElementById("upcomingCourtFilterSelect");
  const list = document.getElementById("upcomingCourtDropdownList");
  if (!list) return;

  const uniqueCourts = Array.from(new Set(courts.filter(Boolean))).sort((a, b) => a.localeCompare(b));
  
  if (select) {
    const curVal = select.value;
    select.innerHTML = `<option value="">All Courts</option>` + uniqueCourts.map(c => `<option value="${escapeUpcomingHtml(c)}">${escapeUpcomingHtml(c)}</option>`).join("");
    select.value = curVal;
  }

  const activeCourt = currentUpcomingCourtFilter || "";
  let itemsHtml = `
    <li class="custom-dropdown-item ${!activeCourt ? 'selected' : ''}" role="option" aria-selected="${!activeCourt ? 'true' : 'false'}" onclick="selectUpcomingCourtFilter('')">
      <span class="truncate">All Courts</span>
      ${!activeCourt ? '<svg class="lucide lucide-check checkmark" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
    </li>
  `;

  uniqueCourts.forEach(c => {
    const isSelected = activeCourt.toLowerCase() === c.toLowerCase();
    itemsHtml += `
      <li class="custom-dropdown-item ${isSelected ? 'selected' : ''}" role="option" aria-selected="${isSelected ? 'true' : 'false'}" onclick="selectUpcomingCourtFilter('${escapeUpcomingHtml(c)}')">
        <span class="truncate">${escapeUpcomingHtml(c)}</span>
        ${isSelected ? '<svg class="lucide lucide-check checkmark" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
      </li>
    `;
  });

  list.innerHTML = itemsHtml;
}
if (typeof window !== "undefined") {
  window.populateUpcomingCourtDropdown = populateUpcomingCourtDropdown;
}

function escapeUpcomingHtml(str) {
  if (typeof str !== "string") return str == null ? "" : String(str);
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

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

function syncUpcomingTogglePlacement() {
  if (typeof document === 'undefined') return;
  const toggle = document.getElementById('upcomingViewToggle');
  const desktopTarget = document.getElementById('upcomingHeadActions');
  const mobileTarget = document.getElementById('upcomingControlsRow');
  if (!toggle || !desktopTarget || !mobileTarget) return;

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  if (isMobile) {
    if (toggle.parentElement !== mobileTarget) {
      mobileTarget.appendChild(toggle);
    }
  } else {
    if (toggle.parentElement !== desktopTarget) {
      desktopTarget.appendChild(toggle);
    }
  }
}
if (typeof window !== 'undefined') {
  window.syncUpcomingTogglePlacement = syncUpcomingTogglePlacement;
  window.addEventListener('resize', syncUpcomingTogglePlacement);
}

function initUpcomingTab() {
  if (typeof syncUpcomingTogglePlacement === 'function') {
    syncUpcomingTogglePlacement();
  }

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
