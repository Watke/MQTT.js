/**
 * Author: Ken
 * Date: 31/05/2013
 * Time: 14:39
 */
/*global require, suite, test*/
var assert = require("assert"),
    serverCB = require("../examples/server/serverCB.js"),
    mqtt = require('..'),
    Look = require('../lib/look');

suite('Look');
test('record should record packet length', function () {
    "use strict";
    var look = new Look();

    look.record({"cmd": "connack", "retain": false, "qos": 0, "dup": false, "length": 2, "returnCode": 0});
    assert.deepEqual(look.finish(), 2);
    look.reset();
    look.record({"cmd": "connack", "retain": false, "qos": 0, "dup": false, "length": 2, "returnCode": 0});
    look.record({"cmd": "connack", "retain": false, "qos": 0, "dup": false, "length": 12, "returnCode": 0});
    assert.deepEqual(look.finish(), 14);
});