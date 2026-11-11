window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs["settings"] = /* HTML */ `<div class="settings-container">

  <!-- ==================== EXECUTIVE HERO HEADER ==================== -->
  <header class="settings-hero">
    <div class="settings-hero-content">
      <div class="settings-hero-text">
        <div class="settings-hero-kicker">
          <i class="fa-solid fa-sliders"></i>
          <span>CHAMBERS SYSTEM CONTROL</span>
        </div>
        <h1 class="settings-hero-title">System & Security Preferences</h1>
        <p class="settings-hero-subtitle">Cloud database gateway, operator security passkeys, and chambers local memory diagnostics.</p>
      </div>
      <div class="settings-hero-actions">
        <button type="button" class="settings-btn settings-btn-secondary" onclick="if(typeof fetchAllDataFromSupabase==='function'){fetchAllDataFromSupabase();if(typeof updateSettingsDiagnostics==='function')updateSettingsDiagnostics();}">
          <i class="fa-solid fa-arrows-rotate"></i>
          <span>Re-Sync Cloud</span>
        </button>
        <button type="button" class="settings-btn settings-btn-secondary" id="settingsHeroThemeBtn" onclick="if(typeof toggleCaseBookTheme==='function'){toggleCaseBookTheme(event);if(typeof updateSettingsThemeLabel==='function')updateSettingsThemeLabel();}">
          <i class="fa-solid fa-circle-half-stroke" id="settingsHeroThemeIcon"></i>
          <span id="settingsHeroThemeText">Switch Theme</span>
        </button>
      </div>
    </div>
  </header>

  <!-- ==================== SETTINGS SUB-TABS NAVIGATION (MOBILE-FIRST) ==================== -->
  <div class="settings-subtabs-bar" role="tablist" aria-label="Settings sub tabs">
    <button type="button" class="settings-subtab-btn active" id="btnSettingsSubtabPref" onclick="switchSettingsSubtab('preferences')" role="tab" aria-selected="true" aria-controls="settingsSubtabPreferences">
      <svg class="lucide lucide-sliders-horizontal" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/></svg>
      <span>Preferences & Security</span>
    </button>
    <button type="button" class="settings-subtab-btn" id="btnSettingsSubtabDb" onclick="switchSettingsSubtab('db-studio')" role="tab" aria-selected="false" aria-controls="settingsSubtabDbStudio">
      <svg class="lucide lucide-database-zap" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 15 21.84"/><path d="M21 5V8"/><path d="M21 12L18 17H22L19 22"/><path d="M3 12A9 3 0 0 0 14.59 14.87"/></svg>
      <span>Database Studio (GOD Mode)</span>
      <span class="settings-subtab-badge" id="dbStudioBadgeCount">0</span>
    </button>
  </div>

  <!-- ==============================================================================
       SUB-TAB 1: PREFERENCES & SECURITY (EXISTING CONTROLS PRESERVED VERBATIM)
       ============================================================================== -->
  <div id="settingsSubtabPreferences" class="settings-subtab-pane active" role="tabpanel">

    <!-- ==================== STATS ROW (3 EXECUTIVE CARDS) ==================== -->
    <div class="settings-stats-row">
      <!-- Card 1: Cloud Gateway -->
      <div class="settings-stat-card" onclick="document.getElementById('supabaseCard')?.scrollIntoView({behavior:'smooth'})" title="Supabase Database Gateway">
        <div class="settings-stat-indicator indicator-sapphire" id="settingsGatewayIndicator"></div>
        <div class="settings-stat-top">
          <span class="settings-stat-label">Database Gateway</span>
          <div class="settings-stat-icon-box icon-sapphire" id="settingsGatewayIconBox">
            <i class="fa-solid fa-cloud-arrow-up"></i>
          </div>
        </div>
        <div class="settings-stat-value" id="settingsGatewayStatusVal">Supabase Cloud</div>
        <div class="settings-stat-meta" id="settingsGatewayMetaText">PostgreSQL Multi-Device Sync</div>
      </div>

      <!-- Card 2: Active Operator -->
      <div class="settings-stat-card" onclick="document.getElementById('adminPasswordCard')?.scrollIntoView({behavior:'smooth'})" title="Active Admin Operator">
        <div class="settings-stat-indicator indicator-amber"></div>
        <div class="settings-stat-top">
          <span class="settings-stat-label">Active Operator</span>
          <div class="settings-stat-icon-box icon-amber">
            <i class="fa-solid fa-user-shield"></i>
          </div>
        </div>
        <div class="settings-stat-value" id="settingsActiveUserVal">Admin</div>
        <div class="settings-stat-meta">PBKDF2-SHA256 Session Vault</div>
      </div>

      <!-- Card 3: Storage Scope -->
      <div class="settings-stat-card" onclick="document.getElementById('diagnosticsCard')?.scrollIntoView({behavior:'smooth'})" title="Chambers In-Memory Cache">
        <div class="settings-stat-indicator indicator-emerald"></div>
        <div class="settings-stat-top">
          <span class="settings-stat-label">Local Memory Cache</span>
          <div class="settings-stat-icon-box icon-emerald">
            <i class="fa-solid fa-database"></i>
          </div>
        </div>
        <div class="settings-stat-value" id="settingsTotalRecordsVal">-- Records</div>
        <div class="settings-stat-meta" id="settingsCacheMetaText">Zero Third-Party Telemetry</div>
      </div>
    </div>

    <!-- ==================== CARD 1: SUPABASE CLOUD DATABASE ==================== -->
    <div class="settings-card" id="supabaseCard">
      <div class="settings-card-header">
        <div class="settings-card-header-bar">
          <div class="settings-header-icon-box icon-sapphire">
            <i class="fa-solid fa-cloud"></i>
          </div>
          <div class="settings-header-title-area">
            <div class="settings-title-row">
              <h2 class="settings-card-title">Cloud Database Gateway (Supabase)</h2>
              <div id="supabaseConnBadge" class="settings-badge settings-badge-primary">
                <span id="statusDot" class="settings-live-dot"></span>
                <span id="statusText">Not Configured</span>
              </div>
            </div>
            <span class="settings-card-caption">Connect your PostgreSQL cloud database for multi-device sync and automated backups.</span>
          </div>
          <button type="button" class="settings-icon-action-btn settings-collapse-btn" onclick="toggleCollapse('supabaseContent', 'supabaseChevron')" title="Toggle section">
            <i id="supabaseChevron" class="fa-solid fa-chevron-down chevron-icon"></i>
          </button>
        </div>
      </div>

      <div id="supabaseContent" class="collapse-content">
        <div class="collapse-inner">
          <div class="settings-card-body">
            <form id="supabaseConfigForm" action="javascript:void(0);" onsubmit="return handleSaveSupabaseConfig(event);" class="settings-form">
              <div class="settings-field-group">
                <label for="supabaseProjectUrlInput" class="settings-label">
                  <span class="settings-label-left"><i class="fa-solid fa-link"></i> Project URL</span>
                  <span class="settings-label-hint">https://your-project.supabase.co</span>
                </label>
                <input type="url" id="supabaseProjectUrlInput" placeholder="https://xxxxxxxx.supabase.co" class="settings-input" autocomplete="off" spellcheck="false" required>
              </div>

              <div class="settings-field-group">
                <label for="supabaseAnonKeyInput" class="settings-label">
                  <span class="settings-label-left"><i class="fa-solid fa-key"></i> Anon / Public API Key</span>
                  <span class="settings-label-hint">JWT Key for client queries</span>
                </label>
                <div class="settings-password-wrap">
                  <input type="password" id="supabaseAnonKeyInput" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." class="settings-input settings-pwd-input" autocomplete="off" spellcheck="false" required>
                  <button type="button" class="settings-pwd-toggle-btn" onclick="togglePasswordVisibility('supabaseAnonKeyInput', this)" title="Show/Hide API Key">
                    <i class="fa-regular fa-eye"></i>
                  </button>
                </div>
              </div>

              <div class="settings-notice-box">
                <i class="fa-solid fa-shield-halved"></i>
                <span><strong>Security Guarantee:</strong> Credentials are stored exclusively in your browser's private local storage. They are never transmitted to unauthorized endpoints or logged in plain text.</span>
              </div>

              <div class="settings-actions-bar">
                <button type="button" id="disconnectBtn" onclick="handleClearSupabaseConfig()" class="settings-btn settings-btn-danger hidden">
                  <i class="fa-solid fa-link-slash"></i>
                  <span>Disconnect</span>
                </button>
                <div class="settings-actions-right">
                  <button type="button" id="testBtn" onclick="handleTestSupabaseConfig()" class="settings-btn settings-btn-secondary">
                    <i class="fa-solid fa-bolt"></i>
                    <span id="testBtnText">Test Connection</span>
                  </button>
                  <button type="submit" id="connectBtn" class="settings-btn settings-btn-primary">
                    <i id="connectIcon" class="fa-solid fa-check"></i>
                    <svg id="loadingSpinner" class="lucide lucide-loader-2 animate-spin -ml-1 mr-2 h-4 w-4 text-white hidden" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                    <span id="connectBtnText">Save & Connect</span>
                  </button>
                </div>
              </div>

              <p id="supabaseConfigStatus" class="settings-status-msg"></p>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- ==================== CARD 2: ADMIN PASSWORD ==================== -->
    <div class="settings-card" id="adminPasswordCard">
      <div class="settings-card-header">
        <div class="settings-card-header-bar">
          <div class="settings-header-icon-box icon-amber">
            <i class="fa-solid fa-lock"></i>
          </div>
          <div class="settings-header-title-area">
            <div class="settings-title-row">
              <h2 class="settings-card-title">Operator Credentials & Passkey</h2>
              <span class="settings-badge settings-badge-warning">CHAMBERS VAULT</span>
            </div>
            <span class="settings-card-caption">Manage local chambers administrator credentials, username, and cryptographic authentication salt.</span>
          </div>
          <button type="button" class="settings-icon-action-btn settings-collapse-btn" onclick="toggleCollapse('passwordContent', 'passwordChevron')" title="Toggle section">
            <i id="passwordChevron" class="fa-solid fa-chevron-down chevron-icon"></i>
          </button>
        </div>
      </div>

      <div id="passwordContent" class="collapse-content">
        <div class="collapse-inner">
          <div class="settings-card-body">
            <form id="settingsForm" action="javascript:void(0);" onsubmit="return handleChangeCredentials(event);" class="settings-form">
              
              <div class="settings-field-group">
                <label for="currentPassword" class="settings-label">
                  <span class="settings-label-left"><i class="fa-solid fa-shield-halved"></i> Current Master Password</span>
                  <span class="settings-label-hint">Required for authorization</span>
                </label>
                <div class="settings-password-wrap">
                  <input type="password" id="currentPassword" placeholder="Enter current master password" class="settings-input settings-pwd-input" required autocomplete="current-password">
                  <button type="button" class="settings-pwd-toggle-btn" onclick="togglePasswordVisibility('currentPassword', this)" title="Show/Hide Password">
                    <i class="fa-regular fa-eye"></i>
                  </button>
                </div>
              </div>

              <div class="settings-field-group">
                <label for="newUsername" class="settings-label">
                  <span class="settings-label-left"><i class="fa-solid fa-user-gear"></i> Admin Username</span>
                  <span class="settings-label-hint">Minimum 3 characters</span>
                </label>
                <input type="text" id="newUsername" value="AtulMishra" required class="settings-input" autocomplete="username">
              </div>

              <div class="settings-fields-grid">
                <div class="settings-field-group">
                  <label for="newPassword" class="settings-label">
                    <span class="settings-label-left"><i class="fa-solid fa-key"></i> New Password</span>
                    <span class="settings-label-hint">Min 8 chars, alphanumeric</span>
                  </label>
                  <div class="settings-password-wrap">
                    <input type="password" id="newPassword" placeholder="Create strong password" required minlength="8" class="settings-input settings-pwd-input" autocomplete="new-password">
                    <button type="button" class="settings-pwd-toggle-btn" onclick="togglePasswordVisibility('newPassword', this)" title="Show/Hide Password">
                      <i class="fa-regular fa-eye"></i>
                    </button>
                  </div>
                </div>

                <div class="settings-field-group">
                  <label for="confirmNewPassword" class="settings-label">
                    <span class="settings-label-left"><i class="fa-solid fa-circle-check"></i> Confirm New Password</span>
                    <span class="settings-label-hint">Must match exactly</span>
                  </label>
                  <div class="settings-password-wrap">
                    <input type="password" id="confirmNewPassword" placeholder="Re-enter new password" required minlength="8" class="settings-input settings-pwd-input" autocomplete="new-password">
                    <button type="button" class="settings-pwd-toggle-btn" onclick="togglePasswordVisibility('confirmNewPassword', this)" title="Show/Hide Password">
                      <i class="fa-regular fa-eye"></i>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Live Password Requirements Badges (Strict Rectilinear 2px Zen style) -->
              <div class="settings-req-bar">
                <span class="settings-req-item unmet" id="pwReqLen">
                  <i class="fa-solid fa-circle-dot"></i>
                  <span>8+ Characters</span>
                </span>
                <span class="settings-req-item unmet" id="pwReqAlphaNum">
                  <i class="fa-solid fa-circle-dot"></i>
                  <span>Letters & Numbers</span>
                </span>
                <span class="settings-req-item unmet" id="pwReqMatch">
                  <i class="fa-solid fa-circle-dot"></i>
                  <span>Passwords Match</span>
                </span>
              </div>

              <div class="settings-actions-bar">
                <button type="submit" class="settings-btn settings-btn-primary" style="width: 100%;">
                  <i class="fa-solid fa-floppy-disk"></i>
                  <span>Update Master Credentials</span>
                </button>
              </div>

              <p id="settingsStatus" class="settings-status-msg"></p>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- ==================== CARD 3: DIAGNOSTICS & SYSTEM CONTROLS ==================== -->
    <div class="settings-card" id="diagnosticsCard">
      <div class="settings-card-header">
        <div class="settings-card-header-bar">
          <div class="settings-header-icon-box icon-emerald">
            <i class="fa-solid fa-microchip"></i>
          </div>
          <div class="settings-header-title-area">
            <div class="settings-title-row">
              <h2 class="settings-card-title">System Diagnostics & Device Maintenance</h2>
              <span class="settings-badge settings-badge-success">OPERATIONAL</span>
            </div>
            <span class="settings-card-caption">Live chambers dataset count and memory cache maintenance utilities.</span>
          </div>
        </div>
      </div>

      <div class="settings-card-body">
        <div class="settings-diag-grid">
          <div class="settings-diag-box">
            <span class="settings-diag-num" id="settingsCasesCount">0</span>
            <span class="settings-diag-lbl">Cases in Memory</span>
          </div>
          <div class="settings-diag-box">
            <span class="settings-diag-num" id="settingsHearingsCount">0</span>
            <span class="settings-diag-lbl">Hearings in Memory</span>
          </div>
          <div class="settings-diag-box">
            <span class="settings-diag-num" id="settingsCourtsCount">0</span>
            <span class="settings-diag-lbl">Active Courts</span>
          </div>
        </div>

        <div class="settings-diag-actions">
          <button type="button" class="settings-btn settings-btn-secondary" onclick="if(typeof fetchAllDataFromSupabase==='function'){fetchAllDataFromSupabase();if(typeof updateSettingsDiagnostics==='function')updateSettingsDiagnostics();}">
            <i class="fa-solid fa-arrows-rotate"></i>
            <span>Force Cloud Re-Sync</span>
          </button>
          <button type="button" class="settings-btn settings-btn-outline" onclick="window.location.reload();">
            <i class="fa-solid fa-power-off"></i>
            <span>Hard Refresh Application</span>
          </button>
        </div>
      </div>
    </div>

  </div> <!-- End Subtab 1: Preferences & Security -->

  <!-- ==============================================================================
       SUB-TAB 2: DATABASE STUDIO (GOD MODE & SEEDER)
       ============================================================================== -->
  <div id="settingsSubtabDbStudio" class="settings-subtab-pane" role="tabpanel" style="display: none;">

    <!-- Studio HUD & Health Monitor -->
    <div class="db-studio-hud">
      <div class="db-studio-hud-top">
        <div class="db-studio-status-wrap">
          <span class="db-studio-status-pill offline" id="dbStudioStatusPill">
            <span class="db-studio-live-dot"></span>
            <span id="dbStudioStatusLabel">LOCAL OFFLINE</span>
          </span>
          <span class="db-studio-count-pill" id="dbStudioTotalCountPill">Total Records: <strong id="dbStudioTotalRecordsCount">0</strong></span>
        </div>

        <!-- Studio Quick Actions -->
        <div class="db-studio-actions-bar">
          <button type="button" class="db-studio-btn db-studio-btn-primary" onclick="openDbStudioRecordEditor(null, true)" title="Add new custom record to current table">
            <svg class="lucide lucide-plus" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
            <span>Add Record</span>
          </button>
          <button type="button" class="db-studio-btn db-studio-btn-accent" onclick="openDbStudioSeederModal()" title="Open GOD Mode Dummy Data Seeder Engine">
            <svg class="lucide lucide-sparkles" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
            <span>Seeder Engine</span>
          </button>
          <button type="button" class="db-studio-btn" onclick="reloadDbStudioData()" title="Reload from database">
            <svg class="lucide lucide-refresh-cw" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
            <span>Reload</span>
          </button>
          <button type="button" class="db-studio-btn" onclick="exportDbStudioJSON()" title="Export complete database backup as JSON">
            <svg class="lucide lucide-download" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
            <span>Export JSON</span>
          </button>
          <button type="button" class="db-studio-btn" onclick="document.getElementById('dbStudioImportInput').click()" title="Restore/Import database from JSON file">
            <svg class="lucide lucide-upload" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
            <span>Import</span>
          </button>
          <input type="file" id="dbStudioImportInput" accept=".json" style="display: none;" onchange="importDbStudioJSON(event)">
          <button type="button" class="db-studio-btn db-studio-btn-danger" onclick="purgeDummyDataOnly()" title="Safely remove only dummy records, preserving real cases">
            <svg class="lucide lucide-eraser" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/><path d="m5 11 9 9"/></svg>
            <span>Purge Dummies</span>
          </button>
        </div>
      </div>

      <!-- Real-time Filter & Search Input -->
      <div class="db-studio-search-row">
        <div class="db-studio-search-wrap">
          <span class="db-studio-search-icon-box" aria-hidden="true">
            <svg class="lucide lucide-search db-studio-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>
          </span>
          <input type="text" id="dbStudioSearchInput" class="db-studio-search-input" placeholder="Search across all fields in active table..." oninput="filterDbStudioRecords(this.value)" autocomplete="off" spellcheck="false">
          <button type="button" id="dbStudioClearSearchBtn" class="db-studio-clear-btn hidden" onclick="clearDbStudioSearch()" title="Clear search">
            <svg class="lucide lucide-x" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Collection Switcher Navigation Pills -->
    <div class="db-studio-collections-nav" id="dbColPillsContainer" role="tablist">
      <button type="button" class="db-col-pill active" data-col="cases" onclick="selectDbStudioCollection('cases')">
        <svg class="lucide lucide-briefcase" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
        <span>Cases</span>
        <span class="db-col-pill-badge" id="badgeColCases">0</span>
      </button>
      <button type="button" class="db-col-pill" data-col="hearings" onclick="selectDbStudioCollection('hearings')">
        <svg class="lucide lucide-calendar-days" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
        <span>Hearings</span>
        <span class="db-col-pill-badge" id="badgeColHearings">0</span>
      </button>
      <button type="button" class="db-col-pill" data-col="courts" onclick="selectDbStudioCollection('courts')">
        <svg class="lucide lucide-landmark" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="18"/><line x1="10" x2="10" y1="18" y2="18"/><line x1="14" x2="14" y1="18" y2="18"/><line x1="18" x2="18" y1="18" y2="18"/><polygon points="12 2 20 7 4 7"/></svg>
        <span>Courts</span>
        <span class="db-col-pill-badge" id="badgeColCourts">0</span>
      </button>
      <button type="button" class="db-col-pill" data-col="todos" onclick="selectDbStudioCollection('todos')">
        <svg class="lucide lucide-check-square" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
        <span>To-Dos</span>
        <span class="db-col-pill-badge" id="badgeColTodos">0</span>
      </button>
      <button type="button" class="db-col-pill" data-col="transfers" onclick="selectDbStudioCollection('transfers')">
        <svg class="lucide lucide-arrow-left-right" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 11 21 7 17 3"/><line x1="21" x2="9" y1="7" y2="7"/><polyline points="7 21 3 17 7 13"/><line x1="3" x2="15" y1="17" y2="17"/></svg>
        <span>Transfers</span>
        <span class="db-col-pill-badge" id="badgeColTransfers">0</span>
      </button>
      <button type="button" class="db-col-pill" data-col="paisa" onclick="selectDbStudioCollection('paisa')">
        <svg class="lucide lucide-wallet" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
        <span>Paisa Ledger</span>
        <span class="db-col-pill-badge" id="badgeColPaisa">0</span>
      </button>
      <button type="button" class="db-col-pill" data-col="storage" onclick="selectDbStudioCollection('storage')">
        <svg class="lucide lucide-hard-drive" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" x2="2" y1="12" y2="12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" x2="6.01" y1="16" y2="16"/><line x1="10" x2="10.01" y1="16" y2="16"/></svg>
        <span>LocalStorage</span>
        <span class="db-col-pill-badge" id="badgeColStorage">0</span>
      </button>
    </div>

    <!-- Secondary Filter Bar (Only active when Cases collection is selected) -->
    <div class="db-studio-subfilters" id="dbStudioCaseSubfilters">
      <button type="button" class="db-subfilter-chip active" data-type="all" onclick="filterDbStudioCasesByType('all')">All Types</button>
      <button type="button" class="db-subfilter-chip" data-type="civil" onclick="filterDbStudioCasesByType('civil')">🏛️ Civil</button>
      <button type="button" class="db-subfilter-chip" data-type="criminal" onclick="filterDbStudioCasesByType('criminal')">⚖️ Criminal / State</button>
      <button type="button" class="db-subfilter-chip" data-type="family" onclick="filterDbStudioCasesByType('family')">👨‍👩‍👧 Family</button>
      <button type="button" class="db-subfilter-chip" data-type="revenue" onclick="filterDbStudioCasesByType('revenue')">🌾 Revenue</button>
      <button type="button" class="db-subfilter-chip" data-type="misc_civil" onclick="filterDbStudioCasesByType('misc_civil')">📑 Misc Civil</button>
      <button type="button" class="db-subfilter-chip" data-type="misc_criminal" onclick="filterDbStudioCasesByType('misc_criminal')">🔒 Misc Criminal</button>
      <button type="button" class="db-subfilter-chip" data-type="complaint" onclick="filterDbStudioCasesByType('complaint')">💳 Complaint (138 NI)</button>
    </div>

    <!-- Interactive Data Grid Container -->
    <div class="db-studio-table-card">
      <div class="db-studio-table-header-bar">
        <div class="db-studio-header-title">
          <span id="dbStudioActiveTableTitle">Cases Collection</span>
          <span class="db-tag-badge" id="dbStudioFilteredCountBadge">0 records</span>
        </div>
        <div class="db-studio-bulk-actions">
          <button type="button" class="db-studio-btn" id="dbStudioBulkExportBtn" onclick="bulkExportDbStudioSelection()" style="display: none;">
            <svg class="lucide lucide-file-output" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m8 17 4 4 4-4"/></svg>
            <span>Export Selected (<span id="dbStudioSelectedCount">0</span>)</span>
          </button>
          <button type="button" class="db-studio-btn db-studio-btn-danger" id="dbStudioBulkDeleteBtn" onclick="bulkDeleteDbStudioSelection()" style="display: none;">
            <svg class="lucide lucide-trash-2" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
            <span>Delete Selected</span>
          </button>
        </div>
      </div>

      <!-- Desktop Data Grid -->
      <div class="db-studio-table-wrap">
        <table class="db-studio-table" id="dbStudioTable">
          <thead id="dbStudioTableHead">
            <!-- Dynamically populated -->
          </thead>
          <tbody id="dbStudioTableBody">
            <!-- Dynamically populated -->
          </tbody>
        </table>
      </div>

      <!-- Mobile Adaptive Card Stream (< 640px) -->
      <div class="db-studio-mobile-cards" id="dbStudioMobileCards">
        <!-- Dynamically populated on mobile -->
      </div>

      <!-- Table Footer / Pagination -->
      <div class="db-studio-table-footer">
        <div>
          Showing <span id="dbStudioPageStart">0</span> to <span id="dbStudioPageEnd">0</span> of <span id="dbStudioTotalFiltered">0</span> records
        </div>
        <div class="db-pagination-group">
          <button type="button" class="db-page-btn" id="dbStudioPrevPageBtn" onclick="changeDbStudioPage(-1)" title="Previous page">
            <svg class="lucide lucide-chevron-left" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <span style="padding: 0 4px;" id="dbStudioPageIndicator">Page 1 of 1</span>
          <button type="button" class="db-page-btn" id="dbStudioNextPageBtn" onclick="changeDbStudioPage(1)" title="Next page">
            <svg class="lucide lucide-chevron-right" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
          </button>
          <select id="dbStudioPageSizeSelect" class="db-page-btn" style="min-width: 68px; margin-left: 6px;" onchange="changeDbStudioPageSize(this.value)">
            <option value="10">10 / page</option>
            <option value="25" selected>25 / page</option>
            <option value="50">50 / page</option>
            <option value="100">100 / page</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>
    </div>

  </div> <!-- End Subtab 2: Database Studio -->

  <!-- ==============================================================================
       OVERLAY MODAL 1: UNIVERSAL RECORD EDITOR & CREATOR (FORM + RAW JSON)
       ============================================================================== -->
  <div id="dbStudioEditorModal" class="db-studio-modal-backdrop hidden" onclick="if(event.target===this)closeDbStudioEditorModal()">
    <div class="db-studio-modal-card" role="dialog" aria-modal="true" aria-labelledby="dbEditorModalTitle">
      <div class="db-studio-modal-header">
        <h3 class="db-studio-modal-title" id="dbEditorModalTitle">
          <svg class="lucide lucide-pencil" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
          <span id="dbEditorHeaderAction">Edit Record</span>
        </h3>
        <button type="button" class="settings-icon-action-btn" onclick="closeDbStudioEditorModal()" title="Close editor">
          <svg class="lucide lucide-x" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
        </button>
      </div>

      <div class="db-studio-modal-tabs">
        <button type="button" class="db-modal-tab-btn active" id="btnEditorTabForm" onclick="switchDbEditorTab('form')">Form View</button>
        <button type="button" class="db-modal-tab-btn" id="btnEditorTabJson" onclick="switchDbEditorTab('json')">Raw JSON View</button>
      </div>

      <div class="db-studio-modal-body">
        <div id="dbEditorFormContainer" class="db-studio-form-grid">
          <!-- Dynamically generated fields matching schema -->
        </div>

        <div id="dbEditorJsonContainer" style="display: none;">
          <textarea id="dbEditorJsonTextarea" class="db-raw-json-editor" spellcheck="false"></textarea>
          <span id="dbEditorJsonError" style="display: block; color: var(--st-danger); font-size: 0.75rem; margin-top: 6px;"></span>
        </div>
      </div>

      <div class="db-studio-modal-footer">
        <button type="button" class="db-studio-btn" onclick="closeDbStudioEditorModal()">Cancel</button>
        <button type="button" class="db-studio-btn db-studio-btn-primary" onclick="saveDbStudioRecord()">
          <svg class="lucide lucide-save" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
          <span>Save Changes</span>
        </button>
      </div>
    </div>
  </div>

  <!-- ==============================================================================
       OVERLAY MODAL 2: GOD MODE DUMMY SEEDER ENGINE
       ============================================================================== -->
  <div id="dbStudioSeederModal" class="db-studio-modal-backdrop hidden" onclick="if(event.target===this)closeDbStudioSeederModal()">
    <div class="db-studio-modal-card" role="dialog" aria-modal="true" aria-labelledby="dbSeederModalTitle">
      <div class="db-studio-modal-header">
        <h3 class="db-studio-modal-title" id="dbSeederModalTitle">
          <svg class="lucide lucide-sparkles" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
          <span>GOD Mode Dummy Data Seeder</span>
        </h3>
        <button type="button" class="settings-icon-action-btn" onclick="closeDbStudioSeederModal()" title="Close seeder">
          <svg class="lucide lucide-x" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
        </button>
      </div>

      <div class="db-studio-modal-body">
        <p style="font-size: 0.8125rem; color: var(--st-text-muted); margin-top: 0; margin-bottom: 14px;">
          Inject hyper-realistic Indian legal dummy cases, scheduled hearings, courts, tasks, and fee ledgers. All generated records are tagged with <span class="db-tag-dummy">[DUMMY]</span> and can be wiped anytime with 1-click.
        </p>

        <!-- 1-Click Presets -->
        <label class="db-form-label">1. One-Click Instant Presets</label>
        <div class="db-seeder-preset-cards">
          <div class="db-preset-card" onclick="runDummyPreset('supreme')">
            <span class="db-preset-card-title">
              <svg class="lucide lucide-crown" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.735H5.81a1 1 0 0 1-.957-.735L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/></svg>
              <span>Instant Supreme Pack</span>
            </span>
            <span class="db-preset-card-desc">10 multi-category cases, 15 hearings, 5 courts, 8 tasks & 8 paisa entries.</span>
          </div>

          <div class="db-preset-card" onclick="runDummyPreset('hearings')">
            <span class="db-preset-card-title">
              <svg class="lucide lucide-calendar-plus" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M10 16h4"/><path d="M12 14v4"/></svg>
              <span>Hearing Diary Blitz</span>
            </span>
            <span class="db-preset-card-desc">15 realistic hearings (Evidence, Arguments, Orders) linked to cases.</span>
          </div>

          <div class="db-preset-card" onclick="runDummyPreset('paisa')">
            <span class="db-preset-card-title">
              <svg class="lucide lucide-indian-rupee" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h12"/><path d="M6 8h12"/><path d="m6 13 8.5 8"/><path d="M6 13h3a4 4 0 0 0 0-8"/></svg>
              <span>Paisa Cashflow Demo</span>
            </span>
            <span class="db-preset-card-desc">12 diverse fee receipts & court expense ledger transactions.</span>
          </div>
        </div>

        <!-- Custom Seeder Form -->
        <label class="db-form-label" style="margin-top: 10px;">2. Custom Generator</label>
        <div class="db-studio-form-grid">
          <div>
            <label class="db-form-label">Target Collection</label>
            <select id="seederTargetCol" class="db-form-select" onchange="toggleSeederOptions(this.value)">
              <option value="cases">Cases (All Categories)</option>
              <option value="hearings">Hearings Only</option>
              <option value="courts">Courts</option>
              <option value="todos">To-Do Tasks</option>
              <option value="paisa">Paisa Transactions</option>
            </select>
          </div>

          <div>
            <label class="db-form-label">Number of Records</label>
            <select id="seederRecordCount" class="db-form-select">
              <option value="1">1 record</option>
              <option value="5" selected>5 records</option>
              <option value="10">10 records</option>
              <option value="25">25 records (Heavy)</option>
              <option value="50">50 records (Stress Test)</option>
            </select>
          </div>

          <div id="seederCaseTypeGroup">
            <label class="db-form-label">Case Category</label>
            <select id="seederCaseTypeSelect" class="db-form-select">
              <option value="mix">Mixed (Diverse Balance)</option>
              <option value="civil">Civil Suit (दीवानी)</option>
              <option value="criminal">Criminal / State (फौजदारी)</option>
              <option value="family">Family / Matrimonial (पारिवारिक)</option>
              <option value="revenue">Revenue (राजस्व)</option>
              <option value="misc_civil">Misc Civil (विविध दीवानी)</option>
              <option value="misc_criminal">Misc Criminal (जमानत / निगरानी)</option>
              <option value="complaint">Complaint (138 NI Act)</option>
            </select>
          </div>

          <div style="display: flex; align-items: center; gap: 8px; margin-top: 24px;">
            <input type="checkbox" id="seederAttachHearings" checked style="width: 18px; height: 18px; accent-color: var(--st-primary);">
            <label for="seederAttachHearings" style="font-size: 0.8125rem; font-weight: 600; cursor: pointer;">Auto-attach 2 scheduled hearings</label>
          </div>
        </div>

        <div style="margin-top: 20px; padding: 12px; background: var(--st-surface-subtle); border-radius: 6px; border: 1px solid var(--st-border);">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
            <div>
              <strong style="font-size: 0.8125rem; display: block; color: var(--st-text-main);">Safe Cleanup Guarantee</strong>
              <span style="font-size: 0.75rem; color: var(--st-text-muted);">Purging dummies removes only generated records and leaves authentic files untouched.</span>
            </div>
            <button type="button" class="db-studio-btn db-studio-btn-danger" onclick="purgeDummyDataOnly()">
              <svg class="lucide lucide-trash" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/></svg>
              <span>Wipe Dummy Data</span>
            </button>
          </div>
        </div>
      </div>

      <div class="db-studio-modal-footer">
        <button type="button" class="db-studio-btn" onclick="closeDbStudioSeederModal()">Cancel</button>
        <button type="button" class="db-studio-btn db-studio-btn-accent" onclick="runCustomDummyGenerator()">
          <svg class="lucide lucide-play" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>
          <span>Generate & Inject</span>
        </button>
      </div>
    </div>
  </div>

  <!-- ==============================================================================
       OVERLAY MODAL 3: RAW JSON INSPECTOR
       ============================================================================== -->
  <div id="dbStudioJsonModal" class="db-studio-modal-backdrop hidden" onclick="if(event.target===this)closeDbStudioJsonModal()">
    <div class="db-studio-modal-card" style="max-width: 620px;" role="dialog" aria-modal="true">
      <div class="db-studio-modal-header">
        <h3 class="db-studio-modal-title">
          <svg class="lucide lucide-code-xml" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          <span>JSON Record Inspector</span>
        </h3>
        <button type="button" class="settings-icon-action-btn" onclick="closeDbStudioJsonModal()" title="Close">
          <svg class="lucide lucide-x" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
        </button>
      </div>
      <div class="db-studio-modal-body">
        <pre id="dbStudioJsonPre" style="font-family: 'JetBrains Mono', monospace; font-size: 0.8125rem; background: var(--st-surface-subtle); padding: 14px; border-radius: 6px; border: 1px solid var(--st-border); overflow-x: auto; max-height: 400px; color: var(--st-text-main); margin: 0;"></pre>
      </div>
      <div class="db-studio-modal-footer">
        <button type="button" class="db-studio-btn" onclick="copyDbStudioJsonToClipboard()">
          <svg class="lucide lucide-copy" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
          <span>Copy JSON</span>
        </button>
        <button type="button" class="db-studio-btn db-studio-btn-primary" onclick="closeDbStudioJsonModal()">Close</button>
      </div>
    </div>
  </div>

</div>
`;

