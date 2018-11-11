import React from 'react';

import withReduxSaga from '../lib/withReduxSaga';

import { loadData } from '../lib/placeholder/actions';

class PageIndex extends React.Component {
  static async getInitialProps({ store }) {
    if (!store.getState().placeholder.data) {
      store.dispatch(loadData());
    }
  }

  render() {
    return <div>This is the index page</div>;
  }
}

export default withReduxSaga(PageIndex);
