// ==============================================================================
// CaseBook Tab Registration
// This registers the cause list HTML template into the global tabs object
// ==============================================================================
window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs["causelist"] = `
<div class="causelist-container tab-card-wrapper" id="causelistContainer">
  <!-- Top Banner / Navigation -->
  <div class="causelist-banner-card">
    <div class="causelist-banner-left">
      <div class="causelist-banner-icon-badge " aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
          <polyline points="17 21 17 13 7 13 7 21"></polyline>
          <polyline points="7 3 7 8 15 8"></polyline>
        </svg>
      </div>
      <div class="causelist-banner-titles">
        <h3 class="causelist-main-title">Daily Cause List &amp; Appearance Board</h3>
       </div>
    </div>
    <div class="causelist-banner-actions">
      <button type="button" id="causeListWhatsAppActionBtn" class="whatsapp-send-btn causelist-btn" onclick="sendDailyCauseListWhatsApp()" title="Share today's cause list summary on WhatsApp">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
        WhatsApp Daily Schedule
      </button>
    </div>
  </div>

  <!-- Cause List Controls Toolbar -->
  <div class="causelist-toolbar-card">
    <div class="causelist-toolbar-left">
      <div class="causelist-date-selector">
        <label for="causeListDateInput" class="causelist-toolbar-label">Select Appearance Date:</label>
        <input type="date" id="causeListDateInput" class="causelist-date-input" onchange="renderCauseListTable(this.value, document.getElementById('causeListCourtFilterSelect')?.value)" />
      </div>
      <div class="causelist-court-filter-wrap">
        <label for="causeListCourtFilterSelect" class="causelist-toolbar-label">Filter by Court:</label>
        <select id="causeListCourtFilterSelect" class="form-select causelist-select" onchange="renderCauseListTable(document.getElementById('causeListDateInput')?.value, this.value)">
          <option value="">🏛️ All Courts</option>
        </select>
      </div>
    </div>
    <div class="causelist-presets-wrap">
      <label class="causelist-toolbar-label">Quick Date:</label>
      <div class="causelist-preset-grid">
        <!-- Preset buttons for quick date selection (Today, Tomorrow, +2 days, +7 days) -->
        <button type="button" class="preset-icon-btn" onclick="setCauseListDateOffset(0)" title="Today">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="17" x2="12" y2="22"></line>
            <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a1 1 0 0 0 0-2H8a1 1 0 0 0 0 2h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"></path>
          </svg>
        </button>
        <button type="button" class="preset-icon-btn" onclick="setCauseListDateOffset(1)" title="Tomorrow">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
        </button>
        <button type="button" class="preset-icon-btn" onclick="setCauseListDateOffset(2)" title="In 2 Days">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </button>
        <button type="button" class="preset-icon-btn" onclick="setCauseListDateOffset(7)" title="Next Week">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
            <path d="m9 16 2 2 4-4"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!-- Cause List Summary Badges & Stats Bar -->
  <div class="causelist-stats-bar">
    <div class="causelist-date-banner">
    <div class="icon--wrap">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
  <line x1="16" y1="2" x2="16" y2="6"></line>
  <line x1="8" y1="2" x2="8" y2="6"></line>
  <line x1="3" y1="10" x2="21" y2="10"></line>
  <line x1="8" y1="14" x2="16" y2="14"></line>
  <line x1="8" y1="18" x2="13" y2="18"></line>
</svg>
</div>
      <div class="banner-text-wrap">
        <h4 id="causeListBannerDateText">Listed Matters for Today</h4>
        <span id="causeListBannerDayName" class="banner-subtext">Loading day...</span>
      </div>
    </div>
    <div class="causelist-counters-group">
      <span id="causeListTotalBadge" class="causelist-stat-pill total">0 Total Matters Listed</span>
      <span id="causeListCivilBadge" class="causelist-stat-pill civil">0 Civil</span>
      <span id="causeListCriminalBadge" class="causelist-stat-pill criminal">0 Criminal</span>
      <span id="causeListRevenueBadge" class="causelist-stat-pill revenue">0 Revenue</span>
    </div>
  </div>

  <!-- Daily Cause List Cards Container (Dynamically populated by JS) -->
  <div id="causeListCardsContainer" class="causelist-cards">
      <div class="causelist-empty">
       <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
  <line x1="16" y1="2" x2="16" y2="6"></line>
  <line x1="8" y1="2" x2="8" y2="6"></line>
  <line x1="3" y1="10" x2="21" y2="10"></line>
  <line x1="8" y1="14" x2="16" y2="14"></line>
  <line x1="8" y1="18" x2="13" y2="18"></line>
</svg>
        <span class="empty-title-text">Loading daily cause list...</span>
      </div>
    </div>
</div>
`;

