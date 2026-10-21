import { beforeEach, describe, expect, it, vi } from 'vitest';
import '../utils/dateUtils.js';
import '../components/modals/case-modals.js';

const civil = { caseNo: 'CS/10', plaintiff: 'Asha', defendant: 'Beena', caseType: 'civil' };
const criminal = { criminalCaseNumber: 'CR/20', victimName: 'State', accusedName: 'Chandra', caseType: 'criminal' };
const respondent = { caseNo: 'P/30', petitioner: 'Dev', respondent: 'Esha', caseType: 'civil' };
const el = (id) => document.getElementById(id);
const choices = () => [...document.querySelectorAll('#fdComboOptions .fd-combo-option')];
const selectedLabel = () => el('fdComboLabel')?.textContent || el('fdComboInput').value;

describe('forward date controller with custom dropdown', () => {
  beforeEach(() => {
    window.ensureCaseModalsMounted();
    // jsdom evaluates inline attributes in a different realm from imported modules.
    el('fdComboInput').onfocus = null;
    el('fdComboInput').onkeydown = null;
    window.allCaseRecords = [civil, criminal, respondent];
    window.openForwardDateModal();
  });

  it('opens, filters by case number and both parties, allows changing cases, and handles no matches', () => {
    const input = el('fdComboInput');
    window.openForwardCombo();
    expect(el('fdComboInputWrap').getAttribute('aria-expanded')).toBe('true');
    window.onForwardComboInput('Beena');
    expect(choices()).toHaveLength(1);
    expect(choices()[0].textContent).toContain('CS/10');
    choices()[0].click();
    expect(window.fdState.selectedCase).toBe(civil);
    expect(selectedLabel()).toContain('Asha vs Beena — CS/10');
    expect(el('fdComboInputWrap').getAttribute('aria-expanded')).toBe('false');
    expect(choices().find(o => o.textContent.includes('CS/10')).getAttribute('aria-selected')).toBe('true');
    window.onForwardComboInput('Esha');
    expect(choices()).toHaveLength(1);
    choices()[0].click();
    expect(window.fdState.selectedCase).toBe(respondent);
    window.onForwardComboInput('CR/20');
    expect(choices()[0].textContent).toContain('State vs Chandra');
    window.onForwardComboInput('no such case');
    expect(choices()).toHaveLength(0);
    expect(el('fdComboOptions').textContent).toContain('No cases match');
  });

  it('locks civil and criminal targets immediately and unlocks for generic reopening', () => {
    for (const [number, expected] of [['CS/10', civil], ['CR/20', criminal]]) {
      window.openForwardDateModal(number);
      expect(window.fdState.selectedCase).toBe(expected);
      expect(el('fdCdcCaseNo').textContent).toBe(number);
      expect(selectedLabel()).toContain(number);
      expect(el('fdComboInput').disabled).toBe(true);
      window.openForwardCombo();
      window.toggleForwardCombo();
      window.onForwardComboInput('Esha');
      window.selectForwardCase('P/30');
      expect(window.fdState.selectedCase).toBe(expected);
      expect(el('fdComboDropdown').classList.contains('open')).toBe(false);
    }
    window.openForwardDateModal();
    expect(el('fdComboInput').disabled).toBe(false);
    expect(el('fdComboInput').value).toBe('');
    expect(window.fdState.selectedCase).toBeNull();
    expect(el('fdComboDropdown').classList.contains('open')).toBe(false);
    window.selectForwardCase('P/30');
    expect(window.fdState.selectedCase).toBe(respondent);
  });

  it('keeps a focused input open on its bubbled click and supports bounded keyboard navigation', () => {
    const input = el('fdComboInput');
    window.openForwardCombo(new FocusEvent('focus'));
    const event = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(event, 'target', { value: input });
    window.toggleForwardCombo(event);
    expect(el('fdComboDropdown').classList.contains('open')).toBe(true);
    const key = (target, name) => window.handleForwardComboKeydown({ key: name, target, preventDefault() {}, stopPropagation() {} });
    key(input, 'ArrowDown');
    expect(document.activeElement).toBe(choices()[0]);
    key(document.activeElement, 'ArrowUp');
    expect(document.activeElement).toBe(choices()[0]);
    key(document.activeElement, 'Enter');
    expect(window.fdState.selectedCase).not.toBeNull();
    window.openForwardCombo();
    key(input, 'Escape');
    expect(el('fdComboDropdown').classList.contains('open')).toBe(false);
    expect(el('fdModal').classList.contains('open')).toBe(true);
  });

  it('does not let an old submit close a newly opened modal or reselect a closed target', async () => {
    vi.useFakeTimers();
    try {
      window.openForwardDateModal('CS/10');
      window.fdState.nextDate = '2026-12-20';
      el('fdStageSelect').value = 'Evidence';
      await window.submitForwardDateModal();
      expect(window.lastUpdatedHearingCase.caseNo).toBe('CS/10');
      window.closeForwardDateModal();
      window.openForwardDateModal();
      await vi.advanceTimersByTimeAsync(1000);
      expect(el('fdModal').classList.contains('open')).toBe(true);
      expect(window.fdState.selectedCase).toBeNull();
      window.openForwardDateModal('CR/20');
      window.closeForwardDateModal();
      window.openForwardDateModal();
      expect(window.fdState.selectedCase).toBeNull();
      expect(el('fdComboInput').disabled).toBe(false);
    } finally {
      vi.useRealTimers();
    }
  });
});
