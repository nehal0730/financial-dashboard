import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useFinance } from '../context/FinanceContext';
import { FaChartLine, FaMoon, FaSun } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa6';
import Dropdown from './Dropdown';

export default function Navbar({ onToggleSidebar }) {
  const { theme, toggleTheme, isDarkMode } = useTheme();
  const { userRole, setRole, filters, filterTransactions } = useFinance();
  const [isTopSearchOpen, setIsTopSearchOpen] = useState(false);
  const [topSearchValue, setTopSearchValue] = useState(filters.search || '');

  useEffect(() => {
    setTopSearchValue(filters.search || '');
  }, [filters.search]);

  const handleTopSearchChange = (event) => {
    const { value } = event.target;
    setTopSearchValue(value);
    filterTransactions({ search: value });
  };

  const handleTopSearchToggle = () => {
    setIsTopSearchOpen((current) => !current);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/80">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-300/20 via-transparent to-slate-400/20 dark:from-slate-400/10 dark:to-slate-500/10"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-3 sm:px-5 md:px-6 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onToggleSidebar}
              aria-label="Open sidebar"
              className="inline-flex items-center rounded-lg border border-slate-300 bg-white p-2.5 text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-700"
            >
              <FaBars size={14} />
            </button>

            <div className="group flex cursor-pointer items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-slate-500 to-sky-500 blur opacity-30 transition-opacity group-hover:opacity-45"></div>
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-slate-500 to-sky-500 shadow-md">
                  <FaChartLine className="text-white" size={16} />
                </div>
              </div>
              <div>
                <h1 className="bg-gradient-to-r from-slate-700 via-slate-600 to-sky-700 bg-clip-text text-xl font-bold text-transparent dark:from-slate-100 dark:via-slate-200 dark:to-sky-200">
                  FinanceHub
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">Smart Financial Dashboard</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-5 md:gap-8">
            <nav className="hidden items-center gap-8 md:flex">
              <a href="#" className="group relative text-sm font-medium text-slate-700 transition-colors hover:text-slate-900 dark:text-slate-200 dark:hover:text-white">
                Dashboard
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-slate-500 to-sky-500 transition-all group-hover:w-full"></span>
              </a>
              <a href="#" className="group relative text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                Analytics
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-slate-500 to-sky-500 transition-all group-hover:w-full"></span>
              </a>
              <a href="#" className="group relative text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                Settings
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-slate-500 to-sky-500 transition-all group-hover:w-full"></span>
              </a>
            </nav>

            <button
              type="button"
              onClick={toggleTheme}
              aria-pressed={isDarkMode}
              aria-label="Toggle dark mode"
              className="inline-flex items-center rounded-lg border border-slate-300 bg-white p-2.5 text-sm text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-700"
            >
              {theme === 'dark' ? <FaSun size={14} /> : <FaMoon size={14} />}
            </button>

            <div className="hidden items-center gap-2 md:flex">
              {isTopSearchOpen ? (
                <input
                  type="text"
                  value={topSearchValue}
                  onChange={handleTopSearchChange}
                  placeholder="Search date/category"
                  className="w-48 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 outline-none ring-sky-300 transition focus:ring dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              ) : null}
              <button
                type="button"
                onClick={handleTopSearchToggle}
                aria-label="Toggle top search"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-slate-100 px-3 py-1.5 text-sm text-slate-600 transition-all hover:border-slate-400 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            <Dropdown
              value={userRole}
              onChange={setRole}
              options={[
                { value: 'admin', label: 'Admin' },
                { value: 'viewer', label: 'Viewer' },
              ]}
              className="hidden w-[124px] md:block"
              menuWidthClass="w-[140px]"
            />

            <div className="group relative cursor-pointer">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-slate-400 to-sky-500 blur opacity-0 transition-opacity group-hover:opacity-30"></div>
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-slate-400 to-sky-500 font-semibold text-white shadow-md transition-all">
                A
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}


