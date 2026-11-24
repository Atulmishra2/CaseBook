// ==============================================================================
// CaseBook Tab Registration: Daily Cause List & Appearance Board
// ==============================================================================
window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs["causelist"] = `
<div class="board causelist-board-shell" id="causelistContainer" data-causelist-scope>
  <!-- HEADER -->
  <header class="board-head">
    <div class="head-left">
      <h1 class="h1">
        <span class="crest" aria-hidden="true"><svg class="lucide lucide-scale" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg></span>
        <span class="h1-text">Daily Cause List</span>
      </h1>
      <div class="sub" id="causeListSubline">
        <b>Today</b> · <span id="causeListTotalBadge" class="causelist-stat-pill upcoming-stat-pill">0 listings</span>
      </div>
    </div>
    <div class="head-actions">
      <button
        type="button"
        id="causeListWhatsAppActionBtn"
        class="wa-btn"
        onclick="sendDailyCauseListWhatsApp()"
        title="Share today's cause list summary on WhatsApp"
        aria-label="Share today's cause list summary on WhatsApp"
      >
        <svg class="lucide lucide-message-circle" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
        <span>WhatsApp Daily Schedule</span>
      </button>
    </div>
  </header>

  <!-- TOOLBAR -->
  <div class="toolbar">
    <label class="ctl ctl-date" for="causeListDateInput" title="Select Appearance Date">
      <svg class="lucide lucide-calendar" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
      <span class="ctl-date-display" id="causeListDateDisplay"></span>
      <input
        type="date"
        id="causeListDateInput"
        aria-label="Select Appearance Date"
        onchange="typeof updateCauseListDateDisplay === 'function' && updateCauseListDateDisplay(this.value); typeof renderCauseListTable === 'function' ? renderCauseListTable(this.value, document.getElementById('causeListCourtFilterSelect')?.value) : (window.renderCauseListTable && window.renderCauseListTable(this.value, document.getElementById('causeListCourtFilterSelect')?.value))"
      />
    </label>

    <!-- Searchable / Command Dropdown for Court Filter -->
    <div class="custom-dropdown causelist-court-custom-dropdown relative w-full max-w-sm" id="causeListCourtDropdown">
      <select
        id="causeListCourtFilterSelect"
        class="sr-only"
        tabindex="-1"
        aria-hidden="true"
        onchange="typeof renderCauseListTable === 'function' ? renderCauseListTable(document.getElementById('causeListDateInput')?.value, this.value) : (window.renderCauseListTable && window.renderCauseListTable(document.getElementById('causeListDateInput')?.value, this.value))"
      >
        <option value="">All Courts</option>
      </select>
      <!-- Trigger Button (Text aligned left, Icon aligned right) -->
      <button
        type="button"
        class="custom-dropdown-trigger dropdown-trigger"
        id="causeListCourtDropdownTrigger"
        aria-haspopup="listbox"
        aria-expanded="false"
        title="Filter by Court Forum"
      >
        <svg class="lucide lucide-landmark" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>
        <span class="custom-dropdown-label dropdown-label" id="causeListCourtDropdownLabel">All Courts</span>
        <svg id="dropdown-chevron" class="lucide lucide-chevron-down custom-dropdown-chevron dropdown-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <!-- Dropdown Menu (Searchable Command Popover) -->
      <div class="custom-dropdown-menu dropdown-menu opacity-0 invisible scale-95" id="causeListCourtDropdownMenu">
        <!-- Search Input Area -->
        <div class="custom-dropdown-search-wrap">
          <div class="custom-dropdown-search-inner">
            <svg class="lucide lucide-search custom-dropdown-search-icon" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input type="text" id="causeListCourtDropdownSearch" class="custom-dropdown-search-input" placeholder="Search courts..." autocomplete="off">
          </div>
        </div>
        <!-- Options List -->
        <ul class="custom-dropdown-list options-list custom-scrollbar" id="causeListCourtDropdownList" role="listbox"></ul>
        <!-- Empty State (Hidden by default) -->
        <div id="causeListCourtEmptyState" class="custom-dropdown-empty empty-state hidden">No courts found.</div>
      </div>
    </div>

    <div class="chips" role="group" aria-label="Quick Date Presets">
      <button type="button" class="chip active" id="causeListChip0" onclick="setCauseListDateOffset(0)">Today</button>
      <button type="button" class="chip" id="causeListChip1" onclick="setCauseListDateOffset(1)">Tomorrow</button>
      <button type="button" class="chip" id="causeListChip2" onclick="setCauseListDateOffset(2)">+2 Days</button>
      <button type="button" class="chip" id="causeListChip7" onclick="setCauseListDateOffset(7)">Next Week</button>
    </div>
  </div>

  <!-- COLUMN HEADERS -->
  <div class="causelist-table-head" id="causeListTableHead" aria-hidden="true">
    <span class="col-title">Cause Title (Parties)</span>
    <span class="col-court">Court / Forum</span>
    <span class="col-no">Case Number</span>
    <span class="col-cat">Category</span>
    <span class="col-act sr-only">Expand</span>
  </div>

  <!-- MATTERS LIST -->
  <div class="list" id="causeListCardsContainer" role="region" aria-label="Daily Matters Schedule">
    <!-- Case cards rendered dynamically by renderCauseListTable() -->
  </div>

  <!-- FOOTER -->
  <footer class="foot">
    <span class="live">
      <i aria-hidden="true"></i>
      <span id="causeListFooterCount">Showing 0 of 0 cases</span>
    </span>
    <span class="foot-sync">Updated live <span class="sep">·</span> Sync OK</span>
  </footer>
</div>
`;

// ==============================================================================
// My Daily Cause List & Court Appearance Board Engine
// ==============================================================================
var currentCauseListDate = "";
var currentCauseListCourt = "";

/**
 * Formats a Date object to YYYY-MM-DD
 */
function toIsoDate(d) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Returns formatted long date text (e.g. "Thu, 05 Nov 2026")
 */
