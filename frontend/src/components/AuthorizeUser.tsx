import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

import HomeHeaderMUI from '../components/HomeHeaderMUI';
import HomePageBody from '../components/HomePageBody';

import { CssBaseline, ThemeProvider } from "@mui/material";
import { useThemeContext } from "../theme/ThemeContextProvider";
import { post } from "../services/RestService";

const AuthorizeUser = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { theme } = useThemeContext();
  const [currentUser, setCurrentUser] = useState({} as { name: string, email: string });
  const [posted, setPosted] = useState(false);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isAuthenticated && user) {
    if (!posted) {
      setPosted(true);
      setCurrentUser({ 'name': user.name!, 'email': user.email! });
      
      post('/create-user', currentUser)
        .catch(error => console.log(error));
    }
    
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HomeHeaderMUI />
        <HomePageBody />
      </ThemeProvider>
    );
  }

  return <Navigate to="/login" />
};

export default AuthorizeUser;