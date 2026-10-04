window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs['paisa'] = `<div class="section-header-row">
    <div class="section-title-box">
        <div class="section-icon-badge"><i class="fa-solid fa-indian-rupee-sign"></i></div>
        <div>
            <h3>Paisa Manager & Finance</h3>
            <p class="section-subtitle">Chambers fee collections, client billing ledgers, expense logs, and financial records</p>
           
        </div>
    </div>
</div>
                
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

<!-- ================= PAISA MODALS (MODULARIZED) ================= -->
    <!-- ==============================================================
         PAISA: RECEIVED MONEY MODAL
         ============================================================== -->
    <div
      id="paisaReceivedModal"
      class="modal-overlay hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="paisaReceivedModalTitle"
      onclick="
        if (event.target === this) closePaisaModal('paisaReceivedModal');
      "
    >
      <div class="modal-card paisa-modal-card">
        <div class="modal-header">
          <div style="display: flex; align-items: center; gap: 8px">
            <span class="paisa-modal-icon-badge icon-recv">âž•</span>
            <div>
              <h3
                id="paisaReceivedModalTitle"
                style="
                  margin: 0;
                  font-size: 16px;
                  font-weight: 700;
                  color: var(--text-primary, #0f172a);
                "
              >
                Received Money
              </h3>
              <p
                style="
                  margin: 0;
                  font-size: 11px;
                  color: var(--text-muted, #64748b);
                "
              >
                Record client fee, work advance, or payment
              </p>
            </div>
          </div>
          <button
            type="button"
            class="close-btn"
            onclick="closePaisaModal('paisaReceivedModal')"
          >
            &times;
          </button>
        </div>
        <form
          id="paisaReceivedForm"
          onsubmit="handleSavePaisaReceived(event)"
          style="
            display: flex;
            flex-direction: column;
            flex: 1 1 auto;
            min-height: 0;
            overflow: hidden;
            margin: 0;
          "
        >
          <input type="hidden" id="paisaReceivedEditId" value="" />
          <div
            class="modal-body"
            style="
              padding: 14px 18px;
              display: flex;
              flex-direction: column;
              gap: 10px;
              flex: 1 1 auto;
              min-height: 0;
              overflow-y: auto;
            "
          >
            <!-- Amount Field (Auto-focus, numeric) -->
            <div>
              <label
                for="paisaReceivedAmount"
                style="
                  display: block;
                  font-size: 12px;
                  font-weight: 700;
                  color: #047857;
                  margin-bottom: 4px;
                "
                >Amount Received (â‚¹) *</label
              >
              <div class="paisa-amount-wrapper paisa-amount-recv">
                <span class="paisa-currency-prefix">â‚¹</span>
                <input
                  type="number"
                  id="paisaReceivedAmount"
                  class="paisa-amount-input"
                  step="any"
                  min="1"
                  placeholder="0"
                  required
                  inputmode="decimal"
                />
              </div>
            </div>

            <!-- From Client/Payee Name with Smart Case Suggestion -->
            <div style="position: relative">
              <label
                for="paisaReceivedClientName"
                style="
                  display: block;
                  font-size: 11.5px;
                  font-weight: 600;
                  color: #334155;
                  margin-bottom: 4px;
                "
                >From (Client / Payee) *</label
              >
              <input
                type="text"
                id="paisaReceivedClientName"
                placeholder="Type client or party name..."
                required
                autocomplete="off"
                oninput="handlePaisaClientInput(this.value, 'received')"
                onkeydown="handlePaisaClientKeydown(event, 'received')"
                style="
                  width: 100%;
                  height: 38px;
                  border: 1px solid #cbd5e1;
                  border-radius: 7px;
                  padding: 0 10px;
                  font-size: 13px;
                "
              />
              <div
                id="paisaReceivedSuggestions"
                class="account-suggestions-box hidden"
                role="listbox"
              ></div>
              <div
                id="paisaReceivedCaseBadge"
                class="account-suggested-case-badge hidden"
                style="margin-top: 5px"
              ></div>
            </div>

            <!-- Link Case (Optional Dropdown) -->
            <div>
              <label
                for="paisaReceivedCaseSelect"
                style="
                  display: block;
                  font-size: 11px;
                  font-weight: 600;
                  color: #475569;
                  margin-bottom: 3px;
                "
                >âš–ï¸ Link with Case (Optional)</label
              >
              <select
                id="paisaReceivedCaseSelect"
                style="
                  width: 100%;
                  height: 36px;
                  border: 1px solid #cbd5e1;
                  border-radius: 6px;
                  padding: 0 8px;
                  font-size: 12.5px;
                  background: #ffffff;
                "
              >
                <option value="">-- No specific case linked --</option>
              </select>
            </div>

            <!-- Link Task (Optional Dropdown) -->
            <div>
              <label
                for="paisaReceivedTaskSelect"
                style="
                  display: block;
                  font-size: 11px;
                  font-weight: 600;
                  color: #475569;
                  margin-bottom: 3px;
                "
                >ðŸ“‹ Link Task (Optional)</label
              >
              <select
                id="paisaReceivedTaskSelect"
                style="
                  width: 100%;
                  height: 36px;
                  border: 1px solid #cbd5e1;
                  border-radius: 6px;
                  padding: 0 8px;
                  font-size: 12.5px;
                  background: #ffffff;
                "
              >
                <option value="">-- No task linked --</option>
              </select>
            </div>

            <!-- Date & Mode Row -->
            <div class="account-modal-grid-2">
              <div>
                <label
                  for="paisaReceivedDate"
                  style="
                    display: block;
                    font-size: 11px;
                    font-weight: 600;
                    color: #475569;
                    margin-bottom: 3px;
                  "
                  >ðŸ“… Date *</label
                >
                <input
                  type="date"
                  id="paisaReceivedDate"
                  required
                  style="
                    width: 100%;
                    height: 38px;
                    border: 1.5px solid var(--border, #cbd5e1);
                    border-radius: 8px;
                    padding: 0 10px;
                    font-size: 13px;
                    font-weight: 500;
                    background: var(--card-bg, #fff);
                    color: var(--text, #0f172a);
                  "
                />
              </div>
              <div>
                <label
                  style="
                    display: block;
                    font-size: 11px;
                    font-weight: 600;
                    color: #475569;
                    margin-bottom: 3px;
                  "
                  >ðŸ’³ Mode</label
                >
                <input type="hidden" id="paisaReceivedMode" value="Cash" />
                <div
                  class="paisa-mode-radio-group"
                  role="radiogroup"
                  aria-label="Payment Mode"
                >
                  <label class="paisa-radio-btn-label active">
                    <input
                      type="radio"
                      name="paisaReceivedPaymentMode"
                      value="Cash"
                      checked
                      onchange="setPaisaMode('received', 'Cash')"
                    />
                    <span class="paisa-radio-text">Cash</span>
                  </label>
                  <label class="paisa-radio-btn-label">
                    <input
                      type="radio"
                      name="paisaReceivedPaymentMode"
                      value="UPI"
                      onchange="setPaisaMode('received', 'UPI')"
                    />
                    <span class="paisa-radio-text">UPI</span>
                  </label>
                  <label class="paisa-radio-btn-label">
                    <input
                      type="radio"
                      name="paisaReceivedPaymentMode"
                      value="Bank"
                      onchange="setPaisaMode('received', 'Bank')"
                    />
                    <span class="paisa-radio-text">Bank</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Note (Optional 1 line) -->
            <div>
              <label
                for="paisaReceivedNote"
                style="
                  display: block;
                  font-size: 11px;
                  font-weight: 600;
                  color: #475569;
                  margin-bottom: 3px;
                "
                >ðŸ“ Note (Optional)</label
              >
              <input
                type="text"
                id="paisaReceivedNote"
                placeholder="e.g. Advance fee, order copy advance..."
                style="
                  width: 100%;
                  height: 36px;
                  border: 1px solid #cbd5e1;
                  border-radius: 6px;
                  padding: 0 10px;
                  font-size: 12.5px;
                "
              />
            </div>
          </div>

          <!-- Full-width Bottom Fixed Save Button -->
          <div
            class="modal-footer"
            style="
              padding: 12px 18px;
              background: var(--surface-app, #f8fafc);
              border-top: 1px solid var(--border-subtle, #e2e8f0);
              flex-shrink: 0;
            "
          >
            <button type="submit" class="paisa-full-save-btn btn-green">
              <i class="fa-solid fa-check"></i> âœ“ SAVE
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- ==============================================================
         PAISA: SPEND / EXPENSE MODAL
         ============================================================== -->
    <div
      id="paisaSpendModal"
      class="modal-overlay hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="paisaSpendModalTitle"
      onclick="if (event.target === this) closePaisaModal('paisaSpendModal');"
    >
      <div class="modal-card paisa-modal-card">
        <div class="modal-header">
          <div style="display: flex; align-items: center; gap: 8px">
            <span class="paisa-modal-icon-badge icon-spend">âž–</span>
            <div>
              <h3
                id="paisaSpendModalTitle"
                style="
                  margin: 0;
                  font-size: 16px;
                  font-weight: 700;
                  color: var(--text-primary, #0f172a);
                "
              >
                Expense
              </h3>
              <p
                style="
                  margin: 0;
                  font-size: 11px;
                  color: var(--text-muted, #64748b);
                "
              >
                Record court expense, ticket, travel, or chamber cost
              </p>
            </div>
          </div>
          <button
            type="button"
            class="close-btn"
            onclick="closePaisaModal('paisaSpendModal')"
          >
            &times;
          </button>
        </div>
        <form
          id="paisaSpendForm"
          onsubmit="handleSavePaisaSpend(event)"
          style="
            display: flex;
            flex-direction: column;
            flex: 1 1 auto;
            min-height: 0;
            overflow: hidden;
            margin: 0;
          "
        >
          <input type="hidden" id="paisaSpendEditId" value="" />
          <input type="hidden" id="paisaSpendCategory" value="ticket" />
          <div
            class="modal-body"
            style="
              padding: 14px 18px;
              display: flex;
              flex-direction: column;
              gap: 10px;
              flex: 1 1 auto;
              min-height: 0;
              overflow-y: auto;
            "
          >
            <!-- Category Quick Chips (2 rows) -->
            <div>
              <label
                style="
                  display: block;
                  font-size: 11.5px;
                  font-weight: 700;
                  color: #334155;
                  margin-bottom: 6px;
                "
                >Category *</label
              >
              <div class="paisa-cat-chips-grid">
                <button
                  type="button"
                  class="paisa-cat-chip active"
                  data-cat="ticket"
                  onclick="setPaisaSpendCategory('ticket')"
                >
                  ðŸŽŸï¸ Ticket
                </button>
                <button
                  type="button"
                  class="paisa-cat-chip"
                  data-cat="clerk"
                  onclick="setPaisaSpendCategory('clerk')"
                >
                  ðŸ‘¨â€ðŸ’¼ Munshi/Clerk
                </button>
                <button
                  type="button"
                  class="paisa-cat-chip"
                  data-cat="process"
                  onclick="setPaisaSpendCategory('process')"
                >
                  ðŸ“„ Process/Summons
                </button>
                <button
                  type="button"
                  class="paisa-cat-chip"
                  data-cat="travel"
                  onclick="setPaisaSpendCategory('travel')"
                >
                  ðŸš— Travel
                </button>
                <button
                  type="button"
                  class="paisa-cat-chip"
                  data-cat="food"
                  onclick="setPaisaSpendCategory('food')"
                >
                  â˜• Food &amp; Refreshment
                </button>
                <button
                  type="button"
                  class="paisa-cat-chip"
                  data-cat="chamber"
                  onclick="setPaisaSpendCategory('chamber')"
                >
                  ðŸ›ï¸ Chamber Cost
                </button>
                <button
                  type="button"
                  class="paisa-cat-chip"
                  data-cat="stationary"
                  onclick="setPaisaSpendCategory('stationary')"
                >
                  ðŸ“Ž Stationary &amp; Print
                </button>
                <button
                  type="button"
                  class="paisa-cat-chip"
                  data-cat="other"
                  onclick="setPaisaSpendCategory('other')"
                >
                  ðŸ“¦ Other
                </button>
              </div>
            </div>

            <!-- Ticket Calculator Box (shown ONLY if category == ticket) -->
            <div id="paisaTicketCalcBox" class="paisa-ticket-calc-box">
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-bottom: 6px;
                "
              >
                <span
                  style="font-size: 11.5px; font-weight: 700; color: #1e40af"
                  >Ticket Calculator</span
                >
                <span
                  id="paisaVendorRateHint"
                  style="font-size: 10.5px; color: #2563eb; font-weight: 600"
                  >Rate: â‚¹11/ticket</span
                >
              </div>
              <div class="paisa-ticket-calc-grid">
                <div>
                  <label
                    style="
                      font-size: 10px;
                      color: #475569;
                      display: block;
                      margin-bottom: 2px;
                    "
                    >Vendor</label
                  >
                  <select
                    id="paisaTicketVendor"
                    onchange="calculatePaisaTicketTotal()"
                    style="
                      width: 100%;
                      height: 32px;
                      font-size: 11.5px;
                      border: 1px solid #bfdbfe;
                      border-radius: 6px;
                      padding: 0 4px;
                      background: #ffffff;
                    "
                  >
                    <option value="Ajay (11)">Ajay (â‚¹11)</option>
                    <option value="Suresh (11)">Suresh (â‚¹11)</option>
                    <option value="Other (11)">Other (â‚¹11)</option>
                  </select>
                </div>
                <div>
                  <label
                    style="
                      font-size: 10px;
                      color: #475569;
                      display: block;
                      margin-bottom: 2px;
                    "
                    >Ticket Type</label
                  >
                  <select
                    id="paisaTicketValue"
                    onchange="calculatePaisaTicketTotal()"
                    style="
                      width: 100%;
                      height: 32px;
                      font-size: 11.5px;
                      border: 1px solid #bfdbfe;
                      border-radius: 6px;
                      padding: 0 4px;
                      background: #ffffff;
                    "
                  >
                    <option value="10">â‚¹10 Ticket</option>
                    <option value="2">â‚¹2 Ticket</option>
                    <option value="5">â‚¹5 Ticket</option>
                    <option value="20">â‚¹20 Ticket</option>
                    <option value="50">â‚¹50 Ticket</option>
                  </select>
                </div>
                <div>
                  <label
                    style="
                      font-size: 10px;
                      color: #475569;
                      display: block;
                      margin-bottom: 2px;
                    "
                    >Quantity</label
                  >
                  <input
                    type="number"
                    id="paisaTicketQty"
                    min="1"
                    placeholder="Qty"
                    oninput="calculatePaisaTicketTotal()"
                    style="
                      width: 100%;
                      height: 32px;
                      font-size: 11.5px;
                      border: 1px solid #bfdbfe;
                      border-radius: 6px;
                      padding: 0 6px;
                      background: #ffffff;
                    "
                  />
                </div>
              </div>
            </div>

            <!-- Amount Spent (â‚¹) -->
            <div>
              <label
                for="paisaSpendAmount"
                style="
                  display: block;
                  font-size: 12px;
                  font-weight: 700;
                  color: #dc2626;
                  margin-bottom: 4px;
                "
                >AMOUNT SPENT (â‚¹) *</label
              >
              <div class="paisa-amount-wrapper paisa-amount-spend">
                <span class="paisa-currency-prefix">â‚¹</span>
                <input
                  type="number"
                  id="paisaSpendAmount"
                  class="paisa-amount-input"
                  step="any"
                  min="1"
                  placeholder="0"
                  required
                  inputmode="decimal"
                />
              </div>
            </div>

            <!-- Paid To / Vendor / Person -->
            <div style="position: relative">
              <label
                for="paisaSpendPayeeName"
                style="
                  display: block;
                  font-size: 11.5px;
                  font-weight: 700;
                  color: #334155;
                  margin-bottom: 3px;
                "
                >Paid To (Payee / Vendor / Person) *</label
              >
              <input
                type="text"
                id="paisaSpendPayeeName"
                placeholder="e.g. Ajay Vendor, Photostat, Suresh..."
                autocomplete="off"
                oninput="handlePaisaClientInput(this.value, 'spent')"
                onkeydown="handlePaisaClientKeydown(event, 'spent')"
                style="
                  width: 100%;
                  height: 38px;
                  border: 1px solid #cbd5e1;
                  border-radius: 7px;
                  padding: 0 10px;
                  font-size: 13px;
                "
              />
              <div
                id="paisaSpendSuggestions"
                class="account-suggestions-box hidden"
                role="listbox"
              ></div>
              <div
                id="paisaSpendCaseBadge"
                class="account-suggested-case-badge hidden"
                style="margin-top: 5px"
              ></div>
            </div>

            <!-- Link Case (Optional Dropdown) -->
            <div>
              <label
                for="paisaSpendCaseSelect"
                style="
                  display: block;
                  font-size: 11px;
                  font-weight: 600;
                  color: #475569;
                  margin-bottom: 3px;
                "
                >ðŸ“ Link Case (Optional)</label
              >
              <select
                id="paisaSpendCaseSelect"
                style="
                  width: 100%;
                  height: 36px;
                  border: 1px solid #cbd5e1;
                  border-radius: 6px;
                  padding: 0 8px;
                  font-size: 12.5px;
                  background: #ffffff;
                "
              >
                <option value="">-- No case linked --</option>
              </select>
            </div>

            <!-- Link Task (Optional Dropdown) -->
            <div>
              <label
                for="paisaSpendTaskSelect"
                style="
                  display: block;
                  font-size: 11px;
                  font-weight: 600;
                  color: #475569;
                  margin-bottom: 3px;
                "
                >ðŸ“‹ Link Task (Optional)</label
              >
              <select
                id="paisaSpendTaskSelect"
                style="
                  width: 100%;
                  height: 36px;
                  border: 1px solid #cbd5e1;
                  border-radius: 6px;
                  padding: 0 8px;
                  font-size: 12.5px;
                  background: #ffffff;
                "
              >
                <option value="">-- No task linked --</option>
              </select>
            </div>

            <!-- Date & Mode Row -->
            <div class="account-modal-grid-2">
              <div>
                <label
                  for="paisaSpendDate"
                  style="
                    display: block;
                    font-size: 11px;
                    font-weight: 600;
                    color: #475569;
                    margin-bottom: 3px;
                  "
                  >ðŸ“… Date *</label
                >
                <input
                  type="date"
                  id="paisaSpendDate"
                  required
                  style="
                    width: 100%;
                    height: 38px;
                    border: 1.5px solid var(--border, #cbd5e1);
                    border-radius: 8px;
                    padding: 0 10px;
                    font-size: 13px;
                    font-weight: 500;
                    background: var(--card-bg, #fff);
                    color: var(--text, #0f172a);
                  "
                />
              </div>
              <div>
                <label
                  style="
                    display: block;
                    font-size: 11px;
                    font-weight: 600;
                    color: #475569;
                    margin-bottom: 3px;
                  "
                  >ðŸ’³ Mode</label
                >
                <input type="hidden" id="paisaSpendMode" value="Cash" />
                <div
                  class="paisa-mode-radio-group"
                  role="radiogroup"
                  aria-label="Payment Mode"
                >
                  <label class="paisa-radio-btn-label active">
                    <input
                      type="radio"
                      name="paisaSpendPaymentMode"
                      value="Cash"
                      checked
                      onchange="setPaisaMode('spent', 'Cash')"
                    />
                    <span class="paisa-radio-text">Cash</span>
                  </label>
                  <label class="paisa-radio-btn-label">
                    <input
                      type="radio"
                      name="paisaSpendPaymentMode"
                      value="UPI"
                      onchange="setPaisaMode('spent', 'UPI')"
                    />
                    <span class="paisa-radio-text">UPI</span>
                  </label>
                  <label class="paisa-radio-btn-label">
                    <input
                      type="radio"
                      name="paisaSpendPaymentMode"
                      value="Bank"
                      onchange="setPaisaMode('spent', 'Bank')"
                    />
                    <span class="paisa-radio-text">Bank</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Note (Optional 1 line) -->
            <div>
              <label
                for="paisaSpendNote"
                style="
                  display: block;
                  font-size: 11px;
                  font-weight: 600;
                  color: #475569;
                  margin-bottom: 3px;
                "
                >ðŸ“ Note (Optional)</label
              >
              <input
                type="text"
                id="paisaSpendNote"
                placeholder="e.g. Certified copy receipt #42..."
                style="
                  width: 100%;
                  height: 36px;
                  border: 1px solid #cbd5e1;
                  border-radius: 6px;
                  padding: 0 10px;
                  font-size: 12.5px;
                "
              />
            </div>
          </div>

          <!-- Full-width Bottom Fixed Save Button -->
          <div
            class="modal-footer"
            style="
              padding: 12px 18px;
              background: var(--bg, #f8fafc);
              border-top: 1px solid var(--border, #e2e8f0);
              flex-shrink: 0;
            "
          >
            <button type="submit" class="paisa-full-save-btn btn-red">
              <i class="fa-solid fa-check"></i> âœ“ SAVE
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- ==============================================================
         PAISA: TRANSACTION DETAIL SHEET / MODAL
         ============================================================== -->
    <div
      id="paisaDetailModal"
      class="modal-overlay hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="paisaDetailTitle"
      onclick="if (event.target === this) closePaisaModal('paisaDetailModal');"
    >
      <div class="modal-card paisa-modal-card">
        <div class="modal-header">
          <div class="modal-header-info">
            <div
              class="modal-icon"
              style="background: rgba(16, 185, 129, 0.12); color: #059669"
            >
              <i class="fa-solid fa-receipt"></i>
            </div>
            <div>
              <h3
                id="paisaDetailTitle"
                style="
                  margin: 0;
                  font-size: 16px;
                  font-weight: 700;
                  color: #0f172a;
                "
              >
                Transaction Details
              </h3>
              <p
                style="margin: 2px 0 0; font-size: 12px; color: #64748b"
                class="modal-subtitle"
              >
                Full transaction record &amp; ledger breakdown
              </p>
            </div>
          </div>
          <button
            type="button"
            class="modal-close-btn"
            onclick="closePaisaModal('paisaDetailModal')"
            aria-label="Close"
            title="Close"
          >
            &times;
          </button>
        </div>
        <div class="modal-body" id="paisaDetailBody" style="padding: 16px 18px">
          <!-- Filled dynamically by openPaisaDetailModal() -->
        </div>
        <div class="modal-footer paisa-detail-modal-footer">
          <button
            type="button"
            class="primary-btn paisa-detail-edit-btn"
            id="paisaDetailEditBtn"
            title="Edit Transaction"
          >
            <i class="fa-solid fa-pen-to-square"></i>
            <span>Edit Transaction</span>
          </button>
          <div class="paisa-modal-footer-secondary">
            <button
              type="button"
              class="paisa-modal-delete-btn"
              id="paisaDetailDeleteBtn"
              title="Delete Transaction"
            >
              <i class="fa-solid fa-trash"></i> <span>Delete</span>
            </button>
            <button
              type="button"
              class="table-view-btn paisa-detail-close-btn"
              id="paisaDetailCloseBtn"
              onclick="closePaisaModal('paisaDetailModal')"
            >
              <i class="fa-solid fa-xmark"></i> <span>Close</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ==============================================================
         PAISA: REPORTS & ANALYTICS MODAL
         ============================================================== -->
    <div
      id="paisaReportsModal"
      class="modal-overlay hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="paisaReportsTitle"
      onclick="if (event.target === this) closePaisaModal('paisaReportsModal');"
    >
      <div
        class="modal-card"
        style="max-width: 520px !important; border-radius: 14px !important"
      >
        <div class="modal-header">
          <div style="display: flex; align-items: center; gap: 8px">
            <span style="font-size: 18px">ðŸ“Š</span>
            <div>
              <h3
                id="paisaReportsTitle"
                style="
                  margin: 0;
                  font-size: 16px;
                  font-weight: 700;
                  color: var(--text, #0f172a);
                "
              >
                Finance Reports &amp; Analytics
              </h3>
              <p
                id="paisaReportsPeriodSubtitle"
                style="
                  margin: 0;
                  font-size: 11px;
                  color: var(--text-muted, #64748b);
                "
              >
                Monthly Breakdown &amp; P&amp;L
              </p>
            </div>
          </div>
          <button
            type="button"
            class="close-btn"
            onclick="closePaisaModal('paisaReportsModal')"
          >
            &times;
          </button>
        </div>
        <div
          class="modal-body"
          id="paisaReportsContent"
          style="padding: 16px 18px; max-height: 65vh; overflow-y: auto"
        >
          <!-- Populated dynamically -->
        </div>
        <div
          class="modal-footer"
          style="
            padding: 12px 18px;
            background: var(--bg, #f8fafc);
            border-top: 1px solid var(--border, #e2e8f0);
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <button
            type="button"
            class="table-view-btn"
            onclick="closePaisaModal('paisaReportsModal')"
            style="height: 36px; padding: 0 14px; font-size: 12.5px"
          >
            Close
          </button>
          <button
            type="button"
            class="primary-btn"
            onclick="sharePaisaWhatsAppReport()"
            style="
              height: 36px;
              padding: 0 16px;
              font-size: 12.5px;
              font-weight: 700;
              background: #059669;
              border: none;
              border-radius: 6px;
              display: flex;
              align-items: center;
              gap: 6px;
              color: #ffffff;
            "
          >
            <i class="fa-brands fa-whatsapp"></i> Share on WhatsApp
          </button>
        </div>
      </div>
    </div>

    <!-- ==============================================================
         PAISA: TRANSFER TO PERSONAL MODAL
         ============================================================== -->
    <div
      id="paisaTransferModal"
      class="modal-overlay hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="paisaTransferModalTitle"
      onclick="
        if (event.target === this) closePaisaModal('paisaTransferModal');
      "
    >
      <div class="modal-card paisa-modal-card">
        <div class="modal-header">
          <div style="display: flex; align-items: center; gap: 8px">
            <span
              class="paisa-modal-icon-badge"
              style="background: #ede9fe; color: #6d28d9"
              >â¬†</span
            >
            <div>
              <h3
                id="paisaTransferModalTitle"
                style="
                  margin: 0;
                  font-size: 16px;
                  font-weight: 700;
                  color: var(--text, #0f172a);
                "
              >
                Transfer to Personal
              </h3>
              <p
                style="
                  margin: 0;
                  font-size: 11px;
                  color: var(--text-muted, #64748b);
                "
              >
                Move from Virtual Account to Personal wallet
              </p>
            </div>
          </div>
          <button
            type="button"
            class="close-btn"
            onclick="closePaisaModal('paisaTransferModal')"
          >
            &times;
          </button>
        </div>
        <form
          id="paisaTransferForm"
          onsubmit="handlePaisaTransferToPersonal(event)"
          style="
            display: flex;
            flex-direction: column;
            flex: 1 1 auto;
            min-height: 0;
            overflow: hidden;
            margin: 0;
          "
        >
          <div
            class="modal-body"
            style="
              padding: 14px 18px;
              display: flex;
              flex-direction: column;
              gap: 10px;
              flex: 1 1 auto;
              min-height: 0;
              overflow-y: auto;
            "
          >
            <!-- Virtual Net Balance info -->
            <div class="paisa-transfer-info-row">
              <span style="font-size: 12px; color: var(--text-muted, #475569)"
                >Available Virtual Balance:</span
              >
              <span
                id="paisaTransferAvailableBalance"
                style="font-weight: 700; color: #059669; font-size: 14px"
                >â‚¹0</span
              >
            </div>
            <!-- Amount -->
            <div>
              <label
                for="paisaTransferAmount"
                style="
                  display: block;
                  font-size: 12px;
                  font-weight: 700;
                  color: #6d28d9;
                  margin-bottom: 4px;
                "
                >Amount to Transfer (â‚¹) *</label
              >
              <div class="paisa-amount-wrapper paisa-amount-transfer">
                <span class="paisa-currency-prefix">â‚¹</span>
                <input
                  type="number"
                  id="paisaTransferAmount"
                  class="paisa-amount-input"
                  step="any"
                  min="1"
                  placeholder="0"
                  required
                  inputmode="decimal"
                />
              </div>
            </div>
            <!-- Note -->
            <div>
              <label
                for="paisaTransferNote"
                style="
                  display: block;
                  font-size: 11px;
                  font-weight: 600;
                  color: var(--text-muted, #475569);
                  margin-bottom: 3px;
                "
                >ðŸ“ Note (Optional)</label
              >
              <input
                type="text"
                id="paisaTransferNote"
                placeholder="e.g. Monthly withdrawal, personal use..."
                style="
                  width: 100%;
                  height: 36px;
                  border: 1px solid var(--border, #cbd5e1);
                  border-radius: 6px;
                  padding: 0 10px;
                  font-size: 12.5px;
                  background: var(--card-bg, #fff);
                  color: var(--text, #000);
                "
              />
            </div>
            <!-- Date -->
            <div>
              <label
                for="paisaTransferDate"
                style="
                  display: block;
                  font-size: 11px;
                  font-weight: 600;
                  color: var(--text-muted, #475569);
                  margin-bottom: 3px;
                "
                >ðŸ“… Date *</label
              >
              <input
                type="date"
                id="paisaTransferDate"
                required
                style="
                  width: 100%;
                  height: 38px;
                  border: 1.5px solid var(--border, #cbd5e1);
                  border-radius: 8px;
                  padding: 0 10px;
                  font-size: 13px;
                  font-weight: 500;
                  background: var(--card-bg, #fff);
                  color: var(--text, #0f172a);
                "
              />
            </div>
          </div>
          <div
            class="modal-footer"
            style="
              padding: 12px 18px;
              background: var(--bg, #f8fafc);
              border-top: 1px solid var(--border, #e2e8f0);
              flex-shrink: 0;
            "
          >
            <button
              type="submit"
              class="paisa-full-save-btn"
              style="
                background: linear-gradient(135deg, #7c3aed, #6d28d9);
                color: #fff;
              "
            >
              <i class="fa-solid fa-arrow-up-from-bracket"></i> â¬† Transfer to
              Personal
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- ==============================================================
         PAISA: PERSONAL SPEND MODAL
         ============================================================== -->
    <div
      id="paisaPersonalSpendModal"
      class="modal-overlay hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="paisaPersonalSpendModalTitle"
      onclick="
        if (event.target === this) closePaisaModal('paisaPersonalSpendModal');
      "
    >
      <div class="modal-card paisa-modal-card">
        <div class="modal-header">
          <div style="display: flex; align-items: center; gap: 8px">
            <span
              class="paisa-modal-icon-badge"
              style="background: #f5f3ff; color: #7c3aed"
              >ðŸ‘¤</span
            >
            <div>
              <h3
                id="paisaPersonalSpendModalTitle"
                style="
                  margin: 0;
                  font-size: 16px;
                  font-weight: 700;
                  color: var(--text, #0f172a);
                "
              >
                Personal Expense
              </h3>
              <p
                style="
                  margin: 0;
                  font-size: 11px;
                  color: var(--text-muted, #64748b);
                "
              >
                Deducted from Personal wallet only â€” Virtual untouched
              </p>
            </div>
          </div>
          <button
            type="button"
            class="close-btn"
            onclick="closePaisaModal('paisaPersonalSpendModal')"
          >
            &times;
          </button>
        </div>
        <form
          id="paisaPersonalSpendForm"
          onsubmit="handlePaisaPersonalSpend(event)"
          style="
            display: flex;
            flex-direction: column;
            flex: 1 1 auto;
            min-height: 0;
            overflow: hidden;
            margin: 0;
          "
        >
          <div
            class="modal-body"
            style="
              padding: 14px 18px;
              display: flex;
              flex-direction: column;
              gap: 10px;
              flex: 1 1 auto;
              min-height: 0;
              overflow-y: auto;
            "
          >
            <!-- Amount -->
            <div>
              <label
                for="paisaPersonalSpendAmount"
                style="
                  display: block;
                  font-size: 12px;
                  font-weight: 700;
                  color: #7c3aed;
                  margin-bottom: 4px;
                "
                >AMOUNT SPENT (â‚¹) *</label
              >
              <div class="paisa-amount-wrapper paisa-amount-transfer">
                <span class="paisa-currency-prefix">â‚¹</span>
                <input
                  type="number"
                  id="paisaPersonalSpendAmount"
                  class="paisa-amount-input"
                  step="any"
                  min="1"
                  placeholder="0"
                  required
                  inputmode="decimal"
                />
              </div>
            </div>
            <!-- Note/Description -->
            <div>
              <label
                for="paisaPersonalSpendNote"
                style="
                  display: block;
                  font-size: 11.5px;
                  font-weight: 700;
                  color: var(--text, #334155);
                  margin-bottom: 3px;
                "
                >What was this for? *</label
              >
              <input
                type="text"
                id="paisaPersonalSpendNote"
                placeholder="e.g. Groceries, petrol, medicine..."
                required
                style="
                  width: 100%;
                  height: 38px;
                  border: 1px solid var(--border, #cbd5e1);
                  border-radius: 7px;
                  padding: 0 10px;
                  font-size: 13px;
                  background: var(--card-bg, #fff);
                  color: var(--text, #000);
                "
              />
            </div>
            <!-- Category -->
            <div>
              <label
                for="paisaPersonalSpendCategory"
                style="
                  display: block;
                  font-size: 11px;
                  font-weight: 600;
                  color: var(--text-muted, #475569);
                  margin-bottom: 3px;
                "
                >Category</label
              >
              <select
                id="paisaPersonalSpendCategory"
                style="
                  width: 100%;
                  height: 36px;
                  border: 1px solid var(--border, #cbd5e1);
                  border-radius: 6px;
                  padding: 0 8px;
                  font-size: 12.5px;
                  background: var(--card-bg, #ffffff);
                  color: var(--text, #000);
                "
              >
                <option value="groceries">ðŸ›’ Groceries &amp; Food</option>
                <option value="fuel">â›½ Fuel &amp; Travel</option>
                <option value="bills">ðŸ’¡ Bills &amp; Utilities</option>
                <option value="medical">ðŸ’Š Medical &amp; Health</option>
                <option value="shopping">ðŸ›ï¸ Shopping &amp; Personal</option>
                <option value="family">
                  ðŸ‘¨â€ðŸ‘©â€ðŸ‘§ Family &amp; Home
                </option>
                <option value="other">ðŸ“¦ Other</option>
              </select>
            </div>
            <!-- Date -->
            <div>
              <label
                for="paisaPersonalSpendDate"
                style="
                  display: block;
                  font-size: 11px;
                  font-weight: 600;
                  color: var(--text-muted, #475569);
                  margin-bottom: 3px;
                "
                >ðŸ“… Date *</label
              >
              <input
                type="date"
                id="paisaPersonalSpendDate"
                required
                style="
                  width: 100%;
                  height: 38px;
                  border: 1.5px solid var(--border, #cbd5e1);
                  border-radius: 8px;
                  padding: 0 10px;
                  font-size: 13px;
                  font-weight: 500;
                  background: var(--card-bg, #fff);
                  color: var(--text, #0f172a);
                "
              />
            </div>
          </div>
          <div
            class="modal-footer"
            style="
              padding: 12px 18px;
              background: var(--bg, #f8fafc);
              border-top: 1px solid var(--border, #e2e8f0);
              flex-shrink: 0;
            "
          >
            <button
              type="submit"
              class="paisa-full-save-btn"
              style="
                background: linear-gradient(135deg, #7c3aed, #6d28d9);
                color: #fff;
              "
            >
              <i class="fa-solid fa-minus-circle"></i> Save Personal Expense
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Paisa Undo Toast Notification -->

    <div id="paisaToast" class="paisa-toast hidden" aria-live="polite"></div>

`;

