with open('admin.html', 'r', encoding='utf-8') as f:
    admin_lines = f.readlines()

start_idx = -1
end_idx = -1

for i, l in enumerate(admin_lines):
    if 'id="editCourtModal"' in l:
        start_idx = i
        if i > 0 and 'Edit Court Modal Dialog' in admin_lines[i-1]:
            start_idx = i - 1
        elif i > 2 and 'Edit Court Modal Dialog' in admin_lines[i-2]:
            start_idx = i - 2
    if start_idx != -1 and end_idx == -1 and i > start_idx:
        if 'id="caseDetailsFullModal"' in l:
            end_idx = i
            if i > 0 and 'Full Case Details Modal' in admin_lines[i-1]:
                end_idx = i - 1
            elif i > 2 and 'Full Case Details Modal' in admin_lines[i-2]:
                end_idx = i - 2
            break

print(f"Court modal start: {start_idx+1}, end: {end_idx+1}")
court_modal_html = "".join(admin_lines[start_idx:end_idx])

# Append to components/tabs/courts/courts.html
with open('components/tabs/courts/courts.html', 'r', encoding='utf-8') as f:
    courts_html_content = f.read()

new_courts_html = courts_html_content + "\n\n<!-- ================= COURTS MODAL (MODULARIZED) ================= -->\n" + court_modal_html

with open('components/tabs/courts/courts.html', 'w', encoding='utf-8') as f:
    f.write(new_courts_html)

# Update components/tabs/courts/courts.js
with open('components/tabs/courts/courts.js', 'w', encoding='utf-8') as f:
    f.write("window.__casebook_tabs = window.__casebook_tabs || {};\nwindow.__casebook_tabs['courts'] = `" + new_courts_html.replace('`', '\\`').replace('${', '\\${') + "`;\n")

# Remove from admin.html
new_admin_lines = admin_lines[:start_idx] + admin_lines[end_idx:]
with open('admin.html', 'w', encoding='utf-8') as f:
    f.writelines(new_admin_lines)

print(f"Successfully extracted {end_idx - start_idx} lines of Court modal to components/tabs/courts/courts.html.")
print(f"New admin.html total lines: {len(new_admin_lines)}")
