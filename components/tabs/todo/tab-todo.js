window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs["todo"] = `
    <div class="section-header-row">
        <div class="section-title-box">
            <div class="section-icon-badge"><i class="fa-solid fa-list-check"></i></div>
            <div>
                <h3>Case Tasks & To-Do Tracker</h3>
            </div>
        </div>
        
    </div>

    <!-- Native Reminder Notification Permission Banner -->
    <div id="todoNotificationBanner" class="todo-alert-promo-banner" style="display: none;">
        <div class="todo-promo-left">
            <span class="todo-promo-icon">🔔</span>
            <div>
                <strong>Never Miss a Court Filing or Preparation Deadline!</strong>
                <p>Enable native desktop and browser alerts to get real-time chime and push reminders even when working on other tabs.</p>
            </div>
        </div>
        <div class="todo-promo-actions">
            <button type="button" class="todo-enable-notify-btn" onclick="requestTodoNotificationPermission()">
                <i class="fa-solid fa-bell"></i> Enable Alerts
            </button>
            <button type="button" class="todo-dismiss-notify-btn" onclick="dismissTodoNotificationBanner()" title="Dismiss">✕</button>
        </div>
    </div>

    <!-- Stat Cards Grid -->
    <div class="todo-stats-grid">
        <div class="todo-stat-card total">
            <div class="todo-stat-icon-wrap all"><i class="fa-solid fa-layer-group"></i></div>
            <div class="todo-stat-info">
                <span class="todo-stat-num" id="todoStatTotal">0</span>
                <span class="todo-stat-lbl">Total Tasks</span>
            </div>
            <div class="todo-stat-bg-icon"><i class="fa-solid fa-layer-group"></i></div>
        </div>
        <div class="todo-stat-card pending">
            <div class="todo-stat-icon-wrap pending"><i class="fa-solid fa-hourglass-half"></i></div>
            <div class="todo-stat-info">
                <span class="todo-stat-num" id="todoStatPending">0</span>
                <span class="todo-stat-lbl">Pending</span>
            </div>
            <div class="todo-stat-bg-icon"><i class="fa-solid fa-hourglass-half"></i></div>
        </div>
        <div class="todo-stat-card urgent">
            <div class="todo-stat-icon-wrap urgent"><i class="fa-solid fa-fire"></i></div>
            <div class="todo-stat-info">
                <span class="todo-stat-num" id="todoStatDueSoon">0</span>
                <span class="todo-stat-lbl">Due Soon</span>
            </div>
            <div class="todo-stat-bg-icon"><i class="fa-solid fa-fire"></i></div>
        </div>
        <div class="todo-stat-card completed">
            <div class="todo-stat-icon-wrap completed"><i class="fa-solid fa-circle-check"></i></div>
            <div class="todo-stat-info">
                <div class="todo-stat-num-row">
                    <span class="todo-stat-num" id="todoStatCompleted">0</span>
                    <span class="todo-stat-pct-text" id="todoProgressPercentage">0%</span>
                </div>
                <span class="todo-stat-lbl">Completed</span>
                <div class="todo-progress-track"><div id="todoProgressBar" class="todo-progress-fill" style="width: 0%;"></div></div>
            </div>
            <div class="todo-stat-bg-icon"><i class="fa-solid fa-circle-check"></i></div>
        </div>
    </div>

    <div class="todo-layout-grid todo-layout-grid--task-list-only">
        <!-- New Task Form Modal -->
        <div
            id="todoTaskCreateModal"
            class="modal-overlay hidden todo-task-modal-scope"
            data-todo-scope
            role="dialog"
            aria-modal="true"
            aria-labelledby="todoTaskCreateModalTitle"
            onclick="if (event.target === this) closeTodoTaskModal();"
        >
            <div class="modal-card todo-task-create-modal-box">
                <div class="modal-header">
                    <div class="modal-header-info">
                        <div class="modal-icon"><i class="fa-solid fa-scale-balanced"></i></div>
                        <div>
                            <h3 id="todoTaskCreateModalTitle">New Task</h3>
                            <p class="modal-subtitle">Link a task to a case hearing or general to-do</p>
                        </div>
                    </div>
                    <button type="button" id="todoTaskCreateModalCloseBtn" class="modal-close-btn" onclick="closeTodoTaskModal()" aria-label="Close" title="Close">&times;</button>
                </div>

        <div class="todo-form-panel">
            <div class="todo-panel-header">
                <div class="todo-panel-header-gradient">
                    <div class="todo-panel-header-icon"><i class="fa-solid fa-scale-balanced"></i></div>
                    <div>
                        <h4>New Task</h4>
                        <p class="todo-panel-subtitle">Link a task to a case hearing or general to-do</p>
                    </div>
                </div>
            </div>

            <form id="addTodoForm" onsubmit="return handleAddTodoSubmit(event);">
                <!-- Searchable / Typeable Case Dropdown Group -->
                <div class="form-group todo-searchable-group">
                    <div class="todo-label-row">
                        <label for="todoCaseSearchInput">Link to Case</label>
                        <span class="todo-field-hint">Type to search — or pick 📌 General Task</span>
                    </div>
                    <div class="todo-combobox-wrapper" id="todoComboboxWrapper">
                        <button type="button" class="todo-select-trigger" id="todoCaseSelectTrigger" aria-haspopup="listbox" aria-expanded="false" onclick="toggleTodoCaseDropdown()">
                            <span class="todo-select-trigger-label" id="todoCaseSelectedLabel">Select a case or choose General Task</span>
                            <svg class="todo-select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </button>
                        <!-- Hidden native select for form serialization, backward compatibility & test suites -->
                        <select id="todoCaseSelect" class="form-select todo-custom-select" style="display: none;" required>
                            <option value="">-- Choose Case to Link --</option>
                        </select>
                        <!-- Searchable grouped dropdown -->
                        <div id="todoCaseDropdownList" class="todo-combobox-results hidden">
                            <div class="todo-dropdown-search-wrapper">
                                <span class="todo-combobox-search-icon"><i class="fa-solid fa-magnifying-glass"></i></span>
                                <input type="text" id="todoCaseSearchInput" class="todo-dropdown-search-input" placeholder="Search cases... (e.g. Bail, Evidence)" autocomplete="off" oninput="filterTodoCaseDropdown(this.value)" onkeydown="handleTodoCaseDropdownKeydown(event)">
                            </div>
                            <ul id="todoCaseOptionsList" class="todo-case-options-list" role="listbox" aria-label="Cases to link"></ul>
                        </div>
                    </div>
                </div>

                <!-- Case info banner with dynamic preview -->
                <div id="todoCaseInfoBanner" class="todo-case-preview-card hidden">
                    <div class="todo-preview-card-badge-row">
                        <span id="todoBannerCaseType" class="case-badge civil">—</span>
                        <span id="todoBannerCaseNum" class="todo-preview-caseno">—</span>
                        <button type="button" class="todo-preview-change-btn" onclick="openTodoCaseDropdown(); document.getElementById('todoCaseSearchInput').focus();" title="Select different case">✏️ Change</button>
                    </div>
                    <h5 id="todoBannerCaseName" class="todo-preview-title">—</h5>
                    <div class="todo-preview-meta-grid">
                        <div class="todo-meta-pill">🏛️ <span id="todoBannerCourt">—</span></div>
                        <div class="todo-meta-pill hearing">📅 Next Hearing: <span id="todoBannerHearing" class="highlight-date-text">—</span></div>
                    </div>
                </div>

                <!-- Task Workflow Type Selector -->
                <div class="form-group">
                    <div class="todo-label-row">
                        <label for="todoWorkflowType">Task Workflow Type</label>
                        <span class="todo-field-hint">Standard or Multi-Step</span>
                    </div>
                    <select id="todoWorkflowType" class="form-select todo-custom-select" onchange="onTodoWorkflowTypeChange(this.value)">
                        <option value="standard">Standard Single Action</option>
                        <option value="certified_copy">📜 Certified Copy (4-Step Workflow)</option>
                        <option value="custom">⚙️ Custom Multi-Step Workflow</option>
                    </select>
                </div>

                <!-- multi-step workflow preview banner -->
                <div id="todoWorkflowStepsPreview" class="todo-workflow-preview hidden">
                    <div class="workflow-preview-header">
                        <i class="fa-solid fa-layer-group"></i> <strong>Certified Copy (4 Steps):</strong>
                    </div>
                    <div class="workflow-preview-steps">
                        <span class="preview-step-tag">1. Apply</span>
                        <span class="preview-step-tag">2. Copy from office</span>
                        <span class="preview-step-tag">3. Preparation in copy office</span>
                        <span class="preview-step-tag">4. Receive</span>
                    </div>
                </div>

                <!-- Application No. (required for all multi-step workflows) -->
                <div id="todoCopyNumberGroup" class="todo-copy-number-group hidden">
                    <div class="todo-label-row">
                        <label for="todoCopyNumber" style="color: #166534; font-weight: 600; font-size: 12px;">Application No. <span class="required-star">*</span></label>
                        <span class="todo-field-hint" style="color: #15803d;">Required for multi-step tasks</span>
                    </div>
                    <div class="todo-input-icon-wrap" style="margin-top: 4px;">
                        <span class="todo-input-inner-icon" style="color: #166534;"><i class="fa-solid fa-stamp"></i></span>
                        <input type="text" id="todoCopyNumber" class="todo-custom-input with-icon" placeholder="Enter application number (e.g. 12344/12)" oninput="onTodoCopyNumberInput(this.value)">
                    </div>
                </div>

                <!-- Custom Multi-Step Definition Input -->
                <div id="todoCustomStepsContainer" class="todo-custom-steps-wrap hidden">
                    <div class="todo-label-row">
                        <label for="todoCustomStepsInput">Define Sub-Steps <span class="required-star">*</span></label>
                        <span class="todo-field-hint">Comma-separated steps</span>
                    </div>
                    <div class="todo-input-icon-wrap">
                        <span class="todo-input-inner-icon"><i class="fa-solid fa-list-ol"></i></span>
                        <input type="text" id="todoCustomStepsInput" class="todo-custom-input with-icon" placeholder="e.g. Drafting, Verification, Filing, Notice Served">
                    </div>
                    <div class="custom-step-tips-row">
                        <span>💡 Type steps separated by commas. Each will become a clickable check-step.</span>
                    </div>
                </div>

                <div class="form-group">
                    <div class="todo-label-row">
                        <label for="todoTitle">Task / Action Item <span class="required-star">*</span></label>
                        <span class="todo-field-hint">Preparation or filing</span>
                    </div>
                    <div class="todo-input-icon-wrap">
                        <span class="todo-input-inner-icon"><i class="fa-solid fa-pen"></i></span>
                        <input type="text" id="todoTitle" class="todo-custom-input with-icon" placeholder="e.g. Draft Written Statement, File Bail, Collect Evidence" required>
                    </div>
                </div>

                <div class="form-group">
                    <div class="todo-label-row">
                        <label for="todoDeadline">Deadline Date <span class="required-star">*</span></label>
                        <span class="todo-field-hint">Due before or on hearing</span>
                    </div>
                    <div class="todo-input-icon-wrap">
                        <span class="todo-input-inner-icon"><i class="fa-solid fa-calendar-day"></i></span>
                        <input type="date" id="todoDeadline" class="todo-custom-input with-icon highlight-date-input" required>
                    </div>
                    <div class="todo-shortcuts-row">
                        <button type="button" class="todo-shortcut-pill" onclick="setTodoDeadlinePreset('hearing')" title="Set deadline on the exact hearing date">🎯 Hearing Date</button>
                        <button type="button" class="todo-shortcut-pill" onclick="setTodoDeadlinePreset('1day')" title="Set deadline 1 day before the hearing">⚡ 1 Day</button>
                        <button type="button" class="todo-shortcut-pill" onclick="setTodoDeadlinePreset('3days')" title="Set deadline 3 days before the hearing">📋 3 Days</button>
                    </div>
                </div>

                <!-- Reminder & Alert Notification Section -->
                <div class="form-group todo-reminder-group">
                    <div class="todo-label-row">
                        <label for="todoReminderToggle" class="todo-reminder-label-flex" style="cursor: pointer;">
                            <span><i class="fa-solid fa-bell" style="color: #f59e0b; margin-right: 5px;"></i> Set Reminder Alert</span>
                        </label>
                        <label class="todo-switch">
                            <input type="checkbox" id="todoReminderToggle" onchange="toggleTodoReminderFields(this.checked)">
                            <span class="todo-slider round"></span>
                        </label>
                    </div>
                    <div id="todoReminderFields" class="todo-reminder-subbox hidden">
                        <div class="todo-input-icon-wrap" style="margin-bottom: 8px;">
                            <span class="todo-input-inner-icon"><i class="fa-solid fa-bell"></i></span>
                            <input type="datetime-local" id="todoReminderDateTime" class="todo-custom-input with-icon highlight-date-input">
                        </div>
                        <div class="todo-shortcuts-row">
                            <button type="button" class="todo-shortcut-pill" onclick="setTodoReminderPreset('deadline_9am')" title="Remind on deadline morning at 9:00 AM">🎯 Deadline 9 AM</button>
                            <button type="button" class="todo-shortcut-pill" onclick="setTodoReminderPreset('1day_9am')" title="Remind 1 day before deadline at 9:00 AM">⚡ 1 Day Before</button>
                            <button type="button" class="todo-shortcut-pill" onclick="setTodoReminderPreset('2days_9am')" title="Remind 2 days before deadline at 9:00 AM">📋 2 Days Before</button>
                        </div>
                        <span class="todo-field-hint" style="display: block; margin-top: 6px; font-size: 11px;">
                            💡 Sound chime + desktop notification when the time arrives.
                        </span>
                    </div>
                </div>

                <div class="form-group">
                    <label>Priority Level</label>
                    <input type="hidden" id="todoPriority" value="medium">
                    <div class="todo-priority-selector">
                        <button type="button" class="todo-priority-chip high" onclick="setTodoPriority('high')">
                            <span class="chip-dot red"></span> High (Urgent)
                        </button>
                        <button type="button" class="todo-priority-chip medium active" onclick="setTodoPriority('medium')">
                            <span class="chip-dot amber"></span> Medium
                        </button>
                        <button type="button" class="todo-priority-chip normal" onclick="setTodoPriority('normal')">
                            <span class="chip-dot blue"></span> Normal
                        </button>
                    </div>
                </div>

            </form>
        </div>

                <div class="modal-footer">
                    <button type="button" id="todoTaskCreateModalCancelBtn" class="secondary-btn" onclick="closeTodoTaskModal()">Cancel</button>
                    <button type="submit" id="saveTodoBtn" form="addTodoForm" class="todo-submit-btn primary-btn">
                        <i class="fa-solid fa-paper-plane"></i> <span>Create Task</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Right Column: Interactive Tasks List -->
        <div class="todo-list-panel">
            <div class="todo-list-header">
                <div class="todo-list-header-top">
                    <div class="todo-search-box">
                        <span class="todo-search-icon"><i class="fa-solid fa-magnifying-glass"></i></span>
                        <input type="text" id="todoSearchInput" class="todo-search-input" placeholder="Search tasks by title, case number, party..." oninput="onTodoSearchInput(this.value)" enterkeyhint="search" autocomplete="off">
                    </div>
                </div>

                <div class="todo-filter-strip">
                    <button type="button" class="todo-filter-tab active" data-filter="all" onclick="filterTodoTasks('all', this)">
                        <i class="fa-solid fa-grid-2"></i> All <span class="todo-filter-count" id="todoFilterAllCount">0</span>
                    </button>
                    <button type="button" class="todo-filter-tab" data-filter="pending" onclick="filterTodoTasks('pending', this)">
                        <i class="fa-solid fa-hourglass-half"></i> Pending <span class="todo-filter-count" id="todoFilterPendingCount">0</span>
                    </button>
                    <button type="button" class="todo-filter-tab tab-urgent" data-filter="dueSoon" onclick="filterTodoTasks('dueSoon', this)">
                        <i class="fa-solid fa-fire"></i> Due Soon <span class="todo-filter-count" id="todoFilterDueSoonCount">0</span>
                    </button>
                    <button type="button" class="todo-filter-tab tab-done" data-filter="completed" onclick="filterTodoTasks('completed', this)">
                        <i class="fa-solid fa-circle-check"></i> Done <span class="todo-filter-count" id="todoFilterCompletedCount">0</span>
                    </button>
                </div>
            </div>

            <div id="todoListContainer" class="todo-items-list">
                <div class="todo-empty-state">
                    <div class="todo-empty-icon-wrap">
                        <i class="fa-solid fa-clipboard-list"></i>
                    </div>
                    <h4 class="todo-empty-title">No Tasks Yet</h4>
                    <p>Create a task to track filings, deadlines, follow-ups, and case preparation.</p>
                    <button type="button" class="todo-empty-cta" onclick="openTodoTaskModal()"><i class="fa-solid fa-plus"></i> Create First Task</button>
                </div>
            </div>
        </div>
    </div>
<!-- ================= TODO MODALS (MODULARIZED) ================= -->
    <div
      id="todoReminderModal"
      class="modal-overlay hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="todoReminderModalTitle"
      onclick="if (event.target === this) closeTodoReminderModal();"
    >
      <div class="modal-card modal-card-sm todo-reminder-modal-box">
        <div class="modal-header">
          <div class="modal-header-info">
            <div
              class="modal-icon"
              style="background: rgba(245, 158, 11, 0.12); color: #d97706"
            >
              <i class="fa-solid fa-bell"></i>
            </div>
            <div>
              <h3
                id="todoReminderModalTitle"
                style="
                  margin: 0;
                  font-size: 16px;
                  font-weight: 700;
                  color: #0f172a;
                "
              >
                Task Reminder Alert
              </h3>
              <p
                style="margin: 2px 0 0 0; font-size: 12px; color: #64748b"
                id="todoReminderModalTaskSubtitle"
                class="modal-subtitle"
              >
                Set audio chime and desktop notification
              </p>
            </div>
          </div>
          <button
            type="button"
            class="modal-close-btn"
            onclick="closeTodoReminderModal()"
            aria-label="Close"
            title="Close"
          >
            &times;
          </button>
        </div>
        <div class="modal-body" style="padding: 18px 20px">
          <input type="hidden" id="todoReminderModalTaskId" />
          <div class="form-group" style="margin-bottom: 14px">
            <label
              for="todoReminderModalInput"
              style="
                font-size: 13px;
                font-weight: 600;
                color: #1e293b;
                display: block;
                margin-bottom: 6px;
              "
            >
              Reminder Date &amp; Time
            </label>
            <div class="todo-input-icon-wrap">
              <span class="todo-input-inner-icon"
                ><i class="fa-solid fa-bell"></i
              ></span>
              <input
                type="datetime-local"
                id="todoReminderModalInput"
                class="todo-custom-input with-icon highlight-date-input"
              />
            </div>
          </div>
          <div class="todo-shortcuts-row" style="margin-bottom: 14px">
            <button
              type="button"
              class="todo-shortcut-pill"
              onclick="setModalReminderPreset('in1hour')"
            >
              ⏱️ In 1 Hour
            </button>
            <button
              type="button"
              class="todo-shortcut-pill"
              onclick="setModalReminderPreset('today_evening')"
            >
              🌆 Today 6 PM
            </button>
            <button
              type="button"
              class="todo-shortcut-pill"
              onclick="setModalReminderPreset('tomorrow_9am')"
            >
              🌅 Tomorrow 9 AM
            </button>
            <button
              type="button"
              class="todo-shortcut-pill"
              onclick="setModalReminderPreset('deadline_9am')"
            >
              🎯 Deadline 9 AM
            </button>
          </div>
          <div
            class="todo-reminder-status-info"
            id="todoReminderCurrentStatusText"
            style="
              font-size: 12px;
              color: #475569;
              background: #f1f5f9;
              padding: 10px 12px;
              border-radius: 8px;
            "
          >
            No reminder active for this task.
          </div>
        </div>
        <div
          class="modal-footer"
          style="
            padding: 12px 20px;
            background: #f8fafc;
            border-top: 1px solid #e2e8f0;
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <button
            type="button"
            class="table-view-btn"
            id="todoReminderRemoveBtn"
            onclick="removeTaskReminderFromModal()"
            style="
              color: #dc2626;
              border-color: #fecaca;
              background: #fff5f5;
              display: none;
            "
          >
            <i class="fa-solid fa-trash-can"></i> Remove Alert
          </button>
          <div style="display: flex; gap: 8px; margin-left: auto">
            <button
              type="button"
              class="table-view-btn"
              onclick="closeTodoReminderModal()"
            >
              Cancel
            </button>
            <button
              type="button"
              class="primary-btn"
              id="saveTaskReminderBtn"
              onclick="saveTaskReminderFromModal()"
              style="padding: 8px 18px; border-radius: 8px"
            >
              <i class="fa-solid fa-check"></i> Save Reminder
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Task Details & Management Dossier Modal -->
    <div
      id="taskDetailsModal"
      class="modal-overlay hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="taskDetailsModalTitle"
      onclick="if (event.target === this) closeTaskDetailsModal();"
    >
      <div class="modal-container task-details-modal-box">
        <div class="modal-header">
          <div class="header-title">
            <h2 id="taskDetailsModalTitle">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="header-dossier-icon">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <span>Task Dossier &amp; Actions</span>
            </h2>
            <p id="taskDetailsModalSubtitle">Full case preparation &amp; workflow details</p>
          </div>
          <button
            type="button"
            class="btn-close modal-close-btn"
            onclick="closeTaskDetailsModal()"
            aria-label="Close"
            title="Close"
          >
            &times;
          </button>
        </div>
        <div class="modal-body task-details-modal-body" id="taskDetailsModalScrollBody">
          <input type="hidden" id="taskDetailsModalTaskId" />
          <div id="taskDetailsModalContent">
            <!-- Populated dynamically by JS -->
          </div>
        </div>
        <div
          class="modal-footer task-details-modal-footer"
          id="taskDetailsModalFooter"
        >
        </div>
      </div>
    </div>
`;

