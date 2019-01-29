import React from 'react';

import { GridContainer, GridCell } from '../components/Grid';
import Logo from '../components/Logo';

const WithLoggedInLayout = ({ children, className }) => (
  <GridContainer {...{ className }}>
    <GridCell md={4} lg={4}>
      <Logo />
    </GridCell>
    <GridCell md={8} lg={8}>
      {children}
    </GridCell>
  </GridContainer>
);

export default WithLoggedInLayout;
