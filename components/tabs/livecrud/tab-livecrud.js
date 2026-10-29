window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs['livecrud'] = `<div class="livecrud-tab-container">
    <!-- PAGE HEADER (Clean Gradient Header with Icon, Title, and Right-Aligned View Toggle) -->
    <div class="page-header lc-page-header">
        <div class="ph-left">
            <div class="ph-icon">
                <iconify-icon icon="lucide:database"></iconify-icon>
            </div>
            <div>
                <div class="ph-title">Live Database Manager</div>
            </div>
        </div>

        <div class="ph-actions">
            <!-- Dual View Switcher (Cards vs Table) placed on the right side of the title -->
            <div class="view-toggle" role="group" aria-label="Switch display mode">
                <button type="button" class="active" id="liveCrudToggleCards" onclick="setLiveCrudViewMode('cards')" title="Switch to Cards View">
                    <iconify-icon icon="lucide:layout-grid"></iconify-icon> Cards
                </button>
                <button type="button" id="liveCrudToggleTable" onclick="setLiveCrudViewMode('table')" title="Switch to Table View">
                    <iconify-icon icon="lucide:table"></iconify-icon> Table
                </button>
            </div>
        </div>
    </div>

    <!-- Toolbar & Dynamic Filter Panel -->
    <div class="db-toolbar-card filters-panel">
        <div class="db-toolbar-row db-toolbar-top-row">
            <div class="db-table-selector-box">
                <label for="liveCrudTableSelect" class="db-inline-label">
                    <iconify-icon icon="lucide:database"></iconify-icon>
                    <span>Table:</span>
                </label>
                <div class="db-select-wrap">
                    <select id="liveCrudTableSelect" class="form-select db-select f-select">
                        <option value="civilcases">⚖️ Civil Cases</option>
                        <option value="statecases">🚨 State Cases</option>
                        <option value="criminalcases">🔒 Criminal Cases (Legacy)</option>
                        <option value="familycases">👨‍👩‍👧 Family Cases</option>
                        <option value="revenuecases">🌾 Revenue Cases</option>
                        <option value="misccivilcases">📑 Misc Civil Cases</option>
                        <option value="misccriminalcases">⚖️ Misc Criminal Cases</option>
                        <option value="complaintcases">📢 Complaint Cases</option>
                        <option value="hearings">📅 Hearings</option>
                        <option value="courts">🏛️ Courts</option>
                        <option value="court_helpers">🪪 Court Helpers</option>
                        <option value="case_todos">📝 Case Tasks</option>
                        <option value="case_transfers">🔄 Case Transfers</option>
                        <option value="transactions">💰 Virtual Account (Transactions)</option>
                        <option value="personal_transactions">👤 Personal Account (Wallet)</option>
                    </select>
                </div>
            </div>
            <div class="db-search-box">
                <div class="db-search-input-wrap">
                    <iconify-icon icon="lucide:search" class="db-search-icon"></iconify-icon>
                    <input type="text" id="liveCrudSearchInput" class="db-search-input" placeholder="Filter rows across all columns..." autocomplete="off">
                    <button type="button" id="liveCrudSearchClearBtn" class="search-clear-btn hidden" onclick="clearLiveCrudSearch()" title="Clear search">
                        <iconify-icon icon="lucide:x"></iconify-icon>
                    </button>
                </div>
            </div>
        </div>

        <!-- Dynamic Contextual Filters Row (Morphs based on selected table) -->
        <div class="filters-row lc-dynamic-filters-row" id="liveCrudDynamicFiltersRow">
            <!-- Populated dynamically via JS -->
        </div>

        <div class="db-toolbar-actions-row">
            <div class="db-stats-group">
                <span id="liveCrudTableBadge" class="lc-pill lc-pill-table">TABLE: CIVILCASES</span>
                <span id="liveCrudRowCountBadge" class="lc-pill lc-pill-rows">0 rows</span>
                <span id="liveCrudStatusBadge" class="lc-pill lc-pill-live">🟢 Supabase Live</span>
            </div>
            <div class="db-buttons-group">
                <button type="button" id="liveCrudRefreshBtn" class="secondary-btn db-action-btn" title="Fetch fresh records from Supabase">🔄 Refresh</button>
                <button type="button" id="liveCrudInsertBtn" class="primary-btn db-action-btn" title="Insert a new row into selected table">➕ Insert Row</button>
            </div>
        </div>
    </div>

    <!-- View 1: Row Cards Grid -->
    <div id="liveCrudCardsViewContainer" class="lc-cards-view-section">
        <div id="liveCrudRowsContainer" class="lc-rows-container">
            <div class="lc-empty">⏳ Loading table data…</div>
        </div>
    </div>

    <!-- View 2: Data Table View (Inherited from Cases Register table-card) -->
    <div id="liveCrudTableViewContainer" class="lc-table-view-section hidden">
        <div class="table-card">
            <!-- Table Top Controller -->
            <div class="table-top">
                <div class="entries-control">
                    <span>Show</span>
                    <select id="liveCrudPageSizeSelect" onchange="handleLiveCrudPageSizeChange(this.value)">
                        <option value="10">10</option>
                        <option value="25" selected>25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="all">All</option>
                    </select>
                    <span class="entries-label">entries per page</span>
                </div>
                <div class="showing-info" id="liveCrudTableCountBadge">Showing 0 of 0 rows</div>
            </div>

            <div class="table-scroll">
                <table class="data-table" id="liveCrudDataTable">
                    <thead id="liveCrudTableHead"></thead>
                    <tbody id="liveCrudTableBody"></tbody>
                </table>
            </div>

            <!-- Downside Pagination Bar -->
            <div class="pagination" id="liveCrudPaginationBar">
                <div class="page-info" id="liveCrudPaginationInfo">Showing 0 to 0 of 0 entries</div>
                <div class="page-btns" id="liveCrudPaginationControls"></div>
            </div>
        </div>
    </div>
</div>

<!-- Live CRUD Edit/Insert Modal -->
<div id="liveCrudFormModal" class="db-modal-backdrop hidden">
    <div class="db-modal-card">
        <div class="db-modal-header">
            <div class="db-modal-title-box">
                <span id="lcModalIcon" class="db-modal-icon">✏️</span>
                <div>
                    <h4 id="lcModalTitle">Edit Row</h4>
                    <p id="lcModalSubtitle" class="db-modal-subtitle">Update field values and save to Supabase.</p>
                </div>
            </div>
            <button type="button" id="lcModalCloseBtn" class="db-modal-close-btn" title="Close modal">✕</button>
        </div>
        <form id="liveCrudForm" class="db-record-form" onsubmit="return handleLiveCrudFormSubmit(event);">
            <input type="hidden" id="lcRecordId" value="">
            <input type="hidden" id="lcRecordAction" value="edit">
            <div id="lcDynamicFieldsGrid" class="form-grid-2col db-dynamic-fields-container">
                <!-- Populated dynamically from the row's columns -->
            </div>
            <div class="db-modal-footer">
                <button type="button" id="lcModalCancelBtn" class="secondary-btn">Cancel</button>
                <button type="submit" id="lcModalSubmitBtn" class="primary-btn">💾 Save to Database</button>
            </div>
        </form>
        <p id="lcModalStatusMsg" class="update-status-msg"></p>
    </div>
</div>
`;

// ==============================================================================
// Live CRUD (Simple) — Supabase Database Manager Tab
// Simple mobile/desktop interface: browse rows as cards, insert, edit, delete.
// ==============================================================================

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
if (typeof window !== 'undefined' && !window.escapeHtml) {
  window.escapeHtml = escapeHtml;
}

var allCaseTransfers = (typeof allCaseTransfers !== 'undefined' && Array.isArray(allCaseTransfers))
  ? allCaseTransfers
  : (typeof window !== 'undefined' && Array.isArray(window.allCaseTransfers) ? window.allCaseTransfers : []);
