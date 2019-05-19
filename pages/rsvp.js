import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { getBreakpoint } from '../utils/style-utils/breakpoints';
import { getAPIEndpoint } from '../utils/api';

import WithSesameLock from '../hoc/withSesameLock';
import WithLoggedInLayout from '../hoc/withLoggedInLayout';
import { GridContainer, GridCell } from '../components/Grid';
import FeatureImage from '../components/FeatureImage';
import Heading from '../components/Heading';
import Paragraph from '../components/Paragraph';
import RSVPMachine from '../components/RsvpMachine';

const StickyFeatureImage = styled(FeatureImage)`
  ${getBreakpoint('md')} {
    position: fixed;
    top: 0;
  }
`;

const OrderedCell = styled(GridCell)`
  ${getBreakpoint('md')} {
    padding-top: ${({ content }) => (content === 'copy' ? '12.5rem' : 0)};
    order: ${({ content }) => (content === 'img' ? 2 : 1)};
  }
`;

const InfoSection = styled.div`
  padding-top: 2rem;
  padding-bottom: 4rem;
  padding-left: 2rem;
  padding-right: 2rem;
`;

/**
 * - show autosuggest if state == loaded
 */

const fetchAndSetGuests = async (setGuests) => {
  const guestsResponse = await fetch(`${getAPIEndpoint()}/guests`);
  const guestList = await guestsResponse.json();
  return setGuests(guestList);
};

const submitRSVPs = (RSVPs) => {
  console.log(RSVPs);
};

const Rsvp = () => {
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    fetchAndSetGuests(setGuests);
  }, []);

  return (
    <GridContainer>
      <OrderedCell content="img" md={5} lg={5}>
        <StickyFeatureImage src="../static/images/piggyback.jpg" />
      </OrderedCell>
      <OrderedCell content="copy" md={7} lg={7}>
        <InfoSection>
          <Heading level="h1">RSVP</Heading>

          <Paragraph>
            We're so excited to invite you to share our day with us! Just type your name in below to
            let us know if you can make it.
          </Paragraph>

          <RSVPMachine guestList={guests} submitRSVPs={submitRSVPs} />
        </InfoSection>
      </OrderedCell>
    </GridContainer>
  );
};

const WithLayout = props => (
  <WithLoggedInLayout {...props}>
    <Rsvp {...props} />
  </WithLoggedInLayout>
);

const RsvpPage = props => (
  <WithSesameLock>
    <WithLayout navKey="rsvp" title="rsvp" />
  </WithSesameLock>
);

export default RsvpPage;
