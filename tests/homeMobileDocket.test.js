import { describe, it, expect, beforeEach, vi } from 'vitest';
import fs from 'fs';
import path from 'path';

describe("Today's Court Appearance Docket - Mobile Layout & Daily Cause List Modal", () => {
  let tabHomeHtml;
  let tabHomeJs;

  beforeEach(() => {
    // Read fresh file contents
    tabHomeHtml = fs.readFileSync(path.resolve(__dirname, '../components/tabs/home/tab-home.html'), 'utf8');
    tabHomeJs = fs.readFileSync(path.resolve(__dirname, '../components/tabs/home/tab-home.js'), 'utf8');

    // Reset DOM environment
    document.body.innerHTML = `
      <div id="home" class="tab active" data-home-scope>
        ${tabHomeHtml}
      </div>
    `;

    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    // Setup mock global case records
    window.allCaseRecords = [
      {
        caseNo: 'FC-23-2024',
        caseName: 'Komal Singh vs Vimal Singh',
        plaintiff: 'Komal Singh',
        defendant: 'Vimal Singh',
        caseType: 'family',
        courtName: 'AFC-list / 1st Add. Family Court',
        nextHearing: todayStr, // Today
        hearingProcess: 'Cross Examination',
        caseStatus: 'Pending',
        clientName: 'Komal Singh',
        clientNumber: '73790 85030',
        hearingTime: '10:30 AM',
      },
      {
        caseNo: 'CR-11-2023',
        caseName: 'State vs Rahul Sharma',
        plaintiff: 'State',
        defendant: 'Rahul Sharma',
        caseType: 'criminal',
        courtName: 'Court Room 3',
        nextHearing: todayStr, // Today
        hearingProcess: 'Final Arguments',
        caseStatus: 'Pending',
        clientName: 'Rahul Sharma',
        clientNumber: '98765 43210',
        hearingTime: '11:15 AM',
      },
    ];

    window.caseTasks = [];
    window.escapeHtml = (str) => String(str || '').replace(/[&<>'"]/g, (tag) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
    window.formatDateDMY = (d) => d || '—';
    window.toISODate = (d) => d;
    window.parseDateString = (d) => (d ? new Date(d) : null);
    window.openUpdateHearingForCase = vi.fn();
    window.openCaseDetailsFullModal = vi.fn();
    window.openCaseHistoryModalByNo = vi.fn();
    window.sendWhatsAppHearingNotice = vi.fn();

    globalThis.openUpdateHearingForCase = window.openUpdateHearingForCase;
    globalThis.openCaseDetailsFullModal = window.openCaseDetailsFullModal;
    globalThis.openCaseHistoryModalByNo = window.openCaseHistoryModalByNo;
    globalThis.sendWhatsAppHearingNotice = window.sendWhatsAppHearingNotice;

    if (document.defaultView) {
      document.defaultView.openUpdateHearingForCase = window.openUpdateHearingForCase;
      document.defaultView.openCaseDetailsFullModal = window.openCaseDetailsFullModal;
      document.defaultView.openCaseHistoryModalByNo = window.openCaseHistoryModalByNo;
      document.defaultView.sendWhatsAppHearingNotice = window.sendWhatsAppHearingNotice;
    }

    // Execute tab-home.js in context
    const runScript = new Function(tabHomeJs);
    runScript();

    globalThis.openTodayListModal = window.openTodayListModal;
    globalThis.closeTodayListModal = window.closeTodayListModal;
    globalThis.toggleDocketCardMenu = window.toggleDocketCardMenu;

    if (document.defaultView) {
      document.defaultView.openTodayListModal = window.openTodayListModal;
      document.defaultView.closeTodayListModal = window.closeTodayListModal;
      document.defaultView.toggleDocketCardMenu = window.toggleDocketCardMenu;
    }
  });

  it('1. HTML and in-memory JS template must have exact parity for the docket panel & modal', () => {
    expect(tabHomeHtml).toContain('id="openListBtn"');
    expect(tabHomeHtml).toContain('Today\'s Court Appearance');
    expect(tabHomeHtml).toContain('id="homeTodayListModal"');
    expect(tabHomeHtml).toContain('id="homeTodayModalListItems"');

    expect(tabHomeJs).toContain('id="openListBtn"');
    expect(tabHomeJs).toContain('Today\'s Court Appearance');
    expect(tabHomeJs).toContain('id="homeTodayListModal"');
    expect(tabHomeJs).toContain('id="homeTodayModalListItems"');
  });

  it('2. Exclusively uses Lucide icons with zero FontAwesome or non-Lucide icons', () => {
    // Check tab-home.html
    expect(tabHomeHtml).not.toContain('fa-solid');
    expect(tabHomeHtml).not.toContain('fa-');
    expect(tabHomeHtml).toContain('lucide:scale');
    expect(tabHomeHtml).toContain('lucide:list-checks');
    expect(tabHomeHtml).toContain('lucide:x');

    // Check tab-home.js
    expect(tabHomeJs).not.toContain('fa-solid');
    expect(tabHomeJs).toContain('lucide:more-vertical');
    expect(tabHomeJs).toContain('lucide:user');
    expect(tabHomeJs).toContain('lucide:landmark');
  });

  it('3. Renders mobile card structure matching the uploaded blueprint for listed cases', () => {
    window.renderHomeDashboard();

    const todayCards = document.querySelectorAll('.home-today-card');
    expect(todayCards.length).toBe(2);

    const firstCard = todayCards[0];

    // Top row: #index, case number, type badge, 3-dots menu button
    const topRow = firstCard.querySelector('.docket-card-top');
    expect(topRow).toBeTruthy();
    expect(topRow.querySelector('.row-idx').textContent).toBe('#1');
    expect(topRow.querySelector('.row-caseno').textContent).toBe('FC-23-2024');
    expect(topRow.querySelector('.case-type-badge').textContent).toBe('family');
    expect(topRow.querySelector('.docket-card-menu-btn')).toBeTruthy();

    // Middle row: Parties title + Subtitle (Court & Stage badge)
    const midRow = firstCard.querySelector('.docket-card-middle');
    expect(midRow).toBeTruthy();
    expect(midRow.querySelector('.parties-title').textContent).toBe('Komal Singh vs Vimal Singh');
    expect(midRow.querySelector('.row-court').textContent).toContain('AFC-list / 1st Add. Family Court');
    expect(midRow.querySelector('.stage-badge').textContent).toBe('Cross Examination');

    // Divider
    expect(firstCard.querySelector('.docket-card-divider')).toBeTruthy();

    // Bottom row: Client contact info + Details & Forward buttons
    const bottomRow = firstCard.querySelector('.docket-card-bottom');
    expect(bottomRow).toBeTruthy();
    expect(bottomRow.querySelector('.client-meta').textContent).toContain('Komal Singh');
    expect(bottomRow.querySelector('.client-phone').textContent).toBe('73790 85030');

    // Actions
    const detailsBtn = bottomRow.querySelector('.docket-btn-details');
    const forwardBtn = bottomRow.querySelector('.docket-btn-forward');
    expect(detailsBtn).toBeTruthy();
    expect(detailsBtn.textContent.trim()).toBe('Details');
    expect(forwardBtn).toBeTruthy();
    expect(forwardBtn.textContent.trim()).toBe('Forward');
  });

  it('4. Action buttons in docket cards trigger the correct handler functions', () => {
    window.renderHomeDashboard();

    const firstCard = document.querySelector('.home-today-card');
    const detailsBtn = firstCard.querySelector('.docket-btn-details');
    const forwardBtn = firstCard.querySelector('.docket-btn-forward');

    expect(forwardBtn).toBeTruthy();
    expect(forwardBtn.getAttribute('onclick')).toContain("openUpdateHearingForCase('FC-23-2024')");

    expect(detailsBtn).toBeTruthy();
    expect(detailsBtn.getAttribute('onclick')).toContain("openCaseDetailsFullModal('FC-23-2024')");
    expect(detailsBtn.getAttribute('onclick')).toContain("openCaseHistoryModalByNo('FC-23-2024')");
  });

  it('5. 3-dots action menu toggles dropdown with quick actions', () => {
    window.renderHomeDashboard();

    const firstCard = document.querySelector('.home-today-card');
    const menuBtn = firstCard.querySelector('.docket-card-menu-btn');
    const dropdown = firstCard.querySelector('.docket-card-menu-dropdown');

    expect(menuBtn.getAttribute('onclick')).toContain("toggleDocketCardMenu(event, 'FC-23-2024')");
    expect(dropdown.classList.contains('active')).toBe(false);

    // Call toggleDocketCardMenu with mock event targeting menuBtn
    window.toggleDocketCardMenu({ currentTarget: menuBtn, stopPropagation: () => {}, preventDefault: () => {} }, 'FC-23-2024');
    expect(dropdown.classList.contains('active')).toBe(true);

    // Verify actions inside dropdown
    expect(dropdown.textContent).toContain('WhatsApp Notice');
    expect(dropdown.textContent).toContain('Call Client');
    expect(dropdown.textContent).toContain('Copy Case Number');

    // Call again to close
    window.toggleDocketCardMenu({ currentTarget: menuBtn, stopPropagation: () => {}, preventDefault: () => {} }, 'FC-23-2024');
    expect(dropdown.classList.contains('active')).toBe(false);
  });

  it('6. Daily Cause List Modal opens with listed cases and closes cleanly', () => {
    window.renderHomeDashboard();

    const modal = document.getElementById('homeTodayListModal');
    const openBtn = document.getElementById('openListBtn');
    const closeBtn = document.getElementById('closeModalBtn');
    const listItems = document.getElementById('homeTodayModalListItems');
    const countEl = document.getElementById('todayListModalCount');

    expect(openBtn.getAttribute('onclick')).toContain('openTodayListModal()');
    expect(closeBtn.getAttribute('onclick')).toContain('closeTodayListModal()');
    expect(modal.classList.contains('hidden')).toBe(true);

    // Open Modal via window.openTodayListModal()
    window.openTodayListModal();
    expect(modal.classList.contains('hidden')).toBe(false);

    // Check items rendered
    const items = listItems.querySelectorAll('.today-modal-item');
    expect(items.length).toBe(2);
    expect(items[0].querySelector('.today-modal-caseno').textContent).toBe('FC-23-2024');
    expect(items[0].querySelector('.today-modal-time').textContent).toContain('10:30 AM');
    expect(items[0].querySelector('.today-modal-parties').textContent).toBe('Komal Singh vs Vimal Singh');
    expect(items[0].querySelector('.today-modal-court').textContent).toContain('Cross Examination');

    expect(countEl.textContent).toBe('Showing 2 of 2 cases listed today.');

    // Close Modal via window.closeTodayListModal()
    window.closeTodayListModal();
    expect(modal.classList.contains('hidden')).toBe(true);
  });

  it('7. Preserves desktop tabular view (.docket-table-view) for desktop viewport', () => {
    window.renderHomeDashboard();

    const tableRows = document.querySelectorAll('.docket-table-view');
    expect(tableRows.length).toBe(2);

    const firstRow = tableRows[0];
    expect(firstRow.querySelector('.row-idx').textContent).toBe('#1');
    expect(firstRow.querySelector('.row-caseno').textContent).toBe('FC-23-2024');
    expect(firstRow.querySelector('.parties-title').textContent).toBe('Komal Singh vs Vimal Singh');
    expect(firstRow.querySelector('.row-court').textContent).toContain('AFC-list / 1st Add. Family Court');
    expect(firstRow.querySelector('.stage-badge').textContent.trim()).toBe('Cross Examination');
    expect(firstRow.querySelector('.row-actions')).toBeTruthy();
  });

  it('8. Ensures mobile cards (.docket-card-view, .home-today-card) are hidden by default on desktop via CSS', () => {
    const cssContent = fs.readFileSync(path.resolve(__dirname, '../components/tabs/home/tab-home.css'), 'utf8');
    expect(cssContent).toMatch(/\.docket-card-view[\s\S]*?display:\s*none\s*!important/);
  });
});
