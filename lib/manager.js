const inquirer = require('inquirer');
const { table } = require('table');

const inventory = require('./inventory');
const department = require('./department');
const questions = require('../util/questions').manager;

module.exports = {
  start: function() {
    const _this = this;
    inquirer.prompt(questions.init).then(res => {
      switch (res.choice) {
        case 'view_all_products':
          _this.outputProducts();
          break;
        case 'view_low_inventory':
          _this.outputLowInventory();
          break;
        case 'add_to_inventory':
          _this.handleAddInventory();
          break;
        case 'add_new_product':
          _this.handleAddProduct();
          break;
        default:
          console.log('Not a valid option');
      }
    });
  },
  outputProducts: function() {
    inventory.viewAllProducts().then(res => {
      const data = [['ID', 'Name', 'Price', 'Quantity']];
      res.map(item => {
        data.push([item.id, item.name, item.price, item.quantity]);
      });
      console.log(table(data));
    });
  },
  outputLowInventory: function() {
    inventory.viewLowInventory().then(res => {
      if (res.length > 0) {
        const data = [['ID', 'Name', 'Price', 'Quantity']];
        res.map(item => {
          data.push([item.id, item.name, item.price, item.quantity]);
        });
        console.log(table(data));
      } else {
        console.log('No items with low inventory');
      }
    });
  },
  handleAddInventory: function() {
    inquirer.prompt(questions.updateInventory).then(res => {
      inventory.addToInventory(res.id, res.quantity).then(() => {
        console.log(`Quantity updated for product ID: ${res.id}`);
      });
    });
  },
  handleAddProduct: function() {
    inquirer.prompt(questions.addProduct).then(res => {
      inventory
        .addProduct(res.name, res.price, res.department, res.quantity)
        .then(() =>
          console.log(`${res.name} added to department ID ${res.department}!`)
        );
    });
  }
};
