var SensorBase = require('./SensorBase.js');

var table_name = 'temperature';

exports.get5MinData = function (callback) {
    SensorBase.get5MinData(table_name, callback);
};

exports.saveTemperature = function (val, callback) {
    SensorBase.save(table_name, val, callback);
};
