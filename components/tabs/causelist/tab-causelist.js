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
       <div class="causelist-banner-icon-badge" aria-hidden="true"><i class="fa-solid fa-file-contract"></i></div>
       <div class="causelist-banner-titles">
         <h3 class="causelist-main-title">Daily Cause List &amp; Appearance Board</h3>
         <div class="header-chips-row">
           <button type="button" class="header-chip-btn" onclick="setCauseListDateOffset(0)"><i class="fa-solid fa-calendar-day" aria-hidden="true"></i> Today</button>
           <button type="button" class="header-chip-btn" onclick="setCauseListDateOffset(1)"><i class="fa-solid fa-bolt" aria-hidden="true"></i> Tomorrow</button>
           <button type="button" class="header-chip-btn" onclick="printDailyCauseList()"><i class="fa-solid fa-print" aria-hidden="true"></i> Print Cause List (A4)</button>
           <button type="button" class="header-chip-btn forward-date-chip" onclick="openForwardDateModal()" title="Forward Next Hearing Date"><i class="fa-solid fa-calendar-plus" aria-hidden="true"></i> Forward Date</button>
         </div>
        </div>
    </div>
    <div class="causelist-banner-actions">
      <button type="button" id="causeListWhatsAppActionBtn" class="whatsapp-send-btn causelist-btn" onclick="sendDailyCauseListWhatsApp()" title="Share today's cause list summary on WhatsApp">
         <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
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
         <label for="causeListCourtFilterTrigger" class="causelist-toolbar-label">Filter by Court:</label>
         <div class="causelist-court-combobox" id="causeListCourtFilterWrapper">
           <button type="button" class="causelist-select-trigger" id="causeListCourtFilterTrigger" aria-haspopup="listbox" aria-expanded="false" onclick="toggleCauseListCourtDropdown()">
             <span id="causeListCourtFilterLabel">🏛️ All Courts</span>
             <i class="fa-solid fa-chevron-down causelist-select-arrow" aria-hidden="true"></i>
           </button>
           <!-- Hidden native select retained for compatibility with existing filtering code. -->
           <select id="causeListCourtFilterSelect" class="form-select causelist-select" style="display: none;" aria-hidden="true">
             <option value="">🏛️ All Courts</option>
           </select>
           <div id="causeListCourtDropdown" class="causelist-combobox-results hidden">
             <div class="causelist-dropdown-search-wrapper">
               <span class="causelist-combobox-search-icon"><i class="fa-solid fa-magnifying-glass"></i></span>
               <input type="text" id="causeListCourtSearchInput" class="causelist-dropdown-search-input" placeholder="Search courts..." autocomplete="off" oninput="filterCauseListCourtDropdown(this.value)" onkeydown="handleCauseListCourtDropdownKeydown(event)">
             </div>
             <ul id="causeListCourtOptionsList" class="causelist-court-options-list" role="listbox" aria-label="Courts"></ul>
           </div>
         </div>
       </div>
    </div>
    <div class="causelist-presets-wrap">
      <label class="causelist-toolbar-label">Quick Date:</label>
      <div class="causelist-preset-grid">
        <!-- Preset buttons for quick date selection (Today, Tomorrow, +2 days, +7 days) -->
        <button type="button" class="preset-icon-btn" onclick="setCauseListDateOffset(0)" title="Today">
            <i class="fa-solid fa-calendar-day" aria-hidden="true"></i><span>Today</span>
        </button>
        <button type="button" class="preset-icon-btn" onclick="setCauseListDateOffset(1)" title="Tomorrow">
            <i class="fa-solid fa-bolt" aria-hidden="true"></i><span>Tomorrow</span>
        </button>
        <button type="button" class="preset-icon-btn" onclick="setCauseListDateOffset(2)" title="In 2 Days">
            <i class="fa-solid fa-calendar-days" aria-hidden="true"></i><span>+2 Days</span>
        </button>
        <button type="button" class="preset-icon-btn" onclick="setCauseListDateOffset(7)" title="Next Week">
            <i class="fa-solid fa-calendar-check" aria-hidden="true"></i><span>Next Week</span>
        </button>
      </div>
    </div>
  </div>

  <!-- Cause List Summary Badges & Stats Bar -->
  <div class="causelist-stats-bar">
    <div class="causelist-date-banner">
    <div class="icon--wrap">
       <i class="fa-solid fa-scale-balanced" aria-hidden="true"></i>
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
        <i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i>
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
    updateCauseListCourtTrigger();
    filterCauseListCourtDropdown("", true);
  }

  renderCauseListTable(currentCauseListDate, courtSelect ? courtSelect.value : "");
}

