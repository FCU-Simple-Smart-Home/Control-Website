var SensorBase = require('./SensorBase.js');

var table_name = 'co';

exports.get5MinData = function (callback) {
    SensorBase.get5MinData(table_name, callback);
};

exports.saveCO = function (val, callback) {
    SensorBase.save(table_name, val, callback);
};
