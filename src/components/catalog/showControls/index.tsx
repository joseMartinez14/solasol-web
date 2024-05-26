import { Box, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material';
import { COLORS } from '../../../utils/Contants';
import { useMemo } from 'react';

interface filterItem {
    id: number;
    name: string;
}

interface ShowControlsProps {
    filters: filterItem[];
    selectedFilters: string[];
    onClick: (id: number, name: string) => void;
    onOrderByChange: (sort: string) => void;
}

const ShowControls = (props: ShowControlsProps) => {

    const { filters, selectedFilters, onClick, onOrderByChange } = props;

    const selectedFiltersData = useMemo(() => {
        return selectedFilters
    }, [selectedFilters]);

    return (
        <Box pt={2} px={3} width={"100%"}>
            <Grid container spacing={1.5} sx={{ width: "100%" }}>
                <Grid item md={6} xs={12}>
                    <Box >
                        <FormControl fullWidth>
                            <InputLabel id="select-label-1">Order by</InputLabel>
                            <Select labelId="select-label-1" label="Select 1" onChange={(item) => { onOrderByChange(item.target.value as string); }} >
                                <MenuItem value="price-desc">Precio: menor a mayor</MenuItem>
                                <MenuItem value="price-asc">Precio: mayor a menor</MenuItem>
                                {/* <MenuItem value="date-new">Más reciente</MenuItem> */}
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Box>
                        <Typography
                            variant="subtitle2"
                            gutterBottom
                            sx={{
                                color: COLORS.black,
                                fontSize: '22px',
                                margin: 0,
                                pb: 1,
                                fontWeight: 600,
                            }}>
                            {"Filtrar por categorias:"}
                        </Typography>
                        <Grid container spacing={1.5} sx={{ width: "100%" }}>
                            {filters.map((item, index) => (
                                <Grid item lg={3} md={6} xs={6} key={index}>
                                    <Paper elevation={1} sx={{ p: 0.5, backgroundColor: selectedFiltersData.includes(item.name) ? '#CBFCE5' : '' }} >
                                        <Box height={'100%'} width={'100%'}>
                                            <div onClick={() => onClick(item.id, item.name)}>
                                                <Typography
                                                    variant="subtitle2"
                                                    gutterBottom
                                                    textAlign={'center'}
                                                    sx={{
                                                        color: COLORS.black,
                                                        fontSize: '18px',
                                                        margin: 0,
                                                        padding: 0,
                                                        fontWeight: 500,
                                                    }}>
                                                    {item.name}
                                                </Typography>
                                            </div>
                                        </Box>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Grid>

            </Grid>



        </Box>
    )
}

export default ShowControls;