// ==============================================================================
// PAISA (EARNING & EXPENSE MANAGER) SUBSYSTEM
// Advocate Personal Finance, Virtual Account & Case/Task Reconciliation
// ==============================================================================

var allPaisaTransactions = [];
var paisaSelectedMonth = 'current';
var paisaSelectedPeriod = 'month'; // 'today' | 'yesterday' | 'week' | 'month' | 'all'
var paisaPersonalSelectedPeriod = 'month';
var paisaDeletedItem = null;
var paisaUndoTimer = null;
var paisaSmartSuggestionsCache = [];
var paisaSmartActiveIndex = -1;
var paisaActiveSuggestionFlow = null;

// Personal Account wallet state
var allPersonalTransactions = []; // { id, type: 'transfer_in'|'personal_spent', amount, note, category, date, created_at }
var paisaTxnFilter = 'all'; // 'all' | 'business' | 'personal'

var DEFAULT_PAISA_VENDORS = {
  ajay: { name: 'Ajay', rate: 11 },
  zameer: { name: 'Zameer', rate: 12 }
};

function getPaisaVendors() {
  try {
    const raw = safeStorage.get('paisa_vendors');
    if (raw) {
      const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
      if (parsed && typeof parsed === 'object') return Object.assign({}, DEFAULT_PAISA_VENDORS, parsed);
    }
  } catch (e) {}
  return Object.assign({}, DEFAULT_PAISA_VENDORS);
}

function savePaisaVendors(vendors) {
  try {
    safeStorage.set('paisa_vendors', JSON.stringify(vendors));
  } catch (e) {}
}

var isPaisaFetching = false;

async function fetchPaisaFromSupabase(isManual = false) {
  if (typeof ensureSupabaseClient === 'function') {
    ensureSupabaseClient();
  }
  if (!supabaseClient) {
    if (isManual && typeof showPaisaToast === 'function') {
      showPaisaToast('⚠️ Database not configured or unreachable');
    }
    return;
  }

  if (isPaisaFetching) return;
  isPaisaFetching = true;

  const syncBtn = document.getElementById('paisaSyncBtn');
  const syncText = document.getElementById('paisaSyncStatusText');
  const cloudBadge = document.getElementById('paisaCloudBadge');

  if (syncBtn) syncBtn.classList.add('spinning');
  if (syncText) syncText.textContent = 'Syncing…';

  try {
    // Concurrently fetch business transactions and personal transactions from Supabase
    const [bRes, pRes] = await Promise.allSettled([
      supabaseClient.from('transactions').select('*').order('txn_date', { ascending: false }),
      supabaseClient.from('personal_transactions').select('*').order('txn_date', { ascending: false })
    ]);

    let loadedBusinessCount = 0;
    let loadedPersonalCount = 0;
    let hasSyncError = false;

    if (bRes.status === 'fulfilled' && bRes.value?.error) {
      console.error('Supabase transactions fetch error:', bRes.value.error);
      hasSyncError = true;
    }
    if (pRes.status === 'fulfilled' && pRes.value?.error) {
      console.error('Supabase personal_transactions fetch error:', pRes.value.error);
      hasSyncError = true;
    }

    // 1. Process Business Transactions
    if (bRes.status === 'fulfilled' && bRes.value && !bRes.value.error && Array.isArray(bRes.value.data)) {
      const remoteTxns = bRes.value.data;
      if (remoteTxns.length > 0) {
        allPaisaTransactions = remoteTxns.map(r => ({
          id: String(r.id),
          type: r.type || 'spent',
          amount: parseFloat(r.amount) || 0,
          client_payee: r.client_payee || '',
          case_no: r.case_no || r.case_id || '',
          case_name: r.case_name || '',
          task_id: r.task_id || '',
          task_title: r.task_title || '',
          category: r.category || 'other',
          ticket_details: r.ticket_details || null,
          payment_mode: (r.mode === 'online' || r.payment_mode === 'Online') ? 'Online' : 'Cash',
          date: r.txn_date || r.date || (r.created_at ? r.created_at.slice(0, 10) : getTodayDateString()),
          note: r.note || '',
          created_at: r.created_at || new Date().toISOString()
        }));
        loadedBusinessCount = allPaisaTransactions.length;
        savePaisaTransactions(false);
      } else {
        allPaisaTransactions = [];
        loadedBusinessCount = 0;
        savePaisaTransactions(false);
      }
    }

    // 2. Process Personal Wallet Transactions
    if (pRes.status === 'fulfilled' && pRes.value && !pRes.value.error && Array.isArray(pRes.value.data)) {
      const remotePersonal = pRes.value.data;
      if (remotePersonal.length > 0) {
        allPersonalTransactions = remotePersonal.map(p => ({
          id: String(p.id),
          type: p.type || 'personal_spent',
          amount: parseFloat(p.amount) || 0,
          note: p.note || '',
          category: p.category || '',
          date: p.txn_date || p.date || (p.created_at ? p.created_at.slice(0, 10) : getTodayDateString()),
          created_at: p.created_at || new Date().toISOString()
        }));
        loadedPersonalCount = allPersonalTransactions.length;
        savePersonalData(false);
      } else {
        allPersonalTransactions = [];
        loadedPersonalCount = 0;
        savePersonalData(false);
      }
    }

    updatePaisaBadge();

    // Re-render active UI
    if (currentActiveTabId === 'paisa') {
      renderPaisaTab();
      if (currentPaisaAccountTab === 'personal') {
        renderPersonalAccountCard();
        renderPersonalTransactionsFeed();
      }
    }

    const totalLoaded = loadedBusinessCount + loadedPersonalCount;
    if (cloudBadge) {
      if (hasSyncError) {
        cloudBadge.innerHTML = `<span class="dot"></span> Database Error (Check RLS)`;
        cloudBadge.className = 'paisa-cloud-badge offline';
      } else {
        cloudBadge.innerHTML = `<span class="dot"></span> Database Synced (${totalLoaded})`;
        cloudBadge.className = 'paisa-cloud-badge connected';
      }
    }

    if (isManual && typeof showPaisaToast === 'function') {
      if (hasSyncError) {
        showPaisaToast('⚠️ Supabase error: Check permissions / RLS on transactions table');
      } else {
        showPaisaToast(`✓ Fetched ${totalLoaded} transactions from database`);
      }
    }
  } catch (err) {
    console.error('fetchPaisaFromSupabase error:', err);
    if (cloudBadge) {
      cloudBadge.innerHTML = `<span class="dot"></span> Offline Cache (${allPaisaTransactions.length})`;
      cloudBadge.className = 'paisa-cloud-badge offline';
    }
    if (isManual && typeof showPaisaToast === 'function') {
      showPaisaToast('⚠️ Sync error, using local data');
    }
  } finally {
    isPaisaFetching = false;
    if (syncBtn) syncBtn.classList.remove('spinning');
    if (syncText) syncText.textContent = 'Sync';
  }
}

if (typeof fetchPaisaFromSupabase !== 'undefined') window.fetchPaisaFromSupabase = fetchPaisaFromSupabase;

