window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs['livecrud'] = `<div class="livecrud-tab-container">
    <!-- Live Database Manager Header Banner (Master Style matching Upcoming Tab) -->
    <header class="board-head lc-master-head">
        <div class="head-left">
            <div class="h1">
                <span class="crest" aria-hidden="true">
                    <svg class="lucide lucide-database" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>
                </span>
                <span class="h1-text" id="liveCrudMainTitle">Live Database Manager</span>
            </div>
            <div class="sub" id="liveCrudHeaderSubline">
                <b id="liveCrudConnectionSubline">Supabase Live</b> · <span id="liveCrudHeaderStatBadge" class="lc-stat-pill">Civil Cases</span> · <span id="liveCrudHeaderRowCount" class="lc-stat-pill">0 rows</span>
            </div>
        </div>

        <div class="head-actions">
            <!-- Dual View Switcher (Cards vs Table) -->
            <div class="lc-view-toggle view-toggle" role="group" aria-label="Switch display mode">
                <button type="button" class="view-btn active" id="liveCrudToggleCards" onclick="setLiveCrudViewMode('cards')" title="Switch to Cards View" aria-label="Switch to Cards View">
                    <svg class="lucide lucide-layout-grid" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg> <span>Cards</span>
                </button>
                <button type="button" class="view-btn" id="liveCrudToggleTable" onclick="setLiveCrudViewMode('table')" title="Switch to Table View" aria-label="Switch to Table View">
                    <svg class="lucide lucide-table-2" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg> <span>Table</span>
                </button>
            </div>
        </div>
    </header>

    <!-- Minimalist Unified Database Toolbar -->
    <div class="db-toolbar-card lc-minimal-toolbar">
        <div class="lc-toolbar-primary">
            <!-- Left: Table Selector (Preserved Custom Popover Dropdown) -->
            <div class="lc-table-select-wrap">
                <!-- Visually hidden native select for full programmatic & test compatibility -->
                <select id="liveCrudTableSelect" class="form-select db-select lc-minimal-select lc-visually-hidden" aria-label="Select database table" tabindex="-1">
                    <option value="civilcases" selected>Civil Cases</option>
                    <option value="statecases">State Cases</option>
                    <option value="criminalcases">Criminal Cases (Legacy)</option>
                    <option value="familycases">Family Cases</option>
                    <option value="revenuecases">Revenue Cases</option>
                    <option value="misccivilcases">Misc Civil Cases</option>
                    <option value="misccriminalcases">Misc Criminal Cases</option>
                    <option value="complaintcases">Complaint Cases</option>
                    <option value="hearings">Hearings</option>
                    <option value="courts">Courts</option>
                    <option value="court_helpers">Court Helpers</option>
                    <option value="case_todos">Case Tasks</option>
                    <option value="case_transfers">Case Transfers</option>
                    <option value="transactions">Virtual Account (Transactions)</option>
                    <option value="personal_transactions">Personal Account (Wallet)</option>
                </select>

                <!-- Custom Dropdown Trigger & Popover Menu (Option 2) -->
                <div class="custom-dropdown lc-custom-dropdown lc-table-custom-dropdown" id="liveCrudTableCustomDropdown">
                    <button type="button" class="custom-dropdown-trigger lc-dropdown-trigger" id="liveCrudTableDropdownTrigger" onclick="toggleLiveCrudTableDropdown(event)" aria-haspopup="listbox" aria-expanded="false" title="Select database table">
                        <span class="lc-trigger-icon" aria-hidden="true">
                            <svg class="lucide lucide-database" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>
                        </span>
                        <span class="lc-trigger-label" id="liveCrudTableDropdownLabel">Civil Cases</span>
                        <span class="lc-trigger-chevron" aria-hidden="true">
                            <svg class="lucide lucide-chevron-down" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                        </span>
                    </button>

                    <div class="custom-dropdown-menu lc-dropdown-menu hidden" id="liveCrudTableDropdownMenu" role="listbox" onclick="event.stopPropagation()">
                        <div class="lc-dd-items-list" id="liveCrudTableDropdownList">
                            <!-- Populated dynamically via JS -->
                        </div>
                    </div>
                </div>
            </div>

            <!-- Center: Search Input with Integrated Filter Menu Button & Card -->
            <div class="lc-search-wrap lc-integrated-search-box">
                <svg class="lucide lucide-search lc-search-icon" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                <input type="text" id="liveCrudSearchInput" class="lc-search-input db-search-input" placeholder="Search across all columns..." autocomplete="off">
                <button type="button" id="liveCrudSearchClearBtn" class="search-clear-btn hidden" onclick="clearLiveCrudSearch()" title="Clear search" aria-label="Clear search">
                    <svg class="lucide lucide-x" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
                <div class="lc-search-divider" aria-hidden="true"></div>
                <!-- Filter Toggle Button (Right side of searchbar) -->
                <button type="button" id="liveCrudFilterMenuBtn" class="lc-filter-menu-btn" onclick="toggleLiveCrudFilterCard(event)" title="Toggle filters card" aria-expanded="false" aria-haspopup="true">
                    <svg class="lucide lucide-sliders-horizontal" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/></svg>
                    <span class="lc-filter-btn-text">Filters</span>
                    <span id="liveCrudFilterActiveBadge" class="lc-filter-count-badge hidden"></span>
                </button>

                <!-- Floating Filter Popover Card -->
                <div id="liveCrudFilterCard" class="lc-filter-card hidden" onclick="event.stopPropagation()">
                    <div class="lc-filter-card-header">
                        <div class="lc-filter-card-title">
                            <svg class="lucide lucide-sliders-horizontal" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/></svg>
                            <span>Filters</span>
                            <span id="liveCrudFilterHeaderBadge" class="lc-filter-pill-badge hidden">0 applied</span>
                        </div>
                        <button type="button" class="lc-filter-card-close" onclick="closeLiveCrudFilterCard()" title="Close filters card" aria-label="Close filters card">
                            <svg class="lucide lucide-x" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                    </div>

                    <!-- Dynamic Filter Rows populated via JS -->
                    <div class="lc-filter-card-body" id="liveCrudDynamicFiltersRow">
                        <!-- Populated dynamically via JS -->
                    </div>

                    <div class="lc-filter-card-footer">
                        <button type="button" class="lc-card-reset-btn btn-reset" onclick="resetLiveCrudFilters()" title="Reset all active filters">
                            <svg class="lucide lucide-rotate-ccw" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                            <span>Reset</span>
                        </button>
                        <button type="button" class="lc-card-apply-btn" onclick="closeLiveCrudFilterCard()">
                            <svg class="lucide lucide-check" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                            <span>Done</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Right: Action Buttons -->
            <div class="lc-actions-wrap">
                <button type="button" id="liveCrudRefreshBtn" class="secondary-btn db-action-btn lc-toolbar-btn lc-refresh-btn" title="Fetch fresh records from Supabase">
                    <iconify-icon icon="lucide:rotate-cw"></iconify-icon>
                    <span>Refresh</span>
                </button>
                <button type="button" id="liveCrudInsertBtn" class="primary-btn db-action-btn lc-toolbar-btn lc-insert-btn" title="Insert a new row into selected table">
                    <iconify-icon icon="lucide:plus"></iconify-icon>
                    <span>Insert Row</span>
                </button>
            </div>
        </div>

        <!-- Active Filter Indicator Mini-Row (Visible only when filters are active) -->
        <div id="liveCrudActiveTagsRow" class="lc-active-tags-row hidden">
            <span class="lc-active-tags-label">Active:</span>
            <div id="liveCrudActiveTagsContainer" class="lc-active-tags-list"></div>
            <button type="button" class="lc-tags-clear-btn" onclick="resetLiveCrudFilters()" title="Clear active filters">
                Clear all
            </button>
        </div>

        <!-- Hidden badges container to preserve DOM references without visual clutter -->
        <div class="lc-hidden-badges" style="display: none !important;" aria-hidden="true">
            <span id="liveCrudTableBadge"><iconify-icon icon="lucide:database"></iconify-icon><span class="badge-text">Civil Cases</span></span>
            <span id="liveCrudRowCountBadge"><iconify-icon icon="lucide:layers"></iconify-icon><span class="badge-text">0 rows</span></span>
            <span id="liveCrudStatusBadge"><span class="live-pulse-dot"></span><span class="badge-text">Supabase Live</span></span>
        </div>
    </div>

    <!-- View 1: Row Cards Grid -->
    <div id="liveCrudCardsViewContainer" class="lc-cards-view-section">
        <div id="liveCrudRowsContainer" class="lc-rows-container">
            <div class="lc-empty">⏳ Loading table data…</div>
        </div>
    </div>

    <!-- View 2: Data Table View (Inherited from Cases Register table-card) -->
    <div id="liveCrudTableViewContainer" class="lc-table-view-section hidden">
        <div class="table-card">
            <!-- Table Top Controller -->
            <div class="table-top">
                <div class="entries-control">
                    <span>Show</span>
                    <div class="custom-dropdown lc-custom-dropdown lc-page-size-dropdown" id="liveCrudPageSizeCustomDropdown">
                        <button type="button" class="custom-dropdown-trigger lc-dropdown-trigger lc-page-size-trigger" id="liveCrudPageSizeTrigger" onclick="toggleLiveCrudPageSizeDropdown(event)" aria-haspopup="listbox" aria-expanded="false" title="Select entries per page">
                            <span class="lc-trigger-label" id="liveCrudPageSizeLabel">25</span>
                            <span class="lc-trigger-chevron" aria-hidden="true">
                                <svg class="lucide lucide-chevron-down" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                            </span>
                        </button>
                        <div class="custom-dropdown-menu lc-dropdown-menu hidden" id="liveCrudPageSizeMenu" role="listbox" onclick="event.stopPropagation()">
                            <div class="lc-dd-items-list">
                                <button type="button" class="custom-dropdown-item lc-dd-item" onclick="selectLiveCrudPageSize('10')"><span class="lc-dd-item-text">10</span></button>
                                <button type="button" class="custom-dropdown-item lc-dd-item selected" onclick="selectLiveCrudPageSize('25')"><span class="lc-dd-item-text">25</span></button>
                                <button type="button" class="custom-dropdown-item lc-dd-item" onclick="selectLiveCrudPageSize('50')"><span class="lc-dd-item-text">50</span></button>
                                <button type="button" class="custom-dropdown-item lc-dd-item" onclick="selectLiveCrudPageSize('100')"><span class="lc-dd-item-text">100</span></button>
                                <button type="button" class="custom-dropdown-item lc-dd-item" onclick="selectLiveCrudPageSize('all')"><span class="lc-dd-item-text">All</span></button>
                            </div>
                        </div>
                    </div>
                    <select id="liveCrudPageSizeSelect" class="lc-visually-hidden" onchange="handleLiveCrudPageSizeChange(this.value)" tabindex="-1">
                        <option value="10">10</option>
                        <option value="25" selected>25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="all">All</option>
                    </select>
                    <span class="entries-label">entries per page</span>
                </div>
                <div class="showing-info" id="liveCrudTableCountBadge">Showing 0 of 0 rows</div>
            </div>

            <div class="table-scroll">
                <table class="data-table" id="liveCrudDataTable">
                    <thead id="liveCrudTableHead"></thead>
                    <tbody id="liveCrudTableBody"></tbody>
                </table>
            </div>

            <!-- Downside Pagination Bar -->
            <div class="pagination" id="liveCrudPaginationBar">
                <div class="page-info" id="liveCrudPaginationInfo">Showing 0 to 0 of 0 entries</div>
                <div class="page-btns" id="liveCrudPaginationControls"></div>
            </div>
        </div>
    </div>
</div>

<!-- Live CRUD Edit/Insert Modal -->
<div id="liveCrudFormModal" class="db-modal-backdrop lc-form-modal-backdrop hidden" role="dialog" aria-modal="true" aria-labelledby="lcModalTitle">
    <div class="db-modal-card lc-form-modal-card">
        <!-- Modern Modal Header -->
        <div class="db-modal-header lc-form-modal-header">
            <div class="db-modal-title-box lc-modal-title-box">
                <div id="lcModalIcon" class="db-modal-icon lc-modal-icon-badge" aria-hidden="true">
                    <svg class="lucide lucide-file-edit" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5"/><polyline points="14 2 14 8 20 8"/><path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l1-3.95 5.42-5.44Z"/></svg>
                </div>
                <div class="lc-modal-title-group">
                    <div class="lc-modal-title-row">
                        <h4 id="lcModalTitle" class="lc-modal-title">Edit Row</h4>
                        <span id="lcModalActionBadge" class="lc-modal-badge lc-badge-edit">Edit Mode</span>
                        <span id="lcModalTableBadge" class="lc-modal-badge lc-badge-table">Civil Cases</span>
                    </div>
                    <p id="lcModalSubtitle" class="db-modal-subtitle lc-modal-subtitle">Update field values and save to Supabase.</p>
                </div>
            </div>
            <button type="button" id="lcModalCloseBtn" class="db-modal-close-btn lc-modal-close-btn" title="Close dialog" aria-label="Close dialog">
                <svg class="lucide lucide-x" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
        </div>

        <!-- Filter & Search Toolbar inside Modal -->
        <div class="lc-modal-field-toolbar">
            <div class="lc-field-search-wrap">
                <svg class="lucide lucide-search" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                <input type="text" id="lcFormFieldSearch" class="lc-field-filter-input" placeholder="Quick find field by column or label..." oninput="filterLiveCrudModalFields(this.value)" autocomplete="off" style="border: none !important; border-width: 0 !important; outline: none !important; box-shadow: none !important; background: transparent !important; border-radius: 0 !important; padding: 0 8px !important; height: 100% !important; min-height: 0 !important; margin: 0 !important;">
                <button type="button" class="lc-field-search-clear hidden" id="lcFormFieldSearchClear" onclick="clearLiveCrudModalFieldSearch()" title="Clear field filter" aria-label="Clear field filter">
                    <svg class="lucide lucide-x" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
            </div>
            <div class="lc-modal-field-stats">
                <span id="lcModalFieldCount" class="lc-modal-stat-pill">0 fields</span>
            </div>
        </div>

        <form id="liveCrudForm" class="db-record-form lc-modal-form" onsubmit="return handleLiveCrudFormSubmit(event);">
            <input type="hidden" id="lcRecordId" value="">
            <input type="hidden" id="lcRecordAction" value="edit">
            <div id="lcDynamicFieldsGrid" class="form-grid-2col db-dynamic-fields-container lc-dynamic-fields-grid">
                <!-- Populated dynamically from the row's columns -->
            </div>

            <!-- Feedback / Alert Banner -->
            <div id="lcModalStatusBanner" class="lc-modal-status-banner hidden">
                <span class="lc-status-icon" id="lcModalStatusIcon" aria-hidden="true">
                    <svg class="lucide lucide-alert-circle" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
                </span>
                <p id="lcModalStatusMsg" class="update-status-msg lc-status-text"></p>
            </div>

            <div class="db-modal-footer lc-modal-footer">
                <div class="lc-modal-footer-left">
                    <button type="button" class="lc-modal-tool-btn" onclick="resetLiveCrudModalFields()" title="Revert fields to original values">
                        <svg class="lucide lucide-rotate-ccw" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                        <span>Revert</span>
                    </button>
                    <button type="button" class="lc-modal-tool-btn" onclick="clearLiveCrudModalFields()" title="Clear all field inputs">
                        <svg class="lucide lucide-eraser" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/><path d="m5 11 9 9"/></svg>
                        <span>Clear All</span>
                    </button>
                </div>
                <div class="lc-modal-footer-right">
                    <button type="button" id="lcModalCancelBtn" class="secondary-btn lc-modal-btn lc-cancel-btn">
                        <svg class="lucide lucide-x" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        <span>Cancel</span>
                    </button>
                    <button type="submit" id="lcModalSubmitBtn" class="primary-btn lc-modal-btn lc-submit-btn">
                        <svg class="lucide lucide-check" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                        <span>Save to Database</span>
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>

<!-- Live CRUD Delete Confirmation Modal -->
<div id="liveCrudDeleteModal" class="db-modal-backdrop lc-delete-modal-backdrop hidden" role="dialog" aria-modal="true" aria-labelledby="lcDeleteModalTitle">
    <div class="db-modal-card lc-delete-modal-card">
        <div class="lc-delete-modal-header">
            <div class="lc-delete-header-content">
                <div class="lc-delete-icon-badge" aria-hidden="true">
                    <svg class="lucide lucide-trash-2" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                </div>
                <div class="lc-delete-title-wrap">
                    <div class="lc-delete-badge-row">
                        <span class="lc-delete-badge">Danger Zone</span>
                    </div>
                    <h3 id="lcDeleteModalTitle" class="lc-delete-title">Delete Record Permanently?</h3>
                </div>
            </div>
            <button type="button" class="db-modal-close-btn lc-delete-close-btn" onclick="closeLiveCrudDeleteModal()" title="Close dialog" aria-label="Close dialog">
                <svg class="lucide lucide-x" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
        </div>
        <div class="lc-delete-modal-body">
            <p class="lc-delete-description">
                You are about to permanently remove this row from <strong id="lcDeleteModalTable" class="lc-delete-table-target">Civil Cases</strong>. This action is irreversible.
            </p>
            <div class="lc-delete-preview-box">
                <div class="lc-delete-preview-label">Target Record</div>
                <div id="lcDeleteModalHeadline" class="lc-delete-preview-content">—</div>
            </div>
            <div id="lcDeleteModalError" class="lc-delete-error-banner hidden" role="alert"></div>
        </div>
        <div class="lc-delete-modal-footer">
            <button type="button" id="lcDeleteCancelBtn" class="lc-delete-btn-cancel" onclick="closeLiveCrudDeleteModal()">
                <span>Cancel</span>
            </button>
            <button type="button" id="lcDeleteConfirmBtn" class="lc-delete-btn-confirm" onclick="confirmLiveCrudDelete()">
                <svg class="lucide lucide-trash-2" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                <span id="lcDeleteBtnText">Delete Permanently</span>
            </button>
        </div>
    </div>
</div>
`;

