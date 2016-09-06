'use strict';

var fhc = require('fh-fhc')
  , VError = require('verror');

module.exports = function createEnvironment (args, cb){
  //['admin', 'environments', 'create', '--id='+engagementNameEnv, '--label='+engagementNameEnv, '--targets='+engagementName]
  if (!args['engagementName'] || !args['environment']){
    return cb(
      new VError('"-environment" and "-engagementName" are required'),
      null
    );
  }

  var engagementName = args['engagementName'] + '-' + args['environment'];
  fhc.admin.environments.read({id: engagementName}, function(err, envRead){
  	if (err){  // If the environment does not exist an error is returned from the read call.
  	  fhc.admin.environments.create({
  	    id: engagementName,
  	    label: engagementName,
  	    targets: engagementName,
  	  }, function(err, response){
  	      if (err){
  	        cb(new VError(err, 'failed to create environment'));
  	      } else {
            response.changed = true;
  	        cb(null, response);
  	      }
  	  });
  	} else {
  		if (envRead.id == engagementName){
  			cb(null, {id: envRead.id, changed:false});
  		} else {
  			cb(new VError(err, 'Unknown error reading environment'), null);
  		}
  	}
  });
};
