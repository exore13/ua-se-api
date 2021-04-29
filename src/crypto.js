const response = require('express');
const express = require('express');
const rp = require('request-promise');

const router = express.Router();
const base_url = 'https://api.blockchain.com/v3/exchange/tickers/';

router.get('/', (req,res) => {
    res.status(401).json({
        msg: 'Error. No has introducido una crypto.',
        'llamada correcta': '.../crypto/BTC'
    });
});

router.get('/:crypto', (req, res) => {

    const id = req.params.crypto;
    var data;

    // 1st read
    const requestOptions = {
        method: 'GET',
        uri: base_url + id + "-USD",
        json: true
    };

    rp(requestOptions).then(response => {
        console.log('API call response:', response);

        const _price = response.price_24h;

        data = {
            crypto: id,
            USD: _price,
            EUR: 0,
        };
        
        console.log('Data extracted 1: %j', data);

        // 2nd read
        requestOptions.uri = base_url + id + "-EUR";
        rp(requestOptions).then(response => {
            console.log('API call response:', response);
    
            const _price = response.price_24h;
            data.EUR = _price;
            
            console.log('Data extracted: %j', data);
            res.status(200).send(data);
            
        }).catch((err) => {
            console.log('API call error:', err.message);
            console.log('Data extracted: %j', data);
            res.status(200).json({
                crypto: id,
                USD: data.USD,
                EUR: 'Esta crypto no tiene par -EUR'
            });
        });

    }).catch((err) => {
        console.log('API call error:', err.message);
        res.status(401).json({
            msg: 'Error, la crypto indicada no esta soportada por la api o es erronea. Podria no tener pares -USD y -EUR',
            crypto: id
        });
    });
});

module.exports = router;


