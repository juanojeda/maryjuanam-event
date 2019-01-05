import React from 'react';
import PropTypes from 'prop-types';

import { createGlobalStyle, ThemeProvider } from 'styled-components';

import colours from '../style-utils/colours';
import { getFonts, fontStacks } from '../style-utils/fonts';
import { gridBreakpoints } from '../style-utils/breakpoints';

const GlobalStyles = createGlobalStyle`
  ${getFonts()};

  * {
    box-sizing: border-box;
  }

  html {
    font-size: 10px;
    font-family: ${fontStacks.serifRegular};
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }

  body {
    background: ${colours.body.bg};
    color: ${colours.body.text};
    font-size: 1.6rem;
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }

  #__next {
    min-height: 100vh;
  }

`;

const Layout = ({ children }, ...props) => (
  <ThemeProvider
    theme={{
      breakpoints: gridBreakpoints,
    }}
    {...props}
  >
    <>
      <GlobalStyles />
      {children}
    </>
  </ThemeProvider>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
