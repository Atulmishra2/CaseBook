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
    const livecrudCode = fs.readFileSync(path.resolve(__dirname, '../components/tabs/livecrud/livecrud.js'), 'utf-8');
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
});
