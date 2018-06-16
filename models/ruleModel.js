var bookshelf = require('../database');

var Rule = bookshelf.Model.extend({
    tableName: 'rules',
    rule_func: function(){
        return this.belongsTo('client');
    }
    // hasTimestamps :true
});

// Rule.where({
//     id: 1
// })
// .fetch({
//     withRelated: ['rule_func']
// })
// .then(function(book){
//     console.log(book.related('rule_func'));
// })

module.exports=Rule;