// ==============================================================================
// Settings Controller & Dynamic Token Sync (Zen Chambers Standard)
// ==============================================================================
function initSettingsTabEnhancements() {
  try {
    // 1. Password Live Validation
    const newPass = document.getElementById('newPassword');
    const confirmPass = document.getElementById('confirmNewPassword');
    const reqLen = document.getElementById('pwReqLen');
    const reqAlphaNum = document.getElementById('pwReqAlphaNum');
    const reqMatch = document.getElementById('pwReqMatch');

    function checkPasswords() {
      const p1 = newPass ? newPass.value : '';
      const p2 = confirmPass ? confirmPass.value : '';

      const lenValid = p1.length >= 8;
      const alphaNumValid = /[a-zA-Z]/.test(p1) && /[0-9]/.test(p1);
      const matchValid = p1.length > 0 && p1 === p2;

      if (reqLen) {
        reqLen.className = 'settings-req-item ' + (lenValid ? 'met' : 'unmet');
        reqLen.innerHTML = (lenValid ? '<i class="fa-solid fa-check"></i>' : '<i class="fa-solid fa-circle-dot"></i>') + ' <span>8+ Characters</span>';
      }
      if (reqAlphaNum) {
        reqAlphaNum.className = 'settings-req-item ' + (alphaNumValid ? 'met' : 'unmet');
        reqAlphaNum.innerHTML = (alphaNumValid ? '<i class="fa-solid fa-check"></i>' : '<i class="fa-solid fa-circle-dot"></i>') + ' <span>Letters & Numbers</span>';
      }
      if (reqMatch) {
        reqMatch.className = 'settings-req-item ' + (matchValid ? 'met' : 'unmet');
        reqMatch.innerHTML = (matchValid ? '<i class="fa-solid fa-check"></i>' : '<i class="fa-solid fa-circle-dot"></i>') + ' <span>Passwords Match</span>';
      }
    }

    if (newPass && !newPass._hasLiveValidator) {
      newPass.addEventListener('input', checkPasswords);
      newPass._hasLiveValidator = true;
    }
    if (confirmPass && !confirmPass._hasLiveValidator) {
      confirmPass.addEventListener('input', checkPasswords);
      confirmPass._hasLiveValidator = true;
    }

    // 2. Sync Active Operator
    const activeUser = (typeof getActiveAdminUsername === 'function') 
      ? getActiveAdminUsername() 
      : (sessionStorage.getItem('cmUser') || localStorage.getItem('cmUser') || 'Admin');
    
    const userValEl = document.getElementById('settingsActiveUserVal');
    if (userValEl) userValEl.textContent = activeUser;

    const currentAdminEl = document.getElementById('currentAdminUsername');
    if (currentAdminEl) currentAdminEl.value = activeUser;

    const newUsernameEl = document.getElementById('newUsername');
    if (newUsernameEl && !newUsernameEl.value) newUsernameEl.value = activeUser;

    // 3. Theme & Storage Diagnostics
    updateSettingsThemeLabel();
    updateSettingsDiagnostics();
    updateSettingsGatewayBadge();

    // 4. Initialize Database Studio HUD
    if (typeof initDatabaseStudio === 'function') {
      initDatabaseStudio();
    }
  } catch (err) {
    console.warn('[initSettingsTabEnhancements] Error:', err);
  }
}

