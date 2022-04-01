// this is responsible for interacting with https://zipcodeapi.com/API
'user strict';

const api = require('axios')
const config = require('config');

const apiKey = config.get('zipCode.apiKey');
const zipCodeURL = config.get('zipCode.apiURL');

var distance = {
    find: (req, res, next) => {
        url = zipCodeURL + apiKey +
        '/distance.json/' + req.params.zipcode1 + '/' +
        req.params.zipcode2 + '/km'
        return api.get(url)
            .then((result) => {
                return  [result.status, result.data]
            }).catch((error) => {
                console.log(error)
                return [error.response.status, error.response.data]
            });
    }
};

module.exports = distance;