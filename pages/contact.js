import React from 'react';
import styled from 'styled-components';

import WithSesameLock from '../hoc/withSesameLock';
import WithLoggedInLayout from '../hoc/withLoggedInLayout';
import { GridContainer } from '../components/Grid';
import Heading from '../components/Heading';
import Paragraph from '../components/Paragraph';
import OrderedCell from '../components/OrderedCell';
import StickyFeatureImage from '../components/StickyFeatureImage';

import colours from '../utils/style-utils/colours';
import { fontStacks } from '../utils/style-utils/fonts';

const ContactDetailsContainer = styled.dl`
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

const ContactDetailsLine = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  font-size: 2rem;
`;
const ContactDetailsType = styled.dl`
  display: inline-block;
  width: 30%;
  font-family: ${fontStacks.serifBold};
`;
const ContactDetailsValue = styled.dt`
  display: inline-block;
  width: 50%;
`;

const Contact = props => (
  <GridContainer>
    <OrderedCell content="img" md={5} lg={5}>
      <StickyFeatureImage src="../static/images/srs-bsns.jpg" />
    </OrderedCell>
    <OrderedCell content="copy" md={7} lg={7}>
      <Heading level="h1">Get in touch</Heading>

      <Paragraph>
        Hopefully we've answered any questions you might have, but if there's anything you need to
        know just shoot us an email, text us, or give us a call!
      </Paragraph>

      <ContactDetailsContainer>
        <ContactDetailsLine>
          <ContactDetailsType>Email</ContactDetailsType>
          <ContactDetailsValue>
            <a href="mailto:juan+wedding@juanojeda.com">juan+wedding@juanojeda.com</a>
          </ContactDetailsValue>
        </ContactDetailsLine>

        <ContactDetailsLine>
          <ContactDetailsType>Mobile</ContactDetailsType>
          <ContactDetailsValue>
            <a href="tel:0422293316">0422 293 316</a>
          </ContactDetailsValue>
        </ContactDetailsLine>
      </ContactDetailsContainer>
    </OrderedCell>
  </GridContainer>
);

const WithLayout = props => (
  <WithLoggedInLayout {...props}>
    <Contact {...props} />
  </WithLoggedInLayout>
);

const FAQPage = props => (
  <WithSesameLock>
    <WithLayout navKey="contact" title="contact" />
  </WithSesameLock>
);

export default FAQPage;
