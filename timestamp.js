var moment = require('moment');
const util = require('util');

exports.toChartDateString = function (data_string) {
    var time = moment(data_string);
    return util.format('Date(%d, %d, %d, %d, %d, %d)', time.year(), time.month(), time.date(), time.hour(), time.minute(), time.second());
};