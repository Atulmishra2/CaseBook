window.__casebook_modals = window.__casebook_modals || {};
window.__casebook_modals["case-modals"] = `    <!-- Full Case Details Modal Dialog (Premium Living Dossier) -->
    <div
      id="caseDetailsFullModal"
      class="modal-overlay hidden cdm-dossier-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="caseDetailsModalTitle"
      onclick="if (event.target === this) closeCaseDetailsFullModal();"
    >
      <div class="cdm-dossier-dialog">
        <article class="dossier" id="dossier" data-type="civil">
          <!-- 1. Header Strip -->
          <div class="strip">
            <div class="strip-left">
              <span class="case-no" id="cdmCaseNo">—</span>
              <span class="sep">·</span>
              <span class="matter" id="cdmMatterTitle">—</span>
              <!-- Test & legacy badges -->
              <span class="badge shape-split badge-type badge-civil" id="cdmHeaderTypeBadge" style="display:none;">
                <span class="shape-split-icon"><iconify-icon icon="lucide:scale"></iconify-icon></span>
                <span class="shape-split-text" id="cdmHeaderTypeText">Civil</span>
              </span>
            </div>
            <div class="strip-right">
              <span class="status live" id="cdmStatusBadge">
                <span class="dot"></span>
                <span id="cdmStatusLabel">Pending</span>
              </span>
              <span class="badge shape-split badge-pending" id="cdmHeaderStatusBadge" style="display:none;">
                <span class="shape-split-icon"><iconify-icon icon="lucide:clock"></iconify-icon></span>
                <span class="shape-split-text" id="cdmHeaderStatusText">Pending</span>
              </span>
              <button type="button" class="strip-close-btn" onclick="closeCaseDetailsFullModal()" title="Close Dossier (Esc)">
                <iconify-icon icon="lucide:x"></iconify-icon>
              </button>
            </div>
          </div>

          <!-- Hidden elements for test & legacy compatibility -->
          <div style="display:none;">
            <div id="caseDetailsModalTitle">—</div>
            <div id="caseDetailsModalCaseNo">—</div>
            <div id="caseDetailsModalSubtitle">—</div>
          </div>

          <!-- 2. Case Dossier Tabs with sliding indicator and badge counts -->
          <div class="case-tabs" id="caseTabs" role="tablist" aria-label="Case detail sections">
            <span class="case-tab-indicator" aria-hidden="true"></span>
            <button class="case-tab active" type="button" role="tab" data-panel="0" aria-selected="true" tabindex="0">
              <span>Overview</span>
            </button>
            <button class="case-tab" type="button" role="tab" data-panel="1" aria-selected="false" tabindex="-1">
              <span>Court</span>
            </button>
            <button class="case-tab" type="button" role="tab" data-panel="2" aria-selected="false" tabindex="-1">
              <span>Client</span>
            </button>
            <button class="case-tab" type="button" role="tab" data-panel="3" aria-selected="false" tabindex="-1">
              <span>Fees</span>
              <span class="badge-count" id="cdmFeesBadgeCount">0</span>
            </button>
            <button class="case-tab" type="button" role="tab" data-panel="4" aria-selected="false" tabindex="-1">
              <span>Proceedings</span>
              <span class="badge-count" id="cdmProceedingsBadgeCount">0</span>
            </button>
            <button class="case-tab" type="button" role="tab" data-panel="5" aria-selected="false" tabindex="-1">
              <span>Notes &amp; Tasks</span>
              <span class="badge-count" id="cdmTasksBadgeCount">0</span>
            </button>
          </div>

          <!-- 3. Scrollable Panels Container -->
          <div class="case-panels">
            <!-- PANEL 0: OVERVIEW -->
            <section class="case-panel active" data-panel="0" role="tabpanel" aria-label="Overview">
              <div class="masthead">
                <div class="faceoff">
                  <div class="party">
                    <span class="party-role" id="cdmPetitionerRole">PLAINTIFF</span>
                    <span class="party-name" id="cdmPetitionerName">—</span>
                  </div>
                  <span class="vs" aria-hidden="true">v</span>
                  <div class="party">
                    <span class="party-role" id="cdmRespondentRole">DEFENDANT</span>
                    <span class="party-name" id="cdmRespondentName">—</span>
                  </div>
                </div>
                <span class="badge-role" id="cdmAppearingBadge">Appearing for Plaintiff</span>
              </div>

              <div class="horizon-wrap">
                <div class="horizon">
                  <div class="horizon-left">
                    <div class="eyebrow" id="cdmHearingEyebrow">Next Hearing</div>
                    <div class="h-row">
                      <span class="h-date" id="cdmHearingDate">—</span>
                      <span class="h-chip" id="cdmHearingCountdown">—</span>
                    </div>
                  </div>
                  <div class="horizon-right">
                    <div class="eyebrow">Current Stage</div>
                    <div class="h-stage" id="cdmHearingStage">—</div>
                  </div>
                </div>
              </div>

              <div class="sec">
                <h3 class="panel-h">
                  <iconify-icon icon="lucide:file-text"></iconify-icon>
                  <span>Case Snapshot</span>
                </h3>
                <div class="tbl-wrap">
                  <table class="tbl tbl-overview tbl-keyvalue">
                    <thead>
                      <tr><th>Field</th><th>Detail</th></tr>
                    </thead>
                    <tbody id="cdmOverviewSnapshotBody">
                      <!-- Hydrated dynamically -->
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <!-- PANEL 1: COURT & BENCH -->
            <section class="case-panel" data-panel="1" role="tabpanel" aria-label="Court">
              <div class="sec">
                <h3 class="panel-h">
                  <iconify-icon icon="lucide:landmark"></iconify-icon>
                  <span>Court &amp; Bench</span>
                </h3>
                <div class="tbl-wrap">
                  <table class="tbl tbl-court tbl-keyvalue">
                    <thead>
                      <tr><th>Field</th><th>Detail</th></tr>
                    </thead>
                    <tbody id="cdmCourtDetailsBody">
                      <!-- Hydrated dynamically -->
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="sec" id="cdmSpecializedSec">
                <h3 class="panel-h">
                  <iconify-icon icon="lucide:folder-open"></iconify-icon>
                  <span id="cdmSpecializedTitle">Case Particulars</span>
                </h3>
                <div class="tbl-wrap">
                  <table class="tbl tbl-particulars tbl-keyvalue">
                    <thead>
                      <tr><th>Field</th><th>Detail</th></tr>
                    </thead>
                    <tbody id="cdmSpecializedBody">
                      <!-- Hydrated dynamically -->
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="sec" id="cdmTransferSec">
                <h3 class="panel-h">
                  <iconify-icon icon="lucide:arrow-left-right"></iconify-icon>
                  <span>Court Transfer History</span>
                  <span class="badge shape-split badge-civil" id="cdmTransferCountBadge" style="margin-left:auto; font-size:11px;">0 Transfers</span>
                </h3>
                <div class="tbl-wrap">
                  <table class="tbl tbl-transfers">
                    <thead>
                      <tr><th>Date</th><th>Transfer Route</th><th>Order / Authority</th><th>Reason &amp; Remarks</th></tr>
                    </thead>
                    <tbody id="cdmTransferTableBody">
                      <!-- Hydrated dynamically -->
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <!-- PANEL 2: CLIENT -->
            <section class="case-panel" data-panel="2" role="tabpanel" aria-label="Client">
              <div class="sec">
                <div class="client-hero">
                  <div class="avatar" id="cdmClientAvatar">RS</div>
                  <div class="client-hero-main">
                    <div class="client-name" id="cdmClientHeroName">—</div>
                    <div class="client-phone" id="cdmClientHeroPhone">—</div>
                  </div>
                </div>
              </div>
              <div class="sec">
                <h3 class="panel-h">
                  <iconify-icon icon="lucide:contact"></iconify-icon>
                  <span>Contact Record</span>
                </h3>
                <div class="tbl-wrap">
                  <table class="tbl tbl-client tbl-keyvalue">
                    <thead>
                      <tr><th>Field</th><th>Detail</th></tr>
                    </thead>
                    <tbody id="cdmClientContactBody">
                      <!-- Hydrated dynamically -->
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <!-- PANEL 3: FEES -->
            <section class="case-panel" data-panel="3" role="tabpanel" aria-label="Fees">
              <div class="sec">
                <h3 class="panel-h">
                  <iconify-icon icon="lucide:indian-rupee"></iconify-icon>
                  <span>Fee Summary</span>
                </h3>
                <div class="tbl-wrap">
                  <table class="tbl tbl-fee-summary tbl-keyvalue">
                    <thead>
                      <tr><th>Item</th><th class="num">Amount</th></tr>
                    </thead>
                    <tbody id="cdmFeeSummaryBody">
                      <!-- Hydrated dynamically -->
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="sec">
                <h3 class="panel-h">
                  <iconify-icon icon="lucide:receipt"></iconify-icon>
                  <span>Payment Ledger</span>
                </h3>
                <div class="tbl-wrap">
                  <table class="tbl tbl-ledger">
                    <thead>
                      <tr><th>Date</th><th>Particulars</th><th>Mode</th><th class="num">Amount</th></tr>
                    </thead>
                    <tbody id="cdmFeeLedgerBody">
                      <!-- Hydrated dynamically -->
                    </tbody>
                    <tfoot id="cdmFeeLedgerFoot">
                      <!-- Hydrated dynamically -->
                    </tfoot>
                  </table>
                </div>
              </div>
            </section>

            <!-- PANEL 4: PROCEEDINGS -->
            <section class="case-panel" data-panel="4" role="tabpanel" aria-label="Proceedings">
              <div class="sec">
                <h3 class="panel-h">
                  <iconify-icon icon="lucide:scroll-text"></iconify-icon>
                  <span>Order Sheet &amp; Hearing History</span>
                </h3>
                <div class="tbl-wrap">
                  <table class="tbl tbl-proceedings">
                    <thead>
                      <tr><th>Date</th><th>Stage</th><th>Order / Proceeding</th></tr>
                    </thead>
                    <tbody id="cdmProceedingsBody">
                      <!-- Hydrated dynamically -->
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <!-- PANEL 5: NOTES & TASKS -->
            <section class="case-panel" data-panel="5" role="tabpanel" aria-label="Notes &amp; Tasks">
              <div class="sec" id="cdmTasksSec">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                  <h3 class="panel-h" style="margin:0;">
                    <iconify-icon icon="lucide:check-square"></iconify-icon>
                    <span>Linked Case Tasks &amp; Deadlines</span>
                  </h3>
                  <button type="button" class="footer-btn" style="padding:4px 10px; font-size:12px; height:auto;" onclick="closeCaseDetailsFullModal(); if (typeof openTodoForCase === 'function') openTodoForCase(window.currentSelectedCase?.caseNo || window.currentSelectedCase?.case_number);">
                    <iconify-icon icon="lucide:plus"></iconify-icon> Add Task
                  </button>
                </div>
                <div class="tbl-wrap">
                  <table class="tbl tbl-tasks">
                    <thead>
                      <tr><th>Deadline</th><th>Task &amp; Details</th><th>Priority</th><th>Status</th></tr>
                    </thead>
                    <tbody id="cdmTasksBody">
                      <!-- Hydrated dynamically -->
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="sec" id="cdmNotesSec">
                <h3 class="panel-h">
                  <iconify-icon icon="lucide:lock"></iconify-icon>
                  <span>Latest Order &amp; Private Notes</span>
                </h3>
                <div class="tbl-wrap">
                  <table class="tbl tbl-notes">
                    <thead>
                      <tr><th>Type</th><th>Date</th><th>Note</th></tr>
                    </thead>
                    <tbody id="cdmNotesBody">
                      <!-- Hydrated dynamically -->
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>

          <!-- 4. Sticky Docked Footer -->
          <footer class="dossier-footer">
            <div class="footer-left">
              <button type="button" class="footer-btn" id="cdmFooterPrintBtn">
                <iconify-icon icon="lucide:printer"></iconify-icon> Print
              </button>
              <a class="footer-btn" id="cdmFooterWhatsAppBtn" target="_blank" rel="noopener">
                <iconify-icon icon="lucide:message-circle"></iconify-icon> WhatsApp
              </a>
              <button type="button" class="footer-btn" id="cdmFooterTransferBtn">
                <iconify-icon icon="lucide:arrow-left-right"></iconify-icon> Transfer
              </button>
            </div>
            <div class="footer-right">
              <button type="button" class="footer-btn footer-btn-primary" id="cdmFooterUpdateHearingBtn">
                <iconify-icon icon="lucide:calendar-clock"></iconify-icon> Update Hearing
              </button>
              
              <div class="dropdown-wrapper">
                <button type="button" class="footer-btn footer-btn-icon" id="cdmMoreBtn" onclick="event.stopPropagation(); toggleCdmMoreMenu(event)" aria-label="More actions" aria-haspopup="true" aria-expanded="false">
                  <iconify-icon icon="lucide:more-horizontal"></iconify-icon>
                </button>
                
                <div class="dropdown-menu" id="cdmMoreMenu" role="menu">
                  <button type="button" class="dropdown-item" id="cdmMenuPrintBtn" role="menuitem">
                    <iconify-icon icon="lucide:printer"></iconify-icon> Print Case Dossier
                  </button>
                  <button type="button" class="dropdown-item" id="cdmMenuTransferBtn" role="menuitem">
                    <iconify-icon icon="lucide:arrow-left-right"></iconify-icon> Transfer Case
                  </button>
                  <button type="button" class="dropdown-item" id="cdmMenuTodoBtn" role="menuitem">
                    <iconify-icon icon="lucide:check-square"></iconify-icon> Add To-Do Task
                  </button>
                  <button type="button" class="dropdown-item" id="cdmMenuHistoryBtn" role="menuitem">
                    <iconify-icon icon="lucide:history"></iconify-icon> Hearing History
                  </button>
                  <div class="dropdown-sep"></div>
                  <button type="button" class="dropdown-item" id="cdmMenuEditBtn" role="menuitem">
                    <iconify-icon icon="lucide:pencil"></iconify-icon> Edit Case Details
                  </button>
                  <div class="dropdown-sep"></div>
                  <button type="button" class="dropdown-item" onclick="closeCaseDetailsFullModal()" role="menuitem">
                    <iconify-icon icon="lucide:x"></iconify-icon> Close Window
                  </button>
                </div>
              </div>

              <button type="button" class="footer-btn" onclick="closeCaseDetailsFullModal()">
                Close
              </button>
            </div>
          </footer>
        </article>
      </div>
    </div>
<!-- Case Hearing & Process History Modal Dialog -->
    <div
      id="caseHistoryModal"
      class="modal-overlay hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="historyModalTitle"
      onclick="if (event.target === this) closeCaseHistoryModal();"
    >
      <div class="modal-card modal-container chm-modal-card">
        <!-- 1. Header Bar -->
        <div class="modal-header">
          <div class="header-left modal-header-info">
            <div class="modal-icon-badge">
              <iconify-icon icon="lucide:history"></iconify-icon>
            </div>
            <div class="header-text">
              <h3 id="historyModalTitle" class="modal-header-title">Case Hearing & Process History</h3>
            </div>
          </div>

          <div class="header-actions">
            <button
              type="button"
              id="chmHeaderDossierBtn"
              class="chm-header-dossier-btn"
              onclick="printCaseHearingHistory()"
              title="Print / Save Hearing Dossier"
            >
              <iconify-icon icon="lucide:printer"></iconify-icon>
              <span>Print Dossier</span>
            </button>
            <button
              type="button"
              id="closeCaseHistoryModalBtn"
              class="modal-close-btn"
              aria-label="Close Case History"
              onclick="closeCaseHistoryModal()"
              title="Close (Esc)"
            >
              <iconify-icon icon="lucide:x"></iconify-icon>
            </button>
          </div>
        </div>

        <!-- 2. Toolbar & Body (Normal flow with page) -->
        <div class="modal-body chm-modal-body">
          <!-- Hero Summary Banner Card -->
          <div class="chm-hero-card modal-case-summary">
            <div class="chm-hero-info">
              <h2 class="chm-hero-title" id="modalCaseTitle">—</h2>
              <div class="chm-hero-meta-row">
                <div class="chm-hero-meta-item">
                  <iconify-icon icon="lucide:hash"></iconify-icon>
                  <span class="chm-hero-meta-label">Case No:</span>
                  <strong id="modalCaseNo" class="chm-hero-caseno">—</strong>
                </div>
                <span class="chm-meta-divider">•</span>
                <div class="chm-hero-meta-item">
                  <iconify-icon icon="lucide:landmark"></iconify-icon>
                  <span id="modalCourtName" class="chm-hero-court">—</span>
                </div>
              </div>
            </div>

            <!-- Right Next Hearing Highlight Box -->
            <div class="chm-hero-hearing-highlight">
              <div class="chm-hearing-highlight-label">
                <iconify-icon icon="lucide:calendar-check"></iconify-icon>
                <span>NEXT HEARING</span>
              </div>
              <div class="chm-hearing-highlight-value">
                <span id="modalNextHearingBadge" class="chm-hero-next-date">—</span>
              </div>
            </div>
          </div>


          <!-- Timeline Data Table -->
          <div class="chm-table-container">
            <table class="chm-history-table">
              <thead>
                <tr>
                  <th style="width: 50px;">#</th>
                  <th style="width: 140px;">Hearing Date</th>
                  <th style="width: 180px;">Process / Stage</th>
                  <th>Court Action & Proceedings</th>
                </tr>
              </thead>
              <tbody id="caseHistoryTableBody">
                <!-- Injected dynamically -->
              </tbody>
            </table>
          </div>

          <!-- Empty State -->
          <div id="caseHistoryEmpty" class="case-details-empty chm-empty-state hidden">
            <div class="chm-empty-icon">
              <iconify-icon icon="lucide:calendar-x"></iconify-icon>
            </div>
            <h4 class="chm-empty-title">No Previous Hearings Recorded</h4>
            <p class="chm-empty-subtitle">There are no prior hearing appearances or proceedings logged for this case record yet.</p>
          </div>
        </div>

        <!-- 4. Modal Footer -->
        <div class="modal-footer chm-modal-footer">
          <button
            type="button"
            id="modalCloseBtn"
            class="helper-btn-secondary chm-footer-close-btn"
            onclick="closeCaseHistoryModal()"
          >
            Close
          </button>
          <button
            type="button"
            id="modalUpdateHearingBtn"
            class="helper-btn-primary chm-footer-update-btn"
          >
            <iconify-icon icon="lucide:calendar-plus"></iconify-icon>
            <span>Update Next Hearing</span>
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
          <h3 id="pwaGuideTitle">📅² Install App & Create Shortcut</h3>
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
              <iconify-icon icon="lucide:monitor"></iconify-icon> Desktop Install (Windows
              / Mac / PC)
            </h4>
            <ol class="pwa-step-list">
              <li>
                Look at your browser's <strong>Address Bar (URL bar)</strong> at
                the top right.
              </li>
              <li>
                Click the <strong>Install icon (💻 or ➕)</strong> that says
                <em>"Install CaseBook"</em>.
              </li>
              <li>
                OR click your browser menu
                <strong>(three dots ⋮ or …)</strong> ➔ Select
                <strong>"Install CaseBook..."</strong> (or
                <em>"Save and share"</em> ➔ <em>"Install page as app"</em>).
              </li>
              <li>
                Click <strong>"Install"</strong>. CaseBook will open in its own
                standalone desktop window and place a shortcut on your Desktop
                and Taskbar!
              </li>
            </ol>
          </div>

          <div class="pwa-card-section">
            <h4>🚀 Quick Install (Mobile / Smartphone)</h4>
            <ol class="pwa-step-list">
              <li>
                Tap the <strong>three dots (⋮)</strong> menu in the top right
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
              ⚠️ Shortcut Not Appearing? (Xiaomi / Realme / Oppo / Vivo)
            </h4>
            <p style="margin-top: 0">
              Many Android phone launchers block Chrome from creating shortcuts
              by default. Follow these steps to fix:
            </p>
            <ol class="pwa-step-list">
              <li>
                Open phone <strong>Settings ⚙️</strong> ➔
                <strong>Apps</strong> ➔ <strong>Manage Apps</strong>
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
            Got It 👍
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
              <iconify-icon icon="lucide:layers"></iconify-icon>
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
                Case: <strong id="caseRemarkModalCaseNo">—</strong>
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
              class="secondary-btn table-view-btn"
              id="caseRemarkCopyTextBtn"
              onclick="copyRemarkDataToClipboard('text')"
              title="Copy Remarks as formatted text"
            >
              <iconify-icon icon="lucide:copy"></iconify-icon> Copy Text
            </button>
            <button
              type="button"
              class="secondary-btn table-view-btn"
              id="caseRemarkCopyJsonBtn"
              onclick="copyRemarkDataToClipboard('json')"
              title="Copy raw remarks JSON"
            >
              <iconify-icon icon="lucide:code"></iconify-icon> Copy JSON
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

    <!-- ============================================================
         FORWARD DATE MODAL (with Refined Custom Date Picker)
         ============================================================ -->
    <div
      class="fd-modal-overlay modal-overlay hidden"
      id="fdModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="fdModalTitle"
    >
      <div class="fd-modal">
        <!-- Header -->
        <div class="fd-modal-header">
          <div class="fd-mh-left">
            <div class="fd-mh-icon">
              <iconify-icon icon="lucide:calendar-days"></iconify-icon>
            </div>
            <div class="fd-mh-text">
              <div class="fd-mh-title" id="fdModalTitle">Forward Date</div>
              <div class="fd-mh-sub" id="fdModalSub">Select a case to begin</div>
            </div>
          </div>
          <button type="button" class="fd-modal-close" onclick="closeForwardDateModal()" aria-label="Close modal">
            <iconify-icon icon="lucide:x"></iconify-icon>
          </button>
        </div>

        <!-- Body -->
        <div class="fd-modal-body">
          <!-- SECTION 1 — Select Case -->
          <div class="fd-section">
            <div class="fd-section-head">
              <div class="fd-section-num">1</div>
              <div>
                <div class="fd-section-title">Select Case</div>
                <div class="fd-section-desc">Search by case number or name. Undated cases appear first.</div>
              </div>
            </div>

            <div class="fd-combo-wrap" id="fdCaseCombo">
              <button type="button" class="fd-combo-input-wrap" id="fdComboInputWrap" onclick="toggleForwardCombo(event)" onkeydown="handleForwardComboKeydown(event)" aria-haspopup="listbox" aria-expanded="false" aria-controls="fdComboOptions" aria-label="Select case">
                <span class="fd-combo-label" id="fdComboLabel">Select a case...</span>
                <iconify-icon icon="lucide:chevron-down" class="fd-combo-chevron" aria-hidden="true"></iconify-icon>
              </button>
              <div class="fd-combo-dropdown" id="fdComboDropdown">
                <div class="fd-combo-search-wrap">
                  <iconify-icon icon="lucide:search" class="fd-lead-icon" aria-hidden="true"></iconify-icon>
                  <input type="text" class="fd-combo-input" id="fdComboInput" aria-label="Search cases" autocomplete="off" placeholder="Search case number or name..." oninput="onForwardComboInput(this.value)" onkeydown="handleForwardComboKeydown(event)" />
                </div>
                <div class="fd-combo-options" id="fdComboOptions" role="listbox" aria-label="Cases"></div>
              </div>
            </div>
          </div>

          <!-- SECTION 2 — Case Detail Card -->
          <div class="fd-section" id="fdCaseDetailSection" style="display: none;">
            <div class="fd-section-head">
              <div class="fd-section-num">2</div>
              <div>
                <div class="fd-section-title">Case Details</div>
                <div class="fd-section-desc">Verify the selected case before forwarding.</div>
              </div>
            </div>

            <div class="fd-case-detail-card">
              <div class="fd-cdc-header">
                <iconify-icon icon="lucide:folder-open"></iconify-icon>
                <span>Case Information</span>
              </div>
              <div class="fd-cdc-body">
                <div class="fd-cdc-item full">
                  <span class="fd-cdc-label">Case Name</span>
                  <div class="fd-cdc-value" id="fdCdcCaseName">—</div>
                </div>
                <div class="fd-cdc-item">
                  <span class="fd-cdc-label">Case Number</span>
                  <div class="fd-cdc-value" id="fdCdcCaseNo">—</div>
                </div>
                <div class="fd-cdc-item">
                  <span class="fd-cdc-label">Case Type</span>
                  <div class="fd-cdc-value" id="fdCdcCaseType">—</div>
                </div>
                <div class="fd-cdc-item full">
                  <span class="fd-cdc-label">Court / Forum</span>
                  <div class="fd-cdc-value" id="fdCdcCourt">—</div>
                </div>
                <div class="fd-cdc-item">
                  <span class="fd-cdc-label">Filing Date</span>
                  <div class="fd-cdc-value" id="fdCdcFilingDate">—</div>
                </div>
                <div class="fd-cdc-item">
                  <span class="fd-cdc-label">Client Name</span>
                  <div class="fd-cdc-value" id="fdCdcClientName">—</div>
                </div>
                <div class="fd-cdc-item">
                  <span class="fd-cdc-label">We Represent</span>
                  <div class="fd-cdc-value highlight" id="fdCdcClientRole">—</div>
                </div>
                <div class="fd-cdc-item">
                  <span class="fd-cdc-label">Previous Date</span>
                  <div class="fd-cdc-value" id="fdCdcPrevDate">—</div>
                </div>
                <div class="fd-cdc-item full">
                  <span class="fd-cdc-label">Previous Case Stage</span>
                  <div class="fd-cdc-value" id="fdCdcPrevStage">—</div>
                </div>
              </div>
            </div>
          </div>

          <!-- SECTION 3 — Refined Calendar + Next Date Card (Side-by-side) -->
          <div class="fd-section" id="fdNewDateSection">
            <div class="fd-section-head">
              <div class="fd-section-num">3</div>
              <div>
                <div class="fd-section-title">New Hearing Date</div>
                <div class="fd-section-desc">One-tap presets or pick a date — summary updates instantly.</div>
              </div>
            </div>

            <!-- One-Tap Preset Chips -->
            <div class="fd-preset-chips">
              <button type="button" class="fd-preset-chip" onclick="setForwardDatePreset(7)">
                <iconify-icon icon="lucide:zap"></iconify-icon> +1 Week
              </button>
              <button type="button" class="fd-preset-chip" onclick="setForwardDatePreset(14)">
                <iconify-icon icon="lucide:zap"></iconify-icon> +2 Weeks
              </button>
              <button type="button" class="fd-preset-chip" onclick="setForwardDatePreset(21)">
                <iconify-icon icon="lucide:zap"></iconify-icon> +3 Weeks
              </button>
              <button type="button" class="fd-preset-chip" onclick="setForwardDatePreset(30)">
                <iconify-icon icon="lucide:calendar"></iconify-icon> +1 Month
              </button>
              <button type="button" class="fd-preset-chip" onclick="setForwardDatePreset(60)">
                <iconify-icon icon="lucide:calendar"></iconify-icon> +2 Months
              </button>
              <button type="button" class="fd-preset-chip" onclick="setForwardDatePreset(1)">
                <iconify-icon icon="lucide:flame"></iconify-icon> Tomorrow
              </button>
              <button type="button" class="fd-preset-chip" onclick="setForwardDatePreset(0)">
                <iconify-icon icon="lucide:flame"></iconify-icon> Today
              </button>
            </div>

            <div class="fd-date-row">
              <!-- LEFT: Refined Custom Date Picker -->
              <div class="fd-calendar-wrap">
                <div class="fd-cal-header">
                  <div class="fd-cal-nav">
                    <button type="button" class="fd-cal-nav-btn" onclick="calPrevYear()" title="Previous year" aria-label="Previous year">
                      <iconify-icon icon="lucide:chevrons-left"></iconify-icon>
                    </button>
                    <button type="button" class="fd-cal-nav-btn" onclick="calPrevMonth()" title="Previous month" aria-label="Previous month">
                      <iconify-icon icon="lucide:chevron-left"></iconify-icon>
                    </button>
                  </div>

                  <div class="fd-cal-title" id="fdCalTitle">Month YYYY</div>

                  <div class="fd-cal-nav">
                    <button type="button" class="fd-cal-nav-btn" onclick="calNextMonth()" title="Next month" aria-label="Next month">
                      <iconify-icon icon="lucide:chevron-right"></iconify-icon>
                    </button>
                    <button type="button" class="fd-cal-nav-btn" onclick="calNextYear()" title="Next year" aria-label="Next year">
                      <iconify-icon icon="lucide:chevrons-right"></iconify-icon>
                    </button>
                    <button type="button" class="fd-cal-today-btn" onclick="calToday()">Today</button>
                  </div>
                </div>

                <div class="fd-cal-weekdays">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>

                <div class="fd-cal-days" id="fdCalDays"></div>

                <div class="fd-cal-footer">
                  <div class="fd-cal-selected-pill">
                    <iconify-icon icon="lucide:calendar"></iconify-icon>
                    <span id="fdCalSelectedText">none</span>
                  </div>
                  <button type="button" class="fd-cal-clear-btn" onclick="calClear()">Clear</button>
                </div>

                <!-- Sunday / Non-working Day Alert -->
                <div id="fdSundayAlert" class="fd-sunday-alert" style="display: none;">
                  <iconify-icon icon="lucide:alert-triangle" style="font-size: 16px; color: #ef4444; flex-shrink: 0;"></iconify-icon>
                  <span><strong>Warning:</strong> Selected date falls on a <strong>Sunday</strong> (Courts closed). Please verify if it is an urgent duty remand day or select a regular working day.</span>
                </div>
              </div>

              <!-- RIGHT: Next Date Card -->
              <div class="fd-next-date-card">
                <div class="fd-ndc-header">
                  <iconify-icon icon="lucide:calendar-check"></iconify-icon>
                  <span>Forwarded Next</span>
                </div>
                <div class="fd-ndc-body">
                  <div class="fd-ndc-item">
                    <span class="fd-ndc-label">Next Date</span>
                    <div class="fd-ndc-value placeholder" id="fdNdcNextDate">Select a date</div>
                  </div>
                  <div class="fd-ndc-item">
                    <span class="fd-ndc-label">Day</span>
                    <div class="fd-ndc-value placeholder" id="fdNdcNextDay">—</div>
                  </div>
                  <div class="fd-ndc-item">
                    <span class="fd-ndc-label">Interval</span>
                    <div class="fd-ndc-value placeholder" id="fdNdcInterval">—</div>
                  </div>
                  <div class="fd-ndc-item">
                    <span class="fd-ndc-label">Next Case Stage <span style="color: var(--danger-text);">*</span></span>

                    <!-- Dynamic Suggested Next Stage Pill -->
                    <div id="fdStageRecWrap" class="fd-stage-rec-wrap" style="display: none; margin-bottom: 6px;">
                      <span class="fd-stage-rec-label"><iconify-icon icon="lucide:sparkles" style="color: #f59e0b;"></iconify-icon> Suggested:</span>
                      <button type="button" id="fdStageRecBtn" class="fd-stage-rec-pill" onclick="applyForwardModalRecStage()">
                        <span id="fdStageRecText">Evidence</span>
                        <iconify-icon icon="lucide:arrow-right" style="font-size: 10px;"></iconify-icon>
                      </button>
                    </div>

                    <!-- 1-Tap Quick Stage Chips -->
                    <div class="fd-quick-stage-pills" id="fdQuickStagePills">
                      <button type="button" class="fd-stage-pill" onclick="quickSelectForwardStage('Evidence')">Evidence</button>
                      <button type="button" class="fd-stage-pill" onclick="quickSelectForwardStage('Arguments')">Arguments</button>
                      <button type="button" class="fd-stage-pill" onclick="quickSelectForwardStage('Bail Hearing')">Bail</button>
                      <button type="button" class="fd-stage-pill" onclick="quickSelectForwardStage('Framing of Issues')">Framing</button>
                      <button type="button" class="fd-stage-pill" onclick="quickSelectForwardStage('Cross Examination')">Cross</button>
                      <button type="button" class="fd-stage-pill" onclick="quickSelectForwardStage('Final Order')">Final Order</button>
                    </div>

                    <select id="fdStageSelect" class="fd-select" onchange="onForwardStageChange(this.value)">
                      <option value="" disabled selected>-- Select Stage --</option>
                      <option value="Pre-summoning Evidence">Pre-summoning Evidence</option>
                      <option value="Summoning Order">Summoning Order (समन आदेश)</option>
                      <option value="Bail Hearing">Bail Hearing (ज़मानत)</option>
                      <option value="Plea in Absence">Plea in Absence</option>
                      <option value="Final Order">Final Order (फैसला)</option>
                      <option value="Arguments">Arguments (बहस)</option>
                      <option value="Evidence">Evidence (साक्ष्य)</option>
                      <option value="Notice">Notice (समन)</option>
                      <option value="Framing of Issues">Framing of Issues (तनकीहात)</option>
                      <option value="Cross Examination">Cross Examination (जिरह)</option>
                      <option value="Compliance">Compliance (अनुपालन)</option>
                      <option value="Adjourned">Adjourned (स्थगित)</option>
                      <option value="Order Reserved">Order Reserved (आदेश आरक्षित)</option>
                      <option value="Other">Other (अन्य)</option>
                    </select>
                    <div id="fdCustomStageWrap" style="display: none; margin-top: 6px;">
                      <input type="text" id="fdCustomStageInput" class="fd-input" placeholder="Type custom stage/order here..." />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- SECTION 4 — Proceedings & Order Notes -->
          <div class="fd-section" id="fdNotesSection">
            <div class="fd-section-head">
              <div class="fd-section-num">4</div>
              <div>
                <div class="fd-section-title">
                  Proceedings &amp; Order Notes
                  <span style="opacity: 0.6; font-weight: 400; font-size: 0.75rem;">(Optional)</span>
                </div>
                <div class="fd-section-desc">Court order summary, bench remarks, or next action items.</div>
              </div>
            </div>

            <!-- Quick Order Snippets (1-tap insertion) -->
            <div class="fd-snippets-bar" style="margin-bottom: 8px;">
              <span class="fd-snippets-title" style="font-size: 0.72rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; display: flex; align-items: center; gap: 4px; margin-bottom: 5px;">
                <iconify-icon icon="lucide:zap" style="color: #f59e0b;"></iconify-icon> 1-Tap Order Snippets:
              </span>
              <div class="fd-snippets-list" style="display: flex; flex-wrap: wrap; gap: 5px;">
                <button type="button" class="fd-snippet-chip" onclick="appendForwardSnippet('WS / Counter affidavit filed. Listed for rejoinder.')">WS Filed</button>
                <button type="button" class="fd-snippet-chip" onclick="appendForwardSnippet('Adjourned on request of counsel.')">Adjourned</button>
                <button type="button" class="fd-snippet-chip" onclick="appendForwardSnippet('Plaintiff evidence recorded. Listed for cross-examination.')">Evidence Recorded</button>
                <button type="button" class="fd-snippet-chip" onclick="appendForwardSnippet('Cross-examination completed. Listed for next evidence.')">Cross Exam</button>
                <button type="button" class="fd-snippet-chip" onclick="appendForwardSnippet('Arguments heard in part. Matter adjourned.')">Arguments Heard</button>
                <button type="button" class="fd-snippet-chip" onclick="appendForwardSnippet('Presiding officer on leave. Matter re-notified.')">Judge on Leave</button>
                <button type="button" class="fd-snippet-chip" onclick="appendForwardSnippet('Final arguments concluded. Reserved for judgment.')">Reserved Order</button>
              </div>
            </div>

            <label class="fd-cdc-label" for="fdProceedingsNote" style="margin-bottom: 6px;">Action Taken / Court Order Summary</label>
            <textarea
              class="fd-textarea"
              id="fdProceedingsNote"
              placeholder="e.g. Defendant filed written statement. Court granted 2 weeks for counter affidavit..."
            ></textarea>

            <!-- Case Disposal Terminal Toggle -->
            <div class="fd-disposal-box" style="margin-top: 10px; padding: 10px 12px; background: var(--bg-subtle); border: 1px dashed var(--border-color); border-radius: 8px;">
              <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 0.82rem; font-weight: 600; color: var(--text-heading);">
                <input type="checkbox" id="fdDisposedToggle" onchange="toggleForwardModalDisposal(this.checked)" style="width: 16px; height: 16px; accent-color: #ef4444;">
                <span>Mark Case as Disposed / Decided</span>
              </label>
            </div>

            <!-- Interactive Success & WhatsApp Confirmation Card -->
            <div id="fdSuccessCard" class="fd-success-card" style="display: none;">
              <div class="fd-sc-banner">
                <div class="fd-sc-icon"><iconify-icon icon="lucide:check-circle-2"></iconify-icon></div>
                <div class="fd-sc-text">
                  <h4 id="fdSuccessTitle">Hearing Forwarded Successfully!</h4>
                  <p id="fdSuccessDetails">Next hearing date scheduled and synchronized.</p>
                </div>
              </div>
              <div class="fd-sc-actions">
                <button type="button" class="fd-sc-whatsapp-btn" onclick="sendForwardWhatsAppNotice()">
                  <iconify-icon icon="lucide:message-circle"></iconify-icon>
                  <span id="fdSuccessWaBtnText">Send WhatsApp Notice</span>
                </button>
                <button type="button" class="fd-sc-another-btn" onclick="forwardAnotherCaseInModal()">
                  <iconify-icon icon="lucide:refresh-cw"></iconify-icon> Forward Another Case
                </button>
                <button type="button" class="fd-sc-done-btn" onclick="closeForwardDateModal()">
                  <iconify-icon icon="lucide:check"></iconify-icon> Done
                </button>
              </div>
            </div>

            <!-- Direct WhatsApp Notification Option -->
            <div id="fdWhatsAppBar" class="fd-whatsapp-bar" style="display: none;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <iconify-icon icon="lucide:message-circle" style="font-size: 1.25rem; color: #25d366;"></iconify-icon>
                <div>
                  <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-heading);" id="fdWaClientName">Send WhatsApp Notice</div>
                  <div style="font-size: 0.7rem; color: var(--text-muted);" id="fdWaClientPhone">Direct Court Reminder</div>
                </div>
              </div>
              <button type="button" class="fd-whatsapp-btn" onclick="sendForwardWhatsAppNotice()">
                <iconify-icon icon="lucide:send"></iconify-icon> Notify Client
              </button>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="fd-modal-footer">
          <button type="button" class="fd-btn-secondary" onclick="closeForwardDateModal()">
            <iconify-icon icon="lucide:x"></iconify-icon> Cancel
          </button>
          <button type="button" class="fd-btn-primary" id="fdSubmitBtn" onclick="submitForwardDateModal()">
            <iconify-icon icon="lucide:send"></iconify-icon>
            <span id="fdSubmitBtnText">Forward Date</span>
          </button>
        </div>
      </div>
    </div>
`;

