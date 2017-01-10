import * as actions from '../src/js/actions/actions';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Quagga from 'quagga';
import {mount} from 'enzyme';
import App from '../src/js/container/App.jsx';
import React from 'react';
import {Provider} from 'react-redux';
import nock from 'nock';
import fetch from 'isomorphic-fetch';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('Actions: ', () => {
    it('they should be defined:', () => {
        expect(actions).not.toBeUndefined();
    });
    
    it('initQuagga should exist and return an INIT_STREAM action', () => {
        const expected = {
            type: 'INIT_QUAGGA',
            quaggaRef: null,
        };
        const expectedWithQuagga = {
            type: 'INIT_QUAGGA',
            quaggaRef: {},
        };
        expect(actions.initQuagga).not.toBeUndefined();
        expect(actions.initQuagga()).toEqual(expected);
    });

    // startStream
    it('startStream should exist and return a thunk action', () => {
        //Not to be undefined
        expect(actions.startStream).not.toBeUndefined();

        //startStream is a thunk that starts the quagga detecction
        const middlewares = [thunk];
        const startMock = jest.fn();
        const store = mockStore({
            quaggaState: {
                quaggaRef: {
                    start: startMock
                }
            }
        }, middlewares);
        const expectedActions = [
            {type: 'MARK_QUAGGA_AS_STREAMING'}
        ];

        store.dispatch(actions.startStream());
        expect(store.getActions()).toEqual(expectedActions);
        expect(startMock).toBeCalled();
    });

    // stopStream
    it('stopStream should exist and return a thunk action', () => {
        //Not to be undefined
        expect(actions.stopStream).not.toBeUndefined();

        //stopStream is a thunk that stops the quagga detecction
        const middlewares = [thunk];
        const stopMock = jest.fn();
        const store = mockStore({
            quaggaRef: {
                stop: stopMock
            },
            isStreaming: true,
        }, middlewares);
        const expectedActions = [
            {type: 'MARK_QUAGGA_AS_NOT_STREAMING'}
        ];

        store.dispatch(actions.stopStream());
        expect(store.getActions()).toEqual(expectedActions);
        expect(stopMock).toBeCalled();
    });

    // init
    it('init should exist and return a function', () => {
        expect(actions.init).not.toBeUndefined();
        expect(actions.init).toBeInstanceOf(Function);
        const store = mockStore({});
        const expectedActions = [
            actions.initQuagga(),
            actions.startStream()
        ];
    });

    // Send barcode
    it('sendBarcode should exist and send a fetch request to the api if' 
    + 'input is number, discart otherwise', () => {
        const expectedResponse = {
            name: 'Norcom College Ruled Notebook 70 Sheet Case Pack 24',
            manufacturer: 'DDI'
        };
        const expectedActions = [
            {
                type: 'ADD_PRODUCT',
                product: expectedResponse,
            }
        ]
        const apiNock = nock('http://localhost:3000')
                            .log(console.log)
                            .get(/get_product\/\d+/)
                            .reply(200, expectedResponse);
        const exampleBarcode = '0026229770760';
        const store = mockStore({});
        expect(actions.sendBarcode).not.toBeUndefined();
        store.dispatch(actions.sendBarcode(2123))
            .then(prod => {
                expect(prod).toEqual(expectedResponse);
                expect(store.getActions()).toEqual(
                    expectedActions
                );
            });
        //console.log(actions.sendBarcode(exampleBarcode));        
    });
});