/**
 * Author: Ken
 * Date: 30/05/2013
 * Time: 15:57
 */
/*global module*/
function Look() {
    "use strict";
    var self = this,
        overhead = 0;

//    self.config = function (options) {
//
//    };

    self.record = function (packet) {
        console.log("from look: %j", packet);
        if (packet && packet.length) {
            if (typeof packet.length === 'number') {
                overhead += packet.length;
            } else {
                overhead += parseInt(packet.length, 10);
            }
            if (packet.cmd === 'publish') {
                console.log('length in total: ' + self.finish());
            }
        }
    };

    self.finish = function () {
        return overhead;
    };

    self.reset = function () {
        overhead = 0;
    };
}

module.exports = Look;