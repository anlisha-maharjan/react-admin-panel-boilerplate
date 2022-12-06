import { createTheme } from "@mui/material/styles";
import { Palette } from "./Palette";

// A custom theme for this app
const theme = createTheme({
  palette: Palette,

  typography: {
    fontFamily: "Public Sans, sans-serif",
    body1: { fontSize: 14 },
    body2: { fontSize: 12 },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },
});

export default theme;
