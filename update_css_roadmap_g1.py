with open('d:/caseBook/GLOBAL_CSS_ROADMAP.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace Group 1 queued status with Done
target = '''                        <td class="p-4 text-center">
                            <span class="status-queued px-3 py-1 rounded-full text-xs font-semibold inline-block">Queued</span>
                        </td>'''

replacement = '''                        <td class="p-4 text-center">
                            <span class="status-done px-3 py-1 rounded-full text-xs font-semibold inline-block">? Done</span>
                        </td>'''

html = html.replace(target, replacement, 1)

with open('d:/caseBook/GLOBAL_CSS_ROADMAP.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Updated GLOBAL_CSS_ROADMAP.html status for Group 1 to Done!")