if (typeof window !== 'undefined') window.allCaseTransfers = allCaseTransfers;

function getLiveCrudAllCaseRecords() {
  if (typeof window !== 'undefined' && Array.isArray(window.allCaseRecords)) return window.allCaseRecords;
  if (typeof allCaseRecords !== 'undefined' && Array.isArray(allCaseRecords)) return allCaseRecords;
  return [];
}

function getLiveCrudPaisaTransactions() {
  if (typeof window !== 'undefined' && Array.isArray(window.allPaisaTransactions)) return window.allPaisaTransactions;
  if (typeof allPaisaTransactions !== 'undefined' && Array.isArray(allPaisaTransactions)) return allPaisaTransactions;
  return [];
}

function getLiveCrudPersonalTransactions() {
  if (typeof window !== 'undefined' && Array.isArray(window.allPersonalTransactions)) return window.allPersonalTransactions;
  if (typeof allPersonalTransactions !== 'undefined' && Array.isArray(allPersonalTransactions)) return allPersonalTransactions;
  return [];
}

var liveCrudCurrentTable = 'civilcases';
var liveCrudRows = [];
var liveCrudListenersWired = false;
var currentLiveCrudViewMode = (typeof localStorage !== 'undefined' ? localStorage.getItem('casebook_livecrud_view_mode') : null) || 'cards';
var liveCrudActiveFilters = {};
var liveCrudCurrentPage = 1;
var liveCrudPageSize = 25;

const LIVE_CRUD_FILTER_SCHEMAS = {
  civilcases: [
    { key: 'court_name', label: 'Court / Forum', icon: 'lucide:building-2' },
    { key: 'case_type', label: 'Case Type', icon: 'lucide:landmark' },
    { key: 'hearing_process', label: 'Stage / Process', icon: 'lucide:activity' }
  ],
  statecases: [
    { key: 'court_name', label: 'Court / Forum', icon: 'lucide:building-2' },
    { key: 'police_station', label: 'Police Station', icon: 'lucide:shield' },
    { key: 'hearing_process', label: 'Stage', icon: 'lucide:activity' }
  ],
  criminalcases: [
    { key: 'criminalCourtName', label: 'Court', icon: 'lucide:building-2' },
    { key: 'policeStation', label: 'Police Station', icon: 'lucide:shield' }
  ],
  familycases: [
    { key: 'court_name', label: 'Court', icon: 'lucide:building-2' },
    { key: 'hearing_process', label: 'Stage', icon: 'lucide:activity' }
  ],
  revenuecases: [
    { key: 'court_name', label: 'Court / Forum', icon: 'lucide:building-2' },
    { key: 'hearing_process', label: 'Stage', icon: 'lucide:activity' }
  ],
  hearings: [
    { key: 'court_name', label: 'Court', icon: 'lucide:building-2' },
    { key: 'purpose', label: 'Hearing Stage', icon: 'lucide:activity' }
  ],
  transactions: [
    { key: 'type', label: 'Txn Type', icon: 'lucide:arrow-left-right' },
    { key: 'mode', label: 'Payment Mode', icon: 'lucide:credit-card' },
    { key: 'category', label: 'Category', icon: 'lucide:tag' }
  ],
  personal_transactions: [
    { key: 'type', label: 'Txn Type', icon: 'lucide:arrow-left-right' },
    { key: 'category', label: 'Category', icon: 'lucide:tag' }
  ],
  court_helpers: [
    { key: 'court_name', label: 'Court', icon: 'lucide:building-2' },
    { key: 'helper_type', label: 'Helper Role', icon: 'lucide:user' }
  ],
  case_todos: [
    { key: 'status', label: 'Status', icon: 'lucide:check-circle' },
    { key: 'priority', label: 'Priority', icon: 'lucide:flag' }
  ],
  case_transfers: [
    { key: 'from_court', label: 'From Court', icon: 'lucide:building-2' },
    { key: 'to_court', label: 'To Court', icon: 'lucide:building-2' }
  ]
};

function setLiveCrudViewMode(mode) {
  if (mode !== 'table' && mode !== 'cards') mode = 'cards';
  currentLiveCrudViewMode = mode;
  try {
    localStorage.setItem('casebook_livecrud_view_mode', mode);
  } catch (e) {}

  const crdBtn = document.getElementById('liveCrudToggleCards');
  const tblBtn = document.getElementById('liveCrudToggleTable');
  if (crdBtn) crdBtn.classList.toggle('active', mode === 'cards');
  if (tblBtn) tblBtn.classList.toggle('active', mode === 'table');

  const crdContainer = document.getElementById('liveCrudCardsViewContainer');
  const tblContainer = document.getElementById('liveCrudTableViewContainer');
  if (crdContainer) crdContainer.classList.toggle('hidden', mode !== 'cards');
  if (tblContainer) tblContainer.classList.toggle('hidden', mode !== 'table');

  renderLiveCrudData();
}
if (typeof setLiveCrudViewMode !== 'undefined') window.setLiveCrudViewMode = setLiveCrudViewMode;

function clearLiveCrudSearch() {
  liveCrudCurrentPage = 1;
  const searchInput = document.getElementById('liveCrudSearchInput');
  const clearBtn = document.getElementById('liveCrudSearchClearBtn');
  if (searchInput) searchInput.value = '';
  if (clearBtn) clearBtn.classList.add('hidden');
  renderLiveCrudData();
}
if (typeof clearLiveCrudSearch !== 'undefined') window.clearLiveCrudSearch = clearLiveCrudSearch;

function initLiveCrudTab() {
  wireLiveCrudListeners();

  const select = document.getElementById('liveCrudTableSelect');
  if (select && select.value) {
    liveCrudCurrentTable = select.value;
  }
  setLiveCrudViewMode(currentLiveCrudViewMode);
  fetchLiveCrudRows();
}

function wireLiveCrudListeners() {
  const select = document.getElementById('liveCrudTableSelect');
  if (select && !select.dataset.hasLcListener) {
    select.dataset.hasLcListener = 'true';
    select.addEventListener('change', () => {
      liveCrudCurrentTable = select.value;
      liveCrudActiveFilters = {};
      liveCrudCurrentPage = 1;
      const searchInput = document.getElementById('liveCrudSearchInput');
      if (searchInput) searchInput.value = '';
      const clearBtn = document.getElementById('liveCrudSearchClearBtn');
      if (clearBtn) clearBtn.classList.add('hidden');
      fetchLiveCrudRows();
    });
  }

  const searchInput = document.getElementById('liveCrudSearchInput');
  if (searchInput && !searchInput.dataset.hasLcListener) {
    searchInput.dataset.hasLcListener = 'true';
    searchInput.addEventListener('input', () => {
      liveCrudCurrentPage = 1;
      const clearBtn = document.getElementById('liveCrudSearchClearBtn');
      if (clearBtn) clearBtn.classList.toggle('hidden', !searchInput.value);
      renderLiveCrudData();
    });
  }

  const clearBtn = document.getElementById('liveCrudSearchClearBtn');
  if (clearBtn && !clearBtn.dataset.hasLcListener) {
    clearBtn.dataset.hasLcListener = 'true';
    clearBtn.addEventListener('click', clearLiveCrudSearch);
  }

  const refreshBtn = document.getElementById('liveCrudRefreshBtn');
  if (refreshBtn && !refreshBtn.dataset.hasLcListener) {
    refreshBtn.dataset.hasLcListener = 'true';
    refreshBtn.addEventListener('click', () => fetchLiveCrudRows());
  }

  const insertBtn = document.getElementById('liveCrudInsertBtn');
  if (insertBtn && !insertBtn.dataset.hasLcListener) {
    insertBtn.dataset.hasLcListener = 'true';
    insertBtn.addEventListener('click', () => openLiveCrudModal('create', null));
  }

  const closeBtn = document.getElementById('lcModalCloseBtn');
  if (closeBtn && !closeBtn.dataset.hasLcListener) {
    closeBtn.dataset.hasLcListener = 'true';
    closeBtn.addEventListener('click', closeLiveCrudModal);
  }
  const cancelBtn = document.getElementById('lcModalCancelBtn');
  if (cancelBtn && !cancelBtn.dataset.hasLcListener) {
    cancelBtn.dataset.hasLcListener = 'true';
    cancelBtn.addEventListener('click', closeLiveCrudModal);
  }

  const overlay = document.getElementById('liveCrudFormModal');
  if (overlay && !overlay.dataset.hasLcListener) {
    overlay.dataset.hasLcListener = 'true';
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeLiveCrudModal();
    });
  }
}

