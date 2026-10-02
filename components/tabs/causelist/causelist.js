window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs["causelist"] = `

    <div class="section-header-row">
        <div class="section-title-box">
            <div class="section-icon-badge"><i class="fa-solid fa-scroll"></i></div>
        <div>
        <h3>Daily Cause List & Appearance Board</h3>
        <div class="header-chips-row">
            <button type="button" class="header-chip-btn" onclick="setCauseListDateOffset(0)">
                <i class="fa-solid fa-thumbtack"></i> Today
            </button>
            <button type="button" class="header-chip-btn" onclick="setCauseListDateOffset(1)">
                <i class="fa-solid fa-bolt"></i> Tomorrow
            </button>
            <button type="button" class="header-chip-btn" onclick="printDailyCauseList()">
                <i class="fa-solid fa-print"></i> Print Cause List (A4)
            </button>
            <button type="button" id="causeListWhatsAppActionBtn" class="header-chip-btn" onclick="sendDailyCauseListWhatsApp()" title="Share today's cause list summary on WhatsApp">
                💬 WhatsApp Daily Schedule
            </button>
            </div>
        </div>
    </div>

        
    </div>

    <!-- Cause List Controls Toolbar -->
    <div class="causelist-toolbar-card">
        <div class="causelist-toolbar-row">
            <div class="causelist-date-selector">
                <label for="causeListDateInput" class="causelist-toolbar-label">Select Appearance Date:</label>
                <div class="causelist-date-input-wrap">
                    <input type="date" id="causeListDateInput" class="causelist-date-input">
                </div>
            </div>
            <div class="causelist-court-filter-wrap">
                <label for="causeListCourtFilterSelect" class="causelist-toolbar-label">Filter by Court:</label>
                <select id="causeListCourtFilterSelect" class="form-select causelist-select">
                    <option value="">🏛️ All Courts</option>
                </select>
            </div>
            <div class="causelist-presets-wrap">
                <label class="causelist-toolbar-label">Quick Date:</label>
                <div class="causelist-preset-buttons">
                    <button type="button" class="preset-pill" onclick="setCauseListDateOffset(0)">📌 Today</button>
                    <button type="button" class="preset-pill" onclick="setCauseListDateOffset(1)">⚡ Tomorrow</button>
                    <button type="button" class="preset-pill" onclick="setCauseListDateOffset(2)">🗓️ In 2 Days</button>
                    <button type="button" class="preset-pill" onclick="setCauseListDateOffset(7)">📅 Next Week</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Cause List Summary Badges & Stats Bar -->
    <div class="causelist-stats-bar">
        <div class="causelist-date-banner">
            <span class="banner-icon"><i class="fa-solid fa-scale-balanced"></i>️</span>
            <div>
                <h4 id="causeListBannerDateText">Listed Matters for Today</h4>
                <span id="causeListBannerDayName" class="banner-subtext">Loading day...</span>
            </div>
        </div>
        <div class="causelist-counters-group">
            <span id="causeListTotalBadge" class="causelist-stat-pill total">0 Total Matters</span>
            <span id="causeListCivilBadge" class="causelist-stat-pill civil">0 Civil</span>
            <span id="causeListCriminalBadge" class="causelist-stat-pill criminal">0 Criminal</span>
            <span id="causeListRevenueBadge" class="causelist-stat-pill revenue">0 Revenue</span>
        </div>
    </div>

    <!-- Daily Cause List — Linear Cards (replaces wide table) -->
    <div class="causelist-table-card">
        <div id="causeListCardsContainer" class="causelist-cards">
            <div class="causelist-empty">Loading daily cause list...</div>
        </div>
    </div>
</div>
`;

// ==============================================================================
// My Daily Cause List & Court Appearance Board Engine
// ==============================================================================

var currentCauseListDate = '';
var currentCauseListCourt = '';

