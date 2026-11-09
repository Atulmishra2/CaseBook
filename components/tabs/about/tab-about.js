window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs['about'] = `<div class="section-header-row">
    <div class="section-title-box">
        <div class="section-icon-badge"><iconify-icon icon="lucide:info"></iconify-icon></div>
        <div>
            <h3 style="color: var(--text-main) !important; font-size: 1.25rem !important; font-weight: 800 !important; margin: 0 !important; display: flex !important; align-items: center !important;">About CaseBook System</h3>
            <p class="section-subtitle" style="color: var(--text-muted) !important; font-size: 12.5px !important; margin: 2px 0 0 !important;">Chambers Practice SOP &bull; Complete Documentation &bull; System Architecture</p>
        </div>
    </div>
</div>
<div class="about-page">
    <div class="about-hero" style="background: linear-gradient(135deg, #1e2538 0%, #0f172a 100%) !important; color: #ffffff !important;">
        <div class="about-logo" style="background: linear-gradient(135deg, rgba(86, 116, 214, 0.3), rgba(86, 116, 214, 0.15)) !important; border: 1px solid rgba(129, 140, 248, 0.4) !important;">
            <iconify-icon icon="lucide:scale" style="font-size: 30px !important; color: #a5b4fc !important;"></iconify-icon>
        </div>
        <div>
            <h2 style="color: #ffffff !important; margin: 0 !important; font-weight: 800 !important;">CaseBook — Case Management System</h2>
            <p class="about-tagline" style="color: #cbd5e1 !important; margin: 6px 0 0 !important;">A complete digital chambers for advocates: cases, hearings, cause lists &mdash; in one place.</p>
        </div>
    </div>

    <!-- Chambers Documentation & User Manual Section -->
    <div class="about-doc-banner">
        <div class="about-doc-main">
            <div class="about-doc-icon-wrap" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important; color: #ffffff !important;">
                <iconify-icon icon="lucide:book-marked" style="color: #ffffff !important;"></iconify-icon>
            </div>
            <div class="about-doc-content">
                <div class="about-doc-badge">
                    <iconify-icon icon="lucide:file-text"></iconify-icon> Official Chambers Manual &bull; v7.45
                </div>
                <h3>CaseBook Complete Documentation &amp; Practice Manual</h3>
                <p>Official Chambers Standard Operating Procedure (SOP) covering all 10 practice modules, dynamic case registration, daily cause lists, hearing calendar, financial khata, enterprise security protocols, and keyboard shortcuts.</p>
                <div class="about-doc-tags">
                    <span class="doc-tag"><iconify-icon icon="lucide:check"></iconify-icon> Standard Operating Procedure</span>
                    <span class="doc-tag"><iconify-icon icon="lucide:shield-check"></iconify-icon> Security Hardening</span>
                    <span class="doc-tag"><iconify-icon icon="lucide:smartphone"></iconify-icon> PWA Offline Guide</span>
                    <span class="doc-tag"><iconify-icon icon="lucide:printer"></iconify-icon> A4 Printable Document</span>
                </div>
            </div>
        </div>

        <!-- Action Buttons: Download PDF, Web SOP, Print, In-App Reader -->
        <div class="about-doc-actions">
            <a href="CaseBook_Documentation.pdf" download="CaseBook_Documentation.pdf" class="doc-action-btn doc-btn-download" style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%) !important; color: #ffffff !important;" title="Download Official Documentation PDF">
                <iconify-icon icon="lucide:file-down" style="color: #ffffff !important;"></iconify-icon>
                <span style="color: #ffffff !important;">
                    <strong style="color: #ffffff !important;">Download PDF Manual</strong>
                    <small style="color: rgba(255, 255, 255, 0.9) !important;">Official A4 Format (~550 KB)</small>
                </span>
            </a>
            <a href="documentation.html" target="_blank" rel="noopener noreferrer" class="doc-action-btn doc-btn-view" style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%) !important; color: #ffffff !important;" title="Open Interactive Web Manual in New Window">
                <iconify-icon icon="lucide:external-link" style="color: #ffffff !important;"></iconify-icon>
                <span style="color: #ffffff !important;">
                    <strong style="color: #ffffff !important;">Open Full Manual</strong>
                    <small style="color: rgba(255, 255, 255, 0.9) !important;">Interactive Web Reader</small>
                </span>
            </a>
            <button type="button" class="doc-action-btn doc-btn-print" onclick="window.open('documentation.html?print=1', '_blank')" title="Directly Print A4 Documentation Manual">
                <iconify-icon icon="lucide:printer"></iconify-icon>
                <span>
                    <strong>Print A4 Manual</strong>
                    <small>Printer-friendly format</small>
                </span>
            </button>
            <button type="button" class="doc-action-btn doc-btn-preview" id="toggleDocPreviewBtn" onclick="toggleDocInlinePreview()" aria-expanded="false" aria-controls="aboutDocInlinePreviewContainer" title="Toggle embedded documentation reader">
                <iconify-icon icon="lucide:book-open"></iconify-icon>
                <span>
                    <strong id="docPreviewBtnText">Read Manual Here</strong>
                    <small>In-App Instant Reader</small>
                </span>
            </button>
        </div>

        <!-- Quick Documentation Chapter Explorer -->
        <div class="about-doc-chapters-grid">
            <a href="documentation.html#system-architecture" target="_blank" class="doc-chapter-pill">
                <iconify-icon icon="lucide:cpu"></iconify-icon>
                <span>1. Architecture &amp; PWA</span>
            </a>
            <a href="documentation.html#roles-access" target="_blank" class="doc-chapter-pill">
                <iconify-icon icon="lucide:shield"></iconify-icon>
                <span>2. Auth &amp; Roles</span>
            </a>
            <a href="documentation.html#module-registration" target="_blank" class="doc-chapter-pill">
                <iconify-icon icon="lucide:file-plus"></iconify-icon>
                <span>3. Dynamic Case Filing</span>
            </a>
            <a href="documentation.html#module-causelist" target="_blank" class="doc-chapter-pill">
                <iconify-icon icon="lucide:clipboard-list"></iconify-icon>
                <span>4. Cause List &amp; Board</span>
            </a>
            <a href="documentation.html#module-calendar" target="_blank" class="doc-chapter-pill">
                <iconify-icon icon="lucide:calendar"></iconify-icon>
                <span>5. Calendar &amp; Forwarding</span>
            </a>
            <a href="documentation.html#module-accounts" target="_blank" class="doc-chapter-pill">
                <iconify-icon icon="lucide:wallet"></iconify-icon>
                <span>6. Accounts &amp; Khata</span>
            </a>
            <a href="documentation.html#module-courts" target="_blank" class="doc-chapter-pill">
                <iconify-icon icon="lucide:landmark"></iconify-icon>
                <span>7. Courts &amp; Directory</span>
            </a>
            <a href="documentation.html#shortcuts" target="_blank" class="doc-chapter-pill">
                <iconify-icon icon="lucide:keyboard"></iconify-icon>
                <span>8. Shortcuts Cheat Sheet</span>
            </a>
        </div>
    </div>

    <!-- Collapsible Inline Manual Viewer -->
    <div id="aboutDocInlinePreviewContainer" class="about-doc-inline-preview" style="display: none;">
        <div class="about-doc-preview-header">
            <div class="about-doc-preview-title">
                <iconify-icon icon="lucide:book-open" class="text-emerald-400"></iconify-icon>
                <span>In-App Documentation Reader &mdash; CaseBook Chambers SOP</span>
            </div>
            <div class="about-doc-preview-tools">
                <a href="CaseBook_Documentation.pdf" download="CaseBook_Documentation.pdf" class="preview-tool-btn" title="Download PDF"><iconify-icon icon="lucide:file-down"></iconify-icon> Download PDF</a>
                <a href="documentation.html" target="_blank" class="preview-tool-btn" title="Open in New Tab"><iconify-icon icon="lucide:external-link"></iconify-icon> Fullscreen</a>
                <button type="button" class="preview-tool-btn close-btn" onclick="toggleDocInlinePreview()" title="Close Preview"><iconify-icon icon="lucide:x"></iconify-icon> Close</button>
            </div>
        </div>
        <iframe id="aboutDocIframe" class="about-doc-iframe" title="CaseBook System Documentation" data-src="documentation.html" loading="lazy"></iframe>
    </div>

    <div class="about-grid">
        <div class="about-card">
            <h4><iconify-icon icon="lucide:info"></iconify-icon> About the Project</h4>
            <p>CaseBook is a Progressive Web App (PWA) built for legal professionals to manage their entire practice &mdash; case records, hearing schedules, daily cause lists, court directory, client dossiers and to-do deadlines &mdash; both online and offline.</p>
        </div>
        <div class="about-card">
            <h4><iconify-icon icon="lucide:layers"></iconify-icon> Key Modules</h4>
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
            <h4><iconify-icon icon="lucide:code-2"></iconify-icon> Technology</h4>
            <p>Vanilla HTML / CSS / JavaScript &mdash; no frameworks, no build step. Service Worker offline caching, localStorage-first data with optional Supabase cloud sync, and a custom in-app date picker. Installable as a desktop &amp; mobile app.</p>
        </div>
        <div class="about-card">
            <h4><iconify-icon icon="lucide:shield-check"></iconify-icon> Developer &amp; License</h4>
            <dl class="about-meta">
                <dt>Developer</dt><dd>Atul Kumar Mishra &mdash; Advocate &amp; Developer</dd>
                <dt>Jurisdiction</dt><dd>District &amp; High Courts</dd>
                <dt>Version</dt><dd>7.45 (Sept 2026)</dd>
                <dt>License</dt><dd>Proprietary &mdash; All rights reserved</dd>
            </dl>
        </div>
    </div>
</div>`;
