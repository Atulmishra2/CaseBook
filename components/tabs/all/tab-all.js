window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs["all"] = `<div class="all-cases-container">
  <!-- PAGE HEADER (Clean Slate Gradient with Icon, Title, and Action Switcher) -->
  <div class="page-header">
    <div class="ph-left">
      <div class="ph-icon">
        <iconify-icon icon="lucide:scale"></iconify-icon>
      </div>
      <div>
        <div class="ph-title">Cases Register</div>
        <div class="ph-sub">Unified master directory of all legal matters registered across courts and forums</div>
      </div>
    </div>

    <div class="ph-actions">
      <!-- Dual View Switcher (Table vs Cards) -->
      <div class="view-toggle" role="group" aria-label="Switch display mode">
        <button
          type="button"
          class="active"
          id="casesViewToggleTable"
          onclick="setCasesViewMode('table')"
          title="Switch to Table View"
        >
          <iconify-icon icon="lucide:table"></iconify-icon> Table
        </button>
        <button
          type="button"
          id="casesViewToggleCards"
          onclick="setCasesViewMode('cards')"
          title="Switch to Cards View"
        >
          <iconify-icon icon="lucide:layout-grid"></iconify-icon> Cards
        </button>
      </div>

      <button type="button" class="btn-add" onclick="showTab('add')" title="Register a new legal case">
        <iconify-icon icon="lucide:plus"></iconify-icon> Add Case
      </button>
    </div>
  </div>

  <!-- STATS ROW (5 Metrics: Total, Pending, Listed Today, Undated, Disposed) -->
  <div class="stats-row">
    <div
      class="stat-card stat-total"
      data-stat="total"
      onclick="filterAllCasesByType(''); setAllCasesStatusFilter('')"
      title="Show All Registered Cases"
    >
      <div class="stat-value" id="casesStatTotal">0</div>
      <div class="stat-label">Total Matters</div>
    </div>
    <div
      class="stat-card stat-pending"
      data-stat="pending"
      onclick="setAllCasesStatusFilter('pending')"
      title="Filter Pending Matters"
    >
      <div class="stat-value" id="casesStatPending">0</div>
      <div class="stat-label">Pending</div>
    </div>
    <div
      class="stat-card stat-today"
      data-stat="today"
      onclick="setAllCasesDateFilter('today')"
      title="Filter Hearings Listed Today"
    >
      <div class="stat-value" id="casesStatToday">0</div>
      <div class="stat-label">Listed Today</div>
    </div>
    <div
      class="stat-card stat-undated"
      data-stat="undated"
      onclick="setAllCasesStatusFilter('pending_forward')"
      title="Filter Cases Pending Forward Date"
    >
      <div class="stat-value" id="casesStatUndated">0</div>
      <div class="stat-label">Pending Forward Date</div>
    </div>
    <div
      class="stat-card stat-disposed"
      data-stat="disposed"
      onclick="setAllCasesStatusFilter('disposed')"
      title="Filter Disposed Matters"
    >
      <div class="stat-value" id="casesStatDisposed">0</div>
      <div class="stat-label">Disposed</div>
    </div>
  </div>

  <!-- FILTER TABS (Category Pills with Lucide Icons and Counter Badges) -->
  <div class="filter-tabs" id="filterTabs" role="tablist">
    <button
      type="button"
      class="ftab active"
      data-type=""
      onclick="filterAllCasesByType('')"
    >
      All Cases <span class="ftab-count" id="pillCountAll">0</span>
    </button>
    <button
      type="button"
      class="ftab color-civil"
      data-type="civil"
      onclick="filterAllCasesByType('civil')"
    >
      <iconify-icon icon="lucide:landmark"></iconify-icon> Civil Cases
      <span class="ftab-count" id="pillCountCivil">0</span>
    </button>
    <button
      type="button"
      class="ftab color-state"
      data-type="state"
      onclick="filterAllCasesByType('state')"
    >
      <iconify-icon icon="lucide:shield-alert"></iconify-icon> State Cases
      <span class="ftab-count" id="pillCountState">0</span>
    </button>
    <button
      type="button"
      class="ftab color-family"
      data-type="family"
      onclick="filterAllCasesByType('family')"
    >
      <iconify-icon icon="lucide:users"></iconify-icon> Family Cases
      <span class="ftab-count" id="pillCountFamily">0</span>
    </button>
    <button
      type="button"
      class="ftab color-revenue"
      data-type="revenue"
      onclick="filterAllCasesByType('revenue')"
    >
      <iconify-icon icon="lucide:sprout"></iconify-icon> Revenue Cases
      <span class="ftab-count" id="pillCountRevenue">0</span>
    </button>
    <button
      type="button"
      class="ftab color-misc-civil"
      data-type="misc_civil"
      onclick="filterAllCasesByType('misc_civil')"
    >
      <iconify-icon icon="lucide:files"></iconify-icon> Misc Civil
      <span class="ftab-count" id="pillCountMiscCivil">0</span>
    </button>
    <button
      type="button"
      class="ftab color-misc-crim"
      data-type="misc_criminal"
      onclick="filterAllCasesByType('misc_criminal')"
    >
      <iconify-icon icon="lucide:gavel"></iconify-icon> Misc Criminal
      <span class="ftab-count" id="pillCountMiscCriminal">0</span>
    </button>
    <button
      type="button"
      class="ftab color-complaint"
      data-type="complaint"
      onclick="filterAllCasesByType('complaint')"
    >
      <iconify-icon icon="lucide:alert-octagon"></iconify-icon> Complaint Cases
      <span class="ftab-count" id="pillCountComplaint">0</span>
    </button>
    <button
      type="button"
      class="ftab color-waiting-filing"
      data-type="waiting_filing"
      onclick="filterAllCasesByType('waiting_filing')"
      title="Cases filed awaiting first hearing date / admission"
    >
      <iconify-icon icon="lucide:file-clock"></iconify-icon> Waiting for Initial Filing
      <span class="ftab-count" id="pillCountWaitingFiling">0</span>
    </button>
  </div>

  <!-- SEARCH + FILTERS PANEL -->
  <div class="filters-panel">
    <div class="search-big">
      <iconify-icon icon="lucide:search"></iconify-icon>
      <input
        type="text"
        id="allCasesSearchInput"
        placeholder="Search by Case No, Parties, Client, Court, Police Station, Crime No, Remarks..."
        aria-label="Search all cases"
        oninput="renderUnifiedCasesView()"
        enterkeyhint="search"
        autocomplete="off"
      />
      <button
        type="button"
        id="allCasesSearchClearBtn"
        class="search-clear-btn hidden"
        onclick="clearAllCasesSearch()"
        title="Clear search query"
      >
        <iconify-icon icon="lucide:x"></iconify-icon>
      </button>
    </div>

    <div class="filters-row">
      <!-- 1. Case Type Dropdown -->
      <div class="f-group">
        <label for="allCasesTypeSelect">
          <iconify-icon icon="lucide:landmark"></iconify-icon> Case Type
        </label>
        <div class="custom-dropdown" id="allCasesTypeDropdown">
          <button
            type="button"
            class="custom-dropdown-trigger"
            id="allCasesTypeTrigger"
            aria-haspopup="listbox"
            aria-expanded="false"
          >
            <span class="custom-dropdown-label" id="allCasesTypeLabel">All Case Types</span>
            <svg class="custom-dropdown-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div class="custom-dropdown-menu" id="allCasesTypeMenu">
            <ul class="custom-dropdown-list custom-scrollbar" id="allCasesTypeList" role="listbox"></ul>
          </div>
          <select
            id="allCasesTypeSelect"
            class="f-select sr-only"
            style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); border: 0;"
            onchange="if (window.handleAllCasesTypeSelectChange) window.handleAllCasesTypeSelectChange()"
          >
            <option value="">All Case Types</option>
            <option value="civil">Civil</option>
            <option value="state">State (Criminal)</option>
            <option value="family">Family</option>
            <option value="revenue">Revenue</option>
            <option value="misc_civil">Misc Civil</option>
            <option value="misc_criminal">Misc Criminal</option>
            <option value="complaint">Complaint</option>
          </select>
        </div>
      </div>

      <!-- 2. Case Status Dropdown -->
      <div class="f-group">
        <label for="allCasesStatusSelect">
          <iconify-icon icon="lucide:activity"></iconify-icon> Case Status
        </label>
        <div class="custom-dropdown" id="allCasesStatusDropdown">
          <button
            type="button"
            class="custom-dropdown-trigger"
            id="allCasesStatusTrigger"
            aria-haspopup="listbox"
            aria-expanded="false"
          >
            <span class="custom-dropdown-label" id="allCasesStatusLabel">All Statuses</span>
            <svg class="custom-dropdown-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div class="custom-dropdown-menu" id="allCasesStatusMenu">
            <ul class="custom-dropdown-list custom-scrollbar" id="allCasesStatusList" role="listbox"></ul>
          </div>
          <select
            id="allCasesStatusSelect"
            class="f-select sr-only"
            style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); border: 0;"
            onchange="renderUnifiedCasesView()"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="pending_forward">Pending Forward Date</option>
            <option value="disposed">Disposed</option>
            <option value="undated">Undated</option>
          </select>
        </div>
      </div>

      <!-- 3. Court / Forum Dropdown -->
      <div class="f-group">
        <label for="allCasesCourtSelect">
          <iconify-icon icon="lucide:building-2"></iconify-icon> Court / Forum
        </label>
        <div class="custom-dropdown" id="allCasesCourtDropdown">
          <button
            type="button"
            class="custom-dropdown-trigger"
            id="allCasesCourtTrigger"
            aria-haspopup="listbox"
            aria-expanded="false"
          >
            <span class="custom-dropdown-label" id="allCasesCourtLabel">All Courts</span>
            <svg class="custom-dropdown-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div class="custom-dropdown-menu" id="allCasesCourtMenu">
            <ul class="custom-dropdown-list custom-scrollbar" id="allCasesCourtList" role="listbox"></ul>
          </div>
          <select
            id="allCasesCourtSelect"
            class="f-select sr-only"
            style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); border: 0;"
            onchange="renderUnifiedCasesView()"
          >
            <option value="">All Courts</option>
          </select>
        </div>
      </div>

      <button class="btn-reset" type="button" onclick="resetAllCasesFilters()" title="Reset all search filters">
        <iconify-icon icon="lucide:rotate-ccw"></iconify-icon> Reset Filters
      </button>
    </div>
  </div>

  <!-- VIEW 1: TABLE VIEW -->
  <div id="casesTableViewContainer" class="cases-view-section">
    <div class="table-card">
      <div class="table-top">
        <div class="entries-control">
          <span>Show</span>
          <select id="allCasesPageSizeSelect" onchange="handleAllCasesPageSizeChange(this.value)">
            <option value="10" selected>10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="all">All</option>
          </select>
          <span class="entries-label">entries per page</span>
        </div>
        <div class="showing-info" id="allCasesCountBadge">Showing 0 of 0 cases</div>
      </div>

      <div class="table-scroll">
        <table class="data-table" id="allCasesTable">
          <thead>
            <tr>
              <th>CASE NUMBER</th>
              <th>CASE NAME</th>
              <th>COURT / FORUM</th>
              <th>CLIENT NAME</th>
              <th style="text-align: center;">PARTIES / REMARKS</th>
              <th style="text-align: center;">NEXT HEARING</th>
              <th style="text-align: center;">ACTIONS</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="pagination" id="allCasesPaginationBar">
        <div class="page-info" id="allCasesPaginationInfo">Showing 0 to 0 of 0 entries</div>
        <div class="page-btns" id="allCasesPaginationControls"></div>
      </div>
    </div>
  </div>

  <!-- VIEW 2: CARDS GRID VIEW -->
  <div id="casesCardsViewContainer" class="cases-view-section hidden">
    <div class="cards-count-summary-bar">
      <span id="unifiedCardsCountBadge" class="showing-info">Showing 0 cases</span>
    </div>
    <div id="unifiedCaseCardsGrid" class="cards-feed-grid"></div>
  </div>
</div>
`;