function initCauseListTab() {
  const dateInput = document.getElementById('causeListDateInput');
  const courtSelect = document.getElementById('causeListCourtFilterSelect');

  if (!currentCauseListDate) {
    currentCauseListDate = new Date().toISOString().split('T')[0];
  }
  if (dateInput) {
    dateInput.value = currentCauseListDate;
  }

  // Populate court options for cause list filter (excludes deleted courts)
  if (courtSelect) {
    const prevVal = courtSelect.value || '';
    const deletedCourts = getDeletedCourtsSet();
    const seenCourts = new Set();
    courtSelect.innerHTML = '<option value="">🏛️ All Courts</option>';
    courts.forEach(court => {
      const t = (court || '').trim();
      const key = t.toLowerCase();
      if (!t || deletedCourts.has(key) || seenCourts.has(key)) return;
      seenCourts.add(key);
      const opt = document.createElement('option');
      opt.value = t;
      opt.textContent = t;
      courtSelect.appendChild(opt);
    });
    if (prevVal) courtSelect.value = prevVal;
  }

  renderCauseListTable(currentCauseListDate, courtSelect ? courtSelect.value : '');
}

if (typeof initCauseListTab !== 'undefined') window.initCauseListTab = initCauseListTab;

function setCauseListDateOffset(daysOffset) {
  const target = new Date();
  target.setDate(target.getDate() + daysOffset);

  const yyyy = target.getFullYear();
  const mm = String(target.getMonth() + 1).padStart(2, '0');
  const dd = String(target.getDate()).padStart(2, '0');
  currentCauseListDate = `${yyyy}-${mm}-${dd}`;

  const dateInput = document.getElementById('causeListDateInput');
  if (dateInput) {
    dateInput.value = currentCauseListDate;
  }

  const courtSelect = document.getElementById('causeListCourtFilterSelect');
  renderCauseListTable(currentCauseListDate, courtSelect ? courtSelect.value : '');
}

if (typeof setCauseListDateOffset !== 'undefined') window.setCauseListDateOffset = setCauseListDateOffset;