// ==============================================================================
// Live CRUD (Simple) — Supabase Database Manager Tab
// Simple mobile/desktop interface: browse rows as cards, insert, edit, delete.
// ==============================================================================

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
if (typeof window !== 'undefined' && !window.escapeHtml) {
  window.escapeHtml = escapeHtml;
}

var allCaseTransfers = (typeof allCaseTransfers !== 'undefined' && Array.isArray(allCaseTransfers))
  ? allCaseTransfers
  : (typeof window !== 'undefined' && Array.isArray(window.allCaseTransfers) ? window.allCaseTransfers : []);
if (typeof window !== 'undefined') window.allCaseTransfers = allCaseTransfers;

function getLiveCrudAllCaseRecords() {
  if (typeof window !== 'undefined' && Array.isArray(window.allCaseRecords)) return window.allCaseRecords;
  if (typeof allCaseRecords !== 'undefined' && Array.isArray(allCaseRecords)) return allCaseRecords;
  return [];
}

function getLiveCrudPaisaTransactions() {
  if (typeof window !== 'undefined' && Array.isArray(window.allPaisaTransactions)) return window.allPaisaTransactions;
  if (typeof allPaisaTransactions !== 'undefined' && Array.isArray(allPaisaTransactions)) return allPaisaTransactions;
  return [];
}

function getLiveCrudPersonalTransactions() {
  if (typeof window !== 'undefined' && Array.isArray(window.allPersonalTransactions)) return window.allPersonalTransactions;
  if (typeof allPersonalTransactions !== 'undefined' && Array.isArray(allPersonalTransactions)) return allPersonalTransactions;
  return [];
}

var liveCrudCurrentTable = 'civilcases';
var liveCrudRows = [];
var liveCrudListenersWired = false;
var currentLiveCrudViewMode = (typeof localStorage !== 'undefined' ? localStorage.getItem('casebook_livecrud_view_mode') : null) || 'cards';
var liveCrudActiveFilters = {};
var liveCrudCurrentPage = 1;
var liveCrudPageSize = 25;

const LIVE_CRUD_FILTER_SCHEMAS = {
  civilcases: [
    { key: 'court_name', label: 'Court / Forum', icon: 'lucide:building-2' },
    { key: 'case_type', label: 'Case Type', icon: 'lucide:landmark' },
    { key: 'hearing_process', label: 'Stage / Process', icon: 'lucide:activity' }
  ],
  statecases: [
    { key: 'court_name', label: 'Court / Forum', icon: 'lucide:building-2' },
    { key: 'police_station', label: 'Police Station', icon: 'lucide:shield' },
    { key: 'hearing_process', label: 'Stage', icon: 'lucide:activity' }
  ],
  criminalcases: [
    { key: 'criminalCourtName', label: 'Court', icon: 'lucide:building-2' },
    { key: 'policeStation', label: 'Police Station', icon: 'lucide:shield' }
  ],
  familycases: [
    { key: 'court_name', label: 'Court', icon: 'lucide:building-2' },
    { key: 'hearing_process', label: 'Stage', icon: 'lucide:activity' }
  ],
  revenuecases: [
    { key: 'court_name', label: 'Court / Forum', icon: 'lucide:building-2' },
    { key: 'hearing_process', label: 'Stage', icon: 'lucide:activity' }
  ],
  hearings: [
    { key: 'court_name', label: 'Court', icon: 'lucide:building-2' },
    { key: 'purpose', label: 'Hearing Stage', icon: 'lucide:activity' }
  ],
  transactions: [
    { key: 'type', label: 'Txn Type', icon: 'lucide:arrow-left-right' },
    { key: 'mode', label: 'Payment Mode', icon: 'lucide:credit-card' },
    { key: 'category', label: 'Category', icon: 'lucide:tag' }
  ],
  personal_transactions: [
    { key: 'type', label: 'Txn Type', icon: 'lucide:arrow-left-right' },
    { key: 'category', label: 'Category', icon: 'lucide:tag' }
  ],
  court_helpers: [
    { key: 'court_name', label: 'Court', icon: 'lucide:building-2' },
    { key: 'helper_type', label: 'Helper Role', icon: 'lucide:user' }
  ],
  case_todos: [
    { key: 'status', label: 'Status', icon: 'lucide:check-circle' },
    { key: 'priority', label: 'Priority', icon: 'lucide:flag' }
  ],
  case_transfers: [
    { key: 'from_court', label: 'From Court', icon: 'lucide:building-2' },
    { key: 'to_court', label: 'To Court', icon: 'lucide:building-2' }
  ]
};

function setLiveCrudViewMode(mode) {
  if (mode !== 'table' && mode !== 'cards') mode = 'cards';
  currentLiveCrudViewMode = mode;
  try {
    localStorage.setItem('casebook_livecrud_view_mode', mode);
  } catch (e) {}

  const crdBtn = document.getElementById('liveCrudToggleCards');
  const tblBtn = document.getElementById('liveCrudToggleTable');
  if (crdBtn) crdBtn.classList.toggle('active', mode === 'cards');
  if (tblBtn) tblBtn.classList.toggle('active', mode === 'table');

  const crdContainer = document.getElementById('liveCrudCardsViewContainer');
  const tblContainer = document.getElementById('liveCrudTableViewContainer');
  if (crdContainer) crdContainer.classList.toggle('hidden', mode !== 'cards');
  if (tblContainer) tblContainer.classList.toggle('hidden', mode !== 'table');

  renderLiveCrudData();
}
if (typeof setLiveCrudViewMode !== 'undefined') window.setLiveCrudViewMode = setLiveCrudViewMode;

function clearLiveCrudSearch() {
  liveCrudCurrentPage = 1;
  const searchInput = document.getElementById('liveCrudSearchInput');
  const clearBtn = document.getElementById('liveCrudSearchClearBtn');
  if (searchInput) searchInput.value = '';
  if (clearBtn) clearBtn.classList.add('hidden');
  renderLiveCrudData();
}
if (typeof clearLiveCrudSearch !== 'undefined') window.clearLiveCrudSearch = clearLiveCrudSearch;

function initLiveCrudTab() {
  wireLiveCrudListeners();

  const select = document.getElementById('liveCrudTableSelect');
  if (select && select.value) {
    liveCrudCurrentTable = select.value;
  }
  populateLiveCrudTableDropdown();
  setLiveCrudViewMode(currentLiveCrudViewMode);
  fetchLiveCrudRows();
}

