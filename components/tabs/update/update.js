window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs['update'] = `<div class="form-container tab-card-wrapper">
                    <div class="section-header-row">
    <div class="section-title-box">
        <div class="section-icon-badge"><i class="fa-solid fa-pen-to-square"></i></div>
        <div>
            <h3>Update Case Details</h3>
            <p class="section-subtitle">Modify matter information, parties, client phone, forum details, and case status</p>
            <div class="header-chips-row">
                <button type="button" class="header-chip-btn" onclick="showTab('search')"><i class="fa-solid fa-magnifying-glass"></i> Case Registry</button>
            </div>
        </div>
    </div>
</div>

                    <div class="update-search-card">
                        <div class="search-card-header">
                            <div class="search-header-info">
                                <span class="search-card-badge-icon">🔍</span>
                                <div>
                                    <h4 class="search-card-heading">Search Case to Load Details</h4>
                                    <p class="search-card-subheading">Enter Case Number, Plaintiff, Defendant, or Client Name to fetch and edit record</p>
                                </div>
                            </div>
                        </div>
                        <div class="update-search-row">
                            <div class="search-field-box">
                                <span class="search-field-prefix-icon"><i class="fa-solid fa-magnifying-glass"></i></span>
                                <input type="text" id="updateSearchInput" placeholder="Enter Case Number, Plaintiff, Defendant, or Client Name..." autocomplete="off">
                            </div>
                            <button type="button" id="updateSearchBtn" class="primary-btn search-action-btn">
                                <i class="fa-solid fa-magnifying-glass"></i> <span>Load Case Details</span>
                            </button>
                        </div>
                        <p id="updateSearchStatus" class="update-status-msg"></p>
                    </div>

                    <form id="updateCaseForm">
                        <!-- Case Status Card (With Wrapped Case Disposal & Judgment Record) -->
                        <div class="case-status-card">
                            <div class="status-header-row">
                                <div class="status-label-col">
                                    <label for="updateCaseStatus">Case Status &amp; Disposal</label>
                                    <span class="status-help-text">Set case active/disposed status and manage final judgment record</span>
                                </div>
                                <button type="button" id="markDisposeBtn" class="dispose-action-btn" title="Quickly mark this case as Disposed Off">
                                    <i class="fa-solid fa-scale-balanced"></i>️ Mark as Disposed Off
                                </button>
                            </div>
                            <div class="form-grid-2col">
                                <div class="form-group" style="grid-column: 1 / -1; max-width: 320px;">
                                    <label for="updateCaseStatus">Status</label>
                                    <select id="updateCaseStatus" class="status-select" onchange="typeof syncDisposalSectionVisibility === 'function' && syncDisposalSectionVisibility()">
                                        <option value="Pending">⏳ Pending (Active)</option>
                                        <option value="Disposed">✅ Disposed Off</option>
                                    </select>
                                </div>

                                <!-- Wrapped Case Disposal & Judgment Record Data (Active on Disposed Off) -->
                                <div id="updateCaseDisposalSection" class="case-disposal-section-wrap" style="grid-column: 1 / -1; display: none;">
                                    <div class="case-disposal-card" id="updateCaseDisposalCard" style="margin-bottom: 0;">
                                        <div class="disposal-card-header">
                                            <div class="disposal-card-title-wrap">
                                                <div class="disposal-icon-badge"><i class="fa-solid fa-scale-balanced"></i>️</div>
                                                <div>
                                                    <h4 class="disposal-card-title">Case Disposal &amp; Judgment Record (वाद निस्तारण एवं अंतिम निर्णय)</h4>
                                                    <p class="disposal-card-sub">Record final disposal reason, compromise agreement, or judgment comments</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="disposal-card-body">
                                            <div class="remarks-quick-chips">
                                                <span class="remarks-chip-btn" onclick="insertRemarkChip('updateCaseDisposalComment', 'Settled by mutual compromise')">➕ Compromise</span>
                                                <span class="remarks-chip-btn" onclick="insertRemarkChip('updateCaseDisposalComment', 'Allowed / Disposed on merits')">➕ Disposed Merits</span>
                                                <span class="remarks-chip-btn" onclick="insertRemarkChip('updateCaseDisposalComment', 'Dismissed in default')">➕ Dismissed Default</span>
                                                <span class="remarks-chip-btn" onclick="insertRemarkChip('updateCaseDisposalComment', 'Withdrawn with liberty')">➕ Withdrawn</span>
                                                <span class="remarks-chip-btn" onclick="insertRemarkChip('updateCaseDisposalComment', 'Acquitted / Discharged')">➕ Acquitted</span>
                                                <span class="remarks-chip-btn" onclick="insertRemarkChip('updateCaseDisposalComment', 'Decreed in favor of plaintiff')">➕ Decreed</span>
                                            </div>
                                            <textarea id="updateCaseDisposalComment" rows="2" placeholder="e.g. Disposed on merits; compromise deed filed and verified; suit decreed in terms of settlement..."></textarea>
                                            <div class="disposal-card-footer">
                                                <span class="disposal-footer-tip">💡 <b>Disposal Index:</b> When marked as disposed, these judgment notes will appear in the Disposed Cases register, All Cases table, and Case Dossier.</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <label for="updateCaseTypeDropdown">Case Type</label>
                        <select id="updateCaseTypeDropdown" required>
                            <option value="">-- Select Case Type --</option>
                        </select>

                        <div id="updateGeneralCaseForm" class="case-form-panel">
                            <div class="form-grid-2col">
                                <div class="form-group">
                                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                                        <label for="updateCaseNo" style="margin-bottom:0;">Case Number 🔒</label>
                                        <button type="button" class="unlock-case-btn" data-targets="updateCaseNo,updateCaseYear" onclick="toggleCaseNumberUnlock(this)" title="Click to unlock and correct Case Number or Year"><i class="fa-solid fa-lock"></i> <span>Unlock</span></button>
                                    </div>
                                    <input id="updateCaseNo" type="text" placeholder="Case Number" readonly required class="locked-input case-number-input" data-uppercase="true" title="Click Unlock to edit Case Number if needed.">
                                </div>
                                <div class="form-group">
                                    <label for="updateCaseYear">Year 🔒</label>
                                    <input id="updateCaseYear" type="number" placeholder="Year" readonly required class="locked-input">
                                </div>
                                <div class="form-group">
                                    <label for="updateFilingDate">Filing / Registration Date</label>
                                    <input id="updateFilingDate" type="date">
                                </div>
                                <div class="form-group">
                                    <label for="updateCourtName">Court Name</label>
                                    <div class="court-input-wrapper">
                                        <select id="updateCourtName" required>
                                            <option value="">-- Select Court --</option>
                                        </select>
                                        <button type="button" id="updateAddCourtBtn" class="mini-court-btn" title="Add Court">+</button>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="updatePlaintiff">Plaintiff</label>
                                    <input id="updatePlaintiff" type="text" placeholder="Enter Plaintiff Name" required>
                                </div>
                                <div class="form-group">
                                    <label for="updateDefendant">Defendant</label>
                                    <input id="updateDefendant" type="text" placeholder="Enter Defendant Name" required>
                                </div>

                                <!-- Parties / Co-Parties Remark (Positioned right beneath Plaintiff & Defendant) -->
                                <div id="updateCaseRemarkWrapper" style="grid-column: 1 / -1;" class="remarks-coparties-box">
                                    <div class="remarks-box-header">
                                        <div class="remarks-box-title-wrap">
                                            <span class="remarks-box-icon">👥</span>
                                            <label for="updateCaseRemark" class="remarks-box-label">Parties / Co-Parties Remark (सह-पक्षकार विवरण / अन्य पक्षकार)</label>
                                        </div>
                                        <span class="remarks-searchable-badge">🔍 Live Searchable in Portal</span>
                                    </div>
                                    <div class="remarks-quick-chips">
                                        <span class="remarks-chip-btn" onclick="insertRemarkChip('updateCaseRemark', 'Co-Plaintiffs: ')">➕ Co-Plaintiffs</span>
                                        <span class="remarks-chip-btn" onclick="insertRemarkChip('updateCaseRemark', 'Co-Defendants: ')">➕ Co-Defendants</span>
                                        <span class="remarks-chip-btn" onclick="insertRemarkChip('updateCaseRemark', 'Co-Accused: ')">➕ Co-Accused</span>
                                        <span class="remarks-chip-btn" onclick="insertRemarkChip('updateCaseRemark', 'Opposite Parties: ')">➕ Opposite Parties</span>
                                        <span class="remarks-chip-btn" onclick="insertRemarkChip('updateCaseRemark', 'State & Ors.')">➕ State &amp; Ors.</span>
                                    </div>
                                    <textarea id="updateCaseRemark" rows="2" placeholder="e.g. Co-Plaintiffs: 1. Ramesh Kumar, 2. Suresh Kumar; Co-Defendants: 1. State of U.P., 2. Tehsildar Sadar..."></textarea>
                                    <div class="remarks-box-footer">
                                        <span class="remarks-box-tip">💡 <b>Multiple Parties:</b> Use this remark field to record all additional parties, co-plaintiffs, co-defendants, or co-accused in this matter.</span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="updateClientName">Client Name</label>
                                    <input id="updateClientName" type="text" placeholder="Enter Client Name" required>
                                </div>
                                <div class="form-group">
                                    <label for="updateClientNumber">Client Number</label>
                                    <input id="updateClientNumber" type="tel" placeholder="Enter Client Number" required>
                                </div>
                                <div class="form-group" style="grid-column: 1 / -1;">
                                    <label for="updateCaseDocLink">Document / Order Sheet Link (Drive/PDF URL)</label>
                                    <input id="updateCaseDocLink" type="url" placeholder="https://drive.google.com/... or document URL">
                                </div>
                                <div class="form-group" style="grid-column: 1 / -1;">
                                    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:14px;">
                                        <div>
                                            <label for="updateNextHearingDate" style="display:flex; align-items:center; gap:6px;">
                                                📅 Fix Next Hearing Date
                                                <span style="font-size:11px; font-weight:500; color:#64748b; background:#fef3c7; border:1px solid #fde68a; padding:2px 7px; border-radius:5px;">Correct a wrong date</span>
                                            </label>
                                            <input id="updateNextHearingDate" type="date" placeholder="Leave blank to keep existing date">
                                            <small style="display:block; margin-top:4px; color:#64748b;">Leave blank to keep the existing next hearing date unchanged.</small>
                                        </div>
                                        <div>
                                            <label for="updateNextHearingProcess">Hearing Stage / Purpose</label>
                                            <input id="updateNextHearingProcess" type="text" placeholder="e.g. Evidence, Arguments, Framing Charge...">
                                            <small style="display:block; margin-top:4px; color:#64748b;">Update the current procedural stage or purpose.</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Update State Cases Form (Criminal / FIR / State of U.P.) -->
                        <div id="updateStateCaseForm" class="case-form-panel hidden-case-form">
                            <div class="form-grid-2col">
                                <div class="form-group">
                                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                                        <label for="updateStateCaseNumber" style="margin-bottom:0;">Case Number 🔒</label>
                                        <button type="button" class="unlock-case-btn" data-targets="updateStateCaseNumber,updateStateCrimeYear" onclick="toggleCaseNumberUnlock(this)" title="Click to unlock and correct Case Number or Year"><i class="fa-solid fa-lock"></i> <span>Unlock</span></button>
                                    </div>
                                    <input id="updateStateCaseNumber" type="text" placeholder="Case Number" readonly class="locked-input case-number-input" data-uppercase="true">
                                </div>
                                <div class="form-group">
                                    <label for="updateStateCrimeYear">Crime / Case Year 🔒</label>
                                    <input id="updateStateCrimeYear" type="number" placeholder="Year" readonly class="locked-input">
                                </div>
                                <div class="form-group">
                                    <label for="updateStateFilingDate">Filing / Charge Sheet Date</label>
                                    <input id="updateStateFilingDate" type="date">
                                </div>
                                <div class="form-group">
                                    <label for="updateStateCrimeNumber">Crime / FIR Number</label>
                                    <input id="updateStateCrimeNumber" type="text" placeholder="Enter Crime Number">
                                </div>
                                <div class="form-group">
                                    <label for="updateStatePoliceStation">Police Station / Thana</label>
                                    <select id="updateStatePoliceStation">
                                        <option value="">-- Select Police Station --</option>
                                        <option value="Kotwali Sadar (Main town)">Kotwali Sadar (Main town)</option>
                                        <option value="Kheri">Kheri</option>
                                        <option value="Mahila Thana (Women's police station)">Mahila Thana (Women's police station)</option>
                                        <option value="Kotwali Gola (Gola Gokarannath)">Kotwali Gola (Gola Gokarannath)</option>
                                        <option value="Kotwali Gauriphanta">Kotwali Gauriphanta</option>
                                        <option value="Kotwali Chandan Chauki">Kotwali Chandan Chauki</option>
                                        <option value="Ishanagar">Ishanagar</option>
                                        <option value="Kotwali Dhaurahara">Kotwali Dhaurahara</option>
                                        <option value="Nighasan">Nighasan</option>
                                        <option value="Neemgaon">Neemgaon</option>
                                        <option value="Palia Kalan">Palia Kalan</option>
                                        <option value="Pasgawan">Pasgawan</option>
                                        <option value="Phoolbehar">Phoolbehar</option>
                                        <option value="Phardhan">Phardhan</option>
                                        <option value="Bhira (Bheera)">Bhira (Bheera)</option>
                                        <option value="Maigalganj">Maigalganj</option>
                                        <option value="Mailani">Mailani</option>
                                        <option value="Mitauli">Mitauli</option>
                                        <option value="Kotwali Mohammadi">Kotwali Mohammadi</option>
                                        <option value="Thana Sampurna Nagar">Thana Sampurna Nagar</option>
                                        <option value="Singahi">Singahi</option>
                                        <option value="Hyderabad">Hyderabad</option>
                                        <option value="Kotwali Tikoniya">Kotwali Tikoniya</option>
                                        <option value="Other">Other / Outside District</option>
                                    </select>
                                    <input type="text" id="updateStatePoliceStationCustom" placeholder="✍️ Specify other Police Station name..." style="display:none; margin-top:8px; border:1.5px solid #2563eb; background:#f0f7ff;">
                                </div>
                                <div class="form-group">
                                    <label for="updateStateCrimeSection">Section (IPC / BNS)</label>
                                    <input id="updateStateCrimeSection" type="text" placeholder="e.g. IPC 302, 307">
                                </div>
                                <div class="form-group">
                                    <label for="updateStateFirstParty">First Party (Prosecution)</label>
                                    <input id="updateStateFirstParty" type="text" placeholder="State of U.P.">
                                </div>
                                <div class="form-group">
                                    <label for="updateStateAccusedName">Accused Name</label>
                                    <input id="updateStateAccusedName" type="text" placeholder="Enter Accused Name">
                                </div>
                                <div class="form-group">
                                    <label for="updateStateCourtName">Court</label>
                                    <div class="court-input-wrapper">
                                        <select id="updateStateCourtName">
                                            <option value="">-- Select Court --</option>
                                        </select>
                                        <button type="button" id="updateAddStateCourtBtn" class="mini-court-btn" title="Add Court">+</button>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="updateStateClientName">Client Name</label>
                                    <input id="updateStateClientName" type="text" placeholder="Enter Client Name">
                                </div>
                                <div class="form-group">
                                    <label for="updateStateClientNumber">Client Number</label>
                                    <input id="updateStateClientNumber" type="tel" placeholder="Enter Client Number">
                                </div>
                                <div class="form-group" style="grid-column: 1 / -1;">
                                    <label for="updateStateDocLink">Document / Order Sheet Link (Drive/PDF URL)</label>
                                    <input id="updateStateDocLink" type="url" placeholder="https://drive.google.com/... or document URL">
                                </div>
                                <div class="form-group" style="grid-column: 1 / -1;">
                                    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:14px;">
                                        <div>
                                            <label for="updateStateNextHearingDate" style="display:flex; align-items:center; gap:6px;">
                                                📅 Fix Next Hearing Date
                                                <span style="font-size:11px; font-weight:500; color:#64748b; background:#fef3c7; border:1px solid #fde68a; padding:2px 7px; border-radius:5px;">Correct a wrong date</span>
                                            </label>
                                            <input id="updateStateNextHearingDate" type="date">
                                            <small style="display:block; margin-top:4px; color:#64748b;">Leave blank to keep the existing next hearing date unchanged.</small>
                                        </div>
                                        <div>
                                            <label for="updateStateNextHearingProcess">Hearing Stage / Purpose</label>
                                            <input id="updateStateNextHearingProcess" type="text" placeholder="e.g. Prosecution Evidence, 313 CrPC, Bail Hearing...">
                                            <small style="display:block; margin-top:4px; color:#64748b;">Update the current procedural stage or purpose.</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Update Family Cases Form (Matrimonial / Maintenance 125) -->
                        <div id="updateFamilyCaseForm" class="case-form-panel hidden-case-form">
                            <div class="form-grid-2col">
                                <div class="form-group">
                                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                                        <label for="updateFamilyCaseNumber" style="margin-bottom:0;">Case Number 🔒</label>
                                        <button type="button" class="unlock-case-btn" data-targets="updateFamilyCaseNumber,updateFamilyCaseYear" onclick="toggleCaseNumberUnlock(this)" title="Click to unlock and correct Case Number or Year"><i class="fa-solid fa-lock"></i> <span>Unlock</span></button>
                                    </div>
                                    <input id="updateFamilyCaseNumber" type="text" placeholder="Case Number" readonly class="locked-input case-number-input" data-uppercase="true">
                                </div>
                                <div class="form-group">
                                    <label for="updateFamilyCaseYear">Year 🔒</label>
                                    <input id="updateFamilyCaseYear" type="number" placeholder="Year" readonly class="locked-input">
                                </div>
                                <div class="form-group">
                                    <label for="updateFamilyFilingDate">Filing / Institution Date</label>
                                    <input id="updateFamilyFilingDate" type="date">
                                </div>
                                <div class="form-group">
                                    <label for="updateFamilyMatterType">Dispute / Matter Type</label>
                                    <select id="updateFamilyMatterType">
                                        <option value="Maintenance (Sec 125 CrPC)">Maintenance (Sec 125 CrPC / Sec 144 BNSS)</option>
                                        <option value="Divorce (Sec 13 HMA)">Divorce Petition (Sec 13 HMA)</option>
                                        <option value="Restitution of Conjugal Rights (Sec 9 HMA)">Restitution of Conjugal Rights (Sec 9 HMA)</option>
                                        <option value="Domestic Violence (DV Act)">Domestic Violence (DV Act 2005)</option>
                                        <option value="Child Custody / Guardianship">Child Custody / Guardianship Act</option>
                                        <option value="Mutual Divorce (Sec 13B HMA)">Mutual Divorce (Sec 13B HMA)</option>
                                        <option value="Other Family Dispute">Other Family Dispute</option>
                                    </select>
                                    <input type="text" id="updateFamilyMatterTypeCustom" placeholder="✍️ Specify other family dispute type..." style="display:none; margin-top:8px; border:1.5px solid #2563eb; background:#f0f7ff;">
                                </div>
                                <div class="form-group">
                                    <label for="updateFamilyPetitioner">Petitioner / Applicant</label>
                                    <input id="updateFamilyPetitioner" type="text" placeholder="Enter Petitioner Name">
                                </div>
                                <div class="form-group">
                                    <label for="updateFamilyRespondent">Respondent / Opposite Party</label>
                                    <input id="updateFamilyRespondent" type="text" placeholder="Enter Respondent Name">
                                </div>
                                <div class="form-group">
                                    <label for="updateFamilyMarriageDate">Marriage Date</label>
                                    <input id="updateFamilyMarriageDate" type="date">
                                </div>
                                <div class="form-group">
                                    <label for="updateFamilyMaintenance">Maintenance Detail</label>
                                    <input id="updateFamilyMaintenance" type="text" placeholder="e.g. ₹15,000/month">
                                </div>
                                <div class="form-group">
                                    <label for="updateFamilyCourtName">Family Court</label>
                                    <div class="court-input-wrapper">
                                        <select id="updateFamilyCourtName">
                                            <option value="">-- Select Court --</option>
                                        </select>
                                        <button type="button" id="updateAddFamilyCourtBtn" class="mini-court-btn" title="Add Court">+</button>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="updateFamilyClientName">Client Name</label>
                                    <input id="updateFamilyClientName" type="text" placeholder="Enter Client Name">
                                </div>
                                <div class="form-group">
                                    <label for="updateFamilyClientNumber">Client Number</label>
                                    <input id="updateFamilyClientNumber" type="tel" placeholder="Enter Client Phone">
                                </div>
                                <div class="form-group" style="grid-column: 1 / -1;">
                                    <label for="updateFamilyDocLink">Document / Order Sheet Link (Drive/PDF URL)</label>
                                    <input id="updateFamilyDocLink" type="url" placeholder="https://drive.google.com/... or document URL">
                                </div>
                                <div class="form-group" style="grid-column: 1 / -1;">
                                    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:14px;">
                                        <div>
                                            <label for="updateFamilyNextHearingDate" style="display:flex; align-items:center; gap:6px;">
                                                📅 Fix Next Hearing Date
                                                <span style="font-size:11px; font-weight:500; color:#64748b; background:#fef3c7; border:1px solid #fde68a; padding:2px 7px; border-radius:5px;">Correct a wrong date</span>
                                            </label>
                                            <input id="updateFamilyNextHearingDate" type="date">
                                            <small style="display:block; margin-top:4px; color:#64748b;">Leave blank to keep the existing next hearing date unchanged.</small>
                                        </div>
                                        <div>
                                            <label for="updateFamilyNextHearingProcess">Hearing Stage / Purpose</label>
                                            <input id="updateFamilyNextHearingProcess" type="text" placeholder="e.g. Reconciliation / Mediation, Evidence, Interim Maintenance...">
                                            <small style="display:block; margin-top:4px; color:#64748b;">Update the current procedural stage or purpose.</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Update Revenue Cases Form (Land / Tehsil / UP Revenue Code) -->
                        <div id="updateRevenueCaseForm" class="case-form-panel hidden-case-form">
                            <div class="form-grid-2col">
                                <div class="form-group">
                                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                                        <label for="updateRevenueCaseNumber" style="margin-bottom:0;">Case Number 🔒</label>
                                        <button type="button" class="unlock-case-btn" data-targets="updateRevenueCaseNumber,updateRevenueCaseYear" onclick="toggleCaseNumberUnlock(this)" title="Click to unlock and correct Case Number or Year"><i class="fa-solid fa-lock"></i> <span>Unlock</span></button>
                                    </div>
                                    <input id="updateRevenueCaseNumber" type="text" placeholder="Case Number" readonly class="locked-input case-number-input" data-uppercase="true">
                                </div>
                                <div class="form-group">
                                    <label for="updateRevenueCaseYear">Year 🔒</label>
                                    <input id="updateRevenueCaseYear" type="number" placeholder="Year" readonly class="locked-input">
                                </div>
                                <div class="form-group">
                                    <label for="updateRevenueFilingDate">Filing / Dakhil Date</label>
                                    <input id="updateRevenueFilingDate" type="date">
                                </div>
                                <div class="form-group">
                                    <label for="updateRevenueActSection">Revenue Act &amp; Section</label>
                                    <select id="updateRevenueActSection">
                                        <option value="Sec 34 (Mutation / दाखिल खारिज)">Sec 34 (Mutation / दाखिल खारिज)</option>
                                        <option value="Sec 24 (Demarcation / पत्थरगड्डी)">Sec 24 (Demarcation / पैमाइश / पत्थरगड्डी)</option>
                                        <option value="Sec 116 (Partition / कुर्रा बटवारा)">Sec 116 (Partition / कुर्रा बटवारा)</option>
                                        <option value="Sec 67 (Eviction Gaon Sabha Land)">Sec 67 (Gram Sabha Encroachment / बेदखली)</option>
                                        <option value="Sec 80 (Non-Agricultural Declaration)">Sec 80 (Non-Agri 143 Declaration)</option>
                                        <option value="Sec 144 (Declaratory Suit / घोषणात्मक वाद)">Sec 144 (Declaratory Suit / घोषणात्मक वाद)</option>
                                        <option value="Sec 38 (Correction of Revenue Map/Record)">Sec 38 (Map / Khatauni Record Correction)</option>
                                        <option value="Other Revenue Section">Other Revenue Section</option>
                                    </select>
                                    <input type="text" id="updateRevenueActSectionCustom" placeholder="✍️ Specify other revenue act / section..." style="display:none; margin-top:8px; border:1.5px solid #2563eb; background:#f0f7ff;">
                                </div>
                                <div class="form-group">
                                    <label for="updateRevenueVillage">Village / Mauja (मौजा / ग्राम)</label>
                                    <input id="updateRevenueVillage" type="text" placeholder="e.g. Kalyanpur">
                                </div>
                                <div class="form-group">
                                    <label for="updateRevenueTehsil">Tehsil / Pargana (तहसील)</label>
                                    <input id="updateRevenueTehsil" type="text" placeholder="e.g. Tehsil Sadar">
                                </div>
                                <div class="form-group">
                                    <label for="updateRevenueGataNo">Gata / Khasra No. &amp; Khatauni</label>
                                    <input id="updateRevenueGataNo" type="text" placeholder="e.g. Gata 245/1">
                                </div>
                                <div class="form-group">
                                    <label for="updateRevenueApplicant">Applicant / Plaintiff (वादी)</label>
                                    <input id="updateRevenueApplicant" type="text" placeholder="Enter Applicant Name">
                                </div>
                                <div class="form-group">
                                    <label for="updateRevenueOppositeParty">Opposite Party / Gaon Sabha (प्रतिवादी)</label>
                                    <input id="updateRevenueOppositeParty" type="text" placeholder="Enter Opposite Party">
                                </div>
                                <div class="form-group">
                                    <label for="updateRevenueCourtName">Revenue Court</label>
                                    <div class="court-input-wrapper">
                                        <select id="updateRevenueCourtName">
                                            <option value="">-- Select Court --</option>
                                        </select>
                                        <button type="button" id="updateAddRevenueCourtBtn" class="mini-court-btn" title="Add Court">+</button>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="updateRevenueClientName">Client Name</label>
                                    <input id="updateRevenueClientName" type="text" placeholder="Enter Client Name">
                                </div>
                                <div class="form-group">
                                    <label for="updateRevenueClientNumber">Client Number</label>
                                    <input id="updateRevenueClientNumber" type="tel" placeholder="Enter Client Phone">
                                </div>
                                <div class="form-group" style="grid-column: 1 / -1;">
                                    <label for="updateRevenueDocLink">Document / Order Sheet Link (Drive/PDF URL)</label>
                                    <input id="updateRevenueDocLink" type="url" placeholder="https://drive.google.com/... or document URL">
                                </div>
                                <div class="form-group" style="grid-column: 1 / -1;">
                                    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:14px;">
                                        <div>
                                            <label for="updateRevenueNextHearingDate" style="display:flex; align-items:center; gap:6px;">
                                                📅 Fix Next Hearing Date
                                                <span style="font-size:11px; font-weight:500; color:#64748b; background:#fef3c7; border:1px solid #fde68a; padding:2px 7px; border-radius:5px;">Correct a wrong date</span>
                                            </label>
                                            <input id="updateRevenueNextHearingDate" type="date">
                                            <small style="display:block; margin-top:4px; color:#64748b;">Leave blank to keep the existing next hearing date unchanged.</small>
                                        </div>
                                        <div>
                                            <label for="updateRevenueNextHearingProcess">Hearing Stage / Purpose</label>
                                            <input id="updateRevenueNextHearingProcess" type="text" placeholder="e.g. Lekhpal Report, Objection / आपत्ति, Arguments...">
                                            <small style="display:block; margin-top:4px; color:#64748b;">Update the current procedural stage or purpose.</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Update Misc Civil Cases Form -->
                        <div id="updateMiscCivilCaseForm" class="case-form-panel hidden-case-form">
                            <div class="form-grid-2col">
                                <div class="form-group">
                                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                                        <label for="updateMiscCivilCaseNumber" style="margin-bottom:0;">Case Number 🔒</label>
                                        <button type="button" class="unlock-case-btn" data-targets="updateMiscCivilCaseNumber,updateMiscCivilCaseYear" onclick="toggleCaseNumberUnlock(this)" title="Click to unlock and correct Case Number or Year"><i class="fa-solid fa-lock"></i> <span>Unlock</span></button>
                                    </div>
                                    <input id="updateMiscCivilCaseNumber" type="text" placeholder="Case Number" readonly class="locked-input case-number-input" data-uppercase="true">
                                </div>
                                <div class="form-group">
                                    <label for="updateMiscCivilCaseYear">Year 🔒</label>
                                    <input id="updateMiscCivilCaseYear" type="number" placeholder="Year" readonly class="locked-input">
                                </div>
                                <div class="form-group">
                                    <label for="updateMiscCivilFilingDate">Filing / Application Date</label>
                                    <input id="updateMiscCivilFilingDate" type="date">
                                </div>
                                <div class="form-group">
                                    <label for="updateMiscCivilOriginalCase">Original / Main Suit Number</label>
                                    <input id="updateMiscCivilOriginalCase" type="text" class="case-number-input" data-uppercase="true" placeholder="e.g. OS No. 45/2024">
                                </div>
                                <div class="form-group">
                                    <label for="updateMiscCivilProceedingType">Proceeding / Application Type</label>
                                    <select id="updateMiscCivilProceedingType">
                                        <option value="Temporary Injunction (Order 39 Rule 1 & 2 CPC)">Temporary Injunction (Order 39 Rule 1 &amp; 2 CPC)</option>
                                        <option value="Restoration Application (Order 9 Rule 13 / Rule 9 CPC)">Restoration (Order 9 Rule 13 / Rule 9 CPC)</option>
                                        <option value="Civil Appeal (Sec 96 CPC)">Civil Appeal (Sec 96 CPC)</option>
                                        <option value="Civil Revision (Sec 115 CPC)">Civil Revision (Sec 115 CPC)</option>
                                        <option value="Execution Application (Order 21 CPC)">Execution Petition (Order 21 CPC)</option>
                                        <option value="Review Application (Order 47 CPC / Sec 114)">Review Application (Order 47 CPC)</option>
                                        <option value="Misc Civil Appeal (Order 43 Rule 1 CPC)">Misc Civil Appeal (Order 43 CPC)</option>
                                        <option value="Other Misc Application">Other Misc Application</option>
                                    </select>
                                    <input type="text" id="updateMiscCivilProceedingTypeCustom" placeholder="✍️ Specify other application / proceeding type..." style="display:none; margin-top:8px; border:1.5px solid #2563eb; background:#f0f7ff;">
                                </div>
                                <div class="form-group">
                                    <label for="updateMiscCivilApplicant">Applicant / Appellant / Revisionist</label>
                                    <input id="updateMiscCivilApplicant" type="text" placeholder="Enter Applicant Name">
                                </div>
                                <div class="form-group">
                                    <label for="updateMiscCivilOppositeParty">Opposite Party / Respondent</label>
                                    <input id="updateMiscCivilOppositeParty" type="text" placeholder="Enter Opposite Party Name">
                                </div>
                                <div class="form-group">
                                    <label for="updateMiscCivilCourtName">Court</label>
                                    <div class="court-input-wrapper">
                                        <select id="updateMiscCivilCourtName">
                                            <option value="">-- Select Court --</option>
                                        </select>
                                        <button type="button" id="updateAddMiscCivilCourtBtn" class="mini-court-btn" title="Add Court">+</button>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="updateMiscCivilClientName">Client Name</label>
                                    <input id="updateMiscCivilClientName" type="text" placeholder="Enter Client Name">
                                </div>
                                <div class="form-group">
                                    <label for="updateMiscCivilClientNumber">Client Number</label>
                                    <input id="updateMiscCivilClientNumber" type="tel" placeholder="Enter Client Phone">
                                </div>
                                <div class="form-group" style="grid-column: 1 / -1;">
                                    <label for="updateMiscCivilDocLink">Document / Order Sheet Link (Drive/PDF URL)</label>
                                    <input id="updateMiscCivilDocLink" type="url" placeholder="https://drive.google.com/... or document URL">
                                </div>
                                <div class="form-group" style="grid-column: 1 / -1;">
                                    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:14px;">
                                        <div>
                                            <label for="updateMiscCivilNextHearingDate" style="display:flex; align-items:center; gap:6px;">
                                                📅 Fix Next Hearing Date
                                                <span style="font-size:11px; font-weight:500; color:#64748b; background:#fef3c7; border:1px solid #fde68a; padding:2px 7px; border-radius:5px;">Correct a wrong date</span>
                                            </label>
                                            <input id="updateMiscCivilNextHearingDate" type="date">
                                            <small style="display:block; margin-top:4px; color:#64748b;">Leave blank to keep the existing next hearing date unchanged.</small>
                                        </div>
                                        <div>
                                            <label for="updateMiscCivilNextHearingProcess">Hearing Stage / Purpose</label>
                                            <input id="updateMiscCivilNextHearingProcess" type="text" placeholder="e.g. Hearing on Injunction 39/1, Disposal...">
                                            <small style="display:block; margin-top:4px; color:#64748b;">Update the current procedural stage or purpose.</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Update Misc Criminal Cases Form -->
                        <div id="updateMiscCriminalCaseForm" class="case-form-panel hidden-case-form">
                            <div class="form-grid-2col">
                                <div class="form-group">
                                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                                        <label for="updateMiscCriminalCaseNumber" style="margin-bottom:0;">Case Number 🔒</label>
                                        <button type="button" class="unlock-case-btn" data-targets="updateMiscCriminalCaseNumber,updateMiscCriminalCaseYear" onclick="toggleCaseNumberUnlock(this)" title="Click to unlock and correct Case Number or Year"><i class="fa-solid fa-lock"></i> <span>Unlock</span></button>
                                    </div>
                                    <input id="updateMiscCriminalCaseNumber" type="text" placeholder="Case Number" readonly class="locked-input case-number-input" data-uppercase="true">
                                </div>
                                <div class="form-group">
                                    <label for="updateMiscCriminalCaseYear">Year 🔒</label>
                                    <input id="updateMiscCriminalCaseYear" type="number" placeholder="Year" readonly class="locked-input">
                                </div>
                                <div class="form-group">
                                    <label for="updateMiscCriminalFilingDate">Filing / Bail Date</label>
                                    <input id="updateMiscCriminalFilingDate" type="date">
                                </div>
                                <div class="form-group">
                                    <label for="updateMiscCriminalOriginalCase">Original ST / Crime / FIR Number</label>
                                    <input id="updateMiscCriminalOriginalCase" type="text" class="case-number-input" data-uppercase="true" placeholder="e.g. Crime No. 210/2026">
                                </div>
                                <div class="form-group">
                                    <label for="updateMiscCriminalProceedingType">Application / Proceeding Type</label>
                                    <select id="updateMiscCriminalProceedingType">
                                        <option value="Regular Bail (Sec 439 CrPC / Sec 483 BNSS)">Regular Bail (Sec 439 CrPC / Sec 483 BNSS)</option>
                                        <option value="Anticipatory Bail (Sec 438 CrPC / Sec 482 BNSS)">Anticipatory Bail (Sec 438 CrPC / Sec 482 BNSS)</option>
                                        <option value="Criminal Appeal (Sec 374 CrPC / Sec 415 BNSS)">Criminal Appeal (Sec 374 CrPC / Sec 415 BNSS)</option>
                                        <option value="Criminal Revision (Sec 397/401 CrPC)">Criminal Revision (Sec 397/401 CrPC)</option>
                                        <option value="Application u/s 156(3) CrPC / Sec 175(3) BNSS">Application u/s 156(3) CrPC (FIR Order)</option>
                                        <option value="Criminal Misc Application (Sec 482 CrPC)">Criminal Misc Application (Sec 482 CrPC)</option>
                                        <option value="Other Criminal Application">Other Criminal Application</option>
                                    </select>
                                    <input type="text" id="updateMiscCriminalProceedingTypeCustom" placeholder="✍️ Specify other application / proceeding type..." style="display:none; margin-top:8px; border:1.5px solid #2563eb; background:#f0f7ff;">
                                </div>
                                <div class="form-group">
                                    <label for="updateMiscCriminalPoliceStation">Police Station / Thana</label>
                                    <select id="updateMiscCriminalPoliceStation">
                                        <option value="">-- Select Police Station --</option>
                                        <option value="Kotwali Sadar (Main town)">Kotwali Sadar (Main town)</option>
                                        <option value="Kheri">Kheri</option>
                                        <option value="Mahila Thana (Women's police station)">Mahila Thana (Women's police station)</option>
                                        <option value="Kotwali Gola (Gola Gokarannath)">Kotwali Gola (Gola Gokarannath)</option>
                                        <option value="Kotwali Gauriphanta">Kotwali Gauriphanta</option>
                                        <option value="Kotwali Chandan Chauki">Kotwali Chandan Chauki</option>
                                        <option value="Ishanagar">Ishanagar</option>
                                        <option value="Kotwali Dhaurahara">Kotwali Dhaurahara</option>
                                        <option value="Nighasan">Nighasan</option>
                                        <option value="Neemgaon">Neemgaon</option>
                                        <option value="Palia Kalan">Palia Kalan</option>
                                        <option value="Pasgawan">Pasgawan</option>
                                        <option value="Phoolbehar">Phoolbehar</option>
                                        <option value="Phardhan">Phardhan</option>
                                        <option value="Bhira (Bheera)">Bhira (Bheera)</option>
                                        <option value="Maigalganj">Maigalganj</option>
                                        <option value="Mailani">Mailani</option>
                                        <option value="Mitauli">Mitauli</option>
                                        <option value="Kotwali Mohammadi">Kotwali Mohammadi</option>
                                        <option value="Thana Sampurna Nagar">Thana Sampurna Nagar</option>
                                        <option value="Singahi">Singahi</option>
                                        <option value="Hyderabad">Hyderabad</option>
                                        <option value="Kotwali Tikoniya">Kotwali Tikoniya</option>
                                        <option value="Other">Other / Outside District</option>
                                    </select>
                                    <input type="text" id="updateMiscCriminalPoliceStationCustom" placeholder="✍️ Specify other Police Station name..." style="display:none; margin-top:8px; border:1.5px solid #2563eb; background:#f0f7ff;">
                                </div>
                                <div class="form-group">
                                    <label for="updateMiscCriminalCrimeSection">Section (IPC / BNS / Act)</label>
                                    <input id="updateMiscCriminalCrimeSection" type="text" placeholder="e.g. IPC 307, 323">
                                </div>
                                <div class="form-group">
                                    <label for="updateMiscCriminalApplicant">Applicant / Accused / Appellant</label>
                                    <input id="updateMiscCriminalApplicant" type="text" placeholder="Enter Applicant Name">
                                </div>
                                <div class="form-group">
                                    <label for="updateMiscCriminalOppositeParty">Opposite Party (Prosecution / Complainant)</label>
                                    <input id="updateMiscCriminalOppositeParty" type="text" placeholder="State of U.P.">
                                </div>
                                <div class="form-group">
                                    <label for="updateMiscCriminalCourtName">Court</label>
                                    <div class="court-input-wrapper">
                                        <select id="updateMiscCriminalCourtName">
                                            <option value="">-- Select Court --</option>
                                        </select>
                                        <button type="button" id="updateAddMiscCriminalCourtBtn" class="mini-court-btn" title="Add Court">+</button>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="updateMiscCriminalClientName">Client Name</label>
                                    <input id="updateMiscCriminalClientName" type="text" placeholder="Enter Client Name">
                                </div>
                                <div class="form-group">
                                    <label for="updateMiscCriminalClientNumber">Client Number</label>
                                    <input id="updateMiscCriminalClientNumber" type="tel" placeholder="Enter Client Phone">
                                </div>
                                <div class="form-group" style="grid-column: 1 / -1;">
                                    <label for="updateMiscCriminalDocLink">Document / Order Sheet Link (Drive/PDF URL)</label>
                                    <input id="updateMiscCriminalDocLink" type="url" placeholder="https://drive.google.com/... or document URL">
                                </div>
                                <div class="form-group" style="grid-column: 1 / -1;">
                                    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:14px;">
                                        <div>
                                            <label for="updateMiscCriminalNextHearingDate" style="display:flex; align-items:center; gap:6px;">
                                                📅 Fix Next Hearing Date
                                                <span style="font-size:11px; font-weight:500; color:#64748b; background:#fef3c7; border:1px solid #fde68a; padding:2px 7px; border-radius:5px;">Correct a wrong date</span>
                                            </label>
                                            <input id="updateMiscCriminalNextHearingDate" type="date">
                                            <small style="display:block; margin-top:4px; color:#64748b;">Leave blank to keep the existing next hearing date unchanged.</small>
                                        </div>
                                        <div>
                                            <label for="updateMiscCriminalNextHearingProcess">Hearing Stage / Purpose</label>
                                            <input id="updateMiscCriminalNextHearingProcess" type="text" placeholder="e.g. Case Diary Call, Bail Arguments, Order...">
                                            <small style="display:block; margin-top:4px; color:#64748b;">Update the current procedural stage or purpose.</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Update Complaint Cases Form -->
                        <div id="updateComplaintCaseForm" class="case-form-panel hidden-case-form">
                            <div class="form-grid-2col">
                                <div class="form-group">
                                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                                        <label for="updateComplaintCaseNumber" style="margin-bottom:0;">Case Number 🔒</label>
                                        <button type="button" class="unlock-case-btn" data-targets="updateComplaintCaseNumber,updateComplaintCaseYear" onclick="toggleCaseNumberUnlock(this)" title="Click to unlock and correct Case Number or Year"><i class="fa-solid fa-lock"></i> <span>Unlock</span></button>
                                    </div>
                                    <input id="updateComplaintCaseNumber" type="text" placeholder="Case Number" readonly class="locked-input case-number-input" data-uppercase="true">
                                </div>
                                <div class="form-group">
                                    <label for="updateComplaintCaseYear">Year 🔒</label>
                                    <input id="updateComplaintCaseYear" type="number" placeholder="Year" readonly class="locked-input">
                                </div>
                                <div class="form-group">
                                    <label for="updateComplaintFilingDate">Filing / Presentation Date</label>
                                    <input id="updateComplaintFilingDate" type="date">
                                </div>
                                <div class="form-group">
                                    <label for="updateComplaintType">Complaint / Matter Type</label>
                                    <select id="updateComplaintType">
                                        <option value="Cheque Bounce (Sec 138 NI Act)">Cheque Bounce (Sec 138 NI Act)</option>
                                        <option value="Private Criminal Complaint (Sec 200 CrPC / Sec 223 BNSS)">Private Criminal Complaint (Sec 200 CrPC / 223 BNSS)</option>
                                        <option value="Defamation (Sec 500 IPC / Sec 356 BNS)">Defamation (Sec 500 IPC / 356 BNS)</option>
                                        <option value="Cheating & Fraud (Sec 420 IPC / Sec 318 BNS)">Cheating &amp; Fraud (Sec 420 IPC)</option>
                                        <option value="Domestic / Harassment Complaint">Domestic / Harassment Complaint</option>
                                        <option value="Labour / Industrial Dispute Complaint">Labour / Industrial Dispute Complaint</option>
                                        <option value="Consumer Protection Complaint">Consumer Protection Complaint</option>
                                        <option value="Other Complaint">Other Complaint</option>
                                    </select>
                                    <input type="text" id="updateComplaintTypeCustom" placeholder="✍️ Specify other complaint type..." style="display:none; margin-top:8px; border:1.5px solid #2563eb; background:#f0f7ff;">
                                </div>
                                <div class="form-group">
                                    <label for="updateComplaintSectionAct">Sections &amp; Acts</label>
                                    <input id="updateComplaintSectionAct" type="text" placeholder="e.g. Sec 138 NI Act, Sec 406/420 IPC">
                                </div>
                                <div class="form-group">
                                    <label for="updateComplaintComplainant">Complainant Name (परिवादी)</label>
                                    <input id="updateComplaintComplainant" type="text" placeholder="Enter Complainant Name">
                                </div>
                                <div class="form-group">
                                    <label for="updateComplaintAccusedName">Accused / Opposite Party (विपक्षी / अभियुक्त)</label>
                                    <input id="updateComplaintAccusedName" type="text" placeholder="Enter Accused / Opposite Party Name">
                                </div>
                                <div class="form-group">
                                    <label for="updateComplaintPoliceStation">Police Station / Thana Jurisdiction</label>
                                    <select id="updateComplaintPoliceStation">
                                        <option value="">-- Select Police Station --</option>
                                        <option value="Kotwali Sadar (Main town)">Kotwali Sadar (Main town)</option>
                                        <option value="Kheri">Kheri</option>
                                        <option value="Mahila Thana (Women's police station)">Mahila Thana (Women's police station)</option>
                                        <option value="Kotwali Gola (Gola Gokarannath)">Kotwali Gola (Gola Gokarannath)</option>
                                        <option value="Kotwali Gauriphanta">Kotwali Gauriphanta</option>
                                        <option value="Kotwali Chandan Chauki">Kotwali Chandan Chauki</option>
                                        <option value="Ishanagar">Ishanagar</option>
                                        <option value="Kotwali Dhaurahara">Kotwali Dhaurahara</option>
                                        <option value="Nighasan">Nighasan</option>
                                        <option value="Neemgaon">Neemgaon</option>
                                        <option value="Palia Kalan">Palia Kalan</option>
                                        <option value="Pasgawan">Pasgawan</option>
                                        <option value="Phoolbehar">Phoolbehar</option>
                                        <option value="Phardhan">Phardhan</option>
                                        <option value="Bhira (Bheera)">Bhira (Bheera)</option>
                                        <option value="Maigalganj">Maigalganj</option>
                                        <option value="Mailani">Mailani</option>
                                        <option value="Mitauli">Mitauli</option>
                                        <option value="Kotwali Mohammadi">Kotwali Mohammadi</option>
                                        <option value="Thana Sampurna Nagar">Thana Sampurna Nagar</option>
                                        <option value="Singahi">Singahi</option>
                                        <option value="Hyderabad">Hyderabad</option>
                                        <option value="Kotwali Tikoniya">Kotwali Tikoniya</option>
                                        <option value="Other">Other / Outside District</option>
                                    </select>
                                    <input type="text" id="updateComplaintPoliceStationCustom" placeholder="✍️ Specify other Police Station name..." style="display:none; margin-top:8px; border:1.5px solid #2563eb; background:#f0f7ff;">
                                </div>
                                <div class="form-group">
                                    <label for="updateComplaintCourtName">Court</label>
                                    <div class="court-input-wrapper">
                                        <select id="updateComplaintCourtName">
                                            <option value="">-- Select Court --</option>
                                        </select>
                                        <button type="button" id="updateAddComplaintCourtBtn" class="mini-court-btn" title="Add Court">+</button>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="updateComplaintClientName">Client Name</label>
                                    <input id="updateComplaintClientName" type="text" placeholder="Enter Client Name">
                                </div>
                                <div class="form-group">
                                    <label for="updateComplaintClientNumber">Client Number</label>
                                    <input id="updateComplaintClientNumber" type="tel" placeholder="Enter Client Phone Number">
                                </div>
                                <div class="form-group" style="grid-column: 1 / -1;">
                                    <label for="updateComplaintDocLink">Document / Complaint Copy Link (Drive/PDF URL)</label>
                                    <input id="updateComplaintDocLink" type="url" placeholder="https://drive.google.com/... or document URL">
                                </div>
                                <div class="form-group" style="grid-column: 1 / -1;">
                                    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:14px;">
                                        <div>
                                            <label for="updateComplaintNextHearingDate" style="display:flex; align-items:center; gap:6px;">
                                                📅 Fix Next Hearing Date
                                                <span style="font-size:11px; font-weight:500; color:#64748b; background:#fef3c7; border:1px solid #fde68a; padding:2px 7px; border-radius:5px;">Correct a wrong date</span>
                                            </label>
                                            <input id="updateComplaintNextHearingDate" type="date">
                                            <small style="display:block; margin-top:4px; color:#64748b;">Leave blank to keep the existing next hearing date unchanged.</small>
                                        </div>
                                        <div>
                                            <label for="updateComplaintNextHearingProcess">Hearing Stage / Purpose</label>
                                            <input id="updateComplaintNextHearingProcess" type="text" placeholder="e.g. 200 CrPC Statement, 202 Inquiry, Summoning...">
                                            <small style="display:block; margin-top:4px; color:#64748b;">Update the current procedural stage or purpose.</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button type="submit" class="primary-btn form-submit-btn"><i class="fa-solid fa-paper-plane"></i> Submit Case Updates</button>
                    </form>
                </div>
`;

