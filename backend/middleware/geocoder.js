const NodeGeocoder = require('node-geocoder');

const options = {
    provider : "mapquest",
    httpAdapter : 'https',
    apiKey : "fMoRZIBuYcA5tGQHPn9ioKeIn3RMAxwK",
    formatter : null
}

const geocoder = NodeGeocoder(options);

module.exports = geocoder;