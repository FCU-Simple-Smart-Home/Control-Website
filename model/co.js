var SensorBase = require('./SensorBase.js');

var table_name = 'co';

exports.get5MinData = function (callback) {
    SensorBase.get5MinData(table_name, callback);
};

exports.saveHumidity = function (val) {
    SensorBase.save(table_name, val);
};
