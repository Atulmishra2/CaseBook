import re

# Update admin.js
with open('d:/caseBook/admin.js', 'r', encoding='utf-8') as f:
    admin_js = f.read()

pattern = r'(?s)// ==============================================================================\n// Supabase Configuration\n// ==============================================================================.*?window\.ensureSupabaseClient = ensureSupabaseClient;'
admin_js = re.sub(pattern, '// [MODULARIZED] Supabase Configuration moved to services/supabaseClient.js', admin_js)

with open('d:/caseBook/admin.js', 'w', encoding='utf-8') as f:
    f.write(admin_js)

# Update HTML files
def insert_script(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # Insert right before admin.js
    html = html.replace('<script src="admin.js?v=', '<script src="services/supabaseClient.js"></script>\n    <script src="admin.js?v=')
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(html)

insert_script('d:/caseBook/admin.html')
insert_script('d:/caseBook/index.html')

print("Successfully modularized supabase client!")
