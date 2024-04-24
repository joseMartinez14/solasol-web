import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const VisitorLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};

export default VisitorLayout;