// ==============================================================================
// Case Full Details & History Rendering
// ==============================================================================

function ensureCaseModalsMounted() {
  let modalEl = document.getElementById("caseDetailsFullModal");
  if (modalEl) return modalEl;

  let container = document.getElementById("caseModalsContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "caseModalsContainer";
    document.body.appendChild(container);
  }

  if (window.__casebook_modals && window.__casebook_modals["case-modals"]) {
    container.innerHTML = window.__casebook_modals["case-modals"];
    container.dataset.loaded = "true";
  }
  return document.getElementById("caseDetailsFullModal");
}
if (typeof ensureCaseModalsMounted !== "undefined")
  window.ensureCaseModalsMounted = ensureCaseModalsMounted;

// Auto-mount as soon as DOM is ready or script executes
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ensureCaseModalsMounted);
  } else {
    ensureCaseModalsMounted();
  }
}

// Fallback helper utilities
if (typeof escapeHtml !== "function") {
  window.escapeHtml = function (text) {
    if (text === null || text === undefined) return "";
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };
}

if (typeof formatDateDMY !== "function") {
  window.formatDateDMY = function (dateInput) {
    if (!dateInput || dateInput === "—" || dateInput === "null" || dateInput === "undefined")
      return "—";
    try {
      const str = String(dateInput).trim();
      const parts = str.split("T")[0].split("-");
      if (parts.length === 3 && parts[0].length === 4) {
        return `${parts[2].padStart(2, "0")}/${parts[1].padStart(2, "0")}/${parts[0]}`;
      }
      return str;
    } catch (e) {
      return String(dateInput);
    }
  };
}

if (typeof toISODate !== "function") {
  window.toISODate = function (dateInput) {
    if (dateInput === null || dateInput === undefined) return null;
    const str = String(dateInput).trim();
    if (!str || str === "—" || str === "null" || str === "undefined") return null;
    const ymdMatch = str.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/);
    if (ymdMatch)
      return `${ymdMatch[1]}-${ymdMatch[2].padStart(2, "0")}-${ymdMatch[3].padStart(2, "0")}`;
    const dmyMatch = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
    if (dmyMatch)
      return `${dmyMatch[3]}-${dmyMatch[2].padStart(2, "0")}-${dmyMatch[1].padStart(2, "0")}`;
    const d = new Date(str);
    if (!isNaN(d.getTime())) {
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    }
    return null;
  };
}

if (typeof remarksToPlainText !== "function") {
  window.remarksToPlainText = function (raw) {
    if (!raw) return "";
    if (typeof raw === "string") return raw;
    if (Array.isArray(raw)) {
      return raw
        .map((r) => (typeof r === "string" ? r : r.text || r.remark || ""))
        .filter(Boolean)
        .join("\n");
    }
    if (typeof raw === "object") return raw.text || raw.remark || JSON.stringify(raw);
    return String(raw);
  };
}

if (typeof getDaysUntilHearing !== "function") {
  window.getDaysUntilHearing = function (dateStr) {
    if (
      !dateStr ||
      dateStr === "—" ||
      dateStr === "null" ||
      !String(dateStr).trim() ||
      String(dateStr).toLowerCase() === "undated"
    )
      return null;
    const target = new Date(dateStr);
    if (isNaN(target.getTime())) return null;
    const now = new Date();
    const dTarget = new Date(target.getFullYear(), target.getMonth(), target.getDate());
    const dNow = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.round((dTarget.getTime() - dNow.getTime()) / (1000 * 60 * 60 * 24));
  };
}


function parsePartiesFromCaseTitle(title) {
  if (!title || typeof title !== 'string') return null;
  const cleaned = title.trim();
  const match = cleaned.match(/^(.*?)\s+(?:vs\.?|v\/s|v\.)\s+(.*)$/i);
  if (match && match[1].trim() && match[2].trim()) {
    return {
      party1: match[1].trim(),
      party2: match[2].trim()
    };
  }
  return null;
}
if (typeof parsePartiesFromCaseTitle !== 'undefined') {
  window.parsePartiesFromCaseTitle = parsePartiesFromCaseTitle;
}

