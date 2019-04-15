
module.exports = {
	get : (req, res, next, data) => {


		// Log.view('Обработка GET-запроса контроллером ' + 'index'.grey)

		data.title = 'Главная';

		// Log.view('Запрос слайдов карусели')
		// res.send('prokat-k2.ru');

		Model
			.slides.get({slider : 1, 'public' : !data.admin ? 1 : null})	// запрос слайдов
			.then(slides => {

				data.slides = slides;

				// Log.view('Рендеринг вида ' + 'index'.grey);

				res.render('index', data);

			})
			.catch(error => {
				console.log(error);
			});

	},

	post : (req, res, next, data) => {

		// Log.view('Обработка POST-запроса контроллером ' + 'index'.grey);

		switch (data.ctrl) {

			default :
				res.sendStatus(404);
			break;

		}

	}
};
