import os
import re

admin_html_path = r"d:\caseBook\admin.html"
admin_css_path = r"d:\caseBook\admin.css"
target_dir = r"d:\caseBook\components\tabs\transfer"
target_html_path = os.path.join(target_dir, "transfer.html")
target_css_path = os.path.join(target_dir, "transfer.css")

os.makedirs(target_dir, exist_ok=True)

# 1. Read admin.html
with open(admin_html_path, 'r', encoding='utf-8') as f:
    html_content = f.read()

# Locate <div id="transfer" class="tab"> ... </div>
pattern = r'(<div id="transfer" class="tab">)(.*?)(</div>\s*<!-- Delete Case tab:)'
match = re.search(pattern, html_content, re.DOTALL)
if not match:
    print("ERROR: Could not find #transfer tab in admin.html")
    exit(1)

inner_html = match.group(2).strip()

# Ensure root card wrapper has tab-card-wrapper class
if 'class="form-container"' in inner_html:
    inner_html = inner_html.replace('class="form-container"', 'class="form-container tab-card-wrapper"', 1)
    print("Added tab-card-wrapper to root card in transfer.html")

with open(target_html_path, 'w', encoding='utf-8') as f:
    f.write(inner_html + '\n')

print(f"Extracted transfer.html: {len(inner_html.splitlines())} lines written to {target_html_path}")

# 2. Extract CSS from admin.css
with open(admin_css_path, 'r', encoding='utf-8') as f:
    css_content = f.read()

# Locate the transfer section in admin.css (.transfer-selected-card to before .calendar-grid-container)
css_start_needle = ".transfer-selected-card {"
css_end_marker = "/* --- Mobile Responsive Enhancements: Calendar Grid & To-Do Dashboard --- */"

start_idx = css_content.find(css_start_needle)
if start_idx != -1:
    end_idx = css_content.find(css_end_marker, start_idx)
    if end_idx != -1:
        extracted_css = css_content[start_idx:end_idx].strip()
        print(f"Extracted {len(extracted_css.splitlines())} lines of CSS for transfer.css")

        dark_overrides = """
/* Component Overrides & Dark Theme Support */
[data-theme="dark"] #transfer .transfer-selected-card,
[data-theme="dark"] #transfer .bulk-origin-card {
  background: #1e293b !important;
  border-color: #334155 !important;
}

[data-theme="dark"] #transfer .transfer-case-title {
  color: #f8fafc !important;
}

[data-theme="dark"] #transfer .transfer-case-no {
  background: #0f172a !important;
  border-color: #334155 !important;
  color: #f8fafc !important;
}

[data-theme="dark"] #transfer .transfer-meta-grid {
  background: #0f172a !important;
  border-color: #334155 !important;
}

[data-theme="dark"] #transfer .transfer-meta-item .meta-val {
  color: #f8fafc !important;
}

[data-theme="dark"] #transfer .transfer-nav-toggle-bar {
  background: #0f172a !important;
  border-color: #334155 !important;
}

[data-theme="dark"] #transfer .transfer-tab-btn.active {
  background: #1e293b !important;
  color: #67e8f9 !important;
}

[data-theme="dark"] #transfer .bulk-select-action-bar {
  background: #0f172a !important;
  border-color: #334155 !important;
}
"""
        transfer_css_full = "/* === CaseBook - Transfer Case Component (#transfer) ===\n * Dedicated styles for Single and Bulk Inter-Court Case Transfers & Audit Registry\n */\n\n" + extracted_css + "\n" + dark_overrides

        with open(target_css_path, 'w', encoding='utf-8') as f:
            f.write(transfer_css_full.strip() + '\n')
        print(f"Created transfer.css at {target_css_path}")

        # Remove extracted section from admin.css
        css_content = css_content[:start_idx] + css_content[end_idx:]
        with open(admin_css_path, 'w', encoding='utf-8') as f:
            f.write(css_content)
        print("Trimmed transfer CSS from admin.css")
    else:
        print("WARNING: Could not find exact boundaries for transfer CSS in admin.css")
else:
    print("WARNING: '.transfer-selected-card' not found in admin.css")

# 3. Update admin.html
new_tab_snippet = '<div id="transfer" class="tab" data-tab-src="components/tabs/transfer/transfer.html"></div>'
replacement = f'{new_tab_snippet}\n\n            <!-- Delete Case tab:'
new_html_content = html_content[:match.start()] + replacement + html_content[match.end():]

# Add link tag in head if not already present
link_tag = '    <link rel="stylesheet" href="components/tabs/transfer/transfer.css">\n'
if 'components/tabs/transfer/transfer.css' not in new_html_content:
    target_pos = new_html_content.find('<link rel="stylesheet" href="components/tabs/hearing/hearing.css">')
    if target_pos != -1:
        insert_after = target_pos + len('<link rel="stylesheet" href="components/tabs/hearing/hearing.css">\n')
        new_html_content = new_html_content[:insert_after] + link_tag + new_html_content[insert_after:]
        print("Added transfer.css <link> to admin.html <head>")

# Add script tag before admin.js if not already present
script_tag = '    <script src="components/tabs/transfer/transfer.js" defer></script>\n'
if 'components/tabs/transfer/transfer.js' not in new_html_content:
    target_script = '<script src="components/tabs/hearing/hearing.js" defer></script>\n'
    target_pos = new_html_content.find(target_script)
    if target_pos != -1:
        insert_after = target_pos + len(target_script)
        new_html_content = new_html_content[:insert_after] + script_tag + new_html_content[insert_after:]
        print("Added transfer.js <script> to admin.html")

with open(admin_html_path, 'w', encoding='utf-8') as f:
    f.write(new_html_content)

print("admin.html updated successfully for tab #transfer!")
