import React, { useState, useEffect } from 'react';

/**
 * Placeholder Icon Component
 * Replace with your project's real icon library / SVG components later.
 */
const Icon = ({ name, className = 'w-4 h-4' }) => (
  <span
    className={`inline-flex items-center justify-center shrink-0 ${className}`}
    data-icon={name}
    aria-hidden="true"
  >
    {/* Placeholder for icon: {name} */}
  </span>
);

/**
 * Profile Card (Top Section - Fixed)
 * Displays user avatar, initial, status dot, name, and designation.
 * No court badge as per specification.
 */
const ProfileCard = ({ isCollapsed = false }) => (
  <div className={`border-b border-adv-border dark:border-white/10 shrink-0 ${isCollapsed ? 'py-3 flex justify-center' : 'p-4'}`}>
    <div className={`transition-all cursor-pointer group flex items-center ${isCollapsed ? 'p-0 bg-transparent border-0' : 'rounded-xl p-3 bg-adv-bg dark:bg-white/5 border border-adv-border dark:border-white/10 hover:border-adv-light dark:hover:border-white/20 gap-3'}`}>
      {/* Avatar with initial letter and online dot */}
      <div className="relative shrink-0">
        <div className={`${isCollapsed ? 'w-10 h-10 text-sm' : 'w-12 h-12 text-base'} rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 border border-white/20 flex items-center justify-center text-white font-serif font-bold group-hover:scale-105 transition-transform`}>
          A
        </div>
        <span
          className="w-3 h-3 bg-emerald-500 rounded-full absolute -bottom-0.5 -right-0.5 border-2 border-white dark:border-[#0F172A]"
          title="Online"
        />
      </div>

      {/* Name & Designation (hidden when collapsed) */}
      {!isCollapsed && (
        <>
          <div className="min-w-0 flex-1">
            <h2 className="font-serif text-sm font-bold text-adv-ink dark:text-white truncate">
              Atul Kumar Mishra
            </h2>
            <p className="text-[11px] text-adv-muted dark:text-adv-light truncate mt-1">
              Advocate & Developer
            </p>
          </div>

          {/* Right Arrow Chevron */}
          <Icon
            name="chevron-right"
            className="w-4 h-4 text-adv-muted dark:text-adv-light group-hover:translate-x-0.5 transition-transform ml-auto shrink-0"
          />
        </>
      )}
    </div>
  </div>
);

/**
 * Section Header
 */
const SectionHeader = ({ title, isCollapsed = false }) => {
  if (isCollapsed) return null;
  return (
    <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-adv-light dark:text-adv-light/60">
      {title}
    </div>
  );
};

/**
 * Section Divider
 */
const Divider = ({ isCollapsed = false }) => (
  <hr className={`border-t border-adv-border dark:border-white/10 ${isCollapsed ? 'w-8 mx-auto my-2' : 'mx-6 my-4'}`} />
);

/**
 * Navigation Item
 */
const NavItem = ({ item, isActive, onClick, isCollapsed = false }) => {
  const showBadge = item.badge !== undefined && item.badge !== '0' && item.badge !== 0;

  return (
    <button
      type="button"
      onClick={() => onClick(item.id)}
      title={isCollapsed ? item.label : undefined}
      className={`relative transition-all cursor-pointer flex items-center justify-center ${
        isCollapsed
          ? `w-11 h-11 mx-auto my-1 rounded-xl ${
              isActive
                ? 'bg-adv-ink text-white shadow-md dark:bg-white/20 dark:text-white'
                : 'text-adv-body hover:bg-adv-bg hover:text-adv-ink dark:text-adv-light dark:hover:bg-white/10 dark:hover:text-white'
            }`
          : `w-full text-left gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm ${
              isActive
                ? 'bg-adv-ink text-white font-semibold border-l-4 border-adv-ink shadow-lg dark:bg-white/15 dark:text-white dark:border-white'
                : 'font-medium text-adv-body hover:bg-adv-bg hover:text-adv-ink dark:text-adv-light dark:hover:bg-white/10 dark:hover:text-white'
            }`
      }`}
    >
      <Icon name={item.icon} className="w-4 h-4 shrink-0" />
      {!isCollapsed && <span className="truncate flex-1">{item.label}</span>}
      {showBadge && (
        <span
          className={`${
            isCollapsed
              ? 'absolute top-1 right-1 min-w-[16px] h-4 px-1 text-[9px] font-bold rounded-full flex items-center justify-center bg-adv-ink text-white dark:bg-white dark:text-gray-900 shadow'
              : `px-2 py-0.5 text-[10px] font-bold rounded-full ml-auto shrink-0 ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-adv-bg text-adv-muted dark:bg-white/10 dark:text-adv-light'
                }`
          }`}
        >
          {item.badge}
        </span>
      )}
    </button>
  );
};