if (typeof getCaseCardDisplayData !== "function") {
  window.getCaseCardDisplayData = function (c) {
    if (!c) return {};
    const caseType = (c.caseType || "civil").toLowerCase();
    const caseNumber = c.caseNo || c.criminalCaseNumber || c.case_number || "—";
    const courtName = c.courtName || c.criminalCourtName || c.court || "District Court";

    let caseName = (c.caseName || c.title || "").trim();
    if (!caseName || caseName.toLowerCase() === "vs" || caseName.toLowerCase() === "vs.") {
      if (c.plaintiff && c.defendant) caseName = `${c.plaintiff} vs ${c.defendant}`;
      else if (c.petitioner && c.respondent) caseName = `${c.petitioner} vs ${c.respondent}`;
      else if (c.applicant && c.respondent) caseName = `${c.applicant} vs ${c.respondent}`;
      else if (c.plaintiff) caseName = `${c.plaintiff} vs Opposite`;
      else if (c.accusedName) caseName = `State vs ${c.accusedName}`;
      else if (c.victimName) caseName = `${c.victimName} vs Accused`;
      else caseName = "Untitled Matter";
    }

    const isDisposed =
      (c.caseStatus || c.status || "").toLowerCase().includes("dispose") ||
      Boolean(c.disposalComment || c.disposal_comment);
    const isUndated =
      !c.nextHearing ||
      c.nextHearing === "—" ||
      c.nextHearing === "null" ||
      !String(c.nextHearing).trim() ||
      String(c.nextHearing).toLowerCase() === "undated";

    let statusText = "Pending";
    let statusColor = "#ea580c";
    if (isDisposed) {
      statusText = "Disposed Off";
      statusColor = "#059669";
    } else if (isUndated) {
      statusText = "Undated";
      statusColor = "#d97706";
    }

    let nextDateText = "—";
    if (isDisposed) {
      nextDateText = c.disposalDate
        ? typeof formatDateDMY === "function"
          ? formatDateDMY(c.disposalDate)
          : c.disposalDate
        : "Disposed";
    } else if (isUndated) {
      nextDateText = "Undated";
    } else if (c.nextHearing) {
      nextDateText =
        typeof formatDateDMY === "function" ? formatDateDMY(c.nextHearing) : c.nextHearing;
    }

    const isCriminalSide = [
      "criminal",
      "state",
      "complaint",
      "misc_criminal",
      "misccriminal",
    ].includes(caseType);
    const appRole = isCriminalSide
      ? "Complainant / State"
      : caseType === "family"
        ? "Petitioner"
        : caseType === "revenue"
          ? "Applicant"
          : "Plaintiff";
    const resRole = isCriminalSide
      ? "Accused"
      : caseType === "family"
        ? "Respondent"
        : caseType === "revenue"
          ? "Opposite Party"
          : "Defendant";
    let appName = (c.plaintiff || c.petitioner || c.applicant || c.firstParty || c.victimName || "").trim();
    let resName = (c.defendant || c.respondent || c.oppositeParty || c.accusedName || "").trim();
    if (!appName || !resName) {
      const parsedFromTitle = parsePartiesFromCaseTitle(caseName);
      if (parsedFromTitle) {
        if (!appName) appName = parsedFromTitle.party1;
        if (!resName) resName = parsedFromTitle.party2;
      }
    }
    if (!appName) appName = "Not Specified";
    if (!resName) resName = "Not Specified";

    const daysUntil =
      typeof getDaysUntilHearing === "function" ? getDaysUntilHearing(c.nextHearing) : null;
    const isUrgent =
      !isDisposed && !isUndated && daysUntil !== null && daysUntil >= 0 && daysUntil <= 7;
    const urgentBadgeHtml = isUrgent
      ? '<span class="badge urgent" style="background:#fee2e2; color:#b91c1c; font-size:0.75rem; font-weight:700; padding:2px 8px; border-radius:9999px;">⚠️ Hearing Soon</span>'
      : "";

    return {
      caseType,
      caseNumber,
      courtName,
      caseName,
      isDisposed,
      isUndated,
      statusText,
      statusColor,
      nextDateText,
      appRole,
      appName,
      resRole,
      resName,
      isUrgent,
      urgentBadgeHtml,
      daysUntil,
    };
  };
}

function getCasePaisaTransactions(caseNumber) {
  if (!caseNumber) return [];
  const normalizedNo = String(caseNumber).trim().toLowerCase();
  const cleanKey = normalizedNo.replace(/[^a-z0-9]/g, "");

  let list = [];
  if (
    typeof window !== "undefined" &&
    Array.isArray(window.allPaisaTransactions) &&
    window.allPaisaTransactions.length > 0
  ) {
    list = window.allPaisaTransactions;
  } else if (
    typeof allPaisaTransactions !== "undefined" &&
    Array.isArray(allPaisaTransactions) &&
    allPaisaTransactions.length > 0
  ) {
    list = allPaisaTransactions;
  } else {
    try {
      const raw =
        typeof safeStorage !== "undefined" && safeStorage.get
          ? safeStorage.get("paisa_transactions")
          : (typeof localStorage !== "undefined" ? localStorage.getItem("paisa_transactions") : null);
      if (raw) {
        list = typeof raw === "string" ? JSON.parse(raw) : raw;
      }
    } catch (e) {}
    if ((!list || list.length === 0) && typeof window !== "undefined" && Array.isArray(window.allPaisaTransactions)) {
      list = window.allPaisaTransactions;
    }
  }

  if (!Array.isArray(list)) return [];

  return list
    .filter((t) => {
      const cNo = String(t.case_no || t.case_id || t.case_number || t.caseNo || "")
        .trim()
        .toLowerCase();
      if (!cNo) return false;
      if (cNo === normalizedNo) return true;
      if (cleanKey && cNo.replace(/[^a-z0-9]/g, "") === cleanKey) return true;
      if (normalizedNo.includes(cNo) || cNo.includes(normalizedNo)) return true;
      return false;
    })
    .sort((a, b) => new Date(b.date || b.created_at) - new Date(a.date || a.created_at));
}
if (typeof getCasePaisaTransactions !== "undefined")
  window.getCasePaisaTransactions = getCasePaisaTransactions;

function cdmQuickAddFee(flow) {
  const c = window.currentSelectedCase;
  const caseNumber = c ? c.caseNo || c.criminalCaseNumber || "" : "";
  const clientName = c
    ? c.clientName || c.criminalClientName || c.client || c.plaintiff || c.applicant || ""
    : "";

  closeCaseDetailsFullModal();
  if (typeof showTab === "function") {
    showTab("paisa");
  }

  setTimeout(() => {
    if (flow === "received") {
      if (typeof openPaisaReceivedModal === "function") {
        openPaisaReceivedModal();
        const clientInput = document.getElementById("paisaReceivedClientName");
        if (clientInput && clientName) clientInput.value = clientName;
        if (typeof applyPaisaLinkedCase === "function" && caseNumber) {
          applyPaisaLinkedCase(caseNumber, "received");
        }
      }
    } else {
      if (typeof openPaisaSpendModal === "function") {
        openPaisaSpendModal();
        const payeeInput = document.getElementById("paisaSpendPayeeName");
        if (payeeInput && clientName) payeeInput.value = clientName;
        if (typeof applyPaisaLinkedCase === "function" && caseNumber) {
          applyPaisaLinkedCase(caseNumber, "spent");
        }
      }
    }
  }, 300);
}
if (typeof cdmQuickAddFee !== "undefined") window.cdmQuickAddFee = cdmQuickAddFee;

