import { DatePicker } from "@mui/x-date-pickers";
import PageContainer from "../layout/PageContainer";
import { ThemeProvider } from '@mui/material/styles'
import { Button, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import TransactionContext from "../context/TransactionContext";
import { Colors } from "../ColorScheme";
import { theme } from "../layout/theme";
import { Categories } from "../data/Categories";
import { uniqueId } from "../calculations/rng";
import HistoricalTable from "../components/HistoricalTable";
import { getExpenseSortedByDate } from "../calculations/expenses";

/*
    With more time I would add a table at the bottom listing all of the expenses and the dates associated with them.

    I would also want to have done something better with the input. I didn't like how MUI makes their text input. I want it
    to be comma seperated by the 1000's and not allow for more than 2 decimal places. With more time I could have done it. 

    I would want to add label functionality for the expenses, so then people know which expense is which

    With more time I would also refactor the useEffects to be custom hooks
*/

//checking if a valid category is selected
function isCategory(value: string): value is Categories{
    return Object.keys(Categories).includes(value);
}

export default function ExpensesPage(){
    const {transactions, setTransactions} = useContext(TransactionContext);

    const [date, setDate] = useState<Date>(new Date());
    const [amount, setAmount] = useState<number>(0);
    const [category, setCategory] = useState<Categories>(Categories.Food)
    const [error, setError] = useState<boolean>(true);
    const [notification, setNotification] = useState<boolean>(false)

    const tableDataExpense = getExpenseSortedByDate(transactions);

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
        if(amount > 0 && date !== undefined && date.toString() !== 'Invalid Date' && isCategory(category)){
            setError(false);
        }
        else{
            setError(true)
        }
    }, [amount, category, date])

    //alert the user they haven't entered data correctly
    const errorMessage = error && <div className="bg-yellow-200 text-black p-4 mt-4">
       🛑 Attention: Please enter a valid date, an expense greater than 0, and a category from the dropdown. 🛑
    </div>

    // alert user when they've successfully submitted an expense
    const notificationMessage = notification && <div className={`bg-[${Colors.LightGreen}] text-black p-4 mt-4`}>
        You have successfully submitted!
    </div> 

    // add expense to transaction list
    function handleButtonClick(){
        setTransactions(transactions.concat([{
            amount,
            date,
            id: uniqueId(),
            category,
            label: 'Expense'
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
            <p className="text-6xl text-center">Add Expense</p>

            <div className="grid grid-rows-3 grid-cols-1 mt-12">
                <div className="flex flex-col justify-center items-center">
                    <p className="mt-6 mb-2 text-xl">Please enter the date of your expense.</p>

            
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

                <div className="flex flex-col justify-center items-center">
                    <p className="mt-6 mb-2 text-xl">Please select the spending category.</p>
                    <ThemeProvider theme={theme}>
                        <FormControl sx={{minWidth: 200}}>
                            <InputLabel id="">Spending Category</InputLabel>
                            <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={category}
                            label="Spending Category"
                            //in practice this is unsafe, but because I know the user has no input in the categories, this is fine for now
                            //in the future, I would use a filter/find function to determine which category this belongs to
                            onChange={(v) => setCategory(v.target.value as Categories)}
                            >
                                {Object.keys(Categories).map((v) => 
                                    <MenuItem value={v}>{v}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
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
            
            <div className="w-full flex flex-col justify-center items-center">
                <div className="items-center justify-end">
                    <p className="mt-2 mb-2 text-3xl underline text-center">Previous Expense Transactions</p>
                    <HistoricalTable data={tableDataExpense} isExpenseTable />
                </div>
            </div>
    </PageContainer>
    )
}