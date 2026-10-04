import React, { useState } from 'react';

/**
 * ==============================================================================
 * CaseBook - Court Staff & Helpers Directory Screen
 * Mobile-First, Responsive React + Tailwind CSS Implementation
 * ==============================================================================
 */

/**
 * Placeholder Icon Component
 * Renders semantic SVG glyphs while preserving data-icon attribute for later replacement.
 */
export const Icon = ({ name, className = '' }) => {
  const getIconSvg = (iconName) => {
    switch (iconName) {
      case 'menu':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        );
      case 'scale':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3-1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7H3m15-1l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M18 7l3-1m0 0l-3 9a5.002 5.002 0 006.001 0M18 7h-3m-3-4v18m-4 0h8"
          />
        );
      case 'search':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        );
      case 'download':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        );
      case 'users':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        );
      case 'user-plus':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
          />
        );
      case 'courthouse':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 14v5m4-5v5m4-5v5M3 10h18M3 7l9-4 9 4M4 10h16v10H4V10z"
          />
        );
      case 'refresh':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        );
      case 'file-export':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        );
      case 'phone':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        );
      case 'pencil':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        );
      case 'trash':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        );
      case 'home':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        );
      case 'tasks':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        );
      case 'rupee':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 8h6m-5 0a3 3 0 110 6H9m0-6V4m0 10l5 6M6 4h10"
          />
        );
      case 'history':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        );
      case 'more':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
          />
        );
      case 'check-circle':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        );
      case 'alert-triangle':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        );
      case 'clipboard-check':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        );
      default:
        return (
          <circle cx="12" cy="12" r="9" strokeWidth="2" />
        );
    }
  };

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      data-icon={name}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        {getIconSvg(name)}
      </svg>
    </span>
  );
};

/**
 * 1. TOP NAVIGATION BAR
 */
export const TopNav = ({ onSearchClick, onDownloadClick }) => {
  return (
    <header className="sticky top-0 z-40 bg-grad-nav h-14 border-b border-white/10 shadow-sm">
      <div className="max-w-6xl mx-auto h-full px-4 flex items-center justify-between">
        {/* Left: Hamburger menu + Logo Icon + App Title */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="p-1.5 -ml-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <Icon name="menu" className="w-5 h-5 text-white" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/15">
              <Icon name="scale" className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="font-serif font-bold text-white text-lg tracking-tight">
              CaseBook
            </span>
          </div>
        </div>

        {/* Right: Search & Download Icons */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onSearchClick}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
            title="Search directory"
            aria-label="Search directory"
          >
            <Icon name="search" className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onDownloadClick}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
            title="Download records"
            aria-label="Download records"
          >
            <Icon name="download" className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

/**
 * 2. HERO BANNER
 */
export const HeroBanner = () => {
  return (
    <section className="bg-grad-nav rounded-xl p-5 shadow-sm text-white">
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
          <Icon name="users" className="w-5 h-5 text-white" />
        </div>
        <div className="min-w-0">
          <h1 className="font-serif text-lg font-bold text-white leading-tight">
            Court Staff & Helpers Directory
          </h1>
          <p className="text-xs text-adv-light mt-0.5 truncate sm:whitespace-normal">
            Chambers directory for court readers, clerks, and support staff
          </p>
        </div>
      </div>
    </section>
  );
};

/**
 * 3. STATUS BAR
 */
export const StatusBar = ({ count = 1 }) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Pill 1: Cloud Synced */}
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 border border-emerald-200 text-emerald-700">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        Cloud Synced
      </span>

      {/* Pill 2: Registered Count */}
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-adv-surface border border-adv-border text-adv-muted">
        {count} {count === 1 ? 'Helper' : 'Helpers'} Registered
      </span>
    </div>
  );
};

/**
 * 4. ADD WORKER FORM
 */
