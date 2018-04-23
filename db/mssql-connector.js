const sql = require('mssql')

// config for your database
var config = {
    user: 'node',
    password: '12345678',
    server: '127.0.0.1',
    database: 'sakila'
};

var connection = sql.connect(config, function (err) {
    if (err)
        throw err; 
});

module.exports = sql; 