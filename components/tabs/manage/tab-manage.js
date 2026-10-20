// ==============================================================================
// CASEBOOK — UNIFIED CASE HUB (ADD, UPDATE & DELETE) JAVASCRIPT CONTROLLER
// Location: components/tabs/manage/manage.js
// ==============================================================================

// ==============================================================================
// UNIFIED INPUT STYLING CONSTANT & REUSABLE COMPONENT (FORWARD DATES TAB COLORS)
// ==============================================================================
const CASE_HUB_INPUT_CLASSES = "bg-[#0E1726] border border-[#334155] rounded-xl px-4 py-3.5 text-[#f8fafc] outline-none transition-all duration-300 focus:border-[#3b82f6] focus:ring-[3px] focus:ring-[#3b82f6]/25 focus:bg-[#0E1726] placeholder:text-[#64748b]";
window.CASE_HUB_INPUT_CLASSES = CASE_HUB_INPUT_CLASSES;

/**
 * Reusable Component helper function to apply the unified soft dark Tailwind styles
 */
function createCaseHubInput({ id, type = 'text', placeholder = '', value = '', required = false, readonly = false, extraClasses = '', onchange = '', rows = 2, options = '' }) {
  const combinedCls = `${CASE_HUB_INPUT_CLASSES} w-full ${extraClasses}`.trim();
  if (type === 'select') {
    return `<select id="${id}" class="${combinedCls}" ${required ? 'required' : ''} ${onchange ? `onchange="${onchange}"` : ''}>${options}</select>`;
  }
  if (type === 'textarea') {
    return `<textarea id="${id}" class="${combinedCls}" rows="${rows}" placeholder="${placeholder}" ${required ? 'required' : ''} ${readonly ? 'readonly' : ''}>${value}</textarea>`;
  }
  return `<input type="${type}" id="${id}" class="${combinedCls}" placeholder="${placeholder}" value="${value}" ${required ? 'required' : ''} ${readonly ? 'readonly' : ''} ${onchange ? `onchange="${onchange}"` : ''} />`;
}
window.createCaseHubInput = createCaseHubInput;

