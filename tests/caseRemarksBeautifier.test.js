import { describe, it, expect } from 'vitest';
import '../admin.js';

describe('Case Remarks Smart Natural Parser & Beautification Engine', () => {
  const sampleUserRemark = `Co-Plaintiffs: 1-Roopram,2-Ram Gopal, 3-Chhatrapal s/o Ramswaroop r/o Moh. Ram Lila vard no 5 mailani pargana kukura teh Gola Distt Kheri.
Co-Defendants:
1-Narendra Kumar ,2-Shravan Kumar ,3 -Vijay Kumar ,4- Shukhrani s/w/o Ram Chandra
5-Anita w/o Veerendra Kumar
r/o Moh. Ram Lila vard no 5 mailani pargana kukura teh Gola Distt Kheri`;

  it('parseNaturalRemarkText correctly extracts Co-Plaintiffs and Co-Defendants sections', () => {
    const res = window.parseNaturalRemarkText(sampleUserRemark);
    expect(res.isStructured).toBe(true);
    expect(res.items.length).toBe(2);

    // Section 1: Co-Plaintiffs
    const plaintiffs = res.items[0];
    expect(plaintiffs.key).toBe('Co-Plaintiffs');
    expect(plaintiffs.isPartySection).toBe(true);
    expect(plaintiffs.parties.length).toBe(3);
    expect(plaintiffs.parties[0].name).toBe('Roopram');
    expect(plaintiffs.parties[1].name).toBe('Ram Gopal');
    expect(plaintiffs.parties[2].name).toBe('Chhatrapal');
    expect(plaintiffs.parties[2].relation).toBe('s/o Ramswaroop');
    expect(plaintiffs.address).toContain('Moh. Ram Lila vard no 5');

    // Section 2: Co-Defendants
    const defendants = res.items[1];
    expect(defendants.key).toBe('Co-Defendants');
    expect(defendants.isPartySection).toBe(true);
    expect(defendants.parties.length).toBe(5);
    expect(defendants.parties[0].name).toBe('Narendra Kumar');
    expect(defendants.parties[1].name).toBe('Shravan Kumar');
    expect(defendants.parties[2].name).toBe('Vijay Kumar');
    expect(defendants.parties[3].name).toBe('Shukhrani');
    expect(defendants.parties[3].relation).toBe('s/w/o Ram Chandra');
    expect(defendants.parties[4].name).toBe('Anita');
    expect(defendants.parties[4].relation).toBe('w/o Veerendra Kumar');
    expect(defendants.address).toContain('Moh. Ram Lila vard no 5');
  });

  it('normalizeRemarksData handles natural structured remarks seamlessly', () => {
    const norm = window.normalizeRemarksData(sampleUserRemark);
    expect(norm.type).toBe('natural');
    expect(norm.items.length).toBe(2);
    expect(norm.items[0].key).toBe('Co-Plaintiffs');
    expect(norm.items[1].key).toBe('Co-Defendants');
  });

  it('autoFormatRemarkText converts messy run-on strings into clean lines', () => {
    const formatted = window.autoFormatRemarkText(sampleUserRemark);
    expect(formatted).toContain('Co-Plaintiffs:');
    expect(formatted).toContain('1. Roopram');
    expect(formatted).toContain('2. Ram Gopal');
    expect(formatted).toContain('3. Chhatrapal s/o Ramswaroop');
    expect(formatted).toContain('r/o Moh. Ram Lila vard no 5');
    expect(formatted).toContain('Co-Defendants:');
    expect(formatted).toContain('1. Narendra Kumar');
    expect(formatted).toContain('4. Shukhrani s/w/o Ram Chandra');
    expect(formatted).toContain('5. Anita w/o Veerendra Kumar');
  });

  it('renderRemarkCardItemHtml produces structured party chips with relation tags and inner box', () => {
    const res = window.parseNaturalRemarkText(sampleUserRemark);
    const html = window.renderRemarkCardItemHtml(res.items[0]);

    expect(html).toContain('remark-modal-card-item');
    expect(html).toContain('remark-party-box');
    expect(html).toContain('remark-party-row');
    expect(html).toContain('remark-party-chip');
    expect(html).toContain('remark-party-index');
    expect(html).toContain('remark-party-name');
    expect(html).toContain('Roopram');
    expect(html).toContain('Chhatrapal');
    expect(html).toContain('s/o');
    expect(html).toContain('remark-address-row');
    expect(html).toContain('remark-address-bar');
    expect(html).toContain('Moh. Ram Lila vard no 5');

    // Test Co-Defendants item matching user screenshot
    const defHtml = window.renderRemarkCardItemHtml(res.items[1]);
    expect(defHtml).toContain('Co-Defendants');
    expect(defHtml).toContain('5 Parties');
    expect(defHtml).toContain('Narendra Kumar');
    expect(defHtml).toContain('Shravan Kumar');
    expect(defHtml).toContain('Vijay Kumar');
    expect(defHtml).toContain('Shukhrani');
    expect(defHtml).toContain('s/w/o Ram Chandra');
    expect(defHtml).toContain('Anita');
    expect(defHtml).toContain('w/o Veerendra Kumar');
    expect(defHtml).toContain('Moh. Ram Lila vard no 5 mailani pargana kukura teh Gola Distt Kheri');
  });

  it('handles parenthetical badges like (Deceased) and (Minor)', () => {
    const textWithBadge = 'Co-Defendants: 1. Mohan Lal (Deceased) s/o Ram Lal, 2. Rohan (Minor)';
    const res = window.parseNaturalRemarkText(textWithBadge);
    const html = window.renderRemarkCardItemHtml(res.items[0]);

    expect(html).toContain('rmk-badge-deceased');
    expect(html).toContain('Deceased');
    expect(html).toContain('rmk-badge-minor');
    expect(html).toContain('Minor');
  });

  it('preserves plain remarks when no structure exists', () => {
    const plain = 'Hearing was adjourned on request of respondent advocate.';
    const norm = window.normalizeRemarksData(plain);
    expect(norm.type).toBe('string');
    expect(norm.items[0].value).toBe(plain);
  });

  it('renderCaseTableRemarks renders compact View button instead of bulky in-cell card', () => {
    // 1. Empty remarks
    const emptyHtml = window.renderCaseTableRemarks('', 'CV-101', 'Test Case');
    expect(emptyHtml).toContain('case-remark-empty');
    expect(emptyHtml).toContain('—');

    // 2. Structured remarks
    const btnHtml = window.renderCaseTableRemarks(sampleUserRemark, 'CV-101', 'Test Case');
    expect(btnHtml).toContain('case-remark-view-btn');
    expect(btnHtml).toContain('btn-neumorphic');
    expect(btnHtml).toContain('fa-eye');
    expect(btnHtml).toContain('View');
    expect(btnHtml).toContain('case-remark-count-badge');
    expect(btnHtml).toContain('badge');
    expect(btnHtml).toContain('8'); // 3 plaintiffs + 5 defendants = 8 parties
    expect(btnHtml).toContain('toggleCaseRemarkPopover');
  });

  it('toggleCaseRemarkPopover opens and closes simple card popover on click', () => {
    document.body.innerHTML = '';
    const btnContainer = document.createElement('div');
    btnContainer.innerHTML = window.renderCaseTableRemarks(sampleUserRemark, 'CV-101', 'Test Case');
    document.body.appendChild(btnContainer);

    const btn = btnContainer.querySelector('.case-remark-view-btn');
    expect(btn).toBeTruthy();

    // Toggle open
    window.toggleCaseRemarkPopover(btn, 'CV-101', 'Test Case');
    const popover = document.getElementById('caseRemarkPopover');
    expect(popover).toBeTruthy();
    expect(popover.classList.contains('hidden')).toBe(false);
    expect(btn.classList.contains('active')).toBe(true);

    // Verify popover contents have co-parties
    const body = document.getElementById('caseRemarkPopoverBody');
    expect(body.innerHTML).toContain('Co-Plaintiffs');
    expect(body.innerHTML).toContain('Roopram');
    expect(body.innerHTML).toContain('Co-Defendants');
    expect(body.innerHTML).toContain('Narendra Kumar');

    // Toggle off (clicking again)
    window.toggleCaseRemarkPopover(btn, 'CV-101', 'Test Case');
    expect(popover.classList.contains('hidden')).toBe(true);
    expect(btn.classList.contains('active')).toBe(false);
  });
});
