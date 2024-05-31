import { Button, Card, CardActions, CardContent, ThemeProvider, Typography } from "@mui/material";
import { Colors } from "../ColorScheme";
import { Link } from "react-router-dom";
import { theme } from "../layout/theme";

interface DisplayCardProps {
    header: string,
    displayedAmount: string,
    color: string,
    to: string
}

export default function DisplayCard({ header, displayedAmount, color, to}: DisplayCardProps ){
    return (<Card style={{backgroundColor: `${Colors.DarkGray}`}} variant="outlined">
        <CardContent>
        <Typography variant="h3" color="#FFFFFF" gutterBottom align="center">
          {header}
        </Typography>
        <Typography variant="h2" align="center" color={color}>
          {displayedAmount}
        </Typography>
      </CardContent>
      <CardActions>
      <Link to={to}>
        <ThemeProvider theme={theme}>
          <Button size="medium" variant="outlined">Learn More</Button>
        </ThemeProvider>
      </Link>
      </CardActions>
    </Card>
    )
}