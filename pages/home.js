import React, { Component } from 'react';
import { compose, withProps, nest } from 'recompose';

import withSesameLock from '../hoc/withSesameLock';
import withLoggedInLayout from '../hoc/withLoggedInLayout';

class Home extends Component {
  render(props) {
    return <div>Logged In</div>;
  }
}

const withLayout = nest(withLoggedInLayout, Home);
const withNavProps = withProps({ navKey: 'home', title: 'home' });

const HomePage = withSesameLock(withNavProps(withLayout));

export default HomePage;
