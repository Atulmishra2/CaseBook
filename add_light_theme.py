import re

# 1. Add Light Theme CSS rules to components/global-rules.css
light_css = '''

/* ============================================================
   THEME: PURE LUMINARY LIGHT (html.theme-light)
   Crisp white canvas #FFFFFF, slate-50 background #F8FAFC,
   vibrant indigo accents #4F46E5 & slate-900 typography #0F172A
   ============================================================ */
html.theme-light body {
  background: #F8FAFC !important;
  color: #1E293B !important;
}

html.theme-light .materialize-nav,
html.theme-light #mainNavbar {
  background: #FFFFFF !important;
  border-bottom: 1px solid #E2E8F0 !important;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05) !important;
}

html.theme-light .materialize-nav .brand-logo,
html.theme-light .materialize-nav a,
html.theme-light #mainNavbar a {
  color: #0F172A !important;
}

html.theme-light .sidebar,
html.theme-light .sidenav {
  background: #FFFFFF !important;
  border-right: 1px solid #E2E8F0 !important;
  box-shadow: 1px 0 4px rgba(15, 23, 42, 0.03) !important;
}

html.theme-light .sidenav a {
  color: #475569 !important;
}

html.theme-light .sidenav a:hover {
  background: #F1F5F9 !important;
  color: #0F172A !important;
}

html.theme-light .sidenav a.active {
  background: #EEF2FF !important;
  color: #4F46E5 !important;
  border-left: 3px solid #4F46E5 !important;
  font-weight: 600 !important;
}

html.theme-light .subheader {
  color: #64748B !important;
}

html.theme-light .tab-card-wrapper,
html.theme-light .home-hero-card,
html.theme-light .my-cases-header-card,
html.theme-light .kpi-card,
html.theme-light .stat-card,
html.theme-light .card,
html.theme-light .panel,
html.theme-light .form-container,
html.theme-light .login-card {
  background: #FFFFFF !important;
  border-color: #E2E8F0 !important;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04) !important;
}

html.theme-light h1,
html.theme-light h2,
html.theme-light h3,
html.theme-light h4,
html.theme-light h5,
html.theme-light h6,
html.theme-light .hero-greeting,
html.theme-light .case-card-name,
html.theme-light .court-card-name {
  color: #0F172A !important;
}

html.theme-light th,
html.theme-light thead th {
  background: #F8FAFC !important;
  color: #475569 !important;
  border-bottom: 1.5px solid #E2E8F0 !important;
}

html.theme-light td {
  color: #334155 !important;
  border-bottom: 1px solid #F1F5F9 !important;
}

html.theme-light input[type="text"],
html.theme-light input[type="date"],
html.theme-light input[type="search"],
html.theme-light input[type="password"],
html.theme-light select,
html.theme-light textarea {
  background: #FFFFFF !important;
  color: #0F172A !important;
  border-color: #CBD5E1 !important;
}

html.theme-light input:focus,
html.theme-light select:focus,
html.theme-light textarea:focus {
  border-color: #6366F1 !important;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15) !important;
}

html.theme-light .fixed-bottom-nav {
  background: #FFFFFF !important;
  border-top: 1px solid #E2E8F0 !important;
  box-shadow: 0 -2px 10px rgba(15, 23, 42, 0.05) !important;
}

html.theme-light .bottom-nav-btn {
  color: #64748B !important;
}

html.theme-light .bottom-nav-btn.active,
html.theme-light .bottom-nav-btn:hover {
  color: #4F46E5 !important;
}

html.theme-light #themeToggleBtn {
  background: #FFFFFF !important;
  color: #4F46E5 !important;
  border: 1px solid #C7D2FE !important;
}
'''

with open('d:/caseBook/components/global-rules.css', 'a', encoding='utf-8') as f:
    f.write(light_css)

print("Appended Light Theme CSS to components/global-rules.css!")

# 2. Register 'light' in theme-toggle.js
with open('d:/caseBook/theme-toggle.js', 'r', encoding='utf-8') as f:
    tt_js = f.read()

light_theme_obj = "    { id: 'light',     name: 'Pure Luminary Light',    desc: 'Ultra-clean, crisp white canvas with soft slate shadows & indigo accents', icon: 'fa-sun',\n      palette: ['#FFFFFF', '#F8FAFC', '#4F46E5', '#6366F1', '#FFFFFF', '#E2E8F0'] },\n"

if "'light'" not in tt_js:
    tt_js = tt_js.replace("var THEMES = [\n", "var THEMES = [\n" + light_theme_obj)

with open('d:/caseBook/theme-toggle.js', 'w', encoding='utf-8') as f:
    f.write(tt_js)

print("Registered Pure Luminary Light Theme in theme-toggle.js!")
