# CaseBook Design System & UI/UX Principles
**Version**: 2.5 (Enterprise Modern SaaS Edition)  
**Standard**: Clean, modern, accessible, high-contrast, dual-theme (Light & Dark Midnight).

---

## 1. Global Color Tokens & Variables

```css
:root {
  /* --- 1. Global Navigation & Chrome --- */
  --cb-nav-bg: #FFFFFF;
  --cb-nav-text: #1E293B;
  --cb-nav-icon: #2A7B77;
  --cb-nav-hover: #F1F5F9;
  --cb-sidenav-bg: #FFFFFF;
  --cb-sidenav-text: #1E293B;
  --cb-sidebar-active: #2A7B77;

  /* --- 2. Backgrounds & Surfaces --- */
  --cb-bg-body: #F4F7FB;
  --cb-surface: #FFFFFF;
  --cb-surface-alt: #F8FAFC;
  --cb-surface-header: #FAFBFC;
  --cb-border: #E2E8F0;
  --cb-border-subtle: #F1F5F9;
  --cb-border-hover: #CBD5E1;

  /* --- 3. Typography --- */
  --cb-text-main: #1E293B;
  --cb-text-heading: #0F172A;
  --cb-text-muted: #64748B;
  --cb-text-light: #94A3B8;

  /* --- 4. Buttons & Actions --- */
  --cb-btn-primary: #4F46E5;
  --cb-btn-primary-hover: #4338CA;
  --cb-btn-secondary: #FFFFFF;
  --cb-btn-secondary-border: #D1D5DB;
  --cb-btn-danger: #DC2626;
  --cb-btn-danger-hover: #B91C1C;
  --cb-fab: #4F46E5;

  /* --- 5. Badges & Case Types --- */
  --cb-badge-civil-bg: #E0F2FE;
  --cb-badge-civil-text: #0369A1;
  --cb-badge-criminal-bg: #FEE2E2;
  --cb-badge-criminal-text: #B91C1C;
  --cb-badge-revenue-bg: #FEF3C7;
  --cb-badge-revenue-text: #B45309;
  --cb-badge-family-bg: #F3E8FF;
  --cb-badge-family-text: #6B21A8;
  --cb-badge-todo-bg: #FFEDD5;
  --cb-badge-todo-text: #C2410C;
  --cb-badge-upcoming-bg: #DCFCE7;
  --cb-badge-upcoming-text: #15803D;

  /* --- 6. Specialized Modules --- */
  --cb-paisa-credit: #10B981;
  --cb-paisa-debit: #EF4444;
  --cb-paisa-balance: #0F172A;
  --cb-timeline-line: #CBD5E1;
  --cb-whatsapp: #25D366;

  /* --- 7. Modal System Tokens --- */
  --cb-modal-overlay-bg: rgba(15, 23, 42, 0.5);
  --cb-modal-card-bg: #FFFFFF;
  --cb-modal-header-bg: #FAFBFC;
  --cb-modal-footer-bg: #FAFBFC;
  --cb-modal-border: #F1F5F9;
  --cb-modal-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05);
}

/* --- Dark (Midnight) Theme Tokens --- */
html.dark,
html[data-theme="dark"],
[data-theme="dark"],
.dark {
  --cb-bg-body: #0B1120;
  --cb-surface: #1E293B;
  --cb-surface-alt: #172033;
  --cb-surface-header: #0F172A;
  --cb-border: #334155;
  --cb-border-subtle: #283548;
  --cb-border-hover: #475569;

  --cb-text-main: #F1F5F9;
  --cb-text-heading: #F8FAFC;
  --cb-text-muted: #94A3B8;
  --cb-text-light: #64748B;

  --cb-btn-primary: #6366F1;
  --cb-btn-primary-hover: #4F46E5;
  --cb-btn-secondary: #1E293B;
  --cb-btn-secondary-border: #475569;

  --cb-modal-overlay-bg: rgba(0, 0, 0, 0.75);
  --cb-modal-card-bg: #1E293B;
  --cb-modal-header-bg: #0F172A;
  --cb-modal-footer-bg: #0F172A;
  --cb-modal-border: #334155;
  --cb-modal-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.08);
}
```

---

## 2. Enterprise Modal Design Principles (Modern Modal Architecture)

All application modals must strictly conform to these standardized architectural, UX, and aesthetic principles.

### 2.1 Modal Overlay (`.modal-overlay`)
1. **Position & Stacking**: Fixed fullscreen overlay (`position: fixed; inset: 0; z-index: 99999;`).
2. **Backdrop Blur**:
   - Modern glassmorphism blur: `backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);`.
   - Light: `rgba(15, 23, 42, 0.5)`
   - Dark: `rgba(0, 0, 0, 0.75)`
3. **Dismissal Standards**:
   - Outside Click: `onclick="if (event.target === this) closeModal();"`.
   - Keyboard: Must respond to the `Escape` key globally.
   - Screen Reader: `role="dialog"`, `aria-modal="true"`, and `aria-labelledby="[modalTitleId]"`.

### 2.2 Modal Card (`.modal-card`)
1. **Geometry & Corners**:
   - Border radius: `16px` (`var(--radius-lg)`).
   - Overflow: `overflow: hidden;` with `display: flex; flex-direction: column;`.
   - Maximum height: `88vh` to `90vh` to guarantee viewability across all laptop, tablet, and mobile screens.
