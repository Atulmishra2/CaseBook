// ==============================================================================
// Case To-Do List & Deadline Tracker Logic (Supabase Synced & Beautified)
// ==============================================================================
var caseTasks = [];
if (typeof caseTasks !== 'undefined') window.caseTasks = caseTasks;
var currentTodoFilter = 'all';
var todoSearchQuery = '';

function updateTodoSyncIndicator(isSynced) {
  const ind = document.getElementById('todoSyncIndicator');
  if (!ind) return;
  if (isSynced && supabaseClient) {
    ind.className = 'todo-sync-pill';
    ind.innerHTML = '<span class="sync-dot"></span> Supabase Synced';
  } else {
    ind.className = 'todo-sync-pill';
    ind.style.background = '#f1f5f9';
    ind.style.borderColor = '#cbd5e1';
    ind.style.color = '#475569';
    ind.innerHTML = 'ðŸ’¾ Local Storage Ready';
  }
}
if (typeof updateTodoSyncIndicator !== 'undefined') window.updateTodoSyncIndicator = updateTodoSyncIndicator;

function updateSupabaseStatusIndicator(isConnected) {
  const pill = document.getElementById('homeHeroStatus') || document.querySelector('.hero-status-pill');
  if (!pill) return;
  const textEl = document.getElementById('homeHeroStatusText') || pill.querySelector('span:not(.live-dot)');
  if (isConnected) {
    pill.classList.remove('disconnected');
    pill.classList.add('connected');
    if (textEl) textEl.textContent = 'Supabase Cloud Connected';
  } else {
    pill.classList.remove('connected');
    pill.classList.add('disconnected');
    if (textEl) textEl.textContent = 'Supabase Cloud Disconnected';
  }
}
if (typeof updateSupabaseStatusIndicator !== 'undefined') window.updateSupabaseStatusIndicator = updateSupabaseStatusIndicator;

// Reflect connection state on initial page load (event listeners only fire on changes)
updateSupabaseStatusIndicator(navigator.onLine && !!supabaseClient);

window.addEventListener('online', () => {
  if (supabaseClient) {
    updateSupabaseStatusIndicator(true);
    if (typeof fetchAllDataFromSupabase === 'function') fetchAllDataFromSupabase();
  } else {
    updateSupabaseStatusIndicator(false);
  }
});

window.addEventListener('offline', () => {
  updateSupabaseStatusIndicator(false);
});

function loadCaseTasks() {
  try {
    const raw = safeStorage.get('cmCaseTasks');
    if (raw) {
      caseTasks = JSON.parse(raw);
    } else {
      caseTasks = [];
    }
  } catch (e) {
    caseTasks = [];
  }
  window.caseTasks = caseTasks;
  updateTodoCounters();
}

function saveCaseTasksLocally() {
  window.caseTasks = caseTasks;
  try {
    safeStorage.set('cmCaseTasks', JSON.stringify(caseTasks), true);
  } catch (e) {
    console.error('Failed to save tasks locally:', e);
  }
  updateTodoCounters();
}

function saveCaseTasks() {
  saveCaseTasksLocally();
}

