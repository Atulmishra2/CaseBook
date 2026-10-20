# CaseBook Modular — UI Component Map

> **Purpose:** Har major UI component ki HTML location, CSS stylesheet(s), aur `admin.js` JavaScript functions ka quick reference.
> **Files covered:** `admin.html`, `index.html`, `admin.js`, `styles/`, `components/`

---

## Quick Summary Table

| # | Component | HTML (File:Lines) | CSS File(s) | JS Functions (admin.js) |
|---|---|---|---|---|
| 1 | **Bottom Nav** | `admin.html:989–1045`<br>`index.html:990–1046` | `styles/layout/bottom-nav.css`<br>`styles/layout/footer.css` | `updateNavigationButtons()` L4519<br>`goBackTab/goForwardTab/goHomeTab()` L4488 |
| 2 | **Sidebar** | `admin.html:731–873`<br>`index.html:732–874` | `styles/layout/sidebar.css`<br>`styles/components/badges.css` | `toggleMobileSidebar()` L4649<br>`syncSidebarBadgeZeroState()` L4609 |
| 3 | **Header / Topbar** | `admin.html:566–730`<br>`index.html:567–731` | `styles/layout/header.css`<br>`styles/components/buttons.css` | `toggleTopnavSearch()` L5030<br>`handleAdminLogout()` L3429 |
| 4 | **Modals** | `admin.html:1055`<br>`components/modals/case-modals.html:1–1035` | `styles/components/modals.css`<br>`styles/components/pwa.css` | `loadCaseModals()` L3590<br>`openCaseRemarkModal()` L8972 |
| 5 | **Tabs System** | `admin.html:876–986`<br>`index.html:877–987` | `styles/layout/content.css`<br>`components/tabs/*/*.css` | `showTab()` L4039<br>`loadTabContent()` L3508 |
| 6 | **Forms** | Auth: `admin.html:326–380`<br>Tab forms in `components/tabs/*/` | `styles/components/forms.css`<br>Tab-specific form CSS | `handleAdminLogin()` L3356<br>`bindAddCaseFormListeners()` L3669 |
| 7 | **Cards** | Home: `components/tabs/home/tab-home.:3–262`<br>All: `components/tabs/all/tab-all.:45` | `styles/components/cards.css`<br>`components/tabs/home/tab-home.` | `getCaseCardDisplayData()` L595 |
| 8 | **Tables** | Guest: `admin.html:468–485`<br>Tab tables in `components/tabs/*/` | `styles/components/tables.css`<br>Tab-specific table CSS | `renderGuestTable()` L5274<br>`filterCaseTables()` L6559 |
| 9 | **Toast** | `admin.html:1058`<br>`index.html:1058` | `styles/components/toast.css` | `showToastNotification()` L6498 |
| 10 | **FAB Button** | `admin.html:1081–1089`<br>`index.html:1081–1089` | `styles/components/tables.css`<br>`styles/components/buttons.css` | Routed via `showTab('add')` L4039 |
| 11 | **Search** | Topnav: `admin.html:603–703`<br>Guest: `admin.html:450–460` | `styles/layout/header.css`<br>`styles/components/forms.css` | `performTopnavDatabaseSearch()` L4828<br>`toggleTopnavSearch()` L5030 |
| 12 | **Auth / Login** | `admin.html:285–399`<br>`index.html:285–399` | `styles/components/auth.css`<br>`styles/base.css` | `checkInitialAuth()` L3322<br>`handleAdminLogin()` L3356 |
| 13 | **Print Templates** | `admin.html:1050–1053`<br>`components/print/print-templates.html` | `styles/print.css` | `loadPrintTemplates()` L3620 |

---

## 1. Bottom Nav

**HTML:**
- `admin.html` Lines **989–1045** — `<footer class="fixed-bottom-nav" id="fixedBottomNav">`
- `index.html` Lines **990–1046**
- Button IDs: `#bottomNavHomeBtn` (L993), `#bottomNavTasksBtn` (L1003), `#bottomNavPaisaBtn` (L1015), `#bottomNavHistoryBtn` (L1027), `#bottomNavMoreBtn` (L1037)