window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs['manage'] = `<div class="case-hub-wrapper">
    <div class="hub-card">
        <div class="hub-header">
            <div class="hub-title-group">
                <div class="hub-title-icon-wrap" id="hubTitleIcon">
                    <iconify-icon icon="lucide:folder-plus"></iconify-icon>
                </div>
                <div>
                    <h1 id="hubActiveTitle">Register New Case</h1>
                    <p id="hubActiveDesc">Fill required details below to create and schedule a new legal matter.</p>
                </div>
            </div>
            <div class="segmented-control" role="tablist">
                <button type="button" class="segment-btn active" data-tab="add" onclick="switchCaseHubMode('add')">
                    <iconify-icon icon="lucide:plus-circle"></iconify-icon>
                    <span>Add Case</span>
                </button>
                <button type="button" class="segment-btn" data-tab="update" onclick="switchCaseHubMode('update')">
                    <iconify-icon icon="lucide:edit-3"></iconify-icon>
                    <span>Update Case</span>
                </button>
                <button type="button" class="segment-btn danger-tab" data-tab="delete" onclick="switchCaseHubMode('delete')">
                    <iconify-icon icon="lucide:trash-2"></iconify-icon>
                    <span>Delete Case</span>
                </button>
            </div>
        </div>

        <!-- MODE 1: ADD NEW CASE -->
        <div id="pane-add" class="tab-pane active" role="tabpanel">
            <div class="lookup-box type-selector-box">
                <div class="lookup-header-line">
                    <span class="lookup-label">1. Select Case Category</span>
                    <span class="lookup-caption">Choose category to configure relevant statutory fields</span>
                </div>
                <div class="form-group" style="margin-bottom: 0;">
                    <select id="caseHubTypeSelect" class="${CASE_HUB_INPUT_CLASSES} w-full" onchange="renderCaseHubAddForm(this.value)">
                        <option value="">-- Select Case Category (प्रकार चुनें) --</option>
                        <option value="civil" selected>🏛️ Civil Suit / Original Suit (दीवानी)</option>
                        <option value="criminal">⚖️ Criminal Case / State Matter (फौजदारी - चालानी)</option>
                        <option value="family">👨‍👩‍👧 Family Court / Matrimonial (पारिवारिक)</option>
                        <option value="revenue">🌾 Revenue Court Matter (राजस्व)</option>
                        <option value="misc">📑 MISC Civil Application (विविध दीवानी)</option>
                        <option value="bail">🔒 Bail Application (जमानत प्रार्थना पत्र)</option>
                        <option value="cheque">💳 Cheque Bounce (NI Act Sec 138)</option>
                    </select>
                </div>
            </div>
            <div id="caseHubAddFormContainer"></div>
        </div>

        <!-- MODE 2: UPDATE CASE -->
        <div id="pane-update" class="tab-pane" role="tabpanel">
            <div class="lookup-box" id="updateLookupBox">
                <div class="lookup-header-line">
                    <span class="lookup-label">1. Search &amp; Load Case Record</span>
                    <span class="lookup-caption">Find by Case Number, Client Name, or Parties to load live record</span>
                </div>
                <div class="case-search-hub-bar">
                    <div class="search-input-wrapper">
                        <iconify-icon icon="lucide:search" class="search-prefix-icon"></iconify-icon>
                        <input
                            type="text"
                            class="search-input ${CASE_HUB_INPUT_CLASSES}"
                            id="hubUpdateSearchInput"
                            placeholder="Type Case Number (e.g. CIV-2026-010, Cr.Rev./129/2026)..."
                            autocomplete="off"
                            oninput="toggleSearchClearBtn('update')"
                            onkeydown="if(event.key === 'Enter'){ event.preventDefault(); performCaseHubSearch('update'); }"
                        />
                        <button
                            type="button"
                            class="search-clear-btn"
                            id="hubUpdateSearchClearBtn"
                            onclick="clearSearchInput('update')"
                            style="display: none;"
                            title="Clear search query"
                        >
                            <iconify-icon icon="lucide:x"></iconify-icon>
                        </button>
                    </div>
                    <div class="search-mode-toggle" id="updateSearchModeToggle">
                        <button
                            type="button"
                            class="search-mode-btn active"
                            data-mode="number"
                            onclick="setCaseHubSearchMode('number', 'update')"
                            title="Filter by Case Number"
                        >
                            <iconify-icon icon="lucide:hash"></iconify-icon>
                            <span>Case No.</span>
                        </button>
                        <button
                            type="button"
                            class="search-mode-btn"
                            data-mode="name"
                            onclick="setCaseHubSearchMode('name', 'update')"
                            title="Filter by Party or Client Name"
                        >
                            <iconify-icon icon="lucide:user"></iconify-icon>
                            <span>Party / Client</span>
                        </button>
                    </div>
                    <button type="button" class="btn-action btn-primary search-submit-btn" onclick="performCaseHubSearch('update')">
                        <iconify-icon icon="lucide:search"></iconify-icon>
                        <span>Search Case</span>
                    </button>
                </div>
                <div id="hubUpdateResultsContainer" class="search-results-wrapper" style="display: none;">
                    <div class="search-results-container">
                        <div class="search-results-header">
                            <span id="hubUpdateResultsCount">0 matching records found</span>
                            <button type="button" class="btn-ghost btn-sm" onclick="clearCaseHubSearchResults('update')">
                                <iconify-icon icon="lucide:x"></iconify-icon> Dismiss
                            </button>
                        </div>
                        <div id="hubUpdateResultsList" class="search-results-list"></div>
                    </div>
                </div>
            </div>
            <div id="caseHubUpdateFormContainer">
                <div class="empty-state">
                    <iconify-icon icon="lucide:file-search"></iconify-icon>
                    <div class="empty-title">No Case Loaded For Editing</div>
                    <div class="empty-sub">Search and select a case in the box above to load its details into the editor.</div>
                </div>
            </div>
        </div>

        <!-- MODE 3: DELETE CASE -->
        <div id="pane-delete" class="tab-pane" role="tabpanel">
            <div class="lookup-box danger-lookup-box" id="deleteLookupBox">
                <div class="lookup-header-line">
                    <span class="lookup-label danger-label">1. Search &amp; Inspect Case to Delete</span>
                    <span class="lookup-caption">Carefully inspect the case particulars before executing permanent disposal</span>
                </div>
                <div class="case-search-hub-bar">
                    <div class="search-input-wrapper">
                        <iconify-icon icon="lucide:search" class="search-prefix-icon"></iconify-icon>
                        <input
                            type="text"
                            class="search-input ${CASE_HUB_INPUT_CLASSES}"
                            id="hubDeleteSearchInput"
                            placeholder="Type Case Number (e.g. CIV-2026-010, FIR-45)..."
                            autocomplete="off"
                            oninput="toggleSearchClearBtn('delete')"
                            onkeydown="if(event.key === 'Enter'){ event.preventDefault(); performCaseHubSearch('delete'); }"
                        />
                        <button
                            type="button"
                            class="search-clear-btn"
                            id="hubDeleteSearchClearBtn"
                            onclick="clearSearchInput('delete')"
                            style="display: none;"
                            title="Clear search query"
                        >
                            <iconify-icon icon="lucide:x"></iconify-icon>
                        </button>
                    </div>
                    <div class="search-mode-toggle" id="deleteSearchModeToggle">
                        <button
                            type="button"
                            class="search-mode-btn active"
                            data-mode="number"
                            onclick="setCaseHubSearchMode('number', 'delete')"
                            title="Filter by Case Number"
                        >
                            <iconify-icon icon="lucide:hash"></iconify-icon>
                            <span>Case No.</span>
                        </button>
                        <button
                            type="button"
                            class="search-mode-btn"
                            data-mode="name"
                            onclick="setCaseHubSearchMode('name', 'delete')"
                            title="Filter by Party or Client Name"
                        >
                            <iconify-icon icon="lucide:user"></iconify-icon>
                            <span>Party / Client</span>
                        </button>
                    </div>
                    <button type="button" class="btn-action btn-danger search-submit-btn" onclick="performCaseHubSearch('delete')">
                        <iconify-icon icon="lucide:search"></iconify-icon>
                        <span>Find Case</span>
                    </button>
                </div>
                <div id="hubDeleteResultsContainer" class="search-results-wrapper" style="display: none;">
                    <div class="search-results-container">
                        <div class="search-results-header">
                            <span id="hubDeleteResultsCount">0 matching records found</span>
                            <button type="button" class="btn-ghost btn-sm" onclick="clearCaseHubSearchResults('delete')">
                                <iconify-icon icon="lucide:x"></iconify-icon> Dismiss
                            </button>
                        </div>
                        <div id="hubDeleteResultsList" class="search-results-list"></div>
                    </div>
                </div>
            </div>
            <div id="caseHubDeleteFormContainer">
                <div class="empty-state">
                    <iconify-icon icon="lucide:shield-alert"></iconify-icon>
                    <div class="empty-title">No Case Inspected for Deletion</div>
                    <div class="empty-sub">Search by case number above to preview the case particulars and review associated records before removal.</div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- DELETE MODAL OVERLAY -->
<div id="hubDeleteModalOverlay" class="hub-modal-overlay" style="display: none;">
    <div class="hub-modal-card">
        <div class="hub-modal-icon danger">
            <iconify-icon icon="lucide:alert-triangle"></iconify-icon>
        </div>
        <h3>Confirm Permanent Deletion</h3>
        <p>
            You are about to permanently delete <strong id="hubModalCaseNo">—</strong> (<span id="hubModalCaseName">—</span>).
            <br>
            All past proceedings, scheduled hearings, client notes, and linked records will be irreversibly wiped from the database.
        </p>
        <div class="hub-modal-actions">
            <button type="button" class="btn-action btn-ghost" onclick="closeCaseHubDeleteModal()">
                Cancel
            </button>
            <button type="button" class="btn-action btn-danger" id="hubModalConfirmDeleteBtn" onclick="confirmCaseHubDeletion()">
                <iconify-icon icon="lucide:trash-2"></iconify-icon>
                Delete Permanently
            </button>
        </div>
    </div>
</div>`;

