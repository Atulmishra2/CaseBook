import re

def get_declarations(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        js = f.read()
    # matches top-level let/const
    vars = re.findall(r'^(?:let|const|var)\s+([a-zA-Z0-9_]+)\s*=', js, re.MULTILINE)
    return set(vars)

admin_vars = get_declarations('d:/caseBook/admin.js')
todo_vars = get_declarations('d:/caseBook/services/todoService.js')
case_vars = get_declarations('d:/caseBook/services/caseService.js')
anc_vars = get_declarations('d:/caseBook/services/ancillaryService.js')

print("Todo duplicates:", admin_vars.intersection(todo_vars))
print("Case duplicates:", admin_vars.intersection(case_vars))
print("Anc duplicates:", admin_vars.intersection(anc_vars))
