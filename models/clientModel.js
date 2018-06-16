var bookshelf = require('../database');

var Client = bookshelf.Model.extend({
    tableName: 'client',
    
    // hasTimestamps :true
});

module.exports=Client;