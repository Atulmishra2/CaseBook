/**
 * CaseBook Dedicated Undated Cases & Date Forwarding Tab Module
 * Location: components/tabs/undated/tab-undated.js
 * Multi-Tab Parity: Conforms 100% to DESIGN.md and ui-rules.md
 */

window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs['undated'] = `<div class="undated-dashboard-wrapper" data-undated-scope id="undatedDashboardWrapper">
    <div class="board undated-board-shell" id="undatedBoardShell">
        <!-- Master Header: Judicial Red/Gold Crest & Total Badge -->
        <header class="board-head undated-master-head">
            <div class="head-left">
                <!-- Navigation Breadcrumb -->
                <nav class="breadcrumb-bar undated-breadcrumb" aria-label="Breadcrumb">
                    <button type="button" class="crumb-link undated-crumb-link" onclick="showTab('all', event)" title="Return to Cases Register">
                        <svg class="lucide lucide-folder-archive" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg>
                        <span>Cases Register</span>
                    </button>
                    <svg class="lucide lucide-chevron-right crumb-sep undated-crumb-sep" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
                    <span class="crumb-current undated-crumb-current">Undated Cases</span>
                </nav>
                <h1 class="h1">
                    <span class="crest undated-crest" aria-hidden="true">
                        <svg class="lucide lucide-calendar-off" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M4.18 4.18A2 2 0 0 0 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 1.82-1.18"></path>
                            <path d="M21 15.5V6a2 2 0 0 0-2-2H9.5"></path>
                            <path d="M16 2v4"></path>
                            <path d="M3 10h7"></path>
                            <path d="M21 10h-5.5"></path>
                            <line x1="2" x2="22" y1="2" y2="22"></line>
                        </svg>
                    </span>
                    <span class="h1-text" id="undatedMainTitle">Undated Cases <span class="undated-title-suffix">Register</span></span>
                </h1>
                <div class="sub" id="undatedHeaderSubline">
                    <b id="undatedTotalBadge">0 Cases</b> · <span class="undated-stat-pill"><span class="pill-full">Action Required: Schedule Hearing Dates</span><span class="pill-short">Action Required</span></span>
                </div>
            </div>
            <div class="head-actions" id="undatedHeadActions">
                <!-- Sync / Refresh from Supabase Action Button -->
                <button
                    type="button"
                    class="undated-refresh-btn"
                    id="undatedRefreshBtn"
                    onclick="refreshUndatedFromSupabase(true)"
                    title="Fetch and sync fresh cases from Supabase database"
                    aria-label="Refresh Undated Cases from Supabase"
                >
                    <svg class="lucide lucide-refresh-cw" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                        <path d="M21 3v5h-5"/>
                        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                        <path d="M3 21v-5h5"/>
                    </svg>
                    <span>Sync Supabase</span>
                </button>

                <!-- Dual View Switcher (Docket Table vs Cards) -->
                <div class="undated-view-toggle view-toggle" id="undatedViewToggle" role="group" aria-label="Switch display mode">
                    <button type="button" class="view-btn active" id="undatedViewToggleTable" onclick="setUndatedViewMode('table', true)" title="Switch to Docket Table View" aria-label="Switch to Docket Table View">
                        <svg class="lucide lucide-table-2" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg> <span>Docket Table</span>
                    </button>
                    <button type="button" class="view-btn" id="undatedViewToggleCards" onclick="setUndatedViewMode('cards', true)" title="Switch to Cards View" aria-label="Switch to Cards View">
                        <svg class="lucide lucide-layout-grid" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg> <span>Cards</span>
                    </button>
                </div>

                <!-- Return to Cases Register Action Button -->
                <button
                    type="button"
                    class="undated-back-btn"
                    id="undatedBackToAllBtn"
                    onclick="showTab('all', event)"
                    title="Return to Cases Register"
                    aria-label="Return to Cases Register"
                >
                    <svg class="lucide lucide-arrow-left" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="m12 19-7-7 7-7"></path>
                        <path d="M19 12H5"></path>
                    </svg>
                    <span>Cases Register</span>
                </button>
            </div>
        </header>

        <!-- TOOLBAR: Search Bar + Court Dropdown + Category Chips + Urgency Chips -->
        <div class="toolbar undated-toolbar">
            <div class="undated-controls-row" id="undatedControlsRow">
                <!-- Omni Search Input -->
                <div class="undated-search-wrap">
                    <svg class="lucide lucide-search undated-search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    <input
                        type="text"
                        id="undatedSearchInput"
                        class="undated-search-input"
                        placeholder="Search case number, parties, client, court..."
                        oninput="handleUndatedSearchInput(this.value)"
                        autocomplete="off"
                        spellcheck="false"
                    />
                    <button type="button" id="undatedClearSearchBtn" class="undated-clear-btn hidden" onclick="clearUndatedSearch()" title="Clear Search">
                        <svg class="lucide lucide-x" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                </div>

                <!-- Court Forum Filter Custom Dropdown -->
                <div class="custom-dropdown undated-court-custom-dropdown" id="undatedCourtDropdown">
                    <select id="undatedCourtFilterSelect" class="sr-only" tabindex="-1" aria-hidden="true" onchange="renderUndatedCasesTab()">
                        <option value="">All Courts</option>
                    </select>
                    <button
                        type="button"
                        class="custom-dropdown-trigger dropdown-trigger"
                        id="undatedCourtDropdownTrigger"
                        aria-haspopup="listbox"
                        aria-expanded="false"
                        onclick="toggleUndatedCourtDropdown()"
                        title="Filter by Court Forum"
                    >
                        <svg class="lucide lucide-landmark custom-dropdown-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>
                        <span class="custom-dropdown-label dropdown-label" id="undatedCourtDropdownLabel">All Courts</span>
                        <svg class="lucide lucide-chevron-down custom-dropdown-chevron dropdown-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
                    </button>
                    <div class="custom-dropdown-menu dropdown-menu opacity-0 invisible scale-95" id="undatedCourtDropdownMenu">
                        <div class="custom-dropdown-search-wrap">
                            <div class="custom-dropdown-search-inner">
                                <svg class="lucide lucide-search custom-dropdown-search-icon" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                                <input type="text" id="undatedCourtDropdownSearch" class="custom-dropdown-search-input" placeholder="Search courts..." autocomplete="off">
                            </div>
                        </div>
                        <ul class="custom-dropdown-list options-list custom-scrollbar" id="undatedCourtDropdownList" role="listbox"></ul>
                        <div id="undatedCourtDropdownEmpty" class="custom-dropdown-empty empty-state hidden">No courts found.</div>
                    </div>
                </div>
            </div>

            <!-- Filter Chips Deck: Category Pills -->
            <div class="undated-chips-row">
                <div class="chips category-chips" role="group" aria-label="Category Filter">
                    <button type="button" class="chip active" id="undatedCatAll" onclick="setUndatedCategoryFilter('')">All Undated (<span id="undatedChipCountAll">0</span>)</button>
                    <button type="button" class="chip" id="undatedCatCivil" onclick="setUndatedCategoryFilter('civil')">Civil</button>
                    <button type="button" class="chip" id="undatedCatState" onclick="setUndatedCategoryFilter('state')">Criminal / State</button>
                    <button type="button" class="chip" id="undatedCatFamily" onclick="setUndatedCategoryFilter('family')">Family</button>
                    <button type="button" class="chip" id="undatedCatRevenue" onclick="setUndatedCategoryFilter('revenue')">Revenue</button>
                </div>
            </div>
        </div>

        <!-- VIEW 1: DOCKET TABLE VIEW (Default Master View) -->
        <div id="undatedTableViewContainer" class="undated-table-view-container">
            <div class="undated-table-card">
                <div class="undated-table-scroll custom-scrollbar">
                    <table class="undated-docket-table" id="undatedDocketTable">
                        <thead>
                            <tr>
                                <th scope="col" class="col-case">CASE NUMBER</th>
                                <th scope="col" class="col-title">CASE NAME</th>
                                <th scope="col" class="col-court">COURT</th>
                                <th scope="col" class="col-past-date">PAST DATE</th>
                                <th scope="col" class="col-stage">CASE STAGE</th>
                                <th scope="col" class="col-action">ACTION</th>
                            </tr>
                        </thead>
                        <tbody id="undatedTableBody">
                            <tr class="undated-loading-row">
                                <td colspan="6">
                                    <div class="undated-loading-inner">
                                        <svg class="lucide lucide-loader-2 undated-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                                        <span>Loading undated court cases register...</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- VIEW 2: CARDS GRID VIEW (Mobile Ergonomic & Alternative View) -->
        <div id="undatedCardsViewContainer" class="undated-cards-grid hidden">
            <!-- Dynamically populated with cards -->
        </div>

        <!-- FOOTER: Sync Status & Counts -->
        <footer class="foot undated-foot">
            <span class="live">
                <i aria-hidden="true"></i>
                <span id="undatedFooterCount">SHOWING 0 OF 0 CASES</span>
            </span>
            <span class="foot-sync" id="undatedFootSync">UPDATED LIVE <span class="sep">·</span> SYNC OK</span>
        </footer>
    </div>
</div>`;

