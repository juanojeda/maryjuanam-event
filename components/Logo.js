import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

import { fontNames } from '../style-utils/fonts';
import colours from '../style-utils/colours';

const darkOrLight = ['dark', 'light'];

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

const LogoWrapper = styled.figure`
  animation: 500ms ${fadeIn} ease-in;
  animation-delay: 550ms;
  animation-fill-mode: forwards;
  display: block;
  margin: 0;
  padding: 5rem 0;
  text-align: center;
  width: 100%;
  opacity: 0;
`;

const CursiveText = styled.span`
  color: ${({ theme }) => (theme === 'light' ? colours.body.text_light : colours.body.text)};
  font-family: ${fontNames.cursive};
  line-height: 120%;
  font-size: 3rem;
  font-weight: 200;
`;

const SmallSpace = styled.span`
  font-size: 0.2em;
`;

const Spacer = () => (
  <SmallSpace>
    {/* empty el */}
    {' '}
  </SmallSpace>
);

const LogoText = ({ fullNames, theme }) => (fullNames ? (
  <CursiveText theme={theme}>
      Maryam Shekarforoush
    <br />
      and
    <br />
      Juan Ojeda
  </CursiveText>
) : (
  <CursiveText theme={theme}>
      Maryam
    <Spacer />
      &amp;
    <Spacer />
      Juan
  </CursiveText>
));

LogoText.propTypes = {
  fullNames: PropTypes.bool.isRequired,
  theme: PropTypes.oneOf(darkOrLight).isRequired,
};

class Logo extends PureComponent {
  render() {
    const { fullNames, theme, className } = this.props;
    return (
      <LogoWrapper className={className}>
        <LogoText theme={theme} fullNames={fullNames} />
      </LogoWrapper>
    );
  }
}

Logo.propTypes = {
  fullNames: PropTypes.bool,
  theme: PropTypes.oneOf(darkOrLight),
  className: PropTypes.string,
};

Logo.defaultProps = {
  fullNames: false,
  theme: 'dark',
  className: '',
};

export default Logo;