function loadPaisaFromStorage() {
  try {
    const raw = safeStorage.get('paisa_transactions');
    if (raw) {
      const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
      if (Array.isArray(parsed)) {
        // Filter out any legacy dummy seeded entries or chambers_accounts fallbacks
        allPaisaTransactions = parsed.filter(t => 
          !String(t.id || '').startsWith('paisa_seed_') &&
          !String(t.id || '').startsWith('acc_seed_') &&
          !String(t.id || '').startsWith('ca_') &&
          !['Client A', 'Client 1', 'Client 2', 'Chambers Expense'].includes(t.client_payee)
        );
        safeStorage.set('paisa_transactions', JSON.stringify(allPaisaTransactions));
        return;
      }
    }
  } catch (e) {
    allPaisaTransactions = [];
  }
  allPaisaTransactions = [];
  safeStorage.set('paisa_transactions', JSON.stringify([]));
}

function savePaisaTransactions(updateUi = true) {
  try {
    safeStorage.set('paisa_transactions', JSON.stringify(allPaisaTransactions));
  } catch (e) {
    console.error('Failed to save paisa_transactions to storage:', e);
  }
  updatePaisaBadge();
  if (updateUi && currentActiveTabId === 'paisa') {
    renderPaisaTab();
  }
}

function formatPaisaAmount(num) {
  const val = parseFloat(num) || 0;
  return Math.round(val).toLocaleString('en-IN');
}

function updatePaisaBadge() {
  const badge = document.getElementById('paisaNavBadge');
  if (!badge) return;
  const count = allPaisaTransactions.length;
  if (count > 0) {
    badge.textContent = count > 99 ? '99+' : count;
    badge.classList.remove('hidden');
  } else {
    badge.textContent = '0';
  }
}

function getPaisaDateRangeFilter(periodKey) {
  const todayStr = getTodayDateString();
  const yestDate = new Date();
  yestDate.setDate(yestDate.getDate() - 1);
  const yesterdayStr = `${yestDate.getFullYear()}-${String(yestDate.getMonth() + 1).padStart(2, '0')}-${String(yestDate.getDate()).padStart(2, '0')}`;
  
  const weekAgoDate = new Date();
  weekAgoDate.setDate(weekAgoDate.getDate() - 6);
  const weekAgoStr = `${weekAgoDate.getFullYear()}-${String(weekAgoDate.getMonth() + 1).padStart(2, '0')}-${String(weekAgoDate.getDate()).padStart(2, '0')}`;
  
  const currentMonthKey = todayStr.slice(0, 7);

  return function(txn) {
    const d = txn.date || todayStr;
    if (!periodKey || periodKey === 'month' || periodKey === 'monthly' || periodKey === 'current') {
      return d.startsWith(currentMonthKey);
    } else if (periodKey === 'today') {
      return d === todayStr;
    } else if (periodKey === 'yesterday') {
      return d === yesterdayStr;
    } else if (periodKey.startsWith('date:')) {
      const targetDate = periodKey.slice(5);
      return d === targetDate;
    } else if (periodKey.length === 10 && periodKey.includes('-')) {
      return d === periodKey;
    } else if (periodKey === 'week' || periodKey === 'weekly') {
      return d >= weekAgoStr && d <= todayStr;
    } else if (periodKey === 'all') {
      return true;
    } else if (periodKey.length === 7) {
      return d.startsWith(periodKey);
    }
    return d.startsWith(currentMonthKey);
  };
}

function getPaisaPeriodLabel(periodKey) {
  const todayStr = getTodayDateString();
  const yestDate = new Date();
  yestDate.setDate(yestDate.getDate() - 1);
  const yesterdayStr = `${yestDate.getFullYear()}-${String(yestDate.getMonth() + 1).padStart(2, '0')}-${String(yestDate.getDate()).padStart(2, '0')}`;

  if (!periodKey || periodKey === 'month' || periodKey === 'monthly' || periodKey === 'current') {
    try {
      const [y, m] = todayStr.slice(0, 7).split('-');
      const d = new Date(parseInt(y), parseInt(m) - 1, 1);
      return `This Month (${d.toLocaleString('en-IN', { month: 'short', year: 'numeric' })})`;
    } catch (e) {
      return 'This Month';
    }
  }
  if (periodKey === 'today') {
    return `Today (${formatDateDMY(todayStr)})`;
  }
  if (periodKey === 'yesterday') {
    return `Yesterday (${formatDateDMY(yesterdayStr)})`;
  }
  if (periodKey.startsWith('date:')) {
    const dStr = periodKey.slice(5);
    return `${formatDateDMY(dStr)} (Specific Day)`;
  }
  if (periodKey.length === 10 && periodKey.includes('-')) {
    return `${formatDateDMY(periodKey)} (Specific Day)`;
  }
  if (periodKey === 'week' || periodKey === 'weekly') {
    return 'This Week (Last 7 Days)';
  }
  if (periodKey === 'all') {
    return 'All Time';
  }
  if (periodKey && periodKey.length === 7) {
    try {
      const [y, m] = periodKey.split('-');
      const d = new Date(parseInt(y), parseInt(m) - 1, 1);
      return d.toLocaleString('en-IN', { month: 'long', year: 'numeric' });
    } catch (e) { return periodKey; }
  }
  return 'This Month';
}

function populatePaisaMonthFilter() {
  const select = document.getElementById('paisaMonthFilter');
  if (!select) return;

  const currentVal = select.value || paisaSelectedMonth || 'current';
  const monthSet = new Set();
  const currentMonthKey = getTodayDateString().slice(0, 7);
  monthSet.add(currentMonthKey);

  allPaisaTransactions.forEach(t => {
    if (t.date && t.date.length >= 7) {
      monthSet.add(t.date.slice(0, 7));
    }
  });

  const sortedMonths = Array.from(monthSet).sort().reverse();

  let html = `<option value="current"${currentVal === 'current' ? ' selected' : ''}>📆 This Month</option>`;
  html += `<option value="all"${currentVal === 'all' ? ' selected' : ''}>📅 All Time</option>`;

  sortedMonths.forEach(m => {
    const [y, mm] = m.split('-');
    const d = new Date(parseInt(y), parseInt(mm) - 1, 1);
    const label = d.toLocaleString('en-IN', { month: 'short', year: 'numeric' });
    html += `<option value="${m}"${currentVal === m ? ' selected' : ''}>🗓️ ${label}</option>`;
  });

  select.innerHTML = html;
}

function handlePaisaMonthChange(val) {
  paisaSelectedMonth = val;
  if (val === 'current') paisaSelectedPeriod = 'month';
  else if (val === 'all') paisaSelectedPeriod = 'all';
  else paisaSelectedPeriod = val;
  renderPaisaTab();
}

function handlePaisaPeriodChange(val) {
  if (val === 'custom_date') {
    triggerPaisaTableDatePicker('virtual');
    return;
  }
  paisaSelectedPeriod = val || 'month';
  if (val === 'month') paisaSelectedMonth = 'current';
  else if (val === 'all') paisaSelectedMonth = 'all';

  // Clear specific date button text if switching away
  const dateBtnText = document.getElementById('paisaDateFilterBtnText');
  const dateClearBtn = document.getElementById('paisaDateFilterClearBtn');
  const dateInput = document.getElementById('paisaTableDateInput');
  if (dateBtnText) dateBtnText.textContent = 'Specific Day';
  if (dateClearBtn) dateClearBtn.classList.add('hidden');
  if (dateInput) dateInput.value = '';

  renderPaisaTab();
}

function handlePaisaPersonalPeriodChange(val) {
  if (val === 'custom_date') {
    triggerPaisaTableDatePicker('personal');
    return;
  }
  paisaPersonalSelectedPeriod = val || 'month';

  const dateBtnText = document.getElementById('paisaPersonalDateFilterBtnText');
  const dateClearBtn = document.getElementById('paisaPersonalDateFilterClearBtn');
  const dateInput = document.getElementById('paisaPersonalTableDateInput');
  if (dateBtnText) dateBtnText.textContent = 'Specific Day';
  if (dateClearBtn) dateClearBtn.classList.add('hidden');
  if (dateInput) dateInput.value = '';

  renderPersonalAccountCard();
  renderPersonalTransactionsFeed();
}

function handlePaisaSpecificDateChange(val) {
  if (!val) return;
  paisaSelectedPeriod = 'date:' + val;
  const dateBtnText = document.getElementById('paisaDateFilterBtnText');
  const dateClearBtn = document.getElementById('paisaDateFilterClearBtn');
  const dateInput = document.getElementById('paisaTableDateInput');
  const rangeSel = document.getElementById('paisaTimeRangeSelect');
  if (dateBtnText) dateBtnText.textContent = formatDateDMY(val);
  if (dateClearBtn) dateClearBtn.classList.remove('hidden');
  if (dateInput) dateInput.value = val;
  if (rangeSel) rangeSel.value = 'custom_date';
  renderPaisaTab();
}

function handlePaisaPersonalSpecificDateChange(val) {
  if (!val) return;
  paisaPersonalSelectedPeriod = 'date:' + val;
  const dateBtnText = document.getElementById('paisaPersonalDateFilterBtnText');
  const dateClearBtn = document.getElementById('paisaPersonalDateFilterClearBtn');
  const dateInput = document.getElementById('paisaPersonalTableDateInput');
  const rangeSel = document.getElementById('paisaPersonalTimeRangeSelect');
  if (dateBtnText) dateBtnText.textContent = formatDateDMY(val);
  if (dateClearBtn) dateClearBtn.classList.remove('hidden');
  if (dateInput) dateInput.value = val;
  if (rangeSel) rangeSel.value = 'custom_date';
  renderPersonalAccountCard();
  renderPersonalTransactionsFeed();
}

function triggerPaisaTableDatePicker(accountType = 'virtual') {
  const isPersonal = accountType === 'personal';
  const inputId = isPersonal ? 'paisaPersonalTableDateInput' : 'paisaTableDateInput';
  const input = document.getElementById(inputId);
  if (input) {
    input.focus();
    if (typeof input.showPicker === 'function') {
      try { input.showPicker(); } catch (e) {}
    }
  }
}

function handlePaisaTableDateChange(val, accountType = 'virtual') {
  if (accountType === 'personal') {
    handlePaisaPersonalSpecificDateChange(val);
  } else {
    handlePaisaSpecificDateChange(val);
  }
}

function clearPaisaDateFilter(accountType = 'virtual') {
  if (accountType === 'personal') {
    paisaPersonalSelectedPeriod = 'month';
    const dateInput = document.getElementById('paisaPersonalTableDateInput');
    const dateBtnText = document.getElementById('paisaPersonalDateFilterBtnText');
    const dateClearBtn = document.getElementById('paisaPersonalDateFilterClearBtn');
    const rangeSel = document.getElementById('paisaPersonalTimeRangeSelect');
    if (dateInput) dateInput.value = '';
    if (dateBtnText) dateBtnText.textContent = 'Specific Day';
    if (dateClearBtn) dateClearBtn.classList.add('hidden');
    if (rangeSel) rangeSel.value = 'month';
    renderPersonalAccountCard();
    renderPersonalTransactionsFeed();
  } else {
    paisaSelectedPeriod = 'month';
    const dateInput = document.getElementById('paisaTableDateInput');
    const dateBtnText = document.getElementById('paisaDateFilterBtnText');
    const dateClearBtn = document.getElementById('paisaDateFilterClearBtn');
    const rangeSel = document.getElementById('paisaTimeRangeSelect');
    if (dateInput) dateInput.value = '';
    if (dateBtnText) dateBtnText.textContent = 'Specific Day';
    if (dateClearBtn) dateClearBtn.classList.add('hidden');
    if (rangeSel) rangeSel.value = 'month';
    renderPaisaTab();
  }
}

function renderPaisaTab() {
  populatePaisaMonthFilter();

  const filterFn = getPaisaDateRangeFilter(paisaSelectedPeriod);
  const filtered = allPaisaTransactions.filter(filterFn);
  const periodLabel = getPaisaPeriodLabel(paisaSelectedPeriod);

  // Sync range select if element exists
  const rangeSel = document.getElementById('paisaTimeRangeSelect');
  if (rangeSel && rangeSel.value !== paisaSelectedPeriod) {
    rangeSel.value = (paisaSelectedPeriod === 'current') ? 'month' : paisaSelectedPeriod;
  }

  // 1. Math calculations — deduct transfer_to_personal from virtual net balance
  let totalReceived = 0;
  let totalSpent = 0;
  let totalTransferred = 0;

  filtered.forEach(t => {
    const amt = parseFloat(t.amount) || 0;
    if (t.type === 'received') totalReceived += amt;
    else if (t.type === 'spent') totalSpent += amt;
    else if (t.type === 'transfer_to_personal') totalTransferred += amt;
  });

  const netBalance = totalReceived - totalSpent - totalTransferred;

  // 2. Hero Card UI
  const periodBadge = document.getElementById('paisaPeriodBadge');
  const totalRecvEl = document.getElementById('paisaTotalReceived');
  const totalSpentEl = document.getElementById('paisaTotalSpent');
  const netBalEl = document.getElementById('paisaNetBalance');
  const statsPeriodEl = document.getElementById('paisaStatsPeriodText');

  if (periodBadge) periodBadge.textContent = periodLabel;
  if (statsPeriodEl) statsPeriodEl.textContent = `(${periodLabel.toLowerCase()})`;
  if (totalRecvEl) totalRecvEl.textContent = `₹${formatPaisaAmount(totalReceived)}`;
  if (totalSpentEl) totalSpentEl.textContent = `₹${formatPaisaAmount(totalSpent)}`;
  if (netBalEl) {
    netBalEl.textContent = `${netBalance < 0 ? '−' : ''}₹${formatPaisaAmount(Math.abs(netBalance))}`;
    netBalEl.classList.toggle('negative', netBalance < 0);
  }

  // 2b. Online / Cash split
  updatePaisaOnlineCashStats(filtered);

  // 2c. Render Virtual Card Mini Graph
  renderPaisaVirtualGraph(filtered);

  // 2d. Personal Account card
  renderPersonalAccountCard();

  // 3. Quick Stats: By Category
  renderPaisaCategoryStats(filtered);

  // 4. Quick Stats: By Case (Top 3)
  renderPaisaCaseStats(filtered);

  // 5. Quick Stats: By Vendor (Tickets)
  renderPaisaVendorStats(filtered);

  // 6. Recent Transactions Feed (respects active filter & period)
  renderPaisaTransactionsFeed(getFilteredPaisaTxns(filtered));
}

function renderPaisaVirtualGraph(filtered) {
  const container = document.getElementById('paisaVirtualGraphContainer');
  if (!container) return;

  let totalRecv = 0;
  let totalSpent = 0;
  let totalTrans = 0;

  filtered.forEach(t => {
    const amt = parseFloat(t.amount) || 0;
    if (t.type === 'received') totalRecv += amt;
    else if (t.type === 'spent') totalSpent += amt;
    else if (t.type === 'transfer_to_personal') totalTrans += amt;
  });

  const totalOutflow = totalSpent + totalTrans;
  const totalVolume = totalRecv + totalOutflow;
  const inPct = totalVolume > 0 ? Math.round((totalRecv / totalVolume) * 100) : 50;
  const outPct = totalVolume > 0 ? (100 - inPct) : 50;

  // 7-day daily activity
  const dayBars = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const dayLabel = i === 0 ? 'Today' : (i === 1 ? 'Yest' : d.toLocaleDateString('en-IN', { weekday: 'narrow' }));

    let dayIn = 0;
    let dayOut = 0;
    (allPaisaTransactions || []).forEach(t => {
      if (t.date === dateStr) {
        const amt = parseFloat(t.amount) || 0;
        if (t.type === 'received') dayIn += amt;
        else if (t.type === 'spent' || t.type === 'transfer_to_personal') dayOut += amt;
      }
    });
    dayBars.push({ dateStr, dayLabel, dayIn, dayOut });
  }

  const maxVal = Math.max(...dayBars.map(b => Math.max(b.dayIn, b.dayOut)), 500);

  let barsHtml = '';
  dayBars.forEach(b => {
    const inH = Math.max(Math.round((b.dayIn / maxVal) * 32), b.dayIn > 0 ? 4 : 2);
    const outH = Math.max(Math.round((b.dayOut / maxVal) * 32), b.dayOut > 0 ? 4 : 2);
    const title = `${b.dateStr}: +₹${formatPaisaAmount(b.dayIn)} | −₹${formatPaisaAmount(b.dayOut)}`;

    barsHtml += `
      <div class="paisa-chart-col" title="${escapeHtml(title)}">
        <div class="paisa-chart-bars-wrap">
          <div class="paisa-mini-bar bar-in ${b.dayIn > 0 ? 'has-val' : ''}" style="height: ${inH}px;"></div>
          <div class="paisa-mini-bar bar-out ${b.dayOut > 0 ? 'has-val' : ''}" style="height: ${outH}px;"></div>
        </div>
        <span class="paisa-chart-day-lbl">${b.dayLabel}</span>
      </div>
    `;
  });

  const netHintEl = document.getElementById('paisaNetMarginHint');
  if (netHintEl) {
    if (totalRecv > 0) {
      const margin = Math.round(((totalRecv - totalOutflow) / totalRecv) * 100);
      netHintEl.textContent = `${margin >= 0 ? '+' : ''}${margin}% retention margin`;
    } else {
      netHintEl.textContent = 'Cashflow surplus';
    }
  }

  container.innerHTML = `
    <div class="paisa-graph-header">
      <span class="paisa-graph-title"><i class="fa-solid fa-chart-line"></i> 7-DAY CASHFLOW &amp; VOLUME RATIO</span>
      <div class="paisa-graph-legends">
        <span class="legend-in"><span class="legend-dot"></span> In ${inPct}% (₹${formatPaisaAmount(totalRecv)})</span>
        <span class="legend-out"><span class="legend-dot"></span> Out ${outPct}% (₹${formatPaisaAmount(totalOutflow)})</span>
      </div>
    </div>
    <div class="paisa-ratio-track">
      <div class="paisa-ratio-fill fill-in" style="width: ${totalVolume > 0 ? inPct : 50}%;"></div>
      <div class="paisa-ratio-fill fill-out" style="width: ${totalVolume > 0 ? outPct : 50}%;"></div>
    </div>
    <div class="paisa-sparkline-row">
      ${barsHtml}
    </div>
  `;
}

function renderPaisaCategoryStats(filteredTransactions) {
  const container = document.getElementById('paisaCategoryChips');
  if (!container) return;

  const catTotals = {
    ticket: 0,
    travel: 0,
    court: 0,
    food: 0,
    print: 0,
    other: 0
  };

  filteredTransactions.forEach(t => {
    if (t.type === 'spent') {
      const cat = (t.category || 'other').toLowerCase();
      if (catTotals[cat] !== undefined) {
        catTotals[cat] += (parseFloat(t.amount) || 0);
      } else {
        catTotals.other += (parseFloat(t.amount) || 0);
      }
    }
  });

  const meta = [
    { id: 'ticket', icon: '🎫', label: 'Ticket' },
    { id: 'travel', icon: '⛽', label: 'Travel' },
    { id: 'court', icon: '📄', label: 'Court' },
    { id: 'food', icon: '☕', label: 'Food' },
    { id: 'print', icon: '🖨️', label: 'Print' },
    { id: 'other', icon: '📦', label: 'Other' }
  ];

  let html = '';
  meta.forEach(item => {
    const amt = catTotals[item.id] || 0;
    html += `
      <div class="paisa-stat-chip">
        <span class="chip-icon">${item.icon}</span>
        <span class="chip-name">${item.label}</span>
        <span class="chip-amt">₹${formatPaisaAmount(amt)}</span>
      </div>
    `;
  });
  container.innerHTML = html;
}

