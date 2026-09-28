import re

with open('d:/caseBook/components/tabs/helpers/helpers.js', 'r', encoding='utf-8') as f:
    js = f.read()

js = js.replace('''      if (e.target === deleteHelperModal) {
        closeDeleteHelperModal();
      }
}
window.initHelpersTab = initHelpersTab;''', '''      if (e.target === deleteHelperModal) {
        closeDeleteHelperModal();
      }
    });
  }
}
window.initHelpersTab = initHelpersTab;''')

with open('d:/caseBook/components/tabs/helpers/helpers.js', 'w', encoding='utf-8') as f:
    f.write(js)
