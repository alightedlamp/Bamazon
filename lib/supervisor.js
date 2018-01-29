const inquirer = require('inquirer');
const inventory = require('./inventory');
const department = require('./department');
const questions = require('../util/questions').supervisor;

module.exports = {
  start: function() {
    inquirer.prompt(questions).then(res => inventory[res.choice]());
  }
};
