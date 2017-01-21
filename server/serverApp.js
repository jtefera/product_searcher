'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const polyfill = require('es6-promise').polyfill;
const fetch = require('isomorphic-fetch');
const outpanKey = require('./keys').outpanKey;
polyfill();

// Server
let app = express();

// logger

app.use(morgan('combined'));
// Static pages
app.use(express.static('public'));

// Parses json files so they can be usable 
app.use(bodyParser.json());
app.get('/get_product/:barcode', (req,  res) => {
    const apiKey = outpanKey;
    var url = `https://api.outpan.com/v2/products/${req.params.barcode}?apikey=${apiKey}`;
    fetch(url)
        .then((apiRes) => apiRes.json())
        .then(res.json.bind(res))
});

exports = module.exports = app;