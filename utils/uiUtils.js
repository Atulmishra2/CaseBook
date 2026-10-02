// Shared UI helpers like Toasts and Modals
window.uiUtils = window.uiUtils || {};

function formatCurrencyINR(amount) {
  const num = parseFloat(amount) || 0;
  return num.toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0
  });
}
window.formatCurrencyINR = formatCurrencyINR;