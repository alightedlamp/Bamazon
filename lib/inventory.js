const connection = require('../util/helpers').connection;

const Inventory = {
  viewAllProducts: function(cb) {
    connection.query(
      'SELECT id, name, price, quantity FROM products',
      (err, res) => {
        if (err) {
          throw err;
        }
        cb(res);
      }
    );
  },
  viewLowInventory: function(cb) {
    connection.query(
      'SELECT id, name, quantity FROM product WHERE quantity < 5',
      (err, res) => {
        if (err) {
          throw err;
        }
        cb(res);
      }
    );
  },
  addToInventory: function(product, quantity, cb) {
    connection.query(
      'UPDATE product SET quantity = ?',
      [quantity],
      (err, res) => {
        if (err) {
          throw err;
        }
        cb();
      }
    );
  },
  addProduct: function(name, price, department, quantity, cb) {
    connection.query(
      'INSERT INTO PRODUCTS SET ?',
      {
        name: name,
        price: price,
        department: department,
        quantity: quantity
      },
      (err, res) => {
        if (err) {
          throw err;
        }
        cb();
      }
    );
  },
  getItemPrice: function(product, cb) {
    connection.query(
      'SELECT price FROM products WHERE id = ?',
      [product],
      (err, res) => {
        if (err) {
          throw err;
        }
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
  updateProductSales: function(product, totalPrice, cb) {
    connection.query(
      `UPDATE product SET product_sales = product_sales + ${totalPrice} WHERE id = ?`,
      [product],
      (err, res) => {
        if (err) {
          throw err;
        }
        cb();
      });
  }
};

module.exports = Inventory;