async function fetchLiveCrudRows() {
  const container = document.getElementById('liveCrudRowsContainer');
  const badge = document.getElementById('liveCrudTableBadge');
  const countBadge = document.getElementById('liveCrudRowCountBadge');
  const statusBadge = document.getElementById('liveCrudStatusBadge') || document.querySelector('.db-toolbar-actions-row .db-live-badge');

  if (badge) badge.textContent = 'Table: ' + liveCrudCurrentTable;
  if (countBadge) countBadge.textContent = '…';
  if (container) container.innerHTML = '<div class="lc-empty">⏳ Loading rows from Supabase…</div>';

  const tryLocalFallback = (isTableMissing = false) => {
    if (liveCrudCurrentTable === 'case_transfers') {
      let transfers = Array.isArray(allCaseTransfers) ? allCaseTransfers : [];
      if (transfers.length === 0) {
        try {
          const raw = localStorage.getItem('case_transfers_backup');
          if (raw) transfers = JSON.parse(raw);
        } catch (e) {}
      }
      liveCrudRows = (Array.isArray(transfers) ? transfers : []).map((t, idx) => ({
        id: t.id || `transfer_${idx + 1}`,
        case_number: t.case_number || t.caseNo || '',
        case_type: t.case_type || t.caseType || 'civil',
        case_title: t.case_title || t.caseName || '',
        from_court: t.from_court || t.fromCourt || '',
        to_court: t.to_court || t.toCourt || '',
        transfer_date: t.transfer_date || t.transferDate || '',
        order_number: t.order_number || t.orderNo || '',
        order_date: t.order_date || t.orderDate || '',
        transferred_by: t.transferred_by || t.authority || '',
        transfer_reason: t.transfer_reason || t.reason || '',
        doc_link: t.doc_link || t.docLink || '',
        remarks: t.remarks || '',
        created_at: t.created_at || new Date().toISOString()
      }));

      renderLiveCrudRows();

      if (statusBadge) {
        statusBadge.textContent = '💾 Local Storage';
        statusBadge.className = 'db-live-badge';
        statusBadge.style.background = '#fefce8';
        statusBadge.style.color = '#854d0e';
        statusBadge.style.border = '1px solid #fef08a';
      }

      if (isTableMissing && container) {
        const noticeEl = document.createElement('div');
        noticeEl.className = 'lc-notice-banner';
        noticeEl.style.cssText = 'background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 10px 14px; margin-bottom: 12px; font-size: 13px; color: #1e40af; display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap;';
        noticeEl.innerHTML = `
          <div>
            <strong>ℹ️ Local Storage Mode:</strong> Table <code>case_transfers</code> is not yet created in Supabase. Showing ${liveCrudRows.length} transfers stored locally on this device.
          </div>
          <button type="button" class="secondary-btn" style="padding: 4px 10px; font-size: 11px; white-space: nowrap; cursor: pointer;" onclick="copyCaseTransfersSql()">📋 Copy Supabase SQL</button>
        `;
        container.insertBefore(noticeEl, container.firstChild);
      }
      return true;
    }
    const paisaTx = getLiveCrudPaisaTransactions();
    if (liveCrudCurrentTable === 'transactions' && paisaTx.length > 0) {
      liveCrudRows = paisaTx.map(t => ({
        id: t.id,
        type: t.type || 'spent',
        amount: t.amount || 0,
        client_payee: t.client_payee || '',
        category: t.category || '',
        mode: t.payment_mode || t.mode || 'Cash',
        case_no: t.case_no || '',
        txn_date: t.date || '',
        note: t.note || '',
        created_at: t.created_at || new Date().toISOString()
      }));
      renderLiveCrudRows();
      if (statusBadge) {
        statusBadge.textContent = '💾 Local Storage';
        statusBadge.className = 'db-live-badge';
        statusBadge.style.background = '#fefce8';
        statusBadge.style.color = '#854d0e';
        statusBadge.style.border = '1px solid #fef08a';
      }
      return true;
    }
    const personalTx = getLiveCrudPersonalTransactions();
    if (liveCrudCurrentTable === 'personal_transactions' && personalTx.length > 0) {
      liveCrudRows = personalTx.map(t => ({
        id: t.id,
        type: t.type || 'personal_spent',
        amount: t.amount || 0,
        category: t.category || '',
        note: t.note || '',
        txn_date: t.date || '',
        created_at: t.created_at || new Date().toISOString()
      }));
      renderLiveCrudRows();
      if (statusBadge) {
        statusBadge.textContent = '💾 Local Storage';
        statusBadge.className = 'db-live-badge';
        statusBadge.style.background = '#fefce8';
        statusBadge.style.color = '#854d0e';
        statusBadge.style.border = '1px solid #fef08a';
      }
      return true;
    }
    return false;
  };

  const sbClient = (typeof supabaseClient !== 'undefined') ? supabaseClient : (typeof window !== 'undefined' ? window.supabaseClient : null);
  const checkSupabase = typeof ensureSupabaseClient === 'function' ? ensureSupabaseClient : (typeof window !== 'undefined' && typeof window.ensureSupabaseClient === 'function' ? window.ensureSupabaseClient : null);

  if ((checkSupabase && !checkSupabase()) || (!checkSupabase && !sbClient)) {
    if (tryLocalFallback(false)) return;
    if (container) container.innerHTML = '<div class="lc-empty">⚠️ Supabase is not connected. Check your internet connection and refresh.</div>';
    return;
  }

  try {
    const { data, error } = await sbClient
      .from(liveCrudCurrentTable)
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200);

    if (error) throw error;

    if (data && data.length > 0) {
      liveCrudRows = data;
      renderLiveCrudRows();
      if (statusBadge) {
        statusBadge.textContent = '🟢 Supabase Live';
        statusBadge.className = 'db-live-badge';
        statusBadge.style.background = '';
        statusBadge.style.color = '';
        statusBadge.style.border = '';
      }
      return;
    }

    // Supabase returned 0 rows: if case_transfers has local records, seed to newly created Supabase table!
    if (liveCrudCurrentTable === 'case_transfers') {
      let transfers = Array.isArray(allCaseTransfers) ? allCaseTransfers : [];
      if (transfers.length === 0) {
        try {
          const raw = localStorage.getItem('case_transfers_backup');
          if (raw) transfers = JSON.parse(raw);
        } catch (e) {}
      }
      if (Array.isArray(transfers) && transfers.length > 0) {
        try {
          const payload = transfers.map(t => ({
            case_number: t.case_number || t.caseNo || '',
            case_type: t.case_type || t.caseType || 'civil',
            case_title: t.case_title || t.caseName || '',
            from_court: t.from_court || t.fromCourt || '',
            to_court: t.to_court || t.toCourt || '',
            transfer_date: t.transfer_date || t.transferDate || (typeof getTodayDateString === 'function' ? getTodayDateString() : ''),
            order_number: t.order_number || t.orderNo || '',
            order_date: t.order_date || t.orderDate || null,
            transferred_by: t.transferred_by || t.authority || '',
            transfer_reason: t.transfer_reason || t.reason || '',
            doc_link: t.doc_link || t.docLink || '',
            remarks: t.remarks || ''
          }));
          const { data: seeded, error: seedErr } = await sbClient.from('case_transfers').insert(payload).select();
          if (!seedErr && Array.isArray(seeded) && seeded.length > 0) {
            allCaseTransfers = seeded;
            window.allCaseTransfers = allCaseTransfers;
            try { localStorage.setItem('case_transfers_backup', JSON.stringify(allCaseTransfers)); } catch (e) {}
            liveCrudRows = seeded;
            renderLiveCrudRows();
            if (statusBadge) {
              statusBadge.textContent = '🟢 Supabase Live';
              statusBadge.className = 'db-live-badge';
              statusBadge.style.background = '';
              statusBadge.style.color = '';
              statusBadge.style.border = '';
            }
            if (typeof showToast === 'function') {
              showToast(`☁️ Uploaded ${seeded.length} transfers to Supabase!`, 4000);
            }
            return;
          }
        } catch (seedEx) {
          console.warn('Seeding case_transfers error:', seedEx);
        }
      }
    }

    if (tryLocalFallback(false)) {
      return;
    }
    liveCrudRows = [];
    renderLiveCrudRows();
    if (statusBadge) {
      statusBadge.textContent = '🟢 Supabase Live';
      statusBadge.className = 'db-live-badge';
      statusBadge.style.background = '';
      statusBadge.style.color = '';
      statusBadge.style.border = '';
    }
  } catch (err) {
    console.warn('Live CRUD fetch error:', err);
    if (tryLocalFallback(true)) {
      return;
    }
    if (container) container.innerHTML = `<div class="lc-empty">⚠️ Failed to load "${escapeHtml(liveCrudCurrentTable)}": ${escapeHtml(err.message || 'Unknown error')}</div>`;
  }
}