// ==============================================================================
// My Daily Cause List & Court Appearance Board Engine
// ==============================================================================

// Global state variables for the current cause list view
var currentCauseListDate = "";
var currentCauseListCourt = "";

/**
 * Initializes the Cause List tab.
 * - Sets the default date to today.
 * - Populates the court filter dropdown.
 * - Calls renderCauseListTable() to display the initial list.
 */
function initCauseListTab() {
  const dateInput = document.getElementById("causeListDateInput");
  const courtSelect = document.getElementById("causeListCourtFilterSelect");

  if (!currentCauseListDate) {
    currentCauseListDate = new Date().toISOString().split("T")[0];
  }
  if (dateInput) {
    dateInput.value = currentCauseListDate;
  }

  // Populate court options for cause list filter (excludes deleted courts)
  if (courtSelect) {
    const prevVal = courtSelect.value || "";
    const deletedCourts =
      typeof getDeletedCourtsSet === "function"
        ? getDeletedCourtsSet()
        : typeof window !== "undefined" && typeof window.getDeletedCourtsSet === "function"
          ? window.getDeletedCourtsSet()
          : new Set();
    const seenCourts = new Set();
    courtSelect.innerHTML = '<option value="">🏛️ All Courts</option>';
    const courtsList =
      typeof courts !== "undefined" && Array.isArray(courts)
        ? courts
        : typeof window !== "undefined" && Array.isArray(window.courts)
          ? window.courts
          : [];
    courtsList.forEach((court) => {
      const t = (court || "").trim();
      const key = t.toLowerCase();
      if (!t || deletedCourts.has(key) || seenCourts.has(key)) return;
      seenCourts.add(key);
      const opt = document.createElement("option");
      opt.value = t;
      opt.textContent = t;
      courtSelect.appendChild(opt);
    });
    if (prevVal) courtSelect.value = prevVal;
  }

  renderCauseListTable(currentCauseListDate, courtSelect ? courtSelect.value : "");
}

if (typeof initCauseListTab !== "undefined") window.initCauseListTab = initCauseListTab;

/**
 * Sets the cause list date to a specific offset from today.
 * @param {number} daysOffset - Number of days to add/subtract from today (e.g., 0 = today, 1 = tomorrow).
 */
function setCauseListDateOffset(daysOffset) {
  const target = new Date();
  target.setDate(target.getDate() + daysOffset);

  const yyyy = target.getFullYear();
  const mm = String(target.getMonth() + 1).padStart(2, "0");
  const dd = String(target.getDate()).padStart(2, "0");
  currentCauseListDate = `${yyyy}-${mm}-${dd}`;

  const dateInput = document.getElementById("causeListDateInput");
  if (dateInput) {
    dateInput.value = currentCauseListDate;
  }

  const courtSelect = document.getElementById("causeListCourtFilterSelect");
  renderCauseListTable(currentCauseListDate, courtSelect ? courtSelect.value : "");
}

if (typeof setCauseListDateOffset !== "undefined")
  window.setCauseListDateOffset = setCauseListDateOffset;

/**
 * Renders the cause list cards for a given date and court filter.
 * This is the core function that updates the UI.
 * @param {string} dateVal - The date in YYYY-MM-DD format.
 * @param {string} courtFilter - The selected court name to filter by (empty = all courts).
 */
