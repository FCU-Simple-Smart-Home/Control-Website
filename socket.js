var mqtt = require('./mqtt.js');

var io = undefined;

exports.init = function (server) {
    io = require('socket.io')(server);

    io.on('connection', function (socket) {
        console.log('使用者連入');
        socket.on('add-channel', function (channel) {
            socket.join(channel);

            if (channel == 'normal-monitor') {
                mqtt.publish('sensor_human_infrared_0', 'status');
                mqtt.publish('sensor_human_infrared_1', 'status');

                mqtt.publish('fire_detect', 'status');
                mqtt.publish('window_detect', 'status');
            }
            else if (channel == 'appliance-control') {
                mqtt.publish('led_0', 'status');
                mqtt.publish('led_1', 'status');
                mqtt.publish('led_2', 'status');

                mqtt.publish('plug_0', 'status');
                mqtt.publish('plug_1', 'status');

                mqtt.publish('door', 'status');

                socket.on('set-appliance', function (data) {
                    console.log(data);
                    mqtt.publish(data.name, data.value ? "on" : "off");
                });

                socket.on('fan_ir_command', function (data) {
                    mqtt.publish('fan_ir_command', data);
                });
            }
            else if (channel == 'clients-status') {
                mqtt.publish('clients_status', 'status');
            }
        });
    });
};

exports.updateNormalMonitorChart = function (data) {
    io.to('normal-monitor').emit('update-chart', data);
};

exports.updateApplianceStatus = function (page, name, status) {
    io.to(page).emit('update-appliance', {name: name, status: status});
};

exports.updateSensorStatus = function (page, name, status) {
    io.to(page).emit('update-sensor', {name: name, status: status});
};

exports.updateClientStatus = function (name) {
    io.to('clients-status').emit('update-client', {name: name});
};
