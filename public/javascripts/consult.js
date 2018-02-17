var consult = {
	
	consult : $('#consult'),
	
	// текущее состояние
	state : false,
	
	// показать консультант
	show : () => {
		consult.consult.css('left', $(window).width() - $('#consult').width());
		consult.state = true;
		$.cookie('consultState', 'show');
		$('#consult-new-message').focus();
		
		if (ws.readyState == 1) ws.send(JSON.stringify({route : 'static', action : 'showConsult', viewId : ws.viewId}));
		
	},
	
	// скрыть консультант
	hide : () => {
		consult.consult.css('left', '100%');
		$.cookie('consultState', 'hide');
		consult.state = false;
		
		if (ws.readyState == 1) ws.send(JSON.stringify({route : 'static', action : 'hideConsult', viewId : ws.viewId}));
		
	},
	
	//переключение между режимами открыт-закрыт
	toggle : () => {
		consult.state ? consult.hide() : consult.show();
	},
	
	// в сети
	on : () => {
	
		$('#consult-state')
			.removeClass('alert-warning')
			.addClass('alert-success')
			.html('<span class="fa fa-plus"></span> консультант в сети');

	},
	
	// оффлайн
	off : () => {
		
		$('#consult-state')
			.removeClass('alert-success')
			.addClass('alert-warning')
			.html('<span class="fa fa-minus"></span> консультант не в сети');
		
	},
	
	// отправка сообщения
	send : () => {
		
		var text = $('#consult-new-message').val();
		
		$.post(
			'/static',
			{ctrl : 'newMessage', text: text, token : Config.WSToken},
			data => {
				data = JSON.parse(data);
				
				if (data.status == 'ok'){
					
					consult.createMessage(data.message);
					consult.clearNewMessageForm();
					
				}
				else alert(data.err);
			}
		);
		
	},
	
	// очистка поля нового сообщения
	clearNewMessageForm : () => {
		
		$('#consult-new-message')[0].value = '';
		$('#consult-new-message').focus();
		
	},
	
	// добавление сообщения в список сообщений
	createMessage : (message) => {
		
		if (typeof message == 'undefined') return;
		
		if ($('.message').length == 0) $('#consult-messages')[0].innerHTML = ''; 
		
		var mess = $('<li>').addClass('message'),
			div = $('<div>');
		
		if (message.senderType == 1) mess.addClass('answer');
		
		div.text(message.text);
		
		mess.append(div);
		$('#consult-messages').append(mess);
	},
	
	cont : $('#consult-content'),
	stateView : $('#consult-state'),
	messageForm : $('#consult-message-form'),
	messagesWrapper : $('#consult-messages-wrapper'),
	messages : $('#consult-messages'),
	
	// инициализация консультанта
	init : () => {
		
		// запуск рендеринга консультанта
		setTimeout(consult.render, 1);
		setTimeout(consult.render, 1000);
		$(document).on('scroll', consult.render);
		
		// обработчик нажатия на кнопку открытия / закрытия окна консультанта
		$('#consult-button').on('click', consult.toggle);
		
		// назначение обработчиков отправки сообщения
		$('#consult-new-message').on('keydown', () => {
			if(event.keyCode == 13 && event.ctrlKey){
				consult.send();
			}
		});
		$('#consult-send').on('click', consult.send);
		
		// показываем консультант, если он запомнен в открытом состоянии
		if ($.cookie('consultState') == 'show') {
			consult.show();
		}
		
	},
	
	// рендеринг консультанта
	render : () => {
		
		// проверяем, что консультант открыт
		
		var scroll = Page.body[0].scrollTop,
			headerHeight = Page.header[0].offsetHeight,
			navHeight = Page.nav[0].offsetHeight,
			navbarMinFixed = headerHeight - navHeight,
			pageHeight = $(document).height(),
			windowHeight = $(window).height(),
			footerHeight = Page.footer[0].offsetHeight,
			navbarMaxFixed = pageHeight - windowHeight - footerHeight,
			contHeight = consult.cont.height(),
			stateViewHeight = consult.stateView[0].offsetHeight,
			messageFormHeight = consult.messageForm.height();
		
		if (scroll < navbarMinFixed + navHeight) {	// прокрутка меньше высоты хедера без навбара
			consult.consult.css({
				top : headerHeight - scroll,
				height : windowHeight + scroll - headerHeight
			});
		}
		else if (scroll >= navbarMinFixed && scroll <= navbarMaxFixed) {
			consult.consult.css({
				top : navHeight,
				height : windowHeight - navHeight
			})
		}
		else if (scroll > navbarMaxFixed && scroll < navbarMaxFixed + navHeight){
			consult.consult.css({
				top : navbarMaxFixed + navHeight - scroll,
				height : - Page.nav[0].offsetTop - navHeight + Page.footer[0].offsetTop,
			})
		}
		else if (scroll >=  navbarMaxFixed + navHeight) {
			consult.consult.css({
				top : 0,
				height : pageHeight - scroll - footerHeight,
			})
		}
		
		consult.messagesWrapper.css({
			'height' : (contHeight - stateViewHeight - messageFormHeight) + 'px',
			'top' : (stateViewHeight + 1) + 'px'
		});
		
		setTimeout(consult.render, 100);
		
	}
};

$(document).ready(consult.init);

WSActions['showConsult'] = data => {
	if (!consult.state) consult.show();	
}

WSActions['hideConsult'] = data => {
	if (consult.state) consult.hide();	
}