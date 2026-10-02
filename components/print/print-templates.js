/**
 * CaseBook Print Templates - Companion Script Loader
 * Fallback for file:// or environments where fetch is blocked
 */
window.__casebook_templates = window.__casebook_templates || {};
window.__casebook_templates['print-templates'] = "    <div id=\"printableCauseList\" class=\"printable-cause-list\">\n      <div class=\"cause-list-header\">\n        <div class=\"cause-crest\">\u00e2\u0161\u2013\u00ef\u00b8\u008f</div>\n        <div class=\"cause-header-text\">\n          <h2>CHAMBERS OF ATUL KUMAR MISHRA</h2>\n          <div class=\"cause-advocate-title\">Advocate & Legal Consultant</div>\n          <div class=\"cause-main-title\">\n            DAILY CAUSE LIST / COURT APPEARANCE BOARD\n          </div>\n        </div>\n      </div>\n\n      <div class=\"cause-meta-box\">\n        <div class=\"cause-meta-item\">\n          <span class=\"cause-meta-label\">DATE OF PROCEEDING:</span>\n          <span class=\"cause-meta-val\" id=\"causeListPrintDate\"></span>\n        </div>\n        <div class=\"cause-meta-item\">\n          <span class=\"cause-meta-label\">DAY:</span>\n          <span class=\"cause-meta-val\" id=\"causeListPrintDay\"></span>\n        </div>\n        <div class=\"cause-meta-item\">\n          <span class=\"cause-meta-label\">TOTAL MATTERS:</span>\n          <span class=\"cause-meta-val\" id=\"causeListPrintTotal\"\n            >0 Cases Listed</span\n          >\n        </div>\n        <div class=\"cause-meta-item\">\n          <span class=\"cause-meta-label\">PRINTED ON:</span>\n          <span class=\"cause-meta-val\" id=\"causeListPrintTimestamp\">\u00e2\u20ac\u201d</span>\n        </div>\n      </div>\n\n      <table class=\"cause-print-table\">\n        <thead>\n          <tr>\n            <th style=\"width: 45px; text-align: center\">Item</th>\n            <th style=\"width: 140px\">Case Number & Type</th>\n            <th>Case Title / Parties</th>\n            <th style=\"width: 130px\">Court / Forum</th>\n            <th style=\"width: 150px\">Stage / Purpose</th>\n            <th style=\"width: 140px\">Client & Contact</th>\n            <th style=\"width: 90px; text-align: center\">Notes</th>\n          </tr>\n        </thead>\n        <tbody id=\"causePrintTableBody\">\n          <!-- Rows injected dynamically -->\n        </tbody>\n      </table>\n\n      <div class=\"cause-list-footer\">\n        <div class=\"cause-footer-note\">\n          Generated via Case Management System \u00e2\u20ac\u00a2 Atul Kumar Mishra, Advocate &\n          Developer\n        </div>\n        <div class=\"cause-signature-line\">\n          <span>Advocate Signature: _______________________</span>\n        </div>\n      </div>\n    </div>\n\n    <!-- Printable Full Case Dossier Document (Simple Infographic A4 Print/PDF) -->\n    <div\n      id=\"printableCaseDossier\"\n      class=\"printable-case-dossier infographic-dossier\"\n    >\n      <!-- Infographic Header -->\n      <div class=\"dossier-info-header\">\n        <div class=\"dossier-info-crest\">\u00e2\u0161\u2013\u00ef\u00b8\u008f</div>\n        <div class=\"dossier-info-brand\">\n          <h2>CHAMBERS OF ATUL KUMAR MISHRA</h2>\n          <div class=\"dossier-info-sub\">\n            Advocate & Legal Consultant \u00e2\u20ac\u00a2 High Court & District Courts\n          </div>\n        </div>\n        <div class=\"dossier-info-badge\" id=\"casePrintTypeBadge\">CIVIL CASE</div>\n      </div>\n\n      <!-- Case Title & Identification Banner -->\n      <div class=\"dossier-info-title-strip\">\n        <div class=\"dossier-info-case-title\" id=\"casePrintTitle\">\n          Case Title\n        </div>\n        <div class=\"dossier-info-case-num-wrap\">\n          <span class=\"dossier-info-label\">CASE NO:</span>\n          <span class=\"dossier-info-num\" id=\"casePrintNo\">\u00e2\u20ac\u201d</span>\n        </div>\n      </div>\n\n      <!-- Infographic 4-Metric Strip -->\n      <div class=\"dossier-info-metrics-grid\">\n        <div class=\"dossier-info-metric-card next-hearing-card\">\n          <div class=\"metric-icon\">\u00f0\u0178\u201c\u2026</div>\n          <div class=\"metric-body\">\n            <span class=\"metric-lbl\">Next Hearing</span>\n            <span class=\"metric-val\" id=\"casePrintNextHearing\">\u00e2\u20ac\u201d</span>\n            <span class=\"metric-sub\" id=\"casePrintNextProcess\">\u00e2\u20ac\u201d</span>\n          </div>\n        </div>\n\n        <div class=\"dossier-info-metric-card court-card\">\n          <div class=\"metric-icon\">\u00f0\u0178\u008f\u203a\u00ef\u00b8\u008f</div>\n          <div class=\"metric-body\">\n            <span class=\"metric-lbl\">Court / Forum</span>\n            <span class=\"metric-val\" id=\"casePrintCourt\">\u00e2\u20ac\u201d</span>\n            <span class=\"metric-sub\" id=\"casePrintCourtFull\">\u00e2\u20ac\u201d</span>\n          </div>\n        </div>\n\n        <div class=\"dossier-info-metric-card status-card\">\n          <div class=\"metric-icon\">\u00f0\u0178\u0161\u00a6</div>\n          <div class=\"metric-body\">\n            <span class=\"metric-lbl\">Case Status</span>\n            <span class=\"metric-val\" id=\"casePrintStatus\">\u00e2\u20ac\u201d</span>\n            <span class=\"metric-sub\" id=\"casePrintCaseType\">Civil</span>\n          </div>\n        </div>\n\n        <div class=\"dossier-info-metric-card filing-card\">\n          <div class=\"metric-icon\">\u00f0\u0178\u201c\u0153</div>\n          <div class=\"metric-body\">\n            <span class=\"metric-lbl\">Filing & Year</span>\n            <span class=\"metric-val\" id=\"casePrintFilingDate\">\u00e2\u20ac\u201d</span>\n            <span class=\"metric-sub\"\n              >Year: <span id=\"casePrintYear\">\u00e2\u20ac\u201d</span></span\n            >\n          </div>\n        </div>\n      </div>\n\n      <!-- Two-Column Particulars & Representation Infographic Cards -->\n      <div class=\"dossier-info-two-col\">\n        <!-- Left: Parties & Particulars -->\n        <div class=\"dossier-info-panel\">\n          <div class=\"dossier-panel-header\">\n            <span class=\"panel-icon\">\u00f0\u0178\u2018\u00a5</span>\n            <span>Parties & Case Particulars</span>\n          </div>\n          <div\n            id=\"casePrintPartiesContent\"\n            class=\"dossier-info-particulars-list\"\n          >\n            <!-- Populated dynamically -->\n          </div>\n        </div>\n\n        <!-- Right: Client, Representation & Notes -->\n        <div class=\"dossier-info-panel\">\n          <div class=\"dossier-panel-header\">\n            <span class=\"panel-icon\">\u00f0\u0178\u2019\u00bc</span>\n            <span>Client Representation & Matter Notes</span>\n          </div>\n          <div class=\"dossier-info-client-body\">\n            <div class=\"info-row\">\n              <span class=\"info-row-lbl\">Client Name:</span>\n              <span class=\"info-row-val font-bold\" id=\"casePrintClientName\"\n                >\u00e2\u20ac\u201d</span\n              >\n            </div>\n            <div class=\"info-row\">\n              <span class=\"info-row-lbl\">Client Contact:</span>\n              <span class=\"info-row-val\" id=\"casePrintClientPhone\">\u00e2\u20ac\u201d</span>\n            </div>\n            <div class=\"info-row\">\n              <span class=\"info-row-lbl\">Previous Stage:</span>\n              <span class=\"info-row-val\"\n                ><span id=\"casePrintPrevHearing\">\u00e2\u20ac\u201d</span> (<span\n                  id=\"casePrintPrevProcess\"\n                  >\u00e2\u20ac\u201d</span\n                >)</span\n              >\n            </div>\n            <div class=\"info-row\" style=\"border-bottom: none\">\n              <span class=\"info-row-lbl\">Remarks / Notes:</span>\n              <span class=\"info-row-val\" id=\"casePrintRemarks\">\u00e2\u20ac\u201d</span>\n            </div>\n            <div\n              class=\"info-row disposal-info-row\"\n              id=\"casePrintDisposalRow\"\n              style=\"display: none\"\n            >\n              <span class=\"info-row-lbl\" style=\"color: #991b1b\"\n                >Disposal Details:</span\n              >\n              <span\n                class=\"info-row-val\"\n                id=\"casePrintDisposalComment\"\n                style=\"color: #991b1b; font-weight: 600\"\n                >\u00e2\u20ac\u201d</span\n              >\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <!-- Proceedings Timeline Infographic -->\n      <div class=\"dossier-info-panel proceedings-panel\">\n        <div class=\"dossier-panel-header\">\n          <span class=\"panel-icon\">\u00f0\u0178\u201c\u0153</span>\n          <span>Proceedings & Appearance Timeline</span>\n        </div>\n        <table class=\"dossier-info-timeline-table\">\n          <thead>\n            <tr>\n              <th style=\"width: 30px; text-align: center\">#</th>\n              <th style=\"width: 85px\">Date</th>\n              <th style=\"width: 130px\">Stage / Purpose</th>\n              <th style=\"width: 90px\">Milestone</th>\n              <th>Action Conducted / Court Orders</th>\n            </tr>\n          </thead>\n          <tbody id=\"casePrintHistoryBody\">\n            <!-- Populated dynamically -->\n          </tbody>\n        </table>\n      </div>\n\n      <!-- Footer -->\n      <div class=\"dossier-info-footer\">\n        <div class=\"info-footer-meta\">\n          <span\n            >\u00e2\u0161\u2013\u00ef\u00b8\u008f Confidential Case Dossier \u00e2\u20ac\u00a2 Printed:\n            <strong id=\"casePrintTimestamp\">\u00e2\u20ac\u201d</strong></span\n          >\n        </div>\n        <div class=\"info-footer-sig\">\n          <span>Advocate Signature: _______________________</span>\n        </div>\n      </div>\n    </div>\n";