if (typeof initCauseListTab !== "undefined") window.initCauseListTab = initCauseListTab;

// ==============================================================================
// Searchable custom court dropdown
// ============================================================================
function renderCauseListCourtDropdownOptions(optionsToRender = []) {
  const list = document.getElementById("causeListCourtOptionsList");
  const select = document.getElementById("causeListCourtFilterSelect");
  if (!list || !select) return;

  const selectedValue = select.value || "";
  list.innerHTML = "";

  if (!optionsToRender.length) {
    const empty = document.createElement("li");
    empty.className = "causelist-court-option-empty";
    empty.textContent = "🔎 No matching courts found";
    list.appendChild(empty);
    return;
  }

  optionsToRender.forEach((optionData) => {
    const option = document.createElement("li");
    const isSelected = optionData.value === selectedValue;
    option.className = `causelist-court-option${isSelected ? " selected" : ""}`;
    option.setAttribute("role", "option");
    option.setAttribute("aria-selected", String(isSelected));
    option.dataset.value = optionData.value;
    const label = document.createElement("span");
    label.textContent = optionData.label;
    const check = document.createElement("span");
    check.className = "causelist-court-option-check";
    check.textContent = isSelected ? "✓" : "";
    option.append(label, check);
    option.addEventListener("click", () => selectCauseListCourt(optionData.value));
    list.appendChild(option);
  });
}

function updateCauseListCourtTrigger() {
  const select = document.getElementById("causeListCourtFilterSelect");
  const label = document.getElementById("causeListCourtFilterLabel");
  if (!select || !label) return;

  const selectedOption = select.options[select.selectedIndex];
  label.textContent = selectedOption?.textContent || "🏛️ All Courts";
}

function openCauseListCourtDropdown() {
  const dropdown = document.getElementById("causeListCourtDropdown");
  const trigger = document.getElementById("causeListCourtFilterTrigger");
  const searchInput = document.getElementById("causeListCourtSearchInput");
  if (!dropdown) return;

  dropdown.classList.remove("hidden");
  trigger?.setAttribute("aria-expanded", "true");
  filterCauseListCourtDropdown(searchInput?.value || "");
  requestAnimationFrame(() => searchInput?.focus());
}

function closeCauseListCourtDropdown() {
  document.getElementById("causeListCourtDropdown")?.classList.add("hidden");
  document.getElementById("causeListCourtFilterTrigger")?.setAttribute("aria-expanded", "false");
}

function toggleCauseListCourtDropdown() {
  const dropdown = document.getElementById("causeListCourtDropdown");
  if (dropdown?.classList.contains("hidden")) openCauseListCourtDropdown();
  else closeCauseListCourtDropdown();
}

function filterCauseListCourtDropdown(query = "", keepClosed = false) {
  const dropdown = document.getElementById("causeListCourtDropdown");
  const select = document.getElementById("causeListCourtFilterSelect");
  if (!select) return;
  if (dropdown && !keepClosed) dropdown.classList.remove("hidden");

  const normalized = String(query).trim().toLowerCase();
  const options = Array.from(select.options)
    .map((option) => ({ value: option.value, label: option.textContent || "" }))
    .filter((option) => !normalized || option.label.toLowerCase().includes(normalized));

  renderCauseListCourtDropdownOptions(options);
}

function selectCauseListCourt(value) {
  const select = document.getElementById("causeListCourtFilterSelect");
  if (!select) return;

  select.value = value;
  updateCauseListCourtTrigger();
  closeCauseListCourtDropdown();
  const searchInput = document.getElementById("causeListCourtSearchInput");
  if (searchInput) searchInput.value = "";
  filterCauseListCourtDropdown("", true);
  renderCauseListTable(document.getElementById("causeListDateInput")?.value, value);
}

