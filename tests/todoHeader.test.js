import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import '../components/tabs/todo/tab-todo.js';

describe('components/tabs/todo/tab-todo.html & tab-todo.js - Master Calendar Style Header Parity', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="todoTab">
        ${window.__casebook_tabs['todo']}
      </div>
    `;
  });

  it('renders executive Master Calendar board-head banner hierarchy in tab-todo', () => {
    const topHead = document.querySelector('.todo-master-head.board-head');
    expect(topHead).not.toBeNull();

    // Check head-left container
    const headLeft = topHead.querySelector('.head-left');
    expect(headLeft).not.toBeNull();

    // Check crest icon: ensures list-check icon is retained and NOT calendar icon
    const crest = headLeft.querySelector('.crest');
    expect(crest).not.toBeNull();
    const icon = crest.querySelector('i');
    expect(icon).not.toBeNull();
    expect(icon.classList.contains('fa-list-check')).toBe(true);
    expect(icon.classList.contains('fa-calendar-days')).toBe(false);

    // Check title text: retains Case Tasks & To-Do Tracker
    const titleEl = headLeft.querySelector('#todoMainTitle');
    expect(titleEl).not.toBeNull();
    expect(titleEl.textContent).toContain('Case Tasks & To-Do Tracker');
    expect(titleEl.textContent).not.toContain('Master Calendar Scheduler');

    // Check subline
    const subline = headLeft.querySelector('#todoHeaderSubline');
    expect(subline).not.toBeNull();
    expect(subline.querySelector('#todoFormattedSubline').textContent).toContain('Tasks & Deadlines');
    expect(subline.querySelector('#todoHeaderCountBadge')).not.toBeNull();

    // Check right action button
    const headActions = topHead.querySelector('.head-actions');
    expect(headActions).not.toBeNull();
    const addBtn = headActions.querySelector('#openTodoTaskModalBtn');
    expect(addBtn).not.toBeNull();
    expect(addBtn.textContent).toContain('Add New Task');
  });

  it('ensures static tab-todo.html and in-memory tab-todo.js header markup are in exact parity', () => {
    const htmlPath = path.resolve(__dirname, '../components/tabs/todo/tab-todo.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');

    expect(htmlContent).toContain('<header class="board-head todo-master-head">');
    expect(htmlContent).toContain('<span class="crest" aria-hidden="true"><i class="fa-solid fa-list-check"></i></span>');
    expect(htmlContent).toContain('<span class="h1-text" id="todoMainTitle">Case Tasks &amp; To-Do Tracker</span>');
    expect(htmlContent).toContain('<div class="sub" id="todoHeaderSubline">');
    expect(htmlContent).toContain('<b id="todoFormattedSubline">Tasks &amp; Deadlines</b> · <span id="todoHeaderCountBadge">0 active</span>');
    expect(htmlContent).toContain('<button type="button" id="openTodoTaskModalBtn" class="primary-btn" onclick="openTodoTaskModal()">');

    // Confirm deprecated section-header-row is not at the root header
    expect(htmlContent.trim().startsWith('<div class="section-header-row">')).toBe(false);
  });

  it('ensures todo-master-head CSS uses transparent background matching tab background and removes box-shadow', () => {
    const cssPath = path.resolve(__dirname, '../components/tabs/todo/tab-todo.css');
    const cssContent = fs.readFileSync(cssPath, 'utf8');

    // Title wrapper background same as tab background
    expect(cssContent).toMatch(/\.todo-master-head\.board-head\s*\{[^}]*background:\s*transparent\s*!important/);
    expect(cssContent).toMatch(/\.todo-master-head\.board-head\s*\{[^}]*box-shadow:\s*none\s*!important/);

    // Downside golden border is retained
    expect(cssContent).toMatch(/\.todo-master-head\.board-head::before\s*\{[^}]*var\(--cl-gold-light/);
  });
});
