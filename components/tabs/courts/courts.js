window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs['courts'] = `<div class="form-container">
                    <div class="section-header-row">
    <div class="section-title-box">
        <div class="section-icon-badge"><i class="fa-solid fa-building-columns"></i></div>
        <div>
            <h3>Manage Courts Directory</h3>
            <p class="section-subtitle">Configure court complexes, bench rooms, presiding officers, and judicial forums</p>
            <div class="header-chips-row">
                <button type="button" class="header-chip-btn" onclick="showTab('causelist')"><i class="fa-solid fa-scroll"></i> Daily Cause List</button>
            </div>
        </div>
    </div>
</div>
                        <span id="courtsTotalCountBadge" class="case-badge civil">Loading Courts...</span>
                    </div>

                    <div class="court-add-card">
                        <div class="search-card-header">
                            <div class="search-header-info">
                                <span class="search-card-badge-icon court-badge-icon"><i class="fa-solid fa-landmark"></i></span>
                                <div>
                                    <h4 class="search-card-heading">Add New Court to Directory</h4>
                                    <p class="search-card-subheading">Enter judicial forum name (e.g. Fast Track Special Court, Labour Court, NCLT, High Court)</p>
                                </div>
                            </div>
                        </div>
                        <div class="court-input-action-row">
                            <div class="search-field-box">
                                <span class="search-field-prefix-icon"><i class="fa-solid fa-scale-balanced"></i></span>
                                <input type="text" id="courtInput" placeholder="Enter court name (e.g. Fast Track Special Court, Labour Court, NCLT, Family Court)...">
                            </div>
                            <button type="button" id="saveCourtBtn" class="court-submit-btn primary-btn">
                                <i class="fa-solid fa-paper-plane"></i> <span>Submit Court</span>
                            </button>
                        </div>
                    </div>

                    <!-- Court Directory Search & Live Filter Toolbar -->
                    <div class="court-table-toolbar">
                        <div class="search-field-box court-search-box">
                            <span class="search-field-prefix-icon"><i class="fa-solid fa-magnifying-glass"></i></span>
                            <input type="text" id="courtSearchInput" placeholder="Search configured courts by name..." oninput="filterCourtsTable(this.value)" enterkeyhint="search" autocomplete="off">
                        </div>
                        <button type="button" class="secondary-btn court-refresh-btn" onclick="syncAllCourtsFromDatabase()">
                            <i class="fa-solid fa-arrows-rotate"></i> <span>Sync All Courts</span>
                        </button>
                    </div>

                    <div id="courtsCardsGrid" class="courts-cards-grid">
                        <div class="courts-cards-empty">No courts configured yet. Add a court using the form above.</div>
                    </div>
                </div>

<!-- ================= COURTS MODAL (MODULARIZED) ================= -->
    <!-- Edit Court Modal Dialog -->
    <div
      id="editCourtModal"
      class="modal-overlay hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="editCourtModalTitle"
    >
      <div class="modal-card modal-card-sm">
        <div class="modal-header">
          <div class="modal-header-info">
            <div class="modal-icon">
              <i class="fa-solid fa-pen-to-square"></i>
            </div>
            <div>
              <h3 id="editCourtModalTitle">Edit Court Name</h3>
              <p id="editCourtModalSubtitle" class="modal-subtitle">
                Rename this judicial forum and sync all associated case filings.
              </p>
            </div>
          </div>
          <button
            type="button"
            id="closeEditCourtModalBtn"
            class="modal-close-btn"
            aria-label="Close"
            onclick="closeEditCourtModal()"
          >
            &times;
          </button>
        </div>
        <div class="modal-body">
          <input type="hidden" id="editCourtOriginalName" value="" />
          <div style="margin-bottom: 16px">
            <label
              for="editCourtNameInput"
              style="
                display: block;
                font-weight: 600;
                margin-bottom: 8px;
                font-size: 14px;
                color: #1e293b;
              "
            >
              Court / Judicial Forum Name
            </label>
            <div class="search-field-box" style="margin: 0; width: 100%">
              <span class="search-field-prefix-icon"
                ><i class="fa-solid fa-scale-balanced"></i
              ></span>
              <input
                type="text"
                id="editCourtNameInput"
                placeholder="Enter updated court name..."
                style="
                  width: 100%;
                  border: 1.5px solid #cbd5e1;
                  border-radius: 8px;
                  padding: 10px 12px 10px 42px;
                  font-size: 14px;
                "
              />
            </div>
          </div>
          <div
            id="editCourtWarningNotice"
            style="
              background: #eff6ff;
              border: 1px solid #bfdbfe;
              border-radius: 8px;
              padding: 12px;
              display: flex;
              align-items: flex-start;
              gap: 10px;
              font-size: 13px;
              color: #1e40af;
            "
          >
            <i
              class="fa-solid fa-circle-info"
              style="margin-top: 2px; color: #3b82f6"
            ></i>
            <span id="editCourtNoticeText"
              >This will automatically rename this court and synchronize all
              associated case filings.</span
            >
          </div>
          <div
            id="editCourtErrorMsg"
            class="hidden"
            style="
              margin-top: 12px;
              background: #fef2f2;
              border: 1px solid #fecaca;
              border-radius: 8px;
              padding: 10px 12px;
              font-size: 13px;
              color: #b91c1c;
            "
          ></div>
        </div>
        <div
          class="modal-footer"
          style="
            padding: 14px 20px;
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: wrap !important;
            justify-content: flex-end !important;
            align-items: center !important;
            gap: 8px !important;
            border-top: 1px solid #e2e8f0;
            background: #fff;
          "
        >
          <button
            type="button"
            class="btn btn-out"
            onclick="closeEditCourtModal()"
          >
            Cancel
          </button>
          <button type="button" class="btn btn-dark" onclick="saveEditCourt()">
            <i class="fa-solid fa-floppy-disk"></i> Save Changes
          </button>
        </div>
      </div>
    </div>

`;

