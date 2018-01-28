const mysql = require('mysql');

module.exports = {
  connection: mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'bamazon'
  })
};