function updateTodoCounters() {
  const total = caseTasks.length;
  const pending = caseTasks.filter(t => t.status !== 'completed').length;
  const completed = caseTasks.filter(t => t.status === 'completed').length;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueSoonOrOverdue = caseTasks.filter(t => {
    if (t.status === 'completed') return false;
    const d = parseDateString(t.deadlineDate);
    if (!d) return false;
    d.setHours(0, 0, 0, 0);
    const diffDays = Math.round((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 3;
  }).length;

  const navBadge = document.getElementById('todoNavCount');
  if (navBadge) navBadge.textContent = String(pending);

  const statTotal = document.getElementById('todoStatTotal');
  const statPending = document.getElementById('todoStatPending');
  const statDueSoon = document.getElementById('todoStatDueSoon');
  const statCompleted = document.getElementById('todoStatCompleted');

  if (statTotal) statTotal.textContent = String(total);
  if (statPending) statPending.textContent = String(pending);
  if (statDueSoon) statDueSoon.textContent = String(dueSoonOrOverdue);
  if (statCompleted) statCompleted.textContent = String(completed);

  const fAll = document.getElementById('todoFilterAllCount');
  const fPending = document.getElementById('todoFilterPendingCount');
  const fDueSoon = document.getElementById('todoFilterDueSoonCount');
  const fCompleted = document.getElementById('todoFilterCompletedCount');

  if (fAll) fAll.textContent = String(total);
  if (fPending) fPending.textContent = String(pending);
  if (fDueSoon) fDueSoon.textContent = String(dueSoonOrOverdue);
  if (fCompleted) fCompleted.textContent = String(completed);

  // Goal Progress Bar
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  const progressBar = document.getElementById('todoProgressBar');
  const progressText = document.getElementById('todoProgressPercentage');
  if (progressBar) progressBar.style.width = `${pct}%`;
  if (progressText) progressText.textContent = `${pct}%`;
}

function setTodoPriority(level) {
  const hiddenInput = document.getElementById('todoPriority');
  if (hiddenInput) hiddenInput.value = level;

  document.querySelectorAll('.todo-priority-chip').forEach(chip => {
    chip.classList.toggle('active', chip.classList.contains(level));
  });
}
if (typeof setTodoPriority !== 'undefined') window.setTodoPriority = setTodoPriority;

// ==============================================================================
// Searchable Combobox for Case Selector
// ==============================================================================
function renderTodoCaseDropdownItems(casesToRender) {
  const container = document.getElementById('todoCaseDropdownList');
  if (!container) return;

  const currentSelected = document.getElementById('todoCaseSelect')?.value || '';

  const generalTaskOptionHtml = `
    <div class="todo-combobox-item todo-general-item ${currentSelected === '__GENERAL__' ? 'selected' : ''}" onclick="selectTodoCase('__GENERAL__')">
      <div class="combobox-item-top">
        <span class="combobox-case-num">ðŸ“Œ General Task</span>
        <span class="case-badge misc">GENERAL</span>
      </div>
      <div class="combobox-item-name">A task not linked to any specific case</div>
      <div class="combobox-item-meta">
        <span>ðŸ—‚ï¸ Office / personal work, reminders, filingsâ€¦</span>
      </div>
    </div>
  `;

  if (!casesToRender || casesToRender.length === 0) {
    container.innerHTML = generalTaskOptionHtml + `
      <div class="todo-combobox-empty">
        <span>ðŸ”Ž No matching cases found</span>
      </div>
    `;
    return;
  }

  container.innerHTML = generalTaskOptionHtml + casesToRender.map(c => {
    const num = c.caseNo || c.criminalCaseNumber || '';
    const name = c.caseName || (c.plaintiff ? `${c.plaintiff} vs ${c.defendant}` : (c.victimName ? `${c.victimName} vs ${c.accusedName}` : 'â€”'));
    const court = c.courtName || c.criminalCourtName || 'District Court';
    const caseType = (c.caseType || 'civil').toLowerCase();
    const hasHearing = c.nextHearing && c.nextHearing !== 'â€”';
    const hearingText = hasHearing ? `ðŸ“… Hearing: ${formatDateDMY(c.nextHearing)}` : 'âš ï¸ Undated';
    const isSelected = (currentSelected.toLowerCase() === num.toLowerCase());

    return `
      <div class="todo-combobox-item ${isSelected ? 'selected' : ''}" onclick="selectTodoCase('${num}')">
        <div class="combobox-item-top">
          <span class="combobox-case-num">${num}</span>
          <span class="case-badge ${caseType}">${caseType.toUpperCase()}</span>
        </div>
        <div class="combobox-item-name">${name}</div>
        <div class="combobox-item-meta">
          <span>ðŸ›ï¸ ${court}</span>
          <span class="combobox-hearing-badge ${hasHearing ? '' : 'undated'}">${hearingText}</span>
        </div>
      </div>
    `;
  }).join('');
}

function openTodoCaseDropdown() {
  const dropdown = document.getElementById('todoCaseDropdownList');
  if (!dropdown) return;
  dropdown.classList.remove('hidden');

  const searchInput = document.getElementById('todoCaseSearchInput');
  const query = searchInput ? searchInput.value.trim() : '';
  filterTodoCaseDropdown(query);
}
if (typeof openTodoCaseDropdown !== 'undefined') window.openTodoCaseDropdown = openTodoCaseDropdown;

function closeTodoCaseDropdown() {
  const dropdown = document.getElementById('todoCaseDropdownList');
  if (dropdown) dropdown.classList.add('hidden');
}
if (typeof closeTodoCaseDropdown !== 'undefined') window.closeTodoCaseDropdown = closeTodoCaseDropdown;

function toggleTodoCaseDropdown() {
  const dropdown = document.getElementById('todoCaseDropdownList');
  if (!dropdown) return;
  if (dropdown.classList.contains('hidden')) {
    openTodoCaseDropdown();
    const searchInput = document.getElementById('todoCaseSearchInput');
    if (searchInput && typeof searchInput.focus === 'function') searchInput.focus();
  } else {
    closeTodoCaseDropdown();
  }
}
if (typeof toggleTodoCaseDropdown !== 'undefined') window.toggleTodoCaseDropdown = toggleTodoCaseDropdown;

function filterTodoCaseDropdown(query, keepClosed = false) {
  const dropdown = document.getElementById('todoCaseDropdownList');
  if (dropdown && !keepClosed) dropdown.classList.remove('hidden');

  const clearBtn = document.getElementById('todoComboboxClearBtn');
  if (clearBtn) clearBtn.style.display = query ? 'flex' : 'none';

  const cleanQuery = (query || '').trim().toLowerCase();

  const sorted = [...allCaseRecords].sort((a, b) => {
    const numA = (a.caseNo || a.criminalCaseNumber || '').toUpperCase();
    const numB = (b.caseNo || b.criminalCaseNumber || '').toUpperCase();
    return numA.localeCompare(numB);
  });

  if (!cleanQuery) {
    renderTodoCaseDropdownItems(sorted);
    return;
  }

  const filtered = sorted.filter(c => {
    const num = (c.caseNo || c.criminalCaseNumber || '').toLowerCase();
    const name = (c.caseName || (c.plaintiff ? `${c.plaintiff} vs ${c.defendant}` : (c.victimName ? `${c.victimName} vs ${c.accusedName}` : ''))).toLowerCase();
    const court = (c.courtName || c.criminalCourtName || '').toLowerCase();
    return num.includes(cleanQuery) || name.includes(cleanQuery) || court.includes(cleanQuery);
  });

  renderTodoCaseDropdownItems(filtered);
}
if (typeof filterTodoCaseDropdown !== 'undefined') window.filterTodoCaseDropdown = filterTodoCaseDropdown;

function selectTodoCase(caseNo) {
  const select = document.getElementById('todoCaseSelect');
  const searchInput = document.getElementById('todoCaseSearchInput');
  const clearBtn = document.getElementById('todoComboboxClearBtn');

  if (select) select.value = caseNo;

  if (caseNo === '__GENERAL__') {
    if (searchInput) searchInput.value = 'ðŸ“Œ General Task (no case linked)';
    if (clearBtn) clearBtn.style.display = 'flex';
    closeTodoCaseDropdown();
    onTodoCaseSelectChange();
    return;
  }

  const found = allCaseRecords.find(c => {
    const num1 = (c.caseNo || '').toLowerCase();
    const num2 = (c.criminalCaseNumber || '').toLowerCase();
    return num1 === caseNo.toLowerCase() || num2 === caseNo.toLowerCase();
  });

  if (found && searchInput) {
    const name = found.caseName || (found.plaintiff ? `${found.plaintiff} vs ${found.defendant}` : (found.victimName ? `${found.victimName} vs ${found.accusedName}` : 'â€”'));
    searchInput.value = `${caseNo} â€” ${name}`;
    if (clearBtn) clearBtn.style.display = 'flex';
  }

  closeTodoCaseDropdown();
  onTodoCaseSelectChange();
}
if (typeof selectTodoCase !== 'undefined') window.selectTodoCase = selectTodoCase;

function clearTodoCaseSelection() {
  const select = document.getElementById('todoCaseSelect');
  const searchInput = document.getElementById('todoCaseSearchInput');
  const clearBtn = document.getElementById('todoComboboxClearBtn');

  if (select) select.value = '';
  if (searchInput) {
    searchInput.value = '';
    if (typeof searchInput.focus === 'function') searchInput.focus();
  }
  if (clearBtn) clearBtn.style.display = 'none';

  onTodoCaseSelectChange();
  openTodoCaseDropdown();
}
if (typeof clearTodoCaseSelection !== 'undefined') window.clearTodoCaseSelection = clearTodoCaseSelection;

function populateTodoCaseDropdown(selectedCaseNo = '') {
  const select = document.getElementById('todoCaseSelect');
  const searchInput = document.getElementById('todoCaseSearchInput');
  const clearBtn = document.getElementById('todoComboboxClearBtn');

  const currentVal = selectedCaseNo || select?.value || '';

  if (select) {
    select.innerHTML = '<option value="">-- Choose Case to Link --</option>';
    const generalOpt = document.createElement('option');
    generalOpt.value = '__GENERAL__';
    generalOpt.textContent = 'ðŸ“Œ General Task (no case linked)';
    select.appendChild(generalOpt);
    const sorted = [...allCaseRecords].sort((a, b) => {
      const numA = (a.caseNo || a.criminalCaseNumber || '').toUpperCase();
      const numB = (b.caseNo || b.criminalCaseNumber || '').toUpperCase();
      return numA.localeCompare(numB);
    });

    sorted.forEach(c => {
      const num = c.caseNo || c.criminalCaseNumber || '';
      if (!num) return;
      const name = c.caseName || (c.plaintiff ? `${c.plaintiff} vs ${c.defendant}` : (c.victimName ? `${c.victimName} vs ${c.accusedName}` : 'â€”'));
      const hearing = c.nextHearing && c.nextHearing !== 'â€”' ? ` (Hearing: ${formatDateDMY(c.nextHearing)})` : ' (Undated)';
      const opt = document.createElement('option');
      opt.value = num;
      opt.textContent = `${num} â€” ${name}${hearing}`;
      select.appendChild(opt);
    });
  }

  // Populate combobox dropdown items (keep list closed until user interacts)
  filterTodoCaseDropdown('', true);

  if (currentVal) {
    if (select) select.value = currentVal;
    if (currentVal === '__GENERAL__') {
      if (searchInput) searchInput.value = 'ðŸ“Œ General Task (no case linked)';
      if (clearBtn) clearBtn.style.display = 'flex';
      onTodoCaseSelectChange();
      return;
    }
    const found = allCaseRecords.find(c => {
      const num1 = (c.caseNo || '').toLowerCase();
      const num2 = (c.criminalCaseNumber || '').toLowerCase();
      return num1 === currentVal.toLowerCase() || num2 === currentVal.toLowerCase();
    });
    if (found && searchInput) {
      const name = found.caseName || (found.plaintiff ? `${found.plaintiff} vs ${found.defendant}` : (found.victimName ? `${found.victimName} vs ${found.accusedName}` : 'â€”'));
      searchInput.value = `${currentVal} â€” ${name}`;
      if (clearBtn) clearBtn.style.display = 'flex';
    }
    onTodoCaseSelectChange();
  } else {
    if (searchInput) searchInput.value = '';
    if (clearBtn) clearBtn.style.display = 'none';
    onTodoCaseSelectChange();
  }
}

function onTodoCaseSelectChange() {
  const select = document.getElementById('todoCaseSelect');
  const banner = document.getElementById('todoCaseInfoBanner');
  const typeEl = document.getElementById('todoBannerCaseType');
  const numEl = document.getElementById('todoBannerCaseNum');
  const nameEl = document.getElementById('todoBannerCaseName');
  const courtEl = document.getElementById('todoBannerCourt');
  const hearingEl = document.getElementById('todoBannerHearing');
  const deadlineInput = document.getElementById('todoDeadline');

  const val = select?.value;
  if (!val) {
    if (banner) banner.classList.add('hidden');
    return;
  }

  if (val === '__GENERAL__') {
    if (banner) banner.classList.remove('hidden');
    if (typeEl) {
      typeEl.textContent = 'GENERAL';
      typeEl.className = 'case-badge misc';
    }
    if (numEl) numEl.textContent = 'No Case';
    if (nameEl) nameEl.textContent = 'ðŸ“Œ General Task â€” not linked to any case';
    if (courtEl) courtEl.textContent = 'Any / Not applicable';
    if (hearingEl) hearingEl.textContent = 'â€”';
    return;
  }

  const found = allCaseRecords.find(c => {
    const num1 = (c.caseNo || '').toLowerCase();
    const num2 = (c.criminalCaseNumber || '').toLowerCase();
    return num1 === val.toLowerCase() || num2 === val.toLowerCase();
  });

  if (found) {
    if (banner) banner.classList.remove('hidden');
    const caseType = (found.caseType || 'civil').toLowerCase();
    const caseNum = found.caseNo || found.criminalCaseNumber || 'â€”';
    const caseTitle = found.caseName || (found.plaintiff ? `${found.plaintiff} vs ${found.defendant}` : (found.victimName ? `${found.victimName} vs ${found.accusedName}` : 'â€”'));

    if (typeEl) {
      typeEl.textContent = caseType.toUpperCase();
      typeEl.className = `case-badge ${caseType}`;
    }
    if (numEl) numEl.textContent = caseNum;
    if (nameEl) nameEl.textContent = caseTitle;
    if (courtEl) courtEl.textContent = found.courtName || found.criminalCourtName || 'District Court';
    if (hearingEl) hearingEl.textContent = found.nextHearing && found.nextHearing !== 'â€”' ? formatDateDMY(found.nextHearing) : 'None scheduled (Undated)';

    if (deadlineInput && found.nextHearing && found.nextHearing !== 'â€”') {
      const parsed = parseDateString(found.nextHearing);
      if (parsed) {
        const y = parsed.getFullYear();
        const m = String(parsed.getMonth() + 1).padStart(2, '0');
        const d = String(parsed.getDate()).padStart(2, '0');
        deadlineInput.value = `${y}-${m}-${d}`;
      }
    }
  }
}

function setTodoDeadlinePreset(preset) {
  const select = document.getElementById('todoCaseSelect');
  const deadlineInput = document.getElementById('todoDeadline');
  if (!select || !deadlineInput) return;

  const val = select.value;
  if (!val) {
    alert('Please select a case first.');
    return;
  }

  const found = allCaseRecords.find(c => {
    const num1 = (c.caseNo || '').toLowerCase();
    const num2 = (c.criminalCaseNumber || '').toLowerCase();
    return num1 === val.toLowerCase() || num2 === val.toLowerCase();
  });

  if (!found || !found.nextHearing || found.nextHearing === 'â€”') {
    alert('This case does not have a scheduled hearing date. Please pick a deadline date manually.');
    return;
  }

  const hearingDate = parseDateString(found.nextHearing);
  if (!hearingDate) return;

  const targetDate = new Date(hearingDate.getTime());
  if (preset === '1day') {
    targetDate.setDate(targetDate.getDate() - 1);
  } else if (preset === '3days') {
    targetDate.setDate(targetDate.getDate() - 3);
  }

  const y = targetDate.getFullYear();
  const m = String(targetDate.getMonth() + 1).padStart(2, '0');
  const d = String(targetDate.getDate()).padStart(2, '0');
  deadlineInput.value = `${y}-${m}-${d}`;
}
if (typeof setTodoDeadlinePreset !== 'undefined') window.setTodoDeadlinePreset = setTodoDeadlinePreset;

function toggleTodoReminderFields(isChecked) {
  const toggle = document.getElementById('todoReminderToggle');
  if (typeof isChecked !== 'boolean' && toggle) {
    isChecked = toggle.checked;
  } else if (toggle && toggle.checked !== isChecked) {
    toggle.checked = isChecked;
  }
  const fields = document.getElementById('todoReminderFields');
  const dtInput = document.getElementById('todoReminderDateTime');
  if (!fields) return;

  if (isChecked) {
    fields.classList.remove('hidden');
    fields.style.display = 'block';
    if (dtInput && !dtInput.value) {
      setTodoReminderPreset('deadline_9am');
    }
  } else {
    fields.classList.add('hidden');
    fields.style.display = 'none';
    if (dtInput) dtInput.value = '';
  }
}
if (typeof toggleTodoReminderFields !== 'undefined') window.toggleTodoReminderFields = toggleTodoReminderFields;

function setTodoReminderPreset(preset) {
  const deadlineInput = document.getElementById('todoDeadline');
  const hearingInput = document.getElementById('todoHearingDate');
  const reminderInput = document.getElementById('todoReminderDateTime');
  if (!reminderInput) return;

  let baseDate = null;
  if (deadlineInput && deadlineInput.value) {
    baseDate = new Date(deadlineInput.value + 'T09:00:00');
  } else if (hearingInput && hearingInput.value) {
    baseDate = new Date(hearingInput.value + 'T09:00:00');
  }

  const now = new Date();
  let target;

  if (baseDate && !isNaN(baseDate.getTime())) {
    target = new Date(baseDate.getTime());
    if (preset === '1day_9am') {
      target.setDate(target.getDate() - 1);
      target.setHours(9, 0, 0, 0);
    } else if (preset === '2days_9am') {
      target.setDate(target.getDate() - 2);
      target.setHours(9, 0, 0, 0);
    } else if (preset === 'deadline_9am') {
      target.setHours(9, 0, 0, 0);
    }
    // Safeguard: if calculated target is in the past, default to tomorrow 9 AM
    if (target.getTime() <= now.getTime()) {
      target = new Date(now.getTime());
      target.setDate(target.getDate() + 1);
      target.setHours(9, 0, 0, 0);
    }
  } else {
    // If no deadline or hearing selected yet, set to tomorrow or +2 days at 9 AM
    target = new Date(now.getTime());
    if (preset === '2days_9am') {
      target.setDate(target.getDate() + 2);
    } else {
      target.setDate(target.getDate() + 1);
    }
    target.setHours(9, 0, 0, 0);
  }

  const yyyy = target.getFullYear();
  const mm = String(target.getMonth() + 1).padStart(2, '0');
  const dd = String(target.getDate()).padStart(2, '0');
  const hh = String(target.getHours()).padStart(2, '0');
  const min = String(target.getMinutes()).padStart(2, '0');

  reminderInput.value = `${yyyy}-${mm}-${dd}T${hh}:${min}`;
}
if (typeof setTodoReminderPreset !== 'undefined') window.setTodoReminderPreset = setTodoReminderPreset;

var isSubmittingTodo = false;
async function handleAddTodoSubmit(e) {
  if (e && e.preventDefault) e.preventDefault();
  if (isSubmittingTodo) return false;

  const select = document.getElementById('todoCaseSelect');
  const titleInput = document.getElementById('todoTitle');
  const deadlineInput = document.getElementById('todoDeadline');
  const priorityInput = document.getElementById('todoPriority');
  const submitBtn = document.getElementById('saveTodoBtn') || document.querySelector('#addTodoForm button[type="submit"]') || document.querySelector('#todoForm button[type="submit"]') || document.getElementById('addTodoSubmitBtn');

  const caseNoRaw = select?.value?.trim();
  const isGeneralTask = caseNoRaw === '__GENERAL__';
  const caseNo = isGeneralTask ? 'GENERAL' : caseNoRaw;
  const title = titleInput?.value?.trim();
  const deadline = deadlineInput?.value;
  const priority = priorityInput?.value || 'medium';

  if ((!caseNo && !isGeneralTask) || !title || !deadline) {
    alert('Please fill in all task fields.');
    return false;
  }

  // Prevent duplicate pending task (same case + same title + same deadline)
  const isDuplicateTask = caseTasks.some(t =>
    t.status !== 'completed' &&
    (t.caseNo || '').trim().toLowerCase() === caseNo.toLowerCase() &&
    (t.taskTitle || '').trim().toLowerCase() === title.toLowerCase() &&
    t.deadlineDate === deadline
  );

  if (isDuplicateTask) {
    alert(`âš ï¸ A pending task "${title}" with deadline ${deadline} already exists${isGeneralTask ? '' : ` for case ${caseNo}`}.`);
    return false;
  }

  const found = isGeneralTask ? null : allCaseRecords.find(c => {
    const num1 = (c.caseNo || '').toLowerCase();
    const num2 = (c.criminalCaseNumber || '').toLowerCase();
    return num1 === caseNo.toLowerCase() || num2 === caseNo.toLowerCase();
  });

  const caseName = found ? (found.caseName || (found.plaintiff ? `${found.plaintiff} vs ${found.defendant}` : (found.victimName ? `${found.victimName} vs ${found.accusedName}` : 'â€”'))) : (isGeneralTask ? 'General Task (no case)' : 'â€”');
  const hearingDate = found?.nextHearing || null;

  try {
    isSubmittingTodo = true;
    if (submitBtn) submitBtn.disabled = true;

    // Check live Supabase for duplicate pending task
    if (supabaseClient && !isGeneralTask) {
      try {
        const { data: dupDb } = await supabaseClient
          .from('case_todos')
          .select('id')
          .ilike('case_number', caseNo)
          .ilike('task_title', title)
          .eq('deadline_date', deadline)
          .neq('status', 'completed')
          .limit(1);

        if (dupDb && dupDb.length > 0) {
          alert(`âš ï¸ A pending task "${title}" already exists in the database for case ${caseNo}.`);
          return false;
        }
      } catch (checkErr) {
        console.warn('Supabase task duplicate check fallback:', checkErr);
      }
    }

    // Check workflow type for multi-step task templates
    const workflowTypeEl = document.getElementById('todoWorkflowType');
    const workflowType = workflowTypeEl ? workflowTypeEl.value : 'standard';
    const customStepsInput = document.getElementById('todoCustomStepsInput');
    let taskSteps = [];

    if (workflowType === 'certified_copy') {
      taskSteps = [
        { id: 1, name: 'Apply', completed: false, date: null },
        { id: 2, name: 'Copy from office', completed: false, date: null },
        { id: 3, name: 'Preparation in copy office', completed: false, date: null },
        { id: 4, name: 'Receive', completed: false, date: null }
      ];
    } else if (workflowType === 'custom') {
      const rawSteps = customStepsInput ? customStepsInput.value.trim() : '';
      if (rawSteps) {
        const stepNames = rawSteps.split(',').map(s => s.trim()).filter(Boolean);
        taskSteps = stepNames.map((name, idx) => ({
          id: idx + 1,
          name,
          completed: false,
          date: null
        }));
      }
    }

    const copyNumberInput = document.getElementById('todoCopyNumber');
    const copyNumber = copyNumberInput ? copyNumberInput.value.trim() : '';

    // Application number is mandatory for every multi-step workflow task
    if (taskSteps.length > 0 && !copyNumber) {
      if (typeof showToastNotification === 'function') {
        showToastNotification('âš ï¸ Application No. is required for multi-step tasks. Please enter it above.', 3000);
      }
      copyNumberInput?.focus();
      return false;
    }

    const reminderToggle = document.getElementById('todoReminderToggle');
    const reminderInput = document.getElementById('todoReminderDateTime');
    let reminderDateTime = null;
    if (reminderToggle && reminderToggle.checked && reminderInput && reminderInput.value) {
      reminderDateTime = reminderInput.value;
    }

    const newTask = {
      id: 'task_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      caseNo,
      caseName,
      taskTitle: title,
      hearingDate,
      deadlineDate: deadline,
      priority,
      status: 'pending',
      steps: taskSteps,
      copyNumber: copyNumber,
      reminderDateTime: reminderDateTime,
      reminderNotified: false,
      reminderDismissed: false,
      createdAt: new Date().toISOString()
    };

    caseTasks.unshift(newTask);
    saveCaseTasksLocally();
    renderCaseTasks(currentTodoFilter);

    if (titleInput) titleInput.value = '';
    if (customStepsInput) customStepsInput.value = '';
    if (copyNumberInput) copyNumberInput.value = '';
    if (workflowTypeEl) workflowTypeEl.value = 'standard';
    const previewEl = document.getElementById('todoWorkflowStepsPreview');
    if (previewEl) previewEl.classList.add('hidden');
    const customContainerEl = document.getElementById('todoCustomStepsContainer');
    if (customContainerEl) customContainerEl.classList.add('hidden');

    if (reminderToggle) reminderToggle.checked = false;
    const reminderFieldsEl = document.getElementById('todoReminderFields');
    if (reminderFieldsEl) reminderFieldsEl.classList.add('hidden');
    if (reminderInput) reminderInput.value = '';

    showToastNotification(`ðŸ“ Task scheduled${isGeneralTask ? '' : ` for ${caseNo}`}!`);

    // Live Supabase Sync (if configured)
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient.from('case_todos').insert([{
          case_number: newTask.caseNo,
          case_name: newTask.caseNo === 'GENERAL' ? 'General Task (no case)' : newTask.caseName,
          task_title: newTask.taskTitle,
          hearing_date: newTask.hearingDate && newTask.hearingDate !== 'â€”' ? newTask.hearingDate : null,
          deadline_date: newTask.deadlineDate,
          priority: newTask.priority,
          status: newTask.status,
          steps: newTask.steps || [],
          copy_number: newTask.copyNumber || null
        }]).select();

        if (!error && data && data.length > 0) {
          newTask.id = data[0].id;
          saveCaseTasksLocally();
          updateTodoSyncIndicator(true);
        }
      } catch (supaErr) {
        console.warn('Supabase task insert fallback to local:', supaErr);
      }
    }
    await performPostCrudRefresh();
  } finally {
    isSubmittingTodo = false;
    if (submitBtn) submitBtn.disabled = false;
  }

  return false;
}
if (typeof handleAddTodoSubmit !== 'undefined') window.handleAddTodoSubmit = handleAddTodoSubmit;

