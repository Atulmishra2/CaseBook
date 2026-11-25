// ==============================================================================
// CASEBOOK — UNIFIED CASE HUB (ADD, UPDATE & DELETE) JAVASCRIPT CONTROLLER
// Location: components/tabs/manage/manage.js
// ==============================================================================

// ==============================================================================
// UNIFIED INPUT STYLING CONSTANT & REUSABLE COMPONENT (FORWARD DATES TAB COLORS)
// ==============================================================================
const CASE_HUB_INPUT_CLASSES = "case-hub-input";
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
window.__casebook_tabs["manage"] = `<div class="case-hub-wrapper" data-manage-scope>
    <div class="hub-card">
        <div class="hub-header">
            <div class="hub-title-group">
                <div class="hub-title-icon-wrap" id="hubTitleIcon">
                    <svg class="lucide lucide-folder-plus" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 10v6"/><path d="M9 13h6"/><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
                </div>
                <div>
                    <h1 id="hubActiveTitle">Register New Case</h1>
                    <p id="hubActiveDesc" style="display: none;"></p>
                </div>
            </div>
            <div class="segmented-control" role="tablist">
                <div class="sliding-bg" id="caseHubSlidingBg"></div>
                <button type="button" class="segment-btn active" data-tab="add" onclick="switchCaseHubMode('add')">
                    <svg class="lucide lucide-circle-plus seg-icon-add" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M8 12h8M12 8v8" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round"/></svg>
                    <span>Add Case</span>
                </button>
                <button type="button" class="segment-btn" data-tab="update" onclick="switchCaseHubMode('update')">
                    <svg class="lucide lucide-pencil seg-icon-update" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                    <span>Update</span>
                </button>
                <button type="button" class="segment-btn danger-tab" data-tab="delete" onclick="switchCaseHubMode('delete')">
                    <svg class="lucide lucide-trash-2 seg-icon-delete" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                    <span>Delete</span>
                </button>
            </div>
        </div>

        <!-- MODE 1: ADD NEW CASE -->
        <div id="pane-add" class="tab-pane active" role="tabpanel">
            <div class="lookup-box type-selector-box">
                <div class="category-deck-header">
                    <div class="deck-title-wrap">
                        <svg class="lucide lucide-layout-grid" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect width="7" height="7" x="3" y="3" rx="1"></rect>
                            <rect width="7" height="7" x="14" y="3" rx="1"></rect>
                            <rect width="7" height="7" x="14" y="14" rx="1"></rect>
                            <rect width="7" height="7" x="3" y="14" rx="1"></rect>
                        </svg>
                        <span class="lookup-label">1. Select Case Category</span>
                    </div>
                    <span class="deck-category-count">7 Registers</span>
                </div>

                <div class="form-group category-dropdown-group">
                    <div class="custom-dropdown" id="caseHubTypeDropdown">
                        <select id="caseHubTypeSelect" class="sr-only" onchange="if (window.renderCaseHubAddForm) window.renderCaseHubAddForm(this.value); else if (typeof renderCaseHubAddForm === 'function') renderCaseHubAddForm(this.value);" tabindex="-1" aria-hidden="true">
                            <option value="">-- Select Case Category (प्रकार चुनें) --</option>
                            <option value="civil" selected>Civil Suit / Original Suit (दीवानी)</option>
                            <option value="criminal">Criminal Case / State Matter (फौजदारी - चालानी)</option>
                            <option value="family">Family Court / Matrimonial (पारिवारिक)</option>
                            <option value="revenue">Revenue Court Matter (राजस्व)</option>
                            <option value="misc">MISC Civil Application (विविध दीवानी)</option>
                            <option value="bail">Bail Application (जमानत प्रार्थना पत्र)</option>
                            <option value="cheque">Cheque Bounce (NI Act Sec 138)</option>
                        </select>
                        <button type="button" class="custom-dropdown-trigger dropdown-trigger" id="caseHubTypeTrigger" aria-haspopup="listbox" aria-expanded="false">
                            <span class="custom-dropdown-label dropdown-label" id="caseHubTypeLabel">Civil Suit / Original Suit (दीवानी)</span>
                            <svg class="lucide lucide-chevron-down custom-dropdown-chevron dropdown-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
                        </button>
                        <div class="custom-dropdown-menu dropdown-menu opacity-0 invisible scale-95" id="caseHubTypeMenu">
                            <ul class="custom-dropdown-list options-list custom-scrollbar" id="caseHubTypeList" role="listbox"></ul>
                            <div class="custom-dropdown-empty hidden">No categories found.</div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="caseHubAddFormContainer"></div>
        </div>

        <!-- MODE 2: UPDATE CASE -->
        <div id="pane-update" class="tab-pane" role="tabpanel">
            <div class="lookup-box" id="updateLookupBox">
                <div class="lookup-header-line">
                    <span class="lookup-label">1. Search &amp; Load Case Record</span>
                    
                </div>
                <div class="case-search-hub-bar">
                    <div class="search-input-wrapper">
                        <svg class="lucide lucide-search search-prefix-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
                        <input
                            type="text"
                            class="search-input ${CASE_HUB_INPUT_CLASSES}"
                            id="hubUpdateSearchInput"
                            placeholder="Search by Case No, FIR No, Party name, or Client (e.g. ST 31, Rajesh, State of U.P.)..."
                            autocomplete="off"
                            oninput="handleCaseHubLiveSearch('update')"
                            onkeydown="if(event.key === 'Enter'){ event.preventDefault(); performCaseHubSearch('update'); } else if(event.key === 'Escape'){ clearSearchInput('update'); }"
                        />
                        <button
                            type="button"
                            class="search-clear-btn"
                            id="hubUpdateSearchClearBtn"
                            onclick="clearSearchInput('update')" style="display: none;"
                            title="Clear search query"
                        >
                            <svg class="lucide lucide-x" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                        </button>
                    </div>
                    <button type="button" class="btn-action btn-primary search-submit-btn" onclick="performCaseHubSearch('update')">
                        <svg class="lucide lucide-search" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
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
                        <svg class="lucide lucide-search search-prefix-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
                        <input
                            type="text"
                            class="search-input ${CASE_HUB_INPUT_CLASSES}"
                            id="hubDeleteSearchInput"
                            placeholder="Search by Case No, FIR No, Party name, or Client to inspect..."
                            autocomplete="off"
                            oninput="handleCaseHubLiveSearch('delete')"
                            onkeydown="if(event.key === 'Enter'){ event.preventDefault(); performCaseHubSearch('delete'); } else if(event.key === 'Escape'){ clearSearchInput('delete'); }"
                        />
                        <button
                            type="button"
                            class="search-clear-btn"
                            id="hubDeleteSearchClearBtn"
                            onclick="clearSearchInput('delete')" style="display: none;"
                            title="Clear search query"
                        >
                            <svg class="lucide lucide-x" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                        </button>
                    </div>
                    <button type="button" class="btn-action btn-danger search-submit-btn" onclick="performCaseHubSearch('delete')">
                        <svg class="lucide lucide-search" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
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

// Case Category Quick Chip Selector
function setCaseHubCategoryChip(cat) {
  const normCat = normalizeCaseCategory(cat);
  document.querySelectorAll(".case-hub-wrapper .category-chip-btn").forEach((btn) => {
    const isTarget = btn.dataset.cat === normCat;
    btn.classList.toggle("active", isTarget);
    btn.setAttribute("aria-selected", isTarget ? "true" : "false");
  });
  const sel = document.getElementById("caseHubTypeSelect");
  if (sel) {
    sel.value = normCat;
    const label = document.getElementById("caseHubTypeLabel");
    const opt = sel.options[sel.selectedIndex];
    if (label && opt) label.textContent = opt.textContent;
  }
  renderCaseHubAddForm(normCat);
}
window.setCaseHubCategoryChip = setCaseHubCategoryChip;

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
    if (descEl) descEl.textContent = "";
    if (iconWrap) iconWrap.innerHTML = '<svg class="lucide lucide-folder-plus" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 10v6"/><path d="M9 13h6"/><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>';
    renderCaseHubAddForm(document.getElementById("caseHubTypeSelect")?.value || "civil");
    if (typeof initCaseHubAddCustomDropdowns === "function") {
      initCaseHubAddCustomDropdowns();
    }
  } else if (mode === "update") {
    document.getElementById("pane-update")?.classList.add("active");
    if (titleEl) titleEl.textContent = "Update Case Particulars";
    if (descEl) descEl.textContent = "";
    if (iconWrap) iconWrap.innerHTML = '<svg class="lucide lucide-pencil" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>';
  } else if (mode === "delete") {
    document.getElementById("pane-delete")?.classList.add("active");
    if (titleEl) titleEl.textContent = "Delete Case Record";
    if (descEl) descEl.textContent = "";
    if (iconWrap)
      iconWrap.innerHTML =
        '<svg class="lucide lucide-trash-2" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>';
  }

  // Update sliding glass indicator
  updateCaseHubSlidingBg();
}
window.switchCaseHubMode = switchCaseHubMode;

// Sliding background calculation for iOS glass segmented control
function updateCaseHubSlidingBg() {
  const container = document.querySelector(".case-hub-wrapper .segmented-control");
  if (!container) return;
  const slidingBg = container.querySelector(".sliding-bg");
  const activeBtn = container.querySelector(".segment-btn.active");
  if (!slidingBg || !activeBtn) return;

  if (container.offsetWidth === 0) return; // Tab not visible yet

  const containerRect = container.getBoundingClientRect();
  const btnRect = activeBtn.getBoundingClientRect();
  const left = btnRect.left - containerRect.left;

  slidingBg.style.width = `${btnRect.width}px`;
  slidingBg.style.transform = `translateX(${left}px)`;
}
window.updateCaseHubSlidingBg = updateCaseHubSlidingBg;

// Auto-adjust sliding background on resize & tab reveal
if (typeof window !== "undefined") {
  window.addEventListener("resize", () => {
    updateCaseHubSlidingBg();
  });
}

// Live Search Debounce Timer
let hubSearchDebounceTimer = null;
function handleCaseHubLiveSearch(context) {
  toggleSearchClearBtn(context);
  clearTimeout(hubSearchDebounceTimer);
  const input = document.getElementById(
    context === "update" ? "hubUpdateSearchInput" : "hubDeleteSearchInput",
  );
  const query = (input?.value || "").trim();
  if (!query) {
    clearCaseHubSearchResults(context);
    return;
  }
  if (query.length < 2) return;

  hubSearchDebounceTimer = setTimeout(() => {
    performCaseHubSearch(context);
  }, 250);
}
window.handleCaseHubLiveSearch = handleCaseHubLiveSearch;

// Backwards-compatible Search Mode Switcher (retained safely)
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
    input.placeholder = "Search by Case No, FIR No, Party name, or Client...";
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
    btn.style.display = input.value.trim() ? "inline-flex" : "none";
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

// Perform Intelligent Omni-Search against CaseBook records
function performCaseHubSearch(context) {
  const input = document.getElementById(
    context === "update" ? "hubUpdateSearchInput" : "hubDeleteSearchInput",
  );
  const query = (input?.value || "").trim().toLowerCase();
  if (!query) {
    clearCaseHubSearchResults(context);
    if (input) input.focus();
    return;
  }

  const records = Array.isArray(window.allCaseRecords) ? window.allCaseRecords : [];

  const matches = records.filter((c) => {
    const num1 = (c.caseNo || "").toLowerCase();
    const num2 = (c.criminalCaseNumber || "").toLowerCase();
    const name = (c.caseName || "").toLowerCase();
    const plaintiff = (c.plaintiff || c.firstParty || c.petitioner || c.applicant || c.complainant || "").toLowerCase();
    const defendant = (c.defendant || c.accusedName || c.respondent || c.oppositeParty || "").toLowerCase();
    const victim = (c.victimName || "").toLowerCase();
    const client = (c.clientName || c.client_name || c.criminalClientName || "").toLowerCase();
    const crimeNo = (c.crimeNumber || c.crimeNo || "").toLowerCase();
    const sections = (c.crimeSection || c.sections || c.sectionAct || "").toLowerCase();
    const ps = (c.policeStation || "").toLowerCase();
    const court = (c.courtName || c.criminalCourtName || "").toLowerCase();

    return (
      num1.includes(query) ||
      num2.includes(query) ||
      name.includes(query) ||
      plaintiff.includes(query) ||
      defendant.includes(query) ||
      victim.includes(query) ||
      client.includes(query) ||
      crimeNo.includes(query) ||
      sections.includes(query) ||
      ps.includes(query) ||
      court.includes(query)
    );
  });

  renderCaseHubSearchResults(context, matches, query);
}
window.performCaseHubSearch = performCaseHubSearch;

function getCaseCategoryReadableLabel(type) {
  const cat = normalizeCaseCategory(type);
  const labels = {
    criminal: "Criminal Matter",
    family: "Family Court",
    revenue: "Revenue Matter",
    misc: "Misc Civil",
    bail: "Bail Matter",
    cheque: "Cheque 138 NI",
    civil: "Civil Suit",
  };
  return labels[cat] || "Civil Suit";
}
window.getCaseCategoryReadableLabel = getCaseCategoryReadableLabel;

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
          <svg class="lucide lucide-search-x" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="8" x2="14" y2="14"></line><line x1="14" y1="8" x2="8" y2="14"></line></svg>
          <div>
            No cases matched "<strong>${escapeHtml(query)}</strong>".<br>
            <span style="font-size: var(--text-xs); color: var(--fg-tertiary);">Please verify the case number, party name, or crime FIR number.</span>
          </div>
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
      const cat = normalizeCaseCategory(c.caseType);
      const catLabel = getCaseCategoryReadableLabel(c.caseType);
      const rawStatus = (c.caseStatus || (c.disposed ? "Disposed" : "Pending")).trim();
      const isDisp =
        typeof window.isCaseDisposed === "function"
          ? window.isCaseDisposed(c)
          : rawStatus.toLowerCase().includes("dispose");

      const statusBadgeHtml = isDisp
        ? `<span class="manage-status-meta status-disposed"><svg class="lucide lucide-check-circle-2" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg> Disposed Off</span>`
        : `<span class="manage-status-meta status-pending"><svg class="lucide lucide-hourglass" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 22h14"></path><path d="M5 2h14"></path><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"></path><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"></path></svg> Pending</span>`;

      const actionBtnHtml =
        context === "update"
          ? `<button type="button" class="btn-action btn-primary btn-sm result-select-btn" onclick="event.stopPropagation(); selectCaseForHub('${escapeHtml(cNo)}', 'update');">
               <span>Load &amp; Edit</span>
               <svg class="lucide lucide-arrow-right" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
             </button>`
          : `<button type="button" class="btn-action btn-danger btn-sm result-select-btn" onclick="event.stopPropagation(); selectCaseForHub('${escapeHtml(cNo)}', 'delete');">
               <span>Inspect</span>
               <svg class="lucide lucide-arrow-right" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
             </button>`;

      return `
      <div class="hub-result-item" onclick="selectCaseForHub('${escapeHtml(cNo)}', '${context}')">
          <div class="hub-result-main">
              <div class="hub-result-case-no">
                  <span class="hub-result-case-num">${escapeHtml(cNo)}</span>
                  <span class="hub-category-tag ${cat}">${escapeHtml(catLabel)}</span>
                  ${statusBadgeHtml}
              </div>
              <div class="hub-result-meta">
                  <div class="hub-result-title">
                      <svg class="lucide lucide-user" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                      <span>${escapeHtml(cName)}</span>
                  </div>
                  <div class="hub-result-submeta">
                      <span>
                          <svg class="lucide lucide-landmark" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="22" x2="21" y2="22"></line><line x1="6" y1="18" x2="6" y2="11"></line><line x1="10" y1="18" x2="10" y2="11"></line><line x1="14" y1="18" x2="14" y2="11"></line><line x1="18" y1="18" x2="18" y2="11"></line><polygon points="12 2 20 7 4 7"></polygon></svg>
                          ${escapeHtml(court)}
                      </span>
                      ${c.nextHearing && c.nextHearing !== "—" ? `
                      <span>
                          <svg class="lucide lucide-calendar" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                          Next: <b>${escapeHtml(c.nextHearing)}</b>
                      </span>` : ""}
                  </div>
              </div>
          </div>
          <div class="hub-result-action">
              ${actionBtnHtml}
          </div>
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
      const parent = targetEl.closest(".custom-dropdown");
      if (parent && typeof parent._syncFromSelect === "function") {
        parent._syncFromSelect();
      }
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
    { label: "+ Co-Plaintiffs", text: "Co-Plaintiffs: " },
    { label: "+ Co-Defendants", text: "Co-Defendants: " },
    { label: "+ Connected Suit", text: "Connected Suit: " },
    { label: "+ Injunction Status", text: "Injunction Status: " },
  ],
  criminal: [
    { label: "+ Co-Accused", text: "Co-Accused: " },
    { label: "+ Jail / Custody", text: "Custody / Jail: In District Jail since " },
    { label: "+ Bail Surety", text: "Bail Surety: " },
    { label: "+ GD / CD Notes", text: "Thana GD / CD Notes: " },
  ],
  family: [
    { label: "+ In-Laws Named", text: "In-Laws Named: " },
    { label: "+ Mediation Status", text: "Mediation Status: Referred on " },
    { label: "+ Minor Children", text: "Minor Children: " },
    { label: "+ Maintenance", text: "Interim Maintenance: " },
  ],
  revenue: [
    { label: "+ Co-Sharers", text: "Co-Sharers: " },
    { label: "+ Land Area / Rakba", text: "Land Area / Rakba: " },
    { label: "+ Revenue Report", text: "Lekhpal / Kanoongo Report: " },
    { label: "+ Boundary Notes", text: "Boundary / Demarcation: " },
  ],
  misc: [
    { label: "+ Injunction Grounds", text: "Order 39 Rule 1&2 CPC Grounds: " },
    { label: "+ Recall Grounds", text: "Order 9 Rule 13 Ex-Parte Recall: " },
    { label: "+ LCR Summoned", text: "Lower Court Record (LCR): " },
    { label: "+ Stay Order", text: "Stay Order Status: " },
  ],
  bail: [
    { label: "+ Bail Grounds", text: "Bail Grounds: False implication, no overt act, " },
    { label: "+ Parity", text: "Parity: Co-accused granted bail on " },
    { label: "+ Clean Antecedents", text: "Previous Antecedents: Clean record / no past cases" },
    { label: "+ Interim Protection", text: "Interim Protection: Stay of arrest granted till " },
  ],
  cheque: [
    { label: "+ Cheque Details", text: "Cheque Details: No. , Date: , Amount: Rs. , Bank: " },
    { label: "+ Notice Served", text: "Statutory Demand Notice Sent on: , Served on: " },
    { label: "+ Sec 200 Statement", text: "Sec 200 CrPC Statement Recorded on " },
    { label: "+ Summoning Order", text: "Summoning Order Date: " },
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
      return `<button type="button" class="case-hub-preset-chip" onclick="insertCaseHubRemarkChip('${textareaId}', '${escapeHtml(item.text)}')"><svg class="lucide lucide-plus" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg><span>${escapeHtml(item.label)}</span></button>`;
    })
    .join("");
  return `
    <div class="case-hub-chips-wrap">
      <div class="case-hub-chips-header">
        <span class="case-hub-chips-label">
          <svg class="lucide lucide-sparkles" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>
          <span>Presets:</span>
        </span>
        <div class="case-hub-chips-actions">
          <button type="button" class="case-hub-preset-chip case-hub-magic-chip" onclick="if (typeof autoFormatRemarkField === 'function') autoFormatRemarkField('${textareaId}')" title="Auto-format sections and numbered lines">
            <svg class="lucide lucide-wand-2" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"></path><path d="m14 7 3 3"></path><path d="M5 6v4"></path><path d="M19 14v4"></path><path d="M10 2v2"></path><path d="M7 8H3"></path><path d="M21 16h-4"></path><path d="M11 3H9"></path></svg>
            <span>Auto-Format</span>
          </button>
          <button type="button" class="case-hub-preset-chip case-hub-preview-chip" onclick="if (typeof previewRemarkLook === 'function') previewRemarkLook('${textareaId}')" title="Preview structured cards">
            <svg class="lucide lucide-eye" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            <span>Preview</span>
          </button>
        </div>
      </div>
      <div class="case-hub-chips-scroll">
        ${chipsHtml}
      </div>
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

