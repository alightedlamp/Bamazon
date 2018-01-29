const inquirer = require('inquirer');
const { table } = require('table');

const inventory = require('./inventory');
const department = require('./department');
const questions = require('../util/questions').supervisor;

module.exports = {
  start: function() {
    const _this = this;
    inquirer.prompt(questions.init).then(res => {
      switch (res.choice) {
        case 'view_sales':
          _this.outputSalesByDepartment();
          break;
        case 'add_department':
          _this.handleAddDepartment();
          break;
      }
    });
  },
  outputSalesByDepartment() {
    const _this = this;
    department.viewSalesByDepartment().then(res => {
      const data = [
        [
          'Department ID',
          'Department Name',
          'Overhead Costs',
          'Product Sales',
          'Profit'
        ]
      ];
      res.map(column => {
        data.push([
          column.department_id,
          column.department_name,
          column.overhead_costs,
          column.product_sales,
          column.profit
        ]);
      });
      console.log(table(data));
      _this.start();
    });
  },
  handleAddDepartment() {
    const _this = this;
    inquirer.prompt(questions.addDepartment).then(res => {
      department.addNewDepartment(res.name, res.overheadCosts);
      console.log('\nNew department added\n');
      _this.start();
    });
  }
};
