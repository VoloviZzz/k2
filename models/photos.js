/* работа с фотографиями */
module.exports = {
	
	// запрос списка позиций
	getPhotos:arg => {
		
		return new Promise((resolve, reject) => {
		
			if(typeof arg == 'undefined')arg = {};
			
			var id = '',
				limit = '',
				target_type = '',
				target_id = '';
				
			if(arg.id){
				id = `AND p.id = ${arg.id}`;
				limit = `LIMIT 1`;
			}
			if(arg.limit)limit = `LIMIT = ${arg.limit}`;
			if(arg.target_type){
				target_type = `AND pl.target_type = '${arg.target_type}'`;
			}
			if(arg.target_id){
				target_id = `AND pl.target_id = '${arg.target_id}'`;
			}

			var q = `
				SELECT p.*
				FROM photos p, photos_links pl
				WHERE pl.photo_id = p.id
					${id}
					${target_type}
					${target_id}
				${limit}
			`;
			// console.log(q);
			Model
				.executeQuery(q)
				.catch(error => {
					// console.log('error here')
					console.log(error);
				})
				.then(result => {
					// console.log(result);
					if(result.length > 0){
						if(arg.id || (arg.limit && arg.limit == 1)){
							resolve(result[0]);
						}
						resolve(result);
					}
					resolve(false);
				})
				.catch(error => {
					// console.log(error);
					reject(error);
				});
		});
	},
	
	// запрос ссылок на изображения
	getPhotosLinks : arg => {
		
		return new Promise((resolve, reject) => {
			
			if(typeof arg == 'undefined') arg = {};
			
			var id = '',
				photo = '';
				
			if(arg.id)id = `AND pl.id = ${arg.id}`;
			if(arg.photo)photo = `AND pl.photo_id = ${arg.photo}`;
			
			var q = `SELECT pl.*
					FROM photos_links pl
					WHERE pl.id > 0
						${id} 
						${photo} 
			`;
			
			// console.log(q)
			
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
	
	// добавление изображения
	addPhoto:arg => {
		
		// console.log()
		
		return new Promise((resolve, reject) => {

			if(typeof arg == 'undefined'){
				reject(new Error('addPhoto cannot run without arg'));
			}
			
			Model
				.checkRequired(arg, ['creator'])
				.then(() => {
					
					var size = '', 
						ext = '';
					
					if(arg.size)size = `size = ${arg.size},`;
					if(arg.ext)ext = `ext = '${arg.ext}',`;
					if(arg.path)path = `path = '${arg.path}',`;
					
					var q = `
						INSERT
							INTO photos
							SET
								${size}
								${ext}
								${path}
								creator = ${arg.creator}
					`;
					
					// console.log(q)
					
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
	
	// обновление фотографий
	updatePhotos: arg => {
		
		return new Promise((resolve, reject) => {
			
			if(typeof arg == 'undefined')reject(new Error('updatePhotos cannot run without arg'));
			
			Model
				.checkRequired(arg, ['id'])
				.then(() => {
					
					var size = '', 
						ext = '';
					
					if(arg.size)size = `size = ${arg.size},`;
					if(arg.ext)ext = `ext = '${arg.ext}',`;
					
					var q = `
						UPDATE photos
						SET
							${size}
							${ext}
							updated = CURRENT_TIMESTAMP()
						WHERE
							id = ${arg.id}
						LIMIT 1
					`;
					
					// console.log(q)
					
					Model
						.executeQuery(q)
						.then(result => {
							resolve(result);
						})
						.catch(error => {
							reject(error);
						});
				});
			
		})
		
	},
	
	// добавление ссылки на изображение
	addPhotoLink:arg => {
		
		return new Promise((resolve, reject) => {

			if(typeof arg == 'undefined'){
				reject(new Error('addPhoto cannot run without arg'));
			}
			
			Model
				.checkRequired(arg, ['target_type', 'target_id', 'photo_id'])
				.then(() => {

					var q = `
						INSERT
							INTO photos_links
							SET
								target_type = '${arg.target_type}',
								target_id = ${arg.target_id},
								photo_id = ${arg.photo_id},
								creator = 1
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
	
	// удаление фото
	deletePhotos : arg => {
		
		return new Promise((resolve, reject) => {

			if(typeof arg == 'undefined'){
				reject(new Error('deletePhotos cannot run without arg'));
			}
			
			Model
				.checkRequired(arg, ['id'])
				.then(() => {

					var q = `
						DELETE
							FROM photos
							WHERE id > 0
								AND id = ${arg.id}
							LIMIT 1
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
	
	// удаление ссылки на фото
	deletePhotosLinks : arg => {
		
		return new Promise((resolve, reject) => {

			if(typeof arg == 'undefined'){
				reject(new Error('deletePhotosLinks cannot run without arg'));
			}
			
			Model
				.checkRequired(arg, ['id'])
				.then(() => {

					var q = `
						DELETE
							FROM photos_links
							WHERE id > 0
								AND id = ${arg.id}
							LIMIT 1
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
		
	}
	
};