function onTodoCopyNumberInput(val) {
  const titleInput = document.getElementById('todoTitle');
  if (!titleInput) return;
  const trimmed = (val || '').trim();
  // Only auto-format the title for the Certified Copy workflow
  if (titleInput.value.trim() && !titleInput.value.startsWith('Certified Copy')) return;
  if (trimmed) {
    titleInput.value = 'Certified Copy (App No. ' + trimmed + ')';
  } else {
    titleInput.value = 'Certified Copy Application';
  }
}
if (typeof onTodoCopyNumberInput !== 'undefined') window.onTodoCopyNumberInput = onTodoCopyNumberInput;

function onTodoWorkflowTypeChange(val) {
  const preview = document.getElementById('todoWorkflowStepsPreview');
  const customContainer = document.getElementById('todoCustomStepsContainer');
  const copyNumberGroup = document.getElementById('todoCopyNumberGroup');
  const customInput = document.getElementById('todoCustomStepsInput');
  const copyNumberInput = document.getElementById('todoCopyNumber');
  const titleInput = document.getElementById('todoTitle');

  const isMultiStep = val === 'certified_copy' || val === 'custom';

  if (val === 'certified_copy') {
    if (preview) preview.classList.remove('hidden');
    if (customContainer) customContainer.classList.add('hidden');
    const existingNum = copyNumberInput ? copyNumberInput.value.trim() : '';
    if (titleInput && (!titleInput.value.trim() || titleInput.value.startsWith('Certified Copy'))) {
      titleInput.value = existingNum ? ('Certified Copy (App No. ' + existingNum + ')') : 'Certified Copy Application';
    }
  } else if (val === 'custom') {
    if (preview) preview.classList.add('hidden');
    if (customContainer) customContainer.classList.remove('hidden');
    if (customInput) customInput.focus();
  } else {
    if (preview) preview.classList.add('hidden');
    if (customContainer) customContainer.classList.add('hidden');
    if (copyNumberInput) copyNumberInput.value = '';
  }

  // Application No. is required for every multi-step workflow task
  if (copyNumberGroup) copyNumberGroup.classList.toggle('hidden', !isMultiStep);
  if (!isMultiStep && copyNumberInput) copyNumberInput.value = '';
}
if (typeof onTodoWorkflowTypeChange !== 'undefined') window.onTodoWorkflowTypeChange = onTodoWorkflowTypeChange;