// --- Global Filter States ---
var currentUndatedSearchQuery = '';
var currentUndatedCourtFilter = '';
var currentUndatedCategoryFilter = '';
var currentUndatedUrgencyFilter = 'all'; // 'all' | 'overdue' | 'never'
var currentUndatedViewMode = 'table'; // 'table' | 'cards'

if (typeof window !== 'undefined') {
  window.currentUndatedSearchQuery = currentUndatedSearchQuery;
  window.currentUndatedCourtFilter = currentUndatedCourtFilter;
  window.currentUndatedCategoryFilter = currentUndatedCategoryFilter;
  window.currentUndatedUrgencyFilter = currentUndatedUrgencyFilter;
  window.currentUndatedViewMode = currentUndatedViewMode;
}

/**
 * Refreshes all case data from Supabase and re-renders the Undated Cases register
 */
async function refreshUndatedFromSupabase(showFeedback = true) {
  const syncBtn = document.getElementById('undatedRefreshBtn');
  const footSync = document.getElementById('undatedFootSync');
  if (syncBtn) {
    syncBtn.classList.add('loading');
    const icon = syncBtn.querySelector('.lucide-refresh-cw');
    if (icon) icon.classList.add('undated-spin');
  }
  if (footSync) {
    footSync.innerHTML = '<span class="undated-spin-icon">⟳</span> SYNCING WITH SUPABASE...';
  }

  try {
    if (typeof fetchAllDataFromSupabase === 'function') {
      await fetchAllDataFromSupabase();
    } else if (typeof window !== 'undefined' && typeof window.fetchAllDataFromSupabase === 'function') {
      await window.fetchAllDataFromSupabase();
    }
  } catch (err) {
    console.warn('[Undated] Supabase fetch error:', err);
  } finally {
    if (syncBtn) {
      syncBtn.classList.remove('loading');
      const icon = syncBtn.querySelector('.lucide-refresh-cw');
      if (icon) icon.classList.remove('undated-spin');
    }
    if (footSync) {
      footSync.textContent = 'UPDATED LIVE · SYNC OK';
    }
    renderUndatedCasesTab();
    updateTopnavUndatedCount();
  }
}

