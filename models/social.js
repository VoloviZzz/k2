// работа со слайдами слайдеров
module.exports = {

	getIcons : (arg) => {

		return new Promise((resolve, reject) => {

			Model
				.checkRequired(arg, [])
				.then(() => {

					var q = `
						SELECT *
						FROM font_awesome
					`;

					// // Log.data(q);

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

	// добавление кнопки
	add : (arg) => {

		return new Promise((resolve, reject) => {

			Model
				.checkRequired(arg, [])
				.then(() => {

					var q = `
						SELECT social
						FROM configs
					`;

					// // Log.data(q);

					return Model.executeQuery(q);
				})
				.then(result => {

					console.log(JSON.parse(result[0].social));
					var array = JSON.parse(result[0].social);
					array.push({
						id: array.length+1,
						link: '#',
						fa: 'fa-photo'
					});

					var q = `
						UPDATE configs
						SET social = '${JSON.stringify(array)}'
					`;

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

	// удаление btn
	del : (arg) => {

		return new Promise((resolve, reject) => {

			Model
			// .checkRequired(arg, ['id', 'link', 'fa'])
				.checkRequired(arg, ['id'])
				.then(() => {

					var q = `
						SELECT social
						FROM configs
					`;

					// // Log.data(q);

					return Model.executeQuery(q);
				})
				.then(result => {

					var array = JSON.parse(result[0].social);
					var array2 = [];
					array.forEach(elem => {
						if (elem.id != arg.id) {
							array2.push(elem);
						}
					});

					var q = `
						UPDATE configs
						SET social = '${JSON.stringify(array2)}'
					`;

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

	edit : (arg) => {

		return new Promise((resolve, reject) => {

			Model
			.checkRequired(arg, ['id', 'link', 'fa'])
				.then(() => {

					var q = `
						SELECT social
						FROM configs
					`;

					return Model.executeQuery(q);
				})
				.then(result => {

					var array = JSON.parse(result[0].social);
					var array2 = [];
					array.forEach(elem => {
						if (elem.id != arg.id) {
							array2.push(elem);
						}else {
							array2.push({
								id: arg.id,
								link: arg.link,
								fa: arg.fa
							});
						}
					});

					var q = `
						UPDATE configs
						SET social = '${JSON.stringify(array2)}'
					`;

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

}