function updateSettingsGatewayBadge() {
  try {
    const isConn = (typeof isConnected !== 'undefined' && isConnected) ||
                   !!(localStorage.getItem('CASEBOOK_SUPABASE_URL') && localStorage.getItem('CASEBOOK_SUPABASE_KEY'));
    
    const valEl = document.getElementById('settingsGatewayStatusVal');
    const indEl = document.getElementById('settingsGatewayIndicator');
    const boxEl = document.getElementById('settingsGatewayIconBox');
    const metaEl = document.getElementById('settingsGatewayMetaText');

    if (isConn) {
      if (valEl) valEl.textContent = 'Connected (Live)';
      if (indEl) indEl.className = 'settings-stat-indicator indicator-emerald';
      if (boxEl) boxEl.className = 'settings-stat-icon-box icon-emerald';
      if (metaEl) metaEl.textContent = 'PostgreSQL Multi-Device Synced';
    } else {
      if (valEl) valEl.textContent = 'Local Offline Mode';
      if (indEl) indEl.className = 'settings-stat-indicator indicator-sapphire';
      if (boxEl) boxEl.className = 'settings-stat-icon-box icon-sapphire';
      if (metaEl) metaEl.textContent = 'Local Browser Storage Active';
    }
  } catch (e) {}
}

