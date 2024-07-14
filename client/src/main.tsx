import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss'

import { ApolloProvider } from '@apollo/client';
import client from "../src/graphql/client.ts";

// import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <GoogleOAuthProvider clientId='269807828068-ansiu2a3cvtaka42oroe80v4mnenv5fs.apps.googleusercontent.com'> */}
    <ApolloProvider client={client}>
      <BrowserRouter>
          <App />
        </BrowserRouter>
    </ApolloProvider>
    {/* </GoogleOAuthProvider> */}
  </React.StrictMode>,
)