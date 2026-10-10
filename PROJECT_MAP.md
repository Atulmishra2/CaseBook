# 🗺️ CaseBook Modular — Complete Project Map & Architecture Guide

> **Author & System**: Atul Kumar Mishra — CaseBook Legal CMS  
> **Architecture Pattern**: Component-Driven Modular Monolith (Vanity-free ES Vanilla + CSS Design System + Supabase Real-time Cloud DB)  
> **Last Updated**: October 2026

---

## 📑 Table of Contents
1. [Tab Map (Har Tab Ka Code Kahan Hai)](#1-tab-map-har-tab-ka-code-kahan-hai)
2. [Component Map (Reusable Components Kahan Hain)](#2-component-map-reusable-components-kahan-hain)
3. [Service Map (Business Logic & Cloud Services)](#3-service-map-business-logic--cloud-services)
4. [Utility & Store Map (Shared Helpers & State)](#4-utility--store-map-shared-helpers--state)
5. [Quick Reference (Common Tasks & Line Numbers)](#5-quick-reference-common-tasks--line-numbers)
6. [File Count Summary (Metrics & Overview)](#6-file-count-summary-metrics--overview)
7. [Visual Project Directory Tree](#7-visual-project-directory-tree)

---

## 1. TAB MAP (Har Tab Ka Code Kahan Hai)

Total **20 Active Feature Tabs** hain. Har tab ka apna alag HTML template, CSS styling sheet aur companion JS loader hai.

| # | Tab Name | Tab ID | HTML File Path | CSS File Path | JS File Path | Purpose / Description |
|---|----------|--------|----------------|---------------|--------------|-----------------------|
| 1 | **Home Dashboard** | `home` | `components/tabs/home/home.html` | `components/tabs/home/home.css`<br>`components/tabs/home/my-cases.css` | `components/tabs/home/home.js` | Executive overview, 6 KPI counters, today's court appearance summary, urgent matters, recent activity. |
| 2 | **My Cases (Search)** | `search` | `components/tabs/search/search.html` | `components/tabs/search/search.css`<br>`components/tabs/search/case-details.css` | `components/tabs/search/search.js` | Search & filter registry with filter drawer, dynamic table columns, interactive case dossier card. |
| 3 | **Daily Cause List** | `causelist` | `components/tabs/causelist/causelist.html` | `components/tabs/causelist/causelist.css` | `components/tabs/causelist/causelist.js` | Court-wise daily appearance board, date filter, printable daily court roster. |
| 4 | **Upcoming Hearings** | `upcoming` | `components/tabs/upcoming/upcoming.html` | `components/tabs/upcoming/upcoming.css` | `components/tabs/upcoming/upcoming.js` | 7-day upcoming hearings docket board with visual court horizon & priority pills. |
| 5 | **To-Do & Deadlines** | `todo` | `components/tabs/todo/todo.html` | `components/tabs/todo/todo.css` | `components/tabs/todo/todo.js` | Task manager with case number linking, deadline dates, reminder popups, and status filters. |
| 6 | **Calendar Scheduler** | `calendar` | `components/tabs/calendar/calendar.html` | `components/tabs/calendar/calendar.css` | `components/tabs/calendar/calendar.js` | Monthly calendar grid view, hearing indicators, day agenda drawer, and next/prev month navigation. |
| 7 | **Add New Case** | `add` | `components/tabs/add/add.html` | `components/tabs/add/add.css` | `components/tabs/add/add.js` | New case registration form (Civil, State, Criminal, Family, Revenue, Misc, Complaint) with live duplicate detection. |
| 8 | **Update Case** | `update` | `components/tabs/update/update.html` | `components/tabs/update/update.css` | `components/tabs/update/update.js` | Edit existing case metadata, update party names, client phone number, court reallocation & remarks. |
| 9 | **Forward Dates** | `hearing` | `components/tabs/hearing/hearing.html` | `components/tabs/hearing/hearing.css` | `components/tabs/hearing/hearing.js` | Hearing stage updater with before/after comparison preview, date shortcuts (+7, +14, +30 days), disposal marking. |
| 10 | **Transfer Case** | `transfer` | `components/tabs/transfer/transfer.html` | `components/tabs/transfer/transfer.css` | `components/tabs/transfer/transfer.js` | Move single case or bulk cases across courts/forums with audit trail tracking. |
| 11 | **Delete Case** | `delete` | `components/tabs/delete/delete.html` | `components/tabs/delete/delete.css` | `components/tabs/delete/delete.js` | Case removal console with safety preview card and double-confirmation safeguard. |
| 12 | **Manage Courts** | `courts` | `components/tabs/courts/courts.html` | `components/tabs/courts/courts.css` | `components/tabs/courts/courts.js` | Add, edit, rename, and delete court forums/jurisdictions with database cascade updates. |
| 13 | **Court Helpers** | `helpers` | `components/tabs/helpers/helpers.html` | `components/tabs/helpers/helpers.css` | `components/tabs/helpers/helpers.js` | Staff directory (court clerks, peons, stenographers, associates) with contact cards. |
| 14 | **Paisa (Finances)** | `paisa` | `components/tabs/paisa/paisa.html` | `components/tabs/paisa/paisa.css` | `components/tabs/paisa/paisa.js` | Fee received, office expenses, personal expenses, account transfers, client balances, financial reports. |
| 15 | **Case Cards** | `cards` | `components/tabs/cards/cards.html` | `components/tabs/cards/cards.css` | `components/tabs/cards/cards.js` | Card-based Kanban / visual grid representation of active legal matters. |
| 16 | **All Cases Register** | `all` | `components/tabs/all/all.html` | `components/tabs/all/all.css` | `components/tabs/all/all.js` | Comprehensive master registry table with case-type pills, pagination, and unified search. |
| 17 | **Undated Cases** | `undated` | `components/tabs/undated/undated.html` | `components/tabs/undated/undated.css` | `components/tabs/undated/undated.js` | Matters missing a future hearing date with one-click direct date assigner. |
| 18 | **Disposed Cases** | `disposed` | `components/tabs/disposed/disposed.html` | `components/tabs/disposed/disposed.css` | `components/tabs/disposed/disposed.js` | Concluded / disposed cases archive, disposal reason badge, and final order references. |
| 19 | **Live CRUD (DB)** | `livecrud` | `components/tabs/livecrud/livecrud.html` | `components/tabs/livecrud/livecrud.css` | `components/tabs/livecrud/livecrud.js` | Direct cloud database explorer for browsing, inserting, editing, and deleting records in Supabase tables. |
| 20 | **Settings** | `settings` | `components/tabs/settings/settings.html` | `components/tabs/settings/settings.css` | `components/tabs/settings/settings.js` | Security settings console for changing admin credentials and password management. |
| 21 | **About & Manual** | `about` | `components/tabs/about/about.html` | `components/tabs/about/about.css` | `components/tabs/about/about.js` | Software documentation, author bio, architecture blueprint, and keyboard shortcuts guide. |

---

## 2. COMPONENT MAP (Kaun Sa Component Kahan Hai)

Reusable layout and design system components divided into **Global Design Tokens**, **Layout Containers**, **UI Elements**, aur **Dialogs/Modals**.

### A. Layout Stylesheets (`styles/layout/`)
| Component | File Path | Imported In | Kaam / Purpose |
|-----------|-----------|-------------|----------------|
| **Top Header Bar** | `styles/layout/header.css` | `admin.css` | Sticky top navigation, brand title, live global search trigger, desktop install button, logout button. |
| **Sidebar Navigation** | `styles/layout/sidebar.css` | `admin.css` | Desktop sidebar drawer, mobile slide-over overlay, author badge, navigation links hierarchy, dark/light theme switch. |
| **Main Content Viewport** | `styles/layout/content.css` | `admin.css` | Tab container wrapper (`.content`), active tab transitions, spacing tokens. |
| **Footers (Desktop & Mobile)** | `styles/layout/footer.css` | `admin.css` | Modern Chambers footer styling, floating mobile bottom navbar (`#fixedBottomNav`). |

### B. Core UI Design System (`styles/components/` & `styles/`)
| Component | File Path | Imported In | Kaam / Purpose |
|-----------|-----------|-------------|----------------|
| **Base & Variables** | `styles/base.css` | `admin.css` | CSS resets, Google Fonts (`Plus Jakarta Sans`, `Inter`), CSS custom properties (`--primary`, `--bg`, `--border`). |
| **Theme Palette** | `styles/theme.css` | `admin.css` | Advocate Dark and Light mode colour mappings, surfaces, contrast rules. |
| **Buttons** | `styles/components/buttons.css` | `admin.css` | `.primary-btn`, `.btn-secondary`, `.icon-btn`, `.action-btn`, floating action button (`.mobile-fab-btn`), ripple effects. |
| **Forms & Inputs** | `styles/components/forms.css` | `admin.css` | Inputs, selects, textareas, search inputs, input icons, floating labels, validation states. |
| **Tables** | `styles/components/tables.css`<br>`styles/components/table.css` | `admin.css` | Data tables, sticky headers, striped rows, hover states, empty state messages, table action buttons. |
| **Cards & Containers** | `styles/components/cards.css` | `admin.css` | Hero cards, KPI metric stat cards, case summary cards, grid layouts. |
| **Badges & Pills** | `styles/components/badges.css` | `admin.css` | Case status badges (`Pending`, `Disposed`), court badges, priority tags, counter pills. |
| **Modals & Dialogs (CSS)** | `styles/components/modals.css` | `admin.css` | Backdrop overlays (`.modal-overlay`), modal card containers, modal headers, footers, responsive widths. |
| **Toast Notifications** | `styles/components/toast.css` | `admin.css` | Animated toast banner (`#caseBookToast`), slide-in/slide-out keyframes, alert types. |
| **Login / Auth Screen** | `styles/components/auth.css` | `admin.css` | Fullscreen login shell (`#loginScreen`), login card, brand badge, remember me toggle. |
| **PWA & Mobile UI** | `styles/components/pwa.css` | `admin.css` | PWA installation banners, mobile prompt drawers, touch controls. |
| **Global Override Rules** | `components/global-rules.css` | `index.html` | High-priority specificity CSS rules, z-index hierarchies, mobile FAB rules. |

### C. Feature-Specific Modals & Templates
| Component Name | HTML Path | JS Controller Path | Modal IDs & Functions |
|----------------|-----------|--------------------|------------------------|
| **Case Modals** | `components/modals/case-modals.html` | `components/modals/case-modals.js` | • `#caseDetailsFullModal` (`openCaseDetailsFullModal`)<br>• `#caseHistoryModal` (`openCaseHistoryModal`)<br>• `#pwaGuideModal` (`openPwaGuideModal`)<br>• `#caseRemarkModal` (`openCaseRemarkModal`) |
| **Print Templates** | `components/print/print-templates.html` | `components/print/print-templates.js` | • `#printableCauseList` (Daily cause list A4 printout)<br>• `#printableCaseDossier` (Case dossier infographic printout) |
| **Chambers Footer** | *(Embedded in Tab / HTML)* | `components/chambers-footer.js` | Web component `<chambers-footer>` displaying developer credentials and chamber pillars. |

---

## 3. SERVICE MAP (Kaun Sa Service Kya Karta Hai)

All backend, API, and cloud synchronization logic lives in the `services/` directory:

| Service Name | File Path | Key Functions & Responsibilities |
|--------------|-----------|----------------------------------|
| **Supabase Client** | `services/supabaseClient.js` | • `ensureSupabaseClient()`: Initializes client instance with URL & Anon Key.<br>• Fallback detection when offline or when CDN is blocked.<br>• Publishes `window.supabaseClient`. |
| **Case Service** | `services/caseService.js` | • `fetchAllDataFromSupabase()`: Fetches all 8 case tables, hearings, and courts in parallel.<br>• `addCaseToSupabase(newCase)`: Inserts new case into specific table based on type.<br>• `updateCaseInSupabase(...)`: Modifies case details and handles table migration if type changed.<br>• `deleteCaseFromSupabase(caseNo)`: Removes case record and deletes associated hearing history.<br>• `updateHearingInSupabase(...)`: Updates next hearing date and inserts log into `hearings` history table.<br>• `checkCaseNumberExists(caseNo)`: Validates unique case number in live DB before submission.<br>• `cascadeUpdateCourtName(old, new)`: Updates court name across all 8 tables simultaneously.<br>• `performPostCrudRefresh()`: Synchronizes in-memory caches, recalculates counters, and updates UI. |
| **To-Do Service** | `services/todoService.js` | • `loadCaseTasks()`: Loads task list from Supabase table `case_todos` (with local storage fallback).<br>• `saveCaseTasksLocally()`: Caches active tasks into browser storage.<br>• `syncTasksWithSupabase()`: Background cloud sync for tasks.<br>• `updateTodoSyncIndicator()`: Renders live sync indicator dot.<br>• `updateSupabaseStatusIndicator()`: Updates the header cloud connection status indicator. |
| **Ancillary Service** | `services/ancillaryService.js` | • `addCourtToSupabase(courtName)`: Adds new court forum to `courts` table.<br>• `editCourtInSupabase(oldName, newName)`: Triggers cascade rename.<br>• `deleteCourtFromSupabase(courtName)`: Removes court and unlinks cases.<br>• Manages court helper staff CRUD in `court_helpers` table. |

---

## 4. UTILITY & STORE MAP (Shared Helpers & State)

| File Name | File Path | Purpose & Exports |
|-----------|-----------|-------------------|
| **Date Utilities** | `utils/dateUtils.js` | `getTodayDateString()` — Formats standard ISO YYYY-MM-DD date strings for input fields and calculations. |
| **UI Utilities** | `utils/uiUtils.js` | `formatCurrencyINR(amount)` — Formats numbers into Indian Rupee notation (e.g., `₹1,50,000`). |
| **Export Utilities** | `utils/exportUtils.js` | Centralized PDF, CSV, and Excel table export handlers (`window.exportUtils`). |
| **Global State Store** | `store/globalStore.js` | Central in-memory reactive state manager (`window.globalStore`). |

---

## 5. QUICK REFERENCE (Common Tasks & Line Numbers)

> 💡 **Tip:** Use `Ctrl + F` in your editor to jump directly to these files and lines.

### 🔹 "Add case ka code kahan hai?"
- **UI Form HTML**: `components/tabs/add/add.html`
- **Tab CSS**: `components/tabs/add/add.css`
- **Form Submission & Validation Listener**: `admin.js` *(Line 6715 – 6785)*
- **Cloud Database Insert Function**: `services/caseService.js` *(Line 693: `async function addCaseToSupabase`)*

### 🔹 "Courts tab ka CSS kahan hai?"
- **File**: `components/tabs/courts/courts.css` *(Imported in `admin.css` at line 43)*

### 🔹 "Login screen kahan hai?"
- **HTML Markup**: `index.html` *(Line 293 – 350, inside `<div id="loginScreen">`)*
- **Login Styling**: `styles/components/auth.css`
- **Auth Handler Logic**: `admin.js` *(Line 3100: `function handleAdminLogin(event)`)*

### 🔹 "Tab switch karne ka code (`showTab`) kahan hai?"
- **Function Definition**: `admin.js` *(Line 3698: `async function showTab(tabId, event, navType)`)*
- **Dynamic HTML Injector**: `admin.js` *(Line 3251: `async function loadTabContent(tabEl)`)*

### 🔹 "Case details popup modal kahan hai?"
- **HTML**: `components/modals/case-modals.html` *(Line 2: `<div id="caseDetailsFullModal">`)*
- **CSS**: `styles/components/modals.css`
- **JS Open Controller**: `admin.js` *(Function `openCaseDetailsFullModal(caseNo)`)*

### 🔹 "Paisa (Accounts/Expenses) tab kahan hai?"
- **HTML**: `components/tabs/paisa/paisa.html`
- **CSS**: `components/tabs/paisa/paisa.css`
- **JS**: `components/tabs/paisa/paisa.js`

### 🔹 "Supabase credentials aur client setup kahan hai?"
- **File**: `services/supabaseClient.js` *(Line 4 – 16: `SUPABASE_URL`, `SUPABASE_ANON_KEY`)*

---

## 6. FILE COUNT SUMMARY (Metrics & Overview)

### A. Production Active Files Breakdown (By Category)
| Category | CSS Files | JS Files | HTML Files | Total Files |
|----------|-----------|----------|------------|-------------|
| **Root Application Core** (`index.html`, `admin.css`, `admin.js`) | 1 | 1 | 1 | 3 |
| **Reusable Design System** (`styles/base`, `theme`, `layout/`, `components/`) | 16 | 0 | 0 | 16 |
| **Feature Tabs** (`components/tabs/` — 20 tabs + sub-styles) | 22 | 20 | 20 | 62 |
| **Global Components & Modals** (`modals/`, `print/`, `rules`, `footer`) | 1 | 3 | 2 | 6 |
| **Business Services** (`services/`) | 0 | 4 | 0 | 4 |
| **State Store & Shared Utils** (`store/`, `utils/`) | 0 | 4 | 0 | 4 |
| **Total Active Production System** | **40** | **32** | **23** | **95** |

### B. Entire Project Workspace (Including dev tools, audits, & backups)
- **Total CSS Files**: **46**
- **Total JS Files**: **46** (Active App: 32 + Root test/verification scripts: 14)
- **Total HTML Files**: **42** (Active App: 23 + Audit reports/roadmaps: 19)

---

## 7. VISUAL PROJECT DIRECTORY TREE

```
📁 caseBook-modular/
│
├── 📄 index.html                      # Entry Point: DOM structure, shell, and tab mounts
├── 📄 admin.css                       # Master Stylesheet: imports base, layout, components, tabs
├── 📄 admin.js                        # Master Application Controller: routing, auth, tab loader
│
├── 📁 styles/                         # Reusable Design System & Tokens
│   ├── 📄 base.css                    # CSS resets, root typography & custom variables
│   ├── 📄 theme.css                   # Advocate Dark & Light theme color palettes
│   ├── 📁 layout/                     # Layout containers
│   │   ├── 📄 header.css              # Top navbar, search box, action icons
│   │   ├── 📄 sidebar.css             # Sidenav drawer, author card, theme switcher
│   │   ├── 📄 content.css             # Main workspace viewport container
│   │   └── 📄 footer.css              # Chambers footer & mobile fixed bottom nav
│   └── 📁 components/                 # Reusable UI component styles
│       ├── 📄 auth.css                # Login card & authentication screen
│       ├── 📄 badges.css              # Status badges, type pills, counter tags
│       ├── 📄 buttons.css             # Button classes, action icons, mobile FAB
│       ├── 📄 cards.css               # Metric KPI cards, hero banners, containers
│       ├── 📄 forms.css               # Input fields, select dropdowns, search bars
│       ├── 📄 modals.css              # Modal dialog overlays, headers, bodies, footers
│       ├── 📄 pwa.css                 # PWA install banner & mobile guides
│       ├── 📄 tables.css              # Master table styles, striped rows, sticky headers
│       └── 📄 toast.css               # In-app toast notification banners
│
├── 📁 components/                     # Feature-specific modules & tabs
│   ├── 📄 global-rules.css            # High-priority global overrides & responsive rules
│   ├── 📄 chambers-footer.js          # Modern Chambers Footer web component
│   ├── 📁 modals/                     # Global interactive dialogs
│   │   ├── 📄 case-modals.html        # Full case details, history & remark modals
│   │   └── 📄 case-modals.js          # Modal offline cache & controller
│   ├── 📁 print/                      # Printable export templates
│   │   ├── 📄 print-templates.html    # Printable daily cause list & dossier sheets
│   │   └── 📄 print-templates.js     # Print template offline bundle
│   └── 📁 tabs/                       # 20 Independent Feature Tabs
│       ├── 📁 about/                  # [Tab] Documentation & About System
│       │   ├── 📄 about.html / about.css / about.js
│       ├── 📁 add/                    # [Tab] New Case Registration
│       │   ├── 📄 add.html / add.css / add.js
│       ├── 📁 all/                    # [Tab] Master All Cases Register
│       │   ├── 📄 all.html / all.css / all.js
│       ├── 📁 calendar/               # [Tab] Monthly Hearing Scheduler
│       │   ├── 📄 calendar.html / calendar.css / calendar.js
│       ├── 📁 cards/                  # [Tab] Visual Case Cards Grid
│       │   ├── 📄 cards.html / cards.css / cards.js
│       ├── 📁 causelist/              # [Tab] Daily Court Appearance Roster
│       │   ├── 📄 causelist.html / causelist.css / causelist.js
│       ├── 📁 courts/                 # [Tab] Manage Court Complexes & Forums
│       │   ├── 📄 courts.html / courts.css / courts.js
│       ├── 📁 delete/                 # [Tab] Delete Case Safeguard Console
│       │   ├── 📄 delete.html / delete.css / delete.js
│       ├── 📁 disposed/               # [Tab] Concluded / Disposed Cases
│       │   ├── 📄 disposed.html / disposed.css / disposed.js
│       ├── 📁 hearing/                # [Tab] Forward Hearing Dates & Stages
│       │   ├── 📄 hearing.html / hearing.css / hearing.js
│       ├── 📁 helpers/                # [Tab] Court Staff & Helper Directory
│       │   ├── 📄 helpers.html / helpers.css / helpers.js
│       ├── 📁 home/                   # [Tab] Executive Home Dashboard
│       │   ├── 📄 home.html / home.css / home.js / my-cases.css
│       ├── 📁 livecrud/               # [Tab] Supabase Live Database Console
│       │   ├── 📄 livecrud.html / livecrud.css / livecrud.js
│       ├── 📁 paisa/                  # [Tab] Paisa - Earning & Expense Tracker
│       │   ├── 📄 paisa.html / paisa.css / paisa.js
│       ├── 📁 search/                 # [Tab] My Cases Multi-Filter Registry
│       │   ├── 📄 search.html / search.css / search.js / case-details.css
│       ├── 📁 settings/               # [Tab] Admin Password & Security
│       │   ├── 📄 settings.html / settings.css / settings.js
│       ├── 📁 todo/                   # [Tab] Case Tasks & Deadline Manager
│       │   ├── 📄 todo.html / todo.css / todo.js
│       ├── 📁 transfer/               # [Tab] Case Court Transfer Console
│       │   ├── 📄 transfer.html / transfer.css / transfer.js
│       ├── 📁 undated/                # [Tab] Undated Cases Date Assigner
│       │   ├── 📄 undated.html / undated.css / undated.js
│       └── 📁 upcoming/               # [Tab] 7-Day Hearing Docket Horizon
│           └── 📄 upcoming.html / upcoming.css / upcoming.js
│
├── 📁 services/                       # Business Logic & Cloud API Services
│   ├── 📄 supabaseClient.js           # Supabase client initializer & config
│   ├── 📄 caseService.js              # Case CRUD, uniqueness check, cascades
│   ├── 📄 todoService.js              # To-do task sync & offline cache
│   └── 📄 ancillaryService.js         # Courts & helper directory database ops
│
├── 📁 store/                          # Central Reactive State Store
│   └── 📄 globalStore.js              # Shared app state (window.globalStore)
│
└── 📁 utils/                          # Shared Utility Functions
    ├── 📄 dateUtils.js                # Date formatting & parsing helpers
    ├── 📄 exportUtils.js              # PDF & CSV export routines
    └── 📄 uiUtils.js                  # Currency INR formatter & UI helpers
```

---
*Created for CaseBook Legal CMS by Atul Kumar Mishra.*