function updateSettingsThemeLabel() {
  try {
    const isDark = document.documentElement.classList.contains('dark') || 
                   document.documentElement.classList.contains('theme-midnight') ||
                   document.documentElement.getAttribute('data-theme') === 'dark';
    
    const btnTextEl = document.getElementById('settingsHeroThemeText');
    const iconEl = document.getElementById('settingsHeroThemeIcon');

    if (btnTextEl) btnTextEl.textContent = isDark ? 'Light Theme' : 'Dark Theme';
    if (iconEl) {
      iconEl.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
  } catch (e) {}
}

function updateSettingsDiagnostics() {
  try {
    const casesEl = document.getElementById('settingsCasesCount');
    const hearingsEl = document.getElementById('settingsHearingsCount');
    const courtsEl = document.getElementById('settingsCourtsCount');
    const totalRecValEl = document.getElementById('settingsTotalRecordsVal');

    const casesCount = Array.isArray(window.allCaseRecords) 
      ? window.allCaseRecords.length 
      : (Array.isArray(window.cases) ? window.cases.length : 0);

    const courtsCount = Array.isArray(window.courtsList) 
      ? window.courtsList.length 
      : (Array.isArray(window.courts) ? window.courts.length : 0);

    const hearingsCount = Array.isArray(window.allHearingRecords) 
      ? window.allHearingRecords.length 
      : (Array.isArray(window.allHearings) ? window.allHearings.length : 0);

    if (casesEl) casesEl.textContent = casesCount;
    if (courtsEl) courtsEl.textContent = courtsCount;
    if (hearingsEl) hearingsEl.textContent = hearingsCount;
    
    const totalRecords = casesCount + courtsCount + hearingsCount;
    if (totalRecValEl) totalRecValEl.textContent = totalRecords + ' Cached Records';

    updateSettingsGatewayBadge();
  } catch (e) {}
}

// ==============================================================================
// DATABASE STUDIO CONTROLLER & SEEDER ENGINE (GOD MODE)
// ==============================================================================

let currentStudioCol = 'cases';
let currentCaseSubfilter = 'all';
let currentStudioSearch = '';
let currentStudioPage = 1;
let currentStudioPageSize = 25;
let currentStudioSort = { col: null, asc: true };
let selectedStudioIds = new Set();
let editingStudioRecord = null;
let editingStudioCollection = 'cases';
let editingStudioIsNew = false;

// Sub-Tab Switcher
function switchSettingsSubtab(subtabId) {
  const btnPref = document.getElementById('btnSettingsSubtabPref');
  const btnDb = document.getElementById('btnSettingsSubtabDb');
  const panePref = document.getElementById('settingsSubtabPreferences');
  const paneDb = document.getElementById('settingsSubtabDbStudio');

  if (subtabId === 'db-studio') {
    if (btnPref) { btnPref.classList.remove('active'); btnPref.setAttribute('aria-selected', 'false'); }
    if (btnDb) { btnDb.classList.add('active'); btnDb.setAttribute('aria-selected', 'true'); }
    if (panePref) panePref.style.display = 'none';
    if (paneDb) {
      paneDb.style.display = 'block';
      initDatabaseStudio();
    }
  } else {
    if (btnDb) { btnDb.classList.remove('active'); btnDb.setAttribute('aria-selected', 'false'); }
    if (btnPref) { btnPref.classList.add('active'); btnPref.setAttribute('aria-selected', 'true'); }
    if (paneDb) paneDb.style.display = 'none';
    if (panePref) panePref.style.display = 'block';
  }
}

// Master Data Fetcher helper
function getDbStudioCollectionData(col) {
  switch (col) {
    case 'cases':
      return Array.isArray(window.allCaseRecords) ? window.allCaseRecords : (Array.isArray(window.cases) ? window.cases : []);
    case 'hearings':
      return Array.isArray(window.allHearingRecords) ? window.allHearingRecords : (Array.isArray(window.allHearings) ? window.allHearings : []);
    case 'courts':
      return Array.isArray(window.courtsList) ? window.courtsList : (Array.isArray(window.courts) ? window.courts.map(c => ({ court_name: c })) : []);
    case 'todos':
      return Array.isArray(window.caseTasks) ? window.caseTasks : [];
    case 'transfers':
      return Array.isArray(window.allCaseTransfers) ? window.allCaseTransfers : [];
    case 'paisa':
      return Array.isArray(window.allPaisaTransactions) ? window.allPaisaTransactions : [];
    case 'storage': {
      const keys = [];
      try {
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          keys.push({ key: k, value: localStorage.getItem(k) });
        }
      } catch (e) {}
      return keys;
    }
    default:
      return [];
  }
}

// Initialize Database Studio
function initDatabaseStudio() {
  try {
    updateDbStudioBadges();
    selectDbStudioCollection(currentStudioCol || 'cases');
  } catch (err) {
    console.warn('[initDatabaseStudio] Error:', err);
  }
}

// Update Badges & Counts
function updateDbStudioBadges() {
  try {
    const cases = getDbStudioCollectionData('cases');
    const hearings = getDbStudioCollectionData('hearings');
    const courts = getDbStudioCollectionData('courts');
    const todos = getDbStudioCollectionData('todos');
    const transfers = getDbStudioCollectionData('transfers');
    const paisa = getDbStudioCollectionData('paisa');
    const storage = getDbStudioCollectionData('storage');

    const totalCount = cases.length + hearings.length + courts.length + todos.length + transfers.length + paisa.length;

    const bTotal = document.getElementById('dbStudioTotalRecordsCount');
    const bSubtab = document.getElementById('dbStudioBadgeCount');
    const bCases = document.getElementById('badgeColCases');
    const bHearings = document.getElementById('badgeColHearings');
    const bCourts = document.getElementById('badgeColCourts');
    const bTodos = document.getElementById('badgeColTodos');
    const bTransfers = document.getElementById('badgeColTransfers');
    const bPaisa = document.getElementById('badgeColPaisa');
    const bStorage = document.getElementById('badgeColStorage');

    if (bTotal) bTotal.textContent = totalCount;
    if (bSubtab) bSubtab.textContent = totalCount;
    if (bCases) bCases.textContent = cases.length;
    if (bHearings) bHearings.textContent = hearings.length;
    if (bCourts) bCourts.textContent = courts.length;
    if (bTodos) bTodos.textContent = todos.length;
    if (bTransfers) bTransfers.textContent = transfers.length;
    if (bPaisa) bPaisa.textContent = paisa.length;
    if (bStorage) bStorage.textContent = storage.length;

    // Status pill
    const isConn = (typeof isConnected !== 'undefined' && isConnected) ||
                   !!(localStorage.getItem('CASEBOOK_SUPABASE_URL') && localStorage.getItem('CASEBOOK_SUPABASE_KEY'));
    const statusPill = document.getElementById('dbStudioStatusPill');
    const statusLbl = document.getElementById('dbStudioStatusLabel');
    if (statusPill && statusLbl) {
      if (isConn) {
        statusPill.className = 'db-studio-status-pill live';
        statusLbl.textContent = 'SUPABASE CLOUD LIVE';
      } else {
        statusPill.className = 'db-studio-status-pill offline';
        statusLbl.textContent = 'LOCAL OFFLINE';
      }
    }
  } catch (e) {}
}

