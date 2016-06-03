var mqtt = require('mqtt');
var client = undefined;

exports.initMqttClient =
    function initMqttClient(host) {
        client = mqtt.connect('mqtt://' + host);

        client.on('connect', function () {
            console.log('MQTT connect success.');
        });

    };
