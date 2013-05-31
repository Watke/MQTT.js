/*global require*/
var mqtt = require('../..'),
    topicName,
    stringToSent,
    stringByteLength,
    client = mqtt.createClient();

topicName = 'test0';
stringToSent = '12345';
stringByteLength = Buffer.byteLength(stringToSent, 'utf8');
client.publish(topicName, stringToSent, function () {
    "use strict";
    console.log("message is going out at length: " + stringByteLength);
});

client.on('connect', function (packet) {
    "use strict";
//    console.log('this is on connack: %j', packet);
});