// ==============================================================================
// CUSTOM DROPDOWNS IN REGISTER NEW CASE (PRESERVED FROM customMadeDropDown1.html)
// ==============================================================================
function initCaseHubDropdown(containerId, selectId, onSelectCallback) {
  const container = document.getElementById(containerId);
  const select = document.getElementById(selectId);
  if (!container || !select) return;

  const trigger = container.querySelector(".custom-dropdown-trigger");
  const menu = container.querySelector(".custom-dropdown-menu");
  const chevron = container.querySelector(".custom-dropdown-chevron");
  const labelEl = container.querySelector(".custom-dropdown-label");
  const listEl = container.querySelector(".custom-dropdown-list");
  if (!trigger || !menu || !listEl) return;

  // Search Input Area inside menu (if present in markup)
  let searchWrap = menu.querySelector(".custom-dropdown-search-wrap");
  let searchInput = menu.querySelector(".custom-dropdown-search-input");
  let emptyState = menu.querySelector(".custom-dropdown-empty");

  if (!emptyState) {
    emptyState = document.createElement("div");
    emptyState.className = "custom-dropdown-empty hidden";
    emptyState.textContent = "No options found.";
    menu.appendChild(emptyState);
  }

  function openDropdown() {
    document.querySelectorAll(".case-hub-wrapper .custom-dropdown-menu.open, .custom-dropdown-menu.open").forEach((m) => {
      if (m !== menu) {
        m.classList.remove("open", "opacity-100", "visible", "scale-100");
        m.classList.add("opacity-0", "invisible", "scale-95");
        const parent = m.closest(".custom-dropdown, .custom-dropdown-wrap");
        const c = parent?.querySelector(".custom-dropdown-chevron");
        if (c) c.classList.remove("rotate-180");
        const t = parent?.querySelector(".custom-dropdown-trigger");
        if (t) t.setAttribute("aria-expanded", "false");
      }
    });

    menu.classList.remove("opacity-0", "invisible", "scale-95");
    menu.classList.add("open", "opacity-100", "visible", "scale-100");
    if (chevron) chevron.classList.add("rotate-180");
    if (trigger) trigger.setAttribute("aria-expanded", "true");

    if (searchInput) {
      searchInput.value = "";
      filterOptions("");
      setTimeout(() => searchInput.focus(), 80);
    }
  }

  function closeDropdown() {
    menu.classList.remove("open", "opacity-100", "visible", "scale-100");
    menu.classList.add("opacity-0", "invisible", "scale-95");
    if (chevron) chevron.classList.remove("rotate-180");
    if (trigger) trigger.setAttribute("aria-expanded", "false");
  }

  function toggleDropdown() {
    if (menu.classList.contains("open") || menu.classList.contains("opacity-100")) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }

  function filterOptions(searchTerm = "") {
    const term = searchTerm.toLowerCase().trim();
    let visibleCount = 0;
    listEl.querySelectorAll(".custom-dropdown-item").forEach((item) => {
      const text = (item.textContent || "").toLowerCase();
      const val = (item.getAttribute("data-value") || "").toLowerCase();
      const match = !term || text.includes(term) || val.includes(term);
      item.style.display = match ? "" : "none";
      if (match) visibleCount++;
    });
    if (emptyState) {
      emptyState.classList.toggle("hidden", visibleCount > 0);
    }
  }

  function renderOptions() {
    if (!listEl) return;
    listEl.innerHTML = "";
    const options = Array.from(select.options);
    const selectedVal = select.value;

    if (options.length === 0) {
      if (emptyState) emptyState.classList.remove("hidden");
      return;
    }
    if (emptyState) emptyState.classList.add("hidden");

    options.forEach((opt) => {
      const li = document.createElement("li");
      const isSelected = opt.value === selectedVal;
      li.className = `custom-dropdown-item ${isSelected ? "selected" : ""}`;
      li.setAttribute("role", "option");
      li.setAttribute("aria-selected", isSelected ? "true" : "false");
      li.setAttribute("data-value", opt.value);

      const safeText = (typeof escapeHtml === "function")
        ? escapeHtml(opt.textContent || opt.value)
        : (opt.textContent || opt.value);

      li.innerHTML = `
        <span class="truncate">${safeText}</span>
        ${isSelected ? '<svg class="lucide lucide-check w-4 h-4 checkmark custom-dropdown-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>' : ''}
      `;

      li.addEventListener("click", (e) => {
        e.stopPropagation();
        select.value = opt.value;
        if (labelEl) labelEl.textContent = opt.textContent;
        closeDropdown();
        renderOptions();

        const changeEvent = new Event("change", { bubbles: true });
        select.dispatchEvent(changeEvent);

        if (typeof onSelectCallback === "function") {
          onSelectCallback(opt.value);
        }
      });

      listEl.appendChild(li);
    });

    const curOpt = select.options[select.selectedIndex];
    if (labelEl && curOpt) {
      labelEl.textContent = curOpt.textContent;
    }

    if (searchInput && searchInput.value) {
      filterOptions(searchInput.value);
    }
  }

  container._syncFromSelect = function () {
    const curOpt = select.options[select.selectedIndex];
    if (labelEl && curOpt) {
      labelEl.textContent = curOpt.textContent;
    }
    renderOptions();
  };

  trigger.onclick = (e) => {
    e.stopPropagation();
    toggleDropdown();
  };

  if (searchInput && !searchInput._bound) {
    searchInput._bound = true;
    searchInput.addEventListener("input", (e) => {
      filterOptions(e.target.value);
    });
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeDropdown();
        trigger.focus();
      } else if (e.key === "Enter") {
        e.preventDefault();
        const firstVisible = listEl.querySelector(".custom-dropdown-item:not([style*='display: none'])");
        if (firstVisible) firstVisible.click();
      }
    });
    searchInput.addEventListener("click", (e) => e.stopPropagation());
  }

  renderOptions();

  if (typeof MutationObserver !== "undefined") {
    if (container._observer) {
      container._observer.disconnect();
    }
    const observer = new MutationObserver(() => {
      renderOptions();
    });
    observer.observe(select, { childList: true, subtree: true, attributes: true });
    container._observer = observer;
  }

  container._initialized = true;
}

