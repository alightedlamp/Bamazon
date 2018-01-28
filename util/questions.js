const Questions = {
  customer: [
    {
      message: 'Enter the ID of the item you would like to purchase',
      name: 'itemId'
    },
    {
      message: 'How many units would you like to buy?',
      name: 'quantity',
      default: 1,
      validate: value => (Number.isInteger(parseInt(value)) ? true : false)
    }
  ]
};

module.exports = Questions;
