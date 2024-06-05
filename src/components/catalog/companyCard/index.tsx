import { Box, Divider, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


interface CompanyCardProps {
    id: number;
    name: string;
    description: string;
}


const CompanyCard = (props: CompanyCardProps) => {
    const navigate = useNavigate();
    const { id, name, description } = props;

    const onClick = (id: number) => {
        navigate(`/${id}/catalog`);
    }

    return (
        <div style={{ width: '100%', height: '100%' }} onClick={() => { onClick(id) }}>
            <Paper elevation={4}>
                <Box
                    width={'100%'}
                    height={'100%'}
                >
                    <Typography
                        gutterBottom
                        textAlign={"center"}
                        sx={{
                            fontSize: '22px',
                            margin: 0,
                            py: 1,
                            fontWeight: 600,
                        }}>
                        {name}
                    </Typography>
                </Box>
                <Divider />
                <Box width={'100%'} maxHeight={'200px'} >
                    <Box
                        px={1}
                        width={'100%'}
                        maxHeight={'190px'}
                        sx={{
                            overflow: 'auto',
                        }}
                    >
                        <Typography
                            gutterBottom
                            sx={{
                                fontSize: '18px',
                                margin: 0,
                                pb: 1,
                                fontWeight: 400,
                            }}>
                            {description}
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </div>
    )

}


export default CompanyCard;


