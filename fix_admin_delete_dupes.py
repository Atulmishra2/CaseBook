import re

with open('d:/caseBook/admin.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Delete the entire lines for these variables
js = re.sub(r'^todoSearchQuery\s*=.*?\n', '', js, flags=re.MULTILINE)
js = re.sub(r'^caseTasks\s*=.*?\n', '', js, flags=re.MULTILINE)
js = re.sub(r'^isSubmittingTodo\s*=.*?\n', '', js, flags=re.MULTILINE)
js = re.sub(r'^currentTodoFilter\s*=.*?\n', '', js, flags=re.MULTILINE)

# CASE_NUMBER_INPUT_IDS is multiline, so regex needs to be more robust
js = re.sub(r'^CASE_NUMBER_INPUT_IDS\s*=\s*new Set\(\[[\s\S]*?\]\);\n', '', js, flags=re.MULTILINE)

# Also Supabase duplicates
js = re.sub(r'^supabaseClient\s*=.*?\n', '', js, flags=re.MULTILINE)
js = re.sub(r'^isSupabaseConfigured\s*=.*?\n', '', js, flags=re.MULTILINE)
js = re.sub(r'^SUPABASE_ANON_KEY\s*=.*?\n', '', js, flags=re.MULTILINE)
js = re.sub(r'^SUPABASE_URL\s*=.*?\n', '', js, flags=re.MULTILINE)

with open('d:/caseBook/admin.js', 'w', encoding='utf-8') as f:
    f.write(js)
