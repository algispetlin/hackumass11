import React, { useEffect } from 'react';
import HomeHeader from '../components/HomeHeader';
import HomeHeaderMUI from '../components/HomeHeaderMUI';
import HomePageBody from '../components/HomePageBody';

import { useThemeContext } from "../theme/ThemeContextProvider";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { useThemeContext } from "../theme/ThemeContextProvider";
import { AuthenticateUser } from '../components/UserInfo';

function HomePage() {
  const { theme } = useThemeContext();
  
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <HomeHeader /> */}
        <HomeHeaderMUI />
        <HomePageBody />
        <AuthenticateUser />
      </ThemeProvider>
    </>
  );
}

export default HomePage;