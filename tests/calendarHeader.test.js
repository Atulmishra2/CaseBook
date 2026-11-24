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

    // Check crest icon: ensures Lucide calendar icon is used (Rule 2 compliance)
    const crest = headLeft.querySelector('.crest');
    expect(crest).not.toBeNull();
    const svg = crest.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg.classList.contains('lucide-calendar-days')).toBe(true);

    // Check title text: retains Master Calendar Scheduler
    const titleEl = headLeft.querySelector('#selectedDateTitle');
    expect(titleEl).not.toBeNull();
    expect(titleEl.textContent).toContain('Master Calendar Scheduler');

    // Check subline
    const subline = headLeft.querySelector('#calendarHeaderSubline') || headLeft.querySelector('#causeListSubline');
    expect(subline).not.toBeNull();
    expect(subline.querySelector('#selectedDateFormattedText')).not.toBeNull();
    expect(subline.querySelector('#selectedDateCountBadge')).not.toBeNull();
  });

  it('ensures static tab-calendar.html and in-memory tab-calendar.js header markup are in exact parity', () => {
    const htmlPath = path.resolve(__dirname, '../components/tabs/calendar/tab-calendar.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');

    expect(htmlContent).toContain('<header class="board-head calendar-master-head">');
    expect(htmlContent).toContain('<span class="crest" aria-hidden="true"><svg class="lucide lucide-calendar-days"');
    expect(htmlContent).toContain('<span class="h1-text" id="selectedDateTitle">Master Calendar Scheduler</span>');
    expect(htmlContent).toContain('<div class="sub" id="calendarHeaderSubline">');
    expect(htmlContent).toContain('<b id="selectedDateFormattedText">Today</b> · <span id="selectedDateCountBadge"');
  });

  it('ensures calendar-master-head CSS follows DESIGN.md multi-tab parity with modern surface tokens and subtle border', () => {
    const cssPath = path.resolve(__dirname, '../components/tabs/calendar/tab-calendar.css');
    const cssContent = fs.readFileSync(cssPath, 'utf8');

    // Surface tokens and subtle border conforming to DESIGN.md
    expect(cssContent).toMatch(/\.calendar-master-head\.board-head\s*\{[^}]*background:\s*var\(--bg-surface/);
    expect(cssContent).toMatch(/\.calendar-master-head\.board-head\s*\{[^}]*border:\s*1px solid var\(--border-subtle/);
    expect(cssContent).toMatch(/\.calendar-master-head\.board-head\s*\{[^}]*border-radius:\s*var\(--radius-xl/);
  });
});
