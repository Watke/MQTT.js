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
test('record should be infected by payload', function () {
    "use strict";
    var look = new Look(),
        options = {};
    // config look
    options.payload = 3;
    look.config(options);
    look.record({"cmd": "publish", "retain": false, "qos": 0, "dup": false, "length": 10, "returnCode": 0});
    assert.deepEqual(look.finish(), 10 - options.payload);
    look.reset();
    look.record({"cmd": "connack", "retain": false, "qos": 0, "dup": false, "length": 2, "returnCode": 0});
    look.record({"cmd": "publish", "retain": false, "qos": 0, "dup": false, "length": 12, "returnCode": 0});
    assert.deepEqual(look.finish(), 14 - options.payload);
});