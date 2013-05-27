var mqtt = require('../..')
  , client = mqtt.createClient();

client.subscribe('test0');
client.publish('test0', 'bin hier');
client.on('message', function (topic, message) {
  console.log(message);
});
client.end();
