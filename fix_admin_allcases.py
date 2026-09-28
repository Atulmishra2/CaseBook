import re

with open('d:/caseBook/admin.js', 'r', encoding='utf-8') as f:
    js = f.read()

js = re.sub(r'^(let|const|var)\s+currentAllCasesFilteredList\s*=', r'currentAllCasesFilteredList =', js, flags=re.MULTILINE)

with open('d:/caseBook/admin.js', 'w', encoding='utf-8') as f:
    f.write(js)
