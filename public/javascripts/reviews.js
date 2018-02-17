$(document).ready(() => {
	$('#add-new-review').on('click', addReview);
});

// проверка формы добавления отзыва
function validateReviewForm(){
	console.log('validate form')
	
	var valid = true,
		name = $('#new-review-name').val(),
		nameErrors = [],
		text = $('#new-review-text').val(),
		textErrors = [];
	
	if (name == '') nameErrors.push('Поле обязательно для заполнения');
	if (text == '') textErrors.push('Поле обязательно для заполнения');
	// проверка имени и текста отзыва на содержание запрещенных символов
	// проверка имени на длину, только русские буквы
	// написание имени с больших букв
	if (nameErrors.length > 0) {
		showError('name', nameErrors.join('<br />'));
		valid = false;
	}
	else hideError('name');
	
	if (textErrors.length > 0) {
		showError('text', textErrors.join('<br />'));
		valid = false;
	}
	else hideError('text');
	
	return valid;
}

// показать ошибку
function showError(name, text){
	var err = $(`#new-review-${name}-error`);
	err.text(text);
	if(err.hasClass('hidden'))err.removeClass('hidden');
}

// скрыть ошибку
function hideError(name){
	var err = $(`#new-review-${name}-error`);
	err.text('');
	if(!err.hasClass('hidden'))err.addClass('hidden');
}

// добавление отзыва
function addReview () {
	
	if (!validateReviewForm()) return;
	
	var name = $('#new-review-name').val(),
		text = $('#new-review-text').val();
	$.post(
		'',
		{ctrl : 'add_review', name : name, text : text},
		data => {
			console.log(data);
			if(parseInt(data) == data){
				alert('Ваш отзыв успешно добавлен. Он появится на этой странице после проверки администратором сайта.');
				location.reload();
			}
			else alert(data);
		}
	);
}