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
  viewSalesByDepartment: function() {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT d.id as department_id, d.name as department_name, d.overhead_costs, 
        SUM(p.total_sales) as product_sales, SUM(p.total_sales) - d.overhead_costs as profit
        FROM departments d 
        INNER JOIN products p 
        ON d.id = p.department_id
        GROUP BY 1, 2, 3`,
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
  addNewDepartment: function(name, overheadCosts) {
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
