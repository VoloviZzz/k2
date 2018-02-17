// работа со слайдами слайдеров
module.exports = {
	
	// установка параметров маршрутов
	set : arg => {
		
		Log.view('Обращение к модели ' + 'routes.set'.grey);

		return new Promise((resolve, reject) => {
			
			reject(new Error('Модель ещё не готова'));
			
			Model
				.checkRequired(arg, ['id'])
				.then(() => {
					
					var title = '',
						subtitle = '',
						text = '',
						public = '',
						priority = '',
						img = '';
						
					if (arg.title) title = `title = '${arg.title}',`;
					if (arg.subtitle) subtitle = `subtitle = '${arg.subtitle}',`;
					if (arg.text) text = `text = '${arg.text}',`;
					if (typeof arg.public !== 'undefined') public = `public = ${arg.public},`;
					if (arg.priority) priority = `priority = ${arg.priority},`;
					if (arg.img) img = `img = '${arg.img}',`;
					
					var q = `
						UPDATE carousel_slides s
						SET
							${title}
							${subtitle}
							${text}
							${public}
							${priority}
							${img}
							updated = CURRENT_TIMESTAMP()
						WHERE id = ${arg.id}
						LIMIT 1
					`;
					
					Log.data(q);
					
					return Model.executeQuery(q);
				})
				.then(result => {
					console.log('slides set result');
					console.log(result)
					resolve(result);
				})
				.catch(error => {
					reject(error);
				});
					
		});
		
	},
	
	// выборка маршрутов
	get : arg => {

		Log.view('Обращение к модели ' + 'routes.get'.grey);
		
		arg = arg || {};
		
		return new Promise((resolve, reject) => {
			
			var id = '',
				limit = '';
			
			if (arg.id) {
				id = `AND s.id = ${arg.id}`;
				limit = `LIMIT 1`;
			}
			
			var q = `
				SELECT r.*
				FROM routes r
				WHERE r.id > 0
					${id}
				${limit}
			`;
			
			// Log.data(q);
			
			Model
				.executeQuery(q)
				.then(result => {
					
					if (result.length == 0) resolve(false);
					
					if (arg.id || arg.limit && arg.limit == 1) {
						resolve(result[0]);						
					}
					
					resolve(result);
				
				})
				.catch(error => {
					reject(error);
				});
			
		});
	},

	// добавление маршрута
	add : (arg) => {
		
		Log.view('Обращение к модели ' + 'routes.add'.grey);
		
		return new Promise((resolve, reject) => {
		
			reject(new Error('Модель ещё не готова'));

			Model
				.checkRequired(arg, ['creator', 'sliderId'])
				.then(() => {

					var q = `
						INSERT
						INTO carousel_slides
						SET
							sliderId = ${arg.sliderId},
							creator = ${arg.creator}
					`;
					
					// Log.data(q);
					
					return Model.executeQuery(q);
				})
				.then(result => {
					// console.log('visits add result')
					// console.log(result)
					resolve(result);
				})
				.catch(error => {
					reject(error);
				});
			
		});
	},
	
	// удаление маршрутов
	del : (arg) => {
		
		Log.view('Обращение к модели ' + 'routes.del'.grey);
		
		return new Promise((resolve, reject) => {

			reject(new Error('Модель ещё не готова'));
		
			Model
				.checkRequired(arg, ['id'])
				.then(() => {

					var q = `
						DELETE
						FROM carousel_slides
						WHERE
							id = ${arg.id}
						LIMIT 1
					`;
					
					Log.data(q);
					
					return Model.executeQuery(q);
				})
				.then(result => {
					console.log('slides del result')
					console.log(result)
					resolve(result);
				})
				.catch(error => {
					reject(error);
				});
			
		});
	},
}