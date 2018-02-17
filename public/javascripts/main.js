Array.max = array => {
    return Math.max.apply(Math, array);
};
Array.min = array => {
    return Math.min.apply(Math, array);
};

jQuery.fn.exists = function () {
	return $(this).length;
}
 
var Page = {
	win : $(window),
	doc : $(document),
	body : $('#body'),
	header : $('#header'),
	nav : $('#nav'),
	footer : $('#footer'),
},

Elem = {
	
	blink : (elem, freq) => {
		
		freq = freq || 300;
		
		$(elem).fadeOut(freq).fadeIn(freq);
		
	},
	
	blinking : (elem, count, freq) => {
		
		freq = freq || 300;
		
		var cycle = 0,
			interval = setInterval(() => {
				
				Elem.blink(elem, freq / 2),
				cycle++;
				
				if (cycle == count) clearInterval(interval);
				
			}, freq);
		
	}
	
},

Window = {
	
	template : false,
	
	load : () => {
		
		console.log('window load');
		
		return new Promise((resolve, reject) => {

			$.post(
				'/static',
				{ctrl : 'windowTemplate'},
				data => {
					Window.template = data;
					resolve(1);
				}
			);
			
		});
	},
	
	createLayout : () => {
		
		console.log('window create layout');
		
		var win = $('<div>').addClass('window').html(Window.template);
		$('#main').append(win);
		
		return Window.init(win);;
		
	},
	
	render : function () {
		
		console.log('window render')
		
		this.cnt.css({height : this.height() - this.head.height()});
		
	},
	
	init : win => {
		
		console.log('window init')
		
		win.find('.window-close').on('click', function () { Window.remove(win); });
		win.head = win.find('.window-head');
		win.title = win.find('.window-title');
		win.close = win.find('.window-close');
		win.cnt = win.find('.window-content');
		
		win.loading = Window.loading;
		win.render = Window.render;
		
		win.render();
		
		return win;
		
	},
	
	loading : function () {
		
		console.log('window loading')
		
		this.cnt.html('').append(
			$('<div>').addClass('va').append(
				$('<div>').append(
					$('<img>').attr('src', "/public/images/load.gif")
				)
			)
		);
		
	},
	
	create : () => {
		
		console.log('window create');
		
		return new Promise((resolve, reject) => {

			if (Window.template) {
				resolve(Window.createLayout());
			}
			else {
				Window.load().then(() => {
					resolve(Window.createLayout());
				});
			}
			
		});
		
		
	},
	remove : win => {
		console.log('window remove');
		win.remove();
	}
},

