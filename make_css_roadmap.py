html_content = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Global CSS Standardization Roadmap | CaseBook</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        body { font-family: 'Inter', system-ui, -apple-system, sans-serif; background-color: #f8fafc; color: #1e293b; }
        .status-queued { background-color: #f1f5f9; color: #64748b; border: 1px solid #cbd5e1; }
        .status-progress { background-color: #fef3c7; color: #d97706; border: 1px solid #fde68a; }
        .status-done { background-color: #dcfce7; color: #15803d; border: 1px solid #86efac; }
    </style>
</head>
<body class="p-6 md:p-10 max-w-7xl mx-auto">

    <!-- Header Banner -->
    <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-xl shadow-md">
                    <i class="fa-solid fa-palette"></i>
                </div>
                <div>
                    <h1 class="text-2xl font-bold text-slate-900">Global CSS & Component Standardization Roadmap</h1>
                    <p class="text-slate-500 text-sm">Tracking UI consistency across repeated HTML components (FontAwesome & Design Rules)</p>
                </div>
            </div>
        </div>
        <div class="flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-2 rounded-xl text-sm font-semibold">
            <i class="fa-solid fa-layer-group"></i> 8 Reusable Component Groups
        </div>
    </div>

    <!-- Roadmap Table -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-slate-50 text-slate-700 text-xs uppercase tracking-wider font-semibold border-b border-slate-200">
                        <th class="p-4 w-12 text-center">#</th>
                        <th class="p-4">Component Group Name</th>
                        <th class="p-4">Target HTML Classes & Elements</th>
                        <th class="p-4">Global CSS Objectives</th>
                        <th class="p-4 w-36 text-center">Status</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 text-sm">
                    <!-- Group 1 -->
                    <tr class="hover:bg-slate-50/80 transition-colors">
                        <td class="p-4 text-center font-bold text-slate-400">1</td>
                        <td class="p-4 font-semibold text-slate-800">
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-hand-pointer text-indigo-500"></i>
                                Buttons & Action Controls
                            </div>
                        </td>
                        <td class="p-4 text-slate-600 font-mono text-xs">
                            .primary-btn, .secondary-btn, .danger-btn, .table-view-btn, .edit-case-btn, .pill-btn
                        </td>
                        <td class="p-4 text-slate-600">
                            Uniform hover states, border-radius, active ripple/focus ring, crisp FontAwesome icon gaps.
                        </td>
                        <td class="p-4 text-center">
                            <span class="status-queued px-3 py-1 rounded-full text-xs font-semibold inline-block">Queued</span>
                        </td>
                    </tr>

                    <!-- Group 2 -->
                    <tr class="hover:bg-slate-50/80 transition-colors">
                        <td class="p-4 text-center font-bold text-slate-400">2</td>
                        <td class="p-4 font-semibold text-slate-800">
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-pen-to-square text-indigo-500"></i>
                                Form Controls & Inputs
                            </div>
                        </td>
                        <td class="p-4 text-slate-600 font-mono text-xs">
                            .form-group, input, select, textarea, .form-grid-2col, .form-grid-3col
                        </td>
                        <td class="p-4 text-slate-600">
                            Consistent padding, focus indigo outlines, label typography, select dropdown arrows.
                        </td>
                        <td class="p-4 text-center">
                            <span class="status-queued px-3 py-1 rounded-full text-xs font-semibold inline-block">Queued</span>
                        </td>
                    </tr>

                    <!-- Group 3 -->
                    <tr class="hover:bg-slate-50/80 transition-colors">
                        <td class="p-4 text-center font-bold text-slate-400">3</td>
                        <td class="p-4 font-semibold text-slate-800">
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-table text-indigo-500"></i>
                                Tables & Data Registers
                            </div>
                        </td>
                        <td class="p-4 text-slate-600 font-mono text-xs">
                            .case-table, .table-responsive, thead, th.table-actions-th, tr.clickable-row
                        </td>
                        <td class="p-4 text-slate-600">
                            Unified table borders, sticky headers, subtle row hover highlighting, responsive horizontal scroll.
                        </td>
                        <td class="p-4 text-center">
                            <span class="status-queued px-3 py-1 rounded-full text-xs font-semibold inline-block">Queued</span>
                        </td>
                    </tr>

                    <!-- Group 4 -->
                    <tr class="hover:bg-slate-50/80 transition-colors">
                        <td class="p-4 text-center font-bold text-slate-400">4</td>
                        <td class="p-4 font-semibold text-slate-800">
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-tag text-indigo-500"></i>
                                Status Badges & Chips
                            </div>
                        </td>
                        <td class="p-4 text-slate-600 font-mono text-xs">
                            .status-badge, .case-badge, .db-live-badge, .hero-status-pill
                        </td>
                        <td class="p-4 text-center font-mono text-xs text-slate-600">
                            Standardized pill padding, status colors (pending, disposed, civil, criminal), live status dot.
                        </td>
                        <td class="p-4 text-center">
                            <span class="status-queued px-3 py-1 rounded-full text-xs font-semibold inline-block">Queued</span>
                        </td>
                    </tr>

                    <!-- Group 5 -->
                    <tr class="hover:bg-slate-50/80 transition-colors">
                        <td class="p-4 text-center font-bold text-slate-400">5</td>
                        <td class="p-4 font-semibold text-slate-800">
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-id-card text-indigo-500"></i>
                                Hero Cards & KPI Containers
                            </div>
                        </td>
                        <td class="p-4 text-slate-600 font-mono text-xs">
                            .home-hero-card, .my-cases-header-card, .kpi-card, .stat-card, .tab-card-wrapper
                        </td>
                        <td class="p-4 text-slate-600">
                            Unified card border-radius (16px), subtle drop shadow, emblem badge positioning, title typography.
                        </td>
                        <td class="p-4 text-center">
                            <span class="status-queued px-3 py-1 rounded-full text-xs font-semibold inline-block">Queued</span>
                        </td>
                    </tr>

                    <!-- Group 6 -->
                    <tr class="hover:bg-slate-50/80 transition-colors">
                        <td class="p-4 text-center font-bold text-slate-400">6</td>
                        <td class="p-4 font-semibold text-slate-800">
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-filter text-indigo-500"></i>
                                Filters & Search Input Bars
                            </div>
                        </td>
                        <td class="p-4 text-slate-600 font-mono text-xs">
                            .filter-bar-grid, .search-filter-grid, .search-input-wrapper
                        </td>
                        <td class="p-4 text-slate-600">
                            Aligned multi-dropdown filter bar heights, magnifying glass search icon alignment, clear button.
                        </td>
                        <td class="p-4 text-center">
                            <span class="status-queued px-3 py-1 rounded-full text-xs font-semibold inline-block">Queued</span>
                        </td>
                    </tr>

                    <!-- Group 7 -->
                    <tr class="hover:bg-slate-50/80 transition-colors">
                        <td class="p-4 text-center font-bold text-slate-400">7</td>
                        <td class="p-4 font-semibold text-slate-800">
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-window-restore text-indigo-500"></i>
                                Modals & Dialog Windows
                            </div>
                        </td>
                        <td class="p-4 text-slate-600 font-mono text-xs">
                            .db-modal-overlay, .db-modal-card, .db-modal-header, .db-modal-footer, .db-modal-close-btn
                        </td>
                        <td class="p-4 text-slate-600">
                            Centered backdrop blur, modal animation pop, header/footer spacing, uniform close icon button.
                        </td>
                        <td class="p-4 text-center">
                            <span class="status-queued px-3 py-1 rounded-full text-xs font-semibold inline-block">Queued</span>
                        </td>
                    </tr>

                    <!-- Group 8 -->
                    <tr class="hover:bg-slate-50/80 transition-colors">
                        <td class="p-4 text-center font-bold text-slate-400">8</td>
                        <td class="p-4 font-semibold text-slate-800">
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-triangle-exclamation text-indigo-500"></i>
                                Empty States & Toast Banners
                            </div>
                        </td>
                        <td class="p-4 text-slate-600 font-mono text-xs">
                            .no-results, .lc-empty, .update-status-msg, .paisa-toast, .error-box
                        </td>
                        <td class="p-4 text-slate-600">
                            Clean placeholder graphic/icon containers, alert colors (success/error/warning), toast pop animation.
                        </td>
                        <td class="p-4 text-center">
                            <span class="status-queued px-3 py-1 rounded-full text-xs font-semibold inline-block">Queued</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

</body>
</html>
'''

with open('d:/caseBook/GLOBAL_CSS_ROADMAP.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("Created GLOBAL_CSS_ROADMAP.html successfully!")