function filterTodoTasks(filterType, btnEl = null) {
  currentTodoFilter = filterType;
  const filterBtns = document.querySelectorAll('.todo-filter-tab, .todo-filter-btn');
  filterBtns.forEach(b => {
    b.classList.remove('active');
    if (btnEl ? b === btnEl : b.dataset.filter === filterType) {
      b.classList.add('active');
    }
  });
  renderCaseTasks(filterType);
}
if (typeof filterTodoTasks !== 'undefined') window.filterTodoTasks = filterTodoTasks;

function onTodoSearchInput(val) {
  todoSearchQuery = (val || '').trim().toLowerCase();
  renderCaseTasks(currentTodoFilter);
}
if (typeof onTodoSearchInput !== 'undefined') window.onTodoSearchInput = onTodoSearchInput;

async function toggleTaskStatus(taskId) {
  const task = caseTasks.find(t => t.id === taskId);
  if (!task) return;
  task.status = task.status === 'completed' ? 'pending' : 'completed';
  if (task.steps && Array.isArray(task.steps) && task.steps.length > 0) {
    const isCompleted = task.status === 'completed';
    task.steps.forEach(s => {
      s.completed = isCompleted;
      s.date = isCompleted ? (s.date || new Date().toISOString().split('T')[0]) : null;
    });
  }
  saveCaseTasksLocally();
  renderCaseTasks(currentTodoFilter);

  if (supabaseClient) {
    try {
      await supabaseClient.from('case_todos').update({ 
        status: task.status,
        steps: task.steps || []
      }).eq('id', taskId);
    } catch (e) {
      console.warn('Supabase task toggle fallback to local:', e);
    }
  }
  await performPostCrudRefresh();
}
if (typeof toggleTaskStatus !== 'undefined') window.toggleTaskStatus = toggleTaskStatus;

async function toggleTaskSubStep(taskId, stepId) {
  const task = caseTasks.find(t => t.id === taskId);
  if (!task || !Array.isArray(task.steps)) return;

  const step = task.steps.find(s => s.id === stepId);
  if (!step) return;

  // Steps must be completed strictly in ascending order â€” block random ticks
  if (!step.completed) {
    const prevIncomplete = task.steps.some(s => s.id < step.id && !s.completed);
    if (prevIncomplete) {
      showToastNotification('âš ï¸ Steps must be completed in order. Finish earlier steps first.');
      return;
    }
  }

  step.completed = !step.completed;
  step.date = step.completed ? new Date().toISOString().split('T')[0] : null;

  if (step.completed && step.name.toLowerCase().includes('apply') && !task.copyNumber) {
    const entered = prompt('Step "Apply" completed! Enter Certified Copy / Application No. (or cancel to add later):');
    if (entered && entered.trim()) {
      task.copyNumber = entered.trim();
      if (task.taskTitle && task.taskTitle.startsWith('Certified Copy')) {
        task.taskTitle = 'Certified Copy (App No. ' + task.copyNumber + ')';
      }
    }
  }

  // If all steps are completed, automatically mark the whole task completed
  const allCompleted = task.steps.length > 0 && task.steps.every(s => s.completed);
  task.status = allCompleted ? 'completed' : 'pending';

  saveCaseTasksLocally();
  renderCaseTasks(currentTodoFilter);

    if (step && step.completed) {
    showToastNotification(`âœ“ Step completed: ${step.name}`);
  }

  const taskModal = document.getElementById('taskDetailsModal');
  if (taskModal && !taskModal.classList.contains('hidden')) {
    openTaskDetailsModal(taskId);
  }

  if (supabaseClient) {
    try {
      await supabaseClient.from('case_todos').update({ 
        steps: task.steps,
        status: task.status,
        copy_number: task.copyNumber || null,
        task_title: task.taskTitle
      }).eq('id', taskId);
    } catch (e) {
      console.warn('Supabase task step toggle fallback to local:', e);
    }
  }
  await performPostCrudRefresh();
}
if (typeof toggleTaskSubStep !== 'undefined') window.toggleTaskSubStep = toggleTaskSubStep;

function rescheduleCaseTask(taskId) {
  const task = caseTasks.find(t => t.id === taskId);
  if (!task) return;
  const currentISO = toISODate(parseDateString(task.deadlineDate) || new Date());
  const entered = prompt(
    `Reschedule task:\n"${task.taskTitle}"\n\nEnter new deadline date (YYYY-MM-DD):`,
    currentISO
  );
  if (entered === null) return;
  const trimmed = entered.trim();
  const parsed = parseDateString(trimmed) || parseDateString(toISODate(new Date(trimmed)));
  if (!parsed) {
    alert('âš ï¸ Please enter a valid date in YYYY-MM-DD format (e.g. 2026-09-15).');
    return;
  }
  const newDeadline = toISODate(parsed);
  task.deadlineDate = newDeadline;
  saveCaseTasksLocally();
  renderCaseTasks(currentTodoFilter);
  const taskModal = document.getElementById('taskDetailsModal');
  if (taskModal && !taskModal.classList.contains('hidden')) {
    openTaskDetailsModal(taskId);
  }
  if (supabaseClient) {
    supabaseClient.from('case_todos').update({
      deadline_date: newDeadline
    }).eq('id', taskId).then(() => {
      updateTodoSyncIndicator(true);
    }).catch(e => console.warn('Supabase task reschedule fallback to local:', e));
  }
  showToastNotification(`ðŸ“… Task rescheduled to ${formatDateDMY(newDeadline)}!`);
}
if (typeof rescheduleCaseTask !== 'undefined') window.rescheduleCaseTask = rescheduleCaseTask;

function editTaskCopyNumber(taskId) {
  const task = caseTasks.find(t => t.id === taskId);
  if (!task) return;
  const current = task.copyNumber || '';
  const entered = prompt('Enter Certified Copy / Application No.:', current);
  if (entered !== null) {
    task.copyNumber = entered.trim();
    if (task.copyNumber && task.taskTitle && task.taskTitle.startsWith('Certified Copy')) {
      task.taskTitle = 'Certified Copy (App No. ' + task.copyNumber + ')';
    }
    saveCaseTasksLocally();
    renderCaseTasks(currentTodoFilter);
    const taskModal = document.getElementById('taskDetailsModal');
    if (taskModal && !taskModal.classList.contains('hidden')) {
      openTaskDetailsModal(taskId);
    }
    if (supabaseClient) {
      supabaseClient.from('case_todos').update({
        copy_number: task.copyNumber || null,
        task_title: task.taskTitle
      }).eq('id', taskId).then(() => {}).catch(e => console.warn(e));
    }
    showToastNotification('Application No. updated!');
  }
}
if (typeof editTaskCopyNumber !== 'undefined') window.editTaskCopyNumber = editTaskCopyNumber;

async function deleteCaseTask(taskId) {
  if (typeof confirm === 'function' && !confirm('Are you sure you want to remove this task?')) return;
  caseTasks = caseTasks.filter(t => t.id !== taskId);
  saveCaseTasksLocally();
  renderCaseTasks(currentTodoFilter);
  showToastNotification('ðŸ—‘ï¸ Task removed');

  if (supabaseClient) {
    try {
      await supabaseClient.from('case_todos').delete().eq('id', taskId);
    } catch (e) {
      console.warn('Supabase task delete fallback to local:', e);
    }
  }
  await performPostCrudRefresh();
}
if (typeof deleteCaseTask !== 'undefined') window.deleteCaseTask = deleteCaseTask;

function openTodoForCase(caseNo) {
  showTab('todo');
  populateTodoCaseDropdown(caseNo);
  setTimeout(() => {
    const titleInput = document.getElementById('todoTitle');
    if (titleInput && typeof titleInput.focus === 'function') titleInput.focus();
  }, 100);
}
if (typeof openTodoForCase !== 'undefined') window.openTodoForCase = openTodoForCase;

