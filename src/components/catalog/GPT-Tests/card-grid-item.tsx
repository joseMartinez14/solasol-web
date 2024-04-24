// GridComponent.tsx
import React from 'react';
import { Grid, Card, CardContent, Typography, CardHeader } from '@mui/material';

const gridData = [
    { id: 1, title: 'Item 1', 'subtitle': "Diferentes tamanos de texto aqui" },
    { id: 2, title: 'Item 1', 'subtitle': "Diferentes tamanos de texto aqui Diferentes tamanos de texto aqui Diferentes tamanos de texto aqui Diferentes tamanos de texto aqui Diferentes tamanos de texto aqui" },
    { id: 3, title: 'Item 1', 'subtitle': "Diferentes tamanos de texto aqui" },
    { id: 4, title: 'Item 1', 'subtitle': "Diferentes tamanos de texto aqui" },
    { id: 5, title: 'Item 1', 'subtitle': "Diferentes tamanos de texto aqui" },
    { id: 6, title: 'Item 1', 'subtitle': "Diferentes tamanos de texto aqui" },
    // Add more items as needed
];

const GridComponent: React.FC = () => {
    const cardHeight = 400;
    const cardWidth = 350;
    return (
        <Grid container spacing={4} justifyContent="center">
            {gridData.map((item) => (
                <Grid item key={item.id}>
                    <Card sx={{ width: cardWidth }}>
                        <CardHeader
                            title="Pulsera negra"
                            subheader={item.subtitle}
                        />
                        <CardContent sx={{ height: cardHeight }}>
                            <Typography variant="body2">{item.title}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default GridComponent;
