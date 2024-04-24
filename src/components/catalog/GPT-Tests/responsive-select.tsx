// Import necessary dependencies
import React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';


// Define the component
const ResponsiveSelect: React.FC = () => {

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* First Select */}
            <FormControl fullWidth>
                <InputLabel id="select-label-1">Select 1</InputLabel>
                <Select labelId="select-label-1" label="Select 1">
                    <MenuItem value="option1">Option 1</MenuItem>
                    <MenuItem value="option2">Option 2</MenuItem>
                    <MenuItem value="option3">Option 3</MenuItem>
                </Select>
            </FormControl>

            {/* Second Select */}
            <FormControl fullWidth>
                <InputLabel id="select-label-2">Select 2</InputLabel>
                <Select labelId="select-label-2" label="Select 2">
                    <MenuItem value="optionA">Option A</MenuItem>
                    <MenuItem value="optionB">Option B</MenuItem>
                    <MenuItem value="optionC">Option C</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default ResponsiveSelect;
