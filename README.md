# 💰 Finance Dashboard

A modern, responsive finance dashboard built with React, Vite, and Tailwind CSS. Track transactions, visualize spending patterns, and manage your finances with role-based access control.

## ✨ Features

### 📊 Dashboard Analytics
- **Summary Cards**: Total Balance, Income, and Expenses with trend indicators
- **Balance Trend Chart**: Monthly line chart showing income vs expenses over time
- **Spending by Category**: Pie chart showing expense breakdown by category
- **Additional Metrics**: Savings rate, top spending category, monthly income goal tracker

### 💳 Transactions Management
- **View Transactions**: Date, amount, category, and type displayed with color coding
- **Search**: Find transactions by date (YYYY-MM-DD) or category name with highlighting
- **Filter**: By transaction type (All/Income/Expense)
- **Sort**: By Date, Amount, or Category in ascending/descending order
- **Add Transactions**: Admin users can add new transactions via modal form
- **Export**: Download transactions as CSV or JSON files

### 💡 Financial Insights
- **Highest Spending Category**: Shows your top expense category with amount
- **Monthly Comparison**: Compares current month spending vs previous month
- **Trend Analysis**: Automatic insights based on spending patterns

### 🔐 Role-Based Access
- **Viewer**: Read-only access to all features
- **Admin**: Full access including transaction management
- **Easy Switching**: Toggle roles via sidebar dropdown dropdown

### 🎨 User Experience
- **Dark Mode**: System preference detection with manual override
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Smooth Animations**: Transitions and hover effects throughout
- **Empty States**: Graceful handling when no data is available
- **Persistent Storage**: All data saved automatically to browser

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Setup
```bash
# Navigate to project
cd finance-dashboard

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173 (or shown port)
```

### Testing the Dashboard
1. **Explore Dashboard**: See summary cards, charts, and insights
2. **View Sample Data**: 28 pre-loaded transactions (Jan-Apr 2026)
3. **Test Admin Features**: Click "Add Transaction" to add a new entry
4. **Switch to Viewer**: Open sidebar → "Switch Role" → select "Viewer"
5. **Try Filtering**: Search "Food" or "2026-04" in search box
6. **Sort Data**: Click sort dropdown to sort by date/amount/category, then click arrow to toggle ascending/descending
7. **Export Data**: Click CSV or JSON buttons to download transactions
8. **Dark Mode**: Click moon icon in navbar to toggle theme

## 📁 Project Structure

```
finance-dashboard/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── AddTransactionModal.jsx  # Add transaction form
│   │   ├── Insights.jsx             # Financial insights display
│   │   ├── TransactionsTable.jsx    # Transactions list with filters
│   │   ├── Navbar.jsx               # Top navigation bar
│   │   ├── Sidebar.jsx              # Mobile sidebar
│   │   └── ...other components
│   ├── context/             # Global state management
│   │   ├── FinanceContext.jsx       # Finance data & transactions
│   │   └── ThemeContext.jsx         # Dark mode state
│   ├── pages/
│   │   └── Dashboard.jsx    # Main dashboard page
│   ├── utils/
│   │   ├── calculations.js  # Financial calculations
│   │   ├── formatters.js    # Date/currency formatting
│   │   └── exporters.js     # CSV/JSON export functions
│   └── data/
│       └── mockData.js      # Sample transactions
├── vite.config.js           # Build configuration
├── tailwind.config.js       # Tailwind CSS setup
└── package.json             # Dependencies
```

## 🔧 Technical Stack

- **React 19** - UI framework with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Data visualization (charts)
- **React Icons** - Icon library
- **Context API** - State management
- **localStorage** - Data persistence

## 📊 Core Requirements Implemented

✅ **Dashboard Overview**
- Summary cards (Total Balance, Income, Expenses)
- Time-based chart: Balance Trend (monthly)
- Categorical chart: Spending by Category (pie)

✅ **Transactions Section**  
- Display: Date, Amount, Category, Type
- Filtering: Search & type filter
- Sorting: Date, Amount, Category (asc/desc)

✅ **Role-Based UI**
- Viewer: Read-only access
- Admin: Can add transactions
- Role switcher in sidebar

✅ **Insights Section**
- Highest spending category
- Monthly spending comparison
- Smart analysis notes

✅ **State Management**
- React Context API for global state
- localStorage for persistence
- Filters, sort, role, and transactions tracked

✅ **UI/UX**
- Clean, modern design
- Responsive across all devices
- Dark mode support
- Smooth animations
- Empty state handling

## 🎯 How to Use

### Adding a Transaction (Admin Only)
1. Click "Add Transaction" button
2. Fill in Date, Amount, Category, Type, and Description
3. Click "Save Transaction"
4. All charts and totals update automatically

### Filtering Transactions
- **Search Box**: Enter date (YYYY-MM-DD) or category name
- **Type Filter**: Select All, Income, or Expense
- Results filter in real-time

### Sorting and Exporting
- **Sort Field**: Select Date, Amount, or Category from dropdown
- **Sort Order**: Click the arrow button (↑/↓) to toggle ascending/descending
- **Export**: Click CSV or JSON to download selected/all transactions

### Switching Roles
1. Click menu icon (mobile) or look in sidebar
2. Find "Switch Role" dropdown
3. Select Admin or Viewer
4. UI updates immediately (Add button shown/hidden)

### Dark Mode
- Click the moon icon in the navbar
- Automatically saved for next visit
- Filtering by search (date/category) and type
- Sorting by date, amount, or category
- Admin users can add transactions
- Empty state handling

