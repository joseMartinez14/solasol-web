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
                <Typography component="div" py={3} px={5} textAlign={'center'}>
                    Para pequeñas empresas que quieran administrar y presentar sus productos.
                    Tendras un catalogo virtual en el los cliente podran ver los productos disponible, ver las fotos, precios, descuentos y hasta tener un boton que direccione a su whatsapp para generar una venta.
                </Typography>
            </Box>
        </>
    );

};

export default ShowHome;