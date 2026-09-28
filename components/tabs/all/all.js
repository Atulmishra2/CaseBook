window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs['all'] = `                <div class="all-cases-container">
                    <div class="section-header-row">
    <div class="section-title-box">
        <div class="section-icon-badge"><i class="fa-solid fa-folder-tree"></i></div>
        <div>
            <h3>All Cases Master Register</h3>
            <p class="section-subtitle">Unified master directory of all legal matters registered across courts and forums</p>
            <div class="header-chips-row">
                <button type="button" class="header-chip-btn" onclick="filterAllCasesByType('all')"><i class="fa-solid fa-layer-group"></i> All Matters</button>
                    <button type="button" class="header-chip-btn" onclick="showTab('add')"><i class="fa-solid fa-plus"></i> Add New Case</button>
            </div>
        </div>
    </div>
</div>
                        <div class="my-cases-header-actions">
                            <button type="button" class="primary-btn my-cases-action-btn" onclick="showTab('add')" title="Register a new civil or criminal case">
                                ➕ Add Case
                            </button>
                            <button type="button" id="allCasesExportCsvBtn" class="secondary-btn my-cases-action-btn" onclick="exportAllCasesCsv()" title="Export filtered cases to CSV">
                                📥 Export CSV
                            </button>
                        </div>
                    </div>

                    <!-- Quick Case Type Filter Pills Bar -->
                    <div class="all-cases-type-pills-bar">
                        <button type="button" class="type-pill-btn active" data-type="" onclick="filterAllCasesByType('')">
                            <span>All Cases</span> <span class="pill-count" id="pillCountAll">0</span>
                        </button>
                        <button type="button" class="type-pill-btn" data-type="civil" onclick="filterAllCasesByType('civil')">
                            <span><i class="fa-solid fa-scale-balanced"></i>️ Civil Cases</span> <span class="pill-count" id="pillCountCivil">0</span>
                        </button>
                        <button type="button" class="type-pill-btn" data-type="state" onclick="filterAllCasesByType('state')">
                            <span>🚨 State Cases</span> <span class="pill-count" id="pillCountState">0</span>
                        </button>
                        <button type="button" class="type-pill-btn" data-type="family" onclick="filterAllCasesByType('family')">
                            <span>👨‍👩‍👧 Family Cases</span> <span class="pill-count" id="pillCountFamily">0</span>
                        </button>
                        <button type="button" class="type-pill-btn" data-type="revenue" onclick="filterAllCasesByType('revenue')">
                            <span>🌾 Revenue Cases</span> <span class="pill-count" id="pillCountRevenue">0</span>
                        </button>
                        <button type="button" class="type-pill-btn" data-type="misc_civil" onclick="filterAllCasesByType('misc_civil')">
                            <span>📑 Misc Civil</span> <span class="pill-count" id="pillCountMiscCivil">0</span>
                        </button>
                        <button type="button" class="type-pill-btn" data-type="misc_criminal" onclick="filterAllCasesByType('misc_criminal')">
                            <span><i class="fa-solid fa-scale-balanced"></i>️ Misc Criminal</span> <span class="pill-count" id="pillCountMiscCriminal">0</span>
                        </button>
                        <button type="button" class="type-pill-btn" data-type="complaint" onclick="filterAllCasesByType('complaint')">
                            <span>📢 Complaint Cases</span> <span class="pill-count" id="pillCountComplaint">0</span>
                        </button>
                    </div>

                    <!-- Multi-Filter Controls Bar -->
                    <div class="all-cases-filter-card">
                        <div class="all-cases-search-row">
                            <div class="all-cases-search-box">
                                <span class="filter-search-icon"><i class="fa-solid fa-magnifying-glass"></i></span>
                                <input type="text" id="allCasesSearchInput" placeholder="Search by Case No, Parties, Client, Court, Police Station, Crime No, Remarks..." aria-label="Search all cases" oninput="renderAllCasesTableWithFilters()" enterkeyhint="search" autocomplete="off">
                            </div>
                            <button type="button" class="mobile-filter-trigger-btn" onclick="toggleMobileFilterDrawer('allCasesFilterDrawer')" aria-label="Open Filter Options" title="Filter All Cases">
                                <i class="fa-solid fa-sliders"></i> <span>Filters</span> <span class="filter-count-badge" id="allCasesFilterCountBadge">0</span>
                            </button>
                        </div>

                        <div id="allCasesFilterDrawer" class="mobile-filter-drawer">
                            <div class="mobile-filter-drawer-header">
                                <h4><i class="fa-solid fa-sliders"></i> Filter All Cases</h4>
                                <button type="button" class="mobile-filter-drawer-close" onclick="closeMobileFilterDrawer()" aria-label="Close Filters">&times;</button>
                            </div>

                            <div class="all-cases-filter-grid">
                                <div class="filter-item">
                                    <label for="allCasesTypeSelect" class="filter-label"><i class="fa-solid fa-scale-balanced"></i>️ Case Type</label>
                                    <select id="allCasesTypeSelect" class="filter-select" onchange="handleAllCasesTypeSelectChange()">
                                        <option value="">All Case Types</option>
                                        <option value="civil"><i class="fa-solid fa-scale-balanced"></i>️ Civil Cases</option>
                                        <option value="state">🚨 State Cases (Criminal)</option>
                                        <option value="family">👨‍👩‍👧 Family Cases</option>
                                        <option value="revenue">🌾 Revenue Cases</option>
                                        <option value="misc_civil">📑 Misc Civil Cases</option>
                                        <option value="misc_criminal"><i class="fa-solid fa-scale-balanced"></i>️ Misc Criminal Cases</option>
                                        <option value="complaint">📢 Complaint Cases</option>
                                    </select>
                                </div>

                                <div class="filter-item">
                                    <label for="allCasesStatusSelect" class="filter-label">📌 Case Status</label>
                                    <select id="allCasesStatusSelect" class="filter-select" onchange="renderAllCasesTableWithFilters()">
                                        <option value="">All Statuses</option>
                                        <option value="pending">⏳ Pending Cases</option>
                                        <option value="disposed">✅ Disposed Cases</option>
                                        <option value="undated">❓ Undated Cases</option>
                                    </select>
                                </div>

                                <div class="filter-item">
                                    <label for="allCasesCourtSelect" class="filter-label">🏛️ Court / Forum</label>
                                    <select id="allCasesCourtSelect" class="filter-select" onchange="renderAllCasesTableWithFilters()">
                                        <option value="">All Courts</option>
                                    </select>
                                </div>

                                <div class="filter-actions-item">
                                    <button type="button" id="allCasesResetBtn" class="clear-filters-btn" onclick="resetAllCasesFilters()" title="Reset all filters">
                                        <i class="fa-solid fa-rotate-left"></i> Reset Filters
                                    </button>
                                </div>
                            </div>

                            <div class="mobile-filter-drawer-actions">
                                <button type="button" class="primary-btn" onclick="applyMobileFilters('all')">Apply Filters</button>
                                <button type="button" class="secondary-btn" onclick="resetMobileFilters('all')">Reset</button>
                            </div>
                        </div>
                    </div>

                    <!-- Table Toolbar: Rows-Per-Page Selector + Filter Summary (horizontal scroll = false) -->
                    <div class="all-cases-table-toolbar">
                        <div class="all-cases-page-size-wrap">
                            <label for="allCasesPageSizeSelect" class="all-cases-page-size-label">
                                <span>Show</span>
                                <select id="allCasesPageSizeSelect" class="all-cases-page-size-select" onchange="handleAllCasesPageSizeChange(this.value)">
                                    <option value="10">10</option>
                                    <option value="25" selected>25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                    <option value="all">All</option>
                                </select>
                                <span>entries per page</span>
                            </label>
                        </div>
                        <div class="all-cases-toolbar-badge-wrap">
                            <span id="allCasesCountBadge" class="filter-count-badge">Showing 0 cases</span>
                        </div>
                    </div>

                    <div class="table-responsive all-cases-table-wrapper overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-900/5">
                        <table id="allCasesTable" class="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700 case-table all-cases-fixed-table">
                            <thead class="bg-slate-50 text-slate-700 font-semibold text-xs uppercase tracking-wider">
                                <tr>
                                    <th>Case Number</th>
                                    <th>Case Name</th>
                                    <th>Court / Forum</th>
                                    <th>Client Name</th>
                                    <th style="text-align: center;">Status</th>
                                    <th>Parties Remark</th>
                                    <th>Disposal Comment</th>
                                    <th style="text-align: center;">Next Hearing</th>
                                    <th class="table-actions-th" style="text-align: center;">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100 bg-white"></tbody>
                        </table>
                    </div>

                    <!-- Table Pagination Bar -->
                    <div class="all-cases-pagination-bar" id="allCasesPaginationBar">
                        <div class="all-cases-pagination-info" id="allCasesPaginationInfo">
                            Showing 0 to 0 of 0 entries
                        </div>
                        <div class="all-cases-pagination-controls" id="allCasesPaginationControls"></div>
                    </div>
                </div>
`;
