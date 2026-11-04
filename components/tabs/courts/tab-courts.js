window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs["courts"] = /*html*/ `
<div class="section-header-row">
  <div class="section-title-box">
    <div class="section-icon-badge"><i class="fa-solid fa-building-columns"></i></div>
    <div class="section-title-text-group">
      <h3>Manage Courts Directory</h3>
      <span id="courtsTotalCountBadge" class="case-badge civil">Loading Courts...</span>
    </div>
  </div>
  <div class="court-header-actions">
    <button
      type="button"
      class="secondary-btn court-refresh-btn"
      onclick="syncAllCourtsFromDatabase()"
      title="Sync all courts from database"
    >
      <i class="fa-solid fa-arrows-rotate"></i>
      <span>Sync Courts</span>
    </button>
    <button type="button" id="openAddCourtBtn" class="court-header-add-btn" onclick="openAddCourtModal()">
      <i class="fa-solid fa-plus"></i>
      <span>Add Court</span>
    </button>
  </div>
</div>

<!-- Court Directory Search Bar (Top of Table) -->
<div class="court-table-toolbar court-table-search-bar">
  <div class="search-field-box court-search-box">
    <span class="search-field-prefix-icon"><i class="fa-solid fa-magnifying-glass"></i></span>
    <input
      type="text"
      id="courtSearchInput"
      placeholder="Search configured courts by name, code or cadre..."
      oninput="filterCourtsTable(this.value)"
      enterkeyhint="search"
      autocomplete="off"
    />
  </div>
</div>

<div id="courtsCardsGrid" class="courts-cards-grid">
  <div class="courts-cards-empty">No courts configured yet. Add a court using the form above.</div>
</div>

<!-- ================= ADD COURT MODAL ================= -->
<div
  id="addCourtModal"
  class="court-modal-overlay hidden"
  role="dialog"
  aria-modal="true"
  aria-labelledby="addCourtModalTitle"
>
  <div class="court-modal-card">
    <div class="court-modal-header">
      <div class="court-modal-header-info">
        <div class="court-modal-icon">
          <i class="fa-solid fa-landmark"></i>
        </div>
        <div>
          <h3 id="addCourtModalTitle">Add New Court</h3>
          <p class="court-modal-subtitle">
            Configure court complexes, bench rooms, and judicial forums
          </p>
        </div>
      </div>
      <button
        type="button"
        id="closeAddCourtModalBtn"
        class="court-modal-close-btn"
        aria-label="Close"
        onclick="closeAddCourtModal()"
      >
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>

    <div class="court-modal-body">
      <!-- 1. Court Name (Required) -->
      <div class="court-modal-field">
        <label for="courtInput">Court / Judicial Forum Name <span class="required-star">*</span></label>
        <div class="court-input-action-row" style="margin: 0; width: 100%">
          <div class="search-field-box" style="width: 100%">
            <span class="search-field-prefix-icon"><i class="fa-solid fa-landmark"></i></span>
            <input
              type="text"
              id="courtInput"
              placeholder="e.g. Add. Civil Judge Senior Division Court No. 5"
              autocomplete="off"
            />
          </div>
        </div>
      </div>

      <!-- 2. Two-Column Row: Short Code & Cadre / Forum -->
      <div class="court-modal-grid-2">
        <div class="court-modal-field">
          <label for="courtShortCodeInput">Short Code / Acronym</label>
          <div class="search-field-box" style="width: 100%">
            <span class="search-field-prefix-icon"><i class="fa-solid fa-hashtag"></i></span>
            <input
              type="text"
              id="courtShortCodeInput"
              placeholder="e.g. ACJM-5, ADJ-01"
              autocomplete="off"
            />
          </div>
        </div>

        <div class="court-modal-field">
          <label for="courtCadreSelect">Cadre / Forum</label>
          <div class="search-field-box" style="width: 100%">
            <span class="search-field-prefix-icon"><i class="fa-solid fa-building-columns"></i></span>
            <select id="courtCadreSelect" class="court-modal-select">
              <option value="Senior Division / FTC">Senior Division / FTC</option>
              <option value="Junior Division / FTC">Junior Division / FTC</option>
              <option value="District &amp; Sessions Court">District &amp; Sessions Court</option>
              <option value="Addl. District &amp; Sessions Court">Addl. District &amp; Sessions Court</option>
              <option value="Family Court">Family Court</option>
              <option value="Commercial Court">Commercial Court</option>
              <option value="Special Courts (POCSO / NDPS / CBI)">Special Courts (POCSO / NDPS / CBI)</option>
              <option value="Motor Accident Claims Tribunal (MACT)">MACT Tribunal</option>
              <option value="Revenue / Collectorate">Revenue / Collectorate</option>
              <option value="High Court">High Court</option>
              <option value="General" selected>General</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 3. Criminal Jurisdiction Title (Optional) -->
      <div class="court-modal-field">
        <label for="courtCriminalTitleInput">Criminal Jurisdiction Title <span class="court-modal-opt-label">(Optional - For Dual Jurisdiction Courts)</span></label>
        <div class="search-field-box" style="width: 100%">
          <span class="search-field-prefix-icon"><i class="fa-solid fa-scale-balanced"></i></span>
          <input
            type="text"
            id="courtCriminalTitleInput"
            placeholder="e.g. ACJM-5 / Addl. Chief Judicial Magistrate 5th"
            autocomplete="off"
          />
        </div>
      </div>

      <div class="court-modal-notice">
        <i class="fa-solid fa-circle-info" style="margin-top: 2px"></i>
        <span>
          Configure court short codes for compact badges and forum cadres for case filtering.
        </span>
      </div>

      <div id="addCourtErrorMsg" class="court-modal-error hidden"></div>
    </div>

    <div class="court-modal-footer">
      <button type="button" class="court-btn-cancel" onclick="closeAddCourtModal()">Cancel</button>
      <button
        type="button"
        id="saveCourtBtn"
        class="court-btn-primary"
      >
        <i class="fa-solid fa-paper-plane"></i>
        <span>Submit Court</span>
      </button>
    </div>
  </div>
</div>

<!-- ================= EDIT COURT MODAL ================= -->
<div
  id="editCourtModal"
  class="court-modal-overlay hidden"
  role="dialog"
  aria-modal="true"
  aria-labelledby="editCourtModalTitle"
>
  <div class="court-modal-card">
    <div class="court-modal-header">
      <div class="court-modal-header-info">
        <div class="court-modal-icon">
          <i class="fa-solid fa-pen-to-square"></i>
        </div>
        <div>
          <h3 id="editCourtModalTitle">Edit Court Name</h3>
          <p id="editCourtModalSubtitle" class="court-modal-subtitle">
            Rename this judicial forum and sync all associated case filings.
          </p>
        </div>
      </div>
      <button
        type="button"
        id="closeEditCourtModalBtn"
        class="court-modal-close-btn"
        aria-label="Close"
        onclick="closeEditCourtModal()"
      >
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>

    <div class="court-modal-body">
      <input type="hidden" id="editCourtOriginalName" value="" />
      
      <!-- 1. Court Name (Required) -->
      <div class="court-modal-field">
        <label for="editCourtNameInput">Court / Judicial Forum Name <span class="required-star">*</span></label>
        <div class="court-input-action-row" style="margin: 0; width: 100%">
          <div class="search-field-box" style="width: 100%">
            <span class="search-field-prefix-icon"><i class="fa-solid fa-landmark"></i></span>
            <input
              type="text"
              id="editCourtNameInput"
              placeholder="Enter updated court name..."
              autocomplete="off"
            />
          </div>
        </div>
      </div>

      <!-- 2. Two-Column Row: Short Code & Cadre / Forum -->
      <div class="court-modal-grid-2">
        <div class="court-modal-field">
          <label for="editCourtShortCodeInput">Short Code / Acronym</label>
          <div class="search-field-box" style="width: 100%">
            <span class="search-field-prefix-icon"><i class="fa-solid fa-hashtag"></i></span>
            <input
              type="text"
              id="editCourtShortCodeInput"
              placeholder="e.g. ACJM-5, ADJ-01"
              autocomplete="off"
            />
          </div>
        </div>

        <div class="court-modal-field">
          <label for="editCourtCadreSelect">Cadre / Forum</label>
          <div class="search-field-box" style="width: 100%">
            <span class="search-field-prefix-icon"><i class="fa-solid fa-building-columns"></i></span>
            <select id="editCourtCadreSelect" class="court-modal-select">
              <option value="Senior Division / FTC">Senior Division / FTC</option>
              <option value="Junior Division / FTC">Junior Division / FTC</option>
              <option value="District &amp; Sessions Court">District &amp; Sessions Court</option>
              <option value="Addl. District &amp; Sessions Court">Addl. District &amp; Sessions Court</option>
              <option value="Family Court">Family Court</option>
              <option value="Commercial Court">Commercial Court</option>
              <option value="Special Courts (POCSO / NDPS / CBI)">Special Courts (POCSO / NDPS / CBI)</option>
              <option value="Motor Accident Claims Tribunal (MACT)">MACT Tribunal</option>
              <option value="Revenue / Collectorate">Revenue / Collectorate</option>
              <option value="High Court">High Court</option>
              <option value="General" selected>General</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 3. Criminal Jurisdiction Title (Optional) -->
      <div class="court-modal-field">
        <label for="editCourtCriminalTitleInput">Criminal Jurisdiction Title <span class="court-modal-opt-label">(Optional)</span></label>
        <div class="search-field-box" style="width: 100%">
          <span class="search-field-prefix-icon"><i class="fa-solid fa-scale-balanced"></i></span>
          <input
            type="text"
            id="editCourtCriminalTitleInput"
            placeholder="e.g. ACJM-5 / Addl. Chief Judicial Magistrate 5th"
            autocomplete="off"
          />
        </div>
      </div>

      <div id="editCourtWarningNotice" class="court-modal-notice">
        <i class="fa-solid fa-circle-info" style="margin-top: 2px"></i>
        <span id="editCourtNoticeText">
          Renaming will automatically update all associated case filings across all tables.
        </span>
      </div>

      <div id="editCourtErrorMsg" class="court-modal-error hidden"></div>
    </div>

    <div class="court-modal-footer">
      <button type="button" class="court-btn-cancel" onclick="closeEditCourtModal()">Cancel</button>
      <button
        type="button"
        id="saveEditCourtBtn"
        class="court-btn-primary"
        onclick="confirmSaveEditedCourt()"
      >
        <i class="fa-solid fa-floppy-disk"></i>
        <span id="saveEditCourtBtnText">Save Changes</span>
      </button>
    </div>
  </div>
</div>

<!-- ================= DELETE COURT MODAL ================= -->
<div
  id="deleteCourtModal"
  class="court-modal-overlay hidden"
  role="dialog"
  aria-modal="true"
  aria-labelledby="deleteCourtModalTitle"
>
  <div class="court-modal-card court-modal-card-danger">
    <div class="court-modal-header">
      <div class="court-modal-header-info">
        <div class="court-modal-icon court-modal-icon-danger">
          <i class="fa-solid fa-triangle-exclamation"></i>
        </div>
        <div>
          <h3 id="deleteCourtModalTitle">Delete Court</h3>
          <p class="court-modal-subtitle">
            Permanent removal of judicial forum from system
          </p>
        </div>
      </div>
      <button
        type="button"
        id="closeDeleteCourtModalBtn"
        class="court-modal-close-btn"
        aria-label="Close"
        onclick="closeDeleteCourtModal()"
      >
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>

    <div class="court-modal-body">
      <input type="hidden" id="deleteCourtTargetName" value="" />
      <input type="hidden" id="deleteCourtActiveCount" value="0" />

      <p id="deleteCourtConfirmPrompt" class="court-modal-prompt">
        Are you sure you want to remove <strong id="deleteCourtDisplayName" style="color: var(--courts-accent);">this court</strong> from the directory?
      </p>

      <div id="deleteCourtActiveCasesNotice" class="court-modal-notice court-modal-notice-danger hidden">
        <i class="fa-solid fa-triangle-exclamation" style="margin-top: 2px"></i>
        <span id="deleteCourtCasesNoticeText"></span>
      </div>

      <div id="deleteCourtErrorMsg" class="court-modal-error hidden"></div>
    </div>

    <div class="court-modal-footer">
      <button type="button" class="court-btn-cancel" onclick="closeDeleteCourtModal()">Cancel</button>
      <button
        type="button"
        id="confirmDeleteCourtBtn"
        class="court-btn-danger"
        onclick="executeDeleteCourtConfirm()"
      >
        <i class="fa-solid fa-trash"></i>
        <span id="confirmDeleteCourtBtnText">Delete Court</span>
      </button>
    </div>
  </div>
</div>
`;

