import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaXmark } from 'react-icons/fa6';
import { useFinance } from '../context/FinanceContext';

const today = () => new Date().toISOString().split('T')[0];

export default function AddTransactionModal({ isOpen, onClose, categories }) {
  const { addTransaction } = useFinance();
  const [formState, setFormState] = useState({
    date: today(),
    amount: '',
    category: categories[0] || 'Food',
    type: 'expense',
    note: '',
  });

  useEffect(() => {
    if (isOpen) {
      setFormState((current) => ({
        ...current,
        date: today(),
        category: categories[0] || current.category || 'Food',
      }));
    }
  }, [isOpen, categories]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const amountValue = Number(formState.amount);
    if (!formState.date || !formState.category || !formState.type || amountValue <= 0) {
      return;
    }

    addTransaction({
      date: formState.date,
      amount: amountValue,
      category: formState.category,
      type: formState.type,
      note: formState.note.trim(),
    });

    onClose();
    setFormState({
      date: today(),
      amount: '',
      category: categories[0] || 'Food',
      type: 'expense',
      note: '',
    });
  };

  const modalElement = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-900">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 xl:text-2xl dark:text-slate-100">Add Transaction</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-md px-2 py-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <FaXmark size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 xl:text-sm dark:text-slate-400">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formState.date}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 xl:text-base outline-none ring-sky-300 transition focus:ring dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 xl:text-sm dark:text-slate-400">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              min="0.01"
              step="0.01"
              value={formState.amount}
              onChange={handleChange}
              placeholder="0.00"
              required
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 xl:text-base outline-none ring-sky-300 transition focus:ring dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 xl:text-sm dark:text-slate-400">
                Category
              </label>
              <select
                name="category"
                value={formState.category}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 xl:text-base outline-none ring-sky-300 transition focus:ring dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 xl:text-sm dark:text-slate-400">
                Type
              </label>
              <select
                name="type"
                value={formState.type}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 xl:text-base outline-none ring-sky-300 transition focus:ring dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 xl:text-sm dark:text-slate-400">
              Note (Optional)
            </label>
            <textarea
              name="note"
              value={formState.note}
              onChange={handleChange}
              placeholder="Add a note or description..."
              rows="3"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 xl:text-base outline-none ring-sky-300 transition focus:ring dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
            >
              Save Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalElement, document.body);
}
