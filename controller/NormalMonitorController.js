var merge = require('merge');

var temperature = require('../model/temperature.js');
var humidity = require('../model/humidity.js');
var gas = require('../model/gas.js');
var co = require('../model/co.js');

exports.index = function index(callback) {
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
        ['Time', title]
    ];

    if (result.length == 0) {
        data.push(['', 0]);
    }

    for (var i in result) {
        data.push([
            result[i].saved,
            result[i].value
        ]);
    }

    return data;
}
