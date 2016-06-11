var mysql = require('../mysql.js');
var moment = require('moment');

exports.index = function index(callback) {
    var data_temperature = [
        ['Time', 'Sales']
    ];

    // 取得 5 min 內的溫度
    var now = moment();
    mysql.pool.query('SELECT * FROM temperature WHERE saved >= ? AND saved <= ?', [mysql.getSqlTimestamp(moment(now).subtract(5, 'minutes')), mysql.getSqlTimestamp(now)], function (err, result) {
        if (err) console.log(err);

        console.log(result);
        for (var i in result) {
            data_temperature.push([
                result[i].saved,
                result[i].value
            ]);
        }

        callback({data_temperature: data_temperature});
    });
};