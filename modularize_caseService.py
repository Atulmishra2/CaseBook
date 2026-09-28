import re

with open('d:/caseBook/admin.js', 'r', encoding='utf-8') as f:
    admin_js = f.read()

# Extract from async function fetchAllDataFromSupabase down to cascadeUpdateCaseNumber
pattern = r'(?s)(async function fetchAllDataFromSupabase.*?)(async function addCourtToSupabase)'
match = re.search(pattern, admin_js)

if match:
    extracted = match.group(1)
    
    with open('d:/caseBook/services/caseService.js', 'w', encoding='utf-8') as f:
        # Prepend missing variables or comments
        f.write('// ==============================================================================\n')
        f.write('// Case Data Service (Supabase CRUD)\n')
        f.write('// ==============================================================================\n\n')
        f.write(extracted)
        f.write('\n')
        
        # Add window exports
        f.write('// Expose to window\n')
        f.write('window.fetchAllDataFromSupabase = fetchAllDataFromSupabase;\n')
        f.write('window.performPostCrudRefresh = performPostCrudRefresh;\n')
        f.write('window.checkCaseNumberExists = checkCaseNumberExists;\n')
        f.write('window.addCaseToSupabase = addCaseToSupabase;\n')
        f.write('window.updateCaseInSupabase = updateCaseInSupabase;\n')
        f.write('window.deleteCaseFromSupabase = deleteCaseFromSupabase;\n')
        f.write('window.updateCaseTableHearing = updateCaseTableHearing;\n')
        f.write('window.updateHearingInSupabase = updateHearingInSupabase;\n')
        f.write('window.cascadeUpdateCourtName = cascadeUpdateCourtName;\n')
        f.write('window.cascadeUpdateCaseNumber = cascadeUpdateCaseNumber;\n')
        
    replacement = '// [MODULARIZED] Case CRUD logic and cascades moved to services/caseService.js\n\n\\2'
    new_admin_js = re.sub(pattern, replacement, admin_js)
    
    with open('d:/caseBook/admin.js', 'w', encoding='utf-8') as f:
        f.write(new_admin_js)
        
    print("Successfully extracted caseService.js!")
else:
    print("Could not find the block in admin.js!")

