import { beforeEach, describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import '../utils/dateUtils.js';
import '../components/modals/case-modals.js';

const source = (path) => readFileSync(path, 'utf8');
const admin = source('index.html');
const imports = source('admin.css');
const globalCss = source('components/global-rules.css');
const modalCss = source('styles/components/modals.css');
const customCss = source('styles/custom-user.css');
const buttonSpan = 'button span,\n.btn span,\n.pill span,\n.badge span,\n.chip span,\n.kpi-aesthetic-chip span,\n.kpi-rect-badge span,\n.home-task-manage-btn span';

// Parse the actual declaration block with jsdom's CSSStyleDeclaration. jsdom does
// not resolve var() or implement @layer precedence, so assertions below verify
// token mappings and competing !important declarations rather than pixels.
function declaration(css, selector, property) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s*');
  const block = css.match(new RegExp(`${escaped}(?:\\s*,\\s*[^{}]+)?\\s*\\{([^{}]*)\\}`));
  expect(block, `CSS rule for ${selector}`).not.toBeNull();
  const style = document.createElement('div').style;
  style.cssText = block[1];
  return {
    value: style.getPropertyValue(property).trim(),
    priority: style.getPropertyPriority(property),
  };
}

const value = (css, selector, property) => declaration(css, selector, property).value;
const el = (id) => document.getElementById(id);