function formatNiceDate(dateStr) {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const dt = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  return dt.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/**
 * Synchronizes visible date text inside the Cause List date picker control to DD/MM/YYYY.
 */
function updateCauseListDateDisplay(dateVal) {
  const displayEl = document.getElementById("causeListDateDisplay");
  if (!displayEl) return;
  const val = dateVal || currentCauseListDate || toIsoDate(new Date());
  displayEl.textContent = typeof formatDateDMY === "function" ? formatDateDMY(val) : val;
}

if (typeof window !== "undefined") window.updateCauseListDateDisplay = updateCauseListDateDisplay;
if (typeof global !== "undefined") global.updateCauseListDateDisplay = updateCauseListDateDisplay;
if (typeof globalThis !== "undefined") globalThis.updateCauseListDateDisplay = updateCauseListDateDisplay;

if (typeof window !== "undefined") window.renderCauseListTable = renderCauseListTable;
if (typeof global !== "undefined") global.renderCauseListTable = renderCauseListTable;
if (typeof globalThis !== "undefined") globalThis.renderCauseListTable = renderCauseListTable;

/**
 * Initializes the Cause List tab.
 */
function initCauseListTab() {
  const dateInput = document.getElementById("causeListDateInput");
  const courtSelect = document.getElementById("causeListCourtFilterSelect");

  if (!currentCauseListDate) {
    currentCauseListDate = toIsoDate(new Date());
  }
  if (dateInput) {
    dateInput.value = currentCauseListDate;
  }
  updateCauseListDateDisplay(currentCauseListDate);

  // Populate court filter dropdown (excluding deleted courts)
  if (courtSelect) {
    const prevVal = courtSelect.value || currentCauseListCourt || "";
    const deletedCourts =
      typeof getDeletedCourtsSet === "function"
        ? getDeletedCourtsSet()
        : typeof window !== "undefined" && typeof window.getDeletedCourtsSet === "function"
          ? window.getDeletedCourtsSet()
          : new Set();
    const seenCourts = new Set();
    courtSelect.innerHTML = '<option value="">All Courts</option>';

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
    initCauseListCourtDropdown();
  }

  renderCauseListTable(currentCauseListDate, courtSelect ? courtSelect.value : currentCauseListCourt);
}

if (typeof initCauseListTab !== "undefined") window.initCauseListTab = initCauseListTab;

function cleanCourtLabel(text) {
  return (text || "").replace(/^[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]\s*/u, "").replace(/^🏛️\s*/, "").trim() || "All Courts";
}

/**
 * Synchronizes the custom court dropdown UI with underlying select
 */
function syncCauseListCourtDropdown() {
  const container = document.getElementById("causeListCourtDropdown");
  const select = document.getElementById("causeListCourtFilterSelect");
  if (!container || !select) return;
  const labelEl = container.querySelector(".custom-dropdown-label");
  const curOpt = select.options[select.selectedIndex];
  if (labelEl && curOpt) {
    labelEl.textContent = cleanCourtLabel(curOpt.textContent);
  }
  const listEl = container.querySelector(".custom-dropdown-list");
  if (listEl) {
    listEl.querySelectorAll(".custom-dropdown-item").forEach((item) => {
      const isSelected = item.getAttribute("data-value") === select.value;
      item.classList.toggle("selected", isSelected);
      item.setAttribute("aria-selected", isSelected ? "true" : "false");
      const existingSvg = item.querySelector("svg.checkmark, svg.custom-dropdown-check");
      if (isSelected && !existingSvg) {
        item.insertAdjacentHTML("beforeend", '<svg class="lucide lucide-check w-4 h-4 checkmark custom-dropdown-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>');
      } else if (!isSelected && existingSvg) {
        existingSvg.remove();
      }
    });
  }
}
if (typeof syncCauseListCourtDropdown !== "undefined") window.syncCauseListCourtDropdown = syncCauseListCourtDropdown;

/**
 * Initializes custom dropdown for Cause List Court filter
 */
function initCauseListCourtDropdown() {
  const container = document.getElementById("causeListCourtDropdown");
  const select = document.getElementById("causeListCourtFilterSelect");
  if (!container || !select) return;

  const trigger = container.querySelector(".custom-dropdown-trigger");
  const menu = container.querySelector(".custom-dropdown-menu");
  const chevron = container.querySelector(".custom-dropdown-chevron");
  const labelEl = container.querySelector(".custom-dropdown-label");
  const listEl = container.querySelector(".custom-dropdown-list");
  const emptyState = container.querySelector(".custom-dropdown-empty");
  const searchInput = container.querySelector(".custom-dropdown-search-input");
  if (!trigger || !menu || !listEl) return;

  function filterOptions(searchTerm = "") {
    const term = searchTerm.toLowerCase().trim();
    let visibleCount = 0;
    listEl.querySelectorAll(".custom-dropdown-item").forEach((item) => {
      const text = (item.textContent || "").toLowerCase();
      const val = (item.getAttribute("data-value") || "").toLowerCase();
      const match = !term || text.includes(term) || val.includes(term);
      item.style.display = match ? "" : "none";
      if (match) visibleCount++;
    });
    if (emptyState) {
      emptyState.classList.toggle("hidden", visibleCount > 0);
    }
  }

  if (searchInput && !searchInput._hasBoundListener) {
    searchInput._hasBoundListener = true;
    searchInput.addEventListener("input", (e) => {
      filterOptions(e.target.value);
    });
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const firstVisible = listEl.querySelector(".custom-dropdown-item:not([style*='display: none'])");
        if (firstVisible) firstVisible.click();
      }
    });
  }

  function openDropdown() {
    document.querySelectorAll(".custom-dropdown-menu.open, .custom-dropdown-menu.opacity-100").forEach((m) => {
      if (m !== menu) {
        m.classList.remove("open", "opacity-100", "visible", "scale-100");
        m.classList.add("opacity-0", "invisible", "scale-95");
        const parent = m.closest(".custom-dropdown");
        const c = parent?.querySelector(".custom-dropdown-chevron");
        if (c) c.classList.remove("rotate-180");
        const t = parent?.querySelector(".custom-dropdown-trigger");
        if (t) t.setAttribute("aria-expanded", "false");
      }
    });

    menu.classList.remove("opacity-0", "invisible", "scale-95");
    menu.classList.add("open", "opacity-100", "visible", "scale-100");
    if (chevron) chevron.classList.add("rotate-180");
    if (trigger) trigger.setAttribute("aria-expanded", "true");

    if (searchInput) {
      searchInput.value = "";
      filterOptions("");
      setTimeout(() => searchInput.focus(), 80);
    }
  }

  function closeDropdown() {
    menu.classList.remove("open", "opacity-100", "visible", "scale-100");
    menu.classList.add("opacity-0", "invisible", "scale-95");
    if (chevron) chevron.classList.remove("rotate-180");
    if (trigger) trigger.setAttribute("aria-expanded", "false");
  }

  function toggleDropdown() {
    if (menu.classList.contains("open") || menu.classList.contains("opacity-100")) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }

  function renderOptions() {
    if (!listEl) return;
    listEl.innerHTML = "";
    const options = Array.from(select.options);
    const selectedVal = select.value;

    if (options.length === 0) {
      if (emptyState) emptyState.classList.remove("hidden");
      return;
    }
    if (emptyState) emptyState.classList.add("hidden");

    options.forEach((opt) => {
      const li = document.createElement("li");
      const isSelected = opt.value === selectedVal;
      li.className = `custom-dropdown-item ${isSelected ? "selected" : ""}`;
      li.setAttribute("role", "option");
      li.setAttribute("aria-selected", isSelected ? "true" : "false");
      li.setAttribute("data-value", opt.value);

      const rawText = opt.textContent || opt.value;
      const cleanText = cleanCourtLabel(rawText);
      const safeText = typeof escapeHtml === "function" ? escapeHtml(cleanText) : cleanText;

      li.innerHTML = `
        <span class="truncate">${safeText}</span>
        ${isSelected ? '<svg class="lucide lucide-check w-4 h-4 checkmark custom-dropdown-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>' : ""}
      `;

      li.addEventListener("click", (e) => {
        e.stopPropagation();
        select.value = opt.value;
        if (labelEl) labelEl.textContent = cleanCourtLabel(opt.textContent);
        closeDropdown();
        renderOptions();

        const changeEvent = new Event("change", { bubbles: true });
        select.dispatchEvent(changeEvent);

        const dateInput = document.getElementById("causeListDateInput");
        if (typeof renderCauseListTable === "function") {
          renderCauseListTable(dateInput ? dateInput.value : currentCauseListDate, opt.value);
        } else if (typeof window !== "undefined" && typeof window.renderCauseListTable === "function") {
          window.renderCauseListTable(dateInput ? dateInput.value : currentCauseListDate, opt.value);
        }
      });

      listEl.appendChild(li);
    });

    const curOpt = select.options[select.selectedIndex];
    if (labelEl && curOpt) {
      labelEl.textContent = cleanCourtLabel(curOpt.textContent);
    }

    if (searchInput && searchInput.value) {
      filterOptions(searchInput.value);
    }
  }

  container._syncFromSelect = function () {
    if (select.value) {
      const idx = Array.from(select.options).findIndex((o) => o.value === select.value);
      if (idx !== -1) {
        select.selectedIndex = idx;
      }
    }
    const curOpt = select.options[select.selectedIndex];
    if (labelEl && curOpt) {
      labelEl.textContent = cleanCourtLabel(curOpt.textContent);
    }
    renderOptions();
  };

  trigger.onclick = (e) => {
    e.stopPropagation();
    toggleDropdown();
  };

  renderOptions();

  if (typeof document !== "undefined" && !window._customDropdownGlobalListenerAdded) {
    window._customDropdownGlobalListenerAdded = true;
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".custom-dropdown")) {
        document.querySelectorAll(".custom-dropdown-menu.open, .custom-dropdown-menu.opacity-100").forEach((m) => {
          m.classList.remove("open", "opacity-100", "visible", "scale-100");
          m.classList.add("opacity-0", "invisible", "scale-95");
          const parent = m.closest(".custom-dropdown");
          const c = parent?.querySelector(".custom-dropdown-chevron");
          if (c) c.classList.remove("rotate-180");
          const t = parent?.querySelector(".custom-dropdown-trigger");
          if (t) t.setAttribute("aria-expanded", "false");
        });
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".custom-dropdown-menu.open, .custom-dropdown-menu.opacity-100").forEach((m) => {
          m.classList.remove("open", "opacity-100", "visible", "scale-100");
          m.classList.add("opacity-0", "invisible", "scale-95");
          const parent = m.closest(".custom-dropdown");
          const c = parent?.querySelector(".custom-dropdown-chevron");
          if (c) c.classList.remove("rotate-180");
          const t = parent?.querySelector(".custom-dropdown-trigger");
          if (t) t.setAttribute("aria-expanded", "false");
        });
      }
    });
  }

  container._initialized = true;
}

