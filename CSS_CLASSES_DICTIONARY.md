# 🎨 CaseBook — Comprehensive CSS Class Dictionary & Style Reference

This dictionary provides a complete, categorized reference for all CSS classes used across the **CaseBook** application ecosystem.

---

## 📌 1. Application Shell & Core Layout Classes

| CSS Class Name | Where Used (Files) | Purpose & Description (Why Used) |
| :--- | :--- | :--- |
| `.auth-shell` | `admin.css`, `admin.html` | Center-aligned modal container for login & authentication screens. |
| `.page-shell` | `admin.css`, `admin.html` | Main application shell wrapper that holds top header, sidebar navigation, and tab views. |
| `.main-wrapper` | `admin.css`, `admin.html` | Main viewport workspace container that wraps active tabs and content. |
| `.content` | `admin.css`, `global-rules.css` | Content area wrapper with responsive padding and bottom navigation margin. |
| `.top-header` | `admin.css`, `admin.html` | Fixed top navigation bar header styled with primary theme color. |
| `.materialize-nav` | `admin.css`, `admin.html` | Navigation bar base class enforcing shadow elevation and brand alignment. |
| `.nav-wrapper` | `admin.css`, `admin.html` | Flexbox row layout container inside the top navigation bar. |
| `.header-left-section` | `admin.css`, `admin.html` | Left-side brand identity container (hamburger menu button + CaseBook logo). |
| `.header-right-section` | `admin.css`, `admin.html` | Right-side quick action buttons (Search, App Install, Logout). |
| `.sidebar` / `.sidenav` | `admin.css`, `global-rules.css` | Fixed left navigation drawer displaying author profile and tab link directory. |
| `.sidebar-overlay` | `admin.css`, `admin.html` | Glassy dark backdrop overlay that appears on mobile/laptop screens when sidebar is opened. |
| `.sidebar-collapsed` | `admin.css`, `admin.js` | Body state modifier class that collapses sidebar into compact icon-only mode. |
| `.fixed-bottom-nav` | `admin.css`, `chambers-footer.js` | Mobile-first fixed bottom action navigation bar (`Home`, `Tasks`, `Paisa`, `History`, `More`). |
| `.bottom-nav-btn` | `admin.css`, `chambers-footer.js` | Action buttons rendered inside the mobile bottom navigation bar. |

---

## 🎨 2. Unified Tab Headers & Header Chips (`components/global-rules.css`)

| CSS Class Name | Where Used (Files) | Purpose & Description (Why Used) |
| :--- | :--- | :--- |
| `.section-header-row` | `global-rules.css`, `components/tabs/*/*.html` | Standardized header container across all 21 tabs featuring a 135° theme diagonal gradient background. |
| `.section-title-box` | `global-rules.css`, `components/tabs/*/*.html` | Flex container aligning the main icon badge next to the tab title and subtitle. |
| `.section-icon-badge` | `global-rules.css`, `components/tabs/*/*.html` | 46px rounded-square gradient badge with rounded corners housing a centered white FontAwesome icon. |
| `.section-subtitle` | `global-rules.css`, `components/tabs/*/*.html` | Muted/dimmed description text placed directly below main tab title. |
| `.header-chips-row` | `global-rules.css`, `components/tabs/*/*.html` | Horizontally scrollable row housing pill action buttons below header subtitle. |
| `.header-chip-btn` | `global-rules.css`, `components/tabs/*/*.html` | Fully rounded (9999px) glassy pill action button with theme border and icon. |

---

## 🌈 3. Application Color Themes (`components/global-rules.css`)

| CSS Class Name | Theme Name | Primary Gradient & Visual Description |
| :--- | :--- | :--- |
| `.theme-mint` | **Mint Theme** (Default) | `#00695c` → `#004d40` (Emerald Legal Chamber Green) |
| `.theme-forest` | **Forest Theme** | `#0f5132` → `#082e1e` (Deep Nature Green) |
| `.theme-azure` | **Azure Theme** | `#0284c7` → `#0369a1` (High-Court Oceanic Blue) |
| `.theme-executive` | **Executive Theme** | `#334155` → `#1e293b` (Slate Corporate Charcoal) |
| `.theme-midnight` | **Midnight Theme** | `#0f172a` → `#020617` (OLED Pure Dark) |
| `.theme-corporate` | **Corporate Theme** | `#1e3a8a` → `#1e1b4b` (Navy Judicial Blue) |
| `.theme-classic` | **Classic Theme** | `#78350f` → `#451a03` (Traditional Legal Parchment) |
| `.theme-light` | **Light Theme** | `#ffffff` / `#f8fafc` (Clean High-Contrast White Surface) |