let currentCourtsPage = 1;
const COURTS_PER_PAGE = 10;

function getCourtsList() {
  if (typeof window !== 'undefined' && Array.isArray(window.courts) && window.courts.length > 0) {
    return window.courts;
  }
  if (typeof courts !== 'undefined' && Array.isArray(courts) && courts.length > 0) {
    return courts;
  }
  return (typeof window !== 'undefined' && Array.isArray(window.courts)) ? window.courts : (typeof courts !== 'undefined' && Array.isArray(courts) ? courts : []);
}

function getCourtsAllCaseRecords() {
  if (typeof window !== 'undefined' && Array.isArray(window.allCaseRecords) && window.allCaseRecords.length > 0) {
    return window.allCaseRecords;
  }
  if (typeof allCaseRecords !== 'undefined' && Array.isArray(allCaseRecords) && allCaseRecords.length > 0) {
    return allCaseRecords;
  }
  return (typeof window !== 'undefined' && Array.isArray(window.allCaseRecords)) ? window.allCaseRecords : (typeof allCaseRecords !== 'undefined' && Array.isArray(allCaseRecords) ? allCaseRecords : []);
}

function goToCourtsPage(page) {
  currentCourtsPage = page;
  renderCourtsTable();
}
window.goToCourtsPage = goToCourtsPage;

