import React from 'react';
import ls from 'local-storage';

const Unauthorised = () => <div>Not logged in</div>;

const isSesameUnlocked = () => global.window && ls('IS_SESAME_UNLOCKED');
class WithSesameLock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
    };
  }

  componentDidMount() {
    if (isSesameUnlocked()) {
      this.setState({
        loggedIn: true,
      });
    }
  }

  render() {
    const { children } = this.props;
    const { loggedIn } = this.state;

    return loggedIn ? <React.Fragment>{children}</React.Fragment> : <Unauthorised />;
  }
}

export default WithSesameLock;