function formatUndatedDateDMY(dateVal) {
  if (typeof formatDateDMY === 'function') return formatDateDMY(dateVal);
  if (typeof window !== 'undefined' && typeof window.formatDateDMY === 'function') return window.formatDateDMY(dateVal);
  if (!dateVal) return '—';
  try {
    const s = String(dateVal).split('T')[0];
    const parts = s.split('-');
    if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
  } catch (e) {}
  return String(dateVal);
}

function getUndatedSourceRecords() {
  if (typeof window !== 'undefined' && Array.isArray(window.allCaseRecords) && window.allCaseRecords.length > 0) {
    return window.allCaseRecords;
  }
  if (typeof allCaseRecords !== 'undefined' && Array.isArray(allCaseRecords) && allCaseRecords.length > 0) {
    return allCaseRecords;
  }
  return (typeof window !== 'undefined' && Array.isArray(window.allCaseRecords))
    ? window.allCaseRecords
    : (typeof allCaseRecords !== 'undefined' && Array.isArray(allCaseRecords)) ? allCaseRecords : [];
}

/**
 * Evaluates whether a case record is an Undated Case or requires date forwarding.
 * A case is considered "Undated" if:
 * 1. It is active (NOT disposed / decided / closed / dismissed).
 * 2. Next hearing date is missing / empty / '—' / '-' / 'null' / 'undated' (never scheduled) -> reason: 'never'.
 * 3. OR its scheduled hearing date has already passed without being forwarded -> reason: 'overdue'.
 */
function evaluateCaseUndatedState(c, todayISO) {
  if (!c) return { isUndated: false };

  // 1. Strict Disposed & Closed Check: Disposed / Decided cases are closed, never undated
  if (c.isDisposed === true || c.is_disposed === true) return { isUndated: false };

  const dispDate = String(c.disposalDate || c.disposal_date || '').trim();
  const dispComm = String(c.disposalComment || c.disposal_comment || '').trim();
  const hasValidDispDate = Boolean(dispDate && dispDate !== '—' && dispDate !== '-' && dispDate !== 'null' && dispDate !== 'undefined');
  const hasValidDispComm = Boolean(dispComm && dispComm !== '—' && dispComm !== '-' && dispComm !== 'null' && dispComm !== 'undefined');
  if (hasValidDispDate || hasValidDispComm) {
    return { isUndated: false };
  }

  if (typeof isCaseDisposed === 'function' && isCaseDisposed(c)) {
    return { isUndated: false };
  }
  if (typeof isCaseStatusDisposed === 'function' && isCaseStatusDisposed(c.caseStatus || c.status || c.case_status)) {
    return { isUndated: false };
  }
  const statusStr = String(c.caseStatus || c.status || c.case_status || '').trim().toLowerCase();
  if (
    statusStr.includes('dispose') ||
    statusStr.includes('decid') ||
    statusStr.includes('dismiss') ||
    statusStr.includes('acquit') ||
    statusStr.includes('convict') ||
    statusStr.includes('decree') ||
    statusStr.includes('closed') ||
    statusStr.includes('settle') ||
    statusStr.includes('compromise')
  ) {
    return { isUndated: false };
  }

  // Explicit check: cases awaiting initial filing / 1st hearing date are always undated
  if (typeof isCaseWaitingForInitialFiling === 'function' && isCaseWaitingForInitialFiling(c)) {
    return { isUndated: true, reason: 'never', lastDate: '' };
  }

  // 2. Pure Undated Check: Next hearing date missing or placeholder
  const nh = c.nextHearing || c.next_hearing || c.next_hearing_date || c.nextHearingDate || '';
  const nhTrimmed = String(nh).trim().toLowerCase();

  const todayStr = todayISO || (typeof getTodayDateString === 'function' ? getTodayDateString() : new Date().toISOString().split('T')[0]);
  const iso = typeof toISODate === 'function' ? toISODate(nhTrimmed) : (nhTrimmed.match(/^\d{4}-\d{2}-\d{2}/) ? nhTrimmed.slice(0, 10) : null);

  // If case has a valid scheduled hearing date
  if (iso) {
    // 3. Overdue / Date Passed: The scheduled date has already passed without being forwarded!
    if (iso < todayStr) {
      return { isUndated: true, reason: 'overdue', lastDate: iso };
    }
    // If date is today or in future, it has an active hearing scheduled (NEVER undated)
    return { isUndated: false };
  }

  const isBlankOrPlaceholder = (
    !nhTrimmed ||
    nhTrimmed === '—' ||
    nhTrimmed === '-' ||
    nhTrimmed === 'null' ||
    nhTrimmed === 'undefined' ||
    nhTrimmed === 'invalid date' ||
    nhTrimmed === 'none' ||
    nhTrimmed === 'n/a' ||
    nhTrimmed === 'na' ||
    nhTrimmed === 'not assigned' ||
    nhTrimmed === '0000-00-00' ||
    nhTrimmed === 'undated' ||
    statusStr.includes('undated') ||
    statusStr.includes('awaiting first hearing') ||
    statusStr.includes('waiting for first hearing') ||
    statusStr.includes('awaiting date')
  );

  if (isBlankOrPlaceholder) {
    return { isUndated: true, reason: 'never', lastDate: '' };
  }

  return { isUndated: false };
}

/**
 * Synchronizes the Top Navigation Undated Cases Button Count
 */
