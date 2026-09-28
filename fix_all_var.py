import os
import re

def convert_to_var(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        js = f.read()
    
    # Only replace at the start of a line (top-level scope) to avoid breaking loop variables if we can help it, 
    # but actually replacing all let  and const  is safer to avoid ANY duplicate globals.
    # Let's just replace top-level ones.
    js = re.sub(r'^(let|const)\s+([a-zA-Z0-9_]+)\s*=', r'var \2 =', js, flags=re.MULTILINE)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(js)

js_files = ['d:/caseBook/admin.js']
for root, dirs, files in os.walk('d:/caseBook/services'):
    for file in files:
        if file.endswith('.js'): js_files.append(os.path.join(root, file))

for root, dirs, files in os.walk('d:/caseBook/components'):
    for file in files:
        if file.endswith('.js'): js_files.append(os.path.join(root, file))

for f in js_files:
    convert_to_var(f)
    
print("Converted all top-level let/const to var!")
