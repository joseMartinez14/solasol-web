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
import { Google as GoogleIcon } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppContext } from '../../context/AppContext';
import { useForm } from 'react-hook-form';
import { SignUpCompanyForm, SignUpFullForm } from './type';
import TextInput from '../shared/TextInput';
import { COLORS } from '../../utils/Contants';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LoadingModal from '../shared/LoadingModal';

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
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFullForm>({});

    const onSubmit = async (data: SignUpFullForm) => {
        console.log("THis is on submit login: ", data);
        let parsedPhone = "";
        if (data.phoneNumber) {
            parsedPhone = `506${data.phoneNumber}`;
        }
        const output = await emailPasswordCreateUser(data.email, data.password, data.name, data.companyName, data.companyDescription, parsedPhone)
        console.log("---- output of handle submit -----");
        console.log(output);
    }


    const handleGoogleSignIn = async () => {
        const result = await googleSignIn();
        navigate("/signCompanyUp");

    }

    return (
        <>
            <LoadingModal open={loading} />
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
                                <Grid item xs={4}>
                                    <>
                                        <Typography
                                            variant="subtitle2"
                                            gutterBottom
                                            sx={{
                                                color: COLORS.black,
                                                fontSize: '18px',
                                                margin: 0,
                                                padding: 0,
                                                fontWeight: 500,
                                            }}>
                                            {"País"}
                                        </Typography>
                                        <TextField
                                            disabled
                                            sx={{
                                                width: '100%',
                                                color: COLORS.secondary,
                                                borderColor: COLORS.neutral400,
                                            }}
                                            inputProps={{
                                                style: {
                                                    height: '16px',
                                                    backgroundColor: COLORS.neutral100,
                                                },
                                            }}
                                            value={"506"}
                                            id={"Country-506"}
                                            variant="outlined"
                                        />
                                    </>

                                </Grid>
                                <Grid item xs={8}>
                                    <TextInput
                                        control={control}
                                        title={"# whatsapp"}
                                        value="phoneNumber"
                                        isRequired={false}
                                        styles={{ mb: 3 }}
                                        justNumber
                                        error={errors?.phoneNumber ? "Inserte el numero de la compañia" : undefined}
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
                                startIcon={<GoogleIcon />}
                                onClick={handleGoogleSignIn}
                            >
                                Sign Up with google
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/signin" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Container>
            </ThemeProvider>
        </>
    );
}