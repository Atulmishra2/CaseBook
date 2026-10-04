with open('admin.html', 'r', encoding='utf-8') as f:
    admin_lines = f.readlines()

start_idx = -1
end_idx = -1

for i, l in enumerate(admin_lines):
    if 'id="paisaReceivedModal"' in l:
        start_idx = i
        if i > 0 and 'PAISA: RECEIVED MONEY' in admin_lines[i-1]:
            start_idx = i - 1
        elif i > 3 and 'PAISA: RECEIVED MONEY' in admin_lines[i-3]:
            start_idx = i - 4
    if start_idx != -1 and end_idx == -1 and i > start_idx:
        if 'id="caseBookToast"' in l:
            end_idx = i
            if i > 0 and 'CaseBook Toast Notification' in admin_lines[i-1]:
                end_idx = i - 1
            elif i > 1 and 'CaseBook Toast Notification' in admin_lines[i-2]:
                end_idx = i - 2
            break

print(f"Paisa modals start: {start_idx+1}, end: {end_idx+1}")
paisa_modals_html = "".join(admin_lines[start_idx:end_idx])

# Append to components/tabs/paisa/paisa.html
with open('components/tabs/paisa/paisa.html', 'r', encoding='utf-8') as f:
    paisa_html_content = f.read()

new_paisa_html = paisa_html_content + "\n\n<!-- ================= PAISA MODALS (MODULARIZED) ================= -->\n" + paisa_modals_html

with open('components/tabs/paisa/paisa.html', 'w', encoding='utf-8') as f:
    f.write(new_paisa_html)

# Update components/tabs/paisa/paisa.js
with open('components/tabs/paisa/paisa.js', 'w', encoding='utf-8') as f:
    f.write("window.__casebook_tabs = window.__casebook_tabs || {};\nwindow.__casebook_tabs['paisa'] = `" + new_paisa_html.replace('`', '\\`').replace('${', '\\${') + "`;\n")

# Remove from admin.html
new_admin_lines = admin_lines[:start_idx] + admin_lines[end_idx:]
with open('admin.html', 'w', encoding='utf-8') as f:
    f.writelines(new_admin_lines)

print(f"Successfully extracted {end_idx - start_idx} lines of Paisa modals to components/tabs/paisa/paisa.html.")
print(f"New admin.html total lines: {len(new_admin_lines)}")
