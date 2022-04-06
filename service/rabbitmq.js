// this is the object responsible manage the connection to rabbitMQ and send messages to it.
// if this microservice is a consumer, you may want add the consuming functions here. 
'use strict';

const amqplib = require('amqplib');
const config = require('config');
const logger = require('../utils/logger');


const rabbitConfig = config.get('rabbitMQ')
const rabbitMQURL = `amqp://${rabbitConfig.user}:${rabbitConfig.pwd}@${rabbitConfig.host}:${rabbitConfig.port}`;

const client = amqplib.connect(rabbitMQURL, { keepAlive: true });
logger.info('Starting RabbitMQ connection');


module.exports = {
    sendMessage(exchange, key, message) {
        return client
            .then(connection => connection.createChannel())
            .then(channel => channel.assertExchange(exchange, 'topic', { durable: true })
                // .then(() => channel.assertQueue('', { durable: true })
                    // .then((q) => channel.bindQueue(q.queue, exchange, key)
                        .then(() => channel.publish(exchange, key, Buffer.from(JSON.stringify(message)), { persistent: true }))
                        .then(() => logger.debug('Sent message: ' + JSON.stringify(message)))
                        .then(() => channel.close())
            )
            .catch((error) => logger.error('Error sending message to MQ: ' + error));
    },
};