$(document).ready(() => {
	$('#edit-pos-name').on('change', savePosName);
	$('#edit-pos-price').on('change', savePosPrice);
	$('#edit-bail-sum').on('change', savePosBailSum);
	$('#flag-pos-public').on('change', changePosPublic);
	$('#edit-pos-description').on('blur', savePosDescription);
	$('#upload-images').on('change', addImages);
	$('#upload-images-button').on('click', () => {
		$('#upload-images').replaceWith($('#upload-images').clone(true));
		$('#upload-images').click();
	});
	$('.delete-photo').each((i, button) => {
		$(button).on('click', deletePhoto);
	});
	$('.set-main-photo').each((i, button) => {
		$(button).on('click', setMainPhoto);
	});
	$('.check-photo').each((i, button) => {
		$(button).on('click', checkPhoto);
	});
	$('#select-all-images-button').on('click', selectAllPhotos);
	$('#delete-selected-images-button').on('click', deleteSelectedPhotos);
});

// сохранение названия позиции
function savePosName(){
	var name = $('#edit-pos-name').val();
	$.post(
		'',
		{ctrl:'save_pos_name', name:name},
		data => {
			if(data !== 'complete')alert(data);
		}
	);
}

// сохранение цены позиции
function savePosPrice(){
	var price = $('#edit-pos-price').val();
	$.post(
		'',
		{ctrl:'save_pos_price', price:price},
		data => {
			if(data !== 'complete')alert(data);
		}
	);
}

// сохранение суммы залога
function savePosBailSum(){
	var sum = $('#edit-bail-sum').val();
	$.post(
		'',
		{ctrl:'save_pos_bail_sum', sum:sum},
		data => {
			if(data !== 'complete')alert(data);
		}
	);
}

// сохранение описания позиции
function savePosDescription(){
	var desc = $('#edit-pos-description').val();
	$.post(
		'',
		{ctrl:'save_pos_desc', desc:desc},
		data => {
			if(data !== 'complete')alert(data);
		}
	);
}

// сохранение флага публикации
function changePosPublic(){
	var public = $('#flag-pos-public')[0].checked ? 1 : 0;
	$.post(
		'',
		{ctrl:'change_pos_public', public:public},
		data => {
			if(data !== 'complete')alert(data);
		}
	);
}

// добавление изображений
function addImages(){
	var files = this.files;
	$.each(files, (i, file) => {
		var item = $('<div>')
				.attr('class', 'col-lg-4 col-md-4 col-sm-4 col-xs-4'),
			progress = $('<progress>')
				.attr('class', 'progress')
				.attr('max', '100'),
			checkbox = $('<div>')
				.attr('class', 'btn btn-xs btn-default')
				.html('<span class="fa fa-toggle-off check-photo"></span>')
				.hide(),
			btnDel = $('<button>')
				.attr('title', 'Удалить фото')
				.attr('class', 'btn btn-danger btn-xs delete-photo')
				.html('<span class="fa fa-trash"></span>')
				.hide(),
			btnMain = $('<button>')
				.attr('title', 'Главное фото')
				.attr('class', 'btn btn-success btn-xs set-main-photo')
				.html('<span class="fa fa-arrow-up"></span>')
				.hide(),
			photo = $('<div>')
				.attr('class', 'img photo pointer'),
			reader = new FileReader(),
			f = {file:file, item:item, progress:progress, checkbox:checkbox, btnDel:btnDel, btnMain:btnMain, photo:photo};
			
		
		reader.onload = function (e) {
			photo.attr('src', e.target.result);
			render.renderImg();
		}
		reader.readAsDataURL(file);
		
		$('#photos-list').append(
			item
				.append(progress)
				.append(checkbox)
				.append(btnDel)
				.append(btnMain)
				.append(photo)
		);

		uploadImage(f);
		
	});
}

