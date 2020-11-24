import React from "react";
import { Box, Card, Flex } from "rebass";

import Page from "../../page.js";

import { Classes, ShoppingCart, GPA } from "../shared/core-components.js";

const Content = () => {
  return (
    <div id="academics">
      <Flex className="academic-actions">
        <Box p={3} width={1 / 3}>
          <div className="dashboard-card personal-container">
            <a href="/student-center/academics/search">
              <Card className="dashboard-card text-only">
                <h2>Search Classes</h2>
              </Card>
            </a>
          </div>
        </Box>
        <Box p={3} width={1 / 3}>
          <div className="dashboard-card personal-container">
            <a href="/student-center/academics/enroll">
              <Card className="dashboard-card text-only">
                <h2>Enroll</h2>
              </Card>
            </a>
          </div>
        </Box>
        <Box p={3} width={1 / 3}>
          <GPA />
        </Box>
      </Flex>
      <Box p={3} width={1}>
        <Classes />
      </Box>
      <Box p={3} width={1}>
        <ShoppingCart />
      </Box>
    </div>
  );
};

const Academics = () => {
  return <Page active="academics" content={<Content />} sideItems={true} />;
};

export default Academics;
