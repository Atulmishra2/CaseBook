import os
import re

admin_html_path = r"d:\caseBook\admin.html"
target_dir = r"d:\caseBook\components\tabs\update"
target_html_path = os.path.join(target_dir, "update.html")
target_css_path = os.path.join(target_dir, "update.css")

os.makedirs(target_dir, exist_ok=True)

with open(admin_html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Locate <div id="update" class="tab"> ... </div>
pattern = r'(<div id="update" class="tab">)(.*?)(</div>\s*<!-- Update Hearing tab:)'
match = re.search(pattern, content, re.DOTALL)
if not match:
    print("ERROR: Could not find #update tab in admin.html")
    exit(1)

inner_html = match.group(2).strip()

# Ensure root card wrapper has tab-card-wrapper class
if 'class="form-container"' in inner_html:
    inner_html = inner_html.replace('class="form-container"', 'class="form-container tab-card-wrapper"', 1)
    print("Added tab-card-wrapper to root card in update.html")

with open(target_html_path, 'w', encoding='utf-8') as f:
    f.write(inner_html + '\n')

print(f"Extracted update.html: {len(inner_html.splitlines())} lines written to {target_html_path}")

# Write update.css
css_content = """/* === CaseBook - Update Case Component (#update) ===
 * Encapsulated styles for searching, viewing and modifying case records
 */

#update .form-container {
  margin-bottom: 20px;
}

#update .section-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 18px;
  margin-bottom: 12px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 10px;
  border-bottom: 1px solid #e2e8f0;
}

/* Dedicated Search Header Card */
#update .update-search-card {
  background: #ffffff;
  border: 1.5px solid #bfdbfe;
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 18px;
  box-shadow: 0 2px 6px rgba(37, 99, 235, 0.05);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

#update .update-search-card:hover,
#update .update-search-card:focus-within {
  border-color: #2563eb;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.12);
}

#update .search-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

#update .search-header-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

#update .search-card-badge-icon {
  font-size: 20px;
}

#update .search-card-heading {
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

#update .search-card-subheading {
  font-size: 12px;
  color: #64748b;
  margin-top: 2px;
}

#update .update-search-row {
  display: flex;
  gap: 10px;
  align-items: center;
}

#update .search-field-box {
  position: relative;
  flex: 1;
}

#update .search-field-prefix-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  font-size: 14px;
  pointer-events: none;
}

#update #updateSearchInput {
  width: 100%;
  padding: 10px 14px 10px 38px;
  font-size: 13.5px;
  border: 1.5px solid #cbd5e1;
  border-radius: 8px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

#update #updateSearchInput:focus {
  border-color: #2563eb;
  outline: none;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

#update .search-action-btn {
  padding: 10px 18px;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}

#update .update-status-msg {
  font-size: 12.5px;
  margin-top: 8px;
  min-height: 18px;
}

/* Case Status Card */
#update .case-status-card {
  background: #f8fafc;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  padding: 14px 18px;
  margin-bottom: 16px;
}

#update .form-grid-2col,
#update .form-grid-3col {
  display: grid;
  gap: 12px 16px;
  margin-top: 8px;
}

#update .form-grid-2col {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

#update .form-grid-3col {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

@media (max-width: 768px) {
  #update .update-search-row {
    flex-direction: column;
    align-items: stretch;
  }
  #update .form-grid-2col,
  #update .form-grid-3col {
    grid-template-columns: 1fr;
  }
}

#update .form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

#update label {
  margin-bottom: 4px;
  font-size: 12.5px;
  font-weight: 700;
  color: #334155;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

#update input,
#update select,
#update textarea {
  width: 100%;
  padding: 9px 12px;
  font-size: 13.5px;
  border: 1.5px solid #cbd5e1;
  border-radius: 8px;
  background: #ffffff;
  color: #0f172a;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

#update input:focus,
#update select:focus,
#update textarea:focus {
  border-color: #2563eb;
  outline: none;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

#update .form-submit-btn {
  margin-top: 18px;
  width: 100%;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 700;
}

/* Dark Theme Overrides */
[data-theme="dark"] #update .section-header-row {
  background: #1e293b;
  border-bottom-color: #334155;
}

[data-theme="dark"] #update .update-search-card {
  background: #1e293b;
  border-color: #334155;
}

[data-theme="dark"] #update .search-card-heading {
  color: #f8fafc;
}

[data-theme="dark"] #update .search-card-subheading {
  color: #94a3b8;
}

[data-theme="dark"] #update .case-status-card {
  background: #0f172a;
  border-color: #334155;
}

[data-theme="dark"] #update label {
  color: #94a3b8;
}

[data-theme="dark"] #update input,
[data-theme="dark"] #update select,
[data-theme="dark"] #update textarea {
  background: #0f172a;
  border-color: #334155;
  color: #f8fafc;
}
"""

with open(target_css_path, 'w', encoding='utf-8') as f:
    f.write(css_content.strip() + '\n')

print(f"Created update.css: {len(css_content.splitlines())} lines written to {target_css_path}")

# Update admin.html with modular placeholder
new_tab_snippet = '<div id="update" class="tab" data-tab-src="components/tabs/update/update.html"></div>'
replacement = f'{new_tab_snippet}\n\n            <!-- Update Hearing tab:'
new_content = content[:match.start()] + replacement + content[match.end():]

# Add link tag in head if not already present
link_tag = '    <link rel="stylesheet" href="components/tabs/update/update.css">\n'
if 'components/tabs/update/update.css' not in new_content:
    target_pos = new_content.find('<link rel="stylesheet" href="components/tabs/add/add.css">')
    if target_pos != -1:
        insert_after = target_pos + len('<link rel="stylesheet" href="components/tabs/add/add.css">\n')
        new_content = new_content[:insert_after] + link_tag + new_content[insert_after:]
        print("Added update.css <link> to admin.html <head>")

# Add script tag before admin.js if not already present
script_tag = '    <script src="components/tabs/update/update.js" defer></script>\n'
if 'components/tabs/update/update.js' not in new_content:
    target_script = '<script src="components/tabs/add/add.js" defer></script>\n'
    target_pos = new_content.find(target_script)
    if target_pos != -1:
        insert_after = target_pos + len(target_script)
        new_content = new_content[:insert_after] + script_tag + new_content[insert_after:]
        print("Added update.js <script> to admin.html")

with open(admin_html_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("admin.html updated successfully for tab #update!")