// State Variables
var currentCaseHubMode = 'add';
var caseHubSearchModes = { update: 'number', delete: 'number' };
var activeUpdateCaseObj = null;
var activeDeleteCaseObj = null;
var pendingCaseHubDeleteNo = null;

// Mode Switcher
function switchCaseHubMode(mode) {
  currentCaseHubMode = mode;
  document.querySelectorAll('.case-hub-wrapper .segment-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === mode);
  });
  document.querySelectorAll('.case-hub-wrapper .tab-pane').forEach(pane => {
    pane.classList.remove('active');
  });

  const titleEl = document.getElementById('hubActiveTitle');
  const descEl = document.getElementById('hubActiveDesc');
  const iconWrap = document.getElementById('hubTitleIcon');

  if (mode === 'add') {
    document.getElementById('pane-add')?.classList.add('active');
    if (titleEl) titleEl.textContent = 'Register New Case';
    if (descEl) descEl.textContent = 'Fill required details below to create and schedule a new legal matter.';
    if (iconWrap) iconWrap.innerHTML = '<iconify-icon icon="lucide:folder-plus"></iconify-icon>';
    renderCaseHubAddForm(document.getElementById('caseHubTypeSelect')?.value || 'civil');
  } else if (mode === 'update') {
    document.getElementById('pane-update')?.classList.add('active');
    if (titleEl) titleEl.textContent = 'Update Case Particulars';
    if (descEl) descEl.textContent = 'Search any existing matter to review, edit details, or update current status.';
    if (iconWrap) iconWrap.innerHTML = '<iconify-icon icon="lucide:edit-3"></iconify-icon>';
  } else if (mode === 'delete') {
    document.getElementById('pane-delete')?.classList.add('active');
    if (titleEl) titleEl.textContent = 'Delete Case Record';
    if (descEl) descEl.textContent = 'Search and inspect a case before executing permanent, irreversible removal.';
    if (iconWrap) iconWrap.innerHTML = '<iconify-icon icon="lucide:trash-2" style="color:#ef4444;"></iconify-icon>';
  }
}
window.switchCaseHubMode = switchCaseHubMode;

