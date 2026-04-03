import { Insights, Layout, TransactionsTable } from '../components';
import { useFinance } from '../context/FinanceContext';
import { formatCurrency, formatDate } from '../utils/formatters';
import {
  buildCategoryExpenseBreakdown,
  buildMonthlyIncomeExpenseTrends,
  calculateFinanceTotals,
} from '../utils/calculations';
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  FaArrowTrendDown,
  FaArrowTrendUp,
  FaBullseye,
  FaChartLine,
  FaChartPie,
  FaInbox,
  FaWallet,
} from 'react-icons/fa6';

const PIE_COLORS = ['#60a5fa', '#22c55e', '#f59e0b', '#ef4444', '#a78bfa', '#14b8a6', '#f97316'];
const chartCurrencyTick = (value) => `Rs. ${Math.round(value / 1000)}k`;

export default function Dashboard() {
  const { transactions } = useFinance();
  const { totalIncome, totalExpenses, totalBalance, savingsRate } = calculateFinanceTotals(transactions);
  const monthlyIncomeExpenseTrends = buildMonthlyIncomeExpenseTrends(transactions);
  const categoryWiseExpenseBreakdown = buildCategoryExpenseBreakdown(transactions);

  const hasTransactions = transactions.length > 0;
  const hasTrendData = monthlyIncomeExpenseTrends.length > 0;
  const hasCategoryData = categoryWiseExpenseBreakdown.length > 0;

  const bars = monthlyIncomeExpenseTrends.slice(-7);
  const maxIncome = Math.max(...bars.map((item) => item.income), 1);
  const maxExpense = Math.max(...bars.map((item) => item.expense), 1);
  const latestPeriod = bars[bars.length - 1];
  const previousPeriod = bars[bars.length - 2];

  const incomeDeltaPercent = previousPeriod && previousPeriod.income > 0
    ? ((latestPeriod.income - previousPeriod.income) / previousPeriod.income) * 100
    : null;

  const expenseDeltaPercent = previousPeriod && previousPeriod.expense > 0
    ? ((latestPeriod.expense - previousPeriod.expense) / previousPeriod.expense) * 100
    : null;

  const lastTransactionDate = hasTransactions
    ? [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date))[0].date
    : null;

  const topThree = categoryWiseExpenseBreakdown.slice(0, 3);
  const topCategory = topThree[0] || { name: 'No category', value: 0 };

  const monthlyGoal = 50000;
  const goalProgress = Math.max(0, Math.min((totalIncome / monthlyGoal) * 100, 100));
  const savingsProgress = Math.max(0, Math.min(savingsRate, 100));

  const ringStyle = (pct, color) => ({
    background: `conic-gradient(${color} ${pct * 3.6}deg, rgba(203,213,225,0.3) 0deg)`,
  });

  return (
    <Layout>
      <div className="space-y-6 sm:space-y-8">
        <section id="overview" className="grid grid-cols-1 gap-4 motion-safe:animate-rise-fade lg:grid-cols-5" style={{ animationDelay: '40ms' }}>
          <article className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-800 bg-[#070b1f] p-6 text-white shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl sm:p-8 lg:col-span-2">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-slate-600/25" />
            <div className="pointer-events-none absolute right-6 top-8 h-52 w-52 rounded-full border border-slate-600/20" />
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 xl:text-sm">Net Worth</p>
              <div className="mb-2 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/20 text-sky-300">
                <FaWallet />
              </div>
              <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl xl:text-6xl">{formatCurrency(totalBalance)}</h1>
              <p className="text-sm text-slate-400 xl:text-base">
                {hasTransactions ? `${transactions.length} recorded transactions` : 'No transaction records yet'}
              </p>
            </div>

            <div className="mt-auto flex flex-wrap items-center gap-3 pt-6 text-xs font-semibold">
              <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 xl:text-sm ${
                savingsRate >= 0
                  ? 'bg-emerald-500/15 text-emerald-300'
                  : 'bg-rose-500/15 text-rose-300'
              }`}>
                {savingsRate >= 0 ? <FaArrowTrendUp size={10} /> : <FaArrowTrendDown size={10} />}
                {savingsRate >= 0 ? '+' : '-'}{Math.abs(savingsRate).toFixed(1)}% this month
              </span>
              <span className="rounded-full bg-slate-500/30 px-3 py-1.5 text-slate-300 xl:text-sm">
                {lastTransactionDate ? `Updated ${formatDate(lastTransactionDate)}` : 'Awaiting data sync'}
              </span>
            </div>
          </article>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-1">
            <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900 sm:p-6">
              <div className="mb-3 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-600 xl:text-base dark:text-slate-300">Income</p>
                  <p className="mt-1 text-4xl font-bold text-slate-900 dark:text-slate-100">{formatCurrency(totalIncome)}</p>
                </div>
                {incomeDeltaPercent !== null ? (
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold xl:text-sm ${
                    incomeDeltaPercent >= 0
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                      : 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'
                  }`}>
                    {incomeDeltaPercent >= 0 ? <FaArrowTrendUp size={10} /> : <FaArrowTrendDown size={10} />}
                    {incomeDeltaPercent >= 0 ? '+' : '-'}{Math.abs(incomeDeltaPercent).toFixed(1)}%
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 xl:text-sm dark:bg-slate-800 dark:text-slate-300">
                    N/A
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-end gap-1.5">
                {bars.length > 0
                  ? bars.map((item, index) => (
                      <span
                        key={`income-${index}`}
                        className="flex-1 rounded-t-md bg-emerald-300 transition-[height,background-color] duration-500 dark:bg-emerald-500/70"
                        style={{ height: `${Math.max((item.income / maxIncome) * 54, 10)}px` }}
                      />
                    ))
                  : Array.from({ length: 7 }).map((_, index) => (
                      <span key={`income-placeholder-${index}`} className="h-4 flex-1 rounded-t-md bg-slate-200 dark:bg-slate-700" />
                    ))}
              </div>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900 sm:p-6">
              <div className="mb-3 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-600 xl:text-base dark:text-slate-300">Expenses</p>
                  <p className="mt-1 text-4xl font-bold text-slate-900 dark:text-slate-100">{formatCurrency(totalExpenses)}</p>
                </div>
                {expenseDeltaPercent !== null ? (
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold xl:text-sm ${
                    expenseDeltaPercent <= 0
                      ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'
                      : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                  }`}>
                    {expenseDeltaPercent <= 0 ? <FaArrowTrendDown size={10} /> : <FaArrowTrendUp size={10} />}
                    {expenseDeltaPercent >= 0 ? '+' : '-'}{Math.abs(expenseDeltaPercent).toFixed(1)}%
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 xl:text-sm dark:bg-slate-800 dark:text-slate-300">
                    N/A
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-end gap-1.5">
                {bars.length > 0
                  ? bars.map((item, index) => (
                      <span
                        key={`expense-${index}`}
                        className="flex-1 rounded-t-md bg-rose-300 transition-[height,background-color] duration-500 dark:bg-rose-500/70"
                        style={{ height: `${Math.max((item.expense / maxExpense) * 54, 10)}px` }}
                      />
                    ))
                  : Array.from({ length: 7 }).map((_, index) => (
                      <span key={`expense-placeholder-${index}`} className="h-4 flex-1 rounded-t-md bg-slate-200 dark:bg-slate-700" />
                    ))}
              </div>
            </article>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 motion-safe:animate-rise-fade md:grid-cols-2 xl:grid-cols-3" style={{ animationDelay: '120ms' }}>
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-900">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 xl:text-sm dark:text-slate-400">Savings Rate</p>
            <div className="mt-4 flex items-center justify-center">
              <div className="relative h-36 w-36 rounded-full p-3" style={ringStyle(savingsProgress, '#6366f1')}>
                <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-center dark:bg-slate-900">
                  <div>
                    <p className="text-4xl font-bold text-slate-900 dark:text-slate-100">{savingsRate.toFixed(0)}%</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">income saved</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-3 text-center text-sm text-slate-600 xl:text-base dark:text-slate-300">Target: 50% - {savingsRate >= 50 ? 'you are ahead' : 'room to improve'}</p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-900">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 xl:text-sm dark:text-slate-400">Top Category</p>
            <h3 className="mt-3 text-2xl font-bold text-slate-900 dark:text-slate-100">{topCategory.name}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{formatCurrency(topCategory.value)} this cycle</p>

            <div className="mt-5 space-y-3">
              {topThree.length > 0 ? (
                topThree.map((item) => {
                  const width = topCategory.value > 0 ? (item.value / topCategory.value) * 100 : 0;
                  return (
                    <div key={item.name}>
                      <div className="mb-1 flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                        <span>{item.name}</span>
                        <span>{formatCurrency(item.value)}</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700">
                        <div className="h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500" style={{ width: `${width}%` }} />
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-300">
                  Add expense transactions to generate category insights.
                </p>
              )}
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 md:col-span-2 xl:col-span-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 xl:text-sm dark:text-slate-400">
              <FaBullseye className="text-teal-500" /> Monthly Goal
            </div>
            <div className="mt-4 flex items-center justify-center">
              <div className="relative h-36 w-36 rounded-full p-3" style={ringStyle(goalProgress, '#0d9488')}>
                <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-center dark:bg-slate-900">
                  <div>
                    <p className="text-4xl font-bold text-slate-900 dark:text-slate-100">{formatCurrency(totalIncome)}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">of {formatCurrency(monthlyGoal)} goal</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-3 text-center text-sm text-slate-600 xl:text-base dark:text-slate-300">{goalProgress.toFixed(0)}% reached - keep the streak alive</p>
          </article>
        </section>

        <section id="charts" className="grid grid-cols-1 gap-5 motion-safe:animate-rise-fade lg:grid-cols-2" style={{ animationDelay: '200ms' }}>
          <article className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-6 dark:border-slate-700 dark:bg-slate-900">
            <h3 className="mb-4 inline-flex items-center gap-2 text-lg font-bold text-slate-900 xl:text-xl dark:text-slate-100">
              <FaChartLine className="text-sky-500" /> Balance Trend (Monthly)
            </h3>
            <div className="h-64 w-full sm:h-80">
              {hasTrendData ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyIncomeExpenseTrends} margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis tickFormatter={chartCurrencyTick} stroke="#94a3b8" />
                    <Tooltip formatter={(value) => formatCurrency(value)} contentStyle={{ borderRadius: '12px', border: '1px solid #cbd5e1' }} />
                    <Legend />
                    <Line type="monotone" dataKey="balance" name="Balance" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="income" name="Income" stroke="#22c55e" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="expense" name="Expenses" stroke="#ef4444" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/80 text-center dark:border-slate-700 dark:bg-slate-800/40">
                  <FaInbox className="mb-2 text-slate-400" size={20} />
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">No trend data yet</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Add transactions to render the monthly chart.</p>
                </div>
              )}
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-6 dark:border-slate-700 dark:bg-slate-900">
            <h3 className="mb-4 inline-flex items-center gap-2 text-lg font-bold text-slate-900 xl:text-xl dark:text-slate-100">
              <FaChartPie className="text-indigo-500" /> Spending by Category
            </h3>
            <div className="h-[19rem] w-full sm:h-80">
              {hasCategoryData ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 18, right: 16, left: 16, bottom: 12 }}>
                    <Pie
                      data={categoryWiseExpenseBreakdown}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="44%"
                      outerRadius="70%"
                      innerRadius="42%"
                      paddingAngle={2}
                      labelLine
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryWiseExpenseBreakdown.map((entry, index) => (
                        <Cell key={`${entry.name}-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => formatCurrency(value)}
                      contentStyle={{ borderRadius: '12px', border: '1px solid #cbd5e1' }}
                    />
                    <Legend
                      verticalAlign="bottom"
                      align="center"
                      iconType="circle"
                      wrapperStyle={{ paddingTop: '0px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/80 text-center dark:border-slate-700 dark:bg-slate-800/40">
                  <FaInbox className="mb-2 text-slate-400" size={20} />
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">No category breakdown</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Expense entries will appear here once added.</p>
                </div>
              )}
            </div>

          </article>
        </section>

        <div id="insights" className="motion-safe:animate-rise-fade" style={{ animationDelay: '260ms' }}>
          <Insights />
        </div>

        <div id="transactions-table" className="motion-safe:animate-rise-fade" style={{ animationDelay: '320ms' }}>
          <TransactionsTable />
        </div>
      </div>
    </Layout>
  );
}





