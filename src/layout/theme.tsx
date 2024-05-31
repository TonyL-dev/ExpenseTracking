import { createTheme } from "@mui/material";

// theme for material UI
export const theme = createTheme({
    palette: {
      mode: 'dark'
    }
  });


// styling for modal
export const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };