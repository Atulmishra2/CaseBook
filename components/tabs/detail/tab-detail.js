/**
 * CaseBook Dedicated Case Detail Tab Module
 * Location: components/tabs/detail/tab-detail.js
 * Scoped Scope: :is(#detail, [data-detail-scope])
 * Adheres strictly to DESIGN.md & Multi-Tab Component Parity
 * 100% Synchronized with CaseBook Real Cases Schema & Data Services
 */

// 1. Companion HTML Template for Script Fallback & Offline Mode
window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs["detail"] = `<!-- Case Detail Template -->
<div class="case-detail-container" data-detail-scope>
  <!-- 1. Top Bar: Quick Case Switcher & Docket Search -->
  <header class="detail-topbar">
    <div class="topbar-left">
      <div class="topbar-icon-wrap" aria-hidden="true">
        <svg class="lucide lucide-file-text" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
      </div>
      <div>
        <nav class="breadcrumb-bar detail-breadcrumb" aria-label="Breadcrumb">
          <button type="button" class="crumb-link detail-crumb-link" onclick="showTab('all', event)" title="Return to Cases Register">
            <svg class="lucide lucide-folder-archive" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg>
            <span>Cases Register</span>
          </button>
          <svg class="lucide lucide-chevron-right crumb-sep detail-crumb-sep" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
          <span class="crumb-current detail-crumb-current">Case Dossier</span>
        </nav>
        <h1 class="topbar-title">Case Dossier Details</h1>
        <p class="topbar-subtitle">Complete particulars, court timeline, litigants & financial records</p>
      </div>
    </div>

    <div class="topbar-actions">
      <!-- Fast Case Switcher Dropdown / Autocomplete -->
      <div class="case-switcher-wrap" id="detailCaseSwitcherWrap">
        <div class="case-switcher-input-group">
          <svg class="lucide lucide-search switcher-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input
            type="text"
            id="detailCaseSearchInput"
            class="detail-search-input"
            placeholder="Search or jump to case..."
            autocomplete="off"
            aria-label="Search case number or party name"
          />
          <button type="button" class="switcher-clear-btn hidden" id="detailCaseSearchClear" title="Clear search">
            <svg class="lucide lucide-x" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
        <!-- Autocomplete Dropdown Menu -->
        <div class="detail-search-dropdown hidden" id="detailSearchDropdown" role="listbox">
          <div class="dropdown-header">Select Case from Register</div>
          <ul class="dropdown-list custom-scrollbar" id="detailSearchList"></ul>
        </div>
      </div>

      <!-- Quick Docket Step Buttons (Prev/Next) -->
      <div class="docket-step-group">
        <button type="button" class="step-btn" id="detailPrevCaseBtn" title="Previous Case (Alt + Left)">
          <svg class="lucide lucide-chevron-left" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <button type="button" class="step-btn" id="detailNextCaseBtn" title="Next Case (Alt + Right)">
          <svg class="lucide lucide-chevron-right" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>

      <button type="button" class="back-register-btn" onclick="showTab('all', event)" title="Return to Cases Register">
        <svg class="lucide lucide-arrow-left" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
        <span>All Cases</span>
      </button>
    </div>
  </header>

  <!-- Empty State when no cases are available -->
  <div class="detail-empty-state hidden" id="detailEmptyState">
    <div class="empty-icon-box">
      <svg class="lucide lucide-folder-search" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
    </div>
    <h2 class="empty-title">No Case Selected</h2>
    <p class="empty-desc">Choose a case from the search bar above or return to Cases Register to view full dossier details.</p>
    <button type="button" class="act primary" onclick="showTab('all', event)">
      <svg class="lucide lucide-list" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
      <span>Browse All Cases</span>
    </button>
  </div>

  <!-- Main Dossier Content Wrapper -->
  <div class="detail-content-wrap" id="detailContentWrap">
    <!-- 2. Masthead / Hero Card: Case Identifier & Parties Face-off -->
    <article class="detail-hero-card" id="detailHeroCard" data-type="civil">
      <div class="hero-header-line">
        <div class="case-identity-cluster">
          <div class="case-number-box">
            <span class="case-number-text" id="detailCaseNumberText">—</span>
            <button type="button" class="copy-case-btn" id="detailCopyCaseNoBtn" title="Copy Case Number">
              <svg class="lucide lucide-copy" id="detailCopyIcon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </button>
          </div>
          <span class="cnr-badge hidden" id="detailCnrBadge">CNR: <strong id="detailCnrText">—</strong></span>
        </div>

        <div class="badges-cluster">
          <div class="badge shape-split badge-type badge-civil" id="detailTypeBadge">
            <span class="shape-split-icon">
              <svg class="lucide lucide-scale" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>
            </span>
            <span class="shape-split-text" id="detailTypeText">Civil Suit</span>
          </div>

          <div class="badge shape-split badge-pending" id="detailStatusBadge">
            <span class="shape-split-icon">
              <svg class="lucide lucide-clock" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </span>
            <span class="shape-split-text" id="detailStatusText">Pending</span>
          </div>
        </div>
      </div>

      <!-- Litigant Face-Off Visual -->
      <div class="parties-faceoff">
        <div class="party-block party-first">
          <span class="party-role-tag" id="detailPetitionerRole">PLAINTIFF</span>
          <h2 class="party-name" id="detailPetitionerName">—</h2>
        </div>

        <div class="vs-divider" aria-hidden="true">
          <span class="vs-line"></span>
          <span class="vs-circle">VS</span>
          <span class="vs-line"></span>
        </div>

        <div class="party-block party-second">
          <span class="party-role-tag" id="detailRespondentRole">DEFENDANT</span>
          <h2 class="party-name" id="detailRespondentName">—</h2>
        </div>
      </div>

      <div class="hero-footer-line">
        <span class="representation-chip" id="detailAppearingChip">
          <svg class="lucide lucide-user-check" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
          <span id="detailAppearingText">Counsel for Plaintiff</span>
        </span>

        <span class="matter-title-preview" id="detailMatterTitlePreview">—</span>
      </div>
    </article>

    <!-- 3. Horizon Banner: Next Hearing Countdown & Current Stage -->
    <section class="hearing-horizon-banner" id="detailHorizonBanner">
      <div class="horizon-segment horizon-hearing">
        <div class="horizon-eyebrow" id="detailHearingEyebrow">Next Scheduled Hearing</div>
        <div class="horizon-date-row">
          <span class="horizon-date-val" id="detailNextHearingDate">—</span>
          <span class="horizon-chip" id="detailCountdownChip">—</span>
        </div>
      </div>

      <div class="horizon-divider" aria-hidden="true"></div>

      <div class="horizon-segment horizon-stage">
        <div class="horizon-eyebrow">Current Procedural Stage</div>
        <div class="horizon-stage-val" id="detailCurrentStage">—</div>
      </div>

      <div class="horizon-divider" aria-hidden="true"></div>

      <div class="horizon-segment horizon-bench">
        <div class="horizon-eyebrow">Assigned Court &amp; Bench</div>
        <div class="horizon-court-val" id="detailCourtBenchVal">—</div>
      </div>
    </section>

    <!-- 4. Universal Action Deck (Strict Multi-Tab Component Parity & DESIGN.md Standards) -->
    <div class="universal-action-deck" role="toolbar" aria-label="Case Actions">
      <button type="button" class="act primary" id="detailActForwardDate" title="Forward Next Hearing Date">
        <svg class="lucide lucide-calendar-plus" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M10 16h4"/><path d="M12 14v4"/></svg>
        <span>Update Next Date</span>
      </button>

      <a href="javascript:void(0)" class="act act-call" id="detailActCall" title="Call Client Phone">
        <svg class="lucide lucide-phone" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        <span>Call Client</span>
      </a>

      <a href="javascript:void(0)" target="_blank" rel="noopener noreferrer" class="act act-whatsapp" id="detailActWhatsApp" title="Send WhatsApp Message">
        <svg class="lucide lucide-message-circle" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
        <span>WhatsApp</span>
      </a>

      <button type="button" class="act act-passover" id="detailActPassOver" title="Generate Pass-Over Slip">
        <svg class="lucide lucide-file-text" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
        <span>Pass-Over Slip</span>
      </button>

      <button type="button" class="act act-dossier" id="detailActPrint" title="Print Case Dossier (A4)">
        <svg class="lucide lucide-printer" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/><rect x="6" y="14" width="12" height="8" rx="1"/></svg>
        <span>Print Dossier</span>
      </button>

      <button type="button" class="act" id="detailActEdit" title="Edit Case Data in Operations Hub">
        <svg class="lucide lucide-pencil" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
        <span>Edit Case</span>
      </button>

      <button type="button" class="act" id="detailActAddTask" title="Add To-Do or Deadline Task for this case">
        <svg class="lucide lucide-plus-circle" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
        <span>Add Task</span>
      </button>
    </div>

    <!-- 5. Segmented Navigation Bar: 6 Specialized Dossier Sections -->
    <div class="detail-segment-strip" role="tablist" aria-label="Case Dossier Subsections">
      <button type="button" class="segment-tab active" data-segment="0" role="tab" aria-selected="true">
        <svg class="lucide lucide-layout" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
        <span>Overview &amp; Snapshot</span>
      </button>

      <button type="button" class="segment-tab" data-segment="1" role="tab" aria-selected="false">
        <svg class="lucide lucide-landmark" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="2" x2="22" y1="2" y2="2"/><line x1="12" x2="12" y1="7" y2="17"/><path d="m4 7 8-5 8 5"/><line x1="4" x2="4" y1="7" y2="17"/><line x1="20" x2="20" y1="7" y2="17"/><line x1="2" x2="22" y1="17" y2="17"/><line x1="2" x2="22" y1="22" y2="22"/></svg>
        <span>Court &amp; Bench</span>
      </button>

      <button type="button" class="segment-tab" data-segment="2" role="tab" aria-selected="false">
        <svg class="lucide lucide-users" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        <span>Litigant Profile</span>
      </button>

      <button type="button" class="segment-tab" data-segment="3" role="tab" aria-selected="false">
        <svg class="lucide lucide-history" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
        <span>Order Sheet &amp; History</span>
        <span class="segment-badge" id="detailHistoryCountBadge">0</span>
      </button>

      <button type="button" class="segment-tab" data-segment="4" role="tab" aria-selected="false">
        <svg class="lucide lucide-receipt" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 6v12"/></svg>
        <span>Fees &amp; Financials</span>
      </button>

      <button type="button" class="segment-tab" data-segment="5" role="tab" aria-selected="false">
        <svg class="lucide lucide-check-square" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
        <span>Notes &amp; Tasks</span>
        <span class="segment-badge" id="detailTasksCountBadge">0</span>
      </button>
    </div>

    <!-- 6. Specialized Section Panels Container -->
    <div class="detail-panels-deck">
      <!-- PANEL 0: SNAPSHOT & PARTICULARS -->
      <section class="detail-panel active" id="detailPanel0" role="tabpanel" aria-label="Overview & Snapshot">
        <div class="panel-card-grid">
          <div class="panel-box">
            <div class="panel-box-header">
              <div class="header-title-wrap">
                <svg class="lucide lucide-file-text" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
                <h3>Matter Snapshot</h3>
              </div>
              <span class="panel-sub-tag">Particulars</span>
            </div>
            <div class="detail-table-wrap">
              <table class="detail-kv-table">
                <tbody id="detailSnapshotTableBody"></tbody>
              </table>
            </div>
          </div>

          <div class="panel-box">
            <div class="panel-box-header">
              <div class="header-title-wrap">
                <svg class="lucide lucide-book-open" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                <h3 id="detailSpecializedCardTitle">Category Specific Particulars</h3>
              </div>
              <span class="panel-sub-tag" id="detailSpecializedCategoryTag">Statutory</span>
            </div>
            <div class="detail-table-wrap">
              <table class="detail-kv-table">
                <tbody id="detailSpecializedTableBody"></tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <!-- PANEL 1: COURT & BENCH HIERARCHY -->
      <section class="detail-panel" id="detailPanel1" role="tabpanel" aria-label="Court & Bench" hidden>
        <div class="panel-box">
          <div class="panel-box-header">
            <div class="header-title-wrap">
              <svg class="lucide lucide-landmark" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="2" x2="22" y1="2" y2="2"/><line x1="12" x2="12" y1="7" y2="17"/><path d="m4 7 8-5 8 5"/><line x1="4" x2="4" y1="7" y2="17"/><line x1="20" x2="20" y1="7" y2="17"/><line x1="2" x2="22" y1="17" y2="17"/><line x1="2" x2="22" y1="22" y2="22"/></svg>
              <h3>Court &amp; Judicial Bench Details</h3>
            </div>
          </div>
          <div class="detail-table-wrap">
            <table class="detail-kv-table">
              <tbody id="detailCourtDetailsBody"></tbody>
            </table>
          </div>
        </div>

        <div class="panel-box mt-4" id="detailTransferHistoryBox">
          <div class="panel-box-header">
            <div class="header-title-wrap">
              <svg class="lucide lucide-arrow-left-right" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/></svg>
              <h3>Forum Transfer History</h3>
            </div>
            <span class="badge shape-split badge-civil" id="detailTransferCountBadge">0 Transfers</span>
          </div>
          <div class="detail-table-wrap">
            <table class="detail-records-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Transfer Route</th>
                  <th>Order / Authority</th>
                  <th>Reason &amp; Remarks</th>
                </tr>
              </thead>
              <tbody id="detailTransferHistoryBody"></tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- PANEL 2: LITIGANT PROFILE & CONTACTS -->
      <section class="detail-panel" id="detailPanel2" role="tabpanel" aria-label="Litigant Profile" hidden>
        <div class="panel-card-grid">
          <div class="panel-box">
            <div class="panel-box-header">
              <div class="header-title-wrap">
                <svg class="lucide lucide-user" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <h3>Primary Litigant (Client)</h3>
              </div>
              <span class="panel-sub-tag" id="detailClientRelationTag">Client</span>
            </div>
            <div class="litigant-profile-card">
              <div class="litigant-avatar" id="detailClientAvatar">CL</div>
              <div class="litigant-info">
                <h4 class="litigant-name" id="detailClientHeroName">—</h4>
                <p class="litigant-role-text" id="detailClientRoleText">Appearing Party</p>
              </div>
            </div>
            <div class="detail-table-wrap">
              <table class="detail-kv-table">
                <tbody id="detailClientContactBody"></tbody>
              </table>
            </div>
          </div>

          <div class="panel-box">
            <div class="panel-box-header">
              <div class="header-title-wrap">
                <svg class="lucide lucide-shield-alert" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
                <h3>Opposite Party &amp; Counsel</h3>
              </div>
              <span class="panel-sub-tag">Opponent</span>
            </div>
            <div class="litigant-profile-card">
              <div class="litigant-avatar opponent" id="detailOpponentAvatar">OP</div>
              <div class="litigant-info">
                <h4 class="litigant-name" id="detailOpponentHeroName">—</h4>
                <p class="litigant-role-text" id="detailOpponentRoleText">Opposite Litigant</p>
              </div>
            </div>
            <div class="detail-table-wrap">
              <table class="detail-kv-table">
                <tbody id="detailOpponentContactBody"></tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <!-- PANEL 3: ORDER SHEET & PROCEEDINGS TIMELINE -->
      <section class="detail-panel" id="detailPanel3" role="tabpanel" aria-label="Order Sheet & Proceedings" hidden>
        <div class="panel-box">
          <div class="panel-box-header">
            <div class="header-title-wrap">
              <svg class="lucide lucide-history" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
              <h3>Chronological Proceedings &amp; Order Sheet</h3>
            </div>
            <button type="button" class="act primary-sm" id="detailRecordProceedingBtn">
              <svg class="lucide lucide-plus" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              <span>Record Proceeding</span>
            </button>
          </div>
          <div class="detail-timeline-wrap">
            <div class="proceedings-timeline-stream" id="detailProceedingsTimelineStream"></div>
          </div>
        </div>
      </section>

      <!-- PANEL 4: FEES & FINANCIALS (PAISA MANAGER INTEGRATION) -->
      <section class="detail-panel" id="detailPanel4" role="tabpanel" aria-label="Fees & Financials" hidden>
        <div class="finance-overview-grid">
          <div class="finance-metric-card agreed">
            <span class="metric-label">Total Fee Received</span>
            <div class="metric-value" id="detailFeeReceivedVal">₹0</div>
          </div>
          <div class="finance-metric-card received">
            <span class="metric-label">Total Case Expenses</span>
            <div class="metric-value" id="detailFeeSpentVal">₹0</div>
          </div>
          <div class="finance-metric-card balance">
            <span class="metric-label">Net Balance (Paisa Ledger)</span>
            <div class="metric-value" id="detailFeeBalanceVal">₹0</div>
          </div>
        </div>

        <div class="panel-box mt-4">
          <div class="panel-box-header">
            <div class="header-title-wrap">
              <svg class="lucide lucide-receipt" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 6v12"/></svg>
              <h3>Payment Transactions &amp; Virtual Account Ledger</h3>
            </div>
            <button type="button" class="act" onclick="showTab('paisa', event)">
              <svg class="lucide lucide-external-link" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
              <span>Open Paisa Manager</span>
            </button>
          </div>
          <div class="detail-table-wrap">
            <table class="detail-records-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Particulars / Description</th>
                  <th>Transaction Type</th>
                  <th class="text-right">Amount</th>
                </tr>
              </thead>
              <tbody id="detailFeeTransactionsBody"></tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- PANEL 5: NOTES & LINKED TASKS -->
      <section class="detail-panel" id="detailPanel5" role="tabpanel" aria-label="Notes & Tasks" hidden>
        <div class="panel-box">
          <div class="panel-box-header">
            <div class="header-title-wrap">
              <svg class="lucide lucide-check-square" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
              <h3>Linked Case Tasks &amp; Deadlines</h3>
            </div>
            <button type="button" class="act primary-sm" id="detailAddDeadlineBtn">
              <svg class="lucide lucide-plus" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              <span>Add Deadline Task</span>
            </button>
          </div>
          <div class="detail-table-wrap">
            <table class="detail-records-table">
              <thead>
                <tr>
                  <th>Deadline</th>
                  <th>Task Summary</th>
                  <th>Priority</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody id="detailTasksTableBody"></tbody>
            </table>
          </div>
        </div>

        <div class="panel-box mt-4">
          <div class="panel-box-header">
            <div class="header-title-wrap">
              <svg class="lucide lucide-lock" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <h3>Counsel Private Notes &amp; Observations</h3>
            </div>
          </div>
          <div class="detail-table-wrap">
            <table class="detail-records-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Recorded Date</th>
                  <th>Notes &amp; Remarks</th>
                </tr>
              </thead>
              <tbody id="detailNotesTableBody"></tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  </div>
</div>`;

