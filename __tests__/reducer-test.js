import * as actions from '../src/js/actions/actions';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Quagga from 'quagga';
import {mount} from 'enzyme';
import App from '../src/js/container/App.jsx';
import React from 'react';
import {Provider} from 'react-redux';
import reducer from '../src/js/reducer/reducer';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';


describe('Reducer tests: ', () => {
    const middlewares = [ thunk ];
    const mockStore = configureMockStore(middlewares);

    it('should exist and be a function', () => {
        expect(reducer).toBeInstanceOf(Function);
    });

    it('should have quagga ref after initQuagga action', () => {
        const quaggaMock = {
            start: jest.fn(),
            stop: jest.fn(),
        };
        const testReducer = reducer(undefined, actions.initQuagga(quaggaMock));
        expect(testReducer.quaggaState).toEqual({
            quaggaRef: quaggaMock,
            isInitialized: true,
        });
    });

    it('should start streaming if there is quaggaRef and not streaming', () => {
        const startMock = jest.fn();
        const stopMock = jest.fn();
        const quaggaMock = {
            start: startMock,
            stop: stopMock,
        };
        // Case where Quagga has not been yet initialized
        // Should not be streaming and quaggaState should be an empty object
        const store1 = mockStore({
            quaggaState: {}
        });
        expect(() => store1.dispatch(actions.startStream())).toThrow();
        
        // Case where Quagga is initialized but is not yet streaming
        // Should mark quagga as streaming and call the start function
        const state2 = {
            quaggaState: {
                quaggaRef: quaggaMock,
                isStreaming: false,
            }
        }

        const store2 = createStore(
            reducer,
            state2,
            applyMiddleware(thunkMiddleware)
        );        
        store2.dispatch(actions.startStream());
        const expected2 = {
            quaggaRef: quaggaMock,
            isStreaming: true,
        };
        expect(quaggaMock.start).toBeCalled();
        expect(store2.getState().quaggaState).toEqual(expected2);

        // Case quaggaState is initialized and streaming
        // Should not modify the state and not call the startMock
        const startMock3 = jest.fn();
        const stopMock3 = jest.fn();
        const quaggaMock3 = {
            start: startMock3,
            stop: stopMock3,
        };
        const state3 = {
            quaggaState: {
                quaggaRef: quaggaMock3,
                isStreaming: true,
            }
        };

        const store3 = createStore(
            reducer,
            state3,
            applyMiddleware(thunkMiddleware)
        );        

        store3.dispatch(actions.startStream());
        const expected3 = {
            quaggaRef: quaggaMock3,
            isStreaming: true,
        };
        expect(quaggaMock3.start).not.toBeCalled();
        expect(store3.getState().quaggaState).toEqual(expected3);
    });
});