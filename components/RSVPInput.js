import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

import Button from './Button';

import { fontStacks } from '../style-utils/fonts';
import colours from '../style-utils/colours';

const RSVPInputContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const growIn = keyframes`
  0% {
    width: 0%;
    flex-basis: 0%;
    padding: 1rem 0;
  }

  100% {
    width: 100%;
    flex-basis: 100%;
    padding: 1rem 2rem;
  }
`;

const StyledButton = styled(Button)`
  flex: 0 1 auto;
  width: auto;
  svg {
    transition: 200ms ease-out padding;
  }
`;

const StyledInput = styled.input.attrs({
  type: 'text',
})`
  animation: 500ms ${growIn} ease-out;
  animation-fill-mode: forwards;
  appearance: none;
  background: rgba(255, 255, 255, 0);
  border: 0;
  border-bottom: 1px solid ${colours.forms.borderColor};
  display: inline-block;
  flex-grow: 0;
  flex-shrink: 1;
  font-family: ${fontStacks.serifRegular};
  font-size: 2.2rem;
  margin-right: 2rem;
  transition: 500ms ease background;
  width: 0;

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.5);
    & + ${StyledButton} svg {
      padding-left: 6rem;
      padding-right: 0;
    }
  }
`;

class RSVPInput extends PureComponent {
  handleSubmit = (e) => {
    const { submitCode } = this.props;
    submitCode(e);
  };

  render() {
    const { inputPlaceholder } = this.props;

    return (
      <RSVPInputContainer>
        <StyledInput placeholder={inputPlaceholder} />
        <StyledButton onClick={this.handleSubmit} />
      </RSVPInputContainer>
    );
  }
}

RSVPInput.propTypes = {
  inputPlaceholder: PropTypes.string,
  submitCode: PropTypes.func.isRequired,
};

RSVPInput.defaultProps = {
  inputPlaceholder: '',
};

export default RSVPInput;
