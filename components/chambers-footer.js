/**
 * Reusable Chambers Footer Component
 * -------------------------------------------------------------
 * Allows easily inserting the Modern Chambers of Atul Kumar Mishra
 * footer anywhere in the application.
 *
 * Usage Options:
 * 1. Web Component:
 *    <chambers-footer></chambers-footer>
 *
 * 2. HTML placeholder with attribute:
 *    <div data-chambers-footer></div>
 *    or
 *    <div id="reusableFooter"></div>
 *
 * 3. JavaScript programmatic rendering:
 *    renderChambersFooter('#my-footer-container');
 */

(function () {
  const workflowTabs = ['add', 'update', 'hearing', 'delete', 'courts'];

  function isWorkflowTabActive() {
    const activeTab = document.querySelector('.tab.active');
    if (activeTab && workflowTabs.includes(activeTab.id)) return true;
    if (typeof window.currentActiveTabId !== 'undefined' && workflowTabs.includes(window.currentActiveTabId)) return true;
    const hash = window.location.hash ? window.location.hash.replace('#', '') : '';
    return workflowTabs.includes(hash);
  }

  function getChambersFooterHtml(customOptions = {}) {
    const advocateName = customOptions.advocateName || 'Chambers of Atul Kumar Mishra';
    const subtitle = customOptions.subtitle || 'Advocate & Legal Consultant';
    const year = customOptions.year || new Date().getFullYear();

    return `
      <footer class="site-footer">
          <div class="footer-inner">
              <div class="footer-brand">
                  <span class="footer-logo" aria-hidden="true">
                    <svg class="lucide lucide-scale" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path>
                      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path>
                      <path d="M7 21h10"></path>
                      <path d="M12 3v18"></path>
                      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"></path>
                    </svg>
                  </span>
                  <div>
                      <div class="footer-name">${advocateName}</div>
                      <div class="footer-tag">${subtitle}</div>
                  </div>
              </div>

              <nav class="footer-links" aria-label="Footer Navigation">
                  <a href="javascript:void(0);" onclick="typeof showTab === 'function' ? showTab('home', event) : (window.location.href='index.html#home')">Dashboard</a>
                  <a href="javascript:void(0);" onclick="typeof showTab === 'function' ? showTab('all', event) : (window.location.href='index.html#all')">Registry</a>
                  <a href="javascript:void(0);" onclick="typeof showTab === 'function' ? showTab('causelist', event) : (window.location.href='index.html#causelist')">Cause List</a>
                  <a href="javascript:void(0);" onclick="typeof showTab === 'function' ? showTab('calendar', event) : (window.location.href='index.html#calendar')">Calendar</a>
                  <a href="javascript:void(0);" onclick="typeof showTab === 'function' ? showTab('livecrud', event) : (window.location.href='index.html#livecrud')">Database</a>
              </nav>
          </div>

          <div class="footer-bottom">
              <span>&copy; ${year} ${advocateName} &bull; All rights reserved</span>
              <a href="javascript:void(0);" onclick="window.scrollTo({top: 0, behavior: 'smooth'})" class="back-top">
                <svg class="lucide lucide-arrow-up" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
                Back to Top
              </a>
          </div>
      </footer>
    `.trim();
  }

  // Programmatic function
  function renderChambersFooter(target, options) {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (el) {
      el.innerHTML = getChambersFooterHtml(options);
      if (isWorkflowTabActive()) {
        el.style.display = 'none';
      }
    }
  }

  // Web Component definition
  if (typeof customElements !== 'undefined' && !customElements.get('chambers-footer')) {
    class ChambersFooterElement extends HTMLElement {
      connectedCallback() {
        this.innerHTML = getChambersFooterHtml();
        if (isWorkflowTabActive()) {
          this.style.display = 'none';
        }
      }
    }
    customElements.define('chambers-footer', ChambersFooterElement);
  }

  // Auto-mount on DOMContentLoaded
  function autoMountFooters() {
    const hide = isWorkflowTabActive();
    document.querySelectorAll('[data-chambers-footer], #reusableFooter').forEach(el => {
      if (!el.innerHTML.trim()) {
        el.innerHTML = getChambersFooterHtml();
      }
      if (hide) {
        el.style.display = 'none';
      }
    });
    document.querySelectorAll('.modern-chambers-footer, .site-footer').forEach(f => {
      if (hide) {
        f.style.display = 'none';
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoMountFooters);
  } else {
    autoMountFooters();
  }

  // Expose globally on window
  window.getChambersFooterHtml = getChambersFooterHtml;
  window.renderChambersFooter = renderChambersFooter;
})();
