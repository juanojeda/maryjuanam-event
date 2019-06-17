import Autosuggest from 'react-autosuggest';
import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { opacify } from 'polished';

import { fontStacks } from '../utils/style-utils/fonts';
import colours from '../utils/style-utils/colours';

import SearchSVG from '../static/search.svg';
import YesSVG from '../static/checkmark.svg';
import NoSVG from '../static/cross.svg';

const SearchIcon = styled(SearchSVG)`
  fill: currentColor;
  position: absolute;
  right: 2rem;
  top: 2rem;
  width: 2.5rem;
  height: 2.5rem;
`;

const SuggesterContainer = styled.div`
  position: relative;
  z-index: 1;
`;

const InputContainer = styled.div`
  position: relative;
  border-bottom: 2px solid ${colours.forms.borderColor};
`;

const Input = styled.input`
  appearance: none;
  background: transparent;
  border: none;
  font-family: ${fontStacks.serifRegular};
  font-size: 2rem;
  padding: 2rem;
  width: 100%;

  &:focus {
    background: rgba(255, 255, 255, 0.5);
    outline: 1px solid ${colours.forms.borderFocusColor};
  }
`;

const GuestSuggestionContainer = styled.div`
  background: ${colours.body.bg};
  position: absolute;
  width: 100%;
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
`;

const highlightSuggestion = css`
  background: rgba(255, 255, 255, 0.75);
  border-bottom: 1px solid ${opacify(0.5, colours.forms.borderColor)};
`;

const Yes = styled(YesSVG)`
  fill: ${colours.rsvp.yes};
`;
const No = styled(NoSVG)`
  fill: ${colours.rsvp.no};
`;

const GuestSuggestion = styled.div`
  background: rgba(255, 255, 255, 0.25);
  padding: 1rem 2rem;
  border: 1px solid transparent;
  position: relative;

  ${Yes}, ${No} {
    height: 1rem;
    width: 1rem;
    margin-left: 1rem;
  }

  ${({ focus }) => focus && highlightSuggestion};

  &:hover,
  &:focus {
    ${highlightSuggestion};
  }
`;

const RSVPBadge = styled.div`
  font-family: ${fontStacks.serifBold};
  font-size: 1.2rem;
  position: absolute;
  right: 1.5rem;
  text-transform: uppercase;
  top: 1.5rem;
`;

const GuestInput = inputProps => (
  <InputContainer>
    <Input {...inputProps} />
    <SearchIcon />
  </InputContainer>
);

const renderSuggestionContainer = ({ containerProps, children, query }) => (
  <GuestSuggestionContainer {...containerProps}>{children}</GuestSuggestionContainer>
);

const isAttending = rsvpStatus => ({ TRUE: true, FALSE: false }[rsvpStatus]);

const RSVPStatus = ({ status }) => (status ? (
  <>
      Attending
    {' '}
    <Yes />
  </>
) : (
  <>
      Not attending
    {' '}
    <No />
  </>
));

const Badge = ({ rsvp }) => {
  const status = isAttending(rsvp);

  return <RSVPBadge>{status !== undefined ? <RSVPStatus status={status} /> : null}</RSVPBadge>;
};

const renderSuggestion = (suggestion, { query, isHighlighted }) => (
  <GuestSuggestion focus={isHighlighted}>
    {suggestion.guest_name}
    <Badge rsvp={suggestion.rsvp} />
  </GuestSuggestion>
);

const GuestSuggester = props => (
  <SuggesterContainer>
    <Autosuggest
      renderSuggestion={renderSuggestion}
      renderSuggestionsContainer={renderSuggestionContainer}
      renderInputComponent={GuestInput}
      {...props}
    />
  </SuggesterContainer>
);

GuestSuggester.propTypes = {};

export default GuestSuggester;
