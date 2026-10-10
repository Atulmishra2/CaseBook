window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs["courts"] = /*html*/ `
<div class="section-header-row">
  <div class="section-title-box">
    <div class="section-icon-badge"><i class="fa-solid fa-building-columns"></i></div>
    <div>
      <h3>Manage Courts Directory</h3>
      <p class="section-subtitle">
        Configure court complexes, bench rooms, presiding officers, and judicial forums
      </p>
    </div>
  </div>
  <span id="courtsTotalCountBadge" class="case-badge civil">Loading Courts...</span>
</div>

<div class="court-add-card">
  <div class="search-card-header">
    <div class="search-header-info">
      <span class="search-card-badge-icon court-badge-icon">
        <i class="fa-solid fa-landmark"></i>
      </span>
      <div>
        <h4 class="search-card-heading">Add New Court to Directory</h4>
        <p class="search-card-subheading">
          Enter judicial forum name (e.g. Fast Track Special Court, Labour Court, NCLT, High Court)
        </p>
      </div>
    </div>
  </div>
  <div class="court-input-action-row">
    <div class="search-field-box">
      <span class="search-field-prefix-icon"><i class="fa-solid fa-scale-balanced"></i></span>
      <input
        type="text"
        id="courtInput"
        placeholder="Enter court name (e.g. Fast Track Special Court, Labour Court, NCLT, Family Court)..."
        autocomplete="off"
      />
    </div>
    <button type="button" id="saveCourtBtn" class="court-submit-btn ">
      <i class="fa-solid fa-paper-plane"></i>
      <span>Submit Court</span>
    </button>
  </div>
</div>

<!-- Court Directory Search & Live Filter Toolbar -->
<div class="court-table-toolbar">
  <div class="search-field-box court-search-box">
    <span class="search-field-prefix-icon"><i class="fa-solid fa-magnifying-glass"></i></span>
    <input
      type="text"
      id="courtSearchInput"
      placeholder="Search configured courts by name..."
      oninput="filterCourtsTable(this.value)"
      enterkeyhint="search"
      autocomplete="off"
    />
  </div>
  <button
    type="button"
    class="court-refresh-btn"
    onclick="syncAllCourtsFromDatabase()"
  >
    <i class="fa-solid fa-arrows-rotate"></i>
    <span>Sync All Courts</span>
  </button>
</div>

<div id="courtsCardsGrid" class="courts-cards-grid">
  <div class="courts-cards-empty">No courts configured yet. Add a court using the form above.</div>
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
      <div>
        <label for="editCourtNameInput">Court / Judicial Forum Name</label>
        <div class="court-input-action-row" style="margin: 0; width: 100%">
          <div class="search-field-box" style="width: 100%">
            <span class="search-field-prefix-icon"><i class="fa-solid fa-scale-balanced"></i></span>
            <input
              type="text"
              id="editCourtNameInput"
              placeholder="Enter updated court name..."
              autocomplete="off"
            />
          </div>
        </div>
      </div>

      <div id="editCourtWarningNotice" class="court-modal-notice">
        <i class="fa-solid fa-circle-info" style="margin-top: 2px"></i>
        <span id="editCourtNoticeText">
          This will automatically rename this court and synchronize all associated case filings.
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
  <div class="court-modal-card">
    <div class="court-modal-header">
      <div class="court-modal-header-info">
        <div class="court-modal-icon court-modal-icon-danger">
          <i class="fa-solid fa-trash-can"></i>
        </div>
        <div>
          <h3 id="deleteCourtModalTitle">Delete Court Forum</h3>
          <p class="court-modal-subtitle">Permanent directory removal & case unlinking</p>
        </div>
      </div>
      <button
        type="button"
        class="court-modal-close-btn"
        aria-label="Close"
        onclick="closeDeleteCourtModal()"
      >
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>

    <div class="court-modal-body">
      <input type="hidden" id="deleteCourtTargetName" value="" />
      <p style="margin: 0 0 12px 0; font-size: 14px; color: var(--courts-text-primary); line-height: 1.5;">
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

function goToCourtsPage(page) {
  currentCourtsPage = page;
  renderCourtsTable();
}
window.goToCourtsPage = goToCourtsPage;

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

  (courts || []).forEach((c) => {
    const t = (c || "").trim();
    if (t && !deletedSet.has(t.toLowerCase()) && !seen.has(t.toLowerCase())) {
      seen.add(t.toLowerCase());
      allCourtsList.push(t);
    }
  });

  allCourtsList.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

  const filteredCourts = query
    ? allCourtsList.filter((c) => c.toLowerCase().includes(query))
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
  // Build table rows first
  // =========================================================
  let rowsHTML = "";
  pagedCourts.forEach((court, pIndex) => {
    const actualIndex = startIndex + pIndex;
    const casesInCourt = (allCaseRecords || []).filter(
      (c) =>
        (c.courtName || "").trim().toLowerCase() === court.trim().toLowerCase() ||
        (c.criminalCourtName || "").trim().toLowerCase() === court.trim().toLowerCase(),
    );
    const count = casesInCourt.length;

    rowsHTML += `
      <tr>
        <td data-label="Sr. No.">
          <span class="sr-number">#${actualIndex + 1}</span>
        </td>
        <td data-label="Court Name">
          <span class="court-name">${escapeHtml(court)}</span>
        </td>
        <td data-label="Cases">
          <span class="cases-text">
            <i class="fa-solid fa-briefcase"></i> ${count} Case${count === 1 ? "" : "s"} Assigned
          </span>
        </td>
        <td data-label="Actions" class="sticky-col">
          <div class="action-buttons">
            <button type="button" class="btn btn-edit edit-court" data-court="${escapeHtml(court)}" data-count="${count}">
              <i class="fa-solid fa-pen-to-square"></i> Edit
            </button>
            <button type="button" class="btn btn-delete delete-court" data-court="${escapeHtml(court)}" data-count="${count}">
              <i class="fa-solid fa-trash"></i> Delete
            </button>
          </div>
        </td>
      </tr>
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

  // =========================================================
  // Wrap everything — table + pagination INSIDE wrapper
  // =========================================================
  const tableHTML = `
    <div class="courts-card-wrapper">
      <div class="table-container">
        <table class="court-table">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Court Name</th>
              <th>Assigned Cases</th>
              <th class="sticky-col">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHTML}
          </tbody>
        </table>
      </div>
      ${paginationHTML}
    </div>
  `;

  grid.innerHTML = tableHTML;

  // Attach button event listeners
  grid.querySelectorAll(".edit-court").forEach((btn) => {
    btn.addEventListener("click", () => {
      const courtName = btn.getAttribute("data-court");
      const count = parseInt(btn.getAttribute("data-count")) || 0;
      openEditCourtModal(courtName, count);
    });
  });

  grid.querySelectorAll(".delete-court").forEach((btn) => {
    btn.addEventListener("click", () => {
      const courtName = btn.getAttribute("data-court");
      const count = parseInt(btn.getAttribute("data-count")) || 0;
      openDeleteCourtModal(courtName, count);
    });
  });
}

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

  if (origInput) origInput.value = courtName;
  nameInput.value = courtName;
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
  const errorDiv = document.getElementById("editCourtErrorMsg");
  const saveBtn = document.getElementById("saveEditCourtBtn");
  const saveBtnText = document.getElementById("saveEditCourtBtnText");

  const oldName = (origInput?.value || "").trim();
  const newName = (nameInput?.value || "").trim();

  if (!newName) {
    if (errorDiv) {
      errorDiv.textContent = "Please enter a valid court name.";
      errorDiv.classList.remove("hidden");
    }
    return;
  }

  if (oldName.toLowerCase() === newName.toLowerCase()) {
    closeEditCourtModal();
    return;
  }

  const alreadyExists = (courts || []).some(
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

    const updatedCount = await cascadeUpdateCourtName(oldName, newName);
    closeEditCourtModal();
    await performPostCrudRefresh();
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
      deleteCourtFromSupabase(courtName);
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
    await deleteCourtFromSupabase(courtName);
    closeDeleteCourtModal();
    await performPostCrudRefresh();
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
    if (supabaseClient) {
      const { data: courtsData } = await supabaseClient
        .from("courts")
        .select("*")
        .order("court_name");
      if (courtsData && courtsData.length > 0) {
        const seen = new Set();
        courts = [];
        courtsData.forEach((c) => {
          const name = (c.court_name || "").trim();
          if (name && !deletedSet.has(name.toLowerCase()) && !seen.has(name.toLowerCase())) {
            seen.add(name.toLowerCase());
            courts.push(name);
          }
        });
      }
    }
    // Also include any courts referenced in cases if not deleted
    (allCaseRecords || []).forEach((item) => {
      const cName = (item.courtName || item.criminalCourtName || "").trim();
      if (
        cName &&
        cName !== "—" &&
        !deletedSet.has(cName.toLowerCase()) &&
        !courts.some((c) => c.trim().toLowerCase() === cName.toLowerCase())
      ) {
        courts.push(cName);
      }
    });
    saveCourtsToBackup();
    renderCourtOptions();
    renderCriminalCourtOptions();
    renderSearchCourtFilterOptions();
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
