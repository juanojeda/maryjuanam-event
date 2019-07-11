import React from 'react';
import styled from 'styled-components';

import { GridContainer, GridCell } from '../components/Grid';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';
import { getBreakpoint } from '../utils/style-utils/breakpoints';

const CentredGridCell = styled(GridCell)`
  ${getBreakpoint('md')} {
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
`;

const StickyContainer = styled.div`
  ${getBreakpoint('md')} {
    justify-content: center;
    display: flex;
    flex-direction: column;
    position: fixed;
  }
`;

const WithLoggedInLayout = ({ children, className, navKey }) => (
  <GridContainer {...{ className }}>
    <CentredGridCell md={4} lg={4}>
      <StickyContainer>
        <Logo />
        <Navigation activePage={navKey} />
      </StickyContainer>
    </CentredGridCell>
    <GridCell md={8} lg={8}>
      {children}
    </GridCell>
  </GridContainer>
);

export default WithLoggedInLayout;
