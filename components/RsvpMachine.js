import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';

import Autosuggest from 'react-autosuggest';
import Button from './Button';

import { fontStacks } from '../utils/style-utils/fonts';
import colours from '../utils/style-utils/colours';

const clearSuggestions = () => {};

const getGuestValue = guest => guest.guest_name;

const renderSuggestion = guest => <div>{guest.guest_name}</div>;

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
      <div>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={requestFetchSuggestions}
          onSuggestionsClearRequested={clearSuggestions}
          getSuggestionValue={getGuestValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </div>
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
