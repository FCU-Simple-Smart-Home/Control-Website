var config = require('config');
var moment = require('moment');
var mysql = require('mysql');
var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : config.mysql.host,
    user            : config.mysql.user,
    password        : config.mysql.password,
    database        : config.mysql.database,
    dateStrings     : true
});

pool.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) throw err;

    console.log('The solution is: ', rows[0].solution);
});

function getSqlTimestamp(datatime) {
    return datatime.format('YYYY-MM-DD HH:mm:ss');
}

exports.pool = pool;

exports.getSqlTimestamp = getSqlTimestamp;

exports.getNowSqlTimestamp = function getNowSqlTimestamp() {
    return getSqlTimestamp(moment());
};