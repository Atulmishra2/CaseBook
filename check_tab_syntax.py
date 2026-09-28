import os
import subprocess

tabs_dir = 'd:/caseBook/components/tabs'
errors = []

for root, dirs, files in os.walk(tabs_dir):
    for file in files:
        if file.endswith('.js'):
            filepath = os.path.join(root, file)
            res = subprocess.run(['node', '-c', filepath], capture_output=True, text=True)
            if res.returncode != 0:
                errors.append(f"{file}: {res.stderr.strip()}")

if errors:
    print("Syntax Errors Found:")
    for err in errors:
        print(err)
else:
    print("ALL TAB JS FILES PASSED SYNTAX CHECK 100% CLEAN!")
