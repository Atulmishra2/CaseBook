import { describe, it, expect, beforeEach } from 'vitest';
import '../admin.js';

describe('Advocate Multi-Theme Engine & Toggle System', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
    document.documentElement.removeAttribute('data-theme');
    if (document.body) {
      document.body.className = '';
      document.body.removeAttribute('data-theme');
    }
  });

  it('initCaseBookTheme should default to dark when no preference is saved', () => {
    window.initCaseBookTheme();

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.classList.contains('theme-midnight')).toBe(true);
    expect(document.documentElement.classList.contains('theme-light')).toBe(false);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('casebook-theme')).toBe('dark');
  });

  it('initCaseBookTheme should respect saved light preference', () => {
    localStorage.setItem('casebook-theme', 'light');
    window.initCaseBookTheme();

    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(document.documentElement.classList.contains('theme-midnight')).toBe(false);
    expect(document.documentElement.classList.contains('theme-light')).toBe(true);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('toggleCaseBookTheme should toggle seamlessly between dark and light modes and keep classes + data-theme in sync', () => {
    // Start in dark
    window.applyCaseBookTheme(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

    // Toggle to light
    window.toggleCaseBookTheme();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(document.documentElement.classList.contains('theme-midnight')).toBe(false);
    expect(document.documentElement.classList.contains('theme-light')).toBe(true);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem('casebook-theme')).toBe('light');

    // Toggle back to dark
    window.toggleCaseBookTheme();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.classList.contains('theme-midnight')).toBe(true);
    expect(document.documentElement.classList.contains('theme-light')).toBe(false);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('casebook-theme')).toBe('dark');
  });
});
