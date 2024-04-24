import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { AppContext } from '../../context/AppContext';
import { Google as GoogleIcon } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { LoginForm } from './type';
import TextInput from '../shared/TextInput';
import { useNavigate } from "react-router-dom";


function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function SignIn() {

    const { emailPasswordSignIn, googleSignIn } = React.useContext(AppContext);
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({});

    const onSubmit = async (data: LoginForm) => {
        console.log("THis is on submit login: ", data);
        const output = await emailPasswordSignIn(data.email, data.password)
        console.log("---- output -----")
        console.log(output)
    }

    const handleSignInWithGoogle = async () => {
        console.log("Google sign in")
        const result = await googleSignIn();
        if (result.outcome) {
            navigate("/company");
        }
        else {
            console.log("googleSignIn failed, ", result.message)
        }

    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                    <TextInput
                        control={control}
                        title={"Email"}
                        value="email"
                        isRequired={true}
                        styles={{ mb: 3 }}
                        error={errors?.email ? "Inserte el correo" : undefined}
                    />
                    <TextInput
                        control={control}
                        title={"Password"}
                        value="password"
                        isRequired={true}
                        type='password'
                        styles={{ mb: 3 }}
                        error={errors?.password ? "Inserte la contraseña" : undefined}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<GoogleIcon />}
                        onClick={handleSignInWithGoogle}
                        sx={{ mt: 0, mb: 2 }}
                    >
                        Sign in with Google
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}