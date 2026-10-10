window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs['hearing'] = `
<div class="fd-container">
    <!-- Main Card -->
    <div class="card fd-main-card">
        <!-- Card Header -->
        <div class="card-header">
            <div class="card-header-icon">
                <iconify-icon icon="lucide:fast-forward" style="font-size: 20px;"></iconify-icon>
            </div>
            <div>
                <h2>Forward Dates</h2>
                <p>Pick a case, choose the next court date with one-tap presets, and forward it in seconds.</p>
            </div>
        </div>

        <div class="card-body">
            <form id="updateHearingForm" class="fd-form">
                
                <!-- SECTION 1 — Select Case -->
                <div class="form-section">
                    <div class="section-title">
                        <div class="step-num">1</div>
                        <h3>Select Case</h3>
                    </div>
                    <p class="section-desc">Choose from the list or type the case number — details load instantly.</p>

                    <div class="section-grid section-grid-2">
                        <div class="form-group">
                            <label for="hearingCaseSelect">Choose from list</label>
                            <select id="hearingCaseSelect" class="form-select">
                                <option value="">-- Choose Case from List --</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="hearingCaseNo">Or type / search case number</label>
                            <input type="text" id="hearingCaseNo" class="case-number-input form-input" data-uppercase="true" placeholder="E.G. CIV-2026-001 OR CR-2026-003" required>
                            <span class="input-hint" id="hearingCaseHelp">Undated cases awaiting their first schedule are listed first.</span>
                        </div>
                    </div>

                    <!-- Case Details Card showing case particulars -->
                    <div class="case-details-card" id="caseDetailsCard">
                        <div class="case-detail-item">
                            <span class="case-detail-label">Case Name</span>
                            <span class="case-detail-value" id="caseDetailCardName">State of Maharashtra vs. Rahul Sharma</span>
                        </div>
                        <div class="case-detail-item">
                            <span class="case-detail-label">Case Number</span>
                            <span class="case-detail-value highlight" id="caseDetailCardNumber">CIV-2026-001</span>
                        </div>
                        <div class="case-detail-item">
                            <span class="case-detail-label">Court</span>
                            <span class="case-detail-value" id="caseDetailCardCourt">Bombay High Court, Mumbai</span>
                        </div>
                    </div>
                </div>

                <!-- SECTION 2 — Date Progression -->
                <div class="form-section" id="hearingCaseInfoCard">
                    <div class="section-title">
                        <div class="step-num">
                            <iconify-icon icon="lucide:route" style="font-size: 14px;"></iconify-icon>
                        </div>
                        <h3>Date Progression</h3>
                        <span class="case-type-badge badge" id="hearingInfoBadge" style="margin-left: auto;">CIVIL</span>
                    </div>

                    <div class="timeline-container">
                        <!-- Previous / Current Date Box -->
                        <div class="timeline-box">
                            <h4><iconify-icon icon="lucide:map-pin" style="font-size: 13px;"></iconify-icon> Previous / Current Date</h4>
                            <div class="timeline-data" id="hearingPrevDateDisplay" style="font-weight: 600; font-size: 1rem; color: var(--text-primary);">
                                —
                            </div>
                            <div class="timeline-data">
                                <div><span>Stage:</span> <b id="hearingInfoPrevProcess">—</b></div>
                                <div><span>Court:</span> <b id="hearingInfoCourt">—</b></div>
                                <div><span>Case:</span> <b id="hearingInfoCaseName">—</b></div>
                            </div>
                            <div class="prev-edit-wrapper" style="display: flex; gap: 0.5rem; margin-top: 0.5rem; align-items: center; flex-wrap: wrap;">
                                <input type="text" id="hearingInfoPrevDate" readonly class="locked-input highlight-date-input" value="—" style="display:none;">
                                <input type="date" id="hearingInfoPrevDateEdit" class="form-input" style="display:none; padding:4px 8px; font-size:12px;" title="Set correct previous hearing date">
                                <button type="button" id="editPrevDateBtn" onclick="toggleEditPrevDate()" class="btn btn-outline" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;">
                                    <iconify-icon icon="lucide:edit-3"></iconify-icon> Edit Previous Date
                                </button>
                                <button type="button" id="savePrevDateBtn" onclick="savePrevDateEdit()" class="btn btn-primary" style="display:none; padding: 0.25rem 0.5rem; font-size: 0.75rem;">
                                    <iconify-icon icon="lucide:check"></iconify-icon> Save
                                </button>
                            </div>
                        </div>

                        <!-- Arrow -->
                        <div class="timeline-arrow">
                            <iconify-icon icon="lucide:arrow-right" style="font-size: 18px;"></iconify-icon>
                        </div>

                        <!-- Forwarded Next Date Box -->
                        <div class="timeline-box active">
                            <h4><iconify-icon icon="lucide:target" style="font-size: 13px;"></iconify-icon> Forwarded Next Date</h4>
                            <div class="timeline-data" id="hearingNextDateDisplay" style="color: var(--accent-gradient-start); font-weight: 600; font-size: 1rem;">
                                Select Date Below
                            </div>
                            <div class="timeline-data">
                                <div><span>Next Stage:</span> <b id="hearingNextProcessDisplay">— (Specify Stage)</b></div>
                                <div><span>Day:</span> <b id="hearingNextDayNameDisplay">Choose date below</b></div>
                                <div><span>Interval:</span> <b id="hearingIntervalDisplay">—</b></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- SECTION 3 (Two-column grid) -->
                <div class="section-grid section-grid-2">
                    
                    <!-- Left: New Hearing Date -->
                    <div class="form-section">
                        <div class="section-title">
                            <div class="step-num">2</div>
                            <h3>New Hearing Date</h3>
                        </div>
                        <p class="section-desc">One-tap presets or pick an exact date.</p>

                        <div class="chip-grid preset-chip-grid" style="margin-bottom: 1rem;">
                            <button type="button" class="btn btn-chip preset-chip" onclick="setHearingDateOffset(7)"><iconify-icon icon="lucide:zap"></iconify-icon> +1 Week</button>
                            <button type="button" class="btn btn-chip preset-chip" onclick="setHearingDateOffset(14)"><iconify-icon icon="lucide:zap"></iconify-icon> +2 Weeks</button>
                            <button type="button" class="btn btn-chip preset-chip" onclick="setHearingDateOffset(21)"><iconify-icon icon="lucide:zap"></iconify-icon> +3 Weeks</button>
                            <button type="button" class="btn btn-chip preset-chip" onclick="setHearingDateOffset(30)"><iconify-icon icon="lucide:calendar"></iconify-icon> +1 Month</button>
                            <button type="button" class="btn btn-chip preset-chip" onclick="setHearingDateOffset(60)"><iconify-icon icon="lucide:calendar"></iconify-icon> +2 Months</button>
                            <button type="button" class="btn btn-chip preset-chip" onclick="setHearingDateOffset(1)" style="color: #f59e0b; border-color: #f59e0b;"><iconify-icon icon="lucide:flame" style="color: #f59e0b;"></iconify-icon> Tomorrow</button>
                            <button type="button" class="btn btn-chip preset-chip" onclick="setHearingDateOffset(0)" style="color: #f59e0b; border-color: #f59e0b;"><iconify-icon icon="lucide:flame" style="color: #f59e0b;"></iconify-icon> Today</button>
                        </div>

                        <div class="form-group">
                            <label for="hearingDate" style="font-weight: 700; font-size: 0.85rem; color: var(--text-heading);">
                                Choose Next Hearing Date <span style="color:#ef4444;">*</span>
                            </label>

                            <!-- Refined Custom Date Picker Inline Card -->
                            <div class="fd-calendar-wrap" style="margin-top: 0.5rem; margin-bottom: 0.75rem;">
                                <div class="fd-cal-header">
                                    <div class="fd-cal-nav">
                                        <button type="button" class="fd-cal-nav-btn" onclick="hearingCalPrevYear()" title="Previous year" aria-label="Previous year">
                                            <iconify-icon icon="lucide:chevrons-left"></iconify-icon>
                                        </button>
                                        <button type="button" class="fd-cal-nav-btn" onclick="hearingCalPrevMonth()" title="Previous month" aria-label="Previous month">
                                            <iconify-icon icon="lucide:chevron-left"></iconify-icon>
                                        </button>
                                    </div>

                                    <div class="fd-cal-title" id="hearingCalTitle">Month YYYY</div>

                                    <div class="fd-cal-nav">
                                        <button type="button" class="fd-cal-nav-btn" onclick="hearingCalNextMonth()" title="Next month" aria-label="Next month">
                                            <iconify-icon icon="lucide:chevron-right"></iconify-icon>
                                        </button>
                                        <button type="button" class="fd-cal-nav-btn" onclick="hearingCalNextYear()" title="Next year" aria-label="Next year">
                                            <iconify-icon icon="lucide:chevrons-right"></iconify-icon>
                                        </button>
                                        <button type="button" class="fd-cal-today-btn" onclick="hearingCalToday()">Today</button>
                                    </div>
                                </div>

                                <div class="fd-cal-weekdays">
                                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                                </div>

                                <div class="fd-cal-days" id="hearingCalDays"></div>

                                <div class="fd-cal-footer">
                                    <div class="fd-cal-selected-pill">
                                        <iconify-icon icon="lucide:calendar"></iconify-icon>
                                        <span id="hearingCalSelectedText">Select a date</span>
                                    </div>
                                    <button type="button" class="fd-cal-clear-btn" onclick="hearingCalClear()">Clear</button>
                                </div>
                            </div>

                            <!-- Native input synced for validation & submission -->
                            <input type="date" id="hearingDate" required class="hearing-date-input form-input" style="display:none;">
                            <input type="text" id="hearingDateReadable" readonly class="locked-input highlight-date-input" value="—" placeholder="Choose date to see preview" style="margin-top: 8px; font-size: 0.8rem; background: var(--bg-panel-secondary); border: 1px dashed var(--border-color); color: var(--text-secondary); padding: 6px 10px; border-radius: var(--radius-md);">
                        </div>
                    </div>

                    <!-- Right: Hearing Stage / Process (Replaced Block) -->
                    <div class="hearing-stage-container">
                        <div class="hearing-header">
                            <div class="step-badge">3</div>
                            <h1>Hearing Stage / Process</h1>
                        </div>
                        <p class="hearing-subtitle">Select a stage from the dropdown or choose Other.</p>

                        <!-- Form Section -->
                        <div class="hearing-form-group">
                            <label for="hearingStage">Hearing Stage (सुनवाई का चरण) <span style="color:#ef4444;">*</span></label>
                            
                            <!-- Dropdown Menu -->
                            <select id="hearingStage" required>
                                <option value="" disabled selected>-- Select an option --</option>
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

                            <!-- Hidden Input Box -->
                            <div id="otherInputContainer" style="display: none; flex-direction: column; gap: 8px;">
                                <label for="customStage">Please specify the stage/order:</label>
                                <input type="text" id="customStage" placeholder="Type the court's order here...">
                            </div>

                            <!-- Backend sync holder -->
                            <input type="hidden" id="hearingProcess" name="hearingProcess" value="">
                        </div>
                    </div>

                </div>

                <!-- SECTION 4 — Proceedings & Order Notes -->
                <div class="form-section">
                    <div class="section-title">
                        <div class="step-num">4</div>
                        <h3>Proceedings &amp; Order Notes (Optional)</h3>
                    </div>
                    <p class="section-desc">Court order summary, bench remarks, or next action items.</p>

                    <div class="form-group">
                        <label for="hearingActionTaken">Action Taken / Court Order Summary</label>
                        <textarea id="hearingActionTaken" class="form-textarea" rows="2" placeholder="e.g. Defendant filed written statement. Court granted 2 weeks for counter affidavit."></textarea>
                    </div>
                </div>

                <!-- SUBMIT BAR -->
                <div class="submit-bar">
                    <button type="submit" id="hearingSubmitBtn" class="btn-submit-large">
                        <iconify-icon icon="lucide:send" style="font-size: 18px;"></iconify-icon>
                        <span>Forward Date</span>
                    </button>
                </div>
                <p id="hearingStatus" class="update-status-msg" style="margin-top: 8px; font-size: 0.85rem;"></p>
            </form>

            <!-- Direct WhatsApp Notification Card -->
            <div id="hearingWhatsAppSection" class="whatsapp-notification-card hidden" style="margin-top: 1.5rem; background: var(--bg-panel-secondary); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1rem 1.25rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
                <div class="whatsapp-card-content" style="display: flex; align-items: center; gap: 0.75rem;">
                    <div class="whatsapp-icon-box" style="font-size: 1.5rem;"><iconify-icon icon="lucide:message-circle"></iconify-icon></div>
                    <div class="whatsapp-info">
                        <h4 style="font-size: 0.95rem; font-weight: 600; color: var(--text-primary); margin: 0;">Send WhatsApp Court Notice to Client</h4>
                        <p id="whatsappClientSummary" style="font-size: 0.8rem; color: var(--text-secondary); margin: 2px 0 0;">Notify client with the newly scheduled hearing date and stage.</p>
                    </div>
                </div>
                <button type="button" id="sendWhatsAppHearingBtn" class="btn btn-primary" style="background: #25d366; border-color: #25d366; color: white;">
                    <iconify-icon icon="lucide:send"></iconify-icon> <span>Send WhatsApp Notice</span>
                </button>
            </div>

        </div>
    </div>
</div>
`;
