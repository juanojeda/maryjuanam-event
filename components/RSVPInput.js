import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';

import Button from './Button';

import { fontStacks } from '../utils/style-utils/fonts';
import colours from '../utils/style-utils/colours';

const RSVPInputContainer = styled.form`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
`;

const openInput = css`
  width: 100%;
  flex-basis: 100%;
  padding: 1rem 2rem;
`;

const growIn = keyframes`
  0% {
    width: 0%;
    flex-basis: 0%;
    padding: 1rem 0;
  }

  100% {
    ${openInput};
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

  ${({ error }) => (!error
    ? css`
          animation: 500ms ${growIn} ease-out;
          animation-fill-mode: forwards;
          width: 0;
        `
    : openInput)}

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.5);
    & + ${StyledButton} svg {
      padding-left: 6rem;
      padding-right: 0;
    }
  }
`;

const Loading = styled.div``;

const ErrorMessage = styled.div`
  bottom: -4rem;
  color: ${colours.forms.error};
  padding: 1rem 2rem;
  position: absolute;
  width: 100%;
`;

class RSVPInput extends PureComponent {
  handleSubmit = (e) => {
    const { submitCode } = this.props;
    submitCode(e);
  };

  render() {
    const {
      inputPlaceholder, loading, inputValue, updateInputValue, error,
    } = this.props;

    return loading ? (
      <Loading>loading...</Loading>
    ) : (
      <RSVPInputContainer>
        <StyledInput
          error={error}
          value={inputValue}
          onChange={updateInputValue}
          placeholder={inputPlaceholder}
          onKeyPress={this.handleEnterToSubmit}
        />
        <StyledButton type="submit" onClick={this.handleSubmit} />
        {error && <ErrorMessage>The password is incorrect. Please try again</ErrorMessage>}
      </RSVPInputContainer>
    );
  }
}

RSVPInput.propTypes = {
  error: PropTypes.bool,
  inputValue: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  loading: PropTypes.bool,
  updateInputValue: PropTypes.func.isRequired,
  submitCode: PropTypes.func.isRequired,
};

RSVPInput.defaultProps = {
  error: false,
  loading: false,
  inputValue: '',
  inputPlaceholder: '',
};

export default RSVPInput;
