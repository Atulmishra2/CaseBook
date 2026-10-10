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
      <div class="modal-card modal-container case-details-modal-card">
        <!-- Sticky Header -->
        <div class="modal-header">
          <div class="header-left">
            <div class="header-icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <div class="header-text">
              <div class="header-title" id="caseDetailsModalTitle">—</div>
              <div class="header-meta">
                <span class="header-case-no" id="caseDetailsModalCaseNo">—</span>
                <span class="header-meta-divider"></span>
                <span id="caseDetailsModalSubtitle">Civil Judge Senior Division • Pending</span>
              </div>
            </div>
          </div>

          <div class="header-badges">
            <span class="badge badge-type" id="cdmHeaderTypeBadge">⚖️ Civil</span>
            <span class="badge badge-pending" id="cdmHeaderStatusBadge">⏳ Pending</span>
          </div>

          <button
            type="button"
            class="modal-close-btn"
            aria-label="Close Case Details"
            onclick="closeCaseDetailsFullModal()"
            title="Close (Esc)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Scrollable Body -->
        <div class="modal-body cdm-modal-body">
          <!-- Hero Banner Card -->
          <div class="hero-card cdm-hero-card" id="cdmHeroCard">
            <div class="hero-main">
              <!-- Main Heading [CaseName] -->
              <h2 class="hero-case-title" id="cdmCaseTitle">—</h2>

              <!-- [courtName] -->
              <div class="hero-court-name" id="cdmHeroCourtName">—</div>

              <!-- [CaseNumber] [caseType] -->
              <div class="hero-case-meta">
                <span class="hero-case-no" id="cdmCaseNo">—</span>
                <span class="hero-meta-dot">•</span>
                <span class="hero-case-type" id="cdmHeroCaseType">—</span>
              </div>
            </div>

            <!-- Right Next Hearing Box with Glassmorphism -->
            <div class="hero-hearing-highlight" id="cdmHearingHighlight">
              <div class="hero-hearing-label">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" style="width:14px;height:14px;">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/>
                </svg>
                NEXT HEARING
              </div>
              <div class="hero-hearing-date" id="cdmNextHearingDate">—</div>
              <div class="hero-hearing-process" id="cdmNextHearingProcess">—</div>
            </div>
          </div>

          <!-- 3-Column Info Grid -->
          <div class="info-grid">
            <!-- Column 1: Court & Filing -->
            <div class="info-card" id="cdmCourtCard">
              <div class="section-header">
                <div class="section-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"/>
                  </svg>
                </div>
                <div class="section-title">Court &amp; Case Info</div>
              </div>
              <div class="field-list" id="cdmCourtCardBody">
                <div class="field-row">
                  <span class="field-label">CASE TYPE</span>
                  <span class="field-value"><strong id="cdmCaseTypeVal">CIVIL</strong></span>
                </div>
                <div class="field-row" id="cdmCaseYearRow">
                  <span class="field-label">REGISTRATION YEAR</span>
                  <span class="field-value" id="cdmCaseYearVal">—</span>
                </div>
                <div class="field-row">
                  <span class="field-label">COURT COMPLEX &amp; BENCH</span>
                  <span class="field-value" id="cdmCourtNameVal">—</span>
                </div>
                <div class="field-row" id="cdmFilingDateRow">
                  <span class="field-label">FILING DATE</span>
                  <span class="field-value" id="cdmFilingDateVal">—</span>
                </div>
                <div class="field-row" id="cdmPrevHearingRow">
                  <span class="field-label">PREVIOUS HEARING</span>
                  <span class="field-value" id="cdmPrevHearingVal">—</span>
                </div>
                <div class="field-row" id="cdmNextStageRow">
                  <span class="field-label">NEXT STAGE</span>
                  <span class="field-value" id="cdmNextStageVal">—</span>
                </div>
                <div class="field-row" id="cdmNextHearingRow">
                  <span class="field-label">NEXT HEARING DATE</span>
                  <span class="field-value"><strong id="cdmNextHearingVal">—</strong></span>
                </div>
              </div>
            </div>

            <!-- Column 2: Parties & Particulars -->
            <div class="info-card" id="cdmPartiesCard">
              <div class="section-header">
                <div class="section-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                </div>
                <div class="section-title">Parties &amp; Particulars</div>
              </div>
              <div class="field-list" id="cdmPartiesCardBody">
                <div class="field-row">
                  <span class="field-label">PLAINTIFF</span>
                  <span class="field-value"><strong id="cdmPlaintiffVal">Ravi Prakash &amp; Other</strong></span>
                </div>
                <div class="field-row">
                  <span class="field-label">DEFENDANT</span>
                  <span class="field-value" id="cdmDefendantVal">Bhragunath Sahay &amp; 16 others</span>
                </div>
                <div class="field-row" id="cdmMatterNatureRow">
                  <span class="field-label">MATTER / SUIT NATURE</span>
                  <span class="field-value" id="cdmMatterNatureVal">—</span>
                </div>
                <div class="field-row" id="cdmLegalSectionsRow">
                  <span class="field-label">LEGAL SECTIONS</span>
                  <span class="field-value" id="cdmLegalSectionsVal">—</span>
                </div>
                <div class="field-row cdm-card-remarks-row" id="cdmPartiesRemarksRow" style="display: none; margin-top: 6px;">
                  <span class="field-label">REMARKS &amp; NOTES</span>
                  <div class="cdm-card-remarks-box">
                    <div class="cdm-card-remarks-text" id="cdmPartiesRemarksText">—</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Column 3: Client & Coordinates -->
            <div class="info-card" id="cdmClientCard">
              <div class="section-header">
                <div class="section-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
                  </svg>
                </div>
                <div class="section-title">Client &amp; Coordinates</div>
              </div>
              <div class="field-list" id="cdmClientCardBody">
                <div class="field-row">
                  <span class="field-label">CLIENT NAME</span>
                  <span class="field-value"><strong id="cdmClientNameVal">Ravi Prakash</strong></span>
                </div>
                <div class="field-row">
                  <span class="field-label">MOBILE &amp; WHATSAPP</span>
                  <span class="field-value" id="cdmClientPhoneContainer">
                    <a id="cdmClientPhoneLink" href="#" class="field-value link">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="width:13px;height:13px;">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
                      </svg>
                      <span id="cdmClientPhoneVal">—</span>
                    </a>
                  </span>
                </div>
                <div class="field-row" id="cdmClientRoleRow">
                  <span class="field-label">REPRESENTATION ROLE</span>
                  <span class="field-value" id="cdmClientRoleVal">—</span>
                </div>
                <div class="field-row" id="cdmFeeStatusRow">
                  <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                    <span class="field-label">FEE &amp; EXPENSE STATUS</span>
                    <a href="javascript:void(0);" onclick="document.getElementById('cdmFinancialsSection')?.scrollIntoView({behavior:'smooth'});" style="font-size: 0.65rem; color: var(--primary-light); text-decoration: none; font-weight: 600;">View Ledger ➔</a>
                  </div>
                  <div id="cdmFeeStatusContainer" style="display: flex; flex-direction: column; gap: 6px; margin-top: 2px;">
                    <span class="fee-status" id="cdmFeeStatusBadge">✅ Active Case</span>
                    <div id="cdmFeeQuickSummary" style="font-size: 0.72rem; color: var(--text-muted); display: flex; gap: 8px; flex-wrap: wrap;">
                      <span>Recv: <strong id="cdmCardFeeRecv" style="color: #6ee7b7;">₹0</strong></span>
                      <span>•</span>
                      <span>Spent: <strong id="cdmCardFeeSpent" style="color: #fca5a5;">₹0</strong></span>
                      <span>•</span>
                      <span>Net: <strong id="cdmCardFeeNet" style="color: #93c5fd;">₹0</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Remarks & Notes Full-Width Section -->
          <div class="full-width-section cdm-remarks-box" id="cdmRemarksSection">
            <div class="section-header">
              <div class="section-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                </svg>
              </div>
              <div class="section-title">Remarks &amp; Notes</div>
            </div>
            <div class="remarks-box">
              <div id="cdmRemarksText">—</div>
            </div>
          </div>

          <!-- Final Disposal Order Card (Hidden if pending) -->
          <div class="full-width-section cdm-disposal-box hidden" id="cdmDisposalSection">
            <div class="section-header">
              <div class="section-icon" style="background: rgba(16, 185, 129, 0.15); color: #10b981;">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="section-title">Disposal Order &amp; Final Comments</div>
              <span id="cdmDisposalDateBadge" class="table-badge completed" style="margin-left: auto;">Disposed</span>
            </div>
            <div class="remarks-box" style="border-color: rgba(16, 185, 129, 0.3);">
              <div id="cdmDisposalCommentText">—</div>
            </div>
          </div>

          <!-- Case Financials & Virtual Account Ledger -->
          <div class="full-width-section cdm-financials-card" id="cdmFinancialsSection">
            <div class="section-header" style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <div class="section-icon" style="background: rgba(16, 185, 129, 0.15); color: #10b981;">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div class="section-title">Case Financials &amp; Expense Ledger</div>
                  <div style="font-size: 0.65rem; color: var(--text-muted); font-weight: 500;">Synced with Virtual Account</div>
                </div>
              </div>
              <div class="financials-summary-pills" style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #6ee7b7; border: 1px solid rgba(16, 185, 129, 0.3); font-size: 0.70rem; padding: 4px 10px;">
                  Received: <strong id="cdmTotalReceivedVal" style="margin-left: 4px; font-weight: 800;">₹0</strong>
                </span>
                <span class="badge" style="background: rgba(239, 68, 68, 0.15); color: #fca5a5; border: 1px solid rgba(239, 68, 68, 0.3); font-size: 0.70rem; padding: 4px 10px;">
                  Spent: <strong id="cdmTotalSpentVal" style="margin-left: 4px; font-weight: 800;">₹0</strong>
                </span>
                <span class="badge" id="cdmNetBalanceBadge" style="background: rgba(99, 102, 241, 0.18); color: #c7d2fe; border: 1px solid rgba(99, 102, 241, 0.35); font-size: 0.70rem; padding: 4px 10px;">
                  Net Balance: <strong id="cdmNetBalanceVal" style="margin-left: 4px; font-weight: 800;">₹0</strong>
                </span>
              </div>
            </div>
            
            <div class="data-table-wrapper" style="margin-top: 10px;">
              <table class="data-table">
                <thead>
                  <tr>
                    <th style="width: 105px;">Date</th>
                    <th style="width: 130px;">Entry Type</th>
                    <th>Particulars &amp; Purpose</th>
                    <th style="width: 80px;">Mode</th>
                    <th style="text-align: right; width: 130px;">Fee Received</th>
                    <th style="text-align: right; width: 130px;">Expense Spent</th>
                  </tr>
                </thead>
                <tbody id="cdmFinancialsTableBody">
                  <!-- Rendered dynamically from Virtual Account transactions -->
                </tbody>
              </table>
            </div>
            <div id="cdmFinancialsEmpty" class="history-empty hidden" style="padding: 24px; text-align: center; color: var(--text-muted); background: var(--bg-subtle); border-radius: var(--radius-md); margin-top: 10px; border: 1px dashed var(--border-color);">
              <div style="font-size: 1.5rem; margin-bottom: 6px;">💼</div>
              <p style="font-size: 0.8rem; margin: 0;">No fee receipts or case expenses recorded in Virtual Account for this case yet.</p>
              <div style="margin-top: 10px; display: flex; gap: 8px; justify-content: center;">
                <button type="button" class="footer-btn footer-btn-ghost" onclick="cdmQuickAddFee('received')" style="border: 1px solid var(--border-color); font-size: 0.72rem; padding: 4px 12px; border-radius: 6px;">+ Record Fee Received</button>
                <button type="button" class="footer-btn footer-btn-ghost" onclick="cdmQuickAddFee('spent')" style="border: 1px solid var(--border-color); font-size: 0.72rem; padding: 4px 12px; border-radius: 6px;">− Record Case Expense</button>
              </div>
            </div>
          </div>

          <!-- Chronological Hearing History -->
          <div class="full-width-section cdm-history-card" id="cdmHistorySection">
            <div class="section-header">
              <div class="section-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="section-title">Hearing History</div>
              <span id="cdmHearingCountSub" style="margin-left: auto; font-size: 0.72rem; color: var(--text-muted);">—</span>
            </div>
            <div class="data-table-wrapper">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Stage</th>
                    <th>Proceedings &amp; Notes</th>
                  </tr>
                </thead>
                <tbody id="cdmHistoryTableBody">
                  <!-- Injected dynamically -->
                </tbody>
              </table>
              <div id="cdmHistoryEmpty" class="hidden" style="padding: 18px; text-align: center; color: var(--text-muted); font-size: 0.8rem;">
                No previous hearings recorded yet for this case.
              </div>
            </div>
          </div>

          <!-- Court Transfer History -->
          <div class="full-width-section cdm-transfer-card hidden" id="cdmTransferSection">
            <div class="section-header">
              <div class="section-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"/>
                </svg>
              </div>
              <div class="section-title">Court Transfer History</div>
              <span id="cdmTransferCountBadge" class="table-badge upcoming" style="margin-left: auto;">0 Transfers</span>
            </div>
            <div class="data-table-wrapper">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Transfer Date</th>
                    <th>From Court ➔ To Court</th>
                    <th>Order #</th>
                    <th>Reason / Grounds</th>
                  </tr>
                </thead>
                <tbody id="cdmTransferTableBody">
                  <!-- Injected dynamically -->
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- 🎯 Clean Modern Footer -->
        <div class="modal-footer">
          <!-- Left: Secondary Actions (Ghost) -->
          <div class="footer-left">
            <button type="button" class="footer-btn footer-btn-ghost" id="cdmDossierBtn" title="Print Case Dossier">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"/>
              </svg>
              <span>Print</span>
            </button>

            <button type="button" class="footer-btn footer-btn-ghost" id="cdmWhatsAppBtn" title="Send WhatsApp Notice">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
              <span>WhatsApp</span>
            </button>

            <button type="button" class="footer-btn footer-btn-ghost" id="cdmTransferBtn" title="Transfer Case">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                <path d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"/>
              </svg>
              <span>Transfer</span>
            </button>
          </div>

          <!-- Right: More Menu + Primary Action -->
          <div class="footer-right">
            <!-- More Menu -->
            <div class="footer-more-wrap">
              <button type="button" class="footer-btn footer-btn-icon" id="footerMoreBtn" onclick="toggleFooterMoreMenu(event)" title="More Actions">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="1.5" fill="currentColor"></circle>
                  <circle cx="19" cy="12" r="1.5" fill="currentColor"></circle>
                  <circle cx="5" cy="12" r="1.5" fill="currentColor"></circle>
                </svg>
              </button>

              <div class="footer-more-menu" id="footerMoreMenu">
                <button type="button" class="footer-more-item" id="cdmAddTodoBtn">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                  </svg>
                  <span>Add To-Do Task</span>
                </button>

                <button type="button" class="footer-more-item" id="cdmHistoryBtn">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span>Hearing History</span>
                </button>

                <div class="footer-more-divider"></div>

                <button type="button" class="footer-more-item" id="cdmEditBtn">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                  <span>Edit Case Details</span>
                </button>
              </div>
            </div>

            <!-- Primary Action -->
            <button type="button" class="footer-btn footer-btn-primary" id="cdmHearingBtn" title="Update Next Hearing">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/>
              </svg>
              <span>Update Hearing</span>
            </button>

            <!-- Close Action -->
            <button type="button" class="footer-btn footer-btn-ghost" onclick="closeCaseDetailsFullModal()" title="Close Modal">
              <span>Close</span>
            </button>
          </div>
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
            <div class="modal-icon">📅œ</div>
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
            <strong id="modalCaseNo">—</strong>
          </div>
          <div class="summary-chip">
            <span class="chip-label">Case Title:</span>
            <strong id="modalCaseTitle">—</strong>
          </div>
          <div class="summary-chip">
            <span class="chip-label">Court:</span>
            <strong id="modalCourtName">—</strong>
          </div>
          <div class="summary-chip">
            <span class="chip-label">Next Hearing:</span>
            <span id="modalNextHearingBadge" class="case-badge civil">—</span>
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
            <p>ℹ️ No previous hearings recorded yet for this case.</p>
          </div>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            id="modalUpdateHearingBtn"
            class="detail-action-btn secondary"
          >
            📅… Update Next Hearing
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
              <i class="fa-solid fa-desktop"></i> 💻 Desktop Install (Windows
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
              <div class="fd-combo-input-wrap" id="fdComboInputWrap" onclick="toggleForwardCombo(event)">
                <iconify-icon icon="lucide:search" class="fd-lead-icon"></iconify-icon>
                <input
                  type="text"
                  class="fd-combo-input"
                  id="fdComboInput"
                  placeholder="Search case number or name..."
                  autocomplete="off"
                  oninput="onForwardComboInput(this.value)"
                  onfocus="openForwardCombo(event)"
                />
                <iconify-icon icon="lucide:chevron-down" class="fd-combo-chevron"></iconify-icon>
              </div>
              <div class="fd-combo-dropdown" id="fdComboDropdown" role="listbox"></div>
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
                    <span class="fd-ndc-label">Next Case Stage <span style="color: var(--danger-text, #ef4444);">*</span></span>
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

            <label class="fd-cdc-label" for="fdProceedingsNote" style="margin-bottom: 6px;">Action Taken / Court Order Summary</label>
            <textarea
              class="fd-textarea"
              id="fdProceedingsNote"
              placeholder="e.g. Defendant filed written statement. Court granted 2 weeks for counter affidavit..."
            ></textarea>

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
  let modalEl = document.getElementById('caseDetailsFullModal');
  if (modalEl) return modalEl;

  let container = document.getElementById('caseModalsContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'caseModalsContainer';
    document.body.appendChild(container);
  }

  if (window.__casebook_modals && window.__casebook_modals['case-modals']) {
    container.innerHTML = window.__casebook_modals['case-modals'];
    container.dataset.loaded = 'true';
  }
  return document.getElementById('caseDetailsFullModal');
}
if (typeof ensureCaseModalsMounted !== 'undefined') window.ensureCaseModalsMounted = ensureCaseModalsMounted;

