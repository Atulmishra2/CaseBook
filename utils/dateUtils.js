// CaseBook Central Date Engine (utils/dateUtils.js)
// Single source of truth for canonical date normalization, parsing, and formatting.

(function (global) {
  'use strict';

  var root = typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : global);
  root.dateUtils = root.dateUtils || {};

  /**
   * Returns current local device date string in standard ISO 'YYYY-MM-DD' format.
   * Avoids UTC timezone drift caused by toISOString() in IST (+05:30).
   * @returns {string} e.g. "2026-11-23"
   */
  function getTodayDateString() {
    var d = new Date();
    var year = d.getFullYear();
    var month = String(d.getMonth() + 1).padStart(2, '0');
    var day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Formats any date-like input to British/Indian user display format: 'DD/MM/YYYY'.
   * Handles ISO timestamps, YYYY-MM-DD, DD-MM-YYYY, and Date objects.
   * @param {*} dateInput 
   * @returns {string} e.g. "23/11/2026" or "—" for empty/null values.
   */
  function formatDateDMY(dateInput) {
    if (!dateInput || dateInput === '—' || dateInput === 'null' || dateInput === 'undefined') {
      return '—';
    }

    var str = String(dateInput).trim();
    if (!str || str === '—') return '—';

    // If already in DD/MM/YYYY or DD-MM-YYYY format
    var dmyMatch = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
    if (dmyMatch) {
      var day = dmyMatch[1].padStart(2, '0');
      var month = dmyMatch[2].padStart(2, '0');
      var year = dmyMatch[3];
      return `${day}/${month}/${year}`;
    }

    // If in YYYY-MM-DD format (or ISO string with time e.g. 2026-11-23T10:00:00Z)
    var ymdMatch = str.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/);
    if (ymdMatch) {
      var year = ymdMatch[1];
      var month = ymdMatch[2].padStart(2, '0');
      var day = ymdMatch[3].padStart(2, '0');
      return `${day}/${month}/${year}`;
    }

    // Otherwise try Date constructor
    var d = new Date(str);
    if (!isNaN(d.getTime())) {
      var day = String(d.getDate()).padStart(2, '0');
      var month = String(d.getMonth() + 1).padStart(2, '0');
      var year = d.getFullYear();
      return `${day}/${month}/${year}`;
    }

    return str;
  }

  /**
   * Normalizes any date-like input to canonical 'YYYY-MM-DD' ISO format.
   * Returns null if unparseable or empty.
   * Essential for strict equality checks and database operations.
   * @param {*} dateInput 
   * @returns {string|null} e.g. "2026-11-23" or null
   */
  function toISODate(dateInput) {
    if (dateInput === null || dateInput === undefined) return null;
    var str = String(dateInput).trim();
    if (!str || str === '—' || str === 'null' || str === 'undefined' || str.toLowerCase() === 'undated') return null;

    var ymdMatch = str.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/);
    if (ymdMatch) {
      return `${ymdMatch[1]}-${ymdMatch[2].padStart(2, '0')}-${ymdMatch[3].padStart(2, '0')}`;
    }

    var dmyMatch = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
    if (dmyMatch) {
      return `${dmyMatch[3]}-${dmyMatch[2].padStart(2, '0')}-${dmyMatch[1].padStart(2, '0')}`;
    }

    var d = new Date(str);
    if (!isNaN(d.getTime())) {
      var yyyy = d.getFullYear();
      var mm = String(d.getMonth() + 1).padStart(2, '0');
      var dd = String(d.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    }
    return null;
  }

  /**
   * Parses date string cleanly into local midnight Date object without UTC drift.
   * @param {*} dateInput 
   * @returns {Date|null}
   */
  function parseDateString(dateInput) {
    if (!dateInput || dateInput === '—' || dateInput === 'null' || dateInput === 'undefined') return null;
    var str = String(dateInput).trim();
    var ymdMatch = str.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/);
    if (ymdMatch) {
      return new Date(parseInt(ymdMatch[1], 10), parseInt(ymdMatch[2], 10) - 1, parseInt(ymdMatch[3], 10));
    }
    var dmyMatch = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
    if (dmyMatch) {
      return new Date(parseInt(dmyMatch[3], 10), parseInt(dmyMatch[2], 10) - 1, parseInt(dmyMatch[1], 10));
    }
    var d = new Date(str);
    return isNaN(d.getTime()) ? null : new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  /**
   * Formats a date string into standard judicial header display (e.g. "Thu, 05 Nov 2026")
   * @param {string} dateStr 
   * @returns {string}
   */
  function formatNiceDate(dateStr) {
    if (!dateStr) return '';
    var iso = toISODate(dateStr);
    if (!iso) return String(dateStr);
    var parts = iso.split('-');
    var dt = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    return dt.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  /**
   * Formats any date-like input to visual format: 'DD Month YYYY' (e.g. "23 November 2026" or "23 Nov 2026").
   * @param {*} dateInput 
   * @param {boolean} [isLong=false] If true, full month name ("November"), else short month ("Nov")
   * @returns {string} e.g. "23 Nov 2026" or "23 November 2026" (or "—" if empty)
   */
  function formatDateMonth(dateInput, isLong) {
    if (!dateInput || dateInput === '—' || dateInput === 'null' || dateInput === 'undefined') {
      return '—';
    }
    var iso = toISODate(dateInput);
    if (!iso) return String(dateInput);
    var parts = iso.split('-');
    var dt = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    if (isNaN(dt.getTime())) return String(dateInput);
    return dt.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: isLong ? 'long' : 'short',
      year: 'numeric'
    });
  }

  /**
   * Formats a date into Hindi Devanagari text for WhatsApp Client Notices (e.g. "15 नवम्बर 2026").
   * @param {*} dateInput 
   * @returns {string}
   */
  function formatDateHindi(dateInput) {
    if (!dateInput || dateInput === '—' || dateInput === 'null' || dateInput === 'undefined') {
      return 'तय नहीं';
    }

    var str = String(dateInput).trim();
    if (!str || str === '—' || str.toLowerCase() === 'undated') return 'तय नहीं';

    var hindiMonths = [
      'जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून',
      'जुलाई', 'अगस्त', 'सितम्बर', 'अक्टूबर', 'नवम्बर', 'दिसम्बर'
    ];

    var dmyMatch = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
    if (dmyMatch) {
      var day = parseInt(dmyMatch[1], 10);
      var monthIdx = parseInt(dmyMatch[2], 10) - 1;
      var year = dmyMatch[3];
      if (monthIdx >= 0 && monthIdx < 12) {
        return `${day} ${hindiMonths[monthIdx]} ${year}`;
      }
      return `${day}/${dmyMatch[2]}/${year}`;
    }

    var ymdMatch = str.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/);
    if (ymdMatch) {
      var year = ymdMatch[1];
      var monthIdx = parseInt(ymdMatch[2], 10) - 1;
      var day = parseInt(ymdMatch[3], 10);
      if (monthIdx >= 0 && monthIdx < 12) {
        return `${day} ${hindiMonths[monthIdx]} ${year}`;
      }
      return `${day}/${ymdMatch[2]}/${year}`;
    }

    var d = new Date(str);
    if (!isNaN(d.getTime())) {
      var day = d.getDate();
      var monthIdx = d.getMonth();
      var year = d.getFullYear();
      if (monthIdx >= 0 && monthIdx < 12) {
        return `${day} ${hindiMonths[monthIdx]} ${year}`;
      }
    }

    return str;
  }

  // Export onto dateUtils namespace
  root.dateUtils.getTodayDateString = getTodayDateString;
  root.dateUtils.formatDateDMY = formatDateDMY;
  root.dateUtils.formatDateMonth = formatDateMonth;
  root.dateUtils.toISODate = toISODate;
  root.dateUtils.parseDateString = parseDateString;
  root.dateUtils.formatNiceDate = formatNiceDate;
  root.dateUtils.formatDateHindi = formatDateHindi;

  // Export to global scope for 100% backward compatibility
  root.getTodayDateString = getTodayDateString;
  root.formatDateDMY = formatDateDMY;
  root.formatDateMonth = formatDateMonth;
  root.toISODate = toISODate;
  root.parseDateString = parseDateString;
  root.formatNiceDate = formatNiceDate;
  root.formatDateHindi = formatDateHindi;

  // Support Node/CommonJS environments for Vitest
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      getTodayDateString: getTodayDateString,
      formatDateDMY: formatDateDMY,
      formatDateMonth: formatDateMonth,
      toISODate: toISODate,
      parseDateString: parseDateString,
      formatNiceDate: formatNiceDate,
      formatDateHindi: formatDateHindi
    };
  }
})(typeof window !== 'undefined' ? window : global);
