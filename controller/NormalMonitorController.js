var merge = require('merge');

var temperature = require('../model/temperature.js');
var humidity = require('../model/humidity.js');
var gas = require('../model/gas.js');
var co = require('../model/co.js');
var timestamp = require('../timestamp.js');
var mqtt = require('../mqtt.js');

exports.index = function index(callback) {
    mqtt.publish('sensor_human_infrared_0', 'status');
    mqtt.publish('sensor_human_infrared_1', 'status');
    
    // FIXME: callback hell
    temperature.get5MinData(function (result) {
        var data = {data_temperature: handleResult('temperature', result)};
        humidity.get5MinData(function (result) {
            data = merge(data, {data_humidity: handleResult('humidity', result)});
            gas.get5MinData(function (result) {
                data = merge(data, {data_gas: handleResult('gas', result)});
                co.get5MinData(function (result) {
                    callback(merge(data, {data_co: handleResult('co', result)}));
                });
            });
        });
    });
};

function handleResult(title, result) {
    var data = [
        [{label: 'Times', type: 'date'}, title]
    ];

    if (result.length == 0) {
        data.push([timestamp.toChartDateString(new Date()), 0]);
    }

    for (var i in result) {
        data.push([
            timestamp.toChartDateString(result[i].saved),
            result[i].value
        ]);
    }

    return data;
}
