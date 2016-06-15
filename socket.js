var mqtt = require('./mqtt.js');

var io = require('socket.io')(3001);

io.on('connection', function (socket) {
    console.log('使用者連入');
    socket.on('add-channel', function (channel) {
        socket.join(channel);
        
        if (channel == 'appliance-control') {
            socket.on('set-appliance', function (data) {
                console.log(data);
                mqtt.publish(data.name, data.value ? "on" : "off");
            });
        }
    });
});

exports.updateNormalMonitorChart = function (data) {
    io.to('normal-monitor').emit('update-chart', data);
};

exports.updateApplianceStatus = function (page, name, status) {
    io.to(page).emit('update-appliance', {name: name, status: status});
};
