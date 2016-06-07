var proxyquire = require('proxyquire');
var fhc = {
	admin: {
		environments: {
			create: function(arguments, cb){

				var response = null,
				err = null;
				response = { __v: 0,
				  created: '2016-06-01T17:56:35.732Z',
				  modified: '2016-06-01T17:56:35.732Z',
				  target: 'projectName',
				  order: 2,
				  domain: 'testing',
				  owner: '3ttcniemc36vavcfagdfcdxe',
				  label: 'projectName',
				  id: 'projectName',
				  _id: '574f21d3b04bb86658e45ec1',
				  enabled: true }
		    	
				cb(err, response);
			},
			read: function(arguments, cb){
				var response = null,
				err = null;
				if (arguments.id == 'test-duplicate-test') {

				  response = { 
				  	  created: '2016-06-01T17:56:35.732Z',
					  modified: '2016-06-01T17:56:35.732Z',
					  target:
					   { _label: 'test-duplicate-test',
					     _env: 'test-duplicate',
					     type: 'openshift3',
					     enabled: true,
					     editable: true,
					     decoupled: true,
					     __v: 0,
					     _id: '574f1253bec3708e43f586a5',
					     bearerToken: 'SQFXSBQNXdCYYeJc6TqZEGSufn5DDivB-oqnFduoV8M',
					     label: 'test-duplicate-test',
					     id: 'test-duplicate-test',
					     servicekey: 'd1738b17303f483092cdd6ea049d1e455e2d07a55454d217c9e4e59dca5c5a9e',
					     routerDNSUrl: '*.apps.osm1.xxxx.net',
					     url: 'https://osm1-master1.xxxx.net:8443',
					     fhMbaasHost: 'https://projectname.osm1-master1.xxxx.net',
					     owner: '3ttcniemc36vavcfagdfcdxe',
					     domain: 'testing',
					     modified: '2016-06-01T16:50:27.706Z',
					     created: '2016-06-01T16:50:27.706Z' },
					  order: 2,
					  domain: 'testing',
					  owner: '3ttcniemc36vavcfagdfcdxe',
					  label: 'test-duplicate-test',
					  id: 'test-duplicate-test',
					  _id: '574f21d3b04bb86658e45ec1',
					  __v: 0,
					  enabled: true 
					}
				} else {
					err = {"userDetail":"Invalid MBaaS target: projectName","systemDetail":"can not read mbaas_target - 'Invalid MBaaS target: projectNa'","code":"FH-SUPERCORE-ERROR"};
				}
				cb(err, response);
			}
		}
	}
		
}

describe('fh Environment calls', function () {
  it('should create Environment ', function (done) {
  	var args = {
        mbaasName: 'projectName',
        environment: 'test'
    }

  	var environment = proxyquire('../lib/environment.js', {'fh-fhc': fhc});
  	environment.create(args, function(err, response){
  		
		response.id.should.equal(args.mbaasName);
		response.changed.should.equal(true);
		done();
  	});
  });
  it('should not create duplicate environment ', function (done) {
  	var args = {
        mbaasName: 'test-duplicate',
        environment: 'test'
    }

  	var environment = proxyquire('../lib/environment.js', {'fh-fhc': fhc});
  	environment.create(args, function(err, response){
		console.log(response)
		response.changed.should.equal(false);
		done();
  	});
  });

   it('should not create Environment missing arguments', function (done) {
  	var args = {}

  	var environment = proxyquire('../lib/environment.js', {'fh-fhc': fhc});
  	environment.create(args, function(err, response){

		err.should.equal("Missing argument");
		done();
  	});
  });



});
