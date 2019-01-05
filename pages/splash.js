import React from 'react';
import styled from 'styled-components';
import Router from 'next/router';

import debounce from 'lodash/debounce';
import ls from 'local-storage';

import { GridContainer, GridCell } from '../components/Grid';

import FeatureImage from '../components/FeatureImage';
import Logo from '../components/Logo';
import Button from '../components/Button';

import { gridBreakpoints } from '../style-utils/breakpoints';
import RSVPInput from '../components/RSVPInput';

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
  padding: 4rem;
`;

class PageIndex extends React.Component {
  state = {
    isMobile: true,
    resizeHandlerId: '',
    isSesameOpen: false,
    isSesameLoading: false,
    inputValue: '',
    isSesameError: false,
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
    window.removeEventListener('resize', resizeHandlerId);
  }

  resizeHandler = () => {
    const isMobile = window.innerWidth < gridBreakpoints.md;
    this.setState({ isMobile });
  };

  submitRSVPCode = async (e) => {
    e.preventDefault();
    const { inputValue } = this.state;
    const payload = {
      pass: inputValue,
    };

    this.setState({
      isSesameLoading: true,
    });

    const isAuthed = await fetch('/api/auth', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(payload),
    }).then(response => response.ok);

    if (!isAuthed) {
      this.setState({
        isSesameLoading: false,
        isSesameError: true,
      });
    } else {
      ls('IS_SESAME_UNLOCKED', true);
      Router.push('/home');
    }
  };

  updateInputValue = (e) => {
    this.setState({
      inputValue: e.target.value,
      isSesameError: false,
    });
  };

  openSesame = () => {
    this.setState({
      isSesameOpen: true,
    });
  };

  render() {
    const {
      isMobile, isSesameOpen, isSesameLoading, inputValue, isSesameError,
    } = this.state;
    return (
      <GridContainer>
        <GridCell md={5} lg={7}>
          {isMobile && <StyledLogo fullNames theme={isSesameOpen ? 'dark' : 'light'} />}
          <FeatureImage height={7} desaturate={!isSesameOpen} src="../static/images/srs-bsns.jpg" />
        </GridCell>
        <GridCell md={7} lg={5}>
          <SplashContainer>
            {!isMobile && <Logo fullNames />}
            {isSesameOpen ? (
              <RSVPInput
                inputValue={inputValue}
                updateInputValue={this.updateInputValue}
                inputPlaceholder="Please enter the RSVP code"
                submitCode={this.submitRSVPCode}
                loading={isSesameLoading}
                error={isSesameError}
              />
            ) : (
              <StyledButton type="button" action={this.openSesame} />
            )}
          </SplashContainer>
        </GridCell>
      </GridContainer>
    );
  }
}

export default PageIndex;
