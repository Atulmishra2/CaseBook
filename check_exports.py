import re

with open('d:/caseBook/services/todoService.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Find all auto-exports
exports = re.findall(r'window\.([a-zA-Z0-9_]+)\s*=\s*([a-zA-Z0-9_]+);', js)
missing = []
for exp in exports:
    # check if unction <name> or sync function <name> exists in the string
    if not re.search(r'(?:async\s+)?function\s+' + exp[0] + r'\s*\(', js):
        missing.append(exp[0])
print("Missing exports:", missing)
