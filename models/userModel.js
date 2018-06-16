var bookshelf = require('../database');

var User = bookshelf.Model.extend({
    tableName: 'user',
    // hasTimestamps :true
});

module.exports=User;