import React from 'react';
import { AppBar, Box, Button, Toolbar, Typography, makeStyles } from '@mui/material';

import { COLORS } from '../../../utils/Contants';

function Header() {

    return (
        <AppBar position="static" sx={{ backgroundColor: "black", mb: 2, height: 60 }}>
            <Toolbar >
                <img
                    src="/path/to/your/logo.png"
                    style={{ maxWidth: 40 }}
                />
                <Typography variant="h5" component="div" sx={{ pl: '15px', flexGrow: 1 }}>
                    My Company ("Easy Catalog maybe?")
                </Typography>
                <Box>
                    <Button sx={{ color: COLORS.headerTextColor }}>Login</Button>
                    <Button sx={{ color: COLORS.headerTextColor }}>Signup</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;