// 2. Safe HTML & Date Formatting Helpers
function safeDetailHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function safeDetailDate(dateStr) {
  if (!dateStr || dateStr === "—" || dateStr === "null" || dateStr === "undefined") {
    return "—";
  }
  if (typeof window.formatDateDMY === "function") {
    return window.formatDateDMY(dateStr);
  }
  return String(dateStr);
}

function parsePartiesFromTitle(title) {
  if (!title || typeof title !== "string") return null;
  const cleaned = title.trim();
  const match = cleaned.match(/^(.*?)\s+(?:vs\.?|v\/s|v\.|versus)\s+(.*)$/i);
  if (match && match[1].trim() && match[2].trim()) {
    return {
      party1: match[1].trim(),
      party2: match[2].trim()
    };
  }
  return null;
}

function extractParties(caseName, c = {}, isCriminal = false) {
  // 1. Authoritative check: parse directly from caseName (e.g. "Prathvipal vs Banvari & others")
  let parsed = parsePartiesFromTitle(caseName);
  if (parsed && parsed.party1 && parsed.party2) {
    let p = parsed.party1;
    let d = parsed.party2;
    if (c.plaintiff && c.plaintiff.trim().toLowerCase() === p.toLowerCase()) {
      p = c.plaintiff.trim();
    }
    if (c.defendant && c.defendant.trim().toLowerCase() === d.toLowerCase()) {
      d = c.defendant.trim();
    }
    return { plaintiff: p, defendant: d };
  }

  // 2. Try title property if different
  if (c.title && c.title !== caseName) {
    parsed = parsePartiesFromTitle(c.title);
    if (parsed && parsed.party1 && parsed.party2) {
      let p = parsed.party1;
      let d = parsed.party2;
      if (c.plaintiff && c.plaintiff.trim().toLowerCase() === p.toLowerCase()) {
        p = c.plaintiff.trim();
      }
      if (c.defendant && c.defendant.trim().toLowerCase() === d.toLowerCase()) {
        d = c.defendant.trim();
      }
      return { plaintiff: p, defendant: d };
    }
  }

  // 3. Try plaintiff field if it contains "vs"
  if (c.plaintiff && typeof c.plaintiff === "string") {
    parsed = parsePartiesFromTitle(c.plaintiff);
    if (parsed && parsed.party1 && parsed.party2) {
      return { plaintiff: parsed.party1, defendant: parsed.party2 };
    }
  }

  // 4. Try global helper if available
  if (typeof window.parsePartiesFromCaseTitle === "function") {
    parsed = window.parsePartiesFromCaseTitle(caseName);
    if (parsed && parsed.party1 && parsed.party2) {
      let p = parsed.party1;
      let d = parsed.party2;
      if (c.plaintiff && c.plaintiff.trim().toLowerCase() === p.toLowerCase()) {
        p = c.plaintiff.trim();
      }
      if (c.defendant && c.defendant.trim().toLowerCase() === d.toLowerCase()) {
        d = c.defendant.trim();
      }
      return { plaintiff: p, defendant: d };
    }
  }

  // 5. Fallback to individual columns
  let rawP = (c.plaintiff || c.applicant || c.petitioner || c.firstParty || c.victimName || c.complainant || "").trim();
  let rawD = (c.defendant || c.oppositeParty || c.respondent || c.accusedName || "").trim();

  if (rawP.toLowerCase() === "not specified" || rawP.toLowerCase() === "plaintiff") rawP = "";
  if (rawD.toLowerCase() === "not specified" || rawD.toLowerCase() === "defendant") rawD = "";

  return {
    plaintiff: rawP || (isCriminal ? "State / Prosecution" : "Plaintiff"),
    defendant: rawD || (isCriminal ? "Accused" : "Defendant")
  };
}

