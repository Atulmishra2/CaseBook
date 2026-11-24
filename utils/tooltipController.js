// ==============================================================================
// Global Floating Tooltip Controller — CaseBook Design System
// Triggers ONLY for standalone icon elements (suppresses when text is visible)
// Clean, informative, non-intrusive floating badges (strictly NO "Click to run")
// Suppressed completely on mobile and touch devices
// ==============================================================================

function isMobileTooltipViewport() {
  if (typeof window === 'undefined') return false;
  if (window.innerWidth <= 768) return true;
  if (window.innerHeight <= 500 && window.innerWidth <= 950) return true;
  if (window.matchMedia) {
    if (window.matchMedia('(max-width: 768px)').matches) return true;
    if (window.matchMedia('(hover: none)').matches) return true;
    if (window.matchMedia('(pointer: coarse) and (max-width: 1024px)').matches) return true;
  }
  return false;
}

(function initGlobalNavigationTooltipEngine() {
  let tooltipEl = null;
  let activeTarget = null;
  let hideTimer = null;

  function createTooltipDOM() {
    if (tooltipEl) return tooltipEl;
    tooltipEl = document.createElement('div');
    tooltipEl.id = 'globalNavTooltip';
    tooltipEl.className = 'global-nav-tooltip';
    tooltipEl.setAttribute('role', 'tooltip');
    tooltipEl.setAttribute('aria-hidden', 'true');
    tooltipEl.innerHTML = '<span class="global-nav-tooltip-title" id="globalNavTooltipTitle"></span>';

    document.body.appendChild(tooltipEl);
    return tooltipEl;
  }

  function isStandaloneIcon(el) {
    if (isMobileTooltipViewport()) return false;
    if (!el || !(el instanceof HTMLElement)) return false;

    // Explicit opt-in or opt-out flags
    if (el.dataset.navTooltip || el.dataset.tooltip) return true;
    if (el.dataset.noTooltip) return false;

    // Check if parent sidebar is currently collapsed (icon-only rail)
    const isSidebarCollapsed = document.body.classList.contains('sidebar-collapsed');
    const isInsideSidebar = el.closest('.sidebar, .sidenav');

    if (isInsideSidebar) {
      // In collapsed mode, sidebar links, profile, and theme button are icon-only!
      if (
        isSidebarCollapsed &&
        (el.tagName === 'A' ||
          el.classList.contains('nav-item') ||
          el.classList.contains('sidebar-profile-card') ||
          el.classList.contains('sidenav-theme-btn') ||
          el.closest('a'))
      ) {
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

  function getTooltipBadge(el) {
    if (!el || !(el instanceof HTMLElement)) return null;
    if (el.dataset.badge) return el.dataset.badge;
    const badgeEl = el.querySelector('.badge');
    if (badgeEl && badgeEl.textContent.trim()) {
      const text = badgeEl.textContent.trim();
      if (text !== '0' && text !== '₹0') return text;
    }
    return null;
  }

  function stripNativeTitle(el) {
    if (!el || !(el instanceof HTMLElement)) return;
    if (el.hasAttribute('title')) {
      const titleVal = el.getAttribute('title');
      el.dataset.origTitle = titleVal;
      if (!el.getAttribute('aria-label')) {
        el.setAttribute('aria-label', titleVal);
      }
      el.removeAttribute('title');
    }
    const childrenWithTitle = el.querySelectorAll('[title]');
    childrenWithTitle.forEach((ch) => {
      const cTitle = ch.getAttribute('title');
      ch.dataset.origTitle = cTitle;
      if (!ch.getAttribute('aria-label')) {
        ch.setAttribute('aria-label', cTitle);
      }
      ch.removeAttribute('title');
    });
  }

  function getTooltipLabel(el) {
    if (!el || !(el instanceof HTMLElement)) return null;

    // Always strip native title from element and children to prevent duplicate native OS tooltip
    stripNativeTitle(el);

    // 1. Explicit data-nav-tooltip or data-tooltip
    if (el.dataset.navTooltip) return el.dataset.navTooltip;
    if (el.dataset.tooltip) return el.dataset.tooltip;

    // 2. Original cached title attribute
    if (el.dataset.origTitle) return el.dataset.origTitle;

    // 3. Sidebar specific elements
    const isInsideSidebar = el.closest('.sidebar, .sidenav');
    if (isInsideSidebar) {
      if (el.classList.contains('sidebar-profile-card')) {
        const name = document.getElementById('sidebarProfileName')?.textContent || 'Chambers Profile';
        return name + ' (Settings)';
      }
      if (el.classList.contains('sidenav-theme-btn')) {
        const label = document.getElementById('themeToggleLabel')?.textContent || 'Toggle Theme';
        return label;
      }
      const navText = el.querySelector('.nav-text');
      if (navText && navText.textContent.trim()) {
        return navText.textContent.trim();
      }
    }

    // 4. aria-label
    if (el.getAttribute('aria-label')) {
      return el.getAttribute('aria-label');
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
      // Check overflow top if flipped
      if (top < 6) top = 6;
    }

    tip.style.top = `${Math.max(6, Math.round(top))}px`;
    tip.style.left = `${Math.max(6, Math.round(left))}px`;
  }

  function showTooltip(target) {
    if (isMobileTooltipViewport()) return;
    clearTimeout(hideTimer);
    const label = getTooltipLabel(target);
    if (!label) return;

    activeTarget = target;
    const tip = createTooltipDOM();

    // Check if label contains shortcut like "(Ctrl+K)" or explicit data-kbd / data-shortcut
    const explicitKbd = target.dataset.kbd || target.dataset.shortcut;
    let titleText = label;
    let kbdText = explicitKbd || '';

    if (!kbdText) {
      const match = label.match(/^(.*?)\s*\(((?:Ctrl|Alt|Shift|Cmd|⌘|⌥)\+[\w\d]+)\)$/i);
      if (match) {
        titleText = match[1].trim();
        kbdText = match[2].trim();
      }
    }

    tip.innerHTML = '';
    const titleEl = document.createElement('span');
    titleEl.className = 'global-nav-tooltip-title';
    titleEl.id = 'globalNavTooltipTitle';
    titleEl.textContent = titleText;
    tip.appendChild(titleEl);

    if (kbdText) {
      const kbdEl = document.createElement('kbd');
      kbdEl.className = 'global-nav-tooltip-kbd';
      kbdEl.textContent = kbdText;
      tip.appendChild(kbdEl);
    }

    // Render count badge if present (e.g., in collapsed sidebar)
    const badgeText = getTooltipBadge(target);
    if (badgeText) {
      const badgeEl = document.createElement('span');
      badgeEl.className = 'global-nav-tooltip-badge';
      badgeEl.id = 'globalNavTooltipBadge';
      badgeEl.textContent = badgeText;
      tip.appendChild(badgeEl);
    }

    tip.classList.add('visible');
    tip.setAttribute('aria-hidden', 'false');
    positionTooltip(target);
  }

  function hideTooltip() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      if (tooltipEl) {
        tooltipEl.classList.remove('visible');
        tooltipEl.setAttribute('aria-hidden', 'true');
      }
      activeTarget = null;
    }, 80);
  }

  // Global Event Delegation for performance
  document.addEventListener('mouseover', (e) => {
    if (isMobileTooltipViewport()) return;
    const target = e.target.closest('button, a, [data-nav-tooltip], [data-tooltip], .sidebar-profile-card, .sidenav-theme-btn');
    if (target && isStandaloneIcon(target)) {
      showTooltip(target);
    }
  }, { passive: true });

  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest('button, a, [data-nav-tooltip], [data-tooltip], .sidebar-profile-card, .sidenav-theme-btn');
    if (target && isStandaloneIcon(target)) {
      hideTooltip();
    }
  }, { passive: true });

  // Dismiss and suppress on touch
  document.addEventListener('touchstart', (e) => {
    hideTooltip();
    // Suppress native browser title tooltips on touch devices
    if (isMobileTooltipViewport()) {
      const elWithTitle = e.target.closest ? e.target.closest('[title]') : null;
      if (elWithTitle) {
        elWithTitle.dataset.origTitle = elWithTitle.getAttribute('title');
        elWithTitle.removeAttribute('title');
      }
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

  // Dismiss on window resize to mobile view
  window.addEventListener('resize', () => {
    if (isMobileTooltipViewport()) {
      hideTooltip();
    }
  }, { passive: true });
})();

// ==============================================================================
// Case Remarks & Disposal Comment Floating Tooltip Engine
// Ultra-crisp interactive preview for remarks and judgment comments (100% Lucide Icons)
// ==============================================================================

(function initRemarksTooltipEngine() {
  let remarksTipEl = null;
  let activeRemarksTarget = null;
  let remarksHideTimer = null;

  function createRemarksTooltipDOM() {
    if (remarksTipEl) return remarksTipEl;
    remarksTipEl = document.createElement('div');
    remarksTipEl.id = 'remarksFloatingTooltip';
    remarksTipEl.className = 'remarks-floating-tooltip';
    remarksTipEl.setAttribute('role', 'tooltip');
    remarksTipEl.setAttribute('aria-hidden', 'true');
    remarksTipEl.innerHTML = `
      <div class="remarks-tooltip-arrow" id="remarksTooltipArrow"></div>
      <div class="remarks-tooltip-header">
        <div class="remarks-tooltip-badge">
          <svg class="lucide lucide-scale" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>
          <span class="remarks-tooltip-title" id="remarksTooltipTitle">Disposal Remark</span>
        </div>
        <span class="remarks-tooltip-caseno" id="remarksTooltipCaseNo"></span>
      </div>
      <div class="remarks-tooltip-body" id="remarksTooltipBody"></div>
      <div class="remarks-tooltip-footer">
        <svg class="lucide lucide-folder-open" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/></svg>
        <span>Click row to open complete Case Dossier</span>
      </div>
    `;

    // Keep visible if hovered over tooltip itself
    remarksTipEl.addEventListener('mouseenter', () => {
      clearTimeout(remarksHideTimer);
    });

    remarksTipEl.addEventListener('mouseleave', () => {
      hideRemarksTooltip();
    });

    document.body.appendChild(remarksTipEl);
    return remarksTipEl;
  }

  function getRemarksTarget(e) {
    if (isMobileTooltipViewport()) return null;
    if (!e || !e.target || !(e.target instanceof HTMLElement)) return null;
    return e.target.closest('[data-remarks-tooltip], .case-disposal-clamp, .case-remark-clamp, [data-remark-full]');
  }

  function positionRemarksTooltip(target) {
    const tip = createRemarksTooltipDOM();
    const rect = target.getBoundingClientRect();
    const tipRect = tip.getBoundingClientRect();

    let top = 0;
    let left = rect.left + (rect.width - tipRect.width) / 2;

    // Check horizontal boundaries
    if (left + tipRect.width > window.innerWidth - 12) {
      left = window.innerWidth - tipRect.width - 12;
    }
    if (left < 12) left = 12;

    // Try placing ABOVE target first
    if (rect.top >= tipRect.height + 14) {
      top = rect.top - tipRect.height - 10;
      tip.setAttribute('data-placement', 'top');
    } else {
      // Otherwise place BELOW target
      top = rect.bottom + 10;
      tip.setAttribute('data-placement', 'bottom');
    }

    tip.style.top = `${Math.max(6, Math.round(top))}px`;
    tip.style.left = `${Math.max(6, Math.round(left))}px`;

    // Position arrow relative to the target center
    const arrow = document.getElementById('remarksTooltipArrow');
    if (arrow) {
      const arrowLeft = Math.max(16, Math.min(tipRect.width - 16, (rect.left + rect.width / 2) - left));
      arrow.style.left = `${Math.round(arrowLeft)}px`;
    }
  }

  function showRemarksTooltip(target) {
    if (isMobileTooltipViewport()) return;
    clearTimeout(remarksHideTimer);

    // Suppress native boring browser tooltip if present
    if (target.hasAttribute('title')) {
      target.dataset.remarksTooltip = target.getAttribute('title');
      target.removeAttribute('title');
    }

    const content = target.dataset.remarksTooltip || target.innerText.trim();
    if (!content || content === '—' || content === '-') return;

    activeRemarksTarget = target;
    const tip = createRemarksTooltipDOM();

    const titleEl = document.getElementById('remarksTooltipTitle');
    const caseNoEl = document.getElementById('remarksTooltipCaseNo');
    const bodyEl = document.getElementById('remarksTooltipBody');

    const title = target.dataset.remarksTitle || 'Disposal Note & Judgment';
    let caseNo = target.dataset.caseNo || '';
    if (!caseNo) {
      const row = target.closest('tr');
      if (row) {
        const caseNumCell = row.querySelector('.case-number-cell') || row.cells[0];
        if (caseNumCell) caseNo = caseNumCell.innerText.trim();
      }
    }

    if (titleEl) titleEl.textContent = title;
    if (caseNoEl) {
      if (caseNo) {
        caseNoEl.textContent = caseNo;
        caseNoEl.style.display = 'inline-block';
      } else {
        caseNoEl.style.display = 'none';
      }
    }
    if (bodyEl) bodyEl.textContent = content;

    tip.classList.add('visible');
    tip.setAttribute('aria-hidden', 'false');
    positionRemarksTooltip(target);
  }

  function hideRemarksTooltip() {
    clearTimeout(remarksHideTimer);
    remarksHideTimer = setTimeout(() => {
      if (remarksTipEl) {
        remarksTipEl.classList.remove('visible');
        remarksTipEl.setAttribute('aria-hidden', 'true');
      }
      activeRemarksTarget = null;
    }, 120);
  }

  document.addEventListener('mouseover', (e) => {
    if (isMobileTooltipViewport()) return;
    const target = getRemarksTarget(e);
    if (target) {
      showRemarksTooltip(target);
    }
  }, { passive: true });

  document.addEventListener('mouseout', (e) => {
    const target = getRemarksTarget(e);
    if (target) {
      hideRemarksTooltip();
    }
  }, { passive: true });

  // Dismiss on touch
  document.addEventListener('touchstart', () => {
    hideRemarksTooltip();
  }, { passive: true });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#remarksFloatingTooltip')) {
      hideRemarksTooltip();
    }
  }, { passive: true });

  window.addEventListener('scroll', () => {
    if (remarksTipEl && remarksTipEl.classList.contains('visible')) {
      hideRemarksTooltip();
    }
  }, { passive: true });

  // Dismiss on window resize to mobile view
  window.addEventListener('resize', () => {
    if (isMobileTooltipViewport()) {
      hideRemarksTooltip();
    }
  }, { passive: true });
})();
