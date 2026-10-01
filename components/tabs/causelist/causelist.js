window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs["causelist"] = `

    <div class="section-header-row">
        <div class="section-title-box">
            <div class="section-icon-badge"><i class="fa-solid fa-scroll"></i></div>
        <div>
        <h3>Daily Cause List & Appearance Board</h3>
        <div class="header-chips-row">
            <button type="button" class="header-chip-btn" onclick="setCauseListDateOffset(0)">
                <i class="fa-solid fa-thumbtack"></i> Today
            </button>
            <button type="button" class="header-chip-btn" onclick="setCauseListDateOffset(1)">
                <i class="fa-solid fa-bolt"></i> Tomorrow
            </button>
            <button type="button" class="header-chip-btn" onclick="printDailyCauseList()">
                <i class="fa-solid fa-print"></i> Print Cause List (A4)
            </button>
            <button type="button" id="causeListWhatsAppActionBtn" class="header-chip-btn" onclick="sendDailyCauseListWhatsApp()" title="Share today's cause list summary on WhatsApp">
                💬 WhatsApp Daily Schedule
            </button>
            </div>
        </div>
    </div>

        
    </div>

    <!-- Cause List Controls Toolbar -->
    <div class="causelist-toolbar-card">
        <div class="causelist-toolbar-row">
            <div class="causelist-date-selector">
                <label for="causeListDateInput" class="causelist-toolbar-label">Select Appearance Date:</label>
                <div class="causelist-date-input-wrap">
                    <input type="date" id="causeListDateInput" class="causelist-date-input">
                </div>
            </div>
            <div class="causelist-court-filter-wrap">
                <label for="causeListCourtFilterSelect" class="causelist-toolbar-label">Filter by Court:</label>
                <select id="causeListCourtFilterSelect" class="form-select causelist-select">
                    <option value="">🏛️ All Courts</option>
                </select>
            </div>
            <div class="causelist-presets-wrap">
                <label class="causelist-toolbar-label">Quick Date:</label>
                <div class="causelist-preset-buttons">
                    <button type="button" class="preset-pill" onclick="setCauseListDateOffset(0)">📌 Today</button>
                    <button type="button" class="preset-pill" onclick="setCauseListDateOffset(1)">⚡ Tomorrow</button>
                    <button type="button" class="preset-pill" onclick="setCauseListDateOffset(2)">🗓️ In 2 Days</button>
                    <button type="button" class="preset-pill" onclick="setCauseListDateOffset(7)">📅 Next Week</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Cause List Summary Badges & Stats Bar -->
    <div class="causelist-stats-bar">
        <div class="causelist-date-banner">
            <span class="banner-icon"><i class="fa-solid fa-scale-balanced"></i>️</span>
            <div>
                <h4 id="causeListBannerDateText">Listed Matters for Today</h4>
                <span id="causeListBannerDayName" class="banner-subtext">Loading day...</span>
            </div>
        </div>
        <div class="causelist-counters-group">
            <span id="causeListTotalBadge" class="causelist-stat-pill total">0 Total Matters</span>
            <span id="causeListCivilBadge" class="causelist-stat-pill civil">0 Civil</span>
            <span id="causeListCriminalBadge" class="causelist-stat-pill criminal">0 Criminal</span>
            <span id="causeListRevenueBadge" class="causelist-stat-pill revenue">0 Revenue</span>
        </div>
    </div>

    <!-- Daily Cause List — Linear Cards (replaces wide table) -->
    <div class="causelist-table-card">
        <div id="causeListCardsContainer" class="causelist-cards">
            <div class="causelist-empty">Loading daily cause list...</div>
        </div>
    </div>
</div>
`;
