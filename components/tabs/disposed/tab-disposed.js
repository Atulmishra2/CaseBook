/**
 * CaseBook Dedicated Disposed Cases Archive Tab Module
 * Location: components/tabs/disposed/tab-disposed.js
 * Multi-Tab Parity: Conforms 100% to DESIGN.md and ui-rules.md
 */

window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs['disposed'] = `<div class="disposed-dashboard-wrapper" data-disposed-scope id="disposedDashboardWrapper">
    <div class="board disposed-board-shell" id="disposedBoardShell">
        <!-- Master Header: Archive Emerald/Gold Crest & Total Count Badge -->
        <header class="board-head disposed-master-head">
            <div class="head-left">
                <!-- Navigation Breadcrumb -->
                <nav class="breadcrumb-bar disposed-breadcrumb" aria-label="Breadcrumb">
                    <button type="button" class="crumb-link disposed-crumb-link" onclick="showTab('all', event)" title="Return to Cases Register">
                        <svg class="lucide lucide-folder-archive" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg>
                        <span>Cases Register</span>
                    </button>
                    <svg class="lucide lucide-chevron-right crumb-sep disposed-crumb-sep" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
                    <span class="crumb-current disposed-crumb-current">Disposed Cases Archive</span>
                </nav>
                <h1 class="h1">
                    <span class="crest disposed-crest" aria-hidden="true">
                        <svg class="lucide lucide-archive" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <rect width="20" height="5" x="2" y="3" rx="1"/>
                            <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/>
                            <path d="M10 12h4"/>
                        </svg>
                    </span>
                    <span class="h1-text" id="disposedMainTitle">Disposed Cases Archive</span>
                </h1>
                <div class="sub" id="disposedHeaderSubline">
                    <b id="disposedTotalBadge">0 Cases</b><span id="disposedSrCount" class="sr-only">0</span> · <span class="disposed-stat-pill">Permanent Judicial Archive: Decided &amp; Closed Matters</span>
                </div>
            </div>
            <div class="head-actions" id="disposedHeadActions">
                <!-- Sync / Refresh from Supabase Action Button -->
                <button
                    type="button"
                    class="disposed-refresh-btn"
                    id="disposedRefreshBtn"
                    onclick="refreshDisposedFromSupabase(true)"
                    title="Sync Archive from Supabase"
                    aria-label="Sync Archive from Supabase"
                >
                    <svg class="lucide lucide-refresh-cw" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                        <path d="M21 3v5h-5"/>
                        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                        <path d="M3 21v-5h5"/>
                    </svg>
                </button>

                <!-- Dual View Switcher (Docket Table vs Cards) -->
                <div class="disposed-view-toggle view-toggle" id="disposedViewToggle" role="group" aria-label="Switch display mode">
                    <button type="button" class="view-btn active" id="disposedViewToggleTable" onclick="setDisposedViewMode('table', true)" title="Switch to Docket Table View" aria-label="Switch to Docket Table View">
                        <svg class="lucide lucide-table-2" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg> <span>Docket Table</span>
                    </button>
                    <button type="button" class="view-btn" id="disposedViewToggleCards" onclick="setDisposedViewMode('cards', true)" title="Switch to Cards View" aria-label="Switch to Cards View">
                        <svg class="lucide lucide-layout-grid" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg> <span>Cards</span>
                    </button>
                </div>
            </div>
        </header>

        <!-- TOOLBAR: Search Bar + Court Dropdown + Category Chips -->
        <div class="toolbar disposed-toolbar">
            <div class="disposed-controls-row" id="disposedControlsRow">
                <!-- Omni Search Input -->
                <div class="disposed-search-wrap">
                    <svg class="lucide lucide-search disposed-search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    <input
                        type="text"
                        id="disposedSearchInput"
                        class="disposed-search-input"
                        placeholder="Search case number, parties, judgment notes, court..."
                        oninput="handleDisposedSearchInput(this.value)"
                        autocomplete="off"
                        spellcheck="false"
                    />
                    <button type="button" id="disposedClearSearchBtn" class="disposed-clear-btn hidden" onclick="clearDisposedSearch()" title="Clear Search">
                        <svg class="lucide lucide-x" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                </div>

                <!-- Court Forum Filter Custom Dropdown -->
                <div class="custom-dropdown disposed-court-custom-dropdown" id="disposedCourtDropdown">
                    <select id="disposedCourtFilterSelect" class="sr-only" tabindex="-1" aria-hidden="true" onchange="renderDisposedCasesTab()">
                        <option value="">All Courts</option>
                    </select>
                    <button
                        type="button"
                        class="custom-dropdown-trigger dropdown-trigger"
                        id="disposedCourtDropdownTrigger"
                        aria-haspopup="listbox"
                        aria-expanded="false"
                        onclick="toggleDisposedCourtDropdown()"
                        title="Filter by Court Forum"
                    >
                        <svg class="lucide lucide-landmark custom-dropdown-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>
                        <span class="custom-dropdown-label dropdown-label" id="disposedCourtDropdownLabel">All Courts</span>
                        <svg class="lucide lucide-chevron-down custom-dropdown-chevron dropdown-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
                    </button>
                    <div class="custom-dropdown-menu dropdown-menu opacity-0 invisible scale-95" id="disposedCourtDropdownMenu">
                        <div class="custom-dropdown-search-wrap">
                            <div class="custom-dropdown-search-inner">
                                <svg class="lucide lucide-search custom-dropdown-search-icon" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                                <input type="text" id="disposedCourtDropdownSearch" class="custom-dropdown-search-input" placeholder="Search courts..." autocomplete="off">
                            </div>
                        </div>
                        <ul class="custom-dropdown-list options-list custom-scrollbar" id="disposedCourtDropdownList" role="listbox"></ul>
                        <div id="disposedCourtDropdownEmpty" class="custom-dropdown-empty empty-state hidden">No courts found.</div>
                    </div>
                </div>
            </div>

            <!-- Filter Chips Deck: Category Pills -->
            <div class="disposed-chips-row">
                <div class="chips category-chips" role="group" aria-label="Category Filter">
                    <button type="button" class="chip active" id="disposedCatAll" onclick="setDisposedCategoryFilter('')">All Disposed (<span id="disposedChipCountAll">0</span>)</button>
                    <button type="button" class="chip" id="disposedCatCivil" onclick="setDisposedCategoryFilter('civil')">Civil</button>
                    <button type="button" class="chip" id="disposedCatState" onclick="setDisposedCategoryFilter('state')">Criminal / State</button>
                    <button type="button" class="chip" id="disposedCatFamily" onclick="setDisposedCategoryFilter('family')">Family</button>
                    <button type="button" class="chip" id="disposedCatRevenue" onclick="setDisposedCategoryFilter('revenue')">Revenue</button>
                </div>
            </div>
        </div>

        <!-- VIEW 1: DOCKET TABLE VIEW (Default Master View) -->
        <div id="disposedTableViewContainer" class="disposed-table-view-container">
            <div class="disposed-table-card">
                <div class="disposed-table-scroll custom-scrollbar">
                    <table class="disposed-docket-table min-w-full text-left text-sm case-table" id="disposedCasesTable">
                        <thead>
                            <tr>
                                <th scope="col" class="col-case">CASE NUMBER / YEAR</th>
                                <th scope="col" class="col-title">CASE NAME</th>
                                <th scope="col" class="col-court">COURT</th>
                                <th scope="col" class="col-date">DISPOSAL DATE</th>
                                <th scope="col" class="col-disposal">DISPOSAL COMMENT</th>
                                <th scope="col" class="col-action">ACTION</th>
                            </tr>
                        </thead>
                        <tbody id="disposedTableBody">
                            <tr class="disposed-loading-row">
                                <td colspan="6">
                                    <div class="disposed-loading-inner">
                                        <svg class="lucide lucide-loader-2 disposed-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                                        <span>Loading disposed cases archive...</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- VIEW 2: CARDS GRID VIEW (Mobile Ergonomic & Alternative View) -->
        <div id="disposedCardsViewContainer" class="disposed-cards-grid hidden">
            <!-- Dynamically populated with cards -->
        </div>

        <!-- FOOTER: Sync Status & Counts -->
        <footer class="foot disposed-foot">
            <span class="live">
                <i aria-hidden="true"></i>
                <span id="disposedFooterCount">SHOWING 0 OF 0 CASES</span>
            </span>
            <span class="foot-sync" id="disposedFootSync">UPDATED LIVE <span class="sep">·</span> SYNC OK</span>
        </footer>
    </div>
</div>
`;

