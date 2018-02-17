var db = require('mysql'),
	config = require('./config.js'),
	Log = require('./log.js');

Log.view('Выполняется попытка подключения к MySQL');
var db = db.createConnection(config.db);

db.connect(function(err){
	if (err) {
		Log.warn('Ошибка подключения к MySQL: ' + err.stack);
		return;
	}
 
	Log.view('Установлено подключение к MySQL с идентификатором ' + ('#' + db.threadId).grey);
});

module.exports = db;