function getCaseHearingHistory(caseNumber) {
  if (!caseNumber) return [];
  const normalized = caseNumber.trim().toLowerCase();
  const cleanKey = normalized.replace(/[^a-z0-9]/g, "");

  const records =
    typeof window !== "undefined" && Array.isArray(window.allHearingRecords)
      ? window.allHearingRecords
      : typeof allHearingRecords !== "undefined" && Array.isArray(allHearingRecords)
        ? allHearingRecords
        : [];
  const list = records.filter((h) => {
    const hNo = (h.case_number || "").trim().toLowerCase();
    if (hNo === normalized) return true;
    if (cleanKey && hNo.replace(/[^a-z0-9]/g, "") === cleanKey) return true;
    // Fallback: If case is Cr.Rev./129/2026 and hearing is Cri-Rev-
    if (
      (normalized === "cr.rev./129/2026" || normalized.includes("129/2026")) &&
      hNo === "cri-rev-"
    )
      return true;
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
  const emptyBox = document.getElementById("searchCaseDetailsEmpty");
  const contentBox = document.getElementById("searchCaseDetailsContent");
  const badge = document.getElementById("searchCaseTypeBadge");

  if (!caseObj) {
    if (emptyBox) emptyBox.classList.remove("hidden");
    if (contentBox) contentBox.classList.add("hidden");
    const addTodoBtn = document.getElementById("searchAddTodoBtn");
    if (addTodoBtn) addTodoBtn.style.display = "none";
    if (badge) {
      badge.textContent = "Select a Case";
      badge.className = "case-badge";
    }
    return;
  }

  if (emptyBox) emptyBox.classList.add("hidden");
  if (contentBox) contentBox.classList.remove("hidden");

  const caseNumber = caseObj.caseNo || caseObj.criminalCaseNumber || "—";
  const rawType = (caseObj.caseType || "civil").toLowerCase().trim();
  const isCriminal = rawType === "state" || rawType === "criminal" || rawType === "misc_criminal";
  const isFamily = rawType === "family";
  const isRevenue = rawType === "revenue";

  let typeBadgeLabel = "CIVIL";
  if (isCriminal) typeBadgeLabel = "STATE (CRIMINAL)";
  else if (isFamily) typeBadgeLabel = "FAMILY";
  else if (isRevenue) typeBadgeLabel = "REVENUE";
  else if (rawType === "complaint") typeBadgeLabel = "COMPLAINT";
  else typeBadgeLabel = rawType.replace("_", " ").toUpperCase();

  if (badge) {
    badge.textContent = typeBadgeLabel;
    badge.className = `case-badge ${rawType}`;
  }

  // Build accurate title
  let caseTitle = (caseObj.caseName || "").trim();
  if (!caseTitle || caseTitle.toLowerCase() === "vs" || caseTitle.toLowerCase() === "vs.") {
    if (caseObj.plaintiff && caseObj.defendant) {
      caseTitle = `${caseObj.plaintiff} vs ${caseObj.defendant}`;
    } else if (caseObj.victimName && caseObj.accusedName) {
      caseTitle = `${caseObj.victimName} vs ${caseObj.accusedName}`;
    } else if (caseObj.accusedName) {
      caseTitle = `State vs ${caseObj.accusedName}`;
    } else if (caseObj.plaintiff) {
      caseTitle = `${caseObj.plaintiff} vs Opposite`;
    } else {
      caseTitle = caseNumber !== "—" ? `Case ${caseNumber}` : "Untitled Matter";
    }
  }

  const titleEl = document.getElementById("detailCaseTitle");
  if (titleEl) titleEl.textContent = caseTitle;

  const setVal = (id, val, fallback = "—") => {
    const el = document.getElementById(id);
    if (el) el.textContent = val || fallback;
  };

  const courtName = caseObj.courtName || caseObj.criminalCourtName || "District Court";
  setVal("detailCaseNo", caseNumber);
  setVal("detailCourtName", courtName);

  const isDisposed = (caseObj.caseStatus || "").toLowerCase().includes("dispose");
  const isUndated =
    !caseObj.nextHearing ||
    caseObj.nextHearing === "—" ||
    caseObj.nextHearing === "null" ||
    !caseObj.nextHearing.trim() ||
    caseObj.nextHearing.toLowerCase() === "undated";

  const statusBadgeEl = document.getElementById("detailCaseStatusBadge");
  if (statusBadgeEl) {
    if (isDisposed) {
      statusBadgeEl.className = "status-badge disposed";
      statusBadgeEl.innerHTML = '<iconify-icon icon="lucide:check-circle-2" style="vertical-align:middle; margin-right:4px; font-size:13px;"></iconify-icon> Disposed Off';
    } else if (isUndated) {
      statusBadgeEl.className = "status-badge undated";
      statusBadgeEl.style = "background:#fef3c7; color:#92400e; border:1px solid #fde68a;";
      statusBadgeEl.innerHTML = '<iconify-icon icon="lucide:calendar-x" style="vertical-align:middle; margin-right:4px; font-size:13px;"></iconify-icon> Undated';
    } else {
      statusBadgeEl.className = "status-badge pending";
      statusBadgeEl.style = "";
      statusBadgeEl.innerHTML = '<iconify-icon icon="lucide:clock" style="vertical-align:middle; margin-right:4px; font-size:13px;"></iconify-icon> Pending';
    }
  }

  setVal("detailNextHearing", isUndated ? "—" : formatDateDMY(caseObj.nextHearing));
  setVal(
    "detailHearingProcess",
    isUndated ? "Undated" : caseObj.hearingProcess || "Scheduled Hearing",
  );

  // Determine previous hearing
  const caseHistory = getCaseHearingHistory(caseNumber);
  const currentNext =
    caseObj.nextHearing && caseObj.nextHearing !== "—" ? caseObj.nextHearing : null;
  const currentNextISO = toISODate(caseObj.nextHearing);
  const todayISO = toISODate(new Date());

  const prevHearings = caseHistory.filter((h) => {
    const hISO = toISODate(h.hearing_date);
    if (currentNextISO && hISO === currentNextISO) return false;
    // A future hearing is an upcoming date, never a "previous" hearing
    if (hISO && hISO > todayISO) return false;
    return true;
  });
  const latestPrev = prevHearings[0];
  const prevHearingDate = latestPrev ? latestPrev.hearing_date : caseObj.previousHearing || null;
  const prevProcess = latestPrev ? latestPrev.process : caseObj.previousProcess || null;

  // 1. CARD 1: Court & Case Info (Only related & present fields)
  const courtCardBody = document.getElementById("detailCourtCardBody");
  if (courtCardBody) {
    const filingDate = caseObj.filingDate || caseObj.crimeFilingDate;
    const filingDateFormatted = filingDate && filingDate !== "—" ? formatDateDMY(filingDate) : null;
    const year = caseObj.caseYear || caseObj.crimeYear || null;

    let props = "";
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
    if (prevHearingDate && prevHearingDate !== "—") {
      props += `
        <div class="dossier-prop">
          <span class="prop-label">Previous Hearing</span>
          <span class="prop-val">${escapeHtml(formatDateDMY(prevHearingDate))}</span>
        </div>
      `;
    }
    if (prevProcess && prevProcess !== "—") {
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
  const partiesCardBody = document.getElementById("detailPartiesCardBody");
  if (partiesCardBody) {
    let props = "";

    const isMiscCriminal = rawType === "misc_criminal" || rawType === "misccriminal" || (caseNumber && String(caseNumber).toUpperCase().includes("CRI.MISC"));
    const parsedObjParties = parsePartiesFromCaseTitle(caseTitle || caseObj.caseName);

    if (isMiscCriminal) {
      const applicant = caseObj.applicant || caseObj.plaintiff || (parsedObjParties ? parsedObjParties.party1 : "") || caseObj.clientName || "Applicant";
      const opposite = caseObj.oppositeParty || caseObj.defendant || caseObj.accusedName || (parsedObjParties ? parsedObjParties.party2 : "") || "Opposite Party";
      props += `
        <div class="dossier-prop">
          <span class="prop-label">Applicant / Petitioner</span>
          <span class="prop-val font-semibold text-slate-800">${escapeHtml(applicant)}</span>
        </div>
        <div class="dossier-prop">
          <span class="prop-label">Opposite Party / Respondent</span>
          <span class="prop-val font-semibold text-slate-800">${escapeHtml(opposite)}</span>
        </div>
      `;
      if (caseObj.policeStation) {
        props += `
          <div class="dossier-prop">
            <span class="prop-label">Police Station</span>
            <span class="prop-val"><iconify-icon icon="lucide:shield" style="vertical-align:middle; margin-right:4px; font-size:13px;"></iconify-icon>${escapeHtml(caseObj.policeStation)}</span>
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
    } else if (isCriminal) {
      let stateParty = caseObj.firstParty || caseObj.victimName || (parsedObjParties ? parsedObjParties.party1 : "") || "State of U.P.";
      const isState = stateParty.toLowerCase().startsWith("state") || stateParty.toLowerCase().includes("prosecution");
      const pLabel = isState ? "Prosecution / State" : "Complainant / Applicant";
      const rLabel = isState ? "Accused Person(s)" : "Opposite Party / Accused";
      let accParty = caseObj.accusedName || (parsedObjParties ? parsedObjParties.party2 : "") || (!isState ? "Accused" : "");

      props += `
        <div class="dossier-prop">
          <span class="prop-label">${pLabel}</span>
          <span class="prop-val font-semibold text-slate-800">${escapeHtml(stateParty)}</span>
        </div>
      `;
      if (accParty) {
        props += `
          <div class="dossier-prop">
            <span class="prop-label">${rLabel}</span>
            <span class="prop-val font-semibold text-slate-900">${escapeHtml(accParty)}</span>
          </div>
        `;
      }
      if (caseObj.policeStation) {
        props += `
          <div class="dossier-prop">
            <span class="prop-label">Police Station</span>
            <span class="prop-val"><iconify-icon icon="lucide:shield" style="vertical-align:middle; margin-right:4px; font-size:13px;"></iconify-icon>${escapeHtml(caseObj.policeStation)}</span>
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
            <span class="prop-val font-semibold">${escapeHtml([caseObj.khataNo ? `Khata: ${caseObj.khataNo}` : "", caseObj.gataNo ? `Gata: ${caseObj.gataNo}` : ""].filter(Boolean).join(" | "))}</span>
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
  const clientCardBody = document.getElementById("detailClientCardBody");
  if (clientCardBody) {
    const clientName = caseObj.clientName || caseObj.criminalClientName;
    const clientPhone = caseObj.clientNumber || caseObj.criminalClientNumber;
    const docLink = caseObj.docLink || caseObj.doc_link;

    let statusBadgeHtml = "";
    if (isDisposed) {
      statusBadgeHtml =
        '<span class="status-badge disposed"><iconify-icon icon="lucide:check-circle-2" style="vertical-align:middle; margin-right:4px; font-size:13px;"></iconify-icon> Disposed Off</span>';
    } else if (isUndated) {
      statusBadgeHtml =
        '<span class="status-badge undated" style="background:#fef3c7; color:#92400e; border:1px solid #fde68a;"><iconify-icon icon="lucide:calendar-x" style="vertical-align:middle; margin-right:4px; font-size:13px;"></iconify-icon> Undated</span>';
    } else {
      statusBadgeHtml =
        '<span class="status-badge pending"><iconify-icon icon="lucide:clock" style="vertical-align:middle; margin-right:4px; font-size:13px;"></iconify-icon> Pending</span>';
    }

    let props = "";
    props += `
      <div class="dossier-prop">
        <span class="prop-label">Client Name</span>
        <span class="prop-val font-semibold text-teal-800">${escapeHtml(clientName || "—")}</span>
      </div>
    `;
    if (clientPhone) {
      props += `
        <div class="dossier-prop">
          <span class="prop-label">Client Contact</span>
          <span class="prop-val"><a href="tel:${escapeHtml(clientPhone)}" style="color:#2563eb; text-decoration:none;"><iconify-icon icon="lucide:phone" style="vertical-align:middle; margin-right:4px; font-size:13px;"></iconify-icon>${escapeHtml(clientPhone)}</a></span>
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
          <span class="prop-val"><a href="${cleanDoc}" target="_blank" rel="noopener noreferrer" class="doc-link-pill"><iconify-icon icon="lucide:external-link" style="vertical-align:middle; margin-right:4px; font-size:13px;"></iconify-icon>Open Document</a></span>
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
  const remarkEl = document.getElementById("detailCaseRemark");
  if (remarkEl) {
    const remark = caseObj.remark || caseObj.remarks || "";
    const norm = normalizeRemarksData(remark);
    if (norm.type !== "empty") {
      remarkEl.innerHTML = renderStructuredRemarks(remark);
    } else {
      remarkEl.innerHTML =
        '<span style="color:#94a3b8; font-style:italic;">No co-parties or remarks recorded for this case.</span>';
    }
  }

  const disposalEl = document.getElementById("detailCaseDisposalComment");
  if (disposalEl) {
    const disposalComment = caseObj.disposalComment || caseObj.disposal_comment || "";
    if (disposalComment && disposalComment.trim()) {
      disposalEl.innerHTML = `<span style="color:#065f46; font-weight:600;"><iconify-icon icon="lucide:scale" style="vertical-align:middle; margin-right:4px; font-size:13px;"></iconify-icon>${escapeHtml(disposalComment.trim())}</span>`;
    } else {
      disposalEl.innerHTML =
        '<span style="color:#94a3b8; font-style:italic;">No disposal comment recorded yet.</span>';
    }
  }

  // 5. PROCEEDINGS & HEARING HISTORY (Dynamic Inline Table)
  const history = getCaseHearingHistory(caseNumber);
  const events = [];

  // Recorded hearings from history
  history.forEach((h) => {
    const isNext = Boolean(currentNextISO && toISODate(h.hearing_date) === currentNextISO);
    events.push({
      date: h.hearing_date,
      process: h.process || "Court Hearing",
      type: isNext ? "next" : "prev",
      action: h.action_taken || h.remarks || "Court proceedings conducted.",
    });
  });

  // Add next hearing milestone if scheduled
  if (currentNext && !events.some((e) => toISODate(e.date) === currentNextISO)) {
    events.push({
      date: currentNext,
      process: caseObj.hearingProcess || "Scheduled Hearing",
      type: "next",
      action: `Next appearance scheduled at ${courtName}`,
    });
  }

  // Add previous hearing milestone if recorded on caseObj
  if (
    caseObj.previousHearing &&
    caseObj.previousHearing !== "—" &&
    !events.some((e) => e.date === caseObj.previousHearing)
  ) {
    events.push({
      date: caseObj.previousHearing,
      process: caseObj.previousProcess || "Previous Stage",
      type: "prev",
      action: `Previous proceedings recorded at ${courtName}`,
    });
  }

  // Add filing date milestone
  const filingDateVal = caseObj.filingDate || caseObj.crimeFilingDate;
  if (filingDateVal && filingDateVal !== "—" && !events.some((e) => e.date === filingDateVal)) {
    events.push({
      date: filingDateVal,
      process: "Case Inception & Filing",
      type: "filing",
      action: `Case instituted and registered at ${courtName}`,
    });
  }

  // Sort newest first
  events.sort((a, b) => {
    const da = new Date(a.date);
    const db = new Date(b.date);
    return db - da;
  });

  const inlineTbody = document.getElementById("detailInlineHistoryTableBody");
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
      inlineTbody.innerHTML = events
        .map((ev, idx) => {
          let badgeHtml = "";
          if (ev.type === "next") {
            badgeHtml =
              '<span class="history-badge-next" style="background:#e6f4ea; color:#137333; padding:3px 10px; border-radius:12px; font-size:11px; font-weight:600;"><iconify-icon icon="lucide:clock" style="vertical-align:middle; margin-right:4px; font-size:12px;"></iconify-icon> Upcoming Hearing</span>';
          } else if (ev.type === "filing") {
            badgeHtml =
              '<span class="history-badge-filing" style="background:#e8f0fe; color:#1a73e8; padding:3px 10px; border-radius:12px; font-size:11px; font-weight:600;"><iconify-icon icon="lucide:file-signature" style="vertical-align:middle; margin-right:4px; font-size:12px;"></iconify-icon> Initial Filing</span>';
          } else {
            badgeHtml =
              '<span class="history-badge-prev" style="background:#f1f5f9; color:#475569; padding:3px 10px; border-radius:12px; font-size:11px; font-weight:600;"><iconify-icon icon="lucide:check-circle-2" style="vertical-align:middle; margin-right:4px; font-size:12px;"></iconify-icon> Past Hearing</span>';
          }

          return `
          <tr class="cdm-history-row">
            <td data-label="#" style="text-align: center; font-weight: 600; color: #64748b;">#${idx + 1}</td>
            <td data-label="Hearing Date" style="white-space: nowrap; font-weight: 600;">${formatDateDMY(ev.date)}</td>
            <td data-label="Process / Stage" style="font-weight: 600; color: #1e40af;">${escapeHtml(ev.process || "—")}</td>
            <td data-label="Status">${badgeHtml}</td>
            <td data-label="Court Action & Proceedings">${escapeHtml(ev.action || "Court appearance & proceedings recorded.")}</td>
          </tr>
        `;
        })
        .join("");
    }
  }

  if (typeof currentSelectedCase !== "undefined") {
    currentSelectedCase = caseObj;
  }
  if (typeof window !== "undefined") {
    window.currentSelectedCase = caseObj;
  }

  const editBtn = document.getElementById("detailEditBtn");
  if (editBtn) {
    editBtn.onclick = () => {
      showTab("update");
      const searchInput = document.getElementById("updateSearchInput");
      if (searchInput) {
        searchInput.value = caseObj.caseNo || caseObj.criminalCaseNumber || "";
      }
      loadCaseForUpdate(caseObj.caseNo || caseObj.criminalCaseNumber);
    };
  }

  const hearingBtn = document.getElementById("detailHearingBtn");
  if (hearingBtn) {
    hearingBtn.onclick = () => {
      closeCaseDetailsFullModal();
      if (typeof openForwardDateModal === "function") {
        openForwardDateModal(caseObj.caseNo || caseObj.criminalCaseNumber || "");
      } else if (typeof showTab === "function") {
        showTab("hearing");
        const caseNoInput = document.getElementById("hearingCaseNo");
        if (caseNoInput) {
          caseNoInput.value = caseObj.caseNo || caseObj.criminalCaseNumber || "";
        }
      }
    };
  }

  const transferBtn = document.getElementById("detailTransferBtn");
  if (transferBtn) {
    transferBtn.onclick = () => {
      openTransferForCase(caseObj.caseNo || caseObj.criminalCaseNumber || "");
    };
  }

  const whatsappBtn = document.getElementById("detailWhatsAppBtn");
  if (whatsappBtn) {
    whatsappBtn.onclick = () => {
      sendWhatsAppHearingNotice(caseObj);
    };
  }

  // Render Court Transfer History section in dossier
  if (typeof renderCaseTransferHistory === "function") {
    renderCaseTransferHistory(caseNumber, caseObj);
  }

  const historyBtn = document.getElementById("detailHistoryBtn");
  if (historyBtn) {
    historyBtn.onclick = () => {
      openCaseHistoryModal(caseObj);
    };
  }

  const printBtn = document.getElementById("detailPrintBtn");
  if (printBtn) {
    printBtn.onclick = () => {
      printCurrentCaseDossier(caseObj);
    };
  }

  const addTodoBtn = document.getElementById("searchAddTodoBtn");
  if (addTodoBtn) {
    addTodoBtn.style.display = "inline-flex";
    addTodoBtn.onclick = () => {
      openTodoForCase(caseObj.caseNo || caseObj.criminalCaseNumber || "");
    };
  }
}
if (typeof renderSelectedCaseDetails !== "undefined") {
  window.renderSelectedCaseDetails = renderSelectedCaseDetails;
}

function openCaseHistoryModal(caseObj) {
  if (!caseObj) return;

  const modal = document.getElementById("caseHistoryModal");
  if (!modal) return;

  const caseNumber = caseObj.caseNo || caseObj.criminalCaseNumber || "—";
  const caseName =
    caseObj.caseName ||
    (caseObj.plaintiff
      ? `${caseObj.plaintiff} vs ${caseObj.defendant}`
      : caseObj.victimName
        ? `${caseObj.victimName} vs ${caseObj.accusedName}`
        : "—");
  const caseType = (caseObj.caseType || "civil").toUpperCase();
  const courtName = caseObj.courtName || caseObj.criminalCourtName || "—";
  const nextHearing = formatDateDMY(caseObj.nextHearing);
  const nextProcess = caseObj.hearingProcess || "—";

  const modalCaseNo = document.getElementById("modalCaseNo");
  const modalCaseTitle = document.getElementById("modalCaseTitle");
  const modalCourtName = document.getElementById("modalCourtName");
  const modalNextHearingBadge = document.getElementById("modalNextHearingBadge");
  const searchInput = document.getElementById("chmHistorySearchInput");

  if (modalCaseNo) modalCaseNo.textContent = caseNumber;
  if (modalCaseTitle) modalCaseTitle.textContent = caseName;
  if (modalCourtName) modalCourtName.textContent = courtName;
  if (modalNextHearingBadge) {
    modalNextHearingBadge.textContent =
      nextHearing !== "—" ? `${nextHearing} (${nextProcess})` : "Not Scheduled";
    modalNextHearingBadge.className = "chm-hero-next-date";
  }
  if (searchInput) {
    searchInput.value = "";
  }

  // Retrieve hearings for this case
  const history = getCaseHearingHistory(caseNumber);
  const currentNext =
    caseObj.nextHearing && caseObj.nextHearing !== "—" ? caseObj.nextHearing : null;

  // Build unified hearing events list
  const events = [];

  // Add recorded hearings
  const currentNextISO = toISODate(currentNext);
  history.forEach((h) => {
    const isNext = Boolean(currentNextISO && toISODate(h.hearing_date) === currentNextISO);
    events.push({
      date: h.hearing_date,
      process: h.process || "—",
      type: isNext ? "next" : "prev",
      action: h.action_taken || h.remarks || "Court proceedings conducted.",
    });
  });

  // If case has next hearing not already present in events
  if (currentNext && !events.some((e) => toISODate(e.date) === currentNextISO)) {
    events.push({
      date: currentNext,
      process: caseObj.hearingProcess || "Scheduled Hearing",
      type: "next",
      action: `Next hearing appearance at ${courtName}`,
    });
  }

  // If case has previousHearing stored on case object not already present
  if (
    caseObj.previousHearing &&
    caseObj.previousHearing !== "—" &&
    !events.some((e) => e.date === caseObj.previousHearing)
  ) {
    events.push({
      date: caseObj.previousHearing,
      process: caseObj.previousProcess || "Previous Stage",
      type: "prev",
      action: `Previous proceedings recorded at ${courtName}`,
    });
  }

  // Include filing date milestone if available
  const filingDate = caseObj.filingDate || caseObj.crimeFilingDate;
  if (filingDate && filingDate !== "—") {
    events.push({
      date: filingDate,
      process: "Case Inception & Filing",
      type: "filing",
      action: `Case instituted and registered at ${courtName}`,
    });
  }

  // Sort events descending (newest first)
  events.sort((a, b) => {
    const da = new Date(a.date);
    const db = new Date(b.date);
    return db - da;
  });

  // Store for quick filtering and printing
  window._activeCaseHistoryEvents = events;
  window._activeCaseHistoryCase = caseObj;

  renderCaseHistoryRows(events);

  // Hook up update hearing button in modal
  const updateBtn = document.getElementById("modalUpdateHearingBtn");
  if (updateBtn) {
    updateBtn.onclick = () => {
      closeCaseHistoryModal();
      openUpdateHearingForCase(caseNumber);
    };
  }

  modal.classList.remove("hidden");
}

function renderCaseHistoryRows(eventsList) {
  const tbody = document.getElementById("caseHistoryTableBody");
  const emptyBox = document.getElementById("caseHistoryEmpty");
  if (!tbody) return;

  if (!eventsList || eventsList.length === 0) {
    tbody.innerHTML = "";
    if (emptyBox) emptyBox.classList.remove("hidden");
    return;
  }

  if (emptyBox) emptyBox.classList.add("hidden");

  const esc = typeof escapeHtml === "function" ? escapeHtml : str => String(str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  tbody.innerHTML = eventsList
    .map((ev, idx) => {
      const safeAction = esc(ev.action || "");
      const rawAttr = String(ev.action || "").replace(/"/g, '&quot;');

      return `
      <tr class="cdm-history-row chm-table-row">
        <td data-label="#"><span class="chm-seq-pill">${idx + 1}</span></td>
        <td data-label="Hearing Date" class="chm-date-td">
          <div class="chm-date-box">
            <iconify-icon icon="lucide:calendar" class="chm-date-icon" style="vertical-align:middle; margin-right:4px; font-size:13px;"></iconify-icon>
            <strong>${formatDateDMY(ev.date)}</strong>
          </div>
        </td>
        <td data-label="Process / Stage" class="chm-stage-td">
          <span class="chm-stage-chip">${esc(ev.process)}</span>
        </td>
        <td data-label="Court Action & Proceedings" class="chm-action-td">
          <div class="chm-action-cell">
            <div class="chm-action-text">${safeAction}</div>
            <button type="button" class="chm-copy-btn" title="Copy Proceedings" data-text="${rawAttr}" onclick="copyHearingActionText(this)">
              <iconify-icon icon="lucide:copy" style="font-size:14px;"></iconify-icon>
            </button>
          </div>
        </td>
      </tr>
    `;
    })
    .join("");
}

function filterCaseHistoryTable(query) {
  const q = String(query || "").trim().toLowerCase();
  const allEvents = window._activeCaseHistoryEvents || [];
  if (!q) {
    renderCaseHistoryRows(allEvents);
    return;
  }
  const filtered = allEvents.filter((ev) => {
    const dStr = formatDateDMY(ev.date).toLowerCase();
    const pStr = String(ev.process || "").toLowerCase();
    const aStr = String(ev.action || "").toLowerCase();
    return dStr.includes(q) || pStr.includes(q) || aStr.includes(q);
  });
  renderCaseHistoryRows(filtered);
}

function copyHearingActionText(btn) {
  if (!btn) return;
  const text = btn.getAttribute("data-text") || "";
  if (!text) return;

  if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).catch(() => {});
  }

  const icon = btn.querySelector("iconify-icon") || btn.querySelector("i");
  if (icon) {
    if (icon.tagName && icon.tagName.toLowerCase() === "iconify-icon") {
      icon.setAttribute("icon", "lucide:check");
    } else {
      icon.className = "lucide lucide-check";
    }
    btn.style.color = "#10b981";
    setTimeout(() => {
      if (icon.tagName && icon.tagName.toLowerCase() === "iconify-icon") {
        icon.setAttribute("icon", "lucide:copy");
      } else {
        icon.className = "lucide lucide-copy";
      }
      btn.style.color = "";
    }, 1500);
  }

  if (typeof showToastNotification === "function") {
    showToastNotification("Proceedings text copied to clipboard.", 1800);
  }
}

function printCaseHearingHistory() {
  const caseObj = window._activeCaseHistoryCase;
  const events = window._activeCaseHistoryEvents || [];
  if (!caseObj) return;

  const caseNo = caseObj.caseNo || caseObj.criminalCaseNumber || "Case";
  const caseTitle =
    caseObj.caseName ||
    (caseObj.plaintiff
      ? `${caseObj.plaintiff} vs ${caseObj.defendant}`
      : caseObj.victimName
        ? `${caseObj.victimName} vs ${caseObj.accusedName}`
        : "Case Record");
  const courtName = caseObj.courtName || caseObj.criminalCourtName || "Court";

  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Please allow popups to print case hearing dossier.");
    return;
  }

  const rowsHtml = events.map((ev, i) => `
    <tr>
      <td style="padding: 8px; border: 1px solid #ccc; text-align: center;">${i + 1}</td>
      <td style="padding: 8px; border: 1px solid #ccc;"><strong>${formatDateDMY(ev.date)}</strong></td>
      <td style="padding: 8px; border: 1px solid #ccc;">${ev.process}</td>
      <td style="padding: 8px; border: 1px solid #ccc;">${ev.action}</td>
    </tr>
  `).join("");

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Hearing History - ${caseNo}</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 24px; color: #111; }
        h1 { font-size: 20px; margin-bottom: 4px; }
        .meta { font-size: 13px; color: #555; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 12px; }
        th { background: #f1f5f9; padding: 8px; border: 1px solid #ccc; text-align: left; }
      </style>
    </head>
    <body>
      <h1>Case Hearing & Process History Dossier</h1>
      <div class="meta">
        <strong>${caseTitle}</strong> | Case No: <strong>${caseNo}</strong> | Court: <strong>${courtName}</strong>
      </div>
      <table>
        <thead>
          <tr>
            <th style="width: 40px; text-align: center;">#</th>
            <th style="width: 130px;">Hearing Date</th>
            <th style="width: 180px;">Process / Stage</th>
            <th>Court Action & Proceedings</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
      <script>
        window.onload = function() { window.print(); };
      </script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

function closeCaseHistoryModal() {
  const modal = document.getElementById("caseHistoryModal");
  if (modal) modal.classList.add("hidden");
}

function openCaseHistoryModalByNo(caseNo) {
  if (!caseNo) return;
  const q = caseNo.trim().toLowerCase();
  const casesList =
    typeof allCaseRecords !== "undefined" && Array.isArray(allCaseRecords)
      ? allCaseRecords
      : typeof window !== "undefined" && Array.isArray(window.allCaseRecords)
        ? window.allCaseRecords
        : [];
  const found = casesList.find((c) => {
    const num1 = (c.caseNo || "").toLowerCase();
    const num2 = (c.criminalCaseNumber || "").toLowerCase();
    return num1 === q || num2 === q;
  });
  if (found) {
    openCaseHistoryModal(found);
  } else {
    alert(`Case "${caseNo}" details could not be found.`);
  }
}

if (typeof openCaseHistoryModal !== "undefined") window.openCaseHistoryModal = openCaseHistoryModal;
if (typeof openCaseHistoryModalByNo !== "undefined")
  window.openCaseHistoryModalByNo = openCaseHistoryModalByNo;
if (typeof closeCaseHistoryModal !== "undefined")
  window.closeCaseHistoryModal = closeCaseHistoryModal;
if (typeof getCaseHearingHistory !== "undefined")
  window.getCaseHearingHistory = getCaseHearingHistory;
if (typeof filterCaseHistoryTable !== "undefined")
  window.filterCaseHistoryTable = filterCaseHistoryTable;
if (typeof copyHearingActionText !== "undefined")
  window.copyHearingActionText = copyHearingActionText;
if (typeof printCaseHearingHistory !== "undefined")
  window.printCaseHearingHistory = printCaseHearingHistory;

function toggleFooterMoreMenu(e) {
  if (e) e.stopPropagation();
  const menu = document.getElementById("footerMoreMenu");
  if (menu) menu.classList.toggle("open");
}
if (typeof toggleFooterMoreMenu !== "undefined") window.toggleFooterMoreMenu = toggleFooterMoreMenu;

document.addEventListener("click", function (e) {
  const menu = document.getElementById("footerMoreMenu");
  const btn = document.getElementById("footerMoreBtn");
  if (menu && menu.classList.contains("open")) {
    if (!menu.contains(e.target) && (!btn || !btn.contains(e.target))) {
      menu.classList.remove("open");
    }
  }
});

function copyCdmCaseNumber() {
  const el = document.getElementById("cdmCaseNo");
  const btn = document.getElementById("cdmCopyCaseNoBtn");
  if (!el) return;
  const text = (el.textContent || "").trim();
  if (!text || text === "—") return;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        if (btn) {
          const orig = btn.innerHTML;
          btn.innerHTML =
            '<svg class="lucide lucide-check" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:13px;height:13px;"><path d="M20 6 9 17l-5-5"/></svg> <span>Copied!</span>';
          btn.style.borderColor = "#10b981";
          btn.style.color = "#10b981";
          setTimeout(() => {
            btn.innerHTML = orig;
            btn.style.borderColor = "";
            btn.style.color = "";
          }, 1500);
        }
      })
      .catch((err) => {
        console.warn("Clipboard write failed, fallback used", err);
      });
  }
}
if (typeof copyCdmCaseNumber !== "undefined") window.copyCdmCaseNumber = copyCdmCaseNumber;

function cdmTriggerWhatsApp() {
  const c = window.currentSelectedCase;
  if (!c) return;
  if (typeof sendWhatsAppHearingNotice === "function") {
    sendWhatsAppHearingNotice(c);
  }
}
if (typeof cdmTriggerWhatsApp !== "undefined") window.cdmTriggerWhatsApp = cdmTriggerWhatsApp;

function closeCaseDetailsFullModal() {
  const cdmMenu = document.getElementById("cdmMoreMenu");
  if (cdmMenu) {
    cdmMenu.classList.remove("open");
    cdmMenu.classList.remove("show");
  }
  const m = document.getElementById("caseDetailsFullModal");
  if (m) {
    m.classList.add("hidden");
    m.classList.remove("active");
    m.style.display = "none";
  }
  const menu = document.getElementById("footerMoreMenu");
  if (menu) menu.classList.remove("open");
  if (typeof document !== "undefined" && document.body) {
    document.body.style.overflow = "";
  }
}
if (typeof closeCaseDetailsFullModal !== "undefined")
  window.closeCaseDetailsFullModal = closeCaseDetailsFullModal;

function cdmScrollToSection(sectionId, btn) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (btn && btn.parentElement) {
      btn.parentElement.querySelectorAll('.cdm-nav-chip').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
    }
  }
}
if (typeof cdmScrollToSection !== "undefined")
  window.cdmScrollToSection = cdmScrollToSection;


function getCaseTransferHistory(caseNumber) {
  if (!caseNumber) return [];
  const normalizedNo = String(caseNumber).trim().toLowerCase();
  const cleanKey = normalizedNo.replace(/[^a-z0-9]/g, "");

  let list = [];
  if (typeof window !== "undefined" && Array.isArray(window.allCaseTransfers) && window.allCaseTransfers.length > 0) {
    list = window.allCaseTransfers;
  } else if (typeof window !== "undefined" && Array.isArray(window.allTransferRecords) && window.allTransferRecords.length > 0) {
    list = window.allTransferRecords;
  } else if (typeof allCaseTransfers !== "undefined" && Array.isArray(allCaseTransfers) && allCaseTransfers.length > 0) {
    list = allCaseTransfers;
  } else {
    try {
      const raw = typeof localStorage !== "undefined" ? localStorage.getItem("case_transfers_backup") : null;
      if (raw) list = typeof raw === "string" ? JSON.parse(raw) : raw;
    } catch (e) {}
  }

  if (!Array.isArray(list)) return [];

  return list
    .filter((t) => {
      const cNo = String(t.case_number || t.caseNo || t.case_no || "").trim().toLowerCase();
      if (!cNo) return false;
      if (cNo === normalizedNo) return true;
      if (cleanKey && cNo.replace(/[^a-z0-9]/g, "") === cleanKey) return true;
      if (normalizedNo.includes(cNo) || cNo.includes(normalizedNo)) return true;
      return false;
    })
    .sort((a, b) => new Date(b.transfer_date || b.transferDate || b.created_at || 0) - new Date(a.transfer_date || a.transferDate || a.created_at || 0));
}
if (typeof getCaseTransferHistory !== "undefined") {
  window.getCaseTransferHistory = getCaseTransferHistory;
}

function getCaseTasksHistory(caseNumber) {
  if (!caseNumber) return [];
  const normalizedNo = String(caseNumber).trim().toLowerCase();
  const cleanKey = normalizedNo.replace(/[^a-z0-9]/g, "");

  let list = [];
  if (typeof window !== "undefined" && Array.isArray(window.caseTasks) && window.caseTasks.length > 0) {
    list = window.caseTasks;
  } else if (typeof caseTasks !== "undefined" && Array.isArray(caseTasks) && caseTasks.length > 0) {
    list = caseTasks;
  } else {
    try {
      const raw = typeof safeStorage !== "undefined" && safeStorage.get
        ? safeStorage.get("cmCaseTasks")
        : (typeof localStorage !== "undefined" ? localStorage.getItem("cmCaseTasks") : null);
      if (raw) list = typeof raw === "string" ? JSON.parse(raw) : raw;
    } catch (e) {}
  }

  if (!Array.isArray(list)) return [];

  return list
    .filter((t) => {
      const cNo = String(t.caseNo || t.case_number || t.caseNumber || "").trim().toLowerCase();
      if (!cNo) return false;
      if (cNo === normalizedNo) return true;
      if (cleanKey && cNo.replace(/[^a-z0-9]/g, "") === cleanKey) return true;
      if (normalizedNo.includes(cNo) || cNo.includes(normalizedNo)) return true;
      return false;
    })
    .sort((a, b) => new Date(b.deadlineDate || b.deadline_date || b.created_at || b.createdAt || 0) - new Date(a.deadlineDate || a.deadline_date || a.created_at || a.createdAt || 0));
}
if (typeof getCaseTasksHistory !== "undefined") {
  window.getCaseTasksHistory = getCaseTasksHistory;
}

function renderCaseTransferHistory(caseNumber, caseObj) {
  const transferSection = document.getElementById("cdmTransferSection");
  const transferTableBody = document.getElementById("cdmTransferTableBody");
  const transferCountBadge = document.getElementById("cdmTransferCountBadge");
  if (!caseNumber) {
    if (transferSection) transferSection.classList.add("hidden");
    return;
  }
  const records =
    typeof window !== "undefined" && Array.isArray(window.allTransferRecords)
      ? window.allTransferRecords
      : typeof allTransferRecords !== "undefined" && Array.isArray(allTransferRecords)
        ? allTransferRecords
        : [];
  const normalized = String(caseNumber).trim().toLowerCase();
  const caseTransfers = records.filter(
    (t) => (t.case_number || "").trim().toLowerCase() === normalized,
  );

  if (caseTransfers.length > 0) {
    if (transferSection) transferSection.classList.remove("hidden");
    if (transferCountBadge) transferCountBadge.textContent = `${caseTransfers.length} Transfer(s)`;
    if (transferTableBody) {
      transferTableBody.innerHTML = caseTransfers
        .map(
          (t) => `
        <tr class="cdm-transfer-row">
          <td data-label="Transfer Date"><strong>${escapeHtml(formatDateDMY(t.transfer_date || t.created_at))}</strong></td>
          <td data-label="Transfer">${escapeHtml(t.from_court || "Origin")} ➔ <strong>${escapeHtml(t.to_court || "Destination")}</strong></td>
          <td data-label="Order No.">${escapeHtml(t.order_number || "—")}</td>
          <td data-label="Reason / Grounds">${escapeHtml(t.reason || "—")}</td>
        </tr>
      `,
        )
        .join("");
    }
  } else {
    if (transferSection) transferSection.classList.add("hidden");
  }
}
if (typeof renderCaseTransferHistory !== "undefined") {
  window.renderCaseTransferHistory = renderCaseTransferHistory;
}

var currentCdmPanelIndex = 0;

function selectCdmTab(panelIndex, direction = null) {
  const modal = document.getElementById("caseDetailsFullModal");
  if (!modal) return;
  const tabs = modal.querySelectorAll("#caseTabs .case-tab");
  const panels = modal.querySelectorAll(".case-panel");
  const indicator = modal.querySelector("#caseTabs .case-tab-indicator");

  const idxNum = Math.max(0, Math.min(panels.length - 1, parseInt(panelIndex, 10) || 0));
  currentCdmPanelIndex = idxNum;
  if (typeof window !== "undefined") window.currentCdmPanelIndex = idxNum;

  tabs.forEach((tab) => {
    const isTarget = String(tab.getAttribute("data-panel")) === String(idxNum);
    tab.classList.toggle("active", isTarget);
    tab.setAttribute("aria-selected", isTarget ? "true" : "false");
    tab.setAttribute("tabindex", isTarget ? "0" : "-1");
    if (isTarget) {
      if (indicator) {
        const left = tab.offsetLeft;
        const width = tab.offsetWidth;
        indicator.style.left = left + "px";
        indicator.style.width = width + "px";
      }
      if (typeof tab.scrollIntoView === "function") {
        tab.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  });

  panels.forEach((panel) => {
    const isTarget = String(panel.getAttribute("data-panel")) === String(idxNum);
    panel.classList.toggle("active", isTarget);
    if (isTarget) {
      panel.style.display = "block";
      if (direction === "next") {
        panel.style.animation = "cdmPanelSlideNext 0.22s ease-out forwards";
      } else if (direction === "prev") {
        panel.style.animation = "cdmPanelSlidePrev 0.22s ease-out forwards";
      } else {
        panel.style.animation = "cdmPanelFade 0.2s ease forwards";
      }
      panel.scrollTop = 0;
    } else {
      panel.style.display = "none";
      panel.style.animation = "";
    }
  });
}
if (typeof selectCdmTab !== "undefined") window.selectCdmTab = selectCdmTab;
if (typeof currentCdmPanelIndex !== "undefined") window.currentCdmPanelIndex = currentCdmPanelIndex;

function initCdmSwipeGestures() {
  const modal = document.getElementById("caseDetailsFullModal");
  if (!modal) return;
  const panelsContainer = modal.querySelector(".case-panels");
  if (!panelsContainer || panelsContainer._hasSwipeGestures) return;
  panelsContainer._hasSwipeGestures = true;

  let startX = 0;
  let startY = 0;
  let startTime = 0;
  let isSwiping = false;

  panelsContainer.addEventListener("touchstart", (e) => {
    const touch = (e.touches && e.touches[0]) || (e.changedTouches && e.changedTouches[0]) || e;
    startX = (typeof touch.clientX === "number") ? touch.clientX : 0;
    startY = (typeof touch.clientY === "number") ? touch.clientY : 0;
    startTime = Date.now();
    isSwiping = true;
  }, { passive: true });

  panelsContainer.addEventListener("touchend", (e) => {
    if (!isSwiping) return;
    isSwiping = false;

    const touch = (e.changedTouches && e.changedTouches[0]) || (e.touches && e.touches[0]) || e;
    const clientX = (typeof touch.clientX === "number") ? touch.clientX : startX;
    const clientY = (typeof touch.clientY === "number") ? touch.clientY : startY;
    const diffX = clientX - startX;
    const diffY = clientY - startY;
    const elapsed = Date.now() - startTime;

    // Must be fast intentional gesture: <= 750ms, >= 40px, horizontal dominant
    if (elapsed > 750) return;
    if (Math.abs(diffX) < 40) return;
    if (Math.abs(diffX) < Math.abs(diffY) * 1.3) return;

    // Check if touch target was inside a horizontally scrollable table (.tbl-wrap)
    const targetTbl = touch.target && touch.target.closest && touch.target.closest(".tbl-wrap");
    if (targetTbl) {
      if (diffX < 0 && targetTbl.scrollLeft + targetTbl.clientWidth < targetTbl.scrollWidth - 10) {
        return; // table can still scroll right
      }
      if (diffX > 0 && targetTbl.scrollLeft > 10) {
        return; // table can still scroll left
      }
    }

    const totalTabs = modal.querySelectorAll("#caseTabs .case-tab").length || 6;
    if (diffX < 0) {
      // Swiped Left -> Next Tab
      if (currentCdmPanelIndex < totalTabs - 1) {
        selectCdmTab(currentCdmPanelIndex + 1, "next");
      }
    } else {
      // Swiped Right -> Previous Tab
      if (currentCdmPanelIndex > 0) {
        selectCdmTab(currentCdmPanelIndex - 1, "prev");
      }
    }
  }, { passive: true });

  // Mouse drag swipe for desktop preview / emulation
  let isMouseDown = false;
  let mouseStartX = 0;
  let mouseStartY = 0;
  let mouseStartTime = 0;

  panelsContainer.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return;
    if (e.target && e.target.closest && e.target.closest("input, select, textarea, button, a, .btn, .tbl-wrap, .copy-btn, .pill-btn")) return;
    isMouseDown = true;
    mouseStartX = e.clientX;
    mouseStartY = e.clientY;
    mouseStartTime = Date.now();
  });

  window.addEventListener("mouseup", (e) => {
    if (!isMouseDown) return;
    isMouseDown = false;
    const diffX = e.clientX - mouseStartX;
    const diffY = e.clientY - mouseStartY;
    const elapsed = Date.now() - mouseStartTime;

    if (elapsed > 600) return;
    if (Math.abs(diffX) < 50) return;
    if (Math.abs(diffX) < Math.abs(diffY) * 1.3) return;

    const totalTabs = modal.querySelectorAll("#caseTabs .case-tab").length || 6;
    if (diffX < 0) {
      if (currentCdmPanelIndex < totalTabs - 1) {
        selectCdmTab(currentCdmPanelIndex + 1, "next");
      }
    } else {
      if (currentCdmPanelIndex > 0) {
        selectCdmTab(currentCdmPanelIndex - 1, "prev");
      }
    }
  });
}
if (typeof initCdmSwipeGestures !== "undefined") window.initCdmSwipeGestures = initCdmSwipeGestures;

function toggleCdmMoreMenu(e) {
  if (e) {
    e.stopPropagation();
    if (e.preventDefault) e.preventDefault();
  }
  const menu = document.getElementById("cdmMoreMenu");
  const btn = document.getElementById("cdmMoreBtn");
  if (!menu) return;
  const isOpen = menu.classList.toggle("open");
  menu.classList.toggle("show", isOpen);
  if (btn) btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
}
if (typeof toggleCdmMoreMenu !== "undefined") window.toggleCdmMoreMenu = toggleCdmMoreMenu;

// Global listener for more menu outside click
if (typeof document !== "undefined") {
  document.addEventListener("click", function (e) {
    const menu = document.getElementById("cdmMoreMenu");
    const btn = document.getElementById("cdmMoreBtn");
    if (menu && (menu.classList.contains("open") || menu.classList.contains("show"))) {
      if (!menu.contains(e.target) && (!btn || !btn.contains(e.target))) {
        menu.classList.remove("open");
        menu.classList.remove("show");
        if (btn) btn.setAttribute("aria-expanded", "false");
      }
    }
    const legacyMenu = document.getElementById("footerMoreMenu");
    const legacyBtn = document.getElementById("footerMoreBtn");
    if (legacyMenu && legacyMenu.classList.contains("open")) {
      if (!legacyMenu.contains(e.target) && (!legacyBtn || !legacyBtn.contains(e.target))) {
        legacyMenu.classList.remove("open");
      }
    }
  });
}

function hydrateDossierModal(c) {
  if (!c) return;

  const {
    caseNumber,
    courtName,
    caseName,
    caseType,
    isDisposed,
    isUndated,
    appName,
    appRole,
    resName,
    resRole,
    statusColor,
    statusText,
    nextDateText,
  } = getCaseCardDisplayData(c);

  const rawType = (c.caseType || "civil").toLowerCase().trim();
  const isCriminal = rawType === "state" || rawType === "criminal" || rawType === "misc_criminal";
  const isFamily = rawType === "family";
  const isRevenue = rawType === "revenue";
  const isComplaint = rawType === "complaint";

  let typeBadgeLabel = "Civil";
  let normalizedType = "civil";
  if (isCriminal) {
    typeBadgeLabel = "State (Criminal)";
    normalizedType = "criminal";
  } else if (isFamily) {
    typeBadgeLabel = "Family";
    normalizedType = "family";
  } else if (isRevenue) {
    typeBadgeLabel = "Revenue";
    normalizedType = "revenue";
  } else if (isComplaint) {
    typeBadgeLabel = "Complaint";
    normalizedType = "civil";
  } else {
    typeBadgeLabel = (c.caseType || "Civil").charAt(0).toUpperCase() + (c.caseType || "Civil").slice(1);
  }

  // Set dossier data-type attribute for color accenting
  const dossier = document.getElementById("dossier");
  if (dossier) dossier.setAttribute("data-type", normalizedType);

  // 1. Header Strip
  const cdmCaseNo = document.getElementById("cdmCaseNo");
  const cdmMatterTitle = document.getElementById("cdmMatterTitle");
  const cdmStatusBadge = document.getElementById("cdmStatusBadge");
  const cdmStatusLabel = document.getElementById("cdmStatusLabel");

  if (cdmCaseNo) cdmCaseNo.textContent = caseNumber;
  if (cdmMatterTitle) cdmMatterTitle.textContent = caseName;
  if (cdmStatusLabel) {
    cdmStatusLabel.textContent = isDisposed ? "Disposed" : isUndated ? "Undated" : "Pending";
  }
  if (cdmStatusBadge) {
    cdmStatusBadge.className = "status " + (isDisposed ? "disposed" : isUndated ? "undated" : "live");
  }

  // Dual-Block Shape-Split Badges for Backward Compatibility & Test Harness
  const headerTypeBadge = document.getElementById("cdmHeaderTypeBadge");
  if (headerTypeBadge) {
    let typeClass = "badge-civil";
    let iconHtml = '<iconify-icon icon="lucide:scale"></iconify-icon>';
    if (isCriminal) {
      typeClass = "badge-criminal";
      iconHtml = '<iconify-icon icon="lucide:shield"></iconify-icon>';
    } else if (isFamily) {
      typeClass = "badge-family";
      iconHtml = '<iconify-icon icon="lucide:users"></iconify-icon>';
    } else if (isRevenue) {
      typeClass = "badge-revenue";
      iconHtml = '<iconify-icon icon="lucide:landmark"></iconify-icon>';
    }
    headerTypeBadge.className = "badge shape-split badge-type " + typeClass;
    headerTypeBadge.innerHTML = '<span class="shape-split-icon">' + iconHtml + '</span><span class="shape-split-text" id="cdmHeaderTypeText">' + escapeHtml(typeBadgeLabel) + '</span>';
  }

  const headerStatusBadge = document.getElementById("cdmHeaderStatusBadge");
  if (headerStatusBadge) {
    if (isDisposed) {
      headerStatusBadge.className = "badge shape-split badge-disposed";
      headerStatusBadge.innerHTML = '<span class="shape-split-icon"><iconify-icon icon="lucide:check"></iconify-icon></span><span class="shape-split-text" id="cdmHeaderStatusText">Disposed</span>';
    } else if (isUndated) {
      headerStatusBadge.className = "badge shape-split badge-undated";
      headerStatusBadge.innerHTML = '<span class="shape-split-icon"><iconify-icon icon="lucide:calendar-x"></iconify-icon></span><span class="shape-split-text" id="cdmHeaderStatusText">Undated</span>';
    } else {
      headerStatusBadge.className = "badge shape-split badge-pending";
      headerStatusBadge.innerHTML = '<span class="shape-split-icon"><iconify-icon icon="lucide:clock"></iconify-icon></span><span class="shape-split-text" id="cdmHeaderStatusText">Pending</span>';
    }
  }

  // Hidden title compatibility
  const tTitle = document.getElementById("caseDetailsModalTitle");
  const tCaseNo = document.getElementById("caseDetailsModalCaseNo");
  const tSub = document.getElementById("caseDetailsModalSubtitle");
  if (tTitle) tTitle.textContent = caseName;
  if (tCaseNo) tCaseNo.textContent = caseNumber;
  if (tSub) tSub.textContent = courtName + " • " + typeBadgeLabel + " • " + statusText;

  // 2. Masthead Face-off
  const pRoleEl = document.getElementById("cdmPetitionerRole");
  const pNameEl = document.getElementById("cdmPetitionerName");
  const rRoleEl = document.getElementById("cdmRespondentRole");
  const rNameEl = document.getElementById("cdmRespondentName");
  const appBadge = document.getElementById("cdmAppearingBadge");

  // Determine parties accurately: prioritize parsed parties from caseName (e.g. "RANJEET KUMAR VS NAVEEN KUMAR")
  const parsedTitle = parsePartiesFromCaseTitle(caseName);
  let pName = (c.plaintiff || c.applicant || c.petitioner || c.firstParty || c.complainant || (parsedTitle ? parsedTitle.party1 : "") || appName || "").trim();
  let rName = (c.defendant || c.oppositeParty || c.respondent || c.accusedName || (parsedTitle ? parsedTitle.party2 : "") || resName || "").trim();

  if (parsedTitle && parsedTitle.party1 && parsedTitle.party2) {
    pName = parsedTitle.party1;
    rName = parsedTitle.party2;
  }

  if (!pName || pName === "Not Specified") pName = "Plaintiff";
  if (!rName || rName === "Not Specified") rName = "Defendant";

  const pLower = pName.toLowerCase();
  const isStateParty = pLower.startsWith("state") || pLower.includes("prosecution") || pLower.startsWith("govt");
  const isMiscCriminal = rawType === "misc_criminal" || rawType === "misccriminal" || (caseNumber && String(caseNumber).toUpperCase().includes("CRI.MISC"));

  let pRole = "PLAINTIFF";
  let rRole = "DEFENDANT";
  let repText = "Counsel for " + (c.appearingFor || c.clientName || pName);

  if (isMiscCriminal) {
    pRole = "APPLICANT";
    rRole = isStateParty ? "STATE / OPPOSITE PARTY" : "OPPOSITE PARTY";
    repText = "Counsel for " + (c.appearingFor || c.clientName || pName);
  } else if (rawType === "complaint") {
    pRole = "COMPLAINANT";
    rRole = "ACCUSED";
    repText = "Counsel for " + (c.appearingFor || c.clientName || pName);
  } else if (isCriminal) {
    if (isStateParty) {
      pRole = "PROSECUTION / STATE";
      rRole = "ACCUSED";
      repText = "Defense Counsel for " + (c.appearingFor || c.clientName || rName);
    } else {
      pRole = "COMPLAINANT / APPLICANT";
      rRole = "ACCUSED / OPPOSITE PARTY";
      repText = "Counsel for " + (c.appearingFor || c.clientName || pName);
    }
  } else if (isFamily) {
    pRole = "PETITIONER";
    rRole = "RESPONDENT";
    repText = "Appearing for " + (c.appearingFor || c.clientName || pName);
  } else if (isRevenue) {
    pRole = "APPLICANT";
    rRole = "OPPOSITE PARTY";
    repText = "Appearing for " + (c.appearingFor || c.clientName || pName);
  }

  if (pRoleEl) pRoleEl.textContent = pRole;
  if (pNameEl) pNameEl.textContent = pName;
  if (rRoleEl) rRoleEl.textContent = rRole;
  if (rNameEl) rNameEl.textContent = rName;
  if (appBadge) appBadge.textContent = repText;

  // 3. Horizon Block (Next Hearing Countdown)
  const hEyebrow = document.getElementById("cdmHearingEyebrow");
  const hDate = document.getElementById("cdmHearingDate");
  const hCountdown = document.getElementById("cdmHearingCountdown");
  const hStage = document.getElementById("cdmHearingStage");

  if (hEyebrow) hEyebrow.textContent = isDisposed ? "Case Disposal" : "Next Hearing";
  if (hDate) {
    hDate.textContent = isDisposed
      ? "Disposed Off"
      : isUndated
      ? "Undated"
      : formatDateDMY(c.nextHearing);
  }
  if (hCountdown) {
    if (isDisposed) {
      hCountdown.textContent = "CLOSED";
      hCountdown.style.background = "rgba(42, 93, 62, 0.2)";
      hCountdown.style.color = "var(--cdm-success)";
    } else if (isUndated || !c.nextHearing) {
      hCountdown.textContent = "NOT SCHEDULED";
      hCountdown.style.background = "rgba(180, 83, 9, 0.15)";
      hCountdown.style.color = "var(--cdm-gold)";
    } else {
      hCountdown.style.background = "";
      hCountdown.style.color = "";
      try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const target = new Date(c.nextHearing);
        target.setHours(0, 0, 0, 0);
        const diffMs = target.getTime() - today.getTime();
        const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
        if (diffDays === 0) hCountdown.textContent = "TODAY";
        else if (diffDays === 1) hCountdown.textContent = "TOMORROW";
        else if (diffDays > 1) hCountdown.textContent = "IN " + diffDays + " DAYS";
        else hCountdown.textContent = "OVERDUE " + Math.abs(diffDays) + " DAYS";
      } catch (e) {
        hCountdown.textContent = "SCHEDULED";
      }
    }
  }
  if (hStage) {
    hStage.textContent = isDisposed
      ? (c.disposalComment || c.disposal_comment || "Case Closed")
      : isUndated
      ? "No Schedule Set"
      : (c.hearingProcess || c.stage || "Scheduled Hearing");
  }

  // 4. Panel 0: Overview Snapshot Table (Only Real Cases Table Fields)
  const snapBody = document.getElementById("cdmOverviewSnapshotBody");
  if (snapBody) {
    const filingDateStr = c.filingDate || c.crimeFilingDate ? formatDateDMY(c.filingDate || c.crimeFilingDate) : "";
    const yearStr = c.caseYear || c.crimeYear || (c.filingDate ? String(c.filingDate).slice(0, 4) : "");
    const clientPhone = (c.clientNumber || c.criminalClientNumber || "").trim();
    const remarkStr = (c.remark || c.remarks || "").trim();

    let rows = `
      <tr><td>Case Number</td><td><strong>${escapeHtml(caseNumber)}</strong></td></tr>
      <tr><td>Case Type / Category</td><td>${escapeHtml(typeBadgeLabel)}</td></tr>
      <tr><td>Court / Bench</td><td>${escapeHtml(courtName)}</td></tr>
    `;
    if (filingDateStr || yearStr) {
      rows += `<tr><td>Filing Date / Year</td><td>${escapeHtml([filingDateStr, yearStr ? `Year: ${yearStr}` : ""].filter(Boolean).join(" · "))}</td></tr>`;
    }
    rows += `
      <tr><td>Hearing Stage</td><td>${escapeHtml(isDisposed ? (c.disposalComment || c.disposal_comment || "Disposed Off") : (c.hearingProcess || c.stage || "Hearing"))}</td></tr>
      <tr><td>Next Scheduled Date</td><td>${escapeHtml(isDisposed ? "Case Closed" : isUndated ? "Undated" : formatDateDMY(c.nextHearing))}</td></tr>
      <tr><td>Client Name</td><td>${escapeHtml(c.clientName || c.criminalClientName || c.client || "—")}</td></tr>
    `;
    if (clientPhone) {
      rows += `<tr><td>Client Contact</td><td><a href="tel:${escapeHtml(clientPhone)}" style="color:var(--cdm-gold);"><iconify-icon icon="lucide:phone" style="vertical-align:middle; margin-right:4px; font-size:13px;"></iconify-icon>${escapeHtml(clientPhone)}</a></td></tr>`;
    }
    if (remarkStr) {
      rows += `<tr><td>Case Remarks</td><td>${escapeHtml(remarkStr)}</td></tr>`;
    }
    if (c.docLink) {
      rows += `<tr><td>Document Link</td><td><a href="${escapeHtml(c.docLink)}" target="_blank" rel="noopener" style="color:var(--cdm-gold);"><iconify-icon icon="lucide:external-link" style="vertical-align:middle; margin-right:4px; font-size:13px;"></iconify-icon> Open Dossier Document</a></td></tr>`;
    }
    snapBody.innerHTML = rows;
  }

  // 5. Panel 1: Court & Bench Table + Specialized Particulars (Only Real Stored Columns)
  const courtBody = document.getElementById("cdmCourtDetailsBody");
  if (courtBody) {
    const filingDateStr = c.filingDate || c.crimeFilingDate ? formatDateDMY(c.filingDate || c.crimeFilingDate) : "";
    const yearStr = c.caseYear || c.crimeYear || "";
    let rows = `
      <tr><td>Assigned Court</td><td><strong>${escapeHtml(courtName)}</strong></td></tr>
      <tr><td>Case Category</td><td>${escapeHtml(typeBadgeLabel)}</td></tr>
    `;
    if (yearStr) {
      rows += `<tr><td>Registration Year</td><td>${escapeHtml(yearStr)}</td></tr>`;
    }
    if (filingDateStr) {
      rows += `<tr><td>Filing Date</td><td>${escapeHtml(filingDateStr)}</td></tr>`;
    }
    rows += `
      <tr><td>Current Hearing Stage</td><td>${escapeHtml(c.hearingProcess || c.stage || "Hearing")}</td></tr>
      <tr><td>Next Scheduled Date</td><td>${escapeHtml(isDisposed ? "Disposed Off" : isUndated ? "Undated" : formatDateDMY(c.nextHearing))}</td></tr>
      <tr><td>Case Disposition Status</td><td>${isDisposed ? '<span class="status disposed" style="display:inline-flex;">Disposed Off</span>' : isUndated ? '<span class="status undated" style="display:inline-flex;">Undated</span>' : '<span class="status live" style="display:inline-flex;">Active Pending</span>'}</td></tr>
    `;
    if (isDisposed) {
      const dispComment = (c.disposalComment || c.disposal_comment || "").trim();
      if (dispComment) {
        rows += `<tr><td>Disposal Comment</td><td>${escapeHtml(dispComment)}</td></tr>`;
      }
    }
    courtBody.innerHTML = rows;
  }

  const specTitle = document.getElementById("cdmSpecializedTitle");
  const specBody = document.getElementById("cdmSpecializedBody");
  if (specTitle && specBody) {
    let rows = "";
    if (rawType === "misc_criminal" || (caseNumber && String(caseNumber).toUpperCase().includes("CRI.MISC"))) {
      specTitle.textContent = "Criminal Miscellaneous Particulars";
      if (c.proceedingType) {
        rows += `<tr><td>Application / Proceeding Type</td><td><strong>${escapeHtml(c.proceedingType)}</strong></td></tr>`;
      }
      if (c.originalCaseNumber) {
        rows += `<tr><td>Original Case / FIR Number</td><td><strong>${escapeHtml(c.originalCaseNumber)}</strong></td></tr>`;
      }
      if (c.policeStation) {
        rows += `<tr><td>Police Station / Thana</td><td><iconify-icon icon="lucide:shield" style="vertical-align:middle; margin-right:4px; font-size:13px;"></iconify-icon>${escapeHtml(c.policeStation)}</td></tr>`;
      }
      if (c.crimeSection) {
        rows += `<tr><td>Section (IPC / BNS / Act)</td><td>${escapeHtml(c.crimeSection)}</td></tr>`;
      }
      if (c.remark) {
        rows += `<tr><td>Case Remarks</td><td>${escapeHtml(c.remark)}</td></tr>`;
      }
    } else if (rawType === "complaint") {
      specTitle.textContent = "Complaint Particulars";
      if (c.complaintType) {
        rows += `<tr><td>Complaint Nature</td><td><strong>${escapeHtml(c.complaintType)}</strong></td></tr>`;
      }
      if (c.sectionAct || c.crimeSection) {
        rows += `<tr><td>Section / Statutory Act</td><td>${escapeHtml(c.sectionAct || c.crimeSection)}</td></tr>`;
      }
      if (c.policeStation) {
        rows += `<tr><td>Police Station / Jurisdiction</td><td><iconify-icon icon="lucide:shield" style="vertical-align:middle; margin-right:4px; font-size:13px;"></iconify-icon>${escapeHtml(c.policeStation)}</td></tr>`;
      }
      if (c.remark) {
        rows += `<tr><td>Case Remarks</td><td>${escapeHtml(c.remark)}</td></tr>`;
      }
    } else if (isCriminal) {
      specTitle.textContent = "State / Criminal Particulars";
      if (c.policeStation) {
        rows += `<tr><td>Police Station / Thana</td><td><iconify-icon icon="lucide:shield" style="vertical-align:middle; margin-right:4px; font-size:13px;"></iconify-icon>${escapeHtml(c.policeStation)}</td></tr>`;
      }
      if (c.crimeNumber || c.firNumber) {
        rows += `<tr><td>Crime / FIR Number</td><td><strong>${escapeHtml(c.crimeNumber || c.firNumber)}</strong></td></tr>`;
      }
      if (c.crimeSection || c.sections) {
        rows += `<tr><td>Section (IPC / BNS / Act)</td><td>${escapeHtml(c.crimeSection || c.sections)}</td></tr>`;
      }
      if (c.remark) {
        rows += `<tr><td>Case Remarks</td><td>${escapeHtml(c.remark)}</td></tr>`;
      }
    } else if (isFamily) {
      specTitle.textContent = "Matrimonial & Family Particulars";
      if (c.familyMatterType || c.matterType) {
        rows += `<tr><td>Dispute / Matter Nature</td><td><strong>${escapeHtml(c.familyMatterType || c.matterType)}</strong></td></tr>`;
      }
      if (c.marriageDate) {
        rows += `<tr><td>Date of Marriage</td><td>${formatDateDMY(c.marriageDate)}</td></tr>`;
      }
      if (c.maintenanceDetail || c.maintenance) {
        rows += `<tr><td>Maintenance Detail</td><td>${escapeHtml(c.maintenanceDetail || c.maintenance)}</td></tr>`;
      }
      if (c.remark) {
        rows += `<tr><td>Case Remarks</td><td>${escapeHtml(c.remark)}</td></tr>`;
      }
    } else if (isRevenue) {
      specTitle.textContent = "Land & Revenue Particulars";
      if (c.revenueActSection) {
        rows += `<tr><td>Revenue Act & Section</td><td><strong>${escapeHtml(c.revenueActSection)}</strong></td></tr>`;
      }
      if (c.villageMauja || c.village) {
        rows += `<tr><td>Village / Mauza</td><td>${escapeHtml(c.villageMauja || c.village)}</td></tr>`;
      }
      if (c.parganaTehsil || c.tehsil || c.pargana) {
        rows += `<tr><td>Pargana / Tehsil</td><td>${escapeHtml(c.parganaTehsil || c.tehsil || c.pargana)}</td></tr>`;
      }
      const gataKhata = c.gataKhataNo || [c.khataNo ? "Khata: " + c.khataNo : "", c.gataNo ? "Gata: " + c.gataNo : ""].filter(Boolean).join(" | ");
      if (gataKhata) {
        rows += `<tr><td>Gata / Khata Number</td><td>${escapeHtml(gataKhata)}</td></tr>`;
      }
      if (c.remark) {
        rows += `<tr><td>Case Remarks</td><td>${escapeHtml(c.remark)}</td></tr>`;
      }
    } else if (rawType === "misc_civil") {
      specTitle.textContent = "Civil Miscellaneous Particulars";
      if (c.proceedingType) {
        rows += `<tr><td>Application / Proceeding Type</td><td><strong>${escapeHtml(c.proceedingType)}</strong></td></tr>`;
      }
      if (c.originalCaseNumber) {
        rows += `<tr><td>Original Suit / Case Number</td><td><strong>${escapeHtml(c.originalCaseNumber)}</strong></td></tr>`;
      }
      if (c.remark) {
        rows += `<tr><td>Case Remarks</td><td>${escapeHtml(c.remark)}</td></tr>`;
      }
    } else {
      specTitle.textContent = "Civil Suit Particulars";
      rows += `<tr><td>Matter Category</td><td>Civil Suit / Original Proceeding</td></tr>`;
      if (c.remark) {
        rows += `<tr><td>Case Remarks</td><td>${escapeHtml(c.remark)}</td></tr>`;
      }
    }

    if (!rows) {
      rows = `<tr><td colspan="2" style="color:var(--cdm-ink-3);">No additional specialized particulars recorded.</td></tr>`;
    }
    specBody.innerHTML = rows;
  }

  // 5.1 Hydrate Court Transfer History (Panel 1)
  const transferHistory = typeof window.getCaseTransferHistory === "function"
    ? window.getCaseTransferHistory(caseNumber)
    : [];

  const transferCountBadge = document.getElementById("cdmTransferCountBadge");
  if (transferCountBadge) {
    transferCountBadge.textContent = transferHistory.length > 0
      ? `${transferHistory.length} Transfer${transferHistory.length > 1 ? "s" : ""}`
      : "0 Transfers";
    transferCountBadge.className = transferHistory.length > 0
      ? "badge shape-split badge-civil"
      : "badge shape-split badge-pending";
  }

  const transferBody = document.getElementById("cdmTransferTableBody");
  if (transferBody) {
    if (transferHistory.length === 0) {
      transferBody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:var(--cdm-ink-muted); padding:20px;">No court transfers recorded. Case is currently proceeding in its original assigned court.</td></tr>';
    } else {
      transferBody.innerHTML = transferHistory
        .map((t) => {
          const tDate = formatDateDMY(t.transfer_date || t.transferDate || t.created_at);
          const fromCourt = escapeHtml(t.from_court || t.fromCourt || "Previous Court");
          const toCourt = escapeHtml(t.to_court || t.toCourt || courtName);
          const orderNo = t.order_number || t.orderNumber || "";
          const orderDate = t.order_date || t.orderDate ? formatDateDMY(t.order_date || t.orderDate) : "";
          const auth = t.transferred_by || t.transferredBy || "";
          const reason = escapeHtml([t.transfer_reason || t.transferReason, t.remarks].filter(Boolean).join(" — ") || "Transferred by judicial order");
          const docUrl = t.doc_link || t.docLink || "";

          let orderCol = escapeHtml(orderNo || "—");
          if (orderDate) orderCol += ` <span style="font-size:11px; color:var(--cdm-ink-3);">(${escapeHtml(orderDate)})</span>`;
          if (auth) orderCol += `<div style="font-size:11px; color:var(--cdm-ink-muted);">By ${escapeHtml(auth)}</div>`;

          let routeCol = `${fromCourt} <iconify-icon icon="lucide:arrow-right" style="vertical-align:middle; margin:0 4px; font-size:12px;"></iconify-icon> <strong>${toCourt}</strong>`;
          if (docUrl) {
            routeCol += ` <a href="${escapeHtml(docUrl)}" target="_blank" rel="noopener" style="color:var(--cdm-gold); margin-left:6px; font-size:11px;"><iconify-icon icon="lucide:file-text"></iconify-icon> Order File</a>`;
          }

          return `
            <tr>
              <td><strong>${escapeHtml(tDate)}</strong></td>
              <td>${routeCol}</td>
              <td>${orderCol}</td>
              <td>${reason}</td>
            </tr>
          `;
        })
        .join("");
    }
  }

  // 6. Panel 2: Client Profile & Contact Record (Only Real Stored Contact Data)
  const clientName = (c.clientName || c.criminalClientName || c.client || "Client Record").trim();
  const clientPhone = (c.clientNumber || c.criminalClientNumber || "").trim();

  const cAvatar = document.getElementById("cdmClientAvatar");
  const cHeroName = document.getElementById("cdmClientHeroName");
  const cHeroPhone = document.getElementById("cdmClientHeroPhone");
  const cContactBody = document.getElementById("cdmClientContactBody");

  if (cAvatar) {
    const initials = clientName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join("") || "CL";
    cAvatar.textContent = initials;
  }
  if (cHeroName) cHeroName.textContent = clientName;
  if (cHeroPhone) {
    cHeroPhone.innerHTML = clientPhone
      ? `<a href="tel:${escapeHtml(clientPhone)}" style="color:var(--cdm-gold); text-decoration:none;"><iconify-icon icon="lucide:phone" style="vertical-align:middle; margin-right:4px; font-size:13px;"></iconify-icon>${escapeHtml(clientPhone)}</a>`
      : "No phone recorded";
  }
  if (cContactBody) {
    let rows = `
      <tr><td>Client Full Name</td><td><strong>${escapeHtml(clientName)}</strong></td></tr>
    `;
    if (clientPhone) {
      rows += `<tr><td>Primary Contact</td><td><a href="tel:${escapeHtml(clientPhone)}" style="color:var(--cdm-gold);"><iconify-icon icon="lucide:phone" style="vertical-align:middle; margin-right:4px; font-size:13px;"></iconify-icon>${escapeHtml(clientPhone)}</a></td></tr>`;
    } else {
      rows += `<tr><td>Primary Contact</td><td style="color:var(--cdm-ink-3);">No phone recorded</td></tr>`;
    }
    cContactBody.innerHTML = rows;
  }

  // 7. Panel 3: Fees & Virtual Account Ledger
  const transactions = typeof window.getCasePaisaTransactions === "function"
    ? window.getCasePaisaTransactions(caseNumber)
    : [];
  
  const feeCountBadge = document.getElementById("cdmFeesBadgeCount");
  if (feeCountBadge) feeCountBadge.textContent = String(transactions.length);

  const totalReceived = transactions
    .filter((t) => t.type === "received")
    .reduce((acc, t) => acc + (Number(t.amount) || 0), 0);
  const totalSpent = transactions
    .filter((t) => t.type === "spent")
    .reduce((acc, t) => acc + (Number(t.amount) || 0), 0);

  const feeSummaryBody = document.getElementById("cdmFeeSummaryBody");
  if (feeSummaryBody) {
    let summaryRows = `
      <tr><td>Total Fee Received</td><td class="num" style="color:var(--cdm-success);"><strong>₹ ${totalReceived.toLocaleString("en-IN")}</strong></td></tr>
    `;
    if (totalSpent > 0) {
      summaryRows += `
        <tr><td>Total Case Expenses</td><td class="num" style="color:var(--cdm-crimson);"><strong>₹ ${totalSpent.toLocaleString("en-IN")}</strong></td></tr>
        <tr><td>Net Case Balance</td><td class="num"><strong>₹ ${(totalReceived - totalSpent).toLocaleString("en-IN")}</strong></td></tr>
      `;
    }
    feeSummaryBody.innerHTML = summaryRows;
  }

  const feeLedgerBody = document.getElementById("cdmFeeLedgerBody");
  const feeLedgerFoot = document.getElementById("cdmFeeLedgerFoot");
  if (feeLedgerBody) {
    if (transactions.length === 0) {
      feeLedgerBody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:var(--cdm-ink-muted); padding:24px;">No payment records found in virtual account ledger.</td></tr>';
      if (feeLedgerFoot) feeLedgerFoot.innerHTML = "";
    } else {
      feeLedgerBody.innerHTML = transactions
        .map((t) => `
          <tr>
            <td>${escapeHtml(formatDateDMY(t.date || t.created_at))}</td>
            <td>${escapeHtml(t.description || t.particulars || (t.type === "received" ? "Fee Payment" : "Case Expense"))}</td>
            <td><span class="status ${t.type === "received" ? "live" : "disposed"}" style="padding:2px 8px; font-size:11px;">${escapeHtml((t.type || "received").toUpperCase())}</span></td>
            <td class="num"><strong>₹ ${(Number(t.amount) || 0).toLocaleString("en-IN")}</strong></td>
          </tr>
        `)
        .join("");

      if (feeLedgerFoot) {
        feeLedgerFoot.innerHTML = `
          <tr style="border-top:1.5px solid var(--cdm-line); font-weight:700;">
            <td colspan="3">Total Payments Recorded</td>
            <td class="num">₹ ${totalReceived.toLocaleString("en-IN")}</td>
          </tr>
        `;
      }
    }
  }

  // 8. Panel 4: Proceedings & Hearing History
  const history = typeof window.getCaseHearingHistory === "function"
    ? window.getCaseHearingHistory(caseNumber)
    : [];

  const procBadge = document.getElementById("cdmProceedingsBadgeCount");
  if (procBadge) procBadge.textContent = String(history.length);

  const procBody = document.getElementById("cdmProceedingsBody");
  if (procBody) {
    if (history.length === 0) {
      procBody.innerHTML = '<tr><td colspan="3" style="text-align:center; color:var(--cdm-ink-muted); padding:24px;">No past hearing proceedings recorded yet.</td></tr>';
    } else {
      procBody.innerHTML = history
        .map((h) => `
          <tr>
            <td><strong>${escapeHtml(formatDateDMY(h.hearing_date || h.date))}</strong></td>
            <td><span class="badge shape-split badge-civil" style="font-size:11px; padding:2px 6px;">${escapeHtml(h.stage || h.process || "Hearing")}</span></td>
            <td>${escapeHtml(h.remarks || h.notes || h.action_taken || "Proceedings attended as scheduled.")}</td>
          </tr>
        `)
        .join("");
    }
  }

  // 8.1 Panel 5: Linked Case Tasks & Action Deadlines
  const tasksHistory = typeof window.getCaseTasksHistory === "function"
    ? window.getCaseTasksHistory(caseNumber)
    : [];

  const tasksBadge = document.getElementById("cdmTasksBadgeCount");
  if (tasksBadge) tasksBadge.textContent = String(tasksHistory.length);

  const tasksBody = document.getElementById("cdmTasksBody");
  if (tasksBody) {
    if (tasksHistory.length === 0) {
      tasksBody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:var(--cdm-ink-muted); padding:24px;">No active to-do tasks or deadlines recorded for this case yet.</td></tr>';
    } else {
      tasksBody.innerHTML = tasksHistory
        .map((task) => {
          const deadlineStr = formatDateDMY(task.deadlineDate || task.deadline_date || task.createdAt);
          const isDone = task.status === "completed";
          const priority = (task.priority || "normal").toLowerCase();
          const priorityClass = priority === "high" ? "badge-criminal" : priority === "medium" ? "badge-revenue" : "badge-civil";

          let detailsHtml = `<strong>${escapeHtml(task.taskTitle || task.task_title || "Untitled Task")}</strong>`;
          if (task.copyNumber || task.copy_number) {
            detailsHtml += `<div style="font-size:11px; color:var(--cdm-gold); margin-top:2px;"><iconify-icon icon="lucide:file-text" style="vertical-align:middle; margin-right:4px; font-size:11px;"></iconify-icon>Certified Copy No: ${escapeHtml(task.copyNumber || task.copy_number)}</div>`;
          }
          const steps = Array.isArray(task.steps) ? task.steps : [];
          if (steps.length > 0) {
            const completedSteps = steps.filter((s) => s && s.completed).length;
            detailsHtml += `<div style="font-size:11px; color:var(--cdm-ink-3); margin-top:2px;">Workflow Steps: ${completedSteps}/${steps.length} completed</div>`;
          }

          return `
            <tr>
              <td><strong>${escapeHtml(deadlineStr)}</strong></td>
              <td>${detailsHtml}</td>
              <td><span class="badge shape-split ${priorityClass}" style="font-size:11px; padding:2px 6px;">${escapeHtml(priority.toUpperCase())}</span></td>
              <td><span class="status ${isDone ? "disposed" : "live"}" style="font-size:11px; padding:2px 8px;">${isDone ? '<iconify-icon icon="lucide:check" style="vertical-align:middle; margin-right:3px; font-size:11px;"></iconify-icon> Done' : '<iconify-icon icon="lucide:clock" style="vertical-align:middle; margin-right:3px; font-size:11px;"></iconify-icon> Pending'}</span></td>
            </tr>
          `;
        })
        .join("");
    }
  }

  // 9. Panel 5: Notes & Remarks
  const notesBody = document.getElementById("cdmNotesBody");
  if (notesBody) {
    const remarks = remarksToPlainText(c.remark || c.remarks);
    const dispComment = (c.disposalComment || c.disposal_comment || "").trim();
    const rows = [];
    if (remarks) {
      rows.push(`<tr><td><strong>Advocate Note</strong></td><td>—</td><td>${escapeHtml(remarks)}</td></tr>`);
    }
    if (dispComment) {
      rows.push(`<tr><td><strong>Disposal Comment</strong></td><td>—</td><td>${escapeHtml(dispComment)}</td></tr>`);
    }
    if (rows.length === 0) {
      notesBody.innerHTML = '<tr><td colspan="3" style="text-align:center; color:var(--cdm-ink-muted); padding:24px;">No private notes or disposal comments recorded for this case.</td></tr>';
    } else {
      notesBody.innerHTML = rows.join("");
    }
  }

  // 10. Wire Footer Action Buttons
  const printBtn = document.getElementById("cdmFooterPrintBtn");
  const menuPrintBtn = document.getElementById("cdmMenuPrintBtn");
  const doPrint = () => {
    const menu = document.getElementById("cdmMoreMenu");
    if (menu) menu.classList.remove("open");
    if (typeof printCurrentCaseDossier === "function") {
      printCurrentCaseDossier(c);
    } else if (typeof window.printCaseSummary === "function") {
      window.printCaseSummary(c);
    } else if (typeof window.print === "function") {
      window.print();
    }
  };
  if (printBtn) printBtn.onclick = doPrint;
  if (menuPrintBtn) menuPrintBtn.onclick = doPrint;

  const waBtn = document.getElementById("cdmFooterWhatsAppBtn");
  if (waBtn) {
    waBtn.onclick = (e) => {
      if (e) e.preventDefault();
      cdmTriggerWhatsApp();
    };
  }

  const transferBtn = document.getElementById("cdmFooterTransferBtn");
  const menuTransferBtn = document.getElementById("cdmMenuTransferBtn");
  const doTransfer = () => {
    closeCaseDetailsFullModal();
    if (typeof openTransferForCase === "function") {
      openTransferForCase(caseNumber);
    } else if (typeof openChangeCourtModal === "function") {
      openChangeCourtModal(caseNumber);
    }
  };
  if (transferBtn) transferBtn.onclick = doTransfer;
  if (menuTransferBtn) menuTransferBtn.onclick = doTransfer;

  const updateHearingBtn = document.getElementById("cdmFooterUpdateHearingBtn");
  if (updateHearingBtn) {
    updateHearingBtn.onclick = () => {
      closeCaseDetailsFullModal();
      if (typeof openUpdateHearingForCase === "function") {
        openUpdateHearingForCase(caseNumber);
      } else if (typeof openForwardDateModal === "function") {
        openForwardDateModal(caseNumber);
      }
    };
  }

  const moreBtn = document.getElementById("cdmMoreBtn");
  if (moreBtn) {
    moreBtn.onclick = (e) => {
      if (e) e.stopPropagation();
      toggleCdmMoreMenu(e);
    };
  }

  const menuTodoBtn = document.getElementById("cdmMenuTodoBtn");
  if (menuTodoBtn) {
    menuTodoBtn.onclick = () => {
      closeCaseDetailsFullModal();
      if (typeof openTodoForCase === "function") {
        openTodoForCase(caseNumber);
      }
    };
  }

  const menuHistoryBtn = document.getElementById("cdmMenuHistoryBtn");
  if (menuHistoryBtn) {
    menuHistoryBtn.onclick = () => {
      closeCaseDetailsFullModal();
      if (typeof openCaseHistoryModalByNo === "function") {
        openCaseHistoryModalByNo(caseNumber);
      } else if (typeof openCaseHistoryModal === "function") {
        openCaseHistoryModal(c);
      }
    };
  }

  const menuEditBtn = document.getElementById("cdmMenuEditBtn");
  if (menuEditBtn) {
    menuEditBtn.onclick = () => {
      closeCaseDetailsFullModal();
      if (typeof showTab === "function") showTab("update");
      const searchInput = document.getElementById("updateSearchInput");
      if (searchInput) searchInput.value = caseNumber;
      if (typeof loadCaseForUpdate === "function") {
        loadCaseForUpdate(caseNumber);
      }
    };
  }
}
if (typeof hydrateDossierModal !== "undefined") window.hydrateDossierModal = hydrateDossierModal;

function openCaseDetailsFullModal(caseNo, idx) {
  const modalEl = ensureCaseModalsMounted();
  let c = null;
  if (typeof caseNo === "object" && caseNo !== null) {
    c = caseNo;
  } else if (
    typeof idx === "number" &&
    typeof caseCardsFilteredList !== "undefined" &&
    caseCardsFilteredList &&
    caseCardsFilteredList[idx]
  ) {
    c = caseCardsFilteredList[idx];
  } else if (caseNo) {
    const q = String(caseNo).trim().toLowerCase();
    c = (typeof allCaseRecords !== "undefined" ? allCaseRecords : []).find((record) => {
      const num1 = (record.caseNo || "").toLowerCase();
      const num2 = (record.criminalCaseNumber || "").toLowerCase();
      return num1 === q || num2 === q || (record.id && String(record.id) === q);
    });
  }

  if (!c) {
    alert(
      `Case "${typeof caseNo === "string" ? caseNo : idx !== undefined ? idx : ""}" details could not be found.`
    );
    return;
  }

  window.currentSelectedCase = c;

  // Hydrate full Living Dossier
  hydrateDossierModal(c);

  // Setup tab click event delegation once
  const tabWrap = document.getElementById("caseTabs");
  if (tabWrap && !tabWrap._hasDossierTabClicks) {
    tabWrap._hasDossierTabClicks = true;
    tabWrap.addEventListener("click", (e) => {
      const btn = e.target.closest(".case-tab");
      if (!btn) return;
      const pIdx = btn.getAttribute("data-panel");
      if (pIdx !== null) selectCdmTab(pIdx);
    });
  }

  // Setup gesture swipe for case tabs
  initCdmSwipeGestures();

  // Switch to Overview tab (index 0)
  selectCdmTab(0);

  // Reveal Modal Dialog
  if (modalEl) {
    modalEl.classList.remove("hidden");
    modalEl.classList.add("active");
    modalEl.style.display = "flex";
    if (typeof document !== "undefined" && document.body) {
      document.body.style.overflow = "hidden";
    }
  }
}
if (typeof openCaseDetailsFullModal !== "undefined")
  window.openCaseDetailsFullModal = openCaseDetailsFullModal;

// Global Escape Key Listener for CDM Modal
if (typeof document !== "undefined") {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const m = document.getElementById("caseDetailsFullModal");
      if (m && !m.classList.contains("hidden") && m.style.display !== "none") {
        closeCaseDetailsFullModal();
      }
      const fd = document.getElementById("fdModal");
      if (fd && !fd.classList.contains("hidden") && fd.style.display !== "none") {
        const comboDropdown = document.getElementById("fdComboDropdown");
        if (comboDropdown && comboDropdown.classList.contains("open")) {
          closeForwardCombo();
        } else {
          closeForwardDateModal();
        }
      }
    }
  });
}

// ==============================================================================
// Forward Date Modal & Refined Custom Date Picker Controller
// ==============================================================================

window.fdState = {
  selectedCase: null,
  caseSelectionLocked: false,
  nextDate: null,
  stage: "",
  notes: "",
};

window.calState = {
  m: new Date().getMonth(),
  y: new Date().getFullYear(),
};

// Invalidates a pending post-submit close when the modal is opened again.
let forwardModalRevision = 0;

const FD_MONTHS_FULL = [
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
const FD_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const FD_DAYS_FULL = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function fdFormatYMD(d) {
  if (!d) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function fdFormatDisplay(d) {
  if (!d) return "—";
  return `${FD_DAYS_FULL[d.getDay()]}, ${d.getDate()} ${FD_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

function ensureForwardModalMounted() {
  let fd = document.getElementById("fdModal");
  if (fd) return fd;
  if (typeof ensureCaseModalsMounted === "function") {
    ensureCaseModalsMounted();
  }
  fd = document.getElementById("fdModal");
  if (!fd && window.__casebook_modals && window.__casebook_modals["case-modals"]) {
    let container = document.getElementById("caseModalsContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "caseModalsContainer";
      document.body.appendChild(container);
    }
    container.innerHTML = window.__casebook_modals["case-modals"];
    fd = document.getElementById("fdModal");
  }
  return fd;
}

function forwardCases() {
  return typeof allCaseRecords !== "undefined" && Array.isArray(allCaseRecords)
    ? allCaseRecords
    : Array.isArray(window.allCaseRecords) ? window.allCaseRecords : [];
}

function forwardCaseNumber(c) {
  return String(c.caseNo || c.criminalCaseNumber || "").trim();
}

function forwardCaseDisposed(c) {
  return typeof isCaseDisposed === "function"
    ? isCaseDisposed(c)
    : /dispose|decid/i.test(c.caseStatus || c.status || c.case_status || "") ||
        Boolean(c.disposalComment || c.disposal_comment || c.disposalDate || c.disposal_date);
}

function forwardCaseName(c) {
  if (c.caseName) return c.caseName;
  for (const [first, second] of [
    [c.plaintiff, c.defendant],
    [c.petitioner, c.respondent],
    [c.applicant, c.respondent],
    [c.victimName, c.accusedName],
  ]) {
    if (first && second) return `${first} vs ${second}`;
  }
  if (c.accusedName) return `State vs ${c.accusedName}`;
  return c.parties || c.plaintiff || c.petitioner || c.applicant || c.victimName || "—";
}

function findForwardCase(caseNo) {
  const query = String(caseNo || "").toLowerCase().trim();
  return query && forwardCases().find((c) =>
    [c.caseNo, c.criminalCaseNumber].some((num) => String(num || "").toLowerCase().trim() === query),
  );
}

function setForwardComboLocked(locked) {
  window.fdState.caseSelectionLocked = locked;
  const trigger = document.getElementById("fdComboInputWrap");
  const input = document.getElementById("fdComboInput");
  if (trigger) {
    trigger.disabled = locked;
    trigger.setAttribute("aria-disabled", String(locked));
  }
  if (input) input.disabled = locked;
}

function setForwardComboLabel(text) {
  const label = document.getElementById("fdComboLabel");
  if (label) label.textContent = text;
}

function openForwardDateModal(targetCaseNo = "") {
  const modal = ensureForwardModalMounted();
  if (!modal) return;
  forwardModalRevision++;

  // Reset state
  window.fdState.selectedCase = null;
  setForwardComboLocked(false);
  window.fdState.nextDate = null;
  window.fdState.stage = "";
  window.fdState.notes = "";

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  window.calState.m = today.getMonth();
  window.calState.y = today.getFullYear();

  // Reset inputs
  const input = document.getElementById("fdComboInput");
  if (input) {
    input.value = "";
  }
  closeForwardCombo();
  setForwardComboLabel("Select a case...");

  const sub = document.getElementById("fdModalSub");
  if (sub) sub.textContent = "Select a case to begin";

  const disposedWarn = document.getElementById("fdDisposedWarningBox");
  if (disposedWarn) disposedWarn.style.display = "none";

  const caseDetailSec = document.getElementById("fdCaseDetailSection");
  if (caseDetailSec) caseDetailSec.style.display = "none";

  const newDateSec = document.getElementById("fdNewDateSection");
  if (newDateSec) newDateSec.style.display = "";

  const notesSec = document.getElementById("fdNotesSection");
  if (notesSec) notesSec.style.display = "";

  const notesInput = document.getElementById("fdProceedingsNote");
  if (notesInput) notesInput.value = "";

  const waBar = document.getElementById("fdWhatsAppBar");
  if (waBar) waBar.style.display = "none";

  const stageSelect = document.getElementById("fdStageSelect");
  if (stageSelect) stageSelect.value = "";

  const customStageWrap = document.getElementById("fdCustomStageWrap");
  if (customStageWrap) customStageWrap.style.display = "none";
  const customStageInput = document.getElementById("fdCustomStageInput");
  if (customStageInput) customStageInput.value = "";

  // Render dropdown with live allCaseRecords
  renderForwardComboOptions(forwardCases());

  // Render custom date picker
  renderForwardCalendar();
  updateForwardNextDateCard();

  // Open modal
  modal.classList.remove("hidden");
  modal.classList.add("open");
  modal.style.display = "flex";
  if (typeof document !== "undefined" && document.body) {
    document.body.style.overflow = "hidden";
  }

  // If a case was passed in, select it immediately
  if (targetCaseNo) {
    const match = findForwardCase(targetCaseNo);
    setForwardComboLocked(true);
    if (match) {
      applyForwardCaseSelection(match);
    } else {
      const message = `Case not found: ${targetCaseNo}`;
      setForwardComboLabel(message);
      if (sub) sub.textContent = message;
    }
  }
}

function closeForwardDateModal() {
  forwardModalRevision++;
  const modal = document.getElementById("fdModal");
  if (modal) {
    modal.classList.remove("open");
    modal.classList.add("hidden");
    modal.style.display = "none";
  }
  closeForwardCombo();
  if (typeof document !== "undefined" && document.body) {
    document.body.style.overflow = "";
  }
}

function toggleForwardCombo(e) {
  if (e) e.stopPropagation();
  if (window.fdState.caseSelectionLocked) return;
  const dropdown = document.getElementById("fdComboDropdown");
  if (e?.target?.id === "fdComboInput" && dropdown?.classList.contains("open")) return;
  if (dropdown && dropdown.classList.contains("open")) {
    closeForwardCombo();
  } else {
    openForwardCombo(e);
  }
}

function openForwardCombo(e) {
  if (e) e.stopPropagation();
  if (window.fdState.caseSelectionLocked) return;
  const dropdown = document.getElementById("fdComboDropdown");
  const inputWrap = document.getElementById("fdComboInputWrap");
  const input = document.getElementById("fdComboInput");
  if (dropdown && !dropdown.classList.contains("open")) {
    if (input) input.value = "";
    renderForwardComboOptions(forwardCases());
  }
  if (dropdown) dropdown.classList.add("open");
  if (inputWrap) {
    inputWrap.classList.add("focused", "open");
    inputWrap.setAttribute("aria-expanded", "true");
  }
  if (input) input.setAttribute("aria-expanded", "true");
  if (input) input.focus();
}

function closeForwardCombo() {
  const dropdown = document.getElementById("fdComboDropdown");
  const inputWrap = document.getElementById("fdComboInputWrap");
  if (dropdown) dropdown.classList.remove("open");
  if (inputWrap) {
    inputWrap.classList.remove("focused", "open");
    inputWrap.setAttribute("aria-expanded", "false");
  }
  const input = document.getElementById("fdComboInput");
  if (input) input.setAttribute("aria-expanded", "false");
}

function onForwardComboInput(val) {
  if (window.fdState.caseSelectionLocked) return;
  openForwardCombo();
  const q = String(val || "").toLowerCase().trim();
  const casesList = forwardCases();

  const filtered = q
    ? casesList.filter((c) => {
        const searchable = [c.caseNo, c.criminalCaseNumber, forwardCaseName(c),
          c.plaintiff, c.defendant, c.petitioner, c.respondent, c.applicant,
          c.victimName, c.accusedName, c.parties];
        return searchable.some((part) => String(part || "").toLowerCase().includes(q));
      })
    : casesList;

  renderForwardComboOptions(filtered);
}

function renderForwardComboOptions(list) {
  const options = document.getElementById("fdComboOptions");
  if (!options) return;
  options.replaceChildren();

  // Active undated cases first, then active dated cases, then disposed/decided cases at the bottom
  const sorted = [...(list || [])].sort((a, b) => {
    const aDisp = forwardCaseDisposed(a);
    const bDisp = forwardCaseDisposed(b);
    if (aDisp !== bDisp) return aDisp ? 1 : -1;

    const aUndated =
      !aDisp &&
      (!a.nextHearing || a.nextHearing === "—" || (a.caseStatus || "").toLowerCase() === "undated")
        ? 0
        : 1;
    const bUndated =
      !bDisp &&
      (!b.nextHearing || b.nextHearing === "—" || (b.caseStatus || "").toLowerCase() === "undated")
        ? 0
        : 1;
    if (aUndated !== bUndated) return aUndated - bUndated;
    return 0;
  });

  if (sorted.length === 0) {
    const empty = document.createElement("div");
    empty.className = "fd-combo-empty";
    empty.textContent = "No cases match your search";
    options.appendChild(empty);
    return;
  }

  sorted.slice(0, 80).forEach((c) => {
      const caseNum = forwardCaseNumber(c);
      const caseName = forwardCaseName(c);
      const isDisp = forwardCaseDisposed(c);
      const isUndated =
        !isDisp &&
        (!c.nextHearing ||
          c.nextHearing === "—" ||
          (c.caseStatus || "").toLowerCase() === "undated");
      const isSelected = window.fdState.selectedCase === c;
      const option = document.createElement("button");
      option.type = "button";
      option.className = `fd-combo-option${isSelected ? " selected" : ""}`;
      option.setAttribute("role", "option");
      option.setAttribute("aria-selected", String(isSelected));
      const text = document.createElement("span");
      text.className = "fd-co-text";
      const title = document.createElement("span");
      title.className = "fd-co-title";
      title.textContent = caseName;
      const subtitle = document.createElement("span");
      subtitle.className = "fd-co-sub";
      subtitle.textContent = `${caseNum || "—"} • ${c.courtName || c.court || "Court"}`;
      text.append(title, subtitle);
      const badge = document.createElement("span");
      badge.className = `fd-co-badge${isDisp ? " disposed" : isUndated ? " undated" : ""}`;
      badge.textContent = isDisp ? "Decided / Disposed" : isUndated ? "Undated" : c.caseType || "Civil";
      if (!isDisp && !isUndated) {
        badge.dataset.caseType = String(c.caseType || "Civil").toLowerCase().match(/\b(civil|criminal|revenue|family)\b/)?.[1] || "other";
      }
      const icon = document.createElement("span");
      icon.className = "fd-co-icon";
      const glyph = document.createElement("iconify-icon");
      glyph.setAttribute("icon", isDisp ? "lucide:check-circle-2" : isUndated ? "lucide:calendar-x" : "lucide:scale");
      icon.appendChild(glyph);
      option.append(text, badge, icon);
      option.addEventListener("click", (event) => {
        event.stopPropagation();
        selectForwardCase(caseNum);
        document.getElementById("fdComboInputWrap")?.focus();
      });
      option.addEventListener("keydown", handleForwardComboKeydown);
      options.appendChild(option);
    });
}

function selectForwardCase(caseNo, e) {
  if (e) e.stopPropagation();
  if (window.fdState.caseSelectionLocked) return;
  const c = findForwardCase(caseNo);
  if (c) applyForwardCaseSelection(c);
}

function applyForwardCaseSelection(c) {
  window.fdState.selectedCase = c;
  const caseName = forwardCaseName(c);
  const officialNum = forwardCaseNumber(c);

  // Update input display
  const input = document.getElementById("fdComboInput");
  if (input) input.value = "";
  setForwardComboLabel(`${caseName} — ${officialNum}`);
  closeForwardCombo();
  renderForwardComboOptions(forwardCases());

  // Populate Case Details Card
  const caseDetailSec = document.getElementById("fdCaseDetailSection");
  if (caseDetailSec) caseDetailSec.style.display = "";

  const setEl = (id, val, isMuted = false) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = val || "—";
    if (isMuted) el.classList.add("muted");
    else el.classList.remove("muted");
  };

  setEl("fdCdcCaseName", caseName);
  setEl("fdCdcCaseNo", officialNum);
  setEl("fdCdcCaseType", (c.caseType || "Civil").toUpperCase());
  setEl("fdCdcCourt", c.courtName || c.court || "—");
  setEl("fdCdcFilingDate", c.filingDate || c.regDate || "—");

  // Client Name & Representation Role
  const clientName = c.clientName || c.criminalClientName || "—";
  setEl("fdCdcClientName", clientName);

  let representation = "Client";
  if (c.plaintiff && (clientName === c.plaintiff || !c.defendant)) {
    representation = "Plaintiff / Petitioner (वादी)";
  } else if (c.defendant && clientName === c.defendant) {
    representation = "Defendant / Respondent (प्रतिवादी)";
  } else if (c.accusedName && clientName === c.accusedName) {
    representation = "Accused (अभियुक्त)";
  } else if (c.victimName && clientName === c.victimName) {
    representation = "Victim / Complainant (परिवादी)";
  } else if (c.petitioner && clientName === c.petitioner) {
    representation = "Petitioner (याचिकाकर्ता)";
  } else if (c.respondent && clientName === c.respondent) {
    representation = "Respondent (प्रत्यर्थी)";
  }
  setEl("fdCdcClientRole", representation);

  if (c.nextHearing && c.nextHearing !== "—") {
    setEl(
      "fdCdcPrevDate",
      typeof formatDateDMY === "function" ? formatDateDMY(c.nextHearing) : c.nextHearing,
    );
  } else {
    setEl("fdCdcPrevDate", "Not Set (Undated)", true);
  }

  // Determine previous case stage
  let prevStage = "";
  if (c.hearingProcess && c.hearingProcess !== "—" && c.hearingProcess !== "Not Specified") {
    prevStage = c.hearingProcess.trim();
  } else if (c.stage && c.stage !== "—") {
    prevStage = c.stage.trim();
  } else if (c.caseStage && c.caseStage !== "—") {
    prevStage = c.caseStage.trim();
  }

  // If not on case object, check hearing history in allHearingRecords
  if (!prevStage) {
    const caseNo = (c.caseNo || c.criminalCaseNumber || c.case_number || "").trim().toLowerCase();
    const hearings = (typeof window !== "undefined" && Array.isArray(window.allHearingRecords))
      ? window.allHearingRecords
      : ((typeof allHearingRecords !== "undefined" && Array.isArray(allHearingRecords)) ? allHearingRecords : []);

    if (caseNo && hearings.length > 0) {
      const caseHearings = hearings.filter(h => {
        const hNo = (h.case_number || h.caseNo || "").trim().toLowerCase();
        return hNo === caseNo;
      }).sort((a, b) => new Date(b.hearing_date || 0) - new Date(a.hearing_date || 0));

      if (caseHearings.length > 0) {
        const hStage = (caseHearings[0].process || caseHearings[0].hearing_process || caseHearings[0].stage || "").trim();
        if (hStage && hStage !== "—" && hStage !== "Not Specified") {
          prevStage = hStage;
        }
      }
    }
  }

  if (prevStage) {
    setEl("fdCdcPrevStage", prevStage);
  } else {
    setEl("fdCdcPrevStage", "Not Specified", true);
  }

  // Pre-fill stage select with previous stage
  const stageSelect = document.getElementById("fdStageSelect");
  const customStageWrap = document.getElementById("fdCustomStageWrap");
  const customStageInput = document.getElementById("fdCustomStageInput");

  if (stageSelect) {
    if (prevStage) {
      const matchingOpt = Array.from(stageSelect.options).find(
        (o) => o.value.trim().toLowerCase() === prevStage.toLowerCase()
      );
      if (matchingOpt) {
        stageSelect.value = matchingOpt.value;
        if (customStageWrap) customStageWrap.style.display = "none";
        if (customStageInput) customStageInput.value = "";
      } else {
        // Custom stage not in standard predefined options: select 'Other' and populate custom input
        stageSelect.value = "Other";
        if (customStageWrap) customStageWrap.style.display = "block";
        if (customStageInput) customStageInput.value = prevStage;
      }
    } else {
      stageSelect.value = "";
      if (customStageWrap) customStageWrap.style.display = "none";
      if (customStageInput) customStageInput.value = "";
    }
  }

  // Update Recommended Next Stage
  const recStage = getForwardRecommendedNextStage(prevStage);
  const recWrap = document.getElementById("fdStageRecWrap");
  const recText = document.getElementById("fdStageRecText");
  if (recWrap && recText && recStage) {
    recText.textContent = recStage;
    recWrap.style.display = "inline-flex";
  } else if (recWrap) {
    recWrap.style.display = "none";
  }

  // Reveal next sections or warn if Disposed
  const isDisp = forwardCaseDisposed(c);
  const newDateSec = document.getElementById("fdNewDateSection");
  const notesSec = document.getElementById("fdNotesSection");
  const sub = document.getElementById("fdModalSub");
  const disposedWarn = document.getElementById("fdDisposedWarningBox");

  if (isDisp) {
    if (newDateSec) newDateSec.style.display = "none";
    if (notesSec) notesSec.style.display = "none";
    if (sub) sub.textContent = `${officialNum} • ${caseName} [DISPOSED / CLOSED MATTER]`;
    if (!disposedWarn) {
      const warnBox = document.createElement("div");
      warnBox.id = "fdDisposedWarningBox";
      warnBox.className = "fd-disposed-warning-box";
      warnBox.style.cssText = "background:#fef2f2; border:1px solid #fecaca; border-radius:10px; padding:14px 16px; margin:16px 0; color:#991b1b; display:flex; align-items:flex-start; gap:12px;";
      warnBox.innerHTML = `
        <iconify-icon icon="lucide:alert-triangle" style="font-size:22px; color:#dc2626; margin-top:2px; flex-shrink:0;"></iconify-icon>
        <div>
          <strong style="display:block; font-size:14px; margin-bottom:4px;">Disposed Case (Closed Record)</strong>
          <span style="font-size:12px; line-height:1.4; color:#b91c1c; display:block;">This case is marked as Disposed/Decided. Standard hearing dates cannot be forwarded on a closed file. To reopen, a formal Restoration Petition (Order 9 CPC) or Miscellaneous Application must be registered.</span>
        </div>
      `;
      const caseDetailSec = document.getElementById("fdCaseDetailSection");
      if (caseDetailSec && caseDetailSec.parentNode) {
        caseDetailSec.parentNode.insertBefore(warnBox, caseDetailSec.nextSibling);
      }
    } else {
      disposedWarn.style.display = "flex";
    }
  } else {
    if (disposedWarn) disposedWarn.style.display = "none";
    if (newDateSec) newDateSec.style.display = "";
    if (notesSec) notesSec.style.display = "";
    if (sub) sub.textContent = `${officialNum} • ${caseName}`;
  }

  // WhatsApp particulars
  const cClient = c.clientName || c.criminalClientName || "Client";
  const cPhone = c.clientNumber || c.criminalClientNumber || "Direct Phone";
  const waNameEl = document.getElementById("fdWaClientName");
  const waPhoneEl = document.getElementById("fdWaClientPhone");
  if (waNameEl) waNameEl.textContent = `Notify ${cClient}`;
  if (waPhoneEl) waPhoneEl.textContent = `WhatsApp: ${cPhone}`;

  // Reset next date
  window.fdState.nextDate = null;
  updateForwardNextDateCard();

}

function handleForwardComboKeydown(e) {
  if (window.fdState.caseSelectionLocked) return;
  const dropdown = document.getElementById("fdComboDropdown");
  const trigger = document.getElementById("fdComboInputWrap");
  if (e.key === "Escape" && dropdown?.classList.contains("open")) {
    e.preventDefault();
    e.stopPropagation();
    closeForwardCombo();
    trigger?.focus();
  } else if (e.key === "Tab") {
    closeForwardCombo();
  } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    e.preventDefault();
    e.stopPropagation();
    if (!dropdown?.classList.contains("open")) openForwardCombo();
    const options = [...document.querySelectorAll("#fdComboOptions .fd-combo-option")];
    if (!options.length) return;
    const index = options.indexOf(document.activeElement);
    const next = e.key === "ArrowDown"
      ? Math.min(index + 1, options.length - 1)
      : index < 0 ? options.length - 1 : Math.max(index - 1, 0);
    options[next].focus();
  } else if (e.key === "Enter" && document.activeElement?.matches("#fdComboOptions .fd-combo-option")) {
    e.preventDefault();
    e.stopPropagation();
    document.activeElement.click();
  } else if (e.key === "Enter" && e.target?.id === "fdComboInputWrap") {
    e.preventDefault();
    e.stopPropagation();
    if (dropdown?.classList.contains("open")) closeForwardCombo();
    else openForwardCombo();
  } else if (e.key === "Enter" && !dropdown?.classList.contains("open")) {
    e.preventDefault();
    openForwardCombo();
  }
}

function onForwardStageChange(val) {
  const customWrap = document.getElementById("fdCustomStageWrap");
  if (customWrap) {
    customWrap.style.display = val === "Other" ? "block" : "none";
  }
}

// -------------------------------------------------------------
// Refined Custom Date Picker Engine (Monday-to-Sunday 42 cells)
// -------------------------------------------------------------

function renderForwardCalendar() {
  const m = window.calState.m;
  const y = window.calState.y;

  const titleEl = document.getElementById("fdCalTitle");
  if (titleEl) titleEl.textContent = `${FD_MONTHS_FULL[m]} ${y}`;

  const daysGrid = document.getElementById("fdCalDays");
  if (!daysGrid) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Monday-first adjustment: Sunday (0) -> offset 6, else day - 1
  const firstDayOfMonth = new Date(y, m, 1);
  let startDay = firstDayOfMonth.getDay();
  let offset = startDay === 0 ? 6 : startDay - 1;

  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const prevMonthDays = new Date(y, m, 0).getDate();

  const totalCells = 42;
  const cells = [];

  // Previous month fill
  for (let i = offset - 1; i >= 0; i--) {
    const dayNum = prevMonthDays - i;
    const dObj = new Date(y, m - 1, dayNum);
    cells.push({ day: dayNum, month: m - 1, year: y, isCurrent: false, date: dObj });
  }

  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    const dObj = new Date(y, m, d);
    cells.push({ day: d, month: m, year: y, isCurrent: true, date: dObj });
  }

  // Next month fill to complete 42 cells
  const remaining = totalCells - cells.length;
  for (let i = 1; i <= remaining; i++) {
    const dObj = new Date(y, m + 1, i);
    cells.push({ day: i, month: m + 1, year: y, isCurrent: false, date: dObj });
  }

  const selectedISO = window.fdState.nextDate;
  const allCases = (typeof window !== "undefined" && Array.isArray(window.allCaseRecords)) ? window.allCaseRecords : [];
  const allHearings = (typeof window !== "undefined" && Array.isArray(window.allHearingRecords)) ? window.allHearingRecords : [];

  let html = "";
  cells.forEach((c) => {
    const iso = fdFormatYMD(c.date);
    const isToday = c.date.getTime() === today.getTime();
    const isSelected = Boolean(selectedISO && iso === selectedISO);
    const isSunday = c.date.getDay() === 0;

    let hearingCount = 0;
    if (allCases.length > 0 || allHearings.length > 0) {
      const caseMatches = allCases.filter(rec => {
        const next = (typeof toISODate === "function") ? toISODate(rec.nextHearing) : (rec.nextHearing || "");
        return next && next === iso;
      }).length;
      const hearingMatches = allHearings.filter(h => {
        const hd = (typeof toISODate === "function") ? toISODate(h.hearing_date) : (h.hearing_date || "");
        return hd && hd === iso;
      }).length;
      hearingCount = Math.max(caseMatches, hearingMatches);
    }

    const classes = ["fd-cal-day"];
    if (!c.isCurrent) classes.push("other");
    if (isToday) classes.push("today");
    if (isSelected) classes.push("selected");
    if (isSunday) classes.push("cal-day-sunday");

    let loadBadge = "";
    let dayTitle = `${c.day}`;
    if (hearingCount > 0) {
      classes.push("has-hearings");
      const loadClass = hearingCount >= 7 ? "load-heavy" : (hearingCount >= 4 ? "load-medium" : "load-light");
      loadBadge = `<span class="cal-load-indicator ${loadClass}"></span>`;
      dayTitle += ` • ${hearingCount} hearing(s) scheduled`;
    }
    if (isSunday) dayTitle += ` • Sunday (Courts Closed)`;

    html += `<button type="button" class="${classes.join(" ")}" title="${dayTitle}" onclick="calSelect(${c.day}, ${c.month}, ${c.year})"><span class="fd-day-num">${c.day}</span>${loadBadge}</button>`;
  });

  daysGrid.innerHTML = html;
}

function calSelect(day, m, y) {
  const d = new Date(y, m, day);
  window.fdState.nextDate = fdFormatYMD(d);

  if (m !== window.calState.m || y !== window.calState.y) {
    window.calState.m = d.getMonth();
    window.calState.y = d.getFullYear();
  }

  renderForwardCalendar();
  updateForwardNextDateCard();
}

function calPrevMonth() {
  window.calState.m--;
  if (window.calState.m < 0) {
    window.calState.m = 11;
    window.calState.y--;
  }
  renderForwardCalendar();
}

function calNextMonth() {
  window.calState.m++;
  if (window.calState.m > 11) {
    window.calState.m = 0;
    window.calState.y++;
  }
  renderForwardCalendar();
}

function calPrevYear() {
  window.calState.y--;
  renderForwardCalendar();
}

function calNextYear() {
  window.calState.y++;
  renderForwardCalendar();
}

function calToday() {
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  window.calState.m = t.getMonth();
  window.calState.y = t.getFullYear();
  window.fdState.nextDate = fdFormatYMD(t);
  renderForwardCalendar();
  updateForwardNextDateCard();
}

function calClear() {
  window.fdState.nextDate = null;
  renderForwardCalendar();
  updateForwardNextDateCard();
}

function setForwardDatePreset(offsetDays) {
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  t.setDate(t.getDate() + offsetDays);

  window.calState.m = t.getMonth();
  window.calState.y = t.getFullYear();
  window.fdState.nextDate = fdFormatYMD(t);

  renderForwardCalendar();
  updateForwardNextDateCard();
}

function updateForwardNextDateCard() {
  const nextDateEl = document.getElementById("fdNdcNextDate");
  const nextDayEl = document.getElementById("fdNdcNextDay");
  const intervalEl = document.getElementById("fdNdcInterval");
  const pillEl = document.getElementById("fdCalSelectedText");

  if (!window.fdState.nextDate) {
    if (nextDateEl) {
      nextDateEl.textContent = "Select a date";
      nextDateEl.classList.add("placeholder");
    }
    if (nextDayEl) {
      nextDayEl.textContent = "—";
      nextDayEl.classList.add("placeholder");
    }
    if (intervalEl) {
      intervalEl.textContent = "—";
      intervalEl.classList.add("placeholder");
    }
    if (pillEl) pillEl.textContent = "none";
    return;
  }

  const parts = window.fdState.nextDate.split("-");
  const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));

  if (nextDateEl) {
    nextDateEl.textContent = fdFormatDisplay(d);
    nextDateEl.classList.remove("placeholder");
  }
  if (nextDayEl) {
    nextDayEl.textContent = FD_DAYS_FULL[d.getDay()];
    nextDayEl.classList.remove("placeholder");
  }
  if (pillEl) {
    pillEl.textContent = `${d.getDate()} ${FD_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  }

  // Sunday Alert
  const sundayAlert = document.getElementById("fdSundayAlert");
  if (sundayAlert) {
    sundayAlert.style.display = d.getDay() === 0 ? "flex" : "none";
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffDays = Math.round((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (intervalEl) {
    if (diffDays === 0) intervalEl.textContent = "Today";
    else if (diffDays === 1) intervalEl.textContent = "Tomorrow (1 day)";
    else if (diffDays > 1) intervalEl.textContent = `in ${diffDays} days`;
    else intervalEl.textContent = `${Math.abs(diffDays)} days ago (⚠️ Past Date)`;
    intervalEl.classList.remove("placeholder");
  }
}

// -------------------------------------------------------------
// Stage Recommendation, Snippets, Disposal & Batch Helpers
// -------------------------------------------------------------

function getForwardRecommendedNextStage(prevStage) {
  if (!prevStage || typeof prevStage !== "string") return "Evidence";
  const s = prevStage.toLowerCase();
  if (s.includes("summon") || s.includes("notice")) return "Framing of Issues";
  if (s.includes("fram") || s.includes("issue")) return "Evidence";
  if (s.includes("pre-summon")) return "Summoning Order";
  if (s.includes("evidence")) return "Cross Examination";
  if (s.includes("cross")) return "Arguments";
  if (s.includes("argument")) return "Final Order";
  if (s.includes("bail")) return "Arguments";
  if (s.includes("plea")) return "Evidence";
  if (s.includes("compliance")) return "Arguments";
  return "Evidence";
}

function applyForwardModalRecStage() {
  const recEl = document.getElementById("fdStageRecText");
  const stage = recEl ? recEl.textContent.trim() : "";
  if (stage) quickSelectForwardStage(stage);
}

function quickSelectForwardStage(stageName) {
  const stageSelect = document.getElementById("fdStageSelect");
  if (stageSelect) {
    stageSelect.value = stageName;
    onForwardStageChange(stageName);
  }
  document.querySelectorAll("#fdQuickStagePills .fd-stage-pill").forEach((pill) => {
    if (pill.textContent.trim().toLowerCase() === stageName.toLowerCase().replace(" hearing", "").trim()) {
      pill.classList.add("active");
    } else {
      pill.classList.remove("active");
    }
  });
}

function appendForwardSnippet(snippet) {
  const noteEl = document.getElementById("fdProceedingsNote");
  if (!noteEl) return;
  const current = (noteEl.value || "").trim();
  if (!current) {
    noteEl.value = snippet;
  } else {
    noteEl.value = current.endsWith(".") ? `${current} ${snippet}` : `${current}. ${snippet}`;
  }
  noteEl.focus();
}

function toggleForwardModalDisposal(isDisposed) {
  const submitBtnText = document.getElementById("fdSubmitBtnText");
  const newDateSec = document.getElementById("fdNewDateSection");
  if (isDisposed) {
    if (submitBtnText) submitBtnText.textContent = "Confirm & Dispose Case";
    quickSelectForwardStage("Final Order");
    appendForwardSnippet("Case disposed / decided on merits.");
    if (newDateSec) newDateSec.style.opacity = "0.45";
  } else {
    if (submitBtnText) submitBtnText.textContent = "Forward Date";
    if (newDateSec) newDateSec.style.opacity = "1";
  }
}

function forwardAnotherCaseInModal() {
  const successCard = document.getElementById("fdSuccessCard");
  if (successCard) successCard.style.display = "none";

  const footer = document.querySelector("#fdModal .fd-modal-footer");
  if (footer) footer.style.display = "flex";

  window.fdState.selectedCase = null;
  setForwardComboLocked(false);
  window.fdState.nextDate = null;
  window.fdState.stage = "";
  window.fdState.notes = "";

  const input = document.getElementById("fdComboInput");
  if (input) input.value = "";
  closeForwardCombo();
  setForwardComboLabel("Select a case...");

  const sub = document.getElementById("fdModalSub");
  if (sub) sub.textContent = "Select a case to begin";

  const caseDetailSec = document.getElementById("fdCaseDetailSection");
  if (caseDetailSec) caseDetailSec.style.display = "none";

  const notesInput = document.getElementById("fdProceedingsNote");
  if (notesInput) notesInput.value = "";

  const stageSelect = document.getElementById("fdStageSelect");
  if (stageSelect) stageSelect.value = "";

  const disposedToggle = document.getElementById("fdDisposedToggle");
  if (disposedToggle) disposedToggle.checked = false;
  toggleForwardModalDisposal(false);

  renderForwardComboOptions(forwardCases());
  renderForwardCalendar();
  updateForwardNextDateCard();

  openForwardCombo();
}

// -------------------------------------------------------------
// Submit Forward Date to Supabase & Synchronize State
// -------------------------------------------------------------

let isSubmittingForwardDateModal = false;

async function submitForwardDateModal() {
  if (isSubmittingForwardDateModal) {
    console.warn(
      "Forward Date modal submission already in progress, blocking duplicate submission.",
    );
    return;
  }
  if (!window.fdState.selectedCase) {
    alert("⚠️ Please select a case first.");
    return;
  }

  const isDisposed = Boolean(document.getElementById("fdDisposedToggle")?.checked);
  if (!isDisposed && !window.fdState.nextDate) {
    alert("⚠️ Please select a next hearing date.");
    return;
  }

  const stageSelect = document.getElementById("fdStageSelect");
  const customStageInput = document.getElementById("fdCustomStageInput");
  let chosenStage = isDisposed ? "Final Order" : (stageSelect ? stageSelect.value : "");

  if (chosenStage === "Other" && customStageInput) {
    chosenStage = customStageInput.value.trim();
  }

  if (!chosenStage) {
    alert("⚠️ Please select or type the Next Case Stage.");
    if (stageSelect) stageSelect.focus();
    return;
  }

  const nextDate = isDisposed ? "" : window.fdState.nextDate;
  const todayISO = fdFormatYMD(new Date());

  if (!isDisposed && nextDate && nextDate < todayISO) {
    const proceed = typeof confirm === "function" ? confirm("⚠️ Notice: The selected hearing date is in the PAST. Are you sure you want to schedule a past date?") : true;
    if (!proceed) return;
  }

  if (!isDisposed && nextDate) {
    const parts = nextDate.split("-");
    const testDate = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    if (testDate.getDay() === 0) {
      const proceed = typeof confirm === "function" ? confirm("⚠️ Notice: The selected hearing date falls on a SUNDAY (Courts are closed). Do you want to proceed?") : true;
      if (!proceed) return;
    }
  }

  const notes = document.getElementById("fdProceedingsNote")?.value?.trim() || (isDisposed ? "Case disposed / closed." : "");
  const caseObj = window.fdState.selectedCase;
  const caseNumber = (caseObj.caseNo || caseObj.criminalCaseNumber || "").trim();

  const btn = document.getElementById("fdSubmitBtn");
  const btnText = document.getElementById("fdSubmitBtnText");
  const icon = btn?.querySelector("iconify-icon");

  if (btn) {
    btn.disabled = true;
    btn.classList.add("loading");
  }
  if (icon) icon.setAttribute("icon", "lucide:loader-2");
  if (btnText) btnText.textContent = isDisposed ? "Disposing..." : "Forwarding...";

  try {
    isSubmittingForwardDateModal = true;
    if (typeof updateHearingInSupabase === "function") {
      await updateHearingInSupabase(caseNumber, nextDate, chosenStage, notes);
    }

    // Keep updated object ready for WhatsApp
    window.lastUpdatedHearingCase = {
      ...caseObj,
      nextHearing: nextDate,
      hearingProcess: chosenStage,
    };

    // Refresh UI & Tables across app
    if (typeof performPostCrudRefresh === "function") {
      await performPostCrudRefresh({ caseNumber: caseNumber });
    }

    const formattedDateStr = nextDate ? (typeof formatDateDMY === "function" ? formatDateDMY(nextDate) : nextDate) : "Disposed";
    const successMsg = isDisposed
      ? `Case "${caseNumber}" marked as Disposed / Decided successfully!`
      : `Hearing for "${caseNumber}" forwarded to ${formattedDateStr} (${chosenStage}) successfully!`;

    // Interactive Success Card display (Replaces the 900ms auto-close bug)
    const successCard = document.getElementById("fdSuccessCard");
    const successTitle = document.getElementById("fdSuccessTitle");
    const successDetails = document.getElementById("fdSuccessDetails");
    const footer = document.querySelector("#fdModal .fd-modal-footer");

    if (successCard && successTitle && successDetails) {
      successTitle.textContent = isDisposed ? "Case Marked as Disposed" : "Hearing Forwarded & Saved!";
      successDetails.textContent = successMsg;
      successCard.style.display = "block";
      if (footer) footer.style.display = "none";
    }

    if (typeof showCaseBookToast === "function") {
      showCaseBookToast(`✅ ${successMsg}`);
    } else if (!successCard) {
      alert(successMsg);
    }
  } catch (err) {
    console.error("Error forwarding date:", err);
    alert("❌ Error updating hearing: " + (err.message || "Unknown error"));
  } finally {
    isSubmittingForwardDateModal = false;
    if (btn) {
      btn.disabled = false;
      btn.classList.remove("loading");
    }
    if (icon) icon.setAttribute("icon", "lucide:send");
    if (btnText) btnText.textContent = isDisposed ? "Confirm & Dispose Case" : "Forward Date";
  }
}

function sendForwardWhatsAppNotice() {
  if (window.lastUpdatedHearingCase && typeof sendWhatsAppHearingNotice === "function") {
    sendWhatsAppHearingNotice(window.lastUpdatedHearingCase);
  } else if (window.fdState.selectedCase && typeof sendWhatsAppHearingNotice === "function") {
    const target = {
      ...window.fdState.selectedCase,
      nextHearing: window.fdState.nextDate || window.fdState.selectedCase.nextHearing,
      hearingProcess:
        document.getElementById("fdStageSelect")?.value ||
        window.fdState.selectedCase.hearingProcess,
    };
    sendWhatsAppHearingNotice(target);
  }
}

// Global exposure
window.openForwardDateModal = openForwardDateModal;
window.closeForwardDateModal = closeForwardDateModal;
window.toggleForwardCombo = toggleForwardCombo;
window.openForwardCombo = openForwardCombo;
window.closeForwardCombo = closeForwardCombo;
window.onForwardComboInput = onForwardComboInput;
window.handleForwardComboKeydown = handleForwardComboKeydown;
window.selectForwardCase = selectForwardCase;
window.onForwardStageChange = onForwardStageChange;
window.calSelect = calSelect;
window.calPrevMonth = calPrevMonth;
window.calNextMonth = calNextMonth;
window.calPrevYear = calPrevYear;
window.calNextYear = calNextYear;
window.calToday = calToday;
window.calClear = calClear;
window.setForwardDatePreset = setForwardDatePreset;
window.submitForwardDateModal = submitForwardDateModal;
window.sendForwardWhatsAppNotice = sendForwardWhatsAppNotice;
window.fdFormatYMD = fdFormatYMD;
window.fdFormatDisplay = fdFormatDisplay;
window.ensureForwardModalMounted = ensureForwardModalMounted;
window.updateForwardNextDateCard = updateForwardNextDateCard;
window.renderForwardCalendar = renderForwardCalendar;
window.renderForwardComboOptions = renderForwardComboOptions;
window.quickSelectForwardStage = quickSelectForwardStage;
window.applyForwardModalRecStage = applyForwardModalRecStage;
window.appendForwardSnippet = appendForwardSnippet;
window.toggleForwardModalDisposal = toggleForwardModalDisposal;
window.forwardAnotherCaseInModal = forwardAnotherCaseInModal;
window.getForwardRecommendedNextStage = getForwardRecommendedNextStage;

// Close on outside click
document.addEventListener("click", (e) => {
  const combo = document.getElementById("fdCaseCombo");
  if (combo && !combo.contains(e.target)) {
    closeForwardCombo();
  }
  const modal = document.getElementById("fdModal");
  if (modal && e.target === modal) {
    closeForwardDateModal();
  }
});

document.addEventListener("focusin", (e) => {
  const combo = document.getElementById("fdCaseCombo");
  if (combo && !combo.contains(e.target)) closeForwardCombo();
});


// ==============================================================================
// 🏛️ REVERTABLE LEGAL EDITORIAL STYLE CONTROLLER
// ==============================================================================
function isCdmEditorialEnabled() {
  if (typeof localStorage === 'undefined') return true;
  const saved = localStorage.getItem('cb_cdm_editorial_mode');
  return saved === null ? true : saved === 'true';
}

function applyCdmEditorialMode(enable) {
  const modal = document.getElementById('caseDetailsFullModal');
  const card = modal ? modal.querySelector('.case-details-modal-card') : null;
  const toggleBtn = document.getElementById('cdmStyleToggleBtn');
  const toggleText = document.getElementById('cdmStyleToggleText');

  if (card) {
    if (enable) {
      card.classList.add('cdm-editorial-mode');
    } else {
      card.classList.remove('cdm-editorial-mode');
    }
  }

  if (toggleText) {
    toggleText.textContent = enable ? '🏛️ Editorial Style' : '⚡ Modern Style';
  }
  const moreStyleText = document.getElementById('cdmMoreStyleText');
  if (moreStyleText) {
    moreStyleText.textContent = enable ? '⚡ Switch to Modern Style' : '🏛️ Switch to Editorial Style';
  }
  if (toggleBtn) {
    toggleBtn.setAttribute('title', enable ? 'Currently in Legal Editorial Style. Click to switch to Modern Style.' : 'Currently in Modern Style. Click to switch to Legal Editorial Style.');
  }

  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('cb_cdm_editorial_mode', enable ? 'true' : 'false');
  }
}

function toggleCdmEditorialStyle() {
  const current = isCdmEditorialEnabled();
  applyCdmEditorialMode(!current);
}

if (typeof window !== 'undefined') {
  window.isCdmEditorialEnabled = isCdmEditorialEnabled;
  window.applyCdmEditorialMode = applyCdmEditorialMode;
  window.toggleCdmEditorialStyle = toggleCdmEditorialStyle;
}
