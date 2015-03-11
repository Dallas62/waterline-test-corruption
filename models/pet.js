
var Waterline = require('waterline');

// Define pets
module.exports = Waterline.Collection.extend({

    // Set the identity
    identity:   'pet',

    // Set schema true
    schema:      true,

    // Set the connection to MySQL
    connection: 'mysql',

    // Define all attributes
    attributes: {

        name: {
            
            type:       'string'
        },

        owners: {

            collection: 'owner',
            via:        'pets'
        }
    }
});