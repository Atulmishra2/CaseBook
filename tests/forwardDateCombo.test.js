import { beforeEach, describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import '../utils/dateUtils.js';
import '../components/modals/case-modals.js';

const cases = [
  { caseNo: 'C/1', plaintiff: 'Ada <Civil>', defendant: 'Ben \'Defendant\'', caseType: 'civil', nextHearing: '2026-11-20' },
  { criminalCaseNumber: "CR/'2", victimName: 'Rita', accusedName: 'Vic <script>', caseType: 'criminal', nextHearing: '' },
  { caseNo: 'D/3', petitioner: 'Patti', respondent: 'Rob', caseStatus: 'Disposed', nextHearing: '' },
  { caseNo: 'A/4', applicant: 'Ava', respondent: 'Zed', nextHearing: '' },
  { caseNo: 'FUT/5', plaintiff: 'Future', defendant: 'Case', caseType: 'civil', nextHearing: '2099-12-01' },
];

const el = (id) => document.getElementById(id);
const options = () => [...document.querySelectorAll('#fdComboOptions [role="option"]')];
const keys = (key) => {
  const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
  window.handleForwardComboKeydown(event);
};

describe('forward-date case combo', () => {
  beforeEach(() => {
    window.ensureCaseModalsMounted();
    window.allCaseRecords = cases;
    window.openForwardDateModal();
  });

  it('uses matching custom dropdown markup in the HTML and script templates', () => {
    const html = new DOMParser().parseFromString(
      readFileSync('components/modals/case-modals.html', 'utf8'),
      'text/html',
    );
    const scriptTemplate = new DOMParser().parseFromString(window.__casebook_modals['case-modals'], 'text/html');
    expect(html.getElementById('fdCaseCombo').outerHTML).toBe(scriptTemplate.getElementById('fdCaseCombo').outerHTML);
    expect(el('fdComboLabel').textContent).toBe('Select a case...');
    expect(el('fdComboInputWrap').contains(el('fdComboInput'))).toBe(false);
    expect(el('fdComboDropdown').contains(el('fdComboInput'))).toBe(true);
    expect(el('fdComboOptions').getAttribute('role')).toBe('listbox');
  });

  it('clears a stale search on reopening the dropdown without losing the selected case', () => {
    window.selectForwardCase('C/1');
    window.openForwardCombo();
    el('fdComboInput').value = 'Ava';
    window.onForwardComboInput('Ava');
    expect(options()).toHaveLength(1);
    window.closeForwardCombo();
    window.openForwardCombo();
    expect(el('fdComboInput').value).toBe('');
    expect(options()).toHaveLength(3);
    expect(window.fdState.selectedCase).toBe(cases[0]);
    expect(el('fdComboLabel').textContent).toContain('C/1');
  });

  it('keeps the search panel intact, orders undated first and overdue after, excludes disposed/future cases, and switches selected cases', () => {
    expect(el('fdComboInputWrap').tagName).toBe('BUTTON');
    expect(options().map((option) => option.querySelector('.fd-co-sub').textContent.split(' • ')[0])).toEqual(["CR/'2", 'A/4', 'C/1']);
    window.toggleForwardCombo();
    expect(el('fdComboInputWrap').getAttribute('aria-expanded')).toBe('true');
    window.selectForwardCase('C/1');
    expect(window.fdState.selectedCase).toBe(cases[0]);
    expect(el('fdComboLabel').textContent).toBe('Ada <Civil> vs Ben \'Defendant\' — C/1');
    expect(el('fdComboInputWrap').getAttribute('aria-expanded')).toBe('false');
    expect(options().find((o) => o.textContent.includes('C/1')).getAttribute('aria-selected')).toBe('true');
    window.toggleForwardCombo();
    el('fdComboInput').value = 'vic';
    window.onForwardComboInput('vic');
    expect(options()).toHaveLength(1);
    expect(options()[0].getAttribute('onclick')).toBeNull();
    expect(options()[0].querySelector('script')).toBeNull();
    expect(options()[0].querySelector('.fd-co-text').nextElementSibling.classList.contains('fd-co-badge')).toBe(true);
    expect(options()[0].lastElementChild.classList.contains('fd-co-icon')).toBe(true);
    expect(el('fdComboLabel').textContent).toContain('C/1');
    options()[0].click();
    expect(window.fdState.selectedCase).toBe(cases[1]);
    expect(el('fdComboLabel').textContent).toContain("Rita vs Vic <script> — CR/'2");
    expect(el('fdComboInput').value).toBe('');
    expect(el('fdCdcCaseName').textContent).toBe('Rita vs Vic <script>');
  });

  it('locks civil and criminal card targets immediately, ignores attempts to change the case, and unlocks on general reopen', () => {
    for (const number of ['C/1', "CR/'2"]) {
      window.openForwardDateModal(number);
      expect(window.fdState.selectedCase).toBe(cases.find((c) => (c.caseNo || c.criminalCaseNumber) === number));
      expect(window.fdState.caseSelectionLocked).toBe(true);
      expect(el('fdComboInputWrap').disabled).toBe(true);
      expect(el('fdComboInputWrap').getAttribute('aria-disabled')).toBe('true');
      expect(el('fdComboInput').disabled).toBe(true);
      expect(el('fdComboLabel').textContent).toContain(number);
      window.toggleForwardCombo();
      window.openForwardCombo();
      window.onForwardComboInput('Ava');
      window.selectForwardCase('A/4');
      expect(window.fdState.selectedCase.caseNo || window.fdState.selectedCase.criminalCaseNumber).toBe(number);
      expect(el('fdComboDropdown').classList.contains('open')).toBe(false);
    }
    window.openForwardDateModal();
    expect(window.fdState.selectedCase).toBeNull();
    expect(window.fdState.caseSelectionLocked).toBe(false);
    expect(el('fdComboInputWrap').disabled).toBe(false);
    expect(el('fdComboInput').disabled).toBe(false);
    expect(el('fdComboInput').value).toBe('');
    expect(el('fdCaseDetailSection').style.display).toBe('none');
    window.selectForwardCase('A/4');
    expect(el('fdCdcCaseName').textContent).toBe('Ava vs Zed');
  });

  it('fails closed for missing card targets and shows a clear error until reopened', () => {
    window.selectForwardCase('C/1');
    window.openForwardDateModal('missing / 404');
    expect(window.fdState.selectedCase).toBeNull();
    expect(window.fdState.caseSelectionLocked).toBe(true);
    expect(el('fdCaseDetailSection').style.display).toBe('none');
    expect(el('fdModalSub').textContent).toContain('Case not found: missing / 404');
    window.selectForwardCase('C/1');
    expect(window.fdState.selectedCase).toBeNull();
    window.openForwardDateModal();
    expect(el('fdModalSub').textContent).toBe('Select a case to begin');
  });

  it('filters by either party and safely handles special characters and empty results', () => {
    window.onForwardComboInput('Ben \'Defendant\'');
    expect(options()).toHaveLength(1);
    expect(options()[0].textContent).toContain('C/1');
    window.onForwardComboInput('<script>');
    expect(options()).toHaveLength(1);
    expect(options()[0].querySelector('script')).toBeNull();
    window.onForwardComboInput('never-existing');
    expect(options()).toHaveLength(0);
    expect(el('fdComboOptions').textContent).toContain('No cases match your search');
    expect(el('fdComboInput')).not.toBeNull();
    window.openForwardDateModal();
    expect(el('fdComboInput').value).toBe('');
    expect(options()).toHaveLength(3);
  });

  it('only shows undated/first-date-pending and date-passed cases in dropdown, excluding today/future and disposed cases', () => {
    const todayStr = window.getTodayDateString();
    window.allCaseRecords = [
      { caseNo: 'PAST/1', plaintiff: 'Past', defendant: 'One', nextHearing: '2020-01-15' },
      { caseNo: 'TODAY/2', plaintiff: 'Today', defendant: 'Two', nextHearing: todayStr },
      { caseNo: 'FUT/3', plaintiff: 'Future', defendant: 'Three', nextHearing: '2099-12-01' },
      { caseNo: 'UND/4', plaintiff: 'Undated', defendant: 'Four', nextHearing: '' },
      { caseNo: 'DISP/5', plaintiff: 'Disposed', defendant: 'Five', caseStatus: 'Disposed', nextHearing: '2020-01-01' },
    ];
    window.openForwardDateModal();
    expect(options().map((o) => o.querySelector('.fd-co-sub').textContent.split(' • ')[0])).toEqual(['UND/4', 'PAST/1']);
    window.onForwardComboInput('Today');
    expect(options()).toHaveLength(0);
    window.onForwardComboInput('Future');
    expect(options()).toHaveLength(0);
    window.openForwardDateModal('FUT/3');
    expect(window.fdState.selectedCase?.caseNo).toBe('FUT/3');
  });

  it('supports arrow navigation, Enter selection, Escape without closing modal, Tab, and outside close', () => {
    el('fdComboInputWrap').focus();
    keys('ArrowDown');
    expect(document.activeElement).toBe(options()[0]);
    keys('ArrowDown');
    expect(document.activeElement).toBe(options()[1]);
    keys('ArrowUp');
    expect(document.activeElement).toBe(options()[0]);
    keys('Enter');
    expect(window.fdState.selectedCase).toBe(cases[1]);
    expect(document.activeElement).toBe(el('fdComboInputWrap'));
    window.toggleForwardCombo();
    keys('Escape');
    expect(el('fdComboDropdown').classList.contains('open')).toBe(false);
    expect(el('fdModal').classList.contains('open')).toBe(true);
    expect(document.activeElement).toBe(el('fdComboInputWrap'));
    window.toggleForwardCombo();
    keys('Tab');
    expect(el('fdComboDropdown').classList.contains('open')).toBe(false);
    window.toggleForwardCombo();
    el('fdModalSub').dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(el('fdComboDropdown').classList.contains('open')).toBe(false);
  });

  it('treats a case with a scheduled hearing date as dated, even if caseStatus was Undated', () => {
    window.allCaseRecords = [
      { caseNo: 'ST/11', caseName: 'State vs Mithlesh Kumar ADJ 11', caseType: 'State', caseStatus: 'Undated', nextHearing: '2026-11-24' },
      { caseNo: 'UND/1', caseName: 'Pending vs Undated', caseType: 'Civil', nextHearing: '' }
    ];
    window.openForwardDateModal();
    const rendered = options();
    expect(rendered).toHaveLength(2);
    // Pure undated case is first
    expect(rendered[0].textContent).toContain('UND/1');
    expect(rendered[0].querySelector('.fd-co-badge').textContent).toBe('Undated');
    // Scheduled case is second (not undated!)
    expect(rendered[1].textContent).toContain('ST/11');
    expect(rendered[1].querySelector('.fd-co-badge').textContent).toBe('State');
    expect(rendered[1].querySelector('.fd-co-badge').classList.contains('undated')).toBe(false);
  });
});
