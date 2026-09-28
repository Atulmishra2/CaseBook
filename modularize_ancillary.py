import re

with open('d:/caseBook/admin.js', 'r', encoding='utf-8') as f:
    admin_js = f.read()

# Extract courts functions
pattern = r'(?s)(async function addCourtToSupabase.*?)(function setActiveScreen)'
match = re.search(pattern, admin_js)

if match:
    extracted = match.group(1)
    
    with open('d:/caseBook/services/ancillaryService.js', 'w', encoding='utf-8') as f:
        f.write('// ==============================================================================\n')
        f.write('// Ancillary Data Services (Courts, Helpers, Misc)\n')
        f.write('// ==============================================================================\n\n')
        f.write(extracted)
        f.write('\n// Auto-Exports\n')
        f.write('window.addCourtToSupabase = addCourtToSupabase;\n')
        f.write('window.editCourtInSupabase = editCourtInSupabase;\n')
        f.write('window.deleteCourtFromSupabase = deleteCourtFromSupabase;\n')
        
    replacement = '// [MODULARIZED] Courts/Ancillary CRUD logic moved to services/ancillaryService.js\n\n\\2'
    new_admin_js = re.sub(pattern, replacement, admin_js)
    
    with open('d:/caseBook/admin.js', 'w', encoding='utf-8') as f:
        f.write(new_admin_js)
        
    def insert_script(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            html = f.read()
        html = html.replace('<script src="services/todoService.js"></script>', '<script src="services/todoService.js"></script>\n    <script src="services/ancillaryService.js"></script>')
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(html)

    insert_script('d:/caseBook/admin.html')
    insert_script('d:/caseBook/index.html')

    print("Successfully extracted ancillaryService.js!")
else:
    print("Could not find the block in admin.js!")

