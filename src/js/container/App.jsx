import React, {Component} from 'react';
import {connect} from 'react-redux';
import {init, startStream, stopStream} from '../actions/actions';
import VideoContainer from './VideoContainer.jsx';
import HeaderBar from './HeaderBar.jsx';
import Footer from './Footer.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ScanButton from './ScanButton.jsx';

injectTapEventPlugin();



let App = ({isScanning}) => {
    let videoContainer = null;
    if(isScanning) {
        videoContainer = <VideoContainer />;
    }
    return (
        <MuiThemeProvider>
            <div>
                <HeaderBar />
                <ScanButton />
                {videoContainer}    
            </div>
        </MuiThemeProvider>
    );
};

const mapStateToProps = (state) => ({
    isScanning: state.status.isScanning,
});
App = connect(mapStateToProps)(App);

export default App;