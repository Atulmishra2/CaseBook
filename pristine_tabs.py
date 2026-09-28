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
            lines = f.readlines()
        
        first_line_idx = -1
        for i, line in enumerate(lines):
            if line.strip():
                first_line_idx = i
                break
        
        if first_line_idx != -1 and f'id="{tab_name}"' in lines[first_line_idx]:
            lines = lines[first_line_idx+1:]
            for i in range(len(lines)-1, -1, -1):
                if lines[i].strip() == '</div>':
                    lines = lines[:i]
                    break
            
            clean_html = "".join(lines)
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(clean_html)
            print(f"Pristine strip outer div from {html_file}")
            
    if os.path.exists(js_file):
        with open(js_file, 'r', encoding='utf-8', errors='ignore') as f:
            js = f.read()
        
        if os.path.exists(html_file):
            with open(html_file, 'r', encoding='utf-8') as f:
                clean_html = f.read()
            
            clean_html_escaped = clean_html.replace('', '\\')
            
            js_code = ""
            marker = f"window.__casebook_tabs['{tab_name}'] = "
            if marker in js:
                parts = js.split(marker)
                if len(parts) > 1:
                    rest = parts[1]
                    end_idx = rest.find(";\n")
                    if end_idx == -1:
                        end_idx = rest.find(";")
                    if end_idx != -1:
                        js_code = rest[end_idx+2:]
            
            header = "window.__casebook_tabs = window.__casebook_tabs || {};\n" + f"window.__casebook_tabs['{tab_name}'] = "
            new_js = header + clean_html_escaped + ";\n" + js_code.strip()
            with open(js_file, 'w', encoding='utf-8') as f:
                f.write(new_js)
            print(f"Cleaned payload in {js_file}")

