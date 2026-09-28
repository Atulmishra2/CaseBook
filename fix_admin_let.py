import re

with open('d:/caseBook/admin.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace top-level let and const with var
js = re.sub(r'^(let|const)\s+([a-zA-Z0-9_]+)\s*=', r'var \2 =', js, flags=re.MULTILINE)

with open('d:/caseBook/admin.js', 'w', encoding='utf-8') as f:
    f.write(js)
