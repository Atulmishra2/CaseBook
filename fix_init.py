import re

with open('d:/caseBook/admin.js', 'r', encoding='utf-8') as f:
    js = f.read()

pattern = r"document\.addEventListener\('DOMContentLoaded', initializeApp\);"
replacement = r'''if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
  } else {
    initializeApp();
  }'''

js = re.sub(pattern, replacement, js)

with open('d:/caseBook/admin.js', 'w', encoding='utf-8') as f:
    f.write(js)
