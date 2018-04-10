// @flow
/**
 * Navbar Component represents the toolbar for the application
 */

import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Logo from '../../ui/Logo/Logo';
import { routes } from '../../consts/routes';

const style = require('./Navbar.css');

export const NAVBAR_TABS = {
  TAB_SETTINGS: {
    name: 'Settings',
    url: routes.settings.url
  },
  TAB_RANDOM_CHAT: {
    name: 'Random Chat',
    url: routes.randomChat.url
  },
  TAB_CHAT: {
    name: 'Chat',
    url: routes.chat.url
  },
  TAB_FEED: {
  name: 'Feed',
  url: routes.feed.url
  }
};

type NavbarProps = {

}

export interface NavbarRouteProps extends RouteComponentProps<NavbarProps> {

}

type NavbarState = {
  current: string;
}

class Navbar extends React.Component<NavbarProps & NavbarRouteProps, NavbarState> {

  state = {
    current: NAVBAR_TABS.TAB_FEED.name
  };
  
  changeHanlder = (event: Event, value: string) => {
    this.props.history.push(value);
    this.setState({ current: value });
  }

  render() {
    const tabs: React.Node[] = Object.keys(NAVBAR_TABS).map((key, index) => {
      return (
        <Tab 
          key={key}
          value={NAVBAR_TABS[key].url}
          label={NAVBAR_TABS[key].name}          
        />       
      );  
    });
    
    return (
      <AppBar position="static" classes={{colorPrimary: style.Navbar}}>        
          <Tabs value={this.state.current} onChange={this.changeHanlder} centered={true} fullWidth={true} >
            {tabs}
            <Logo/>            
          </Tabs>          
      </AppBar>
    );
  }
}

export default withRouter(Navbar);
