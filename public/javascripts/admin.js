var StaticAdmin = {
	
	//
	init : () => {

		$('#leave-admin-mode-button').on('click', StaticAdmin.leaveAdminMode);
		$('#edit-company-name').on('change', StaticAdmin.saveCompanyName);
		$('#edit-company-slogan').on('change', StaticAdmin.saveCompanySlogan);
		$('#edit-company-region-code').on('change', StaticAdmin.saveCompanyRegionCode);
		$('#edit-company-phone-number').on('change', StaticAdmin.saveCompanyPhoneNumber);
		$('#edit-company-bottom-description').on('blur', StaticAdmin.saveCompanyBottomDescription);
		$('#upload-company-logo').on('change', StaticAdmin.loadCompanyLogo);
		$('#load-logo-button').on('click', StaticAdmin.logoOpenFileDialog);
		
	},

	// выход из режима администрирования
	leaveAdminMode : () => {
		document.location.href = document.location.href.replace('admin', '');
	},

	// сохранение имени компании
	saveCompanyName : () => {
		var name = $('#edit-company-name').val();
		$.post(
			'/admin',
			{ctrl:'save_name', name:name},
			data => {
				if(data !== 'complete')alert(data);
			}
		);
	},
	
	saveCompanyRegionCode : () => {
		var name = $('#edit-company-region-code').val();
		$.post(
			'/admin',
			{ctrl:'save_region_code', name:name},
			data => {
				if (data !== 'complete') alert(data);
			}
		);
	},
	
	saveCompanyPhoneNumber : () => {
		var name = $('#edit-company-phone-number').val();
		$.post(
			'/admin',
			{ctrl:'save_phone_number', name:name},
			data => {
				if(data !== 'complete')alert(data);
			}
		);
	},
	
	saveCompanySlogan : () => {
		var name = $('#edit-company-slogan').val();
		$.post(
			'/admin',
			{ctrl:'save_slogan', name:name},
			data => {
				if(data !== 'complete')alert(data);
			}
		);
	},
	
	saveCompanyBottomDescription : () => {
		var text = $('#edit-company-bottom-description')[0].value;
		console.log(text)
		$.post(
			'/admin',
			{ctrl:'save_bottom_description', text:text},
			data => {
				if(data !== 'complete')alert(data);
			}
		);
	},
	
	// открытие диалога выбора файла логотипа для загрузки
	logoOpenFileDialog : () => {
		$('#upload-company-logo').replaceWith($('#upload-company-logo').clone(true));
		$('#upload-company-logo').click();
	},
	
	// загрузка файла логотипа
	loadCompanyLogo : function () {
		
		var file = this.files[0],
			data = new FormData();
		
		data.append('file', file)
		
		$.ajax({
			url : '/logo_upload/',
			data : data,
			cache : false,
			contentType : false,
			processData : false,
			type : 'POST',
			success : res => {
				
				if(res.status == 'ok'){
					location.reload();
				}
				else console.log(res);
			}
		});
	}
	
};

$(document).ready(StaticAdmin.init);