function wireLiveCrudListeners() {
  const select = document.getElementById('liveCrudTableSelect');
  if (select && !select.dataset.hasLcListener) {
    select.dataset.hasLcListener = 'true';
    select.addEventListener('change', () => {
      liveCrudCurrentTable = select.value;
      liveCrudActiveFilters = {};
      liveCrudCurrentPage = 1;
      const searchInput = document.getElementById('liveCrudSearchInput');
      if (searchInput) searchInput.value = '';
      const clearBtn = document.getElementById('liveCrudSearchClearBtn');
      if (clearBtn) clearBtn.classList.add('hidden');
      populateLiveCrudTableDropdown();
      fetchLiveCrudRows();
    });
  }

  // Document-level listeners for custom dropdown popovers
  if (typeof window !== 'undefined' && !window.__lcDropdownListenersWired) {
    window.__lcDropdownListenersWired = true;
    document.addEventListener('click', onLiveCrudDropdownOutsideClick);
    document.addEventListener('keydown', onLiveCrudDropdownKeydown);
  }
  populateLiveCrudTableDropdown();

  const searchInput = document.getElementById('liveCrudSearchInput');
  if (searchInput && !searchInput.dataset.hasLcListener) {
    searchInput.dataset.hasLcListener = 'true';
    searchInput.addEventListener('input', () => {
      liveCrudCurrentPage = 1;
      const clearBtn = document.getElementById('liveCrudSearchClearBtn');
      if (clearBtn) clearBtn.classList.toggle('hidden', !searchInput.value);
      renderLiveCrudData();
    });
  }

  const clearBtn = document.getElementById('liveCrudSearchClearBtn');
  if (clearBtn && !clearBtn.dataset.hasLcListener) {
    clearBtn.dataset.hasLcListener = 'true';
    clearBtn.addEventListener('click', clearLiveCrudSearch);
  }

  const refreshBtn = document.getElementById('liveCrudRefreshBtn');
  if (refreshBtn && !refreshBtn.dataset.hasLcListener) {
    refreshBtn.dataset.hasLcListener = 'true';
    refreshBtn.addEventListener('click', () => fetchLiveCrudRows());
  }

  const insertBtn = document.getElementById('liveCrudInsertBtn');
  if (insertBtn && !insertBtn.dataset.hasLcListener) {
    insertBtn.dataset.hasLcListener = 'true';
    insertBtn.addEventListener('click', () => openLiveCrudModal('create', null));
  }

  const closeBtn = document.getElementById('lcModalCloseBtn');
  if (closeBtn && !closeBtn.dataset.hasLcListener) {
    closeBtn.dataset.hasLcListener = 'true';
    closeBtn.addEventListener('click', closeLiveCrudModal);
  }
  const cancelBtn = document.getElementById('lcModalCancelBtn');
  if (cancelBtn && !cancelBtn.dataset.hasLcListener) {
    cancelBtn.dataset.hasLcListener = 'true';
    cancelBtn.addEventListener('click', closeLiveCrudModal);
  }

  const overlay = document.getElementById('liveCrudFormModal');
  if (overlay && !overlay.dataset.hasLcListener) {
    overlay.dataset.hasLcListener = 'true';
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeLiveCrudModal();
    });
  }

  const deleteOverlay = document.getElementById('liveCrudDeleteModal');
  if (deleteOverlay && !deleteOverlay.dataset.hasLcListener) {
    deleteOverlay.dataset.hasLcListener = 'true';
    deleteOverlay.addEventListener('click', e => {
      if (e.target === deleteOverlay) closeLiveCrudDeleteModal();
    });
  }
}

function updateLiveCrudStatusBadge(isLive, customLabel) {
  const statusBadge = document.getElementById('liveCrudStatusBadge') || document.querySelector('.db-toolbar-actions-row .db-live-badge');
  if (!statusBadge) return;
  if (isLive) {
    statusBadge.innerHTML = `<span class="live-pulse-dot"></span><span class="badge-text">${escapeHtml(customLabel || 'Supabase Live')}</span>`;
    statusBadge.className = 'lc-pill lc-pill-live';
    statusBadge.style.background = '';
    statusBadge.style.color = '';
    statusBadge.style.border = '';
  } else {
    statusBadge.innerHTML = `<iconify-icon icon="lucide:hard-drive"></iconify-icon><span class="badge-text">${escapeHtml(customLabel || 'Local Storage')}</span>`;
    statusBadge.className = 'lc-pill lc-pill-local';
    statusBadge.style.background = '';
    statusBadge.style.color = '';
    statusBadge.style.border = '';
  }
}

function updateLiveCrudTableBadge(tableKey) {
  const badge = document.getElementById('liveCrudTableBadge');
  const label = prettifyLiveCrudLabel(tableKey || liveCrudCurrentTable);
  if (badge) {
    badge.innerHTML = `<iconify-icon icon="lucide:database"></iconify-icon><span class="badge-text">${escapeHtml(label)}</span>`;
  }
  const headerStatBadge = document.getElementById('liveCrudHeaderStatBadge');
  if (headerStatBadge) {
    headerStatBadge.textContent = label;
  }
  const ddLabel = document.getElementById('liveCrudTableDropdownLabel');
  if (ddLabel) {
    ddLabel.textContent = label;
  }
}

function updateLiveCrudRowCountBadge(filteredCount, totalCount) {
  const countBadge = document.getElementById('liveCrudRowCountBadge');
  const text = (totalCount !== undefined && filteredCount !== totalCount)
    ? `${filteredCount} of ${totalCount} rows`
    : `${filteredCount} rows`;
  if (countBadge) {
    countBadge.innerHTML = `<iconify-icon icon="lucide:layers"></iconify-icon><span class="badge-text">${escapeHtml(text)}</span>`;
  }
  const headerRowCount = document.getElementById('liveCrudHeaderRowCount');
  if (headerRowCount) {
    headerRowCount.textContent = text;
  }
}

async function fetchLiveCrudRows() {
  const container = document.getElementById('liveCrudRowsContainer');
  const refreshBtn = document.getElementById('liveCrudRefreshBtn');
  if (refreshBtn) refreshBtn.classList.add('is-refreshing');

  updateLiveCrudTableBadge(liveCrudCurrentTable);
  const countBadge = document.getElementById('liveCrudRowCountBadge');
  if (countBadge) countBadge.innerHTML = '<iconify-icon icon="lucide:layers"></iconify-icon><span class="badge-text">…</span>';
  if (container) container.innerHTML = '<div class="lc-empty">⏳ Loading rows from Supabase…</div>';

  const finishFetch = () => {
    if (refreshBtn) refreshBtn.classList.remove('is-refreshing');
  };

  const tryLocalFallback = (isTableMissing = false) => {
    if (liveCrudCurrentTable === 'case_transfers') {
      let transfers = Array.isArray(allCaseTransfers) ? allCaseTransfers : [];
      if (transfers.length === 0) {
        try {
          const raw = localStorage.getItem('case_transfers_backup');
          if (raw) transfers = JSON.parse(raw);
        } catch (e) {}
      }
      liveCrudRows = (Array.isArray(transfers) ? transfers : []).map((t, idx) => ({
        id: t.id || `transfer_${idx + 1}`,
        case_number: t.case_number || t.caseNo || '',
        case_type: t.case_type || t.caseType || 'civil',
        case_title: t.case_title || t.caseName || '',
        from_court: t.from_court || t.fromCourt || '',
        to_court: t.to_court || t.toCourt || '',
        transfer_date: t.transfer_date || t.transferDate || '',
        order_number: t.order_number || t.orderNo || '',
        order_date: t.order_date || t.orderDate || '',
        transferred_by: t.transferred_by || t.authority || '',
        transfer_reason: t.transfer_reason || t.reason || '',
        doc_link: t.doc_link || t.docLink || '',
        remarks: t.remarks || '',
        created_at: t.created_at || new Date().toISOString()
      }));

      renderLiveCrudRows();
      updateLiveCrudStatusBadge(false, 'Local Storage');
      finishFetch();

      if (isTableMissing && container) {
        const noticeEl = document.createElement('div');
        noticeEl.className = 'lc-notice-banner';
        noticeEl.style.cssText = 'background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 10px 14px; margin-bottom: 12px; font-size: 13px; color: #1e40af; display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap;';
        noticeEl.innerHTML = `
          <div>
            <strong>ℹ️ Local Storage Mode:</strong> Table <code>case_transfers</code> is not yet created in Supabase. Showing ${liveCrudRows.length} transfers stored locally on this device.
          </div>
          <button type="button" class="secondary-btn" style="padding: 4px 10px; font-size: 11px; white-space: nowrap; cursor: pointer;" onclick="copyCaseTransfersSql()">📋 Copy Supabase SQL</button>
        `;
        container.insertBefore(noticeEl, container.firstChild);
      }
      return true;
    }
    const paisaTx = getLiveCrudPaisaTransactions();
    if (liveCrudCurrentTable === 'transactions' && paisaTx.length > 0) {
      liveCrudRows = paisaTx.map(t => ({
        id: t.id,
        type: t.type || 'spent',
        amount: t.amount || 0,
        client_payee: t.client_payee || '',
        category: t.category || '',
        mode: t.payment_mode || t.mode || 'Cash',
        case_no: t.case_no || '',
        txn_date: t.date || '',
        note: t.note || '',
        created_at: t.created_at || new Date().toISOString()
      }));
      renderLiveCrudRows();
      updateLiveCrudStatusBadge(false, 'Local Storage');
      finishFetch();
      return true;
    }
    const personalTx = getLiveCrudPersonalTransactions();
    if (liveCrudCurrentTable === 'personal_transactions' && personalTx.length > 0) {
      liveCrudRows = personalTx.map(t => ({
        id: t.id,
        type: t.type || 'personal_spent',
        amount: t.amount || 0,
        category: t.category || '',
        note: t.note || '',
        txn_date: t.date || '',
        created_at: t.created_at || new Date().toISOString()
      }));
      renderLiveCrudRows();
      updateLiveCrudStatusBadge(false, 'Local Storage');
      finishFetch();
      return true;
    }
    return false;
  };

  const sbClient = (typeof supabaseClient !== 'undefined') ? supabaseClient : (typeof window !== 'undefined' ? window.supabaseClient : null);
  const checkSupabase = typeof ensureSupabaseClient === 'function' ? ensureSupabaseClient : (typeof window !== 'undefined' && typeof window.ensureSupabaseClient === 'function' ? window.ensureSupabaseClient : null);

  if ((checkSupabase && !checkSupabase()) || (!checkSupabase && !sbClient)) {
    if (tryLocalFallback(false)) return;
    if (container) container.innerHTML = '<div class="lc-empty">⚠️ Supabase is not connected. Check your internet connection and refresh.</div>';
    finishFetch();
    return;
  }

  try {
    const { data, error } = await sbClient
      .from(liveCrudCurrentTable)
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200);

    if (error) throw error;

    if (data && data.length > 0) {
      liveCrudRows = data;
      renderLiveCrudRows();
      updateLiveCrudStatusBadge(true, 'Supabase Live');
      finishFetch();
      return;
    }

    // Supabase returned 0 rows: if case_transfers has local records, seed to newly created Supabase table!
    if (liveCrudCurrentTable === 'case_transfers') {
      let transfers = Array.isArray(allCaseTransfers) ? allCaseTransfers : [];
      if (transfers.length === 0) {
        try {
          const raw = localStorage.getItem('case_transfers_backup');
          if (raw) transfers = JSON.parse(raw);
        } catch (e) {}
      }
      if (Array.isArray(transfers) && transfers.length > 0) {
        try {
          const payload = transfers.map(t => ({
            case_number: t.case_number || t.caseNo || '',
            case_type: t.case_type || t.caseType || 'civil',
            case_title: t.case_title || t.caseName || '',
            from_court: t.from_court || t.fromCourt || '',
            to_court: t.to_court || t.toCourt || '',
            transfer_date: t.transfer_date || t.transferDate || (typeof getTodayDateString === 'function' ? getTodayDateString() : ''),
            order_number: t.order_number || t.orderNo || '',
            order_date: t.order_date || t.orderDate || null,
            transferred_by: t.transferred_by || t.authority || '',
            transfer_reason: t.transfer_reason || t.reason || '',
            doc_link: t.doc_link || t.docLink || '',
            remarks: t.remarks || ''
          }));
          const { data: seeded, error: seedErr } = await sbClient.from('case_transfers').insert(payload).select();
          if (!seedErr && Array.isArray(seeded) && seeded.length > 0) {
            allCaseTransfers = seeded;
            window.allCaseTransfers = allCaseTransfers;
            try { localStorage.setItem('case_transfers_backup', JSON.stringify(allCaseTransfers)); } catch (e) {}
            liveCrudRows = seeded;
            renderLiveCrudRows();
            updateLiveCrudStatusBadge(true, 'Supabase Live');
            finishFetch();
            if (typeof showToast === 'function') {
              showToast(`☁️ Uploaded ${seeded.length} transfers to Supabase!`, 4000);
            }
            return;
          }
        } catch (seedEx) {
          console.warn('Seeding case_transfers error:', seedEx);
        }
      }
    }

    if (tryLocalFallback(false)) {
      return;
    }
    liveCrudRows = [];
    renderLiveCrudRows();
    updateLiveCrudStatusBadge(true, 'Supabase Live');
    finishFetch();
  } catch (err) {
    console.warn('Live CRUD fetch error:', err);
    if (tryLocalFallback(true)) {
      return;
    }
    if (container) container.innerHTML = `<div class="lc-empty">⚠️ Failed to load "${escapeHtml(liveCrudCurrentTable)}": ${escapeHtml(err.message || 'Unknown error')}</div>`;
    finishFetch();
  }
}

