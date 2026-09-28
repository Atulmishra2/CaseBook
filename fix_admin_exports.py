import re

with open('d:/caseBook/admin.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Find all window.XYZ = XYZ;
exports = re.findall(r'^(window\.([a-zA-Z0-9_]+)\s*=\s*\2;)', js, re.MULTILINE)
removed = []
for full_match, func_name in exports:
    # Check if there is a function declaration or let/const declaration for func_name
    has_decl = re.search(r'(?:async\s+)?function\s+' + func_name + r'\s*\(|var\s+' + func_name + r'\s*=|let\s+' + func_name + r'\s*=|const\s+' + func_name + r'\s*=', js)
    if not has_decl:
        removed.append(func_name)
        js = js.replace(full_match, f"// {full_match} // Removed: ReferenceError")

with open('d:/caseBook/admin.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("Removed dangling exports:", removed)
