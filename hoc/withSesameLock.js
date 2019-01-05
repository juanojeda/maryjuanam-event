import React from 'react';
import ls from 'local-storage';

const Unauthorised = () => <div>Not logged in</div>;

const isSesameUnlocked = () => global.window && ls('IS_SESAME_UNLOCKED');

export default Component => (isSesameUnlocked() ? Component : Unauthorised);
