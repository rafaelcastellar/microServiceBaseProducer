# microServiceBaseProducer
This is a simple but extended example of a NodeJS microservice that can be used as a base for creating new one, more reliable and complete. 
It was created as resulting from my study about microservices which I did from my short experience creating NodeJS APIs and reading some good tutorials listed bellow.

I hope it can help you learn about microservice and enhance this base.

*Considere the [microServiceBaseConsumer](https://github.com/rafaelcastellar/microServiceBaseConsumer) for a complete example.*


### How it works
This microservices acts like and API entry within three endpoints:

**/distance/:zipcode1/:zipcode2** the user inform two US zipcodes, the microservice fetch the distance between them from https://zipcodeapi.com/API, save it on MongoDB and sends a query log to RabbiMB, which will be consumed by our other microservice.

**/distances** fetchs and returns all the distances queries stored on our MongoDB.

**/about** show descritpion data from package.json

### Folder structure
* *api_routes*: contains the routes managed by the microservice API
* *config*: contains the configuration files with the parameters used by the microservice (rename de default.json.template to default.json and fullfill it with your own parmeters)
* *controllers*: contains all the controllers which handles the requests, processes their data and delivers their responses 
* *db*: contains the MongoDB connection object 
* *models*: contains all the models responsible for manipulating the data (documents) from/to MongoDB 
* *services*: contains serives that interacts with the external world (zipCodeAPI, fi) and other tools (RabbitMQ, fi) 
* *utils*: contains other general purpose utilities like logger object 

### How to Run
1. have a MongoDB instance running
2. have a RabbitMQ instance running
3. get your on zipCodeAPI KEY from https://zipcodeapi.com/API
4. rename config/defaul.json.template to config/default.json
5. fullfill the config/defaul.json with you own parameters
6. install the packages
`npm i`
7. run `npm start`
8. access the endpoints :-)

For a better understanding, run the [microServiceBaseConsumer](https://github.com/rafaelcastellar/microServiceBaseConsumer) in other terminal.



### External sources
I'm thankfull for the these guys who helped me to learn about NodeJS microservices, MongoDB and RabbitMQ: 

* https://www.mongodb.com/languages/express-mongodb-rest-api-tutorial
* https://github.com/mongodb-developer/mongodb-express-rest-api-example/
* https://github.com/cverdier/rabbitmq-node-producer
* https://www.rabbitmq.com/getstarted.html
* https://sematext.com/blog/node-js-logging/
