// @flow
import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Feed from './containers/Feed/Feed';
import Settings from './containers/Settings/Settings';
import Chat from './containers/Chat/Chat';
import { routes } from './consts/routes';

type AppProps = {};

class App extends React.Component<AppProps> {
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route path={routes.feed.url} component={Feed} />
          <Route path={routes.chat.url} component={Chat} />
          <Route path={routes.settings.url} component={Settings} />
          <Redirect from="/" to={routes.feed.url} />
        </Switch>
        {/* <Feed/> */}
        {/* <Settings/> */}
        {/* <Chat/>         */}
      </div>
    );
  }
}

export default App;
