window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs['transfer'] = `<!-- ==============================================================================
     CASEBOOK DEDICATED CASE TRANSFER & RE-ASSIGNMENT TAB
     Location: components/tabs/transfer/tab-transfer.html
     Multi-Tab Parity: Conforms 100% to DESIGN.md and ui-rules.md (Lucide Icons Only)
     ============================================================================== -->
<div class="transfer-dashboard-container" data-transfer-scope>
    <!-- Master Header: Judicial Transfer Crest Banner -->
    <div class="transfer-header-row">
        <div class="transfer-header-title-box">
            <div class="section-icon-badge transfer-crest-badge" aria-hidden="true">
                <svg class="lucide lucide-arrow-left-right" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/></svg>
            </div>
            <div>
                <nav class="breadcrumb-bar transfer-breadcrumb" aria-label="Breadcrumb">
                    <button type="button" class="crumb-link transfer-crumb-link" onclick="showTab('all', event)" title="Return to Cases Register">
                        <svg class="lucide lucide-folder-archive" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg>
                        <span>Cases Register</span>
                    </button>
                    <svg class="lucide lucide-chevron-right crumb-sep transfer-crumb-sep" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                    <span class="crumb-current transfer-crumb-current">Court Transfer</span>
                </nav>
                <h1 class="transfer-main-title">Case Transfer &amp; Re-assignment</h1>
            </div>
        </div>
        <span id="transfersTotalCountBadge" class="case-badge civil">0 Transfers Logged</span>
    </div>

    <!-- Transfer Mode Switcher: Single Case vs Bulk Cases (Underline Tab Pattern) -->
    <div class="transfer-nav-bar" role="tablist" aria-label="Transfer Mode Selection">
        <button type="button" class="transfer-nav-tab-btn active" id="transferTabBtnSingle" onclick="switchTransferMode('single')" role="tab" aria-selected="true">
            Single Case Transfer
        </button>
        <button type="button" class="transfer-nav-tab-btn" id="transferTabBtnBulk" onclick="switchTransferMode('bulk')" role="tab" aria-selected="false">
            Bulk Cases Transfer <span class="badge-batch transfer-badge-new">NEW</span>
        </button>
    </div>

    <!-- ================= SINGLE CASE TRANSFER MODE ================= -->
    <div id="singleTransferContainer">
        <!-- Step 1: Search and Select Case Card -->
        <div class="transfer-card">
            <div class="transfer-step-header">
                <div class="transfer-step-badge step-1-badge" aria-hidden="true">
                    <svg class="lucide lucide-search" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </div>
                <div>
                    <h4 class="transfer-step-title">Select Case to Transfer</h4>
                    <p class="transfer-step-sub">Enter Case Number, Plaintiff, Defendant, or Client Name to fetch the case.</p>
                </div>
            </div>
            <div class="transfer-search-row">
                <input type="text" id="transferSearchInput" class="transfer-search-input" placeholder="e.g., CV-2023-00123 or John Doe" autocomplete="off">
                <button type="button" id="transferSearchBtn" class="transfer-find-btn" onclick="loadCaseForTransfer()">
                    <svg class="lucide lucide-search" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    <span>Find Case</span>
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
                    <span class="meta-lbl">
                        <svg class="lucide lucide-landmark" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg> Current Assigned Court:
                    </span>
                    <span class="meta-val" id="transferCurrentCourtDisplay">—</span>
                </div>
                <div class="transfer-meta-item">
                    <span class="meta-lbl">
                        <svg class="lucide lucide-user" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> Client:
                    </span>
                    <span class="meta-val" id="transferClientDisplay">—</span>
                </div>
                <div class="transfer-meta-item">
                    <span class="meta-lbl">
                        <svg class="lucide lucide-calendar" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg> Next Hearing:
                    </span>
                    <span class="meta-val" id="transferHearingDisplay">—</span>
                </div>
            </div>
        </div>

        <!-- Step 2: Transfer Execution Form -->
        <form id="transferCaseForm" class="transfer-execution-form" style="display: none;">
            <input type="hidden" id="transferHiddenCaseNo" value="">
            <input type="hidden" id="transferHiddenCaseType" value="">
            <input type="hidden" id="transferHiddenFromCourt" value="">

            <div class="transfer-card transfer-details-card">
                <div class="transfer-step-header">
                    <div class="transfer-step-badge step-2-badge" aria-hidden="true">
                        <svg class="lucide lucide-scale" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>
                    </div>
                    <div>
                        <h4 class="transfer-step-title">Court Transfer Details &amp; Judicial Order</h4>
                        <p class="transfer-step-sub">Specify destination court, transfer order details, and grounds of transfer</p>
                    </div>
                </div>

                <div class="form-grid-2col">
                    <div class="form-group">
                        <label for="transferFromCourtDisplay">Transferred From (Current Court) <span class="req">*</span></label>
                        <div class="input-with-icon">
                            <svg class="lucide lucide-landmark input-inner-icon" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>
                            <input type="text" id="transferFromCourtDisplay" readonly class="readonly-field" placeholder="Origin Court">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="transferToCourt">Transferred To (New Destination Court) <span class="req">*</span></label>
                        <div class="input-with-icon">
                            <svg class="lucide lucide-gavel input-inner-icon" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m14 13-7.5 7.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L11 10"/><path d="m16 16 6-6"/><path d="m8 8 6-6"/><path d="m9 7 8 8"/><path d="m21 11-8-8"/></svg>
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
                            <svg class="lucide lucide-link input-inner-icon" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                            <input type="url" id="transferDocLink" placeholder="https://drive.google.com/file/d/...">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="transferReason">Grounds / Reason for Transfer <span class="req">*</span></label>
                        <div class="remarks-quick-chips">
                            <span class="remarks-chip-btn" onclick="insertTransferReasonChip('Territorial jurisdiction change')">+ Territorial Jurisdiction</span>
                            <span class="remarks-chip-btn" onclick="insertTransferReasonChip('Administrative reassignment by District Judge')">+ Admin Reassignment</span>
                            <span class="remarks-chip-btn" onclick="insertTransferReasonChip('Transferred to Special Court / Fast Track')">+ Special / Fast Track Court</span>
                            <span class="remarks-chip-btn" onclick="insertTransferReasonChip('Transferred on Application u/s 24 CPC')">+ Sec 24 CPC Transfer</span>
                            <span class="remarks-chip-btn" onclick="insertTransferReasonChip('Transferred u/s 407/408 CrPC')">+ Sec 407/408 CrPC</span>
                            <span class="remarks-chip-btn" onclick="insertTransferReasonChip('Recusal / Transfer to alternate bench')">+ Bench Recusal</span>
                        </div>
                        <input type="text" id="transferReason" required placeholder="Enter or choose grounds for transfer...">
                    </div>

                    <div class="form-group">
                        <label for="transferRemarks">Special Instructions / Remarks</label>
                        <textarea id="transferRemarks" rows="2" placeholder="e.g. Records transmitted to new court, next listed date retained..."></textarea>
                    </div>
                </div>
            </div>

            <div class="transfer-actions-row">
                <button type="submit" id="submitTransferBtn" class="primary-btn form-submit-btn btn-glow">
                    <svg class="lucide lucide-arrow-left-right" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/></svg>
                    <span>Execute &amp; Save Court Transfer</span>
                </button>
                <button type="button" id="cancelTransferBtn" class="secondary-btn transfer-cancel-btn" onclick="resetTransferForm()">
                    Cancel
                </button>
            </div>
        </form>
    </div>

    <!-- ================= BULK CASES TRANSFER MODE ================= -->
    <div id="bulkTransferContainer" style="display: none;">
        <!-- Bulk Step 1: Origin Court & Case Selection -->
        <div class="transfer-card bulk-origin-card">
            <div class="transfer-step-header">
                <div class="transfer-step-badge step-1-badge" aria-hidden="true">
                    <svg class="lucide lucide-landmark" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>
                </div>
                <div>
                    <h4 class="transfer-step-title">Step 1: Select Origin Court &amp; Cases to Transfer</h4>
                    <p class="transfer-step-sub">Choose current court to load active cases, then select multiple cases for batch transfer</p>
                </div>
            </div>

            <div class="form-grid-2col">
                <div class="form-group">
                    <label for="bulkTransferFromCourt">Current Origin Court <span class="req">*</span></label>
                    <div class="input-with-icon">
                        <svg class="lucide lucide-landmark input-inner-icon" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>
                        <select id="bulkTransferFromCourt" class="status-select" onchange="onBulkOriginCourtChange()">
                            <option value="">-- Select Origin Court to Load Cases --</option>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label for="bulkCaseFilterInput">Quick Search / Filter Cases in Court</label>
                    <div class="input-with-icon">
                        <svg class="lucide lucide-search input-inner-icon" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
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
                    <button type="button" class="bulk-clear-btn" onclick="clearBulkCaseSelection()">
                        <svg class="lucide lucide-x" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        <span>Clear</span>
                    </button>
                </div>
            </div>

            <!-- Scrollable Cases Checklist Table -->
            <div class="table-responsive transfer-table-wrapper">
                <table class="min-w-full divide-y divide-slate-200 text-left text-sm" id="bulkCasesTable">
                    <thead class="sticky top-0 z-10">
                        <tr>
                            <th>Select</th>
                            <th>Case Number</th>
                            <th>Parties (Title)</th>
                            <th>Type / Stage</th>
                            <th>Next Hearing</th>
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
        <form id="bulkTransferForm" class="transfer-execution-form" onsubmit="handleBulkTransferSubmit(event)">
            <div class="transfer-card transfer-details-card">
                <div class="transfer-step-header">
                    <div class="transfer-step-badge step-2-badge" aria-hidden="true">
                        <svg class="lucide lucide-gavel" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m14 13-7.5 7.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L11 10"/><path d="m16 16 6-6"/><path d="m8 8 6-6"/><path d="m9 7 8 8"/><path d="m21 11-8-8"/></svg>
                    </div>
                    <div>
                        <h4 class="transfer-step-title">Step 2: Destination Court &amp; Batch Transfer Order</h4>
                        <p class="transfer-step-sub">Common transfer order details applied across all selected cases</p>
                    </div>
                </div>

                <div class="form-grid-2col">
                    <div class="form-group">
                        <label for="bulkTransferToCourt">Transferred To (New Destination Court) <span class="req">*</span></label>
                        <div class="input-with-icon">
                            <svg class="lucide lucide-gavel input-inner-icon" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m14 13-7.5 7.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L11 10"/><path d="m16 16 6-6"/><path d="m8 8 6-6"/><path d="m9 7 8 8"/><path d="m21 11-8-8"/></svg>
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

                    <div class="form-group">
                        <label for="bulkTransferDocLink">Common Transfer Order Sheet URL / Cloud Link</label>
                        <div class="input-with-icon">
                            <svg class="lucide lucide-link input-inner-icon" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                            <input type="url" id="bulkTransferDocLink" placeholder="https://drive.google.com/file/d/...">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="bulkTransferReason">Grounds / Reason for Batch Transfer <span class="req">*</span></label>
                        <div class="remarks-quick-chips">
                            <span class="remarks-chip-btn" onclick="insertBulkTransferReasonChip('Territorial jurisdiction change')">+ Territorial Jurisdiction</span>
                            <span class="remarks-chip-btn" onclick="insertBulkTransferReasonChip('Administrative reassignment by District Judge')">+ Admin Reassignment</span>
                            <span class="remarks-chip-btn" onclick="insertBulkTransferReasonChip('Transferred to Special Court / Fast Track')">+ Special / Fast Track Court</span>
                            <span class="remarks-chip-btn" onclick="insertBulkTransferReasonChip('Transferred on Application u/s 24 CPC')">+ Sec 24 CPC Transfer</span>
                            <span class="remarks-chip-btn" onclick="insertBulkTransferReasonChip('Transferred u/s 407/408 CrPC')">+ Sec 407/408 CrPC</span>
                            <span class="remarks-chip-btn" onclick="insertBulkTransferReasonChip('Bench Recusal / Rostering change')">+ Bench Recusal</span>
                        </div>
                        <input type="text" id="bulkTransferReason" required placeholder="Enter or choose grounds for batch transfer...">
                    </div>

                    <div class="form-group">
                        <label for="bulkTransferRemarks">Special Instructions / Remarks</label>
                        <textarea id="bulkTransferRemarks" rows="2" placeholder="e.g. Batch files transmitted to new court, existing hearing schedule retained..."></textarea>
                    </div>
                </div>
            </div>

            <div class="transfer-actions-row">
                <button type="submit" id="submitBulkTransferBtn" class="primary-btn form-submit-btn btn-glow">
                    <svg class="lucide lucide-layers" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>
                    <span>Execute Batch Transfer (<span id="bulkSubmitBtnCount">0</span> Cases)</span>
                </button>
                <button type="button" class="secondary-btn transfer-cancel-btn" onclick="resetBulkTransferForm()">
                    Reset
                </button>
            </div>
            <div id="bulkTransferStatus" class="update-status-msg"></div>
        </form>
    </div>

    <!-- Step 3: Recent Case Transfers Registry Card -->
    <div class="transfer-card transfer-registry-card">
        <div class="transfer-registry-header">
            <div class="transfer-step-header">
                <div class="transfer-step-badge registry-badge" aria-hidden="true">
                    <svg class="lucide lucide-history" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
                </div>
                <div>
                    <h4 class="transfer-step-title">Recent Court Transfers Registry</h4>
                    <p class="transfer-step-sub">Comprehensive history of case jurisdiction transitions and movement</p>
                </div>
            </div>
            <div class="transfer-registry-actions">
                <!-- Dual View Switcher (Docket Table vs Cards) -->
                <div class="transfer-view-toggle view-toggle" id="transferRegistryViewToggle" role="group" aria-label="Switch display mode">
                    <button type="button" class="view-btn active" id="transferRegistryToggleTable" onclick="setTransferRegistryViewMode('table')" title="Switch to Docket Table View" aria-label="Switch to Docket Table View">
                        <svg class="lucide lucide-table-2" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg> <span>Table</span>
                    </button>
                    <button type="button" class="view-btn" id="transferRegistryToggleCards" onclick="setTransferRegistryViewMode('cards')" title="Switch to Cards View" aria-label="Switch to Cards View">
                        <svg class="lucide lucide-layout-grid" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg> <span>Cards</span>
                    </button>
                </div>
                <button type="button" class="transfer-refresh-btn" onclick="renderRecentTransfersTable()" title="Refresh Transfer Registry" aria-label="Refresh Transfer Registry">
                    <svg class="lucide lucide-refresh-cw" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>
                    <span>Refresh</span>
                </button>
            </div>
        </div>

        <div id="transferRegistryTableView" class="table-responsive transfer-table-wrapper">
            <table id="transfersRegistryTable" class="transfer-registry-table">
                <thead>
                    <tr>
                        <th>TRANSFER DATE</th>
                        <th>CASE NUMBER</th>
                        <th>ORIGIN COURT &rarr; NEW COURT</th>
                        <th>ORDER # / AUTHORITY</th>
                        <th>REASON</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody id="transfersRegistryTableBody">
                    <tr>
                        <td colspan="6" class="transfer-empty-cell">No case transfers recorded yet.</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Mobile / Alternative Cards Grid -->
        <div id="transferRegistryCardsView" class="transfer-registry-cards-view hidden">
            <div id="transfersRegistryCardsContainer" class="transfer-cards-grid"></div>
        </div>
    </div>
</div>`;

