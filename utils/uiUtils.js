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

// Global fallback for editCaseFromTable (navigates to Update tab with disambiguation)
if (typeof window.editCaseFromTable !== 'function') {
  window.editCaseFromTable = function(caseNo, caseType, caseId) {
    if (!caseNo || caseNo === '—') return;
    if (typeof showTab === 'function') {
      showTab('update');
    }
    const searchInput = document.getElementById('updateSearchInput');
    if (searchInput) searchInput.value = caseNo;
    if (typeof loadCaseForUpdate === 'function') {
      loadCaseForUpdate(caseNo, caseType, caseId);
    }
  };
}