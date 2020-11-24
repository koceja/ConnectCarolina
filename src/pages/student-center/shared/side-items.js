import React from 'react';
import { Box } from 'rebass';
import { Holds, Todos } from './core-components.js';


const SideItems = () => {
    return (
        <div className="side-items">
            <Box
                p={3}
                width={1}
            >
                <Holds />
            </Box>
            <Box
                p={3}
                width={1}
            >
                <Todos />
            </Box>
        </div>
                  
    );
}

export default SideItems;