// ==============================================================================
// Case Transfer to Another Court (Inter-Court Jurisdictional Transfer)
// ==============================================================================

var allCaseTransfers = (typeof allCaseTransfers !== 'undefined' && Array.isArray(allCaseTransfers))
  ? allCaseTransfers
  : (typeof window !== 'undefined' && Array.isArray(window.allCaseTransfers) ? window.allCaseTransfers : []);
if (typeof window !== 'undefined') window.allCaseTransfers = allCaseTransfers;

function getTransferAllCaseRecords() {
  if (typeof window !== 'undefined' && Array.isArray(window.allCaseRecords) && window.allCaseRecords.length > 0) {
    return window.allCaseRecords;
  }
  if (typeof allCaseRecords !== 'undefined' && Array.isArray(allCaseRecords) && allCaseRecords.length > 0) {
    return allCaseRecords;
  }
  return (typeof window !== 'undefined' && Array.isArray(window.allCaseRecords)) ? window.allCaseRecords : (typeof allCaseRecords !== 'undefined' && Array.isArray(allCaseRecords) ? allCaseRecords : []);
}

function getTransferAllTransfers() {
  if (typeof window !== 'undefined' && Array.isArray(window.allCaseTransfers) && window.allCaseTransfers.length > 0) {
    return window.allCaseTransfers;
  }
  if (typeof allCaseTransfers !== 'undefined' && Array.isArray(allCaseTransfers) && allCaseTransfers.length > 0) {
    return allCaseTransfers;
  }
  return (typeof window !== 'undefined' && Array.isArray(window.allCaseTransfers)) ? window.allCaseTransfers : (typeof allCaseTransfers !== 'undefined' && Array.isArray(allCaseTransfers) ? allCaseTransfers : []);
}

