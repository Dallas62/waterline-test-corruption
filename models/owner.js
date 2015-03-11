
var Waterline = require('waterline');

// Define the owner of pets
module.exports = Waterline.Collection.extend({

    // Set the identity
    identity:   'owner',

    // Set schema true
    schema:      true,

    // Set the connection to MySQL
    connection: 'mysql',

    // Define all attributes
    attributes: {

        name: {

            type:       'string'
        },

        pets: {

            collection: 'pet',
            via:        'owners',
            dominant:    true
        }
    }
});