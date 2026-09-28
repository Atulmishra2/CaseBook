---
name: ui-ux-pro-max
description: >-
  UI/UX Pro Max Skill & Design System Guide.
  Use when designing, auditing, refactoring, or building ultra-crisp, high-contrast, modern responsive user interfaces, design tokens, CSS themes, micro-interactions, and component libraries.
---

# 🎨 UI/UX Pro Max Design & Architecture Guide

The **UI/UX Pro Max** skill equips Antigravity with high-precision UI engineering standards, visual design principles, micro-interaction guidelines, and WCAG AA/AAA accessibility enforcement.

---

## 🚀 Core Principles of UI/UX Pro Max

### 1. 🎨 Color Science & Contrast Engine
- **60-30-10 Rule:** 60% Dominant Canvas/Background, 30% Surface/Structure, 10% Vibrant Accent/CTA.
- **WCAG AA/AAA Contrast Enforcement:**
  - Standard Body Text: Minimum **4.5:1** contrast ratio against background.
  - Large Headings (18px+ bold): Minimum **3:1** contrast ratio.
  - High Contrast Mode (e.g. Legal/Medical/Finance): Aim for **7:1+** (AAA standard).
  - Dark Theme Text: Avoid `#000000` text on `#FFFFFF` or raw `#FFFFFF` on pitch `#000000`. Use soft slates (`#F8FAFC`, `#E2E8F0`) and deep navies/charcoals (`#0F172A`, `#1E293B`).
- **Semantic Palette Architecture:**
  - `--surface-app`: Main background canvas.
  - `--surface-card`: Cards, modals, elevated surfaces.
  - `--border-default`: Subtle divider borders (`1px solid #E2E8F0` or `1.5px solid #A7F3D0`).
  - `--text-primary`: Primary headings & titles.
  - `--text-secondary`: Body text & labels.
  - `--text-muted`: Helper text & captions.
  - `--accent-primary`: Brand action color (buttons, active states).
  - `--accent-glow`: Translucent focus ring (`rgba(..., 0.25)`).

---

### 2. 📐 Typography & Hierarchy Scale
- **Font Selection Pairings:**
  - **Modern SaaS/Enterprise:** `Plus Jakarta Sans` (Headings) + `Inter` (Body & Inputs)
  - **Legal / Prestige:** `Cinzel` / `Playfair Display` (Brand Title) + `Plus Jakarta Sans` (UI)
  - **Technical / Code:** `Fira Code` / `JetBrains Mono` (Monospace IDs & Logs)
- **Typographic Scale:**
  - `Display / Hero Title`: 28px – 36px | `font-weight: 800` | `letter-spacing: -0.02em`
  - `Section Header (H2/H3)`: 18px – 22px | `font-weight: 700` | `letter-spacing: -0.01em`
  - `Card / Widget Title`: 15px – 16px | `font-weight: 700`
  - `Body Standard`: 13.5px – 14px | `font-weight: 400` / `500` | `line-height: 1.5`
  - `Form Labels`: 12px – 12.5px | `font-weight: 700` | `text-transform: uppercase` | `letter-spacing: 0.04em`
  - `Badges & Chips`: 11px – 12px | `font-weight: 600`

---

### 3. 🧩 Component State Architecture
Every interactive element MUST handle all 6 interactive lifecycle states:
1. **Default:** Clean, readable, balanced surface & borders.
2. **Hover:** Subtle elevation bump, accent border highlight, or `-4%` lightness shift.
3. **Active/Pressed:** Scale down (`transform: scale(0.98)`), inset shadow or active accent fill.
4. **Focus-Visible:** Explicit 3px outline glow ring (`box-shadow: 0 0 0 3.5px var(--accent-glow); outline: none`).
5. **Disabled:** Reduced opacity (`opacity: 0.5`), `cursor: not-allowed`, no hover actions.
6. **Loading:** Spinner replacement or skeleton pulse animation (`@keyframes pulse`).

---

### 4. 📱 Responsive & Touch Spacing Systems
- **8pt Grid Discipline:** All margins, paddings, gap measurements MUST be multiples of 4px or 8px (`4px`, `8px`, `12px`, `16px`, `24px`, `32px`).
- **Touch Targets:** Minimum touch hit area of **44px x 44px** for mobile/tablet buttons & icons.
- **Mobile Stack Scoping:** Form grids (`2-col`, `3-col`) collapse smoothly to `1fr` on screens below `768px`.

---

### 5. 🔮 Theme Remapping & Multi-Theme Engine
- Utilize CSS custom properties (`var(--...)`) bound to `html[data-theme="..."]` or `html.theme-...`.
- When switching themes:
  1. Update `data-theme` attribute on `document.documentElement`.
  2. Maintain contrast ratios across light, dark, emerald, azure, and executive themes.
  3. Ensure active inputs remain 100% crisp with high contrast background and text.

---

## 🛠️ Usage Quick Reference

When the user asks for UI/UX improvements, redesigns, theme re-mapping, or component creation:
1. Audit contrast ratios & font hierarchy.
2. Enforce explicit label & input focus rings.
3. Apply smooth micro-transitions (`transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1)`).
4. Verify dynamic mobile responsiveness.