function getCaseDisplayTitle(c) {
  if (!c) return '—';
  if (c.caseName) return c.caseName;
  if (c.plaintiff) return `${c.plaintiff} vs ${c.defendant || 'Defendant'}`;
  if (c.victimName) return `${c.victimName} vs ${c.accusedName || 'Accused'}`;
  if (c.complainant) return `${c.complainant} vs ${c.accused || 'Accused'}`;
  return c.caseTitle || c.caseNo || c.criminalCaseNumber || '—';
}

function showCaseDetails(caseNo) {
  if (typeof openCaseHistoryModalByNo === 'function') {
    openCaseHistoryModalByNo(caseNo);
  } else if (typeof window !== 'undefined' && typeof window.openCaseHistoryModalByNo === 'function') {
    window.openCaseHistoryModalByNo(caseNo);
  }
}
if (typeof showCaseDetails !== 'undefined') window.showCaseDetails = showCaseDetails;

var isSubmittingTransfer = false;

function loadCaseForTransfer(caseNoToFind) {
  const query = (caseNoToFind || document.getElementById('transferSearchInput')?.value || '').trim().toLowerCase();
  const statusEl = document.getElementById('transferSearchStatus');
  const previewCard = document.getElementById('transferSelectedCaseCard');
  const transferForm = document.getElementById('transferCaseForm');

  if (!query) {
    if (statusEl) {
      statusEl.textContent = 'Please enter a Case Number, Party Name, or Client Name to search.';
      statusEl.className = 'update-status-msg error';
    }
    return;
  }

  const records = getTransferAllCaseRecords();

  // 1. Check for exact case number match first
  let exactMatch = records.find(c => {
    const num1 = (c.caseNo || '').toLowerCase();
    const num2 = (c.criminalCaseNumber || '').toLowerCase();
    return num1 === query || num2 === query;
  });

  // 2. Filter all potential matches
  const matches = records.filter(c => {
    const num1 = (c.caseNo || '').toLowerCase();
    const num2 = (c.criminalCaseNumber || '').toLowerCase();
    const name = (c.caseName || '').toLowerCase();
    const plaintiff = (c.plaintiff || '').toLowerCase();
    const defendant = (c.defendant || '').toLowerCase();
    const victim = (c.victimName || '').toLowerCase();
    const accused = (c.accusedName || '').toLowerCase();
    const client = (c.clientName || c.criminalClientName || '').toLowerCase();
    return num1 === query || num2 === query || num1.includes(query) || num2.includes(query) ||
           name.includes(query) || (plaintiff && plaintiff.includes(query)) ||
           (defendant && defendant.includes(query)) || (victim && victim.includes(query)) ||
           (accused && accused.includes(query)) || (client && client.includes(query));
  });

  if (!exactMatch && matches.length === 0) {
    if (statusEl) {
      statusEl.textContent = `❌ Case "${query.toUpperCase()}" not found in database records.`;
      statusEl.className = 'update-status-msg error';
    }
    if (previewCard) previewCard.style.display = 'none';
    if (transferForm) transferForm.style.display = 'none';
    return;
  }

  // 3. Multi-match search disambiguation: render candidate list if > 1 match and no direct exact match
  if (!caseNoToFind && !exactMatch && matches.length > 1) {
    if (statusEl) {
      let html = `
        <div class="update-search-candidates">
          <div class="candidate-header">
            <span>🔍 Found ${matches.length} matches for "<em>${escapeHtml(query)}</em>":</span>
            <small>Click a case below to load it for transfer</small>
          </div>
          <div class="candidate-list">
      `;
      matches.slice(0, 8).forEach(m => {
        const cNo = m.caseNo || m.criminalCaseNumber || '—';
        const cName = m.caseName || (m.plaintiff ? `${m.plaintiff} vs ${m.defendant}` : (m.victimName ? `${m.victimName} vs ${m.accusedName}` : '—'));
        const cType = (m.caseType || 'civil').toUpperCase();
        const cCourt = m.courtName || m.criminalCourtName || 'District Court';
        html += `
          <div class="candidate-item" onclick="loadCaseForTransfer('${escapeHtml(cNo)}')">
            <div class="candidate-item-info">
              <div class="candidate-item-title">
                <strong>${escapeHtml(cNo)}</strong>
                <span class="candidate-item-type ${m.caseType || 'civil'}">${cType}</span>
                <span class="candidate-item-status">${escapeHtml(m.caseStatus || 'Pending')}</span>
              </div>
              <div class="candidate-item-parties">${escapeHtml(cName)}</div>
              <div class="candidate-item-court">🏛️ Current Court: ${escapeHtml(cCourt)}</div>
            </div>
            <div class="candidate-item-action">
              <button type="button" class="primary-btn candidate-pick-btn">Select ➔</button>
            </div>
          </div>
        `;
      });
      html += `
          </div>
        </div>
      `;
      statusEl.innerHTML = html;
      statusEl.className = 'update-status-msg';
    }
    if (previewCard) previewCard.style.display = 'none';
    if (transferForm) transferForm.style.display = 'none';
    return;
  }

  const targetCase = exactMatch || matches[0];
  const caseNo = targetCase.caseNo || targetCase.criminalCaseNumber || '—';
  const caseType = targetCase.caseType || 'civil';
  const currentCourt = targetCase.courtName || targetCase.criminalCourtName || 'District Court';
  const clientName = targetCase.clientName || targetCase.criminalClientName || '—';
  const nextHearing = targetCase.nextHearing && targetCase.nextHearing !== '—' ? formatDateDMY(targetCase.nextHearing) : 'Undated';
  const caseTitle = targetCase.caseName || (targetCase.plaintiff ? `${targetCase.plaintiff} vs ${targetCase.defendant}` : (targetCase.victimName ? `${targetCase.victimName} vs ${targetCase.accusedName}` : caseNo));

  // Populate preview card
  const cNoDisp = document.getElementById('transferCaseNoDisplay');
  if (cNoDisp) cNoDisp.textContent = caseNo;

  const cTypeBadge = document.getElementById('transferCaseTypeBadge');
  if (cTypeBadge) {
    cTypeBadge.textContent = caseType.replace('_', ' ').toUpperCase();
    cTypeBadge.className = `case-badge ${caseType}`;
  }

  const cStatusBadge = document.getElementById('transferCaseStatusBadge');
  if (cStatusBadge) {
    const isDisposed = (targetCase.caseStatus || '').toLowerCase().includes('dispose');
    cStatusBadge.textContent = isDisposed ? 'Disposed Off' : 'Pending';
    cStatusBadge.className = isDisposed ? 'status-badge disposed' : 'status-badge pending';
  }

  const cTitleDisp = document.getElementById('transferCaseTitleDisplay');
  if (cTitleDisp) cTitleDisp.textContent = caseTitle;

  const cCourtDisp = document.getElementById('transferCurrentCourtDisplay');
  if (cCourtDisp) cCourtDisp.textContent = currentCourt;

  const cClientDisp = document.getElementById('transferClientDisplay');
  if (cClientDisp) cClientDisp.textContent = clientName;

  const cHearingDisp = document.getElementById('transferHearingDisplay');
  if (cHearingDisp) cHearingDisp.textContent = nextHearing;

  // Populate Form Fields
  const hiddenNo = document.getElementById('transferHiddenCaseNo');
  if (hiddenNo) hiddenNo.value = caseNo;

  const hiddenType = document.getElementById('transferHiddenCaseType');
  if (hiddenType) hiddenType.value = caseType;

  const hiddenFrom = document.getElementById('transferHiddenFromCourt');
  if (hiddenFrom) hiddenFrom.value = currentCourt;

  const fromDisp = document.getElementById('transferFromCourtDisplay');
  if (fromDisp) fromDisp.value = currentCourt;

  const dateInput = document.getElementById('transferDate');
  if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toISOString().split('T')[0];
  }

  const toCourtSelect = document.getElementById('transferToCourt');
  if (toCourtSelect) {
    toCourtSelect.value = '';
  }

  const searchInput = document.getElementById('transferSearchInput');
  if (searchInput) searchInput.value = caseNo;

  if (statusEl) {
    statusEl.textContent = `✅ Case "${caseNo}" loaded. Specify destination court below.`;
    statusEl.className = 'update-status-msg success';
  }

  if (previewCard) previewCard.style.display = 'block';
  if (transferForm) transferForm.style.display = 'block';
}
if (typeof loadCaseForTransfer !== 'undefined') window.loadCaseForTransfer = loadCaseForTransfer;

