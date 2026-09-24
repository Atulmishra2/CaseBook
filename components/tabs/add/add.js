// Companion script for offline file:/// double-click compatibility
window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs['add'] = `<div class="form-container tab-card-wrapper">
                    <div class="section-header-row">
                        <div>
                            <h3>➕ Add New Case</h3>
                            <p class="section-subtitle">Enter details below to register a new case into the system.</p>
                        </div>
                    </div>

                    <form>
                        <label for="caseTypeDropdown">Case Type</label>
                        <select id="caseTypeDropdown" required>
                            <option value="">-- Select Case Type --</option>
                        </select>

                        <div id="generalCaseForm" class="case-form-panel">
                            <div class="form-grid-2col">
                                <div class="form-group">
                                    <label for="caseNo">Case Number</label>
                                    <input id="caseNo" type="text" class="case-number-input" data-uppercase="true" placeholder="e.g. CIV-2026-010" required>
                                </div>
                                <div class="form-group">
                                    <label for="caseYear">Year</label>
                                    <input id="caseYear" type="number" placeholder="Year" min="1900" max="2100" value="2026" required>
                                </div>
                                <div class="form-group">
                                    <label for="filingDate">Filing Date</label>
                                    <input id="filingDate" type="date" required>
                                </div>
                                <div class="form-group">
                                    <label for="courtName">Court Name</label>
                                    <div class="court-input-wrapper">
                                        <select id="courtName" required>
                                            <option value="">-- Select Court --</option>
                                        </select>
                                        <button type="button" id="addCourtBtn" class="mini-court-btn" title="Add Court">+</button>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="plaintiff">Plaintiff (Lead / First Party)</label>
                                    <input id="plaintiff" type="text" placeholder="e.g. Ramesh Kumar & Ors. or Lead Plaintiff Name" required>
                                    <small style="display:block; margin-top:3px; color:#64748b; font-size:11.5px;">⚖️ Multi-party: Use <b>&amp; Ors.</b> (e.g. <i>Ramesh Kumar &amp; Ors.</i>) and list co-parties in Remarks.</small>
                                </div>
                                <div class="form-group">
                                    <label for="defendant">Defendant (Lead / First Party)</label>
                                    <input id="defendant" type="text" placeholder="e.g. State of U.P. & Ors. or Defendant Name" required>
                                    <small style="display:block; margin-top:3px; color:#64748b; font-size:11.5px;">⚖️ Multi-party: e.g. <i>State of U.P. &amp; Ors.</i> or <i>Suresh Sharma &amp; Another</i></small>
                                </div>
                                <div style="grid-column: 1 / -1;" class="remarks-coparties-box">
                                    <div class="remarks-box-header">
                                        <div class="remarks-box-title-wrap">
                                            <span class="remarks-box-icon">📝</span>
                                            <label for="caseRemark" class="remarks-box-label">Case Remarks &amp; Co-Parties List</label>
                                        </div>
                                        <span class="remarks-searchable-badge">🔍 Live Searchable in Portal</span>
                                    </div>
                                    <div class="remarks-quick-chips">
                                        <span class="remarks-chip-btn" onclick="insertRemarkChip('caseRemark', 'Co-Plaintiffs: ')">➕ Co-Plaintiffs</span>
                                        <span class="remarks-chip-btn" onclick="insertRemarkChip('caseRemark', 'Co-Defendants: ')">➕ Co-Defendants</span>
                                        <span class="remarks-chip-btn" onclick="insertRemarkChip('caseRemark', 'Connected Suit: ')">➕ Connected Suit</span>
                                        <span class="remarks-chip-btn" onclick="insertRemarkChip('caseRemark', 'Injunction Status: ')">➕ Injunction Status</span>
                                    </div>
                                    <textarea id="caseRemark" rows="2" placeholder="e.g. Plaintiffs: 1. Ramesh Kumar, 2. Suresh Kumar; Defendants: 1. State of U.P., 2. Tehsildar Sadar; Injunction granted on 12/03/2026..."></textarea>
                                    <div class="remarks-box-footer">
                                        <span class="remarks-box-tip">💡 <b>Search Index:</b> Any co-plaintiff, co-defendant, or connected matter note entered here will be indexed &amp; searchable across My Cases &amp; Client Portal.</span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="clientName">Client Name</label>
                                    <input id="clientName" type="text" placeholder="Enter Client Name" required>
                                </div>
                                <div class="form-group">
                                    <label for="clientNumber">Client Number</label>
                                    <input id="clientNumber" type="tel" placeholder="Enter Client Number" required>
                                </div>
                                <div class="form-group" style="grid-column: 1 / -1;">
                                    <label for="caseDocLink">Document / Order Sheet Link (Drive/PDF URL)</label>
                                    <input id="caseDocLink" type="url" placeholder="https://drive.google.com/... or document URL">
                                </div>
                            </div>
                        </div>

                        <!-- State Cases Form (Criminal / FIR / State of U.P.) -->
                        <div id="stateCaseForm" class="case-form-panel hidden-case-form">
                            <div class="form-grid-2col">
                                <div class="form-group">
                                    <label for="stateCaseNumber">Case Number / ST No.</label>
                                    <input id="stateCaseNumber" type="text" class="case-number-input" data-uppercase="true" placeholder="e.g. ST-2026-001 or Sess. Case 104/2026">
                                </div>
                                <div class="form-group">
                                    <label for="stateCrimeYear">Crime / Case Year</label>
                                    <input id="stateCrimeYear" type="number" placeholder="Year" min="1900" max="2100" value="2026">
                                </div>
                                <div class="form-group">
                                    <label for="stateCrimeNumber">Crime / FIR Number</label>
                                    <input id="stateCrimeNumber" type="text" class="case-number-input" data-uppercase="true" placeholder="e.g. Crime No. 142/2026">
                                </div>
                                <div class="form-group">
                                    <label for="statePoliceStation">Police Station / Thana</label>
                                    <select id="statePoliceStation">
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
                                    <input type="text" id="statePoliceStationCustom" placeholder="✍️ Specify other Police Station name..." style="display:none; margin-top:8px; border:1.5px solid #2563eb; background:#f0f7ff;">
                                </div>
                                <div class="form-group">
                                    <label for="stateCrimeSection">Sections (IPC / CrPC / BNS)</label>
                                    <input id="stateCrimeSection" type="text" placeholder="e.g. IPC 302, 307, 504 / BNS 103">
                                </div>
                                <div class="form-group">
                                    <label for="stateFilingDate">Filing / Cognizance Date</label>
                                    <input id="stateFilingDate" type="date">
                                </div>
                                <div class="form-group">
                                    <label for="stateFirstParty">First Party (Prosecution)</label>
                                    <input id="stateFirstParty" type="text" value="State of U.P." placeholder="State of U.P.">
                                    <small style="display:block; margin-top:3px; color:#64748b; font-size:11.5px;">⚖️ Defaulted to <b>State of U.P.</b> (editable for private complaints)</small>
                                </div>
                                <div class="form-group">
                                    <label for="stateAccusedName">Accused Name (Lead / Opposite Party)</label>
                                    <input id="stateAccusedName" type="text" placeholder="e.g. Ramesh Kumar & 2 Ors.">
                                    <small style="display:block; margin-top:3px; color:#64748b; font-size:11.5px;">⚖️ Multi-accused: e.g. <i>Ramesh &amp; 2 Ors.</i> (list co-accused in Remarks below)</small>
                                </div>
                                <div class="form-group">
                                    <label for="stateCourtName">Court</label>
                                    <div class="court-input-wrapper">
                                        <select id="stateCourtName">
                                            <option value="">-- Select Court --</option>
                                        </select>
                                        <button type="button" id="addStateCourtBtn" class="mini-court-btn" title="Add Court">+</button>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="stateClientName">Client Name Represented</label>
                                    <input id="stateClientName" type="text" placeholder="Enter Client Name">
                                </div>
                                <div class="form-group">
                                    <label for="stateClientNumber">Client Number</label>
                                    <input id="stateClientNumber" type="tel" placeholder="Enter Client Phone Number">
                                </div>
                                <div class="form-group" style="grid-column: 1 / -1;">
                                    <label for="stateDocLink">Document / Order Sheet Link (Drive/PDF URL)</label>
                                    <input id="stateDocLink" type="url" placeholder="https://drive.google.com/... or document URL">
                                </div>
                                <div style="grid-column: 1 / -1;" class="remarks-coparties-box">
                                    <div class="remarks-box-header">
                                        <div class="remarks-box-title-wrap">
                                            <span class="remarks-box-icon">🚨</span>
                                            <label for="stateCaseRemark" class="remarks-box-label">Case Remarks &amp; Co-Accused / Custody Details</label>
                                        </div>
                                        <span class="remarks-searchable-badge">🔍 Live Searchable in Portal</span>
                                    </div>
                                    <div class="remarks-quick-chips">
                                        <span class="remarks-chip-btn" onclick="insertRemarkChip('stateCaseRemark', 'Co-Accused: ')">➕ Co-Accused</span>
                                        <span class="remarks-chip-btn" onclick="insertRemarkChip('stateCaseRemark', 'Custody / Jail: In District Jail since ')">➕ Jail / Custody</span>
                                        <span class="remarks-chip-btn" onclick="insertRemarkChip('stateCaseRemark', 'Bail Surety: ')">➕ Bail Surety</span>
                                        <span class="remarks-chip-btn" onclick="insertRemarkChip('stateCaseRemark', 'Thana GD / CD Notes: ')">➕ GD / CD Notes</span>
                                    </div>
                                    <textarea id="stateCaseRemark" rows="2" placeholder="e.g. Co-accused: 1. Suresh Kumar, 2. Rajesh; In District Jail since 15-01-2026; Case Diary summoned..."></textarea>
                                    <div class="remarks-box-footer">
                                        <span class="remarks-box-tip">💡 <b>Search Index:</b> Co-accused names, custody details, and GD notes are indexed &amp; searchable across criminal registers.</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Family Cases Form (Matrimonial / Maintenance / DV) -->
                        <div id="familyCaseForm" class="case-form-panel hidden-case-form">
                            <div class="form-grid-2col">
                                <div class="form-group">
                                    <label for="familyCaseNumber">Case Number</label>
                                    <input id="familyCaseNumber" type="text" class="case-number-input" data-uppercase="true" placeholder="e.g. FC-2026-015 or Matrimonial Case 45/2026">
                                </div>
                                <div class="form-group">
                                    <label for="familyCaseYear">Year</label>
                                    <input id="familyCaseYear" type="number" placeholder="Year" min="1900" max="2100" value="2026">
                                </div>
                                <div class="form-group">
                                    <label for="familyMatterType">Dispute / Matter Type</label>
                                    <select id="familyMatterType">
                                        <option value="Maintenance (Sec 125 CrPC)">Maintenance (Sec 125 CrPC / Sec 144 BNSS)</option>
                                        <option value="Divorce (Sec 13 HMA)">Divorce Petition (Sec 13 HMA)</option>
                                        <option value="Restitution of Conjugal Rights (Sec 9 HMA)">Restitution of Conjugal Rights (Sec 9 HMA)</option>
                                        <option value="Domestic Violence (DV Act)">Domestic Violence (DV Act 2005)</option>
                                        <option value="Child Custody / Guardianship">Child Custody / Guardianship Act</option>
                                        <option value="Mutual Divorce (Sec 13B HMA)">Mutual Divorce (Sec 13B HMA)</option>
                                        <option value="Special Marriage Act">Special Marriage Act Dispute</option>
                                        <option value="Other Family Dispute">Other Family Dispute</option>
                                    </select>
                                    <input type="text" id="familyMatterTypeCustom" placeholder="✍️ Specify other family matter/dispute type..." style="display:none; margin-top:8px; border:1.5px solid #2563eb; background:#f0f7ff;">
                                </div>
                                <div class="form-group">
                                    <label for="familyFilingDate">Filing Date</label>
                                    <input id="familyFilingDate" type="date">
                                </div>
                                <div class="form-group">
                                    <label for="familyPetitioner">Petitioner / Applicant (Wife / Husband)</label>
                                    <input id="familyPetitioner" type="text" placeholder="e.g. Smt. Pooja Sharma">
                                </div>
                                <div class="form-group">
                                    <label for="familyRespondent">Respondent / Opposite Party (Husband / Wife / In-laws)</label>
                                    <input id="familyRespondent" type="text" placeholder="e.g. Rahul Sharma & Ors.">
                                </div>
                                <div class="form-group">
                                    <label for="familyMarriageDate">Marriage Date (Optional)</label>
                                    <input id="familyMarriageDate" type="date">
                                </div>
                                <div class="form-group">
                                    <label for="familyMaintenance">Maintenance Claimed / Ordered</label>
                                    <input id="familyMaintenance" type="text" placeholder="e.g. ₹15,000/month interim maintenance">
                                </div>
                                <div class="form-group">
                                    <label for="familyCourtName">Family Court</label>
                                    <div class="court-input-wrapper">
                                        <select id="familyCourtName">
                                            <option value="">-- Select Court --</option>
                                        </select>
                                        <button type="button" id="addFamilyCourtBtn" class="mini-court-btn" title="Add Court">+</button>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="familyClientName">Client Name</label>
                                    <input id="familyClientName" type="text" placeholder="Enter Client Name">
                                </div>
                                <div class="form-group">
                                    <label for="familyClientNumber">Client Number</label>
                                    <input id="familyClientNumber" type="tel" placeholder="Enter Client Phone Number">
                                </div>
                                <div class="form-group" style="grid-column: 1 / -1;">
                                    <label for="familyDocLink">Document / Order Sheet Link (Drive/PDF URL)</label>
                                    <input id="familyDocLink" type="url" placeholder="https://drive.google.com/... or document URL">
                                </div>
                                <div style="grid-column: 1 / -1;" class="remarks-coparties-box">
                                    <div class="remarks-box-header">
                                        <div class="remarks-box-title-wrap">
                                            <span class="remarks-box-icon">👨‍👩‍👧</span>
                                            <label for="familyCaseRemark" class="remarks-box-label">Case Remarks &amp; Mediation / Children Details</label>
                                        </div>
                                        <span class="remarks-searchable-badge">🔍 Live Searchable in Portal</span>
                                    </div>
                                    <div class="remarks-quick-chips">
                                        <span class="remarks-chip-btn" onclick="insertRemarkChip('familyCaseRemark', 'In-Laws Named: ')">➕ In-Laws Named</span>
                                        <span class="remarks-chip-btn" onclick="insertRemarkChip('familyCaseRemark', 'Mediation Status: Referred on ')">➕ Mediation</span>
                                        <span class="remarks-chip-btn" onclick="insertRemarkChip('familyCaseRemark', 'Minor Children: ')">➕ Minor Children</span>
                                        <span class="remarks-chip-btn" onclick="insertRemarkChip('familyCaseRemark', 'Interim Maintenance: ')">➕ Maintenance</span>
                                    </div>
                                    <textarea id="familyCaseRemark" rows="2" placeholder="e.g. In-laws named in petition: 1. Smt. Kamala, 2. Ram Lal; Referred to Mediation Center on 10/02/2026; Child custody dispute..."></textarea>
                                    <div class="remarks-box-footer">
                                        <span class="remarks-box-tip">💡 <b>Search Index:</b> Relative names, children details, and mediation notes are indexed &amp; searchable across Family registers.</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Revenue Cases Form (Land / Tehsil / UP Revenue Code) -->
                        <div id="revenueCaseForm" class="case-form-panel hidden-case-form">
                            <div class="form-grid-2col">
                                <div class="form-group">
                                    <label for="revenueCaseNumber">Case Number / Computerized Case No.</label>
                                    <input id="revenueCaseNumber" type="text" class="case-number-input" data-uppercase="true" placeholder="e.g. REV-2026-020 or Case No. T2026...">
                                </div>
                                <div class="form-group">
                                    <label for="revenueCaseYear">Year</label>
                                    <input id="revenueCaseYear" type="number" placeholder="Year" min="1900" max="2100" value="2026">
                                </div>
                                <div class="form-group">
                                    <label for="revenueActSection">Revenue Act &amp; Section (UP Revenue Code)</label>
                                    <select id="revenueActSection">
                                        <option value="Sec 34 (Mutation / दाखिल खारिज)">Sec 34 (Mutation / दाखिल खारिज)</option>
                                        <option value="Sec 24 (Demarcation / पत्थरगड्डी)">Sec 24 (Demarcation / पैमाइश / पत्थरगड्डी)</option>
                                        <option value="Sec 116 (Partition / कुर्रा बटवारा)">Sec 116 (Partition / कुर्रा बटवारा)</option>
                                        <option value="Sec 67 (Eviction Gaon Sabha Land)">Sec 67 (Gram Sabha Encroachment / बेदखली)</option>
                                        <option value="Sec 80 (Non-Agricultural Declaration)">Sec 80 (Non-Agri 143 Declaration)</option>
                                        <option value="Sec 144 (Declaratory Suit / घोषणात्मक वाद)">Sec 144 (Declaratory Suit / घोषणात्मक वाद)</option>
                                        <option value="Sec 38 (Correction of Revenue Map/Record)">Sec 38 (Map / Khatauni Record Correction)</option>
                                        <option value="Revision / Appeal (Sec 207 / 210)">Revision / Appeal (Sec 207 / 210)</option>
                                        <option value="Other Revenue Section">Other Revenue Section</option>
                                    </select>
                                    <input type="text" id="revenueActSectionCustom" placeholder="✍️ Specify other revenue act / section..." style="display:none; margin-top:8px; border:1.5px solid #2563eb; background:#f0f7ff;">
                                </div>
                                <div class="form-group">
                                    <label for="revenueFilingDate">Filing Date</label>
                                    <input id="revenueFilingDate" type="date">
                                </div>
                                <div class="form-group">
                                    <label for="revenueVillage">Village / Mauja (मौजा / ग्राम)</label>
                                    <input id="revenueVillage" type="text" placeholder="e.g. Kalyanpur / Bijnor">
                                </div>
                                <div class="form-group">
                                    <label for="revenueTehsil">Tehsil / Pargana (तहसील)</label>
                                    <input id="revenueTehsil" type="text" placeholder="e.g. Tehsil Sadar / Sarojini Nagar">
                                </div>
                                <div class="form-group">
                                    <label for="revenueGataNo">Gata / Khasra No. &amp; Khatauni (गाटा सं० / खतौनी)</label>
                                    <input id="revenueGataNo" type="text" placeholder="e.g. Gata No. 245/1, Khatauni No. 112">
                                </div>
                                <div class="form-group">
                                    <label for="revenueApplicant">Applicant / Plaintiff (वादी)</label>
                                    <input id="revenueApplicant" type="text" placeholder="e.g. Ram Prasad & Ors.">
                                </div>
                                <div class="form-group">
                                    <label for="revenueOppositeParty">Opposite Party / Gaon Sabha (प्रतिवादी / गाँव सभा)</label>
                                    <input id="revenueOppositeParty" type="text" placeholder="e.g. Gaon Sabha & 3 Ors.">
                                </div>
                                <div class="form-group">
                                    <label for="revenueCourtName">Revenue Court</label>
                                    <div class="court-input-wrapper">
                                        <select id="revenueCourtName">
                                            <option value="">-- Select Court --</option>
                                        </select>
                                        <button type="button" id="addRevenueCourtBtn" class="mini-court-btn" title="Add Court">+</button>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="revenueClientName">Client Name</label>
                                    <input id="revenueClientName" type="text" placeholder="Enter Client Name">
                                </div>
                                <div class="form-group">
                                    <label for="revenueClientNumber">Client Number</label>
                                    <input id="revenueClientNumber" type="tel" placeholder="Enter Client Phone Number">
                                </div>
                                <div class="form-group" style="grid-column: 1 / -1;">
                                    <label for="revenueDocLink">Document / Order Sheet Link (Drive/PDF URL)</label>
                                    <input id="revenueDocLink" type="url" placeholder="https://drive.google.com/... or document URL">
                                </div>
                                <div style="grid-column: 1 / -1;" class="remarks-coparties-box">
                                    <div class="remarks-box-header">
                                        <div class="remarks-box-title-wrap">
                                            <span class="remarks-box-icon">🌾</span>
                                            <label for="revenueCaseRemark" class="remarks-box-label">Case Remarks &amp; Co-Sharers / Land Details</label>
                                        </div>
                                        <span class="remarks-searchable-badge">🔍 Live Searchable in Portal</span>
                                    </div>
                                    <div class="remarks-quick-chips">
                                        <span class="remarks-chip-btn" onclick="insertRemarkChip('revenueCaseRemark', 'Co-Sharers: ')">➕ Co-Sharers</span>
                                        <span class="remarks-chip-btn" onclick="insertRemarkChip('revenueCaseRemark', 'Land Area: ')">➕ Area / Rakba</span>
                                        <span class="remarks-chip-btn" onclick="insertRemarkChip('revenueCaseRemark', 'Lekhpal / Kanoongo Report: ')">➕ Revenue Report</span>
                                        <span class="remarks-chip-btn" onclick="insertRemarkChip('revenueCaseRemark', 'Boundary / Demarcation: ')">➕ Boundary Notes</span>
                                    </div>
                                    <textarea id="revenueCaseRemark" rows="2" placeholder="e.g. Co-sharers: 1. Ram Kumar (1/3 share), 2. Shyam (2/3 share); Area 0.450 Hectare; Spot inspection report submitted..."></textarea>
                                    <div class="remarks-box-footer">
                                        <span class="remarks-box-tip">💡 <b>Search Index:</b> Co-sharers and revenue spot inspection notes are indexed &amp; searchable across Revenue registers.</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Misc Civil Cases Form (Applications, Appeals, Revisions, Injunctions) -->
                        <div id="miscCivilCaseForm" class="case-form-panel hidden-case-form">
                            <div class="form-grid-2col">
                                <div class="form-group">
                                    <label for="miscCivilCaseNumber">Misc / Application Case Number *</label>
                                    <input id="miscCivilCaseNumber" type="text" class="case-number-input" data-uppercase="true" placeholder="e.g. MCA-2026-101 or Misc App No.">
                                </div>
                                <div class="form-group">
                                    <label for="miscCivilCaseYear">Year</label>
                                    <input id="miscCivilCaseYear" type="number" placeholder="2026" value="2026">
                                </div>
                                <div class="form-group">
                                    <label for="miscCivilOriginalCase">Original / Main Suit Number</label>
                                    <input id="miscCivilOriginalCase" type="text" class="case-number-input" data-uppercase="true" placeholder="e.g. OS No. 45/2024">
                                </div>
                                <div class="form-group">
                                    <label for="miscCivilProceedingType">Proceeding / Application Type</label>
                                    <select id="miscCivilProceedingType">
                                        <option value="Temporary Injunction (Order 39 Rule 1 & 2 CPC)">Temporary Injunction (Order 39 Rule 1 &amp; 2 CPC)</option>
                                        <option value="Restoration Application (Order 9 Rule 13 / Rule 9 CPC)">Restoration (Order 9 Rule 13 / Rule 9 CPC)</option>
                                        <option value="Civil Appeal (Sec 96 CPC)">Civil Appeal (Sec 96 CPC)</option>
                                        <option value="Civil Revision (Sec 115 CPC)">Civil Revision (Sec 115 CPC)</option>
                                        <option value="Execution Application (Order 21 CPC)">Execution Petition (Order 21 CPC)</option>
                                        <option value="Review Application (Order 47 CPC / Sec 114)">Review Application (Order 47 CPC)</option>
                                        <option value="Misc Civil Appeal (Order 43 Rule 1 CPC)">Misc Civil Appeal (Order 43 CPC)</option>
                                        <option value="Other Misc Application">Other Misc Application</option>
                                    </select>
                                    <input type="text" id="miscCivilProceedingTypeCustom" placeholder="✍️ Specify other application / proceeding type..." style="display:none; margin-top:8px; border:1.5px solid #2563eb; background:#f0f7ff;">
                                </div>
                                <div class="form-group">
                                    <label for="miscCivilApplicant">Applicant / Appellant / Revisionist *</label>
                                    <input id="miscCivilApplicant" type="text" placeholder="Enter Applicant Name">
                                </div>
                                <div class="form-group">
                                    <label for="miscCivilOppositeParty">Opposite Party / Respondent *</label>
                                    <input id="miscCivilOppositeParty" type="text" placeholder="Enter Opposite Party Name">
                                </div>
                                <div class="form-group">
                                    <label for="miscCivilCourtName">Court</label>
                                    <div class="court-input-wrapper">
                                        <select id="miscCivilCourtName">
                                            <option value="">-- Select Court --</option>
                                        </select>
                                        <button type="button" id="addMiscCivilCourtBtn" class="mini-court-btn" title="Add Court">+</button>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="miscCivilFilingDate">Filing Date</label>
                                    <input id="miscCivilFilingDate" type="date">
                                </div>
                                <div class="form-group">
                                    <label for="miscCivilClientName">Client Name</label>
                                    <input id="miscCivilClientName" type="text" placeholder="Enter Client Name">
                                </div>
                                <div class="form-group">
                                    <label for="miscCivilClientNumber">Client Number</label>
                                    <input id="miscCivilClientNumber" type="tel" placeholder="Enter Client Phone Number">
                                </div>
                                <div class="form-group" style="grid-column: 1 / -1;">
                                    <label for="miscCivilDocLink">Document / Order Sheet Link (Drive/PDF URL)</label>
                                    <input id="miscCivilDocLink" type="url" placeholder="https://drive.google.com/... or document URL">
                                </div>
                                <div style="grid-column: 1 / -1;" class="remarks-coparties-box">
                                    <div class="remarks-box-header">
                                        <div class="remarks-box-title-wrap">
                                            <span class="remarks-box-icon">📑</span>
                                            <label for="miscCivilCaseRemark" class="remarks-box-label">Remarks &amp; Application Notes</label>
                                        </div>
                                        <span class="remarks-searchable-badge">🔍 Live Searchable in Portal</span>
                                    </div>
                                    <div class="remarks-quick-chips">
                                        <span class="remarks-chip-btn" onclick="insertRemarkChip('miscCivilCaseRemark', 'Order 39 Rule 1&2 CPC Grounds: ')">➕ Injunction Grounds</span>
                                        <span class="remarks-chip-btn" onclick="insertRemarkChip('miscCivilCaseRemark', 'Order 9 Rule 13 Ex-Parte Recall: ')">➕ Recall Grounds</span>
                                        <span class="remarks-chip-btn" onclick="insertRemarkChip('miscCivilCaseRemark', 'Lower Court Record (LCR): ')">➕ LCR Summoned</span>
                                        <span class="remarks-chip-btn" onclick="insertRemarkChip('miscCivilCaseRemark', 'Stay Order Status: ')">➕ Stay Order</span>
                                    </div>
                                    <textarea id="miscCivilCaseRemark" rows="2" placeholder="e.g. Temporary injunction application filed along with plaint; ex-parte ad-interim injunction granted; notice issued..."></textarea>
                                    <div class="remarks-box-footer">
                                        <span class="remarks-box-tip">💡 <b>Search Index:</b> Application grounds, interlocutory orders, and stay notes are indexed &amp; searchable across registers.</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Misc Criminal Cases Form (Bail, Appeals, Revisions, Sec 156(3) CrPC) -->
                        <div id="miscCriminalCaseForm" class="case-form-panel hidden-case-form">
                            <div class="form-grid-2col">
                                <div class="form-group">
                                    <label for="miscCriminalCaseNumber">Misc Criminal / Bail Application No. *</label>
                                    <input id="miscCriminalCaseNumber" type="text" class="case-number-input" data-uppercase="true" placeholder="e.g. BA-2026-050 or Cr. Misc No.">
                                </div>
                                <div class="form-group">
                                    <label for="miscCriminalCaseYear">Year</label>
                                    <input id="miscCriminalCaseYear" type="number" placeholder="2026" value="2026">
                                </div>
                                <div class="form-group">
                                    <label for="miscCriminalOriginalCase">Original ST / Crime / FIR Number</label>
                                    <input id="miscCriminalOriginalCase" type="text" class="case-number-input" data-uppercase="true" placeholder="e.g. Crime No. 210/2026">
                                </div>
                                <div class="form-group">
                                    <label for="miscCriminalProceedingType">Application / Proceeding Type</label>
                                    <select id="miscCriminalProceedingType">
                                        <option value="Regular Bail (Sec 439 CrPC / Sec 483 BNSS)">Regular Bail (Sec 439 CrPC / Sec 483 BNSS)</option>
                                        <option value="Anticipatory Bail (Sec 438 CrPC / Sec 482 BNSS)">Anticipatory Bail (Sec 438 CrPC / Sec 482 BNSS)</option>
                                        <option value="Criminal Appeal (Sec 374 CrPC / Sec 415 BNSS)">Criminal Appeal (Sec 374 CrPC / Sec 415 BNSS)</option>
                                        <option value="Criminal Revision (Sec 397/401 CrPC)">Criminal Revision (Sec 397/401 CrPC)</option>
                                        <option value="Application u/s 156(3) CrPC / Sec 175(3) BNSS">Application u/s 156(3) CrPC (FIR Order)</option>
                                        <option value="Criminal Misc Application (Sec 482 CrPC)">Criminal Misc Application (Sec 482 CrPC)</option>
                                        <option value="Other Criminal Application">Other Criminal Application</option>
                                    </select>
                                    <input type="text" id="miscCriminalProceedingTypeCustom" placeholder="✍️ Specify other application / proceeding type..." style="display:none; margin-top:8px; border:1.5px solid #2563eb; background:#f0f7ff;">
                                </div>
                                <div class="form-group">
                                    <label for="miscCriminalPoliceStation">Police Station / Thana</label>
                                    <select id="miscCriminalPoliceStation">
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
                                    <input type="text" id="miscCriminalPoliceStationCustom" placeholder="✍️ Specify other Police Station name..." style="display:none; margin-top:8px; border:1.5px solid #2563eb; background:#f0f7ff;">
                                </div>
                                <div class="form-group">
                                    <label for="miscCriminalCrimeSection">Section (IPC / BNS / Act)</label>
                                    <input id="miscCriminalCrimeSection" type="text" placeholder="e.g. IPC 307, 323, 504">
                                </div>
                                <div class="form-group">
                                    <label for="miscCriminalApplicant">Applicant / Accused / Appellant *</label>
                                    <input id="miscCriminalApplicant" type="text" placeholder="Enter Applicant Name">
                                </div>
                                <div class="form-group">
                                    <label for="miscCriminalOppositeParty">Opposite Party (Prosecution / Complainant) *</label>
                                    <input id="miscCriminalOppositeParty" type="text" placeholder="State of U.P." value="State of U.P.">
                                </div>
                                <div class="form-group">
                                    <label for="miscCriminalCourtName">Court</label>
                                    <div class="court-input-wrapper">
                                        <select id="miscCriminalCourtName">
                                            <option value="">-- Select Court --</option>
                                        </select>
                                        <button type="button" id="addMiscCriminalCourtBtn" class="mini-court-btn" title="Add Court">+</button>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="miscCriminalFilingDate">Filing Date</label>
                                    <input id="miscCriminalFilingDate" type="date">
                                </div>
                                <div class="form-group">
                                    <label for="miscCriminalClientName">Client Name</label>
                                    <input id="miscCriminalClientName" type="text" placeholder="Enter Client Name">
                                </div>
                                <div class="form-group">
                                    <label for="miscCriminalClientNumber">Client Number</label>
                                    <input id="miscCriminalClientNumber" type="tel" placeholder="Enter Client Phone Number">
                                </div>
                                <div class="form-group" style="grid-column: 1 / -1;">
                                    <label for="miscCriminalDocLink">Document / Order Sheet Link (Drive/PDF URL)</label>
                                    <input id="miscCriminalDocLink" type="url" placeholder="https://drive.google.com/... or document URL">
                                </div>
                                <div style="grid-column: 1 / -1;" class="remarks-coparties-box">
                                    <div class="remarks-box-header">
                                        <div class="remarks-box-title-wrap">
                                            <span class="remarks-box-icon">⚖️</span>
                                            <label for="miscCriminalCaseRemark" class="remarks-box-label">Remarks &amp; Case Progress</label>
                                        </div>
                                        <span class="remarks-searchable-badge">🔍 Live Searchable in Portal</span>
                                    </div>
                                    <div class="remarks-quick-chips">
                                        <span class="remarks-chip-btn" onclick="insertRemarkChip('miscCriminalCaseRemark', 'Bail Grounds: False implication, no overt act, ')">➕ Bail Grounds</span>
                                        <span class="remarks-chip-btn" onclick="insertRemarkChip('miscCriminalCaseRemark', 'Parity: Co-accused granted bail on ')">➕ Parity Note</span>
                                        <span class="remarks-chip-btn" onclick="insertRemarkChip('miscCriminalCaseRemark', 'Previous Antecedents: Clean record / no past cases')">➕ Clean Antecedents</span>
                                        <span class="remarks-chip-btn" onclick="insertRemarkChip('miscCriminalCaseRemark', 'Interim Protection: Stay of arrest granted till ')">➕ Interim Protection</span>
                                    </div>
                                    <textarea id="miscCriminalCaseRemark" rows="2" placeholder="e.g. Bail rejected by CJM, moving to Sessions, CD summoned, interim protection..."></textarea>
                                    <div class="remarks-box-footer">
                                        <span class="remarks-box-tip">💡 <b>Search Index:</b> Interlocutory bail orders, parity citations, and police CD notes are indexed &amp; searchable.</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Complaint Cases Form (Sec 138 NI Act, Sec 200 CrPC, Defamation, etc.) -->
                        <div id="complaintCaseForm" class="case-form-panel hidden-case-form">
                            <div class="form-grid-2col">
                                <div class="form-group">
                                    <label for="complaintCaseNumber">Complaint / CC Number *</label>
                                    <input id="complaintCaseNumber" type="text" class="case-number-input" data-uppercase="true" placeholder="e.g. CC-2026-105 or Case No.">
                                </div>
                                <div class="form-group">
                                    <label for="complaintCaseYear">Year</label>
                                    <input id="complaintCaseYear" type="number" placeholder="2026" value="2026">
                                </div>
                                <div class="form-group">
                                    <label for="complaintType">Complaint / Matter Type *</label>
                                    <select id="complaintType">
                                        <option value="Cheque Bounce (Sec 138 NI Act)">Cheque Bounce (Sec 138 NI Act)</option>
                                        <option value="Private Criminal Complaint (Sec 200 CrPC / Sec 223 BNSS)">Private Criminal Complaint (Sec 200 CrPC / 223 BNSS)</option>
                                        <option value="Defamation (Sec 500 IPC / Sec 356 BNS)">Defamation (Sec 500 IPC / 356 BNS)</option>
                                        <option value="Cheating & Fraud (Sec 420 IPC / Sec 318 BNS)">Cheating &amp; Fraud (Sec 420 IPC)</option>
                                        <option value="Domestic / Harassment Complaint">Domestic / Harassment Complaint</option>
                                        <option value="Labour / Industrial Dispute Complaint">Labour / Industrial Dispute Complaint</option>
                                        <option value="Consumer Protection Complaint">Consumer Protection Complaint</option>
                                        <option value="Other Complaint">Other Complaint</option>
                                    </select>
                                    <input type="text" id="complaintTypeCustom" placeholder="✍️ Specify other complaint type..." style="display:none; margin-top:8px; border:1.5px solid #2563eb; background:#f0f7ff;">
                                </div>
                                <div class="form-group">
                                    <label for="complaintSectionAct">Sections &amp; Acts</label>
                                    <input id="complaintSectionAct" type="text" placeholder="e.g. Sec 138 NI Act, Sec 406/420 IPC">
                                </div>
                                <div class="form-group">
                                    <label for="complaintComplainant">Complainant Name (परिवादी) *</label>
                                    <input id="complaintComplainant" type="text" placeholder="Enter Complainant Name">
                                </div>
                                <div class="form-group">
                                    <label for="complaintAccusedName">Accused / Opposite Party (विपक्षी / अभियुक्त) *</label>
                                    <input id="complaintAccusedName" type="text" placeholder="Enter Accused / Opposite Party Name">
                                </div>
                                <div class="form-group">
                                    <label for="complaintPoliceStation">Police Station / Thana Jurisdiction</label>
                                    <select id="complaintPoliceStation">
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
                                    <input type="text" id="complaintPoliceStationCustom" placeholder="✍️ Specify other Police Station name..." style="display:none; margin-top:8px; border:1.5px solid #2563eb; background:#f0f7ff;">
                                </div>
                                <div class="form-group">
                                    <label for="complaintCourtName">Court</label>
                                    <div class="court-input-wrapper">
                                        <select id="complaintCourtName">
                                            <option value="">-- Select Court --</option>
                                        </select>
                                        <button type="button" id="addComplaintCourtBtn" class="mini-court-btn" title="Add Court">+</button>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="complaintFilingDate">Filing Date</label>
                                    <input id="complaintFilingDate" type="date">
                                </div>
                                <div class="form-group">
                                    <label for="complaintClientName">Client Name</label>
                                    <input id="complaintClientName" type="text" placeholder="Enter Client Name">
                                </div>
                                <div class="form-group">
                                    <label for="complaintClientNumber">Client Number</label>
                                    <input id="complaintClientNumber" type="tel" placeholder="Enter Client Phone Number">
                                </div>
                                <div class="form-group" style="grid-column: 1 / -1;">
                                    <label for="complaintDocLink">Document / Complaint Copy Link (Drive/PDF URL)</label>
                                    <input id="complaintDocLink" type="url" placeholder="https://drive.google.com/... or document URL">
                                </div>
                                <div style="grid-column: 1 / -1;" class="remarks-coparties-box">
                                    <div class="remarks-box-header">
                                        <div class="remarks-box-title-wrap">
                                            <span class="remarks-box-icon">📢</span>
                                            <label for="complaintCaseRemark" class="remarks-box-label">Remarks &amp; Case Notes</label>
                                        </div>
                                        <span class="remarks-searchable-badge">🔍 Live Searchable in Portal</span>
                                    </div>
                                    <div class="remarks-quick-chips">
                                        <span class="remarks-chip-btn" onclick="insertRemarkChip('complaintCaseRemark', 'Cheque Details: No. , Date: , Amount: Rs. , Bank: ')">➕ Cheque Details</span>
                                        <span class="remarks-chip-btn" onclick="insertRemarkChip('complaintCaseRemark', 'Statutory Demand Notice Sent on: , Served on: ')">➕ Notice Served</span>
                                        <span class="remarks-chip-btn" onclick="insertRemarkChip('complaintCaseRemark', 'Sec 200 CrPC Statement Recorded on ')">➕ Sec 200 Statement</span>
                                        <span class="remarks-chip-btn" onclick="insertRemarkChip('complaintCaseRemark', 'Summoning Order Date: ')">➕ Summoning Order</span>
                                    </div>
                                    <textarea id="complaintCaseRemark" rows="2" placeholder="e.g. Cheque No. 458921, dishonour memo attached, statutory demand notice served, Sec 200 statement recorded..."></textarea>
                                    <div class="remarks-box-footer">
                                        <span class="remarks-box-tip">💡 <b>Search Index:</b> Cheque numbers, memo details, notice dates, and summoning stages are indexed &amp; searchable.</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button type="submit" class="primary-btn form-submit-btn"><i class="fa-solid fa-paper-plane"></i> Submit Case Record</button>
                    </form>
                </div>
`;
