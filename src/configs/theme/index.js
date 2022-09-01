import { createTheme } from "@mui/material/styles";
import { Typography } from "./_typography";
import { Palette } from "./_palette";

const sourceSansPro = {
  fontFamily: "Source Sans Pro",
};

// A custom theme for this app
const Theme = createTheme({
  typography: Typography,
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [sourceSansPro],
        html: {
          WebkitFontSmoothing: "auto",
        },
      },
    },
  },
  palette: Palette,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1200,
      lg: 1500,
      xl: 1920,
    },
  },
});

export default Theme;
