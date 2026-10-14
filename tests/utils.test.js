import { describe, it, expect, beforeAll } from 'vitest';
import '../utils/dateUtils.js';
import '../utils/uiUtils.js';

describe('utils/dateUtils.js', () => {
  it('should define getTodayDateString on window', () => {
    expect(window.getTodayDateString).toBeDefined();
    expect(typeof window.getTodayDateString).toBe('function');
  });

  it('should return date string in YYYY-MM-DD format', () => {
    const today = window.getTodayDateString();
    expect(today).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    const dateObj = new Date(today);
    expect(isNaN(dateObj.getTime())).toBe(false);
  });
});

describe('utils/uiUtils.js', () => {
  it('should format currency correctly in INR format', () => {
    expect(window.formatCurrencyINR).toBeDefined();
    // 1000 => "1,000"
    const formatted = window.formatCurrencyINR(1000);
    expect(formatted.replace(/\s/g, '')).toContain('1,000');

    // 100000 => "1,00,000"
    const formattedLakh = window.formatCurrencyINR(100000);
    expect(formattedLakh.replace(/\s/g, '')).toContain('1,00,000');

    // 0 or invalid => "0"
    expect(window.formatCurrencyINR(0)).toBe('0');
    expect(window.formatCurrencyINR('invalid')).toBe('0');
  });
});