function handleCauseListCourtDropdownKeydown(event) {
  if (event.key === "Escape") {
    closeCauseListCourtDropdown();
    document.getElementById("causeListCourtFilterTrigger")?.focus();
    return;
  }
  if (event.key === "Enter") {
    const firstOption = document.querySelector("#causeListCourtOptionsList .causelist-court-option");
    if (firstOption) {
      event.preventDefault();
      selectCauseListCourt(firstOption.dataset.value || "");
    }
  }
}

window.openCauseListCourtDropdown = openCauseListCourtDropdown;
window.closeCauseListCourtDropdown = closeCauseListCourtDropdown;
window.toggleCauseListCourtDropdown = toggleCauseListCourtDropdown;
window.filterCauseListCourtDropdown = filterCauseListCourtDropdown;
window.selectCauseListCourt = selectCauseListCourt;
window.handleCauseListCourtDropdownKeydown = handleCauseListCourtDropdownKeydown;

document.addEventListener("click", (event) => {
  const wrapper = document.getElementById("causeListCourtFilterWrapper");
  if (wrapper && !wrapper.contains(event.target)) closeCauseListCourtDropdown();
});

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

  // Find all active (non-disposed) cases listed for this date
  const isDisp = typeof isCaseDisposed === "function"
    ? isCaseDisposed
    : (c) => ((c && (c.caseStatus || c.status || c.case_status)) || "").toLowerCase().includes("dispose");

  let listedCases = allRecords.filter((c) => {
    if (isDisp(c)) return false;
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
  const todayListedCount = allRecords.filter((c) => !isDisp(c) && c.nextHearing === todayStr).length;
  if (navBadge) navBadge.textContent = String(todayListedCount);

  if (!container && !tbody) return;

  // Handle empty state
  if (listedCases.length === 0) {
    const emptyHtml = `
      <div class="causelist-empty">
        <i class="fa-solid fa-calendar-xmark empty-horn-icon" aria-hidden="true" style="color: var(--accent-gold);"></i>
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
              <i class="fa-solid fa-landmark" aria-hidden="true"></i>
              <span>${escapeHtml(courtName)}</span>
            </span>

            <span class="meta-item cl-meta-item copyable-case-no" title="Double-click to copy Case Number">
              <i class="fa-solid fa-file-lines" aria-hidden="true"></i>
              <span>${escapeHtml(caseNumber)}</span>
            </span>

            ${
              clientName
                ? `
            <span class="meta-item cl-meta-item">
              <i class="fa-solid fa-user" aria-hidden="true"></i>
              <span>${escapeHtml(clientName)}</span>
            </span>`
                : ""
            }

            ${
              clientPhone
                ? `
            <span class="meta-item phone cl-meta-item">
              <i class="fa-solid fa-phone" aria-hidden="true"></i>
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
            <i class="fa-solid fa-eye" aria-hidden="true"></i>
            <span class="btn-text">View</span>
          </button>

          <button type="button" class="btn btn-forward table-view-btn update-hearing-btn" onclick="openUpdateHearingForCase('${escapeHtml(caseNumber)}')" title="Forward next hearing date">
            <i class="fa-solid fa-calendar-plus forward-action-icon" aria-hidden="true"></i>
            <span class="btn-text">Forward</span>
          </button>

          <button type="button" class="btn btn-whatsapp table-view-btn whatsapp-btn" onclick="sendWhatsAppHearingNotice('${escapeHtml(caseNumber)}')" title="Send WhatsApp court notice to client" aria-label="Chat on WhatsApp">
             <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
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
  const isDisp = typeof isCaseDisposed === "function"
    ? isCaseDisposed
    : (c) => ((c && (c.caseStatus || c.status || c.case_status)) || "").toLowerCase().includes("dispose");
  const listedCases = allRecords.filter((c) => !isDisp(c) && c.nextHearing === dateVal);

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
  const isDisp = typeof isCaseDisposed === "function"
    ? isCaseDisposed
    : (c) => ((c && (c.caseStatus || c.status || c.case_status)) || "").toLowerCase().includes("dispose");
  const hearingsOnDay = allRecords.filter((c) => {
    if (isDisp(c)) return false;
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
