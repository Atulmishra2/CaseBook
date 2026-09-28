import re

with open('d:/caseBook/components/tabs/search/search.js', 'r', encoding='utf-8') as f:
    js = f.read()

js = js.replace('}\nwindow.renderAdvancedSearchResults = renderAdvancedSearchResults;\nfunction initSearchTab() {', 'function initSearchTab() {')
js = js.replace('function exportAllCasesToCSV() {', '}\nwindow.renderAdvancedSearchResults = renderAdvancedSearchResults;\n\nfunction exportAllCasesToCSV() {')

with open('d:/caseBook/components/tabs/search/search.js', 'w', encoding='utf-8') as f:
    f.write(js)
