import os

tabs_dir = 'd:/caseBook/components/tabs'
backtick = chr(96)

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
            
        lines = js_content.split('\n')
        js_code_lines = []
        in_js = False
        
        for line in lines:
            stripped = line.strip()
            if not in_js:
                if (stripped.startswith('function ') or 
                    stripped.startswith('var ') or 
                    stripped.startswith('let ') or 
                    stripped.startswith('const ') or 
                    stripped.startswith('window.') or 
                    stripped.startswith('document.') or 
                    stripped.startswith('if (') or 
                    stripped.startswith('//') or 
                    stripped.startswith('/*')):
                    if 'window.__casebook_tabs' not in line:
                        in_js = True
                        js_code_lines.append(line)
            else:
                js_code_lines.append(line)
                
        js_code = "\n".join(js_code_lines)
        
        clean_html = html_content.replace('\\', '\\\\').replace(backtick, '\\' + backtick)
        
        payload = "window.__casebook_tabs = window.__casebook_tabs || {};\n" + \
                  "window.__casebook_tabs['" + tab_name + "'] = " + backtick + clean_html + backtick + ";\n\n"
                  
        final_js = payload + js_code.strip()
        
        with open(js_file, 'w', encoding='utf-8') as f:
            f.write(final_js)
            
        print(f"Re-packed JS with included function signature for {tab_name}")
