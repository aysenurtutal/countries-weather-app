import './index.css';
import App from "./App.tsx";
import ReactDOM from "react-dom/client";
import {ApolloProvider} from "@apollo/client";
import client from "./apolloClient.ts";
import React from "react";
import './App.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)
