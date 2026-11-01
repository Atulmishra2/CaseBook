# Design System: Paisa Tab (CaseBook Finance & Ledger)

## 1. Visual Theme & Atmosphere
The **Paisa Tab** is an executive-grade financial ledger and trust-accounting cockpit engineered for legal advocates and boutique law chambers. The visual environment balances high-density information architecture with authoritative fiduciary calm. It eschews generic fintech neon aesthetics in favor of a clinical, paper-accurate ledger experience.

- **Density:** Cockpit Dense (8/10) — Every pixel serves accounting precision. Compact transaction feeds, tabular financial figures, and tight metadata rows replace decorative padding.
- **Variance:** Offset Asymmetric (6/10) — 68/32 asymmetric desktop split separating high-volume chronological transaction streams from contextual cash-flow breakdowns and reconciliation summaries.
- **Motion:** Controlled Spring Physics (6/10) — Tactile button depressions, smooth micro-settling on balance updates, and staggered cascade reveals on ledger queries.

---

## 2. Color Palette & Functional Roles
All colors strictly adhere to calibrated neutral surfaces with a single restrained fiduciary accent. Saturation is kept below 80%.

| Token Name | Hex / Value | Functional Role & Application |
| :--- | :--- | :--- |
| **Canvas Background** | `#F8FAFC` | App foundation and canvas surface (Slate-50). Clean, glare-free background. |
| **Elevated Surface** | `#FFFFFF` | Primary surface for ledger tables, action headers, and modal sheets. |
| **Deep Charcoal Ink** | `#0F172A` | Primary text, high-value rupee balances, column headers. (Never `#000000`). |
| **Muted Slate** | `#64748B` | Secondary text, transaction timestamps, payment modes, and case references. |
| **Whisper Border** | `rgba(226, 232, 240, 0.85)` | 1px hairline dividers, input perimeters, and ledger row borders (`#E2E8F0`). |
| **Fiduciary Emerald** *(Primary Accent)* | `#059669` | Single primary accent (Emerald-600). Used for CTA buttons, active tabs, and Inflow markers. |
| **Controlled Outflow Crimson** | `#DC2626` | Reserved strictly for debit transactions, expenses, and pending dues warnings. |
| **Surface Subtle** | `#F1F5F9` | Hover states, filter pill backgrounds, and search inputs. |

> **Mandatory Color Constraints:**
> - No purple, violet, or electric blue glow effects.
> - Pure black (`#000000`) is strictly banned; always use Deep Charcoal Ink (`#0F172A`).
> - Zero gradient text on headline numbers or currency totals.

---

## 3. Typographic Architecture
Typography prioritizes legibility, scanning velocity, and tabular numeric alignment.

- **Display & Section Headers:** `Geist` or `Cabinet Grotesk`
  - Controlled weight-based scale (`font-weight: 600` or `700`).
  - Track-tight letter spacing (`letter-spacing: -0.025em`) to prevent sprawling headers.
- **Body & UI Controls:** `Geist` or `Satoshi`
  - Font size `14px` (`0.875rem`) to `15px` (`0.9375rem`), relaxed line-height `1.5`.
  - Max line-length capped at `65ch` for legal notes and transaction remarks.
- **Monospace Override (Financial Numbers):** `JetBrains Mono` or `Geist Mono`
  - **High-Density Rule:** All rupee values (`₹`), transaction reference IDs, dates, and percentage indicators MUST use monospace with tabular figures (`font-variant-numeric: tabular-nums`).
- **Banned Typography:**
  - `Inter` is banned for this interface.
  - Serif fonts (`Times`, `Georgia`, etc.) are strictly forbidden in this financial cockpit.

---

## 4. Component Stylings

### Action Buttons (+ Received, − Spent)
- **Primary Inflow Button (`+ Received`):** Flat Fiduciary Emerald fill (`#059669`), white text, `font-weight: 600`, `border-radius: 8px`.
- **Secondary Outflow Button (`− Spent`):** Bordered slate outline (`#E2E8F0`) with subtle crimson icon indicator, or muted red hover ring.
- **Tactile Feedback:** On `:active`, apply `transform: translateY(1px)` with zero shadow bloom. No neon outer glow.