// --- Global Filter States ---
var currentDisposedSearchQuery = '';
var currentDisposedCourtFilter = '';
var currentDisposedCategoryFilter = '';
var currentDisposedViewMode = 'table'; // 'table' | 'cards'

if (typeof window !== 'undefined') {
  window.currentDisposedSearchQuery = currentDisposedSearchQuery;
  window.currentDisposedCourtFilter = currentDisposedCourtFilter;
  window.currentDisposedCategoryFilter = currentDisposedCategoryFilter;
  window.currentDisposedViewMode = currentDisposedViewMode;
}

/**
 * Refreshes all case data from Supabase and re-renders the Disposed Cases register
 */
async function refreshDisposedFromSupabase(showFeedback = true) {
  const syncBtn = document.getElementById('disposedRefreshBtn');
  const footSync = document.getElementById('disposedFootSync');
  if (syncBtn) {
    syncBtn.classList.add('loading');
    const icon = syncBtn.querySelector('.lucide-refresh-cw');
    if (icon) icon.classList.add('disposed-spin');
  }
  if (footSync) {
    footSync.innerHTML = '<span class="disposed-spin-icon">⟳</span> SYNCING WITH SUPABASE...';
  }

  try {
    if (typeof fetchAllDataFromSupabase === 'function') {
      await fetchAllDataFromSupabase();
    } else if (typeof window !== 'undefined' && typeof window.fetchAllDataFromSupabase === 'function') {
      await window.fetchAllDataFromSupabase();
    }
  } catch (err) {
    console.warn('[Disposed] Supabase fetch error:', err);
  } finally {
    if (syncBtn) {
      syncBtn.classList.remove('loading');
      const icon = syncBtn.querySelector('.lucide-refresh-cw');
      if (icon) icon.classList.remove('disposed-spin');
    }
    if (footSync) {
      footSync.textContent = 'UPDATED LIVE · SYNC OK';
    }
    renderDisposedCasesTable();
  }
}