---

## 📊 4. KPI Stats Strip & Metric Cards (`components/global-rules.css`)

| CSS Class Name | Where Used (Files) | Purpose & Description (Why Used) |
| :--- | :--- | :--- |
| `.stats-strip` | `global-rules.css`, `cards.html`, `home.html` | 3-column inline grid layout wrapper for summary metric cards. |
| `.stat-chip` | `global-rules.css`, `admin.css`, `cards.html` | Individual metric card with white background, rounded corners, and hover shadow. |
| `.stat-chip.pending` | `admin.css`, `cards.html` | Stat chip modifier highlighting pending case count in orange (`#ea580c`). |
| `.stat-chip.hearing` | `admin.css`, `cards.html` | Stat chip modifier highlighting weekly hearing count in teal (`#0f766e`). |
| `.stat-chip.clients` | `admin.css`, `cards.html` | Stat chip modifier highlighting total client count in indigo (`#4f46e5`). |
| `.num` | `admin.css`, `global-rules.css` | Large bold numeric indicator (e.g. `50`, `7`, `48`). |
| `.lbl` | `admin.css`, `global-rules.css` | Small muted text label placed below numeric count. |

---

## 🏷️ 5. Filter Chips & Pill Controls

| CSS Class Name | Where Used (Files) | Purpose & Description (Why Used) |
| :--- | :--- | :--- |
| `.filters` | `admin.css`, `cards.html`, `all.html` | Flexbox wrapper row for quick filter chip pill buttons. |
| `.chip` | `admin.css`, `cards.html`, `all.html` | Rounded filter button with border and hover states. |
| `.chip.active` | `admin.css`, `cards.html`, `all.html` | Highlighted active filter pill filled with primary theme color. |
| `.cards-search-bar` | `admin.css`, `cards.html` | Search input container row with live count badge. |
| `.cards-search-box` | `admin.css`, `cards.html` | Input box containing search icon prefix and text input. |
| `.cards-count-badge` | `admin.css`, `cards.html` | Counter badge displaying active search result count (e.g. `Showing 51 cases`). |

---

## 🔲 6. Buttons & Floating Actions (FAB)

| CSS Class Name | Where Used (Files) | Purpose & Description (Why Used) |
| :--- | :--- | :--- |
| `.btn` | `admin.css`, `global-rules.css` | Base button class establishing padding, border-radius, font, and transitions. |
| `.btn-dark` | `admin.css`, `global-rules.css` | Primary filled action button with dark/theme background. |
| `.btn-out` | `admin.css`, `global-rules.css` | Secondary outlined button with border and subtle background hover. |
| `.btn-danger` | `admin.css`, `global-rules.css` | Red alert button used for delete or destructive actions. |
| `.fab` | `global-rules.css`, `admin.html` | Floating Action Button (`+ Add Case`) fixed to bottom-right corner of screen. |
| `.fab-plus` | `global-rules.css` | Centered plus icon inside floating action button. |
| `.fab-tooltip` | `global-rules.css` | Hover tooltip text appearing next to floating action button. |
| `.nav-icon-action-btn` | `admin.css`, `admin.html` | Header top-right action icon button (Install, Logout, Search). |

---

## 💬 7. Modals & Dialog Overlays

| CSS Class Name | Where Used (Files) | Purpose & Description (Why Used) |
| :--- | :--- | :--- |
| `.modal-overlay` | `admin.css`, `admin.html` | Fixed full-screen semi-transparent backdrop for popup dialogs. |
| `.modal-card` | `admin.css`, `admin.html` | Centered dialog container card housing header, body, and footer. |
| `.modal-card-sm` | `admin.css`, `admin.html` | Small width modal card (e.g., Edit Court, Delete Helper). |
| `.modal-card-lg` | `admin.css`, `admin.html` | Large width modal card (e.g., Full Case Details, History Timeline). |
| `.modal-header` | `admin.css`, `admin.html` | Dialog header row containing icon, title, subtitle, and close button (`&times;`). |
| `.modal-header-info` | `admin.css`, `admin.html` | Left-side title & icon container inside modal header. |
| `.modal-icon` | `admin.css`, `admin.html` | Rounded icon badge rendered inside modal header. |
| `.modal-body` | `admin.css`, `admin.html` | Scrollable body area containing forms, tables, or dossier details. |
| `.modal-footer` | `admin.css`, `admin.html` | Single-line flex row housing right-aligned action buttons (`Cancel`, `Save`, `Print`). |
| `.modal-close-btn` | `admin.css`, `admin.html` | Top-right close icon button (`&times;`) that closes modal dialog. |

