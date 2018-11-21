import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { fontNames } from '../style-utils/fonts';

const LogoWrapper = styled.figure`
  display: block;
  margin: 0;
  padding: 5rem 0;
  text-align: center;
  width: 100%;
`;

const CursiveText = styled.span`
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

const LogoText = ({ fullNames }) => (fullNames ? (
  <CursiveText>
      Maryam Shekarforoush
    <br />
      and
    <br />
      Juan Ojeda
  </CursiveText>
) : (
  <CursiveText>
      Maryam
    <Spacer />
      &amp;
    <Spacer />
      Juan
  </CursiveText>
));

class Logo extends PureComponent {
  render() {
    const { fullNames, theme } = this.props;
    return (
      <LogoWrapper>
        <LogoText fullNames={fullNames} />
      </LogoWrapper>
    );
  }
}

Logo.propTypes = {
  fullNames: PropTypes.bool,
  theme: PropTypes.oneOf(['dark', 'light']),
};

Logo.defaultProps = {
  fullNames: false,
  theme: 'dark',
};

export default Logo;
