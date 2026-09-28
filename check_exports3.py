import re

with open('d:/caseBook/services/caseService.js', 'r', encoding='utf-8') as f:
    js = f.read()

exports = re.findall(r'window\.([a-zA-Z0-9_]+)\s*=\s*([a-zA-Z0-9_]+);', js)
missing = []
for exp in exports:
    if not re.search(r'(?:async\s+)?function\s+' + exp[0] + r'\s*\(', js):
        missing.append(exp[0])
print("Missing exports in caseService:", missing)
