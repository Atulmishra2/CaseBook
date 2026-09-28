theme_mapping_css = '''

/* ==============================================================================
   DYNAMIC THEME COLOR RE-MAPPING SYSTEM FOR ALL 10 COMPONENT GROUPS
   Re-maps theme variables across:
   1. Nav & Top Bar
   2. SideNav & Navigation Drawer
   3. Buttons & Action Controls
   4. Form Controls & Inputs
   5. Tables & Data Registers
   6. Status Badges & Chips
   7. Hero Cards & KPI Containers
   8. Filters & Search Input Bars
   9. Modals & Dialog Windows
   10. Empty States & Toast Banners
   ============================================================================== */

:root,
html {
  --cb-nav-bg: linear-gradient(135deg, #064E3B 0%, #04392B 100%);
  --cb-nav-text: #FFFFFF;
  --cb-sidenav-bg: #FFFFFF;
  --cb-sidenav-text: #334155;
  --cb-sidenav-active-bg: #ECFDF5;
  --cb-sidenav-active-text: #059669;
  
  --cb-card-bg: #FFFFFF;
  --cb-card-border: #E2E8F0;
  --cb-card-shadow: 0 2px 8px rgba(15, 23, 42, 0.05);
  
  --cb-primary: #4F46E5;
  --cb-primary-hover: #4338CA;
  --cb-primary-text: #FFFFFF;
  
  --cb-input-bg: #FFFFFF;
  --cb-input-border: #CBD5E1;
  --cb-input-text: #0F172A;
  --cb-input-focus-border: #6366F1;
  --cb-input-focus-ring: rgba(99, 102, 241, 0.18);
  
  --cb-table-header-bg: #F8FAFC;
  --cb-table-header-text: #475569;
  --cb-table-border: #E2E8F0;
  
  --cb-modal-overlay: rgba(15, 23, 42, 0.6);
  --cb-modal-bg: #FFFFFF;
  --cb-modal-border: #E2E8F0;
}

/* --- 1. Pure Luminary Light --- */
html.theme-light {
  --cb-nav-bg: #FFFFFF;
  --cb-nav-text: #0F172A;
  --cb-sidenav-bg: #FFFFFF;
  --cb-sidenav-text: #475569;
  --cb-sidenav-active-bg: #EEF2FF;
  --cb-sidenav-active-text: #4F46E5;
  --cb-card-bg: #FFFFFF;
  --cb-card-border: #E2E8F0;
  --cb-primary: #4F46E5;
  --cb-primary-hover: #4338CA;
  --cb-input-bg: #FFFFFF;
  --cb-input-border: #CBD5E1;
  --cb-input-text: #0F172A;
  --cb-table-header-bg: #F8FAFC;
  --cb-table-header-text: #475569;
  --cb-modal-bg: #FFFFFF;
}

/* --- 2. Cambridge Forest --- */
html.theme-forest {
  --cb-nav-bg: linear-gradient(135deg, #064E3B 0%, #04392B 100%);
  --cb-nav-text: #FFFFFF;
  --cb-sidenav-bg: #FFFFFF;
  --cb-sidenav-active-bg: #ECFDF5;
  --cb-sidenav-active-text: #059669;
  --cb-primary: #059669;
  --cb-primary-hover: #047857;
}

/* --- 3. CaseBook Azure --- */
html.theme-azure {
  --cb-nav-bg: linear-gradient(135deg, #0B132B 0%, #1C2541 100%);
  --cb-nav-text: #FFFFFF;
  --cb-sidenav-bg: #FFFFFF;
  --cb-sidenav-active-bg: #F0F9FF;
  --cb-sidenav-active-text: #0284C7;
  --cb-primary: #0284C7;
  --cb-primary-hover: #0369A1;
}

/* --- 4. Chambers Executive --- */
html.theme-executive {
  --cb-nav-bg: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
  --cb-nav-text: #FFFFFF;
  --cb-sidenav-bg: #FFFFFF;
  --cb-sidenav-active-bg: #FEF3C7;
  --cb-sidenav-active-text: #B45309;
  --cb-primary: #D97706;
  --cb-primary-hover: #B45309;
}

/* --- 5. Judicial Midnight --- */
html.theme-midnight {
  --cb-nav-bg: linear-gradient(135deg, #0A0E17 0%, #141B2D 100%);
  --cb-nav-text: #F8FAFC;
  --cb-sidenav-bg: #141B2D;
  --cb-sidenav-text: #94A3B8;
  --cb-sidenav-active-bg: #1F293D;
  --cb-sidenav-active-text: #38BDF8;
  --cb-card-bg: #141B2D;
  --cb-card-border: #1F293D;
  --cb-input-bg: #0A0E17;
  --cb-input-border: #1F293D;
  --cb-input-text: #F8FAFC;
  --cb-table-header-bg: #1F293D;
  --cb-table-header-text: #94A3B8;
  --cb-primary: #38BDF8;
  --cb-primary-hover: #0284C7;
  --cb-modal-bg: #141B2D;
  --cb-modal-border: #1F293D;
}

/* --- 6. CaseBook Mint --- */
html.theme-mint {
  --cb-nav-bg: linear-gradient(135deg, #064E3B 0%, #065F46 100%);
  --cb-nav-text: #FFFFFF;
  --cb-sidenav-bg: #FFFFFF;
  --cb-sidenav-active-bg: #ECFDF5;
  --cb-sidenav-active-text: #10B981;
  --cb-primary: #10B981;
  --cb-primary-hover: #059669;
}

/* --- 7. Modern Corporate --- */
html.theme-corporate {
  --cb-nav-bg: linear-gradient(135deg, #202124 0%, #18181B 100%);
  --cb-nav-text: #FFFFFF;
  --cb-sidenav-bg: #FFFFFF;
  --cb-sidenav-active-bg: #F0FDFA;
  --cb-sidenav-active-text: #0D9488;
  --cb-primary: #0D9488;
  --cb-primary-hover: #0F766E;
}

/* --- 8. Classic Chambers --- */
html.theme-classic {
  --cb-nav-bg: linear-gradient(135deg, #1B2A47 0%, #0F172A 100%);
  --cb-nav-text: #FFFFFF;
  --cb-sidenav-bg: #FFFFFF;
  --cb-sidenav-active-bg: #FFFBEB;
  --cb-sidenav-active-text: #A8895F;
  --cb-primary: #C5A880;
  --cb-primary-hover: #A8895F;
}

/* Apply Mapped Variables Across 10 Component Groups */

/* 1. Nav & Top Bar */
.materialize-nav, #mainNavbar {
  background: var(--cb-nav-bg) !important;
  color: var(--cb-nav-text) !important;
}

/* 2. SideNav & Navigation Drawer */
.sidebar, .sidenav {
  background: var(--cb-sidenav-bg) !important;
  color: var(--cb-sidenav-text, #334155) !important;
}
.sidenav a.active, .sidebar a.active {
  background: var(--cb-sidenav-active-bg) !important;
  color: var(--cb-sidenav-active-text) !important;
}

/* 3. Buttons & Action Controls */
.primary-btn, .hero-btn-primary, .login-submit-btn {
  background: var(--cb-primary) !important;
}
.primary-btn:hover, .hero-btn-primary:hover, .login-submit-btn:hover {
  background: var(--cb-primary-hover) !important;
}

/* 4. Form Controls & Inputs */
input[type="text"], input[type="date"], input[type="search"], input[type="password"], select, textarea {
  background-color: var(--cb-input-bg) !important;
  border-color: var(--cb-input-border) !important;
  color: var(--cb-input-text) !important;
}

/* 5. Tables & Data Registers */
.case-table thead, .search-results-table thead {
  background-color: var(--cb-table-header-bg) !important;
}
.case-table th, .search-results-table th {
  color: var(--cb-table-header-text) !important;
}

/* 7. Hero Cards & KPI Containers */
.tab-card-wrapper, .home-hero-card, .my-cases-header-card, .kpi-card, .stat-card {
  background: var(--cb-card-bg) !important;
  border-color: var(--cb-card-border) !important;
  box-shadow: var(--cb-card-shadow) !important;
}

/* 9. Modals & Dialog Windows */
.db-modal-card, .auth-modal {
  background: var(--cb-modal-bg) !important;
  border-color: var(--cb-modal-border) !important;
}
'''

with open('d:/caseBook/components/global-rules.css', 'a', encoding='utf-8') as f:
    f.write(theme_mapping_css)

print("Appended Re-mapped Theme Color Variables to components/global-rules.css!")
