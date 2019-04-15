var request = require('request'),
	adminKeyWord = '4=X_2Cu8vg';

module.exports = {
	get:(req, res, next, data) => {

		res.sendStatus(404);
		
	},
	
	post : (req, res, next, data) => {
		
		// Log.view('Обработка POST-запроса контроллером ' + 'static'.grey);
		
		switch (data.ctrl) {
			
			case 'windowTemplate':
				
				// Log.view('Обработка запроса шаблона всплывающего окна');
				
				res.render('window');
				
			break;
			case 'callbackTemplate':
				
				// Log.view('Обработка запроса шаблона формы обратного звонка');
				
				res.render('callback');
				
			break;
			case 'callback':
				
				// Log.view('Обработка запроса заказа обратного звонка');
				
				Model
					.checkRequired(data, ['name', 'number'])
					.then(() => {
						return new Promise((resolve, reject) => {
							
							var str = data.name + ' (' + data.number + ') заказал обратный звонок';
							
							request.post(
								{
									url : 'https://smsc.ru/sys/send.php',
									form : {
										login : 'prokatk2',
										psw : 'qwer1234',
										sender : 'prokat-k2',
										phones : '79227102227',
										mes : str,
										charset : 'utf-8'
									}
								},
								(err, response, body) => {
									if (err) reject(err);
									resolve(body);
								}
							);
							
						});
					})
					.then(() => {
						res.send('complete');
					})
					.catch(error => {
						res.send(error.toString());
					});
				
			break;
			case 'newMessage':
			
				// Log.view('Обработка нового сообщения консультанта');

				Model
					.checkRequired(data, ['text'])
					.then(() => {
						
						if (data.text !== adminKeyWord) {

							return Model
								.messages.add({
									roomId : req.session.roomId,
									senderId : req.session.id,
									text : data.text
								});
							
						}
						else return adminKeyWord;
						
					})
					.then(messageId => {
						
						if (data.text == adminKeyWord) return adminKeyWord;
						
						return Model.messages.get({id : messageId});
						
					})
					.then(message => {
						
						if (message == adminKeyWord) return adminKeyWord;
						
						// Log.view('Отправка сообщения в виды консультантов');
						
						Wss.clients.forEach(client => {
							
							console.log('client view = ' + client.viewId);
							
							if (client.route == 'consult') {
								
								client.send(JSON.stringify({action : 'newConsultMessage', message : message}));
								
								// Log.view('Сообщение ' + message.text.grey + ' для комнаты ' + ('#' + message.roomId).grey + ' отправлено в просмотр ' + ('#' + client.viewId).grey);
								
							}
							
						});
						
						return message;
						
					
					})
					.then(message => {
						if (message !== adminKeyWord) {
							
							// Log.view('Отправка ответа об успешном добавлении сообщения');
							
							res.send(JSON.stringify({status : 'ok', message : message}));
							
						}
						else{
							
							// Log.view('Запрос формы авторизации');
							// Log.view('Создание алиаса для формы авторизации');
							
							var md5 = require('md5'),
								aliasName = md5(Math.random());
								
							// Log.data(aliasName);
							
							Router.createAlias(aliasName, 'login');
							
							setTimeout(() => {
								Router.deleteAlias(aliasName);
							}, 60000)
							
							Views[data.token].connection.send(JSON.stringify({action : 'open', url : '/' + aliasName}));
							
							res.send(JSON.stringify({status : 'ok', messageId:data.text}));
							
						}
						
					})
					.catch(error => {
						res.send(JSON.stringify({status : 'bad', 'err' : error.toString()}));
					});
			
			break;
			case 'logout':
				
				// Log.view('Обработка сигнала выхода из учетной записи');
				
				delete(req.session.userId);
				
				res.send('complete');
				
			break;
			case 'saveMainText' :
				
				// Log.view('Сохранение контента главной страницы');
			
				Model
					.checkRequired(data, ['text'])
					.then(() => {
						
						return Model.config.set({mainText:data.text});
						
					})
					.then(() => {
						
						// Log.view('Обновление массива конфигурации');
						
						return Model.config.getConfig();
					
					})
					.then((result) => {
						
						Config = result;
						
						// Log.view('Массив конфигурации успешно обновлен');
						
						res.send('complete');
						
						// Log.view('---> ---> --->'.green + ' Обработка запроса завершена');
						Log.delim();
						
					});
				
			break;
			default:
			
				// Log.view('Неизвестный контроллер ' + data.ctrl.grey);
				
				res.sendStatus(404);
				
			break;
			
		}
		
	},
	
	ws : (ws, data) => {
		
		var actions = {
			
			activate : (ws, data) => {
				
				// Log.view('Действие: ' + 'activate'.grey + '. Выполнение активации токена', 3);
				// Log.data(JSON.stringify(data), 3);
				
				Model
					.checkRequired(data, ['token'])	// проверяем наличие аргумента токен
					.then(() => {
						
						if (typeof Views[data.token] !== 'undefined') {	// пробуем идентифицировать токен
							
							// Log.view('Токен ' + ('#' + data.token).grey + ' успешно идентифицирован', 3);
							
							ws.viewId = data.token;	// присваиваем идентификатор токена объекту соединения
							ws.roomId = Views[data.token].roomId;
							ws.route = Views[data.token].route;
							
							// обновляем данные подключения в массиве подключений
							Views[data.token].connection = ws;
							Views[data.token].activate = true;
							
						}
						else{							
							Log.warn('Не удалось идентифицировать токен ' + ('#' + data.token).grey, 3);
							return;
						}
						
						return Model.views.set({id: data.token, activated : true});
						
					})
					.then(result => {
						// Log.view('Токен ' + ('#' + data.token).grey + ' успешно активирован', 3);
					})
					.catch(error => {
						Log.warn(error.toString());
					});
				
			},
			closeTab : (ws, data) => {
				
				// Log.view('Действие: ' + 'closeTab'.grey + '. Обработка сигнала закрытия вкладки', 3);
				
				var viewId = ws.viewId;
				
							
				if (Views[viewId]) {
					
					// Log.view('Рассылка сообщения о закрытии по консультантам');
					
					Wss.clients.forEach(client => {
					
						if (client.route == 'consult') {
							
							var tab = Views[viewId];
							tab.connection = false;
							
							client.send(JSON.stringify({action : 'closeTab', tab : tab}));
							
							// Log.view('В просмотр ' + ('#' + client.viewId).grey + ' отправлено сообщение о закрытии вкладки ' + ('#' + viewId.grey));
							
						}
						
					});
					
					Views[viewId] = null;
				
				}
				
				// Log.view('Закрыто соединение ' + ('#' + viewId).grey, 3);
				
			},
			test : (ws, data) => {
				
				// Log.view('Действие: ' + 'test'.grey + '. Обработка сигнала test', 3);
				
				ws.send(JSON.stringify({action : 'xx'}));
				
				// Log.view('test', 3);
			},
			
			newMessage : (ws, data) => {
				
				// Log.view('Действие: ' + 'newMessage'.grey + '. Новое сообщение консультанта', 3);
				
				console.log(data.text);
				console.log(ws.viewId);
				console.log(Views[ws.viewId].visitorId);
				
				// Model
					// .messages.add({
						// text
					// })
				
			},
			
			showConsult : (ws, data) => {
				
				// Log.view('Действие: ' + 'showConsult'.grey + '. Сигнал об открытии консультанта');
				// Log.view('Рассылка сигнала в остальные виды пользователя');
				
				Wss.clients.forEach(client => {
					
					// разослать в остальные виды пользователя
					if (client.roomId == Views[data.viewId].roomId && client.viewId !== data.viewId) {
						
						client.send(JSON.stringify({action : 'showConsult'}));
						
						// Log.view('Отправлено сообщение об открытии консультанта в вид ' + data.viewId.grey);
						
					}
					// разослать по консультантам
					else if (client.route == 'consult') {
						
						client.send(JSON.stringify({action : 'showConsult'}));
						
					}
					
				});
				
			},
			
			hideConsult : (ws, data) => {
				
				// Log.view('Действие: ' + 'hideConsult'.grey + '. Сигнал о закрытии консультанта');

				
				// Log.view('Рассылка сигнала в остальные виды пользователя');
				
				Wss.clients.forEach(client => {
					
					// разослать в остальные виды пользователя
					if (client.roomId == Views[data.viewId].roomId && client.viewId !== data.viewId) {
						
						client.send(JSON.stringify({action : 'hideConsult'}));
						
						// Log.view('Отправлено сообщение о закрытии консультанта в вид ' + data.viewId.grey);
						
					}
					// разослать по консультантам
					else if (client.route == 'consult') {
						
						client.send(JSON.stringify({action : 'hideConsult'}));
						
					}
					
				});
				
			}
			
		};
		
		// Log.view('Обработка Websocket-запроса контроллером ' + 'static'.grey, 3);
		// Log.data(JSON.stringify(data), 3);
		
		if (typeof actions[data.action] !== 'undefined') {
			actions[data.action](ws, data);
		}
		else{
			Log.warn('Неизвестное действие ' + data.action.grey);
		}
		
	}
};