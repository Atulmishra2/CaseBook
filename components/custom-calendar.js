/**
 * CaseBook Reusable Custom Calendar Component
 * -------------------------------------------------------------
 * Ultra-crisp, accessible calendar component featuring custom-styled
 * Month & Year dropdowns, smooth animations, and full keyboard navigation.
 *
 * Adheres strictly to CaseBook UI Rules:
 *  1. Uniform Design: Integrates with tokens.css & light/dark theme structure.
 *  2. Lucide Icons Only: Exclusively renders Lucide SVG iconography.
 *  3. Strict Isolation: Strictly scoped selectors with zero cross-tab bleeding.
 *
 * Usage Options:
 * 1. Web Component:
 *    <custom-calendar value="2026-11-14" theme="gold"></custom-calendar>
 *
 * 2. HTML placeholder with attribute:
 *    <div data-custom-calendar data-value="2026-11-14"></div>
 *
 * 3. Programmatic Class:
 *    const cal = new CustomCalendar('#my-container', {
 *      value: '2026-11-14',
 *      theme: 'gold', // 'gold' | 'indigo' | 'brand'
 *      onSelect: (date, dateStr) => console.log(dateStr)
 *    });
 *
 * 4. Datepicker attachment to any input:
 *    CustomCalendar.attachToInput('#filingDate', { theme: 'gold' });
 *
 * 5. Universal Datepicker Synchronization (All input[type="date"] across app):
 *    CustomCalendar.syncAllDatePickers();
 */

