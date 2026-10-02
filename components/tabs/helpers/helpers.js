window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs['helpers'] = `<div class="form-container">
                    <div class="section-header-row">
    <div class="section-title-box">
        <div class="section-icon-badge"><i class="fa-solid fa-id-card-clip"></i></div>
        <div>
            <h3>Court Staff & Helpers Directory</h3>
            <p class="section-subtitle">Chambers directory for court readers, clerks, process servers, and contact staff</p>
            <div class="header-chips-row">
                <button type="button" class="header-chip-btn" onclick="showTab('courts')"><i class="fa-solid fa-building-columns"></i> Courts</button>
            </div>
        </div>
    </div>
</div>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span id="helpersCloudStatusBadge" class="db-live-badge" style="font-size: 11px; padding: 4px 8px;">🟢 Cloud Ready</span>
                            <button type="button" class="secondary-btn" onclick="showTab('courts')" style="height: 38px; padding: 0 14px; font-size: 12.5px; margin: 0; display: inline-flex; align-items: center; gap: 6px;">
                                <i class="fa-solid fa-landmark"></i> <span>Manage Courts</span>
                            </button>
                            <span id="helpersTotalCountBadge" class="case-badge civil">0 Helpers</span>
                        </div>
                    </div>

                    <!-- Add New Helper Form Card -->
                    <div class="helper-add-card">
                        <div class="search-card-header">
                            <div class="search-header-info">
                                <span class="search-card-badge-icon helper-badge-icon"><i class="fa-solid fa-user-plus"></i></span>
                                <div>
                                    <h4 class="search-card-heading">Add New Court Worker / Helper</h4>
                                    <p class="search-card-subheading">Enter worker's full name, assigned court, position / role, and mobile number.</p>
                                </div>
                            </div>
                        </div>
                        <form id="helperAddForm" onsubmit="handleSaveHelper(event)" class="helper-form-grid">
                            <div class="helper-form-row">
                                <div class="helper-input-group">
                                    <label for="helperNameInput"><i class="fa-solid fa-user"></i> Worker / Staff Name *</label>
                                    <input type="text" id="helperNameInput" placeholder="Worker / staff name (e.g. Ramesh Chandra)..." required>
                                </div>
                                <div class="helper-input-group">
                                    <label for="helperCourtSelect"><i class="fa-solid fa-landmark"></i> Court / Forum *</label>
                                    <select id="helperCourtSelect" class="browser-default helper-select" required>
                                        <option value="" disabled selected>Select Court...</option>
                                    </select>
                                </div>
                            </div>
                            <div class="helper-form-row">
                                <div class="helper-input-group">
                                    <label for="helperPositionInput"><i class="fa-solid fa-briefcase"></i> Position / Role *</label>
                                    <input type="text" id="helperPositionInput" placeholder="e.g. Reader, Ahlmad, Peon, Steno, Munshi..." list="helperPositionSuggestions" required>
                                    <datalist id="helperPositionSuggestions">
                                        <option value="Reader (पेशकार)">
                                        <option value="Ahlmad (अहलमद)">
                                        <option value="Stenographer (स्टेनो)">
                                        <option value="Peon / Orderly (चपरासी)">
                                        <option value="Naib Court (नायब कोर्ट)">
                                        <option value="Munshi / Advocate Clerk (मुंशी)">
                                        <option value="Process Server (समन तामीलकर्ता)">
                                        <option value="Court Manager / Registrar">
                                        <option value="Typist / Data Entry Operator">
                                        <option value="Associate / Legal Assistant">
                                    </datalist>
                                </div>
                                <div class="helper-input-group">
                                    <label for="helperMobileInput"><i class="fa-solid fa-phone"></i> Mobile Number *</label>
                                    <input type="tel" id="helperMobileInput" placeholder="10-digit mobile (e.g. 9876543210)..." pattern="[0-9+\\- ]{10,15}" required>
                                </div>
                            </div>
                            <div class="helper-form-actions">
                                <button type="submit" id="saveHelperSubmitBtn" class="primary-btn helper-submit-btn">
                                    <i class="fa-solid fa-user-check"></i> <span>Save Worker to Directory</span>
                                </button>
                            </div>
                        </form>
                    </div>

                    <!-- Helpers Directory Search & Filter Toolbar -->
                    <div class="court-table-toolbar helper-table-toolbar">
                        <div class="search-field-box helper-search-box">
                            <span class="search-field-prefix-icon"><i class="fa-solid fa-magnifying-glass"></i></span>
                            <input type="text" id="helperSearchInput" placeholder="Search by name, court, position, or mobile..." oninput="filterHelpersTable(this.value)" enterkeyhint="search" autocomplete="off">
                        </div>
                        <div class="helper-toolbar-right">
                            <div class="helper-filter-court-box">
                                <select id="helperFilterCourtSelect" class="browser-default helper-select" onchange="filterHelpersTable()">
                                    <option value="">All Courts (All Forums)</option>
                                </select>
                            </div>
                            <button type="button" id="helpersSyncDbBtn" class="secondary-btn helper-export-btn" onclick="syncCourtHelpersFromCloud(true)" title="Fetch and synchronize court helpers from database">
                                <i class="fa-solid fa-arrows-rotate"></i> <span>Sync DB</span>
                            </button>
                            <button type="button" class="secondary-btn helper-export-btn" onclick="exportHelpersCsv()" title="Export helpers list as CSV">
                                <i class="fa-solid fa-file-csv"></i> <span>Export CSV</span>
                            </button>
                        </div>
                    </div>

                    <!-- Helpers Directory Cards -->
                    <div id="helpersCardsGrid" class="helper-cards-grid">
                        <!-- Populated dynamically -->
                    </div>
                </div>`;

