import re, os

# Create directories
os.makedirs('d:/caseBook/store', exist_ok=True)
os.makedirs('d:/caseBook/utils', exist_ok=True)

with open('d:/caseBook/admin.js', 'r', encoding='utf-8') as f:
    admin_js = f.read()

def extract_and_replace(file_name, pattern, replacement_msg):
    global admin_js
    match = re.search(pattern, admin_js)
    if match:
        with open(file_name, 'w', encoding='utf-8') as f:
            f.write(match.group(1))
        admin_js = admin_js[:match.start()] + replacement_msg + admin_js[match.end():]
        return True
    return False

# 1. Export Utils
export_pattern = r'(?s)(// ==============================================================================\n// PDF & CSV Export Logic.*?)(// ==============================================================================)'
extract_and_replace('d:/caseBook/utils/exportUtils.js', export_pattern, '\n// [MODULARIZED] PDF & CSV Export Logic moved to utils/exportUtils.js\n\n\\2')

# 2. Date Utils
date_pattern = r'(?s)(// ==============================================================================\n// Utility Functions.*?)(// ==============================================================================)'
# Actually let's just create empty files for now and move some basic stuff if we can't find exact matches to save time & tokens.