**CSS:**
- `styles/layout/bottom-nav.css` — `.fixed-bottom-nav`, `.bottom-nav-btn`, `.active::before` indicator
- `styles/layout/footer.css` Lines 587–785 — responsive overrides, media queries

**JavaScript (`admin.js`):**
| Function | Lines | Purpose |
|---|---|---|
| `updateNavigationButtons()` | 4519–4565 | Active tab indicator sync for Home, Tasks, Paisa, History |
| `goBackTab()` | 4488–4500 | Browser-history back navigation |
| `goForwardTab()` | 4502–4510 | Browser-history forward navigation |
| `goHomeTab()` | 4512–4517 | Quick jump to Home tab |
| Mobile more drawer binding | 7391–7405 | Attaches `toggleMobileSidebar` to `#bottomNavMoreBtn` |

---

## 2. Sidebar Navigation

**HTML:**
- `admin.html` Lines **731–873** — `#sidebarOverlay` (L731), `.sidebar.sidenav` (L734–873)
- `index.html` Lines **732–874**
- Sections: Profile Card (L736–748), 22 Nav Links with Badges (L750–853), Theme Toggle Row (L855–872)

**CSS:**
- `styles/layout/sidebar.css` — `.sidebar`, `.sidenav`, active states, collapsed mode
- `styles/components/badges.css` — Badge pills on nav items
- `styles/theme.css` — Dark/light tokens for sidebar

**JavaScript (`admin.js`):**
| Function | Lines | Purpose |
|---|---|---|
| `toggleMobileSidebar(ev)` | 4649–4671 | Mobile drawer + desktop collapse toggle |
| `closeMobileSidebar()` | 7361–7370 | Removes `.mobile-open` and overlay |
| `closeMobileSidebarDrawer()` | 4352–4361 | Called on tab nav & back button |
| `syncSidebarBadgeZeroState()` | 4609–4635 | Hides empty count badges |
| `initSidebarBadgeObserver()` | 4637–4646 | DOM mutation observer for badge updates |

---

## 3. Header / Topbar

**HTML:**
- Admin Header: `admin.html` Lines **566–730** — `<header class="top-header materialize-nav">`
  - `#sidebarToggleBtn` (L576), Brand Logo (L586), Search `#searchContainer` (L603–703), `#desktopInstallBtn` (L711), `#adminLogoutBtn` (L720)
- Guest Header: `admin.html` Lines **416–448** — `<header class="guest-header-bar">`

**CSS:**
- `styles/layout/header.css` — `.top-header`, `.materialize-nav`, `.nav-wrapper`, action buttons
- `styles/components/buttons.css` — `.nav-icon-action-btn`, logout button

**JavaScript (`admin.js`):**
| Function | Lines | Purpose |
|---|---|---|
| `toggleMobileSidebar()` | 4649–4671 | Bound to `#sidebarToggleBtn` at L7380 |
| `toggleTopnavSearch()` | 5030–5054 | Bound to `#searchTriggerBtn` at L5066 |
| `handleAdminLogout()` | 3429–3456 | Bound to `#adminLogoutBtn` at L7338 |
| `handleLogout()` | 3472–3501 | Bound to `#guestLogoutBtn` at L7343 |
| `setupPWA()` | 9184–9250 | Bound to `#desktopInstallBtn` |

---

## 4. Modals & Dialogs

**HTML:**
- Container Shell: `admin.html:1055` — `<div id="caseModalsContainer" data-modal-src="components/modals/case-modals.html">`
- `components/modals/case-modals.html`:
  - `#caseDetailsFullModal` Lines 3–434
  - `#caseHistoryModal` Lines 436–524
  - `#pwaGuideModal` Lines 526–658
  - `#caseRemarkModal` Lines 660–760
  - `#fdModal` (Forward Date Picker) Lines 762–1035
- Tab Modals:
  - `components/tabs/todo/tab-todo.` — `#todoReminderModal` (L303–465), `#taskDetailsModal` (L469–520)
  - `components/tabs/paisa/tab-paisa.` — `#paisaDetailModal`, `#paisaReportsModal`, etc. (L1455–2040)

