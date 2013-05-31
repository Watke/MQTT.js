/**
 * Author: Ken
 * Date: 30/05/2013
 * Time: 16:52
 */
var util = require('util');

var serverCB = function (client, look) {
    "use strict";
    var self = this;
    if (!self.clients) {
        self.clients = {};
    }

    client.on('connect', function (packet) {
        self.clients[packet.client] = client;
        client.id = packet.clientId;
//        console.log("CONNECT(%s): %j", client.id, packet);
        look.record(packet);
        client.subscriptions = [];
        client.connack({returnCode: 0});
    });

    client.on('subscribe', function (packet) {
        var i,
            qos,
            topic,
            reg,
            granted = [];

        console.log("SUBSCRIBE(%s): %j", client.id, packet);

        for (i = 0; i < packet.subscriptions.length; i += 1) {
            qos = packet.subscriptions[i].qos;
            topic = packet.subscriptions[i].topic;
            reg = new RegExp(topic.replace('+', '[^\/]+').replace('#', '.+') + '$');

            granted.push(qos);
            client.subscriptions.push(reg);
        }

        client.suback({messageId: packet.messageId, granted: granted});
    });

    client.on('publish', function (packet) {
        var k,
            c,
            i,
            s,
            publish;
        // see util.format at http://nodejs.org/api/util.html#util_util_format_format
//        console.log("PUBLISH(%s): %j", client.id, packet);
        look.record(packet);
        for (k in self.clients) {
            if (self.clients.hasOwnProperty(k)) {
                c = self.clients[k];
                publish = false;

                for (i = 0; i < c.subscriptions.length; i += 1) {
                    s = c.subscriptions[i];

                    if (s.test(packet.topic)) {
                        publish = true;
                    }
                }

                if (publish) {
                    c.publish({topic: packet.topic, payload: packet.payload});
                }
            }
        }
    });

    client.on('pingreq', function (packet) {
        console.log('PINGREQ(%s)', client.id);
        client.pingresp();
    });

    client.on('disconnect', function (packet) {
        client.stream.end();
    });

    client.on('close', function (packet) {
        delete self.clients[client.id];
    });

    client.on('error', function (e) {
        client.stream.end();
        console.log(e);
    });
};

module.exports = serverCB;