// Search Mode Switcher (Number vs Name)
function setCaseHubSearchMode(mode, context) {
  caseHubSearchModes[context] = mode;
  const toggle = document.getElementById(`${context}SearchModeToggle`);
  if (toggle) {
    toggle.querySelectorAll('.search-mode-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });
  }
  const input = document.getElementById(context === 'update' ? 'hubUpdateSearchInput' : 'hubDeleteSearchInput');
  if (input) {
    if (mode === 'number') {
      input.placeholder = 'Type Case Number (e.g. CIV-2026-010, FIR-45)...';
    } else {
      input.placeholder = 'Type Plaintiff, Accused, or Client Name (e.g. Ramesh, State of UP)...';
    }
    input.focus();
  }
}
window.setCaseHubSearchMode = setCaseHubSearchMode;

// Clear button inside input box
function toggleSearchClearBtn(context) {
  const input = document.getElementById(context === 'update' ? 'hubUpdateSearchInput' : 'hubDeleteSearchInput');
  const btn = document.getElementById(context === 'update' ? 'hubUpdateSearchClearBtn' : 'hubDeleteSearchClearBtn');
  if (btn && input) {
    btn.style.display = input.value.trim() ? 'flex' : 'none';
  }
}
window.toggleSearchClearBtn = toggleSearchClearBtn;

function clearSearchInput(context) {
  const input = document.getElementById(context === 'update' ? 'hubUpdateSearchInput' : 'hubDeleteSearchInput');
  const btn = document.getElementById(context === 'update' ? 'hubUpdateSearchClearBtn' : 'hubDeleteSearchClearBtn');
  if (input) {
    input.value = '';
    input.focus();
  }
  if (btn) btn.style.display = 'none';
  clearCaseHubSearchResults(context);
}
window.clearSearchInput = clearSearchInput;

function clearCaseHubSearchResults(context) {
  const container = document.getElementById(context === 'update' ? 'hubUpdateResultsContainer' : 'hubDeleteResultsContainer');
  const list = document.getElementById(context === 'update' ? 'hubUpdateResultsList' : 'hubDeleteResultsList');
  if (container) container.style.display = 'none';
  if (list) list.innerHTML = '';
}
window.clearCaseHubSearchResults = clearCaseHubSearchResults;

// Perform Search against CaseBook records
function performCaseHubSearch(context) {
  const input = document.getElementById(context === 'update' ? 'hubUpdateSearchInput' : 'hubDeleteSearchInput');
  const query = (input?.value || '').trim().toLowerCase();
  if (!query) {
    if (input) input.focus();
    return;
  }

  const mode = caseHubSearchModes[context] || 'number';
  const records = Array.isArray(window.allCaseRecords) ? window.allCaseRecords : [];

  const matches = records.filter(c => {
    const num1 = (c.caseNo || '').toLowerCase();
    const num2 = (c.criminalCaseNumber || '').toLowerCase();
    const name = (c.caseName || '').toLowerCase();
    const plaintiff = (c.plaintiff || '').toLowerCase();
    const defendant = (c.defendant || '').toLowerCase();
    const victim = (c.victimName || '').toLowerCase();
    const accused = (c.accusedName || '').toLowerCase();
    const client = (c.clientName || c.criminalClientName || '').toLowerCase();

    if (mode === 'number') {
      return num1.includes(query) || num2.includes(query);
    } else {
      return name.includes(query) || plaintiff.includes(query) || defendant.includes(query) ||
             victim.includes(query) || accused.includes(query) || client.includes(query) ||
             num1.includes(query) || num2.includes(query);
    }
  });

  renderCaseHubSearchResults(context, matches, query);
}
window.performCaseHubSearch = performCaseHubSearch;

function renderCaseHubSearchResults(context, results, query) {
  const container = document.getElementById(context === 'update' ? 'hubUpdateResultsContainer' : 'hubDeleteResultsContainer');
  const list = document.getElementById(context === 'update' ? 'hubUpdateResultsList' : 'hubDeleteResultsList');
  const countEl = document.getElementById(context === 'update' ? 'hubUpdateResultsCount' : 'hubDeleteResultsCount');

  if (!container || !list) return;

  container.style.display = 'block';
  if (countEl) countEl.textContent = `${results.length} record${results.length !== 1 ? 's' : ''} found for "${query}"`;

  if (results.length === 0) {
    list.innerHTML = `
      <div class="hub-no-results">
          <iconify-icon icon="lucide:search-x"></iconify-icon>
          No cases matched "<strong>${escapeHtml(query)}</strong>".<br>
          Please verify the case number or try searching by party name.
      </div>`;
    return;
  }

  list.innerHTML = results.slice(0, 15).map(c => {
    const cNo = c.caseNo || c.criminalCaseNumber || '—';
    const cName = c.caseName || (c.plaintiff ? `${c.plaintiff} vs ${c.defendant}` : (c.victimName ? `${c.victimName} vs ${c.accusedName}` : '—'));
    const court = c.courtName || c.criminalCourtName || 'District Court';
    const type = (c.caseType || 'civil').toLowerCase();
    const status = c.caseStatus || (c.disposed ? 'Disposed' : 'Pending');

    return `
      <div class="hub-result-item" onclick="selectCaseForHub('${escapeHtml(cNo)}', '${context}')">
          <div class="hub-result-main">
              <div class="hub-result-case-no">
                  <span>${escapeHtml(cNo)}</span>
                  <span class="hub-category-tag ${type}">${type}</span>
                  <span style="font-size: 0.72rem; color: ${status === 'Disposed' ? '#10b981' : '#f59e0b'}; font-weight: 600;">
                      ${status === 'Disposed' ? '✅ Disposed' : '⏳ Pending'}
                  </span>
              </div>
              <div class="hub-result-meta">
                  <span>👤 ${escapeHtml(cName)}</span>
                  <span>🏛️ ${escapeHtml(court)}</span>
                  ${c.nextHearing ? `<span>📅 Next: ${escapeHtml(c.nextHearing)}</span>` : ''}
              </div>
          </div>
          <button type="button" class="btn-action btn-ghost btn-sm">
              ${context === 'update' ? 'Load & Edit ➔' : 'Inspect ➔'}
          </button>
      </div>
    `;
  }).join('');
}

// Select Case from results
function selectCaseForHub(caseNo, context) {
  const records = Array.isArray(window.allCaseRecords) ? window.allCaseRecords : [];
  const found = records.find(c =>
    (c.caseNo || '').toLowerCase() === caseNo.toLowerCase() ||
    (c.criminalCaseNumber || '').toLowerCase() === caseNo.toLowerCase()
  );

  clearCaseHubSearchResults(context);

  if (!found) {
    alert(`Could not find case "${caseNo}" in registered records.`);
    return;
  }

  if (context === 'update') {
    activeUpdateCaseObj = found;
    renderCaseHubUpdateForm(found);
  } else if (context === 'delete') {
    activeDeleteCaseObj = found;
    renderCaseHubDeleteInspection(found);
  }
}
window.selectCaseForHub = selectCaseForHub;

// ==============================================================================
// ADD FORM RENDERING (MODE 1)
// ==============================================================================
function getCourtDropdownOptions(selectedCourt) {
  const deletedSet = (typeof window.getDeletedCourtsSet === 'function')
    ? window.getDeletedCourtsSet()
    : (typeof getDeletedCourtsSet === 'function' ? getDeletedCourtsSet() : new Set());

  const sourceCourts = (typeof window !== 'undefined' && Array.isArray(window.courts) && window.courts.length > 0)
    ? window.courts
    : (typeof window !== 'undefined' && Array.isArray(window.allCourts) && window.allCourts.length > 0
        ? window.allCourts
        : (typeof courts !== 'undefined' && Array.isArray(courts) ? courts : ['District Court', 'Civil Judge (SD)', 'High Court', 'Chief Judicial Magistrate']));

  const uniqueCourts = new Set();
  sourceCourts.forEach(c => {
    const t = (c || '').trim();
    if (t && (!deletedSet.has(t.toLowerCase()) || (selectedCourt && t.toLowerCase() === selectedCourt.toLowerCase()))) {
      uniqueCourts.add(t);
    }
  });

  if (selectedCourt && selectedCourt.trim() && !uniqueCourts.has(selectedCourt.trim())) {
    uniqueCourts.add(selectedCourt.trim());
  }

  const courtList = Array.from(uniqueCourts);
  courtList.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

  return courtList.map(c => `<option value="${escapeHtml(c)}" ${c.toLowerCase() === (selectedCourt || '').toLowerCase() ? 'selected' : ''}>${escapeHtml(c)}</option>`).join('');
}
window.getCourtDropdownOptions = getCourtDropdownOptions;

function renderCaseHubAddForm(caseType) {
  const container = document.getElementById('caseHubAddFormContainer');
  if (!container) return;

  const currentYear = new Date().getFullYear();
  const courtOptions = getCourtDropdownOptions();

  let fieldsHtml = '';

  if (caseType === 'criminal' || caseType === 'state') {
    fieldsHtml = `
      <div class="form-grid-2col">
          <div class="form-group">
              <label>Criminal Case / FIR Number <span class="required">*</span></label>
              <input type="text" id="hubAdd_caseNo" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. CRIM-2026-143 or FIR-45/2026" required>
          </div>
          <div class="form-group">
              <label>Crime Year <span class="required">*</span></label>
              <input type="number" id="hubAdd_year" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${currentYear}" required>
          </div>
          <div class="form-group">
              <label>Police Station / Thana</label>
              <input type="text" id="hubAdd_policeStation" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. Kotwali / Civil Lines">
          </div>
          <div class="form-group">
              <label>Statutory Sections (IPC / BNS)</label>
              <input type="text" id="hubAdd_sections" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. 302, 307 IPC / Sec 103 BNS">
          </div>
          <div class="form-group">
              <label>First Party (Prosecution)</label>
              <input type="text" id="hubAdd_plaintiff" class="${CASE_HUB_INPUT_CLASSES} w-full" value="State of U.P.">
          </div>
          <div class="form-group">
              <label>Accused Name (अभियुक्त) <span class="required">*</span></label>
              <input type="text" id="hubAdd_defendant" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="Accused person name" required>
          </div>
          <div class="form-group">
              <label>Court Name <span class="required">*</span></label>
              <select id="hubAdd_court" class="${CASE_HUB_INPUT_CLASSES} w-full" required>${courtOptions}</select>
          </div>
          <div class="form-group">
              <label>Client Mobile Number</label>
              <input type="tel" id="hubAdd_clientPhone" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="+91 XXXXXXXXXX">
          </div>
          <div class="form-group full-width">
              <label>FIR Summary / Bench Notes</label>
              <textarea id="hubAdd_remarks" class="${CASE_HUB_INPUT_CLASSES} w-full" rows="2" placeholder="Brief summary of chargesheet or bail proceedings..."></textarea>
          </div>
      </div>
    `;
  } else if (caseType === 'family') {
    fieldsHtml = `
      <div class="form-grid-2col">
          <div class="form-group">
              <label>Family Case Number <span class="required">*</span></label>
              <input type="text" id="hubAdd_caseNo" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. FAM-55/2026" required>
          </div>
          <div class="form-group">
              <label>Year <span class="required">*</span></label>
              <input type="number" id="hubAdd_year" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${currentYear}" required>
          </div>
          <div class="form-group">
              <label>Petitioner / First Party <span class="required">*</span></label>
              <input type="text" id="hubAdd_plaintiff" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="Petitioner name" required>
          </div>
          <div class="form-group">
              <label>Respondent / Second Party <span class="required">*</span></label>
              <input type="text" id="hubAdd_defendant" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="Respondent name" required>
          </div>
          <div class="form-group">
              <label>Family Court Complex</label>
              <select id="hubAdd_court" class="${CASE_HUB_INPUT_CLASSES} w-full" required>${courtOptions}</select>
          </div>
          <div class="form-group">
              <label>Client Mobile Number</label>
              <input type="tel" id="hubAdd_clientPhone" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="+91 XXXXXXXXXX">
          </div>
          <div class="form-group full-width">
              <label>Petition Summary / Remarks</label>
              <textarea id="hubAdd_remarks" class="${CASE_HUB_INPUT_CLASSES} w-full" rows="2" placeholder="Maintenance, divorce, or custody dispute details..."></textarea>
          </div>
      </div>
    `;
  } else {
    // Default: Civil Suit / Original Matters
    fieldsHtml = `
      <div class="form-grid-2col">
          <div class="form-group">
              <label>Case Number (मुकदमा संख्या) <span class="required">*</span></label>
              <input type="text" id="hubAdd_caseNo" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. CIV-2026-089 or O.S. 14/2026" required>
          </div>
          <div class="form-group">
              <label>Year <span class="required">*</span></label>
              <input type="number" id="hubAdd_year" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${currentYear}" required>
          </div>
          <div class="form-group">
              <label>Plaintiff / Petitioner (वादी) <span class="required">*</span></label>
              <input type="text" id="hubAdd_plaintiff" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="Plaintiff Name & Ors." required>
          </div>
          <div class="form-group">
              <label>Defendant / Opponent (प्रतिवादी) <span class="required">*</span></label>
              <input type="text" id="hubAdd_defendant" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="Defendant Name & Ors." required>
          </div>
          <div class="form-group">
              <label>Court Name <span class="required">*</span></label>
              <select id="hubAdd_court" class="${CASE_HUB_INPUT_CLASSES} w-full" required>${courtOptions}</select>
          </div>
          <div class="form-group">
              <label>Client Mobile Number</label>
              <input type="tel" id="hubAdd_clientPhone" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="+91 XXXXXXXXXX">
          </div>
          <div class="form-group">
              <label>Filing Date</label>
              <input type="date" id="hubAdd_filingDate" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${new Date().toISOString().split('T')[0]}">
          </div>
          <div class="form-group">
              <label>Initial Hearing Date</label>
              <input type="date" id="hubAdd_nextHearing" class="${CASE_HUB_INPUT_CLASSES} w-full">
          </div>
          <div class="form-group full-width">
              <label>Case Brief &amp; Co-Parties Remarks</label>
              <textarea id="hubAdd_remarks" class="${CASE_HUB_INPUT_CLASSES} w-full" rows="2" placeholder="Brief subject matter, property dispute details, or remarks..."></textarea>
          </div>
      </div>
    `;
  }

  container.innerHTML = `
    <form id="caseHubAddForm" onsubmit="handleCaseHubAddSubmit(event)">
        ${fieldsHtml}
        <div class="form-actions-bar">
            <button type="button" class="btn-action btn-ghost" onclick="renderCaseHubAddForm('${caseType}')">
                Reset
            </button>
            <button type="submit" class="btn-action btn-primary" id="hubAddSubmitBtn">
                <iconify-icon icon="lucide:save"></iconify-icon>
                <span>Register Case Record</span>
            </button>
        </div>
    </form>
  `;
}
window.renderCaseHubAddForm = renderCaseHubAddForm;

// Submit Handler for Add Form
async function handleCaseHubAddSubmit(e) {
  e.preventDefault();
  const caseType = document.getElementById('caseHubTypeSelect')?.value || 'civil';
  const caseNo = document.getElementById('hubAdd_caseNo')?.value?.trim();
  const caseYear = document.getElementById('hubAdd_year')?.value?.trim() || String(new Date().getFullYear());
  const plaintiff = document.getElementById('hubAdd_plaintiff')?.value?.trim() || '';
  const defendant = document.getElementById('hubAdd_defendant')?.value?.trim() || '';
  const courtName = document.getElementById('hubAdd_court')?.value?.trim() || 'District Court';
  const clientPhone = document.getElementById('hubAdd_clientPhone')?.value?.trim() || '';
  const filingDate = document.getElementById('hubAdd_filingDate')?.value || '';
  const nextHearing = document.getElementById('hubAdd_nextHearing')?.value || '—';
  const remarks = document.getElementById('hubAdd_remarks')?.value?.trim() || '';

  if (!caseNo || !plaintiff || !defendant) {
    alert('Please fill the required Case Number and Party details.');
    return;
  }

  const submitBtn = document.getElementById('hubAddSubmitBtn');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<iconify-icon icon="lucide:loader-2" class="spin"></iconify-icon> Saving...';
  }

  const newRecord = {
    caseNo: caseNo,
    caseYear: caseYear,
    caseType: caseType,
    plaintiff: plaintiff,
    defendant: defendant,
    caseName: `${plaintiff} vs ${defendant}`,
    courtName: courtName,
    clientNumber: clientPhone,
    filingDate: filingDate,
    nextHearing: nextHearing,
    caseStatus: 'Pending',
    remark: remarks
  };

  try {
    if (window.supabaseClient) {
      const table = (caseType === 'criminal' || caseType === 'state') ? 'criminalcases' :
                    (caseType === 'family') ? 'familycases' :
                    (caseType === 'revenue') ? 'revenuecases' : 'civilcases';
      await window.supabaseClient.from(table).insert([{
        case_number: caseNo,
        case_year: caseYear,
        plaintiff: plaintiff,
        defendant: defendant,
        court_name: courtName,
        client_phone: clientPhone,
        next_hearing: nextHearing,
        remarks: remarks,
        case_status: 'Pending'
      }]);
    }

    if (Array.isArray(window.allCaseRecords)) {
      window.allCaseRecords.unshift(newRecord);
    }

    if (typeof window.performPostCrudRefresh === 'function') {
      await window.performPostCrudRefresh({ caseNumber: caseNo });
    }

    alert(`✅ Case "${caseNo}" (${plaintiff} vs ${defendant}) registered successfully!`);
    renderCaseHubAddForm(caseType);
  } catch (err) {
    console.error('Add case error:', err);
    alert(`Case saved locally: "${caseNo}".`);
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<iconify-icon icon="lucide:save"></iconify-icon> <span>Register Case Record</span>';
    }
  }
}
window.handleCaseHubAddSubmit = handleCaseHubAddSubmit;

