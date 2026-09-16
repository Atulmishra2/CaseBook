# CaseBook — Architecture Documentation

**CaseBook** is a Progressive Web App (PWA) for legal case management, built for the *Chambers of Atul Kumar Mishra*. It uses a modular, service-oriented JavaScript (ES6 modules) architecture on the frontend, with **Supabase** (PostgreSQL) as the cloud backend and `localStorage`/`sessionStorage` as an offline fallback.

---

## 1. High-Level Overview

```
┌──────────────────────────────────────────────────────────────┐
│                        HTML Entry Points                       │
│   index.html (guest)   admin.html (admin)   todo-dashboard.html│
└───────────────────────────────┬────────────────────────────────┘
                                 │ loads (ES6 module)
                                 ▼
┌──────────────────────────────────────────────────────────────┐
│                          app.js (bootstrap)                    │
│   • instantiates App, calls init()                             │
│   • binds App methods onto window.* for backward compat        │
└───────────────────────────────┬────────────────────────────────┘
                                 │
                                 ▼
┌──────────────────────────────────────────────────────────────┐
│                       app-core.js  (App)                       │
│   Orchestrator: navigation, tab routing, auth handlers,        │
│   data fetching, search filtering, and view refresh.           │
└───────────────────────────────┬────────────────────────────────┘
                                 │ composes
       ┌──────────┬──────────┬───┴──────┬──────────┬──────────┐
       ▼          ▼          ▼          ▼          ▼          ▼
  AuthService  Supabase   CaseService Hearing   Calendar   TaskService
               Service                Service    Service        │
                                          │                     │
                                          ▼                     ▼
                                     UIService  ◄───────────────┘
                                (DOM rendering & toasts)
```

---

## 2. Module Responsibilities

| Module | File | Responsibility |
|--------|------|----------------|
| **App** | `app-core.js` | Main orchestrator — coordinates all services, handles navigation/tab routing, auth handlers, and view rendering. |
| **Bootstrap** | `app.js` | Instantiates `App`, calls `init()`, and exposes methods on `window` for inline HTML `onclick` handlers (backward compatibility). |
| **AuthService** | `auth-service.js` | Authentication, session management, credential storage, PWA install prompt handling. |
| **SupabaseService** | `supabase-service.js` | Database operations, cloud sync, client provisioning. |
| **CaseService** | `case-service.js` | Case CRUD, duplicate detection, court options, statistics, shared date/HTML utilities. |
| **HearingService** | `hearing-service.js` | Hearing scheduling, history, WhatsApp notices, upcoming-week rendering. |
| **CalendarService** | `calendar-service.js` | Monthly calendar view and date selection. |
| **TaskService** | `task-service.js` | To-do / deadline tracking (localStorage-backed), sub-steps, priorities. |
| **UIService** | `ui-service.js` | DOM rendering, toast notifications, dashboards, modals, CSV export. |

---

## 3. Bootstrapping & Initialization Flow

1. An HTML entry point loads the Supabase CDN, then the ES6 module graph rooted at `app.js`.
2. `app.js` creates `const app = new App()` and calls `app.init()`.
3. `App` constructor composes all services and exposes them globally (`window.caseService`, `window.uiService`, etc.).
4. `app.js` binds dozens of `App` methods onto `window.*` so that inline `onclick="showTab('home')"`-style handlers in the HTML continue to work.
5. `App.init()`:
   - Reads the session (`cmUser`) from storage and shows the appropriate screen (`adminScreen` / `guestScreen`).
   - Calls `fetchAllData()` → `SupabaseService.fetchCases()` → `CaseService.setCases()`.
   - Registers event listeners (login form, sidebar, navigation) and the service worker.

> **Note:** `app.js` binds many methods (e.g. `renderCauseListTable`, `renderCalendarView`, `openCaseHistoryModal`) that actually live on the service classes rather than directly on `App`. These delegations rely on the services being exposed globally. When extending, prefer routing through `App` or the relevant service and keep the `window.*` bindings consistent.

---

## 4. Data Layer

### Backend (Supabase / PostgreSQL)
Defined in `supabase_full_schema.sql` and related migration files:

| Table | Purpose |
|-------|---------|
| `civilcases` | Civil, revenue, and complaint cases. |
| `criminalcases` | Criminal cases (police station, section, crime no.). |
| `hearings` | Hearing dates, process stages, action taken. Unique on `(case_number, hearing_date)`. |
| `courts` | Court names for dynamic dropdowns. |
| `case_todos` | Task & deadline tracker. |

Additional specialized case-type tables are provided via migration files (`supabase_*_migration.sql`, `supabase_*_schema.sql`) for state, family, revenue, misc, and complaint cases.

