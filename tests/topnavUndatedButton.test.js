import { describe, it, expect, beforeEach, vi } from 'vitest';
import '../components/tabs/undated/tab-undated.js';
import '../admin.js';

describe('Topnav Undated Cases Action Button & Dedicated Tab', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = `
      <header class="app-header materialize-nav">
        <div class="nav-wrapper">
          <div class="header-right-section nav-right-actions">
            <!-- Topnav Undated Cases Action Button -->
            <button
              type="button"
              id="topnavUndatedBtn"
              class="topnav-undated-btn"
              onclick="showTab('undated', event)"
              title="Click to view and forward dates for undated cases"
              aria-label="Undated cases requiring next hearing date"
            >
              <svg class="lucide lucide-calendar-off undated-btn-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M4.18 4.18A2 2 0 0 0 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 1.82-1.18"></path>
                <path d="M21 15.5V6a2 2 0 0 0-2-2H9.5"></path>
                <path d="M16 2v4"></path>
                <path d="M3 10h7"></path>
                <path d="M21 10h-5.5"></path>
                <line x1="2" x2="22" y1="2" y2="22"></line>
              </svg>
              <span class="undated-btn-count" id="topnavUndatedCount">0</span>
              <span class="undated-btn-label">undated cases</span>
            </button>

            <!-- Search Container -->
            <div class="search-container topnav-search-container" id="searchContainer">
              <button type="button" class="search-trigger-btn" id="searchTriggerBtn">Search</button>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Tabs Container -->
      <nav class="sidebar">
        <a href="#" onclick="showTab('all', event)">Cases Register</a>
        <a href="#" onclick="showTab('undated', event)">Undated Cases <span id="undatedNavCount">0</span></a>
      </nav>
      <main class="content">
        <div id="home" class="tab active"></div>
        <div id="all" class="tab"></div>
        <div id="undated" class="tab" data-undated-scope data-tab-src="components/tabs/undated/tab-undated.html"></div>
      </main>
    `;

    // Initialize mock cases
    const pastDate = '2026-11-10'; // In past compared to today (2026-11-22)
    const futureDate = '2026-12-05';

    window.allCaseRecords = [
      {
        id: '1',
        caseNo: 'ST/31/2022',
        caseName: 'State of U.P. vs Rajesh',
        caseType: 'state',
        courtName: 'ACJM-Addl. Civil Judge',
        clientName: 'Rajesh Kumar',
        clientPhone: '9876543210',
        nextHearing: '', // Never scheduled / blank -> Truly Undated
        isDisposed: false
      },
      {
        id: '2',
        caseNo: 'CIV/104/2026',
        caseName: 'Ramesh vs Suresh',
        caseType: 'civil',
        courtName: 'Senior Civil Judge',
        clientName: 'Ramesh',
        nextHearing: '—', // Never scheduled -> Truly Undated
        isDisposed: false
      },
      {
        id: '3',
        caseNo: 'BAIL/505/2026',
        caseName: 'State vs Vikas',
        caseType: 'criminal',
        courtName: 'Sessions Judge',
        clientName: 'Vikas',
        nextHearing: futureDate, // Has valid future hearing date -> NOT undated
        isDisposed: false
      },
      {
        id: '4',
        caseNo: 'DISP/99/2020',
        caseName: 'Old vs Matter',
        caseType: 'civil',
        courtName: 'District Court',
        caseStatus: 'Disposed Off',
        nextHearing: '', // Disposed, should NEVER count as undated
        isDisposed: true
      },
      {
        id: '5',
        caseNo: 'OVERDUE/11/2024',
        caseName: 'Past vs Case',
        caseType: 'civil',
        courtName: 'Civil Court',
        nextHearing: pastDate, // Has past hearing date -> Forward Hearing, NOT undated
        isDisposed: false
      }
    ];
  });

  it('renders topnav undated button with Lucide icon and label structure', () => {
    const btn = document.getElementById('topnavUndatedBtn');
    expect(btn).not.toBeNull();

    const searchContainer = document.getElementById('searchContainer');
    expect(btn.nextElementSibling).toBe(searchContainer);

    const icon = btn.querySelector('.lucide-calendar-off');
    expect(icon).not.toBeNull();

    const count = btn.querySelector('#topnavUndatedCount');
    expect(count).not.toBeNull();

    const label = btn.querySelector('.undated-btn-label');
    expect(label).not.toBeNull();
    expect(label.textContent).toBe('undated cases');
  });

  it('calculates live undated cases count correctly (including unscheduled and overdue cases, excluding disposed and future dated cases)', () => {
    expect(window.updateTopnavUndatedCount).toBeDefined();
    const count = window.updateTopnavUndatedCount();

    // Out of 5 cases:
    // Case 1: Blank '' -> Undated (reason: never)
    // Case 2: '—' -> Undated (reason: never)
    // Case 3: Future date -> NOT undated
    // Case 4: Disposed -> NOT undated
    // Case 5: Past date without future date -> Undated (reason: overdue)
    // Total undated count must be 3
    expect(count).toBe(3);

    const countEl = document.getElementById('topnavUndatedCount');
    expect(countEl.textContent).toBe('3');

    const navBadge = document.getElementById('undatedNavCount');
    expect(navBadge.textContent).toBe('3');
  });

  it('renders undated cases tab when activated via showTab', async () => {
    const undatedTab = document.getElementById('undated');
    expect(undatedTab).not.toBeNull();

    // Trigger tab mount via casebook_tabs
    if (window.__casebook_tabs && window.__casebook_tabs['undated']) {
      undatedTab.innerHTML = window.__casebook_tabs['undated'];
    }

    expect(window.renderUndatedCasesTab).toBeDefined();
    window.renderUndatedCasesTab();

    const totalBadge = document.getElementById('undatedTotalBadge');
    expect(totalBadge.textContent).toContain('3 Cases');

    const tableBody = document.getElementById('undatedTableBody');
    expect(tableBody).not.toBeNull();
    expect(tableBody.innerHTML).toContain('ST/31/2022');
    expect(tableBody.innerHTML).toContain('CIV/104/2026');
    expect(tableBody.innerHTML).toContain('OVERDUE/11/2024');
    expect(tableBody.innerHTML).not.toContain('BAIL/505/2026');
    expect(tableBody.innerHTML).not.toContain('DISP/99/2020');

    // Check status badges
    expect(tableBody.innerHTML).toContain('Date Not Assigned');
    expect(tableBody.innerHTML).toContain('Overdue');

    // Check Multi-Tab Parity: Action buttons
    const actPrimary = tableBody.querySelector('.act.primary');
    expect(actPrimary).not.toBeNull();
    expect(actPrimary.textContent).toContain('Assign Date');
  });

  it('provides visible back button and breadcrumb in header to return to Cases Register', () => {
    const undatedTab = document.getElementById('undated');
    undatedTab.innerHTML = window.__casebook_tabs['undated'];

    const backBtn = document.getElementById('undatedBackToAllBtn');
    expect(backBtn).not.toBeNull();
    expect(backBtn.getAttribute('onclick')).toContain("showTab('all'");
    expect(backBtn.textContent).toContain('Cases Register');

    const crumbLink = undatedTab.querySelector('.undated-crumb-link');
    expect(crumbLink).not.toBeNull();
    expect(crumbLink.getAttribute('onclick')).toContain("showTab('all'");
    expect(crumbLink.textContent).toContain('Cases Register');
  });

  it('filters undated cases by search query across case number, parties, and court', () => {
    const undatedTab = document.getElementById('undated');
    undatedTab.innerHTML = window.__casebook_tabs['undated'];
    window.renderUndatedCasesTab();

    // Search for "Rajesh"
    window.handleUndatedSearchInput('Rajesh');

    const tableBody = document.getElementById('undatedTableBody');
    expect(tableBody.innerHTML).toContain('ST/31/2022');
    expect(tableBody.innerHTML).not.toContain('CIV/104/2026');

    // Clear search
    window.clearUndatedSearch();
    expect(tableBody.innerHTML).toContain('ST/31/2022');
    expect(tableBody.innerHTML).toContain('CIV/104/2026');
  });

  it('filters undated cases by category (civil vs state)', () => {
    const undatedTab = document.getElementById('undated');
    undatedTab.innerHTML = window.__casebook_tabs['undated'];
    window.renderUndatedCasesTab();

    // Filter by state only
    window.setUndatedCategoryFilter('state');
    let tableBody = document.getElementById('undatedTableBody');
    expect(tableBody.innerHTML).toContain('ST/31/2022');
    expect(tableBody.innerHTML).not.toContain('CIV/104/2026');

    // Filter by civil only
    window.setUndatedCategoryFilter('civil');
    tableBody = document.getElementById('undatedTableBody');
    expect(tableBody.innerHTML).toContain('CIV/104/2026');
    expect(tableBody.innerHTML).not.toContain('ST/31/2022');

    // Reset filter
    window.setUndatedCategoryFilter('');
    tableBody = document.getElementById('undatedTableBody');
    expect(tableBody.innerHTML).toContain('ST/31/2022');
    expect(tableBody.innerHTML).toContain('CIV/104/2026');
  });

  it('switches between Docket Table and Cards view mode smoothly', () => {
    const undatedTab = document.getElementById('undated');
    undatedTab.innerHTML = window.__casebook_tabs['undated'];
    window.renderUndatedCasesTab();

    const tblContainer = document.getElementById('undatedTableViewContainer');
    const crdContainer = document.getElementById('undatedCardsViewContainer');

    window.setUndatedViewMode('cards');
    expect(tblContainer.classList.contains('hidden')).toBe(true);
    expect(crdContainer.classList.contains('hidden')).toBe(false);

    // Verify Mobile Card structure
    const firstCard = crdContainer.querySelector('.undated-card-item');
    expect(firstCard).not.toBeNull();
    expect(firstCard.querySelector('.case-num-pill')).not.toBeNull();
    expect(firstCard.querySelector('.cat-badge')).not.toBeNull();
    expect(firstCard.querySelector('.lucide-landmark')).not.toBeNull();
    expect(firstCard.querySelector('.stage-badge-pill')).not.toBeNull();
    expect(firstCard.querySelector('.lucide-layers')).not.toBeNull();

    // Verify Full-width Assign Date button
    const cardAssignBtn = firstCard.querySelector('.undated-card-assign-btn');
    expect(cardAssignBtn).not.toBeNull();
    expect(cardAssignBtn.textContent).toContain('Assign Next Hearing Date');

    window.setUndatedViewMode('table');
    expect(tblContainer.classList.contains('hidden')).toBe(false);
    expect(crdContainer.classList.contains('hidden')).toBe(true);
  });

  it('handles Forward Date action click by delegating to openForwardDateModal or openUpdateHearingForCase', () => {
    window.openForwardDateModal = vi.fn();

    window.handleForwardDateFromUndated('ST/31/2022');
    expect(window.openForwardDateModal).toHaveBeenCalledWith('ST/31/2022');
  });

  it('opens dossier when docket row is clicked', () => {
    window.openCaseDetailsFullModal = vi.fn();
    const undatedTab = document.getElementById('undated');
    undatedTab.innerHTML = window.__casebook_tabs['undated'];
    window.renderUndatedCasesTab();

    const row = document.querySelector('.undated-docket-row');
    expect(row).not.toBeNull();
    row.click();

    expect(window.openCaseDetailsFullModal).toHaveBeenCalled();
  });

  it('renders Sync Supabase button and handles refreshUndatedFromSupabase', async () => {
    const undatedTab = document.getElementById('undated');
    undatedTab.innerHTML = window.__casebook_tabs['undated'];
    window.renderUndatedCasesTab();

    const syncBtn = document.getElementById('undatedRefreshBtn');
    expect(syncBtn).not.toBeNull();
    expect(syncBtn.textContent).toContain('Sync Supabase');

    window.fetchAllDataFromSupabase = vi.fn().mockResolvedValue(true);
    await window.refreshUndatedFromSupabase();
    expect(window.fetchAllDataFromSupabase).toHaveBeenCalled();
  });

  it('automatically refreshes undated cases when casebook:data-synced is dispatched', () => {
    const undatedTab = document.getElementById('undated');
    undatedTab.innerHTML = window.__casebook_tabs['undated'];
    window.renderUndatedCasesTab();

    // Add a new undated case to memory
    window.allCaseRecords.push({
      id: '99',
      caseNo: 'UNDATED/777/2026',
      caseName: 'New Matter vs Opposite',
      caseType: 'civil',
      courtName: 'Civil Court',
      nextHearing: '',
      isDisposed: false
    });

    window.dispatchEvent(new CustomEvent('casebook:data-synced'));

    const tableBody = document.getElementById('undatedTableBody');
    expect(tableBody.innerHTML).toContain('UNDATED/777/2026');

    const totalBadge = document.getElementById('undatedTotalBadge');
    expect(totalBadge.textContent).toContain('4 Cases');
  });

  it('refreshAllCaseTables re-renders undated cases register', () => {
    const undatedTab = document.getElementById('undated');
    undatedTab.innerHTML = window.__casebook_tabs['undated'];

    window.allCaseRecords = [
      {
        id: '101',
        caseNo: 'LIVE/999/2026',
        caseName: 'Live vs Record',
        caseType: 'state',
        courtName: 'ACJM',
        nextHearing: '—',
        isDisposed: false
      }
    ];

    window.refreshAllCaseTables();

    const tableBody = document.getElementById('undatedTableBody');
    expect(tableBody.innerHTML).toContain('LIVE/999/2026');

    const topCount = document.getElementById('topnavUndatedCount');
    expect(topCount.textContent).toBe('1');
  });
});