// ==============================================================================
// Update Case Tab Logic
// ==============================================================================

var setVal = (id, val, customInputId) => {
  const el = document.getElementById(id);
  if (!el) return;
  const customEl = customInputId ? document.getElementById(customInputId) : null;
  if (el.tagName === 'SELECT' && val) {
    let optionExists = false;
    for (let i = 0; i < el.options.length; i++) {
      if (el.options[i].value.toLowerCase() === String(val).toLowerCase() || el.options[i].text.toLowerCase() === String(val).toLowerCase()) {
        el.selectedIndex = i;
        optionExists = true;
        break;
      }
    }
    if (!optionExists) {
      // Check if this select has an "Other" option
      let otherOptionIndex = -1;
      for (let i = 0; i < el.options.length; i++) {
        const optVal = el.options[i].value.toLowerCase();
        if (optVal.startsWith('other') || optVal === 'other') {
          otherOptionIndex = i;
          break;
        }
      }
      if (customEl && otherOptionIndex !== -1) {
        el.selectedIndex = otherOptionIndex;
        customEl.style.display = 'block';
        customEl.value = val;
      } else {
        const opt = document.createElement('option');
        opt.value = val;
        opt.textContent = val;
        el.appendChild(opt);
        el.value = val;
        if (customEl) {
          customEl.style.display = 'none';
          customEl.value = '';
        }
      }
    } else if (customEl) {
      if (el.value.toLowerCase().startsWith('other') || el.value === 'Other') {
        customEl.style.display = 'block';
      } else {
        customEl.style.display = 'none';
        customEl.value = '';
      }
    }
  } else {
    el.value = val || '';
    if (customEl) {
      customEl.style.display = 'none';
      customEl.value = '';
    }
  }
};

