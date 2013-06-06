/**
 * Author: Ken
 * Date: 06/06/2013
 * Time: 14:57
 */
/*global require, suite, test*/
var assert = require("assert"),
    StringGenerate = require('../lib/stringgenerate');

suite('StringGenerate');
test('generate in length of 5', function () {
    "use strict";
    var message,
        messageLength = 5,
        aStringGenerate = new StringGenerate();
    message = aStringGenerate.
        init({messageLength: messageLength}).
        generate();
    assert.deepEqual(message.length, messageLength);
});
test('generate in length of 10', function () {
    "use strict";
    var message,
        messageLength = 10,
        aStringGenerate = new StringGenerate();
    message = aStringGenerate.
        init({messageLength: messageLength}).
        generate();
    assert.deepEqual(message.length, messageLength);
});
test('generate in length of 15', function () {
    "use strict";
    var message,
        messageLength = 15,
        aStringGenerate = new StringGenerate();
    message = aStringGenerate.
        init({messageLength: messageLength}).
        generate();
    assert.deepEqual(message.length, messageLength);
});
test('generate in length of 20', function () {
    "use strict";
    var message,
        messageLength = 20,
        aStringGenerate = new StringGenerate();
    message = aStringGenerate.
        init({messageLength: messageLength}).
        generate();
    assert.deepEqual(message.length, messageLength);
});