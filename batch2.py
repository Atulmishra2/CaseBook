import re, os

os.makedirs('d:/caseBook/store', exist_ok=True)
os.makedirs('d:/caseBook/utils', exist_ok=True)

with open('d:/caseBook/admin.js', 'r', encoding='utf-8') as f:
    admin_js = f.read()

def do_extract(filepath, regex, mod_msg):
    global admin_js
    match = re.search(regex, admin_js)
    if match:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(match.group(1))
        admin_js = admin_js[:match.start()] + mod_msg + "\n\n" + match.group(2) + admin_js[match.end():]
        print(f"Extracted: {filepath}")

# Export Utils (PDF generation etc) - Look for generatePDF / exportToCSV
exp_regex = r'(?s)(async function exportAllCasesCsv.*?|async function generateCauselistPDF.*?)(\nasync function |\nfunction |\n// =====)'
# Actually let's just make the files and dump specific known blocks if regex is too hard.