// ==============================================================================
// UPDATE FORM RENDERING (MODE 2)
// ==============================================================================
function renderCaseHubUpdateForm(c) {
  const container = document.getElementById('caseHubUpdateFormContainer');
  if (!container) return;

  const cNo = c.caseNo || c.criminalCaseNumber || '—';
  const cName = c.caseName || (c.plaintiff ? `${c.plaintiff} vs ${c.defendant}` : (c.victimName ? `${c.victimName} vs ${c.accusedName}` : '—'));
  const type = (c.caseType || 'civil').toLowerCase();
  const courtOptions = getCourtDropdownOptions(c.courtName || c.criminalCourtName);
  const status = c.caseStatus || (c.disposed ? 'Disposed' : 'Pending');
  const isDisp = typeof window.isCaseDisposed === 'function' ? window.isCaseDisposed(c) : (status || '').toLowerCase().includes('dispose');
  let selectedStatus = 'Pending';
  if (isDisp) {
    const raw = (status || '').toLowerCase();
    if (raw.includes('decid') || raw.includes('फैसला')) selectedStatus = 'Decided';
    else if (raw.includes('acquit') || raw.includes('दोषमुक्त')) selectedStatus = 'Acquitted';
    else if (raw.includes('convict') || raw.includes('दोषसिद्ध')) selectedStatus = 'Convicted';
    else if (raw.includes('dismiss') || raw.includes('खारिज')) selectedStatus = 'Dismissed';
    else if (raw.includes('decree') || raw.includes('डिक्री')) selectedStatus = 'Decreed';
    else selectedStatus = 'Disposed';
  }

  container.innerHTML = `
    <div class="selected-case-banner">
        <div class="banner-info">
            <iconify-icon icon="lucide:check-circle-2"></iconify-icon>
            <div>
                <div class="banner-title">${escapeHtml(cNo)} (${escapeHtml(type.toUpperCase())})</div>
                <div class="banner-subtitle">👤 ${escapeHtml(cName)} · 🏛️ ${escapeHtml(c.courtName || c.criminalCourtName || 'District Court')}</div>
            </div>
        </div>
        <button type="button" class="btn-action btn-ghost btn-sm" onclick="clearCaseHubUpdateSelection()">
            <iconify-icon icon="lucide:x"></iconify-icon> Close
        </button>
    </div>

    <form id="caseHubUpdateForm" onsubmit="handleCaseHubUpdateSubmit(event)">
        <div class="form-grid-2col">
            <div class="form-group">
                <label>Case Number (Permanent)</label>
                <input type="text" id="hubUpdate_caseNo" class="${CASE_HUB_INPUT_CLASSES} w-full opacity-80 cursor-not-allowed" value="${escapeHtml(cNo)}" readonly>
            </div>
            <div class="form-group">
                <label>Case Status (स्थिति)</label>
                <select id="hubUpdate_status" class="${CASE_HUB_INPUT_CLASSES} w-full">
                    <option value="Pending" ${selectedStatus === 'Pending' ? 'selected' : ''}>⏳ Pending (Active)</option>
                    <option value="Disposed" ${selectedStatus === 'Disposed' ? 'selected' : ''}>✅ Disposed Off (निस्तारित)</option>
                    <option value="Decided" ${selectedStatus === 'Decided' ? 'selected' : ''}>⚖️ Decided (निस्तारित / फैसला)</option>
                    <option value="Acquitted" ${selectedStatus === 'Acquitted' ? 'selected' : ''}>🛡️ Acquitted (दोषमुक्त)</option>
                    <option value="Convicted" ${selectedStatus === 'Convicted' ? 'selected' : ''}>⚖️ Convicted (दोषसिद्ध)</option>
                    <option value="Dismissed" ${selectedStatus === 'Dismissed' ? 'selected' : ''}>❌ Dismissed (खारिज)</option>
                    <option value="Decreed" ${selectedStatus === 'Decreed' ? 'selected' : ''}>📜 Decreed (डिक्री)</option>
                </select>
            </div>
            <div class="form-group">
                <label>Plaintiff / Petitioner (वादी)</label>
                <input type="text" id="hubUpdate_plaintiff" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.plaintiff || c.firstParty || c.victimName || '')}" required>
            </div>
            <div class="form-group">
                <label>Defendant / Opponent (प्रतिवादी)</label>
                <input type="text" id="hubUpdate_defendant" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.defendant || c.accusedName || '')}" required>
            </div>
            <div class="form-group">
                <label>Assigned Court Complex</label>
                <select id="hubUpdate_court" class="${CASE_HUB_INPUT_CLASSES} w-full">${courtOptions}</select>
            </div>
            <div class="form-group">
                <label>Client Mobile Number</label>
                <input type="tel" id="hubUpdate_clientPhone" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.clientNumber || c.criminalClientNumber || '')}">
            </div>
            <div class="form-group">
                <label>Next Hearing Date</label>
                <input type="date" id="hubUpdate_nextHearing" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${c.nextHearing && c.nextHearing !== '—' ? c.nextHearing : ''}">
            </div>
            <div class="form-group">
                <label>Hearing Stage / Process</label>
                <input type="text" id="hubUpdate_process" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.hearingProcess || c.process || '')}" placeholder="e.g. Arguments, Evidence">
            </div>
            <div class="form-group full-width">
                <label>Case Notes / Remarks</label>
                <textarea id="hubUpdate_remarks" class="${CASE_HUB_INPUT_CLASSES} w-full" rows="3">${escapeHtml(c.remark || c.remarks || '')}</textarea>
            </div>
        </div>
        <div class="form-actions-bar">
            <button type="button" class="btn-action btn-ghost" onclick="clearCaseHubUpdateSelection()">
                Cancel
            </button>
            <button type="submit" class="btn-action btn-primary" id="hubUpdateSubmitBtn">
                <iconify-icon icon="lucide:check-circle-2"></iconify-icon>
                <span>Save Case Updates</span>
            </button>
        </div>
    </form>
  `;
}
window.renderCaseHubUpdateForm = renderCaseHubUpdateForm;