export const AddWorkerForm = ({ onAddWorker, editingWorker, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    court: '',
    position: '',
    mobile: '',
  });

  // Load editing worker data if edit mode is active
  React.useEffect(() => {
    if (editingWorker) {
      setFormData({
        name: editingWorker.name || '',
        court: editingWorker.court || '',
        position: editingWorker.position || '',
        mobile: editingWorker.mobile || '',
      });
    }
  }, [editingWorker]);

  const courtOptions = [
    'A.C.J.M-FTC / A.C.J. Sr./FTC',
    'Civil Judge (Jr. Div.)',
    'District & Sessions Court',
    'High Court',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.court || !formData.position.trim() || !formData.mobile.trim()) {
      return;
    }

    onAddWorker({
      ...formData,
      id: editingWorker ? editingWorker.id : Date.now().toString(),
      status: 'Active',
      initial: formData.name.trim().charAt(0).toUpperCase() || 'W',
    });

    // Reset form after saving
    setFormData({
      name: '',
      court: '',
      position: '',
      mobile: '',
    });
  };

  return (
    <div className="bg-adv-surface border border-adv-border rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-adv-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-adv-bg border border-adv-border flex items-center justify-center text-adv-ink shrink-0">
            <Icon name="user-plus" className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-serif text-sm font-bold text-adv-ink">
              {editingWorker ? 'Edit Worker Details' : 'Add Worker to Directory'}
            </h2>
            <p className="text-[11px] text-adv-muted mt-0.5">
              Enter worker's full name, court, and mobile number
            </p>
          </div>
        </div>

        {editingWorker && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="text-xs text-adv-muted hover:text-adv-ink underline font-medium"
          >
            Cancel Edit
          </button>
        )}
      </div>

      {/* Body */}
      <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Row 1 - Field 1: Worker / Staff Name */}
          <div>
            <label
              htmlFor="worker-name"
              className="block text-[10px] font-bold text-adv-muted uppercase tracking-wider mb-1.5"
            >
              Worker / Staff Name <span className="text-adv-ink">*</span>
            </label>
            <input
              id="worker-name"
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Ramesh Chandra"
              className="w-full px-3 py-2.5 bg-adv-bg border border-adv-border rounded-lg text-sm text-adv-ink placeholder-adv-light focus:outline-none focus:border-adv-ink focus:ring-2 focus:ring-adv-ink/10 transition-colors"
            />
          </div>

          {/* Row 1 - Field 2: Court / Forum */}
          <div>
            <label
              htmlFor="worker-court"
              className="block text-[10px] font-bold text-adv-muted uppercase tracking-wider mb-1.5"
            >
              Court / Forum <span className="text-adv-ink">*</span>
            </label>
            <select
              id="worker-court"
              name="court"
              required
              value={formData.court}
              onChange={handleChange}
              className="w-full px-3 py-2.5 bg-adv-bg border border-adv-border rounded-lg text-sm text-adv-ink placeholder-adv-light focus:outline-none focus:border-adv-ink focus:ring-2 focus:ring-adv-ink/10 transition-colors"
            >
              <option value="" disabled>
                Select Court / Forum...
              </option>
              {courtOptions.map((court) => (
                <option key={court} value={court}>
                  {court}
                </option>
              ))}
            </select>
          </div>

          {/* Row 2 - Field 3: Position / Role */}
          <div>
            <label
              htmlFor="worker-position"
              className="block text-[10px] font-bold text-adv-muted uppercase tracking-wider mb-1.5"
            >
              Position / Role <span className="text-adv-ink">*</span>
            </label>
            <input
              id="worker-position"
              type="text"
              name="position"
              required
              value={formData.position}
              onChange={handleChange}
              placeholder="e.g. Reader, Ahlmad, Peon, Steno"
              className="w-full px-3 py-2.5 bg-adv-bg border border-adv-border rounded-lg text-sm text-adv-ink placeholder-adv-light focus:outline-none focus:border-adv-ink focus:ring-2 focus:ring-adv-ink/10 transition-colors"
            />
          </div>

          {/* Row 2 - Field 4: Mobile Number */}
          <div>
            <label
              htmlFor="worker-mobile"
              className="block text-[10px] font-bold text-adv-muted uppercase tracking-wider mb-1.5"
            >
              Mobile Number <span className="text-adv-ink">*</span>
            </label>
            <input
              id="worker-mobile"
              type="tel"
              name="mobile"
              required
              pattern="[0-9+\- ]{10,15}"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="10-digit mobile (e.g. 9876543210)"
              className="w-full px-3 py-2.5 bg-adv-bg border border-adv-border rounded-lg text-sm text-adv-ink placeholder-adv-light focus:outline-none focus:border-adv-ink focus:ring-2 focus:ring-adv-ink/10 transition-colors"
            />
          </div>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="w-full bg-grad-primary text-white text-sm font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-sm"
        >
          <Icon name="user-plus" className="w-4 h-4 text-white" />
          <span>{editingWorker ? 'Update Worker Details' : 'Save Worker to Directory'}</span>
        </button>
      </form>
    </div>
  );
};

