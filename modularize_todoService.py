import re

with open('d:/caseBook/admin.js', 'r', encoding='utf-8') as f:
    admin_js = f.read()

pattern = r'(?s)(// ==============================================================================\n// Case To-Do List & Deadline Tracker Logic.*?)(// ==============================================================================\n// Calendar View Scheduler Logic)'
match = re.search(pattern, admin_js)

if match:
    extracted = match.group(1)
    
    # Auto-export all functions
    func_pattern = r'^async function ([a-zA-Z0-9_]+)|function ([a-zA-Z0-9_]+)'
    exports = []
    for line in extracted.split('\n'):
        if line.startswith('function ') or line.startswith('async function '):
            m = re.search(func_pattern, line)
            if m:
                func_name = m.group(1) or m.group(2)
                exports.append(f"window.{func_name} = {func_name};")
    
    with open('d:/caseBook/services/todoService.js', 'w', encoding='utf-8') as f:
        f.write(extracted)
        f.write('\n// Auto-Exports\n')
        f.write('\n'.join(list(set(exports))))
        f.write('\n')
        
    replacement = '// [MODULARIZED] Case To-Do Engine moved to services/todoService.js\n\n\\2'
    new_admin_js = re.sub(pattern, replacement, admin_js)
    
    with open('d:/caseBook/admin.js', 'w', encoding='utf-8') as f:
        f.write(new_admin_js)
        
    # Update HTML
    def insert_script(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            html = f.read()
        html = html.replace('<script src="services/caseService.js"></script>', '<script src="services/caseService.js"></script>\n    <script src="services/todoService.js"></script>')
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(html)

    insert_script('d:/caseBook/admin.html')
    insert_script('d:/caseBook/index.html')

    print("Successfully extracted todoService.js!")
else:
    print("Could not find the To-Do block in admin.js!")

