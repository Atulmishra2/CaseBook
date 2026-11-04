// ==============================================================================
// CaseBook Tab Registration
// This registers the cause list HTML template into the global tabs object
// ==============================================================================
window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs["causelist"] = `
<div class="causelist-container tab-card-wrapper" id="causelistContainer">
  <!-- Top Banner / Navigation Card -->
  <div class="causelist-banner-card">
    <div class="causelist-banner-left">
      <div class="causelist-banner-icon-badge" aria-hidden="true"><i class="fa-solid fa-file-contract"></i></div>
      <div class="causelist-banner-titles">
        <h3 class="causelist-main-title">Daily Cause List &amp; Appearance Board</h3>
      </div>
    </div>

    <!-- WhatsApp Action Button (Right Side) -->
    <div class="causelist-banner-actions">
      <button
        type="button"
        id="causeListWhatsAppActionBtn"
        class="whatsapp-send-btn causelist-btn"
        onclick="sendDailyCauseListWhatsApp()"
        title="Share today's cause list summary on WhatsApp"
      >
        <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
        <span>WhatsApp Daily Schedule</span>
      </button>
    </div>
  </div>

  <!-- Controls Toolbar Card: [date picker] [courts] [quick dates] -->
  <div class="causelist-toolbar-card">
    <div class="causelist-toolbar-left">
      <!-- Date Selector Input -->
      <div class="causelist-date-selector">
        <label for="causeListDateInput" class="causelist-toolbar-label">
          Select Appearance Date:
        </label>
        <input
          type="date"
          id="causeListDateInput"
          class="causelist-date-input"
          onchange="renderCauseListTable(this.value, document.getElementById('causeListCourtFilterSelect')?.value)"
        />
      </div>

      <!-- Court Filter Combobox -->
      <div class="causelist-court-filter-wrap">
        <label for="causeListCourtFilterTrigger" class="causelist-toolbar-label">
          Filter by Court:
        </label>
        <div class="causelist-court-combobox" id="causeListCourtFilterWrapper">
          <button
            type="button"
            class="causelist-select-trigger"
            id="causeListCourtFilterTrigger"
            aria-haspopup="listbox"
            aria-expanded="false"
            onclick="toggleCauseListCourtDropdown()"
          >
            <span id="causeListCourtFilterLabel">🏛️ All Courts</span>
            <i class="fa-solid fa-chevron-down causelist-select-arrow" aria-hidden="true"></i>
          </button>
          <!-- Hidden native select retained for compatibility -->
          <select id="causeListCourtFilterSelect" class="form-select causelist-select" style="display: none;" aria-hidden="true">
            <option value="">🏛️ All Courts</option>
          </select>
          <div id="causeListCourtDropdown" class="causelist-combobox-results hidden">
            <div class="causelist-dropdown-search-wrapper">
              <span class="causelist-combobox-search-icon"><i class="fa-solid fa-magnifying-glass"></i></span>
              <input
                type="text"
                id="causeListCourtSearchInput"
                class="causelist-dropdown-search-input"
                placeholder="Search courts..."
                autocomplete="off"
                oninput="filterCauseListCourtDropdown(this.value)"
                onkeydown="handleCauseListCourtDropdownKeydown(event)"
              />
            </div>
            <ul id="causeListCourtOptionsList" class="causelist-court-options-list" role="listbox" aria-label="Courts"></ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Date Presets -->
    <div class="causelist-presets-wrap">
      <label class="causelist-toolbar-label">Quick Date:</label>
      <div class="causelist-preset-grid">
        <button
          type="button"
          class="preset-icon-btn active"
          id="causeListPreset0"
          onclick="setCauseListDateOffset(0)"
          title="Today"
        >
          <i class="fa-solid fa-calendar-day" aria-hidden="true"></i>
          <span>Today</span>
        </button>

        <button
          type="button"
          class="preset-icon-btn"
          id="causeListPreset1"
          onclick="setCauseListDateOffset(1)"
          title="Tomorrow"
        >
          <i class="fa-solid fa-bolt" aria-hidden="true"></i>
          <span>Tomorrow</span>
        </button>

        <button
          type="button"
          class="preset-icon-btn"
          id="causeListPreset2"
          onclick="setCauseListDateOffset(2)"
          title="In 2 Days"
        >
          <i class="fa-solid fa-calendar-days" aria-hidden="true"></i>
          <span>+2 Days</span>
        </button>

        <button
          type="button"
          class="preset-icon-btn"
          id="causeListPreset7"
          onclick="setCauseListDateOffset(7)"
          title="Next Week"
        >
          <i class="fa-solid fa-calendar-check" aria-hidden="true"></i>
          <span>Next Week</span>
        </button>
      </div>
    </div>
  </div>

  <!-- Matters Display Container (Table Style Expandable Cards) -->
  <div id="causeListCardsContainer" class="causelist-cards space-y-3 mt-4">
    <!-- Rendered dynamically by renderCauseListTable -->
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
  if (typeof window !== "undefined" && window.innerWidth > 768) {
    requestAnimationFrame(() => searchInput?.focus({ preventScroll: true }));
  }
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

  // Synchronize active preset highlighting (+0, +1, +2, +7 days)
  try {
    const todayObj = new Date();
    todayObj.setHours(0, 0, 0, 0);
    const selDateObj = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    selDateObj.setHours(0, 0, 0, 0);
    const diffDays = Math.round((selDateObj - todayObj) / (1000 * 60 * 60 * 24));
    [0, 1, 2, 7].forEach((offset) => {
      const btn = document.getElementById(`causeListPreset${offset}`);
      if (btn) {
        btn.classList.toggle("active", diffDays === offset);
      }
    });
  } catch (err) {
    // Graceful no-op for preset button class toggle
  }

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

  // Build HTML for each case card (Refined Table-Card Accordion Style)
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
    const clientName = c.clientName || c.criminalClientName || "";
    const clientPhone = (c.clientNumber || c.criminalClientNumber || "").trim();
    const cleanPhone = clientPhone.replace(/[^0-9]/g, "");

    // Category Badge Styling
    let badgeLabel = "Civil";
    let badgeClass = "bg-teal-500/10 text-teal-400 border-teal-500/20";
    if (caseType === "criminal") {
      badgeLabel = "Criminal / State";
      badgeClass = "bg-rose-500/10 text-rose-400 border-rose-500/20";
    } else if (caseType === "revenue") {
      badgeLabel = "Revenue";
      badgeClass = "bg-amber-500/10 text-amber-400 border-amber-500/20";
    }

    html += `
      <details class="group causelist-item-details bg-[#111827] rounded-xl border border-slate-700/60 overflow-hidden transition-all duration-200 open:border-slate-600 open:border-l-4 open:border-l-teal-500 shadow-md hover:border-slate-600">
        <!-- Summary Row (Acts as Compact Table Row) -->
        <summary class="flex items-center justify-between p-3.5 md:p-4 cursor-pointer hover:bg-slate-800/40 transition-colors select-none">
          <div class="flex items-center gap-3 md:gap-5 w-full min-w-0">
            <!-- Case Number Badge (Hidden on mobile screens) -->
            <div class="causelist-item-badge hidden sm:flex flex-col items-center justify-center bg-[#1E293B] border border-slate-700 rounded-lg px-3 py-1.5 min-w-[84px] shrink-0">
              <span class="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Item #${idx + 1}</span>
              <span class="text-xs md:text-sm font-bold text-slate-100 font-mono">${escapeHtml(caseNumber)}</span>
            </div>

            <!-- Title & Tags -->
            <div class="flex flex-col min-w-0 flex-1">
              <h2 class="text-slate-100 text-sm md:text-base font-semibold group-open:text-teal-400 transition-colors truncate">${escapeHtml(caseName)}</h2>
              <div class="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-1">
                <span class="sm:hidden font-mono text-[10px] text-teal-400 font-semibold bg-teal-500/10 px-1.5 py-0.5 rounded border border-teal-500/20">${escapeHtml(caseNumber)}</span>
                <span class="${badgeClass} px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border">${escapeHtml(badgeLabel)}</span>
                <span class="hidden sm:inline text-slate-600">|</span>
                <span class="text-slate-300 text-xs truncate max-w-[200px] sm:max-w-none"><i class="fa-solid fa-clock-rotate-left mr-1 opacity-70"></i>${escapeHtml(stage)}</span>
              </div>
            </div>
          </div>

          <!-- Chevron Indicator -->
          <div class="p-2 bg-[#1E293B] rounded-lg border border-slate-700 group-open:bg-teal-500/10 group-open:border-teal-500/30 transition-colors shrink-0 ml-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 md:h-5 md:w-5 text-slate-400 group-open:text-teal-400 group-open:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </summary>

        <!-- Expanded Content (Reveals Full Details & Actions) -->
        <div class="details-content px-4 md:px-5 pb-4 pt-2 border-t border-slate-700/50 flex flex-col lg:flex-row gap-5 lg:gap-8 bg-[#0B1120]/40">
          <!-- Left: Court & Schedule Info -->
          <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <!-- Court Name -->
            <div class="flex items-start gap-2.5">
              <div class="mt-0.5 text-teal-400/80 shrink-0">
                <i class="fa-solid fa-landmark text-sm"></i>
              </div>
              <div class="min-w-0">
                <p class="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Court</p>
                <p class="text-xs md:text-sm text-slate-200 font-medium mt-0.5 break-words">${escapeHtml(courtName)}</p>
              </div>
            </div>

            <!-- Stage / Purpose -->
            <div class="flex items-start gap-2.5">
              <div class="mt-0.5 text-teal-400/80 shrink-0">
                <i class="fa-solid fa-gavel text-sm"></i>
              </div>
              <div class="min-w-0">
                <p class="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Hearing Stage</p>
                <p class="text-xs md:text-sm text-slate-200 font-medium mt-0.5">${escapeHtml(stage)}</p>
              </div>
            </div>
          </div>

          <!-- Right: Client & Actions Toolbar -->
          <div class="flex flex-col sm:flex-row lg:items-center justify-between gap-3 pt-3 lg:pt-0 lg:pl-6 lg:border-l border-slate-700/60">
            <!-- Client Info -->
            <div class="flex items-center gap-3">
              <div class="h-9 w-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-700 shrink-0">
                <i class="fa-solid fa-user text-xs"></i>
              </div>
              <div class="flex flex-col min-w-0">
                <span class="text-xs md:text-sm text-slate-100 font-semibold truncate">${escapeHtml(clientName || "Chambers Record")}</span>
                ${
                  cleanPhone
                    ? `<a href="tel:${escapeHtml(cleanPhone)}" class="text-teal-400 text-xs font-mono hover:text-teal-300 transition-colors flex items-center gap-1 mt-0.5">
                        <i class="fa-solid fa-phone text-[10px]"></i>
                        ${escapeHtml(clientPhone)}
                      </a>`
                    : `<span class="text-[11px] text-slate-500 italic">No phone logged</span>`
                }
              </div>
            </div>

            <!-- Action Toolbar -->
            <div class="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
              <!-- WhatsApp Client Notice -->
              ${
                cleanPhone
                  ? `<button type="button" onclick="sendWhatsAppHearingNotice('${escapeHtml(caseNumber)}')" class="h-9 w-9 flex items-center justify-center bg-[#128C7E]/15 hover:bg-[#128C7E]/30 text-[#25D366] rounded-lg border border-[#128C7E]/30 transition-colors shrink-0" title="Send WhatsApp Notice">
                      <i class="fa-brands fa-whatsapp text-sm"></i>
                    </button>`
                  : ""
              }

              <!-- Forward Hearing (Ghost Button) -->
              <button type="button" onclick="openUpdateHearingForCase('${escapeHtml(caseNumber)}')" class="h-9 px-3 flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-transparent hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-lg text-xs md:text-sm font-medium transition-colors" title="Forward next hearing date">
                <i class="fa-solid fa-calendar-plus text-xs"></i>
                <span>Forward</span>
              </button>

              <!-- View / Details (Teal Button) -->
              <button type="button" onclick="if (typeof openCaseDetailsFullModal === 'function') openCaseDetailsFullModal('${escapeHtml(caseNumber)}'); else if (typeof openCaseHistoryModalByNo === 'function') openCaseHistoryModalByNo('${escapeHtml(caseNumber)}');" class="h-9 px-3.5 flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-teal-500 hover:bg-teal-400 text-slate-900 font-semibold rounded-lg text-xs md:text-sm transition-colors shadow-[0_0_10px_rgba(20,184,166,0.2)]" title="Open full case dossier">
                <span>Details</span>
              </button>
            </div>
          </div>
        </div>
      </details>
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
  let listedCases = allRecords.filter((c) => !isDisp(c) && c.nextHearing === dateVal);

  if (currentCauseListCourt) {
    listedCases = listedCases.filter((c) => {
      const ct = (c.courtName || c.criminalCourtName || "").trim().toLowerCase();
      return ct === currentCauseListCourt;
    });
  }

  const safeFormatDate = (d) => typeof formatDateDMY === "function" ? formatDateDMY(d) : d;

  if (listedCases.length === 0) {
    const courtNote = currentCauseListCourt ? ` in ${currentCauseListCourt}` : "";
    alert(`No court hearings are scheduled for ${safeFormatDate(dateVal)}${courtNote}.`);
    return;
  }

  let msg = `*⚖️ CHAMBERS OF ATUL KUMAR MISHRA*\n`;
  msg += `*DAILY COURT APPEARANCE BOARD / CAUSE LIST*\n`;
  msg += `📅 *Date:* ${safeFormatDate(dateVal)}\n`;
  if (currentCauseListCourt) {
    msg += `🏛️ *Court:* ${listedCases[0]?.courtName || listedCases[0]?.criminalCourtName || currentCauseListCourt.toUpperCase()}\n`;
  }
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