**CSS:**
- `styles/components/modals.css` — `.modal-overlay`, `.modal-card`, `.modal-header`, animations
- `styles/components/pwa.css` — PWA guide modal
- Tab CSS files (`todo.css`, `paisa.css`)

**JavaScript (`admin.js` + modular scripts):**
| Function | File | Lines | Purpose |
|---|---|---|---|
| `loadCaseModals()` | admin.js | 3590–3618 | Async inject of `case-modals.html` |
| `getOpenModalInfo()` | admin.js | 4322–4345 | Tracks active modal for back button routing |
| `openCaseRemarkModal()` | admin.js | 8972–9033 | Opens remarks/JSON inspector modal |
| `closeCaseRemarkModal()` | admin.js | 9035–9042 | Closes remarks modal |
| `openPwaGuideModal()` | admin.js | 9254–9266 | Opens PWA install guide |
| `openCaseDetailsFullModal()` | case-modals.js | L2105 | Full case dossier modal |
| `openForwardDateModal()` | case-modals.js | L2752 | Quick forward date picker |

---

## 5. Tabs System

**HTML:**
- `admin.html` Lines **876–986** — `<div class="content">` with 21 tab containers
- Tab IDs: `#home` (L878), `#search` (L881), `#causelist` (L884), `#upcoming` (L891), `#todo` (L894), `#calendar` (L897), `#manage` (L900), `#add` (L903), `#courts` (L906), `#helpers` (L909), `#paisa` (L911), `#transfer` (L914), `#delete` (L917), `#update` (L920), `#hearing` (L923), `#cards` (L927), `#all` (L929), `#disposed` (L976), `#livecrud` (L979), `#settings` (L982), `#about` (L985)

**CSS:**
- `styles/layout/content.css` — `.content`, `.tab`, `.tab.active` transitions
- `components/tabs/*/*.css` — 21 tab-specific stylesheets (imported in `admin.css:44–63`)

**JavaScript (`admin.js`):**
| Function | Lines | Purpose |
|---|---|---|
| `showTab(tabId, event, navType)` | 4039–4312 | Tab activation, routing redirects, history tracking |
| `loadTabContent(tabEl)` | 3508–3540 | Lazy loads tab HTML from `data-tab-src` |
| `restoreActiveAdminTab()` | 3307–3321 | Restores last tab on session refresh |

---

## 6. Forms

**HTML:**
| Form | File | ID |
|---|---|---|
| Admin Login | `admin.html:326–380` | `#loginForm` |
| Add New Case | `components/tabs/add/tab-add.:16` | — |
| Update Case | `components/tabs/update/tab-update.:37` | `#updateCaseForm` |
| Update Hearing | `components/tabs/hearing/tab-hearing.:16` | `#updateHearingForm` |
| Transfer (Single & Bulk) | `components/tabs/transfer/tab-transfer.:63,220` | `#transferCaseForm` |
| Add Helper | `components/tabs/helpers/tab-helpers.:35` | `#helperAddForm` |
| Add Todo Task | `components/tabs/todo/tab-todo.:87` | `#addTodoForm` |
| Change Password | `components/tabs/settings/tab-settings.:14` | `#changePasswordForm` |
| Paisa Ledger Forms | `components/tabs/paisa/tab-paisa.:658,984` | `#paisaReceivedForm` etc. |

**CSS:**
- `styles/components/forms.css` — `.form-container`, `.form-group`, inputs, floating labels
- Tab-specific CSS (`add.css`, `update.css`, `hearing.css`, etc.)

**JavaScript (`admin.js`):**
| Function | Lines | Purpose |
|---|---|---|
| `handleAdminLogin(event)` | 3356–3425 | Login with rate limiting |
| `handleChangeCredentials(event)` | 4695–4780 | Password change handler |
| `toggleCaseFormByType()` | 7174–7204 | Dynamic field switcher by case category |
| `toggleUpdateCaseFormByType()` | 7206–7237 | Same for update form |
| `bindAddCaseFormListeners()` | 3669–3710 | Attaches Add Case form events |
| `bindUpdateCaseFormListeners()` | 3739–3780 | Attaches Update Case form events |
| `bindTransferFormListeners()` | 3965–4000 | Attaches Transfer form events |
| Custom Date Picker Engine | 5811–6380 | `openCustomDatePicker`, `selectCdpDate` |

