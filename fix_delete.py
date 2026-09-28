import re

with open('d:/caseBook/components/tabs/delete/delete.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Fix unquoted string
js = re.sub(r'deleteStatus\.textContent = \?O(.*?)";', r'deleteStatus.textContent = "?O\1";', js)

with open('d:/caseBook/components/tabs/delete/delete.js', 'w', encoding='utf-8') as f:
    f.write(js)