/**
 * 5. SEARCH + FILTER BAR
 */
export const SearchFilterBar = ({
  searchQuery,
  onSearchChange,
  selectedCourt,
  onCourtFilterChange,
  onSyncDb,
  onExportCsv,
  isSyncing,
}) => {
  const courts = [
    'All Courts',
    'A.C.J.M-FTC / A.C.J. Sr./FTC',
    'Civil Judge (Jr. Div.)',
    'District & Sessions Court',
    'High Court',
  ];

  return (
    <div className="space-y-3">
      {/* Search Input Bar */}
      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-adv-muted flex items-center justify-center">
          <Icon name="search" className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name, court, position, or mobile..."
          className="w-full pl-10 pr-4 py-2.5 bg-adv-surface border border-adv-border rounded-lg text-sm text-adv-ink placeholder-adv-light focus:outline-none focus:border-adv-ink focus:ring-2 focus:ring-adv-ink/10 transition-colors shadow-sm"
        />
      </div>

      {/* Filter Chips Container */}
      <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1 md:overflow-x-visible md:flex-wrap">
        {/* Chip 1: Court Filter Dropdown / Chip */}
        <div className="relative shrink-0">
          <select
            value={selectedCourt}
            onChange={(e) => onCourtFilterChange(e.target.value)}
            className="appearance-none shrink-0 pl-7 pr-7 py-2 bg-adv-surface border border-adv-border rounded-lg text-xs font-semibold text-adv-ink hover:bg-adv-bg transition-colors cursor-pointer focus:outline-none focus:border-adv-ink"
            title="Filter by court"
          >
            {courts.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <div className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-adv-ink">
            <Icon name="courthouse" className="w-3.5 h-3.5" />
          </div>
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-adv-muted text-[9px]">
            ▼
          </div>
        </div>

        {/* Chip 2: Sync DB */}
        <button
          type="button"
          onClick={onSyncDb}
          disabled={isSyncing}
          className="shrink-0 px-3 py-2 bg-adv-surface border border-adv-border rounded-lg text-xs font-semibold text-adv-ink hover:bg-adv-bg transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          <Icon
            name="refresh"
            className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`}
          />
          <span>{isSyncing ? 'Syncing...' : 'Sync DB'}</span>
        </button>

        {/* Chip 3: Export CSV */}
        <button
          type="button"
          onClick={onExportCsv}
          className="shrink-0 px-3 py-2 bg-adv-surface border border-adv-border rounded-lg text-xs font-semibold text-adv-ink hover:bg-adv-bg transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Icon name="file-export" className="w-3.5 h-3.5" />
          <span>Export CSV</span>
        </button>
      </div>
    </div>
  );
};

/**
 * 6. WORKER CARD
 */
export const WorkerCard = ({ worker, onEdit, onDelete }) => {
  const initialLetter = worker.initial || worker.name?.charAt(0).toUpperCase() || 'H';

  return (
    <div className="bg-adv-surface border border-adv-border rounded-xl p-4 hover:shadow-md hover:border-adv-light transition-all">
      {/* Top Row: Avatar + Info */}
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 border border-white/20 flex items-center justify-center shrink-0 shadow-sm">
          <span className="font-serif text-base font-bold text-white leading-none">
            {initialLetter}
          </span>
        </div>

        {/* Info Block */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-serif text-sm font-bold text-adv-ink truncate">
                {worker.name}
              </h3>
              <p className="text-[11px] text-adv-muted mt-0.5 truncate">
                {worker.position}
              </p>
            </div>

            {/* Active Badge */}
            <span className="shrink-0 px-2 py-0.5 text-[9px] font-bold bg-adv-bg text-adv-muted border border-adv-border rounded-full uppercase tracking-wider">
              {worker.status || 'Active'}
            </span>
          </div>

          {/* Court Info Row */}
          <div className="flex items-center gap-1.5 mt-2 text-[10px] text-adv-muted">
            <Icon name="courthouse" className="w-3 h-3 shrink-0" />
            <span className="truncate">{worker.court}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-adv-border">
        {/* Button 1: Call */}
        <a
          href={worker.mobile ? `tel:${worker.mobile}` : '#'}
          className="flex-1 py-2 bg-adv-bg hover:bg-adv-border text-adv-ink text-[11px] font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
          title={`Call ${worker.name} (${worker.mobile})`}
        >
          <Icon name="phone" className="w-3.5 h-3.5 text-adv-ink" />
          <span>Call</span>
        </a>

        {/* Button 2: Edit */}
        <button
          type="button"
          onClick={() => onEdit(worker)}
          className="flex-1 py-2 bg-adv-bg hover:bg-adv-border text-adv-ink text-[11px] font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
          title={`Edit ${worker.name}`}
        >
          <Icon name="pencil" className="w-3.5 h-3.5 text-adv-ink" />
          <span>Edit</span>
        </button>

        {/* Button 3: Delete */}
        <button
          type="button"
          onClick={() => onDelete(worker.id)}
          className="w-10 py-2 bg-adv-bg hover:bg-red-50 text-adv-muted hover:text-red-600 rounded-lg flex items-center justify-center transition-colors"
          title={`Delete ${worker.name}`}
          aria-label={`Delete ${worker.name}`}
        >
          <Icon name="trash" className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

/**
 * 7. BOTTOM NAVIGATION (Mobile Only)
 */
export const BottomNav = ({ activeTab = 'MORE', onTabSelect }) => {
  const tabs = [
    { id: 'HOME', label: 'HOME', icon: 'home' },
    { id: 'TASKS', label: 'TASKS', icon: 'tasks' },
    { id: 'PAISA', label: 'PAISA', icon: 'rupee' },
    { id: 'HISTORY', label: 'HISTORY', icon: 'history' },
    { id: 'MORE', label: 'MORE', icon: 'more' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-adv-surface border-t border-adv-border md:hidden z-40 h-16 shadow-lg">
      <div className="grid grid-cols-5 h-full items-center">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabSelect && onTabSelect(tab.id)}
              className={`flex flex-col items-center justify-center gap-1 h-full transition-colors ${
                isActive
                  ? 'text-adv-ink font-bold'
                  : 'text-adv-muted hover:text-adv-ink font-semibold'
              }`}
            >
              <Icon name={tab.icon} className="w-5 h-5" />
              <span className="text-[10px] tracking-wider uppercase leading-none">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

/**
 * Main Screen Component: CourtHelpers
 */
export default function CourtHelpers() {
  // Sample card data provided in specification
  const initialWorkers = [
    {
      id: '1',
      name: 'Hamid Ali',
      position: 'Peon / Orderly (चपरासी)',
      court: 'A.C.J.M-FTC / A.C.J. Sr./FTC',
      mobile: '9876543210',
      status: 'Active',
      initial: 'H',
    },
  ];

  const [workers, setWorkers] = useState(initialWorkers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourt, setSelectedCourt] = useState('All Courts');
  const [isSyncing, setIsSyncing] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [editingWorker, setEditingWorker] = useState(null);
  const [mobileTab, setMobileTab] = useState('MORE');

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Add or update worker
  const handleAddWorker = (workerData) => {
    if (editingWorker) {
      setWorkers((prev) =>
        prev.map((w) => (w.id === workerData.id ? { ...w, ...workerData } : w))
      );
      setEditingWorker(null);
      showToast(`Updated "${workerData.name}" successfully!`);
    } else {
      setWorkers((prev) => [workerData, ...prev]);
      showToast(`Added "${workerData.name}" to directory!`);
    }
  };

  // Delete worker
  const handleDeleteWorker = (workerId) => {
    const target = workers.find((w) => w.id === workerId);
    setWorkers((prev) => prev.filter((w) => w.id !== workerId));
    if (editingWorker && editingWorker.id === workerId) {
      setEditingWorker(null);
    }
    showToast(`Removed "${target ? target.name : 'Worker'}" from directory.`);
  };

  // Edit worker
  const handleEditWorker = (worker) => {
    setEditingWorker(worker);
    // Smooth scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync DB simulation
  const handleSyncDb = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      showToast('Database synchronized with cloud records.');
    }, 800);
  };

  // Export CSV
  const handleExportCsv = () => {
    if (filteredWorkers.length === 0) {
      showToast('No records available to export.');
      return;
    }

    const headers = ['Name', 'Position', 'Court', 'Mobile', 'Status'];
    const rows = filteredWorkers.map((w) => [
      `"${w.name.replace(/"/g, '""')}"`,
      `"${w.position.replace(/"/g, '""')}"`,
      `"${w.court.replace(/"/g, '""')}"`,
      `"${w.mobile}"`,
      `"${w.status || 'Active'}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'court_staff_directory.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Exported CSV successfully!');
  };

  // Filtered workers list
  const filteredWorkers = workers.filter((worker) => {
    const matchesSearch =
      worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.court.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (worker.mobile && worker.mobile.includes(searchQuery));

    const matchesCourt =
      selectedCourt === 'All Courts' || worker.court === selectedCourt;

    return matchesSearch && matchesCourt;
  });

  return (
    <div className="min-h-screen bg-adv-bg text-adv-ink flex flex-col font-sans antialiased selection:bg-adv-ink selection:text-white">
      {/* 1. TOP NAVIGATION BAR */}
      <TopNav
        onSearchClick={() => {
          const searchInput = document.querySelector('input[placeholder*="Search by name"]');
          if (searchInput) searchInput.focus();
        }}
        onDownloadClick={handleExportCsv}
      />

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto w-full px-4 pt-5 pb-24 md:pb-8 flex-1 space-y-5">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-16 right-4 z-50 bg-adv-ink text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 border border-white/10 animate-fade-in">
            <Icon name="check-circle" className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* 2. HERO BANNER */}
        <HeroBanner />

        {/* 3. STATUS BAR */}
        <StatusBar count={workers.length} />

        {/* 4. ADD WORKER FORM */}
        <AddWorkerForm
          onAddWorker={handleAddWorker}
          editingWorker={editingWorker}
          onCancelEdit={() => setEditingWorker(null)}
        />

        {/* 5. SEARCH + FILTER BAR */}
        <SearchFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCourt={selectedCourt}
          onCourtFilterChange={setSelectedCourt}
          onSyncDb={handleSyncDb}
          onExportCsv={handleExportCsv}
          isSyncing={isSyncing}
        />

        {/* 6. WORKER CARDS (LIST) */}
        <section className="space-y-3" aria-label="Worker Directory">
          {filteredWorkers.length > 0 ? (
            filteredWorkers.map((worker) => (
              <WorkerCard
                key={worker.id}
                worker={worker}
                onEdit={handleEditWorker}
                onDelete={handleDeleteWorker}
              />
            ))
          ) : (
            <div className="bg-adv-surface border border-adv-border rounded-xl p-8 text-center">
              <div className="w-10 h-10 rounded-full bg-adv-bg border border-adv-border flex items-center justify-center mx-auto text-adv-muted mb-2">
                <Icon name="search" className="w-5 h-5" />
              </div>
              <p className="font-serif text-sm font-bold text-adv-ink">
                No matching helpers found
              </p>
              <p className="text-xs text-adv-muted mt-1">
                Try adjusting your search query or court filter.
              </p>
            </div>
          )}
        </section>
      </main>

      {/* 7. BOTTOM NAVIGATION (Mobile Only) */}
      <BottomNav
        activeTab={mobileTab}
        onTabSelect={(tabId) => setMobileTab(tabId)}
      />
    </div>
  );
}
