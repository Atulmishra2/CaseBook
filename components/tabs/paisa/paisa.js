// Companion script for offline file:/// double-click compatibility
window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs['paisa'] = `                <div class="paisa-container tab-card-wrapper">
                    <!-- 1. Header Bar -->
                    <div class="paisa-header-bar">
                        <div class="paisa-header-title">
                            <h2>💰 Paisa</h2>
                            <span class="paisa-header-sub">Advocate Finance &amp; Account Ledger</span>
                        </div>
                        <div class="paisa-header-actions">
                            <select id="paisaMonthFilter" class="paisa-month-select" onchange="handlePaisaMonthChange(this.value)" aria-label="Select month">
                                <option value="current" selected>📆 This Month</option>
                                <option value="all">📅 All Time</option>
                            </select>
                            <button type="button" id="paisaSyncBtn" class="paisa-icon-btn" onclick="fetchPaisaFromSupabase(true)" title="Fetch and Sync with Database">
                                <i class="fa-solid fa-arrows-rotate"></i> <span id="paisaSyncStatusText">Sync</span>
                            </button>
                            <button type="button" class="paisa-icon-btn" onclick="openPaisaReportsModal()" title="View Reports &amp; Analytics">
                                <i class="fa-solid fa-chart-pie"></i> <span>Reports</span>
                            </button>
                            <span id="paisaCloudBadge" class="paisa-cloud-badge" title="Database connection status"></span>
                        </div>
                    </div>

                    <!-- 2. Account Switcher Tabs (Virtual Account vs Personal Account) -->
                    <div class="paisa-account-nav-tabs" role="tablist">
                        <button type="button" class="paisa-nav-tab-btn active" id="paisaTabVirtualBtn" onclick="switchPaisaAccountTab('virtual')" role="tab" aria-selected="true">
                            <i class="fa-solid fa-scale-balanced"></i> <span>Virtual Account</span>
                        </button>
                        <button type="button" class="paisa-nav-tab-btn" id="paisaTabPersonalBtn" onclick="switchPaisaAccountTab('personal')" role="tab" aria-selected="false">
                            <i class="fa-solid fa-wallet"></i> <span>Personal Account</span>
                        </button>
                    </div>

                    <!-- ==============================================================
                         VIEW 1: VIRTUAL ACCOUNT VIEW
                         ============================================================== -->
                    <div id="paisaVirtualView" class="paisa-view-container">
                        <!-- Virtual Account Hero Card -->
                        <div class="paisa-account-card">
                            <div class="paisa-card-heading">
                                <div class="paisa-card-title-wrap">
                                    <span class="paisa-card-badge"><i class="fa-solid fa-building-columns"></i> VIRTUAL ACCOUNT</span>
                                </div>
                                <div class="paisa-period-select-wrapper" title="Select time range">
                                    <select id="paisaTimeRangeSelect" class="paisa-period-dropdown" onchange="handlePaisaPeriodChange(this.value)" aria-label="Select time period">
                                        <option value="today">📅 Today</option>
                                        <option value="yesterday">⏳ Yesterday</option>
                                        <option value="custom_date">📆 Specific Day...</option>
                                        <option value="week">📊 Weekly</option>
                                        <option value="month" selected>🗓️ Monthly</option>
                                        <option value="all">🌐 All Time</option>
                                    </select>
                                    <input type="date" id="paisaSpecificDateInput" class="paisa-specific-date-picker hidden" onchange="handlePaisaSpecificDateChange(this.value)" title="Pick specific day">
                                    <i class="fa-solid fa-chevron-down paisa-dropdown-arrow"></i>
                                </div>
                            </div>

                            <div class="paisa-account-figures-grid">
                                <!-- Received Card -->
                                <div class="paisa-fig-card fig-received">
                                    <div class="fig-head">
                                        <span class="fig-label">TOTAL RECEIVED</span>
                                        <span class="fig-icon">🟢</span>
                                    </div>
                                    <div id="paisaTotalReceived" class="fig-value">₹0</div>
                                    <div class="paisa-recv-split">
                                        <div class="paisa-recv-mini paisa-recv-online" title="Online / UPI Received">
                                            <span class="recv-mini-icon">🌐</span>
                                            <span class="recv-mini-label">Online</span>
                                            <span id="paisaRecvOnline" class="recv-mini-amt">₹0</span>
                                        </div>
                                        <div class="paisa-recv-mini paisa-recv-cash" title="Cash Received">
                                            <span class="recv-mini-icon">💵</span>
                                            <span class="recv-mini-label">Cash</span>
                                            <span id="paisaRecvCash" class="recv-mini-amt">₹0</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Spent Card -->
                                <div class="paisa-fig-card fig-spent">
                                    <div class="fig-head">
                                        <span class="fig-label">TOTAL SPENT</span>
                                        <span class="fig-icon">🔴</span>
                                    </div>
                                    <div id="paisaTotalSpent" class="fig-value">₹0</div>
                                    <div class="paisa-spent-meta">
                                        <span id="paisaSpentCategoryHint" class="spent-mini-hint">💼 Court &amp; Office Costs</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Interactive Inflow vs Outflow Mini Graph -->
                            <div id="paisaVirtualGraphContainer" class="paisa-card-graph-box">
                                <!-- Populated dynamically -->
                            </div>

                            <div class="paisa-card-divider"></div>

                            <!-- Net Operating Balance Strip -->
                            <div class="paisa-net-strip">
                                <div class="net-balance-left">
                                    <span class="net-label">Net Operating Balance</span>
                                    <span class="net-sub-hint" id="paisaNetMarginHint">Cashflow surplus</span>
                                </div>
                                <span id="paisaNetBalance" class="net-value">₹0</span>
                            </div>
                        </div>

                        <!-- Big Action Buttons -->
                        <div class="paisa-big-actions">
                            <button type="button" class="paisa-btn-receive" onclick="openPaisaReceivedModal()">
                                <i class="fa-solid fa-plus-circle"></i> + Received
                            </button>
                            <button type="button" class="paisa-btn-spend" onclick="openPaisaSpendModal()">
                                <i class="fa-solid fa-minus-circle"></i> − Spent
                            </button>
                        </div>

                        <!-- Transactions Table / Feed -->
                        <div class="paisa-transactions-section">
                            <div class="paisa-section-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
                                <div class="paisa-section-title" style="margin-bottom: 0;">
                                    <i class="fa-solid fa-clock-rotate-left"></i> Virtual Account Transactions
                                    <span id="paisaTxnCountBadge" class="paisa-count-badge">0</span>
                                </div>
                                <div class="paisa-section-tools">
                                    <button type="button" class="paisa-tool-btn" onclick="exportPaisaStatementAsImage('virtual')" title="Export statement as PNG Image">
                                        <i class="fa-solid fa-file-image"></i> <span>Export Image</span>
                                    </button>
                                </div>
                            </div>
                            <!-- Search & Multi-Filter Toolbar -->
                            <div class="paisa-table-filter-bar">
                                <div class="paisa-search-wrap">
                                    <i class="fa-solid fa-magnifying-glass paisa-search-icon"></i>
                                    <input type="text" id="paisaTxnSearchInput" class="paisa-table-search-input" placeholder="Search payee, case, remarks, ₹..." oninput="handlePaisaTxnSearch(this.value)" autocomplete="off">
                                    <button type="button" id="paisaSearchClearBtn" class="paisa-search-clear-btn hidden" onclick="clearPaisaTxnSearch()" title="Clear search">&times;</button>
                                </div>
                                <div class="paisa-filters-row">
                                    <!-- Filter chips: All | Inflow | Outflow | Transfers -->
                                    <div id="paisaTxnFilterRow" class="paisa-txn-filter-row">
                                        <button type="button" class="paisa-txn-chip active" onclick="setPaisaTxnFilter('all', this)">All</button>
                                        <button type="button" class="paisa-txn-chip" onclick="setPaisaTxnFilter('received', this)">🟢 Inflow</button>
                                        <button type="button" class="paisa-txn-chip" onclick="setPaisaTxnFilter('spent', this)">🔴 Outflow</button>
                                        <button type="button" class="paisa-txn-chip" onclick="setPaisaTxnFilter('personal', this)">👤 Transfers</button>
                                    </div>
                                    <!-- Payment Mode Filter -->
                                    <div class="paisa-mode-filter-wrap">
                                        <select id="paisaModeFilterSelect" class="paisa-mode-select" onchange="handlePaisaModeFilterChange(this.value)" aria-label="Filter Payment Mode">
                                            <option value="all">💳 All Modes</option>
                                            <option value="cash">💵 Cash</option>
                                            <option value="online">🌐 Online / UPI</option>
                                        </select>
                                    </div>
                                    <!-- Specific Day Date Filter Wrap -->
                                    <div class="paisa-date-filter-wrap">
                                        <button type="button" class="paisa-date-filter-btn" id="paisaDateFilterBtn" onclick="triggerPaisaTableDatePicker('virtual')" title="Filter by Specific Day">
                                            <i class="fa-regular fa-calendar-days"></i> <span id="paisaDateFilterBtnText">Specific Day</span>
                                        </button>
                                        <input type="date" id="paisaTableDateInput" class="paisa-table-date-input" onchange="handlePaisaTableDateChange(this.value, 'virtual')" aria-label="Filter by specific date">
                                        <button type="button" id="paisaDateFilterClearBtn" class="paisa-filter-clear-icon-btn hidden" onclick="clearPaisaDateFilter('virtual')" title="Clear date filter">&times;</button>
                                    </div>
                                </div>
                            </div>
                            <!-- Live Filter Totals Strip (Total Earning, Total Expense, Remaining Balance) -->
                            <div id="paisaFilteredTotalsStrip" class="paisa-filtered-totals-strip">
                                <div class="paisa-summary-pill pill-earning">
                                    <span class="pill-label">Total Earning:</span>
                                    <span id="paisaFilteredEarningVal" class="pill-amount">+₹0</span>
                                </div>
                                <div class="paisa-summary-pill pill-expense">
                                    <span class="pill-label">Total Expense:</span>
                                    <span id="paisaFilteredExpenseVal" class="pill-amount">−₹0</span>
                                </div>
                                <div class="paisa-summary-pill pill-balance">
                                    <span class="pill-label">Remaining Balance:</span>
                                    <span id="paisaFilteredBalanceVal" class="pill-amount">₹0</span>
                                </div>
                            </div>
                            <div id="paisaTransactionsFeed" class="paisa-tx-feed">
                                <!-- Populated dynamically -->
                            </div>
                        </div>
                    </div>

                    <!-- ==============================================================
                         VIEW 2: PERSONAL ACCOUNT VIEW
                         ============================================================== -->
                    <div id="paisaPersonalView" class="paisa-view-container hidden">
                        <!-- Personal Account Hero Card -->
                        <div class="paisa-personal-card" id="paisaPersonalCard">
                            <div class="paisa-personal-card-head">
                                <div class="paisa-personal-title-row">
                                    <span class="paisa-personal-badge"><i class="fa-solid fa-wallet"></i> PERSONAL ACCOUNT</span>
                                    <div class="paisa-period-select-wrapper paisa-period-select-personal" title="Select personal time range">
                                        <select id="paisaPersonalTimeRangeSelect" class="paisa-period-dropdown personal-dropdown" onchange="handlePaisaPersonalPeriodChange(this.value)" aria-label="Select personal time period">
                                            <option value="today">📅 Today</option>
                                            <option value="yesterday">⏳ Yesterday</option>
                                            <option value="custom_date">📆 Specific Day...</option>
                                            <option value="week">📊 Weekly</option>
                                            <option value="month" selected>🗓️ Monthly</option>
                                            <option value="all">🌐 All Time</option>
                                        </select>
                                        <input type="date" id="paisaPersonalSpecificDateInput" class="paisa-specific-date-picker hidden" onchange="handlePaisaPersonalSpecificDateChange(this.value)" title="Pick specific day">
                                        <i class="fa-solid fa-chevron-down paisa-dropdown-arrow"></i>
                                    </div>
                                </div>
                                <div class="paisa-personal-main-row">
                                    <div class="paisa-personal-balance-block">
                                        <div class="paisa-personal-balance-label">Personal Balance</div>
                                        <div id="paisaPersonalBalance" class="paisa-personal-balance-amt">₹0</div>
                                    </div>
                                    <div class="paisa-personal-actions">
                                        <button type="button" class="paisa-personal-btn paisa-transfer-btn" onclick="openPaisaTransferModal()" title="Transfer from Virtual to Personal">
                                            <i class="fa-solid fa-arrow-up-from-bracket"></i> Transfer In
                                        </button>
                                        <button type="button" class="paisa-personal-btn paisa-personal-spend-btn" onclick="openPaisaPersonalSpendModal()" title="Record personal expense">
                                            <i class="fa-solid fa-minus-circle"></i> Personal Spent
                                        </button>
                                    </div>
                                </div>
                                <!-- Personal Retention & 7-Day Spend Mini Graph -->
                                <div id="paisaPersonalGraphContainer" class="paisa-personal-graph-box">
                                    <!-- Populated dynamically -->
                                </div>
                                <!-- This-month summary row -->
                                <div class="paisa-personal-month-row">
                                    <div class="paisa-personal-month-item">
                                        <span class="ppm-dot ppm-dot-in"></span>
                                        <span class="ppm-label">Transferred In:</span>
                                        <span id="paisaPersonalTransferredIn" class="ppm-val ppm-in">₹0</span>
                                    </div>
                                    <div class="paisa-personal-month-sep">•</div>
                                    <div class="paisa-personal-month-item">
                                        <span class="ppm-dot ppm-dot-out"></span>
                                        <span class="ppm-label">Personal Spent:</span>
                                        <span id="paisaPersonalSpentThisMonth" class="ppm-val ppm-out">₹0</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Desktop 2-Column Split for Personal Account -->
                        <div class="paisa-desktop-split-layout">
                            <!-- Left: Personal Transactions Ledger Feed -->
                            <div class="paisa-desktop-main-col">
                                <div class="paisa-transactions-section" style="margin-top: 0;">
                                    <div class="paisa-section-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
                                        <div class="paisa-section-title" style="margin-bottom: 0;">
                                            <i class="fa-solid fa-receipt"></i> Personal Wallet Entries
                                            <span id="paisaPersonalTxnCountBadge" class="paisa-count-badge">0</span>
                                        </div>
                                        <div class="paisa-section-tools">
                                            <button type="button" class="paisa-tool-btn" onclick="exportPaisaStatementAsImage('personal')" title="Export personal statement as PNG Image">
                                                <i class="fa-solid fa-file-image"></i> <span>Export Image</span>
                                            </button>
                                        </div>
                                    </div>
                                    <!-- Search & Filter Controls for Personal -->
                                    <div class="paisa-table-filter-bar">
                                        <div class="paisa-search-wrap">
                                            <i class="fa-solid fa-magnifying-glass paisa-search-icon"></i>
                                            <input type="text" id="paisaPersonalTxnSearchInput" class="paisa-table-search-input" placeholder="Search personal spend, note, ₹..." oninput="handlePaisaPersonalTxnSearch(this.value)" autocomplete="off">
                                            <button type="button" id="paisaPersonalSearchClearBtn" class="paisa-search-clear-btn hidden" onclick="clearPaisaPersonalTxnSearch()" title="Clear search">&times;</button>
                                        </div>
                                        <div class="paisa-filters-row">
                                            <!-- Filter chips for Personal -->
                                            <div id="paisaPersonalTxnFilterRow" class="paisa-txn-filter-row">
                                                <button type="button" class="paisa-txn-chip active" onclick="setPaisaPersonalTxnFilter('all', this)">All</button>
                                                <button type="button" class="paisa-txn-chip" onclick="setPaisaPersonalTxnFilter('transfer_in', this)">📥 Transferred In</button>
                                                <button type="button" class="paisa-txn-chip" onclick="setPaisaPersonalTxnFilter('personal_spent', this)">📤 Spent</button>
                                            </div>
                                            <!-- Specific Day Date Filter Wrap for Personal -->
                                            <div class="paisa-date-filter-wrap">
                                                <button type="button" class="paisa-date-filter-btn" id="paisaPersonalDateFilterBtn" onclick="triggerPaisaTableDatePicker('personal')" title="Filter by Specific Day">
                                                    <i class="fa-regular fa-calendar-days"></i> <span id="paisaPersonalDateFilterBtnText">Specific Day</span>
                                                </button>
                                                <input type="date" id="paisaPersonalTableDateInput" class="paisa-table-date-input" onchange="handlePaisaTableDateChange(this.value, 'personal')" aria-label="Filter by specific date">
                                                <button type="button" id="paisaPersonalDateFilterClearBtn" class="paisa-filter-clear-icon-btn hidden" onclick="clearPaisaDateFilter('personal')" title="Clear date filter">&times;</button>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Live Filter Totals Strip for Personal (Transferred In, Spent, Balance) -->
                                    <div id="paisaPersonalFilteredTotalsStrip" class="paisa-filtered-totals-strip">
                                        <div class="paisa-summary-pill pill-earning">
                                            <span class="pill-label">Total Inflow:</span>
                                            <span id="paisaPersonalFilteredEarningVal" class="pill-amount">+₹0</span>
                                        </div>
                                        <div class="paisa-summary-pill pill-expense">
                                            <span class="pill-label">Personal Spent:</span>
                                            <span id="paisaPersonalFilteredExpenseVal" class="pill-amount">−₹0</span>
                                        </div>
                                        <div class="paisa-summary-pill pill-balance">
                                            <span class="pill-label">Remaining Balance:</span>
                                            <span id="paisaPersonalFilteredBalanceVal" class="pill-amount">₹0</span>
                                        </div>
                                    </div>
                                    <div id="paisaPersonalTransactionsFeed" class="paisa-tx-feed">
                                        <!-- Populated dynamically -->
                                    </div>
                                </div>
                            </div>

                            <!-- Right: Personal Wallet Insights & Summary Sidebar -->
                            <div class="paisa-desktop-side-col">
                                <div class="paisa-stats-section paisa-personal-insights-card">
                                    <div class="paisa-section-title">
                                        <i class="fa-solid fa-wallet"></i> Personal Insights
                                    </div>
                                    <div class="paisa-personal-side-stats">
                                        <div class="side-stat-item">
                                            <span class="side-stat-lbl">Wallet Health</span>
                                            <span class="side-stat-badge status-good"><i class="fa-solid fa-shield-check"></i> Segregated</span>
                                        </div>
                                        <div class="side-stat-item">
                                            <span class="side-stat-lbl">Quick Inflow</span>
                                            <button type="button" class="side-stat-btn" onclick="openPaisaTransferModal()"><i class="fa-solid fa-plus"></i> Transfer In</button>
                                        </div>
                                        <div class="side-stat-item">
                                            <span class="side-stat-lbl">Quick Outflow</span>
                                            <button type="button" class="side-stat-btn side-stat-btn-out" onclick="openPaisaPersonalSpendModal()"><i class="fa-solid fa-minus"></i> Add Spent</button>
                                        </div>
                                    </div>
                                    <div class="side-privacy-notice">
                                        <i class="fa-solid fa-lock"></i>
                                        <span>Personal transactions are strictly private and distinct from office cashflow.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
`;