function renderCauseListTable(dateVal = currentCauseListDate, courtFilter = '') {
  if (!dateVal) {
    dateVal = new Date().toISOString().split('T')[0];
  }
  currentCauseListDate = dateVal;
  currentCauseListCourt = (courtFilter || '').trim().toLowerCase();

  const container = document.getElementById('causeListCardsContainer');
  const tbody = document.getElementById('causeListTableBody');
  const bannerDateText = document.getElementById('causeListBannerDateText');
  const bannerDayName = document.getElementById('causeListBannerDayName');

  const totalBadge = document.getElementById('causeListTotalBadge');
  const civilBadge = document.getElementById('causeListCivilBadge');
  const criminalBadge = document.getElementById('causeListCriminalBadge');
  const revenueBadge = document.getElementById('causeListRevenueBadge');
  const navBadge = document.getElementById('causeListNavCount');

  // Format date readable
  const daysOfWeek = ['Sunday (रविवार)', 'Monday (सोमवार)', 'Tuesday (मंगलवार)', 'Wednesday (बुधवार)', 'Thursday (गुरुवार)', 'Friday (शुक्रवार)', 'Saturday (शनिवार)'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const parts = dateVal.split('-');
  const dtObj = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  const dayName = daysOfWeek[dtObj.getDay()];
  const formattedLong = `${parseInt(parts[2], 10)} ${months[dtObj.getMonth()]} ${parts[0]}`;

  if (bannerDateText) bannerDateText.textContent = `Daily Listed Matters — ${formattedLong}`;
  if (bannerDayName) bannerDayName.textContent = `Court Day: ${dayName}`;

  // Find all cases listed for this date
  let listedCases = allCaseRecords.filter(c => {
    return c.nextHearing === dateVal;
  });

  // Filter by court if selected
  if (currentCauseListCourt) {
    listedCases = listedCases.filter(c => {
      const ct = (c.courtName || c.criminalCourtName || '').trim().toLowerCase();
      return ct === currentCauseListCourt;
    });
  }

  // Update stats
  const civilCount = listedCases.filter(c => (c.caseType || 'civil') === 'civil').length;
  const criminalCount = listedCases.filter(c => (c.caseType || '') === 'criminal').length;
  const revenueCount = listedCases.filter(c => (c.caseType || '') === 'revenue').length;

  if (totalBadge) totalBadge.textContent = `${listedCases.length} Total Matters Listed`;
  if (civilBadge) civilBadge.textContent = `${civilCount} Civil`;
  if (criminalBadge) criminalBadge.textContent = `${criminalCount} Criminal`;
  if (revenueBadge) revenueBadge.textContent = `${revenueCount} Revenue`;

  // Update sidebar today count
  const todayStr = new Date().toISOString().split('T')[0];
  const todayListedCount = allCaseRecords.filter(c => c.nextHearing === todayStr).length;
  if (navBadge) navBadge.textContent = String(todayListedCount);

  if (!container && !tbody) return;

  if (listedCases.length === 0) {
    const emptyHtml = `
      <div class="causelist-empty">
        🎉 No court appearances scheduled for <strong>${formattedLong}</strong> (${dayName.split(' ')[0]}).
        <small>Select a different date above or pick a preset.</small>
      </div>
    `;
    if (container) container.innerHTML = emptyHtml;
    if (tbody) tbody.innerHTML = `<tr><td colspan="8" class="no-results" style="padding: 24px;">${emptyHtml}</td></tr>`;
    return;
  }

  // Sort by court name and then case number
  listedCases.sort((a, b) => {
    const courtA = (a.courtName || a.criminalCourtName || '').toUpperCase();
    const courtB = (b.courtName || b.criminalCourtName || '').toUpperCase();
    if (courtA !== courtB) return courtA.localeCompare(courtB);
    const numA = (a.caseNo || a.criminalCaseNumber || '').toUpperCase();
    const numB = (b.caseNo || b.criminalCaseNumber || '').toUpperCase();
    return numA.localeCompare(numB);
  });

  let html = '';
  listedCases.forEach((c, idx) => {
    const caseNumber = c.caseNo || c.criminalCaseNumber || '—';
    const caseName = c.caseName || (c.plaintiff ? `${c.plaintiff} vs ${c.defendant}` : (c.victimName ? `${c.victimName} vs ${c.accusedName}` : '—'));
    const courtName = c.courtName || c.criminalCourtName || 'District Court';
    const caseType = (c.caseType || 'civil').toLowerCase();
    const stage = c.hearingProcess || c.process || 'Scheduled Hearing';
    const clientName = c.clientName || c.criminalClientName || 'Client';
    const clientPhone = c.clientNumber || c.criminalClientNumber || '';

    html += `
      <div class="cl-card cl-${escapeHtml(caseType)}">
        <div class="cl-card-index">#${idx + 1}</div>
        <div class="cl-card-main">
          <div class="cl-card-top">
            <span class="cl-card-caseno copyable-case-no" title="Double-click to copy Case Number"><i class="fa-solid fa-hashtag"></i> ${escapeHtml(caseNumber)}</span>
            <span class="case-badge ${caseType}">${caseType.toUpperCase()}</span>
            <span class="cl-card-stage"><i class="fa-solid fa-gavel"></i> ${escapeHtml(stage)}</span>
          </div>
          <div class="cl-card-title">${escapeHtml(caseName)}</div>
          <div class="cl-card-meta">
            <span class="cl-meta-court">🏛️ ${escapeHtml(courtName)}</span>
            <span class="cl-meta-client">👤 ${escapeHtml(clientName)}${clientPhone ? ` · 📞 ${escapeHtml(clientPhone)}` : ''}</span>
          </div>
        </div>
        <div class="cl-card-actions">
          <button type="button" class="table-view-btn" onclick="openCaseHistoryModalByNo('${escapeHtml(caseNumber)}')" title="View case proceedings history"><i class="fa-solid fa-scroll"></i><span class="btn-text"> Details</span></button>
          <button type="button" class="table-view-btn update-hearing-btn" onclick="openUpdateHearingForCase('${escapeHtml(caseNumber)}')" title="Forward next hearing date"><i class="fa-solid fa-calendar-plus"></i><span class="btn-text"> Forward Date</span></button>
          <button type="button" class="table-view-btn whatsapp-btn" onclick="sendWhatsAppHearingNotice('${escapeHtml(caseNumber)}')" title="Send WhatsApp court notice to client"><i class="fa-brands fa-whatsapp"></i></button>
        </div>
      </div>
    `;
  });

  if (container) container.innerHTML = html;
  if (tbody) tbody.innerHTML = listedCases.map((c, idx) => {
    const caseNumber = c.caseNo || c.criminalCaseNumber || '—';
    const caseName = c.caseName || (c.plaintiff ? `${c.plaintiff} vs ${c.defendant}` : (c.victimName ? `${c.victimName} vs ${c.accusedName}` : '—'));
    return `<tr><td>#${idx + 1}</td><td><strong>${escapeHtml(caseNumber)}</strong></td><td><strong>${escapeHtml(caseName)}</strong></td></tr>`;
  }).join('');
}

if (typeof renderCauseListTable !== 'undefined') window.renderCauseListTable = renderCauseListTable;

function sendDailyCauseListWhatsApp() {
  const dateVal = currentCauseListDate || new Date().toISOString().split('T')[0];
  const listedCases = allCaseRecords.filter(c => c.nextHearing === dateVal);

  if (listedCases.length === 0) {
    alert(`No court hearings are scheduled for ${formatDateDMY(dateVal)}.`);
    return;
  }

  let msg = `*⚖️ CHAMBERS OF ATUL KUMAR MISHRA*\n`;
  msg += `*DAILY COURT APPEARANCE BOARD / CAUSE LIST*\n`;
  msg += `📅 *Date:* ${formatDateDMY(dateVal)}\n`;
  msg += `📋 *Total Matters:* ${listedCases.length}\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━\n\n`;

  listedCases.forEach((c, idx) => {
    const num = c.caseNo || c.criminalCaseNumber || 'Case';
    const title = c.caseName || (c.plaintiff ? `${c.plaintiff} vs ${c.defendant}` : (c.victimName ? `${c.victimName} vs ${c.accusedName}` : ''));
    const court = c.courtName || c.criminalCourtName || 'District Court';
    const stage = c.hearingProcess || 'Scheduled Hearing';
    const client = c.clientName || c.criminalClientName || '';

    msg += `*${idx + 1}. [${(c.caseType || 'Civil').toUpperCase()}] ${num}*\n`;
    msg += `   • *Parties:* ${title}\n`;
    msg += `   • *Court:* ${court}\n`;
    msg += `   • *Stage:* ${stage}\n`;
    if (client) msg += `   • *Client:* ${client}\n`;
    msg += `\n`;
  });

  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `_Advocate Atul Kumar Mishra_\nChambers & Legal Consultancy`;

  const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');
}

if (typeof sendDailyCauseListWhatsApp !== 'undefined') window.sendDailyCauseListWhatsApp = sendDailyCauseListWhatsApp;




function printDailyCauseList(targetDateStr = '') {
  if (!document.getElementById('printableCauseList') && typeof loadPrintTemplates === 'function') {
    loadPrintTemplates();
  }
  // If targetDateStr is passed as a MouseEvent/PointerEvent from event listeners, sanitize to empty string
  if (typeof targetDateStr !== 'string') {
    targetDateStr = '';
  }

  let y = null, m = null, d = null, fullDateFormatted = '', weekday = '';

  if (targetDateStr && targetDateStr.includes('-')) {
    const parts = targetDateStr.split('-');
    y = parseInt(parts[0], 10);
    m = parseInt(parts[1], 10) - 1;
    d = parseInt(parts[2], 10);
  } else if (typeof currentCauseListDate !== 'undefined' && currentCauseListDate && String(currentCauseListDate).includes('-')) {
    const parts = String(currentCauseListDate).split('-');
    y = parseInt(parts[0], 10);
    m = parseInt(parts[1], 10) - 1;
    d = parseInt(parts[2], 10);
  } else if (typeof selectedCalendarDate !== 'undefined' && selectedCalendarDate) {
    d = selectedCalendarDate.day;
    m = selectedCalendarDate.month;
    y = selectedCalendarDate.year;
  } else {
    const now = new Date();
    y = now.getFullYear();
    m = now.getMonth();
    d = now.getDate();
  }

  const dateObj = new Date(y, m, d);
  fullDateFormatted = `${String(d).padStart(2, '0')}/${String(m + 1).padStart(2, '0')}/${y}`;
  const weekdayEnglish = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
  const weekdayHindiMap = {
    Sunday: 'रविवार', Monday: 'सोमवार', Tuesday: 'मंगलवार',
    Wednesday: 'बुधवार', Thursday: 'गुरुवार', Friday: 'शुक्रवार', Saturday: 'शनिवार'
  };
  weekday = `${weekdayEnglish} (${weekdayHindiMap[weekdayEnglish] || ''})`;

  const dateMatchYMD = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

  // Filter hearings on this day across allCaseRecords
  const hearingsOnDay = allCaseRecords.filter(c => {
    if (!c.nextHearing || c.nextHearing === '—' || c.nextHearing === 'null') return false;
    const str = String(c.nextHearing).trim();
    if (str === dateMatchYMD) return true;

    // Check d/m/y or y/m/d fallback
    let hYear = null, hMonth = null, hDay = null;
    const ymd = str.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/);
    if (ymd) {
      hYear = parseInt(ymd[1], 10);
      hMonth = parseInt(ymd[2], 10) - 1;
      hDay = parseInt(ymd[3], 10);
    } else {
      const dmy = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
      if (dmy) {
        hDay = parseInt(dmy[1], 10);
        hMonth = parseInt(dmy[2], 10) - 1;
        hYear = parseInt(dmy[3], 10);
      }
    }
    return hYear === y && hMonth === m && hDay === d;
  });

  // Filter by court if selected in either dropdown
  const courtFilterVal = (document.getElementById('causeListCourtFilterSelect')?.value || document.getElementById('causeListCourtFilter')?.value || '').trim().toLowerCase();
  const filteredHearings = courtFilterVal
    ? hearingsOnDay.filter(c => (c.courtName || c.criminalCourtName || '').trim().toLowerCase() === courtFilterVal)
    : hearingsOnDay;

  // Sort by Court Name and then Case Number
  filteredHearings.sort((a, b) => {
    const courtA = (a.courtName || a.criminalCourtName || '').toUpperCase();
    const courtB = (b.courtName || b.criminalCourtName || '').toUpperCase();
    if (courtA !== courtB) return courtA.localeCompare(courtB);
    const numA = (a.caseNo || a.criminalCaseNumber || '').toUpperCase();
    const numB = (b.caseNo || b.criminalCaseNumber || '').toUpperCase();
    return numA.localeCompare(numB);
  });

  // Populate Printable Document
  const printDateEl = document.getElementById('causeListPrintDate');
  const printDayEl = document.getElementById('causeListPrintDay');
  const printTotalEl = document.getElementById('causeListPrintTotal');
  const printTimestampEl = document.getElementById('causeListPrintTimestamp');
  const printTbody = document.getElementById('causePrintTableBody');

  if (printDateEl) printDateEl.textContent = fullDateFormatted;
  if (printDayEl) printDayEl.textContent = weekday;
  if (printTotalEl) {
    const courtSuffix = courtFilterVal ? ` (${courtFilterVal.toUpperCase()})` : '';
    printTotalEl.textContent = `${filteredHearings.length} Matter${filteredHearings.length === 1 ? '' : 's'} Listed${courtSuffix}`;
  }
  if (printTimestampEl) {
    const now = new Date();
    printTimestampEl.textContent = `${formatDateDMY(now)} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }

  if (printTbody) {
    if (filteredHearings.length === 0) {
      const courtNote = courtFilterVal ? ` in ${courtFilterVal}` : '';
      printTbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 25px 10px; font-weight: bold; color: #64748b;">No court hearings scheduled on ${fullDateFormatted} (${weekday})${courtNote}.</td></tr>`;
    } else {
      printTbody.innerHTML = filteredHearings.map((h, idx) => {
        const caseNo = h.caseNo || h.criminalCaseNumber || '—';
        const type = (h.caseType || 'civil').toUpperCase();
        const court = h.courtName || h.criminalCourtName || 'District Court';
        const stage = h.hearingProcess || h.process || 'Scheduled Proceeding';
        const client = h.clientName || h.criminalClientName || '—';
        const clientPhone = (h.clientNumber || h.criminalClientNumber) ? `<br><small style="color: #475569; font-weight: 600;">📞 ${h.clientNumber || h.criminalClientNumber}</small>` : '';
        const caseName = h.caseName || (h.plaintiff ? `${h.plaintiff} vs ${h.defendant}` : (h.victimName ? `${h.victimName} vs ${h.accusedName}` : '—'));

        return `
          <tr>
            <td style="text-align: center; font-weight: 800;">${idx + 1}</td>
            <td>
              <strong>${caseNo}</strong>
              <div style="font-size: 9.5px; color: #475569; font-weight: 700; text-transform: uppercase;">[${type}]</div>
            </td>
            <td>
              <strong>${caseName}</strong>
            </td>
            <td>${court}</td>
            <td><strong>${stage}</strong></td>
            <td>${client}${clientPhone}</td>
            <td><div style="min-height: 28px; border-bottom: 1px dotted #94a3b8;"></div></td>
          </tr>
        `;
      }).join('');
    }
  }

  document.body.classList.remove('printing-case-dossier');
  window.print();
}

if (typeof printDailyCauseList !== 'undefined') window.printDailyCauseList = printDailyCauseList;

