import React from 'react';
import ResponsiveSelect from './responsive-select';

const SelectGPT: React.FC = () => {
    const options = ['Option 1', 'Option 2', 'Option 3'];

    return (
        <div>
            <h1>Responsive Select Example</h1>
            <ResponsiveSelect />
        </div>
    );
};

export default SelectGPT;