// "case_name" -> "Case Name", "plaintiff" -> "Plaintiff", "next_hearing" -> "Next Hearing"
function prettifyLiveCrudLabel(key) {
  if (!key) return '';
  const known = {
    'civilcases': 'Civil Cases',
    'criminalcases': 'Criminal Cases',
    'personal_transactions': 'Personal Transactions',
    'case_transfers': 'Case Transfers',
    'proceedings': 'Proceedings',
    'hearings': 'Hearings',
    'transactions': 'Transactions'
  };
  if (known[String(key).toLowerCase()]) return known[String(key).toLowerCase()];
  return String(key)
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, ch => ch.toUpperCase());
}

// Pick the most human-meaningful fields to headline each row card
function getLiveCrudHeadlineFields(row) {
  const keys = Object.keys(row);
  const preferred = ['client_payee', 'case_number', 'court_name', 'task_title', 'case_name', 'hearing_date', 'transfer_date', 'helper_name', 'amount', 'note', 'type', 'name', 'title'];
  const headlineKey = preferred.find(p => keys.includes(p)) || keys.find(k => !['id', 'created_at'].includes(k)) || 'id';
  // Desktop cards show up to 7 secondary fields; the ones past the first 3 get
  // the .lc-extra class and are hidden on mobile by CSS
  const secondaryKeys = keys
    .filter(k => k !== headlineKey && !['id', 'created_at'].includes(k))
    .filter(k => {
      const v = row[k];
      return v !== null && v !== undefined && String(v).trim() !== '';
    })
    .slice(0, 7);
  return { headlineKey, secondaryKeys };
}

function getLiveCrudFilterIconSvg(iconKey) {
  const normalized = (iconKey || '').replace('lucide:', '').toLowerCase();
  switch (normalized) {
    case 'building-2':
      return `<svg class="lucide lucide-building-2" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>`;
    case 'landmark':
      return `<svg class="lucide lucide-landmark" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>`;
    case 'activity':
      return `<svg class="lucide lucide-activity" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.48 12H2"/></svg>`;
    case 'shield':
      return `<svg class="lucide lucide-shield" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.5 4.8 17 6 19 6a1 1 0 0 1 1 1z"/></svg>`;
    default:
      return `<svg class="lucide lucide-filter" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`;
  }
}

function toggleLiveCrudFilterCard(event) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }
  const card = document.getElementById('liveCrudFilterCard');
  const btn = document.getElementById('liveCrudFilterMenuBtn');
  if (!card) return;
  const isCurrentlyOpen = !card.classList.contains('hidden');
  if (isCurrentlyOpen) {
    closeLiveCrudFilterCard();
  } else {
    card.classList.remove('hidden');
    if (btn) {
      btn.setAttribute('aria-expanded', 'true');
      btn.classList.add('is-open');
    }
    setTimeout(() => {
      document.addEventListener('click', onLiveCrudFilterCardOutsideClick);
      document.addEventListener('keydown', onLiveCrudFilterCardKeydown);
    }, 10);
  }
}

function closeLiveCrudFilterCard() {
  const card = document.getElementById('liveCrudFilterCard');
  const btn = document.getElementById('liveCrudFilterMenuBtn');
  if (card) card.classList.add('hidden');
  if (btn) {
    btn.setAttribute('aria-expanded', 'false');
    btn.classList.remove('is-open');
  }
  document.removeEventListener('click', onLiveCrudFilterCardOutsideClick);
  document.removeEventListener('keydown', onLiveCrudFilterCardKeydown);
}

function onLiveCrudFilterCardOutsideClick(e) {
  const card = document.getElementById('liveCrudFilterCard');
  const btn = document.getElementById('liveCrudFilterMenuBtn');
  if (!card || card.classList.contains('hidden')) return;
  if (!card.contains(e.target) && !btn?.contains(e.target)) {
    closeLiveCrudFilterCard();
  }
}

function onLiveCrudFilterCardKeydown(e) {
  if (e.key === 'Escape') {
    closeLiveCrudFilterCard();
  }
}

function updateLiveCrudActiveFilterBadges() {
  const activeCount = Object.keys(liveCrudActiveFilters).filter(k => Boolean(liveCrudActiveFilters[k])).length;
  
  // 1. Menu button badge on searchbar
  const btnBadge = document.getElementById('liveCrudFilterActiveBadge');
  const filterBtn = document.getElementById('liveCrudFilterMenuBtn');
  if (btnBadge) {
    btnBadge.textContent = String(activeCount);
    btnBadge.classList.toggle('hidden', activeCount === 0);
  }
  if (filterBtn) {
    filterBtn.classList.toggle('has-active-filters', activeCount > 0);
  }

  // 2. Card header badge
  const headerBadge = document.getElementById('liveCrudFilterHeaderBadge');
  if (headerBadge) {
    headerBadge.textContent = activeCount === 1 ? '1 applied' : `${activeCount} applied`;
    headerBadge.classList.toggle('hidden', activeCount === 0);
  }

  // 3. Active tags mini-row below toolbar
  const tagsRow = document.getElementById('liveCrudActiveTagsRow');
  const tagsContainer = document.getElementById('liveCrudActiveTagsContainer');
  if (tagsRow && tagsContainer) {
    if (activeCount === 0) {
      tagsRow.classList.add('hidden');
      tagsContainer.innerHTML = '';
    } else {
      tagsRow.classList.remove('hidden');
      tagsContainer.innerHTML = Object.entries(liveCrudActiveFilters)
        .filter(([_, v]) => Boolean(v))
        .map(([k, v]) => `
          <span class="lc-active-tag">
            <span class="lc-tag-key">${escapeHtml(prettifyLiveCrudLabel(k))}:</span>
            <span class="lc-tag-val">${escapeHtml(v)}</span>
            <button type="button" class="lc-tag-remove" onclick="handleLiveCrudFilterChange('${escapeHtml(k)}', '')" title="Remove filter" aria-label="Remove filter">
              <svg class="lucide lucide-x" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </span>
        `).join('');
    }
  }
}

function renderLiveCrudDynamicFilterBar() {
  const rowEl = document.getElementById('liveCrudDynamicFiltersRow');
  if (!rowEl) return;

  const table = liveCrudCurrentTable;
  let schemas = LIVE_CRUD_FILTER_SCHEMAS[table];

  // If table has no predefined schema, auto-detect columns with <= 30 distinct values
  if (!schemas || schemas.length === 0) {
    schemas = [];
    if (liveCrudRows.length > 0) {
      const sample = liveCrudRows[0];
      Object.keys(sample).forEach(k => {
        if (['id', 'created_at', 'updated_at', 'note', 'description', 'remarks', 'remark', 'details'].includes(k)) return;
        const distinct = new Set(liveCrudRows.map(r => String(r[k] ?? '').trim()).filter(Boolean));
        if (distinct.size > 1 && distinct.size <= 30) {
          schemas.push({ key: k, label: prettifyLiveCrudLabel(k), icon: 'lucide:filter' });
        }
      });
      schemas = schemas.slice(0, 3);
    }
  }

  if (!schemas || schemas.length === 0) {
    rowEl.innerHTML = '<div class="lc-filter-empty-msg">No additional filters available for this table</div>';
    updateLiveCrudActiveFilterBadges();
    return;
  }

  const filtersHtml = schemas.map(s => {
    // Collect distinct values for this key from rows
    const distinctVals = Array.from(new Set(
      liveCrudRows.map(r => String(r[s.key] ?? '').trim()).filter(Boolean)
    )).sort();

    const currentVal = liveCrudActiveFilters[s.key] || '';
    const isActive = Boolean(currentVal);
    const iconSvg = getLiveCrudFilterIconSvg(s.icon);
    const currentDisplayLabel = currentVal ? currentVal : `All (${distinctVals.length})`;

    const optionsHtml = distinctVals.map(val =>
      `<option value="${escapeHtml(val)}"${val === currentVal ? ' selected' : ''}>${escapeHtml(val)}</option>`
    ).join('');

    return `
      <div class="lc-filter-form-group${isActive ? ' has-value' : ''}">
        <label for="lcFilter_${escapeHtml(s.key)}" class="lc-filter-field-label">
          <span class="lc-field-icon" aria-hidden="true">${iconSvg}</span>
          <span class="lc-field-title">${escapeHtml(s.label)}</span>
          ${isActive ? '<span class="lc-field-dot" title="Filter applied"></span>' : ''}
        </label>
        <div class="custom-dropdown lc-custom-dropdown lc-filter-field-dropdown" id="lcFilterDd_${escapeHtml(s.key)}">
          <button type="button" class="custom-dropdown-trigger lc-dropdown-trigger lc-filter-field-trigger${isActive ? ' is-active' : ''}" id="lcFilterTrigger_${escapeHtml(s.key)}" onclick="toggleLiveCrudFilterFieldDropdown('${escapeHtml(s.key)}', event)" aria-haspopup="listbox" aria-expanded="false" title="Filter by ${escapeHtml(s.label)}">
            <span class="lc-trigger-label" id="lcFilterTriggerLabel_${escapeHtml(s.key)}">${escapeHtml(currentDisplayLabel)}</span>
            <span class="lc-trigger-chevron" aria-hidden="true">
              <svg class="lucide lucide-chevron-down" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </span>
          </button>
          <div class="custom-dropdown-menu lc-dropdown-menu hidden" id="lcFilterMenu_${escapeHtml(s.key)}" role="listbox" onclick="event.stopPropagation()">
            <div class="lc-dd-items-list">
              <button type="button" class="custom-dropdown-item lc-dd-item${!currentVal ? ' selected' : ''}" onclick="selectLiveCrudFilterItem('${escapeHtml(s.key)}', '')">
                <span class="lc-dd-item-text">All (${distinctVals.length})</span>
                ${!currentVal ? '<svg class="lucide lucide-check lc-dd-check" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>' : ''}
              </button>
              ${distinctVals.map(val => `
                <button type="button" class="custom-dropdown-item lc-dd-item${val === currentVal ? ' selected' : ''}" onclick="selectLiveCrudFilterItem('${escapeHtml(s.key)}', '${escapeHtml(val)}')">
                  <span class="lc-dd-item-text">${escapeHtml(val)}</span>
                  ${val === currentVal ? '<svg class="lucide lucide-check lc-dd-check" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>' : ''}
                </button>
              `).join('')}
            </div>
          </div>
        </div>
        <!-- Preserved native select for full test parity and form compatibility -->
        <select id="lcFilter_${escapeHtml(s.key)}" class="form-select f-select lc-filter-field-select lc-visually-hidden" onchange="handleLiveCrudFilterChange('${escapeHtml(s.key)}', this.value)" tabindex="-1">
          <option value="">All (${distinctVals.length})</option>
          ${optionsHtml}
        </select>
      </div>
    `;
  }).join('');

  rowEl.innerHTML = filtersHtml;
  updateLiveCrudActiveFilterBadges();
}

function handleLiveCrudFilterChange(key, value) {
  liveCrudCurrentPage = 1;
  if (value) {
    liveCrudActiveFilters[key] = value;
  } else {
    delete liveCrudActiveFilters[key];
  }
  renderLiveCrudDynamicFilterBar();
  renderLiveCrudData();
}

function resetLiveCrudFilters() {
  liveCrudCurrentPage = 1;
  liveCrudActiveFilters = {};
  const searchInput = document.getElementById('liveCrudSearchInput');
  if (searchInput) searchInput.value = '';
  const clearBtn = document.getElementById('liveCrudSearchClearBtn');
  if (clearBtn) clearBtn.classList.add('hidden');

  renderLiveCrudDynamicFilterBar();
  renderLiveCrudData();
}

function getFilteredLiveCrudRows() {
  const searchInput = document.getElementById('liveCrudSearchInput');
  const q = (searchInput ? searchInput.value : '').trim().toLowerCase();
  const clearBtn = document.getElementById('liveCrudSearchClearBtn');
  if (clearBtn) clearBtn.classList.toggle('hidden', !q);

  let rows = liveCrudRows;

  // 1. Text search across all fields
  if (q) {
    rows = rows.filter(r => Object.values(r).some(v =>
      v !== null && v !== undefined && String(v).toLowerCase().includes(q)
    ));
  }

  // 2. Dynamic active filter dropdowns
  const filterKeys = Object.keys(liveCrudActiveFilters);
  if (filterKeys.length > 0) {
    rows = rows.filter(r => {
      return filterKeys.every(k => {
        const targetVal = String(liveCrudActiveFilters[k] || '').trim().toLowerCase();
        if (!targetVal) return true;
        const rowVal = String(r[k] ?? '').trim().toLowerCase();
        return rowVal === targetVal;
      });
    });
  }

  return rows;
}

