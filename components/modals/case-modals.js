window.__casebook_modals = window.__casebook_modals || {};
window.__casebook_modals['case-modals'] = `    <!-- Full Case Details Modal Dialog -->
    <div
      id="caseDetailsFullModal"
      class="modal-overlay hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="caseDetailsModalTitle"
      onclick="if (event.target === this) closeCaseDetailsFullModal();"
    >
      <div class="modal-card" style="max-width: 800px; width: 90%">
        <div class="modal-header">
          <div class="modal-header-info">
            <div class="modal-icon">
              <i class="fa-solid fa-folder-open"></i>
            </div>
            <div>
              <h3 id="caseDetailsModalTitle" style="font-size: 1.25rem">
                Case Details
              </h3>
              <p id="caseDetailsModalSubtitle" class="modal-subtitle">
                Full overview of case, parties, and status.
              </p>
            </div>
          </div>
          <button
            type="button"
            class="modal-close-btn"
            aria-label="Close Case Details"
            onclick="closeCaseDetailsFullModal()"
          >
            &times;
          </button>
        </div>

        <div
          class="modal-body"
          style="
            padding: 24px;
            max-height: 70vh;
            overflow-y: auto;
            background: #f8fafc;
          "
        >
          <div id="caseDetailsModalContent">
            <!-- Injected dynamically -->
          </div>
        </div>
        <div
          class="modal-footer"
          style="
            padding: 16px 24px;
            display: flex;
            justify-content: flex-end;
            gap: 10px;
            border-top: 1px solid #e2e8f0;
            background: #fff;
            flex-wrap: wrap;
          "
        >
          <button
            type="button"
            class="btn btn-out"
            onclick="closeCaseDetailsFullModal()"
          >
            Close
          </button>
          <button type="button" class="btn btn-out" id="cdmDossierBtn">
            <i class="fa-solid fa-print"></i> Print Dossier
          </button>
          <button type="button" class="btn btn-out" id="cdmHistoryBtn">
            <i class="fa-solid fa-clock-rotate-left"></i> Hearing History
          </button>
          <button type="button" class="btn btn-dark" id="cdmEditBtn">
            <i class="fa-solid fa-pen-to-square"></i> Edit Case
          </button>
        </div>
      </div>
    </div>

    <!-- Case Hearing & Process History Modal Dialog -->
    <div
      id="caseHistoryModal"
      class="modal-overlay hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="historyModalTitle"
    >
      <div class="modal-card">
        <div class="modal-header">
          <div class="modal-header-info">
            <div class="modal-icon">ðŸ“œ</div>
            <div>
              <h3 id="historyModalTitle">Case Hearing & Process History</h3>
              <p id="historyModalSubtitle" class="modal-subtitle">
                Track previous court appearances, stages, and proceedings.
              </p>
            </div>
          </div>
          <button
            type="button"
            id="closeCaseHistoryModalBtn"
            class="modal-close-btn"
            aria-label="Close Case History"
          >
            &times;
          </button>
        </div>

        <div class="modal-case-summary">
          <div class="summary-chip">
            <span class="chip-label">Case No:</span>
            <strong id="modalCaseNo">â€”</strong>
          </div>
          <div class="summary-chip">
            <span class="chip-label">Case Title:</span>
            <strong id="modalCaseTitle">â€”</strong>
          </div>
          <div class="summary-chip">
            <span class="chip-label">Court:</span>
            <strong id="modalCourtName">â€”</strong>
          </div>
          <div class="summary-chip">
            <span class="chip-label">Next Hearing:</span>
            <span id="modalNextHearingBadge" class="case-badge civil">â€”</span>
          </div>
        </div>

        <div class="modal-body">
          <div class="history-table-container">
            <table class="history-table">
              <thead>
                <tr>
                  <th style="width: 40px">#</th>
                  <th style="width: 130px">Hearing Date</th>
                  <th style="width: 180px">Process / Stage</th>
                  <th style="width: 140px">Status / Type</th>
                  <th>Court Action & Proceedings</th>
                </tr>
              </thead>
              <tbody id="caseHistoryTableBody">
                <!-- Injected dynamically -->
              </tbody>
            </table>
          </div>

          <div id="caseHistoryEmpty" class="case-details-empty hidden">
            <p>â„¹ï¸ No previous hearings recorded yet for this case.</p>
          </div>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            id="modalUpdateHearingBtn"
            class="detail-action-btn secondary"
          >
            ðŸ“… Update Next Hearing
          </button>
          <button
            type="button"
            id="modalCloseBtn"
            class="detail-action-btn secondary-action"
          >
            Close
          </button>
        </div>
      </div>
    </div>

    <!-- PWA & Mobile Installation Guide Modal -->
    <div
      id="pwaGuideModal"
      class="modal-overlay hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pwaGuideTitle"
    >
      <div class="pwa-modal-shell">
        <div class="pwa-modal-header">
          <h3 id="pwaGuideTitle">ðŸ“² Install App & Create Shortcut</h3>
          <button
            type="button"
            class="modal-close-btn"
            onclick="closePwaGuideModal()"
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <div class="pwa-modal-body">
          <div
            class="pwa-card-section"
            style="border-left: 4px solid #00695c; background: #f0fdf4"
          >
            <h4
              style="
                color: #00695c;
                display: flex;
                align-items: center;
                gap: 8px;
              "
            >
              <i class="fa-solid fa-desktop"></i> ðŸ’» Desktop Install (Windows
              / Mac / PC)
            </h4>
            <ol class="pwa-step-list">
              <li>
                Look at your browser's <strong>Address Bar (URL bar)</strong> at
                the top right.
              </li>
              <li>
                Click the <strong>Install icon (ðŸ’» or âž•)</strong> that says
                <em>"Install CaseBook"</em>.
              </li>
              <li>
                OR click your browser menu
                <strong>(three dots â‹® or â€¦)</strong> âž” Select
                <strong>"Install CaseBook..."</strong> (or
                <em>"Save and share"</em> âž” <em>"Install page as app"</em>).
              </li>
              <li>
                Click <strong>"Install"</strong>. CaseBook will open in its own
                standalone desktop window and place a shortcut on your Desktop
                and Taskbar!
              </li>
            </ol>
          </div>

          <div class="pwa-card-section">
            <h4>ðŸš€ Quick Install (Mobile / Smartphone)</h4>
            <ol class="pwa-step-list">
              <li>
                Tap the <strong>three dots (â‹®)</strong> menu in the top right
                of Chrome.
              </li>
              <li>
                Tap <strong>"Install app"</strong> or
                <strong>"Add to Home screen"</strong>.
              </li>
              <li>
                Confirm by tapping <strong>"Install"</strong> or
                <strong>"Add"</strong>.
              </li>
            </ol>
          </div>

          <div class="pwa-card-section">
            <h4>
              âš ï¸ Shortcut Not Appearing? (Xiaomi / Realme / Oppo / Vivo)
            </h4>
            <p style="margin-top: 0">
              Many Android phone launchers block Chrome from creating shortcuts
              by default. Follow these steps to fix:
            </p>
            <ol class="pwa-step-list">
              <li>
                Open phone <strong>Settings âš™ï¸</strong> âž”
                <strong>Apps</strong> âž” <strong>Manage Apps</strong>
              </li>
              <li>Find and select <strong>Chrome</strong></li>
              <li>
                Tap <strong>Permissions</strong> (or
                <strong>Other Permissions</strong>)
              </li>
              <li>
                Find <strong>"Home screen shortcuts"</strong> (or "Add
                shortcuts")
              </li>
              <li>Change it to <strong>"Always allow"</strong></li>
              <li>
                Ensure phone's <em>"Lock Home screen layout"</em> is turned OFF.
              </li>
            </ol>
          </div>

          <div class="pwa-alert-warning">
            <strong>Note:</strong> Chrome disables shortcut creation in
            <em>Incognito tabs</em>. Make sure you are using a standard browser
            tab.
          </div>
        </div>
        <div
          class="modal-footer"
          style="
            padding: 14px 20px;
            background: #f8fafc;
            border-top: 1px solid #e2e8f0;
            display: flex;
            justify-content: flex-end;
          "
        >
          <button
            type="button"
            class="primary-btn"
            onclick="closePwaGuideModal()"
            style="padding: 8px 20px; border-radius: 8px"
          >
            Got It ðŸ‘
          </button>
        </div>
      </div>
    </div>

    <!-- Quick Set / Edit Task Reminder Modal -->
    <div
      id="caseRemarkModal"
      class="modal-overlay hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="caseRemarkModalTitle"
      onclick="if (event.target === this) closeCaseRemarkModal();"
    >
      <div class="modal-card modal-card-sm case-remark-modal-box">
        <div class="modal-header">
          <div class="modal-header-info">
            <div
              class="modal-icon"
              style="background: rgba(59, 130, 246, 0.12); color: #2563eb"
            >
              <i class="fa-solid fa-layer-group"></i>
            </div>
            <div>
              <h3
                id="caseRemarkModalTitle"
                style="
                  margin: 0;
                  font-size: 16px;
                  font-weight: 700;
                  color: #0f172a;
                "
              >
                Case Remarks &amp; Structured Details
              </h3>
              <p
                style="margin: 2px 0 0 0; font-size: 12px; color: #64748b"
                id="caseRemarkModalSubtitle"
                class="modal-subtitle"
              >
                Case: <strong id="caseRemarkModalCaseNo">â€”</strong>
              </p>
            </div>
          </div>
          <button
            type="button"
            class="modal-close-btn"
            onclick="closeCaseRemarkModal()"
            aria-label="Close"
            title="Close"
          >
            &times;
          </button>
        </div>
        <div
          class="modal-body"
          style="padding: 18px 20px; max-height: 65vh; overflow-y: auto"
        >
          <div id="caseRemarkModalContent" class="remark-modal-grid">
            <!-- Populated dynamically with beautified cards -->
          </div>
        </div>
        <div
          class="modal-footer"
          style="
            padding: 12px 20px;
            background: #f8fafc;
            border-top: 1px solid #e2e8f0;
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <div style="display: flex; gap: 8px">
            <button
              type="button"
              class="table-view-btn"
              id="caseRemarkCopyTextBtn"
              onclick="copyRemarkDataToClipboard('text')"
              title="Copy Remarks as formatted text"
            >
              <i class="fa-regular fa-copy"></i> Copy Text
            </button>
            <button
              type="button"
              class="table-view-btn"
              id="caseRemarkCopyJsonBtn"
              onclick="copyRemarkDataToClipboard('json')"
              title="Copy raw remarks JSON"
            >
              <i class="fa-solid fa-code"></i> Copy JSON
            </button>
          </div>
          <button
            type="button"
            class="primary-btn"
            onclick="closeCaseRemarkModal()"
            style="padding: 8px 18px; border-radius: 8px"
          >
            Done
          </button>
        </div>
      </div>
    </div>

`;

