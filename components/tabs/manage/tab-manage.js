// ==============================================================================
// CASEBOOK — UNIFIED CASE HUB (ADD, UPDATE & DELETE) JAVASCRIPT CONTROLLER
// Location: components/tabs/manage/manage.js
// ==============================================================================

// ==============================================================================
// UNIFIED INPUT STYLING CONSTANT & REUSABLE COMPONENT (FORWARD DATES TAB COLORS)
// ==============================================================================
const CASE_HUB_INPUT_CLASSES =
  "case-hub-input bg-white dark:bg-[#0E1726] border border-slate-300 dark:border-[#334155] rounded-xl px-4 py-3.5 text-slate-800 dark:text-[#f8fafc] outline-none transition-all duration-300 focus:border-emerald-600 dark:focus:border-[#3b82f6] focus:ring-[3px] focus:ring-emerald-500/20 dark:focus:ring-[#3b82f6]/25 placeholder:text-slate-400 dark:placeholder:text-[#64748b]";
window.CASE_HUB_INPUT_CLASSES = CASE_HUB_INPUT_CLASSES;

/**
 * Reusable Component helper function to apply the unified soft dark Tailwind styles
 */
function createCaseHubInput({
  id,
  type = "text",
  placeholder = "",
  value = "",
  required = false,
  readonly = false,
  extraClasses = "",
  onchange = "",
  rows = 2,
  options = "",
}) {
  const combinedCls = `${CASE_HUB_INPUT_CLASSES} w-full ${extraClasses}`.trim();
  if (type === "select") {
    return `<select id="${id}" class="${combinedCls}" ${required ? "required" : ""} ${onchange ? `onchange="${onchange}"` : ""}>${options}</select>`;
  }
  if (type === "textarea") {
    return `<textarea id="${id}" class="${combinedCls}" rows="${rows}" placeholder="${placeholder}" ${required ? "required" : ""} ${readonly ? "readonly" : ""}>${value}</textarea>`;
  }
  return `<input type="${type}" id="${id}" class="${combinedCls}" placeholder="${placeholder}" value="${value}" ${required ? "required" : ""} ${readonly ? "readonly" : ""} ${onchange ? `onchange="${onchange}"` : ""} />`;
}
window.createCaseHubInput = createCaseHubInput;