function toggleCaseNumberUnlock(btn) {
  if (!btn) return;
  const targetIds = (btn.getAttribute('data-targets') || '').split(',').map(s => s.trim()).filter(Boolean);
  if (!targetIds.length) return;

  const isCurrentlyUnlocked = btn.classList.contains('unlocked');
  if (!isCurrentlyUnlocked) {
    const confirmUnlock = confirm('⚠️ Changing the Case Number or Year modifies the primary case identifier across registers and hearing history. Do you want to unlock these fields for editing?');
    if (!confirmUnlock) return;

    targetIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.removeAttribute('readonly');
        el.classList.remove('locked-input');
        el.classList.add('unlocked-input');
      }
    });
    btn.classList.add('unlocked');
    btn.innerHTML = '<i class="fa-solid fa-lock-open"></i> <span>Lock</span>';
    btn.title = 'Click to re-lock Case Number & Year fields';
  } else {
    targetIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.setAttribute('readonly', 'true');
        el.classList.add('locked-input');
        el.classList.remove('unlocked-input');
      }
    });
    btn.classList.remove('unlocked');
    btn.innerHTML = '<i class="fa-solid fa-lock"></i> <span>Unlock</span>';
    btn.title = 'Click to unlock and correct Case Number or Year';
  }
}
if (typeof toggleCaseNumberUnlock !== 'undefined') window.toggleCaseNumberUnlock = toggleCaseNumberUnlock;