// 3. Tab State
let activeDetailSegmentIndex = 0;
let currentDetailCase = null;

/**
 * Switch active segment panel (0 to 5)
 */
function selectDetailSegment(idx) {
  const container = document.querySelector("#detail, [data-detail-scope]");
  if (!container) return;

  activeDetailSegmentIndex = parseInt(idx, 10) || 0;

  const segmentTabs = container.querySelectorAll(".segment-tab");
  segmentTabs.forEach((tab) => {
    const sIdx = parseInt(tab.getAttribute("data-segment"), 10);
    const isActive = sIdx === activeDetailSegmentIndex;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", isActive ? "true" : "false");
  });

  for (let i = 0; i <= 5; i++) {
    const panel = container.querySelector(`#detailPanel${i}`);
    if (panel) {
      if (i === activeDetailSegmentIndex) {
        panel.classList.add("active");
        panel.removeAttribute("hidden");
      } else {
        panel.classList.remove("active");
        panel.setAttribute("hidden", "hidden");
      }
    }
  }
}

/**
 * Find case record from in-memory registers
 */
function findCaseInRegister(caseIdentifier) {
  if (!caseIdentifier) return null;
  if (typeof caseIdentifier === "object" && caseIdentifier !== null) {
    return caseIdentifier;
  }

  const query = String(caseIdentifier).trim().toLowerCase();
  const all = Array.isArray(window.allCaseRecords) ? window.allCaseRecords : [];

  return all.find((c) => {
    const num1 = (c.caseNo || "").toLowerCase();
    const num2 = (c.criminalCaseNumber || "").toLowerCase();
    const num3 = (c.case_number || "").toLowerCase();
    const id = c.id ? String(c.id).toLowerCase() : "";
    return num1 === query || num2 === query || num3 === query || id === query;
  });
}

/**
 * Populate and hydrate the Case Detail view with a case record
 */