function clearCaseHubUpdateSelection() {
  activeUpdateCaseObj = null;
  const container = document.getElementById('caseHubUpdateFormContainer');
  if (container) {
    container.innerHTML = `
      <div class="empty-state">
          <iconify-icon icon="lucide:file-search"></iconify-icon>
          <div class="empty-title">No Case Loaded For Editing</div>
          <div class="empty-sub">Search and select a case in the box above to load its details into the editor.</div>
      </div>`;
  }
}
window.clearCaseHubUpdateSelection = clearCaseHubUpdateSelection;

async function handleCaseHubUpdateSubmit(e) {
  e.preventDefault();
  if (!activeUpdateCaseObj) return;

  const caseNo = document.getElementById('hubUpdate_caseNo')?.value?.trim();
  const status = document.getElementById('hubUpdate_status')?.value;
  const plaintiff = document.getElementById('hubUpdate_plaintiff')?.value?.trim();
  const defendant = document.getElementById('hubUpdate_defendant')?.value?.trim();
  const court = document.getElementById('hubUpdate_court')?.value;
  const clientPhone = document.getElementById('hubUpdate_clientPhone')?.value?.trim();
  const nextHearing = document.getElementById('hubUpdate_nextHearing')?.value || '—';
  const process = document.getElementById('hubUpdate_process')?.value?.trim() || '';
  const remarks = document.getElementById('hubUpdate_remarks')?.value?.trim() || '';

  const submitBtn = document.getElementById('hubUpdateSubmitBtn');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<iconify-icon icon="lucide:loader-2" class="spin"></iconify-icon> Updating...';
  }

  try {
    const isDisp = typeof window.isCaseStatusDisposed === 'function' ? window.isCaseStatusDisposed(status) : (status || '').toLowerCase().includes('dispose');
    const finalNextHearing = isDisp ? '—' : nextHearing;
    const finalDisposalDate = isDisp ? (activeUpdateCaseObj.disposalDate || (nextHearing && nextHearing !== '—' ? nextHearing : new Date().toISOString().split('T')[0])) : null;

    activeUpdateCaseObj.plaintiff = plaintiff;
    activeUpdateCaseObj.defendant = defendant;
    activeUpdateCaseObj.caseName = `${plaintiff} vs ${defendant}`;
    activeUpdateCaseObj.courtName = court;
    activeUpdateCaseObj.clientNumber = clientPhone;
    activeUpdateCaseObj.nextHearing = finalNextHearing;
    activeUpdateCaseObj.hearingProcess = isDisp ? (status || 'Disposed') : process;
    activeUpdateCaseObj.caseStatus = status;
    activeUpdateCaseObj.remark = remarks;
    if (isDisp) {
      activeUpdateCaseObj.disposalDate = finalDisposalDate;
      activeUpdateCaseObj.disposal_date = finalDisposalDate;
    }

    if (typeof window.updateCaseInSupabase === 'function') {
      await window.updateCaseInSupabase(caseNo, caseNo, activeUpdateCaseObj.caseType || 'civil', activeUpdateCaseObj);
    } else if (window.supabaseClient) {
      const type = (activeUpdateCaseObj.caseType || 'civil').toLowerCase();
      const table = (type === 'state') ? 'statecases' :
                    (type === 'criminal') ? 'criminalcases' :
                    (type === 'family') ? 'familycases' :
                    (type === 'revenue') ? 'revenuecases' :
                    (type === 'misc_civil') ? 'misccivilcases' :
                    (type === 'misc_criminal') ? 'misccriminalcases' :
                    (type === 'complaint') ? 'complaintcases' : 'civilcases';
      const payload = {
        plaintiff: plaintiff,
        defendant: defendant,
        court_name: court,
        client_phone: clientPhone,
        next_hearing: isDisp ? null : (nextHearing === '—' ? null : nextHearing),
        remarks: remarks,
        case_status: status
      };
      if (isDisp && finalDisposalDate) payload.disposal_date = finalDisposalDate;
      await window.supabaseClient.from(table).update(payload).ilike('case_number', caseNo);
    }

    if (typeof window.performPostCrudRefresh === 'function') {
      await window.performPostCrudRefresh({ caseNumber: caseNo });
    }

    alert(`✅ Case "${caseNo}" updated successfully!`);
    renderCaseHubUpdateForm(activeUpdateCaseObj);
  } catch (err) {
    console.error('Update case error:', err);
    alert(`Case updated locally: "${caseNo}".`);
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<iconify-icon icon="lucide:check-circle-2"></iconify-icon> <span>Save Case Updates</span>';
    }
  }
}
window.handleCaseHubUpdateSubmit = handleCaseHubUpdateSubmit;