function getEnrichedCourtRecord(courtName) {
  const list = (typeof window !== 'undefined' && Array.isArray(window.courtsList) && window.courtsList.length > 0)
    ? window.courtsList
    : (typeof courtsList !== 'undefined' && Array.isArray(courtsList) ? courtsList : (typeof window !== 'undefined' && window.auditedCourtsData ? window.auditedCourtsData : []));

  const lower = (courtName || '').trim().toLowerCase();
  const match = list.find(c => (c.court_name || '').trim().toLowerCase() === lower);
  if (match) return match;

  return {
    court_name: courtName,
    short_code: (courtName || '').substring(0, 10),
    civil_title: courtName,
    criminal_title: courtName,
    cadre: 'General',
    status: 'ACTIVE',
    remarks: ''
  };
}

function renderCourtsTable(filterQuery = "") {
  // Ensure DOM is bound if not already
  bindCourtsTabEvents();
  const countBadge = document.getElementById("courtsTotalCountBadge");
  const searchInput = document.getElementById("courtSearchInput");
  const query = (
    filterQuery !== undefined && filterQuery !== null && filterQuery !== ""
      ? filterQuery
      : (searchInput ? searchInput.value : "") || ""
  )
    .trim()
    .toLowerCase();

  const deletedSet = typeof getDeletedCourtsSet === "function" ? getDeletedCourtsSet() : new Set();
  const seen = new Set();
  const allCourtsList = [];
  const rawCourts = getCourtsList();

  rawCourts.forEach((c) => {
    const t = (c || "").trim();
    if (t && !deletedSet.has(t.toLowerCase()) && !seen.has(t.toLowerCase())) {
      seen.add(t.toLowerCase());
      allCourtsList.push(t);
    }
  });

  allCourtsList.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

  const filteredCourts = query
    ? allCourtsList.filter((c) => {
        const rec = getEnrichedCourtRecord(c);
        return (
          c.toLowerCase().includes(query) ||
          (rec.short_code && rec.short_code.toLowerCase().includes(query)) ||
          (rec.civil_title && rec.civil_title.toLowerCase().includes(query)) ||
          (rec.criminal_title && rec.criminal_title.toLowerCase().includes(query)) ||
          (rec.cadre && rec.cadre.toLowerCase().includes(query)) ||
          (rec.status && rec.status.toLowerCase().includes(query))
        );
      })
    : allCourtsList;

  if (countBadge) {
    if (query) {
      countBadge.textContent = `${filteredCourts.length} of ${allCourtsList.length} Courts`;
    } else {
      countBadge.textContent = `${allCourtsList.length} Court${allCourtsList.length === 1 ? "" : "s"} Configured`;
    }
  }

  const grid = document.getElementById("courtsCardsGrid");
  if (!grid) return;

  if (filteredCourts.length === 0) {
    grid.innerHTML = `<div class="courts-cards-empty">${query ? `No courts matching "${escapeHtml(query)}".` : "No courts configured yet. Add a court using the form above."}</div>`;
    return;
  }

  const totalPages = Math.ceil(filteredCourts.length / COURTS_PER_PAGE) || 1;
  if (currentCourtsPage > totalPages) {
    currentCourtsPage = totalPages;
  }
  if (currentCourtsPage < 1) {
    currentCourtsPage = 1;
  }

  const startIndex = (currentCourtsPage - 1) * COURTS_PER_PAGE;
  const endIndex = Math.min(startIndex + COURTS_PER_PAGE, filteredCourts.length);
  const pagedCourts = filteredCourts.slice(startIndex, endIndex);

  // =========================================================
  // Build iOS Settings-Style Grouped Table
  // Row Line 1: [Court Title]
  // Row Line 2: [Cases Assigned Badge] (Left) ... [Toggle Arrow] (Right)
  // Expanded Drawer: Serial, Cadre / Forum, Short Code + Actions
  // =========================================================
  let rowsHTML = "";
  pagedCourts.forEach((court, pIndex) => {
    const actualIndex = startIndex + pIndex;
    const casesInCourt = getCourtsAllCaseRecords().filter(
      (c) =>
        (c.courtName || "").trim().toLowerCase() === court.trim().toLowerCase() ||
        (c.criminalCourtName || "").trim().toLowerCase() === court.trim().toLowerCase(),
    );
    const count = casesInCourt.length;
    const rec = getEnrichedCourtRecord(court);

    // Auto-expand if the search matches a detail inside the drawer
    const isDetailMatch = Boolean(query && (
      (rec.cadre && rec.cadre.toLowerCase().includes(query)) ||
      (rec.criminal_title && rec.criminal_title.toLowerCase().includes(query)) ||
      (rec.short_code && rec.short_code.toLowerCase().includes(query))
    ));

    const hasDualName = rec.civil_title && rec.criminal_title && rec.civil_title.trim().toLowerCase() !== rec.criminal_title.trim().toLowerCase();

    rowsHTML += `
      <div class="ios-court-row ${isDetailMatch ? 'expanded' : ''}" id="court-row-${actualIndex}" data-court="${escapeHtml(court)}">
        <!-- Top Section: Header & Metadata Tags -->
        <button type="button" 
                class="ios-court-summary" 
                id="court-header-${actualIndex}"
                aria-expanded="${isDetailMatch ? 'true' : 'false'}" 
                aria-controls="court-body-${actualIndex}"
                onclick="toggleCourtRow(${actualIndex})">
          <div class="ios-summary-content">
            <h4 class="court-card-title">${escapeHtml(rec.civil_title || court)}</h4>
            
            <div class="court-summary-tags">
              <span class="court-tag tag-serial header-desktop-tag" title="Court Index">
                <span class="serial-hash">#</span><span class="serial-val">${actualIndex + 1}</span>
              </span>
              <span class="court-tag tag-cadre header-desktop-tag" title="Cadre / Forum">
                <i class="fa-solid fa-building-columns"></i>
                <span>${escapeHtml(rec.cadre || 'General')}</span>
              </span>
              ${rec.short_code ? `
              <span class="court-tag tag-code court-code-chip-wrap header-desktop-tag" title="Short Code">
                <i class="fa-solid fa-hashtag"></i>
                <span class="court-code-chip-val">${escapeHtml(rec.short_code)}</span>
              </span>
              ` : ''}
              <span class="court-tag tag-cases court-card-cases-badge ${count > 0 ? 'has-cases' : 'zero-cases'}" title="Assigned Cases">
                <i class="fa-solid fa-layer-group"></i>
                <span class="cases-text">${count} Case${count === 1 ? '' : 's'} Assigned</span>
              </span>
            </div>
          </div>

          <div class="ios-toggle-arrow" id="court-toggle-${actualIndex}" aria-hidden="true">
            <i class="fa-solid fa-chevron-down"></i>
          </div>
        </button>

        <!-- Collapsible Details Body -->
        <div class="court-card-body" id="court-body-${actualIndex}">
          <div class="court-card-divider"></div>

          <!-- Details Section (Clean Key-Value Typography, No Pills) -->
          <div class="court-card-details">
            <div class="court-detail-item">
              <span class="court-detail-label">Serial</span>
              <span class="court-detail-value serial-val">#${actualIndex + 1}</span>
            </div>
            <div class="court-detail-item">
              <span class="court-detail-label">Cadre / Forum</span>
              <span class="court-detail-value">${escapeHtml(rec.cadre || 'General')}</span>
            </div>
            ${rec.short_code ? `
            <div class="court-detail-item">
              <span class="court-detail-label">Short Code</span>
              <span class="court-detail-value court-code-chip-val">${escapeHtml(rec.short_code)}</span>
            </div>
            ` : ''}
          </div>

          ${hasDualName ? `
          <!-- Middle Section: Criminal Jurisdiction Card -->
          <div class="court-middle-section">
            <div class="court-criminal-card">
              <div class="court-criminal-icon-box">
                <i class="fa-solid fa-scale-balanced"></i>
              </div>
              <div class="court-criminal-info">
                <h5 class="court-criminal-label">Criminal Jurisdiction Title</h5>
                <p class="court-criminal-text criminal-val">${escapeHtml(rec.criminal_title)}</p>
              </div>
            </div>
          </div>
          ` : ''}

          <!-- Bottom Section: Actions Toolbar -->
          <div class="court-card-footer court-card-actions action-buttons">
            <!-- Destructive Action (Pushed to Far Left) -->
            <button type="button" class="btn btn-delete delete-court court-action-btn delete-btn" data-court="${escapeHtml(court)}" data-count="${count}" title="Delete this court">
              <i class="fa-regular fa-trash-can"></i>
              <span>Delete</span>
            </button>

            <!-- Secondary Action (Edit) -->
            <button type="button" class="btn btn-edit edit-court court-action-btn edit-btn" data-court="${escapeHtml(court)}" data-count="${count}" title="Edit court name">
              <i class="fa-solid fa-pen"></i>
              <span>Edit</span>
            </button>

            <!-- Refined Primary Action (View Cases) -->
            ${count > 0 ? `
            <button type="button" class="btn court-action-btn view-cases-btn view-court-cases" data-court="${escapeHtml(court)}" title="View all cases in this court">
              <i class="fa-regular fa-folder-open"></i>
              <span>View Cases</span>
            </button>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  });

  // =========================================================
  // Build pagination first
  // =========================================================
  let paginationHTML = `
    <div class="courts-pagination">
      <div class="courts-pagination-info">
        Showing ${startIndex + 1} to ${endIndex} of ${filteredCourts.length} courts
      </div>
      <div class="courts-pagination-controls">
        <button type="button" class="court-page-btn" ${currentCourtsPage <= 1 ? "disabled" : ""} onclick="goToCourtsPage(${currentCourtsPage - 1})">
          <i class="fa-solid fa-chevron-left"></i> Prev
        </button>
  `;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentCourtsPage - 1 && i <= currentCourtsPage + 1)) {
      paginationHTML += `
        <button type="button" class="court-page-btn ${i === currentCourtsPage ? "active" : ""}" onclick="goToCourtsPage(${i})">
          ${i}
        </button>
      `;
    } else if (i === currentCourtsPage - 2 || i === currentCourtsPage + 2) {
      paginationHTML += `<span class="court-page-dots" style="padding: 0 4px; color: var(--courts-text-muted);">…</span>`;
    }
  }

  paginationHTML += `
        <button type="button" class="court-page-btn" ${currentCourtsPage >= totalPages ? "disabled" : ""} onclick="goToCourtsPage(${currentCourtsPage + 1})">
          Next <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  `;

  // Wrap inside iOS Settings Grouped Table Container (Seamless Zero-Gap Pagination)
  const tableHTML = `
    <div class="courts-card-wrapper ios-courts-wrapper">
      <div class="ios-courts-group" role="region" aria-label="Courts Directory">
        ${rowsHTML}
        ${paginationHTML}
      </div>
    </div>
  `;

  grid.innerHTML = tableHTML;

  // Attach button event listeners with e.stopPropagation()
  grid.querySelectorAll(".view-court-cases").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const courtName = btn.getAttribute("data-court");
      if (typeof showTab === "function") {
        showTab("all");
      }
      setTimeout(() => {
        const allSearchInput = document.getElementById("allSearchInput") || document.getElementById("searchInput");
        if (allSearchInput) {
          allSearchInput.value = courtName;
          if (typeof filterUnifiedTable === "function") {
            filterUnifiedTable(courtName);
          } else if (typeof filterAllCasesTable === "function") {
            filterAllCasesTable(courtName);
          }
        }
      }, 150);
    });
  });

  grid.querySelectorAll(".edit-court").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const courtName = btn.getAttribute("data-court");
      const count = parseInt(btn.getAttribute("data-count")) || 0;
      openEditCourtModal(courtName, count);
    });
  });

  grid.querySelectorAll(".delete-court").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const courtName = btn.getAttribute("data-court");
      const count = parseInt(btn.getAttribute("data-count")) || 0;
      openDeleteCourtModal(courtName, count);
    });
  });
}

