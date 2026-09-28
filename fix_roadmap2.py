import re

with open('d:/caseBook/DATA_MODULARIZATION_ROADMAP.html', 'r', encoding='utf-8') as f:
    roadmap = f.read()

roadmap = re.sub(r'<span class="status-done">.*?</span>', r'<span class="status-done">&#x2705; Done</span>', roadmap)

with open('d:/caseBook/DATA_MODULARIZATION_ROADMAP.html', 'w', encoding='utf-8') as f:
    f.write(roadmap)
