var mysql = require('./mysql.js');
var moment = require('moment');
var mqtt = require('mqtt');
var client = undefined;

exports.initMqttClient =
    function initMqttClient(host) {
        client = mqtt.connect('mqtt://' + host);

        client.on('connect', function () {
            console.log('MQTT connect success.');
            // subscribe
            client.subscribe("sensor_temperature");
        });

        client.on('message', function(topic, message, packet) {
            var msg = message.toString();
            console.log(topic, msg);

            if (topic == 'sensor_temperature') {
                mysql.pool.query('INSERT INTO temperature SET ?', {value: msg, saved: moment().format('YYYY-MM-DD HH:mm:ss')}, function(err, result) {
                    if (err) throw err;

                    console.log(result.insertId);
                });
            }
        });

    };
