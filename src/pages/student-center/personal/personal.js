import React from 'react';
import { Box } from 'rebass';
import { Personal } from '../shared/core-components.js';

import Page from '../../page.js';

const Content = () => {
    return (
        <div id="personal">
            <Box
                p={3}
                width={1}
            >
                <Personal />
            </Box>
        </div>
    )
}

const PersonalPage = () => {
    return (
        <Page 
            active="personal"
            content={<Content />}
            sideItems={true}
        />            
    )
}

export default PersonalPage;