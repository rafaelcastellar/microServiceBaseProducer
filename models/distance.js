// model object that is responsible for manipulating data in/to MongoDB 
'use strict';

const dbo = require("../db/dbConn");
const logger = require('../utils/logger');

const getAll = async () => {
    const dbConnect = dbo.getDb();

    return dbConnect
        .collection("distances")
        .find({}).limit(50)
        .toArray().then((result) => {
            return [true, result]
        }).catch((err) => {
            return [false, err]
        })
};

const add = async (document) => {
    const dbConnect = dbo.getDb();

    return dbConnect
        .collection("distances")
        .insertOne(document).then((result) => {
            logger.info(`Added a new match with id ${result.insertedId}`);
            return true
        }).catch((erro) => {
            logger.error('Error inserting distance!', erro)
            return false
        })
};

module.exports = { getAll, add };