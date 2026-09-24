import re

admin_js_path = r"d:\caseBook\admin.js"

with open(admin_js_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update showTab('add')
target_showtab = """  if (tabId === 'add') {
    renderCaseTypeOptions();
    renderCourtOptions();
    renderCriminalCourtOptions();
    toggleCaseFormByType();
  }"""

replacement_showtab = """  if (tabId === 'add') {
    if (typeof initAddTab === 'function') {
      initAddTab();
    } else {
      renderCaseTypeOptions();
      renderCourtOptions();
      renderCriminalCourtOptions();
      toggleCaseFormByType();
    }
  }"""

if target_showtab in content:
    content = content.replace(target_showtab, replacement_showtab)
    print("Updated showTab('add') hook in admin.js")
else:
    print("WARNING: target_showtab not matched exactly, checking with regex")
    rx = r"if\s*\(\s*tabId\s*===\s*['\"]add['\"]\s*\)\s*\{[\s\S]*?toggleCaseFormByType\(\);\s*\}"
    content = re.sub(rx, replacement_showtab.strip(), content)
    print("Replaced showTab('add') via regex")

# 2. Add initAddTab definition and handleAddCaseSubmit
add_init_code = """
let isSubmittingAddCase = false;
async function handleAddCaseSubmit(e) {
  e.preventDefault();
  if (isSubmittingAddCase) {
    console.warn('Case submission already in progress, duplicate submit blocked.');
    return;
  }
  const form = e.target || document.querySelector('#add form');
  const submitBtn = form ? form.querySelector('button[type="submit"]') : null;
  const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '<i class="fa-solid fa-paper-plane"></i> Submit Case Record';
"""

# Replace the anonymous submit listener with handleAddCaseSubmit
rx_submit = r"let isSubmittingCase = false;\s*document\.querySelector\('#add form'\)\?\.addEventListener\('submit',\s*async function\(e\)\s*\{[\s\S]*?const submitBtn = this\.querySelector\('button\[type=\"submit\"\]'\);\s*const originalBtnHtml = submitBtn \? submitBtn\.innerHTML : '<i class=\"fa-solid fa-plus\"></i> Submit Case';"

if re.search(rx_submit, content):
    content = re.sub(rx_submit, add_init_code.strip(), content)
    print("Converted #add form submit listener to handleAddCaseSubmit")
else:
    print("Searching for submit pattern...")
    # fallback search
    needle = "document.querySelector('#add form')?.addEventListener('submit', async function(e) {"
    if needle in content:
        content = content.replace(needle, "async function handleAddCaseSubmit(e) {")
        print("Replaced needle directly")

# Add initAddTab function
init_add_func = """
function initAddTab() {
  renderCaseTypeOptions();
  renderCourtOptions();
  renderCriminalCourtOptions();
  toggleCaseFormByType();

  const addForm = document.querySelector('#add form');
  if (addForm && !addForm.dataset.bound) {
    addForm.dataset.bound = 'true';
    addForm.addEventListener('submit', handleAddCaseSubmit);
  }

  const caseTypeDropdown = document.getElementById('caseTypeDropdown');
  if (caseTypeDropdown && !caseTypeDropdown.dataset.bound) {
    caseTypeDropdown.dataset.bound = 'true';
    caseTypeDropdown.addEventListener('change', toggleCaseFormByType);
  }

  const addCourtBtn = document.getElementById('addCourtBtn');
  if (addCourtBtn && !addCourtBtn.dataset.bound) {
    addCourtBtn.dataset.bound = 'true';
    addCourtBtn.addEventListener('click', () => {
      showTab('courts');
      setTimeout(() => {
        const courtInput = document.getElementById('courtInput');
        if (courtInput) courtInput.focus();
      }, 120);
    });
  }

  const addCriminalCourtBtn = document.getElementById('addCriminalCourtBtn');
  if (addCriminalCourtBtn && !addCriminalCourtBtn.dataset.bound) {
    addCriminalCourtBtn.dataset.bound = 'true';
    addCriminalCourtBtn.addEventListener('click', () => {
      showTab('courts');
      setTimeout(() => {
        const courtInput = document.getElementById('courtInput');
        if (courtInput) courtInput.focus();
      }, 120);
    });
  }
}
window.initAddTab = initAddTab;
window.handleAddCaseSubmit = handleAddCaseSubmit;
"""

if "function initAddTab()" not in content:
    # insert before window.loadTabContent = loadTabContent;
    target_pos = content.find("window.loadTabContent = loadTabContent;")
    if target_pos != -1:
        content = content[:target_pos] + init_add_func + "\n" + content[target_pos:]
        print("Injected initAddTab() before window.loadTabContent")
    else:
        content += "\n" + init_add_func
        print("Appended initAddTab() at end of admin.js")

with open(admin_js_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("admin.js updated successfully for Tab #add!")
