// работа с записями пользователей
module.exports = {
	
	// изменение записи пользователя
	/* set : arg => {
		
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
	 */
	// запрос списка подключений
	get : arg => {

		Log.view('Обращение к модели ' + 'users.get'.grey);
		
		arg = arg || {};
		
		return new Promise((resolve, reject) => {
			
			var id = '',
				login = '',
				pass = '',
				limit = '';
			
			if (arg.id) {
				id = `AND u.id = ${arg.id}`;
				limit = `LIMIT 1`;
			}
			else{
				if (arg.login && arg.pass) {					
					login = `AND u.login = '${arg.login}'`;
					pass = `AND u.pass = MD5('${arg.pass}')`;
					limit = `LIMIT 1`;
				}
				if (arg.limit) limit = `LIMIT ${arg.limit}`;
			}
			
			var q = `
				SELECT u.*
				FROM users u
				WHERE id > 0
					${id}
					${login}
					${pass}
				${limit}
			`;
			
			// Log.data(q);
			
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

	// добавление визита
	/* add : (arg) => {
		
		return new Promise((resolve, reject) => {
		
			Model
			.checkRequired(arg, ['visitorId'])
			.then(() => {

				var q = `
					INSERT
					INTO visits
					SET
						visitor_id = ${arg.visitorId}
				`;
				
			
				return Model.executeQuery(q);
			})
			.then(result => {
				console.log('visits add result')
				console.log(result)
				resolve(result);
			})
			.catch(error => {
				reject(error);
			});
			
		});
	},
	*/
}