function updateTopnavUndatedCount() {
  const records = getUndatedSourceRecords();
  const todayISO = new Date().toISOString().split('T')[0];
  let count = 0;

  for (let i = 0; i < records.length; i++) {
    const res = evaluateCaseUndatedState(records[i], todayISO);
    if (res.isUndated) count++;
  }

  const countEl = document.getElementById('topnavUndatedCount');
  if (countEl) {
    countEl.textContent = String(count);
  }

  const navBadge = document.getElementById('undatedNavCount');
  if (navBadge) {
    navBadge.textContent = String(count);
  }

  const btnEl = document.getElementById('topnavUndatedBtn');
  if (btnEl) {
    btnEl.setAttribute('title', `${count} undated case${count === 1 ? '' : 's'} requiring next hearing date schedule`);
    btnEl.setAttribute('aria-label', `${count} undated cases`);
    // Dim slightly when 0 so it's unobtrusive
    if (count === 0) {
      btnEl.style.opacity = '0.75';
    } else {
      btnEl.style.opacity = '1';
    }
  }

  return count;
}

if (typeof window !== 'undefined') {
  window.updateTopnavUndatedCount = updateTopnavUndatedCount;
  window.evaluateCaseUndatedState = evaluateCaseUndatedState;
  window.formatUndatedDateDMY = formatUndatedDateDMY;
}

var _undatedAutoFetchAttempted = false;

function initUndatedTab() {
  _undatedAutoFetchAttempted = false;
  if (typeof window !== 'undefined' && window.innerWidth <= 768 && !window._undatedUserExplicitMode) {
    setUndatedViewMode('cards');
  } else if (currentUndatedViewMode) {
    setUndatedViewMode(currentUndatedViewMode);
  }
  renderUndatedCasesTab();
  updateTopnavUndatedCount();
}

/**
 * Renders the Dedicated Undated Cases Tab
 */
