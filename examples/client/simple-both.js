/*global Buffer, require*/
var mqtt = require('../..'),
    stringToSent,
    stringByteLength,
    client = mqtt.createClient();

client.subscribe('test0');
stringToSent = '123456';
stringByteLength = Buffer.byteLength(stringToSent, 'utf8');
client.publish('test0', stringToSent, function () {
    "use strict";
    console.log("message is going out at length: " + stringByteLength);
});
client.on('message', function (topic, message, published) {
    "use strict";
    console.log("The message is: " + message + " At length: " + Buffer.byteLength(message, 'uft8'));
    console.log(published);
});
