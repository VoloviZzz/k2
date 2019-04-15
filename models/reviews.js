/* работа с отзывами */
module.exports = {
	
	add : arg => {
		console.log('call reviews set');
		
		return new Promise ((resolve, reject) => {
			
			Model
				.checkRequired(arg, ['name', 'text', 'creator'])
				.then(() => {
					
					var q = `
						INSERT INTO reviews
						SET
							name = '${arg.name}',
							text = '${arg.text}',
							creator = ${arg.creator}
					`;
					
					return Model.executeQuery(q);
					
				})
				.then(result => {
					console.log('reviews.add result');
					console.log(result);
					resolve(result);
				})
				.catch(error => {
					console.log('reviews.add error: ' + error.toString());
					reject(error);
				});
			
		});
		
	},
	
	get : arg => {
		
		// Log.view('Обращение к модели ' + 'reviews.get'.grey);
		
		return new Promise ((resolve, reject) => {
			
			Model
				.checkRequired(arg, [])
				.then(() => {
					
					var id = '',
						public = '',
						limit = '';
						
					if(arg.id){
						id = `AND r.id = ${arg.id}`;
						limit = `LIMIT 1`;
					}
					if(typeof arg.public !== 'undefined')public = `AND r.public = ${arg.public}`;
					
					var q = `
						SELECT r.*
						FROM reviews r
						WHERE r.id > 0
							${id}
							${public}
						ORDER BY created DESC
						${limit}
					`;
					
					// console.log(q)
					
					return Model.executeQuery(q);
					
				})
				.then(result => {
					
					// console.log('reviews.get result');
					// console.log(result);
					
					if(arg.id || (arg.limit && arg.limit == 1)){
						resolve(result[0]);
					}
					resolve(result);
					
				})
				.catch(error => {
					console.log('reviews.get error: ' + error.toString());
					reject(error);
				});
			
		});
		
	},
	
	set : arg => {
		console.log('call reviews.set');
		
		return new Promise ((resolve, reject) => {
			
			Model
				.checkRequired(arg, ['id'])
				.then(() => {
					
					var public = '',
						limit = `LIMIT 1`;
						
					if(typeof arg.public !== 'undefined')public = `r.public = ${arg.public},`;
					
					var q = `
						UPDATE
							reviews r
						SET 
							${public}
							r.updated = CURRENT_TIMESTAMP()
						WHERE id = ${arg.id}
						${limit}
					`;
					
					console.log(q)
					
					return Model.executeQuery(q);
					
				})
				.then(result => {
					console.log('reviews.set result');
					console.log(result);
					resolve(result);
				})
				.catch(error => {
					console.log('reviews.set error: ' + error.toString());
					reject(error);
				});
			
		});
		
	},
	
	del : arg => {
		console.log('call reviews.del');
		
		return new Promise ((resolve, reject) => {
			
			Model
				.checkRequired(arg, ['id'])
				.then(() => {
					
					var limit = `LIMIT 1`;
					
					var q = `
						DELETE FROM reviews
						WHERE id = ${arg.id}
						${limit}
					`;
					
					return Model.executeQuery(q);
					
				})
				.then(result => {
					console.log('reviews.del result');
					console.log(result);
					resolve(result);
				})
				.catch(error => {
					console.log('reviews.del error: ' + error.toString());
					reject(error);
				});
			
		});
		
	}
	
};