function renderCaseTasks(filter = currentTodoFilter) {
  const container = document.getElementById('todoListContainer');
  if (!container) return;

  updateTodoCounters();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let filtered = [...caseTasks];

  // Apply tab filter
  if (filter === 'pending') {
    filtered = filtered.filter(t => t.status !== 'completed');
  } else if (filter === 'completed') {
    filtered = filtered.filter(t => t.status === 'completed');
  } else if (filter === 'dueSoon') {
    filtered = filtered.filter(t => {
      if (t.status === 'completed') return false;
      const d = parseDateString(t.deadlineDate);
      if (!d) return false;
      d.setHours(0, 0, 0, 0);
      const diffDays = Math.round((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays <= 3;
    });
  }

  // Apply search query
  if (todoSearchQuery) {
    filtered = filtered.filter(t => {
      const title = (t.taskTitle || '').toLowerCase();
      const num = (t.caseNo || '').toLowerCase();
      const name = (t.caseName || '').toLowerCase();
      const copy = (t.copyNumber || '').toLowerCase();
      const general = t.caseNo ? '' : 'general task no case';
      return title.includes(todoSearchQuery) || num.includes(todoSearchQuery) || name.includes(todoSearchQuery) || copy.includes(todoSearchQuery) || general.includes(todoSearchQuery);
    });
  }

  if (filtered.length === 0) {
    const msg = todoSearchQuery
      ? `No tasks match "${todoSearchQuery}". Try clearing the search.`
      : filter === 'completed'
      ? 'No completed tasks yet. Mark tasks finished as you prepare for court hearings.'
      : filter === 'dueSoon'
      ? 'ðŸŽ‰ No tasks due soon or overdue! All your deadlines are on track.'
      : 'No case preparation tasks found. Choose a case on the left to schedule your first appearance deadline.';
    container.innerHTML = `
      <div class="todo-empty-state">
        <div class="todo-empty-icon-wrap">
          <i class="fa-solid fa-clipboard-list"></i>
        </div>
        <h4 class="todo-empty-title">${filter === 'completed' ? 'No completed tasks' : filter === 'dueSoon' ? 'All clear!' : 'No tasks yet'}</h4>
        <p>${msg}</p>
      </div>
    `;
    return;
  }

  filtered.sort((a, b) => {
    if (a.status !== b.status) return a.status === 'completed' ? 1 : -1;
    const dateA = parseDateString(a.deadlineDate)?.getTime() || 0;
    const dateB = parseDateString(b.deadlineDate)?.getTime() || 0;
    return dateA - dateB;
  });

  container.innerHTML = filtered.map(t => {
    const isDone = t.status === 'completed';
    const d = parseDateString(t.deadlineDate);
    let deadlineBadgeHtml = '';

    if (isDone) {
      deadlineBadgeHtml = `<span class="todo-deadline-badge completed">âœ… Completed</span>`;
    } else if (d) {
      d.setHours(0, 0, 0);
      const diffDays = Math.round((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays < 0) {
        deadlineBadgeHtml = `<span class="todo-deadline-badge overdue">ðŸ”´ Overdue (${Math.abs(diffDays)}d late)</span>`;
      } else if (diffDays === 0) {
        deadlineBadgeHtml = `<span class="todo-deadline-badge today">âš ï¸ Due Today</span>`;
      } else if (diffDays === 1) {
        deadlineBadgeHtml = `<span class="todo-deadline-badge soon">â³ Due Tomorrow</span>`;
      } else if (diffDays <= 3) {
        deadlineBadgeHtml = `<span class="todo-deadline-badge soon">â³ Due in ${diffDays} days</span>`;
      } else {
        deadlineBadgeHtml = `<span class="todo-deadline-badge normal">ðŸ“… ${formatDateDMY(t.deadlineDate)}</span>`;
      }
    }

    const priorityLabel = t.priority === 'high' ? 'ðŸ”´ High' : (t.priority === 'normal' ? 'ðŸ”µ Normal' : 'ðŸŸ¡ Medium');
    const priorityClass = t.priority || 'medium';
    const isGeneralTask = !t.caseNo || t.caseNo === 'GENERAL' || t.caseNo === 'â€”';
    const caseMetaHtml = isGeneralTask
      ? `<span class="todo-general-tag"><i class="fa-solid fa-thumbtack"></i> General Task</span>`
      : `<span class="todo-case-link-wrap"><a href="javascript:void(0);" class="todo-case-link" onclick="event.stopPropagation(); showTab('search'); document.getElementById('globalSearch').value='${t.caseNo}'; filterCaseTables(false);" title="Search case">${t.caseNo}</a></span>`;

    let stepSummaryBadgeHtml = '';
    if (t.steps && Array.isArray(t.steps) && t.steps.length > 0) {
      const completedCount = t.steps.filter(s => s.completed).length;
      const pct = Math.round((completedCount / t.steps.length) * 100);
      stepSummaryBadgeHtml = `
        <span class="todo-step-count-badge" onclick="event.stopPropagation(); openTaskDetailsModal('${t.id}')" title="Multi-Step Workflow (${completedCount}/${t.steps.length} completed)">
          <i class="fa-solid fa-list-check"></i> ${completedCount}/${t.steps.length} Steps (${pct}%)
        </span>
      `;
    }

    let reminderBadgeHtml = '';
    if (t.reminderDateTime && !isDone) {
      const remDate = new Date(t.reminderDateTime);
      if (!isNaN(remDate.getTime())) {
        const isPast = remDate.getTime() <= Date.now();
        const remFmt = remDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) + ' ' + remDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        reminderBadgeHtml = `<span class="todo-reminder-badge ${isPast ? 'triggered' : 'scheduled'}" onclick="event.stopPropagation(); openTaskReminderModal('${t.id}')" title="Reminder: ${remFmt}"><i class="fa-solid fa-bell"></i> ${remFmt}</span>`;
      }
    }

    return `
      <div class="todo-item priority-${priorityClass} ${isDone ? 'status-completed' : ''}" id="${t.id}">
        <div class="todo-item-accent-bar"></div>
        <div class="todo-item-inner">
          <div class="todo-checkbox-wrapper">
            <input type="checkbox" class="todo-checkbox" ${isDone ? 'checked' : ''} onchange="toggleTaskStatus('${t.id}')" title="Mark as ${isDone ? 'Pending' : 'Completed'}">
          </div>
          <div class="todo-item-content" onclick="openTaskDetailsModal('${t.id}')" style="cursor: pointer;" title="Click to view full details">
            <div class="todo-item-top">
              <span class="todo-item-title">${t.taskTitle}</span>
              <span class="todo-priority-pill ${priorityClass}">${priorityLabel}</span>
            </div>
            <div class="todo-compact-meta-row">
              ${caseMetaHtml}
              ${deadlineBadgeHtml}
              ${t.copyNumber ? `<span class="todo-copy-badge" onclick="event.stopPropagation(); editTaskCopyNumber('${t.id}')" title="Copy / App No."><i class="fa-solid fa-stamp"></i> No: <strong>${t.copyNumber}</strong></span>` : ''}
              ${stepSummaryBadgeHtml}
              ${reminderBadgeHtml}
            </div>
          </div>
          <div class="todo-item-actions">
            <button type="button" class="todo-detail-btn" onclick="openTaskDetailsModal('${t.id}')" title="Show Full Details & Actions">
              <i class="fa-solid fa-eye"></i> <span>Show Details</span>
            </button>
            <div class="todo-quick-btns">
              <button type="button" class="todo-reminder-btn ${t.reminderDateTime ? 'has-reminder' : ''}" onclick="openTaskReminderModal('${t.id}')" title="${t.reminderDateTime ? 'Edit Reminder' : 'Set Reminder'}" aria-label="Set Reminder"><i class="fa-solid fa-bell"></i></button>
              <button type="button" class="todo-reschedule-btn" onclick="rescheduleCaseTask('${t.id}')" title="Reschedule Deadline"><i class="fa-solid fa-calendar-days"></i></button>
              <button type="button" class="todo-delete-btn" onclick="deleteCaseTask('${t.id}')" title="Delete Task"><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}
if (typeof renderCaseTasks !== 'undefined') window.renderCaseTasks = renderCaseTasks;
if (typeof populateTodoCaseDropdown !== 'undefined') window.populateTodoCaseDropdown = populateTodoCaseDropdown;

// ==============================================================================
// Task Details & Management Dossier Modal View
// ==============================================================================

function openTaskDetailsModal(taskId) {
  const task = caseTasks.find(t => t.id === taskId);
  if (!task) return;

  const modal = document.getElementById('taskDetailsModal');
  const content = document.getElementById('taskDetailsModalContent');
  const footer = document.getElementById('taskDetailsModalFooter');
  const taskIdInput = document.getElementById('taskDetailsModalTaskId');
  if (!modal || !content || !footer) return;

  if (taskIdInput) taskIdInput.value = taskId;

  const isDone = task.status === 'completed';
  const isGeneralTask = !task.caseNo || task.caseNo === 'GENERAL' || task.caseNo === 'â€”';
  const hearingFormatted = isGeneralTask ? 'â€”' : (task.hearingDate && task.hearingDate !== 'â€”' ? formatDateDMY(task.hearingDate) : 'Undated');
  const priorityClass = task.priority || 'medium';
  const priorityLabel = task.priority === 'high' ? 'ðŸ”´ High (Urgent)' : (task.priority === 'normal' ? 'ðŸ”µ Normal' : 'ðŸŸ¡ Medium');

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = parseDateString(task.deadlineDate);
  let deadlineBadgeHtml = '';
  let deadlineDiffText = '';

  if (isDone) {
    deadlineBadgeHtml = `<span class="todo-deadline-badge completed">âœ… Completed</span>`;
    deadlineDiffText = 'Task has been completed.';
  } else if (d) {
    d.setHours(0, 0, 0);
    const diffDays = Math.round((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) {
      deadlineBadgeHtml = `<span class="todo-deadline-badge overdue">ðŸ”´ Overdue (${Math.abs(diffDays)} days late)</span>`;
      deadlineDiffText = `âš ï¸ Overdue by ${Math.abs(diffDays)} day${Math.abs(diffDays) === 1 ? '' : 's'}!`;
    } else if (diffDays === 0) {
      deadlineBadgeHtml = `<span class="todo-deadline-badge today">âš ï¸ Due Today</span>`;
      deadlineDiffText = `âš¡ Deadline is today!`;
    } else if (diffDays === 1) {
      deadlineBadgeHtml = `<span class="todo-deadline-badge soon">â³ Due Tomorrow</span>`;
      deadlineDiffText = `â³ 1 day remaining until deadline.`;
    } else {
      deadlineBadgeHtml = `<span class="todo-deadline-badge ${diffDays <= 3 ? 'soon' : 'normal'}">ðŸ“… Due in ${diffDays} days</span>`;
      deadlineDiffText = `ðŸ“… ${diffDays} days remaining.`;
    }
  }

  let reminderInfoHtml = '';
  if (task.reminderDateTime) {
    const remDate = new Date(task.reminderDateTime);
    if (!isNaN(remDate.getTime())) {
      const isPast = remDate.getTime() <= Date.now();
      const remFmt = remDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ' at ' + remDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      reminderInfoHtml = `
        <div class="task-modal-reminder-pill ${isPast ? 'triggered' : 'scheduled'}">
          <i class="fa-solid fa-bell"></i> <span><strong>Reminder:</strong> ${remFmt} ${isPast ? '(Triggered)' : '(Active)'}</span>
        </div>
      `;
    }
  }

  let stepperModalHtml = '';
  if (task.steps && Array.isArray(task.steps) && task.steps.length > 0) {
    const completedCount = task.steps.filter(s => s.completed).length;
    const pct = Math.round((completedCount / task.steps.length) * 100);
    stepperModalHtml = `
      <div class="task-modal-stepper-box">
        <div class="task-stepper-header">
          <span><i class="fa-solid fa-list-check"></i> <strong>Multi-Step Workflow Progress (${completedCount}/${task.steps.length})</strong></span>
          <span class="task-stepper-pct">${pct}% Completed</span>
        </div>
        <div class="task-stepper-bar-bg" style="height: 8px; margin: 8px 0 12px;">
          <div class="task-stepper-bar-fill" style="width: ${pct}%;"></div>
        </div>
        <div class="task-steps-list">
          ${task.steps.map(step => {
            const isNextStep = !step.completed && !task.steps.some(s => s.id < step.id && !s.completed);
            return `
            <button type="button"
                    class="step-chip ${step.completed ? 'completed' : ''} ${!step.completed && !isNextStep ? 'locked' : ''}"
                    ${!step.completed && !isNextStep ? 'disabled' : ''}
                    onclick="toggleTaskSubStep('${task.id}', ${step.id})"
                    title="${step.completed ? 'Click to re-open this step' : (isNextStep ? 'Click to complete: ' + step.name : 'Complete earlier steps first â€” ' + step.name)}">
              <span class="step-num-badge">${step.completed ? 'âœ“' : step.id}</span>
              <span class="step-chip-text" style="font-size: 13px;">${step.name}</span>
              ${step.date ? `<small class="step-date-chip" style="font-size: 11px;">ðŸ“… ${formatDateDMY(step.date)}</small>` : ''}
              ${!step.completed && !isNextStep ? '<i class="fa-solid fa-lock" style="font-size: 11px; opacity: 0.6; margin-left: 6px;"></i>' : '<i class="fa-solid fa-arrow-pointer" style="font-size: 10px; opacity: 0.4; margin-left: auto;"></i>'}
            </button>
          `;}).join('')}
        </div>
        <div style="font-size: 11px; color: #64748b; margin-top: 8px; text-align: right;">
          ðŸ’¡ Click any active step to complete or revert
        </div>
      </div>
    `;
  }

  content.innerHTML = `
    <div class="task-modal-detail-wrapper">
      <!-- Title & Main Status Card -->
      <div class="task-modal-header-card priority-${priorityClass} ${isDone ? 'is-completed' : ''}">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; flex-wrap: wrap;">
          <span class="task-modal-priority-badge ${priorityClass}">${priorityLabel}</span>
          <div style="display: flex; gap: 6px; flex-wrap: wrap;">
            ${deadlineBadgeHtml}
            ${isDone ? '<span class="task-modal-status-badge done">âœ… Finished</span>' : '<span class="task-modal-status-badge pending">â³ In Progress</span>'}
          </div>
        </div>
        <h3 class="task-modal-title" style="${isDone ? 'text-decoration: line-through; opacity: 0.75;' : ''}">${task.taskTitle}</h3>
        ${task.copyNumber ? `
          <div class="task-modal-copy-pill" onclick="editTaskCopyNumber('${task.id}')" title="Click to edit application number">
            <i class="fa-solid fa-stamp"></i> Certified Copy / App No: <strong>${task.copyNumber}</strong> <i class="fa-solid fa-pen" style="font-size: 9px; margin-left: 4px;"></i>
          </div>
        ` : ''}
      </div>

      <!-- Case Information Grid Card -->
      <div class="task-modal-section-card">
        <h4 class="task-modal-section-title"><i class="fa-solid fa-scale-balanced"></i> Linked Case &amp; Court Details</h4>
        ${isGeneralTask ? `
          <div class="task-modal-general-box">
            <i class="fa-solid fa-thumbtack" style="color: #6366f1; font-size: 16px;"></i>
            <div>
              <strong>General Chamber Task</strong>
              <p style="margin: 2px 0 0; font-size: 12px; color: #64748b;">This task is a general office/advocate to-do item not linked to a specific court docket.</p>
            </div>
          </div>
        ` : `
          <div class="task-modal-info-grid">
            <div class="task-modal-info-item">
              <span class="task-modal-info-lbl">Case Number</span>
              <span class="task-modal-info-val">
                <a href="javascript:void(0);" class="todo-case-link" onclick="closeTaskDetailsModal(); showTab('search'); document.getElementById('globalSearch').value='${task.caseNo}'; filterCaseTables(false);" title="View Case Dossier">
                  ${task.caseNo} â†—
                </a>
              </span>
            </div>
            <div class="task-modal-info-item">
              <span class="task-modal-info-lbl">Parties Name</span>
              <span class="task-modal-info-val">${task.caseName || 'â€”'}</span>
            </div>
            <div class="task-modal-info-item">
              <span class="task-modal-info-lbl">Court</span>
              <span class="task-modal-info-val">ðŸ›ï¸ ${task.court || 'â€”'}</span>
            </div>
            <div class="task-modal-info-item">
              <span class="task-modal-info-lbl">Next Court Hearing</span>
              <span class="task-modal-info-val" style="color: #1d4ed8; font-weight: 700;">ðŸ“… ${hearingFormatted}</span>
            </div>
          </div>
        `}
      </div>

      <!-- Deadline & Reminder Details Card -->
      <div class="task-modal-section-card">
        <h4 class="task-modal-section-title"><i class="fa-solid fa-calendar-check"></i> Deadline &amp; Schedule</h4>
        <div class="task-modal-info-grid">
          <div class="task-modal-info-item">
            <span class="task-modal-info-lbl">Target Deadline Date</span>
            <span class="task-modal-info-val" style="font-weight: 700; font-size: 14px;">ðŸ“… ${formatDateDMY(task.deadlineDate)}</span>
            <span style="font-size: 11px; color: #64748b; margin-top: 2px;">${deadlineDiffText}</span>
          </div>
          <div class="task-modal-info-item">
            <span class="task-modal-info-lbl">Reminder Alert</span>
            ${reminderInfoHtml || '<span style="font-size: 12px; color: #94a3b8;">No reminder alert configured</span>'}
          </div>
        </div>
      </div>

      <!-- Multi-step Stepper Section -->
      ${stepperModalHtml}
    </div>
  `;

  footer.innerHTML = `
    <div class="task-modal-actions-grid">
      <button type="button" class="task-modal-btn btn-toggle ${isDone ? 'is-pending' : 'is-done'}" onclick="toggleTaskStatus('${task.id}');" title="${isDone ? 'Mark as Pending' : 'Mark as Completed'}">
        <i class="fa-solid ${isDone ? 'fa-rotate-left' : 'fa-check-double'}"></i> <span>${isDone ? 'Mark as Pending' : 'Mark as Completed'}</span>
      </button>
      <div class="task-modal-secondary-btns">
        <button type="button" class="task-modal-btn btn-reminder" onclick="openTaskReminderModal('${task.id}')" title="Set or Edit Reminder">
          <i class="fa-solid fa-bell"></i> <span>${task.reminderDateTime ? 'Edit Alert' : 'Set Alert'}</span>
        </button>
        <button type="button" class="task-modal-btn btn-reschedule" onclick="rescheduleCaseTask('${task.id}');" title="Reschedule Deadline Date">
          <i class="fa-solid fa-calendar-days"></i> <span>Reschedule</span>
        </button>
        <button type="button" class="task-modal-btn btn-delete" onclick="deleteCaseTask('${task.id}'); closeTaskDetailsModal();" title="Delete Task">
          <i class="fa-solid fa-trash"></i> <span>Delete</span>
        </button>
        <button type="button" class="task-modal-btn btn-close" onclick="closeTaskDetailsModal()" title="Close Dossier">
          <i class="fa-solid fa-xmark"></i> <span>Close</span>
        </button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
}

function closeTaskDetailsModal() {
  const modal = document.getElementById('taskDetailsModal');
  if (modal) modal.classList.add('hidden');
}

if (typeof openTaskDetailsModal !== 'undefined') window.openTaskDetailsModal = openTaskDetailsModal;
if (typeof closeTaskDetailsModal !== 'undefined') window.closeTaskDetailsModal = closeTaskDetailsModal;

// ==============================================================================
// Task Reminder & Alert Notification Engine
// ==============================================================================

function playReminderChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    // First tone (587.33 Hz - D5)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now);
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.22, now + 0.04);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.35);

    // Second tone (880 Hz - A5, bright chime)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880, now + 0.16);
    gain2.gain.setValueAtTime(0, now + 0.16);
    gain2.gain.linearRampToValueAtTime(0.28, now + 0.20);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.16);
    osc2.stop(now + 0.65);
  } catch (e) {
    console.warn('Web Audio chime not allowed or supported:', e);
  }
}
if (typeof playReminderChime !== 'undefined') window.playReminderChime = playReminderChime;

