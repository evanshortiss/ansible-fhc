'use strict';

var fs = require('fs')
  , path = require('path')
  , VError = require('verror');

exports.stripString = function(string){
  string = string.replace(/['"]+/g, '').trim();
  return string;
};
exports.removeString = function(string, remove){
	string = string.replace(remove, '');

  return string;
};


/**
 * Parse arguments into a format meeting our needs.
 * @param  {Object}   argv
 * @param  {Function} callback
 */
function _parseArgs (argv, callback) {
  if (!argv.action || !argv._[0]) {
    callback(new VError('no action was specified'));
  } else {
    var parsedArgs = {
      args: argv,
      action: argv.action || argv._.splice(0, 1)
    };

    // Remove the args list and action value
    delete argv._;
    delete argv.action;

    callback(null, parsedArgs);
  }
}


/**
 * Reads these args from an ansible generated file.
 * @param  {Function} callback
 */
exports.getAnsibleArgs = function (callback) {
  fs.readFile(process.argv[2], 'utf8', function (err, data) {
    if (err) {
      callback(
        new VError(err, 'failed to parse ansible args at %s', process.argv[2]),
        null
      );
    } else {
      _parseArgs(JSON.parse(data), callback);
    }
  });
};


/**
 * Parse arguments into a format meeting our needs
 * @param  {Function} callback
 */
exports.getCliArgs = function (callback) {
  _parseArgs(require('yargs').argv, callback);
};


/**
 * Execute the requested action with the given args
 * @param  {Object}   params
 * @param  {Function} callback
 */
exports.execAction = function (params, callback) {
  try {
    require(
      path.join('./actions', params.action)
    )(params.args);
  } catch (e) {
    callback(new VError(e, 'failed to execute action %s', params.action));
  }
};
