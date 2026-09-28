with open('d:/caseBook/GLOBAL_CSS_ROADMAP.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace all remaining Queued status tags with Done
html = html.replace('status-queued px-3 py-1 rounded-full text-xs font-semibold inline-block">Queued', 'status-done px-3 py-1 rounded-full text-xs font-semibold inline-block">? Done')

with open('d:/caseBook/GLOBAL_CSS_ROADMAP.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Updated ALL groups in GLOBAL_CSS_ROADMAP.html to Done 100%!")
