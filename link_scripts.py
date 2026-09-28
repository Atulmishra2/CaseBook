for filename in ['d:\\caseBook\\admin.html', 'd:\\caseBook\\index.html']:
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # insert css link
    content = content.replace('<link rel="stylesheet" href="components/tabs/search/search.css">', '<link rel="stylesheet" href="components/tabs/search/search.css">\n    <link rel="stylesheet" href="components/tabs/all/all.css">')
    
    # insert js script
    content = content.replace('<script src="components/tabs/search/search.js" defer></script>', '<script src="components/tabs/search/search.js" defer></script>\n    <script src="components/tabs/all/all.js" defer></script>')
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
