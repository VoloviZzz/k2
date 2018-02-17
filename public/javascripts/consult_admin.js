var ConsultAdmin = {
	
	activeRoom : false,	// текущая активная комната
	
	selectRoom : function () {
		
		var button = $(this),
			visit = button.data('visit'),
			room = button.data('room');

		$('.room-cont').each((i, item) => {
			if (!$(item).hasClass('hidden')) $(item).addClass('hidden');
		});
		
		if (!$('#no-selected-visit').hasClass('hidden')) $('#no-selected-visit').addClass('hidden');
		
		$(`#room-cont-${visit}`).removeClass('hidden');
		
		ConsultAdmin.activateConsultInfoButton(button);
		ConsultAdmin.activeRoom = room;
		ConsultAdmin.activeRoomCont = $(`#room-cont-${visit}`);
		ConsultAdmin.activeRoomHead = $(`#room-head-${visit}`);
		ConsultAdmin.activeRoomMess = $(`#room-mess-${visit}`);
		ConsultAdmin.renderActiveRoom();
		
		setTimeout(() => {
			ConsultAdmin.hideRoomIcon('mess', room);
		}, 2500);
		
		$.cookie('activeVisit', visit);
		
	},
	
	activateConsultInfoButton : (button) => {
		
		$('#cons-rooms-list li').each((i, item) => {
			if ($(item).hasClass('active')) $(item).removeClass('active');
		});
		
		button.addClass('active');
		
	},
	
	// отправка сообщения
	send : () => {
		
		if (!ConsultAdmin.activeRoom) {
			alert('Выберите посетителя для отправки сообщения');
			return;
		}
		
		var text = $('#cons-new-message').val();
		
		if (text !== '') {
			
			$.post(
				'',
				{ctrl : 'newMessage', text : text, roomId : ConsultAdmin.activeRoom},
				data => {
					
					data = JSON.parse(data);
					
					if (data.status == 'ok') {
						ConsultAdmin.createMessage(data.message);
						ConsultAdmin.clearMessageForm();
					}
					else{
						alert(data.err);
					}
					
				}
			);
			
		}
		
	},
	
	createRoom : room => {
		
		var button = $('<li>'),
			view = $('<div>'),
			head = $('<div>'),
			title = $('<div>'),
			tabsWrapper = $('<div>'),
			tabsContainer = $('<div>'),
			tabs = $('<ul>'),
			messWrapper = $('<div>'),
			messContainer = $('<div>'),
			messList = $('<ul>'),
			moveIcon = $('<span>'),
			expectIcon = $('<span>'),
			messIcon = $('<span>');
		
		$('#cons-rooms-list').append(
			button
				.attr('id', `cons-visit-${room.id}`)
				.data({'visit' : room.id, 'room' : room.roomId})
				.text('Аноним ' + room.roomId)
				.on('click', ConsultAdmin.selectRoom)
				.append(
					moveIcon
						.addClass('fa fa-link hidden room-move-icon')
						.attr('id', `room-move-icon-${room.roomId}`)
				)
				.append(
					expectIcon
						.addClass('fa fa-clock-o hidden room-expect-icon')
						.attr('id', `room-expect-icon-${room.roomId}`)
				)
				.append(
					messIcon
						.addClass('fa fa-envelope-o hidden room-mess-icon')
						.attr('id', `room-mess-icon-${room.roomId}`)
				)
		);
			
		$('#cons-rooms-container').append(
			view
				.addClass('room-cont container-fluid hidden')
				.attr('id', `room-cont-${room.id}`)
				.append(
					head
						.addClass('row room-head')
						.attr('id', `room-head-${room.id}`)
						.append(
							title
								.addClass('col-lg-2 col-md-2 room-title')
								.attr('id', `room-title-${room.id}`)
								.text('Визит #' + room.id)
						)
						.append(
							tabsWrapper
								.addClass('col-lg-10 col-md-10')
								.append(
									tabsContainer
										.addClass('room-tabs-container')
										.append(
											tabs
												.addClass('nav nav-tabs room-tabs')
												.attr('id', `room-tabs-${room.id}`)
										)
								)
						)
				)
				.append(
					messWrapper
						.addClass('row room-mess')
						.attr('id', `room-mess-${room.id}`)
						.append(
							messContainer
								.addClass('col-lg-12 col-md-12 room-mess-container')
								.append(
									messList
										.addClass('room-mess-list')
										.attr('id', `messages-${room.roomId}`)
										.html('<div class="no-messages">Сообщения отсутствуют</div>')
								)
						)
				)
		);
		
	},
	
	createTab : tab => {
		
		var tabs = $(`#room-tabs-${tab.visitId}`),
			li = $('<li>'),
			a = $('<a>');
		
		if (ConsultAdmin.getRoomTabsCount(tab.visitId) == 0) ConsultAdmin.existsTabs(tab.visitId, tab.roomId);
		
		tabs.prepend(
			li
				.attr('id', `room-tab-${tab.id}`)
				.append(
					a
						.attr('href', 'javascript:void(0);')
						.text(tab.title)
				)
		);
		
		$('#audio-create-tab')[0].play();
		
		ConsultAdmin.showRoomIcon('move', tab.roomId);
		ConsultAdmin.blinkRoomIcon('move', tab.roomId);
		setTimeout(() => {			
			ConsultAdmin.hideRoomIcon('move', tab.roomId);
		}, 3000);
		
	},
	
	closeTab : tab => {
		
		console.log('close tab')
		
		var elem = $(`#room-tab-${tab.id}`);
		
		if (elem.length > 0) {
			
			// console.log(tab)
			
			elem.remove();
			// ConsultAdmin.checkRoomTabs(tab.visitId);
			
			if (ConsultAdmin.getRoomTabsCount(tab.visitId) == 0) ConsultAdmin.emptyTabs(tab.visitId, tab.roomId);
			
			$('#audio-close-tab')[0].play();			
			
		}
		
	},
	
	// подсчет вкладок в комнате
	getRoomTabsCount : room => {
		
		return $(`#room-tabs-${room} li`).length;
		
	},
	
	emptyTabs : (visit, room) => {
		
		$(`#room-tabs-${visit}`)
			.addClass('empty')
			.text('Открытые вкладки отсутствуют');
			
		ConsultAdmin.showRoomIcon('expect', room);
		ConsultAdmin.blinkRoomIcon('expect', room);
		
	},
	
	existsTabs : (visit, room) => {
		
		$(`#room-tabs-${visit}`)
			.removeClass('empty')
			.text('');
			
		ConsultAdmin.hideRoomIcon('expect', room);
			
	},
	
	showRoomIcon : (iconName, roomId) => {
		
		var icon = $(`#room-${iconName}-icon-${roomId}`);
		
		if (icon.hasClass('hidden')) icon.removeClass('hidden');
		
	},
	
	hideRoomIcon : (iconName, roomId) => {
		
		var icon = $(`#room-${iconName}-icon-${roomId}`);
		
		if (!icon.hasClass('hidden')) icon.addClass('hidden');
		
	},
	
	blinkRoomIcon : (iconName, roomId) => {
		
		var icon = $(`#room-${iconName}-icon-${roomId}`);
		
		Elem.blinking(icon, 10);
		
	},
	
	//
	createMessage : message => {
		var li = $('<li>'),
			div = $('<div>'),
			b = $('<b>'),
			span = $('<span>');
		
		if (message.senderType == 0) li.addClass('answer');
		
		li
			.append(
				div
					.append(b.text(message.senderType + ' ' + message.senderId + ' ' + message.created))
					.append(span.text(message.text))
			);
		
		if ($(`#messages-${message.roomId} li`).length == 0) $(`#messages-${message.roomId}`).text('');
		
		$(`#messages-${message.roomId}`).append(li);
		
		// если сообщение от посетителя - проигрываем звук входящего сообщения
		if (message.senderType == 0) {
			
			$('#audio-create-message')[0].play();
		
			ConsultAdmin.showRoomIcon('mess', message.roomId);
			ConsultAdmin.blinkRoomIcon('mess', message.roomId);
		
		}
		
		if (message.roomId == ConsultAdmin.activeRoom) {
			setTimeout(() => {
				ConsultAdmin.hideRoomIcon('mess', message.roomId);
			}, 3000);
		}
		
	},
	
	clearMessageForm : () => {
		$('#cons-new-message')[0].value = '';
		$('#cons-new-message')[0].focus();
	},
	
	init : () => {
		
		$('#cons-rooms-list li').on('click', ConsultAdmin.selectRoom);
		$('#cons-new-message-send').on('click', ConsultAdmin.send);
		$('#cons-new-message').on('keydown', () => {
			if(event.keyCode == 13 && event.ctrlKey){
				ConsultAdmin.send();
			}
		});
		
		if (typeof $.cookie('activeVisit') !== 'undefined') $('#cons-visit-' + $.cookie('activeVisit')).click();
		
		ConsultAdmin.render();
		
	},
	
	content : $('#cons-content'),
	left : $('#cons-left'),
	right : $('#cons-right'),
	roomsList : $('#cons-rooms-list'),
	infoCol : $('#cons-rooms-container'),
	messageForm : $('#cons-message-form'),
	
	// рендеринг активной комнаты консультанта
	renderActiveRoom : () => {
		
		if (!ConsultAdmin.activeRoom) return;
		
		var leftHeight = ConsultAdmin.left.height(),
			messageFormHeight = ConsultAdmin.messageForm.height(),
			contHeight = ConsultAdmin.activeRoomCont.height(),
			headHeight = ConsultAdmin.activeRoomHead.height(),
			messHeight = leftHeight - headHeight - messageFormHeight;
		
		ConsultAdmin.activeRoomMess.css({height : messHeight});
		
	},
	
	render : () => {
		
		var pageTitle = $('#page-title'),
			pageTitleHeight = pageTitle[0].offsetHeight,
			scroll = Page.body[0].scrollTop,
			headerHeight = Page.header[0].offsetHeight,
			navHeight = Page.nav[0].offsetHeight,
			navbarMinFixed = headerHeight - navHeight,
			pageHeight = $(document).height(),
			windowHeight = $(window).height(),
			footerHeight = Page.footer[0].offsetHeight,
			navbarMaxFixed = pageHeight - windowHeight - footerHeight,
			consContentHeight = 0,
			consContentTop = 'auto',
			consContentBottom = 20;
			
		if (scroll < navbarMinFixed + navHeight) {	// навбар в статическом положении
			consContentHeight = windowHeight - headerHeight - pageTitleHeight + scroll - 30 - 20;
		}
		else if (scroll >= navbarMinFixed && scroll <= navbarMaxFixed) {	// навбар зафиксирован
			consContentHeight = windowHeight - navHeight - (headerHeight + pageTitleHeight - scroll) - 30 - 20;
		}
		else if (scroll > navbarMaxFixed && scroll < navbarMaxFixed + navHeight){	// появляется футер, навбар уходит
			consContentTop = headerHeight + pageTitleHeight - scroll + 30 + navHeight;
			consContentHeight = pageHeight - scroll - consContentTop - footerHeight - 20;
		}
		else if (scroll >=  navbarMaxFixed + navHeight) {	// навбара нет на экране
			consContentTop = 20;
			consContentHeight = pageHeight - scroll - footerHeight - 40;
		}
		
		ConsultAdmin.content.css({top : consContentTop, bottom : consContentBottom, height : consContentHeight});
		ConsultAdmin.renderActiveRoom();
		
	},
	
	
};

$(document).ready(ConsultAdmin.init);
$(document).on('scroll', ConsultAdmin.render);

WSActions['newConsultMessage'] = data => {
	ConsultAdmin.createMessage(data.message);	
};

WSActions['newConsultTab'] = data => {
	ConsultAdmin.createTab(data.tab);
};

WSActions['closeTab'] = data => {
	ConsultAdmin.closeTab(data.tab);
};

WSActions['newRoom'] = data => {
	ConsultAdmin.createRoom(data.room);
};