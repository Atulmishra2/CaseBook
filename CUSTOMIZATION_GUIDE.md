# 🛠️ CaseBook Modular — Complete Customization & Redesign Guide

> **Author**: Atul Kumar Mishra — CaseBook Legal CMS  
> **Tech Stack**: Vanilla ES6+, CSS Design Tokens (UI/UX Pro Max), HTML5, Supabase Cloud DB  
> **Local Server**: `http://localhost:3000`

Yeh guide aapke CaseBook project me kisi bhi UI block, tab, ya component ko customize aur redesign karne ka step-by-step handbook hai.

---

## 📑 Table of Contents
1. [Architecture & File Mapping (Kaun Si Cheez Kahan Hai)](#1-architecture--file-mapping)
2. [Global Design System & Tokens (Colors & Typography)](#2-global-design-system--tokens)
3. [Universal 4-Step Customization Workflow](#3-universal-4-step-customization-workflow)
4. [Popular Customization Recipes (Ready-to-Use Snippets)](#4-popular-customization-recipes)
   - [Recipe A: Modern Search Bar](#recipe-a-modern-search-bar)
   - [Recipe B: KPI Stat Counter Card](#recipe-b-kpi-stat-counter-card)
   - [Recipe C: Data Table & Action Buttons](#recipe-c-data-table--action-buttons)
   - [Recipe D: Filter Chips & Segmented Controls](#recipe-d-filter-chips--segmented-controls)
   - [Recipe E: Modal / Drawer Dialogs](#recipe-e-modal--drawer-dialogs)
5. [Responsive Design Rules (Mobile & Desktop)](#5-responsive-design-rules)
6. [Best Practices (Duplicate CSS Se Bachne Ke Rules)](#6-best-practices)

---

## 1. Architecture & File Mapping

CaseBook ek **Component-Driven Modular Architecture** par bana hai. Har feature tab ke paas apna dedicated folder hota hai:

```
components/tabs/
├── [tab-name]/
│   ├── [tab-name].html    <-- Standalone clean HTML template
│   ├── [tab-name].css     <-- Tab-specific styling
│   └── [tab-name].js      <-- Dynamic HTML loader & Tab Controller
```

### 📌 Quick Reference Table:

| Tab Name | Tab ID | HTML File | CSS File | JS Controller |
|---|---|---|---|---|
| **Home Dashboard** | `home` | `components/tabs/home/home.html` | `home.css` | `home.js` |
| **My Cases / Search** | `search` | `components/tabs/search/search.html` | `search.css` | `search.js` |
| **Daily Cause List** | `causelist` | `components/tabs/causelist/causelist.html` | `causelist.css` | `causelist.js` |
| **Upcoming Hearings** | `upcoming` | `components/tabs/upcoming/upcoming.html` | `upcoming.css` | `upcoming.js` |
| **To-Do & Tasks** | `todo` | `components/tabs/todo/todo.html` | `todo.css` | `todo.js` |
| **Paisa (Finances)** | `paisa` | `components/tabs/paisa/paisa.html` | `paisa.css` | `paisa.js` |
| **All Cases Register** | `all` | `components/tabs/all/all.html` | `all.css` | `all.js` |
| **Calendar Scheduler** | `calendar` | `components/tabs/calendar/calendar.html` | `calendar.css` | `calendar.js` |
| **Add New Case** | `add` | `components/tabs/add/add.html` | `add.css` | `add.js` |
| **Update Case** | `update` | `components/tabs/update/update.html` | `update.css` | `update.js` |
| **Hearing Updater** | `hearing` | `components/tabs/hearing/hearing.html` | `hearing.css` | `hearing.js` |
| **Case Cards** | `cards` | `components/tabs/cards/cards.html` | `cards.css` | `cards.js` |
| **Undated Cases** | `undated` | `components/tabs/undated/undated.html` | `undated.css` | `undated.js` |
| **Court Helpers** | `helpers` | `components/tabs/helpers/helpers.html` | `helpers.css` | `helpers.js` |
| **Manage Courts** | `courts` | `components/tabs/courts/courts.html` | `courts.css` | `courts.js` |
| **About Page** | `about` | `components/tabs/about/about.html` | `about.css` | `about.js` |

---

## 2. Global Design System & Tokens

Kabhi bhi CSS me hardcoded `#ffffff` ya `#000000` mat likhiye. Hamesha **Design Tokens (Variables)** use karein taaki **Light Mode** aur **Dark Mode** dono me UI pixel-perfect dikhe:

### 🎨 Core Color Tokens (`components/global-rules.css`)
| Variable | Light Theme | Dark Theme (Midnight) | Description |
|---|---|---|---|
| `--cb-bg-body` | `#F8FAFC` (Canvas soft grey) | `#0B132B` | Screen ka background |
| `--cb-surface` | `#FFFFFF` (Pure white card) | `#1C2541` | Card, container, surface |
| `--cb-surface-alt` | `#F1F5F9` (Subtle grey) | `#162035` | Secondary fill, inputs |
| `--cb-border` | `#E2E8F0` | `#334155` | Card borders, dividers |
| `--cb-text-main` | `#0F172A` (Slate dark) | `#F8FAFC` | Main headings, body text |
| `--cb-text-muted` | `#64748B` | `#94A3B8` | Subtitles, labels |
| `--cb-btn-primary` | `#2A7B77` (Deep Teal) | `#00D2B4` | Main CTA button |
| `--cb-btn-primary-hover`| `#1F5C59` | `#00B89E` | Primary hover state |
| `--cb-btn-danger` | `#EF4444` (Crimson) | `#F87171` | Delete / Urgent action |

### 🏷️ Case Type Badges:
- **Civil**: `background: #E0F2FE; color: #0369A1;`
- **Criminal / State**: `background: #FEE2E2; color: #B91C1C;`
- **Revenue**: `background: #FEF3C7; color: #B45309;`
- **Family**: `background: #F3E8FF; color: #6B21A8;`
- **Upcoming**: `background: #DCFCE7; color: #15803D;`

---

## 3. Universal 4-Step Customization Workflow

```
[1. Inspect Element] ➔ [2. Edit HTML Template] ➔ [3. Style in Tab CSS] ➔ [4. Live Verification]
```

### 🔹 Step 1: Inspect Element (Identify Target Block)
1. Browser me [http://localhost:3000](http://localhost:3000) open karein.
2. Jis block ko redesign karna hai uspar **Right-Click ➔ Inspect (`Ctrl + Shift + C`)** karein.
3. Us block ki **ID** aur **Class names** note karein (jaise `#searchFilterInput`, `.header-card`, `.kpi-grid`).

### 🔹 Step 2: HTML Structure Update Karein
> [!IMPORTANT]
> CaseBook dynamic tabs architecture me `tab.html` aur `tab.js` sync me rehne chahiye:
> 1. `components/tabs/[tab]/[tab].html` me DOM structure edit karein.
> 2. Wahi HTML content `components/tabs/[tab]/[tab].js` ke `window.__casebook_tabs['tab'] = \`...\`;` template me paste karein.

### 🔹 Step 3: Dedicated CSS Sheet me Styling Karein
1. Direct us tab ki CSS file open karein: `components/tabs/[tab]/[tab].css`.
2. Existing rules ko override ya new classes add karein.
3. Modern properties use karein: `border-radius`, `box-shadow`, `transition`, `flexbox/grid`.

### 🔹 Step 4: Browser me Live Verify Karein
1. Browser me `Ctrl + Shift + R` (Hard Reload) karein taaki purani CSS cache na ho.
2. Mobile view (`F12` ➔ Toggle Device Toolbar) par 375px aur 768px check karein.
3. Dark mode switch karke contrast test karein.

---

## 4. Popular Customization Recipes

Yahan common blocks ke clean, ready-to-use snippets diye gaye hain:

### Recipe A: Modern Search Bar

#### 1. HTML:
```html
<div class="modern-search-box">
  <i class="fa-solid fa-magnifying-glass search-icon"></i>
  <input 
    type="text" 
    id="customSearchInput" 
    class="modern-search-input" 
    placeholder="Search case, party, client..." 
    autocomplete="off"
  />
  <button type="button" class="search-clear-btn" id="clearBtn" title="Clear">
    <i class="fa-solid fa-xmark"></i>
  </button>
</div>
```

#### 2. CSS:
```css
.modern-search-box {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 480px;
}

.modern-search-box .search-icon {
  position: absolute;
  left: 14px;
  color: var(--cb-text-muted, #64748b);
  font-size: 14px;
  pointer-events: none;
}

.modern-search-input {
  width: 100%;
  height: 42px;
  padding: 0 38px 0 42px;
  background: var(--cb-surface, #ffffff);
  border: 1.5px solid var(--cb-border, #e2e8f0);
  border-radius: 12px;
  font-size: 13.5px;
  color: var(--cb-text-main, #0f172a);
  transition: all 0.2s ease;
}

.modern-search-input:focus {
  outline: none;
  border-color: var(--cb-btn-primary, #2a7b77);
  box-shadow: 0 0 0 3px rgba(42, 123, 119, 0.18);
}

.search-clear-btn {
  position: absolute;
  right: 10px;
  width: 22px;
  height: 22px;
  border: none;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-clear-btn:hover {
  background: #f1f5f9;
  color: #0f172a;
}
```

---

### Recipe B: KPI Stat Counter Card

#### 1. HTML:
```html
<div class="kpi-metric-card">
  <div class="kpi-icon-wrap civil">
    <i class="fa-solid fa-scale-balanced"></i>
  </div>
  <div class="kpi-info-wrap">
    <span class="kpi-num" id="totalCivilCases">142</span>
    <span class="kpi-title">Civil Matters</span>
  </div>
  <span class="kpi-trend-pill positive">+12%</span>
</div>
```

#### 2. CSS:
```css
.kpi-metric-card {
  background: var(--cb-surface, #ffffff);
  border: 1px solid var(--cb-border, #e2e8f0);
  border-radius: 14px;
  padding: 16px 18px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.kpi-metric-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.kpi-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}

.kpi-icon-wrap.civil {
  background: #e0f2fe;
  color: #0284c7;
}

.kpi-info-wrap {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.kpi-num {
  font-size: 24px;
  font-weight: 800;
  color: var(--cb-text-main, #0f172a);
  line-height: 1.1;
}

.kpi-title {
  font-size: 12px;
  color: var(--cb-text-muted, #64748b);
  margin-top: 2px;
}

.kpi-trend-pill {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 9999px;
  background: #dcfce7;
  color: #166534;
}
```

---

### Recipe C: Data Table & Action Buttons

#### 1. HTML:
```html
<div class="custom-table-container">
  <table class="custom-data-table">
    <thead>
      <tr>
        <th>Case No</th>
        <th>Parties</th>
        <th>Next Hearing</th>
        <th class="text-right">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="font-bold">OS/120/2026</td>
        <td>Ramesh vs Suresh</td>
        <td><span class="hearing-pill">14 Oct 2026</span></td>
        <td class="text-right">
          <button class="tbl-btn view" title="View Details"><i class="fa-solid fa-eye"></i></button>
          <button class="tbl-btn edit" title="Edit Case"><i class="fa-solid fa-pen"></i></button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

#### 2. CSS:
```css
.custom-table-container {
  width: 100%;
  overflow-x: auto;
  border: 1px solid var(--cb-border, #e2e8f0);
  border-radius: 14px;
  background: var(--cb-surface, #ffffff);
}

.custom-data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13.5px;
}

.custom-data-table th {
  background: var(--cb-surface-alt, #f8fafc);
  padding: 12px 16px;
  font-weight: 700;
  color: var(--cb-text-muted, #64748b);
  border-bottom: 1px solid var(--cb-border, #e2e8f0);
  text-align: left;
}

.custom-data-table td {
  padding: 14px 16px;
  border-bottom: 1px solid var(--cb-border, #f1f5f9);
  color: var(--cb-text-main, #0f172a);
}

.custom-data-table tbody tr:hover {
  background: rgba(42, 123, 119, 0.04);
}

.hearing-pill {
  display: inline-flex;
  padding: 4px 10px;
  border-radius: 6px;
  background: #f1f5f9;
  font-size: 12px;
  font-weight: 600;
  color: #334155;
}

.tbl-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid var(--cb-border, #e2e8f0);
  background: var(--cb-surface, #ffffff);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #475569;
  transition: all 0.15s ease;
}

.tbl-btn:hover {
  background: #f8fafc;
  color: var(--cb-btn-primary, #2a7b77);
  border-color: var(--cb-btn-primary, #2a7b77);
}
```

---

### Recipe D: Filter Chips & Segmented Controls

```css
.segmented-filter-bar {
  display: inline-flex;
  background: var(--cb-surface-alt, #f1f5f9);
  padding: 4px;
  border-radius: 10px;
  gap: 4px;
}

.filter-chip-btn {
  border: none;
  background: transparent;
  padding: 6px 14px;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--cb-text-muted, #64748b);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-chip-btn.active,
.filter-chip-btn:hover {
  background: var(--cb-surface, #ffffff);
  color: var(--cb-text-main, #0f172a);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}
```

---

## 5. Responsive Design Rules

Har component ko mobile-friendly rakhne ke liye yeh standard breakpoints use karein:

```css
/* Desktop default: multi-column, wide paddings */
.my-card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

/* Tablet (<= 1024px): 2 columns */
@media (max-width: 1024px) {
  .my-card-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}

/* Mobile (<= 640px): 1 column, stacked buttons */
@media (max-width: 640px) {
  .my-card-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .action-buttons-row {
    flex-direction: column;
    width: 100%;
  }

  .action-buttons-row button {
    width: 100%;
  }
}
```

---

## 6. Best Practices (Duplicate CSS Se Bachne Ke Rules)

1. **Specific CSS Usi Tab Ki File Me Likhein**:
   - Search tab ka CSS sirf `components/tabs/search/search.css` me jayega.
   - Home tab ka CSS sirf `components/tabs/home/home.css` me jayega.
   - Dusre tab ke styles ko copy-paste karke dusri file me mat daliye.

2. **Global Rules Ko Shared Sheets Me Rakhein**:
   - Jo cheez **har tab** me use hoti hai (jaise Primary Button, Header Bar, Main Sidenav), use `components/global-rules.css` ya `styles/components/buttons.css` me rakhein.

3. **CSS Class Naming Convention**:
   - Tab-prefix use karein taaki collision na ho:
     - `.search-...` (Search tab)
     - `.todo-...` (Todo tab)
     - `.paisa-...` (Paisa tab)
     - `.kpi-...` (Dashboard counters)

4. **Brace Balance Check**:
   - Edit karne ke baad ensure karein ki opening `{` aur closing `}` barabar hon.
   - Check command:
     ```powershell
     python -c "c=open('path_to_file.css').read(); print('Braces match:', c.count('{') == c.count('}'))"
     ```

---

Yeh guide aapke workspace me [CUSTOMIZATION_GUIDE.md](file:///d:/caseBook-modular/CUSTOMIZATION_GUIDE.md) par hamesha available hai!
