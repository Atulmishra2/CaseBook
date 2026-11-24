window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs['helpers'] = `<div class="helpers-tab-container">
  <!-- 1. Contacts Master Calendar Header Banner -->
  <header class="board-head helpers-master-head contacts-header-section" data-helpers-scope>
    <div class="head-left">
      <h1 class="h1">
        <span class="crest" aria-hidden="true">
          <svg class="lucide lucide-contact" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 2v2"/><path d="M7 22v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/><path d="M8 2v2"/><circle cx="12" cy="11" r="4"/><rect x="3" y="4" width="18" height="18" rx="2"/></svg>
        </span>
        <span class="h1-text contacts-title" id="contactsMainTitle">Contacts</span>
      </h1>
      <div class="sub" id="contactsHeaderSubline">
        <b class="contacts-sub-desc">Chambers directory for court readers, clerks, stenos, and support staff</b>
        <span class="contacts-sub-sep">·</span>
        <span id="helpersTotalCountBadge" class="contacts-count-pill header-badge">0 Helpers Registered</span>
      </div>
    </div>

    <div class="head-actions contacts-header-actions">
      <!-- + Add Contact Primary Button (Inline; Icon-only on small screens) -->
      <button type="button" class="contacts-add-btn primary-btn" onclick="openAddHelperModal()" title="Add Contact" aria-label="Add Contact">
        <svg class="lucide lucide-plus" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        <span class="contacts-add-btn-text">Add Contact</span>
      </button>
    </div>
  </header>

  <!-- 2. Search & Filter Bar -->
  <div class="contacts-toolbar">
    <div class="contacts-search-box">
      <svg class="lucide lucide-search" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      <input type="text" id="helperSearchInput" class="contacts-search-input" placeholder="Search by name, role, court, or mobile number..." oninput="filterHelpersTable(this.value)" enterkeyhint="search" autocomplete="off">
    </div>

    <div class="contacts-toolbar-filters">
      <!-- Court Custom Dropdown (Zero Icon-Text Overlap) -->
      <div class="contacts-custom-dropdown" id="contactsCourtCustomDropdown">
        <button
          type="button"
          class="contacts-dropdown-trigger"
          id="contactsCourtDropdownTrigger"
          aria-haspopup="listbox"
          aria-expanded="false"
          onclick="toggleContactsCourtDropdown(event)"
          title="Filter by court or forum"
        >
          <span class="contacts-dropdown-prefix-icon">
            <svg class="lucide lucide-landmark" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>
          </span>
          <span class="contacts-dropdown-label" id="contactsCourtDropdownLabel">All Courts (All Forums)</span>
          <span class="contacts-dropdown-suffix-icon">
            <svg class="lucide lucide-chevron-down" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </span>
        </button>

        <div class="contacts-dropdown-menu" id="contactsCourtDropdownMenu">
          <div class="contacts-dropdown-search-wrap">
            <svg class="lucide lucide-search" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input
              type="text"
              class="contacts-dropdown-search-input"
              id="contactsCourtDropdownSearch"
              placeholder="Search court or forum..."
              autocomplete="off"
              oninput="filterContactsCourtDropdownItems(this.value)"
              onclick="event.stopPropagation()"
            />
          </div>
          <ul class="contacts-dropdown-list custom-scrollbar" id="contactsCourtDropdownList" role="listbox">
            <!-- Populated dynamically by renderContactsCourtCustomDropdown() -->
          </ul>
        </div>

        <!-- Hidden native select for backward compatibility & vitest tests -->
        <select id="helperFilterCourtSelect" class="contacts-filter-select-hidden" onchange="filterHelpersTable()">
          <option value="">All Courts (All Forums)</option>
        </select>
      </div>

      <!-- Sync DB Button -->
      <button type="button" id="helpersSyncDbBtn" class="contacts-secondary-btn" onclick="syncCourtHelpersFromCloud(true)" title="Fetch and synchronize from cloud database">
        <svg class="lucide lucide-refresh-cw" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>
        <span>Sync</span>
      </button>

      <!-- Export CSV Button -->
      <button type="button" class="contacts-secondary-btn" onclick="exportHelpersCsv()" title="Export contacts list to CSV">
        <svg class="lucide lucide-file-spreadsheet" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M8 13h2"/><path d="M14 13h2"/><path d="M8 17h2"/><path d="M14 17h2"/></svg>
        <span>Export</span>
      </button>
    </div>
  </div>

  <!-- 3. Contacts Cards Grid -->
  <div id="helpersCardsGrid" class="contacts-cards-grid">
    <!-- Populated dynamically by renderHelpersTable() -->
  </div>

  <!-- 4. Add Contact Modal (Respecting CaseBook modal design system) -->
  <div id="addHelperModal" class="modal-overlay hidden" role="dialog" aria-modal="true" aria-labelledby="addHelperModalTitle" onclick="if (event.target === this) closeAddHelperModal();">
    <div class="modal-card helper-modal-card">
      <div class="modal-header">
        <div class="modal-header-info">
          <div class="modal-icon-badge">
            <svg class="lucide lucide-user-plus" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
          </div>
          <div>
            <h3 id="addHelperModalTitle">Add Contact</h3>
            <p class="modal-subtitle">Enter worker's full name, assigned court, position, and mobile number</p>
          </div>
        </div>
        <button type="button" class="modal-close-btn" onclick="closeAddHelperModal()" aria-label="Close dialog">
          <svg class="lucide lucide-x" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
      <form id="helperAddForm" onsubmit="handleSaveHelper(event)" class="helper-modal-form">
        <div class="modal-body">
          <div id="addHelperErrorMsg" class="helper-modal-error hidden"></div>
          <div class="helper-form-grid">
            <div class="helper-input-group">
              <label for="helperNameInput" class="helper-field-label">Staff / Worker Name <span class="required-star">*</span></label>
              <input type="text" id="helperNameInput" class="helper-input-field" placeholder="e.g. Ramesh Chandra" required autocomplete="off">
            </div>
            <div class="helper-input-group">
              <label for="helperCourtSelect" class="helper-field-label">Court / Forum <span class="required-star">*</span></label>
              <select id="helperCourtSelect" class="helper-select-field" required>
                <option value="" disabled selected>Select Court / Forum...</option>
              </select>
            </div>
            <div class="helper-input-group">
              <label for="helperPositionInput" class="helper-field-label">Position / Role <span class="required-star">*</span></label>
              <input type="text" id="helperPositionInput" class="helper-input-field" placeholder="e.g. Reader, Ahlmad, Peon, Steno" list="helperPositionSuggestions" required autocomplete="off">
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
              <label for="helperMobileInput" class="helper-field-label">Mobile Number <span class="required-star">*</span></label>
              <input type="tel" id="helperMobileInput" class="helper-input-field" placeholder="10-digit mobile (e.g. 9876543210)" pattern="[0-9+\- ]{10,15}" required autocomplete="off">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="helper-btn-secondary" onclick="closeAddHelperModal()">Cancel</button>
          <button type="submit" id="saveHelperSubmitBtn" class="helper-btn-primary">
            <svg class="lucide lucide-check" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            <span>Save Contact</span>
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- 5. Edit Contact Modal -->
  <div id="editHelperModal" class="modal-overlay hidden" role="dialog" aria-modal="true" aria-labelledby="editHelperModalTitle" onclick="if (event.target === this) closeEditHelperModal();">
    <div class="modal-card helper-modal-card">
      <div class="modal-header">
        <div class="modal-header-info">
          <div class="modal-icon-badge">
            <svg class="lucide lucide-file-pen" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z"/></svg>
          </div>
          <div>
            <h3 id="editHelperModalTitle">Edit Contact Details</h3>
            <p class="modal-subtitle">Update contact details and court assignment</p>
          </div>
        </div>
        <button type="button" class="modal-close-btn" onclick="closeEditHelperModal()" aria-label="Close dialog">
          <svg class="lucide lucide-x" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
      <div class="modal-body">
        <input type="hidden" id="editHelperId">
        <div id="editHelperErrorMsg" class="helper-modal-error hidden"></div>
        <div class="helper-form-grid">
          <div class="helper-input-group">
            <label for="editHelperNameInput" class="helper-field-label">Staff / Worker Name <span class="required-star">*</span></label>
            <input type="text" id="editHelperNameInput" class="helper-input-field" required>
          </div>
          <div class="helper-input-group">
            <label for="editHelperCourtSelect" class="helper-field-label">Assigned Court <span class="required-star">*</span></label>
            <select id="editHelperCourtSelect" class="helper-select-field" required></select>
          </div>
          <div class="helper-input-group">
            <label for="editHelperPositionInput" class="helper-field-label">Position / Role <span class="required-star">*</span></label>
            <input type="text" id="editHelperPositionInput" class="helper-input-field" list="helperPositionSuggestions" required>
          </div>
          <div class="helper-input-group">
            <label for="editHelperMobileInput" class="helper-field-label">Mobile Number <span class="required-star">*</span></label>
            <input type="tel" id="editHelperMobileInput" class="helper-input-field" pattern="[0-9+\- ]{10,15}" required>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="helper-btn-secondary" onclick="closeEditHelperModal()">Cancel</button>
        <button type="button" id="saveEditHelperBtn" class="helper-btn-primary" onclick="confirmSaveEditedHelper()">
          <svg class="lucide lucide-check" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
          <span>Save Changes</span>
        </button>
      </div>
    </div>
  </div>

  <!-- 6. Delete Contact Confirmation Modal -->
  <div id="deleteHelperModal" class="modal-overlay hidden" role="dialog" aria-modal="true" aria-labelledby="deleteHelperModalTitle" onclick="if (event.target === this) closeDeleteHelperModal();">
    <div class="modal-card helper-modal-card helper-modal-card-sm">
      <div class="modal-header modal-header-danger">
        <div class="modal-header-info">
          <div class="modal-icon-badge modal-badge-danger">
            <svg class="lucide lucide-trash-2" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
          </div>
          <div>
            <h3 id="deleteHelperModalTitle">Delete Contact</h3>
            <p class="modal-subtitle">This action cannot be undone</p>
          </div>
        </div>
        <button type="button" class="modal-close-btn" onclick="closeDeleteHelperModal()" aria-label="Close dialog">
          <svg class="lucide lucide-x" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
      <div class="modal-body">
        <input type="hidden" id="deleteHelperTargetId">
        <p class="helper-delete-warning-text">Are you sure you want to remove <strong id="deleteHelperDisplayName">this staff member</strong> from your directory?</p>
        <div id="deleteHelperErrorMsg" class="helper-modal-error hidden"></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="helper-btn-secondary" onclick="closeDeleteHelperModal()">Cancel</button>
        <button type="button" class="helper-btn-danger" onclick="executeDeleteHelperConfirm()">
          <svg class="lucide lucide-trash-2" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
          <span>Delete Record</span>
        </button>
      </div>
    </div>
  </div>
</div>`;