// Select Active Collection
function selectDbStudioCollection(colKey) {
  currentStudioCol = colKey;
  currentStudioPage = 1;
  selectedStudioIds.clear();
  updateDbStudioBulkButtons();

  // Highlight pill
  document.querySelectorAll('.db-col-pill').forEach(btn => {
    if (btn.getAttribute('data-col') === colKey) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Toggle case subfilter row
  const caseSubfilters = document.getElementById('dbStudioCaseSubfilters');
  if (caseSubfilters) {
    caseSubfilters.style.display = colKey === 'cases' ? 'flex' : 'none';
  }

  // Update header title
  const titles = {
    cases: 'Cases Collection',
    hearings: 'Court Hearing Diary Records',
    courts: 'Active Court Jurisdictions',
    todos: 'Chamber Action Tasks & Steps',
    transfers: 'Case Court Transfers Ledger',
    paisa: 'Paisa Financial Cashbook Ledger',
    storage: 'Local Browser Storage Keys'
  };
  const titleEl = document.getElementById('dbStudioActiveTableTitle');
  if (titleEl) titleEl.textContent = titles[colKey] || colKey;

  renderDbStudioTable();
}

function filterDbStudioCasesByType(type) {
  currentCaseSubfilter = type;
  currentStudioPage = 1;
  document.querySelectorAll('.db-subfilter-chip').forEach(c => {
    c.classList.toggle('active', c.getAttribute('data-type') === type);
  });
  renderDbStudioTable();
}

function filterDbStudioRecords(val) {
  currentStudioSearch = (val || '').trim().toLowerCase();
  currentStudioPage = 1;
  const clearBtn = document.getElementById('dbStudioClearSearchBtn');
  if (clearBtn) clearBtn.classList.toggle('hidden', !currentStudioSearch);
  renderDbStudioTable();
}

function clearDbStudioSearch() {
  const input = document.getElementById('dbStudioSearchInput');
  if (input) input.value = '';
  filterDbStudioRecords('');
}

// Check if a record is tagged as Dummy
function isDummyRecord(item) {
  if (!item) return false;
  if (item._is_dummy || item.is_dummy || item.isDummy) return true;
  const str = JSON.stringify(item).toLowerCase();
  return str.includes('[dummy]') || str.includes('is_dummy') || (item.remarks && String(item.remarks).includes('[DUMMY]'));
}

// Main Table Renderer (Responsive Desktop Table + Mobile Cards)
function renderDbStudioTable() {
  const rawList = getDbStudioCollectionData(currentStudioCol);

  // 1. Filter
  let filtered = rawList.filter(item => {
    // Case type filter
    if (currentStudioCol === 'cases' && currentCaseSubfilter !== 'all') {
      const cType = String(item.caseType || item.case_type || 'civil').toLowerCase();
      if (currentCaseSubfilter === 'criminal') {
        if (!cType.includes('crim') && !cType.includes('state')) return false;
      } else if (!cType.includes(currentCaseSubfilter)) {
        return false;
      }
    }

    // Search query
    if (currentStudioSearch) {
      const text = JSON.stringify(item).toLowerCase();
      return text.includes(currentStudioSearch);
    }
    return true;
  });

  // 2. Sort
  if (currentStudioSort.col) {
    const { col, asc } = currentStudioSort;
    filtered.sort((a, b) => {
      const va = a[col] != null ? a[col] : '';
      const vb = b[col] != null ? b[col] : '';
      if (typeof va === 'number' && typeof vb === 'number') {
        return asc ? va - vb : vb - va;
      }
      return asc ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va));
    });
  }

  // 3. Pagination
  const total = filtered.length;
  const pageSize = currentStudioPageSize === 'all' ? total : parseInt(currentStudioPageSize, 10);
  const maxPage = Math.max(1, Math.ceil(total / (pageSize || 1)));
  currentStudioPage = Math.min(Math.max(1, currentStudioPage), maxPage);

  const startIdx = (currentStudioPage - 1) * pageSize;
  const endIdx = pageSize === total ? total : Math.min(startIdx + pageSize, total);
  const pageItems = filtered.slice(startIdx, endIdx);

  // Update indicators
  const badgeEl = document.getElementById('dbStudioFilteredCountBadge');
  if (badgeEl) badgeEl.textContent = `${total} records`;

  const pStart = document.getElementById('dbStudioPageStart');
  const pEnd = document.getElementById('dbStudioPageEnd');
  const pTotal = document.getElementById('dbStudioTotalFiltered');
  const pInd = document.getElementById('dbStudioPageIndicator');
  if (pStart) pStart.textContent = total > 0 ? startIdx + 1 : 0;
  if (pEnd) pEnd.textContent = endIdx;
  if (pTotal) pTotal.textContent = total;
  if (pInd) pInd.textContent = `Page ${currentStudioPage} of ${maxPage}`;

  const prevBtn = document.getElementById('dbStudioPrevPageBtn');
  const nextBtn = document.getElementById('dbStudioNextPageBtn');
  if (prevBtn) prevBtn.disabled = currentStudioPage <= 1;
  if (nextBtn) nextBtn.disabled = currentStudioPage >= maxPage;

  // Build Desktop Table Head & Body
  const thead = document.getElementById('dbStudioTableHead');
  const tbody = document.getElementById('dbStudioTableBody');
  const mobileContainer = document.getElementById('dbStudioMobileCards');

  if (!thead || !tbody || !mobileContainer) return;

  // Columns per collection
  let cols = [];
  if (currentStudioCol === 'cases') {
    cols = [
      { key: 'caseNo', label: 'Case Number' },
      { key: 'caseType', label: 'Category' },
      { key: 'caseName', label: 'Parties / Title' },
      { key: 'courtName', label: 'Court' },
      { key: 'nextHearing', label: 'Next Hearing' },
      { key: 'caseStatus', label: 'Status' }
    ];
  } else if (currentStudioCol === 'hearings') {
    cols = [
      { key: 'case_number', label: 'Case Number' },
      { key: 'hearing_date', label: 'Hearing Date' },
      { key: 'hearing_process', label: 'Stage / Process' },
      { key: 'action_taken', label: 'Action Taken' },
      { key: 'court_name', label: 'Court Room' }
    ];
  } else if (currentStudioCol === 'courts') {
    cols = [
      { key: 'court_name', label: 'Court Name' },
      { key: 'short_code', label: 'Code' },
      { key: 'cadre', label: 'Cadre' },
      { key: 'status', label: 'Status' }
    ];
  } else if (currentStudioCol === 'todos') {
    cols = [
      { key: 'caseNo', label: 'Case' },
      { key: 'taskTitle', label: 'Task Title' },
      { key: 'deadlineDate', label: 'Deadline' },
      { key: 'priority', label: 'Priority' },
      { key: 'status', label: 'Status' }
    ];
  } else if (currentStudioCol === 'transfers') {
    cols = [
      { key: 'case_number', label: 'Case Number' },
      { key: 'from_court', label: 'From Court' },
      { key: 'to_court', label: 'To Court' },
      { key: 'transfer_date', label: 'Date' }
    ];
  } else if (currentStudioCol === 'paisa') {
    cols = [
      { key: 'txn_date', label: 'Date' },
      { key: 'type', label: 'Type' },
      { key: 'amount', label: 'Amount' },
      { key: 'party_name', label: 'Party' },
      { key: 'category', label: 'Category' }
    ];
  } else if (currentStudioCol === 'storage') {
    cols = [
      { key: 'key', label: 'Storage Key' },
      { key: 'value', label: 'Value Preview' }
    ];
  }

  // Render <thead>
  const allSelected = pageItems.length > 0 && pageItems.every(i => selectedStudioIds.has(getRecordKey(i)));
  let thHtml = '<tr><th style="width: 40px; text-align: center;"><input type="checkbox" ' + (allSelected ? 'checked' : '') + ' onchange="toggleDbStudioSelectAll(this.checked)" style="accent-color: var(--st-primary); width: 16px; height: 16px;"></th>';
  cols.forEach(c => {
    thHtml += `<th class="sortable" onclick="sortDbStudioBy('${c.key}')">${c.label}</th>`;
  });
  thHtml += '<th style="text-align: right; width: 120px;">Actions</th></tr>';
  thead.innerHTML = thHtml;

  // Render <tbody> and Mobile Cards
  if (pageItems.length === 0) {
    tbody.innerHTML = `<tr><td colspan="${cols.length + 2}" style="text-align: center; padding: 32px; color: var(--st-text-muted);">No records found matching current criteria.</td></tr>`;
    mobileContainer.innerHTML = `<div style="text-align: center; padding: 24px; color: var(--st-text-muted);">No records found.</div>`;
    return;
  }

  let tbHtml = '';
  let mobHtml = '';

  pageItems.forEach((item, idx) => {
    const key = getRecordKey(item) || `idx_${startIdx + idx}`;
    const isSelected = selectedStudioIds.has(key);
    const isDummy = isDummyRecord(item);

    // Desktop Row
    tbHtml += `<tr class="${isDummy ? 'is-dummy-row' : ''}">`;
    tbHtml += `<td style="text-align: center;"><input type="checkbox" ${isSelected ? 'checked' : ''} onchange="toggleDbStudioRowSelect('${escapeQuotes(key)}', this.checked)" style="accent-color: var(--st-primary); width: 16px; height: 16px;"></td>`;

    cols.forEach(c => {
      let val = item[c.key];
      if (val == null) {
        // Fallbacks for mismatched property names
        if (c.key === 'caseNo') val = item.case_number || item.criminalCaseNumber || '—';
        else if (c.key === 'caseName') val = item.case_title || item.party_name || '—';
        else if (c.key === 'caseType') val = item.case_type || 'civil';
        else if (c.key === 'courtName') val = item.court_name || '—';
        else if (c.key === 'nextHearing') val = item.next_hearing || '—';
        else if (c.key === 'caseStatus') val = item.case_status || item.status || 'Active';
        else val = '—';
      }

      let renderedVal = String(val);
      if (renderedVal.length > 40) renderedVal = renderedVal.slice(0, 37) + '...';

      if (c.key === 'caseNo' && isDummy) {
        renderedVal = `<span class="db-tag-dummy">DUMMY</span> <strong>${renderedVal}</strong>`;
      } else if (c.key === 'caseStatus' || c.key === 'status') {
        const isAct = String(val).toLowerCase().includes('active') || String(val).toLowerCase().includes('pending');
        renderedVal = `<span class="db-tag-badge ${isAct ? 'badge-active' : 'badge-disposed'}">${renderedVal}</span>`;
      } else if (c.key === 'amount') {
        renderedVal = `₹${Number(val || 0).toLocaleString('en-IN')}`;
      }

      tbHtml += `<td>${renderedVal}</td>`;
    });

    // Row Actions
    tbHtml += `<td style="text-align: right;">
      <div class="db-row-actions">
        <button type="button" class="db-row-btn" onclick="openDbStudioRecordEditor('${escapeQuotes(key)}', false)" title="Edit Record">
          <svg class="lucide lucide-pencil" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
        </button>
        <button type="button" class="db-row-btn" onclick="inspectDbStudioJson('${escapeQuotes(key)}')" title="View JSON">
          <svg class="lucide lucide-code-xml" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
        </button>
        <button type="button" class="db-row-btn db-row-btn-danger" onclick="deleteDbStudioRecord('${escapeQuotes(key)}')" title="Delete Record">
          <svg class="lucide lucide-trash-2" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/></svg>
        </button>
      </div>
    </td></tr>`;

    // Mobile Card
    const cardTitle = item.caseNo || item.case_number || item.taskTitle || item.court_name || item.key || 'Record';
    const cardSubtitle = item.caseName || item.party_name || item.hearing_process || item.value || '';
    mobHtml += `<div class="db-mobile-card ${isDummy ? 'is-dummy' : ''}">
      <div class="db-mobile-card-top">
        <div class="db-mobile-card-title">
          ${isDummy ? '<span class="db-tag-dummy">DUMMY</span> ' : ''}
          ${escapeHtml(cardTitle)}
        </div>
        <input type="checkbox" ${isSelected ? 'checked' : ''} onchange="toggleDbStudioRowSelect('${escapeQuotes(key)}', this.checked)" style="accent-color: var(--st-primary); width: 18px; height: 18px;">
      </div>
      <div class="db-mobile-card-meta">${escapeHtml(cardSubtitle)}</div>
      <div class="db-mobile-card-actions">
        <button type="button" class="db-studio-btn" onclick="openDbStudioRecordEditor('${escapeQuotes(key)}', false)">
          <svg class="lucide lucide-pencil" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
          <span>Edit</span>
        </button>
        <button type="button" class="db-studio-btn" onclick="inspectDbStudioJson('${escapeQuotes(key)}')">
          <svg class="lucide lucide-code-xml" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          <span>JSON</span>
        </button>
        <button type="button" class="db-studio-btn db-studio-btn-danger" onclick="deleteDbStudioRecord('${escapeQuotes(key)}')">
          <svg class="lucide lucide-trash-2" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/></svg>
        </button>
      </div>
    </div>`;
  });

  tbody.innerHTML = tbHtml;
  mobileContainer.innerHTML = mobHtml;
}

