import { Box, Typography } from "@mui/material";
import { COLORS } from '../../utils/Contants';
import ShowControls from "../../components/catalog/showControls";
import ProductList from "../../components/catalog/productList";
import { useProducts } from "../../core/hooks/ProductHook";
import { useMemo } from "react";
import { Product } from "../../core/dtos/Products";


const Catalog = () => {

    const { data: allProducts, isLoading } = useProducts();

    const data = useMemo(() => {
        if (isLoading) return [];
        console.log(allProducts)
        if (allProducts !== undefined && allProducts !== void 0) {
            return allProducts;
        }
    }, [allProducts, isLoading]);

    return (
        <Box  >
            <ShowControls />
            {data !== undefined && data !== void 0 ? (<ProductList products={data} />) : (<></>)}
        </Box >
    )
}

export default Catalog;