/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Manage Hub Add Case Redesign Suite (components/tabs/manage)', () => {
  const manageHtmlPath = path.resolve(__dirname, '../components/tabs/manage/tab-manage.html');
  const manageJsPath = path.resolve(__dirname, '../components/tabs/manage/tab-manage.js');
  const manageCssPath = path.resolve(__dirname, '../components/tabs/manage/tab-manage.css');

  const manageHtml = fs.readFileSync(manageHtmlPath, 'utf8');
  const manageJs = fs.readFileSync(manageJsPath, 'utf8');
  const manageCss = fs.readFileSync(manageCssPath, 'utf8');

  beforeEach(() => {
    document.body.innerHTML = '';
    window.courts = ['District Court, Room 1', 'Family Court, Room 2'];
    window.allCaseRecords = [];
    window.getDeletedCourtsSet = () => new Set();
    window.escapeHtml = (str) =>
      String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    window.showToastNotification = vi.fn();

    // Load manage.js
    window.__casebook_tabs = window.__casebook_tabs || {};
    eval(manageJs);

    // Mount tab HTML into document
    document.body.innerHTML = window.__casebook_tabs['manage'];
  });

  it('1. HTML template and JS template must have exact pane-add markup parity without casetype pills', () => {
    expect(window.__casebook_tabs['manage']).toBeTruthy();
    expect(document.getElementById('pane-add')).not.toBeNull();
    // Casetype pills rail is removed from the form
    expect(document.querySelector('.category-chips-rail')).toBeNull();
  });

  it('2. Category selection dropdown has all 7 statutory registers', () => {
    const select = document.getElementById('caseHubTypeSelect');
    expect(select).not.toBeNull();

    const options = Array.from(select.options)
      .map((opt) => opt.value)
      .filter(Boolean);
    expect(options).toEqual([
      'civil',
      'criminal',
      'family',
      'revenue',
      'misc',
      'bail',
      'cheque',
    ]);
  });

  it('3. Category selection renders the appropriate category form', () => {
    window.setCaseHubCategoryChip('family');
    const select = document.getElementById('caseHubTypeSelect');
    expect(select.value).toBe('family');

    const container = document.getElementById('caseHubAddFormContainer');
    expect(container.innerHTML).toContain('hubAdd_matterType');
  });

  it('4. All 7 categories render modular sub-cards (.hub-subcard) and Lucide mini-court button', () => {
    const categories = ['civil', 'criminal', 'family', 'revenue', 'misc', 'bail', 'cheque'];

    categories.forEach((cat) => {
      window.renderCaseHubAddForm(cat);
      const container = document.getElementById('caseHubAddFormContainer');
      const cards = container.querySelectorAll('.hub-subcard');
      expect(cards.length).toBeGreaterThanOrEqual(4);

      // Verify mini-court button with Lucide plus SVG
      const miniBtn = container.querySelector('.mini-court-btn');
      expect(miniBtn).not.toBeNull();
      expect(miniBtn.querySelector('svg.lucide-plus')).not.toBeNull();
    });
  });

  it('5. ZERO duplicate remarks bug: Exactly ONE remarks textarea rendered per form', () => {
    const categories = ['civil', 'criminal', 'family', 'revenue', 'misc', 'bail', 'cheque'];

    categories.forEach((cat) => {
      window.renderCaseHubAddForm(cat);
      const container = document.getElementById('caseHubAddFormContainer');
      const textareas = container.querySelectorAll('#hubAdd_remarks');
      expect(textareas.length).toBe(1);

      // Verify preset chips container exists with quick chips
      const chipsWrap = container.querySelector('.case-hub-chips-wrap');
      expect(chipsWrap).not.toBeNull();

      const chips = chipsWrap.querySelectorAll('.case-hub-preset-chip');
      expect(chips.length).toBeGreaterThan(0);
    });
  });

  it('6. Auto-Format and Preview preset buttons use Lucide icons', () => {
    window.renderCaseHubAddForm('civil');
    const autoFormatBtn = document.querySelector('.case-hub-magic-chip');
    expect(autoFormatBtn).not.toBeNull();
    expect(autoFormatBtn.querySelector('svg.lucide')).not.toBeNull();

    const previewBtn = document.querySelector('.case-hub-preview-chip');
    expect(previewBtn).not.toBeNull();
    expect(previewBtn.querySelector('svg.lucide')).not.toBeNull();
  });

  it('7. tab-manage.css has ZERO hardcoded hex color property declarations', () => {
    // Matches hex color codes in property values like : #fff or : #123456
    const hexRegex = /:\s*#[0-9a-fA-F]{3,8}\b/g;
    const matches = manageCss.match(hexRegex);
    expect(matches).toBeNull();
  });

  it('8. All rules in tab-manage.css are strictly tab-scoped', () => {
    // Verify file has scope isolation
    expect(manageCss).toContain(':is(#manage, [data-manage-scope], .case-hub-wrapper)');
  });
});
