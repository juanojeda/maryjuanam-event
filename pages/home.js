import React from 'react';
import styled from 'styled-components';

import WithSesameLock from '../hoc/withSesameLock';
import WithLoggedInLayout from '../hoc/withLoggedInLayout';
import { GridContainer, GridCell } from '../components/Grid';
import FeatureImage from '../components/FeatureImage';
import Heading from '../components/Heading';
import Paragraph from '../components/Paragraph';
import { getBreakpoint } from '../utils/style-utils/breakpoints';

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

const Home = props => (
  <GridContainer>
    <OrderedCell content="img" md={5} lg={5}>
      <StickyFeatureImage src="../static/images/confetti.jpg" />
    </OrderedCell>
    <OrderedCell content="copy" md={7} lg={7}>
      <InfoSection>
        <Heading level="h2">When</Heading>
        <Paragraph>7th March 2020 at 4pm</Paragraph>
      </InfoSection>

      <InfoSection>
        <Heading level="h2">Where</Heading>
        <Paragraph>
          Mimosa Glen Homestead
          <br />
          2415 Lancefield-Tooborac Rd
          <br />
          Tooborac, Victoria 3522
        </Paragraph>
      </InfoSection>

      <InfoSection>
        <Heading level="h2">Getting there</Heading>
        <Paragraph>Watch this space!</Paragraph>
      </InfoSection>
    </OrderedCell>
  </GridContainer>
);

const WithLayout = props => (
  <WithLoggedInLayout {...props}>
    <Home {...props} />
  </WithLoggedInLayout>
);

const HomePage = props => (
  <WithSesameLock>
    <WithLayout navKey="home" title="home" />
  </WithSesameLock>
);

export default HomePage;