function renderPaisaCaseStats(filteredTransactions) {
  const container = document.getElementById('paisaTopCasesList');
  if (!container) return;

  const caseMap = {};
  filteredTransactions.forEach(t => {
    if (t.case_no) {
      if (!caseMap[t.case_no]) {
        caseMap[t.case_no] = {
          caseNo: t.case_no,
          caseName: t.case_name || t.case_no,
          received: 0,
          spent: 0
        };
      }
      const amt = parseFloat(t.amount) || 0;
      if (t.type === 'received') caseMap[t.case_no].received += amt;
      else if (t.type === 'spent') caseMap[t.case_no].spent += amt;
    }
  });

  const list = Object.values(caseMap);
  if (list.length === 0) {
    container.innerHTML = `<div style="font-size: 12px; color: #94a3b8; padding: 6px 0; font-style: italic;">No case-linked transactions for this period</div>`;
    return;
  }

  list.sort((a, b) => (b.received + b.spent) - (a.received + a.spent));
  const top3 = list.slice(0, 3);

  let html = '';
  top3.forEach(c => {
    const net = c.received - c.spent;
    html += `
      <div class="paisa-case-stat-item">
        <div class="case-meta">
          <span class="case-no">${escapeHtml(c.caseNo)}</span>
          <span class="case-name">${escapeHtml(c.caseName)}</span>
        </div>
        <div class="case-figures">
          <span class="c-rec">+₹${formatPaisaAmount(c.received)}</span>
          <span class="c-sep">/</span>
          <span class="c-sp">−₹${formatPaisaAmount(c.spent)}</span>
          <span class="c-net ${net < 0 ? 'neg' : 'pos'}">(Net: ${net < 0 ? '−' : ''}₹${formatPaisaAmount(Math.abs(net))})</span>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

function renderPaisaVendorStats(filteredTransactions) {
  const container = document.getElementById('paisaVendorStatsRow');
  if (!container) return;

  let ajayCount = 0;
  let ajaySpent = 0;
  let zameerCount = 0;
  let zameerSpent = 0;

  filteredTransactions.forEach(t => {
    if (t.type === 'spent' && t.category === 'ticket') {
      const v = (t.ticket_details?.vendor || '').toLowerCase();
      const amt = parseFloat(t.amount) || 0;
      const qty = parseInt(t.ticket_details?.qty) || (v === 'ajay' ? Math.round(amt / 11) : (v === 'zameer' ? Math.round(amt / 12) : 1));
      if (v === 'zameer' || (t.client_payee || '').toLowerCase().includes('zameer')) {
        zameerCount += qty;
        zameerSpent += amt;
      } else {
        ajayCount += qty;
        ajaySpent += amt;
      }
    }
  });

  container.innerHTML = `
    <div class="paisa-vendor-card">
      <div class="vendor-header">
        <span class="vendor-badge">Vendor</span>
        <span class="vendor-name">Ajay</span>
        <span class="vendor-rate">@₹11</span>
      </div>
      <div class="vendor-body">
        <span class="vendor-qty">${ajayCount} tickets</span>
        <span class="vendor-spent">₹${formatPaisaAmount(ajaySpent)}</span>
      </div>
    </div>
    <div class="paisa-vendor-card">
      <div class="vendor-header">
        <span class="vendor-badge">Vendor</span>
        <span class="vendor-name">Zameer</span>
        <span class="vendor-rate">@₹12</span>
      </div>
      <div class="vendor-body">
        <span class="vendor-qty">${zameerCount} tickets</span>
        <span class="vendor-spent">₹${formatPaisaAmount(zameerSpent)}</span>
      </div>
    </div>
  `;
}

function renderPaisaTransactionsFeed(transactions) {
  const container = document.getElementById('paisaTransactionsFeed');
  const badge = document.getElementById('paisaTxnCountBadge');
  if (!container) return;

  // Calculate and update Live Filter Totals Strip (Total Earning, Total Expense, Remaining Balance)
  let totalEarning = 0;
  let totalExpense = 0;
  (transactions || []).forEach(t => {
    const amt = parseFloat(t.amount) || 0;
    if (t.type === 'received') {
      totalEarning += amt;
    } else if (t.type === 'spent' || t.type === 'transfer_to_personal') {
      totalExpense += amt;
    }
  });
  const remainingBalance = totalEarning - totalExpense;

  const earnEl = document.getElementById('paisaFilteredEarningVal');
  const expEl = document.getElementById('paisaFilteredExpenseVal');
  const balEl = document.getElementById('paisaFilteredBalanceVal');
  if (earnEl) earnEl.textContent = `+₹${formatPaisaAmount(totalEarning)}`;
  if (expEl) expEl.textContent = `−₹${formatPaisaAmount(totalExpense)}`;
  if (balEl) {
    balEl.textContent = `${remainingBalance < 0 ? '−' : ''}₹${formatPaisaAmount(Math.abs(remainingBalance))}`;
    balEl.style.color = remainingBalance < 0 ? '#f87171' : '#10b981';
  }

  if (!transactions || transactions.length === 0) {
    container.innerHTML = `
      <div class="paisa-empty-feed">
        <div style="font-size: 28px; margin-bottom: 6px;">💸</div>
        <div style="font-weight: 700; color: #334155; margin-bottom: 4px;">No transactions recorded for this period</div>
        <div style="font-size: 12px; color: #64748b; margin-bottom: 12px;">Start tracking your earnings and court expenses in one tap.</div>
        <div style="display: flex; gap: 8px; justify-content: center;">
          <button type="button" class="paisa-btn-receive" onclick="openPaisaReceivedModal()" style="font-size: 12px; padding: 6px 14px; min-height: 36px;">+ Received</button>
          <button type="button" class="paisa-btn-spend" onclick="openPaisaSpendModal()" style="font-size: 12px; padding: 6px 14px; min-height: 36px;">− Spent</button>
        </div>
      </div>
    `;
    if (badge) badge.textContent = '0';
    return;
  }

  const sorted = transactions.slice().sort((a, b) => {
    const dateCmp = (b.date || '').localeCompare(a.date || '');
    if (dateCmp !== 0) return dateCmp;
    return (b.created_at || '').localeCompare(a.created_at || '');
  });

  const displayList = sorted.slice(0, 35);
  if (badge) badge.textContent = transactions.length;

  const todayStr = getTodayDateString();
  const yestDate = new Date();
  yestDate.setDate(yestDate.getDate() - 1);
  const yesterdayStr = `${yestDate.getFullYear()}-${String(yestDate.getMonth() + 1).padStart(2, '0')}-${String(yestDate.getDate()).padStart(2, '0')}`;

  const groups = {};
  displayList.forEach(t => {
    const d = t.date || todayStr;
    if (!groups[d]) groups[d] = [];
    groups[d].push(t);
  });

  let html = '';
  const dateKeys = Object.keys(groups).sort().reverse();

  dateKeys.forEach(dateKey => {
    let headerLabel = dateKey;
    if (dateKey === todayStr) {
      headerLabel = 'Today';
    } else if (dateKey === yesterdayStr) {
      headerLabel = 'Yesterday';
    } else {
      try {
        const [y, m, day] = dateKey.split('-');
        const parsedD = new Date(parseInt(y), parseInt(m) - 1, parseInt(day));
        headerLabel = parsedD.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
      } catch (e) {
        headerLabel = dateKey;
      }
    }

    let dailyRecv = 0;
    let dailySpent = 0;
    groups[dateKey].forEach(t => {
      const amt = parseFloat(t.amount) || 0;
      if (t.type === 'received') {
        dailyRecv += amt;
      } else if (t.type === 'spent' || t.type === 'transfer_to_personal') {
        dailySpent += amt;
      }
    });

    let summaryHtml = '';
    if (dailyRecv > 0 || dailySpent > 0) {
      const parts = [];
      if (dailyRecv > 0) {
        parts.push(`<span class="paisa-daily-pill pill-earning"><i class="fa-solid fa-arrow-trend-up"></i> +₹${formatPaisaAmount(dailyRecv)}</span>`);
      }
      if (dailySpent > 0) {
        parts.push(`<span class="paisa-daily-pill pill-expense"><i class="fa-solid fa-arrow-trend-down"></i> −₹${formatPaisaAmount(dailySpent)}</span>`);
      }
      summaryHtml = `<div class="paisa-daily-summary">${parts.join('')}</div>`;
    }

    let mobileCardsHtml = '';
    let desktopTableRowsHtml = '';

    groups[dateKey].forEach(t => {
      const isRecv = t.type === 'received';
      const isTransfer = t.type === 'transfer_to_personal';
      const amt = parseFloat(t.amount) || 0;

      let iconHtml = '';
      let pillClass = '';
      let pillSign = '';
      let typeBadge = '';
      let payeeLabel = '';
      let subLine = '';

      if (isRecv) {
        iconHtml = `<div class="paisa-tx-icon tx-icon-recv"><i class="fa-solid fa-arrow-down"></i></div>`;
        pillClass = 'pill-recv';
        pillSign = '+';
        typeBadge = `<span class="paisa-table-type-pill type-recv"><i class="fa-solid fa-arrow-down"></i> Inflow</span>`;
        payeeLabel = escapeHtml(t.client_payee || 'Client');
        const subDetails = [];
        if (t.case_no) subDetails.push(`<i class="fa-solid fa-scale-balanced"></i> ${escapeHtml(t.case_no)}`);
        if (t.note) subDetails.push(escapeHtml(t.note));
        subLine = subDetails.join(' • ') || 'Client Earning';
      } else if (isTransfer) {
        iconHtml = `<div class="paisa-tx-icon tx-icon-transfer"><i class="fa-solid fa-arrow-right-arrow-left"></i></div>`;
        pillClass = 'pill-transfer';
        pillSign = '−';
        typeBadge = `<span class="paisa-table-type-pill type-transfer"><i class="fa-solid fa-arrow-right-arrow-left"></i> Transfer</span>`;
        payeeLabel = '👤 Transfer to Personal';
        subLine = t.note ? escapeHtml(t.note) : 'Moved to personal wallet';
      } else {
        // spent (business)
        const cat = (t.category || 'other').toLowerCase();
        const icons = {
          ticket: 'fa-ticket',
          travel: 'fa-gas-pump',
          court: 'fa-scale-balanced',
          food: 'fa-mug-hot',
          print: 'fa-print',
          other: 'fa-receipt'
        };
        const iconCls = icons[cat] || 'fa-receipt';
        iconHtml = `<div class="paisa-tx-icon tx-icon-spend"><i class="fa-solid ${iconCls}"></i></div>`;
        pillClass = 'pill-spend';
        pillSign = '−';
        typeBadge = `<span class="paisa-table-type-pill type-spend"><i class="fa-solid ${iconCls}"></i> Expense</span>`;
        payeeLabel = escapeHtml(t.client_payee || 'Expense');
        const subDetails = [];
        if (t.case_no) subDetails.push(`<i class="fa-solid fa-scale-balanced"></i> ${escapeHtml(t.case_no)}`);
        if (t.category) subDetails.push(t.category.toUpperCase());
        if (t.note) subDetails.push(escapeHtml(t.note));
        subLine = subDetails.join(' • ') || 'Court Expense';
      }

      const modeTag = isTransfer ? '—' : `<span class="tx-mode-tag">${escapeHtml(t.payment_mode || 'Cash')}</span>`;
      const clickHandler = isTransfer ? '' : `onclick="openPaisaDetailModal('${escapeHtml(t.id)}')"`;

      // 1. Mobile card item
      mobileCardsHtml += `
        <div class="paisa-tx-row" ${clickHandler} style="${isTransfer ? '' : 'cursor:pointer;'}">
          ${iconHtml}
          <div class="paisa-tx-info">
            <div class="tx-payee-title">${payeeLabel}</div>
            <div class="tx-sub-meta">${subLine}</div>
          </div>
          <div class="paisa-tx-trailing">
            <div class="tx-amt-pill ${pillClass}">
              ${pillSign}₹${formatPaisaAmount(amt)}
            </div>
            ${isTransfer ? '' : modeTag}
          </div>
        </div>
      `;

      // 2. Desktop table row
      desktopTableRowsHtml += `
        <tr class="paisa-table-row ${isTransfer ? 'row-transfer' : (isRecv ? 'row-recv' : 'row-spend')}" ${clickHandler} style="${isTransfer ? '' : 'cursor:pointer;'}">
          <td>${typeBadge}</td>
          <td>
            <div class="table-payee-name">${payeeLabel}</div>
            ${t.category ? `<span class="table-cat-tag">${escapeHtml(t.category.toUpperCase())}</span>` : ''}
          </td>
          <td>
            <div class="table-meta-text">${subLine}</div>
          </td>
          <td>${modeTag}</td>
          <td style="text-align: right;">
            <span class="tx-amt-pill ${pillClass}">${pillSign}₹${formatPaisaAmount(amt)}</span>
          </td>
          <td style="text-align: center;">
            ${isTransfer ? '' : `<button type="button" class="paisa-table-view-btn" onclick="openPaisaDetailModal('${escapeHtml(t.id)}'); event.stopPropagation();" title="View Details"><i class="fa-solid fa-eye"></i></button>`}
          </td>
        </tr>
      `;
    });

    html += `
      <div class="paisa-date-group-block">
        <div class="paisa-date-group-header">
          <div class="paisa-date-badge">
            <i class="fa-regular fa-calendar-days"></i>
            <span>${headerLabel}</span>
          </div>
          ${summaryHtml}
        </div>

        <!-- Mobile Card Feed View -->
        <div class="paisa-tx-cards-mobile">
          ${mobileCardsHtml}
        </div>

        <!-- Desktop Table View -->
        <div class="paisa-tx-table-desktop">
          <table class="paisa-desktop-table">
            <thead>
              <tr>
                <th style="width: 110px;">Type</th>
                <th style="width: 220px;">Party / Payee</th>
                <th>Case &amp; Notes</th>
                <th style="width: 95px;">Mode</th>
                <th style="width: 120px; text-align: right;">Amount</th>
                <th style="width: 60px; text-align: center;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${desktopTableRowsHtml}
            </tbody>
          </table>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function populatePaisaCaseDropdown(selectId, selectedCaseNo = '') {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  let html = `<option value="">-- No specific case linked --</option>`;
  (allCaseRecords || []).forEach(c => {
    const no = c.caseNo || c.criminalCaseNumber || '';
    if (!no) return;
    const title = c.caseName || c.title || `${c.plaintiff || ''} vs ${c.defendant || ''}`.trim() || no;
    const isSel = (no === selectedCaseNo) ? ' selected' : '';
    html += `<option value="${escapeHtml(no)}"${isSel}>${escapeHtml(no)} - ${escapeHtml(title.slice(0, 40))}</option>`;
  });
  sel.innerHTML = html;
}

function populatePaisaTaskDropdown(selectId, selectedTaskId = '') {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  let html = `<option value="">-- No task linked --</option>`;
  const tasks = Array.isArray(window.caseTasks) ? window.caseTasks : [];
  tasks.forEach(t => {
    const id = t.id || '';
    const title = t.taskTitle || t.title || 'Task';
    const cNo = t.caseNo ? ` [${t.caseNo}]` : '';
    const isSel = (String(id) === String(selectedTaskId)) ? ' selected' : '';
    html += `<option value="${escapeHtml(id)}"${isSel}>${escapeHtml(title)}${escapeHtml(cNo)}</option>`;
  });
  sel.innerHTML = html;
}

function setPaisaMode(flow, mode) {
  const hiddenId = flow === 'received' ? 'paisaReceivedMode' : 'paisaSpendMode';
  const hidden = document.getElementById(hiddenId);
  if (hidden) hidden.value = mode;

  const modalId = flow === 'received' ? 'paisaReceivedModal' : 'paisaSpendModal';
  const modal = document.getElementById(modalId);
  if (modal) {
    const radioName = flow === 'received' ? 'paisaReceivedPaymentMode' : 'paisaSpendPaymentMode';
    modal.querySelectorAll(`input[name="${radioName}"]`).forEach(radio => {
      const isMatch = (radio.value || '').toLowerCase() === (mode || '').toLowerCase();
      radio.checked = isMatch;
      const label = radio.closest('.paisa-radio-btn-label');
      if (label) {
        label.classList.toggle('active', isMatch);
      }
    });

    modal.querySelectorAll('.paisa-mode-chip').forEach(btn => {
      btn.classList.toggle('active', (btn.getAttribute('data-mode') || '').toLowerCase() === (mode || '').toLowerCase());
    });
  }
}

function setPaisaSpendCategory(cat) {
  const hidden = document.getElementById('paisaSpendCategory');
  if (hidden) hidden.value = cat;

  const modal = document.getElementById('paisaSpendModal');
  if (modal) {
    modal.querySelectorAll('.paisa-cat-chip').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-cat') === cat);
    });
  }

  const calcBox = document.getElementById('paisaTicketCalcBox');
  if (calcBox) {
    if (cat === 'ticket') {
      calcBox.style.display = 'block';
      calculatePaisaTicketTotal();
    } else {
      calcBox.style.display = 'none';
    }
  }
}

function calculatePaisaTicketTotal() {
  const vendorSel = document.getElementById('paisaTicketVendor');
  const qtyInput = document.getElementById('paisaTicketQty');
  const rateHint = document.getElementById('paisaVendorRateHint');
  const amtInput = document.getElementById('paisaSpendAmount');
  if (!vendorSel || !qtyInput) return;

  const vendors = getPaisaVendors();
  const vKey = vendorSel.value || 'ajay';
  const rate = vendors[vKey]?.rate || (vKey === 'zameer' ? 12 : 11);

  if (rateHint) {
    rateHint.textContent = `Rate: ₹${rate}/ticket`;
  }

  const qty = parseInt(qtyInput.value) || 0;
  if (qty > 0 && amtInput) {
    amtInput.value = qty * rate;
  }
}

function handlePaisaClientInput(val, flow) {
  paisaActiveSuggestionFlow = flow;
  const containerId = flow === 'received' ? 'paisaReceivedSuggestions' : 'paisaSpendSuggestions';
  const badgeId = flow === 'received' ? 'paisaReceivedCaseBadge' : 'paisaSpendCaseBadge';
  const container = document.getElementById(containerId);
  const badge = document.getElementById(badgeId);
  if (!container) return;

  if (!val || val.trim().length < 2) {
    container.classList.add('hidden');
    container.innerHTML = '';
    if (badge) badge.classList.add('hidden');
    return;
  }

  const suggestions = (typeof searchSmartCaseSuggestions === 'function')
    ? searchSmartCaseSuggestions(val)
    : [];
  paisaSmartSuggestionsCache = suggestions;
  paisaSmartActiveIndex = -1;

  if (suggestions.length === 0) {
    container.classList.add('hidden');
    container.innerHTML = '';
    if (badge) badge.classList.add('hidden');
    return;
  }

  let html = '';
  suggestions.slice(0, 6).forEach((sug, idx) => {
    const isExact = sug.isExact || (sug.tag && sug.tag.includes('Exact'));
    const badgeCls = sug.type === 'client' ? 'client' : (isExact ? 'exact' : 'case');
    const badgeText = isExact ? '✓ Party Match' : (sug.type === 'client' ? 'Saved Client' : 'Case Match');
    html += `
      <div class="account-suggestion-item" data-index="${idx}" onclick="selectPaisaSuggestion(${idx}, '${flow}')" style="cursor: pointer;">
        <div class="account-suggestion-title">
          <span>${escapeHtml(sug.name || sug.partyName || sug.title)}</span>
          <span class="account-match-pill pill-${badgeCls}">${badgeText}</span>
        </div>
        <div class="account-suggestion-sub">${escapeHtml(sug.sub || (sug.caseNo ? 'Case: ' + sug.caseNo : ''))}</div>
      </div>
    `;
  });

  container.innerHTML = html;
  container.classList.remove('hidden');

  // Auto-suggest badge if top match is strong
  const top = suggestions[0];
  if (top && top.caseNo && (top.isExact || top.score >= 75) && badge) {
    badge.innerHTML = `
      <i class="fa-solid fa-folder-open"></i>
      <span>Link Case <strong>${escapeHtml(top.caseNo)}</strong> (${escapeHtml((top.title || '').slice(0, 30))})?</span>
      <button type="button" class="account-suggested-link-btn" onclick="applyPaisaLinkedCase('${escapeHtml(top.caseNo)}', '${flow}')">✓ Link</button>
    `;
    badge.classList.remove('hidden');
  } else if (badge) {
    badge.classList.add('hidden');
  }
}

function handlePaisaClientKeydown(e, flow) {
  const containerId = flow === 'received' ? 'paisaReceivedSuggestions' : 'paisaSpendSuggestions';
  const container = document.getElementById(containerId);
  if (!container || container.classList.contains('hidden')) return;

  const items = container.querySelectorAll('.account-suggestion-item');
  if (!items || items.length === 0) return;

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    paisaSmartActiveIndex = (paisaSmartActiveIndex + 1) % items.length;
    updatePaisaActiveSuggestion(items);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    paisaSmartActiveIndex = (paisaSmartActiveIndex - 1 + items.length) % items.length;
    updatePaisaActiveSuggestion(items);
  } else if (e.key === 'Enter') {
    if (paisaSmartActiveIndex >= 0 && paisaSmartActiveIndex < paisaSmartSuggestionsCache.length) {
      e.preventDefault();
      selectPaisaSuggestion(paisaSmartActiveIndex, flow);
    }
  } else if (e.key === 'Escape') {
    container.classList.add('hidden');
  }
}

function updatePaisaActiveSuggestion(items) {
  items.forEach((item, idx) => {
    item.classList.toggle('active', idx === paisaSmartActiveIndex);
    if (idx === paisaSmartActiveIndex) {
      item.scrollIntoView({ block: 'nearest' });
    }
  });
}

function selectPaisaSuggestion(idx, flow) {
  const sug = paisaSmartSuggestionsCache[idx];
  if (!sug) return;

  const nameInputId = flow === 'received' ? 'paisaReceivedClientName' : 'paisaSpendPayeeName';
  const input = document.getElementById(nameInputId);
  if (input) {
    input.value = sug.partyName || sug.name || sug.title || '';
  }

  if (sug.caseNo) {
    applyPaisaLinkedCase(sug.caseNo, flow);
  }

  const containerId = flow === 'received' ? 'paisaReceivedSuggestions' : 'paisaSpendSuggestions';
  const container = document.getElementById(containerId);
  if (container) container.classList.add('hidden');

  const badgeId = flow === 'received' ? 'paisaReceivedCaseBadge' : 'paisaSpendCaseBadge';
  const badge = document.getElementById(badgeId);
  if (badge) badge.classList.add('hidden');
}

function applyPaisaLinkedCase(caseNo, flow) {
  const selectId = flow === 'received' ? 'paisaReceivedCaseSelect' : 'paisaSpendCaseSelect';
  const sel = document.getElementById(selectId);
  if (sel) {
    sel.value = caseNo;
  }
  const badgeId = flow === 'received' ? 'paisaReceivedCaseBadge' : 'paisaSpendCaseBadge';
  const badge = document.getElementById(badgeId);
  if (badge) badge.classList.add('hidden');
}

