import { ThemeProvider } from "@emotion/react";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { prettyPrintMoney } from "../calculations/expenses";
import { theme } from "../layout/theme";
import { ExpenseTransaction, IncomeTransaction } from "../data/Transactions";

interface HistoricalDataProps{
    data: IncomeTransaction[] | ExpenseTransaction[],
    isExpenseTable: boolean
}

// Add table that displays history
export default function HistoricalTable({data, isExpenseTable}: HistoricalDataProps){
    return (
        <ThemeProvider theme={theme}>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="right">Label</TableCell>
                            {isExpenseTable && <TableCell align="right">Category</TableCell>}
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {data.map((row) => (
                            <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.date.toDateString()}
                                </TableCell>
                                <TableCell align="right">{prettyPrintMoney(row.amount)}</TableCell>
                                <TableCell align="right">{row.label}</TableCell>
                                {isExpenseTable && <TableCell align="right">{(row as ExpenseTransaction)?.category}</TableCell>}
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </ThemeProvider>
    )
}