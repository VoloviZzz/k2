var IndexAdmin = {

	saveCarouselSlideTitle : function () {

		var input = $(this),
			slide = input.data('slide'),
			text = input.val();

		$.post(
			'',
			{ctrl : 'saveSlideTitle', id : slide, title : text},
			data => {
				if (data !== 'complete') {
					console.log(data);
					alert(data);
				}
			}
		);

	},

	saveCarouselSlideSubTitle : function () {

		var input = $(this),
			slide = input.data('slide'),
			text = input.val();

		$.post(
			'',
			{ctrl : 'saveSlideSubTitle', id : slide, subtitle : text},
			data => {
				if (data !== 'complete') {
					console.log(data);
					alert(data);
				}
			}
		);

	},

	saveCarouselSlideText : function () {

		var input = $(this),
			slide = input.data('slide'),
			text = input.val();

		$.post(
			'',
			{ctrl : 'saveSlideText', id : slide, text : text},
			data => {
				if (data !== 'complete') {
					console.log(data);
					alert(data);
				}
			}
		);

	},

	saveCarouselSlidePublic : function () {

		console.log('save public')

		var input = $(this),
			slide = input.data('slide'),
			state = input[0].checked ? 1 : 0;

		$.post(
			'',
			{ctrl : 'saveSlidePublic', id : slide, state : state},
			data => {
				if (data !== 'complete') {
					console.log(data);
					alert(data);
				}
			}
		);

	},

	saveCarouselSlidePriority : function () {

		console.log('save priority')

		var input = $(this),
			slide = input.data('slide'),
			priority = input.val();

		$.post(
			'',
			{ctrl : 'saveSlidePriority', id : slide, priority : priority},
			data => {
				if (data == 'complete') {
					location.reload();
				}
				else {
					console.log(data);
					alert(data);
				}
			}
		);

	},

	createCarouselSlide : () => {

		if (!confirm('Добавить новый слайд?')) return;

		$.post(
			'',
			{ctrl : 'createNewSlide'},
			data => {
				if (parseInt(data) == data){
					location.reload();
				}
				else alert(data);
			}
		);

	},

	deleteCarouselSlide : function () {

		console.log('delete slide')

		if (!confirm('Удалить слайд?')) return;

		var button = $(this),
			slide = button.data('slide');

		console.log(button[0])
		console.log(slide)

		$.post(
			'',
			{ctrl : 'deleteSlide', id : slide},
			data => {
				if (data == 'complete') {
					location.reload();
				}
				else {
					console.log(data);
					alert(data);
				}
			}
		);

	},

	openUploadCarouselSlideImageDialog : function () {

		var button = $(this),
			slide = button.data('slide');

		console.log(slide)

		$('#carousel-upload-images').replaceWith($('#carousel-upload-images').clone(true));
		$('#carousel-upload-images').data('slide', slide);
		$('#carousel-upload-images').click();
	},

	uploadCarouselSlideImage : function () {

		var file = this.files[0],
			slide = $(this).data('slide'),
			data = new FormData();

		console.log('upload carousel slide image')

		data.append('file', file)

		$.ajax({
			url : '/slide_upload/' + slide,
			data : data,
			cache : false,
			contentType : false,
			processData : false,
			type : 'POST',
			// при получении ответа от сервера
			success : res => {
				if(res.status == 'ok'){
					location.reload();
				}
				else{
					console.log(res);
				}
			}
		});

	},
	addSocialbtn : function () {
			$.post('',
				{ctrl : 'addNewSocialLink'},
				data => {
						location.reload();
				}
			);
	},
	removeSocialbtn : function () {
		var obj = $(this).parent().parent();
		console.log(obj);
			$.post('',
				{ctrl : 'removeSocialLink', id: obj.data('id')},
				data => {
						obj.hide(300, function () {
							obj.remove();
						})
				}
			);
	},
	editSocialbtn : function () {
		var obj = $(IndexAdmin.selectIcon).parent().parent();
			$.post('',
				{
					ctrl : 'editSocialLink',
					id: obj.data('id'),
					link: obj.find('input').val(),
					fa: obj.find('.select-icon')[0].dataset.icon
				},
				data => {
						// location.reload();
						console.log(data);
				}
			);
	},
	setIcon : function () {
		console.log(IndexAdmin.selectIcon);
		IndexAdmin.selectIcon.dataset.icon = $(this).data('icon');
		$(IndexAdmin.selectIcon).find('span').removeClass();
		$(IndexAdmin.selectIcon).find('span').addClass('fa');
		$(IndexAdmin.selectIcon).find('span').addClass($(this).data('icon'));
		$(IndexAdmin.selectIcon).find('span').addClass('select-icon');
		IndexAdmin.editSocialbtn();
	},
	toggleSocialToggle : function () {
		$(this).find('.popup').show(300);
	},

	init : () => {

		$('.add-icon').on('click', IndexAdmin.addSocialbtn);
		$('.remove-icon').on('click', IndexAdmin.removeSocialbtn);
		$('.popup input').on('keyup', IndexAdmin.editSocialbtn);

		$('.set-icon').on('click', IndexAdmin.setIcon);
		$('.select-icon').on('click', function () {
			IndexAdmin.selectIcon = this;
		});

		$('.open-setting').on('click', IndexAdmin.toggleSocialToggle);



		$('.carousel-edit-public').on('change', IndexAdmin.saveCarouselSlidePublic);
		$('.carousel-delete-slide').on('click', IndexAdmin.deleteCarouselSlide);
		$('.carousel-edit-priority').on('change', IndexAdmin.saveCarouselSlidePriority);
		$('.carousel-upload-image').on('click', IndexAdmin.openUploadCarouselSlideImageDialog);
		$('#carousel-upload-images').on('change', IndexAdmin.uploadCarouselSlideImage);
		$('.carousel-edit-title').on('change', IndexAdmin.saveCarouselSlideTitle);
		$('.carousel-edit-subtitle').on('change', IndexAdmin.saveCarouselSlideSubTitle);
		$('.carousel-edit-text').on('change', IndexAdmin.saveCarouselSlideText);
		$('#create-new-slide').on('click', IndexAdmin.createCarouselSlide);

	}

};

