module.exports = {

	// объект подключения, который обрабатывает запросы
	db: null,

	// выполнение запроса с возвратом промиса, для последующего выстраивания цепочки
	executeQuery: str => {

		// // Log.view('Обращение к функции запроса ' + 'Model.executeQuery'.grey, 5);

		return new Promise((resolve, reject) => {
			Model
				.db.query(str, (err, rows) => {
					if(err){
						console.log(err);
						reject(err);
					}
					else{
						if(rows.length > 0){
							resolve(rows);
							return;
						}
						else if(rows.insertId){
							resolve(rows.insertId);
						}
						resolve(rows);
					}
				});
		});
	},

	// функция проверки наличия обязательных параметров
	checkRequired:(arg, required) => {

		return new Promise((resolve, reject) => {
			required.forEach(param => {
				if(!arg[param]){
					console.log('Отсутствует параметр ' + param);
					reject(new Error('Missing argument ' + param));
				}
			});

			resolve();

		});

	},

	// собственно модели
	config : require('./models/config.js'),
	positions : require('./models/positions.js'),
	photos : require('./models/photos.js'),
	reviews : require('./models/reviews.js'),
	visitors : require('./models/visitors.js'),
	visits : require('./models/visits.js'),
	views : require('./models/views.js'),
	rooms : require('./models/rooms.js'),
	messages : require('./models/messages.js'),
	routes : require('./models/routes.js'),
	users : require('./models/users.js'),
	slides : require('./models/slides.js'),
	social : require('./models/social.js'),

};
