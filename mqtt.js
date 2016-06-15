var temperature = require('./model/temperature.js');
var humidity = require('./model/humidity.js');
var gas = require('./model/gas.js');
var co = require('./model/co.js');
var socket = require('./socket.js');

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
            temperature.saveTemperature(parseInt(msg), function (val, saved) {
                socket.updateNormalMonitorChart({chart: 'chart_temperature', val: val, saved: saved})
            });
        }
        else if (topic == 'sensor_humidity') {
            humidity.saveHumidity(parseInt(msg), function (val, saved) {
                socket.updateNormalMonitorChart({chart: 'chart_humidity', val: val, saved: saved})
            });
        }
        else if (topic == 'sensor_gas') {
            gas.saveGas(parseInt(msg), function (val, saved) {
                socket.updateNormalMonitorChart({chart: 'chart_gas', val: val, saved: saved})
            });
        }
        else if (topic == 'sensor_co') {
            co.saveCO(parseInt(msg), function (val, saved) {
                socket.updateNormalMonitorChart({chart: 'chart_co', val: val, saved: saved})
            });
        }
    });
};