### Balance Summary Banner
- Replaces oversized card stacks with a consolidated, linear account cockpit.
- Displays **Net Operating Balance** in bold tabular monospace (`clamp(1.75rem, 3vw, 2.25rem)`), paired immediately with inline split chips: `Inflow (₹)` and `Outflow (₹)`.
- No decorative 3D icons or generic floating cards.

### Ledger Rows & Table Design
- High-density border-top dividers (`1px solid rgba(226, 232, 240, 0.8)`) instead of individual boxed cards.
- **Columns:** Date / Time (Mono), Payee & Case Link (Charcoal/Muted), Payment Method Chip (Subtle Slate Pill), Amount (Right-aligned Mono).
- Green indicator dot for credit / Red indicator dot for debit.

### Filter & Search Toolbar
- Seamless inline search pill with clear button (`✕`), accompanied by horizontal filter chips (`All`, `Client Fees`, `Chamber Costs`, `Cash`, `UPI/Bank`).
- Active chips take dark charcoal background (`#0F172A`) with crisp white text.

### Loaders & Empty States
- **Skeletal Shimmer:** Tabular skeletons matching exact ledger row heights (`48px`). Generic circular spinning wheels are banned.
- **Empty State:** Clean, SVG-drawn ledger wireframe with explicit instruction: *"No recorded transactions for this period. Click '+ Received' or '− Spent' to begin ledger."*

---

## 5. Layout & Responsive Architecture

- **Desktop Layout (≥ 1024px):**
  - Container max-width: `1440px` with `clamp(1rem, 2vw, 2rem)` margin padding.
  - Asymmetric 2-column grid (`minmax(0, 2fr) minmax(320px, 1fr)`):
    - Left column: Chronological ledger table, filter toolbar, search bar.
    - Right column: Category expense distribution, client dues summary, reconciliation checklist.
- **Mobile Collapse (< 768px):**
  - Strict single-column stack.
  - Balance banner condenses to sticky compact header bar.
  - Table transitions smoothly into high-density swipeable ledger cards with `min-height: 44px` touch targets.
  - Absolutely zero horizontal viewport overflow (`overflow-x: hidden`).

---

## 6. Motion & Micro-Interactions

- **Spring Physics Engine:** `stiffness: 100, damping: 20` for all dialogs, slide-over panels, and filter switches.
- **Number Ticker Transition:** When switching timeframes (e.g., *Today* → *This Month*), balance amounts interpolate smoothly via tabular numeral transitions without layout jitter.
- **Hardware Acceleration:** All animations must utilize GPU-accelerated properties (`transform` and `opacity` only). Never animate `height`, `margin`, or `top`.

---

## 7. Anti-Patterns (Explicit Banned Rules)

1. **NO Emojis in Core UI:** Replace emoji icons in headers, dropdowns, and buttons with crisp SVG / FontAwesome icons (`fa-building-columns`, `fa-arrow-down-left`).
2. **NO `Inter` Font:** Use `Geist` + `JetBrains Mono`.
3. **NO Pure Black (`#000000`):** Use `#0F172A`.
4. **NO Outer Glows or Neon Gradients:** Avoid cyberpunk/crypto-wallet aesthetics.
5. **NO 3-Column Equal Floating Cards:** Banned in favor of linear summary bars or 2-column asymmetric splits.
6. **NO Invented / Fake Placeholder Metrics:** Never inject dummy marketing numbers like "99.9% accuracy" or fabricated statistics. Use actual schema variables or clear placeholders (`₹[amount]`).
7. **NO AI Copywriting Clichés:** Ban phrases like "Empower your cash flow", "Seamlessly master your expenses", or "Next-gen accounting". Use exact accounting terms: *"Client Trust Ledger"*, *"Disbursements"*, *"Chamber Outflow"*, *"Reconciliation"*.