**Conventions:**
- Every table uses UUID primary keys, `created_at`/`updated_at` timestamps, and a `BEFORE INSERT OR UPDATE` trigger to auto-set `updated_at` (and derive `case_name`/`party_name` where blank).
- **Row Level Security (RLS)** is enabled on all tables with permissive policies for `anon` and `authenticated` roles (read/insert/update/delete).

### Offline Fallback (`safeStorage`)
Defined in `auth-service.js` and imported across services. It transparently tries `localStorage` → `sessionStorage` → in-memory `window.__storageFallback`, so the app degrades gracefully when storage is unavailable (e.g. private browsing).

### In-Memory Mirror
`CaseService.setCases()` mirrors fetched data onto `window.allCaseRecords`, `window.allHearingRecords`, and `window.courts` for legacy access. Write operations update Supabase **and** the local arrays so the UI stays responsive even if the network call fails.

---

## 5. Naming Convention Bridge (camelCase ↔ snake_case)

The database uses `snake_case` (`case_number`, `next_hearing`) while the JS layer frequently uses `camelCase` (`caseNo`, `nextHearing`). Code paths defensively read **both** forms, e.g.:

```js
const num = c.caseNo || c.case_number || '';
```

Criminal cases add a parallel set of fields (`criminalCaseNumber`, `criminalCourtName`, `criminalClientName`). Any new rendering/search code should follow this dual-key pattern to remain compatible with data from either source.

---

## 6. Navigation Model

- The admin UI is a **single-page, tab-based** interface. `App.showTab(tabId)` toggles `.tab.active`, persists the active tab (`cmActiveTab` + URL hash), and calls `initTab(tabId)` for per-tab setup.
- A back/forward history stack (`tabHistory` / `tabForwardHistory`) powers the bottom navigation bar.
- On mobile (`width <= 992px`), switching tabs auto-closes the sidebar drawer.

---

## 7. Key Cross-Cutting Utilities (in `case-service.js`)

- `formatDateDMY(input)` — normalizes many date formats to `DD-Mon-YYYY` for display.
- `escapeHtml(str)` — HTML-escaping used throughout rendered templates (XSS guard).
- `getSafeValue(val, fallback)` — coalesces empty values to `—`.
- `toISODate(input)` (in `hearing-service.js`) — normalizes date-ish values to `YYYY-MM-DD` for equality checks.

---

## 8. PWA Layer

- **Manifest:** `manifest.webmanifest` (and `manifest.json`) — standalone display, theme color `#00695c`, icon set under `icons/`.
- **Service Worker:** `sw.js` — cache name `cms-legal-v8`, precaches the app shell, uses a **network-first, cache-fallback** strategy, and **bypasses cache for `supabase.co`** requests so data is always fresh.
  - ⚠️ **Registration mismatch:** `app-core.js` registers `service-worker.js`, but the actual file is `sw.js`. Align these (register `./sw.js`) to ensure offline support works.

---

## 9. Authentication

- Credentials default to constants in `auth-service.js` and can be overridden and persisted via `changeCredentials()` (stored under `cmAdminUser` / `cmAdminPass`).
- `validateLogin()` is case-insensitive on username, trims inputs, and also accepts the hardcoded default identity as a fallback.
- Session role is stored in `cmUser` as `admin` or `guest`; guests get a read-only client portal (`UIService.renderGuestTable`).

> **Security note:** Credentials are client-side only and RLS policies are fully permissive to `anon`. This is suitable for a single-practitioner/demo context but is **not** a hardened multi-tenant auth model.

---

## 10. Extending the System — Guidelines

1. **Add a new service** by creating `<name>-service.js`, importing shared utils from `case-service.js`, exporting the class, and composing it in the `App` constructor.
2. **Expose new UI-invoked methods** on `window.*` in `app.js` if they are called from inline HTML handlers.
3. **Always dual-read** camelCase/snake_case keys and criminal/civil variants when touching case data.
4. **Escape all interpolated user data** with `escapeHtml()` in template strings.
5. **Write through both layers** — attempt the Supabase call, then update the in-memory arrays and re-render.
6. **Bump cache versions** (`CACHE_NAME` in `sw.js`, `?v=` query strings on scripts) when shipping asset changes.

---

## 11. File Reference (selected)

```
Entry HTML ........ index.html, admin.html, todo-dashboard.html, case-cards-demo.html
Bootstrap ......... app.js
Orchestrator ...... app-core.js
Services .......... auth-service.js, supabase-service.js, case-service.js,
                    hearing-service.js, calendar-service.js, task-service.js,
                    ui-service.js
UI helpers ........ mint-datepicker.js, theme-toggle.js, components/chambers-footer.js
Styles ............ styles.css, admin.css, admin-mint.css
PWA ............... manifest.webmanifest, manifest.json, sw.js, icons/
Database .......... supabase_full_schema.sql (+ per-type schema & migration SQL files)
Docs .............. README.md, RAW_STRUCTURE.md, CUSTOM_STYLE.md, .agent.md, ARCHITECTURE.md
```
