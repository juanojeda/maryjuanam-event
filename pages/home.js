import React, { Component } from 'react';
import { compose, withProps, nest } from 'recompose';

import withSesameLock from '../hoc/withSesameLock';
import withLoggedInLayout from '../hoc/withLoggedInLayout';

import { GridContainer, GridCell } from '../components/Grid';
import FeatureImage from '../components/FeatureImage';
import Logo from '../components/Logo';

import { gridBreakpoints } from '../style-utils/breakpoints';

class Home extends Component {
  render() {
    return <div>Logged In</div>;
  }
}

export default compose(
  withSesameLock,
  nest(withLoggedInLayout, Home),
  withProps({ pageTitle: 'home', navKey: 'home' }),
);
