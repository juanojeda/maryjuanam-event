import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { getBreakpoint } from '../style-utils/breakpoints';
import colours from '../style-utils/colours';

const ImageWrapper = styled.div`
  display: flex;
  ${getBreakpoint('md')} {
    height: 100vh;
  }
  ${({ desaturate }) => desaturate
    && css`
      position: relative;
      &:after {
        content: '';
        display: block;
        height: 100%;
        width: 100%;
        background: ${colours.images.vignette};
        opacity: 0.5;
        position: absolute;
        top: 0;
      }
    `}
`;

const Image = styled.img`
  height: 100%;
  filter: ${({ desaturate }) => desaturate && 'grayscale(100%)'};
  object-fit: cover;
  width: 100%;
`;

class FeatureImage extends PureComponent {
  render() {
    const { src, desaturate } = this.props;
    return (
      <ImageWrapper desaturate={desaturate}>
        <Image desaturate={desaturate} src={src} />
      </ImageWrapper>
    );
  }
}

FeatureImage.propTypes = {
  src: PropTypes.string.isRequired,
  desaturate: PropTypes.bool,
};

FeatureImage.defaultProps = {
  desaturate: false,
};

export default FeatureImage;
