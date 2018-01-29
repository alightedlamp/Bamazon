const inquirer = require('inquirer');
const inventory = require('./inventory');
const questions = require('../util/questions').customer;

module.exports = {
  start: function() {
    const _this = this;
    inquirer.prompt(questions).then(response => {
      const product = response.itemId;
      const quantity = response.quantity;

      // Check if there is enough inventory
      inventory.checkRemaining(product).then(res => {
        if (res - quantity >= 0) {
          inventory
            .updateQuantity(product)
            .then(() => _this.showTotal(product, quantity));
        } else {
          console.log('Insufficient inventory!');
          _this.start();
        }
      });
    });
  },
  end: function() {
    console.log('\nThanks again for shopping, have a nice day!\n');
  },
  showTotal: function(product, quantity) {
    // Get price of product and multiply by quantity
    const _this = this;
    inventory.getItemPrice(product).then(res => {
      const totalPrice = res * quantity;
      console.log(
        `\nYour total order price is:  \$${parseFloat(totalPrice / 100).toFixed(
          2
        )}\nThank you for shopping at Bamazon!\n`
      );
      inventory
        .updateProductSales(product, totalPrice)
        .then(() => _this.start());
    });
  }
};
