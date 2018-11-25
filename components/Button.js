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
  font-size: 2.5rem;
  line-height: 3rem;
  font-weight: 100;
`;

const Link = styled.a`
  ${baseStyles};
  text-decoration: none;
`;
const Btn = styled.button`
  ${baseStyles}
`;

const Arrow = styled(ArrowSVG)`
  height: 3rem;
  padding: 0 3rem;
  vertical-align: top;
`;

class Button extends PureComponent {
  render() {
    const {
      type, text, action, link, alt, ...buttonProps
    } = this.props;
    const Component = type === 'link' ? Link : Btn;

    const componentProps = type === 'link' ? { href: link, alt, ...buttonProps } : { onClick: action, ...buttonProps };

    return (
      <Component {...componentProps}>
        {text}
        <Arrow />
      </Component>
    );
  }
}

Button.propTypes = {
  type: PropTypes.oneOf('button', 'link'),
  text: PropTypes.string,
  action: PropTypes.func,
  link: PropTypes.string,
  alt: PropTypes.string,
};

Button.defaultProps = {
  type: 'link',
  text: '',
  action: () => {},
  link: '',
  alt: '',
};

export default Button;
