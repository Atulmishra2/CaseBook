# CaseBook Master Design System (DESIGN.md)

> [!IMPORTANT]
> **MANDATORY PRE-EXECUTION INSTRUCTION:**
> Kisi bhi task ya UI component par kaam shuru karne se pehle is `DESIGN.md` ko **read karna anivarya (mandatory)** hai.
> Agar koi UI component (jaise docket rows, action buttons, filter chips, sort headers) multiple tabs me exist karta hai (e.g. Daily Cause List, Upcoming List, Calendar Scheduler), to un sabhi me **100% identical styling, tokens, aur behavior** follow karna compulsory hai. Ek tab me change karke doosre ko purane ya alag design par nahi chhoda ja sakta.

---

## 1. Universal Table Action Buttons Standard (`.act`)

Jab bhi kisi docket row ya table drawer me action buttons render honge (`Update Next Date`, `Open Dossier`, `Call Client`, `WhatsApp`, `Pass-Over Slip`), unhe strict uniformity ke sath nimn token architecture follow karna hoga:

### A. Strict Icon & Text Synchronization
```css
.act svg {
  color: inherit !important;
  stroke: currentColor;
  flex-shrink: 0;
}
```
* **Golden Rule:** SVG icon ka color kabhi bhi button label ke text color se decouple nahi hona chahiye. Icon hamesha text ka color inherit karega.

---

### B. Button Types & Token Mappings

| Button | Class | Light Mode | Dark Mode (`[data-theme="dark"]`) | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Update Next Date** | `.act.primary` | Gold brand bg (`var(--action-bg)`), White text (`#ffffff`), subtle shadow | Solid Brand Gold (`#E3B341`), Deep Ink text & icon (`#1C1917`), Gold border (`#EDC752`), Luminous Glow (`var(--btn-glow-shadow)`) | High-priority primary action button |
| **Open Dossier** | `.act-dossier` / default `.act` | Surface white (`#ffffff`), Border default (`#cbd5e1`), Dark text (`#0f172a`) | Surface dark slate (`#1e293b`), Border default (`#475569`), Foreground text (`#f8fafc`) | Neutral secondary surface button |
| **Call Client** | `.act-call` | Blue text/icon (`var(--feedback-info)`), Soft blue tint bg (`var(--feedback-info-soft)`) | Light Blue text/icon (`#60A5FA`), 14% dark blue tint bg (`rgba(96, 165, 250, 0.14)`) | Communication action |
| **WhatsApp** | `.act-whatsapp` | Green text/icon (`var(--feedback-success)`), Soft green tint bg (`var(--feedback-success-soft)`) | Light Green text/icon (`#4ADE80`), 14% dark green tint bg (`rgba(74, 222, 128, 0.14)`) | Instant messaging action |
| **Pass-Over Slip** | `.act-passover` | Orange text/icon (`var(--feedback-warning)`), Soft orange tint bg (`var(--feedback-warning-soft)`) | Light Orange text/icon (`#FB923C`), 14% dark orange tint bg (`rgba(251, 146, 60, 0.14)`) | Court slip action |

---

### C. Prohibited Dark Mode Patterns (Never Do This)
1. **NO Static Light Tokens:**
   - Kabhi bhi `--info-soft` (`#EFF6FF`) ya `--success-soft` (`#ECFDF5`) buttons me use nahi karna, kyunki yeh light mode ke fixed colors hain aur dark mode me bright white pastel dikhte hain. Hamesha **`--feedback-info-soft`**, **`--feedback-success-soft`**, aur **`--feedback-warning-soft`** use karna hai jo dark mode me automatically switch hote hain.
2. **NO Generic Dark Flattening:**
   - Dark mode me `.act:not(.primary)` ko generic `#1e293b` par flatten nahi karna. Call, WhatsApp, aur Pass-Over buttons ko exclude karna compulsory hai:
     ```css
     /* CORRECT */
     [data-theme="dark"] .act:not(.primary):not(.act-call):not(.act-whatsapp):not(.act-passover) {
       background-color: var(--bg-surface, #1e293b);
       border-color: var(--border-default, #475569);
       color: var(--fg-primary, #f8fafc);
     }
     ```

---

## 2. Multi-Tab Parity Rule (Teeno Tables ek saman)

In teeno tabs me table layout, sorting header, docket expansion, aur action buttons ka style **100% synchronized** hona chahiye:
1. **Daily Cause List (`components/tabs/causelist/tab-causelist.css`)**
2. **Upcoming Hearings (`components/tabs/upcoming/tab-upcoming.css`)**
3. **Calendar Scheduler (`components/tabs/calendar/tab-calendar.css`)**

Agar kisi ek table me koi refinement ya bug fix kiya jata hai, to wo automatically baki dono tables me bhi replicate hona chahiye taaki visual mismatch zero rahe.

---

## 3. Core Project Guidelines

1. **Uniform Design:** Sabhi naye UI components existing Advocate Charcoal & Gold design system ke mutabik honge. Re-use existing tokens.
2. **Lucide Icons Only:** Exclusively Lucide icons use karne hain (`<i data-lucide="..."></i>` / `<svg class="lucide ...">`). No FontAwesome, Material Icons, ya Emojis for UI graphics.
3. **Strict Tab Isolation:** CSS hamesha tab ke specific scope me bandhi honi chahiye (e.g. `:is(#causelist, [data-causelist-scope])`, `:is(#upcoming, [data-upcoming-scope])`, `:is(#calendar, [data-calendar-scope])`). Zero cross-tab bleeding.
4. **Zero Hard-Coded Colors:** Hamesha CSS variables (`var(--...)`) use karne hain.
5. **Mobile-First Responsive:** 375px se lekar desktop tak fluid responsiveness maintain honi chahiye.
6. **Do Not Copy Old Design, Pattern:** Purane ya deprecated legacy UI design, hard-coded gradients, ya obsolete patterns ko copy ya resurrect nahi karna. Hamesha modern token-based design architecture hi follow karni hai.
