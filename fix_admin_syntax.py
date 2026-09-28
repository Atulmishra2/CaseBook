import re

with open('d:/caseBook/admin.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
skip = False
for i, line in enumerate(lines):
    if '// Supabase Configuration' in line:
        skip = True
        new_lines.append(line)
        continue
    
    if skip and 'function ensureSupabaseClient()' in line:
        skip = False
    
    if not skip:
        new_lines.append(line)

with open('d:/caseBook/admin.js', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
