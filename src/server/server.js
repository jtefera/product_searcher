import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import morgan from 'morgan';
import {polyfill} from 'es6-promise';
import fetch from 'isomorphic-fetch';
import {outpanKey} from './keys';
polyfill();


// Server
let app = express();

// logger

app.use(morgan('combined'));
// Static pages
app.use(express.static('public'));

// Parses json files so they can be usable 
app.use(bodyParser.json());

const ServerPort = process.env.OPENSHIFT_NODEJS_PORT || 3000;
const ServerIpAddress = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
app.get('/get_product/:barcode', (req,  res) => {
    const apiKey = outpanKey;
    var url = `https://api.outpan.com/v2/products/${req.params.barcode}?apikey=${apiKey}`;
    fetch(url)
        .then((apiRes) => apiRes.json())
        .then(res.json.bind(res))
});

app.listen(ServerPort, ServerIpAddress, () => {
	console.log('dirname is ' + __dirname);
	console.log('----------------------------');
	console.log('Server started on' + ServerIpAddress + ':' + ServerPort);
	console.log('----------------------------');
});

