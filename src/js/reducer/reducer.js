import  {combineReducers} from 'redux';
const quaggaState = (state = {}, action) => {
    switch(action.type) {
        case 'INIT_QUAGGA':
            return {
                ...state,
                isInitialized: true,
                quaggaRef: action.quaggaRef
            };
        case 'MARK_QUAGGA_AS_STREAMING':
            return {
                ...state,
                isStreaming: true,
            };
        default:
            return state;
    }
};

const reducer = combineReducers({
    quaggaState,
});

export default reducer;