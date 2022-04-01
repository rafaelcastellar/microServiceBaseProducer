//creating express application
const express = require('express');
const app = express();

// setting logger up
const logger = require('./utils/logger')

//to use .env parameters
const config = require('config');

//adding routes
const routes = require('./api_routes/routes');
routes(app);


//if cors needed
// const cors = require("cors");
// var corsOptions = {
//     origin: "http://localhost:8081"
//   };
// app.use(cors(corsOptions));


// get MongoDB driver connection
const dbo = require("./db/dbConn");

//starting the server
const port = config.get('port');

// perform a database connection when the server starts
dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }
})

app.listen(port, () => {
    logger.info(`Listening to port http://localhost:${port}`);
});