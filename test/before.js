
// Include third party library
var async      = require('async');

// List of characters
var characters = 'abcdefghijklmnopqrstuvwxyz' +
                 '0123456789';

// Name generator
function generateName( length )
{
    var id = '';

    for( var i = 0; i < length; i++ ) {
        id += characters.charAt(
            Math.floor(
                Math.random() * characters.length
            )
        );
    }

    return id;
}

// Define before function
module.exports = function before( Owner, Pet, cb ) {

    console.log(': before - start');

    // Store all data before create them
    var owners = [],
        pets   = [];

    // Generate 1000 owners and pets
    for( var i = 0; i < 10; i++) {

        // Store the new owner
        owners.push({
            name: generateName( 32 )
        });

        // Store the new pet
        pets.push({
            name: generateName( 32 )
        });

    }

    // Be sure that all data have been created
    async
        .waterfall( [

            function(callback) {

                // Create owners
                Owner
                    .create( owners )
                    .exec(
                        function( err ) {
                            if( err ) {
                                throw err;
                            }

                            callback();
                        }
                    );
            },

            function(callback) {

                // Create pets
                Pet
                    .create( pets )
                    .exec(
                        function( err ) {
                            if( err ) {
                                throw err;
                            }

                            callback();
                        }
                    );
            }
        ], function (err, result) {
            
            console.log(': before - end');

            // Call the next step
            if(typeof cb === 'function') {

                cb();
            }
        });
};