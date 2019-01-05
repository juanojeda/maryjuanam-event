import React from 'react';
import {
  compose, withState, branch, renderComponent,
} from 'recompose';
import ls from 'local-storage';

const Unauthorised = () => <div>Not logged in</div>;

const isSesameUnlocked = () => global.window && ls('IS_SESAME_UNLOCKED');

export default Component => (isSesameUnlocked() ? Component : <Unauthorised />);