function toggleCourtRow(index) {
  const row = document.getElementById(`court-row-${index}`);
  if (!row) return;

  const isExpanded = row.classList.contains("expanded");

  // Single-open accordion: close other open rows in this grouped table
  const group = row.closest(".ios-courts-group");
  if (group) {
    group.querySelectorAll(".ios-court-row.expanded").forEach((openRow) => {
      if (openRow !== row) {
        openRow.classList.remove("expanded");
        const btn = openRow.querySelector(".ios-court-summary");
        if (btn) btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  if (isExpanded) {
    row.classList.remove("expanded");
    const btn = row.querySelector(".ios-court-summary");
    if (btn) btn.setAttribute("aria-expanded", "false");
  } else {
    row.classList.add("expanded");
    const btn = row.querySelector(".ios-court-summary");
    if (btn) btn.setAttribute("aria-expanded", "true");
  }
}
if (typeof toggleCourtRow !== "undefined") window.toggleCourtRow = toggleCourtRow;


function generateSuggestedShortCode(name) {
  const str = (name || '').trim();
  if (!str) return '';

  // Specific common patterns
  const lower = str.toLowerCase();
  const numMatch = str.match(/(\d+)/);
  const num = numMatch ? `-${numMatch[1]}` : '';

  if (lower.includes('commercial')) return `COMM${num}`;
  if (lower.includes('family')) return `FC${num}`;
  if (lower.includes('senior division') || lower.includes('acjm')) return `ACJM${num || '-FTC'}`;
  if (lower.includes('junior division') || lower.includes('ftc')) return `JM${num || '-FTC'}`;
  if (lower.includes('district') && lower.includes('session')) return `DJ${num}`;
  if (lower.includes('additional district') || lower.includes('adj')) return `ADJ${num}`;
  if (lower.includes('high court')) return 'HC';
  if (lower.includes('cbi')) return `CBI${num}`;
  if (lower.includes('pocso')) return `POCSO${num}`;
  if (lower.includes('ndps')) return `NDPS${num}`;

  // Acronym of capital letters or words
  const words = str.split(/[\s,-]+/).filter(w => w.length > 0 && !['of', 'and', 'the', 'court', 'room', 'bench', 'in'].includes(w.toLowerCase()));
  if (words.length >= 2) {
    const letters = words.map(w => w[0].toUpperCase()).slice(0, 4).join('');
    return num ? `${letters}${num}` : letters;
  }
  return str.substring(0, 8).toUpperCase();
}

function autoDetectCadre(name) {
  const lower = (name || '').toLowerCase();
  if (lower.includes('family')) return 'Family Court';
  if (lower.includes('commercial')) return 'Commercial Court';
  if (lower.includes('pocso') || lower.includes('ndps') || lower.includes('cbi')) return 'Special Courts (POCSO / NDPS / CBI)';
  if (lower.includes('senior division') || lower.includes('acjm')) return 'Senior Division / FTC';
  if (lower.includes('junior division')) return 'Junior Division / FTC';
  if (lower.includes('additional district') || lower.includes('adj')) return 'Addl. District & Sessions Court';
  if (lower.includes('district')) return 'District & Sessions Court';
  if (lower.includes('mact') || lower.includes('accident')) return 'Motor Accident Claims Tribunal (MACT)';
  if (lower.includes('revenue') || lower.includes('collector')) return 'Revenue / Collectorate';
  if (lower.includes('high court')) return 'High Court';
  return 'General';
}

function openAddCourtModal() {
  const modal = document.getElementById("addCourtModal");
  if (!modal) return;
  modal.classList.remove("hidden");
  
  const input = document.getElementById("courtInput");
  const codeInput = document.getElementById("courtShortCodeInput");
  const cadreSelect = document.getElementById("courtCadreSelect");
  const crimInput = document.getElementById("courtCriminalTitleInput");
  const err = document.getElementById("addCourtErrorMsg");

  if (input) input.value = "";
  if (codeInput) {
    codeInput.value = "";
    delete codeInput.dataset.manual;
  }
  if (cadreSelect) cadreSelect.value = "General";
  if (crimInput) crimInput.value = "";
  if (err) err.classList.add("hidden");

  // Attach live auto-suggest listeners
  if (input && !input.dataset.suggestBound) {
    input.dataset.suggestBound = "true";
    input.addEventListener("input", () => {
      const val = input.value.trim();
      const codeEl = document.getElementById("courtShortCodeInput");
      const cadreEl = document.getElementById("courtCadreSelect");
      if (codeEl && !codeEl.dataset.manual) {
        codeEl.value = generateSuggestedShortCode(val);
      }
      if (cadreEl && val) {
        cadreEl.value = autoDetectCadre(val);
      }
    });
  }

  if (codeInput && !codeInput.dataset.manualBound) {
    codeInput.dataset.manualBound = "true";
    codeInput.addEventListener("input", () => {
      codeInput.dataset.manual = "true";
    });
  }

  if (input) {
    setTimeout(() => input.focus(), 80);
  }
}
window.openAddCourtModal = openAddCourtModal;

function closeAddCourtModal() {
  const modal = document.getElementById("addCourtModal");
  if (!modal) return;
  modal.classList.add("hidden");
  const input = document.getElementById("courtInput");
  if (input) input.value = "";
  const codeInput = document.getElementById("courtShortCodeInput");
  if (codeInput) {
    codeInput.value = "";
    delete codeInput.dataset.manual;
  }
  const crimInput = document.getElementById("courtCriminalTitleInput");
  if (crimInput) crimInput.value = "";
  const err = document.getElementById("addCourtErrorMsg");
  if (err) err.classList.add("hidden");
}
window.closeAddCourtModal = closeAddCourtModal;

function bindCourtsTabEvents() {
  const saveBtn = document.getElementById("saveCourtBtn");
  const courtInput = document.getElementById("courtInput");

  if (saveBtn && !saveBtn.dataset.bound) {
    saveBtn.dataset.bound = "true";
    saveBtn.addEventListener("click", () => {
      if (typeof handleAddCourtSubmit === "function") {
        handleAddCourtSubmit();
      }
    });
  }

  if (courtInput && !courtInput.dataset.bound) {
    courtInput.dataset.bound = "true";
    courtInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (typeof handleAddCourtSubmit === "function") {
          handleAddCourtSubmit();
        }
      }
    });
  }

  const editNameInput = document.getElementById("editCourtNameInput");
  if (editNameInput && !editNameInput.dataset.bound) {
    editNameInput.dataset.bound = "true";
    editNameInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        confirmSaveEditedCourt();
      } else if (e.key === "Escape") {
        e.preventDefault();
        closeEditCourtModal();
      }
    });
  }

  const addModal = document.getElementById("addCourtModal");
  if (addModal && !addModal.dataset.bound) {
    addModal.dataset.bound = "true";
    addModal.addEventListener("click", (e) => {
      if (e.target === addModal) {
        closeAddCourtModal();
      }
    });
  }
  const editModal = document.getElementById("editCourtModal");
  if (editModal && !editModal.dataset.bound) {
    editModal.dataset.bound = "true";
    editModal.addEventListener("click", (e) => {
      if (e.target === editModal) {
        closeEditCourtModal();
      }
    });
  }

  const delModal = document.getElementById("deleteCourtModal");
  if (delModal && !delModal.dataset.bound) {
    delModal.dataset.bound = "true";
    delModal.addEventListener("click", (e) => {
      if (e.target === delModal) {
        closeDeleteCourtModal();
      }
    });
  }
}

