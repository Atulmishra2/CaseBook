window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs['disposed'] = `<div class="section-header-row">
    <div class="section-title-box">
        <div class="section-icon-badge"><i class="fa-solid fa-box-archive"></i></div>
        <div>
            <h3>Disposed Cases Archive</h3>
            <p class="section-subtitle">Historical archive of finalized judgments, disposed matters, and closed case files</p>
            <div class="header-chips-row">
                <button type="button" class="header-chip-btn" onclick="showTab('all')"><i class="fa-solid fa-magnifying-glass"></i> All Cases</button>
            </div>
        </div>
    </div>
</div>
<div class="table-responsive overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-900/5">
    <table id="disposedCasesTable" class="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700 case-table">
        <thead class="bg-slate-50 text-slate-700 font-semibold text-xs uppercase tracking-wider">
            <tr>
                <th>Case Number</th>
                <th>Case Name</th>
                <th>Client</th>
                <th>Case Type</th>
                <th>Court</th>
                <th>Status</th>
                <th>Parties Remark</th>
                <th>Disposal Comment</th>
                <th class="table-actions-th" style="text-align:center;">Actions</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 bg-white"></tbody>
    </table>
</div>
`;

function renderDisposedCasesTable(records) {
  const caseRecords = records || (typeof allCaseRecords !== 'undefined' && Array.isArray(allCaseRecords) ? allCaseRecords : (typeof window !== 'undefined' && Array.isArray(window.allCaseRecords) ? window.allCaseRecords : []));
  const isDisp = typeof isCaseDisposed === 'function'
    ? isCaseDisposed
    : (c) => ((c && c.caseStatus) || '').toLowerCase().includes('dispose');

  const disposedCases = caseRecords.filter(isDisp);
  const disposedCountEl = document.getElementById('disposedCount');
  const disposedTable = document.querySelector('#disposedCasesTable tbody');

  if (disposedCountEl) {
    disposedCountEl.textContent = String(disposedCases.length);
  }

  if (disposedTable) {
    if (disposedCases.length === 0) {
      disposedTable.innerHTML = '<tr><td colspan="9" class="no-results" style="text-align:center; padding: 2rem; color: #64748b;">No disposed cases recorded yet.</td></tr>';
      return disposedCases;
    }

    const esc = (typeof escapeHtml === 'function') ? escapeHtml : (str) => String(str || '');
    const rToPlain = (typeof remarksToPlainText === 'function') ? remarksToPlainText : (r) => String(r || '');

    disposedTable.innerHTML = disposedCases.map((c) => {
      const caseNumber = c.caseNo || c.criminalCaseNumber || '—';
      const caseName = c.caseName || (c.plaintiff ? `${c.plaintiff} vs ${c.defendant}` : (c.victimName ? `${c.victimName} vs ${c.accusedName}` : '—'));
      const partiesRemark = c.remark || c.remarks || '';
      const partiesRemarkHtml = (typeof renderCaseTableRemarks === 'function')
        ? renderCaseTableRemarks(partiesRemark, caseNumber, caseName)
        : esc(partiesRemark);

      const disposalComment = c.disposalComment || c.disposal_comment || '';
      const disposalCommentHtml = disposalComment
        ? `<span class="case-disposal-clamp" title="${esc(disposalComment)}"><i class="fa-solid fa-scale-balanced"></i> ${esc(disposalComment)}</span>`
        : rToPlain(partiesRemark)
          ? `<span class="case-disposal-clamp" title="${esc(rToPlain(partiesRemark))}"><i class="fa-solid fa-scale-balanced"></i> ${esc(rToPlain(partiesRemark))}</span>`
          : '<span style="color: #94a3b8;">—</span>';

      return `
        <tr>
          <td><strong>${esc(caseNumber)}</strong></td>
          <td>${esc(caseName)}</td>
          <td>${esc(c.clientName || c.criminalClientName || '—')}</td>
          <td><span class="case-badge ${c.caseType || 'civil'}">${(c.caseType || 'Civil').toUpperCase()}</span></td>
          <td>${esc(c.courtName || c.criminalCourtName || 'District Court')}</td>
          <td><span class="status-badge disposed"><i class="fa-solid fa-circle-check"></i> Disposed</span></td>
          <td class="case-remark-cell">${partiesRemarkHtml}</td>
          <td class="case-disposal-cell">${disposalCommentHtml}</td>
          <td class="table-actions-td" style="text-align: center; white-space: nowrap;">
            <button type="button" class="table-view-btn edit-case-btn" onclick="editCaseFromTable('${esc(caseNumber)}')" title="Edit / Reopen Case"><i class="fa-solid fa-pen-to-square"></i><span class="btn-text"> Edit</span></button>
          </td>
        </tr>
      `;
    }).join('');
  }
  return disposedCases;
}

function initDisposedTab() {
  renderDisposedCasesTable();
}

if (typeof renderDisposedCasesTable !== 'undefined') window.renderDisposedCasesTable = renderDisposedCasesTable;
if (typeof initDisposedTab !== 'undefined') window.initDisposedTab = initDisposedTab;