window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs["manage"] = `<div class="case-hub-wrapper">
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
                    <div class="lookup-title-group">
                        <span class="lookup-label danger-label">1. Search &amp; Inspect Case to Delete</span>
                        
                    </div>
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
var currentCaseHubMode = "add";
var caseHubSearchModes = { update: "number", delete: "number" };
var activeUpdateCaseObj = null;
var activeDeleteCaseObj = null;
var pendingCaseHubDeleteNo = null;

// Mode Switcher
function switchCaseHubMode(mode) {
  currentCaseHubMode = mode;
  document.querySelectorAll(".case-hub-wrapper .segment-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === mode);
  });
  document.querySelectorAll(".case-hub-wrapper .tab-pane").forEach((pane) => {
    pane.classList.remove("active");
  });

  const titleEl = document.getElementById("hubActiveTitle");
  const descEl = document.getElementById("hubActiveDesc");
  const iconWrap = document.getElementById("hubTitleIcon");

  if (mode === "add") {
    document.getElementById("pane-add")?.classList.add("active");
    if (titleEl) titleEl.textContent = "Register New Case";
    if (descEl)
      descEl.textContent = "Fill required details below to create and schedule a new legal matter.";
    if (iconWrap) iconWrap.innerHTML = '<iconify-icon icon="lucide:folder-plus"></iconify-icon>';
    renderCaseHubAddForm(document.getElementById("caseHubTypeSelect")?.value || "civil");
  } else if (mode === "update") {
    document.getElementById("pane-update")?.classList.add("active");
    if (titleEl) titleEl.textContent = "Update Case Particulars";
    if (descEl)
      descEl.textContent =
        "Search any existing matter to review, edit details, or update current status.";
    if (iconWrap) iconWrap.innerHTML = '<iconify-icon icon="lucide:edit-3"></iconify-icon>';
  } else if (mode === "delete") {
    document.getElementById("pane-delete")?.classList.add("active");
    if (titleEl) titleEl.textContent = "Delete Case Record";
    if (descEl)
      descEl.textContent =
        "Search and inspect a case before executing permanent, irreversible removal.";
    if (iconWrap)
      iconWrap.innerHTML =
        '<iconify-icon icon="lucide:trash-2" style="color:#ef4444;"></iconify-icon>';
  }
}
window.switchCaseHubMode = switchCaseHubMode;

// Search Mode Switcher (Number vs Name)
function setCaseHubSearchMode(mode, context) {
  caseHubSearchModes[context] = mode;
  const toggle = document.getElementById(`${context}SearchModeToggle`);
  if (toggle) {
    toggle.querySelectorAll(".search-mode-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.mode === mode);
    });
  }
  const input = document.getElementById(
    context === "update" ? "hubUpdateSearchInput" : "hubDeleteSearchInput",
  );
  if (input) {
    if (mode === "number") {
      input.placeholder = "Type Case Number (e.g. CIV-2026-010, FIR-45)...";
    } else {
      input.placeholder = "Type Plaintiff, Accused, or Client Name (e.g. Ramesh, State of UP)...";
    }
    input.focus();
  }
}
window.setCaseHubSearchMode = setCaseHubSearchMode;

// Clear button inside input box
function toggleSearchClearBtn(context) {
  const input = document.getElementById(
    context === "update" ? "hubUpdateSearchInput" : "hubDeleteSearchInput",
  );
  const btn = document.getElementById(
    context === "update" ? "hubUpdateSearchClearBtn" : "hubDeleteSearchClearBtn",
  );
  if (btn && input) {
    btn.style.display = input.value.trim() ? "flex" : "none";
  }
}
window.toggleSearchClearBtn = toggleSearchClearBtn;

function clearSearchInput(context) {
  const input = document.getElementById(
    context === "update" ? "hubUpdateSearchInput" : "hubDeleteSearchInput",
  );
  const btn = document.getElementById(
    context === "update" ? "hubUpdateSearchClearBtn" : "hubDeleteSearchClearBtn",
  );
  if (input) {
    input.value = "";
    input.focus();
  }
  if (btn) btn.style.display = "none";
  clearCaseHubSearchResults(context);
}
window.clearSearchInput = clearSearchInput;

function clearCaseHubSearchResults(context) {
  const container = document.getElementById(
    context === "update" ? "hubUpdateResultsContainer" : "hubDeleteResultsContainer",
  );
  const list = document.getElementById(
    context === "update" ? "hubUpdateResultsList" : "hubDeleteResultsList",
  );
  if (container) container.style.display = "none";
  if (list) list.innerHTML = "";
}
window.clearCaseHubSearchResults = clearCaseHubSearchResults;

// Perform Search against CaseBook records
function performCaseHubSearch(context) {
  const input = document.getElementById(
    context === "update" ? "hubUpdateSearchInput" : "hubDeleteSearchInput",
  );
  const query = (input?.value || "").trim().toLowerCase();
  if (!query) {
    if (input) input.focus();
    return;
  }

  const mode = caseHubSearchModes[context] || "number";
  const records = Array.isArray(window.allCaseRecords) ? window.allCaseRecords : [];

  const matches = records.filter((c) => {
    const num1 = (c.caseNo || "").toLowerCase();
    const num2 = (c.criminalCaseNumber || "").toLowerCase();
    const name = (c.caseName || "").toLowerCase();
    const plaintiff = (c.plaintiff || "").toLowerCase();
    const defendant = (c.defendant || "").toLowerCase();
    const victim = (c.victimName || "").toLowerCase();
    const accused = (c.accusedName || "").toLowerCase();
    const client = (c.clientName || c.criminalClientName || "").toLowerCase();

    if (mode === "number") {
      return num1.includes(query) || num2.includes(query);
    } else {
      return (
        name.includes(query) ||
        plaintiff.includes(query) ||
        defendant.includes(query) ||
        victim.includes(query) ||
        accused.includes(query) ||
        client.includes(query) ||
        num1.includes(query) ||
        num2.includes(query)
      );
    }
  });

  renderCaseHubSearchResults(context, matches, query);
}
window.performCaseHubSearch = performCaseHubSearch;

function renderCaseHubSearchResults(context, results, query) {
  const container = document.getElementById(
    context === "update" ? "hubUpdateResultsContainer" : "hubDeleteResultsContainer",
  );
  const list = document.getElementById(
    context === "update" ? "hubUpdateResultsList" : "hubDeleteResultsList",
  );
  const countEl = document.getElementById(
    context === "update" ? "hubUpdateResultsCount" : "hubDeleteResultsCount",
  );

  if (!container || !list) return;

  container.style.display = "block";
  if (countEl)
    countEl.textContent = `${results.length} record${results.length !== 1 ? "s" : ""} found for "${query}"`;

  if (results.length === 0) {
    list.innerHTML = `
      <div class="hub-no-results">
          <iconify-icon icon="lucide:search-x"></iconify-icon>
          No cases matched "<strong>${escapeHtml(query)}</strong>".<br>
          Please verify the case number or try searching by party name.
      </div>`;
    return;
  }

  list.innerHTML = results
    .slice(0, 15)
    .map((c) => {
      const cNo = c.caseNo || c.criminalCaseNumber || "—";
      const cName =
        c.caseName ||
        (c.plaintiff
          ? `${c.plaintiff} vs ${c.defendant}`
          : c.victimName
            ? `${c.victimName} vs ${c.accusedName}`
            : "—");
      const court = c.courtName || c.criminalCourtName || "District Court";
      const type = (c.caseType || "civil").toLowerCase();
      const status = c.caseStatus || (c.disposed ? "Disposed" : "Pending");

      return `
      <div class="hub-result-item" onclick="selectCaseForHub('${escapeHtml(cNo)}', '${context}')">
          <div class="hub-result-main">
              <div class="hub-result-case-no">
                  <span>${escapeHtml(cNo)}</span>
                  <span class="hub-category-tag ${type}">${type}</span>
                  <span style="font-size: 0.72rem; color: ${status === "Disposed" ? "#10b981" : "#f59e0b"}; font-weight: 600;">
                      ${status === "Disposed" ? "✅ Disposed" : "⏳ Pending"}
                  </span>
              </div>
              <div class="hub-result-meta">
                  <span>👤 ${escapeHtml(cName)}</span>
                  <span>🏛️ ${escapeHtml(court)}</span>
                  ${c.nextHearing ? `<span>📅 Next: ${escapeHtml(c.nextHearing)}</span>` : ""}
              </div>
          </div>
          <button type="button" class="btn-action btn-ghost btn-sm">
              ${context === "update" ? "Load & Edit ➔" : "Inspect ➔"}
          </button>
      </div>
    `;
    })
    .join("");
}

// Select Case from results
function selectCaseForHub(caseNo, context) {
  const records = Array.isArray(window.allCaseRecords) ? window.allCaseRecords : [];
  const found = records.find(
    (c) =>
      (c.caseNo || "").toLowerCase() === caseNo.toLowerCase() ||
      (c.criminalCaseNumber || "").toLowerCase() === caseNo.toLowerCase(),
  );

  clearCaseHubSearchResults(context);

  if (!found) {
    alert(`Could not find case "${caseNo}" in registered records.`);
    return;
  }

  if (context === "update") {
    activeUpdateCaseObj = found;
    renderCaseHubUpdateForm(found);
  } else if (context === "delete") {
    activeDeleteCaseObj = found;
    renderCaseHubDeleteInspection(found);
  }
}
window.selectCaseForHub = selectCaseForHub;

// ==============================================================================
// ADD FORM RENDERING (MODE 1)
// ==============================================================================
function getCourtDropdownOptions(selectedCourt) {
  const deletedSet =
    typeof window.getDeletedCourtsSet === "function"
      ? window.getDeletedCourtsSet()
      : typeof getDeletedCourtsSet === "function"
        ? getDeletedCourtsSet()
        : new Set();

  const sourceCourts =
    typeof window !== "undefined" && Array.isArray(window.courts) && window.courts.length > 0
      ? window.courts
      : typeof window !== "undefined" &&
          Array.isArray(window.allCourts) &&
          window.allCourts.length > 0
        ? window.allCourts
        : typeof courts !== "undefined" && Array.isArray(courts)
          ? courts
          : ["District Court", "Civil Judge (SD)", "High Court", "Chief Judicial Magistrate"];

  const uniqueCourts = new Set();
  sourceCourts.forEach((c) => {
    const t = (c || "").trim();
    if (
      t &&
      (!deletedSet.has(t.toLowerCase()) ||
        (selectedCourt && t.toLowerCase() === selectedCourt.toLowerCase()))
    ) {
      uniqueCourts.add(t);
    }
  });

  if (selectedCourt && selectedCourt.trim() && !uniqueCourts.has(selectedCourt.trim())) {
    uniqueCourts.add(selectedCourt.trim());
  }

  const courtList = Array.from(uniqueCourts);
  courtList.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

  return courtList
    .map(
      (c) =>
        `<option value="${escapeHtml(c)}" ${c.toLowerCase() === (selectedCourt || "").toLowerCase() ? "selected" : ""}>${escapeHtml(c)}</option>`,
    )
    .join("");
}
window.getCourtDropdownOptions = getCourtDropdownOptions;

async function handleQuickAddCourt(selectId = "hubAdd_court") {
  const courtName = prompt("Enter New Court Name to add:");
  if (!courtName || !courtName.trim()) return;
  const trimmed = courtName.trim();

  try {
    if (typeof window.addCourtToSupabase === "function") {
      await window.addCourtToSupabase(trimmed);
    } else {
      if (!window.courts) window.courts = [];
      if (!window.courts.some((c) => c.toLowerCase() === trimmed.toLowerCase())) {
        window.courts.push(trimmed);
      }
    }

    const courtOptions = getCourtDropdownOptions(trimmed);
    const targetEl = document.getElementById(selectId);
    if (targetEl) {
      targetEl.innerHTML = courtOptions;
      targetEl.value = trimmed;
    }

    if (typeof window.showToastNotification === "function") {
      window.showToastNotification(`Court "${trimmed}" added successfully!`);
    }
  } catch (err) {
    console.error("Error adding court:", err);
    alert(`Could not add court: ${err.message || err}`);
  }
}
window.handleQuickAddCourt = handleQuickAddCourt;

// ==============================================================================
// STATUTORY CASE CATEGORIES & PRESETS CONFIGURATION
// ==============================================================================
const POLICE_STATION_OPTIONS = [
  "Kotwali Sadar (Main town)",
  "Kheri",
  "Mahila Thana (Women's police station)",
  "Kotwali Gola (Gola Gokarannath)",
  "Kotwali Gauriphanta",
  "Kotwali Chandan Chauki",
  "Ishanagar",
  "Kotwali Dhaurahara",
  "Nighasan",
  "Neemgaon",
  "Palia Kalan",
  "Pasgawan",
  "Phoolbehar",
  "Phardhan",
  "Bhira (Bheera)",
  "Maigalganj",
  "Mailani",
  "Mitauli",
  "Kotwali Mohammadi",
  "Thana Sampurna Nagar",
  "Singahi",
  "Hyderabad",
  "Kotwali Tikoniya",
  "Other",
];

const MISC_CIVIL_PROCEEDING_OPTIONS = [
  "Temporary Injunction (Order 39 Rule 1 & 2 CPC)",
  "Restoration Application (Order 9 Rule 13 / Rule 9 CPC)",
  "Civil Appeal (Sec 96 CPC)",
  "Civil Revision (Sec 115 CPC)",
  "Execution Application (Order 21 CPC)",
  "Review Application (Order 47 CPC / Sec 114)",
  "Misc Civil Appeal (Order 43 Rule 1 CPC)",
  "Other Misc Application",
];

const MISC_CRIMINAL_PROCEEDING_OPTIONS = [
  "Regular Bail (Sec 439 CrPC / Sec 483 BNSS)",
  "Anticipatory Bail (Sec 438 CrPC / Sec 482 BNSS)",
  "Criminal Appeal (Sec 374 CrPC / Sec 415 BNSS)",
  "Criminal Revision (Sec 397/401 CrPC)",
  "Application u/s 156(3) CrPC / Sec 175(3) BNSS",
  "Criminal Misc Application (Sec 482 CrPC)",
  "Other Criminal Application",
];

const REVENUE_SECTION_OPTIONS = [
  "Sec 34 (Mutation / दाखिल खारिज)",
  "Sec 24 (Demarcation / पैमाइश / पत्थरगड्डी)",
  "Sec 116 (Partition / कुर्रा बटवारा)",
  "Sec 67 (Gram Sabha Encroachment / बेदखली)",
  "Sec 80 (Non-Agri 143 Declaration)",
  "Sec 144 (Declaratory Suit / घोषणात्मक वाद)",
  "Sec 38 (Map / Khatauni Record Correction)",
  "Revision / Appeal (Sec 207 / 210)",
  "Other Revenue Section",
];

const FAMILY_MATTER_OPTIONS = [
  "Maintenance (Sec 125 CrPC / Sec 144 BNSS)",
  "Divorce Petition (Sec 13 HMA)",
  "Restitution of Conjugal Rights (Sec 9 HMA)",
  "Domestic Violence (DV Act 2005)",
  "Child Custody / Guardianship Act",
  "Mutual Divorce (Sec 13B HMA)",
  "Special Marriage Act Dispute",
  "Other Family Dispute",
];

const COMPLAINT_TYPE_OPTIONS = [
  "Cheque Bounce (Sec 138 NI Act)",
  "Private Criminal Complaint (Sec 200 CrPC / 223 BNSS)",
  "Defamation (Sec 500 IPC / 356 BNS)",
  "Cheating & Fraud (Sec 420 IPC / 318 BNS)",
  "Domestic / Harassment Complaint",
  "Labour / Industrial Dispute Complaint",
  "Consumer Protection Complaint",
  "Other Complaint",
];

const CATEGORY_REMARK_PRESETS = {
  civil: [
    { label: "➕ Co-Plaintiffs", text: "Co-Plaintiffs: " },
    { label: "➕ Co-Defendants", text: "Co-Defendants: " },
    { label: "➕ Connected Suit", text: "Connected Suit: " },
    { label: "➕ Injunction Status", text: "Injunction Status: " },
  ],
  criminal: [
    { label: "➕ Co-Accused", text: "Co-Accused: " },
    { label: "➕ Jail / Custody", text: "Custody / Jail: In District Jail since " },
    { label: "➕ Bail Surety", text: "Bail Surety: " },
    { label: "➕ GD / CD Notes", text: "Thana GD / CD Notes: " },
  ],
  family: [
    { label: "➕ In-Laws Named", text: "In-Laws Named: " },
    { label: "➕ Mediation Status", text: "Mediation Status: Referred on " },
    { label: "➕ Minor Children", text: "Minor Children: " },
    { label: "➕ Maintenance", text: "Interim Maintenance: " },
  ],
  revenue: [
    { label: "➕ Co-Sharers", text: "Co-Sharers: " },
    { label: "➕ Land Area / Rakba", text: "Land Area / Rakba: " },
    { label: "➕ Revenue Report", text: "Lekhpal / Kanoongo Report: " },
    { label: "➕ Boundary Notes", text: "Boundary / Demarcation: " },
  ],
  misc: [
    { label: "➕ Injunction Grounds", text: "Order 39 Rule 1&2 CPC Grounds: " },
    { label: "➕ Recall Grounds", text: "Order 9 Rule 13 Ex-Parte Recall: " },
    { label: "➕ LCR Summoned", text: "Lower Court Record (LCR): " },
    { label: "➕ Stay Order", text: "Stay Order Status: " },
  ],
  bail: [
    { label: "➕ Bail Grounds", text: "Bail Grounds: False implication, no overt act, " },
    { label: "➕ Parity", text: "Parity: Co-accused granted bail on " },
    { label: "➕ Clean Antecedents", text: "Previous Antecedents: Clean record / no past cases" },
    { label: "➕ Interim Protection", text: "Interim Protection: Stay of arrest granted till " },
  ],
  cheque: [
    { label: "➕ Cheque Details", text: "Cheque Details: No. , Date: , Amount: Rs. , Bank: " },
    { label: "➕ Notice Served", text: "Statutory Demand Notice Sent on: , Served on: " },
    { label: "➕ Sec 200 Statement", text: "Sec 200 CrPC Statement Recorded on " },
    { label: "➕ Summoning Order", text: "Summoning Order Date: " },
  ],
};

function normalizeCaseCategory(type) {
  const t = String(type || "civil")
    .toLowerCase()
    .trim();
  if (t === "state" || t === "criminal") return "criminal";
  if (t === "family") return "family";
  if (t === "revenue") return "revenue";
  if (t === "misc" || t === "misc_civil") return "misc";
  if (t === "bail" || t === "misc_criminal") return "bail";
  if (t === "cheque" || t === "complaint") return "cheque";
  return "civil";
}
window.normalizeCaseCategory = normalizeCaseCategory;

function handleCaseHubSelectChange(selectEl, customInputId) {
  const customInput = document.getElementById(customInputId);
  if (!customInput) return;
  const val = String(selectEl?.value || "").toLowerCase();
  const isOther = val === "other" || val.startsWith("other");
  customInput.style.display = isOther ? "block" : "none";
  if (isOther) customInput.focus();
}
window.handleCaseHubSelectChange = handleCaseHubSelectChange;

function insertCaseHubRemarkChip(textareaId, textToInsert) {
  const textarea = document.getElementById(textareaId);
  if (!textarea) return;
  const currentVal = textarea.value || "";
  if (!currentVal.trim()) {
    textarea.value = textToInsert;
  } else {
    const separator =
      currentVal.endsWith(" ") || currentVal.endsWith("\n") || currentVal.endsWith("; ")
        ? ""
        : "; ";
    textarea.value = currentVal + separator + textToInsert;
  }
  textarea.focus();
  textarea.dispatchEvent(new Event("input", { bubbles: true }));
}
window.insertCaseHubRemarkChip = insertCaseHubRemarkChip;
if (typeof window.insertRemarkChip === "undefined") {
  window.insertRemarkChip = insertCaseHubRemarkChip;
}

function renderCaseHubRemarkChipsHtml(textareaId, categoryKey) {
  const chips = CATEGORY_REMARK_PRESETS[categoryKey] || CATEGORY_REMARK_PRESETS.civil;
  const chipsHtml = chips
    .map((item) => {
      return `<button type="button" class="case-hub-preset-chip" onclick="insertCaseHubRemarkChip('${textareaId}', '${escapeHtml(item.text)}')">${escapeHtml(item.label)}</button>`;
    })
    .join("");
  return `
    <div class="case-hub-chips-wrap">
      <span class="case-hub-chips-label"><iconify-icon icon="lucide:sparkles"></iconify-icon> Presets:</span>
      ${chipsHtml}
    </div>
  `;
}

function getPoliceStationOptionsHtml(selectedVal) {
  const selLower = String(selectedVal || "")
    .toLowerCase()
    .trim();
  const exactMatch = POLICE_STATION_OPTIONS.some((ps) => ps.toLowerCase() === selLower);
  const options = POLICE_STATION_OPTIONS.map((ps) => {
    const isSel = exactMatch
      ? ps.toLowerCase() === selLower
      : ps === "Other" && Boolean(selectedVal);
    return `<option value="${escapeHtml(ps)}" ${isSel ? "selected" : ""}>${escapeHtml(ps)}</option>`;
  });
  return `<option value="">-- Select Police Station (थाना चुनें) --</option>${options.join("")}`;
}

function getMiscCivilProceedingOptionsHtml(selectedVal) {
  const selLower = String(selectedVal || "")
    .toLowerCase()
    .trim();
  const exactMatch = MISC_CIVIL_PROCEEDING_OPTIONS.some((opt) => opt.toLowerCase() === selLower);
  const options = MISC_CIVIL_PROCEEDING_OPTIONS.map((opt) => {
    const isSel = exactMatch
      ? opt.toLowerCase() === selLower
      : opt.startsWith("Other") && Boolean(selectedVal);
    return `<option value="${escapeHtml(opt)}" ${isSel ? "selected" : ""}>${escapeHtml(opt)}</option>`;
  });
  return `<option value="">-- Select Proceeding Type --</option>${options.join("")}`;
}

function getMiscCriminalProceedingOptionsHtml(selectedVal) {
  const selLower = String(selectedVal || "")
    .toLowerCase()
    .trim();
  const exactMatch = MISC_CRIMINAL_PROCEEDING_OPTIONS.some((opt) => opt.toLowerCase() === selLower);
  const options = MISC_CRIMINAL_PROCEEDING_OPTIONS.map((opt) => {
    const isSel = exactMatch
      ? opt.toLowerCase() === selLower
      : opt.startsWith("Other") && Boolean(selectedVal);
    return `<option value="${escapeHtml(opt)}" ${isSel ? "selected" : ""}>${escapeHtml(opt)}</option>`;
  });
  return `<option value="">-- Select Application Type --</option>${options.join("")}`;
}

function getRevenueSectionOptionsHtml(selectedVal) {
  const selLower = String(selectedVal || "")
    .toLowerCase()
    .trim();
  const exactMatch = REVENUE_SECTION_OPTIONS.some((opt) => opt.toLowerCase() === selLower);
  const options = REVENUE_SECTION_OPTIONS.map((opt) => {
    const isSel = exactMatch
      ? opt.toLowerCase() === selLower
      : opt.startsWith("Other") && Boolean(selectedVal);
    return `<option value="${escapeHtml(opt)}" ${isSel ? "selected" : ""}>${escapeHtml(opt)}</option>`;
  });
  return `<option value="">-- Select Revenue Section / Act --</option>${options.join("")}`;
}

function getFamilyMatterOptionsHtml(selectedVal) {
  const selLower = String(selectedVal || "")
    .toLowerCase()
    .trim();
  const exactMatch = FAMILY_MATTER_OPTIONS.some((opt) => opt.toLowerCase() === selLower);
  const options = FAMILY_MATTER_OPTIONS.map((opt) => {
    const isSel = exactMatch
      ? opt.toLowerCase() === selLower
      : opt.startsWith("Other") && Boolean(selectedVal);
    return `<option value="${escapeHtml(opt)}" ${isSel ? "selected" : ""}>${escapeHtml(opt)}</option>`;
  });
  return `<option value="">-- Select Dispute / Matter Type --</option>${options.join("")}`;
}

function getComplaintTypeOptionsHtml(selectedVal) {
  const selLower = String(selectedVal || "")
    .toLowerCase()
    .trim();
  const exactMatch = COMPLAINT_TYPE_OPTIONS.some((opt) => opt.toLowerCase() === selLower);
  const options = COMPLAINT_TYPE_OPTIONS.map((opt) => {
    const isSel = exactMatch
      ? opt.toLowerCase() === selLower
      : opt.startsWith("Other") && Boolean(selectedVal);
    return `<option value="${escapeHtml(opt)}" ${isSel ? "selected" : ""}>${escapeHtml(opt)}</option>`;
  });
  return `<option value="">-- Select Complaint Type --</option>${options.join("")}`;
}

function renderCaseHubAddForm(caseType) {
  const container = document.getElementById("caseHubAddFormContainer");
  if (!container) return;

  const cat = normalizeCaseCategory(caseType);
  const currentYear = new Date().getFullYear();
  const courtOptions = getCourtDropdownOptions();

  let fieldsHtml = "";

  if (cat === "criminal") {
    fieldsHtml = `
      <div class="form-grid-2col">
          <div class="form-group">
              <label>Case Number / ST No. <span class="required">*</span></label>
              <input type="text" id="hubAdd_caseNo" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. ST-2026-001 or Sess. Case 104/2026" required>
          </div>
          <div class="form-group">
              <label>Crime / Case Year <span class="required">*</span></label>
              <input type="number" id="hubAdd_year" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${currentYear}" required>
          </div>
          <div class="form-group">
              <label>Crime / FIR Number</label>
              <input type="text" id="hubAdd_crimeNo" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. Crime No. 142/2026">
          </div>
          <div class="form-group">
              <label>Police Station / Thana <span class="required">*</span></label>
              <select id="hubAdd_policeStation" class="${CASE_HUB_INPUT_CLASSES} w-full" onchange="handleCaseHubSelectChange(this, 'hubAdd_policeStationCustom')">
                  ${getPoliceStationOptionsHtml()}
              </select>
              <input type="text" id="hubAdd_policeStationCustom" class="${CASE_HUB_INPUT_CLASSES} w-full mt-2" placeholder="✍️ Specify other Police Station name..." style="display: none;">
          </div>
          <div class="form-group">
              <label>Sections (IPC / CrPC / BNS)</label>
              <input type="text" id="hubAdd_sections" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. IPC 302, 307, 504 / BNS 103">
          </div>
          <div class="form-group">
              <label>Filing / Cognizance Date</label>
              <input type="date" id="hubAdd_filingDate" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${new Date().toISOString().split("T")[0]}">
          </div>
          <div class="form-group">
              <label>First Party (Prosecution)</label>
              <input type="text" id="hubAdd_plaintiff" class="${CASE_HUB_INPUT_CLASSES} w-full" value="State of U.P.">
          </div>
          <div class="form-group">
              <label>Accused Name (Lead / Opposite Party) <span class="required">*</span></label>
              <input type="text" id="hubAdd_defendant" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. Ramesh Kumar & 2 Ors." required>
          </div>
          <div class="form-group">
              <label>Court Name <span class="required">*</span></label>
              <div class="court-input-wrapper">
                  <select id="hubAdd_court" class="${CASE_HUB_INPUT_CLASSES} flex-1" required>${courtOptions}</select>
                  <button type="button" class="mini-court-btn" onclick="handleQuickAddCourt('hubAdd_court')" title="Add New Court">+</button>
              </div>
          </div>
          <div class="form-group">
              <label>Client Name Represented</label>
              <input type="text" id="hubAdd_clientName" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="Enter Client Name">
          </div>
          <div class="form-group">
              <label>Client Number</label>
              <input type="tel" id="hubAdd_clientPhone" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="Enter Client Phone Number">
          </div>
          <div class="form-group full-width">
              <label>Document / Order Sheet Link (Drive/PDF URL)</label>
              <input type="url" id="hubAdd_docLink" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="https://drive.google.com/... or document URL">
          </div>
          <div class="form-group full-width">
              <label>Case Remarks &amp; Co-Accused / Custody Details</label>
              ${renderCaseHubRemarkChipsHtml("hubAdd_remarks", "criminal")}
              <textarea id="hubAdd_remarks" class="${CASE_HUB_INPUT_CLASSES} w-full" rows="2" placeholder="e.g. Co-accused: 1. Suresh Kumar, 2. Rajesh; In District Jail since 15-01-2026; Case Diary summoned..."></textarea>
          </div>
      </div>
    `;
  } else if (cat === "family") {
    fieldsHtml = `
      <div class="form-grid-2col">
          <div class="form-group">
              <label>Family Case Number <span class="required">*</span></label>
              <input type="text" id="hubAdd_caseNo" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. FC-2026-015 or Matrimonial Case 45/2026" required>
          </div>
          <div class="form-group">
              <label>Year <span class="required">*</span></label>
              <input type="number" id="hubAdd_year" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${currentYear}" required>
          </div>
          <div class="form-group">
              <label>Dispute / Matter Type <span class="required">*</span></label>
              <select id="hubAdd_matterType" class="${CASE_HUB_INPUT_CLASSES} w-full" onchange="handleCaseHubSelectChange(this, 'hubAdd_matterTypeCustom')">
                  ${getFamilyMatterOptionsHtml()}
              </select>
              <input type="text" id="hubAdd_matterTypeCustom" class="${CASE_HUB_INPUT_CLASSES} w-full mt-2" placeholder="✍️ Specify other family dispute type..." style="display: none;">
          </div>
          <div class="form-group">
              <label>Filing Date</label>
              <input type="date" id="hubAdd_filingDate" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${new Date().toISOString().split("T")[0]}">
          </div>
          <div class="form-group">
              <label>Petitioner / Applicant (Wife / Husband) <span class="required">*</span></label>
              <input type="text" id="hubAdd_plaintiff" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. Smt. Pooja Sharma" required>
          </div>
          <div class="form-group">
              <label>Respondent / Opposite Party (Husband / Wife / In-laws) <span class="required">*</span></label>
              <input type="text" id="hubAdd_defendant" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. Rahul Sharma & Ors." required>
          </div>
          <div class="form-group">
              <label>Marriage Date (Optional)</label>
              <input type="date" id="hubAdd_marriageDate" class="${CASE_HUB_INPUT_CLASSES} w-full">
          </div>
          <div class="form-group">
              <label>Maintenance Claimed / Ordered</label>
              <input type="text" id="hubAdd_maintenance" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. ₹15,000/month interim maintenance">
          </div>
          <div class="form-group">
              <label>Family Court Complex <span class="required">*</span></label>
              <div class="court-input-wrapper">
                  <select id="hubAdd_court" class="${CASE_HUB_INPUT_CLASSES} flex-1" required>${courtOptions}</select>
                  <button type="button" class="mini-court-btn" onclick="handleQuickAddCourt('hubAdd_court')" title="Add New Court">+</button>
              </div>
          </div>
          <div class="form-group">
              <label>Client Name</label>
              <input type="text" id="hubAdd_clientName" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="Enter Client Name">
          </div>
          <div class="form-group">
              <label>Client Number</label>
              <input type="tel" id="hubAdd_clientPhone" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="Enter Client Phone Number">
          </div>
          <div class="form-group full-width">
              <label>Document / Order Sheet Link (Drive/PDF URL)</label>
              <input type="url" id="hubAdd_docLink" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="https://drive.google.com/... or document URL">
          </div>
          <div class="form-group full-width">
              <label>Case Remarks &amp; Mediation / Children Details</label>
              ${renderCaseHubRemarkChipsHtml("hubAdd_remarks", "family")}
              <textarea id="hubAdd_remarks" class="${CASE_HUB_INPUT_CLASSES} w-full" rows="2" placeholder="e.g. In-laws named in petition: 1. Smt. Kamala, 2. Ram Lal; Referred to Mediation Center on 10/02/2026; Child custody dispute..."></textarea>
          </div>
      </div>
    `;
  } else if (cat === "revenue") {
    fieldsHtml = `
      <div class="form-grid-2col">
          <div class="form-group">
              <label>Case Number / Computerized Case No. <span class="required">*</span></label>
              <input type="text" id="hubAdd_caseNo" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. REV-2026-020 or Case No. T2026..." required>
          </div>
          <div class="form-group">
              <label>Year <span class="required">*</span></label>
              <input type="number" id="hubAdd_year" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${currentYear}" required>
          </div>
          <div class="form-group">
              <label>Revenue Act &amp; Section (UP Revenue Code) <span class="required">*</span></label>
              <select id="hubAdd_revenueSection" class="${CASE_HUB_INPUT_CLASSES} w-full" onchange="handleCaseHubSelectChange(this, 'hubAdd_revenueSectionCustom')">
                  ${getRevenueSectionOptionsHtml()}
              </select>
              <input type="text" id="hubAdd_revenueSectionCustom" class="${CASE_HUB_INPUT_CLASSES} w-full mt-2" placeholder="✍️ Specify other revenue act / section..." style="display: none;">
          </div>
          <div class="form-group">
              <label>Filing Date</label>
              <input type="date" id="hubAdd_filingDate" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${new Date().toISOString().split("T")[0]}">
          </div>
          <div class="form-group">
              <label>Village / Mauja (मौजा / ग्राम)</label>
              <input type="text" id="hubAdd_village" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. Kalyanpur / Bijnor">
          </div>
          <div class="form-group">
              <label>Tehsil / Pargana (तहसील)</label>
              <input type="text" id="hubAdd_tehsil" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. Tehsil Sadar / Sarojini Nagar">
          </div>
          <div class="form-group">
              <label>Gata / Khasra No. &amp; Khatauni (गाटा सं० / खतौनी)</label>
              <input type="text" id="hubAdd_gataNo" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. Gata No. 245/1, Khatauni No. 112">
          </div>
          <div class="form-group">
              <label>Applicant / Plaintiff (वादी) <span class="required">*</span></label>
              <input type="text" id="hubAdd_plaintiff" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. Ram Prasad & Ors." required>
          </div>
          <div class="form-group">
              <label>Opposite Party / Gaon Sabha (प्रतिवादी / गाँव सभा) <span class="required">*</span></label>
              <input type="text" id="hubAdd_defendant" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. Gaon Sabha & 3 Ors." required>
          </div>
          <div class="form-group">
              <label>Revenue Court <span class="required">*</span></label>
              <div class="court-input-wrapper">
                  <select id="hubAdd_court" class="${CASE_HUB_INPUT_CLASSES} flex-1" required>${courtOptions}</select>
                  <button type="button" class="mini-court-btn" onclick="handleQuickAddCourt('hubAdd_court')" title="Add New Court">+</button>
              </div>
          </div>
          <div class="form-group">
              <label>Client Name</label>
              <input type="text" id="hubAdd_clientName" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="Enter Client Name">
          </div>
          <div class="form-group">
              <label>Client Number</label>
              <input type="tel" id="hubAdd_clientPhone" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="Enter Client Phone Number">
          </div>
          <div class="form-group full-width">
              <label>Document / Order Sheet Link (Drive/PDF URL)</label>
              <input type="url" id="hubAdd_docLink" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="https://drive.google.com/... or document URL">
          </div>
          <div class="form-group full-width">
              <label>Case Remarks &amp; Co-Sharers / Land Details</label>
              ${renderCaseHubRemarkChipsHtml("hubAdd_remarks", "revenue")}
              <textarea id="hubAdd_remarks" class="${CASE_HUB_INPUT_CLASSES} w-full" rows="2" placeholder="e.g. Co-sharers: 1. Ram Kumar (1/3 share), 2. Shyam (2/3 share); Area 0.450 Hectare; Spot inspection report submitted..."></textarea>
          </div>
      </div>
    `;
  } else if (cat === "misc") {
    fieldsHtml = `
      <div class="form-grid-2col">
          <div class="form-group">
              <label>Misc / Application Case Number <span class="required">*</span></label>
              <input type="text" id="hubAdd_caseNo" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. MCA-2026-101 or Misc App No." required>
          </div>
          <div class="form-group">
              <label>Year <span class="required">*</span></label>
              <input type="number" id="hubAdd_year" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${currentYear}" required>
          </div>
          <div class="form-group">
              <label>Original / Main Suit Number</label>
              <input type="text" id="hubAdd_originalCase" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. OS No. 45/2024">
          </div>
          <div class="form-group">
              <label>Proceeding / Application Type <span class="required">*</span></label>
              <select id="hubAdd_proceedingType" class="${CASE_HUB_INPUT_CLASSES} w-full" onchange="handleCaseHubSelectChange(this, 'hubAdd_proceedingTypeCustom')">
                  ${getMiscCivilProceedingOptionsHtml()}
              </select>
              <input type="text" id="hubAdd_proceedingTypeCustom" class="${CASE_HUB_INPUT_CLASSES} w-full mt-2" placeholder="✍️ Specify other application / proceeding type..." style="display: none;">
          </div>
          <div class="form-group">
              <label>Applicant / Appellant / Revisionist <span class="required">*</span></label>
              <input type="text" id="hubAdd_plaintiff" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="Enter Applicant Name & Ors." required>
          </div>
          <div class="form-group">
              <label>Opposite Party / Respondent <span class="required">*</span></label>
              <input type="text" id="hubAdd_defendant" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="Enter Opposite Party Name & Ors." required>
          </div>
          <div class="form-group">
              <label>Court Name <span class="required">*</span></label>
              <div class="court-input-wrapper">
                  <select id="hubAdd_court" class="${CASE_HUB_INPUT_CLASSES} flex-1" required>${courtOptions}</select>
                  <button type="button" class="mini-court-btn" onclick="handleQuickAddCourt('hubAdd_court')" title="Add New Court">+</button>
              </div>
          </div>
          <div class="form-group">
              <label>Filing Date</label>
              <input type="date" id="hubAdd_filingDate" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${new Date().toISOString().split("T")[0]}">
          </div>
          <div class="form-group">
              <label>Client Name</label>
              <input type="text" id="hubAdd_clientName" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="Enter Client Name">
          </div>
          <div class="form-group">
              <label>Client Number</label>
              <input type="tel" id="hubAdd_clientPhone" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="Enter Client Phone Number">
          </div>
          <div class="form-group full-width">
              <label>Document / Order Sheet Link (Drive/PDF URL)</label>
              <input type="url" id="hubAdd_docLink" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="https://drive.google.com/... or document URL">
          </div>
          <div class="form-group full-width">
              <label>Remarks &amp; Application Notes</label>
              ${renderCaseHubRemarkChipsHtml("hubAdd_remarks", "misc")}
              <textarea id="hubAdd_remarks" class="${CASE_HUB_INPUT_CLASSES} w-full" rows="2" placeholder="e.g. Temporary injunction application filed along with plaint; ex-parte ad-interim injunction granted; notice issued..."></textarea>
          </div>
      </div>
    `;
  } else if (cat === "bail") {
    fieldsHtml = `
      <div class="form-grid-2col">
          <div class="form-group">
              <label>Misc Criminal / Bail Application No. <span class="required">*</span></label>
              <input type="text" id="hubAdd_caseNo" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. BA-2026-050 or Cr. Misc No." required>
          </div>
          <div class="form-group">
              <label>Year <span class="required">*</span></label>
              <input type="number" id="hubAdd_year" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${currentYear}" required>
          </div>
          <div class="form-group">
              <label>Original ST / Crime / FIR Number</label>
              <input type="text" id="hubAdd_originalCase" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. Crime No. 210/2026">
          </div>
          <div class="form-group">
              <label>Application / Proceeding Type <span class="required">*</span></label>
              <select id="hubAdd_proceedingType" class="${CASE_HUB_INPUT_CLASSES} w-full" onchange="handleCaseHubSelectChange(this, 'hubAdd_proceedingTypeCustom')">
                  ${getMiscCriminalProceedingOptionsHtml()}
              </select>
              <input type="text" id="hubAdd_proceedingTypeCustom" class="${CASE_HUB_INPUT_CLASSES} w-full mt-2" placeholder="✍️ Specify other application / proceeding type..." style="display: none;">
          </div>
          <div class="form-group">
              <label>Police Station / Thana <span class="required">*</span></label>
              <select id="hubAdd_policeStation" class="${CASE_HUB_INPUT_CLASSES} w-full" onchange="handleCaseHubSelectChange(this, 'hubAdd_policeStationCustom')">
                  ${getPoliceStationOptionsHtml()}
              </select>
              <input type="text" id="hubAdd_policeStationCustom" class="${CASE_HUB_INPUT_CLASSES} w-full mt-2" placeholder="✍️ Specify other Police Station name..." style="display: none;">
          </div>
          <div class="form-group">
              <label>Section (IPC / BNS / Act)</label>
              <input type="text" id="hubAdd_sections" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. IPC 307, 323, 504 / Sec 109 BNS">
          </div>
          <div class="form-group">
              <label>Applicant / Accused / Appellant <span class="required">*</span></label>
              <input type="text" id="hubAdd_plaintiff" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="Enter Applicant Name & Ors." required>
          </div>
          <div class="form-group">
              <label>Opposite Party (Prosecution / Complainant)</label>
              <input type="text" id="hubAdd_defendant" class="${CASE_HUB_INPUT_CLASSES} w-full" value="State of U.P.">
          </div>
          <div class="form-group">
              <label>Court Name <span class="required">*</span></label>
              <div class="court-input-wrapper">
                  <select id="hubAdd_court" class="${CASE_HUB_INPUT_CLASSES} flex-1" required>${courtOptions}</select>
                  <button type="button" class="mini-court-btn" onclick="handleQuickAddCourt('hubAdd_court')" title="Add New Court">+</button>
              </div>
          </div>
          <div class="form-group">
              <label>Filing Date</label>
              <input type="date" id="hubAdd_filingDate" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${new Date().toISOString().split("T")[0]}">
          </div>
          <div class="form-group">
              <label>Client Name</label>
              <input type="text" id="hubAdd_clientName" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="Enter Client Name">
          </div>
          <div class="form-group">
              <label>Client Number</label>
              <input type="tel" id="hubAdd_clientPhone" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="Enter Client Phone Number">
          </div>
          <div class="form-group full-width">
              <label>Document / Order Sheet Link (Drive/PDF URL)</label>
              <input type="url" id="hubAdd_docLink" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="https://drive.google.com/... or document URL">
          </div>
          <div class="form-group full-width">
              <label>Remarks &amp; Case Progress</label>
              ${renderCaseHubRemarkChipsHtml("hubAdd_remarks", "bail")}
              <textarea id="hubAdd_remarks" class="${CASE_HUB_INPUT_CLASSES} w-full" rows="2" placeholder="e.g. Bail rejected by CJM, moving to Sessions, CD summoned, interim protection..."></textarea>
          </div>
      </div>
    `;
  } else if (cat === "cheque") {
    fieldsHtml = `
      <div class="form-grid-2col">
          <div class="form-group">
              <label>Complaint / CC Number <span class="required">*</span></label>
              <input type="text" id="hubAdd_caseNo" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. CC-2026-105 or Case No." required>
          </div>
          <div class="form-group">
              <label>Year <span class="required">*</span></label>
              <input type="number" id="hubAdd_year" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${currentYear}" required>
          </div>
          <div class="form-group">
              <label>Complaint / Matter Type <span class="required">*</span></label>
              <select id="hubAdd_complaintType" class="${CASE_HUB_INPUT_CLASSES} w-full" onchange="handleCaseHubSelectChange(this, 'hubAdd_complaintTypeCustom')">
                  ${getComplaintTypeOptionsHtml()}
              </select>
              <input type="text" id="hubAdd_complaintTypeCustom" class="${CASE_HUB_INPUT_CLASSES} w-full mt-2" placeholder="✍️ Specify other complaint type..." style="display: none;">
          </div>
          <div class="form-group">
              <label>Sections &amp; Acts</label>
              <input type="text" id="hubAdd_sections" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. Sec 138 NI Act, Sec 406/420 IPC">
          </div>
          <div class="form-group">
              <label>Complainant Name (परिवादी) <span class="required">*</span></label>
              <input type="text" id="hubAdd_plaintiff" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="Enter Complainant Name" required>
          </div>
          <div class="form-group">
              <label>Accused / Opposite Party (विपक्षी / अभियुक्त) <span class="required">*</span></label>
              <input type="text" id="hubAdd_defendant" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="Enter Accused / Opposite Party Name" required>
          </div>
          <div class="form-group">
              <label>Police Station / Thana Jurisdiction</label>
              <select id="hubAdd_policeStation" class="${CASE_HUB_INPUT_CLASSES} w-full" onchange="handleCaseHubSelectChange(this, 'hubAdd_policeStationCustom')">
                  ${getPoliceStationOptionsHtml()}
              </select>
              <input type="text" id="hubAdd_policeStationCustom" class="${CASE_HUB_INPUT_CLASSES} w-full mt-2" placeholder="✍️ Specify other Police Station name..." style="display: none;">
          </div>
          <div class="form-group">
              <label>Court Name <span class="required">*</span></label>
              <div class="court-input-wrapper">
                  <select id="hubAdd_court" class="${CASE_HUB_INPUT_CLASSES} flex-1" required>${courtOptions}</select>
                  <button type="button" class="mini-court-btn" onclick="handleQuickAddCourt('hubAdd_court')" title="Add New Court">+</button>
              </div>
          </div>
          <div class="form-group">
              <label>Filing Date</label>
              <input type="date" id="hubAdd_filingDate" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${new Date().toISOString().split("T")[0]}">
          </div>
          <div class="form-group">
              <label>Client Name</label>
              <input type="text" id="hubAdd_clientName" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="Enter Client Name">
          </div>
          <div class="form-group">
              <label>Client Number</label>
              <input type="tel" id="hubAdd_clientPhone" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="Enter Client Phone Number">
          </div>
          <div class="form-group full-width">
              <label>Document / Complaint Copy Link (Drive/PDF URL)</label>
              <input type="url" id="hubAdd_docLink" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="https://drive.google.com/... or document URL">
          </div>
          <div class="form-group full-width">
              <label>Remarks &amp; Case Notes</label>
              ${renderCaseHubRemarkChipsHtml("hubAdd_remarks", "cheque")}
              <textarea id="hubAdd_remarks" class="${CASE_HUB_INPUT_CLASSES} w-full" rows="2" placeholder="e.g. Cheque No. 458921; dishonour memo attached; statutory demand notice served on 12/03/2026; Sec 200 statement recorded..."></textarea>
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
              <label>Filing Date</label>
              <input type="date" id="hubAdd_filingDate" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${new Date().toISOString().split("T")[0]}">
          </div>
          <div class="form-group">
              <label>Court Name <span class="required">*</span></label>
              <div class="court-input-wrapper">
                  <select id="hubAdd_court" class="${CASE_HUB_INPUT_CLASSES} flex-1" required>${courtOptions}</select>
                  <button type="button" class="mini-court-btn" onclick="handleQuickAddCourt('hubAdd_court')" title="Add New Court">+</button>
              </div>
          </div>
          <div class="form-group">
              <label>Plaintiff / Petitioner (वादी) (Lead Party) <span class="required">*</span></label>
              <input type="text" id="hubAdd_plaintiff" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. Ramesh Kumar & Ors. or Lead Plaintiff Name" required>
          </div>
          <div class="form-group">
              <label>Defendant / Opponent (प्रतिवादी) (Lead Party) <span class="required">*</span></label>
              <input type="text" id="hubAdd_defendant" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. State of U.P. & Ors. or Defendant Name" required>
          </div>
          <div class="form-group full-width">
              <label>Case Remarks &amp; Co-Parties List</label>
              ${renderCaseHubRemarkChipsHtml("hubAdd_remarks", "civil")}
              <textarea id="hubAdd_remarks" class="${CASE_HUB_INPUT_CLASSES} w-full" rows="2" placeholder="e.g. Plaintiffs: 1. Ramesh Kumar, 2. Suresh Kumar; Defendants: 1. State of U.P., 2. Tehsildar Sadar; Injunction granted on 12/03/2026..."></textarea>
          </div>
          <div class="form-group">
              <label>Client Name</label>
              <input type="text" id="hubAdd_clientName" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="Enter Client Name">
          </div>
          <div class="form-group">
              <label>Client Number</label>
              <input type="tel" id="hubAdd_clientPhone" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="Enter Client Number">
          </div>
          <div class="form-group full-width">
              <label>Document / Order Sheet Link (Drive/PDF URL)</label>
              <input type="url" id="hubAdd_docLink" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="https://drive.google.com/... or document URL">
          </div>
      </div>
    `;
  }

  container.innerHTML = `
    <form id="caseHubAddForm" onsubmit="handleCaseHubAddSubmit(event)">
        ${fieldsHtml}
        <div class="form-actions-bar">
            <button type="button" class="btn-action btn-ghost" onclick="renderCaseHubAddForm('${cat}')">
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
  const rawType = document.getElementById("caseHubTypeSelect")?.value || "civil";
  const cat = normalizeCaseCategory(rawType);
  const caseNo = document.getElementById("hubAdd_caseNo")?.value?.trim();
  const caseYear =
    document.getElementById("hubAdd_year")?.value?.trim() || String(new Date().getFullYear());
  const plaintiff = document.getElementById("hubAdd_plaintiff")?.value?.trim() || "";
  const defendant = document.getElementById("hubAdd_defendant")?.value?.trim() || "";
  const courtName = document.getElementById("hubAdd_court")?.value?.trim() || "District Court";
  const clientName = document.getElementById("hubAdd_clientName")?.value?.trim() || "";
  const clientPhone = document.getElementById("hubAdd_clientPhone")?.value?.trim() || "";
  const filingDate = document.getElementById("hubAdd_filingDate")?.value || "";
  const nextHearing = "—"; // Default: newly registered cases start as Undated / '—'
  const remarks = document.getElementById("hubAdd_remarks")?.value?.trim() || "";
  const docLink = document.getElementById("hubAdd_docLink")?.value?.trim() || "";

  // Category specific fields
  const psSelect = document.getElementById("hubAdd_policeStation")?.value?.trim();
  const psCustom = document.getElementById("hubAdd_policeStationCustom")?.value?.trim();
  const policeStation = psSelect === "Other" && psCustom ? psCustom : psSelect || psCustom || "";

  const sections = document.getElementById("hubAdd_sections")?.value?.trim() || "";
  const crimeNo = document.getElementById("hubAdd_crimeNo")?.value?.trim() || "";
  const originalCase = document.getElementById("hubAdd_originalCase")?.value?.trim() || "";

  const matSelect = document.getElementById("hubAdd_matterType")?.value?.trim();
  const matCustom = document.getElementById("hubAdd_matterTypeCustom")?.value?.trim();
  const matterType =
    matSelect && matSelect.toLowerCase().startsWith("other") && matCustom
      ? matCustom
      : matSelect || matCustom || "";

  const marriageDate = document.getElementById("hubAdd_marriageDate")?.value || "";
  const maintenance = document.getElementById("hubAdd_maintenance")?.value?.trim() || "";

  const revSelect = document.getElementById("hubAdd_revenueSection")?.value?.trim();
  const revCustom = document.getElementById("hubAdd_revenueSectionCustom")?.value?.trim();
  const revenueSection =
    revSelect && revSelect.toLowerCase().startsWith("other") && revCustom
      ? revCustom
      : revSelect || revCustom || "";
  const village = document.getElementById("hubAdd_village")?.value?.trim() || "";
  const tehsil = document.getElementById("hubAdd_tehsil")?.value?.trim() || "";
  const gataNo = document.getElementById("hubAdd_gataNo")?.value?.trim() || "";

  const procSelect = document.getElementById("hubAdd_proceedingType")?.value?.trim();
  const procCustom = document.getElementById("hubAdd_proceedingTypeCustom")?.value?.trim();
  const proceedingType =
    procSelect && procSelect.toLowerCase().startsWith("other") && procCustom
      ? procCustom
      : procSelect || procCustom || "";

  const compSelect = document.getElementById("hubAdd_complaintType")?.value?.trim();
  const compCustom = document.getElementById("hubAdd_complaintTypeCustom")?.value?.trim();
  const complaintType =
    compSelect && compSelect.toLowerCase().startsWith("other") && compCustom
      ? compCustom
      : compSelect || compCustom || "";

  if (!caseNo || !plaintiff || !defendant) {
    alert("Please fill the required Case Number and Party details.");
    return;
  }

  const submitBtn = document.getElementById("hubAddSubmitBtn");
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML =
      '<iconify-icon icon="lucide:loader-2" class="spin"></iconify-icon> Saving...';
  }

  const newRecord = {
    caseNo: caseNo,
    caseYear: caseYear,
    caseType: cat,
    plaintiff: plaintiff,
    defendant: defendant,
    caseName: `${plaintiff} vs ${defendant}`,
    courtName: courtName,
    clientName: clientName,
    client_name: clientName,
    clientNumber: clientPhone,
    clientPhone: clientPhone,
    client_phone: clientPhone,
    filingDate: filingDate,
    nextHearing: nextHearing,
    caseStatus: "Pending",
    remark: remarks,
    docLink: docLink,
    policeStation: policeStation,
    crimeSection: sections,
    sections: sections,
    crimeNumber: crimeNo || originalCase,
    originalCaseNumber: originalCase,
    originalCase: originalCase,
    matterType: matterType,
    marriageDate: marriageDate,
    maintenanceDetail: maintenance,
    revenueActSection: revenueSection,
    actSection: revenueSection,
    villageMauja: village,
    village: village,
    parganaTehsil: tehsil,
    tehsil: tehsil,
    gataKhataNo: gataNo,
    gataNo: gataNo,
    proceedingType: proceedingType,
    complaintType: complaintType,
    firstParty: plaintiff,
    victimName: plaintiff,
    applicant: plaintiff,
    petitioner: plaintiff,
    complainant: plaintiff,
    accusedName: defendant,
    oppositeParty: defendant,
    respondent: defendant,
  };

  try {
    if (typeof window.addCaseToSupabase === "function") {
      await window.addCaseToSupabase(newRecord);
    } else if (window.supabaseClient) {
      const table =
        cat === "criminal"
          ? "criminalcases"
          : cat === "family"
            ? "familycases"
            : cat === "revenue"
              ? "revenuecases"
              : cat === "misc"
                ? "misccivilcases"
                : cat === "bail"
                  ? "misccriminalcases"
                  : cat === "cheque"
                    ? "complaintcases"
                    : "civilcases";
      await window.supabaseClient.from(table).insert([
        {
          case_number: caseNo,
          case_year: caseYear,
          case_type: cat,
          plaintiff: plaintiff,
          defendant: defendant,
          court_name: courtName,
          client_name: clientName,
          client_phone: clientPhone,
          next_hearing: nextHearing,
          remarks: remarks,
          case_status: "Pending",
        },
      ]);
    }

    if (Array.isArray(window.allCaseRecords)) {
      window.allCaseRecords.unshift(newRecord);
    }

    if (typeof window.performPostCrudRefresh === "function") {
      await window.performPostCrudRefresh({ caseNumber: caseNo });
    }

    alert(`✅ Case "${caseNo}" (${plaintiff} vs ${defendant}) registered successfully!`);
    renderCaseHubAddForm(cat);
  } catch (err) {
    console.error("Add case error:", err);
    alert(`Case saved locally: "${caseNo}".`);
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML =
        '<iconify-icon icon="lucide:save"></iconify-icon> <span>Register Case Record</span>';
    }
  }
}
window.handleCaseHubAddSubmit = handleCaseHubAddSubmit;

