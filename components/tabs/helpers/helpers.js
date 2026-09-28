window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs['helpers'] = `<div class="form-container">
                    <div class="section-header-row">
    <div class="section-title-box">
        <div class="section-icon-badge"><i class="fa-solid fa-id-card-clip"></i></div>
        <div>
            <h3>Court Staff & Helpers Directory</h3>
            <p class="section-subtitle">Chambers directory for court readers, clerks, process servers, and contact staff</p>
            <div class="header-chips-row">
                <button type="button" class="header-chip-btn" onclick="showTab('courts')"><i class="fa-solid fa-building-columns"></i> Courts</button>
            </div>
        </div>
    </div>
</div>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span id="helpersCloudStatusBadge" class="db-live-badge" style="font-size: 11px; padding: 4px 8px;">🟢 Cloud Ready</span>
                            <button type="button" class="secondary-btn" onclick="showTab('courts')" style="height: 38px; padding: 0 14px; font-size: 12.5px; margin: 0; display: inline-flex; align-items: center; gap: 6px;">
                                <i class="fa-solid fa-landmark"></i> <span>Manage Courts</span>
                            </button>
                            <span id="helpersTotalCountBadge" class="case-badge civil">0 Helpers</span>
                        </div>
                    </div>

                    <!-- Add New Helper Form Card -->
                    <div class="helper-add-card">
                        <div class="search-card-header">
                            <div class="search-header-info">
                                <span class="search-card-badge-icon helper-badge-icon"><i class="fa-solid fa-user-plus"></i></span>
                                <div>
                                    <h4 class="search-card-heading">Add New Court Worker / Helper</h4>
                                    <p class="search-card-subheading">Enter worker's full name, assigned court, position / role, and mobile number.</p>
                                </div>
                            </div>
                        </div>
                        <form id="helperAddForm" onsubmit="handleSaveHelper(event)" class="helper-form-grid">
                            <div class="helper-form-row">
                                <div class="helper-input-group">
                                    <label for="helperNameInput"><i class="fa-solid fa-user"></i> Worker / Staff Name *</label>
                                    <input type="text" id="helperNameInput" placeholder="Worker / staff name (e.g. Ramesh Chandra)..." required>
                                </div>
                                <div class="helper-input-group">
                                    <label for="helperCourtSelect"><i class="fa-solid fa-landmark"></i> Court / Forum *</label>
                                    <select id="helperCourtSelect" class="browser-default helper-select" required>
                                        <option value="" disabled selected>Select Court...</option>
                                    </select>
                                </div>
                            </div>
                            <div class="helper-form-row">
                                <div class="helper-input-group">
                                    <label for="helperPositionInput"><i class="fa-solid fa-briefcase"></i> Position / Role *</label>
                                    <input type="text" id="helperPositionInput" placeholder="e.g. Reader, Ahlmad, Peon, Steno, Munshi..." list="helperPositionSuggestions" required>
                                    <datalist id="helperPositionSuggestions">
                                        <option value="Reader (पेशकार)">
                                        <option value="Ahlmad (अहलमद)">
                                        <option value="Stenographer (स्टेनो)">
                                        <option value="Peon / Orderly (चपरासी)">
                                        <option value="Naib Court (नायब कोर्ट)">
                                        <option value="Munshi / Advocate Clerk (मुंशी)">
                                        <option value="Process Server (समन तामीलकर्ता)">
                                        <option value="Court Manager / Registrar">
                                        <option value="Typist / Data Entry Operator">
                                        <option value="Associate / Legal Assistant">
                                    </datalist>
                                </div>
                                <div class="helper-input-group">
                                    <label for="helperMobileInput"><i class="fa-solid fa-phone"></i> Mobile Number *</label>
                                    <input type="tel" id="helperMobileInput" placeholder="10-digit mobile (e.g. 9876543210)..." pattern="[0-9+\\- ]{10,15}" required>
                                </div>
                            </div>
                            <div class="helper-form-actions">
                                <button type="submit" id="saveHelperSubmitBtn" class="primary-btn helper-submit-btn">
                                    <i class="fa-solid fa-user-check"></i> <span>Save Worker to Directory</span>
                                </button>
                            </div>
                        </form>
                    </div>

                    <!-- Helpers Directory Search & Filter Toolbar -->
                    <div class="court-table-toolbar helper-table-toolbar">
                        <div class="search-field-box helper-search-box">
                            <span class="search-field-prefix-icon"><i class="fa-solid fa-magnifying-glass"></i></span>
                            <input type="text" id="helperSearchInput" placeholder="Search by name, court, position, or mobile..." oninput="filterHelpersTable(this.value)" enterkeyhint="search" autocomplete="off">
                        </div>
                        <div class="helper-toolbar-right">
                            <div class="helper-filter-court-box">
                                <select id="helperFilterCourtSelect" class="browser-default helper-select" onchange="filterHelpersTable()">
                                    <option value="">All Courts (All Forums)</option>
                                </select>
                            </div>
                            <button type="button" id="helpersSyncDbBtn" class="secondary-btn helper-export-btn" onclick="syncCourtHelpersFromCloud(true)" title="Fetch and synchronize court helpers from database">
                                <i class="fa-solid fa-arrows-rotate"></i> <span>Sync DB</span>
                            </button>
                            <button type="button" class="secondary-btn helper-export-btn" onclick="exportHelpersCsv()" title="Export helpers list as CSV">
                                <i class="fa-solid fa-file-csv"></i> <span>Export CSV</span>
                            </button>
                        </div>
                    </div>

                    <!-- Helpers Directory Cards -->
                    <div id="helpersCardsGrid" class="helper-cards-grid">
                        <!-- Populated dynamically -->
                    </div>
                </div>`;
