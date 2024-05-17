import { Card, CardContent, Typography, CardHeader, Box } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useMemo, useState } from 'react';
import { ProductImages } from '../../../../core/dtos/Products';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import '../productAnimation.css'; // Import CSS for animations

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
    whatsapp?: string;
}

const ProductItem = (props: ProductItemProps) => {

    const { title, subtitle, cardHeight, cardWidth, images, price, stock, discount, currency, whatsapp } = props;
    const subtitleMaxLenght = 65;

    const [fotoindex, setFotoIndex] = useState<number>(0);

    const reducted_currency = useMemo(() => {
        if (currency == 'Colones') {
            return '₡';
        }
        if (currency == 'Dolares') {
            return '$';
        }
        return currency;
    }, [currency]);

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

    const onWhatsappClick = () => {

        if (whatsapp) {
            const text = `Hola tengo interes en el producto: ${title}`;
            const encodedText = encodeURIComponent(text);
            const url = `https://wa.me/${whatsapp}?text=${encodedText}`
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    }

    const roundedNumber = (num: number): number => {
        return parseFloat(num.toFixed(2));
    };

    return (
        <Card className="product-card" sx={{ width: cardWidth, height: cardHeight, borderRadius: 8, backgroundColor: "#F1F9FF" }} raised>
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
                        <Typography variant="body2" pl={1} sx={{ textDecoration: discount ? 'line-through' : 'none', color: discount ? '#F96115' : 'none' }}>{reducted_currency}{price}</Typography>
                        {
                            discount > 0 && (
                                <Typography variant="body2" pl={1} sx={{ color: '#228B22' }}>-{discount}%  {reducted_currency}{roundedNumber(price - (price * (discount / 100)))}</Typography>
                            )
                        }
                    </Box>
                    <Typography variant="body2">{stock ? "Disponible" : "Acabado"}</Typography>
                    {whatsapp && (
                        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                            <Typography variant="body2" color={'#188841'}></Typography>
                            <div onClick={onWhatsappClick}>
                                <WhatsAppIcon sx={{ fontSize: 30, color: '#25D366' }} />
                            </div>
                        </Box>
                    )}

                </Box>
            </CardContent>
        </Card>
    );

}

export default ProductItem;

