import { createContext, useEffect, useMemo, useState, useContext } from 'react';
import { transactions as seedTransactions } from '../data/mockData';
import { applyTransactionFilters } from '../utils/calculations';

const FinanceContext = createContext();
const TRANSACTIONS_STORAGE_KEY = 'finance-dashboard-transactions';

const getInitialTransactions = () => {
  try {
    const stored = localStorage.getItem(TRANSACTIONS_STORAGE_KEY);
    if (!stored) {
      return seedTransactions;
    }

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      return seedTransactions;
    }

    return parsed;
  } catch {
    return seedTransactions;
  }
};

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(getInitialTransactions);
  const [filters, setFilters] = useState({ search: '', type: 'all' });
  const [sort, setSort] = useState({ field: 'date', order: 'desc' });
  const [userRole, setUserRole] = useState('admin');

  useEffect(() => {
    try {
      localStorage.setItem(TRANSACTIONS_STORAGE_KEY, JSON.stringify(transactions));
    } catch {
      // Ignore storage write errors to avoid app crashes.
    }
  }, [transactions]);

  const addTransaction = (transaction) => {
    if (userRole !== 'admin') {
      return;
    }

    setTransactions((currentTransactions) => {
      const nextId =
        currentTransactions.length > 0
          ? Math.max(...currentTransactions.map((tx) => tx.id)) + 1
          : 1;

      return [...currentTransactions, { ...transaction, id: nextId }];
    });
  };

  const filterTransactions = (nextFilters) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      ...nextFilters,
    }));
  };

  const setRole = (role) => {
    if (role === 'admin' || role === 'viewer') {
      setUserRole(role);
    }
  };

  const updateSort = (field, order = null) => {
    setSort((current) => {
      if (current.field === field && order === null) {
        // Toggle order if same field clicked
        return { field, order: current.order === 'asc' ? 'desc' : 'asc' };
      }
      return { field, order: order || 'asc' };
    });
  };

  const applySorting = (txs) => {
    const sorted = [...txs];
    const { field, order } = sort;

    sorted.sort((a, b) => {
      let compareValue = 0;

      switch (field) {
        case 'date':
          compareValue = new Date(a.date) - new Date(b.date);
          break;
        case 'amount':
          compareValue = a.amount - b.amount;
          break;
        case 'category':
          compareValue = a.category.localeCompare(b.category);
          break;
        default:
          compareValue = 0;
      }

      return order === 'asc' ? compareValue : -compareValue;
    });

    return sorted;
  };

  const filteredTransactions = useMemo(
    () => applySorting(applyTransactionFilters(transactions, filters)),
    [transactions, filters, sort]
  );

  return (
    <FinanceContext.Provider value={{
      transactions,
      filteredTransactions,
      filters,
      sort,
      userRole,
      addTransaction,
      filterTransactions,
      updateSort,
      setRole,
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within FinanceProvider');
  }
  return context;
};
