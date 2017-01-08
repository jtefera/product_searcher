import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import morgan from 'morgan';

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

app.listen(ServerPort, ServerIpAddress, () => {
	console.log('dirname is ' + __dirname);
	console.log('----------------------------');
	console.log('Server started on' + ServerIpAddress + ':' + ServerPort);
	console.log('----------------------------');
});