function openPaisaReceivedModal(editId = null) {
  const modal = document.getElementById('paisaReceivedModal');
  const form = document.getElementById('paisaReceivedForm');
  if (!modal || !form) return;

  const title = document.getElementById('paisaReceivedModalTitle');
  const editIdInput = document.getElementById('paisaReceivedEditId');
  const amountInput = document.getElementById('paisaReceivedAmount');
  const clientInput = document.getElementById('paisaReceivedClientName');
  const dateInput = document.getElementById('paisaReceivedDate');
  const noteInput = document.getElementById('paisaReceivedNote');
  const badge = document.getElementById('paisaReceivedCaseBadge');
  const sugBox = document.getElementById('paisaReceivedSuggestions');

  if (badge) badge.classList.add('hidden');
  if (sugBox) sugBox.classList.add('hidden');

  let selectedCaseNo = '';
  let selectedTaskId = '';
  let targetDate = getTodayDateString();

  if (editId) {
    const tx = allPaisaTransactions.find(t => t.id === editId);
    if (tx) {
      if (title) title.textContent = 'Edit Received Money';
      if (editIdInput) editIdInput.value = tx.id;
      if (amountInput) amountInput.value = tx.amount;
      if (clientInput) clientInput.value = tx.client_payee || '';
      targetDate = tx.date || getTodayDateString();
      if (noteInput) noteInput.value = tx.note || '';
      setPaisaMode('received', tx.payment_mode || 'Cash');
      selectedCaseNo = tx.case_no || '';
      selectedTaskId = tx.task_id || '';
    }
  } else {
    if (title) title.textContent = 'Received Money';
    if (editIdInput) editIdInput.value = '';
    form.reset();
    targetDate = getTodayDateString();
    setPaisaMode('received', 'Cash');
  }

  if (dateInput) {
    dateInput.value = targetDate;
  }

  populatePaisaCaseDropdown('paisaReceivedCaseSelect', selectedCaseNo);
  populatePaisaTaskDropdown('paisaReceivedTaskSelect', selectedTaskId);

  modal.classList.remove('hidden');
  modal.classList.add('active');

  setTimeout(() => {
    if (amountInput) amountInput.focus();
  }, 150);
}

function openPaisaSpendModal(editId = null) {
  const modal = document.getElementById('paisaSpendModal');
  const form = document.getElementById('paisaSpendForm');
  if (!modal || !form) return;

  const title = document.getElementById('paisaSpendModalTitle');
  const editIdInput = document.getElementById('paisaSpendEditId');
  const amountInput = document.getElementById('paisaSpendAmount');
  const payeeInput = document.getElementById('paisaSpendPayeeName');
  const dateInput = document.getElementById('paisaSpendDate');
  const noteInput = document.getElementById('paisaSpendNote');
  const badge = document.getElementById('paisaSpendCaseBadge');
  const sugBox = document.getElementById('paisaSpendSuggestions');
  const ticketVendor = document.getElementById('paisaTicketVendor');
  const ticketValue = document.getElementById('paisaTicketValue');
  const ticketQty = document.getElementById('paisaTicketQty');

  if (badge) badge.classList.add('hidden');
  if (sugBox) sugBox.classList.add('hidden');

  let selectedCaseNo = '';
  let selectedTaskId = '';
  let catToSet = 'ticket';
  let targetDate = getTodayDateString();

  if (editId) {
    const tx = allPaisaTransactions.find(t => t.id === editId);
    if (tx) {
      if (title) title.textContent = 'Edit Expense';
      if (editIdInput) editIdInput.value = tx.id;
      catToSet = tx.category || 'other';
      if (amountInput) amountInput.value = tx.amount;
      if (payeeInput) payeeInput.value = tx.client_payee || '';
      targetDate = tx.date || getTodayDateString();
      if (noteInput) noteInput.value = tx.note || '';
      setPaisaMode('spent', tx.payment_mode || 'Cash');
      selectedCaseNo = tx.case_no || '';
      selectedTaskId = tx.task_id || '';

      if (tx.ticket_details) {
        if (ticketVendor) ticketVendor.value = tx.ticket_details.vendor || 'ajay';
        if (ticketValue) ticketValue.value = tx.ticket_details.value || '10';
        if (ticketQty) ticketQty.value = tx.ticket_details.qty || 1;
      }
    }
  } else {
    if (title) title.textContent = 'Expense';
    if (editIdInput) editIdInput.value = '';
    form.reset();
    targetDate = getTodayDateString();
    setPaisaMode('spent', 'Cash');
    if (ticketVendor) ticketVendor.value = 'ajay';
    if (ticketValue) ticketValue.value = '10';
    if (ticketQty) ticketQty.value = '';
  }

  if (dateInput) {
    dateInput.value = targetDate;
  }

  setPaisaSpendCategory(catToSet);
  populatePaisaCaseDropdown('paisaSpendCaseSelect', selectedCaseNo);
  populatePaisaTaskDropdown('paisaSpendTaskSelect', selectedTaskId);

  modal.classList.remove('hidden');
  modal.classList.add('active');

  setTimeout(() => {
    if (catToSet === 'ticket' && ticketQty) {
      ticketQty.focus();
    } else if (amountInput) {
      amountInput.focus();
    }
  }, 150);
}

function handleSavePaisaReceived(e) {
  if (e && e.preventDefault) e.preventDefault();

  const editId = document.getElementById('paisaReceivedEditId')?.value || '';
  const amount = parseFloat(document.getElementById('paisaReceivedAmount')?.value || 0);
  const clientName = (document.getElementById('paisaReceivedClientName')?.value || '').trim();
  const caseNo = document.getElementById('paisaReceivedCaseSelect')?.value || null;
  const taskId = document.getElementById('paisaReceivedTaskSelect')?.value || null;
  const date = document.getElementById('paisaReceivedDate')?.value || getTodayDateString();
  const mode = document.getElementById('paisaReceivedMode')?.value || 'Cash';
  const note = (document.getElementById('paisaReceivedNote')?.value || '').trim();

  if (!amount || amount <= 0) {
    showPaisaToast('⚠️ Please enter a valid received amount');
    return;
  }
  if (!clientName) {
    showPaisaToast('⚠️ Please enter client or party name');
    return;
  }

  let caseTitle = null;
  if (caseNo) {
    const foundCase = (allCaseRecords || []).find(c => (c.caseNo === caseNo || c.criminalCaseNumber === caseNo));
    if (foundCase) {
      caseTitle = foundCase.caseName || foundCase.title || `${foundCase.plaintiff || ''} vs ${foundCase.defendant || ''}`.trim() || caseNo;
    }
  }

  let taskTitle = null;
  if (taskId) {
    const tasks = Array.isArray(window.caseTasks) ? window.caseTasks : [];
    const foundTask = tasks.find(t => String(t.id) === String(taskId));
    if (foundTask) {
      taskTitle = foundTask.taskTitle || foundTask.title || null;
    }
  }

  if (editId) {
    const idx = allPaisaTransactions.findIndex(t => t.id === editId);
    if (idx !== -1) {
      allPaisaTransactions[idx] = Object.assign({}, allPaisaTransactions[idx], {
        amount,
        client_payee: clientName,
        case_no: caseNo,
        case_name: caseTitle,
        task_id: taskId,
        task_title: taskTitle,
        payment_mode: mode,
        date,
        note,
        updated_at: new Date().toISOString()
      });
    }
  } else {
    const newTx = {
      id: 'tx_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      type: 'received',
      amount,
      client_payee: clientName,
      case_no: caseNo,
      case_name: caseTitle,
      task_id: taskId,
      task_title: taskTitle,
      category: 'fee',
      ticket_details: null,
      payment_mode: mode,
      date,
      note,
      created_at: new Date().toISOString()
    };
    allPaisaTransactions.unshift(newTx);
  }

  savePaisaTransactions(true);
  closePaisaModal('paisaReceivedModal');
  showPaisaToast(`✓ Received ₹${formatPaisaAmount(amount)} recorded successfully`);

  if (typeof ensureSupabaseClient === 'function' && ensureSupabaseClient()) {
    (async () => {
      try {
        const payload = {
          type: 'received',
          amount,
          client_payee: clientName,
          category: 'fee',
          mode: (mode || '').toLowerCase() === 'online' ? 'online' : 'cash',
          case_id: caseNo || null,
          note: note || '',
          txn_date: date
        };
        if (editId && !editId.startsWith('tx_') && !editId.startsWith('ca_')) {
          const { error: upErr } = await supabaseClient.from('transactions').update(payload).eq('id', editId);
          if (upErr) console.error('Supabase update transactions error:', upErr);
        } else {
          const { data: insData, error: insErr } = await supabaseClient.from('transactions').insert([payload]).select();
          if (insErr) {
            console.error('Supabase insert transactions error:', insErr);
            if (insErr.code === '42501') {
              console.warn('RLS Policy Violation: Please run supabase_paisa_fix_migration.sql in Supabase SQL editor');
            }
          } else if (insData && insData[0]) {
            const targetId = editId || (typeof newTx !== 'undefined' ? newTx.id : null);
            const curIdx = allPaisaTransactions.findIndex(t => t.id === targetId);
            if (curIdx !== -1) {
              allPaisaTransactions[curIdx].id = String(insData[0].id);
              savePaisaTransactions(false);
            }
          }
        }
      } catch (err) {
        console.warn('Supabase sync received note:', err);
      }
    })();
  }
}

function handleSavePaisaSpend(e) {
  if (e && e.preventDefault) e.preventDefault();

  const editId = document.getElementById('paisaSpendEditId')?.value || '';
  const category = document.getElementById('paisaSpendCategory')?.value || 'other';
  const amount = parseFloat(document.getElementById('paisaSpendAmount')?.value || 0);
  const payee = (document.getElementById('paisaSpendPayeeName')?.value || '').trim() || 'Expense';
  const caseNo = document.getElementById('paisaSpendCaseSelect')?.value || null;
  const taskId = document.getElementById('paisaSpendTaskSelect')?.value || null;
  const date = document.getElementById('paisaSpendDate')?.value || getTodayDateString();
  const mode = document.getElementById('paisaSpendMode')?.value || 'Cash';
  const note = (document.getElementById('paisaSpendNote')?.value || '').trim();

  if (!amount || amount <= 0) {
    showPaisaToast('⚠️ Please enter a valid expense amount');
    return;
  }

  let ticketDetails = null;
  if (category === 'ticket') {
    const vendor = document.getElementById('paisaTicketVendor')?.value || 'ajay';
    const val = parseInt(document.getElementById('paisaTicketValue')?.value) || 10;
    const qty = parseInt(document.getElementById('paisaTicketQty')?.value) || 1;
    const vendors = getPaisaVendors();
    const rate = vendors[vendor]?.rate || (vendor === 'zameer' ? 12 : 11);
    ticketDetails = { vendor, value: val, qty, rate };
  }

  let caseTitle = null;
  if (caseNo) {
    const foundCase = (allCaseRecords || []).find(c => (c.caseNo === caseNo || c.criminalCaseNumber === caseNo));
    if (foundCase) {
      caseTitle = foundCase.caseName || foundCase.title || `${foundCase.plaintiff || ''} vs ${foundCase.defendant || ''}`.trim() || caseNo;
    }
  }

  let taskTitle = null;
  if (taskId) {
    const tasks = Array.isArray(window.caseTasks) ? window.caseTasks : [];
    const foundTask = tasks.find(t => String(t.id) === String(taskId));
    if (foundTask) {
      taskTitle = foundTask.taskTitle || foundTask.title || null;
    }
  }

  if (editId) {
    const idx = allPaisaTransactions.findIndex(t => t.id === editId);
    if (idx !== -1) {
      allPaisaTransactions[idx] = Object.assign({}, allPaisaTransactions[idx], {
        category,
        amount,
        client_payee: payee,
        case_no: caseNo,
        case_name: caseTitle,
        task_id: taskId,
        task_title: taskTitle,
        ticket_details: ticketDetails,
        payment_mode: mode,
        date,
        note,
        updated_at: new Date().toISOString()
      });
    }
  } else {
    const newTx = {
      id: 'tx_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      type: 'spent',
      amount,
      client_payee: payee,
      case_no: caseNo,
      case_name: caseTitle,
      task_id: taskId,
      task_title: taskTitle,
      category,
      ticket_details: ticketDetails,
      payment_mode: mode,
      date,
      note,
      created_at: new Date().toISOString()
    };
    allPaisaTransactions.unshift(newTx);
  }

  savePaisaTransactions(true);
  closePaisaModal('paisaSpendModal');
  showPaisaToast(`✓ Spent ₹${formatPaisaAmount(amount)} recorded successfully`);

  if (typeof ensureSupabaseClient === 'function' && ensureSupabaseClient()) {
    (async () => {
      try {
        const payload = {
          type: 'spent',
          amount,
          client_payee: payee,
          category: category || 'other',
          mode: (mode || '').toLowerCase() === 'online' ? 'online' : 'cash',
          case_id: caseNo || null,
          note: note || '',
          txn_date: date
        };
        if (editId && !editId.startsWith('tx_') && !editId.startsWith('ca_')) {
          const { error: upErr } = await supabaseClient.from('transactions').update(payload).eq('id', editId);
          if (upErr) console.error('Supabase update spend error:', upErr);
        } else {
          const { data: insData, error: insErr } = await supabaseClient.from('transactions').insert([payload]).select();
          if (insErr) {
            console.error('Supabase insert spend error:', insErr);
            if (insErr.code === '42501') {
              console.warn('RLS Policy Violation: Please run supabase_paisa_fix_migration.sql in Supabase SQL editor');
            }
          } else if (insData && insData[0]) {
            const targetId = editId || (typeof newTx !== 'undefined' ? newTx.id : null);
            const curIdx = allPaisaTransactions.findIndex(t => t.id === targetId);
            if (curIdx !== -1) {
              allPaisaTransactions[curIdx].id = String(insData[0].id);
              savePaisaTransactions(false);
            }
          }
        }
      } catch (err) {
        console.warn('Supabase sync spend note:', err);
      }
    })();
  }
}

function openPaisaDetailModal(id) {
  const tx = allPaisaTransactions.find(t => t.id === id);
  if (!tx) return;

  const body = document.getElementById('paisaDetailBody');
  const isRecv = tx.type === 'received';
  const amt = parseFloat(tx.amount) || 0;
  const formattedDate = tx.date ? formatDateDMY(tx.date) : '—';
  const modeIcon = (tx.payment_mode || '').toLowerCase().includes('online') || (tx.payment_mode || '').toLowerCase().includes('upi')
    ? '🌐'
    : ((tx.payment_mode || '').toLowerCase().includes('cheque') ? '📜' : '💵');

  let ticketRow = '';
  if (tx.ticket_details) {
    const td = tx.ticket_details;
    ticketRow = `
      <div class="paisa-detail-row">
        <span class="detail-label"><i class="fa-solid fa-ticket"></i> Ticket Details</span>
        <span class="detail-val">Vendor: <strong>${escapeHtml((td.vendor || '').toUpperCase())}</strong> • Qty: ${td.qty} • Rate: ₹${td.rate}/ticket</span>
      </div>
    `;
  }

  let caseRow = '';
  if (tx.case_no) {
    caseRow = `
      <div class="paisa-detail-row">
        <span class="detail-label"><i class="fa-solid fa-scale-balanced"></i> Linked Case</span>
        <span class="detail-val">
          <a href="javascript:void(0);" class="todo-case-link" onclick="closePaisaModal('paisaDetailModal'); showTab('search'); document.getElementById('globalSearch').value='${escapeHtml(tx.case_no)}'; filterCaseTables(false);" title="View Case">
            ${escapeHtml(tx.case_no)} ↗
          </a>
          ${tx.case_name ? ' <small style="color: #64748b;">(' + escapeHtml(tx.case_name) + ')</small>' : ''}
        </span>
      </div>
    `;
  }

  let taskRow = '';
  if (tx.task_title || tx.task_id) {
    taskRow = `
      <div class="paisa-detail-row">
        <span class="detail-label"><i class="fa-solid fa-list-check"></i> Linked Task</span>
        <span class="detail-val"><strong>${escapeHtml(tx.task_title || tx.task_id)}</strong></span>
      </div>
    `;
  }

  let noteRow = '';
  if (tx.note) {
    noteRow = `
      <div class="paisa-detail-row" style="align-items: flex-start;">
        <span class="detail-label"><i class="fa-solid fa-note-sticky"></i> Note / Remarks</span>
        <span class="detail-val note-text" style="font-weight: 500; color: #334155; line-height: 1.4;">${escapeHtml(tx.note)}</span>
      </div>
    `;
  }

  if (body) {
    body.innerHTML = `
      <div class="paisa-detail-hero ${isRecv ? 'hero-recv' : 'hero-spent'}">
        <div class="detail-hero-tag">${isRecv ? '🟢 RECEIVED / INFLOW' : '🔴 EXPENSE / OUTFLOW'}</div>
        <div class="detail-hero-amt">${isRecv ? '+' : '−'}₹${formatPaisaAmount(amt)}</div>
      </div>
      <div class="paisa-detail-list">
        <div class="paisa-detail-row">
          <span class="detail-label"><i class="fa-solid fa-user"></i> Party / Payee</span>
          <span class="detail-val"><strong>${escapeHtml(tx.client_payee || '—')}</strong></span>
        </div>
        <div class="paisa-detail-row">
          <span class="detail-label"><i class="fa-solid fa-calendar-day"></i> Transaction Date</span>
          <span class="detail-val" style="font-weight: 600;">📅 ${escapeHtml(formattedDate)}</span>
        </div>
        <div class="paisa-detail-row">
          <span class="detail-label"><i class="fa-solid fa-tag"></i> Category</span>
          <span class="detail-val"><span class="paisa-detail-cat-badge">${escapeHtml((tx.category || (isRecv ? 'Client Fee' : 'Expense')).toUpperCase())}</span></span>
        </div>
        <div class="paisa-detail-row">
          <span class="detail-label"><i class="fa-solid fa-wallet"></i> Payment Mode</span>
          <span class="detail-val">${modeIcon} ${escapeHtml(tx.payment_mode || 'Cash')}</span>
        </div>
        ${ticketRow}
        ${caseRow}
        ${taskRow}
        ${noteRow}
      </div>
    `;
  }

  const editBtn = document.getElementById('paisaDetailEditBtn');
  if (editBtn) {
    editBtn.onclick = () => {
      closePaisaModal('paisaDetailModal');
      if (tx.type === 'received') {
        openPaisaReceivedModal(tx.id);
      } else {
        openPaisaSpendModal(tx.id);
      }
    };
  }

  const deleteBtn = document.getElementById('paisaDetailDeleteBtn');
  if (deleteBtn) {
    deleteBtn.onclick = () => {
      deletePaisaTransaction(tx.id);
    };
  }

  const modal = document.getElementById('paisaDetailModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('active');
  }
}

function deletePaisaTransaction(id) {
  const idx = allPaisaTransactions.findIndex(t => t.id === id);
  if (idx === -1) return;

  paisaDeletedItem = {
    index: idx,
    item: allPaisaTransactions[idx]
  };

  allPaisaTransactions.splice(idx, 1);
  savePaisaTransactions(true);
  closePaisaModal('paisaDetailModal');

  if (typeof ensureSupabaseClient === 'function' && ensureSupabaseClient()) {
    (async () => {
      try {
        if (id && !id.startsWith('tx_') && !id.startsWith('ca_')) {
          await supabaseClient.from('transactions').delete().eq('id', id);
        }
      } catch (err) {
        console.warn('Supabase delete error:', err);
      }
    })();
  }

  showPaisaToastWithUndo(`🗑️ Transaction deleted. <button type="button" class="paisa-toast-undo-btn" onclick="undoPaisaDelete()">UNDO (5s)</button>`);
}

function showPaisaToastWithUndo(htmlContent) {
  const toast = document.getElementById('paisaToast');
  if (!toast) return;

  if (paisaUndoTimer) clearTimeout(paisaUndoTimer);

  toast.innerHTML = htmlContent;
  toast.classList.remove('hidden');
  toast.classList.add('active');

  paisaUndoTimer = setTimeout(() => {
    paisaDeletedItem = null;
    hidePaisaToast();
  }, 5000);
}

function undoPaisaDelete() {
  if (!paisaDeletedItem) return;

  if (paisaUndoTimer) clearTimeout(paisaUndoTimer);

  const restoredItem = paisaDeletedItem.item;
  allPaisaTransactions.splice(paisaDeletedItem.index, 0, restoredItem);
  paisaDeletedItem = null;

  savePaisaTransactions(true);
  hidePaisaToast();
  showPaisaToast('✓ Transaction restored');

  if (typeof ensureSupabaseClient === 'function' && ensureSupabaseClient() && restoredItem) {
    (async () => {
      try {
        const payload = {
          type: restoredItem.type || 'spent',
          amount: restoredItem.amount,
          client_payee: restoredItem.client_payee,
          category: restoredItem.category || 'other',
          mode: (restoredItem.payment_mode || '').toLowerCase() === 'online' ? 'online' : 'cash',
          case_id: restoredItem.case_no || null,
          note: restoredItem.note || '',
          txn_date: restoredItem.date || getTodayDateString()
        };
        const { data: insData, error: insErr } = await supabaseClient.from('transactions').insert([payload]).select();
        if (!insErr && insData && insData[0]) {
          restoredItem.id = String(insData[0].id);
          savePaisaTransactions(false);
        }
      } catch (err) {
        console.warn('Supabase restore note:', err);
      }
    })();
  }
}

