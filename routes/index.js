var mysql = require('../mysql.js');
var moment = require('moment');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'FCU Simple Smart Home'});
});

router.get('/normal-monitor', function (req, res, next) {
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

        res.render('normal-monitor', {
            title: '一般偵測 - FCU Simple Smart Home',
            data_temperature: data_temperature
        });
    });


});

router.get('/appliance-control', function (req, res, next) {
    res.render('appliance-control', {title: '家電控制 - FCU Simple Smart Home'});
});

module.exports = router;
