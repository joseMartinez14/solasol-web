import { Box, Paper, Typography } from "@mui/material";
import { COLORS, Texts } from "../../../utils/Contants";


const ShowHome = () => {

    const companySetupClick = () => {
        console.log("This is company set up")
    }

    return (
        <>
            <Box display={'flex'} alignItems={'center'} justifyContent={'center'} pt={4}>
                <div onClick={companySetupClick}>
                    <Paper
                        elevation={4}
                        sx={{
                            height: '65px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 3,
                            backgroundColor: COLORS.moradoClaro,
                            color: COLORS.white,
                            fontSize: '20px'
                        }}>
                        {Texts.company_setup_buttom}
                    </Paper>
                </div>

            </Box>
            <Box display={'flex'} alignItems={'center'} justifyContent={'center'} pt={4} flexDirection={'column'}>
                <Typography variant="h5" component="div">
                    ¿Para que sirve esta pagina?
                </Typography>
                <Typography component="div" p={3}>
                    Si eres una empresa pequena y quieres tener un catalogo digital GRATIS y sin preocuparte por el papeleo de un ecomerce completo.
                    Entonces somos para ustedes
                </Typography>
            </Box>
        </>
    );

};

export default ShowHome;