if (typeof initCauseListCourtDropdown !== "undefined") window.initCauseListCourtDropdown = initCauseListCourtDropdown;

/**
 * Sets the cause list date to a specific offset from today (0 = Today, 1 = Tmrw, etc.)
 */
function setCauseListDateOffset(daysOffset) {
  const target = new Date();
  target.setDate(target.getDate() + Number(daysOffset));
  currentCauseListDate = toIsoDate(target);
  if (typeof window !== "undefined") window.currentCauseListDate = currentCauseListDate;

  const dateInput = document.getElementById("causeListDateInput");
  if (dateInput) {
    dateInput.value = currentCauseListDate;
  }
  updateCauseListDateDisplay(currentCauseListDate);

  // Update active chip state
  [0, 1, 2, 7].forEach((offset) => {
    const btn = document.getElementById(`causeListChip${offset}`);
    if (btn) btn.classList.toggle("active", offset === daysOffset);
  });

  const courtSelect = document.getElementById("causeListCourtFilterSelect");
  renderCauseListTable(currentCauseListDate, courtSelect ? courtSelect.value : "");
  if (typeof syncCauseListCourtDropdown === "function") syncCauseListCourtDropdown();
}

if (typeof setCauseListDateOffset !== "undefined") window.setCauseListDateOffset = setCauseListDateOffset;

