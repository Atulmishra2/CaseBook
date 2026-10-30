import { describe, it, expect, beforeEach, vi } from 'vitest';
import '../admin.js';
import '../services/caseService.js';
import '../components/tabs/hearing/tab-hearing.js';

describe('Forward Hearing Tab - UI Alignment & Direct Case Disposal Suite', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__casebook_tabs['hearing'];
    window.allCaseRecords = [
      {
        caseNo: 'CIV-2026-001',
        caseName: 'State of U.P. vs Rajesh',
        caseType: 'civil',
        courtName: 'Addl. Civil Judge Senior Division/ACJM',
        caseStatus: 'Pending',
        nextHearing: '2026-10-18',
        hearingProcess: 'Evidence'
      }
    ];
    window.allHearingRecords = [];
    window.supabaseClient = null;
    window.fetchAllDataFromSupabase = vi.fn().mockResolvedValue(true);
    window.updateSupabaseStatusIndicator = vi.fn();
    window.performPostCrudRefresh = vi.fn().mockResolvedValue(true);
    window.updateHearingInSupabase = vi.fn().mockResolvedValue(true);
    window.updateCaseInSupabase = vi.fn().mockResolvedValue(true);
    window.alert = vi.fn();
    document.dispatchEvent(new Event('DOMContentLoaded'));
  });

  it('renders Step 2, 3, 4 properly with exactly 6 preset buttons and 11 stage radios', () => {
    const stepNums = Array.from(document.querySelectorAll('.step-num')).map(el => el.textContent.trim());
    expect(stepNums).toContain('2');
    expect(stepNums).toContain('3');
    expect(stepNums).toContain('4');

    const presetBtns = document.querySelectorAll('.presets-grid .preset-btn');
    expect(presetBtns.length).toBe(6);

    const radioItems = document.querySelectorAll('input[name="hearingStageRadio"]');
    expect(radioItems.length).toBe(11);
  });

  it('toggleHearingDisposalMode switches UI between Forward Date and Disposal mode', () => {
    const toggle = document.getElementById('hearingIsDisposedToggle');
    const submitBtn = document.getElementById('hearingSubmitBtn');
    const dateInput = document.getElementById('hearingDate');
    const fields = document.getElementById('hearingDisposalFields');

    expect(toggle).toBeDefined();
    expect(submitBtn.textContent.trim()).toBe('Forward Date');
    expect(dateInput.hasAttribute('required')).toBe(true);

    // Turn disposal ON
    window.toggleHearingDisposalMode(true);
    expect(fields.style.display).toBe('block');
    expect(dateInput.hasAttribute('required')).toBe(false);
    expect(submitBtn.textContent).toContain('Dispose & Close Case');

    // Turn disposal OFF
    window.toggleHearingDisposalMode(false);
    expect(fields.style.display).toBe('none');
    expect(dateInput.hasAttribute('required')).toBe(true);
    expect(submitBtn.textContent.trim()).toBe('Forward Date');
  });

  it('handleUpdateHearingSubmit marks case as Disposed with no next date when disposal toggle is checked', async () => {
    const toggle = document.getElementById('hearingIsDisposedToggle');
    toggle.checked = true;
    window.toggleHearingDisposalMode(true);

    document.getElementById('hearingCaseNo').value = 'CIV-2026-001';
    document.getElementById('hearingDisposalStatusSelect').value = 'Decided';
    document.getElementById('hearingDisposalComment').value = 'Decided on merits by court order';

    const updateCaseSpy = vi.spyOn(window, 'updateCaseInSupabase');

    await window.handleUpdateHearingSubmit(new Event('submit'));

    const updatedCase = window.allCaseRecords.find(c => c.caseNo === 'CIV-2026-001');
    expect(updatedCase).toBeDefined();
    expect(updatedCase.caseStatus).toBe('Decided');
    expect(updatedCase.disposalComment).toBe('Decided on merits by court order');
    expect(updatedCase.nextHearing).toBe(null);

    expect(updateCaseSpy).toHaveBeenCalled();
    expect(window.performPostCrudRefresh).toHaveBeenCalledWith({ caseNumber: 'CIV-2026-001' });
    expect(window.alert).toHaveBeenCalled();
  });

  it('renders customMadeDropdown1 searchable dropdown and formats options with only important info', () => {
    window.allCaseRecords = [
      {
        caseNo: '306/2026',
        caseName: 'Putti Lal vs Malti',
        caseType: 'civil',
        nextHearing: '' // undated
      },
      {
        caseNo: 'CC-967/2024',
        caseName: 'Vijay Laxmi vs Mohan & 4 other',
        caseType: 'complaint',
        nextHearing: '2026-10-24' // overdue (before today)
      }
    ];

    window.populateHearingCaseDropdown();

    const select = document.getElementById('hearingCaseSelect');
    expect(select).toBeDefined();

    const options = Array.from(select.querySelectorAll('option'));
    const undatedOpt = options.find(o => o.value === '306/2026');
    const overdueOpt = options.find(o => o.value === 'CC-967/2024');

    expect(undatedOpt).toBeDefined();
    expect(undatedOpt.textContent).toBe('306/2026 — Putti Lal vs Malti');
    expect(undatedOpt.textContent).not.toContain('❓');
    expect(undatedOpt.textContent).not.toContain('[CIVIL]');
    expect(undatedOpt.textContent).not.toContain('(Undated)');

    expect(overdueOpt).toBeDefined();
    expect(overdueOpt.textContent).toContain('CC-967/2024 — Vijay Laxmi vs Mohan & 4 other (24/10/2026)');
    expect(overdueOpt.textContent).not.toContain('⏰');
    expect(overdueOpt.textContent).not.toContain('[COMPLAINT]');
    expect(overdueOpt.textContent).not.toContain('Passed');

    // Check custom dropdown structure
    const trigger = document.getElementById('hearingDropdownTrigger');
    const label = document.getElementById('hearingSelectedLabel');
    const menu = document.getElementById('hearingDropdownMenu');
    const searchInput = document.getElementById('hearingDropdownSearch');
    const optionsContainer = document.getElementById('hearingDropdownOptions');

    expect(trigger).toBeDefined();
    expect(label).toBeDefined();
    expect(menu).toBeDefined();
    expect(searchInput).toBeDefined();
    expect(optionsContainer).toBeDefined();

    // Trigger click opens menu
    trigger.click();
    expect(menu.style.display).toBe('flex');

    // Test selection from custom dropdown
    const customItems = optionsContainer.querySelectorAll('.custom-dropdown-item');
    expect(customItems.length).toBe(2);

    const targetItem = Array.from(customItems).find(el => el.dataset.value === 'CC-967/2024');
    expect(targetItem).toBeDefined();
    targetItem.click();

    expect(select.value).toBe('CC-967/2024');
    expect(label.textContent).toContain('CC-967/2024');
    expect(menu.style.display).toBe('none');

    // Test search filter
    trigger.click();
    searchInput.value = 'Putti';
    searchInput.dispatchEvent(new Event('input'));

    const visibleItems = optionsContainer.querySelectorAll('.custom-dropdown-item');
    expect(visibleItems.length).toBe(1);
    expect(visibleItems[0].dataset.value).toBe('306/2026');
  });

  it('renders customMadeDropdown1 for hearing stage with searchbar and synchronizes selection', () => {
    window.initCustomHearingStageDropdown();

    const trigger = document.getElementById('hearingStageDropdownTrigger');
    const label = document.getElementById('hearingStageSelectedLabel');
    const menu = document.getElementById('hearingStageDropdownMenu');
    const searchInput = document.getElementById('hearingStageDropdownSearch');
    const optionsContainer = document.getElementById('hearingStageDropdownOptions');
    const emptyState = document.getElementById('hearingStageDropdownEmpty');
    const processInput = document.getElementById('hearingProcess');
    const otherContainer = document.getElementById('otherInputContainer');
    const customStage = document.getElementById('customStage');

    expect(trigger).toBeDefined();
    expect(label).toBeDefined();
    expect(menu).toBeDefined();
    expect(searchInput).toBeDefined();
    expect(optionsContainer).toBeDefined();

    // Dropdown initially closed
    expect(menu.style.display).toBe('none');

    // Click trigger opens dropdown
    trigger.click();
    expect(menu.style.display).toBe('flex');

    // Check all stage options are rendered
    const items = optionsContainer.querySelectorAll('.custom-dropdown-item');
    expect(items.length).toBeGreaterThanOrEqual(11);

    // Test search filter
    searchInput.value = 'Bail';
    searchInput.dispatchEvent(new Event('input'));
    const filteredItems = optionsContainer.querySelectorAll('.custom-dropdown-item');
    expect(filteredItems.length).toBe(1);
    expect(filteredItems[0].textContent).toContain('Bail Hearing');

    // Select filtered item
    filteredItems[0].click();
    expect(menu.style.display).toBe('none');
    expect(label.textContent).toContain('Bail Hearing');
    expect(processInput.value).toContain('Bail Hearing');
    expect(otherContainer.style.display).toBe('none');

    // Test "Other" selection opens customStage input
    trigger.click();
    searchInput.value = 'Other';
    searchInput.dispatchEvent(new Event('input'));
    const otherItem = Array.from(optionsContainer.querySelectorAll('.custom-dropdown-item')).find(el => el.dataset.value === 'Other');
    expect(otherItem).toBeDefined();
    otherItem.click();

    expect(label.textContent).toContain('Other');
    expect(otherContainer.style.display).toBe('flex');
    expect(document.getElementById('hearingStage').value).toBe('Other');

    // Typing in custom stage updates process input
    customStage.value = 'Special Evidence Session';
    customStage.dispatchEvent(new Event('input'));
    expect(processInput.value).toBe('Special Evidence Session');

    // syncHearingStageFromValue updates custom dropdown label
    window.syncHearingStageFromValue('Summoning');
    expect(label.textContent).toContain('Summoning');
    expect(otherContainer.style.display).toBe('none');
  });
});
