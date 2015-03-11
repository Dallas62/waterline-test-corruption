
// Include third party library
var async     = require('async'),
    Waterline = require('waterline');;

// Include config
var config    = require('./config');

// Include models
var Owner     = require('./models/owner'),
    Pet       = require('./models/pet');

// Instanciate Waterline
var orm       = new Waterline();

// Include all we need to test
var before    = require('./test/before'),
    run       = require('./test/run');

// Load collections in Waterline
orm.loadCollection(Pet);
orm.loadCollection(Owner);

// Start Waterline passing adapters in
orm.initialize(config, function(err, models) {
    if(err) throw err;

    console.log('Running test...');

    // Run the test
    async
        .waterfall( [
            function(callback) {

                // Initialize the test
                before(
                    models.collections.owner,
                    models.collections.pet,
                    callback
                );
            },

            function(callback) {

                // Run the test
                run(
                    models.collections.owner,
                    models.collections.pet,
                    callback
                );
            }
        ], function (err, result) {
            
            console.log('The test is done.'); 

            // Exit the program
            process.exit(0);
        });
});