async function handleTransferCaseSubmit(e) {
  if (e && typeof e.preventDefault === 'function') e.preventDefault();
  if (isSubmittingTransfer) return;

  const caseNo = document.getElementById('transferHiddenCaseNo')?.value?.trim();
  const caseType = document.getElementById('transferHiddenCaseType')?.value?.trim() || 'civil';
  const fromCourt = document.getElementById('transferHiddenFromCourt')?.value?.trim() || document.getElementById('transferFromCourtDisplay')?.value?.trim();
  const toCourt = document.getElementById('transferToCourt')?.value?.trim();
  const transferDate = document.getElementById('transferDate')?.value?.trim() || new Date().toISOString().split('T')[0];
  const orderNo = document.getElementById('transferOrderNo')?.value?.trim() || '';
  const orderDate = document.getElementById('transferOrderDate')?.value?.trim() || null;
  const authority = document.getElementById('transferAuthority')?.value?.trim() || '';
  const reason = document.getElementById('transferReason')?.value?.trim() || 'Judicial / Territorial Court Transfer';
  const docLink = document.getElementById('transferDocLink')?.value?.trim() || '';
  const remarks = document.getElementById('transferRemarks')?.value?.trim() || '';
  const statusEl = document.getElementById('transferSearchStatus');
  const submitBtn = document.getElementById('submitTransferBtn');
  const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '<svg class="lucide lucide-arrow-left-right" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/></svg> Execute & Save Court Transfer';

  if (!caseNo) {
    alert('Please search and select a case to transfer first.');
    return;
  }

  if (!toCourt) {
    alert('Please select a destination court for the transfer.');
    return;
  }

  if (toCourt.toLowerCase() === fromCourt.toLowerCase()) {
    alert(`The case is already assigned to "${toCourt}". Please select a different destination court.`);
    return;
  }

  const confirmMsg = `Transfer Case "${caseNo}"\n\nFrom: ${fromCourt}\nTo: ${toCourt}\nDate: ${transferDate}\nReason: ${reason}\n\nDo you wish to execute this court transfer?`;
  if (!confirm(confirmMsg)) return;

  try {
    isSubmittingTransfer = true;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<svg class="lucide lucide-loader-2 animate-spin" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Transferring Case...';
    }

    const transferId = 'transfer_' + Date.now();
    const transferRecord = {
      id: transferId,
      case_number: caseNo,
      case_type: caseType,
      from_court: fromCourt,
      to_court: toCourt,
      transfer_date: transferDate,
      order_number: orderNo,
      order_date: orderDate || null,
      transferred_by: authority,
      transfer_reason: reason,
      doc_link: docLink,
      remarks: remarks,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // 1. Insert into Supabase case_transfers table (with graceful fallback)
    const sb = (typeof supabaseClient !== 'undefined') ? supabaseClient : (typeof window !== 'undefined' ? window.supabaseClient : null);
    if (sb) {
      try {
        const { data, error } = await sb.from('case_transfers').insert([transferRecord]).select('id');
        if (error) {
          console.warn('Could not insert into Supabase case_transfers (table may need creation):', error.message);
        } else if (data && data[0]?.id) {
          transferRecord.id = data[0].id;
        }
      } catch (insertErr) {
        console.warn('Supabase case_transfers insert exception:', insertErr);
      }
    }

    // 2. Add to in-memory state & persist to local storage backup
    allCaseTransfers.unshift(transferRecord);
    window.allCaseTransfers = allCaseTransfers;
    try {
      localStorage.setItem('case_transfers_backup', JSON.stringify(allCaseTransfers));
    } catch (e) {}

    // 3. Update the case's court in Supabase across the relevant case table
    const tableMap = {
      'civil': 'civilcases',
      'state': 'statecases',
      'criminal': 'criminalcases',
      'family': 'familycases',
      'revenue': 'revenuecases',
      'misc_civil': 'misccivilcases',
      'misc_criminal': 'misccriminalcases',
      'complaint': 'complaintcases'
    };
    const targetTable = tableMap[caseType] || 'civilcases';

    if (sb) {
      try {
        const payload = { court_name: toCourt, updated_at: new Date().toISOString() };
        await sb.from(targetTable).update(payload).ilike('case_number', caseNo);
      } catch (courtUpdateErr) {
        console.warn('Error updating court in Supabase case table:', courtUpdateErr);
      }
    }

    // 4. Update in-memory allCaseRecords
    const transferRecords = getTransferAllCaseRecords();
    const foundCase = transferRecords.find(c => {
      const num1 = (c.caseNo || '').toLowerCase();
      const num2 = (c.criminalCaseNumber || '').toLowerCase();
      return num1 === caseNo.toLowerCase() || num2 === caseNo.toLowerCase();
    });

    if (foundCase) {
      foundCase.courtName = toCourt;
      foundCase.criminalCourtName = toCourt;
      foundCase.updatedAt = new Date().toISOString();
    }

    // 5. If this case is currently open in Case Dossier, re-render it
    const curCase = (typeof currentSelectedCase !== 'undefined' ? currentSelectedCase : (typeof window !== 'undefined' ? window.currentSelectedCase : null));
    if (curCase && ((curCase.caseNo || '').toLowerCase() === caseNo.toLowerCase() || (curCase.criminalCaseNumber || '').toLowerCase() === caseNo.toLowerCase())) {
      curCase.courtName = toCourt;
      curCase.criminalCourtName = toCourt;
      if (typeof renderSelectedCaseDetails === 'function') {
        renderSelectedCaseDetails(curCase);
      }
    }

    // 6. Refresh views & tables
    if (typeof performPostCrudRefresh === 'function') {
      await performPostCrudRefresh({ caseNumber: caseNo });
    } else if (typeof window !== 'undefined' && typeof window.performPostCrudRefresh === 'function') {
      await window.performPostCrudRefresh({ caseNumber: caseNo });
    }
    renderRecentTransfersTable();
    updateTransfersCountBadge();

    // 7. Reset form and inform user
    resetTransferForm();
    if (statusEl) {
      statusEl.textContent = `🎉 Success! Case "${caseNo}" successfully transferred from "${fromCourt}" to "${toCourt}".`;
      statusEl.className = 'update-status-msg success';
    }

    if (typeof showToast === 'function') {
      showToast(`Case ${caseNo} transferred to ${toCourt}!`, 'success');
    } else {
      alert(`✅ Case ${caseNo} successfully transferred from "${fromCourt}" to "${toCourt}".`);
    }

  } catch (err) {
    console.error('Error during case transfer:', err);
    alert(`Error transferring case: ${err.message || err}`);
    if (statusEl) {
      statusEl.textContent = `❌ Error: ${err.message || err}`;
      statusEl.className = 'update-status-msg error';
    }
  } finally {
    isSubmittingTransfer = false;
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;
    }
  }
}
if (typeof handleTransferCaseSubmit !== 'undefined') window.handleTransferCaseSubmit = handleTransferCaseSubmit;

