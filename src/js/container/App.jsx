import React, {Component} from 'react';
import {connect} from 'react-redux';
import {init, startStream, stopStream} from '../actions/actions';
import VideoContainer from './VideoContainer.jsx';

const App = (props) => {
    return (
        <div> <VideoContainer /> </div>
    );
};

export default App;