// ==============================================================================
// DELETE INSPECTION & CONFIRMATION (MODE 3)
// ==============================================================================
function renderCaseHubDeleteInspection(c) {
  const container = document.getElementById('caseHubDeleteFormContainer');
  if (!container) return;

  const cNo = c.caseNo || c.criminalCaseNumber || '—';
  const cName = c.caseName || (c.plaintiff ? `${c.plaintiff} vs ${c.defendant}` : (c.victimName ? `${c.victimName} vs ${c.accusedName}` : '—'));
  const type = (c.caseType || 'civil').toUpperCase();
  const court = c.courtName || c.criminalCourtName || 'District Court';
  const nextHearing = c.nextHearing || '—';
  const clientName = c.clientName || c.criminalClientName || 'Client';

  container.innerHTML = `
    <div class="selected-case-banner danger-mode">
        <div class="banner-info">
            <iconify-icon icon="lucide:alert-octagon"></iconify-icon>
            <div>
                <div class="banner-title">${escapeHtml(cNo)} (${escapeHtml(type)})</div>
                <div class="banner-subtitle">👤 ${escapeHtml(cName)} · 🏛️ ${escapeHtml(court)}</div>
            </div>
        </div>
        <button type="button" class="btn-action btn-ghost btn-sm" onclick="clearCaseHubDeleteSelection()">
            <iconify-icon icon="lucide:x"></iconify-icon> Dismiss
        </button>
    </div>

    <div class="hub-danger-card">
        <div class="danger-card-header">
            <iconify-icon icon="lucide:alert-triangle"></iconify-icon>
            Danger Zone: Irreversible Removal
        </div>
        <p>
            Please review the particulars below carefully. Deleting this record will permanently erase all linked forward dates, past hearing appearances, client notes, and transfer logs.
        </p>

        <div class="danger-info-grid">
            <div>
                <span class="info-cell-label">Case Number</span>
                <span class="info-cell-value">${escapeHtml(cNo)}</span>
            </div>
            <div>
                <span class="info-cell-label">Case Type</span>
                <span class="info-cell-value">${escapeHtml(type)}</span>
            </div>
            <div>
                <span class="info-cell-label">Parties</span>
                <span class="info-cell-value">${escapeHtml(cName)}</span>
            </div>
            <div>
                <span class="info-cell-label">Court Complex</span>
                <span class="info-cell-value">${escapeHtml(court)}</span>
            </div>
            <div>
                <span class="info-cell-label">Client Name</span>
                <span class="info-cell-value">${escapeHtml(clientName)}</span>
            </div>
            <div>
                <span class="info-cell-label">Next Scheduled Date</span>
                <span class="info-cell-value">${escapeHtml(nextHearing)}</span>
            </div>
        </div>

        <div class="form-actions-bar" style="justify-content: flex-start;">
            <button type="button" class="btn-action btn-ghost" onclick="clearCaseHubDeleteSelection()">
                Cancel
            </button>
            <button type="button" class="btn-action btn-danger" onclick="openCaseHubDeleteModal('${escapeHtml(cNo)}')">
                <iconify-icon icon="lucide:trash-2"></iconify-icon>
                <span>Delete Case Permanently</span>
            </button>
        </div>
    </div>
  `;
}
window.renderCaseHubDeleteInspection = renderCaseHubDeleteInspection;