---

## 7. Cards

**HTML:**
| Card | File | Lines |
|---|---|---|
| Login Card | `admin.html` | L294 `.login-card` |
| Sidebar Profile | `admin.html` | L736 `.sidebar-profile-card` |
| Home KPI + Hero | `components/tabs/home/tab-home.` | L3–262 |
| All Cases Stats + Grid | `components/tabs/all/tab-all.` | L45–77, L291 |
| Cause List Banner | `components/tabs/causelist/tab-causelist.` | L10, L156, L341 |
| Court Directory Cards | `components/tabs/courts/tab-courts.` | L14, L68 |

**CSS:**
- `styles/components/cards.css` — Shadows, borders, hover elevations
- `components/tabs/home/tab-home.` — KPI metric cards, hero banner
- `components/tabs/all/tab-all.` — Unified case cards board

**JavaScript (`admin.js`):**
| Function | Lines | Purpose |
|---|---|---|
| `getCaseCardDisplayData(c)` | 595–669 | Formats case title, parties, urgency badges |
| `renderHomeDashboard()` *(home.js)* | L496 | Home dashboard renderer |
| `renderUnifiedCasesCards()` *(home.js)* | L1774 | All-cases card board |
| `renderCaseCards()` *(home.js)* | L2676 | Individual card renderer |

---

## 8. Tables

**HTML:**
| Table | File | Lines / ID |
|---|---|---|
| Guest Cases Table | `admin.html:468–485` | `#guestCasesTable` |
| Legacy Category Tables | `admin.html:934–970` | `#civilCasesTable` etc. |
| All Cases Master Table | `components/tabs/all/tab-all.:247` | `#allCasesTable` |
| Daily Cause List Table | `components/tabs/causelist/tab-causelist.:186` | `#causeListTable` |
| Courts Directory Table | `components/tabs/courts/tab-courts.:53` | `#courtsTable` |
| Staff Helpers Table | `components/tabs/helpers/tab-helpers.:86` | `#helpersTable` |
| Paisa Ledger Table | `components/tabs/paisa/tab-paisa.:390,830` | — |
| Live CRUD Table | `components/tabs/livecrud/tab-livecrud.:39` | `#lcRecordsTable` |

**CSS:**
- `styles/components/tables.css` — `.case-table`, `.table-container`, sticky headers, row hovers
- Tab-specific CSS (`all.css`, `causelist.css`, etc.)

**JavaScript (`admin.js`):**
| Function | Lines | Purpose |
|---|---|---|
| `renderGuestTable(searchText)` | 5274–5343 | Public tracking search table |
| `filterCaseTables(forceShowAll)` | 6559–6790 | Multi-filter engine for case registries |
| `renderCaseTableRemarks()` | 8888–8970 | Remarks renderer for table cells |
| `updateCaseTableHearing()` | 2484–2540 | Table row hearing sync |

---

## 9. Toast Notifications

**HTML:**
- `admin.html:1058` — `<div class="toast" id="caseBookToast">`
- `admin.html:1061–1065` — `#todoFloatingAlertContainer`

**CSS:**
- `styles/components/toast.css` — Popup animations, bottom slide-in, dark/light theme

**JavaScript (`admin.js`):**
| Function | Lines | Purpose |
|---|---|---|
| `showToastNotification(message, duration)` | 6498–6514 | Creates/triggers `#cmGlobalToast` |
| `copyCaseNumberToClipboard()` | 6533–6555 | Copies case number + fires toast |
| Post-CRUD toast dispatch | 1493–1505 | In `performPostCrudRefresh()` |

---

## 10. Floating Action Button (FAB)

**HTML:**
- `admin.html:1081–1089` — `<button class="mobile-fab-btn" onclick="showTab('add')">`
- `admin.html:1075` — `#mobileFilterBackdrop`

**CSS:**
- `styles/components/tables.css` Lines 1535–1570 — `.mobile-fab-btn` layout, elevation
- `styles/components/modals.css` Lines 744–785 — FAB + modal action unification