// ==============================================================================
// Case Full Details & History Rendering
// ==============================================================================

function getCaseHearingHistory(caseNumber) {
  if (!caseNumber) return [];
  const normalized = caseNumber.trim().toLowerCase();
  const cleanKey = normalized.replace(/[^a-z0-9]/g, '');

  const list = allHearingRecords.filter(h => {
    const hNo = (h.case_number || '').trim().toLowerCase();
    if (hNo === normalized) return true;
    if (cleanKey && hNo.replace(/[^a-z0-9]/g, '') === cleanKey) return true;
    // Fallback: If case is Cr.Rev./129/2026 and hearing is Cri-Rev-
    if ((normalized === 'cr.rev./129/2026' || normalized.includes('129/2026')) && hNo === 'cri-rev-') return true;
    return false;
  });

  // Sort descending by hearing_date
  return list.sort((a, b) => {
    const da = new Date(a.hearing_date || a.created_at);
    const db = new Date(b.hearing_date || b.created_at);
    return db - da;
  });
}

function renderSelectedCaseDetails(caseObj) {
  const emptyBox = document.getElementById('searchCaseDetailsEmpty');
  const contentBox = document.getElementById('searchCaseDetailsContent');
  const badge = document.getElementById('searchCaseTypeBadge');

  if (!caseObj) {
    if (emptyBox) emptyBox.classList.remove('hidden');
    if (contentBox) contentBox.classList.add('hidden');
    const addTodoBtn = document.getElementById('searchAddTodoBtn');
    if (addTodoBtn) addTodoBtn.style.display = 'none';
    if (badge) {
      badge.textContent = 'Select a Case';
      badge.className = 'case-badge';
    }
    return;
  }

  if (emptyBox) emptyBox.classList.add('hidden');
  if (contentBox) contentBox.classList.remove('hidden');

  const caseNumber = caseObj.caseNo || caseObj.criminalCaseNumber || '—';
  const rawType = (caseObj.caseType || 'civil').toLowerCase().trim();
  const isCriminal = rawType === 'state' || rawType === 'criminal' || rawType === 'misc_criminal';
  const isFamily = rawType === 'family';
  const isRevenue = rawType === 'revenue';

  let typeBadgeLabel = 'CIVIL';
  if (isCriminal) typeBadgeLabel = 'STATE (CRIMINAL)';
  else if (isFamily) typeBadgeLabel = 'FAMILY';
  else if (isRevenue) typeBadgeLabel = 'REVENUE';
  else if (rawType === 'complaint') typeBadgeLabel = 'COMPLAINT';
  else typeBadgeLabel = rawType.replace('_', ' ').toUpperCase();

  if (badge) {
    badge.textContent = typeBadgeLabel;
    badge.className = `case-badge ${rawType}`;
  }

  // Build accurate title
  let caseTitle = (caseObj.caseName || '').trim();
  if (!caseTitle || caseTitle.toLowerCase() === 'vs' || caseTitle.toLowerCase() === 'vs.') {
    if (caseObj.plaintiff && caseObj.defendant) {
      caseTitle = `${caseObj.plaintiff} vs ${caseObj.defendant}`;
    } else if (caseObj.victimName && caseObj.accusedName) {
      caseTitle = `${caseObj.victimName} vs ${caseObj.accusedName}`;
    } else if (caseObj.accusedName) {
      caseTitle = `State vs ${caseObj.accusedName}`;
    } else if (caseObj.plaintiff) {
      caseTitle = `${caseObj.plaintiff} vs Opposite`;
    } else {
      caseTitle = caseNumber !== '—' ? `Case ${caseNumber}` : 'Untitled Matter';
    }
  }

  const titleEl = document.getElementById('detailCaseTitle');
  if (titleEl) titleEl.textContent = caseTitle;

  const setVal = (id, val, fallback = '—') => {
    const el = document.getElementById(id);
    if (el) el.textContent = val || fallback;
  };

  const courtName = caseObj.courtName || caseObj.criminalCourtName || 'District Court';
  setVal('detailCaseNo', caseNumber);
  setVal('detailCourtName', courtName);

  const isDisposed = (caseObj.caseStatus || '').toLowerCase().includes('dispose');
  const isUndated = !caseObj.nextHearing || caseObj.nextHearing === '—' || caseObj.nextHearing === 'null' || !caseObj.nextHearing.trim() || caseObj.nextHearing.toLowerCase() === 'undated';

  const statusBadgeEl = document.getElementById('detailCaseStatusBadge');
  if (statusBadgeEl) {
    if (isDisposed) {
      statusBadgeEl.className = 'status-badge disposed';
      statusBadgeEl.innerHTML = '<i class="fa-solid fa-circle-check"></i> Disposed Off';
    } else if (isUndated) {
      statusBadgeEl.className = 'status-badge undated';
      statusBadgeEl.style = 'background:#fef3c7; color:#92400e; border:1px solid #fde68a;';
      statusBadgeEl.innerHTML = '<i class="fa-solid fa-calendar-xmark"></i> Undated';
    } else {
      statusBadgeEl.className = 'status-badge pending';
      statusBadgeEl.style = '';
      statusBadgeEl.innerHTML = '<i class="fa-solid fa-clock"></i> Pending';
    }
  }

  setVal('detailNextHearing', isUndated ? '—' : formatDateDMY(caseObj.nextHearing));
  setVal('detailHearingProcess', isUndated ? 'Undated' : (caseObj.hearingProcess || 'Scheduled Hearing'));

  // Determine previous hearing
  const caseHistory = getCaseHearingHistory(caseNumber);
  const currentNext = (caseObj.nextHearing && caseObj.nextHearing !== '—') ? caseObj.nextHearing : null;
  const currentNextISO = toISODate(caseObj.nextHearing);
  const todayISO = toISODate(new Date());

  const prevHearings = caseHistory.filter(h => {
    const hISO = toISODate(h.hearing_date);
    if (currentNextISO && hISO === currentNextISO) return false;
    // A future hearing is an upcoming date, never a "previous" hearing
    if (hISO && hISO > todayISO) return false;
    return true;
  });
  const latestPrev = prevHearings[0];
  const prevHearingDate = latestPrev ? latestPrev.hearing_date : (caseObj.previousHearing || null);
  const prevProcess = latestPrev ? latestPrev.process : (caseObj.previousProcess || null);

  // 1. CARD 1: Court & Case Info (Only related & present fields)
  const courtCardBody = document.getElementById('detailCourtCardBody');
  if (courtCardBody) {
    const filingDate = caseObj.filingDate || caseObj.crimeFilingDate;
    const filingDateFormatted = (filingDate && filingDate !== '—') ? formatDateDMY(filingDate) : null;
    const year = caseObj.caseYear || caseObj.crimeYear || null;

    let props = '';
    props += `
      <div class="dossier-prop">
        <span class="prop-label">Case Type</span>
        <span class="prop-val font-semibold">${escapeHtml(typeBadgeLabel)}</span>
      </div>
    `;
    if (year) {
      props += `
        <div class="dossier-prop">
          <span class="prop-label">Registration Year</span>
          <span class="prop-val">${escapeHtml(year)}</span>
        </div>
      `;
    }
    props += `
      <div class="dossier-prop">
        <span class="prop-label">Court / Forum</span>
        <span class="prop-val font-semibold">${escapeHtml(courtName)}</span>
      </div>
    `;
    if (filingDateFormatted) {
      props += `
        <div class="dossier-prop">
          <span class="prop-label">Filing Date</span>
          <span class="prop-val">${escapeHtml(filingDateFormatted)}</span>
        </div>
      `;
    }
    if (prevHearingDate && prevHearingDate !== '—') {
      props += `
        <div class="dossier-prop">
          <span class="prop-label">Previous Hearing</span>
          <span class="prop-val">${escapeHtml(formatDateDMY(prevHearingDate))}</span>
        </div>
      `;
    }
    if (prevProcess && prevProcess !== '—') {
      props += `
        <div class="dossier-prop">
          <span class="prop-label">Previous Stage</span>
          <span class="prop-val">${escapeHtml(prevProcess)}</span>
        </div>
      `;
    }
    if (!isUndated && caseObj.hearingProcess) {
      props += `
        <div class="dossier-prop">
          <span class="prop-label">Next Stage</span>
          <span class="prop-val font-semibold" style="color: #1e40af;">${escapeHtml(caseObj.hearingProcess)}</span>
        </div>
      `;
    }
    courtCardBody.innerHTML = props;
  }

  // 2. CARD 2: Parties & Particulars (Show ONLY related fields for this case type!)
  const partiesCardBody = document.getElementById('detailPartiesCardBody');
  if (partiesCardBody) {
    let props = '';

    if (isCriminal) {
      const stateParty = caseObj.firstParty || caseObj.victimName || 'State of U.P.';
      props += `
        <div class="dossier-prop">
          <span class="prop-label">Prosecution / State</span>
          <span class="prop-val font-semibold text-slate-800">${escapeHtml(stateParty)}</span>
        </div>
      `;
      if (caseObj.accusedName) {
        props += `
          <div class="dossier-prop">
            <span class="prop-label">Accused Person(s)</span>
            <span class="prop-val font-semibold text-slate-900">${escapeHtml(caseObj.accusedName)}</span>
          </div>
        `;
      }
      if (caseObj.policeStation) {
        props += `
          <div class="dossier-prop">
            <span class="prop-label">Police Station</span>
            <span class="prop-val">🚔 ${escapeHtml(caseObj.policeStation)}</span>
          </div>
        `;
      }
      if (caseObj.crimeNumber || caseObj.firNumber) {
        props += `
          <div class="dossier-prop">
            <span class="prop-label">Crime / FIR No.</span>
            <span class="prop-val font-semibold">${escapeHtml(caseObj.crimeNumber || caseObj.firNumber)}</span>
          </div>
        `;
      }
      if (caseObj.crimeSection) {
        props += `
          <div class="dossier-prop">
            <span class="prop-label">Sections / IPC / BNS</span>
            <span class="prop-val">${escapeHtml(caseObj.crimeSection)}</span>
          </div>
        `;
      }
      if (caseObj.custodyStatus) {
        props += `
          <div class="dossier-prop">
            <span class="prop-label">Custody / Bail Status</span>
            <span class="prop-val">${escapeHtml(caseObj.custodyStatus)}</span>
          </div>
        `;
      }
    } else if (isFamily) {
      const petitioner = caseObj.petitioner || caseObj.plaintiff;
      const respondent = caseObj.respondent || caseObj.defendant;
      if (petitioner) {
        props += `
          <div class="dossier-prop">
            <span class="prop-label">Petitioner / Applicant</span>
            <span class="prop-val font-semibold">${escapeHtml(petitioner)}</span>
          </div>
        `;
      }
      if (respondent) {
        props += `
          <div class="dossier-prop">
            <span class="prop-label">Respondent / Opposite</span>
            <span class="prop-val font-semibold">${escapeHtml(respondent)}</span>
          </div>
        `;
      }
      if (caseObj.familyMatterType || caseObj.matterType) {
        props += `
          <div class="dossier-prop">
            <span class="prop-label">Dispute / Matter Type</span>
            <span class="prop-val">${escapeHtml(caseObj.familyMatterType || caseObj.matterType)}</span>
          </div>
        `;
      }
      if (caseObj.marriageDate) {
        props += `
          <div class="dossier-prop">
            <span class="prop-label">Marriage Date</span>
            <span class="prop-val">${formatDateDMY(caseObj.marriageDate)}</span>
          </div>
        `;
      }
      if (caseObj.maintenance) {
        props += `
          <div class="dossier-prop">
            <span class="prop-label">Maintenance Ordered</span>
            <span class="prop-val font-semibold text-emerald-800">${escapeHtml(caseObj.maintenance)}</span>
          </div>
        `;
      }
    } else if (isRevenue) {
      const applicant = caseObj.plaintiff || caseObj.applicant || caseObj.firstParty;
      const opposite = caseObj.defendant || caseObj.respondent || caseObj.oppositeParty;
      if (applicant) {
        props += `
          <div class="dossier-prop">
            <span class="prop-label">Applicant / Petitioner</span>
            <span class="prop-val font-semibold">${escapeHtml(applicant)}</span>
          </div>
        `;
      }
      if (opposite) {
        props += `
          <div class="dossier-prop">
            <span class="prop-label">Opposite Party</span>
            <span class="prop-val font-semibold">${escapeHtml(opposite)}</span>
          </div>
        `;
      }
      if (caseObj.revenueMatterType) {
        props += `
          <div class="dossier-prop">
            <span class="prop-label">Revenue Matter</span>
            <span class="prop-val">${escapeHtml(caseObj.revenueMatterType)}</span>
          </div>
        `;
      }
      if (caseObj.village) {
        props += `
          <div class="dossier-prop">
            <span class="prop-label">Village / Mauza</span>
            <span class="prop-val">${escapeHtml(caseObj.village)}</span>
          </div>
        `;
      }
      if (caseObj.khataNo || caseObj.gataNo) {
        props += `
          <div class="dossier-prop">
            <span class="prop-label">Khata / Gata No.</span>
            <span class="prop-val font-semibold">${escapeHtml([caseObj.khataNo ? `Khata: ${caseObj.khataNo}` : '', caseObj.gataNo ? `Gata: ${caseObj.gataNo}` : ''].filter(Boolean).join(' | '))}</span>
          </div>
        `;
      }
    } else {
      // Civil / Standard
      const plaintiff = caseObj.plaintiff || caseObj.firstParty;
      const defendant = caseObj.defendant || caseObj.oppositeParty;
      if (plaintiff) {
        props += `
          <div class="dossier-prop">
            <span class="prop-label">Plaintiff / Petitioner</span>
            <span class="prop-val font-semibold">${escapeHtml(plaintiff)}</span>
          </div>
        `;
      }
      if (defendant) {
        props += `
          <div class="dossier-prop">
            <span class="prop-label">Defendant / Respondent</span>
            <span class="prop-val font-semibold">${escapeHtml(defendant)}</span>
          </div>
        `;
      }
      if (caseObj.matterType) {
        props += `
          <div class="dossier-prop">
            <span class="prop-label">Matter / Suit Nature</span>
            <span class="prop-val">${escapeHtml(caseObj.matterType)}</span>
          </div>
        `;
      }
    }

    if (!props.trim()) {
      props = `<div class="dossier-prop"><span class="prop-label">Parties</span><span class="prop-val">${escapeHtml(caseTitle)}</span></div>`;
    }
    partiesCardBody.innerHTML = props;
  }

  // 3. CARD 3: Client & Documents
  const clientCardBody = document.getElementById('detailClientCardBody');
  if (clientCardBody) {
    const clientName = caseObj.clientName || caseObj.criminalClientName;
    const clientPhone = caseObj.clientNumber || caseObj.criminalClientNumber;
    const docLink = caseObj.docLink || caseObj.doc_link;

    let statusBadgeHtml = '';
    if (isDisposed) {
      statusBadgeHtml = '<span class="status-badge disposed"><i class="fa-solid fa-circle-check"></i> Disposed Off</span>';
    } else if (isUndated) {
      statusBadgeHtml = '<span class="status-badge undated" style="background:#fef3c7; color:#92400e; border:1px solid #fde68a;"><i class="fa-solid fa-calendar-xmark"></i> Undated</span>';
    } else {
      statusBadgeHtml = '<span class="status-badge pending"><i class="fa-solid fa-clock"></i> Pending</span>';
    }

    let props = '';
    props += `
      <div class="dossier-prop">
        <span class="prop-label">Client Name</span>
        <span class="prop-val font-semibold text-teal-800">${escapeHtml(clientName || '—')}</span>
      </div>
    `;
    if (clientPhone) {
      props += `
        <div class="dossier-prop">
          <span class="prop-label">Client Contact</span>
          <span class="prop-val"><a href="tel:${escapeHtml(clientPhone)}" style="color:#2563eb; text-decoration:none;">📞 ${escapeHtml(clientPhone)}</a></span>
        </div>
      `;
    }
    props += `
      <div class="dossier-prop">
        <span class="prop-label">Case Status</span>
        <span class="prop-val">${statusBadgeHtml}</span>
      </div>
    `;
    const cleanDoc = safeUrl(docLink);
    if (cleanDoc) {
      props += `
        <div class="dossier-prop">
          <span class="prop-label">Order Sheet / File</span>
          <span class="prop-val"><a href="${cleanDoc}" target="_blank" rel="noopener noreferrer" class="doc-link-pill">🔗 Open Document ↗</a></span>
        </div>
      `;
    } else {
      props += `
        <div class="dossier-prop">
          <span class="prop-label">Order Sheet / File</span>
          <span class="prop-val" style="color: #94a3b8;">None attached</span>
        </div>
      `;
    }
    clientCardBody.innerHTML = props;
  }

  // 4. Remarks, Co-Parties & Disposal Box
  const remarkEl = document.getElementById('detailCaseRemark');
  if (remarkEl) {
    const remark = caseObj.remark || caseObj.remarks || '';
    const norm = normalizeRemarksData(remark);
    if (norm.type !== 'empty') {
      remarkEl.innerHTML = renderStructuredRemarks(remark);
    } else {
      remarkEl.innerHTML = '<span style="color:#94a3b8; font-style:italic;">No co-parties or remarks recorded for this case.</span>';
    }
  }

  const disposalEl = document.getElementById('detailCaseDisposalComment');
  if (disposalEl) {
    const disposalComment = caseObj.disposalComment || caseObj.disposal_comment || '';
    if (disposalComment && disposalComment.trim()) {
      disposalEl.innerHTML = `<span style="color:#065f46; font-weight:600;"><i class="fa-solid fa-scale-balanced"></i>️ ${escapeHtml(disposalComment.trim())}</span>`;
    } else {
      disposalEl.innerHTML = '<span style="color:#94a3b8; font-style:italic;">No disposal comment recorded yet.</span>';
    }
  }

  // 5. PROCEEDINGS & HEARING HISTORY (Dynamic Inline Table)
  const history = getCaseHearingHistory(caseNumber);
  const events = [];

  // Recorded hearings from history
  history.forEach(h => {
    const isNext = Boolean(currentNextISO && toISODate(h.hearing_date) === currentNextISO);
    events.push({
      date: h.hearing_date,
      process: h.process || 'Court Hearing',
      type: isNext ? 'next' : 'prev',
      action: h.action_taken || h.remarks || 'Court proceedings conducted.'
    });
  });

  // Add next hearing milestone if scheduled
  if (currentNext && !events.some(e => toISODate(e.date) === currentNextISO)) {
    events.push({
      date: currentNext,
      process: caseObj.hearingProcess || 'Scheduled Hearing',
      type: 'next',
      action: `Next appearance scheduled at ${courtName}`
    });
  }

  // Add previous hearing milestone if recorded on caseObj
  if (caseObj.previousHearing && caseObj.previousHearing !== '—' && !events.some(e => e.date === caseObj.previousHearing)) {
    events.push({
      date: caseObj.previousHearing,
      process: caseObj.previousProcess || 'Previous Stage',
      type: 'prev',
      action: `Previous proceedings recorded at ${courtName}`
    });
  }

  // Add filing date milestone
  const filingDateVal = caseObj.filingDate || caseObj.crimeFilingDate;
  if (filingDateVal && filingDateVal !== '—' && !events.some(e => e.date === filingDateVal)) {
    events.push({
      date: filingDateVal,
      process: 'Case Inception & Filing',
      type: 'filing',
      action: `Case instituted and registered at ${courtName}`
    });
  }

  // Sort newest first
  events.sort((a, b) => {
    const da = new Date(a.date);
    const db = new Date(b.date);
    return db - da;
  });

  const inlineTbody = document.getElementById('detailInlineHistoryTableBody');
  if (inlineTbody) {
    if (events.length === 0) {
      inlineTbody.innerHTML = `
        <tr>
          <td colspan="5" class="no-results text-center py-4" style="color: #64748b; padding: 2rem;">
            ℹ️ No proceedings or hearing history records logged yet for this case.
            <div style="margin-top: 8px;">
              <button type="button" class="table-view-btn" onclick="openUpdateHearingForCase('${escapeHtml(caseNumber)}')" style="font-size: 0.8rem;">
                📅 Log Next Hearing
              </button>
            </div>
          </td>
        </tr>
      `;
    } else {
      inlineTbody.innerHTML = events.map((ev, idx) => {
        let badgeHtml = '';
        if (ev.type === 'next') {
          badgeHtml = '<span class="history-badge-next" style="background:#e6f4ea; color:#137333; padding:3px 10px; border-radius:12px; font-size:11px; font-weight:600;"><i class="fa-solid fa-clock"></i> Upcoming Hearing</span>';
        } else if (ev.type === 'filing') {
          badgeHtml = '<span class="history-badge-filing" style="background:#e8f0fe; color:#1a73e8; padding:3px 10px; border-radius:12px; font-size:11px; font-weight:600;"><i class="fa-solid fa-file-signature"></i> Initial Filing</span>';
        } else {
          badgeHtml = '<span class="history-badge-prev" style="background:#f1f5f9; color:#475569; padding:3px 10px; border-radius:12px; font-size:11px; font-weight:600;"><i class="fa-solid fa-circle-check"></i> Past Hearing</span>';
        }

        return `
          <tr>
            <td style="text-align: center; font-weight: 600; color: #64748b;">#${idx + 1}</td>
            <td style="white-space: nowrap; font-weight: 600;">${formatDateDMY(ev.date)}</td>
            <td style="font-weight: 600; color: #1e40af;">${escapeHtml(ev.process || '—')}</td>
            <td>${badgeHtml}</td>
            <td>${escapeHtml(ev.action || 'Court appearance & proceedings recorded.')}</td>
          </tr>
        `;
      }).join('');
    }
  }

  currentSelectedCase = caseObj;

  const editBtn = document.getElementById('detailEditBtn');
  if (editBtn) {
    editBtn.onclick = () => {
      showTab('update');
      const searchInput = document.getElementById('updateSearchInput');
      if (searchInput) {
        searchInput.value = caseObj.caseNo || caseObj.criminalCaseNumber || '';
      }
      loadCaseForUpdate(caseObj.caseNo || caseObj.criminalCaseNumber);
    };
  }

  const hearingBtn = document.getElementById('detailHearingBtn');
  if (hearingBtn) {
    hearingBtn.onclick = () => {
      showTab('hearing');
      const caseNoInput = document.getElementById('hearingCaseNo');
      if (caseNoInput) {
        caseNoInput.value = caseObj.caseNo || caseObj.criminalCaseNumber || '';
      }
    };
  }

  const transferBtn = document.getElementById('detailTransferBtn');
  if (transferBtn) {
    transferBtn.onclick = () => {
      openTransferForCase(caseObj.caseNo || caseObj.criminalCaseNumber || '');
    };
  }

  const whatsappBtn = document.getElementById('detailWhatsAppBtn');
  if (whatsappBtn) {
    whatsappBtn.onclick = () => {
      sendWhatsAppHearingNotice(caseObj);
    };
  }

  // Render Court Transfer History section in dossier
  renderCaseTransferHistory(caseNumber, caseObj);

  const historyBtn = document.getElementById('detailHistoryBtn');
  if (historyBtn) {
    historyBtn.onclick = () => {
      openCaseHistoryModal(caseObj);
    };
  }

  const printBtn = document.getElementById('detailPrintBtn');
  if (printBtn) {
    printBtn.onclick = () => {
      printCurrentCaseDossier(caseObj);
    };
  }

  const addTodoBtn = document.getElementById('searchAddTodoBtn');
  if (addTodoBtn) {
    addTodoBtn.style.display = 'inline-flex';
    addTodoBtn.onclick = () => {
      openTodoForCase(caseObj.caseNo || caseObj.criminalCaseNumber || '');
    };
  }
}