---

## 📋 8. Data Tables & Dossier Grids

| CSS Class Name | Where Used (Files) | Purpose & Description (Why Used) |
| :--- | :--- | :--- |
| `.table-responsive` | `admin.css`, `all.html`, `causelist.html` | Horizontally scrollable wrapper preventing table overflow on small screens. |
| `.search-results-table` | `admin.css`, `search.html`, `guestScreen` | Formatted data table displaying search query matches. |
| `.history-table-container` | `admin.css`, `admin.html` | Container wrapper for hearing history timeline table. |
| `.history-table` | `admin.css`, `admin.html` | Table displaying past court proceedings, dates, stages, and court orders. |
| `.case-cards-table-wrap` | `admin.css`, `cards.html` | Desktop table view wrapper for master case register. |
| `.case-cards-mobile-view` | `admin.css`, `cards.html` | Mobile feed container rendering individual card views on small screens. |

---

## 🏷️ 9. Status Badges & Case Type Indicators

| CSS Class Name | Where Used (Files) | Purpose & Description (Why Used) |
| :--- | :--- | :--- |
| `.case-badge` | `admin.css`, `global-rules.css` | Base status badge pill with rounded corners and bold font. |
| `.case-badge.civil` | `admin.css`, `global-rules.css` | Blue badge tag indicating Civil litigation matter. |
| `.case-badge.criminal` | `admin.css`, `global-rules.css` | Red badge tag indicating Criminal matter. |
| `.case-badge.revenue` | `admin.css`, `global-rules.css` | Orange badge tag indicating Land / Revenue matter. |
| `.status-badge.pending` | `admin.css`, `transfer.html` | Orange badge tag indicating active / pending status. |
| `.status-badge.disposed` | `admin.css`, `disposed.html` | Green badge tag indicating decided / disposed matter. |
| `.urgent-badge` | `admin.css`, `cards.html` | Red animated/alert badge for high-priority urgent cases. |
| `.db-live-badge` | `admin.css`, `livecrud.html` | Green live connection status badge for Supabase Database. |

---

## 💰 10. Module Specific Classes

### A. Paisa Manager (`components/tabs/paisa/paisa.css`)
- `.paisa-manager-container`: Main wrapper for Accounts & Fees tab.
- `.paisa-kpi-card`: Summary financial metrics card (Income, Pending Fees, Expense).
- `.paisa-mode-radio-group`: Payment mode toggle group (`Cash`, `UPI`, `Bank`).
- `.paisa-radio-btn-label`: Label wrapper for custom payment radio buttons.
- `.paisa-cloud-badge`: Cloud database connection indicator.

### B. To-Do Tasks (`components/tabs/todo/todo.css`)
- `.todo-tab-container`: To-Do & Deadlines workspace wrapper.
- `.todo-card`: Individual task card with priority tag and checkbox.
- `.todo-checkbox`: Custom checkbox input for marking tasks complete.
- `.todo-switch`: Toggle switch container for task filter status.

### C. LiveCRUD DB (`components/tabs/livecrud/livecrud.css`)
- `.lc-container`: Supabase live table manager view wrapper.
- `.db-stats-group`: Row count and table name badge container.
- `.db-buttons-group`: Action buttons (`Refresh`, `Export`, `Query`).

---

## 🛠️ 11. Utility & Helper Classes

| CSS Class Name | Where Used | Purpose (Why Used) |
| :--- | :--- | :--- |
| `.hidden` | Global | Sets `display: none !important;` to hide elements dynamically. |
| `.hidden-desktop` | Global | Hides elements on desktop screens (`min-width: 1025px`). |
| `.hidden-mobile` | Global | Hides elements on mobile/tablet screens (`max-width: 1024px`). |
| `.truncate` | Global | Truncates long text strings with ellipsis (`...`). |
| `.circle` | Global | Circular border radius (`border-radius: 50%`). |
