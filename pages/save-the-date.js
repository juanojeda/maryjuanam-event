import React from 'react';

import Grid from 'styled-components-grid';
import styled from 'styled-components';
import withReduxSaga from '../lib/withReduxSaga';

import FeatureImage from '../components/FeatureImage';
import SaveTheDateContainer from '../containers/SaveTheDateContainer';

const GridContainer = styled(Grid).attrs({
  valign: { sm: 'stretch' },
})`
  height: 100%;
`;

class SaveTheDate extends React.Component {
  static async getInitialProps({ store }) {}

  render() {
    return (
      <GridContainer>
        <Grid.Unit size={{ md: 5 / 12, lg: 7 / 12 }}>
          <FeatureImage desaturate src="../static/images/juan_maryam_1.jpg" />
        </Grid.Unit>
        <Grid.Unit size={{ md: 7 / 12, lg: 5 / 12 }}>
          <SaveTheDateContainer />
        </Grid.Unit>
      </GridContainer>
    );
  }
}

export default withReduxSaga(SaveTheDate);
