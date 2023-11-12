import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

import HomeHeaderMUI from '../components/HomeHeaderMUI';
import HomePageBody from '../components/HomePageBody';

import { CssBaseline, ThemeProvider } from "@mui/material";
import { useThemeContext } from "../theme/ThemeContextProvider";
import { post } from "../services/RestService";
import { UserSchema } from "../models/ApiModel";

const AuthorizeUser = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { theme } = useThemeContext();
  const [currentUser, setCurrentUser] = useState({} as UserSchema);
  const [posted, setPosted] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user && !posted) {
      post('/create-user', { 'name': user.name || '', 'email': user.email || '' })
        .then(response => { setPosted(true); setCurrentUser(response); })
        .catch(error => console.log(error));
    }
  }, [isAuthenticated, user, posted]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isAuthenticated && user) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HomeHeaderMUI user={ currentUser }/>
        <HomePageBody user={ currentUser }/>
      </ThemeProvider>
    );
  }

  return <Navigate to="/login" />
};

export default AuthorizeUser;