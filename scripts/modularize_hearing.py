import os
import re

admin_html_path = r"d:\caseBook\admin.html"
admin_css_path = r"d:\caseBook\admin.css"
target_dir = r"d:\caseBook\components\tabs\hearing"
target_html_path = os.path.join(target_dir, "hearing.html")
target_css_path = os.path.join(target_dir, "hearing.css")

os.makedirs(target_dir, exist_ok=True)

# 1. Read admin.html
with open(admin_html_path, 'r', encoding='utf-8') as f:
    html_content = f.read()

# Locate <div id="hearing" class="tab"> ... </div>
pattern = r'(<div id="hearing" class="tab">)(.*?)(</div>\s*<!-- Undated Cases tab:)'
match = re.search(pattern, html_content, re.DOTALL)
if not match:
    print("ERROR: Could not find #hearing tab in admin.html")
    exit(1)

inner_html = match.group(2).strip()

# Ensure root card wrapper has tab-card-wrapper class
if 'class="form-container fd-container"' in inner_html:
    inner_html = inner_html.replace('class="form-container fd-container"', 'class="form-container fd-container tab-card-wrapper"', 1)
    print("Added tab-card-wrapper to root card in hearing.html")

with open(target_html_path, 'w', encoding='utf-8') as f:
    f.write(inner_html + '\n')

print(f"Extracted hearing.html: {len(inner_html.splitlines())} lines written to {target_html_path}")

# 2. Extract CSS from admin.css
with open(admin_css_path, 'r', encoding='utf-8') as f:
    css_content = f.read()

# Locate the Forward Dates tab redesign section in admin.css
css_start_needle = "Forward Dates tab"
css_end_marker = "/* ================= General (no-case) Tasks in Todo ================= */"

start_idx = css_content.find(css_start_needle)
if start_idx != -1:
    comment_start = css_content.rfind("/*", 0, start_idx)
    end_idx = css_content.find(css_end_marker, start_idx)
    if comment_start != -1 and end_idx != -1:
        extracted_css = css_content[comment_start:end_idx].strip()
        print(f"Extracted {len(extracted_css.splitlines())} lines of CSS for hearing.css")

        dark_overrides = """
/* Component Overrides & Dark Theme Support */
[data-theme="dark"] .fd-card,
[data-theme="dark"] .fd-progression {
  background: #1e293b !important;
  border-color: #334155 !important;
}

[data-theme="dark"] .fd-card-head h4,
[data-theme="dark"] .fd-prog-date {
  color: #f8fafc !important;
}

[data-theme="dark"] .fd-prog-box.fd-from {
  background: #0f172a !important;
  border-color: #334155 !important;
}

[data-theme="dark"] .fd-prog-meta b {
  color: #e2e8f0 !important;
}

[data-theme="dark"] .fd-presets .preset-pill,
[data-theme="dark"] .fd-stage-pills .stage-pill {
  background: #0f172a !important;
  border-color: #334155 !important;
  color: #cbd5e1 !important;
}

[data-theme="dark"] .fd-presets .preset-pill:hover,
[data-theme="dark"] .fd-stage-pills .stage-pill:hover {
  background: #1e293b !important;
  border-color: #7c3aed !important;
  color: #a78bfa !important;
}
"""
        hearing_css_full = "/* === CaseBook - Forward Hearing Dates Component (#hearing) ===\n * Complete Forward Dates (fd-*) styles with date progression, stage pills & presets\n */\n\n" + extracted_css + "\n" + dark_overrides

        with open(target_css_path, 'w', encoding='utf-8') as f:
            f.write(hearing_css_full.strip() + '\n')
        print(f"Created hearing.css at {target_css_path}")

        # Remove extracted section from admin.css
        css_content = css_content[:comment_start] + css_content[end_idx:]
        with open(admin_css_path, 'w', encoding='utf-8') as f:
            f.write(css_content)
        print("Trimmed forward dates CSS from admin.css")
    else:
        print("WARNING: Could not find exact boundaries for forward dates CSS in admin.css")
else:
    print("WARNING: 'Forward Dates tab' not found in admin.css")

# 3. Update admin.html
new_tab_snippet = '<div id="hearing" class="tab" data-tab-src="components/tabs/hearing/hearing.html"></div>'
replacement = f'{new_tab_snippet}\n\n            <!-- Undated Cases tab:'
new_html_content = html_content[:match.start()] + replacement + html_content[match.end():]

# Add link tag in head if not already present
link_tag = '    <link rel="stylesheet" href="components/tabs/hearing/hearing.css">\n'
if 'components/tabs/hearing/hearing.css' not in new_html_content:
    target_pos = new_html_content.find('<link rel="stylesheet" href="components/tabs/update/update.css">')
    if target_pos != -1:
        insert_after = target_pos + len('<link rel="stylesheet" href="components/tabs/update/update.css">\n')
        new_html_content = new_html_content[:insert_after] + link_tag + new_html_content[insert_after:]
        print("Added hearing.css <link> to admin.html <head>")

# Add script tag before admin.js if not already present
script_tag = '    <script src="components/tabs/hearing/hearing.js" defer></script>\n'
if 'components/tabs/hearing/hearing.js' not in new_html_content:
    target_script = '<script src="components/tabs/update/update.js" defer></script>\n'
    target_pos = new_html_content.find(target_script)
    if target_pos != -1:
        insert_after = target_pos + len(target_script)
        new_html_content = new_html_content[:insert_after] + script_tag + new_html_content[insert_after:]
        print("Added hearing.js <script> to admin.html")

with open(admin_html_path, 'w', encoding='utf-8') as f:
    f.write(new_html_content)

print("admin.html updated successfully for tab #hearing!")
