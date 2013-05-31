/**
 * Author: Ken
 * Date: 30/05/2013
 * Time: 16:49
 */
/*global require, Buffer*/
var assert = require("assert"),
    serverCB = require("../examples/server/serverCB.js"),
    mqtt = require('..'),
    Look = require('../lib/look');

(function () {
    "use strict";
    var server,
        client,
        topic,
        message,
        messageLengthInByte,
        look = new Look();
    // create a server
    server = mqtt.createServer(function (client) {
        serverCB.call(this, client, look);
    });
    server.listen(1883);
    // create a client
    client = mqtt.createClient();
    topic = 'test0';
    message = '12345';
    messageLengthInByte = Buffer.byteLength(message, 'utf8');
    client.conn.on('connack', function (packet) {
        look.record(packet);
    });
    client.publish(topic, message, function () {
        look.record({cmd: 'message', length: messageLengthInByte});
    });
}());