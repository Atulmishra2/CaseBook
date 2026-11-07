import { describe, it, expect, beforeEach } from 'vitest';
import '../utils/dateUtils.js';
import '../admin.js';
import '../components/tabs/upcoming/tab-upcoming.js';
import '../components/tabs/home/tab-home.js';

describe('components/tabs/upcoming/tab-upcoming.js & home.js - renderUpcomingWeekHearings', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="upcomingTab">
        ${window.__casebook_tabs['upcoming']}
      </div>
      <span id="upcomingNavCount">0</span>
    `;

    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`;

    const in3Days = new Date();
    in3Days.setDate(in3Days.getDate() + 3);
    const in3DaysStr = `${in3Days.getFullYear()}-${String(in3Days.getMonth() + 1).padStart(2, '0')}-${String(in3Days.getDate()).padStart(2, '0')}`;

    const in20Days = new Date();
    in20Days.setDate(in20Days.getDate() + 20);
    const in20DaysStr = `${in20Days.getFullYear()}-${String(in20Days.getMonth() + 1).padStart(2, '0')}-${String(in20Days.getDate()).padStart(2, '0')}`;

    window.allCaseRecords = [
      {
        caseNo: 'CS/01/2026',
        plaintiff: 'A',
        defendant: 'B',
        courtName: 'Civil Court',
        nextHearing: todayStr,
        hearingProcess: 'Urgent Hearing',
        caseType: 'civil',
        clientNumber: '9876543210'
      },
      {
        criminalCaseNumber: 'CR/02/2026',
        victimName: 'State',
        accusedName: 'Accused X',
        courtName: 'Sessions Court',
        nextHearing: tomorrowStr,
        hearingProcess: 'Bail Arguments',
        caseType: 'criminal',
        criminalClientNumber: '9123456789'
      },
      {
        caseNo: 'REV/03/2026',
        caseName: 'Revenue Matter',
        courtName: 'SDM Court',
        nextHearing: in3DaysStr,
        hearingProcess: 'Evidence',
        caseType: 'revenue'
      },
      {
        caseNo: 'CS/99/2026',
        caseName: 'Far Future Case',
        nextHearing: in20DaysStr,
        caseType: 'civil'
      },
      {
        caseNo: 'DISP/00/2026',
        caseName: 'Disposed Case',
        nextHearing: todayStr,
        caseStatus: 'Disposed'
      }
    ];
  });

  it('filters hearings scheduled within 7 days excluding disposed and future cases', () => {
    expect(window.renderUpcomingWeekHearings).toBeDefined();
    window.renderUpcomingWeekHearings();

    const container = document.getElementById('upcomingWeekContainer');
    expect(container).not.toBeNull();

    // CS/01 (today), CR/02 (tomorrow), REV/03 (3 days) match = 3
    // CS/99 (20 days) is beyond 7 days; DISP/00 is disposed
    const cards = container.querySelectorAll('.legal-hearing-card');
    expect(cards.length).toBe(3);
  });

  it('populates table rows and replaces loading spinner with case docket entries', () => {
    window.renderUpcomingWeekHearings();

    const tableBody = document.getElementById('upcomingTableBody');
    expect(tableBody).not.toBeNull();

    const rows = tableBody.querySelectorAll('tr.upcoming-row');
    expect(rows.length).toBe(3);
    expect(tableBody.innerHTML).not.toContain('Loading upcoming court hearings docket...');
  });

  it('handles client contact numbers cleanly with formattedPhone without runtime errors', () => {
    expect(() => window.renderUpcomingWeekHearings()).not.toThrow();

    const container = document.getElementById('upcomingWeekContainer');
    expect(container.innerHTML).toContain('98765 43210');
  });

  it('enforces view isolation: Table is visible and Cards hidden by default, and toggling works', () => {
    window.renderUpcomingWeekHearings();

    const tblContainer = document.getElementById('upcomingTableViewContainer');
    const crdContainer = document.getElementById('upcomingWeekContainer');

    // Default mode is table
    expect(tblContainer.classList.contains('hidden')).toBe(false);
    expect(crdContainer.classList.contains('hidden')).toBe(true);

    // Switch to cards
    window.setUpcomingViewMode('cards');
    expect(tblContainer.classList.contains('hidden')).toBe(true);
    expect(crdContainer.classList.contains('hidden')).toBe(false);

    // Switch back to table
    window.setUpcomingViewMode('table');
    expect(tblContainer.classList.contains('hidden')).toBe(false);
    expect(crdContainer.classList.contains('hidden')).toBe(true);
  });

  it('uses Lucide iconography across upcoming tab components', () => {
    window.renderUpcomingWeekHearings();

    const htmlContent = document.getElementById('upcomingTab').innerHTML;
    expect(htmlContent).toContain('lucide lucide-gavel');
    expect(htmlContent).toContain('lucide lucide-table-2');
    expect(htmlContent).toContain('lucide lucide-layout-grid');
    expect(htmlContent).toContain('lucide lucide-hash');
    expect(htmlContent).toContain('lucide lucide-flame');
  });

  it('updates all count badges including chip badge, total badge, and nav count', () => {
    window.renderUpcomingWeekHearings();

    const navBadge = document.getElementById('upcomingNavCount');
    const totalBadge = document.getElementById('upcomingTotalBadge');
    const chipBadge = document.getElementById('upcomingListedCountChip');
    const weekCount = document.getElementById('upcomingWeekCount');

    expect(navBadge.textContent).toBe('3');
    expect(totalBadge.textContent).toBe('3 Hearings Listed');
    expect(chipBadge.textContent).toContain('3 Hearings Listed');
    expect(weekCount.textContent).toBe('3');
  });

  it('labels today hearing as "Today in Court" with urgent styling', () => {
    window.renderUpcomingWeekHearings();

    const container = document.getElementById('upcomingWeekContainer');
    expect(container.innerHTML).toContain('Today in Court');
    expect(container.innerHTML).toContain('urgent-today');
    expect(container.innerHTML).toContain('Tomorrow');
    expect(container.innerHTML).toContain('In 3 Days');
  });

  it('shows clean empty state card when no hearings are in next 7 days', () => {
    window.allCaseRecords = [];
    window.renderUpcomingWeekHearings();

    const container = document.getElementById('upcomingWeekContainer');
    expect(container.innerHTML).toContain('hearing-empty-state-card');
    expect(container.innerHTML).toContain('No Upcoming Hearings');

    const totalBadge = document.getElementById('upcomingTotalBadge');
    expect(totalBadge.textContent).toBe('0 Hearings Listed');
  });

  it('initUpcomingTab runs renderUpcomingWeekHearings successfully', () => {
    expect(window.initUpcomingTab).toBeDefined();
    window.initUpcomingTab();

    const totalBadge = document.getElementById('upcomingTotalBadge');
    expect(totalBadge.textContent).toBe('3 Hearings Listed');
  });
});
