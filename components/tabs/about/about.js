window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs['about'] = `<div class="section-header-row">
    <div class="section-title-box">
        <div class="section-icon-badge"><i class="fa-solid fa-circle-info"></i></div>
        <div>
            <h3>About CaseBook System</h3>
            <p class="section-subtitle">Antigravity High-Court Legal Practice & Chambers Management Platform</p>
            <div class="header-chips-row">
                <span class="header-chip-btn"><i class="fa-solid fa-code"></i> Version 8.17</span>
            </div>
        </div>
    </div>
</div>
<div class="about-page">
                    <div class="about-hero">
                        <div class="about-logo"><i class="fa-solid fa-scale-balanced"></i></div>
                        <div>
                            <h2>CaseBook â€” Case Management System</h2>
                            <p class="about-tagline">A complete digital chambers for advocates: cases, hearings, cause lists &mdash; in one place.</p>
                        </div>
                    </div>

                    <!-- Chambers Documentation & User Manual Section -->
                    <div class="about-doc-banner">
                        <div class="about-doc-main">
                            <div class="about-doc-icon-wrap">
                                <i class="fa-solid fa-book-bookmark"></i>
                            </div>
                            <div class="about-doc-content">
                                <div class="about-doc-badge">
                                    <i class="fa-solid fa-file-pdf"></i> Official Chambers Manual &bull; v7.45
                                </div>
                                <h3>CaseBook Complete Documentation &amp; Practice Manual</h3>
                                <p>Official Chambers Standard Operating Procedure (SOP) covering all 10 practice modules, dynamic case registration, daily cause lists, hearing calendar, financial khata, enterprise security protocols, and keyboard shortcuts.</p>
                                <div class="about-doc-tags">
                                    <span class="doc-tag"><i class="fa-solid fa-check"></i> Standard Operating Procedure</span>
                                    <span class="doc-tag"><i class="fa-solid fa-shield-halved"></i> Security Hardening</span>
                                    <span class="doc-tag"><i class="fa-solid fa-mobile-screen"></i> PWA Offline Guide</span>
                                    <span class="doc-tag"><i class="fa-solid fa-print"></i> A4 Printable Document</span>
                                </div>
                            </div>
                        </div>

                        <!-- Action Buttons: Download PDF, Web SOP, Print, In-App Reader -->
                        <div class="about-doc-actions">
                            <a href="CaseBook_Documentation.pdf" download="CaseBook_Documentation.pdf" class="doc-action-btn doc-btn-download" title="Download Official Documentation PDF">
                                <i class="fa-solid fa-file-pdf"></i>
                                <span>
                                    <strong>Download PDF Manual</strong>
                                    <small>Official A4 Format (~550 KB)</small>
                                </span>
                            </a>
                            <a href="documentation.html" target="_blank" rel="noopener noreferrer" class="doc-action-btn doc-btn-view" title="Open Interactive Web Manual in New Window">
                                <i class="fa-solid fa-arrow-up-right-from-square"></i>
                                <span>
                                    <strong>Open Full Manual</strong>
                                    <small>Interactive Web Reader</small>
                                </span>
                            </a>
                            <button type="button" class="doc-action-btn doc-btn-print" onclick="window.open('documentation.html?print=1', '_blank')" title="Directly Print A4 Documentation Manual">
                                <i class="fa-solid fa-print"></i>
                                <span>
                                    <strong>Print A4 Manual</strong>
                                    <small>Printer-friendly format</small>
                                </span>
                            </button>
                            <button type="button" class="doc-action-btn doc-btn-preview" id="toggleDocPreviewBtn" onclick="toggleDocInlinePreview()" title="Toggle embedded documentation reader">
                                <i class="fa-solid fa-book-open-reader"></i>
                                <span>
                                    <strong id="docPreviewBtnText">Read Manual Here</strong>
                                    <small>In-App Instant Reader</small>
                                </span>
                            </button>
                        </div>

                        <!-- Quick Documentation Chapter Explorer -->
                        <div class="about-doc-chapters-grid">
                            <a href="documentation.html#system-architecture" target="_blank" class="doc-chapter-pill">
                                <i class="fa-solid fa-microchip"></i>
                                <span>1. Architecture &amp; PWA</span>
                            </a>
                            <a href="documentation.html#roles-access" target="_blank" class="doc-chapter-pill">
                                <i class="fa-solid fa-shield-halved"></i>
                                <span>2. Auth &amp; Roles</span>
                            </a>
                            <a href="documentation.html#module-registration" target="_blank" class="doc-chapter-pill">
                                <i class="fa-solid fa-file-circle-plus"></i>
                                <span>3. Dynamic Case Filing</span>
                            </a>
                            <a href="documentation.html#module-causelist" target="_blank" class="doc-chapter-pill">
                                <i class="fa-solid fa-clipboard-list"></i>
                                <span>4. Cause List &amp; Board</span>
                            </a>
                            <a href="documentation.html#module-calendar" target="_blank" class="doc-chapter-pill">
                                <i class="fa-solid fa-calendar-days"></i>
                                <span>5. Calendar &amp; Forwarding</span>
                            </a>
                            <a href="documentation.html#module-accounts" target="_blank" class="doc-chapter-pill">
                                <i class="fa-solid fa-wallet"></i>
                                <span>6. Accounts &amp; Khata</span>
                            </a>
                            <a href="documentation.html#module-courts" target="_blank" class="doc-chapter-pill">
                                <i class="fa-solid fa-gavel"></i>
                                <span>7. Courts &amp; Directory</span>
                            </a>
                            <a href="documentation.html#shortcuts" target="_blank" class="doc-chapter-pill">
                                <i class="fa-solid fa-keyboard"></i>
                                <span>8. Shortcuts Cheat Sheet</span>
                            </a>
                        </div>
                    </div>

                    <!-- Collapsible Inline Manual Viewer -->
                    <div id="aboutDocInlinePreviewContainer" class="about-doc-inline-preview" style="display: none;">
                        <div class="about-doc-preview-header">
                            <div class="about-doc-preview-title">
                                <i class="fa-solid fa-book-open-reader text-emerald-400"></i>
                                <span>In-App Documentation Reader &mdash; CaseBook Chambers SOP</span>
                            </div>
                            <div class="about-doc-preview-tools">
                                <a href="CaseBook_Documentation.pdf" download="CaseBook_Documentation.pdf" class="preview-tool-btn" title="Download PDF"><i class="fa-solid fa-file-pdf"></i> Download PDF</a>
                                <a href="documentation.html" target="_blank" class="preview-tool-btn" title="Open in New Tab"><i class="fa-solid fa-arrow-up-right-from-square"></i> Fullscreen</a>
                                <button type="button" class="preview-tool-btn close-btn" onclick="toggleDocInlinePreview()" title="Close Preview"><i class="fa-solid fa-xmark"></i> Close</button>
                            </div>
                        </div>
                        <iframe id="aboutDocIframe" class="about-doc-iframe" title="CaseBook System Documentation" data-src="documentation.html" loading="lazy"></iframe>
                    </div>

                    <div class="about-grid">
                        <div class="about-card">
                            <h4><i class="fa-solid fa-circle-info"></i> About the Project</h4>
                            <p>CaseBook is a Progressive Web App (PWA) built for legal professionals to manage their entire practice &mdash; case records, hearing schedules, daily cause lists, court directory, client dossiers and to-do deadlines &mdash; both online and offline.</p>
                        </div>
                        <div class="about-card">
                            <h4><i class="fa-solid fa-boxes-stacked"></i> Key Modules</h4>
                            <ul>
                                <li>Home Dashboard &amp; KPI insights</li>
                                <li>Case Cards Board &amp; full case registers</li>
                                <li>Daily Cause List &amp; Appearance Board</li>
                                <li>Court Hearing Calendar &amp; Scheduler</li>
                                <li>Chambers Accounts &amp; Khata Expense Manager</li>
                                <li>Update / Transfer / Dispose workflows</li>
                                <li>Courts &amp; Court Helpers Directory</li>
                                <li>Supabase cloud sync (DB Manager)</li>
                            </ul>
                        </div>
                        <div class="about-card">
                            <h4><i class="fa-solid fa-code"></i> Technology</h4>
                            <p>Vanilla HTML / CSS / JavaScript &mdash; no frameworks, no build step. Service Worker offline caching, localStorage-first data with optional Supabase cloud sync, and a custom in-app date picker. Installable as a desktop &amp; mobile app.</p>
                        </div>
                        <div class="about-card">
                            <h4><i class="fa-solid fa-user-tie"></i> Developer &amp; License</h4>
                            <dl class="about-meta">
                                <dt>Developer</dt><dd>Atul Kumar Mishra &mdash; Advocate &amp; Developer</dd>
                                <dt>Jurisdiction</dt><dd>District &amp; High Courts</dd>
                                <dt>Version</dt><dd>7.45 (Sept 2026)</dd>
                                <dt>License</dt><dd>Proprietary &mdash; All rights reserved</dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>`;
