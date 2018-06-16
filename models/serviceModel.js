var bookshelf = require('../database');

var Service = bookshelf.Model.extend({
    tableName: 'service',
    // hasTimestamps :true
});

module.exports=Service;