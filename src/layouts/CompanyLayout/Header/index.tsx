import React, { useEffect, useMemo, useState } from 'react';
import { AppBar, Box, Button, Toolbar, Typography, makeStyles } from '@mui/material';
import { Link } from 'react-router-dom';

import { COLORS } from '../../../utils/Contants';
import RecommendIcon from '@mui/icons-material/Recommend';
import { useMyCompany } from '../../../core/hooks/CompanyHook';
import { AppContext } from '../../../context/AppContext';
import { useNavigate } from "react-router-dom";


function Header() {

    const [CompanyLogged, setCompanyLogged] = useState<string>(localStorage.getItem('instaCatalogCompanyName') || '');

    const { logOut } = React.useContext(AppContext);
    const navigate = useNavigate();



    useEffect(() => {
        setCompanyLogged(localStorage.getItem('instaCatalogCompanyName') || '');
    })

    const logOutClick = () => {
        logOut();
        navigate('/solasol-web/');
    }

    return (
        <AppBar position="static" sx={{ backgroundColor: "black", mb: 2, height: 60 }}>
            <Toolbar >
                <RecommendIcon />
                <Typography variant="h5" component="div" sx={{ pl: '15px', flexGrow: 1 }}>
                    {CompanyLogged}
                </Typography>
                <Box>
                    <Button component={Link} to="/company" sx={{ color: COLORS.headerTextColor }}>Listar Productos</Button>
                    <Button component={Link} to="/company/product" sx={{ color: COLORS.headerTextColor }}>Agregar Producto</Button>
                    <Button sx={{ color: COLORS.headerTextColor }} onClick={logOutClick}>Logout</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;