function loadCaseInDetailTab(caseIdentifier) {
  const container = document.querySelector("#detail, [data-detail-scope]");
  if (!container) return false;

  const emptyState = container.querySelector("#detailEmptyState");
  const contentWrap = container.querySelector("#detailContentWrap");

  const c = findCaseInRegister(caseIdentifier) ||
    window.currentSelectedCase ||
    (Array.isArray(window.allCaseRecords) && window.allCaseRecords.length > 0 ? window.allCaseRecords[0] : null);

  if (!c) {
    if (emptyState) emptyState.classList.remove("hidden");
    if (contentWrap) contentWrap.classList.add("hidden");
    currentDetailCase = null;
    return false;
  }

  if (emptyState) emptyState.classList.add("hidden");
  if (contentWrap) contentWrap.classList.remove("hidden");

  currentDetailCase = c;
  window.currentSelectedCase = c;

  // Use CaseBook's standard getCaseCardDisplayData when available for 100% field parity
  const cardData = typeof window.getCaseCardDisplayData === "function" ? window.getCaseCardDisplayData(c) : {};

  const caseNo = cardData.caseNumber || c.caseNo || c.criminalCaseNumber || c.case_number || "Case Not Numbered";
  const caseName = cardData.caseName || c.caseName || c.title || `${c.plaintiff || "Plaintiff"} vs ${c.defendant || "Defendant"}`;
  const courtName = cardData.courtName || c.courtName || c.criminalCourtName || c.court || "District Court";
  const rawType = (cardData.caseType || c.caseType || c.case_type || "civil").toLowerCase().trim();

  const isDisposed = cardData.isDisposed !== undefined
    ? cardData.isDisposed
    : (typeof isCaseDisposed === "function" ? isCaseDisposed(c) : Boolean(c.disposalComment || c.disposal_comment || (c.status || "").includes("dispose")));

  const isUndated = cardData.isUndated !== undefined
    ? cardData.isUndated
    : (typeof isCaseUndated === "function" ? isCaseUndated(c) : (!isDisposed && (!c.nextHearing || c.nextHearing === "Undated" || c.nextHearing === "—")));

  // Hearing date & countdown (Real stored column is c.nextHearing)
  const nextHearingDateRaw = c.nextHearing || c.hearingDate || c.nextDate || "";
  const nextDateFormatted = isDisposed
    ? (c.disposalDate || c.disposal_date ? safeDetailDate(c.disposalDate || c.disposal_date) : "Decided / Disposed")
    : isUndated
    ? "Undated"
    : safeDetailDate(nextHearingDateRaw);

  const stage = c.hearingProcess || c.stage || (isDisposed ? (c.disposalComment || c.disposal_comment || "Case Closed") : "Hearing");
  const cnr = c.cnrNumber || c.cnr || "";

  // Category normalization matching CaseBook Master registers
  const isCriminal = ["criminal", "state", "complaint", "misc_criminal", "misccriminal"].includes(rawType) || (caseNo && String(caseNo).toUpperCase().includes("CRI"));
  const isFamily = rawType === "family";
  const isRevenue = rawType === "revenue";
  const isMiscCivil = rawType === "misc_civil" || rawType === "misccivil" || rawType === "misc";

  let typeBadgeLabel = "Civil Suit";
  let typeClass = "badge-civil";
  let normType = "civil";
  if (isCriminal) {
    typeBadgeLabel = rawType === "complaint" ? "Complaint Case" : (rawType === "misc_criminal" || (caseNo && String(caseNo).toUpperCase().includes("CRI.MISC"))) ? "Criminal Misc." : "State / Criminal";
    typeClass = "badge-criminal";
    normType = "criminal";
  } else if (isFamily) {
    typeBadgeLabel = "Family Court";
    typeClass = "badge-family";
    normType = "family";
  } else if (isRevenue) {
    typeBadgeLabel = "Revenue Court";
    typeClass = "badge-revenue";
    normType = "revenue";
  } else if (isMiscCivil) {
    typeBadgeLabel = "Misc. Civil";
    typeClass = "badge-civil";
    normType = "civil";
  }

  const heroCard = container.querySelector("#detailHeroCard");
  if (heroCard) heroCard.setAttribute("data-type", normType);

  // 1. Case Number & Copy
  const caseNumEl = container.querySelector("#detailCaseNumberText");
  if (caseNumEl) caseNumEl.textContent = caseNo;

  const cnrBadge = container.querySelector("#detailCnrBadge");
  const cnrText = container.querySelector("#detailCnrText");
  if (cnrBadge && cnrText) {
    if (cnr) {
      cnrText.textContent = cnr;
      cnrBadge.classList.remove("hidden");
    } else {
      cnrBadge.classList.add("hidden");
    }
  }

  // 2. Badges
  const typeBadge = container.querySelector("#detailTypeBadge");
  const typeText = container.querySelector("#detailTypeText");
  if (typeBadge && typeText) {
    typeBadge.className = `badge shape-split badge-type ${typeClass}`;
    typeText.textContent = typeBadgeLabel;
  }

  const statusBadge = container.querySelector("#detailStatusBadge");
  const statusText = container.querySelector("#detailStatusText");
  if (statusBadge && statusText) {
    if (isDisposed) {
      statusBadge.className = "badge shape-split badge-disposed";
      statusText.textContent = (c.caseStatus && String(c.caseStatus).toLowerCase().includes("decid")) ? "Decided" : "Disposed";
    } else if (isUndated) {
      statusBadge.className = "badge shape-split badge-undated";
      statusText.textContent = "Undated";
    } else {
      statusBadge.className = "badge shape-split badge-pending";
      statusText.textContent = "Pending";
    }
  }

  // 3. Litigants & Face-off (Accurately extracted from parties and caseName)
  const parties = extractParties(caseName, c, isCriminal);
  const pName = parties.plaintiff;
  const rName = parties.defendant;

  const pNameEl = container.querySelector("#detailPetitionerName");
  const rNameEl = container.querySelector("#detailRespondentName");
  if (pNameEl) pNameEl.textContent = pName;
  if (rNameEl) rNameEl.textContent = rName;

  const pRoleEl = container.querySelector("#detailPetitionerRole");
  const rRoleEl = container.querySelector("#detailRespondentRole");
  if (pRoleEl) pRoleEl.textContent = cardData.appRole ? cardData.appRole.toUpperCase() : (isCriminal ? "PROSECUTION / STATE" : isFamily ? "PETITIONER" : isRevenue ? "APPLICANT" : "PLAINTIFF");
  if (rRoleEl) rRoleEl.textContent = cardData.resRole ? cardData.resRole.toUpperCase() : (isCriminal ? "ACCUSED" : isFamily ? "RESPONDENT" : isRevenue ? "OPPOSITE PARTY" : "DEFENDANT");

  const appTextEl = container.querySelector("#detailAppearingText");
  const clientRecordedName = (c.clientName || c.criminalClientName || c.client || "").trim();
  const appearingForRaw = (c.appearingFor || "").trim();
  if (appTextEl) {
    if (appearingForRaw) {
      appTextEl.textContent = `Counsel for ${appearingForRaw}`;
    } else if (clientRecordedName) {
      appTextEl.textContent = `Counsel for ${clientRecordedName}`;
    } else {
      appTextEl.textContent = isCriminal ? `Defense Counsel for ${rName}` : `Counsel for ${pName}`;
    }
  }

  const previewEl = container.querySelector("#detailMatterTitlePreview");
  if (previewEl) previewEl.textContent = caseName;

  // 4. Horizon Banner Countdown & Stage
  const hDateEl = container.querySelector("#detailNextHearingDate");
  const hChipEl = container.querySelector("#detailCountdownChip");
  const hStageEl = container.querySelector("#detailCurrentStage");
  const hCourtEl = container.querySelector("#detailCourtBenchVal");
  const hEyebrow = container.querySelector("#detailHearingEyebrow");

  if (hEyebrow) hEyebrow.textContent = isDisposed ? "Case Disposal Status" : "Next Scheduled Hearing";
  if (hDateEl) hDateEl.textContent = nextDateFormatted;

  if (hChipEl) {
    if (isDisposed) {
      hChipEl.textContent = "CLOSED";
      hChipEl.className = "horizon-chip is-success";
    } else if (isUndated || !nextHearingDateRaw) {
      hChipEl.textContent = "UNDATED";
      hChipEl.className = "horizon-chip is-warning";
    } else {
      try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const target = new Date(nextHearingDateRaw);
        target.setHours(0, 0, 0, 0);
        if (!isNaN(target.getTime())) {
          const diffDays = Math.round((target - today) / (1000 * 60 * 60 * 24));
          if (diffDays === 0) {
            hChipEl.textContent = "TODAY";
          } else if (diffDays === 1) {
            hChipEl.textContent = "TOMORROW";
          } else if (diffDays > 1) {
            hChipEl.textContent = `IN ${diffDays} DAYS`;
          } else if (diffDays === -1) {
            hChipEl.textContent = "YESTERDAY";
          } else {
            hChipEl.textContent = `${Math.abs(diffDays)} DAYS OVERDUE`;
          }
        } else {
          hChipEl.textContent = "SCHEDULED";
        }
      } catch (e) {
        hChipEl.textContent = "SCHEDULED";
      }
    }
  }
  if (hStageEl) hStageEl.textContent = stage;
  if (hCourtEl) hCourtEl.textContent = courtName;

  // 5. Universal Action Deck Setup
  const phone = (c.clientNumber || c.criminalClientNumber || c.clientPhone || c.phone || c.mobile || "").trim();
  const actCall = container.querySelector("#detailActCall");
  if (actCall) {
    if (phone) {
      actCall.href = `tel:${phone}`;
      actCall.removeAttribute("disabled");
      actCall.title = `Call Client: ${phone}`;
    } else {
      actCall.href = "javascript:void(0)";
      actCall.title = "No client contact number recorded";
    }
  }

  const actWhatsApp = container.querySelector("#detailActWhatsApp");
  if (actWhatsApp) {
    if (phone) {
      const cleanPhone = phone.replace(/[^0-9]/g, "");
      const fullPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
      const msg = encodeURIComponent(`Namaste, regarding Case ${caseNo} (${caseName}) listed in ${courtName} on ${nextDateFormatted} for ${stage}.`);
      actWhatsApp.href = `https://wa.me/${fullPhone}?text=${msg}`;
      actWhatsApp.removeAttribute("disabled");
    } else {
      actWhatsApp.href = "javascript:void(0)";
      actWhatsApp.title = "No client WhatsApp number recorded";
    }
  }

  const actForward = container.querySelector("#detailActForwardDate");
  if (actForward) {
    actForward.onclick = () => {
      if (typeof openForwardHearingModalByCaseNo === "function") {
        openForwardHearingModalByCaseNo(caseNo);
      } else if (typeof openForwardModal === "function") {
        openForwardModal(c);
      }
    };
  }

  const actPassOver = container.querySelector("#detailActPassOver");
  if (actPassOver) {
    actPassOver.onclick = () => {
      if (typeof openPassOverSlipModal === "function") {
        openPassOverSlipModal(caseNo);
      } else if (typeof generatePassOverSlip === "function") {
        generatePassOverSlip(c);
      } else {
        alert(`Pass-Over Slip: ${caseNo} | Court: ${courtName} | Stage: ${stage}`);
      }
    };
  }

  const actPrint = container.querySelector("#detailActPrint");
  if (actPrint) {
    actPrint.onclick = () => {
      if (typeof printCurrentCaseDossier === "function") {
        printCurrentCaseDossier(c);
      } else {
        window.print();
      }
    };
  }

  const actEdit = container.querySelector("#detailActEdit");
  if (actEdit) {
    actEdit.onclick = () => {
      if (typeof showTab === "function") showTab("manage");
      setTimeout(() => {
        if (typeof switchCaseHubMode === "function") switchCaseHubMode("update");
        const searchInput = document.getElementById("updateSearchInput") || document.getElementById("caseHubSearchInput");
        if (searchInput) {
          searchInput.value = caseNo;
          searchInput.dispatchEvent(new Event("input", { bubbles: true }));
        }
      }, 50);
    };
  }

  const actAddTask = container.querySelector("#detailActAddTask");
  if (actAddTask) {
    actAddTask.onclick = () => {
      if (typeof openTodoForCase === "function") {
        openTodoForCase(caseNo);
      } else if (typeof showTab === "function") {
        showTab("todo");
      }
    };
  }

  // 6. Panel 0: Snapshot & Real Database Particulars
  const filingDateStr = c.filingDate || c.crimeFilingDate ? safeDetailDate(c.filingDate || c.crimeFilingDate) : "";
  const yearStr = c.caseYear || c.crimeYear || (c.filingDate ? String(c.filingDate).slice(0, 4) : "");
  const remarkStr = typeof remarksToPlainText === "function" ? remarksToPlainText(c.remark || c.remarks) : (c.remark || c.remarks || "");

  const snapshotBody = container.querySelector("#detailSnapshotTableBody");
  if (snapshotBody) {
    let snapHtml = `
      <tr><th>Case Number</th><td><strong>${safeDetailHtml(caseNo)}</strong></td></tr>
      <tr><th>Matter Name</th><td>${safeDetailHtml(caseName)}</td></tr>
      <tr><th>Plaintiff / Petitioner</th><td><strong>${safeDetailHtml(pName)}</strong></td></tr>
      <tr><th>Defendant / Opposite</th><td><strong>${safeDetailHtml(rName)}</strong></td></tr>
      <tr><th>Case Category</th><td>${safeDetailHtml(typeBadgeLabel)}</td></tr>
      <tr><th>Court / Bench</th><td>${safeDetailHtml(courtName)}</td></tr>
    `;
    if (filingDateStr || yearStr) {
      snapHtml += `<tr><th>Filing / Registration</th><td>${safeDetailHtml([filingDateStr, yearStr ? `Year: ${yearStr}` : ""].filter(Boolean).join(" · "))}</td></tr>`;
    }
    if (cnr) {
      snapHtml += `<tr><th>CNR Number</th><td>${safeDetailHtml(cnr)}</td></tr>`;
    }
    snapHtml += `
      <tr><th>Hearing Stage</th><td>${safeDetailHtml(stage)}</td></tr>
      <tr><th>Scheduled Hearing Date</th><td><strong>${safeDetailHtml(nextDateFormatted)}</strong></td></tr>
      <tr><th>Primary Litigant (Client)</th><td>${safeDetailHtml(clientRecordedName || pName)}</td></tr>
    `;
    if (phone) {
      snapHtml += `<tr><th>Client Phone</th><td><a href="tel:${safeDetailHtml(phone)}">${safeDetailHtml(phone)}</a></td></tr>`;
    }
    if (remarkStr) {
      snapHtml += `<tr><th>Case Remarks / Notes</th><td>${safeDetailHtml(remarkStr)}</td></tr>`;
    }
    if (c.docLink) {
      snapHtml += `<tr><th>Document Link</th><td><a href="${safeDetailHtml(c.docLink)}" target="_blank" rel="noopener">📄 Open Case Document File ↗</a></td></tr>`;
    }
    snapshotBody.innerHTML = snapHtml;
  }

  // 7. Panel 0 (Card B): Category Specific Particulars (Matching CaseBook Data Exactly)
  const specTitle = container.querySelector("#detailSpecializedCardTitle");
  const specTag = container.querySelector("#detailSpecializedCategoryTag");
  const specBody = container.querySelector("#detailSpecializedTableBody");

  if (specBody) {
    let rowsHtml = "";
    if (rawType === "misc_criminal" || (caseNo && String(caseNo).toUpperCase().includes("CRI.MISC"))) {
      if (specTitle) specTitle.textContent = "Criminal Miscellaneous Particulars";
      if (specTag) specTag.textContent = "Cr. Misc";
      if (c.proceedingType) rowsHtml += `<tr><th>Proceeding Type</th><td><strong>${safeDetailHtml(c.proceedingType)}</strong></td></tr>`;
      if (c.originalCaseNumber) rowsHtml += `<tr><th>Original FIR / Case No</th><td><strong>${safeDetailHtml(c.originalCaseNumber)}</strong></td></tr>`;
      if (c.policeStation) rowsHtml += `<tr><th>Police Station</th><td>${safeDetailHtml(c.policeStation)}</td></tr>`;
      if (c.crimeSection) rowsHtml += `<tr><th>Section (IPC/BNS/Act)</th><td>${safeDetailHtml(c.crimeSection)}</td></tr>`;
    } else if (rawType === "complaint") {
      if (specTitle) specTitle.textContent = "Complaint Matter Particulars";
      if (specTag) specTag.textContent = "Complaint";
      if (c.complaintType) rowsHtml += `<tr><th>Complaint Nature</th><td><strong>${safeDetailHtml(c.complaintType)}</strong></td></tr>`;
      if (c.sectionAct || c.crimeSection) rowsHtml += `<tr><th>Statutory Section</th><td>${safeDetailHtml(c.sectionAct || c.crimeSection)}</td></tr>`;
      if (c.policeStation) rowsHtml += `<tr><th>Jurisdiction / Thana</th><td>${safeDetailHtml(c.policeStation)}</td></tr>`;
    } else if (isCriminal) {
      if (specTitle) specTitle.textContent = "State / Criminal Case Particulars";
      if (specTag) specTag.textContent = "Criminal";
      if (c.policeStation) rowsHtml += `<tr><th>Police Station / Thana</th><td><strong>${safeDetailHtml(c.policeStation)}</strong></td></tr>`;
      if (c.crimeNumber || c.firNumber || c.firNo) rowsHtml += `<tr><th>Crime / FIR No.</th><td><strong>${safeDetailHtml(c.crimeNumber || c.firNumber || c.firNo)}</strong></td></tr>`;
      if (c.crimeSection || c.sections || c.act) rowsHtml += `<tr><th>Sections (IPC / BNS)</th><td>${safeDetailHtml(c.crimeSection || c.sections || c.act)}</td></tr>`;
      rowsHtml += `<tr><th>Custody Status</th><td>${c.inCustody ? "In Jail Custody" : "On Bail / Not In Custody"}</td></tr>`;
    } else if (isFamily) {
      if (specTitle) specTitle.textContent = "Family & Matrimonial Particulars";
      if (specTag) specTag.textContent = "Family";
      if (c.familyMatterType || c.matterType) rowsHtml += `<tr><th>Dispute Nature</th><td><strong>${safeDetailHtml(c.familyMatterType || c.matterType)}</strong></td></tr>`;
      if (c.marriageDate) rowsHtml += `<tr><th>Date of Marriage</th><td>${safeDetailDate(c.marriageDate)}</td></tr>`;
      if (c.maintenanceDetail || c.maintenance) rowsHtml += `<tr><th>Maintenance Claims</th><td>${safeDetailHtml(c.maintenanceDetail || c.maintenance)}</td></tr>`;
    } else if (isRevenue) {
      if (specTitle) specTitle.textContent = "Revenue & Land Matter Particulars";
      if (specTag) specTag.textContent = "Revenue";
      if (c.revenueActSection) rowsHtml += `<tr><th>Revenue Act &amp; Section</th><td><strong>${safeDetailHtml(c.revenueActSection)}</strong></td></tr>`;
      if (c.villageMauja || c.village) rowsHtml += `<tr><th>Village / Mauza</th><td>${safeDetailHtml(c.villageMauja || c.village)}</td></tr>`;
      if (c.parganaTehsil || c.tehsil || c.pargana) rowsHtml += `<tr><th>Tehsil / Pargana</th><td>${safeDetailHtml(c.parganaTehsil || c.tehsil || c.pargana)}</td></tr>`;
      const gataKhata = c.gataKhataNo || [c.khataNo ? "Khata: " + c.khataNo : "", c.gataNo ? "Gata: " + c.gataNo : ""].filter(Boolean).join(" | ");
      if (gataKhata) rowsHtml += `<tr><th>Gata / Khata Number</th><td>${safeDetailHtml(gataKhata)}</td></tr>`;
    } else if (isMiscCivil) {
      if (specTitle) specTitle.textContent = "Civil Miscellaneous Particulars";
      if (specTag) specTag.textContent = "Misc. Civil";
      if (c.proceedingType) rowsHtml += `<tr><th>Application Nature</th><td><strong>${safeDetailHtml(c.proceedingType)}</strong></td></tr>`;
      if (c.originalCaseNumber) rowsHtml += `<tr><th>Original Suit Number</th><td><strong>${safeDetailHtml(c.originalCaseNumber)}</strong></td></tr>`;
    } else {
      if (specTitle) specTitle.textContent = "Civil Suit Particulars";
      if (specTag) specTag.textContent = "Civil Suit";
      rowsHtml += `<tr><th>Suit Nature</th><td>Civil Suit / Original Proceeding</td></tr>`;
      if (c.valuation || c.claimAmount) rowsHtml += `<tr><th>Valuation / Claim</th><td>${safeDetailHtml(c.valuation || c.claimAmount ? `₹${c.valuation || c.claimAmount}` : "")}</td></tr>`;
      if (c.reliefClaimed || c.relief) rowsHtml += `<tr><th>Relief Claimed</th><td>${safeDetailHtml(c.reliefClaimed || c.relief)}</td></tr>`;
    }

    if (isDisposed) {
      const dispComment = (c.disposalComment || c.disposal_comment || "").trim();
      if (dispComment) {
        rowsHtml += `<tr><th>Disposal Order Note</th><td><strong style="color: var(--feedback-success);">${safeDetailHtml(dispComment)}</strong></td></tr>`;
      }
    }

    if (!rowsHtml) {
      rowsHtml = `<tr><td colspan="2">No additional category provisions specified.</td></tr>`;
    }
    specBody.innerHTML = rowsHtml;
  }

  // 8. Panel 1: Court & Bench Hierarchy
  const courtBody = container.querySelector("#detailCourtDetailsBody");
  if (courtBody) {
    courtBody.innerHTML = `
      <tr><th>Assigned Court</th><td><strong>${safeDetailHtml(courtName)}</strong></td></tr>
      <tr><th>Court Room No.</th><td>${safeDetailHtml(c.courtRoom || c.roomNo || "Room Not Specified")}</td></tr>
      <tr><th>Presiding Judge</th><td>${safeDetailHtml(c.judge || c.judgeName || "Hon'ble Presiding Officer")}</td></tr>
      <tr><th>Case Category</th><td>${safeDetailHtml(typeBadgeLabel)}</td></tr>
      <tr><th>Disposition Status</th><td>${isDisposed ? '<span class="badge shape-split badge-disposed">Disposed Off</span>' : isUndated ? '<span class="badge shape-split badge-undated">Undated</span>' : '<span class="badge shape-split badge-pending">Active Pending</span>'}</td></tr>
    `;
  }

  // 8.1 Real Court Transfer History (window.getCaseTransferHistory)
  const transferHistory = typeof window.getCaseTransferHistory === "function"
    ? window.getCaseTransferHistory(caseNo)
    : (Array.isArray(c.transfers) ? c.transfers : Array.isArray(c.transferHistory) ? c.transferHistory : []);

  const transferBody = container.querySelector("#detailTransferHistoryBody");
  const transferCountBadge = container.querySelector("#detailTransferCountBadge");
  if (transferCountBadge) transferCountBadge.textContent = `${transferHistory.length} Transfers`;
  if (transferBody) {
    if (transferHistory.length > 0) {
      transferBody.innerHTML = transferHistory
        .map((t) => {
          const tDate = safeDetailDate(t.transfer_date || t.transferDate || t.date || t.created_at);
          const fromCourt = safeDetailHtml(t.from_court || t.fromCourt || t.from || "Previous Court");
          const toCourt = safeDetailHtml(t.to_court || t.toCourt || t.to || courtName);
          const orderNo = safeDetailHtml(t.order_number || t.orderNumber || t.orderNo || "—");
          const reason = safeDetailHtml([t.transfer_reason || t.transferReason || t.reason, t.remarks].filter(Boolean).join(" — ") || "Transferred by judicial order");
          return `
            <tr>
              <td><strong>${tDate}</strong></td>
              <td>${fromCourt} ➔ <strong>${toCourt}</strong></td>
              <td>${orderNo}</td>
              <td>${reason}</td>
            </tr>
          `;
        })
        .join("");
    } else {
      transferBody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--fg-muted); padding: 14px;">No court transfers recorded. Case is proceeding in its originally assigned court.</td></tr>`;
    }
  }

  // 9. Panel 2: Litigant Profile & Contacts
  const clientHeroName = container.querySelector("#detailClientHeroName");
  const clientHeroAvatar = container.querySelector("#detailClientAvatar");
  const clientHeroRole = container.querySelector("#detailClientRoleText");
  const clientRelationTag = container.querySelector("#detailClientRelationTag");

  const isClientDistinct = clientRecordedName && clientRecordedName.toLowerCase() !== pName.toLowerCase() && clientRecordedName.toLowerCase() !== rName.toLowerCase();
  const displayName = clientRecordedName || pName;

  if (clientHeroName) clientHeroName.textContent = displayName;
  if (clientHeroAvatar) {
    clientHeroAvatar.textContent = displayName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join("") || "CL";
  }
  if (clientHeroRole) {
    clientHeroRole.textContent = isClientDistinct
      ? `Client (Appearing for ${pName})`
      : (normType === "criminal" ? "Appearing Litigant / Complainant" : "Plaintiff / Petitioner");
  }
  if (clientRelationTag) {
    clientRelationTag.textContent = isClientDistinct ? "Client" : (normType === "criminal" ? "Complainant" : "Plaintiff");
  }

  const oppHeroName = container.querySelector("#detailOpponentHeroName");
  const oppHeroAvatar = container.querySelector("#detailOpponentAvatar");
  if (oppHeroName) oppHeroName.textContent = rName;
  if (oppHeroAvatar) {
    oppHeroAvatar.textContent = rName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join("") || "OP";
  }

  const clientContactBody = container.querySelector("#detailClientContactBody");
  if (clientContactBody) {
    let clientHtml = `
      <tr><th>Full Name</th><td><strong>${safeDetailHtml(displayName)}</strong></td></tr>
    `;
    if (isClientDistinct) {
      clientHtml += `<tr><th>Suit Representation</th><td>${safeDetailHtml(pName)} (Plaintiff / Litigant)</td></tr>`;
    }
    clientHtml += `
      <tr><th>Primary Contact</th><td>${phone ? `<a href="tel:${safeDetailHtml(phone)}"><svg class="lucide lucide-phone" style="display:inline-block;vertical-align:middle;margin-right:4px;" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>${safeDetailHtml(phone)}</a>` : "No contact number recorded"}</td></tr>
    `;
    if (c.clientEmail || c.email) {
      clientHtml += `<tr><th>Email Address</th><td>${safeDetailHtml(c.clientEmail || c.email)}</td></tr>`;
    }
    if (c.clientAddress || c.address) {
      clientHtml += `<tr><th>Address</th><td>${safeDetailHtml(c.clientAddress || c.address)}</td></tr>`;
    }
    clientContactBody.innerHTML = clientHtml;
  }

  const oppContactBody = container.querySelector("#detailOpponentContactBody");
  if (oppContactBody) {
    let oppHtml = `
      <tr><th>Opposite Party</th><td><strong>${safeDetailHtml(rName)}</strong></td></tr>
      <tr><th>Opposite Counsel</th><td>${safeDetailHtml(c.opposingCounsel || c.oppositeAdvocate || "Not Disclosed")}</td></tr>
    `;
    if (c.opposingCounselPhone) {
      oppHtml += `<tr><th>Counsel Contact</th><td>${safeDetailHtml(c.opposingCounselPhone)}</td></tr>`;
    }
    if (c.opposingAddress) {
      oppHtml += `<tr><th>Opponent Address</th><td>${safeDetailHtml(c.opposingAddress)}</td></tr>`;
    }
    oppContactBody.innerHTML = oppHtml;
  }

  // 10. Panel 3: Order Sheet & Hearing History (window.getCaseHearingHistory)
  const history = typeof window.getCaseHearingHistory === "function"
    ? window.getCaseHearingHistory(caseNo)
    : (Array.isArray(c.proceedings) ? c.proceedings : Array.isArray(c.history) ? c.history : []);

  const historyCountBadge = container.querySelector("#detailHistoryCountBadge");
  if (historyCountBadge) historyCountBadge.textContent = history.length;

  const proceedingsStream = container.querySelector("#detailProceedingsTimelineStream");
  if (proceedingsStream) {
    if (history.length > 0) {
      proceedingsStream.innerHTML = history
        .map((h) => {
          const hDate = safeDetailDate(h.hearing_date || h.date || h.hearingDate);
          const hStage = safeDetailHtml(h.stage || h.process || h.purpose || "Hearing");
          const hOrder = safeDetailHtml(h.remarks || h.notes || h.action_taken || h.order || "Case attended and proceedings recorded.");
          return `
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-card">
                <div class="timeline-header">
                  <span class="timeline-date">${hDate}</span>
                  <span class="timeline-stage-chip">${hStage}</span>
                </div>
                <div class="timeline-content">${hOrder}</div>
              </div>
            </div>
          `;
        })
        .join("");
    } else {
      proceedingsStream.innerHTML = `
        <div style="text-align: center; color: var(--fg-muted); padding: 24px;">
          <p>No past hearing proceedings recorded yet.</p>
          <button type="button" class="act primary-sm" onclick="if (typeof openForwardHearingModalByCaseNo === 'function') openForwardHearingModalByCaseNo('${safeDetailHtml(caseNo)}');">
            Log First Proceeding
          </button>
        </div>
      `;
    }
  }

  // 11. Panel 4: Fees & Financials (window.getCasePaisaTransactions)
  const paisaTxns = typeof window.getCasePaisaTransactions === "function"
    ? window.getCasePaisaTransactions(caseNo)
    : (Array.isArray(c.payments) ? c.payments : []);

  const totalReceived = paisaTxns
    .filter((t) => t.type === "received")
    .reduce((acc, t) => acc + (Number(t.amount) || 0), 0) || (parseFloat(c.feesPaid || c.receivedFee || 0) || 0);

  const totalSpent = paisaTxns
    .filter((t) => t.type === "spent")
    .reduce((acc, t) => acc + (Number(t.amount) || 0), 0);

  const netBalance = totalReceived - totalSpent;

  const receivedEl = container.querySelector("#detailFeeReceivedVal");
  const spentEl = container.querySelector("#detailFeeSpentVal");
  const balanceEl = container.querySelector("#detailFeeBalanceVal");

  if (receivedEl) receivedEl.textContent = `₹${totalReceived.toLocaleString("en-IN")}`;
  if (spentEl) spentEl.textContent = `₹${totalSpent.toLocaleString("en-IN")}`;
  if (balanceEl) balanceEl.textContent = `₹${netBalance.toLocaleString("en-IN")}`;

  const feeTxnBody = container.querySelector("#detailFeeTransactionsBody");
  if (feeTxnBody) {
    if (paisaTxns.length > 0) {
      feeTxnBody.innerHTML = paisaTxns
        .map((t) => {
          const tDate = safeDetailDate(t.date || t.created_at);
          const tDesc = safeDetailHtml(t.description || t.particulars || (t.type === "received" ? "Fee Payment" : "Case Expense"));
          const isRec = t.type === "received";
          const tAmount = Number(t.amount) || 0;
          return `
            <tr>
              <td>${tDate}</td>
              <td>${tDesc}</td>
              <td><span class="status ${isRec ? "live" : "disposed"}">${isRec ? "RECEIVED" : "EXPENSE"}</span></td>
              <td class="text-right"><strong>₹${tAmount.toLocaleString("en-IN")}</strong></td>
            </tr>
          `;
        })
        .join("");
    } else if (totalReceived > 0) {
      feeTxnBody.innerHTML = `
        <tr>
          <td>${safeDetailDate(c.filingDate || c.crimeFilingDate)}</td>
          <td>Advance Professional Fee</td>
          <td><span class="status live">RECEIVED</span></td>
          <td class="text-right"><strong>₹${totalReceived.toLocaleString("en-IN")}</strong></td>
        </tr>
      `;
    } else {
      feeTxnBody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--fg-muted); padding: 14px;">No payment records found in virtual account ledger.</td></tr>`;
    }
  }

  // 12. Panel 5: Notes & Linked Tasks (window.getCaseTasksHistory)
  const caseTasks = typeof window.getCaseTasksHistory === "function"
    ? window.getCaseTasksHistory(caseNo)
    : (typeof todoTasks !== "undefined" && Array.isArray(todoTasks) ? todoTasks.filter((t) => t.caseNo === caseNo || t.caseNumber === caseNo) : []);

  const tasksBadge = container.querySelector("#detailTasksCountBadge");
  if (tasksBadge) tasksBadge.textContent = caseTasks.length;

  const tasksBody = container.querySelector("#detailTasksTableBody");
  if (tasksBody) {
    if (caseTasks.length > 0) {
      tasksBody.innerHTML = caseTasks
        .map((task) => {
          const deadlineStr = safeDetailDate(task.deadlineDate || task.deadline_date || task.createdAt || task.date || task.deadline);
          const isDone = task.status === "completed" || task.completed;
          const priority = (task.priority || "normal").toLowerCase();
          const priorityClass = priority === "high" ? "badge-criminal" : priority === "medium" ? "badge-revenue" : "badge-civil";
          const title = task.taskTitle || task.task_title || task.task || task.title || "Untitled Task";
          return `
            <tr>
              <td><strong>${deadlineStr}</strong></td>
              <td><strong>${safeDetailHtml(title)}</strong></td>
              <td><span class="badge shape-split ${priorityClass}">${safeDetailHtml(priority.toUpperCase())}</span></td>
              <td><span class="status ${isDone ? "disposed" : "live"}">${isDone ? "Done" : "Pending"}</span></td>
            </tr>
          `;
        })
        .join("");
    } else {
      tasksBody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--fg-muted); padding: 14px;">No active to-do tasks or deadlines recorded for this case.</td></tr>`;
    }
  }

  const notesBody = container.querySelector("#detailNotesTableBody");
  if (notesBody) {
    const rows = [];
    if (remarkStr) {
      rows.push(`<tr><td><span class="panel-sub-tag">Advocate Note</span></td><td>—</td><td>${safeDetailHtml(remarkStr)}</td></tr>`);
    }
    const dispComment = (c.disposalComment || c.disposal_comment || "").trim();
    if (dispComment) {
      rows.push(`<tr><td><span class="panel-sub-tag">Disposal Comment</span></td><td>${safeDetailDate(c.disposalDate || c.disposal_date)}</td><td><strong>${safeDetailHtml(dispComment)}</strong></td></tr>`);
    }
    if (rows.length === 0) {
      notesBody.innerHTML = `<tr><td colspan="3" style="text-align: center; color: var(--fg-muted); padding: 14px;">No confidential notes recorded yet.</td></tr>`;
    } else {
      notesBody.innerHTML = rows.join("");
    }
  }

  return true;
}