// "case_name" -> "Case Name", "plaintiff" -> "Plaintiff", "next_hearing" -> "Next Hearing"
function prettifyLiveCrudLabel(key) {
  return String(key || '')
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, ch => ch.toUpperCase());
}

// Pick the most human-meaningful fields to headline each row card
function getLiveCrudHeadlineFields(row) {
  const keys = Object.keys(row);
  const preferred = ['client_payee', 'case_number', 'court_name', 'task_title', 'case_name', 'hearing_date', 'transfer_date', 'helper_name', 'amount', 'note', 'type', 'name', 'title'];
  const headlineKey = preferred.find(p => keys.includes(p)) || keys.find(k => !['id', 'created_at'].includes(k)) || 'id';
  // Desktop cards show up to 7 secondary fields; the ones past the first 3 get
  // the .lc-extra class and are hidden on mobile by CSS
  const secondaryKeys = keys
    .filter(k => k !== headlineKey && !['id', 'created_at'].includes(k))
    .filter(k => {
      const v = row[k];
      return v !== null && v !== undefined && String(v).trim() !== '';
    })
    .slice(0, 7);
  return { headlineKey, secondaryKeys };
}

function renderLiveCrudDynamicFilterBar() {
  const rowEl = document.getElementById('liveCrudDynamicFiltersRow');
  if (!rowEl) return;

  const table = liveCrudCurrentTable;
  let schemas = LIVE_CRUD_FILTER_SCHEMAS[table];

  // If table has no predefined schema, auto-detect columns with <= 30 distinct values
  if (!schemas || schemas.length === 0) {
    schemas = [];
    if (liveCrudRows.length > 0) {
      const sample = liveCrudRows[0];
      Object.keys(sample).forEach(k => {
        if (['id', 'created_at', 'updated_at', 'note', 'description', 'remarks', 'remark', 'details'].includes(k)) return;
        const distinct = new Set(liveCrudRows.map(r => String(r[k] ?? '').trim()).filter(Boolean));
        if (distinct.size > 1 && distinct.size <= 30) {
          schemas.push({ key: k, label: prettifyLiveCrudLabel(k), icon: 'lucide:filter' });
        }
      });
      schemas = schemas.slice(0, 3);
    }
  }

  if (!schemas || schemas.length === 0) {
    rowEl.innerHTML = '';
    return;
  }

  const filtersHtml = schemas.map(s => {
    // Collect distinct values for this key from rows
    const distinctVals = Array.from(new Set(
      liveCrudRows.map(r => String(r[s.key] ?? '').trim()).filter(Boolean)
    )).sort();

    const currentVal = liveCrudActiveFilters[s.key] || '';

    const optionsHtml = distinctVals.map(val =>
      `<option value="${escapeHtml(val)}"${val === currentVal ? ' selected' : ''}>${escapeHtml(val)}</option>`
    ).join('');

    return `
      <div class="f-group">
        <label for="lcFilter_${escapeHtml(s.key)}">
          <iconify-icon icon="${escapeHtml(s.icon)}"></iconify-icon> ${escapeHtml(s.label)}
        </label>
        <select id="lcFilter_${escapeHtml(s.key)}" class="f-select" onchange="handleLiveCrudFilterChange('${escapeHtml(s.key)}', this.value)">
          <option value="">All (${distinctVals.length})</option>
          ${optionsHtml}
        </select>
      </div>
    `;
  }).join('');

  rowEl.innerHTML = `
    ${filtersHtml}
    <button type="button" class="btn-reset" onclick="resetLiveCrudFilters()" title="Reset all active filters">
      <iconify-icon icon="lucide:rotate-ccw"></iconify-icon> Reset Filters
    </button>
  `;
}

function handleLiveCrudFilterChange(key, value) {
  liveCrudCurrentPage = 1;
  if (value) {
    liveCrudActiveFilters[key] = value;
  } else {
    delete liveCrudActiveFilters[key];
  }
  renderLiveCrudData();
}

function resetLiveCrudFilters() {
  liveCrudCurrentPage = 1;
  liveCrudActiveFilters = {};
  const searchInput = document.getElementById('liveCrudSearchInput');
  if (searchInput) searchInput.value = '';
  const clearBtn = document.getElementById('liveCrudSearchClearBtn');
  if (clearBtn) clearBtn.classList.add('hidden');

  renderLiveCrudDynamicFilterBar();
  renderLiveCrudData();
}

function getFilteredLiveCrudRows() {
  const searchInput = document.getElementById('liveCrudSearchInput');
  const q = (searchInput ? searchInput.value : '').trim().toLowerCase();
  const clearBtn = document.getElementById('liveCrudSearchClearBtn');
  if (clearBtn) clearBtn.classList.toggle('hidden', !q);

  let rows = liveCrudRows;

  // 1. Text search across all fields
  if (q) {
    rows = rows.filter(r => Object.values(r).some(v =>
      v !== null && v !== undefined && String(v).toLowerCase().includes(q)
    ));
  }

  // 2. Dynamic active filter dropdowns
  const filterKeys = Object.keys(liveCrudActiveFilters);
  if (filterKeys.length > 0) {
    rows = rows.filter(r => {
      return filterKeys.every(k => {
        const targetVal = String(liveCrudActiveFilters[k] || '').trim().toLowerCase();
        if (!targetVal) return true;
        const rowVal = String(r[k] ?? '').trim().toLowerCase();
        return rowVal === targetVal;
      });
    });
  }

  return rows;
}

