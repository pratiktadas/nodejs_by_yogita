var knex = require('knex')({
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'db_samplenode'
    }
  })
  var bookshelf = require('bookshelf')(knex);
  module.exports = bookshelf;