function renderUndatedCasesTab() {
  const tableBody = document.getElementById('undatedTableBody');
  const cardsContainer = document.getElementById('undatedCardsViewContainer');
  const totalBadge = document.getElementById('undatedTotalBadge');
  const footerCount = document.getElementById('undatedFooterCount');

  // Update topnav count in sync
  updateTopnavUndatedCount();

  if (!tableBody && !cardsContainer) return;

  const records = getUndatedSourceRecords();

  // If records are empty on initial mount, trigger Supabase fetch and keep loading row visible
  if (records.length === 0) {
    if (!_undatedAutoFetchAttempted && (typeof fetchAllDataFromSupabase === 'function' || (typeof window !== 'undefined' && typeof window.fetchAllDataFromSupabase === 'function'))) {
      _undatedAutoFetchAttempted = true;
      const fetchFn = typeof fetchAllDataFromSupabase === 'function' ? fetchAllDataFromSupabase : window.fetchAllDataFromSupabase;
      if (tableBody) {
        tableBody.innerHTML = `
          <tr class="undated-loading-row">
            <td colspan="5">
              <div class="undated-loading-inner">
                <svg class="lucide lucide-loader-2 undated-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                <span>Fetching cases from Supabase...</span>
              </div>
            </td>
          </tr>
        `;
      }
      if (cardsContainer) {
        cardsContainer.innerHTML = `
          <div class="undated-empty-state">
            <svg class="lucide lucide-loader-2 undated-spin" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            <div class="undated-empty-title">Loading cases from Supabase...</div>
          </div>
        `;
      }
      fetchFn().then(() => {
        _undatedAutoFetchAttempted = false;
        renderUndatedCasesTab();
        updateTopnavUndatedCount();
      }).catch((err) => {
        _undatedAutoFetchAttempted = false;
        console.warn('[Undated] fetchAllDataFromSupabase error:', err);
        renderUndatedCasesTab();
      });
      return;
    }
  }

  const todayISO = new Date().toISOString().split('T')[0];

  // 1. Gather all undated cases (pure undated + overdue awaiting forward)
  const allUndated = [];

  records.forEach((c) => {
    const state = evaluateCaseUndatedState(c, todayISO);
    if (state.isUndated) {
      allUndated.push({
        record: c,
        reason: state.reason,
        lastDate: state.lastDate
      });
    }
  });

  // Update counter badges
  const chipAll = document.getElementById('undatedChipCountAll');
  if (chipAll) chipAll.textContent = String(allUndated.length);
  if (totalBadge) totalBadge.textContent = `${allUndated.length} Cases`;

  // 2. Populate Courts Dropdown if container exists
  populateUndatedCourtDropdown(allUndated.map(item => item.record.courtName || item.record.criminalCourtName || item.record.court_name || '').filter(Boolean));

  // 3. Apply Filters: Search Query + Court + Category
  const searchQ = (currentUndatedSearchQuery || '').toLowerCase().trim();
  const courtF = (currentUndatedCourtFilter || '').toLowerCase().trim();
  const catF = (currentUndatedCategoryFilter || '').toLowerCase().trim();

  const filtered = allUndated.filter((item) => {
    const c = item.record;

    // Category Filter
    if (catF) {
      const type = (c.caseType || c.case_type || 'civil').toLowerCase();
      if (catF === 'state' || catF === 'criminal') {
        if (type !== 'state' && type !== 'criminal' && type !== 'misc_criminal' && type !== 'misccriminal' && type !== 'complaint') return false;
      } else if (catF === 'civil') {
        if (type !== 'civil' && type !== 'misc_civil' && type !== 'misccivil') return false;
      } else if (type !== catF) {
        return false;
      }
    }

    // Court Filter
    if (courtF) {
      const courtName = (c.courtName || c.criminalCourtName || c.court_name || '').toLowerCase().trim();
      if (courtName !== courtF) return false;
    }

    // Search Query (Omni-match across number, parties, client, court)
    if (searchQ) {
      const caseNo = (c.caseNo || c.criminalCaseNumber || c.case_number || c.case_no || '').toLowerCase();
      const caseName = (c.caseName || c.case_name || '').toLowerCase();
      const firstParty = (c.firstParty || c.plaintiff || c.first_party || '').toLowerCase();
      const accused = (c.accusedName || c.defendant || c.second_party || '').toLowerCase();
      const client = (c.clientName || c.criminalClientName || c.client_name || '').toLowerCase();
      const court = (c.courtName || c.criminalCourtName || c.court_name || '').toLowerCase();

      const matches = caseNo.includes(searchQ) ||
        caseName.includes(searchQ) ||
        firstParty.includes(searchQ) ||
        accused.includes(searchQ) ||
        client.includes(searchQ) ||
        court.includes(searchQ);

      if (!matches) return false;
    }

    return true;
  });

  // Sort: Alphabetical by case number
  filtered.sort((a, b) => {
    const numA = (a.record.caseNo || a.record.criminalCaseNumber || a.record.case_number || a.record.case_no || '').toLowerCase();
    const numB = (b.record.caseNo || b.record.criminalCaseNumber || b.record.case_number || b.record.case_no || '').toLowerCase();
    return numA.localeCompare(numB);
  });

  // 4. Update Footer Count
  if (footerCount) {
    footerCount.textContent = `SHOWING ${filtered.length} OF ${allUndated.length} CASES`;
  }

  // 5. Render Empty State if no cases match
  if (filtered.length === 0) {
    const emptyHtml = allUndated.length === 0
      ? `
        <div class="undated-empty-state">
          <div class="undated-empty-icon">
            <svg class="lucide lucide-check-circle-2" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
          </div>
          <div class="undated-empty-title">All Cases Have Hearing Dates!</div>
          <div class="undated-empty-desc">There are currently no active cases awaiting an initial or forwarded hearing date. Every active matter in your diary is properly scheduled.</div>
        </div>
      `
      : `
        <div class="undated-empty-state">
          <div class="undated-empty-icon" style="background: rgba(239, 68, 68, 0.10); color: #ef4444;">
            <svg class="lucide lucide-filter-x" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M13.013 3H2l8 9.46V19l4 2v-8.54l.9-1.055"/><path d="m22 3-5 5"/><path d="m17 3 5 5"/></svg>
          </div>
          <div class="undated-empty-title">No Matching Cases Found</div>
          <div class="undated-empty-desc">No undated cases matched your current search filters. Try clearing the search query or court filter.</div>
          <button type="button" class="act" onclick="clearUndatedSearch(); setUndatedCategoryFilter('');">Clear Filters</button>
        </div>
      `;

    if (tableBody) tableBody.innerHTML = `<tr><td colspan="6">${emptyHtml}</td></tr>`;
    if (cardsContainer) cardsContainer.innerHTML = emptyHtml;
    return;
  }

  // 6. Build Table Rows
  let tableHtml = '';
  filtered.forEach((item) => {
    const c = item.record;
    const caseNum = c.caseNo || c.criminalCaseNumber || c.case_number || c.case_no || '—';
    const cat = (c.caseType || c.case_type || 'Civil').toLowerCase();
    const caseName = c.caseName || c.case_name || (
      c.firstParty
        ? `${c.firstParty} vs ${c.accusedName || c.secondParty || c.oppositeParty || 'Opposite Party'}`
        : c.plaintiff
          ? `${c.plaintiff} vs ${c.defendant || 'Opposite Party'}`
          : (c.first_party ? `${c.first_party} vs ${c.second_party || 'Opposite Party'}` : '—')
    );
    const clientName = c.clientName || c.criminalClientName || c.client_name || '—';
    const courtName = c.courtName || c.criminalCourtName || c.court_name || 'District Court';
    const clientPhone = String(c.clientPhone || c.criminalClientMobile || c.clientNumber || c.client_number || '').trim();
    const cleanPhone = clientPhone.replace(/\D/g, '');

    const stage = c.hearingProcess || c.stage || c.process || c.case_stage || '—';
    const pastDateVal = item.reason === 'overdue'
      ? (item.lastDate || c.nextHearing || c.next_hearing || c.previousHearing || '')
      : (c.previousHearing || c.previous_hearing_date || '');

    tableHtml += `
      <tr class="undated-docket-row" data-case-no="${escapeUndatedHtml(caseNum)}" title="Click row to view Case Dossier">
        <!-- 1. Case Number -->
        <td class="col-case">
          <div class="case-num-pill">${escapeUndatedHtml(caseNum)}</div>
          <span class="cat-badge ${escapeUndatedHtml(cat)}">${escapeUndatedHtml(cat)}</span>
        </td>

        <!-- 2. Case Name -->
        <td class="col-title">
          <div class="case-title-main">${escapeUndatedHtml(caseName)}</div>
        </td>

        <!-- 3. Court -->
        <td class="col-court">
          <div class="court-title-main">${escapeUndatedHtml(courtName)}</div>
        </td>

        <!-- 4. Past Date -->
        <td class="col-past-date">
          ${item.reason === 'overdue' ? `
            <div class="undated-past-date-cell">
              <span class="past-date-val">${formatUndatedDateDMY(pastDateVal)}</span>
              <span class="urgency-chip overdue" title="Overdue hearing date — forwarding required">
                <svg class="lucide lucide-clock" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Overdue
              </span>
            </div>
          ` : `
            <div class="undated-past-date-cell">
              <span class="past-date-val">${pastDateVal ? formatUndatedDateDMY(pastDateVal) : '—'}</span>
              <span class="urgency-chip never" title="No hearing date assigned">
                <svg class="lucide lucide-calendar-off" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.18 4.18A2 2 0 0 0 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 1.82-1.18"></path><path d="M21 15.5V6a2 2 0 0 0-2-2H9.5"></path><path d="M16 2v4"></path><path d="M3 10h7"></path><path d="M21 10h-5.5"></path><line x1="2" x2="22" y1="2" y2="22"></line></svg>
                Date Not Assigned
              </span>
            </div>
          `}
        </td>

        <!-- 5. Case Stage -->
        <td class="col-stage">
          <div class="stage-cell-wrap">
            <span class="stage-badge-pill" title="Current Case Stage: ${escapeUndatedHtml(stage)}">
              <svg class="lucide lucide-layers stage-icon" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>
              <span>${escapeUndatedHtml(stage)}</span>
            </span>
          </div>
        </td>

        <!-- 6. Action Button (Assign Date) -->
        <td class="col-action">
          <div class="actions" onclick="event.stopPropagation()">
            <button
              type="button"
              class="act primary"
              onclick="handleForwardDateFromUndated('${escapeUndatedHtml(caseNum)}')"
              title="Assign Hearing Date for ${escapeUndatedHtml(caseNum)}"
              aria-label="Assign Hearing Date"
            >
              <svg class="lucide lucide-calendar-plus" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M10 16h4"/><path d="M12 14v4"/></svg>
              <span class="act-text">Assign Date</span>
            </button>
          </div>
        </td>
      </tr>
    `;
  });

  if (tableBody) {
    tableBody.innerHTML = tableHtml;
    if (!tableBody._undatedClickBound) {
      tableBody.addEventListener('click', (e) => {
        if (e.target && e.target.closest('button, a, input, select')) return;
        const row = e.target && e.target.closest('.undated-docket-row');
        if (row) {
          const caseNo = row.getAttribute('data-case-no');
          if (caseNo) handleUndatedRowClick(caseNo, e);
        }
      });
      tableBody._undatedClickBound = true;
    }
  }

  // 7. Build Cards Grid (for Mobile & Cards view mode)
  let cardsHtml = '';
  filtered.forEach((item) => {
    const c = item.record;
    const caseNum = c.caseNo || c.criminalCaseNumber || c.case_number || c.case_no || '—';
    const cat = (c.caseType || c.case_type || 'Civil').toLowerCase();
    const caseName = c.caseName || c.case_name || (
      c.firstParty
        ? `${c.firstParty} vs ${c.accusedName || c.secondParty || c.oppositeParty || 'Opposite Party'}`
        : c.plaintiff
          ? `${c.plaintiff} vs ${c.defendant || 'Opposite Party'}`
          : (c.first_party ? `${c.first_party} vs ${c.second_party || 'Opposite Party'}` : '—')
    );
    const clientName = c.clientName || c.criminalClientName || c.client_name || '—';
    const courtName = c.courtName || c.criminalCourtName || c.court_name || 'District Court';
    const stage = c.hearingProcess || c.stage || c.process || c.case_stage || '—';
    const pastDateVal = item.reason === 'overdue'
      ? (item.lastDate || c.nextHearing || c.next_hearing || c.previousHearing || '')
      : (c.previousHearing || c.previous_hearing_date || '');

    cardsHtml += `
      <div class="undated-card-item" data-case-no="${escapeUndatedHtml(caseNum)}" title="Click card to view Case Dossier">
        <!-- Top Row: Identity & Status -->
        <div class="undated-card-head">
          <div class="card-id-cluster">
            <span class="case-num-pill">${escapeUndatedHtml(caseNum)}</span>
            <span class="cat-badge ${escapeUndatedHtml(cat)}">${escapeUndatedHtml(cat)}</span>
          </div>
          <div class="card-urgency-wrap">
            ${item.reason === 'overdue' ? `
              <span class="urgency-chip overdue" title="Overdue hearing date — forwarding required">
                <svg class="lucide lucide-clock" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>${formatUndatedDateDMY(pastDateVal)}</span>
                <span class="urgency-tag">Overdue</span>
              </span>
            ` : `
              <span class="urgency-chip never" title="No hearing date assigned">
                <svg class="lucide lucide-calendar-off" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.18 4.18A2 2 0 0 0 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 1.82-1.18"></path><path d="M21 15.5V6a2 2 0 0 0-2-2H9.5"></path><path d="M16 2v4"></path><path d="M3 10h7"></path><path d="M21 10h-5.5"></path><line x1="2" x2="22" y1="2" y2="22"></line></svg>
                <span>${pastDateVal ? formatUndatedDateDMY(pastDateVal) : 'Date Not Assigned'}</span>
              </span>
            `}
          </div>
        </div>

        <!-- Middle Row: Case Name, Court, Stage -->
        <div class="undated-card-body">
          <div class="case-title-main">${escapeUndatedHtml(caseName)}</div>
          
          <div class="card-meta-line court-line">
            <svg class="lucide lucide-landmark card-meta-icon" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="2" x2="22" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>
            <span class="court-title-text">${escapeUndatedHtml(courtName)}</span>
          </div>

          <div class="card-meta-line stage-line">
            <span class="stage-badge-pill" title="Case Stage: ${escapeUndatedHtml(stage)}">
              <svg class="lucide lucide-layers stage-icon" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>
              <span>${escapeUndatedHtml(stage)}</span>
            </span>
          </div>
        </div>

        <!-- Bottom Row: Primary Full-Width Action Button -->
        <div class="undated-card-foot" onclick="event.stopPropagation()">
          <button
            type="button"
            class="act primary undated-card-assign-btn"
            onclick="handleForwardDateFromUndated('${escapeUndatedHtml(caseNum)}')"
            title="Assign Hearing Date for ${escapeUndatedHtml(caseNum)}"
            aria-label="Assign Hearing Date"
          >
            <svg class="lucide lucide-calendar-plus" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M10 16h4"/><path d="M12 14v4"/></svg>
            <span class="act-text">Assign Next Hearing Date</span>
          </button>
        </div>
      </div>
    `;
  });

  if (cardsContainer) {
    cardsContainer.innerHTML = cardsHtml;
    if (!cardsContainer._undatedClickBound) {
      cardsContainer.addEventListener('click', (e) => {
        if (e.target && e.target.closest('button, a, input, select')) return;
        const card = e.target && e.target.closest('.undated-card-item');
        if (card) {
          const caseNo = card.getAttribute('data-case-no');
          if (caseNo) handleUndatedRowClick(caseNo, e);
        }
      });
      cardsContainer._undatedClickBound = true;
    }
  }
}

