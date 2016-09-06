'use strict';

var util = require('./utils')
  , async = require('async');

/**
 * This should be used when in the /library context of an ansible project.
 * Will automatically parse args and execute the required "action"
 * @param  {Function} callback
 */
exports.execAnsibleLibrary = function (callback) {
  async.waterfall([
    function (next) {
      require('fh-fhc').load(next);
    },
    util.parseArgs,
    util.execAction
  ], callback);
};
