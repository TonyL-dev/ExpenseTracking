import { Colors } from "../ColorScheme";
import { ExpenseTransaction, IncomeTransaction } from "../data/Transactions";

// Since transactions are either Income Or Expense, this method determines which is which using type guarding
export function determineIfIsExpense(toBeDetermined: IncomeTransaction | ExpenseTransaction): toBeDetermined is ExpenseTransaction{
    if((toBeDetermined as ExpenseTransaction)?.category !== undefined){
        return true;
    }
    return false;
}

// extracts which border color to use based on type of transaction
export function getBorderColor(transaction: ExpenseTransaction | IncomeTransaction){
    return determineIfIsExpense(transaction) ? Colors.Red : Colors.DarkGreen
}

// determine type of transaction and the output it should display
export function printTransaction(transaction: ExpenseTransaction | IncomeTransaction, addPrefix: boolean = false){
    if(!addPrefix){
        return "$" + transaction.amount.toLocaleString('en-US', {
            maximumFractionDigits: 2,
        })
    }
    
    const prefix = determineIfIsExpense(transaction) ? '-' : '+'

    return prefix + "$" + transaction.amount.toLocaleString('en-US', {
        maximumFractionDigits: 2,
    })
}

// Displaying a money value in a pleasing way
export function prettyPrintMoney(num: number){
    return `${num < 0 ? '-' : ''}$${Math.abs(num).toLocaleString('en-US', {
        maximumFractionDigits: 2,
    }) }`
}

// calculate total income
export function getTotalIncome(transactions: (IncomeTransaction | ExpenseTransaction)[]){
    
    return transactions.reduce(function (accumulator, transaction) {
    if(determineIfIsExpense(transaction)){
        return accumulator
    }
    return accumulator + transaction.amount
}, 0)
}

// calculate total expenses
export function getTotalExpenses(transactions: (IncomeTransaction | ExpenseTransaction)[]){ 
    return Math.max(transactions.reduce(function (accumulator, transaction) {
    if(determineIfIsExpense(transaction)){
        return accumulator + transaction.amount
    }
    return accumulator
}, 0), 0)
}

export function getIncomeSortedByDate(transactions: (IncomeTransaction | ExpenseTransaction)[]){
    return transactions.filter((v) => !determineIfIsExpense(v)).sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function getExpenseSortedByDate(transactions: (IncomeTransaction | ExpenseTransaction)[]){
    return transactions.filter((v) => determineIfIsExpense(v)).sort((a, b) => b.date.getTime() - a.date.getTime());
}
