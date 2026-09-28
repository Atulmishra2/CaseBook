import re

with open('d:/caseBook/admin.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace window.XYZ = XYZ; with if (typeof XYZ !== 'undefined') window.XYZ = XYZ;
js = re.sub(r'^(window\.([a-zA-Z0-9_]+)\s*=\s*\2;)', r"if (typeof \2 !== 'undefined') \1", js, flags=re.MULTILINE)

with open('d:/caseBook/admin.js', 'w', encoding='utf-8') as f:
    f.write(js)