let todoTaskModalPreviousFocus = null;
let todoTaskModalScrollLock = null;

function mountTodoTaskModal() {
  const modalInstances = Array.from(document.querySelectorAll("#todoTaskCreateModal"));
  const modal = modalInstances[modalInstances.length - 1] || null;
  const container = document.getElementById("caseModalsContainer");
  modalInstances
    .filter((instance) => instance !== modal)
    .forEach((instance) => instance.remove());
  if (modal && container && modal.parentElement !== container) {
    container.appendChild(modal);
  }
  return modal;
}

function openTodoTaskModal() {
  const modal = mountTodoTaskModal();
  if (modal) {
    if (typeof window.populateTodoCaseDropdown === "function") window.populateTodoCaseDropdown(document.getElementById("todoCaseSelect")?.value || "");
    todoTaskModalPreviousFocus = document.activeElement;
    const scrollbarWidth = Math.max(0, window.innerWidth - document.documentElement.clientWidth);
    todoTaskModalScrollLock = {
      bodyOverflow: document.body.style.overflow,
      bodyPaddingRight: document.body.style.paddingRight,
    };
    modal.classList.remove("hidden");
    modal.style.display = "flex";
    document.body.classList.add("todo-task-modal-open");
    document.body.style.paddingRight = scrollbarWidth > 0 ? `${scrollbarWidth}px` : "";
    requestAnimationFrame(() => {
      document.getElementById("todoTaskCreateModalCloseBtn")?.focus();
    });
  }
}
if (typeof openTodoTaskModal !== "undefined")
  window.openTodoTaskModal = openTodoTaskModal;

function closeTodoTaskModal() {
  const modal = document.getElementById("todoTaskCreateModal");
  if (modal) {
    modal.classList.add("hidden");
    modal.style.display = "none";
    document.body.classList.remove("todo-task-modal-open");
    if (todoTaskModalScrollLock) {
      document.body.style.overflow = todoTaskModalScrollLock.bodyOverflow;
      document.body.style.paddingRight = todoTaskModalScrollLock.bodyPaddingRight;
      todoTaskModalScrollLock = null;
    }
    if (todoTaskModalPreviousFocus && typeof todoTaskModalPreviousFocus.focus === "function" && document.contains(todoTaskModalPreviousFocus)) {
      todoTaskModalPreviousFocus.focus();
    }
    todoTaskModalPreviousFocus = null;
  }
}
if (typeof closeTodoTaskModal !== "undefined")
  window.closeTodoTaskModal = closeTodoTaskModal;

if (!window.__todoTaskModalEscapeBound) {
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const modal = document.getElementById("todoTaskCreateModal");
      if (modal && !modal.classList.contains("hidden")) closeTodoTaskModal();
    }
  });
  window.__todoTaskModalEscapeBound = true;
}

// ==============================================================================
// Case To-Do List & Deadline Tracker Logic (Supabase Synced & Beautified)
// ==============================================================================
if (typeof caseTasks !== "undefined") window.caseTasks = caseTasks;

function updateTodoSyncIndicator(isSynced) {
  const ind = document.getElementById("todoSyncIndicator");
  if (!ind) return;
  if (isSynced && supabaseClient) {
    ind.className = "todo-sync-pill";
    ind.innerHTML = '<span class="sync-dot"></span> Supabase Synced';
  } else {
    ind.className = "todo-sync-pill";
    ind.style.background = "#f1f5f9";
    ind.style.borderColor = "#cbd5e1";
    ind.style.color = "#475569";
    ind.innerHTML = "💾 Local Storage Ready";
  }
}
if (typeof updateTodoSyncIndicator !== "undefined")
  window.updateTodoSyncIndicator = updateTodoSyncIndicator;

