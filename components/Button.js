import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import ArrowSVG from '../static/arrow.svg';

import colours from '../style-utils/colours';
import { fontNames } from '../style-utils/fonts';

const baseStyles = css`
  color: ${colours.body.text};
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
  ${baseStyles};
  text-decoration: none;
`;
const Btn = styled.button`
  ${baseStyles}
  appearance: none;
  background: transparent;
  border: 0;
`;

const Arrow = styled(ArrowSVG)`
  height: 100%;
  padding: 0 3rem;
  vertical-align: middle;
  width: 9rem;
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
  text: PropTypes.string,
  action: PropTypes.func,
  link: PropTypes.string,
  alt: PropTypes.string,
};

Button.defaultProps = {
  className: null,
  type: 'link',
  text: '',
  action: () => {},
  link: '',
  alt: '',
};

export default Button;
