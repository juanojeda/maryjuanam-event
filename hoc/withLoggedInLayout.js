import React from 'react';

import { GridContainer, GridCell } from '../components/Grid';
import Logo from '../components/Logo';

import { gridBreakpoints } from '../style-utils/breakpoints';
import colours from '../style-utils/colours';

const withLoggedInLayout = ({ children }) => (
  <GridContainer>
    <GridCell md={4} lg={4}>
      <Logo />
    </GridCell>
    <GridCell md={8} lg={8}>
      {children}
    </GridCell>
  </GridContainer>
);

export default withLoggedInLayout;
