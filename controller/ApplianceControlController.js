var mqtt = require('../mqtt.js');

exports.index = function (callback) {
    updateAllStatus();
    callback();
};

function updateAllStatus() {
    mqtt.publish('led_0', 'status');
    mqtt.publish('led_1', 'status');
    mqtt.publish('led_2', 'status');

    mqtt.publish('plug_0', 'status');
    mqtt.publish('plug_1', 'status');
}