function updateSupabaseStatusIndicator(isConnected) {
  const pill =
    document.getElementById("homeHeroStatus") || document.querySelector(".hero-status-pill");
  if (!pill) return;
  const textEl =
    document.getElementById("homeHeroStatusText") || pill.querySelector("span:not(.live-dot)");
  if (isConnected) {
    pill.classList.remove("disconnected");
    pill.classList.add("connected");
    if (textEl) textEl.textContent = "Supabase Cloud Connected";
  } else {
    pill.classList.remove("connected");
    pill.classList.add("disconnected");
    if (textEl) textEl.textContent = "Supabase Cloud Disconnected";
  }
}
if (typeof updateSupabaseStatusIndicator !== "undefined")
  window.updateSupabaseStatusIndicator = updateSupabaseStatusIndicator;

// Reflect connection state on initial page load (event listeners only fire on changes)
updateSupabaseStatusIndicator(navigator.onLine && !!supabaseClient);

window.addEventListener("online", () => {
  if (supabaseClient) {
    updateSupabaseStatusIndicator(true);
    if (typeof fetchAllDataFromSupabase === "function") fetchAllDataFromSupabase();
  } else {
    updateSupabaseStatusIndicator(false);
  }
});

window.addEventListener("offline", () => {
  updateSupabaseStatusIndicator(false);
});

function loadCaseTasks() {
  try {
    const raw = safeStorage.get("cmCaseTasks");
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
    safeStorage.set("cmCaseTasks", JSON.stringify(caseTasks), true);
  } catch (e) {
    console.error("Failed to save tasks locally:", e);
  }
  updateTodoCounters();
}

function saveCaseTasks() {
  saveCaseTasksLocally();
}