var currentlyLoadedOriginalCaseNo = '';

function loadCaseForUpdate(caseNoToFind) {
  const query = (caseNoToFind || document.getElementById('updateSearchInput')?.value || '').trim().toLowerCase();
  const statusEl = document.getElementById('updateSearchStatus');

  if (!query) {
    if (statusEl) {
      statusEl.textContent = 'Please enter a Case Number, Party Name, or Client Name to search.';
      statusEl.className = 'update-status-msg error';
    }
    return;
  }

  // 1. Check for exact case number match first
  let exactMatch = allCaseRecords.find(c => {
    const num1 = (c.caseNo || '').toLowerCase();
    const num2 = (c.criminalCaseNumber || '').toLowerCase();
    return num1 === query || num2 === query;
  });

  // 2. Filter all potential matches
  const matches = allCaseRecords.filter(c => {
    const num1 = (c.caseNo || '').toLowerCase();
    const num2 = (c.criminalCaseNumber || '').toLowerCase();
    const name = (c.caseName || '').toLowerCase();
    const plaintiff = (c.plaintiff || '').toLowerCase();
    const defendant = (c.defendant || '').toLowerCase();
    const victim = (c.victimName || '').toLowerCase();
    const accused = (c.accusedName || '').toLowerCase();
    const client = (c.clientName || c.criminalClientName || '').toLowerCase();
    return num1 === query || num2 === query || num1.includes(query) || num2.includes(query) ||
           name.includes(query) || (plaintiff && plaintiff.includes(query)) ||
           (defendant && defendant.includes(query)) || (victim && victim.includes(query)) ||
           (accused && accused.includes(query)) || (client && client.includes(query));
  });

  if (!exactMatch && matches.length === 0) {
    if (statusEl) {
      statusEl.textContent = `❌ Case "${query.toUpperCase()}" not found in local or synchronized records.`;
      statusEl.className = 'update-status-msg error';
    }
    return;
  }

  // 3. Multi-match search disambiguation: render candidate list if > 1 match and no direct exact match
  if (!caseNoToFind && !exactMatch && matches.length > 1) {
    if (statusEl) {
      let html = `
        <div class="update-search-candidates">
          <div class="candidate-header">
            <span>🔍 Found ${matches.length} matches for "<em>${escapeHtml(query)}</em>":</span>
            <small style="color:#64748b;">Click a case below to load its details</small>
          </div>
          <div class="candidate-list">
      `;
      matches.slice(0, 10).forEach(m => {
        const cNo = m.caseNo || m.criminalCaseNumber || '—';
        const cName = m.caseName || (m.plaintiff ? `${m.plaintiff} vs ${m.defendant}` : (m.victimName ? `${m.victimName} vs ${m.accusedName}` : '—'));
        const cType = (m.caseType || 'civil').toUpperCase();
        const cCourt = m.courtName || m.criminalCourtName || 'District Court';
        const cHearing = m.nextHearing && m.nextHearing !== '—' ? m.nextHearing : 'Undated';
        const cClient = m.clientName || m.criminalClientName || '—';
        html += `
          <div class="candidate-item" onclick="loadCaseForUpdate('${escapeHtml(cNo)}')">
            <div class="candidate-item-info">
              <div class="candidate-item-title">
                <strong>${escapeHtml(cNo)}</strong>
                <span class="case-badge ${(m.caseType || 'civil').toLowerCase()}" style="font-size:10px; padding:2px 7px; text-transform:uppercase;">${cType}</span>
                <span>${escapeHtml(cName)}</span>
              </div>
              <div class="candidate-item-meta">
                <span>🏛️ ${escapeHtml(cCourt)}</span>
                <span>📅 Next: ${escapeHtml(cHearing)}</span>
                <span>👤 Client: ${escapeHtml(cClient)}</span>
              </div>
            </div>
            <button type="button" class="candidate-select-btn" onclick="event.stopPropagation(); loadCaseForUpdate('${escapeHtml(cNo)}');">Select &amp; Edit ➔</button>
          </div>
        `;
      });
      html += `</div></div>`;
      statusEl.innerHTML = html;
      statusEl.className = 'update-status-msg';
    }
    return;
  }

  const found = exactMatch || matches[0];
  currentlyLoadedOriginalCaseNo = found.caseNo || found.criminalCaseNumber || '';

  // Reset any unlocked inputs and lock buttons back to default locked state
  document.querySelectorAll('.unlock-case-btn').forEach(btn => {
    btn.classList.remove('unlocked');
    btn.innerHTML = '<i class="fa-solid fa-lock"></i> <span>Unlock</span>';
    btn.title = 'Click to unlock and correct Case Number or Year';
  });
  document.querySelectorAll('#updateCaseForm input.unlocked-input').forEach(inp => {
    inp.setAttribute('readonly', 'true');
    inp.classList.add('locked-input');
    inp.classList.remove('unlocked-input');
  });

  const typeDropdown = document.getElementById('updateCaseTypeDropdown');
  const caseType = (found.caseType || 'civil').toLowerCase();
  if (typeDropdown) {
    typeDropdown.value = caseType;
  }
  toggleUpdateCaseFormByType();

  // Load Status and Remark
  const statusSelect = document.getElementById('updateCaseStatus');
  if (statusSelect) {
    const isDisposed = (found.caseStatus || '').toLowerCase().includes('dispose');
    statusSelect.value = isDisposed ? 'Disposed' : 'Pending';
  }
  const remarkInput = document.getElementById('updateCaseRemark');
  if (remarkInput) {
    const r = found.remark || found.remarks || '';
    remarkInput.value = typeof r === 'object' && r !== null ? remarksToPlainText(r) : r;
  }
  const disposalCommentInput = document.getElementById('updateCaseDisposalComment');
  if (disposalCommentInput) {
    disposalCommentInput.value = found.disposalComment || found.disposal_comment || found.disposalRemark || '';
  }
  if (typeof syncDisposalSectionVisibility === 'function') {
    syncDisposalSectionVisibility();
  }

  if (caseType === 'state' || caseType === 'criminal') {
    setVal('updateStateCaseNumber', found.caseNo || found.criminalCaseNumber);
    setVal('updateStateCrimeYear', found.caseYear || found.crimeYear || '2026');
    setVal('updateStateFilingDate', found.filingDate || found.crimeFilingDate);
    setVal('updateStateCrimeNumber', found.crimeNumber);
    setVal('updateStatePoliceStation', found.policeStation, 'updateStatePoliceStationCustom');
    setVal('updateStateCrimeSection', found.crimeSection);
    setVal('updateStateFirstParty', found.firstParty || found.victimName || 'State of U.P.');
    setVal('updateStateAccusedName', found.accusedName || found.defendant);
    setVal('updateStateCourtName', found.courtName || found.criminalCourtName);
    setVal('updateStateClientName', found.clientName || found.criminalClientName);
    setVal('updateStateClientNumber', found.clientNumber || found.criminalClientNumber);
    setVal('updateStateDocLink', found.docLink || '');
    setVal('updateStateNextHearingDate', found.nextHearing && found.nextHearing !== '—' ? found.nextHearing : '');
    setVal('updateStateNextHearingProcess', found.hearingProcess || found.stage || '');
  } else if (caseType === 'family') {
    setVal('updateFamilyCaseNumber', found.caseNo);
    setVal('updateFamilyCaseYear', found.caseYear || '2026');
    setVal('updateFamilyFilingDate', found.filingDate);
    setVal('updateFamilyMatterType', found.matterType || 'Maintenance (Sec 125 CrPC)', 'updateFamilyMatterTypeCustom');
    setVal('updateFamilyPetitioner', found.petitioner || found.plaintiff);
    setVal('updateFamilyRespondent', found.respondent || found.defendant);
    setVal('updateFamilyMarriageDate', found.marriageDate);
    setVal('updateFamilyMaintenance', found.maintenanceDetail);
    setVal('updateFamilyCourtName', found.courtName);
    setVal('updateFamilyClientName', found.clientName);
    setVal('updateFamilyClientNumber', found.clientNumber);
    setVal('updateFamilyDocLink', found.docLink || '');
    setVal('updateFamilyNextHearingDate', found.nextHearing && found.nextHearing !== '—' ? found.nextHearing : '');
    setVal('updateFamilyNextHearingProcess', found.hearingProcess || found.stage || '');
  } else if (caseType === 'revenue') {
    setVal('updateRevenueCaseNumber', found.caseNo);
    setVal('updateRevenueCaseYear', found.caseYear || '2026');
    setVal('updateRevenueFilingDate', found.filingDate);
    setVal('updateRevenueActSection', found.revenueActSection || 'Sec 34 (Mutation / दाखिल खारिज)', 'updateRevenueActSectionCustom');
    setVal('updateRevenueVillage', found.villageMauja);
    setVal('updateRevenueTehsil', found.parganaTehsil);
    setVal('updateRevenueGataNo', found.gataKhataNo);
    setVal('updateRevenueApplicant', found.applicant || found.plaintiff);
    setVal('updateRevenueOppositeParty', found.oppositeParty || found.defendant);
    setVal('updateRevenueCourtName', found.courtName);
    setVal('updateRevenueClientName', found.clientName);
    setVal('updateRevenueClientNumber', found.clientNumber);
    setVal('updateRevenueDocLink', found.docLink || '');
    setVal('updateRevenueNextHearingDate', found.nextHearing && found.nextHearing !== '—' ? found.nextHearing : '');
    setVal('updateRevenueNextHearingProcess', found.hearingProcess || found.stage || '');
  } else if (caseType === 'misc_civil') {
    setVal('updateMiscCivilCaseNumber', found.caseNo);
    setVal('updateMiscCivilCaseYear', found.caseYear || '2026');
    setVal('updateMiscCivilFilingDate', found.filingDate);
    setVal('updateMiscCivilOriginalCase', found.originalCaseNumber || found.originalCase || '');
    setVal('updateMiscCivilProceedingType', found.proceedingType || 'Temporary Injunction (Order 39 Rule 1 & 2 CPC)', 'updateMiscCivilProceedingTypeCustom');
    setVal('updateMiscCivilApplicant', found.applicant || found.plaintiff);
    setVal('updateMiscCivilOppositeParty', found.oppositeParty || found.defendant);
    setVal('updateMiscCivilCourtName', found.courtName);
    setVal('updateMiscCivilClientName', found.clientName);
    setVal('updateMiscCivilClientNumber', found.clientNumber);
    setVal('updateMiscCivilDocLink', found.docLink || '');
    setVal('updateMiscCivilNextHearingDate', found.nextHearing && found.nextHearing !== '—' ? found.nextHearing : '');
    setVal('updateMiscCivilNextHearingProcess', found.hearingProcess || found.stage || '');
  } else if (caseType === 'misc_criminal') {
    setVal('updateMiscCriminalCaseNumber', found.caseNo);
    setVal('updateMiscCriminalCaseYear', found.caseYear || found.crimeYear || '2026');
    setVal('updateMiscCriminalFilingDate', found.filingDate || found.crimeFilingDate);
    setVal('updateMiscCriminalOriginalCase', found.originalCaseNumber || found.originalCase || '');
    setVal('updateMiscCriminalProceedingType', found.proceedingType || 'Regular Bail (Sec 439 CrPC / Sec 483 BNSS)', 'updateMiscCriminalProceedingTypeCustom');
    setVal('updateMiscCriminalPoliceStation', found.policeStation, 'updateMiscCriminalPoliceStationCustom');
    setVal('updateMiscCriminalCrimeSection', found.crimeSection);
    setVal('updateMiscCriminalApplicant', found.applicant || found.accusedName);
    setVal('updateMiscCriminalOppositeParty', found.oppositeParty || found.firstParty || 'State of U.P.');
    setVal('updateMiscCriminalCourtName', found.courtName);
    setVal('updateMiscCriminalClientName', found.clientName);
    setVal('updateMiscCriminalClientNumber', found.clientNumber);
    setVal('updateMiscCriminalDocLink', found.docLink || '');
    setVal('updateMiscCriminalNextHearingDate', found.nextHearing && found.nextHearing !== '—' ? found.nextHearing : '');
    setVal('updateMiscCriminalNextHearingProcess', found.hearingProcess || found.stage || '');
  } else if (caseType === 'complaint') {
    setVal('updateComplaintCaseNumber', found.caseNo);
    setVal('updateComplaintCaseYear', found.caseYear || '2026');
    setVal('updateComplaintFilingDate', found.filingDate);
    setVal('updateComplaintType', found.complaintType || 'Cheque Bounce (Sec 138 NI Act)', 'updateComplaintTypeCustom');
    setVal('updateComplaintSectionAct', found.sectionAct || '');
    setVal('updateComplaintComplainant', found.complainant || found.plaintiff || '');
    setVal('updateComplaintAccusedName', found.accusedName || found.defendant || '');
    setVal('updateComplaintPoliceStation', found.policeStation || '', 'updateComplaintPoliceStationCustom');
    setVal('updateComplaintCourtName', found.courtName);
    setVal('updateComplaintClientName', found.clientName);
    setVal('updateComplaintClientNumber', found.clientNumber);
    setVal('updateComplaintDocLink', found.docLink || '');
    setVal('updateComplaintNextHearingDate', found.nextHearing && found.nextHearing !== '—' ? found.nextHearing : '');
    setVal('updateComplaintNextHearingProcess', found.hearingProcess || found.stage || '');
  } else {
    setVal('updateCaseNo', found.caseNo);
    setVal('updateCaseYear', found.caseYear || '2026');
    setVal('updateFilingDate', found.filingDate);
    setVal('updatePlaintiff', found.plaintiff);
    setVal('updateDefendant', found.defendant);
    setVal('updateCourtName', found.courtName);
    setVal('updateClientName', found.clientName);
    setVal('updateClientNumber', found.clientNumber);
    setVal('updateCaseDocLink', found.docLink || '');
    setVal('updateNextHearingDate', found.nextHearing && found.nextHearing !== '—' ? found.nextHearing : '');
    setVal('updateNextHearingProcess', found.hearingProcess || found.stage || '');
  }

  // Pre-fill search input if needed
  const updateSearchInput = document.getElementById('updateSearchInput');
  if (updateSearchInput && !updateSearchInput.value) {
    updateSearchInput.value = currentlyLoadedOriginalCaseNo;
  }

  if (statusEl) {
    statusEl.textContent = `✅ Case "${currentlyLoadedOriginalCaseNo}" loaded. You can update details below.`;
    statusEl.className = 'update-status-msg success';
  }
}

