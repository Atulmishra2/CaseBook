:root {
/_ --- 1. Global Navigation & Chrome --- _/
--cb-nav-bg: #FFFFFF;
--cb-nav-text: #1E293B;
--cb-nav-icon: #2A7B77;
--cb-nav-hover: #F1F5F9;
--cb-sidenav-bg: #FFFFFF;
--cb-sidenav-text: #1E293B;
--cb-sidebar-active: #2A7B77;

/_ --- 2. Backgrounds & Surfaces --- _/
--cb-bg-body: #F4F7F9;
--cb-surface: #FFFFFF;
--cb-surface-alt: #F8FAFC;
--cb-border: #E2E8F0;

/_ --- 3. Typography --- _/
--cb-text-main: #1E293B;
--cb-text-muted: #64748B;
--cb-text-light: #94A3B8;

/_ --- 4. Buttons & Actions --- _/
--cb-btn-primary: #2A7B77;
--cb-btn-primary-hover: #1F5C59;
--cb-btn-secondary: #FFFFFF;
--cb-btn-danger: #DC2626;
--cb-fab: #2A7B77;

/_ --- 5. Badges & Status --- _/
--cb-badge-civil-bg: #E0F2FE;
--cb-badge-civil-text: #0369A1;
--cb-badge-criminal-bg: #FEE2E2;
--cb-badge-criminal-text: #B91C1C;
--cb-badge-revenue-bg: #FEF3C7;
--cb-badge-revenue-text: #B45309;
--cb-badge-family-bg: #F3E8FF;
--cb-badge-family-text: #6B21A8;
--cb-badge-todo-bg: #FFEDD5;
--cb-badge-todo-text: #C2410C;
--cb-badge-upcoming-bg: #DCFCE7;
--cb-badge-upcoming-text: #15803D;

/_ --- 6. Specialized Modules --- _/
--cb-paisa-credit: #10B981;
--cb-paisa-debit: #EF4444;
--cb-paisa-balance: #0F172A;
--cb-timeline-line: #CBD5E1;
--cb-whatsapp: #25D366;
}

/_ Example Usage matching your .md file components: _/
.top-header, .sidebar {
background-color: var(--cb-nav-bg);
color: var(--cb-nav-text);
}

.card, .modal, .table-card {
background-color: var(--cb-surface);
border: 1px solid var(--cb-border);
border-radius: 12px;
}

.primary-btn {
background-color: var(--cb-btn-primary);
color: white;
}
.primary-btn:hover {
background-color: var(--cb-btn-primary-hover);
}

.badge-civil {
background-color: var(--cb-badge-civil-bg);
color: var(--cb-badge-civil-text);
}
/_ ...etc _/
