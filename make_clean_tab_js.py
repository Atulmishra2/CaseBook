import os

tabs_dir = 'd:/caseBook/components/tabs'
backtick = chr(96)

for tab_name in os.listdir(tabs_dir):
    tab_path = os.path.join(tabs_dir, tab_name)
    if not os.path.isdir(tab_path): continue
    
    html_file = os.path.join(tab_path, f"{tab_name}.html")
    js_file = os.path.join(tab_path, f"{tab_name}.js")
    
    if os.path.exists(html_file):
        with open(html_file, 'r', encoding='utf-8', errors='ignore') as f:
            html_content = f.read()
            
        clean_html = html_content.replace('\\', '\\\\').replace(backtick, '\\' + backtick)
        
        js_payload = (
            "window.__casebook_tabs = window.__casebook_tabs || {};\n"
            f"window.__casebook_tabs['{tab_name}'] = " + backtick + clean_html + backtick + ";\n"
        )
        
        with open(js_file, 'w', encoding='utf-8') as f:
            f.write(js_payload)
            
        print(f"Clean payload only written to {js_file}")
