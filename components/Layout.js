import React from 'react';
import PropTypes from 'prop-types';

import { createGlobalStyle } from 'styled-components';

import Header from './Header';

import colours from '../style-utils/colours';

const GlobalStyles = createGlobalStyle`
  html {
    font-size: 10px;
    margin: 0;
    padding: 0;
  }

  body {
    background: ${colours.body.bg};
    color: ${colours.body.text};
    font-size: 1.6rem;
  }
`;

const Layout = ({ children }) => (
  <div>
    <GlobalStyles />
    <Header />
    {children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
