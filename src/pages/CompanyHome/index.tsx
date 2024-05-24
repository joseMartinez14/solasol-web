import { Box, Typography } from "@mui/material";
import { useProducts, useProductsByCompanyID } from "../../core/hooks/ProductHook";
import { useEffect, useMemo } from "react";
import ProductsTable from "../../components/catalog/productsTable";
import { useNavigate } from "react-router-dom";
import LoadingModal from "../../components/shared/LoadingModal";


interface Data {
    id: number;
    name: string;
    description: string;
    price: number;
    discount: number;
    stock: number;
    created_at?: Date;
    updated_at?: Date;
    currency: string;
}

const CompanyHome = () => {

    const navigate = useNavigate();
    const { data: allProducts, isLoading, error } = useProducts();
    const Swal = require('sweetalert2');

    useEffect(() => {
        if (error) {
            Swal.fire("Primero se tiene que loggear.").then(navigate("/"));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);

    const products_list_data = useMemo(() => {
        const temp_list: Data[] = [];
        if (isLoading) return [];
        console.log(allProducts)
        if (allProducts !== undefined && allProducts !== void 0) {
            allProducts.forEach((product) => {
                temp_list.push({
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    discount: product.discount,
                    stock: product.stock,
                    currency: product.currency
                })
            });
            return temp_list;
        }
    }, [allProducts, isLoading]);

    return (
        <div  >
            <LoadingModal open={(isLoading)} />
            <Box textAlign="center" pt={4}>
                <Typography variant="h4" sx={{ fontSize: "32px" }}>
                    My Products
                </Typography>
            </Box>
            <Box p={2}>
                <ProductsTable products={(products_list_data !== null && products_list_data !== undefined) ? products_list_data : []} />
            </Box>
        </div >
    )
}

export default CompanyHome;