function renderCourtsTable(filterQuery = '') {
  const countBadge = document.getElementById('courtsTotalCountBadge');
  const searchInput = document.getElementById('courtSearchInput');
  const query = (filterQuery !== undefined && filterQuery !== null && filterQuery !== '' ? filterQuery : (searchInput ? searchInput.value : '') || '').trim().toLowerCase();

  const deletedSet = getDeletedCourtsSet();
  const seen = new Set();
  const allCourtsList = [];

  courts.forEach(c => {
    const t = (c || '').trim();
    if (t && !deletedSet.has(t.toLowerCase()) && !seen.has(t.toLowerCase())) {
      seen.add(t.toLowerCase());
      allCourtsList.push(t);
    }
  });

  allCourtsList.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

  const filteredCourts = query
    ? allCourtsList.filter(c => c.toLowerCase().includes(query))
    : allCourtsList;

  if (countBadge) {
    if (query) {
      countBadge.textContent = `${filteredCourts.length} of ${allCourtsList.length} Courts`;
    } else {
      countBadge.textContent = `${allCourtsList.length} Court${allCourtsList.length === 1 ? '' : 's'} Configured`;
    }
  }

  const grid = document.getElementById('courtsCardsGrid');

  if (!grid) return;

  if (filteredCourts.length === 0) {
    grid.innerHTML = `<div class="courts-cards-empty">${query ? `No courts matching "${escapeHtml(query)}".` : 'No courts configured yet. Add a court using the form above.'}</div>`;
    return;
  }

  grid.innerHTML = '';

  filteredCourts.forEach((court, index) => {
    const card = document.createElement('div');
    card.className = 'court-directory-card';
    const casesInCourt = (allCaseRecords || []).filter(c =>
      (c.courtName || '').trim().toLowerCase() === court.trim().toLowerCase() ||
      (c.criminalCourtName || '').trim().toLowerCase() === court.trim().toLowerCase()
    );
    const count = casesInCourt.length;

    card.innerHTML = `
      <div class="court-card-head">
        <span class="court-card-index">#${index + 1}</span>
        <span class="court-card-icon"><i class="fa-solid fa-landmark"></i></span>
        <span class="court-card-name">${escapeHtml(court)}</span>
      </div>
      <div class="court-card-body">
        <span class="court-card-count ${count > 0 ? 'has-cases' : 'zero-cases'}">
          <i class="fa-solid fa-briefcase"></i> ${count} Case${count === 1 ? '' : 's'} Assigned
        </span>
      </div>
      <div class="court-card-actions">
        <button type="button" class="court-btn-edit edit-court" title="Edit Court"><i class="fa-solid fa-pen-to-square"></i><span class="btn-text"> Edit</span></button>
        <button type="button" class="court-btn-delete delete-court" title="Delete Court"><i class="fa-solid fa-trash-can"></i><span class="btn-text"> Delete</span></button>
      </div>
    `;

    const editBtn = card.querySelector('.edit-court');
    const deleteBtn = card.querySelector('.delete-court');

    editBtn.addEventListener('click', () => {
      openEditCourtModal(court, count);
    });

    deleteBtn.addEventListener('click', () => {
      openDeleteCourtModal(court, count);
    });

    grid.appendChild(card);
  });
}

