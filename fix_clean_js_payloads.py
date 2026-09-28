import os

tabs_dir = 'd:/caseBook/components/tabs'

for tab_name in os.listdir(tabs_dir):
    tab_path = os.path.join(tabs_dir, tab_name)
    if not os.path.isdir(tab_path): continue
    
    html_file = os.path.join(tab_path, f"{tab_name}.html")
    js_file = os.path.join(tab_path, f"{tab_name}.js")
    
    if os.path.exists(html_file) and os.path.exists(js_file):
        with open(html_file, 'r', encoding='utf-8', errors='ignore') as f:
            html_content = f.read()
            
        with open(js_file, 'r', encoding='utf-8', errors='ignore') as f:
            js_content = f.read()
            
        # Extract JS logic after the payload definition
        js_lines = js_content.split('\n')
        js_code_lines = []
        in_js = False
        
        for line in js_lines:
            if not in_js:
                if line.strip().startswith('function ') or line.strip().startswith('var ') or line.strip().startswith('let ') or line.strip().startswith('const ') or line.strip().startswith('window.') or line.strip().startswith('document.') or line.strip().startswith('if (') or line.strip().startswith('//') or line.strip().startswith('/*'):
                    if 'window.__casebook_tabs' not in line:
                        in_js = True
            if in_js:
                js_code_lines.append(line)
                
        js_code = "\n".join(js_code_lines)
        
        # Safely escape backslashes and backticks for JS template literal
        html_escaped = html_content.replace('\\', '\\\\').replace('', '\\')
        
        payload_header = f"window.__casebook_tabs = window.__casebook_tabs || {{}};\nwindow.__casebook_tabs['{tab_name}'] = {html_escaped};\n\n"
        final_js = payload_header + js_code.strip()
        
        with open(js_file, 'w', encoding='utf-8') as f:
            f.write(final_js)
            
        print(f"Cleanly re-packed JS tab payload for {tab_name}")
