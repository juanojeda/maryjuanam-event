import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { getBreakpoint } from '../utils/style-utils/breakpoints';
import colours from '../utils/style-utils/colours';

const ImageWrapper = styled.div`
  display: flex;
  height: ${({ height }) => `${(height / 9) * 100}vh`};
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
        opacity: 0.8;
        position: absolute;
        top: 0;
      }
    `}
`;

const Image = styled.img`
  height: 100%;
  filter: ${({ desaturate }) => desaturate && 'grayscale(100%)'};
  object-fit: cover;
  transition: 1000ms filter 500ms;
  width: 100%;
`;

class FeatureImage extends PureComponent {
  render() {
    const {
      src, desaturate, height, className,
    } = this.props;
    return (
      <ImageWrapper className={className} height={height} desaturate={desaturate}>
        <Image desaturate={desaturate} src={src} />
      </ImageWrapper>
    );
  }
}

FeatureImage.propTypes = {
  height: PropTypes.number,
  src: PropTypes.string.isRequired,
  desaturate: PropTypes.bool,
};

FeatureImage.defaultProps = {
  height: 3,
  desaturate: false,
};

export default FeatureImage;
