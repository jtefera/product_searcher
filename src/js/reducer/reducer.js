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
        case 'MARK_QUAGGA_AS_NOT_STREAMING':
            return {
                ...state,
                isStreaming: false,
            }
        default:
            return state;
    }
};

const status = (state = {isScanning: false}, action) => {
    switch(action.type) {
        case 'LAUNCH_SCANNER':
            return {
                ...state,
                isScanning: true,
            }
        case 'STOP_SCANNER':
            return {
                ...state,
                isScanning: false,
            }
        default:
            return state;
    }
}

const reducer = combineReducers({
    quaggaState,
    status,
});

export default reducer;