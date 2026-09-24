import re

admin_js_path = r"d:\caseBook\admin.js"

with open(admin_js_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update showTab for 'transfer'
target_showtab_hearing = """  if (tabId === 'hearing') {
    if (typeof initHearingTab === 'function') {
      initHearingTab();
    } else {
      populateHearingCaseDropdown();
    }
  }"""

transfer_showtab_snippet = """  if (tabId === 'hearing') {
    if (typeof initHearingTab === 'function') {
      initHearingTab();
    } else {
      populateHearingCaseDropdown();
    }
  }

  if (tabId === 'transfer') {
    if (typeof initTransferTab === 'function') {
      initTransferTab();
    }
  }"""

if target_showtab_hearing in content:
    content = content.replace(target_showtab_hearing, transfer_showtab_snippet, 1)
    print("Added showTab('transfer') hook to admin.js")
else:
    print("WARNING: Could not find target_showtab_hearing")

# 2. Add initTransferTab function definition
init_transfer_func = """
function initTransferTab() {
  if (typeof renderCourtOptions === 'function') {
    renderCourtOptions();
  }
  if (typeof renderRecentTransfersTable === 'function') {
    renderRecentTransfersTable();
  }
  if (typeof switchTransferMode === 'function') {
    switchTransferMode('single');
  }

  const transferSearchBtn = document.getElementById('transferSearchBtn');
  const transferSearchInput = document.getElementById('transferSearchInput');

  if (transferSearchBtn && !transferSearchBtn.dataset.bound) {
    transferSearchBtn.dataset.bound = 'true';
    transferSearchBtn.addEventListener('click', () => {
      if (typeof loadCaseForTransfer === 'function') {
        loadCaseForTransfer(transferSearchInput?.value);
      }
    });
  }

  if (transferSearchInput && !transferSearchInput.dataset.bound) {
    transferSearchInput.dataset.bound = 'true';
    transferSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (typeof loadCaseForTransfer === 'function') {
          loadCaseForTransfer(transferSearchInput.value);
        }
      }
    });
  }

  const transferCaseForm = document.getElementById('transferCaseForm');
  if (transferCaseForm && !transferCaseForm.dataset.bound) {
    transferCaseForm.dataset.bound = 'true';
    if (typeof handleTransferCaseSubmit === 'function') {
      transferCaseForm.addEventListener('submit', handleTransferCaseSubmit);
    }
  }

  const bulkOriginCourt = document.getElementById('bulkOriginCourt');
  if (bulkOriginCourt && !bulkOriginCourt.dataset.bound) {
    bulkOriginCourt.dataset.bound = 'true';
    bulkOriginCourt.addEventListener('change', () => {
      if (typeof renderBulkOriginCasesList === 'function') {
        renderBulkOriginCasesList(bulkOriginCourt.value);
      }
    });
  }

  const bulkTransferForm = document.getElementById('bulkTransferForm');
  if (bulkTransferForm && !bulkTransferForm.dataset.bound) {
    bulkTransferForm.dataset.bound = 'true';
    if (typeof handleBulkTransferSubmit === 'function') {
      bulkTransferForm.addEventListener('submit', handleBulkTransferSubmit);
    }
  }
}
window.initTransferTab = initTransferTab;
"""

if "function initTransferTab()" not in content:
    target_pos = content.find("window.initHearingTab = initHearingTab;")
    if target_pos != -1:
        insert_after = target_pos + len("window.initHearingTab = initHearingTab;\n")
        content = content[:insert_after] + init_transfer_func + "\n" + content[insert_after:]
        print("Injected initTransferTab() right after initHearingTab")
    else:
        content += "\n" + init_transfer_func
        print("Appended initTransferTab() at end of admin.js")

with open(admin_js_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("admin.js updated successfully for Tab #transfer!")
