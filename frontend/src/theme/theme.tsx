import { PaletteMode } from "@mui/material";
import { amber, deepOrange, grey, deepPurple, lightBlue, red, teal } from "@mui/material/colors";

const theme = {
  palette: {
    primary: deepPurple,
  },
};

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: teal,
          background: {
            default: teal[400],
            primary: teal[200],
            secondary: teal[600]
          },
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: red,
          background: {
            default: grey[700],
            primary: red[800],
            secondary: grey[900]
          },
          text: {
            primary: "#fff",
            secondary: grey[500],
          },
        }),
  },
});

export default theme;
