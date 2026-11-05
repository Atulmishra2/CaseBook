import { describe, it, expect, beforeEach, vi } from 'vitest';
import '../utils/dateUtils.js';
import '../admin.js';
import '../components/tabs/causelist/tab-causelist.js';

describe('components/tabs/causelist/tab-causelist.js - Cause List Tab Initialization & Controls', () => {
  beforeEach(() => {
    // Mount Cause List container
    document.body.innerHTML = `
      <div id="causeListTab">
        ${window.__casebook_tabs["causelist"]}
      </div>
      <span id="causeListNavCount">0</span>
    `;

    window.courts = ['District Court', 'High Court Lucknow', 'NCLT', 'Family Court'];
    window.allCaseRecords = [
      {
        caseNo: 'CS/102/2024',
        caseName: 'ABC vs XYZ',
        caseType: 'civil',
        courtName: 'District Court',
        nextHearing: '2026-11-05',
        hearingProcess: 'Final Arguments'
      },
      {
        criminalCaseNumber: 'CR/455/2025',
        caseName: 'State vs Verma',
        caseType: 'criminal',
        criminalCourtName: 'High Court Lucknow',
        nextHearing: '2026-11-05',
        hearingProcess: 'Examination of Witness'
      },
      {
        caseNo: 'IB/78/2023',
        caseName: 'Mehta & Co. vs Sunrise Ltd',
        caseType: 'corporate',
        courtName: 'NCLT',
        nextHearing: '2026-11-05',
        hearingProcess: 'Admission Hearing'
      }
    ];
  });

  it('initCauseListTab populates court dropdown and initializes date', () => {
    expect(window.initCauseListTab).toBeDefined();
    window.initCauseListTab();

    const dateInput = document.getElementById('causeListDateInput');
    expect(dateInput).not.toBeNull();
    expect(dateInput.value).toMatch(/^\d{4}-\d{2}-\d{2}$/);

    const courtSelect = document.getElementById('causeListCourtFilterSelect');
    expect(courtSelect).not.toBeNull();
    expect(courtSelect.options.length).toBeGreaterThan(1);
    expect(courtSelect.innerHTML).toContain('District Court');
    expect(courtSelect.innerHTML).toContain('High Court Lucknow');
  });

  it('setCauseListDateOffset updates date input accurately with day offsets', () => {
    expect(window.setCauseListDateOffset).toBeDefined();

    // Today (0)
    window.setCauseListDateOffset(0);
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    expect(document.getElementById('causeListDateInput').value).toBe(todayStr);

    // Tomorrow (1)
    window.setCauseListDateOffset(1);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`;
    expect(document.getElementById('causeListDateInput').value).toBe(tomorrowStr);
  });
});

describe('components/tabs/causelist/tab-causelist.js - renderCauseListTable Filtering & Sublines', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="causeListTab">
        ${window.__casebook_tabs["causelist"]}
      </div>
      <span id="causeListNavCount">0</span>
    `;

    window.allCaseRecords = [
      {
        caseNo: 'CS/102/2024',
        caseName: 'ABC vs XYZ',
        caseType: 'civil',
        courtName: 'District Court',
        nextHearing: '2026-11-05',
        hearingProcess: 'Final Arguments'
      },
      {
        criminalCaseNumber: 'CR/455/2025',
        caseName: 'State vs Verma',
        caseType: 'criminal',
        criminalCourtName: 'High Court Lucknow',
        nextHearing: '2026-11-05',
        hearingProcess: 'Examination of Witness'
      },
      {
        caseNo: 'IB/78/2023',
        caseName: 'Mehta & Co. vs Sunrise Ltd',
        caseType: 'corporate',
        courtName: 'NCLT',
        nextHearing: '2026-11-05',
        hearingProcess: 'Admission Hearing'
      }
    ];
  });

  it('renders listed matters and accurate subline count for specified date', () => {
    window.renderCauseListTable('2026-11-05', '');

    const subline = document.getElementById('causeListSubline');
    const footerCount = document.getElementById('causeListFooterCount');

    expect(subline.textContent).toContain('3 listings');
    expect(footerCount.textContent).toContain('Showing 3 of 3 cases');

    const container = document.getElementById('causeListCardsContainer');
    expect(container.innerHTML).toContain('ABC vs XYZ');
    expect(container.innerHTML).toContain('#CS/102/2024');
    expect(container.innerHTML).toContain('State vs Verma');
  });

  it('filters causes by specific court forum', () => {
    window.renderCauseListTable('2026-11-05', 'District Court');

    const subline = document.getElementById('causeListSubline');
    expect(subline.textContent).toContain('1 listings');

    const container = document.getElementById('causeListCardsContainer');
    expect(container.innerHTML).toContain('ABC vs XYZ');
    expect(container.innerHTML).not.toContain('State vs Verma');
  });

  it('shows clean empty state when no cases are listed on that date', () => {
    window.renderCauseListTable('2029-01-01', '');

    const subline = document.getElementById('causeListSubline');
    expect(subline.textContent).toContain('0 listings');

    const container = document.getElementById('causeListCardsContainer');
    expect(container.innerHTML).toContain('causelist-empty');
    expect(container.innerHTML).toContain('No court appearances scheduled');
  });
});