// ==============================================================================
// Court Helpers & Staff Directory Engine
// ==============================================================================

var COURT_HELPERS_STORAGE_KEY = 'casebook_court_helpers';
var courtHelpersList = [];

function getCourtHelpersList() {
  try {
    const raw = localStorage.getItem(COURT_HELPERS_STORAGE_KEY);
    if (raw) {
      courtHelpersList = JSON.parse(raw);
      if (Array.isArray(courtHelpersList)) return courtHelpersList;
    }
  } catch (e) {
    console.error('Error reading court helpers:', e);
  }
  courtHelpersList = [];
  return courtHelpersList;
}

function saveCourtHelpersList(list) {
  courtHelpersList = list || [];
  try {
    localStorage.setItem(COURT_HELPERS_STORAGE_KEY, JSON.stringify(courtHelpersList));
  } catch (e) {
    console.error('Error saving court helpers:', e);
  }
  updateHelpersBadges();
}

function updateHelpersBadges() {
  const helpers = getCourtHelpersList();
  const count = helpers.length;
  const navBadge = document.getElementById('helpersNavCount');
  const totalBadge = document.getElementById('helpersTotalCountBadge');
  if (navBadge) navBadge.textContent = String(count);
  if (totalBadge) totalBadge.textContent = `${count} ${count === 1 ? 'Helper' : 'Helpers'} Registered`;
}

function updateHelpersCloudSyncIndicator(isSynced) {
  const badge = document.getElementById('helpersCloudStatusBadge');
  if (!badge) return;
  if (isSynced) {
    badge.textContent = '🟢 Cloud Synced';
    badge.className = 'db-live-badge';
    badge.style.background = '#f0fdf4';
    badge.style.color = '#15803d';
    badge.style.border = '1px solid #bbf7d0';
  } else {
    badge.textContent = '💾 Local Storage';
    badge.className = 'db-live-badge';
    badge.style.background = '#fefce8';
    badge.style.color = '#854d0e';
    badge.style.border = '1px solid #fef08a';
  }
}

