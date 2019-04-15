var User = {

	setAdminMode : () => {

		var url = document.location.href,
			last = url.charAt(url.length - 1);

		if (last !== '/') url += '/';
		url += 'admin';

		document.location.href = url;

	},

	logout : () => {

		if (!confirm('Выйти из учетной записи?')) return;

		$.post(
			'/static',
			{ctrl : 'logout'},
			data => {
				if (data == 'complete') {
					location.reload();
				}
				else alert(data);
			}
		);

	},

	init : () => {

		$('#on-admin-mode-button').on('click', User.setAdminMode);
		$('#user-logout-button').on('click', User.logout);

	}

};

$(document).ready(User.init);