### 3. Role-Based UI ✅
- Viewer role (read-only access)
- Admin role (can add/edit transactions)
- Role dropdown for easy switching
- UI elements conditionally shown based on role

### 4. Insights Section ✅
- Highest spending category display
- Monthly spending comparison (current vs previous)
- Smart notes with spending analysis
- Smart detection of spending trends

### 5. State Management ✅
- Context API for global state
- Transaction CRUD operations
- Filter state management
- Role state management
- LocalStorage persistence

### 6. UI/UX ✅
- Clean, modern design with gradients and glass effects
- Fully responsive (mobile-first Tailwind approach)
- Dark mode with persistent preference
- Smooth animations and transitions
- Graceful empty state displays
- Search result highlighting

## 🎁 Optional Enhancements Implemented

✅ **Dark Mode** - Automatic detection and manual toggle
✅ **Data Persistence** - LocalStorage for transactions and preferences
✅ **Animations** - Smooth transitions and fade-in effects
✅ **Export Functionality** - Download as CSV or JSON
✅ **Advanced Sorting** - Sort transactions by date, amount, or category
✅ **Advanced Filtering** - Multi-criteria filtering and search

## 📊 Sample Data

The dashboard includes 28 pre-populated transactions across 4 months (Jan-Apr 2026):
- Various income sources: Salary, Freelance, Bonus
- Diverse expense categories: Food, Travel, Rent, Shopping, Healthcare, Utilities, Entertainment
- Realistic amounts in INR currency
- Date range spanning multiple months for trend visualization

## 🎨 Color Scheme

| Color | Hex | Usage |
|-------|-----|-------|
| Primary | #0f172a | Dark background |
| Secondary | #1e293b | Card backgrounds |
| Accent | #3b82f6 | Primary actions |
| Success | #10b981 | Positive values |
| Warning | #f59e0b | Alerts |
| Danger | #ef4444 | Negative values |

## 🔄 Context API

### FinanceContext

```javascript
const {
  transactions,           // Array of all transactions
  filteredTransactions,   // Transactions after filtering & sorting
  filters,                // Active filters { search, type }
  sort,                   // Active sort { field, order }
  userRole,               // Current role: 'admin' or 'viewer'
  addTransaction,         // Function to add new transaction
  filterTransactions,     // Function to update filters
  updateSort,            // Function to change sort
  setRole,               // Function to switch roles
} = useFinance();
```

### ThemeContext

```javascript
const {
  theme,                  // Current theme: 'light' or 'dark'
  isDarkMode,             // Boolean: true if dark mode
  toggleTheme,            // Function to toggle theme
  setThemeMode,           // Function to set specific theme
} = useTheme();
```

## 🛠️ Utility Functions

### Formatters (`utils/formatters.js`)
- `formatCurrency(value)` - Format numbers as INR currency
- `formatDate(date)` - Format date as "Jan 15, 2026"
- `formatPercentage(value)` - Format as percentage string

### Calculations (`utils/calculations.js`)
- `calculateFinanceTotals(transactions)` - Get income, expenses, balance
- `buildMonthlyIncomeExpenseTrends(transactions)` - Monthly trend data
- `buildCategoryExpenseBreakdown(transactions)` - Category spending
- `getHighestSpendingCategory(transactions)` - Top expense category
- `getMonthlySpendingComparison(transactions)` - Month-over-month
- `buildInsightMessages(transactions)` - Generate insight messages

### Exporters (`utils/exporters.js`)
- `exportToCSV(transactions)` - Download as CSV file
- `exportToJSON(transactions)` - Download as JSON file
- `exportSummaryToJSON(summary)` - Export financial summary

## 📱 Responsive Breakpoints

- **Mobile**: < 640px - Full-width layout, stacked cards
- **Tablet**: 640px - 1024px - 2-column grid for some sections
- **Desktop**: > 1024px - Full 3+ column layouts

## 🐛 Known Limitations

- Edit/delete transactions not yet implemented (can be added by switching roles)
- Date range filtering not available (can filter by partial date)
- Recurring transactions not supported
- Budget alerts/notifications not implemented
- API integration not included (fully frontend)

## 🚀 Future Enhancement Ideas

1. **Backend Integration** - Connect to real API for data persistence
2. **User Authentication** - Login/signup with authentication
3. **Recurring Transactions** - Set up automatic monthly/weekly transactions
4. **Budget Management** - Set category budgets and get alerts
5. **Data Visualization** - More chart types (bar, area, waterfall)
6. **Transaction Categories** - Custom category management
7. **Salary History** - Track salary changes over time
8. **Investments Tracking** - Monitor investment portfolio
9. **Reports** - Generate PDF reports
10. **Notifications** - Alert when spending exceeds budget

## 📝 Configuration Files

### `tailwind.config.js`
Customizes Tailwind with dark mode support and custom colors

### `vite.config.js`
Configures Vite with React plugin and build optimizations

### `postcss.config.js`
Enables Tailwind CSS and autoprefixer processing

### `eslint.config.js`
Enforces code quality and React best practices

## 🤝 Contributing

To improve the dashboard:
1. Create a new feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request with detailed description

## 📄 License

This project is provided as-is for educational and evaluation purposes.

## 📞 Support & Feedback

For questions or feedback about this dashboard, please review the code comments and documentation within each component.

---

**Version**: 1.0.0  
**Last Updated**: April 2026  
**Built with**: React + Vite + Tailwind CSS

## 📄 License

MIT License - Feel free to use this project as a template for your own applications.


The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
