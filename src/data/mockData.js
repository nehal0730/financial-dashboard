export const transactions = [
  { id: 1, date: '2026-01-03', amount: 5200, category: 'Salary', type: 'income', note: 'Monthly salary' },
  { id: 2, date: '2026-01-05', amount: 120, category: 'Food', type: 'expense', note: 'Groceries' },
  { id: 3, date: '2026-01-07', amount: 65, category: 'Travel', type: 'expense', note: 'Fuel' },
  { id: 4, date: '2026-01-11', amount: 340, category: 'Shopping', type: 'expense', note: 'Winter clothes' },
  { id: 5, date: '2026-01-15', amount: 1800, category: 'Freelance', type: 'income', note: 'Website project' },
  { id: 6, date: '2026-01-21', amount: 950, category: 'Rent', type: 'expense', note: 'Apartment rent' },
  { id: 7, date: '2026-01-27', amount: 110, category: 'Utilities', type: 'expense', note: 'Electricity bill' },

  { id: 8, date: '2026-02-02', amount: 5200, category: 'Salary', type: 'income', note: 'Monthly salary' },
  { id: 9, date: '2026-02-04', amount: 145, category: 'Food', type: 'expense', note: 'Groceries' },
  { id: 10, date: '2026-02-09', amount: 78, category: 'Travel', type: 'expense', note: 'Train pass' },
  { id: 11, date: '2026-02-13', amount: 215, category: 'Healthcare', type: 'expense', note: 'Dental checkup' },
  { id: 12, date: '2026-02-18', amount: 620, category: 'Bonus', type: 'income', note: 'Performance bonus' },
  { id: 13, date: '2026-02-22', amount: 950, category: 'Rent', type: 'expense', note: 'Apartment rent' },
  { id: 14, date: '2026-02-26', amount: 96, category: 'Utilities', type: 'expense', note: 'Internet + power' },

  { id: 15, date: '2026-03-01', amount: 5200, category: 'Salary', type: 'income', note: 'Monthly salary' },
  { id: 16, date: '2026-03-03', amount: 168, category: 'Food', type: 'expense', note: 'Groceries + dining' },
  { id: 17, date: '2026-03-08', amount: 430, category: 'Travel', type: 'expense', note: 'Weekend trip' },
  { id: 18, date: '2026-03-12', amount: 260, category: 'Shopping', type: 'expense', note: 'Electronics accessories' },
  { id: 19, date: '2026-03-18', amount: 1300, category: 'Freelance', type: 'income', note: 'Consulting engagement' },
  { id: 20, date: '2026-03-24', amount: 950, category: 'Rent', type: 'expense', note: 'Apartment rent' },
  { id: 21, date: '2026-03-29', amount: 142, category: 'Entertainment', type: 'expense', note: 'Concert tickets' },

  { id: 22, date: '2026-04-02', amount: 5200, category: 'Salary', type: 'income', note: 'Monthly salary' },
  { id: 23, date: '2026-04-04', amount: 138, category: 'Food', type: 'expense', note: 'Groceries' },
  { id: 24, date: '2026-04-06', amount: 58, category: 'Travel', type: 'expense', note: 'Metro recharge' },
  { id: 25, date: '2026-04-08', amount: 95, category: 'Utilities', type: 'expense', note: 'Water + electricity' },
  { id: 26, date: '2026-04-10', amount: 740, category: 'Freelance', type: 'income', note: 'UI audit project' },
  { id: 27, date: '2026-04-12', amount: 84, category: 'Food', type: 'expense', note: 'Takeout' },
  { id: 28, date: '2026-04-14', amount: 165, category: 'Shopping', type: 'expense', note: 'Home essentials' }
];

const monthLabel = (dateString) =>
  new Date(dateString).toLocaleDateString('en-US', { month: 'short' });

const monthKey = (dateString) => dateString.slice(0, 7);

const buildMonthlyTrend = (txs) => {
  const grouped = txs.reduce((acc, tx) => {
    const key = monthKey(tx.date);
    if (!acc[key]) {
      acc[key] = {
        month: monthLabel(tx.date),
        income: 0,
        expense: 0,
      };
    }

    if (tx.type === 'income') {
      acc[key].income += tx.amount;
    } else {
      acc[key].expense += tx.amount;
    }

    return acc;
  }, {});

  const sortedKeys = Object.keys(grouped).sort();
  let runningBalance = 9000;

  return sortedKeys.map((key) => {
    const monthData = grouped[key];
    runningBalance += monthData.income - monthData.expense;

    return {
      month: monthData.month,
      income: Number(monthData.income.toFixed(2)),
      expense: Number(monthData.expense.toFixed(2)),
      balance: Number(runningBalance.toFixed(2)),
    };
  });
};

const buildCategoryExpenseBreakdown = (txs) => {
  const grouped = txs
    .filter((tx) => tx.type === 'expense')
    .reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    }, {});

  return Object.entries(grouped)
    .map(([name, value]) => ({
      name,
      value: Number(value.toFixed(2)),
    }))
    .sort((a, b) => b.value - a.value);
};

export const monthlyIncomeExpenseTrends = buildMonthlyTrend(transactions);
export const categoryWiseExpenseBreakdown = buildCategoryExpenseBreakdown(transactions);

export const recentTransactions = [...transactions]
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .slice(0, 8);