Callback = {
	
	win : false,
	
	load : () => {
		
		console.log('callback load');
		
		return new Promise((resolve, reject) => {

			$.post(
				'/static',
				{ctrl : 'callbackTemplate'},
				data => {
					Callback.win.cnt.html(data);
					resolve(1);
				}
			);
			
		});
		
	},
	
	initLoaded : () => {
		
		Callback.win.close
			.unbind('click')
			.on('click', Callback.hide);
			
		Callback.win.title.text('Заказать обратный звонок');
		
		Callback.mainSection = Callback.win.find('.callback-main-section');
		Callback.completeSection = Callback.win.find('.callback-complete-section');
		Callback.number = Callback.win.find('.callback-number').on('keyup', Callback.checkNumber);
		Callback.numberError = Callback.win.find('.callback-number-error');
		Callback.nameSection = Callback.win.find('.callback-name-section');
		Callback.name = Callback.win.find('.callback-name');
		Callback.nameError = Callback.win.find('.callback-name-error');
		Callback.sendButton = Callback.win.find('.callback-send-button').on('click', Callback.send);
		
	},
	
	checkNumber : () => {
		
		console.log('callback check number');
		
		if (Callback.number.val().length > 0) {
			if (Callback.nameSection.hasClass('hidden')) Callback.nameSection.removeClass('hidden');
		}
		else {
			if (!Callback.nameSection.hasClass('hidden')) Callback.nameSection.addClass('hidden');
		}
	},
	
	showError : (name, text) => {
		
		console.log('callback show error');
		
		Callback[name + 'Error'].text(text).removeClass('hidden');
		
	},
	
	hideErrors : () => {
		
		console.log('callback hide errors');
		
		Callback.win.find('.error').addClass('hidden');
		
	},
	
	create : () => {
		
		console.log('callback create');
		
		return Window.create().then(win => {
			
			Callback.win = win;
			Callback.win.loading();
			
		})
		.then(() => {
			Callback.load().then(() => {
				Callback.initLoaded();
			});
		});
		
	},
	
	show : () => {
		
		console.log('callback show');
		
		return new Promise((resolve, reject) => {
			
			if (Callback.win) {
				Callback.win.removeClass('hidden');
				resolve(1);
			}
			else {
				Callback.create().then(() => {
					resolve(1);
				});
			}
			
		});
		
	},
	
	hide : () => {
		
		console.log('callback hide')
		
		Callback.win.addClass('hidden');
	
	},

	init : () => {
		$('#contacts-callback').on('click', Callback.show);
	},
	
	valid : () => {
		
		console.log('callback valid')
		
		var number = Callback.number.val(),
			name = Callback.name.val(),
			err = 0;
			
		Callback.hideErrors();
			
		if (name == '') {
			Callback.showError('name', 'Необходимо ввести имя');
			err++;
		}
		
		if (number == '') {
			Callback.showError('number', 'Необходимо ввести номер телефона');
			err++;
		}
		
		if (err > 0) return false;
		
		return true;
		
	},
	
	send : () => {
		
		console.log('callback send');
		
		if (!Callback.valid()) return;
		
		var number = Callback.number.val(),
			name = Callback.name.val();
		
		$.post(
			'/static',
			{ctrl : 'callback', number : number, name : name},
			data => {
				if (data == 'complete'){
					Callback.complete();
				}
				else alert(data);
			}
		);
	},
	
	complete : () => {
		
		console.log('callback success')
		
		Callback.mainSection.addClass('hidden');
		Callback.completeSection.removeClass('hidden');
		
	}
	
},

render = {
	renderImg:() => {
		$('.img').each(function(i, elem){
			var height = elem.offsetWidth * 0.75 + 'px';
			$(elem).css({'height':height});
			if(elem.tagName !== 'IMG'){
				$(elem).css({'background-image':'url(' + $(elem).attr('src') + ')'});
			}
		});
		
		setTimeout(render.renderImg, 50);
		
	}
},

navbar = {
	
	render : repeat => {
		
		if (typeof repeat == 'undefined') repeat = true;
		
		var scroll = Page.body[0].scrollTop,
			headerHeight = Page.header[0].offsetHeight,
			navHeight = Page.nav.height(),
			footerHeight = Page.footer[0].offsetHeight,
			windowHeight = Page.win.height(),
			pageHeight = Page.doc.height(),
			navbarMinFixed = headerHeight - navHeight,
			navbarMaxFixed = pageHeight - windowHeight - footerHeight;
		
		// render header layout
		$('#header-layout').css({height : headerHeight - navHeight});
		
		if (scroll < navbarMinFixed + navHeight && Page.nav.hasClass('navbar-fixed-top')) {	// прокрутка меньше высоты хедера без навбара
			Page.nav.removeClass('navbar-fixed-top');
			Page.header.css({'margin-bottom' : '0'});
		}
		else if(scroll >= navbarMinFixed && scroll <= navbarMaxFixed) {
			Page.nav.addClass('navbar-fixed-top');
			if (Page.nav.hasClass('navbar-down')) Page.nav.removeClass('navbar-down').css({'top' : '0'});
			Page.header.css({'margin-bottom' : navHeight + 'px'});
		}
		else if(scroll > navbarMaxFixed){
			Page.nav
				.removeClass('navbar-fixed-top')
				.addClass('navbar-down')
				.css({'top' : navbarMaxFixed + 'px'});
			Page.header
				.css({'margin-bottom' : navHeight + 'px'});
		}
		
		if (repeat) {
			setTimeout(() => {
				navbar.render(false);
			}, 25);
		}
	}
	
},

