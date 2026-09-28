import re

with open('d:\\caseBook\\admin.js', 'r', encoding='utf-8') as f:
    content = f.read()

# I want to find the exact block and replace it
# The block starts at: let currentAllCasesFilteredList = [];
# and ends at: window.exportAllCasesCsv = exportAllCasesCsv;

pattern = re.compile(r'let currentAllCasesFilteredList = \[\];.*?window\.exportAllCasesCsv = exportAllCasesCsv;\n?', re.DOTALL)

def replacer(match):
    return "// [MODULARIZED] All Cases Master Register logic moved to components/tabs/all/all.js\n"

new_content, count = pattern.subn(replacer, content)

with open('d:\\caseBook\\admin.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Replaced {count} occurrences in admin.js")
