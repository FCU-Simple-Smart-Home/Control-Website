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
        
        client.subscribe("led_0");
        client.subscribe("led_1");
        client.subscribe("led_2");
        client.subscribe("plug_0");
        client.subscribe("plug_1");

        client.subscribe("sensor_human_infrared_0");
        client.subscribe("sensor_human_infrared_1");

        client.subscribe("fire_detect");
        client.subscribe("window_detect");

        client.subscribe("door");

        client.subscribe("clients_status");
    });

    client.on('message', function (topic, message, packet) {
        var msg = message.toString();
        //console.log(topic, msg);

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
        else if (
            topic == 'led_0' || 
            topic == 'led_1' || 
            topic == 'led_2' || 
            topic == 'plug_0' || 
            topic == 'plug_1' ||
            topic == 'door') {
            
            // 發送訊息到客戶端更新
            if (msg == "status_on" || msg == "status_off") {
                socket.updateApplianceStatus('appliance-control', topic, msg);
            }
        }
        else if (
            topic == 'sensor_human_infrared_0' ||
            topic == 'sensor_human_infrared_1' ||
            topic == 'fire_detect' ||
            topic == 'window_detect' ) {
            
            // 發送訊息到客戶端更新
            if (msg == "enable" || msg == "disable") {
                socket.updateSensorStatus('normal-monitor', topic, msg);
            }
        }
        else if (topic == 'clients_status') {
            socket.updateClientStatus(msg);
        }
    });
};

exports.publish = function (topic, message) {
    client.publish(topic, message);
};