// ==============================================================================
// BULK CASES TRANSFER LOGIC & STATE
// ==============================================================================
var bulkLoadedCases = [];
var bulkSelectedCaseNumbers = new Set();
var isSubmittingBulkTransfer = false;

function switchTransferMode(mode) {
  const singleBtn = document.getElementById('transferTabBtnSingle');
  const bulkBtn = document.getElementById('transferTabBtnBulk');
  const singleContainer = document.getElementById('singleTransferContainer');
  const bulkContainer = document.getElementById('bulkTransferContainer');

  if (mode === 'bulk') {
    if (singleBtn) singleBtn.classList.remove('active');
    if (bulkBtn) bulkBtn.classList.add('active');
    if (singleContainer) singleContainer.style.display = 'none';
    if (bulkContainer) bulkContainer.style.display = 'block';

    const bulkDateInput = document.getElementById('bulkTransferDate');
    if (bulkDateInput && !bulkDateInput.value) {
      bulkDateInput.value = new Date().toISOString().split('T')[0];
    }
  } else {
    if (singleBtn) singleBtn.classList.add('active');
    if (bulkBtn) bulkBtn.classList.remove('active');
    if (singleContainer) singleContainer.style.display = 'block';
    if (bulkContainer) bulkContainer.style.display = 'none';
  }
}
if (typeof switchTransferMode !== 'undefined') window.switchTransferMode = switchTransferMode;

function onBulkOriginCourtChange() {
  const courtSelect = document.getElementById('bulkTransferFromCourt');
  const selectedCourt = courtSelect ? courtSelect.value.trim() : '';
  bulkSelectedCaseNumbers.clear();
  updateBulkSelectionCount();

  if (!selectedCourt) {
    bulkLoadedCases = [];
    renderBulkCasesTable([]);
    return;
  }

  // Find all non-disposed cases belonging to this origin court
  const records = getTransferAllCaseRecords();
  bulkLoadedCases = records.filter(c => {
    const isDisposed = typeof isCaseDisposed === 'function'
      ? isCaseDisposed(c)
      : (typeof window !== 'undefined' && typeof window.isCaseDisposed === 'function'
        ? window.isCaseDisposed(c)
        : Boolean(c.disposalDate || c.disposalComment || (c.caseStatus || '').toLowerCase().includes('dispose')));
    if (isDisposed) return false;
    const court = (c.courtName || c.criminalCourtName || '').trim().toLowerCase();
    return court === selectedCourt.toLowerCase();
  });

  const totalEl = document.getElementById('bulkTotalOriginCases');
  if (totalEl) totalEl.textContent = String(bulkLoadedCases.length);

  const filterInput = document.getElementById('bulkCaseFilterInput');
  if (filterInput) filterInput.value = '';

  renderBulkCasesTable(bulkLoadedCases);
}
if (typeof onBulkOriginCourtChange !== 'undefined') window.onBulkOriginCourtChange = onBulkOriginCourtChange;

function filterBulkCasesTable() {
  const query = (document.getElementById('bulkCaseFilterInput')?.value || '').toLowerCase().trim();
  if (!query) {
    renderBulkCasesTable(bulkLoadedCases);
    return;
  }
  const filtered = bulkLoadedCases.filter(c => {
    const num = (c.caseNo || c.criminalCaseNumber || '').toLowerCase();
    const title = getCaseDisplayTitle(c).toLowerCase();
    const plaintiff = (c.plaintiff || '').toLowerCase();
    const defendant = (c.defendant || '').toLowerCase();
    const client = (c.clientName || c.criminalClientName || '').toLowerCase();
    const stage = (c.caseStage || '').toLowerCase();
    const type = (c.caseType || '').toLowerCase();
    return num.includes(query) || title.includes(query) || plaintiff.includes(query) || defendant.includes(query) || client.includes(query) || stage.includes(query) || type.includes(query);
  });
  renderBulkCasesTable(filtered);
}
if (typeof filterBulkCasesTable !== 'undefined') window.filterBulkCasesTable = filterBulkCasesTable;

