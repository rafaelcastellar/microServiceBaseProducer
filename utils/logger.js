// this is the logger object, and its configuration, used throughout the microservice.
'use strict';

const winston = require('winston')
const config = require('config');

const loggerOptions = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        verbose: 3,
        debug: 4,
        silly: 5
    },
    colors: {
        silly: 'magenta',
        verbose: 'magenta',
        debug: 'blue',
        info: 'green',
        warn: 'yellow',
        error: 'red'
    },
};

const prettyPrint = obj => JSON.stringify(obj);

const transportsOptions = {
    file: {
        level: 'info',
        filename: 'logs/app.log',
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
        format: winston.format.combine(
            winston.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            winston.format.json()
        ),
    },
    console: {
        level: 'debug',
        level: config.get('logger.console.level'),
        handleExceptions: true,
        json: false,
        colorize: true,
        prettyPrint,
        format: winston.format.combine(
            winston.format.colorize(loggerOptions.colors, { all: true }),
            winston.format.align(),
            winston.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            winston.format.printf(info => `[${[info.timestamp]}] ${info.level} | ${info.message}`),
        ),
    }
}

const errorConsoleOpt = {
    colorize: true,
    handleExceptions: true,
    humanReadableUnhandledException: true
};

const logger = winston.createLogger({
    levels: loggerOptions.levels,
    transports: [
        new winston.transports.File(transportsOptions.file),
        new winston.transports.Console(transportsOptions.console)
    ],
    // exceptionHandlers: [
    //     new winston.transports.Console(errorConsoleOpt)
    // ],
    exitOnError: false
})

module.exports = logger