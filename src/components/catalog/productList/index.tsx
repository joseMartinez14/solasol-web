import { Box, Grid, Card, CardContent, Typography, CardHeader } from '@mui/material';
import CardGridGPT from '../GPT-Tests/card-grid';
import ProductItem from './productItem';
import { Product } from '../../../core/dtos/Products';

interface ProductListProps {
    products: Product[];
}

const ProductList = (props: ProductListProps) => {

    const { products } = props;
    const cardHeight = 600;
    const cardWidth = 350;

    return (
        <Box p={4} width={"100%"}>
            <Grid container spacing={4} justifyContent="center">
                {products.map((item) => (
                    <Grid item key={item.id}>
                        <ProductItem
                            title={item.name}
                            subtitle={item.description}
                            cardHeight={cardHeight}
                            cardWidth={cardWidth}
                            images={item.productImages}
                            stock={item.stock}
                            price={item.price}
                            discount={item.discount}
                            currency={item.currency}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default ProductList;