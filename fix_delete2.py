import re

with open('d:/caseBook/components/tabs/delete/delete.js', 'r', encoding='utf-8') as f:
    js = f.read()

js = js.replace('typeBadge.className = case-badge  + cType;', "typeBadge.className = 'case-badge ' + cType;")
js = js.replace("statusBadge.className = status-badge  + (isDisposed ? 'disposed' : 'pending');", "statusBadge.className = 'status-badge ' + (isDisposed ? 'disposed' : 'pending');")
js = js.replace('deleteStatus.textContent = o. Case " + cNum + " found! Review details below before deletion.;', 'deleteStatus.textContent = "o. Case " + cNum + " found! Review details below before deletion.";')
js = js.replace("deleteStatus.textContent = ?O No case found matching \" + q.toUpperCase() + \".;", "deleteStatus.textContent = \"?O No case found matching \" + q.toUpperCase() + \".\";")

with open('d:/caseBook/components/tabs/delete/delete.js', 'w', encoding='utf-8') as f:
    f.write(js)
