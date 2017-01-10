import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
        init,
        startStream,
        stopStream
    } from '../actions/actions';


class VideoContainerClass extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        if(this.props.isInitialized) {
            this.props.startStream();
        } else {
            this.props.init();
        }
    }
    componentWillUnmount() {
        if(this.props.isInitialized && this.props.isStreaming) {
            this.props.stopStream();
        }
    }
    render() {
        return(
            <div id = "interactive"
                className = "viewport"> 
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    isInitialized: state.quaggaState.isInitialized,
    isStreaming: state.quaggaState.isStreaming
});

const mapDispatchToProps = (dispatch) => ({
    init: () => dispatch(init()),
    startStream: () => dispatch(startStream()),
    stopStream: () => dispatch(stopStream()),
});

const VideoContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoContainerClass);

export default VideoContainer;