function renderLiveCrudCards(rows) {
  const container = document.getElementById('liveCrudRowsContainer');
  if (!container) return;

  if (rows.length === 0) {
    container.innerHTML = `<div class="lc-empty">${liveCrudRows.length === 0
      ? `📭 No rows in "${escapeHtml(liveCrudCurrentTable)}" yet. Use ➕ Insert Row to add the first one.`
      : `🔍 No rows match your search/filter criteria.`}</div>`;
    return;
  }

  container.innerHTML = rows.map((row, idx) => {
    const { headlineKey } = getLiveCrudHeadlineFields(row);
    const headline = String(row[headlineKey] ?? '—');

    // Extract clean primary title, parties name, and court/subtitle
    let caseNo = headline;
    let partiesName = '';
    let courtName = row.court_name || row.court || '';

    if (liveCrudCurrentTable === 'hearings' && row.case_number) {
      caseNo = String(row.case_number);
      const records = getLiveCrudAllCaseRecords();
      const matchedCase = records.find(c =>
        (c.caseNo || '').toLowerCase() === String(row.case_number).toLowerCase() ||
        (c.criminalCaseNumber || '').toLowerCase() === String(row.case_number).toLowerCase()
      );
      partiesName = matchedCase?.caseName ||
        (matchedCase?.plaintiff ? `${matchedCase.plaintiff} vs ${matchedCase.defendant}` : '') ||
        (matchedCase?.victimName ? `${matchedCase.victimName} vs ${matchedCase.accusedName}` : '');
      if (!courtName && (row.court || matchedCase?.court)) courtName = row.court || matchedCase.court;
    } else if (liveCrudCurrentTable === 'case_transfers') {
      caseNo = String(row.case_number || headline);
      partiesName = row.case_title || '';
      courtName = (row.from_court || row.to_court) ? `${row.from_court || 'Court'} ➜ ${row.to_court || 'Court'}` : '';
    } else if (row.plaintiff && row.defendant) {
      partiesName = `${row.plaintiff} vs ${row.defendant}`;
    } else if (row.case_name && row.case_name !== headline) {
      partiesName = row.case_name;
    }

    // Pill badge on the right (Stage / Case Type / Amount)
    let badgeText = '';
    let badgeClass = 'pill-stage';
    if (row.hearing_process || row.stage) {
      badgeText = String(row.hearing_process || row.stage);
    } else if (row.case_type) {
      badgeText = String(row.case_type);
      badgeClass = 'pill-type';
    } else if (row.amount !== undefined && row.amount !== null && String(row.amount).trim() !== '') {
      const num = Number(row.amount);
      badgeText = !isNaN(num) ? `₹ ${num.toLocaleString('en-IN')}` : `₹ ${row.amount}`;
      badgeClass = 'pill-amount';
    }

    const rowId = String(row.id ?? '');
    const cardId = `lc_card_${idx}`;

    const actionButtonsHtml = (extraClass = '') => `
      <button type="button" class="lc-action-icon-btn lc-edit-btn ${extraClass}" onclick="openLiveCrudModal('edit', ${rowId ? `'${escapeHtml(rowId)}'` : 'null'})" title="Edit row #${idx + 1}" aria-label="Edit row #${idx + 1}">
        <svg class="lucide lucide-pencil" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
      </button>
      <button type="button" class="lc-action-icon-btn lc-delete-btn ${extraClass}" onclick="deleteLiveCrudRow('${escapeHtml(rowId)}', '${escapeHtml(caseNo.replace(/'/g, ''))}')" title="Delete row #${idx + 1}" aria-label="Delete row #${idx + 1}">
        <svg class="lucide lucide-trash-2" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
      </button>
    `;

    return `
      <div class="lc-row-card lc-stream-card" id="${cardId}" data-row-id="${escapeHtml(rowId)}">
        <!-- Header Strip: Tinted on Mobile with Quick Actions; Clean in-line start on Desktop -->
        <div class="lc-card-header-strip">
          <div class="lc-card-id-wrap">
            <span class="lc-stream-idx">#${String(idx + 1).padStart(2, '0')}</span>
            <span class="lc-stream-caseno" title="${escapeHtml(caseNo)}">${escapeHtml(caseNo)}</span>
          </div>
          <!-- Mobile actions in header -->
          <div class="lc-card-actions-wrap">
            ${actionButtonsHtml('lc-mobile-btn')}
          </div>
        </div>

        <!-- Body Wrap: Flowing in-line on Desktop, Structured Body & Footer on Mobile -->
        <div class="lc-card-body-wrap">
          ${partiesName ? `<div class="lc-stream-casename" title="${escapeHtml(partiesName)}">${escapeHtml(partiesName)}</div>` : ''}
          <div class="lc-card-meta-wrap">
            ${(partiesName && courtName) ? `<span class="lc-stream-divider">|</span>` : ''}
            ${courtName ? `<span class="lc-stream-court" title="${escapeHtml(courtName)}">${escapeHtml(courtName)}</span>` : ''}
            ${badgeText ? `
              <span class="lc-stream-pill ${badgeClass}">
                ${badgeClass === 'pill-stage' ? '<svg class="lucide lucide-layers" xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.9a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>' : ''}
                <span>${escapeHtml(badgeText)}</span>
              </span>
            ` : ''}
          </div>
        </div>

        <!-- Desktop actions at the far right -->
        <div class="lc-desktop-actions-wrap">
          ${actionButtonsHtml('lc-desktop-btn')}
        </div>
      </div>
    `;
  }).join('');
}

function toggleLiveCrudCardDrawer(cardId) {
  const drawer = document.getElementById(`${cardId}_drawer`);
  const card = document.getElementById(cardId);
  if (!drawer) return;
  const isHidden = drawer.style.display === 'none';
  drawer.style.display = isHidden ? 'grid' : 'none';
  if (card) {
    const chevron = card.querySelector('.lc-chevron-icon');
    if (chevron) {
      chevron.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
      chevron.style.transition = 'transform 0.2s ease';
    }
  }
}
if (typeof toggleLiveCrudCardDrawer !== 'undefined') window.toggleLiveCrudCardDrawer = toggleLiveCrudCardDrawer;

function handleLiveCrudPageSizeChange(val) {
  if (val === 'all') {
    liveCrudPageSize = Infinity;
  } else {
    liveCrudPageSize = parseInt(val, 10) || 25;
  }
  const label = document.getElementById('liveCrudPageSizeLabel');
  if (label) label.textContent = val === 'all' ? 'All' : String(liveCrudPageSize);
  const select = document.getElementById('liveCrudPageSizeSelect');
  if (select && select.value !== String(val)) select.value = val;

  const menu = document.getElementById('liveCrudPageSizeMenu');
  if (menu) {
    menu.querySelectorAll('.lc-dd-item').forEach(btn => {
      btn.classList.toggle('selected', btn.textContent.trim().toLowerCase() === String(val).toLowerCase());
    });
  }

  liveCrudCurrentPage = 1;
  renderLiveCrudData();
}
if (typeof handleLiveCrudPageSizeChange !== 'undefined') window.handleLiveCrudPageSizeChange = handleLiveCrudPageSizeChange;

