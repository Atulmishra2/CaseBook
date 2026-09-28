import re

with open('d:/caseBook/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract from <div id="about" class="tab"> up to the end before <!-- ===== FIXED SITE FOOTER...
pattern = r'(?s)(<div id="about" class="tab">.*?)</div>\s*<!-- ===== FIXED SITE FOOTER'
match = re.search(pattern, html)
if match:
    replacement = '<div id="about" class="tab" data-tab-src="components/tabs/about/about.html"></div>\n        </div>\n\n        <!-- ===== FIXED SITE FOOTER'
    new_html = re.sub(pattern, replacement, html)
    
    # Inject script and css tags
    new_html = new_html.replace('<link rel="stylesheet" href="components/tabs/themes/themes.css">', '<link rel="stylesheet" href="components/tabs/themes/themes.css">\n    <link rel="stylesheet" href="components/tabs/about/about.css">')
    new_html = new_html.replace('<script src="components/tabs/themes/themes.js" defer></script>', '<script src="components/tabs/themes/themes.js" defer></script>\n    <script src="components/tabs/about/about.js" defer></script>')
    
    with open('d:/caseBook/index.html', 'w', encoding='utf-8') as f:
        f.write(new_html)
        
    print("Successfully updated index.html!")
else:
    print("Could not match about HTML in index.html!")
