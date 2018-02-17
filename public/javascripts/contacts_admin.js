var inputs = ['phone-code', 'phone-number', 'email', 'card-number', 'address'];

$(document).ready(() => {
	// console.log('ready')
	inputs.forEach(name => {
		$(`#contacts-${name}`).on('change', saveContacts);
	});
});


//
function saveContacts () {
	
	var formData = getFormData();
	formData.ctrl = 'set_contacts';
	console.log(formData);
	$.post(
		'',
		formData,
		data => {
			console.log(data);
			if (data !== 'complete') alert(data);
		}
	);
	
}

//
function getFormData () {
	
	var data = {};
	inputs.forEach(name => {
		data[name.replace('-', '_')] = $(`#contacts-${name}`).val();
	});
	return data;
	
}