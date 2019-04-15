/*
	маршрутизатор приложения
 */
var fs = require("fs"),
    multiparty = require('multiparty');

// очистка массива от пустых элементов
Array.prototype.clear = function(){
	this.forEach((v, i) => {
		if(v == "") {
			this.splice(i, 1);
		}
	});
	return this;
}

module.exports = {

	http : (req, res, next) => {

		// Log.view('Старт обработки маршрута ' + req.path.grey);

		var data = {
			admin : false,
			path : req.path,
			userId : false,
			consultState : req.cookies.consultState == 'show' ? true : false,
			consultMessages : false,
		};

		// req.session.userId = 1;

		req.path_arr = data.path.split('/').clear();	// парсинг маршрута

		data.userId = typeof req.session.userId !== 'undefined' ? req.session.userId : false;

		// Log.view('Проверка включения режима администратора');

		for (var i in req.path_arr) {
			if (req.path_arr[i] == 'admin') {

				// Log.view('Режим администратора ' + 'включен'.green);

				// удаление записи admin из маршрута если идет обращение не на контроллер admin
				if (req.path.replace('/', '') !== 'admin') {
					req.path_arr.splice(i, 1);
				}
				else{
					if (req.method == 'GET') req.path_arr.splice(i, 1);
				}
				data.path = '/' + req.path_arr.join('/');
				data.admin = true;
				break;

			}
		}

		// Log.view('Проверка наличия метки пользователя');

		if (typeof req.session.userId !== 'undefined') {

				// Log.view('Обнаружена метка пользователя ' + ('#' + req.session.userId).grey);

				data.userId = req.session.userId;
				data.userName = Users[data.userId].name;

		}

		// Log.view('Проверка настроек режима администрирования');

		if (!data.admin) {
			// Log.view('Режим администратора ' + 'выключен'.grey);
		}
		else{
			if (typeof req.session.userId == 'undefined') {

				Log.warn('Попытка входа в режим администратора без предварительной авторизации /' + path.grey);
				// Log.view('Замена маршрута на not_found');

				data.path = '/not_found';
				req.path_arr = ['not_found'];

			}
		}

		if(data.path == '/'){	// если маршрут ведет в корень
			var route = 'main'	// устанавливаем маршрут, определяющий корневую страницу
			// Log.view('Запрос основного маршрута /' + route.grey);
		}
		else{	// если маршрут не ведет в корень

			var route = req.path_arr[0];	// маршрутом является первая часть строки маршрута
			// Log.view('Запрос неосновного маршрута /' + route.grey);

			// Log.view('Проверка существования неосновного маршрута /' + route.grey);

			if(typeof Routes[route] !== 'undefined'){	// если роутере маршрут присутствует

				// Log.view('Маршрут /' + route.grey + ' найден');

				// проверка, что маршрут не является алиасом
				if (Routes[route].aliasfor == null){

					// Log.view('Маршрут не является алиасом');
					// Log.view('Проверка возможности прямого обращения к маршруту');

					if (Routes[route].direct == 0) {

						Log.warn('Прямое обращение к маршруту запрещено');
						// Log.view('Замена маршрута на not_found');

						route = 'not_found';
						data.path = 'not_found';
						req.path_arr = ['not_found'];

					}
					else {
						// Log.view('Прямое обращение к маршруту разрешено');
					}

				}
				else {

					// Log.view('Маршрут является алиасом для маршрута с идентификатором ' + ('#' + Routes[route].aliasfor).grey);
					// Log.view('Поиск целевого маршрута для алиаса');

					// сохранение тайтла и значения консультанта установленных в алиасе
					if (typeof Routes[route].title !== 'undefined') data.title = Routes[route].title;
					if (typeof Routes[route].consult !== 'undefined') data.consult = Routes[route].consult == 1 ? true : false;

					// console.log(data)

					var findAlias = false;

					if (typeof Routes[route].aliasfor == 'number'){

						// Log.view('Тип алиаса - цифровой');

						for (var i in Routes) {
							if (Routes[route].aliasfor == Routes[i].id) {

								// Log.view('Целевым маршрутом для алиаса является маршрут ' + Routes[i].name.grey);

								route = Routes[i].name;
								findAlias = true;
								break;
							}
						}

					}
					else{

						// Log.view('Тип алиаса - символьный');

						if (typeof Routes[Routes[route].aliasfor] !== 'undefined') {

							route = Routes[Routes[route].aliasfor].name;

							findAlias = true;
						}

					}

					if (!findAlias) {

						Log.warn('Целевой маршрут для алиаса не найден');
						// Log.view('Замена маршрута на not_found');

						route = 'not_found';
						data.path = 'not_found';
						req.path_arr = ['not_found'];

					}

				}

			}
			else {

				Log.warn('Задан несуществующий маршрут /' + route.grey);
				// Log.view('Замена маршрута на not_found');

				route = 'not_found';
				data.path = 'not_found';
				req.path_arr = ['not_found'];

			}

		}

		data.route = route;
		// console.log(data);

		// проверка для непубличного маршрута на наличие метки пользователя
		if (Routes[route].public == 0 && (!data.userId || typeof data.userId == 'undefined')) {

			Log.warn('Запрос непубличного маршрута посетителем');
			// Log.view('Замена маршрута на not_found');

			route = 'not_found';
			data.path = 'not_found';
			req.path_arr = ['not_found'];

		}

		// проверка доступности маршрута вне режима администрирования
		if (Routes[route].admin == 1 && !data.admin){

			Log.warn('Запрос административного маршрута вне режима администратора');
			// Log.view('Замена маршрута на not_found');

			route = 'not_found';
			data.path = 'not_found';
			req.path_arr = ['not_found'];

		}

		// проверка метода запроса
		// Log.view('Определение метода запроса');

		if(req.method == 'GET'){	// GET-запрос

			// Log.view('Запрос выполняется методом GET');

			new Promise((resolve, reject) => {resolve(1);}) // пустой промис, который выполнится сразу и нужен только для запуска цепочки
				.then(() => {	// проверка наличия установленной метки идентификации посетителя

					// Log.view('Проверка наличия метки посетителя');

					if (typeof req.session.id == 'undefined') {	// если посетитель не был идентифицирован

						// проверка существования метки в кукис и запрос из базы при существовании

						// Log.view('Метка посетителя отсутствует, создание посетителя');

						return Model
							.visitors.add()	// создаем нового посетителя
							.then(visitorId => {	// получаем его иденификатор

								data.visitorId = visitorId;
								if (!Visitors[visitorId]) Visitors[visitorId] = visitorId;

								// Log.view('Создан посетитель с идентификатором = ' + ('#' + visitorId).grey);

								req.session.id = visitorId;	// записываем идентификатор посетителя в сессию

							})
							.catch(error => {
								Log.warn(error.toString());
							});

					}

					// Log.view('Идентифицирован посетитель ' + ('#' + req.session.id).grey);

					data.visitorId = req.session.id;

					if (typeof Visitors[data.visitorId] == 'undefined') Visitors[data.visitorId] = data.visitorId;

					return true;

				})
				.then(() => {	// проверка наличия визита и создание при его отсутствии

					// Log.view('Проверка наличия открытого визита')

					if (typeof req.session.visitId == 'undefined') {

						// Log.view('Метка визита отсутствует. Регистрация нового визита');


						return Model
							.visits.add({visitorId : req.session.id})
							.then(visitId => {

								// Log.view('Создан визит с идентификатором ' + ('#' + visitId).grey)

								req.session.visitId = visitId;
								data.visitId = visitId;
								Visits[visitId] = {id : visitId};

							});

					}

					// Log.view('Идентифицирован визит ' + ('#' + req.session.visitId).grey);

					data.visitId = req.session.visitId;
					if (typeof Visits[data.visitId] == 'undefined') Visits[data.visitId] = {id : data.visitId};

					return true;

				})
				.then(() => {	// проверка наличия комнаты консультанта и создание при её отсутствии

					// Log.view('Проверка существования комнаты консультанта')

					if (typeof req.session.roomId !== 'undefined') {	// если установлен идентификатор комнаты

						// Log.view('Идентифицирована комната ' + ('#' + req.session.roomId).grey);

						Rooms[req.session.roomId] = {id : req.session.roomId, visitId : data.visitId};
						Visits[data.visitId].roomId = req.session.roomId;

						// Log.view('Запрос списка сообщений консультанта');

						return Model
							.messages.get({room : req.session.roomId})
							.then(messages => {

								// console.log(messages)

								data.consultMessages = messages;

							});


					}
					else {

						// Log.view('Метка комнаты отсутствует. Создание комнаты.');

						return Model
							.rooms.add({visitorId : req.session.id})
							.then(roomId => {

								// Log.view('Создана комната с идентификатором ' + ('#' + roomId).grey)
								req.session.roomId = roomId;

								data.roomId = roomId;
								data.consultMessages = [];

								Rooms[roomId] = {id : roomId, visitId : data.visitId};
								// console.log(Visits[data.visitId])
								Visits[data.visitId].roomId = roomId;
								// console.log(Visits[data.visitId])

								// Log.view('Рассылка информации о комнате в виды консультанта');

								// console.log(Wss)

								Wss.clients.forEach(client => {

									// console.log('client route = ' + route)

									if (client.route == 'consult') {

										client.send(JSON.stringify({
											action : 'newRoom',
											room : {
												id : data.visitId,
												roomId : roomId
											}
										}));

										// Log.view('Соообщение о новой комнате отправлено в вид ' + ('#' + client.viewId).grey);

									}

								});

							});

					}


				})
				.then(() => {	// создание просмотра

					// Log.view('Регистрация нового просмотра');

					return Model
						.views.add({visitId : req.session.visitId, visitorId : req.session.id})
						.then(viewId => {

							// Log.view('Создан просмотр с идентификатором ' + ('#' + viewId).grey)
							// Log.view('Запись просмотра в массив просмотров')

							// добавление просмотра в список просмотров в памяти
							Views[viewId] = {
								activate : false,
								route : route,
								title : Routes[route].title,
								path : req.path,
								id : viewId,
								visitId : req.session.visitId,
								visitorId : req.session.id,
								roomId : req.session.roomId,
								connection : false
							};

							// Log.view('Рассылка информации о просмотре по консультантам');

							// console.log(Views[viewId]);

							Wss.clients.forEach(client => {

								if (client.route == 'consult') {

									client.send(JSON.stringify({action : 'newConsultTab', tab : Views[viewId]}));

									// Log.view('В просмотр ' + ('#' + client.viewId).grey + ' отправлено сообщение об открытии вкладки ' + ('#' + viewId.grey));

								}

							});

							return viewId;

						})
						.catch(error => {
							Log.warn(Error.toString());
							res.send(Error.toString());
						});
				})
				.then((viewId) => {	// вызов контроллера маршрута

					// Log.view('Запуск GET-контроллера на маршруте ' + route.grey);

					data.viewId = viewId;
					// console.log(data)
					if (typeof data.title == 'undefined') data.title = Routes[route].title;
					if (typeof data.consult == 'undefined') data.consult = Routes[route].consult == 1 ? true : false;
					// console.log(data)
					Routes[route].ctrl.get(req, res, next, data);

				})
				.catch(error => {
					console.log(error)
				});

		}
		else{	// POST-запрос

			// Log.view('Запрос выполняется методом POST');
			// Log.view('Проверка наличия метки посетителя');

			if (typeof req.session.id !== 'undefined') {	// если посетитель идентифицирован

				// Log.view('Идентифицирован посетитель ' + ('#' + req.session.id).grey);

				// если маршруты не загрузочные - должен быть указан контроллер
				if (route !== 'position_upload' && route !== 'logo_upload' && route !== 'slide_upload' && route !== 'banner_upload'){

					// Log.view('Тип запроса - обычный. Проверка указания контроллера');

					var data = req.body;	// получение данных запроса

					if (typeof data.ctrl !== 'undefined') {	// контроллер указан

						// Log.view('Указан контроллер ' + data.ctrl.grey);
						// Log.view('Запуск POST-контроллера ' + data.ctrl.grey + ' на маршруте ' + route.grey);

						// data.route = route;
						// console.log(data);
						Routes[route].ctrl.post(req, res, next, data);

					}
					else {

						Log.warn('Не указан контроллер для POST-запроса');
						res.sendStatus(404);
						return;

					}

				}	// маршруты загрузки файлов
				else{

					// Log.view('Тип запроса - загрузка файла');
					// Log.view('Запуск контроллера загрузки файла');
					Routes[route].ctrl.post(req, res, next, data);

				}

			}
			else{	// метка посетителя отсутствует, необходима авторизация

				Log.warn('Метка посетителя отсутствует, необходима авторизация');
				res.sendStatus(401);

			}

		}

	},

	ws : (ws, data) => {	// обработка websocket-запроса

		// Log.view('Обращение к маршрутизатору WebSocket-запроса', 2);
		// Log.view('Парсинг входящего сообщения', 2);

		data = JSON.parse(data);	// парсинг сообщения

		// Log.view('Проверка указания маршрута', 2);

		if (typeof data.route == 'undefined') {	// проверка указания маршрута

			Log.warn('Не указан маршрут для запроса', 2);
			return;

		}

		// Log.view('Определен маршрут ' + data.route.grey, 2);
		// Log.view('Проверка существования маршрута ' + data.route.grey, 2);

		if (!Routes[data.route]) {	// маршрут указан, но отсутствует в списке маршрутов

			Log.warn('Неизвестный маршрут ' + data.route.grey, 2);
			return;

		}

		// Log.view('Маршрут ' + data.route.grey + ' найден в списке маршрутов', 2);
		// Log.view('Передача управления контроллеру маршрута ' + data.route.grey, 2);

		Routes[data.route].ctrl.ws(ws, data);	// отправляем данные на контроллер указанного маршрута

	},

	createAlias : (name, target) => {

		// Log.view('Создание алиаса с именем ' + name.grey + ' для маршрута ' + target.grey);

		if (typeof Routes[target] == 'undefined') {

			Log.warn('Не удается создать алиас для несуществующего маршрута ' + target.grey);

			return false;

		}

		if (typeof Routes[name] !== 'undefined') {

			Log.warn('Алиас с именем ' + name.grey + ' уже существует');

			return false;

		}

		Routes[name] = {aliasfor : target};

		// Log.view('Алиас ' + name.grey + ' успешно создан');

		return true;

	},

	deleteAlias : name => {

		// Log.view('Удаление алиаса ' + name.grey);

		if (typeof Routes[name] == 'undefined') {

			Log.warn('Алиас с именем ' + name.grey + ' не найден в списке маршрутов');

			return false;

		}

		delete(Routes[name]);

		// Log.view('Алиас с именем ' + name.grey + ' успешно удален');

		return true;

	}

};