// загрузка изображения
function uploadImage(f){
	var pos = $('#position-id').val(),
		data = new FormData();
	data.append('file', f.file);
	$.ajax({
		url : '/position_upload/' + pos,
		data : data,
		cache : false,
		contentType : false,
		processData : false,
		type : 'POST',
		// при получении ответа от сервера
		success : res => {
			if(res.status == 'ok'){
				setTimeout(() => {
					f.progress.hide();
					f.checkbox.show().attr('data-id', res.id).on('click', checkPhoto);
					f.btnDel.show().attr('data-id', res.id).on('click', deletePhoto);
					f.btnMain.show().attr('data-id', res.id).on('click', setMainPhoto);
					f.item.attr('id', 'photo-' + res.id);
					f.photo.on('click', showPhoto);
					if ($('#select-all-images-button').hasClass('hidden')) $('#select-all-images-button').removeClass('hidden');
					if ($('#main-photo').attr('src') == '/public/images/no_photo.png'){
						$('#main-photo').attr('src', '/public/images/no_view.png');
						render.renderImg();
					}
				}, 1000);
			}
		},
		xhr : function () {
			var xhr = $.ajaxSettings.xhr();	// получаем объект XMLHttpRequest
			if (xhr.upload) {	// если стадия загрузки началась
				xhr.upload.onprogress = function (e) {	// вешаем обработчик на прогресс
					
					var done = e.position || e.loaded,	// получаем объем уже загруженных данных 
						total = e.totalSize || e.total,	// получаем общий объем загрузки
						value = Math.round((done/total) * 100);
					
					updateFileProgress(f.progress, value);	// обновление значения прогресс-бара
					
				};
			}
			
			return xhr;
		}
	});
}

// обновление значения прогресса загрузки файла
function updateFileProgress(progress, value){
	progress.val(value);
}

// удаление фото
function deletePhoto(id, noconfirm){
	
	id = id || false;
	noconfirm = noconfirm || false;
	if (!noconfirm) {
		if (!confirm('Удалить это изображение')) return;
	}
	
	var button = noconfirm ? false : $(this),
		photo = noconfirm ? $('#photo-' + id) : $(button[0].parentNode),
		id = noconfirm ? id : button.data('id');
	
	$.post(
		'',
		{ctrl:'delete_photo', id:id},
		data => {
			if(data === 'complete'){
				// console.log(photo)
				photo.remove();
				if($('#photos-list .fa-toggle-on').length == 0)$('#delete-selected-images-button').addClass('hidden');
				// console.log($('#photos-list .col-lg-4'));
				if($('#photos-list .col-lg-4').length == 0){
					$('#select-all-images-button').addClass('hidden');
					if ($('#main-photo').attr('src') !== '/public/images/no_photo.png'){
						$('#main-photo')
							.attr('src', '/public/images/no_photo.png');
						if(!$('#main-photo').hasClass('img-repeat')) $('#main-photo').addClass('img-repeat').addClass('img-auto');
						render.renderImg();
					}
				}
			}
			else alert(data);
		}
	);
	
}

// удаление выбранных изображений
function deleteSelectedPhotos(){
	if(!confirm('Удалить выбранные изображения'))return;
	var selected = $('#photos-list .fa-toggle-on');
	selected.each((i, checkbox) => {
		// console.log(checkbox);
		// console.log($(checkbox.parentNode));
		// console.log($(checkbox.parentNode).data('id'));
		deletePhoto($(checkbox.parentNode).data('id'), true);
	});
}

// клик на чекбоксе
function checkPhoto(){
	var checkbox = $(this).hasClass('fa') ? $(this) : $(this.firstChild);
	checkbox.toggleClass('fa-toggle-on');
	checkbox.toggleClass('fa-toggle-off');
	var btn = $('#delete-selected-images-button');
	if ($('#photos-list .fa-toggle-on').length > 0) {
		btn.removeClass('hidden');
	}
	else{
		if (!btn.hasClass('hidden')) btn.addClass('hidden');
	}
}

// выбор всех изображений
function selectAllPhotos(){
	var boxes = $('#photos-list .fa-toggle-off');
	if(boxes.length > 0){
		boxes.each((i, btn) => {
			btn.click();
		});
	}
	else{
		$('#photos-list .fa-toggle-on').each((i, btn) => {
			btn.click();
		});
	}
}

// установка главного фото
function setMainPhoto(){
	var button = this,
		pos = $('#position-id').val(), 
		photo = button.dataset.id;
		
	$.post(
		'',
		{ctrl:'set_main_photo', pos:pos, photo:photo},
		data => {
			if(data == 'complete'){
				location.reload();
			}
			else alert(data);
		}
	);
		
}