/**
 * Filter & Populate Autocomplete Dropdown List
 */
function renderDetailSearchDropdown(query = "") {
  const container = document.querySelector("#detail, [data-detail-scope]");
  if (!container) return;

  const dropdown = container.querySelector("#detailSearchDropdown");
  const list = container.querySelector("#detailSearchList");
  if (!dropdown || !list) return;

  const all = Array.isArray(window.allCaseRecords) ? window.allCaseRecords : [];
  const q = String(query).trim().toLowerCase();

  const matches = all
    .filter((c) => {
      if (!q) return true;
      const cNo = (c.caseNo || c.criminalCaseNumber || c.case_number || "").toLowerCase();
      const p1 = (c.plaintiff || c.applicant || c.petitioner || "").toLowerCase();
      const p2 = (c.defendant || c.oppositeParty || c.respondent || c.accusedName || "").toLowerCase();
      const title = (c.caseName || c.title || "").toLowerCase();
      const client = (c.clientName || c.criminalClientName || "").toLowerCase();
      return cNo.includes(q) || p1.includes(q) || p2.includes(q) || title.includes(q) || client.includes(q);
    })
    .slice(0, 20);

  if (matches.length === 0) {
    list.innerHTML = `<li style="padding: 10px 12px; color: var(--fg-muted); font-size: 0.8rem;">No cases matching "${safeDetailHtml(query)}"</li>`;
  } else {
    list.innerHTML = matches
      .map((c) => {
        const num = c.caseNo || c.criminalCaseNumber || c.case_number || "Case";
        const title = c.caseName || c.title || `${c.plaintiff || ""} vs ${c.defendant || ""}`;
        return `
        <li class="search-item" data-case-no="${safeDetailHtml(num)}">
          <div class="search-item-header">
            <span class="search-item-caseno">${safeDetailHtml(num)}</span>
            <span class="panel-sub-tag">${safeDetailHtml(c.caseType || "Civil")}</span>
          </div>
          <span class="search-item-title">${safeDetailHtml(title)}</span>
        </li>
      `;
      })
      .join("");
  }

  dropdown.classList.remove("hidden");
}

