// Global test environment setup for Vitest
window.__VITEST__ = true;

// Mock matchMedia if not present in jsdom
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

// Mock browser dialogs on both window and global scope
window.confirm = () => true;
window.alert = () => {};
window.prompt = () => '';
globalThis.confirm = () => true;
globalThis.alert = () => {};
globalThis.prompt = () => '';

// Mock toast and refresh stubs if not loaded
if (!window.showToastNotification) window.showToastNotification = () => {};
if (!window.performPostCrudRefresh) window.performPostCrudRefresh = async () => {};
if (!globalThis.showToastNotification) globalThis.showToastNotification = () => {};
if (!globalThis.performPostCrudRefresh) globalThis.performPostCrudRefresh = async () => {};
