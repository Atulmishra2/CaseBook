# 🎨 CASEBOOK — Design Principles & Rules
# Is file ko har design/UI decision me follow karo.

═══════════════════════════════════════
1. APP CONTEXT (Ye samajh ke design karo)
═══════════════════════════════════════
- User: Ek single advocate (personal use, India-based)
- Purpose: Client tasks, earnings, expenses, cases track karna
- Environment: Zyada tar MOBILE par use hoga — court ke 
  bahar, travel me, jaldi-jaldi entries
- User Hindi-English mix (Hinglish) bolta hai — UI labels 
  simple English me rakho, jargon avoid karo
- Money har jagah Indian format me: ₹1,00,000 (lakh/crore style)

═══════════════════════════════════════
2. CORE UX LAWS (LawsOfUX.com based)
═══════════════════════════════════════

▸ HICK'S LAW — Kam choices = fast decisions
  - Har screen pe max 5-7 visible options
  - Long dropdowns ki jagah quick-pick chips use karo
  - Advanced options ko expand/collapse me chupao

▸ FITTS'S LAW — Bada target = easy tap
  - Primary action (SAVE) = full-width, bottom-fixed button
  - Minimum tap target: 44×44px (chhote buttons never)
  - Thumb-reachable zone me important actions rakho (screen ke niche)

▸ JAKOB'S LAW — Familiar patterns use karo
  - GPay/Paytm jaisa bottom navigation
  - Standard form layouts, standard date pickers
  - Naya pattern sirf tab jab zaroori ho

▸ DURABLE/DOHERTY THRESHOLD — Speed feel hona chahiye
  - Har interaction <400ms respond kare
  - Optimistic UI: SAVE pe turant update dikhao, 
    background me save karo, loading spinner avoid karo
  - Entry complete hone ka time <15 seconds target

▸ ZEIGARNIK EFFECT — Progress dikhao
  - Pending tasks hamesha visible raho (badge/count)
  - Task status badges: 🟡 Pending / 🔵 In Progress / 🟢 Completed
  - Adhoora kaam user ko yaad dilao (dashboard alert)

▸ PROGRESSIVE DISCLOSURE — Pehle simple, phir advanced
  - Basic form pehle: Amount + Category + Date = enough
  - Advanced (case link, ticket calculator, notes) 
    sirf tab dikhao jab user related cheez touch kare

▸ MILLER'S LAW — Chhunk me info dikhao
  - History ko date-wise groups me todo (Aaj / Kal / 12 Nov)
  - Numbers ko group karo: Received / Spent / Net alag-alag lines

═══════════════════════════════════════
3. LAYOUT SYSTEM
═══════════════════════════════════════

▸ MOBILE-FIRST — Desktop is secondary
  - Single column layout
  - Breakpoint: 480px se upar expand karo

▸ SPACING SCALE (sirf ye values use karo)
  - 4px, 8px, 12px, 16px, 24px, 32px, 48px
  - Card padding: 16px | Section gap: 24px | Screen edge: 16px

▸ SCREEN STRUCTURE (standard template)
  ┌─────────────────────────┐
  │ Header (title + back)   │  56px, sticky
  ├─────────────────────────┤
  │ Content (scrollable)    │  cards, lists
  ├─────────────────────────┤
  │ [Primary Action Button] │  fixed bottom
  │ Bottom Navigation       │  5 tabs max
  └─────────────────────────┘

▸ CARDS — Info ka basic unit
  - White bg, 12px radius, subtle shadow (0 2px 8px rgba(0,0,0,.08))
  - Ek card = ek concept (ek task, ek transaction, ek case)

═══════════════════════════════════════
4. TYPOGRAPHY & COLOR
═══════════════════════════════════════

▸ TYPE SCALE (max 5 sizes)
  - H1: 24px bold    (screen titles)
  - H2: 18px semibold (card titles)
  - Body: 14px regular
  - Caption: 12px gray (timestamps, notes)
  - Amount: 16-20px semibold (money hamesha bold)

▸ COLOR SYSTEM
  - Primary: app theme color (buttons, links, active states)
  - Income/Green: #16A34A   — paisa aaya
  - Expense/Red: #DC2626    — paisa gaya
  - Warning/Orange: #EA580C — pending states
  - Info/Blue: #2563EB      — in-progress
  - Neutral grays text ke liye: #111 (primary), #6B7280 (secondary)
  - Rule: Red/Green sirf money ke liye, kahin aur nahi

▸ STATUS BADGES (fixed colors, jagah jagah same)
  🟡 Pending = orange | 🔵 In Progress = blue | 🟢 Completed = green

═══════════════════════════════════════
5. FORMS & INPUT RULES (CaseBook ka sabse important part)
═══════════════════════════════════════

▸ ENTRY SPEED = #1 PRIORITY
  - Amount field sabse pehle, auto-focus, numeric keypad
  - Date hamesha default = TODAY (badalne ki zaroorat pade tab hi touch)
  - Free text minimize karo — chips, dropdowns, saved clients use karo
  - Save ke baad form reset ho, "Saved ✓" toast dikhao, 
    user turant agli entry kar sake

▸ VALIDATION
  - Inline error, field ke niche, red 12px text
  - Error tabhi dikhao jab user field chhod de ya save try kare 
    (type karte waqt error mat dikhaao)
  - Submit pe disabled state mat use karo — click karne do, 
    error dikhao

▸ SMART FEATURES (already decided)
  - Client name type karte hi case suggestion dropdown 
    (fuzzy search on case parties)
  - Ticket category pe Ticket Calculator khule 
    (vendor: Ajay=₹11, Zameer=₹12 per ₹10 ticket)
  - Received money ALWAYS counts in Virtual Account, 
    chahe task pending ho

