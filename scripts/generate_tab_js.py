import sys
import os

if len(sys.argv) < 2:
    print("Usage: python scripts/generate_tab_js.py <tab-name>")
    sys.exit(1)

tab_name = sys.argv[1].strip().lower()
tab_dir = os.path.join("components", "tabs", tab_name)
html_file = os.path.join(tab_dir, f"{tab_name}.html")
js_file = os.path.join(tab_dir, f"{tab_name}.js")

if not os.path.exists(html_file):
    print(f"Error: {html_file} does not exist!")
    sys.exit(1)

with open(html_file, "r", encoding="utf-8") as f:
    content = f.read()

escaped = content.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")

js_content = f"""// Companion script for offline file:/// double-click compatibility
window.__casebook_tabs = window.__casebook_tabs || {{}};
window.__casebook_tabs['{tab_name}'] = `{escaped}`;
"""

with open(js_file, "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Successfully generated {js_file} ({len(js_content)} chars)")
