var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'FCU Simple Smart Home'});
});

router.get('/normal-monitor', function (req, res, next) {
    res.render('normal-monitor', {title: '一般偵測 - FCU Simple Smart Home'});
});

router.get('/appliance-control', function (req, res, next) {
    res.render('appliance-control', {title: '家電控制 - FCU Simple Smart Home'});
});

module.exports = router;