/**
 * Determines advocate's representation side for lower court matters.
 */
function getAdvocateRepresentation(c) {
  if (!c) return { label: "For Plaintiff", pillClass: "pl" };
  if (c.representation) {
    const isDef = /defendant|accused|respondent/i.test(c.representation);
    return { label: c.representation, pillClass: isDef ? "df" : "pl" };
  }

  const cType = (c.caseType || c.case_type || "civil").toLowerCase();
  const client = (c.clientName || c.criminalClientName || c.client_name || "").toLowerCase().trim();
  const first = (c.plaintiff || c.firstParty || c.first_party || c.petitioner || c.applicant || "").toLowerCase().trim();
  const second = (c.defendant || c.accusedName || c.second_party || c.respondent || c.oppositeParty || "").toLowerCase().trim();

  if (client) {
    if (first && (client.includes(first) || first.includes(client))) {
      const lbl = cType === "family" || cType === "revenue" ? "For Petitioner" : "For Plaintiff (वादी)";
      return { label: lbl, pillClass: "pl" };
    }
    if (second && (client.includes(second) || second.includes(client))) {
      const lbl = cType === "state" || cType === "criminal" ? "For Accused (बचाव पक्ष)" : "For Defendant (प्रतिवादी)";
      return { label: lbl, pillClass: "df" };
    }
  }

  if (cType === "state" || cType === "criminal") {
    return { label: "For Accused (बचाव पक्ष)", pillClass: "df" };
  }

  if (c.partyName) {
    const p = String(c.partyName).toLowerCase().trim();
    if (first && (p.includes(first) || first.includes(p))) return { label: "For Plaintiff (वादी)", pillClass: "pl" };
    if (second && (p.includes(second) || second.includes(p))) return { label: "For Defendant (प्रतिवादी)", pillClass: "df" };
  }

  return { label: "For Plaintiff (वादी)", pillClass: "pl" };
}
if (typeof window !== "undefined") window.getAdvocateRepresentation = getAdvocateRepresentation;

/**
 * Computes priority pill for courtroom stages.
 */
function getStagePriority(stage) {
  const s = String(stage || "").toLowerCase();
  if (
    s.includes("argument") ||
    s.includes("cross") ||
    s.includes("evidence") ||
    s.includes("stay") ||
    s.includes("bail") ||
    s.includes("charge") ||
    s.includes("injunction") ||
    s.includes("hearing") ||
    s.includes("final")
  ) {
    return { label: "High Priority", classKey: "high" };
  }
  if (
    s.includes("ws") ||
    s.includes("written") ||
    s.includes("issue") ||
    s.includes("rejoinder") ||
    s.includes("pleading") ||
    s.includes("reply") ||
    s.includes("objection") ||
    s.includes("admission") ||
    s.includes("counselling")
  ) {
    return { label: "Medium", classKey: "med" };
  }
  return { label: "Low", classKey: "low" };
}

/**
 * Copies a pre-formatted Pass-Over / Haziri Request Slip to clipboard.
 */

/**
 * Resolves previous hearing date and stage for display.
 */
function getCasePreviousHearingDisplay(c) {
  if (!c) return "—";
  let prevDate = c.previousHearing || c.prevHearing || c.prevDate || c.previousDate || "";
  let prevProc = c.previousProcess || c.prevProcess || "";

  if (!prevDate && Array.isArray(c.hearingHistory) && c.hearingHistory.length > 0) {
    const sorted = [...c.hearingHistory].sort((a, b) =>
      String(b.hearing_date || "").localeCompare(String(a.hearing_date || ""))
    );
    const past = sorted.find((h) => h.hearing_date && h.hearing_date < (c.nextHearing || "9999"));
    if (past) {
      prevDate = past.hearing_date;
      prevProc = past.process || past.hearingProcess || "";
    }
  }

  if (!prevDate || prevDate === "—" || prevDate === "null") return "— (First Listing)";

  const formatted = typeof formatDateDMY === "function" ? formatDateDMY(prevDate) : formatNiceDate(prevDate);
  if (prevProc && prevProc !== "—") {
    return `${formatted} (${prevProc})`;
  }
  return formatted;
}

if (typeof getCasePreviousHearingDisplay !== "undefined")
  window.getCasePreviousHearingDisplay = getCasePreviousHearingDisplay;

/**
 * Resolves filing date or criminal police station & crime info.
 */
function getCaseFilingOrForumInfo(c) {
  if (!c) return { label: "Filing Date", value: "—", icon: "fa-regular fa-calendar-days", iconSvg: '<svg class="lucide lucide-calendar" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M8 2v4"/><path d="M16 2v4"/><path d="M3 10h18"/></svg>' };
  const cType = (c.caseType || c.case_type || "civil").toLowerCase();

  if (cType === "criminal" || cType === "state") {
    const ps = (c.policeStation || c.police_station || c.statePoliceStation || "").trim();
    const crime = (c.crimeNumber || c.crimeNo || c.stateCrimeNumber || c.firNo || "").trim();
    const sec = (c.crimeSection || c.underSection || c.section || "").trim();

    const parts = [];
    if (ps && ps.toLowerCase() !== "police station") parts.push(ps);
    if (crime) parts.push(crime.startsWith("FIR") || crime.startsWith("Crime") ? crime : `FIR #${crime}`);
    if (sec && sec.toLowerCase() !== "ipc") parts.push(`u/s ${sec}`);

    return {
      label: "Police Station / FIR",
      value: parts.length > 0 ? parts.join(" · ") : "—",
      icon: "fa-solid fa-shield-halved",
      iconSvg: '<svg class="lucide lucide-shield" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>',
    };
  }

  const filing = c.filingDate || c.caseFilingDate || c.crime_filing_date || "";
  const year = c.caseYear || c.crime_year || c.year || "";
  let val = "—";
  if (filing) {
    val = typeof formatDateDMY === "function" ? formatDateDMY(filing) : formatNiceDate(filing);
  } else if (year) {
    val = `Year ${year}`;
  }
  return {
    label: "Filing Date",
    value: val,
    icon: "fa-regular fa-calendar-days",
    iconSvg: '<svg class="lucide lucide-calendar" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M8 2v4"/><path d="M16 2v4"/><path d="M3 10h18"/></svg>',
  };
}

