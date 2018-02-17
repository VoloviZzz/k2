module.exports = {
	get:(req, res, next, data) => {
		
		Log.view('Обработка GET-запроса контроллером ' + 'login'.grey);
		
		data.title = 'Вход для сотрудников';
		
		Log.view('Рендеринг вида ' + 'login'.grey);
		
		res.render('login', data);
		
		Log.view('---> ---> --->'.green + ' Обработка запроса завершена');
		Log.delim();
		
	},
	
	post : (req, res, next, data) => {
		
		Log.view('Обработка POST-запроса контроллером ' + 'login'.grey);
		
		switch(data.ctrl){
			
			case 'login':
			
				Log.view('Выполнение авторизации пользователя');
				Log.view('Проверка наличия обязательных параметров');
				
				Model
					.checkRequired(data, ['login', 'pass'])
					.then(() => {
						
						Log.view('Все необходимые параметры присутствуют');
						Log.view('Запрос записи пользователя');
						
						return Model.users.get({login : data.login, pass : data.pass});
						
					})
					.then(result => {
						
						if (result) {
							
							Log.view('Пользователь найден. Установка метки');
							req.session.userId = result.id;
							
							Router.deleteAlias(req.path.replace('/', ''));
							
							res.send('complete');
						
						}
						else {							
							Log.view('Пользователь с указанными данными не найден');
							res.send('Пользователь с указанными данными не найден');
						}
						
					})
					.catch(error => {
						res.send(error.toString());
					});
				
			break;
			
			default:
				res.sendStatus(404);
			break;
			
		}
		
	},
	
	ws : (ws, data) => {

		Log.view('Обработка WebSocket-запроса контроллером ' + 'login'.grey);
		
	}
	
};