import { PaletteMode } from "@mui/material";
import { amber, deepOrange, grey, deepPurple, lightBlue } from "@mui/material/colors";

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
          },
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: deepPurple,
          divider: deepPurple[200],
          background: {
            default: deepPurple[900],
            paper: deepPurple[900],
          },
          text: {
            primary: "#fff",
            secondary: grey[500],
          },
        }),
  },
});

export default theme;
