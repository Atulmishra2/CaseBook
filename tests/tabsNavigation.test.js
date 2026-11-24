import { describe, it, expect, beforeEach } from 'vitest';
import '../admin.js';

describe('admin.js - Tab Navigation & Routing Engine', () => {
  beforeEach(() => {
    // Setup DOM with CaseBook's tab structure
    document.body.innerHTML = `
      <div id="home" class="tab active">Home Content</div>
      <div id="newhome" class="tab">NewHome Zen Content</div>
      <div id="manage" class="tab">Manage Content</div>
      <div id="all" class="tab">All Cases Content</div>
      <div id="todo" class="tab">Todo Content</div>
      <div id="paisa" class="tab">Paisa Content</div>
      <div id="courts" class="tab">Courts Content</div>

      <div class="sidebar">
        <a id="nav-home" onclick="showTab('home')" class="active">Home</a>
        <a id="nav-newhome" onclick="showTab('newhome')">NewHome Zen</a>
        <a id="nav-manage" onclick="showTab('manage')">Manage</a>
        <a id="nav-all" onclick="showTab('all')">Cases</a>
        <a id="nav-todo" onclick="showTab('todo')">Tasks</a>
        <a id="nav-paisa" onclick="showTab('paisa')">Paisa</a>
      </div>

      <div id="fixedBottomNav">
        <button id="bottomNavHomeBtn" class="bottom-nav-btn"></button>
        <button id="bottomNavTasksBtn" class="bottom-nav-btn"></button>
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

  it('showTab should redirect legacy search/cards to all tab', async () => {
    await window.showTab('search');

    const allEl = document.getElementById('all');
    expect(allEl.classList.contains('active')).toBe(true);

    await window.showTab('cards');
    expect(allEl.classList.contains('active')).toBe(true);
  });

  it('redirects showTab("home") to #newhome on mobile screen and updates bottomNavHomeBtn', async () => {
    // Emulate mobile screen
    window.innerWidth = 414;
    window.matchMedia = (query) => ({
      matches: query.includes('max-width'),
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => true
    });

    await window.showTab('home');

    const newhomeEl = document.getElementById('newhome');
    const homeEl = document.getElementById('home');
    const bottomNavHomeBtn = document.getElementById('bottomNavHomeBtn');

    expect(newhomeEl.classList.contains('active')).toBe(true);
    expect(homeEl.classList.contains('active')).toBe(false);
    expect(bottomNavHomeBtn.classList.contains('active')).toBe(true);

    // Reset window width back to desktop
    window.innerWidth = 1024;
    window.matchMedia = (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => true
    });
  });

  it('strictly isolates active tab and sets display: none on all inactive tabs', async () => {
    // Add disposed and about tabs to DOM
    const disposedDiv = document.createElement('div');
    disposedDiv.id = 'disposed';
    disposedDiv.className = 'tab';
    disposedDiv.innerHTML = '<p>Disposed Content</p>';
    document.body.appendChild(disposedDiv);

    const aboutDiv = document.createElement('div');
    aboutDiv.id = 'about';
    aboutDiv.className = 'tab';
    aboutDiv.innerHTML = '<p>About CaseBook Content</p>';
    document.body.appendChild(aboutDiv);

    // Switch to about
    await window.showTab('about');
    expect(aboutDiv.classList.contains('active')).toBe(true);
    expect(aboutDiv.style.display).not.toBe('none');
    expect(aboutDiv.getAttribute('aria-hidden')).toBeNull();
    expect(disposedDiv.classList.contains('active')).toBe(false);
    expect(disposedDiv.style.display).toBe('none');
    expect(disposedDiv.getAttribute('aria-hidden')).toBe('true');

    // Switch to disposed
    await window.showTab('disposed');
    expect(disposedDiv.classList.contains('active')).toBe(true);
    expect(disposedDiv.style.display).not.toBe('none');
    expect(disposedDiv.getAttribute('aria-hidden')).toBeNull();

    // Verify about is strictly hidden and inactive
    expect(aboutDiv.classList.contains('active')).toBe(false);
    expect(aboutDiv.style.display).toBe('none');
    expect(aboutDiv.getAttribute('aria-hidden')).toBe('true');

    // Verify all other inactive tabs are hidden
    const inactiveTabs = Array.from(document.querySelectorAll('.tab:not(.active)'));
    inactiveTabs.forEach(tab => {
      expect(tab.style.display).toBe('none');
      expect(tab.getAttribute('aria-hidden')).toBe('true');
    });
  });
});
