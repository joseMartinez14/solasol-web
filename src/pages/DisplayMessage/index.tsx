import { Box, Typography } from "@mui/material";
import { COLORS } from '../../utils/Contants';
import ShowMessage from "../../components/FunnyMessages/ShowMessage";


const DisplayMessage = () => {
    return (
        <Box height={'77vh'} display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} >
            <ShowMessage message="Example message pla p" image_url="https://special-cards-s3-bucket.s3.us-east-2.amazonaws.com/messageImages/WhatsApp+Image+2023-10-14+at+12.50.59+(3).jpeg" />
        </Box >
    )
}

export default DisplayMessage;