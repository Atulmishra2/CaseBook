import { describe, it, expect, beforeEach, vi } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Live CRUD Tab Module Tests', () => {
  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = `
      <div id="livecrudTabContainer"></div>
    `;

    // Reset window state
    window.allCaseRecords = [
      { id: 'c1', caseNo: 'OS/101/2026', caseName: 'Ramesh vs Suresh', court: 'Court 1' },
      { id: 'c2', caseNo: 'CR/202/2026', criminalCaseNumber: 'CR/202/2026', caseName: 'State vs Vikas', court: 'Court 2' }
    ];
    window.allCaseTransfers = [
      { id: 't1', case_number: 'OS/101/2026', from_court: 'Court 1', to_court: 'Court 2', transfer_date: '2026-10-10' }
    ];
    window.allPaisaTransactions = [
      { id: 'tx1', type: 'spent', amount: 500, client_payee: 'Stationery', category: 'Office', payment_mode: 'Cash', date: '2026-10-10' }
    ];
    window.allPersonalTransactions = [
      { id: 'ptx1', type: 'personal_spent', amount: 200, category: 'Food', note: 'Lunch', date: '2026-10-10' }
    ];
    window.supabaseClient = null;
    window.ensureSupabaseClient = () => false;
    window.performPostCrudRefresh = vi.fn();
    window.showToast = vi.fn();

    // Load and evaluate livecrud.js
    const livecrudCode = fs.readFileSync(path.resolve(__dirname, '../components/tabs/livecrud/tab-livecrud.js'), 'utf-8');
    eval(livecrudCode);

    // Inject template into DOM
    document.getElementById('livecrudTabContainer').innerHTML = window.__casebook_tabs['livecrud'];
  });

  it('1. should mount template with controls, view switcher, and table selectors', () => {
    expect(document.getElementById('liveCrudTableSelect')).not.toBeNull();
    expect(document.getElementById('liveCrudSearchInput')).not.toBeNull();
    expect(document.getElementById('liveCrudDynamicFiltersRow')).not.toBeNull();
    expect(document.getElementById('liveCrudCardsViewContainer')).not.toBeNull();
    expect(document.getElementById('liveCrudTableViewContainer')).not.toBeNull();
    expect(document.getElementById('liveCrudTableSelect').options.length).toBeGreaterThan(5);
  });

  it('2. should switch between Cards View and Table View seamlessly', () => {
    const cardToggle = document.getElementById('liveCrudToggleCards');
    const tableToggle = document.getElementById('liveCrudToggleTable');
    const cardsSection = document.getElementById('liveCrudCardsViewContainer');
    const tableSection = document.getElementById('liveCrudTableViewContainer');

    // Switch to table mode
    window.setLiveCrudViewMode('table');
    expect(tableToggle.classList.contains('active')).toBe(true);
    expect(cardToggle.classList.contains('active')).toBe(false);
    expect(tableSection.classList.contains('hidden')).toBe(false);
    expect(cardsSection.classList.contains('hidden')).toBe(true);

    // Switch back to cards mode
    window.setLiveCrudViewMode('cards');
    expect(cardToggle.classList.contains('active')).toBe(true);
    expect(tableToggle.classList.contains('active')).toBe(false);
    expect(cardsSection.classList.contains('hidden')).toBe(false);
    expect(tableSection.classList.contains('hidden')).toBe(true);
  });

  it('3. should generate dynamic contextual filter dropdowns based on schema and records', () => {
    window.setLiveCrudCurrentTable('civilcases');
    const sampleRows = [
      { id: '1', court_name: 'District Court', case_type: 'Original Suit', hearing_process: 'Arguments' },
      { id: '2', court_name: 'High Court', case_type: 'First Appeal', hearing_process: 'Evidence' },
      { id: '3', court_name: 'District Court', case_type: 'Original Suit', hearing_process: 'Arguments' }
    ];
    window.setLiveCrudRows(sampleRows);

    window.renderLiveCrudDynamicFilterBar();

    const courtFilter = document.getElementById('lcFilter_court_name');
    const typeFilter = document.getElementById('lcFilter_case_type');
    const stageFilter = document.getElementById('lcFilter_hearing_process');

    expect(courtFilter).not.toBeNull();
    expect(typeFilter).not.toBeNull();
    expect(stageFilter).not.toBeNull();

    // Distinct courts: District Court, High Court -> 2 options + 1 All option
    expect(courtFilter.options.length).toBe(3);
    expect(courtFilter.options[1].value).toBe('District Court');
    expect(courtFilter.options[2].value).toBe('High Court');
  });

  it('4. should filter records dynamically by search input and dropdown filters', () => {
    window.setLiveCrudCurrentTable('civilcases');
    const sampleRows = [
      { id: '1', case_number: 'CS/100', court_name: 'District Court', plaintiff: 'Alice', defendant: 'Bob' },
      { id: '2', case_number: 'CS/200', court_name: 'High Court', plaintiff: 'Charlie', defendant: 'David' },
      { id: '3', case_number: 'CS/300', court_name: 'District Court', plaintiff: 'Emma', defendant: 'Frank' }
    ];
    window.setLiveCrudRows(sampleRows);

    // Filter by court
    window.handleLiveCrudFilterChange('court_name', 'District Court');
    let filtered = window.getFilteredLiveCrudRows();
    expect(filtered.length).toBe(2);
    expect(filtered.map(r => r.case_number)).toEqual(['CS/100', 'CS/300']);

    // Add search query
    document.getElementById('liveCrudSearchInput').value = 'Emma';
    filtered = window.getFilteredLiveCrudRows();
    expect(filtered.length).toBe(1);
    expect(filtered[0].case_number).toBe('CS/300');

    // Reset filters
    window.resetLiveCrudFilters();
    filtered = window.getFilteredLiveCrudRows();
    expect(filtered.length).toBe(3);
    expect(document.getElementById('liveCrudSearchInput').value).toBe('');
  });

  it('5. should render table view with proper pagination and controls', () => {
    window.setLiveCrudCurrentTable('civilcases');
    window.setLiveCrudViewMode('table');

    const sampleRows = [];
    for (let i = 1; i <= 35; i++) {
      sampleRows.push({
        id: `row_${i}`,
        case_number: `CS/${i}/2026`,
        court_name: `Court ${i % 3}`,
        status: 'Active'
      });
    }
    window.setLiveCrudRows(sampleRows);

    // Page size 10
    window.handleLiveCrudPageSizeChange('10');
    window.renderLiveCrudData();

    const tbody = document.getElementById('liveCrudTableBody');
    expect(tbody.querySelectorAll('tr').length).toBe(10);

    const info = document.getElementById('liveCrudPaginationInfo');
    expect(info.textContent).toContain('Showing 1 to 10 of 35 entries');

    // Go to page 2
    window.setLiveCrudPage(2);
    expect(tbody.querySelectorAll('tr').length).toBe(10);
    expect(info.textContent).toContain('Showing 11 to 20 of 35 entries');

    // Go to page 4 (last page: 5 entries)
    window.setLiveCrudPage(4);
    expect(tbody.querySelectorAll('tr').length).toBe(5);
    expect(info.textContent).toContain('Showing 31 to 35 of 35 entries');
  });

  it('6. should open Live CRUD modal with dynamic columns and submit new record safely', async () => {
    window.setLiveCrudCurrentTable('transactions');
    const initialCount = window.allPaisaTransactions.length;

    // Open insert modal
    window.openLiveCrudModal('insert', null);
    const modal = document.getElementById('liveCrudFormModal');
    expect(modal.classList.contains('hidden')).toBe(false);

    const grid = document.getElementById('lcDynamicFieldsGrid');
    expect(grid.children.length).toBeGreaterThan(0);

    // Fill in values
    const amountInput = grid.querySelector('input[data-lc-column="amount"]');
    const payeeInput = grid.querySelector('input[data-lc-column="client_payee"]');
    if (amountInput) amountInput.value = '1500';
    if (payeeInput) payeeInput.value = 'Advocate Fee';

    // Submit form
    const mockEvent = { preventDefault: vi.fn() };
    await window.handleLiveCrudFormSubmit(mockEvent);

    expect(window.allPaisaTransactions.length).toBe(initialCount + 1);
    expect(window.allPaisaTransactions[0].amount).toBe(1500);
    expect(window.allPaisaTransactions[0].client_payee).toBe('Advocate Fee');
    expect(modal.classList.contains('hidden')).toBe(true);
  });

  it('7. should ensure Live CRUD table corners are not rounded and first column sticky style is removed', () => {
    const livecrudCss = fs.readFileSync(path.resolve(__dirname, '../components/tabs/livecrud/tab-livecrud.css'), 'utf-8');
    const tabAllCss = fs.readFileSync(path.resolve(__dirname, '../components/tabs/all/tab-all.css'), 'utf-8');

    // 1. Table header & footer corners in livecrud must be squared (border-radius: 0 !important)
    expect(livecrudCss).toMatch(/#livecrud[\s\S]*?table\.data-table[\s\S]*?border-radius:\s*0\s*!important/);

    // 2. First column sticky style in livecrud must be reset (left: auto, position: static for td, box-shadow: none)
    expect(livecrudCss).toMatch(/#livecrud[\s\S]*?thead th:first-child[\s\S]*?left:\s*auto\s*!important/);
    expect(livecrudCss).toMatch(/#livecrud[\s\S]*?tbody td:first-child[\s\S]*?position:\s*static\s*!important/);
    expect(livecrudCss).toMatch(/#livecrud[\s\S]*?tbody td:first-child[\s\S]*?box-shadow:\s*none\s*!important/);

    // 3. tab-all.css must not leak sticky first column to generic table-card data-tables
    expect(tabAllCss).not.toMatch(/^\s*\.table-card\s+table\.data-table\s+thead\s+th:first-child\s*\{/m);
    expect(tabAllCss).not.toMatch(/^\s*\.table-card\s+table\.data-table\s+tbody\s+td:first-child\s*\{/m);
  });

  it('8. should render modernized toolbar actions row with vector icons, nowrap buttons, and live pulse dot', () => {
    const livecrudCss = fs.readFileSync(path.resolve(__dirname, '../components/tabs/livecrud/tab-livecrud.css'), 'utf-8');

    // 1. Action buttons must have white-space: nowrap to prevent text wrapping
    expect(livecrudCss).toMatch(/#livecrud\s+\.db-action-btn\s*\{[^}]*?white-space:\s*nowrap\s*!important;/s);

    // 2. Pulse dot styling & keyframe animation must be present
    expect(livecrudCss).toMatch(/\.live-pulse-dot/);
    expect(livecrudCss).toMatch(/@keyframes\s+lcLivePulse/);

    // 3. Refresh spin animation on refresh action must be defined
    expect(livecrudCss).toMatch(/@keyframes\s+lcRotateSpin/);

    // 4. Badges and buttons in DOM have proper vector markup
    const refreshBtn = document.getElementById('liveCrudRefreshBtn');
    const insertBtn = document.getElementById('liveCrudInsertBtn');
    expect(refreshBtn).not.toBeNull();
    expect(insertBtn).not.toBeNull();
    expect(refreshBtn.querySelector('iconify-icon[icon="lucide:rotate-cw"]')).not.toBeNull();
    expect(insertBtn.querySelector('iconify-icon[icon="lucide:plus"]')).not.toBeNull();
    expect(document.querySelector('.live-pulse-dot')).not.toBeNull();
  });

  it('9. should toggle floating filter card via integrated filter menu button and handle active badges', () => {
    initLiveCrudTab();
    const filterBtn = document.getElementById('liveCrudFilterMenuBtn');
    const filterCard = document.getElementById('liveCrudFilterCard');
    const badge = document.getElementById('liveCrudFilterActiveBadge');

    expect(filterBtn).not.toBeNull();
    expect(filterCard).not.toBeNull();
    expect(badge).not.toBeNull();

    // Initially card is hidden
    expect(filterCard.classList.contains('hidden')).toBe(true);

    // Click filter menu button -> card opens
    toggleLiveCrudFilterCard();
    expect(filterCard.classList.contains('hidden')).toBe(false);
    expect(filterBtn.getAttribute('aria-expanded')).toBe('true');

    // Click again -> card closes
    toggleLiveCrudFilterCard();
    expect(filterCard.classList.contains('hidden')).toBe(true);
    expect(filterBtn.getAttribute('aria-expanded')).toBe('false');

    // Setting a filter updates active count badge
    handleLiveCrudFilterChange('court_name', 'High Court');
    expect(badge.textContent).toBe('1');
    expect(badge.classList.contains('hidden')).toBe(false);

    // Active tags strip appears
    const activeTagsRow = document.getElementById('liveCrudActiveTagsRow');
    expect(activeTagsRow).not.toBeNull();
    expect(activeTagsRow.classList.contains('hidden')).toBe(false);
    expect(activeTagsRow.textContent).toContain('High Court');

    // Resetting filters clears tags and badges
    resetLiveCrudFilters();
    expect(badge.classList.contains('hidden')).toBe(true);
    expect(activeTagsRow.classList.contains('hidden')).toBe(true);
  });

  it('10. should support custom popover dropdown (Option 2) for tables, filters, and page sizes', () => {
    initLiveCrudTab();

    // 1. Table custom dropdown
    const tableTrigger = document.getElementById('liveCrudTableDropdownTrigger');
    const tableMenu = document.getElementById('liveCrudTableDropdownMenu');
    const tableLabel = document.getElementById('liveCrudTableDropdownLabel');
    const tableSelect = document.getElementById('liveCrudTableSelect');

    expect(tableTrigger).not.toBeNull();
    expect(tableMenu).not.toBeNull();
    expect(tableLabel).not.toBeNull();
    expect(tableSelect).not.toBeNull();

    // Initially menu is hidden
    expect(tableMenu.classList.contains('hidden')).toBe(true);

    // Toggle open
    window.toggleLiveCrudTableDropdown();
    expect(tableMenu.classList.contains('hidden')).toBe(false);
    expect(tableTrigger.getAttribute('aria-expanded')).toBe('true');

    // Select statecases
    window.selectLiveCrudTable('statecases');
    expect(tableSelect.value).toBe('statecases');
    expect(tableLabel.textContent).toBe('State Cases');
    expect(tableMenu.classList.contains('hidden')).toBe(true);

    // 2. Filter field custom dropdown
    window.setLiveCrudCurrentTable('civilcases');
    window.setLiveCrudRows([
      { id: '1', court_name: 'District Court', case_type: 'Original Suit', hearing_process: 'Arguments' },
      { id: '2', court_name: 'High Court', case_type: 'First Appeal', hearing_process: 'Evidence' }
    ]);
    window.renderLiveCrudDynamicFilterBar();

    const courtTrigger = document.getElementById('lcFilterTrigger_court_name');
    const courtMenu = document.getElementById('lcFilterMenu_court_name');
    const courtHiddenSelect = document.getElementById('lcFilter_court_name');

    expect(courtTrigger).not.toBeNull();
    expect(courtMenu).not.toBeNull();
    expect(courtHiddenSelect).not.toBeNull();

    // Toggle filter menu
    window.toggleLiveCrudFilterFieldDropdown('court_name');
    expect(courtMenu.classList.contains('hidden')).toBe(false);

    // Select filter value
    window.selectLiveCrudFilterItem('court_name', 'High Court');
    expect(courtHiddenSelect.value).toBe('High Court');
    expect(courtMenu.classList.contains('hidden')).toBe(true);
    expect(document.getElementById('lcFilterTriggerLabel_court_name').textContent).toBe('High Court');

    // 3. Page size custom dropdown
    const sizeTrigger = document.getElementById('liveCrudPageSizeTrigger');
    const sizeMenu = document.getElementById('liveCrudPageSizeMenu');
    const sizeLabel = document.getElementById('liveCrudPageSizeLabel');
    const sizeSelect = document.getElementById('liveCrudPageSizeSelect');

    expect(sizeTrigger).not.toBeNull();
    expect(sizeMenu).not.toBeNull();
    expect(sizeLabel).not.toBeNull();

    window.toggleLiveCrudPageSizeDropdown();
    expect(sizeMenu.classList.contains('hidden')).toBe(false);

    window.selectLiveCrudPageSize('50');
    expect(sizeSelect.value).toBe('50');
    expect(sizeLabel.textContent).toBe('50');
    expect(sizeMenu.classList.contains('hidden')).toBe(true);

    // 4. closeAllLiveCrudCustomDropdowns helper
    window.toggleLiveCrudTableDropdown();
    expect(tableMenu.classList.contains('hidden')).toBe(false);
    window.closeAllLiveCrudCustomDropdowns();
    expect(tableMenu.classList.contains('hidden')).toBe(true);
  });

  it('11. should render redesigned form modal with Lucide icons, contextual field controls, search, and revert capabilities', async () => {
    initLiveCrudTab();
    window.setLiveCrudCurrentTable('transactions');
    window.setLiveCrudRows([
      { id: 'tx1', type: 'spent', amount: 500, client_payee: 'Stationery', category: 'Office', remarks: 'Stationery purchase for office', date: '2026-10-10' }
    ]);

    // 1. Open edit modal on first record
    window.openLiveCrudModal('edit', 'tx1');

    const modal = document.getElementById('liveCrudFormModal');
    expect(modal.classList.contains('hidden')).toBe(false);

    // 2. Header elements and Lucide vector icons
    const iconEl = document.getElementById('lcModalIcon');
    const actionBadge = document.getElementById('lcModalActionBadge');
    const tableBadge = document.getElementById('lcModalTableBadge');
    const closeBtn = document.getElementById('lcModalCloseBtn');
    const submitBtn = document.getElementById('lcModalSubmitBtn');
    const cancelBtn = document.getElementById('lcModalCancelBtn');

    expect(iconEl.querySelector('svg.lucide-file-edit')).not.toBeNull();
    expect(actionBadge.textContent).toBe('Edit Mode');
    expect(tableBadge.textContent).toBe('Virtual Account (Transactions)');
    expect(closeBtn.querySelector('svg.lucide-x')).not.toBeNull();
    expect(submitBtn.querySelector('svg.lucide-check')).not.toBeNull();
    expect(cancelBtn.querySelector('svg.lucide-x')).not.toBeNull();

    // 3. Dynamic fields have clean uppercase labels and Add-Case input styling
    const amountField = document.querySelector('.lc-form-group[data-field-col="amount"]');
    const payeeField = document.querySelector('.lc-form-group[data-field-col="client_payee"]');
    const remarksField = document.querySelector('.lc-form-group[data-field-col="remarks"]');
    const dateField = document.querySelector('.lc-form-group[data-field-col="date"]');
    const categoryField = document.querySelector('.lc-form-group[data-field-col="category"]');

    expect(amountField).not.toBeNull();
    expect(amountField.querySelector('label').textContent).toBe('Amount');
    expect(amountField.querySelector('input[data-lc-column="amount"]')).not.toBeNull();

    expect(payeeField).not.toBeNull();
    expect(payeeField.querySelector('label').textContent).toBe('Client Payee');

    expect(remarksField).not.toBeNull();
    expect(remarksField.classList.contains('lc-field-span-2')).toBe(true); // wide field span 2

    expect(categoryField).not.toBeNull();
    expect(categoryField.querySelector('label').textContent).toBe('Category');

    expect(dateField).not.toBeNull();
    expect(dateField.querySelector('label').textContent).toBe('Date');

    // 4. Quick field search inside modal
    window.filterLiveCrudModalFields('amount');
    expect(amountField.style.display).not.toBe('none');
    expect(payeeField.style.display).toBe('none');

    window.clearLiveCrudModalFieldSearch();
    expect(payeeField.style.display).not.toBe('none');

    // 5. Clear field & Revert
    const amountInput = document.getElementById('lcField_amount');
    expect(amountInput.value).toBe('500');

    window.clearLiveCrudField('amount');
    expect(amountInput.value).toBe('');

    window.resetLiveCrudModalFields();
    expect(amountInput.value).toBe('500'); // restored to initial

    // 6. Submitting empty form shows feedback banner without emojis
    window.clearLiveCrudModalFields();
    const mockEvent = { preventDefault: vi.fn() };
    const res = await window.handleLiveCrudFormSubmit(mockEvent);
    expect(res).toBe(false);

    const banner = document.getElementById('lcModalStatusBanner');
    const statusMsg = document.getElementById('lcModalStatusMsg');
    expect(banner.classList.contains('hidden')).toBe(false);
    expect(statusMsg.textContent).toContain('Please fill at least one field');
    expect(statusMsg.textContent).not.toContain('⚠️');

    // 7. Verify insert mode icon
    window.openLiveCrudModal('insert', null);
    expect(iconEl.querySelector('svg.lucide-plus-circle')).not.toBeNull();
    expect(actionBadge.textContent).toBe('New Row');
  });

  it('12. should render beautified delete confirmation modal with Lucide icons, danger badge, and table target', () => {
    const deleteModal = document.getElementById('liveCrudDeleteModal');
    expect(deleteModal).not.toBeNull();
    expect(deleteModal.classList.contains('hidden')).toBe(true);

    // Lucide trash icon inside modal header
    const trashIcon = deleteModal.querySelector('.lc-delete-icon-badge svg.lucide-trash-2');
    expect(trashIcon).not.toBeNull();

    // Trigger delete modal for a row
    window.setLiveCrudCurrentTable('civil_cases');
    window.openLiveCrudDeleteModal('test-uuid-123', 'CS/101/2024 - Sharma vs Verma');

    expect(deleteModal.classList.contains('hidden')).toBe(false);
    expect(document.getElementById('lcDeleteModalHeadline').textContent).toBe('CS/101/2024 - Sharma vs Verma');
    expect(document.getElementById('lcDeleteModalTable').textContent).toBe('Civil Cases');

    // Close dialog
    window.closeLiveCrudDeleteModal();
    expect(deleteModal.classList.contains('hidden')).toBe(true);
  });
});
