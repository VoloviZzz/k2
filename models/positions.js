/* работа с позициями */
module.exports = {
	
	// запрос списка позиций
	getPositions:arg => {
		
		return new Promise((resolve, reject) => {
		
			if(typeof arg == 'undefined')arg = {};
			
			var id = '',
				limit = '';
				
			if(arg.id){
				id = " AND p.id = " + arg.id;
				limit = " LIMIT 1";
			}
			if(arg.limit)limit = " LIMIT = arg.limit";

			var q = `
				SELECT
					p.*,
					ph.id as photo_id, ph.path, ph.ext
				FROM positions p
					LEFT JOIN photos ph ON ph.id = p.mainphoto
				WHERE p.id > 0
					${id}
				ORDER BY p.created DESC
				${limit}
			`;
			// console.log(q);
			Model
				.executeQuery(q)
				.catch(error => {
					console.log(error);
				})
				.then(result => {
					if(result.length > 0){
						if(arg.id || (arg.limit && arg.limit == 1)){
							resolve(result[0]);
						}
						resolve(result);
					}
					resolve(false);
				})
				.catch(error => {
					console.log(error);
					reject(error);
				});
		});
	},
	
	// добавление позиции
	addPosition:arg => {
		
		return new Promise((resolve, reject) => {

			if(typeof arg == 'undefined'){
				reject(new Error('addPosition cannot run without arg'));
			}
			
			var q = "INSERT INTO positions SET creator = 1";
			
			Model
				.executeQuery(q)
				.then(result => {
					resolve(result);
				})
				.catch(error => {
					reject(error);
				});
			
		});
		
	},
	
	/* установка цены позиции */
	setPositionPrice:arg => {
		
		return new Promise((resolve, reject) => {
			
			// console.log(arg);
			
			if(typeof arg == 'undefined')reject(new Error('setPositionPrice cannot run without arg'));
			// Model.checkRequired();
			if(!arg['id'])reject(new Error('setPositionPrice: missing argument id'));
			if(!arg['price'])reject(new Error('setPositionPrice: missing argument price'));
			
			var q = "UPDATE positions SET price = " + arg.price + " WHERE id = " + arg.id + " LIMIT 1";
			
			Model
				.executeQuery(q)
				.then(result => {
					// console.log(result);
					resolve(result);
				})
				.catch(error => {
					console.log(error);
					reject(error);
				});
		});
	},
	
	/* установка суммы залога */
	setPositionBailSum:arg => {
		
		return new Promise((resolve, reject) => {
			
			// console.log(arg);
			
			if(typeof arg == 'undefined')reject(new Error('setPositionBailSum cannot run without arg'));
			// Model.checkRequired();
			if(!arg['id'])reject(new Error('setPositionBailSum: missing argument id'));
			if(!arg['sum'])reject(new Error('setPositionBailSum: missing argument sum'));
			
			var q = `UPDATE positions SET bail_sum = ${arg.sum} WHERE id = ${arg.id} LIMIT 1`;
			
			Model
				.executeQuery(q)
				.then(result => {
					// console.log(result);
					resolve(result);
				})
				.catch(error => {
					console.log(error);
					reject(error);
				});
		});
	},
	
	// установка названия позиции
	setPositionName:arg => {
		
		return new Promise((resolve, reject) => {
			
			if(typeof arg == 'undefined')reject(new Error('setPositionName cannot run without arg'));
			Model
				.checkRequired(arg, ['id', 'name'])
				.catch(error => {
					reject(error);
				})
				.then(() => {
					var q = "UPDATE positions SET name = '" + arg.name + "' WHERE id = " + arg.id + " LIMIT 1";
					return Model.executeQuery(q);
				})
				.then(result => {
					resolve(result);
				})
				.catch(error => {
					reject(error);
				});
			
		});
		
	},
	
	// установка названия позиции
	setPositionDesc:arg => {
		
		return new Promise((resolve, reject) => {
			
			if(typeof arg == 'undefined')reject(new Error('setPositionDesc cannot run without arg'));
			Model
				.checkRequired(arg, ['id', 'desc'])
				.catch(error => {
					reject(error);
				})
				.then(() => {
					var q = "UPDATE positions SET description = '" + arg.desc + "' WHERE id = " + arg.id + " LIMIT 1";
					return Model.executeQuery(q);
				})
				.then(result => {
					resolve(result);
				})
				.catch(error => {
					reject(error);
				});
			
		});
		
	},
	
	// установка флага публикации позиции
	setPositionPublic:arg => {
		
		return new Promise((resolve, reject) => {
			
			console.log('call set position public')
			
			if(typeof arg == 'undefined')reject(new Error('setPositionPublic cannot run without arg'));
			Model
				.checkRequired(arg, ['id', 'public'])
				.catch(error => {
					reject(error);
				})
				.then(() => {
					var q = "UPDATE positions SET public = " + arg.public + " WHERE id = " + arg.id + " LIMIT 1";
					return Model.executeQuery(q);
				})
				.then(result => {
					resolve(result);
				})
				.catch(error => {
					reject(error);
				});
			
		});
		
	},
	
	// установка главного фото позиции
	setPositionMainPhoto:arg => {
		
		return new Promise((resolve, reject) => {
			
			console.log('call set position main photo')
			
			if(typeof arg == 'undefined')reject(new Error('setPositionMainPhoto cannot run without arg'));
			Model
				.checkRequired(arg, ['id', 'photo'])
				.catch(error => {
					reject(error);
				})
				.then(() => {
					var q = `UPDATE positions SET mainphoto = ${arg.photo} WHERE id = ${arg.id} LIMIT 1`;
					return Model.executeQuery(q);
				})
				.then(result => {
					resolve(result);
				})
				.catch(error => {
					reject(error);
				});
			
		});
		
	},
	
	del : arg => {
		
		Log.view('Обращение к модели positions.del');
		
		return new Promise((resolve, reject) => {
		
			Model
				.checkRequired(arg, ['id'])
				.then(() => {
					
					var q = `DELETE FROM positions WHERE id = ${arg.id} LIMIT 1`;
					
					return Model.executeQuery(q);
					
				})
				.then(result => {
					resolve(result);
				})
				.catch(error => {
					reject(error);
				});
		
		});
		
	}
	
};