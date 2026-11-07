// ==============================================================================
// CaseBook Tab Registration: Daily Cause List & Appearance Board
// ==============================================================================
window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs["causelist"] = `
<div class="board causelist-board-shell" id="causelistContainer">
  <!-- HEADER -->
  <header class="board-head">
    <div class="head-left">
      <div class="h1">
        <span class="crest" aria-hidden="true"><i class="fa-solid fa-scale-unbalanced-flip"></i></span>
        <span class="h1-text">Daily Cause List</span>
      </div>
      <div class="sub" id="causeListSubline">
        <b>Today</b> · 0 listings
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
        <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
        <span>WhatsApp Daily Schedule</span>
      </button>
    </div>
  </header>

  <!-- TOOLBAR -->
  <div class="toolbar">
    <label class="ctl ctl-date" for="causeListDateInput" title="Select Appearance Date">
      <i class="fa-solid fa-calendar-day ctl-icon" aria-hidden="true"></i>
      <input
        type="date"
        id="causeListDateInput"
        onchange="typeof renderCauseListTable === 'function' ? renderCauseListTable(this.value, document.getElementById('causeListCourtFilterSelect')?.value) : (window.renderCauseListTable && window.renderCauseListTable(this.value, document.getElementById('causeListCourtFilterSelect')?.value))"
      />
    </label>

    <!-- customMadeDropdown1 architecture for Court Filter -->
    <div class="custom-dropdown causelist-court-custom-dropdown" id="causeListCourtDropdown">
      <select
        id="causeListCourtFilterSelect"
        class="sr-only"
        style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); border: 0;"
        tabindex="-1"
        aria-hidden="true"
        onchange="typeof renderCauseListTable === 'function' ? renderCauseListTable(document.getElementById('causeListDateInput')?.value, this.value) : (window.renderCauseListTable && window.renderCauseListTable(document.getElementById('causeListDateInput')?.value, this.value))"
      >
        <option value="">All Courts</option>
      </select>
      <button
        type="button"
        class="custom-dropdown-trigger"
        id="causeListCourtDropdownTrigger"
        aria-haspopup="listbox"
        aria-expanded="false"
        title="Filter by Court Forum"
      >
        <i class="fa-solid fa-landmark custom-dropdown-icon" aria-hidden="true"></i>
        <span class="custom-dropdown-label" id="causeListCourtDropdownLabel">All Courts</span>
        <svg class="lucide lucide-chevron-down custom-dropdown-chevron" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="custom-dropdown-menu" id="causeListCourtDropdownMenu">
        <ul class="custom-dropdown-list custom-scrollbar" id="causeListCourtDropdownList" role="listbox"></ul>
      </div>
    </div>

    <div class="chips" role="group" aria-label="Quick Date Presets">
      <button type="button" class="chip active" id="causeListChip0" onclick="setCauseListDateOffset(0)">Today</button>
      <button type="button" class="chip" id="causeListChip1" onclick="setCauseListDateOffset(1)">Tomorrow</button>
      <button type="button" class="chip" id="causeListChip2" onclick="setCauseListDateOffset(2)">+2 Days</button>
      <button type="button" class="chip" id="causeListChip7" onclick="setCauseListDateOffset(7)">Next Week</button>
    </div>
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

/**
 * Synchronizes the customMadeDropDown1 UI with underlying select
 */
function syncCauseListCourtDropdown() {
  const container = document.getElementById("causeListCourtDropdown");
  const select = document.getElementById("causeListCourtFilterSelect");
  if (!container || !select) return;
  const labelEl = container.querySelector(".custom-dropdown-label");
  const curOpt = select.options[select.selectedIndex];
  if (labelEl && curOpt) {
    labelEl.textContent = curOpt.textContent;
  }
  const listEl = container.querySelector(".custom-dropdown-list");
  if (listEl) {
    listEl.querySelectorAll(".custom-dropdown-item").forEach((item) => {
      const isSelected = item.getAttribute("data-value") === select.value;
      item.classList.toggle("selected", isSelected);
      item.setAttribute("aria-selected", isSelected ? "true" : "false");
      const existingSvg = item.querySelector("svg.checkmark");
      if (isSelected && !existingSvg) {
        item.insertAdjacentHTML("beforeend", '<svg class="lucide lucide-check w-4 h-4 text-white checkmark" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>');
      } else if (!isSelected && existingSvg) {
        existingSvg.remove();
      }
    });
  }
}
if (typeof syncCauseListCourtDropdown !== "undefined") window.syncCauseListCourtDropdown = syncCauseListCourtDropdown;

/**
 * Initializes customMadeDropDown1 for Cause List Court filter
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
  if (!trigger || !menu || !listEl) return;

  function openDropdown() {
    document.querySelectorAll(".custom-dropdown-menu.open").forEach((m) => {
      if (m !== menu) {
        m.classList.remove("open");
        const parent = m.closest(".custom-dropdown");
        const c = parent?.querySelector(".custom-dropdown-chevron");
        if (c) c.classList.remove("rotate-180");
        const t = parent?.querySelector(".custom-dropdown-trigger");
        if (t) t.setAttribute("aria-expanded", "false");
      }
    });

    menu.classList.add("open");
    if (chevron) chevron.classList.add("rotate-180");
    if (trigger) trigger.setAttribute("aria-expanded", "true");
  }

  function closeDropdown() {
    menu.classList.remove("open");
    if (chevron) chevron.classList.remove("rotate-180");
    if (trigger) trigger.setAttribute("aria-expanded", "false");
  }

  function toggleDropdown() {
    if (menu.classList.contains("open")) {
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

    options.forEach((opt) => {
      const li = document.createElement("li");
      const isSelected = opt.value === selectedVal;
      li.className = `custom-dropdown-item ${isSelected ? "selected" : ""}`;
      li.setAttribute("role", "option");
      li.setAttribute("aria-selected", isSelected ? "true" : "false");
      li.setAttribute("data-value", opt.value);

      const safeText = typeof escapeHtml === "function" ? escapeHtml(opt.textContent || opt.value) : (opt.textContent || opt.value);

      li.innerHTML = `
        <span class="truncate">${safeText}</span>
        ${isSelected ? '<svg class="lucide lucide-check w-4 h-4 text-white checkmark" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>' : ""}
      `;

      li.addEventListener("click", (e) => {
        e.stopPropagation();
        select.value = opt.value;
        if (labelEl) labelEl.textContent = opt.textContent;
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
      labelEl.textContent = curOpt.textContent;
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
      labelEl.textContent = curOpt.textContent;
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
        document.querySelectorAll(".custom-dropdown-menu.open").forEach((m) => {
          m.classList.remove("open");
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
  if (!c) return { label: "Filing Date", value: "—", icon: "fa-regular fa-calendar-days" };
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
  };
}

if (typeof getCaseFilingOrForumInfo !== "undefined")
  window.getCaseFilingOrForumInfo = getCaseFilingOrForumInfo;

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
  currentCauseListCourt = (courtFilter || "").trim();
  if (typeof window !== "undefined") window.currentCauseListCourt = currentCauseListCourt;

  const container = document.getElementById("causeListCardsContainer");
  const subline = document.getElementById("causeListSubline");
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
    subline.innerHTML = `<b>${escapeHtml(niceDate)}</b> · ${listedCases.length} listings`;
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

  // Empty state handling
  if (listedCases.length === 0) {
    container.innerHTML = `
      <div class="causelist-empty">
        <i class="fa-solid fa-calendar-xmark empty-icon" aria-hidden="true"></i>
        <div class="empty-title">No court appearances scheduled for ${escapeHtml(niceDate)}</div>
        <div class="empty-sub">Select a different date from the toolbar or pick a quick preset.</div>
        <button
          type="button"
          class="empty-action-btn"
          onclick="setCauseListDateOffset(0)"
          aria-label="Back to Today's Schedule"
        >
          <i class="fa-solid fa-calendar-day" aria-hidden="true"></i>
          <span>Back to Today's Schedule</span>
        </button>
      </div>
    `;
    return;
  }

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

    html += `
      <article class="case${isOpen ? " open" : ""}" data-court="${escapeHtml(courtName.toLowerCase())}">
        <button
          type="button"
          class="case-head"
          aria-expanded="${isOpen ? "true" : "false"}"
          onclick="toggleCaseAccordion(this)"
        >
          <span class="c-title" title="${escapeHtml(caseName)}">${escapeHtml(caseName)}</span>
          <span class="c-court" title="${escapeHtml(courtName)}"><i class="fa-solid fa-landmark" aria-hidden="true"></i> ${escapeHtml(courtName)}</span>
          <span class="c-no">#${escapeHtml(caseNumber)}</span>
          <span class="tag ${tagClass}">${escapeHtml(tagLabel)}</span>
          <span class="chev" aria-hidden="true"><i class="fa-solid fa-chevron-down"></i></span>
        </button>

        <div class="case-body">
          <div class="inner">
            <div class="body-pad">
              <!-- 3-COLUMN STRUCTURED LEDGER TABLE -->
              <div class="meta-ledger-3col">
                <!-- COLUMN 1: CASE & CLIENT -->
                <div class="ledger-col">
                  <div class="ledger-row">
                    <span class="ledger-lbl"><i class="fa-solid fa-user" aria-hidden="true"></i> Client:</span>
                    <span class="ledger-val client-name">${escapeHtml(clientName || "Chambers Record")}</span>
                  </div>
                  <div class="ledger-row">
                    <span class="ledger-lbl"><i class="fa-solid fa-phone" aria-hidden="true"></i> Contact:</span>
                    <span class="ledger-val client-phone-num">${escapeHtml(clientPhone || "—")}</span>
                  </div>
                  <div class="ledger-row">
                    <span class="ledger-lbl"><i class="fa-solid fa-scale-balanced" aria-hidden="true"></i> Category:</span>
                    <span class="ledger-val">${escapeHtml(tagLabel)} Matter</span>
                  </div>
                </div>

                <!-- COLUMN 2: HEARING & FORUM -->
                <div class="ledger-col">
                  <div class="ledger-row">
                    <span class="ledger-lbl"><i class="fa-solid fa-gavel" aria-hidden="true"></i> Stage:</span>
                    <span class="ledger-val stage-text">${escapeHtml(stage)}</span>
                  </div>
                  <div class="ledger-row">
                    <span class="ledger-lbl"><i class="fa-regular fa-clock" aria-hidden="true"></i> Previous:</span>
                    <span class="ledger-val prev-date-text">${escapeHtml(prevHearingDisplay)}</span>
                  </div>
                  <div class="ledger-row">
                    <span class="ledger-lbl"><i class="${filingInfo.icon}" aria-hidden="true"></i> ${escapeHtml(filingInfo.label)}:</span>
                    <span class="ledger-val extra-info-text">${escapeHtml(filingInfo.value)}</span>
                  </div>
                </div>

                <!-- COLUMN 3: CASE REMARKS / ORDER NOTE -->
                <div class="ledger-col ledger-remarks-col">
                  <div class="remarks-header">
                    <i class="fa-regular fa-note-sticky memo-ico" aria-hidden="true"></i> Remarks / Order Note
                  </div>
                  <div class="remarks-body">
                    ${remark ? escapeHtml(remark) : "Pichhli date par koi vishesh order/note darz nahi hai."}
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
                    <i class="fa-solid fa-calendar-plus" aria-hidden="true"></i> <span class="act-text">Update Next Date</span>
                  </button>

                  <button
                    type="button"
                    class="act act-dossier"
                    onclick="if (typeof openCaseDetailsFullModal === 'function') openCaseDetailsFullModal('${escapeHtml(caseNumber)}'); else if (typeof openCaseHistoryModalByNo === 'function') openCaseHistoryModalByNo('${escapeHtml(caseNumber)}');"
                    title="Full Case Dossier Kholein"
                    aria-label="Open Full Dossier for Case ${escapeHtml(caseNumber)}"
                  >
                    <i class="fa-solid fa-folder-open" aria-hidden="true"></i> <span class="act-text">Open Dossier</span>
                  </button>

                  ${
                    cleanPhone
                      ? `<a
                          class="act act-call"
                          href="tel:${escapeHtml(cleanPhone)}"
                          title="Call Client"
                          aria-label="Call Client ${escapeHtml(clientName || '')}"
                        >
                          <i class="fa-solid fa-phone" aria-hidden="true"></i> <span class="act-text">Call Client</span>
                        </a>
                        <a
                          class="act act-whatsapp"
                          href="https://wa.me/91${escapeHtml(cleanPhone)}"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="WhatsApp Client"
                          aria-label="Send WhatsApp message to Client ${escapeHtml(clientName || '')}"
                        >
                          <i class="fa-brands fa-whatsapp" aria-hidden="true"></i> <span class="act-text">WhatsApp</span>
                        </a>`
                      : ""
                  }
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
