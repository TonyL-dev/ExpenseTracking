import PageContainer from "../layout/PageContainer";
import { Colors } from "../ColorScheme";
import DisplayCard from "../components/DisplayCard";
import DisplayCardHistory from "../components/DisplayCardHistory";
import { useContext, useState } from "react";
import TransactionContext from "../context/TransactionContext";
import { theme } from "../layout/theme";
import { Button, ThemeProvider } from "@mui/material";
import { getBorderColor, getTotalExpenses, getTotalIncome, prettyPrintMoney, printTransaction } from "../calculations/expenses";


/*
    One of the requirements says that "Check sum(expenses) >= total income, but I thought it would be a bad user experience 
    if the user was limited to only spending the exact amount of money as they have. I decided to add a message at the bottom
    stating their financial situation"
*/


function HomePage() {
    //Message for when their balance is positive
    const positiveMessage = <div className="bg-green-200 text-center text-xl rounded-md text-black p-16 ml-4 mt-16">
✅ Congratulations! You are money-smart. Keep up the good work! ✅
</div>

    //Message for when their balance is negative
    const negativeMessage = <div className="font-bold text-center text-xl bg-yellow-200 rounded-md text-black p-16 ml-4 mt-16">
   🛑 WARNING! You are spending more than you are earning. Please review your spending habits. 🛑
</div>

  const {transactions} = useContext(TransactionContext);
  const [showMore, setShowMore] = useState<boolean>(false)

  //sort all transactions based on most recent
  let filteredTransactions = transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
  
  //only show 4 transactions, unless the user wants to see more
  if(filteredTransactions.length > 4 && !showMore){
    filteredTransactions = filteredTransactions.slice(0, 4)
  }


    const totalIncome = getTotalIncome(transactions);
    const totalExpenses = getTotalExpenses(transactions);
    const balance = totalIncome - totalExpenses;

  return (
    <PageContainer>
        <p className="text-6xl text-center">Expense Summary</p>
        
        <span className="mt-6 text-2xl underline">Your Balance:</span> <span className="mt-6 mb-2 text-2xl ">{prettyPrintMoney(balance)}</span>
        <div className="grid grid-cols-2 grid-rows-1 space-x-4 mb-4 mt-2">

            <DisplayCard to="income" header="Income" color={Colors.DarkGreen} displayedAmount={prettyPrintMoney(totalIncome)} />
            <DisplayCard to="expenses" header="Expenses" color={Colors.Red} displayedAmount={prettyPrintMoney(totalExpenses)} />
        </div>
        <hr className="h-px mt-8 mb-2 bg-gray-700 border-0"></hr>
        <div className="grid grid-cols-2 mt-2">
            <div>
                <p className="mt-6 mb-2 text-2xl underline">Transaction History</p>

                {filteredTransactions.map((item) =>
                    
                    <DisplayCardHistory transaction={item} displayedAmount={printTransaction(item)} borderColor={getBorderColor(item)} label={item.label} textColor={getBorderColor(item)} key={item.id}/>
                )}
                
                <div className="mt-2">
                    <ThemeProvider theme={theme}>
                        {transactions.length >= 5 && <Button variant="outlined" onClick={(v) => setShowMore(!showMore)}>Show {showMore ? 'Less' : 'More'}</Button>}
                    </ThemeProvider>
                </div>
            </div>
            <div>    
                {balance >= 0 ? positiveMessage : negativeMessage}
            </div>
        </div>
    </PageContainer>
  );
};

export default HomePage;