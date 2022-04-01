
'use strict';

const properties = require('../package.json');

// the controller that attend the /about route. It returns information from package.json
const about = (req, res) => {
    var aboutInfo = {
        name: properties.name,
        version: properties.version,
        description: properties.description,
    }
    res.json(aboutInfo);
}

module.exports = {about,};