// ==============================================================================
// Court Staff & Helpers (Contacts) Directory Engine
// Clean, modern SaaS UI architecture following enterprise UI/UX principles
// ==============================================================================

var COURT_HELPERS_STORAGE_KEY = 'casebook_court_helpers';
var courtHelpersList = [];

// Soft pastel palettes for contact avatars (remapped for light and dark theme)
var PASTEL_PALETTES = [
  { key: 'blue', bg: '#eff6ff', color: '#2563eb', border: '#bfdbfe' },
  { key: 'purple', bg: '#f5f3ff', color: '#7c3aed', border: '#ddd6fe' },
  { key: 'emerald', bg: '#ecfdf5', color: '#059669', border: '#a7f3d0' },
  { key: 'rose', bg: '#fff1f2', color: '#e11d48', border: '#fecdd3' },
  { key: 'amber', bg: '#fffbeb', color: '#d97706', border: '#fde68a' },
  { key: 'teal', bg: '#f0fdfa', color: '#0d9488', border: '#99f6e4' },
  { key: 'violet', bg: '#faf5ff', color: '#9333ea', border: '#e9d5ff' },
  { key: 'cyan', bg: '#ecfeff', color: '#0891b2', border: '#a5f3fc' }
];

function getPastelColor(str) {
  let hash = 0;
  const s = String(str || 'Contact');
  for (let i = 0; i < s.length; i++) {
    hash = s.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % PASTEL_PALETTES.length;
  return PASTEL_PALETTES[index];
}

function getContactInitials(name) {
  if (!name || typeof name !== 'string') return '??';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '??';
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

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
  if (totalBadge) {
    totalBadge.textContent = `${count} ${count === 1 ? 'Helper Registered' : 'Helpers Registered'}`;
  }
}

function updateHelpersCloudSyncIndicator(isSynced) {
  const badge = document.getElementById('helpersCloudStatusBadge');
  if (!badge) return;
  if (isSynced) {
    badge.innerHTML = '<span class="contacts-status-dot"></span><span>Cloud Synced</span>';
    badge.classList.remove('status-offline');
    badge.classList.add('status-synced');
  } else {
    badge.innerHTML = '<span class="contacts-status-dot offline"></span><span>Local Storage</span>';
    badge.classList.remove('status-synced');
    badge.classList.add('status-offline');
  }
}

function getHelpersCourts() {
  const courtsSet = new Set();
  if (typeof window !== 'undefined' && Array.isArray(window.courts)) {
    window.courts.forEach(c => { if (c && c.trim()) courtsSet.add(c.trim()); });
  }
  if (typeof courts !== 'undefined' && Array.isArray(courts)) {
    courts.forEach(c => { if (c && c.trim()) courtsSet.add(c.trim()); });
  }
  // Also include courts from registered contacts so custom or historical forums are never lost
  try {
    const list = getCourtHelpersList();
    if (Array.isArray(list)) {
      list.forEach(h => {
        if (h && h.court && h.court.trim() && h.court !== 'General / All Courts') {
          courtsSet.add(h.court.trim());
        }
      });
    }
  } catch (err) {}
  return Array.from(courtsSet);
}

async function syncCourtHelpersFromCloud(showToast = false) {
  const syncBtn = document.getElementById('helpersSyncDbBtn');
  const originalHtml = syncBtn ? syncBtn.innerHTML : '';
  if (syncBtn) {
    syncBtn.disabled = true;
    syncBtn.innerHTML = '<svg class="lucide lucide-refresh-cw" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg> <span>Syncing...</span>';
  }

  if (typeof ensureSupabaseClient === 'function') ensureSupabaseClient();
  const sb = (typeof supabaseClient !== 'undefined') ? supabaseClient : (typeof window !== 'undefined' ? window.supabaseClient : null);
  if (!sb) {
    if (syncBtn) {
      syncBtn.disabled = false;
      syncBtn.innerHTML = originalHtml;
    }
    updateHelpersCloudSyncIndicator(false);
    if (showToast && typeof showToastNotification === 'function') {
      showToastNotification('ℹ️ Cloud sync offline: Supabase not configured, using local storage.', 2500);
    }
    return;
  }

  try {
    const { data, error } = await sb
      .from('court_helpers')
      .select('*')
      .order('name', { ascending: true });

    if (!error && Array.isArray(data)) {
      const mapped = data.map(h => ({
        id: String(h.id),
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
        showToastNotification(`✅ Synced ${mapped.length} contacts from database.`, 2500);
      }
    } else {
      updateHelpersCloudSyncIndicator(false);
      if (showToast && typeof showToastNotification === 'function') {
        showToastNotification('ℹ️ Connected to database. No records found or table not created yet.', 2500);
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
      syncBtn.innerHTML = originalHtml || '<svg class="lucide lucide-refresh-cw" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg> <span>Sync</span>';
    }
  }
}

function populateHelperCourtDropdowns() {
  const selects = [
    document.getElementById('helperCourtSelect'),
    document.getElementById('editHelperCourtSelect'),
    document.getElementById('helperFilterCourtSelect')
  ];

  const activeCourts = Array.from(new Set(getHelpersCourts().filter(c => c && c.trim())));
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

  renderContactsCourtCustomDropdown();
}

// ==============================================================================
// Custom Dropdown Engine (Court / Forum Filter)
// Zero Icon-Text Overlap & Keyboard / Touch Accessibility
// ==============================================================================

function toggleContactsCourtDropdown(e) {
  if (e && e.stopPropagation) e.stopPropagation();
  const dd = document.getElementById('contactsCourtCustomDropdown');
  if (!dd) return;
  const isOpened = dd.classList.contains('open');
  if (isOpened) {
    closeContactsCourtDropdown();
  } else {
    dd.classList.add('open');
    const trigger = document.getElementById('contactsCourtDropdownTrigger');
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
    const searchInput = document.getElementById('contactsCourtDropdownSearch');
    if (searchInput) {
      searchInput.value = '';
      renderContactsCourtCustomDropdown();
      setTimeout(() => searchInput.focus(), 50);
    }
  }
}

function closeContactsCourtDropdown() {
  const dd = document.getElementById('contactsCourtCustomDropdown');
  if (!dd) return;
  dd.classList.remove('open');
  const trigger = document.getElementById('contactsCourtDropdownTrigger');
  if (trigger) trigger.setAttribute('aria-expanded', 'false');
}

function selectContactsCourtOption(courtVal) {
  const select = document.getElementById('helperFilterCourtSelect');
  if (select) {
    select.value = courtVal;
  }
  updateContactsCourtDropdownLabel(courtVal);
  closeContactsCourtDropdown();
  filterHelpersTable();
}

function updateContactsCourtDropdownLabel(courtVal) {
  const label = document.getElementById('contactsCourtDropdownLabel');
  if (!label) return;
  const select = document.getElementById('helperFilterCourtSelect');
  const val = typeof courtVal === 'string' ? courtVal : (select ? select.value : '');
  label.textContent = val ? val : 'All Courts (All Forums)';
  label.title = label.textContent;
}

function filterContactsCourtDropdownItems(query) {
  renderContactsCourtCustomDropdown(query);
}

function renderContactsCourtCustomDropdown(searchQuery = '') {
  const listEl = document.getElementById('contactsCourtDropdownList');
  if (!listEl) return;

  const currentVal = document.getElementById('helperFilterCourtSelect')?.value || '';
  updateContactsCourtDropdownLabel(currentVal);

  const activeCourts = Array.from(new Set(getHelpersCourts().filter(c => c && c.trim())));
  activeCourts.sort((a, b) => a.localeCompare(b));

  const q = (searchQuery || '').toLowerCase().trim();
  const esc = typeof escapeHtml === 'function' ? escapeHtml : str => String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  listEl.innerHTML = '';

  // 1. "All Courts (All Forums)" option
  if (!q || 'all courts (all forums)'.includes(q) || 'all'.includes(q)) {
    const isAllSelected = !currentVal;
    const allItem = document.createElement('li');
    allItem.className = `contacts-dropdown-item ${isAllSelected ? 'is-selected' : ''}`;
    allItem.setAttribute('role', 'option');
    allItem.setAttribute('aria-selected', isAllSelected ? 'true' : 'false');
    allItem.setAttribute('data-value', '');
    allItem.innerHTML = `
      <span class="contacts-dropdown-item-text">All Courts (All Forums)</span>
      ${isAllSelected ? '<svg class="lucide lucide-check" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>' : ''}
    `;
    allItem.addEventListener('click', (e) => {
      e.stopPropagation();
      selectContactsCourtOption('');
    });
    listEl.appendChild(allItem);
  }

  // 2. Individual court options
  let matchCount = 0;
  activeCourts.forEach(c => {
    if (q && !c.toLowerCase().includes(q)) return;
    matchCount++;
    const isSelected = currentVal === c;
    const item = document.createElement('li');
    item.className = `contacts-dropdown-item ${isSelected ? 'is-selected' : ''}`;
    item.setAttribute('role', 'option');
    item.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    item.setAttribute('data-value', c);
    item.setAttribute('title', c);
    item.innerHTML = `
      <span class="contacts-dropdown-item-text">${esc(c)}</span>
      ${isSelected ? '<svg class="lucide lucide-check" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>' : ''}
    `;
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      selectContactsCourtOption(c);
    });
    listEl.appendChild(item);
  });

  if (!listEl.children.length) {
    const empty = document.createElement('li');
    empty.className = 'contacts-dropdown-empty';
    empty.textContent = 'No matching courts found';
    listEl.appendChild(empty);
  }
}

// Global click & Escape handlers for Contacts dropdown
if (typeof document !== 'undefined' && !window._contactsCourtDropdownListenerAttached) {
  window._contactsCourtDropdownListenerAttached = true;
  document.addEventListener('click', (e) => {
    const dd = document.getElementById('contactsCourtCustomDropdown');
    if (dd && dd.classList.contains('open') && !dd.contains(e.target)) {
      closeContactsCourtDropdown();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeContactsCourtDropdown();
    }
  });
}

// Expose dropdown functions to window
window.toggleContactsCourtDropdown = toggleContactsCourtDropdown;
window.closeContactsCourtDropdown = closeContactsCourtDropdown;
window.selectContactsCourtOption = selectContactsCourtOption;
window.filterContactsCourtDropdownItems = filterContactsCourtDropdownItems;
window.renderContactsCourtCustomDropdown = renderContactsCourtCustomDropdown;
window.updateContactsCourtDropdownLabel = updateContactsCourtDropdownLabel;

function handleContactsThemeToggle(e) {
  if (e && e.preventDefault) e.preventDefault();
  if (typeof toggleCaseBookTheme === 'function') {
    toggleCaseBookTheme(e);
  } else {
    const isDark = document.documentElement.classList.contains('dark') || document.documentElement.getAttribute('data-theme') === 'dark';
    const nextDark = !isDark;
    document.documentElement.classList.toggle('dark', nextDark);
    document.documentElement.setAttribute('data-theme', nextDark ? 'dark' : 'light');
    try {
      localStorage.setItem('casebook-theme', nextDark ? 'dark' : 'light');
    } catch (err) {}
  }
  updateContactsThemeIcon();
}

function updateContactsThemeIcon() {
  const btn = document.getElementById('contactsThemeToggleBtn');
  if (!btn) return;
  const isDark = document.documentElement.classList.contains('dark') || document.documentElement.getAttribute('data-theme') === 'dark';
  const moon = btn.querySelector('.theme-icon-moon');
  const sun = btn.querySelector('.theme-icon-sun');
  const txt = btn.querySelector('.theme-toggle-text');
  if (moon && sun) {
    if (isDark) {
      moon.style.display = 'none';
      sun.style.display = 'inline-block';
      if (txt) txt.textContent = 'Light Mode';
    } else {
      moon.style.display = 'inline-block';
      sun.style.display = 'none';
      if (txt) txt.textContent = 'Dark Mode';
    }
  }
}

function renderHelpersTable(searchQuery = '') {
  const contentEl = document.querySelector('.content');
  if (contentEl) contentEl.classList.add('helpers-tab-active');

  const grid = document.getElementById('helpersCardsGrid');
  if (!grid) return;

  populateHelperCourtDropdowns();
  updateContactsThemeIcon();

  const helpers = getCourtHelpersList();
  const filterCourtSelect = document.getElementById('helperFilterCourtSelect');
  const courtFilterVal = (filterCourtSelect?.value || '').toLowerCase().trim();
  const query = (searchQuery || document.getElementById('helperSearchInput')?.value || '').toLowerCase().trim();

  let filtered = helpers.filter(h => {
    const nameMatch = (h.name || '').toLowerCase().includes(query);
    const courtMatch = (h.court || '').toLowerCase().includes(query);
    const posMatch = (h.position || '').toLowerCase().includes(query);
    const digitsQuery = query.replace(/\D/g, '');
    const mobMatch = (digitsQuery.length > 0 && (h.mobile || '').replace(/\D/g, '').includes(digitsQuery)) || (h.mobile || '').toLowerCase().includes(query);
    const textMatch = !query || nameMatch || courtMatch || posMatch || mobMatch;

    const courtDropMatch = !courtFilterVal || (h.court || '').toLowerCase().trim() === courtFilterVal;
    return textMatch && courtDropMatch;
  });

  grid.innerHTML = '';

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="contacts-empty-state">
        <div class="contacts-empty-icon">
          <svg class="lucide lucide-contact" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 2v2"/><path d="M7 22v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/><path d="M8 2v2"/><circle cx="12" cy="11" r="4"/><rect x="3" y="4" width="18" height="18" rx="2"/></svg>
        </div>
        <h3 class="contacts-empty-title">No court helpers or workers found</h3>
        <p class="contacts-empty-subtitle">${query || courtFilterVal ? 'Try adjusting your search criteria or court forum filter.' : 'Start building your chambers directory by adding your first contact.'}</p>
        <button type="button" class="contacts-empty-action-btn" onclick="openAddHelperModal()">
          <svg class="lucide lucide-plus" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          <span>Add First Contact</span>
        </button>
      </div>
    `;
    updateHelpersBadges();
    return;
  }

  const esc = typeof escapeHtml === 'function' ? escapeHtml : str => String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  filtered.forEach((h) => {
    const initials = getContactInitials(h.name);
    const palette = getPastelColor(h.name || h.id);
    const cleanMobile = (h.mobile || '').trim();
    const waDigits = cleanMobile.replace(/\D/g, '');
    const waLink = waDigits.length === 10 ? `https://wa.me/91${waDigits}` : `https://wa.me/${waDigits}`;

    const card = document.createElement('div');
    card.className = 'contact-card';
    card.setAttribute('data-id', h.id);

    card.innerHTML = `
      <!-- Top Action Menu (Edit / Delete) -->
      <div class="contact-card-header-actions">
        <button type="button" class="contact-menu-trigger-btn edit-helper-btn" title="Edit Contact" aria-label="Edit ${esc(h.name)}">
          <svg class="lucide lucide-pencil" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
        </button>
        <button type="button" class="contact-menu-trigger-btn delete-helper-btn contact-btn-danger" title="Delete Contact" aria-label="Delete ${esc(h.name)}">
          <svg class="lucide lucide-trash-2" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
        </button>
      </div>

      <!-- Circular Avatar (80x80px) with pastel background & bold initials -->
      <div class="contact-avatar" data-avatar-color="${esc(palette.key || 'blue')}"  >
        ${esc(initials)}
      </div>

      <!-- Contact Name in bold, dark sans-serif -->
      <h3 class="contact-name" title="${esc(h.name)}">${esc(h.name || '—')}</h3>

      <!-- Job Title / Role in smaller, lighter gray -->
      <div class="contact-role" title="${esc(h.position)}">${esc(h.position || 'Staff Member')}</div>

      <!-- Assigned Court / Forum Badge (Zero Overlap with flex layout) -->
      <div class="contact-court" title="${esc(h.court || 'General / All Courts')}">
        <svg class="lucide lucide-landmark" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>
        <span class="contact-court-text">${esc(h.court || 'General / All Courts')}</span>
      </div>

      <!-- Metadata Row: Tiny phone icon and phone number -->
      <div class="contact-meta-row" title="Phone: ${esc(cleanMobile || 'None')}">
        <svg class="lucide lucide-phone" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        <span class="contact-phone-text">${esc(cleanMobile || 'No phone number')}</span>
      </div>

      <!-- Full-Width Action Bar (Card Footer) with 3 minimal outline Lucide icons -->
      <div class="contact-card-footer">
        <!-- 1. Email / Message Icon -->
        <a href="mailto:?subject=Court%20Inquiry%20-%20${encodeURIComponent(h.name || '')}&body=Hello%20${encodeURIComponent(h.name || '')}%2C%0A%0A" class="contact-action-btn" title="Send Email / Message" aria-label="Email ${esc(h.name)}">
          <svg class="lucide lucide-mail" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
        </a>

        <!-- 2. Chat / WhatsApp Icon -->
        ${cleanMobile ? `
          <a href="${esc(waLink)}" target="_blank" rel="noopener noreferrer" class="contact-action-btn contact-action-chat" title="Chat on WhatsApp" aria-label="WhatsApp ${esc(h.name)}">
            <svg class="lucide lucide-message-square" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </a>
        ` : `
          <button type="button" class="contact-action-btn disabled" disabled title="No mobile number" aria-label="Chat disabled">
            <svg class="lucide lucide-message-square" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </button>
        `}

        <!-- 3. Call Icon -->
        ${cleanMobile ? `
          <a href="tel:${esc(cleanMobile)}" class="contact-action-btn contact-action-call" title="Call ${esc(h.name)}" aria-label="Call ${esc(h.name)}">
            <svg class="lucide lucide-phone" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </a>
        ` : `
          <button type="button" class="contact-action-btn disabled" disabled title="No mobile number" aria-label="Call disabled">
            <svg class="lucide lucide-phone" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </button>
        `}
      </div>
    `;

    const editBtn = card.querySelector('.edit-helper-btn');
    const delBtn = card.querySelector('.delete-helper-btn');

    if (editBtn) {
      editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openEditHelperModal(h.id);
      });
    }
    if (delBtn) {
      delBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openDeleteHelperModal(h.id);
      });
    }

    grid.appendChild(card);
  });

  updateHelpersBadges();
}

