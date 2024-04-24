import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const CompanyLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};

export default CompanyLayout;