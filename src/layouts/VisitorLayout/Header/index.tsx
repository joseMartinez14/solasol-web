import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles } from '@mui/material';

import { COLORS } from '../../../utils/Contants';

function Header() {

    return (
        <AppBar position="static" sx={{ backgroundColor: "black", mb: 2, height: 60 }}>
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" component="div">
                </Typography>
                <Typography variant="h4" component="div">
                    Solasol
                </Typography>
                <img
                    src="/path/to/your/logo.png"
                    alt="Logo"
                    style={{ maxWidth: 40 }}
                />
            </Toolbar>
        </AppBar>
    );
}

export default Header;