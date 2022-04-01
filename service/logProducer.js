// this is the Producer that sends log data to the rabbitMQ, which will be consumed for others microservices 
'use strict';

const logger = require('../utils/logger');
const rabbitMq = require('./rabbitmq');

const sendQueryDistanceLog = async (someAdditionalText) => {
    // You can use an exchange/key fron config/default.json
    const exchange = 'log';
    const key = 'distance.query';  

    var log = {
        ip: '127.0.0.1',
        os: 'Linux',
        user: 'foo',
        timestamp: new Date(),
        addtional: ''
    };

    // someAdditionalText is a text you want to add to the message 
    log.addtional = someAdditionalText;

    logger.debug("Sending message for ", exchange, key);
    return rabbitMq.sendMessage(exchange, `${key}`, log);
}

module.exports = {sendQueryDistanceLog};