describe('forward-date dropdown theme and cascade regressions', () => {
  beforeEach(() => {
    window.ensureCaseModalsMounted();
    window.allCaseRecords = [
      { caseNo: 'C/1', plaintiff: 'Ada', defendant: 'Bea', caseType: 'civil', nextHearing: '2026-12-01' },
      { caseNo: 'CR/2', victimName: 'Rita', accusedName: 'Vic', caseType: 'criminal', nextHearing: '2026-12-02' },
      { caseNo: 'U/3', plaintiff: 'Uma', defendant: 'Dan', caseType: 'civil' },
    ];
    window.openForwardDateModal();
  });

  it('keeps actual modal, global, and user CSS in the app load order', () => {
    expect(imports.indexOf('styles/components/modals.css')).toBeGreaterThan(-1);
    expect(admin.indexOf('admin.css')).toBeLessThan(admin.indexOf('components/global-rules.css'));
    expect(admin.indexOf('components/global-rules.css')).toBeLessThan(admin.indexOf('styles/custom-user.css'));
    expect(value(globalCss, buttonSpan, 'color')).toBe('inherit');
  });

  it('maps the dropdown surface and text to distinct light/dark design tokens', () => {
    const light = ':root,\nhtml.theme-light,\nhtml[data-theme="light"]';
    const dark = 'html.dark,\nhtml[data-theme="dark"]';
    for (const token of ['--cb-surface', '--cb-surface-alt', '--cb-text-main', '--cb-text-muted', '--cb-badge-civil-bg', '--cb-badge-civil-text']) {
      expect(value(globalCss, light, token)).toBeTruthy();
      expect(value(globalCss, dark, token)).toBeTruthy();
      expect(value(globalCss, dark, token)).not.toBe(value(globalCss, light, token));
    }

    for (const [selector, property] of [
      ['#fdModal .fd-combo-wrap', '--fd-combo-surface'],
      ['#fdModal .fd-combo-wrap', '--fd-combo-text'],
      ['#fdModal .fd-combo-input-wrap', 'background'],
      ['#fdModal .fd-combo-dropdown', 'background'],
      ['#fdModal .fd-combo-option', 'color'],
    ]) {
      expect(value(modalCss, selector, property)).toMatch(/var\(--(?:fd-combo-|cb-)/);
    }
    expect(value(modalCss, '#fdModal .fd-combo-wrap', '--fd-combo-surface')).toBe('var(--cb-surface)');
    expect(value(modalCss, '#fdModal .fd-combo-wrap', '--fd-combo-text')).toBe('var(--cb-text-main)');
    expect(value(modalCss, '#fdModal .fd-combo-wrap', '--fd-combo-highlight')).toBe('var(--cb-surface-alt)');
    expect(value(modalCss, '#fdModal .fd-combo-search-wrap', 'background')).toBe('var(--cb-input-bg)');
    expect(value(modalCss, '#fdModal', '--fd-control-focus-border')).toBe('rgba(42, 123, 119, 0.48)');
    expect(value(modalCss, '#fdModal', '--fd-control-focus-ring')).toBe('rgba(42, 123, 119, 0.12)');
    expect(value(modalCss, '#fdModal .fd-combo-input-wrap:focus-visible,\n#fdModal .fd-combo-input-wrap.focused,\n#fdModal .fd-combo-input-wrap.open', 'box-shadow')).toBe('0 0 0 2px var(--fd-control-focus-ring)');
    expect(value(modalCss, '#fdModal .fd-combo-search-wrap:focus-within', 'box-shadow')).toBe('0 0 0 2px var(--fd-control-focus-ring)');
    for (const [token, expected] of [
      ['--fd-scrollbar-track', 'var(--cb-surface-alt)'],
      ['--fd-scrollbar-thumb', 'var(--cb-text-muted)'],
      ['--fd-scrollbar-hover', 'var(--cb-text-secondary)'],
    ]) {
      expect(value(modalCss, '#fdModal', token)).toBe(expected);
    }
    expect(value(modalCss, '#fdModal .fd-modal-body,\n#fdModal .fd-combo-options', 'scrollbar-color')).toMatch(/var\(--fd-scrollbar-thumb\).*var\(--fd-scrollbar-track\)/);
  });

  it('protects option span text and badge colors from the global button span !important rule', () => {
    const options = [...document.querySelectorAll('#fdComboOptions button.fd-combo-option')];
    expect(options).toHaveLength(3);
    expect(declaration(globalCss, buttonSpan, 'color').priority).toBe('important');
    for (const name of ['fd-co-title', 'fd-co-sub', 'fd-co-badge', 'fd-co-icon']) {
      expect(options[0].querySelector(`span.${name}`)).not.toBeNull();
      const rule = declaration(modalCss, `#fdModal .${name}`, 'color');
      expect(rule.value).toMatch(/var\(--/);
      expect(rule.value).not.toBe('inherit');
      expect(rule.priority).toBe('important');
    }
    expect(options.find((option) => option.textContent.includes('U/3')).querySelector('.fd-co-badge').classList.contains('undated')).toBe(true);
    const undated = declaration(modalCss, '#fdModal .fd-co-badge.undated', 'color');
    expect(undated.value).toMatch(/var\(--/);
    expect(undated.priority).toBe('important');
  });

  it('uses theme-aware category badge fills and readable semantic text for civil and criminal cases', () => {
    const badges = [...document.querySelectorAll('#fdComboOptions .fd-co-badge')];
    const civil = badges.find((badge) => badge.textContent.toLowerCase() === 'civil');
    const criminal = badges.find((badge) => badge.textContent.toLowerCase() === 'criminal');
    expect(civil?.dataset.caseType).toBe('civil');
    expect(criminal?.dataset.caseType).toBe('criminal');
    for (const category of ['civil', 'criminal']) {
      const selector = `#fdModal .fd-co-badge[data-case-type="${category}"]`;
      expect(value(modalCss, selector, 'background')).toBe(`var(--cb-badge-${category}-bg)`);
      expect(declaration(modalCss, selector, 'color')).toEqual({
        value: `var(--cb-badge-${category}-text)`,
        priority: 'important',
      });
      const light = ':root,\nhtml.theme-light,\nhtml[data-theme="light"]';
      const dark = 'html.dark,\nhtml[data-theme="dark"]';
      for (const suffix of ['bg', 'text']) {
        const token = `--cb-badge-${category}-${suffix}`;
        expect(value(globalCss, dark, token)).not.toBe(value(globalCss, light, token));
      }
    }
    expect(value(modalCss, '#fdModal .fd-co-badge', 'background')).not.toContain('--warning-bg');
  });

  it('gives the search wrapper the focus ring, while suppressing the input glow inside user-custom layer', () => {
    const input = el('fdComboInput');
    const wrapper = input.closest('.fd-combo-search-wrap');
    expect(wrapper).not.toBeNull();
    expect(value(modalCss, '#fdModal .fd-combo-search-wrap:focus-within', 'box-shadow')).toMatch(/var\(--/);

    const layerStart = customCss.indexOf('@layer user-custom {');
    expect(layerStart).toBeGreaterThan(-1);
    const layer = customCss.slice(layerStart, customCss.lastIndexOf('}'));
    expect(declaration(layer, 'input:focus,\n  select:focus,\n  textarea:focus', 'box-shadow').priority).toBe('important');
    for (const cssProperty of ['border-style', 'outline', 'box-shadow']) {
      const reset = declaration(layer, '#fdModal .fd-combo-search-wrap #fdComboInput:focus', cssProperty);
      expect(reset.priority).toBe('important');
      expect(reset.value).toBe('none');
    }
    expect(customCss.lastIndexOf('#fdComboInput:focus')).toBeLessThan(customCss.lastIndexOf('}'));
  });
});
