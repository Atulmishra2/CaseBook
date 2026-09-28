import os
import re

with open('d:/caseBook/admin.html', 'r', encoding='utf-8', errors='ignore') as f:
    admin_html = f.read()

# Replace login brand pill icon with FontAwesome scales icon
admin_html = re.sub(r'<div class="brand-pill">[\s\S]*?</div>', '<div class="brand-pill"><i class="fa-solid fa-scale-balanced"></i></div>', admin_html)

# Replace creator avatar badge icon with FontAwesome advocate/user-tie icon
admin_html = re.sub(r'<div class="creator-avatar-badge">[\s\S]*?</div>', '<div class="creator-avatar-badge"><i class="fa-solid fa-user-tie"></i></div>', admin_html)

with open('d:/caseBook/admin.html', 'w', encoding='utf-8') as f:
    f.write(admin_html)

print("Updated login form icons in admin.html with FontAwesome icons!")

scale_unicode = '\u2696'
advocate_unicode = '\U0001F468\u200D\u2696\uFE0F'

def clean_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
        
    orig = content
    content = content.replace(scale_unicode, '<i class="fa-solid fa-scale-balanced"></i>')
    content = content.replace(advocate_unicode, '<i class="fa-solid fa-user-tie"></i>')
    content = content.replace('âš–ï¸ ', '<i class="fa-solid fa-scale-balanced"></i>')
    content = content.replace('ðŸ‘¨â€ âš–ï¸ ', '<i class="fa-solid fa-user-tie"></i>')
    content = content.replace('dYY', '<i class="fa-solid fa-circle-check"></i>')
    content = content.replace('dY"', '<i class="fa-solid fa-shield-halved"></i>')
    content = content.replace('dY\'_', '<i class="fa-solid fa-floppy-disk"></i>')
    
    if content != orig:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Cleaned unicode artifacts in {filepath}")

for root, dirs, files in os.walk('d:/caseBook'):
    if 'node_modules' in root or '.git' in root: continue
    for file in files:
        if file.endswith(('.html', '.js', '.css')):
            clean_file(os.path.join(root, file))

