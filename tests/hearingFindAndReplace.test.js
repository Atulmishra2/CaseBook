import { describe, it, expect, beforeEach, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import '../admin.js';
import '../components/tabs/hearing/tab-hearing.js';

describe('Forward Hearing - Modernized Layout Parity & Codebase Integrity', () => {
  const htmlPath = resolve(process.cwd(), 'components/tabs/hearing/tab-hearing.html');
  const jsPath = resolve(process.cwd(), 'components/tabs/hearing/tab-hearing.js');
  const rawHtml = readFileSync(htmlPath, 'utf8').trim();
  const rawJs = readFileSync(jsPath, 'utf8');

  beforeEach(() => {
    document.body.innerHTML = window.__casebook_tabs['hearing'];
    window.allCaseRecords = [
      {
        caseNo: 'CIV-2026-089',
        caseName: 'Rajesh Sharma v. State',
        caseType: 'civil',
        courtName: 'Addl. District Judge 4',
        hearingProcess: 'Framing of Issues',
        nextHearing: '2026-11-10'
      }
    ];
  });

  it('ensures static HTML template and in-memory JS template are in exact find-and-replace parity', () => {
    expect(rawJs).toContain("window.__casebook_tabs['hearing'] = `");
    // Extract template string from tab-hearing.js
    const match = rawJs.match(/window\.__casebook_tabs\['hearing'\]\s*=\s*`([\s\S]*?)`;/);
    expect(match).not.toBeNull();
    const templateInJs = match[1].trim();
    expect(templateInJs).toBe(rawHtml);
  });

  it('renders all Modernized UI/UX Pro Max header elements without cluttering shortcuts buttons', () => {
    const title = document.querySelector('.fd-title');
    expect(title).not.toBeNull();
    expect(title.textContent).toBe('Forward Hearing Date');

    const batchBtn = document.getElementById('hearingFastBatchBtn');
    expect(batchBtn).not.toBeNull();

    const pendingLabel = document.getElementById('hearingPendingCountLabel');
    expect(pendingLabel).not.toBeNull();

    // Shortcuts button is removed for clean visual aesthetics
    const shortcutsBtn = document.querySelector('.fd-btn-shortcuts');
    expect(shortcutsBtn).toBeNull();
  });

  it('renders Step 1 SMART CASE SELECTOR with omni-search trigger and passport card', () => {
    const trigger = document.getElementById('hearingDropdownTrigger');
    expect(trigger).not.toBeNull();
    expect(trigger.classList.contains('fd-omni-search-trigger')).toBe(true);

    const passportCard = document.getElementById('caseDetailsCard');
    expect(passportCard).not.toBeNull();
    expect(passportCard.classList.contains('fd-passport-card')).toBe(true);
    expect(document.getElementById('caseDetailCardName')).not.toBeNull();
    expect(document.getElementById('caseDetailCardNumber')).not.toBeNull();
    expect(document.getElementById('caseDetailCardCourt')).not.toBeNull();
    expect(document.getElementById('copyHearingCaseBtn')).not.toBeNull();
  });

  it('renders Step 2 SCHEDULE & PROCEEDINGS in a dual-column balanced grid', () => {
    const dualGrid = document.querySelector('.fd-dual-grid');
    expect(dualGrid).not.toBeNull();

    // Left Column: Calendar & Presets
    const calCol = dualGrid.querySelector('.fd-column-calendar');
    expect(calCol).not.toBeNull();
    const presets = calCol.querySelectorAll('.presets-grid .preset-btn');
    expect(presets.length).toBe(6);
    expect(document.getElementById('hearingCalDays')).not.toBeNull();
    expect(document.getElementById('hearingSelectedDateBox')).not.toBeNull();

    // Right Column: Stage & Proceedings
    const stageCol = dualGrid.querySelector('.fd-column-stage');
    expect(stageCol).not.toBeNull();
    expect(document.getElementById('hearingStageRecommendationWrap')).not.toBeNull();
    expect(document.getElementById('hearingStageDropdownTrigger')).not.toBeNull();
    expect(document.getElementById('hearingOrderSnippetsWrap')).not.toBeNull();
    expect(document.getElementById('hearingActionTaken')).not.toBeNull();
    expect(document.getElementById('hearingDisposalBox')).not.toBeNull();
  });

  it('renders the clean forward date submit button with glassmorphic styling without sticky card', () => {
    // Sticky dock card has been removed as requested
    expect(document.getElementById('hearingStickyActionDock')).toBeNull();
    const submitSection = document.getElementById('hearingSubmitSection');
    expect(submitSection).not.toBeNull();

    const submitBtn = document.getElementById('hearingSubmitBtn');
    expect(submitBtn).not.toBeNull();
    expect(submitBtn.classList.contains('fd-btn-glassmorphism')).toBe(true);
    expect(submitBtn.textContent.trim()).toBe('Forward Date');
  });

  it('renders the WhatsApp interactive notice modal', () => {
    const waModal = document.getElementById('hearingWhatsAppModal');
    expect(waModal).not.toBeNull();
    expect(document.getElementById('hearingWhatsAppPhoneInput')).not.toBeNull();
    expect(document.getElementById('hearingWhatsAppPreviewText')).not.toBeNull();
    expect(document.getElementById('hearingShortcutsModal')).toBeNull();
  });

  it('safely handles live preview updates when dock summary pills are removed', () => {
    const dateInput = document.getElementById('hearingDate');
    const processInput = document.getElementById('hearingProcess');

    dateInput.value = '2026-11-10';
    processInput.value = 'Framing of Issues';
    expect(() => window.updateHearingLivePreview()).not.toThrow();
  });

  it('filters order snippets by category tabs', () => {
    const list = document.getElementById('hearingOrderSnippetsList');
    expect(list).not.toBeNull();

    // Filter by pleadings
    window.filterHearingSnippets('pleadings', null);
    const pleadings = list.querySelectorAll('.order-snippet-chip[data-category="pleadings"]');
    const adjourn = list.querySelectorAll('.order-snippet-chip[data-category="adjourn"]');

    pleadings.forEach(el => expect(el.style.display).toBe('inline-flex'));
    adjourn.forEach(el => expect(el.style.display).toBe('none'));

    // Filter back to all
    window.filterHearingSnippets('all', null);
    adjourn.forEach(el => expect(el.style.display).toBe('inline-flex'));
  });

  it('updates calendar footer with day name, formatted date, and relative in-days interval upon date selection', () => {
    const dateInput = document.getElementById('hearingDate');
    const calFooter = document.getElementById('hearingCalSelectedText');
    expect(calFooter).not.toBeNull();

    // Select date 14 days ahead
    const target = new Date();
    target.setDate(target.getDate() + 14);
    const yyyy = target.getFullYear();
    const mm = String(target.getMonth() + 1).padStart(2, '0');
    const dd = String(target.getDate()).padStart(2, '0');
    dateInput.value = `${yyyy}-${mm}-${dd}`;

    window.renderHearingTabCalendar();

    const fullDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    expect(calFooter.textContent).toContain(fullDays[target.getDay()]);
    expect(calFooter.textContent).toContain('in 14 days');
    expect(calFooter.textContent).toContain(String(target.getDate()));

    // Clear calendar
    window.hearingCalClear();
    expect(calFooter.textContent).toBe('Select a date');
  });

  it('renders dd2 custom Month and Year dropdowns in calendar header and allows selecting month and year', () => {
    const monthDd = document.getElementById('calMonthDropdown');
    const yearDd = document.getElementById('calYearDropdown');
    const monthLabel = document.getElementById('calMonthDropdownLabel');
    const yearLabel = document.getElementById('calYearDropdownLabel');

    expect(monthDd).not.toBeNull();
    expect(yearDd).not.toBeNull();
    expect(monthLabel).not.toBeNull();
    expect(yearLabel).not.toBeNull();

    // Toggle dropdown open
    window.toggleHearingCalDropdown('calMonthDropdown', null);
    expect(monthDd.classList.contains('open')).toBe(true);

    // Select December (month index 11)
    window.selectHearingCalMonth(11, null);
    expect(monthDd.classList.contains('open')).toBe(false);
    expect(window.hearingTabCalState.m).toBe(11);
    expect(monthLabel.textContent).toBe('December');

    // Select Year 2028
    window.selectHearingCalYear(2028, null);
    expect(window.hearingTabCalState.y).toBe(2028);
    expect(yearLabel.textContent).toBe('2028');

    // Test prev/next month buttons
    window.hearingCalNextMonth();
    expect(window.hearingTabCalState.m).toBe(0); // Rolls to January
    expect(window.hearingTabCalState.y).toBe(2029); // Year increments
    expect(monthLabel.textContent).toBe('January');
    expect(yearLabel.textContent).toBe('2029');
  });
});