function openEditCourtModal(courtName, count = 0) {
  const modal = document.getElementById("editCourtModal");
  const origInput = document.getElementById("editCourtOriginalName");
  const nameInput = document.getElementById("editCourtNameInput");
  const noticeText = document.getElementById("editCourtNoticeText");
  const errorDiv = document.getElementById("editCourtErrorMsg");
  const saveBtn = document.getElementById("saveEditCourtBtn");
  const saveBtnText = document.getElementById("saveEditCourtBtnText");

  if (!modal || !nameInput) {
    const newCourt = prompt(
      `Edit court name "${courtName}"\n(${count} case(s) currently assigned):`,
      courtName,
    );
    if (newCourt && newCourt.trim() && newCourt.trim().toLowerCase() !== courtName.toLowerCase()) {
      if (courts.some((c) => c.trim().toLowerCase() === newCourt.trim().toLowerCase())) {
        alert(`A court named "${newCourt.trim()}" already exists.`);
        return;
      }
      cascadeUpdateCourtName(courtName, newCourt.trim()).then((updatedCount) => {
        alert(
          `✅ Court renamed to "${newCourt.trim()}".\nUpdated ${updatedCount || 0} associated case(s) across the database.`,
        );
      });
    }
    return;
  }

  const rec = getEnrichedCourtRecord(courtName);

  if (origInput) origInput.value = courtName;
  nameInput.value = rec.civil_title || courtName;

  const codeInput = document.getElementById("editCourtShortCodeInput");
  const cadreSelect = document.getElementById("editCourtCadreSelect");
  const crimInput = document.getElementById("editCourtCriminalTitleInput");

  if (codeInput) codeInput.value = rec.short_code || "";
  if (cadreSelect) cadreSelect.value = rec.cadre || "General";
  if (crimInput) crimInput.value = (rec.criminal_title && rec.criminal_title !== rec.civil_title) ? rec.criminal_title : "";
  if (errorDiv) {
    errorDiv.textContent = "";
    errorDiv.classList.add("hidden");
  }
  if (noticeText) {
    if (count > 0) {
      noticeText.innerHTML = `<strong>${count} active case(s)</strong> currently assigned to this court will be automatically updated across all tables and filings.`;
    } else {
      noticeText.textContent =
        "This court currently has no active cases assigned. Renaming will update the court directory.";
    }
  }
  if (saveBtn) saveBtn.disabled = false;
  if (saveBtnText) saveBtnText.textContent = "Save Changes";

  modal.classList.remove("hidden");
  setTimeout(() => {
    nameInput.focus();
    nameInput.select();
  }, 100);
}