function renderCauseListTable(dateVal = currentCauseListDate, courtFilter = "") {
  if (!dateVal) {
    dateVal = new Date().toISOString().split("T")[0];
  }
  currentCauseListDate = dateVal;
  currentCauseListCourt = (courtFilter || "").trim().toLowerCase();

  const container = document.getElementById("causeListCardsContainer");
  const tbody = document.getElementById("causeListTableBody");
  const bannerDateText = document.getElementById("causeListBannerDateText");
  const bannerDayName = document.getElementById("causeListBannerDayName");

  const totalBadge = document.getElementById("causeListTotalBadge");
  const civilBadge = document.getElementById("causeListCivilBadge");
  const criminalBadge = document.getElementById("causeListCriminalBadge");
  const revenueBadge = document.getElementById("causeListRevenueBadge");
  const navBadge = document.getElementById("causeListNavCount");

  // Format date readable
  const daysOfWeek = [
    "Sunday (रविवार)",
    "Monday (सोमवार)",
    "Tuesday (मंगलवार)",
    "Wednesday (बुधवार)",
    "Thursday (गुरुवार)",
    "Friday (शुक्रवार)",
    "Saturday (शनिवार)",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const parts = dateVal.split("-");
  const dtObj = new Date(
    parseInt(parts[0], 10),
    parseInt(parts[1], 10) - 1,
    parseInt(parts[2], 10),
  );
  const dayName = daysOfWeek[dtObj.getDay()];
  const formattedLong = `${parseInt(parts[2], 10)} ${months[dtObj.getMonth()]} ${parts[0]}`;

  if (bannerDateText) bannerDateText.textContent = `Daily Listed Matters — ${formattedLong}`;
  if (bannerDayName) bannerDayName.textContent = `Court Day: ${dayName}`;

  const allRecords =
    typeof allCaseRecords !== "undefined" && Array.isArray(allCaseRecords)
      ? allCaseRecords
      : typeof window !== "undefined" && Array.isArray(window.allCaseRecords)
        ? window.allCaseRecords
        : [];

  // Find all cases listed for this date
  let listedCases = allRecords.filter((c) => {
    return c.nextHearing === dateVal;
  });

  // Filter by court if selected
  if (currentCauseListCourt) {
    listedCases = listedCases.filter((c) => {
      const ct = (c.courtName || c.criminalCourtName || "").trim().toLowerCase();
      return ct === currentCauseListCourt;
    });
  }

  // Update stats
  const civilCount = listedCases.filter((c) => (c.caseType || "civil") === "civil").length;
  const criminalCount = listedCases.filter((c) => (c.caseType || "") === "criminal").length;
  const revenueCount = listedCases.filter((c) => (c.caseType || "") === "revenue").length;

  if (totalBadge) totalBadge.textContent = `${listedCases.length} Total Matters Listed`;
  if (civilBadge) civilBadge.textContent = `${civilCount} Civil`;
  if (criminalBadge) criminalBadge.textContent = `${criminalCount} Criminal`;
  if (revenueBadge) revenueBadge.textContent = `${revenueCount} Revenue`;

  // Update sidebar today count
  const todayStr = new Date().toISOString().split("T")[0];
  const todayListedCount = allRecords.filter((c) => c.nextHearing === todayStr).length;
  if (navBadge) navBadge.textContent = String(todayListedCount);

  if (!container && !tbody) return;

  // Handle empty state
  if (listedCases.length === 0) {
    const emptyHtml = `
      <div class="causelist-empty">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="empty-horn-icon" style="color: var(--accent-gold);">
          <path d="m2 22 1-1a3 3 0 0 1 4.24 0l.76.76a3 3 0 0 0 4.24 0L22 12 12 2 2.24 11.76a3 3 0 0 0 0 4.24l.76.76A3 3 0 0 1 3 21Z"></path>
        </svg>
        <span class="empty-title-text">No court appearances scheduled for <strong>${formattedLong}</strong> (${dayName.split(" ")[0]}).</span>
        <small class="empty-subtitle-text">Select a different date above or pick a preset.</small>
      </div>
    `;
    if (container) container.innerHTML = emptyHtml;
    if (tbody)
      tbody.innerHTML = `<tr><td colspan="8" class="no-results" style="padding: 24px;">${emptyHtml}</td></tr>`;
    return;
  }

  // Sort by court name and then case number
  listedCases.sort((a, b) => {
    const courtA = (a.courtName || a.criminalCourtName || "").toUpperCase();
    const courtB = (b.courtName || b.criminalCourtName || "").toUpperCase();
    if (courtA !== courtB) return courtA.localeCompare(courtB);
    const numA = (a.caseNo || a.criminalCaseNumber || "").toUpperCase();
    const numB = (b.caseNo || b.criminalCaseNumber || "").toUpperCase();
    return numA.localeCompare(numB);
  });

  // Build HTML for each case card
  let html = "";
  listedCases.forEach((c, idx) => {
    const caseNumber = c.caseNo || c.criminalCaseNumber || "—";
    const caseName =
      c.caseName ||
      (c.plaintiff
        ? `${c.plaintiff} vs ${c.defendant}`
        : c.victimName
          ? `${c.victimName} vs ${c.accusedName}`
          : "—");
    const courtName = c.courtName || c.criminalCourtName || "District Court";
    const caseType = (c.caseType || "civil").toLowerCase();
    const stage = c.hearingProcess || c.process || "Scheduled Hearing";
    const clientName = c.clientName || c.criminalClientName || "Client";
    const clientPhone = c.clientNumber || c.criminalClientNumber || "";

    html += `
      <div class="case-card cl-card cl-${escapeHtml(caseType)}">
        <!-- LEFT: Case Information -->
        <div class="case-info cl-card-main">
          <div class="case-title-row cl-card-top">
            <h2 class="case-title cl-card-title">${escapeHtml(caseName)}</h2>
          </div>

          <div class="case-meta cl-card-meta">
            <span class="meta-item cl-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 21h18"></path><path d="M5 21V7l8-4 8 4v14"></path>
              </svg>
              <span>${escapeHtml(courtName)}</span>
            </span>

            <span class="meta-item cl-meta-item copyable-case-no" title="Double-click to copy Case Number">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
              </svg>
              <span>${escapeHtml(caseNumber)}</span>
            </span>

            ${
              clientName
                ? `
            <span class="meta-item cl-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>${escapeHtml(clientName)}</span>
            </span>`
                : ""
            }

            ${
              clientPhone
                ? `
            <span class="meta-item phone cl-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>${escapeHtml(clientPhone)}</span>
            </span>`
                : ""
            }
          </div>

          <div class="purpose-tag cl-card-purpose">
            <span class="purpose-label">Purpose:</span>
            <span class="purpose-value">${escapeHtml(stage)}</span>
          </div>
        </div>

        <!-- RIGHT: Actions -->
        <div class="case-actions cl-card-actions">
          <button type="button" class="btn btn-view table-view-btn" onclick="openCaseHistoryModalByNo('${escapeHtml(caseNumber)}')" title="View case proceedings history">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <span class="btn-text">View</span>
          </button>

          <button type="button" class="btn btn-forward table-view-btn update-hearing-btn" onclick="openUpdateHearingForCase('${escapeHtml(caseNumber)}')" title="Forward next hearing date">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 17 20 12 15 7"></polyline>
              <path d="M4 18v-2a4 4 0 0 1 4-4h12"></path>
            </svg>
            <span class="btn-text">Forward</span>
          </button>

          <button type="button" class="btn btn-whatsapp table-view-btn whatsapp-btn" onclick="sendWhatsAppHearingNotice('${escapeHtml(caseNumber)}')" title="Send WhatsApp court notice to client" aria-label="Chat on WhatsApp">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path>
            </svg>
          </button>
        </div>
      </div>
    `;
  });

  if (container) container.innerHTML = html;
  if (tbody)
    tbody.innerHTML = listedCases
      .map((c, idx) => {
        const caseNumber = c.caseNo || c.criminalCaseNumber || "—";
        const caseName =
          c.caseName ||
          (c.plaintiff
            ? `${c.plaintiff} vs ${c.defendant}`
            : c.victimName
              ? `${c.victimName} vs ${c.accusedName}`
              : "—");
        return `<tr><td>#${idx + 1}</td><td><strong>${escapeHtml(caseNumber)}</strong></td><td><strong>${escapeHtml(caseName)}</strong></td></tr>`;
      })
      .join("");
}

if (typeof renderCauseListTable !== "undefined") window.renderCauseListTable = renderCauseListTable;

/**
 * Sends the daily cause list summary via WhatsApp.
 * Opens a WhatsApp chat with a pre-filled message containing all listed cases.
 */
function sendDailyCauseListWhatsApp() {
  const dateVal = currentCauseListDate || new Date().toISOString().split("T")[0];
  const allRecords =
    typeof allCaseRecords !== "undefined" && Array.isArray(allCaseRecords)
      ? allCaseRecords
      : typeof window !== "undefined" && Array.isArray(window.allCaseRecords)
        ? window.allCaseRecords
        : [];
  const listedCases = allRecords.filter((c) => c.nextHearing === dateVal);

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
    const num = c.caseNo || c.criminalCaseNumber || "Case";
    const title =
      c.caseName ||
      (c.plaintiff
        ? `${c.plaintiff} vs ${c.defendant}`
        : c.victimName
          ? `${c.victimName} vs ${c.accusedName}`
          : "");
    const court = c.courtName || c.criminalCourtName || "District Court";
    const stage = c.hearingProcess || "Scheduled Hearing";
    const client = c.clientName || c.criminalClientName || "";

    msg += `*${idx + 1}. [${(c.caseType || "Civil").toUpperCase()}] ${num}*\n`;
    msg += `   • *Parties:* ${title}\n`;
    msg += `   • *Court:* ${court}\n`;
    msg += `   • *Stage:* ${stage}\n`;
    if (client) msg += `   • *Client:* ${client}\n`;
    msg += `\n`;
  });

  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `_Advocate Atul Kumar Mishra_\nChambers & Legal Consultancy`;

  const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, "_blank");
}

