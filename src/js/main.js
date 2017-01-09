import React from 'react';
import ReactDOM from 'react-dom';
import Quagga from 'quagga';
import App from './container/App.jsx';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer/reducer';

const store = createStore(
    reducer, 
    applyMiddleware(thunkMiddleware)
);

ReactDOM.render( 
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app")
);