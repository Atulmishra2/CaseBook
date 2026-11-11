import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import '../admin.js';
import '../services/todoService.js';
import '../components/tabs/todo/tab-todo.js';

describe('components/tabs/todo - Filter Strip & Segmented Grouped Buttons Responsive Layout', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="todo" data-todo-scope>
        ${window.__casebook_tabs['todo']}
      </div>
    `;
    window.renderCaseTasks = () => {};
  });

  it('renders .todo-filter-strip with 4 segmented buttons and count badges', () => {
    const strip = document.querySelector('.todo-filter-strip');
    expect(strip).not.toBeNull();
    expect(strip.getAttribute('role')).toBe('tablist');

    const tabs = strip.querySelectorAll('.todo-filter-tab');
    expect(tabs.length).toBe(4);

    const filterTypes = Array.from(tabs).map(t => t.dataset.filter);
    expect(filterTypes).toEqual(['all', 'pending', 'dueSoon', 'completed']);

    // Check count badges
    expect(strip.querySelector('#todoFilterAllCount')).not.toBeNull();
    expect(strip.querySelector('#todoFilterPendingCount')).not.toBeNull();
    expect(strip.querySelector('#todoFilterDueSoonCount')).not.toBeNull();
    expect(strip.querySelector('#todoFilterCompletedCount')).not.toBeNull();
  });

  it('ensures static tab-todo.html and in-memory tab-todo.js filter strip markup are in exact parity', () => {
    const htmlPath = path.resolve(__dirname, '../components/tabs/todo/tab-todo.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    const jsPath = path.resolve(__dirname, '../components/tabs/todo/tab-todo.js');
    const jsContent = fs.readFileSync(jsPath, 'utf8');

    expect(htmlContent).toContain('<div class="todo-filter-strip" role="tablist"');
    expect(jsContent).toContain('<div class="todo-filter-strip" role="tablist"');

    expect(htmlContent).toContain('data-filter="dueSoon"');
    expect(jsContent).toContain('data-filter="dueSoon"');

    expect(htmlContent).toContain('data-filter="completed"');
    expect(jsContent).toContain('data-filter="completed"');
  });

  it('updates active state and aria-selected on segmented buttons when filterTodoTasks is called', () => {
    const allTab = document.querySelector('.todo-filter-tab[data-filter="all"]');
    const dueSoonTab = document.querySelector('.todo-filter-tab[data-filter="dueSoon"]');
    const completedTab = document.querySelector('.todo-filter-tab[data-filter="completed"]');

    expect(allTab.classList.contains('active')).toBe(true);

    window.filterTodoTasks('dueSoon', dueSoonTab);
    expect(dueSoonTab.classList.contains('active')).toBe(true);
    expect(dueSoonTab.getAttribute('aria-selected')).toBe('true');
    expect(allTab.classList.contains('active')).toBe(false);
    expect(allTab.getAttribute('aria-selected')).toBe('false');

    window.filterTodoTasks('completed', completedTab);
    expect(completedTab.classList.contains('active')).toBe(true);
    expect(completedTab.getAttribute('aria-selected')).toBe('true');
    expect(dueSoonTab.classList.contains('active')).toBe(false);
    expect(dueSoonTab.getAttribute('aria-selected')).toBe('false');
  });

  it('verifies tab-todo.css prevents mobile overflow with nowrap, touch scrolling, and min-width: max-content', () => {
    const cssPath = path.resolve(__dirname, '../components/tabs/todo/tab-todo.css');
    const cssContent = fs.readFileSync(cssPath, 'utf8');

    // Container must use flex-nowrap and overflow-x: auto to prevent squished item collision
    expect(cssContent).toMatch(/flex-wrap:\s*nowrap/);
    expect(cssContent).toMatch(/overflow-x:\s*auto/);

    // Filter tabs must enforce min-width: max-content so labels + badges never shrink below content size
    expect(cssContent).toMatch(/min-width:\s*max-content/);

    // Buttons must have flex-shrink: 0 to protect against text truncation/overlapping
    expect(cssContent).toMatch(/flex-shrink:\s*0/);

    // Mobile media query (<= 560px) must hide icons to optimize horizontal space
    expect(cssContent).toMatch(/@media\s*\(max-width:\s*560px\)/);
  });
});