function openCaseHistoryModal(caseObj) {
  if (!caseObj) return;

  const modal = document.getElementById('caseHistoryModal');
  if (!modal) return;

  const caseNumber = caseObj.caseNo || caseObj.criminalCaseNumber || '—';
  const caseName = caseObj.caseName || (caseObj.plaintiff ? `${caseObj.plaintiff} vs ${caseObj.defendant}` : (caseObj.victimName ? `${caseObj.victimName} vs ${caseObj.accusedName}` : '—'));
  const caseType = (caseObj.caseType || 'civil').toUpperCase();
  const courtName = caseObj.courtName || caseObj.criminalCourtName || '—';
  const nextHearing = formatDateDMY(caseObj.nextHearing);
  const nextProcess = caseObj.hearingProcess || '—';

  const modalCaseNo = document.getElementById('modalCaseNo');
  const modalCaseTitle = document.getElementById('modalCaseTitle');
  const modalCourtName = document.getElementById('modalCourtName');
  const modalNextHearingBadge = document.getElementById('modalNextHearingBadge');
  const tbody = document.getElementById('caseHistoryTableBody');
  const emptyBox = document.getElementById('caseHistoryEmpty');

  if (modalCaseNo) modalCaseNo.textContent = caseNumber;
  if (modalCaseTitle) modalCaseTitle.textContent = caseName;
  if (modalCourtName) modalCourtName.textContent = courtName;
  if (modalNextHearingBadge) {
    modalNextHearingBadge.textContent = nextHearing !== '—' ? `${nextHearing} (${nextProcess})` : 'Not Scheduled';
    modalNextHearingBadge.className = `case-badge ${(caseObj.caseType || 'civil').toLowerCase()}`;
  }

  // Retrieve hearings for this case
  const history = getCaseHearingHistory(caseNumber);
  const currentNext = (caseObj.nextHearing && caseObj.nextHearing !== '—') ? caseObj.nextHearing : null;

  // Build unified hearing events list
  const events = [];

  // Add recorded hearings
  const currentNextISO = toISODate(currentNext);
  history.forEach(h => {
    const isNext = Boolean(currentNextISO && toISODate(h.hearing_date) === currentNextISO);
    events.push({
      date: h.hearing_date,
      process: h.process || '—',
      type: isNext ? 'next' : 'prev',
      action: h.action_taken || h.remarks || 'Court proceedings conducted.'
    });
  });

  // If case has next hearing not already present in events
  if (currentNext && !events.some(e => toISODate(e.date) === currentNextISO)) {
    events.push({
      date: currentNext,
      process: caseObj.hearingProcess || 'Scheduled Hearing',
      type: 'next',
      action: `Next hearing appearance at ${courtName}`
    });
  }

  // If case has previousHearing stored on case object not already present
  if (caseObj.previousHearing && caseObj.previousHearing !== '—' && !events.some(e => e.date === caseObj.previousHearing)) {
    events.push({
      date: caseObj.previousHearing,
      process: caseObj.previousProcess || 'Previous Stage',
      type: 'prev',
      action: `Previous proceedings recorded at ${courtName}`
    });
  }

  // Include filing date milestone if available
  const filingDate = caseObj.filingDate || caseObj.crimeFilingDate;
  if (filingDate && filingDate !== '—') {
    events.push({
      date: filingDate,
      process: 'Case Inception & Filing',
      type: 'filing',
      action: `Case instituted and registered at ${courtName}`
    });
  }

  // Sort events descending (newest first)
  events.sort((a, b) => {
    const da = new Date(a.date);
    const db = new Date(b.date);
    return db - da;
  });

  if (tbody) {
    if (events.length === 0) {
      tbody.innerHTML = '';
      if (emptyBox) emptyBox.classList.remove('hidden');
    } else {
      if (emptyBox) emptyBox.classList.add('hidden');
      tbody.innerHTML = events.map((ev, idx) => {
        let badgeHtml = '';
        if (ev.type === 'next') {
          badgeHtml = '<span class="history-badge-next">Upcoming Hearing</span>';
        } else if (ev.type === 'filing') {
          badgeHtml = '<span class="history-badge-filing">Initial Filing</span>';
        } else {
          badgeHtml = '<span class="history-badge-prev">Previous Hearing</span>';
        }

        return `
          <tr>
            <td><strong>${idx + 1}</strong></td>
            <td><strong>${formatDateDMY(ev.date)}</strong></td>
            <td><strong>${ev.process}</strong></td>
            <td>${badgeHtml}</td>
            <td>${ev.action}</td>
          </tr>
        `;
      }).join('');
    }
  }

  // Hook up update hearing button in modal
  const updateBtn = document.getElementById('modalUpdateHearingBtn');
  if (updateBtn) {
    updateBtn.onclick = () => {
      closeCaseHistoryModal();
      openUpdateHearingForCase(caseNumber);
    };
  }

  modal.classList.remove('hidden');
}

