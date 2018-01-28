const inquirer = require('inquirer');
const inventory = require('./inventory');
const questions = require('../util/questions').customer;

const Customer = {
  start: function() {
    const _this = this;
    inquirer.prompt(questions).then(response => {
      const product = response.itemId;
      const quantity = response.quantity;

      // Check if there is enough inventory
      inventory.checkRemaining(product, res => {
        if (res - quantity >= 0) {
          inventory.updateQuantity(product, quantity, () => {
            _this.showTotal(product, quantity);
          });
        } else {
          console.log('Insufficient inventory!');
          _this.keepShopping();
        }
      });
    });
  },
  end: function() {
    console.log('\nThanks again for shopping, have a nice day!\n');
  },
  keepShopping: function() {
    const _this = this;
    inquirer
      .prompt([
        {
          message: 'Do you want to buy something else?',
          type: 'confirm',
          name: 'confirm'
        }
      ])
      .then(response => (response.confirm ? _this.start() : _this.end()));
  },
  showTotal: function(product, quantity) {
    // Get price of product and multiply by quantity
    const _this = this;
    inventory.getItemPrice(product, res => {
      const totalPrice = res * quantity;
      console.log(
        `\nYour total order price is:  \$${parseFloat(totalPrice / 100).toFixed(
          2
        )}\nThank you for shopping at Bamazon!\n`
      );
      inventory.updateProductSales(product, totalPrice, () => {
        _this.keepShopping();
      });
    });
  }
};

module.exports = Customer;
