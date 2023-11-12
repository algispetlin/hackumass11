import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import { post } from "../services/RestService";

export const AuthenticateUser = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  if (!isLoading && !isAuthenticated) navigate('/login')

  if (isLoading) {
    return <></>;
  } else {
    post('/create-user', { "name": user!.name as string, "email": user!.email as string })
      .catch(() => { navigate('/login') })

    return <></>;
  }
};