function renderBulkCasesTable(cases) {
  const tbody = document.getElementById('bulkCasesTableBody');
  if (!tbody) return;

  if (!cases || cases.length === 0) {
    const originCourt = document.getElementById('bulkTransferFromCourt')?.value?.trim();
    if (!originCourt) {
      tbody.innerHTML = '<tr><td colspan="5" class="no-results text-center py-6 text-slate-500">Please select an Origin Court above to load its active cases.</td></tr>';
    } else {
      tbody.innerHTML = `<tr><td colspan="5" class="no-results text-center py-6 text-slate-500">No active cases found in "${escapeHtml(originCourt)}".</td></tr>`;
    }
    const allCheckbox = document.getElementById('bulkSelectAllCheckbox');
    if (allCheckbox) allCheckbox.checked = false;
    return;
  }

  tbody.innerHTML = cases.map(c => {
    const caseNo = c.caseNo || c.criminalCaseNumber || '—';
    const caseType = (c.caseType || 'civil').toUpperCase();
    const title = getCaseDisplayTitle(c);
    const stage = c.caseStage || 'Pending';
    const hearing = c.nextHearing || 'Undated';
    const isChecked = bulkSelectedCaseNumbers.has(caseNo);

    return `
      <tr class="hover:bg-indigo-50/40 transition-colors">
        <td>
          <input type="checkbox" class="bulk-case-checkbox" value="${escapeHtml(caseNo)}" ${isChecked ? 'checked' : ''} onchange="onBulkCaseRowCheckboxChange(this)">
        </td>
        <td class="font-semibold text-slate-900">
          <span class="case-badge ${caseType.toLowerCase().includes('crim') ? 'criminal' : caseType.toLowerCase().includes('rev') ? 'revenue' : 'civil'}">${escapeHtml(caseType)}</span>
          ${escapeHtml(caseNo)}
        </td>
        <td>
          <div class="font-medium text-slate-800 line-clamp-1">${escapeHtml(title)}</div>
        </td>
        <td>
          <span class="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded font-medium">${escapeHtml(stage)}</span>
        </td>
        <td class="text-xs font-semibold text-slate-700">
          📅 ${escapeHtml(hearing)}
        </td>
      </tr>
    `;
  }).join('');

  const allCheckbox = document.getElementById('bulkSelectAllCheckbox');
  if (allCheckbox) {
    allCheckbox.checked = cases.length > 0 && cases.every(c => bulkSelectedCaseNumbers.has(c.caseNo || c.criminalCaseNumber));
  }
}

function onBulkCaseRowCheckboxChange(checkbox) {
  const caseNo = checkbox.value;
  if (checkbox.checked) {
    bulkSelectedCaseNumbers.add(caseNo);
  } else {
    bulkSelectedCaseNumbers.delete(caseNo);
  }
  updateBulkSelectionCount();

  const allCheckbox = document.getElementById('bulkSelectAllCheckbox');
  if (allCheckbox && bulkLoadedCases.length > 0) {
    allCheckbox.checked = bulkLoadedCases.every(c => bulkSelectedCaseNumbers.has(c.caseNo || c.criminalCaseNumber));
  }
}
if (typeof onBulkCaseRowCheckboxChange !== 'undefined') window.onBulkCaseRowCheckboxChange = onBulkCaseRowCheckboxChange;

function toggleBulkSelectAll(allCheckbox) {
  const isChecked = allCheckbox.checked;
  bulkLoadedCases.forEach(c => {
    const caseNo = c.caseNo || c.criminalCaseNumber;
    if (!caseNo) return;
    if (isChecked) {
      bulkSelectedCaseNumbers.add(caseNo);
    } else {
      bulkSelectedCaseNumbers.delete(caseNo);
    }
  });

  const rowCheckboxes = document.querySelectorAll('.bulk-case-checkbox');
  rowCheckboxes.forEach(cb => { cb.checked = isChecked; });

  updateBulkSelectionCount();
}
if (typeof toggleBulkSelectAll !== 'undefined') window.toggleBulkSelectAll = toggleBulkSelectAll;

function clearBulkCaseSelection() {
  bulkSelectedCaseNumbers.clear();
  const allCheckbox = document.getElementById('bulkSelectAllCheckbox');
  if (allCheckbox) allCheckbox.checked = false;
  const rowCheckboxes = document.querySelectorAll('.bulk-case-checkbox');
  rowCheckboxes.forEach(cb => { cb.checked = false; });
  updateBulkSelectionCount();
}
if (typeof clearBulkCaseSelection !== 'undefined') window.clearBulkCaseSelection = clearBulkCaseSelection;

function updateBulkSelectionCount() {
  const count = bulkSelectedCaseNumbers.size;
  const countEl = document.getElementById('bulkSelectedCount');
  if (countEl) countEl.textContent = String(count);
  const submitCountEl = document.getElementById('bulkSubmitBtnCount');
  if (submitCountEl) submitCountEl.textContent = String(count);
}

function insertBulkTransferReasonChip(chipText) {
  const input = document.getElementById('bulkTransferReason');
  if (input) {
    input.value = chipText;
    input.focus();
  }
}
if (typeof insertBulkTransferReasonChip !== 'undefined') window.insertBulkTransferReasonChip = insertBulkTransferReasonChip;

function resetBulkTransferForm() {
  const form = document.getElementById('bulkTransferForm');
  if (form) form.reset();
  const dateInput = document.getElementById('bulkTransferDate');
  if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
  clearBulkCaseSelection();
  const statusEl = document.getElementById('bulkTransferStatus');
  if (statusEl) {
    statusEl.textContent = '';
    statusEl.className = 'update-status-msg';
  }
}
if (typeof resetBulkTransferForm !== 'undefined') window.resetBulkTransferForm = resetBulkTransferForm;

