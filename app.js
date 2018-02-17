console.log('Запуск сервера')
Log = require('./log.js');

//подключение модулей
var
	express = require('express'),
	path = require('path'),
	favicon = require('serve-favicon'),
	colors = require('colors'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	cookieSession = require('cookie-session'),
	bodyParser = require('body-parser'),
	async = require('async'),
	config = require('./config.js'),
	db = require('./connect.js');

Log.view('Сборка приложения');

Model = require('./model.js');
Model.db = db;

Helpers = require('./helpers.js');

Router = require('./router.js');
Routes = {};

Wss = require('./ws.js');
	
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({
	name: 'auth-key-name-2000',
	keys: ['key1', 'key2'],
	cookie: {
		maxAge: 60 * 60 * 1000
	}
}));

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/public/vendors', express.static(path.join(__dirname, 'bower_components')));

Log.view('Запрос конфигурации системы');

Config = false;
Users = {};
Visitors = {};
Visits = {};
Views = {};
Rooms = {};

Log.view('Запрос параметров конфигурации');

Model
	.config.getConfig()
	.then(result => {
		
		Log.view('Параметры конфигурации получены');
		
		Config = result;
		
	})
	.then(() => {
		
		Log.view('Запрос списка пользователей');
		
		return Model.users.get();
		
	})
	.then(result => {
		
		Log.view('Список пользователей получен');
		
		result.forEach(u => {
			Users[u.id] = u;
		});
		
	})
	.then(() => {
		
		Log.view('Запрос списка маршрутов');
		
		return Model.routes.get();
		
	})
	.then(result => {
		
		Log.view('Список маршрутов получен');
		
		result.forEach(r => {
			
			if (r.aliasfor == null) r.ctrl = require('./routes/' + r.ctrl);
			
			Routes[r.name] = r;
			
		});
		
		// console.log(Routes)
		
	})
	.then(() => {	//обработка маршрута
		
		Log.view('Инициализация модуля маршрутизации');
		
		app.use((req, res, next) => {
		
			Log.view('<--- <--- <--- '.green + 'Получен HTTP-запрос');
		
			Router.http(req, res, next);
		
		});

		// catch 404 and forward to error handler
		app.use(function(req, res, next) {
			
			res.status(404);
			res.render('404', {admin:false, title:'Страница не существует', url:req.url});
			
		});

		// development error handler - will print stacktrace
		if(app.get('env') === 'development'){
			app.use(function(err, req, res, next) {
				res.status(err.status || 500);
				res.render('error', {
					title : 'Ошибка',
					admin:false,
					message: err.message,
					error: err,
					viewId:1,
					consultMessages : [],
					userId : false
				});
			});
		}

		// production error handler - no stacktraces leaked to user
		app.use(function(err, req, res, next){
			console.log(err.toString());
			res.status(err.status || 500);
			res.render('error', {
				admin:false,
				title:'Ошибка',
				message:err.message,
				error:{}
			});
		});

		app.listen(config.HTTPPort, () => {
			Log.view('Запущено прослушивание порта ' + ('#' +config.HTTPPort).grey);
			console.log('Сервер успешно запущен');
		});
	})
	.catch(error => {
		Log.warn(error.toString());
		// console.log(error);
	});