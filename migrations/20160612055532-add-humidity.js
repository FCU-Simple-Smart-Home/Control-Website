var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function (db, callback) {
  db.createTable('humidity', {
    id: {type: 'int', primaryKey: true, autoIncrement: true},
    value: {type: 'int', notNull:true},
    saved: {type: 'timestamp', notNull:true, unique: true}
  }, callback);
};

exports.down = function (db, callback) {
  db.dropTable('humidity', callback);
};
