// работа с сообщениями консультанта
module.exports = {
	
	// запрос списка сообщений
	get : arg => {
		
		arg = arg || {};
		
		// Log.view('Обращение к модели messages.get', 4);
		
		return new Promise((resolve, reject) => {
			
			var room = '',
				id = '',
				limit = '';
			
			if (arg.id) {
				id = `AND cm.id = ${arg.id}`;
				limit = `LIMIT 1`;
			}
			else if (arg.ids) {
				id = `AND cm.ids IN (${arg.ids})`;
			}
			else{

				if (arg.room) room = `AND cm.roomId = ${arg.room}`;
				if (arg.rooms) room = `AND cm.roomId IN(${arg.rooms})`;
				
			}
			
			var q = `
				SELECT cm.*
				FROM consult_messages cm
				WHERE cm.id > 0
					${id}
					${room}
				${limit}
			`;
			
			// // Log.data(q);
			
			Model
				.executeQuery(q)
				.then(result => {
					
					if (arg.id || arg.limit && arg.limit == 1) {
						resolve(result[0]);
					}
					resolve(result);
					
				})
				.catch(error => {
					console.log(error);
					reject(error);
				});

		});
	},

	// добавление визита
	add : arg => {
		
		// Log.view('Обращение к модели messages.add');
		
		return new Promise((resolve, reject) => {
		
			Model
			.checkRequired(arg, ['roomId', 'senderId', 'text'])
			.then(() => {
				
				if (typeof arg.senderType == 'undefined') arg.senderType = 0;	// если тип не указан - отправляем от посетителя
				
				var q = `
					INSERT
					INTO consult_messages
					SET
						roomId = ${arg.roomId},
						senderType = ${arg.senderType},
						senderId = ${arg.senderId},
						text = '${arg.text}'
				`;
				
				// // Log.data(q);
			
				return Model.executeQuery(q);
			})
			.then(result => {
				console.log('messages add result')
				// console.log(result)
				resolve(result);
			})
			.catch(error => {
				console.log(error)
				reject(error);
			});
			
		});
	},
	/* 
	// изменение подключения
	set : arg => {
		
		return new Promise((resolve, reject) => {
			
			console.log(arg);
		
			Model
				.checkRequired(arg, ['id'])
				.then(() => {
					
					var activated = '',
						closed = '';
						
					if (arg.activated) activated = `activated = CURRENT_TIMESTAMP(),`;
					if (arg.closed) closed = `closed = CURRENT_TIMESTAMP(),`;
					
					var q = `
						UPDATE views
						SET
							${activated}
							${closed}
							updated = CURRENT_TIMESTAMP()
						WHERE id = ${arg.id}
					`;
					
					// console.log(q);
					
					Model
						.executeQuery(q)
						.then(result => {
							resolve(result);
						})
						.catch(error => {
							reject(error);
						});
					
				});
		
			
			
		});
		
	},*/
	
}