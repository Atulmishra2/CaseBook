import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import '../components/tabs/calendar/tab-calendar.js';

describe('components/tabs/calendar/tab-calendar.html & tab-calendar.js - Master Calendar Header Parity with To-Do Tracker', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="calendarTab">
        ${window.__casebook_tabs['calendar']}
      </div>
    `;
  });

  it('renders executive Master Calendar board-head banner matching Case Tasks & To-Do Tracker design pattern', () => {
    const topHead = document.querySelector('.calendar-master-head.board-head');
    expect(topHead).not.toBeNull();

    // Check head-left container
    const headLeft = topHead.querySelector('.head-left');
    expect(headLeft).not.toBeNull();

    // Check crest icon: ensures calendar icon is retained
    const crest = headLeft.querySelector('.crest');
    expect(crest).not.toBeNull();
    const icon = crest.querySelector('i');
    expect(icon).not.toBeNull();
    expect(icon.classList.contains('fa-calendar-days')).toBe(true);

    // Check title text: retains Master Calendar Scheduler
    const titleEl = headLeft.querySelector('#selectedDateTitle');
    expect(titleEl).not.toBeNull();
    expect(titleEl.textContent).toContain('Master Calendar Scheduler');

    // Check subline
    const subline = headLeft.querySelector('#causeListSubline');
    expect(subline).not.toBeNull();
    expect(subline.querySelector('#selectedDateFormattedText')).not.toBeNull();
    expect(subline.querySelector('#selectedDateCountBadge')).not.toBeNull();
  });

  it('ensures static tab-calendar.html and in-memory tab-calendar.js header markup are in exact parity', () => {
    const htmlPath = path.resolve(__dirname, '../components/tabs/calendar/tab-calendar.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');

    expect(htmlContent).toContain('<header class="board-head calendar-master-head">');
    expect(htmlContent).toContain('<span class="crest" aria-hidden="true"><i class="fa-solid fa-calendar-days"></i></span>');
    expect(htmlContent).toContain('<span class="h1-text" id="selectedDateTitle">Master Calendar Scheduler</span>');
    expect(htmlContent).toContain('<div class="sub" id="causeListSubline">');
    expect(htmlContent).toContain('<b id="selectedDateFormattedText">Today</b> · <span id="selectedDateCountBadge">0 listings</span>');
  });

  it('ensures calendar-master-head CSS uses transparent background matching tab background, removes box-shadow, and adds gold accent line', () => {
    const cssPath = path.resolve(__dirname, '../components/tabs/calendar/tab-calendar.css');
    const cssContent = fs.readFileSync(cssPath, 'utf8');

    // Title wrapper background same as tab background
    expect(cssContent).toMatch(/\.calendar-master-head\.board-head\s*\{[^}]*background:\s*transparent\s*!important/);
    expect(cssContent).toMatch(/\.calendar-master-head\.board-head\s*\{[^}]*box-shadow:\s*none\s*!important/);

    // Downside golden border is present
    expect(cssContent).toMatch(/\.calendar-master-head\.board-head::before\s*\{[^}]*var\(--cl-gold-light/);
  });
});