function showPaisaToast(msg) {
  const toast = document.getElementById('paisaToast');
  if (!toast) return;

  toast.textContent = msg;
  toast.classList.remove('hidden');
  toast.classList.add('active');

  setTimeout(() => {
    hidePaisaToast();
  }, 3000);
}

function hidePaisaToast() {
  const toast = document.getElementById('paisaToast');
  if (toast) {
    toast.classList.remove('active');
    toast.classList.add('hidden');
  }
}

function openPaisaReportsModal() {
  const content = document.getElementById('paisaReportsContent');
  const subtitle = document.getElementById('paisaReportsPeriodSubtitle');
  if (!content) return;

  const currentMonthKey = getTodayDateString().slice(0, 7);
  let filtered = [];
  let periodName = 'This Month';

  if (paisaSelectedMonth === 'current') {
    filtered = allPaisaTransactions.filter(t => (t.date || '').startsWith(currentMonthKey));
    periodName = 'This Month';
  } else if (paisaSelectedMonth === 'all') {
    filtered = allPaisaTransactions.slice();
    periodName = 'All Time';
  } else {
    filtered = allPaisaTransactions.filter(t => (t.date || '').startsWith(paisaSelectedMonth));
    const [y, m] = paisaSelectedMonth.split('-');
    const d = new Date(parseInt(y), parseInt(m) - 1, 1);
    periodName = d.toLocaleString('en-IN', { month: 'long', year: 'numeric' });
  }

  if (subtitle) subtitle.textContent = `Period: ${periodName}`;

  let totalRecv = 0;
  let totalSpent = 0;
  let totalTransferred = 0;
  const catMap = { ticket: 0, travel: 0, court: 0, food: 0, print: 0, other: 0 };
  const caseMap = {};
  let ajaySpent = 0;
  let zameerSpent = 0;

  filtered.forEach(t => {
    const amt = parseFloat(t.amount) || 0;
    if (t.type === 'received') {
      totalRecv += amt;
    } else if (t.type === 'spent') {
      totalSpent += amt;
      const cat = (t.category || 'other').toLowerCase();
      if (catMap[cat] !== undefined) catMap[cat] += amt;
      else catMap.other += amt;

      if (cat === 'ticket') {
        const v = (t.ticket_details?.vendor || '').toLowerCase();
        if (v === 'zameer' || (t.client_payee || '').toLowerCase().includes('zameer')) zameerSpent += amt;
        else ajaySpent += amt;
      }
    } else if (t.type === 'transfer_to_personal') {
      totalTransferred += amt;
    }

    if (t.case_no) {
      if (!caseMap[t.case_no]) {
        caseMap[t.case_no] = {
          caseNo: t.case_no,
          title: t.case_name || t.case_no,
          received: 0,
          spent: 0
        };
      }
      if (t.type === 'received') caseMap[t.case_no].received += amt;
      else if (t.type === 'spent') caseMap[t.case_no].spent += amt;
    }
  });

  const net = totalRecv - totalSpent - totalTransferred;

  let catRows = '';
  Object.keys(catMap).forEach(k => {
    const amt = catMap[k];
    const pct = totalSpent > 0 ? Math.round((amt / totalSpent) * 100) : 0;
    catRows += `
      <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
        <span>${k.toUpperCase()}</span>
        <span>₹${formatPaisaAmount(amt)} (${pct}%)</span>
      </div>
    `;
  });

  let caseRows = '';
  const caseList = Object.values(caseMap).sort((a, b) => (b.received - b.spent) - (a.received - a.spent));
  if (caseList.length > 0) {
    caseList.slice(0, 5).forEach(c => {
      const cNet = c.received - c.spent;
      caseRows += `
        <div style="display: flex; justify-content: space-between; font-size: 11.5px; padding: 4px 0; border-bottom: 1px dashed #e2e8f0;">
          <span>${escapeHtml(c.caseNo)}</span>
          <span style="color: ${cNet >= 0 ? '#059669' : '#dc2626'}; font-weight: 700;">${cNet >= 0 ? '+' : '−'}₹${formatPaisaAmount(Math.abs(cNet))}</span>
        </div>
      `;
    });
  } else {
    caseRows = `<div style="font-size: 11.5px; color: #94a3b8; font-style: italic;">No case transactions logged</div>`;
  }

  content.innerHTML = `
    <div style="background: #0f172a; color: #ffffff; border-radius: 10px; padding: 14px; margin-bottom: 14px;">
      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8; margin-bottom: 4px;">Summary (${escapeHtml(periodName)})</div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <span style="color: #34d399; font-size: 14px; font-weight: 700;">+₹${formatPaisaAmount(totalRecv)}</span>
        <span style="color: #f87171; font-size: 14px; font-weight: 700;">−₹${formatPaisaAmount(totalSpent)}</span>
      </div>
      <div style="border-top: 1px solid #334155; padding-top: 6px; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 12px; color: #cbd5e1;">Net Balance:</span>
        <span style="font-size: 16px; font-weight: 800; color: ${net >= 0 ? '#10b981' : '#f87171'};">${net < 0 ? '−' : ''}₹${formatPaisaAmount(Math.abs(net))}</span>
      </div>
    </div>

    <div style="margin-bottom: 14px;">
      <h4 style="margin: 0 0 6px 0; font-size: 12.5px; font-weight: 700; color: #334155;">Category Breakdown</h4>
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 12px;">
        ${catRows}
      </div>
    </div>

    <div style="margin-bottom: 14px;">
      <h4 style="margin: 0 0 6px 0; font-size: 12.5px; font-weight: 700; color: #334155;">Top Cases (P&amp;L)</h4>
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 12px;">
        ${caseRows}
      </div>
    </div>

    <div>
      <h4 style="margin: 0 0 6px 0; font-size: 12.5px; font-weight: 700; color: #334155;">Ticket Vendors</h4>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
        <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; padding: 8px 10px; font-size: 11.5px;">
          <div style="font-weight: 700; color: #1e40af;">Ajay</div>
          <div style="color: #3b82f6; font-size: 13px; font-weight: 800;">₹${formatPaisaAmount(ajaySpent)}</div>
        </div>
        <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; padding: 8px 10px; font-size: 11.5px;">
          <div style="font-weight: 700; color: #1e40af;">Zameer</div>
          <div style="color: #3b82f6; font-size: 13px; font-weight: 800;">₹${formatPaisaAmount(zameerSpent)}</div>
        </div>
      </div>
    </div>
  `;

  const modal = document.getElementById('paisaReportsModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('active');
  }
}

function sharePaisaWhatsAppReport() {
  const currentMonthKey = getTodayDateString().slice(0, 7);
  let filtered = [];
  let periodName = 'This Month';

  if (paisaSelectedMonth === 'current') {
    filtered = allPaisaTransactions.filter(t => (t.date || '').startsWith(currentMonthKey));
    periodName = 'This Month';
  } else if (paisaSelectedMonth === 'all') {
    filtered = allPaisaTransactions.slice();
    periodName = 'All Time';
  } else {
    filtered = allPaisaTransactions.filter(t => (t.date || '').startsWith(paisaSelectedMonth));
    const [y, m] = paisaSelectedMonth.split('-');
    const d = new Date(parseInt(y), parseInt(m) - 1, 1);
    periodName = d.toLocaleString('en-IN', { month: 'long', year: 'numeric' });
  }

  let totalRecv = 0;
  let totalSpent = 0;
  let totalTransferred = 0;
  const catMap = { ticket: 0, travel: 0, court: 0, food: 0, print: 0, other: 0 };
  const caseMap = {};

  filtered.forEach(t => {
    const amt = parseFloat(t.amount) || 0;
    if (t.type === 'received') totalRecv += amt;
    else if (t.type === 'spent') {
      totalSpent += amt;
      const cat = (t.category || 'other').toLowerCase();
      if (catMap[cat] !== undefined) catMap[cat] += amt;
      else catMap.other += amt;
    } else if (t.type === 'transfer_to_personal') {
      totalTransferred += amt;
    }
    if (t.case_no) {
      if (!caseMap[t.case_no]) caseMap[t.case_no] = { caseNo: t.case_no, received: 0, spent: 0 };
      if (t.type === 'received') caseMap[t.case_no].received += amt;
      else if (t.type === 'spent') caseMap[t.case_no].spent += amt;
    }
  });

  const net = totalRecv - totalSpent - totalTransferred;

  let text = `*📊 ADVOCATE FINANCE REPORT*\n`;
  text += `*Period:* ${periodName}\n`;
  text += `-----------------------------\n`;
  text += `🟢 *Total Received:* ₹${formatPaisaAmount(totalRecv)}\n`;
  text += `🔴 *Total Spent:* ₹${formatPaisaAmount(totalSpent)}\n`;
  if (totalTransferred > 0) {
    text += `🟣 *Transferred to Personal:* ₹${formatPaisaAmount(totalTransferred)}\n`;
  }
  text += `💰 *Net Balance:* ${net < 0 ? '−' : ''}₹${formatPaisaAmount(Math.abs(net))}\n`;
  text += `-----------------------------\n`;
  text += `*Category Breakdown:*\n`;
  Object.keys(catMap).forEach(k => {
    if (catMap[k] > 0) {
      text += `• ${k.charAt(0).toUpperCase() + k.slice(1)}: ₹${formatPaisaAmount(catMap[k])}\n`;
    }
  });
  text += `-----------------------------\n`;
  const caseList = Object.values(caseMap).sort((a, b) => (b.received - b.spent) - (a.received - a.spent));
  if (caseList.length > 0) {
    text += `*Top Cases (P&L):*\n`;
    caseList.slice(0, 3).forEach((c, idx) => {
      const cNet = c.received - c.spent;
      text += `${idx + 1}. ${c.caseNo}: ${cNet >= 0 ? '+' : '−'}₹${formatPaisaAmount(Math.abs(cNet))}\n`;
    });
    text += `-----------------------------\n`;
  }
  text += `_Generated via CaseBook Chambers_`;

  const encoded = encodeURIComponent(text);
  window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
}

function closePaisaModal(modalId) {
  const modal = document.getElementById('modalId') || document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    modal.classList.add('hidden');
  }
}

function triggerPaisaDatePicker(inputId) {
  const el = document.getElementById(inputId);
  if (!el) return;
  el.focus();
  if (typeof el.showPicker === 'function') {
    try { el.showPicker(); } catch (e) {}
  }
}

function purgeAllDummyStorage() {
  try {
    // 1. Purge legacy dummy accounts
    const rawAcc = safeStorage.get('cmChambersAccounts');
    if (rawAcc) {
      const parsed = typeof rawAcc === 'string' ? JSON.parse(rawAcc) : rawAcc;
      if (Array.isArray(parsed)) {
        const cleaned = parsed.filter(r => 
          !String(r.id || '').startsWith('acc_seed_') &&
          !['Client A', 'Client 1', 'Client 2', 'Chambers Expense'].includes(r.client_name)
        );
        safeStorage.set('cmChambersAccounts', JSON.stringify(cleaned));
        allAccountRecords = cleaned;
      }
    }

    // 2. Purge legacy dummy paisa transactions
    const rawPaisa = safeStorage.get('paisa_transactions');
    if (rawPaisa) {
      const parsed = typeof rawPaisa === 'string' ? JSON.parse(rawPaisa) : rawPaisa;
      if (Array.isArray(parsed)) {
        const cleaned = parsed.filter(t => 
          !String(t.id || '').startsWith('paisa_seed_') &&
          !String(t.id || '').startsWith('acc_seed_') &&
          !String(t.id || '').startsWith('ca_') &&
          !['Client A', 'Client 1', 'Client 2', 'Chambers Expense'].includes(t.client_payee)
        );
        safeStorage.set('paisa_transactions', JSON.stringify(cleaned));
        allPaisaTransactions = cleaned;
      }
    }

    // 3. Purge dummy personal wallet entries
    const rawWallet = safeStorage.get('paisa_personal_wallet');
    if (rawWallet) {
      const parsed = typeof rawWallet === 'string' ? JSON.parse(rawWallet) : rawWallet;
      if (parsed && Array.isArray(parsed.transactions)) {
        const cleaned = parsed.transactions.filter(t =>
          !String(t.id || '').startsWith('seed_') &&
          !String(t.note || '').toLowerCase().includes('dummy')
        );
        safeStorage.set('paisa_personal_wallet', JSON.stringify({ transactions: cleaned }));
        allPersonalTransactions = cleaned;
      }
    }
  } catch (e) {
    console.warn('Error purging dummy data:', e);
  }
}

function clearPaisaLocalStorage() {
  allPaisaTransactions = [];
  allPersonalTransactions = [];
  try {
    safeStorage.set('paisa_transactions', '[]');
    safeStorage.set('paisa_personal_wallet', JSON.stringify({ transactions: [] }));
    safeStorage.set('cmChambersAccounts', '[]');
  } catch (e) {}
  allAccountRecords = [];
  updatePaisaBadge();
  if (currentActiveTabId === 'paisa') {
    renderPaisaTab();
    renderPersonalAccountCard();
    renderPersonalTransactionsFeed();
  }
  if (typeof showPaisaToast === 'function') {
    showPaisaToast('🧹 Local dummy data successfully cleared');
  }
}

function initPaisaTab() {
  purgeAllDummyStorage();
  loadPaisaFromStorage();
  loadPersonalFromStorage();
  updatePaisaBadge();
  if (currentActiveTabId === 'paisa') {
    renderPaisaTab();
  }
  if (typeof fetchPaisaFromSupabase === 'function') {
    fetchPaisaFromSupabase(false);
  }
}

if (typeof purgeAllDummyStorage !== 'undefined') window.purgeAllDummyStorage = purgeAllDummyStorage;
if (typeof clearPaisaLocalStorage !== 'undefined') window.clearPaisaLocalStorage = clearPaisaLocalStorage;
if (typeof allPaisaTransactions !== 'undefined') window.allPaisaTransactions = allPaisaTransactions;
if (typeof initPaisaTab !== 'undefined') window.initPaisaTab = initPaisaTab;
if (typeof renderPaisaTab !== 'undefined') window.renderPaisaTab = renderPaisaTab;
if (typeof handlePaisaMonthChange !== 'undefined') window.handlePaisaMonthChange = handlePaisaMonthChange;
if (typeof openPaisaReceivedModal !== 'undefined') window.openPaisaReceivedModal = openPaisaReceivedModal;
if (typeof openPaisaSpendModal !== 'undefined') window.openPaisaSpendModal = openPaisaSpendModal;
if (typeof closePaisaModal !== 'undefined') window.closePaisaModal = closePaisaModal;
if (typeof setPaisaMode !== 'undefined') window.setPaisaMode = setPaisaMode;
if (typeof triggerPaisaDatePicker !== 'undefined') window.triggerPaisaDatePicker = triggerPaisaDatePicker;
if (typeof setPaisaSpendCategory !== 'undefined') window.setPaisaSpendCategory = setPaisaSpendCategory;
if (typeof calculatePaisaTicketTotal !== 'undefined') window.calculatePaisaTicketTotal = calculatePaisaTicketTotal;
if (typeof handlePaisaClientInput !== 'undefined') window.handlePaisaClientInput = handlePaisaClientInput;
if (typeof handlePaisaClientKeydown !== 'undefined') window.handlePaisaClientKeydown = handlePaisaClientKeydown;
if (typeof selectPaisaSuggestion !== 'undefined') window.selectPaisaSuggestion = selectPaisaSuggestion;
if (typeof applyPaisaLinkedCase !== 'undefined') window.applyPaisaLinkedCase = applyPaisaLinkedCase;
if (typeof handleSavePaisaReceived !== 'undefined') window.handleSavePaisaReceived = handleSavePaisaReceived;
if (typeof handleSavePaisaSpend !== 'undefined') window.handleSavePaisaSpend = handleSavePaisaSpend;
if (typeof openPaisaDetailModal !== 'undefined') window.openPaisaDetailModal = openPaisaDetailModal;
if (typeof deletePaisaTransaction !== 'undefined') window.deletePaisaTransaction = deletePaisaTransaction;
if (typeof undoPaisaDelete !== 'undefined') window.undoPaisaDelete = undoPaisaDelete;
if (typeof showPaisaToast !== 'undefined') window.showPaisaToast = showPaisaToast;
if (typeof hidePaisaToast !== 'undefined') window.hidePaisaToast = hidePaisaToast;
if (typeof openPaisaReportsModal !== 'undefined') window.openPaisaReportsModal = openPaisaReportsModal;
if (typeof sharePaisaWhatsAppReport !== 'undefined') window.sharePaisaWhatsAppReport = sharePaisaWhatsAppReport;
// New exports
if (typeof openPaisaTransferModal !== 'undefined') window.openPaisaTransferModal = openPaisaTransferModal;
if (typeof handlePaisaTransferToPersonal !== 'undefined') window.handlePaisaTransferToPersonal = handlePaisaTransferToPersonal;
if (typeof openPaisaPersonalSpendModal !== 'undefined') window.openPaisaPersonalSpendModal = openPaisaPersonalSpendModal;
if (typeof handlePaisaPersonalSpend !== 'undefined') window.handlePaisaPersonalSpend = handlePaisaPersonalSpend;
if (typeof setPaisaTxnFilter !== 'undefined') window.setPaisaTxnFilter = setPaisaTxnFilter;
if (typeof handlePaisaPeriodChange !== 'undefined') window.handlePaisaPeriodChange = handlePaisaPeriodChange;
if (typeof handlePaisaPersonalPeriodChange !== 'undefined') window.handlePaisaPersonalPeriodChange = handlePaisaPersonalPeriodChange;

// ==============================================================================
// PAISA: Personal Account — localStorage wallet (Supabase-ready)
// ==============================================================================

function loadPersonalFromStorage() {
  try {
    const raw = safeStorage.get('paisa_personal_wallet');
    if (raw) {
      const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
      if (parsed && Array.isArray(parsed.transactions)) {
        allPersonalTransactions = parsed.transactions;
        return;
      }
    }
  } catch (e) {}
  allPersonalTransactions = [];
}

function savePersonalData(updateUi = true) {
  try {
    safeStorage.set('paisa_personal_wallet', JSON.stringify({ transactions: allPersonalTransactions }));
  } catch (e) {
    console.error('Failed to save personal wallet:', e);
  }
  if (updateUi && currentActiveTabId === 'paisa') {
    renderPersonalAccountCard();
    renderPersonalTransactionsFeed();
  }
}

function getPersonalBalance() {
  let balance = 0;
  allPersonalTransactions.forEach(t => {
    const amt = parseFloat(t.amount) || 0;
    if (t.type === 'transfer_in') balance += amt;
    else if (t.type === 'personal_spent') balance -= amt;
  });
  return balance;
}

function getVirtualNetBalance() {
  // Compute current virtual net balance from all paisa transactions
  let recv = 0, spent = 0, transferred = 0;
  allPaisaTransactions.forEach(t => {
    const amt = parseFloat(t.amount) || 0;
    if (t.type === 'received') recv += amt;
    else if (t.type === 'spent') spent += amt;
    else if (t.type === 'transfer_to_personal') transferred += amt;
  });
  return recv - spent - transferred;
}

function renderPersonalAccountCard() {
  const balanceEl = document.getElementById('paisaPersonalBalance');
  const transferredInEl = document.getElementById('paisaPersonalTransferredIn');
  const spentEl = document.getElementById('paisaPersonalSpentThisMonth');
  const recentListEl = document.getElementById('paisaPersonalRecentList');
  const rangeSel = document.getElementById('paisaPersonalTimeRangeSelect');
  if (!balanceEl) return;

  if (rangeSel && rangeSel.value !== paisaPersonalSelectedPeriod) {
    rangeSel.value = (paisaPersonalSelectedPeriod === 'current') ? 'month' : paisaPersonalSelectedPeriod;
  }

  const balance = getPersonalBalance();
  balanceEl.textContent = `${balance < 0 ? '−' : ''}₹${formatPaisaAmount(Math.abs(balance))}`;
  balanceEl.style.color = '#ffffff';

  // Period calculations
  const filterFn = getPaisaDateRangeFilter(paisaPersonalSelectedPeriod);
  let periodIn = 0;
  let periodOut = 0;
  allPersonalTransactions.forEach(t => {
    if (filterFn(t)) {
      const amt = parseFloat(t.amount) || 0;
      if (t.type === 'transfer_in') periodIn += amt;
      else if (t.type === 'personal_spent') periodOut += amt;
    }
  });
  if (transferredInEl) transferredInEl.textContent = `₹${formatPaisaAmount(periodIn)}`;
  if (spentEl) spentEl.textContent = `₹${formatPaisaAmount(periodOut)}`;

  // Render personal card mini graph
  renderPaisaPersonalGraph();

  // Last 3 personal expenses (if recent list exists)
  if (!recentListEl) return;
  const spentOnly = allPersonalTransactions
    .filter(t => t.type === 'personal_spent')
    .sort((a, b) => (b.date || '').localeCompare(a.date || '') || (b.created_at || '').localeCompare(a.created_at || ''));
  const last3 = spentOnly.slice(0, 3);

  if (last3.length === 0) {
    recentListEl.innerHTML = `<div class="paisa-personal-empty">No personal expenses yet</div>`;
    return;
  }

  let html = '';
  last3.forEach(t => {
    const amt = parseFloat(t.amount) || 0;
    const note = escapeHtml(t.note || 'Personal expense');
    const dateStr = t.date ? (() => {
      try {
        const [y, m, d] = t.date.split('-');
        return new Date(parseInt(y), parseInt(m) - 1, parseInt(d)).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
      } catch (e) { return t.date; }
    })() : '';
    html += `
      <div class="paisa-personal-recent-item">
        <div class="paisa-personal-recent-icon"><i class="fa-solid fa-minus"></i></div>
        <div class="paisa-personal-recent-info">
          <div class="paisa-personal-recent-note">${note}</div>
          <div class="paisa-personal-recent-date">${dateStr}</div>
        </div>
        <div class="paisa-personal-recent-amt">−₹${formatPaisaAmount(amt)}</div>
      </div>
    `;
  });
  recentListEl.innerHTML = html;
}

