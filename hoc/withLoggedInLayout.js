import React from 'react';

import { GridContainer, GridCell } from '../components/Grid';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';

const WithLoggedInLayout = ({ children, className, navKey }) => (
  <GridContainer {...{ className }}>
    <GridCell md={4} lg={4}>
      <Logo />
      <Navigation activePage={navKey} />
    </GridCell>
    <GridCell md={8} lg={8}>
      {children}
    </GridCell>
  </GridContainer>
);

export default WithLoggedInLayout;