2. **Standard Sizing Scales**:
   - **Small / Confirmation Dialogs**: `max-width: 440px;` (e.g., Delete Confirmation).
   - **Standard Form / Action Dialogs**: `max-width: 540px - 640px;` (e.g., Add Helper, Edit Contact, Forward Date).
   - **Complex Dossier / Multi-Column Data Dialogs**: `max-width: 860px - 960px;` (e.g., Case Details, Hearing History).
3. **Motion & Elevation**:
   - Smooth entrance animation:
     ```css
     @keyframes modalFadeIn {
       from { opacity: 0; transform: scale(0.96) translateY(6px); }
       to { opacity: 1; transform: scale(1) translateY(0); }
     }
     animation: modalFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
     ```

### 2.3 Modal Header (`.modal-header`)
1. **Sticky Layout**: Pinned to top, separated by thin 1px border.
2. **Structure**:
   - **Icon Badge** (`.modal-icon-badge`): 38x38px rounded container (`border-radius: 10px`) with soft tinted background (`#eef2ff` in light, `rgba(99,102,241,0.22)` in dark) and crisp icon. Danger modals use red tinted badge (`#fee2e2` / `rgba(220,38,38,0.25)`).
   - **Title**: Bold, dark sans-serif (`font-size: 17px - 18px; font-weight: 700; color: var(--cb-text-heading);`).
   - **Subtitle**: Subdued contextual description (`font-size: 12.5px - 13px; color: var(--cb-text-muted);`).
   - **Close Button** (`.modal-close-btn`): Borderless, accessible `&times;` or SVG cross with subtle hover background (`#e2e8f0` / `#334155`).
   - **Header Badges**: When presenting case context, display case type (`⚖️ Civil`, `🚨 Criminal`) or status chips on the right.

### 2.4 Hero Summary Banner (`.hero-card` / `.modal-case-summary`)
When a modal inspects a specific case (e.g., Hearing History, Forward Date, Case Details):
1. **Case Identification**: Shows bold Case Title, Case Number, and Assigned Court.
2. **Highlight Box**: Right-aligned highlight pill or glass card for **Next Hearing Date**, stage, and countdown status.

### 2.5 Modal Body (`.modal-body`)
1. **Padding & Scrolling**: `padding: 20px 24px; overflow-y: auto; box-sizing: border-box; overscroll-behavior: contain;`.
2. **Form Layouts**:
   - 2-column responsive grid on desktop: `display: grid; grid-template-columns: 1fr 1fr; gap: 16px;`.
   - Collapses cleanly to 1 column on mobile (< 520px).
3. **Form Controls**:
   - Field labels: `font-size: 12.5px; font-weight: 600; color: var(--cb-text-main);`. Required fields marked with `<span class="required-star">*</span>`.
   - Inputs & Selects: `padding: 9px 12px; font-size: 13.5px; border-radius: 8px; border: 1px solid var(--cb-border); background: var(--cb-surface-alt);`.
   - Focus Ring: Indigo accent outline (`border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.18);`).
4. **Data Tables & Timelines**:
   - Enclosed in rounded table container (`border: 1px solid var(--cb-border); border-radius: 10px; overflow: hidden;`).
   - Sticky / distinct header row with clean uppercase column titles.
   - Stage / Status badges with clear semantic colors:
     - 🟢 **Upcoming / Scheduled**: Emerald (`#ecfdf5` / `#047857`)
     - 🔵 **Previous Hearing**: Indigo / Slate (`#eef2ff` / `#4f46e5`)
     - 🟣 **Filing Milestone**: Violet (`#faf5ff` / `#9333ea`)
     - 🟡 **Pending / Action Needed**: Amber (`#fffbeb` / `#b45309`)
5. **Empty States**:
   - Clean centered layout with circular icon badge, bold message, subtle tip, and a prominent call-to-action button.

### 2.6 Modal Footer (`.modal-footer`)
1. **Pinned Bottom Bar**: `padding: 14px 22px; border-top: 1px solid var(--cb-modal-border); background: var(--cb-modal-footer-bg); display: flex; justify-content: flex-end; gap: 10px;`.
2. **Secondary Button** (Cancel / Close):
   - Neutral style (`.helper-btn-secondary`, `.btn-secondary`).
   - Light: white background, `#d1d5db` border, `#4b5563` text.
   - Dark: `#1e293b` background, `#475569` border, `#cbd5e1` text.
3. **Primary Action Button** (Submit / Save / Update):
   - Accent button with icon and text (`.helper-btn-primary`, `.btn-primary`).
   - `background: var(--cb-btn-primary); color: #ffffff; border-radius: 8px; font-weight: 600;`.
   - Hover: slight elevation and background shade shift (`transform: translateY(-1px)`).
4. **Destructive Action Button** (Delete):
   - Red button with trash icon (`background: #dc2626; color: #ffffff;`).

---

## 3. Responsive Breakpoints

| Breakpoint | Target Screen | Modal Behavior |
| :--- | :--- | :--- |
| **> 768px** | Desktop / Laptop | Full width cards (`540px - 960px`), multi-column forms, tables with full column visibility |
| **481px - 767px** | Tablet / Large Phone | Form grids shift to 1-2 columns, cards scale to 92vw |
| **<= 480px** | Mobile Devices | Full-width modal bottom sheet / responsive stacked view, hidden non-essential columns, 1-column forms |
