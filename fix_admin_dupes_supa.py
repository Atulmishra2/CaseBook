import re

with open('d:/caseBook/admin.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Remove duplicate let/const declarations in admin.js
js = re.sub(r'^(let|const|var)\s+supabaseClient\s*=', r'supabaseClient =', js, flags=re.MULTILINE)
js = re.sub(r'^(let|const|var)\s+isSupabaseConfigured\s*=', r'isSupabaseConfigured =', js, flags=re.MULTILINE)
js = re.sub(r'^(let|const|var)\s+SUPABASE_ANON_KEY\s*=', r'SUPABASE_ANON_KEY =', js, flags=re.MULTILINE)
js = re.sub(r'^(let|const|var)\s+SUPABASE_URL\s*=', r'SUPABASE_URL =', js, flags=re.MULTILINE)

with open('d:/caseBook/admin.js', 'w', encoding='utf-8') as f:
    f.write(js)