function closeEditCourtModal() {
  const modal = document.getElementById("editCourtModal");
  if (modal) modal.classList.add("hidden");
}

async function confirmSaveEditedCourt() {
  const origInput = document.getElementById("editCourtOriginalName");
  const nameInput = document.getElementById("editCourtNameInput");
  const codeInput = document.getElementById("editCourtShortCodeInput");
  const cadreSelect = document.getElementById("editCourtCadreSelect");
  const crimInput = document.getElementById("editCourtCriminalTitleInput");
  const errorDiv = document.getElementById("editCourtErrorMsg");
  const saveBtn = document.getElementById("saveEditCourtBtn");
  const saveBtnText = document.getElementById("saveEditCourtBtnText");

  const oldName = (origInput?.value || "").trim();
  const newName = (nameInput?.value || "").trim();
  const shortCode = (codeInput?.value || "").trim();
  const cadre = (cadreSelect?.value || "General").trim();
  const criminalTitle = (crimInput?.value || "").trim() || newName;

  if (!newName) {
    if (errorDiv) {
      errorDiv.textContent = "Please enter a valid court name.";
      errorDiv.classList.remove("hidden");
    }
    return;
  }

  const updatedMetadata = {
    short_code: shortCode || newName.substring(0, 10).toUpperCase(),
    cadre: cadre,
    civil_title: newName,
    criminal_title: criminalTitle
  };

  // If name unchanged, update metadata directly
  if (oldName.toLowerCase() === newName.toLowerCase()) {
    try {
      if (saveBtn) saveBtn.disabled = true;
      if (saveBtnText) saveBtnText.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
      if (errorDiv) errorDiv.classList.add("hidden");

      if (typeof updateCourtMetadata === "function") {
        await updateCourtMetadata(oldName, updatedMetadata);
      } else if (typeof window !== "undefined" && typeof window.updateCourtMetadata === "function") {
        await window.updateCourtMetadata(oldName, updatedMetadata);
      } else if (typeof cascadeUpdateCourtName === "function") {
        await cascadeUpdateCourtName(oldName, newName, updatedMetadata);
      }

      closeEditCourtModal();
      renderCourtsTable();
      if (typeof showToastNotification === "function") {
        showToastNotification(`✅ Court details for "${newName}" updated successfully.`, 3000);
      }
      return;
    } catch (err) {
      console.error("Error updating court details:", err);
      if (errorDiv) {
        errorDiv.textContent = `Error saving changes: ${err.message || err}`;
        errorDiv.classList.remove("hidden");
      }
      return;
    } finally {
      if (saveBtn) saveBtn.disabled = false;
      if (saveBtnText) saveBtnText.textContent = "Save Changes";
    }
  }

  const rawCourts = getCourtsList();
  const alreadyExists = rawCourts.some(
    (c) =>
      c.trim().toLowerCase() === newName.toLowerCase() &&
      c.trim().toLowerCase() !== oldName.toLowerCase(),
  );
  if (alreadyExists) {
    if (errorDiv) {
      errorDiv.textContent = `A court named "${newName}" already exists. Please choose a different name.`;
      errorDiv.classList.remove("hidden");
    }
    return;
  }

  try {
    if (saveBtn) saveBtn.disabled = true;
    if (saveBtnText)
      saveBtnText.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
    if (errorDiv) errorDiv.classList.add("hidden");

    const updatedCount = (typeof cascadeUpdateCourtName === "function")
      ? await cascadeUpdateCourtName(oldName, newName)
      : (typeof window !== "undefined" && typeof window.cascadeUpdateCourtName === "function"
          ? await window.cascadeUpdateCourtName(oldName, newName)
          : 0);

    if (typeof updateCourtMetadata === "function") {
      await updateCourtMetadata(newName, updatedMetadata);
    } else if (typeof window !== "undefined" && typeof window.updateCourtMetadata === "function") {
      await window.updateCourtMetadata(newName, updatedMetadata);
    }
    closeEditCourtModal();
    if (typeof performPostCrudRefresh === "function") {
      await performPostCrudRefresh();
    } else if (typeof window !== "undefined" && typeof window.performPostCrudRefresh === "function") {
      await window.performPostCrudRefresh();
    }
    if (typeof showToastNotification === "function") {
      showToastNotification(
        `✅ Court renamed to "${newName}". Updated ${updatedCount || 0} associated case(s).`,
        3000,
      );
    } else {
      alert(
        `✅ Court renamed to "${newName}".\nUpdated ${updatedCount || 0} associated case(s) across the database.`,
      );
    }
  } catch (err) {
    console.error("Error renaming court:", err);
    if (errorDiv) {
      errorDiv.textContent = `Error saving changes: ${err.message || err}`;
      errorDiv.classList.remove("hidden");
    }
  } finally {
    if (saveBtn) saveBtn.disabled = false;
    if (saveBtnText) saveBtnText.textContent = "Save Changes";
  }
}

