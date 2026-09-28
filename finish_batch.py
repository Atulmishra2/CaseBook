import re
def update_html(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()
    
    scripts = '''<script src="store/globalStore.js"></script>
    <script src="utils/dateUtils.js"></script>
    <script src="utils/uiUtils.js"></script>
    <script src="utils/exportUtils.js"></script>
    <script src="admin.js?v='''
    html = html.replace('<script src="admin.js?v=', scripts)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)

update_html('d:/caseBook/admin.html')
update_html('d:/caseBook/index.html')

with open('d:/caseBook/DATA_MODULARIZATION_ROADMAP.html', 'r', encoding='utf-8') as f:
    roadmap = f.read()

roadmap = re.sub(r'<span class="status-queued">? Queued</span>', r'<span class="status-done">? Done</span>', roadmap)

with open('d:/caseBook/DATA_MODULARIZATION_ROADMAP.html', 'w', encoding='utf-8') as f:
    f.write(roadmap)
