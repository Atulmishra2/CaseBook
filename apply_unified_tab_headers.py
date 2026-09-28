import re
import os

# 1. Unified CSS Rules for components/global-rules.css & admin.css
header_css = '''

/* ==============================================================================
   UNIFIED PRO MAX TAB HEADER ARCHITECTURE (Reference Image Specification)
   - Background: 135deg Dark Diagonal Gradient using Theme Primary -> Secondary
   - Radius: Matches --wrapper-radius / --radius-card (var(--radius-card, 16px))
   - Main Icon Badge: 46px rounded-square (12px radius) with centered white icon
   - Title & Subtitle: Bold white title + dimmed/muted gradient-toned subtitle
   - Action Chips: 9999px rounded pills, transparent/glassy dark bg, theme border
   ============================================================================== */

:root {
  --wrapper-radius: var(--radius-card, 16px);
  --header-gradient: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
  --header-border: #334155;
  --header-badge-bg: rgba(255, 255, 255, 0.12);
  --header-badge-border: rgba(255, 255, 255, 0.2);
  --header-chip-bg: rgba(255, 255, 255, 0.08);
  --header-chip-border: rgba(255, 255, 255, 0.22);
}

/* Theme Adaptations */
html.theme-light, html[data-theme="light"] {
  --header-gradient: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
  --header-border: #334155;
  --header-badge-bg: rgba(255, 255, 255, 0.12);
  --header-chip-bg: rgba(255, 255, 255, 0.08);
}

html.theme-forest, html[data-theme="forest"] {
  --header-gradient: linear-gradient(135deg, #064E3B 0%, #04392B 100%);
  --header-border: rgba(167, 243, 208, 0.25);
  --header-badge-bg: rgba(5, 150, 105, 0.3);
  --header-chip-bg: rgba(5, 150, 105, 0.2);
}

html.theme-azure, html[data-theme="azure"] {
  --header-gradient: linear-gradient(135deg, #0B132B 0%, #1C2541 100%);
  --header-border: rgba(14, 165, 233, 0.25);
  --header-badge-bg: rgba(2, 132, 199, 0.3);
  --header-chip-bg: rgba(2, 132, 199, 0.2);
}

html.theme-executive, html[data-theme="executive"] {
  --header-gradient: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
  --header-border: rgba(217, 119, 6, 0.3);
  --header-badge-bg: rgba(217, 119, 6, 0.3);
  --header-chip-bg: rgba(217, 119, 6, 0.2);
}

html.theme-midnight, html[data-theme="midnight"] {
  --header-gradient: linear-gradient(135deg, #0A0E17 0%, #141B2D 100%);
  --header-border: rgba(56, 189, 248, 0.25);
  --header-badge-bg: rgba(56, 189, 248, 0.25);
  --header-chip-bg: rgba(56, 189, 248, 0.15);
}

html.theme-mint, html[data-theme="mint"] {
  --header-gradient: linear-gradient(135deg, #064E3B 0%, #065F46 100%);
  --header-border: rgba(16, 185, 129, 0.3);
  --header-badge-bg: rgba(16, 185, 129, 0.3);
  --header-chip-bg: rgba(16, 185, 129, 0.2);
}

html.theme-corporate, html[data-theme="corporate"] {
  --header-gradient: linear-gradient(135deg, #202124 0%, #18181B 100%);
  --header-border: rgba(13, 148, 136, 0.3);
  --header-badge-bg: rgba(13, 148, 136, 0.3);
  --header-chip-bg: rgba(13, 148, 136, 0.2);
}

html.theme-classic, html[data-theme="classic"] {
  --header-gradient: linear-gradient(135deg, #1B2A47 0%, #0F172A 100%);
  --header-border: rgba(197, 168, 128, 0.3);
  --header-badge-bg: rgba(197, 168, 128, 0.3);
  --header-chip-bg: rgba(197, 168, 128, 0.2);
}

/* Master Header Container styling across all tabs */
.section-header-row,
.upcoming-hero-banner,
.my-cases-header-card,
.page-head,
.causelist-header-card,
.calendar-header-card,
.tab-header-hero {
  background: var(--header-gradient) !important;
  border: 1px solid var(--header-border) !important;
  border-radius: var(--wrapper-radius, var(--radius-card, 16px)) !important;
  padding: 20px 24px !important;
  margin-bottom: 20px !important;
  color: #FFFFFF !important;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.12), 0 1px 3px rgba(15, 23, 42, 0.08) !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 14px !important;
  box-sizing: border-box !important;
}

/* Header Top Group: Icon + Title + Description */
.section-title-box,
.upcoming-hero-info,
.page-head-title-wrap,
.header-top-box {
  display: flex !important;
  align-items: flex-start !important;
  gap: 16px !important;
  width: 100% !important;
}

/* Main Icon Badge (approx 44-48px rounded square with 12px radius) */
.section-icon-badge,
.upcoming-hero-emblem,
.page-head-icon-badge,
.tab-header-icon-badge,
.banner-icon {
  width: 46px !important;
  height: 46px !important;
  min-width: 46px !important;
  min-height: 46px !important;
  border-radius: 12px !important;
  background: var(--header-badge-bg) !important;
  border: 1px solid var(--header-badge-border) !important;
  color: #FFFFFF !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-size: 20px !important;
  flex-shrink: 0 !important;
  backdrop-filter: blur(8px) !important;
  -webkit-backdrop-filter: blur(8px) !important;
}

.section-icon-badge i,
.upcoming-hero-emblem i,
.tab-header-icon-badge i {
  color: #FFFFFF !important;
}

/* Title & Description */
.section-title-box h2,
.section-title-box h3,
.upcoming-hero-text h2,
.page-title,
.search-card-heading,
.header-top-box h2,
.header-top-box h3 {
  color: #FFFFFF !important;
  font-size: 22px !important;
  font-weight: 800 !important;
  letter-spacing: -0.015em !important;
  margin: 0 0 4px 0 !important;
  line-height: 1.25 !important;
}

.section-title-box p,
.section-subtitle,
.upcoming-hero-text p,
.page-sub,
.header-top-box p {
  color: rgba(255, 255, 255, 0.75) !important;
  font-size: 13px !important;
  font-weight: 400 !important;
  line-height: 1.45 !important;
  margin: 0 !important;
}

/* Action Chips Row (below title) */
.header-chips-row,
.upcoming-hero-controls,
.causelist-header-actions,
.causelist-preset-buttons,
.preset-buttons,
.action-chips-row {
  display: flex !important;
  align-items: center !important;
  gap: 10px !important;
  flex-wrap: wrap !important;
  margin-top: 2px !important;
}

.header-chip-btn,
.preset-pill,
.upcoming-stat-pill,
.upcoming-cal-btn,
.tab-action-chip {
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
  padding: 6px 16px !important;
  border-radius: 9999px !important;
  background: var(--header-chip-bg) !important;
  border: 1px solid var(--header-chip-border) !important;
  color: #FFFFFF !important;
  font-size: 12.5px !important;
  font-weight: 600 !important;
  cursor: pointer !important;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
  backdrop-filter: blur(6px) !important;
  -webkit-backdrop-filter: blur(6px) !important;
  text-decoration: none !important;
}

.header-chip-btn:hover,
.preset-pill:hover,
.upcoming-stat-pill:hover,
.upcoming-cal-btn:hover,
.tab-action-chip:hover {
  background: rgba(255, 255, 255, 0.18) !important;
  border-color: rgba(255, 255, 255, 0.4) !important;
  color: #FFFFFF !important;
  transform: translateY(-1px) !important;
}

.header-chip-btn i,
.preset-pill i,
.upcoming-stat-pill i,
.upcoming-cal-btn i {
  color: #FFFFFF !important;
}
'''

