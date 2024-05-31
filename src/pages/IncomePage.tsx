import { DatePicker } from "@mui/x-date-pickers";
import PageContainer from "../layout/PageContainer";
import { ThemeProvider } from '@mui/material/styles'
import { Button, InputAdornment, OutlinedInput } from "@mui/material";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import TransactionContext from "../context/TransactionContext";
import { Colors } from "../ColorScheme";
import { theme } from "../layout/theme";
import { uniqueId } from "../calculations/rng";
import { getIncomeSortedByDate } from "../calculations/expenses";
import HistoricalTable from "../components/HistoricalTable";

/*
    With more time I would add a table at the bottom listing all of the incomes and the dates associated with them.

    I would also want to have done something better with the input. I didn't like how MUI makes their text input. I want it
    to be comma seperated by the 1000's and not allow for more than 2 decimal places. With more time I could have done it. 
*/

export default function IncomePage(){
    const {transactions, setTransactions} = useContext(TransactionContext);

    const [date, setDate] = useState<Date>(new Date());
    const [amount, setAmount] = useState<number>(0);
    const [error, setError] = useState<boolean>(true);
    const [notification, setNotification] = useState<boolean>(false)

    const tableDataIncome = getIncomeSortedByDate(transactions);

    function handleChange(e: ChangeEvent<HTMLInputElement>){
        let value = !Number.isNaN(e.target.valueAsNumber) ? e.target.valueAsNumber : 0;
        if(value < 0){
            value = 0;
        }
        setAmount(value);
    }

    function handleDateChange(e: dayjs.Dayjs | null){
        if (e === null){
            return;
        }
        if(e.toDate().valueOf > new Date().valueOf){
            return;
        }
        setDate(e?.toDate())
    }

    useEffect(() => {
        if(amount > 0 && date !== undefined && date.toString() !== 'Invalid Date'){
            setError(false);
        }
        else{
            setError(true)
        }
    }, [amount, date])

    const errorMessage = error && <div className="bg-yellow-200 text-black p-4 mt-4">
       🛑 Attention: Please enter a valid date & an amount greater than 0. 🛑
    </div>

    const notificationMessage = notification && <div className={`bg-[${Colors.LightGreen}] text-black p-4 mt-4`}>
        You have successfully submitted!
    </div> 

    function handleButtonClick(){
        setTransactions(transactions.concat([{
            amount,
            date,
            id: uniqueId(),
            label: 'Income'
        }]))
        setNotification(true);
    }

    useEffect(() => {
        let timer: string | number | NodeJS.Timeout | undefined;
        if(notification){
           timer = setTimeout(() => {
                setNotification(false)
            }, 3000)
        }
        return () => clearTimeout(timer)
    }, [notification])

    return(
        <PageContainer>
        <p className="text-6xl text-center">Add Income</p>

        <div className="grid grid-rows-2 grid-cols-1 mt-12">
            <div className="flex flex-col justify-center items-center">
                <p className="mt-6 mb-2 text-xl">Please enter when you received the income.</p>

        
                <ThemeProvider theme={theme}>
                <DatePicker defaultValue={dayjs(new Date())} onChange={handleDateChange}
                disableFuture label="Select the Date" />
                </ThemeProvider>
            </div>

            <div className="flex flex-col justify-center items-center">
                <p className="mt-6 mb-2 text-xl">Please enter the amount.</p>

        
                <ThemeProvider theme={theme}>
                    <OutlinedInput value={amount} type="number" onChange={handleChange} startAdornment={<InputAdornment position="start">$</InputAdornment>} required />
                    
                </ThemeProvider>
            </div>
        </div>
        
        <div className="flex flex-col justify-center items-center mt-4">
        <ThemeProvider theme={theme}>
            <Button variant="outlined" disabled={error || notification} onClick={handleButtonClick}>Submit</Button>
        </ThemeProvider>
        {errorMessage}
        {notificationMessage}
        </div>

        <hr className="h-px mt-4 mb-2 bg-gray-700 border-0"></hr>

        <div className="w-full flex flex-col justify-center items-center">
            <div className="items-center justify-end">
                <p className="mt-2 mb-2 text-3xl underline text-center">Previous Income Transactions</p>
                <HistoricalTable data={tableDataIncome} isExpenseTable={false} />
            </div>
        </div>
    
    </PageContainer>
    )
}