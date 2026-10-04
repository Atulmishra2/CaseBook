with open('admin.html', 'r', encoding='utf-8') as f:
    admin_lines = f.readlines()

start_idx = -1
end_idx = -1

for i, l in enumerate(admin_lines):
    if 'id="caseDetailsFullModal"' in l:
        start_idx = i
        if i > 0 and 'Full Case Details Modal' in admin_lines[i-1]:
            start_idx = i - 1
        elif i > 2 and 'Full Case Details Modal' in admin_lines[i-2]:
            start_idx = i - 2
    if start_idx != -1 and end_idx == -1 and i > start_idx:
        if 'id="caseBookToast"' in l:
            end_idx = i
            if i > 0 and 'CaseBook Toast Notification' in admin_lines[i-1]:
                end_idx = i - 1
            elif i > 1 and 'CaseBook Toast Notification' in admin_lines[i-2]:
                end_idx = i - 2
            break

print(f"Case modals start: {start_idx+1}, end: {end_idx+1}")
case_modals_html = "".join(admin_lines[start_idx:end_idx])

# Save to components/modals/case-modals.html
with open('components/modals/case-modals.html', 'w', encoding='utf-8') as f:
    f.write(case_modals_html)

# Save to components/modals/case-modals.js
with open('components/modals/case-modals.js', 'w', encoding='utf-8') as f:
    f.write("window.__casebook_modals = window.__casebook_modals || {};\nwindow.__casebook_modals['case-modals'] = `" + case_modals_html.replace('`', '\\`').replace('${', '\\${') + "`;\n")

# Replace in admin.html with container mount
placeholder = '    <!-- Case Modals Container (Modularized) -->\n    <div id="caseModalsContainer" data-modal-src="components/modals/case-modals.html"></div>\n\n'
new_admin_lines = admin_lines[:start_idx] + [placeholder] + admin_lines[end_idx:]
with open('admin.html', 'w', encoding='utf-8') as f:
    f.writelines(new_admin_lines)

print(f"Successfully extracted {end_idx - start_idx} lines of Case modals to components/modals/case-modals.html.")
print(f"New admin.html total lines: {len(new_admin_lines)}")