function setLiveCrudPage(pageNum) {
  liveCrudCurrentPage = Math.max(1, parseInt(pageNum, 10) || 1);
  renderLiveCrudData();
  const tblContainer = document.getElementById('liveCrudTableViewContainer');
  if (tblContainer && typeof tblContainer.scrollIntoView === 'function') {
    tblContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}
if (typeof setLiveCrudPage !== 'undefined') window.setLiveCrudPage = setLiveCrudPage;
if (typeof toggleLiveCrudFilterCard !== 'undefined') window.toggleLiveCrudFilterCard = toggleLiveCrudFilterCard;
if (typeof closeLiveCrudFilterCard !== 'undefined') window.closeLiveCrudFilterCard = closeLiveCrudFilterCard;
if (typeof updateLiveCrudActiveFilterBadges !== 'undefined') window.updateLiveCrudActiveFilterBadges = updateLiveCrudActiveFilterBadges;

function renderLiveCrudPagination(totalFiltered) {
  const infoEl = document.getElementById('liveCrudPaginationInfo');
  const controlsEl = document.getElementById('liveCrudPaginationControls');
  const countBadge = document.getElementById('liveCrudTableCountBadge');
  if (!infoEl || !controlsEl) return;

  if (totalFiltered === 0) {
    infoEl.textContent = 'Showing 0 to 0 of 0 entries';
    if (countBadge) countBadge.textContent = 'Showing 0 of 0 rows';
    controlsEl.innerHTML = '';
    return;
  }

  const pageSize = liveCrudPageSize;
  const totalPages = pageSize === Infinity ? 1 : Math.max(1, Math.ceil(totalFiltered / pageSize));

  if (liveCrudCurrentPage > totalPages) liveCrudCurrentPage = totalPages;
  if (liveCrudCurrentPage < 1) liveCrudCurrentPage = 1;

  const start = pageSize === Infinity ? 0 : (liveCrudCurrentPage - 1) * pageSize;
  const end = pageSize === Infinity ? totalFiltered : Math.min(start + pageSize, totalFiltered);

  infoEl.textContent = `Showing ${start + 1} to ${end} of ${totalFiltered} entries`;
  if (countBadge) {
    countBadge.textContent = `Showing ${end - start} of ${totalFiltered} rows`;
  }

  if (pageSize === Infinity || totalPages <= 1) {
    controlsEl.innerHTML = `
      <button type="button" class="pagination-btn" disabled><iconify-icon icon="lucide:chevron-left"></iconify-icon> Prev</button>
      <button type="button" class="pagination-btn active">1</button>
      <button type="button" class="pagination-btn" disabled>Next <iconify-icon icon="lucide:chevron-right"></iconify-icon></button>
    `;
    return;
  }

  let btnsHtml = '';

  // Prev button
  btnsHtml += `<button type="button" class="pagination-btn" onclick="setLiveCrudPage(${liveCrudCurrentPage - 1})" ${liveCrudCurrentPage === 1 ? 'disabled' : ''} title="Previous Page">
    <iconify-icon icon="lucide:chevron-left"></iconify-icon> Prev
  </button>`;

  // Page numbers with ellipsis
  let pages = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (liveCrudCurrentPage > 3) pages.push('...');
    const pStart = Math.max(2, liveCrudCurrentPage - 1);
    const pEnd = Math.min(totalPages - 1, liveCrudCurrentPage + 1);
    for (let i = pStart; i <= pEnd; i++) pages.push(i);
    if (liveCrudCurrentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
  }

  pages.forEach(p => {
    if (p === '...') {
      btnsHtml += `<span class="pagination-ellipsis" style="padding: 0 4px; color: #94a3b8; font-size: 0.8rem;">…</span>`;
    } else {
      btnsHtml += `<button type="button" class="pagination-btn ${p === liveCrudCurrentPage ? 'active' : ''}" onclick="setLiveCrudPage(${p})">${p}</button>`;
    }
  });

  // Next button
  btnsHtml += `<button type="button" class="pagination-btn" onclick="setLiveCrudPage(${liveCrudCurrentPage + 1})" ${liveCrudCurrentPage === totalPages ? 'disabled' : ''} title="Next Page">
    Next <iconify-icon icon="lucide:chevron-right"></iconify-icon>
  </button>`;

  controlsEl.innerHTML = btnsHtml;
}

function renderLiveCrudTable(rows) {
  const tableHead = document.getElementById('liveCrudTableHead');
  const tableBody = document.getElementById('liveCrudTableBody');
  if (!tableHead || !tableBody) return;

  const totalFiltered = rows.length;
  renderLiveCrudPagination(totalFiltered);

  if (totalFiltered === 0) {
    tableHead.innerHTML = '';
    tableBody.innerHTML = `<tr><td colspan="10" style="text-align: center; padding: 32px 16px; color: #94a3b8;"><div class="lc-empty">${liveCrudRows.length === 0 ? `📭 No rows in "${escapeHtml(liveCrudCurrentTable)}" yet.` : '🔍 No rows match your filter criteria.'}</div></td></tr>`;
    return;
  }

  const pageSize = liveCrudPageSize;
  const startIdx = pageSize === Infinity ? 0 : (liveCrudCurrentPage - 1) * pageSize;
  const endIdx = pageSize === Infinity ? totalFiltered : Math.min(startIdx + pageSize, totalFiltered);
  const pageRows = rows.slice(startIdx, endIdx);

  // Determine top readable columns for clean table display (strictly exclude UUID, timestamps, and plaintiff; keep same column count)
  const sample = rows[0];
  const allKeys = Object.keys(sample);
  const excludedCols = ['id', 'created_at', 'updated_at', 'plaintiff'];
  const preferredCols = allKeys
    .filter(k => !excludedCols.includes(String(k).toLowerCase()))
    .slice(0, 6);
  const displayCols = preferredCols;

  // Render <thead> matching Cases Register .data-table
  tableHead.innerHTML = `
    <tr>
      <th>#</th>
      ${displayCols.map(c => `<th>${escapeHtml(prettifyLiveCrudLabel(c).toUpperCase())}</th>`).join('')}
      <th class="actions-col" style="text-align: center; width: 100px;">ACTIONS</th>
    </tr>
  `;

  // Render <tbody> matching Cases Register .data-table
  tableBody.innerHTML = pageRows.map((row, idx) => {
    const rowId = String(row.id ?? '');
    const headline = String(row[preferredCols[0] || 'id'] ?? 'Row #' + (startIdx + idx + 1));
    return `
      <tr>
        <td>${startIdx + idx + 1}</td>
        ${displayCols.map(col => {
          const val = row[col];
          const strVal = val === null || val === undefined ? '—' : String(val);
          return `<td title="${escapeHtml(strVal)}">${escapeHtml(strVal.slice(0, 80))}</td>`;
        }).join('')}
        <td class="actions-cell" style="text-align: center; white-space: nowrap;">
          <div class="row-actions" style="display: inline-flex; gap: 4px;">
            <button type="button" class="ra-btn edit" onclick="openLiveCrudModal('edit', '${escapeHtml(rowId)}')" title="Edit row">
              <iconify-icon icon="lucide:pencil"></iconify-icon>
            </button>
            <button type="button" class="ra-btn delete" onclick="deleteLiveCrudRow('${escapeHtml(rowId)}', '${escapeHtml(headline.replace(/'/g, ''))}')" title="Delete row">
              <iconify-icon icon="lucide:trash-2"></iconify-icon>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function renderLiveCrudData() {
  const filteredRows = getFilteredLiveCrudRows();
  updateLiveCrudRowCountBadge(filteredRows.length, liveCrudRows.length);

  if (currentLiveCrudViewMode === 'table') {
    renderLiveCrudTable(filteredRows);
  } else {
    renderLiveCrudCards(filteredRows);
  }
}

function renderLiveCrudRows() {
  renderLiveCrudDynamicFilterBar();
  renderLiveCrudData();
}

// Columns auto-generated from a real row; read-only/db-managed ones are skipped
function getLiveCrudEditableColumns(sampleRow) {
  if (!sampleRow) return [];
  return Object.keys(sampleRow).filter(k => !['id', 'created_at'].includes(k));
}

let liveCrudModalInitialData = {};

function clearLiveCrudField(key) {
  const input = document.getElementById(`lcField_${key}`);
  if (input) {
    input.value = '';
    input.title = '';
    input.focus();
  }
}

function clearLiveCrudModalFields() {
  document.querySelectorAll('#lcDynamicFieldsGrid :is(input, textarea)[data-lc-column]').forEach(input => {
    input.value = '';
    input.title = '';
  });
}

function resetLiveCrudModalFields() {
  const isEdit = document.getElementById('lcRecordAction')?.value === 'edit';
  document.querySelectorAll('#lcDynamicFieldsGrid :is(input, textarea)[data-lc-column]').forEach(input => {
    const col = input.getAttribute('data-lc-column');
    if (isEdit && liveCrudModalInitialData && liveCrudModalInitialData[col] !== undefined) {
      const orig = liveCrudModalInitialData[col];
      const val = orig === null || orig === undefined ? '' : String(orig);
      input.value = val;
      input.title = val;
    } else {
      input.value = '';
      input.title = '';
    }
  });
}

function filterLiveCrudModalFields(query) {
  const q = (query || '').toLowerCase().trim();
  const grid = document.getElementById('lcDynamicFieldsGrid');
  if (!grid) return;
  const clearBtn = document.getElementById('lcFormFieldSearchClear');
  if (clearBtn) clearBtn.classList.toggle('hidden', !q);
  const items = grid.querySelectorAll('.lc-form-group');
  let count = 0;
  items.forEach(el => {
    const col = (el.getAttribute('data-field-col') || '').toLowerCase();
    const label = (el.querySelector('label')?.textContent || '').toLowerCase();
    const match = !q || col.includes(q) || label.includes(q);
    el.style.display = match ? '' : 'none';
    if (match) count++;
  });
  const countEl = document.getElementById('lcModalFieldCount');
  if (countEl) countEl.textContent = `${count} field${count === 1 ? '' : 's'}`;
}

function clearLiveCrudModalFieldSearch() {
  const searchInput = document.getElementById('lcFormFieldSearch');
  if (searchInput) {
    searchInput.value = '';
    filterLiveCrudModalFields('');
    searchInput.focus();
  }
}

function buildLiveCrudFieldHtml(key, value) {
  const strVal = (value === null || value === undefined) ? '' : String(value);
  const isDate = /(^|_)(date|_at)$/.test(key) || /^\d{4}-\d{2}-\d{2}/.test(strVal);
  const isNumber = typeof value === 'number' || (/^\d+(\.\d+)?$/.test(strVal) && strVal !== '');
  const inputType = isDate && /^\d{4}-\d{2}-\d{2}/.test(strVal) ? 'date'
    : (isDate && /_date$/.test(key) ? 'date' : (isNumber ? 'number' : 'text'));

  let valAttr = '';
  if (inputType === 'date') {
    const m = strVal.match(/^(\d{4}-\d{2}-\d{2})/);
    valAttr = m ? ` value="${m[1]}"` : '';
  } else if (inputType === 'number') {
    valAttr = ` value="${escapeHtml(strVal)}"`;
  } else {
    valAttr = ` value="${escapeHtml(strVal)}"`;
  }

  // Remarks, notes, address, reason, doc links and long descriptions span both columns
  const isWide = /note|notes|remarks|reason|transfer_reason|desc|description|summary|doc_link|url|link|address/i.test(key) || strVal.length > 55;
  // Multi-line fields render as auto-expanding textarea
  const isTextarea = /note|notes|remarks|reason|transfer_reason|desc|description|summary|address|order_details|proceedings/i.test(key) || strVal.includes('\n') || strVal.length > 80;
  const labelText = prettifyLiveCrudLabel(key);

  const controlHtml = isTextarea
    ? `<textarea
        id="lcField_${escapeHtml(key)}"
        data-lc-column="${escapeHtml(key)}"
        class="lc-field-input lc-field-textarea"
        placeholder="${escapeHtml(labelText)}"
        title="${escapeHtml(strVal)}"
        rows="2"
        oninput="this.title = this.value"
      >${escapeHtml(strVal)}</textarea>`
    : `<input
        type="${inputType}"
        id="lcField_${escapeHtml(key)}"
        data-lc-column="${escapeHtml(key)}"
        class="lc-field-input"
        ${valAttr}
        placeholder="${escapeHtml(labelText)}"
        title="${escapeHtml(strVal)}"
        oninput="this.title = this.value"
        autocomplete="off"
      >`;

  return `
    <div class="form-group modifier-form-group lc-form-group ${isWide ? 'lc-field-span-2' : ''}" data-field-col="${escapeHtml(key)}">
      <label for="lcField_${escapeHtml(key)}" class="db-toolbar-label lc-field-label">${escapeHtml(labelText)}</label>
      ${controlHtml}
    </div>
  `;
}

function openLiveCrudModal(action, rowId) {
  const overlay = document.getElementById('liveCrudFormModal');
  const titleEl = document.getElementById('lcModalTitle');
  const subtitleEl = document.getElementById('lcModalSubtitle');
  const iconEl = document.getElementById('lcModalIcon');
  const grid = document.getElementById('lcDynamicFieldsGrid');
  const idInput = document.getElementById('lcRecordId');
  const actionInput = document.getElementById('lcRecordAction');
  const statusMsg = document.getElementById('lcModalStatusMsg');
  const statusBanner = document.getElementById('lcModalStatusBanner');
  const actionBadge = document.getElementById('lcModalActionBadge');
  const tableBadge = document.getElementById('lcModalTableBadge');
  const fieldCountEl = document.getElementById('lcModalFieldCount');
  const searchInput = document.getElementById('lcFormFieldSearch');
  const searchClear = document.getElementById('lcFormFieldSearchClear');
  if (!overlay || !grid) return;

  const sampleFallback = liveCrudCurrentTable === 'transactions'
    ? { type: 'spent', amount: 0, client_payee: '', category: 'other', mode: 'Cash', note: '', txn_date: (typeof getTodayDateString === 'function' ? getTodayDateString() : '') }
    : (liveCrudCurrentTable === 'personal_transactions'
      ? { type: 'personal_spent', amount: 0, category: 'other', note: '', txn_date: (typeof getTodayDateString === 'function' ? getTodayDateString() : '') }
      : (liveCrudCurrentTable === 'case_transfers'
        ? { case_number: '', case_type: 'civil', case_title: '', from_court: '', to_court: '', transfer_date: (typeof getTodayDateString === 'function' ? getTodayDateString() : ''), order_number: '', transferred_by: '', transfer_reason: '', doc_link: '', remarks: '' }
        : null));

  const isEdit = action === 'edit';
  const row = isEdit
    ? liveCrudRows.find(r => String(r.id) === String(rowId))
    : (liveCrudRows[0] || sampleFallback);

  if (!isEdit && !row) {
    alert(`The "${liveCrudCurrentTable}" table is empty, so its column layout is unknown.\n\nAdd the first row via the full "Supabase DB Manager" tab, then Insert will work here too.`);
    return;
  }
  if (isEdit && !row) {
    alert('Could not find that row. Please refresh and try again.');
    return;
  }

  // Save initial row data for revert action
  liveCrudModalInitialData = isEdit && row ? { ...row } : {};

  const columns = getLiveCrudEditableColumns(row);
  grid.innerHTML = columns.map(k => buildLiveCrudFieldHtml(k, isEdit ? row[k] : null)).join('');

  const tableSelect = document.getElementById('liveCrudTableSelect');
  const selectedOption = tableSelect ? tableSelect.querySelector(`option[value="${liveCrudCurrentTable}"]`) : null;
  const tableLabel = selectedOption ? selectedOption.textContent.trim() : prettifyLiveCrudLabel(liveCrudCurrentTable);

  if (titleEl) {
    titleEl.textContent = isEdit ? `Edit Row — ${tableLabel}` : `Insert Row — ${tableLabel}`;
  }
  if (subtitleEl) {
    subtitleEl.textContent = isEdit
      ? 'Modify field values and save. Empty fields remain unchanged in Supabase.'
      : 'Specify initial values for the new record. Empty fields are skipped.';
  }
  if (iconEl) {
    iconEl.innerHTML = isEdit
      ? `<svg class="lucide lucide-file-edit" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5"/><polyline points="14 2 14 8 20 8"/><path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l1-3.95 5.42-5.44Z"/></svg>`
      : `<svg class="lucide lucide-plus-circle" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>`;
  }
  if (actionBadge) {
    actionBadge.textContent = isEdit ? 'Edit Mode' : 'New Row';
    actionBadge.className = `lc-modal-badge ${isEdit ? 'lc-badge-edit' : 'lc-badge-insert'}`;
  }
  if (tableBadge) {
    tableBadge.textContent = tableLabel;
  }
  if (fieldCountEl) {
    fieldCountEl.textContent = `${columns.length} fields`;
  }
  if (searchInput) searchInput.value = '';
  if (searchClear) searchClear.classList.add('hidden');

  if (idInput) idInput.value = isEdit ? String(row.id) : '';
  if (actionInput) actionInput.value = action;
  if (statusMsg) { statusMsg.textContent = ''; statusMsg.className = 'update-status-msg lc-status-text'; }
  if (statusBanner) statusBanner.classList.add('hidden');

  const submitBtn = document.getElementById('lcModalSubmitBtn');
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<svg class="lucide lucide-check" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> <span>Save to Database</span>`;
  }

  overlay.classList.remove('hidden');
}

function closeLiveCrudModal() {
  const overlay = document.getElementById('liveCrudFormModal');
  if (overlay) overlay.classList.add('hidden');
}

async function handleLiveCrudFormSubmit(event) {
  if (event && event.preventDefault) event.preventDefault();
  const actionInput = document.getElementById('lcRecordAction');
  const idInput = document.getElementById('lcRecordId');
  const statusMsg = document.getElementById('lcModalStatusMsg');
  const statusBanner = document.getElementById('lcModalStatusBanner');
  const statusIcon = document.getElementById('lcModalStatusIcon');
  const submitBtn = document.getElementById('lcModalSubmitBtn');
  const action = actionInput ? actionInput.value : 'edit';
  const rowId = idInput ? idInput.value : '';

  // Collect filled fields only — empty means "leave unchanged" (edit) / "skip" (insert)
  const payload = {};
  document.querySelectorAll('#lcDynamicFieldsGrid :is(input, textarea)[data-lc-column]').forEach(input => {
    const col = input.getAttribute('data-lc-column');
    const raw = (input.value || '').trim();
    if (raw === '') return;
    payload[col] = input.type === 'number' ? (raw === '' ? null : Number(raw)) : raw;
  });

  if (Object.keys(payload).length === 0) {
    if (statusBanner) statusBanner.classList.remove('hidden');
    if (statusIcon) {
      statusIcon.innerHTML = `<svg class="lucide lucide-alert-triangle" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>`;
    }
    if (statusMsg) {
      statusMsg.textContent = 'Please fill at least one field before saving.';
      statusMsg.className = 'update-status-msg lc-status-text error';
    }
    return false;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<svg class="lucide lucide-loader-2 lc-spin" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> <span>Saving…</span>`;
  }
  if (statusBanner) statusBanner.classList.add('hidden');
  if (statusMsg) { statusMsg.textContent = ''; statusMsg.className = 'update-status-msg lc-status-text'; }

  // Sync to local memory & storage for transactions & personal_transactions & case_transfers
  if (liveCrudCurrentTable === 'transactions') {
    const pList = (typeof allPaisaTransactions !== 'undefined' && Array.isArray(allPaisaTransactions))
      ? allPaisaTransactions
      : (typeof window !== 'undefined' && Array.isArray(window.allPaisaTransactions) ? window.allPaisaTransactions : []);
    if (action === 'edit') {
      const idx = pList.findIndex(t => String(t.id) === String(rowId));
      if (idx !== -1) {
        if (payload.amount !== undefined) pList[idx].amount = Number(payload.amount);
        if (payload.type !== undefined) pList[idx].type = payload.type;
        if (payload.client_payee !== undefined) pList[idx].client_payee = payload.client_payee;
        if (payload.category !== undefined) pList[idx].category = payload.category;
        if (payload.mode !== undefined) pList[idx].payment_mode = payload.mode;
        if (payload.note !== undefined) pList[idx].note = payload.note;
        if (payload.txn_date !== undefined) pList[idx].date = payload.txn_date;
      }
    } else {
      const newTx = {
        id: 'tx_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        type: payload.type || 'spent',
        amount: Number(payload.amount) || 0,
        client_payee: payload.client_payee || '',
        category: payload.category || '',
        payment_mode: payload.mode || 'Cash',
        date: payload.txn_date || (typeof getTodayDateString === 'function' ? getTodayDateString() : ''),
        note: payload.note || '',
        created_at: new Date().toISOString()
      };
      pList.unshift(newTx);
    }
    if (typeof window !== 'undefined') window.allPaisaTransactions = pList;
    if (typeof savePaisaTransactions === 'function') savePaisaTransactions(true);
    else if (typeof window !== 'undefined' && typeof window.savePaisaTransactions === 'function') window.savePaisaTransactions(true);
  } else if (liveCrudCurrentTable === 'personal_transactions') {
    const ptList = (typeof allPersonalTransactions !== 'undefined' && Array.isArray(allPersonalTransactions))
      ? allPersonalTransactions
      : (typeof window !== 'undefined' && Array.isArray(window.allPersonalTransactions) ? window.allPersonalTransactions : []);
    if (action === 'edit') {
      const idx = ptList.findIndex(t => String(t.id) === String(rowId));
      if (idx !== -1) {
        if (payload.amount !== undefined) ptList[idx].amount = Number(payload.amount);
        if (payload.type !== undefined) ptList[idx].type = payload.type;
        if (payload.category !== undefined) ptList[idx].category = payload.category;
        if (payload.note !== undefined) ptList[idx].note = payload.note;
        if (payload.txn_date !== undefined) ptList[idx].date = payload.txn_date;
      }
    } else {
      const newPTx = {
        id: 'ptx_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        type: payload.type || 'personal_spent',
        amount: Number(payload.amount) || 0,
        category: payload.category || '',
        note: payload.note || '',
        date: payload.txn_date || (typeof getTodayDateString === 'function' ? getTodayDateString() : ''),
        created_at: new Date().toISOString()
      };
      ptList.unshift(newPTx);
    }
    if (typeof window !== 'undefined') window.allPersonalTransactions = ptList;
    if (typeof savePersonalData === 'function') savePersonalData(true);
    else if (typeof window !== 'undefined' && typeof window.savePersonalData === 'function') window.savePersonalData(true);
  } else if (liveCrudCurrentTable === 'case_transfers') {
    if (action === 'edit') {
      const idx = allCaseTransfers.findIndex(t => String(t.id) === String(rowId));
      if (idx !== -1) {
        Object.assign(allCaseTransfers[idx], payload);
        allCaseTransfers[idx].updated_at = new Date().toISOString();
      }
    } else {
      const newTransfer = {
        id: 'transfer_' + Date.now(),
        case_number: payload.case_number || '',
        case_type: payload.case_type || 'civil',
        case_title: payload.case_title || '',
        from_court: payload.from_court || '',
        to_court: payload.to_court || '',
        transfer_date: payload.transfer_date || (typeof getTodayDateString === 'function' ? getTodayDateString() : ''),
        order_number: payload.order_number || '',
        order_date: payload.order_date || null,
        transferred_by: payload.transferred_by || '',
        transfer_reason: payload.transfer_reason || '',
        doc_link: payload.doc_link || '',
        remarks: payload.remarks || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      allCaseTransfers.unshift(newTransfer);
    }
    try {
      localStorage.setItem('case_transfers_backup', JSON.stringify(allCaseTransfers));
    } catch (e) {}
    window.allCaseTransfers = allCaseTransfers;
    if (typeof renderRecentTransfersTable === 'function') renderRecentTransfersTable();
    if (typeof updateTransfersCountBadge === 'function') updateTransfersCountBadge();
  }

  const sb = (typeof supabaseClient !== 'undefined') ? supabaseClient : (typeof window !== 'undefined' ? window.supabaseClient : null);
  try {
    let error = null;
    if (sb) {
      if (action === 'edit') {
        ({ error } = await sb.from(liveCrudCurrentTable).update(payload).eq('id', rowId));
      } else {
        ({ error } = await sb.from(liveCrudCurrentTable).insert([payload]));
      }
      if (error) throw error;
    }

    closeLiveCrudModal();
    await fetchLiveCrudRows();
    if (typeof performPostCrudRefresh === 'function') {
      await performPostCrudRefresh({ toast: `💾 ${action === 'edit' ? 'Row updated' : 'Row inserted'} in ${liveCrudCurrentTable}` });
    } else if (typeof window !== 'undefined' && typeof window.performPostCrudRefresh === 'function') {
      await window.performPostCrudRefresh({ toast: `💾 ${action === 'edit' ? 'Row updated' : 'Row inserted'} in ${liveCrudCurrentTable}` });
    }
  } catch (err) {
    console.error('Live CRUD save error:', err);
    if (liveCrudCurrentTable === 'transactions' || liveCrudCurrentTable === 'personal_transactions' || liveCrudCurrentTable === 'case_transfers') {
      closeLiveCrudModal();
      await fetchLiveCrudRows();
      if (typeof performPostCrudRefresh === 'function') {
        await performPostCrudRefresh({ toast: `💾 Saved locally (Supabase table pending or RLS active)` });
      } else if (typeof window !== 'undefined' && typeof window.performPostCrudRefresh === 'function') {
        await window.performPostCrudRefresh({ toast: `💾 Saved locally (Supabase table pending or RLS active)` });
      }
      return false;
    }
    if (statusBanner) statusBanner.classList.remove('hidden');
    if (statusIcon) {
      statusIcon.innerHTML = `<svg class="lucide lucide-alert-circle" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`;
    }
    if (statusMsg) {
      statusMsg.textContent = 'Save failed: ' + (err.message || 'Unknown error');
      statusMsg.className = 'update-status-msg lc-status-text error';
    }
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<svg class="lucide lucide-check" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> <span>Save to Database</span>`;
    }
  }
  return false;
}

let pendingLiveCrudDelete = null;

function openLiveCrudDeleteModal(rowId, headline) {
  if (!rowId) return;
  pendingLiveCrudDelete = { rowId, headline };
  const modal = document.getElementById('liveCrudDeleteModal');
  const tableEl = document.getElementById('lcDeleteModalTable');
  const headlineEl = document.getElementById('lcDeleteModalHeadline');
  const errEl = document.getElementById('lcDeleteModalError');
  const confirmBtn = document.getElementById('lcDeleteConfirmBtn');
  const btnText = document.getElementById('lcDeleteBtnText');

  const selectedOption = document.querySelector(`#liveCrudTableSelect option[value="${liveCrudCurrentTable}"]`) ||
    document.querySelector(`.lc-custom-popover-item[data-value="${liveCrudCurrentTable}"]`);
  const friendlyTableName = selectedOption ? selectedOption.textContent.trim().replace(/\s*\(\d+\)$/, '') : prettifyLiveCrudLabel(liveCrudCurrentTable || 'Current Table');

  if (tableEl) tableEl.textContent = friendlyTableName;
  if (headlineEl) headlineEl.textContent = headline || `Record ID: ${rowId}`;
  if (errEl) {
    errEl.textContent = '';
    errEl.classList.add('hidden');
  }
  if (confirmBtn) confirmBtn.disabled = false;
  if (btnText) btnText.textContent = 'Delete Permanently';

  if (modal) {
    modal.classList.remove('hidden');
    const cancelBtn = document.getElementById('lcDeleteCancelBtn');
    if (cancelBtn) cancelBtn.focus();
  }
}

function closeLiveCrudDeleteModal() {
  const modal = document.getElementById('liveCrudDeleteModal');
  if (modal) modal.classList.add('hidden');
  pendingLiveCrudDelete = null;
}

async function confirmLiveCrudDelete() {
  if (!pendingLiveCrudDelete || !pendingLiveCrudDelete.rowId) {
    closeLiveCrudDeleteModal();
    return;
  }
  const { rowId } = pendingLiveCrudDelete;
  const confirmBtn = document.getElementById('lcDeleteConfirmBtn');
  const btnText = document.getElementById('lcDeleteBtnText');
  const errEl = document.getElementById('lcDeleteModalError');

  if (confirmBtn) confirmBtn.disabled = true;
  if (btnText) btnText.textContent = 'Deleting...';

  if (liveCrudCurrentTable === 'transactions') {
    allPaisaTransactions = (typeof allPaisaTransactions !== 'undefined' ? allPaisaTransactions : []).filter(t => String(t.id) !== String(rowId));
    if (typeof savePaisaTransactions === 'function') savePaisaTransactions(true);
  } else if (liveCrudCurrentTable === 'personal_transactions') {
    allPersonalTransactions = (typeof allPersonalTransactions !== 'undefined' ? allPersonalTransactions : []).filter(t => String(t.id) !== String(rowId));
    if (typeof savePersonalData === 'function') savePersonalData(true);
  } else if (liveCrudCurrentTable === 'case_transfers') {
    allCaseTransfers = allCaseTransfers.filter(t => String(t.id) !== String(rowId));
    try {
      localStorage.setItem('case_transfers_backup', JSON.stringify(allCaseTransfers));
    } catch (e) {}
    window.allCaseTransfers = allCaseTransfers;
    if (typeof renderRecentTransfersTable === 'function') renderRecentTransfersTable();
    if (typeof updateTransfersCountBadge === 'function') updateTransfersCountBadge();
  }

  const sb = (typeof supabaseClient !== 'undefined') ? supabaseClient : (typeof window !== 'undefined' ? window.supabaseClient : null);
  try {
    if (sb) {
      const { error } = await sb.from(liveCrudCurrentTable).delete().eq('id', rowId);
      if (error) throw error;
    }
    closeLiveCrudDeleteModal();
    await fetchLiveCrudRows();
    const successMsg = `Row deleted from ${liveCrudCurrentTable}`;
    if (typeof showToastNotification === 'function') {
      showToastNotification(successMsg, 'success');
    } else if (typeof showToast === 'function') {
      showToast(successMsg, 'success');
    } else if (typeof performPostCrudRefresh === 'function') {
      await performPostCrudRefresh({ toast: successMsg });
    } else if (typeof window !== 'undefined' && typeof window.performPostCrudRefresh === 'function') {
      await window.performPostCrudRefresh({ toast: successMsg });
    }
  } catch (err) {
    console.error('Live CRUD delete error:', err);
    if (liveCrudCurrentTable === 'transactions' || liveCrudCurrentTable === 'personal_transactions' || liveCrudCurrentTable === 'case_transfers') {
      closeLiveCrudDeleteModal();
      await fetchLiveCrudRows();
      if (typeof showToastNotification === 'function') {
        showToastNotification('Row deleted locally', 'success');
      } else if (typeof showToast === 'function') {
        showToast('Row deleted locally', 'success');
      }
      return;
    }
    if (confirmBtn) confirmBtn.disabled = false;
    if (btnText) btnText.textContent = 'Delete Permanently';
    if (errEl) {
      errEl.textContent = 'Delete failed: ' + (err.message || 'Unknown error');
      errEl.classList.remove('hidden');
    } else if (typeof showToast === 'function') {
      showToast('Delete failed: ' + (err.message || 'Unknown error'), 'error');
    }
  }
}

function deleteLiveCrudRow(rowId, headline) {
  if (!rowId) return;
  openLiveCrudDeleteModal(rowId, headline);
}

function copyCaseTransfersSql() {
  const sql = `-- CaseBook: Run this in Supabase SQL Editor to create case_transfers table:
CREATE TABLE IF NOT EXISTS public.case_transfers (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_number     text NOT NULL,
  case_type       text DEFAULT 'civil',
  case_title      text,
  from_court      text NOT NULL,
  to_court        text NOT NULL,
  transfer_date   date NOT NULL DEFAULT CURRENT_DATE,
  order_number    text,
  order_date      date,
  transferred_by  text,
  transfer_reason text,
  doc_link        text,
  remarks         text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_case_transfers_case_number ON public.case_transfers (case_number);
CREATE INDEX IF NOT EXISTS idx_case_transfers_transfer_date ON public.case_transfers (transfer_date DESC);
ALTER TABLE public.case_transfers DISABLE ROW LEVEL SECURITY;`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(sql).then(() => {
      if (typeof showToast === 'function') {
        showToast('✅ Supabase SQL copied to clipboard! Run in Supabase SQL Editor.', 4000);
      } else {
        alert('✅ SQL copied to clipboard! Paste and run it in Supabase SQL Editor.');
      }
    }).catch(() => {
      prompt('Copy this SQL and run in Supabase SQL Editor:', sql);
    });
  } else {
    prompt('Copy this SQL and run in Supabase SQL Editor:', sql);
  }
}

