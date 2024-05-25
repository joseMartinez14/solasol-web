import { Box, Paper, Typography } from "@mui/material";
import { COLORS } from "../../../utils/Contants";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const ShowHome = () => {

    const [buttomText, setButtomText] = useState<string>("Configurar mi empresa");
    const [redirectPage, setRedirectPage] = useState<string>("/");

    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('firebaseAuthToken');
        const company_name = localStorage.getItem('easyCatalogCompanyName');
        if (auth) {
            if (auth !== 'Null token') {
                if (company_name) {
                    setRedirectPage("/company");
                    setButtomText("Mi compañía");
                }
            }
        }

    }, [navigate])


    const companySetupClick = () => {
        navigate(redirectPage);

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
                        {buttomText}
                    </Paper>
                </div>

            </Box>
            <Box display={'flex'} alignItems={'center'} justifyContent={'center'} pt={4} flexDirection={'column'}>
                <Typography variant="h5" component="div">
                    ¿Para que sirve esta pagina?
                </Typography>
                <Typography component="div" py={3} px={5} textAlign={'center'}>
                    Para pequeñas empresas que quieran administrar y presentar sus productos.
                    Tendras un catalogo virtual en el los cliente podran ver los productos disponible, ver las fotos, precios, descuentos y hasta tener un boton que direccione a su whatsapp para generar una venta.
                </Typography>
            </Box>
        </>
    );

};

export default ShowHome;