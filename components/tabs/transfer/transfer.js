window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs['transfer'] = `
<div class="form-container tab-card-wrapper">
    <div class="section-header-row">
        <div class="section-title-box">
            <div class="section-icon-badge"><i class="fa-solid fa-right-left"></i>
        </div>
        <div>
            <h3>Case Transfer & Re-assignment</h3>
            <p class="section-subtitle">Transfer legal matters between court rooms, judges, advocates, or forum jurisdictions</p>
            <div class="header-chips-row">
                <button type="button" class="header-chip-btn" onclick="showTab('courts')"><i class="fa-solid fa-building-columns"></i> Manage Courts</button>
            </div>
        </div>
    </div>
</div>
                        <span id="transfersTotalCountBadge" class="case-badge civil">0 Transfers Logged</span>
                    </div>

                    <!-- Transfer Mode Switcher: Single Case vs Bulk Cases -->
                    <div class="transfer-nav-toggle-bar">
                        <button type="button" class="transfer-tab-btn active" id="transferTabBtnSingle" onclick="switchTransferMode('single')">
                            <i class="fa-solid fa-arrow-right-arrow-left"></i> Single Case Transfer
                        </button>
                        <button type="button" class="transfer-tab-btn" id="transferTabBtnBulk" onclick="switchTransferMode('bulk')">
                            <i class="fa-solid fa-layer-group"></i> Bulk Cases Transfer <span class="badge-batch">BATCH</span>
                        </button>
                    </div>

                    <!-- ================= SINGLE CASE TRANSFER MODE ================= -->
                    <div id="singleTransferContainer">
                        <!-- Step 1: Search and Select Case -->
                        <div class="update-search-card">
                            <div class="search-card-header">
                                <div class="search-header-info">
                                    <span class="search-card-badge-icon">🔍</span>
                                    <div>
                                        <h4 class="search-card-heading">Select Case to Transfer</h4>
                                        <p class="search-card-subheading">Enter Case Number, Plaintiff, Defendant, or Client Name to fetch case and current court</p>
                                    </div>
                                </div>
                            </div>
                            <div class="update-search-row">
                                <div class="search-field-box">
                                    <span class="search-field-prefix-icon"><i class="fa-solid fa-magnifying-glass"></i></span>
                                    <input type="text" id="transferSearchInput" placeholder="Enter Case Number, Party Name, or Client Name to transfer..." autocomplete="off">
                                </div>
                                <button type="button" id="transferSearchBtn" class="primary-btn search-action-btn">
                                    <i class="fa-solid fa-magnifying-glass"></i> <span>Find Case</span>
                                </button>
                            </div>
                            <div id="transferSearchStatus" class="update-status-msg"></div>
                        </div>

                        <!-- Selected Case Preview Summary (Hidden until selected) -->
                        <div id="transferSelectedCaseCard" class="transfer-selected-card" style="display: none;">
                            <div class="transfer-card-top">
                                <div class="transfer-case-pill-box">
                                    <span id="transferCaseTypeBadge" class="case-badge civil">CIVIL</span>
                                    <span class="transfer-case-no" id="transferCaseNoDisplay">—</span>
                                </div>
                                <span id="transferCaseStatusBadge" class="status-badge pending">Pending</span>
                            </div>
                            <h4 class="transfer-case-title" id="transferCaseTitleDisplay">—</h4>
                            <div class="transfer-meta-grid">
                                <div class="transfer-meta-item">
                                    <span class="meta-lbl">🏛️ Current Assigned Court:</span>
                                    <span class="meta-val font-semibold text-indigo-800" id="transferCurrentCourtDisplay">—</span>
                                </div>
                                <div class="transfer-meta-item">
                                    <span class="meta-lbl">👤 Client:</span>
                                    <span class="meta-val" id="transferClientDisplay">—</span>
                                </div>
                                <div class="transfer-meta-item">
                                    <span class="meta-lbl">📅 Next Hearing:</span>
                                    <span class="meta-val" id="transferHearingDisplay">—</span>
                                </div>
                            </div>
                        </div>

                        <!-- Step 2: Transfer Execution Form -->
                        <form id="transferCaseForm" class="transfer-execution-form" style="display: none;">
                            <input type="hidden" id="transferHiddenCaseNo" value="">
                            <input type="hidden" id="transferHiddenCaseType" value="">
                            <input type="hidden" id="transferHiddenFromCourt" value="">

                            <div class="form-card transfer-details-card" style="margin-top: 20px;">
                                <div class="form-card-header">
                                    <div class="card-icon-badge"><i class="fa-solid fa-scale-balanced"></i>️</div>
                                    <div>
                                        <h4 class="form-card-title">Court Transfer Details &amp; Judicial Order</h4>
                                        <p class="form-card-sub">Specify destination court, transfer order details, and grounds of transfer</p>
                                    </div>
                                </div>

                                <div class="form-grid-2col">
                                    <div class="form-group">
                                        <label for="transferFromCourtDisplay">Transferred From (Current Court) <span class="req">*</span></label>
                                        <div class="input-with-icon">
                                            <i class="fa-solid fa-landmark"></i>
                                            <input type="text" id="transferFromCourtDisplay" readonly class="readonly-field" placeholder="Origin Court" style="background:#f1f5f9; cursor:not-allowed; font-weight:600;">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="transferToCourt">Transferred To (New Destination Court) <span class="req">*</span></label>
                                        <div class="input-with-icon">
                                            <i class="fa-solid fa-gavel"></i>
                                            <select id="transferToCourt" required class="status-select">
                                                <option value="">-- Select Destination Court --</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="transferDate">Date of Transfer Order <span class="req">*</span></label>
                                        <input type="date" id="transferDate" required>
                                    </div>

                                    <div class="form-group">
                                        <label for="transferOrderNo">Order / Reassignment Reference Number</label>
                                        <input type="text" id="transferOrderNo" placeholder="e.g. Order No. 248/DJ/2026 or Misc. App. 14/2026">
                                    </div>

                                    <div class="form-group">
                                        <label for="transferAuthority">Ordering Authority / Presiding Judge</label>
                                        <input type="text" id="transferAuthority" placeholder="e.g. Hon'ble District &amp; Sessions Judge / High Court">
                                    </div>

                                    <div class="form-group">
                                        <label for="transferDocLink">Transfer Order Sheet URL / Cloud Link</label>
                                        <div class="input-with-icon">
                                            <i class="fa-solid fa-link"></i>
                                            <input type="url" id="transferDocLink" placeholder="https://drive.google.com/file/d/...">
                                        </div>
                                    </div>

                                    <div class="form-group" style="grid-column: 1 / -1;">
                                        <label for="transferReason">Grounds / Reason for Transfer <span class="req">*</span></label>
                                        <div class="remarks-quick-chips" style="margin-bottom: 8px;">
                                            <span class="remarks-chip-btn" onclick="insertTransferReasonChip('Territorial jurisdiction change')">➕ Territorial Jurisdiction</span>
                                            <span class="remarks-chip-btn" onclick="insertTransferReasonChip('Administrative reassignment by District Judge')">➕ Admin Reassignment</span>
                                            <span class="remarks-chip-btn" onclick="insertTransferReasonChip('Transferred to Special Court / Fast Track')">➕ Special / Fast Track Court</span>
                                            <span class="remarks-chip-btn" onclick="insertTransferReasonChip('Transferred on Application u/s 24 CPC')">➕ Sec 24 CPC Transfer</span>
                                            <span class="remarks-chip-btn" onclick="insertTransferReasonChip('Transferred u/s 407/408 CrPC')">➕ Sec 407/408 CrPC</span>
                                            <span class="remarks-chip-btn" onclick="insertTransferReasonChip('Recusal / Transfer to alternate bench')">➕ Bench Recusal</span>
                                        </div>
                                        <input type="text" id="transferReason" required placeholder="Enter or choose grounds for transfer...">
                                    </div>

                                    <div class="form-group" style="grid-column: 1 / -1;">
                                        <label for="transferRemarks">Special Instructions / Remarks</label>
                                        <textarea id="transferRemarks" rows="2" placeholder="e.g. Records transmitted to new court, next listed date retained..."></textarea>
                                    </div>
                                </div>
                            </div>

                            <div class="transfer-actions-row" style="margin-top: 16px; display: flex; gap: 12px; align-items: center;">
                                <button type="submit" id="submitTransferBtn" class="primary-btn form-submit-btn" style="background: linear-gradient(135deg, #3730a3, #4338ca); max-width: 320px;">
                                    <i class="fa-solid fa-arrow-right-arrow-left"></i> Execute &amp; Save Court Transfer
                                </button>
                                <button type="button" id="cancelTransferBtn" class="secondary-btn" onclick="resetTransferForm()" style="max-width: 140px; height: 48px; border-radius: 10px; border: 1.5px solid #cbd5e1; background: #fff; color: #475569; font-weight: 600; cursor: pointer;">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>

                    <!-- ================= BULK CASES TRANSFER MODE ================= -->
                    <div id="bulkTransferContainer" style="display: none;">
                        <!-- Bulk Step 1: Origin Court & Case Selection -->
                        <div class="update-search-card bulk-origin-card">
                            <div class="search-card-header">
                                <div class="search-header-info">
                                    <span class="search-card-badge-icon" style="background: #eef2ff; color: #4338ca;"><i class="fa-solid fa-landmark"></i></span>
                                    <div>
                                        <h4 class="search-card-heading">Step 1: Select Origin Court &amp; Cases to Transfer</h4>
                                        <p class="search-card-subheading">Choose current court to load active cases, then select multiple cases for batch transfer</p>
                                    </div>
                                </div>
                            </div>

                            <div class="form-grid-2col" style="margin-top: 14px; margin-bottom: 8px;">
                                <div class="form-group">
                                    <label for="bulkTransferFromCourt">Current Origin Court <span class="req">*</span></label>
                                    <div class="input-with-icon">
                                        <i class="fa-solid fa-landmark"></i>
                                        <select id="bulkTransferFromCourt" class="status-select" onchange="onBulkOriginCourtChange()">
                                            <option value="">-- Select Origin Court to Load Cases --</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="bulkCaseFilterInput">Quick Search / Filter Cases in Court</label>
                                    <div class="input-with-icon">
                                        <i class="fa-solid fa-magnifying-glass"></i>
                                        <input type="text" id="bulkCaseFilterInput" placeholder="Filter by case #, party name, or stage..." oninput="filterBulkCasesTable()">
                                    </div>
                                </div>
                            </div>

                            <!-- Bulk Selection Action Bar -->
                            <div class="bulk-select-action-bar">
                                <label class="bulk-select-all-label">
                                    <input type="checkbox" id="bulkSelectAllCheckbox" onchange="toggleBulkSelectAll(this)">
                                    <span>Select All (<span id="bulkTotalOriginCases">0</span> cases in court)</span>
                                </label>
                                <div class="bulk-selection-pills">
                                    <span class="bulk-selection-count-pill">Selected: <strong id="bulkSelectedCount">0</strong></span>
                                    <button type="button" class="bulk-clear-btn" onclick="clearBulkCaseSelection()"><i class="fa-solid fa-xmark"></i> Clear</button>
                                </div>
                            </div>

                            <!-- Scrollable Cases Checklist Table -->
                            <div class="table-responsive overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm mt-3" style="max-height: 380px; overflow-y: auto;">
                                <table class="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700" id="bulkCasesTable">
                                    <thead class="bg-slate-50 text-slate-700 font-semibold text-xs uppercase tracking-wider sticky top-0 z-10">
                                        <tr>
                                            <th style="width: 50px; text-align: center;">Select</th>
                                            <th style="width: 170px;">Case Number</th>
                                            <th>Parties (Title)</th>
                                            <th style="width: 140px;">Type / Stage</th>
                                            <th style="width: 140px;">Next Hearing</th>
                                        </tr>
                                    </thead>
                                    <tbody id="bulkCasesTableBody">
                                        <tr>
                                            <td colspan="5" class="no-results text-center py-6 text-slate-500">
                                                Please select an Origin Court above to load its active cases.
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <!-- Bulk Step 2: Destination Court & Common Order Form -->
                        <form id="bulkTransferForm" class="transfer-execution-form" onsubmit="handleBulkTransferSubmit(event)" style="margin-top: 20px;">
                            <div class="form-card transfer-details-card">
                                <div class="form-card-header">
                                    <div class="card-icon-badge" style="background: #eef2ff; color: #4338ca;"><i class="fa-solid fa-gavel"></i></div>
                                    <div>
                                        <h4 class="form-card-title">Step 2: Destination Court &amp; Batch Transfer Order</h4>
                                        <p class="form-card-sub">Common transfer order details applied across all selected cases</p>
                                    </div>
                                </div>

                                <div class="form-grid-2col">
                                    <div class="form-group">
                                        <label for="bulkTransferToCourt">Transferred To (New Destination Court) <span class="req">*</span></label>
                                        <div class="input-with-icon">
                                            <i class="fa-solid fa-gavel"></i>
                                            <select id="bulkTransferToCourt" required class="status-select">
                                                <option value="">-- Select Destination Court --</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="bulkTransferDate">Date of Transfer Order <span class="req">*</span></label>
                                        <input type="date" id="bulkTransferDate" required>
                                    </div>

                                    <div class="form-group">
                                        <label for="bulkTransferOrderNo">Order / Reference Number</label>
                                        <input type="text" id="bulkTransferOrderNo" placeholder="e.g. Admn. Order No. 512/DJ/2026">
                                    </div>

                                    <div class="form-group">
                                        <label for="bulkTransferAuthority">Ordering Authority / Presiding Judge</label>
                                        <input type="text" id="bulkTransferAuthority" placeholder="e.g. Hon'ble Principal District &amp; Sessions Judge">
                                    </div>

                                    <div class="form-group" style="grid-column: 1 / -1;">
                                        <label for="bulkTransferDocLink">Common Transfer Order Sheet URL / Cloud Link</label>
                                        <div class="input-with-icon">
                                            <i class="fa-solid fa-link"></i>
                                            <input type="url" id="bulkTransferDocLink" placeholder="https://drive.google.com/file/d/...">
                                        </div>
                                    </div>

                                    <div class="form-group" style="grid-column: 1 / -1;">
                                        <label for="bulkTransferReason">Grounds / Reason for Batch Transfer <span class="req">*</span></label>
                                        <div class="remarks-quick-chips" style="margin-bottom: 8px;">
                                            <span class="remarks-chip-btn" onclick="insertBulkTransferReasonChip('Territorial jurisdiction change')">➕ Territorial Jurisdiction</span>
                                            <span class="remarks-chip-btn" onclick="insertBulkTransferReasonChip('Administrative reassignment by District Judge')">➕ Admin Reassignment</span>
                                            <span class="remarks-chip-btn" onclick="insertBulkTransferReasonChip('Transferred to Special Court / Fast Track')">➕ Special / Fast Track Court</span>
                                            <span class="remarks-chip-btn" onclick="insertBulkTransferReasonChip('Transferred on Application u/s 24 CPC')">➕ Sec 24 CPC Transfer</span>
                                            <span class="remarks-chip-btn" onclick="insertBulkTransferReasonChip('Transferred u/s 407/408 CrPC')">➕ Sec 407/408 CrPC</span>
                                            <span class="remarks-chip-btn" onclick="insertBulkTransferReasonChip('Bench Recusal / Rostering change')">➕ Bench Recusal</span>
                                        </div>
                                        <input type="text" id="bulkTransferReason" required placeholder="Enter or choose grounds for batch transfer...">
                                    </div>

                                    <div class="form-group" style="grid-column: 1 / -1;">
                                        <label for="bulkTransferRemarks">Special Instructions / Remarks</label>
                                        <textarea id="bulkTransferRemarks" rows="2" placeholder="e.g. Batch files transmitted to new court, existing hearing schedule retained..."></textarea>
                                    </div>
                                </div>
                            </div>

                            <div class="transfer-actions-row" style="margin-top: 16px; display: flex; gap: 12px; align-items: center;">
                                <button type="submit" id="submitBulkTransferBtn" class="primary-btn form-submit-btn" style="background: linear-gradient(135deg, #3730a3, #4338ca); max-width: 380px;">
                                    <i class="fa-solid fa-layer-group"></i> Execute Batch Transfer (<span id="bulkSubmitBtnCount">0</span> Cases)
                                </button>
                                <button type="button" class="secondary-btn" onclick="resetBulkTransferForm()" style="max-width: 140px; height: 48px; border-radius: 10px; border: 1.5px solid #cbd5e1; background: #fff; color: #475569; font-weight: 600; cursor: pointer;">
                                    Reset
                                </button>
                            </div>
                            <div id="bulkTransferStatus" class="update-status-msg" style="margin-top: 12px;"></div>
                        </form>
                    </div>

                    <!-- Step 3: Recent Case Transfers Registry Card -->
                    <div class="transfer-history-registry-card" style="margin-top: 28px;">
                        <div class="dossier-history-header">
                            <div class="history-head-title">
                                <div class="history-icon-badge" style="background: #eef2ff; color: #4338ca;"><i class="fa-solid fa-clock-rotate-left"></i></div>
                                <div>
                                    <h4>Recent Court Transfers Registry</h4>
                                    <p class="history-sub">Audit trail of all cases transferred across courts and judicial forums</p>
                                </div>
                            </div>
                            <div class="history-head-actions">
                                <button type="button" class="dossier-history-modal-btn" onclick="renderRecentTransfersTable()"><i class="fa-solid fa-rotate"></i> Refresh</button>
                            </div>
                        </div>

                        <div class="table-responsive overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-900/5">
                            <table id="transfersRegistryTable" class="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                                <thead class="bg-slate-50 text-slate-700 font-semibold text-xs uppercase tracking-wider">
                                    <tr>
                                        <th style="width: 50px; text-align: center;">#</th>
                                        <th style="width: 130px;">Transfer Date</th>
                                        <th style="width: 160px;">Case Number</th>
                                        <th>Origin Court ➔ New Court</th>
                                        <th style="width: 170px;">Order # / Authority</th>
                                        <th>Reason</th>
                                        <th style="width: 90px; text-align: center;">Action</th>
                                    </tr>
                                </thead>
                                <tbody id="transfersRegistryTableBody">
                                    <tr>
                                        <td colspan="7" class="no-results text-center py-4">No case transfers recorded yet.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
`;
