import React from 'react';
import { AppBar, Box, Button, Toolbar, Typography, makeStyles } from '@mui/material';
import { Link } from 'react-router-dom';

import { COLORS } from '../../../utils/Contants';

function Header() {

    return (
        <AppBar position="static" sx={{ backgroundColor: "black", mb: 2, height: 60 }}>
            <Toolbar >
                <Typography variant="h5" component="div" sx={{ pl: '15px', flexGrow: 1 }}>
                    Easy Catalog (Work in Progress)
                </Typography>
                <Box>
                    <Button sx={{ color: COLORS.headerTextColor }} component={Link} to="/signin">Login</Button>
                    <Button sx={{ color: COLORS.headerTextColor }} component={Link} to="/signup">Signup</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;