/**
 * Theme Toggle Component (Bottom Section - Fixed)
 * Full-width interactive row with Sun/Moon indicator and switch knob.
 */
const ThemeToggle = ({ isDark, onToggle, isCollapsed = false }) => (
  <div className={`border-t border-adv-border dark:border-white/10 shrink-0 ${isCollapsed ? 'py-3 flex justify-center' : 'p-4'}`}>
    {isCollapsed ? (
      <button
        type="button"
        onClick={onToggle}
        title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        className="w-11 h-11 rounded-xl flex items-center justify-center border border-adv-border dark:border-white/10 bg-adv-bg dark:bg-white/10 hover:bg-adv-border dark:hover:bg-white/20 transition-all cursor-pointer text-adv-ink dark:text-white"
      >
        <Icon name={isDark ? 'sun' : 'moon'} className="w-4 h-4" />
      </button>
    ) : (
      <button
        type="button"
        onClick={onToggle}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg border border-adv-border dark:border-white/10 bg-adv-bg dark:bg-white/10 hover:bg-adv-border dark:hover:bg-white/20 transition-all cursor-pointer w-full text-left"
      >
        {/* Left side: Icon + Label */}
        <div className="flex items-center gap-2.5">
          <Icon
            name={isDark ? 'sun' : 'moon'}
            className="w-4 h-4 text-adv-ink dark:text-white"
          />
          <span className="text-xs font-semibold text-adv-ink dark:text-white">
            {isDark ? 'Dark Mode' : 'Light Mode'}
          </span>
        </div>

        {/* Right side: Switch */}
        <div
          className={`w-11 h-6 rounded-full p-0.5 transition-colors relative flex items-center ${
            isDark ? 'bg-white/30' : 'bg-black/15'
          }`}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 transform ${
              isDark ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </div>
      </button>
    )}
  </div>
);

/**
 * Menu Sections Data (21 items in exact order)
 */
const MENU_SECTIONS = [
  {
    id: 'overview-schedule',
    title: 'OVERVIEW & SCHEDULE',
    items: [
      { id: 'home', label: 'Home Dashboard', icon: 'home' },
      { id: 'my-cases', label: 'My Cases', icon: 'document' },
      { id: 'cause-list', label: 'My Cause List', icon: 'clipboard', badge: 0 },
      { id: 'upcoming', label: 'Upcoming (7 Days)', icon: 'calendar', badge: 0 },
      { id: 'calendar', label: 'Calendar Scheduler', icon: 'calendar' }, // Default Active
      { id: 'todo', label: 'To-Do & Deadlines', icon: 'checklist', badge: 2 },
    ],
  },
  {
    id: 'case-workflow',
    title: 'CASE WORKFLOW',
    items: [
      { id: 'add-case', label: 'Add New Case', icon: 'plus' },
      { id: 'update-case', label: 'Update Case', icon: 'pencil' },
      { id: 'forward-dates', label: 'Forward Dates', icon: 'zap' },
      { id: 'transfer-case', label: 'Transfer Case', icon: 'transfer' },
      { id: 'delete-case', label: 'Delete Case', icon: 'trash' },
      { id: 'manage-courts', label: 'Manage Courts', icon: 'courthouse' },
      { id: 'court-helpers', label: 'Court Helpers Directory', icon: 'users', badge: 1 },
    ],
  },
  {
    id: 'finance-accounts',
    title: 'FINANCE & ACCOUNTS',
    items: [
      { id: 'paisa', label: 'Paisa Manager', icon: 'rupee', badge: 21 },
    ],
  },
  {
    id: 'case-registers',
    title: 'CASE REGISTERS',
    items: [
      { id: 'all-cases', label: 'All Cases', icon: 'list', badge: 55 },
      { id: 'case-cards', label: 'Case Cards', icon: 'grid', badge: 55 },
      { id: 'undated-cases', label: 'Undated Cases', icon: 'question', badge: 19 },
      { id: 'disposed-cases', label: 'Disposed Cases', icon: 'check-circle', badge: 1 },
    ],
  },
  {
    id: 'database-cloud',
    title: 'DATABASE & CLOUD SYNC',
    items: [
      { id: 'live-crud', label: 'Live CRUD (Simple)', icon: 'zap' },
    ],
  },
  {
    id: 'settings',
    title: 'SETTINGS',
    items: [
      { id: 'change-password', label: 'Change Password', icon: 'key' },
      { id: 'about-manual', label: 'About & Manual', icon: 'book' },
    ],
  },
];

/**
 * Main Sidebar Component
 * Collapsible left sidebar (w-72 expanded or w-[72px] collapsed) with profile, 21 menu items, and persistent dark/light mode toggle.
 */
export default function Sidebar({ activeItem = 'calendar', onNavigate, isCollapsed = false }) {
  // Navigation state with default active item "Calendar Scheduler"
  const [active, setActive] = useState(activeItem);

  // Theme state: defaults to dark mode, persists to localStorage
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('casebook-theme');
      if (stored !== null) {
        return stored === 'dark';
      }
    }
    return true; // Default: dark mode
  });

  // Apply dark mode class to <html> element
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('casebook-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('casebook-theme', 'light');
    }
  }, [isDark]);

  const handleToggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleItemClick = (id) => {
    setActive(id);
    if (typeof onNavigate === 'function') {
      onNavigate(id);
    }
  };

  return (
    <aside
      className={`${
        isCollapsed ? 'w-[72px]' : 'w-72'
      } fixed left-0 top-0 h-screen z-50 flex flex-col bg-white dark:bg-grad-nav border-r border-adv-border dark:border-white/10 select-none transition-all duration-200`}
      aria-label="Sidebar navigation"
    >
      {/* 1. Top Section: Profile Card (Fixed) */}
      <ProfileCard isCollapsed={isCollapsed} />

      {/* 2. Middle Section: Menu (Scrollable with custom thin scrollbar) */}
      <nav className={`flex-1 overflow-y-auto ${isCollapsed ? 'px-2 py-3' : 'px-4 py-4'} casebook-scrollbar`}>
        {MENU_SECTIONS.map((section, idx) => (
          <div key={section.id}>
            <SectionHeader title={section.title} isCollapsed={isCollapsed} />
            <div className="space-y-0.5 mb-2">
              {section.items.map((item) => (
                <NavItem
                  key={item.id}
                  item={item}
                  isActive={active === item.id}
                  onClick={handleItemClick}
                  isCollapsed={isCollapsed}
                />
              ))}
            </div>
            {/* Divider between sections, except after the last section */}
            {idx < MENU_SECTIONS.length - 1 && <Divider isCollapsed={isCollapsed} />}
          </div>
        ))}
      </nav>

      {/* 3. Bottom Section: Theme Toggle (Fixed) */}
      <ThemeToggle isDark={isDark} onToggle={handleToggleTheme} isCollapsed={isCollapsed} />
    </aside>
  );
}
