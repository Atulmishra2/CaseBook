window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs['hearing'] = `
<div class="section-header-row">
    <div class="section-title-box">
        <div class="section-icon-badge"><i class="fa-solid fa-gavel"></i></div>
        <div>
            <h3>Log Hearing & Proceedings</h3>
            <p class="section-subtitle">Record court proceedings, next appearance date, order details, and interim directions</p>
            <div class="header-chips-row">
                <button type="button" class="header-chip-btn" onclick="showTab('upcoming')"><i class="fa-solid fa-clock"></i> Upcoming Hearings</button>
            </div>
        </div>
    </div>
</div>
<div class="form-container fd-container tab-card-wrapper">
                    <!-- Hero Banner -->
                    <div class="fd-hero">
                        <div class="fd-hero-icon"><i class="fa-solid fa-bolt"></i></div>
                        <div class="fd-hero-text">
                            <h3>Forward Dates</h3>
                            <p>Pick a case, choose the next court date with one-tap presets, and forward it in seconds.</p>
                        </div>
                    </div>

                    <form id="updateHearingForm" class="fd-form">
                        <!-- 1 · Select Case -->
                        <div class="fd-card">
                            <div class="fd-card-head">
                                <span class="fd-chip">1</span>
                                <div>
                                    <h4>Select Case</h4>
                                    <p>Choose from the list or type the case number — details load instantly.</p>
                                </div>
                            </div>
                            <div class="fd-grid">
                                <div class="form-group">
                                    <label for="hearingCaseSelect">Choose from List</label>
                                    <select id="hearingCaseSelect" class="form-select">
                                        <option value="">-- Choose Case from List --</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="hearingCaseNo">Or Type / Search Case Number</label>
                                    <input type="text" id="hearingCaseNo" class="case-number-input" data-uppercase="true" placeholder="e.g. CIV-2026-001 or CR-2026-003" required>
                                    <small id="hearingCaseHelp" style="display: block; margin-top: 4px; color: #64748b;">Undated cases awaiting their first schedule are listed first.</small>
                                </div>
                            </div>
                        </div>

                        <!-- Progression: From ➔ To -->
                        <div id="hearingCaseInfoCard" class="fd-progression">
                            <div class="fd-progression-head">
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <i class="fa-solid fa-route" style="color: #1e293b;"></i>
                                    <span style="font-size: 14px; font-weight: 700; color: #1e293b;">Date Progression</span>
                                    <span id="hearingInfoBadge" class="case-badge civil" style="display: none;">CIVIL</span>
                                </div>
                                <span id="hearingCaseClientTag" class="hearing-client-pill">Client: —</span>
                            </div>

                            <div class="fd-progression-grid">
                                <!-- From -->
                                <div class="fd-prog-box fd-from">
                                    <div class="fd-prog-tag">📌 Previous / Current Date</div>
                                    <div class="fd-prog-date" id="hearingPrevDateDisplay">—</div>
                                    <div class="fd-prog-meta"><span>Stage:</span><b id="hearingInfoPrevProcess">—</b></div>
                                    <div class="fd-prog-meta"><span>Court:</span><b id="hearingInfoCourt">—</b></div>
                                    <div class="fd-prog-meta"><span>Case:</span><b id="hearingInfoCaseName">—</b></div>
                                    <div class="prev-edit-wrapper" style="margin-top: 8px;">
                                        <input type="text" id="hearingInfoPrevDate" readonly class="locked-input highlight-date-input" value="—" style="display:none;">
                                        <input type="date" id="hearingInfoPrevDateEdit" class="form-input" style="display:none; padding:4px 8px; font-size:12px;" title="Set correct previous hearing date">
                                        <button type="button" id="editPrevDateBtn" title="Correct previous date" onclick="toggleEditPrevDate()" class="prev-date-edit-btn">✏️ Edit Previous Date</button>
                                        <button type="button" id="savePrevDateBtn" onclick="savePrevDateEdit()" class="prev-date-save-btn" style="display:none;">✔ Save</button>
                                    </div>
                                </div>

                                <!-- Arrow -->
                                <div class="fd-arrow">
                                    <div class="fd-arrow-circle"><i class="fa-solid fa-arrow-right-long"></i></div>
                                    <span class="fd-arrow-label">Forward</span>
                                </div>

                                <!-- To -->
                                <div class="fd-prog-box fd-to">
                                    <div class="fd-prog-tag to">🎯 Forwarded Next Date</div>
                                    <div class="fd-prog-date to" id="hearingNextDateDisplay">Select Date Below</div>
                                    <div class="fd-prog-meta"><span>Next Stage:</span><b id="hearingNextProcessDisplay">—</b></div>
                                    <div class="fd-prog-meta"><span>Day:</span><b id="hearingNextDayNameDisplay">Choose date below</b></div>
                                    <div class="fd-prog-meta"><span>Interval:</span><b id="hearingIntervalDisplay">—</b></div>
                                </div>
                            </div>
                        </div>

                        <!-- 2 · New Date  |  3 · Stage -->
                        <div class="fd-two-col">
                            <div class="fd-card">
                                <div class="fd-card-head">
                                    <span class="fd-chip">2</span>
                                    <div>
                                        <h4>New Hearing Date</h4>
                                        <p>One-tap presets or pick an exact date.</p>
                                    </div>
                                </div>
                                <div class="fd-presets">
                                    <button type="button" class="preset-pill" onclick="setHearingDateOffset(7)">⚡ +1 Week</button>
                                    <button type="button" class="preset-pill" onclick="setHearingDateOffset(14)">📋 +2 Weeks</button>
                                    <button type="button" class="preset-pill" onclick="setHearingDateOffset(21)">🗓️ +3 Weeks</button>
                                    <button type="button" class="preset-pill" onclick="setHearingDateOffset(30)">📅 +1 Month</button>
                                    <button type="button" class="preset-pill" onclick="setHearingDateOffset(60)">⏳ +2 Months</button>
                                    <button type="button" class="preset-pill" onclick="setHearingDateOffset(1)">🎯 Tomorrow</button>
                                    <button type="button" class="preset-pill" onclick="setHearingDateOffset(0)">📌 Today</button>
                                </div>
                                <div class="form-group" style="margin-top: 12px;">
                                    <label for="hearingDate" style="font-weight: 700; color: #1e293b;">📅 Next Hearing Date <span style="color:#ef4444;">*</span></label>
                                    <input type="date" id="hearingDate" required class="hearing-date-input">
                                    <input type="text" id="hearingDateReadable" readonly class="locked-input highlight-date-input" value="—" placeholder="Choose date to see preview" style="margin-top: 8px;">
                                </div>
                            </div>

                            <div class="fd-card">
                                <div class="fd-card-head">
                                    <span class="fd-chip">3</span>
                                    <div>
                                        <h4>Hearing Stage / Process</h4>
                                        <p>Tap a stage or type the court's order.</p>
                                    </div>
                                </div>
                                <div class="fd-stage-pills" id="hearingStagePillsWrap">
                                    <button type="button" class="stage-pill" onclick="setHearingStagePreset('Arguments / अंतिम बहस')">📋 Arguments (बहस)</button>
                                    <button type="button" class="stage-pill" onclick="setHearingStagePreset('Evidence / साक्ष्य-गवाही')">📑 Evidence (साक्ष्य)</button>
                                    <button type="button" class="stage-pill" onclick="setHearingStagePreset('Notice / Summons (नोटिस-समन)')">✉️ Notice (समन)</button>
                                    <button type="button" class="stage-pill" onclick="setHearingStagePreset('Bail Hearing / ज़मानत सुनवाई')"><i class="fa-solid fa-scale-balanced"></i>️ Bail Hearing (ज़मानत)</button>
                                    <button type="button" class="stage-pill" onclick="setHearingStagePreset('Written Statement / जवाबदावा')">📝 Written Statement (W.S.)</button>
                                    <button type="button" class="stage-pill" onclick="setHearingStagePreset('Framing of Issues / तनकीहात')"><i class="fa-solid fa-scale-balanced"></i>️ Framing of Issues (तनकीहात)</button>
                                    <button type="button" class="stage-pill" onclick="setHearingStagePreset('Cross Examination / जिरह')">🔍 Cross Examination (जिरह)</button>
                                    <button type="button" class="stage-pill" onclick="setHearingStagePreset('Final Order / फैसला')">🏁 Final Order (फैसला)</button>
                                    <button type="button" class="stage-pill" onclick="setHearingStagePreset('Compliance / अनुपालन')">✅ Compliance (अनुपालन)</button>
                                </div>
                                <div class="form-group" style="margin-top: 12px;">
                                    <label for="hearingProcess" style="font-weight: 700; color: #1e293b;">Stage Description <span style="color:#ef4444;">*</span></label>
                                    <input type="text" id="hearingProcess" placeholder="e.g. Arguments, Evidence, Notice, Bail Hearing" required>
                                </div>
                            </div>
                        </div>

                        <!-- 4 · Notes -->
                        <div class="fd-card">
                            <div class="fd-card-head">
                                <span class="fd-chip">4</span>
                                <div>
                                    <h4>Proceedings & Order Notes <span style="font-weight: 500; color: #64748b;">(Optional)</span></h4>
                                    <p>Court order summary, bench remarks, or next action items.</p>
                                </div>
                            </div>
                            <div class="form-group" style="margin-top: 8px;">
                                <label for="hearingActionTaken">Action Taken / Court Order Summary</label>
                                <textarea id="hearingActionTaken" rows="2" placeholder="e.g. Defendant filed written statement. Court granted 2 weeks for counter affidavit." style="resize:vertical;"></textarea>
                            </div>
                        </div>

                        <div class="fd-submit-row">
                            <button type="submit" id="hearingSubmitBtn" class="primary-btn form-submit-btn fd-submit-btn">
                                <i class="fa-solid fa-paper-plane"></i> Forward Date
                            </button>
                        </div>
                        <p id="hearingStatus" class="update-status-msg"></p>
                    </form>

                    <!-- Direct WhatsApp Notification Card -->
                    <div id="hearingWhatsAppSection" class="whatsapp-notification-card hidden">
                        <div class="whatsapp-card-content">
                            <div class="whatsapp-icon-box">💬</div>
                            <div class="whatsapp-info">
                                <h4>Send WhatsApp Court Notice to Client</h4>
                                <p id="whatsappClientSummary">Notify client with the newly scheduled hearing date and stage.</p>
                            </div>
                        </div>
                        <button type="button" id="sendWhatsAppHearingBtn" class="whatsapp-send-btn">
                            <span>💬 Send WhatsApp Notice</span>
                        </button>
                    </div>
                </div>
`;
