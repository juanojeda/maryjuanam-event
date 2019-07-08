import styled from 'styled-components';
import { GridCell } from './Grid';
import { getBreakpoint } from '../utils/style-utils/breakpoints';

const OrderedCell = styled(GridCell)`
  ${getBreakpoint('md')} {
    padding-top: ${({ content }) => (content === 'copy' ? '12.5rem' : 0)};
    order: ${({ content }) => (content === 'img' ? 2 : 1)};
    padding-right: ${({ content }) => (content === 'copy' ? '6rem' : 0)};
  }
`;

export default OrderedCell;