# Append to components/global-rules.css & admin.css
with open('d:/caseBook/components/global-rules.css', 'r', encoding='utf-8', errors='ignore') as f:
    g_css = f.read()

if 'UNIFIED PRO MAX TAB HEADER ARCHITECTURE' not in g_css:
    g_css += header_css

with open('d:/caseBook/components/global-rules.css', 'w', encoding='utf-8') as f:
    f.write(g_css)

with open('d:/caseBook/admin.css', 'r', encoding='utf-8', errors='ignore') as f:
    a_css = f.read()

if 'UNIFIED PRO MAX TAB HEADER ARCHITECTURE' not in a_css:
    a_css += header_css

with open('d:/caseBook/admin.css', 'w', encoding='utf-8') as f:
    f.write(a_css)

print("Appended Header Architecture CSS to global-rules.css & admin.css!")

# 2. Update tab headers in all tab HTML files
tab_headers = {
    'upcoming': {
        'icon': 'fa-gavel',
        'title': 'Upcoming Court Hearings',
        'sub': 'Active listings, court appearances, and hearing procedures scheduled for the next 7 days',
        'chips': '''<span class="header-chip-btn" id="upcomingListedCountChip"><i class="fa-solid fa-list-check"></i> 7 Hearings Listed</span>
                    <button type="button" class="header-chip-btn" onclick="showTab('calendar')"><i class="fa-solid fa-calendar-days"></i> Master Calendar</button>'''
    },
    'causelist': {
        'icon': 'fa-scroll',
        'title': 'Daily Cause List & Appearance Board',
        'sub': 'Chambers daily appearance register, court rooms, listed matters, and proceedings board',
        'chips': '''<button type="button" class="header-chip-btn" onclick="setCauseListDateOffset(0)"><i class="fa-solid fa-thumbtack"></i> Today</button>
                    <button type="button" class="header-chip-btn" onclick="setCauseListDateOffset(1)"><i class="fa-solid fa-bolt"></i> Tomorrow</button>
                    <button type="button" class="header-chip-btn" onclick="printDailyCauseList()"><i class="fa-solid fa-print"></i> Print Cause List (A4)</button>'''
    },
    'calendar': {
        'icon': 'fa-calendar-days',
        'title': 'Master Calendar Scheduler',
        'sub': 'Visual monthly & weekly timeline for case hearings, procedural tasks, and court dates',
        'chips': '''<button type="button" class="header-chip-btn" onclick="showTab('causelist')"><i class="fa-solid fa-scroll"></i> Cause List</button>
                    <button type="button" class="header-chip-btn" onclick="showTab('upcoming')"><i class="fa-solid fa-gavel"></i> Upcoming Hearings</button>'''
    },
    'todo': {
        'icon': 'fa-list-check',
        'title': 'Case Tasks & To-Do Tracker',
        'sub': 'Chambers action items, filing deadlines, client follow-ups, and pending tasks',
        'chips': '''<button type="button" class="header-chip-btn" onclick="setTodoFilter('pending')"><i class="fa-solid fa-clock"></i> Pending Tasks</button>
                    <button type="button" class="header-chip-btn" onclick="showTab('add')"><i class="fa-solid fa-plus"></i> Add New Task</button>'''
    },
    'paisa': {
        'icon': 'fa-indian-rupee-sign',
        'title': 'Paisa Manager & Finance',
        'sub': 'Chambers fee collections, client billing ledgers, expense logs, and financial records',
        'chips': '''<button type="button" class="header-chip-btn" onclick="openPaisaModal('income')"><i class="fa-solid fa-arrow-down-left"></i> Receive Fee</button>
                    <button type="button" class="header-chip-btn" onclick="openPaisaModal('expense')"><i class="fa-solid fa-arrow-up-right"></i> Log Expense</button>'''
    },
    'search': {
        'icon': 'fa-magnifying-glass',
        'title': 'My Cases Registry & Search',
        'sub': 'Complete searchable and filterable database of all active and archived court cases',
        'chips': '''<button type="button" class="header-chip-btn" onclick="setQuickCaseFilter('today')"><i class="fa-solid fa-calendar-day"></i> Listed Today</button>
                    <button type="button" class="header-chip-btn" onclick="setQuickCaseFilter('disposed')"><i class="fa-solid fa-circle-check"></i> Disposed Cases</button>'''
    },
    'all': {
        'icon': 'fa-folder-tree',
        'title': 'All Cases Master Register',
        'sub': 'Unified master directory of all legal matters registered across courts and forums',
        'chips': '''<button type="button" class="header-chip-btn" onclick="filterAllCasesByType('all')"><i class="fa-solid fa-layer-group"></i> All Matters</button>
                    <button type="button" class="header-chip-btn" onclick="showTab('add')"><i class="fa-solid fa-plus"></i> Add New Case</button>'''
    },
    'cards': {
        'icon': 'fa-scale-balanced',
        'title': 'Case Cards Board',
        'sub': 'Modern grid view of active legal matters with live status indicators and quick actions',
        'chips': '''<button type="button" class="header-chip-btn" onclick="setCaseCardsPill('all', this)"><i class="fa-solid fa-border-all"></i> All Cards</button>
                    <button type="button" class="header-chip-btn" onclick="showTab('add')"><i class="fa-solid fa-plus"></i> Add Case</button>'''
    },
    'add': {
        'icon': 'fa-folder-plus',
        'title': 'Add New Case Registration',
        'sub': 'Register a new legal matter, assign court complex, client details, and initial hearing date',
        'chips': '''<button type="button" class="header-chip-btn" onclick="showTab('search')"><i class="fa-solid fa-magnifying-glass"></i> Search Cases</button>'''
    },
    'update': {
        'icon': 'fa-pen-to-square',
        'title': 'Update Case Details',
        'sub': 'Modify matter information, parties, client phone, forum details, and case status',
        'chips': '''<button type="button" class="header-chip-btn" onclick="showTab('search')"><i class="fa-solid fa-magnifying-glass"></i> Case Registry</button>'''
    },
    'hearing': {
        'icon': 'fa-gavel',
        'title': 'Log Hearing & Proceedings',
        'sub': 'Record court proceedings, next appearance date, order details, and interim directions',
        'chips': '''<button type="button" class="header-chip-btn" onclick="showTab('upcoming')"><i class="fa-solid fa-clock"></i> Upcoming Hearings</button>'''
    },
    'transfer': {
        'icon': 'fa-right-left',
        'title': 'Case Transfer & Re-assignment',
        'sub': 'Transfer legal matters between court rooms, judges, advocates, or forum jurisdictions',
        'chips': '''<button type="button" class="header-chip-btn" onclick="showTab('courts')"><i class="fa-solid fa-building-columns"></i> Manage Courts</button>'''
    },
    'delete': {
        'icon': 'fa-trash-can',
        'title': 'Case Disposal & Archive',
        'sub': 'Mark case proceedings as disposed, final order passed, or remove redundant test records',
        'chips': '''<button type="button" class="header-chip-btn" onclick="showTab('disposed')"><i class="fa-solid fa-circle-check"></i> Disposed Archive</button>'''
    },
    'courts': {
        'icon': 'fa-building-columns',
        'title': 'Manage Courts Directory',
        'sub': 'Configure court complexes, bench rooms, presiding officers, and judicial forums',
        'chips': '''<button type="button" class="header-chip-btn" onclick="showTab('causelist')"><i class="fa-solid fa-scroll"></i> Daily Cause List</button>'''
    },
    'helpers': {
        'icon': 'fa-id-card-clip',
        'title': 'Court Staff & Helpers Directory',
        'sub': 'Chambers directory for court readers, clerks, process servers, and contact staff',
        'chips': '''<button type="button" class="header-chip-btn" onclick="showTab('courts')"><i class="fa-solid fa-building-columns"></i> Courts</button>'''
    },
    'livecrud': {
        'icon': 'fa-database',
        'title': 'Live Database Manager',
        'sub': 'Direct real-time cloud data editor, database records viewer, and raw table manager',
        'chips': '''<button type="button" class="header-chip-btn" onclick="refreshLiveCrudData()"><i class="fa-solid fa-arrows-rotate"></i> Refresh Sync</button>'''
    },
    'undated': {
        'icon': 'fa-clock-rotate-left',
        'title': 'Undated Cases Register',
        'sub': 'Matters requiring new hearing dates, pending orders, or unscheduled list appearances',
        'chips': '''<button type="button" class="header-chip-btn" onclick="showTab('hearing')"><i class="fa-solid fa-gavel"></i> Assign Hearing</button>'''
    },
    'disposed': {
        'icon': 'fa-box-archive',
        'title': 'Disposed Cases Archive',
        'sub': 'Historical archive of finalized judgments, disposed matters, and closed case files',
        'chips': '''<button type="button" class="header-chip-btn" onclick="showTab('search')"><i class="fa-solid fa-magnifying-glass"></i> All Cases</button>'''
    },
    'settings': {
        'icon': 'fa-gear',
        'title': 'System & Account Settings',
        'sub': 'Configure chambers profile, password security, backup preferences, and app options',
        'chips': '''<button type="button" class="header-chip-btn" onclick="showTab('themes')"><i class="fa-solid fa-palette"></i> Themes Engine</button>'''
    },
    'themes': {
        'icon': 'fa-palette',
        'title': 'Theme Engine & Customizer',
        'sub': 'Customize application colors, select pre-built themes, or create your custom palette',
        'chips': '''<button type="button" class="header-chip-btn" onclick="setAppTheme('light')"><i class="fa-solid fa-sun"></i> Pure Light</button>
                    <button type="button" class="header-chip-btn" onclick="setAppTheme('forest')"><i class="fa-solid fa-tree"></i> Cambridge Forest</button>'''
    },
    'about': {
        'icon': 'fa-circle-info',
        'title': 'About CaseBook System',
        'sub': 'Antigravity High-Court Legal Practice & Chambers Management Platform',
        'chips': '''<span class="header-chip-btn"><i class="fa-solid fa-code"></i> Version 8.17</span>'''
    }
}

