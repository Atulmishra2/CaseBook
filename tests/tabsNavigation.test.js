import { describe, it, expect, beforeEach } from 'vitest';
import '../admin.js';

describe('admin.js - Tab Navigation & Routing Engine', () => {
  beforeEach(() => {
    // Setup DOM with CaseBook's tab structure
    document.body.innerHTML = `
      <div id="home" class="tab active">Home Content</div>
      <div id="manage" class="tab">Manage Content</div>
      <div id="all" class="tab">All Cases Content</div>
      <div id="todo" class="tab">Todo Content</div>
      <div id="paisa" class="tab">Paisa Content</div>
      <div id="courts" class="tab">Courts Content</div>

      <div class="sidebar">
        <a id="nav-home" onclick="showTab('home')" class="active">Home</a>
        <a id="nav-manage" onclick="showTab('manage')">Manage</a>
        <a id="nav-all" onclick="showTab('all')">Cases</a>
        <a id="nav-todo" onclick="showTab('todo')">Tasks</a>
        <a id="nav-paisa" onclick="showTab('paisa')">Paisa</a>
      </div>
    `;
  });

  it('showTab should switch active tab to #todo', async () => {
    expect(window.showTab).toBeDefined();

    await window.showTab('todo');

    const todoEl = document.getElementById('todo');
    const homeEl = document.getElementById('home');

    expect(todoEl.classList.contains('active')).toBe(true);
    expect(homeEl.classList.contains('active')).toBe(false);
  });

  it('showTab should redirect legacy add/update/delete to manage tab', async () => {
    await window.showTab('add');

    const manageEl = document.getElementById('manage');
    const homeEl = document.getElementById('home');

    expect(manageEl.classList.contains('active')).toBe(true);
    expect(homeEl.classList.contains('active')).toBe(false);
  });

  it('showTab should redirect legacy search/cards/undated to all tab', async () => {
    await window.showTab('search');

    const allEl = document.getElementById('all');
    expect(allEl.classList.contains('active')).toBe(true);

    await window.showTab('undated');
    expect(allEl.classList.contains('active')).toBe(true);
  });
});
