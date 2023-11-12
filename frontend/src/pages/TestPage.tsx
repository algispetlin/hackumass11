import React from 'react';
import HomeHeader from '../components/HomeHeader';
import HomePageBody from '../components/HomePageBody';

import { CssBaseline, ThemeProvider } from "@mui/material";
import NightModeToggle from "../components/NightModeToggle";
import { useThemeContext } from "../theme/ThemeContextProvider";

function HomePage() {
  const { theme } = useThemeContext();
  return (
    
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <NightModeToggle />
    </ThemeProvider>
  );
}

export default HomePage;