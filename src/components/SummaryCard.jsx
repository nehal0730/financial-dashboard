export default function SummaryCard({ title, amount, icon, theme = 'neutral' }) {
  const themeStyles = {
    income:
      'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800/60 dark:bg-emerald-900/20 dark:text-emerald-300',
    expense:
      'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800/60 dark:bg-rose-900/20 dark:text-rose-300',
    neutral:
      'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800/60 dark:bg-sky-900/20 dark:text-sky-300',
  };

  return (
    <article
      className={`rounded-2xl border p-5 shadow-sm transition-all hover:shadow-md ${themeStyles[theme] || themeStyles.neutral}`}
    >
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-80 xl:text-sm">{title}</p>
        {icon ? <span className="text-xl opacity-90">{icon}</span> : null}
      </div>
      <p className="text-3xl font-black leading-tight">{amount}</p>
    </article>
  );
}
