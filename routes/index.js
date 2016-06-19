var express = require('express');
var merge = require('merge');
var normalMonitorController = require('../controller/NormalMonitorController.js');
var applianceControlController = require('../controller/ApplianceControlController.js');
var mqtt = require('../mqtt.js');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'FCU Simple Smart Home'});
});

router.get('/normal-monitor', function (req, res, next) {
    normalMonitorController.index(function (data) {
        res.render('normal-monitor', merge({
            title: '一般偵測 - FCU Simple Smart Home'
        }, data));
    })
});

router.get('/appliance-control', function (req, res, next) {
    applianceControlController.index(function () {
        res.render('appliance-control', {title: '家電控制 - FCU Simple Smart Home'});
    });
});

router.post('/appliance-control', function (req, res) {
    // console.log(req.body.msg);

    mqtt.publish('set_marquee_message', req.body.msg);

    res.json({success:1});
});

router.get('/clients-status', function (req, res, next) {
    res.render('clients-status', {
        title: '裝置狀態 - FCU Simple Smart Home'
    });
})

module.exports = router;
