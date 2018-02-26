/**
 * Navbar Component represents the toolbar for the application
 */

import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Logo from '../../ui/Logo/Logo';

const style = require('./Navbar.css');

export const NAVBAR_TAB_FEED = 'Feed';
export const NAVBAR_TAB_CHAT = 'Chat';
export const NAVBAR_TAB_RANDOMCHAT = 'RandomChat';
export const NAVBAR_TAB_SETTINGS = 'Settings';

const NAVBAR_TABS = [NAVBAR_TAB_FEED, NAVBAR_TAB_CHAT, NAVBAR_TAB_RANDOMCHAT, NAVBAR_TAB_SETTINGS];


export interface NavbarProps {

}

export interface NavbarState {
  current: string;
}

class Navbar extends React.Component<NavbarProps, NavbarState> {

  state = {
    current: NAVBAR_TAB_FEED
  };

  changeHanlder = (event: object, value: string) => {
    this.setState({ current: value });
  }

  render() {
    const tabs: JSX.Element[] = [];
    for (const tab of NAVBAR_TABS) {
      tabs.push(<Tab value={tab} label={tab} />);
    }

    return (
      <AppBar position="static">        
          <Tabs value={this.state.current} onChange={this.changeHanlder} fullWidth={true}>
            {tabs}
            <Logo/>
          </Tabs>
      </AppBar>
    );
  }

}

export default Navbar;