if (typeof getCaseFilingOrForumInfo !== "undefined")
  window.getCaseFilingOrForumInfo = getCaseFilingOrForumInfo;

/**
 * Resolves structured criminal forum details (Police Station, FIR, u/s)
 * or civil institutional filing metadata for the docket drawer.
 */
function getCaseCriminalOrFilingDetails(c) {
  if (!c) {
    return {
      isCriminal: false,
      ps: "—",
      fir: "—",
      sec: "—",
      filingDate: "—",
      caseYear: ""
    };
  }
  const cType = (c.caseType || c.case_type || "civil").toLowerCase();
  const isCriminal = cType === "criminal" || cType === "state";

  const ps = (c.policeStation || c.police_station || c.statePoliceStation || "").trim();
  const rawCrime = (c.crimeNumber || c.crimeNo || c.stateCrimeNumber || c.firNo || c.firNumber || "").trim();
  const rawSec = (c.crimeSection || c.underSection || c.section || "").trim();

  let cleanFir = rawCrime;
  if (cleanFir.toLowerCase().startsWith("fir #")) cleanFir = cleanFir.slice(5).trim();
  else if (cleanFir.toLowerCase().startsWith("fir")) cleanFir = cleanFir.slice(3).trim();
  else if (cleanFir.toLowerCase().startsWith("crime #")) cleanFir = cleanFir.slice(7).trim();
  else if (cleanFir.toLowerCase().startsWith("crime")) cleanFir = cleanFir.slice(5).trim();

  let cleanSec = rawSec;
  if (cleanSec.toLowerCase().startsWith("u/s")) cleanSec = cleanSec.slice(3).trim();

  const filing = c.filingDate || c.caseFilingDate || c.crime_filing_date || "";
  const year = c.caseYear || c.crime_year || c.year || "";
  let filingVal = "—";
  if (filing) {
    filingVal = typeof formatDateDMY === "function" ? formatDateDMY(filing) : formatNiceDate(filing);
  } else if (year) {
    filingVal = `Year ${year}`;
  }

  return {
    isCriminal,
    ps: ps && ps.toLowerCase() !== "police station" ? ps : "—",
    fir: cleanFir || "—",
    sec: cleanSec && cleanSec.toLowerCase() !== "ipc" ? cleanSec : (rawSec || "—"),
    filingDate: filingVal,
    caseYear: year ? String(year) : ""
  };
}

if (typeof getCaseCriminalOrFilingDetails !== "undefined")
  window.getCaseCriminalOrFilingDetails = getCaseCriminalOrFilingDetails;

function copyPassOverNote(caseNo) {
  const allRecords =
    typeof allCaseRecords !== "undefined" && Array.isArray(allCaseRecords)
      ? allCaseRecords
      : typeof window !== "undefined" && Array.isArray(window.allCaseRecords)
        ? window.allCaseRecords
        : [];
  const c =
    allRecords.find(
      (item) =>
        item.caseNo === caseNo ||
        item.criminalCaseNumber === caseNo ||
        item.case_number === caseNo
    ) || {};

  const caseTitle =
    c.caseName ||
    c.case_name ||
    (c.plaintiff
      ? `${c.plaintiff} vs ${c.defendant || ""}`
      : c.victimName
        ? `${c.victimName} vs ${c.accusedName || ""}`
        : caseNo);
  const courtName = c.courtName || c.criminalCourtName || c.court_name || "District Court";
  const stage = c.hearingProcess || c.process || c.stage || "Scheduled Hearing";

  const slip = `*COURT PASS-OVER / HAZIRI REQUEST*\n🏛️ Court: ${courtName}\n⚖️ Case: ${caseTitle} (${caseNo})\n🎯 Stage: ${stage}\nCounsel: Atul Kumar Mishra, Advocate\nNote: Counsel is attending another listed matter. Kindly pass-over till 12:30 PM / next call.`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(slip)
      .then(() => {
        if (typeof showToast === "function") {
          showToast("📋 Pass-Over slip copy ho gayi!", "success");
        } else {
          alert("📋 Pass-Over slip copy ho gayi hai!\n\nAap ise WhatsApp par colleague ya junior ko paste kar sakte hain.");
        }
      })
      .catch(() => {
        prompt("Copy Pass-Over Slip:", slip);
      });
  } else {
    prompt("Copy Pass-Over Slip:", slip);
  }
}

if (typeof copyPassOverNote !== "undefined") window.copyPassOverNote = copyPassOverNote;

/**
 * Toggles a case accordion open/closed.
 */
function toggleCaseAccordion(btn) {
  if (!btn) return;
  const article = btn.closest(".case");
  if (!article) return;
  const isOpen = article.classList.toggle("open");
  btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
}

if (typeof toggleCaseAccordion !== "undefined") window.toggleCaseAccordion = toggleCaseAccordion;

/**
 * Renders the Cause List / Appearance Board table for a given date and court filter.
 */
