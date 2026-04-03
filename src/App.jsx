import { Dashboard } from './pages';
import { FinanceProvider } from './context/FinanceContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <FinanceProvider>
        <Dashboard />
      </FinanceProvider>
    </ThemeProvider>
  );
}

export default App;