function clearCaseHubDeleteSelection() {
  activeDeleteCaseObj = null;
  const container = document.getElementById('caseHubDeleteFormContainer');
  if (container) {
    container.innerHTML = `
      <div class="empty-state">
          <iconify-icon icon="lucide:shield-alert"></iconify-icon>
          <div class="empty-title">No Case Inspected for Deletion</div>
          <div class="empty-sub">Search by case number above to preview the case particulars and review associated records before removal.</div>
      </div>`;
  }
}
window.clearCaseHubDeleteSelection = clearCaseHubDeleteSelection;

function openCaseHubDeleteModal(caseNo) {
  pendingCaseHubDeleteNo = caseNo;
  const modal = document.getElementById('hubDeleteModalOverlay');
  const noEl = document.getElementById('hubModalCaseNo');
  const nameEl = document.getElementById('hubModalCaseName');

  if (noEl) noEl.textContent = caseNo;
  if (nameEl) {
    const cName = activeDeleteCaseObj ? (activeDeleteCaseObj.caseName || activeDeleteCaseObj.plaintiff || 'Case') : 'Case';
    nameEl.textContent = cName;
  }
  if (modal) modal.style.display = 'flex';
}
window.openCaseHubDeleteModal = openCaseHubDeleteModal;

function closeCaseHubDeleteModal() {
  const modal = document.getElementById('hubDeleteModalOverlay');
  if (modal) modal.style.display = 'none';
  pendingCaseHubDeleteNo = null;
}
window.closeCaseHubDeleteModal = closeCaseHubDeleteModal;

async function confirmCaseHubDeletion() {
  if (!pendingCaseHubDeleteNo) return;
  const targetNo = pendingCaseHubDeleteNo;
  closeCaseHubDeleteModal();

  try {
    if (typeof window.deleteCaseFromSupabase === 'function') {
      await window.deleteCaseFromSupabase(targetNo);
    } else if (Array.isArray(window.allCaseRecords)) {
      const idx = window.allCaseRecords.findIndex(c =>
        (c.caseNo || '').toLowerCase() === targetNo.toLowerCase() ||
        (c.criminalCaseNumber || '').toLowerCase() === targetNo.toLowerCase()
      );
      if (idx !== -1) window.allCaseRecords.splice(idx, 1);
    }

    if (typeof window.performPostCrudRefresh === 'function') {
      await window.performPostCrudRefresh({ caseNumber: targetNo });
    }

    alert(`🗑️ Case "${targetNo}" deleted permanently.`);
    clearCaseHubDeleteSelection();
    clearSearchInput('delete');
  } catch (err) {
    console.error('Delete error:', err);
    alert(`Could not delete case "${targetNo}".`);
  }
}
window.confirmCaseHubDeletion = confirmCaseHubDeletion;

// Helper: Escape HTML
function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/[&<>"']/g, s => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[s]);
}

// Initializer
function initManageTab() {
  switchCaseHubMode(currentCaseHubMode || 'add');
}
window.initManageTab = initManageTab;
