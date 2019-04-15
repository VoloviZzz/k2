var Files = require('../files.js');

module.exports = {
        get:(req, res, next, data) => {

                // Log.view('Обработка GET-запроса контроллером ' + 'config'.grey);
                // Log.view('Запрос списка маршрутов');

                Model
                        .routes.get()
                        .then(result => {

                                // Log.view('Список маршрутов получен');

                                data.routes = result;

                                // Log.view('Проверка существования файлов маршрутов');

                                var filesExistsArr = [],
                                        filesAttr = [
                                                {target : 'ctrlExists', folder : 'routes', prefix : '', param : 'name', postfix : '', ext : 'js'},
                                                {target : 'viewExists', folder : 'views', prefix : '', param : 'name', postfix : '', ext : 'ejs'},
                                                {target : 'clientJsExists', folder : 'public/javascripts', prefix : '', param : 'name', postfix : '', ext : 'js'},
                                                {target : 'adminJsExists', folder : 'public/javascripts', prefix : '', param : 'name', postfix : '_admin', ext : 'js'},
                                                {target : 'clientCssExists', folder : 'public/stylesheets', prefix : '', param : 'name', postfix : '', ext : 'css'},
                                                {target : 'adminCssExists', folder : 'public/stylesheets', prefix : '', param : 'name', postfix : '_admin', ext : 'css'},
                                        ];

                                data.routes.forEach(route => {

                                        filesAttr.forEach(item => {

                                                filesExistsArr.push(new Promise((resolve, reject) => {
                                                        Files.exists('./' + item.folder + '/' + item.prefix + route[item.param] + item.postfix + '.' + item.ext)
                                                        .then(exists => {
                                                                route[item.target] = exists;
                                                                resolve(1);
                                                        });
                                                }));

                                        });

                                });

                                return Promise.all(filesExistsArr);

                        })
                        .then(() => {

                                console.log('ejs test');
                                return Helpers.renderEjsFile('./routes/_example.ejs', {name : 'testname'});

                        })
                        .catch(error => {
                                console.log(error)
                        })
                        .then(str => {

                                Log.delim();
                                console.log(str);
       Log.delim();

                        })
                        .then(() => {

                                // Log.view('Проверка существования файлов завершена');
                                // Log.view('Рендеринг вида ' + 'config'.grey);

                                res.render('config', data);

                                // Log.view('---> ---> --->'.green + ' Обработка запроса завершена');
                                Log.delim();

                        });

        },
        post:(req, res, next, data) => {

                // Log.view('Обработка POST-запроса контроллером ' + 'config'.grey);

                switch(data.ctrl){

                        case 'addRoute' :
                                res.send(JSON.stringify(data));
                        break;
                        default:
                                res.sendStatus(404);
                        break;

                }

        }

};


