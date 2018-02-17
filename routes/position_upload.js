var fs = require("fs"),
    multiparty = require('multiparty'),
	md5 = require('md5'),
	Files = require("../files.js");
	
module.exports = {

	post:(req, res, next, data) => {

		Log.view('Обработка POST-запроса контроллером ' + 'position_upload'.grey);
	
		var pos = req.path_arr[1],
			form = new multiparty.Form(),
			uploadFile = {uploadPath: '', type: '', size: 0},
			maxSize = 3 * 1024 * 1024, // максимальный размер загружаемого файла
			supportMimeTypes = ['image/jpg', 'image/jpeg', 'image/png'], // поддерживаемые типы файлов
			errors = [],	// массив для записи ошибок
			str = md5(Math.random()),	// генерация случайной строки для выбора из неё пути
			path = [str.substr(0, 2), str.substr(2, 2)],	// выбор пути
			loc = './public/photos/';	// место сохранения файлов
			
		Files
			.exists(loc + path[0])	// проверка существования первой части пути
			.then(exists => {
				if(!exists){	// создание пути, если он не существует
					return Files.mkdir(loc + path[0]);
				}
				return true;
			})
			.then(() => {	// проверка существования второй части пути
				return Files.exists(loc + path[0] + '/' + path[1]);
			})
			.then(exists => {	// создание пути, если он не существует
				if(!exists){
					return Files.mkdir(loc + path[0] + '/' + path[1]);
				}
				return true;
			})
			.then(() => {	// создание в бд записи о файле
				return Model.photos.addPhoto({
					path : path[0] + '/' + path[1],
					creator : 1
				});
			})
			.then(id => {	// создание в бд ссылки на изображение
				uploadFile.id = id;
				return Model.photos.addPhotoLink({target_type:'position', target_id:pos, photo_id:uploadFile.id});
			})
			.catch(error => {
				res.send(error.toString());
				return;
			})
			.then(pl => {	// загрузка файла
				
				// обработчик ошибки
				form.on('error', function(err){
					
					console.log('on error')
					
					if(fs.existsSync(uploadFile.path)) {
						fs.unlinkSync(uploadFile.path);
						console.log('error');
					}
				});
				
				// обработчик завершения загрузки
				form.on('close', function() {
					
					console.log('on close')
					
					if(errors.length == 0) {
						Model
							.photos.updatePhotos({
								id : uploadFile.id,
								size : uploadFile.size,
								ext : uploadFile.ext
							})
							.then(() => {
								res.send({status: 'ok', id:uploadFile.id, path:uploadFile.path});
							});
					}
					else {
						if (fs.existsSync(uploadFile.path)) fs.unlinkSync(uploadFile.path);
						res.send({status: 'bad', errors: errors});
					}
				});
				
				form.on('part', function(part) {
					
					console.log('on part')
					
					uploadFile.size = part.byteCount;
					uploadFile.type = part.headers['content-type'];
					var ext_arr = part.filename.split('.');
					uploadFile.ext = ext_arr[ext_arr.length - 1];
					uploadFile.path = loc + path[0] + '/' + path[1] + '/' + uploadFile.id + '.' + uploadFile.ext;
					
					if(uploadFile.size > maxSize) {
						console.log('big size')
						errors.push('File size is ' + uploadFile.size / 1024 / 1024 + '. Limit is' + (maxSize / 1024 / 1024) + 'MB.');
					}

					if(supportMimeTypes.indexOf(uploadFile.type) == -1) {
						console.log('upsupported mime')
						console.log(uploadFile.type);
						errors.push('Unsupported mimetype ' + uploadFile.type);
					}

					if(errors.length == 0) {
						console.log('no errors')
						console.log(uploadFile.path)

						var out = fs.createWriteStream(uploadFile.path);
						part.pipe(out);

						console.log('--------------------------------------------------------------------------------------')

					}
					else {
						part.resume();
					}
				});

				// parse the form
				// запуск обработки формы
				form.parse(req);
				
			});
		
	}
	
};