import React, {Component} from 'react';
import {connect} from 'react-redux';
import {init} from '../actions/actions';

class VideoContainer extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.init();
    }
    render() {
        return(
            <div id = "interactive"
                className = "viewport"> 
            </div>
        );
    }
};


let App = ({init, initiated}) => {
    return (
        <div> <VideoContainer init={init} /> </div>
    );
};

const mapStateToProps = (state) => ({
    initiated: state.initiated,
});

const mapDispatchToProps = (dispatch) => ({
    init: () => dispatch(init()),
});

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;