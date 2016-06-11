var temperature = require('../model/temperature.js');

exports.index = function index(callback) {
    var data_temperature = [
        ['Time', 'Sales']
    ];

    temperature.get5MinData(function (result) {
        for (var i in result) {
            data_temperature.push([
                result[i].saved,
                result[i].value
            ]);
        }

        callback({data_temperature: data_temperature});
    });
};