/**
 * Handles Docket Row Click to open Case Dossier
 */
function handleUndatedRowClick(caseNo, event) {
  if (event && event.target && event.target.closest('button, a, input, select')) return;
  if (typeof window !== 'undefined' && typeof window.openCaseDetailsFullModal === 'function') {
    window.openCaseDetailsFullModal(caseNo);
  } else if (typeof openCaseDetailsFullModal === 'function') {
    openCaseDetailsFullModal(caseNo);
  } else if (typeof window !== 'undefined' && typeof window.openCaseHistoryModalByNo === 'function') {
    window.openCaseHistoryModalByNo(caseNo);
  }
}
if (typeof window !== 'undefined') window.handleUndatedRowClick = handleUndatedRowClick;
if (typeof global !== 'undefined') global.handleUndatedRowClick = handleUndatedRowClick;

/**
 * Handles Date Forwarding Action for an Undated Case
 */
function handleForwardDateFromUndated(caseNo) {
  if (typeof openForwardDateModal === 'function') {
    openForwardDateModal(caseNo);
  } else if (typeof openUpdateHearingForCase === 'function') {
    openUpdateHearingForCase(caseNo);
  } else if (typeof window !== 'undefined' && typeof window.openUpdateHearingForCase === 'function') {
    window.openUpdateHearingForCase(caseNo);
  }
}