function initTodoNotificationBanner() {
  const banner = document.getElementById('todoNotificationBanner');
  if (!banner) return;
  if (!('Notification' in window)) {
    banner.style.display = 'none';
    return;
  }
  const dismissed = safeStorage.get('cmDismissedNotifyBanner') === 'true';
  if (Notification.permission === 'default' && !dismissed) {
    banner.style.display = 'flex';
  } else {
    banner.style.display = 'none';
  }
}

async function requestTodoNotificationPermission() {
  if (!('Notification' in window)) {
    alert('Browser notifications are not supported in your current browser.');
    return;
  }
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      showToastNotification('ðŸ”” Desktop alerts enabled successfully!');
      const banner = document.getElementById('todoNotificationBanner');
      if (banner) banner.style.display = 'none';
      playReminderChime();
    } else {
      showToastNotification('Notification permission not granted.');
    }
  } catch (e) {
    console.warn('Notification permission error:', e);
  }
}
if (typeof requestTodoNotificationPermission !== 'undefined') window.requestTodoNotificationPermission = requestTodoNotificationPermission;

function dismissTodoNotificationBanner() {
  const banner = document.getElementById('todoNotificationBanner');
  if (banner) banner.style.display = 'none';
  safeStorage.set('cmDismissedNotifyBanner', 'true', true);
}
if (typeof dismissTodoNotificationBanner !== 'undefined') window.dismissTodoNotificationBanner = dismissTodoNotificationBanner;

