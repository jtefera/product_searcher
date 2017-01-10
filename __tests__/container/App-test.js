import * as actions from '../src/js/actions/actions';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Quagga from 'quagga';
import {mount} from 'enzyme';
import App from '../src/js/container/App.jsx';
import React from 'react';
import {Provider} from 'react-redux';

