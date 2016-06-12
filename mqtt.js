var temperature = require('./model/temperature.js');
var humidity = require('./model/humidity.js');
var gas = require('./model/gas.js');
var co = require('./model/co.js');

var mqtt = require('mqtt');
var client = undefined;

exports.initMqttClient = function (host) {
    client = mqtt.connect('mqtt://' + host);

    client.on('connect', function () {
        console.log('MQTT connect success.');
        // subscribe
        client.subscribe("sensor_temperature");
        client.subscribe("sensor_humidity");
        client.subscribe("sensor_gas");
        client.subscribe("sensor_co");
    });

    client.on('message', function (topic, message, packet) {
        var msg = message.toString();
        console.log(topic, msg);

        if (topic == 'sensor_temperature') {
            temperature.saveTemperature(parseInt(msg));
        }
        else if (topic == 'sensor_humidity') {
            humidity.saveHumidity(parseInt(msg));
        }
        else if (topic == 'sensor_gas') {
            gas.saveGas(parseInt(msg));
        }
        else if (topic == 'sensor_co') {
            co.saveCO(parseInt(msg));
        }
    });
};
