window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs['livecrud'] = `                <div class="form-container lc-container tab-card-wrapper">
                    <div class="section-header-row">
    <div class="section-title-box">
        <div class="section-icon-badge"><i class="fa-solid fa-database"></i></div>
        <div>
            <h3>Live Database Manager</h3>
            <p class="section-subtitle">Direct real-time cloud data editor, database records viewer, and raw table manager</p>
            <div class="header-chips-row">
                <button type="button" class="header-chip-btn" onclick="refreshLiveCrudData()"><i class="fa-solid fa-arrows-rotate"></i> Refresh Sync</button>
            </div>
        </div>
    </div>
</div>
                    </div>

                    <!-- Toolbar -->
                    <div class="db-toolbar-card">
                        <div class="db-toolbar-row">
                            <div class="db-table-selector-box">
                                <label for="liveCrudTableSelect" class="db-toolbar-label">Select Supabase Table:</label>
                                <select id="liveCrudTableSelect" class="form-select db-select">
                                    <option value="civilcases"><i class="fa-solid fa-scale-balanced"></i>️ Civil Cases</option>
                                    <option value="statecases">🚨 State Cases</option>
                                    <option value="criminalcases">🔒 Criminal Cases (Legacy)</option>
                                    <option value="familycases">👨‍👩‍👧 Family Cases</option>
                                    <option value="revenuecases">🌾 Revenue Cases</option>
                                    <option value="misccivilcases">📑 Misc Civil Cases</option>
                                    <option value="misccriminalcases"><i class="fa-solid fa-scale-balanced"></i>️ Misc Criminal Cases</option>
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
                            <div class="db-search-box">
                                <label for="liveCrudSearchInput" class="db-toolbar-label">Search Rows:</label>
                                <div class="db-search-input-wrap">
                                    <input type="text" id="liveCrudSearchInput" class="db-search-input" placeholder="Filter rows by keyword, case number, name..." autocomplete="off">
                                    <button type="button" id="liveCrudSearchClearBtn" class="db-search-clear-btn" title="Clear search">✖</button>
                                </div>
                            </div>
                        </div>
                        <div class="db-toolbar-actions-row">
                            <div class="db-stats-group">
                                <span id="liveCrudTableBadge" class="case-badge civil">Table: civilcases</span>
                                <span id="liveCrudRowCountBadge" class="db-row-counter-badge">0 rows</span>
                                <span id="liveCrudStatusBadge" class="db-live-badge">🟢 Supabase Live</span>
                            </div>
                            <div class="db-buttons-group">
                                <button type="button" id="liveCrudRefreshBtn" class="secondary-btn db-action-btn" title="Fetch fresh records from Supabase">🔄 Refresh</button>
                                <button type="button" id="liveCrudInsertBtn" class="primary-btn db-action-btn" title="Insert a new row into selected table">➕ Insert Row</button>
                            </div>
                        </div>
                    </div>

                    <!-- Row Cards -->
                    <div id="liveCrudRowsContainer" class="lc-rows-container">
                        <div class="lc-empty">⏳ Loading table data…</div>
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

var liveCrudCurrentTable = 'civilcases';
var liveCrudRows = [];
var liveCrudListenersWired = false;

function initLiveCrudTab() {
  wireLiveCrudListeners();

  const select = document.getElementById('liveCrudTableSelect');
  if (select && select.value) {
    liveCrudCurrentTable = select.value;
  }
  fetchLiveCrudRows();
}

function wireLiveCrudListeners() {
  if (liveCrudListenersWired) return;
  liveCrudListenersWired = true;

  const select = document.getElementById('liveCrudTableSelect');
  if (select) {
    select.addEventListener('change', () => {
      liveCrudCurrentTable = select.value;
      const searchInput = document.getElementById('liveCrudSearchInput');
      if (searchInput) searchInput.value = '';
      fetchLiveCrudRows();
    });
  }

  const searchInput = document.getElementById('liveCrudSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', () => renderLiveCrudRows());
  }

  const clearBtn = document.getElementById('liveCrudSearchClearBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      renderLiveCrudRows();
    });
  }

  const refreshBtn = document.getElementById('liveCrudRefreshBtn');
  if (refreshBtn) refreshBtn.addEventListener('click', () => fetchLiveCrudRows());

  const insertBtn = document.getElementById('liveCrudInsertBtn');
  if (insertBtn) insertBtn.addEventListener('click', () => openLiveCrudModal('create', null));

  const closeBtn = document.getElementById('lcModalCloseBtn');
  if (closeBtn) closeBtn.addEventListener('click', closeLiveCrudModal);
  const cancelBtn = document.getElementById('lcModalCancelBtn');
  if (cancelBtn) cancelBtn.addEventListener('click', closeLiveCrudModal);

  const overlay = document.getElementById('liveCrudFormModal');
  if (overlay) {
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
    if (liveCrudCurrentTable === 'transactions' && Array.isArray(allPaisaTransactions) && allPaisaTransactions.length > 0) {
      liveCrudRows = allPaisaTransactions.map(t => ({
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
    if (liveCrudCurrentTable === 'personal_transactions' && Array.isArray(allPersonalTransactions) && allPersonalTransactions.length > 0) {
      liveCrudRows = allPersonalTransactions.map(t => ({
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

  if (!ensureSupabaseClient || !ensureSupabaseClient()) {
    if (tryLocalFallback(false)) return;
    if (container) container.innerHTML = '<div class="lc-empty">⚠️ Supabase is not connected. Check your internet connection and refresh.</div>';
    return;
  }

  try {
    const { data, error } = await supabaseClient
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
          const { data: seeded, error: seedErr } = await supabaseClient.from('case_transfers').insert(payload).select();
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

function renderLiveCrudRows() {
  const container = document.getElementById('liveCrudRowsContainer');
  const countBadge = document.getElementById('liveCrudRowCountBadge');
  if (!container) return;

  const searchInput = document.getElementById('liveCrudSearchInput');
  const q = (searchInput ? searchInput.value : '').trim().toLowerCase();

  let rows = liveCrudRows;
  if (q) {
    rows = rows.filter(r => Object.values(r).some(v =>
      v !== null && v !== undefined && String(v).toLowerCase().includes(q)
    ));
  }

  if (countBadge) countBadge.textContent = `${rows.length}${rows.length !== liveCrudRows.length ? ` of ${liveCrudRows.length}` : ''} rows`;

  if (rows.length === 0) {
    container.innerHTML = `<div class="lc-empty">${liveCrudRows.length === 0
      ? `📭 No rows in "${escapeHtml(liveCrudCurrentTable)}" yet. Use ➕ Insert Row to add the first one.`
      : `🔍 No rows match "${escapeHtml(q)}".`}</div>`;
    return;
  }

  container.innerHTML = rows.map((row, idx) => {
    const { headlineKey, secondaryKeys } = getLiveCrudHeadlineFields(row);
    const headline = String(row[headlineKey] ?? '—');
    // For the hearings table, show the case name right after the case number
    let headlineSuffix = '';
    if (liveCrudCurrentTable === 'hearings' && row.case_number) {
      const matchedCase = (allCaseRecords || []).find(c =>
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
    if (action === 'edit') {
      const idx = allPaisaTransactions.findIndex(t => String(t.id) === String(rowId));
      if (idx !== -1) {
        if (payload.amount !== undefined) allPaisaTransactions[idx].amount = Number(payload.amount);
        if (payload.type !== undefined) allPaisaTransactions[idx].type = payload.type;
        if (payload.client_payee !== undefined) allPaisaTransactions[idx].client_payee = payload.client_payee;
        if (payload.category !== undefined) allPaisaTransactions[idx].category = payload.category;
        if (payload.mode !== undefined) allPaisaTransactions[idx].payment_mode = payload.mode;
        if (payload.note !== undefined) allPaisaTransactions[idx].note = payload.note;
        if (payload.txn_date !== undefined) allPaisaTransactions[idx].date = payload.txn_date;
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
      allPaisaTransactions.unshift(newTx);
    }
    savePaisaTransactions(true);
  } else if (liveCrudCurrentTable === 'personal_transactions') {
    if (action === 'edit') {
      const idx = allPersonalTransactions.findIndex(t => String(t.id) === String(rowId));
      if (idx !== -1) {
        if (payload.amount !== undefined) allPersonalTransactions[idx].amount = Number(payload.amount);
        if (payload.type !== undefined) allPersonalTransactions[idx].type = payload.type;
        if (payload.category !== undefined) allPersonalTransactions[idx].category = payload.category;
        if (payload.note !== undefined) allPersonalTransactions[idx].note = payload.note;
        if (payload.txn_date !== undefined) allPersonalTransactions[idx].date = payload.txn_date;
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
      allPersonalTransactions.unshift(newPTx);
    }
    savePersonalData(true);
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

  try {
    let error = null;
    if (action === 'edit') {
      ({ error } = await supabaseClient.from(liveCrudCurrentTable).update(payload).eq('id', rowId));
    } else {
      ({ error } = await supabaseClient.from(liveCrudCurrentTable).insert([payload]));
    }
    if (error) throw error;

    closeLiveCrudModal();
    await fetchLiveCrudRows();
    await performPostCrudRefresh({ toast: `💾 ${action === 'edit' ? 'Row updated' : 'Row inserted'} in ${liveCrudCurrentTable}` });
  } catch (err) {
    console.error('Live CRUD save error:', err);
    if (liveCrudCurrentTable === 'transactions' || liveCrudCurrentTable === 'personal_transactions' || liveCrudCurrentTable === 'case_transfers') {
      closeLiveCrudModal();
      await fetchLiveCrudRows();
      await performPostCrudRefresh({ toast: `💾 Saved locally (Supabase table pending or RLS active)` });
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
    allPaisaTransactions = allPaisaTransactions.filter(t => String(t.id) !== String(rowId));
    savePaisaTransactions(true);
  } else if (liveCrudCurrentTable === 'personal_transactions') {
    allPersonalTransactions = allPersonalTransactions.filter(t => String(t.id) !== String(rowId));
    savePersonalData(true);
  } else if (liveCrudCurrentTable === 'case_transfers') {
    allCaseTransfers = allCaseTransfers.filter(t => String(t.id) !== String(rowId));
    try {
      localStorage.setItem('case_transfers_backup', JSON.stringify(allCaseTransfers));
    } catch (e) {}
    window.allCaseTransfers = allCaseTransfers;
    if (typeof renderRecentTransfersTable === 'function') renderRecentTransfersTable();
    if (typeof updateTransfersCountBadge === 'function') updateTransfersCountBadge();
  }

  try {
    const { error } = await supabaseClient.from(liveCrudCurrentTable).delete().eq('id', rowId);
    if (error) throw error;
    await fetchLiveCrudRows();
    await performPostCrudRefresh({ toast: `🗑️ Row deleted from ${liveCrudCurrentTable}` });
  } catch (err) {
    console.error('Live CRUD delete error:', err);
    if (liveCrudCurrentTable === 'transactions' || liveCrudCurrentTable === 'personal_transactions' || liveCrudCurrentTable === 'case_transfers') {
      await fetchLiveCrudRows();
      await performPostCrudRefresh({ toast: `🗑️ Row deleted locally` });
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

