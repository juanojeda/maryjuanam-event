import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from './Button';
import GuestSuggester from './GuestSuggester';
import { GridContainer, GridCell } from './Grid';

const ButtonContainer = styled(GridContainer)`
  margin-top: 2rem;
`;

const RSVPContainer = styled.div``;

const clearSuggestions = () => {};

const getGuestValue = guest => guest.guest_name;

const filterGuests = (val, list) => {
  const inputValue = val.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : list.filter(guest => guest.guest_name.toLowerCase().slice(0, inputLength) === inputValue);
};

const RSVPMachine = ({ guestList }) => {
  const [suggestions, setSuggestions] = useState(guestList);
  const [RSVPList, setRSVPList] = useState([]);
  const [selectedGuest, selectGuest] = useState('');

  const requestFetchSuggestions = ({ value }) => {
    setSuggestions(filterGuests(value, guestList));
  };

  const inputProps = {
    placeholder: 'Find your name',
    value: selectedGuest,
    onChange: (evt, { newValue }) => {
      selectGuest(newValue);
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
          onSuggestionsFetchRequested={requestFetchSuggestions}
          onSuggestionsClearRequested={clearSuggestions}
          getSuggestionValue={getGuestValue}
          inputProps={inputProps}
        />
        <ButtonContainer>
          <GridCell>
            <Button variant="primary" text="I do" />
          </GridCell>
          <GridCell>
            <Button text="I can't" />
          </GridCell>
        </ButtonContainer>
      </RSVPContainer>
    )
  );
};

RSVPMachine.propTypes = {
  guestList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
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
