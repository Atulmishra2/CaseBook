import re

# Clean admin.html
with open('d:/caseBook/admin.html', 'r', encoding='utf-8') as f:
    admin_html = f.read()

# Remove <footer class="site-footer">...</footer>
admin_html = re.sub(r'\s*<!-- ===== FIXED SITE FOOTER.*?-->\s*<footer class="site-footer">[\s\S]*?</footer>', '', admin_html)
admin_html = re.sub(r'<script src="components/chambers-footer\.js" defer></script>\s*', '', admin_html)

with open('d:/caseBook/admin.html', 'w', encoding='utf-8') as f:
    f.write(admin_html)

# Clean index.html
with open('d:/caseBook/index.html', 'r', encoding='utf-8') as f:
    idx_html = f.read()

idx_html = re.sub(r'\s*<!-- ===== FIXED SITE FOOTER.*?-->\s*<footer class="site-footer">[\s\S]*?</footer>', '', idx_html)
idx_html = re.sub(r'<script src="components/chambers-footer\.js" defer></script>\s*', '', idx_html)

with open('d:/caseBook/index.html', 'w', encoding='utf-8') as f:
    f.write(idx_html)

print("Footer removed completely from admin.html and index.html!")
