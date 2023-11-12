import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeContextProvider } from "./theme/ThemeContextProvider";
import {Auth0Provider} from '@auth0/auth0-react'

const domain = "dev-napcdqop1e3jgfuq.us.auth0.com";
const clientID = "4F8LUgsLCMFCHPAD3hbQwywCFM1geYpd";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeContextProvider>
<Auth0Provider
      domain = {domain} clientId = {clientID} authorizationParams={{
        redirect_uri: "http://localhost:3000/home"
    }}>
    <App />
    </Auth0Provider>
    </ThemeContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
