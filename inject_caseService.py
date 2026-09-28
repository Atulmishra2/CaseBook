def insert_script(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        html = f.read()
    
    html = html.replace('<script src="services/supabaseClient.js"></script>', '<script src="services/supabaseClient.js"></script>\n    <script src="services/caseService.js"></script>')
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(html)

insert_script('d:/caseBook/admin.html')
insert_script('d:/caseBook/index.html')
print("Updated HTML files for caseService.js")