function getRecordKey(item) {
  if (!item) return '';
  if (item.id != null) return String(item.id);
  if (item.key != null) return String(item.key);
  if (item.caseNo != null) return String(item.caseNo);
  if (item.case_number != null) return String(item.case_number);
  if (item.court_name != null) return String(item.court_name);
  return JSON.stringify(item);
}

function sortDbStudioBy(colName) {
  if (currentStudioSort.col === colName) {
    currentStudioSort.asc = !currentStudioSort.asc;
  } else {
    currentStudioSort.col = colName;
    currentStudioSort.asc = true;
  }
  renderDbStudioTable();
}

function changeDbStudioPage(delta) {
  currentStudioPage += delta;
  renderDbStudioTable();
}

function changeDbStudioPageSize(val) {
  currentStudioPageSize = val;
  currentStudioPage = 1;
  renderDbStudioTable();
}

function toggleDbStudioSelectAll(checked) {
  const items = getDbStudioCollectionData(currentStudioCol);
  if (checked) {
    items.forEach(i => selectedStudioIds.add(getRecordKey(i)));
  } else {
    selectedStudioIds.clear();
  }
  updateDbStudioBulkButtons();
  renderDbStudioTable();
}

function toggleDbStudioRowSelect(key, checked) {
  if (checked) {
    selectedStudioIds.add(key);
  } else {
    selectedStudioIds.delete(key);
  }
  updateDbStudioBulkButtons();
  renderDbStudioTable();
}

function updateDbStudioBulkButtons() {
  const count = selectedStudioIds.size;
  const countSpan = document.getElementById('dbStudioSelectedCount');
  const exportBtn = document.getElementById('dbStudioBulkExportBtn');
  const deleteBtn = document.getElementById('dbStudioBulkDeleteBtn');

  if (countSpan) countSpan.textContent = count;
  if (exportBtn) exportBtn.style.display = count > 0 ? 'inline-flex' : 'none';
  if (deleteBtn) deleteBtn.style.display = count > 0 ? 'inline-flex' : 'none';
}

// ==============================================================================
// UNIVERSAL RECORD EDITOR (FORM + RAW JSON)
// ==============================================================================

function openDbStudioRecordEditor(recordKey, isNew) {
  editingStudioIsNew = !!isNew;
  editingStudioCollection = currentStudioCol;

  const modal = document.getElementById('dbStudioEditorModal');
  const titleEl = document.getElementById('dbEditorHeaderAction');
  if (titleEl) titleEl.textContent = isNew ? `Add New Record (${currentStudioCol})` : `Edit Record (${currentStudioCol})`;

  let record = null;
  if (!isNew && recordKey) {
    const list = getDbStudioCollectionData(currentStudioCol);
    record = list.find(i => getRecordKey(i) === recordKey);
  }
  editingStudioRecord = record || {};

  renderDbStudioEditorForm(editingStudioRecord);
  switchDbEditorTab('form');

  if (modal) modal.classList.remove('hidden');
}

function closeDbStudioEditorModal() {
  const modal = document.getElementById('dbStudioEditorModal');
  if (modal) modal.classList.add('hidden');
  editingStudioRecord = null;
}

function switchDbEditorTab(tab) {
  const btnForm = document.getElementById('btnEditorTabForm');
  const btnJson = document.getElementById('btnEditorTabJson');
  const formBox = document.getElementById('dbEditorFormContainer');
  const jsonBox = document.getElementById('dbEditorJsonContainer');
  const textarea = document.getElementById('dbEditorJsonTextarea');
  const errSpan = document.getElementById('dbEditorJsonError');

  if (errSpan) errSpan.textContent = '';

  if (tab === 'json') {
    if (btnForm) btnForm.classList.remove('active');
    if (btnJson) btnJson.classList.add('active');
    if (formBox) formBox.style.display = 'none';
    if (jsonBox) jsonBox.style.display = 'block';

    // Populate JSON from current form inputs
    syncFormInputsToRecord();
    if (textarea) textarea.value = JSON.stringify(editingStudioRecord, null, 2);
  } else {
    // Sync JSON back to form if valid
    if (textarea && textarea.value) {
      try {
        editingStudioRecord = JSON.parse(textarea.value);
        renderDbStudioEditorForm(editingStudioRecord);
      } catch (e) {
        if (errSpan) errSpan.textContent = 'Invalid JSON: ' + e.message;
        return;
      }
    }
    if (btnJson) btnJson.classList.remove('active');
    if (btnForm) btnForm.classList.add('active');
    if (jsonBox) jsonBox.style.display = 'none';
    if (formBox) formBox.style.display = 'grid';
  }
}

function renderDbStudioEditorForm(record) {
  const container = document.getElementById('dbEditorFormContainer');
  if (!container) return;

  let fields = [];
  if (editingStudioCollection === 'cases') {
    fields = [
      { key: 'caseNo', label: 'Case Number', type: 'text', val: record.caseNo || record.case_number || '' },
      { key: 'caseType', label: 'Case Category', type: 'select', options: ['civil', 'criminal', 'family', 'revenue', 'misc_civil', 'misc_criminal', 'complaint'], val: record.caseType || record.case_type || 'civil' },
      { key: 'caseName', label: 'Parties / Title', type: 'text', val: record.caseName || record.case_title || '', full: true },
      { key: 'clientName', label: 'Client Name', type: 'text', val: record.clientName || record.client_name || '' },
      { key: 'courtName', label: 'Court Name', type: 'text', val: record.courtName || record.court_name || '' },
      { key: 'filingDate', label: 'Filing Date', type: 'date', val: record.filingDate || record.filing_date || '' },
      { key: 'nextHearing', label: 'Next Hearing Date', type: 'date', val: record.nextHearing || record.next_hearing || '' },
      { key: 'hearingProcess', label: 'Stage / Process', type: 'text', val: record.hearingProcess || record.hearing_process || '' },
      { key: 'caseStatus', label: 'Case Status', type: 'select', options: ['Active', 'Disposed', 'Stay', 'Pending', 'Decided'], val: record.caseStatus || record.case_status || 'Active' },
      { key: 'remarks', label: 'Remarks / Notes', type: 'textarea', val: record.remarks || '', full: true }
    ];
  } else if (editingStudioCollection === 'hearings') {
    fields = [
      { key: 'case_number', label: 'Case Number', type: 'text', val: record.case_number || '' },
      { key: 'hearing_date', label: 'Hearing Date', type: 'date', val: record.hearing_date || '' },
      { key: 'next_hearing_date', label: 'Next Hearing Date', type: 'date', val: record.next_hearing_date || '' },
      { key: 'hearing_process', label: 'Hearing Process / Stage', type: 'text', val: record.hearing_process || '' },
      { key: 'action_taken', label: 'Action Taken', type: 'textarea', val: record.action_taken || '', full: true },
      { key: 'court_name', label: 'Court Name', type: 'text', val: record.court_name || '' }
    ];
  } else if (editingStudioCollection === 'courts') {
    fields = [
      { key: 'court_name', label: 'Court Name', type: 'text', val: record.court_name || '', full: true },
      { key: 'short_code', label: 'Short Code', type: 'text', val: record.short_code || '' },
      { key: 'civil_title', label: 'Civil Title', type: 'text', val: record.civil_title || '' },
      { key: 'criminal_title', label: 'Criminal Title', type: 'text', val: record.criminal_title || '' },
      { key: 'cadre', label: 'Cadre', type: 'text', val: record.cadre || 'General' },
      { key: 'status', label: 'Status', type: 'select', options: ['ACTIVE', 'INACTIVE'], val: record.status || 'ACTIVE' }
    ];
  } else if (editingStudioCollection === 'todos') {
    fields = [
      { key: 'caseNo', label: 'Case Number', type: 'text', val: record.caseNo || record.case_number || '' },
      { key: 'taskTitle', label: 'Task Title', type: 'text', val: record.taskTitle || '', full: true },
      { key: 'deadlineDate', label: 'Deadline Date', type: 'date', val: record.deadlineDate || '' },
      { key: 'priority', label: 'Priority', type: 'select', options: ['high', 'medium', 'low'], val: record.priority || 'medium' },
      { key: 'status', label: 'Status', type: 'select', options: ['pending', 'completed'], val: record.status || 'pending' }
    ];
  } else if (editingStudioCollection === 'paisa') {
    fields = [
      { key: 'txn_date', label: 'Transaction Date', type: 'date', val: record.txn_date || '' },
      { key: 'type', label: 'Type', type: 'select', options: ['income', 'expense'], val: record.type || 'income' },
      { key: 'amount', label: 'Amount (₹)', type: 'number', val: record.amount || 0 },
      { key: 'party_name', label: 'Client / Party', type: 'text', val: record.party_name || '' },
      { key: 'category', label: 'Category', type: 'text', val: record.category || 'Professional Fee' },
      { key: 'description', label: 'Description', type: 'textarea', val: record.description || '', full: true }
    ];
  } else if (editingStudioCollection === 'storage') {
    fields = [
      { key: 'key', label: 'Key', type: 'text', val: record.key || '' },
      { key: 'value', label: 'Raw Storage Value', type: 'textarea', val: record.value || '', full: true }
    ];
  }

  let html = '';
  fields.forEach(f => {
    html += `<div class="${f.full ? 'full-span' : ''}">`;
    html += `<label class="db-form-label">${f.label}</label>`;
    if (f.type === 'select') {
      html += `<select class="db-form-select" data-field="${f.key}">`;
      f.options.forEach(opt => {
        html += `<option value="${opt}" ${String(f.val).toLowerCase() === opt.toLowerCase() ? 'selected' : ''}>${opt}</option>`;
      });
      html += `</select>`;
    } else if (f.type === 'textarea') {
      html += `<textarea class="db-form-textarea" data-field="${f.key}">${escapeHtml(f.val)}</textarea>`;
    } else {
      html += `<input type="${f.type}" class="db-form-input" data-field="${f.key}" value="${escapeHtml(f.val)}">`;
    }
    html += `</div>`;
  });

  container.innerHTML = html;
}

function syncFormInputsToRecord() {
  const container = document.getElementById('dbEditorFormContainer');
  if (!container || !editingStudioRecord) return;
  const inputs = container.querySelectorAll('[data-field]');
  inputs.forEach(inp => {
    const key = inp.getAttribute('data-field');
    editingStudioRecord[key] = inp.value;
  });
}

