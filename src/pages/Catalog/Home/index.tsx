import { AppBar, Box, Grid, Toolbar, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import LoadingModal from "../../../components/shared/LoadingModal";
import { useAllCompanies } from "../../../core/hooks/CompanyHook";
import CompanyCard from "../../../components/catalog/companyCard";

const CatalogHome = () => {

    const { data, error, isLoading: isLoadingCategories } = useAllCompanies();

    const Swal = require('sweetalert2');

    useEffect(() => {
        if (data) {
            console.log("*-*-*-*-*");
            console.log(data);
        }
        if (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error al recibir las empresas.",
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, error]);


    return (
        <>
            <LoadingModal open={(isLoadingCategories)} />
            <AppBar position="static" sx={{ backgroundColor: "black", mb: 2, height: 60 }}>
                <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" component="div">
                    </Typography>
                    <Typography variant="h5" component="div">
                        {"Easy Catalog Companies"}
                    </Typography>
                    <Typography variant="h6" component="div">
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box  >
                <Grid container spacing={2} sx={{ width: "100%", px: 4 }} >
                    {data?.map(item => (
                        <Grid item lg={4} md={6} xs={12}><CompanyCard id={item.id} name={item.name} description={item.description} /></Grid>
                    ))}
                </Grid>


            </Box >
        </>
    )
}


export default CatalogHome;