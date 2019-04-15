/* работа с позициями */
module.exports = {
	
	//
	set : arg => {
		
		return new Promise((resolve, reject) => {
			
			console.log(arg);
			
			var name = '',
				slogan = '',
				mainText = '',
				bottom_description = '',
				phone_region_code = '',
				phone_number = '',
				email = '';
				card_number = '',
				address = '',
				rates = '';
				
			if (arg.name) name = `name = '${arg.name}',`;
			if (arg.slogan) slogan = `slogan = '${arg.slogan}',`;
			if (arg.mainText) mainText = `mainText = '${arg.mainText}',`;
			if (arg.bottom_description) bottom_description = `bottom_description = '${arg.bottom_description}',`;
			if (arg.phone_region_code) phone_region_code = `phone_region_code = ${arg.phone_region_code},`;
			if (arg.phone_number) phone_number = `phone_number = '${arg.phone_number}',`;
			if (arg.email) email = `email = '${arg.email}',`;
			if (arg.card_number) card_number = `card_number = '${arg.card_number}',`;
			if (arg.address) address = `contacts_address = '${arg.address}',`;
			if (arg.rates) rates = `rates = '${arg.rates}',`;
			
			var q = `
				UPDATE configs
				SET
					${name}
					${slogan}
					${mainText}
					${bottom_description}
					${phone_region_code}
					${phone_number}
					${email}
					${card_number}
					${address}
					${rates}
					updated = CURRENT_TIMESTAMP()
				WHERE actual = 1
			`;
			
			console.log(q);
			
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
	
	// запрос списка позиций
	getConfig:() => {
		
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
	
	// установка основного названия
	setConfigName:arg => {
		
		return new Promise((resolve, reject) => {
			
			if(typeof arg == 'undefined')reject(new Error('setConfigName cannot run without arg'));
			Model
				.checkRequired(arg, ['name'])
				.catch(error => {
					reject(error);
				})
				.then(() => {
					var q = "UPDATE configs SET name = '" + arg.name + "' WHERE actual =  1 LIMIT 1";
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
	
	// сохранение условий
	setConfigTerms:arg => {
		
		return new Promise((resolve, reject) => {
			
			if(typeof arg == 'undefined')reject(new Error('setConfigTerms cannot run without arg'));
			Model
				.checkRequired(arg, ['terms'])
				.catch(error => {
					reject(error);
				})
				.then(() => {
					var q = `UPDATE configs SET terms = '${arg.terms}' WHERE actual =  1 LIMIT 1`;
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
	
	// сохранение имени файла логотипа
	// используется в контроллерах : logo_upload
	setConfigLogo:arg => {
		
		return new Promise((resolve, reject) => {
			
			if(typeof arg == 'undefined')reject(new Error('setConfigLogo cannot run without arg'));
			Model
				.checkRequired(arg, ['logo'])
				.catch(error => {
					reject(error);
				})
				.then(() => {
					var q = `UPDATE configs SET logo = '${arg.logo}' WHERE actual =  1 LIMIT 1`;
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
	
	// сохранение текста о компании
	setConfigAbout:arg => {
		
		return new Promise((resolve, reject) => {
			
			if(typeof arg == 'undefined')reject(new Error('setConfigName cannot run without arg'));
			Model
				.checkRequired(arg, ['about'])
				.catch(error => {
					reject(error);
				})
				.then(() => {
					var q = `UPDATE configs SET about = '${arg.about}' WHERE actual =  1 LIMIT 1`;
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