'use strict';

const about = require('../controllers/about');
const distance = require('../controllers/distance');

// define the routes of the microservice API
module.exports = (app) => {
    app.route('/about').get(about.about);
    app.route('/distance/:zipcode1/:zipcode2').get(distance.getDistance);
    app.route('/distances').get(distance.getAll);
}