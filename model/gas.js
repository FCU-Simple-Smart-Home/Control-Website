var SensorBase = require('./SensorBase.js');

var table_name = 'gas';

exports.get5MinData = function (callback) {
    SensorBase.get5MinData(table_name, callback);
};

exports.saveGas = function (val) {
    SensorBase.save(table_name, val);
};