// ==============================================================================
// UPDATE FORM RENDERING (MODE 2)
// ==============================================================================
function renderCaseHubUpdateForm(c) {
  const container = document.getElementById("caseHubUpdateFormContainer");
  if (!container) return;

  const cNo = c.caseNo || c.criminalCaseNumber || "—";
  const cat = normalizeCaseCategory(c.caseType);
  const cName =
    c.caseName ||
    (c.plaintiff
      ? `${c.plaintiff} vs ${c.defendant}`
      : c.victimName
        ? `${c.victimName} vs ${c.accusedName}`
        : "—");
  const courtOptions = getCourtDropdownOptions(c.courtName || c.criminalCourtName);
  const status = c.caseStatus || (c.disposed ? "Disposed" : "Pending");
  const isDisp =
    typeof window.isCaseDisposed === "function"
      ? window.isCaseDisposed(c)
      : (status || "").toLowerCase().includes("dispose");
  let selectedStatus = "Pending";
  if (isDisp) {
    const raw = (status || "").toLowerCase();
    if (raw.includes("decid") || raw.includes("फैसला")) selectedStatus = "Decided";
    else if (raw.includes("acquit") || raw.includes("दोषमुक्त")) selectedStatus = "Acquitted";
    else if (raw.includes("convict") || raw.includes("दोषसिद्ध")) selectedStatus = "Convicted";
    else if (raw.includes("dismiss") || raw.includes("खारिज")) selectedStatus = "Dismissed";
    else if (raw.includes("decree") || raw.includes("डिक्री")) selectedStatus = "Decreed";
    else selectedStatus = "Disposed";
  }

  let catFieldsHtml = "";

  if (cat === "criminal") {
    catFieldsHtml = `
      <div class="form-group">
          <label>Crime / FIR Number</label>
          <input type="text" id="hubUpdate_crimeNo" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.crimeNumber || "")}" placeholder="e.g. Crime No. 142/2026">
      </div>
      <div class="form-group">
          <label>Police Station / Thana</label>
          <select id="hubUpdate_policeStation" class="${CASE_HUB_INPUT_CLASSES} w-full" onchange="handleCaseHubSelectChange(this, 'hubUpdate_policeStationCustom')">
              ${getPoliceStationOptionsHtml(c.policeStation)}
          </select>
          <input type="text" id="hubUpdate_policeStationCustom" class="${CASE_HUB_INPUT_CLASSES} w-full mt-2" value="${escapeHtml(POLICE_STATION_OPTIONS.includes(c.policeStation) ? "" : c.policeStation || "")}" placeholder="✍️ Specify other Police Station name..." style="${POLICE_STATION_OPTIONS.includes(c.policeStation) || !c.policeStation ? "display: none;" : "display: block;"}">
      </div>
      <div class="form-group">
          <label>Statutory Sections (IPC / BNS)</label>
          <input type="text" id="hubUpdate_sections" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.crimeSection || c.sections || "")}" placeholder="e.g. 302, 307 IPC / Sec 103 BNS">
      </div>
      <div class="form-group">
          <label>First Party (Prosecution)</label>
          <input type="text" id="hubUpdate_plaintiff" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.plaintiff || c.firstParty || "State of U.P.")}" required>
      </div>
      <div class="form-group">
          <label>Accused Name (अभियुक्त) <span class="required">*</span></label>
          <input type="text" id="hubUpdate_defendant" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.defendant || c.accusedName || "")}" required>
      </div>
    `;
  } else if (cat === "family") {
    catFieldsHtml = `
      <div class="form-group">
          <label>Dispute / Matter Type</label>
          <select id="hubUpdate_matterType" class="${CASE_HUB_INPUT_CLASSES} w-full" onchange="handleCaseHubSelectChange(this, 'hubUpdate_matterTypeCustom')">
              ${getFamilyMatterOptionsHtml(c.matterType)}
          </select>
          <input type="text" id="hubUpdate_matterTypeCustom" class="${CASE_HUB_INPUT_CLASSES} w-full mt-2" value="${escapeHtml(FAMILY_MATTER_OPTIONS.includes(c.matterType) ? "" : c.matterType || "")}" placeholder="✍️ Specify other family dispute type..." style="${FAMILY_MATTER_OPTIONS.includes(c.matterType) || !c.matterType ? "display: none;" : "display: block;"}">
      </div>
      <div class="form-group">
          <label>Petitioner / First Party (पत्नी / पति) <span class="required">*</span></label>
          <input type="text" id="hubUpdate_plaintiff" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.plaintiff || c.petitioner || "")}" required>
      </div>
      <div class="form-group">
          <label>Respondent / Second Party (पति / पत्नी / ससुराल) <span class="required">*</span></label>
          <input type="text" id="hubUpdate_defendant" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.defendant || c.respondent || "")}" required>
      </div>
      <div class="form-group">
          <label>Marriage Date (विवाह तिथि)</label>
          <input type="date" id="hubUpdate_marriageDate" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${c.marriageDate || ""}">
      </div>
      <div class="form-group">
          <label>Maintenance Claimed / Ordered</label>
          <input type="text" id="hubUpdate_maintenance" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.maintenanceDetail || "")}" placeholder="e.g. ₹15,000/month">
      </div>
    `;
  } else if (cat === "revenue") {
    catFieldsHtml = `
      <div class="form-group">
          <label>Revenue Act &amp; Section (UP Revenue Code)</label>
          <select id="hubUpdate_revenueSection" class="${CASE_HUB_INPUT_CLASSES} w-full" onchange="handleCaseHubSelectChange(this, 'hubUpdate_revenueSectionCustom')">
              ${getRevenueSectionOptionsHtml(c.revenueActSection || c.actSection)}
          </select>
          <input type="text" id="hubUpdate_revenueSectionCustom" class="${CASE_HUB_INPUT_CLASSES} w-full mt-2" value="${escapeHtml(REVENUE_SECTION_OPTIONS.includes(c.revenueActSection || c.actSection) ? "" : c.revenueActSection || c.actSection || "")}" placeholder="✍️ Specify other revenue act / section..." style="${REVENUE_SECTION_OPTIONS.includes(c.revenueActSection || c.actSection) || !(c.revenueActSection || c.actSection) ? "display: none;" : "display: block;"}">
      </div>
      <div class="form-group">
          <label>Village / Mauja (मौजा / ग्राम)</label>
          <input type="text" id="hubUpdate_village" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.villageMauja || c.village || "")}">
      </div>
      <div class="form-group">
          <label>Tehsil / Pargana (तहसील)</label>
          <input type="text" id="hubUpdate_tehsil" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.parganaTehsil || c.tehsil || "")}">
      </div>
      <div class="form-group">
          <label>Gata / Khasra No. &amp; Khatauni</label>
          <input type="text" id="hubUpdate_gataNo" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.gataKhataNo || c.gataNo || "")}">
      </div>
      <div class="form-group">
          <label>Applicant / Plaintiff (वादी) <span class="required">*</span></label>
          <input type="text" id="hubUpdate_plaintiff" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.plaintiff || c.applicant || "")}" required>
      </div>
      <div class="form-group">
          <label>Opposite Party / Gaon Sabha (प्रतिवादी) <span class="required">*</span></label>
          <input type="text" id="hubUpdate_defendant" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.defendant || c.oppositeParty || "")}" required>
      </div>
    `;
  } else if (cat === "misc") {
    catFieldsHtml = `
      <div class="form-group">
          <label>Original / Main Suit Number</label>
          <input type="text" id="hubUpdate_originalCase" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.originalCaseNumber || c.originalCase || "")}" placeholder="e.g. OS No. 45/2024">
      </div>
      <div class="form-group">
          <label>Proceeding / Application Type</label>
          <select id="hubUpdate_proceedingType" class="${CASE_HUB_INPUT_CLASSES} w-full" onchange="handleCaseHubSelectChange(this, 'hubUpdate_proceedingTypeCustom')">
              ${getMiscCivilProceedingOptionsHtml(c.proceedingType)}
          </select>
          <input type="text" id="hubUpdate_proceedingTypeCustom" class="${CASE_HUB_INPUT_CLASSES} w-full mt-2" value="${escapeHtml(MISC_CIVIL_PROCEEDING_OPTIONS.includes(c.proceedingType) ? "" : c.proceedingType || "")}" placeholder="✍️ Specify other application / proceeding type..." style="${MISC_CIVIL_PROCEEDING_OPTIONS.includes(c.proceedingType) || !c.proceedingType ? "display: none;" : "display: block;"}">
      </div>
      <div class="form-group">
          <label>Applicant / Appellant / Revisionist <span class="required">*</span></label>
          <input type="text" id="hubUpdate_plaintiff" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.plaintiff || c.applicant || "")}" required>
      </div>
      <div class="form-group">
          <label>Opposite Party / Respondent <span class="required">*</span></label>
          <input type="text" id="hubUpdate_defendant" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.defendant || c.oppositeParty || "")}" required>
      </div>
    `;
  } else if (cat === "bail") {
    catFieldsHtml = `
      <div class="form-group">
          <label>Original ST / Crime / FIR Number</label>
          <input type="text" id="hubUpdate_originalCase" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.originalCaseNumber || c.originalCase || "")}" placeholder="e.g. Crime No. 210/2026">
      </div>
      <div class="form-group">
          <label>Application / Proceeding Type</label>
          <select id="hubUpdate_proceedingType" class="${CASE_HUB_INPUT_CLASSES} w-full" onchange="handleCaseHubSelectChange(this, 'hubUpdate_proceedingTypeCustom')">
              ${getMiscCriminalProceedingOptionsHtml(c.proceedingType)}
          </select>
          <input type="text" id="hubUpdate_proceedingTypeCustom" class="${CASE_HUB_INPUT_CLASSES} w-full mt-2" value="${escapeHtml(MISC_CRIMINAL_PROCEEDING_OPTIONS.includes(c.proceedingType) ? "" : c.proceedingType || "")}" placeholder="✍️ Specify other application type..." style="${MISC_CRIMINAL_PROCEEDING_OPTIONS.includes(c.proceedingType) || !c.proceedingType ? "display: none;" : "display: block;"}">
      </div>
      <div class="form-group">
          <label>Police Station / Thana</label>
          <select id="hubUpdate_policeStation" class="${CASE_HUB_INPUT_CLASSES} w-full" onchange="handleCaseHubSelectChange(this, 'hubUpdate_policeStationCustom')">
              ${getPoliceStationOptionsHtml(c.policeStation)}
          </select>
          <input type="text" id="hubUpdate_policeStationCustom" class="${CASE_HUB_INPUT_CLASSES} w-full mt-2" value="${escapeHtml(POLICE_STATION_OPTIONS.includes(c.policeStation) ? "" : c.policeStation || "")}" placeholder="✍️ Specify other Police Station name..." style="${POLICE_STATION_OPTIONS.includes(c.policeStation) || !c.policeStation ? "display: none;" : "display: block;"}">
      </div>
      <div class="form-group">
          <label>Statutory Sections (IPC / BNS)</label>
          <input type="text" id="hubUpdate_sections" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.crimeSection || c.sections || "")}">
      </div>
      <div class="form-group">
          <label>Applicant / Accused (प्रार्थी / अभियुक्त) <span class="required">*</span></label>
          <input type="text" id="hubUpdate_plaintiff" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.plaintiff || c.applicant || c.accusedName || "")}" required>
      </div>
      <div class="form-group">
          <label>Opposite Party (विपक्षी)</label>
          <input type="text" id="hubUpdate_defendant" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.defendant || c.oppositeParty || "State of U.P.")}">
      </div>
    `;
  } else if (cat === "cheque") {
    catFieldsHtml = `
      <div class="form-group">
          <label>Complaint / Matter Type</label>
          <select id="hubUpdate_complaintType" class="${CASE_HUB_INPUT_CLASSES} w-full" onchange="handleCaseHubSelectChange(this, 'hubUpdate_complaintTypeCustom')">
              ${getComplaintTypeOptionsHtml(c.complaintType)}
          </select>
          <input type="text" id="hubUpdate_complaintTypeCustom" class="${CASE_HUB_INPUT_CLASSES} w-full mt-2" value="${escapeHtml(COMPLAINT_TYPE_OPTIONS.includes(c.complaintType) ? "" : c.complaintType || "")}" placeholder="✍️ Specify other complaint type..." style="${COMPLAINT_TYPE_OPTIONS.includes(c.complaintType) || !c.complaintType ? "display: none;" : "display: block;"}">
      </div>
      <div class="form-group">
          <label>Sections &amp; Acts</label>
          <input type="text" id="hubUpdate_sections" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.sectionAct || c.sections || "")}">
      </div>
      <div class="form-group">
          <label>Complainant Name (परिवादी) <span class="required">*</span></label>
          <input type="text" id="hubUpdate_plaintiff" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.plaintiff || c.complainant || "")}" required>
      </div>
      <div class="form-group">
          <label>Accused / Opposite Party (विपक्षी / अभियुक्त) <span class="required">*</span></label>
          <input type="text" id="hubUpdate_defendant" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.defendant || c.accusedName || "")}" required>
      </div>
      <div class="form-group">
          <label>Police Station / Jurisdiction</label>
          <select id="hubUpdate_policeStation" class="${CASE_HUB_INPUT_CLASSES} w-full" onchange="handleCaseHubSelectChange(this, 'hubUpdate_policeStationCustom')">
              ${getPoliceStationOptionsHtml(c.policeStation)}
          </select>
          <input type="text" id="hubUpdate_policeStationCustom" class="${CASE_HUB_INPUT_CLASSES} w-full mt-2" value="${escapeHtml(POLICE_STATION_OPTIONS.includes(c.policeStation) ? "" : c.policeStation || "")}" placeholder="✍️ Specify other Police Station name..." style="${POLICE_STATION_OPTIONS.includes(c.policeStation) || !c.policeStation ? "display: none;" : "display: block;"}">
      </div>
    `;
  } else {
    // Default: Civil
    catFieldsHtml = `
      <div class="form-group">
          <label>Plaintiff / Petitioner (वादी) <span class="required">*</span></label>
          <input type="text" id="hubUpdate_plaintiff" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.plaintiff || c.firstParty || "")}" required>
      </div>
      <div class="form-group">
          <label>Defendant / Opponent (प्रतिवादी) <span class="required">*</span></label>
          <input type="text" id="hubUpdate_defendant" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.defendant || c.accusedName || "")}" required>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="selected-case-banner">
        <div class="banner-info">
            <iconify-icon icon="lucide:check-circle-2"></iconify-icon>
            <div>
                <div class="banner-title">${escapeHtml(cNo)} <span class="hub-category-tag ${cat}">${escapeHtml(cat.toUpperCase())}</span></div>
                <div class="banner-subtitle">👤 ${escapeHtml(cName)} · 🏛️ ${escapeHtml(c.courtName || c.criminalCourtName || "District Court")}</div>
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
                    <option value="Pending" ${selectedStatus === "Pending" ? "selected" : ""}>⏳ Pending (Active)</option>
                    <option value="Disposed" ${selectedStatus === "Disposed" ? "selected" : ""}>✅ Disposed Off (निस्तारित)</option>
                    <option value="Decided" ${selectedStatus === "Decided" ? "selected" : ""}>⚖️ Decided (निस्तारित / फैसला)</option>
                    <option value="Acquitted" ${selectedStatus === "Acquitted" ? "selected" : ""}>🛡️ Acquitted (दोषमुक्त)</option>
                    <option value="Convicted" ${selectedStatus === "Convicted" ? "selected" : ""}>⚖️ Convicted (दोषसिद्ध)</option>
                    <option value="Dismissed" ${selectedStatus === "Dismissed" ? "selected" : ""}>❌ Dismissed (खारिज)</option>
                    <option value="Decreed" ${selectedStatus === "Decreed" ? "selected" : ""}>📜 Decreed (डिक्री)</option>
                </select>
            </div>
            ${catFieldsHtml}
            <div class="form-group">
                <label>Assigned Court Complex</label>
                <div class="court-input-wrapper">
                    <select id="hubUpdate_court" class="${CASE_HUB_INPUT_CLASSES} flex-1">${courtOptions}</select>
                    <button type="button" class="mini-court-btn" onclick="handleQuickAddCourt('hubUpdate_court')" title="Add New Court">+</button>
                </div>
            </div>
            <div class="form-group">
                <label>Client Name</label>
                <input type="text" id="hubUpdate_clientName" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.clientName || c.client_name || "")}" placeholder="Client Name">
            </div>
            <div class="form-group">
                <label>Client Mobile Number</label>
                <input type="tel" id="hubUpdate_clientPhone" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.clientNumber || c.criminalClientNumber || c.clientPhone || "")}" placeholder="+91 XXXXXXXXXX">
            </div>
            <div class="form-group">
                <label>Next Hearing Date</label>
                <input type="date" id="hubUpdate_nextHearing" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${c.nextHearing && c.nextHearing !== "—" ? c.nextHearing : ""}">
            </div>
            <div class="form-group">
                <label>Hearing Stage / Process</label>
                <input type="text" id="hubUpdate_process" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.hearingProcess || c.process || "")}" placeholder="e.g. Arguments, Evidence">
            </div>
            <div class="form-group full-width">
                <label>Document / Order Sheet Link (Drive/PDF URL)</label>
                <input type="url" id="hubUpdate_docLink" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.docLink || "")}" placeholder="https://drive.google.com/...">
            </div>
            <div class="form-group full-width">
                <label>Case Notes / Remarks</label>
                ${renderCaseHubRemarkChipsHtml("hubUpdate_remarks", cat)}
                <textarea id="hubUpdate_remarks" class="${CASE_HUB_INPUT_CLASSES} w-full" rows="3">${escapeHtml(c.remark || c.remarks || "")}</textarea>
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
  const container = document.getElementById("caseHubUpdateFormContainer");
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

  const cat = normalizeCaseCategory(activeUpdateCaseObj.caseType);
  const caseNo = document.getElementById("hubUpdate_caseNo")?.value?.trim();
  const status = document.getElementById("hubUpdate_status")?.value;
  const plaintiff = document.getElementById("hubUpdate_plaintiff")?.value?.trim();
  const defendant = document.getElementById("hubUpdate_defendant")?.value?.trim();
  const court = document.getElementById("hubUpdate_court")?.value;
  const clientName = document.getElementById("hubUpdate_clientName")?.value?.trim();
  const clientPhone = document.getElementById("hubUpdate_clientPhone")?.value?.trim();
  const nextHearing = document.getElementById("hubUpdate_nextHearing")?.value || "—";
  const process = document.getElementById("hubUpdate_process")?.value?.trim() || "";
  const remarks = document.getElementById("hubUpdate_remarks")?.value?.trim() || "";
  const docLink = document.getElementById("hubUpdate_docLink")?.value?.trim() || "";

  // Category specific fields
  const psSelect = document.getElementById("hubUpdate_policeStation")?.value?.trim();
  const psCustom = document.getElementById("hubUpdate_policeStationCustom")?.value?.trim();
  const policeStation = psSelect === "Other" && psCustom ? psCustom : psSelect || psCustom || "";

  const sections = document.getElementById("hubUpdate_sections")?.value?.trim() || "";
  const crimeNo = document.getElementById("hubUpdate_crimeNo")?.value?.trim() || "";
  const originalCase = document.getElementById("hubUpdate_originalCase")?.value?.trim() || "";

  const matSelect = document.getElementById("hubUpdate_matterType")?.value?.trim();
  const matCustom = document.getElementById("hubUpdate_matterTypeCustom")?.value?.trim();
  const matterType =
    matSelect && matSelect.toLowerCase().startsWith("other") && matCustom
      ? matCustom
      : matSelect || matCustom || "";

  const marriageDate = document.getElementById("hubUpdate_marriageDate")?.value || "";
  const maintenance = document.getElementById("hubUpdate_maintenance")?.value?.trim() || "";

  const revSelect = document.getElementById("hubUpdate_revenueSection")?.value?.trim();
  const revCustom = document.getElementById("hubUpdate_revenueSectionCustom")?.value?.trim();
  const revenueSection =
    revSelect && revSelect.toLowerCase().startsWith("other") && revCustom
      ? revCustom
      : revSelect || revCustom || "";
  const village = document.getElementById("hubUpdate_village")?.value?.trim() || "";
  const tehsil = document.getElementById("hubUpdate_tehsil")?.value?.trim() || "";
  const gataNo = document.getElementById("hubUpdate_gataNo")?.value?.trim() || "";

  const procSelect = document.getElementById("hubUpdate_proceedingType")?.value?.trim();
  const procCustom = document.getElementById("hubUpdate_proceedingTypeCustom")?.value?.trim();
  const proceedingType =
    procSelect && procSelect.toLowerCase().startsWith("other") && procCustom
      ? procCustom
      : procSelect || procCustom || "";

  const compSelect = document.getElementById("hubUpdate_complaintType")?.value?.trim();
  const compCustom = document.getElementById("hubUpdate_complaintTypeCustom")?.value?.trim();
  const complaintType =
    compSelect && compSelect.toLowerCase().startsWith("other") && compCustom
      ? compCustom
      : compSelect || compCustom || "";

  const submitBtn = document.getElementById("hubUpdateSubmitBtn");
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML =
      '<iconify-icon icon="lucide:loader-2" class="spin"></iconify-icon> Updating...';
  }

  try {
    const isDisp =
      typeof window.isCaseStatusDisposed === "function"
        ? window.isCaseStatusDisposed(status)
        : (status || "").toLowerCase().includes("dispose");
    const finalNextHearing = isDisp ? "—" : nextHearing;
    const finalDisposalDate = isDisp
      ? activeUpdateCaseObj.disposalDate ||
        (nextHearing && nextHearing !== "—" ? nextHearing : new Date().toISOString().split("T")[0])
      : null;

    activeUpdateCaseObj.plaintiff = plaintiff;
    activeUpdateCaseObj.defendant = defendant;
    activeUpdateCaseObj.caseName = `${plaintiff} vs ${defendant}`;
    activeUpdateCaseObj.courtName = court;
    if (clientName !== undefined) {
      activeUpdateCaseObj.clientName = clientName;
      activeUpdateCaseObj.client_name = clientName;
    }
    activeUpdateCaseObj.clientNumber = clientPhone;
    activeUpdateCaseObj.nextHearing = finalNextHearing;
    activeUpdateCaseObj.hearingProcess = isDisp ? status || "Disposed" : process;
    activeUpdateCaseObj.caseStatus = status;
    activeUpdateCaseObj.remark = remarks;
    if (docLink) activeUpdateCaseObj.docLink = docLink;
    if (policeStation) activeUpdateCaseObj.policeStation = policeStation;
    if (sections) {
      activeUpdateCaseObj.crimeSection = sections;
      activeUpdateCaseObj.sections = sections;
    }
    if (crimeNo) activeUpdateCaseObj.crimeNumber = crimeNo;
    if (originalCase) {
      activeUpdateCaseObj.originalCaseNumber = originalCase;
      activeUpdateCaseObj.originalCase = originalCase;
    }
    if (matterType) activeUpdateCaseObj.matterType = matterType;
    if (marriageDate) activeUpdateCaseObj.marriageDate = marriageDate;
    if (maintenance) activeUpdateCaseObj.maintenanceDetail = maintenance;
    if (revenueSection) {
      activeUpdateCaseObj.revenueActSection = revenueSection;
      activeUpdateCaseObj.actSection = revenueSection;
    }
    if (village) {
      activeUpdateCaseObj.villageMauja = village;
      activeUpdateCaseObj.village = village;
    }
    if (tehsil) {
      activeUpdateCaseObj.parganaTehsil = tehsil;
      activeUpdateCaseObj.tehsil = tehsil;
    }
    if (gataNo) {
      activeUpdateCaseObj.gataKhataNo = gataNo;
      activeUpdateCaseObj.gataNo = gataNo;
    }
    if (proceedingType) activeUpdateCaseObj.proceedingType = proceedingType;
    if (complaintType) activeUpdateCaseObj.complaintType = complaintType;

    if (isDisp) {
      activeUpdateCaseObj.disposalDate = finalDisposalDate;
      activeUpdateCaseObj.disposal_date = finalDisposalDate;
    }

    if (typeof window.updateCaseInSupabase === "function") {
      await window.updateCaseInSupabase(
        caseNo,
        caseNo,
        activeUpdateCaseObj.caseType || "civil",
        activeUpdateCaseObj,
      );
    } else if (window.supabaseClient) {
      const type = (activeUpdateCaseObj.caseType || "civil").toLowerCase();
      const table =
        type === "state" || type === "criminal"
          ? "criminalcases"
          : type === "family"
            ? "familycases"
            : type === "revenue"
              ? "revenuecases"
              : type === "misc" || type === "misc_civil"
                ? "misccivilcases"
                : type === "bail" || type === "misc_criminal"
                  ? "misccriminalcases"
                  : type === "cheque" || type === "complaint"
                    ? "complaintcases"
                    : "civilcases";
      const payload = {
        plaintiff: plaintiff,
        defendant: defendant,
        court_name: court,
        client_phone: clientPhone,
        next_hearing: isDisp ? null : nextHearing === "—" ? null : nextHearing,
        remarks: remarks,
        case_status: status,
      };
      if (isDisp && finalDisposalDate) payload.disposal_date = finalDisposalDate;
      await window.supabaseClient.from(table).update(payload).ilike("case_number", caseNo);
    }

    if (typeof window.performPostCrudRefresh === "function") {
      await window.performPostCrudRefresh({ caseNumber: caseNo });
    }

    alert(`✅ Case "${caseNo}" updated successfully!`);
    renderCaseHubUpdateForm(activeUpdateCaseObj);
  } catch (err) {
    console.error("Update case error:", err);
    alert(`Case updated locally: "${caseNo}".`);
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML =
        '<iconify-icon icon="lucide:check-circle-2"></iconify-icon> <span>Save Case Updates</span>';
    }
  }
}
window.handleCaseHubUpdateSubmit = handleCaseHubUpdateSubmit;

// ==============================================================================
// DELETE INSPECTION & CONFIRMATION (MODE 3)
// ==============================================================================
function renderCaseHubDeleteInspection(c) {
  const container = document.getElementById("caseHubDeleteFormContainer");
  if (!container) return;

  const cNo = c.caseNo || c.criminalCaseNumber || "—";
  const cName =
    c.caseName ||
    (c.plaintiff
      ? `${c.plaintiff} vs ${c.defendant}`
      : c.victimName
        ? `${c.victimName} vs ${c.accusedName}`
        : "—");
  const type = (c.caseType || "civil").toUpperCase();
  const court = c.courtName || c.criminalCourtName || "District Court";
  const nextHearing = c.nextHearing || "—";
  const clientName = c.clientName || c.criminalClientName || "Client";

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
  const container = document.getElementById("caseHubDeleteFormContainer");
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
  const modal = document.getElementById("hubDeleteModalOverlay");
  const noEl = document.getElementById("hubModalCaseNo");
  const nameEl = document.getElementById("hubModalCaseName");

  if (noEl) noEl.textContent = caseNo;
  if (nameEl) {
    const cName = activeDeleteCaseObj
      ? activeDeleteCaseObj.caseName || activeDeleteCaseObj.plaintiff || "Case"
      : "Case";
    nameEl.textContent = cName;
  }
  if (modal) modal.style.display = "flex";
}
window.openCaseHubDeleteModal = openCaseHubDeleteModal;

function closeCaseHubDeleteModal() {
  const modal = document.getElementById("hubDeleteModalOverlay");
  if (modal) modal.style.display = "none";
  pendingCaseHubDeleteNo = null;
}
window.closeCaseHubDeleteModal = closeCaseHubDeleteModal;

async function confirmCaseHubDeletion() {
  if (!pendingCaseHubDeleteNo) return;
  const targetNo = pendingCaseHubDeleteNo;
  closeCaseHubDeleteModal();

  try {
    if (typeof window.deleteCaseFromSupabase === "function") {
      await window.deleteCaseFromSupabase(targetNo);
    } else if (Array.isArray(window.allCaseRecords)) {
      const idx = window.allCaseRecords.findIndex(
        (c) =>
          (c.caseNo || "").toLowerCase() === targetNo.toLowerCase() ||
          (c.criminalCaseNumber || "").toLowerCase() === targetNo.toLowerCase(),
      );
      if (idx !== -1) window.allCaseRecords.splice(idx, 1);
    }

    if (typeof window.performPostCrudRefresh === "function") {
      await window.performPostCrudRefresh({ caseNumber: targetNo });
    }

    alert(`🗑️ Case "${targetNo}" deleted permanently.`);
    clearCaseHubDeleteSelection();
    clearSearchInput("delete");
  } catch (err) {
    console.error("Delete error:", err);
    alert(`Could not delete case "${targetNo}".`);
  }
}
window.confirmCaseHubDeletion = confirmCaseHubDeletion;

// Helper: Escape HTML
function escapeHtml(str) {
  if (!str) return "";
  return String(str).replace(
    /[&<>"']/g,
    (s) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[s],
  );
}

// Initializer
function initManageTab() {
  switchCaseHubMode(currentCaseHubMode || "add");
}
window.initManageTab = initManageTab;
