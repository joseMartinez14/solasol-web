import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppContext } from '../../context/AppContext';
import { useForm } from 'react-hook-form';
import { SignUpCompanyForm, SignUpFullForm } from './type';
import TextInput from '../shared/TextInput';

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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {

    const { emailPasswordCreateUser, googleSignIn, user } = React.useContext(AppContext);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFullForm>({});

    const onSubmit = async (data: SignUpFullForm) => {
        console.log("THis is on submit login: ", data);
        const output = await emailPasswordCreateUser(data.email, data.password, data.name, data.companyName, data.companyDescription)
        console.log("---- output of handle submit -----");
        console.log(output);
    }



    const handleSubmit2 = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email')?.toString();
        const password = data.get('password')?.toString();
        const name = data.get('name')?.toString();
        const company_name = data.get('company_name')?.toString();
        let company_description = data.get('company_description')?.toString();
        if (company_description == undefined) {
            company_description = ""
        }

        console.log("This is the user before signup");
        console.log(user);

        if (email != null && password != null && name != null && company_name != null) {
            const output = await emailPasswordCreateUser(email, password, name, company_name, company_description)
            console.log("---- output of handle submit -----");
            console.log(output);

            console.log("This is the user after signup");
            console.log(user);
        } else {
            console.log("Ponga toda la vara miher");
        }
    };

    const handleGoogleSignIn = async () => {
        console.log("Before google sign in ***-*---*-*-*")
        const result = await googleSignIn();
        console.log("after google sign in ***-*---*-*-*")

    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="sm">
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
                        Sign up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextInput
                                    control={control}
                                    title={"Email"}
                                    value="email"
                                    isRequired={true}
                                    styles={{ mb: 3 }}
                                    error={errors?.email ? "Inserte el correo" : undefined}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextInput
                                    control={control}
                                    title={"Nombre"}
                                    value="name"
                                    isRequired={true}
                                    styles={{ mb: 3 }}
                                    error={errors?.name ? "Inserte su nombre" : undefined}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextInput
                                    control={control}
                                    title={"Password"}
                                    value="password"
                                    type='password'
                                    isRequired={true}
                                    styles={{ mb: 3 }}
                                    error={errors?.password ? "Inserte la contraseña" : undefined}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextInput
                                    control={control}
                                    title={"Nombre de compañia"}
                                    value="companyName"
                                    isRequired={true}
                                    styles={{ mb: 3 }}
                                    error={errors?.companyName ? "Inserte el nombre de la compañia" : undefined}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextInput
                                    control={control}
                                    title={"Descripcion de compañia"}
                                    value="companyDescription"
                                    isRequired={true}
                                    styles={{ mb: 3 }}
                                    error={errors?.companyDescription ? "Inserte la descripcion de la compañia" : undefined}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleGoogleSignIn}
                        >
                            Sign Up with google
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}