// --- Search & Filter Handlers ---

function handleUndatedSearchInput(val) {
  currentUndatedSearchQuery = val || '';
  if (typeof window !== 'undefined') window.currentUndatedSearchQuery = currentUndatedSearchQuery;

  const clearBtn = document.getElementById('undatedClearSearchBtn');
  if (clearBtn) {
    clearBtn.classList.toggle('hidden', !val);
  }

  renderUndatedCasesTab();
}

function clearUndatedSearch() {
  const input = document.getElementById('undatedSearchInput');
  if (input) input.value = '';
  handleUndatedSearchInput('');
}

function setUndatedUrgencyFilter(filter) {
  currentUndatedUrgencyFilter = filter || 'all';
  if (typeof window !== 'undefined') window.currentUndatedUrgencyFilter = currentUndatedUrgencyFilter;

  ['all', 'overdue', 'never'].forEach((key) => {
    const elId = `undatedUrgency${key.charAt(0).toUpperCase() + key.slice(1)}`;
    const chip = document.getElementById(elId);
    if (chip) chip.classList.toggle('active', key === currentUndatedUrgencyFilter);
  });

  renderUndatedCasesTab();
}

function setUndatedCategoryFilter(cat) {
  currentUndatedCategoryFilter = cat || '';
  if (typeof window !== 'undefined') window.currentUndatedCategoryFilter = currentUndatedCategoryFilter;

  const mapping = {
    '': 'undatedCatAll',
    'civil': 'undatedCatCivil',
    'state': 'undatedCatState',
    'family': 'undatedCatFamily',
    'revenue': 'undatedCatRevenue'
  };

  Object.keys(mapping).forEach((key) => {
    const chip = document.getElementById(mapping[key]);
    if (chip) chip.classList.toggle('active', key === currentUndatedCategoryFilter);
  });

  renderUndatedCasesTab();
}

function setUndatedViewMode(mode, isUserAction = false) {
  if (mode !== 'table' && mode !== 'cards') mode = 'table';
  currentUndatedViewMode = mode;
  if (isUserAction && typeof window !== 'undefined') {
    window._undatedUserExplicitMode = true;
  }

  const tblBtn = document.getElementById('undatedViewToggleTable');
  const crdBtn = document.getElementById('undatedViewToggleCards');
  if (tblBtn) tblBtn.classList.toggle('active', mode === 'table');
  if (crdBtn) crdBtn.classList.toggle('active', mode === 'cards');

  const tblContainer = document.getElementById('undatedTableViewContainer');
  const crdContainer = document.getElementById('undatedCardsViewContainer');
  if (tblContainer) tblContainer.classList.toggle('hidden', mode !== 'table');
  if (crdContainer) crdContainer.classList.toggle('hidden', mode !== 'cards');
}

// --- Court Dropdown Handlers ---

function toggleUndatedCourtDropdown() {
  const menu = document.getElementById('undatedCourtDropdownMenu');
  const trigger = document.getElementById('undatedCourtDropdownTrigger');
  if (!menu) return;

  const isOpen = menu.classList.contains('open');
  if (isOpen) {
    menu.classList.remove('open', 'opacity-100', 'visible', 'scale-100');
    menu.classList.add('opacity-0', 'invisible', 'scale-95');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
  } else {
    menu.classList.add('open', 'opacity-100', 'visible', 'scale-100');
    menu.classList.remove('opacity-0', 'invisible', 'scale-95');
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
    const search = document.getElementById('undatedCourtDropdownSearch');
    if (search) {
      search.value = '';
      search.focus();
      filterUndatedCourtDropdown('');
    }
  }
}

