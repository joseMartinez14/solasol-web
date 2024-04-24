import React, { useEffect, useState } from 'react';
import { AppBar, Box, Button, Toolbar, Typography, makeStyles } from '@mui/material';
import { Link } from 'react-router-dom';

import { COLORS } from '../../../utils/Contants';
import RecommendIcon from '@mui/icons-material/Recommend';

function Header() {

    const [CompanyLogged, setCompanyLogged] = useState<string>(localStorage.getItem('instaCatalogCompanyName') || '');

    useEffect(() => {
        setCompanyLogged(localStorage.getItem('instaCatalogCompanyName') || '');
    })

    return (
        <AppBar position="static" sx={{ backgroundColor: "black", mb: 2, height: 60 }}>
            <Toolbar >
                <RecommendIcon />
                <Typography variant="h5" component="div" sx={{ pl: '15px', flexGrow: 1 }}>
                    {CompanyLogged}
                </Typography>
                <Box>
                    <Button component={Link} to="/company/1" sx={{ color: COLORS.headerTextColor }}>Listar Productos</Button>
                    <Button component={Link} to="/company/1/product" sx={{ color: COLORS.headerTextColor }}>Agregar Producto</Button>
                    <Button sx={{ color: COLORS.headerTextColor }}>Logout</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;