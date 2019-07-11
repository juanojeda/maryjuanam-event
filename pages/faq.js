import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import WithSesameLock from '../hoc/withSesameLock';
import WithLoggedInLayout from '../hoc/withLoggedInLayout';
import { GridContainer } from '../components/Grid';
import Heading from '../components/Heading';
import Paragraph from '../components/Paragraph';
import OrderedCell from '../components/OrderedCell';
import StickyFeatureImage from '../components/StickyFeatureImage';

import colours from '../utils/style-utils/colours';

const googleDirections = 'https://www.google.com/maps/dir/Mimosa+Glen+Homestead,+2415+Lancefield-Tooborac+Rd,+Tooborac+VIC+3522/CBD,+Melbourne+VIC+3000/@-37.4296362,144.5849425,10z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x6ad776127774d62f:0x6318f0d3debc4849!2m2!1d144.766693!2d-37.079595!1m5!1m1!1s0x6ad642caf37771c5:0x834e664d24dced61!2m2!1d144.9623382!2d-37.8123652!3e0';
const StyledLinkEl = styled.a`
  color: ${colours.links};
  cursor: pointer;
`;

const StyledLink = ({ href, children, ...props }) => (
  <Link href={href}>
    <StyledLinkEl href={href} {...props}>
      {children}
    </StyledLinkEl>
  </Link>
);

const questions = [
  {
    id: 'get-there',
    heading: 'How do I get there?',
    answer: () => (
      <>
        Mimosa Glen is about 80 minutes' drive from Melbourne CBD (
        <StyledLink href={googleDirections} target="_blank">
          check out the directions
        </StyledLink>
        ). If you can get to Heathcote or Kyneton town centres on the day, we'll provide a shuttle
        bus to and from the venue for your convenience. Remember to let us know you'd like a seat
        when you
        {' '}
        <StyledLink href="/rsvp">RSVP</StyledLink>
!
      </>
    ),
  },
  {
    id: 'accom',
    heading: 'Where should I book accommodation?',
    answer: 'We recommend booking accommodation in Heathcote or Kyneton.',
  },
  {
    id: 'bus',
    heading: 'I heard there was a bus?',
    answer: 'More details to come!',
  },
  {
    id: 'gifts',
    heading: 'What about gifts?',
    answer: `Your presence is the greatest gift we could ask for, and we're lucky to have everything we need in our home. But if you would like to give us a gift, a contribution towards our honeymoon would be greatly appreciated. We'll have a wishing well set up at the reception.`,
  },
  {
    id: 'dress',
    heading: 'What should I wear?',
    answer: `Gee you scrub up well, and we want you to show it off. Come dressed in semi-formal attire and flaunt what your mama gave you!`,
  },
  {
    id: 'kids',
    heading: 'Can I bring my kids?',
    answer: `We love your kids! And we're happy for you to bring them. But if you want to use us as an excuse for a night of worry-free dancing, wine and laughter, that's not a bad idea.`,
  },
  {
    id: 'hashtag',
    heading: `What's the #hashtag? Can I take pics?`,
    answer: `We 100% want you to take photos (after the ceremony, please)! Get your squad together, strike a pose, and if you post it on the socials be sure to tag it with the hashtag #FindTheJuanAndMaryam`,
  },
];

const QuestionAnswerGroup = styled.div`
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

const FAQ = props => (
  <GridContainer>
    <OrderedCell content="img" md={5} lg={5}>
      <StickyFeatureImage src="../static/images/r-u-sure.jpg" />
    </OrderedCell>
    <OrderedCell content="copy" md={7} lg={7}>
      <Heading level="h1">Useful Information</Heading>

      {questions.map(({ heading, answer, id }) => {
        const paragraphProps = {};

        if (typeof answer === 'function') {
          paragraphProps.children = answer();
        } else {
          paragraphProps.dangerouslySetInnerHTML = {
            __html: answer,
          };
        }
        return (
          <QuestionAnswerGroup key={id}>
            <Heading level="h3">{heading}</Heading>
            <Paragraph {...paragraphProps} />
          </QuestionAnswerGroup>
        );
      })}
    </OrderedCell>
  </GridContainer>
);

const WithLayout = props => (
  <WithLoggedInLayout {...props}>
    <FAQ {...props} />
  </WithLoggedInLayout>
);

const FAQPage = props => (
  <WithSesameLock>
    <WithLayout navKey="faq" title="faq" />
  </WithSesameLock>
);

export default FAQPage;
