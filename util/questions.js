module.exports = {
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
  ],
  manager: {
    init: [
      {
        message: 'Choose an option:',
        type: 'rawlist',
        choices: [
          {
            name: 'View Products for Sale',
            value: 'view_all_products'
          },
          {
            name: 'View Low Inventory',
            value: 'view_low_inventory'
          },
          {
            name: 'Add to Invetory',
            value: 'add_to_inventory'
          },
          {
            name: 'Add New Product',
            value: 'add_new_product'
          }
        ],
        name: 'choice'
      }
    ],
    updateInventory: [
      {
        message: 'Prodcut ID:',
        name: 'id'
      },
      {
        message: 'Quantity:',
        name: 'quantity'
      }
    ],
    addProduct: [
      {
        message: 'Product name:',
        name: 'name'
      },
      {
        message: 'Department ID:',
        name: 'department'
      },
      {
        message: 'Price:',
        name: 'price'
      },
      {
        message: 'Quantity:',
        name: 'quantity'
      }
    ]
  },
  supervisor: {
    init: [
      {
        message: 'Choose an option:',
        type: 'rawlist',
        choices: [
          {
            name: 'View Product Sales by Department',
            value: 'view_sales'
          },
          {
            name: 'Add New Department',
            value: 'add_department'
          }
        ],
        name: 'choice'
      }
    ],
    addDepartment: [
      {
        message: 'Enter department name:',
        name: 'name'
      },
      {
        message: 'Overhead costs:',
        name: 'overheadCosts'
      }
    ]
  }
};
