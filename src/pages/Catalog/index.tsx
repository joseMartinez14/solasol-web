import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { COLORS } from '../../utils/Contants';
import ShowControls from "../../components/catalog/showControls";
import ProductList from "../../components/catalog/productList";
import { useProductsByCompanyID } from "../../core/hooks/ProductHook";
import { useEffect, useMemo, useState } from "react";
import { Product } from "../../core/dtos/Products";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useParams } from "react-router-dom";
import { useCategoriesByCompanyID } from "../../core/hooks/CategoryHook";
import LoadingModal from "../../components/shared/LoadingModal";

const Catalog = () => {

    const { company_id } = useParams();

    const { data: allProducts, isLoading: isLoadingProducts } = useProductsByCompanyID(company_id || '-1');
    const { data: allCategories, isLoading: isLoadingCategories } = useCategoriesByCompanyID(company_id || '-1');
    const [categoryFilters, setcategoryFilters] = useState<string[]>([]);
    const [orderBy, setOrderBy] = useState<string>('');
    const [companyName, setCompanyName] = useState<string>('');

    const Swal = require('sweetalert2');

    const is_not_filtered = (prod: Product): Boolean => {
        if (prod.categories) {
            for (let i = 0; i < categoryFilters.length; i++) {
                let temp_bool = false;
                for (let j = 0; j < prod.categories.length; j++) {
                    if (prod.categories[j].name == categoryFilters[i]) {
                        temp_bool = true;
                    }
                }
                if (!temp_bool) return false;
            }
            return true;
        } else {
            return false;
        }
    }

    const onOrderByChange = (sort: string) => {
        setOrderBy(sort);
    }

    const sortProducts = (list: Product[]): Product[] => {

        if (orderBy == 'price-desc') {
            return list.sort((a, b) => a.price - b.price);
        }
        if (orderBy == 'price-asc') {
            return list.sort((a, b) => b.price - a.price);
        }
        if (orderBy == 'date-new') {
            console.log("On date change")
            return list.slice().sort((productA, productB) => {
                // Handle potential missing created_at values
                console.log("-------------")
                console.log(productA)
                console.log(productB)

                if (!productA.created_at || !productB.created_at) {
                    console.log("111111")
                    return productA.created_at ? -1 : (productB.created_at ? 1 : 0);
                }

                // Sort by created_at in descending order (latest first)
                return productB.created_at.getTime() - productA.created_at.getTime();
            });
        }

        return list;
    }

    const data = useMemo(() => {

        if (isLoadingProducts) return [];
        if (allProducts !== undefined && allProducts !== void 0) {
            if (allProducts.length > 0) {
                if (allProducts[0].company) {
                    setCompanyName(allProducts[0].company.name);
                }
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "La empresa no existe o no tiene ningun producto",
                });
            }
            let products_to_return = [];
            if (categoryFilters.length === 0) {
                products_to_return = allProducts;
            }
            else {
                products_to_return = allProducts.filter(item => is_not_filtered(item));
            }

            return sortProducts(products_to_return);
        }
    }, [isLoadingProducts, categoryFilters, orderBy]);

    const onCategoryFilterClick = (id: number, name: string) => {
        if (categoryFilters.includes(name)) {
            //Lo tengo que desseleccionar
            setcategoryFilters(categoryFilters.filter((cat) => cat !== name));
        } else {
            //Lo tengo que agregar
            setcategoryFilters([...categoryFilters, name]);
        }
    }

    return (
        <>
            <LoadingModal open={(isLoadingCategories || isLoadingProducts)} />
            <AppBar position="static" sx={{ backgroundColor: "black", mb: 2, height: 60 }}>
                <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" component="div">
                    </Typography>
                    <Typography variant="h4" component="div">
                        {companyName}
                    </Typography>
                    <ShoppingCartIcon />
                </Toolbar>
            </AppBar>
            <Box  >
                <ShowControls filters={allCategories || []} selectedFilters={categoryFilters} onClick={onCategoryFilterClick} onOrderByChange={onOrderByChange} />
                {data !== undefined && data !== void 0 ? (<ProductList products={data} />) : (<></>)}
            </Box >
        </>
    )
}


export default Catalog;