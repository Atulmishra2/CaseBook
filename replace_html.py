import re

for filename in ['d:\\caseBook\\admin.html', 'd:\\caseBook\\index.html']:
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    pattern = re.compile(r'            <div id="all" class="tab">.*?<div class="all-cases-pagination-controls" id="allCasesPaginationControls"></div>\n                    </div>\n                </div>\n            </div>', re.DOTALL)
    
    new_content = pattern.sub('            <div id="all" class="tab" data-tab-src="components/tabs/all/all.html"></div>', content)
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(new_content)
