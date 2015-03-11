
var mysqlAdapter = require('sails-mysql');

module.exports = {

    // Setup Adapters
    // Creates named adapters that have have been required
    adapters: {

        'default': mysqlAdapter,
        'mysql':   mysqlAdapter
    },

    // Build Connections Config
    // Setup connections using the named adapter configs
    connections: {

        mysql: {
            adapter:  'mysql',
            host:     'localhost',
            port:      3306,
            user:     'waterline-test',
            password: 'waterline-test',
            database: 'waterline-test'
        }
    },

    // Drop all data before the test
    defaults: {
        
        migrate: 'drop'
    }
};