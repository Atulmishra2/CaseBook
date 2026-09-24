// Companion script for offline file:/// double-click compatibility
window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs['update'] = `<div class="form-container tab-card-wrapper">
                    <div class="section-header-row">
                        <div>
                            <h3>✏️ Update Case Details</h3>
                            <p class="section-subtitle">Search and load an existing case to modify its information, Case Number, status, or remarks.</p>
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
                                    ⚖️ Mark as Disposed Off
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
                                                <div class="disposal-icon-badge">⚖️</div>
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
