import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: { main: "#00FF00" }, // Green
    background: { default: "#000000" }, // Black
    text: { primary: "#FFFFFF" }, // White text
  },
  typography: {
    fontFamily: "Roboto, sans-serif", // Default body font
    h4: {
      fontFamily: "Montserrat, sans-serif", // Heading font
      fontWeight: 700, // Bold
    },
    h6: {
      fontFamily: "Montserrat, sans-serif",
      fontWeight: 400, // Regular
    },
    button: {
      fontFamily: "Montserrat, sans-serif",
      fontWeight: 500,
      textTransform: "none", // Optional: removes uppercase default
    },
  },
});