// Save Changes
function saveDbStudioRecord() {
  const btnJson = document.getElementById('btnEditorTabJson');
  const isJsonView = btnJson && btnJson.classList.contains('active');

  if (isJsonView) {
    const textarea = document.getElementById('dbEditorJsonTextarea');
    try {
      editingStudioRecord = JSON.parse(textarea.value);
    } catch (e) {
      alert('Cannot save: Invalid JSON syntax.');
      return;
    }
  } else {
    syncFormInputsToRecord();
  }

  if (editingStudioCollection === 'storage') {
    if (editingStudioRecord.key) {
      try {
        localStorage.setItem(editingStudioRecord.key, editingStudioRecord.value);
      } catch (e) {}
    }
    closeDbStudioEditorModal();
    renderDbStudioTable();
    updateDbStudioBadges();
    return;
  }

  // Save to target collection
  const list = getDbStudioCollectionData(editingStudioCollection);
  if (editingStudioIsNew) {
    if (!editingStudioRecord.id) {
      editingStudioRecord.id = 'gen_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
    }
    list.unshift(editingStudioRecord);
  } else {
    const key = getRecordKey(editingStudioRecord);
    const idx = list.findIndex(i => getRecordKey(i) === key);
    if (idx !== -1) {
      list[idx] = Object.assign({}, list[idx], editingStudioRecord);
    } else {
      list.unshift(editingStudioRecord);
    }
  }

  // Backup to localStorage
  persistDbStudioCollection(editingStudioCollection, list);

  // Sync with cloud if connected
  syncRecordToSupabase(editingStudioCollection, editingStudioRecord);

  // Dispatch events
  if (typeof window.dispatchEvent === 'function') {
    window.dispatchEvent(new CustomEvent('casebook:data-synced'));
  }

  closeDbStudioEditorModal();
  updateDbStudioBadges();
  renderDbStudioTable();
}

// Delete Record
function deleteDbStudioRecord(recordKey) {
  if (!confirm(`Are you sure you want to delete this record (${recordKey})?`)) return;

  if (currentStudioCol === 'storage') {
    try { localStorage.removeItem(recordKey); } catch (e) {}
    renderDbStudioTable();
    updateDbStudioBadges();
    return;
  }

  const list = getDbStudioCollectionData(currentStudioCol);
  const idx = list.findIndex(i => getRecordKey(i) === recordKey);
  if (idx !== -1) {
    const removed = list.splice(idx, 1)[0];
    persistDbStudioCollection(currentStudioCol, list);

    // Delete in Supabase
    deleteRecordFromSupabase(currentStudioCol, removed);
  }

  selectedStudioIds.delete(recordKey);
  updateDbStudioBulkButtons();
  updateDbStudioBadges();
  renderDbStudioTable();

  if (typeof window.dispatchEvent === 'function') {
    window.dispatchEvent(new CustomEvent('casebook:data-synced'));
  }
}

// Bulk Delete
function bulkDeleteDbStudioSelection() {
  const count = selectedStudioIds.size;
  if (count === 0) return;
  if (!confirm(`Are you sure you want to delete ${count} selected records?`)) return;

  const list = getDbStudioCollectionData(currentStudioCol);
  const remaining = list.filter(item => !selectedStudioIds.has(getRecordKey(item)));

  if (currentStudioCol === 'cases') window.allCaseRecords = remaining;
  else if (currentStudioCol === 'hearings') window.allHearingRecords = remaining;
  else if (currentStudioCol === 'courts') window.courtsList = remaining;
  else if (currentStudioCol === 'todos') window.caseTasks = remaining;
  else if (currentStudioCol === 'transfers') window.allCaseTransfers = remaining;
  else if (currentStudioCol === 'paisa') window.allPaisaTransactions = remaining;

  persistDbStudioCollection(currentStudioCol, remaining);

  selectedStudioIds.clear();
  updateDbStudioBulkButtons();
  updateDbStudioBadges();
  renderDbStudioTable();

  if (typeof window.dispatchEvent === 'function') {
    window.dispatchEvent(new CustomEvent('casebook:data-synced'));
  }
}

// Bulk Export
function bulkExportDbStudioSelection() {
  const list = getDbStudioCollectionData(currentStudioCol);
  const selected = list.filter(item => selectedStudioIds.has(getRecordKey(item)));
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(selected, null, 2));
  const dl = document.createElement('a');
  dl.setAttribute('href', dataStr);
  dl.setAttribute('download', `casebook_${currentStudioCol}_selection.json`);
  dl.click();
}

function persistDbStudioCollection(col, list) {
  try {
    if (col === 'cases') {
      window.allCaseRecords = list;
      window.cases = list;
      localStorage.setItem('allCaseRecords', JSON.stringify(list));
      localStorage.setItem('cases_backup', JSON.stringify(list));
    } else if (col === 'hearings') {
      window.allHearingRecords = list;
      window.allHearings = list;
      localStorage.setItem('allHearingRecords', JSON.stringify(list));
    } else if (col === 'courts') {
      window.courtsList = list;
      window.courts = list.map(c => c.court_name);
      localStorage.setItem('courts_backup', JSON.stringify(list));
    } else if (col === 'todos') {
      window.caseTasks = list;
      localStorage.setItem('case_todos_backup', JSON.stringify(list));
    } else if (col === 'transfers') {
      window.allCaseTransfers = list;
      localStorage.setItem('case_transfers_backup', JSON.stringify(list));
    } else if (col === 'paisa') {
      window.allPaisaTransactions = list;
      localStorage.setItem('paisa_transactions_backup', JSON.stringify(list));
    }
  } catch (e) {}
}

function syncRecordToSupabase(col, record) {
  if (typeof window !== 'undefined' && window.supabaseClient && window.isSupabaseConfigured) {
    try {
      const sb = window.supabaseClient;
      if (col === 'hearings') {
        sb.from('hearings').upsert([record]).then(() => {}).catch(() => {});
      } else if (col === 'courts') {
        sb.from('courts').upsert([record]).then(() => {}).catch(() => {});
      } else if (col === 'todos') {
        sb.from('case_todos').upsert([record]).then(() => {}).catch(() => {});
      }
    } catch (e) {}
  }
}

function deleteRecordFromSupabase(col, record) {
  if (typeof window !== 'undefined' && window.supabaseClient && window.isSupabaseConfigured) {
    try {
      const sb = window.supabaseClient;
      if (col === 'hearings' && record.id) {
        sb.from('hearings').delete().eq('id', record.id).then(() => {}).catch(() => {});
      } else if (col === 'courts' && record.id) {
        sb.from('courts').delete().eq('id', record.id).then(() => {}).catch(() => {});
      } else if (col === 'todos' && record.id) {
        sb.from('case_todos').delete().eq('id', record.id).then(() => {}).catch(() => {});
      }
    } catch (e) {}
  }
}

// JSON Inspector Modal
function inspectDbStudioJson(recordKey) {
  const list = getDbStudioCollectionData(currentStudioCol);
  const record = list.find(i => getRecordKey(i) === recordKey);
  const modal = document.getElementById('dbStudioJsonModal');
  const pre = document.getElementById('dbStudioJsonPre');
  if (pre) pre.textContent = JSON.stringify(record || {}, null, 2);
  if (modal) modal.classList.remove('hidden');
}

function closeDbStudioJsonModal() {
  const modal = document.getElementById('dbStudioJsonModal');
  if (modal) modal.classList.add('hidden');
}

function copyDbStudioJsonToClipboard() {
  const pre = document.getElementById('dbStudioJsonPre');
  if (pre && navigator.clipboard) {
    navigator.clipboard.writeText(pre.textContent).then(() => {
      alert('JSON copied to clipboard!');
    });
  }
}

// ==============================================================================
// GOD MODE DUMMY DATA SEEDER ENGINE
// ==============================================================================

function openDbStudioSeederModal() {
  const modal = document.getElementById('dbStudioSeederModal');
  if (modal) modal.classList.remove('hidden');
}

function closeDbStudioSeederModal() {
  const modal = document.getElementById('dbStudioSeederModal');
  if (modal) modal.classList.add('hidden');
}

function toggleSeederOptions(targetCol) {
  const caseTypeGroup = document.getElementById('seederCaseTypeGroup');
  if (caseTypeGroup) {
    caseTypeGroup.style.display = targetCol === 'cases' ? 'block' : 'none';
  }
}

// 1-Click Presets
function runDummyPreset(presetKey) {
  if (presetKey === 'supreme') {
    const cases = generateIndianLegalCases(10, 'mix');
    const hearings = generateIndianLegalHearings(15, cases);
    const paisa = generateDummyPaisaTxns(8);

    injectRecords('cases', cases);
    injectRecords('hearings', hearings);
    injectRecords('paisa', paisa);

    alert('Supreme Chambers Pack: 10 cases, 15 hearings, and 8 paisa transactions injected successfully!');
  } else if (presetKey === 'hearings') {
    const existingCases = getDbStudioCollectionData('cases');
    const hearings = generateIndianLegalHearings(15, existingCases);
    injectRecords('hearings', hearings);
    alert('15 scheduled hearings injected successfully!');
  } else if (presetKey === 'paisa') {
    const paisa = generateDummyPaisaTxns(12);
    injectRecords('paisa', paisa);
    alert('12 fee receipts & expense entries injected successfully!');
  }

  closeDbStudioSeederModal();
  updateDbStudioBadges();
  renderDbStudioTable();
  if (typeof window.dispatchEvent === 'function') {
    window.dispatchEvent(new CustomEvent('casebook:data-synced'));
  }
}

// Custom Generator
function runCustomDummyGenerator() {
  const targetCol = document.getElementById('seederTargetCol')?.value || 'cases';
  const count = parseInt(document.getElementById('seederRecordCount')?.value || '5', 10);
  const caseType = document.getElementById('seederCaseTypeSelect')?.value || 'mix';
  const attachHearings = document.getElementById('seederAttachHearings')?.checked;

  if (targetCol === 'cases') {
    const cases = generateIndianLegalCases(count, caseType);
    injectRecords('cases', cases);
    if (attachHearings) {
      const hearings = generateIndianLegalHearings(count * 2, cases);
      injectRecords('hearings', hearings);
    }
    alert(`Injected ${count} dummy cases successfully!`);
  } else if (targetCol === 'hearings') {
    const existingCases = getDbStudioCollectionData('cases');
    const hearings = generateIndianLegalHearings(count, existingCases);
    injectRecords('hearings', hearings);
    alert(`Injected ${count} dummy hearings successfully!`);
  } else if (targetCol === 'paisa') {
    const paisa = generateDummyPaisaTxns(count);
    injectRecords('paisa', paisa);
    alert(`Injected ${count} dummy financial records successfully!`);
  } else if (targetCol === 'todos') {
    const todos = generateDummyTodos(count);
    injectRecords('todos', todos);
    alert(`Injected ${count} dummy tasks successfully!`);
  }

  closeDbStudioSeederModal();
  updateDbStudioBadges();
  renderDbStudioTable();
  if (typeof window.dispatchEvent === 'function') {
    window.dispatchEvent(new CustomEvent('casebook:data-synced'));
  }
}

function injectRecords(col, newItems) {
  const list = getDbStudioCollectionData(col);
  newItems.forEach(item => list.unshift(item));
  persistDbStudioCollection(col, list);

  // Sync with Supabase if online
  if (typeof window !== 'undefined' && window.supabaseClient && window.isSupabaseConfigured) {
    try {
      const sb = window.supabaseClient;
      if (col === 'hearings') sb.from('hearings').insert(newItems).then(() => {}).catch(() => {});
      else if (col === 'todos') sb.from('case_todos').insert(newItems).then(() => {}).catch(() => {});
    } catch (e) {}
  }
}

// Realistic Indian Legal Mock Generators
function generateIndianLegalCases(count, categoryChoice) {
  const firstNames = ['Rajesh', 'Suresh', 'Ramesh', 'Amit', 'Sunil', 'Vijay', 'Alok', 'Manoj', 'Pradeep', 'Dinesh'];
  const lastNames = ['Kumar', 'Sharma', 'Verma', 'Singh', 'Mishra', 'Pandey', 'Gupta', 'Yadav', 'Tiwari', 'Shukla'];
  const courts = [
    'District & Sessions Judge, Court No. 1',
    'Civil Judge (Senior Division), Court No. 3',
    'Chief Judicial Magistrate (CJM), Court No. 2',
    'Additional District Judge (ADJ-5)',
    'Family Court No. 1, Principal Judge',
    'Sub-Divisional Magistrate (SDM Court)'
  ];

  const categories = ['civil', 'criminal', 'family', 'revenue', 'misc_civil', 'misc_criminal', 'complaint'];
  const generated = [];

  for (let i = 0; i < count; i++) {
    const p1 = `${pick(firstNames)} ${pick(lastNames)}`;
    const p2 = `${pick(firstNames)} ${pick(lastNames)}`;
    const cat = categoryChoice === 'mix' ? pick(categories) : categoryChoice;
    const num = Math.floor(Math.random() * 800) + 10;
    const year = 2026;

    let caseNumber = '';
    let stage = 'Evidence';
    if (cat === 'civil') { caseNumber = `OS/${num}/${year}`; stage = 'Framing of Issues'; }
    else if (cat === 'criminal') { caseNumber = `ST/${num}/${year}`; stage = 'Cross Examination'; }
    else if (cat === 'family') { caseNumber = `Mat./${num}/${year}`; stage = 'Mediation Hearing'; }
    else if (cat === 'revenue') { caseNumber = `Rev./${num}/${year}`; stage = 'Spot Inspection Report'; }
    else if (cat === 'complaint') { caseNumber = `CC/${num}/${year}`; stage = 'Notice u/s 138 NI Act'; }
    else { caseNumber = `Misc/${num}/${year}`; stage = 'Arguments on Application'; }

    const today = new Date();
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + Math.floor(Math.random() * 25) + 3);

    generated.push({
      id: 'gen_case_' + Date.now() + '_' + i,
      caseNo: caseNumber,
      case_number: caseNumber,
      caseType: cat,
      case_type: cat,
      caseName: `${p1} vs. ${p2}`,
      case_title: `${p1} vs. ${p2}`,
      party_name: `${p1} vs. ${p2}`,
      clientName: p1,
      client_name: p1,
      courtName: pick(courts),
      court_name: pick(courts),
      filingDate: '2026-01-15',
      filing_date: '2026-01-15',
      nextHearing: nextDate.toISOString().split('T')[0],
      next_hearing: nextDate.toISOString().split('T')[0],
      hearingProcess: stage,
      hearing_process: stage,
      caseStatus: 'Active',
      case_status: 'Active',
      remarks: '[DUMMY] Generated by GOD Mode Seeder',
      _is_dummy: true,
      is_dummy: true
    });
  }

  return generated;
}

function generateIndianLegalHearings(count, sourceCases) {
  const processes = ['Summon to Witness', 'Evidence of Plaintiff', 'Cross Examination', 'Final Arguments', 'Framing of Issues', 'Order / Judgment'];
  const generated = [];
  const cases = sourceCases && sourceCases.length > 0 ? sourceCases : generateIndianLegalCases(3, 'civil');

  for (let i = 0; i < count; i++) {
    const parentCase = pick(cases);
    const today = new Date();
    const hDate = new Date(today);
    hDate.setDate(today.getDate() + Math.floor(Math.random() * 20) + 1);

    generated.push({
      id: 'gen_h_' + Date.now() + '_' + i,
      case_number: parentCase.caseNo || parentCase.case_number || 'OS/101/2026',
      case_type: parentCase.caseType || parentCase.case_type || 'civil',
      hearing_date: hDate.toISOString().split('T')[0],
      next_hearing_date: hDate.toISOString().split('T')[0],
      hearing_process: pick(processes),
      action_taken: 'Counsel appeared. Proceedings recorded in court diary.',
      court_name: parentCase.courtName || parentCase.court_name || 'District Court No. 1',
      notes: '[DUMMY] Auto-scheduled hearing',
      _is_dummy: true,
      is_dummy: true
    });
  }

  return generated;
}

function generateDummyPaisaTxns(count) {
  const clients = ['Ramesh Sharma', 'Vikram Singh', 'Sunita Devi', 'Alok Pandey', 'Anita Verma'];
  const categories = ['Professional Fee', 'Court Stamp Fee', 'Advocate Clerkage', 'Certified Copy Expenses'];
  const generated = [];

  for (let i = 0; i < count; i++) {
    const isIncome = Math.random() > 0.35;
    const today = new Date();
    today.setDate(today.getDate() - Math.floor(Math.random() * 15));

    generated.push({
      id: 'gen_txn_' + Date.now() + '_' + i,
      account_type: 'chamber',
      type: isIncome ? 'income' : 'expense',
      amount: isIncome ? (Math.floor(Math.random() * 15) + 2) * 1000 : (Math.floor(Math.random() * 8) + 1) * 200,
      party_name: pick(clients),
      category: pick(categories),
      txn_date: today.toISOString().split('T')[0],
      description: isIncome ? '[DUMMY] Advance legal fees received' : '[DUMMY] Paperbook printing expense',
      _is_dummy: true,
      is_dummy: true
    });
  }

  return generated;
}

function generateDummyTodos(count) {
  const tasks = ['File Vakalatnama in Registry', 'Prepare Affidavits of DW-1', 'Apply for Certified Copy of Order', 'Inspection of Court Record', 'Draft Written Statement'];
  const generated = [];

  for (let i = 0; i < count; i++) {
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + Math.floor(Math.random() * 10) + 1);

    generated.push({
      id: 'gen_todo_' + Date.now() + '_' + i,
      caseNo: `OS/${Math.floor(Math.random() * 500) + 10}/2026`,
      taskTitle: pick(tasks),
      deadlineDate: deadline.toISOString().split('T')[0],
      priority: pick(['high', 'medium', 'low']),
      status: 'pending',
      _is_dummy: true,
      is_dummy: true
    });
  }

  return generated;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Safe Purge: Removes ONLY records with _is_dummy = true or [DUMMY] in remarks
function purgeDummyDataOnly() {
  if (!confirm('Safe Purge: This will remove ONLY generated dummy records and keep all authentic cases intact. Proceed?')) return;

  let totalPurged = 0;

  ['cases', 'hearings', 'courts', 'todos', 'transfers', 'paisa'].forEach(col => {
    const list = getDbStudioCollectionData(col);
    const clean = list.filter(item => {
      const isDum = isDummyRecord(item);
      if (isDum) totalPurged++;
      return !isDum;
    });
    persistDbStudioCollection(col, clean);
  });

  selectedStudioIds.clear();
  updateDbStudioBulkButtons();
  updateDbStudioBadges();
  renderDbStudioTable();

  if (typeof window.dispatchEvent === 'function') {
    window.dispatchEvent(new CustomEvent('casebook:data-synced'));
  }

  alert(`Safe Purge Complete: Cleaned up ${totalPurged} dummy records safely!`);
}

// Full Database Export / Import
function exportDbStudioJSON() {
  const dump = {
    exportDate: new Date().toISOString(),
    cases: getDbStudioCollectionData('cases'),
    hearings: getDbStudioCollectionData('hearings'),
    courts: getDbStudioCollectionData('courts'),
    todos: getDbStudioCollectionData('todos'),
    transfers: getDbStudioCollectionData('transfers'),
    paisa: getDbStudioCollectionData('paisa')
  };

  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(dump, null, 2));
  const dl = document.createElement('a');
  dl.setAttribute('href', dataStr);
  dl.setAttribute('download', `casebook_db_backup_${new Date().toISOString().split('T')[0]}.json`);
  dl.click();
}

function importDbStudioJSON(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    try {
      const parsed = JSON.parse(evt.target.result);
      if (parsed.cases && Array.isArray(parsed.cases)) persistDbStudioCollection('cases', parsed.cases);
      if (parsed.hearings && Array.isArray(parsed.hearings)) persistDbStudioCollection('hearings', parsed.hearings);
      if (parsed.courts && Array.isArray(parsed.courts)) persistDbStudioCollection('courts', parsed.courts);
      if (parsed.todos && Array.isArray(parsed.todos)) persistDbStudioCollection('todos', parsed.todos);
      if (parsed.paisa && Array.isArray(parsed.paisa)) persistDbStudioCollection('paisa', parsed.paisa);

      updateDbStudioBadges();
      renderDbStudioTable();
      if (typeof window.dispatchEvent === 'function') {
        window.dispatchEvent(new CustomEvent('casebook:data-synced'));
      }
      alert('Database restored successfully from backup JSON!');
    } catch (err) {
      alert('Failed to parse backup JSON: ' + err.message);
    }
  };
  reader.readAsText(file);
}

function reloadDbStudioData() {
  if (typeof window.fetchAllDataFromSupabase === 'function') {
    window.fetchAllDataFromSupabase().then(() => {
      updateDbStudioBadges();
      renderDbStudioTable();
    });
  } else {
    updateDbStudioBadges();
    renderDbStudioTable();
  }
}

// Utility escaping helpers
function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeQuotes(str) {
  if (str == null) return '';
  return String(str).replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

// Global exports
window.initSettingsTabEnhancements = initSettingsTabEnhancements;
window.updateSettingsThemeLabel = updateSettingsThemeLabel;
window.updateSettingsDiagnostics = updateSettingsDiagnostics;
window.updateSettingsGatewayBadge = updateSettingsGatewayBadge;
window.switchSettingsSubtab = switchSettingsSubtab;
window.initDatabaseStudio = initDatabaseStudio;
window.selectDbStudioCollection = selectDbStudioCollection;
window.filterDbStudioCasesByType = filterDbStudioCasesByType;
window.filterDbStudioRecords = filterDbStudioRecords;
window.clearDbStudioSearch = clearDbStudioSearch;
window.renderDbStudioTable = renderDbStudioTable;
window.sortDbStudioBy = sortDbStudioBy;
window.changeDbStudioPage = changeDbStudioPage;
window.changeDbStudioPageSize = changeDbStudioPageSize;
window.toggleDbStudioSelectAll = toggleDbStudioSelectAll;
window.toggleDbStudioRowSelect = toggleDbStudioRowSelect;
window.openDbStudioRecordEditor = openDbStudioRecordEditor;
window.closeDbStudioEditorModal = closeDbStudioEditorModal;
window.switchDbEditorTab = switchDbEditorTab;
window.saveDbStudioRecord = saveDbStudioRecord;
window.deleteDbStudioRecord = deleteDbStudioRecord;
window.bulkDeleteDbStudioSelection = bulkDeleteDbStudioSelection;
window.bulkExportDbStudioSelection = bulkExportDbStudioSelection;
window.inspectDbStudioJson = inspectDbStudioJson;
window.closeDbStudioJsonModal = closeDbStudioJsonModal;
window.copyDbStudioJsonToClipboard = copyDbStudioJsonToClipboard;
window.openDbStudioSeederModal = openDbStudioSeederModal;
window.closeDbStudioSeederModal = closeDbStudioSeederModal;
window.toggleSeederOptions = toggleSeederOptions;
window.runDummyPreset = runDummyPreset;
window.runCustomDummyGenerator = runCustomDummyGenerator;
window.purgeDummyDataOnly = purgeDummyDataOnly;
window.exportDbStudioJSON = exportDbStudioJSON;
window.importDbStudioJSON = importDbStudioJSON;
window.reloadDbStudioData = reloadDbStudioData;

// Auto-run when tab becomes visible or changes
if (typeof window !== 'undefined') {
  window.addEventListener('casebook-theme-changed', () => {
    updateSettingsThemeLabel();
    if (typeof renderDbStudioTable === 'function') renderDbStudioTable();
  });
  window.addEventListener('casebook:data-synced', () => {
    updateSettingsDiagnostics();
    if (typeof updateDbStudioBadges === 'function') updateDbStudioBadges();
    if (typeof renderDbStudioTable === 'function') renderDbStudioTable();
  });
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initSettingsTabEnhancements, 300);
  });
}
