import React from 'react';
import ReactDOM from 'react-dom';
import Quagga from 'quagga';
import App from './container/App.jsx';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer/reducer';
import createLogger from 'redux-logger';
const logger = createLogger();

let store;
try{
    // Debugging in desktop chrome
    store = createStore(
        reducer,
        compose(
            applyMiddleware(thunkMiddleware),
            // For Debugging
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
                window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    );
} catch(e) {
    console.error(e);
    // Works in Mobile
    store = createStore(
        reducer,
        applyMiddleware(thunkMiddleware, logger)
    );
}
window.store = store;

ReactDOM.render( 
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app")
);