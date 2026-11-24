import { describe, it, expect, vi } from 'vitest';
import '../utils/dateUtils.js';
import '../utils/uiUtils.js';

describe('utils/dateUtils.js - Master Central Date Engine Suite', () => {
  it('should define all core date helpers on window and dateUtils namespace', () => {
    expect(window.getTodayDateString).toBeDefined();
    expect(window.formatDateDMY).toBeDefined();
    expect(window.toISODate).toBeDefined();
    expect(window.parseDateString).toBeDefined();
    expect(window.formatNiceDate).toBeDefined();
    expect(window.formatDateHindi).toBeDefined();

    expect(window.dateUtils.getTodayDateString).toBe(window.getTodayDateString);
    expect(window.dateUtils.formatDateDMY).toBe(window.formatDateDMY);
    expect(window.dateUtils.toISODate).toBe(window.toISODate);
    expect(window.dateUtils.parseDateString).toBe(window.parseDateString);
    expect(window.dateUtils.formatNiceDate).toBe(window.formatNiceDate);
    expect(window.dateUtils.formatDateHindi).toBe(window.formatDateHindi);
  });

  describe('getTodayDateString()', () => {
    it('returns local date string in YYYY-MM-DD format', () => {
      const today = window.getTodayDateString();
      expect(today).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      const parts = today.split('-');
      expect(parts[0].length).toBe(4);
      expect(parts[1].length).toBe(2);
      expect(parts[2].length).toBe(2);
    });

    it('faithfully preserves local calendar day even when UTC date is yesterday (IST midnight condition)', () => {
      // Mock local system time: 2026-11-24 01:15:00 IST (UTC: 2026-11-23 19:45:00)
      const mockLocalDate = new Date(2026, 10, 24, 1, 15, 0); // month 10 = November
      vi.spyOn(global, 'Date').mockImplementation(function (...args) {
        if (args.length === 0) return mockLocalDate;
        // @ts-ignore
        return new (Function.prototype.bind.apply(Date, [null, ...args]))();
      });

      const result = window.getTodayDateString();
      expect(result).toBe('2026-11-24');

      vi.restoreAllMocks();
    });
  });

  describe('formatDateDMY()', () => {
    it('formats ISO YYYY-MM-DD to DD/MM/YYYY', () => {
      expect(window.formatDateDMY('2026-11-23')).toBe('23/11/2026');
      expect(window.formatDateDMY('2026-05-09')).toBe('09/05/2026');
    });

    it('formats ISO timestamps with time component correctly', () => {
      expect(window.formatDateDMY('2026-11-23T16:30:00Z')).toBe('23/11/2026');
      expect(window.formatDateDMY('2026-01-05T00:00:00.000Z')).toBe('05/01/2026');
    });

    it('normalizes existing DD/MM/YYYY and DD-MM-YYYY strings with 2-digit padding', () => {
      expect(window.formatDateDMY('5/9/2026')).toBe('05/09/2026');
      expect(window.formatDateDMY('15-09-2026')).toBe('15/09/2026');
      expect(window.formatDateDMY('1/1/2026')).toBe('01/01/2026');
    });

    it('safely handles empty, null, undefined, and sentinel placeholder values', () => {
      expect(window.formatDateDMY(null)).toBe('—');
      expect(window.formatDateDMY(undefined)).toBe('—');
      expect(window.formatDateDMY('')).toBe('—');
      expect(window.formatDateDMY('—')).toBe('—');
      expect(window.formatDateDMY('null')).toBe('—');
      expect(window.formatDateDMY('undefined')).toBe('—');
    });
  });

  describe('toISODate()', () => {
    it('normalizes YYYY-MM-DD string cleanly', () => {
      expect(window.toISODate('2026-11-23')).toBe('2026-11-23');
      expect(window.toISODate('2026/11/23')).toBe('2026-11-23');
    });

    it('normalizes DD/MM/YYYY and DD-MM-YYYY to YYYY-MM-DD', () => {
      expect(window.toISODate('23/11/2026')).toBe('2026-11-23');
      expect(window.toISODate('5-9-2026')).toBe('2026-09-05');
      expect(window.toISODate('05/09/2026')).toBe('2026-09-05');
    });

    it('normalizes Date instances to YYYY-MM-DD', () => {
      const dt = new Date(2026, 10, 23);
      expect(window.toISODate(dt)).toBe('2026-11-23');
    });

    it('returns null for empty, undated, and invalid values', () => {
      expect(window.toISODate(null)).toBeNull();
      expect(window.toISODate(undefined)).toBeNull();
      expect(window.toISODate('')).toBeNull();
      expect(window.toISODate('—')).toBeNull();
      expect(window.toISODate('undated')).toBeNull();
      expect(window.toISODate('Undated')).toBeNull();
      expect(window.toISODate('invalid_date')).toBeNull();
    });
  });

  describe('parseDateString()', () => {
    it('parses YYYY-MM-DD into a local midnight Date object without timezone drift', () => {
      const dt = window.parseDateString('2026-11-23');
      expect(dt).toBeInstanceOf(Date);
      expect(dt.getFullYear()).toBe(2026);
      expect(dt.getMonth()).toBe(10);
      expect(dt.getDate()).toBe(23);
      expect(dt.getHours()).toBe(0);
      expect(dt.getMinutes()).toBe(0);
    });

    it('parses DD/MM/YYYY into local midnight Date object', () => {
      const dt = window.parseDateString('23/11/2026');
      expect(dt).toBeInstanceOf(Date);
      expect(dt.getFullYear()).toBe(2026);
      expect(dt.getMonth()).toBe(10);
      expect(dt.getDate()).toBe(23);
    });

    it('returns null on empty, invalid, or sentinel values', () => {
      expect(window.parseDateString(null)).toBeNull();
      expect(window.parseDateString('—')).toBeNull();
      expect(window.parseDateString('not-a-date')).toBeNull();
    });
  });

  describe('formatNiceDate()', () => {
    it('formats ISO date to judicial header short text in en-GB style', () => {
      // 2026-11-23 is Monday
      const nice = window.formatNiceDate('2026-11-23');
      expect(nice).toMatch(/Mon,\s*23\s*Nov\s*2026/);
    });

    it('handles DD/MM/YYYY input seamlessly', () => {
      const nice = window.formatNiceDate('23/11/2026');
      expect(nice).toMatch(/Mon,\s*23\s*Nov\s*2026/);
    });

    it('handles empty input gracefully', () => {
      expect(window.formatNiceDate('')).toBe('');
      expect(window.formatNiceDate(null)).toBe('');
    });
  });

  describe('formatDateMonth()', () => {
    it('formats date to "DD Month YYYY" with short month by default', () => {
      expect(window.formatDateMonth('2026-11-23')).toMatch(/23\s*Nov\s*2026/);
      expect(window.formatDateMonth('23/11/2026')).toMatch(/23\s*Nov\s*2026/);
    });

    it('formats date to "DD Month YYYY" with long month when isLong is true', () => {
      expect(window.formatDateMonth('2026-11-23', true)).toMatch(/23\s*November\s*2026/);
      expect(window.formatDateMonth('15/09/2026', true)).toMatch(/15\s*September\s*2026/);
    });

    it('handles null, undefined, empty, and sentinel values gracefully', () => {
      expect(window.formatDateMonth(null)).toBe('—');
      expect(window.formatDateMonth('')).toBe('—');
      expect(window.formatDateMonth('—')).toBe('—');
    });
  });

  describe('formatDateHindi()', () => {
    it('formats date to Hindi Devanagari month string for client WhatsApp notices', () => {
      expect(window.formatDateHindi('2026-11-23')).toBe('23 नवम्बर 2026');
      expect(window.formatDateHindi('15/09/2026')).toBe('15 सितम्बर 2026');
      expect(window.formatDateHindi('01-01-2026')).toBe('1 जनवरी 2026');
    });

    it('returns "तय नहीं" when date is undated or null', () => {
      expect(window.formatDateHindi(null)).toBe('तय नहीं');
      expect(window.formatDateHindi('')).toBe('तय नहीं');
      expect(window.formatDateHindi('—')).toBe('तय नहीं');
      expect(window.formatDateHindi('undated')).toBe('तय नहीं');
    });
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
