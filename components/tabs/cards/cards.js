window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs["cards"] = `            
<!-- All Cases Master Register Tab: Unified table with real-time filters -->
            <!-- Case Cards Board: Modern CaseBook v3 Layout -->
            <div class="cards-view-wrap">
                <!-- page header + stats -->
                <div class="section-header-row">
    <div class="section-title-box">
        <div class="section-icon-badge"><i class="fa-solid fa-scale-balanced"></i></div>
        <div>
            <h3>Case Cards Board</h3>
            <p class="section-subtitle">Modern grid view of active legal matters with live status indicators and quick actions</p>
            <div class="header-chips-row">
                <button type="button" class="header-chip-btn" onclick="setCaseCardsPill('all', this)"><i class="fa-solid fa-border-all"></i> All Cards</button>
                    <button type="button" class="header-chip-btn" onclick="showTab('add')"><i class="fa-solid fa-plus"></i> Add Case</button>
            </div>
        </div>
    </div>
</div>
                <div class="stats-strip">
                    <div class="stat-chip pending" onclick="setCaseCardsPill('pending', this)" style="cursor: pointer;" title="Filter Pending Cases">
                        <div class="num" id="cardsStatPending">0</div>
                        <div class="lbl">Pending</div>
                    </div>
                    <div class="stat-chip hearing" onclick="setCaseCardsPill('thisweek', this)" style="cursor: pointer;" title="Filter Hearings This Week">
                        <div class="num" id="cardsStatThisWeek">0</div>
                        <div class="lbl">Hearing This Week</div>
                    </div>
                    <div class="stat-chip clients" onclick="setCaseCardsPill('all', this)" style="cursor: pointer;" title="View All Clients">
                        <div class="num" id="cardsStatClients">0</div>
                        <div class="lbl">Clients</div>
                    </div>
                </div>

                <!-- filter chips -->
                <div class="filters" id="caseCardsPillRow" role="group" aria-label="Quick case filters">
                    <button type="button" class="chip active" data-filter="all" onclick="setCaseCardsPill('all', this)">All</button>
                    <button type="button" class="chip" data-filter="pending" onclick="setCaseCardsPill('pending', this)">🟡 Pending</button>
                    <button type="button" class="chip" data-filter="listed" onclick="setCaseCardsPill('listed', this)">🔵 Listed</button>
                    <button type="button" class="chip" data-filter="disposed" onclick="setCaseCardsPill('disposed', this)">🟢 Disposed</button>
                    <button type="button" class="chip" data-filter="closed" onclick="setCaseCardsPill('closed', this)">⚪ Closed</button>
                    <button type="button" class="chip" data-filter="urgent" onclick="setCaseCardsPill('urgent', this)">🔴 Urgent</button>
                    <button type="button" class="chip" data-filter="thisweek" onclick="setCaseCardsPill('thisweek', this)">📅 This Week</button>
                </div>

                <!-- Live search & count bar -->
                <div class="cards-search-bar">
                    <div class="cards-search-box">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <input type="text" id="caseCardsSearchInput" placeholder="Search cases by name, party, number, court, client..." aria-label="Search case cards" oninput="renderCaseCards(false)" enterkeyhint="search" autocomplete="off">
                    </div>
                    <span id="caseCardsCountBadge" class="cards-count-badge">Showing 0 cases</span>
                </div>

                <!-- Cards Feed Container -->
                <div id="caseCardsGrid" class="cards-feed"></div>
            </div>

            <!-- Floating Add Button with hover tooltip -->
            <button type="button" class="fab" onclick="showTab('add')" title="Add New Case" aria-label="Add New Case">
                <span class="fab-plus">+</span>
                <span class="fab-tooltip">Add New Case</span>
            </button>


`;