describe('components/tabs/causelist/tab-causelist.js - Judicial Grid Architecture & Accordion', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="causeListTab">
        ${window.__casebook_tabs["causelist"]}
      </div>
      <span id="causeListNavCount">0</span>
    `;

    window.allCaseRecords = [
      {
        caseNo: 'CS/102/2024',
        caseName: 'ABC vs XYZ',
        plaintiff: 'ABC',
        defendant: 'XYZ',
        partyName: 'ABC',
        clientName: 'Ramesh',
        clientNumber: '9839012345',
        caseType: 'civil',
        courtName: 'District Court',
        nextHearing: '2026-11-05',
        hearingProcess: 'Final Arguments',
        remark: 'Previous hearing order memo — bring certified copy of Ex. P-7',
        filingDate: '2024-03-12',
        previousHearing: '2026-10-15',
        previousProcess: 'Evidence'
      }
    ];
  });

  it('renders 5-column grid case head with chevron, title, court, case no and tag', () => {
    window.renderCauseListTable('2026-11-05', '');

    const container = document.getElementById('causeListCardsContainer');
    const caseItem = container.querySelector('.case');
    expect(caseItem).not.toBeNull();

    const caseHead = caseItem.querySelector('.case-head');
    expect(caseHead).not.toBeNull();
    expect(caseHead.querySelector('.c-title').textContent).toBe('ABC vs XYZ');
    expect(caseHead.querySelector('.c-court').textContent).toContain('District Court');
    expect(caseHead.querySelector('.c-no').textContent).toBe('#CS/102/2024');
    expect(caseHead.querySelector('.tag.civil').textContent).toBe('Civil');
  });

  it('renders rich expanded drawer with 3-column ledger table (Case/Client info, Hearing Stage/Previous, Remarks and 3 Actions)', () => {
    window.renderCauseListTable('2026-11-05', '');

    const container = document.getElementById('causeListCardsContainer');
    const caseItem = container.querySelector('.case');
    const body = caseItem.querySelector('.case-body');
    expect(body).not.toBeNull();

    // 1. 3-Column Ledger Grid structure
    const ledger = body.querySelector('.meta-ledger-3col');
    expect(ledger).not.toBeNull();
    const cols = ledger.querySelectorAll('.ledger-col');
    expect(cols.length).toBe(3);

    // 2. Col 1: Client info & Direct contact links
    expect(body.innerHTML).toContain('Client');
    expect(body.innerHTML).toContain('Ramesh');
    expect(body.innerHTML).toContain('tel:9839012345');
    expect(body.innerHTML).toContain('wa.me/919839012345');

    // 3. Col 2: Real Hearing Stage & Previous Date
    expect(body.innerHTML).toContain('Stage');
    expect(body.innerHTML).toContain('Final Arguments');
    expect(body.innerHTML).toContain('Previous');
    expect(body.innerHTML).toContain('Filing Date');

    // 4. Col 3: Dedicated Remarks & Memo
    expect(body.innerHTML).toContain('Remarks / Order Note');
    expect(body.innerHTML).toContain('Previous hearing order memo — bring certified copy of Ex. P-7');

    // 5. Removed fields must NOT exist in the DOM
    expect(body.innerHTML).not.toContain('Representation');
    expect(body.innerHTML).not.toContain('High Priority');

    // 6. Action Buttons
    expect(body.querySelector('.act.primary')).not.toBeNull();
    expect(body.querySelector('.act.primary').textContent).toContain('Update Next Date');

    const secondaryActs = body.querySelectorAll('.act:not(.primary)');
    expect(secondaryActs.length).toBe(3);
    expect(secondaryActs[0].textContent).toContain('Open Dossier');
    expect(secondaryActs[1].textContent).toContain('Call Client');
    expect(secondaryActs[2].textContent).toContain('WhatsApp');
    expect(body.innerHTML).not.toContain('Pass-Over Note');
  });

  it('toggleCaseAccordion toggles open class on the case article', () => {
    window.renderCauseListTable('2026-11-05', '');

    const caseItem = document.querySelector('.case');
    const headBtn = caseItem.querySelector('.case-head');

    // Default table state collapsed
    expect(caseItem.classList.contains('open')).toBe(false);

    window.toggleCaseAccordion(headBtn);
    expect(caseItem.classList.contains('open')).toBe(true);

    window.toggleCaseAccordion(headBtn);
    expect(caseItem.classList.contains('open')).toBe(false);
  });

  it('renders .act-text wrapper on action buttons for mobile icon-only adaptability and maintains footer inline structure', () => {
    window.renderCauseListTable('2026-11-05', '');

    const caseItem = document.querySelector('.case');
    const head = caseItem.querySelector('.case-head');
    expect(head.querySelector('.c-title')).not.toBeNull();
    expect(head.querySelector('.c-court')).not.toBeNull();
    expect(head.querySelector('.chev')).not.toBeNull();

    // Verify act-text wrapper for mobile responsiveness
    const actTexts = caseItem.querySelectorAll('.act .act-text');
    expect(actTexts.length).toBeGreaterThanOrEqual(2);
    expect(actTexts[0].textContent).toBe('Update Next Date');
    expect(actTexts[1].textContent).toBe('Open Dossier');

    // Verify table footer structure
    const footer = document.querySelector('.foot');
    expect(footer).not.toBeNull();
    expect(footer.querySelector('#causeListFooterCount')).not.toBeNull();
    expect(footer.querySelector('.foot-sync')).not.toBeNull();
  });
});

describe('components/tabs/causelist/tab-causelist.js - WhatsApp & Pass-Over Slips', () => {
  beforeEach(() => {
    window.allCaseRecords = [
      {
        caseNo: 'CS/102/2024',
        caseName: 'ABC vs XYZ',
        plaintiff: 'ABC',
        defendant: 'XYZ',
        caseType: 'civil',
        courtName: 'District Court',
        nextHearing: '2026-11-05',
        hearingProcess: 'Final Arguments',
        clientName: 'Ramesh'
      }
    ];
  });

  it('sendDailyCauseListWhatsApp alerts when no hearings scheduled on date', () => {
    const alertMock = vi.fn();
    window.alert = alertMock;

    window.currentCauseListDate = '2030-01-01';
    window.sendDailyCauseListWhatsApp();

    expect(alertMock).toHaveBeenCalled();
  });

  it('sendDailyCauseListWhatsApp opens WhatsApp URL when matters are listed', () => {
    const openMock = vi.fn();
    window.open = openMock;

    window.currentCauseListDate = '2026-11-05';
    window.sendDailyCauseListWhatsApp();

    expect(openMock).toHaveBeenCalled();
    const openedUrl = openMock.mock.calls[0][0];
    expect(openedUrl).toContain('https://wa.me/?text=');
    expect(decodeURIComponent(openedUrl)).toContain('ABC vs XYZ');
    expect(decodeURIComponent(openedUrl)).toContain('CS/102/2024');
  });

  it('copyPassOverNote formats and copies court pass-over slip for advocate', () => {
    expect(window.copyPassOverNote).toBeDefined();

    let copiedText = '';
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation((text) => {
          copiedText = text;
          return Promise.resolve();
        })
      }
    });

    window.copyPassOverNote('CS/102/2024');

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    expect(copiedText).toContain('*COURT PASS-OVER / HAZIRI REQUEST*');
    expect(copiedText).toContain('District Court');
    expect(copiedText).toContain('ABC vs XYZ');
    expect(copiedText).toContain('Final Arguments');
  });
});

describe('components/tabs/causelist/tab-causelist.js - customMadeDropDown1 & Collapsed Default State', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="causeListTab">
        ${window.__casebook_tabs["causelist"]}
      </div>
      <span id="causeListNavCount">0</span>
    `;

    window.courts = ['District Court', 'High Court Lucknow', 'NCLT'];
    window.allCaseRecords = [
      {
        caseNo: 'CS/102/2024',
        caseName: 'ABC vs XYZ',
        caseType: 'civil',
        courtName: 'District Court',
        nextHearing: '2026-11-05',
        hearingProcess: 'Final Arguments'
      },
      {
        criminalCaseNumber: 'CR/455/2025',
        caseName: 'State vs Verma',
        caseType: 'criminal',
        criminalCourtName: 'High Court Lucknow',
        nextHearing: '2026-11-05',
        hearingProcess: 'Examination of Witness'
      }
    ];
  });

  it('renders all matters initially collapsed (default table state collapsed)', () => {
    window.renderCauseListTable('2026-11-05', '');

    const cases = document.querySelectorAll('.case');
    expect(cases.length).toBe(2);
    cases.forEach((c) => {
      expect(c.classList.contains('open')).toBe(false);
      const head = c.querySelector('.case-head');
      expect(head.getAttribute('aria-expanded')).toBe('false');
    });
  });

  it('initializes customMadeDropDown1 for Court Filter and toggles dropdown menu', () => {
    window.initCauseListTab();

    const dd = document.getElementById('causeListCourtDropdown');
    expect(dd).not.toBeNull();

    const trigger = dd.querySelector('.custom-dropdown-trigger');
    const menu = dd.querySelector('.custom-dropdown-menu');
    const label = dd.querySelector('.custom-dropdown-label');
    const list = dd.querySelector('.custom-dropdown-list');

    expect(trigger).not.toBeNull();
    expect(menu).not.toBeNull();
    expect(label.textContent).toBe('All Courts');

    // Options populated in custom list
    const items = list.querySelectorAll('.custom-dropdown-item');
    expect(items.length).toBeGreaterThanOrEqual(3);

    // Toggle dropdown open/close
    expect(menu.classList.contains('open')).toBe(false);
    trigger.click();
    expect(menu.classList.contains('open')).toBe(true);
    trigger.click();
    expect(menu.classList.contains('open')).toBe(false);
  });

  it('selects option in customMadeDropDown1, updates underlying select and filters table', () => {
    window.initCauseListTab();

    const dd = document.getElementById('causeListCourtDropdown');
    const trigger = dd.querySelector('.custom-dropdown-trigger');
    const list = dd.querySelector('.custom-dropdown-list');
    const select = document.getElementById('causeListCourtFilterSelect');

    trigger.click();
    const courtItem = Array.from(list.querySelectorAll('.custom-dropdown-item')).find(
      (el) => el.getAttribute('data-value') === 'District Court'
    );
    expect(courtItem).toBeDefined();

    courtItem.click();

    expect(select.value).toBe('District Court');
    expect(dd.querySelector('.custom-dropdown-label').textContent).toBe('District Court');

    const container = document.getElementById('causeListCardsContainer');
    expect(container.innerHTML).toContain('ABC vs XYZ');
    expect(container.innerHTML).not.toContain('State vs Verma');
  });
});