if (typeof window !== "undefined" && !window._caseHubDropdownGlobalListenerAdded) {
  window._caseHubDropdownGlobalListenerAdded = true;
  document.addEventListener("click", (e) => {
    if (!e.target.closest || !e.target.closest(".custom-dropdown")) {
      document.querySelectorAll(".case-hub-wrapper .custom-dropdown-menu.open, .custom-dropdown-menu.open").forEach((m) => {
        m.classList.remove("open", "opacity-100", "visible", "scale-100");
        m.classList.add("opacity-0", "invisible", "scale-95");
        const parent = m.closest(".custom-dropdown");
        const c = parent?.querySelector(".custom-dropdown-chevron");
        if (c) c.classList.remove("rotate-180");
        const t = parent?.querySelector(".custom-dropdown-trigger");
        if (t) t.setAttribute("aria-expanded", "false");
      });
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".case-hub-wrapper .custom-dropdown-menu.open, .custom-dropdown-menu.open").forEach((m) => {
        m.classList.remove("open", "opacity-100", "visible", "scale-100");
        m.classList.add("opacity-0", "invisible", "scale-95");
        const parent = m.closest(".custom-dropdown");
        const c = parent?.querySelector(".custom-dropdown-chevron");
        if (c) c.classList.remove("rotate-180");
        const t = parent?.querySelector(".custom-dropdown-trigger");
        if (t) t.setAttribute("aria-expanded", "false");
      });
    }
  });
}

function renderCaseHubCustomDropdownHtml(containerId, selectId, selectInnerHtml, defaultLabel, extraClasses = "", onchangeAttr = "") {
  return `
    <div class="custom-dropdown ${extraClasses}" id="${containerId}">
      <select id="${selectId}" class="sr-only" ${onchangeAttr ? `onchange="${onchangeAttr}"` : ""} tabindex="-1" aria-hidden="true">
        ${selectInnerHtml}
      </select>
      <button type="button" class="custom-dropdown-trigger dropdown-trigger" id="${containerId}Trigger" aria-haspopup="listbox" aria-expanded="false">
        <span class="custom-dropdown-label dropdown-label" id="${containerId}Label">${defaultLabel || "Select option"}</span>
        <svg class="lucide lucide-chevron-down custom-dropdown-chevron dropdown-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="custom-dropdown-menu dropdown-menu opacity-0 invisible scale-95" id="${containerId}Menu">
        <ul class="custom-dropdown-list options-list custom-scrollbar" id="${containerId}List" role="listbox"></ul>
        <div class="custom-dropdown-empty hidden">No options found.</div>
      </div>
    </div>
  `;
}

function initCaseHubAddCustomDropdowns() {
  initCaseHubDropdown("caseHubTypeDropdown", "caseHubTypeSelect", (val) => {
    renderCaseHubAddForm(val);
  });

  const dropdownPairs = [
    { container: "hubAdd_courtDropdown", select: "hubAdd_court" },
    {
      container: "hubAdd_policeStationDropdown",
      select: "hubAdd_policeStation",
      onSelect: (val) => {
        const el = document.getElementById("hubAdd_policeStation");
        if (typeof handleCaseHubSelectChange === "function") {
          handleCaseHubSelectChange(el, "hubAdd_policeStationCustom");
        }
      }
    },
    {
      container: "hubAdd_matterTypeDropdown",
      select: "hubAdd_matterType",
      onSelect: (val) => {
        const el = document.getElementById("hubAdd_matterType");
        if (typeof handleCaseHubSelectChange === "function") {
          handleCaseHubSelectChange(el, "hubAdd_matterTypeCustom");
        }
      }
    },
    {
      container: "hubAdd_revenueSectionDropdown",
      select: "hubAdd_revenueSection",
      onSelect: (val) => {
        const el = document.getElementById("hubAdd_revenueSection");
        if (typeof handleCaseHubSelectChange === "function") {
          handleCaseHubSelectChange(el, "hubAdd_revenueSectionCustom");
        }
      }
    },
    {
      container: "hubAdd_proceedingTypeDropdown",
      select: "hubAdd_proceedingType",
      onSelect: (val) => {
        const el = document.getElementById("hubAdd_proceedingType");
        if (typeof handleCaseHubSelectChange === "function") {
          handleCaseHubSelectChange(el, "hubAdd_proceedingTypeCustom");
        }
      }
    },
    {
      container: "hubAdd_complaintTypeDropdown",
      select: "hubAdd_complaintType",
      onSelect: (val) => {
        const el = document.getElementById("hubAdd_complaintType");
        if (typeof handleCaseHubSelectChange === "function") {
          handleCaseHubSelectChange(el, "hubAdd_complaintTypeCustom");
        }
      }
    }
  ];

  dropdownPairs.forEach(({ container, select, onSelect }) => {
    if (document.getElementById(container) && document.getElementById(select)) {
      initCaseHubDropdown(container, select, onSelect);
    }
  });
}
window.initCaseHubAddCustomDropdowns = initCaseHubAddCustomDropdowns;
window.initCaseHubDropdown = initCaseHubDropdown;
window.renderCaseHubCustomDropdownHtml = renderCaseHubCustomDropdownHtml;