function setDisposedViewMode(mode, save = true) {
  currentDisposedViewMode = mode;
  if (typeof window !== 'undefined') window.currentDisposedViewMode = mode;
  if (save && typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem('casebook_disposed_view_mode', mode);
    } catch (e) {}
  }

  const tableContainer = document.getElementById('disposedTableViewContainer');
  const cardsContainer = document.getElementById('disposedCardsViewContainer');
  const toggleTableBtn = document.getElementById('disposedViewToggleTable');
  const toggleCardsBtn = document.getElementById('disposedViewToggleCards');

  if (mode === 'cards') {
    if (tableContainer) tableContainer.classList.add('hidden');
    if (cardsContainer) cardsContainer.classList.remove('hidden');
    if (toggleTableBtn) toggleTableBtn.classList.remove('active');
    if (toggleCardsBtn) toggleCardsBtn.classList.add('active');
  } else {
    if (tableContainer) tableContainer.classList.remove('hidden');
    if (cardsContainer) cardsContainer.classList.add('hidden');
    if (toggleTableBtn) toggleTableBtn.classList.add('active');
    if (toggleCardsBtn) toggleCardsBtn.classList.remove('active');
  }
}

function handleDisposedSearchInput(val) {
  currentDisposedSearchQuery = String(val || '');
  if (typeof window !== 'undefined') window.currentDisposedSearchQuery = currentDisposedSearchQuery;
  const clearBtn = document.getElementById('disposedClearSearchBtn');
  if (clearBtn) {
    if (currentDisposedSearchQuery.trim()) {
      clearBtn.classList.remove('hidden');
    } else {
      clearBtn.classList.add('hidden');
    }
  }
  renderDisposedCasesTable();
}

function clearDisposedSearch() {
  currentDisposedSearchQuery = '';
  if (typeof window !== 'undefined') window.currentDisposedSearchQuery = '';
  const input = document.getElementById('disposedSearchInput');
  if (input) input.value = '';
  const clearBtn = document.getElementById('disposedClearSearchBtn');
  if (clearBtn) clearBtn.classList.add('hidden');
  renderDisposedCasesTable();
}

