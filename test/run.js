
// Include third party library
var async      = require('async');

// Be sure data are pass-by-value
function update( Model, id, fieldName, target ) {

    // Return the task of an update
    return function( callback ) {

        // define the object
        var newData      = {};

        // Associations
        var associations = [];

        // Add the target
        associations.push( target );

        // Set the association
        newData[fieldName.toString()] = associations;

        // Update the model
        Model
            .update( id, newData )
            .exec( function( err ) {

                console.log( ':: Associate', id, 'with', newData[fieldName.toString()] );

                if( typeof callback === 'function' ) {

                    callback( err );
                }
            } );
    };
}

// Define before function
module.exports = function run( Owner, Pet, cb ) {

    console.log(': run - start');

    var tasks = [];

    // Generate the list of tasks
    for( var i = 1; i <= 10; i++ ) {

        // Generate the task for owner
        tasks.push( update( Owner, i, 'pets', i ) );

        // To test with pet:
        //tasks.push( update( Pet, i, 'owners', i ) );
    }
    
    // Run all tasks
    async.parallel( tasks, function(err, results) {
        
        if( err ) {

            console.log( err );
        }

        console.log(': run - end');

        // Call the next step
        if(typeof cb === 'function') {

            cb();
        }   
    });
};