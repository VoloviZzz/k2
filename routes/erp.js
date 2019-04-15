module.exports = {
	get:(req, res, next, data) => {

		// Log.view('Обработка GET-запроса контроллером ' + 'about'.grey);

		data.title = 'О компании';

		// Log.view('Рендеринг вида ' + 'about'.grey);

		res.render('erp', data);

		// Log.view('---> ---> --->'.green + ' Обработка запроса завершена');
		Log.delim();

	},
	post:(req, res, next, data) => {

		// Log.view('Обработка POST-запроса контроллером ' + 'about'.grey);

		switch(data.ctrl){

			case 'save_about':

				// Log.view('Сохранение контента страницы информации о компании');

				Model
					.checkRequired(data, ['text'])
					.then(() => {

						return Model.config.setConfigAbout({about:data.text});

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
				res.sendStatus(404);
			break;

		}

	}

};