function renderLiveCrudCards(rows) {
  const container = document.getElementById('liveCrudRowsContainer');
  if (!container) return;

  if (rows.length === 0) {
    container.innerHTML = `<div class="lc-empty">${liveCrudRows.length === 0
      ? `📭 No rows in "${escapeHtml(liveCrudCurrentTable)}" yet. Use ➕ Insert Row to add the first one.`
      : `🔍 No rows match your search/filter criteria.`}</div>`;
    return;
  }

  container.innerHTML = rows.map((row, idx) => {
    const { headlineKey, secondaryKeys } = getLiveCrudHeadlineFields(row);
    const headline = String(row[headlineKey] ?? '—');
    let headlineSuffix = '';
    if (liveCrudCurrentTable === 'hearings' && row.case_number) {
      const records = getLiveCrudAllCaseRecords();
      const matchedCase = records.find(c =>
        (c.caseNo || '').toLowerCase() === String(row.case_number).toLowerCase() ||
        (c.criminalCaseNumber || '').toLowerCase() === String(row.case_number).toLowerCase()
      );
      const caseName = matchedCase?.caseName ||
        (matchedCase?.plaintiff ? `${matchedCase.plaintiff} vs ${matchedCase.defendant}` : '') ||
        (matchedCase?.victimName ? `${matchedCase.victimName} vs ${matchedCase.accusedName}` : '');
      if (caseName) headlineSuffix = `<span class="lc-row-headline-name"> — ${escapeHtml(caseName)}</span>`;
    } else if (liveCrudCurrentTable === 'case_transfers' && (row.from_court || row.to_court)) {
      headlineSuffix = `<span class="lc-row-headline-name"> — ${escapeHtml(row.from_court || 'Court')} ➜ ${escapeHtml(row.to_court || 'Court')}</span>`;
    }
    const secondaryHtml = secondaryKeys.map((k, i) =>
      `<span class="lc-row-secondary${i >= 3 ? ' lc-extra' : ''}"><strong>${escapeHtml(prettifyLiveCrudLabel(k))}:</strong> ${escapeHtml(String(row[k]).slice(0, 80))}</span>`
    ).join('');
    const rowId = String(row.id ?? '');
    const createdAt = row.created_at ? String(row.created_at).slice(0, 10) : '';
    const footerHtml = `
      <div class="lc-row-footer">
        <span class="lc-row-id" title="Row ID">${escapeHtml(rowId)}</span>
        ${createdAt ? `<span class="lc-row-created"><i class="fa-regular fa-clock"></i> ${escapeHtml(createdAt)}</span>` : ''}
      </div>
    `;

    return `
      <div class="lc-row-card">
        <div class="lc-row-body">
          <div class="lc-row-index" title="Row #${idx + 1}">#${idx + 1}</div>
          <div class="lc-row-main">
            <div class="lc-row-headline" title="${escapeHtml(headline)}">${escapeHtml(headline)}${headlineSuffix}</div>
            <div class="lc-row-secondary-group">${secondaryHtml}</div>
            ${footerHtml}
          </div>
        </div>
        <div class="lc-row-actions">
          <button type="button" class="table-view-btn" onclick="openLiveCrudModal('edit', ${escapeHtml(String(rowId)) ? `'${escapeHtml(rowId)}'` : 'null'})" title="Edit this row"><i class="fa-solid fa-pen-to-square"></i><span class="btn-text"> Edit</span></button>
          <button type="button" class="table-view-btn lc-delete-btn" onclick="deleteLiveCrudRow('${escapeHtml(rowId)}', '${escapeHtml(headline.replace(/'/g, ''))}')" title="Delete this row"><i class="fa-solid fa-trash-can"></i><span class="btn-text"> Delete</span></button>
        </div>
      </div>
    `;
  }).join('');
}

function handleLiveCrudPageSizeChange(val) {
  if (val === 'all') {
    liveCrudPageSize = Infinity;
  } else {
    liveCrudPageSize = parseInt(val, 10) || 25;
  }
  liveCrudCurrentPage = 1;
  renderLiveCrudData();
}
if (typeof handleLiveCrudPageSizeChange !== 'undefined') window.handleLiveCrudPageSizeChange = handleLiveCrudPageSizeChange;

