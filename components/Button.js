import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import ArrowSVG from '../static/arrow.svg';

import colours from '../utils/style-utils/colours';
import { fontNames } from '../utils/style-utils/fonts';

const Arrow = styled(ArrowSVG)`
  fill: currentColor;
  height: 100%;
  stroke: currentColor;
  padding: 0 3rem;
  vertical-align: middle;
  width: 9rem;
`;

const buttonVariants = {
  primary: css`
    background: ${colours.button.primary.background};
    color: ${colours.button.primary.color};
    ${Arrow} {
      padding-right: 0;
      width: 6rem;
    }
  `,
  hollow: css`
    background: ${colours.button.hollow.background};
    color: ${colours.button.hollow.color};
  `,
};

const baseStyles = variant => css`
  ${({ variant }) => buttonVariants[variant]}

  display: inline-block;
  font-family: ${fontNames.serifLight};
  font-weight: 100;
  font-size: 2.5rem;
  line-height: 3rem;
  padding: 2rem 0;
  text-align: center;
  width: 100%;
`;

const Link = styled.a`
  ${({ variant }) => baseStyles(variant)};

  text-decoration: none;
`;
const Btn = styled.button`
  ${({ variant }) => baseStyles(variant)};

  appearance: none;
  background: transparent;
  border: 0;
`;

class Button extends PureComponent {
  render() {
    const {
      type, text, action, link, alt, ...buttonProps
    } = this.props;
    const Component = type === 'link' ? Link : Btn;

    const componentProps = type === 'link' ? { href: link, alt, ...buttonProps } : { onClick: action, ...buttonProps };

    return (
      <Component {...{ ...componentProps }}>
        {text}
        <Arrow />
      </Component>
    );
  }
}

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'link', 'submit']),
  variant: PropTypes.oneOf(['primary', 'hollow']),
  text: PropTypes.string,
  action: PropTypes.func,
  link: PropTypes.string,
  alt: PropTypes.string,
};

Button.defaultProps = {
  className: null,
  type: 'link',
  variant: 'hollow',
  text: '',
  action: () => {},
  link: '',
  alt: '',
};

export default Button;
