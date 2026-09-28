import os
import re

tabs_dir = 'd:/caseBook/components/tabs'

for tab_name in os.listdir(tabs_dir):
    tab_path = os.path.join(tabs_dir, tab_name)
    if not os.path.isdir(tab_path): continue
    
    html_file = os.path.join(tab_path, f"{tab_name}.html")
    js_file = os.path.join(tab_path, f"{tab_name}.js")
    
    if os.path.exists(html_file):
        with open(html_file, 'r', encoding='utf-8', errors='ignore') as f:
            html = f.read()
        
        # Check if wrapped in <div id="tab_name" class="tab..."> ... </div>
        pattern = rf'^\s*<div\s+id="{tab_name}"\s+class="tab[^"]*">\s*'
        if re.search(pattern, html):
            html = re.sub(pattern, '', html)
            html = re.sub(r'\s*</div>\s*$', '', html)
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(html)
            print(f"Cleaned outer div from {html_file}")
            
    if os.path.exists(js_file):
        with open(js_file, 'r', encoding='utf-8', errors='ignore') as f:
            js = f.read()
        
        if os.path.exists(html_file):
            with open(html_file, 'r', encoding='utf-8') as f:
                clean_html = f.read()
            
            # Avoid escaping issues with backticks inside clean_html if any
            clean_html_escaped = clean_html.replace('', '\\')
            
            js_code = ""
            marker = f"window.__casebook_tabs['{tab_name}'] = "
            if marker in js:
                parts = js.split(marker)
                if len(parts) > 1:
                    end_idx = parts[1].find(";")
                    if end_idx != -1:
                        js_code = parts[1][end_idx+2:]
            
            new_js = "window.__casebook_tabs = window.__casebook_tabs || {};\n" + f"window.__casebook_tabs['{tab_name}'] = " + clean_html_escaped + ";\n" + js_code
            with open(js_file, 'w', encoding='utf-8') as f:
                f.write(new_js)
            print(f"Updated {js_file} with clean html payload!")

