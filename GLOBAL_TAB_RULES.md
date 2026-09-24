# CaseBook Global Tab Rules & Component Architecture Specification

> **Status:** Active & Mandatory  
> **Target:** CaseBook Modular System (GitHub Pages + Offline `file:///` Compatible)  
> **Global CSS Asset:** [`components/global-rules.css`](file:///d:/caseBook/components/global-rules.css)

---

## 1. Uniform Root Card Wrapper (`.tab-card-wrapper`)

Every modular tab must have exactly one root card container enclosing all tab elements (headers, action bars, tables, filters, forms). No floating loose elements are permitted outside this wrapper.

### Technical Specification:
- **Class:** `.tab-card-wrapper`
- **Surface Background:** Pure crisp white (`var(--surface-card, #ffffff) !important`)
- **Border Radius:** `14px !important` (Identical to Add New Case `.form-container`)
- **Elevation Shadow:** `box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(15, 23, 42, 0.04) !important;`
- **Hover Elevation:** `box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08), 0 2px 6px rgba(15, 23, 42, 0.04) !important;`
- **Strict Padding:** `3px !important;` (Maximizes screen real estate on mobile & desktop)
- **Container Sizing:** `max-width: 1380px !important; margin: 0 auto 24px auto !important;`

```html
<!-- Example of Compliant Tab Root Markup -->
<div class="form-container tab-card-wrapper">
    <!-- All header, toolbars, tables, and buttons stay strictly inside -->
</div>
```

---

## 2. Domain-Specific Themed `borderColor` Mapping

Each tab has its dedicated `border-color` derived from its functional identity:

| Tab Name | Tab ID | Theme Identity | Border Color | Hex Code |
| :--- | :--- | :--- | :--- | :--- |
| **Add New Case** | `#add` | Ambient Soft Legal Cyan | Cyan / Soft Blue | `#B8D3FE` |
| **Paisa Ledger** | `#paisa` | Advocate Finance & Accounts | Financial Emerald | `#10B981` |
| **Live CRUD** | `#livecrud` | Database Manager ⚡ | Lightning Amber / Gold | `#F59E0B` |
| **Case To-Do** | `#todo` | Tasks & Hearing Deadlines 📝 | Task Violet / Purple | `#8B5CF6` |
| **Upcoming Hearings** | `#upcoming` | Judicial Docket ⚖️ | Royal Judicial Blue | `#3B82F6` |
| **Daily Cause List** | `#causelist` | Daily Listings 📅 | Cause List Teal | `#0D9488` |
| **Calendar Scheduler** | `#calendar` | Monthly Schedule 🗓️ | Scheduler Indigo | `#6366F1` |
| **Search / My Cases** | `#search` | Registry Lookup 🔍 | Registry Sky Blue | `#0284C7` |
| **All Cases Master** | `#all` | Master Register 📂 | Master Register Slate | `#64748B` |
| **Update Case** | `#update` | Modify Record ✏️ | Edit Blue | `#2563EB` |
| **Hearing Forward** | `#hearing` | Next Hearing Date 🔄 | Hearing Purple | `#7C3AED` |
| **Manage Courts** | `#courts` | Judicial Pillars 🏛️ | Courts Bronze / Amber | `#B45309` |
| **Court Helpers** | `#helpers` | Staff Directory 🪪 | Directory Orange | `#EA580C` |
| **Undated Cases** | `#undated` | Unassigned Matters ⚠️ | Warning Amber | `#D97706` |
| **Disposed Cases** | `#disposed` | Concluded Files 📁 | Concluded Slate | `#475569` |

---

## 3. Unified Tab Title Typography (Upcoming Court Hearings Standard)

All modular tabs follow the **Upcoming Court Hearings** typography standard, with light-theme oriented high contrast:

### Tab Heading (`h2`, `h3`, `.tab-title`):
- **Font Size:** `22px !important;`
- **Font Weight:** `800 !important;` (Extra Bold)
- **Letter Spacing:** `-0.02em !important;`
- **Line Height:** `1.25 !important;`
- **Color (Default Light Theme):** `#0F172A !important;` (Deep judicial slate navy)
- **Margin:** `0 0 4px 0 !important;`

### Tab Subtitle (`p`, `.section-subtitle`, `.paisa-header-sub`):
- **Font Size:** `13.5px !important;`
- **Font Weight:** `400 !important;`
- **Color (Default Light Theme):** `#64748B !important;` (Muted slate gray)
- **Margin:** `0 !important;`

### Contrast & Dark Theme Safeguards:
- Dark banners (such as `.upcoming-hero-banner`) preserve `#ffffff` and `#cbd5e1` text.
- Dark theme (`html.theme-midnight`, `html[data-theme="dark"]`) automatically maps headings to `#F8FAFC` and subtitles to `#94A3B8`.

---

## 4. Tri-Asset Modular File Structure

Every tab resides in its own isolated directory:
```
components/tabs/<tab-name>/
├── <tab-name>.html   (Clean markup & modals)
├── <tab-name>.css    (Tab-specific custom layout/rules)
└── <tab-name>.js     (Dual-engine offline window.__casebook_tabs registration)
```

1. **HTML:** `<div id="<tab-name>" class="tab" data-tab-src="components/tabs/<tab-name>/<tab-name>.html"></div>` in `admin.html`.
2. **CSS:** Linked in `<head>` via `<link rel="stylesheet" href="components/tabs/<tab-name>/<tab-name>.css">`.
3. **JS Module:** Linked before `admin.js` via `<script src="components/tabs/<tab-name>/<tab-name>.js" defer></script>`.
4. **Generator:** Auto-generate offline JS module via:
   ```bash
   python scripts/generate_tab_js.py <tab-name>
   ```