Scroller = {
	
	// инициализируемые элементы
	elems : {
		layout : '#scroller-layout',
		scroller : '#scroller',
		top : '#scroller-top',
		leftWrapper : '#scroller-left-wrapper',
		left : '#scroller-left',
		contentWrapper : '#scroller-content-wrapper',
		content : '#scroller-content',
		rightWrapper : '#scroller-right-wrapper',
		right : '#scroller-right'
	},
	
	// инициализация скроллера
	init : () => {
		for (var i in Scroller.elems) {
			if ($(Scroller.elems[i]).exists()) {
				Scroller[i] = $(Scroller.elems[i]);
			}
			else {
				Scroller[i] = false;
			}
		}
		
		console.log(Scroller);
		
		Scroller.render();
		
	},
	
	// рендеринг скроллера
	render : () => {

		console.log('scroller render');
		
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
			scrollerHeight = 0,
			scrollerTop = 0,
			scrollerPosition = 'relative',
			scrollerContentWrapperHeight = 0,
			scrollerLayoutHeight = 0,
			scrollerContentHeight = Scroller.content.height(),
			scrollerRightHeight = Scroller.rightWrapper ? Scroller.right.height() : 0,
			scrollerLeftHeight = Scroller.leftWrapper ? Scroller.left.height() : 0;
		
		scrollerLayoutHeight = Math.max.apply(Math, new Array(scrollerLeftHeight, scrollerRightHeight, scrollerContentHeight));
		
		if (scroller.leftWrapper) scrollerLeftWrapperHeight = Scroller.leftWrapper.height();
		if (scroller.rightWrapper) scrollerRightWrapperHeight = Scroller.rightWrapper.height();
		
		/* перенести четыре состояния прокрутки в объект navbar */
		if (scroll < navbarMinFixed + navHeight) {	// навбар в статическом положении
			scrollerTop = headerHeight + pageTitleHeight - scroll + 30;
			scrollerHeight = windowHeight - headerHeight - pageTitleHeight + scroll - 30 - 20;
		}
		else if (scroll >= navbarMinFixed && scroll <= navbarMaxFixed) {	// навбар зафиксирован
			console.log(2)
			scrollerTop = navHeight + 20;
			scrollerHeight = windowHeight - navHeight - 40;
		}
		else if (scroll > navbarMaxFixed && scroll < navbarMaxFixed + navHeight){	// появляется футер, навбар уходит
			console.log(3)
			scrollerTop = headerHeight + pageTitleHeight - scroll + 30 + navHeight + 20;
			scrollerHeight = pageHeight - scroll - scrollerTop - footerHeight - 20;
		}
		else if (scroll >=  navbarMaxFixed + navHeight) {	// навбара нет на экране
			
			scrollerTop = 20;
			console.log(4)
			console.log(pageHeight - scroll - footerHeight - 40)
			console.log(pageHeight - scroll - footerHeight - 40 + (pageHeight - scroll - windowHeight))
			
			scrollerPosition = 'fixed';
			scrollerHeight = pageHeight - scroll - footerHeight - 40;
		}
		
		scrollerContentWrapperHeight = scrollerHeight - Scroller.top.height();
		
		Scroller.scroller.css({/* position : scrollerPosition, */ height : scrollerHeight, top : scrollerTop});
		
		if (Scroller.leftWrapper) Scroller.leftWrapper.height(scrollerContentWrapperHeight);	
		if (Scroller.rightWrapper) Scroller.rightWrapper.height(scrollerContentWrapperHeight);
		
		Scroller.contentWrapper.height(scrollerContentWrapperHeight);
		Scroller.layout.height(scrollerLayoutHeight);
	}
	
};

$(document).ready(function(){
	
	// рендерим изображения
	render.renderImg();
	// обработчик, запускающий рендеринг изображений при загрузке страницы
	document.body.onresize = render.renderImg;
	
	navbar.render();
	$(document).on('scroll', () => {
		navbar.render();
		// Scroller.render();
	});
	
	//
	Callback.init();
	
	window.addEventListener("beforeunload", function(){
		ws.send( JSON.stringify({
			route : 'static',
			action : 'closeTab'
		}) );
	});
	
	if ($('#scroller').exists()) Scroller.init();

});
