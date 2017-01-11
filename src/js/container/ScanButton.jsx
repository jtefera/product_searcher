import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import {launchScanner, stopScanner} from '../actions/actions';

let ScanButton = ({isScanning, launchScanner, stopScanner}) => {
    console.log(isScanning);
    return (
        <RaisedButton
            label={(isScanning) ? 'Stop' : 'Scan'}
            primary={true}
            onTouchTap={(isScanning) ? stopScanner : launchScanner}
        />
    )
}

const mapStateToProps = (state) => ({
    isScanning: state.status.isScanning,
});

const mapDispatchToProps = (dispatch) => ({
    launchScanner: () => dispatch(launchScanner()),
    stopScanner: () => dispatch(stopScanner())
});

ScanButton = connect(mapStateToProps, mapDispatchToProps)(ScanButton);

export default ScanButton;