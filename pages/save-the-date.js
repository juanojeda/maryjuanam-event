import React from 'react';

import { GridContainer, GridCell } from '../components/Grid';
import FeatureImage from '../components/FeatureImage';
import SaveTheDateContainer from '../containers/SaveTheDateContainer';

const SaveTheDate = () => (
  <GridContainer>
    <GridCell md={5} lg={7}>
      <FeatureImage height={3} desaturate src="../static/images/piggyback.jpg" />
    </GridCell>
    <GridCell md={7} lg={5}>
      <SaveTheDateContainer />
    </GridCell>
  </GridContainer>
);

export default SaveTheDate;