function renderCaseHubAddForm(caseType) {
  window.renderCaseHubAddForm = renderCaseHubAddForm;
  const container = document.getElementById("caseHubAddFormContainer");
  if (!container) return;

  const cat = normalizeCaseCategory(caseType);
  const currentYear = new Date().getFullYear();
  const courtOptions = getCourtDropdownOptions();

  // Synchronize category chips rail
  document.querySelectorAll(".case-hub-wrapper .category-chip-btn").forEach((btn) => {
    const isTarget = btn.dataset.cat === cat;
    btn.classList.toggle("active", isTarget);
    btn.setAttribute("aria-selected", isTarget ? "true" : "false");
  });

  const miniCourtBtnHtml = `
    <button type="button" class="mini-court-btn" onclick="handleQuickAddCourt('hubAdd_court')" title="Add New Court">
      <svg class="lucide lucide-plus" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg><span class="sr-only">+</span>
    </button>
  `;

  let fieldsHtml = "";

  if (cat === "criminal") {
    fieldsHtml = `
      <!-- Card 1: Case Identity & Filing Forum -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              <svg class="lucide lucide-shield-alert" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M12 8v4"></path><path d="M12 16h.01"></path></svg>
            </div>
            <h3 class="hub-subcard-title">Case Identity &amp; Filing Forum</h3>
          </div>
          <span class="hub-subcard-badge">Criminal Register</span>
        </div>
        <div class="hub-form-grid">
          <div class="form-group">
            <label>Case Number / ST No. <span class="required">*</span></label>
            <input type="text" id="hubAdd_caseNo" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. ST-2026-001 or Sess. Case 104/2026" required>
          </div>
          <div class="form-group">
            <label>Crime / Case Year <span class="required">*</span></label>
            <input type="number" id="hubAdd_year" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${currentYear}" required>
          </div>
          <div class="form-group">
            <label>Filing / Cognizance Date</label>
            <input type="date" id="hubAdd_filingDate" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${new Date().toISOString().split("T")[0]}">
          </div>
          <div class="form-group">
            <label>Court Name <span class="required">*</span></label>
            <div class="court-input-wrapper">
              ${renderCaseHubCustomDropdownHtml(
                "hubAdd_courtDropdown",
                "hubAdd_court",
                courtOptions,
                "-- Select Court --",
                "flex-1"
              )}
              ${miniCourtBtnHtml}
            </div>
          </div>
        </div>
      </div>

      <!-- Card 2: Prosecution & Accused Parties -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              <svg class="lucide lucide-users" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <h3 class="hub-subcard-title">Prosecution &amp; Accused Parties</h3>
          </div>
          <span class="hub-subcard-badge">Litigants</span>
        </div>
        <div class="hub-form-grid">
          <div class="form-group">
            <label>First Party (Prosecution)</label>
            <input type="text" id="hubAdd_plaintiff" class="${CASE_HUB_INPUT_CLASSES} w-full" value="State of U.P.">
          </div>
          <div class="form-group">
            <label>Accused Name (Lead / Opposite Party) <span class="required">*</span></label>
            <input type="text" id="hubAdd_defendant" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. Ramesh Kumar & 2 Ors." required>
          </div>
          <div class="form-group">
            <label>Client Name Represented</label>
            <input type="text" id="hubAdd_clientName" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="Enter Client Name">
          </div>
          <div class="form-group">
            <label>Client Number</label>
            <input type="tel" id="hubAdd_clientPhone" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="Enter Client Phone Number">
          </div>
        </div>
      </div>

      <!-- Card 3: Crime Details & Statutory Sections -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              <svg class="lucide lucide-file-text" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            </div>
            <h3 class="hub-subcard-title">Crime Details &amp; Statutory Sections</h3>
          </div>
          <span class="hub-subcard-badge">Investigation</span>
        </div>
        <div class="hub-form-grid">
          <div class="form-group">
            <label>Crime / FIR Number</label>
            <input type="text" id="hubAdd_crimeNo" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. Crime No. 142/2026">
          </div>
          <div class="form-group">
            <label>Police Station / Thana <span class="required">*</span></label>
            ${renderCaseHubCustomDropdownHtml(
              "hubAdd_policeStationDropdown",
              "hubAdd_policeStation",
              getPoliceStationOptionsHtml(),
              "-- Select Police Station (थाना चुनें) --",
              "w-full",
              "handleCaseHubSelectChange(this, 'hubAdd_policeStationCustom')"
            )}
            <input type="text" id="hubAdd_policeStationCustom" class="${CASE_HUB_INPUT_CLASSES} w-full mt-2" placeholder="Specify other Police Station name..." style="display: none;">
          </div>
          <div class="form-group full-width">
            <label>Sections (IPC / CrPC / BNS)</label>
            <input type="text" id="hubAdd_sections" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. IPC 302, 307, 504 / BNS 103">
          </div>
        </div>
      </div>

      <!-- Card 4: Case Remarks & Co-Accused Dossier -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              <svg class="lucide lucide-clipboard-list" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="M12 11h4"></path><path d="M12 16h4"></path><path d="M8 11h.01"></path><path d="M8 16h.01"></path></svg>
            </div>
            <h3 class="hub-subcard-title">Case Remarks &amp; Co-Accused Dossier</h3>
          </div>
          <span class="hub-subcard-badge">Dossier</span>
        </div>
        <div class="form-group full-width">
          <label>Case Remarks &amp; Co-Accused / Custody Details</label>
          ${renderCaseHubRemarkChipsHtml("hubAdd_remarks", "criminal")}
          <textarea id="hubAdd_remarks" class="${CASE_HUB_INPUT_CLASSES} w-full remarks-textarea" rows="3" placeholder="e.g. Co-accused: 1. Suresh Kumar, 2. Rajesh; In District Jail since 15-01-2026; Case Diary summoned..."></textarea>
        </div>
      </div>

      <!-- Card 5: Digital Documents & Electronic Records -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              <svg class="lucide lucide-link-2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 17H7A5 5 0 0 1 7 7h2"></path><path d="M15 7h2a5 5 0 1 1 0 10h-2"></path><line x1="8" y1="12" x2="16" y2="12"></line></svg>
            </div>
            <h3 class="hub-subcard-title">Documents Link</h3>
          </div>
          <span class="hub-subcard-badge">Cloud Vault</span>
        </div>
        <div class="form-group full-width">
          <label>Document / Order Sheet Link (Drive/PDF URL)</label>
          <input type="url" id="hubAdd_docLink" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="https://drive.google.com/... or document URL">
        </div>
      </div>
    `;
  } else if (cat === "family") {
    fieldsHtml = `
      <!-- Card 1: Family Case Identifier & Forum -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              <svg class="lucide lucide-users" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <h3 class="hub-subcard-title">Family Case Identifier &amp; Forum</h3>
          </div>
          <span class="hub-subcard-badge">Family Court</span>
        </div>
        <div class="hub-form-grid">
          <div class="form-group">
            <label>Family Case Number <span class="required">*</span></label>
            <input type="text" id="hubAdd_caseNo" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. FC-2026-015 or Matrimonial Case 45/2026" required>
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
            <label>Family Court Complex <span class="required">*</span></label>
            <div class="court-input-wrapper">
              ${renderCaseHubCustomDropdownHtml(
                "hubAdd_courtDropdown",
                "hubAdd_court",
                courtOptions,
                "-- Select Court --",
                "flex-1"
              )}
              ${miniCourtBtnHtml}
            </div>
          </div>
        </div>
      </div>

      <!-- Card 2: Spousal Litigants & Representation -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              <svg class="lucide lucide-heart-handshake" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m11 17 2 2a1 1 0 0 0 1.42 0l4.24-4.24a1 1 0 0 0 0-1.42l-5.66-5.66a1 1 0 0 0-1.42 0L8.17 11.1"></path><path d="m18 11 3.17-3.17a1 1 0 0 0 0-1.42L18.4 3.63a1 1 0 0 0-1.42 0L14 6.6"></path><path d="m6 18 1.4-1.4"></path><path d="M2 14v4a2 2 0 0 0 2 2h4l4-4"></path></svg>
            </div>
            <h3 class="hub-subcard-title">Spousal Litigants &amp; Representation</h3>
          </div>
          <span class="hub-subcard-badge">Parties</span>
        </div>
        <div class="hub-form-grid">
          <div class="form-group">
            <label>Petitioner / Applicant (Wife / Husband) <span class="required">*</span></label>
            <input type="text" id="hubAdd_plaintiff" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. Smt. Pooja Sharma" required>
          </div>
          <div class="form-group">
            <label>Respondent / Opposite Party (Husband / Wife / In-laws) <span class="required">*</span></label>
            <input type="text" id="hubAdd_defendant" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. Rahul Sharma & Ors." required>
          </div>
          <div class="form-group">
            <label>Client Name</label>
            <input type="text" id="hubAdd_clientName" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="Enter Client Name">
          </div>
          <div class="form-group">
            <label>Client Number</label>
            <input type="tel" id="hubAdd_clientPhone" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="Enter Client Phone Number">
          </div>
        </div>
      </div>

      <!-- Card 3: Matrimonial & Statutory Specifics -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              <svg class="lucide lucide-file-text" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            </div>
            <h3 class="hub-subcard-title">Matrimonial &amp; Statutory Specifics</h3>
          </div>
          <span class="hub-subcard-badge">Jurisdiction</span>
        </div>
        <div class="hub-form-grid">
          <div class="form-group">
            <label>Dispute / Matter Type <span class="required">*</span></label>
            ${renderCaseHubCustomDropdownHtml(
              "hubAdd_matterTypeDropdown",
              "hubAdd_matterType",
              getFamilyMatterOptionsHtml(),
              "-- Select Dispute / Matter Type --",
              "w-full",
              "handleCaseHubSelectChange(this, 'hubAdd_matterTypeCustom')"
            )}
            <input type="text" id="hubAdd_matterTypeCustom" class="${CASE_HUB_INPUT_CLASSES} w-full mt-2" placeholder="Specify other family dispute type..." style="display: none;">
          </div>
          <div class="form-group">
            <label>Marriage Date (Optional)</label>
            <input type="date" id="hubAdd_marriageDate" class="${CASE_HUB_INPUT_CLASSES} w-full">
          </div>
          <div class="form-group full-width">
            <label>Maintenance Claimed / Ordered</label>
            <input type="text" id="hubAdd_maintenance" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. ₹15,000/month interim maintenance">
          </div>
        </div>
      </div>

      <!-- Card 4: Case Remarks & Mediation Dossier -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              <svg class="lucide lucide-clipboard-list" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="M12 11h4"></path><path d="M12 16h4"></path><path d="M8 11h.01"></path><path d="M8 16h.01"></path></svg>
            </div>
            <h3 class="hub-subcard-title">Case Remarks &amp; Mediation Dossier</h3>
          </div>
          <span class="hub-subcard-badge">Dossier</span>
        </div>
        <div class="form-group full-width">
          <label>Case Remarks &amp; Mediation / Children Details</label>
          ${renderCaseHubRemarkChipsHtml("hubAdd_remarks", "family")}
          <textarea id="hubAdd_remarks" class="${CASE_HUB_INPUT_CLASSES} w-full remarks-textarea" rows="3" placeholder="e.g. In-laws named in petition: 1. Smt. Kamala, 2. Ram Lal; Referred to Mediation Center on 10/02/2026; Child custody dispute..."></textarea>
        </div>
      </div>

      <!-- Card 5: Documents & Records -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              <svg class="lucide lucide-link-2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 17H7A5 5 0 0 1 7 7h2"></path><path d="M15 7h2a5 5 0 1 1 0 10h-2"></path><line x1="8" y1="12" x2="16" y2="12"></line></svg>
            </div>
            <h3 class="hub-subcard-title">Documents Link</h3>
          </div>
          <span class="hub-subcard-badge">Cloud Vault</span>
        </div>
        <div class="form-group full-width">
          <label>Document / Order Sheet Link (Drive/PDF URL)</label>
          <input type="url" id="hubAdd_docLink" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="https://drive.google.com/... or document URL">
        </div>
      </div>
    `;
  } else if (cat === "revenue") {
    fieldsHtml = `
      <!-- Card 1: Revenue Case Identifier & Court -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              <svg class="lucide lucide-landmark" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="22" x2="21" y2="22"></line><line x1="6" y1="18" x2="6" y2="11"></line><line x1="10" y1="18" x2="10" y2="11"></line><line x1="14" y1="18" x2="14" y2="11"></line><line x1="18" y1="18" x2="18" y2="11"></line><polygon points="12 2 20 7 4 7"></polygon></svg>
            </div>
            <h3 class="hub-subcard-title">Revenue Case Identifier &amp; Court</h3>
          </div>
          <span class="hub-subcard-badge">Revenue Register</span>
        </div>
        <div class="hub-form-grid">
          <div class="form-group">
            <label>Case Number / Computerized Case No. <span class="required">*</span></label>
            <input type="text" id="hubAdd_caseNo" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. REV-2026-020 or Case No. T2026..." required>
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
            <label>Revenue Court <span class="required">*</span></label>
            <div class="court-input-wrapper">
              ${renderCaseHubCustomDropdownHtml(
                "hubAdd_courtDropdown",
                "hubAdd_court",
                courtOptions,
                "-- Select Court --",
                "flex-1"
              )}
              ${miniCourtBtnHtml}
            </div>
          </div>
        </div>
      </div>

      <!-- Card 2: Applicant & Gaon Sabha Parties -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              <svg class="lucide lucide-users" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <h3 class="hub-subcard-title">Applicant &amp; Gaon Sabha Parties</h3>
          </div>
          <span class="hub-subcard-badge">Litigants</span>
        </div>
        <div class="hub-form-grid">
          <div class="form-group">
            <label>Applicant / Plaintiff (वादी) <span class="required">*</span></label>
            <input type="text" id="hubAdd_plaintiff" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. Ram Prasad & Ors." required>
          </div>
          <div class="form-group">
            <label>Opposite Party / Gaon Sabha (प्रतिवादी / गाँव सभा) <span class="required">*</span></label>
            <input type="text" id="hubAdd_defendant" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. Gaon Sabha & 3 Ors." required>
          </div>
          <div class="form-group">
            <label>Client Name</label>
            <input type="text" id="hubAdd_clientName" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="Enter Client Name">
          </div>
          <div class="form-group">
            <label>Client Number</label>
            <input type="tel" id="hubAdd_clientPhone" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="Enter Client Phone Number">
          </div>
        </div>
      </div>

      <!-- Card 3: Land & Demarcation Specifics -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              <svg class="lucide lucide-map-pin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
            <h3 class="hub-subcard-title">Land &amp; Demarcation Specifics</h3>
          </div>
          <span class="hub-subcard-badge">Land Record</span>
        </div>
        <div class="hub-form-grid">
          <div class="form-group">
            <label>Revenue Act &amp; Section (UP Revenue Code) <span class="required">*</span></label>
            ${renderCaseHubCustomDropdownHtml(
              "hubAdd_revenueSectionDropdown",
              "hubAdd_revenueSection",
              getRevenueSectionOptionsHtml(),
              "-- Select Revenue Section / Act --",
              "w-full",
              "handleCaseHubSelectChange(this, 'hubAdd_revenueSectionCustom')"
            )}
            <input type="text" id="hubAdd_revenueSectionCustom" class="${CASE_HUB_INPUT_CLASSES} w-full mt-2" placeholder="Specify other revenue act / section..." style="display: none;">
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
        </div>
      </div>

      <!-- Card 4: Remarks & Co-Sharers Dossier -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              <svg class="lucide lucide-clipboard-list" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="M12 11h4"></path><path d="M12 16h4"></path><path d="M8 11h.01"></path><path d="M8 16h.01"></path></svg>
            </div>
            <h3 class="hub-subcard-title">Case Remarks &amp; Co-Sharers Dossier</h3>
          </div>
          <span class="hub-subcard-badge">Dossier</span>
        </div>
        <div class="form-group full-width">
          <label>Case Remarks &amp; Co-Sharers / Land Details</label>
          ${renderCaseHubRemarkChipsHtml("hubAdd_remarks", "revenue")}
          <textarea id="hubAdd_remarks" class="${CASE_HUB_INPUT_CLASSES} w-full remarks-textarea" rows="3" placeholder="e.g. Co-sharers: 1. Ram Kumar (1/3 share), 2. Shyam (2/3 share); Area 0.450 Hectare; Spot inspection report submitted..."></textarea>
        </div>
      </div>

      <!-- Card 5: Documents & Records -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              <svg class="lucide lucide-link-2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 17H7A5 5 0 0 1 7 7h2"></path><path d="M15 7h2a5 5 0 1 1 0 10h-2"></path><line x1="8" y1="12" x2="16" y2="12"></line></svg>
            </div>
            <h3 class="hub-subcard-title">Documents Link</h3>
          </div>
          <span class="hub-subcard-badge">Cloud Vault</span>
        </div>
        <div class="form-group full-width">
          <label>Document / Order Sheet Link (Drive/PDF URL)</label>
          <input type="url" id="hubAdd_docLink" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="https://drive.google.com/... or document URL">
        </div>
      </div>
    `;
  } else if (cat === "misc") {
    fieldsHtml = `
      <!-- Card 1: Misc Application Identifier & Court -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              <svg class="lucide lucide-file-stack" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 2v4a2 2 0 0 0 2 2h4"></path><path d="M21 14V8a2 2 0 0 0-2-2h-3"></path><path d="M3 7v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3"></path></svg>
            </div>
            <h3 class="hub-subcard-title">Misc Application Identifier &amp; Court</h3>
          </div>
          <span class="hub-subcard-badge">Misc Civil</span>
        </div>
        <div class="hub-form-grid">
          <div class="form-group">
            <label>Misc / Application Case Number <span class="required">*</span></label>
            <input type="text" id="hubAdd_caseNo" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. MCA-2026-101 or Misc App No." required>
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
              ${renderCaseHubCustomDropdownHtml(
                "hubAdd_courtDropdown",
                "hubAdd_court",
                courtOptions,
                "-- Select Court --",
                "flex-1"
              )}
              ${miniCourtBtnHtml}
            </div>
          </div>
        </div>
      </div>

      <!-- Card 2: Applicants & Opposite Parties -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              <svg class="lucide lucide-users" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <h3 class="hub-subcard-title">Applicants &amp; Opposite Parties</h3>
          </div>
          <span class="hub-subcard-badge">Litigants</span>
        </div>
        <div class="hub-form-grid">
          <div class="form-group">
            <label>Applicant / Appellant / Revisionist <span class="required">*</span></label>
            <input type="text" id="hubAdd_plaintiff" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="Enter Applicant Name & Ors." required>
          </div>
          <div class="form-group">
            <label>Opposite Party / Respondent <span class="required">*</span></label>
            <input type="text" id="hubAdd_defendant" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="Enter Opposite Party Name & Ors." required>
          </div>
          <div class="form-group">
            <label>Client Name</label>
            <input type="text" id="hubAdd_clientName" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="Enter Client Name">
          </div>
          <div class="form-group">
            <label>Client Number</label>
            <input type="tel" id="hubAdd_clientPhone" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="Enter Client Phone Number">
          </div>
        </div>
      </div>

      <!-- Card 3: Original Suit & Application Type -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              <svg class="lucide lucide-layers" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"></path><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"></path><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"></path></svg>
            </div>
            <h3 class="hub-subcard-title">Original Suit &amp; Proceeding Type</h3>
          </div>
          <span class="hub-subcard-badge">Proceeding</span>
        </div>
        <div class="hub-form-grid">
          <div class="form-group">
            <label>Original / Main Suit Number</label>
            <input type="text" id="hubAdd_originalCase" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. OS No. 45/2024">
          </div>
          <div class="form-group">
            <label>Proceeding / Application Type <span class="required">*</span></label>
            ${renderCaseHubCustomDropdownHtml(
              "hubAdd_proceedingTypeDropdown",
              "hubAdd_proceedingType",
              getMiscCivilProceedingOptionsHtml(),
              "-- Select Proceeding Type --",
              "w-full",
              "handleCaseHubSelectChange(this, 'hubAdd_proceedingTypeCustom')"
            )}
            <input type="text" id="hubAdd_proceedingTypeCustom" class="${CASE_HUB_INPUT_CLASSES} w-full mt-2" placeholder="Specify other application / proceeding type..." style="display: none;">
          </div>
        </div>
      </div>

      <!-- Card 4: Remarks & Application Notes -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              <svg class="lucide lucide-clipboard-list" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="M12 11h4"></path><path d="M12 16h4"></path><path d="M8 11h.01"></path><path d="M8 16h.01"></path></svg>
            </div>
            <h3 class="hub-subcard-title">Remarks &amp; Application Notes</h3>
          </div>
          <span class="hub-subcard-badge">Dossier</span>
        </div>
        <div class="form-group full-width">
          <label>Remarks &amp; Application Notes</label>
          ${renderCaseHubRemarkChipsHtml("hubAdd_remarks", "misc")}
          <textarea id="hubAdd_remarks" class="${CASE_HUB_INPUT_CLASSES} w-full remarks-textarea" rows="3" placeholder="e.g. Temporary injunction application filed along with plaint; ex-parte ad-interim injunction granted; notice issued..."></textarea>
        </div>
      </div>

      <!-- Card 5: Documents & Records -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              <svg class="lucide lucide-link-2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 17H7A5 5 0 0 1 7 7h2"></path><path d="M15 7h2a5 5 0 1 1 0 10h-2"></path><line x1="8" y1="12" x2="16" y2="12"></line></svg>
            </div>
            <h3 class="hub-subcard-title">Documents Link</h3>
          </div>
          <span class="hub-subcard-badge">Cloud Vault</span>
        </div>
        <div class="form-group full-width">
          <label>Document / Order Sheet Link (Drive/PDF URL)</label>
          <input type="url" id="hubAdd_docLink" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="https://drive.google.com/... or document URL">
        </div>
      </div>
    `;
  } else if (cat === "bail") {
    fieldsHtml = `
      <!-- Card 1: Bail Application Identifier & Court -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              <svg class="lucide lucide-lock" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>
            <h3 class="hub-subcard-title">Bail Application Identifier &amp; Court</h3>
          </div>
          <span class="hub-subcard-badge">Bail Register</span>
        </div>
        <div class="hub-form-grid">
          <div class="form-group">
            <label>Misc Criminal / Bail Application No. <span class="required">*</span></label>
            <input type="text" id="hubAdd_caseNo" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. BA-2026-050 or Cr. Misc No." required>
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
              ${renderCaseHubCustomDropdownHtml(
                "hubAdd_courtDropdown",
                "hubAdd_court",
                courtOptions,
                "-- Select Court --",
                "flex-1"
              )}
              ${miniCourtBtnHtml}
            </div>
          </div>
        </div>
      </div>

      <!-- Card 2: Accused & State Prosecution -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              <svg class="lucide lucide-users" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <h3 class="hub-subcard-title">Accused &amp; State Prosecution</h3>
          </div>
          <span class="hub-subcard-badge">Litigants</span>
        </div>
        <div class="hub-form-grid">
          <div class="form-group">
            <label>Applicant / Accused / Appellant <span class="required">*</span></label>
            <input type="text" id="hubAdd_plaintiff" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="Enter Applicant Name & Ors." required>
          </div>
          <div class="form-group">
            <label>Opposite Party (Prosecution / Complainant)</label>
            <input type="text" id="hubAdd_defendant" class="${CASE_HUB_INPUT_CLASSES} w-full" value="State of U.P.">
          </div>
          <div class="form-group">
            <label>Client Name</label>
            <input type="text" id="hubAdd_clientName" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="Enter Client Name">
          </div>
          <div class="form-group">
            <label>Client Number</label>
            <input type="tel" id="hubAdd_clientPhone" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="Enter Client Phone Number">
          </div>
        </div>
      </div>

      <!-- Card 3: FIR, Police Station & Crime Specifics -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              <svg class="lucide lucide-shield-alert" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M12 8v4"></path><path d="M12 16h.01"></path></svg>
            </div>
            <h3 class="hub-subcard-title">FIR, Police Station &amp; Crime Specifics</h3>
          </div>
          <span class="hub-subcard-badge">Bail Particulars</span>
        </div>
        <div class="hub-form-grid">
          <div class="form-group">
            <label>Original ST / Crime / FIR Number</label>
            <input type="text" id="hubAdd_originalCase" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. Crime No. 210/2026">
          </div>
          <div class="form-group">
            <label>Application / Proceeding Type <span class="required">*</span></label>
            ${renderCaseHubCustomDropdownHtml(
              "hubAdd_proceedingTypeDropdown",
              "hubAdd_proceedingType",
              getMiscCriminalProceedingOptionsHtml(),
              "-- Select Application Type --",
              "w-full",
              "handleCaseHubSelectChange(this, 'hubAdd_proceedingTypeCustom')"
            )}
            <input type="text" id="hubAdd_proceedingTypeCustom" class="${CASE_HUB_INPUT_CLASSES} w-full mt-2" placeholder="Specify other application / proceeding type..." style="display: none;">
          </div>
          <div class="form-group">
            <label>Police Station / Thana <span class="required">*</span></label>
            ${renderCaseHubCustomDropdownHtml(
              "hubAdd_policeStationDropdown",
              "hubAdd_policeStation",
              getPoliceStationOptionsHtml(),
              "-- Select Police Station (थाना चुनें) --",
              "w-full",
              "handleCaseHubSelectChange(this, 'hubAdd_policeStationCustom')"
            )}
            <input type="text" id="hubAdd_policeStationCustom" class="${CASE_HUB_INPUT_CLASSES} w-full mt-2" placeholder="Specify other Police Station name..." style="display: none;">
          </div>
          <div class="form-group">
            <label>Section (IPC / BNS / Act)</label>
            <input type="text" id="hubAdd_sections" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. IPC 307, 323, 504 / Sec 109 BNS">
          </div>
        </div>
      </div>

      <!-- Card 4: Remarks & Case Progress -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              <svg class="lucide lucide-clipboard-list" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="M12 11h4"></path><path d="M12 16h4"></path><path d="M8 11h.01"></path><path d="M8 16h.01"></path></svg>
            </div>
            <h3 class="hub-subcard-title">Remarks &amp; Case Progress</h3>
          </div>
          <span class="hub-subcard-badge">Dossier</span>
        </div>
        <div class="form-group full-width">
          <label>Remarks &amp; Case Progress</label>
          ${renderCaseHubRemarkChipsHtml("hubAdd_remarks", "bail")}
          <textarea id="hubAdd_remarks" class="${CASE_HUB_INPUT_CLASSES} w-full remarks-textarea" rows="3" placeholder="e.g. Bail rejected by CJM, moving to Sessions, CD summoned, interim protection..."></textarea>
        </div>
      </div>

      <!-- Card 5: Documents & Records -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              <svg class="lucide lucide-link-2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 17H7A5 5 0 0 1 7 7h2"></path><path d="M15 7h2a5 5 0 1 1 0 10h-2"></path><line x1="8" y1="12" x2="16" y2="12"></line></svg>
            </div>
            <h3 class="hub-subcard-title">Documents Link</h3>
          </div>
          <span class="hub-subcard-badge">Cloud Vault</span>
        </div>
        <div class="form-group full-width">
          <label>Document / Order Sheet Link (Drive/PDF URL)</label>
          <input type="url" id="hubAdd_docLink" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="https://drive.google.com/... or document URL">
        </div>
      </div>
    `;
  } else if (cat === "cheque") {
    fieldsHtml = `
      <!-- Card 1: NI Act Case Identifier & Court -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              <svg class="lucide lucide-credit-card" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
            </div>
            <h3 class="hub-subcard-title">NI Act Case Identifier &amp; Court</h3>
          </div>
          <span class="hub-subcard-badge">Cheque 138</span>
        </div>
        <div class="hub-form-grid">
          <div class="form-group">
            <label>Complaint / CC Number <span class="required">*</span></label>
            <input type="text" id="hubAdd_caseNo" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. CC-2026-105 or Case No." required>
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
              ${renderCaseHubCustomDropdownHtml(
                "hubAdd_courtDropdown",
                "hubAdd_court",
                courtOptions,
                "-- Select Court --",
                "flex-1"
              )}
              ${miniCourtBtnHtml}
            </div>
          </div>
        </div>
      </div>

      <!-- Card 2: Complainant & Accused Parties -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              <svg class="lucide lucide-users" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <h3 class="hub-subcard-title">Complainant &amp; Accused Parties</h3>
          </div>
          <span class="hub-subcard-badge">Litigants</span>
        </div>
        <div class="hub-form-grid">
          <div class="form-group">
            <label>Complainant Name (परिवादी) <span class="required">*</span></label>
            <input type="text" id="hubAdd_plaintiff" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="Enter Complainant Name" required>
          </div>
          <div class="form-group">
            <label>Accused / Opposite Party (विपक्षी / अभियुक्त) <span class="required">*</span></label>
            <input type="text" id="hubAdd_defendant" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="Enter Accused / Opposite Party Name" required>
          </div>
          <div class="form-group">
            <label>Client Name</label>
            <input type="text" id="hubAdd_clientName" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="Enter Client Name">
          </div>
          <div class="form-group">
            <label>Client Number</label>
            <input type="tel" id="hubAdd_clientPhone" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="Enter Client Phone Number">
          </div>
        </div>
      </div>

      <!-- Card 3: Dishonour & Jurisdiction Specifics -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              <svg class="lucide lucide-file-text" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            </div>
            <h3 class="hub-subcard-title">Dishonour &amp; Jurisdiction Specifics</h3>
          </div>
          <span class="hub-subcard-badge">NI Act</span>
        </div>
        <div class="hub-form-grid">
          <div class="form-group">
            <label>Complaint / Matter Type <span class="required">*</span></label>
            ${renderCaseHubCustomDropdownHtml(
              "hubAdd_complaintTypeDropdown",
              "hubAdd_complaintType",
              getComplaintTypeOptionsHtml(),
              "-- Select Complaint Type --",
              "w-full",
              "handleCaseHubSelectChange(this, 'hubAdd_complaintTypeCustom')"
            )}
            <input type="text" id="hubAdd_complaintTypeCustom" class="${CASE_HUB_INPUT_CLASSES} w-full mt-2" placeholder="Specify other complaint type..." style="display: none;">
          </div>
          <div class="form-group">
            <label>Sections &amp; Acts</label>
            <input type="text" id="hubAdd_sections" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. Sec 138 NI Act, Sec 406/420 IPC">
          </div>
          <div class="form-group full-width">
            <label>Police Station / Thana Jurisdiction</label>
            ${renderCaseHubCustomDropdownHtml(
              "hubAdd_policeStationDropdown",
              "hubAdd_policeStation",
              getPoliceStationOptionsHtml(),
              "-- Select Police Station (थाना चुनें) --",
              "w-full",
              "handleCaseHubSelectChange(this, 'hubAdd_policeStationCustom')"
            )}
            <input type="text" id="hubAdd_policeStationCustom" class="${CASE_HUB_INPUT_CLASSES} w-full mt-2" placeholder="Specify other Police Station name..." style="display: none;">
          </div>
        </div>
      </div>

      <!-- Card 4: Remarks & Case Notes -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              <svg class="lucide lucide-clipboard-list" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="M12 11h4"></path><path d="M12 16h4"></path><path d="M8 11h.01"></path><path d="M8 16h.01"></path></svg>
            </div>
            <h3 class="hub-subcard-title">Remarks &amp; Case Notes</h3>
          </div>
          <span class="hub-subcard-badge">Dossier</span>
        </div>
        <div class="form-group full-width">
          <label>Remarks &amp; Case Notes</label>
          ${renderCaseHubRemarkChipsHtml("hubAdd_remarks", "cheque")}
          <textarea id="hubAdd_remarks" class="${CASE_HUB_INPUT_CLASSES} w-full remarks-textarea" rows="3" placeholder="e.g. Cheque No. 458921; dishonour memo attached; statutory demand notice served on 12/03/2026; Sec 200 statement recorded..."></textarea>
        </div>
      </div>

      <!-- Card 5: Documents & Records -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              <svg class="lucide lucide-link-2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 17H7A5 5 0 0 1 7 7h2"></path><path d="M15 7h2a5 5 0 1 1 0 10h-2"></path><line x1="8" y1="12" x2="16" y2="12"></line></svg>
            </div>
            <h3 class="hub-subcard-title">Documents Link</h3>
          </div>
          <span class="hub-subcard-badge">Cloud Vault</span>
        </div>
        <div class="form-group full-width">
          <label>Document / Complaint Copy Link (Drive/PDF URL)</label>
          <input type="url" id="hubAdd_docLink" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="https://drive.google.com/... or document URL">
        </div>
      </div>
    `;
  } else {
    // Default: Civil Suit / Original Matters
    fieldsHtml = `
      <!-- Card 1: Case Identifier & Filing Forum -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              <svg class="lucide lucide-scale" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path><path d="M7 21h10"></path><path d="M12 3v18"></path><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"></path></svg>
            </div>
            <h3 class="hub-subcard-title">Case Identifier &amp; Filing Forum</h3>
          </div>
          <span class="hub-subcard-badge">Civil Register</span>
        </div>
        <div class="hub-form-grid">
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
              ${renderCaseHubCustomDropdownHtml(
                "hubAdd_courtDropdown",
                "hubAdd_court",
                courtOptions,
                "-- Select Court --",
                "flex-1"
              )}
              ${miniCourtBtnHtml}
            </div>
          </div>
        </div>
      </div>

      <!-- Card 2: Client Details -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              <svg class="lucide lucide-users" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <h3 class="hub-subcard-title">Client Details</h3>
          </div>
          <span class="hub-subcard-badge">Parties Docket</span>
        </div>
        <div class="hub-form-grid">
          <div class="form-group">
            <label>Plaintiff / Petitioner (वादी) (Lead Party) <span class="required">*</span></label>
            <input type="text" id="hubAdd_plaintiff" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. Ramesh Kumar & Ors. or Lead Plaintiff Name" required>
          </div>
          <div class="form-group">
            <label>Defendant / Opponent (प्रतिवादी) (Lead Party) <span class="required">*</span></label>
            <input type="text" id="hubAdd_defendant" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="e.g. State of U.P. & Ors. or Defendant Name" required>
          </div>
          <div class="form-group">
            <label>Client Name</label>
            <input type="text" id="hubAdd_clientName" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="Enter Client Name">
          </div>
          <div class="form-group">
            <label>Client Number</label>
            <input type="tel" id="hubAdd_clientPhone" class="${CASE_HUB_INPUT_CLASSES} w-full" placeholder="Enter Client Number">
          </div>
        </div>
      </div>

      <!-- Card 3: Case Remarks & Co-Parties -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              <svg class="lucide lucide-clipboard-list" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="M12 11h4"></path><path d="M12 16h4"></path><path d="M8 11h.01"></path><path d="M8 16h.01"></path></svg>
            </div>
            <h3 class="hub-subcard-title">Case Remarks &amp; Co-Parties</h3>
          </div>
          <span class="hub-subcard-badge">Dossier</span>
        </div>
        <div class="form-group full-width">
          <label>Case Remarks &amp; Co-Parties List</label>
          ${renderCaseHubRemarkChipsHtml("hubAdd_remarks", "civil")}
          <textarea id="hubAdd_remarks" class="${CASE_HUB_INPUT_CLASSES} w-full remarks-textarea" rows="3" placeholder="e.g. Plaintiffs: 1. Ramesh Kumar, 2. Suresh Kumar; Defendants: 1. State of U.P., 2. Tehsildar Sadar; Injunction granted on 12/03/2026..."></textarea>
        </div>
      </div>

      <!-- Card 4: Documents Link -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              <svg class="lucide lucide-link-2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 17H7A5 5 0 0 1 7 7h2"></path><path d="M15 7h2a5 5 0 1 1 0 10h-2"></path><line x1="8" y1="12" x2="16" y2="12"></line></svg>
            </div>
            <h3 class="hub-subcard-title">Documents Link</h3>
          </div>
          <span class="hub-subcard-badge">Cloud Vault</span>
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
                <svg class="lucide lucide-rotate-ccw" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
                <span>Reset Form</span>
            </button>
            <button type="submit" class="btn-action btn-primary" id="hubAddSubmitBtn">
                <svg class="lucide lucide-save" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                <span>Register Case Record</span>
            </button>
        </div>
    </form>
  `;

  initCaseHubAddCustomDropdowns();
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

  const cNo = c.caseNo || c.criminalCaseNumber || c.caseNumber || "—";
  const cat = normalizeCaseCategory(c.caseType);
  const cYear = c.year || c.crimeYear || c.caseYear || (c.filingDate ? c.filingDate.substring(0, 4) : new Date().getFullYear());
  const filingDate = c.filingDate || "";
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

  // Mini Court button
  const miniCourtBtnHtml = `
    <button type="button" class="mini-court-btn" onclick="handleQuickAddCourt('hubUpdate_court')" title="Add New Court">
      <svg class="lucide lucide-plus" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg><span class="sr-only">+</span>
    </button>
  `;

  // Category Configuration
  let card1Icon = `<svg class="lucide lucide-scale" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path><path d="M7 21h10"></path><path d="M12 3v18"></path><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"></path></svg>`;
  let card1Title = "Case Identity & Filing Forum";
  let card1Badge = "Civil Register";
  let caseNoLabel = "Case Number / Suit No.";
  let yearLabel = "Case Year";
  let filingLabel = "Filing Date";

  let card2Icon = `<svg class="lucide lucide-users" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`;
  let card2Title = "Client Details";
  let card2Badge = "Parties Docket";
  let p1Label = 'Plaintiff / Petitioner (वादी) <span class="required">*</span>';
  let p2Label = 'Defendant / Opponent (प्रतिवादी) <span class="required">*</span>';

  let specificsCardHtml = "";

  if (cat === "criminal") {
    card1Icon = `<svg class="lucide lucide-shield-alert" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M12 8v4"></path><path d="M12 16h.01"></path></svg>`;
    card1Title = "Case Identity & Filing Forum";
    card1Badge = "Criminal Register";
    caseNoLabel = "Case Number / ST No.";
    yearLabel = "Crime / Case Year";
    filingLabel = "Filing / Cognizance Date";

    card2Icon = `<svg class="lucide lucide-users" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`;
    card2Title = "Prosecution & Accused Parties";
    card2Badge = "Litigants";
    p1Label = "First Party (Prosecution)";
    p2Label = 'Accused Name (Lead / Opposite Party) <span class="required">*</span>';

    specificsCardHtml = `
      <!-- Card 3: Crime Details & Statutory Sections -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              <svg class="lucide lucide-file-text" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            </div>
            <h3 class="hub-subcard-title">Crime Details &amp; Statutory Sections</h3>
          </div>
          <span class="hub-subcard-badge">Investigation</span>
        </div>
        <div class="hub-form-grid">
          <div class="form-group">
            <label>Crime / FIR Number</label>
            <input type="text" id="hubUpdate_crimeNo" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.crimeNumber || "")}" placeholder="e.g. Crime No. 142/2026">
          </div>
          <div class="form-group">
            <label>Police Station / Thana <span class="required">*</span></label>
            <select id="hubUpdate_policeStation" class="${CASE_HUB_INPUT_CLASSES} w-full" onchange="handleCaseHubSelectChange(this, 'hubUpdate_policeStationCustom')">
              ${getPoliceStationOptionsHtml(c.policeStation)}
            </select>
            <input type="text" id="hubUpdate_policeStationCustom" class="${CASE_HUB_INPUT_CLASSES} w-full mt-2" value="${escapeHtml(POLICE_STATION_OPTIONS.includes(c.policeStation) ? "" : c.policeStation || "")}" placeholder="Specify other Police Station name..." style="${POLICE_STATION_OPTIONS.includes(c.policeStation) || !c.policeStation ? "display: none;" : "display: block;"}">
          </div>
          <div class="form-group full-width">
            <label>Sections (IPC / CrPC / BNS)</label>
            <input type="text" id="hubUpdate_sections" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.crimeSection || c.sections || "")}" placeholder="e.g. IPC 302, 307, 504 / BNS 103">
          </div>
        </div>
      </div>
    `;
  } else if (cat === "family") {
    card1Icon = `<svg class="lucide lucide-users" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`;
    card1Title = "Family Case Identifier & Forum";
    card1Badge = "Family Court";
    caseNoLabel = "Family Case Number";
    yearLabel = "Year";
    filingLabel = "Filing Date";

    card2Icon = `<svg class="lucide lucide-heart-handshake" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m11 17 2 2a1 1 0 0 0 1.42 0l4.24-4.24a1 1 0 0 0 0-1.42l-5.66-5.66a1 1 0 0 0-1.42 0L8.17 11.1"></path><path d="m18 11 3.17-3.17a1 1 0 0 0 0-1.42L18.4 3.63a1 1 0 0 0-1.42 0L14 6.6"></path><path d="m6 18 1.4-1.4"></path><path d="M2 14v4a2 2 0 0 0 2 2h4l4-4"></path></svg>`;
    card2Title = "Spousal Litigants & Representation";
    card2Badge = "Parties";
    p1Label = 'Petitioner / Applicant (Wife / Husband) <span class="required">*</span>';
    p2Label = 'Respondent / Opposite Party (Husband / Wife / In-laws) <span class="required">*</span>';

    specificsCardHtml = `
      <!-- Card 3: Matrimonial & Statutory Specifics -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              <svg class="lucide lucide-file-text" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            </div>
            <h3 class="hub-subcard-title">Matrimonial &amp; Statutory Specifics</h3>
          </div>
          <span class="hub-subcard-badge">Jurisdiction</span>
        </div>
        <div class="hub-form-grid">
          <div class="form-group">
            <label>Dispute / Matter Type <span class="required">*</span></label>
            <select id="hubUpdate_matterType" class="${CASE_HUB_INPUT_CLASSES} w-full" onchange="handleCaseHubSelectChange(this, 'hubUpdate_matterTypeCustom')">
              ${getFamilyMatterOptionsHtml(c.matterType)}
            </select>
            <input type="text" id="hubUpdate_matterTypeCustom" class="${CASE_HUB_INPUT_CLASSES} w-full mt-2" value="${escapeHtml(FAMILY_MATTER_OPTIONS.includes(c.matterType) ? "" : c.matterType || "")}" placeholder="Specify other family dispute type..." style="${FAMILY_MATTER_OPTIONS.includes(c.matterType) || !c.matterType ? "display: none;" : "display: block;"}">
          </div>
          <div class="form-group">
            <label>Marriage Date (Optional)</label>
            <input type="date" id="hubUpdate_marriageDate" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${c.marriageDate || ""}">
          </div>
          <div class="form-group full-width">
            <label>Maintenance Claimed / Ordered</label>
            <input type="text" id="hubUpdate_maintenance" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.maintenanceDetail || "")}" placeholder="e.g. ₹15,000/month interim maintenance">
          </div>
        </div>
      </div>
    `;
  } else if (cat === "revenue") {
    card1Icon = `<svg class="lucide lucide-landmark" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="22" x2="21" y2="22"></line><line x1="6" y1="18" x2="6" y2="11"></line><line x1="10" y1="18" x2="10" y2="11"></line><line x1="14" y1="18" x2="14" y2="11"></line><line x1="18" y1="18" x2="18" y2="11"></line><polygon points="12 2 20 7 4 7"></polygon></svg>`;
    card1Title = "Revenue Case Identifier & Forum";
    card1Badge = "Revenue Register";
    caseNoLabel = "Revenue Case Number / Gata No.";
    yearLabel = "Year";
    filingLabel = "Filing Date";

    card2Icon = `<svg class="lucide lucide-users" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`;
    card2Title = "Revenue Litigants & Representation";
    card2Badge = "Parties";
    p1Label = 'Applicant / Plaintiff (वादी) <span class="required">*</span>';
    p2Label = 'Opposite Party / Gaon Sabha (प्रतिवादी) <span class="required">*</span>';

    specificsCardHtml = `
      <!-- Card 3: Revenue Act & Land Specifics -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              <svg class="lucide lucide-landmark" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="22" x2="21" y2="22"></line><line x1="6" y1="18" x2="6" y2="11"></line><line x1="10" y1="18" x2="10" y2="11"></line><line x1="14" y1="18" x2="14" y2="11"></line><line x1="18" y1="18" x2="18" y2="11"></line><polygon points="12 2 20 7 4 7"></polygon></svg>
            </div>
            <h3 class="hub-subcard-title">Revenue Act &amp; Land Specifics</h3>
          </div>
          <span class="hub-subcard-badge">Land Records</span>
        </div>
        <div class="hub-form-grid">
          <div class="form-group">
            <label>Revenue Act &amp; Section (UP Revenue Code) <span class="required">*</span></label>
            <select id="hubUpdate_revenueSection" class="${CASE_HUB_INPUT_CLASSES} w-full" onchange="handleCaseHubSelectChange(this, 'hubUpdate_revenueSectionCustom')">
              ${getRevenueSectionOptionsHtml(c.revenueActSection || c.actSection)}
            </select>
            <input type="text" id="hubUpdate_revenueSectionCustom" class="${CASE_HUB_INPUT_CLASSES} w-full mt-2" value="${escapeHtml(REVENUE_SECTION_OPTIONS.includes(c.revenueActSection || c.actSection) ? "" : c.revenueActSection || c.actSection || "")}" placeholder="Specify other revenue act / section..." style="${REVENUE_SECTION_OPTIONS.includes(c.revenueActSection || c.actSection) || !(c.revenueActSection || c.actSection) ? "display: none;" : "display: block;"}">
          </div>
          <div class="form-group">
            <label>Village / Mauja (मौजा / ग्राम) <span class="required">*</span></label>
            <input type="text" id="hubUpdate_village" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.villageMauja || c.village || "")}">
          </div>
          <div class="form-group">
            <label>Tehsil / Pargana (तहसील) <span class="required">*</span></label>
            <input type="text" id="hubUpdate_tehsil" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.parganaTehsil || c.tehsil || "")}">
          </div>
          <div class="form-group">
            <label>Gata / Khasra No. &amp; Khatauni <span class="required">*</span></label>
            <input type="text" id="hubUpdate_gataNo" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.gataKhataNo || c.gataNo || "")}">
          </div>
        </div>
      </div>
    `;
  } else if (cat === "misc") {
    card1Icon = `<svg class="lucide lucide-file-stack" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 2v4a2 2 0 0 0 2 2h4"></path><path d="M21 14V8a2 2 0 0 0-2-2h-3"></path><path d="M3 7v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3"></path><path d="M9 2h4a2 2 0 0 1 2 2v2"></path></svg>`;
    card1Title = "Misc Case Identifier & Forum";
    card1Badge = "Misc Civil";
    caseNoLabel = "Application / Case Number";
    yearLabel = "Year";
    filingLabel = "Filing Date";

    card2Icon = `<svg class="lucide lucide-users" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`;
    card2Title = "Litigants & Representation";
    card2Badge = "Parties";
    p1Label = 'Applicant / Appellant / Revisionist <span class="required">*</span>';
    p2Label = 'Opposite Party / Respondent <span class="required">*</span>';

    specificsCardHtml = `
      <!-- Card 3: Application & Original Suit Specifics -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              <svg class="lucide lucide-file-stack" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 2v4a2 2 0 0 0 2 2h4"></path><path d="M21 14V8a2 2 0 0 0-2-2h-3"></path><path d="M3 7v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3"></path><path d="M9 2h4a2 2 0 0 1 2 2v2"></path></svg>
            </div>
            <h3 class="hub-subcard-title">Application &amp; Original Suit Specifics</h3>
          </div>
          <span class="hub-subcard-badge">Proceedings</span>
        </div>
        <div class="hub-form-grid">
          <div class="form-group">
            <label>Original / Main Suit Number</label>
            <input type="text" id="hubUpdate_originalCase" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.originalCaseNumber || c.originalCase || "")}" placeholder="e.g. OS No. 45/2024">
          </div>
          <div class="form-group">
            <label>Proceeding / Application Type <span class="required">*</span></label>
            <select id="hubUpdate_proceedingType" class="${CASE_HUB_INPUT_CLASSES} w-full" onchange="handleCaseHubSelectChange(this, 'hubUpdate_proceedingTypeCustom')">
              ${getMiscCivilProceedingOptionsHtml(c.proceedingType)}
            </select>
            <input type="text" id="hubUpdate_proceedingTypeCustom" class="${CASE_HUB_INPUT_CLASSES} w-full mt-2" value="${escapeHtml(MISC_CIVIL_PROCEEDING_OPTIONS.includes(c.proceedingType) ? "" : c.proceedingType || "")}" placeholder="Specify other application / proceeding type..." style="${MISC_CIVIL_PROCEEDING_OPTIONS.includes(c.proceedingType) || !c.proceedingType ? "display: none;" : "display: block;"}">
          </div>
        </div>
      </div>
    `;
  } else if (cat === "bail") {
    card1Icon = `<svg class="lucide lucide-gavel" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m14 13-7.5 7.5c-.8.8-2.2.8-3 0s-.8-2.2 0-3L11 10"></path><path d="m16 16 6-6"></path><path d="m8 8 6-6"></path><path d="m9 7 8 8"></path><path d="m21 11-8-8"></path></svg>`;
    card1Title = "Bail Application Identifier & Court";
    card1Badge = "Bail Register";
    caseNoLabel = "Bail Application Number";
    yearLabel = "Year";
    filingLabel = "Filing Date";

    card2Icon = `<svg class="lucide lucide-users" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`;
    card2Title = "Applicant & State Parties";
    card2Badge = "Litigants";
    p1Label = 'Applicant / Accused (प्रार्थी / अभियुक्त) <span class="required">*</span>';
    p2Label = "Opposite Party (विपक्षी)";

    specificsCardHtml = `
      <!-- Card 3: Bail Proceeding & Crime Particulars -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              <svg class="lucide lucide-shield-alert" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M12 8v4"></path><path d="M12 16h.01"></path></svg>
            </div>
            <h3 class="hub-subcard-title">Bail Proceeding &amp; Crime Particulars</h3>
          </div>
          <span class="hub-subcard-badge">Bail Matter</span>
        </div>
        <div class="hub-form-grid">
          <div class="form-group">
            <label>Original ST / Crime / FIR Number</label>
            <input type="text" id="hubUpdate_originalCase" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.originalCaseNumber || c.originalCase || "")}" placeholder="e.g. Crime No. 210/2026">
          </div>
          <div class="form-group">
            <label>Application / Proceeding Type <span class="required">*</span></label>
            <select id="hubUpdate_proceedingType" class="${CASE_HUB_INPUT_CLASSES} w-full" onchange="handleCaseHubSelectChange(this, 'hubUpdate_proceedingTypeCustom')">
              ${getMiscCriminalProceedingOptionsHtml(c.proceedingType)}
            </select>
            <input type="text" id="hubUpdate_proceedingTypeCustom" class="${CASE_HUB_INPUT_CLASSES} w-full mt-2" value="${escapeHtml(MISC_CRIMINAL_PROCEEDING_OPTIONS.includes(c.proceedingType) ? "" : c.proceedingType || "")}" placeholder="Specify other application type..." style="${MISC_CRIMINAL_PROCEEDING_OPTIONS.includes(c.proceedingType) || !c.proceedingType ? "display: none;" : "display: block;"}">
          </div>
          <div class="form-group">
            <label>Police Station / Thana <span class="required">*</span></label>
            <select id="hubUpdate_policeStation" class="${CASE_HUB_INPUT_CLASSES} w-full" onchange="handleCaseHubSelectChange(this, 'hubUpdate_policeStationCustom')">
              ${getPoliceStationOptionsHtml(c.policeStation)}
            </select>
            <input type="text" id="hubUpdate_policeStationCustom" class="${CASE_HUB_INPUT_CLASSES} w-full mt-2" value="${escapeHtml(POLICE_STATION_OPTIONS.includes(c.policeStation) ? "" : c.policeStation || "")}" placeholder="Specify other Police Station name..." style="${POLICE_STATION_OPTIONS.includes(c.policeStation) || !c.policeStation ? "display: none;" : "display: block;"}">
          </div>
          <div class="form-group">
            <label>Statutory Sections (IPC / BNS)</label>
            <input type="text" id="hubUpdate_sections" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.crimeSection || c.sections || "")}">
          </div>
        </div>
      </div>
    `;
  } else if (cat === "cheque") {
    card1Icon = `<svg class="lucide lucide-receipt" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"></path><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path><path d="M12 17.5v-11"></path></svg>`;
    card1Title = "NI Act Case Identifier & Court";
    card1Badge = "Cheque 138";
    caseNoLabel = "Complaint / Case Number";
    yearLabel = "Year";
    filingLabel = "Filing Date";

    card2Icon = `<svg class="lucide lucide-users" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`;
    card2Title = "Complainant & Accused Parties";
    card2Badge = "Litigants";
    p1Label = 'Complainant Name (परिवादी) <span class="required">*</span>';
    p2Label = 'Accused / Opposite Party (विपक्षी / अभियुक्त) <span class="required">*</span>';

    specificsCardHtml = `
      <!-- Card 3: Dishonour & Jurisdiction Specifics -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              <svg class="lucide lucide-file-text" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            </div>
            <h3 class="hub-subcard-title">Dishonour &amp; Jurisdiction Specifics</h3>
          </div>
          <span class="hub-subcard-badge">NI Act</span>
        </div>
        <div class="hub-form-grid">
          <div class="form-group">
            <label>Complaint / Matter Type <span class="required">*</span></label>
            <select id="hubUpdate_complaintType" class="${CASE_HUB_INPUT_CLASSES} w-full" onchange="handleCaseHubSelectChange(this, 'hubUpdate_complaintTypeCustom')">
              ${getComplaintTypeOptionsHtml(c.complaintType)}
            </select>
            <input type="text" id="hubUpdate_complaintTypeCustom" class="${CASE_HUB_INPUT_CLASSES} w-full mt-2" value="${escapeHtml(COMPLAINT_TYPE_OPTIONS.includes(c.complaintType) ? "" : c.complaintType || "")}" placeholder="Specify other complaint type..." style="${COMPLAINT_TYPE_OPTIONS.includes(c.complaintType) || !c.complaintType ? "display: none;" : "display: block;"}">
          </div>
          <div class="form-group">
            <label>Police Station / Jurisdiction</label>
            <select id="hubUpdate_policeStation" class="${CASE_HUB_INPUT_CLASSES} w-full" onchange="handleCaseHubSelectChange(this, 'hubUpdate_policeStationCustom')">
              ${getPoliceStationOptionsHtml(c.policeStation)}
            </select>
            <input type="text" id="hubUpdate_policeStationCustom" class="${CASE_HUB_INPUT_CLASSES} w-full mt-2" value="${escapeHtml(POLICE_STATION_OPTIONS.includes(c.policeStation) ? "" : c.policeStation || "")}" placeholder="Specify other Police Station name..." style="${POLICE_STATION_OPTIONS.includes(c.policeStation) || !c.policeStation ? "display: none;" : "display: block;"}">
          </div>
          <div class="form-group full-width">
            <label>Sections &amp; Acts</label>
            <input type="text" id="hubUpdate_sections" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.sectionAct || c.sections || "")}">
          </div>
        </div>
      </div>
    `;
  }

  // Remarks dossier title & placeholder
  let remarksTitle = "Case Remarks & Dossier Notes";
  let remarksPlaceholder = "e.g. Co-parties: 1. Suresh Kumar, 2. Rajesh; Important proceeding notes, custody details, or next steps...";
  if (cat === "criminal") {
    remarksTitle = "Case Remarks & Co-Accused Dossier";
    remarksPlaceholder = "e.g. Co-accused: 1. Suresh Kumar, 2. Rajesh; In District Jail since 15-01-2026; Case Diary summoned...";
  } else if (cat === "family") {
    remarksTitle = "Case Remarks & Mediation Dossier";
    remarksPlaceholder = "e.g. In-laws named in petition: 1. Smt. Kamala, 2. Ram Lal; Referred to Mediation Center on 10/02/2026; Child custody dispute...";
  }

  container.innerHTML = `
    <!-- Top Selected Case Banner -->
    <div class="selected-case-banner">
        <div class="banner-info">
            <svg class="lucide lucide-check-circle-2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
            <div>
                <div class="banner-title">${escapeHtml(cNo)} <span class="hub-category-tag ${cat}">${escapeHtml(cat.toUpperCase())}</span></div>
                <div class="banner-subtitle">
                  <svg class="lucide lucide-user" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> ${escapeHtml(cName)} · 
                  <svg class="lucide lucide-landmark" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="22" x2="21" y2="22"></line><line x1="6" y1="18" x2="6" y2="11"></line><line x1="10" y1="18" x2="10" y2="11"></line><line x1="14" y1="18" x2="14" y2="11"></line><line x1="18" y1="18" x2="18" y2="11"></line><polygon points="12 2 20 7 4 7"></polygon></svg> ${escapeHtml(c.courtName || c.criminalCourtName || "District Court")}
                </div>
            </div>
        </div>
        <button type="button" class="btn-action btn-ghost btn-sm" onclick="clearCaseHubUpdateSelection()">
            <svg class="lucide lucide-x" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg> Close
        </button>
    </div>

    <form id="caseHubUpdateForm" onsubmit="handleCaseHubUpdateSubmit(event)">
      <!-- Card 1: Case Identity & Filing Forum -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              ${card1Icon}
            </div>
            <h3 class="hub-subcard-title">${card1Title}</h3>
          </div>
          <span class="hub-subcard-badge">${card1Badge}</span>
        </div>
        <div class="hub-form-grid">
          <div class="form-group">
            <label>${caseNoLabel} <span class="required">*</span></label>
            <input type="text" id="hubUpdate_caseNo" class="${CASE_HUB_INPUT_CLASSES} w-full opacity-80 cursor-not-allowed" value="${escapeHtml(cNo)}" readonly>
          </div>
          <div class="form-group">
            <label>${yearLabel} <span class="required">*</span></label>
            <input type="number" id="hubUpdate_year" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(cYear)}">
          </div>
          <div class="form-group">
            <label>${filingLabel}</label>
            <input type="date" id="hubUpdate_filingDate" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(filingDate)}">
          </div>
          <div class="form-group">
            <label>Court Name <span class="required">*</span></label>
            <div class="court-input-wrapper">
              <select id="hubUpdate_court" class="${CASE_HUB_INPUT_CLASSES} flex-1">${courtOptions}</select>
              ${miniCourtBtnHtml}
            </div>
          </div>
        </div>
      </div>

      <!-- Card 2: Litigants & Client Representation -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              ${card2Icon}
            </div>
            <h3 class="hub-subcard-title">${card2Title}</h3>
          </div>
          <span class="hub-subcard-badge">${card2Badge}</span>
        </div>
        <div class="hub-form-grid">
          <div class="form-group">
            <label>${p1Label}</label>
            <input type="text" id="hubUpdate_plaintiff" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.plaintiff || c.firstParty || c.petitioner || c.applicant || c.complainant || (cat === "criminal" ? "State of U.P." : ""))}" required>
          </div>
          <div class="form-group">
            <label>${p2Label}</label>
            <input type="text" id="hubUpdate_defendant" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.defendant || c.accusedName || c.respondent || c.oppositeParty || "")}" required>
          </div>
          <div class="form-group">
            <label>Client Name Represented</label>
            <input type="text" id="hubUpdate_clientName" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.clientName || c.client_name || "")}" placeholder="Enter Client Name">
          </div>
          <div class="form-group">
            <label>Client Number</label>
            <input type="tel" id="hubUpdate_clientPhone" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.clientNumber || c.criminalClientNumber || c.clientPhone || "")}" placeholder="Enter Client Phone Number">
          </div>
        </div>
      </div>

      ${specificsCardHtml}

      <!-- Card 4: Hearing Schedule & Case Lifecycle -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              <svg class="lucide lucide-calendar-clock" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"></path><path d="M16 2v4"></path><path d="M8 2v4"></path><path d="M3 10h18"></path><circle cx="16" cy="16" r="6"></circle><polyline points="16 14 16 16 18 17"></polyline></svg>
            </div>
            <h3 class="hub-subcard-title">Hearing Schedule &amp; Case Lifecycle</h3>
          </div>
          <span class="hub-subcard-badge">Proceedings</span>
        </div>
        <div class="hub-form-grid">
          <div class="form-group">
            <label>Case Status (स्थिति)</label>
            <select id="hubUpdate_status" class="${CASE_HUB_INPUT_CLASSES} w-full">
              <option value="Pending" ${selectedStatus === "Pending" ? "selected" : ""}>⏳ Pending (Active)</option>
              <option value="Disposed" ${selectedStatus === "Disposed" ? "selected" : ""}>Disposed Off (निस्तारित)</option>
              <option value="Decided" ${selectedStatus === "Decided" ? "selected" : ""}>Decided (निस्तारित / फैसला)</option>
              <option value="Acquitted" ${selectedStatus === "Acquitted" ? "selected" : ""}>Acquitted (दोषमुक्त)</option>
              <option value="Convicted" ${selectedStatus === "Convicted" ? "selected" : ""}>Convicted (दोषसिद्ध)</option>
              <option value="Dismissed" ${selectedStatus === "Dismissed" ? "selected" : ""}>Dismissed (खारिज)</option>
              <option value="Decreed" ${selectedStatus === "Decreed" ? "selected" : ""}>Decreed (डिक्री)</option>
            </select>
          </div>
          <div class="form-group">
            <label>Next Hearing Date</label>
            <input type="date" id="hubUpdate_nextHearing" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${c.nextHearing && c.nextHearing !== "—" ? c.nextHearing : ""}">
          </div>
          <div class="form-group full-width">
            <label>Hearing Stage / Purpose</label>
            <input type="text" id="hubUpdate_process" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.hearingProcess || c.process || "")}" placeholder="e.g. Arguments, Evidence, Framing Charge">
          </div>
        </div>
      </div>

      <!-- Card 5: Case Remarks & Dossier -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              <svg class="lucide lucide-clipboard-list" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="M12 11h4"></path><path d="M12 16h4"></path><path d="M8 11h.01"></path><path d="M8 16h.01"></path></svg>
            </div>
            <h3 class="hub-subcard-title">${remarksTitle}</h3>
          </div>
          <span class="hub-subcard-badge">Dossier</span>
        </div>
        <div class="form-group full-width">
          <label>Case Remarks &amp; Co-Accused / Custody Details</label>
          ${renderCaseHubRemarkChipsHtml("hubUpdate_remarks", cat)}
          <textarea id="hubUpdate_remarks" class="${CASE_HUB_INPUT_CLASSES} w-full remarks-textarea" rows="3" placeholder="${escapeHtml(remarksPlaceholder)}">${escapeHtml(c.remark || c.remarks || "")}</textarea>
        </div>
      </div>

      <!-- Card 6: Digital Documents & Electronic Records -->
      <div class="hub-subcard">
        <div class="hub-subcard-header">
          <div class="hub-subcard-title-wrap">
            <div class="hub-subcard-icon">
              <svg class="lucide lucide-link-2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 17H7A5 5 0 0 1 7 7h2"></path><path d="M15 7h2a5 5 0 1 1 0 10h-2"></path><line x1="8" y1="12" x2="16" y2="12"></line></svg>
            </div>
            <h3 class="hub-subcard-title">Documents Link</h3>
          </div>
          <span class="hub-subcard-badge">Cloud Vault</span>
        </div>
        <div class="form-group full-width">
          <label>Document / Order Sheet Link (Drive/PDF URL)</label>
          <input type="url" id="hubUpdate_docLink" class="${CASE_HUB_INPUT_CLASSES} w-full" value="${escapeHtml(c.docLink || "")}" placeholder="https://drive.google.com/... or document URL">
        </div>
      </div>

      <!-- Form Actions Bar -->
      <div class="form-actions-bar">
        <button type="button" class="btn-action btn-ghost" onclick="clearCaseHubUpdateSelection()">
          Cancel
        </button>
        <button type="submit" class="btn-action btn-primary" id="hubUpdateSubmitBtn">
          <svg class="lucide lucide-check-circle-2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
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
          
      </div>`;
  }
}
window.clearCaseHubUpdateSelection = clearCaseHubUpdateSelection;