function renderPaisaPersonalGraph() {
  const container = document.getElementById('paisaPersonalGraphContainer');
  if (!container) return;

  const currentMonthKey = getTodayDateString().slice(0, 7);
  let thisMonthIn = 0;
  let thisMonthOut = 0;
  (allPersonalTransactions || []).forEach(t => {
    if ((t.date || '').startsWith(currentMonthKey)) {
      const amt = parseFloat(t.amount) || 0;
      if (t.type === 'transfer_in') thisMonthIn += amt;
      else if (t.type === 'personal_spent') thisMonthOut += amt;
    }
  });

  const spendPct = thisMonthIn > 0 ? Math.min(Math.round((thisMonthOut / thisMonthIn) * 100), 100) : (thisMonthOut > 0 ? 100 : 0);
  const savePct = Math.max(100 - spendPct, 0);

  // 7-day personal spend activity
  const dayBars = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const dayLabel = i === 0 ? 'Today' : (i === 1 ? 'Yest' : d.toLocaleDateString('en-IN', { weekday: 'narrow' }));

    let daySpent = 0;
    (allPersonalTransactions || []).forEach(t => {
      if (t.date === dateStr && t.type === 'personal_spent') {
        daySpent += (parseFloat(t.amount) || 0);
      }
    });
    dayBars.push({ dateStr, dayLabel, daySpent });
  }

  const maxSpend = Math.max(...dayBars.map(b => b.daySpent), 300);

  let barsHtml = '';
  dayBars.forEach(b => {
    const h = Math.max(Math.round((b.daySpent / maxSpend) * 30), b.daySpent > 0 ? 5 : 2);
    const title = `${b.dateStr}: −₹${formatPaisaAmount(b.daySpent)}`;

    barsHtml += `
      <div class="paisa-chart-col" title="${escapeHtml(title)}">
        <div class="paisa-chart-bars-wrap" style="height: 32px; justify-content: flex-end;">
          <div class="paisa-mini-bar bar-personal ${b.daySpent > 0 ? 'has-val' : ''}" style="height: ${h}px; width: 8px;"></div>
        </div>
        <span class="paisa-chart-day-lbl">${b.dayLabel}</span>
      </div>
    `;
  });

  container.innerHTML = `
    <div class="paisa-graph-header">
      <span class="paisa-graph-title" style="color: #c4b5fd;"><i class="fa-solid fa-gauge-high"></i> WALLET RETENTION &amp; DAILY SPENDING</span>
      <div class="paisa-graph-legends">
        <span class="legend-in" style="color: #6ee7b7;"><span class="legend-dot" style="background: #6ee7b7;"></span> Avail ${savePct}%</span>
        <span class="legend-out" style="color: #fca5a5;"><span class="legend-dot" style="background: #fca5a5;"></span> Spent ${spendPct}%</span>
      </div>
    </div>
    <div class="paisa-ratio-track" style="background: rgba(255, 255, 255, 0.1);">
      <div class="paisa-ratio-fill" style="width: ${savePct}%; background: linear-gradient(90deg, #10b981, #34d399);"></div>
      <div class="paisa-ratio-fill" style="width: ${spendPct}%; background: linear-gradient(90deg, #f43f5e, #fb7185);"></div>
    </div>
    <div class="paisa-sparkline-row">
      ${barsHtml}
    </div>
  `;
}

// --- Transfer to Personal Modal ---

function openPaisaTransferModal() {
  const modal = document.getElementById('paisaTransferModal');
  if (!modal) return;
  const form = document.getElementById('paisaTransferForm');
  if (form) form.reset();
  const dateInput = document.getElementById('paisaTransferDate');
  if (dateInput) {
    dateInput.value = getTodayDateString();
  }
  const availEl = document.getElementById('paisaTransferAvailableBalance');
  if (availEl) {
    const net = getVirtualNetBalance();
    availEl.textContent = `₹${formatPaisaAmount(net)}`;
    availEl.style.color = net < 0 ? '#dc2626' : '#059669';
  }
  modal.classList.remove('hidden');
  modal.classList.add('active');
  const amtInput = document.getElementById('paisaTransferAmount');
  if (amtInput) setTimeout(() => amtInput.focus(), 100);
}

function handlePaisaTransferToPersonal(e) {
  e.preventDefault();
  const amount = parseFloat(document.getElementById('paisaTransferAmount')?.value || 0);
  const note = (document.getElementById('paisaTransferNote')?.value || '').trim();
  const date = document.getElementById('paisaTransferDate')?.value || getTodayDateString();

  if (!amount || amount <= 0) {
    showPaisaToast('⚠️ Please enter a valid amount');
    return;
  }

  const virtualNet = getVirtualNetBalance();
  if (amount > virtualNet) {
    showPaisaToast('⚠️ Insufficient balance in Virtual Account');
    return;
  }

  const txId = `paisa_transfer_${Date.now()}`;
  const personalTxId = `personal_in_${Date.now()}`;
  const now = new Date().toISOString();

  // Record deduction in business transactions as type 'transfer_to_personal' (Virtual DEBIT)
  const businessTx = {
    id: txId,
    type: 'transfer_to_personal',
    amount,
    note: note || 'Transfer to Personal',
    date,
    payment_mode: 'Cash',
    client_payee: '👤 Personal Wallet',
    created_at: now
  };
  allPaisaTransactions.unshift(businessTx);
  savePaisaTransactions(false);

  // Record receipt in personal wallet (Personal CREDIT)
  const personalTx = {
    id: personalTxId,
    type: 'transfer_in',
    amount,
    note: note || 'Transfer from Virtual',
    category: '',
    date,
    created_at: now
  };
  allPersonalTransactions.unshift(personalTx);
  savePersonalData(false);

  // Attempt atomic Supabase sync if connected
  if (typeof ensureSupabaseClient === 'function' && ensureSupabaseClient()) {
    (async () => {
      try {
        const results = await Promise.allSettled([
          supabaseClient.from('transactions').insert([{
            type: 'transfer_to_personal',
            amount,
            mode: 'cash',
            client_payee: 'Personal Wallet',
            note: note || 'Transfer to Personal',
            txn_date: date
          }]).select(),
          supabaseClient.from('personal_transactions').insert([{
            type: 'transfer_in',
            amount,
            note: note || 'Transfer from Virtual',
            txn_date: date
          }]).select()
        ]);
        results.forEach((r, idx) => {
          if (r.status === 'fulfilled' && r.value?.error) {
            console.error(`Supabase transfer sync [${idx === 0 ? 'transactions' : 'personal_transactions'}] error:`, r.value.error);
          }
        });
        if (results[0].status === 'fulfilled' && results[0].value?.data?.[0]) {
          const bIdx = allPaisaTransactions.findIndex(t => t.id === txId);
          if (bIdx !== -1) {
            allPaisaTransactions[bIdx].id = String(results[0].value.data[0].id);
            savePaisaTransactions(false);
          }
        }
        if (results[1].status === 'fulfilled' && results[1].value?.data?.[0]) {
          const pIdx = allPersonalTransactions.findIndex(t => t.id === personalTxId);
          if (pIdx !== -1) {
            allPersonalTransactions[pIdx].id = String(results[1].value.data[0].id);
            savePersonalData(false);
          }
        }
      } catch (err) {
        console.warn('Supabase transfer sync:', err);
      }
    })();
  }

  closePaisaModal('paisaTransferModal');
  showPaisaToast(`✅ ₹${formatPaisaAmount(amount)} transferred to Personal Account`);
  renderPaisaTab();
}

// --- Personal Spend Modal ---

function openPaisaPersonalSpendModal() {
  const modal = document.getElementById('paisaPersonalSpendModal');
  if (!modal) return;
  const form = document.getElementById('paisaPersonalSpendForm');
  if (form) form.reset();
  const dateInput = document.getElementById('paisaPersonalSpendDate');
  if (dateInput) {
    dateInput.value = getTodayDateString();
  }
  modal.classList.remove('hidden');
  modal.classList.add('active');
  const amtInput = document.getElementById('paisaPersonalSpendAmount');
  if (amtInput) setTimeout(() => amtInput.focus(), 100);
}

function handlePaisaPersonalSpend(e) {
  e.preventDefault();
  const amount = parseFloat(document.getElementById('paisaPersonalSpendAmount')?.value || 0);
  const note = (document.getElementById('paisaPersonalSpendNote')?.value || '').trim();
  const category = document.getElementById('paisaPersonalSpendCategory')?.value || '';
  const date = document.getElementById('paisaPersonalSpendDate')?.value || getTodayDateString();

  if (!amount || amount <= 0) {
    showPaisaToast('⚠️ Please enter a valid amount');
    return;
  }
  if (!note) {
    showPaisaToast('⚠️ Please describe what you spent on');
    return;
  }

  const newPersonalId = `personal_spent_${Date.now()}`;
  const personalTx = {
    id: newPersonalId,
    type: 'personal_spent',
    amount,
    note,
    category,
    date,
    created_at: new Date().toISOString()
  };
  allPersonalTransactions.unshift(personalTx);
  savePersonalData(false);

  // Attempt atomic Supabase sync if connected
  if (typeof ensureSupabaseClient === 'function' && ensureSupabaseClient()) {
    (async () => {
      try {
        const { data: insData, error: insErr } = await supabaseClient.from('personal_transactions').insert([{
          type: 'personal_spent',
          amount,
          note,
          category,
          txn_date: date
        }]).select();
        if (insErr) {
          console.error('Supabase personal_spent insert error:', insErr);
        } else if (insData && insData[0]) {
          const curIdx = allPersonalTransactions.findIndex(t => t.id === newPersonalId);
          if (curIdx !== -1) {
            allPersonalTransactions[curIdx].id = String(insData[0].id);
            savePersonalData(false);
          }
        }
      } catch (err) {
        console.warn('Supabase personal spend sync:', err);
      }
    })();
  }

  closePaisaModal('paisaPersonalSpendModal');
  showPaisaToast(`✅ Personal expense ₹${formatPaisaAmount(amount)} saved`);
  renderPersonalAccountCard();
  renderPersonalTransactionsFeed();
}

// --- Online / Cash split helper ---

function updatePaisaOnlineCashStats(filteredTransactions) {
  const onlineEl = document.getElementById('paisaRecvOnline');
  const cashEl = document.getElementById('paisaRecvCash');
  if (!onlineEl || !cashEl) return;

  let onlineTotal = 0;
  let cashTotal = 0;

  filteredTransactions.forEach(t => {
    if (t.type !== 'received') return;
    const amt = parseFloat(t.amount) || 0;
    const mode = (t.payment_mode || 'Cash').toLowerCase();
    // 'cash' → Cash; anything else (upi, bank, online, transfer) → Online
    if (mode === 'cash') cashTotal += amt;
    else onlineTotal += amt;
  });

  onlineEl.textContent = `₹${formatPaisaAmount(onlineTotal)}`;
  cashEl.textContent = `₹${formatPaisaAmount(cashTotal)}`;
}

// --- Transaction Multi-Filter & Search State ---
var paisaTxnSearchQuery = '';
var paisaTxnModeFilter = 'all'; // 'all' | 'cash' | 'online'
var paisaPersonalTxnSearchQuery = '';

function handlePaisaTxnSearch(val) {
  paisaTxnSearchQuery = (val || '').trim().toLowerCase();
  const clearBtn = document.getElementById('paisaSearchClearBtn');
  if (clearBtn) clearBtn.classList.toggle('hidden', !paisaTxnSearchQuery);
  const filterFn = getPaisaDateRangeFilter(paisaSelectedPeriod);
  const filtered = allPaisaTransactions.filter(filterFn);
  renderPaisaTransactionsFeed(getFilteredPaisaTxns(filtered));
}

function clearPaisaTxnSearch() {
  paisaTxnSearchQuery = '';
  const input = document.getElementById('paisaTxnSearchInput');
  const clearBtn = document.getElementById('paisaSearchClearBtn');
  if (input) input.value = '';
  if (clearBtn) clearBtn.classList.add('hidden');
  const filterFn = getPaisaDateRangeFilter(paisaSelectedPeriod);
  const filtered = allPaisaTransactions.filter(filterFn);
  renderPaisaTransactionsFeed(getFilteredPaisaTxns(filtered));
}

function handlePaisaModeFilterChange(val) {
  paisaTxnModeFilter = val || 'all';
  const filterFn = getPaisaDateRangeFilter(paisaSelectedPeriod);
  const filtered = allPaisaTransactions.filter(filterFn);
  renderPaisaTransactionsFeed(getFilteredPaisaTxns(filtered));
}

function handlePaisaPersonalTxnSearch(val) {
  paisaPersonalTxnSearchQuery = (val || '').trim().toLowerCase();
  const clearBtn = document.getElementById('paisaPersonalSearchClearBtn');
  if (clearBtn) clearBtn.classList.toggle('hidden', !paisaPersonalTxnSearchQuery);
  renderPersonalTransactionsFeed();
}

function clearPaisaPersonalTxnSearch() {
  paisaPersonalTxnSearchQuery = '';
  const input = document.getElementById('paisaPersonalTxnSearchInput');
  const clearBtn = document.getElementById('paisaPersonalSearchClearBtn');
  if (input) input.value = '';
  if (clearBtn) clearBtn.classList.add('hidden');
  renderPersonalTransactionsFeed();
}

function getFilteredPaisaTxns(baseList) {
  let list = baseList || allPaisaTransactions.filter(getPaisaDateRangeFilter(paisaSelectedPeriod));

  // 1. Type filter
  if (paisaTxnFilter === 'business') {
    list = list.filter(t => t.type === 'received' || t.type === 'spent');
  } else if (paisaTxnFilter === 'received') {
    list = list.filter(t => t.type === 'received');
  } else if (paisaTxnFilter === 'spent') {
    list = list.filter(t => t.type === 'spent');
  } else if (paisaTxnFilter === 'personal') {
    list = list.filter(t => t.type === 'transfer_to_personal');
  }

  // 2. Mode filter (Cash vs Online)
  if (paisaTxnModeFilter === 'cash') {
    list = list.filter(t => (t.payment_mode || 'Cash').toLowerCase().includes('cash'));
  } else if (paisaTxnModeFilter === 'online') {
    list = list.filter(t => {
      const m = (t.payment_mode || '').toLowerCase();
      return m.includes('online') || m.includes('upi') || m.includes('bank') || m.includes('cheque');
    });
  }

  // 3. Search query filter
  if (paisaTxnSearchQuery) {
    const q = paisaTxnSearchQuery;
    list = list.filter(t => {
      const payee = (t.client_payee || '').toLowerCase();
      const caseNo = (t.case_no || '').toLowerCase();
      const caseName = (t.case_name || '').toLowerCase();
      const note = (t.note || '').toLowerCase();
      const cat = (t.category || '').toLowerCase();
      const amt = String(t.amount || '');
      return payee.includes(q) || caseNo.includes(q) || caseName.includes(q) || note.includes(q) || cat.includes(q) || amt.includes(q);
    });
  }

  return list;
}

function setPaisaTxnFilter(filter, btn) {
  paisaTxnFilter = filter;
  const row = document.getElementById('paisaTxnFilterRow');
  if (row) {
    row.querySelectorAll('.paisa-txn-chip').forEach(c => c.classList.remove('active'));
    if (btn) btn.classList.add('active');
  }
  const filterFn = getPaisaDateRangeFilter(paisaSelectedPeriod);
  const filtered = allPaisaTransactions.filter(filterFn);
  renderPaisaTransactionsFeed(getFilteredPaisaTxns(filtered));
}

// --- Paisa Account Tab Switcher (Virtual vs Personal) ---

var currentPaisaAccountTab = 'virtual';
var paisaPersonalTxnFilter = 'all';

function setPaisaPersonalTxnFilter(filter, btn) {
  paisaPersonalTxnFilter = filter;
  const row = document.getElementById('paisaPersonalTxnFilterRow');
  if (row) {
    row.querySelectorAll('.paisa-txn-chip').forEach(c => c.classList.remove('active'));
    if (btn) btn.classList.add('active');
  }
  renderPersonalTransactionsFeed();
}

function switchPaisaAccountTab(tab) {
  currentPaisaAccountTab = tab || 'virtual';
  const virtualView = document.getElementById('paisaVirtualView');
  const personalView = document.getElementById('paisaPersonalView');
  const virtualBtn = document.getElementById('paisaTabVirtualBtn');
  const personalBtn = document.getElementById('paisaTabPersonalBtn');

  if (currentPaisaAccountTab === 'personal') {
    if (virtualView) virtualView.classList.add('hidden');
    if (personalView) personalView.classList.remove('hidden');
    if (virtualBtn) {
      virtualBtn.classList.remove('active');
      virtualBtn.setAttribute('aria-selected', 'false');
    }
    if (personalBtn) {
      personalBtn.classList.add('active');
      personalBtn.setAttribute('aria-selected', 'true');
    }
    renderPersonalAccountCard();
    renderPersonalTransactionsFeed();
  } else {
    if (virtualView) virtualView.classList.remove('hidden');
    if (personalView) personalView.classList.add('hidden');
    if (virtualBtn) {
      virtualBtn.classList.add('active');
      virtualBtn.setAttribute('aria-selected', 'true');
    }
    if (personalBtn) {
      personalBtn.classList.remove('active');
      personalBtn.setAttribute('aria-selected', 'false');
    }
    renderPaisaTab();
  }
}

function getFilteredPersonalTxns(baseList) {
  const filterFn = getPaisaDateRangeFilter(paisaPersonalSelectedPeriod);
  let list = baseList || (allPersonalTransactions || []).filter(filterFn);

  // 1. Type filter for Personal
  if (paisaPersonalTxnFilter === 'transfer_in') {
    list = list.filter(t => t.type === 'transfer_in');
  } else if (paisaPersonalTxnFilter === 'personal_spent') {
    list = list.filter(t => t.type === 'personal_spent');
  }

  // 2. Search query filter
  if (paisaPersonalTxnSearchQuery) {
    const q = paisaPersonalTxnSearchQuery;
    list = list.filter(t => {
      const note = (t.note || '').toLowerCase();
      const cat = (t.category || '').toLowerCase();
      const amt = String(t.amount || '');
      return note.includes(q) || cat.includes(q) || amt.includes(q);
    });
  }

  return list;
}

