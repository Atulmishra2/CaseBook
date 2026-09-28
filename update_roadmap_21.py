import re

with open('d:/caseBook/MODULARIZATION_ROADMAP.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Fix Tab 21
html = re.sub(r'(<code>#about</code>.*?<span[^>]*>).*?(Queued</span>)', r'\1? Done\2', html, flags=re.DOTALL)
html = html.replace('<span style="color: #64748b; font-weight: 600">? Done</span>', '<span class="status-done">? Done</span>')

with open('d:/caseBook/MODULARIZATION_ROADMAP.html', 'w', encoding='utf-8') as f:
    f.write(html)