(function() {
  const c = document.getElementById('printTemplatesContainer');
  if (c && !c.dataset.loaded) {
    c.innerHTML = window.__casebook_templates['print-templates'];
    c.dataset.loaded = 'true';
  }
})();

// ==============================================================================
// Full Case Dossier Printable Engine
// ==============================================================================
function populatePrintableCaseDossier(caseObj) {
  if (!caseObj) return;
  if (!document.getElementById('printableCaseDossier') && typeof loadPrintTemplates === 'function') {
    loadPrintTemplates();
  }

  const caseType = (caseObj.caseType || 'civil').toLowerCase();
  const isCriminal = caseType === 'criminal';
  const isFamily = caseType === 'family';
  const isRevenue = caseType === 'revenue';

  const caseNumber = caseObj.caseNo || caseObj.criminalCaseNumber || '—';
  const caseYear = caseObj.caseYear || caseObj.crimeYear || '—';
  const courtName = caseObj.courtName || caseObj.criminalCourtName || '—';
  const filingDateVal = caseObj.filingDate || caseObj.crimeFilingDate;
  const filingDate = formatDateDMY(filingDateVal);
  const nextHearing = formatDateDMY(caseObj.nextHearing);
  const nextProcess = caseObj.hearingProcess || '—';
  const prevHearing = formatDateDMY(caseObj.previousHearing);
  const prevProcess = caseObj.previousProcess || '—';
  const clientName = caseObj.clientName || caseObj.criminalClientName || caseObj.client || '—';
  const clientPhone = caseObj.clientNumber || caseObj.criminalClientNumber || '';

  // Status calculation
  const isDisposed = caseObj.status === 'disposed' || Boolean(caseObj.disposalComment || caseObj.disposal_comment);
  const isUndated = !caseObj.nextHearing || caseObj.nextHearing === '—' || String(caseObj.nextHearing).trim() === '';
  let statusText = 'Pending';
  if (isDisposed) statusText = 'Disposed Off';
  else if (isUndated) statusText = 'Undated / Unscheduled';

  // Case Title
  let caseTitle = caseObj.caseName || '';
  if (!caseTitle) {
    if (isCriminal) {
      const v = caseObj.victimName || caseObj.firstParty;
      const a = caseObj.accusedName || caseObj.oppositeParty;
      caseTitle = v && a ? `${v} vs ${a}` : (v || a || 'Criminal Matter');
    } else if (isFamily) {
      const p = caseObj.petitioner || caseObj.plaintiff;
      const r = caseObj.respondent || caseObj.defendant;
      caseTitle = p && r ? `${p} vs ${r}` : (p || r || 'Family Dispute');
    } else if (isRevenue) {
      const app = caseObj.applicant || caseObj.plaintiff;
      const opp = caseObj.respondent || caseObj.defendant;
      caseTitle = app && opp ? `${app} vs ${opp}` : (app || opp || 'Revenue Matter');
    } else {
      const p = caseObj.plaintiff || caseObj.firstParty;
      const d = caseObj.defendant || caseObj.oppositeParty;
      caseTitle = p && d ? `${p} vs ${d}` : (p || d || 'Civil Suit');
    }
  }

  // Header & Title
  const badgeEl = document.getElementById('casePrintTypeBadge');
  if (badgeEl) badgeEl.textContent = `${caseType.toUpperCase()} CASE`;

  const titleEl = document.getElementById('casePrintTitle');
  if (titleEl) titleEl.textContent = caseTitle;

  const noEl = document.getElementById('casePrintNo');
  if (noEl) noEl.textContent = caseNumber;

  const courtEl = document.getElementById('casePrintCourt');
  if (courtEl) courtEl.textContent = courtName;

  const statusEl = document.getElementById('casePrintStatus');
  if (statusEl) statusEl.textContent = statusText;

  // Grid details
  const ctEl = document.getElementById('casePrintCaseType');
  if (ctEl) ctEl.textContent = caseType.toUpperCase();

  const yrEl = document.getElementById('casePrintYear');
  if (yrEl) yrEl.textContent = caseYear;

  const fdEl = document.getElementById('casePrintFilingDate');
  if (fdEl) fdEl.textContent = filingDate;

  const cfEl = document.getElementById('casePrintCourtFull');
  if (cfEl) cfEl.textContent = courtName;

  const nhEl = document.getElementById('casePrintNextHearing');
  if (nhEl) nhEl.textContent = nextHearing;

  const npEl = document.getElementById('casePrintNextProcess');
  if (npEl) npEl.textContent = nextProcess;

  const phEl = document.getElementById('casePrintPrevHearing');
  if (phEl) phEl.textContent = prevHearing;

  const ppEl = document.getElementById('casePrintPrevProcess');
  if (ppEl) ppEl.textContent = prevProcess;

  // Parties & Matter Particulars
  const partiesContainer = document.getElementById('casePrintPartiesContent');
  if (partiesContainer) {
    const items = [];
    if (isCriminal || caseType === 'state' || caseType === 'complaint' || caseType === 'misc_criminal') {
      if (caseObj.victimName || caseObj.firstParty) items.push(['Complainant / Victim', caseObj.victimName || caseObj.firstParty]);
      if (caseObj.accusedName || caseObj.oppositeParty) items.push(['Accused / Opposite', caseObj.accusedName || caseObj.oppositeParty]);
      if (caseObj.policeStation) items.push(['Police Station', caseObj.policeStation]);
      if (caseObj.crimeNumber) items.push(['FIR / Crime No.', `${caseObj.crimeNumber}${caseObj.crimeYear ? ` / ${caseObj.crimeYear}` : ''}`]);
      if (caseObj.crimeSection) items.push(['Sections (IPC/BNS)', caseObj.crimeSection]);
      if (caseObj.custodyStatus) items.push(['Custody / Bail Status', caseObj.custodyStatus]);
    } else if (isFamily) {
      if (caseObj.petitioner || caseObj.plaintiff) items.push(['Petitioner / Applicant', caseObj.petitioner || caseObj.plaintiff]);
      if (caseObj.respondent || caseObj.defendant) items.push(['Respondent / Opposite', caseObj.respondent || caseObj.defendant]);
      if (caseObj.familyMatterType || caseObj.matterType) items.push(['Dispute Nature', caseObj.familyMatterType || caseObj.matterType]);
      if (caseObj.marriageDate) items.push(['Marriage Date', formatDateDMY(caseObj.marriageDate)]);
      if (caseObj.maintenance) items.push(['Maintenance Details', caseObj.maintenance]);
    } else if (isRevenue) {
      if (caseObj.applicant || caseObj.plaintiff) items.push(['Applicant / Petitioner', caseObj.applicant || caseObj.plaintiff]);
      if (caseObj.respondent || caseObj.defendant) items.push(['Opposite Party', caseObj.respondent || caseObj.defendant]);
      if (caseObj.revenueMatterType) items.push(['Revenue Matter Nature', caseObj.revenueMatterType]);
      if (caseObj.village) items.push(['Village / Mauza', caseObj.village]);
      if (caseObj.khataNo || caseObj.gataNo) items.push(['Khata / Gata No.', [caseObj.khataNo ? `Khata: ${caseObj.khataNo}` : '', caseObj.gataNo ? `Gata: ${caseObj.gataNo}` : ''].filter(Boolean).join(' | ')]);
    } else {
      if (caseObj.plaintiff || caseObj.firstParty) items.push(['Plaintiff / Petitioner', caseObj.plaintiff || caseObj.firstParty]);
      if (caseObj.defendant || caseObj.oppositeParty) items.push(['Defendant / Respondent', caseObj.defendant || caseObj.oppositeParty]);
      if (caseObj.matterType) items.push(['Matter / Suit Nature', caseObj.matterType]);
    }

    if (items.length === 0) {
      items.push(['Parties', caseTitle]);
    }

    partiesContainer.innerHTML = items.map(([k, v]) => `
      <div class="dossier-print-prop-cell">
        <span class="dossier-print-prop-lbl">${escapeHtml(k)}:</span>
        <span class="dossier-print-prop-val">${escapeHtml(v)}</span>
      </div>
    `).join('');
  }

  // Client & Remarks
  const cNameEl = document.getElementById('casePrintClientName');
  if (cNameEl) cNameEl.textContent = clientName;

  const cPhoneEl = document.getElementById('casePrintClientPhone');
  if (cPhoneEl) cPhoneEl.textContent = clientPhone ? clientPhone : '—';

  const remEl = document.getElementById('casePrintRemarks');
  const remarkVal = remarksToPlainText(caseObj.remark || caseObj.remarks);
  if (remEl) remEl.textContent = remarkVal ? remarkVal : 'None recorded.';

  const dispRow = document.getElementById('casePrintDisposalRow');
  const dispEl = document.getElementById('casePrintDisposalComment');
  const disposalVal = caseObj.disposalComment || caseObj.disposal_comment || '';
  if (dispRow && dispEl) {
    if (disposalVal.trim()) {
      dispRow.style.display = '';
      dispEl.textContent = disposalVal.trim();
    } else if (isDisposed) {
      dispRow.style.display = '';
      dispEl.textContent = 'Matter disposed of.';
    } else {
      dispRow.style.display = 'none';
    }
  }

  // Proceedings History
  const historyBody = document.getElementById('casePrintHistoryBody');
  if (historyBody) {
    const history = typeof getCaseHearingHistory === 'function' ? getCaseHearingHistory(caseNumber) : [];
    const events = [];

    history.forEach(h => {
      const isNext = Boolean(caseObj.nextHearing && (h.hearing_date === caseObj.nextHearing));
      events.push({
        date: h.hearing_date,
        process: h.process || 'Court Hearing',
        type: isNext ? 'Upcoming Hearing' : 'Past Hearing',
        action: h.action_taken || h.remarks || 'Court proceedings conducted.'
      });
    });

    if (caseObj.nextHearing && caseObj.nextHearing !== '—' && !events.some(e => e.date === caseObj.nextHearing)) {
      events.push({
        date: caseObj.nextHearing,
        process: caseObj.hearingProcess || 'Scheduled Hearing',
        type: 'Upcoming Hearing',
        action: `Next appearance scheduled at ${courtName}`
      });
    }

    if (caseObj.previousHearing && caseObj.previousHearing !== '—' && !events.some(e => e.date === caseObj.previousHearing)) {
      events.push({
        date: caseObj.previousHearing,
        process: caseObj.previousProcess || 'Previous Stage',
        type: 'Past Hearing',
        action: `Previous proceedings recorded at ${courtName}`
      });
    }

    if (filingDateVal && filingDateVal !== '—' && !events.some(e => e.date === filingDateVal)) {
      events.push({
        date: filingDateVal,
        process: 'Case Inception & Filing',
        type: 'Initial Filing',
        action: `Case instituted and registered at ${courtName}`
      });
    }

    // Sort newest first
    events.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (events.length === 0) {
      historyBody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:8px; color:#64748b; font-style:italic;">No recorded proceedings logged yet.</td></tr>';
    } else {
      // Limit to latest 8 hearings to guarantee a clean, single A4 page fit
      const displayEvents = events.slice(0, 8);
      let rowsHtml = displayEvents.map((ev, idx) => {
        const typeClass = String(ev.type || '').toLowerCase().replace(/\s+/g, '-');
        return `
          <tr>
            <td style="text-align: center; font-weight: bold; color: #64748b;">${idx + 1}</td>
            <td style="white-space: nowrap; font-weight: 700; color: #0f172a;">${formatDateDMY(ev.date)}</td>
            <td style="font-weight: 700; color: #1e40af;">${escapeHtml(ev.process || '—')}</td>
            <td><span class="dossier-timeline-tag ${typeClass}">${escapeHtml(ev.type)}</span></td>
            <td>${escapeHtml(ev.action || '—')}</td>
          </tr>
        `;
      }).join('');

      if (events.length > 8) {
        rowsHtml += `
          <tr>
            <td colspan="5" style="text-align: center; padding: 3px; font-size: 8.5px; color: #64748b; background: #f8fafc; font-style: italic;">
              + ${events.length - 8} earlier proceedings on record in CaseBook database
            </td>
          </tr>
        `;
      }

      historyBody.innerHTML = rowsHtml;
    }
  }

  // Timestamp
  const tsEl = document.getElementById('casePrintTimestamp');
  if (tsEl) {
    const now = new Date();
    tsEl.textContent = now.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }
}

