import os
import re

admin_html_path = r"d:\caseBook\admin.html"
target_dir = r"d:\caseBook\components\tabs\add"
target_html_path = os.path.join(target_dir, "add.html")
target_css_path = os.path.join(target_dir, "add.css")

os.makedirs(target_dir, exist_ok=True)

with open(admin_html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Locate <div id="add" class="tab"> ... </div>
pattern = r'(<div id="add" class="tab">)(.*?)(</div>\s*<!-- Courts tab:)'
match = re.search(pattern, content, re.DOTALL)
if not match:
    print("ERROR: Could not find #add tab in admin.html")
    exit(1)

inner_html = match.group(2).strip()

with open(target_html_path, 'w', encoding='utf-8') as f:
    f.write(inner_html + '\n')

print(f"Extracted add.html: {len(inner_html.splitlines())} lines written to {target_html_path}")

# Write add.css
css_content = """/* === CaseBook - Add New Case Component (#add) ===
 * Encapsulated styles for case registration forms across all litigation types
 */

#add .form-container {
  margin-bottom: 20px;
}

#add .section-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 18px;
  margin-bottom: 12px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 10px;
  border-bottom: 1px solid #e2e8f0;
}

#add .form-grid-2col,
#add .form-grid-3col {
  display: grid;
  gap: 12px 16px;
  margin-top: 8px;
}

#add .form-grid-2col {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

#add .form-grid-3col {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

@media (max-width: 768px) {
  #add .form-grid-2col,
  #add .form-grid-3col {
    grid-template-columns: 1fr;
  }
}

#add .form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

#add label {
  margin-bottom: 4px;
  font-size: 12.5px;
  font-weight: 700;
  color: #334155;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

#add input,
#add select,
#add textarea {
  width: 100%;
  padding: 9px 12px;
  font-size: 13.5px;
  border: 1.5px solid #cbd5e1;
  border-radius: 8px;
  background: #ffffff;
  color: #0f172a;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

#add input:focus,
#add select:focus,
#add textarea:focus {
  border-color: #3b82f6;
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

#add .court-input-wrapper {
  display: flex;
  gap: 8px;
  align-items: center;
}

#add .mini-court-btn {
  background: #3b82f6;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  width: 36px;
  height: 38px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s ease;
}

#add .mini-court-btn:hover {
  background: #2563eb;
}

#add .remarks-coparties-box {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 12px 16px;
  margin-top: 8px;
}

#add .form-submit-btn {
  margin-top: 18px;
  width: 100%;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 700;
}

/* Dark Theme Overrides */
[data-theme="dark"] #add .section-header-row {
  background: #1e293b;
  border-bottom-color: #334155;
}

[data-theme="dark"] #add label {
  color: #94a3b8;
}

[data-theme="dark"] #add input,
[data-theme="dark"] #add select,
[data-theme="dark"] #add textarea {
  background: #0f172a;
  border-color: #334155;
  color: #f8fafc;
}

[data-theme="dark"] #add .remarks-coparties-box {
  background: #1e293b;
  border-color: #334155;
}
"""

with open(target_css_path, 'w', encoding='utf-8') as f:
    f.write(css_content.strip() + '\n')

print(f"Created add.css: {len(css_content.splitlines())} lines written to {target_css_path}")

# Update admin.html with modular placeholder
new_tab_snippet = '<div id="add" class="tab" data-tab-src="components/tabs/add/add.html"></div>'
replacement = f'{new_tab_snippet}\n\n            <!-- Courts tab:'
new_content = content[:match.start()] + replacement + content[match.end():]

# Add link tag in head if not already present
link_tag = '    <link rel="stylesheet" href="components/tabs/add/add.css">\n'
if 'components/tabs/add/add.css' not in new_content:
    # insert before </head>
    head_idx = new_content.find('</head>')
    new_content = new_content[:head_idx] + link_tag + new_content[head_idx:]
    print("Added add.css <link> to admin.html <head>")

# Add script tag before admin.js if not already present
script_tag = '    <script src="components/tabs/add/add.js" defer></script>\n'
if 'components/tabs/add/add.js' not in new_content:
    # insert before <script src="admin.js"
    admin_js_idx = new_content.find('<script src="admin.js"')
    if admin_js_idx != -1:
        new_content = new_content[:admin_js_idx] + script_tag + new_content[admin_js_idx:]
        print("Added add.js <script> to admin.html before admin.js")

with open(admin_html_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("admin.html updated successfully for tab #add!")
