import React from 'react';
import { Box, Flex } from 'rebass';
import { Advisor, Classes, DashboardSearch, Finances, FinancialAid, Holds, Personal, ShoppingCart, Todos } from '../shared/core-components';

import Page from '../../page.js';

import './dashboard.css';


const dashboardItems = [
    {
        name: "Personal",
        content: <Personal />,
        size: 1
    },
    {
        name: "Finances",
        content: <Finances />,
        size: 2,
    },
    {
        name: "Classes",
        content: <Classes />,
        size: 2
    },
    {
        name: "Holds",
        content: <Holds />,
        size: 1,
    },
    {
        name: "Shopping Cart",
        content: <ShoppingCart />,
        size: 2
    },
    {
        name: "To Do",
        content: <Todos />,
        size: 1,
    },
    {
        name: "Financial Aid",
        content: <FinancialAid />,
        size: 1,
    },
    {
        name: "Search",
        content: <DashboardSearch />,
        size: 1,
    },
    {
        name: "Advisor",
        content: <Advisor />,
        size: 1,
    }
]

const Content = () => {
    return (
        <div id="dashboard">
            <Flex flexWrap='wrap'>
                {dashboardItems.map((curr, index) => (
                        <Box
                            p={3}
                            width={curr.size/3}
                            key={`dashboard-${index}`}
                        >
                            
                            {curr.content}
                        </Box>
                    ))
                }
            </Flex>
        </div>
    )
}

const Dashboard = () => {
    return (
        <Page
            active="dashboard"
            content={<Content />}
            sideItems={false}
        />
    )
}

export default Dashboard;