function filterUndatedCourtDropdown(query) {
  const q = (query || '').toLowerCase().trim();
  const list = document.getElementById('undatedCourtDropdownList');
  const empty = document.getElementById('undatedCourtDropdownEmpty');
  if (!list) return;

  let visibleCount = 0;
  const items = list.querySelectorAll('.custom-dropdown-item');
  items.forEach((item) => {
    const text = item.textContent.toLowerCase();
    const matches = !q || text.includes(q);
    item.style.display = matches ? '' : 'none';
    if (matches) visibleCount++;
  });

  if (empty) empty.classList.toggle('hidden', visibleCount > 0);
}

function selectUndatedCourtFilter(courtVal) {
  currentUndatedCourtFilter = (courtVal || '').trim();
  if (typeof window !== 'undefined') window.currentUndatedCourtFilter = currentUndatedCourtFilter;

  const label = document.getElementById('undatedCourtDropdownLabel');
  if (label) label.textContent = currentUndatedCourtFilter || 'All Courts';

  const select = document.getElementById('undatedCourtFilterSelect');
  if (select) select.value = currentUndatedCourtFilter;

  const menu = document.getElementById('undatedCourtDropdownMenu');
  const trigger = document.getElementById('undatedCourtDropdownTrigger');
  if (menu) {
    menu.classList.remove('open', 'opacity-100', 'visible', 'scale-100');
    menu.classList.add('opacity-0', 'invisible', 'scale-95');
  }
  if (trigger) trigger.setAttribute('aria-expanded', 'false');

  renderUndatedCasesTab();
}

function populateUndatedCourtDropdown(courts) {
  const list = document.getElementById('undatedCourtDropdownList');
  const select = document.getElementById('undatedCourtFilterSelect');
  if (!list) return;

  const uniqueCourts = Array.from(new Set(courts.filter(Boolean))).sort((a, b) => a.localeCompare(b));

  if (select) {
    const curVal = select.value;
    select.innerHTML = '<option value="">All Courts</option>' + uniqueCourts.map(c => `<option value="${escapeUndatedHtml(c)}">${escapeUndatedHtml(c)}</option>`).join('');
    select.value = curVal;
  }

  const activeCourt = currentUndatedCourtFilter || '';
  let itemsHtml = `
    <li class="custom-dropdown-item ${!activeCourt ? 'selected' : ''}" role="option" aria-selected="${!activeCourt ? 'true' : 'false'}" data-value="" onclick="selectUndatedCourtFilter('')">
      <span class="truncate">All Courts</span>
      ${!activeCourt ? '<svg class="lucide lucide-check w-4 h-4 checkmark custom-dropdown-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>' : ''}
    </li>
  `;

  uniqueCourts.forEach((c) => {
    const isSelected = activeCourt.toLowerCase() === c.toLowerCase();
    itemsHtml += `
      <li class="custom-dropdown-item ${isSelected ? 'selected' : ''}" role="option" aria-selected="${isSelected ? 'true' : 'false'}" data-value="${escapeUndatedHtml(c)}" onclick="selectUndatedCourtFilter('${escapeUndatedHtml(c)}')">
        <span class="truncate">${escapeUndatedHtml(c)}</span>
        ${isSelected ? '<svg class="lucide lucide-check w-4 h-4 checkmark custom-dropdown-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>' : ''}
      </li>
    `;
  });

  list.innerHTML = itemsHtml;
}

function escapeUndatedHtml(str) {
  if (typeof str !== 'string') return str == null ? '' : String(str);
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Close court dropdown when clicked outside
if (typeof document !== 'undefined') {
  document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('undatedCourtDropdown');
    const menu = document.getElementById('undatedCourtDropdownMenu');
    if (dropdown && menu && !dropdown.contains(e.target) && menu.classList.contains('open')) {
      menu.classList.remove('open', 'opacity-100', 'visible', 'scale-100');
      menu.classList.add('opacity-0', 'invisible', 'scale-95');
      const trigger = document.getElementById('undatedCourtDropdownTrigger');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    }
  });

  // Attach search input listener for court dropdown filter
  document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('undatedCourtDropdownSearch');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        filterUndatedCourtDropdown(e.target.value);
      });
    }
    updateTopnavUndatedCount();
  });
}

// Auto-refresh when case data syncs or updates from Supabase or local storage
if (typeof window !== 'undefined') {
  window.addEventListener('casebook:data-synced', () => {
    _undatedAutoFetchAttempted = false;
    renderUndatedCasesTab();
    updateTopnavUndatedCount();
  });
  window.addEventListener('casebook:cases-updated', () => {
    _undatedAutoFetchAttempted = false;
    renderUndatedCasesTab();
    updateTopnavUndatedCount();
  });
}

// Global Exports
if (typeof window !== 'undefined') {
  window.updateTopnavUndatedCount = updateTopnavUndatedCount;
  window.evaluateCaseUndatedState = evaluateCaseUndatedState;
  window.initUndatedTab = initUndatedTab;
  window.refreshUndatedFromSupabase = refreshUndatedFromSupabase;
  window.renderUndatedCasesTab = renderUndatedCasesTab;
  window.handleForwardDateFromUndated = handleForwardDateFromUndated;
  window.handleUndatedSearchInput = handleUndatedSearchInput;
  window.clearUndatedSearch = clearUndatedSearch;
  window.setUndatedUrgencyFilter = setUndatedUrgencyFilter;
  window.setUndatedCategoryFilter = setUndatedCategoryFilter;
  window.setUndatedViewMode = setUndatedViewMode;
  window.toggleUndatedCourtDropdown = toggleUndatedCourtDropdown;
  window.filterUndatedCourtDropdown = filterUndatedCourtDropdown;
  window.selectUndatedCourtFilter = selectUndatedCourtFilter;
  window.populateUndatedCourtDropdown = populateUndatedCourtDropdown;
  window.handleUndatedRowClick = handleUndatedRowClick;
  window.escapeUndatedHtml = escapeUndatedHtml;
}