// Auto-mount as soon as DOM is ready or script executes
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureCaseModalsMounted);
  } else {
    ensureCaseModalsMounted();
  }
}

// Fallback helper utilities
if (typeof escapeHtml !== 'function') {
  window.escapeHtml = function(text) {
    if (text === null || text === undefined) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };
}

if (typeof formatDateDMY !== 'function') {
  window.formatDateDMY = function(dateInput) {
    if (!dateInput || dateInput === '—' || dateInput === 'null' || dateInput === 'undefined') return '—';
    try {
      const str = String(dateInput).trim();
      const parts = str.split('T')[0].split('-');
      if (parts.length === 3 && parts[0].length === 4) {
        return `${parts[2].padStart(2, '0')}/${parts[1].padStart(2, '0')}/${parts[0]}`;
      }
      return str;
    } catch(e) {
      return String(dateInput);
    }
  };
}

if (typeof toISODate !== 'function') {
  window.toISODate = function(dateInput) {
    if (dateInput === null || dateInput === undefined) return null;
    const str = String(dateInput).trim();
    if (!str || str === '—' || str === 'null' || str === 'undefined') return null;
    const ymdMatch = str.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/);
    if (ymdMatch) return `${ymdMatch[1]}-${ymdMatch[2].padStart(2, '0')}-${ymdMatch[3].padStart(2, '0')}`;
    const dmyMatch = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
    if (dmyMatch) return `${dmyMatch[3]}-${dmyMatch[2].padStart(2, '0')}-${dmyMatch[1].padStart(2, '0')}`;
    const d = new Date(str);
    if (!isNaN(d.getTime())) {
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    }
    return null;
  };
}

