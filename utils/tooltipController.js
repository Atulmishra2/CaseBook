// ==============================================================================
// Global Interactive Navigation Tooltip Controller
// Triggers ONLY for standalone icon elements (suppresses when text is visible)
// Click on tooltip navigates to the target tab/action
// ==============================================================================

(function initGlobalNavigationTooltipEngine() {
  let tooltipEl = null;
  let activeTarget = null;
  let hideTimer = null;

  function createTooltipDOM() {
    if (tooltipEl) return tooltipEl;
    tooltipEl = document.createElement('div');
    tooltipEl.id = 'globalNavTooltip';
    tooltipEl.className = 'global-nav-tooltip';
    tooltipEl.innerHTML = `
      <span class="global-nav-tooltip-title" id="globalNavTooltipTitle"></span>
      <span class="global-nav-tooltip-hint" id="globalNavTooltipHint">Navigate →</span>
    `;

    // Clicking tooltip itself triggers click on the active target element
    tooltipEl.addEventListener('click', (e) => {
      e.stopPropagation();
      if (activeTarget) {
        hideTooltip();
        activeTarget.click();
      }
    });

    // Keep tooltip visible when mouse moves over the tooltip itself
    tooltipEl.addEventListener('mouseenter', () => {
      clearTimeout(hideTimer);
    });

    tooltipEl.addEventListener('mouseleave', () => {
      hideTooltip();
    });

    document.body.appendChild(tooltipEl);
    return tooltipEl;
  }

  function isStandaloneIcon(el) {
    if (!el || !(el instanceof HTMLElement)) return false;

    // Explicit opt-in or opt-out flags
    if (el.dataset.navTooltip) return true;
    if (el.dataset.noTooltip) return false;

    // Check if parent sidebar is currently collapsed (icon-only rail)
    const isSidebarCollapsed = document.body.classList.contains('sidebar-collapsed');
    const isInsideSidebar = el.closest('.sidebar, .sidenav');

    if (isInsideSidebar) {
      // In collapsed mode, sidebar links are icon-only!
      if (isSidebarCollapsed && (el.tagName === 'A' || el.classList.contains('nav-item') || el.closest('a'))) {
        return true;
      }
      // If sidebar is expanded, text is visible, so DO NOT show tooltip!
      return false;
    }

    // Header icon buttons / standalone controls
    if (
      el.classList.contains('nav-icon-action-btn') ||
      el.classList.contains('mobile-menu-btn') ||
      el.id === 'sidebarToggleBtn' ||
      el.id === 'desktopInstallBtn' ||
      el.id === 'adminLogoutBtn' ||
      el.classList.contains('header-install-btn') ||
      el.classList.contains('mobile-fab-btn')
    ) {
      return true;
    }

    // Generic detection: button or link containing only icons, with no visible text
    if (el.tagName === 'BUTTON' || el.tagName === 'A') {
      const text = (el.innerText || '').trim();
      const hasIcon = el.querySelector('iconify-icon, i, svg') !== null;
      if (hasIcon && text.length === 0) {
        return true;
      }
    }

    return false;
  }

  function getTooltipLabel(el) {
    // 1. Explicit data-nav-tooltip
    if (el.dataset.navTooltip) return el.dataset.navTooltip;

    // 2. Title attribute (cache and temporarily clear title to prevent native boring tooltip)
    if (el.title) {
      el.dataset.origTitle = el.title;
      el.removeAttribute('title');
      return el.dataset.origTitle;
    }
    if (el.dataset.origTitle) return el.dataset.origTitle;

    // 3. aria-label
    if (el.getAttribute('aria-label')) {
      return el.getAttribute('aria-label');
    }

    // 4. Sidebar link nav-text if collapsed
    const navText = el.querySelector('.nav-text');
    if (navText && navText.textContent.trim()) {
      return navText.textContent.trim();
    }

    return null;
  }

  function positionTooltip(target) {
    const tip = createTooltipDOM();
    const rect = target.getBoundingClientRect();
    const tipRect = tip.getBoundingClientRect();

    let top = 0;
    let left = 0;

    // If inside collapsed sidebar (left side rail) -> place on the right of the icon
    const isInsideSidebar = target.closest('.sidebar, .sidenav');
    if (isInsideSidebar && document.body.classList.contains('sidebar-collapsed')) {
      top = rect.top + (rect.height - tipRect.height) / 2;
      left = rect.right + 12;
    } else {
      // Top header or generic button -> place below
      top = rect.bottom + 8;
      left = rect.left + (rect.width - tipRect.width) / 2;

      // Check overflow right
      if (left + tipRect.width > window.innerWidth - 12) {
        left = window.innerWidth - tipRect.width - 12;
      }
      // Check overflow left
      if (left < 12) left = 12;

      // Check overflow bottom -> flip to top
      if (top + tipRect.height > window.innerHeight - 12) {
        top = rect.top - tipRect.height - 8;
      }
    }

    tip.style.top = `${Math.max(6, Math.round(top))}px`;
    tip.style.left = `${Math.max(6, Math.round(left))}px`;
  }

  function showTooltip(target) {
    clearTimeout(hideTimer);
    const label = getTooltipLabel(target);
    if (!label) return;

    activeTarget = target;
    const tip = createTooltipDOM();

    const titleEl = document.getElementById('globalNavTooltipTitle');
    const hintEl = document.getElementById('globalNavTooltipHint');
    if (titleEl) titleEl.textContent = label;

    // Customize hint
    if (hintEl) {
      const isNav = target.tagName === 'A' || target.getAttribute('onclick')?.includes('showTab');
      hintEl.textContent = isNav ? 'Navigate →' : 'Click to run';
    }

    tip.classList.add('visible');
    positionTooltip(target);
  }

  function hideTooltip() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      if (tooltipEl) {
        tooltipEl.classList.remove('visible');
      }
      activeTarget = null;
    }, 120);
  }

  // Global Event Delegation for performance
  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest('button, a, [data-nav-tooltip]');
    if (target && isStandaloneIcon(target)) {
      showTooltip(target);
    }
  }, { passive: true });

  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest('button, a, [data-nav-tooltip]');
    if (target && isStandaloneIcon(target)) {
      hideTooltip();
    }
  }, { passive: true });

  // Dismiss on any click anywhere
  document.addEventListener('click', () => {
    hideTooltip();
  }, { passive: true });

  // Dismiss on scroll
  window.addEventListener('scroll', () => {
    if (tooltipEl && tooltipEl.classList.contains('visible')) {
      hideTooltip();
    }
  }, { passive: true });
})();
