import React from 'react';
import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

import colours from '../utils/style-utils/colours';
import { getBreakpoint } from '../utils/style-utils/breakpoints';
import { fontNames } from '../utils/style-utils/fonts';

const navBreakPoint = getBreakpoint('zero', 'md');
const isActive = ({ targetPage, currentPage }) => currentPage === targetPage;
const getNavElement = ({ currentPage, targetPage }) => (isActive({ targetPage, currentPage }) ? 'span' : 'a');

const NavWindow = styled.div`
  ${navBreakPoint} {
    position: relative;

    &::before,
    &::after {
      content: '';
      display: block;
      height: 100%;
      position: absolute;
      top: 0;
      width: 3rem;
      z-index: 1;
    }

    &:before {
      background: linear-gradient(
        to left,
        ${transparentize(1, colours.body.bg)},
        ${colours.body.bg} 2.5rem
      );
      left: 0;
    }

    &:after {
      background: linear-gradient(
        to right,
        ${transparentize(1, colours.body.bg)},
        ${colours.body.bg} 2.5rem
      );
      right: 0;
    }
  }
`;

const NavSlider = styled.div`
  ${navBreakPoint} {
    overflow: auto;
    position: relative;
    width: 100%;
  }
`;

const NavContainer = styled.nav`
  align-items: center;
  display: flex;
  flex-direction: column;
  ${navBreakPoint} {
    flex-direction: row;
    flex-wrap: nowrap;
    margin-left: 3rem;
    margin-right: 3rem;
    overflow: initial;
  }
`;

const NavLink = styled.a.attrs({
  as: getNavElement,
})`
  float: left;
  font-size: 1.8rem;
  clear: left;
  margin-bottom: 2rem;
  margin-left: 3rem;
  margin-right: 3rem;
  margin-top: 2rem;
  padding-bottom: 1rem;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 1rem;
  transition: 200ms ease border;
  border-bottom-color: transparent;
  border-bottom-style: solid;
  border-bottom-width: 2px;

  ${props => isActive(props)
    && css`
      font-family: ${fontNames.serifBold};
      border-bottom-color: ${colours.navigation.activeBorderColor};
    `}

  &,
  &:link {
    color: ${colours.navigation.text};
    text-decoration: none;
  }

  &:hover {
    border-bottom-color: ${colours.navigation.activeBorderColor};
  }

  ${navBreakPoint} {
    flex-shrink: 0;
    margin: 0;
  }
`;

export default ({ activePage }) => (
  <NavWindow>
    <NavSlider>
      <NavContainer>
        <NavLink currentPage={activePage} targetPage="home" href="home">
          When &amp; where
        </NavLink>
        <NavLink currentPage={activePage} targetPage="rsvp" href="rsvp">
          RSVP
        </NavLink>
        <NavLink currentPage={activePage} targetPage="faq" href="#">
          Useful information
        </NavLink>
        <NavLink currentPage={activePage} targetPage="contact" href="#">
          Get in touch
        </NavLink>
      </NavContainer>
    </NavSlider>
  </NavWindow>
);
