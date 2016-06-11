
var express = require('express');
var merge = require('merge');
var normalMonitorController = require('../controller/NormalMonitorController.js');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'FCU Simple Smart Home'});
});

router.get('/normal-monitor', function (req, res, next) {
    normalMonitorController.index(function (data) {
        res.render('normal-monitor', merge({
            title: '一般偵測 - FCU Simple Smart Home',
        }, data));
    })
});

router.get('/appliance-control', function (req, res, next) {
    res.render('appliance-control', {title: '家電控制 - FCU Simple Smart Home'});
});

module.exports = router;