async function handleBulkTransferSubmit(e) {
  if (e && typeof e.preventDefault === 'function') e.preventDefault();
  if (isSubmittingBulkTransfer) return;

  const originCourt = document.getElementById('bulkTransferFromCourt')?.value?.trim();
  const toCourt = document.getElementById('bulkTransferToCourt')?.value?.trim();
  const transferDate = document.getElementById('bulkTransferDate')?.value?.trim();
  const orderNo = document.getElementById('bulkTransferOrderNo')?.value?.trim() || '';
  const authority = document.getElementById('bulkTransferAuthority')?.value?.trim() || '';
  const docLink = document.getElementById('bulkTransferDocLink')?.value?.trim() || '';
  const reason = document.getElementById('bulkTransferReason')?.value?.trim() || 'Batch Judicial Reassignment';
  const remarks = document.getElementById('bulkTransferRemarks')?.value?.trim() || '';
  const statusEl = document.getElementById('bulkTransferStatus');
  const submitBtn = document.getElementById('submitBulkTransferBtn');

  if (!originCourt) {
    alert('Please select an Origin Court.');
    return;
  }

  if (bulkSelectedCaseNumbers.size === 0) {
    alert('Please select at least one case to transfer.');
    return;
  }

  if (!toCourt) {
    alert('Please select a destination court for the batch transfer.');
    return;
  }

  if (toCourt.toLowerCase() === originCourt.toLowerCase()) {
    alert(`Destination court cannot be the same as origin court ("${toCourt}").`);
    return;
  }

  if (!transferDate) {
    alert('Please provide the date of the transfer order.');
    return;
  }

  const selectedList = Array.from(bulkSelectedCaseNumbers);
  const confirmMsg = `Execute Batch Court Transfer\n\nTotal Cases to Transfer: ${selectedList.length}\nFrom: ${originCourt}\nTo: ${toCourt}\nOrder Date: ${transferDate}\nReason: ${reason}\n\nAre you sure you want to transfer these ${selectedList.length} cases?`;
  if (!confirm(confirmMsg)) return;

  try {
    isSubmittingBulkTransfer = true;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<svg class="lucide lucide-loader-2 animate-spin" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Transferring ${selectedList.length} Cases...`;
    }

    const tableMap = {
      'civil': 'civilcases',
      'state': 'statecases',
      'criminal': 'criminalcases',
      'family': 'familycases',
      'revenue': 'revenuecases',
      'misc_civil': 'misccivilcases',
      'misc_criminal': 'misccriminalcases',
      'complaint': 'complaintcases'
    };

    const newTransferRecords = [];
    const nowIso = new Date().toISOString();
    const records = getTransferAllCaseRecords();
    const sb = (typeof supabaseClient !== 'undefined') ? supabaseClient : (typeof window !== 'undefined' ? window.supabaseClient : null);

    for (let i = 0; i < selectedList.length; i++) {
      const caseNo = selectedList[i];
      const caseObj = records.find(c => {
        const cNo = (c.caseNo || c.criminalCaseNumber || '').toLowerCase();
        return cNo === caseNo.toLowerCase();
      });

      const caseType = caseObj ? (caseObj.caseType || 'civil').toLowerCase() : 'civil';
      const transferId = 'transfer_' + Date.now() + '_' + i;
      const transferRecord = {
        id: transferId,
        case_number: caseNo,
        case_type: caseType,
        from_court: originCourt,
        to_court: toCourt,
        transfer_date: transferDate,
        order_number: orderNo,
        order_date: transferDate,
        transferred_by: authority,
        transfer_reason: reason,
        doc_link: docLink,
        remarks: remarks,
        created_at: nowIso,
        updated_at: nowIso
      };

      // Insert into Supabase case_transfers
      if (sb) {
        try {
          const { data, error } = await sb.from('case_transfers').insert([transferRecord]).select('id');
          if (!error && data && data[0]?.id) {
            transferRecord.id = data[0].id;
          }
        } catch (err) {
          console.warn('Supabase case_transfers insert err:', err);
        }

        // Update court_name in case table
        try {
          const targetTable = tableMap[caseType] || 'civilcases';
          await sb.from(targetTable).update({ court_name: toCourt, updated_at: nowIso }).ilike('case_number', caseNo);
        } catch (courtErr) {
          console.warn('Error updating court for case', caseNo, courtErr);
        }
      }

      // Update in-memory
      if (caseObj) {
        caseObj.courtName = toCourt;
        caseObj.criminalCourtName = toCourt;
        caseObj.updatedAt = nowIso;
      }

      // Also update dossier if currently open
      const curCase = (typeof currentSelectedCase !== 'undefined' ? currentSelectedCase : (typeof window !== 'undefined' ? window.currentSelectedCase : null));
      if (curCase && ((curCase.caseNo || '').toLowerCase() === caseNo.toLowerCase() || (curCase.criminalCaseNumber || '').toLowerCase() === caseNo.toLowerCase())) {
        curCase.courtName = toCourt;
        curCase.criminalCourtName = toCourt;
        if (typeof renderSelectedCaseDetails === 'function') {
          renderSelectedCaseDetails(curCase);
        }
      }

      newTransferRecords.unshift(transferRecord);
    }

    // Add to allCaseTransfers
    allCaseTransfers.unshift(...newTransferRecords);
    window.allCaseTransfers = allCaseTransfers;
    try {
      localStorage.setItem('case_transfers_backup', JSON.stringify(allCaseTransfers));
    } catch (e) {}

    // Refresh views
    if (typeof performPostCrudRefresh === 'function') {
      await performPostCrudRefresh();
    } else if (typeof window !== 'undefined' && typeof window.performPostCrudRefresh === 'function') {
      await window.performPostCrudRefresh();
    }
    renderRecentTransfersTable();
    updateTransfersCountBadge();

    // Reload the bulk origin court list (the transferred cases won't belong to origin anymore!)
    onBulkOriginCourtChange();

    resetBulkTransferForm();

    if (statusEl) {
      statusEl.textContent = `🎉 Success! Transferred ${selectedList.length} cases from "${originCourt}" to "${toCourt}".`;
      statusEl.className = 'update-status-msg success';
    }

    if (typeof showToast === 'function') {
      showToast(`Batch transfer complete! ${selectedList.length} cases transferred to ${toCourt}`, 'success');
    } else {
      alert(`✅ Success! ${selectedList.length} cases successfully transferred from "${originCourt}" to "${toCourt}".`);
    }

  } catch (err) {
    console.error('Bulk transfer failed:', err);
    alert('An error occurred during batch transfer: ' + err.message);
  } finally {
    isSubmittingBulkTransfer = false;
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<svg class="lucide lucide-layers" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg> Execute Batch Transfer (<span id="bulkSubmitBtnCount">0</span> Cases)`;
    }
  }
}
if (typeof handleBulkTransferSubmit !== 'undefined') window.handleBulkTransferSubmit = handleBulkTransferSubmit;

function renderRecentTransfersTable() {
  const tbody = document.getElementById('transfersRegistryTableBody');
  const badge = document.getElementById('transfersTotalCountBadge');
  const transfers = getTransferAllTransfers();
  if (badge) {
    badge.textContent = `${transfers.length} Transfer${transfers.length === 1 ? '' : 's'} Logged`;
  }
  if (!tbody) return;

  if (transfers.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="transfer-empty-cell">No case transfers recorded yet.</td></tr>';
    return;
  }

  tbody.innerHTML = transfers.slice(0, 25).map((t) => {
    const cleanDoc = safeUrl(t.doc_link);
    const docBtn = cleanDoc
      ? `<a href="${cleanDoc}" target="_blank" rel="noopener noreferrer" class="table-action-icon-btn" title="View Order Document"><svg class="lucide lucide-file-down" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M12 18v-6"/><path d="m9 15 3 3 3-3"/></svg></a>`
      : '';

    return `
      <tr>
        <td>${formatDateDMY(t.transfer_date)}</td>
        <td>
          <a href="#" onclick="if (typeof openCaseHistoryModalByNo === 'function') openCaseHistoryModalByNo('${escapeHtml(t.case_number)}'); else showCaseDetails('${escapeHtml(t.case_number)}'); return false;">
            ${escapeHtml(t.case_number)}
          </a>
        </td>
        <td>
          <div class="transfer-direction-pill">
            <span class="transfer-from-court-badge">${escapeHtml(t.from_court || '—')}</span>
            <span class="transfer-arrow-icon"><svg class="lucide lucide-arrow-right" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>
            <span class="transfer-to-court-badge">${escapeHtml(t.to_court || '—')}</span>
          </div>
        </td>
        <td>
          <strong>${escapeHtml(t.order_number || '—')}</strong>
          ${t.transferred_by ? `<div>${escapeHtml(t.transferred_by)}</div>` : ''}
        </td>
        <td>
          <span class="transfer-reason-chip">${escapeHtml(t.transfer_reason || 'Court Transfer')}</span>
        </td>
        <td>
          <div>
            <button type="button" class="table-action-icon-btn" onclick="if (typeof openCaseHistoryModalByNo === 'function') openCaseHistoryModalByNo('${escapeHtml(t.case_number)}'); else showCaseDetails('${escapeHtml(t.case_number)}')" title="View Case Dossier">
              <svg class="lucide lucide-eye" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
            ${docBtn}
          </div>
        </td>
      </tr>
    `;
  }).join('');

  // Also populate Cards View
  const cardsContainer = document.getElementById('transfersRegistryCardsContainer');
  if (cardsContainer) {
    if (transfers.length === 0) {
      cardsContainer.innerHTML = '<div class="transfer-empty-cell text-center py-6">No case transfers recorded yet.</div>';
    } else {
      cardsContainer.innerHTML = transfers.slice(0, 25).map((t) => {
        const cleanDoc = safeUrl(t.doc_link);
        const docBtn = cleanDoc
          ? `<a href="${cleanDoc}" target="_blank" rel="noopener noreferrer" class="act act-doc" title="View Order Document"><svg class="lucide lucide-file-down" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M12 18v-6"/><path d="m9 15 3 3 3-3"/></svg><span>Order</span></a>`
          : '';
        return `
          <div class="transfer-card-item">
            <div class="transfer-card-item-head">
              <span class="transfer-card-caseno">${escapeHtml(t.case_number)}</span>
              <span class="transfer-card-date">${formatDateDMY(t.transfer_date)}</span>
            </div>
            <div class="transfer-direction-pill">
              <span class="transfer-from-court-badge">${escapeHtml(t.from_court || '—')}</span>
              <span class="transfer-arrow-icon"><svg class="lucide lucide-arrow-right" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>
              <span class="transfer-to-court-badge">${escapeHtml(t.to_court || '—')}</span>
            </div>
            <div class="transfer-card-meta">
              <span><strong>Order:</strong> ${escapeHtml(t.order_number || 'Suo-moto / Admin')}</span>
              ${t.transferred_by ? `<span><strong>Auth:</strong> ${escapeHtml(t.transferred_by)}</span>` : ''}
            </div>
            <div class="transfer-card-reason">
              <span class="transfer-reason-chip">${escapeHtml(t.transfer_reason || 'Court Transfer')}</span>
            </div>
            <div class="transfer-card-actions">
              <button type="button" class="act act-dossier" onclick="if (typeof openCaseHistoryModalByNo === 'function') openCaseHistoryModalByNo('${escapeHtml(t.case_number)}'); else showCaseDetails('${escapeHtml(t.case_number)}')" title="View Case Dossier">
                <svg class="lucide lucide-eye" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
                <span>Dossier</span>
              </button>
              ${docBtn}
            </div>
          </div>
        `;
      }).join('');
    }
  }
}
if (typeof renderRecentTransfersTable !== 'undefined') window.renderRecentTransfersTable = renderRecentTransfersTable;

