const mysql = require('mysql');
const connection = require('../util/helpers').connection;

const Inventory = {
  viewAllProducts: function() {},
  viewLowInventory: function() {},
  addToInventory: function(product) {},
  addProduct: function(name, price, department, quantity) {},
  getItemPrice: function(product, cb) {
    connection.query(
      'SELECT price FROM products WHERE id = ?',
      [product],
      (err, res) => {
        if (err) throw err;
        cb(res[0].price);
      }
    );
  },
  checkRemaining: function(product, cb) {
    connection.query(
      'SELECT quantity FROM products WHERE id = ?',
      [product],
      (err, res) => {
        if (err) {
          throw err;
        }
        cb(res[0].quantity);
      }
    );
  },
  updateQuantity: function(product, quantity, cb) {
    connection.query(
      'UPDATE products SET quantity = quantity - 1 WHERE id = ?',
      [product],
      (err, res) => {
        if (err) {
          throw err;
        }
        cb();
      }
    );
  },
  updateProductSales: function(product) {}
};

module.exports = Inventory;