**JavaScript (`admin.js`):**
| Function | Lines | Purpose |
|---|---|---|
| `showTab('add')` | 4039–4056 | Routes FAB tap to Add Case form in `#manage` tab |
| `updateNavigationButtons()` | 4519–4565 | Navigation sync |

---

## 11. Search

**HTML:**
- Topnav: `admin.html:603–703` — `#searchContainer`, `#searchInput`, `#resultsDropdown`
- Guest Search: `admin.html:450–460` — `input#guestSearch`
- Registry Search: `components/tabs/all/tab-all.:110–135` — `#allCasesSearchInput`

**CSS:**
- `styles/layout/header.css` Lines 200–450 — Search container, dropdown, category chips

**JavaScript (`admin.js`):**
| Function | Lines | Purpose |
|---|---|---|
| `performTopnavDatabaseSearch(query)` | 4828–4982 | Fuzzy search: cases, clients, courts |
| `selectTopnavResult(index)` | 4984–5016 | Opens dossier or filters registry |
| `toggleTopnavSearch(open)` | 5030–5054 | Expand/collapse animation |
| `highlightSearchMatch(text, query)` | 4801–4814 | Text match highlighter |
| `updateTopnavActiveItem()` | 5018–5027 | Keyboard arrow navigation |
| Keyboard shortcuts (Esc, Enter, Ctrl+K) | 5057–5168 | Global search shortcut binding |
| Guest search listener | 7346–7349 | Calls `renderGuestTable` |

---

## 12. Auth / Login Screen

**HTML:**
- Login Screen: `admin.html:285–399` — `<div id="loginScreen" class="auth-shell">`
  - Form: L326–380 (`#username`, `#password`, `#rememberMe`, `#loginError`)
  - Guest CTA: L387–395 (`#guestModeBtn`)
- Guest Portal: `admin.html:405–552` — `<div id="guestScreen">`
- Admin Shell: `admin.html:564` — `<div id="adminScreen">`

**CSS:**
- `styles/components/auth.css` — `.auth-shell`, `.login-card`, `.auth-header`, backdrop blur
- `styles/base.css` — Screen switching rules (`#loginScreen`, `#guestScreen`, `#adminScreen`)

**JavaScript (`admin.js`):**
| Function | Lines | Purpose |
|---|---|---|
| `initOrbitBackground()` | 3040–3280 | Physics-based orbiting stars canvas |
| `setActiveScreen(screenId)` | 3281–3305 | Switches visibility among screens |
| `checkInitialAuth()` | 3322–3355 | Verifies session token on boot |
| `handleAdminLogin(event)` | 3356–3425 | Login with rate limiting |
| `handleAdminLogout(event)` | 3429–3456 | Admin session clear |
| `handleGuestLogin(event)` | 3458–3470 | Guest session entry |
| `handleLogout(event)` | 3472–3501 | General session clearing |
| `restoreActiveAdminTab()` | 3307–3321 | Restores last tab after login |

---

## 13. Print Templates

**HTML:**
- Mount: `admin.html:1050–1053` — `<div id="printTemplatesContainer" data-template-src="components/print/print-templates.html">`
- `components/print/print-templates.html`:
  - `#printableCauseList` Lines 1–62 — Daily Court Appearance Board (A4)
  - `#printableCaseDossier` Lines 63–230 — Full Case Particulars & Timeline Dossier

**CSS:**
- `styles/print.css` — `@media print` rules, A4 sizing, ink-saving monochrome, watermarks

**JavaScript:**
| Function | File | Lines | Purpose |
|---|---|---|---|
| `loadPrintTemplates()` | admin.js | 3620–3655 | Async loads `print-templates.html` |
| Guest Dossier Print | admin.js | 5268–5271 | Binds `#guestDetailPrintBtn` |
| Cause List Print | admin.js | 8595–8598 | Attaches `#printCauseListBtn` |
| `populatePrintableCaseDossier()` | print-templates.js | L19–270 | Fills dossier template |
| `printCurrentCaseDossier()` | print-templates.js | L272–295 | Triggers print dialog |
| `printDailyCauseList()` | causelist.js | L494 | Prints cause list |

---

*Last updated: October 2026 | CaseBook Modular v6*
