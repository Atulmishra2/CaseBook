import re

with open('d:/caseBook/admin.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract from <div id="about" class="tab"> up to the end before <!-- ===== FIXED SITE FOOTER...
pattern = r'(?s)(<div id="about" class="tab">.*?)</div>\s*<!-- ===== FIXED SITE FOOTER'
match = re.search(pattern, html)
if match:
    about_html = match.group(1) + "</div>\n"
    
    import os
    os.makedirs('d:/caseBook/components/tabs/about', exist_ok=True)
    with open('d:/caseBook/components/tabs/about/about.html', 'w', encoding='utf-8') as f:
        f.write(about_html)
        
    replacement = '<div id="about" class="tab" data-tab-src="components/tabs/about/about.html"></div>\n        </div>\n\n        <!-- ===== FIXED SITE FOOTER'
    new_html = re.sub(pattern, replacement, html)
    
    # Inject script and css tags
    new_html = new_html.replace('<link rel="stylesheet" href="components/tabs/themes/themes.css">', '<link rel="stylesheet" href="components/tabs/themes/themes.css">\n    <link rel="stylesheet" href="components/tabs/about/about.css">')
    new_html = new_html.replace('<script src="components/tabs/themes/themes.js" defer></script>', '<script src="components/tabs/themes/themes.js" defer></script>\n    <script src="components/tabs/about/about.js" defer></script>')
    
    with open('d:/caseBook/admin.html', 'w', encoding='utf-8') as f:
        f.write(new_html)
        
    print("Successfully extracted about HTML!")
else:
    print("Could not match about HTML!")