═══════════════════════════════════════
6. NAVIGATION
═══════════════════════════════════════

▸ BOTTOM NAV (5 tabs, fixed)
  🏠 Home | 📋 Tasks | ➕ Add (center, highlighted) 
  | 📜 History | 📊 Reports

▸ RULES
  - Har screen se max 2-3 taps me kuch bhi reachable
  - Add button har jagah se accessible (center FAB style)
  - Back button hamesha kaam kare, state preserve rahe 
    (form bhara hua wapas aaye to data na ude)

═══════════════════════════════════════
7. FEEDBACK & EMPTY STATES
═══════════════════════════════════════

▸ HAR ACTION PE FEEDBACK
  - Save → "✓ Saved" toast
  - Delete → confirm dialog + undo option (5 sec)
  - Sync/save fail → retry button ke saath message

▸ EMPTY STATES (kabhi blank screen nahi)
  - Illustration/icon + ek line explanation + CTA button
  - Example: "Koi task nahi hai. Pehla task add karo →"

▸ LOADING STATES
  - Skeleton screens (gray shimmer cards), spinner nahi
  - Button pe click → immediate visual press feedback

═══════════════════════════════════════
8. ACCESSIBILITY & POLISH
═══════════════════════════════════════
- Text contrast ratio minimum 4.5:1
- Touch targets me 8px gap do taps ke beech
- Font size user phone settings respect kare (rem units)
- Error messages helpful ho: "Amount required" 
  (sirf "Error!" nahi)
- Numbers right-align karo, labels left-align
- Currency hamesha ₹ symbol ke saath

═══════════════════════════════════════
9. ANTI-PATTERNS (Ye KABHI mat karo)
═══════════════════════════════════════
❌ Ek form me 10+ fields dikhana
❌ Save ke baad poori page reload
❌ Confirmation popup har chhoti cheez pe
❌ Grey-on-grey low contrast text
❌ Hamburger menu me important features chhupana
❌ Desktop-style tables mobile pe
❌ Alert() browser dialogs — custom styled dialogs use karo
❌ User ke typed data ko navigation pe silently loss karna

═══════════════════════════════════════
10. DEFINITION OF DONE (har screen ke liye checklist)
═══════════════════════════════════════
□ Mobile pe test kiya? (375px width)
□ Entry <15 sec me ho sakti hai?
□ Empty state handle kiya?
□ Loading state handle kiya?
□ Error state handle kiya?
□ Money format ₹x,xx,xxx hai?
□ Status badge colors consistent hain?
□ Back navigation state preserve karti hai?

═══════════════════════════════════════
11. MODULAR TAB ARCHITECTURE & UNIFORM CARD WRAPPER
═══════════════════════════════════════
▸ MAIN WRAPPER CARD (Mandatory Rule)
  - Har tab ka apna ek single main wrapper card hoga jisme `.tab-card-wrapper` class lazmi hogi (e.g. `<div class="form-container tab-card-wrapper">` ya `<div class="todo-tab-container card tab-card-wrapper">`).
  - **Add New Case Style & Shadow**: Root card ki elevation, geometry aur shadow Add New Case tab (`.form-container`) se strictly match karegi:
    - `background: var(--surface-card, #ffffff) !important;`
    - `border-radius: 14px !important;`
    - `box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(15, 23, 42, 0.04) !important;`
    - `transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s !important;`
    - Hover: `box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08), 0 2px 6px rgba(15, 23, 42, 0.04) !important;`
  - **Padding Rule**: Main wrapper card par strictly 3px padding set rahegi (`.tab-card-wrapper { padding: 3px !important; }`), taaki display screen space maximally utilize ho sake bina extra margins ke.
  - **Tab-Specific Border Color**: Har tab ka `border-color` uske domain/theme se related hoga:
    - Add New Case: `#B8D3FE` (Ambient Cyan/Blue)
    - Paisa: `#10B981` (Finance Emerald)
    - Live CRUD: `#F59E0B` (Database Amber/Gold)
    - Case To-Do: `#8B5CF6` (Task Violet/Purple)
    - Upcoming Hearings: `#3B82F6` (Judicial Royal Blue)
    - Daily Cause List: `#0D9488` (Cause List Teal)
    - Calendar Scheduler: `#6366F1` (Scheduler Indigo)
    - Search Cases: `#0284C7` (Lookup Sky Blue)
    - All Cases Directory: `#64748B` (Master Slate)
  - Tab ka saara content (Header, Filters, Tables, Cards, Buttons) usi main wrapper card ke andar rahega.
  - Koi bhi loose elements card ke bahar render nahi honge.

▸ UNIFORM HEADER STRIP & TAB TITLE TYPOGRAPHY
  - Card ke top par ek structured Header Bar:
    [Icon + Title + Subtitle] ── [Action Buttons: Sync / Add / Filter / Export]
  - **Upcoming Court Hearings Typography Standard (Default Light Theme Oriented)**:
    - Tab Title (`h2`, `h3`, `.tab-title`):
      `font-size: 22px !important;`
      `font-weight: 800 !important;`
      `letter-spacing: -0.02em !important;`
      `color: #0F172A !important;` (Crisp dark slate for light theme surface)
    - Subtitle (`p`, `.section-subtitle`, `.paisa-header-sub`):
      `font-size: 13.5px !important;`
      `font-weight: 400 !important;`
      `color: #64748B !important;`

▸ TRI-COMPONENT MODULAR ASSETS
  - Har tab isolated directory me rahega:
    components/tabs/<tab-name>/
    ├── <tab-name>.html   (Clean Markup)
    ├── <tab-name>.css    (Dedicated Styles)
    └── <tab-name>.js     (Offline compatibility module)