function setDisposedCategoryFilter(category) {
  currentDisposedCategoryFilter = category;
  if (typeof window !== 'undefined') window.currentDisposedCategoryFilter = category;

  ['disposedCatAll', 'disposedCatCivil', 'disposedCatState', 'disposedCatFamily', 'disposedCatRevenue'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.classList.remove('active');
  });

  const activeId = category === 'civil' ? 'disposedCatCivil' :
    (category === 'state' || category === 'criminal') ? 'disposedCatState' :
    category === 'family' ? 'disposedCatFamily' :
    category === 'revenue' ? 'disposedCatRevenue' : 'disposedCatAll';

  const activeBtn = document.getElementById(activeId);
  if (activeBtn) activeBtn.classList.add('active');

  renderDisposedCasesTable();
}

function toggleDisposedCourtDropdown() {
  const menu = document.getElementById('disposedCourtDropdownMenu');
  const trigger = document.getElementById('disposedCourtDropdownTrigger');
  if (!menu || !trigger) return;
  const isOpen = menu.classList.contains('invisible') === false;
  if (isOpen) {
    menu.classList.add('invisible', 'opacity-0', 'scale-95');
    trigger.setAttribute('aria-expanded', 'false');
  } else {
    menu.classList.remove('invisible', 'opacity-0', 'scale-95');
    trigger.setAttribute('aria-expanded', 'true');
    const search = document.getElementById('disposedCourtDropdownSearch');
    if (search) {
      search.value = '';
      search.focus();
    }
  }
}

function selectDisposedCourtFilter(courtName) {
  currentDisposedCourtFilter = courtName;
  if (typeof window !== 'undefined') window.currentDisposedCourtFilter = courtName;

  const label = document.getElementById('disposedCourtDropdownLabel');
  if (label) {
    label.textContent = courtName || 'All Courts';
  }

  const select = document.getElementById('disposedCourtFilterSelect');
  if (select) {
    select.value = courtName;
  }

  const menu = document.getElementById('disposedCourtDropdownMenu');
  const trigger = document.getElementById('disposedCourtDropdownTrigger');
  if (menu) menu.classList.add('invisible', 'opacity-0', 'scale-95');
  if (trigger) trigger.setAttribute('aria-expanded', 'false');

  renderDisposedCasesTable();
}

function populateDisposedCourtDropdown(courtNames) {
  const list = document.getElementById('disposedCourtDropdownList');
  const select = document.getElementById('disposedCourtFilterSelect');
  if (!list) return;

  const unique = Array.from(new Set((courtNames || []).map(c => String(c).trim()).filter(Boolean))).sort();

  list.innerHTML = `
    <li class="custom-dropdown-option ${!currentDisposedCourtFilter ? 'selected' : ''}" role="option" onclick="selectDisposedCourtFilter('')">
      <span>All Courts (${unique.length})</span>
      ${!currentDisposedCourtFilter ? '<svg class="lucide lucide-check" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>' : ''}
    </li>
  ` + unique.map(c => {
    const isSelected = currentDisposedCourtFilter.toLowerCase() === c.toLowerCase();
    return `
      <li class="custom-dropdown-option ${isSelected ? 'selected' : ''}" role="option" onclick="selectDisposedCourtFilter('${c.replace(/'/g, "\\'")}')">
        <span>${c}</span>
        ${isSelected ? '<svg class="lucide lucide-check" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>' : ''}
      </li>
    `;
  }).join('');

  if (select) {
    select.innerHTML = '<option value="">All Courts</option>' + unique.map(c => `<option value="${c}">${c}</option>`).join('');
    select.value = currentDisposedCourtFilter;
  }
}

/**
 * Main Disposed Cases Render Routine
 */