function renderCaseTransferHistory(caseNumber, caseObj) {
  const tbody = document.getElementById('detailInlineTransferTableBody');
  const badge = document.getElementById('detailTransferCountBadge');
  if (!tbody) return;

  const targetNo = (caseNumber || '').trim().toLowerCase();
  const allTransfers = getTransferAllTransfers();
  const transfers = allTransfers.filter(t => (t.case_number || '').trim().toLowerCase() === targetNo);

  // Sort descending by transfer_date or created_at
  transfers.sort((a, b) => {
    const da = new Date(a.transfer_date || a.created_at);
    const db = new Date(b.transfer_date || b.created_at);
    return db - da;
  });

  if (badge) {
    badge.textContent = `${transfers.length} Transfer${transfers.length === 1 ? '' : 's'}`;
  }

  if (transfers.length === 0) {
    const currentCourt = caseObj ? (caseObj.courtName || caseObj.criminalCourtName || 'Assigned Court') : 'Assigned Court';
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="no-results text-center py-4">
          ℹ️ No court transfer records found for this case. Matter is presently pending before <strong>${escapeHtml(currentCourt)}</strong>.
          <div>
            <button type="button" class="table-view-btn" onclick="openTransferForCase('${escapeHtml(caseNumber)}')">
              🔄 Transfer to Another Court
            </button>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = transfers.map((t, idx) => {
    const cleanDoc = safeUrl(t.doc_link);
    const docLinkHtml = cleanDoc
      ? `<a href="${cleanDoc}" target="_blank" rel="noopener noreferrer" class="table-action-icon-btn" title="View Transfer Order Document"><svg class="lucide lucide-file-down" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M12 18v-6"/><path d="m9 15 3 3 3-3"/></svg></a>`
      : '<span>—</span>';

    const authorityHtml = t.transferred_by ? `<div>Auth: ${escapeHtml(t.transferred_by)}</div>` : '';
    const orderNoHtml = t.order_number ? `<strong>${escapeHtml(t.order_number)}</strong>` : '<span>Suo-moto / Admin</span>';

    return `
      <tr>
        <td>#${idx + 1}</td>
        <td>${formatDateDMY(t.transfer_date)}</td>
        <td>
          <div class="transfer-direction-pill">
            <span class="transfer-from-court-badge" title="Origin Court">${escapeHtml(t.from_court || 'Origin Court')}</span>
            <span class="transfer-arrow-icon"><svg class="lucide lucide-arrow-right" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>
            <span class="transfer-to-court-badge" title="Destination Court">${escapeHtml(t.to_court || 'Destination Court')}</span>
          </div>
        </td>
        <td>
          ${orderNoHtml}
          ${authorityHtml}
        </td>
        <td>
          <span class="transfer-reason-chip">${escapeHtml(t.transfer_reason || 'Court Transfer')}</span>
          ${t.remarks ? `<div>${escapeHtml(t.remarks)}</div>` : ''}
        </td>
        <td>
          ${docLinkHtml}
        </td>
      </tr>
    `;
  }).join('');
}
if (typeof renderCaseTransferHistory !== 'undefined') window.renderCaseTransferHistory = renderCaseTransferHistory;

function insertTransferReasonChip(reasonText) {
  const reasonInput = document.getElementById('transferReason');
  if (reasonInput) {
    reasonInput.value = reasonText;
    reasonInput.focus();
  }
}
if (typeof insertTransferReasonChip !== 'undefined') window.insertTransferReasonChip = insertTransferReasonChip;

function resetTransferForm() {
  const previewCard = document.getElementById('transferSelectedCaseCard');
  const transferForm = document.getElementById('transferCaseForm');
  const searchInput = document.getElementById('transferSearchInput');
  const statusEl = document.getElementById('transferSearchStatus');

  if (previewCard) previewCard.style.display = 'none';
  if (transferForm) {
    transferForm.reset();
    transferForm.style.display = 'none';
  }
  if (searchInput) searchInput.value = '';
  if (statusEl) {
    statusEl.textContent = '';
    statusEl.className = 'update-status-msg';
  }
}
if (typeof resetTransferForm !== 'undefined') window.resetTransferForm = resetTransferForm;

function openTransferForCase(caseNo) {
  showTab('transfer');
  const searchInput = document.getElementById('transferSearchInput');
  if (searchInput) {
    searchInput.value = caseNo || '';
  }
  loadCaseForTransfer(caseNo);
}
if (typeof openTransferForCase !== 'undefined') window.openTransferForCase = openTransferForCase;

function updateTransfersCountBadge() {
  const badge = document.getElementById('transfersTotalCountBadge');
  if (badge) {
    const len = getTransferAllTransfers().length;
    badge.textContent = `${len} Transfer${len === 1 ? '' : 's'} Logged`;
  }
}
if (typeof updateTransfersCountBadge !== 'undefined') window.updateTransfersCountBadge = updateTransfersCountBadge;



var currentTransferRegistryViewMode = 'table';
function setTransferRegistryViewMode(mode) {
  currentTransferRegistryViewMode = mode;
  const tableWrap = document.getElementById('transferRegistryTableView');
  const cardsWrap = document.getElementById('transferRegistryCardsView');
  const btnTable = document.getElementById('transferRegistryToggleTable');
  const btnCards = document.getElementById('transferRegistryToggleCards');
  if (btnTable && btnCards) {
    btnTable.classList.toggle('active', mode === 'table');
    btnCards.classList.toggle('active', mode === 'cards');
  }
  if (tableWrap && cardsWrap) {
    if (mode === 'cards') {
      tableWrap.classList.add('hidden');
      cardsWrap.classList.remove('hidden');
    } else {
      tableWrap.classList.remove('hidden');
      cardsWrap.classList.add('hidden');
    }
  }
}
if (typeof setTransferRegistryViewMode !== 'undefined') window.setTransferRegistryViewMode = setTransferRegistryViewMode;
