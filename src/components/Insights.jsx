import { useFinance } from '../context/FinanceContext';
import { formatCurrency } from '../utils/formatters';
import {
  buildInsightMessages,
  getHighestSpendingCategory,
  getMonthlySpendingComparison,
} from '../utils/calculations';
import { FaInbox, FaLightbulb } from 'react-icons/fa6';

export default function Insights() {
  const { transactions } = useFinance();

  const topSpendingCategory = getHighestSpendingCategory(transactions);
  const monthlyComparison = getMonthlySpendingComparison(transactions);
  const insightMessages = buildInsightMessages(transactions);
  const hasTransactions = transactions.length > 0;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md sm:p-6 dark:border-slate-700 dark:bg-slate-900">
      <h3 className="mb-4 inline-flex items-center gap-2 text-lg font-bold text-slate-900 xl:text-xl dark:text-slate-100">
        <FaLightbulb className="text-amber-500" />
        Insights
      </h3>

      {!hasTransactions ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-slate-700 dark:bg-slate-800/40">
          <FaInbox className="mx-auto mb-2 text-slate-400" size={20} />
          <p className="font-medium text-slate-700 dark:text-slate-200">No insights yet</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Add transactions to unlock spending insights and trends.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <article className="rounded-xl border border-slate-200 p-4 transition-colors duration-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/50">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 xl:text-sm dark:text-slate-400">
                Highest Spending Category
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">{topSpendingCategory.name}</p>
              <p className="mt-1 text-sm text-rose-600 dark:text-rose-400">
                {formatCurrency(topSpendingCategory.value)} spent
              </p>
            </article>

            <article className="rounded-xl border border-slate-200 p-4 transition-colors duration-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/50">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 xl:text-sm dark:text-slate-400">
                Monthly Spending Comparison
              </p>
              <div className="mt-2 space-y-1 text-sm text-slate-700 xl:text-base dark:text-slate-200">
                <p>
                  {monthlyComparison.currentMonthLabel}: <span className="font-semibold">{formatCurrency(monthlyComparison.currentMonthSpending)}</span>
                </p>
                <p>
                  {monthlyComparison.previousMonthLabel}: <span className="font-semibold">{formatCurrency(monthlyComparison.previousMonthSpending)}</span>
                </p>
              </div>
              <p
                className={`mt-2 text-sm font-semibold xl:text-base ${
                  monthlyComparison.delta > 0
                    ? 'text-rose-600 dark:text-rose-400'
                    : monthlyComparison.delta < 0
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {monthlyComparison.delta >= 0 ? '+' : '-'}{formatCurrency(Math.abs(monthlyComparison.delta))}
              </p>
            </article>
          </div>

          <div className="mt-4 rounded-xl border border-slate-200 p-4 dark:border-slate-700">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 xl:text-sm dark:text-slate-400">
              Smart Notes
            </p>
            <ul className="space-y-2 text-sm text-slate-700 xl:text-base dark:text-slate-200">
              {insightMessages.map((message, index) => (
                <li key={index} className="rounded-lg bg-slate-50 px-3 py-2 transition-colors duration-200 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800">
                  {message}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </section>
  );
}