function renderDisposedCasesTable(records) {
  const caseRecords = records || (typeof allCaseRecords !== 'undefined' && Array.isArray(allCaseRecords) ? allCaseRecords : (typeof window !== 'undefined' && Array.isArray(window.allCaseRecords) ? window.allCaseRecords : []));

  const isDisp = typeof isCaseDisposed === 'function'
    ? isCaseDisposed
    : (c) => {
        if (!c) return false;
        if (c.isDisposed === true || c.is_disposed === true) return true;
        const dispDate = String(c.disposalDate || c.disposal_date || '').trim();
        const dispComm = String(c.disposalComment || c.disposal_comment || '').trim();
        if ((dispDate && dispDate !== '—' && dispDate !== '-') || (dispComm && dispComm !== '—' && dispComm !== '-')) return true;
        const s = ((c && (c.caseStatus || c.case_status || c.status)) || '').toLowerCase();
        return /dispose|decid|dismiss|acquit|convict|decree|closed|settle|compromise|निस्तारित|फैसला/i.test(s);
      };

  const disposedCases = caseRecords.filter(isDisp);

  // Sync count badges
  const disposedCountEl = document.getElementById('disposedCount');
  if (disposedCountEl) disposedCountEl.textContent = String(disposedCases.length);

  const disposedSrCountEl = document.getElementById('disposedSrCount');
  if (disposedSrCountEl) disposedSrCountEl.textContent = String(disposedCases.length);

  const totalBadge = document.getElementById('disposedTotalBadge');
  if (totalBadge) totalBadge.textContent = `${disposedCases.length} Cases`;

  const chipAll = document.getElementById('disposedChipCountAll');
  if (chipAll) chipAll.textContent = String(disposedCases.length);

  // Populate court dropdown
  populateDisposedCourtDropdown(disposedCases.map(c => c.courtName || c.criminalCourtName || c.court_name || c.court || '').filter(Boolean));

  // Filter by Category, Court, and Search Query
  const searchQ = (currentDisposedSearchQuery || '').toLowerCase().trim();
  const courtF = (currentDisposedCourtFilter || '').toLowerCase().trim();
  const catF = (currentDisposedCategoryFilter || '').toLowerCase().trim();

  const filtered = disposedCases.filter((c) => {
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
      const courtName = (c.courtName || c.criminalCourtName || c.court_name || c.court || '').toLowerCase().trim();
      if (courtName !== courtF) return false;
    }

    // Search Query (Omni-match across number, parties, client, court, comment)
    if (searchQ) {
      const caseNo = (c.caseNo || c.criminalCaseNumber || c.case_number || c.case_no || '').toLowerCase();
      const caseName = (c.caseName || c.case_name || '').toLowerCase();
      const firstParty = (c.firstParty || c.plaintiff || c.first_party || c.petitioner || '').toLowerCase();
      const secondParty = (c.accusedName || c.defendant || c.second_party || c.respondent || '').toLowerCase();
      const client = (c.clientName || c.criminalClientName || c.client_name || '').toLowerCase();
      const court = (c.courtName || c.criminalCourtName || c.court_name || c.court || '').toLowerCase();
      const comment = (c.disposalComment || c.disposal_comment || c.remark || c.remarks || '').toLowerCase();

      const matches = caseNo.includes(searchQ) ||
        caseName.includes(searchQ) ||
        firstParty.includes(searchQ) ||
        secondParty.includes(searchQ) ||
        client.includes(searchQ) ||
        court.includes(searchQ) ||
        comment.includes(searchQ);

      if (!matches) return false;
    }

    return true;
  });

  const footerCount = document.getElementById('disposedFooterCount');
  if (footerCount) {
    footerCount.textContent = `SHOWING ${filtered.length} OF ${disposedCases.length} CASES`;
  }

  const esc = (typeof escapeHtml === 'function') ? escapeHtml : (str) => String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const rToPlain = (typeof remarksToPlainText === 'function') ? remarksToPlainText : (r) => String(r || '');

  // 1. Render Docket Table View
  const disposedTable = document.querySelector('#disposedCasesTable tbody');
  if (disposedTable) {
    if (filtered.length === 0) {
      disposedTable.innerHTML = '<tr><td colspan="6" class="no-results">No disposed cases recorded yet.</td></tr>';
    } else {
      disposedTable.innerHTML = filtered.map((c) => {
        const caseNumber = c.caseNo || c.criminalCaseNumber || c.case_number || c.case_no || '—';
        const caseYear = c.caseYear || c.case_year || (c.year ? String(c.year) : '');
        const caseNumberDisplay = caseYear && !caseNumber.includes(String(caseYear))
          ? `<strong>${esc(caseNumber)}</strong> <span class="case-year-subtext">/${esc(caseYear)}</span>`
          : `<strong>${esc(caseNumber)}</strong>`;

        const caseName = c.caseName || c.case_name || (c.plaintiff ? `${c.plaintiff} vs ${c.defendant}` : (c.victimName ? `${c.victimName} vs ${c.accusedName}` : '—'));
        const courtName = c.courtName || c.criminalCourtName || c.court_name || c.court || 'District Court';

        const rawDisposalDate = c.disposalDate || c.disposal_date || '';
        const formattedDisposalDate = rawDisposalDate
          ? (typeof formatDate === 'function' ? formatDate(rawDisposalDate) : (typeof formatHearingDate === 'function' ? formatHearingDate(rawDisposalDate) : (typeof formatDateDMY === 'function' ? formatDateDMY(rawDisposalDate) : rawDisposalDate)))
          : '';

        const disposalComment = c.disposalComment || c.disposal_comment || rToPlain(c.remark || c.remarks || '') || '';
        const disposalCommentHtml = disposalComment
          ? `<span class="case-disposal-clamp" data-remarks-tooltip="${esc(disposalComment)}" data-remarks-title="Disposal Note &amp; Judgment" data-case-no="${esc(caseNumber)}"><svg class="lucide lucide-scale" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg> ${esc(disposalComment)}</span>`
          : '<span>—</span>';

        const dateHtml = formattedDisposalDate
          ? `<span class="disposed-date-badge"><svg class="lucide lucide-calendar-check-2" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 2v4"/><path d="M16 2v4"/><path d="M21 14V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8"/><path d="M3 10h18"/><path d="m16 20 2 2 4-4"/></svg> ${esc(formattedDisposalDate)}</span>`
          : '<span>—</span>';

        const clientNum = String(c.clientNumber || c.criminalClientNumber || c.client_number || c.phone || '').trim();

        return `
          <tr class="disposed-row-clickable" onclick="openCaseDetailsFullModal('${esc(caseNumber)}', null, '${esc(c.caseType || c.case_type || '')}', '${esc(c.id || '')}')" title="Click to view Case Dossier">
            <td class="case-number-cell">${caseNumberDisplay}</td>
            <td class="case-name-cell"><span class="case-title-main">${esc(caseName)}</span></td>
            <td class="case-court-cell"><span class="court-badge">${esc(courtName)}</span></td>
            <td class="case-date-cell">${dateHtml}</td>
            <td class="case-disposal-cell">${disposalCommentHtml}</td>
            <td class="case-action-cell" onclick="event.stopPropagation()">
              <div class="disposed-action-wrap">
                <button type="button" class="act act-dossier" onclick="openCaseDetailsFullModal('${esc(caseNumber)}', null, '${esc(c.caseType || c.case_type || '')}', '${esc(c.id || '')}')" title="Open Case Dossier">
                  <svg class="lucide lucide-folder-open" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/></svg>
                  <span>Dossier</span>
                </button>
                ${clientNum ? `
                  <a href="https://wa.me/91${clientNum.replace(/[^0-9]/g, '')}" target="_blank" rel="noopener noreferrer" class="act act-whatsapp" title="WhatsApp Notice to Client">
                    <svg class="lucide lucide-message-circle" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
                    <span>Notice</span>
                  </a>
                ` : ''}
              </div>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  // 2. Render Cards Grid View (Mobile First & Alternative)
  const cardsContainer = document.getElementById('disposedCardsViewContainer');
  if (cardsContainer) {
    if (filtered.length === 0) {
      cardsContainer.innerHTML = `
        <div class="disposed-empty-card">
          <svg class="lucide lucide-archive" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg>
          <h4>No Disposed Cases Found</h4>
          <p>There are no archived disposed cases matching your filter criteria.</p>
        </div>
      `;
    } else {
      cardsContainer.innerHTML = filtered.map((c) => {
        const caseNumber = c.caseNo || c.criminalCaseNumber || c.case_number || c.case_no || '—';
        const caseName = c.caseName || c.case_name || (c.plaintiff ? `${c.plaintiff} vs ${c.defendant}` : (c.victimName ? `${c.victimName} vs ${c.accusedName}` : '—'));
        const courtName = c.courtName || c.criminalCourtName || c.court_name || c.court || 'District Court';
        const rawDisposalDate = c.disposalDate || c.disposal_date || '';
        const formattedDisposalDate = rawDisposalDate
          ? (typeof formatDate === 'function' ? formatDate(rawDisposalDate) : (typeof formatDateDMY === 'function' ? formatDateDMY(rawDisposalDate) : rawDisposalDate))
          : 'Disposed';

        const disposalComment = c.disposalComment || c.disposal_comment || rToPlain(c.remark || c.remarks || '') || '';
        const clientNum = String(c.clientNumber || c.criminalClientNumber || c.client_number || c.phone || '').trim();

        return `
          <div class="disposed-card" onclick="openCaseDetailsFullModal('${esc(caseNumber)}', null, '${esc(c.caseType || c.case_type || '')}', '${esc(c.id || '')}')">
            <div class="disposed-card-header">
              <span class="disposed-card-caseno">${esc(caseNumber)}</span>
              <span class="disposed-status-pill"><svg class="lucide lucide-check-circle-2" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg> Disposed</span>
            </div>
            <div class="disposed-card-name">${esc(caseName)}</div>
            <div class="disposed-card-meta">
              <span class="court-tag"><svg class="lucide lucide-landmark" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg> ${esc(courtName)}</span>
              <span class="date-tag"><svg class="lucide lucide-calendar-check" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="m9 16 2 2 4-4"/></svg> ${esc(formattedDisposalDate)}</span>
            </div>
            ${disposalComment ? `
              <div class="disposed-card-comment">
                <svg class="lucide lucide-scale" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>
                <span>${esc(disposalComment)}</span>
              </div>
            ` : ''}
            <div class="disposed-card-actions" onclick="event.stopPropagation()">
              <button type="button" class="act act-dossier" onclick="openCaseDetailsFullModal('${esc(caseNumber)}', null, '${esc(c.caseType || c.case_type || '')}', '${esc(c.id || '')}')">
                <svg class="lucide lucide-folder-open" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/></svg>
                <span>Dossier</span>
              </button>
              ${clientNum ? `
                <a href="https://wa.me/91${clientNum.replace(/[^0-9]/g, '')}" target="_blank" rel="noopener noreferrer" class="act act-whatsapp">
                  <svg class="lucide lucide-message-circle" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
                  <span>Notice</span>
                </a>
              ` : ''}
            </div>
          </div>
        `;
      }).join('');
    }
  }

  return disposedCases;
}

function initDisposedTab() {
  if (typeof localStorage !== 'undefined') {
    try {
      const savedMode = localStorage.getItem('casebook_disposed_view_mode');
      if (savedMode === 'cards' || savedMode === 'table') {
        currentDisposedViewMode = savedMode;
      }
    } catch (e) {}
  }
  setDisposedViewMode(currentDisposedViewMode, false);
  renderDisposedCasesTable();
}

if (typeof renderDisposedCasesTable !== 'undefined') window.renderDisposedCasesTable = renderDisposedCasesTable;
if (typeof initDisposedTab !== 'undefined') window.initDisposedTab = initDisposedTab;
if (typeof refreshDisposedFromSupabase !== 'undefined') window.refreshDisposedFromSupabase = refreshDisposedFromSupabase;
if (typeof setDisposedViewMode !== 'undefined') window.setDisposedViewMode = setDisposedViewMode;
if (typeof handleDisposedSearchInput !== 'undefined') window.handleDisposedSearchInput = handleDisposedSearchInput;
if (typeof clearDisposedSearch !== 'undefined') window.clearDisposedSearch = clearDisposedSearch;
if (typeof setDisposedCategoryFilter !== 'undefined') window.setDisposedCategoryFilter = setDisposedCategoryFilter;
if (typeof toggleDisposedCourtDropdown !== 'undefined') window.toggleDisposedCourtDropdown = toggleDisposedCourtDropdown;
if (typeof selectDisposedCourtFilter !== 'undefined') window.selectDisposedCourtFilter = selectDisposedCourtFilter;
