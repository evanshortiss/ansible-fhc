#!/usr/bin/env node

var ansiblefhc = require('../lib');

/**
 * Example usage:
 * $ ansible-fhc create-project --engagementName=name --environment=env
 *
 * or also supported:
 *
 * $ ansible-fhc --action=create-project --engagementName=name --environment=env
 */
ansiblefhc.execForCli();
