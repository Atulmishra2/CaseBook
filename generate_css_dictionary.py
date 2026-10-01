import os
import re
import glob

# Collect all CSS classes and their source file locations
class_map = {}

for css_file in sorted(glob.glob('**/*.css', recursive=True)):
    clean_path = css_file.replace('\\', '/')
    with open(css_file, 'r', encoding='utf-8', errors='ignore') as f:
        lines = f.readlines()
        for idx, line in enumerate(lines, 1):
            matches = re.findall(r'\.([a-zA-Z0-9_-]+)', line)
            for cls in matches:
                if cls not in class_map:
                    class_map[cls] = []
                if clean_path not in class_map[cls]:
                    class_map[cls].append(clean_path)

print(f"Total unique CSS classes mapped: {len(class_map)}")