function openDeleteCourtModal(courtName, count = 0) {
  const modal = document.getElementById("deleteCourtModal");
  const targetInput = document.getElementById("deleteCourtTargetName");
  const displaySpan = document.getElementById("deleteCourtDisplayName");
  const casesNotice = document.getElementById("deleteCourtActiveCasesNotice");
  const casesNoticeText = document.getElementById("deleteCourtCasesNoticeText");
  const errorDiv = document.getElementById("deleteCourtErrorMsg");
  const confirmBtn = document.getElementById("confirmDeleteCourtBtn");
  const confirmBtnText = document.getElementById("confirmDeleteCourtBtnText");

  if (!modal) {
    if (
      confirm(
        `Delete court: "${courtName}"?${count > 0 ? `\n\n⚠️ Note: ${count} case(s) currently belong to this court and will be unlinked.` : ""}`,
      )
    ) {
      if (typeof deleteCourtFromSupabase === "function") deleteCourtFromSupabase(courtName);
    }
    return;
  }

  if (targetInput) targetInput.value = courtName;
  if (displaySpan) displaySpan.textContent = `"${courtName}"`;

  if (errorDiv) {
    errorDiv.textContent = "";
    errorDiv.classList.add("hidden");
  }

  if (casesNotice && casesNoticeText) {
    if (count > 0) {
      casesNoticeText.innerHTML = `<strong>⚠️ Warning:</strong> <strong>${count} active case(s)</strong> are currently assigned to this court and will have their court reference unlinked.`;
      casesNotice.classList.remove("hidden");
    } else {
      casesNotice.classList.add("hidden");
      casesNoticeText.textContent = "";
    }
  }

  if (confirmBtn) confirmBtn.disabled = false;
  if (confirmBtnText) confirmBtnText.textContent = "Delete Court";

  modal.classList.remove("hidden");
}

function closeDeleteCourtModal() {
  const modal = document.getElementById("deleteCourtModal");
  if (modal) modal.classList.add("hidden");
}

async function executeDeleteCourtConfirm() {
  const targetInput = document.getElementById("deleteCourtTargetName");
  const errorDiv = document.getElementById("deleteCourtErrorMsg");
  const confirmBtn = document.getElementById("confirmDeleteCourtBtn");
  const confirmBtnText = document.getElementById("confirmDeleteCourtBtnText");

  const courtName = (targetInput?.value || "").trim();
  if (!courtName) {
    closeDeleteCourtModal();
    return;
  }

  if (confirmBtn) confirmBtn.disabled = true;
  if (confirmBtnText) confirmBtnText.textContent = "Deleting...";

  try {
    if (typeof deleteCourtFromSupabase === "function") {
      await deleteCourtFromSupabase(courtName);
    } else if (typeof window !== "undefined" && typeof window.deleteCourtFromSupabase === "function") {
      await window.deleteCourtFromSupabase(courtName);
    }
    closeDeleteCourtModal();
    if (typeof performPostCrudRefresh === "function") {
      await performPostCrudRefresh();
    } else if (typeof window !== "undefined" && typeof window.performPostCrudRefresh === "function") {
      await window.performPostCrudRefresh();
    }
    if (typeof showToastNotification === "function") {
      showToastNotification(`✅ Court "${courtName}" deleted successfully.`, 2500);
    } else if (typeof M !== "undefined" && M.toast) {
      M.toast({ html: `✅ Court "${courtName}" deleted successfully.` });
    }
  } catch (err) {
    console.error("Error deleting court:", err);
    if (errorDiv) {
      errorDiv.textContent = `Error deleting court: ${err.message || err}`;
      errorDiv.classList.remove("hidden");
    }
    if (confirmBtn) confirmBtn.disabled = false;
    if (confirmBtnText) confirmBtnText.textContent = "Delete Court";
  }
}

