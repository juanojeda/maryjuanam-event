import React from 'react';
import styled from 'styled-components';
import { fontStacks } from '../utils/style-utils/fonts';

const headingSize = {
  h1: {
    fontSize: '4.6rem',
    lineHeight: '7.8rem',
    fontFamily: fontStacks.serifLight,
    fontWeight: 200,
    marginTop: 0,
    marginBottom: 0,
  },
  h2: {
    fontSize: '3.8rem',
    lineHeight: '6.4rem',
    fontFamily: fontStacks.serifLight,
    fontWeight: 200,
    marginTop: 0,
    marginBottom: 0,
  },
};

const getProp = (prop, level) => `${headingSize[level][prop]}`;

const StyledHeading = styled.h1.attrs({
  as: ({ level }) => level,
})`
  font-family: ${({ level }) => getProp('fontFamily', level)};
  font-size: ${({ level }) => getProp('fontSize', level)};
  font-weight: ${({ level }) => getProp('fontWeight', level)};
  line-height: ${({ level }) => getProp('lineHeight', level)};
<<<<<<< HEAD
  margin-top: ${({ level }) => getProp('marginTop', level)};
  margin-bottom: ${({ level }) => getProp('marginBottom', level)};
=======
  margin-top: ${({ level }) => getProp('lineHeight', level)};
  margin-bottom: ${({ level }) => getProp('lineHeight', level)};
>>>>>>> eec16a4d75702e87753ab0a85614d7d7ccbe3ffd
`;

export default ({ level, children, ...props }) => (
  <StyledHeading {...{ level, props }}>{children}</StyledHeading>
);
