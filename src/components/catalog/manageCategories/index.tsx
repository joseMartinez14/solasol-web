import { Controller } from 'react-hook-form';
import { Box, Button, Grid, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { COLORS } from '../../../utils/Contants';
import { CompanyCategory } from '../../../core/dtos/Products';
import React, { ChangeEvent, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';


interface ManageCategoriesProps {
    allCategories: CompanyCategory[];
    selectedCategories: CompanyCategory[];
    selectCategory: (category: CompanyCategory) => void;
    deleteCategory: (id: number) => void;
}

const ManageCategories = (props: ManageCategoriesProps) => {
    const { allCategories, selectedCategories, selectCategory, deleteCategory } = props;
    const [newCategory, setNewCategory] = useState<string>('');

    const onChange = (id: string) => {
        const selectedOption = allCategories.find(option => option.id === Number(id));
        const alreadySelectedCategories = selectedCategories.find(option => option.id === Number(id));
        if (!alreadySelectedCategories && selectedOption) {
            selectCategory(selectedOption);
        }
    };

    const addCategory = () => {
        if (newCategory) {
            selectCategory({ id: Date.now() * -1, name: newCategory });
        }
    };

    const deleteCategoryButton = (category_id: number) => {
        deleteCategory(category_id);
        console.log("Voy a eliminar a ", category_id);
    };

    return (
        <Box sx={{ width: '100%', height: '100%' }} display={'flex'} flexDirection={'column'} >
            <Box sx={{ width: '100%', height: '100%' }} display={'flex'} flexDirection={'row'} >
                <Box height={'100%'} width={'35%'} >
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
                        {'Categorias ya creadas'}
                    </Typography>
                    <Select
                        onChange={(item) => {
                            onChange(item.target.value as string);
                        }}
                        placeholder={'Categorias disponibles'}
                        sx={{
                            width: '90%',
                            color: COLORS.secondary,
                            borderColor: COLORS.neutral400,
                            backgroundColor: COLORS.neutral100,
                            height: '49px',
                            '&>svg': {
                                color: COLORS.neutral400,
                            },
                            '& .MuiSelect-iconOpen': {
                                transform: 'none',
                            },
                            textAlign: 'left',
                        }}>
                        {allCategories.map((item) => (
                            <MenuItem key={item.id} value={item.id} >
                                {item.name}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
                <Box height={'100%'} width={'65%'}>
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
                        {'Agregar nueva categoria'}
                    </Typography>
                    <Box height={'100%'} width={'100%'} display={'flex'} flexDirection={'row'}>
                        <Box height={'100%'} width={'70%'}>
                            <TextField
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
                                onChange={(event) => {
                                    setNewCategory(event.target.value)
                                }}
                                value={newCategory}
                                id={newCategory}
                                variant="outlined"
                            />
                        </Box>
                        <Box height={'100%'} width={'30%'}>
                            <Button
                                sx={{
                                    mb: 3,
                                    height: 48,
                                    fontSize: '20px',
                                    fontWeight: 600,
                                }}
                                variant="outlined"
                                onClick={addCategory}
                            >
                                {"Agregar"}
                            </Button>
                        </Box>
                    </Box>

                </Box>
            </Box>
            <Grid container spacing={1.5} sx={{ width: "100%" }} >
                {selectedCategories.map((item) => (
                    <Grid item lg={2} md={4} xs={6}>
                        <Paper elevation={1} sx={{ p: 0.5, backgroundColor: '#CBFCE5' }} >
                            <Box sx={{ width: '100%', height: '100%' }} display={'flex'} flexDirection={'row'} >
                                <Box height={'100%'} width={'80%'}>
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
                                </Box>
                                <Box height={'100%'} width={'20%'}>
                                    <div onClick={() => { deleteCategoryButton(item.id) }}>
                                        <DeleteIcon sx={{ pt: 0.5 }} />
                                    </div>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>

                ))}
            </Grid>
        </Box>
    );
};

export default ManageCategories;

