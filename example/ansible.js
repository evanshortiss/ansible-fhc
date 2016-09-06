#!/usr/local/bin/node

// WANT_JSON

/**
 * Simply place this script in your library folder and it will exec the required
 * command specified by the yml file. The WANT_JSON String must be included
 */

var ansiblefhc = require('ansible-fhc');

// This line parses args passed by ansible and runs a specified action
ansiblefhc.execAnsibleLibrary();