function closeCaseHistoryModal() {
  const modal = document.getElementById('caseHistoryModal');
  if (modal) modal.classList.add('hidden');
}

function openCaseHistoryModalByNo(caseNo) {
  if (!caseNo) return;
  const q = caseNo.trim().toLowerCase();
  const found = allCaseRecords.find(c => {
    const num1 = (c.caseNo || '').toLowerCase();
    const num2 = (c.criminalCaseNumber || '').toLowerCase();
    return num1 === q || num2 === q;
  });
  if (found) {
    openCaseHistoryModal(found);
  } else {
    alert(`Case "${caseNo}" details could not be found.`);
  }
}

if (typeof openCaseHistoryModal !== 'undefined') window.openCaseHistoryModal = openCaseHistoryModal;
if (typeof openCaseHistoryModalByNo !== 'undefined') window.openCaseHistoryModalByNo = openCaseHistoryModalByNo;
if (typeof closeCaseHistoryModal !== 'undefined') window.closeCaseHistoryModal = closeCaseHistoryModal;
if (typeof getCaseHearingHistory !== 'undefined') window.getCaseHearingHistory = getCaseHearingHistory;

function closeCaseDetailsFullModal() {
  document.getElementById('caseDetailsFullModal').classList.add('hidden');
}
if (typeof closeCaseDetailsFullModal !== 'undefined') window.closeCaseDetailsFullModal = closeCaseDetailsFullModal;

