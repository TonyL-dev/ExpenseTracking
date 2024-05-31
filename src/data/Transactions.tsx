/*
    To me, it didn't make much sense to seperate Income and Expenses as two seperate object when they are just negations of the other.
    I wanted to keep them as close as possible to reuse the code because the logic is nearly identical. I added a type guard to determine
    which type a certain transaction is based on if the "Category" type is present

    Logic behind the setup of transactions: since the only thing that seperates an income transaction from an expense transaction
    is if there's a category, I used IncomeTransactions as the base interface, and ExpensiveTransaction extends IncomeTransaction
    because it adds the Category. In the future, I would keep it as 1 interface, as Transaction, and simply have a "type".

    Further notes:
    (1) I added a type guard on transactions because I want to be able to differentiate between the two
*/

import { uniqueId } from "../calculations/rng";
import { Categories } from "./Categories";

export interface IncomeTransaction {
    id: number,
    amount: number,
    date: Date,
    label: string,
}

export interface ExpenseTransaction extends IncomeTransaction{
    category: Categories.Car | Categories.Food | Categories.Rent
}

// hard coded data to work with
export const TRANSACTION_HISTORY: (ExpenseTransaction | IncomeTransaction)[] = [
    {
        id: uniqueId(),
        amount: 100.5555,
        date: new Date(2023, 5, 14),
        label: "Lucky Day"
    },
    {
        id: uniqueId(),
        amount: 150,
        category: Categories.Food,
        date: new Date(2021, 1, 1),
        label: "Restaurant"
    },
    {
        id: uniqueId(),
        amount: 300,
        category: Categories.Car,
        date: new Date(2024,2,3),
        label: "Insurance"
    },
    {
        id: uniqueId(),
        amount: 20,
        category: Categories.Food,
        date: new Date(),
        label: "Cheese"
    }
]