function openEditCourtModal(courtName, count = 0) {
  const modal = document.getElementById('editCourtModal');
  const origInput = document.getElementById('editCourtOriginalName');
  const nameInput = document.getElementById('editCourtNameInput');
  const noticeText = document.getElementById('editCourtNoticeText');
  const errorDiv = document.getElementById('editCourtErrorMsg');
  const saveBtn = document.getElementById('saveEditCourtBtn');
  const saveBtnText = document.getElementById('saveEditCourtBtnText');

  if (!modal || !nameInput) {
    const newCourt = prompt(`Edit court name "${courtName}"\n(${count} case(s) currently assigned):`, courtName);
    if (newCourt && newCourt.trim() && newCourt.trim().toLowerCase() !== courtName.toLowerCase()) {
      if (courts.some(c => c.trim().toLowerCase() === newCourt.trim().toLowerCase())) {
        alert(`A court named "${newCourt.trim()}" already exists.`);
        return;
      }
      cascadeUpdateCourtName(courtName, newCourt.trim()).then(updatedCount => {
        alert(`✅ Court renamed to "${newCourt.trim()}".\nUpdated ${updatedCount || 0} associated case(s) across the database.`);
      });
    }
    return;
  }

  if (origInput) origInput.value = courtName;
  nameInput.value = courtName;
  if (errorDiv) {
    errorDiv.textContent = '';
    errorDiv.classList.add('hidden');
  }
  if (noticeText) {
    if (count > 0) {
      noticeText.innerHTML = `<strong>${count} active case(s)</strong> currently assigned to this court will be automatically updated across all tables and filings.`;
    } else {
      noticeText.textContent = 'This court currently has no active cases assigned. Renaming will update the court directory.';
    }
  }
  if (saveBtn) saveBtn.disabled = false;
  if (saveBtnText) saveBtnText.textContent = 'Save Changes';

  modal.classList.remove('hidden');
  setTimeout(() => {
    nameInput.focus();
    nameInput.select();
  }, 100);
}

function closeEditCourtModal() {
  const modal = document.getElementById('editCourtModal');
  if (modal) modal.classList.add('hidden');
}

