import { Card, Typography } from "@mui/material";
import { Colors } from "../ColorScheme";
import { useEffect, useState } from "react";
import { ExpenseTransaction, IncomeTransaction } from "../data/Transactions";
import { DisplayCardModal } from "./DisplayCardModal";

interface DisplayCardProps {
    borderColor: string,
    textColor: string,
    label: string,
    displayedAmount: string,
    transaction: IncomeTransaction | ExpenseTransaction
}

export default function DisplayCardHistory({ transaction, borderColor, label, displayedAmount, textColor}: DisplayCardProps){
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false)

    useEffect(() => {
        if (open) {
          document.addEventListener('mousedown', handleClose);
        }
    
        return () => {
          document.removeEventListener('mousedown', handleClose);
        };
    
      }, [open]);

    return(
        <Card
            style={{
              height: "50px",
              marginTop: "4px",
              display: "flex",
              width: "500px",
              justifyContent: "space-between",
              backgroundColor: Colors.DarkGray,
              alignItems: "center",
              borderRight: `4px solid ${borderColor}`,
              cursor: "pointer",
              
            }}
            onClick={handleOpen}
          >
            <Typography marginLeft={1} color={Colors.LightGray}>
              {/* Truncate the label if its length exceeds 44 characters */}
              {label.length > 44 ? label.slice(0, 44) + "..." : label}
            </Typography>
            <Typography marginRight={1} color={textColor}>
              {displayedAmount}
            </Typography>

            {open && <DisplayCardModal transaction={transaction} open={open} handleClose={handleClose}/>}
          </Card>
    )
}