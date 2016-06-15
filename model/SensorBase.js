var mysql = require('../mysql.js');

var moment = require('moment');

exports.get5MinData = function (table_name, callback) {
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

exports.save = function (table_name, val, callback) {
    if (!Number.isInteger(val)) {
        console.log("val is not a number");
        return;
    }

    var saved = mysql.getNowSqlTimestamp();
    mysql.pool.query('INSERT INTO ' + table_name + ' SET ?', {value: val, saved: saved}, function (err, result) {
        if (err) console.log(err);
        
        if (callback !== undefined) {
            callback(val, saved);
        }
    });
};