async function syncCourtHelpersFromCloud(showToast = false) {
  const syncBtn = document.getElementById('helpersSyncDbBtn');
  const originalHtml = syncBtn ? syncBtn.innerHTML : '';
  if (syncBtn) {
    syncBtn.disabled = true;
    syncBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Syncing...</span>';
  }

  ensureSupabaseClient();
  if (!supabaseClient) {
    if (syncBtn) {
      syncBtn.disabled = false;
      syncBtn.innerHTML = originalHtml;
    }
    updateHelpersCloudSyncIndicator(false);
    if (showToast && typeof showToastNotification === 'function') {
      showToastNotification('⚠️ Cloud database not connected. Using local offline storage.', 2500);
    }
    return;
  }

  try {
    let res = await supabaseClient.from('court_helpers').select('*').order('created_at', { ascending: false });
    if (res && res.error) {
      // Fallback try table named 'helpers'
      res = await supabaseClient.from('helpers').select('*').order('created_at', { ascending: false });
    }

    if (res && res.data && !res.error) {
      const mapped = res.data.map(h => ({
        id: String(h.id || ('helper_' + Date.now())),
        name: h.name || '',
        court: h.court || '',
        position: h.position || '',
        mobile: h.mobile || '',
        createdAt: h.created_at || new Date().toISOString()
      }));

      courtHelpersList = mapped;
      try {
        localStorage.setItem(COURT_HELPERS_STORAGE_KEY, JSON.stringify(courtHelpersList));
      } catch (e) {}

      updateHelpersBadges();
      updateHelpersCloudSyncIndicator(true);
      renderHelpersTable();

      if (showToast && typeof showToastNotification === 'function') {
        showToastNotification(`✅ Fetched ${mapped.length} court staff records from database.`, 2500);
      }
    } else {
      updateHelpersCloudSyncIndicator(false);
      if (showToast && typeof showToastNotification === 'function') {
        showToastNotification('ℹ️ Database connected. No records found or table not yet created.', 2500);
      }
    }
  } catch (err) {
    console.warn('Error fetching court helpers from database:', err);
    updateHelpersCloudSyncIndicator(false);
    if (showToast && typeof showToastNotification === 'function') {
      showToastNotification('⚠️ Unable to sync with database: ' + (err.message || err), 2500);
    }
  } finally {
    if (syncBtn) {
      syncBtn.disabled = false;
      syncBtn.innerHTML = originalHtml || '<i class="fa-solid fa-arrows-rotate"></i> <span>Sync DB</span>';
    }
  }
}

function populateHelperCourtDropdowns() {
  const selects = [
    document.getElementById('helperCourtSelect'),
    document.getElementById('editHelperCourtSelect'),
    document.getElementById('helperFilterCourtSelect')
  ];

  // Unique sorted courts list
  const activeCourts = Array.from(new Set((courts || []).filter(c => c && c.trim())));
  activeCourts.sort((a, b) => a.localeCompare(b));

  selects.forEach(select => {
    if (!select) return;
    const isFilter = select.id === 'helperFilterCourtSelect';
    const currentVal = select.value;

    select.innerHTML = '';
    if (isFilter) {
      const allOpt = document.createElement('option');
      allOpt.value = '';
      allOpt.textContent = 'All Courts (All Forums)';
      select.appendChild(allOpt);
    } else {
      const defaultOpt = document.createElement('option');
      defaultOpt.value = '';
      defaultOpt.disabled = true;
      defaultOpt.selected = true;
      defaultOpt.textContent = 'Select Court / Forum...';
      select.appendChild(defaultOpt);

      const generalOpt = document.createElement('option');
      generalOpt.value = 'General / All Courts';
      generalOpt.textContent = 'General / All Courts';
      select.appendChild(generalOpt);
    }

    activeCourts.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c;
      opt.textContent = c;
      select.appendChild(opt);
    });

    if (currentVal && Array.from(select.options).some(o => o.value === currentVal)) {
      select.value = currentVal;
    }
  });
}