function filterHelpersTable(query) {
  updateContactsCourtDropdownLabel();
  renderHelpersTable(query);
}

// ==============================================================================
// Modal Management (Add, Edit, Delete)
// ==============================================================================

function openAddHelperModal() {
  const modal = document.getElementById('addHelperModal');
  const form = document.getElementById('helperAddForm');
  const errorDiv = document.getElementById('addHelperErrorMsg');
  const nameInput = document.getElementById('helperNameInput');

  if (form) form.reset();
  if (errorDiv) {
    errorDiv.textContent = '';
    errorDiv.classList.add('hidden');
  }

  populateHelperCourtDropdowns();

  if (modal) {
    modal.classList.remove('hidden');
    setTimeout(() => {
      nameInput?.focus();
    }, 80);
  }
}

function closeAddHelperModal() {
  const modal = document.getElementById('addHelperModal');
  if (modal) modal.classList.add('hidden');
}

async function handleSaveHelper(e) {
  if (e && e.preventDefault) e.preventDefault();

  const nameInput = document.getElementById('helperNameInput');
  const courtSelect = document.getElementById('helperCourtSelect');
  const positionInput = document.getElementById('helperPositionInput');
  const mobileInput = document.getElementById('helperMobileInput');
  const submitBtn = document.getElementById('saveHelperSubmitBtn');
  const errorDiv = document.getElementById('addHelperErrorMsg');

  const name = (nameInput?.value || '').trim();
  const court = (courtSelect?.value || '').trim();
  const position = (positionInput?.value || '').trim();
  const mobile = (mobileInput?.value || '').trim();

  if (!name) {
    if (errorDiv) {
      errorDiv.textContent = 'Please enter the worker / staff name.';
      errorDiv.classList.remove('hidden');
    }
    if (typeof showToastNotification === 'function') {
      showToastNotification('⚠️ Please enter the worker / staff name.', 2500);
    }
    nameInput?.focus();
    return;
  }

  if (!court) {
    if (errorDiv) {
      errorDiv.textContent = 'Please select the assigned court or forum.';
      errorDiv.classList.remove('hidden');
    }
    if (typeof showToastNotification === 'function') {
      showToastNotification('⚠️ Please select the assigned court.', 2500);
    }
    courtSelect?.focus();
    return;
  }

  if (!position) {
    if (errorDiv) {
      errorDiv.textContent = 'Please enter the position / role.';
      errorDiv.classList.remove('hidden');
    }
    if (typeof showToastNotification === 'function') {
      showToastNotification('⚠️ Please enter the position / role.', 2500);
    }
    positionInput?.focus();
    return;
  }

  if (!mobile) {
    if (errorDiv) {
      errorDiv.textContent = 'Please enter the mobile number.';
      errorDiv.classList.remove('hidden');
    }
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

  // Close modal and render updated cards
  closeAddHelperModal();
  renderHelpersTable();

  // Asynchronously insert into Supabase court_helpers
  if (typeof ensureSupabaseClient === 'function') ensureSupabaseClient();
  const sb = (typeof supabaseClient !== 'undefined') ? supabaseClient : (typeof window !== 'undefined' ? window.supabaseClient : null);
  if (sb) {
    try {
      if (submitBtn) submitBtn.disabled = true;
      const { data, error } = await sb.from('court_helpers').insert([{
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

  if (typeof performPostCrudRefresh === 'function') {
    await performPostCrudRefresh();
  } else if (typeof window !== 'undefined' && typeof window.performPostCrudRefresh === 'function') {
    await window.performPostCrudRefresh();
  }

  if (typeof showToastNotification === 'function') {
    showToastNotification(`✅ Contact "${name}" (${position}) saved successfully!`, 3000);
  } else if (typeof M !== 'undefined' && M.toast) {
    M.toast({ html: `✅ Contact "${name}" saved!` });
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
  }, 80);
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
  if (typeof ensureSupabaseClient === 'function') ensureSupabaseClient();
  const sb = (typeof supabaseClient !== 'undefined') ? supabaseClient : (typeof window !== 'undefined' ? window.supabaseClient : null);
  if (sb && id && !id.startsWith('helper_')) {
    try {
      if (saveBtn) saveBtn.disabled = true;
      await sb.from('court_helpers').update({
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

  if (typeof performPostCrudRefresh === 'function') {
    await performPostCrudRefresh();
  } else if (typeof window !== 'undefined' && typeof window.performPostCrudRefresh === 'function') {
    await window.performPostCrudRefresh();
  }

  if (typeof showToastNotification === 'function') {
    showToastNotification(`✅ Contact "${name}" updated successfully!`, 2500);
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
  if (typeof ensureSupabaseClient === 'function') ensureSupabaseClient();
  const sb = (typeof supabaseClient !== 'undefined') ? supabaseClient : (typeof window !== 'undefined' ? window.supabaseClient : null);
  if (sb && id && !id.startsWith('helper_')) {
    try {
      await sb.from('court_helpers').delete().eq('id', id);
      updateHelpersCloudSyncIndicator(true);
    } catch (err) {
      console.warn('Notice: Delete from Supabase court_helpers:', err);
    }
  }

  if (typeof performPostCrudRefresh === 'function') {
    await performPostCrudRefresh();
  } else if (typeof window !== 'undefined' && typeof window.performPostCrudRefresh === 'function') {
    await window.performPostCrudRefresh();
  }

  if (typeof showToastNotification === 'function') {
    showToastNotification(`✅ Staff member "${target ? target.name : 'Helper'}" removed from directory.`, 2500);
  }
}

function exportHelpersCsv() {
  const helpers = getCourtHelpersList();
  if (helpers.length === 0) {
    if (typeof showToastNotification === 'function') {
      showToastNotification('⚠️ No court contacts to export.', 2200);
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
  link.setAttribute('download', `Court_Contacts_Directory_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  if (typeof showToastNotification === 'function') {
    showToastNotification('✅ Court contacts directory exported to CSV.', 2500);
  }
}

// Global Escape listener for helper modals
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeAddHelperModal();
    closeEditHelperModal();
    closeDeleteHelperModal();
  }
});

// Expose functions to window for global access and testing
if (typeof openAddHelperModal !== 'undefined') window.openAddHelperModal = openAddHelperModal;
if (typeof closeAddHelperModal !== 'undefined') window.closeAddHelperModal = closeAddHelperModal;
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
if (typeof populateHelperCourtDropdowns !== 'undefined') window.populateHelperCourtDropdowns = populateHelperCourtDropdowns;
if (typeof handleContactsThemeToggle !== 'undefined') window.handleContactsThemeToggle = handleContactsThemeToggle;
