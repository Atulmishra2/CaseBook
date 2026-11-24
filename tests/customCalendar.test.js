/**
 * @file customCalendar.test.js
 * Unit tests for CaseBook Custom Calendar Component
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('CaseBook Custom Calendar Component', () => {
  let container;
  let CustomCalendar;

  beforeEach(() => {
    container = document.createElement('div');
    container.id = 'calendarContainer';
    document.body.appendChild(container);

    // Mock scrollTo and offsetParent properties for JSDOM
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
    window.requestAnimationFrame = (cb) => setTimeout(cb, 0);

    const scriptCode = fs.readFileSync(path.resolve(__dirname, '../components/custom-calendar.js'), 'utf8');
    eval(scriptCode);
    CustomCalendar = window.CustomCalendar;
  });

  afterEach(() => {
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
  });

  it('initializes correctly with default today value', () => {
    const cal = new CustomCalendar('#calendarContainer');
    expect(cal).toBeDefined();

    const selectedInfo = container.querySelector('.cb-cal-selected-info');
    expect(selectedInfo).not.toBeNull();
    expect(selectedInfo.textContent.length).toBeGreaterThan(0);

    const selectedDayBtn = container.querySelector('.cb-cal-day.selected');
    expect(selectedDayBtn).not.toBeNull();
  });

  it('renders custom month and year dropdowns with Lucide icons', () => {
    new CustomCalendar('#calendarContainer', {
      value: '2026-11-14',
      theme: 'gold'
    });

    const monthLabel = container.querySelector('[data-dd="month"] .cb-dd-label');
    const yearLabel = container.querySelector('[data-dd="year"] .cb-dd-label');

    expect(monthLabel.textContent).toBe('November');
    expect(yearLabel.textContent).toBe('2026');

    // Verify Lucide icons are used (SVG with class "lucide")
    const chevrons = container.querySelectorAll('svg.lucide.lucide-chevron-down');
    expect(chevrons.length).toBe(2);

    const navIcons = container.querySelectorAll('svg.lucide.lucide-chevron-left, svg.lucide.lucide-chevron-right');
    expect(navIcons.length).toBe(2);
  });

  it('selects a date when clicked and fires onSelect / onChange', () => {
    let selectedVal = null;
    const cal = new CustomCalendar('#calendarContainer', {
      value: '2026-11-01',
      onSelect: (date, dateStr) => {
        selectedVal = dateStr;
      }
    });

    const day15Btn = container.querySelector('.cb-cal-day[data-day="15"]');
    expect(day15Btn).not.toBeNull();
    day15Btn.click();

    expect(selectedVal).toBe('2026-11-15');
    expect(cal.getValue()).toBe('2026-11-15');
  });

  it('shifts month forward and backward properly', () => {
    const cal = new CustomCalendar('#calendarContainer', {
      value: '2026-05-10'
    });

    const nextBtn = container.querySelector('[data-action="next"]');
    nextBtn.click();

    expect(cal.viewMonth).toBe(5); // June is index 5
    const monthLabel = container.querySelector('[data-dd="month"] .cb-dd-label');
    expect(monthLabel.textContent).toBe('June');

    const prevBtn = container.querySelector('[data-action="prev"]');
    prevBtn.click();
    expect(cal.viewMonth).toBe(4); // Back to May
    expect(monthLabel.textContent).toBe('May');
  });

  it('works seamlessly as a Web Component <custom-calendar>', () => {
    const wc = document.createElement('custom-calendar');
    wc.setAttribute('value', '2026-08-15');
    wc.setAttribute('theme', 'gold');
    document.body.appendChild(wc);

    expect(wc.value).toBe('2026-08-15');
    expect(wc.querySelector('.cb-custom-calendar')).not.toBeNull();

    document.body.removeChild(wc);
  });

  it('syncs with input[type="date"] via openForInput and dispatches events on select and clear', () => {
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.id = 'testFilingDate';
    dateInput.value = '2026-11-10';
    document.body.appendChild(dateInput);

    let changedVal = null;
    let inputVal = null;
    dateInput.addEventListener('change', (e) => { changedVal = e.target.value; });
    dateInput.addEventListener('input', (e) => { inputVal = e.target.value; });

    // Open popup for input
    CustomCalendar.openForInput(dateInput);

    const popup = document.getElementById('cbGlobalCalendarPopup');
    expect(popup).not.toBeNull();
    expect(popup.classList.contains('active')).toBe(true);

    // Click day 25
    const day25Btn = popup.querySelector('.cb-cal-day[data-day="25"]');
    expect(day25Btn).not.toBeNull();
    day25Btn.click();

    // Verify input value was updated and events fired
    expect(dateInput.value).toBe('2026-11-25');
    expect(changedVal).toBe('2026-11-25');
    expect(inputVal).toBe('2026-11-25');
    expect(popup.classList.contains('active')).toBe(false);

    // Open again and click Clear
    CustomCalendar.openForInput(dateInput);
    expect(popup.classList.contains('active')).toBe(true);

    const clearBtn = popup.querySelector('[data-action="clear"]');
    expect(clearBtn).not.toBeNull();
    clearBtn.click();

    expect(dateInput.value).toBe('');
    expect(changedVal).toBe('');
    expect(inputVal).toBe('');
    expect(popup.classList.contains('active')).toBe(false);

    document.body.removeChild(dateInput);
  });

  it('automatically triggers CustomCalendar when clicking on an input[type="date"]', () => {
    CustomCalendar.syncAllDatePickers();

    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.id = 'autoSyncDateInput';
    dateInput.value = '2026-12-01';
    document.body.appendChild(dateInput);

    // Dispatch mousedown on input
    const evt = new MouseEvent('mousedown', { bubbles: true, cancelable: true });
    dateInput.dispatchEvent(evt);

    const popup = document.getElementById('cbGlobalCalendarPopup');
    expect(popup).not.toBeNull();
    expect(popup.classList.contains('active')).toBe(true);

    CustomCalendar.close();
    expect(popup.classList.contains('active')).toBe(false);

    document.body.removeChild(dateInput);
  });
});
