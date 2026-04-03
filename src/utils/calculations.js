export const calculateExpenseTotal = (expenses) => {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
};

export const calculateTotalIncome = (transactions) => {
  return transactions
    .filter(tx => tx.type === 'income')
    .reduce((total, tx) => total + tx.amount, 0);
};

export const groupTransactionsByCategory = (transactions) => {
  return transactions.reduce((acc, tx) => {
    if (!acc[tx.category]) {
      acc[tx.category] = [];
    }
    acc[tx.category].push(tx);
    return acc;
  }, {});
};

export const applyTransactionFilters = (transactions, filters) => {
  const searchValue = (filters.search || '').trim().toLowerCase();
  const typeValue = filters.type || 'all';

  return transactions.filter((tx) => {
    const matchesType = typeValue === 'all' ? true : tx.type === typeValue;
    const normalizedDate = String(tx.date).toLowerCase();
    const normalizedCategory = String(tx.category).toLowerCase();
    const matchesSearch =
      searchValue.length === 0
        ? true
        : normalizedCategory.includes(searchValue) || normalizedDate.includes(searchValue);

    return matchesType && matchesSearch;
  });
};

export const calculateFinanceTotals = (transactions) => {
  const totalIncome = transactions
    .filter((tx) => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalExpenses = transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0);

  return {
    totalIncome,
    totalExpenses,
    totalBalance: totalIncome - totalExpenses,
    savingsRate: totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0,
  };
};

export const buildMonthlyIncomeExpenseTrends = (transactions) => {
  const grouped = transactions.reduce((acc, tx) => {
    const monthKey = tx.date.slice(0, 7);
    if (!acc[monthKey]) {
      acc[monthKey] = {
        month: new Date(tx.date).toLocaleDateString('en-US', { month: 'short' }),
        income: 0,
        expense: 0,
      };
    }

    if (tx.type === 'income') {
      acc[monthKey].income += tx.amount;
    } else {
      acc[monthKey].expense += tx.amount;
    }

    return acc;
  }, {});

  const sortedKeys = Object.keys(grouped).sort();
  let runningBalance = 9000;

  return sortedKeys.map((key) => {
    const entry = grouped[key];
    runningBalance += entry.income - entry.expense;

    return {
      month: entry.month,
      income: Number(entry.income.toFixed(2)),
      expense: Number(entry.expense.toFixed(2)),
      balance: Number(runningBalance.toFixed(2)),
    };
  });
};

export const buildCategoryExpenseBreakdown = (transactions) => {
  const grouped = transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    }, {});

  return Object.entries(grouped)
    .map(([name, value]) => ({ name, value: Number(value.toFixed(2)) }))
    .sort((a, b) => b.value - a.value);
};

export const getHighestSpendingCategory = (transactions) => {
  const categoryBreakdown = buildCategoryExpenseBreakdown(transactions);
  if (categoryBreakdown.length === 0) {
    return { name: 'N/A', value: 0 };
  }

  return categoryBreakdown[0];
};

const monthKey = (dateString) => dateString.slice(0, 7);

export const getMonthlySpendingComparison = (transactions) => {
  const monthlyExpenses = transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((acc, tx) => {
      const key = monthKey(tx.date);
      acc[key] = (acc[key] || 0) + tx.amount;
      return acc;
    }, {});

  const months = Object.keys(monthlyExpenses).sort();

  if (months.length === 0) {
    return {
      currentMonthLabel: 'Current month',
      previousMonthLabel: 'Last month',
      currentMonthSpending: 0,
      previousMonthSpending: 0,
      delta: 0,
      deltaPercent: 0,
    };
  }

  const currentMonthKey = months[months.length - 1];
  const previousMonthKey = months[months.length - 2];

  const currentMonthSpending = monthlyExpenses[currentMonthKey] || 0;
  const previousMonthSpending = previousMonthKey ? monthlyExpenses[previousMonthKey] || 0 : 0;
  const delta = currentMonthSpending - previousMonthSpending;
  const deltaPercent = previousMonthSpending > 0 ? (delta / previousMonthSpending) * 100 : 0;

  const monthLabelFromKey = (key) => {
    const [year, month] = key.split('-').map(Number);
    return new Date(year, month - 1, 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return {
    currentMonthLabel: monthLabelFromKey(currentMonthKey),
    previousMonthLabel: previousMonthKey ? monthLabelFromKey(previousMonthKey) : 'No previous month',
    currentMonthSpending: Number(currentMonthSpending.toFixed(2)),
    previousMonthSpending: Number(previousMonthSpending.toFixed(2)),
    delta: Number(delta.toFixed(2)),
    deltaPercent: Number(deltaPercent.toFixed(1)),
  };
};

export const buildInsightMessages = (transactions) => {
  const topCategory = getHighestSpendingCategory(transactions);
  const monthly = getMonthlySpendingComparison(transactions);

  const messages = [];

  if (topCategory.value > 0) {
    messages.push(`${topCategory.name} is your highest expense category.`);
  } else {
    messages.push('No expense data is available yet.');
  }

  if (monthly.previousMonthSpending > 0) {
    if (monthly.delta > 0) {
      messages.push(`Spending is up ${Math.abs(monthly.deltaPercent)}% vs last month.`);
    } else if (monthly.delta < 0) {
      messages.push(`Great progress: spending is down ${Math.abs(monthly.deltaPercent)}% vs last month.`);
    } else {
      messages.push('Spending is unchanged compared with last month.');
    }
  } else {
    messages.push('Need one more month of expense data for month-over-month comparison.');
  }

  return messages;
};
