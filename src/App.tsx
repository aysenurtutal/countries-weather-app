// App.tsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './layout/Layout';
import Routes from './Routes';

const App: React.FC = () => {
    return (
        <Router>
            <Layout>
                <Routes />
            </Layout>
        </Router>
    );
};

export default App;
