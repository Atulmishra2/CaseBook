import re

with open('d:/caseBook/admin.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Remove duplicate let/const declarations in admin.js
js = re.sub(r'^(let|const|var)\s+todoSearchQuery\s*=', r'todoSearchQuery =', js, flags=re.MULTILINE)
js = re.sub(r'^(let|const|var)\s+caseTasks\s*=', r'caseTasks =', js, flags=re.MULTILINE)
js = re.sub(r'^(let|const|var)\s+isSubmittingTodo\s*=', r'isSubmittingTodo =', js, flags=re.MULTILINE)
js = re.sub(r'^(let|const|var)\s+currentTodoFilter\s*=', r'currentTodoFilter =', js, flags=re.MULTILINE)
js = re.sub(r'^(let|const|var)\s+CASE_NUMBER_INPUT_IDS\s*=', r'CASE_NUMBER_INPUT_IDS =', js, flags=re.MULTILINE)

with open('d:/caseBook/admin.js', 'w', encoding='utf-8') as f:
    f.write(js)
