import { Box, Grid, Card, CardContent, Typography, CardHeader } from '@mui/material';
import CardGridGPT from '../GPT-Tests/card-grid';
import ProductItem from './productItem';
import { Product } from '../../../core/dtos/Products';
import { useEffect, useRef } from 'react';
import autoAnimate from '@formkit/auto-animate'
import { CSSTransition } from 'react-transition-group';
import './styles.css';


interface ProductListProps {
    products: Product[];
}

const ProductList = (props: ProductListProps) => {

    const { products } = props;
    const cardHeight = 600;
    const cardWidth = 350;

    return (
        <Box p={4} width={"100%"}>
            <Grid container spacing={2} justifyContent="center">
                {products.map((item) => (
                    <CSSTransition key={item.id} timeout={5000} classNames="item">
                        <Grid item key={item.id} style={{ animation: 'slide-in 0.5s ease-in-out' }}>
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
                    </CSSTransition>
                ))}
            </Grid>
        </Box>
    );
}

export default ProductList;

