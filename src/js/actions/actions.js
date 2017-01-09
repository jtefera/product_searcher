import {dispatch} from 'react-redux';
import Quagga from 'quagga';

export const initQuagga = (Quagga) => ({
    type: 'INIT_QUAGGA',
    quaggaRef: (Quagga) ? {...Quagga} : null,
});

const markQuaggaAsStreaming = () => ({
    type: 'MARK_QUAGGA_AS_STREAMING',
});

const markQuaggaAsNotStreaming = () => ({
    type: 'MARK_QUAGGA_AS_NOT_STREAMING',
});


export const startStream = () => (dispatch, getState) => {
    const isAlreadyStreaming = getState().quaggaState.isStreaming;
    const quaggaRef = getState().quaggaState.quaggaRef;
    if(!quaggaRef) {
        throw new Error('Quagga not initialazed', quaggaRef);
    }
    if(!isAlreadyStreaming) {
        quaggaRef.start();
        dispatch(markQuaggaAsStreaming());
    }
};

export const stopStream = () => (dispatch, getState) => {
    const isStreaming = getState().isStreaming;
    if(isStreaming) {
        const quaggaRef = getState().quaggaRef;
        quaggaRef.stop();
    }
    dispatch(markQuaggaAsNotStreaming());
};

export const init = () => (dispatch) => {
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
        },
        decoder: {
            readers: [{
                format: "ean_reader",
                config: {
                    supplements: [
                        'ean_5_reader', 'ean_2_reader'
                    ]
                }
            },
                "ean_reader",
                "code_128_reader",
                "ean_8_reader",
                "code_39_reader",
                "codabar_reader",
                "upc_reader",
            ]
        },
        debug: {
            drawBoundingBox: true,
            showFrequency: true,
            drawScanline: true,
            showPattern: true
        }
    }, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Initialization finished. Ready to start");
        window.Quagga = Quagga;
        Quagga.start();
        dispatch(initQuagga(Quagga));
        dispatch(startStream());
    });
    Quagga.onDetected(function (data) {
        const barcode = data.codeResult.code;
        console.log(barcode);
        /*fetch('/get_product/' + data.codeResult.code)
            .then((res) => res.json())
            .then(console.log);*/
    });
    
    Quagga.onProcessed(function (result) {
        var drawingCtx = Quagga.canvas.ctx.overlay,
            drawingCanvas = Quagga.canvas.dom.overlay;

        if (result) {
            if (result.boxes) {
                drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                result.boxes.filter(function (box) {
                    return box !== result.box;
                }).forEach(function (box) {
                    Quagga.ImageDebug.drawPath(box, {
                        x: 0,
                        y: 1
                    }, drawingCtx, {
                        color: "green",
                        lineWidth: 2
                    });
                });
            }

            if (result.box) {
                Quagga.ImageDebug.drawPath(result.box, {
                    x: 0,
                    y: 1
                }, drawingCtx, {
                    color: "#00F",
                    lineWidth: 2
                });
            }

            if (result.codeResult && result.codeResult.code) {
                Quagga.ImageDebug.drawPath(result.line, {
                    x: 'x',
                    y: 'y'
                }, drawingCtx, {
                    color: 'red',
                    lineWidth: 3
                });
            }
        }
    });
};