/**
 * Initialize Event Listeners for the Case Detail Tab
 */
function initDetailTab() {
  const container = document.querySelector("#detail, [data-detail-scope]");
  if (!container) return;

  // Prevent multiple initializations of listeners
  if (container._detailTabInitialized) {
    const targetCaseNo = sessionStorage.getItem("detail_target_case");
    if (targetCaseNo) {
      sessionStorage.removeItem("detail_target_case");
      loadCaseInDetailTab(targetCaseNo);
    } else if (!currentDetailCase) {
      loadCaseInDetailTab(null);
    }
    return;
  }
  container._detailTabInitialized = true;

  // 1. Segment Switcher Listener
  const segmentStrip = container.querySelector(".detail-segment-strip");
  if (segmentStrip) {
    segmentStrip.addEventListener("click", (e) => {
      const btn = e.target.closest(".segment-tab");
      if (!btn) return;
      const sIdx = btn.getAttribute("data-segment");
      if (sIdx !== null) selectDetailSegment(sIdx);
    });
  }

  // 2. Search & Switcher Autocomplete Listeners
  const searchInput = container.querySelector("#detailCaseSearchInput");
  const searchClear = container.querySelector("#detailCaseSearchClear");
  const dropdown = container.querySelector("#detailSearchDropdown");
  const searchList = container.querySelector("#detailSearchList");

  if (searchInput) {
    searchInput.addEventListener("focus", () => {
      renderDetailSearchDropdown(searchInput.value);
    });

    searchInput.addEventListener("input", () => {
      const val = searchInput.value;
      if (searchClear) searchClear.classList.toggle("hidden", !val);
      renderDetailSearchDropdown(val);
    });

    if (searchClear) {
      searchClear.addEventListener("click", () => {
        searchInput.value = "";
        searchClear.classList.add("hidden");
        searchInput.focus();
        renderDetailSearchDropdown("");
      });
    }

    if (searchList) {
      searchList.addEventListener("click", (e) => {
        const item = e.target.closest(".search-item");
        if (!item) return;
        const caseNo = item.getAttribute("data-case-no");
        if (caseNo) {
          loadCaseInDetailTab(caseNo);
          searchInput.value = "";
          if (searchClear) searchClear.classList.add("hidden");
          if (dropdown) dropdown.classList.add("hidden");
        }
      });
    }

    // Dismiss dropdown on outside click
    document.addEventListener("click", (e) => {
      if (!container.contains(e.target)) return;
      const switcherWrap = container.querySelector("#detailCaseSwitcherWrap");
      if (switcherWrap && !switcherWrap.contains(e.target) && dropdown) {
        dropdown.classList.add("hidden");
      }
    });
  }

  // 3. Step Buttons (Prev / Next Case Navigation)
  const prevBtn = container.querySelector("#detailPrevCaseBtn");
  const nextBtn = container.querySelector("#detailNextCaseBtn");

  function stepDocket(direction) {
    const all = Array.isArray(window.allCaseRecords) ? window.allCaseRecords : [];
    if (all.length === 0) return;
    if (!currentDetailCase) {
      loadCaseInDetailTab(all[0]);
      return;
    }
    const curNo = currentDetailCase.caseNo || currentDetailCase.criminalCaseNumber || currentDetailCase.case_number;
    const curIdx = all.findIndex((c) => (c.caseNo || c.criminalCaseNumber || c.case_number) === curNo);
    let nextIdx = 0;
    if (curIdx !== -1) {
      nextIdx = curIdx + direction;
      if (nextIdx < 0) nextIdx = all.length - 1;
      if (nextIdx >= all.length) nextIdx = 0;
    }
    loadCaseInDetailTab(all[nextIdx]);
  }

  if (prevBtn) prevBtn.addEventListener("click", () => stepDocket(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => stepDocket(1));

  // 4. Copy Case Number Button
  const copyBtn = container.querySelector("#detailCopyCaseNoBtn");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      if (!currentDetailCase) return;
      const caseNo = currentDetailCase.caseNo || currentDetailCase.criminalCaseNumber || currentDetailCase.case_number;
      if (caseNo && navigator.clipboard) {
        navigator.clipboard.writeText(caseNo).then(() => {
          const origSvg = copyBtn.innerHTML;
          copyBtn.innerHTML = `<svg class="lucide lucide-check" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
          setTimeout(() => {
            copyBtn.innerHTML = origSvg;
          }, 1500);
        });
      }
    });
  }

  // 5. Additional Header Buttons
  const recordProcBtn = container.querySelector("#detailRecordProceedingBtn");
  if (recordProcBtn) {
    recordProcBtn.addEventListener("click", () => {
      if (currentDetailCase && typeof openForwardHearingModalByCaseNo === "function") {
        openForwardHearingModalByCaseNo(currentDetailCase.caseNo || currentDetailCase.criminalCaseNumber || currentDetailCase.case_number);
      }
    });
  }

  const addDeadlineBtn = container.querySelector("#detailAddDeadlineBtn");
  if (addDeadlineBtn) {
    addDeadlineBtn.addEventListener("click", () => {
      if (currentDetailCase && typeof openTodoForCase === "function") {
        openTodoForCase(currentDetailCase.caseNo || currentDetailCase.criminalCaseNumber || currentDetailCase.case_number);
      } else if (typeof showTab === "function") {
        showTab("todo");
      }
    });
  }

  // 6. Check target case in storage or load default
  const targetCaseNo = sessionStorage.getItem("detail_target_case");
  if (targetCaseNo) {
    sessionStorage.removeItem("detail_target_case");
    loadCaseInDetailTab(targetCaseNo);
  } else {
    loadCaseInDetailTab(null);
  }

  // 7. Auto-refresh when cloud data is synced from Supabase
  window.addEventListener("casebook:data-synced", () => {
    if (currentDetailCase) {
      const curNo = currentDetailCase.caseNo || currentDetailCase.criminalCaseNumber || currentDetailCase.case_number;
      loadCaseInDetailTab(curNo);
    } else {
      loadCaseInDetailTab(null);
    }
  });
}

/**
 * Global Seamless Navigation Helper: openCaseDetailTab
 */
function openCaseDetailTab(caseIdentifier) {
  if (caseIdentifier) {
    const val = typeof caseIdentifier === "object" ? (caseIdentifier.caseNo || caseIdentifier.criminalCaseNumber || caseIdentifier.id) : String(caseIdentifier);
    try { sessionStorage.setItem("detail_target_case", val); } catch (e) {}
  }

  if (typeof showTab === "function") {
    showTab("detail");
  }

  setTimeout(() => {
    initDetailTab();
    if (caseIdentifier) {
      loadCaseInDetailTab(caseIdentifier);
    }
  }, 40);
}

// Global Export bindings
window.initDetailTab = initDetailTab;
window.loadCaseInDetailTab = loadCaseInDetailTab;
window.selectDetailSegment = selectDetailSegment;
window.openCaseDetailTab = openCaseDetailTab;