function openCaseDetailsFullModal(caseNo, idx) {
  let c = null;
  if (typeof idx === 'number' && caseCardsFilteredList && caseCardsFilteredList[idx]) {
    c = caseCardsFilteredList[idx];
  }
  if (!c && caseNo) {
    const q = String(caseNo).trim().toLowerCase();
    c = (allCaseRecords || []).find(record => {
      const num1 = (record.caseNo || '').toLowerCase();
      const num2 = (record.criminalCaseNumber || '').toLowerCase();
      return num1 === q || num2 === q || (record.id && String(record.id) === q);
    });
  }
  
  if (!c) {
    alert(`Case "${caseNo || idx}" details could not be found.`);
    return;
  }

  const { caseNumber, courtName, caseName, caseType, isDisposed, isUndated, appName, appRole, resName, resRole, statusColor, statusText, nextDateText, urgentBadgeHtml } = getCaseCardDisplayData(c);
  
  const clientName = (c.clientName || c.criminalClientName || c.client || '').trim() || '—';
  const clientPhone = (c.clientNumber || c.criminalClientNumber || '').trim();
  const remarksText = remarksToPlainText(c.remark || c.remarks);
  const disposalText = (c.disposalComment || c.disposal_comment || '').trim();

  // Modal Title and Subtitle
  const titleEl = document.getElementById('caseDetailsModalTitle');
  const subEl = document.getElementById('caseDetailsModalSubtitle');
  if (titleEl) titleEl.textContent = `${caseNumber} — ${caseName}`;
  if (subEl) subEl.textContent = `${courtName} • ${caseType.toUpperCase()} • ${statusText}`;

  // Schedule Badge
  let scheduleBadge = '';
  if (isDisposed) scheduleBadge = '<span style="background:#e2e8f0; color:#334155; padding: 4px 10px; border-radius: 9999px; font-size: 0.8rem; font-weight: 700;">✅ Disposed</span>';
  else if (isUndated) scheduleBadge = '<span style="background:#fef3c7; color:#92400e; padding: 4px 10px; border-radius: 9999px; font-size: 0.8rem; font-weight: 700;">❓ Undated</span>';
  else scheduleBadge = `<span style="background:#ccfbf1; color:#0f766e; padding: 4px 10px; border-radius: 9999px; font-size: 0.8rem; font-weight: 700;"><i class="fa-regular fa-calendar"></i> ${escapeHtml(nextDateText)}</span>`;

  // Get previous hearings history
  const hearingHistory = getCaseHearingHistory(caseNumber)
    .filter(h => h.hearing_date && h.hearing_date !== c.nextHearing);

  let hearingsHtml = '';
  if (hearingHistory.length > 0) {
    hearingsHtml = `
      <div style="margin-top: 16px;">
        <div style="font-size: 0.85rem; font-weight: 700; color: #475569; text-transform: uppercase; margin-bottom: 8px;"><i class="fa-solid fa-clock-rotate-left"></i> Previous Proceedings (${hearingHistory.length})</div>
        <div style="max-height: 180px; overflow-y: auto; border: 1px solid #e2e8f0; border-radius: 8px; background: #fff;">
          <table style="width: 100%; font-size: 0.85rem; border-collapse: collapse;">
            <thead>
              <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0; color: #64748b; text-align: left;">
                <th style="padding: 8px 12px;">Date</th>
                <th style="padding: 8px 12px;">Stage / Process</th>
                <th style="padding: 8px 12px;">Action / Notes</th>
              </tr>
            </thead>
            <tbody>
              ${hearingHistory.map(h => `
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 8px 12px; font-weight: 600; color: #0f766e; white-space: nowrap;">${escapeHtml(formatDateDMY(h.hearing_date))}</td>
                  <td style="padding: 8px 12px; color: #334155;">${escapeHtml(h.process || '—')}</td>
                  <td style="padding: 8px 12px; color: #64748b;">${escapeHtml(h.action_taken || '—')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Extra details for Criminal or Revenue
  let extraMatterHtml = '';
  if (c.policeStation || c.crimeNumber || c.crimeSection) {
    extraMatterHtml = `
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; margin-top: 12px; font-size: 0.85rem;">
        <div style="font-weight: 700; color: #475569; margin-bottom: 6px;"><i class="fa-solid fa-shield-halved"></i> Police & Crime Details</div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 8px;">
          <div><span style="color:#64748b;">Police Station:</span> <strong>${escapeHtml(c.policeStation || '—')}</strong></div>
          <div><span style="color:#64748b;">Crime / FIR No:</span> <strong>${escapeHtml(c.crimeNumber || '—')}</strong></div>
          <div><span style="color:#64748b;">Sections:</span> <strong>${escapeHtml(c.crimeSection || '—')}</strong></div>
        </div>
      </div>
    `;
  } else if (c.village || c.khataNo || c.gataNo) {
    extraMatterHtml = `
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; margin-top: 12px; font-size: 0.85rem;">
        <div style="font-weight: 700; color: #475569; margin-bottom: 6px;"><i class="fa-solid fa-mountain-sun"></i> Land & Revenue Details</div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 8px;">
          <div><span style="color:#64748b;">Village / Mauza:</span> <strong>${escapeHtml(c.village || '—')}</strong></div>
          <div><span style="color:#64748b;">Khata No:</span> <strong>${escapeHtml(c.khataNo || '—')}</strong></div>
          <div><span style="color:#64748b;">Gata No:</span> <strong>${escapeHtml(c.gataNo || '—')}</strong></div>
        </div>
      </div>
    `;
  }

  const html = `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      
      <!-- Top Overview Box -->
      <div style="background: white; border-radius: 12px; border: 1px solid #e2e8f0; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px; margin-bottom: 12px;">
          <div>
            <span style="background: #0369a1; color: white; padding: 3px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: 700; letter-spacing: 0.03em;">${escapeHtml(caseNumber)}</span>
            <span style="background: #f1f5f9; color: #475569; padding: 3px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: 600; text-transform: uppercase; margin-left: 6px;">${escapeHtml(caseType)}</span>
          </div>
          <div style="display: flex; gap: 8px; align-items: center;">
            ${scheduleBadge}
            ${urgentBadgeHtml || ''}
          </div>
        </div>

        <div style="font-size: 1.2rem; font-weight: 800; color: #1e293b; margin-bottom: 16px; line-height: 1.4;">${escapeHtml(caseName)}</div>

        <!-- Grid of Court & Dates -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 12px; background: #f8fafc; padding: 14px; border-radius: 8px; border: 1px solid #f1f5f9;">
          <div>
            <div style="font-size: 0.75rem; color: #64748b; font-weight: 700; text-transform: uppercase;">Court / Forum</div>
            <div style="font-weight: 600; color: #1e293b; font-size: 0.9rem; margin-top: 2px;">${escapeHtml(courtName)}</div>
          </div>
          <div>
            <div style="font-size: 0.75rem; color: #64748b; font-weight: 700; text-transform: uppercase;">Next Hearing Date</div>
            <div style="font-weight: 700; color: #0f766e; font-size: 0.9rem; margin-top: 2px;">${escapeHtml(nextDateText)}</div>
          </div>
          <div>
            <div style="font-size: 0.75rem; color: #64748b; font-weight: 700; text-transform: uppercase;">Next Stage / Process</div>
            <div style="font-weight: 600; color: #334155; font-size: 0.9rem; margin-top: 2px;">${escapeHtml(c.hearingProcess || '—')}</div>
          </div>
          <div>
            <div style="font-size: 0.75rem; color: #64748b; font-weight: 700; text-transform: uppercase;">Filing Date</div>
            <div style="font-weight: 500; color: #334155; font-size: 0.9rem; margin-top: 2px;">${escapeHtml(c.filingDate || c.crimeFilingDate ? formatDateDMY(c.filingDate || c.crimeFilingDate) : '—')}</div>
          </div>
        </div>
      </div>

      <!-- Parties Involved Card -->
      <div style="background: white; border-radius: 12px; border: 1px solid #e2e8f0; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
        <div style="font-size: 0.85rem; font-weight: 700; color: #475569; text-transform: uppercase; margin-bottom: 12px;"><i class="fa-solid fa-users"></i> Parties in Matter</div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px;">
          <!-- First Party -->
          <div style="background: #f0f9ff; border: 1px solid #e0f2fe; padding: 14px; border-radius: 8px;">
            <div style="font-size: 0.75rem; color: #0369a1; font-weight: 700; text-transform: uppercase;">${escapeHtml(appRole)}</div>
            <div style="font-weight: 700; color: #0c4a6e; font-size: 1rem; margin-top: 4px; display: flex; align-items: center; gap: 8px;">
              <span style="width: 28px; height: 28px; border-radius: 50%; background: #0284c7; color: white; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700;">${getCasePartyInitials(appName)}</span>
              <span>${escapeHtml(appName)}</span>
            </div>
          </div>

          <!-- Second Party -->
          <div style="background: #fff7ed; border: 1px solid #ffedd5; padding: 14px; border-radius: 8px;">
            <div style="font-size: 0.75rem; color: #c2410c; font-weight: 700; text-transform: uppercase;">${escapeHtml(resRole)}</div>
            <div style="font-weight: 700; color: #7c2d12; font-size: 1rem; margin-top: 4px; display: flex; align-items: center; gap: 8px;">
              <span style="width: 28px; height: 28px; border-radius: 50%; background: #ea580c; color: white; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700;">${getCasePartyInitials(resName)}</span>
              <span>${escapeHtml(resName)}</span>
            </div>
          </div>
        </div>

        ${extraMatterHtml}
      </div>

      <!-- Client & Remarks Card -->
      <div style="background: white; border-radius: 12px; border: 1px solid #e2e8f0; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
        <div style="font-size: 0.85rem; font-weight: 700; color: #475569; text-transform: uppercase; margin-bottom: 12px;"><i class="fa-solid fa-address-book"></i> Client & Remarks</div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-bottom: 12px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 36px; height: 36px; border-radius: 8px; background: #e0e7ff; color: #4338ca; display: flex; align-items: center; justify-content: center; font-size: 16px;"><i class="fa-solid fa-user-tie"></i></div>
            <div>
              <div style="font-size: 0.75rem; color: #64748b; font-weight: 600;">Client Name</div>
              <div style="font-weight: 600; color: #1e293b;">${escapeHtml(clientName)}</div>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 36px; height: 36px; border-radius: 8px; background: #dcfce7; color: #15803d; display: flex; align-items: center; justify-content: center; font-size: 16px;"><i class="fa-solid fa-phone"></i></div>
            <div>
              <div style="font-size: 0.75rem; color: #64748b; font-weight: 600;">Phone Number</div>
              <div>
                ${clientPhone ? `<a href="tel:${escapeHtml(clientPhone)}" style="font-weight: 600; color: #0284c7; text-decoration: none;">${escapeHtml(clientPhone)}</a>` : '<span style="color:#94a3b8;">Not provided</span>'}
              </div>
            </div>
          </div>
        </div>

        ${remarksText ? `
          <div style="background: #f8fafc; border-left: 3px solid #6366f1; padding: 10px 14px; border-radius: 4px; margin-top: 10px;">
            <div style="font-size: 0.75rem; color: #64748b; font-weight: 700; text-transform: uppercase;">Remarks / Case Notes</div>
            <div style="color: #334155; font-size: 0.9rem; margin-top: 2px; white-space: pre-wrap;">${escapeHtml(remarksText)}</div>
          </div>
        ` : ''}

        ${disposalText ? `
          <div style="background: #f0fdf4; border-left: 3px solid #16a34a; padding: 10px 14px; border-radius: 4px; margin-top: 10px;">
            <div style="font-size: 0.75rem; color: #15803d; font-weight: 700; text-transform: uppercase;">Disposal Order / Comments</div>
            <div style="color: #14532d; font-size: 0.9rem; margin-top: 2px; white-space: pre-wrap;">${escapeHtml(disposalText)}</div>
          </div>
        ` : ''}

        ${hearingsHtml}
      </div>

    </div>
  `;

  const contentEl = document.getElementById('caseDetailsModalContent');
  if (contentEl) contentEl.innerHTML = html;
  
  const historyBtn = document.getElementById('cdmHistoryBtn');
  if (historyBtn) {
    historyBtn.onclick = () => {
      closeCaseDetailsFullModal();
      openCaseHistoryModalByNo(caseNumber);
    };
  }
  
  const editBtn = document.getElementById('cdmEditBtn');
  if (editBtn) {
    editBtn.onclick = () => {
      closeCaseDetailsFullModal();
      editCaseFromTable(caseNumber);
    };
  }

  const dossierBtn = document.getElementById('cdmDossierBtn');
  if (dossierBtn) {
    dossierBtn.onclick = () => {
      if (typeof printCurrentCaseDossier === 'function') {
        printCurrentCaseDossier(c);
      }
    };
  }

  const modalEl = document.getElementById('caseDetailsFullModal');
  if (modalEl) modalEl.classList.remove('hidden');
}
if (typeof openCaseDetailsFullModal !== 'undefined') window.openCaseDetailsFullModal = openCaseDetailsFullModal;

