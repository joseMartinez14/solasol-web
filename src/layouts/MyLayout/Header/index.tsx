import React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import { COLORS } from '../../../utils/Contants';
import { AppContext } from '../../../context/AppContext';

function Header() {

    const { googleSignIn } = React.useContext(AppContext);
    const navigate = useNavigate();
    const Swal = require('sweetalert2');

    const handleSignInWithGoogle = async () => {
        console.log("Google sign in")
        const result = await googleSignIn();
        console.log("Local storage login: ", localStorage.getItem('firebaseAuthToken'));
        if (result.outcome) {
            navigate("/company");
        }
        else {
            console.log("googleSignIn failed, ", result.message)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Login failed.",
            });
        }

    }

    return (
        <AppBar position="static" sx={{ backgroundColor: "black", mb: 2, height: 60 }}>
            <Toolbar >
                <Typography variant="h5" component="div" sx={{ pl: '15px', flexGrow: 1 }}>
                    Easy Catalog (Work in Progress)
                </Typography>
                <Box>
                    <Button sx={{ color: COLORS.headerTextColor }} onClick={handleSignInWithGoogle}>Login</Button>
                    <Button sx={{ color: COLORS.headerTextColor }} component={Link} to="/signup">Signup</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;

function googleSignIn() {
    throw new Error('Function not implemented.');
}
