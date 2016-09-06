'use strict';

module.exports = function (params, callback) {
  // Call the create function with named args that were passed to the program
  require('../lib/environment/create')(params.args.map, callback);
};
