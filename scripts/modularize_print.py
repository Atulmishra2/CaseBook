import os

with open('admin.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

replacement = """    <!-- ==========================================================================
         SECTION 4: PRINTABLE DOCUMENTS & PDF EXPORTS (Modularized)
         ========================================================================== -->
    <div id="printTemplatesContainer" data-template-src="components/print/print-templates.html"></div>
"""

new_lines = lines[:1092] + [replacement] + lines[1347:]

# Now add script tag for print-templates.js
final_lines = []
for l in new_lines:
    if 'components/modals/case-modals.js' in l:
        final_lines.append('    <script src="components/print/print-templates.js" defer></script>\n')
    final_lines.append(l)

print('Lines before:', len(lines))
print('Lines after:', len(final_lines))

with open('admin.html', 'w', encoding='utf-8') as f:
    f.writelines(final_lines)

print('admin.html updated successfully!')
