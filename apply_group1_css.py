css_rules = '''

/* ==============================================================================
   GROUP 1: BUTTONS & ACTION CONTROLS (GLOBAL STANDARDIZATION)
   Unified Buttons System: FontAwesome alignment, uniform border-radius (10px),
   interactive state feedback (hover, active scale, focus-visible indigo ring),
   and distinct typography across all action button variants.
   ============================================================================== */

/* Base Action Button Reset & Flex Alignment */
button,
.primary-btn,
.secondary-btn,
.danger-btn,
.table-view-btn,
.edit-case-btn,
.action-btn,
.pill-btn,
.hero-btn-primary,
.hero-btn-secondary {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 8px !important;
  font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
  font-weight: 600 !important;
  text-decoration: none !important;
  cursor: pointer !important;
  user-select: none !important;
  transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1) !important;
  box-sizing: border-box !important;
  outline: none !important;
}

/* Ensure FontAwesome icons inside buttons match button color and scale properly */
button i,
.primary-btn i,
.secondary-btn i,
.danger-btn i,
.table-view-btn i,
.edit-case-btn i,
.action-btn i,
.hero-btn-primary i,
.hero-btn-secondary i {
  font-size: 1.05em;
  transition: transform 0.18s ease;
}

/* Active Press Bounce Feedback across all buttons */
button:active,
.primary-btn:active,
.secondary-btn:active,
.danger-btn:active,
.table-view-btn:active,
.hero-btn-primary:active,
.hero-btn-secondary:active {
  transform: translateY(1px) scale(0.98) !important;
}

/* Focus Ring for Keyboard Accessibility */
button:focus-visible,
.primary-btn:focus-visible,
.secondary-btn:focus-visible,
.danger-btn:focus-visible {
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.35) !important;
}

/* --- 1A. Primary Buttons (.primary-btn, .hero-btn-primary, .login-submit-btn) --- */
.primary-btn,
.hero-btn-primary,
.login-submit-btn {
  background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%) !important;
  color: #ffffff !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  border-radius: 10px !important;
  padding: 10px 20px !important;
  font-size: 14px !important;
  letter-spacing: 0.01em !important;
  box-shadow: 0 2px 6px rgba(67, 56, 202, 0.25), 0 1px 2px rgba(0, 0, 0, 0.05) !important;
}

.primary-btn:hover,
.hero-btn-primary:hover,
.login-submit-btn:hover {
  background: linear-gradient(135deg, #4338ca 0%, #3730a3 100%) !important;
  box-shadow: 0 4px 12px rgba(67, 56, 202, 0.35), 0 2px 4px rgba(0, 0, 0, 0.08) !important;
  transform: translateY(-1px) !important;
}

/* --- 1B. Secondary Outline/Ghost Buttons (.secondary-btn, .hero-btn-secondary) --- */
.secondary-btn,
.hero-btn-secondary {
  background: #ffffff !important;
  color: #334155 !important;
  border: 1.5px solid #cbd5e1 !important;
  border-radius: 10px !important;
  padding: 9px 18px !important;
  font-size: 13.5px !important;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04) !important;
}

.secondary-btn:hover,
.hero-btn-secondary:hover {
  background: #f8fafc !important;
  color: #1e293b !important;
  border-color: #94a3b8 !important;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.06) !important;
  transform: translateY(-1px) !important;
}

/* --- 1C. Danger/Destructive Action Buttons (.danger-btn, .delete-btn) --- */
.danger-btn,
.delete-btn {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%) !important;
  color: #ffffff !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  border-radius: 10px !important;
  padding: 9px 18px !important;
  font-size: 13.5px !important;
  box-shadow: 0 2px 6px rgba(220, 38, 38, 0.22) !important;
}

.danger-btn:hover,
.delete-btn:hover {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%) !important;
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.32) !important;
  transform: translateY(-1px) !important;
}

/* --- 1D. Table Inline Action Buttons (.table-view-btn, .edit-case-btn, .action-btn) --- */
.table-view-btn,
.edit-case-btn,
.action-btn {
  background: #f1f5f9 !important;
  color: #475569 !important;
  border: 1px solid #e2e8f0 !important;
  border-radius: 8px !important;
  padding: 5px 12px !important;
  font-size: 12.5px !important;
  font-weight: 600 !important;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03) !important;
}

.table-view-btn:hover,
.edit-case-btn:hover,
.action-btn:hover {
  background: #e0e7ff !important;
  color: #3730a3 !important;
  border-color: #c7d2fe !important;
}

.table-view-btn i,
.edit-case-btn i,
.action-btn i {
  color: #4f46e5 !important;
}

/* --- 1E. Pill/Filter Switcher Buttons (.pill-btn, .filter-tab-btn) --- */
.pill-btn,
.filter-tab-btn {
  background: #f8fafc !important;
  color: #64748b !important;
  border: 1px solid #e2e8f0 !important;
  border-radius: 9999px !important;
  padding: 6px 14px !important;
  font-size: 12.5px !important;
  font-weight: 500 !important;
}

.pill-btn.active,
.filter-tab-btn.active,
.pill-btn:hover,
.filter-tab-btn:hover {
  background: #e0e7ff !important;
  color: #3730a3 !important;
  border-color: #818cf8 !important;
  font-weight: 600 !important;
}

/* --- 1F. Disabled State for All Buttons --- */
button:disabled,
.primary-btn:disabled,
.secondary-btn:disabled,
.danger-btn:disabled {
  opacity: 0.55 !important;
  cursor: not-allowed !important;
  transform: none !important;
  box-shadow: none !important;
}
'''

with open('d:/caseBook/components/global-rules.css', 'a', encoding='utf-8') as f:
    f.write(css_rules)

print("Appended Group 1 Buttons Global CSS to components/global-rules.css successfully!")