if (typeof remarksToPlainText !== 'function') {
  window.remarksToPlainText = function(raw) {
    if (!raw) return '';
    if (typeof raw === 'string') return raw;
    if (Array.isArray(raw)) {
      return raw.map(r => typeof r === 'string' ? r : (r.text || r.remark || '')).filter(Boolean).join('\n');
    }
    if (typeof raw === 'object') return raw.text || raw.remark || JSON.stringify(raw);
    return String(raw);
  };
}

if (typeof getDaysUntilHearing !== 'function') {
  window.getDaysUntilHearing = function(dateStr) {
    if (!dateStr || dateStr === '—' || dateStr === 'null' || !String(dateStr).trim() || String(dateStr).toLowerCase() === 'undated') return null;
    const target = new Date(dateStr);
    if (isNaN(target.getTime())) return null;
    const now = new Date();
    const dTarget = new Date(target.getFullYear(), target.getMonth(), target.getDate());
    const dNow = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.round((dTarget.getTime() - dNow.getTime()) / (1000 * 60 * 60 * 24));
  };
}

if (typeof getCaseCardDisplayData !== 'function') {
  window.getCaseCardDisplayData = function(c) {
    if (!c) return {};
    const caseType = (c.caseType || 'civil').toLowerCase();
    const caseNumber = c.caseNo || c.criminalCaseNumber || c.case_number || '—';
    const courtName = c.courtName || c.criminalCourtName || c.court || 'District Court';

    let caseName = (c.caseName || c.title || '').trim();
    if (!caseName || caseName.toLowerCase() === 'vs' || caseName.toLowerCase() === 'vs.') {
      if (c.plaintiff && c.defendant) caseName = `${c.plaintiff} vs ${c.defendant}`;
      else if (c.petitioner && c.respondent) caseName = `${c.petitioner} vs ${c.respondent}`;
      else if (c.applicant && c.respondent) caseName = `${c.applicant} vs ${c.respondent}`;
      else if (c.plaintiff) caseName = `${c.plaintiff} vs Opposite`;
      else if (c.accusedName) caseName = `State vs ${c.accusedName}`;
      else if (c.victimName) caseName = `${c.victimName} vs Accused`;
      else caseName = 'Untitled Matter';
    }

    const isDisposed = (c.caseStatus || c.status || '').toLowerCase().includes('dispose') || Boolean(c.disposalComment || c.disposal_comment);
    const isUndated = !c.nextHearing || c.nextHearing === '—' || c.nextHearing === 'null' || !String(c.nextHearing).trim() || String(c.nextHearing).toLowerCase() === 'undated';

    let statusText = 'Pending';
    let statusColor = '#ea580c';
    if (isDisposed) {
      statusText = 'Disposed Off';
      statusColor = '#059669';
    } else if (isUndated) {
      statusText = 'Undated';
      statusColor = '#d97706';
    }

    let nextDateText = '—';
    if (isDisposed) {
      nextDateText = c.disposalDate ? (typeof formatDateDMY === 'function' ? formatDateDMY(c.disposalDate) : c.disposalDate) : 'Disposed';
    } else if (isUndated) {
      nextDateText = 'Undated';
    } else if (c.nextHearing) {
      nextDateText = typeof formatDateDMY === 'function' ? formatDateDMY(c.nextHearing) : c.nextHearing;
    }

    const isCriminalSide = ['criminal', 'state', 'complaint', 'misc_criminal', 'misccriminal'].includes(caseType);
    const appRole = isCriminalSide ? 'Complainant / State' : (caseType === 'family' ? 'Petitioner' : (caseType === 'revenue' ? 'Applicant' : 'Plaintiff'));
    const resRole = isCriminalSide ? 'Accused' : (caseType === 'family' ? 'Respondent' : (caseType === 'revenue' ? 'Opposite Party' : 'Defendant'));
    const appName = (c.plaintiff || c.petitioner || c.applicant || c.firstParty || c.victimName || '').trim() || 'Not Specified';
    const resName = (c.defendant || c.respondent || c.oppositeParty || c.accusedName || '').trim() || 'Not Specified';

    const daysUntil = typeof getDaysUntilHearing === 'function' ? getDaysUntilHearing(c.nextHearing) : null;
    const isUrgent = !isDisposed && !isUndated && daysUntil !== null && daysUntil >= 0 && daysUntil <= 7;
    const urgentBadgeHtml = isUrgent ? '<span class="badge urgent" style="background:#fee2e2; color:#b91c1c; font-size:0.75rem; font-weight:700; padding:2px 8px; border-radius:9999px;">⚠️ Hearing Soon</span>' : '';

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
      daysUntil
    };
  };
}

function getCasePaisaTransactions(caseNumber) {
  if (!caseNumber) return [];
  const normalizedNo = String(caseNumber).trim().toLowerCase();
  const cleanKey = normalizedNo.replace(/[^a-z0-9]/g, '');

  let list = [];
  if (typeof allPaisaTransactions !== 'undefined' && Array.isArray(allPaisaTransactions) && allPaisaTransactions.length > 0) {
    list = allPaisaTransactions;
  } else {
    try {
      const raw = (typeof safeStorage !== 'undefined' && safeStorage.get) 
        ? safeStorage.get('paisa_transactions') 
        : localStorage.getItem('paisa_transactions');
      if (raw) {
        list = typeof raw === 'string' ? JSON.parse(raw) : raw;
      }
    } catch(e) {}
  }

  if (!Array.isArray(list)) return [];

  return list.filter(t => {
    const cNo = String(t.case_no || t.case_id || '').trim().toLowerCase();
    if (!cNo) return false;
    if (cNo === normalizedNo) return true;
    if (cleanKey && cNo.replace(/[^a-z0-9]/g, '') === cleanKey) return true;
    if (normalizedNo.includes(cNo) || cNo.includes(normalizedNo)) return true;
    return false;
  }).sort((a, b) => new Date(b.date || b.created_at) - new Date(a.date || a.created_at));
}
if (typeof getCasePaisaTransactions !== 'undefined') window.getCasePaisaTransactions = getCasePaisaTransactions;

function cdmQuickAddFee(flow) {
  const c = window.currentSelectedCase;
  const caseNumber = c ? (c.caseNo || c.criminalCaseNumber || '') : '';
  const clientName = c ? (c.clientName || c.criminalClientName || c.client || c.plaintiff || c.applicant || '') : '';

  closeCaseDetailsFullModal();
  if (typeof showTab === 'function') {
    showTab('paisa');
  }

  setTimeout(() => {
    if (flow === 'received') {
      if (typeof openPaisaReceivedModal === 'function') {
        openPaisaReceivedModal();
        const clientInput = document.getElementById('paisaReceivedClientName');
        if (clientInput && clientName) clientInput.value = clientName;
        if (typeof applyPaisaLinkedCase === 'function' && caseNumber) {
          applyPaisaLinkedCase(caseNumber, 'received');
        }
      }
    } else {
      if (typeof openPaisaSpendModal === 'function') {
        openPaisaSpendModal();
        const payeeInput = document.getElementById('paisaSpendPayeeName');
        if (payeeInput && clientName) payeeInput.value = clientName;
        if (typeof applyPaisaLinkedCase === 'function' && caseNumber) {
          applyPaisaLinkedCase(caseNumber, 'spent');
        }
      }
    }
  }, 300);
}
if (typeof cdmQuickAddFee !== 'undefined') window.cdmQuickAddFee = cdmQuickAddFee;

