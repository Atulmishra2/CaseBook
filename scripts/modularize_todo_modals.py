with open('admin.html', 'r', encoding='utf-8') as f:
    admin_lines = f.readlines()

start_idx = -1
end_idx = -1

for i, l in enumerate(admin_lines):
    if 'id="todoReminderModal"' in l:
        start_idx = i
        if i > 0 and 'Todo / Task Reminder Modal' in admin_lines[i-1]:
            start_idx = i - 1
        elif i > 2 and 'Todo / Task Reminder Modal' in admin_lines[i-2]:
            start_idx = i - 2
    if start_idx != -1 and end_idx == -1 and i > start_idx:
        if 'id="caseRemarkModal"' in l:
            end_idx = i
            if i > 0 and 'Case Remark / Internal Note Modal' in admin_lines[i-1]:
                end_idx = i - 1
            elif i > 2 and 'Case Remark / Internal Note Modal' in admin_lines[i-2]:
                end_idx = i - 2
            break

print(f"Todo modals start: {start_idx+1}, end: {end_idx+1}")
todo_modals_html = "".join(admin_lines[start_idx:end_idx])

# Append to components/tabs/todo/todo.html
with open('components/tabs/todo/todo.html', 'r', encoding='utf-8') as f:
    todo_html_content = f.read()

new_todo_html = todo_html_content + "\n\n<!-- ================= TODO MODALS (MODULARIZED) ================= -->\n" + todo_modals_html

with open('components/tabs/todo/todo.html', 'w', encoding='utf-8') as f:
    f.write(new_todo_html)

# Update components/tabs/todo/todo.js
with open('components/tabs/todo/todo.js', 'w', encoding='utf-8') as f:
    f.write("window.__casebook_tabs = window.__casebook_tabs || {};\nwindow.__casebook_tabs['todo'] = `" + new_todo_html.replace('`', '\\`').replace('${', '\\${') + "`;\n")

# Remove from admin.html
new_admin_lines = admin_lines[:start_idx] + admin_lines[end_idx:]
with open('admin.html', 'w', encoding='utf-8') as f:
    f.writelines(new_admin_lines)

print(f"Successfully extracted {end_idx - start_idx} lines of Todo modals to components/tabs/todo/todo.html.")
print(f"New admin.html total lines: {len(new_admin_lines)}")
