/**
 * Author: Ken
 * Date: 30/05/2013
 * Time: 16:49
 */
/*global require, Buffer, process*/
var assert = require("assert"),
    serverCB = require("../examples/server/serverCB.js"),
    mqtt = require('..'),
    Look = require('../lib/look'),
    CONSTANT = require('../lib/constant'),
    StringGenerate = require('../lib/stringgenerate');

(function () {
    "use strict";
    var i,
        numberOfIteration,
        server,
        client = mqtt.createClient(), // create a client
        topic = 'test0',
        message,
        messageLength,
        messageLengthInByte,
        aStringGenerate = new StringGenerate(),
        look = new Look(),
        options = {};
    // create a server
    server = mqtt.createServer(function (client) {
        serverCB.call(this, client, look);
    });
    server.listen(1883);
    // generate message
    messageLength = process.argv[0] ||
        CONSTANT.DEFAULT_VALUE.MESSAGE_LENGTH;
    message = aStringGenerate.
        init({messageLength: messageLength}).
        generate();
    // send to message
    messageLengthInByte = Buffer.byteLength(message, 'utf8');
    // config 'message payload' in look
    options.payload = messageLengthInByte;
    look.config(options);
    numberOfIteration = process.argv[1] ||
        CONSTANT.DEFAULT_VALUE.PUBLISH_TIMES;
    for (i = 0; i < numberOfIteration; i += 1) {
        client.publish(topic, message);
    }
}());