var isSubmittingUpdate = false;
async function handleUpdateCaseSubmit(e) {
  if (e && typeof e.preventDefault === 'function') e.preventDefault();
  if (isSubmittingUpdate) {
    console.warn('Case update submission already in progress, blocking duplicate.');
    return;
  }

  const caseType = document.getElementById('updateCaseTypeDropdown')?.value || 'civil';
  const statusEl = document.getElementById('updateSearchStatus');
  const updateForm = document.getElementById('updateCaseForm');
  const submitBtn = updateForm?.querySelector('button[type="submit"]');
  const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '<i class="fa-solid fa-save"></i> Save Case Details';

  let newCaseNumber = '';
  let newCaseYear = '';
  if (caseType === 'state' || caseType === 'criminal') {
    newCaseNumber = (document.getElementById('updateStateCaseNumber')?.value || document.getElementById('updateCriminalCaseNumber')?.value)?.trim();
    newCaseYear = document.getElementById('updateStateCrimeYear')?.value?.trim();
  } else if (caseType === 'family') {
    newCaseNumber = document.getElementById('updateFamilyCaseNumber')?.value?.trim();
    newCaseYear = document.getElementById('updateFamilyCaseYear')?.value?.trim();
  } else if (caseType === 'revenue') {
    newCaseNumber = document.getElementById('updateRevenueCaseNumber')?.value?.trim();
    newCaseYear = document.getElementById('updateRevenueCaseYear')?.value?.trim();
  } else if (caseType === 'misc_civil') {
    newCaseNumber = document.getElementById('updateMiscCivilCaseNumber')?.value?.trim();
    newCaseYear = document.getElementById('updateMiscCivilCaseYear')?.value?.trim();
  } else if (caseType === 'misc_criminal') {
    newCaseNumber = document.getElementById('updateMiscCriminalCaseNumber')?.value?.trim();
    newCaseYear = document.getElementById('updateMiscCriminalCaseYear')?.value?.trim();
  } else if (caseType === 'complaint') {
    newCaseNumber = document.getElementById('updateComplaintCaseNumber')?.value?.trim();
    newCaseYear = document.getElementById('updateComplaintCaseYear')?.value?.trim();
  } else {
    newCaseNumber = document.getElementById('updateCaseNo')?.value?.trim();
    newCaseYear = document.getElementById('updateCaseYear')?.value?.trim();
  }

  newCaseNumber = String(newCaseNumber || '').trim().toUpperCase();

  if (!newCaseNumber) {
    alert('Please enter a valid Case Number.');
    if (statusEl) {
      statusEl.textContent = 'Please enter a valid Case Number.';
      statusEl.className = 'update-status-msg error';
    }
    return;
  }

  const originalCaseNo = currentlyLoadedOriginalCaseNo || newCaseNumber;

  // Check duplicate if case number is changed (both in-memory and live Supabase query across all tables)
  if (newCaseNumber.toLowerCase() !== originalCaseNo.toLowerCase()) {
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Checking Duplicate...';
    }
    const duplicateExists = await checkCaseNumberExists(newCaseNumber, originalCaseNo);
    if (duplicateExists && duplicateExists.exists) {
      alert(`❌ Case Number "${newCaseNumber}" already exists in the database! Please choose a unique Case Number.`);
      if (statusEl) {
        statusEl.textContent = `❌ Case Number "${newCaseNumber}" already exists on another case.`;
        statusEl.className = 'update-status-msg error';
      }
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }
      return;
    }
  }

  try {
    isSubmittingUpdate = true;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving Updates...';
    }

  const caseIndex = allCaseRecords.findIndex(c => {
    const num1 = (c.caseNo || '').toLowerCase();
    const num2 = (c.criminalCaseNumber || '').toLowerCase();
    return num1 === originalCaseNo.toLowerCase() || num2 === originalCaseNo.toLowerCase();
  });

  if (caseIndex === -1) {
    alert(`Case "${originalCaseNo}" was not found.`);
    return;
  }

  const targetCase = allCaseRecords[caseIndex];
  targetCase.caseType = caseType;
  targetCase.caseNo = newCaseNumber;
  if (newCaseYear) {
    targetCase.caseYear = newCaseYear;
    if (caseType === 'state' || caseType === 'criminal' || caseType === 'misc_criminal') {
      targetCase.crimeYear = newCaseYear;
    }
  }

  // Save Case Status, Parties Remark, and Disposal Comment
  targetCase.caseStatus = document.getElementById('updateCaseStatus')?.value || 'Pending';
  targetCase.remark = document.getElementById('updateCaseRemark')?.value?.trim() || '';
  targetCase.disposalComment = document.getElementById('updateCaseDisposalComment')?.value?.trim() || '';
  targetCase.disposal_comment = targetCase.disposalComment;

  let fixNextHearingDate = '';
  let fixHearingProcess = '';

  if (caseType === 'state' || caseType === 'criminal') {
    targetCase.criminalCaseNumber = newCaseNumber;
    const psSelect = document.getElementById('updateStatePoliceStation')?.value?.trim() || '';
    const psCustom = document.getElementById('updateStatePoliceStationCustom')?.value?.trim() || '';
    targetCase.policeStation = (psSelect === 'Other' && psCustom) ? psCustom : (psSelect || psCustom || '');
    targetCase.crimeSection = document.getElementById('updateStateCrimeSection')?.value?.trim() || '';
    targetCase.crimeNumber = document.getElementById('updateStateCrimeNumber')?.value?.trim() || '';
    targetCase.filingDate = document.getElementById('updateStateFilingDate')?.value || '';
    targetCase.crimeFilingDate = targetCase.filingDate;
    targetCase.firstParty = document.getElementById('updateStateFirstParty')?.value?.trim() || 'State of U.P.';
    targetCase.victimName = targetCase.firstParty;
    targetCase.accusedName = document.getElementById('updateStateAccusedName')?.value?.trim() || '';
    targetCase.courtName = document.getElementById('updateStateCourtName')?.value || '';
    targetCase.clientName = document.getElementById('updateStateClientName')?.value?.trim() || '';
    targetCase.clientNumber = document.getElementById('updateStateClientNumber')?.value?.trim() || '';
    targetCase.docLink = document.getElementById('updateStateDocLink')?.value?.trim() || '';
    targetCase.caseName = `${targetCase.firstParty} vs ${targetCase.accusedName}`;
    targetCase.partyName = targetCase.accusedName;
    fixNextHearingDate = document.getElementById('updateStateNextHearingDate')?.value?.trim() || '';
    fixHearingProcess = document.getElementById('updateStateNextHearingProcess')?.value?.trim() || '';
  } else if (caseType === 'family') {
    const famSelect = document.getElementById('updateFamilyMatterType')?.value || '';
    const famCustom = document.getElementById('updateFamilyMatterTypeCustom')?.value?.trim() || document.getElementById('familyMatterTypeCustom')?.value?.trim() || '';
    targetCase.matterType = (famSelect.toLowerCase().startsWith('other') && famCustom) ? famCustom : (famSelect || famCustom || 'Maintenance (Sec 125 CrPC)');
    targetCase.filingDate = document.getElementById('updateFamilyFilingDate')?.value || '';
    targetCase.petitioner = document.getElementById('updateFamilyPetitioner')?.value?.trim() || '';
    targetCase.respondent = document.getElementById('updateFamilyRespondent')?.value?.trim() || '';
    targetCase.marriageDate = document.getElementById('updateFamilyMarriageDate')?.value || '';
    targetCase.maintenanceDetail = document.getElementById('updateFamilyMaintenance')?.value?.trim() || '';
    targetCase.courtName = document.getElementById('updateFamilyCourtName')?.value || '';
    targetCase.clientName = document.getElementById('updateFamilyClientName')?.value?.trim() || '';
    targetCase.clientNumber = document.getElementById('updateFamilyClientNumber')?.value?.trim() || '';
    targetCase.docLink = document.getElementById('updateFamilyDocLink')?.value?.trim() || '';
    targetCase.caseName = `${targetCase.petitioner} vs ${targetCase.respondent}`;
    targetCase.partyName = targetCase.respondent;
    fixNextHearingDate = document.getElementById('updateFamilyNextHearingDate')?.value?.trim() || '';
    fixHearingProcess = document.getElementById('updateFamilyNextHearingProcess')?.value?.trim() || '';
  } else if (caseType === 'revenue') {
    const revSelect = document.getElementById('updateRevenueActSection')?.value || '';
    const revCustom = document.getElementById('updateRevenueActSectionCustom')?.value?.trim() || document.getElementById('revenueActSectionCustom')?.value?.trim() || '';
    targetCase.revenueActSection = (revSelect.toLowerCase().startsWith('other') && revCustom) ? revCustom : (revSelect || revCustom || 'Sec 34 (Mutation / दाखिल खारिज)');
    targetCase.filingDate = document.getElementById('updateRevenueFilingDate')?.value || '';
    targetCase.villageMauja = document.getElementById('updateRevenueVillage')?.value?.trim() || '';
    targetCase.parganaTehsil = document.getElementById('updateRevenueTehsil')?.value?.trim() || '';
    targetCase.gataKhataNo = document.getElementById('updateRevenueGataNo')?.value?.trim() || '';
    targetCase.applicant = document.getElementById('updateRevenueApplicant')?.value?.trim() || '';
    targetCase.oppositeParty = document.getElementById('updateRevenueOppositeParty')?.value?.trim() || '';
    targetCase.courtName = document.getElementById('updateRevenueCourtName')?.value || '';
    targetCase.clientName = document.getElementById('updateRevenueClientName')?.value?.trim() || '';
    targetCase.clientNumber = document.getElementById('updateRevenueClientNumber')?.value?.trim() || '';
    targetCase.docLink = document.getElementById('updateRevenueDocLink')?.value?.trim() || '';
    targetCase.caseName = `${targetCase.applicant} vs ${targetCase.oppositeParty}`;
    targetCase.partyName = targetCase.oppositeParty;
    fixNextHearingDate = document.getElementById('updateRevenueNextHearingDate')?.value?.trim() || '';
    fixHearingProcess = document.getElementById('updateRevenueNextHearingProcess')?.value?.trim() || '';
  } else if (caseType === 'misc_civil') {
    targetCase.originalCaseNumber = document.getElementById('updateMiscCivilOriginalCase')?.value?.trim() || '';
    targetCase.originalCase = targetCase.originalCaseNumber;
    const mcProcSelect = document.getElementById('updateMiscCivilProceedingType')?.value || '';
    const mcProcCustom = document.getElementById('updateMiscCivilProceedingTypeCustom')?.value?.trim() || '';
    targetCase.proceedingType = (mcProcSelect.toLowerCase().startsWith('other') && mcProcCustom) ? mcProcCustom : (mcProcSelect || mcProcCustom || 'Temporary Injunction (Order 39 Rule 1 & 2 CPC)');
    targetCase.filingDate = document.getElementById('updateMiscCivilFilingDate')?.value || '';
    targetCase.applicant = document.getElementById('updateMiscCivilApplicant')?.value?.trim() || '';
    targetCase.oppositeParty = document.getElementById('updateMiscCivilOppositeParty')?.value?.trim() || '';
    targetCase.courtName = document.getElementById('updateMiscCivilCourtName')?.value || '';
    targetCase.clientName = document.getElementById('updateMiscCivilClientName')?.value?.trim() || '';
    targetCase.clientNumber = document.getElementById('updateMiscCivilClientNumber')?.value?.trim() || '';
    targetCase.docLink = document.getElementById('updateMiscCivilDocLink')?.value?.trim() || '';
    targetCase.caseName = `${targetCase.applicant} vs ${targetCase.oppositeParty}`;
    targetCase.partyName = targetCase.oppositeParty;
    fixNextHearingDate = document.getElementById('updateMiscCivilNextHearingDate')?.value?.trim() || '';
    fixHearingProcess = document.getElementById('updateMiscCivilNextHearingProcess')?.value?.trim() || '';
  } else if (caseType === 'misc_criminal') {
    targetCase.originalCaseNumber = document.getElementById('updateMiscCriminalOriginalCase')?.value?.trim() || '';
    targetCase.originalCase = targetCase.originalCaseNumber;
    const mcrProcSelect = document.getElementById('updateMiscCriminalProceedingType')?.value || '';
    const mcrProcCustom = document.getElementById('updateMiscCriminalProceedingTypeCustom')?.value?.trim() || '';
    targetCase.proceedingType = (mcrProcSelect.toLowerCase().startsWith('other') && mcrProcCustom) ? mcrProcCustom : (mcrProcSelect || mcrProcCustom || 'Regular Bail (Sec 439 CrPC / Sec 483 BNSS)');
    const mcrPsSelect = document.getElementById('updateMiscCriminalPoliceStation')?.value?.trim() || '';
    const mcrPsCustom = document.getElementById('updateMiscCriminalPoliceStationCustom')?.value?.trim() || '';
    targetCase.policeStation = (mcrPsSelect === 'Other' && mcrPsCustom) ? mcrPsCustom : (mcrPsSelect || mcrPsCustom || '');
    targetCase.crimeSection = document.getElementById('updateMiscCriminalCrimeSection')?.value?.trim() || '';
    targetCase.filingDate = document.getElementById('updateMiscCriminalFilingDate')?.value || '';
    targetCase.crimeFilingDate = targetCase.filingDate;
    targetCase.applicant = document.getElementById('updateMiscCriminalApplicant')?.value?.trim() || '';
    targetCase.oppositeParty = document.getElementById('updateMiscCriminalOppositeParty')?.value?.trim() || 'State of U.P.';
    targetCase.courtName = document.getElementById('updateMiscCriminalCourtName')?.value || '';
    targetCase.clientName = document.getElementById('updateMiscCriminalClientName')?.value?.trim() || '';
    targetCase.clientNumber = document.getElementById('updateMiscCriminalClientNumber')?.value?.trim() || '';
    targetCase.docLink = document.getElementById('updateMiscCriminalDocLink')?.value?.trim() || '';
    targetCase.caseName = `${targetCase.applicant} vs ${targetCase.oppositeParty}`;
    targetCase.partyName = targetCase.applicant;
    fixNextHearingDate = document.getElementById('updateMiscCriminalNextHearingDate')?.value?.trim() || '';
    fixHearingProcess = document.getElementById('updateMiscCriminalNextHearingProcess')?.value?.trim() || '';
  } else if (caseType === 'complaint') {
    const compTypeSelect = document.getElementById('updateComplaintType')?.value || '';
    const compTypeCustom = document.getElementById('updateComplaintTypeCustom')?.value?.trim() || '';
    targetCase.complaintType = (compTypeSelect.toLowerCase().startsWith('other') && compTypeCustom) ? compTypeCustom : (compTypeSelect || compTypeCustom || 'Cheque Bounce (Sec 138 NI Act)');
    const compPsSelect = document.getElementById('updateComplaintPoliceStation')?.value?.trim() || '';
    const compPsCustom = document.getElementById('updateComplaintPoliceStationCustom')?.value?.trim() || '';
    targetCase.policeStation = (compPsSelect === 'Other' && compPsCustom) ? compPsCustom : (compPsSelect || compPsCustom || '');
    targetCase.sectionAct = document.getElementById('updateComplaintSectionAct')?.value?.trim() || '';
    targetCase.filingDate = document.getElementById('updateComplaintFilingDate')?.value || '';
    targetCase.complainant = document.getElementById('updateComplaintComplainant')?.value?.trim() || '';
    targetCase.accusedName = document.getElementById('updateComplaintAccusedName')?.value?.trim() || '';
    targetCase.courtName = document.getElementById('updateComplaintCourtName')?.value || '';
    targetCase.clientName = document.getElementById('updateComplaintClientName')?.value?.trim() || '';
    targetCase.clientNumber = document.getElementById('updateComplaintClientNumber')?.value?.trim() || '';
    targetCase.docLink = document.getElementById('updateComplaintDocLink')?.value?.trim() || '';
    targetCase.caseName = `${targetCase.complainant} vs ${targetCase.accusedName}`;
    targetCase.partyName = targetCase.accusedName;
    fixNextHearingDate = document.getElementById('updateComplaintNextHearingDate')?.value?.trim() || '';
    fixHearingProcess = document.getElementById('updateComplaintNextHearingProcess')?.value?.trim() || '';
  } else {
    targetCase.filingDate = document.getElementById('updateFilingDate')?.value || '';
    targetCase.plaintiff = document.getElementById('updatePlaintiff')?.value?.trim() || '';
    targetCase.defendant = document.getElementById('updateDefendant')?.value?.trim() || '';
    targetCase.courtName = document.getElementById('updateCourtName')?.value || '';
    targetCase.clientName = document.getElementById('updateClientName')?.value?.trim() || '';
    targetCase.clientNumber = document.getElementById('updateClientNumber')?.value?.trim() || '';
    targetCase.docLink = document.getElementById('updateCaseDocLink')?.value?.trim() || '';
    targetCase.caseName = `${targetCase.plaintiff} vs ${targetCase.defendant}`;
    targetCase.partyName = targetCase.defendant || targetCase.plaintiff;
    fixNextHearingDate = document.getElementById('updateNextHearingDate')?.value?.trim() || '';
    fixHearingProcess = document.getElementById('updateNextHearingProcess')?.value?.trim() || '';
  }

  if (fixNextHearingDate) {
    targetCase.nextHearing = fixNextHearingDate;
    if (fixHearingProcess) targetCase.hearingProcess = fixHearingProcess;

    // Update in-memory allHearingRecords as well
    const existingHearing = allHearingRecords.find(h => (h.case_number || '').toLowerCase() === originalCaseNo.toLowerCase());
    if (existingHearing) {
      existingHearing.next_hearing_date = fixNextHearingDate;
      if (fixHearingProcess) existingHearing.hearing_process = fixHearingProcess;
      if (originalCaseNo.toLowerCase() !== newCaseNumber.toLowerCase()) {
        existingHearing.case_number = newCaseNumber;
      }
    } else {
      allHearingRecords.unshift({
        id: 'hearing_' + Date.now(),
        case_number: newCaseNumber,
        hearing_date: fixNextHearingDate,
        next_hearing_date: fixNextHearingDate,
        hearing_process: fixHearingProcess || 'Listed Hearing',
        hearing_status: 'Scheduled',
        remarks: 'Updated via Case Update Form'
      });
    }
  }

  // Update in live Supabase database & cascade to hearings table
  await updateCaseInSupabase(originalCaseNo, newCaseNumber, caseType, targetCase);

  // Update in-memory hearing records if case number changed
  if (originalCaseNo.toLowerCase() !== newCaseNumber.toLowerCase()) {
    allHearingRecords.forEach(h => {
      if ((h.case_number || '').toLowerCase() === originalCaseNo.toLowerCase()) {
        h.case_number = newCaseNumber;
      }
    });
  }

  // Update search input & currentlyLoadedOriginalCaseNo to newCaseNumber
  currentlyLoadedOriginalCaseNo = newCaseNumber;
  const updateSearchInput = document.getElementById('updateSearchInput');
  if (updateSearchInput) updateSearchInput.value = newCaseNumber;

  if (statusEl) {
    statusEl.textContent = `🎉 Case "${newCaseNumber}" updated successfully!`;
    statusEl.className = 'update-status-msg success';
  }

  await performPostCrudRefresh({ caseNumber: newCaseNumber });

  if (typeof showToast === 'function') {
    showToast(`Case ${newCaseNumber} details updated successfully!`, 'success');
  } else {
    alert(`Case ${newCaseNumber} details updated and all tables refreshed successfully!`);
  }
  } catch (updateErr) {
    console.error('Error updating case:', updateErr);
    alert(`Error updating case: ${updateErr.message || updateErr}`);
    if (statusEl) {
      statusEl.textContent = `❌ Error: ${updateErr.message || updateErr}`;
      statusEl.className = 'update-status-msg error';
    }
  } finally {
    isSubmittingUpdate = false;
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;
    }
  }
}

