var ConfigAdmin = {
	
	configToolbar : $('#config-toolbar'),
	activeRouteId : false,
	activeRouteButton : false,
	activeRoute : false,
	buttonsContainer : $('#routes-buttons'),
	buttons : $('.route-button'),
	routesContainer : $('#routes'),
	routes : $('.route'),
	noSelectedRoute : $('#no-selected-route'),
	routeAddButton : $('#route-add-button'),
	
	addRoute : function () {
		
		console.log('config admin add route');
		
	},
	
	selectRoute : function () {
	
		console.log('config admin select route');
		
		var button = $(this),
			routeId = button.data('route'),
			route = $(`#route-${routeId}`);
		
		if (ConfigAdmin.activeRouteId) {
			
			ConfigAdmin.activeRouteButton.removeClass('active');
			ConfigAdmin.activeRoute.addClass('hidden');
			
		}
		
		if (!ConfigAdmin.noSelectedRoute.hasClass('hidden')) ConfigAdmin.noSelectedRoute.addClass('hidden');
		button.addClass('active');
		route.removeClass('hidden');
		
		ConfigAdmin.activeRouteId = routeId;
		ConfigAdmin.activeRouteButton = button;
		ConfigAdmin.activeRoute = route;
		
	},
	
	init : () => {
		
		console.log('config admin init');
		
		ConfigAdmin.routeAddButton.on('click', ConfigAdmin.addRoute);
		ConfigAdmin.buttons.on('click', ConfigAdmin.selectRoute);
		
		ConfigAdmin.render();
		
	},
	
	render : () => {
		
		console.log('config admin render');
		
	}
	
};

// ConfigAdmin.prototype.

$(document).ready(ConfigAdmin.init);