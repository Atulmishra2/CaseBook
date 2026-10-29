window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs['disposed'] = `<div class="section-header-row">
    <div class="section-title-box">
        <div class="section-icon-badge"><i class="fa-solid fa-box-archive"></i></div>
        <div>
            <h3>Disposed Cases Archive</h3>
        </div>
    </div>
</div>
<div class="table-responsive disposed-table-wrapper overflow-x-auto rounded-xl">
    <table id="disposedCasesTable" class="min-w-full text-left text-sm case-table">
        <thead>
            <tr>
                <th>Case Number / Year</th>
                <th>Case Name</th>
                <th>Court</th>
                <th>Disposal Date</th>
                <th>Disposal Comment</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
</div>
`;

function renderDisposedCasesTable(records) {
  const caseRecords = records || (typeof allCaseRecords !== 'undefined' && Array.isArray(allCaseRecords) ? allCaseRecords : (typeof window !== 'undefined' && Array.isArray(window.allCaseRecords) ? window.allCaseRecords : []));
  const isDisp = typeof isCaseDisposed === 'function'
    ? isCaseDisposed
    : (c) => ((c && (c.caseStatus || c.case_status)) || '').toLowerCase().includes('dispose');

  const disposedCases = caseRecords.filter(isDisp);
  const disposedCountEl = document.getElementById('disposedCount');
  const disposedTable = document.querySelector('#disposedCasesTable tbody');

  if (disposedCountEl) {
    disposedCountEl.textContent = String(disposedCases.length);
  }

  if (disposedTable) {
    if (disposedCases.length === 0) {
      disposedTable.innerHTML = '<tr><td colspan="5" class="no-results" style="text-align:center; padding: 2rem; color: #64748b;">No disposed cases recorded yet.</td></tr>';
      return disposedCases;
    }

    const esc = (typeof escapeHtml === 'function') ? escapeHtml : (str) => String(str || '');
    const rToPlain = (typeof remarksToPlainText === 'function') ? remarksToPlainText : (r) => String(r || '');

    disposedTable.innerHTML = disposedCases.map((c) => {
      const caseNumber = c.caseNo || c.criminalCaseNumber || c.case_number || '—';
      const caseYear = c.caseYear || c.case_year || (c.year ? String(c.year) : '');
      const caseNumberDisplay = caseYear && !caseNumber.includes(String(caseYear))
        ? `<strong>${esc(caseNumber)}</strong> <span class="case-year-subtext">/${esc(caseYear)}</span>`
        : `<strong>${esc(caseNumber)}</strong>`;

      const caseName = c.caseName || c.case_name || (c.plaintiff ? `${c.plaintiff} vs ${c.defendant}` : (c.victimName ? `${c.victimName} vs ${c.accusedName}` : '—'));
      const courtName = c.courtName || c.criminalCourtName || c.court_name || 'District Court';

      const rawDisposalDate = c.disposalDate || c.disposal_date || '';
      const formattedDisposalDate = rawDisposalDate
        ? (typeof formatDate === 'function' ? formatDate(rawDisposalDate) : (typeof formatHearingDate === 'function' ? formatHearingDate(rawDisposalDate) : rawDisposalDate))
        : '';

      const disposalComment = c.disposalComment || c.disposal_comment || rToPlain(c.remark || c.remarks || '') || '';
      const disposalCommentHtml = disposalComment
        ? `<span class="case-disposal-clamp" data-remarks-tooltip="${esc(disposalComment)}" data-remarks-title="Disposal Note &amp; Judgment" data-case-no="${esc(caseNumber)}"><i class="fa-solid fa-scale-balanced" style="color: #0d9488; margin-right: 4px;"></i>${esc(disposalComment)}</span>`
        : '<span style="color: #94a3b8;">—</span>';

      const dateHtml = formattedDisposalDate
        ? `<i class="fa-solid fa-calendar-check" style="color: #059669; margin-right: 4px;"></i>${esc(formattedDisposalDate)}`
        : '<span style="color: #94a3b8;">—</span>';

      return `
        <tr class="disposed-row-clickable" onclick="openCaseDetailsFullModal('${esc(caseNumber)}', null, '${esc(c.caseType || c.case_type || '')}', '${esc(c.id || '')}')" title="Click to view Case Dossier">
          <td class="case-number-cell">${caseNumberDisplay}</td>
          <td class="case-name-cell">${esc(caseName)}</td>
          <td class="case-court-cell">${esc(courtName)}</td>
          <td class="case-date-cell" style="white-space: nowrap;">${dateHtml}</td>
          <td class="case-disposal-cell">${disposalCommentHtml}</td>
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
