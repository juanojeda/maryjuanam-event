import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { transparentize } from 'polished';

import colours from '../utils/style-utils/colours';
import { fontStacks } from '../utils/style-utils/fonts';

import Button from './Button';
import TextInput, { InputContainer } from './Input';
import GuestSuggester from './GuestSuggester';
import { GridContainer, GridCell } from './Grid';
import Paragraph from './Paragraph';

const RSVPContainer = styled.div`
  position: relative;
`;

const FormRow = styled(GridContainer)`
  margin-top: 3rem;
`;

const CheckLabel = styled.label`
  display: flex;
  flex-direction: row;
  font-size: 1.5rem;
  align-items: center;
`;

const InfoParagraph = styled(Paragraph)`
  font-size: 1.6rem;
  font-style: italic;
`;

const CheckBox = styled.input.attrs(({ checked }) => ({
  type: 'checkbox',
  checked,
}))`
  display: inline-block;
  flex-basis: 4rem;
  flex-shrink: 0;
  height: 4rem;
  width: 4rem;
`;

const StyledInputContainer = styled(InputContainer)`
  font-family: ${fontStacks.serifBold};
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

const FadeIn = keyframes`
  0% {
    opacity: 1;
    height: auto;
    max-height: 100px;
  }

  90% {
    opacity: 0;
    max-height: 100px;
  }
  100% {
    opacity: 0;
    max-height: 0;
    height: 0;
    margin: 0;
  }
`;

const RSVPReceivedCard = styled(Paragraph)`
  box-sizing: border-box;
  animation: ${FadeIn} 500ms;
  animation-timing-function: ease-in;
  animation-fill-mode: forwards;
  animation-delay: 5000ms;
  background: ${colours.forms.success};
  color: #fff;
  font-family: ${fontStacks.serifBold};
  margin-bottom: 1rem;
  margin-top: 1rem;
  overflow: hidden;
  padding: 1rem;
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
  const [isLoading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(guestList);

  const [selectedGuest, selectGuest] = useState('');
  const [guestInput, updateGuestInput] = useState('');
  const [transportRequest, setTransportRequest] = useState(false);
  const [dietaryReqs, setDietaryReqs] = useState('');
  const [songSuggestion, setSongSuggestion] = useState('');

  const [rsvpUpdated, setRsvpUpdated] = useState({
    show: false,
    guestName: '',
    needsTransportDB: false,
    songSuggestion: null,
    dietaryReqs: null,
  });

  const requestFetchSuggestions = ({ value }) => {
    setSuggestions(filterGuests(value, guestList));
  };

  const updateSelectedGuest = (event, { suggestion }) => {
    selectGuest(suggestion);
  };

  const updateDietaryReqs = event => setDietaryReqs(event.target.value);
  const updateSongSuggestion = event => setSongSuggestion(event.target.value);

  const showRSVPCardAndSetFade = ({
    guestName,
    needsTransportDB,
    songSuggestionDB,
    dietaryReqsDB,
  }) => {
    setRsvpUpdated({
      show: true,
      guestName,
      needsTransportDB,
      songSuggestionDB,
      dietaryReqsDB,
    });

    setTimeout(() => {
      setRsvpUpdated({ show: false });
    }, 6000);
  };

  const setRSVP = rsvp => async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const {
        guestName, needsTransportDB, songSuggestionDB, dietaryReqsDB,
      } = await submitRSVP(
        selectedGuest,
        {
          rsvp,
          transportRequest,
          songSuggestion,
          dietaryReqs,
        },
      );
      showRSVPCardAndSetFade({
        guestName, needsTransportDB, songSuggestionDB, dietaryReqsDB,
      });
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const acceptRSVP = setRSVP('TRUE');
  const declineRSVP = setRSVP('FALSE');
  const updateTransportRequest = val => () => setTransportRequest(val);

  const inputProps = {
    placeholder: 'Find your name',
    value: guestInput,
    onChange: (evt, { newValue }) => {
      updateGuestInput(newValue);
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
        {rsvpUpdated.show ? (
          <RSVPReceivedCard>
            RSVP updated for
            {rsvpUpdated.guestName}
.
            {rsvpUpdated.needsTransportDB ? (
              <>
                <br />
                {' '}
We'll also add you to the bus list.
              </>
            ) : null}
          </RSVPReceivedCard>
        ) : null}
        {selectedGuest ? (
          <>
            <FormRow>
              <CheckLabel>
                <CheckBox
                  value={!!transportRequest}
                  onChange={updateTransportRequest(!transportRequest)}
                />
                <Paragraph as="span">I would definitely like a seat on the bus to and from Heathcote/Kyneton.</Paragraph>
              </CheckLabel>
              <InfoParagraph>If you're unsure, you can come back and fill this bit out later.</InfoParagraph>
            </FormRow>

            <FormRow>
              <StyledInputContainer as="label">
                <Paragraph as="span">Do you have any dietary requirements?</Paragraph>
                <TextInput value={dietaryReqs} onChange={updateDietaryReqs} />
              </StyledInputContainer>
            </FormRow>

            <FormRow>
              <StyledInputContainer as="label">
                <Paragraph as="span">What's a song that gets you dancing?</Paragraph>
                <TextInput value={songSuggestion} onChange={updateSongSuggestion} />
              </StyledInputContainer>
            </FormRow>
          </>
        ) : null}

        <FormRow>
          {isLoading ? <LoadingContainer /> : null}
          <GridCell>
            <Button
              disabled={!selectedGuest}
              type="button"
              variant="primary"
              text="I do"
              onClick={acceptRSVP}
            />
          </GridCell>
          <GridCell>
            <Button disabled={!selectedGuest} type="button" text="I can't" onClick={declineRSVP} />
          </GridCell>
        </FormRow>
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