async function confirmSaveEditedCourt() {
  const origInput = document.getElementById('editCourtOriginalName');
  const nameInput = document.getElementById('editCourtNameInput');
  const errorDiv = document.getElementById('editCourtErrorMsg');
  const saveBtn = document.getElementById('saveEditCourtBtn');
  const saveBtnText = document.getElementById('saveEditCourtBtnText');

  const oldName = (origInput?.value || '').trim();
  const newName = (nameInput?.value || '').trim();

  if (!newName) {
    if (errorDiv) {
      errorDiv.textContent = 'Please enter a valid court name.';
      errorDiv.classList.remove('hidden');
    }
    return;
  }

  if (oldName.toLowerCase() === newName.toLowerCase()) {
    closeEditCourtModal();
    return;
  }

  const alreadyExists = courts.some(c => c.trim().toLowerCase() === newName.toLowerCase() && c.trim().toLowerCase() !== oldName.toLowerCase());
  if (alreadyExists) {
    if (errorDiv) {
      errorDiv.textContent = `A court named "${newName}" already exists. Please choose a different name.`;
      errorDiv.classList.remove('hidden');
    }
    return;
  }

  try {
    if (saveBtn) saveBtn.disabled = true;
    if (saveBtnText) saveBtnText.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
    if (errorDiv) errorDiv.classList.add('hidden');

    const updatedCount = await cascadeUpdateCourtName(oldName, newName);
    closeEditCourtModal();
    await performPostCrudRefresh();
    alert(`✅ Court renamed to "${newName}".\nUpdated ${updatedCount || 0} associated case(s) across the database.`);
  } catch (err) {
    console.error('Error renaming court:', err);
    if (errorDiv) {
      errorDiv.textContent = `Error saving changes: ${err.message || err}`;
      errorDiv.classList.remove('hidden');
    }
  } finally {
    if (saveBtn) saveBtn.disabled = false;
    if (saveBtnText) saveBtnText.textContent = 'Save Changes';
  }
}

function openDeleteCourtModal(courtName, count = 0) {
  const modal = document.getElementById('deleteCourtModal');
  const targetInput = document.getElementById('deleteCourtTargetName');
  const displaySpan = document.getElementById('deleteCourtDisplayName');
  const casesNotice = document.getElementById('deleteCourtActiveCasesNotice');
  const casesNoticeText = document.getElementById('deleteCourtCasesNoticeText');
  const errorDiv = document.getElementById('deleteCourtErrorMsg');
  const confirmBtn = document.getElementById('confirmDeleteCourtBtn');
  const confirmBtnText = document.getElementById('confirmDeleteCourtBtnText');

  if (!modal) {
    if (confirm(`Delete court: "${courtName}"?${count > 0 ? `\n\n⚠️ Note: ${count} case(s) currently belong to this court and will be unlinked.` : ''}`)) {
      deleteCourtFromSupabase(courtName);
    }
    return;
  }

  if (targetInput) targetInput.value = courtName;
  if (displaySpan) displaySpan.textContent = `"${courtName}"`;

  if (errorDiv) {
    errorDiv.textContent = '';
    errorDiv.classList.add('hidden');
  }

  if (casesNotice && casesNoticeText) {
    if (count > 0) {
      casesNoticeText.innerHTML = `<strong>⚠️ Warning:</strong> <strong>${count} active case(s)</strong> are currently assigned to this court and will have their court reference unlinked.`;
      casesNotice.classList.remove('hidden');
    } else {
      casesNotice.classList.add('hidden');
      casesNoticeText.textContent = '';
    }
  }

  if (confirmBtn) confirmBtn.disabled = false;
  if (confirmBtnText) confirmBtnText.textContent = 'Delete Court';

  modal.classList.remove('hidden');
}

function closeDeleteCourtModal() {
  const modal = document.getElementById('deleteCourtModal');
  if (modal) modal.classList.add('hidden');
}

