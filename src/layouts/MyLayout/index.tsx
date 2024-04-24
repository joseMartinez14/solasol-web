import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const MyLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};

export default MyLayout;