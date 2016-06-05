var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function (db, callback) {
    db.createTable('temperature', {
        id: {type: 'int', primaryKey: true, autoIncrement: true},
        value: 'int',
        saved: {type: 'timestamp', unique: true}
    }, callback);
};

exports.down = function (db, callback) {
    db.dropTable('temperature', callback);
};
