import os
import re

for root, dirs, files in os.walk('d:/caseBook'):
    if 'node_modules' in root or '.git' in root: continue
    for file in files:
        if file.endswith('.js'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            if 'Object.defineProperty' in content:
                print(f"Found Object.defineProperty in {filepath}")
