import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'styled-components-grid';
import styled from 'styled-components';

const twelveCells = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const StyledContainer = styled(Grid)`
  height: 100%;
`;

const StyledCell = styled(Grid.Unit)`
  position: relative;
  align-items: center;
`;

export const GridContainer = ({ children }) => (
  <StyledContainer valign={{ sm: 'stretch' }}>{children}</StyledContainer>
);

GridContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export const GridCell = ({
  children, md, lg, className,
}) => (
  <StyledCell className={className} size={{ md: md / 12, lg: lg / 12 }}>
    {children}
  </StyledCell>
);

GridCell.propTypes = {
  children: PropTypes.node.isRequired,
  md: PropTypes.oneOf(twelveCells),
  lg: PropTypes.oneOf(twelveCells),
};

GridCell.defaultProps = {
  md: 6,
  lg: 6,
};
