import { describe, it, expect, beforeEach } from 'vitest';
import '../admin.js';

describe('Topnav Search Bar UI/UX Enhancements', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = `
      <div class="search-container topnav-search-container" id="searchContainer">
        <button type="button" class="search-trigger-btn" id="searchTriggerBtn">
          <span class="search-trigger-text">Search...</span>
          <kbd class="search-trigger-kbd">Ctrl K</kbd>
        </button>
        <div class="search-wrapper" id="searchWrapper">
          <input type="text" class="search-input" id="searchInput" placeholder="Search cases, clients, courts... (Ctrl+K)" />
          <button type="button" class="clear-btn" id="clearBtn">X</button>
          <button type="button" class="close-search-btn" id="closeSearchBtn">Close</button>
        </div>
        <div class="results-dropdown" id="resultsDropdown"></div>
      </div>
    `;

    window.allCaseRecords = [
      {
        id: '1',
        caseNo: 'OS 101/2026',
        caseName: 'Ramesh vs Suresh',
        courtName: 'Principal Senior Civil Judge',
        clientName: 'Ramesh Kumar',
        isDisposed: false,
        isUndated: false
      },
      {
        id: '2',
        caseNo: 'CC 202/2026',
        caseName: 'State vs Mahesh',
        criminalCourtName: 'Additional Chief Judicial Magistrate',
        criminalClientName: 'Mahesh Sharma',
        isDisposed: true,
        isUndated: false
      }
    ];
  });

  it('renders Zero-Query Quick Navigation and Recents when query is empty', () => {
    expect(window.renderTopnavZeroQueryState).toBeDefined();
    window.renderTopnavZeroQueryState();

    const dropdown = document.getElementById('resultsDropdown');
    expect(dropdown.classList.contains('open')).toBe(true);

    const categories = dropdown.querySelectorAll('.results-category');
    expect(categories.length).toBeGreaterThan(0);
    expect(dropdown.textContent).toContain('Quick Navigation');
    expect(dropdown.textContent).toContain("Today's Cause List");
    expect(dropdown.textContent).toContain('Upcoming 7-Day Hearings');

    // Footer with keyboard hints
    const footer = dropdown.querySelector('.results-footer');
    expect(footer).not.toBeNull();
    expect(footer.textContent).toContain('Navigate');
    expect(footer.textContent).toContain('Esc');
  });

  it('renders categorized results with Lucide icons and matches query', () => {
    window.performTopnavDatabaseSearch('Ramesh');

    const dropdown = document.getElementById('resultsDropdown');
    expect(dropdown.classList.contains('open')).toBe(true);
    expect(dropdown.textContent).toContain('OS 101/2026');
    expect(dropdown.textContent).toContain('Ramesh Kumar');

    // Verify Lucide icons are used
    const icons = dropdown.querySelectorAll('.lucide');
    expect(icons.length).toBeGreaterThan(0);

    // Verify footer is rendered
    const footer = dropdown.querySelector('.results-footer');
    expect(footer).not.toBeNull();
  });

  it('saves selected case to recent searches in localStorage', () => {
    window.performTopnavDatabaseSearch('Ramesh');
    window.selectTopnavResult(0);

    const stored = localStorage.getItem('casebook_recent_searches');
    expect(stored).not.toBeNull();
    const parsed = JSON.parse(stored);
    expect(parsed.length).toBe(1);
    expect(parsed[0].title).toBe('OS 101/2026');
  });

  it('toggles expanded state cleanly for overlay and collapses on escape', () => {
    const container = document.getElementById('searchContainer');
    const dropdown = document.getElementById('resultsDropdown');

    window.toggleTopnavSearch(true);
    expect(container.classList.contains('expanded')).toBe(true);

    window.toggleTopnavSearch(false);
    expect(container.classList.contains('expanded')).toBe(false);
    expect(dropdown.classList.contains('open')).toBe(false);
  });
});