function renderCauseListTable(dateVal = currentCauseListDate, courtFilter = "") {
  if (!dateVal) {
    dateVal = toIsoDate(new Date());
  }
  currentCauseListDate = dateVal;
  if (typeof window !== "undefined") window.currentCauseListDate = dateVal;
  updateCauseListDateDisplay(dateVal);
  const dateInputEl = document.getElementById("causeListDateInput");
  if (dateInputEl && dateInputEl.value !== dateVal) {
    dateInputEl.value = dateVal;
  }
  currentCauseListCourt = (courtFilter || "").trim();
  if (typeof window !== "undefined") window.currentCauseListCourt = currentCauseListCourt;

  const container = document.getElementById("causeListCardsContainer");
  const subline = document.querySelector('[data-causelist-scope] #causeListSubline') || document.getElementById("causeListSubline");
  const footerCount = document.getElementById("causeListFooterCount");
  const navBadge = document.getElementById("causeListNavCount");

  const niceDate = formatNiceDate(dateVal);

  const allRecords =
    typeof allCaseRecords !== "undefined" && Array.isArray(allCaseRecords)
      ? allCaseRecords
      : typeof window !== "undefined" && Array.isArray(window.allCaseRecords)
        ? window.allCaseRecords
        : [];

  const isDisp =
    typeof isCaseDisposed === "function"
      ? isCaseDisposed
      : (c) => ((c && (c.caseStatus || c.status || c.case_status)) || "").toLowerCase().includes("dispose");

  // All active cases for selected date
  const allDateCases = allRecords.filter((c) => !isDisp(c) && c.nextHearing === dateVal);

  // Filter by court if selected
  let listedCases = allDateCases;
  const activeCourt = currentCauseListCourt;
  if (activeCourt && activeCourt.toLowerCase() !== "all") {
    const filterLower = activeCourt.toLowerCase();
    listedCases = listedCases.filter((c) => {
      const ct = (c.courtName || c.criminalCourtName || c.court_name || "").trim().toLowerCase();
      return ct === filterLower || ct.includes(filterLower);
    });
  }

  // Update header subline and footer count
  if (subline) {
    subline.innerHTML = `<b>${escapeHtml(niceDate)}</b> · <span id="causeListTotalBadge" class="causelist-stat-pill upcoming-stat-pill">${listedCases.length} listings</span>`;
  }
  if (footerCount) {
    footerCount.textContent = `Showing ${listedCases.length} of ${allDateCases.length} cases`;
  }

  // Synchronize active preset highlighting (Today, Tomorrow, +2 Days, Next Week)
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const parts = dateVal.split("-");
    const sel = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    sel.setHours(0, 0, 0, 0);
    const diff = Math.round((sel - today) / (1000 * 60 * 60 * 24));
    [0, 1, 2, 7].forEach((offset) => {
      const chip = document.getElementById(`causeListChip${offset}`);
      if (chip) chip.classList.toggle("active", diff === offset);
    });
  } catch (err) {
    // Graceful no-op
  }

  // Update sidebar today count
  const todayIso = toIsoDate(new Date());
  const todayListedCount = allRecords.filter((c) => !isDisp(c) && c.nextHearing === todayIso).length;
  if (navBadge) navBadge.textContent = String(todayListedCount);

  if (!container) return;

  const tableHead = document.getElementById("causeListTableHead");

  // Empty state handling
  if (listedCases.length === 0) {
    if (tableHead) tableHead.style.setProperty("display", "none", "important");
    container.innerHTML = `
      <div class="causelist-empty">
        <div class="empty-icon-wrap">
          <svg class="lucide lucide-calendar-x-2" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><path d="M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8"/><path d="M3 10h18"/><path d="m17 22 5-5"/><path d="m22 22-5-5"/></svg>
        </div>
        <div class="empty-title">No court appearances scheduled for ${escapeHtml(niceDate)}</div>
        <div class="empty-sub">Select a different date from the toolbar or pick a quick preset.</div>
        <button
          type="button"
          class="empty-action-btn"
          onclick="setCauseListDateOffset(0)"
          aria-label="Back to Today's Schedule"
        >
          <svg class="lucide lucide-calendar" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
          <span>Back to Today's Schedule</span>
        </button>
      </div>
    `;
    return;
  }

  if (tableHead) tableHead.style.removeProperty("display");

  // Sort by court name, then case number
  listedCases.sort((a, b) => {
    const courtA = (a.courtName || a.criminalCourtName || "").toUpperCase();
    const courtB = (b.courtName || b.criminalCourtName || "").toUpperCase();
    if (courtA !== courtB) return courtA.localeCompare(courtB);
    const numA = (a.caseNo || a.criminalCaseNumber || "").toUpperCase();
    const numB = (b.caseNo || b.criminalCaseNumber || "").toUpperCase();
    return numA.localeCompare(numB);
  });

  // Render cards (5-column direct grid children on case-head)
  let html = "";
  listedCases.forEach((c, idx) => {
    const caseNumber = c.caseNo || c.criminalCaseNumber || c.case_number || "—";
    const caseName =
      c.caseName ||
      c.case_name ||
      (c.plaintiff
        ? `${c.plaintiff} vs ${c.defendant || ""}`
        : c.victimName
          ? `${c.victimName} vs ${c.accusedName || ""}`
          : "—");
    const courtName = c.courtName || c.criminalCourtName || c.court_name || "District Court";
    const caseType = (c.caseType || c.case_type || "civil").toLowerCase();
    const stage = c.hearingProcess || c.process || c.stage || "Scheduled Hearing";
    const clientName = (c.clientName || c.criminalClientName || c.client_name || "").trim();
    const clientPhone = (c.clientNumber || c.criminalClientNumber || c.client_number || "").trim();
    const cleanPhone = clientPhone.replace(/[^0-9]/g, "");
    const remark = (c.remark || c.disposal_comment || c.action_taken || "").trim();

    const prevHearingDisplay = getCasePreviousHearingDisplay(c);
    const filingInfo = getCaseFilingOrForumInfo(c);
    const forumDetails = getCaseCriminalOrFilingDetails(c);

    // Tag category mapping
    let tagClass = "civil";
    let tagLabel = "Civil";
    if (caseType === "criminal" || caseType === "state") {
      tagClass = "criminal";
      tagLabel = "Criminal";
    } else if (caseType === "revenue") {
      tagClass = "revenue";
      tagLabel = "Revenue";
    } else if (caseType === "family") {
      tagClass = "family";
      tagLabel = "Family";
    } else if (caseType === "corporate") {
      tagClass = "corporate";
      tagLabel = "Corporate";
    }

    // Default table state collapsed
    const isOpen = false;

    const rep = getAdvocateRepresentation(c);
    const repIconSvg = rep.pillClass === "df"
      ? `<svg class="lucide lucide-shield" xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`
      : `<svg class="lucide lucide-scale" xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>`;

    html += `
      <article class="case${isOpen ? " open" : ""}" data-court="${escapeHtml(courtName.toLowerCase())}">
        <button
          type="button"
          class="case-head"
          aria-expanded="${isOpen ? "true" : "false"}"
          onclick="toggleCaseAccordion(this)"
        >
          <div class="c-title-col">
            <span class="c-title" title="${escapeHtml(caseName)}">${escapeHtml(caseName)}</span>
          </div>
          <span class="c-court" title="${escapeHtml(courtName)}"><svg class="lucide lucide-landmark" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg> <span>${escapeHtml(courtName)}</span></span>
          <span class="c-no">#${escapeHtml(caseNumber)}</span>
          <span class="tag ${tagClass}">${escapeHtml(tagLabel)}</span>
          <span class="chev" aria-hidden="true"><svg class="lucide lucide-chevron-down" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></span>
        </button>

        <div class="case-body">
          <div class="inner">
            <div class="body-pad">
              <!-- 3-COLUMN STRUCTURED LEDGER TABLE -->
              <div class="meta-ledger-3col">
                <!-- COLUMN 1: CASE & CLIENT -->
                <div class="ledger-col">
                  <div class="ledger-row">
                    <span class="ledger-lbl"><svg class="lucide lucide-user" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> Client:</span>
                    <span class="ledger-val client-name">${escapeHtml(clientName || "Chambers Record")}</span>
                  </div>
                  <div class="ledger-row">
                    <span class="ledger-lbl"><svg class="lucide lucide-phone" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> Contact:</span>
                    <span class="ledger-val client-phone-num">${escapeHtml(clientPhone || "—")}</span>
                  </div>
                  <div class="ledger-row">
                    <span class="ledger-lbl"><svg class="lucide lucide-shield" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Side / Role:</span>
                    <span class="ledger-val"><span class="rep-pill ${rep.pillClass}">${repIconSvg} <span>${escapeHtml(rep.label)}</span></span></span>
                  </div>
                  <div class="ledger-row">
                    <span class="ledger-lbl"><svg class="lucide lucide-scale" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg> Category:</span>
                    <span class="ledger-val">${escapeHtml(tagLabel)} Matter</span>
                  </div>
                  <div class="ledger-row">
                    <span class="ledger-lbl"><svg class="lucide lucide-gavel" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8"/><path d="m16 16 6-6"/><path d="m8 8 6-6"/><path d="m9 7 8 8"/><path d="m21 11-8-8"/></svg> Stage:</span>
                    <span class="ledger-val stage-text">${escapeHtml(stage || "Scheduled Hearing")}</span>
                  </div>
                </div>

                <!-- COLUMN 2: HEARING & FORUM / POLICE -->
                <div class="ledger-col">
                  <div class="ledger-row">
                    <span class="ledger-lbl"><svg class="lucide lucide-clock" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> Previous:</span>
                    <span class="ledger-val prev-date-text">${escapeHtml(prevHearingDisplay)}</span>
                  </div>
                  ${forumDetails.isCriminal ? `
                  <div class="ledger-row">
                    <span class="ledger-lbl"><svg class="lucide lucide-shield" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg> Police Station:</span>
                    <span class="ledger-val ps-text">${escapeHtml(forumDetails.ps)}</span>
                  </div>
                  <div class="ledger-row">
                    <span class="ledger-lbl"><svg class="lucide lucide-file-text" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg> FIR:</span>
                    <span class="ledger-val fir-text">${escapeHtml(forumDetails.fir)}</span>
                  </div>
                  <div class="ledger-row">
                    <span class="ledger-lbl"><svg class="lucide lucide-scale" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg> u/s:</span>
                    <span class="ledger-val sec-text">${escapeHtml(forumDetails.sec)}</span>
                  </div>
                  ` : `
                  <div class="ledger-row">
                    <span class="ledger-lbl"><svg class="lucide lucide-calendar" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M8 2v4"/><path d="M16 2v4"/><path d="M3 10h18"/></svg> Filing Date:</span>
                    <span class="ledger-val filing-date-text">${escapeHtml(forumDetails.filingDate)}</span>
                  </div>
                  ${forumDetails.caseYear ? `
                  <div class="ledger-row">
                    <span class="ledger-lbl"><svg class="lucide lucide-hash" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/></svg> Case Year:</span>
                    <span class="ledger-val year-text">${escapeHtml(forumDetails.caseYear)}</span>
                  </div>` : ''}
                  `}
                </div>

                <!-- COLUMN 3: CASE REMARKS / ORDER NOTE -->
                <div class="ledger-col ledger-remarks-col">
                  <div class="remarks-header">
                    <svg class="lucide lucide-file-text memo-ico" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg> Remarks / Order Note
                  </div>
                  <div class="remarks-body">
                    ${remark ? `"${escapeHtml(remark)}"` : '"Pichhli date par koi vishesh order/note darz nahi hai."'}
                  </div>
                </div>

                <!-- INTEGRATED BOTTOM ROW: ACTIONS -->
                <div class="ledger-actions-row actions">
                  <button
                    type="button"
                    class="act primary"
                    onclick="openUpdateHearingForCase('${escapeHtml(caseNumber)}')"
                    title="Agli tareekh aur proceeding darz karein"
                    aria-label="Update Next Date for Case ${escapeHtml(caseNumber)}"
                  >
                    <svg class="lucide lucide-calendar-plus" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M10 16h4"/><path d="M12 14v4"/></svg> <span class="act-text">Update Next Date</span>
                  </button>

                  <button
                    type="button"
                    class="act act-dossier"
                    onclick="if (typeof openCaseDetailsFullModal === 'function') openCaseDetailsFullModal('${escapeHtml(caseNumber)}'); else if (typeof openCaseHistoryModalByNo === 'function') openCaseHistoryModalByNo('${escapeHtml(caseNumber)}');"
                    title="Full Case Dossier Kholein"
                    aria-label="Open Full Dossier for Case ${escapeHtml(caseNumber)}"
                  >
                    <svg class="lucide lucide-folder-open" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/></svg> <span class="act-text">Open Dossier</span>
                  </button>

                  ${
                    cleanPhone
                      ? `<a
                          class="act act-call"
                          href="tel:${escapeHtml(cleanPhone)}"
                          title="Call Client"
                          aria-label="Call Client ${escapeHtml(clientName || '')}"
                        >
                          <svg class="lucide lucide-phone" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> <span class="act-text">Call Client</span>
                        </a>
                        <a
                          class="act act-whatsapp"
                          href="https://wa.me/91${escapeHtml(cleanPhone)}"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="WhatsApp Client"
                          aria-label="Send WhatsApp message to Client ${escapeHtml(clientName || '')}"
                        >
                          <svg class="lucide lucide-message-circle" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg> <span class="act-text">WhatsApp</span>
                        </a>`
                      : `<button type="button" class="act act-call disabled" disabled title="No client phone"><svg class="lucide lucide-phone" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> <span class="act-text">Call</span></button>`
                  }

                  <button
                    type="button"
                    class="act act-passover"
                    onclick="event.stopPropagation(); copyPassOverNote('${escapeHtml(caseNumber)}')"
                    title="Pass-Over / Haziri Request Slip Copy Karein"
                    aria-label="Copy Pass-Over Slip for Case ${escapeHtml(caseNumber)}"
                  >
                    <svg class="lucide lucide-receipt" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-8"/><path d="M16 12h-8"/><path d="M14 16h-6"/></svg> <span class="act-text">Pass-Over Slip</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    `;
  });

  container.innerHTML = html;
}

