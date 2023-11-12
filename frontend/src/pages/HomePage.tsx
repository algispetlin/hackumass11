import React from 'react';
import HomeHeader from '../components/HomeHeader';
import HomeHeaderMUI from '../components/HomeHeaderMUI';
import HomePageBody from '../components/HomePageBody';

import { useThemeContext } from "../theme/ThemeContextProvider";

import { CssBaseline, ThemeProvider } from "@mui/material";

function HomePage() {
  const { theme } = useThemeContext();
  return (
    <>
    <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <HomeHeader /> */}
        <HomeHeaderMUI />
        <HomePageBody />
        </ThemeProvider>
    </>
  );
}

export default HomePage;