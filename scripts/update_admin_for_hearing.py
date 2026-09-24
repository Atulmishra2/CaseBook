import re

admin_js_path = r"d:\caseBook\admin.js"

with open(admin_js_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update showTab('hearing')
target_showtab = """  if (tabId === 'hearing') {
    populateHearingCaseDropdown();
  }"""

replacement_showtab = """  if (tabId === 'hearing') {
    if (typeof initHearingTab === 'function') {
      initHearingTab();
    } else {
      populateHearingCaseDropdown();
    }
  }"""

if target_showtab in content:
    content = content.replace(target_showtab, replacement_showtab)
    print("Updated showTab('hearing') hook in admin.js")
else:
    rx = r"if\s*\(\s*tabId\s*===\s*['\"]hearing['\"]\s*\)\s*\{[\s\S]*?populateHearingCaseDropdown\(\);\s*\}"
    content = re.sub(rx, replacement_showtab.strip(), content)
    print("Replaced showTab('hearing') via regex")

# 2. Add initHearingTab and convert updateHearingForm submit to handleUpdateHearingSubmit
target_submit_start = "  const updateHearingForm = document.getElementById('updateHearingForm');\n  if (updateHearingForm) {\n    updateHearingForm.addEventListener('submit', async (e) => {"
replacement_submit_start = "async function handleUpdateHearingSubmit(e) {"

if target_submit_start in content:
    content = content.replace(target_submit_start, replacement_submit_start, 1)
    # now fix the closing bracket
    target_closing = """      alert(`✅ Hearing for Case "${caseNumber}" has been updated and forwarded to ${formatDateDMY(hearingDate)} (${process}) successfully!`);
    });
  }"""
    replacement_closing = """      alert(`✅ Hearing for Case "${caseNumber}" has been updated and forwarded to ${formatDateDMY(hearingDate)} (${process}) successfully!`);
  }
  window.handleUpdateHearingSubmit = handleUpdateHearingSubmit;"""
    if target_closing in content:
        content = content.replace(target_closing, replacement_closing, 1)
        print("Converted updateHearingForm submit listener to named handleUpdateHearingSubmit")
    else:
        print("WARNING: Could not find target_closing for handleUpdateHearingSubmit")
else:
    print("WARNING: Could not find target_submit_start for handleUpdateHearingSubmit")

# 3. Add initHearingTab definition
init_hearing_func = """
function initHearingTab() {
  populateHearingCaseDropdown();
  renderHearingStagePills('');
  if (typeof updateHearingLivePreview === 'function') {
    updateHearingLivePreview();
  }

  const hearingCaseSelect = document.getElementById('hearingCaseSelect');
  const hearingCaseNo = document.getElementById('hearingCaseNo');

  if (hearingCaseSelect && !hearingCaseSelect.dataset.bound) {
    hearingCaseSelect.dataset.bound = 'true';
    hearingCaseSelect.addEventListener('change', () => {
      const selectedVal = hearingCaseSelect.value;
      if (hearingCaseNo) {
        hearingCaseNo.value = selectedVal;
      }
      if (typeof renderHearingCaseInfo === 'function') {
        renderHearingCaseInfo(selectedVal);
      }
      if (selectedVal && Array.isArray(allCaseRecords)) {
        const found = allCaseRecords.find(c => {
          const num1 = (c.caseNo || '').toLowerCase();
          const num2 = (c.criminalCaseNumber || '').toLowerCase();
          return num1 === selectedVal.toLowerCase() || num2 === selectedVal.toLowerCase();
        });
        if (found) {
          const hearingProcessInput = document.getElementById('hearingProcess');
          if (hearingProcessInput && found.hearingProcess && !hearingProcessInput.value) {
            hearingProcessInput.value = found.hearingProcess;
          }
          if (typeof renderHearingStagePills === 'function') {
            renderHearingStagePills(found.caseType || found.case_type || '');
          }
          const dateInput = document.getElementById('hearingDate');
          if (dateInput) dateInput.focus();
        }
      }
    });
  }

  if (hearingCaseNo && !hearingCaseNo.dataset.bound) {
    hearingCaseNo.dataset.bound = 'true';
    hearingCaseNo.addEventListener('input', () => {
      const typed = hearingCaseNo.value.trim();
      if (typeof renderHearingCaseInfo === 'function') {
        renderHearingCaseInfo(typed);
      }
      if (hearingCaseSelect) {
        const match = Array.from(hearingCaseSelect.options).find(opt => opt.value.toLowerCase() === typed.toLowerCase());
        if (match) {
          hearingCaseSelect.value = match.value;
        } else {
          hearingCaseSelect.value = '';
        }
      }
      if (Array.isArray(allCaseRecords)) {
        const typedFound = allCaseRecords.find(c => {
          const num1 = (c.caseNo || '').toLowerCase();
          const num2 = (c.criminalCaseNumber || '').toLowerCase();
          return num1 === typed.toLowerCase() || num2 === typed.toLowerCase();
        });
        if (typedFound && typeof renderHearingStagePills === 'function') {
          renderHearingStagePills(typedFound.caseType || typedFound.case_type || '');
        }
      }
    });
  }

  const hearingDateInput = document.getElementById('hearingDate');
  const hearingProcessInput = document.getElementById('hearingProcess');
  if (hearingDateInput && !hearingDateInput.dataset.bound) {
    hearingDateInput.dataset.bound = 'true';
    if (typeof updateHearingLivePreview === 'function') {
      hearingDateInput.addEventListener('input', updateHearingLivePreview);
      hearingDateInput.addEventListener('change', updateHearingLivePreview);
    }
  }
  if (hearingProcessInput && !hearingProcessInput.dataset.bound) {
    hearingProcessInput.dataset.bound = 'true';
    if (typeof updateHearingLivePreview === 'function') {
      hearingProcessInput.addEventListener('input', updateHearingLivePreview);
      hearingProcessInput.addEventListener('change', updateHearingLivePreview);
    }
  }

  const updateHearingForm = document.getElementById('updateHearingForm');
  if (updateHearingForm && !updateHearingForm.dataset.bound) {
    updateHearingForm.dataset.bound = 'true';
    if (typeof handleUpdateHearingSubmit === 'function') {
      updateHearingForm.addEventListener('submit', handleUpdateHearingSubmit);
    }
  }

  const sendWhatsAppHearingBtn = document.getElementById('sendWhatsAppHearingBtn');
  if (sendWhatsAppHearingBtn && !sendWhatsAppHearingBtn.dataset.bound) {
    sendWhatsAppHearingBtn.dataset.bound = 'true';
    sendWhatsAppHearingBtn.addEventListener('click', () => {
      if (typeof sendWhatsAppHearingNotice === 'function') {
        sendWhatsAppHearingNotice(lastUpdatedHearingCase);
      }
    });
  }
}
window.initHearingTab = initHearingTab;
"""

if "function initHearingTab()" not in content:
    target_pos = content.find("window.initUpdateTab = initUpdateTab;")
    if target_pos != -1:
        insert_after = target_pos + len("window.initUpdateTab = initUpdateTab;\n")
        content = content[:insert_after] + init_hearing_func + "\n" + content[insert_after:]
        print("Injected initHearingTab() right after initUpdateTab")
    else:
        content += "\n" + init_hearing_func
        print("Appended initHearingTab() at end of admin.js")

with open(admin_js_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("admin.js updated successfully for Tab #hearing!")
