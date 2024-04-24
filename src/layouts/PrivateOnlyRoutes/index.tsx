import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';


const PrivateOnlyRoutes = () => {


    const [CompanyLogged, setCompanyLogged] = useState<string>(localStorage.getItem('instaCatalogCompanyName') || '');

    useEffect(() => {
        setCompanyLogged(localStorage.getItem('instaCatalogCompanyName') || '');
    })

    if (CompanyLogged == '') return <Navigate to={'/signup'} />;
    if (CompanyLogged == '<Nombre de empresa>') return <Navigate to={'/signCompanyUp'} />;

    return <Outlet />;
};

export default PrivateOnlyRoutes;
