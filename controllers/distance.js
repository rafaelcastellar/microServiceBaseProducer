'use strict';

const distanceService = require('../service/distance');
const distanceModel = require('../models/distance');
const { sendQueryDistanceLog } = require('../service/logProducer');
const logger = require('../utils/logger');

// get a distance between two zip codes from external API, stored the distance on MongoDB and send a query log to a rabbitMQ topic
// attends the /distance/:zipcode1/:zipcode2 route
const getDistance = (req, res) => {
    distanceService.find(req, res).then(result => {
        let statusCode = result[0]
        let data = result[1]
        if (statusCode == 200) {
            add(req, res, data)
            sendQueryDistanceLog('some addtional data')
        } else {
            logger.error('Error determining distances!')            
            res.send({
                distance: -1,
                error: data,
            });
        }
    })
}

//get all distance documents stored on MongoDB
// attends the /distances route
const getAll = async (req, res) => {
    distanceModel.getAll(req, res).then(resp=>{
        var [isOK, result] = resp
        if (isOK)
            res.json(result)
        else{
            logger.error('Error fetching saved distances!')            
            res.status(400).send('Error fetching saved distances!');
        }
    })
};

//insert a distance document on MongoDB
const add = async (req, res, dist) => {
    var data = {
        zipCodeSource: req.params.zipcode1,
        zipCodeDestiny: req.params.zipcode2,
        distance: dist,
        createdAt: new Date(),
    };

    distanceModel.add(data).then(resp=>{
        if (resp){
            res.send(dist)
        }
        else{
            logger.error('Error insertint distances!')
            res.status(400).send('Error inserting distances!');
        }
    })
};

module.exports = {getDistance,getAll};
