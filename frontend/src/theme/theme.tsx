import { PaletteMode } from "@mui/material";
import { amber, deepOrange, grey, deepPurple, lightBlue, red } from "@mui/material/colors";

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
          primary: lightBlue,
          divider: lightBlue[200],
          background: {
            default: lightBlue[200],
            paper: lightBlue[200],
            secondary: lightBlue[400]
          },
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: red,
          divider: grey[800],
          background: {
            default: grey[700],
            paper: red[800],
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
