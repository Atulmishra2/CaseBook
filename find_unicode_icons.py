import os
import re

scale_emoji = '\u2696'
corrupt_seq = 'âš'

found = []
for root, dirs, files in os.walk('d:/caseBook'):
    if 'node_modules' in root or '.git' in root: continue
    for file in files:
        if file.endswith(('.html', '.js', '.css')):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            if scale_emoji in content or corrupt_seq in content or 'â' in content:
                found.append(filepath)

print("Files with scale icon or unicode artifact:")
for f in found:
    print(f)