for tab_name, meta in tab_headers.items():
    html_file = f"d:/caseBook/components/tabs/{tab_name}/{tab_name}.html"
    js_file = f"d:/caseBook/components/tabs/{tab_name}/{tab_name}.js"
    
    if not os.path.exists(html_file): continue
    
    with open(html_file, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    new_header_html = f'''<div class="section-header-row">
    <div class="section-title-box">
        <div class="section-icon-badge"><i class="fa-solid {meta['icon']}"></i></div>
        <div>
            <h3>{meta['title']}</h3>
            <p class="section-subtitle">{meta['sub']}</p>
            <div class="header-chips-row">
                {meta['chips']}
            </div>
        </div>
    </div>
</div>'''

    # Replace existing section-header-row / upcoming-hero-banner / page-head / my-cases-header-card
    patterns = [
        r'<div class="section-header-row">[\s\S]*?</div>\s*</div>',
        r'<div class="upcoming-hero-banner">[\s\S]*?</div>\s*</div>',
        r'<div class="my-cases-header-card">[\s\S]*?</div>\s*</div>',
        r'<div class="page-head">[\s\S]*?</div>\s*</div>'
    ]

    replaced = False
    for pat in patterns:
        if re.search(pat, content):
            content = re.sub(pat, new_header_html, content, count=1)
            replaced = True
            break
            
    if not replaced:
        # Insert at start of tab container
        content = new_header_html + "\n" + content

    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Updated header for {tab_name}.html!")
