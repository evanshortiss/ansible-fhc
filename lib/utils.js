'use strict';

var path = require('path')
  , VError = require('verror');

exports.stripString = function(string){
  string = string.replace(/['"]+/g, '').trim()
  return string;
}
exports.removeString = function(string, remove){
	string = string.replace(remove, '')


    return string;

}


/**
 * Parse arguments into a format meeting our needs
 * @param  {Function} callback
 */
exports.parseArgs = function (callback) {
  var argv = require('yargs').argv;

  var parsedArgs = {
    args: {
      map: argv,
      list: argv._
    },
    action: argv._.splice(0, 1)
  };

  // Remove the _ reference for nicer separation
  delete argv._;

  callback(null, parsedArgs);
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
