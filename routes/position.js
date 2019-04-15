var Files = require('../files.js');

module.exports = {
	get:(req, res, next, data) => {
		
		// Log.view('Обработка GET-запроса контроллером ' + 'position'.grey);
		
		var posId = req.path_arr[1];
		if(typeof posId == 'undefined')res.render('404', {admin:false, title:'Страница не существует', url:req.url});
		
		data.title = 'Позиция';
		
		// Log.view('Запрос позиции ' + ('#' + posId).grey);
		
		// запрос позиции
		Model
			.positions.getPositions({id:posId})
			.then(result => {
				
				if(!result){
				
					Log.warn('Позиции с идентификатором ' + ('#' + posId).grey + ' не существует');
					
					res.render('404', {admin:false, title:'Страница не существует', url:req.url});
					reject();
				
				}
				
				// Log.view('Позиции с идентификатором ' + ('#' + posId).grey + ' найдена');
				
				data.title = result.name;
				data.pos = result;
			
			})
			// запрос фотографий позиции
			.then(() => {
				return Model
					.photos.getPhotos({target_type:'position', target_id:data.pos.id})
					.then(result => {
						
						data.mainPhoto = false;
						data.photos = false;
						
						if(result){		// если есть фотографии					
							
							data.photos = result;
							
							for(var i in data.photos){
								data.photos[i].fullPath = `/public/photos/${data.photos[i].path}/${data.photos[i].id}.${data.photos[i].ext}`;
								if(data.pos.mainphoto !== null && data.photos[i].id == data.pos.mainphoto){
									data.mainPhoto = data.photos[i];
									// break;
								}
							}
							
							// выбор главного фото
							
							if(data.pos.mainphoto == null){	// главное фото не задано - выводим изображение "не выбрано фото для просмотра"
								data.mainPhoto = {fullPath:'/public/images/no_view.png'};
							}
							
						}
						else{	// фотографии отсутствуют - изображение "фотографии отсутствуют"
							data.mainPhoto = {fullPath:'/public/images/no_photo.png'};
						}
						
					});
			})
			.then(() => {
				
				// Log.view('Рендеринг вида ' + 'position'.grey);
		
				res.render('position', data);
				
				// Log.view('---> ---> --->'.green + ' Обработка запроса завершена');
				Log.delim();
				
			})
			.catch(error => {
				console.log(error);
			});
		
	},
	
	post:(req, res, next, data) => {
		
		console.log('-----------------------------------------------------------------------------------')
		
		var posId = req.path_arr[1];
		if(typeof posId == 'undefined')res.render('404', {admin:false, title:'Страница не существует', url:req.url});
		if(req.path_arr[2] == 'admin')data.admin = true;
		
		switch(data.ctrl){
			
			// установка названия позиции
			case 'save_pos_name':
				Model
					.positions.setPositionName({
						id:posId,
						name:data.name
					})
					.then(result => {
						res.send('complete');
					})
					.catch(error => {
						res.send(error.toString());
					});
			break;
			
			// установка цены позиции
			case 'save_pos_price':
				console.log(data);
				Model
					.positions.setPositionPrice({
						id:posId,
						price:data.price
					})
					.then(result => {
						res.send('complete');
					})
					.catch(error => {
						res.send(error.toString());
					});
			break;
			
			// установка суммы залога
			case 'save_pos_bail_sum':
				console.log(data);
				Model
					.positions.setPositionBailSum({
						id:posId,
						sum:data.sum
					})
					.then(result => {
						res.send('complete');
					})
					.catch(error => {
						res.send(error.toString());
					});
			break;
			
			// установка описания позиции
			case 'save_pos_desc':
				if (data.desc == '') {
					res.send('complete');
				}
				else {
					
					Model
						.positions.setPositionDesc({
							id:posId,
							desc:data.desc
						})
						.then(result => {
							res.send('complete');
						})
						.catch(error => {
							res.send(error.toString());
						});

				}
			break;
			
			// установка флага публикации позиции
			case 'change_pos_public':
				Model
					.positions.setPositionPublic({
						id:posId,
						public:data.public
					})
					.then(result => {
						res.send('complete');
					})
					.catch(error => {
						res.send(error.toString());
					});
			break;
			
			// удаление фото
			case 'delete_photo':
				
				console.log('ctrl delete photo');
				
				Model
					.photos.getPhotos({id:data.id})
					.then(result => {
						// console.log('getPhotos result')
						// console.log(result);
						data.photo = result;
						return;
					})
					.then(() => {
						console.log('then 1')
						return Model.photos.getPhotosLinks({photo:data.photo.id});
					})
					.then(result => {
						// console.log('getPhotosLinks result')
						// console.log(result);
						data.links = result;
						return;
					})
					// .photos.deletePhotos({id:data.id})
					.then(() => {
						return Model.photos.deletePhotosLinks({id:data.links[0].id});
					})
					.then(() => {
						return Model.photos.deletePhotos({id:data.photo.id})
					})
					.then(() => {
						return Files.deleteFile('./public/photos/' + data.photo.path + '/' + data.photo.id + '.' + data.photo.ext);
					})
					.then(() => {
						res.send('complete');
					})
					.catch(error => {
						res.send(error.toString());
					});
				
			break;
			
			// установка главного фото позиции
			case 'set_main_photo':
				
				console.log('ctrl set_main_photo');

				Model
					.positions.setPositionMainPhoto({id:data.pos, photo:data.photo})
					.then((result) => {
						
						console.log('setPositionMainPhoto result')
						console.log(result)
						res.send('complete');
						
					});
				
				
			break;
			
			// контроллер отсутствует
			default:
				console.log('default');
				// res.send('ctrl is not defined');
				res.sendStatus(404);
				console.log('send')
				// console.log(data);
				// next(new Error('controller is not defined'));
			break;
		}
		
		
	}
};