function renderHelpersTable(searchQuery = '') {
  const grid = document.getElementById('helpersCardsGrid');
  if (!grid) return;

  populateHelperCourtDropdowns();
  const helpers = getCourtHelpersList();
  const filterCourtSelect = document.getElementById('helperFilterCourtSelect');
  const courtFilterVal = (filterCourtSelect?.value || '').toLowerCase().trim();
  const query = (searchQuery || document.getElementById('helperSearchInput')?.value || '').toLowerCase().trim();

  let filtered = helpers.filter(h => {
    const nameMatch = (h.name || '').toLowerCase().includes(query);
    const courtMatch = (h.court || '').toLowerCase().includes(query);
    const posMatch = (h.position || '').toLowerCase().includes(query);
    const mobMatch = (h.mobile || '').replace(/\D/g, '').includes(query.replace(/\D/g, '')) || (h.mobile || '').includes(query);
    const textMatch = !query || nameMatch || courtMatch || posMatch || mobMatch;

    const courtDropMatch = !courtFilterVal || (h.court || '').toLowerCase().trim() === courtFilterVal;
    return textMatch && courtDropMatch;
  });

  grid.innerHTML = '';

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="helper-card helper-card-empty">
        <div style="font-size: 32px; margin-bottom: 8px; opacity: 0.6;"><i class="fa-solid fa-users-slash"></i></div>
        <div style="font-weight: 700; font-size: 15px; color: #334155;">No court helpers or workers found</div>
        <div style="font-size: 13px; margin-top: 4px;">${query || courtFilterVal ? 'Try adjusting your search or court filter.' : 'Add your first court staff member using the form above.'}</div>
      </div>
    `;
    updateHelpersBadges();
    return;
  }

  filtered.forEach((h) => {
    const initial = (h.name || 'W').trim().charAt(0).toUpperCase();
    const cleanMobile = (h.mobile || '').trim();
    const waDigits = cleanMobile.replace(/\D/g, '');
    const waLink = waDigits.length === 10 ? `https://wa.me/91${waDigits}` : `https://wa.me/${waDigits}`;

    const card = document.createElement('div');
    card.className = 'helper-card';

    card.innerHTML = `
      <div class="helper-card-top">
        <div class="helper-card-avatar">${escapeHtml(initial)}</div>
        <div class="helper-card-id">
          <div class="helper-card-name">${escapeHtml(h.name || '—')}</div>
          <div class="helper-card-role"><i class="fa-solid fa-briefcase"></i> ${escapeHtml(h.position || 'Staff')}</div>
        </div>
      </div>
      <div class="helper-card-court">
        <i class="fa-solid fa-landmark"></i>
        <span>${escapeHtml(h.court || 'General')}</span>
      </div>
      <div class="helper-card-contact">
        ${cleanMobile ? `
          <a href="tel:${escapeHtml(cleanMobile)}" class="helper-call-btn" title="Call ${escapeHtml(h.name)}">
            <i class="fa-solid fa-phone"></i> <span>${escapeHtml(cleanMobile)}</span>
          </a>
          <a href="${escapeHtml(waLink)}" target="_blank" rel="noopener noreferrer" class="helper-wa-btn" title="Chat on WhatsApp">
            <i class="fa-brands fa-whatsapp"></i>
          </a>
        ` : '<span style="color: #94a3b8; font-size: 13px;">No mobile provided</span>'}
      </div>
      <div class="helper-card-actions">
        <button type="button" class="court-btn-edit edit-helper-btn" title="Edit Staff Details">
          <i class="fa-solid fa-pen-to-square"></i><span class="btn-text"> Edit</span>
        </button>
        <button type="button" class="court-btn-delete delete-helper-btn" title="Delete Staff Member">
          <i class="fa-solid fa-trash-can"></i><span class="btn-text"> Delete</span>
        </button>
      </div>
    `;

    const editBtn = card.querySelector('.edit-helper-btn');
    const delBtn = card.querySelector('.delete-helper-btn');

    if (editBtn) {
      editBtn.addEventListener('click', () => openEditHelperModal(h.id));
    }
    if (delBtn) {
      delBtn.addEventListener('click', () => openDeleteHelperModal(h.id));
    }

    grid.appendChild(card);
  });

  updateHelpersBadges();
}

