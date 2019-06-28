import styled from 'styled-components';
import { fontStacks } from '../utils/style-utils/fonts';
import colours from '../utils/style-utils/colours';

export const InputContainer = styled.div`
  position: relative;
  border-bottom: 2px solid ${colours.forms.borderColor};
`;

const TextInput = styled.input`
  appearance: none;
  background: transparent;
  border: none;
  font-family: ${fontStacks.serifRegular};
  font-size: 2rem;
  margin-top: 1rem;
  padding: 2rem;
  width: 100%;

  &:focus {
    background: rgba(255, 255, 255, 0.5);
    outline: 1px solid ${colours.forms.borderFocusColor};
  }
`;

export default TextInput;
