const connection = require('../util/helpers').connection;

module.exports = {
  viewAllProducts: function() {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT id, name, price, quantity FROM products',
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  },
  viewLowInventory: function() {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT id, name, quantity FROM products WHERE quantity < 5',
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  },
  addToInventory: function(product, quantity) {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE products SET quantity = quantity + ${quantity} WHERE id = ?`,
        [product],
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  },
  addProduct: function(name, price, department, quantity) {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO products SET ?',
        {
          name: name,
          price: price,
          department_id: department,
          quantity: quantity
        },
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  },
  getItemPrice: function(product) {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT price FROM products WHERE id = ?',
        [product],
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res[0].price);
          }
        }
      );
    });
  },
  checkRemaining: function(product) {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT quantity FROM products WHERE id = ?',
        [product],
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res[0].quantity);
          }
        }
      );
    });
  },
  updateQuantity: function(product) {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE products SET quantity = quantity - 1 WHERE id = ?',
        [product],
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  },
  updateProductSales: function(product, totalPrice) {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE products SET total_sales = total_sales + ${totalPrice} WHERE id = ?`,
        [product],
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }
};
