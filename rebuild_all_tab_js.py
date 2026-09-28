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
            
        # Find where JS logic starts (e.g. function, var, let, const, window., document.)
        # Or look for function init... or render...
        lines = js_content.split('\n')
        js_code_lines = []
        in_js = False
        
        for line in lines:
            if not in_js:
                # check if line starts actual js code (not HTML template payload)
                if line.strip().startswith('function ') or line.strip().startswith('var ') or line.strip().startswith('let ') or line.strip().startswith('const ') or line.strip().startswith('window.') or line.strip().startswith('document.') or line.strip().startswith('if (') or line.strip().startswith('//') or line.strip().startswith('/*'):
                    if 'window.__casebook_tabs' not in line:
                        in_js = True
            if in_js:
                js_code_lines.append(line)
                
        js_code = "\n".join(js_code_lines)
        
        # Escape backticks in html_content
        html_escaped = html_content.replace('', '\\')
        
        new_js = f"window.__casebook_tabs = window.__casebook_tabs || {{}};\nwindow.__casebook_tabs['{tab_name}'] = {html_escaped};\n\n" + js_code.strip()
        
        with open(js_file, 'w', encoding='utf-8') as f:
            f.write(new_js)
            
        print(f"Rebuilt pristine {js_file}")
