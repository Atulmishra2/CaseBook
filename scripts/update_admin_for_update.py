import re

admin_js_path = r"d:\caseBook\admin.js"

with open(admin_js_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update showTab('update')
target_showtab = """  if (tabId === 'update') {
    renderCaseTypeOptions();
    renderCourtOptions();
    renderCriminalCourtOptions();
    toggleUpdateCaseFormByType();
  }"""

replacement_showtab = """  if (tabId === 'update') {
    if (typeof initUpdateTab === 'function') {
      initUpdateTab();
    } else {
      renderCaseTypeOptions();
      renderCourtOptions();
      renderCriminalCourtOptions();
      toggleUpdateCaseFormByType();
    }
  }"""

if target_showtab in content:
    content = content.replace(target_showtab, replacement_showtab)
    print("Updated showTab('update') hook in admin.js")
else:
    rx = r"if\s*\(\s*tabId\s*===\s*['\"]update['\"]\s*\)\s*\{[\s\S]*?toggleUpdateCaseFormByType\(\);\s*\}"
    content = re.sub(rx, replacement_showtab.strip(), content)
    print("Replaced showTab('update') via regex")

# 2. Add initUpdateTab function definition
init_update_func = """
function initUpdateTab() {
  renderCaseTypeOptions();
  renderCourtOptions();
  renderCriminalCourtOptions();
  toggleUpdateCaseFormByType();

  const updateSearchBtn = document.getElementById('updateSearchBtn');
  const updateSearchInput = document.getElementById('updateSearchInput');

  if (updateSearchBtn && !updateSearchBtn.dataset.bound) {
    updateSearchBtn.dataset.bound = 'true';
    updateSearchBtn.addEventListener('click', () => {
      if (typeof loadCaseForUpdate === 'function') {
        loadCaseForUpdate(updateSearchInput?.value);
      }
    });
  }

  if (updateSearchInput && !updateSearchInput.dataset.bound) {
    updateSearchInput.dataset.bound = 'true';
    updateSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (typeof loadCaseForUpdate === 'function') {
          loadCaseForUpdate(updateSearchInput.value);
        }
      }
    });
  }

  const updateCaseForm = document.getElementById('updateCaseForm');
  if (updateCaseForm && !updateCaseForm.dataset.bound) {
    updateCaseForm.dataset.bound = 'true';
    if (typeof handleUpdateCaseSubmit === 'function') {
      updateCaseForm.addEventListener('submit', handleUpdateCaseSubmit);
    }
  }

  const updateCaseTypeDropdown = document.getElementById('updateCaseTypeDropdown');
  if (updateCaseTypeDropdown && !updateCaseTypeDropdown.dataset.bound) {
    updateCaseTypeDropdown.dataset.bound = 'true';
    updateCaseTypeDropdown.addEventListener('change', toggleUpdateCaseFormByType);
  }

  const updateAddCourtBtn = document.getElementById('updateAddCourtBtn');
  if (updateAddCourtBtn && !updateAddCourtBtn.dataset.bound) {
    updateAddCourtBtn.dataset.bound = 'true';
    updateAddCourtBtn.addEventListener('click', () => {
      showTab('courts');
      setTimeout(() => {
        const courtInput = document.getElementById('courtInput');
        if (courtInput) courtInput.focus();
      }, 120);
    });
  }

  const updateAddCriminalCourtBtn = document.getElementById('updateAddCriminalCourtBtn');
  if (updateAddCriminalCourtBtn && !updateAddCriminalCourtBtn.dataset.bound) {
    updateAddCriminalCourtBtn.dataset.bound = 'true';
    updateAddCriminalCourtBtn.addEventListener('click', () => {
      showTab('courts');
      setTimeout(() => {
        const courtInput = document.getElementById('courtInput');
        if (courtInput) courtInput.focus();
      }, 120);
    });
  }
}
window.initUpdateTab = initUpdateTab;
"""

if "function initUpdateTab()" not in content:
    target_pos = content.find("window.initAddTab = initAddTab;")
    if target_pos != -1:
        insert_after = target_pos + len("window.initAddTab = initAddTab;\n")
        content = content[:insert_after] + init_update_func + "\n" + content[insert_after:]
        print("Injected initUpdateTab() right after initAddTab")
    else:
        content += "\n" + init_update_func
        print("Appended initUpdateTab() at end of admin.js")

with open(admin_js_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("admin.js updated successfully for Tab #update!")
