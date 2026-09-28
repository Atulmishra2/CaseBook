import os

tabs_dir = 'd:/caseBook/components/tabs'
for tab in os.listdir(tabs_dir):
    tab_path = os.path.join(tabs_dir, tab)
    if os.path.isdir(tab_path):
        js_file = os.path.join(tab_path, f'{tab}.js')
        if os.path.exists(js_file):
            with open(js_file, 'r', encoding='utf-8', errors='replace') as f:
                js_content = f.read()
            
            parts = js_content.split(';', 1)
            if len(parts) == 2:
                header = parts[0] + ';'
                logic = parts[1].replace('\\\\', '').replace('\\', '')
                
                with open(js_file, 'w', encoding='utf-8') as f:
                    f.write(header + logic)
            print(f"Fixed backticks: {js_file}")
