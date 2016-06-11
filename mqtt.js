var mysql = require('./mysql.js');

var mqtt = require('mqtt');
var client = undefined;

function saveTemperature(val) {
    if (!Number.isInteger(val)) {
        console.log("val is not a number");
        return false;
    }

    mysql.pool.query('INSERT INTO temperature SET ?', {value: val, saved: mysql.getNowSqlTimestamp()}, function (err, result) {
        if (err) {
            console.log(err);
        }
    });

    return true;
}

exports.initMqttClient =
    function initMqttClient(host) {
        client = mqtt.connect('mqtt://' + host);

        client.on('connect', function () {
            console.log('MQTT connect success.');
            // subscribe
            client.subscribe("sensor_temperature");
        });

        client.on('message', function (topic, message, packet) {
            var msg = message.toString();
            console.log(topic, msg);

            if (topic == 'sensor_temperature') {
                saveTemperature(parseInt(msg));
            }
        });

    };
