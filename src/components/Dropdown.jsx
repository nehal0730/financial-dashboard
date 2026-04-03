import { useEffect, useRef, useState } from 'react';
import { FaCheck, FaChevronDown } from 'react-icons/fa6';

export default function Dropdown({ value, onChange, options, label, className = '', menuWidthClass = 'w-40' }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const activeOption = options.find((option) => option.value === value) || options[0];

  const handleSelect = (nextValue) => {
    onChange(nextValue);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white py-2 pl-3 pr-3 text-sm font-semibold text-slate-700 shadow-sm outline-none ring-sky-300 transition-all hover:border-slate-400 focus:ring dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-slate-600"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex-1 text-left">{activeOption.label}</span>
        <FaChevronDown
          size={11}
          className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen ? (
        <div
          role="listbox"
          className={`absolute right-0 z-[80] mt-2 ${menuWidthClass} overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900`}
        >
          {options.map((option) => {
            const isActive = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors ${
                  isActive
                    ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <span>{option.label}</span>
                {isActive ? <FaCheck size={11} /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
