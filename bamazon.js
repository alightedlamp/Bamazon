const connection = require('./util/helpers').connection;

const optionDefinitions = [
  { name: 'user', type: String },
  { name: 'pw', type: String }
];
const commandLineArgs = require('command-line-args');
const options = commandLineArgs(optionDefinitions);

const customer = require('./lib/customer');
const manager = require('./lib/manager');
const supervisor = require('./lib/supervisor');

const run = function() {
  if (!options.user) {
    customer.start();
  } else if (options.user === 'manager' && options.pw === 'managerpw') {
    manager.start();
  } else if (options.user === 'supervisor' && options.pw === 'supervisorpw') {
    supervisor.start();
  }
};

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  run();
});