if (typeof sendDailyCauseListWhatsApp !== "undefined")
  window.sendDailyCauseListWhatsApp = sendDailyCauseListWhatsApp;

/**
 * Prints the daily cause list as an A4 document.
 * This function finds all hearings for a specific date, formats them into a printable table,
 * and triggers the browser's print dialog.
 * @param {string} targetDateStr - Optional date to print. If empty, uses the current selected date.
 */
function printDailyCauseList(targetDateStr = "") {
  if (!document.getElementById("printableCauseList") && typeof loadPrintTemplates === "function") {
    loadPrintTemplates();
  }
  // If targetDateStr is passed as a MouseEvent/PointerEvent from event listeners, sanitize to empty string
  if (typeof targetDateStr !== "string") {
    targetDateStr = "";
  }

  let y = null,
    m = null,
    d = null,
    fullDateFormatted = "",
    weekday = "";

  if (targetDateStr && targetDateStr.includes("-")) {
    const parts = targetDateStr.split("-");
    y = parseInt(parts[0], 10);
    m = parseInt(parts[1], 10) - 1;
    d = parseInt(parts[2], 10);
  } else if (
    typeof currentCauseListDate !== "undefined" &&
    currentCauseListDate &&
    String(currentCauseListDate).includes("-")
  ) {
    const parts = String(currentCauseListDate).split("-");
    y = parseInt(parts[0], 10);
    m = parseInt(parts[1], 10) - 1;
    d = parseInt(parts[2], 10);
  } else if (typeof selectedCalendarDate !== "undefined" && selectedCalendarDate) {
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
  fullDateFormatted = `${String(d).padStart(2, "0")}/${String(m + 1).padStart(2, "0")}/${y}`;
  const weekdayEnglish = dateObj.toLocaleDateString("en-US", { weekday: "long" });
  const weekdayHindiMap = {
    Sunday: "रविवार",
    Monday: "सोमवार",
    Tuesday: "मंगलवार",
    Wednesday: "बुधवार",
    Thursday: "गुरुवार",
    Friday: "शुक्रवार",
    Saturday: "शनिवार",
  };
  weekday = `${weekdayEnglish} (${weekdayHindiMap[weekdayEnglish] || ""})`;

  const dateMatchYMD = `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  // Filter hearings on this day across allCaseRecords
  const allRecords =
    typeof allCaseRecords !== "undefined" && Array.isArray(allCaseRecords)
      ? allCaseRecords
      : typeof window !== "undefined" && Array.isArray(window.allCaseRecords)
        ? window.allCaseRecords
        : [];
  const hearingsOnDay = allRecords.filter((c) => {
    if (!c.nextHearing || c.nextHearing === "—" || c.nextHearing === "null") return false;
    const str = String(c.nextHearing).trim();
    if (str === dateMatchYMD) return true;

    // Check d/m/y or y/m/d fallback
    let hYear = null,
      hMonth = null,
      hDay = null;
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
  const courtFilterVal = (
    document.getElementById("causeListCourtFilterSelect")?.value ||
    document.getElementById("causeListCourtFilter")?.value ||
    ""
  )
    .trim()
    .toLowerCase();
  const filteredHearings = courtFilterVal
    ? hearingsOnDay.filter(
        (c) => (c.courtName || c.criminalCourtName || "").trim().toLowerCase() === courtFilterVal,
      )
    : hearingsOnDay;

  // Sort by Court Name and then Case Number
  filteredHearings.sort((a, b) => {
    const courtA = (a.courtName || a.criminalCourtName || "").toUpperCase();
    const courtB = (b.courtName || b.criminalCourtName || "").toUpperCase();
    if (courtA !== courtB) return courtA.localeCompare(courtB);
    const numA = (a.caseNo || a.criminalCaseNumber || "").toUpperCase();
    const numB = (b.caseNo || b.criminalCaseNumber || "").toUpperCase();
    return numA.localeCompare(numB);
  });

  // Populate Printable Document
  const printDateEl = document.getElementById("causeListPrintDate");
  const printDayEl = document.getElementById("causeListPrintDay");
  const printTotalEl = document.getElementById("causeListPrintTotal");
  const printTimestampEl = document.getElementById("causeListPrintTimestamp");
  const printTbody = document.getElementById("causePrintTableBody");

  if (printDateEl) printDateEl.textContent = fullDateFormatted;
  if (printDayEl) printDayEl.textContent = weekday;
  if (printTotalEl) {
    const courtSuffix = courtFilterVal ? ` (${courtFilterVal.toUpperCase()})` : "";
    printTotalEl.textContent = `${filteredHearings.length} Matter${filteredHearings.length === 1 ? "" : "s"} Listed${courtSuffix}`;
  }
  if (printTimestampEl) {
    const now = new Date();
    printTimestampEl.textContent = `${formatDateDMY(now)} ${now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  }

  if (printTbody) {
    if (filteredHearings.length === 0) {
      const courtNote = courtFilterVal ? ` in ${courtFilterVal}` : "";
      printTbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 25px 10px; font-weight: bold; color: #64748b;">No court hearings scheduled on ${fullDateFormatted} (${weekday})${courtNote}.</td></tr>`;
    } else {
      printTbody.innerHTML = filteredHearings
        .map((h, idx) => {
          const caseNo = h.caseNo || h.criminalCaseNumber || "—";
          const type = (h.caseType || "civil").toUpperCase();
          const court = h.courtName || h.criminalCourtName || "District Court";
          const stage = h.hearingProcess || h.process || "Scheduled Proceeding";
          const client = h.clientName || h.criminalClientName || "—";
          const clientPhone =
            h.clientNumber || h.criminalClientNumber
              ? `<br><small style="color: #475569; font-weight: 600;">📞 ${h.clientNumber || h.criminalClientNumber}</small>`
              : "";
          const caseName =
            h.caseName ||
            (h.plaintiff
              ? `${h.plaintiff} vs ${h.defendant}`
              : h.victimName
                ? `${h.victimName} vs ${h.accusedName}`
                : "—");

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
        })
        .join("");
    }
  }

  document.body.classList.remove("printing-case-dossier");
  window.print();
}

if (typeof printDailyCauseList !== "undefined") window.printDailyCauseList = printDailyCauseList;
