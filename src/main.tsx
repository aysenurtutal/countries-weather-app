import 'leaflet/dist/leaflet.css';
import ReactDOM from "react-dom/client";
import {ApolloProvider} from "@apollo/client";
import client from "./apolloClient.ts";
import App from "./App.tsx";
import React from "react";
import './App.css';
import './index.css';
// declare module "*.module.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)
