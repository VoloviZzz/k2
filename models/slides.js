// работа со слайдами слайдеров
module.exports = {
	
	// изменение слайда
	set : arg => {
		
		return new Promise((resolve, reject) => {
			
			console.log(arg);
		
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
	
	// запрос списка слайдов
	get : arg => {

		Log.view('Обращение к модели ' + 'slides.get'.grey);
		
		arg = arg || {};
		
		return new Promise((resolve, reject) => {
			
			var id = '',
				slider = '',
				publ = '',
				limit = '';
			
			if (arg.id) {
				id = `AND s.id = ${arg.id}`;
				limit = `LIMIT 1`;
			}
			else{
				if (arg.slider) slider = `AND s.sliderId = ${arg.slider}`;
				if (typeof arg.public !== 'undefined' && arg.public !== null) publ = `AND s.public = ${arg.public}`;
				if (arg.limit) limit = `LIMIT ${arg.limit}`;
			}
			
			var q = `
				SELECT s.*
				FROM carousel_slides s
				WHERE s.id > 0
					${id}
					${slider}
					${publ}
				ORDER BY s.priority ASC
				${limit}
			`;
			
			Log.data(q);
			
			Model
				.executeQuery(q)
				.then(result => {
					
					if (result.length == 0) resolve(false);
					
					if (arg.id || arg.login && arg.pass || arg.limit && arg.limit == 1) {
						resolve(result[0]);						
					}
					
					resolve(result);
				
				})
				.catch(error => {
					reject(error);
				});
			
		});
	},

	// добавление слайда
	add : (arg) => {
		
		return new Promise((resolve, reject) => {
		
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
	
	// удаление слайда
	del : (arg) => {
		
		Log.view('Обращение к модели ' + 'slides.del'.grey);
		
		return new Promise((resolve, reject) => {
		
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