var fs = require("fs"),
    multiparty = require('multiparty'),
	Files = require("../files.js");
	
module.exports = {

	post:(req, res, next, data) => {

		// console.log()
	
		var form = new multiparty.Form(),
			uploadFile = {uploadPath: '', type: '', size: 0},
			maxSize = 3 * 1024 * 1024, // максимальный размер загружаемого файла
			supportMimeTypes = ['image/jpg', 'image/jpeg', 'image/png'], // поддерживаемые типы файлов
			errors = [];
			
		// обработчик ошибки
		form.on('error', function(err){
			
			// console.log('on error')
			
			if(fs.existsSync(uploadFile.path)) {
				fs.unlinkSync(uploadFile.path);
				// console.log('error');
			}
		});
		
		// получаем файл
		// проверяем размер, формат, получаем расширение
		// проверяем наличие файла logo + расширение
		// сохраняем в logo + расширение файла
		// обновляем таблицу конфигураций
		// обновляем конфигурацию в памяти
		// отправляем ответ об успешном завершении
		
		// обработчик завершения загрузки
		form.on('close', function() {
			
			// console.log('on close')
			
			if(errors.length == 0) {
				
				Model
					.config.setConfigBanner({banner : 'banner.' + uploadFile.ext})
					.then(() => {
						return Model.config.getConfig();
					})
					.then((result) => {
						Config = result;
						res.send({status : 'ok', path : uploadFile.path});
					});
				
			}
			else {
				if (fs.existsSync(uploadFile.path)) fs.unlinkSync(uploadFile.path);
				res.send({status: 'bad', errors: errors});
			}
		});
			
		form.on('part', function(part) {
			
			// console.log('on part')
			
			uploadFile.size = part.byteCount;
			uploadFile.type = part.headers['content-type'];
			var ext_arr = part.filename.split('.');
			uploadFile.ext = ext_arr[ext_arr.length - 1];
			uploadFile.path = './public/images/banner.' + uploadFile.ext;
			
			if(uploadFile.size > maxSize) {
				// console.log('big size')
				errors.push('File size is ' + uploadFile.size / 1024 / 1024 + '. Limit is' + (maxSize / 1024 / 1024) + 'MB.');
			}

			if(supportMimeTypes.indexOf(uploadFile.type) == -1) {
				// console.log('upsupported mime')
				// console.log(uploadFile.type);
				errors.push('Unsupported mimetype ' + uploadFile.type);
			}

			if(errors.length == 0) {
				// console.log('no errors')
				// console.log(uploadFile.path)

				var out = fs.createWriteStream(uploadFile.path);
				part.pipe(out);

				// console.log('--------------------------------------------------------------------------------------')

			}
			else {
				part.resume();
			}
		});

		form.parse(req);	// запуск обработки формы
		
	}
	
};