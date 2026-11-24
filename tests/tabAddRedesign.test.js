/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Register New Case Tab Redesign Suite (components/tabs/add)', () => {
  const addHtmlPath = path.resolve(__dirname, '../components/tabs/add/tab-add.html');
  const addJsPath = path.resolve(__dirname, '../components/tabs/add/tab-add.js');
  const addCssPath = path.resolve(__dirname, '../components/tabs/add/tab-add.css');

  const addHtml = fs.readFileSync(addHtmlPath, 'utf8');
  const addJs = fs.readFileSync(addJsPath, 'utf8');
  const addCss = fs.readFileSync(addCssPath, 'utf8');

  beforeEach(() => {
    document.body.innerHTML = '';
    // Load tab-add.js into window
    window.__casebook_tabs = window.__casebook_tabs || {};
    eval(addJs);
    document.body.innerHTML = window.__casebook_tabs['add'];
  });

  it('1. HTML template and JS template must have exact markup parity', () => {
    // Trim whitespace and compare
    expect(addJs).toContain(addHtml.trim());
    expect(window.__casebook_tabs['add']).toBeTruthy();
  });

  it('2. Contains the modernized intake header cockpit with Lucide icons', () => {
    const header = document.querySelector('.intake-header-bar');
    expect(header).not.toBeNull();

    const title = header.querySelector('.intake-title');
    expect(title.textContent).toBe('Register New Case');

    const resetBtn = header.querySelector('.intake-reset-btn');
    expect(resetBtn).not.toBeNull();
  });

  it('3. Renders the interactive category switcher rail with 7 register chips', () => {
    const chips = document.querySelectorAll('.category-chip-btn');
    expect(chips.length).toBe(7);

    const categories = Array.from(chips).map(c => c.getAttribute('data-type'));
    expect(categories).toEqual([
      'civil',
      'state',
      'family',
      'revenue',
      'misc_civil',
      'misc_criminal',
      'complaint'
    ]);

    // Native dropdown exists and is required
    const dropdown = document.getElementById('caseTypeDropdown');
    expect(dropdown).not.toBeNull();
    expect(dropdown.hasAttribute('required')).toBe(true);
  });

  it('4. Renders all 7 statutory form panels with proper IDs', () => {
    const panels = [
      'generalCaseForm',
      'stateCaseForm',
      'familyCaseForm',
      'revenueCaseForm',
      'miscCivilCaseForm',
      'miscCriminalCaseForm',
      'complaintCaseForm'
    ];

    panels.forEach(id => {
      const panel = document.getElementById(id);
      expect(panel, `Panel #${id} should exist`).not.toBeNull();
    });
  });

  it('5. Contains all required inputs, selects, and action buttons for Civil suits', () => {
    expect(document.getElementById('caseNo')).not.toBeNull();
    expect(document.getElementById('caseYear')).not.toBeNull();
    expect(document.getElementById('filingDate')).not.toBeNull();
    expect(document.getElementById('courtName')).not.toBeNull();
    expect(document.getElementById('addCourtBtn')).not.toBeNull();
    expect(document.getElementById('plaintiff')).not.toBeNull();
    expect(document.getElementById('defendant')).not.toBeNull();
    expect(document.getElementById('clientName')).not.toBeNull();
    expect(document.getElementById('clientNumber')).not.toBeNull();
    expect(document.getElementById('caseDocLink')).not.toBeNull();
    expect(document.getElementById('caseRemark')).not.toBeNull();
  });

  it('6. Contains all required inputs for State / Criminal, Family, Revenue, and Complaints', () => {
    // Criminal
    expect(document.getElementById('stateCaseNumber')).not.toBeNull();
    expect(document.getElementById('statePoliceStation')).not.toBeNull();
    expect(document.getElementById('statePoliceStationCustom')).not.toBeNull();
    expect(document.getElementById('addStateCourtBtn')).not.toBeNull();

    // Family
    expect(document.getElementById('familyCaseNumber')).not.toBeNull();
    expect(document.getElementById('familyMatterType')).not.toBeNull();
    expect(document.getElementById('familyMatterTypeCustom')).not.toBeNull();
    expect(document.getElementById('addFamilyCourtBtn')).not.toBeNull();

    // Revenue
    expect(document.getElementById('revenueCaseNumber')).not.toBeNull();
    expect(document.getElementById('revenueActSection')).not.toBeNull();
    expect(document.getElementById('revenueActSectionCustom')).not.toBeNull();
    expect(document.getElementById('addRevenueCourtBtn')).not.toBeNull();

    // Misc Civil
    expect(document.getElementById('miscCivilCaseNumber')).not.toBeNull();
    expect(document.getElementById('miscCivilProceedingType')).not.toBeNull();
    expect(document.getElementById('miscCivilProceedingTypeCustom')).not.toBeNull();
    expect(document.getElementById('addMiscCivilCourtBtn')).not.toBeNull();

    // Misc Criminal
    expect(document.getElementById('miscCriminalCaseNumber')).not.toBeNull();
    expect(document.getElementById('miscCriminalProceedingType')).not.toBeNull();
    expect(document.getElementById('miscCriminalProceedingTypeCustom')).not.toBeNull();
    expect(document.getElementById('addMiscCriminalCourtBtn')).not.toBeNull();

    // Complaint
    expect(document.getElementById('complaintCaseNumber')).not.toBeNull();
    expect(document.getElementById('complaintType')).not.toBeNull();
    expect(document.getElementById('complaintTypeCustom')).not.toBeNull();
    expect(document.getElementById('addComplaintCourtBtn')).not.toBeNull();
  });

  it('7. Lucide Icons Only: Zero iconify-icon tags or non-Lucide icon elements in markup', () => {
    const iconifyTags = document.querySelectorAll('iconify-icon');
    expect(iconifyTags.length).toBe(0);

    const svgs = document.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(15);
    svgs.forEach(svg => {
      expect(svg.classList.contains('lucide')).toBe(true);
      expect(svg.getAttribute('stroke')).toBe('currentColor');
    });
  });

  it('8. Zero hardcoded hex colors in tab-add.css (Strict DESIGN.md Tokens Enforcement)', () => {
    // Match hex colors used in CSS property declarations (e.g., color: #123, background: #ffffff)
    // but not CSS selector IDs like #add
    const hexColorDeclarationRegex = /:\s*#[0-9a-fA-F]{3,8}\b/g;
    const hexMatches = addCss.match(hexColorDeclarationRegex);

    // There should be zero hardcoded hex colors in tab-add.css
    expect(hexMatches, `Found hardcoded hex colors in tab-add.css declarations: ${hexMatches?.join(', ')}`).toBeNull();

    // Scoping check: all top-level selectors must use :is(#add, [data-add-scope])
    expect(addCss).toContain(':is(#add, [data-add-scope])');
  });

  it('9. setAddCaseCategory properly synchronizes category chips with select and attributes', () => {
    expect(typeof window.setAddCaseCategory).toBe('function');

    // Select family
    window.setAddCaseCategory('family');
    const dropdown = document.getElementById('caseTypeDropdown');
    expect(dropdown.value).toBe('family');

    const activeChip = document.querySelector('.category-chip-btn.active');
    expect(activeChip.getAttribute('data-type')).toBe('family');
    expect(activeChip.getAttribute('aria-selected')).toBe('true');
  });

  it('10. Renders modern action footer bar with submit button with btn-glow class', () => {
    const submitBtn = document.querySelector('button[type="submit"]');
    expect(submitBtn).not.toBeNull();
    expect(submitBtn.classList.contains('primary-btn')).toBe(true);
    expect(submitBtn.classList.contains('btn-glow')).toBe(true);
  });
});
