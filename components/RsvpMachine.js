import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { transparentize } from 'polished';

import colours from '../utils/style-utils/colours';

import Button from './Button';
import GuestSuggester from './GuestSuggester';
import { GridContainer, GridCell } from './Grid';

const RSVPContainer = styled.div`
  position: relative;
`;

const ButtonContainer = styled(GridContainer)`
  margin-top: 2rem;
`;

const LoadingContainer = styled.div`
  background-color: ${transparentize(0.25, colours.body.bg)};
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
`;

const clearSuggestions = () => {};

const getGuestValue = guest => guest.guest_name;

const filterGuests = (val, list) => {
  const inputValue = val.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : list.filter(guest => guest.guest_name.toLowerCase().slice(0, inputLength) === inputValue);
};

const RSVPMachine = ({ guestList, submitRSVP }) => {
  const [suggestions, setSuggestions] = useState(guestList);
  const [selectedGuest, selectGuest] = useState('');
  const [inputValue, updateInputValue] = useState('');
  const [isLoading, setLoading] = useState(false);

  const requestFetchSuggestions = ({ value }) => {
    setSuggestions(filterGuests(value, guestList));
  };

  const updateSelectedGuest = (event, { suggestion }) => {
    console.log(suggestion);
    selectGuest(suggestion);
  };

  const setRSVP = response => async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await submitRSVP(selectedGuest, response);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const acceptRSVP = setRSVP('TRUE');
  const declineRSVP = setRSVP('FALSE');

  const inputProps = {
    placeholder: 'Find your name',
    value: inputValue,
    onChange: (evt, { newValue }) => {
      updateInputValue(newValue);
    },
  };

  if (!guestList) {
    return null;
  }

  return (
    guestList.length > 0 && (
      <RSVPContainer>
        <GuestSuggester
          suggestions={suggestions}
          onSuggestionSelected={updateSelectedGuest}
          onSuggestionsFetchRequested={requestFetchSuggestions}
          onSuggestionsClearRequested={clearSuggestions}
          getSuggestionValue={getGuestValue}
          inputProps={inputProps}
        />
        <ButtonContainer>
          {isLoading ? <LoadingContainer /> : null}
          <GridCell>
            <Button variant="primary" text="I do" onClick={acceptRSVP} />
          </GridCell>
          <GridCell>
            <Button text="I can't" onClick={declineRSVP} />
          </GridCell>
        </ButtonContainer>
      </RSVPContainer>
    )
  );
};

RSVPMachine.propTypes = {
  submitRSVP: PropTypes.func.isRequired,
  guestList: PropTypes.arrayOf(
    PropTypes.shape({
      dockey: PropTypes.string.isRequired,
      guests: PropTypes.arrayOf(
        PropTypes.shape({
          guestName: PropTypes.string.isRequired,
          rsvp: PropTypes.bool,
        }),
      ),
    }),
  ).isRequired,
};

RSVPMachine.state = {
  currentGuests: undefined,
};

export default RSVPMachine;
