# CaseBook Modular — Step-by-Step Designing Plan

> **Auto-Check Convention:** Jaise-jaise har step ya sub-task complete hoga, uska checkbox `- [ ]` se `- [x]` update kar diya jayega aur **Progress Tracker** me status update ho jayega.

## Project Design Rules (`.agents/rules/ui-rules.md` + User Rules)
- **Uniform Design:** Existing design system, CSS variables, spacing, card structures, aur Light/Dark theme consistency maintain karni hai.
- **Lucide Icons Only:** Sirf Lucide icons (`<i data-lucide="..."></i>` / `utils/lucideIcons.js`) use karne hain — koi emoji ya dusra icon set nahi.
- **Strict Tab Isolation:** Har tab ki CSS strictly uske container/scope selector (e.g., `:is(#home, [data-home-scope])`) me scoped honi chahiye taaki zero cross-tab side effects hon.
- **Soft Border Colors:** Borders ke liye hamesha soft/subtle colors (`--border-subtle`, `--border-default`) use honge — harsh ya high-contrast borders avoid karne hain.
- **Zero Hard-Coded Colors:** Kisi bhi component, tab, ya style rule me raw hex/rgb/hsl color hard-code nahi hoga; har color sirf CSS design tokens (`var(--...)`) se aayega.
- **No Duplicate Component Styling (DRY):** Shared UI components (buttons, cards, forms, tables, badges, modals) ki styling dobara nahi likhi jayegi — existing shared classes aur tokens hi reuse honge.
- **Tailwind-Theme Glow Border on Important Buttons:** Important/Primary CTA buttons par Tailwind theme ke matching subtle glow border (`--btn-glow-border` / `--btn-glow-shadow` tokens via ring/box-shadow) use hoga — bina hard-coded colors ke.

---

## Progress Tracker

| Step | Phase | Status |
| :--- | :--- | :--- |
| Step 1 | Design System & Theme Foundation | Pending |
| Step 2 | Layout Shell & Navigation Design | Pending |
| Step 3 | Reusable UI Primitives | Pending |
| Step 4 | Shared Modals & Print Templates | Pending |
| Step 5 | Tab-by-Tab Designing (20 Tabs) | Pending |
| Step 6 | Verification (Theme, Mobile & Regression) | Pending |

---

## Step 1: Design System & Theme Foundation (Global Tokens)
- [ ] Color palette aur Light/Dark theme CSS variables define karna (`--bg-surface`, `--bg-card`, `--text-primary`, `--text-muted`, `--border-color`, `--accent-primary`, status colors)
- [ ] Typography scale (`Plus Jakarta Sans` / `Inter`), spacing, border-radius, aur shadow tokens standardize karna
- [ ] Lucide iconography audit: ensure karna ki har jagah sirf Lucide icons (`utils/lucideIcons.js`) use hon

---

## Step 2: Layout Shell & Navigation Design
- [ ] Header & Top Navigation bar (search bar, quick actions, theme toggle, user/auth status) design karna
- [ ] Sidebar / Smart Nav me 20 tabs ki clean logical grouping set karna
- [ ] Responsive breakpoints (Desktop sidebar vs. Mobile bottom-nav / drawer) finalize karna
- [ ] Shared footer (`components/chambers-footer.js`) ko theme-consistent aur compact banana

---

## Step 3: Reusable UI Primitives (Core Component Kit)
- [ ] **Cards & Containers:** Stat cards, list cards, section headers
- [ ] **Forms & Inputs:** Text inputs, searchable dropdowns, date pickers, validation states
- [ ] **Tables & Lists:** Desktop data tables aur mobile stacked card views
- [ ] **Buttons, Badges & Status Pills:** Primary, secondary, danger buttons; case status badges (Pending, Disposed, Urgent)
- [ ] **Feedback UI:** Toast notifications, tooltips (`utils/tooltipController.js`), loading skeletons aur empty states

---

## Step 4: Shared Modals & Print Templates
- [ ] **Modals (`components/modals/case-modals.html` & `.js`):** Case detail, forward/next-date modal, aur confirmation dialogs ka uniform desktop + mobile sheet layout
- [ ] **Print Templates (`components/print/print-templates.html` & `.js`):** `@media print` rules ke saath clean A4/legal print layouts (Cause List, Case Summary, Receipts)

---

## Step 5: Tab-by-Tab Designing (Strict Isolation ke Saath)

### Batch A — Core Dashboards & Daily Workflow
- [ ] `home` (`components/tabs/home/`) — KPIs, aaj ki hearings, quick stats
- [ ] `newhome` (`components/tabs/newhome/`) — Modern dashboard layout alignment
- [ ] `hearing` (`components/tabs/hearing/`) — Daily hearings & forward-date workflow
- [ ] `upcoming` (`components/tabs/upcoming/`) — Upcoming hearings schedule
- [ ] `calendar` (`components/tabs/calendar/`) — Calendar grid & date events
- [ ] `causelist` (`components/tabs/causelist/`) — Daily court cause list & print-ready view

### Batch B — Case Register & CRUD Operations
- [ ] `all` (`components/tabs/all/`) — Master cases register, filters, search, pagination
- [ ] `add` (`components/tabs/add/`) — New case entry form
- [ ] `update` (`components/tabs/update/`) — Case edit/update form
- [ ] `delete` (`components/tabs/delete/`) — Case delete confirmation & flow
- [ ] `transfer` (`components/tabs/transfer/`) — Case transfer workflow
- [ ] `disposed` (`components/tabs/disposed/`) — Disposed cases archive view
- [ ] `livecrud` (`components/tabs/livecrud/`) — Real-time/inline editing UI

### Batch C — Practice Management & Finance
- [ ] `paisa` (`components/tabs/paisa/`, ref: `components/tabs/paisa/DESIGN.md`) — Fees, receipts, dues ledger
- [ ] `todo` (`components/tabs/todo/`) — Task strip, filters, checklist items
- [ ] `courts` (`components/tabs/courts/`) — Court master directory
- [ ] `helpers` (`components/tabs/helpers/`) — Court helpers / contacts directory

### Batch D — System, Settings & Info
- [ ] `manage` (`components/tabs/manage/`) — Data/records management tools
- [ ] `settings` (`components/tabs/settings/`) — DB studio, preferences, theme/backup controls
- [ ] `about` (`components/tabs/about/`) — App info, shortcuts, documentation

---

## Step 6: Cross-Browser, Mobile & Accessibility Verification
- [ ] Light & Dark mode contrast aur border visibility check karna
- [ ] Mobile responsiveness verify karna (zero horizontal overflow; Playwright specs in `tests/browser/` run karna)
- [ ] Cross-tab isolation test karna: tab switch karne par kisi dusre tab ki layout/styles break na hon
- [ ] Existing unit/component tests (`npm test`) run karke verify karna
