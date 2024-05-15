import React from 'react';
import { Grid, Box } from '@mui/material';

const MyComponent: React.FC = () => {
    return (
        <Grid
            container
            style={{ height: '100vh' }} // Set the container height to full viewport height
            alignItems="flex-end"        // Align items to the bottom
            justifyContent="center"      // Center horizontally
        >
            <Grid item>
                <Box>Content at the bottom</Box>
            </Grid>
        </Grid>
    );
};

export default MyComponent;