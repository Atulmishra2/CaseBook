import re

with open('d:/caseBook/admin-mint.css', 'r', encoding='utf-8', errors='ignore') as f:
    css = f.read()

matches = re.findall(r'\.form-container[^{]*\{[^}]*\}', css)
print(f"Found {len(matches)} .form-container rules in admin-mint.css")
for m in matches[:10]:
    print(m)
