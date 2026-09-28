import re

with open('d:/caseBook/admin.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Make sidebar toggle use onclick directly
html = html.replace('id="sidebarToggleBtn" class="mobile-menu-btn"', 'id="sidebarToggleBtn" class="mobile-menu-btn" onclick="toggleMobileSidebar()"')

with open('d:/caseBook/admin.html', 'w', encoding='utf-8') as f:
    f.write(html)
