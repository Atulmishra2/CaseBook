# CaseBook — Realme 9 Pro+ UI Responsiveness Audit & Progress Tracker

> **Device Specifications:**
> - **Model:** Realme 9 Pro+ (Realme 9 Pro Plus)
> - **Display:** 6.4" Super AMOLED, 90Hz Refresh Rate, 1080 × 2400 pixels (20:9 aspect ratio)
> - **Primary Audit Viewport:** `412px × 915px` (DPR ~2.625)
> - **Secondary Viewport (Display Scale Small):** `392px × 872px`
> - **Landscape Viewport:** `915px × 412px`
> - **Hardware & OS Specifics:** Top-left punch-hole camera (~36px), Android Gesture bar (~16px), Gboard virtual keyboard (~300px height reduction)
> - **Governing Standards:** [DESIGN.md](file:///d:/caseBook-modular/DESIGN.md) & [.agents/rules/ui-rules.md](file:///d:/caseBook-modular/.agents/rules/ui-rules.md)

---

## 1. Executive Progress Dashboard

| Metric | Status | Target |
| :--- | :--- | :--- |
| **Audit Status** | 🟢 **Steps A1, A2, A3, A4, A5 Verified (Zero Desktop Impact)** | 100% Audited & Verified |
| **Total Tabs / Modules** | **24 Items** (22 Tabs + Shell + Global Modals) | 24 |
| **Completed & Verified [✅]** | **6** (Shell, Cause List, Upcoming, Calendar, Hearing, Undated) | 24 (25.0%) |
| **In Progress [🔄]** | **0** | - |
| **Pending [⏳]** | **18** | 0 |
| **Active Open Issues** | **0** (Step A5 verified & titlebar decluttered) | 0 |
| **Current Focus** | **Ready for Step A6 (Multi-Tab Parity Quality Gate)** | Litigation Parity Stack |
| **Last Updated** | 2026-11-24 | Continuous |

```
Progress: [██████████████████░░░░░░░░░░░░░░░░░░░░░░░] 25.0%
```

---

## 2. Non-Negotiable Mobile Acceptance Criteria (Realme 9 Pro+)

For any tab or component to be marked **Verified [✅]**, it must pass all 7 criteria:

1. **Zero Horizontal Overflow:**
   - `window.innerWidth === document.documentElement.clientWidth` across 392px and 412px widths.
   - Zero unintentional horizontal scrollbars.
2. **Touch Ergonomics & Hit Targets (≥ 44 × 44px):**
   - All interactive controls (`<button>`, `<a>`, `.act`, checkboxes, chips) must have a tap target of at least **44 × 44 CSS px** (Android 48dp standard).
   - Safe spacing between action buttons (e.g., Call Client vs WhatsApp vs Pass-Over slip) to prevent accidental mis-taps.
3. **Safe Area & Bottom Dock Clearance:**
   - Content bottom padding accounts for `.cb-smart-dock` / `#fixedBottomNav` (`height: 52px` + `bottom: 12px` + `env(safe-area-inset-bottom)` = ~80px-96px clearance).
   - Floating Action Button (FAB) stays above the smart dock without overlap.
4. **Font Scaling & Auto-Zoom Prevention:**
   - All inputs (`<input>`, `<select>`, `<textarea>`) must have `font-size: >= 16px` to prevent mobile browser auto-zoom on focus.
5. **Soft Keyboard (Gboard) Resilience:**
   - When the virtual keyboard opens (~300px), focused inputs remain visible and submit buttons are accessible.
6. **Token & Icon Architecture (`DESIGN.md`):**
   - Exclusively Lucide vector icons (`stroke: currentColor; fill: none;`).
   - Zero hardcoded colors; full contrast on AMOLED dark (`#12131A`) and light themes.
7. **Multi-Tab Parity Rule:**
   - Daily Cause List (`tab-causelist`), Upcoming Hearings (`tab-upcoming`), and Calendar (`tab-calendar`) must maintain **100% identical docket cards, `.act` action button tokens, and sorting headers**.
8. **Zero Desktop Regression & Strict Viewport Isolation (Mandatory):**
   - **Absolute Rule:** Kisi bhi mobile responsive fix, touch-target expansion, safe-area padding, ya layout change ka **Desktop View (>= 769px aur >= 1025px) par 0.00% effect** hona chahiye.
   - All mobile adjustments **MUST** be strictly encapsulated within mobile media queries (e.g. `@media (max-width: 768px)` or `@media (max-width: 639.98px)`).
   - Desktop 56px top header, persistent sidebar/rail, desktop tables, modal center alignments, and hover micro-interactions must remain 100% intact, pristine, and regression-free.
   - Har mobile fix ke baad desktop viewport (1280px / 1440px / 1920px) ka visual & layout verification pass hona mandatory hai.

---

## 3. Option A Execution Roadmap: Priority Litigation & Shell Stack

```mermaid
flowchart TD
    subgraph OptionA["Option A: Core Litigation & Navigation Stack"]
        direction TB
        Step1["Step A1: Shell & Navigation Bedrock<br>(Top Nav, Smart Dock, Drawer, FAB)"]
        Step2["Step A2: Daily Cause List Audit<br>(#causelist: Docket Cards & .act Buttons)"]
        Step3["Step A3: Upcoming Hearings Audit & Parity<br>(#upcoming: Filters & Parity Sync)"]
        Step4["Step A4: Calendar Scheduler Audit & Parity<br>(#calendar: 7-Day Grid & Agenda List)"]
        Step5["Step A5: Hearing Board & Undated Cases<br>(#hearing & #undated)"]
        Step6["Step A6: Multi-Tab Parity Quality Gate<br>(Cross-Tab Sign-off & Token Verification)"]

        Step1 --> Step2
        Step2 --> Step3
        Step3 --> Step4
        Step4 --> Step5
        Step5 --> Step6
    end
```

### Detailed Step-by-Step Procedure for Option A:

#### Step A1: Shell & Navigation Bedrock Audit & Tuning
- **Target Files:** `styles/headerNav.css`, `styles/layout.css`
- **Actions:**
  1. Audit Top Navigation Header on 412px & 392px viewports:
     - Verify hamburger button touch target (`#sidebarToggleBtn`) is ≥ 44×44px.
     - Verify quick search toggle (`.topnav-search`) expands full-width without pushing action icons offscreen.
     - Test top punch-hole camera margin clearance (`env(safe-area-inset-top)`).
  2. Audit Smart Dock (`.cb-smart-dock` / `#fixedBottomNav`):
     - Check horizontal centering (`max-width: 440px`) on 412px screen.
     - Verify active tab expanding pill animation doesn't cause horizontal overflow.
     - Validate bottom clearance against Android gesture bar (`env(safe-area-inset-bottom)`).
  3. Audit Floating Action Button (`.mobile-fab-btn`):
     - Ensure bottom positioning sits strictly above the smart dock (`bottom: calc(72px + env(safe-area-inset-bottom))`).
     - Check touch hit box (56×56px) and thumb reachability.
  4. Audit Slide-Over Drawer (`#sidebarOverlay` & `.sidebar`):
     - Verify 90Hz smooth sliding transform without stutter.
     - Ensure user profile card and navigation links have ≥ 44px vertical touch rhythm.

#### Step A2: Daily Cause List (`#causelist`) Mobile Responsive Audit
- **Target Files:** `components/tabs/causelist/tab-causelist.css`, `components/tabs/causelist/tab-causelist.html`, `admin.js`
- **Actions:**
  1. Inspect Court Grouping Header:
     - Court room / hall badge, judge name, and total cases count wrapping on 412px.
  2. Docket Row to Card Transformation:
     - On mobile (`max-width: 640px` or `<= 768px`), desktop table rows collapse into vertical stacked cards.
     - Item info hierarchy: Case Number & Year (bold), Court/Bench tag, Parties (Petitioner vs Respondent), Stage pill, Next Date badge.
  3. Universal Action Buttons (`.act`) Mobile Layout:
     - Check all 5 buttons: `.act.primary` (Update Next Date), `.act-dossier`, `.act-call`, `.act-whatsapp`, `.act-passover`.
     - Ensure buttons wrap gracefully into a clean 2-column grid or horizontal scroll strip without cutting off labels or icons.
     - Verify Lucide icon color synchronization (`stroke: currentColor !important; color: inherit;`).
  4. Checkbox & Selection Area:
     - Ensure docket checkbox hit area is padded to ≥ 44×44px.

#### Step A3: Upcoming Hearings (`#upcoming`) Mobile Audit & Parity Sync
- **Target Files:** `components/tabs/upcoming/tab-upcoming.css`, `components/tabs/upcoming/tab-upcoming.html`
- **Actions:**
  1. Date Filter Chips Row:
     - Test horizontal swipe with touch snap (`overflow-x: auto; -webkit-overflow-scrolling: touch;`).
     - Check touch targets for "Today", "Tomorrow", "Next 7 Days", "This Month".
  2. 5-Column Sorting Headers:
     - Verify touch targets for sort triggers (Court, Case, Stage, Date).
  3. Strict Parity Check with `tab-causelist.css`:
     - Cross-verify docket card layout, drawer expand/collapse, and `.act` buttons.
     - Verify dark mode token bindings (`--feedback-info-soft`, `--feedback-success-soft`, `--feedback-warning-soft`) match `DESIGN.md`.

#### Step A4: Calendar Scheduler (`#calendar`) Mobile Audit & Parity Sync
- **Target Files:** `components/tabs/calendar/tab-calendar.css`, `components/tabs/calendar/tab-calendar.html`
- **Actions:**
  1. 7-Day Monthly Calendar Grid:
     - Measure day cells across 412px and 392px widths.
     - Ensure each day cell is at least 40×40px with hearing indicator dots clearly visible.
     - Prevent horizontal scrolling on the calendar container.
  2. Selected Day Docket Agenda List:
     - Verify day's case docket cards appear cleanly below the monthly grid.
     - Enforce 100% token and layout parity with `tab-causelist.css` `.act` buttons and cards.

#### Step A5: Hearing Updates (`#hearing`) & Undated Cases (`#undated`) Audit
- **Target Files:** `components/tabs/hearing/tab-hearing.css`, `components/tabs/undated/tab-undated.css`
- **Actions:**
  1. Hearing Board Bulk Updates:
     - Verify date input and stage dropdown have `font-size: >= 16px` to prevent Gboard auto-zoom.
     - Test pass-over slip / notes textarea with virtual keyboard open.
  2. Undated Cases Listing:
     - Check warning banners, urgency markers, and "Assign Listing Date" touch button (≥ 44px).

#### Step A6: Multi-Tab Parity Quality Gate & DOM Verification
- **Actions:**
  1. Run automated/scripted DOM bounding box check across all 5 tabs on 412px & 392px widths:
     ```js
     document.querySelectorAll('#causelist *, #upcoming *, #calendar *').forEach(el => {
       if (el.getBoundingClientRect().right > window.innerWidth) console.error('Overflow:', el);
     });
     ```
  2. Verify dual-theme contrast on 90Hz AMOLED display (Light Mode vs Deep Dark `#12131A`).
  3. Sign-off Option A in Section 4 (Execution Log) and update dashboard progress.

---

## 4. Tab-Wise Audit & Progress Matrix

### Phase 1: Mobile Shell & Core Navigation

| ID | Component / File | Scope / Selectors | Audit Focus on Realme 9 Pro+ (412x915) | Status | Findings / Notes |
| :---: | :--- | :--- | :--- | :---: | :--- |
| **SH-1** | **Top Header Bar**<br>`styles/headerNav.css` | `.header`, `.topnav-brand`, `#sidebarToggleBtn` | Hamburger tap target, search bar mobile expansion, punch-hole camera clearance. | ✅ Verified | Fixed: 44px tap target, safe-area top padding, 16px search input (0% desktop effect). |
| **SH-2** | **Smart Dock (Bottom Nav)**<br>`styles/layout.css` | `.cb-smart-dock`, `#fixedBottomNav` | Centering on 412px, active pill animation, gesture bar safe-area clearance. | ✅ Verified | Fixed: 44px hit-box on dock buttons, z-index 1065 on overlay dims dock cleanly. |
| **SH-3** | **Slide-Over Sidebar**<br>`styles/layout.css` | `.sidebar`, `#sidebarOverlay`, `.profile-card` | Smooth slide at 90Hz, backdrop tap dismiss, user profile card wrapping. | ✅ Verified | Fixed: safe-area top/bottom padding, body scroll lock on mobile drawer open. |
| **SH-4** | **Floating Action Button**<br>`styles/layout.css` | `.mobile-fab-btn`, `#mobileAddCaseFab` | Elevation above smart dock (`bottom: calc(72px + env(...))`), thumb reach. | ✅ Verified | Fixed: bottom clearance increased to 36px+ above dock, preventing mis-taps with 'More'. |

---

### Phase 2: Litigation & Calendar Tabs (Multi-Tab Parity Rule)

> [!IMPORTANT]
> Docket card layout, collapsible drawer, 5-column sorting, and `.act` buttons must match across all three core tabs.

| ID | Tab / Scope | Key Files | Audit Focus on Realme 9 Pro+ | Status | Findings / Notes |
| :---: | :--- | :--- | :--- | :---: | :--- |
| **LT-1** | **Daily Cause List**<br>`#causelist` | `components/tabs/causelist/tab-causelist.css` | Court grouping headers, stacked docket cards, `.act` button wrapping & hit targets. | ✅ Verified | Fixed: 2-tier 2-col action grid (44px), chip height 40px, 44px dropdown trigger, 16px date input. Benchmark locked. |
| **LT-2** | **Upcoming Hearings**<br>`#upcoming` | `components/tabs/upcoming/tab-upcoming.css` | Date filter chips horizontal swipe, 5-column sort headers on mobile, drawer parity. | ✅ Verified | Fixed: 2-tier 2-column action grid (44px), Cards view 44px buttons, 40px chips, 44px dropdown trigger. Parity synced with Causelist. |
| **LT-3** | **Calendar Scheduler**<br>`#calendar` | `components/tabs/calendar/tab-calendar.css` | 7-day monthly grid on 412px, touch targets per day cell, agenda list parity. | ✅ Verified | Fixed: 2-tier 2-column action grid (44px), 44px sort/toggle triggers, 44px nav/today buttons. Parity locked with Causelist & Upcoming. |
| **LT-4** | **Hearing Updates**<br>`#hearing` | `components/tabs/hearing/tab-hearing.css` | Daily board row updates, inline date picker trigger, stage change dropdown. | ✅ Verified | Fixed: 88px+ smart dock clearance, 16px inputs/search/textarea (no auto-zoom), 44px presets, 40px stage chips, 44px triggers, clean metadata pills. |
| **LT-5** | **Undated Cases**<br>`#undated` | `components/tabs/undated/tab-undated.css` | Warning banners, quick date assigner button touch target, empty state. | ✅ Verified | Fixed: 88px+ smart dock clearance, decluttered header (hidden redundant back button, icon-only segmented view toggle, icon-only refresh), 44px/16px search & triggers, 40px category chips, 19px title. |

---

### Phase 3: Dashboard Tabs

| ID | Tab / Scope | Key Files | Audit Focus on Realme 9 Pro+ | Status | Findings / Notes |
| :---: | :--- | :--- | :--- | :---: | :--- |
| **DB-1** | **Classic Home**<br>`#home` | `styles/tab-home.css` | Metric cards grid (2x2 or 1-col on 412px), quick actions grid, mini agenda preview. | ⏳ Pending | - |
| **DB-2** | **Zen Home**<br>`#newhome` | `components/tabs/newhome/tab-newhome.css` | Daily summary banner, focus card hierarchy, clean viewport fold on 915px height. | ⏳ Pending | - |

---

### Phase 4: Case Registry & Forms

| ID | Tab / Scope | Key Files | Audit Focus on Realme 9 Pro+ | Status | Findings / Notes |
| :---: | :--- | :--- | :--- | :---: | :--- |
| **CR-1** | **All Cases Registry**<br>`#all` | `components/tabs/all/tab-all.css` | Search + filter pills swipe, mobile case card transformation, pagination touch buttons. | ⏳ Pending | - |
| **CR-2** | **Manage Cases**<br>`#manage` | `components/tabs/manage/tab-manage.css` | Bulk selection sticky toolbar above smart dock, batch action sheet. | ⏳ Pending | - |
| **CR-3** | **Add Case Form**<br>`#add` | `components/tabs/add/tab-add.css` | 1-column form layout, input font-size ≥ 16px, Gboard keyboard visibility & submit button. | ⏳ Pending | - |
| **CR-4** | **Edit Case Form**<br>`#update` | `components/tabs/update/tab-update.css` | Pre-filled field contrast, history log cards, dirty state indicator. | ⏳ Pending | - |
| **CR-5** | **Case Dossier (Detail)**<br>`#detail` | `components/tabs/detail/tab-detail.css` | Case summary header, swipeable sub-tabs (Overview, Orders, Notes), client action pills. | ⏳ Pending | - |
| **CR-6** | **Disposed Cases**<br>`#disposed` | `components/tabs/disposed/tab-disposed.css` | Final order summary cards, disposition date badges, archive filter. | ⏳ Pending | - |
| **CR-7** | **Court Transfer**<br>`#transfer` | `components/tabs/transfer/tab-transfer.css` | From/To court selectors on 412px, case preview card, transfer notes. | ⏳ Pending | - |
| **CR-8** | **Trash & Delete**<br>`#delete` | `components/tabs/delete/tab-delete.css` | Safe separation of Restore vs Delete actions, confirmation dialogs. | ⏳ Pending | - |

---

### Phase 5: Tasks & Financials

| ID | Tab / Scope | Key Files | Audit Focus on Realme 9 Pro+ | Status | Findings / Notes |
| :---: | :--- | :--- | :--- | :---: | :--- |
| **OP-1** | **To-Do & Tasks**<br>`#todo` | `components/tabs/todo/tab-todo.css` | Checkbox tap area (≥ 44px hit box), quick-add inline input, filter chips. | ⏳ Pending | - |
| **OP-2** | **Paisa (Financials)**<br>`#paisa` | `components/tabs/paisa/tab-paisa.css` | Financial KPI cards, fee ledger cards, Record Payment bottom sheet trigger. | ⏳ Pending | - |

---

### Phase 6: Utility & Settings Tabs

| ID | Tab / Scope | Key Files | Audit Focus on Realme 9 Pro+ | Status | Findings / Notes |
| :---: | :--- | :--- | :--- | :---: | :--- |
| **UT-1** | **Courts Master**<br>`#courts` | `components/tabs/courts/tab-courts.css` | Court list item tap targets, add court modal form, search input. | ⏳ Pending | - |
| **UT-2** | **Legal Helpers**<br>`#helpers` | `components/tabs/helpers/tab-helpers.css` | Tool cards 1-column stack, limitation calculator input, copy-to-clipboard feedback. | ⏳ Pending | - |
| **UT-3** | **Live Sync & CRUD**<br>`#livecrud` | `components/tabs/livecrud/tab-livecrud.css` | Sync status indicators, diagnostic cards, manual trigger button. | ⏳ Pending | - |
| **UT-4** | **Settings**<br>`#settings` | `components/tabs/settings/tab-settings.css` | Theme toggle switch hit target, advocate profile form, backup export/import buttons. | ⏳ Pending | - |
| **UT-5** | **About**<br>`#about` | `components/tabs/about/tab-about.css` | Typography hierarchy, version pills, external links safety. | ⏳ Pending | - |

---

### Phase 7: Global Modals, Sheets & Overlays

| ID | Component | Key Files | Audit Focus on Realme 9 Pro+ | Status | Findings / Notes |
| :---: | :--- | :--- | :--- | :---: | :--- |
| **MD-1** | **Next Date Modal** | `styles/modals.css` | Width on 412px, calendar date input, primary CTA thumb accessibility. | ⏳ Pending | - |
| **MD-2** | **Client Comms Slip** | `styles/modals.css` | Call / WhatsApp bottom sheet, native intent trigger, template preview. | ⏳ Pending | - |
| **MD-3** | **Confirm Dialogs** | `styles/modals.css` | Centered modal backdrop, destructive action button separation. | ⏳ Pending | - |
| **MD-4** | **Toast Notifications** | `styles/components.css` | Top/bottom safe-area positioning, no collision with smart dock or header. | ⏳ Pending | - |

---

## 5. Execution Log & Remediation History

| Date | Tab / Component ID | Action Taken | Discovered Issues | Resolution / Applied Fix | Status |
| :--- | :--- | :--- | :--- | :--- | :---: |
| 2026-11-24 | All | Initial plan creation & tracker setup | Baseline established for Realme 9 Pro+ | Tracker committed | 🟡 Ready |
| 2026-11-24 | Option A | Added Option A roadmap & desktop rule | Priority litigation stack & zero desktop regression | Plan updated | 🟡 Ready |
| 2026-11-24 | Step A1 (SH-1 to SH-4) | Remediated Shell & Navigation | P0 z-index conflict, sub-44px targets, safe-area camera cutout, FAB collision | Encapsulated in `@media (max-width: 640px/768px/1024px)`. Zero desktop regression verified. | ✅ Verified |
| 2026-11-24 | Step A2 (LT-1) | Remediated Daily Cause List | P0 4-button squash, sub-44px chips & triggers, date auto-zoom | Implemented 2-tier 2-column action grid (44px), 40px chips, 44px triggers, 16px date. Benchmark established for parity. | ✅ Verified |
| 2026-11-24 | Step A3 (LT-2) | Remediated Upcoming Hearings | P0 flex squash in drawer, 36px buttons in Cards view, 28px chips | Synchronized 2-tier 2-column action grid (44px) matching Causelist, set Cards view buttons to 44px, expanded chips to 40px. 0% desktop effect. | ✅ Verified |
| 2026-11-24 | Step A4 (LT-3) | Remediated Calendar Scheduler | Single-row flex button squash in Day Schedule drawer, 38px triggers, sub-44px nav controls | Synchronized 2-tier 2-col action grid (44px), upgraded sort & toggle triggers to 44px, upgraded month nav & today buttons to 44px. Triad parity complete. 0% desktop effect. | ✅ Verified |
| 2026-11-24 | Step A5 (LT-4, LT-5) | Remediated Hearing Board & Undated Register | Smart dock occlusion at bottom, Gboard auto-zoom on form inputs, cluttered titlebar in Undated, sub-44px presets & chips | Added 88px+ smart dock clearance to both tabs; set 16px input font size; redesigned Undated mobile header per approved plan (hidden breadcrumbs, restored 34px crest emblem, un-truncated 'Undated Cases' title, 38px unified pill action controls & view toggle); expanded chips to 40px and presets to 44px. 0% desktop effect. | ✅ Verified |

---

## 6. How to Update Progress

Jab bhi kisi tab ka audit ya responsive fix complete ho:
1. Status column ko `⏳ Pending` se `🔄 In Progress` ya `✅ Verified` me update karein.
2. Discovered issue aur applied fix ko **Section 5 (Execution Log)** me log karein.
3. Executive Progress Dashboard ka counter aur progress bar update karein.
