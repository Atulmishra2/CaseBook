import os
import re

tabs_dir = 'd:/caseBook/components/tabs'

for root, dirs, files in os.walk(tabs_dir):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            
            # If html contains \<\d\i\v or \ \ \ \ or \=
            if '\\<' in content or '\\=' in content or '\\ ' in content:
                # Unescape escaped characters
                clean = re.sub(r'\\(.)', r'\1', content)
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(clean)
                print(f"Unescaped html file: {filepath}")