function getCaseHearingHistory(caseNumber) {
  if (!caseNumber) return [];
  const normalized = caseNumber.trim().toLowerCase();
  const cleanKey = normalized.replace(/[^a-z0-9]/g, '');

  const records = (typeof allHearingRecords !== 'undefined' && Array.isArray(allHearingRecords)) ? allHearingRecords : [];
  const list = records.filter(h => {
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
          <tr class="cdm-history-row">
            <td data-label="#" style="text-align: center; font-weight: 600; color: #64748b;">#${idx + 1}</td>
            <td data-label="Hearing Date" style="white-space: nowrap; font-weight: 600;">${formatDateDMY(ev.date)}</td>
            <td data-label="Process / Stage" style="font-weight: 600; color: #1e40af;">${escapeHtml(ev.process || '—')}</td>
            <td data-label="Status">${badgeHtml}</td>
            <td data-label="Court Action & Proceedings">${escapeHtml(ev.action || 'Court appearance & proceedings recorded.')}</td>
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
      closeCaseDetailsFullModal();
      if (typeof openForwardDateModal === 'function') {
        openForwardDateModal(caseObj.caseNo || caseObj.criminalCaseNumber || '');
      } else if (typeof showTab === 'function') {
        showTab('hearing');
        const caseNoInput = document.getElementById('hearingCaseNo');
        if (caseNoInput) {
          caseNoInput.value = caseObj.caseNo || caseObj.criminalCaseNumber || '';
        }
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
          <tr class="cdm-history-row">
            <td data-label="#"><strong>${idx + 1}</strong></td>
            <td data-label="Hearing Date"><strong>${formatDateDMY(ev.date)}</strong></td>
            <td data-label="Process / Stage"><strong>${ev.process}</strong></td>
            <td data-label="Status">${badgeHtml}</td>
            <td data-label="Court Action & Proceedings">${ev.action}</td>
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


function toggleFooterMoreMenu(e) {
  if (e) e.stopPropagation();
  const menu = document.getElementById('footerMoreMenu');
  if (menu) menu.classList.toggle('open');
}
if (typeof toggleFooterMoreMenu !== 'undefined') window.toggleFooterMoreMenu = toggleFooterMoreMenu;

document.addEventListener('click', function(e) {
  const menu = document.getElementById('footerMoreMenu');
  const btn = document.getElementById('footerMoreBtn');
  if (menu && menu.classList.contains('open')) {
    if (!menu.contains(e.target) && (!btn || !btn.contains(e.target))) {
      menu.classList.remove('open');
    }
  }
});

function copyCdmCaseNumber() {
  const el = document.getElementById('cdmCaseNo');
  const btn = document.getElementById('cdmCopyCaseNoBtn');
  if (!el) return;
  const text = (el.textContent || '').trim();
  if (!text || text === '—') return;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      if (btn) {
        const orig = btn.innerHTML;
        btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" style="width:13px;height:13px;"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg> <span>Copied!</span>';
        btn.style.borderColor = '#10b981';
        btn.style.color = '#10b981';
        setTimeout(() => {
          btn.innerHTML = orig;
          btn.style.borderColor = '';
          btn.style.color = '';
        }, 1500);
      }
    }).catch(err => {
      console.warn('Clipboard write failed, fallback used', err);
    });
  }
}
if (typeof copyCdmCaseNumber !== 'undefined') window.copyCdmCaseNumber = copyCdmCaseNumber;

function cdmTriggerWhatsApp() {
  const c = window.currentSelectedCase;
  if (!c) return;
  if (typeof sendWhatsAppHearingNotice === 'function') {
    sendWhatsAppHearingNotice(c);
  }
}
if (typeof cdmTriggerWhatsApp !== 'undefined') window.cdmTriggerWhatsApp = cdmTriggerWhatsApp;

function closeCaseDetailsFullModal() {
  const m = document.getElementById('caseDetailsFullModal');
  if (m) {
    m.classList.add('hidden');
    m.classList.remove('active');
    m.style.display = 'none';
  }
  const menu = document.getElementById('footerMoreMenu');
  if (menu) menu.classList.remove('open');
  if (typeof document !== 'undefined' && document.body) {
    document.body.style.overflow = '';
  }
}
if (typeof closeCaseDetailsFullModal !== 'undefined') window.closeCaseDetailsFullModal = closeCaseDetailsFullModal;

function openCaseDetailsFullModal(caseNo, idx) {
  const modalEl = ensureCaseModalsMounted();
  let c = null;
  if (typeof caseNo === 'object' && caseNo !== null) {
    c = caseNo;
  } else if (typeof idx === 'number' && typeof caseCardsFilteredList !== 'undefined' && caseCardsFilteredList && caseCardsFilteredList[idx]) {
    c = caseCardsFilteredList[idx];
  } else if (caseNo) {
    const q = String(caseNo).trim().toLowerCase();
    c = (typeof allCaseRecords !== 'undefined' ? allCaseRecords : []).find(record => {
      const num1 = (record.caseNo || '').toLowerCase();
      const num2 = (record.criminalCaseNumber || '').toLowerCase();
      return num1 === q || num2 === q || (record.id && String(record.id) === q);
    });
  }
  
  if (!c) {
    alert(`Case "${typeof caseNo === 'string' ? caseNo : (idx !== undefined ? idx : '')}" details could not be found.`);
    return;
  }

  window.currentSelectedCase = c;
  const { caseNumber, courtName, caseName, caseType, isDisposed, isUndated, appName, appRole, resName, resRole, statusColor, statusText, nextDateText, urgentBadgeHtml } = getCaseCardDisplayData(c);
  
  const rawType = (c.caseType || 'civil').toLowerCase().trim();
  const isCriminal = rawType === 'state' || rawType === 'criminal' || rawType === 'misc_criminal';
  const isFamily = rawType === 'family';
  const isRevenue = rawType === 'revenue';
  const isComplaint = rawType === 'complaint';

  let typeBadgeLabel = 'CIVIL';
  if (isCriminal) typeBadgeLabel = 'STATE (CRIMINAL)';
  else if (isFamily) typeBadgeLabel = 'FAMILY';
  else if (isRevenue) typeBadgeLabel = 'REVENUE';
  else if (isComplaint) typeBadgeLabel = 'COMPLAINT';
  else typeBadgeLabel = rawType.replace('_', ' ').toUpperCase();

  const clientName = (c.clientName || c.criminalClientName || c.client || '').trim() || '—';
  const clientPhone = (c.clientNumber || c.criminalClientNumber || '').trim();
  const clientAddress = (c.clientAddress || c.address || '').trim();
  const remarksText = remarksToPlainText(c.remark || c.remarks);
  const disposalText = (c.disposalComment || c.disposal_comment || '').trim();

  // 1. Sticky Header
  const titleEl = document.getElementById('caseDetailsModalTitle');
  const caseNoHeaderEl = document.getElementById('caseDetailsModalCaseNo');
  const subEl = document.getElementById('caseDetailsModalSubtitle');
  if (titleEl) titleEl.textContent = caseName;
  if (caseNoHeaderEl) caseNoHeaderEl.textContent = caseNumber;
  if (subEl) subEl.textContent = `${courtName} • ${typeBadgeLabel} • ${statusText}`;

  const headerTypeBadge = document.getElementById('cdmHeaderTypeBadge');
  if (headerTypeBadge) {
    headerTypeBadge.textContent = isCriminal ? '⚔️ State' : (isFamily ? '👨‍👩‍👧 Family' : (isRevenue ? '🌾 Revenue' : '⚖️ Civil'));
  }

  const headerStatusBadge = document.getElementById('cdmHeaderStatusBadge');
  if (headerStatusBadge) {
    if (isDisposed) {
      headerStatusBadge.className = 'badge badge-disposed';
      headerStatusBadge.textContent = '✅ Disposed';
    } else if (isUndated) {
      headerStatusBadge.className = 'badge badge-pending';
      headerStatusBadge.textContent = '❓ Undated';
    } else {
      headerStatusBadge.className = 'badge badge-pending';
      headerStatusBadge.textContent = '⏳ Pending';
    }
  }

  // 2. Hero Banner Card
  // 2. Hero Banner Card
  const heroCard = document.getElementById('cdmHeroCard');
  if (heroCard) {
    if (c.isUrgent || c.urgent) {
      heroCard.classList.add('is-urgent');
    } else {
      heroCard.classList.remove('is-urgent');
    }
  }

  const caseTitleEl = document.getElementById('cdmCaseTitle');
  if (caseTitleEl) caseTitleEl.textContent = caseName;

  const courtNameEl = document.getElementById('cdmHeroCourtName');
  if (courtNameEl) courtNameEl.textContent = courtName;

  const caseNoEl = document.getElementById('cdmCaseNo');
  if (caseNoEl) caseNoEl.textContent = caseNumber;

  const caseTypeEl = document.getElementById('cdmHeroCaseType');
  if (caseTypeEl) caseTypeEl.textContent = typeBadgeLabel;

  const nextHearingDateEl = document.getElementById('cdmNextHearingDate');
  const nextHearingProcessEl = document.getElementById('cdmNextHearingProcess');
  if (nextHearingDateEl) {
    if (isDisposed) nextHearingDateEl.textContent = 'Disposed Off';
    else if (isUndated) nextHearingDateEl.textContent = 'Undated';
    else nextHearingDateEl.textContent = formatDateDMY(c.nextHearing);
  }
  if (nextHearingProcessEl) {
    if (isDisposed) nextHearingProcessEl.textContent = c.disposalNature || 'Case Closed';
    else if (isUndated) nextHearingProcessEl.textContent = 'No Schedule Set';
    else nextHearingProcessEl.textContent = c.hearingProcess || 'Scheduled Hearing';
  }

  // 3. Card 1: Court & Case Information
  const setVal = (id, val, fallback = '—') => {
    const el = document.getElementById(id);
    if (el) el.textContent = val || fallback;
  };
  setVal('cdmCaseTypeVal', typeBadgeLabel);
  setVal('cdmCaseYearVal', c.caseYear || c.crimeYear || (c.filingDate ? String(c.filingDate).slice(0, 4) : '—'));
  setVal('cdmCourtNameVal', courtName);
  
  const filingDate = c.filingDate || c.crimeFilingDate;
  setVal('cdmFilingDateVal', filingDate ? formatDateDMY(filingDate) : '—');

  // Hearing history
  const hearingHistory = getCaseHearingHistory(caseNumber)
    .filter(h => h.hearing_date && h.hearing_date !== c.nextHearing);
  const prevHearing = hearingHistory[0];

  const prevHearingRow = document.getElementById('cdmPrevHearingRow');
  if (prevHearing && prevHearing.hearing_date) {
    if (prevHearingRow) prevHearingRow.style.display = 'flex';
    setVal('cdmPrevHearingVal', `${formatDateDMY(prevHearing.hearing_date)}${prevHearing.process ? ' · ' + prevHearing.process : ''}`);
  } else {
    if (prevHearingRow) prevHearingRow.style.display = 'none';
  }

  setVal('cdmNextStageVal', isUndated ? 'Undated' : (c.hearingProcess || 'Scheduled Hearing'));
  setVal('cdmNextHearingVal', isUndated ? '—' : formatDateDMY(c.nextHearing));

  // 4. Card 2: Parties & Particulars
  const partiesCardBody = document.getElementById('cdmPartiesCardBody');
  if (partiesCardBody) {
    let pProps = '';
    if (isCriminal) {
      const stateParty = c.firstParty || c.victimName || 'State of U.P.';
      pProps += `
        <div class="field-row">
          <span class="field-label">PROSECUTION / STATE</span>
          <span class="field-value"><strong>${escapeHtml(stateParty)}</strong></span>
        </div>
      `;
      if (c.accusedName) {
        pProps += `
          <div class="field-row">
            <span class="field-label">ACCUSED PERSON(S)</span>
            <span class="field-value"><strong>${escapeHtml(c.accusedName)}</strong></span>
          </div>
        `;
      }
      if (c.policeStation) {
        pProps += `
          <div class="field-row">
            <span class="field-label">POLICE STATION</span>
            <span class="field-value">🚔 ${escapeHtml(c.policeStation)}</span>
          </div>
        `;
      }
      if (c.crimeNumber || c.firNumber) {
        pProps += `
          <div class="field-row">
            <span class="field-label">CRIME / FIR NO.</span>
            <span class="field-value"><strong>${escapeHtml(c.crimeNumber || c.firNumber)}</strong></span>
          </div>
        `;
      }
      if (c.crimeSection) {
        pProps += `
          <div class="field-row">
            <span class="field-label">LEGAL SECTIONS</span>
            <span class="field-value">${escapeHtml(c.crimeSection)}</span>
          </div>
        `;
      }
      if (c.custodyStatus) {
        pProps += `
          <div class="field-row">
            <span class="field-label">CUSTODY / BAIL STATUS</span>
            <span class="field-value">${escapeHtml(c.custodyStatus)}</span>
          </div>
        `;
      }
    } else if (isFamily) {
      const petitioner = c.petitioner || c.plaintiff || appName;
      const respondent = c.respondent || c.defendant || resName;
      pProps += `
        <div class="field-row">
          <span class="field-label">PETITIONER / APPLICANT</span>
          <span class="field-value"><strong>${escapeHtml(petitioner)}</strong></span>
        </div>
        <div class="field-row">
          <span class="field-label">RESPONDENT / OPPOSITE</span>
          <span class="field-value"><strong>${escapeHtml(respondent)}</strong></span>
        </div>
      `;
      if (c.familyMatterType || c.matterType) {
        pProps += `
          <div class="field-row">
            <span class="field-label">MATTER / DISPUTE TYPE</span>
            <span class="field-value">${escapeHtml(c.familyMatterType || c.matterType)}</span>
          </div>
        `;
      }
      if (c.marriageDate) {
        pProps += `
          <div class="field-row">
            <span class="field-label">MARRIAGE DATE</span>
            <span class="field-value">${formatDateDMY(c.marriageDate)}</span>
          </div>
        `;
      }
      if (c.maintenance) {
        pProps += `
          <div class="field-row">
            <span class="field-label">MAINTENANCE ORDERED</span>
            <span class="field-value font-semibold text-emerald-400">${escapeHtml(c.maintenance)}</span>
          </div>
        `;
      }
    } else if (isRevenue) {
      const applicant = c.plaintiff || c.applicant || c.firstParty || appName;
      const opposite = c.defendant || c.respondent || c.oppositeParty || resName;
      pProps += `
        <div class="field-row">
          <span class="field-label">APPLICANT / PETITIONER</span>
          <span class="field-value"><strong>${escapeHtml(applicant)}</strong></span>
        </div>
        <div class="field-row">
          <span class="field-label">OPPOSITE PARTY</span>
          <span class="field-value"><strong>${escapeHtml(opposite)}</strong></span>
        </div>
      `;
      if (c.revenueMatterType) {
        pProps += `
          <div class="field-row">
            <span class="field-label">REVENUE MATTER</span>
            <span class="field-value">${escapeHtml(c.revenueMatterType)}</span>
          </div>
        `;
      }
      if (c.village) {
        pProps += `
          <div class="field-row">
            <span class="field-label">VILLAGE / MAUZA</span>
            <span class="field-value">${escapeHtml(c.village)}</span>
          </div>
        `;
      }
      if (c.khataNo || c.gataNo) {
        pProps += `
          <div class="field-row">
            <span class="field-label">KHATA / GATA NO.</span>
            <span class="field-value"><strong>${escapeHtml([c.khataNo ? 'Khata: ' + c.khataNo : '', c.gataNo ? 'Gata: ' + c.gataNo : ''].filter(Boolean).join(' | '))}</strong></span>
          </div>
        `;
      }
    } else {
      // Civil / Standard
      const plaintiff = c.plaintiff || c.firstParty || appName;
      const defendant = c.defendant || c.oppositeParty || resName;
      pProps += `
        <div class="field-row">
          <span class="field-label">${escapeHtml(appRole || 'PLAINTIFF')}</span>
          <span class="field-value"><strong>${escapeHtml(plaintiff)}</strong></span>
        </div>
        <div class="field-row">
          <span class="field-label">${escapeHtml(resRole || 'DEFENDANT')}</span>
          <span class="field-value"><strong>${escapeHtml(defendant)}</strong></span>
        </div>
      `;
      if (c.matterNature || c.disputeSubject) {
        pProps += `
          <div class="field-row">
            <span class="field-label">SUIT NATURE</span>
            <span class="field-value">${escapeHtml(c.matterNature || c.disputeSubject)}</span>
          </div>
        `;
      }
      if (c.crimeSection || c.sections) {
        pProps += `
          <div class="field-row">
            <span class="field-label">LEGAL SECTIONS</span>
            <span class="field-value">${escapeHtml(c.crimeSection || c.sections)}</span>
          </div>
        `;
      }
    }

    if (remarksText) {
      pProps += `
        <div class="field-row cdm-card-remarks-row" style="margin-top: 6px;">
          <span class="field-label">REMARKS &amp; NOTES</span>
          <div class="cdm-card-remarks-box">
            <div class="cdm-card-remarks-text">${escapeHtml(remarksText)}</div>
          </div>
        </div>
      `;
    }

    partiesCardBody.innerHTML = pProps;
  }

  // 5. Card 3: Client Coordinates
  setVal('cdmClientNameVal', clientName);
  const clientRole = c.clientType || (isCriminal ? 'Accused / Defense' : 'Plaintiff / Petitioner');
  setVal('cdmClientRoleVal', clientRole);

  const phoneLink = document.getElementById('cdmClientPhoneLink');
  const phoneVal = document.getElementById('cdmClientPhoneVal');
  if (clientPhone) {
    if (phoneVal) phoneVal.textContent = clientPhone;
    if (phoneLink) {
      phoneLink.href = `tel:${clientPhone}`;
      phoneLink.style.pointerEvents = 'auto';
      phoneLink.style.opacity = '1';
    }
  } else {
    if (phoneVal) phoneVal.textContent = 'Not provided';
    if (phoneLink) {
      phoneLink.href = 'javascript:void(0)';
      phoneLink.style.pointerEvents = 'none';
      phoneLink.style.opacity = '0.6';
    }
  }

  // 5b. Card 3: Fee Status & Virtual Account Ledger Data
  const caseTxns = getCasePaisaTransactions(caseNumber);
  let totalRecv = 0;
  let totalSpent = 0;

  caseTxns.forEach(t => {
    const amt = parseFloat(t.amount) || 0;
    if (t.type === 'received') totalRecv += amt;
    else if (t.type === 'spent') totalSpent += amt;
  });

  const netBalance = totalRecv - totalSpent;
  const formatInr = (n) => '₹' + Math.abs(Math.round(n)).toLocaleString('en-IN');

  const recvEl = document.getElementById('cdmTotalReceivedVal');
  const spentEl = document.getElementById('cdmTotalSpentVal');
  const netEl = document.getElementById('cdmNetBalanceVal');
  const cardRecv = document.getElementById('cdmCardFeeRecv');
  const cardSpent = document.getElementById('cdmCardFeeSpent');
  const cardNet = document.getElementById('cdmCardFeeNet');

  if (recvEl) recvEl.textContent = formatInr(totalRecv);
  if (spentEl) spentEl.textContent = formatInr(totalSpent);
  if (netEl) netEl.textContent = (netBalance < 0 ? '-' : '') + formatInr(netBalance);
  if (cardRecv) cardRecv.textContent = formatInr(totalRecv);
  if (cardSpent) cardSpent.textContent = formatInr(totalSpent);
  if (cardNet) cardNet.textContent = (netBalance < 0 ? '-' : '') + formatInr(netBalance);

  const feeStatusBadge = document.getElementById('cdmFeeStatusBadge');
  if (feeStatusBadge) {
    if (isDisposed) {
      feeStatusBadge.className = 'fee-status';
      feeStatusBadge.style.background = 'var(--bg-subtle)';
      feeStatusBadge.style.color = 'var(--text-muted)';
      feeStatusBadge.style.borderColor = 'var(--border-color)';
      feeStatusBadge.textContent = '📁 Case Closed';
    } else if (caseTxns.length > 0) {
      feeStatusBadge.className = 'fee-status';
      if (netBalance >= 0) {
        feeStatusBadge.style = 'background: rgba(16, 185, 129, 0.15); color: #6ee7b7; border: 1px solid rgba(16, 185, 129, 0.3);';
        feeStatusBadge.innerHTML = `🟢 Fees Paid · Surplus ${formatInr(netBalance)}`;
      } else {
        feeStatusBadge.style = 'background: rgba(239, 68, 68, 0.15); color: #fca5a5; border: 1px solid rgba(239, 68, 68, 0.3);';
        feeStatusBadge.innerHTML = `🔴 Expense Deficit · -${formatInr(netBalance)}`;
      }
    } else {
      feeStatusBadge.className = 'fee-status';
      feeStatusBadge.style = '';
      feeStatusBadge.textContent = '✅ Active Case (No Fees Recorded)';
    }
  }

  // 5c. Populate Financials Ledger Table
  const financeTbody = document.getElementById('cdmFinancialsTableBody');
  const financeEmpty = document.getElementById('cdmFinancialsEmpty');

  if (caseTxns.length > 0) {
    if (financeEmpty) financeEmpty.classList.add('hidden');
    if (financeTbody) {
      financeTbody.innerHTML = caseTxns.map(t => {
        const isRecv = t.type === 'received';
        const amt = parseFloat(t.amount) || 0;
        const workTitle = t.task_title || t.note || (isRecv ? 'Fee received from client' : (t.category ? t.category.toUpperCase() : 'Court / Case Expense'));
        const badgeCls = isRecv ? 'completed' : 'upcoming';
        const badgeText = isRecv ? '🟢 Fee Received' : '🔴 Case Expense';
        const modeBadge = `<span style="font-size:0.7rem; color:var(--text-muted);">${escapeHtml(t.payment_mode || 'Cash')}</span>`;
        const recvCell = isRecv ? `<strong style="color: #34d399;">+${formatInr(amt)}</strong>` : '<span style="color:var(--text-light);">—</span>';
        const spentCell = !isRecv ? `<strong style="color: #f87171;">-${formatInr(amt)}</strong>` : '<span style="color:var(--text-light);">—</span>';

        return `
          <tr class="cdm-financial-row ${isRecv ? 'is-received' : 'is-spent'}">
            <td data-label="Date"><strong>${escapeHtml(formatDateDMY(t.date || t.txn_date || t.created_at))}</strong></td>
            <td data-label="Type"><span class="table-badge ${badgeCls}">${badgeText}</span></td>
            <td data-label="Work / Purpose" style="white-space: normal;">
              <div style="font-weight: 600; color: var(--text-heading);">${escapeHtml(workTitle)}</div>
              ${t.note && t.note !== workTitle ? `<div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 2px;">${escapeHtml(t.note)}</div>` : ''}
              ${t.category && t.category !== 'other' && t.category !== 'fee' ? `<span style="display:inline-block; font-size: 0.62rem; text-transform: uppercase; background: var(--bg-card); padding: 1px 6px; border-radius: 4px; border: 1px solid var(--border-color); margin-top: 3px; color: var(--text-muted);">${escapeHtml(t.category)}</span>` : ''}
            </td>
            <td data-label="Mode">${modeBadge}</td>
            <td data-label="Fee Received" class="${!isRecv ? 'cdm-empty-val' : ''}" style="text-align: right;">${recvCell}</td>
            <td data-label="Expense Spent" class="${isRecv ? 'cdm-empty-val' : ''}" style="text-align: right;">${spentCell}</td>
          </tr>
        `;
      }).join('');
    }
  } else {
    if (financeTbody) financeTbody.innerHTML = '';
    if (financeEmpty) financeEmpty.classList.remove('hidden');
  }

  // 6. Remarks Section (Integrated into Card 2: Parties & Particulars)
  const remarksSection = document.getElementById('cdmRemarksSection');
  if (remarksSection) remarksSection.classList.add('hidden');

  // 7. Disposal Section
  const disposalSection = document.getElementById('cdmDisposalSection');
  const disposalDateBadge = document.getElementById('cdmDisposalDateBadge');
  const disposalCommentText = document.getElementById('cdmDisposalCommentText');
  if (isDisposed) {
    if (disposalSection) disposalSection.classList.remove('hidden');
    if (disposalDateBadge) disposalDateBadge.textContent = c.disposalDate ? formatDateDMY(c.disposalDate) : (c.disposalNature || 'Disposed');
    if (disposalCommentText) disposalCommentText.textContent = disposalText || 'This matter has been marked as Disposed Off.';
  } else {
    if (disposalSection) disposalSection.classList.add('hidden');
  }

  // 8. Hearing History Table
  const historyTableBody = document.getElementById('cdmHistoryTableBody');
  const historyEmpty = document.getElementById('cdmHistoryEmpty');
  const hearingCountSub = document.getElementById('cdmHearingCountSub');
  if (hearingCountSub) {
    hearingCountSub.textContent = `${hearingHistory.length} previous hearing(s)`;
  }
  if (hearingHistory.length > 0) {
    if (historyEmpty) historyEmpty.classList.add('hidden');
    if (historyTableBody) {
      historyTableBody.innerHTML = hearingHistory.map((h, i) => `
        <tr class="cdm-history-row">
          <td data-label="Date"><strong>${escapeHtml(formatDateDMY(h.hearing_date))}</strong></td>
          <td data-label="Stage">${escapeHtml(h.process || '—')}</td>
          <td data-label="Proceedings & Notes">${escapeHtml(h.action_taken || h.notes || '—')}</td>
        </tr>
      `).join('');
    }
  } else {
    if (historyTableBody) historyTableBody.innerHTML = '';
    if (historyEmpty) historyEmpty.classList.remove('hidden');
  }

  // 9. Court Transfers Section
  const transferSection = document.getElementById('cdmTransferSection');
  const transferTableBody = document.getElementById('cdmTransferTableBody');
  const transferCountBadge = document.getElementById('cdmTransferCountBadge');
  const caseTransfers = (typeof allTransferRecords !== 'undefined' && Array.isArray(allTransferRecords))
    ? allTransferRecords.filter(t => (t.case_number || '').trim().toLowerCase() === caseNumber.trim().toLowerCase())
    : [];

  if (caseTransfers.length > 0) {
    if (transferSection) transferSection.classList.remove('hidden');
    if (transferCountBadge) transferCountBadge.textContent = `${caseTransfers.length} Transfer(s)`;
    if (transferTableBody) {
      transferTableBody.innerHTML = caseTransfers.map((t, idx) => `
        <tr class="cdm-transfer-row">
          <td data-label="Transfer Date"><strong>${escapeHtml(formatDateDMY(t.transfer_date || t.created_at))}</strong></td>
          <td data-label="Transfer">${escapeHtml(t.from_court || 'Origin')} ➔ <strong>${escapeHtml(t.to_court || 'Destination')}</strong></td>
          <td data-label="Order No.">${escapeHtml(t.order_number || '—')}</td>
          <td data-label="Reason / Grounds">${escapeHtml(t.reason || '—')}</td>
        </tr>
      `).join('');
    }
  } else {
    if (transferSection) transferSection.classList.add('hidden');
  }

  // 10. Wire up Action Buttons
  const addTodoBtn = document.getElementById('cdmAddTodoBtn');
  if (addTodoBtn) {
    addTodoBtn.onclick = () => {
      closeCaseDetailsFullModal();
      if (typeof openTodoForCase === 'function') {
        openTodoForCase(caseNumber);
      }
    };
  }

  const transferBtn = document.getElementById('cdmTransferBtn');
  if (transferBtn) {
    transferBtn.onclick = () => {
      closeCaseDetailsFullModal();
      if (typeof openTransferForCase === 'function') {
        openTransferForCase(caseNumber);
      }
    };
  }

  const whatsappBtn = document.getElementById('cdmWhatsAppBtn');
  if (whatsappBtn) {
    whatsappBtn.onclick = () => {
      if (typeof sendWhatsAppHearingNotice === 'function') {
        sendWhatsAppHearingNotice(c);
      }
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

  const historyBtn = document.getElementById('cdmHistoryBtn');
  if (historyBtn) {
    historyBtn.onclick = () => {
      closeCaseDetailsFullModal();
      if (typeof openCaseHistoryModalByNo === 'function') {
        openCaseHistoryModalByNo(caseNumber);
      } else if (typeof openCaseHistoryModal === 'function') {
        openCaseHistoryModal(c);
      }
    };
  }

  const hearingBtn = document.getElementById('cdmHearingBtn');
  if (hearingBtn) {
    hearingBtn.onclick = () => {
      closeCaseDetailsFullModal();
      if (typeof openForwardDateModal === 'function') {
        openForwardDateModal(caseNumber);
      } else if (typeof showTab === 'function') {
        showTab('hearing');
        const caseNoInput = document.getElementById('hearingCaseNo');
        if (caseNoInput) caseNoInput.value = caseNumber;
      }
    };
  }

  const editBtn = document.getElementById('cdmEditBtn');
  if (editBtn) {
    editBtn.onclick = () => {
      closeCaseDetailsFullModal();
      if (typeof showTab === 'function') showTab('update');
      const searchInput = document.getElementById('updateSearchInput');
      if (searchInput) searchInput.value = caseNumber;
      if (typeof loadCaseForUpdate === 'function') {
        loadCaseForUpdate(caseNumber);
      }
    };
  }

  // 11. Reveal Modal
  if (modalEl) {
    modalEl.classList.remove('hidden');
    modalEl.classList.add('active');
    modalEl.style.display = 'flex';
    if (typeof document !== 'undefined' && document.body) {
      document.body.style.overflow = 'hidden';
    }
  }
}
if (typeof openCaseDetailsFullModal !== 'undefined') window.openCaseDetailsFullModal = openCaseDetailsFullModal;

// Global Escape Key Listener for CDM Modal
if (typeof document !== 'undefined') {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const m = document.getElementById('caseDetailsFullModal');
      if (m && !m.classList.contains('hidden') && m.style.display !== 'none') {
        closeCaseDetailsFullModal();
      }
      const fd = document.getElementById('fdModal');
      if (fd && !fd.classList.contains('hidden') && fd.style.display !== 'none') {
        const comboDropdown = document.getElementById('fdComboDropdown');
        if (comboDropdown && comboDropdown.classList.contains('open')) {
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
  nextDate: null,
  stage: '',
  notes: ''
};

window.calState = {
  m: new Date().getMonth(),
  y: new Date().getFullYear()
};

const FD_MONTHS_FULL = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const FD_MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const FD_DAYS_FULL = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

function fdFormatYMD(d) {
  if (!d) return '';
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function fdFormatDisplay(d) {
  if (!d) return '—';
  return `${FD_DAYS_FULL[d.getDay()]}, ${d.getDate()} ${FD_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

function ensureForwardModalMounted() {
  let fd = document.getElementById('fdModal');
  if (fd) return fd;
  if (typeof ensureCaseModalsMounted === 'function') {
    ensureCaseModalsMounted();
  }
  fd = document.getElementById('fdModal');
  if (!fd && window.__casebook_modals && window.__casebook_modals['case-modals']) {
    let container = document.getElementById('caseModalsContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'caseModalsContainer';
      document.body.appendChild(container);
    }
    container.innerHTML = window.__casebook_modals['case-modals'];
    fd = document.getElementById('fdModal');
  }
  return fd;
}

function openForwardDateModal(targetCaseNo = '') {
  const modal = ensureForwardModalMounted();
  if (!modal) return;

  // Reset state
  window.fdState.selectedCase = null;
  window.fdState.nextDate = null;
  window.fdState.stage = '';
  window.fdState.notes = '';

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  window.calState.m = today.getMonth();
  window.calState.y = today.getFullYear();

  // Reset inputs
  const input = document.getElementById('fdComboInput');
  if (input) {
    input.value = '';
    input.readOnly = false;
  }
  const inputWrap = document.getElementById('fdComboInputWrap');
  if (inputWrap) inputWrap.classList.remove('open', 'focused');

  const sub = document.getElementById('fdModalSub');
  if (sub) sub.textContent = 'Select a case to begin';

  const caseDetailSec = document.getElementById('fdCaseDetailSection');
  if (caseDetailSec) caseDetailSec.style.display = 'none';

  const newDateSec = document.getElementById('fdNewDateSection');
  if (newDateSec) newDateSec.style.display = '';

  const notesSec = document.getElementById('fdNotesSection');
  if (notesSec) notesSec.style.display = '';

  const notesInput = document.getElementById('fdProceedingsNote');
  if (notesInput) notesInput.value = '';

  const waBar = document.getElementById('fdWhatsAppBar');
  if (waBar) waBar.style.display = 'none';

  const stageSelect = document.getElementById('fdStageSelect');
  if (stageSelect) stageSelect.value = '';

  const customStageWrap = document.getElementById('fdCustomStageWrap');
  if (customStageWrap) customStageWrap.style.display = 'none';
  const customStageInput = document.getElementById('fdCustomStageInput');
  if (customStageInput) customStageInput.value = '';

  // Render dropdown with live allCaseRecords
  const casesList = (typeof allCaseRecords !== 'undefined' && Array.isArray(allCaseRecords))
    ? allCaseRecords
    : (window.allCaseRecords || []);
  renderForwardComboOptions(casesList);

  // Render custom date picker
  renderForwardCalendar();
  updateForwardNextDateCard();

  // Open modal
  modal.classList.remove('hidden');
  modal.classList.add('open');
  modal.style.display = 'flex';
  if (typeof document !== 'undefined' && document.body) {
    document.body.style.overflow = 'hidden';
  }

  // If a case was passed in, select it immediately
  if (targetCaseNo) {
    setTimeout(() => {
      selectForwardCase(targetCaseNo);
    }, 50);
  } else {
    setTimeout(() => {
      if (input) input.focus();
    }, 200);
  }
}

function closeForwardDateModal() {
  const modal = document.getElementById('fdModal');
  if (modal) {
    modal.classList.remove('open');
    modal.classList.add('hidden');
    modal.style.display = 'none';
  }
  closeForwardCombo();
  if (typeof document !== 'undefined' && document.body) {
    document.body.style.overflow = '';
  }
}

function toggleForwardCombo(e) {
  if (e) e.stopPropagation();
  const dropdown = document.getElementById('fdComboDropdown');
  if (dropdown && dropdown.classList.contains('open')) {
    closeForwardCombo();
  } else {
    openForwardCombo(e);
  }
}

function openForwardCombo(e) {
  if (e) e.stopPropagation();
  const dropdown = document.getElementById('fdComboDropdown');
  const inputWrap = document.getElementById('fdComboInputWrap');
  if (dropdown) dropdown.classList.add('open');
  if (inputWrap) inputWrap.classList.add('focused', 'open');
  const input = document.getElementById('fdComboInput');
  if (input) {
    input.readOnly = false;
    input.focus();
  }
}

function closeForwardCombo() {
  const dropdown = document.getElementById('fdComboDropdown');
  const inputWrap = document.getElementById('fdComboInputWrap');
  if (dropdown) dropdown.classList.remove('open');
  if (inputWrap) inputWrap.classList.remove('focused', 'open');
}

function onForwardComboInput(val) {
  const q = (val || '').toLowerCase().trim();
  const casesList = (typeof allCaseRecords !== 'undefined' && Array.isArray(allCaseRecords))
    ? allCaseRecords
    : (window.allCaseRecords || []);

  const filtered = q
    ? casesList.filter(c => {
        const num = (c.caseNo || c.criminalCaseNumber || '').toLowerCase();
        const name = (c.caseName || c.plaintiff || c.defendant || c.parties || '').toLowerCase();
        return num.includes(q) || name.includes(q);
      })
    : casesList;

  renderForwardComboOptions(filtered);
}

function renderForwardComboOptions(list) {
  const dropdown = document.getElementById('fdComboDropdown');
  if (!dropdown) return;

  // Undated cases first, then others
  const sorted = [...list].sort((a, b) => {
    const aUndated = (!a.nextHearing || a.nextHearing === '—' || (a.caseStatus || '').toLowerCase() === 'undated') ? 0 : 1;
    const bUndated = (!b.nextHearing || b.nextHearing === '—' || (b.caseStatus || '').toLowerCase() === 'undated') ? 0 : 1;
    if (aUndated !== bUndated) return aUndated - bUndated;
    return 0;
  });

  if (sorted.length === 0) {
    dropdown.innerHTML = `
      <div class="fd-combo-empty">
        <iconify-icon icon="lucide:search-x" style="font-size: 1.5rem; display: block; margin: 0 auto 0.4rem; opacity: 0.5;"></iconify-icon>
        No cases match your search
      </div>
    `;
    return;
  }

  dropdown.innerHTML = sorted.slice(0, 80).map(c => {
    const caseNum = (c.caseNo || c.criminalCaseNumber || '—').trim();
    let caseName = c.caseName || '—';
    if (!c.caseName) {
      if (c.plaintiff && c.defendant) caseName = `${c.plaintiff} vs ${c.defendant}`;
      else if (c.petitioner && c.respondent) caseName = `${c.petitioner} vs ${c.respondent}`;
      else if (c.applicant && c.respondent) caseName = `${c.applicant} vs ${c.respondent}`;
      else if (c.accusedName) caseName = `State vs ${c.accusedName}`;
    }
    const isUndated = (!c.nextHearing || c.nextHearing === '—' || (c.caseStatus || '').toLowerCase() === 'undated');
    const isSelected = window.fdState.selectedCase && (window.fdState.selectedCase.caseNo === caseNum || window.fdState.selectedCase.criminalCaseNumber === caseNum);

    return `
      <div class="fd-combo-option ${isSelected ? 'selected' : ''}" role="option" onclick="selectForwardCase('${escapeHtml(caseNum)}', event)">
        <div class="fd-co-icon">
          <iconify-icon icon="${isUndated ? 'lucide:calendar-x' : 'lucide:scale'}"></iconify-icon>
        </div>
        <div class="fd-co-text">
          <div class="fd-co-title">${escapeHtml(caseName)}</div>
          <div class="fd-co-sub">${escapeHtml(caseNum)} • ${escapeHtml(c.courtName || c.court || 'Court')}</div>
        </div>
        ${isUndated ? '<span class="fd-co-badge undated">Undated</span>' : `<span class="fd-co-badge">${escapeHtml(c.caseType || 'Civil')}</span>`}
      </div>
    `;
  }).join('');
}

function selectForwardCase(caseNo, e) {
  if (e) e.stopPropagation();
  const casesList = (typeof allCaseRecords !== 'undefined' && Array.isArray(allCaseRecords))
    ? allCaseRecords
    : (window.allCaseRecords || []);

  const cleanQuery = (caseNo || '').toLowerCase().trim();
  const c = casesList.find(x => {
    const num1 = (x.caseNo || '').toLowerCase().trim();
    const num2 = (x.criminalCaseNumber || '').toLowerCase().trim();
    return num1 === cleanQuery || num2 === cleanQuery;
  });

  if (!c) return;
  window.fdState.selectedCase = c;

  let caseName = c.caseName || '—';
  if (!c.caseName) {
    if (c.plaintiff && c.defendant) caseName = `${c.plaintiff} vs ${c.defendant}`;
    else if (c.petitioner && c.respondent) caseName = `${c.petitioner} vs ${c.respondent}`;
    else if (c.accusedName) caseName = `State vs ${c.accusedName}`;
  }
  const officialNum = c.caseNo || c.criminalCaseNumber || caseNo;

  // Update input display
  const input = document.getElementById('fdComboInput');
  if (input) {
    input.value = `${caseName} — ${officialNum}`;
    input.readOnly = true;
  }
  closeForwardCombo();

  // Populate Case Details Card
  const caseDetailSec = document.getElementById('fdCaseDetailSection');
  if (caseDetailSec) caseDetailSec.style.display = '';

  const setEl = (id, val, isMuted = false) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = val || '—';
    if (isMuted) el.classList.add('muted');
    else el.classList.remove('muted');
  };

  setEl('fdCdcCaseName', caseName);
  setEl('fdCdcCaseNo', officialNum);
  setEl('fdCdcCaseType', (c.caseType || 'Civil').toUpperCase());
  setEl('fdCdcCourt', c.courtName || c.court || '—');
  setEl('fdCdcFilingDate', c.filingDate || c.regDate || '—');

  if (c.nextHearing && c.nextHearing !== '—') {
    setEl('fdCdcPrevDate', (typeof formatDateDMY === 'function') ? formatDateDMY(c.nextHearing) : c.nextHearing);
  } else {
    setEl('fdCdcPrevDate', 'Not Set (Undated)', true);
  }

  if (c.hearingProcess && c.hearingProcess !== '—') {
    setEl('fdCdcPrevStage', c.hearingProcess);
  } else {
    setEl('fdCdcPrevStage', 'Not Specified', true);
  }

  // Pre-fill stage select if matching
  const stageSelect = document.getElementById('fdStageSelect');
  if (stageSelect) {
    if (c.hearingProcess && Array.from(stageSelect.options).some(o => o.value === c.hearingProcess)) {
      stageSelect.value = c.hearingProcess;
    } else {
      stageSelect.value = 'Pre-summoning Evidence';
    }
  }

  // Reveal next sections
  const newDateSec = document.getElementById('fdNewDateSection');
  if (newDateSec) newDateSec.style.display = '';
  const notesSec = document.getElementById('fdNotesSection');
  if (notesSec) notesSec.style.display = '';

  // Update sub title
  const sub = document.getElementById('fdModalSub');
  if (sub) sub.textContent = `${officialNum} • ${caseName}`;

  // WhatsApp particulars
  const cClient = c.clientName || c.criminalClientName || 'Client';
  const cPhone = c.clientNumber || c.criminalClientNumber || 'Direct Phone';
  const waNameEl = document.getElementById('fdWaClientName');
  const waPhoneEl = document.getElementById('fdWaClientPhone');
  if (waNameEl) waNameEl.textContent = `Notify ${cClient}`;
  if (waPhoneEl) waPhoneEl.textContent = `WhatsApp: ${cPhone}`;

  // Reset next date
  window.fdState.nextDate = null;
  updateForwardNextDateCard();

  setTimeout(() => {
    if (caseDetailSec) caseDetailSec.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 100);
}

function onForwardStageChange(val) {
  const customWrap = document.getElementById('fdCustomStageWrap');
  if (customWrap) {
    customWrap.style.display = (val === 'Other') ? 'block' : 'none';
  }
}

// -------------------------------------------------------------
// Refined Custom Date Picker Engine (Monday-to-Sunday 42 cells)
// -------------------------------------------------------------

function renderForwardCalendar() {
  const m = window.calState.m;
  const y = window.calState.y;

  const titleEl = document.getElementById('fdCalTitle');
  if (titleEl) titleEl.textContent = `${FD_MONTHS_FULL[m]} ${y}`;

  const daysGrid = document.getElementById('fdCalDays');
  if (!daysGrid) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Monday-first adjustment: Sunday (0) -> offset 6, else day - 1
  const firstDayOfMonth = new Date(y, m, 1);
  let startDay = firstDayOfMonth.getDay();
  let offset = (startDay === 0) ? 6 : startDay - 1;

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

  let html = '';
  cells.forEach(c => {
    const iso = fdFormatYMD(c.date);
    const isToday = c.date.getTime() === today.getTime();
    const isSelected = selectedISO && iso === selectedISO;

    const classes = ['fd-cal-day'];
    if (!c.isCurrent) classes.push('other');
    if (isToday) classes.push('today');
    if (isSelected) classes.push('selected');

    html += `<button type="button" class="${classes.join(' ')}" onclick="calSelect(${c.day}, ${c.month}, ${c.year})">${c.day}</button>`;
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
  const nextDateEl = document.getElementById('fdNdcNextDate');
  const nextDayEl = document.getElementById('fdNdcNextDay');
  const intervalEl = document.getElementById('fdNdcInterval');
  const pillEl = document.getElementById('fdCalSelectedText');

  if (!window.fdState.nextDate) {
    if (nextDateEl) { nextDateEl.textContent = 'Select a date'; nextDateEl.classList.add('placeholder'); }
    if (nextDayEl) { nextDayEl.textContent = '—'; nextDayEl.classList.add('placeholder'); }
    if (intervalEl) { intervalEl.textContent = '—'; intervalEl.classList.add('placeholder'); }
    if (pillEl) pillEl.textContent = 'none';
    return;
  }

  const parts = window.fdState.nextDate.split('-');
  const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));

  if (nextDateEl) {
    nextDateEl.textContent = fdFormatDisplay(d);
    nextDateEl.classList.remove('placeholder');
  }
  if (nextDayEl) {
    nextDayEl.textContent = FD_DAYS_FULL[d.getDay()];
    nextDayEl.classList.remove('placeholder');
  }
  if (pillEl) {
    pillEl.textContent = `${d.getDate()} ${FD_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffDays = Math.round((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (intervalEl) {
    if (diffDays === 0) intervalEl.textContent = 'Today';
    else if (diffDays === 1) intervalEl.textContent = 'Tomorrow (1 day)';
    else if (diffDays > 1) intervalEl.textContent = `in ${diffDays} days`;
    else intervalEl.textContent = `${Math.abs(diffDays)} days ago`;
    intervalEl.classList.remove('placeholder');
  }
}

// -------------------------------------------------------------
// Submit Forward Date to Supabase & Synchronize State
// -------------------------------------------------------------

async function submitForwardDateModal() {
  if (!window.fdState.selectedCase) {
    alert('⚠️ Please select a case first.');
    return;
  }
  if (!window.fdState.nextDate) {
    alert('⚠️ Please select a next hearing date.');
    return;
  }

  const stageSelect = document.getElementById('fdStageSelect');
  const customStageInput = document.getElementById('fdCustomStageInput');
  let chosenStage = stageSelect ? stageSelect.value : '';

  if (chosenStage === 'Other' && customStageInput) {
    chosenStage = customStageInput.value.trim();
  }

  if (!chosenStage) {
    alert('⚠️ Please select or type the Next Case Stage.');
    if (stageSelect) stageSelect.focus();
    return;
  }

  const notes = document.getElementById('fdProceedingsNote')?.value?.trim() || '';
  const caseObj = window.fdState.selectedCase;
  const caseNumber = (caseObj.caseNo || caseObj.criminalCaseNumber || '').trim();
  const nextDate = window.fdState.nextDate;

  const btn = document.getElementById('fdSubmitBtn');
  const btnText = document.getElementById('fdSubmitBtnText');
  const icon = btn?.querySelector('iconify-icon');

  if (btn) {
    btn.disabled = true;
    btn.classList.add('loading');
  }
  if (icon) icon.setAttribute('icon', 'lucide:loader-2');
  if (btnText) btnText.textContent = 'Forwarding...';

  try {
    if (typeof updateHearingInSupabase === 'function') {
      await updateHearingInSupabase(caseNumber, nextDate, chosenStage, notes);
    }

    // Keep updated object ready for WhatsApp
    window.lastUpdatedHearingCase = {
      ...caseObj,
      nextHearing: nextDate,
      hearingProcess: chosenStage
    };

    // Refresh UI & Tables across app
    if (typeof performPostCrudRefresh === 'function') {
      await performPostCrudRefresh({ caseNumber: caseNumber });
    }

    // Show WhatsApp banner inside modal or show toast
    const waBar = document.getElementById('fdWhatsAppBar');
    if (waBar) waBar.style.display = 'flex';

    const formattedDateStr = (typeof formatDateDMY === 'function') ? formatDateDMY(nextDate) : nextDate;
    const successMsg = `✅ Hearing for "${caseNumber}" forwarded to ${formattedDateStr} (${chosenStage}) successfully!`;

    if (typeof showCaseBookToast === 'function') {
      showCaseBookToast(successMsg);
    } else {
      alert(successMsg);
    }

    setTimeout(() => {
      closeForwardDateModal();
    }, 900);
  } catch (err) {
    console.error('Error forwarding date:', err);
    alert('❌ Error updating hearing: ' + (err.message || 'Unknown error'));
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.classList.remove('loading');
    }
    if (icon) icon.setAttribute('icon', 'lucide:send');
    if (btnText) btnText.textContent = 'Forward Date';
  }
}

function sendForwardWhatsAppNotice() {
  if (window.lastUpdatedHearingCase && typeof sendWhatsAppHearingNotice === 'function') {
    sendWhatsAppHearingNotice(window.lastUpdatedHearingCase);
  } else if (window.fdState.selectedCase && typeof sendWhatsAppHearingNotice === 'function') {
    const target = {
      ...window.fdState.selectedCase,
      nextHearing: window.fdState.nextDate || window.fdState.selectedCase.nextHearing,
      hearingProcess: document.getElementById('fdStageSelect')?.value || window.fdState.selectedCase.hearingProcess
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

// Close on outside click
document.addEventListener('click', (e) => {
  const combo = document.getElementById('fdCaseCombo');
  if (combo && !combo.contains(e.target)) {
    closeForwardCombo();
  }
  const modal = document.getElementById('fdModal');
  if (modal && e.target === modal) {
    closeForwardDateModal();
  }
});

