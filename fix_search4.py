import re

with open('d:/caseBook/components/tabs/search/search.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Remove the previously added }
js = js.replace('}\nwindow.renderAdvancedSearchResults = renderAdvancedSearchResults;', 'window.renderAdvancedSearchResults = renderAdvancedSearchResults;')

# Find where matches.forEach ends
# It ends with:
#   });
# 
# // ==============================================================================
# // My Daily Cause List
match_end = js.find('  });\n\n// ==============================================================================')
if match_end != -1:
    js = js[:match_end + 6] + '\n}\n' + js[match_end + 6:]
else:
    # try another format
    match_end = js.find('  });\n\n// Companion')
    if match_end != -1:
        js = js[:match_end + 6] + '\n}\n' + js[match_end + 6:]
    else:
        # just find where   }); is before let currentCauseListDate
        match_end = js.rfind('  });', 0, js.find('let currentCauseListDate'))
        if match_end != -1:
            js = js[:match_end + 6] + '\n}\n' + js[match_end + 6:]

with open('d:/caseBook/components/tabs/search/search.js', 'w', encoding='utf-8') as f:
    f.write(js)