function checkPendingTodoReminders() {
  if (!Array.isArray(caseTasks) || caseTasks.length === 0) return;
  const now = Date.now();

  caseTasks.forEach(task => {
    if (task.status === 'completed') return;
    if (!task.reminderDateTime) return;
    if (task.reminderDismissed || task.reminderNotified) return;

    const remTime = new Date(task.reminderDateTime).getTime();
    if (!isNaN(remTime) && remTime <= now) {
      triggerTaskReminder(task);
    }
  });
}

function triggerTaskReminder(task) {
  task.reminderNotified = true;
  saveCaseTasksLocally();
  renderCaseTasks(currentTodoFilter);

  // Play audio chime
  playReminderChime();

  // Trigger Native Desktop / PWA Notification if permitted
  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      const bodyText = `${task.caseNo && task.caseNo !== 'GENERAL' ? `[${task.caseNo}] ` : ''}Due: ${formatDateDMY(task.deadlineDate)}`;
      const notif = new Notification(`â° Task Reminder: ${task.taskTitle}`, {
        body: bodyText,
        icon: 'icons/icon-192.png',
        badge: 'icons/icon-192.png',
        tag: task.id,
        requireInteraction: true
      });
      notif.onclick = function() {
        window.focus();
        showTab('todo');
        this.close();
      };
    } catch (e) {
      console.warn('Native notification error:', e);
    }
  }

  // Display In-App Floating Alert Banner
  renderFloatingReminderAlert(task);
}

function renderFloatingReminderAlert(task) {
  const container = document.getElementById('todoFloatingAlertContainer');
  if (!container) return;

  const alertId = `floating_rem_${task.id}`;
  if (document.getElementById(alertId)) return;

  const card = document.createElement('div');
  card.id = alertId;
  card.className = 'todo-floating-alert-card';

  const caseLabel = (task.caseNo && task.caseNo !== 'GENERAL') ? `<span class="floating-rem-case">${task.caseNo}</span>` : '<span class="floating-rem-case general">General</span>';

  card.innerHTML = `
    <div class="floating-rem-top">
      <div class="floating-rem-icon">â°</div>
      <div class="floating-rem-info">
        <div class="floating-rem-badge-row">
          <span class="floating-rem-tag">REMINDER ALERT</span>
          ${caseLabel}
        </div>
        <div class="floating-rem-title">${task.taskTitle}</div>
        <div class="floating-rem-deadline">ðŸ“… Deadline: <strong>${formatDateDMY(task.deadlineDate)}</strong></div>
      </div>
      <button type="button" class="floating-rem-close-btn" onclick="dismissTaskReminder('${task.id}')" title="Dismiss">âœ•</button>
    </div>
    <div class="floating-rem-actions">
      <button type="button" class="floating-rem-btn snooze" onclick="snoozeTaskReminder('${task.id}', 60)">
        <i class="fa-solid fa-clock-rotate-left"></i> Snooze 1h
      </button>
      <button type="button" class="floating-rem-btn complete" onclick="completeTaskFromReminder('${task.id}')">
        <i class="fa-solid fa-check"></i> Mark Done
      </button>
      <button type="button" class="floating-rem-btn whatsapp" onclick="sendTaskWhatsAppReminder('${task.id}')">
        <i class="fa-brands fa-whatsapp"></i> Share
      </button>
    </div>
  `;

  container.appendChild(card);
}

function snoozeTaskReminder(taskId, minutes = 60) {
  const task = caseTasks.find(t => t.id === taskId);
  if (!task) return;

  const snoozeDate = new Date(Date.now() + minutes * 60 * 1000);
  const yyyy = snoozeDate.getFullYear();
  const mm = String(snoozeDate.getMonth() + 1).padStart(2, '0');
  const dd = String(snoozeDate.getDate()).padStart(2, '0');
  const hh = String(snoozeDate.getHours()).padStart(2, '0');
  const min = String(snoozeDate.getMinutes()).padStart(2, '0');

  task.reminderDateTime = `${yyyy}-${mm}-${dd}T${hh}:${min}`;
  task.reminderNotified = false;
  task.reminderDismissed = false;

  saveCaseTasksLocally();
  renderCaseTasks(currentTodoFilter);

  const el = document.getElementById(`floating_rem_${taskId}`);
  if (el) el.remove();

  showToastNotification(`â° Snoozed for ${minutes >= 60 ? (minutes / 60) + ' hour(s)' : minutes + ' minutes'}`);
}
if (typeof snoozeTaskReminder !== 'undefined') window.snoozeTaskReminder = snoozeTaskReminder;

function completeTaskFromReminder(taskId) {
  const el = document.getElementById(`floating_rem_${taskId}`);
  if (el) el.remove();
  toggleTaskStatus(taskId);
  showToastNotification('âœ… Task completed!');
}
if (typeof completeTaskFromReminder !== 'undefined') window.completeTaskFromReminder = completeTaskFromReminder;

function dismissTaskReminder(taskId) {
  const task = caseTasks.find(t => t.id === taskId);
  if (task) {
    task.reminderDismissed = true;
    saveCaseTasksLocally();
  }
  const el = document.getElementById(`floating_rem_${taskId}`);
  if (el) el.remove();
}
if (typeof dismissTaskReminder !== 'undefined') window.dismissTaskReminder = dismissTaskReminder;

function sendTaskWhatsAppReminder(taskId) {
  const task = caseTasks.find(t => t.id === taskId);
  if (!task) return;

  const caseInfo = (task.caseNo && task.caseNo !== 'GENERAL') ? `\nâš–ï¸ Case: ${task.caseNo} (${task.caseName || 'â€”'})` : '';
  const text = `ðŸ“Œ *Case Task Reminder Alert*\n` +
               `-------------------------------\n` +
               `Task: *${task.taskTitle}*` +
               caseInfo + `\n` +
               `ðŸ“… Deadline: ${formatDateDMY(task.deadlineDate)}\n` +
               `Priority: ${task.priority ? task.priority.toUpperCase() : 'MEDIUM'}\n\n` +
               `Sent via CaseBook Management System`;

  const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}
if (typeof sendTaskWhatsAppReminder !== 'undefined') window.sendTaskWhatsAppReminder = sendTaskWhatsAppReminder;

// Quick Modal Functions for Setting / Editing Reminders on Tasks
function openTaskReminderModal(taskId) {
  const task = caseTasks.find(t => t.id === taskId);
  if (!task) return;

  const modal = document.getElementById('todoReminderModal');
  const idInput = document.getElementById('todoReminderModalTaskId');
  const dtInput = document.getElementById('todoReminderModalInput');
  const subtitle = document.getElementById('todoReminderModalTaskSubtitle');
  const statusInfo = document.getElementById('todoReminderCurrentStatusText');
  const removeBtn = document.getElementById('todoReminderRemoveBtn');

  if (!modal) return;

  idInput.value = taskId;
  if (subtitle) {
    subtitle.textContent = `${task.taskTitle} (Deadline: ${formatDateDMY(task.deadlineDate)})`;
  }

  if (task.reminderDateTime) {
    if (dtInput) dtInput.value = task.reminderDateTime;
    const remD = new Date(task.reminderDateTime);
    const remFmt = !isNaN(remD.getTime()) ? remD.toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : task.reminderDateTime;
    if (statusInfo) statusInfo.innerHTML = `ðŸŸ¢ Current active reminder set for: <strong>${remFmt}</strong>`;
    if (removeBtn) removeBtn.style.display = 'inline-flex';
  } else {
    // Default to deadline morning 9:00 AM or tomorrow morning
    if (dtInput) {
      const deadlineDate = parseDateString(task.deadlineDate);
      if (deadlineDate) {
        const y = deadlineDate.getFullYear();
        const m = String(deadlineDate.getMonth() + 1).padStart(2, '0');
        const d = String(deadlineDate.getDate()).padStart(2, '0');
        dtInput.value = `${y}-${m}-${d}T09:00`;
      } else {
        const tom = new Date();
        tom.setDate(tom.getDate() + 1);
        const y = tom.getFullYear();
        const m = String(tom.getMonth() + 1).padStart(2, '0');
        const d = String(tom.getDate()).padStart(2, '0');
        dtInput.value = `${y}-${m}-${d}T09:00`;
      }
    }
    if (statusInfo) statusInfo.innerHTML = 'âšª No active reminder currently set for this task.';
    if (removeBtn) removeBtn.style.display = 'none';
  }

  modal.classList.remove('hidden');
  modal.style.display = 'flex';
}
if (typeof openTaskReminderModal !== 'undefined') window.openTaskReminderModal = openTaskReminderModal;

