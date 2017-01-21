'use strict';

const app = require("./serverApp");

const ServerPort = process.env.OPENSHIFT_NODEJS_PORT || 3000;
const ServerIpAddress = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.listen(ServerPort, ServerIpAddress, () => {
	console.log('dirname is ' + __dirname);
	console.log('----------------------------');
	console.log('Server started on' + ServerIpAddress + ':' + ServerPort);
	console.log('----------------------------');
});

