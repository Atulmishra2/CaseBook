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

// ==============================================================================
// Case Transfer to Another Court (Inter-Court Jurisdictional Transfer)
// ==============================================================================

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

  // 1. Check for exact case number match first
  let exactMatch = allCaseRecords.find(c => {
    const num1 = (c.caseNo || '').toLowerCase();
    const num2 = (c.criminalCaseNumber || '').toLowerCase();
    return num1 === query || num2 === query;
  });

  // 2. Filter all potential matches
  const matches = allCaseRecords.filter(c => {
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
            <small style="color:#64748b;">Click a case below to load it for transfer</small>
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
  const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '<i class="fa-solid fa-arrow-right-arrow-left"></i> Execute & Save Court Transfer';

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
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Transferring Case...';
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
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient.from('case_transfers').insert([transferRecord]).select('id');
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

    if (supabaseClient) {
      try {
        const payload = { court_name: toCourt, updated_at: new Date().toISOString() };
        await supabaseClient.from(targetTable).update(payload).ilike('case_number', caseNo);
      } catch (courtUpdateErr) {
        console.warn('Error updating court in Supabase case table:', courtUpdateErr);
      }
    }

    // 4. Update in-memory allCaseRecords
    const foundCase = allCaseRecords.find(c => {
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
    if (currentSelectedCase && ((currentSelectedCase.caseNo || '').toLowerCase() === caseNo.toLowerCase() || (currentSelectedCase.criminalCaseNumber || '').toLowerCase() === caseNo.toLowerCase())) {
      currentSelectedCase.courtName = toCourt;
      currentSelectedCase.criminalCourtName = toCourt;
      renderSelectedCaseDetails(currentSelectedCase);
    }

    // 6. Refresh views & tables
    await performPostCrudRefresh({ caseNumber: caseNo });
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
  bulkLoadedCases = allCaseRecords.filter(c => {
    const isDisposed = (c.caseStatus || '').toLowerCase().includes('dispose');
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
    const title = (c.caseTitle || c.complainant || c.accused || '').toLowerCase();
    const stage = (c.caseStage || '').toLowerCase();
    const type = (c.caseType || '').toLowerCase();
    return num.includes(query) || title.includes(query) || stage.includes(query) || type.includes(query);
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
    const title = c.caseTitle || `${c.complainant || 'Complainant'} vs ${c.accused || 'Accused'}`;
    const stage = c.caseStage || 'Pending';
    const hearing = c.nextHearing || 'Undated';
    const isChecked = bulkSelectedCaseNumbers.has(caseNo);

    return `
      <tr class="hover:bg-indigo-50/40 transition-colors">
        <td style="text-align: center; vertical-align: middle;">
          <input type="checkbox" class="bulk-case-checkbox" value="${escapeHtml(caseNo)}" ${isChecked ? 'checked' : ''} onchange="onBulkCaseRowCheckboxChange(this)">
        </td>
        <td class="font-semibold text-slate-900" style="vertical-align: middle;">
          <span class="case-badge ${caseType.toLowerCase().includes('crim') ? 'criminal' : caseType.toLowerCase().includes('rev') ? 'revenue' : 'civil'}" style="font-size: 10px; padding: 2px 6px; margin-right: 4px;">${escapeHtml(caseType)}</span>
          ${escapeHtml(caseNo)}
        </td>
        <td style="vertical-align: middle;">
          <div class="font-medium text-slate-800 line-clamp-1">${escapeHtml(title)}</div>
        </td>
        <td style="vertical-align: middle;">
          <span class="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded font-medium">${escapeHtml(stage)}</span>
        </td>
        <td style="vertical-align: middle;" class="text-xs font-semibold text-slate-700">
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
      submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Transferring ${selectedList.length} Cases...`;
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

    for (let i = 0; i < selectedList.length; i++) {
      const caseNo = selectedList[i];
      const caseObj = allCaseRecords.find(c => {
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
      if (supabaseClient) {
        try {
          const { data, error } = await supabaseClient.from('case_transfers').insert([transferRecord]).select('id');
          if (!error && data && data[0]?.id) {
            transferRecord.id = data[0].id;
          }
        } catch (err) {
          console.warn('Supabase case_transfers insert err:', err);
        }

        // Update court_name in case table
        try {
          const targetTable = tableMap[caseType] || 'civilcases';
          await supabaseClient.from(targetTable).update({ court_name: toCourt, updated_at: nowIso }).ilike('case_number', caseNo);
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
      if (currentSelectedCase && ((currentSelectedCase.caseNo || '').toLowerCase() === caseNo.toLowerCase() || (currentSelectedCase.criminalCaseNumber || '').toLowerCase() === caseNo.toLowerCase())) {
        currentSelectedCase.courtName = toCourt;
        currentSelectedCase.criminalCourtName = toCourt;
        renderSelectedCaseDetails(currentSelectedCase);
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
    await performPostCrudRefresh();
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
      submitBtn.innerHTML = `<i class="fa-solid fa-layer-group"></i> Execute Batch Transfer (<span id="bulkSubmitBtnCount">0</span> Cases)`;
    }
  }
}
if (typeof handleBulkTransferSubmit !== 'undefined') window.handleBulkTransferSubmit = handleBulkTransferSubmit;

function renderRecentTransfersTable() {
  const tbody = document.getElementById('transfersRegistryTableBody');
  const badge = document.getElementById('transfersTotalCountBadge');
  if (badge) {
    badge.textContent = `${allCaseTransfers.length} Transfer${allCaseTransfers.length === 1 ? '' : 's'} Logged`;
  }
  if (!tbody) return;

  if (allCaseTransfers.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="no-results text-center py-4">No case transfers recorded yet.</td></tr>';
    return;
  }

  tbody.innerHTML = allCaseTransfers.slice(0, 25).map((t, idx) => {
    const cleanDoc = safeUrl(t.doc_link);
    const docBtn = cleanDoc
      ? `<a href="${cleanDoc}" target="_blank" rel="noopener noreferrer" class="table-action-icon-btn" title="View Order Document" style="display:inline-flex; align-items:center; justify-content:center; width:28px; height:28px; border-radius:6px; background:#eff6ff; color:#2563eb; border:1px solid #bfdbfe;"><i class="fa-solid fa-file-arrow-down"></i></a>`
      : '';

    return `
      <tr>
        <td style="text-align: center; font-weight: 600; color: #64748b;">#${idx + 1}</td>
        <td style="white-space: nowrap; font-weight: 600;">${formatDateDMY(t.transfer_date)}</td>
        <td>
          <a href="#" onclick="showCaseDetails('${escapeHtml(t.case_number)}'); return false;" style="font-weight: 700; color: #1e40af; text-decoration: underline;">
            ${escapeHtml(t.case_number)}
          </a>
        </td>
        <td>
          <div class="transfer-direction-pill">
            <span class="transfer-from-court-badge">${escapeHtml(t.from_court || '—')}</span>
            <span class="transfer-arrow-icon"><i class="fa-solid fa-arrow-right"></i></span>
            <span class="transfer-to-court-badge">${escapeHtml(t.to_court || '—')}</span>
          </div>
        </td>
        <td>
          <strong style="color: #1e293b;">${escapeHtml(t.order_number || '—')}</strong>
          ${t.transferred_by ? `<div style="font-size: 11px; color: #64748b;">${escapeHtml(t.transferred_by)}</div>` : ''}
        </td>
        <td>
          <span class="transfer-reason-chip">${escapeHtml(t.transfer_reason || 'Court Transfer')}</span>
        </td>
        <td style="text-align: center;">
          <div style="display: inline-flex; align-items: center; gap: 6px;">
            <button type="button" class="table-action-icon-btn" onclick="showCaseDetails('${escapeHtml(t.case_number)}')" title="View Case Dossier" style="display:inline-flex; align-items:center; justify-content:center; width:28px; height:28px; border-radius:6px; background:#f8fafc; color:#334155; border:1px solid #cbd5e1;">
              <i class="fa-solid fa-eye"></i>
            </button>
            ${docBtn}
          </div>
        </td>
      </tr>
    `;
  }).join('');
}
if (typeof renderRecentTransfersTable !== 'undefined') window.renderRecentTransfersTable = renderRecentTransfersTable;

function renderCaseTransferHistory(caseNumber, caseObj) {
  const tbody = document.getElementById('detailInlineTransferTableBody');
  const badge = document.getElementById('detailTransferCountBadge');
  if (!tbody) return;

  const targetNo = (caseNumber || '').trim().toLowerCase();
  const transfers = (allCaseTransfers || []).filter(t => (t.case_number || '').trim().toLowerCase() === targetNo);

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
        <td colspan="6" class="no-results text-center py-4" style="color: #64748b; padding: 2rem;">
          ℹ️ No court transfer records found for this case. Matter is presently pending before <strong>${escapeHtml(currentCourt)}</strong>.
          <div style="margin-top: 8px;">
            <button type="button" class="table-view-btn" onclick="openTransferForCase('${escapeHtml(caseNumber)}')" style="font-size: 0.8rem; background: #eef2ff; color: #4338ca; border-color: #c7d2fe;">
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
      ? `<a href="${cleanDoc}" target="_blank" rel="noopener noreferrer" class="table-action-icon-btn" title="View Transfer Order Document" style="display:inline-flex; align-items:center; justify-content:center; width:30px; height:30px; border-radius:6px; background:#eff6ff; color:#2563eb; border:1px solid #bfdbfe;"><i class="fa-solid fa-file-arrow-down"></i></a>`
      : '<span style="color:#94a3b8; font-size:12px;">—</span>';

    const authorityHtml = t.transferred_by ? `<div style="font-size:11px; color:#64748b; margin-top:2px;">Auth: ${escapeHtml(t.transferred_by)}</div>` : '';
    const orderNoHtml = t.order_number ? `<strong style="color:#1e293b;">${escapeHtml(t.order_number)}</strong>` : '<span style="color:#64748b;">Suo-moto / Admin</span>';

    return `
      <tr>
        <td style="text-align: center; font-weight: 600; color: #64748b;">#${idx + 1}</td>
        <td style="white-space: nowrap; font-weight: 600;">${formatDateDMY(t.transfer_date)}</td>
        <td>
          <div class="transfer-direction-pill">
            <span class="transfer-from-court-badge" title="Origin Court">${escapeHtml(t.from_court || 'Origin Court')}</span>
            <span class="transfer-arrow-icon"><i class="fa-solid fa-arrow-right"></i></span>
            <span class="transfer-to-court-badge" title="Destination Court">${escapeHtml(t.to_court || 'Destination Court')}</span>
          </div>
        </td>
        <td>
          ${orderNoHtml}
          ${authorityHtml}
        </td>
        <td>
          <span class="transfer-reason-chip">${escapeHtml(t.transfer_reason || 'Court Transfer')}</span>
          ${t.remarks ? `<div style="font-size:11px; color:#475569; margin-top:3px; font-style:italic;">${escapeHtml(t.remarks)}</div>` : ''}
        </td>
        <td style="text-align: center;">
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
    badge.textContent = `${allCaseTransfers.length} Transfer${allCaseTransfers.length === 1 ? '' : 's'} Logged`;
  }
}
if (typeof updateTransfersCountBadge !== 'undefined') window.updateTransfersCountBadge = updateTransfersCountBadge;