function filterHelpersTable(query) {
  renderHelpersTable(query);
}

async function handleSaveHelper(e) {
  if (e && e.preventDefault) e.preventDefault();

  const nameInput = document.getElementById('helperNameInput');
  const courtSelect = document.getElementById('helperCourtSelect');
  const positionInput = document.getElementById('helperPositionInput');
  const mobileInput = document.getElementById('helperMobileInput');
  const submitBtn = document.getElementById('saveHelperSubmitBtn');

  const name = (nameInput?.value || '').trim();
  const court = (courtSelect?.value || '').trim();
  const position = (positionInput?.value || '').trim();
  const mobile = (mobileInput?.value || '').trim();

  if (!name) {
    if (typeof showToastNotification === 'function') {
      showToastNotification('⚠️ Please enter the worker / staff name.', 2500);
    }
    nameInput?.focus();
    return;
  }

  if (!court) {
    if (typeof showToastNotification === 'function') {
      showToastNotification('⚠️ Please select the assigned court.', 2500);
    }
    courtSelect?.focus();
    return;
  }

  if (!position) {
    if (typeof showToastNotification === 'function') {
      showToastNotification('⚠️ Please enter the position / role.', 2500);
    }
    positionInput?.focus();
    return;
  }

  if (!mobile) {
    if (typeof showToastNotification === 'function') {
      showToastNotification('⚠️ Please enter the mobile number.', 2500);
    }
    mobileInput?.focus();
    return;
  }

  const helperId = 'helper_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
  const newHelper = {
    id: helperId,
    name,
    court,
    position,
    mobile,
    createdAt: new Date().toISOString()
  };

  const currentList = getCourtHelpersList();
  currentList.unshift(newHelper);
  saveCourtHelpersList(currentList);

  // Reset form
  if (nameInput) nameInput.value = '';
  if (positionInput) positionInput.value = '';
  if (mobileInput) mobileInput.value = '';
  if (courtSelect) courtSelect.selectedIndex = 0;

  renderHelpersTable();

  // Asynchronously insert into Supabase court_helpers
  ensureSupabaseClient();
  if (supabaseClient) {
    try {
      if (submitBtn) submitBtn.disabled = true;
      const { data, error } = await supabaseClient.from('court_helpers').insert([{
        name,
        court,
        position,
        mobile
      }]).select();

      if (!error && data && data[0] && data[0].id) {
        newHelper.id = String(data[0].id);
        saveCourtHelpersList(currentList);
        updateHelpersCloudSyncIndicator(true);
      }
    } catch (err) {
      console.warn('Notice: Insert to Supabase court_helpers:', err);
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  }

  await performPostCrudRefresh();

  if (typeof showToastNotification === 'function') {
    showToastNotification(`✅ Staff member "${name}" (${position}) saved successfully!`, 3000);
  } else if (typeof M !== 'undefined' && M.toast) {
    M.toast({ html: `✅ Staff member "${name}" saved!` });
  }
}

function openEditHelperModal(helperId) {
  const helpers = getCourtHelpersList();
  const helper = helpers.find(h => h.id === helperId);
  if (!helper) return;

  const modal = document.getElementById('editHelperModal');
  const idInput = document.getElementById('editHelperId');
  const nameInput = document.getElementById('editHelperNameInput');
  const courtSelect = document.getElementById('editHelperCourtSelect');
  const positionInput = document.getElementById('editHelperPositionInput');
  const mobileInput = document.getElementById('editHelperMobileInput');
  const errorDiv = document.getElementById('editHelperErrorMsg');

  if (!modal) return;

  populateHelperCourtDropdowns();

  if (idInput) idInput.value = helper.id;
  if (nameInput) nameInput.value = helper.name || '';
  if (positionInput) positionInput.value = helper.position || '';
  if (mobileInput) mobileInput.value = helper.mobile || '';

  if (courtSelect) {
    let found = false;
    Array.from(courtSelect.options).forEach(opt => {
      if (opt.value.toLowerCase() === (helper.court || '').toLowerCase()) {
        opt.selected = true;
        found = true;
      }
    });
    if (!found && helper.court) {
      const newOpt = document.createElement('option');
      newOpt.value = helper.court;
      newOpt.textContent = helper.court;
      newOpt.selected = true;
      courtSelect.appendChild(newOpt);
    }
  }

  if (errorDiv) {
    errorDiv.textContent = '';
    errorDiv.classList.add('hidden');
  }

  modal.classList.remove('hidden');
  setTimeout(() => {
    nameInput?.focus();
  }, 100);
}

function closeEditHelperModal() {
  const modal = document.getElementById('editHelperModal');
  if (modal) modal.classList.add('hidden');
}

async function confirmSaveEditedHelper() {
  const idInput = document.getElementById('editHelperId');
  const nameInput = document.getElementById('editHelperNameInput');
  const courtSelect = document.getElementById('editHelperCourtSelect');
  const positionInput = document.getElementById('editHelperPositionInput');
  const mobileInput = document.getElementById('editHelperMobileInput');
  const errorDiv = document.getElementById('editHelperErrorMsg');
  const saveBtn = document.getElementById('saveEditHelperBtn');

  const id = idInput?.value;
  const name = (nameInput?.value || '').trim();
  const court = (courtSelect?.value || '').trim();
  const position = (positionInput?.value || '').trim();
  const mobile = (mobileInput?.value || '').trim();

  if (!name || !court || !position || !mobile) {
    if (errorDiv) {
      errorDiv.textContent = 'Please fill out all required fields.';
      errorDiv.classList.remove('hidden');
    }
    return;
  }

  const helpers = getCourtHelpersList();
  const index = helpers.findIndex(h => h.id === id);
  if (index === -1) {
    closeEditHelperModal();
    return;
  }

  helpers[index] = {
    ...helpers[index],
    name,
    court,
    position,
    mobile,
    updatedAt: new Date().toISOString()
  };

  saveCourtHelpersList(helpers);
  closeEditHelperModal();
  renderHelpersTable();

  // Asynchronously update in Supabase court_helpers
  ensureSupabaseClient();
  if (supabaseClient && id && !id.startsWith('helper_')) {
    try {
      if (saveBtn) saveBtn.disabled = true;
      await supabaseClient.from('court_helpers').update({
        name,
        court,
        position,
        mobile,
        updated_at: new Date().toISOString()
      }).eq('id', id);
      updateHelpersCloudSyncIndicator(true);
    } catch (err) {
      console.warn('Notice: Update to Supabase court_helpers:', err);
    } finally {
      if (saveBtn) saveBtn.disabled = false;
    }
  }

  await performPostCrudRefresh();

  if (typeof showToastNotification === 'function') {
    showToastNotification(`✅ Staff details for "${name}" updated successfully!`, 2500);
  }
}

function openDeleteHelperModal(helperId) {
  const helpers = getCourtHelpersList();
  const helper = helpers.find(h => h.id === helperId);
  if (!helper) return;

  const modal = document.getElementById('deleteHelperModal');
  const idInput = document.getElementById('deleteHelperTargetId');
  const nameSpan = document.getElementById('deleteHelperDisplayName');
  const errorDiv = document.getElementById('deleteHelperErrorMsg');

  if (!modal) {
    if (confirm(`Delete court staff member "${helper.name}"?`)) {
      const remaining = helpers.filter(h => h.id !== helperId);
      saveCourtHelpersList(remaining);
      renderHelpersTable();
    }
    return;
  }

  if (idInput) idInput.value = helper.id;
  if (nameSpan) nameSpan.textContent = `"${helper.name}" (${helper.position} • ${helper.court})`;
  if (errorDiv) {
    errorDiv.textContent = '';
    errorDiv.classList.add('hidden');
  }

  modal.classList.remove('hidden');
}

function closeDeleteHelperModal() {
  const modal = document.getElementById('deleteHelperModal');
  if (modal) modal.classList.add('hidden');
}

async function executeDeleteHelperConfirm() {
  const idInput = document.getElementById('deleteHelperTargetId');
  const id = idInput?.value;
  if (!id) {
    closeDeleteHelperModal();
    return;
  }

  const helpers = getCourtHelpersList();
  const target = helpers.find(h => h.id === id);
  const remaining = helpers.filter(h => h.id !== id);
  saveCourtHelpersList(remaining);

  closeDeleteHelperModal();
  renderHelpersTable();

  // Asynchronously delete from Supabase court_helpers
  ensureSupabaseClient();
  if (supabaseClient && id && !id.startsWith('helper_')) {
    try {
      await supabaseClient.from('court_helpers').delete().eq('id', id);
      updateHelpersCloudSyncIndicator(true);
    } catch (err) {
      console.warn('Notice: Delete from Supabase court_helpers:', err);
    }
  }

  await performPostCrudRefresh();

  if (typeof showToastNotification === 'function') {
    showToastNotification(`✅ Staff member "${target ? target.name : 'Helper'}" removed from directory.`, 2500);
  }
}

function exportHelpersCsv() {
  const helpers = getCourtHelpersList();
  if (helpers.length === 0) {
    if (typeof showToastNotification === 'function') {
      showToastNotification('⚠️ No court staff records to export.', 2200);
    }
    return;
  }

  let csvContent = 'data:text/csv;charset=utf-8,';
  csvContent += 'Sr No,Staff Name,Position,Assigned Court,Mobile Number,Date Added\r\n';

  helpers.forEach((h, idx) => {
    const row = [
      idx + 1,
      `"${(h.name || '').replace(/"/g, '""')}"`,
      `"${(h.position || '').replace(/"/g, '""')}"`,
      `"${(h.court || '').replace(/"/g, '""')}"`,
      `"${(h.mobile || '').replace(/"/g, '""')}"`,
      `"${(h.createdAt || '').split('T')[0]}"`
    ];
    csvContent += row.join(',') + '\r\n';
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `Court_Helpers_Directory_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  if (typeof showToastNotification === 'function') {
    showToastNotification('✅ Court staff directory exported to CSV.', 2500);
  }
}

if (typeof handleSaveHelper !== 'undefined') window.handleSaveHelper = handleSaveHelper;
if (typeof renderHelpersTable !== 'undefined') window.renderHelpersTable = renderHelpersTable;
if (typeof filterHelpersTable !== 'undefined') window.filterHelpersTable = filterHelpersTable;
if (typeof openEditHelperModal !== 'undefined') window.openEditHelperModal = openEditHelperModal;
if (typeof closeEditHelperModal !== 'undefined') window.closeEditHelperModal = closeEditHelperModal;
if (typeof confirmSaveEditedHelper !== 'undefined') window.confirmSaveEditedHelper = confirmSaveEditedHelper;
if (typeof openDeleteHelperModal !== 'undefined') window.openDeleteHelperModal = openDeleteHelperModal;
if (typeof closeDeleteHelperModal !== 'undefined') window.closeDeleteHelperModal = closeDeleteHelperModal;
if (typeof executeDeleteHelperConfirm !== 'undefined') window.executeDeleteHelperConfirm = executeDeleteHelperConfirm;
if (typeof exportHelpersCsv !== 'undefined') window.exportHelpersCsv = exportHelpersCsv;
if (typeof syncCourtHelpersFromCloud !== 'undefined') window.syncCourtHelpersFromCloud = syncCourtHelpersFromCloud;
if (typeof updateHelpersCloudSyncIndicator !== 'undefined') window.updateHelpersCloudSyncIndicator = updateHelpersCloudSyncIndicator;