function updateTodoCounters() {
  const total = caseTasks.length;
  const pending = caseTasks.filter((t) => t.status !== "completed").length;
  const completed = caseTasks.filter((t) => t.status === "completed").length;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueSoonOrOverdue = caseTasks.filter((t) => {
    if (t.status === "completed") return false;
    const d = parseDateString(t.deadlineDate);
    if (!d) return false;
    d.setHours(0, 0, 0, 0);
    const diffDays = Math.round((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 3;
  }).length;

  const navBadge = document.getElementById("todoNavCount");
  if (navBadge) navBadge.textContent = String(pending);

  const statTotal = document.getElementById("todoStatTotal");
  const statPending = document.getElementById("todoStatPending");
  const statDueSoon = document.getElementById("todoStatDueSoon");
  const statCompleted = document.getElementById("todoStatCompleted");

  if (statTotal) statTotal.textContent = String(total);
  if (statPending) statPending.textContent = String(pending);
  if (statDueSoon) statDueSoon.textContent = String(dueSoonOrOverdue);
  if (statCompleted) statCompleted.textContent = String(completed);

  const fAll = document.getElementById("todoFilterAllCount");
  const fPending = document.getElementById("todoFilterPendingCount");
  const fDueSoon = document.getElementById("todoFilterDueSoonCount");
  const fCompleted = document.getElementById("todoFilterCompletedCount");

  if (fAll) fAll.textContent = String(total);
  if (fPending) fPending.textContent = String(pending);
  if (fDueSoon) fDueSoon.textContent = String(dueSoonOrOverdue);
  if (fCompleted) fCompleted.textContent = String(completed);

  // Goal Progress Bar
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  const progressBar = document.getElementById("todoProgressBar");
  const progressText = document.getElementById("todoProgressPercentage");
  if (progressBar) progressBar.style.width = `${pct}%`;
  if (progressText) progressText.textContent = `${pct}%`;
}

function setTodoPriority(level) {
  const hiddenInput = document.getElementById("todoPriority");
  if (hiddenInput) hiddenInput.value = level;

  document.querySelectorAll(".todo-priority-chip").forEach((chip) => {
    chip.classList.toggle("active", chip.classList.contains(level));
  });
}
if (typeof setTodoPriority !== "undefined") window.setTodoPriority = setTodoPriority;

// ==============================================================================
// Searchable Combobox for Case Selector
// ==============================================================================
function renderTodoCaseDropdownItems(casesToRender) {
  const container = document.getElementById("todoCaseDropdownList");
  if (!container) return;

  const currentSelected = document.getElementById("todoCaseSelect")?.value || "";

  const generalTaskOptionHtml = `
    <div class="todo-combobox-item todo-general-item ${currentSelected === "__GENERAL__" ? "selected" : ""}" onclick="selectTodoCase('__GENERAL__')">
      <div class="combobox-item-top">
        <span class="combobox-case-num">📌 General Task</span>
        <span class="case-badge misc">GENERAL</span>
      </div>
      <div class="combobox-item-name">A task not linked to any specific case</div>
      <div class="combobox-item-meta">
        <span>🗂️ Office / personal work, reminders, filings…</span>
      </div>
    </div>
  `;

  if (!casesToRender || casesToRender.length === 0) {
    container.innerHTML =
      generalTaskOptionHtml +
      `
      <div class="todo-combobox-empty">
        <span>🔎 No matching cases found</span>
      </div>
    `;
    return;
  }

  container.innerHTML =
    generalTaskOptionHtml +
    casesToRender
      .map((c) => {
        const num = c.caseNo || c.criminalCaseNumber || "";
        const name =
          c.caseName ||
          (c.plaintiff
            ? `${c.plaintiff} vs ${c.defendant}`
            : c.victimName
              ? `${c.victimName} vs ${c.accusedName}`
              : "—");
        const court = c.courtName || c.criminalCourtName || "District Court";
        const caseType = (c.caseType || "civil").toLowerCase();
        const hasHearing = c.nextHearing && c.nextHearing !== "—";
        const hearingText = hasHearing
          ? `📅 Hearing: ${formatDateDMY(c.nextHearing)}`
          : "⚠️ Undated";
        const isSelected = currentSelected.toLowerCase() === num.toLowerCase();

        return `
      <div class="todo-combobox-item ${isSelected ? "selected" : ""}" onclick="selectTodoCase('${num}')">
        <div class="combobox-item-top">
          <span class="combobox-case-num">${num}</span>
          <span class="case-badge ${caseType}">${caseType.toUpperCase()}</span>
        </div>
        <div class="combobox-item-name">${name}</div>
        <div class="combobox-item-meta">
          <span>🏛️ ${court}</span>
          <span class="combobox-hearing-badge ${hasHearing ? "" : "undated"}">${hearingText}</span>
        </div>
      </div>
    `;
      })
      .join("");
}

function openTodoCaseDropdown() {
  const dropdown = document.getElementById("todoCaseDropdownList");
  if (!dropdown) return;
  dropdown.classList.remove("hidden");

  const searchInput = document.getElementById("todoCaseSearchInput");
  const query = searchInput ? searchInput.value.trim() : "";
  filterTodoCaseDropdown(query);
}
if (typeof openTodoCaseDropdown !== "undefined") window.openTodoCaseDropdown = openTodoCaseDropdown;

function closeTodoCaseDropdown() {
  const dropdown = document.getElementById("todoCaseDropdownList");
  if (dropdown) dropdown.classList.add("hidden");
}
if (typeof closeTodoCaseDropdown !== "undefined")
  window.closeTodoCaseDropdown = closeTodoCaseDropdown;

function toggleTodoCaseDropdown() {
  const dropdown = document.getElementById("todoCaseDropdownList");
  if (!dropdown) return;
  if (dropdown.classList.contains("hidden")) {
    openTodoCaseDropdown();
    const searchInput = document.getElementById("todoCaseSearchInput");
    if (searchInput && typeof searchInput.focus === "function") searchInput.focus();
  } else {
    closeTodoCaseDropdown();
  }
}
if (typeof toggleTodoCaseDropdown !== "undefined")
  window.toggleTodoCaseDropdown = toggleTodoCaseDropdown;

function filterTodoCaseDropdown(query, keepClosed = false) {
  const dropdown = document.getElementById("todoCaseDropdownList");
  if (dropdown && !keepClosed) dropdown.classList.remove("hidden");

  const clearBtn = document.getElementById("todoComboboxClearBtn");
  if (clearBtn) clearBtn.style.display = query ? "flex" : "none";

  const cleanQuery = (query || "").trim().toLowerCase();

  const sorted = [...allCaseRecords].sort((a, b) => {
    const numA = (a.caseNo || a.criminalCaseNumber || "").toUpperCase();
    const numB = (b.caseNo || b.criminalCaseNumber || "").toUpperCase();
    return numA.localeCompare(numB);
  });

  if (!cleanQuery) {
    renderTodoCaseDropdownItems(sorted);
    return;
  }

  const filtered = sorted.filter((c) => {
    const num = (c.caseNo || c.criminalCaseNumber || "").toLowerCase();
    const name = (
      c.caseName ||
      (c.plaintiff
        ? `${c.plaintiff} vs ${c.defendant}`
        : c.victimName
          ? `${c.victimName} vs ${c.accusedName}`
          : "")
    ).toLowerCase();
    const court = (c.courtName || c.criminalCourtName || "").toLowerCase();
    return num.includes(cleanQuery) || name.includes(cleanQuery) || court.includes(cleanQuery);
  });

  renderTodoCaseDropdownItems(filtered);
}
if (typeof filterTodoCaseDropdown !== "undefined")
  window.filterTodoCaseDropdown = filterTodoCaseDropdown;

function selectTodoCase(caseNo) {
  const select = document.getElementById("todoCaseSelect");
  const searchInput = document.getElementById("todoCaseSearchInput");
  const clearBtn = document.getElementById("todoComboboxClearBtn");

  if (select) select.value = caseNo;

  if (caseNo === "__GENERAL__") {
    if (searchInput) searchInput.value = "📌 General Task (no case linked)";
    if (clearBtn) clearBtn.style.display = "flex";
    closeTodoCaseDropdown();
    onTodoCaseSelectChange();
    return;
  }

  const found = allCaseRecords.find((c) => {
    const num1 = (c.caseNo || "").toLowerCase();
    const num2 = (c.criminalCaseNumber || "").toLowerCase();
    return num1 === caseNo.toLowerCase() || num2 === caseNo.toLowerCase();
  });

  if (found && searchInput) {
    const name =
      found.caseName ||
      (found.plaintiff
        ? `${found.plaintiff} vs ${found.defendant}`
        : found.victimName
          ? `${found.victimName} vs ${found.accusedName}`
          : "—");
    searchInput.value = `${caseNo} — ${name}`;
    if (clearBtn) clearBtn.style.display = "flex";
  }

  closeTodoCaseDropdown();
  onTodoCaseSelectChange();
}
if (typeof selectTodoCase !== "undefined") window.selectTodoCase = selectTodoCase;

function clearTodoCaseSelection() {
  const select = document.getElementById("todoCaseSelect");
  const searchInput = document.getElementById("todoCaseSearchInput");
  const clearBtn = document.getElementById("todoComboboxClearBtn");

  if (select) select.value = "";
  if (searchInput) {
    searchInput.value = "";
    if (typeof searchInput.focus === "function") searchInput.focus();
  }
  if (clearBtn) clearBtn.style.display = "none";

  onTodoCaseSelectChange();
  openTodoCaseDropdown();
}
if (typeof clearTodoCaseSelection !== "undefined")
  window.clearTodoCaseSelection = clearTodoCaseSelection;

function populateTodoCaseDropdown(selectedCaseNo = "") {
  const select = document.getElementById("todoCaseSelect");
  const searchInput = document.getElementById("todoCaseSearchInput");
  const clearBtn = document.getElementById("todoComboboxClearBtn");

  const currentVal = selectedCaseNo || select?.value || "";

  if (select) {
    select.innerHTML = '<option value="">-- Choose Case to Link --</option>';
    const generalOpt = document.createElement("option");
    generalOpt.value = "__GENERAL__";
    generalOpt.textContent = "📌 General Task (no case linked)";
    select.appendChild(generalOpt);
    const sorted = [...allCaseRecords].sort((a, b) => {
      const numA = (a.caseNo || a.criminalCaseNumber || "").toUpperCase();
      const numB = (b.caseNo || b.criminalCaseNumber || "").toUpperCase();
      return numA.localeCompare(numB);
    });

    sorted.forEach((c) => {
      const num = c.caseNo || c.criminalCaseNumber || "";
      if (!num) return;
      const name =
        c.caseName ||
        (c.plaintiff
          ? `${c.plaintiff} vs ${c.defendant}`
          : c.victimName
            ? `${c.victimName} vs ${c.accusedName}`
            : "—");
      const hearing =
        c.nextHearing && c.nextHearing !== "—"
          ? ` (Hearing: ${formatDateDMY(c.nextHearing)})`
          : " (Undated)";
      const opt = document.createElement("option");
      opt.value = num;
      opt.textContent = `${num} — ${name}${hearing}`;
      select.appendChild(opt);
    });
  }

  // Populate combobox dropdown items (keep list closed until user interacts)
  filterTodoCaseDropdown("", true);

  if (currentVal) {
    if (select) select.value = currentVal;
    if (currentVal === "__GENERAL__") {
      if (searchInput) searchInput.value = "📌 General Task (no case linked)";
      if (clearBtn) clearBtn.style.display = "flex";
      onTodoCaseSelectChange();
      return;
    }
    const found = allCaseRecords.find((c) => {
      const num1 = (c.caseNo || "").toLowerCase();
      const num2 = (c.criminalCaseNumber || "").toLowerCase();
      return num1 === currentVal.toLowerCase() || num2 === currentVal.toLowerCase();
    });
    if (found && searchInput) {
      const name =
        found.caseName ||
        (found.plaintiff
          ? `${found.plaintiff} vs ${found.defendant}`
          : found.victimName
            ? `${found.victimName} vs ${found.accusedName}`
            : "—");
      searchInput.value = `${currentVal} — ${name}`;
      if (clearBtn) clearBtn.style.display = "flex";
    }
    onTodoCaseSelectChange();
  } else {
    if (searchInput) searchInput.value = "";
    if (clearBtn) clearBtn.style.display = "none";
    onTodoCaseSelectChange();
  }
}

function onTodoCaseSelectChange() {
  const select = document.getElementById("todoCaseSelect");
  const banner = document.getElementById("todoCaseInfoBanner");
  const typeEl = document.getElementById("todoBannerCaseType");
  const numEl = document.getElementById("todoBannerCaseNum");
  const nameEl = document.getElementById("todoBannerCaseName");
  const courtEl = document.getElementById("todoBannerCourt");
  const hearingEl = document.getElementById("todoBannerHearing");
  const deadlineInput = document.getElementById("todoDeadline");

  const val = select?.value;
  if (!val) {
    if (banner) banner.classList.add("hidden");
    return;
  }

  if (val === "__GENERAL__") {
    if (banner) banner.classList.remove("hidden");
    if (typeEl) {
      typeEl.textContent = "GENERAL";
      typeEl.className = "case-badge misc";
    }
    if (numEl) numEl.textContent = "No Case";
    if (nameEl) nameEl.textContent = "📌 General Task — not linked to any case";
    if (courtEl) courtEl.textContent = "Any / Not applicable";
    if (hearingEl) hearingEl.textContent = "—";
    return;
  }

  const found = allCaseRecords.find((c) => {
    const num1 = (c.caseNo || "").toLowerCase();
    const num2 = (c.criminalCaseNumber || "").toLowerCase();
    return num1 === val.toLowerCase() || num2 === val.toLowerCase();
  });

  if (found) {
    if (banner) banner.classList.remove("hidden");
    const caseType = (found.caseType || "civil").toLowerCase();
    const caseNum = found.caseNo || found.criminalCaseNumber || "—";
    const caseTitle =
      found.caseName ||
      (found.plaintiff
        ? `${found.plaintiff} vs ${found.defendant}`
        : found.victimName
          ? `${found.victimName} vs ${found.accusedName}`
          : "—");

    if (typeEl) {
      typeEl.textContent = caseType.toUpperCase();
      typeEl.className = `case-badge ${caseType}`;
    }
    if (numEl) numEl.textContent = caseNum;
    if (nameEl) nameEl.textContent = caseTitle;
    if (courtEl)
      courtEl.textContent = found.courtName || found.criminalCourtName || "District Court";
    if (hearingEl)
      hearingEl.textContent =
        found.nextHearing && found.nextHearing !== "—"
          ? formatDateDMY(found.nextHearing)
          : "None scheduled (Undated)";

    if (deadlineInput && found.nextHearing && found.nextHearing !== "—") {
      const parsed = parseDateString(found.nextHearing);
      if (parsed) {
        const y = parsed.getFullYear();
        const m = String(parsed.getMonth() + 1).padStart(2, "0");
        const d = String(parsed.getDate()).padStart(2, "0");
        deadlineInput.value = `${y}-${m}-${d}`;
      }
    }
  }
}

function setTodoDeadlinePreset(preset) {
  const select = document.getElementById("todoCaseSelect");
  const deadlineInput = document.getElementById("todoDeadline");
  if (!select || !deadlineInput) return;

  const val = select.value;
  if (!val) {
    alert("Please select a case first.");
    return;
  }

  const found = allCaseRecords.find((c) => {
    const num1 = (c.caseNo || "").toLowerCase();
    const num2 = (c.criminalCaseNumber || "").toLowerCase();
    return num1 === val.toLowerCase() || num2 === val.toLowerCase();
  });

  if (!found || !found.nextHearing || found.nextHearing === "—") {
    alert(
      "This case does not have a scheduled hearing date. Please pick a deadline date manually.",
    );
    return;
  }

  const hearingDate = parseDateString(found.nextHearing);
  if (!hearingDate) return;

  const targetDate = new Date(hearingDate.getTime());
  if (preset === "1day") {
    targetDate.setDate(targetDate.getDate() - 1);
  } else if (preset === "3days") {
    targetDate.setDate(targetDate.getDate() - 3);
  }

  const y = targetDate.getFullYear();
  const m = String(targetDate.getMonth() + 1).padStart(2, "0");
  const d = String(targetDate.getDate()).padStart(2, "0");
  deadlineInput.value = `${y}-${m}-${d}`;
}
if (typeof setTodoDeadlinePreset !== "undefined")
  window.setTodoDeadlinePreset = setTodoDeadlinePreset;

function toggleTodoReminderFields(isChecked) {
  const toggle = document.getElementById("todoReminderToggle");
  if (typeof isChecked !== "boolean" && toggle) {
    isChecked = toggle.checked;
  } else if (toggle && toggle.checked !== isChecked) {
    toggle.checked = isChecked;
  }
  const fields = document.getElementById("todoReminderFields");
  const dtInput = document.getElementById("todoReminderDateTime");
  if (!fields) return;

  if (isChecked) {
    fields.classList.remove("hidden");
    fields.style.display = "block";
    if (dtInput && !dtInput.value) {
      setTodoReminderPreset("deadline_9am");
    }
  } else {
    fields.classList.add("hidden");
    fields.style.display = "none";
    if (dtInput) dtInput.value = "";
  }
}
if (typeof toggleTodoReminderFields !== "undefined")
  window.toggleTodoReminderFields = toggleTodoReminderFields;

function setTodoReminderPreset(preset) {
  const deadlineInput = document.getElementById("todoDeadline");
  const hearingInput = document.getElementById("todoHearingDate");
  const reminderInput = document.getElementById("todoReminderDateTime");
  if (!reminderInput) return;

  let baseDate = null;
  if (deadlineInput && deadlineInput.value) {
    baseDate = new Date(deadlineInput.value + "T09:00:00");
  } else if (hearingInput && hearingInput.value) {
    baseDate = new Date(hearingInput.value + "T09:00:00");
  }

  const now = new Date();
  let target;

  if (baseDate && !isNaN(baseDate.getTime())) {
    target = new Date(baseDate.getTime());
    if (preset === "1day_9am") {
      target.setDate(target.getDate() - 1);
      target.setHours(9, 0, 0, 0);
    } else if (preset === "2days_9am") {
      target.setDate(target.getDate() - 2);
      target.setHours(9, 0, 0, 0);
    } else if (preset === "deadline_9am") {
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
    if (preset === "2days_9am") {
      target.setDate(target.getDate() + 2);
    } else {
      target.setDate(target.getDate() + 1);
    }
    target.setHours(9, 0, 0, 0);
  }

  const yyyy = target.getFullYear();
  const mm = String(target.getMonth() + 1).padStart(2, "0");
  const dd = String(target.getDate()).padStart(2, "0");
  const hh = String(target.getHours()).padStart(2, "0");
  const min = String(target.getMinutes()).padStart(2, "0");

  reminderInput.value = `${yyyy}-${mm}-${dd}T${hh}:${min}`;
}
if (typeof setTodoReminderPreset !== "undefined")
  window.setTodoReminderPreset = setTodoReminderPreset;

async function handleAddTodoSubmit(e) {
  if (e && e.preventDefault) e.preventDefault();
  if (isSubmittingTodo) return false;

  const select = document.getElementById("todoCaseSelect");
  const titleInput = document.getElementById("todoTitle");
  const deadlineInput = document.getElementById("todoDeadline");
  const priorityInput = document.getElementById("todoPriority");
  const submitBtn =
    document.getElementById("saveTodoBtn") ||
    document.querySelector('#addTodoForm button[type="submit"]') ||
    document.querySelector('#todoForm button[type="submit"]') ||
    document.getElementById("addTodoSubmitBtn");

  const caseNoRaw = select?.value?.trim();
  const isGeneralTask = caseNoRaw === "__GENERAL__";
  const caseNo = isGeneralTask ? "GENERAL" : caseNoRaw;
  const title = titleInput?.value?.trim();
  const deadline = deadlineInput?.value;
  const priority = priorityInput?.value || "medium";

  if ((!caseNo && !isGeneralTask) || !title || !deadline) {
    alert("Please fill in all task fields.");
    return false;
  }

  // Prevent duplicate pending task (same case + same title + same deadline)
  const isDuplicateTask = caseTasks.some(
    (t) =>
      t.status !== "completed" &&
      (t.caseNo || "").trim().toLowerCase() === caseNo.toLowerCase() &&
      (t.taskTitle || "").trim().toLowerCase() === title.toLowerCase() &&
      t.deadlineDate === deadline,
  );

  if (isDuplicateTask) {
    alert(
      `⚠️ A pending task "${title}" with deadline ${deadline} already exists${isGeneralTask ? "" : ` for case ${caseNo}`}.`,
    );
    return false;
  }

  const found = isGeneralTask
    ? null
    : allCaseRecords.find((c) => {
        const num1 = (c.caseNo || "").toLowerCase();
        const num2 = (c.criminalCaseNumber || "").toLowerCase();
        return num1 === caseNo.toLowerCase() || num2 === caseNo.toLowerCase();
      });

  const caseName = found
    ? found.caseName ||
      (found.plaintiff
        ? `${found.plaintiff} vs ${found.defendant}`
        : found.victimName
          ? `${found.victimName} vs ${found.accusedName}`
          : "—")
    : isGeneralTask
      ? "General Task (no case)"
      : "—";
  const hearingDate = found?.nextHearing || null;

  try {
    isSubmittingTodo = true;
    if (submitBtn) submitBtn.disabled = true;

    // Check live Supabase for duplicate pending task
    if (supabaseClient && !isGeneralTask) {
      try {
        const { data: dupDb } = await supabaseClient
          .from("case_todos")
          .select("id")
          .ilike("case_number", caseNo)
          .ilike("task_title", title)
          .eq("deadline_date", deadline)
          .neq("status", "completed")
          .limit(1);

        if (dupDb && dupDb.length > 0) {
          alert(`⚠️ A pending task "${title}" already exists in the database for case ${caseNo}.`);
          return false;
        }
      } catch (checkErr) {
        console.warn("Supabase task duplicate check fallback:", checkErr);
      }
    }

    // Check workflow type for multi-step task templates
    const workflowTypeEl = document.getElementById("todoWorkflowType");
    const workflowType = workflowTypeEl ? workflowTypeEl.value : "standard";
    const customStepsInput = document.getElementById("todoCustomStepsInput");
    let taskSteps = [];

    if (workflowType === "certified_copy") {
      taskSteps = [
        { id: 1, name: "Apply", completed: false, date: null },
        { id: 2, name: "Copy from office", completed: false, date: null },
        { id: 3, name: "Preparation in copy office", completed: false, date: null },
        { id: 4, name: "Receive", completed: false, date: null },
      ];
    } else if (workflowType === "custom") {
      const rawSteps = customStepsInput ? customStepsInput.value.trim() : "";
      if (rawSteps) {
        const stepNames = rawSteps
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
        taskSteps = stepNames.map((name, idx) => ({
          id: idx + 1,
          name,
          completed: false,
          date: null,
        }));
      }
    }

    const copyNumberInput = document.getElementById("todoCopyNumber");
    const copyNumber = copyNumberInput ? copyNumberInput.value.trim() : "";

    // Application number is mandatory for every multi-step workflow task
    if (taskSteps.length > 0 && !copyNumber) {
      if (typeof showToastNotification === "function") {
        showToastNotification(
          "⚠️ Application No. is required for multi-step tasks. Please enter it above.",
          3000,
        );
      }
      copyNumberInput?.focus();
      return false;
    }

    const reminderToggle = document.getElementById("todoReminderToggle");
    const reminderInput = document.getElementById("todoReminderDateTime");
    let reminderDateTime = null;
    if (reminderToggle && reminderToggle.checked && reminderInput && reminderInput.value) {
      reminderDateTime = reminderInput.value;
    }

    const newTask = {
      id: "task_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6),
      caseNo,
      caseName,
      taskTitle: title,
      hearingDate,
      deadlineDate: deadline,
      priority,
      status: "pending",
      steps: taskSteps,
      copyNumber: copyNumber,
      reminderDateTime: reminderDateTime,
      reminderNotified: false,
      reminderDismissed: false,
      createdAt: new Date().toISOString(),
    };

    caseTasks.unshift(newTask);
    saveCaseTasksLocally();
    renderCaseTasks(currentTodoFilter);

    if (titleInput) titleInput.value = "";
    if (customStepsInput) customStepsInput.value = "";
    if (copyNumberInput) copyNumberInput.value = "";
    if (workflowTypeEl) workflowTypeEl.value = "standard";
    const previewEl = document.getElementById("todoWorkflowStepsPreview");
    if (previewEl) previewEl.classList.add("hidden");
    const customContainerEl = document.getElementById("todoCustomStepsContainer");
    if (customContainerEl) customContainerEl.classList.add("hidden");

    if (reminderToggle) reminderToggle.checked = false;
    const reminderFieldsEl = document.getElementById("todoReminderFields");
    if (reminderFieldsEl) reminderFieldsEl.classList.add("hidden");
    if (reminderInput) reminderInput.value = "";

    showToastNotification(`📝 Task scheduled${isGeneralTask ? "" : ` for ${caseNo}`}!`);

    // Live Supabase Sync (if configured)
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from("case_todos")
          .insert([
            {
              case_number: newTask.caseNo,
              case_name: newTask.caseNo === "GENERAL" ? "General Task (no case)" : newTask.caseName,
              task_title: newTask.taskTitle,
              hearing_date:
                newTask.hearingDate && newTask.hearingDate !== "—" ? newTask.hearingDate : null,
              deadline_date: newTask.deadlineDate,
              priority: newTask.priority,
              status: newTask.status,
              steps: newTask.steps || [],
              copy_number: newTask.copyNumber || null,
            },
          ])
          .select();

        if (!error && data && data.length > 0) {
          newTask.id = data[0].id;
          saveCaseTasksLocally();
          updateTodoSyncIndicator(true);
        }
      } catch (supaErr) {
        console.warn("Supabase task insert fallback to local:", supaErr);
      }
    }
    await performPostCrudRefresh();
  } finally {
    isSubmittingTodo = false;
    if (submitBtn) submitBtn.disabled = false;
  }

  return false;
}
if (typeof handleAddTodoSubmit !== "undefined") window.handleAddTodoSubmit = handleAddTodoSubmit;

function onTodoCopyNumberInput(val) {
  const titleInput = document.getElementById("todoTitle");
  if (!titleInput) return;
  const trimmed = (val || "").trim();
  // Only auto-format the title for the Certified Copy workflow
  if (titleInput.value.trim() && !titleInput.value.startsWith("Certified Copy")) return;
  if (trimmed) {
    titleInput.value = "Certified Copy (App No. " + trimmed + ")";
  } else {
    titleInput.value = "Certified Copy Application";
  }
}
if (typeof onTodoCopyNumberInput !== "undefined")
  window.onTodoCopyNumberInput = onTodoCopyNumberInput;

function onTodoWorkflowTypeChange(val) {
  const preview = document.getElementById("todoWorkflowStepsPreview");
  const customContainer = document.getElementById("todoCustomStepsContainer");
  const copyNumberGroup = document.getElementById("todoCopyNumberGroup");
  const customInput = document.getElementById("todoCustomStepsInput");
  const copyNumberInput = document.getElementById("todoCopyNumber");
  const titleInput = document.getElementById("todoTitle");

  const isMultiStep = val === "certified_copy" || val === "custom";

  if (val === "certified_copy") {
    if (preview) preview.classList.remove("hidden");
    if (customContainer) customContainer.classList.add("hidden");
    const existingNum = copyNumberInput ? copyNumberInput.value.trim() : "";
    if (titleInput && (!titleInput.value.trim() || titleInput.value.startsWith("Certified Copy"))) {
      titleInput.value = existingNum
        ? "Certified Copy (App No. " + existingNum + ")"
        : "Certified Copy Application";
    }
  } else if (val === "custom") {
    if (preview) preview.classList.add("hidden");
    if (customContainer) customContainer.classList.remove("hidden");
    if (customInput) customInput.focus();
  } else {
    if (preview) preview.classList.add("hidden");
    if (customContainer) customContainer.classList.add("hidden");
    if (copyNumberInput) copyNumberInput.value = "";
  }

  // Application No. is required for every multi-step workflow task
  if (copyNumberGroup) copyNumberGroup.classList.toggle("hidden", !isMultiStep);
  if (!isMultiStep && copyNumberInput) copyNumberInput.value = "";
}
if (typeof onTodoWorkflowTypeChange !== "undefined")
  window.onTodoWorkflowTypeChange = onTodoWorkflowTypeChange;

function filterTodoTasks(filterType, btnEl = null) {
  currentTodoFilter = filterType;
  const filterBtns = document.querySelectorAll(".todo-filter-tab, .todo-filter-btn");
  filterBtns.forEach((b) => {
    b.classList.remove("active");
    if (btnEl ? b === btnEl : b.dataset.filter === filterType) {
      b.classList.add("active");
    }
  });
  renderCaseTasks(filterType);
}
if (typeof filterTodoTasks !== "undefined") window.filterTodoTasks = filterTodoTasks;

// Header shortcut used by the "Pending Tasks" chip. Keep this small alias so
// inline handlers remain compatible with the main filter implementation.
function setTodoFilter(filterType = "pending") {
  const filterButton = document.querySelector(`.todo-filter-tab[data-filter="${filterType}"]`);
  filterTodoTasks(filterType, filterButton);
}
if (typeof setTodoFilter !== "undefined") window.setTodoFilter = setTodoFilter;

function onTodoSearchInput(val) {
  todoSearchQuery = (val || "").trim().toLowerCase();
  renderCaseTasks(currentTodoFilter);
}
if (typeof onTodoSearchInput !== "undefined") window.onTodoSearchInput = onTodoSearchInput;

async function toggleTaskStatus(taskId) {
  const task = caseTasks.find((t) => t.id === taskId);
  if (!task) return;
  task.status = task.status === "completed" ? "pending" : "completed";
  if (task.steps && Array.isArray(task.steps) && task.steps.length > 0) {
    const isCompleted = task.status === "completed";
    task.steps.forEach((s) => {
      s.completed = isCompleted;
      s.date = isCompleted ? s.date || new Date().toISOString().split("T")[0] : null;
    });
  }
  saveCaseTasksLocally();
  renderCaseTasks(currentTodoFilter);

  if (supabaseClient) {
    try {
      await supabaseClient
        .from("case_todos")
        .update({
          status: task.status,
          steps: task.steps || [],
        })
        .eq("id", taskId);
    } catch (e) {
      console.warn("Supabase task toggle fallback to local:", e);
    }
  }
  await performPostCrudRefresh();
}
if (typeof toggleTaskStatus !== "undefined") window.toggleTaskStatus = toggleTaskStatus;

async function toggleTaskSubStep(taskId, stepId) {
  const task = caseTasks.find((t) => t.id === taskId);
  if (!task || !Array.isArray(task.steps)) return;

  const step = task.steps.find((s) => s.id === stepId);
  if (!step) return;

  // Steps must be completed strictly in ascending order — block random ticks
  if (!step.completed) {
    const prevIncomplete = task.steps.some((s) => s.id < step.id && !s.completed);
    if (prevIncomplete) {
      showToastNotification("⚠️ Steps must be completed in order. Finish earlier steps first.");
      return;
    }
  }

  step.completed = !step.completed;
  step.date = step.completed ? new Date().toISOString().split("T")[0] : null;

  if (step.completed && step.name.toLowerCase().includes("apply") && !task.copyNumber) {
    const entered = prompt(
      'Step "Apply" completed! Enter Certified Copy / Application No. (or cancel to add later):',
    );
    if (entered && entered.trim()) {
      task.copyNumber = entered.trim();
      if (task.taskTitle && task.taskTitle.startsWith("Certified Copy")) {
        task.taskTitle = "Certified Copy (App No. " + task.copyNumber + ")";
      }
    }
  }

  // If all steps are completed, automatically mark the whole task completed
  const allCompleted = task.steps.length > 0 && task.steps.every((s) => s.completed);
  task.status = allCompleted ? "completed" : "pending";

  saveCaseTasksLocally();
  renderCaseTasks(currentTodoFilter);

  if (step && step.completed) {
    showToastNotification(`✓ Step completed: ${step.name}`);
  }

  const taskModal = document.getElementById("taskDetailsModal");
  if (taskModal && !taskModal.classList.contains("hidden")) {
    openTaskDetailsModal(taskId);
  }

  if (supabaseClient) {
    try {
      await supabaseClient
        .from("case_todos")
        .update({
          steps: task.steps,
          status: task.status,
          copy_number: task.copyNumber || null,
          task_title: task.taskTitle,
        })
        .eq("id", taskId);
    } catch (e) {
      console.warn("Supabase task step toggle fallback to local:", e);
    }
  }
  await performPostCrudRefresh();
}
if (typeof toggleTaskSubStep !== "undefined") window.toggleTaskSubStep = toggleTaskSubStep;

function rescheduleCaseTask(taskId) {
  const task = caseTasks.find((t) => t.id === taskId);
  if (!task) return;
  const currentISO = toISODate(parseDateString(task.deadlineDate) || new Date());
  const entered = prompt(
    `Reschedule task:\n"${task.taskTitle}"\n\nEnter new deadline date (YYYY-MM-DD):`,
    currentISO,
  );
  if (entered === null) return;
  const trimmed = entered.trim();
  const parsed = parseDateString(trimmed) || parseDateString(toISODate(new Date(trimmed)));
  if (!parsed) {
    alert("⚠️ Please enter a valid date in YYYY-MM-DD format (e.g. 2026-09-15).");
    return;
  }
  const newDeadline = toISODate(parsed);
  task.deadlineDate = newDeadline;
  saveCaseTasksLocally();
  renderCaseTasks(currentTodoFilter);
  const taskModal = document.getElementById("taskDetailsModal");
  if (taskModal && !taskModal.classList.contains("hidden")) {
    openTaskDetailsModal(taskId);
  }
  if (supabaseClient) {
    supabaseClient
      .from("case_todos")
      .update({
        deadline_date: newDeadline,
      })
      .eq("id", taskId)
      .then(() => {
        updateTodoSyncIndicator(true);
      })
      .catch((e) => console.warn("Supabase task reschedule fallback to local:", e));
  }
  showToastNotification(`📅 Task rescheduled to ${formatDateDMY(newDeadline)}!`);
}
if (typeof rescheduleCaseTask !== "undefined") window.rescheduleCaseTask = rescheduleCaseTask;

function editTaskCopyNumber(taskId) {
  const task = caseTasks.find((t) => t.id === taskId);
  if (!task) return;
  const current = task.copyNumber || "";
  const entered = prompt("Enter Certified Copy / Application No.:", current);
  if (entered !== null) {
    task.copyNumber = entered.trim();
    if (task.copyNumber && task.taskTitle && task.taskTitle.startsWith("Certified Copy")) {
      task.taskTitle = "Certified Copy (App No. " + task.copyNumber + ")";
    }
    saveCaseTasksLocally();
    renderCaseTasks(currentTodoFilter);
    const taskModal = document.getElementById("taskDetailsModal");
    if (taskModal && !taskModal.classList.contains("hidden")) {
      openTaskDetailsModal(taskId);
    }
    if (supabaseClient) {
      supabaseClient
        .from("case_todos")
        .update({
          copy_number: task.copyNumber || null,
          task_title: task.taskTitle,
        })
        .eq("id", taskId)
        .then(() => {})
        .catch((e) => console.warn(e));
    }
    showToastNotification("Application No. updated!");
  }
}
if (typeof editTaskCopyNumber !== "undefined") window.editTaskCopyNumber = editTaskCopyNumber;

async function deleteCaseTask(taskId) {
  if (typeof confirm === "function" && !confirm("Are you sure you want to remove this task?"))
    return;
  caseTasks = caseTasks.filter((t) => t.id !== taskId);
  saveCaseTasksLocally();
  renderCaseTasks(currentTodoFilter);
  showToastNotification("🗑️ Task removed");

  if (supabaseClient) {
    try {
      await supabaseClient.from("case_todos").delete().eq("id", taskId);
    } catch (e) {
      console.warn("Supabase task delete fallback to local:", e);
    }
  }
  await performPostCrudRefresh();
}
if (typeof deleteCaseTask !== "undefined") window.deleteCaseTask = deleteCaseTask;

function openTodoForCase(caseNo) {
  showTab("todo");
  if (typeof window.populateTodoCaseDropdown === "function") window.populateTodoCaseDropdown(caseNo);
  setTimeout(() => {
    const titleInput = document.getElementById("todoTitle");
    if (titleInput && typeof titleInput.focus === "function") titleInput.focus();
  }, 100);
}
if (typeof openTodoForCase !== "undefined") window.openTodoForCase = openTodoForCase;

function renderCaseTasks(filter = currentTodoFilter) {
  const container = document.getElementById("todoListContainer");
  if (!container) return;

  updateTodoCounters();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let filtered = [...caseTasks];

  // Apply tab filter
  if (filter === "pending") {
    filtered = filtered.filter((t) => t.status !== "completed");
  } else if (filter === "completed") {
    filtered = filtered.filter((t) => t.status === "completed");
  } else if (filter === "dueSoon") {
    filtered = filtered.filter((t) => {
      if (t.status === "completed") return false;
      const d = parseDateString(t.deadlineDate);
      if (!d) return false;
      d.setHours(0, 0, 0, 0);
      const diffDays = Math.round((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays <= 3;
    });
  }

  // Apply search query
  if (todoSearchQuery) {
    filtered = filtered.filter((t) => {
      const title = (t.taskTitle || "").toLowerCase();
      const num = (t.caseNo || "").toLowerCase();
      const name = (t.caseName || "").toLowerCase();
      const copy = (t.copyNumber || "").toLowerCase();
      const general = t.caseNo ? "" : "general task no case";
      return (
        title.includes(todoSearchQuery) ||
        num.includes(todoSearchQuery) ||
        name.includes(todoSearchQuery) ||
        copy.includes(todoSearchQuery) ||
        general.includes(todoSearchQuery)
      );
    });
  }

  if (filtered.length === 0) {
    const msg = todoSearchQuery
      ? `No tasks match "${todoSearchQuery}". Try clearing the search.`
      : filter === "completed"
        ? "No completed tasks yet. Mark tasks finished as you prepare for court hearings."
        : filter === "dueSoon"
          ? "🎉 No tasks due soon or overdue! All your deadlines are on track."
          : "No case preparation tasks found. Choose a case on the left to schedule your first appearance deadline.";
    container.innerHTML = `
      <div class="todo-empty-state">
        <div class="todo-empty-icon-wrap">
          <i class="fa-solid fa-clipboard-list"></i>
        </div>
        <h4 class="todo-empty-title">${filter === "completed" ? "No completed tasks" : filter === "dueSoon" ? "All clear!" : "No tasks yet"}</h4>
        <p>${msg}</p>
      </div>
    `;
    return;
  }

  filtered.sort((a, b) => {
    if (a.status !== b.status) return a.status === "completed" ? 1 : -1;
    const dateA = parseDateString(a.deadlineDate)?.getTime() || 0;
    const dateB = parseDateString(b.deadlineDate)?.getTime() || 0;
    return dateA - dateB;
  });

  container.innerHTML = filtered
    .map((t) => {
      const isDone = t.status === "completed";
      const d = parseDateString(t.deadlineDate);
      let deadlineBadgeHtml = "";

      if (isDone) {
        deadlineBadgeHtml = `<span class="todo-deadline-badge completed">✅ Completed</span>`;
      } else if (d) {
        d.setHours(0, 0, 0);
        const diffDays = Math.round((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays < 0) {
          deadlineBadgeHtml = `<span class="todo-deadline-badge overdue">🔴 Overdue (${Math.abs(diffDays)}d late)</span>`;
        } else if (diffDays === 0) {
          deadlineBadgeHtml = `<span class="todo-deadline-badge today">⚠️ Due Today</span>`;
        } else if (diffDays === 1) {
          deadlineBadgeHtml = `<span class="todo-deadline-badge soon">⏳ Due Tomorrow</span>`;
        } else if (diffDays <= 3) {
          deadlineBadgeHtml = `<span class="todo-deadline-badge soon">⏳ Due in ${diffDays} days</span>`;
        } else {
          deadlineBadgeHtml = `<span class="todo-deadline-badge normal">📅 ${formatDateDMY(t.deadlineDate)}</span>`;
        }
      }

      const priorityLabel =
        t.priority === "high" ? "🔴 High" : t.priority === "normal" ? "🔵 Normal" : "🟡 Medium";
      const priorityClass = t.priority || "medium";
      const isGeneralTask = !t.caseNo || t.caseNo === "GENERAL" || t.caseNo === "—";
      const caseMetaHtml = isGeneralTask
        ? `<span class="todo-general-tag"><i class="fa-solid fa-thumbtack"></i> General Task</span>`
        : `<span class="todo-case-link-wrap"><a href="javascript:void(0);" class="todo-case-link" onclick="event.stopPropagation(); showTab('search'); document.getElementById('globalSearch').value='${t.caseNo}'; filterCaseTables(false);" title="Search case">${t.caseNo}</a></span>`;

      let stepSummaryBadgeHtml = "";
      if (t.steps && Array.isArray(t.steps) && t.steps.length > 0) {
        const completedCount = t.steps.filter((s) => s.completed).length;
        const pct = Math.round((completedCount / t.steps.length) * 100);
        stepSummaryBadgeHtml = `
        <span class="todo-step-count-badge" onclick="event.stopPropagation(); openTaskDetailsModal('${t.id}')" title="Multi-Step Workflow (${completedCount}/${t.steps.length} completed)">
          <i class="fa-solid fa-list-check"></i> ${completedCount}/${t.steps.length} Steps (${pct}%)
        </span>
      `;
      }

      let reminderBadgeHtml = "";
      if (t.reminderDateTime && !isDone) {
        const remDate = new Date(t.reminderDateTime);
        if (!isNaN(remDate.getTime())) {
          const isPast = remDate.getTime() <= Date.now();
          const remFmt =
            remDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }) +
            " " +
            remDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
          reminderBadgeHtml = `<span class="todo-reminder-badge ${isPast ? "triggered" : "scheduled"}" onclick="event.stopPropagation(); openTaskReminderModal('${t.id}')" title="Reminder: ${remFmt}"><i class="fa-solid fa-bell"></i> ${remFmt}</span>`;
        }
      }

      return `
      <div class="todo-item priority-${priorityClass} ${isDone ? "status-completed" : ""}" id="${t.id}">
        <div class="todo-item-accent-bar"></div>
        <div class="todo-item-inner">
          <div class="todo-checkbox-wrapper">
            <input type="checkbox" class="todo-checkbox" ${isDone ? "checked" : ""} onchange="toggleTaskStatus('${t.id}')" title="Mark as ${isDone ? "Pending" : "Completed"}">
          </div>
          <div class="todo-item-content" onclick="openTaskDetailsModal('${t.id}')" style="cursor: pointer;" title="Click to view full details">
            <div class="todo-item-top">
              <span class="todo-item-title">${t.taskTitle}</span>
              <span class="todo-priority-pill ${priorityClass}">${priorityLabel}</span>
            </div>
            <div class="todo-compact-meta-row">
              ${caseMetaHtml}
              ${deadlineBadgeHtml}
              ${t.copyNumber ? `<span class="todo-copy-badge" onclick="event.stopPropagation(); editTaskCopyNumber('${t.id}')" title="Copy / App No."><i class="fa-solid fa-stamp"></i> No: <strong>${t.copyNumber}</strong></span>` : ""}
              ${stepSummaryBadgeHtml}
              ${reminderBadgeHtml}
            </div>
          </div>
          <div class="todo-item-actions">
            <button type="button" class="todo-detail-btn" onclick="openTaskDetailsModal('${t.id}')" title="Show Full Details & Actions">
              <i class="fa-solid fa-eye"></i> <span>Show Details</span>
            </button>
            <div class="todo-quick-btns">
              <button type="button" class="todo-reminder-btn ${t.reminderDateTime ? "has-reminder" : ""}" onclick="openTaskReminderModal('${t.id}')" title="${t.reminderDateTime ? "Edit Reminder" : "Set Reminder"}" aria-label="Set Reminder"><i class="fa-solid fa-bell"></i></button>
              <button type="button" class="todo-reschedule-btn" onclick="rescheduleCaseTask('${t.id}')" title="Reschedule Deadline"><i class="fa-solid fa-calendar-days"></i></button>
              <button type="button" class="todo-delete-btn" onclick="deleteCaseTask('${t.id}')" title="Delete Task"><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>
        </div>
      </div>
    `;
    })
    .join("");
}
if (typeof renderCaseTasks !== "undefined") window.renderCaseTasks = renderCaseTasks;
if (typeof populateTodoCaseDropdown !== "undefined")
  window.populateTodoCaseDropdown = populateTodoCaseDropdown;

// ==============================================================================
// Task Details & Management Dossier Modal View
// ==============================================================================

function openTaskDetailsModal(taskId) {
  const task = caseTasks.find((t) => t.id === taskId);
  if (!task) return;

  const modal = document.getElementById("taskDetailsModal");
  const content = document.getElementById("taskDetailsModalContent");
  const footer = document.getElementById("taskDetailsModalFooter");
  const taskIdInput = document.getElementById("taskDetailsModalTaskId");
  if (!modal || !content || !footer) return;

  if (taskIdInput) taskIdInput.value = taskId;

  const isDone = task.status === "completed";
  const isGeneralTask = !task.caseNo || task.caseNo === "GENERAL" || task.caseNo === "—";
  const hearingFormatted = isGeneralTask
    ? "—"
    : task.hearingDate && task.hearingDate !== "—"
      ? formatDateDMY(task.hearingDate)
      : "Undated";
  const priorityClass = task.priority || "medium";
  const priorityLabel =
    task.priority === "high"
      ? "🔴 High (Urgent)"
      : task.priority === "normal"
        ? "🔵 Normal"
        : "🟡 Medium";

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = parseDateString(task.deadlineDate);
  let deadlineBadgeHtml = "";
  let deadlineDiffText = "";

  if (isDone) {
    deadlineBadgeHtml = `<span class="todo-deadline-badge completed">✅ Completed</span>`;
    deadlineDiffText = "Task has been completed.";
  } else if (d) {
    d.setHours(0, 0, 0);
    const diffDays = Math.round((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) {
      deadlineBadgeHtml = `<span class="todo-deadline-badge overdue">🔴 Overdue (${Math.abs(diffDays)} days late)</span>`;
      deadlineDiffText = `⚠️ Overdue by ${Math.abs(diffDays)} day${Math.abs(diffDays) === 1 ? "" : "s"}!`;
    } else if (diffDays === 0) {
      deadlineBadgeHtml = `<span class="todo-deadline-badge today">⚠️ Due Today</span>`;
      deadlineDiffText = `⚡ Deadline is today!`;
    } else if (diffDays === 1) {
      deadlineBadgeHtml = `<span class="todo-deadline-badge soon">⏳ Due Tomorrow</span>`;
      deadlineDiffText = `⏳ 1 day remaining until deadline.`;
    } else {
      deadlineBadgeHtml = `<span class="todo-deadline-badge ${diffDays <= 3 ? "soon" : "normal"}">📅 Due in ${diffDays} days</span>`;
      deadlineDiffText = `📅 ${diffDays} days remaining.`;
    }
  }

  let reminderInfoHtml = "";
  if (task.reminderDateTime) {
    const remDate = new Date(task.reminderDateTime);
    if (!isNaN(remDate.getTime())) {
      const isPast = remDate.getTime() <= Date.now();
      const remFmt =
        remDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) +
        " at " +
        remDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      reminderInfoHtml = `
        <div class="task-modal-reminder-pill ${isPast ? "triggered" : "scheduled"}">
          <i class="fa-solid fa-bell"></i> <span><strong>Reminder:</strong> ${remFmt} ${isPast ? "(Triggered)" : "(Active)"}</span>
        </div>
      `;
    }
  }

  let timelineHtml = "";
  if (task.steps && Array.isArray(task.steps) && task.steps.length > 0) {
    const completedCount = task.steps.filter((s) => s.completed).length;
    const pct = Math.round((completedCount / task.steps.length) * 100);
    timelineHtml = `
      <div class="workflow-section">
        <div class="workflow-header">
          <h3>Multi-Step Workflow Progress</h3>
          <span class="progress-badge">${pct}% Completed (${completedCount}/${task.steps.length})</span>
        </div>
        
        <div class="timeline">
          ${task.steps
            .map((step) => {
              const isNextStep =
                !step.completed && !task.steps.some((s) => s.id < step.id && !s.completed);
              const itemClass = step.completed ? "completed" : (isNextStep ? "active" : "");
              return `
            <div class="timeline-item ${itemClass}"
                 onclick="toggleTaskSubStep('${task.id}', ${step.id})"
                 title="${step.completed ? 'Click to re-open: ' + step.name : (isNextStep ? 'Click to complete: ' + step.name : 'Complete previous steps first')}">
              <div class="timeline-icon">${step.completed ? '✓' : step.id}</div>
              <div class="timeline-content">
                <h4>${step.name}</h4>
                <p>${step.date ? 'Completed on: ' + formatDateDMY(step.date) : (isNextStep ? 'Current pending action' : 'Sub-step')}
                   ${!step.completed && !isNextStep ? ' <span class="step-locked-hint">🔒 locked</span>' : ''}
                </p>
              </div>
            </div>
          `;
            })
            .join("")}
        </div>
        <div class="timeline-tips-note">
          💡 Click any active or finished step to update progress
        </div>
      </div>
    `;
  }

  // Priority badge styling
  let priorityBadgeClass = "badge-warning";
  let priorityBadgeLabel = "MEDIUM";
  if (task.priority === "high") {
    priorityBadgeClass = "badge-danger";
    priorityBadgeLabel = "HIGH";
  } else if (task.priority === "normal") {
    priorityBadgeClass = "badge-primary";
    priorityBadgeLabel = "NORMAL";
  }

  // Case link rendering
  const caseNumberContent = isGeneralTask
    ? `<span class="detail-val-general">📌 General Task</span>`
    : `<a href="javascript:void(0);" class="todo-case-link" onclick="closeTaskDetailsModal(); showTab('search'); document.getElementById('globalSearch').value='${task.caseNo}'; filterCaseTables(false);" title="View Case Dossier">${task.caseNo} ↗</a>`;

  content.innerHTML = `
    <div class="task-modal-detail-wrapper">
      <!-- Section: Case Details Grid -->
      <div class="details-grid">
        <div class="detail-item detail-item-full">
          <label>Task Title</label>
          <span class="detail-title-val ${isDone ? 'is-strikethrough' : ''}">${task.taskTitle}</span>
        </div>

        <div class="detail-item">
          <label>Case Number</label>
          <span>${caseNumberContent}</span>
        </div>

        <div class="detail-item">
          <label>Priority</label>
          <div><span class="badge ${priorityBadgeClass}">${priorityBadgeLabel}</span></div>
        </div>

        <div class="detail-item">
          <label>Status</label>
          <div><span class="badge ${isDone ? 'badge-success' : 'badge-warning'}">${isDone ? 'Finished' : 'In Progress'}</span></div>
        </div>

        <div class="detail-item">
          <label>Target Deadline</label>
          <span class="detail-deadline-val">📅 ${formatDateDMY(task.deadlineDate)} <small class="detail-diff-text">(${deadlineDiffText})</small></span>
        </div>

        ${!isGeneralTask && (task.caseName || task.court) ? `
          <div class="detail-item detail-item-full">
            <label>Parties &amp; Court</label>
            <span class="detail-muted-info">${task.caseName || '—'}${task.court ? ' • 🏛️ ' + task.court : ''}</span>
          </div>
        ` : ''}

        ${task.copyNumber ? `
          <div class="detail-item detail-item-full">
            <label>Certified Copy / App No.</label>
            <span class="task-modal-copy-pill" onclick="editTaskCopyNumber('${task.id}')" title="Click to edit application number">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 4px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
              No: <strong>${task.copyNumber}</strong> <i class="fa-solid fa-pen" style="font-size: 9px; margin-left: 4px; opacity: 0.7;"></i>
            </span>
          </div>
        ` : ''}

        ${reminderInfoHtml ? `
          <div class="detail-item detail-item-full">
            <label>Reminder Alert</label>
            <div>${reminderInfoHtml}</div>
          </div>
        ` : ''}
      </div>

      <!-- Section: Workflow Timeline -->
      ${timelineHtml}
    </div>
  `;

  footer.innerHTML = `
    <button type="button" class="btn btn-primary ${isDone ? 'btn-mark-pending' : ''}" onclick="toggleTaskStatus('${task.id}');" title="${isDone ? 'Mark as Pending' : 'Mark as Completed'}">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        ${isDone ? '<polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>' : '<polyline points="20 6 9 17 4 12"></polyline>'}
      </svg>
      <span>${isDone ? 'Mark Task as Pending' : 'Mark Task as Completed'}</span>
    </button>
    
    <div class="action-grid">
      <button type="button" class="btn btn-outline" onclick="openTaskReminderModal('${task.id}')" title="${task.reminderDateTime ? 'Edit Reminder Alert' : 'Set Reminder Alert'}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
        <span>${task.reminderDateTime ? 'Edit Alert' : 'Alert'}</span>
      </button>
      <button type="button" class="btn btn-outline" onclick="rescheduleCaseTask('${task.id}');" title="Reschedule Target Deadline">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
        <span>Reschedule</span>
      </button>
      <button type="button" class="btn btn-danger" onclick="deleteCaseTask('${task.id}'); closeTaskDetailsModal();" title="Delete Task">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
        <span>Delete</span>
      </button>
    </div>
  `;

  modal.classList.remove("hidden");
}

function closeTaskDetailsModal() {
  const modal = document.getElementById("taskDetailsModal");
  if (modal) modal.classList.add("hidden");
}

if (typeof openTaskDetailsModal !== "undefined") window.openTaskDetailsModal = openTaskDetailsModal;
if (typeof closeTaskDetailsModal !== "undefined")
  window.closeTaskDetailsModal = closeTaskDetailsModal;

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
    osc1.type = "sine";
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
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(880, now + 0.16);
    gain2.gain.setValueAtTime(0, now + 0.16);
    gain2.gain.linearRampToValueAtTime(0.28, now + 0.2);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.16);
    osc2.stop(now + 0.65);
  } catch (e) {
    console.warn("Web Audio chime not allowed or supported:", e);
  }
}
if (typeof playReminderChime !== "undefined") window.playReminderChime = playReminderChime;