function closeTodoReminderModal() {
  const modal = document.getElementById('todoReminderModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.style.display = 'none';
  }
}
if (typeof closeTodoReminderModal !== 'undefined') window.closeTodoReminderModal = closeTodoReminderModal;

function setModalReminderPreset(preset) {
  const dtInput = document.getElementById('todoReminderModalInput');
  const idInput = document.getElementById('todoReminderModalTaskId');
  if (!dtInput) return;

  const task = caseTasks.find(t => t.id === idInput?.value);
  const now = new Date();
  let target = new Date(now.getTime());

  if (preset === 'in1hour') {
    target = new Date(now.getTime() + 60 * 60 * 1000);
  } else if (preset === 'today_evening') {
    target.setHours(18, 0, 0, 0);
    if (target.getTime() <= now.getTime()) {
      target.setDate(target.getDate() + 1);
    }
  } else if (preset === 'tomorrow_9am') {
    target.setDate(target.getDate() + 1);
    target.setHours(9, 0, 0, 0);
  } else if (preset === 'deadline_9am') {
    const dl = parseDateString(task?.deadlineDate);
    if (dl) {
      target = new Date(dl.getTime());
      target.setHours(9, 0, 0, 0);
    } else {
      target.setDate(target.getDate() + 1);
      target.setHours(9, 0, 0, 0);
    }
  }

  const yyyy = target.getFullYear();
  const mm = String(target.getMonth() + 1).padStart(2, '0');
  const dd = String(target.getDate()).padStart(2, '0');
  const hh = String(target.getHours()).padStart(2, '0');
  const min = String(target.getMinutes()).padStart(2, '0');

  dtInput.value = `${yyyy}-${mm}-${dd}T${hh}:${min}`;
}
if (typeof setModalReminderPreset !== 'undefined') window.setModalReminderPreset = setModalReminderPreset;

function saveTaskReminderFromModal() {
  const idInput = document.getElementById('todoReminderModalTaskId');
  const dtInput = document.getElementById('todoReminderModalInput');
  if (!idInput || !idInput.value) return;

  const task = caseTasks.find(t => t.id === idInput.value);
  if (!task) return;

  const val = dtInput ? dtInput.value : '';
  if (!val) {
    alert('Please choose a valid reminder date and time.');
    return;
  }

  task.reminderDateTime = val;
  task.reminderNotified = false;
  task.reminderDismissed = false;

  saveCaseTasksLocally();
  renderCaseTasks(currentTodoFilter);
  closeTodoReminderModal();

  const remD = new Date(val);
  const remFmt = !isNaN(remD.getTime()) ? remD.toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : val;
  showToastNotification(`â° Reminder set for ${remFmt}!`);

  // Auto-request notification permission if not yet decided
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
}
if (typeof saveTaskReminderFromModal !== 'undefined') window.saveTaskReminderFromModal = saveTaskReminderFromModal;

function removeTaskReminderFromModal() {
  const idInput = document.getElementById('todoReminderModalTaskId');
  if (!idInput || !idInput.value) return;

  const task = caseTasks.find(t => t.id === idInput.value);
  if (!task) return;

  task.reminderDateTime = null;
  task.reminderNotified = false;
  task.reminderDismissed = false;

  saveCaseTasksLocally();
  renderCaseTasks(currentTodoFilter);
  closeTodoReminderModal();
  showToastNotification('â° Reminder removed');
}
if (typeof removeTaskReminderFromModal !== 'undefined') window.removeTaskReminderFromModal = removeTaskReminderFromModal;

// Start interval checker for pending reminders (every 30 seconds)
if (!window._todoReminderInterval) {
  window._todoReminderInterval = setInterval(checkPendingTodoReminders, 30000);
}
// Run an immediate check 3 seconds after boot
setTimeout(() => {
  initTodoNotificationBanner();
  checkPendingTodoReminders();
}, 3000);


// Auto-Exports
if (typeof checkPendingTodoReminders !== 'undefined') window.checkPendingTodoReminders = checkPendingTodoReminders;
if (typeof closeTaskDetailsModal !== 'undefined') window.closeTaskDetailsModal = closeTaskDetailsModal;
if (typeof completeTaskFromReminder !== 'undefined') window.completeTaskFromReminder = completeTaskFromReminder;
if (typeof filterTodoCaseDropdown !== 'undefined') window.filterTodoCaseDropdown = filterTodoCaseDropdown;
if (typeof openTaskReminderModal !== 'undefined') window.openTaskReminderModal = openTaskReminderModal;
if (typeof setTodoReminderPreset !== 'undefined') window.setTodoReminderPreset = setTodoReminderPreset;
if (typeof toggleTodoCaseDropdown !== 'undefined') window.toggleTodoCaseDropdown = toggleTodoCaseDropdown;
if (typeof updateTodoCounters !== 'undefined') window.updateTodoCounters = updateTodoCounters;
if (typeof renderFloatingReminderAlert !== 'undefined') window.renderFloatingReminderAlert = renderFloatingReminderAlert;
if (typeof toggleTodoReminderFields !== 'undefined') window.toggleTodoReminderFields = toggleTodoReminderFields;
if (typeof closeTodoCaseDropdown !== 'undefined') window.closeTodoCaseDropdown = closeTodoCaseDropdown;
if (typeof toggleTaskStatus !== 'undefined') window.toggleTaskStatus = toggleTaskStatus;
if (typeof loadCaseTasks !== 'undefined') window.loadCaseTasks = loadCaseTasks;
if (typeof toggleTaskSubStep !== 'undefined') window.toggleTaskSubStep = toggleTaskSubStep;
if (typeof playReminderChime !== 'undefined') window.playReminderChime = playReminderChime;
if (typeof dismissTodoNotificationBanner !== 'undefined') window.dismissTodoNotificationBanner = dismissTodoNotificationBanner;
if (typeof removeTaskReminderFromModal !== 'undefined') window.removeTaskReminderFromModal = removeTaskReminderFromModal;
if (typeof onTodoCopyNumberInput !== 'undefined') window.onTodoCopyNumberInput = onTodoCopyNumberInput;
if (typeof editTaskCopyNumber !== 'undefined') window.editTaskCopyNumber = editTaskCopyNumber;
if (typeof saveCaseTasks !== 'undefined') window.saveCaseTasks = saveCaseTasks;
if (typeof rescheduleCaseTask !== 'undefined') window.rescheduleCaseTask = rescheduleCaseTask;
if (typeof initTodoNotificationBanner !== 'undefined') window.initTodoNotificationBanner = initTodoNotificationBanner;
if (typeof saveTaskReminderFromModal !== 'undefined') window.saveTaskReminderFromModal = saveTaskReminderFromModal;
if (typeof renderCaseTasks !== 'undefined') window.renderCaseTasks = renderCaseTasks;
if (typeof updateTodoSyncIndicator !== 'undefined') window.updateTodoSyncIndicator = updateTodoSyncIndicator;
if (typeof snoozeTaskReminder !== 'undefined') window.snoozeTaskReminder = snoozeTaskReminder;
if (typeof handleAddTodoSubmit !== 'undefined') window.handleAddTodoSubmit = handleAddTodoSubmit;
if (typeof setModalReminderPreset !== 'undefined') window.setModalReminderPreset = setModalReminderPreset;
if (typeof dismissTaskReminder !== 'undefined') window.dismissTaskReminder = dismissTaskReminder;
if (typeof setTodoPriority !== 'undefined') window.setTodoPriority = setTodoPriority;
if (typeof triggerTaskReminder !== 'undefined') window.triggerTaskReminder = triggerTaskReminder;
if (typeof setTodoDeadlinePreset !== 'undefined') window.setTodoDeadlinePreset = setTodoDeadlinePreset;
if (typeof onTodoWorkflowTypeChange !== 'undefined') window.onTodoWorkflowTypeChange = onTodoWorkflowTypeChange;
if (typeof populateTodoCaseDropdown !== 'undefined') window.populateTodoCaseDropdown = populateTodoCaseDropdown;
if (typeof filterTodoTasks !== 'undefined') window.filterTodoTasks = filterTodoTasks;
if (typeof closeTodoReminderModal !== 'undefined') window.closeTodoReminderModal = closeTodoReminderModal;
if (typeof openTodoForCase !== 'undefined') window.openTodoForCase = openTodoForCase;
if (typeof selectTodoCase !== 'undefined') window.selectTodoCase = selectTodoCase;
if (typeof renderTodoCaseDropdownItems !== 'undefined') window.renderTodoCaseDropdownItems = renderTodoCaseDropdownItems;
if (typeof onTodoSearchInput !== 'undefined') window.onTodoSearchInput = onTodoSearchInput;
if (typeof requestTodoNotificationPermission !== 'undefined') window.requestTodoNotificationPermission = requestTodoNotificationPermission;
if (typeof openTodoCaseDropdown !== 'undefined') window.openTodoCaseDropdown = openTodoCaseDropdown;
if (typeof saveCaseTasksLocally !== 'undefined') window.saveCaseTasksLocally = saveCaseTasksLocally;
if (typeof updateSupabaseStatusIndicator !== 'undefined') window.updateSupabaseStatusIndicator = updateSupabaseStatusIndicator;
if (typeof clearTodoCaseSelection !== 'undefined') window.clearTodoCaseSelection = clearTodoCaseSelection;
if (typeof openTaskDetailsModal !== 'undefined') window.openTaskDetailsModal = openTaskDetailsModal;
if (typeof sendTaskWhatsAppReminder !== 'undefined') window.sendTaskWhatsAppReminder = sendTaskWhatsAppReminder;
if (typeof onTodoCaseSelectChange !== 'undefined') window.onTodoCaseSelectChange = onTodoCaseSelectChange;
if (typeof deleteCaseTask !== 'undefined') window.deleteCaseTask = deleteCaseTask;
