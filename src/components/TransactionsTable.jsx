import { useMemo, useState } from 'react';
import AddTransactionModal from './AddTransactionModal';
import Dropdown from './Dropdown';
import { useFinance } from '../context/FinanceContext';
import { formatCurrency, formatDate } from '../utils/formatters';
import { exportToCSV, exportToJSON } from '../utils/exporters';
import { FaArrowTrendDown, FaArrowTrendUp, FaDownload, FaInbox, FaSortUp, FaSortDown } from 'react-icons/fa6';

export default function TransactionsTable() {
  const { transactions, filteredTransactions, filters, filterTransactions, sort, updateSort, userRole } = useFinance();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasAnyTransactions = transactions.length > 0;

  const renderHighlightedText = (text) => {
    const sourceText = String(text);
    const query = (filters.search || '').trim();

    if (!query) {
      return sourceText;
    }

    const lowerText = sourceText.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const index = lowerText.indexOf(lowerQuery);

    if (index === -1) {
      return sourceText;
    }

    const before = sourceText.slice(0, index);
    const match = sourceText.slice(index, index + query.length);
    const after = sourceText.slice(index + query.length);

    return (
      <>
        {before}
        <mark className="rounded bg-yellow-200/80 px-1 text-slate-900 dark:bg-yellow-500/30 dark:text-yellow-100">
          {match}
        </mark>
        {after}
      </>
    );
  };

  const categoryOptions = useMemo(() => {
    const unique = new Set(transactions.map((tx) => tx.category));
    return Array.from(unique).sort((a, b) => a.localeCompare(b));
  }, [transactions]);

  const handleSearchChange = (event) => {
    filterTransactions({ search: event.target.value });
  };

  const resetFilters = () => {
    filterTransactions({ search: '', type: 'all' });
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md sm:p-6 dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Transactions</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {userRole === 'viewer' ? ' Viewer mode is read-only.' : ' Admin mode can add transactions.'}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <label className="flex flex-col text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
            <div className='px-1'>Search</div>
            <input
              type="text"
              value={filters.search}
              onChange={handleSearchChange}
              placeholder="Food, Salary, 2026-04"
              className="mt-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none ring-sky-300 transition focus:ring dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </label>

          <label className="flex flex-col text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
            <div className='px-1'>Type</div>
            <Dropdown
              value={filters.type}
              onChange={(value) => filterTransactions({ type: value })}
              options={[
                { value: 'all', label: 'All' },
                { value: 'income', label: 'Income' },
                { value: 'expense', label: 'Expense' },
              ]}
              menuWidthClass="w-36"
              className="mt-1"
            />
          </label>

          <label className="flex flex-col text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
            <div className='px-1'>Sort By</div>
            <button
              type="button"
              onClick={() => updateSort(sort.field)}
              title={`Toggle sort order (Currently: ${sort.order === 'asc' ? 'Ascending' : 'Descending'})`}
              className="absolute left-0 top-0 h-0 w-0 opacity-0"
            />
            <div className="flex gap-2">
              <Dropdown
                value={sort.field}
                onChange={(value) => updateSort(value)}
                options={[
                  { value: 'date', label: 'Date' },
                  { value: 'amount', label: 'Amount' },
                  { value: 'category', label: 'Category' },
                ]}
                menuWidthClass="w-40"
                className="mt-1 flex-1"
              />
              <button
                type="button"
                onClick={() => updateSort(sort.field)}
                title={`Toggle sort order (Currently: ${sort.order === 'asc' ? 'Ascending' : 'Descending'})`}
                className="mt-1 inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm outline-none ring-sky-300 transition-all hover:border-slate-400 hover:bg-slate-50 focus:ring dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-700"
              >
                {sort.order === 'asc' ? <FaSortUp size={14} /> : <FaSortDown size={14} />}
              </button>
            </div>
          </label>

          {userRole === 'admin' ? (
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
            >
              Add Transaction
            </button>
          ) : null}

          {hasAnyTransactions ? (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => exportToCSV(filteredTransactions.length > 0 ? filteredTransactions : transactions)}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                title="Export as CSV"
              >
                <FaDownload size={12} />
                CSV
              </button>
              <button
                type="button"
                onClick={() => exportToJSON(filteredTransactions.length > 0 ? filteredTransactions : transactions)}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                title="Export as JSON"
              >
                <FaDownload size={12} />
                JSON
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="min-w-full text-sm">
          {filteredTransactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-slate-700 dark:bg-slate-800/40">
              <FaInbox className="mb-2 text-slate-400" size={22} />
              <p className="font-medium text-slate-700 dark:text-slate-200">
                {hasAnyTransactions ? 'No transactions match the current filters.' : 'No transactions available yet.'}
              </p>
              {hasAnyTransactions ? (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-3 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  Clear Filters
                </button>
              ) : null}
            </div>
          ) : (
            <div className="space-y-3 p-4 sm:p-6">
              {filteredTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 px-4 py-3 transition-all duration-200 hover:translate-x-0.5 hover:bg-slate-50 hover:shadow-sm sm:grid sm:grid-cols-3 sm:items-center dark:border-slate-700 dark:hover:bg-slate-800/60"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900 sm:text-base xl:text-base dark:text-slate-100">{renderHighlightedText(tx.category)}</p>
                    <p className="text-xs text-slate-500 sm:hidden dark:text-slate-400">
                      {renderHighlightedText(formatDate(tx.date))}
                    </p>
                  </div>

                  <p className="hidden text-sm font-medium text-slate-500 sm:block sm:justify-self-center xl:text-base dark:text-slate-400">
                    {renderHighlightedText(formatDate(tx.date))}
                  </p>

                  <span
                    className={`justify-self-start font-mono text-sm font-bold sm:justify-self-end sm:text-base xl:text-base ${
                      tx.type === 'income'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    {tx.type === 'income' ? <FaArrowTrendUp className="mr-1 inline" /> : <FaArrowTrendDown className="mr-1 inline" />}
                    {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categories={categoryOptions}
      />
    </section>
  );
}