async function executeDeleteCourtConfirm() {
  const targetInput = document.getElementById('deleteCourtTargetName');
  const errorDiv = document.getElementById('deleteCourtErrorMsg');
  const confirmBtn = document.getElementById('confirmDeleteCourtBtn');
  const confirmBtnText = document.getElementById('confirmDeleteCourtBtnText');

  const courtName = (targetInput?.value || '').trim();
  if (!courtName) {
    closeDeleteCourtModal();
    return;
  }

  if (confirmBtn) confirmBtn.disabled = true;
  if (confirmBtnText) confirmBtnText.textContent = 'Deleting...';

  try {
    await deleteCourtFromSupabase(courtName);
    closeDeleteCourtModal();
    await performPostCrudRefresh();
    if (typeof showToastNotification === 'function') {
      showToastNotification(`✅ Court "${courtName}" deleted successfully.`, 2500);
    } else if (typeof M !== 'undefined' && M.toast) {
      M.toast({ html: `✅ Court "${courtName}" deleted successfully.` });
    }
  } catch (err) {
    console.error('Error deleting court:', err);
    if (errorDiv) {
      errorDiv.textContent = `Error deleting court: ${err.message || err}`;
      errorDiv.classList.remove('hidden');
    }
    if (confirmBtn) confirmBtn.disabled = false;
    if (confirmBtnText) confirmBtnText.textContent = 'Delete Court';
  }
}

if (typeof openEditCourtModal !== 'undefined') window.openEditCourtModal = openEditCourtModal;
if (typeof closeEditCourtModal !== 'undefined') window.closeEditCourtModal = closeEditCourtModal;
if (typeof confirmSaveEditedCourt !== 'undefined') window.confirmSaveEditedCourt = confirmSaveEditedCourt;
window.editCourtPrompt = openEditCourtModal;
if (typeof openDeleteCourtModal !== 'undefined') window.openDeleteCourtModal = openDeleteCourtModal;
if (typeof closeDeleteCourtModal !== 'undefined') window.closeDeleteCourtModal = closeDeleteCourtModal;
if (typeof executeDeleteCourtConfirm !== 'undefined') window.executeDeleteCourtConfirm = executeDeleteCourtConfirm;
window.deleteCourtFromList = function(courtName) {
  openDeleteCourtModal(courtName);
};

function filterCourtsTable(query) {
  renderCourtsTable(query);
}
if (typeof filterCourtsTable !== 'undefined') window.filterCourtsTable = filterCourtsTable;
if (typeof renderCourtsTable !== 'undefined') window.renderCourtsTable = renderCourtsTable;

async function syncAllCourtsFromDatabase() {
  const syncBtn = document.querySelector('.court-refresh-btn');
  if (syncBtn) {
    syncBtn.disabled = true;
    syncBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Syncing...</span>';
  }
  try {
    const deletedSet = getDeletedCourtsSet();
    if (supabaseClient) {
      const { data: courtsData } = await supabaseClient.from('courts').select('*').order('court_name');
      if (courtsData && courtsData.length > 0) {
        const seen = new Set();
        courts = [];
        courtsData.forEach(c => {
          const name = (c.court_name || '').trim();
          if (name && !deletedSet.has(name.toLowerCase()) && !seen.has(name.toLowerCase())) {
            seen.add(name.toLowerCase());
            courts.push(name);
          }
        });
      }
    }
    // Also include any courts referenced in cases if not deleted
    (allCaseRecords || []).forEach(item => {
      const cName = (item.courtName || item.criminalCourtName || '').trim();
      if (cName && cName !== '—' && !deletedSet.has(cName.toLowerCase()) && !courts.some(c => c.trim().toLowerCase() === cName.toLowerCase())) {
        courts.push(cName);
      }
    });
    saveCourtsToBackup();
    renderCourtOptions();
    renderCriminalCourtOptions();
    renderSearchCourtFilterOptions();
    renderCourtsTable();
  } catch (err) {
    console.error('Error syncing courts:', err);
  } finally {
    if (syncBtn) {
      syncBtn.disabled = false;
      syncBtn.innerHTML = '<i class="fa-solid fa-arrows-rotate"></i> <span>Sync All Courts</span>';
    }
  }
}
if (typeof syncAllCourtsFromDatabase !== 'undefined') window.syncAllCourtsFromDatabase = syncAllCourtsFromDatabase;

