import re

with open('d:/caseBook/components/tabs/search/search.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace the beginning of the logic
js = js.replace('''// Companion script for offline file:/// double-click compatibility
const searchInput = document.getElementById('globalSearch');''', '''// Companion script for offline file:/// double-click compatibility
function renderAdvancedSearchResults() {
  const searchInput = document.getElementById('globalSearch');''')

# And we need to add the closing brace at the end of the file.
js += "\n}\nwindow.renderAdvancedSearchResults = renderAdvancedSearchResults;\n"

with open('d:/caseBook/components/tabs/search/search.js', 'w', encoding='utf-8') as f:
    f.write(js)
