'use strict';

// MongoDB connection object

const { MongoClient } = require("mongodb");
const config = require('config');
const logger = require("../utils/logger");

const mongoConfig = config.get('mongoDB')
const connectionString = `mongodb://${mongoConfig.user}:${mongoConfig.pwd}@${mongoConfig.host}:${mongoConfig.port}?retryWrites=true&w=majority`;

const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        logger.error("Error when connecting to MongoDB.");
        return callback(err);
      }
      dbConnection = db.db(mongoConfig.database);
      logger.info("Successfully connected to MongoDB.");

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};