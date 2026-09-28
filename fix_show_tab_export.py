with open('d:/caseBook/admin.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Add window.showTab = showTab right after function showTab definition
target = "async function showTab(tabId, event, navType = 'navigate') {"
replacement = "async function showTab(tabId, event, navType = 'navigate') {\n"

if "window.showTab = showTab;" not in js:
    # Add window.showTab assignment
    js = js.replace(target, target + "\n  window.showTab = showTab;\n  window.showTabImpl = showTab;")
    print("Added window.showTab = showTab to admin.js!")

with open('d:/caseBook/admin.js', 'w', encoding='utf-8') as f:
    f.write(js)
