const connection = require('../util/helpers').connection;
const { table } = require('table');

module.exports = {
  viewDepartments: function() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT id, name FROM departments', (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  },
  viewSalesByDepartment: function(department, cb) {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT d.id as department_id, d.name as department_name, d.overhead_costs, 
        SUM(p.total_sales) as product_sales, SUM(d.overhead_costs - product_sales) as profit
        FROM department d 
        INNER JOIN product p 
        ON d.id = p.department_id 
        WHERE d.id = ?
        GROUP BY product_sales, profit`,
        [department],
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
  addNewDepartment: function(name, overheadCosts, cb) {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO department SET ?',
        {
          name: name,
          overhead_costs: overheadCosts
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
  }
};
