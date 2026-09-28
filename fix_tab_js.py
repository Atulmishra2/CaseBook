import os
import re

tabs_dir = 'd:/caseBook/components/tabs'
for tab in os.listdir(tabs_dir):
    tab_path = os.path.join(tabs_dir, tab)
    if os.path.isdir(tab_path):
        html_file = os.path.join(tab_path, f'{tab}.html')
        js_file = os.path.join(tab_path, f'{tab}.js')
        
        if os.path.exists(html_file) and os.path.exists(js_file):
            with open(html_file, 'r', encoding='utf-8', errors='replace') as f:
                html_content = f.read()
            
            # Escape for template literal
            html_content = html_content.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')
            
            with open(js_file, 'r', encoding='utf-8', errors='replace') as f:
                js_content = f.read()
            
            # Remove any existing broken assignment
            js_content = re.sub(r"window\.__casebook_tabs\['" + tab + r"'\]\s*=\s*[\s\S]*?(?=function\s|window\.|let\s|const\s|var\s|//|$)", '', js_content)
            js_content = re.sub(r"window\.__casebook_tabs\s*=\s*window\.__casebook_tabs\s*\|\|\s*\{\};\n?", '', js_content)
            
            new_js = f"window.__casebook_tabs = window.__casebook_tabs || {{}};\nwindow.__casebook_tabs['{tab}'] = `{html_content}`;\n\n{js_content.strip()}"
            
            with open(js_file, 'w', encoding='utf-8') as f:
                f.write(new_js)
            print(f"Fixed: {js_file}")
