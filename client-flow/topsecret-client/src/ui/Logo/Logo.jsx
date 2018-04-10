// @flow
/**
 * Logo component for the application
 */

import * as React from 'react';
import Tab from 'material-ui/Tabs';

const style = require('./Logo.css');
const logoImage = require('./logo.png');

const logo = (props: any) => {
    return (
        <Tab key="LOGO" value={false} disabled={true}>
            <img className={style.logoImage} src={logoImage} alt="Topsecret logo" />
        </Tab>
    );
};

export default logo;