function initTodoNotificationBanner() {
  const banner = document.getElementById("todoNotificationBanner");
  if (!banner) return;
  if (!("Notification" in window)) {
    banner.style.display = "none";
    return;
  }
  const dismissed = safeStorage.get("cmDismissedNotifyBanner") === "true";
  if (Notification.permission === "default" && !dismissed) {
    banner.style.display = "flex";
  } else {
    banner.style.display = "none";
  }
}

async function requestTodoNotificationPermission() {
  if (!("Notification" in window)) {
    alert("Browser notifications are not supported in your current browser.");
    return;
  }
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      showToastNotification("🔔 Desktop alerts enabled successfully!");
      const banner = document.getElementById("todoNotificationBanner");
      if (banner) banner.style.display = "none";
      playReminderChime();
    } else {
      showToastNotification("Notification permission not granted.");
    }
  } catch (e) {
    console.warn("Notification permission error:", e);
  }
}
if (typeof requestTodoNotificationPermission !== "undefined")
  window.requestTodoNotificationPermission = requestTodoNotificationPermission;

function dismissTodoNotificationBanner() {
  const banner = document.getElementById("todoNotificationBanner");
  if (banner) banner.style.display = "none";
  safeStorage.set("cmDismissedNotifyBanner", "true", true);
}
if (typeof dismissTodoNotificationBanner !== "undefined")
  window.dismissTodoNotificationBanner = dismissTodoNotificationBanner;