async function handleCaseHubUpdateSubmit(e) {
  e.preventDefault();
  if (!activeUpdateCaseObj) return;

  const cat = normalizeCaseCategory(activeUpdateCaseObj.caseType);
  const caseNo = document.getElementById("hubUpdate_caseNo")?.value?.trim();
  const year = document.getElementById("hubUpdate_year")?.value?.trim();
  const filingDate = document.getElementById("hubUpdate_filingDate")?.value?.trim();
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
    if (year) {
      activeUpdateCaseObj.year = year;
      activeUpdateCaseObj.crimeYear = year;
      activeUpdateCaseObj.caseYear = year;
    }
    if (filingDate) {
      activeUpdateCaseObj.filingDate = filingDate;
    }
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
        '<svg class="lucide lucide-check-circle-2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg> <span>Save Case Updates</span>';
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
                <div class="banner-subtitle"><iconify-icon icon="lucide:user"></iconify-icon> ${escapeHtml(cName)} · <iconify-icon icon="lucide:landmark"></iconify-icon> ${escapeHtml(court)}</div>
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

        <div class="form-actions-bar">
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
  setTimeout(updateCaseHubSlidingBg, 25);
  setTimeout(updateCaseHubSlidingBg, 120);

  // Setup ResizeObserver on container to ensure smooth positioning when tab unhides
  const container = document.querySelector(".case-hub-wrapper .segmented-control");
  if (container && window.ResizeObserver && !container.__ro_attached) {
    const ro = new ResizeObserver(() => {
      if (container.offsetWidth > 0) updateCaseHubSlidingBg();
    });
    ro.observe(container);
    container.__ro_attached = true;
  }
}
window.initManageTab = initManageTab;
