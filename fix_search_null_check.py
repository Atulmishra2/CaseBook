with open('d:/caseBook/admin.js', 'r', encoding='utf-8') as f:
    js = f.read()

target = '''  if (matches.length === 0) {
    resultsBody.innerHTML = '<tr><td colspan="10" class="no-results">No cases found matching the specified filters. Try clearing or changing your filters.</td></tr>';
    renderSelectedCaseDetails(null);
    return;
  }

  resultsBody.innerHTML = '';'''

replacement = '''  if (!resultsBody) return;

  if (matches.length === 0) {
    resultsBody.innerHTML = '<tr><td colspan="10" class="no-results">No cases found matching the specified filters. Try clearing or changing your filters.</td></tr>';
    renderSelectedCaseDetails(null);
    return;
  }

  resultsBody.innerHTML = '';'''

if target in js:
    js = js.replace(target, replacement)
    print("Patched searchCases resultsBody null check successfully!")
else:
    print("Target block not matched exactly, applying regex...")
    import re
    js = re.sub(r'if \(matches\.length === 0\) \{\s*resultsBody\.innerHTML =', 'if (!resultsBody) return;\n  if (matches.length === 0) {\n    if (resultsBody) resultsBody.innerHTML =', js)

with open('d:/caseBook/admin.js', 'w', encoding='utf-8') as f:
    f.write(js)
