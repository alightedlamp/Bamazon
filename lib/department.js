const connection = require('../util/helpers').connection;

const Department = {
  viewSalesByDepartment: function(department, cb) {
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
          throw err;
        }
        cb(res);
      }
    );
  },
  addNewDepartment: function(name, overheadCosts, cb) {
    connection.query(
      'INSERT INTO department SET ?',
      {
        name: name,
        overhead_costs: overheadCosts
      },
      (err, res) => {
        if (err) {
          throw err;
        }
        cb();
      }
    );
  }
};

module.exports = Department;