if (typeof renderCauseListTable !== "undefined") window.renderCauseListTable = renderCauseListTable;

/**
 * Sends the daily cause list summary via WhatsApp.
 */
function sendDailyCauseListWhatsApp() {
  const dateVal =
    (typeof window !== "undefined" && window.currentCauseListDate) ||
    currentCauseListDate ||
    toIsoDate(new Date());
  const courtFilterVal =
    (typeof window !== "undefined" && window.currentCauseListCourt) ||
    currentCauseListCourt ||
    "";
  const allRecords =
    typeof allCaseRecords !== "undefined" && Array.isArray(allCaseRecords)
      ? allCaseRecords
      : typeof window !== "undefined" && Array.isArray(window.allCaseRecords)
        ? window.allCaseRecords
        : [];
  const isDisp =
    typeof isCaseDisposed === "function"
      ? isCaseDisposed
      : (c) => ((c && (c.caseStatus || c.status || c.case_status)) || "").toLowerCase().includes("dispose");
  let listedCases = allRecords.filter((c) => !isDisp(c) && c.nextHearing === dateVal);

  const activeCourt = courtFilterVal || currentCauseListCourt;
  if (activeCourt && activeCourt.toLowerCase() !== "all") {
    const filterLower = activeCourt.toLowerCase();
    listedCases = listedCases.filter((c) => {
      const ct = (c.courtName || c.criminalCourtName || c.court_name || "").trim().toLowerCase();
      return ct === filterLower || ct.includes(filterLower);
    });
  }

  const safeFormatDate = (d) => (typeof formatDateDMY === "function" ? formatDateDMY(d) : formatNiceDate(d));

  if (listedCases.length === 0) {
    const courtNote = activeCourt ? ` in ${activeCourt}` : "";
    alert(`No court hearings are scheduled for ${safeFormatDate(dateVal)}${courtNote}.`);
    return;
  }

  let msg = `*DAILY COURT APPEARANCE BOARD / CAUSE LIST*\n`;
  msg += `*Date:* ${safeFormatDate(dateVal)}\n`;
  msg += `*Total Matters Listed:* ${listedCases.length}\n`;
  msg += `-------------------------------------------\n\n`;

  // Group by court
  const grouped = {};
  listedCases.forEach((c) => {
    const court = c.courtName || c.criminalCourtName || c.court_name || "District Court";
    if (!grouped[court]) grouped[court] = [];
    grouped[court].push(c);
  });

  let counter = 1;
  Object.keys(grouped).forEach((court) => {
    msg += `🏛️ *${court.toUpperCase()}*\n`;
    grouped[court].forEach((c) => {
      const caseNumber = c.caseNo || c.criminalCaseNumber || c.case_number || "—";
      const caseName =
        c.caseName ||
        c.case_name ||
        (c.plaintiff
          ? `${c.plaintiff} vs ${c.defendant || ""}`
          : c.victimName
            ? `${c.victimName} vs ${c.accusedName || ""}`
            : "—");
      const stage = c.hearingProcess || c.process || c.stage || "Scheduled Hearing";
      const rep = getAdvocateRepresentation(c).label;
      const client = c.clientName || c.criminalClientName || c.client_name || "";

      msg += `${counter}. *${caseName}*\n`;
      msg += `   • No: ${caseNumber}\n`;
      msg += `   • Side: ${rep}\n`;
      msg += `   • Stage: ${stage}\n`;
      if (client) msg += `   • Client: ${client}\n`;
      msg += `\n`;
      counter++;
    });
  });

  msg += `-------------------------------------------\n`;
  msg += `*Generated via CaseBook Chambers System*`;

  const encodedMsg = encodeURIComponent(msg);
  window.open(`https://wa.me/?text=${encodedMsg}`, "_blank");
}

if (typeof sendDailyCauseListWhatsApp !== "undefined")
  window.sendDailyCauseListWhatsApp = sendDailyCauseListWhatsApp;
