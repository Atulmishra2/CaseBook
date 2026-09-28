text_icon_mapping_css = '''

/* ==============================================================================
   TEXT & ICON COLOR RE-MAPPING SYSTEM (GLOBAL DYNAMIC CONTRAST)
   ============================================================================== */

:root, html {
  --cb-text-main: #0F172A;
  --cb-text-secondary: #334155;
  --cb-text-muted: #64748B;
  --cb-icon-main: #4F46E5;
  --cb-icon-accent: #6366F1;
  --cb-icon-muted: #94A3B8;
}

/* 1. Pure Luminary Light Theme */
html.theme-light {
  --cb-text-main: #0F172A !important;
  --cb-text-secondary: #334155 !important;
  --cb-text-muted: #64748B !important;
  --cb-icon-main: #4F46E5 !important;
  --cb-icon-accent: #6366F1 !important;
  --cb-icon-muted: #94A3B8 !important;
}

/* 2. Cambridge Forest Theme */
html.theme-forest {
  --cb-text-main: #0F172A !important;
  --cb-text-secondary: #334155 !important;
  --cb-text-muted: #64748B !important;
  --cb-icon-main: #059669 !important;
  --cb-icon-accent: #047857 !important;
  --cb-icon-muted: #94A3B8 !important;
}

/* 3. CaseBook Azure Theme */
html.theme-azure {
  --cb-text-main: #0F172A !important;
  --cb-text-secondary: #334155 !important;
  --cb-text-muted: #64748B !important;
  --cb-icon-main: #0284C7 !important;
  --cb-icon-accent: #0EA5E9 !important;
  --cb-icon-muted: #94A3B8 !important;
}

/* 4. Chambers Executive Theme */
html.theme-executive {
  --cb-text-main: #0F172A !important;
  --cb-text-secondary: #334155 !important;
  --cb-text-muted: #64748B !important;
  --cb-icon-main: #D97706 !important;
  --cb-icon-accent: #B45309 !important;
  --cb-icon-muted: #94A3B8 !important;
}

/* 5. Judicial Midnight Theme (High Contrast Dark) */
html.theme-midnight {
  --cb-text-main: #F8FAFC !important;
  --cb-text-secondary: #CBD5E1 !important;
  --cb-text-muted: #94A3B8 !important;
  --cb-icon-main: #38BDF8 !important;
  --cb-icon-accent: #60A5FA !important;
  --cb-icon-muted: #64748B !important;
}

/* 6. CaseBook Mint Theme */
html.theme-mint {
  --cb-text-main: #0F172A !important;
  --cb-text-secondary: #334155 !important;
  --cb-text-muted: #64748B !important;
  --cb-icon-main: #10B981 !important;
  --cb-icon-accent: #059669 !important;
  --cb-icon-muted: #94A3B8 !important;
}

/* 7. Modern Corporate Theme */
html.theme-corporate {
  --cb-text-main: #0F172A !important;
  --cb-text-secondary: #334155 !important;
  --cb-text-muted: #64748B !important;
  --cb-icon-main: #0D9488 !important;
  --cb-icon-accent: #0F766E !important;
  --cb-icon-muted: #94A3B8 !important;
}

/* 8. Classic Chambers Theme */
html.theme-classic {
  --cb-text-main: #1E293B !important;
  --cb-text-secondary: #334155 !important;
  --cb-text-muted: #64748B !important;
  --cb-icon-main: #C5A880 !important;
  --cb-icon-accent: #A8895F !important;
  --cb-icon-muted: #94A3B8 !important;
}

/* Apply Re-mapped Text & Icon Variables across elements */
h1, h2, h3, h4, h5, h6,
.hero-greeting,
.case-card-name,
.court-card-name,
.section-title-box h3 {
  color: var(--cb-text-main) !important;
}

p, span, label, td,
.hero-subtext,
.section-subtitle,
.form-group label {
  color: var(--cb-text-secondary);
}

.text-muted,
.subtext,
.case-subtext {
  color: var(--cb-text-muted) !important;
}

/* Icons Dynamic Mapping */
i.fa-solid,
i.fa-brands,
i.fa-regular,
.nav-icon,
.section-icon-badge i,
.search-icon {
  color: var(--cb-icon-main);
}

.hero-emblem-badge {
  background: var(--cb-icon-main) !important;
  color: #FFFFFF !important;
}
'''

with open('d:/caseBook/components/global-rules.css', 'a', encoding='utf-8') as f:
    f.write(text_icon_mapping_css)

print("Appended Text & Icon Color Re-mapping Variables to components/global-rules.css!")
