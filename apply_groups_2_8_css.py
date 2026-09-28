css_groups_2_8 = '''

/* ==============================================================================
   GROUP 2: FORM CONTROLS & INPUTS (GLOBAL STANDARDIZATION)
   ============================================================================== */
.form-group {
  margin-bottom: 16px !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 6px !important;
}

.form-group label {
  font-size: 13px !important;
  font-weight: 600 !important;
  color: #334155 !important;
  font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
}

input[type="text"],
input[type="date"],
input[type="search"],
input[type="password"],
input[type="email"],
input[type="number"],
select,
textarea {
  font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
  font-size: 13.5px !important;
  color: #0f172a !important;
  background-color: #ffffff !important;
  border: 1.5px solid #cbd5e1 !important;
  border-radius: 10px !important;
  padding: 10px 14px !important;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04) !important;
  transition: border-color 0.18s ease, box-shadow 0.18s ease !important;
  outline: none !important;
  width: 100% !important;
  box-sizing: border-box !important;
}

input[type="text"]:focus,
input[type="date"]:focus,
input[type="search"]:focus,
input[type="password"]:focus,
input[type="email"]:focus,
input[type="number"]:focus,
select:focus,
textarea:focus {
  border-color: #6366f1 !important;
  box-shadow: 0 0 0 3.5px rgba(99, 102, 241, 0.18) !important;
  background-color: #ffffff !important;
}

select {
  appearance: none !important;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%20475569'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E") !important;
  background-repeat: no-repeat !important;
  background-position: right 12px center !important;
  background-size: 16px 16px !important;
  padding-right: 36px !important;
}

.form-grid-2col {
  display: grid !important;
  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  gap: 16px !important;
}

.form-grid-3col {
  display: grid !important;
  grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  gap: 16px !important;
}

@media (max-width: 768px) {
  .form-grid-2col,
  .form-grid-3col {
    grid-template-columns: 1fr !important;
  }
}

/* ==============================================================================
   GROUP 3: TABLES & DATA REGISTERS (GLOBAL STANDARDIZATION)
   ============================================================================== */
.table-responsive {
  width: 100% !important;
  overflow-x: auto !important;
  -webkit-overflow-scrolling: touch !important;
  border-radius: 12px !important;
  border: 1px solid #e2e8f0 !important;
  background: #ffffff !important;
}

.case-table,
.search-results-table {
  width: 100% !important;
  border-collapse: collapse !important;
  text-align: left !important;
  font-size: 13.5px !important;
}

.case-table thead,
.search-results-table thead {
  background-color: #f8fafc !important;
  border-bottom: 1.5px solid #e2e8f0 !important;
}

.case-table th,
.search-results-table th {
  padding: 12px 16px !important;
  font-size: 12px !important;
  font-weight: 700 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.04em !important;
  color: #475569 !important;
}

.case-table td,
.search-results-table td {
  padding: 13px 16px !important;
  border-bottom: 1px solid #f1f5f9 !important;
  color: #334155 !important;
  vertical-align: middle !important;
}

.case-table tr.clickable-row:hover,
.search-results-table tr.clickable-row:hover {
  background-color: #f8fafc !important;
}

.case-table tr.selected-row,
.search-results-table tr.selected-row {
  background-color: #eff6ff !important;
}

/* ==============================================================================
   GROUP 4: STATUS BADGES & CHIPS (GLOBAL STANDARDIZATION)
   ============================================================================== */
.status-badge,
.case-badge,
.db-live-badge,
.hero-status-pill {
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
  padding: 4px 10px !important;
  border-radius: 9999px !important;
  font-size: 12px !important;
  font-weight: 600 !important;
  line-height: 1.2 !important;
  white-space: nowrap !important;
}

.status-badge.pending {
  background-color: #fef3c7 !important;
  color: #b45309 !important;
  border: 1px solid #fde68a !important;
}

.status-badge.disposed {
  background-color: #dcfce7 !important;
  color: #15803d !important;
  border: 1px solid #86efac !important;
}

.case-badge.civil {
  background-color: #eff6ff !important;
  color: #1d4ed8 !important;
  border: 1px solid #bfdbfe !important;
}

.case-badge.criminal,
.case-badge.state {
  background-color: #fef2f2 !important;
  color: #b91c1c !important;
  border: 1px solid #fecaca !important;
}

.case-badge.family {
  background-color: #fdf4ff !important;
  color: #a21caf !important;
  border: 1px solid #f5d0fe !important;
}

.case-badge.revenue {
  background-color: #fff7ed !important;
  color: #c2410c !important;
  border: 1px solid #ffedd5 !important;
}

.db-live-badge,
.hero-status-pill.connected {
  background-color: #f0fdf4 !important;
  color: #166534 !important;
  border: 1px solid #bbf7d0 !important;
}

.live-dot {
  width: 7px !important;
  height: 7px !important;
  border-radius: 50% !important;
  background-color: #22c55e !important;
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.25) !important;
}

/* ==============================================================================
   GROUP 5: HERO CARDS & KPI CONTAINERS (GLOBAL STANDARDIZATION)
   ============================================================================== */
.home-hero-card,
.my-cases-header-card,
.kpi-card,
.stat-card {
  background: #ffffff !important;
  border-radius: 16px !important;
  border: 1px solid #e2e8f0 !important;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.05), 0 1px 3px rgba(15, 23, 42, 0.03) !important;
  padding: 20px !important;
  transition: transform 0.2s ease, box-shadow 0.2s ease !important;
}

.kpi-card:hover,
.stat-card:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.08) !important;
}

.hero-emblem-badge {
  width: 44px !important;
  height: 44px !important;
  border-radius: 12px !important;
  background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%) !important;
  color: #ffffff !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-size: 20px !important;
  box-shadow: 0 2px 6px rgba(67, 56, 202, 0.25) !important;
}

/* ==============================================================================
   GROUP 6: FILTERS & SEARCH INPUT BARS (GLOBAL STANDARDIZATION)
   ============================================================================== */
.filter-bar-grid,
.search-filter-grid {
  display: flex !important;
  flex-wrap: wrap !important;
  align-items: center !important;
  gap: 12px !important;
  margin-bottom: 20px !important;
}

.search-input-wrapper {
  position: relative !important;
  flex: 1 !important;
  min-width: 240px !important;
}

.search-input-wrapper i.search-icon {
  position: absolute !important;
  left: 14px !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  color: #94a3b8 !important;
  pointer-events: none !important;
}

.search-input-wrapper input {
  padding-left: 38px !important;
}

/* ==============================================================================
   GROUP 7: MODALS & DIALOG WINDOWS (GLOBAL STANDARDIZATION)
   ============================================================================== */
.db-modal-overlay,
.modal-backdrop {
  position: fixed !important;
  inset: 0 !important;
  background-color: rgba(15, 23, 42, 0.6) !important;
  backdrop-filter: blur(4px) !important;
  z-index: 9999 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 20px !important;
}

.db-modal-card,
.auth-modal {
  background: #ffffff !important;
  border-radius: 16px !important;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
  border: 1px solid #e2e8f0 !important;
  width: 100% !important;
  max-width: 600px !important;
  overflow: hidden !important;
  animation: modalPop 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

@keyframes modalPop {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.db-modal-header {
  padding: 16px 20px !important;
  border-bottom: 1px solid #e2e8f0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  background: #f8fafc !important;
}

.db-modal-footer {
  padding: 14px 20px !important;
  border-top: 1px solid #e2e8f0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: flex-end !important;
  gap: 10px !important;
  background: #f8fafc !important;
}

.db-modal-close-btn {
  background: transparent !important;
  border: none !important;
  color: #64748b !important;
  font-size: 18px !important;
  cursor: pointer !important;
  padding: 4px 8px !important;
  border-radius: 6px !important;
}

.db-modal-close-btn:hover {
  background: #e2e8f0 !important;
  color: #0f172a !important;
}

/* ==============================================================================
   GROUP 8: EMPTY STATES & TOAST BANNERS (GLOBAL STANDARDIZATION)
   ============================================================================== */
.no-results,
.lc-empty,
.todo-empty-state {
  padding: 40px 20px !important;
  text-align: center !important;
  color: #64748b !important;
  font-size: 14px !important;
}

.update-status-msg,
.paisa-toast,
.error-box {
  border-radius: 10px !important;
  padding: 12px 16px !important;
  font-size: 13.5px !important;
  font-weight: 500 !important;
  margin-top: 10px !important;
}

.paisa-toast.success,
.status-msg.success {
  background-color: #f0fdf4 !important;
  color: #15803d !important;
  border: 1px solid #bbf7d0 !important;
}

.paisa-toast.error,
.error-box {
  background-color: #fef2f2 !important;
  color: #b91c1c !important;
  border: 1px solid #fecaca !important;
}
'''

with open('d:/caseBook/components/global-rules.css', 'a', encoding='utf-8') as f:
    f.write(css_groups_2_8)

print("Appended Groups 2-8 Global CSS to components/global-rules.css successfully!")
