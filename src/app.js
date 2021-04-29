const express = require('express');
const app = express();

const cryptoRoute = require('./crypto')

app.use('/crypto', cryptoRoute);

app.use((req, res, next) => {
    res.status(200).json({
        message: 'Buenas. Bienvenido a la mejor api del mundo.',
        usage: '.../crypto/$var',
        example: '.../crypto/BTC'
    });
});

module.exports = app;