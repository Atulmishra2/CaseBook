import re
import os

files = [
    'd:/caseBook/admin.js',
    'd:/caseBook/services/caseService.js',
    'd:/caseBook/services/todoService.js',
    'd:/caseBook/services/ancillaryService.js'
]

for file in files:
    if os.path.exists(file):
        with open(file, 'r', encoding='utf-8') as f:
            js = f.read()
        
        js = re.sub(r'^(window\.([a-zA-Z0-9_]+)\s*=\s*\2;)', r"if (typeof \2 !== 'undefined') \1", js, flags=re.MULTILINE)
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(js)
        print(f"Fixed {file}")
