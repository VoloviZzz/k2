// контроллер маршрута "Страница не найдена"

module.exports = {
	
	// обработка GET-запроса
	get:(req, res, next, data) => {
		
		// Log.view('Обработка GET-запроса контроллером ' + 'not_found'.grey);
		
		data.title = 'Страница не существет';
		
		// Log.view('Рендеринг вида ' + 'not_found'.grey);
		
		res.render('not_found', data);
		
		// Log.view('---> ---> --->'.green + ' Обработка запроса завершена');
		Log.delim();
		
	},
	
	// обработка POST-запроса
	post:(req, res, next, data) => {

		// Log.view('Обработка POST-запроса контроллером ' + 'not_found'.grey);
		
		switch(data.ctrl){
			
			case 'save_about':
				Model
					.checkRequired(data, ['text'])
					.then(() => {
						return Model.config.setConfigAbout({about:data.text});
					})
					.then(() => {
						return Model.config.getConfig();
					})
					.then((result) => {
						Config = result;
						res.send('complete');
					});
			break;
			
			default:
				res.sendStatus(404);
			break;
			
		}
		
	},
	
	// обработка WebSocket-запроса
	ws : (ws, data) => {
		
		// Log.view('Обработка WebSocket-запроса контроллером ' + 'not_found'.grey);
		
	}
	
};