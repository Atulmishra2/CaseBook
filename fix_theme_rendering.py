import re

# 1. Update theme-toggle.js
with open('d:/caseBook/theme-toggle.js', 'r', encoding='utf-8') as f:
    tt = f.read()

tt = tt.replace("onclick=\"setAppTheme('", "onclick=\"window.setAppTheme('")

# Make sure Pure Luminary Light is at the top of THEMES
if "id: 'light'" in tt:
    print("Light theme exists in THEMES array")

with open('d:/caseBook/theme-toggle.js', 'w', encoding='utf-8') as f:
    f.write(tt)

# 2. Update cache buster in admin.html and index.html
with open('d:/caseBook/admin.html', 'r', encoding='utf-8') as f:
    admin_html = f.read()

admin_html = admin_html.replace('theme-toggle.js?v=7.80', 'theme-toggle.js?v=8.15')

with open('d:/caseBook/admin.html', 'w', encoding='utf-8') as f:
    f.write(admin_html)

with open('d:/caseBook/index.html', 'r', encoding='utf-8') as f:
    idx_html = f.read()

idx_html = idx_html.replace('theme-toggle.js?v=7.80', 'theme-toggle.js?v=8.15')

with open('d:/caseBook/index.html', 'w', encoding='utf-8') as f:
    f.write(idx_html)

# 3. Clean up corrupted palette icon in themes.html and themes.js
with open('d:/caseBook/components/tabs/themes/themes.html', 'r', encoding='utf-8', errors='ignore') as f:
    th_html = f.read()

th_html = re.sub(r'<div class="section-icon-badge">[\s\S]*?</div>', '<div class="section-icon-badge"><i class="fa-solid fa-palette"></i></div>', th_html)

with open('d:/caseBook/components/tabs/themes/themes.html', 'w', encoding='utf-8') as f:
    f.write(th_html)

# Re-pack themes.js with clean themes.html
backtick = chr(96)
clean_th_html = th_html.replace('\\', '\\\\').replace(backtick, '\\' + backtick)
themes_js = "window.__casebook_tabs = window.__casebook_tabs || {};\n" + f"window.__casebook_tabs['themes'] = " + backtick + clean_th_html + backtick + ";\n"

with open('d:/caseBook/components/tabs/themes/themes.js', 'w', encoding='utf-8') as f:
    f.write(themes_js)

print("Updated theme-toggle.js, cache buster, and themes tab cleanups successfully!")
