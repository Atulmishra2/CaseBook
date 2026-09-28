import re

with open('d:/caseBook/components/tabs/search/search.js', 'r', encoding='utf-8') as f:
    js = f.read()

js = js.replace('}\nwindow.renderAdvancedSearchResults = renderAdvancedSearchResults;\n', '')
js = js.replace('function initSearchTab() {', '}\nwindow.renderAdvancedSearchResults = renderAdvancedSearchResults;\nfunction initSearchTab() {')

with open('d:/caseBook/components/tabs/search/search.js', 'w', encoding='utf-8') as f:
    f.write(js)