function renderPersonalTransactionsFeed() {
  const container = document.getElementById('paisaPersonalTransactionsFeed');
  const badge = document.getElementById('paisaPersonalTxnCountBadge');
  if (!container) return;

  const list = getFilteredPersonalTxns();

  // Calculate and update Live Filter Totals Strip for Personal (Transferred In, Spent, Balance)
  let totalIn = 0;
  let totalOut = 0;
  (list || []).forEach(t => {
    const amt = parseFloat(t.amount) || 0;
    if (t.type === 'transfer_in') totalIn += amt;
    else if (t.type === 'personal_spent') totalOut += amt;
  });
  const net = totalIn - totalOut;

  const pEarnEl = document.getElementById('paisaPersonalFilteredEarningVal');
  const pExpEl = document.getElementById('paisaPersonalFilteredExpenseVal');
  const pBalEl = document.getElementById('paisaPersonalFilteredBalanceVal');
  if (pEarnEl) pEarnEl.textContent = `+₹${formatPaisaAmount(totalIn)}`;
  if (pExpEl) pExpEl.textContent = `−₹${formatPaisaAmount(totalOut)}`;
  if (pBalEl) {
    pBalEl.textContent = `${net < 0 ? '−' : ''}₹${formatPaisaAmount(Math.abs(net))}`;
    pBalEl.style.color = net < 0 ? '#f87171' : '#a855f7';
  }

  if (badge) badge.textContent = list.length;

  if (list.length === 0) {
    container.innerHTML = `
      <div class="paisa-empty-feed">
        <div style="font-size: 28px; margin-bottom: 6px;">👛</div>
        <div style="font-weight: 700; color: #334155; margin-bottom: 4px;">No personal transactions found for this filter</div>
        <div style="font-size: 12px; color: #64748b; margin-bottom: 12px;">Transfer money from Virtual Account or record personal spendings.</div>
        <div style="display: flex; gap: 8px; justify-content: center;">
          <button type="button" class="paisa-personal-btn paisa-transfer-btn" onclick="openPaisaTransferModal()" style="font-size: 12px; padding: 6px 14px; min-height: 36px;"><i class="fa-solid fa-arrow-up-from-bracket"></i> Transfer In</button>
          <button type="button" class="paisa-personal-btn paisa-personal-spend-btn" onclick="openPaisaPersonalSpendModal()" style="font-size: 12px; padding: 6px 14px; min-height: 36px;"><i class="fa-solid fa-minus-circle"></i> Personal Spent</button>
        </div>
      </div>
    `;
    return;
  }

  const sorted = list.slice().sort((a, b) => {
    const dateCmp = (b.date || '').localeCompare(a.date || '');
    if (dateCmp !== 0) return dateCmp;
    return (b.created_at || '').localeCompare(a.created_at || '');
  });

  const displayList = sorted.slice(0, 35);
  const todayStr = getTodayDateString();
  const yestDate = new Date();
  yestDate.setDate(yestDate.getDate() - 1);
  const yesterdayStr = `${yestDate.getFullYear()}-${String(yestDate.getMonth() + 1).padStart(2, '0')}-${String(yestDate.getDate()).padStart(2, '0')}`;

  const groups = {};
  displayList.forEach(t => {
    const d = t.date || todayStr;
    if (!groups[d]) groups[d] = [];
    groups[d].push(t);
  });

  let html = '';
  const dateKeys = Object.keys(groups).sort().reverse();

  dateKeys.forEach(dateKey => {
    let headerLabel = dateKey;
    if (dateKey === todayStr) {
      headerLabel = 'Today';
    } else if (dateKey === yesterdayStr) {
      headerLabel = 'Yesterday';
    } else {
      try {
        const [y, m, day] = dateKey.split('-');
        const parsedD = new Date(parseInt(y), parseInt(m) - 1, parseInt(day));
        headerLabel = parsedD.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
      } catch (e) {
        headerLabel = dateKey;
      }
    }

    let dailyIn = 0;
    let dailyOut = 0;
    groups[dateKey].forEach(t => {
      const amt = parseFloat(t.amount) || 0;
      if (t.type === 'transfer_in') dailyIn += amt;
      else if (t.type === 'personal_spent') dailyOut += amt;
    });

    let summaryHtml = '';
    if (dailyIn > 0 || dailyOut > 0) {
      const parts = [];
      if (dailyIn > 0) parts.push(`<span class="paisa-daily-pill pill-earning"><i class="fa-solid fa-arrow-trend-up"></i> +₹${formatPaisaAmount(dailyIn)}</span>`);
      if (dailyOut > 0) parts.push(`<span class="paisa-daily-pill pill-expense"><i class="fa-solid fa-arrow-trend-down"></i> −₹${formatPaisaAmount(dailyOut)}</span>`);
      summaryHtml = `<div class="paisa-daily-summary">${parts.join('')}</div>`;
    }

    let mobileCardsHtml = '';
    let desktopTableRowsHtml = '';

    groups[dateKey].forEach(t => {
      const isIn = t.type === 'transfer_in';
      const amt = parseFloat(t.amount) || 0;
      const iconHtml = isIn
        ? `<div class="paisa-tx-icon tx-icon-recv"><i class="fa-solid fa-arrow-down-left"></i></div>`
        : `<div class="paisa-tx-icon tx-icon-spend" style="background: #fdf2f8; color: #db2777;"><i class="fa-solid fa-bag-shopping"></i></div>`;
      const pillClass = isIn ? 'pill-recv' : 'pill-spend';
      const pillSign = isIn ? '+' : '−';
      const typeBadge = isIn
        ? `<span class="paisa-table-type-pill type-recv"><i class="fa-solid fa-arrow-down-left"></i> Transferred In</span>`
        : `<span class="paisa-table-type-pill type-spend"><i class="fa-solid fa-bag-shopping"></i> Spent</span>`;
      const payeeLabel = isIn ? 'Transferred from Virtual' : escapeHtml(t.note || 'Personal Expense');
      const subLine = isIn ? (t.note ? escapeHtml(t.note) : 'Wallet Inflow') : (t.category ? escapeHtml(t.category.toUpperCase()) : 'Personal Outflow');

      // 1. Mobile card
      mobileCardsHtml += `
        <div class="paisa-tx-row">
          ${iconHtml}
          <div class="paisa-tx-info">
            <div class="tx-payee-title">${payeeLabel}</div>
            <div class="tx-sub-meta">${subLine}</div>
          </div>
          <div class="paisa-tx-trailing">
            <div class="tx-amt-pill ${pillClass}">
              ${pillSign}₹${formatPaisaAmount(amt)}
            </div>
            ${t.type === 'personal_spent' ? `<button type="button" class="paisa-del-mini-btn" onclick="deletePersonalTransaction('${escapeHtml(t.id)}')" title="Delete entry" style="background:none; border:none; color:#ef4444; cursor:pointer; padding:4px 6px; font-size:12px; margin-left:4px;"><i class="fa-solid fa-trash-can"></i></button>` : ''}
          </div>
        </div>
      `;

      // 2. Desktop table row
      desktopTableRowsHtml += `
        <tr class="paisa-table-row ${isIn ? 'row-recv' : 'row-spend'}">
          <td>${typeBadge}</td>
          <td>
            <div class="table-payee-name">${payeeLabel}</div>
          </td>
          <td>
            <div class="table-meta-text">${subLine}</div>
          </td>
          <td style="text-align: right; white-space: nowrap;">
            <span class="tx-amt-pill ${pillClass}">${pillSign}₹${formatPaisaAmount(amt)}</span>
            ${t.type === 'personal_spent' ? `<button type="button" class="paisa-del-mini-btn" onclick="deletePersonalTransaction('${escapeHtml(t.id)}')" title="Delete entry" style="background:none; border:none; color:#ef4444; cursor:pointer; padding:4px 6px; font-size:12px; margin-left:8px;"><i class="fa-solid fa-trash-can"></i></button>` : ''}
          </td>
        </tr>
      `;
    });

    html += `
      <div class="paisa-date-group-block">
        <div class="paisa-date-group-header">
          <div class="paisa-date-badge">
            <i class="fa-regular fa-calendar-days"></i>
            <span>${headerLabel}</span>
          </div>
          ${summaryHtml}
        </div>

        <!-- Mobile Card Feed View -->
        <div class="paisa-tx-cards-mobile">
          ${mobileCardsHtml}
        </div>

        <!-- Desktop Table View -->
        <div class="paisa-tx-table-desktop">
          <table class="paisa-desktop-table">
            <thead>
              <tr>
                <th style="width: 140px;">Type</th>
                <th>Description / Payee</th>
                <th style="width: 180px;">Category &amp; Remarks</th>
                <th style="width: 130px; text-align: right;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${desktopTableRowsHtml}
            </tbody>
          </table>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function deletePersonalTransaction(id) {
  if (!confirm('Are you sure you want to delete this personal expense?')) return;
  const idx = allPersonalTransactions.findIndex(t => t.id === id);
  if (idx === -1) return;

  allPersonalTransactions.splice(idx, 1);
  savePersonalData(false);
  renderPersonalAccountCard();
  renderPersonalTransactionsFeed();

  if (typeof ensureSupabaseClient === 'function' && ensureSupabaseClient()) {
    (async () => {
      try {
        if (id && !id.startsWith('personal_spent_') && !id.startsWith('personal_in_')) {
          await supabaseClient.from('personal_transactions').delete().eq('id', id);
        }
      } catch (err) {
        console.warn('Supabase personal delete error:', err);
      }
    })();
  }
  showPaisaToast('🗑️ Personal transaction removed');
}

if (typeof deletePersonalTransaction !== 'undefined') window.deletePersonalTransaction = deletePersonalTransaction;

// ==============================================================================
// PAISA: Export Statement as Image (High-DPI Retina PNG)
// ==============================================================================

function exportPaisaStatementAsImage(accountType = 'virtual') {
  try {
    const isPersonal = accountType === 'personal';
    const periodKey = isPersonal ? (paisaPersonalSelectedPeriod || 'month') : (paisaSelectedPeriod || 'month');
    const periodLabel = getPaisaPeriodLabel(periodKey);
    const filterFn = getPaisaDateRangeFilter(periodKey);
    
    let rawList = isPersonal
      ? getFilteredPersonalTxns((allPersonalTransactions || []).filter(filterFn))
      : getFilteredPaisaTxns(allPaisaTransactions.filter(filterFn));

    // Sort by date descending
    const sortedList = rawList.slice().sort((a, b) => {
      const dateCmp = (b.date || '').localeCompare(a.date || '');
      if (dateCmp !== 0) return dateCmp;
      return (b.created_at || '').localeCompare(a.created_at || '');
    }).slice(0, 45); // up to 45 entries for statement export

    // Compute totals for this exact filtered statement
    let totalIn = 0;
    let totalOut = 0;
    rawList.forEach(t => {
      const amt = parseFloat(t.amount) || 0;
      if (isPersonal) {
        if (t.type === 'transfer_in') totalIn += amt;
        else if (t.type === 'personal_spent') totalOut += amt;
      } else {
        if (t.type === 'received') totalIn += amt;
        else if (t.type === 'spent' || t.type === 'transfer_to_personal') totalOut += amt;
      }
    });
    const net = totalIn - totalOut;

    // High-DPI canvas setup (2x resolution for crystal clear export)
    const scale = 2;
    const width = 880;
    const headerHeight = 195;
    const rowHeight = 38;
    const tableHeaderHeight = 36;
    const footerHeight = 60;
    const tableHeight = Math.max(sortedList.length, 1) * rowHeight + tableHeaderHeight;
    const height = headerHeight + tableHeight + footerHeight;

    const canvas = document.createElement('canvas');
    canvas.width = width * scale;
    canvas.height = height * scale;
    const ctx = canvas.getContext('2d');
    ctx.scale(scale, scale);

    // 1. Background — Clean white
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Subtle top accent bar
    const accentColor = isPersonal ? '#7c3aed' : '#2563eb';
    ctx.fillStyle = accentColor;
    ctx.fillRect(0, 0, width, 4);

    // 2. Header
    ctx.fillStyle = '#111827';
    ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif, -apple-system';
    ctx.fillText('⚖️ Chambers of Atul Kumar Mishra', 30, 42);

    ctx.fillStyle = '#6b7280';
    ctx.font = '500 12px sans-serif';
    ctx.fillText('Advocate & Legal Consultant • Finance & Statement of Accounts', 30, 62);

    // Statement title
    ctx.fillStyle = '#111827';
    ctx.font = '800 17px sans-serif';
    const stmtTitle = isPersonal ? '👛 PERSONAL WALLET STATEMENT' : '💰 VIRTUAL ACCOUNT STATEMENT';
    ctx.fillText(stmtTitle, 30, 96);

    // Period pill badge
    ctx.font = 'bold 11px sans-serif';
    const badgeText = `📅 Period: ${periodLabel}`;
    const badgeTextWidth = ctx.measureText(badgeText).width;
    const badgeW = Math.max(220, badgeTextWidth + 28);
    const badgeX = width - 30 - badgeW;

    ctx.fillStyle = isPersonal ? '#f3e8ff' : '#eff6ff';
    ctx.beginPath();
    ctx.roundRect(badgeX, 26, badgeW, 28, 14);
    ctx.fill();
    // Badge border
    ctx.strokeStyle = isPersonal ? '#c4b5fd' : '#93c5fd';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = isPersonal ? '#6d28d9' : '#1d4ed8';
    ctx.textAlign = 'center';
    ctx.fillText(badgeText, badgeX + (badgeW / 2), 44);
    ctx.textAlign = 'left';

    // 3. Summary Metric Cards
    const boxY = 118;
    const boxW = (width - 60 - 24) / 3;
    const boxH = 55;

    // Card 1: Total Earning / Inflow
    ctx.fillStyle = '#f0fdf4';
    ctx.beginPath();
    ctx.roundRect(30, boxY, boxW, boxH, 8);
    ctx.fill();
    ctx.strokeStyle = '#bbf7d0';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = '#6b7280';
    ctx.font = '700 9.5px sans-serif';
    ctx.fillText(isPersonal ? 'TOTAL TRANSFERRED IN' : 'TOTAL EARNING (INFLOW)', 42, boxY + 20);
    ctx.fillStyle = '#16a34a';
    ctx.font = 'bold 17px sans-serif';
    ctx.fillText(`+₹${formatPaisaAmount(totalIn)}`, 42, boxY + 43);

    // Card 2: Total Expense / Outflow
    ctx.fillStyle = '#fef2f2';
    ctx.beginPath();
    ctx.roundRect(30 + boxW + 12, boxY, boxW, boxH, 8);
    ctx.fill();
    ctx.strokeStyle = '#fecaca';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = '#6b7280';
    ctx.font = '700 9.5px sans-serif';
    ctx.fillText(isPersonal ? 'TOTAL PERSONAL SPENT' : 'TOTAL EXPENSE (OUTFLOW)', 42 + boxW + 12, boxY + 20);
    ctx.fillStyle = '#dc2626';
    ctx.font = 'bold 17px sans-serif';
    ctx.fillText(`−₹${formatPaisaAmount(totalOut)}`, 42 + boxW + 12, boxY + 43);

    // Card 3: Remaining Balance / Net
    ctx.fillStyle = isPersonal ? '#faf5ff' : '#eff6ff';
    ctx.beginPath();
    ctx.roundRect(30 + (boxW + 12) * 2, boxY, boxW, boxH, 8);
    ctx.fill();
    ctx.strokeStyle = isPersonal ? '#e9d5ff' : '#bfdbfe';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = '#6b7280';
    ctx.font = '700 9.5px sans-serif';
    ctx.fillText(isPersonal ? 'REMAINING WALLET BALANCE' : 'REMAINING NET BALANCE', 42 + (boxW + 12) * 2, boxY + 20);
    ctx.fillStyle = net >= 0 ? '#2563eb' : '#dc2626';
    ctx.font = 'bold 17px sans-serif';
    ctx.fillText(`${net < 0 ? '−' : ''}₹${formatPaisaAmount(Math.abs(net))}`, 42 + (boxW + 12) * 2, boxY + 43);

    // 4. Ledger Table Header
    const tableStartY = headerHeight + 5;
    ctx.fillStyle = isPersonal ? '#f5f3ff' : '#f1f5f9';
    ctx.beginPath();
    ctx.roundRect(30, tableStartY, width - 60, tableHeaderHeight, [6, 6, 0, 0]);
    ctx.fill();
    // Table header bottom border
    ctx.fillStyle = isPersonal ? '#ddd6fe' : '#cbd5e1';
    ctx.fillRect(30, tableStartY + tableHeaderHeight - 1, width - 60, 1);

    ctx.fillStyle = '#374151';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('DATE', 44, tableStartY + 22);
    ctx.fillText('TYPE', 125, tableStartY + 22);
    ctx.fillText('PARTY / DESCRIPTION', 220, tableStartY + 22);
    ctx.fillText('CASE & NOTE', 470, tableStartY + 22);
    ctx.fillText('MODE', 680, tableStartY + 22);
    ctx.textAlign = 'right';
    ctx.fillText('AMOUNT', width - 44, tableStartY + 22);
    ctx.textAlign = 'left';

    // 5. Ledger Table Rows
    let curY = tableStartY + tableHeaderHeight;
    if (sortedList.length === 0) {
      ctx.fillStyle = '#f9fafb';
      ctx.fillRect(30, curY, width - 60, rowHeight);
      ctx.fillStyle = '#9ca3af';
      ctx.font = 'italic 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('No transactions recorded for this period / filter', width / 2, curY + 24);
      ctx.textAlign = 'left';
      curY += rowHeight;
    } else {
      sortedList.forEach((t, idx) => {
        const isEven = idx % 2 === 0;
        ctx.fillStyle = isEven ? '#ffffff' : '#f9fafb';
        ctx.fillRect(30, curY, width - 60, rowHeight);

        // Border bottom line
        ctx.fillStyle = '#e5e7eb';
        ctx.fillRect(30, curY + rowHeight - 1, width - 60, 1);

        const isRecv = isPersonal ? (t.type === 'transfer_in') : (t.type === 'received');
        const isTransfer = !isPersonal && t.type === 'transfer_to_personal';
        const amt = parseFloat(t.amount) || 0;

        // Date
        ctx.fillStyle = '#374151';
        ctx.font = '11px sans-serif';
        const dateText = t.date || '—';
        ctx.fillText(dateText, 44, curY + 24);

        // Type Tag Pill
        const typePillX = 125;
        const typePillY = curY + 9;
        ctx.beginPath();
        ctx.roundRect(typePillX, typePillY, 78, 20, 4);
        if (isRecv) {
          ctx.fillStyle = '#dcfce7';
          ctx.fill();
          ctx.fillStyle = '#16a34a';
          ctx.font = 'bold 10px sans-serif';
          ctx.fillText(isPersonal ? '📥 INFLOW' : '🟢 RECEIVED', typePillX + 6, typePillY + 14);
        } else if (isTransfer) {
          ctx.fillStyle = '#f3e8ff';
          ctx.fill();
          ctx.fillStyle = '#7c3aed';
          ctx.font = 'bold 10px sans-serif';
          ctx.fillText('👤 TRANSFER', typePillX + 6, typePillY + 14);
        } else {
          ctx.fillStyle = '#fee2e2';
          ctx.fill();
          ctx.fillStyle = '#dc2626';
          ctx.font = 'bold 10px sans-serif';
          ctx.fillText('🔴 EXPENSE', typePillX + 6, typePillY + 14);
        }

        // Party / Payee
        ctx.fillStyle = '#111827';
        ctx.font = '600 11.5px sans-serif';
        const payeeText = (t.client_payee || (isPersonal ? (t.type === 'transfer_in' ? 'Virtual Account' : 'Personal Spend') : 'Expense'));
        ctx.fillText(payeeText.length > 28 ? payeeText.slice(0, 26) + '…' : payeeText, 220, curY + 24);

        // Case & Note
        ctx.fillStyle = '#6b7280';
        ctx.font = '11px sans-serif';
        const noteText = [t.case_no ? `[${t.case_no}]` : '', t.note || t.category || ''].filter(Boolean).join(' ');
        ctx.fillText(noteText.length > 28 ? noteText.slice(0, 26) + '…' : (noteText || '—'), 470, curY + 24);

        // Mode
        ctx.fillStyle = '#374151';
        ctx.font = '10.5px sans-serif';
        ctx.fillText(isTransfer ? 'Transfer' : (t.payment_mode || 'Cash'), 680, curY + 24);

        // Amount
        ctx.textAlign = 'right';
        ctx.font = 'bold 12.5px sans-serif';
        ctx.fillStyle = isRecv ? '#16a34a' : '#dc2626';
        ctx.fillText(`${isRecv ? '+' : '−'}₹${formatPaisaAmount(amt)}`, width - 44, curY + 24);
        ctx.textAlign = 'left';

        curY += rowHeight;
      });
    }

    // 6. Footer
    const footerY = curY + 15;
    ctx.fillStyle = '#e5e7eb';
    ctx.fillRect(30, footerY, width - 60, 1);

    ctx.fillStyle = '#9ca3af';
    ctx.font = '10px sans-serif';
    const timeNow = new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    ctx.fillText(`Generated on ${timeNow} • Total Records: ${rawList.length}`, 30, footerY + 20);

    ctx.textAlign = 'right';
    ctx.fillText('CaseBook Legal Management System • Official Financial Audit Trail', width - 30, footerY + 20);
    ctx.textAlign = 'left';

    // 7. Trigger PNG Download
    const downloadDate = periodKey.startsWith('date:') ? periodKey.slice(5) : getTodayDateString();
    const fileName = `paisa_${accountType}_statement_${downloadDate}.png`;
    const link = document.createElement('a');
    link.download = fileName;
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showPaisaToast(`📸 Statement image exported successfully (${fileName})`);
  } catch (err) {
    console.error('Failed to export statement image:', err);
    showPaisaToast('⚠️ Failed to export image. Please try again.');
  }
}

if (typeof switchPaisaAccountTab !== 'undefined') window.switchPaisaAccountTab = switchPaisaAccountTab;
if (typeof setPaisaPersonalTxnFilter !== 'undefined') window.setPaisaPersonalTxnFilter = setPaisaPersonalTxnFilter;
if (typeof renderPersonalTransactionsFeed !== 'undefined') window.renderPersonalTransactionsFeed = renderPersonalTransactionsFeed;
if (typeof renderPersonalAccountCard !== 'undefined') window.renderPersonalAccountCard = renderPersonalAccountCard;
if (typeof handlePaisaTxnSearch !== 'undefined') window.handlePaisaTxnSearch = handlePaisaTxnSearch;
if (typeof clearPaisaTxnSearch !== 'undefined') window.clearPaisaTxnSearch = clearPaisaTxnSearch;
if (typeof handlePaisaModeFilterChange !== 'undefined') window.handlePaisaModeFilterChange = handlePaisaModeFilterChange;
if (typeof handlePaisaPersonalTxnSearch !== 'undefined') window.handlePaisaPersonalTxnSearch = handlePaisaPersonalTxnSearch;
if (typeof clearPaisaPersonalTxnSearch !== 'undefined') window.clearPaisaPersonalTxnSearch = clearPaisaPersonalTxnSearch;
if (typeof exportPaisaStatementAsImage !== 'undefined') window.exportPaisaStatementAsImage = exportPaisaStatementAsImage;
if (typeof handlePaisaSpecificDateChange !== 'undefined') window.handlePaisaSpecificDateChange = handlePaisaSpecificDateChange;
if (typeof handlePaisaPersonalSpecificDateChange !== 'undefined') window.handlePaisaPersonalSpecificDateChange = handlePaisaPersonalSpecificDateChange;
if (typeof triggerPaisaTableDatePicker !== 'undefined') window.triggerPaisaTableDatePicker = triggerPaisaTableDatePicker;
if (typeof handlePaisaTableDateChange !== 'undefined') window.handlePaisaTableDateChange = handlePaisaTableDateChange;
if (typeof clearPaisaDateFilter !== 'undefined') window.clearPaisaDateFilter = clearPaisaDateFilter;
