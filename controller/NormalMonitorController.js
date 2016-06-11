var temperature = require('../model/temperature.js');

exports.index = function index(callback) {
    var data_temperature = [
        ['Time', 'Sales']
    ];

    temperature.get5MinData(function (result) {
        if (result.length == 0) {
            data_temperature.push(['', 0]);
        }

        for (var i in result) {
            data_temperature.push([
                result[i].saved,
                result[i].value
            ]);
        }

        callback({data_temperature: data_temperature});
    });
};