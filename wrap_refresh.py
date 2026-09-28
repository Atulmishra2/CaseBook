with open('d:/caseBook/admin.js', 'r', encoding='utf-8') as f:
    js = f.read()

target = 'function refreshAllCaseTables() {'
replacement = 'function refreshAllCaseTables() {\n  try {'

if target in js:
    js = js.replace(target, replacement, 1)

# Add catch at the end of refreshAllCaseTables
# Find function end
idx = js.find('function refreshAllCaseTables()')
if idx != -1:
    # find closing brace of function
    end_idx = js.find('function ', idx + 30)
    if end_idx != -1:
        func_body = js[idx:end_idx]
        last_brace = func_body.rfind('}')
        if last_brace != -1:
            new_func_body = func_body[:last_brace] + '  } catch (err) { console.warn("refreshAllCaseTables caught error:", err); }\n}'
            js = js[:idx] + new_func_body + js[end_idx:]

with open('d:/caseBook/admin.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("Wrapped refreshAllCaseTables in try-catch!")
