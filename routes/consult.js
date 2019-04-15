module.exports = {
	
	// обработка GET-запроса
	get:(req, res, next, data) => {
		
		// Log.view('Обработка GET-запроса контроллером ' + 'consult'.grey);
		
		if (!data.admin) next(new Error(404));
		
		// data.title = 'Консультирование посетителей';
		data.visits = Visits;
		data.views = Views;
		
		var rooms = [];
		for (var i in Rooms) {
			rooms.push(i);
		}
		
		// Log.view('Запрос списка сообщений активных комнат');
		
		Model
			.messages.get({rooms : rooms.join(',')})
			.then(messages => {
				
				data.messages = messages;
				
				// Log.view('Рендеринг вида ' + 'consult'.grey);
				
				console.log(data);
				
				res.render('consult', data);
				
				// Log.view('---> ---> --->'.green + ' Обработка запроса завершена');
				Log.delim();
				
			});
		
	},
	
	// обработка POST-запроса
	post : (req, res, next, data) => {
		
		// Log.view('Обработка POST-запроса контроллером ' + 'consult'.grey);
		
		switch (data.ctrl) {
			
			case 'newMessage' :
				
				// Log.view('Обработка входящего сообщения консультанта');
				Model
					.checkRequired(data, ['text', 'roomId'])
					.then(() => {
						
						// Log.view('Запись сообщения в базу данных');
						
						return Model
							.messages.add({
								roomId : data.roomId,
								senderType : 1,
								senderId : req.session.userId,
								text : data.text
							});
							
					})
					.then(messageId => {
						
						// Log.view('Добавлено сообщение с идентификатором ' + ('#' + messageId).grey);
						// Log.view('Запрос добавленного сообщения');
						
						return Model.messages.get({id : messageId});
						
					})
					.then(message => {
						
						data.message = message;
						
						// Log.view('Рассылка сообщения по видам получателя');
						
						// console.log(Wss);
						
						Wss.clients.forEach(client => {
							
							if (client.roomId == message.roomId) {

								client.send(JSON.stringify({
									action : 'newMessage',
									message : message
								}));
							
							}
							
						});
						
						return message;
						
					})
					.then(message => {
						
						// Log.view('Отправка ответа об успешном добавлении сообщения на клиент');
						
						data.message = message;
						res.send(JSON.stringify({status : 'ok', message : message}));
								
					
					})
					.catch(error => {
						
						res.send(JSON.stringify({status : 'bad', err : error.toString()}));
						
					});
				
			break;
			default :
				res.sendStatus(404);
			break;
			
		}
		
	},

	// обработка WebSocket-запроса
	ws : (ws, data) => {
		
		// Log.view('Обработка WebSocket-запроса контроллером ' + 'consult'.grey);
		
		
	}
};