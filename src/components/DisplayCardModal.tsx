import { Box, Modal, Typography } from "@mui/material"
import { ExpenseTransaction, IncomeTransaction } from "../data/Transactions"
import { style } from "../layout/theme"
import { determineIfIsExpense, prettyPrintMoney } from "../calculations/expenses"

interface ModalProps{
    transaction: ExpenseTransaction | IncomeTransaction,
    open: boolean,
    handleClose: () => void
}

// The popup when you click on transaction history
export function DisplayCardModal({ transaction, open, handleClose}: ModalProps){
    return(
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Transaction Information
          </Typography>
          <p>
            Id: {transaction.id}
          </p>
          <p>
            Amount: {prettyPrintMoney(transaction.amount)}
          </p>
          <p>
            Date: {transaction.date.toString()}
          </p>
          <p>
            Label: {transaction.label}
          </p>
          {/* Only show if it is an expense object */}
          <p>
            {determineIfIsExpense(transaction) && `Category: ${(transaction as ExpenseTransaction)?.category}`}
          </p>
        </Box>
      </Modal>
    )
}