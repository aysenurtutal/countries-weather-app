import React from 'react';
import { Route, Routes as ReactRoutes } from 'react-router-dom';
import CountryList from './components/CountryList';
import CountryModal from './core/modals/CountryDetailsDialog';

const Routes: React.FC = () => {
    return (
        <ReactRoutes>
            <Route path="/" element={<CountryList />} />
            <Route path="/country/:name" element={<CountryModal />} />
        </ReactRoutes>
);
};

export default Routes;
