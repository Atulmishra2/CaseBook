window.__casebook_tabs = window.__casebook_tabs || {};
window.__casebook_tabs['undated'] = `<div class="section-header-row">
    <div class="section-title-box">
        <div class="section-icon-badge"><i class="fa-solid fa-clock-rotate-left"></i></div>
        <div>
            <h3>Undated Cases Register</h3>
            <p class="section-subtitle">Matters requiring new hearing dates, pending orders, or unscheduled list appearances</p>
            <div class="header-chips-row">
                <button type="button" class="header-chip-btn" onclick="showTab('hearing')"><i class="fa-solid fa-gavel"></i> Assign Hearing</button>
            </div>
        </div>
    </div>
</div>
<div class="section-header-row" style="margin-bottom: 12px;">
    <div class="section-title-box">
        <div class="section-icon-badge" style="background: rgba(2, 132, 199, 0.12); color: #0284c7;">
            <i class="fa-solid fa-calendar-xmark"></i>
        </div>
        <div>
            <h3>Undated Cases</h3>
            <p class="section-subtitle">Matters requiring immediate hearing fixtures or date updates. Scroll horizontally to view all particulars.</p>
        </div>
    </div>
</div>
<div class="table-responsive overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-900/5">
    <table id="undatedCasesTable" class="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700 case-table">
        <thead class="bg-slate-50 text-slate-700 font-semibold text-xs uppercase tracking-wider">
            <tr>
                <th>Case Number</th>
                <th style="width: 100%;">Case Name</th>
                <th>Client</th>
                <th>Case Type</th>
                <th>Court</th>
                <th>Filing Date</th>
                <th>Last / Scheduled Date</th>
                <th class="table-actions-th" style="width: 84px !important; min-width: 84px !important; max-width: 84px !important; padding: 4px 8px !important; text-align: center; white-space: nowrap !important;"><i class="fa-solid fa-bolt"></i></th>
            </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 bg-white"></tbody>
    </table>
</div>
`;
