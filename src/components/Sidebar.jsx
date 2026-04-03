import { useEffect, useState } from 'react';
import { FaChartPie, FaGear, FaHouse, FaLightbulb, FaTableList, FaUserShield, FaXmark } from 'react-icons/fa6';
import { useFinance } from '../context/FinanceContext';
import Dropdown from './Dropdown';

export default function Sidebar({ isOpen, onClose }) {
  const { userRole, setRole } = useFinance();
  const [activeSection, setActiveSection] = useState('overview');

  const navItems = [
    { id: 'overview', label: 'Overview', icon: FaHouse },
    { id: 'charts', label: 'Charts', icon: FaChartPie },
    { id: 'insights', label: 'Insights', icon: FaLightbulb },
    { id: 'transactions-table', label: 'Transactions', icon: FaTableList },
  ];

  useEffect(() => {
    const updateActiveSection = () => {
      let currentSection = 'overview';

      navItems.forEach((item) => {
        const section = document.getElementById(item.id);
        if (!section) {
          return;
        }

        const rect = section.getBoundingClientRect();
        if (rect.top <= 130) {
          currentSection = item.id;
        }
      });

      setActiveSection(currentSection);
    };

    const updateFromHash = () => {
      const hashValue = window.location.hash.replace('#', '');
      if (hashValue) {
        setActiveSection(hashValue);
      }
    };

    updateActiveSection();
    updateFromHash();

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('hashchange', updateFromHash);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('hashchange', updateFromHash);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        aria-label="Close sidebar overlay"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-slate-900/40 transition-opacity ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-[86%] max-w-[300px] border-r border-slate-200 bg-white/95 p-4 backdrop-blur-xl transition-transform duration-300 sm:p-5 dark:border-slate-700 dark:bg-slate-900/95 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Navigation</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-md p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <FaXmark size={16} />
          </button>
        </div>

        <div className="flex h-[calc(100%-56px)] flex-col justify-between">
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">Main</p>
              <nav className="mt-3 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;

                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={onClose}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                        isActive
                          ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300'
                          : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Icon size={12} />
                      {item.label}
                    </a>
                  );
                })}
              </nav>
            </div>

            <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">Workspace</p>
              <div className="mt-2 space-y-3 text-slate-800 dark:text-slate-100">
                <div className="flex items-center gap-2">
                  <FaUserShield className="text-sky-500" size={14} />
                  <span className="font-semibold capitalize">Role: {userRole}</span>
                </div>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                  Switch Role
                  <Dropdown
                    value={userRole}
                    onChange={setRole}
                    options={[
                      { value: 'admin', label: 'Admin' },
                      { value: 'viewer', label: 'Viewer' },
                    ]}
                    className="mt-1 w-full"
                    menuWidthClass="w-full"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <FaGear size={12} />
              Settings
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
