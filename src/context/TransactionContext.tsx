import { createContext } from 'react';
import { ExpenseTransaction, IncomeTransaction } from '../data/Transactions';
import { Categories } from '../data/Categories';

// Passing the transactions through different components via useContext!
export interface CalculatorState {
    transactions: (ExpenseTransaction | IncomeTransaction)[];
    setTransactions: (newTransaction: (ExpenseTransaction | IncomeTransaction)[]) => void;
}

// Must set an initial value
const initial: CalculatorState = {
    transactions: [{
        amount: 0,
        category: Categories.Car,
        date: new Date(),
        id: 0,
        label: ''
    }],
    setTransactions: (v) => {}
}

const TransactionContext = createContext<CalculatorState>(initial)

export default TransactionContext;