// ============================================================
// CUSTOM POPOVER DROPDOWNS (Option 2 Architecture)
// ============================================================

function closeAllLiveCrudCustomDropdowns() {
  document.querySelectorAll('.lc-custom-dropdown .lc-dropdown-menu').forEach(menu => {
    menu.classList.add('hidden');
  });
  document.querySelectorAll('.lc-custom-dropdown .lc-dropdown-trigger').forEach(trigger => {
    trigger.setAttribute('aria-expanded', 'false');
    trigger.classList.remove('is-active');
  });
}

function onLiveCrudDropdownOutsideClick(e) {
  if (!e.target.closest('.lc-custom-dropdown')) {
    closeAllLiveCrudCustomDropdowns();
  }
}

function onLiveCrudDropdownKeydown(e) {
  if (e.key === 'Escape') {
    closeAllLiveCrudCustomDropdowns();
  }
}

function toggleLiveCrudTableDropdown(e) {
  if (e) e.stopPropagation();
  const menu = document.getElementById('liveCrudTableDropdownMenu');
  const trigger = document.getElementById('liveCrudTableDropdownTrigger');
  if (!menu) return;
  const isOpening = menu.classList.contains('hidden');
  closeAllLiveCrudCustomDropdowns();
  if (isOpening) {
    populateLiveCrudTableDropdown();
    menu.classList.remove('hidden');
    if (trigger) {
      trigger.setAttribute('aria-expanded', 'true');
      trigger.classList.add('is-active');
    }
  }
}

