var bookshelf = require('../database');
var bcrypt = require('bcrypt');
var Users = bookshelf.Model.extend({
    tableName: 'users',
});
// Users.methods.comparePassword = function(password){
//     return bcrypt.compareSync(password, Users.password);
// }
module.exports = Users;