if (typeof openEditCourtModal !== "undefined") window.openEditCourtModal = openEditCourtModal;
if (typeof closeEditCourtModal !== "undefined") window.closeEditCourtModal = closeEditCourtModal;
if (typeof confirmSaveEditedCourt !== "undefined")
  window.confirmSaveEditedCourt = confirmSaveEditedCourt;
window.editCourtPrompt = openEditCourtModal;
if (typeof openDeleteCourtModal !== "undefined") window.openDeleteCourtModal = openDeleteCourtModal;
if (typeof closeDeleteCourtModal !== "undefined")
  window.closeDeleteCourtModal = closeDeleteCourtModal;
if (typeof executeDeleteCourtConfirm !== "undefined")
  window.executeDeleteCourtConfirm = executeDeleteCourtConfirm;
window.deleteCourtFromList = function (courtName) {
  openDeleteCourtModal(courtName);
};

function filterCourtsTable(query) {
  currentCourtsPage = 1;
  renderCourtsTable(query);
}
if (typeof filterCourtsTable !== "undefined") window.filterCourtsTable = filterCourtsTable;
if (typeof renderCourtsTable !== "undefined") window.renderCourtsTable = renderCourtsTable;
if (typeof bindCourtsTabEvents !== "undefined") window.bindCourtsTabEvents = bindCourtsTabEvents;

async function syncAllCourtsFromDatabase() {
  const syncBtn = document.querySelector(".court-refresh-btn");
  if (syncBtn) {
    syncBtn.disabled = true;
    syncBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Syncing...</span>';
  }
  try {
    const deletedSet =
      typeof getDeletedCourtsSet === "function" ? getDeletedCourtsSet() : new Set();
    const sb = (typeof supabaseClient !== "undefined") ? supabaseClient : (typeof window !== "undefined" ? window.supabaseClient : null);
    const curCourts = getCourtsList();
    if (sb) {
      const { data: courtsData } = await sb
        .from("courts")
        .select("*")
        .order("court_name");
      if (courtsData && courtsData.length > 0) {
        const seen = new Set();
        curCourts.length = 0;
        courtsData.forEach((c) => {
          const name = (c.court_name || "").trim();
          if (name && !deletedSet.has(name.toLowerCase()) && !seen.has(name.toLowerCase())) {
            seen.add(name.toLowerCase());
            curCourts.push(name);
          }
        });
      }
    }
    // Also include any courts referenced in cases if not deleted
    getCourtsAllCaseRecords().forEach((item) => {
      const cName = (item.courtName || item.criminalCourtName || "").trim();
      if (
        cName &&
        cName !== "—" &&
        !deletedSet.has(cName.toLowerCase()) &&
        !curCourts.some((c) => c.trim().toLowerCase() === cName.toLowerCase())
      ) {
        curCourts.push(cName);
      }
    });
    if (typeof saveCourtsToBackup === "function") saveCourtsToBackup();
    if (typeof renderCourtOptions === "function") renderCourtOptions();
    if (typeof renderCriminalCourtOptions === "function") renderCriminalCourtOptions();
    if (typeof renderSearchCourtFilterOptions === "function") renderSearchCourtFilterOptions();
    renderCourtsTable();
    if (typeof showToastNotification === "function") {
      showToastNotification("✅ Courts synchronized from database.", 2500);
    }
  } catch (err) {
    console.error("Error syncing courts:", err);
  } finally {
    if (syncBtn) {
      syncBtn.disabled = false;
      syncBtn.innerHTML = '<i class="fa-solid fa-arrows-rotate"></i> <span>Sync All Courts</span>';
    }
  }
}
if (typeof syncAllCourtsFromDatabase !== "undefined")
  window.syncAllCourtsFromDatabase = syncAllCourtsFromDatabase;

async function updateCourtMetadata(courtName, metadata) {
  const trimmed = (courtName || '').trim();
  if (!trimmed || !metadata) return false;

  const lower = trimmed.toLowerCase();

  // 1. Update in-memory courtsList
  if (typeof courtsList !== 'undefined' && Array.isArray(courtsList)) {
    const listIdx = courtsList.findIndex(c => (c.court_name || '').trim().toLowerCase() === lower);
    if (listIdx >= 0) {
      if (metadata.short_code !== undefined) courtsList[listIdx].short_code = metadata.short_code;
      if (metadata.cadre !== undefined) courtsList[listIdx].cadre = metadata.cadre;
      if (metadata.civil_title !== undefined) courtsList[listIdx].civil_title = metadata.civil_title;
      if (metadata.criminal_title !== undefined) courtsList[listIdx].criminal_title = metadata.criminal_title;
    } else {
      courtsList.push({
        court_name: trimmed,
        civil_title: metadata.civil_title || trimmed,
        short_code: metadata.short_code || trimmed.substring(0, 10).toUpperCase(),
        cadre: metadata.cadre || 'General',
        criminal_title: metadata.criminal_title || trimmed,
        status: 'ACTIVE'
      });
    }
    window.courtsList = courtsList;
  }

  // 2. Persist to backup
  if (typeof saveCourtsToBackup === 'function') {
    saveCourtsToBackup();
  }

  // 3. Update Supabase if available
  if (typeof supabaseClient !== 'undefined' && supabaseClient) {
    try {
      await supabaseClient
        .from('courts')
        .update({
          short_code: metadata.short_code,
          cadre: metadata.cadre,
          civil_title: metadata.civil_title,
          criminal_title: metadata.criminal_title,
          updated_at: new Date().toISOString()
        })
        .ilike('court_name', trimmed);
    } catch (e) {
      console.warn('[METADATA] Note on updating Supabase court record:', e);
    }
  }

  return true;
}
if (typeof updateCourtMetadata !== 'undefined') window.updateCourtMetadata = updateCourtMetadata;
