import re
with open('d:/caseBook/DATA_MODULARIZATION_ROADMAP.html', 'r', encoding='utf-8') as f:
    html = f.read()

pattern = r'(<td>.*?<code>services/supabaseClient\.js</code>.*?<td>)<span.*?>? Queued</span>(</td>)'
html = re.sub(pattern, r'\1<span class="status-done">? Done</span>\2', html, flags=re.DOTALL)

with open('d:/caseBook/DATA_MODULARIZATION_ROADMAP.html', 'w', encoding='utf-8') as f:
    f.write(html)
