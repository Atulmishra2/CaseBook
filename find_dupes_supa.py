import re

def get_declarations(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        js = f.read()
    return set(re.findall(r'^(?:let|const|var)\s+([a-zA-Z0-9_]+)\s*=', js, re.MULTILINE))

admin_vars = get_declarations('d:/caseBook/admin.js')
supa_vars = get_declarations('d:/caseBook/services/supabaseClient.js')

print("Supabase duplicates:", admin_vars.intersection(supa_vars))