function setLiveCrudPage(pageNum) {
  liveCrudCurrentPage = Math.max(1, parseInt(pageNum, 10) || 1);
  renderLiveCrudData();
  const tblContainer = document.getElementById('liveCrudTableViewContainer');
  if (tblContainer && typeof tblContainer.scrollIntoView === 'function') {
    tblContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}
if (typeof setLiveCrudPage !== 'undefined') window.setLiveCrudPage = setLiveCrudPage;

function renderLiveCrudPagination(totalFiltered) {
  const infoEl = document.getElementById('liveCrudPaginationInfo');
  const controlsEl = document.getElementById('liveCrudPaginationControls');
  const countBadge = document.getElementById('liveCrudTableCountBadge');
  if (!infoEl || !controlsEl) return;

  if (totalFiltered === 0) {
    infoEl.textContent = 'Showing 0 to 0 of 0 entries';
    if (countBadge) countBadge.textContent = 'Showing 0 of 0 rows';
    controlsEl.innerHTML = '';
    return;
  }

  const pageSize = liveCrudPageSize;
  const totalPages = pageSize === Infinity ? 1 : Math.max(1, Math.ceil(totalFiltered / pageSize));

  if (liveCrudCurrentPage > totalPages) liveCrudCurrentPage = totalPages;
  if (liveCrudCurrentPage < 1) liveCrudCurrentPage = 1;

  const start = pageSize === Infinity ? 0 : (liveCrudCurrentPage - 1) * pageSize;
  const end = pageSize === Infinity ? totalFiltered : Math.min(start + pageSize, totalFiltered);

  infoEl.textContent = `Showing ${start + 1} to ${end} of ${totalFiltered} entries`;
  if (countBadge) {
    countBadge.textContent = `Showing ${end - start} of ${totalFiltered} rows`;
  }

  if (pageSize === Infinity || totalPages <= 1) {
    controlsEl.innerHTML = `
      <button type="button" class="pagination-btn" disabled><iconify-icon icon="lucide:chevron-left"></iconify-icon> Prev</button>
      <button type="button" class="pagination-btn active">1</button>
      <button type="button" class="pagination-btn" disabled>Next <iconify-icon icon="lucide:chevron-right"></iconify-icon></button>
    `;
    return;
  }

  let btnsHtml = '';

  // Prev button
  btnsHtml += `<button type="button" class="pagination-btn" onclick="setLiveCrudPage(${liveCrudCurrentPage - 1})" ${liveCrudCurrentPage === 1 ? 'disabled' : ''} title="Previous Page">
    <iconify-icon icon="lucide:chevron-left"></iconify-icon> Prev
  </button>`;

  // Page numbers with ellipsis
  let pages = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (liveCrudCurrentPage > 3) pages.push('...');
    const pStart = Math.max(2, liveCrudCurrentPage - 1);
    const pEnd = Math.min(totalPages - 1, liveCrudCurrentPage + 1);
    for (let i = pStart; i <= pEnd; i++) pages.push(i);
    if (liveCrudCurrentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
  }

  pages.forEach(p => {
    if (p === '...') {
      btnsHtml += `<span class="pagination-ellipsis" style="padding: 0 4px; color: #94a3b8; font-size: 0.8rem;">…</span>`;
    } else {
      btnsHtml += `<button type="button" class="pagination-btn ${p === liveCrudCurrentPage ? 'active' : ''}" onclick="setLiveCrudPage(${p})">${p}</button>`;
    }
  });

  // Next button
  btnsHtml += `<button type="button" class="pagination-btn" onclick="setLiveCrudPage(${liveCrudCurrentPage + 1})" ${liveCrudCurrentPage === totalPages ? 'disabled' : ''} title="Next Page">
    Next <iconify-icon icon="lucide:chevron-right"></iconify-icon>
  </button>`;

  controlsEl.innerHTML = btnsHtml;
}

function renderLiveCrudTable(rows) {
  const tableHead = document.getElementById('liveCrudTableHead');
  const tableBody = document.getElementById('liveCrudTableBody');
  if (!tableHead || !tableBody) return;

  const totalFiltered = rows.length;
  renderLiveCrudPagination(totalFiltered);

  if (totalFiltered === 0) {
    tableHead.innerHTML = '';
    tableBody.innerHTML = `<tr><td colspan="10" style="text-align: center; padding: 32px 16px; color: #94a3b8;"><div class="lc-empty">${liveCrudRows.length === 0 ? `📭 No rows in "${escapeHtml(liveCrudCurrentTable)}" yet.` : '🔍 No rows match your filter criteria.'}</div></td></tr>`;
    return;
  }

  const pageSize = liveCrudPageSize;
  const startIdx = pageSize === Infinity ? 0 : (liveCrudCurrentPage - 1) * pageSize;
  const endIdx = pageSize === Infinity ? totalFiltered : Math.min(startIdx + pageSize, totalFiltered);
  const pageRows = rows.slice(startIdx, endIdx);

  // Determine top readable columns for clean table display
  const sample = rows[0];
  const allKeys = Object.keys(sample);
  const preferredCols = allKeys.filter(k => !['id', 'created_at', 'updated_at'].includes(k)).slice(0, 6);
  const displayCols = ['id', ...preferredCols];

  // Render <thead> matching Cases Register .data-table
  tableHead.innerHTML = `
    <tr>
      <th style="width: 50px; text-align: center;">#</th>
      ${displayCols.map(c => `<th>${escapeHtml(prettifyLiveCrudLabel(c).toUpperCase())}</th>`).join('')}
      <th class="actions-col" style="text-align: center; width: 100px;">ACTIONS</th>
    </tr>
  `;

  // Render <tbody> matching Cases Register .data-table
  tableBody.innerHTML = pageRows.map((row, idx) => {
    const rowId = String(row.id ?? '');
    const headline = String(row[preferredCols[0] || 'id'] ?? 'Row #' + (startIdx + idx + 1));
    return `
      <tr>
        <td style="text-align: center; color: #94a3b8; font-weight: 600;">${startIdx + idx + 1}</td>
        ${displayCols.map(col => {
          const val = row[col];
          const strVal = val === null || val === undefined ? '—' : String(val);
          if (col === 'id') {
            return `<td><span class="lc-row-id" title="${escapeHtml(strVal)}">${escapeHtml(strVal.slice(0, 10))}</span></td>`;
          }
          return `<td title="${escapeHtml(strVal)}">${escapeHtml(strVal.slice(0, 80))}</td>`;
        }).join('')}
        <td class="actions-cell" style="text-align: center; white-space: nowrap;">
          <div class="row-actions" style="display: inline-flex; gap: 4px;">
            <button type="button" class="ra-btn edit" onclick="openLiveCrudModal('edit', '${escapeHtml(rowId)}')" title="Edit row">
              <iconify-icon icon="lucide:pencil"></iconify-icon>
            </button>
            <button type="button" class="ra-btn delete" onclick="deleteLiveCrudRow('${escapeHtml(rowId)}', '${escapeHtml(headline.replace(/'/g, ''))}')" title="Delete row">
              <iconify-icon icon="lucide:trash-2"></iconify-icon>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function renderLiveCrudData() {
  const filteredRows = getFilteredLiveCrudRows();
  const countBadge = document.getElementById('liveCrudRowCountBadge');
  if (countBadge) {
    countBadge.textContent = `${filteredRows.length}${filteredRows.length !== liveCrudRows.length ? ` of ${liveCrudRows.length}` : ''} rows`;
  }

  if (currentLiveCrudViewMode === 'table') {
    renderLiveCrudTable(filteredRows);
  } else {
    renderLiveCrudCards(filteredRows);
  }
}

function renderLiveCrudRows() {
  renderLiveCrudDynamicFilterBar();
  renderLiveCrudData();
}

// Columns auto-generated from a real row; read-only/db-managed ones are skipped
function getLiveCrudEditableColumns(sampleRow) {
  if (!sampleRow) return [];
  return Object.keys(sampleRow).filter(k => !['id', 'created_at'].includes(k));
}

function buildLiveCrudFieldHtml(key, value) {
  const strVal = (value === null || value === undefined) ? '' : String(value);
  const isDate = /(^|_)(date|_at)$/.test(key) || /^\d{4}-\d{2}-\d{2}/.test(strVal);
  const isNumber = typeof value === 'number' || (/^\d+(\.\d+)?$/.test(strVal) && strVal !== '');
  const inputType = isDate && /^\d{4}-\d{2}-\d{2}/.test(strVal) ? 'date'
    : (isDate && /_date$/.test(key) ? 'date' : (isNumber ? 'number' : 'text'));

  let valAttr = '';
  if (inputType === 'date') {
    const m = strVal.match(/^(\d{4}-\d{2}-\d{2})/);
    valAttr = m ? ` value="${m[1]}"` : '';
  } else if (inputType === 'number') {
    valAttr = ` value="${escapeHtml(strVal)}"`;
  } else {
    valAttr = ` value="${escapeHtml(strVal)}"`;
  }

  return `
    <div class="modifier-form-group">
      <label for="lcField_${escapeHtml(key)}" class="db-toolbar-label">${escapeHtml(prettifyLiveCrudLabel(key))}:</label>
      <input type="${inputType}" id="lcField_${escapeHtml(key)}" data-lc-column="${escapeHtml(key)}" class="db-search-input" ${valAttr} placeholder="— leave empty to skip —" autocomplete="off">
    </div>
  `;
}

function openLiveCrudModal(action, rowId) {
  const overlay = document.getElementById('liveCrudFormModal');
  const titleEl = document.getElementById('lcModalTitle');
  const subtitleEl = document.getElementById('lcModalSubtitle');
  const iconEl = document.getElementById('lcModalIcon');
  const grid = document.getElementById('lcDynamicFieldsGrid');
  const idInput = document.getElementById('lcRecordId');
  const actionInput = document.getElementById('lcRecordAction');
  const statusMsg = document.getElementById('lcModalStatusMsg');
  if (!overlay || !grid) return;

  const sampleFallback = liveCrudCurrentTable === 'transactions'
    ? { type: 'spent', amount: 0, client_payee: '', category: 'other', mode: 'Cash', note: '', txn_date: (typeof getTodayDateString === 'function' ? getTodayDateString() : '') }
    : (liveCrudCurrentTable === 'personal_transactions'
      ? { type: 'personal_spent', amount: 0, category: 'other', note: '', txn_date: (typeof getTodayDateString === 'function' ? getTodayDateString() : '') }
      : (liveCrudCurrentTable === 'case_transfers'
        ? { case_number: '', case_type: 'civil', case_title: '', from_court: '', to_court: '', transfer_date: (typeof getTodayDateString === 'function' ? getTodayDateString() : ''), order_number: '', transferred_by: '', transfer_reason: '', doc_link: '', remarks: '' }
        : null));

  const row = action === 'edit'
    ? liveCrudRows.find(r => String(r.id) === String(rowId))
    : (liveCrudRows[0] || sampleFallback);

  if (action === 'insert' && !row) {
    alert(`The "${liveCrudCurrentTable}" table is empty, so its column layout is unknown.\n\nAdd the first row via the full "Supabase DB Manager" tab, then Insert will work here too.`);
    return;
  }
  if (action === 'edit' && !row) {
    alert('Could not find that row. Please refresh and try again.');
    return;
  }

  const columns = getLiveCrudEditableColumns(row);
  grid.innerHTML = columns.map(k => buildLiveCrudFieldHtml(k, action === 'edit' ? row[k] : null)).join('');

  if (titleEl) titleEl.textContent = action === 'edit' ? `Edit Row — ${liveCrudCurrentTable}` : `Insert Row — ${liveCrudCurrentTable}`;
  if (subtitleEl) subtitleEl.textContent = action === 'edit'
    ? 'Change field values and save. Empty fields are left unchanged.'
    : 'Fill in values for the new row. Empty fields are skipped.';
  if (iconEl) iconEl.textContent = action === 'edit' ? '✏️' : '➕';
  if (idInput) idInput.value = action === 'edit' ? String(row.id) : '';
  if (actionInput) actionInput.value = action;
  if (statusMsg) { statusMsg.textContent = ''; statusMsg.className = 'update-status-msg'; }

  overlay.classList.remove('hidden');
}

function closeLiveCrudModal() {
  const overlay = document.getElementById('liveCrudFormModal');
  if (overlay) overlay.classList.add('hidden');
}

async function handleLiveCrudFormSubmit(event) {
  if (event && event.preventDefault) event.preventDefault();
  const actionInput = document.getElementById('lcRecordAction');
  const idInput = document.getElementById('lcRecordId');
  const statusMsg = document.getElementById('lcModalStatusMsg');
  const submitBtn = document.getElementById('lcModalSubmitBtn');
  const action = actionInput ? actionInput.value : 'edit';
  const rowId = idInput ? idInput.value : '';

  // Collect filled fields only — empty means "leave unchanged" (edit) / "skip" (insert)
  const payload = {};
  document.querySelectorAll('#lcDynamicFieldsGrid input[data-lc-column]').forEach(input => {
    const col = input.getAttribute('data-lc-column');
    const raw = (input.value || '').trim();
    if (raw === '') return;
    payload[col] = input.type === 'number' ? (raw === '' ? null : Number(raw)) : raw;
  });

  if (Object.keys(payload).length === 0) {
    if (statusMsg) {
      statusMsg.textContent = '⚠️ Please fill at least one field before saving.';
      statusMsg.className = 'update-status-msg error';
    }
    return false;
  }

  if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = '⏳ Saving…'; }
  if (statusMsg) { statusMsg.textContent = ''; statusMsg.className = 'update-status-msg'; }

  // Sync to local memory & storage for transactions & personal_transactions & case_transfers
  if (liveCrudCurrentTable === 'transactions') {
    const pList = (typeof allPaisaTransactions !== 'undefined' && Array.isArray(allPaisaTransactions))
      ? allPaisaTransactions
      : (typeof window !== 'undefined' && Array.isArray(window.allPaisaTransactions) ? window.allPaisaTransactions : []);
    if (action === 'edit') {
      const idx = pList.findIndex(t => String(t.id) === String(rowId));
      if (idx !== -1) {
        if (payload.amount !== undefined) pList[idx].amount = Number(payload.amount);
        if (payload.type !== undefined) pList[idx].type = payload.type;
        if (payload.client_payee !== undefined) pList[idx].client_payee = payload.client_payee;
        if (payload.category !== undefined) pList[idx].category = payload.category;
        if (payload.mode !== undefined) pList[idx].payment_mode = payload.mode;
        if (payload.note !== undefined) pList[idx].note = payload.note;
        if (payload.txn_date !== undefined) pList[idx].date = payload.txn_date;
      }
    } else {
      const newTx = {
        id: 'tx_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        type: payload.type || 'spent',
        amount: Number(payload.amount) || 0,
        client_payee: payload.client_payee || '',
        category: payload.category || '',
        payment_mode: payload.mode || 'Cash',
        date: payload.txn_date || (typeof getTodayDateString === 'function' ? getTodayDateString() : ''),
        note: payload.note || '',
        created_at: new Date().toISOString()
      };
      pList.unshift(newTx);
    }
    if (typeof window !== 'undefined') window.allPaisaTransactions = pList;
    if (typeof savePaisaTransactions === 'function') savePaisaTransactions(true);
    else if (typeof window !== 'undefined' && typeof window.savePaisaTransactions === 'function') window.savePaisaTransactions(true);
  } else if (liveCrudCurrentTable === 'personal_transactions') {
    const ptList = (typeof allPersonalTransactions !== 'undefined' && Array.isArray(allPersonalTransactions))
      ? allPersonalTransactions
      : (typeof window !== 'undefined' && Array.isArray(window.allPersonalTransactions) ? window.allPersonalTransactions : []);
    if (action === 'edit') {
      const idx = ptList.findIndex(t => String(t.id) === String(rowId));
      if (idx !== -1) {
        if (payload.amount !== undefined) ptList[idx].amount = Number(payload.amount);
        if (payload.type !== undefined) ptList[idx].type = payload.type;
        if (payload.category !== undefined) ptList[idx].category = payload.category;
        if (payload.note !== undefined) ptList[idx].note = payload.note;
        if (payload.txn_date !== undefined) ptList[idx].date = payload.txn_date;
      }
    } else {
      const newPTx = {
        id: 'ptx_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        type: payload.type || 'personal_spent',
        amount: Number(payload.amount) || 0,
        category: payload.category || '',
        note: payload.note || '',
        date: payload.txn_date || (typeof getTodayDateString === 'function' ? getTodayDateString() : ''),
        created_at: new Date().toISOString()
      };
      ptList.unshift(newPTx);
    }
    if (typeof window !== 'undefined') window.allPersonalTransactions = ptList;
    if (typeof savePersonalData === 'function') savePersonalData(true);
    else if (typeof window !== 'undefined' && typeof window.savePersonalData === 'function') window.savePersonalData(true);
  } else if (liveCrudCurrentTable === 'case_transfers') {
    if (action === 'edit') {
      const idx = allCaseTransfers.findIndex(t => String(t.id) === String(rowId));
      if (idx !== -1) {
        Object.assign(allCaseTransfers[idx], payload);
        allCaseTransfers[idx].updated_at = new Date().toISOString();
      }
    } else {
      const newTransfer = {
        id: 'transfer_' + Date.now(),
        case_number: payload.case_number || '',
        case_type: payload.case_type || 'civil',
        case_title: payload.case_title || '',
        from_court: payload.from_court || '',
        to_court: payload.to_court || '',
        transfer_date: payload.transfer_date || (typeof getTodayDateString === 'function' ? getTodayDateString() : ''),
        order_number: payload.order_number || '',
        order_date: payload.order_date || null,
        transferred_by: payload.transferred_by || '',
        transfer_reason: payload.transfer_reason || '',
        doc_link: payload.doc_link || '',
        remarks: payload.remarks || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      allCaseTransfers.unshift(newTransfer);
    }
    try {
      localStorage.setItem('case_transfers_backup', JSON.stringify(allCaseTransfers));
    } catch (e) {}
    window.allCaseTransfers = allCaseTransfers;
    if (typeof renderRecentTransfersTable === 'function') renderRecentTransfersTable();
    if (typeof updateTransfersCountBadge === 'function') updateTransfersCountBadge();
  }

  const sb = (typeof supabaseClient !== 'undefined') ? supabaseClient : (typeof window !== 'undefined' ? window.supabaseClient : null);
  try {
    let error = null;
    if (sb) {
      if (action === 'edit') {
        ({ error } = await sb.from(liveCrudCurrentTable).update(payload).eq('id', rowId));
      } else {
        ({ error } = await sb.from(liveCrudCurrentTable).insert([payload]));
      }
      if (error) throw error;
    }

    closeLiveCrudModal();
    await fetchLiveCrudRows();
    if (typeof performPostCrudRefresh === 'function') {
      await performPostCrudRefresh({ toast: `💾 ${action === 'edit' ? 'Row updated' : 'Row inserted'} in ${liveCrudCurrentTable}` });
    } else if (typeof window !== 'undefined' && typeof window.performPostCrudRefresh === 'function') {
      await window.performPostCrudRefresh({ toast: `💾 ${action === 'edit' ? 'Row updated' : 'Row inserted'} in ${liveCrudCurrentTable}` });
    }
  } catch (err) {
    console.error('Live CRUD save error:', err);
    if (liveCrudCurrentTable === 'transactions' || liveCrudCurrentTable === 'personal_transactions' || liveCrudCurrentTable === 'case_transfers') {
      closeLiveCrudModal();
      await fetchLiveCrudRows();
      if (typeof performPostCrudRefresh === 'function') {
        await performPostCrudRefresh({ toast: `💾 Saved locally (Supabase table pending or RLS active)` });
      } else if (typeof window !== 'undefined' && typeof window.performPostCrudRefresh === 'function') {
        await window.performPostCrudRefresh({ toast: `💾 Saved locally (Supabase table pending or RLS active)` });
      }
      return false;
    }
    if (statusMsg) {
      statusMsg.textContent = '⚠️ Save failed: ' + (err.message || 'Unknown error');
      statusMsg.className = 'update-status-msg error';
    }
  } finally {
    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = '💾 Save to Database'; }
  }
  return false;
}

async function deleteLiveCrudRow(rowId, headline) {
  if (!rowId) return;
  const ok = confirm(`🗑️ Delete this row permanently from "${liveCrudCurrentTable}"?\n\n${headline}\n\nThis cannot be undone.`);
  if (!ok) return;

  if (liveCrudCurrentTable === 'transactions') {
    allPaisaTransactions = (typeof allPaisaTransactions !== 'undefined' ? allPaisaTransactions : []).filter(t => String(t.id) !== String(rowId));
    if (typeof savePaisaTransactions === 'function') savePaisaTransactions(true);
  } else if (liveCrudCurrentTable === 'personal_transactions') {
    allPersonalTransactions = (typeof allPersonalTransactions !== 'undefined' ? allPersonalTransactions : []).filter(t => String(t.id) !== String(rowId));
    if (typeof savePersonalData === 'function') savePersonalData(true);
  } else if (liveCrudCurrentTable === 'case_transfers') {
    allCaseTransfers = allCaseTransfers.filter(t => String(t.id) !== String(rowId));
    try {
      localStorage.setItem('case_transfers_backup', JSON.stringify(allCaseTransfers));
    } catch (e) {}
    window.allCaseTransfers = allCaseTransfers;
    if (typeof renderRecentTransfersTable === 'function') renderRecentTransfersTable();
    if (typeof updateTransfersCountBadge === 'function') updateTransfersCountBadge();
  }

  const sb = (typeof supabaseClient !== 'undefined') ? supabaseClient : (typeof window !== 'undefined' ? window.supabaseClient : null);
  try {
    if (sb) {
      const { error } = await sb.from(liveCrudCurrentTable).delete().eq('id', rowId);
      if (error) throw error;
    }
    await fetchLiveCrudRows();
    if (typeof performPostCrudRefresh === 'function') {
      await performPostCrudRefresh({ toast: `🗑️ Row deleted from ${liveCrudCurrentTable}` });
    } else if (typeof window !== 'undefined' && typeof window.performPostCrudRefresh === 'function') {
      await window.performPostCrudRefresh({ toast: `🗑️ Row deleted from ${liveCrudCurrentTable}` });
    }
  } catch (err) {
    console.error('Live CRUD delete error:', err);
    if (liveCrudCurrentTable === 'transactions' || liveCrudCurrentTable === 'personal_transactions' || liveCrudCurrentTable === 'case_transfers') {
      await fetchLiveCrudRows();
      if (typeof performPostCrudRefresh === 'function') {
        await performPostCrudRefresh({ toast: `🗑️ Row deleted locally` });
      } else if (typeof window !== 'undefined' && typeof window.performPostCrudRefresh === 'function') {
        await window.performPostCrudRefresh({ toast: `🗑️ Row deleted locally` });
      }
      return;
    }
    alert('⚠️ Delete failed: ' + (err.message || 'Unknown error'));
  }
}

function copyCaseTransfersSql() {
  const sql = `-- CaseBook: Run this in Supabase SQL Editor to create case_transfers table:
CREATE TABLE IF NOT EXISTS public.case_transfers (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_number     text NOT NULL,
  case_type       text DEFAULT 'civil',
  case_title      text,
  from_court      text NOT NULL,
  to_court        text NOT NULL,
  transfer_date   date NOT NULL DEFAULT CURRENT_DATE,
  order_number    text,
  order_date      date,
  transferred_by  text,
  transfer_reason text,
  doc_link        text,
  remarks         text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_case_transfers_case_number ON public.case_transfers (case_number);
CREATE INDEX IF NOT EXISTS idx_case_transfers_transfer_date ON public.case_transfers (transfer_date DESC);
ALTER TABLE public.case_transfers DISABLE ROW LEVEL SECURITY;`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(sql).then(() => {
      if (typeof showToast === 'function') {
        showToast('✅ Supabase SQL copied to clipboard! Run in Supabase SQL Editor.', 4000);
      } else {
        alert('✅ SQL copied to clipboard! Paste and run it in Supabase SQL Editor.');
      }
    }).catch(() => {
      prompt('Copy this SQL and run in Supabase SQL Editor:', sql);
    });
  } else {
    prompt('Copy this SQL and run in Supabase SQL Editor:', sql);
  }
}

if (typeof copyCaseTransfersSql !== 'undefined') window.copyCaseTransfersSql = copyCaseTransfersSql;
if (typeof initLiveCrudTab !== 'undefined') window.initLiveCrudTab = initLiveCrudTab;
if (typeof openLiveCrudModal !== 'undefined') window.openLiveCrudModal = openLiveCrudModal;
if (typeof closeLiveCrudModal !== 'undefined') window.closeLiveCrudModal = closeLiveCrudModal;
if (typeof handleLiveCrudFormSubmit !== 'undefined') window.handleLiveCrudFormSubmit = handleLiveCrudFormSubmit;
if (typeof deleteLiveCrudRow !== 'undefined') window.deleteLiveCrudRow = deleteLiveCrudRow;
if (typeof fetchLiveCrudRows !== 'undefined') window.fetchLiveCrudRows = fetchLiveCrudRows;
if (typeof renderLiveCrudData !== 'undefined') window.renderLiveCrudData = renderLiveCrudData;
if (typeof renderLiveCrudRows !== 'undefined') window.renderLiveCrudRows = renderLiveCrudRows;
if (typeof renderLiveCrudDynamicFilterBar !== 'undefined') window.renderLiveCrudDynamicFilterBar = renderLiveCrudDynamicFilterBar;
if (typeof handleLiveCrudFilterChange !== 'undefined') window.handleLiveCrudFilterChange = handleLiveCrudFilterChange;
if (typeof resetLiveCrudFilters !== 'undefined') window.resetLiveCrudFilters = resetLiveCrudFilters;
if (typeof getFilteredLiveCrudRows !== 'undefined') window.getFilteredLiveCrudRows = getFilteredLiveCrudRows;
if (typeof setLiveCrudViewMode !== 'undefined') window.setLiveCrudViewMode = setLiveCrudViewMode;
if (typeof clearLiveCrudSearch !== 'undefined') window.clearLiveCrudSearch = clearLiveCrudSearch;
if (typeof handleLiveCrudPageSizeChange !== 'undefined') window.handleLiveCrudPageSizeChange = handleLiveCrudPageSizeChange;
if (typeof setLiveCrudPage !== 'undefined') window.setLiveCrudPage = setLiveCrudPage;

if (typeof window !== 'undefined') {
  window.setLiveCrudRows = (rows) => { liveCrudRows = rows; return liveCrudRows; };
  window.getLiveCrudRows = () => liveCrudRows;
  window.setLiveCrudCurrentTable = (tbl) => { liveCrudCurrentTable = tbl; return liveCrudCurrentTable; };
  window.getLiveCrudCurrentTable = () => liveCrudCurrentTable;
}

