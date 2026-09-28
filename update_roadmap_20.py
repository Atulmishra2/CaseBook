import re
with open('d:/caseBook/MODULARIZATION_ROADMAP.html', 'r', encoding='utf-8') as f:
    html = f.read()

pattern = r'(<td>.*?<code>#themes</code>\s*\).*?</td>\s*<td>.*?</td>\s*<td>.*?</td>\s*<td>)<span.*?>? Queued</span>(</td>)'
html = re.sub(pattern, r'\1<td class="status-done">? Done</td>\2', html, flags=re.DOTALL)

with open('d:/caseBook/MODULARIZATION_ROADMAP.html', 'w', encoding='utf-8') as f:
    f.write(html)
