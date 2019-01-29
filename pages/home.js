import React from 'react';

import WithSesameLock from '../hoc/withSesameLock';
import WithLoggedInLayout from '../hoc/withLoggedInLayout';

const Home = props => <div {...props}>Logged In</div>;

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
