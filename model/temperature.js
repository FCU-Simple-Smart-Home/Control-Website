var mysql = require('../mysql.js');

var moment = require('moment');

var table_name = 'temperature';

exports.get5MinData = function (callback) {
    // 取得 5 min 內的溫度
    var now = moment();
    mysql.pool.query('SELECT * FROM ' + table_name + ' WHERE saved >= ? AND saved <= ?',
        [mysql.getSqlTimestamp(moment(now).subtract(5, 'minutes')), mysql.getSqlTimestamp(now)],
        function (err, result) {
            if (err) console.log(err);
        
            callback(result);
        }
    );
};

exports.saveTemperature = function (val) {
    if (!Number.isInteger(val)) {
        console.log("val is not a number");
        return false;
    }

    mysql.pool.query('INSERT INTO temperature SET ?', {value: val, saved: mysql.getNowSqlTimestamp()}, function (err, result) {
        if (err) {
            console.log(err);
        }
    });

    return true;
}