function printCurrentCaseDossier(customCaseObj = null) {
  const caseObj = customCaseObj || currentSelectedCase;
  if (!caseObj) {
    if (typeof showToast === 'function') {
      showToast('Please select a case to print.', 'warning');
    } else {
      alert('Please select a case to print.');
    }
    return;
  }

  populatePrintableCaseDossier(caseObj);
  document.body.classList.add('printing-case-dossier');

  const cleanup = () => {
    document.body.classList.remove('printing-case-dossier');
    window.removeEventListener('afterprint', cleanup);
  };

  window.addEventListener('afterprint', cleanup);
  setTimeout(cleanup, 4000);

  window.print();
}

function printCurrentGuestCaseDossier() {
  if (!currentGuestSelectedCase) {
    if (typeof showToast === 'function') {
      showToast('Please select a case to print.', 'warning');
    } else {
      alert('Please select a case to print.');
    }
    return;
  }
  printCurrentCaseDossier(currentGuestSelectedCase);
}

if (typeof populatePrintableCaseDossier !== 'undefined') window.populatePrintableCaseDossier = populatePrintableCaseDossier;
if (typeof printCurrentCaseDossier !== 'undefined') window.printCurrentCaseDossier = printCurrentCaseDossier;
if (typeof printCurrentGuestCaseDossier !== 'undefined') window.printCurrentGuestCaseDossier = printCurrentGuestCaseDossier;