function filterLiveCrudTableDropdownItems(query) {
  const q = String(query || '').trim().toLowerCase();
  const list = document.getElementById('liveCrudTableDropdownList');
  if (!list) return;
  const items = list.querySelectorAll('.lc-dd-item');
  items.forEach(item => {
    const text = item.getAttribute('data-search') || item.textContent.toLowerCase();
    item.style.display = (!q || text.includes(q)) ? 'flex' : 'none';
  });
}

function selectLiveCrudTable(tableKey) {
  const select = document.getElementById('liveCrudTableSelect');
  if (select) {
    select.value = tableKey;
    select.dispatchEvent(new Event('change'));
  } else {
    liveCrudCurrentTable = tableKey;
    fetchLiveCrudRows();
  }
  populateLiveCrudTableDropdown();
  closeAllLiveCrudCustomDropdowns();
}

function populateLiveCrudTableDropdown() {
  const select = document.getElementById('liveCrudTableSelect');
  const list = document.getElementById('liveCrudTableDropdownList');
  const labelEl = document.getElementById('liveCrudTableDropdownLabel');
  if (!select) return;

  const currentVal = select.value || liveCrudCurrentTable;
  let activeLabel = 'Civil Cases';

  if (list) {
    const items = Array.from(select.options).map(opt => {
      const isSelected = opt.value === currentVal;
      if (isSelected) activeLabel = opt.text;
      return `
        <button type="button" class="custom-dropdown-item lc-dd-item${isSelected ? ' selected' : ''}" data-value="${escapeHtml(opt.value)}" data-search="${escapeHtml(opt.text.toLowerCase())}" onclick="selectLiveCrudTable('${escapeHtml(opt.value)}')">
          <span class="lc-dd-item-text">${escapeHtml(opt.text)}</span>
          ${isSelected ? '<svg class="lucide lucide-check lc-dd-check" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>' : ''}
        </button>
      `;
    }).join('');
    list.innerHTML = items;
  }

  if (labelEl) {
    labelEl.textContent = activeLabel;
  }
}

function toggleLiveCrudFilterFieldDropdown(key, e) {
  if (e) e.stopPropagation();
  const menu = document.getElementById(`lcFilterMenu_${key}`);
  const trigger = document.getElementById(`lcFilterTrigger_${key}`);
  if (!menu) return;
  const isOpening = menu.classList.contains('hidden');
  closeAllLiveCrudCustomDropdowns();
  if (isOpening) {
    menu.classList.remove('hidden');
    if (trigger) {
      trigger.setAttribute('aria-expanded', 'true');
      trigger.classList.add('is-active');
    }
  }
}

function selectLiveCrudFilterItem(key, value) {
  const select = document.getElementById(`lcFilter_${key}`);
  if (select) {
    select.value = value;
  }
  closeAllLiveCrudCustomDropdowns();
  handleLiveCrudFilterChange(key, value);
}

function toggleLiveCrudPageSizeDropdown(e) {
  if (e) e.stopPropagation();
  const menu = document.getElementById('liveCrudPageSizeMenu');
  const trigger = document.getElementById('liveCrudPageSizeTrigger');
  if (!menu) return;
  const isOpening = menu.classList.contains('hidden');
  closeAllLiveCrudCustomDropdowns();
  if (isOpening) {
    menu.classList.remove('hidden');
    if (trigger) {
      trigger.setAttribute('aria-expanded', 'true');
      trigger.classList.add('is-active');
    }
  }
}

function selectLiveCrudPageSize(val) {
  closeAllLiveCrudCustomDropdowns();
  handleLiveCrudPageSizeChange(val);
}

if (typeof copyCaseTransfersSql !== 'undefined') window.copyCaseTransfersSql = copyCaseTransfersSql;
if (typeof initLiveCrudTab !== 'undefined') window.initLiveCrudTab = initLiveCrudTab;
if (typeof openLiveCrudModal !== 'undefined') window.openLiveCrudModal = openLiveCrudModal;
if (typeof closeLiveCrudModal !== 'undefined') window.closeLiveCrudModal = closeLiveCrudModal;
if (typeof handleLiveCrudFormSubmit !== 'undefined') window.handleLiveCrudFormSubmit = handleLiveCrudFormSubmit;
if (typeof deleteLiveCrudRow !== 'undefined') window.deleteLiveCrudRow = deleteLiveCrudRow;
if (typeof fetchLiveCrudRows !== 'undefined') window.fetchLiveCrudRows = fetchLiveCrudRows;
if (typeof renderLiveCrudData !== 'undefined') window.renderLiveCrudData = renderLiveCrudData;
if (typeof renderLiveCrudRows !== 'undefined') window.renderLiveCrudRows = renderLiveCrudRows;
if (typeof renderLiveCrudDynamicFilterBar !== 'undefined') window.renderLiveCrudDynamicFilterBar = renderLiveCrudDynamicFilterBar;
if (typeof handleLiveCrudFilterChange !== 'undefined') window.handleLiveCrudFilterChange = handleLiveCrudFilterChange;
if (typeof resetLiveCrudFilters !== 'undefined') window.resetLiveCrudFilters = resetLiveCrudFilters;
if (typeof getFilteredLiveCrudRows !== 'undefined') window.getFilteredLiveCrudRows = getFilteredLiveCrudRows;
if (typeof setLiveCrudViewMode !== 'undefined') window.setLiveCrudViewMode = setLiveCrudViewMode;
if (typeof clearLiveCrudSearch !== 'undefined') window.clearLiveCrudSearch = clearLiveCrudSearch;
if (typeof handleLiveCrudPageSizeChange !== 'undefined') window.handleLiveCrudPageSizeChange = handleLiveCrudPageSizeChange;
if (typeof setLiveCrudPage !== 'undefined') window.setLiveCrudPage = setLiveCrudPage;
if (typeof toggleLiveCrudFilterCard !== 'undefined') window.toggleLiveCrudFilterCard = toggleLiveCrudFilterCard;
if (typeof closeLiveCrudFilterCard !== 'undefined') window.closeLiveCrudFilterCard = closeLiveCrudFilterCard;
if (typeof updateLiveCrudActiveFilterBadges !== 'undefined') window.updateLiveCrudActiveFilterBadges = updateLiveCrudActiveFilterBadges;
if (typeof toggleLiveCrudTableDropdown !== 'undefined') window.toggleLiveCrudTableDropdown = toggleLiveCrudTableDropdown;
if (typeof filterLiveCrudTableDropdownItems !== 'undefined') window.filterLiveCrudTableDropdownItems = filterLiveCrudTableDropdownItems;
if (typeof selectLiveCrudTable !== 'undefined') window.selectLiveCrudTable = selectLiveCrudTable;
if (typeof populateLiveCrudTableDropdown !== 'undefined') window.populateLiveCrudTableDropdown = populateLiveCrudTableDropdown;
if (typeof toggleLiveCrudFilterFieldDropdown !== 'undefined') window.toggleLiveCrudFilterFieldDropdown = toggleLiveCrudFilterFieldDropdown;
if (typeof selectLiveCrudFilterItem !== 'undefined') window.selectLiveCrudFilterItem = selectLiveCrudFilterItem;
if (typeof toggleLiveCrudPageSizeDropdown !== 'undefined') window.toggleLiveCrudPageSizeDropdown = toggleLiveCrudPageSizeDropdown;
if (typeof selectLiveCrudPageSize !== 'undefined') window.selectLiveCrudPageSize = selectLiveCrudPageSize;
if (typeof closeAllLiveCrudCustomDropdowns !== 'undefined') window.closeAllLiveCrudCustomDropdowns = closeAllLiveCrudCustomDropdowns;
if (typeof handleLiveCrudFieldInput !== 'undefined') window.handleLiveCrudFieldInput = handleLiveCrudFieldInput;
if (typeof clearLiveCrudField !== 'undefined') window.clearLiveCrudField = clearLiveCrudField;
if (typeof clearLiveCrudModalFields !== 'undefined') window.clearLiveCrudModalFields = clearLiveCrudModalFields;
if (typeof resetLiveCrudModalFields !== 'undefined') window.resetLiveCrudModalFields = resetLiveCrudModalFields;
if (typeof filterLiveCrudModalFields !== 'undefined') window.filterLiveCrudModalFields = filterLiveCrudModalFields;
if (typeof clearLiveCrudModalFieldSearch !== 'undefined') window.clearLiveCrudModalFieldSearch = clearLiveCrudModalFieldSearch;
if (typeof openLiveCrudDeleteModal !== 'undefined') window.openLiveCrudDeleteModal = openLiveCrudDeleteModal;
if (typeof closeLiveCrudDeleteModal !== 'undefined') window.closeLiveCrudDeleteModal = closeLiveCrudDeleteModal;
if (typeof confirmLiveCrudDelete !== 'undefined') window.confirmLiveCrudDelete = confirmLiveCrudDelete;

if (typeof window !== 'undefined') {
  window.setLiveCrudRows = (rows) => { liveCrudRows = rows; return liveCrudRows; };
  window.getLiveCrudRows = () => liveCrudRows;
  window.setLiveCrudCurrentTable = (tbl) => { liveCrudCurrentTable = tbl; return liveCrudCurrentTable; };
  window.getLiveCrudCurrentTable = () => liveCrudCurrentTable;
}

