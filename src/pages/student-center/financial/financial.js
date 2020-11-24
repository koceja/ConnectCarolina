import React from "react";
import { Box, Card, Flex } from "rebass";
import { Finances, FinancialAid } from "../shared/core-components.js";

import Page from "../../page.js";

const Content = () => {
  return (
    <div id="financial">
      <Box p={3} width={1}>
        <Finances />
      </Box>

      <Flex flexWrap="wrap">
        <Box p={3} width={1 / 3}>
          <FinancialAid />
        </Box>
        <Box p={3} width={1 / 3}>
        <div className="dashboard-card personal-container">
        <a href>
          <Card onClick={() => {
              alert(
                "Because this is not an official UNC website, this link goes nowhere. It would open the external bill payment site if possible."
              );}} className="dashboard-card text-only">
            <h2>Pay Bills</h2>
          </Card>
        </a>
      </div>
          
        </Box>
        <Box p={3} width={1 / 3}>
        <div className="dashboard-card personal-container">
        <a href="mailto: cashier@unc.edu">
          <Card className="dashboard-card text-only">
            <h2>Contact Cashier's Office</h2>
          </Card>
        </a>
      </div>
        
        </Box>
      </Flex>
    </div>
  );
};

const FinancialPage = () => {
  return <Page active="financial" content={<Content />} sideItems={false} />;
};

export default FinancialPage;