$(document).ready(IndexAdmin.init);
$(document).ready(() => {

	tinymce.init({
		lang:'ru',
		selector: '#edit-main-text',
		menubar: false,
		toolbar: 'undo redo | removeformat | bold italic | forecolor backcolor |alignleft aligncenter alignright | bullist numlist | table',
		plugins: ['table autolink link lists wordcount code fullscreen insertdatetime save contextmenu textcolor']
	});

	setInterval(saveMainText, 500);

});

function saveMainText(){
	var text = tinyMCE.activeEditor.getContent();
	$.post(
		'/static',
		{ctrl:'saveMainText', text:text},
		data => {
			if(data !== 'complete')alert(data);
		}
	);
}

function Banner (elem) {
	this.body = $(elem);
	this.text = this.body.find('.n-info-inp-text');
	this.link = this.body.find('.n-info-inp-link');
	this.file = this.body.find('.banner-image');

	this.text.on('blur', this.saveText.bind(this));
	this.link.on('blur', this.saveText.bind(this));
	this.file.on('change', this.saveImage);
}
Banner.prototype.saveText = function () {
	$.post(
		'',
		{ctrl : 'saveBanner', text : this.text.val(), link : this.link.val(),},
		data => {
			console.log(data);
			if (data !== "complete") alert(data);
		}
	);
}
Banner.prototype.saveImage = function () {

	var file = this.files[0],
		data = new FormData();

	console.log('upload banner image')
	// return;

	data.append('file', file)

	$.ajax({
		url : '/banner_upload/',
		data : data,
		cache : false,
		contentType : false,
		processData : false,
		type : 'POST',
		// при получении ответа от сервера
		success : res => {
			console.log(res);
			if(res.status == 'ok'){
				location.reload();
			}
			else{
				console.log(res);
			}
		}
	});

}
var banner = new Banner($('.n-info'));
