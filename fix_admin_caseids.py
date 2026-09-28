import re

with open('d:/caseBook/admin.js', 'r', encoding='utf-8') as f:
    js = f.read()

js = re.sub(r'^CASE_NUMBER_INPUT_IDS\s*=\s*new Set\(\[[\s\S]*?\]\);\n', '', js, flags=re.MULTILINE)

with open('d:/caseBook/admin.js', 'w', encoding='utf-8') as f:
    f.write(js)
