import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';


const Footer = (props) => {
    return (
        <Paper zDepth={1}>
            <BottomNavigation />
        </Paper>
    );
}

export default Footer;