function checkPendingTodoReminders() {
  if (!Array.isArray(caseTasks) || caseTasks.length === 0) return;
  const now = Date.now();

  caseTasks.forEach((task) => {
    if (task.status === "completed") return;
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
  if ("Notification" in window && Notification.permission === "granted") {
    try {
      const bodyText = `${task.caseNo && task.caseNo !== "GENERAL" ? `[${task.caseNo}] ` : ""}Due: ${formatDateDMY(task.deadlineDate)}`;
      const notif = new Notification(`⏰ Task Reminder: ${task.taskTitle}`, {
        body: bodyText,
        icon: "icons/icon-192.png",
        badge: "icons/icon-192.png",
        tag: task.id,
        requireInteraction: true,
      });
      notif.onclick = function () {
        window.focus();
        showTab("todo");
        this.close();
      };
    } catch (e) {
      console.warn("Native notification error:", e);
    }
  }

  // Display In-App Floating Alert Banner
  renderFloatingReminderAlert(task);
}

function renderFloatingReminderAlert(task) {
  const container = document.getElementById("todoFloatingAlertContainer");
  if (!container) return;

  const alertId = `floating_rem_${task.id}`;
  if (document.getElementById(alertId)) return;

  const card = document.createElement("div");
  card.id = alertId;
  card.className = "todo-floating-alert-card";

  const caseLabel =
    task.caseNo && task.caseNo !== "GENERAL"
      ? `<span class="floating-rem-case">${task.caseNo}</span>`
      : '<span class="floating-rem-case general">General</span>';

  card.innerHTML = `
    <div class="floating-rem-top">
      <div class="floating-rem-icon">⏰</div>
      <div class="floating-rem-info">
        <div class="floating-rem-badge-row">
          <span class="floating-rem-tag">REMINDER ALERT</span>
          ${caseLabel}
        </div>
        <div class="floating-rem-title">${task.taskTitle}</div>
        <div class="floating-rem-deadline">📅 Deadline: <strong>${formatDateDMY(task.deadlineDate)}</strong></div>
      </div>
      <button type="button" class="floating-rem-close-btn" onclick="dismissTaskReminder('${task.id}')" title="Dismiss">✕</button>
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
  const task = caseTasks.find((t) => t.id === taskId);
  if (!task) return;

  const snoozeDate = new Date(Date.now() + minutes * 60 * 1000);
  const yyyy = snoozeDate.getFullYear();
  const mm = String(snoozeDate.getMonth() + 1).padStart(2, "0");
  const dd = String(snoozeDate.getDate()).padStart(2, "0");
  const hh = String(snoozeDate.getHours()).padStart(2, "0");
  const min = String(snoozeDate.getMinutes()).padStart(2, "0");

  task.reminderDateTime = `${yyyy}-${mm}-${dd}T${hh}:${min}`;
  task.reminderNotified = false;
  task.reminderDismissed = false;

  saveCaseTasksLocally();
  renderCaseTasks(currentTodoFilter);

  const el = document.getElementById(`floating_rem_${taskId}`);
  if (el) el.remove();

  showToastNotification(
    `⏰ Snoozed for ${minutes >= 60 ? minutes / 60 + " hour(s)" : minutes + " minutes"}`,
  );
}
if (typeof snoozeTaskReminder !== "undefined") window.snoozeTaskReminder = snoozeTaskReminder;

function completeTaskFromReminder(taskId) {
  const el = document.getElementById(`floating_rem_${taskId}`);
  if (el) el.remove();
  toggleTaskStatus(taskId);
  showToastNotification("✅ Task completed!");
}
if (typeof completeTaskFromReminder !== "undefined")
  window.completeTaskFromReminder = completeTaskFromReminder;

function dismissTaskReminder(taskId) {
  const task = caseTasks.find((t) => t.id === taskId);
  if (task) {
    task.reminderDismissed = true;
    saveCaseTasksLocally();
  }
  const el = document.getElementById(`floating_rem_${taskId}`);
  if (el) el.remove();
}
if (typeof dismissTaskReminder !== "undefined") window.dismissTaskReminder = dismissTaskReminder;

function sendTaskWhatsAppReminder(taskId) {
  const task = caseTasks.find((t) => t.id === taskId);
  if (!task) return;

  const caseInfo =
    task.caseNo && task.caseNo !== "GENERAL"
      ? `\n⚖️ Case: ${task.caseNo} (${task.caseName || "—"})`
      : "";
  const text =
    `📌 *Case Task Reminder Alert*\n` +
    `-------------------------------\n` +
    `Task: *${task.taskTitle}*` +
    caseInfo +
    `\n` +
    `📅 Deadline: ${formatDateDMY(task.deadlineDate)}\n` +
    `Priority: ${task.priority ? task.priority.toUpperCase() : "MEDIUM"}\n\n` +
    `Sent via CaseBook Management System`;

  const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
}
if (typeof sendTaskWhatsAppReminder !== "undefined")
  window.sendTaskWhatsAppReminder = sendTaskWhatsAppReminder;

// Quick Modal Functions for Setting / Editing Reminders on Tasks
function openTaskReminderModal(taskId) {
  const task = caseTasks.find((t) => t.id === taskId);
  if (!task) return;

  const modal = document.getElementById("todoReminderModal");
  const idInput = document.getElementById("todoReminderModalTaskId");
  const dtInput = document.getElementById("todoReminderModalInput");
  const subtitle = document.getElementById("todoReminderModalTaskSubtitle");
  const statusInfo = document.getElementById("todoReminderCurrentStatusText");
  const removeBtn = document.getElementById("todoReminderRemoveBtn");

  if (!modal) return;

  idInput.value = taskId;
  if (subtitle) {
    subtitle.textContent = `${task.taskTitle} (Deadline: ${formatDateDMY(task.deadlineDate)})`;
  }

  if (task.reminderDateTime) {
    if (dtInput) dtInput.value = task.reminderDateTime;
    const remD = new Date(task.reminderDateTime);
    const remFmt = !isNaN(remD.getTime())
      ? remD.toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : task.reminderDateTime;
    if (statusInfo)
      statusInfo.innerHTML = `🟢 Current active reminder set for: <strong>${remFmt}</strong>`;
    if (removeBtn) removeBtn.style.display = "inline-flex";
  } else {
    // Default to deadline morning 9:00 AM or tomorrow morning
    if (dtInput) {
      const deadlineDate = parseDateString(task.deadlineDate);
      if (deadlineDate) {
        const y = deadlineDate.getFullYear();
        const m = String(deadlineDate.getMonth() + 1).padStart(2, "0");
        const d = String(deadlineDate.getDate()).padStart(2, "0");
        dtInput.value = `${y}-${m}-${d}T09:00`;
      } else {
        const tom = new Date();
        tom.setDate(tom.getDate() + 1);
        const y = tom.getFullYear();
        const m = String(tom.getMonth() + 1).padStart(2, "0");
        const d = String(tom.getDate()).padStart(2, "0");
        dtInput.value = `${y}-${m}-${d}T09:00`;
      }
    }
    if (statusInfo) statusInfo.innerHTML = "⚪ No active reminder currently set for this task.";
    if (removeBtn) removeBtn.style.display = "none";
  }

  modal.classList.remove("hidden");
  modal.style.display = "flex";
}
if (typeof openTaskReminderModal !== "undefined")
  window.openTaskReminderModal = openTaskReminderModal;

function closeTodoReminderModal() {
  const modal = document.getElementById("todoReminderModal");
  if (modal) {
    modal.classList.add("hidden");
    modal.style.display = "none";
  }
}
if (typeof closeTodoReminderModal !== "undefined")
  window.closeTodoReminderModal = closeTodoReminderModal;

function setModalReminderPreset(preset) {
  const dtInput = document.getElementById("todoReminderModalInput");
  const idInput = document.getElementById("todoReminderModalTaskId");
  if (!dtInput) return;

  const task = caseTasks.find((t) => t.id === idInput?.value);
  const now = new Date();
  let target = new Date(now.getTime());

  if (preset === "in1hour") {
    target = new Date(now.getTime() + 60 * 60 * 1000);
  } else if (preset === "today_evening") {
    target.setHours(18, 0, 0, 0);
    if (target.getTime() <= now.getTime()) {
      target.setDate(target.getDate() + 1);
    }
  } else if (preset === "tomorrow_9am") {
    target.setDate(target.getDate() + 1);
    target.setHours(9, 0, 0, 0);
  } else if (preset === "deadline_9am") {
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
  const mm = String(target.getMonth() + 1).padStart(2, "0");
  const dd = String(target.getDate()).padStart(2, "0");
  const hh = String(target.getHours()).padStart(2, "0");
  const min = String(target.getMinutes()).padStart(2, "0");

  dtInput.value = `${yyyy}-${mm}-${dd}T${hh}:${min}`;
}
if (typeof setModalReminderPreset !== "undefined")
  window.setModalReminderPreset = setModalReminderPreset;

function saveTaskReminderFromModal() {
  const idInput = document.getElementById("todoReminderModalTaskId");
  const dtInput = document.getElementById("todoReminderModalInput");
  if (!idInput || !idInput.value) return;

  const task = caseTasks.find((t) => t.id === idInput.value);
  if (!task) return;

  const val = dtInput ? dtInput.value : "";
  if (!val) {
    alert("Please choose a valid reminder date and time.");
    return;
  }

  task.reminderDateTime = val;
  task.reminderNotified = false;
  task.reminderDismissed = false;

  saveCaseTasksLocally();
  renderCaseTasks(currentTodoFilter);
  closeTodoReminderModal();

  const remD = new Date(val);
  const remFmt = !isNaN(remD.getTime())
    ? remD.toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      })
    : val;
  showToastNotification(`⏰ Reminder set for ${remFmt}!`);

  // Auto-request notification permission if not yet decided
  if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission();
  }
}
if (typeof saveTaskReminderFromModal !== "undefined")
  window.saveTaskReminderFromModal = saveTaskReminderFromModal;

function removeTaskReminderFromModal() {
  const idInput = document.getElementById("todoReminderModalTaskId");
  if (!idInput || !idInput.value) return;

  const task = caseTasks.find((t) => t.id === idInput.value);
  if (!task) return;

  task.reminderDateTime = null;
  task.reminderNotified = false;
  task.reminderDismissed = false;

  saveCaseTasksLocally();
  renderCaseTasks(currentTodoFilter);
  closeTodoReminderModal();
  showToastNotification("⏰ Reminder removed");
}
if (typeof removeTaskReminderFromModal !== "undefined")
  window.removeTaskReminderFromModal = removeTaskReminderFromModal;

// Start interval checker for pending reminders (every 30 seconds)
if (!window._todoReminderInterval) {
  window._todoReminderInterval = setInterval(checkPendingTodoReminders, 30000);
}
// Run an immediate check 3 seconds after boot
setTimeout(() => {
  initTodoNotificationBanner();
  checkPendingTodoReminders();
}, 3000);

// ============================================================================
// Link to Case — grouped searchable select used by the New Task modal.
// Kept at the end of this module so it also supersedes the legacy combobox
// helpers used by older cached tab markup.
// ============================================================================
(() => {
  const getCaseNumber = (record) => record?.caseNo || record?.criminalCaseNumber || "";
  const getCaseName = (record) => record?.caseName || (record?.plaintiff
    ? `${record.plaintiff} vs ${record.defendant || ""}`
    : record?.victimName
      ? `${record.victimName} vs ${record.accusedName || ""}`
      : "Untitled case");
  const getCaseType = (record) => (record?.caseType || "Other").toLowerCase();

  function todoEscape(value) {
    return String(value ?? "").replace(/[&<>'"]/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
    }[char]));
  }

  function updateTodoCaseTrigger() {
    const select = document.getElementById("todoCaseSelect");
    const label = document.getElementById("todoCaseSelectedLabel");
    const trigger = document.getElementById("todoCaseSelectTrigger");
    if (!select || !label) return;
    if (!select.value) {
      label.textContent = "Select a case or choose General Task";
      label.classList.add("placeholder");
    } else if (select.value === "__GENERAL__") {
      label.textContent = "📌 General Task (no case linked)";
      label.classList.remove("placeholder");
    } else {
      const found = (window.allCaseRecords || []).find((record) => getCaseNumber(record).toLowerCase() === select.value.toLowerCase());
      label.textContent = found ? `${getCaseNumber(found)} — ${getCaseName(found)}` : select.value;
      label.classList.remove("placeholder");
    }
    if (trigger) trigger.setAttribute("aria-label", label.textContent);
  }

  function renderGroupedTodoCases(records) {
    const list = document.getElementById("todoCaseOptionsList");
    const select = document.getElementById("todoCaseSelect");
    if (!list) return;
    const selected = select?.value || "";
    list.innerHTML = "";

    const general = document.createElement("li");
    general.className = `todo-case-option todo-general-option${selected === "__GENERAL__" ? " selected" : ""}`;
    general.setAttribute("role", "option");
    general.setAttribute("aria-selected", String(selected === "__GENERAL__"));
    general.dataset.value = "__GENERAL__";
    general.innerHTML = '<span><strong>📌 General Task</strong><small>Office / personal work, reminders, filings</small></span><span class="todo-case-option-check">✓</span>';
    general.addEventListener("click", () => selectTodoCase("__GENERAL__"));
    list.appendChild(general);

    const groups = new Map();
    (records || []).forEach((record) => {
      const number = getCaseNumber(record);
      if (!number) return;
      const type = getCaseType(record);
      const groupName = type === "civil" ? "Civil Cases" : type === "criminal" ? "Criminal Cases" : "Other Cases";
      if (!groups.has(groupName)) groups.set(groupName, []);
      groups.get(groupName).push(record);
    });

    if (!groups.size) {
      const empty = document.createElement("li");
      empty.className = "todo-combobox-empty";
      empty.textContent = "No matching cases found";
      list.appendChild(empty);
      return;
    }

    groups.forEach((groupRecords, groupName) => {
      const heading = document.createElement("li");
      heading.className = "todo-case-group-label";
      heading.textContent = groupName;
      list.appendChild(heading);
      groupRecords.forEach((record) => {
        const number = getCaseNumber(record);
        const isSelected = selected.toLowerCase() === number.toLowerCase();
        const option = document.createElement("li");
        option.className = `todo-case-option${isSelected ? " selected" : ""}`;
        option.setAttribute("role", "option");
        option.setAttribute("aria-selected", String(isSelected));
        option.dataset.value = number;
        const hearing = record.nextHearing && record.nextHearing !== "—" ? `Hearing: ${formatDateDMY(record.nextHearing)}` : "No hearing scheduled";
        option.innerHTML = `<span><strong>${todoEscape(number)}</strong><small>${todoEscape(getCaseName(record))}</small><em>${todoEscape(record.courtName || record.criminalCourtName || "District Court")} · ${todoEscape(hearing)}</em></span><span class="todo-case-option-check">✓</span>`;
        option.addEventListener("click", () => selectTodoCase(number));
        list.appendChild(option);
      });
    });
  }

  function openTodoCaseDropdown() {
    const dropdown = document.getElementById("todoCaseDropdownList");
    const trigger = document.getElementById("todoCaseSelectTrigger");
    const search = document.getElementById("todoCaseSearchInput");
    if (!dropdown) return;
    dropdown.classList.remove("hidden");
    trigger?.setAttribute("aria-expanded", "true");
    if (search) {
      search.value = "";
      renderGroupedTodoCases(window.allCaseRecords || []);
      requestAnimationFrame(() => search.focus());
    }
  }

  function closeTodoCaseDropdown() {
    document.getElementById("todoCaseDropdownList")?.classList.add("hidden");
    document.getElementById("todoCaseSelectTrigger")?.setAttribute("aria-expanded", "false");
  }

  function toggleTodoCaseDropdown() {
    const dropdown = document.getElementById("todoCaseDropdownList");
    if (dropdown?.classList.contains("hidden")) openTodoCaseDropdown();
    else closeTodoCaseDropdown();
  }

  function filterTodoCaseDropdown(query = "", keepClosed = false) {
    const dropdown = document.getElementById("todoCaseDropdownList");
    if (dropdown && !keepClosed) dropdown.classList.remove("hidden");
    const normalized = String(query).trim().toLowerCase();
    const filtered = (window.allCaseRecords || []).filter((record) => {
      const searchable = `${getCaseNumber(record)} ${getCaseName(record)} ${record.courtName || record.criminalCourtName || ""}`.toLowerCase();
      return !normalized || searchable.includes(normalized);
    }).sort((a, b) => getCaseNumber(a).localeCompare(getCaseNumber(b)));
    renderGroupedTodoCases(filtered);
  }

  function selectTodoCase(value) {
    const select = document.getElementById("todoCaseSelect");
    if (select) select.value = value;
    updateTodoCaseTrigger();
    closeTodoCaseDropdown();
    if (typeof onTodoCaseSelectChange === "function") onTodoCaseSelectChange();
  }

  function clearTodoCaseSelection() {
    const select = document.getElementById("todoCaseSelect");
    if (select) select.value = "";
    updateTodoCaseTrigger();
    if (typeof onTodoCaseSelectChange === "function") onTodoCaseSelectChange();
    openTodoCaseDropdown();
  }

  function populateTodoCaseDropdown(selectedCaseNo = "") {
    const select = document.getElementById("todoCaseSelect");
    if (!select) return;
    select.innerHTML = '<option value="">-- Choose Case to Link --</option><option value="__GENERAL__">📌 General Task (no case linked)</option>';
    const records = [...(window.allCaseRecords || [])].sort((a, b) => getCaseNumber(a).localeCompare(getCaseNumber(b)));
    records.forEach((record) => {
      const number = getCaseNumber(record);
      if (number) select.appendChild(new Option(`${number} — ${getCaseName(record)}`, number));
    });
    if (selectedCaseNo) select.value = selectedCaseNo;
    updateTodoCaseTrigger();
    filterTodoCaseDropdown("", true);
    if (typeof onTodoCaseSelectChange === "function") onTodoCaseSelectChange();
  }

  function handleTodoCaseDropdownKeydown(event) {
    if (event.key === "Escape") { closeTodoCaseDropdown(); document.getElementById("todoCaseSelectTrigger")?.focus(); }
    if (event.key === "Enter") {
      const first = document.querySelector("#todoCaseOptionsList .todo-case-option:not(.todo-case-group-label)");
      if (first) { event.preventDefault(); selectTodoCase(first.dataset.value); }
    }
  }

  window.openTodoCaseDropdown = openTodoCaseDropdown;
  window.closeTodoCaseDropdown = closeTodoCaseDropdown;
  window.toggleTodoCaseDropdown = toggleTodoCaseDropdown;
  window.filterTodoCaseDropdown = filterTodoCaseDropdown;
  window.selectTodoCase = selectTodoCase;
  window.clearTodoCaseSelection = clearTodoCaseSelection;
  window.populateTodoCaseDropdown = populateTodoCaseDropdown;
  window.handleTodoCaseDropdownKeydown = handleTodoCaseDropdownKeydown;

  document.addEventListener("click", (event) => {
    const wrapper = document.getElementById("todoComboboxWrapper");
    if (wrapper && !wrapper.contains(event.target)) closeTodoCaseDropdown();
  });
})();
