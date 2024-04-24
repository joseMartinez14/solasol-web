import { Card, CardContent, Typography, CardHeader, Box } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useState } from 'react';
import { ProductImages } from '../../../../core/dtos/Products';


interface ProductItemProps {
    title: string;
    subtitle: string;
    cardHeight: number;
    cardWidth: number;
    images?: ProductImages[];
    price: number;
    stock: number;
    discount: number;
    currency: string;
}

const ProductItem = (props: ProductItemProps) => {

    const { title, subtitle, cardHeight, cardWidth, images, price, stock, discount, currency } = props;
    const subtitleMaxLenght = 65;

    const [fotoindex, setFotoIndex] = useState<number>(0);

    const nextPicture = () => {
        if (images) {
            if ((fotoindex + 1) >= images.length) {
                setFotoIndex(0)
            } else {
                setFotoIndex(fotoindex + 1)
            }
        }
    }
    const prevPicture = () => {
        if (images) {
            if ((fotoindex - 1) < 0) {
                setFotoIndex(images.length - 1)
            } else {
                setFotoIndex(fotoindex - 1)
            }
        }
    }

    return (
        <Card sx={{ width: cardWidth, height: cardHeight }} raised>
            <CardHeader
                title={title}
                subheader={subtitle.length > subtitleMaxLenght ? `${subtitle.substring(0, subtitleMaxLenght)}...` : subtitle}
                sx={{ height: (cardHeight * 0.15) }}
            />
            <CardContent sx={{ height: (cardHeight * 0.85) }}>
                <Box width={"100%"} height={"85%"}>
                    <Box width={"100%"} height={"92%"}>
                        {images && images.length > 0 &&
                            <img src={images[fotoindex].url}
                                style={{
                                    width: '100%', height: '100%', objectFit: 'contain'
                                }} />
                        }
                    </Box>
                    <Box width={"100%"} height={"8%"} display={"flex"} px={5} justifyContent={"space-between"}>
                        <div onClick={prevPicture}>
                            <KeyboardArrowLeftIcon />
                        </div>
                        <div onClick={nextPicture}>
                            <KeyboardArrowRightIcon />
                        </div>
                    </Box>
                </Box>
                <Box width={"100%"} height={"15%"}>
                    <Box display={'flex'} flexDirection={'row'}>
                        <Typography variant="body2">Precio:</Typography>
                        <Typography variant="body2" pl={1} sx={{ textDecoration: discount ? 'line-through' : 'none', color: discount ? '#F96115' : 'none' }}>{price}</Typography>
                        {
                            discount > 0 && (
                                <Typography variant="body2" pl={1} sx={{ color: '#228B22' }}>-{discount}% {price - (price * (discount / 100))}</Typography>
                            )
                        }
                        <Typography variant="body2" pl={1}> {currency}</Typography>
                    </Box>
                    <Typography variant="body2">{stock ? "Disponible" : "Acabado"}</Typography>
                </Box>
            </CardContent>
        </Card>
    );

}

export default ProductItem;
