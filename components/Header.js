import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import Link from 'next/link';
import { withRouter } from 'next/router';

const StyledHeader = styled.header``;

const Header = ({ router: { pathname } }) => (
  <StyledHeader>
    <Link prefetch href="/">
      <a href={pathname} className={pathname === '/' ? 'is-active' : ''}>
        Home
      </a>
    </Link>
    <Link prefetch href="/about">
      <a href={pathname} className={pathname === '/about' ? 'is-active' : ''}>
        About
      </a>
    </Link>
  </StyledHeader>
);

Header.propTypes = {
  router: PropTypes.object.isRequired,
};

export default withRouter(Header);
