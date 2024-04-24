import { Box, Typography } from "@mui/material";
import { COLORS } from '../../../utils/Contants';

interface ShowMessageProps {
    message: string;
    image_url: string;
}

const ShowMessage = (props: ShowMessageProps) => {

    const { message, image_url } = props;

    return (
        <Box>
            <Typography gutterBottom sx={{
                color: COLORS.black,
                fontSize: '12px',
                fontWeight: '400',
                textAlign: 'center',
                px: 2
            }}>
                {message}
            </Typography >
            <Box display="flex"
                alignItems={'center'} justifyContent={'space-evenly'} pt={3} px={2}
            >
            </Box>
        </Box >
    )
}


export default ShowMessage;
