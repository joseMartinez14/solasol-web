import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const PrivateOnlyRoutes = () => {


    const [CompanyLogged, setCompanyLogged] = useState<string>(localStorage.getItem('easyCatalogCompanyName') || '');

    useEffect(() => {
        setCompanyLogged(localStorage.getItem('easyCatalogCompanyName') || '');
    }, [])

    if (CompanyLogged === '') return <Navigate to={'/signup'} />;
    if (CompanyLogged === '<Nombre de empresa>') return <Navigate to={'/signCompanyUp'} />;

    return <Outlet />;
};

export default PrivateOnlyRoutes;
