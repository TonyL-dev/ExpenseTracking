import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import OuterPageContainer from './layout/OuterPageContainer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import IncomePage from './pages/IncomePage';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ExpenseTransaction, IncomeTransaction, TRANSACTION_HISTORY } from './data/Transactions';
import TransactionContext, { CalculatorState } from './context/TransactionContext';
import ExpensesPage from './pages/ExpensesPage';
import NoPage from './pages/NoPage';

function App() {

  const [transactions, setTransactions] = useState<(ExpenseTransaction | IncomeTransaction)[]>(TRANSACTION_HISTORY)

  const calculatorState: CalculatorState = {
    transactions,
    setTransactions
  }

  return (
    <TransactionContext.Provider value={calculatorState}>
      <OuterPageContainer>
        {/* Necessary for datepicker to work properly. Recommended to set once */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Navbar />}>
              <Route index element={<HomePage />} />
              <Route path="income" element={<IncomePage />} />
              <Route path="expenses" element={<ExpensesPage />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
        </LocalizationProvider>
      </OuterPageContainer>
    </TransactionContext.Provider>
  );  
}

export default App;