(function (root, factory) {
  const instance = factory();
  if (typeof root !== 'undefined') {
    root.CustomCalendar = instance;
  }
  if (typeof window !== 'undefined') {
    window.CustomCalendar = instance;
  }
  if (typeof module === 'object' && module.exports) {
    module.exports = instance;
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* ─────────────────────────────────────────────────────────────
     LUCIDE ICONS (Strictly Lucide SVG Paths)
     ───────────────────────────────────────────────────────────── */
  const LUCIDE_ICONS = {
    chevronLeft: `
      <svg class="lucide lucide-chevron-left" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="m15 18-6-6 6-6"/>
      </svg>
    `.trim(),

    chevronRight: `
      <svg class="lucide lucide-chevron-right" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="m9 18 6-6-6-6"/>
      </svg>
    `.trim(),

    chevronDown: `
      <svg class="lucide lucide-chevron-down cb-dd-chevron" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="m6 9 6 6 6-6"/>
      </svg>
    `.trim(),

    check: `
      <svg class="lucide lucide-check cb-dd-check" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M20 6 9 17l-5-5"/>
      </svg>
    `.trim(),

    calendar: `
      <svg class="lucide lucide-calendar" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>
      </svg>
    `.trim(),

    x: `
      <svg class="lucide lucide-x" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
      </svg>
    `.trim()
  };

  const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  /* Helper to format Date into YYYY-MM-DD */
  function formatDateToISO(d) {
    if (!d || isNaN(d.getTime())) return '';
    if (typeof window !== 'undefined' && typeof window.toISODate === 'function') {
      const iso = window.toISODate(d);
      if (iso) return iso;
    }
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /* Helper to parse YYYY-MM-DD or Date object */
  function parseDateInput(val) {
    if (!val) return null;
    if (val instanceof Date && !isNaN(val.getTime())) {
      const copy = new Date(val);
      copy.setHours(0, 0, 0, 0);
      return copy;
    }
    if (typeof window !== 'undefined' && typeof window.parseDateString === 'function') {
      const parsed = window.parseDateString(val);
      if (parsed) return parsed;
    }
    if (typeof val === 'string') {
      const match = val.trim().match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
      if (match) {
        const year = parseInt(match[1], 10);
        const month = parseInt(match[2], 10) - 1;
        const day = parseInt(match[3], 10);
        const d = new Date(year, month, day);
        d.setHours(0, 0, 0, 0);
        if (!isNaN(d.getTime())) return d;
      }
      const parsed = new Date(val);
      if (!isNaN(parsed.getTime())) {
        parsed.setHours(0, 0, 0, 0);
        return parsed;
      }
    }
    return null;
  }

  const isSameDay = (a, b) =>
    a && b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  /* ─────────────────────────────────────────────────────────────
     DROPDOWN CONTROLLER
     ───────────────────────────────────────────────────────────── */
  function createDropdown({ root, items, initial, onChange }) {
    const trigger = root.querySelector('.cb-dd-trigger');
    const labelEl = root.querySelector('.cb-dd-label');
    const panel = root.querySelector('.cb-dd-panel');

    const opts = [];
    let index = Math.max(0, items.findIndex(it => it.value === initial));
    let active = -1;
    let isOpen = false;

    panel.innerHTML = '';
    items.forEach((item, i) => {
      const el = document.createElement('div');
      el.className = 'cb-dd-option';
      el.setAttribute('role', 'option');
      el.innerHTML = `<span class="cb-dd-opt-text"></span>${LUCIDE_ICONS.check}`;
      el.querySelector('.cb-dd-opt-text').textContent = item.label;

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        select(i);
      });
      el.addEventListener('mouseenter', () => setActive(i, false));

      panel.appendChild(el);
      opts.push(el);
    });

    function updateUI() {
      labelEl.textContent = items[index] ? items[index].label : '';
      opts.forEach((el, i) => {
        const on = i === index;
        el.classList.toggle('selected', on);
        el.setAttribute('aria-selected', on ? 'true' : 'false');
      });
    }

    function setActive(i, scroll) {
      if (active > -1 && opts[active]) opts[active].classList.remove('active');
      active = i;
      if (i > -1 && opts[i]) {
        opts[i].classList.add('active');
        if (scroll) scrollToOpt(i);
      }
    }

    function scrollToOpt(i) {
      const el = opts[i];
      if (!el) return;
      panel.scrollTop = el.offsetTop - panel.clientHeight / 2 + el.offsetHeight / 2;
    }

    function open() {
      if (isOpen) return;
      isOpen = true;
      root.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
      setActive(index, false);
      requestAnimationFrame(() => scrollToOpt(index));
    }

    function close() {
      if (!isOpen) return;
      isOpen = false;
      root.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
      setActive(-1, false);
    }

    function select(i) {
      index = i;
      updateUI();
      close();
      trigger.focus();
      if (typeof onChange === 'function') {
        onChange(items[i].value);
      }
    }

    function move(delta) {
      let next = active + delta;
      if (next < 0) next = 0;
      if (next > opts.length - 1) next = opts.length - 1;
      setActive(next, true);
    }

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      isOpen ? close() : open();
    });

    panel.addEventListener('mousedown', (e) => e.preventDefault());

    root.addEventListener('keydown', (e) => {
      if (!isOpen) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault();
          open();
        }
        return;
      }
      switch (e.key) {
        case 'ArrowDown': e.preventDefault(); move(1); break;
        case 'ArrowUp':   e.preventDefault(); move(-1); break;
        case 'Home':      e.preventDefault(); setActive(0, true); break;
        case 'End':       e.preventDefault(); setActive(opts.length - 1, true); break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (active > -1) select(active);
          else close();
          break;
        case 'Escape':
          e.preventDefault();
          close();
          trigger.focus();
          break;
        case 'Tab':
          close();
          break;
      }
    });

    const onPointerDown = (e) => {
      if (isOpen && !root.contains(e.target)) close();
    };
    document.addEventListener('pointerdown', onPointerDown);

    updateUI();

    return {
      get value() { return items[index] ? items[index].value : null; },
      setValue(v, emit = false) {
        const i = items.findIndex(it => it.value === v);
        if (i < 0) return;
        index = i;
        updateUI();
        if (emit && typeof onChange === 'function') onChange(v);
      },
      open,
      close,
      destroy() {
        document.removeEventListener('pointerdown', onPointerDown);
      }
    };
  }

  /* ─────────────────────────────────────────────────────────────
     CORE CALENDAR CLASS
     ───────────────────────────────────────────────────────────── */
  class CustomCalendar {
    /**
     * @param {HTMLElement|string} target - Container element or selector
     * @param {Object} options - Configuration options
     */
    constructor(target, options = {}) {
      this.container = typeof target === 'string' ? document.querySelector(target) : target;
      if (!this.container) {
        throw new Error(`[CustomCalendar] Target container '${target}' not found.`);
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      this.today = today;

      this.options = Object.assign({
        value: today,
        minYear: today.getFullYear() - 80,
        maxYear: today.getFullYear() + 20,
        theme: 'accent', // 'accent' | 'gold' | 'indigo' | 'brand'
        showFooter: true,
        showTodayBtn: true,
        showClearBtn: false,
        onSelect: null,
        onChange: null,
        onClear: null
      }, options);

      const parsed = parseDateInput(this.options.value);
      this.selected = parsed || null;
      const refDate = this.selected || this.today;
      this.viewYear = refDate.getFullYear();
      this.viewMonth = refDate.getMonth();

      this.listeners = {};
      this.buildDOM();
      this.initDropdowns();
      this.attachEvents();
      this.render();
    }

    buildDOM() {
      const themeAttr = this.options.theme ? ` data-theme="${this.options.theme}"` : '';

      this.container.innerHTML = `
        <div class="cb-custom-calendar"${themeAttr} role="application" aria-label="Calendar">
          <div class="cb-cal-header">
            <button type="button" class="cb-cal-nav-btn" data-action="prev" aria-label="Previous month" title="Previous month">
              ${LUCIDE_ICONS.chevronLeft}
            </button>

            <div class="cb-cal-selectors">
              <!-- Month dropdown -->
              <div class="cb-cal-dropdown cb-cal-dd-month cb-cal-dd-grow grow" data-dd="month">
                <button type="button" class="cb-dd-trigger" aria-haspopup="listbox" aria-expanded="false" aria-label="Select month">
                  <span class="cb-dd-label"></span>
                  ${LUCIDE_ICONS.chevronDown}
                </button>
                <div class="cb-dd-panel" role="listbox" aria-label="Select month"></div>
              </div>

              <!-- Year dropdown -->
              <div class="cb-cal-dropdown cb-cal-dd-year cb-cal-dd-fixed fixed" data-dd="year">
                <button type="button" class="cb-dd-trigger" aria-haspopup="listbox" aria-expanded="false" aria-label="Select year">
                  <span class="cb-dd-label"></span>
                  ${LUCIDE_ICONS.chevronDown}
                </button>
                <div class="cb-dd-panel" role="listbox" aria-label="Select year"></div>
              </div>
            </div>

            <button type="button" class="cb-cal-nav-btn" data-action="next" aria-label="Next month" title="Next month">
              ${LUCIDE_ICONS.chevronRight}
            </button>
          </div>

          <div class="cb-cal-weekdays" aria-hidden="true">
            ${WEEKDAYS.map(w => `<span>${w}</span>`).join('')}
          </div>

          <div class="cb-cal-days"></div>

          ${this.options.showFooter ? `
            <div class="cb-cal-footer">
              <div class="cb-cal-footer-actions">
                ${this.options.showTodayBtn ? `
                  <button type="button" class="cb-cal-today-btn" data-action="today">
                    ${LUCIDE_ICONS.calendar}
                    <span>Today</span>
                  </button>
                ` : ''}
                ${this.options.showClearBtn ? `
                  <button type="button" class="cb-cal-clear-btn" data-action="clear">
                    ${LUCIDE_ICONS.x}
                    <span>Clear</span>
                  </button>
                ` : ''}
              </div>
              <span class="cb-cal-selected-info"></span>
            </div>
          ` : ''}
        </div>
      `;

      this.calEl = this.container.querySelector('.cb-custom-calendar');
      this.daysEl = this.container.querySelector('.cb-cal-days');
      this.infoEl = this.container.querySelector('.cb-cal-selected-info');
      this.prevBtn = this.container.querySelector('[data-action="prev"]');
      this.nextBtn = this.container.querySelector('[data-action="next"]');
      this.todayBtn = this.container.querySelector('[data-action="today"]');
      this.clearBtn = this.container.querySelector('[data-action="clear"]');
      this.monthDDEl = this.container.querySelector('[data-dd="month"]');
      this.yearDDEl = this.container.querySelector('[data-dd="year"]');
    }

    initDropdowns() {
      // Month dropdown
      this.monthDD = createDropdown({
        root: this.monthDDEl,
        items: MONTHS.map((label, value) => ({ value, label })),
        initial: this.viewMonth,
        onChange: (v) => {
          this.viewMonth = v;
          this.render();
        }
      });

      // Year dropdown
      const yearItems = [];
      for (let y = this.options.minYear; y <= this.options.maxYear; y++) {
        yearItems.push({ value: y, label: String(y) });
      }

      this.yearDD = createDropdown({
        root: this.yearDDEl,
        items: yearItems,
        initial: this.viewYear,
        onChange: (v) => {
          this.viewYear = v;
          this.render();
        }
      });
    }

    attachEvents() {
      this._onPrevClick = () => this.shiftMonth(-1);
      this._onNextClick = () => this.shiftMonth(1);

      this.prevBtn.addEventListener('click', this._onPrevClick);
      this.nextBtn.addEventListener('click', this._onNextClick);

      if (this.todayBtn) {
        this._onTodayClick = () => this.goToToday();
        this.todayBtn.addEventListener('click', this._onTodayClick);
      }

      if (this.clearBtn) {
        this._onClearClick = () => this.clearDate(true);
        this.clearBtn.addEventListener('click', this._onClearClick);
      }

      this._onDaysClick = (e) => {
        const btn = e.target.closest('.cb-cal-day[data-day]');
        if (!btn || btn.disabled) return;
        const day = Number(btn.dataset.day);
        this.selectDate(new Date(this.viewYear, this.viewMonth, day));
      };
      this.daysEl.addEventListener('click', this._onDaysClick);
    }

    render() {
      this.monthDD.setValue(this.viewMonth);
      this.yearDD.setValue(this.viewYear);

      const firstWeekday = new Date(this.viewYear, this.viewMonth, 1).getDay();
      const daysInMonth = new Date(this.viewYear, this.viewMonth + 1, 0).getDate();
      const daysInPrev = new Date(this.viewYear, this.viewMonth, 0).getDate();

      let html = '';

      // Leading overflow days from previous month
      for (let i = firstWeekday - 1; i >= 0; i--) {
        html += `<button type="button" class="cb-cal-day other" tabindex="-1" disabled>${daysInPrev - i}</button>`;
      }

      // Days of the active month
      for (let d = 1; d <= daysInMonth; d++) {
        const cur = new Date(this.viewYear, this.viewMonth, d);
        cur.setHours(0, 0, 0, 0);

        const isToday = isSameDay(cur, this.today);
        const isSel = this.selected && isSameDay(cur, this.selected);

        const cls = ['cb-cal-day'];
        if (isToday) cls.push('today');
        if (isSel) cls.push('selected');

        const label = cur.toLocaleDateString('en-GB', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });

        html += `<button type="button" class="${cls.join(' ')}" data-day="${d}" aria-label="${label}" aria-pressed="${isSel}">${d}</button>`;
      }

      // Trailing overflow days from next month
      const trailing = (7 - ((firstWeekday + daysInMonth) % 7)) % 7;
      for (let i = 1; i <= trailing; i++) {
        html += `<button type="button" class="cb-cal-day other" tabindex="-1" disabled>${i}</button>`;
      }

      this.daysEl.innerHTML = html;
      this.daysEl.classList.remove('anim');
      void this.daysEl.offsetWidth; // Force reflow for animation restart
      this.daysEl.classList.add('anim');

      if (this.infoEl) {
        if (this.selected) {
          this.infoEl.textContent = this.selected.toLocaleDateString('en-GB', {
            weekday: 'short',
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          });
        } else {
          this.infoEl.textContent = 'No date selected';
        }
      }
    }

    shiftMonth(delta) {
      let m = this.viewMonth + delta;
      let y = this.viewYear;
      if (m < 0) {
        m = 11;
        y--;
      } else if (m > 11) {
        m = 0;
        y++;
      }
      if (y < this.options.minYear || y > this.options.maxYear) return;
      this.viewMonth = m;
      this.viewYear = y;
      this.render();
      this.emit('month-change', { year: this.viewYear, month: this.viewMonth });
    }

    selectDate(date, emit = true) {
      if (!date) {
        this.clearDate(emit);
        return;
      }
      this.selected = new Date(date);
      this.selected.setHours(0, 0, 0, 0);
      this.viewYear = this.selected.getFullYear();
      this.viewMonth = this.selected.getMonth();
      this.render();

      if (emit) {
        const isoString = formatDateToISO(this.selected);
        const detail = {
          date: this.selected,
          value: isoString,
          formatted: isoString,
          year: this.selected.getFullYear(),
          month: this.selected.getMonth() + 1,
          day: this.selected.getDate()
        };

        if (typeof this.options.onSelect === 'function') {
          this.options.onSelect(this.selected, isoString, detail);
        }
        if (typeof this.options.onChange === 'function') {
          this.options.onChange(this.selected, isoString, detail);
        }

        this.emit('select', detail);
        this.emit('change', detail);
      }
    }

    clearDate(emit = true) {
      this.selected = null;
      this.render();

      if (emit) {
        const detail = { date: null, value: '', formatted: '', year: null, month: null, day: null };
        if (typeof this.options.onClear === 'function') {
          this.options.onClear();
        }
        if (typeof this.options.onSelect === 'function') {
          this.options.onSelect(null, '', detail);
        }
        if (typeof this.options.onChange === 'function') {
          this.options.onChange(null, '', detail);
        }

        this.emit('clear', detail);
        this.emit('select', detail);
        this.emit('change', detail);
      }
    }

    goToToday() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      this.selectDate(today, true);
    }

    getValue() {
      return formatDateToISO(this.selected);
    }

    getDate() {
      return this.selected ? new Date(this.selected) : null;
    }

    setValue(val, emit = true) {
      const parsed = parseDateInput(val);
      if (!parsed) {
        this.clearDate(emit);
      } else {
        this.selectDate(parsed, emit);
      }
    }

    setTheme(themeName) {
      this.options.theme = themeName;
      if (this.calEl) {
        this.calEl.setAttribute('data-theme', themeName);
      }
    }

    on(event, handler) {
      if (!this.listeners[event]) this.listeners[event] = [];
      this.listeners[event].push(handler);
      return this;
    }

    off(event, handler) {
      if (!this.listeners[event]) return this;
      this.listeners[event] = this.listeners[event].filter(h => h !== handler);
      return this;
    }

    emit(event, data) {
      if (this.listeners[event]) {
        this.listeners[event].forEach(handler => handler(data));
      }
    }

    destroy() {
      if (this.monthDD) this.monthDD.destroy();
      if (this.yearDD) this.yearDD.destroy();
      this.prevBtn.removeEventListener('click', this._onPrevClick);
      this.nextBtn.removeEventListener('click', this._onNextClick);
      if (this.todayBtn && this._onTodayClick) {
        this.todayBtn.removeEventListener('click', this._onTodayClick);
      }
      if (this.clearBtn && this._onClearClick) {
        this.clearBtn.removeEventListener('click', this._onClearClick);
      }
      this.daysEl.removeEventListener('click', this._onDaysClick);
      this.container.innerHTML = '';
      this.listeners = {};
    }

    /**
     * Attaches an interactive CustomCalendar popover to any standard input element.
     * @param {HTMLInputElement|string} inputEl
     * @param {Object} options
     */
    static attachToInput(inputEl, options = {}) {
      const input = typeof inputEl === 'string' ? document.querySelector(inputEl) : inputEl;
      if (!input) return null;

      const popupWrapper = document.createElement('div');
      popupWrapper.className = 'cb-calendar-popup-wrapper';
      document.body.appendChild(popupWrapper);

      const calendar = new CustomCalendar(popupWrapper, Object.assign({}, options, {
        value: input.value || options.value || new Date(),
        showClearBtn: true,
        showTodayBtn: true,
        onSelect: (date, dateStr, detail) => {
          input.value = dateStr;
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
          closePopup();
          if (typeof options.onSelect === 'function') {
            options.onSelect(date, dateStr, detail);
          }
        },
        onClear: () => {
          input.value = '';
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
          closePopup();
          if (typeof options.onClear === 'function') {
            options.onClear();
          }
        }
      }));

      function positionPopup() {
        const rect = input.getBoundingClientRect();
        const calWidth = 340;
        const calHeight = 360;
        let top = rect.bottom + 6;
        let left = rect.left;

        if (top + calHeight > window.innerHeight - 8 && rect.top > calHeight + 10) {
          top = Math.max(10, rect.top - calHeight - 6);
        }

        if (left + calWidth > window.innerWidth - 10) {
          left = Math.max(10, window.innerWidth - calWidth - 10);
        }
        if (left < 10) left = 10;

        popupWrapper.style.position = 'fixed';
        popupWrapper.style.top = `${Math.round(top)}px`;
        popupWrapper.style.left = `${Math.round(left)}px`;
      }

      function openPopup() {
        if (input.value) {
          calendar.setValue(input.value, false);
        }
        positionPopup();
        popupWrapper.classList.add('active');
      }

      function closePopup() {
        popupWrapper.classList.remove('active');
      }

      input.addEventListener('click', (e) => {
        e.stopPropagation();
        openPopup();
      });

      input.addEventListener('focus', openPopup);

      const handleOutsideClick = (e) => {
        if (!popupWrapper.contains(e.target) && e.target !== input) {
          closePopup();
        }
      };
      document.addEventListener('pointerdown', handleOutsideClick);

      window.addEventListener('resize', () => {
        if (popupWrapper.classList.contains('active')) {
          positionPopup();
        }
      });

      window.addEventListener('scroll', () => {
        if (popupWrapper.classList.contains('active')) {
          positionPopup();
        }
      }, true);

      return {
        calendar,
        popupWrapper,
        open: openPopup,
        close: closePopup,
        destroy: () => {
          document.removeEventListener('pointerdown', handleOutsideClick);
          calendar.destroy();
          if (popupWrapper.parentNode) popupWrapper.parentNode.removeChild(popupWrapper);
        }
      };
    }
  }

  /* ─────────────────────────────────────────────────────────────
     SINGLETON GLOBAL DATE PICKER POPUP ENGINE
     ───────────────────────────────────────────────────────────── */
  let globalPickerInstance = null;
  let globalPopupWrapper = null;
  let globalCurrentInput = null;
  let globalAnchorEl = null;

  function ensureGlobalPicker() {
    if (globalPickerInstance) return globalPickerInstance;

    globalPopupWrapper = document.getElementById('cbGlobalCalendarPopup');
    if (!globalPopupWrapper) {
      globalPopupWrapper = document.createElement('div');
      globalPopupWrapper.id = 'cbGlobalCalendarPopup';
      globalPopupWrapper.className = 'cb-calendar-popup-wrapper cb-global-picker-popup';
      document.body.appendChild(globalPopupWrapper);
    }

    globalPickerInstance = new CustomCalendar(globalPopupWrapper, {
      theme: 'gold',
      showClearBtn: true,
      showTodayBtn: true,
      onSelect: (date, dateStr) => {
        if (globalCurrentInput) {
          globalCurrentInput.value = dateStr;
          globalCurrentInput.dispatchEvent(new Event('input', { bubbles: true }));
          globalCurrentInput.dispatchEvent(new Event('change', { bubbles: true }));
        }
        CustomCalendar.close();
      },
      onClear: () => {
        if (globalCurrentInput) {
          globalCurrentInput.value = '';
          globalCurrentInput.dispatchEvent(new Event('input', { bubbles: true }));
          globalCurrentInput.dispatchEvent(new Event('change', { bubbles: true }));
        }
        CustomCalendar.close();
      }
    });

    return globalPickerInstance;
  }

  function positionGlobalPicker(targetEl) {
    if (!targetEl || !globalPopupWrapper) return;
    const rect = targetEl.getBoundingClientRect();
    const calWidth = 340;
    const calHeight = 360;

    let left = rect.left;
    let top = rect.bottom + 6;

    if (top + calHeight > window.innerHeight - 8 && rect.top > calHeight + 10) {
      top = Math.max(10, rect.top - calHeight - 6);
    }

    if (left + calWidth > window.innerWidth - 10) {
      left = Math.max(10, window.innerWidth - calWidth - 10);
    }
    if (left < 10) left = 10;

    globalPopupWrapper.style.position = 'fixed';
    globalPopupWrapper.style.top = `${Math.round(top)}px`;
    globalPopupWrapper.style.left = `${Math.round(left)}px`;
  }

  /**
   * Opens the CustomCalendar popup for any input element.
   * @param {HTMLInputElement|string} inputEl
   * @param {HTMLElement} [anchorEl]
   * @param {Object} [options]
   */
  CustomCalendar.openForInput = function (inputEl, anchorEl = null, options = {}) {
    const input = typeof inputEl === 'string' ? document.querySelector(inputEl) : inputEl;
    if (!input) return;

    const cal = ensureGlobalPicker();
    if (globalCurrentInput && globalCurrentInput !== input) {
      globalCurrentInput.classList.remove('cb-cal-active-target');
    }

    globalCurrentInput = input;
    globalAnchorEl = anchorEl || input;
    input.classList.add('cb-cal-active-target');

    // Inherit theme if specified
    const theme = options.theme || input.getAttribute('data-theme') || input.dataset?.theme || 'gold';
    cal.setTheme(theme);

    // Sync input value
    const val = input.value ? input.value.trim() : '';
    if (val && /^\d{4}-\d{1,2}-\d{1,2}$/.test(val)) {
      cal.setValue(val, false);
    } else {
      const today = new Date();
      cal.viewYear = today.getFullYear();
      cal.viewMonth = today.getMonth();
      cal.selected = null;
      cal.render();
    }

    positionGlobalPicker(globalAnchorEl);
    globalPopupWrapper.classList.add('active');
  };

  /**
   * Closes the active CustomCalendar popup.
   */
  CustomCalendar.close = function () {
    if (globalPopupWrapper) {
      globalPopupWrapper.classList.remove('active');
    }
    if (globalCurrentInput) {
      globalCurrentInput.classList.remove('cb-cal-active-target');
      globalCurrentInput = null;
    }
    globalAnchorEl = null;
  };

  /**
   * Universal synchronizer: wires every input[type="date"] across the entire application
   * to automatically open the CustomCalendar component.
   */
  CustomCalendar.syncAllDatePickers = function () {
    if (CustomCalendar._synced) return;
    CustomCalendar._synced = true;

    const isDateInput = (target) => {
      if (!target || typeof target.closest !== 'function') return null;
      return target.closest('input[type="date"], input.custom-datepicker, input[data-datepicker]');
    };

    // Intercept interactions on any date input across the app
    const handleTrigger = (e) => {
      const input = isDateInput(e.target);
      if (!input) return;

      if (globalPopupWrapper && globalPopupWrapper.contains(e.target)) return;

      e.preventDefault();
      e.stopPropagation();
      CustomCalendar.openForInput(input);
    };

    document.addEventListener('mousedown', handleTrigger, true);
    document.addEventListener('click', handleTrigger, true);

    // Keyboard support: F4, Space, Enter, Alt+ArrowDown opens picker
    document.addEventListener('keydown', (e) => {
      const input = isDateInput(e.target);
      if (input) {
        if (e.key === 'F4' || e.key === ' ' || e.key === 'Enter' || (e.altKey && e.key === 'ArrowDown')) {
          e.preventDefault();
          CustomCalendar.openForInput(input);
          return;
        }
      }

      if (e.key === 'Escape' && globalPopupWrapper && globalPopupWrapper.classList.contains('active')) {
        e.preventDefault();
        CustomCalendar.close();
        if (globalCurrentInput) globalCurrentInput.focus();
      }
    }, true);

    // Outside click closes picker
    document.addEventListener('pointerdown', (e) => {
      if (!globalPopupWrapper || !globalPopupWrapper.classList.contains('active')) return;
      if (globalPopupWrapper.contains(e.target)) return;
      if (globalCurrentInput && (globalCurrentInput === e.target || globalCurrentInput.contains(e.target))) return;
      if (globalAnchorEl && (globalAnchorEl === e.target || globalAnchorEl.contains(e.target))) return;
      CustomCalendar.close();
    });

    // Window repositioning
    window.addEventListener('scroll', () => {
      if (globalPopupWrapper && globalPopupWrapper.classList.contains('active') && globalAnchorEl) {
        positionGlobalPicker(globalAnchorEl);
      }
    }, true);

    window.addEventListener('resize', () => {
      if (globalPopupWrapper && globalPopupWrapper.classList.contains('active') && globalAnchorEl) {
        positionGlobalPicker(globalAnchorEl);
      }
    });

    // Global bridge for admin.js compatibility
    if (typeof window !== 'undefined') {
      window.openGlobalDatePickerForInput = (inputEl, anchorEl) => {
        CustomCalendar.openForInput(inputEl, anchorEl);
      };
      window.closeGlobalDatePicker = () => {
        CustomCalendar.close();
      };
    }
  };

  /* ─────────────────────────────────────────────────────────────
     HTML WEB COMPONENT: <custom-calendar>
     ───────────────────────────────────────────────────────────── */
  if (typeof window !== 'undefined' && window.customElements && !window.customElements.get('custom-calendar')) {
    class CustomCalendarElement extends HTMLElement {
      static get observedAttributes() {
        return ['value', 'min-year', 'max-year', 'theme'];
      }

      constructor() {
        super();
        this._calendar = null;
      }

      connectedCallback() {
        if (!this._calendar) {
          const value = this.getAttribute('value') || new Date();
          const minYear = this.getAttribute('min-year') ? parseInt(this.getAttribute('min-year'), 10) : undefined;
          const maxYear = this.getAttribute('max-year') ? parseInt(this.getAttribute('max-year'), 10) : undefined;
          const theme = this.getAttribute('theme') || this.getAttribute('data-theme') || 'accent';

          this._calendar = new CustomCalendar(this, {
            value,
            minYear,
            maxYear,
            theme,
            onSelect: (date, dateStr, detail) => {
              this.setAttribute('value', dateStr);
              this.dispatchEvent(new CustomEvent('calendar-select', { detail, bubbles: true, composed: true }));
              this.dispatchEvent(new CustomEvent('change', { detail, bubbles: true, composed: true }));
            }
          });
        }
      }

      disconnectedCallback() {
        if (this._calendar) {
          this._calendar.destroy();
          this._calendar = null;
        }
      }

      attributeChangedCallback(name, oldValue, newValue) {
        if (!this._calendar || oldValue === newValue) return;

        if (name === 'value') {
          this._calendar.setValue(newValue, false);
        } else if (name === 'theme') {
          this._calendar.setTheme(newValue);
        }
      }

      get value() {
        return this._calendar ? this._calendar.getValue() : this.getAttribute('value') || '';
      }

      set value(val) {
        this.setAttribute('value', val);
        if (this._calendar) {
          this._calendar.setValue(val, false);
        }
      }

      get date() {
        return this._calendar ? this._calendar.getDate() : null;
      }

      set date(d) {
        if (this._calendar) {
          this._calendar.setValue(d, false);
        }
      }

      get instance() {
        return this._calendar;
      }
    }

    window.customElements.define('custom-calendar', CustomCalendarElement);
  }

  /* ─────────────────────────────────────────────────────────────
     AUTO-INITIALIZATION & AUTO-SYNC
     ───────────────────────────────────────────────────────────── */
  function autoInitAll() {
    // 1. Auto-init declarative custom calendar elements
    const nodes = document.querySelectorAll('[data-custom-calendar]:not([data-calendar-initialized])');
    nodes.forEach(el => {
      el.setAttribute('data-calendar-initialized', 'true');
      const val = el.getAttribute('data-value') || el.dataset.value;
      const theme = el.getAttribute('data-theme') || el.dataset.theme;
      const minYear = el.getAttribute('data-min-year') ? parseInt(el.getAttribute('data-min-year'), 10) : undefined;
      const maxYear = el.getAttribute('data-max-year') ? parseInt(el.getAttribute('data-max-year'), 10) : undefined;

      const instance = new CustomCalendar(el, {
        value: val,
        theme,
        minYear,
        maxYear,
        onSelect: (date, dateStr, detail) => {
          el.dispatchEvent(new CustomEvent('calendar-select', { detail, bubbles: true }));
          el.dispatchEvent(new CustomEvent('change', { detail, bubbles: true }));
        }
      });
      el.__customCalendar = instance;
    });

    // 2. Automatically sync all input[type="date"] across the entire application
    CustomCalendar.syncAllDatePickers();
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', autoInitAll);
    } else {
      autoInitAll();
    }
  }

  return CustomCalendar;
});
