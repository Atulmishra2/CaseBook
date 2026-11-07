---
name: casebook-ui-strict-rules
description: Strict guidelines for UI, design, and icons in the CaseBook project.
trigger: always_on
---

# CaseBook Strict Project Guidelines

When writing code or suggesting changes for this project, you **MUST** adhere to the following strict rules:

1. **Uniform Design** 
   - All newly created UI components must perfectly match the existing design system. 
   - Re-use existing CSS classes, variables, margins, paddings, and card structures rather than inventing new ones.
   - Maintain the established light/dark theme structure.

2. **Lucide Icons Only** 
   - You must exclusively use **Lucide** icons (e.g., `<i data-lucide="home"></i>` or `<svg class="lucide lucide-home">...</svg>`) for all iconography. 
   - **DO NOT** use other icon sets, Material Icons, Heroicons, or Emojis for UI graphics.

3. **Strict Tab Isolation & Zero Cross-Tab Side Effects**
   - Any styles, modifications, or improvements for a specific tab **MUST** be strictly scoped to that tab's container or scope selector (e.g., `:is(#calendar, [data-calendar-scope])`, `:is(#todo, [data-todo-scope])`).
   - Never write broad, un-scoped global selectors that bleed into other views.
   - Improving or redesigning one tab must **NEVER** alter, break, or regress the layout, styling, or behavior of any other tab.
