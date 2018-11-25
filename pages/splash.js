import React from 'react';
import styled from 'styled-components';

import debounce from 'lodash/debounce';

import { GridContainer, GridCell } from '../components/Grid';
import withReduxSaga from '../lib/withReduxSaga';

import FeatureImage from '../components/FeatureImage';
import Logo from '../components/Logo';
import Button from '../components/Button';

import { gridBreakpoints } from '../style-utils/breakpoints';

const StyledLogo = styled(Logo)`
  position: absolute;
  z-index: 1;
`;
const StyledButton = styled(Button)`
  height: ${(2 / 9) * 100}vh;
`;
const SplashContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: column;
  height: 100%;
`;

class PageIndex extends React.Component {
  static async getInitialProps({ store }) {}

  state = {
    isMobile: true,
    resizeHandlerId: '',
  };

  componentDidMount() {
    const resizeHandlerId = window.addEventListener('resize', debounce(this.resizeHandler, 500));
    this.resizeHandler();
    this.setState({
      resizeHandlerId,
    });
  }

  componentWillUnmount() {
    const { resizeHandlerId } = this.state;
    window.removeEventListener(resizeHandlerId);
  }

  resizeHandler = () => {
    const isMobile = window.innerWidth < gridBreakpoints.md;
    this.setState({ isMobile });
  };

  render() {
    const { isMobile } = this.state;
    return (
      <GridContainer>
        <GridCell md={5} lg={7}>
          {isMobile && <StyledLogo fullNames theme="light" />}
          <FeatureImage height={7} desaturate src="../static/images/srs-bsns.jpg" />
        </GridCell>
        <GridCell md={7} lg={5}>
          <SplashContainer>
            {!isMobile && <Logo fullNames />}
            <StyledButton />
          </SplashContainer>
        </GridCell>
      </GridContainer>
    );
  }
}

export default withReduxSaga(PageIndex);
