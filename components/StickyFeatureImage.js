import styled from 'styled-components';
import FeatureImage from './FeatureImage';
import { getBreakpoint } from '../utils/style-utils/breakpoints';

const StickyFeatureImage = styled(FeatureImage)`
  ${getBreakpoint('md')} {
    position: fixed;
    top: 0;
  }
`;

export default StickyFeatureImage;
