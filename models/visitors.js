// работа с посетителями
module.exports = {
	
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
		
	},
	
	// запрос списка подключений
	get : () => {
		
		return new Promise((resolve, reject) => {
		
			var q = "SELECT * FROM configs WHERE actual = 1 LIMIT 1";
			
			Model
				.executeQuery(q)
				.then(result => {
					resolve(result[0]);
				})
				.catch(error => {
					reject(error);
				});
			
		});
	},

	// добавление подключения
	add : () => {
		
		console.log('visitors add')
		
		return new Promise((resolve, reject) => {
		
			var q = `
				INSERT
				INTO visitors
				SET
					id = NULL
			`;
			
			console.log(q)
			
			Model
				.executeQuery(q)
				.then(result => {
					console.log('visitors add result')
					console.log(result);
					resolve(result);
				})
				.catch(error => {
					console.log(error);
					reject(error);
				});
			
		});
	},
}