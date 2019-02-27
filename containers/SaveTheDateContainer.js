import React, { PureComponent } from 'react';
import styled from 'styled-components';

import Logo from '../components/Logo';
import Button from '../components/Button';

import { fontNames } from '../utils/style-utils/fonts';

import KnotSVG from '../static/knot.svg';

const Title = styled.h1`
  font-family: ${fontNames.serifLight};
  font-size: 3.5rem;
  font-weight: 100;
  text-align: center;
`;
const Knot = styled(KnotSVG)`
  width: 100%;
  object-fit: contain;
`;
const Body = styled.div`
  padding: 4rem;
`;
const Paragraph = styled.p`
  font-family: ${fontNames.serifRegular};
  font-size: 1.8rem;
  line-height: 2.7rem;
`;
const Embolden = styled.strong`
  font-family: ${fontNames.serifBold};
`;
const ButtonContainer = styled.div`
  padding: 3rem 0 0;
  text-align: center;
`;

class SaveTheDateContainer extends PureComponent {
  render() {
    return (
      <>
        <Logo />
        <Title>We're tying the knot!</Title>
        <Knot />

        <Body>
          <Paragraph>
            We’ll be getting married on the
            {' '}
            <Embolden>7th of March, 2020.</Embolden>
          </Paragraph>
          <Paragraph>
            We hope you can join us in Victoria, Australia, to celebrate our special day.
          </Paragraph>
          <Paragraph>Stay tuned for formal invitations.</Paragraph>
          <ButtonContainer>
            <Button target="_blank" text="Save the date" link="/static/savethedate.ics" />
          </ButtonContainer>
        </Body>
      </>
    );
  }
}

export default SaveTheDateContainer;
